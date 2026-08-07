(() => {
  const form = document.getElementById('contributeForm');
  if (!form) return;

  const api = (window.SERVER504_CONFIG && window.SERVER504_CONFIG.feedbackApi || '').trim();
  const note = form.querySelector('.form-note');
  const submit = form.querySelector('button[type="submit"]');
  const status = document.getElementById('feedbackStatus');
  const detailsInput = document.getElementById('contributionDetails');

  if (!api) {
    if (note) note.textContent = 'Anonymous feedback backend is being activated. GitHub remains the temporary fallback.';
    return;
  }

  if (note) note.textContent = 'No account is required. Your submission goes directly to the Server 504 moderation inbox.';
  if (submit) submit.textContent = 'Submit feedback';

  const showStatus = (state, message) => {
    if (!status) return;
    status.hidden = false;
    status.dataset.state = state;
    status.textContent = message;
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();
    event.stopImmediatePropagation();

    const details = detailsInput?.value.trim() || '';
    if (details.length < 10) {
      showStatus('error', 'Please enter at least 10 characters in Details.');
      detailsInput?.focus();
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
        document.getElementById('contributeDialog')?.close();
        if (status) status.hidden = true;
      }, 1400);
    } catch (error) {
      showStatus('error', error.message || 'Unable to submit feedback. Please try again.');
    } finally {
      if (submit) submit.disabled = false;
    }
  }, true);
})();