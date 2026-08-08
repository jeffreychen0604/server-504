(() => {
  const app = document.getElementById('app');
  const languageSelect = document.getElementById('languageSelect');
  const searchInputEl = document.getElementById('searchInput');
  const searchDialogEl = document.getElementById('searchDialog');
  if (!app || !window.marked) return;

  const MANIFEST_URL = 'content/wiki-manifest.json';
  let manifestPromise;
  let searchEntriesPromise;
  let observer;
  let renderTimer;
  let activeKey = '';

  const routeParts = () => location.hash.replace(/^#\//, '').split('?')[0].split('/').filter(Boolean);
  const isWikiRoute = () => routeParts()[0] === 'wiki';
  const locale = () => (languageSelect?.value || document.documentElement.lang || 'en').toLowerCase();

  function normalizeGroup(raw) {
    const group = String(raw || '').trim().toUpperCase();
    if (group.startsWith('HERO PROFILE')) return 'HERO PROFILE';
    if (group.startsWith('PET AGENT PROFILE')) return 'PET AGENT PROFILE';
    return group;
  }

  async function loadManifest() {
    if (!manifestPromise) {
      manifestPromise = fetch(MANIFEST_URL, { cache: 'no-store' }).then(async res => {
        if (!res.ok) throw new Error(`Manifest HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data.articles) || !Array.isArray(data.categories)) {
          throw new Error('Invalid Wiki manifest');
        }
        data.articleMap = new Map(data.articles.map(article => [article.slug, article]));
        return data;
      });
    }
    return manifestPromise;
  }

  function header(title, description, badges = []) {
    return `<header class="page-header wiki-research-header">
      <div class="eyebrow">DARK WAR: SURVIVAL · VERIFIED KNOWLEDGE</div>
      <h1>${title}</h1>
      <p>${description}</p>
      <div class="meta-row">${badges.map(x => `<span class="meta-chip">${x}</span>`).join('')}</div>
    </header>`;
  }

  function confidenceLegend() {
    return `<div class="wiki-confidence-legend">
      <div class="wiki-confidence-item">
        <strong>Official / Current</strong>
        <span>Official listing, patch notes or current in-game evidence supports the claim.</span>
      </div>
      <div class="wiki-confidence-item">
        <strong>Community / Cross-checked</strong>
        <span>Useful community evidence, but the mechanic or number may still be version-sensitive.</span>
      </div>
      <div class="wiki-confidence-item">
        <strong>Verify Server 504</strong>
        <span>Current Server 504 UI evidence is required before treating the value as canonical.</span>
      </div>
    </div>`;
  }

  function card(article) {
    return `<a class="wiki-research-card" href="#/wiki/${article.slug}">
      <small>${article.group}</small>
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      <span>OPEN REFERENCE →</span>
    </a>`;
  }

  function categorySection(def, articles) {
    return `<section class="wiki-ia-section" data-wiki-category="${def.id}">
      <div class="wiki-ia-section-head">
        <div class="wiki-ia-section-copy">
          <small>GAME WIKI CATEGORY</small>
          <h2>${def.title}</h2>
          <p>${def.description}</p>
        </div>
        <span class="wiki-ia-count">${articles.length} REFERENCES</span>
      </div>
      <div class="wiki-ia-cards">${articles.map(card).join('')}</div>
    </section>`;
  }

  function rootPage(manifest) {
    const used = new Set();
    const sections = [];

    manifest.categories.forEach(def => {
      const groupSet = new Set(def.groups.map(normalizeGroup));
      const matches = manifest.articles.filter(article => {
        if (used.has(article.slug)) return false;
        if (!groupSet.has(normalizeGroup(article.group))) return false;
        used.add(article.slug);
        return true;
      });
      if (matches.length) sections.push(categorySection(def, matches));
    });

    const unmatched = manifest.articles.filter(article => !used.has(article.slug));
    if (unmatched.length) {
      sections.push(categorySection({
        id: 'other',
        title: 'Other References',
        description: 'References that have not yet been mapped into the current Wiki taxonomy.'
      }, unmatched));
    }

    return `<section class="page wiki-research-page" data-wiki-runtime-root="1">
      ${header('Game Wiki', manifest.rootDescription, ['RESEARCHED', 'AUG 2026', 'COMMUNITY MAINTAINED'])}
      <div class="wiki-research-notice">
        <strong>Source policy</strong>
        <span>${manifest.sourcePolicy}</span>
      </div>
      ${confidenceLegend()}
      <div class="wiki-research-grid wiki-ia-grouped">${sections.join('')}</div>
      <div class="wiki-ia-audit-note">${manifest.articles.length} references are indexed from one manifest. Taxonomy, routing and global search now use the same article registry.</div>
    </section>`;
  }

  async function articlePage(article) {
    const requestedLocale = locale();
    const localized = `content/${requestedLocale}/wiki/${article.file}`;
    const fallback = `content/en/wiki/${article.file}`;
    let usedFallback = false;
    let res = await fetch(localized, { cache: 'no-store' });

    if (!res.ok) {
      usedFallback = requestedLocale !== 'en';
      res = await fetch(fallback, { cache: 'no-store' });
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const text = await res.text();
    const localeBadge = usedFallback
      ? `EN SOURCE · ${requestedLocale.toUpperCase()} PENDING`
      : requestedLocale.toUpperCase();

    return `<section class="page wiki-research-page wiki-article-page" data-wiki-runtime-article="${article.slug}">
      <a class="wiki-back" href="#/wiki">← Game Wiki</a>
      ${header(article.title, article.description, ['VERIFIED AUG 2026', localeBadge])}
      <article class="markdown-body wiki-article-body">${marked.parse(text)}</article>
    </section>`;
  }

  function stopObserver() {
    observer?.disconnect();
  }

  function startObserver() {
    observer?.disconnect();
    observer = new MutationObserver(() => {
      if (isWikiRoute()) scheduleRender(true, 0);
    });
    observer.observe(app, { childList: true, subtree: false });
  }

  async function renderWiki(force = false) {
    if (!isWikiRoute()) {
      activeKey = '';
      app.removeAttribute('data-wiki-runtime-route');
      return;
    }

    const manifest = await loadManifest();
    const parts = routeParts();
    const slug = parts[1] || '';
    const key = `${slug || 'root'}:${locale()}`;

    if (!force && activeKey === key && app.dataset.wikiRuntimeRoute === key) return;
    if (force && activeKey === key && app.dataset.wikiRuntimeRoute === key && app.querySelector('[data-wiki-runtime-root], [data-wiki-runtime-article]')) return;

    activeKey = key;
    stopObserver();
    app.innerHTML = '<div class="page loading">Loading Wiki…</div>';

    try {
      if (!slug) {
        app.innerHTML = rootPage(manifest);
      } else {
        const article = manifest.articleMap.get(slug);
        app.innerHTML = article
          ? await articlePage(article)
          : `<section class="page wiki-research-page">${header('Wiki article not found', 'The requested Dark War: Survival reference does not exist.', ['404'])}<a class="wiki-back" href="#/wiki">← Return to Game Wiki</a></section>`;
      }
    } catch (error) {
      app.innerHTML = `<section class="page"><div class="error-box">Unable to load Wiki: ${error.message}</div></section>`;
    }

    app.dataset.wikiRuntimeRoute = key;
    app.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'auto' });
    window.Server504WikiCalculators?.mount?.();
    startObserver();
  }

  function scheduleRender(force = false, delay = 10) {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(() => renderWiki(force), delay);
  }

  function cleanMarkdown(text) {
    return text
      .replace(/^---[\s\S]*?---/m, ' ')
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/[#>*_`|\[\]()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  async function getWikiSearchEntries() {
    if (!searchEntriesPromise) {
      searchEntriesPromise = loadManifest().then(async manifest => {
        const entries = await Promise.all(manifest.articles.map(async article => {
          let body = article.description;
          try {
            const res = await fetch(`content/en/wiki/${article.file}`, { cache: 'no-store' });
            if (res.ok) body = cleanMarkdown(await res.text());
          } catch (_) {}
          return {
            route: `wiki/${article.slug}`,
            label: `Game Wiki · ${article.group}`,
            heading: article.title,
            body
          };
        }));

        entries.unshift({
          route: 'wiki',
          label: 'Game Wiki',
          heading: 'Game Wiki',
          body: `${manifest.rootDescription} ${manifest.categories.map(x => x.title).join(' ')}`
        });
        return entries;
      });
    }
    return searchEntriesPromise;
  }

  async function ensureWikiSearchIndex() {
    try {
      if (typeof searchIndex === 'undefined' || !Array.isArray(searchIndex)) return;
      const entries = await getWikiSearchEntries();
      const wikiRoutes = new Set(entries.map(entry => entry.route));

      searchIndex = searchIndex.filter(entry => {
        if (entry.route === 'wiki') return false;
        if (String(entry.route || '').startsWith('wiki/')) return false;
        return !wikiRoutes.has(entry.route);
      });
      searchIndex.push(...entries);

      if (searchDialogEl?.open && typeof renderSearchResults === 'function') {
        renderSearchResults(searchInputEl?.value || '');
      }
    } catch (_) {}
  }

  window.Server504Wiki = {
    loadManifest,
    render: () => renderWiki(true),
    refreshSearch: ensureWikiSearchIndex
  };

  window.addEventListener('hashchange', () => scheduleRender(true, 0));
  languageSelect?.addEventListener('change', () => {
    activeKey = '';
    scheduleRender(true, 0);
  });
  searchInputEl?.addEventListener('focus', ensureWikiSearchIndex);
  document.addEventListener('pointerdown', event => {
    if (event.target.closest?.('.header-search, .search-trigger')) ensureWikiSearchIndex();
  }, true);

  startObserver();
  setTimeout(() => scheduleRender(true, 0), 160);
  setTimeout(ensureWikiSearchIndex, 350);
  setTimeout(ensureWikiSearchIndex, 1400);
  setTimeout(ensureWikiSearchIndex, 3200);
})();
