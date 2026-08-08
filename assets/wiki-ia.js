(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const sections = [
    {
      title: 'Start Here',
      groups: ['FOUNDATION'],
      description: 'Core game orientation and the highest-level reference pages for understanding Dark War: Survival.'
    },
    {
      title: 'Combat & Heroes',
      groups: ['COMBAT', 'HEROES', 'HERO PROFILE'],
      description: 'Faction counters, formations, combat reports, hero progression, equipment and individual hero references.'
    },
    {
      title: 'Progression, Research & Shelter',
      groups: ['PROGRESSION', 'RESEARCH', 'SHELTER', 'DAILY UTILITY'],
      description: 'Watchtower and Industrial growth, technology, buildings, survivor systems and the recurring daily progression loop.'
    },
    {
      title: 'APC & Pet Agents',
      groups: ['APC', 'PET AGENTS', 'PET AGENT PROFILE'],
      description: 'Modified Vehicle parts, chips, Tactical Modification, Special Ops Outpost and Pet Agent progression.'
    },
    {
      title: 'Alliance, Events & State',
      groups: ['ALLIANCE', 'EVENTS', 'WORLD & STATE'],
      description: 'Alliance mechanics, recurring events, Armory and Capital systems, world-map movement and State-level systems.'
    },
    {
      title: 'Economy, Tools & Data Audits',
      groups: ['ECONOMY', 'TOOLS', 'DATA AUDIT'],
      description: 'Shops, currencies, material sources, calculators and references that explicitly track unresolved or version-sensitive numbers.'
    },
    {
      title: 'Season 4 — Sealed Island',
      groups: ['SEASON 4'],
      description: 'Server 504 seasonal reference for Miasma, Virus Resistance, Blood Moon, Oni systems and Sealed Island activities.'
    }
  ];

  let observer;
  let timer;

  const routeParts = () => location.hash.replace(/^#\//, '').split('?')[0].split('/').filter(Boolean);
  const isWikiRoot = () => {
    const parts = routeParts();
    return parts[0] === 'wiki' && parts.length === 1;
  };

  function normalizeGroup(raw) {
    const group = String(raw || '').trim().toUpperCase();
    if (group.startsWith('HERO PROFILE')) return 'HERO PROFILE';
    if (group.startsWith('PET AGENT PROFILE')) return 'PET AGENT PROFILE';
    return group;
  }

  function ensureConfidenceLegend() {
    if (!isWikiRoot()) return;
    const notice = app.querySelector('.wiki-research-notice');
    if (!notice || app.querySelector('.wiki-confidence-legend')) return;

    const legend = document.createElement('div');
    legend.className = 'wiki-confidence-legend';
    legend.innerHTML = `
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
      </div>`;
    notice.insertAdjacentElement('afterend', legend);
  }

  function buildSection(def, cards) {
    const wrapper = document.createElement('section');
    wrapper.className = 'wiki-ia-section';

    const head = document.createElement('div');
    head.className = 'wiki-ia-section-head';
    head.innerHTML = `
      <div class="wiki-ia-section-copy">
        <small>GAME WIKI CATEGORY</small>
        <h2>${def.title}</h2>
        <p>${def.description}</p>
      </div>
      <span class="wiki-ia-count">${cards.length} REFERENCES</span>`;

    const cardGrid = document.createElement('div');
    cardGrid.className = 'wiki-ia-cards';
    cards.forEach(card => cardGrid.appendChild(card));

    wrapper.append(head, cardGrid);
    return wrapper;
  }

  function groupWikiRoot() {
    if (!isWikiRoot()) return;
    const grid = app.querySelector('.wiki-research-grid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('a.wiki-research-card'));
    if (!cards.length) return;

    cards.forEach(card => {
      if (!card.dataset.wikiIaGroup) {
        card.dataset.wikiIaGroup = normalizeGroup(card.querySelector('small')?.textContent);
      }
    });

    const signature = cards.map(card => card.getAttribute('href') || '').sort().join('|');
    if (grid.classList.contains('wiki-ia-grouped') && grid.dataset.wikiIaSignature === signature) {
      ensureConfidenceLegend();
      return;
    }

    observer?.disconnect();
    ensureConfidenceLegend();

    const used = new Set();
    const fragments = [];

    sections.forEach(def => {
      const sectionCards = cards.filter(card => {
        if (used.has(card)) return false;
        const group = normalizeGroup(card.dataset.wikiIaGroup);
        if (!def.groups.includes(group)) return false;
        used.add(card);
        return true;
      });
      if (sectionCards.length) fragments.push(buildSection(def, sectionCards));
    });

    const unmatched = cards.filter(card => !used.has(card));
    if (unmatched.length) {
      fragments.push(buildSection({
        title: 'Other References',
        description: 'References that have not yet been mapped into the current Wiki taxonomy.'
      }, unmatched));
    }

    grid.replaceChildren(...fragments);
    grid.classList.add('wiki-ia-grouped');
    grid.dataset.wikiIaSignature = signature;

    const oldFoot = app.querySelector('.wiki-research-footnote');
    if (oldFoot) oldFoot.remove();

    let audit = app.querySelector('.wiki-ia-audit-note');
    if (!audit) {
      audit = document.createElement('div');
      audit.className = 'wiki-ia-audit-note';
      grid.insertAdjacentElement('afterend', audit);
    }
    audit.textContent = `${cards.length} references are currently indexed. Wiki content is grouped by player task rather than release batch; source confidence and Server 504 verification status remain visible inside each article.`;

    startObserver();
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(groupWikiRoot, 420);
  }

  function startObserver() {
    observer?.disconnect();
    observer = new MutationObserver(() => {
      if (isWikiRoot()) schedule();
    });
    observer.observe(app, { childList: true, subtree: true });
  }

  window.addEventListener('hashchange', schedule);
  startObserver();
  setTimeout(schedule, 900);
})();
