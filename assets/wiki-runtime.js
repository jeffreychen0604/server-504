(() => {
  const app = document.getElementById('app');
  const languageSelect = document.getElementById('languageSelect');
  const searchInputEl = document.getElementById('searchInput');
  const searchDialogEl = document.getElementById('searchDialog');
  if (!app || !window.marked) return;

  const MANIFEST_URL = 'content/wiki-manifest.json';
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

  function normalizeText(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function significantTokens(value) {
    return new Set(
      normalizeText(value)
        .split(' ')
        .filter(token => token.length > 2 && !STOP_WORDS.has(token))
    );
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
        data.categories.forEach(category => {
          category.normalizedGroups = new Set(category.groups.map(normalizeGroup));
        });
        return data;
      });
    }
    return manifestPromise;
  }

  function categoryForArticle(manifest, article) {
    const group = normalizeGroup(article.group);
    return manifest.categories.find(category => category.normalizedGroups?.has(group)) || null;
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
    return `<details class="wiki-trust-panel">
      <summary>
        <span><strong>How to read this Wiki</strong><small>Source confidence & verification policy</small></span>
        <span class="wiki-trust-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="wiki-trust-body">
        <div class="wiki-research-notice">
          <strong>Source policy</strong>
          <span>Official patch notes first for current limits and feature changes; established Dark War community databases for deeper mechanics; Server 504 in-game evidence wins when sources conflict.</span>
        </div>
        <div class="wiki-confidence-legend">
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
        </div>
      </div>
    </details>`;
  }

  function card(article) {
    return `<a class="wiki-research-card" href="#/wiki/${article.slug}">
      <small>${article.group}</small>
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      <span>OPEN REFERENCE →</span>
    </a>`;
  }

  function browserCard(article) {
    const group = normalizeGroup(article.group);
    return `<a class="wiki-browser-card" href="#/wiki/${article.slug}" data-wiki-browser-group="${group}">
      <div>
        <small>${article.group}</small>
        <h3>${article.title}</h3>
      </div>
      <p>${article.description}</p>
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
    const groupLabels = [...new Set(articles.map(article => normalizeGroup(article.group)))];
    return `<button class="wiki-category-tile${active ? ' active' : ''}" type="button" data-wiki-category-button="${def.id}" aria-selected="${active ? 'true' : 'false'}">
      <span class="wiki-category-tile-top"><small>${articles.length} REFERENCES</small><b aria-hidden="true">↘</b></span>
      <strong>${def.title}</strong>
      <span>${def.description}</span>
      <em>${groupLabels.slice(0, 4).join(' · ')}${groupLabels.length > 4 ? ' · +' : ''}</em>
    </button>`;
  }

  function groupFilters(articles, panelId) {
    const groups = [...new Set(articles.map(article => normalizeGroup(article.group)))];
    if (groups.length <= 1) return '';
    return `<div class="wiki-group-filters" aria-label="Filter this category">
      <button class="active" type="button" data-wiki-group-filter="all" data-wiki-group-panel="${panelId}" aria-pressed="true">ALL</button>
      ${groups.map(group => `<button type="button" data-wiki-group-filter="${group}" data-wiki-group-panel="${panelId}" aria-pressed="false">${group}</button>`).join('')}
    </div>`;
  }

  function categoryPanel(def, articles, active) {
    return `<section class="wiki-browser-panel" id="wiki-category-${def.id}" data-wiki-category-panel="${def.id}" ${active ? '' : 'hidden'}>
      <div class="wiki-browser-head">
        <div>
          <small>BROWSE CATEGORY</small>
          <h2>${def.title}</h2>
          <p>${def.description}</p>
        </div>
        <span class="wiki-ia-count">${articles.length} REFERENCES</span>
      </div>
      ${groupFilters(articles, def.id)}
      <div class="wiki-browser-list">${articles.map(browserCard).join('')}</div>
    </section>`;
  }

  function allReferencesPanel(manifest, active) {
    const articles = [...manifest.articles].sort((a, b) => a.title.localeCompare(b.title));
    return `<section class="wiki-browser-panel wiki-browser-panel-all" id="wiki-category-all" data-wiki-category-panel="all" ${active ? '' : 'hidden'}>
      <div class="wiki-browser-head">
        <div>
          <small>FULL INDEX</small>
          <h2>All references</h2>
          <p>Alphabetical compact index of every registered Wiki article. Use global search for the fastest exact lookup.</p>
        </div>
        <span class="wiki-ia-count">${articles.length} REFERENCES</span>
      </div>
      <div class="wiki-all-reference-list">${articles.map(article => `<a href="#/wiki/${article.slug}"><span>${article.title}</span><small>${article.group}</small></a>`).join('')}</div>
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
      panels.forEach(panel => {
        panel.hidden = panel.dataset.wikiCategoryPanel !== categoryId;
      });
      try { sessionStorage.setItem('server504-wiki-category', categoryId); } catch (_) {}

      const panel = panels.find(item => item.dataset.wikiCategoryPanel === categoryId);
      if (shouldScroll && panel) {
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    };

    categoryButtons.forEach(button => {
      button.addEventListener('click', () => selectCategory(button.dataset.wikiCategoryButton));
    });

    root.querySelectorAll('[data-wiki-group-filter]').forEach(button => {
      button.addEventListener('click', () => {
        const panelId = button.dataset.wikiGroupPanel;
        const group = button.dataset.wikiGroupFilter;
        const panel = root.querySelector(`[data-wiki-category-panel="${panelId}"]`);
        if (!panel) return;

        panel.querySelectorAll('[data-wiki-group-filter]').forEach(filterButton => {
          const active = filterButton === button;
          filterButton.classList.toggle('active', active);
          filterButton.setAttribute('aria-pressed', String(active));
        });
        panel.querySelectorAll('[data-wiki-browser-group]').forEach(articleCard => {
          articleCard.hidden = group !== 'all' && articleCard.dataset.wikiBrowserGroup !== group;
        });
      });
    });
  }

  function rootPage(manifest) {
    const selectedCategory = preferredRootCategory(manifest);
    const categorySets = manifest.categories.map(def => ({ def, articles: categoryArticles(manifest, def) }));

    const categoryTiles = categorySets
      .filter(item => item.articles.length)
      .map(item => categoryTile(item.def, item.articles, selectedCategory === item.def.id));

    categoryTiles.push(`<button class="wiki-category-tile wiki-category-tile-all${selectedCategory === 'all' ? ' active' : ''}" type="button" data-wiki-category-button="all" aria-selected="${selectedCategory === 'all' ? 'true' : 'false'}">
      <span class="wiki-category-tile-top"><small>${manifest.articles.length} REFERENCES</small><b aria-hidden="true">↘</b></span>
      <strong>All references</strong>
      <span>Compact alphabetical index for scanning the entire knowledge base without expanding every article card.</span>
      <em>FULL INDEX</em>
    </button>`);

    const panels = categorySets
      .filter(item => item.articles.length)
      .map(item => categoryPanel(item.def, item.articles, selectedCategory === item.def.id));
    panels.push(allReferencesPanel(manifest, selectedCategory === 'all'));

    return `<section class="page wiki-research-page wiki-overview-page" data-wiki-runtime-root="1">
      ${header('Game Wiki', manifest.rootDescription, [`${manifest.articles.length} REFERENCES`, 'AUG 2026', 'COMMUNITY MAINTAINED'])}
      ${confidenceLegend()}
      <section class="wiki-category-overview" aria-labelledby="wikiBrowseTitle">
        <div class="wiki-overview-head">
          <div>
            <small>KNOWLEDGE MAP</small>
            <h2 id="wikiBrowseTitle">Browse by category</h2>
            <p>Start with a category to keep the Wiki compact. Only the selected category is expanded below.</p>
          </div>
          <button class="wiki-open-search search-trigger" type="button">SEARCH WIKI <kbd>/</kbd></button>
        </div>
        <div class="wiki-category-dashboard" role="tablist" aria-label="Wiki categories">${categoryTiles.join('')}</div>
      </section>
      <div class="wiki-browser">${panels.join('')}</div>
      <div class="wiki-ia-audit-note">${manifest.articles.length} references · ${manifest.categories.length} primary categories · one manifest-driven Wiki index. Use Search for exact lookup or category drill-down for browsing.</div>
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
    currentTokens.forEach(token => {
      if (candidateTokens.has(token)) score += 7;
    });

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
    return manifest.articles
      .map(candidate => ({ candidate, score: relatedScore(manifest, article, candidate) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title))
      .slice(0, limit)
      .map(item => item.candidate);
  }

  function relatedSection(manifest, article) {
    const related = relatedReferences(manifest, article);
    if (!related.length) return '';
    return `<section class="wiki-related" aria-labelledby="wikiRelatedTitle">
      <div class="wiki-related-head">
        <div>
          <small>DISCOVER NEXT</small>
          <h2 id="wikiRelatedTitle">Related references</h2>
        </div>
        <a href="#/wiki">Browse all →</a>
      </div>
      <div class="wiki-related-grid">${related.map(card).join('')}</div>
    </section>`;
  }

  async function articlePage(manifest, article) {
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
      ${relatedSection(manifest, article)}
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
        bindRootInteractions();
      } else {
        const article = manifest.articleMap.get(slug);
        app.innerHTML = article
          ? await articlePage(manifest, article)
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
          const category = categoryForArticle(manifest, article);
          return {
            route: `wiki/${article.slug}`,
            label: `Game Wiki · ${article.group}`,
            heading: article.title,
            body,
            group: normalizeGroup(article.group),
            category: category?.title || 'Game Wiki',
            aliases: [article.slug.replace(/-/g, ' ')]
          };
        }));

        entries.unshift({
          route: 'wiki',
          label: 'Game Wiki',
          heading: 'Game Wiki',
          body: `${manifest.rootDescription} ${manifest.categories.map(x => x.title).join(' ')}`,
          group: 'FOUNDATION',
          category: 'Game Wiki',
          aliases: ['knowledge base', 'wiki']
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
