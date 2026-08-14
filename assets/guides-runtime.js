/* Server 504 Tips & Guides — separate from the factual Game Wiki */
(() => {
  const app = document.getElementById('app');
  const sidebar = document.getElementById('sidebar');
  const languageSelect = document.getElementById('languageSelect');
  if (!app) return;

  const DATA_URL = './content/guides.json';
  const UI = {
    en:{nav:'Tips & Guides',eyebrow:'DARK WAR: SURVIVAL · PRACTICAL ADVICE',title:'Tips & Guides',lead:'Practical builds, priorities and strategy. Guides are advice, not canonical game data.',guideCount:'guides',heroBuilds:'Hero Builds',heroBuildsDesc:'Gear and investment paths for combat heroes.',planned:'Planned',eventStrategy:'Event Strategy',resourcePlanning:'Resource Planning',combatTips:'Combat & Formation',sourcePolicy:'Guide source policy',sourcePolicyDesc:'Community guides are summarized and cross-checked. Official or current Server 504 evidence wins when a source conflicts with the live game.',openGuide:'OPEN GUIDE →',back:'← Tips & Guides',minimum:'Minimum practical target',target:'High-investment reference target',serverAdvice:'How to use this on Server 504',sourceNotes:'Source notes',source:'Community source',updated:'Reviewed',wikiProfile:'Open factual Wiki profile',notFound:'Guide not found',notFoundDesc:'The requested practical guide does not exist.',roadmap:'Guide roadmap',roadmapDesc:'More strategy categories can be added without mixing advice into the factual Wiki.'},
    fr:{nav:'Conseils & Guides',eyebrow:'DARK WAR: SURVIVAL · CONSEILS PRATIQUES',title:'Conseils & Guides',lead:'Builds, priorités et stratégies pratiques. Les guides sont des conseils, pas des données canoniques.',guideCount:'guides',heroBuilds:'Builds de héros',heroBuildsDesc:'Parcours d’équipement et d’investissement pour les héros de combat.',planned:'Prévu',eventStrategy:'Stratégie d’événements',resourcePlanning:'Planification des ressources',combatTips:'Combat & Formation',sourcePolicy:'Politique des sources',sourcePolicyDesc:'Les guides communautaires sont résumés et recoupés. Les sources officielles ou les preuves actuelles du Server 504 priment en cas de conflit.',openGuide:'OUVRIR LE GUIDE →',back:'← Conseils & Guides',minimum:'Objectif pratique minimum',target:'Objectif de référence à fort investissement',serverAdvice:'Comment l’utiliser sur Server 504',sourceNotes:'Notes sur la source',source:'Source communautaire',updated:'Vérifié',wikiProfile:'Ouvrir le profil factuel du Wiki',notFound:'Guide introuvable',notFoundDesc:'Le guide pratique demandé n’existe pas.',roadmap:'Feuille de route des guides',roadmapDesc:'D’autres catégories de stratégie peuvent être ajoutées sans mélanger les conseils au Wiki factuel.'},
    es:{nav:'Consejos y Guías',eyebrow:'DARK WAR: SURVIVAL · CONSEJOS PRÁCTICOS',title:'Consejos y Guías',lead:'Builds, prioridades y estrategia práctica. Las guías son consejos, no datos canónicos del juego.',guideCount:'guías',heroBuilds:'Builds de héroes',heroBuildsDesc:'Rutas de equipo e inversión para héroes de combate.',planned:'Planificado',eventStrategy:'Estrategia de eventos',resourcePlanning:'Planificación de recursos',combatTips:'Combate y Formación',sourcePolicy:'Política de fuentes',sourcePolicyDesc:'Las guías comunitarias se resumen y contrastan. La evidencia oficial o actual de Server 504 prevalece cuando existe conflicto.',openGuide:'ABRIR GUÍA →',back:'← Consejos y Guías',minimum:'Objetivo práctico mínimo',target:'Objetivo de referencia de alta inversión',serverAdvice:'Cómo usarlo en Server 504',sourceNotes:'Notas de fuente',source:'Fuente comunitaria',updated:'Revisado',wikiProfile:'Abrir perfil factual del Wiki',notFound:'Guía no encontrada',notFoundDesc:'La guía práctica solicitada no existe.',roadmap:'Hoja de ruta de guías',roadmapDesc:'Se pueden añadir más categorías de estrategia sin mezclar consejos con el Wiki factual.'},
    pt:{nav:'Dicas e Guias',eyebrow:'DARK WAR: SURVIVAL · ORIENTAÇÃO PRÁTICA',title:'Dicas e Guias',lead:'Builds, prioridades e estratégia prática. Guias são recomendações, não dados canônicos do jogo.',guideCount:'guias',heroBuilds:'Builds de Heróis',heroBuildsDesc:'Caminhos de equipamento e investimento para heróis de combate.',planned:'Planejado',eventStrategy:'Estratégia de Eventos',resourcePlanning:'Planejamento de Recursos',combatTips:'Combate e Formação',sourcePolicy:'Política de fontes',sourcePolicyDesc:'Guias da comunidade são resumidos e cruzados. Evidência oficial ou atual do Server 504 prevalece em caso de conflito.',openGuide:'ABRIR GUIA →',back:'← Dicas e Guias',minimum:'Alvo prático mínimo',target:'Alvo de referência de alto investimento',serverAdvice:'Como usar no Server 504',sourceNotes:'Notas da fonte',source:'Fonte da comunidade',updated:'Revisado',wikiProfile:'Abrir perfil factual do Wiki',notFound:'Guia não encontrado',notFoundDesc:'O guia prático solicitado não existe.',roadmap:'Roteiro de guias',roadmapDesc:'Mais categorias de estratégia podem ser adicionadas sem misturar recomendações ao Wiki factual.'},
    ko:{nav:'팁 & 가이드',eyebrow:'DARK WAR: SURVIVAL · 실전 가이드',title:'팁 & 가이드',lead:'실전 빌드, 투자 우선순위와 전략을 제공합니다. 가이드는 조언이며 게임의 확정 데이터가 아닙니다.',guideCount:'개 가이드',heroBuilds:'영웅 빌드',heroBuildsDesc:'전투 영웅의 장비 및 투자 경로.',planned:'예정',eventStrategy:'이벤트 전략',resourcePlanning:'자원 계획',combatTips:'전투 & 편성',sourcePolicy:'가이드 출처 정책',sourcePolicyDesc:'커뮤니티 가이드는 요약하고 교차 확인합니다. 충돌 시 공식 정보 또는 현재 Server 504 게임 내 증거가 우선합니다.',openGuide:'가이드 열기 →',back:'← 팁 & 가이드',minimum:'최소 실전 목표',target:'고투자 참고 목표',serverAdvice:'Server 504에서 활용하는 법',sourceNotes:'출처 메모',source:'커뮤니티 출처',updated:'검토일',wikiProfile:'사실 기반 Wiki 프로필 열기',notFound:'가이드를 찾을 수 없음',notFoundDesc:'요청한 실전 가이드가 없습니다.',roadmap:'가이드 로드맵',roadmapDesc:'사실 기반 Wiki와 조언을 섞지 않고 더 많은 전략 카테고리를 추가할 수 있습니다.'},
    vi:{nav:'Tips & Guides',eyebrow:'DARK WAR: SURVIVAL · HƯỚNG DẪN THỰC DỤNG',title:'Tips & Guides',lead:'Build, ưu tiên đầu tư và chiến thuật thực dụng. Guide là lời khuyên, không phải dữ liệu canonical của game.',guideCount:'guide',heroBuilds:'Hero Builds',heroBuildsDesc:'Lộ trình trang bị và đầu tư cho hero chiến đấu.',planned:'Dự kiến',eventStrategy:'Event Strategy',resourcePlanning:'Resource Planning',combatTips:'Combat & Formation',sourcePolicy:'Chính sách nguồn của Guide',sourcePolicyDesc:'Guide cộng đồng được tóm tắt và đối chiếu. Khi có xung đột, nguồn chính thức hoặc bằng chứng hiện tại từ Server 504 được ưu tiên.',openGuide:'MỞ GUIDE →',back:'← Tips & Guides',minimum:'Mốc thực dụng tối thiểu',target:'Mốc tham chiếu đầu tư cao',serverAdvice:'Cách áp dụng tại Server 504',sourceNotes:'Ghi chú nguồn',source:'Nguồn cộng đồng',updated:'Đối chiếu',wikiProfile:'Mở factual Wiki profile',notFound:'Không tìm thấy guide',notFoundDesc:'Guide thực dụng được yêu cầu không tồn tại.',roadmap:'Guide roadmap',roadmapDesc:'Có thể bổ sung thêm các nhóm strategy mà không trộn advice vào factual Wiki.'}
  };

  let dataPromise;
  let renderQueued = false;

  const parts = () => location.hash.replace(/^#\//,'').split('?')[0].split('/').filter(Boolean);
  const isGuideRoute = () => parts()[0] === 'guides';
  const locale = () => {
    const raw = (languageSelect?.value || document.documentElement.lang || localStorage.getItem('server504-locale') || 'en').toLowerCase();
    return UI[raw] ? raw : 'en';
  };
  const tx = key => UI[locale()]?.[key] || UI.en[key] || key;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));

  function loadData() {
    if (!dataPromise) dataPromise = fetch(DATA_URL,{cache:'no-store'}).then(r => {
      if (!r.ok) throw new Error(`Guide data HTTP ${r.status}`);
      return r.json();
    });
    return dataPromise;
  }

  function ensureNavigation() {
    if (!sidebar) return;
    let link = sidebar.querySelector('[data-guides-nav]');
    if (!link) {
      const wikiLink = sidebar.querySelector('[data-route="wiki"]');
      if (!wikiLink) return;
      link = document.createElement('a');
      link.href = '#/guides';
      link.dataset.route = 'guides';
      link.dataset.guidesNav = '1';
      wikiLink.insertAdjacentElement('afterend', link);
    }
    link.textContent = tx('nav');
    link.classList.toggle('active', isGuideRoute());
    if (isGuideRoute()) sidebar.querySelectorAll('[data-route]').forEach(item => {
      if (item !== link) item.classList.remove('active');
    });

    const quick = document.querySelector('.quick-access');
    if (quick && !quick.querySelector('[data-guides-quick]')) {
      const a = document.createElement('a');
      a.href = '#/guides';
      a.dataset.guidesQuick = '1';
      a.innerHTML = `<span>✦</span> ${esc(tx('nav'))}`;
      const wiki = quick.querySelector('a[href="#/wiki"]');
      wiki?.insertAdjacentElement('afterend', a);
    } else if (quick) {
      const a = quick.querySelector('[data-guides-quick]');
      if (a) a.innerHTML = `<span>✦</span> ${esc(tx('nav'))}`;
    }
  }

  function localGuide(g) {
    return g.locales?.[locale()] || g.locales?.en || {};
  }

  function rootPage(data) {
    const cards = data.guides.map(g => {
      const c = localGuide(g);
      return `<a class="guide-card" href="#/guides/${esc(g.slug)}">
        <div class="guide-card-top"><span>${esc(g.hero)}</span><small>${tx('heroBuilds')}</small></div>
        <h3>${esc(c.title || g.hero)}</h3>
        <p>${esc(c.summary || '')}</p>
        <div class="guide-card-foot"><span>${tx('openGuide')}</span><time>${esc(g.updated)}</time></div>
      </a>`;
    }).join('');
    return `<section class="page guides-page" data-guides-root="1">
      <header class="page-header guides-header">
        <div class="eyebrow">${tx('eyebrow')}</div>
        <h1>${tx('title')}</h1>
        <p>${tx('lead')}</p>
        <div class="meta-row"><span class="meta-chip">${data.guides.length} ${tx('guideCount')}</span><span class="meta-chip">SEASON 4 · SEALED ISLAND</span></div>
      </header>
      <section class="guide-policy"><strong>${tx('sourcePolicy')}</strong><span>${tx('sourcePolicyDesc')}</span></section>
      <section class="guide-category-block">
        <div class="guide-section-head"><div><small>01</small><h2>${tx('heroBuilds')}</h2><p>${tx('heroBuildsDesc')}</p></div><span>${data.guides.length} ${tx('guideCount')}</span></div>
        <div class="guide-grid">${cards}</div>
      </section>
      <section class="guide-roadmap">
        <div><small>${tx('roadmap')}</small><h2>${tx('roadmap')}</h2><p>${tx('roadmapDesc')}</p></div>
        <div class="guide-roadmap-tags"><span>${tx('eventStrategy')} · ${tx('planned')}</span><span>${tx('resourcePlanning')} · ${tx('planned')}</span><span>${tx('combatTips')} · ${tx('planned')}</span></div>
      </section>
    </section>`;
  }

  function guidePage(data, slug) {
    const g = data.guides.find(x => x.slug === slug);
    if (!g) return `<section class="page guides-page" data-guides-root="1"><header class="page-header"><div class="eyebrow">404</div><h1>${tx('notFound')}</h1><p>${tx('notFoundDesc')}</p></header><a class="guide-back" href="#/guides">${tx('back')}</a></section>`;
    const c = localGuide(g);
    const list = items => `<ul class="guide-build-list">${(items||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
    const advice = (c.advice||[]).map((x,i)=>`<li><span>${i+1}</span><p>${esc(x)}</p></li>`).join('');
    return `<section class="page guides-page guide-detail" data-guides-root="1">
      <a class="guide-back" href="#/guides">${tx('back')}</a>
      <header class="page-header guides-header">
        <div class="eyebrow">${tx('heroBuilds')} · ${esc(g.hero)}</div>
        <h1>${esc(c.title || g.hero)}</h1>
        <p>${esc(c.summary || '')}</p>
        <div class="meta-row"><span class="meta-chip">${tx('updated')}: ${esc(g.updated)}</span><span class="meta-chip">${tx('source')}: ${esc(g.sourceName)}</span></div>
      </header>
      <div class="guide-detail-grid">
        <section class="guide-build-panel"><small>01</small><h2>${tx('minimum')}</h2>${list(g.minimumBuild)}</section>
        <section class="guide-build-panel accent"><small>02</small><h2>${tx('target')}</h2>${list(g.targetBuild)}</section>
      </div>
      <section class="guide-advice"><small>03</small><h2>${tx('serverAdvice')}</h2><ol>${advice}</ol></section>
      <section class="guide-source-box"><div><small>04</small><h2>${tx('sourceNotes')}</h2><p>${esc(c.sourceNote || '')}</p></div><div class="guide-source-actions"><a href="${esc(g.sourceUrl)}" target="_blank" rel="noopener noreferrer">${tx('source')}: ${esc(g.sourceName)} ↗</a><a href="#/wiki/${esc(g.wikiSlug)}">${tx('wikiProfile')} →</a></div></section>
    </section>`;
  }

  async function renderGuides() {
    if (!isGuideRoute()) return;
    try {
      const data = await loadData();
      const slug = parts()[1] || '';
      app.innerHTML = slug ? guidePage(data, slug) : rootPage(data);
      document.body.dataset.route = 'guides';
      ensureNavigation();
      app.focus({preventScroll:true});
      window.scrollTo({top:0,behavior:'auto'});
      refreshSearch(data);
    } catch (error) {
      app.innerHTML = `<section class="page guides-page" data-guides-root="1"><div class="error-box">${esc(error.message)}</div></section>`;
    }
  }

  function scheduleRender(delay=0) {
    if (!isGuideRoute() || renderQueued) return;
    renderQueued = true;
    setTimeout(() => {
      renderQueued = false;
      if (!isGuideRoute()) return;
      if (!app.querySelector('[data-guides-root]')) renderGuides();
      ensureNavigation();
    }, delay);
  }

  function refreshSearch(data) {
    try {
      if (!Array.isArray(searchIndex)) return;
      for (let i = searchIndex.length - 1; i >= 0; i--) {
        if (String(searchIndex[i]?.route || '').startsWith('guides/')) searchIndex.splice(i,1);
      }
      data.guides.forEach(g => {
        const c = localGuide(g);
        searchIndex.push({
          route:`guides/${g.slug}`,
          label:tx('nav'),
          heading:c.title || g.hero,
          body:[c.summary,...(c.advice||[]),...(g.minimumBuild||[]),...(g.targetBuild||[])].join(' '),
          category:tx('nav'),
          aliases:[g.hero,'build','gear','guide']
        });
      });
    } catch (_) {}
  }

  window.Server504Guides = {
    refreshSearch: () => loadData().then(refreshSearch).catch(()=>{}),
    render: renderGuides
  };

  const observer = new MutationObserver(() => {
    ensureNavigation();
    if (isGuideRoute() && !app.querySelector('[data-guides-root]')) scheduleRender(0);
  });
  observer.observe(app,{childList:true,subtree:true});

  window.addEventListener('hashchange', () => {
    ensureNavigation();
    scheduleRender(0);
  });
  window.addEventListener('server504:localechange', () => {
    ensureNavigation();
    dataPromise = null;
    if (isGuideRoute()) {
      app.querySelector('[data-guides-root]')?.remove();
      scheduleRender(0);
    }
    window.Server504Guides.refreshSearch();
  });
  languageSelect?.addEventListener('change', () => setTimeout(() => {
    ensureNavigation();
    if (isGuideRoute()) {
      app.innerHTML = '';
      scheduleRender(0);
    }
  }, 0));

  ensureNavigation();
  loadData().then(refreshSearch).catch(()=>{});
  scheduleRender(20);
})();
