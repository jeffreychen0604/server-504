/* Server 504 — compact operational pulse enhancer */
(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const copy = {
    en:{pulse:'Server Pulse',snapshot:'Live operational snapshot',council:'Council',featured:'Featured',ke:'KE Intel',armories:'Armories',pending:'Pending',live:'Live',upcoming:'Upcoming',confirmed:'Confirmed',registered:'Registered'},
    fr:{pulse:'État du serveur',snapshot:'Aperçu opérationnel en direct',council:'Conseil',featured:'À la une',ke:'Rens. KE',armories:'Armories',pending:'En attente',live:'Actif',upcoming:'À venir',confirmed:'Confirmés',registered:'Enregistrées'},
    es:{pulse:'Pulso del servidor',snapshot:'Resumen operativo en vivo',council:'Consejo',featured:'Destacados',ke:'Intel KE',armories:'Armories',pending:'Pendiente',live:'Activo',upcoming:'Próx.',confirmed:'Confirmados',registered:'Registradas'},
    pt:{pulse:'Pulso do servidor',snapshot:'Resumo operacional ao vivo',council:'Conselho',featured:'Destaques',ke:'Intel KE',armories:'Armories',pending:'Pendente',live:'Ao vivo',upcoming:'Em breve',confirmed:'Confirmados',registered:'Registradas'},
    ko:{pulse:'서버 펄스',snapshot:'실시간 운영 요약',council:'평의회',featured:'주요 이벤트',ke:'KE 정보',armories:'Armory',pending:'대기 중',live:'진행',upcoming:'예정',confirmed:'확인',registered:'등록'},
    vi:{pulse:'Nhịp máy chủ',snapshot:'Tóm tắt vận hành trực tiếp',council:'Hội đồng',featured:'Sự kiện',ke:'KE Intel',armories:'Armory',pending:'Đang chờ',live:'Đang diễn ra',upcoming:'Sắp tới',confirmed:'Đã xác nhận',registered:'Đã đăng ký'}
  };

  const locale = () => window.Server504I18N?.locale?.() || localStorage.getItem('server504.locale') || 'en';
  const t = () => copy[locale()] || copy.en;

  let statePromise = null;
  const getState = () => {
    statePromise ||= fetch('./content/server-status.json', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .catch(() => null);
    return statePromise;
  };

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  const councilTone = value => {
    const v = String(value || '').toLowerCase();
    if (/open|active|approved|available/.test(v)) return 'green';
    if (/closed|blocked|alert|required/.test(v)) return 'red';
    return 'amber';
  };

  const render = async () => {
    const strip = app.querySelector('.ops-dashboard .status-strip');
    if (!strip || strip.dataset.pulseRendering === '1') return;
    strip.dataset.pulseRendering = '1';

    const state = await getState();
    const c = t();
    const council = state?.server?.councilStatus || c.pending;
    const liveCount = Array.isArray(state?.featuredEvents?.live) ? state.featuredEvents.live.length : 0;
    const upcomingCount = Array.isArray(state?.featuredEvents?.upcoming) ? state.featuredEvents.upcoming.length : 0;
    const keRows = Array.isArray(state?.keWatch?.alliances) ? state.keWatch.alliances : [];
    const keConfirmed = keRows.filter(x => x?.opponentAlliance).length;
    const allianceTotal = Math.max(Array.isArray(state?.activeAlliances?.alliances) ? state.activeAlliances.alliances.length : 0, 8);
    const armories = Array.isArray(state?.sharedAssets?.armories) ? state.sharedAssets.armories : [];
    const registered = armories.filter(x => x?.alliance).length;
    const armoryTotal = armories.length || 8;

    strip.classList.add('status-pulse-v2');
    strip.innerHTML = `
      <div class="pulse-brand">
        <span class="pulse-season-window" aria-hidden="true"></span>
        <span class="pulse-brand-copy">
          <small>Server 504</small>
          <strong>${esc(c.pulse)}</strong>
          <span>${esc(c.snapshot)}</span>
        </span>
      </div>
      <div class="pulse-metric" data-tone="${councilTone(council)}">
        <span class="pulse-dot" aria-hidden="true"></span>
        <span class="pulse-metric-copy"><small>${esc(c.council)}</small><strong>${esc(council)}</strong></span>
      </div>
      <div class="pulse-metric" data-tone="${liveCount ? 'green' : 'amber'}">
        <span class="pulse-dot" aria-hidden="true"></span>
        <span class="pulse-metric-copy"><small>${esc(c.featured)}</small><strong>${liveCount} ${esc(c.live)} · ${upcomingCount} ${esc(c.upcoming)}</strong></span>
      </div>
      <div class="pulse-metric" data-tone="${keConfirmed >= allianceTotal ? 'green' : 'amber'}">
        <span class="pulse-dot" aria-hidden="true"></span>
        <span class="pulse-metric-copy"><small>${esc(c.ke)}</small><strong>${keConfirmed} / ${allianceTotal} ${esc(c.confirmed)}</strong></span>
      </div>
      <div class="pulse-metric" data-tone="${registered >= armoryTotal ? 'green' : 'amber'}">
        <span class="pulse-dot" aria-hidden="true"></span>
        <span class="pulse-metric-copy"><small>${esc(c.armories)}</small><strong>${registered} / ${armoryTotal} ${esc(c.registered)}</strong></span>
      </div>`;
    strip.dataset.pulseRendering = '0';
  };

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      render();
    });
  };

  new MutationObserver(schedule).observe(app, { childList: true, subtree: true });
  window.addEventListener('hashchange', schedule);
  window.addEventListener('server504:localechange', () => {
    const strip = app.querySelector('.status-strip');
    if (strip) strip.dataset.pulseRendering = '0';
    schedule();
  });
  schedule();
})();
