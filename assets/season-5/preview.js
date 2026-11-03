/* Standalone V2 prototype: real read-only data, local UI state, simulated feedback. */
(() => {
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const icon = id => `<svg aria-hidden="true"><use href="assets/season-5/ui-symbols.svg#${id}"/></svg>`;
  const date = value => new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' }).format(new Date(`${value}T12:00:00+07:00`));
  const wikiUrl = slug => `https://jeffreychen0604.github.io/server-504/#/wiki/${encodeURIComponent(slug)}`;
  const categories = {
    start: ['Bắt đầu từ đây', 'scroll'], 'combat-heroes': ['Chiến đấu & Hero', 'battle'],
    progression: ['Phát triển & Research', 'hourglass'], 'apc-pets': ['APC & Pet Agents', 'dashboard'],
    'alliance-state': ['Liên minh & Sự kiện', 'council'], 'economy-tools': ['Tài nguyên & Công cụ', 'atlas'],
    season4: ['Lưu trữ Season 4', 'scroll'],
  };
  let entries = [], manifest, searchReady, activeCategory = 'all', selectedSlug, visibleCount = 12;
  let view = 'dashboard';
  const openers = new Map();
  function openDialog(id, opener = document.activeElement) {
    if ($(`#${id}`).open) return;
    openers.set(id, opener); $(`#${id}`).showModal();
  }
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('close', () => {
    const opener = openers.get(dialog.id);
    if (opener?.isConnected && opener.getClientRects().length) opener.focus({ preventScroll: true });
    if (dialog.id === 'feedbackDialog') $('#feedbackResult').hidden = true;
  }));
  document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => $(`#${button.dataset.close}`).close()));
  function showView(next, focus = true) {
    view = ['dashboard', 'wiki', 'assets'].includes(next) ? next : 'dashboard';
    document.querySelectorAll('.view').forEach(element => { element.hidden = element.id !== `${view}View`; });
    document.querySelectorAll('#previewNav [data-view]').forEach(button => {
      if (button.dataset.view === view) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
    });
    if (focus) $('#main').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    if (location.hash === `#${button.dataset.view}`) showView(button.dataset.view);
    else location.hash = button.dataset.view;
  }));
  window.addEventListener('hashchange', () => showView(location.hash.slice(1)));
  $('#rosterJump').addEventListener('click', () => $('#allianceRoster').scrollIntoView({ block: 'start' }));
  document.querySelectorAll('[data-feedback]').forEach(button => button.addEventListener('click', () => openDialog('feedbackDialog', button)));
  $('#feedbackPreview').addEventListener('submit', event => {
    event.preventDefault(); const result = $('#feedbackResult'); result.hidden = false;
    result.textContent = 'Đã xem trước trạng thái hoàn tất. Không có nội dung nào được gửi tới quản trị viên.';
    result.scrollIntoView({ block: 'nearest' });
  });

  // The same banner mappings as production; no new or substituted alliance identities.
  const bannerCodes = { AP3X: 'ap3x', UIC: 'uic', AST: 'cmrd', ONE: 'dud', IDGF: 'idgf', ASU: 'ids', LTNX: 'ltnx', H3IL: 'h3il' };
  function identity(name) {
    const match = String(name).match(/^\[([^\]]+)\](.*)$/);
    return { tag: match?.[1] || name, name: match?.[2]?.trim() || name };
  }
  function banner(name) {
    const tag = identity(name).tag.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/§/g, 'S').toUpperCase();
    const code = bannerCodes[tag];
    if (!code) return '';
    return code === 'h3il' ? '<span class="alliance-banner alliance-banner--custom is-loaded" style="background-image:url(assets/alliance-banners/h3il.png)" aria-hidden="true"></span>' : `<span class="alliance-banner alliance-banner--${code}" aria-hidden="true"></span>`;
  }
  fetch('assets/alliance-banners-sprite.webp.base64.txt').then(response => { if (!response.ok) throw new Error(); return response.text(); }).then(data => {
    if (!data.trim().startsWith('UklG')) throw new Error();
    document.documentElement.style.setProperty('--server504-alliance-banner-sprite', `url("data:image/webp;base64,${data.trim()}")`);
  }).catch(() => { $('#rosterUpdated').textContent = 'Không tải được cờ liên minh'; });
  fetch('content/server-status.json').then(response => { if (!response.ok) throw new Error(); return response.json(); }).then(state => {
    const alliances = [...state.activeAlliances.alliances].sort((a,b) => a.rank - b.rank);
    const power = item => Number(item.totalCP.replace(/,/g, ''));
    const max = Math.max(...alliances.map(power));
    $('#rosterUpdated').textContent = `Cập nhật ${date(state.activeAlliances.updatedAt)}`;
    $('#allianceCount').textContent = alliances.length;
    $('#totalPower').textContent = new Intl.NumberFormat('en-US').format(alliances.reduce((sum,item) => sum + power(item),0));
    $('#alliancePodium').innerHTML = alliances.slice(0,3).map(item => {
      const label = identity(item.name);
      return `<article class="podium-card"><span class="podium-rank">#${item.rank}</span>${banner(item.name)}<h3>[${esc(label.tag)}]</h3><p class="podium-name">${esc(label.name)}</p><strong class="cp-number">${esc(item.totalCP)}</strong></article>`;
    }).join('');
    $('#rosterBody').innerHTML = alliances.map(item => `<tr><td>${String(item.rank).padStart(2,'0')}</td><td><div class="roster-identity">${banner(item.name)}<div><strong>${esc(item.name.replace(']','] '))}</strong><div class="roster-bar" aria-hidden="true"><i style="--power:${(power(item)/max*100).toFixed(2)}%"></i></div></div></div></td><td><span class="cp-number">${esc(item.totalCP)}</span></td></tr>`).join('');
    $('#keUpdated').textContent = date(state.keWatch.updatedAt); $('#keUpdated').dateTime = state.keWatch.updatedAt;
    $('#keMatches').innerHTML = state.keWatch.alliances.map(item => `<article class="match"><div class="match-teams"><strong>${esc(item.alliance)}</strong><span class="versus">VS</span><strong>${esc(item.opponentAlliance === 'Unknown' ? 'CHỜ' : item.opponentAlliance)}</strong></div><div class="match-details"><span>${esc(item.opponentServer === 'Unknown' ? 'Chưa có server' : `Server ${item.opponentServer}`)}</span><span class="cp-number">${esc(item.totalCP === 'Unknown' ? 'Chưa có CP' : item.totalCP)}</span></div></article>`).join('');
  }).catch(() => {
    $('#rosterUpdated').textContent = 'Chưa tải được dữ liệu';
    $('#rosterBody').innerHTML = '<tr><td colspan="3">Vui lòng tải lại bản xem trước.</td></tr>';
    $('#totalPower').textContent = 'Chưa có dữ liệu';
  });

  function matches(query, pool = entries) {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return pool.filter(entry => words.every(word => `${entry.title} ${entry.description} ${entry.group}`.toLowerCase().includes(word)));
  }
  function selectArticle(slug, navigate = false) {
    const entry = entries.find(item => item.slug === slug); if (!entry) return;
    selectedSlug = slug; $('#briefGroup').textContent = entry.group; $('#briefTitle').textContent = entry.title;
    $('#briefDescription').textContent = entry.description; $('#briefLink').href = wikiUrl(slug);
    document.querySelectorAll('.article-row').forEach(button => button.setAttribute('aria-current',String(button.dataset.article === slug)));
    if (navigate && window.matchMedia('(max-width: 1200px)').matches) {
      $('#articleBrief').scrollIntoView({ block: 'start' }); $('#briefLink').focus({ preventScroll: true });
    }
  }
  function renderLibrary() {
    if (!manifest) return;
    const category = manifest.categories.find(item => item.id === activeCategory);
    const pool = category ? entries.filter(entry => category.groups.includes(entry.group)) : entries;
    const found = matches($('#archiveSearch').value,pool);
    $('#libraryTitle').textContent = categories[activeCategory]?.[0] || 'Tất cả tài liệu';
    $('#libraryCount').textContent = `${found.length} tài liệu`;
    $('#articleBrief').hidden = !found.length;
    $('#articleList').innerHTML = found.length ? found.slice(0,visibleCount).map((entry,index) => `<button class="article-row" type="button" data-article="${esc(entry.slug)}" aria-current="${entry.slug === selectedSlug}"><small>${String(index+1).padStart(2,'0')}</small><span><span class="article-group">${esc(entry.group)}</span><strong>${esc(entry.title)}</strong><p>${esc(entry.description)}</p></span><b aria-hidden="true">↗</b></button>`).join('') + (found.length > visibleCount ? `<button class="text-button load-more" type="button">Xem thêm tài liệu (${found.length-visibleCount}) ↓</button>` : '') : '<p class="empty-state">Không tìm thấy tài liệu. Thử từ khóa khác hoặc chọn tất cả chuyên mục.</p>';
    $('#articleList').querySelectorAll('[data-article]').forEach(button => button.addEventListener('click', () => selectArticle(button.dataset.article,true)));
    $('.load-more')?.addEventListener('click', () => {
      const previousCount = visibleCount; visibleCount += 12; renderLibrary();
      document.querySelectorAll('.article-row')[previousCount]?.focus({ preventScroll: true });
    });
    if (found.length) selectArticle(found.some(item => item.slug === selectedSlug) ? selectedSlug : found[0].slug);
  }
  async function ensureSearch() {
    searchReady ||= fetch('content/wiki-manifest.json').then(response => { if (!response.ok) throw new Error(); return response.json(); }).then(data => {
      manifest = data; entries = data.articles;
      $('#wikiCount').textContent = `${entries.length} TÀI LIỆU / ${data.categories.length} CHUYÊN MỤC`;
      $('#wikiCategories').innerHTML = `<button class="category-button" type="button" data-category="all" aria-pressed="true">${icon('atlas')}<span>Tất cả tài liệu</span><small>${entries.length}</small></button>` + data.categories.map(category => {
        const [name,symbol] = categories[category.id] || [category.title,'atlas'];
        return `<button class="category-button" type="button" data-category="${esc(category.id)}" aria-pressed="false">${icon(symbol)}<span>${esc(name)}</span><small>${entries.filter(entry => category.groups.includes(entry.group)).length}</small></button>`;
      }).join('');
      $('#wikiCategories').querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => {
        activeCategory = button.dataset.category; visibleCount = 12;
        document.querySelectorAll('[data-category]').forEach(item => item.setAttribute('aria-pressed',String(item === button)));
        renderLibrary();
      }));
      renderLibrary();
    }).catch(error => { searchReady = null; throw error; });
    return searchReady;
  }
  $('#archiveSearch').addEventListener('input', () => { visibleCount = 12; renderLibrary(); });
  $('#backToLibrary').addEventListener('click', () => {
    $('#articleList').scrollIntoView({ block: 'start' });
    document.querySelector('.article-row[aria-current=true]')?.focus({ preventScroll: true });
  });
  function renderSearch(query) {
    const found = matches(query); const shown = found.slice(0,16);
    $('#searchCount').textContent = `${found.length} kết quả${found.length > shown.length ? ' · Hiển thị 16 kết quả đầu tiên' : ''}`;
    $('#searchResults').innerHTML = shown.length ? shown.map(entry => `<a class="search-result" href="${wikiUrl(entry.slug)}" target="_blank" rel="noopener"><small>${esc(entry.group)} / WIKI SERVER 504 ↗</small><strong>${esc(entry.title)}</strong><p>${esc(entry.description)}</p></a>`).join('') : '<p class="empty-state">Không tìm thấy kết quả. Thử từ khóa ngắn hơn.</p>';
  }
  async function openSearch(opener) {
    openDialog('searchDialog',opener); $('#wikiSearch').focus(); $('#searchCount').textContent = 'Đang đọc chỉ mục…';
    try { await ensureSearch(); renderSearch($('#wikiSearch').value); }
    catch { $('#searchCount').textContent = 'Không tải được chỉ mục. Đóng và thử lại.'; }
  }
  document.querySelectorAll('.search-launch').forEach(button => button.addEventListener('click', () => openSearch(button)));
  $('#wikiSearch').addEventListener('input', event => renderSearch(event.target.value));
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName) && !document.querySelector('dialog[open]')) {
      event.preventDefault(); if (view === 'wiki') $('#archiveSearch').focus(); else openSearch(document.activeElement);
    }
  });
  ensureSearch().catch(() => { $('#wikiCategories').textContent = 'Không tải được chỉ mục. Vui lòng tải lại trang.'; });

  const assets = [
    ['Nền chiến dịch / Desktop','Tâm đền ở bên phải, khoảng trống bên trái cho tiêu đề.','hero-desktop.webp','hero-desktop-960.webp'],
    ['Nền chiến dịch / Mobile','Bố cục dọc riêng, đền và vòng vàng ở nửa dưới.','hero-mobile.webp','hero-mobile-480.webp'],
    ['Đền tri thức / Wiki','Cổng rắn và cân vàng dùng cho hồ sơ tài liệu.','wiki-sanctuary.webp','wiki-sanctuary-640.webp'],
    ['Huy hiệu mùa / Concept','Nền trong suốt. Minh họa đề xuất, không phải logo chính thức.','serpent-crest.webp','serpent-crest-128.png'],
  ];
  $('#assetGallery').innerHTML = assets.map(([title,description,large,small]) => `<article class="asset-card"><img src="assets/season-5/draft-v1/${large}" alt="${esc(title)}" loading="lazy"><div><h2>${esc(title)}</h2><p>${esc(description)}</p><a href="assets/season-5/draft-v1/${large}" download>Tải bản lớn ↓</a><a href="assets/season-5/draft-v1/${small}" download>Tải bản nhỏ ↓</a></div></article>`).join('');
  $('#symbolGallery').innerHTML = [['dashboard','Dashboard'],['atlas','Wiki'],['battle','KE'],['council','Hội đồng'],['scroll','Tài liệu'],['hourglass','Lịch mùa']].map(([id,label]) => `<div>${icon(id)}${label}</div>`).join('');
  showView(location.hash.slice(1),false);
})();
