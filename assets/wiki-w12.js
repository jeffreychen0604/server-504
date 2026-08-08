(() => {
  const app = document.getElementById('app');
  const languageSelect = document.getElementById('languageSelect');
  if (!app || !window.marked) return;

  const articles = [
    { slug:'world-map-and-state-systems', file:'world-map-and-state-systems.md', group:'WORLD & STATE', title:'World Map & State Systems', description:'Movement, shelter defense, cross-state warfare, special map zones and the State administration layer.' },
    { slug:'radar-and-scouting', file:'radar-and-scouting.md', group:'WORLD & STATE', title:'Radar & Scouting', description:'Scouting speed, current scout-queue behavior, Radar Quick Start and information-verification gaps.' },
    { slug:'peace-shields-and-shelter-defense', file:'peace-shields-and-shelter-defense.md', group:'WORLD & STATE', title:'Peace Shields & Shelter Defense', description:'Shielding, City Gate defense, Hospital/Warehouse risk and special-zone exceptions.' },
    { slug:'teleport-and-cross-state-movement', file:'teleport-and-cross-state-movement.md', group:'WORLD & STATE', title:'Teleport & Cross-State Movement', description:'Current direct-position cross-state teleport, Advanced Teleporters, Lost Lands and world-map name colors.' },
    { slug:'city-gate-durability-and-shelter-attacks', file:'city-gate-durability-and-shelter-attacks.md', group:'WORLD & STATE', title:'City Gate, Durability & Shelter Attacks', description:'Defense Presets, hero uniqueness, destruction values, burning and shelter-durability verification.' },
    { slug:'trade-post-and-merchant-guild', file:'trade-post-and-merchant-guild.md', group:'WORLD & STATE', title:'Trade Post & Merchant Guild Dark Zones', description:'Official dark-zone attacker/defender mortality modifiers and the 500% durability-pressure change.' },
    { slug:'mutant-mines', file:'mutant-mines.md', group:'WORLD & STATE', title:'Mutant Mines', description:'Community-backed cross-state mine windows, Antigens, Crimson Ores and event-specific Watchtower restrictions.' },
    { slug:'president-and-officials', file:'president-and-officials.md', group:'WORLD & STATE', title:'President & Presidential Palace Officials', description:'State President context, official positions, resignation rule, term recognition and governance boundary.' }
  ];

  let timer;
  let observer;

  const parts = () => location.hash.replace(/^#\//, '').split('?')[0].split('/').filter(Boolean);
  const locale = () => (languageSelect?.value || document.documentElement.lang || 'en').toLowerCase();

  function header(article, localeBadge) {
    return `<header class="page-header wiki-research-header">
      <div class="eyebrow">DARK WAR: SURVIVAL · VERIFIED KNOWLEDGE</div>
      <h1>${article.title}</h1>
      <p>${article.description}</p>
      <div class="meta-row"><span class="meta-chip">VERIFIED AUG 2026</span><span class="meta-chip">${localeBadge}</span></div>
    </header>`;
  }

  async function renderArticle(article, routeKey) {
    const requestedLocale = locale();
    let usedFallback = false;
    let res = await fetch(`content/${requestedLocale}/wiki/${article.file}`, { cache:'no-store' });
    if (!res.ok) {
      usedFallback = requestedLocale !== 'en';
      res = await fetch(`content/en/wiki/${article.file}`, { cache:'no-store' });
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const badge = usedFallback ? `EN SOURCE · ${requestedLocale.toUpperCase()} PENDING` : requestedLocale.toUpperCase();
    app.innerHTML = `<section class="page wiki-research-page wiki-article-page" data-w12-article="${article.slug}">
      <a class="wiki-back" href="#/wiki">← Game Wiki</a>
      ${header(article, badge)}
      <article class="markdown-body wiki-article-body">${marked.parse(text)}</article>
    </section>`;
    app.dataset.w12Route = routeKey;
    window.scrollTo({ top:0, behavior:'auto' });
  }

  function injectRootCards() {
    const route = parts();
    if (route[0] !== 'wiki' || route.length !== 1) return;
    app.removeAttribute('data-w12-route');
    const grid = app.querySelector('.wiki-research-grid');
    if (!grid || grid.dataset.w12Injected === '1') return;
    grid.dataset.w12Injected = '1';
    articles.forEach(a => {
      const card = document.createElement('a');
      card.className = 'wiki-research-card';
      card.href = `#/wiki/${a.slug}`;
      card.innerHTML = `<small>${a.group}</small><h3>${a.title}</h3><p>${a.description}</p><span>OPEN REFERENCE →</span>`;
      grid.appendChild(card);
    });
    const foot = app.querySelector('.wiki-research-footnote');
    if (foot && !foot.dataset.w12Updated) {
      foot.dataset.w12Updated = '1';
      foot.textContent = 'W12 adds the World Map & State Systems layer. Current official teleport, defense and dark-zone mechanics are separated from event/season-specific rules; unresolved shelter, map-zone and Presidential numeric data remain in the verification queue.';
    }
  }

  async function handleRoute() {
    const route = parts();
    if (route[0] !== 'wiki') return;
    if (route.length === 1) {
      injectRootCards();
      return;
    }
    const article = articles.find(a => a.slug === route[1]);
    if (!article) return;
    const routeKey = `${article.slug}:${locale()}`;
    if (app.dataset.w12Route === routeKey && app.querySelector(`[data-w12-article="${article.slug}"]`)) return;
    try {
      await renderArticle(article, routeKey);
    } catch (error) {
      app.innerHTML = `<section class="page"><div class="error-box">Unable to load Wiki article: ${error.message}</div></section>`;
      app.dataset.w12Route = routeKey;
    }
  }

  async function enrichGlobalSearch() {
    try {
      if (typeof searchIndex === 'undefined' || !Array.isArray(searchIndex)) return;
      const routes = new Set(articles.map(a => `wiki/${a.slug}`));
      searchIndex = searchIndex.filter(entry => !routes.has(entry.route));
      const entries = await Promise.all(articles.map(async article => {
        let body = article.description;
        try {
          const res = await fetch(`content/en/wiki/${article.file}`, { cache:'no-store' });
          if (res.ok) {
            body = (await res.text())
              .replace(/https?:\/\/\S+/g, ' ')
              .replace(/[#>*_`|\[\]()]/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
          }
        } catch (_) {}
        return { route:`wiki/${article.slug}`, label:`Game Wiki · ${article.group}`, heading:article.title, body };
      }));
      searchIndex.push(...entries);
    } catch (_) {}
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(handleRoute, 20);
  }

  window.addEventListener('hashchange', schedule);
  languageSelect?.addEventListener('change', schedule);
  observer = new MutationObserver(schedule);
  observer.observe(app, { childList:true, subtree:true });
  setTimeout(schedule, 180);
  setTimeout(enrichGlobalSearch, 300);
})();