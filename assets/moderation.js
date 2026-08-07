(() => {
  const api = (window.SERVER504_CONFIG?.feedbackApi || '').replace(/\/$/, '');
  const login = document.getElementById('moderationLogin');
  const app = document.getElementById('moderationApp');
  const loginForm = document.getElementById('moderationLoginForm');
  const tokenInput = document.getElementById('moderationToken');
  const loginStatus = document.getElementById('moderationLoginStatus');
  const statusEl = document.getElementById('moderationStatus');
  const list = document.getElementById('moderationList');
  const stats = document.getElementById('moderationStats');
  const count = document.getElementById('moderationCount');
  const refresh = document.getElementById('moderationRefresh');
  const logout = document.getElementById('moderationLogout');
  let filter = 'pending';

  const key = 'server504-admin-token';
  const getToken = () => sessionStorage.getItem(key) || '';
  const setToken = value => value ? sessionStorage.setItem(key, value) : sessionStorage.removeItem(key);

  const esc = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const fmt = value => value ? new Date(`${value.replace(' ', 'T')}Z`).toLocaleString() : '—';
  const showMessage = (el, state, message) => {
    if (!el) return;
    el.hidden = false;
    el.dataset.state = state;
    el.textContent = message;
  };
  const hideMessage = el => { if (el) el.hidden = true; };

  async function request(path, options = {}) {
    if (!api) throw new Error('Feedback API is not configured.');
    const token = getToken();
    const res = await fetch(`${api}${path}`, {
      ...options,
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`,
        ...(options.headers || {})
      }
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401 || res.status === 403) {
      setToken('');
      login.hidden = false;
      app.hidden = true;
      throw new Error('Admin token is invalid or expired.');
    }
    if (!res.ok || data.ok === false) throw new Error(data.error || 'Request failed.');
    return data;
  }

  function renderStats(values = {}) {
    const order = ['pending','accepted','applied','rejected','spam'];
    stats.innerHTML = order.map(name => `<article class="moderation-stat"><small>${esc(name)}</small><strong>${Number(values[name] || 0)}</strong></article>`).join('');
  }

  function renderItems(items = []) {
    count.textContent = `${items.length} item${items.length === 1 ? '' : 's'}`;
    if (!items.length) {
      list.innerHTML = '<div class="moderation-empty">No feedback in this queue.</div>';
      return;
    }

    list.innerHTML = items.map(item => {
      const meta = [
        item.identity ? `<span><b>Player:</b> ${esc(item.identity)}</span>` : '',
        item.contact ? `<span><b>Contact:</b> ${esc(item.contact)}</span>` : '',
        `<span><b>Language:</b> ${esc((item.locale || 'en').toUpperCase())}</span>`,
        `<span><b>Page:</b> ${esc(item.page || '#/home')}</span>`
      ].filter(Boolean).join('');
      return `<article class="moderation-card" data-id="${esc(item.id)}">
        <div>
          <div class="moderation-card-head">
            <div><div class="moderation-type">${esc(item.type)}</div><h2>${esc(item.title)}</h2></div>
            <time class="moderation-date">${esc(fmt(item.created_at))}</time>
          </div>
          <div class="moderation-details">${esc(item.details)}</div>
          <div class="moderation-meta">${meta}</div>
        </div>
        <aside class="moderation-side">
          <span class="moderation-status-chip">${esc(item.status)}</span>
          <label>Moderator note<textarea class="moderation-note" maxlength="2000">${esc(item.moderator_note || '')}</textarea></label>
          <div class="moderation-state-actions">
            <button type="button" data-status="accepted">Accept</button>
            <button type="button" data-status="applied">Applied</button>
            <button type="button" data-status="rejected">Reject</button>
            <button type="button" data-status="spam">Spam</button>
            <button type="button" data-status="pending">Pending</button>
          </div>
          <button class="moderation-save-note" type="button">Save note</button>
        </aside>
      </article>`;
    }).join('');

    list.querySelectorAll('[data-status]').forEach(button => {
      button.addEventListener('click', async () => {
        const card = button.closest('.moderation-card');
        await updateItem(card, button.dataset.status);
      });
    });
    list.querySelectorAll('.moderation-save-note').forEach(button => {
      button.addEventListener('click', async () => {
        const card = button.closest('.moderation-card');
        const current = card.querySelector('.moderation-status-chip').textContent.trim().toLowerCase();
        await updateItem(card, current);
      });
    });
  }

  async function updateItem(card, nextStatus) {
    const id = card.dataset.id;
    const note = card.querySelector('.moderation-note').value.trim();
    showMessage(statusEl, 'loading', 'Saving moderation decision…');
    try {
      await request(`/admin/feedback/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: nextStatus, moderatorNote: note })
      });
      showMessage(statusEl, 'success', 'Saved.');
      await loadInbox();
      setTimeout(() => hideMessage(statusEl), 900);
    } catch (error) {
      showMessage(statusEl, 'error', error.message);
    }
  }

  async function loadInbox() {
    showMessage(statusEl, 'loading', 'Loading inbox…');
    try {
      const data = await request(`/admin/feedback?status=${encodeURIComponent(filter)}&limit=100`);
      renderStats(data.stats || {});
      renderItems(data.items || []);
      hideMessage(statusEl);
      login.hidden = true;
      app.hidden = false;
    } catch (error) {
      showMessage(loginStatus, 'error', error.message);
    }
  }

  loginForm.addEventListener('submit', async event => {
    event.preventDefault();
    setToken(tokenInput.value.trim());
    hideMessage(loginStatus);
    await loadInbox();
  });

  document.querySelectorAll('.moderation-filter').forEach(button => {
    button.addEventListener('click', async () => {
      filter = button.dataset.filter;
      document.querySelectorAll('.moderation-filter').forEach(x => x.classList.toggle('active', x === button));
      await loadInbox();
    });
  });

  refresh.addEventListener('click', loadInbox);
  logout.addEventListener('click', () => {
    setToken('');
    tokenInput.value = '';
    app.hidden = true;
    login.hidden = false;
    tokenInput.focus();
  });

  if (getToken()) loadInbox();
})();
