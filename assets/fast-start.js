/* Server 504 fast start + performance guard.
   Home must never bulk-fetch every Wiki article just to prepare search. */
(() => {
  const routeName = () => (location.hash.replace(/^#\//, '').split('?')[0] || 'home').split('/')[0];
  let wikiNetworkUnlocked = routeName() === 'wiki';
  const nativeFetch = window.fetch.bind(window);

  function isWikiArticleRequest(input) {
    const value = typeof input === 'string' ? input : input?.url || '';
    try {
      const url = new URL(value, location.href);
      return /\/content\/[a-z]{2}\/wiki\//i.test(url.pathname);
    } catch (_) {
      return /content\/[a-z]{2}\/wiki\//i.test(value);
    }
  }

  window.fetch = function guardedFetch(input, init) {
    if (!wikiNetworkUnlocked && isWikiArticleRequest(input)) {
      return Promise.reject(new Error('Wiki bulk fetch deferred until Wiki/Search is opened'));
    }
    return nativeFetch(input, init);
  };

  function unlockWikiNetwork() {
    if (wikiNetworkUnlocked) return;
    wikiNetworkUnlocked = true;
    /* wiki-runtime resets its cached search entries on this event, so the next
       user-initiated search can build the full index with real article bodies. */
    setTimeout(() => window.dispatchEvent(new CustomEvent('server504:localechange', {
      detail: { locale: document.documentElement.lang || 'en', reason: 'wiki-network-unlocked' }
    })), 0);
  }

  window.Server504WikiNetwork = {
    unlock: unlockWikiNetwork,
    isUnlocked: () => wikiNetworkUnlocked
  };

  window.addEventListener('hashchange', () => {
    if (routeName() === 'wiki') unlockWikiNetwork();
  });
  document.addEventListener('pointerdown', event => {
    if (event.target.closest?.('.header-search, .search-trigger')) unlockWikiNetwork();
  }, true);
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) unlockWikiNetwork();
  }, true);
  document.getElementById('searchInput')?.addEventListener('focus', unlockWikiNetwork);

  if (routeName() !== 'home') return;
  if (typeof window.render !== 'function') return;
  try {
    const result = window.render();
    if (result && typeof result.catch === 'function') result.catch(() => {});
  } catch (_) {}
})();