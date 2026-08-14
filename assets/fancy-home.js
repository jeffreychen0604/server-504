/*
 * Server 504 — Fancy Home V2 presentation enhancer
 * DOM-only visual polish: no routing, fetch, persistence or application-state changes.
 */
(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let revealObserver = null;
  let renderQueued = false;

  const parseNumber = value => {
    const n = Number(String(value || '').replace(/[^0-9.]/g, ''));
    return Number.isFinite(n) ? n : 0;
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
      wrap.innerHTML = `<span class="cp-number"></span><span class="cp-meter" aria-hidden="true"><i></i></span>`;
      wrap.querySelector('.cp-number').textContent = raw;
      wrap.querySelector('.cp-meter').style.setProperty('--cp-share', `${share.toFixed(1)}%`);
      cell.appendChild(wrap);

      if (threatMode) {
        row.dataset.threat = share >= 72 ? 'high' : share >= 38 ? 'medium' : 'low';
      }
    });
  };

  const addSeasonArtifact = dashboard => {
    const head = dashboard.querySelector('.dashboard-head');
    if (!head || head.querySelector('.season-artifact')) return;
    const artifact = document.createElement('div');
    artifact.className = 'season-artifact';
    artifact.setAttribute('aria-hidden', 'true');
    artifact.innerHTML = '<span>S4 · SEALED ISLAND</span>';
    head.appendChild(artifact);
  };

  const wireParallax = dashboard => {
    if (dashboard.dataset.fancyParallaxWired === '1' || reducedMotion) return;
    dashboard.dataset.fancyParallaxWired = '1';

    dashboard.addEventListener('pointermove', event => {
      const rect = dashboard.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(rect.width, 1)));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(rect.height, 1)));
      dashboard.style.setProperty('--parallax-x', `${((x - .5) * 14).toFixed(2)}px`);
      dashboard.style.setProperty('--parallax-y', `${((y - .5) * 10).toFixed(2)}px`);
      dashboard.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`);
      dashboard.style.setProperty('--pointer-y', `${(Math.min(y, .34) * 100).toFixed(1)}%`);
    }, { passive: true });

    dashboard.addEventListener('pointerleave', () => {
      dashboard.style.setProperty('--parallax-x', '0px');
      dashboard.style.setProperty('--parallax-y', '0px');
      dashboard.style.setProperty('--pointer-x', '50%');
      dashboard.style.setProperty('--pointer-y', '50%');
    }, { passive: true });
  };

  const wireEventTilt = dashboard => {
    if (reducedMotion) return;
    dashboard.querySelectorAll('.event-card').forEach(card => {
      if (card.dataset.fancyTiltWired === '1') return;
      card.dataset.fancyTiltWired = '1';

      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(rect.width, 1)));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(rect.height, 1)));
        card.style.setProperty('--tilt-x', `${((x - .5) * 3.2).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${((.5 - y) * 2.5).toFixed(2)}deg`);
        card.style.setProperty('--card-x', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--card-y', `${(y * 100).toFixed(1)}%`);
      }, { passive: true });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
        card.style.setProperty('--card-x', '75%');
        card.style.setProperty('--card-y', '15%');
      }, { passive: true });
    });
  };

  const wireReveals = dashboard => {
    const targets = [
      ...dashboard.querySelectorAll('.status-strip, .dashboard-panel, .quick-access')
    ];
    targets.forEach((el, index) => {
      if (el.dataset.fancyRevealWired === '1') return;
      el.dataset.fancyRevealWired = '1';
      el.classList.add('home-reveal');
      el.style.setProperty('--reveal-delay', `${Math.min(index * 42, 250)}ms`);
      if (reducedMotion || !('IntersectionObserver' in window)) {
        el.classList.add('is-visible');
      } else {
        revealObserver ||= new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            revealObserver?.unobserve(entry.target);
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: .06 });
        revealObserver.observe(el);
      }
    });
  };

  const enhance = () => {
    renderQueued = false;
    const dashboard = app.querySelector('.ops-dashboard');
    if (!dashboard) return;

    dashboard.classList.add('fancy-home-v2');
    addSeasonArtifact(dashboard);
    enhancePowerTable(dashboard.querySelector('.alliance-table-panel'), false);
    enhancePowerTable(dashboard.querySelector('.ke-panel'), true);
    wireParallax(dashboard);
    wireEventTilt(dashboard);
    wireReveals(dashboard);
  };

  const scheduleEnhance = () => {
    if (renderQueued) return;
    renderQueued = true;
    requestAnimationFrame(enhance);
  };

  new MutationObserver(scheduleEnhance).observe(app, { childList: true, subtree: true });
  window.addEventListener('hashchange', scheduleEnhance);
  window.addEventListener('server504:localechange', scheduleEnhance);
  scheduleEnhance();
})();
