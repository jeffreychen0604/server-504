const REPO = 'jeffreychen0604/server-504';

const app = document.getElementById('app');
const sidebar = document.getElementById('sidebar');
const languageSelect = document.getElementById('languageSelect');
const searchDialog = document.getElementById('searchDialog');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const contributeDialog = document.getElementById('contributeDialog');

const contentMap = {
  charter: { file: 'charter.md', title: 'Server 504 Charter', eyebrow: 'GOVERNANCE · PERMANENT PRINCIPLES', description: 'The permanent principles governing cooperation, autonomy, shared assets, due process and Council authority on Server 504.' },
  codex: { file: 'operational-codex.md', title: 'Operational Codex', eyebrow: 'OPERATIONS · PRACTICAL RULES', description: 'Fast-reference operational rules for R4/R5 teams, server events, shared assets, disputes, sanctions and cross-server coordination.' },
  season: { file: 'seasonal-annex.md', title: 'Seasonal Strategic Annex', eyebrow: 'CURRENT SEASON · CHANGEABLE LAYER', description: 'Season-specific schedules, alliance assignments, Capital rotation, Armory access, operational roles, migration and diplomacy.' }
};

const ui = {
  en: {
    navWiki:'Wiki', navCharter:'Charter', navCodex:'Operations', navSeason:'Current Season', knowledge:'Knowledge', home:'Home', gameWiki:'Game Wiki', serverCharter:'Server Charter', operationalCodex:'Operational Codex', seasonalAnnex:'Seasonal Annex', community:'Community', contribute:'Contribute / Suggest', searchLabel:'GLOBAL SEARCH', searchTitle:'Search Server 504', communityContribution:'COMMUNITY CONTRIBUTION', sendSuggestion:'Send a suggestion', type:'Type', title:'Title', details:'Details', allianceOptional:'Alliance / player name (optional)', githubNote:'V0 stores community suggestions as GitHub Issues. Anonymous submission can be added later with the free D1 backend.', continueGithub:'Continue to GitHub', heroKicker:'DARK WAR: SURVIVAL · SERVER 504', heroLead:'A shared knowledge base for game information, server governance, operations and seasonal coordination.', searchKnowledge:'Search the Knowledge Base', sendSuggestionBtn:'Send a suggestion', latest:'CURRENT FOUNDATION', wikiDescription:'Game knowledge and practical reference for Server 504 players. The category structure is ready; detailed game articles will be added progressively.'
  },
  fr: {
    navWiki:'Wiki', navCharter:'Charte', navCodex:'Opérations', navSeason:'Saison actuelle', knowledge:'Connaissances', home:'Accueil', gameWiki:'Wiki du jeu', serverCharter:'Charte du serveur', operationalCodex:'Codex opérationnel', seasonalAnnex:'Annexe saisonnière', community:'Communauté', contribute:'Contribuer / Suggérer', searchLabel:'RECHERCHE GLOBALE', searchTitle:'Rechercher sur Server 504', communityContribution:'CONTRIBUTION COMMUNAUTAIRE', sendSuggestion:'Envoyer une suggestion', type:'Type', title:'Titre', details:'Détails', allianceOptional:'Alliance / joueur (optionnel)', githubNote:'La V0 enregistre les suggestions dans GitHub Issues. Une soumission anonyme via D1 pourra être ajoutée plus tard.', continueGithub:'Continuer vers GitHub', heroKicker:'DARK WAR: SURVIVAL · SERVER 504', heroLead:'Une base commune pour le jeu, la gouvernance du serveur, les opérations et la coordination saisonnière.', searchKnowledge:'Rechercher', sendSuggestionBtn:'Envoyer une suggestion', latest:'BASE ACTUELLE', wikiDescription:'Connaissances du jeu et références pratiques pour les joueurs du Server 504.'
  },
  es: {
    navWiki:'Wiki', navCharter:'Carta', navCodex:'Operaciones', navSeason:'Temporada actual', knowledge:'Conocimiento', home:'Inicio', gameWiki:'Wiki del juego', serverCharter:'Carta del servidor', operationalCodex:'Códice operativo', seasonalAnnex:'Anexo estacional', community:'Comunidad', contribute:'Contribuir / Sugerir', searchLabel:'BÚSQUEDA GLOBAL', searchTitle:'Buscar en Server 504', communityContribution:'CONTRIBUCIÓN COMUNITARIA', sendSuggestion:'Enviar una sugerencia', type:'Tipo', title:'Título', details:'Detalles', allianceOptional:'Alianza / jugador (opcional)', githubNote:'La V0 guarda las sugerencias como GitHub Issues. Más adelante se puede añadir envío anónimo con D1.', continueGithub:'Continuar a GitHub', heroKicker:'DARK WAR: SURVIVAL · SERVER 504', heroLead:'Una base compartida para información del juego, gobernanza, operaciones y coordinación de temporada.', searchKnowledge:'Buscar', sendSuggestionBtn:'Enviar sugerencia', latest:'BASE ACTUAL', wikiDescription:'Conocimiento del juego y referencia práctica para jugadores del Server 504.'
  },
  pt: {
    navWiki:'Wiki', navCharter:'Carta', navCodex:'Operações', navSeason:'Temporada atual', knowledge:'Conhecimento', home:'Início', gameWiki:'Wiki do jogo', serverCharter:'Carta do servidor', operationalCodex:'Códice operacional', seasonalAnnex:'Anexo sazonal', community:'Comunidade', contribute:'Contribuir / Sugerir', searchLabel:'BUSCA GLOBAL', searchTitle:'Pesquisar no Server 504', communityContribution:'CONTRIBUIÇÃO DA COMUNIDADE', sendSuggestion:'Enviar sugestão', type:'Tipo', title:'Título', details:'Detalhes', allianceOptional:'Aliança / jogador (opcional)', githubNote:'A V0 armazena sugestões como GitHub Issues. Envio anônimo com D1 pode ser adicionado depois.', continueGithub:'Continuar para GitHub', heroKicker:'DARK WAR: SURVIVAL · SERVER 504', heroLead:'Uma base compartilhada para informações do jogo, governança, operações e coordenação sazonal.', searchKnowledge:'Pesquisar', sendSuggestionBtn:'Enviar sugestão', latest:'BASE ATUAL', wikiDescription:'Conhecimento do jogo e referência prática para jogadores do Server 504.'
  },
  ko: {
    navWiki:'위키', navCharter:'헌장', navCodex:'운영', navSeason:'현재 시즌', knowledge:'정보', home:'홈', gameWiki:'게임 위키', serverCharter:'서버 헌장', operationalCodex:'운영 규정', seasonalAnnex:'시즌 부록', community:'커뮤니티', contribute:'의견 제안', searchLabel:'전체 검색', searchTitle:'Server 504 검색', communityContribution:'커뮤니티 제안', sendSuggestion:'의견 보내기', type:'유형', title:'제목', details:'내용', allianceOptional:'연맹 / 플레이어명 (선택)', githubNote:'V0는 제안을 GitHub Issues에 저장합니다. 이후 무료 D1 백엔드로 익명 제출을 추가할 수 있습니다.', continueGithub:'GitHub에서 계속', heroKicker:'DARK WAR: SURVIVAL · SERVER 504', heroLead:'게임 정보, 서버 거버넌스, 운영 및 시즌 협업을 위한 공동 지식 베이스입니다.', searchKnowledge:'지식 베이스 검색', sendSuggestionBtn:'의견 보내기', latest:'현재 기반', wikiDescription:'Server 504 플레이어를 위한 게임 지식과 실전 참고 자료입니다.'
  },
  vi: {
    navWiki:'Wiki', navCharter:'Hiến chương', navCodex:'Vận hành', navSeason:'Mùa hiện tại', knowledge:'Tri thức', home:'Trang chủ', gameWiki:'Wiki game', serverCharter:'Hiến chương Server', operationalCodex:'Operational Codex', seasonalAnnex:'Phụ lục theo mùa', community:'Cộng đồng', contribute:'Đóng góp / Góp ý', searchLabel:'TRA CỨU TOÀN SITE', searchTitle:'Tra cứu Server 504', communityContribution:'ĐÓNG GÓP CỘNG ĐỒNG', sendSuggestion:'Gửi góp ý', type:'Loại góp ý', title:'Tiêu đề', details:'Nội dung', allianceOptional:'Liên minh / tên người chơi (không bắt buộc)', githubNote:'V0 lưu góp ý dưới dạng GitHub Issues. Sau này có thể thêm gửi ẩn danh bằng backend D1 miễn phí.', continueGithub:'Tiếp tục trên GitHub', heroKicker:'DARK WAR: SURVIVAL · SERVER 504', heroLead:'Kho tri thức chung cho thông tin game, quản trị server, vận hành và phối hợp theo mùa.', searchKnowledge:'Tra cứu kho tri thức', sendSuggestionBtn:'Gửi góp ý', latest:'NỀN TẢNG HIỆN TẠI', wikiDescription:'Kiến thức game và tài liệu tra cứu thực tế cho người chơi Server 504. Cấu trúc danh mục đã sẵn sàng và các bài wiki chi tiết sẽ được bổ sung dần.'
  }
};

