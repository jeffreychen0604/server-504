/* Home data presentation: CP meters, event hierarchy and Armory allocation.
 * Legacy fancy-home-v2 class is retained as a layout hook. No stylesheet or S4 artwork loader. */
(() => {
  const app = document.getElementById('app');
  if (!app) return;
  let renderQueued = false;
  let armoryStatePromise = null;

  const openContestCopy = {
    en: 'Open contest',
    fr: 'Contestation ouverte',
    es: 'Disputa abierta',
    pt: 'Disputa aberta',
    ko: '자유 경쟁',
    vi: 'Tranh chấp mở'
  };

  const currentLocale = () => {
    const value = window.Server504I18N?.locale?.() || localStorage.getItem('server504.locale') || localStorage.getItem('server504-locale') || 'en';
    return openContestCopy[value] ? value : 'en';
  };

  const parseNumber = value => {
    const n = Number(String(value || '').replace(/[^0-9.]/g, ''));
    return Number.isFinite(n) ? n : 0;
  };

  const markFeaturedHierarchy = dashboard => {
    const liveColumn = dashboard.querySelector('.featured-column-title.live')?.closest('.featured-column');
    const upcomingColumn = dashboard.querySelector('.featured-column-title.upcoming')?.closest('.featured-column');
    liveColumn?.classList.add('live-column');
    upcomingColumn?.classList.add('upcoming-column');

    dashboard.querySelectorAll('.event-card').forEach(card => {
      const title = card.querySelector('h3')?.textContent?.trim() || '';
      const key = title.toLowerCase();
      const eventType = card.querySelector('.event-type')?.textContent?.trim().toLowerCase() || '';

      card.classList.remove(
        'event-pet-supplies',
        'event-summer-paradise',
        'event-tech-lucky',
        'event-hero-lucky',
        'event-lucky-magic-house',
        'event-lucky-chest',
        'big-event-card'
      );
      if (key === 'pet supplies') card.classList.add('event-pet-supplies');
      if (key === 'summer paradise') card.classList.add('event-summer-paradise');
      if (key === 'tech lucky chest') card.classList.add('event-tech-lucky');
      if (key === 'hero lucky chest') card.classList.add('event-hero-lucky');
      if (key === 'lucky magic house') card.classList.add('event-lucky-magic-house');
      if (key === 'lucky chest') card.classList.add('event-lucky-chest');

      // Only true Big Events enter the hero tier. Lucky Magic House and Lucky Chest
      // are explicitly standard cards, matching the Hero Lucky Chest card tier.
      if (key !== 'lucky magic house' && key !== 'lucky chest' && (key === 'summer paradise' || eventType === 'big event')) {
        card.classList.add('big-event-card');
      }

      if (card.classList.contains('live') && !card.querySelector('.event-live-signal')) {
        const signal = document.createElement('span');
        signal.className = 'event-live-signal';
        signal.setAttribute('aria-hidden', 'true');
        signal.innerHTML = '<i></i>';
        card.appendChild(signal);
      }
    });
  };

  const enhancePowerTable = (panel, threatMode = false) => {
    if (!panel) return;
    const rows = [...panel.querySelectorAll('tbody tr')].filter(row => !row.classList.contains('muted-row'));
    if (!rows.length) return;

    const values = rows.map(row => parseNumber(row.lastElementChild?.textContent));
    const max = Math.max(...values, 1);

    rows.forEach((row, index) => {
      const cell = row.lastElementChild;
      if (!cell || cell.querySelector('.cp-cell-wrap')) return;
      const value = values[index];
      const share = Math.max(4, Math.min(100, (value / max) * 100));
      const raw = cell.textContent.trim() || '—';
      cell.textContent = '';

      const wrap = document.createElement('div');
      wrap.className = 'cp-cell-wrap';
      wrap.innerHTML = '<span class="cp-number"></span><span class="cp-meter" aria-hidden="true"><i></i></span>';
      wrap.querySelector('.cp-number').textContent = raw;
      wrap.querySelector('.cp-meter').style.setProperty('--cp-share', `${share.toFixed(1)}%`);
      cell.appendChild(wrap);

      if (threatMode) {
        row.dataset.threat = share >= 72 ? 'high' : share >= 38 ? 'medium' : 'low';
      }
    });
  };

  const getArmoryState = () => {
    armoryStatePromise ||= fetch('./content/server-status.json', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : null)
      .catch(() => null);
    return armoryStatePromise;
  };

  const enhanceArmories = dashboard => {
    const items = [...dashboard.querySelectorAll('.armory-item')];
    if (!items.length) return;

    getArmoryState().then(state => {
      const armories = state?.sharedAssets?.armories || [];
      if (!armories.length) return;

      items.forEach((item, index) => {
        const data = armories[index];
        if (!data) return;

        const status = String(data.status || (data.alliance ? 'registered' : 'pending')).toLowerCase();
        const signature = [status, data.alliance || '', ...(Array.isArray(data.contenders) ? data.contenders : [])].join('|');
        if (item.dataset.v2Armory === signature) return;
        item.dataset.v2Armory = signature;

        item.classList.remove('armory-registered', 'armory-open-contest', 'armory-available', 'armory-pending', 'pending', 'available');
        if (status === 'open-contest') item.classList.add('armory-open-contest');
        else if (status === 'available') item.classList.add('armory-available');
        else if (data.alliance) item.classList.add('armory-registered');
        else item.classList.add('armory-pending');

        const existingStrong = item.querySelector(':scope > strong, .armory-state-copy strong');
        let wrap = item.querySelector('.armory-state-copy');
        if (!wrap) {
          wrap = document.createElement('div');
          wrap.className = 'armory-state-copy';
          if (existingStrong) {
            existingStrong.replaceWith(wrap);
            wrap.appendChild(existingStrong);
          } else {
            item.appendChild(wrap);
          }
        }

        let strong = wrap.querySelector('strong');
        if (!strong) {
          strong = document.createElement('strong');
          wrap.prepend(strong);
        }

        let contenders = wrap.querySelector('.armory-contenders');
        if (status === 'open-contest') {
          strong.textContent = openContestCopy[currentLocale()];
          if (!contenders) {
            contenders = document.createElement('small');
            contenders.className = 'armory-contenders';
            wrap.appendChild(contenders);
          }
          contenders.textContent = Array.isArray(data.contenders) ? data.contenders.join(' · ') : '';
        } else {
          strong.textContent = data.alliance || strong.textContent || '—';
          contenders?.remove();
        }
      });
    });
  };

  const removeDeprecatedCrest = dashboard => {
    dashboard.querySelectorAll('.season-artifact').forEach(node => node.remove());
  };

  const enhance = () => {
    renderQueued = false;
    const dashboard = app.querySelector('.ops-dashboard');
    if (!dashboard) return;

    dashboard.classList.add('fancy-home-v2');
    removeDeprecatedCrest(dashboard);
    markFeaturedHierarchy(dashboard);
    enhancePowerTable(dashboard.querySelector('.alliance-table-panel'), false);
    enhancePowerTable(dashboard.querySelector('.ke-panel'), true);
    enhanceArmories(dashboard);
  };

  const scheduleEnhance = () => {
    if (renderQueued) return;
    renderQueued = true;
    requestAnimationFrame(enhance);
  };

  new MutationObserver(scheduleEnhance).observe(app, { childList: true, subtree: true });
  window.addEventListener('hashchange', scheduleEnhance);
  window.addEventListener('server504:localechange', () => {
    armoryStatePromise = null;
    scheduleEnhance();
  });
  scheduleEnhance();
})();