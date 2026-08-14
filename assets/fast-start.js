/* Render the public Home immediately; search indexing continues in the background. */
(() => {
  const route = (location.hash.replace(/^#\//, '').split('?')[0] || 'home').split('/')[0];
  if (route !== 'home') return;
  if (typeof window.render !== 'function') return;
  try {
    const result = window.render();
    if (result && typeof result.catch === 'function') result.catch(() => {});
  } catch (_) {}
})();
