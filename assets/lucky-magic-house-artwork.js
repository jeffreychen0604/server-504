/* Lucky Magic House artwork loader.
 * Reassembles the validated 960x320 WebP from small text chunks so GitHub
 * transport limits cannot corrupt the decorative asset.
 */
(() => {
  const chunks = [
    './assets/lucky-magic-house/chunk-00a.txt',
    './assets/lucky-magic-house/chunk-00b.txt',
    './assets/lucky-magic-house/chunk-01.txt',
    './assets/lucky-magic-house/chunk-02.txt',
    './assets/lucky-magic-house/chunk-03.txt'
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
})();