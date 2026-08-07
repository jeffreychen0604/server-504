(() => {
  const form = document.getElementById('contributeForm');
  if (!form) return;

  const config = window.SERVER504_CONFIG || {};
  const api = (config.feedbackApi || '').trim();
  const turnstileSiteKey = (config.turnstileSiteKey || '').trim();
  const note = form.querySelector('.form-note');
  const submit = form.querySelector('button[type="submit"]');
  const status = document.getElementById('feedbackStatus');
  const detailsInput = document.getElementById('contributionDetails');
  const contributeDialog = document.getElementById('contributeDialog');
  const turnstileContainer = document.getElementById('feedbackTurnstile');

  let turnstileWidgetId = null;
  let turnstileLoadPromise = null;
  window.server504TurnstileToken = '';

  if (!api) {
    if (note) note.textContent = 'Anonymous feedback backend is being activated. GitHub remains the temporary fallback.';
    return;
  }

  if (note) {
    note.textContent = turnstileSiteKey
      ? 'No account is required. Protected by Cloudflare Turnstile and sent directly to the Server 504 moderation inbox.'
      : 'No account is required. Your submission goes directly to the Server 504 moderation inbox.';
  }
  if (submit) submit.textContent = 'Submit feedback';

  const showStatus = (state, message) => {
    if (!status) return;
    status.hidden = false;
    status.dataset.state = state;
    status.textContent = message;
  };

  const clearStatus = () => {
    if (!status) return;
    status.hidden = true;
    status.textContent = '';
    delete status.dataset.state;
  };

  const loadTurnstile = () => {
    if (!turnstileSiteKey) return Promise.resolve(null);
    if (window.turnstile) return Promise.resolve(window.turnstile);
    if (turnstileLoadPromise) return turnstileLoadPromise;

    turnstileLoadPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-server504-turnstile]');
      if (existing) {
        existing.addEventListener('load', () => resolve(window.turnstile), { once: true });
        existing.addEventListener('error', () => reject(new Error('Unable to load human verification.')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset.server504Turnstile = 'true';
      script.onload = () => resolve(window.turnstile);
      script.onerror = () => reject(new Error('Unable to load human verification.'));
      document.head.appendChild(script);
    });

    return turnstileLoadPromise;
  };

  const resetTurnstile = () => {
    window.server504TurnstileToken = '';
    if (turnstileWidgetId !== null && window.turnstile) {
      try {
        window.turnstile.reset(turnstileWidgetId);
      } catch (_) {}
    }
  };

  const prepareTurnstile = async () => {
    if (!turnstileSiteKey || !turnstileContainer) return;
    turnstileContainer.hidden = false;

    try {
      const turnstile = await loadTurnstile();
      if (!turnstile || turnstileWidgetId !== null) return;

      turnstileWidgetId = turnstile.render(turnstileContainer, {
        sitekey: turnstileSiteKey,
        theme: 'dark',
        appearance: 'interaction-only',
        callback(token) {
          window.server504TurnstileToken = token || '';
          if (status?.dataset.state === 'verification') clearStatus();
        },
        'expired-callback'() {
          window.server504TurnstileToken = '';
        },
        'timeout-callback'() {
          window.server504TurnstileToken = '';
        },
        'error-callback'() {
          window.server504TurnstileToken = '';
          showStatus('error', 'Human verification could not be completed. Please retry.');
        }
      });
    } catch (error) {
      showStatus('error', error.message || 'Unable to load human verification.');
    }
  };

  if (turnstileSiteKey && contributeDialog) {
    const observer = new MutationObserver(() => {
      if (contributeDialog.open) prepareTurnstile();
    });
    observer.observe(contributeDialog, { attributes: true, attributeFilter: ['open'] });
    contributeDialog.addEventListener('close', () => {
      clearStatus();
      resetTurnstile();
    });
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    event.stopImmediatePropagation();

    const details = detailsInput?.value.trim() || '';
    if (details.length < 10) {
      showStatus('error', 'Please enter at least 10 characters in Details.');
      detailsInput?.focus();
      return;
    }

    if (turnstileSiteKey && !window.server504TurnstileToken) {
      showStatus('verification', 'Human verification is still running. Please wait a moment and submit again.');
      await prepareTurnstile();
      return;
    }

    const payload = {
      type: document.getElementById('contributionType').value,
      title: document.getElementById('contributionTitle').value.trim(),
      details,
      identity: document.getElementById('contributionIdentity').value.trim(),
      contact: document.getElementById('contributionContact')?.value.trim() || '',
      website: document.getElementById('contributionWebsite')?.value || '',
      locale: document.documentElement.lang || 'en',
      page: location.hash || '#/home',
      turnstileToken: window.server504TurnstileToken || ''
    };

    showStatus('loading', 'Sending your feedback…');
    if (submit) submit.disabled = true;

    try {
      const res = await fetch(`${api.replace(/\/$/, '')}/feedback`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Unable to submit feedback.');

      form.reset();
      showStatus('success', 'Thank you. Your feedback has been received and is pending review.');
      setTimeout(() => {
        contributeDialog?.close();
        clearStatus();
      }, 1400);
    } catch (error) {
      showStatus('error', error.message || 'Unable to submit feedback. Please try again.');
    } finally {
      if (submit) submit.disabled = false;
      if (turnstileSiteKey) resetTurnstile();
    }
  }, true);
})();
