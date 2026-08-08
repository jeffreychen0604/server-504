const REPO = 'jeffreychen0604/server-504';

const app = document.getElementById('app');
const sidebar = document.getElementById('sidebar');
const languageSelect = document.getElementById('languageSelect');
const searchDialog = document.getElementById('searchDialog');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const contributeDialog = document.getElementById('contributeDialog');
const i18n = window.Server504I18N;

const contentMap = {
  charter: { file: 'charter.md', titleKey: 'charterTitle', eyebrowKey: 'charterEyebrow', descriptionKey: 'charterDescription' },
  codex: { file: 'operational-codex.md', titleKey: 'codexTitle', eyebrowKey: 'codexEyebrow', descriptionKey: 'codexDescription' }
};

const supportedLocales = i18n?.supported || ['en','fr','es','pt','ko','vi'];
let currentLocale = localStorage.getItem('server504-locale') || 'en';
if (!supportedLocales.includes(currentLocale)) currentLocale = 'en';
let searchIndex = [];

function t(key) {
  return i18n?.t(key, currentLocale) || key;
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

function applyUiLanguage() {
  document.documentElement.lang = currentLocale;
  languageSelect.value = currentLocale;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });

  const headerSearchInput = document.getElementById('headerSearchInput');
  if (headerSearchInput) headerSearchInput.placeholder = t('searchPlaceholder');
  if (searchInput) searchInput.placeholder = t('searchPlaceholder');

  const details = document.getElementById('contributionDetails');
  if (details) details.placeholder = t('detailsPlaceholder');
  const contact = document.getElementById('contributionContact');
  if (contact) contact.placeholder = t('contactPlaceholder');

  const contactLabel = contact?.closest('label')?.querySelector('span');
  if (contactLabel) contactLabel.textContent = t('contactOptional');

  const contributionType = document.getElementById('contributionType');
  if (contributionType) {
    const types = [
      ['Game Wiki correction','contributionWikiCorrection'],
      ['New Wiki information','contributionWikiNew'],
      ['Charter proposal','contributionCharter'],
      ['Operational Codex proposal','contributionCodex'],
      ['Translation correction','contributionTranslation'],
      ['Server operation suggestion','contributionServerOps'],
      ['Other','contributionOther']
    ];
    [...contributionType.options].forEach((option, index) => {
      const item = types[index];
      if (!item) return;
      option.value = item[0];
      option.textContent = t(item[1]);
    });
  }

  document.title = `Server 504 | Dark War: Survival`;
}

