(() => {
  const CURRENT_SERVER_SEASON = 4;
  const HERO_SEASONS = {
    angela: 5,
    ryan: 5,
    shadow: 5,
    ella: 6,
    sebastian: 6,
    selwyn: 6
  };

  const applyRouteTheme = () => {
    const route = (location.hash.replace(/^#\//, '').split('?')[0] || 'home').split('/')[0];
    document.body.dataset.route = route;
  };

  const ensureSpoilerStyle = () => {
    if (document.getElementById('server504-spoiler-style')) return;
    const style = document.createElement('style');
    style.id = 'server504-spoiler-style';
    style.textContent = `
      .spoiler-alert-tag {
        display: inline-flex;
        align-items: center;
        width: max-content;
        max-width: 100%;
        margin: 6px 0;
        padding: 4px 8px;
        border: 1px solid rgba(240,90,81,.42);
        border-radius: 999px;
        background: rgba(120,30,35,.18);
        color: #ffaaa5;
        font-size: .58rem;
        font-weight: 900;
        letter-spacing: .075em;
        line-height: 1.2;
        text-transform: uppercase;
        box-shadow: inset 0 0 18px rgba(216,72,67,.05);
      }
      .meta-row .spoiler-alert-tag { margin: 0; }
    `;
    document.head.appendChild(style);
  };

  const normalize = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

  const seasonFromText = text => {
    const raw = String(text || '');
    const seasonMatch = raw.match(/\bseason\s*([1-6])\b/i);
    if (seasonMatch) return Number(seasonMatch[1]);

    const normalized = ` ${normalize(raw)} `;
    for (const [hero, season] of Object.entries(HERO_SEASONS)) {
      if (normalized.includes(` ${hero} `)) return season;
    }
    return null;
  };

  const createTag = season => {
    const tag = document.createElement('span');
    tag.className = 'spoiler-alert-tag';
    tag.dataset.spoilerSeason = String(season);
    tag.textContent = `⚠ Spoiler Alert · Season ${season}`;
    return tag;
  };

  const addTag = (container, season, preferredTarget) => {
    if (!container || !season || season <= CURRENT_SERVER_SEASON) return;
    if (container.querySelector(`.spoiler-alert-tag[data-spoiler-season="${season}"]`)) return;
    const target = preferredTarget || container;
    target.appendChild(createTag(season));
  };

  const applySpoilerTags = () => {
    ensureSpoilerStyle();

    document.querySelectorAll('[data-season]').forEach(el => {
      const season = Number(el.dataset.season);
      addTag(el, season, el.querySelector('.meta-row') || el);
    });

    document.querySelectorAll('.guide-card').forEach(card => {
      const season = seasonFromText(card.textContent);
      if (!season || season <= CURRENT_SERVER_SEASON) return;
      const anchor = card.querySelector('h3');
      if (!anchor || card.querySelector('.spoiler-alert-tag')) return;
      anchor.insertAdjacentElement('beforebegin', createTag(season));
    });

    document.querySelectorAll('.guide-detail, .wiki-article, .markdown-body').forEach(section => {
      const header = section.matches('.guide-detail') ? section.querySelector('.page-header') : section.closest('.page')?.querySelector('.page-header');
      const season = seasonFromText(`${header?.textContent || ''} ${section.querySelector('h1')?.textContent || ''}`);
      if (!season || season <= CURRENT_SERVER_SEASON || !header) return;
      addTag(header, season, header.querySelector('.meta-row') || header);
    });

    const page = document.querySelector('#app > .page');
    if (page) {
      const header = page.querySelector('.page-header');
      const season = seasonFromText(header?.textContent || '');
      if (header && season && season > CURRENT_SERVER_SEASON) {
        addTag(header, season, header.querySelector('.meta-row') || header);
      }
    }
  };

  let scheduled = false;
  const scheduleSpoilers = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applySpoilerTags();
    });
  };

  applyRouteTheme();
  scheduleSpoilers();

  window.addEventListener('hashchange', () => {
    applyRouteTheme();
    scheduleSpoilers();
  });
  window.addEventListener('server504:localechange', scheduleSpoilers);

  const app = document.getElementById('app');
  if (app) new MutationObserver(scheduleSpoilers).observe(app, { childList: true, subtree: true });
})();
