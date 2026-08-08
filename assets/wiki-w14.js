(() => {
  const app = document.getElementById('app');
  const languageSelect = document.getElementById('languageSelect');
  if (!app || !window.marked) return;

  const articles = [
    { slug:'shelter-buildings-overview', file:'shelter-buildings-overview.md', group:'SHELTER', title:'Shelter Buildings — Overview', description:'Survivor support, production, recovery, development speed, military capacity and utility building families.' },
    { slug:'survivors-jobs-health-happiness', file:'survivors-jobs-health-happiness.md', group:'SHELTER', title:'Survivors, Jobs, Health & Happiness', description:'Official shelter-workforce loop, survivor productivity and the current health/happiness verification gaps.' },
    { slug:'dorm-kitchen-deerhunter-bar', file:'dorm-kitchen-deerhunter-bar.md', group:'SHELTER', title:'Dorm, Kitchen & Deerhunter Bar', description:'Housing, food and survivor mood support with disputed unlock/effect fields kept provisional.' },
    { slug:'resource-production-buildings', file:'resource-production-buildings.md', group:'SHELTER', title:'Resource Production Buildings', description:'Lumber Mill, Scrapyard, Power Plant and Hunter’s Hut as the passive shelter economy layer.' },
    { slug:'hospital-infirmary-conscription-office', file:'hospital-infirmary-conscription-office.md', group:'SHELTER', title:'Hospital, Infirmary & Conscription Office', description:'Wounded-unit capacity, survivor sickness ambiguity, reserve recovery and overflow-risk planning.' },
    { slug:'warehouse-resource-protection', file:'warehouse-resource-protection.md', group:'SHELTER', title:'Warehouse & Resource Protection', description:'Protected-versus-exposed resource planning, raid risk and current protection-table verification.' },
    { slug:'library-construction-hall-training-ground', file:'library-construction-hall-training-ground.md', group:'SHELTER', title:'Library, Construction Hall & Training Ground', description:'Research, construction and training throughput multipliers with confidence labels for current effects.' },
    { slug:'military-center-training-camps', file:'military-center-training-camps.md', group:'SHELTER', title:'Military Center & Training Camps', description:'Unit Cap, Troop Capacity, faction camps and the distinction between capacity, tier and training speed.' },
    { slug:'shelter-building-priority', file:'shelter-building-priority.md', group:'SHELTER', title:'Shelter Building Priority & Dependencies', description:'A hard-gate, throughput, loss-prevention and event-timing framework for deciding what to upgrade next.' }
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
    if (activeKey === key && app.dataset.w14Route === key) return;
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
    app.dataset.w14Route = key;
    window.scrollTo({ top:0, behavior:'auto' });
    startObserver();
  }

  function injectRootCards() {
    const route = parts();
    if (route[0] !== 'wiki' || route.length !== 1) return;
    app.removeAttribute('data-w14-route');
    activeKey = '';
    const grid = app.querySelector('.wiki-research-grid');
    if (!grid || grid.dataset.w14Injected === '1') return;
    grid.dataset.w14Injected = '1';
    articles.forEach(a => {
      const card = document.createElement('a');
      card.className = 'wiki-research-card';
      card.href = `#/wiki/${a.slug}`;
      card.innerHTML = `<small>${a.group}</small><h3>${a.title}</h3><p>${a.description}</p><span>OPEN REFERENCE →</span>`;
      grid.appendChild(card);
    });
    const foot = app.querySelector('.wiki-research-footnote');
    if (foot && !foot.dataset.w14Updated) {
      foot.dataset.w14Updated = '1';
      foot.textContent = 'W14 adds the Shelter Buildings & Survivor Systems layer: population, jobs, health/happiness, food, production, recovery, protection and military/development support. Conflicting public unlock/effect tables remain explicitly queued for Server 504 verification.';
    }
  }

  async function handleRoute() {
    const route = parts();
    if (route[0] !== 'wiki') {
      activeKey = '';
      app.removeAttribute('data-w14-route');
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
  setTimeout(schedule, 240);
  setTimeout(enrichGlobalSearch, 360);
})();