function routeName() {
  return (location.hash.replace(/^#\//, '').split('?')[0] || 'home').split('/')[0];
}

function setActive(route) {
  document.querySelectorAll('[data-route]').forEach(a => a.classList.toggle('active', a.dataset.route === route));
  document.body.dataset.route = route;
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
  return `<section class="page sealed-isle-home">
    <div class="sealed-atmosphere" aria-hidden="true">
      <div class="blood-moon"><span></span></div>
      <div class="seal-sigil"><i></i><b></b></div>
      <div class="island-silhouette"></div>
      <div class="torii"><span class="torii-top"></span><span class="torii-mid"></span><span class="torii-leg torii-leg-left"></span><span class="torii-leg torii-leg-right"></span></div>
      <div class="miasma miasma-one"></div><div class="miasma miasma-two"></div><div class="ember-field"></div>
    </div>

    <div class="hero-grid">
      <div class="hero-copy">
        <div class="season-chip"><span></span> ${t('seasonLabel')}</div>
        <div class="eyebrow">${t('heroKicker')}</div>
        <h1 class="hero-title"><span class="hero-title-word">SERVER</span><strong>504</strong></h1>
        <div class="hero-motto">${t('heroMotto').split(' · ').map((item, index) => `${index ? '<i>·</i> ' : ''}${item}`).join('')}</div>
        <p class="hero-lead">${t('heroLead')}</p>

        <div class="hero-actions">
          <button class="primary-button search-trigger home-search-button" type="button"><span class="search-rune" aria-hidden="true"></span><span>${t('searchKnowledge')}</span><kbd>/</kbd></button>
          <button class="secondary-button contribute-trigger" type="button">${t('sendSuggestionBtn')}</button>
        </div>
      </div>

      <aside class="field-terminal" aria-label="Server 504 portal shortcuts">
        <div class="terminal-corners" aria-hidden="true"></div>
        <div class="terminal-head"><span>${t('archiveNode')}</span><i></i></div>
        <div class="terminal-emblem" aria-hidden="true"><span>五</span><b>504</b></div>
        <div class="terminal-rule"></div>
        <a href="#/wiki"><span>01</span><strong>${t('gameWiki')}</strong><i>↗</i></a>
        <a href="#/charter"><span>02</span><strong>${t('serverCharter')}</strong><i>↗</i></a>
        <a href="#/codex"><span>03</span><strong>${t('operationalCodex')}</strong><i>↗</i></a>
        <div class="terminal-foot"><span class="status-dot"></span> ${t('governanceStatus')}</div>
      </aside>
    </div>

    <div class="portal-grid home-portal-grid">
      <a class="portal-card portal-wiki" href="#/wiki">
        <div class="portal-glyph glyph-wiki" aria-hidden="true"><span></span><span></span><span></span></div>
        <small>${t('portalKnowledgeLabel')}</small><h3>${t('gameWiki')}</h3><p>${t('portalKnowledgeDesc')}</p><b class="portal-arrow">↗</b>
      </a>
      <a class="portal-card portal-charter" href="#/charter">
        <div class="portal-glyph glyph-charter" aria-hidden="true"><span></span></div>
        <small>${t('portalGovernanceLabel')}</small><h3>${t('serverCharter')}</h3><p>${t('portalGovernanceDesc')}</p><b class="portal-arrow">↗</b>
      </a>
      <a class="portal-card portal-codex" href="#/codex">
        <div class="portal-glyph glyph-codex" aria-hidden="true"><span></span></div>
        <small>${t('portalOperationsLabel')}</small><h3>${t('operationalCodex')}</h3><p>${t('portalOperationsDesc')}</p><b class="portal-arrow">↗</b>
      </a>
    </div>
  </section>`;
}

function wikiPage() {
  return `<section class="page"><div class="loading">${t('loading')}</div></section>`;
}

async function fetchLocalizedDocument(file) {
  const localePath = `content/${currentLocale}/${file}`;
  const fallbackPath = `content/en/${file}`;
  let fallback = false;
  let res = await fetch(localePath, { cache: 'no-store' });
  if (!res.ok) {
    fallback = currentLocale !== 'en';
    res = await fetch(fallbackPath, { cache: 'no-store' });
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return { text: await res.text(), fallback };
}

async function loadMarkdown(route) {
  const cfg = contentMap[route];
  try {
    const { text, fallback } = await fetchLocalizedDocument(cfg.file);
    const localeBadge = fallback ? `${t('englishSource')} · ${currentLocale.toUpperCase()} ${t('translationPending')}` : currentLocale.toUpperCase();
    return `<section class="page">
      ${pageHeader(t(cfg.eyebrowKey), t(cfg.titleKey), t(cfg.descriptionKey), [t('version2'), t('august2026'), localeBadge])}
      <article class="markdown-body">${marked.parse(text)}</article>
    </section>`;
  } catch (error) {
    return `<section class="page"><div class="error-box">${t('unableDocument')}: ${error.message}</div></section>`;
  }
}

async function render() {
  const route = routeName();
  setActive(route);
  sidebar.classList.remove('open');
  app.innerHTML = `<div class="page loading">${t('loading')}</div>`;

  if (route === 'home') app.innerHTML = homePage();
  else if (route === 'wiki') app.innerHTML = wikiPage();
  else if (contentMap[route]) app.innerHTML = await loadMarkdown(route);
  else app.innerHTML = `<section class="page">${pageHeader('404', t('pageNotFound'), t('pageNotFoundDesc'))}</section>`;

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
    ['charter', t('serverCharter'), 'charter.md'],
    ['codex', t('operationalCodex'), 'operational-codex.md']
  ];
  const entries = [];

  for (const [route, label, file] of docs) {
    try {
      const { text } = await fetchLocalizedDocument(file);
      text.split(/\n(?=#{1,3} )/g).forEach(chunk => {
        const headingMatch = chunk.match(/^#{1,3}\s+(.+)/);
        if (!headingMatch) return;
        const heading = headingMatch[1].trim();
        const body = chunk.replace(/^#{1,3}\s+.+/, '').replace(/\s+/g, ' ').trim();
        entries.push({ route, label, heading, body, category: t('governanceOperations') });
      });
    } catch (_) {}
  }

  searchIndex = entries;
}

function openSearch() {
  searchDialog.showModal();
  setTimeout(() => searchInput.focus(), 30);
  renderSearchResults(searchInput.value || '');
}

function renderSearchResults(query) {
  const q = query.trim().toLowerCase();
  const matches = q ? searchIndex.filter(x => `${x.heading} ${x.body} ${x.label}`.toLowerCase().includes(q)).slice(0, 14) : searchIndex.slice(0, 8);
  searchResults.innerHTML = matches.length
    ? matches.map(x => `<a class="search-result" href="#/${x.route}" data-search-link><small>${x.label.toUpperCase()}</small><strong>${x.heading}</strong><p>${x.body.slice(0,150)}${x.body.length > 150 ? '…' : ''}</p></a>`).join('')
    : `<div class="empty-state">${t('searchNoResults')}</div>`;
  searchResults.querySelectorAll('[data-search-link]').forEach(a => a.addEventListener('click', () => searchDialog.close()));
}

function openContribute() {
  contributeDialog.showModal();
}

window.addEventListener('hashchange', render);

languageSelect.addEventListener('change', async () => {
  currentLocale = languageSelect.value;
  localStorage.setItem('server504-locale', currentLocale);
  applyUiLanguage();
  await buildSearchIndex();
  await render();
  window.dispatchEvent(new CustomEvent('server504:localechange', { detail: { locale: currentLocale } }));
});

searchInput.addEventListener('input', e => renderSearchResults(e.target.value));
document.querySelectorAll('.search-trigger').forEach(btn => btn.addEventListener('click', openSearch));
document.getElementById('contributeSidebar').addEventListener('click', openContribute);
document.getElementById('mobileContribute').addEventListener('click', openContribute);
document.getElementById('menuToggle').addEventListener('click', () => sidebar.classList.toggle('open'));

document.querySelectorAll('[data-close-dialog]').forEach(btn => btn.addEventListener('click', () => document.getElementById(btn.dataset.closeDialog)?.close()));

document.addEventListener('keydown', e => {
  if (e.key === '/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) {
    e.preventDefault();
    openSearch();
  }
});

const feedbackApiConfigured = Boolean((window.SERVER504_CONFIG?.feedbackApi || '').trim());
if (!feedbackApiConfigured) {
  document.getElementById('contributeForm').addEventListener('submit', e => {
    e.preventDefault();
    const type = document.getElementById('contributionType').value;
    const title = document.getElementById('contributionTitle').value.trim();
    const details = document.getElementById('contributionDetails').value.trim();
    const identity = document.getElementById('contributionIdentity').value.trim();
    const currentPage = location.hash || '#/home';
    const issueTitle = `[${type}] ${title}`;
    const issueBody = [
      `**Type:** ${type}`,
      `**Language:** ${currentLocale.toUpperCase()}`,
      `**Related page:** ${currentPage}`,
      identity ? `**Alliance / Player:** ${identity}` : '',
      '', '## Suggestion', details
    ].filter(Boolean).join('\n');
    window.open(`https://github.com/${REPO}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`, '_blank', 'noopener,noreferrer');
    contributeDialog.close();
  });
}

applyUiLanguage();
buildSearchIndex().then(() => render());
