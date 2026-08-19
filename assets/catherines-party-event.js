/* Catherine's Party featured-event identity marker. */
(() => {
  const app = document.getElementById('app');
  if (!app) return;

  let queued = false;

  const enhance = () => {
    queued = false;
    app.querySelectorAll('.event-card').forEach(card => {
      const title = card.querySelector('h3')?.textContent?.trim().toLowerCase() || '';
      card.classList.toggle('event-catherines-party', title === "catherine's party");
    });
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(enhance);
  };

  new MutationObserver(schedule).observe(app, { childList: true, subtree: true });
  window.addEventListener('hashchange', schedule);
  window.addEventListener('server504:localechange', schedule);
  schedule();
})();
