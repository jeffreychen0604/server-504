(() => {
  const app = document.getElementById('app');
  const languageSelect = document.getElementById('languageSelect');
  if (!app || !window.marked) return;

  const rows = [
    ['game-overview','game-overview.md','FOUNDATION','Game Overview','Core gameplay loop, publisher, platform and current-era systems.'],
    ['combat-system-and-reports','combat-system-and-reports.md','COMBAT','Combat System & Reports','Troop battles, Hero Battles and how to diagnose real power gaps from combat reports.'],
    ['factions-and-heroes','factions-and-heroes.md','HEROES','Factions & Heroes','Fighter, Rider and Shooter counters, hero progression and formation principles.'],
    ['hero-database','hero-database.md','HEROES','Hero Database','First-pass S-rarity roster with faction, specialty, acquisition, verification status and conflict queue.'],
    ['fighter-heroes','fighter-heroes.md','HEROES','Fighter Heroes','S-rarity Fighter combat and progression specialists with stable identity data separated from meta ranking.'],
    ['rider-heroes','rider-heroes.md','HEROES','Rider Heroes','Quinn, Corleone, Cyrus, Marcia, Katrina and Lucas with specialty and acquisition context.'],
    ['shooter-heroes','shooter-heroes.md','HEROES','Shooter Heroes','Evans, Natasha, Margaret, Megan, Darian and Rosa with combat/progression distinctions.'],
    ['hero-investment-framework','hero-investment-framework.md','HEROES','Hero Investment Framework','A replacement-cost and main-faction framework that keeps stable hero data separate from fast-changing tier meta.'],
    ['hero-quinn','hero-quinn.md','HERO PROFILE','Quinn','Rider Alliance Duel specialist with unit-training and score-efficiency progression value.'],
    ['hero-corleone','hero-corleone.md','HERO PROFILE','Corleone','Rider Tech Research specialist focused on research economy, speed and long-cycle account value.'],
    ['hero-megan','hero-megan.md','HERO PROFILE','Megan','Shooter Construction specialist for build economy, free construction time and speed.'],
    ['hero-evans','hero-evans.md','HERO PROFILE','Evans','Shooter Vehicle Transformation specialist tied to Gear and Modified Vehicle progression.'],
    ['hero-catherine-and-rex','hero-catherine-and-rex.md','HERO PROFILE','Catherine & Rex','Fighter Radar specialist with free-task and Radar-yield account utility.'],
    ['hero-francis','hero-francis.md','HERO PROFILE','Francis','Fighter Combat hero with durability-oriented identity and an explicitly documented source-conflict note.'],
    ['hero-lucas','hero-lucas.md','HERO PROFILE','Lucas','Rider Combat hero combining faction damage with counterattack-damage mitigation.'],
    ['hero-darian','hero-darian.md','HERO PROFILE','Darian','Shooter Combat hero built around Shooter ATK and troop skill damage, with officially confirmed Exclusive Equipment.'],
    ['hero-guy','hero-guy.md','HERO PROFILE','Guy','Fighter Adventure-economy specialist with Food, Energy and a documented Adventure-vs-Combat type conflict.'],
    ['hero-tristan','hero-tristan.md','HERO PROFILE','Tristan','Fighter combat support focused on Fighter DEF, ATK and high-star faction-wide battle damage.'],
    ['hero-noah','hero-noah.md','HERO PROFILE','Noah','Fighter combat hero combining faction damage with normal-attack damage mitigation.'],
    ['hero-cyrus','hero-cyrus.md','HERO PROFILE','Cyrus','Rider combat support focused on Rider DEF, ATK and high-star faction-wide battle damage.'],
    ['hero-marcia','hero-marcia.md','HERO PROFILE','Marcia','Rider combat hero combining Rider HP with battle-damage scaling.'],
    ['hero-katrina','hero-katrina.md','HERO PROFILE','Katrina','Rider normal-attack specialist with a documented Katrina/Katerina naming conflict.'],
    ['hero-natasha','hero-natasha.md','HERO PROFILE','Natasha','Shooter combat support focused on Shooter DEF, ATK and high-star faction-wide battle damage.'],
    ['hero-margaret','hero-margaret.md','HERO PROFILE','Margaret','Shooter combat hero combining Shooter HP with battle-damage scaling.'],
    ['hero-rosa','hero-rosa.md','HERO PROFILE','Rosa','Shooter combat hero combining faction damage with counterattack-damage mitigation.'],
    ['hero-lan-yan-pending','hero-lan-yan-pending.md','HERO PROFILE · PENDING','Lan Yan — Verification Pending','Skills and acquisition are documented, but Fighter-vs-Shooter faction identity remains unresolved pending Server 504 evidence.'],
    ['hero-skills-and-passives','hero-skills-and-passives.md','HEROES','Hero Skills & Passives','Active skills, normal attacks, progression/passive skills and exclusive talents.'],
    ['hero-equipment','hero-equipment.md','HEROES','Hero Equipment','Standard equipment, Power Cores and equipment progression.'],
    ['exclusive-equipment-and-hall-of-honor','exclusive-equipment-and-hall-of-honor.md','HEROES','Exclusive Equipment & Hall of Honor','Hero-specific equipment, Red Star breakthrough, swapping and Hall of Honor.'],
    ['formations-and-unit-presets','formations-and-unit-presets.md','COMBAT','Formations & Unit Presets','Faction alignment, Recommended presets, Defense Presets and chip-aware formations.'],
    ['rally-reinforcement-and-defense','rally-reinforcement-and-defense.md','COMBAT','Rally, Reinforcement & Defense','Rally Restrictions, Capital/Turret rules, reinforcement and City Gate defense.'],
    ['watchtower-and-industrial','watchtower-and-industrial.md','PROGRESSION','Watchtower & Industrial','Shelter progression gates, prerequisites, Precision Parts and Industrial Age.'],
    ['watchtower-progression-reference','watchtower-progression-reference.md','PROGRESSION','Watchtower Progression Reference','WT prerequisite chain, community-source conflicts and the levels that need Server 504 in-game verification.'],
    ['industrial-age-and-precision-parts','industrial-age-and-precision-parts.md','PROGRESSION','Industrial Age & Precision Parts','Industrial upgrade model, Precision Part bottlenecks and versioned community cost snapshots.'],
    ['troop-tier-progression','troop-tier-progression.md','PROGRESSION','Troop Tier Progression','T1–T10 milestone reference, research/camp gates and a transparent audit of conflicting public unlock tables.'],
    ['progression-planning','progression-planning.md','PROGRESSION','Progression Planning','How to pre-queue prerequisites, time upgrades with events and plan the transition into Industrial progression.'],
    ['apc-modified-vehicle','apc-modified-vehicle.md','APC','APC & Modified Vehicle','Vehicle progression overview: parts, chips, sets and Tactical Modification.'],
    ['apc-chips','apc-chips.md','APC','APC Chips','Chip sources, faction integration, star progression and data-quality rules.'],
    ['chip-factory','chip-factory.md','APC','Chip Factory','Targeted chip crafting, material types, access notes and recipe-verification plan.'],
    ['chip-factory-recipes-reference','chip-factory-recipes-reference.md','DATA AUDIT','Chip Factory Recipes Reference','Material-type rules, community-observed Orange recipe and the exact fields still requiring Server 504 capture.'],
    ['apc-parts-and-sets','apc-parts-and-sets.md','APC','APC Parts & Parts Set','Six-part progression, Parts Set milestones and modern material-rule changes.'],
    ['apc-parts-current-cost-audit','apc-parts-current-cost-audit.md','DATA AUDIT','APC Parts — Current Cost Audit','Explains why pre-overhaul Lv.1–42 tables cannot be used as a current Lv.1–66 cost calculator.'],
    ['tactical-modification','tactical-modification.md','APC','Tactical Modification','Official endgame unlock routes through Modify Lv.500, parts Lv.66 or Orange chip 10★.'],
    ['shops-and-currencies-overview','shops-and-currencies-overview.md','ECONOMY','Shops & Currencies Overview','Current shop map, 2026 Honor Shop migration, legacy-name translation and purchase-priority rules.'],
    ['honor-shop','honor-shop.md','ECONOMY','Honor Shop','Unified Capital/Arena/Black Gold shop model, Honor Points and legacy currency conversion.'],
    ['honor-shop-price-audit','honor-shop-price-audit.md','DATA AUDIT','Honor Shop — Price & Limit Audit','Separates official shop identity/conversion from prices and weekly limits that still need Server 504 screenshots.'],
    ['alliance-shop','alliance-shop.md','ECONOMY','Alliance Shop','Personal Points, Wisdom Medals, Orange fragments, teleporters, shields and weekly purchase logic.'],
    ['season-and-vip-shops','season-and-vip-shops.md','ECONOMY','Season Shop & VIP Shop','Recurring scarce-material sources, permanent-season rewards and version-sensitive VIP stock.'],
    ['resource-source-index','resource-source-index.md','ECONOMY','Resource Source Index','Fast lookup for Power Cores, Wisdom Medals, Precision Parts, Titanium Alloy, Blueprints and more.'],
    ['equipment-and-apc-material-sources','equipment-and-apc-material-sources.md','ECONOMY','Equipment & APC Material Sources','Separates Boost Ores, Power Cores and DX Blueprints from Titanium Alloy and APC Design Blueprints.'],
    ['event-and-premium-currencies','event-and-premium-currencies.md','ECONOMY','Event & Premium Currencies','Honor Points, Alliance points, Mechanical Components, Magatama, Shell Coins, Dawn Badges and lifecycle rules.'],
    ['wiki-calculators','wiki-calculators.md','TOOLS','Resource Calculators','Interactive Honor migration conversion and overrideable Orange Chip material planning with confidence labels.'],
    ['wiki-verification-queue','wiki-verification-queue.md','DATA AUDIT','Wiki Verification Queue','Central queue for Chip Factory recipes, Honor prices, APC Lv.1–66 costs and other unresolved Server 504 values.'],
    ['events-overview','events-overview.md','EVENTS','Events Overview','Alliance Duel, Survival Preparedness, State of Supremacy and recurring events.'],
    ['alliance-duel','alliance-duel.md','EVENTS','Alliance Duel','Weekly alliance-vs-alliance themes, Enemy Buster, resource timing and current patch-sensitive scoring.'],
    ['survival-preparedness','survival-preparedness.md','EVENTS','Survival Preparedness','Rotating progression themes, current matchmaking and double-dip planning with Alliance Duel.'],
    ['state-of-supremacy','state-of-supremacy.md','EVENTS','State of Supremacy','Cross-state preparation, Capital/Turret warfare, teleport rules and State Hospital settlement.'],
    ['zombie-siege','zombie-siege.md','EVENTS','Zombie Siege','Wave defense, reinforcement scoring, current 37.5-minute pacing and alliance coordination.'],
    ['bio-mutant','bio-mutant.md','EVENTS','Bio-Mutant — Frankenstein','Alliance damage event, two-round Lv.20 Alliance Gifts rule and rally planning.'],
    ['season-4-sealed-island','season-4-sealed-island.md','SEASON 4','Season 4 — Sealed Island','Season hub for Miasma, Virus Resistance, Oni systems, Blood Moon and seasonal activities.'],
    ['sealed-island-season-buildings','sealed-island-season-buildings.md','SEASON 4','Oni Seal Hall & Quartz Factory','Season-building progression, Quartz economy and the Virus Resistance bottleneck.'],
    ['miasma-and-virus-resistance','miasma-and-virus-resistance.md','SEASON 4','Miasma & Virus Resistance','Resistance gating, infection, purification and the officially confirmed Miasma Bursts Alert.'],
    ['blood-moon-shroud','blood-moon-shroud.md','SEASON 4','Blood Moon Shroud','Blood Moon escalation, event overlap handling, Magatama and version-sensitive enemy requirements.'],
    ['rotting-oni-and-booze-brute','rotting-oni-and-booze-brute.md','SEASON 4','Rotting Oni & Booze Brute','Normal and Blood Moon variants, solo/rally roles and official CP/resistance balance changes.'],
    ['oni-king','oni-king.md','SEASON 4','Oni King','Boss preparation, Miasma Bursts connection and the official HP participation rebalance.'],
    ['sacred-tree-blessing','sacred-tree-blessing.md','SEASON 4','Sacred Tree Blessing','Community-backed contribution-event mechanics, Omamori planning and fields awaiting Server 504 capture.'],
    ['float-parade','float-parade.md','SEASON 4','Float Parade','Seasonal side-event overview, participation planning and current verification gaps.']
  ];

  const articles = rows.map(([slug, file, group, title, description]) => ({ slug, file, group, title, description }));
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
      <div class="wiki-research-footnote">W9 adds interactive planning tools plus a central verification queue. Official formulas are locked; community-observed numeric values remain overrideable or visibly provisional until Server 504 in-game evidence resolves them.</div>
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

  async function enrichGlobalSearch() {
    try {
      if (typeof searchIndex === 'undefined' || !Array.isArray(searchIndex)) return;
      const genericTitles = new Set(articles.map(a => a.title.toLowerCase()));
      searchIndex = searchIndex.filter(entry => !(entry.route === 'wiki' && genericTitles.has(String(entry.heading || '').toLowerCase())));

      const researchedEntries = await Promise.all(articles.map(async article => {
        let body = article.description;
        try {
          const res = await fetch(`content/en/wiki/${article.file}`, { cache: 'no-store' });
          if (res.ok) {
            const text = await res.text();
            body = text
              .replace(/^---[\s\S]*?---/m, ' ')
              .replace(/https?:\/\/\S+/g, ' ')
              .replace(/[#>*_`|\[\]()]/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
          }
        } catch (_) {}
        return { route: `wiki/${article.slug}`, label: `Game Wiki · ${article.group}`, heading: article.title, body };
      }));
      searchIndex.push(...researchedEntries);
    } catch (_) {}
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
  setTimeout(enrichGlobalSearch, 180);
})();
