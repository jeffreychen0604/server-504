/* Catherine's Party featured-event identity + generated artwork loader. */
(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const artworkSource = './assets/catherines-party-featured.webp.base64.txt?v=20260819-1935';
  let queued = false;
  let artworkPromise = null;

  const getArtwork = () => {
    artworkPromise ||= fetch(artworkSource, { cache: 'no-store' })
      .then(r => r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(base64 => {
        const clean = base64.trim();
        if (!clean.startsWith('UklG')) throw new Error('Invalid Catherine artwork payload');
        return `url("data:image/webp;base64,${clean}")`;
      })
      .catch(err => {
        console.warn("Catherine's Party artwork unavailable.", err);
        return null;
      });
    return artworkPromise;
  };

  const applyArtwork = card => {
    if (card.dataset.catherineGeneratedArt === '1') return;
    card.dataset.catherineGeneratedArt = '1';

    getArtwork().then(image => {
      if (!image || !card.isConnected) return;
      /* Only the generated artwork lives in background-image. Readability overlay is CSS. */
      card.style.setProperty('background-image', image, 'important');
      card.classList.add('event-catherines-party-generated');
    });
  };

  const enhance = () => {
    queued = false;
    app.querySelectorAll('.event-card').forEach(card => {
      const title = card.querySelector('h3')?.textContent?.trim().toLowerCase() || '';
      const isCatherine = title === "catherine's party";
      card.classList.toggle('event-catherines-party', isCatherine);
      if (isCatherine) applyArtwork(card);
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
