/* Featured Event reusable artwork bridge.
 * Lucky Magic House uses validated chunked artwork from the canonical event library.
 * Recurring Lucky Chest variants reuse stable raster assets from the same library.
 */
(() => {
  const app = document.getElementById('app');

  const chunks = [
    './assets/event-library/lucky-magic-house/part-00a.txt',
    './assets/event-library/lucky-magic-house/part-00b.txt',
    './assets/event-library/lucky-magic-house/part-01.txt',
    './assets/event-library/lucky-magic-house/part-02.txt',
    './assets/event-library/lucky-magic-house/part-03.txt'
  ];
  const expectedLength = 30636;

  Promise.all(chunks.map(source =>
    fetch(source, { cache: 'force-cache' })
      .then(response => response.ok ? response.text() : Promise.reject(new Error(`HTTP ${response.status}: ${source}`)))
  ))
    .then(parts => parts.map(part => part.trim()).join(''))
    .then(base64 => {
      if (base64.length !== expectedLength || !base64.startsWith('UklG')) {
        throw new Error(`Invalid Lucky Magic House artwork payload (${base64.length})`);
      }

      const dataUrl = `data:image/webp;base64,${base64}`;
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
          if (image.naturalWidth !== 960 || image.naturalHeight !== 320) {
            reject(new Error(`Unexpected artwork size ${image.naturalWidth}x${image.naturalHeight}`));
            return;
          }
          resolve(dataUrl);
        };
        image.onerror = () => reject(new Error('Lucky Magic House artwork could not be decoded'));
        image.src = dataUrl;
      });
    })
    .then(dataUrl => {
      document.documentElement.style.setProperty('--lucky-magic-house-art', `url("${dataUrl}")`);
      document.documentElement.dataset.luckyMagicHouseArtwork = 'ready';
    })
    .catch(error => {
      document.documentElement.dataset.luckyMagicHouseArtwork = 'error';
      console.warn('Lucky Magic House artwork unavailable.', error);
    });

  if (!app) return;

  const markReusableCards = () => {
    app.querySelectorAll('.event-card').forEach(card => {
      const key = card.querySelector('h3')?.textContent?.trim().toLowerCase() || '';
      card.classList.toggle('event-lucky-chest', key === 'lucky chest');
    });
  };

  new MutationObserver(markReusableCards).observe(app, { childList: true, subtree: true });
  window.addEventListener('hashchange', markReusableCards);
  window.addEventListener('server504:localechange', markReusableCards);
  markReusableCards();
})();