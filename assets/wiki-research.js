(() => {
  const app = document.getElementById('app');
  const languageSelect = document.getElementById('languageSelect');
  if (!app || !window.marked) return;

  const articles = [
    { slug:'game-overview', file:'game-overview.md', group:'FOUNDATION', title:'Game Overview', description:'Core gameplay loop, publisher, platform and current-era systems.' },
    { slug:'combat-system-and-reports', file:'combat-system-and-reports.md', group:'COMBAT', title:'Combat System & Reports', description:'Troop battles, Hero Battles and how to diagnose real power gaps from combat reports.' },
    { slug:'factions-and-heroes', file:'factions-and-heroes.md', group:'HEROES', title:'Factions & Heroes', description:'Fighter, Rider and Shooter counters, hero progression and formation principles.' },
    { slug:'hero-database', file:'hero-database.md', group:'HEROES', title:'Hero Database', description:'First-pass S-rarity roster with faction, specialty, acquisition, verification status and conflict queue.' },
    { slug:'fighter-heroes', file:'fighter-heroes.md', group:'HEROES', title:'Fighter Heroes', description:'S-rarity Fighter combat and progression specialists with stable identity data separated from meta ranking.' },
    { slug:'rider-heroes', file:'rider-heroes.md', group:'HEROES', title:'Rider Heroes', description:'Quinn, Corleone, Cyrus, Marcia, Katrina and Lucas with specialty and acquisition context.' },
    { slug:'shooter-heroes', file:'shooter-heroes.md', group:'HEROES', title:'Shooter Heroes', description:'Evans, Natasha, Margaret, Megan, Darian and Rosa with combat/progression distinctions.' },
    { slug:'hero-investment-framework', file:'hero-investment-framework.md', group:'HEROES', title:'Hero Investment Framework', description:'A replacement-cost and main-faction framework that keeps stable hero data separate from fast-changing tier meta.' },
    { slug:'hero-quinn', file:'hero-quinn.md', group:'HERO PROFILE', title:'Quinn', description:'Rider Alliance Duel specialist with unit-training and score-efficiency progression value.' },
    { slug:'hero-corleone', file:'hero-corleone.md', group:'HERO PROFILE', title:'Corleone', description:'Rider Tech Research specialist focused on research economy, speed and long-cycle account value.' },
    { slug:'hero-megan', file:'hero-megan.md', group:'HERO PROFILE', title:'Megan', description:'Shooter Construction specialist for build economy, free construction time and speed.' },
    { slug:'hero-evans', file:'hero-evans.md', group:'HERO PROFILE', title:'Evans', description:'Shooter Vehicle Transformation specialist tied to Gear and Modified Vehicle progression.' },
    { slug:'hero-catherine-and-rex', file:'hero-catherine-and-rex.md', group:'HERO PROFILE', title:'Catherine & Rex', description:'Fighter Radar specialist with free-task and Radar-yield account utility.' },
    { slug:'hero-francis', file:'hero-francis.md', group:'HERO PROFILE', title:'Francis', description:'Fighter Combat hero with durability-oriented identity and an explicitly documented source-conflict note.' },
    { slug:'hero-lucas', file:'hero-lucas.md', group:'HERO PROFILE', title:'Lucas', description:'Rider Combat hero combining faction damage with counterattack-damage mitigation.' },
    { slug:'hero-darian', file:'hero-darian.md', group:'HERO PROFILE', title:'Darian', description:'Shooter Combat hero built around Shooter ATK and troop skill damage, with officially confirmed Exclusive Equipment.' },
    { slug:'hero-guy', file:'hero-guy.md', group:'HERO PROFILE', title:'Guy', description:'Fighter Adventure-economy specialist with Food, Energy and a documented Adventure-vs-Combat type conflict.' },
    { slug:'hero-tristan', file:'hero-tristan.md', group:'HERO PROFILE', title:'Tristan', description:'Fighter combat support focused on Fighter DEF, ATK and high-star faction-wide battle damage.' },
    { slug:'hero-noah', file:'hero-noah.md', group:'HERO PROFILE', title:'Noah', description:'Fighter combat hero combining faction damage with normal-attack damage mitigation.' },
    { slug:'hero-cyrus', file:'hero-cyrus.md', group:'HERO PROFILE', title:'Cyrus', description:'Rider combat support focused on Rider DEF, ATK and high-star faction-wide battle damage.' },
    { slug:'hero-marcia', file:'hero-marcia.md', group:'HERO PROFILE', title:'Marcia', description:'Rider combat hero combining Rider HP with battle-damage scaling.' },
    { slug:'hero-katrina', file:'hero-katrina.md', group:'HERO PROFILE', title:'Katrina', description:'Rider normal-attack specialist with a documented Katrina/Katerina naming conflict.' },
    { slug:'hero-natasha', file:'hero-natasha.md', group:'HERO PROFILE', title:'Natasha', description:'Shooter combat support focused on Shooter DEF, ATK and high-star faction-wide battle damage.' },
    { slug:'hero-margaret', file:'hero-margaret.md', group:'HERO PROFILE', title:'Margaret', description:'Shooter combat hero combining Shooter HP with battle-damage scaling.' },
    { slug:'hero-rosa', file:'hero-rosa.md', group:'HERO PROFILE', title:'Rosa', description:'Shooter combat hero combining faction damage with counterattack-damage mitigation.' },
    { slug:'hero-skills-and-passives', file:'hero-skills-and-passives.md', group:'HEROES', title:'Hero Skills & Passives', description:'Active skills, normal attacks, progression/passive skills and exclusive talents.' },
    { slug:'hero-equipment', file:'hero-equipment.md', group:'HEROES', title:'Hero Equipment', description:'Standard equipment, Power Cores and equipment progression.' },
    { slug:'exclusive-equipment-and-hall-of-honor', file:'exclusive-equipment-and-hall-of-honor.md', group:'HEROES', title:'Exclusive Equipment & Hall of Honor', description:'Hero-specific equipment, Red Star breakthrough, swapping and Hall of Honor.' },
    { slug:'formations-and-unit-presets', file:'formations-and-unit-presets.md', group:'COMBAT', title:'Formations & Unit Presets', description:'Faction alignment, Recommended presets, Defense Presets and chip-aware formations.' },
    { slug:'rally-reinforcement-and-defense', file:'rally-reinforcement-and-defense.md', group:'COMBAT', title:'Rally, Reinforcement & Defense', description:'Rally Restrictions, Capital/Turret rules, reinforcement and City Gate defense.' },
    { slug:'watchtower-and-industrial', file:'watchtower-and-industrial.md', group:'PROGRESSION', title:'Watchtower & Industrial', description:'Shelter progression gates, prerequisites, Precision Parts and Industrial Age.' },
    { slug:'watchtower-progression-reference', file:'watchtower-progression-reference.md', group:'PROGRESSION', title:'Watchtower Progression Reference', description:'WT prerequisite chain, community-source conflicts and the levels that need Server 504 in-game verification.' },
    { slug:'industrial-age-and-precision-parts', file:'industrial-age-and-precision-parts.md', group:'PROGRESSION', title:'Industrial Age & Precision Parts', description:'Industrial upgrade model, Precision Part bottlenecks and versioned community cost snapshots.' },
    { slug:'troop-tier-progression', file:'troop-tier-progression.md', group:'PROGRESSION', title:'Troop Tier Progression', description:'T1–T10 milestone reference, research/camp gates and a transparent audit of conflicting public unlock tables.' },
    { slug:'progression-planning', file:'progression-planning.md', group:'PROGRESSION', title:'Progression Planning', description:'How to pre-queue prerequisites, time upgrades with events and plan the transition into Industrial progression.' },
    { slug:'apc-modified-vehicle', file:'apc-modified-vehicle.md', group:'APC', title:'APC & Modified Vehicle', description:'Vehicle progression overview: parts, chips, sets and Tactical Modification.' },
    { slug:'apc-chips', file:'apc-chips.md', group:'APC', title:'APC Chips', description:'Chip sources, faction integration, star progression and data-quality rules.' },
    { slug:'chip-factory', file:'chip-factory.md', group:'APC', title:'Chip Factory', description:'Targeted chip crafting, material types, access notes and recipe-verification plan.' },
    { slug:'apc-parts-and-sets', file:'apc-parts-and-sets.md', group:'APC', title:'APC Parts & Parts Set', description:'Six-part progression, Parts Set milestones and modern material-rule changes.' },
    { slug:'tactical-modification', file:'tactical-modification.md', group:'APC', title:'Tactical Modification', description:'Official endgame unlock routes through Modify Lv.500, parts Lv.66 or Orange chip 10★.' },
    { slug:'events-overview', file:'events-overview.md', group:'EVENTS', title:'Events Overview', description:'Alliance Duel, Survival Preparedness, State of Supremacy and recurring events.' },
    { slug:'alliance-duel', file:'alliance-duel.md', group:'EVENTS', title:'Alliance Duel', description:'Weekly alliance-vs-alliance themes, Enemy Buster, resource timing and current patch-sensitive scoring.' },
    { slug:'survival-preparedness', file:'survival-preparedness.md', group:'EVENTS', title:'Survival Preparedness', description:'Rotating progression themes, current matchmaking and double-dip planning with Alliance Duel.' },
    { slug:'state-of-supremacy', file:'state-of-supremacy.md', group:'EVENTS', title:'State of Supremacy', description:'Cross-state preparation, Capital/Turret warfare, teleport rules and State Hospital settlement.' },
    { slug:'zombie-siege', file:'zombie-siege.md', group:'EVENTS', title:'Zombie Siege', description:'Wave defense, reinforcement scoring, current 37.5-minute pacing and alliance coordination.' },
    { slug:'bio-mutant', file:'bio-mutant.md', group:'EVENTS', title:'Bio-Mutant — Frankenstein', description:'Alliance damage event, two-round Lv.20 Alliance Gifts rule and rally planning.' },
    { slug:'season-4-sealed-island', file:'season-4-sealed-island.md', group:'SEASON 4', title:'Season 4 — Sealed Island', description:'Season hub for Miasma, Virus Resistance, Oni systems, Blood Moon and seasonal activities.' },
    { slug:'sealed-island-season-buildings', file:'sealed-island-season-buildings.md', group:'SEASON 4', title:'Oni Seal Hall & Quartz Factory', description:'Season-building progression, Quartz economy and the Virus Resistance bottleneck.' },
    { slug:'miasma-and-virus-resistance', file:'miasma-and-virus-resistance.md', group:'SEASON 4', title:'Miasma & Virus Resistance', description:'Resistance gating, infection, purification and the officially confirmed Miasma Bursts Alert.' },
    { slug:'blood-moon-shroud', file:'blood-moon-shroud.md', group:'SEASON 4', title:'Blood Moon Shroud', description:'Blood Moon escalation, event overlap handling, Magatama and version-sensitive enemy requirements.' },
    { slug:'rotting-oni-and-booze-brute', file:'rotting-oni-and-booze-brute.md', group:'SEASON 4', title:'Rotting Oni & Booze Brute', description:'Normal and Blood Moon variants, solo/rally roles and official CP/resistance balance changes.' },
    { slug:'oni-king', file:'oni-king.md', group:'SEASON 4', title:'Oni King', description:'Boss preparation, Miasma Bursts connection and the official HP participation rebalance.' },
    { slug:'sacred-tree-blessing', file:'sacred-tree-blessing.md', group:'SEASON 4', title:'Sacred Tree Blessing', description:'Community-backed contribution-event mechanics, Omamori planning and fields awaiting Server 504 capture.' },
    { slug:'float-parade', file:'float-parade.md', group:'SEASON 4', title:'Float Parade', description:'Seasonal side-event overview, participation planning and current verification gaps.' }
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
      <div class="wiki-research-footnote">Hero profile coverage now includes the current verified S-rarity roster except Lan Yan, whose faction data remains internally contradictory in public sources. Remaining research backlog: Lan Yan in-game verification, exact Chip Factory recipes, shops/currencies and Server 504 screenshot verification for version-sensitive numeric data.</div>
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
      searchIndex = searchIndex.filter(entry => !(
        entry.route === 'wiki' && genericTitles.has(String(entry.heading || '').toLowerCase())
      ));

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

        return {
          route: `wiki/${article.slug}`,
          label: `Game Wiki · ${article.group}`,
          heading: article.title,
          body
        };
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