(() => {
  const dialog = document.getElementById('searchDialog');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!dialog || !input || !results) return;

  const t = key => window.Server504I18N?.t(key) || key;
  const SYNONYM_GROUPS = [
    ['apc', 'modified vehicle', 'vehicle modification'],
    ['bio mutant', 'bio-mutant', 'frankenstein'],
    ['watchtower', 'wt'],
    ['exclusive equipment', 'exclusive weapon', 'ee'],
    ['hall of honor', 'hoh'],
    ['survival preparedness', 'sp'],
    ['alliance duel', 'ad'],
    ['state of supremacy', 'sos', 'supremacy'],
    ['resource', 'resources', 'rss'],
    ['precision part', 'precision parts', 'pp'],
    ['power core', 'power cores'],
    ['peace shield', 'peace shields', 'shield', 'bubble'],
    ['pet agent', 'pet agents', 'pet'],
    ['special ops outpost', 'pet outpost'],
    ['blood moon shroud', 'blood moon'],
    ['virus resistance', 'resistance'],
    ['sealed island', 'sealed isle', 'season 4', 's4'],
    ['honor shop', 'capital shop', 'arena shop', 'black gold shop'],
    ['honor point', 'honor points', 'capital glory badge', 'black gold coin'],
    ['research center', 'research', 'tech', 'technology'],
    ['city gate', 'gate defense'],
    ['reinforcement', 'reinforce'],
    ['rally', 'rallies'],
    ['armory assault', 'armory'],
    ['oni king', 'oni boss'],
    ['chip factory', 'chip crafting']
  ];

  const DEFAULT_ROUTES = [
    'wiki','charter','codex','wiki/hero-database','wiki/progression-planning','wiki/events-overview',
    'wiki/resource-source-index','wiki/research-center-overview','wiki/alliance-systems-overview','wiki/season-4-sealed-island'
  ];

  let activeCategory = 'ALL';
  let filterHost;

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function escapeHtml(value) {
    return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function words(value) { return normalize(value).split(' ').filter(Boolean); }

  function synonymTerms(query) {
    const q = normalize(query);
    const terms = new Set([q]);
    const qWords = new Set(words(q));
    SYNONYM_GROUPS.forEach(group => {
      const normalizedGroup = group.map(normalize);
      const matched = normalizedGroup.some(term => term && (term.includes(' ') ? q.includes(term) : qWords.has(term)));
      if (matched) normalizedGroup.forEach(term => terms.add(term));
    });
    words(q).forEach(token => terms.add(token));
    return [...terms].filter(Boolean);
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    if (Math.abs(a.length - b.length) > 2) return 3;
    let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 0; i < a.length; i += 1) {
      const current = [i + 1];
      let rowMin = current[0];
      for (let j = 0; j < b.length; j += 1) {
        const value = Math.min(current[j] + 1, previous[j + 1] + 1, previous[j] + (a[i] === b[j] ? 0 : 1));
        current.push(value);
        if (value < rowMin) rowMin = value;
      }
      if (rowMin > 2) return 3;
      previous = current;
    }
    return previous[b.length];
  }

  function categoryOf(entry) {
    if (entry.category) return entry.category;
    const route = String(entry.route || '');
    if (route === 'charter' || route === 'codex') return t('governanceOperations');
    if (route === 'wiki' || route.startsWith('wiki/')) return t('gameWiki');
    return entry.label || t('other');
  }

  function prepared(entry) {
    const aliases = Array.isArray(entry.aliases) ? entry.aliases : [];
    return {
      entry,
      title: normalize(entry.heading),
      label: normalize(entry.label),
      body: normalize(entry.body),
      aliasText: normalize(aliases.join(' ')),
      titleWords: words(`${entry.heading} ${aliases.join(' ')}`),
      category: categoryOf(entry)
    };
  }

  function scoreEntry(item, query) {
    const q = normalize(query);
    if (!q) return 0;
    const terms = synonymTerms(q);
    const qTokens = words(q);
    let score = 0;
    let matchedTokens = 0;

    if (item.title === q) score += 220;
    else if (item.title.startsWith(q)) score += 150;
    else if (item.title.includes(q)) score += 110;
    if (item.aliasText === q) score += 190;
    else if (item.aliasText.includes(q)) score += 100;
    if (item.label.includes(q)) score += 34;
    if (item.body.includes(q)) score += 24;

    terms.forEach(term => {
      if (!term || term === q) return;
      if (item.title.includes(term)) score += term.includes(' ') ? 72 : 34;
      if (item.aliasText.includes(term)) score += term.includes(' ') ? 80 : 38;
      if (item.label.includes(term)) score += 16;
      if (item.body.includes(term)) score += term.includes(' ') ? 13 : 5;
    });

    qTokens.forEach(token => {
      let tokenMatched = false;
      if (item.titleWords.includes(token)) { score += 28; tokenMatched = true; }
      else if (item.title.includes(token)) { score += 17; tokenMatched = true; }
      if (item.aliasText.includes(token)) { score += 22; tokenMatched = true; }
      if (item.label.includes(token)) score += 8;
      if (item.body.includes(token)) { score += 4; tokenMatched = true; }

      if (!tokenMatched && token.length >= 4) {
        const allowance = token.length >= 7 ? 2 : 1;
        const fuzzy = item.titleWords.some(candidate => Math.abs(candidate.length - token.length) <= allowance && levenshtein(token, candidate) <= allowance);
        if (fuzzy) { score += token.length >= 7 ? 14 : 10; tokenMatched = true; }
      }
      if (tokenMatched) matchedTokens += 1;
    });

    if (qTokens.length && matchedTokens === qTokens.length) score += 24;
    return score;
  }

  function excerpt(entry, query) {
    const source = String(entry.body || entry.description || '').replace(/\s+/g, ' ').trim();
    if (!source) return '';
    const terms = synonymTerms(query).sort((a, b) => b.length - a.length);
    const normalizedSource = normalize(source);
    let hit = -1;
    for (const term of terms) {
      const index = normalizedSource.indexOf(term);
      if (index >= 0) { hit = index; break; }
    }
    if (hit < 0 || hit < 70) return `${source.slice(0, 185)}${source.length > 185 ? '…' : ''}`;
    const start = Math.max(0, hit - 65);
    const slice = source.slice(start, start + 200);
    return `…${slice}${source.length > start + 200 ? '…' : ''}`;
  }

  function currentEntries() {
    try { return Array.isArray(searchIndex) ? searchIndex : []; } catch (_) { return []; }
  }

  function availableCategories() {
    const seen = new Set();
    const ordered = [];
    currentEntries().forEach(entry => {
      const category = categoryOf(entry);
      if (!category || seen.has(category)) return;
      seen.add(category);
      ordered.push(category);
    });
    return ordered;
  }

  function ensureFilterHost() {
    if (filterHost?.isConnected) return filterHost;
    filterHost = document.createElement('div');
    filterHost.className = 'search-discovery-filters';
    filterHost.setAttribute('aria-label', t('filterCategory'));
    results.insertAdjacentElement('beforebegin', filterHost);
    return filterHost;
  }

  function renderFilters() {
    const host = ensureFilterHost();
    const categories = availableCategories();
    const valid = new Set(['ALL', ...categories]);
    if (!valid.has(activeCategory)) activeCategory = 'ALL';
    host.innerHTML = [
      `<button type="button" data-search-category="ALL" class="${activeCategory === 'ALL' ? 'active' : ''}">${escapeHtml(t('searchAll'))}</button>`,
      ...categories.map(category => `<button type="button" data-search-category="${escapeHtml(category)}" class="${activeCategory === category ? 'active' : ''}">${escapeHtml(category)}</button>`)
    ].join('');
    host.querySelectorAll('[data-search-category]').forEach(button => button.addEventListener('click', () => {
      activeCategory = button.dataset.searchCategory || 'ALL';
      enhancedRenderSearchResults(input.value || '');
    }));
  }

  function defaultMatches(entries) {
    const byRoute = new Map(entries.map(entry => [entry.route, entry]));
    const selected = DEFAULT_ROUTES.map(route => byRoute.get(route)).filter(Boolean);
    if (selected.length >= 8) return selected;
    entries.forEach(entry => { if (selected.length < 10 && !selected.includes(entry)) selected.push(entry); });
    return selected;
  }

  function enhancedRenderSearchResults(query) {
    renderFilters();
    const entries = currentEntries();
    const filteredByCategory = entries.filter(entry => activeCategory === 'ALL' || categoryOf(entry) === activeCategory);
    const q = query.trim();
    let matches;
    if (!q) matches = defaultMatches(filteredByCategory);
    else {
      matches = filteredByCategory.map(prepared).map(item => ({ entry: item.entry, category: item.category, score: scoreEntry(item, q) }))
        .filter(item => item.score > 0).sort((a, b) => b.score - a.score || a.entry.heading.localeCompare(b.entry.heading, document.documentElement.lang || 'en'))
        .slice(0, 16).map(item => item.entry);
    }

    results.innerHTML = matches.length
      ? matches.map(entry => {
          const category = categoryOf(entry);
          return `<a class="search-result search-result-ranked" href="#/${escapeHtml(entry.route)}" data-search-link>
            <div class="search-result-meta"><small>${escapeHtml(entry.label || '')}</small><span>${escapeHtml(category)}</span></div>
            <strong>${escapeHtml(entry.heading || '')}</strong><p>${escapeHtml(excerpt(entry, q))}</p>
          </a>`;
        }).join('')
      : `<div class="empty-state">${escapeHtml(t('searchNoResults'))}</div>`;

    results.querySelectorAll('[data-search-link]').forEach(anchor => anchor.addEventListener('click', () => dialog.close()));
  }

  try { renderSearchResults = enhancedRenderSearchResults; } catch (_) { window.renderSearchResults = enhancedRenderSearchResults; }
  window.renderSearchResults = enhancedRenderSearchResults;

  input.addEventListener('focus', () => {
    window.Server504Wiki?.refreshSearch?.();
    window.Server504Guides?.refreshSearch?.();
    setTimeout(() => enhancedRenderSearchResults(input.value || ''), 80);
  });
  dialog.addEventListener('close', () => { activeCategory = 'ALL'; });
  window.addEventListener('server504:localechange', () => {
    activeCategory = 'ALL';
    if (filterHost) filterHost.setAttribute('aria-label', t('filterCategory'));
    window.Server504Wiki?.refreshSearch?.();
    if (dialog.open) setTimeout(() => enhancedRenderSearchResults(input.value || ''), 100);
  });

  setTimeout(() => {
    if (!dialog.open) return;
    window.Server504Wiki?.refreshSearch?.();
    enhancedRenderSearchResults(input.value || '');
  }, 500);
})();
