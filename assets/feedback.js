(() => {
  const form = document.getElementById('contributeForm');
  if (!form) return;

  const api = (window.SERVER504_CONFIG && window.SERVER504_CONFIG.feedbackApi || '').trim();
  const note = form.querySelector('.form-note');
  const submit = form.querySelector('button[type="submit"]');
  const status = document.getElementById('feedbackStatus');

  if (!api) {
    if (note) note.textContent = 'Anonymous feedback backend is being activated. GitHub remains the temporary fallback.';
    return;
  }

  if (note) note.textContent = 'No account is required. Your submission goes directly to the Server 504 moderation inbox.';
  if (submit) submit.textContent = 'Submit feedback';

  form.addEventListener('submit', async event => {
    event.preventDefault();
    event.stopImmediatePropagation();

    const payload = {
      type: document.getElementById('contributionType').value,
      title: document.getElementById('contributionTitle').value.trim(),
      details: document.getElementById('contributionDetails').value.trim(),
      identity: document.getElementById('contributionIdentity').value.trim(),
      contact: document.getElementById('contributionContact')?.value.trim() || '',
      website: document.getElementById('contributionWebsite')?.value || '',
      locale: document.documentElement.lang || 'en',
      page: location.hash || '#/home',
      turnstileToken: window.server504TurnstileToken || ''
    };

    if (status) {
      status.hidden = false;
      status.dataset.state = 'loading';
      status.textContent = 'Sending your feedback…';
    }
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
      if (status) {
        status.dataset.state = 'success';
        status.textContent = 'Thank you. Your feedback has been received and is pending review.';
      }
      setTimeout(() => {
        document.getElementById('contributeDialog')?.close();
        if (status) status.hidden = true;
      }, 1400);
    } catch (error) {
      if (status) {
        status.dataset.state = 'error';
        status.textContent = error.message || 'Unable to submit feedback. Please try again.';
      }
    } finally {
      if (submit) submit.disabled = false;
    }
  }, true);
})();