let currentLocale = localStorage.getItem('server504-locale') || 'en';
let searchIndex = [];

function t(key) {
  return (ui[currentLocale] && ui[currentLocale][key]) || ui.en[key] || key;
}

function applyUiLanguage() {
  document.documentElement.lang = currentLocale;
  languageSelect.value = currentLocale;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t(key)) el.textContent = t(key);
  });
}

function routeName() {
  return (location.hash.replace(/^#\//, '').split('?')[0] || 'home').split('/')[0];
}

function setActive(route) {
  document.querySelectorAll('[data-route]').forEach(a => a.classList.toggle('active', a.dataset.route === route));
}

function pageHeader(eyebrow, title, description, badges = []) {
  return `<header class="page-header">
    <div class="eyebrow">${eyebrow}</div>
    <h1>${title}</h1>
    <p>${description}</p>
    <div class="meta-row">${badges.map(x => `<span class="meta-chip">${x}</span>`).join('')}</div>
  </header>`;
}

function homePage() {
  return `<section class="page hero">
    <div class="eyebrow">${t('heroKicker')}</div>
    <h1>KNOWLEDGE.<br><span>GOVERNANCE.</span><br>OPERATIONS.</h1>
    <p>${t('heroLead')}</p>
    <div class="hero-actions">
      <button class="primary-button search-trigger" type="button">${t('searchKnowledge')}</button>
      <button class="secondary-button contribute-trigger" type="button">${t('sendSuggestionBtn')}</button>
    </div>
    <div class="portal-grid">
      <a class="portal-card" href="#/wiki"><small>01 · KNOWLEDGE</small><h3>${t('gameWiki')}</h3><p>Heroes, APC, combat, events, seasons and game mechanics.</p></a>
      <a class="portal-card" href="#/charter"><small>02 · GOVERNANCE</small><h3>${t('serverCharter')}</h3><p>Permanent cooperation principles and Council authority.</p></a>
      <a class="portal-card" href="#/codex"><small>03 · OPERATIONS</small><h3>${t('operationalCodex')}</h3><p>Practical rules for R4/R5 and real server incidents.</p></a>
      <a class="portal-card" href="#/season"><small>04 · SEASONAL</small><h3>${t('seasonalAnnex')}</h3><p>Current assignments, schedules, migration and diplomacy.</p></a>
    </div>
  </section>`;
}

function wikiPage() {
  const cards = [
    ['Getting Started', 'Beginner progression, base development and daily routines.', ['Beginner Guide','Base Development','Resources','Daily Routine']],
    ['Heroes', 'Hero roles, equipment and exclusive weapon systems.', ['Hero System','Hero Roles','Hero Equipment','Exclusive Weapons']],
    ['APC', 'APC systems, chips, formations and crafting.', ['APC System','APC Chips','Chip Factory','Formations']],
    ['Combat', 'Rallies, reinforcement, defense, troops and battle mechanics.', ['Rally','Reinforcement','Defense','Troops']],
    ['Events', 'Server and alliance events with practical participation guides.', ['Alliance Duel','Survival Preparedness','Supreme Capital','Armory']],
    ['Seasons', 'Season-specific mechanics, changes and references.', ['Season 1','Season 2','Season 3','Season 4']]
  ];
  return `<section class="page">
    ${pageHeader('DARK WAR: SURVIVAL · KNOWLEDGE BASE', t('gameWiki'), t('wikiDescription'), ['STRUCTURE V0','COMMUNITY MAINTAINED'])}
    <div class="wiki-grid">${cards.map(([name,desc,items]) => `<article class="wiki-card"><div class="eyebrow">WIKI</div><h3>${name}</h3><p>${desc}</p><ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul></article>`).join('')}</div>
  </section>`;
}

async function loadMarkdown(route) {
  const cfg = contentMap[route];
  const localePath = `content/${currentLocale}/${cfg.file}`;
  const fallbackPath = `content/en/${cfg.file}`;
  let text;
  let fallback = false;

  try {
    let res = await fetch(localePath, { cache: 'no-store' });
    if (!res.ok) {
      fallback = currentLocale !== 'en';
      res = await fetch(fallbackPath, { cache: 'no-store' });
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    text = await res.text();
  } catch (error) {
    return `<section class="page"><div class="error-box">Unable to load document: ${error.message}</div></section>`;
  }

  const localeBadge = fallback ? `ENGLISH SOURCE · ${currentLocale.toUpperCase()} TRANSLATION PENDING` : currentLocale.toUpperCase();
  return `<section class="page">
    ${pageHeader(cfg.eyebrow, cfg.title, cfg.description, ['VERSION 2','AUGUST 2026', localeBadge])}
    <article class="markdown-body">${marked.parse(text)}</article>
  </section>`;
}

async function render() {
  const route = routeName();
  setActive(route);
  sidebar.classList.remove('open');
  app.innerHTML = '<div class="page loading">Loading…</div>';

  if (route === 'home') app.innerHTML = homePage();
  else if (route === 'wiki') app.innerHTML = wikiPage();
  else if (contentMap[route]) app.innerHTML = await loadMarkdown(route);
  else app.innerHTML = `<section class="page">${pageHeader('404','Page not found','The requested Server 504 page does not exist.')}</section>`;

  bindDynamicTriggers();
  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function bindDynamicTriggers() {
  document.querySelectorAll('.search-trigger').forEach(btn => btn.onclick = openSearch);
  document.querySelectorAll('.contribute-trigger').forEach(btn => btn.onclick = () => contributeDialog.showModal());
}

async function buildSearchIndex() {
  const docs = [
    ['charter','Server Charter','charter.md'],
    ['codex','Operational Codex','operational-codex.md'],
    ['season','Seasonal Annex','seasonal-annex.md']
  ];
  const entries = [];

  for (const [route,label,file] of docs) {
    try {
      const res = await fetch(`content/en/${file}`);
      if (!res.ok) continue;
      const text = await res.text();
      const chunks = text.split(/\n(?=#{1,3} )/g);
      chunks.forEach(chunk => {
        const heading = (chunk.match(/^#{1,3}\s+(.+)$/m) || [])[1];
        if (!heading) return;
        const body = chunk.replace(/^#{1,3}\s+.+$/m,'').replace(/[*_>#|`]/g,' ').replace(/\s+/g,' ').trim();
        entries.push({ route, label, heading, body });
      });
    } catch (_) {}
  }

  ['Heroes','APC Chips','Chip Factory','Rally','Reinforcement','Alliance Duel','Survival Preparedness','Supreme Capital','Armory'].forEach(topic => {
    entries.push({ route:'wiki', label:'Game Wiki', heading:topic, body:'Dark War: Survival game knowledge topic. Detailed article is being prepared for Server 504.' });
  });
  searchIndex = entries;
}

function openSearch() {
  searchDialog.showModal();
  setTimeout(() => searchInput.focus(), 30);
  if (!searchInput.value) renderSearchResults('');
}

function renderSearchResults(query) {
  const q = query.trim().toLowerCase();
  const matches = q ? searchIndex.filter(x => `${x.heading} ${x.body} ${x.label}`.toLowerCase().includes(q)).slice(0, 14) : searchIndex.slice(0, 8);
  searchResults.innerHTML = matches.length ? matches.map(x => `<a class="search-result" href="#/${x.route}" data-search-link><small>${x.label.toUpperCase()}</small><strong>${x.heading}</strong><p>${x.body.slice(0,150)}${x.body.length>150?'…':''}</p></a>`).join('') : `<div class="empty-state">No matching results.</div>`;
  searchResults.querySelectorAll('[data-search-link]').forEach(a => a.addEventListener('click', () => searchDialog.close()));
}

searchInput.addEventListener('input', e => renderSearchResults(e.target.value));

document.querySelectorAll('[data-close-dialog]').forEach(btn => btn.addEventListener('click', () => document.getElementById(btn.dataset.closeDialog).close()));
document.querySelectorAll('.search-trigger').forEach(btn => btn.addEventListener('click', openSearch));
document.getElementById('contributeSidebar').addEventListener('click', () => contributeDialog.showModal());
document.getElementById('mobileContribute').addEventListener('click', () => contributeDialog.showModal());
document.getElementById('menuToggle').addEventListener('click', () => sidebar.classList.toggle('open'));

languageSelect.addEventListener('change', e => {
  currentLocale = e.target.value;
  localStorage.setItem('server504-locale', currentLocale);
  applyUiLanguage();
  render();
});

document.getElementById('contributeForm').addEventListener('submit', e => {
  e.preventDefault();
  const type = document.getElementById('contributionType').value;
  const title = document.getElementById('contributionTitle').value.trim();
  const details = document.getElementById('contributionDetails').value.trim();
  const identity = document.getElementById('contributionIdentity').value.trim();
  const currentPage = location.hash || '#/home';
  const issueTitle = `[${type}] ${title}`;
  const body = `## Contribution type\n${type}\n\n## Related page\n${currentPage}\n\n## Details\n${details}\n\n## Alliance / player\n${identity || 'Not provided'}\n\n## Language\n${currentLocale.toUpperCase()}\n`;
  const url = `https://github.com/${REPO}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(body)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});

window.addEventListener('hashchange', render);
window.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
  if (e.key === 'Escape') sidebar.classList.remove('open');
});

document.addEventListener('click', e => {
  if (window.innerWidth <= 760 && sidebar.classList.contains('open') && !sidebar.contains(e.target) && !document.getElementById('menuToggle').contains(e.target)) sidebar.classList.remove('open');
});

applyUiLanguage();
buildSearchIndex().then(() => renderSearchResults(''));
if (!location.hash) location.hash = '#/home';
else render();
