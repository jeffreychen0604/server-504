/* Component details only. Keeps production routes, block order and data. */
(() => {
  const app = document.getElementById('app');
  const preview = document.body.classList.contains('s5-preview');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const revealed = new WeakSet();
  const activeAnimations = new Set();
  let activeWikiPanel = null;
  function play(element,keyframes,options) {
    if (reduced.matches || document.hidden || !element?.animate) return;
    const animation = element.animate(keyframes,options);
    activeAnimations.add(animation);
    animation.finished.then(() => activeAnimations.delete(animation),() => activeAnimations.delete(animation));
  }
  function animateComponents() {
    app.querySelectorAll('.dashboard-head,.page-header,.fancy-page-header,.status-strip,.dashboard-two-col,.shared-panel,.dashboard-bottom-grid,.wiki-category-tile').forEach((element,index) => {
      if (revealed.has(element)) return; revealed.add(element);
      play(element,[{opacity:.3,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,delay:Math.min(index*45,240),easing:'cubic-bezier(.2,.8,.25,1)'});
    });
    app.querySelectorAll('.cp-meter i').forEach((element,index) => {
      if(revealed.has(element))return;revealed.add(element);
      play(element,[{transform:'scaleX(.08)',transformOrigin:'right'},{transform:'scaleX(1)',transformOrigin:'right'}],{duration:650,delay:Math.min(index*25,160),easing:'cubic-bezier(.2,.8,.25,1)'});
    });
    const selected = app.querySelector('.wiki-browser-panel:not([hidden])');
    if (selected && selected !== activeWikiPanel) {
      activeWikiPanel = selected;
      play(selected,[{opacity:.45,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,easing:'ease-out'});
    }
  }
  reduced.addEventListener('change', () => { if (reduced.matches) for (const animation of activeAnimations) animation.cancel(); });
  const categorySymbols = { start:'scroll', 'combat-heroes':'battle', progression:'hourglass', 'apc-pets':'dashboard', 'alliance-state':'council', 'economy-tools':'atlas', season4:'scroll', all:'atlas' };
  const previewNote = {
    vi: 'Bản thử UI Season 5 · Form chỉ mô phỏng, không gửi dữ liệu thật.',
    en: 'Season 5 UI preview · Form simulation only; no data is sent.',
    fr: 'Aperçu UI Saison 5 · Simulation, aucune donnée envoyée.',
    es: 'Vista previa UI Temporada 5 · Simulación, no se envían datos.',
    pt: 'Prévia UI Temporada 5 · Simulação, nenhum dado é enviado.',
    ko: '시즌 5 UI 미리보기 · 폼은 시뮬레이션이며 데이터가 전송되지 않습니다.',
  };
  function decorate() {
    if (preview && !document.title.includes('UI Preview V3.2')) document.title = document.title.replace(/ · UI Preview V3(?:\.[12])?$/, '') + ' · UI Preview V3.2';
    const note = document.getElementById('feedbackNote');
    const locale = document.documentElement.lang;
    if (preview && note && note.textContent !== (previewNote[locale] || previewNote.en)) note.textContent = previewNote[locale] || previewNote.en;
    document.body.dataset.route = (location.hash.replace(/^#\//,'').split('/')[0] || 'home');
    // Decorative 9-slice frames never contain labels, data or pointer targets.
    document.querySelectorAll('.dashboard-head,.page-header,.fancy-page-header,.dashboard-panel,.wiki-category-tile,.wiki-browser-panel,.dialog').forEach(panel => {
      if (panel.querySelector(':scope > .s5-relic-frame')) return;
      const frame=document.createElement('span');frame.className='s5-relic-frame';
      frame.setAttribute('aria-hidden','true');panel.appendChild(frame);
    });
    app.querySelectorAll('.dashboard-head,.page-header,.fancy-page-header').forEach(head => {
      if (!head.querySelector('.s5-crest')) {
        const crest = document.createElement('img'); crest.className = 's5-crest';
        crest.src = 'assets/season-5/draft-v1/serpent-crest-128.png'; crest.alt = ''; crest.width = 72; crest.height = 72;
        crest.setAttribute('aria-hidden','true'); head.appendChild(crest);
      }
      if (!head.querySelector('.s5-crest-halo')) {
        const halo = document.createElement('span'); halo.className = 's5-crest-halo';
        halo.setAttribute('aria-hidden','true'); head.appendChild(halo);
      }
    });
    app.querySelectorAll('.panel-head,.wiki-overview-head,.wiki-browser-head').forEach((head,index) => {
      const sector = String(index + 1).padStart(2,'0');
      if (head.dataset.sector !== sector) head.dataset.sector = sector;
      if (head.matches('.panel-head')) {
        let medal=head.querySelector(':scope > .s5-sector-medallion');
        if (!medal) { medal=document.createElement('span');medal.className='s5-sector-medallion';medal.setAttribute('aria-hidden','true');head.prepend(medal); }
        if(medal.textContent!==sector)medal.textContent=sector;
      }
      if (head.closest('.shared-panel') && !head.querySelector('.s5-header-relic')) {
        const relic=document.createElement('img');relic.className='s5-header-relic';
        relic.src='assets/season-5/relic-ui/relic-header.webp';relic.alt='';relic.width=100;relic.height=33;relic.setAttribute('aria-hidden','true');head.appendChild(relic);
      }
    });
    app.querySelectorAll('.wiki-category-tile').forEach(tile => {
      if (tile.querySelector('.s5-category-icon')) return;
      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.classList.add('s5-category-icon'); svg.setAttribute('aria-hidden','true');
      const use = document.createElementNS('http://www.w3.org/2000/svg','use');
      use.setAttribute('href',`assets/season-5/ui-symbols.svg#${categorySymbols[tile.dataset.wikiCategoryButton] || 'atlas'}`);
      svg.appendChild(use); tile.appendChild(svg);
    });
    app.querySelectorAll('.alliance-table-panel tbody tr:not(.muted-row) td:first-child').forEach(cell => {
      if (cell.querySelector('.s5-rank-shield')) return;
      const shield = document.createElement('span'); shield.className = 's5-rank-shield';
      shield.textContent = cell.textContent; cell.textContent = ''; cell.appendChild(shield);
    });
    animateComponents();
  }
  let queued = false;
  const schedule = () => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; decorate(); }); };
  new MutationObserver(schedule).observe(app,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
  window.addEventListener('server504:localechange',schedule);
  window.addEventListener('hashchange',schedule);
  decorate();
})();
