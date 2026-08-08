(() => {
  const app = document.getElementById('app');
  const languageSelect = document.getElementById('languageSelect');
  if (!app || !window.marked) return;

  const articles = [
    { slug:'daily-utility-systems-overview', file:'daily-utility-systems-overview.md', group:'DAILY UTILITY', title:'Daily Utility Systems — Overview', description:'Recruitment, Black Market, gathering, Exploration, Energy and Radar as a recurring account-maintenance layer.' },
    { slug:'radio-station-and-recruitment', file:'radio-station-and-recruitment.md', group:'DAILY UTILITY', title:'Radio Station & Recruitment', description:'Free daily recruit, recruitment types, Radio Station progression and current hero-pool verification rules.' },
    { slug:'recruitment-tickets', file:'recruitment-tickets.md', group:'DAILY UTILITY', title:'Recruitment Tickets', description:'Standard, Elite and higher-tier recruitment tickets, source confidence and a spend framework based on current pools.' },
    { slug:'black-market', file:'black-market.md', group:'DAILY UTILITY', title:'Black Market', description:'Daily discounted offers, Ruby refreshes, time-limited Black Market Quick Buy and purchase discipline.' },
    { slug:'mart-and-world-gathering', file:'mart-and-world-gathering.md', group:'DAILY UTILITY', title:'Mart & World Gathering', description:'Gathering Speed, Gathering Load, world-map resource efficiency and the current Mart data-verification gap.' },
    { slug:'gathering-ground-and-apocalypse-guide', file:'gathering-ground-and-apocalypse-guide.md', group:'DAILY UTILITY', title:'Gathering Ground & Apocalypse Guide', description:'Exploration support plus the official Shelter Lv.10+ Apocalypse Guide entry for upcoming major events.' },
    { slug:'adventure-camp-and-exploration', file:'adventure-camp-and-exploration.md', group:'DAILY UTILITY', title:'Adventure Camp & Exploration', description:'Adventure stages, Exploration squads, idle rewards and the provisional reward-cap/output data.' },
    { slug:'supply-station-and-energy', file:'supply-station-and-energy.md', group:'DAILY UTILITY', title:'Supply Station & Energy', description:'Energy recovery, direct-claim quality-of-life behavior and the refresh schedule still awaiting Server 504 capture.' },
    { slug:'daily-utility-routine', file:'daily-utility-routine.md', group:'DAILY UTILITY', title:'Daily Utility Routine', description:'A compact daily maintenance loop covering free recruit, market, Adventure, Energy, Radar and Apocalypse Guide.' }
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
    if (activeKey === key && app.dataset.w15Route === key) return;
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
    app.dataset.w15Route = key;
    window.scrollTo({ top:0, behavior:'auto' });
    startObserver();
  }

  function injectRootCards() {
    const route = parts();
    if (route[0] !== 'wiki' || route.length !== 1) return;
    app.removeAttribute('data-w15-route');
    activeKey = '';
    const grid = app.querySelector('.wiki-research-grid');
    if (!grid || grid.dataset.w15Injected === '1') return;
    grid.dataset.w15Injected = '1';
    articles.forEach(a => {
      const card = document.createElement('a');
      card.className = 'wiki-research-card';
      card.href = `#/wiki/${a.slug}`;
      card.innerHTML = `<small>${a.group}</small><h3>${a.title}</h3><p>${a.description}</p><span>OPEN REFERENCE →</span>`;
      grid.appendChild(card);
    });
    const foot = app.querySelector('.wiki-research-footnote');
    if (foot && !foot.dataset.w15Updated) {
      foot.dataset.w15Updated = '1';
      foot.textContent = 'W15 completes the daily utility layer: Radio Station recruitment, tickets, Black Market, Mart gathering, Gathering Ground, Adventure/idle rewards, Supply Station Energy and Radar-aware routine planning. Exact rotating pools, refresh values and Exploration tables stay in Server 504 verification.';
    }
  }

  async function handleRoute() {
    const route = parts();
    if (route[0] !== 'wiki') {
      activeKey = '';
      app.removeAttribute('data-w15-route');
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
  setTimeout(schedule, 260);
  setTimeout(enrichGlobalSearch, 380);
})();
