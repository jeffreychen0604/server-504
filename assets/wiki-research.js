(() => {
  const app = document.getElementById('app');
  const languageSelect = document.getElementById('languageSelect');
  if (!app || !window.marked) return;

  const articles = [
    {
      slug: 'game-overview',
      file: 'game-overview.md',
      group: 'FOUNDATION',
      title: 'Game Overview',
      description: 'Core gameplay loop, publisher, platform and current-era systems.'
    },
    {
      slug: 'combat-system-and-reports',
      file: 'combat-system-and-reports.md',
      group: 'COMBAT',
      title: 'Combat System & Reports',
      description: 'Troop battles, Hero Battles and how to diagnose real power gaps from combat reports.'
    },
    {
      slug: 'factions-and-heroes',
      file: 'factions-and-heroes.md',
      group: 'HEROES',
      title: 'Factions & Heroes',
      description: 'Fighter, Rider and Shooter counters, hero progression and formation principles.'
    },
    {
      slug: 'hero-skills-and-passives',
      file: 'hero-skills-and-passives.md',
      group: 'HEROES',
      title: 'Hero Skills & Passives',
      description: 'Active skills, normal attacks, progression/passive skills and exclusive talents.'
    },
    {
      slug: 'hero-equipment',
      file: 'hero-equipment.md',
      group: 'HEROES',
      title: 'Hero Equipment',
      description: 'Standard equipment, Power Cores and equipment progression.'
    },
    {
      slug: 'exclusive-equipment-and-hall-of-honor',
      file: 'exclusive-equipment-and-hall-of-honor.md',
      group: 'HEROES',
      title: 'Exclusive Equipment & Hall of Honor',
      description: 'Hero-specific equipment, Red Star breakthrough, swapping and Hall of Honor.'
    },
    {
      slug: 'formations-and-unit-presets',
      file: 'formations-and-unit-presets.md',
      group: 'COMBAT',
      title: 'Formations & Unit Presets',
      description: 'Faction alignment, Recommended presets, Defense Presets and chip-aware formations.'
    },
    {
      slug: 'rally-reinforcement-and-defense',
      file: 'rally-reinforcement-and-defense.md',
      group: 'COMBAT',
      title: 'Rally, Reinforcement & Defense',
      description: 'Rally Restrictions, Capital/Turret rules, reinforcement and City Gate defense.'
    },
    {
      slug: 'watchtower-and-industrial',
      file: 'watchtower-and-industrial.md',
      group: 'PROGRESSION',
      title: 'Watchtower & Industrial',
      description: 'Shelter progression gates, prerequisites, Precision Parts and Industrial Age.'
    },
    {
      slug: 'apc-modified-vehicle',
      file: 'apc-modified-vehicle.md',
      group: 'APC',
      title: 'APC & Modified Vehicle',
      description: 'Vehicle progression overview: parts, chips, sets and Tactical Modification.'
    },
    {
      slug: 'apc-chips',
      file: 'apc-chips.md',
      group: 'APC',
      title: 'APC Chips',
      description: 'Chip sources, faction integration, star progression and data-quality rules.'
    },
    {
      slug: 'chip-factory',
      file: 'chip-factory.md',
      group: 'APC',
      title: 'Chip Factory',
      description: 'Targeted chip crafting, material types, access notes and recipe-verification plan.'
    },
    {
      slug: 'apc-parts-and-sets',
      file: 'apc-parts-and-sets.md',
      group: 'APC',
      title: 'APC Parts & Parts Set',
      description: 'Six-part progression, Parts Set milestones and modern material-rule changes.'
    },
    {
      slug: 'tactical-modification',
      file: 'tactical-modification.md',
      group: 'APC',
      title: 'Tactical Modification',
      description: 'Official endgame unlock routes through Modify Lv.500, parts Lv.66 or Orange chip 10★.'
    },
    {
      slug: 'events-overview',
      file: 'events-overview.md',
      group: 'EVENTS',
      title: 'Events Overview',
      description: 'Alliance Duel, Survival Preparedness, State of Supremacy and recurring events.'
    },
    {
      slug: 'season-4-sealed-island',
      file: 'season-4-sealed-island.md',
      group: 'SEASON 4',
      title: 'Season 4 — Sealed Island',
      description: 'Miasma, Virus Resistance, Oni systems, Blood Moon Shroud and seasonal progression.'
    }
  ];

  let observer;
  let renderTimer;

  function hashParts() {
    return location.hash.replace(/^#\//, '').split('?')[0].split('/').filter(Boolean);
  }

  function isWikiRoute() {
    return hashParts()[0] === 'wiki';
  }

  function locale() {
    return (languageSelect?.value || document.documentElement.lang || 'en').toLowerCase();
  }

  function header(title, description, badges = []) {
    return `<header class="page-header wiki-research-header">
      <div class="eyebrow">DARK WAR: SURVIVAL · VERIFIED KNOWLEDGE</div>
      <h1>${title}</h1>
      <p>${description}</p>
      <div class="meta-row">${badges.map(x => `<span class="meta-chip">${x}</span>`).join('')}</div>
    </header>`;
  }

  function rootPage() {
    return `<section class="page wiki-research-page">
      ${header('Game Wiki', 'Source-backed Dark War: Survival reference for Server 504. Hard numbers are versioned so old community data does not silently become permanent truth.', ['RESEARCHED', 'AUG 2026', 'COMMUNITY MAINTAINED'])}
      <div class="wiki-research-notice">
        <strong>Source policy</strong>
        <span>Official patch notes first for current limits and feature changes; established Dark War community databases for deeper mechanics; Server 504 in-game evidence wins when sources conflict.</span>
      </div>
      <div class="wiki-research-grid">
        ${articles.map(a => `<a class="wiki-research-card" href="#/wiki/${a.slug}">
          <small>${a.group}</small>
          <h3>${a.title}</h3>
          <p>${a.description}</p>
          <span>OPEN REFERENCE →</span>
        </a>`).join('')}
      </div>
      <div class="wiki-research-footnote">Next research batches: individual hero database, exact Chip Factory recipes from Server 504 captures, Watchtower/Industrial cost tables, Alliance Duel & Survival Preparedness scoring, event shops/currencies and deeper Season 4 mechanics.</div>
    </section>`;
  }

  async function articlePage(article) {
    const requestedLocale = locale();
    const localized = `content/${requestedLocale}/wiki/${article.file}`;
    const fallback = `content/en/wiki/${article.file}`;
    let text = '';
    let usedFallback = false;

    try {
      let res = await fetch(localized, { cache: 'no-store' });
      if (!res.ok) {
        usedFallback = requestedLocale !== 'en';
        res = await fetch(fallback, { cache: 'no-store' });
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      text = await res.text();
    } catch (error) {
      return `<section class="page"><div class="error-box">Unable to load Wiki article: ${error.message}</div></section>`;
    }

    const localeBadge = usedFallback ? `EN SOURCE · ${requestedLocale.toUpperCase()} PENDING` : requestedLocale.toUpperCase();
    return `<section class="page wiki-research-page wiki-article-page">
      <a class="wiki-back" href="#/wiki">← Game Wiki</a>
      ${header(article.title, article.description, ['VERIFIED AUG 2026', localeBadge])}
      <article class="markdown-body wiki-article-body">${marked.parse(text)}</article>
    </section>`;
  }

  async function renderWiki() {
    if (!isWikiRoute()) {
      app.removeAttribute('data-wiki-research-route');
      return;
    }

    const parts = hashParts();
    const slug = parts[1] || '';
    const key = `${slug || 'root'}:${locale()}`;
    if (app.dataset.wikiResearchRoute === key) return;

    stopObserver();
    app.innerHTML = '<div class="page loading">Loading Wiki…</div>';

    if (!slug) {
      app.innerHTML = rootPage();
    } else {
      const article = articles.find(x => x.slug === slug);
      app.innerHTML = article
        ? await articlePage(article)
        : `<section class="page">${header('Wiki article not found', 'The requested Dark War: Survival reference does not exist.', ['404'])}<a class="wiki-back" href="#/wiki">← Return to Game Wiki</a></section>`;
    }

    app.dataset.wikiResearchRoute = key;
    app.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'auto' });
    startObserver();
  }

  function scheduleRender() {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(renderWiki, 0);
  }

  function startObserver() {
    if (observer) observer.disconnect();
    observer = new MutationObserver(() => {
      if (isWikiRoute()) scheduleRender();
    });
    observer.observe(app, { childList: true, subtree: false });
  }

  function stopObserver() {
    observer?.disconnect();
  }

  window.addEventListener('hashchange', scheduleRender);
  languageSelect?.addEventListener('change', scheduleRender);
  startObserver();
  setTimeout(scheduleRender, 120);
})();
