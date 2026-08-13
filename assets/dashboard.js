/* Server 504 Operations Dashboard — Home renderer */
(() => {
  const fallbackState = {
    lastUpdated: '2026-08-14T04:57:00+07:00',
    server: { season: '4', theme: 'Sealed Island', councilStatus: 'Pending' },
    featuredEvents: { live: [], upcoming: [] },
    activeAlliances: { updatedAt: null, alliances: [] },
    keWatch: { updatedAt: null, alliances: [] },
    sharedAssets: {
      capital: { current: null, next: null },
      armories: Array.from({ length: 8 }, (_, i) => ({ number: i + 1, alliance: null }))
    },
    announcements: [],
    migration: { windowStatus: 'Pending', availableSeats: null, priorities: [], allianceNeeds: [] }
  };

  let dashboardState = fallbackState;

  const escapeHtml = value => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const displayDate = value => {
    if (!value) return 'Awaiting update';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return escapeHtml(value);
    return new Intl.DateTimeFormat('en', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: value.includes('T') ? '2-digit' : undefined,
      minute: value.includes('T') ? '2-digit' : undefined,
      hour12: false
    }).format(date);
  };

  const eventCard = (event, stateClass) => {
    const rewards = Array.isArray(event.rewards) ? event.rewards.join(' · ') : (event.rewards || 'Rewards pending');
    return `<article class="event-card ${stateClass}">
      <span class="event-type">${escapeHtml(event.type || (stateClass === 'live' ? 'Limited Event' : 'Upcoming Event'))}</span>
      <h3>${escapeHtml(event.name || 'Unnamed Event')}</h3>
      <p>${escapeHtml(event.description || 'Event details will be published when confirmed.')}</p>
      <div class="event-meta">
        ${event.startsIn ? `<div><span>Starts in:</span> ${escapeHtml(event.startsIn)}</div>` : ''}
        <div><span>Duration:</span> ${escapeHtml(event.duration || 'Pending')}</div>
      </div>
      <div class="event-rewards"><strong>Main rewards:</strong> ${escapeHtml(rewards)}</div>
    </article>`;
  };

  const eventColumn = (events, stateClass) => {
    if (!events?.length) {
      return `<div class="empty-card"><div><strong>No featured event published</strong>Awaiting the next confirmed limited-time or seasonal event.</div></div>`;
    }
    return `<div class="event-card-grid">${events.slice(0, 4).map(event => eventCard(event, stateClass)).join('')}</div>`;
  };

  const allianceRows = state => {
    const rows = state.activeAlliances?.alliances || [];
    if (!rows.length) return `<tr class="muted-row"><td colspan="3">Weekly alliance data is awaiting update.</td></tr>`;
    return rows.map((alliance, index) => `<tr>
      <td class="rank-col">${index + 1}</td>
      <td><strong>${escapeHtml(alliance.name)}</strong></td>
      <td class="cp">${escapeHtml(alliance.totalCP || '—')}</td>
    </tr>`).join('');
  };

  const keRows = state => {
    const rows = state.keWatch?.alliances || [];
    if (!rows.length) return `<tr class="muted-row"><td colspan="4">Saturday KE opponent data is awaiting the weekly update.</td></tr>`;
    return rows.map(row => `<tr>
      <td><strong>${escapeHtml(row.alliance)}</strong></td>
      <td>${escapeHtml(row.opponentAlliance || '—')}</td>
      <td>${escapeHtml(row.opponentServer || '—')}</td>
      <td>${escapeHtml(row.totalCP || '—')}</td>
    </tr>`).join('');
  };

  const armoryItems = state => {
    const armories = state.sharedAssets?.armories || [];
    return armories.map(item => {
      const alliance = item.alliance;
      const available = alliance === 'Available';
      const pending = !alliance;
      return `<div class="armory-item ${available ? 'available' : ''} ${pending ? 'pending' : ''}">
        <span>Armory ${escapeHtml(item.number)}</span>
        <strong>${escapeHtml(alliance || 'Awaiting registration')}</strong>
      </div>`;
    }).join('');
  };

  const announcements = state => {
    const list = state.announcements || [];
    if (!list.length) return `<div class="empty-card"><div><strong>No announcement published</strong>Server-wide notices will appear here.</div></div>`;
    return `<div class="announcement-list">${list.slice(0, 5).map(item => {
      const priority = String(item.priority || 'info').toLowerCase();
      const tagClass = priority === 'action required' || priority === 'action' ? 'action' : priority === 'important' ? 'important' : '';
      return `<article class="announcement-item">
        <span class="priority-tag ${tagClass}">${escapeHtml(item.priority || 'Info')}</span>
        <div class="announcement-copy"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.body || '')}</p></div>
        <time class="announcement-date">${displayDate(item.publishedAt)}</time>
      </article>`;
    }).join('')}</div>`;
  };

  const migrationValue = (value, empty = 'Awaiting Council update') => value ? escapeHtml(value) : `<span class="migration-empty">${empty}</span>`;

  window.homePage = function homePageDashboard() {
    const state = dashboardState || fallbackState;
    const server = state.server || fallbackState.server;
    const capital = state.sharedAssets?.capital || fallbackState.sharedAssets.capital;
    const registeredArmories = (state.sharedAssets?.armories || []).filter(item => item.alliance && item.alliance !== 'Available').length;
    const migration = state.migration || fallbackState.migration;

    return `<section class="page ops-dashboard">
      <div class="sealed-atmosphere dashboard-season-bg" aria-hidden="true">
        <div class="seal-sigil"><i></i><b></b></div>
        <div class="miasma miasma-one"></div><div class="miasma miasma-two"></div><div class="ember-field"></div>
      </div>

      <header class="dashboard-head">
        <div>
          <div class="eyebrow">Server 504 · Knowledge · Governance · Operations</div>
          <h1>Server Operations Dashboard</h1>
        </div>
        <div class="dashboard-updated"><span>Last updated</span><strong>${displayDate(state.lastUpdated)}</strong></div>
      </header>

      <section class="status-strip" aria-label="Server status">
        <div class="status-cell"><span class="status-icon">S4</span><div class="status-copy"><small>Season</small><strong>${escapeHtml(server.season)}</strong></div></div>
        <div class="status-cell"><span class="status-icon">◇</span><div class="status-copy"><small>Theme</small><strong>${escapeHtml(server.theme)}</strong></div></div>
        <div class="status-cell"><span class="status-icon">◎</span><div class="status-copy"><small>Server Council Status</small><strong class="${String(server.councilStatus).toLowerCase() === 'pending' ? 'pending' : ''}">${escapeHtml(server.councilStatus)}</strong></div></div>
      </section>

      <section class="dashboard-panel featured-panel">
        <div class="panel-head"><h2>Featured Events</h2><span class="featured-note">Only limited-time and seasonal / cross-server events are shown.</span></div>
        <div class="featured-columns">
          <div class="featured-column"><div class="featured-column-title live">Live Now</div>${eventColumn(state.featuredEvents?.live, 'live')}</div>
          <div class="featured-column"><div class="featured-column-title upcoming">Coming Up</div>${eventColumn(state.featuredEvents?.upcoming, 'upcoming')}</div>
        </div>
      </section>

      <div class="dashboard-two-col">
        <section class="dashboard-panel ke-panel">
          <div class="panel-head"><h2>⚠ Saturday KE — Alliance Invasion Watch</h2><small>${displayDate(state.keWatch?.updatedAt)}</small></div>
          <p class="ke-explainer">Each alliance faces a weekly Alliance Duel opponent. On <strong>Saturday — commonly known as KE (Kill Event)</strong> — opposing players may enter Server 504 and freely attack players from any alliance. This board shows each 504 alliance's opponent, their server and Total CP so the whole server can prepare.</p>
          <div class="table-wrap"><table class="dashboard-table"><thead><tr><th>504 Alliance</th><th>Opponent Alliance</th><th>Opponent Server</th><th>Total CP</th></tr></thead><tbody>${keRows(state)}</tbody></table></div>
        </section>

        <section class="dashboard-panel alliance-table-panel">
          <div class="panel-head"><h2>Active Alliances — Weekly Update</h2><small>${displayDate(state.activeAlliances?.updatedAt)}</small></div>
          <div class="table-wrap"><table class="dashboard-table"><thead><tr><th class="rank-col">#</th><th>Alliance Name</th><th>Total CP</th></tr></thead><tbody>${allianceRows(state)}</tbody></table></div>
        </section>
      </div>

      <section class="dashboard-panel shared-panel">
        <div class="panel-head"><h2>Shared Assets</h2><small>Current operational allocation</small></div>
        <div class="shared-body">
          <div class="capital-rotation">
            <div class="capital-node"><small>Current Capital Owner</small><strong>${escapeHtml(capital.current || 'Pending')}</strong><span>Current rotation holder</span></div>
            <div class="capital-arrow">›</div>
            <div class="capital-node next"><small>Next Capital Owner</small><strong>${escapeHtml(capital.next || 'Pending')}</strong><span>Next scheduled holder</span></div>
          </div>
          <div class="armory-registration">
            <div class="armory-title-row"><h3>Armory Registration</h3><span class="armory-count">${registeredArmories} / 8 registered</span></div>
            <div class="armory-grid">${armoryItems(state)}</div>
          </div>
        </div>
      </section>

      <div class="dashboard-bottom-grid">
        <section class="dashboard-panel">
          <div class="panel-head"><h2>Server Announcements</h2><small>Server-wide notices</small></div>
          ${announcements(state)}
        </section>
        <section class="dashboard-panel">
          <div class="panel-head"><h2>Migration & Recruitment Status</h2><small>Current planning status</small></div>
          <div class="migration-body">
            <div class="migration-row"><small>Current Window</small><strong class="${String(migration.windowStatus).toLowerCase() === 'pending' ? 'pending' : ''}">${migrationValue(migration.windowStatus)}</strong></div>
            <div class="migration-row"><small>Available Seats</small><span>${migration.availableSeats == null ? '<span class="migration-empty">Awaiting allocation</span>' : escapeHtml(migration.availableSeats)}</span></div>
            <div class="migration-row"><small>Recruitment Priority</small><span>${migration.priorities?.length ? migration.priorities.map(escapeHtml).join(' · ') : '<span class="migration-empty">Awaiting recruitment plan</span>'}</span></div>
            <div class="migration-row"><small>Alliance Needs</small><span>${migration.allianceNeeds?.length ? migration.allianceNeeds.map(escapeHtml).join(' · ') : '<span class="migration-empty">Awaiting alliance placement needs</span>'}</span></div>
          </div>
        </section>
      </div>

      <nav class="quick-access" aria-label="Quick access">
        <a href="#/wiki"><span>▣</span> Game Wiki</a>
        <a href="#/charter"><span>▤</span> Server Charter</a>
        <a href="#/codex"><span>▦</span> Operational Codex</a>
        <button class="contribute-trigger" type="button"><span>✎</span> Contribute / Suggest</button>
      </nav>
    </section>`;
  };

  async function loadDashboardState() {
    try {
      const response = await fetch('./content/server-status.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      dashboardState = await response.json();
    } catch (error) {
      console.warn('Server 504 dashboard state unavailable; using fallback state.', error);
      dashboardState = fallbackState;
    }

    const route = (location.hash.replace(/^#\//, '').split('?')[0] || 'home').split('/')[0];
    if (route === 'home' && typeof render === 'function') render();
  }

  loadDashboardState();
})();
