/* Server 504 — Home V2 semantic presentation enhancer
 * Reads the existing public server-status JSON and applies display-only classes.
 * No routing, persistence or fetch monkeypatching.
 */
(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const openContestCopy = {
    en: 'Open contest',
    fr: 'Contestation ouverte',
    es: 'Disputa abierta',
    pt: 'Disputa aberta',
    ko: '자유 경쟁',
    vi: 'Tranh chấp mở'
  };

  const getLocale = () => {
    const value = window.Server504I18N?.locale?.() || localStorage.getItem('server504.locale') || localStorage.getItem('server504-locale') || 'en';
    return openContestCopy[value] ? value : 'en';
  };

  let statePromise;
  const getState = () => {
    statePromise ||= fetch('./content/server-status.json', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : null)
      .catch(() => null);
    return statePromise;
  };

  const enhanceArmories = async () => {
    const dashboard = app.querySelector('.ops-dashboard');
    const items = dashboard ? [...dashboard.querySelectorAll('.armory-item')] : [];
    if (!items.length) return;

    const state = await getState();
    const armories = state?.sharedAssets?.armories || [];
    if (!armories.length) return;

    items.forEach((item, index) => {
      const data = armories[index];
      if (!data) return;

      const status = String(data.status || (data.alliance ? 'registered' : 'pending')).toLowerCase();
      item.classList.remove('armory-registered', 'armory-open-contest', 'armory-available', 'armory-pending', 'pending', 'available');

      if (status === 'open-contest') item.classList.add('armory-open-contest');
      else if (status === 'available') item.classList.add('armory-available');
      else if (data.alliance) item.classList.add('armory-registered');
      else item.classList.add('armory-pending');

      const currentStrong = item.querySelector(':scope > strong, .armory-state-copy strong');
      let wrap = item.querySelector('.armory-state-copy');
      if (!wrap) {
        wrap = document.createElement('div');
        wrap.className = 'armory-state-copy';
        if (currentStrong) {
          currentStrong.replaceWith(wrap);
          wrap.appendChild(currentStrong);
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
        strong.textContent = openContestCopy[getLocale()];
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
  };

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(async () => {
      queued = false;
      await enhanceArmories();
    });
  };

  new MutationObserver(schedule).observe(app, { childList: true, subtree: true });
  window.addEventListener('hashchange', schedule);
  window.addEventListener('server504:localechange', schedule);
  schedule();
})();
