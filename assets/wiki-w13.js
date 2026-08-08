(() => {
  const app = document.getElementById('app');
  const languageSelect = document.getElementById('languageSelect');
  if (!app || !window.marked) return;

  const articles = [
    { slug:'research-center-overview', file:'research-center-overview.md', group:'RESEARCH', title:'Research Center — Overview', description:'Research branches, building role, progression gates and current source-confidence rules.' },
    { slug:'development-and-economy-research', file:'development-and-economy-research.md', group:'RESEARCH', title:'Development & Economy Research', description:'Account throughput, formations, research/construction efficiency, gathering and resource economy.' },
    { slug:'battle-and-faction-research', file:'battle-and-faction-research.md', group:'RESEARCH', title:'Battle & Faction Research', description:'Troop capacity, Fighter/Rider/Shooter investment and why Research CP is not the same as combat value.' },
    { slug:'duel-research', file:'duel-research.md', group:'RESEARCH', title:'Duel Research', description:'Alliance Duel multipliers, Richer Rewards, One More and the Wisdom Medal reward-efficiency loop.' },
    { slug:'battle-strategy-and-kill-training', file:'battle-strategy-and-kill-training.md', group:'RESEARCH', title:'Battle Strategy & Kill Training', description:'Advanced Wisdom Medal research and the officially confirmed Origin Lands War-Day Kill Training behavior.' },
    { slug:'wisdom-medals', file:'wisdom-medals.md', group:'RESEARCH', title:'Wisdom Medals', description:'Advanced research currency, recurring sources, Duel-vs-Battle Strategy opportunity cost and spend timing.' },
    { slug:'research-queues-speed-and-timing', file:'research-queues-speed-and-timing.md', group:'RESEARCH', title:'Research Queues, Speed & Timing', description:'Queue uptime, Research Speedups, claim timing and event double-dip logic.' },
    { slug:'late-game-and-industrial-research', file:'late-game-and-industrial-research.md', group:'RESEARCH', title:'Late-Game & Industrial Research', description:'Long-timer, scarce-resource and season-aware research planning after the early progression phase.' },
    { slug:'research-priority-framework', file:'research-priority-framework.md', group:'RESEARCH', title:'Research Priority Framework', description:'A bottleneck-first decision model that remains useful when exact research values change.' }
  ];

  let timer;
  let observer;
  let activeKey = '';

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

  async function renderArticle(article) {
    const requestedLocale = locale();
    const key = `${article.slug}:${requestedLocale}`;
    if (activeKey === key && app.dataset.w13Route === key) return;
    activeKey = key;

    let usedFallback = false;
    let res = await fetch(`content/${requestedLocale}/wiki/${article.file}`, { cache:'no-store' });
    if (!res.ok) {
      usedFallback = requestedLocale !== 'en';
      res = await fetch(`content/en/wiki/${article.file}`, { cache:'no-store' });
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const badge = usedFallback ? `EN SOURCE · ${requestedLocale.toUpperCase()} PENDING` : requestedLocale.toUpperCase();

    observer?.disconnect();
    app.innerHTML = `<section class="page wiki-research-page wiki-article-page">
      <a class="wiki-back" href="#/wiki">← Game Wiki</a>
      ${header(article, badge)}
      <article class="markdown-body wiki-article-body">${marked.parse(text)}</article>
    </section>`;
    app.dataset.w13Route = key;
    window.scrollTo({ top:0, behavior:'auto' });
    startObserver();
  }

  function injectRootCards() {
    const route = parts();
    if (route[0] !== 'wiki' || route.length !== 1) return;
    app.removeAttribute('data-w13-route');
    activeKey = '';
    const grid = app.querySelector('.wiki-research-grid');
    if (!grid || grid.dataset.w13Injected === '1') return;
    grid.dataset.w13Injected = '1';
    articles.forEach(a => {
      const card = document.createElement('a');
      card.className = 'wiki-research-card';
      card.href = `#/wiki/${a.slug}`;
      card.innerHTML = `<small>${a.group}</small><h3>${a.title}</h3><p>${a.description}</p><span>OPEN REFERENCE →</span>`;
      grid.appendChild(card);
    });
    const foot = app.querySelector('.wiki-research-footnote');
    if (foot && !foot.dataset.w13Updated) {
      foot.dataset.w13Updated = '1';
      foot.textContent = 'W13 adds a dedicated Research Center knowledge layer: Development, Economy, Battle, Duel Research, Battle Strategy, Wisdom Medals and timing. Exact node costs and advanced-tree values remain visibly versioned until current Server 504 captures verify them.';
    }
  }

  async function handleRoute() {
    const route = parts();
    if (route[0] !== 'wiki') {
      activeKey = '';
      app.removeAttribute('data-w13-route');
      return;
    }
    if (route.length === 1) {
      injectRootCards();
      return;
    }
    const article = articles.find(a => a.slug === route[1]);
    if (!article) return;
    try {
      await renderArticle(article);
    } catch (error) {
      observer?.disconnect();
      app.innerHTML = `<section class="page"><div class="error-box">Unable to load Wiki article: ${error.message}</div></section>`;
      startObserver();
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

  function startObserver() {
    observer?.disconnect();
    observer = new MutationObserver(schedule);
    observer.observe(app, { childList:true, subtree:true });
  }

  window.addEventListener('hashchange', schedule);
  languageSelect?.addEventListener('change', () => {
    activeKey = '';
    schedule();
  });
  startObserver();
  setTimeout(schedule, 220);
  setTimeout(enrichGlobalSearch, 340);
})();
