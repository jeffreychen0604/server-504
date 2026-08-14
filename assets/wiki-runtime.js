(() => {
  const app = document.getElementById('app');
  const languageSelect = document.getElementById('languageSelect');
  const searchInputEl = document.getElementById('searchInput');
  const searchDialogEl = document.getElementById('searchDialog');
  if (!app || !window.marked) return;

  const MANIFEST_URL = 'content/wiki-manifest.json';
  const TITLES_URL = 'content/wiki-titles.json';
  const SEARCH_INDEX_URL = 'content/wiki-search.json';
  const i18n = window.Server504I18N;
  const t = key => i18n?.t(key, locale()) || key;
  const STOP_WORDS = new Set([
    'and','the','for','with','from','into','that','this','current','overview','reference','system','systems',
    'dark','war','survival','server','game','wiki','guide','progression','official','community','data'
  ]);
  const HUB_BOOSTS = {
    'HERO PROFILE': ['hero-database','factions-and-heroes','hero-investment-framework'],
    'HEROES': ['hero-database','factions-and-heroes','hero-investment-framework'],
    'APC': ['apc-modified-vehicle','apc-chips','apc-parts-and-sets'],
    'PET AGENTS': ['pet-agents-overview','pet-roster-and-unlocks'],
    'ALLIANCE': ['alliance-systems-overview'],
    'EVENTS': ['events-overview'],
    'PROGRESSION': ['progression-planning','watchtower-and-industrial'],
    'RESEARCH': ['research-center-overview','research-priority-framework'],
    'SHELTER': ['shelter-buildings-overview','shelter-building-priority'],
    'DAILY UTILITY': ['daily-utility-systems-overview','daily-utility-routine'],
    'ECONOMY': ['shops-and-currencies-overview','resource-source-index'],
    'WORLD & STATE': ['world-map-and-state-systems'],
    'SEASON 4': ['season-4-sealed-island']
  };

  let manifestPromise;
  let titleMapPromise;
  let searchIndexDataPromise;
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

  function localizedGroup(raw) {
    return i18n?.group(normalizeGroup(raw), locale()) || raw;
  }

  function normalizeText(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function significantTokens(value) {
    return new Set(normalizeText(value).split(' ').filter(token => token.length > 2 && !STOP_WORDS.has(token)));
  }

  async function loadTitleMap() {
    if (!titleMapPromise) {
      titleMapPromise = fetch(TITLES_URL, { cache: 'force-cache' })
        .then(res => res.ok ? res.json() : { titles: {} })
        .catch(() => ({ titles: {} }));
    }
    return titleMapPromise;
  }

  function localTitle(article, titleMap) {
    if (locale() === 'en') return article.title;
    return titleMap?.titles?.[article.slug]?.[locale()] || article.title;
  }

  function localCategory(def) {
    const localized = i18n?.category(def.id, locale());
    return localized ? { ...def, title: localized[0], description: localized[1] } : def;
  }

  async function loadManifest() {
    if (!manifestPromise) {
      manifestPromise = fetch(MANIFEST_URL, { cache: 'force-cache' }).then(async res => {
        if (!res.ok) throw new Error(`Manifest HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data.articles) || !Array.isArray(data.categories)) throw new Error('Invalid Wiki manifest');
        data.articleMap = new Map(data.articles.map(article => [article.slug, article]));
        data.categories.forEach(category => { category.normalizedGroups = new Set(category.groups.map(normalizeGroup)); });
        return data;
      });
    }
    return manifestPromise;
  }

  async function loadSearchIndexData() {
    if (!searchIndexDataPromise) {
      searchIndexDataPromise = fetch(SEARCH_INDEX_URL, { cache: 'force-cache' }).then(async res => {
        if (!res.ok) throw new Error(`Search index HTTP ${res.status}`);
        const data = await res.json();
        if (!data || data.version !== 1 || !data.locales || typeof data.locales !== 'object') {
          throw new Error('Invalid Wiki search index');
        }
        return data;
      }).catch(error => {
        searchIndexDataPromise = null;
        throw error;
      });
    }
    return searchIndexDataPromise;
  }

  function categoryForArticle(manifest, article) {
    const group = normalizeGroup(article.group);
    return manifest.categories.find(category => category.normalizedGroups?.has(group)) || null;
  }

  function header(title, description, badges = []) {
    return `<header class="page-header wiki-research-header">
      <div class="eyebrow">${t('wikiEyebrow')}</div>
      <h1>${title}</h1>
      <p>${description}</p>
      <div class="meta-row">${badges.map(x => `<span class="meta-chip">${x}</span>`).join('')}</div>
    </header>`;
  }

  function confidenceLegend() {
    return `<details class="wiki-trust-panel">
      <summary><span><strong>${t('howReadWiki')}</strong><small>${t('sourceConfidence')}</small></span><span class="wiki-trust-chevron" aria-hidden="true">⌄</span></summary>
      <div class="wiki-trust-body">
        <div class="wiki-research-notice"><strong>${t('sourcePolicyLabel')}</strong><span>${t('sourcePolicy')}</span></div>
        <div class="wiki-confidence-legend">
          <div class="wiki-confidence-item"><strong>${t('confidenceOfficial')}</strong><span>${t('confidenceOfficialDesc')}</span></div>
          <div class="wiki-confidence-item"><strong>${t('confidenceCommunity')}</strong><span>${t('confidenceCommunityDesc')}</span></div>
          <div class="wiki-confidence-item"><strong>${t('confidenceVerify')}</strong><span>${t('confidenceVerifyDesc')}</span></div>
        </div>
      </div>
    </details>`;
  }

  function card(article, titleMap) {
    const showDescription = locale() === 'en';
    return `<a class="wiki-research-card" href="#/wiki/${article.slug}">
      <small>${localizedGroup(article.group)}</small>
      <h3>${localTitle(article, titleMap)}</h3>
      ${showDescription ? `<p>${article.description}</p>` : ''}
      <span>${t('openReference')}</span>
    </a>`;
  }

  function browserCard(article, titleMap) {
    const group = normalizeGroup(article.group);
    const showDescription = locale() === 'en';
    return `<a class="wiki-browser-card${showDescription ? '' : ' wiki-browser-card-compact'}" href="#/wiki/${article.slug}" data-wiki-browser-group="${group}">
      <div><small>${localizedGroup(article.group)}</small><h3>${localTitle(article, titleMap)}</h3></div>
      ${showDescription ? `<p>${article.description}</p>` : ''}
      <span aria-hidden="true">→</span>
    </a>`;
  }

  function categoryArticles(manifest, def) {
    return manifest.articles.filter(article => def.normalizedGroups.has(normalizeGroup(article.group)));
  }

  function preferredRootCategory(manifest) {
    let saved = '';
    try { saved = sessionStorage.getItem('server504-wiki-category') || ''; } catch (_) {}
    if (saved === 'all' || manifest.categories.some(category => category.id === saved)) return saved;
    return manifest.categories[0]?.id || 'all';
  }

  function categoryTile(def, articles, active) {
    const localized = localCategory(def);
    const groupLabels = [...new Set(articles.map(article => localizedGroup(article.group)))];
    return `<button class="wiki-category-tile${active ? ' active' : ''}" type="button" data-wiki-category-button="${def.id}" aria-selected="${active ? 'true' : 'false'}">
      <span class="wiki-category-tile-top"><small>${articles.length} ${t('wikiReferences')}</small><b aria-hidden="true">↘</b></span>
      <strong>${localized.title}</strong><span>${localized.description}</span>
      <em>${groupLabels.slice(0, 4).join(' · ')}${groupLabels.length > 4 ? ' · +' : ''}</em>
    </button>`;
  }

  function groupFilters(articles, panelId) {
    const groups = [...new Set(articles.map(article => normalizeGroup(article.group)))];
    if (groups.length <= 1) return '';
    return `<div class="wiki-group-filters" aria-label="${t('filterCategory')}">
      <button class="active" type="button" data-wiki-group-filter="all" data-wiki-group-panel="${panelId}" aria-pressed="true">${t('searchAll').toUpperCase()}</button>
      ${groups.map(group => `<button type="button" data-wiki-group-filter="${group}" data-wiki-group-panel="${panelId}" aria-pressed="false">${localizedGroup(group)}</button>`).join('')}
    </div>`;
  }

  function categoryPanel(def, articles, active, titleMap) {
    const localized = localCategory(def);
    return `<section class="wiki-browser-panel" id="wiki-category-${def.id}" data-wiki-category-panel="${def.id}" ${active ? '' : 'hidden'}>
      <div class="wiki-browser-head">
        <div><small>${t('browseCategory')}</small><h2>${localized.title}</h2><p>${localized.description}</p></div>
        <span class="wiki-ia-count">${articles.length} ${t('wikiReferences')}</span>
      </div>
      ${groupFilters(articles, def.id)}
      <div class="wiki-browser-list">${articles.map(article => browserCard(article, titleMap)).join('')}</div>
    </section>`;
  }

  function allReferencesPanel(manifest, active, titleMap) {
    const articles = [...manifest.articles].sort((a, b) => localTitle(a, titleMap).localeCompare(localTitle(b, titleMap), locale()));
    return `<section class="wiki-browser-panel wiki-browser-panel-all" id="wiki-category-all" data-wiki-category-panel="all" ${active ? '' : 'hidden'}>
      <div class="wiki-browser-head">
        <div><small>${t('fullIndex')}</small><h2>${t('allReferences')}</h2><p>${t('allReferencesDesc')}</p></div>
        <span class="wiki-ia-count">${articles.length} ${t('wikiReferences')}</span>
      </div>
      <div class="wiki-all-reference-list">${articles.map(article => `<a href="#/wiki/${article.slug}"><span>${localTitle(article, titleMap)}</span><small>${localizedGroup(article.group)}</small></a>`).join('')}</div>
    </section>`;
  }

  function bindRootInteractions() {
    const root = app.querySelector('[data-wiki-runtime-root]');
    if (!root) return;
    const categoryButtons = [...root.querySelectorAll('[data-wiki-category-button]')];
    const panels = [...root.querySelectorAll('[data-wiki-category-panel]')];

    const selectCategory = (categoryId, shouldScroll = true) => {
      categoryButtons.forEach(button => {
        const active = button.dataset.wikiCategoryButton === categoryId;
        button.classList.toggle('active', active);
        button.setAttribute('aria-selected', String(active));
      });
      panels.forEach(panel => { panel.hidden = panel.dataset.wikiCategoryPanel !== categoryId; });
      try { sessionStorage.setItem('server504-wiki-category', categoryId); } catch (_) {}
      const panel = panels.find(item => item.dataset.wikiCategoryPanel === categoryId);
      if (shouldScroll && panel) {
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    };

    categoryButtons.forEach(button => button.addEventListener('click', () => selectCategory(button.dataset.wikiCategoryButton)));
    root.querySelectorAll('[data-wiki-group-filter]').forEach(button => {
      button.addEventListener('click', () => {
        const panel = root.querySelector(`[data-wiki-category-panel="${button.dataset.wikiGroupPanel}"]`);
        if (!panel) return;
        const group = button.dataset.wikiGroupFilter;
        panel.querySelectorAll('[data-wiki-group-filter]').forEach(filterButton => {
          const active = filterButton === button;
          filterButton.classList.toggle('active', active);
          filterButton.setAttribute('aria-pressed', String(active));
        });
        panel.querySelectorAll('[data-wiki-browser-group]').forEach(articleCard => { articleCard.hidden = group !== 'all' && articleCard.dataset.wikiBrowserGroup !== group; });
      });
    });
    root.querySelector('.wiki-open-search')?.addEventListener('click', () => {
      if (typeof openSearch === 'function') openSearch();
    });
  }

  async function rootPage(manifest) {
    const titleMap = await loadTitleMap();
    const selectedCategory = preferredRootCategory(manifest);
    const categorySets = manifest.categories.map(def => ({ def, articles: categoryArticles(manifest, def) }));
    const categoryTiles = categorySets.filter(item => item.articles.length).map(item => categoryTile(item.def, item.articles, selectedCategory === item.def.id));

    categoryTiles.push(`<button class="wiki-category-tile wiki-category-tile-all${selectedCategory === 'all' ? ' active' : ''}" type="button" data-wiki-category-button="all" aria-selected="${selectedCategory === 'all' ? 'true' : 'false'}">
      <span class="wiki-category-tile-top"><small>${manifest.articles.length} ${t('wikiReferences')}</small><b aria-hidden="true">↘</b></span>
      <strong>${t('allReferences')}</strong><span>${t('allReferencesDesc')}</span><em>${t('fullIndex')}</em>
    </button>`);

    const panels = categorySets.filter(item => item.articles.length).map(item => categoryPanel(item.def, item.articles, selectedCategory === item.def.id, titleMap));
    panels.push(allReferencesPanel(manifest, selectedCategory === 'all', titleMap));

    return `<section class="page wiki-research-page wiki-overview-page" data-wiki-runtime-root="1">
      ${header(t('wikiTitle'), t('browseByCategoryDesc'), [`${manifest.articles.length} ${t('wikiReferences')}`, t('august2026'), t('communityMaintained')])}
      ${confidenceLegend()}
      <section class="wiki-category-overview" aria-labelledby="wikiBrowseTitle">
        <div class="wiki-overview-head"><div><small>${t('knowledgeMap')}</small><h2 id="wikiBrowseTitle">${t('browseByCategory')}</h2><p>${t('browseByCategoryDesc')}</p></div><button class="wiki-open-search search-trigger" type="button">${t('searchWiki')} <kbd>/</kbd></button></div>
        <div class="wiki-category-dashboard" role="tablist" aria-label="${t('browseByCategory')}">${categoryTiles.join('')}</div>
      </section>
      <div class="wiki-browser">${panels.join('')}</div>
      <div class="wiki-ia-audit-note">${manifest.articles.length} ${t('wikiAuditNote')}</div>
    </section>`;
  }

  function relatedScore(manifest, current, candidate) {
    if (current.slug === candidate.slug) return -1;
    const currentGroup = normalizeGroup(current.group);
    const candidateGroup = normalizeGroup(candidate.group);
    const currentCategory = categoryForArticle(manifest, current)?.id || '';
    const candidateCategory = categoryForArticle(manifest, candidate)?.id || '';
    let score = 0;
    if (currentGroup === candidateGroup) score += 40;
    if (currentCategory && currentCategory === candidateCategory) score += 18;
    const currentTokens = significantTokens(`${current.title} ${current.description}`);
    const candidateTokens = significantTokens(`${candidate.title} ${candidate.description}`);
    currentTokens.forEach(token => { if (candidateTokens.has(token)) score += 7; });
    const hubs = HUB_BOOSTS[currentGroup] || [];
    const hubIndex = hubs.indexOf(candidate.slug);
    if (hubIndex >= 0) score += 34 - hubIndex * 5;
    if (current.slug.startsWith('hero-') && candidate.slug === 'hero-database') score += 24;
    if (current.slug.startsWith('pet-') && candidate.slug === 'pet-agents-overview') score += 24;
    if (current.slug.includes('chip') && candidate.slug === 'chip-factory') score += 20;
    if (current.slug.includes('armory') && candidate.slug === 'alliance-systems-overview') score += 16;
    return score;
  }

  function relatedReferences(manifest, article, limit = 4) {
    return manifest.articles.map(candidate => ({ candidate, score: relatedScore(manifest, article, candidate) })).filter(item => item.score > 0).sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title)).slice(0, limit).map(item => item.candidate);
  }

  async function relatedSection(manifest, article, titleMap) {
    const related = relatedReferences(manifest, article);
    if (!related.length) return '';
    return `<section class="wiki-related" aria-labelledby="wikiRelatedTitle">
      <div class="wiki-related-head"><div><small>${t('discoverNext')}</small><h2 id="wikiRelatedTitle">${t('relatedReferences')}</h2></div><a href="#/wiki">${t('browseAll')}</a></div>
      <div class="wiki-related-grid">${related.map(item => card(item, titleMap)).join('')}</div>
    </section>`;
  }

  async function articlePage(manifest, article) {
    const requestedLocale = locale();
    const localized = `content/${requestedLocale}/wiki/${article.file}`;
    const fallback = `content/en/wiki/${article.file}`;
    let usedFallback = false;
    let res = await fetch(localized, { cache: 'force-cache' });
    if (!res.ok) {
      usedFallback = requestedLocale !== 'en';
      res = await fetch(fallback, { cache: 'force-cache' });
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const [text, titleMap] = await Promise.all([res.text(), loadTitleMap()]);
    const localeBadge = usedFallback ? `${t('englishSource')} · ${requestedLocale.toUpperCase()} ${t('translationPending')}` : requestedLocale.toUpperCase();
    const description = usedFallback ? `${t('englishSource')} · ${t('translationPending')}` : article.description;
    return `<section class="page wiki-research-page wiki-article-page" data-wiki-runtime-article="${article.slug}">
      <a class="wiki-back" href="#/wiki">${t('backWiki')}</a>
      ${header(localTitle(article, titleMap), description, [t('august2026'), localeBadge])}
      <article class="markdown-body wiki-article-body">${marked.parse(text)}</article>
      ${await relatedSection(manifest, article, titleMap)}
    </section>`;
  }

  function stopObserver() { observer?.disconnect(); }
  function startObserver() {
    observer?.disconnect();
    observer = new MutationObserver(() => { if (isWikiRoute()) scheduleRender(true, 0); });
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
    app.innerHTML = `<div class="page loading">${t('loading')}</div>`;

    try {
      if (!slug) {
        app.innerHTML = await rootPage(manifest);
        bindRootInteractions();
      } else {
        const article = manifest.articleMap.get(slug);
        app.innerHTML = article ? await articlePage(manifest, article) : `<section class="page wiki-research-page">${header(t('wikiNotFound'), t('wikiNotFoundDesc'), ['404'])}<a class="wiki-back" href="#/wiki">${t('returnWiki')}</a></section>`;
      }
    } catch (error) {
      app.innerHTML = `<section class="page"><div class="error-box">${t('unableDocument')}: ${error.message}</div></section>`;
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

  async function getWikiSearchEntries() {
    const manifest = await loadManifest();
    const searchData = await loadSearchIndexData();
    const lang = locale();
    const indexedArticles = new Map((searchData.locales?.[lang] || searchData.locales?.en || []).map(entry => [entry.slug, entry]));
    const entries = manifest.articles.map(article => {
      const indexed = indexedArticles.get(article.slug);
      const category = categoryForArticle(manifest, article);
      const localizedCategory = category ? localCategory(category).title : t('gameWiki');
      return {
        route: `wiki/${article.slug}`,
        label: `${t('gameWiki')} · ${localizedGroup(article.group)}`,
        heading: indexed?.heading || localTitle(article, {}),
        body: indexed?.body || article.description,
        group: normalizeGroup(article.group),
        category: localizedCategory,
        aliases: [article.slug.replace(/-/g, ' '), article.title]
      };
    });

    entries.unshift({
      route: 'wiki', label: t('gameWiki'), heading: t('wikiTitle'), body: `${t('browseByCategoryDesc')} ${manifest.categories.map(x => localCategory(x).title).join(' ')}`,
      group: 'FOUNDATION', category: t('gameWiki'), aliases: ['knowledge base','wiki']
    });
    return entries;
  }

  async function ensureWikiSearchIndex() {
    try {
      if (typeof searchIndex === 'undefined' || !Array.isArray(searchIndex)) return;
      if (!searchEntriesPromise) searchEntriesPromise = getWikiSearchEntries();
      const entries = await searchEntriesPromise;
      searchIndex = searchIndex.filter(entry => entry.route !== 'wiki' && !String(entry.route || '').startsWith('wiki/'));
      searchIndex.push(...entries);
      if (searchDialogEl?.open && typeof renderSearchResults === 'function') renderSearchResults(searchInputEl?.value || '');
    } catch (_) {}
  }

  window.Server504Wiki = {
    loadManifest,
    render: () => renderWiki(true),
    refreshSearch: ensureWikiSearchIndex,
    related: async slug => {
      const manifest = await loadManifest();
      const article = manifest.articleMap.get(slug);
      return article ? relatedReferences(manifest, article) : [];
    }
  };

  window.addEventListener('hashchange', () => scheduleRender(true, 0));
  languageSelect?.addEventListener('change', () => {
    activeKey = '';
    searchEntriesPromise = null;
    scheduleRender(true, 0);
    setTimeout(ensureWikiSearchIndex, 120);
  });
  window.addEventListener('server504:localechange', () => {
    activeKey = '';
    searchEntriesPromise = null;
    scheduleRender(true, 0);
  });
  searchInputEl?.addEventListener('focus', ensureWikiSearchIndex);
  document.addEventListener('pointerdown', event => { if (event.target.closest?.('.header-search, .search-trigger')) ensureWikiSearchIndex(); }, true);

  startObserver();
  setTimeout(() => scheduleRender(true, 0), 160);
})();
