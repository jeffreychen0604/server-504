/* Server 504 — Active Alliances weekly trend enhancer
 * Adds lightweight CP and rank movement references using the previous snapshot
 * stored in content/server-status.json.
 *
 * Important: Fancy Home owns the CP meter. This enhancer waits for .cp-cell-wrap
 * and decorates it without changing the raw CP text, preventing trend percentages
 * from being parsed as part of Total CP.
 */
(() => {
  const app = document.getElementById('app');
  if (!app) return;

  let activeState = null;
  let queued = false;

  const parseCP = value => {
    const digits = String(value ?? '').replace(/[^0-9]/g, '');
    return digits ? Number(digits) : null;
  };

  const exactDelta = value => `${value >= 0 ? '+' : '-'}${Math.abs(value).toLocaleString('en-US')} CP`;

  const referenceLabel = value => {
    const match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return String(value || '');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[Number(match[2]) - 1]} ${Number(match[3])}`;
  };

  const trendMeta = (current, previous) => {
    if (!Number.isFinite(current) || !Number.isFinite(previous) || previous === 0) return null;
    const delta = current - previous;
    const pct = delta / previous * 100;
    if (Math.abs(delta) < 1) return { delta, pct, dir: 'flat', symbol: '•' };
    return delta > 0
      ? { delta, pct, dir: 'up', symbol: '▲' }
      : { delta, pct, dir: 'down', symbol: '▼' };
  };

  const enhance = () => {
    queued = false;
    if (!activeState) return;

    const panel = app.querySelector('.alliance-table-panel');
    if (!panel) return;

    const reference = activeState.previousUpdatedAt;
    const headDate = panel.querySelector('.panel-head > small');
    if (headDate && reference && headDate.dataset.trendReference !== reference) {
      headDate.dataset.trendReference = reference;
      headDate.querySelector('.alliance-trend-reference')?.remove();
      const ref = document.createElement('span');
      ref.className = 'alliance-trend-reference';
      ref.textContent = ` · vs ${referenceLabel(reference)}`;
      ref.title = `Compared with previous snapshot: ${reference}`;
      headDate.appendChild(ref);
    }

    const rows = [...panel.querySelectorAll('tbody tr:not(.muted-row)')];
    const alliances = activeState.alliances || [];

    rows.forEach((row, index) => {
      const item = alliances[index];
      if (!item || row.dataset.trendEnhanced === '1') return;

      const cpCell = row.children[2];
      if (!cpCell) return;

      /* Wait until Fancy Home has created a clean CP number + meter structure. */
      const cpWrap = cpCell.querySelector('.cp-cell-wrap');
      const cpNumber = cpWrap?.querySelector('.cp-number');
      const cpMeter = cpWrap?.querySelector('.cp-meter');
      if (!cpWrap || !cpNumber || !cpMeter) return;

      const currentRank = Number(item.rank ?? index + 1);
      const previousRank = Number(item.previousRank ?? currentRank);
      const currentCP = parseCP(item.totalCP);
      const previousCP = parseCP(item.previousTotalCP);
      const trend = trendMeta(currentCP, previousCP);

      const primaryLine = document.createElement('div');
      primaryLine.className = 'cp-primary-line';
      cpNumber.replaceWith(primaryLine);
      primaryLine.appendChild(cpNumber);

      if (trend) {
        const indicator = document.createElement('small');
        indicator.className = `cp-trend ${trend.dir}`;
        indicator.title = `${exactDelta(trend.delta)} vs ${reference || 'previous snapshot'}`;

        const cpMove = document.createElement('span');
        cpMove.className = 'cp-trend-cp';
        cpMove.textContent = `${trend.symbol} ${Math.abs(trend.pct).toFixed(1)}%`;
        indicator.appendChild(cpMove);

        if (currentRank !== previousRank) {
          const movedUp = currentRank < previousRank;
          const rankMove = document.createElement('span');
          rankMove.className = `rank-move-inline ${movedUp ? 'up' : 'down'}`;
          rankMove.textContent = `Rank ${movedUp ? '▲' : '▼'}${Math.abs(previousRank - currentRank)}`;
          rankMove.title = `Rank ${movedUp ? 'up' : 'down'} ${Math.abs(previousRank - currentRank)} vs ${reference || 'previous snapshot'}`;
          indicator.appendChild(rankMove);
        }

        primaryLine.appendChild(indicator);
      }

      row.dataset.trendEnhanced = '1';
    });
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(enhance);
  };

  fetch('./content/server-status.json', { cache: 'no-store' })
    .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
    .then(state => {
      activeState = state.activeAlliances || null;
      schedule();
    })
    .catch(err => console.warn('Active alliance trend data unavailable.', err));

  new MutationObserver(schedule).observe(app, { childList: true, subtree: true });
  window.addEventListener('hashchange', schedule);
  window.addEventListener('server504:localechange', schedule);
  schedule();
})();
