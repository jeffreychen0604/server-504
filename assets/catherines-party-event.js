/* Catherine's Party featured-event identity + binary artwork loader. */
(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const artworkSource = './assets/catherines-party-featured.webp?v=20260820-1525';
  let queued = false;
  let artworkPromise = null;

  const getArtwork = () => {
    artworkPromise ||= new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(`url("${artworkSource}")`);
      img.onerror = () => {
        console.warn("Catherine's Party artwork unavailable.");
        resolve(null);
      };
      img.src = artworkSource;
    });
    return artworkPromise;
  };

  const applyArtwork = card => {
    if (card.dataset.catherineGeneratedArt === '1') return;
    card.dataset.catherineGeneratedArt = '1';

    getArtwork().then(image => {
      if (!image || !card.isConnected) {
        delete card.dataset.catherineGeneratedArt;
        card.classList.remove('event-catherines-party-generated');
        card.style.removeProperty('background-image');
        return;
      }

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
