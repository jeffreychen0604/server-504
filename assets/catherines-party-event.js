/* Catherine's Party featured-event identity + verified chunked artwork loader.
 * Canonical reusable artwork lives in assets/event-library/catherines-party/.
 * The browser reconstructs the exact WebP payload and validates it before applying it.
 */
(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const ART_VERSION = '20260902-0900';
  const EXPECTED_BASE64_LENGTH = 48628;
  const artworkParts = [
    './assets/event-library/catherines-party/part-00a.txt',
    './assets/event-library/catherines-party/part-00b.txt',
    './assets/event-library/catherines-party/part-01.txt',
    './assets/event-library/catherines-party/part-02.txt',
    './assets/event-library/catherines-party/part-03.txt',
    './assets/event-library/catherines-party/part-04.txt'
  ].map(src => `${src}?v=${ART_VERSION}`);

  let queued = false;
  let artworkPromise = null;

  const loadPart = source => fetch(source, { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error(`Artwork chunk HTTP ${response.status}`);
      return response.text();
    })
    .then(text => text.trim());

  const validateImage = dataUrl => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth < 1000 || img.naturalHeight < 200) {
        reject(new Error(`Unexpected Catherine artwork dimensions ${img.naturalWidth}x${img.naturalHeight}`));
        return;
      }
      resolve(`url("${dataUrl}")`);
    };
    img.onerror = () => reject(new Error('Catherine artwork decode failed'));
    img.src = dataUrl;
  });

  const getArtwork = () => {
    artworkPromise ||= Promise.all(artworkParts.map(loadPart))
      .then(parts => {
        const base64 = parts.join('');
        if (base64.length !== EXPECTED_BASE64_LENGTH) {
          throw new Error(`Incomplete Catherine artwork: ${base64.length}/${EXPECTED_BASE64_LENGTH}`);
        }
        if (!base64.startsWith('UklG')) {
          throw new Error('Invalid Catherine WebP signature');
        }
        return validateImage(`data:image/webp;base64,${base64}`);
      })
      .catch(error => {
        console.warn("Catherine's Party artwork unavailable.", error);
        return null;
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