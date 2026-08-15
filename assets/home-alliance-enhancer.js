/* Server 504 — Home operations identity enhancer
 * Adds in-game alliance banners. Shared/Hero presentation layers are loaded statically
 * from index.html so CSS order remains deterministic. No server data is changed.
 */
(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const spriteSource = './assets/alliance-banners-sprite.webp.base64.txt?v=20260815-1357';
  const supported = new Set(['uic','ap3x','dud','cmrd','idgf','ids','ltnx','immr','unta','lumj','ace']);
  let spritePromise = null;
  let queued = false;

  const normalizeCode = value => {
    const text = String(value || '').trim();
    const bracket = text.match(/\[([^\]]+)\]/);
    const raw = (bracket ? bracket[1] : text.split(/\s+/)[0])
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '');
    const aliases = { IDSSTAR: 'ids', IDS: 'ids', IDGF: 'idgf', LUMI: 'lumj', LUMJ: 'lumj', ACE: 'ace' };
    const code = aliases[raw] || raw.toLowerCase();
    return supported.has(code) ? code : null;
  };

  const ensureSprite = () => {
    spritePromise ||= fetch(spriteSource, { cache: 'force-cache' })
      .then(r => r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(base64 => {
        const clean = base64.trim();
        if (!clean.startsWith('UklG')) throw new Error('Invalid WebP sprite payload');
        document.documentElement.style.setProperty(
          '--server504-alliance-banner-sprite',
          `url("data:image/webp;base64,${clean}")`
        );
      })
      .catch(err => console.warn('Alliance banner sprite unavailable.', err));
    return spritePromise;
  };

  const makeBanner = code => {
    const span = document.createElement('span');
    span.className = `alliance-banner alliance-banner--${code}`;
    span.setAttribute('aria-hidden', 'true');
    return span;
  };

  const wrapAllianceCell = (cell, opponent = false) => {
    if (!cell || cell.dataset.bannerEnhanced === '1') return;
    const label = cell.textContent.trim();
    const code = normalizeCode(label);
    if (!code) return;

    cell.dataset.bannerEnhanced = '1';
    const wrap = document.createElement('div');
    wrap.className = opponent ? 'ke-alliance-identity is-opponent' : 'ke-alliance-identity';
    wrap.appendChild(makeBanner(code));
    const strong = document.createElement('strong');
    strong.textContent = label;
    wrap.appendChild(strong);
    cell.textContent = '';
    cell.appendChild(wrap);
  };

  const wrapRosterCell = cell => {
    if (!cell || cell.dataset.bannerEnhanced === '1') return;
    const label = cell.textContent.trim();
    const code = normalizeCode(label);
    if (!code) return;

    cell.dataset.bannerEnhanced = '1';
    const wrap = document.createElement('div');
    wrap.className = 'alliance-identity';
    wrap.appendChild(makeBanner(code));
    const strong = document.createElement('strong');
    strong.textContent = label;
    wrap.appendChild(strong);
    cell.textContent = '';
    cell.appendChild(wrap);
  };

  const enhanceCapitalNode = node => {
    if (!node || node.dataset.bannerEnhanced === '1') return;
    const owner = node.querySelector(':scope > strong');
    const code = normalizeCode(owner?.textContent);
    if (!code) return;

    node.dataset.bannerEnhanced = '1';
    node.dataset.allianceCode = code;

    const copy = document.createElement('div');
    copy.className = 'capital-node-copy';
    [...node.children].forEach(child => copy.appendChild(child));

    const watermark = makeBanner(code);
    watermark.classList.add('capital-banner-watermark');
    const banner = makeBanner(code);
    banner.classList.add('capital-banner-main');

    node.appendChild(watermark);
    node.appendChild(banner);
    node.appendChild(copy);
  };

  const enhance = () => {
    queued = false;
    const dashboard = app.querySelector('.ops-dashboard.fancy-home-v2, .ops-dashboard');
    if (!dashboard) return;

    ensureSprite();

    dashboard.querySelectorAll('.capital-rotation .capital-node').forEach(enhanceCapitalNode);

    dashboard.querySelectorAll('.alliance-table-panel tbody tr:not(.muted-row)').forEach(row => {
      wrapRosterCell(row.children[1]);
    });

    dashboard.querySelectorAll('.ke-panel tbody tr:not(.muted-row)').forEach(row => {
      row.classList.add('ke-matchup-row');
      wrapAllianceCell(row.children[0], false);
      wrapAllianceCell(row.children[1], true);
    });
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(enhance);
  };

  new MutationObserver(schedule).observe(app, { childList: true, subtree: true });
  window.addEventListener('hashchange', schedule);
  window.addEventListener('server504:localechange', schedule);
  schedule();
})();
