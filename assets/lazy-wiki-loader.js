/* Server 504 performance guard: load the heavy Wiki/search stack only when it is actually needed. */
(() => {
  let stackPromise = null;
  let markedPromise = null;

  const routeParts = () => location.hash.replace(/^#\//, '').split('?')[0].split('/').filter(Boolean);
  const isWikiRoute = () => routeParts()[0] === 'wiki';
  const markedRuntime = document.currentScript?.dataset.markedRuntime || 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = [...document.scripts].find(script => script.src === new URL(src, location.href).href);
      if (existing) {
        if (existing.dataset.loaded === '1' || existing.readyState === 'complete') return resolve();
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.onload = () => { script.dataset.loaded = '1'; resolve(); };
      script.onerror = () => reject(new Error(`Unable to load ${src}`));
      document.head.appendChild(script);
    });
  }

  function ensureMarked() {
    if (window.marked) return Promise.resolve(window.marked);
    if (!markedPromise) {
      markedPromise = loadScript(markedRuntime).then(() => {
        if (!window.marked) throw new Error('Marked runtime did not expose window.marked');
        return window.marked;
      }).catch(error => {
        markedPromise = null;
        throw error;
      });
    }
    return markedPromise;
  }

  async function loadWikiStack() {
    if (window.Server504Wiki) return window.Server504Wiki;
    if (stackPromise) return stackPromise;

    stackPromise = (async () => {
      await ensureMarked();
      if (!window.Server504Wiki) {
        await loadScript('./assets/wiki-runtime.js');
      }
      await loadScript('./assets/search-discovery.js');
      if (isWikiRoute()) window.Server504Wiki?.render?.();
      return window.Server504Wiki;
    })().catch(error => {
      stackPromise = null;
      console.warn('Server 504 Wiki stack could not be loaded.', error);
      throw error;
    });

    return stackPromise;
  }

  function maybeLoadForRoute() {
    if (isWikiRoute()) loadWikiStack().catch(() => {});
  }

  window.Server504LazyWiki = { load: loadWikiStack, ensureMarked };

  window.addEventListener('hashchange', maybeLoadForRoute);
  document.addEventListener('pointerdown', event => {
    if (event.target.closest?.('.header-search, .search-trigger')) loadWikiStack().catch(() => {});
  }, true);
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) {
      loadWikiStack().catch(() => {});
    }
  }, true);
  document.getElementById('searchInput')?.addEventListener('focus', () => loadWikiStack().catch(() => {}));

  maybeLoadForRoute();
})();
