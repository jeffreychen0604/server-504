/* Viewport-wide sandstorm: one canvas, capped RAF, no pointer hit testing. */
(() => {
  if (window.Server504Sandstorm) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 760px)');
  const key = document.body.classList.contains('s5-preview') ? 'server504-preview-sandstorm' : 'server504-sandstorm';
  let requested = true;
  try { requested = localStorage.getItem(key) !== 'off'; } catch (_) {}
  const layer = document.createElement('div'); layer.className = 's5-sandstorm'; layer.setAttribute('aria-hidden','true');
  const canvas = document.createElement('canvas');
  const veil = document.createElement('span'); veil.className = 's5-dust-veil';
  const far = document.createElement('span'); far.className = 's5-dust-veil far';
  layer.append(canvas,veil,far); document.body.prepend(layer);
  const control = document.createElement('button'); control.type = 'button'; control.className = 's5-weather';
  control.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 8h13c5 0 5-6 1-6-2 0-3 1-3 2M2 12h18M2 16h11c5 0 5 6 1 6-2 0-3-1-3-2"/></svg><span></span><b></b>';
  document.querySelector('.sidebar-foot').appendChild(control);
  const copy = {
    vi:['GIÓ CÁT','BẬT','TẮT','Bật hoặc tắt hiệu ứng bão cát','Đã tắt chuyển động'],
    en:['SANDSTORM','ON','OFF','Toggle sandstorm effects','Motion disabled'],
    fr:['VENT DE SABLE','ON','OFF','Activer ou désactiver le vent de sable','Mouvement désactivé'],
    es:['VIENTO DE ARENA','ON','OFF','Activar o desactivar el viento de arena','Movimiento desactivado'],
    pt:['VENTO DE AREIA','ON','OFF','Ativar ou desativar o vento de areia','Movimento desativado'],
    ko:['모래바람','ON','OFF','모래바람 효과 켜기 또는 끄기','모션 비활성화'],
  };
  let seed = 50405;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed-1)/2147483646; };
  // Bake an irregular dust bank once; moving cached stamps needs no live blur/filter.
  const dust = document.createElement('canvas'); dust.width=384; dust.height=192;
  const dustContext=dust.getContext('2d');
  if(dustContext) {
    for(let i=0;i<54;i++) {
      const x=45+random()*294,y=56+random()*80,r=22+random()*39;
      const cloud=dustContext.createRadialGradient(x,y,0,x,y,r);
      cloud.addColorStop(0,'rgba(193,143,76,.15)');
      cloud.addColorStop(.45,'rgba(202,152,85,.08)');cloud.addColorStop(1,'rgba(202,152,85,0)');
      dustContext.fillStyle=cloud;dustContext.fillRect(x-r,y-r,r*2,r*2);
    }
  }
  function makeSurface(element) {
    const context = element.getContext('2d', { alpha:true });
    if (!context) return null;
    return {element,context,width:0,height:0,particles:[],clouds:[]};
  }
  const background = makeSurface(canvas);
  let frame = 0, frameCount = 0, last = 0, running = false;
  function size(surface) {
    if (!surface) return;
    const box = surface.element.getBoundingClientRect();
    const width = Math.max(1,Math.round(box.width)), height = Math.max(1,Math.round(box.height));
    const dpr = Math.min(devicePixelRatio || 1,compact.matches ? 1 : 1.25);
    if (surface.width === width && surface.height === height && surface.dpr === dpr) return;
    surface.width = width; surface.height = height; surface.dpr = dpr;
    surface.element.width = Math.round(width*dpr); surface.element.height = Math.round(height*dpr);
    surface.context.setTransform(dpr,0,0,dpr,0,0);
    const count = compact.matches ? 300 : 780;
    surface.particles = Array.from({length:count}, () => ({x:random()*width,y:random()*height,depth:random(),speed:100+random()*240,phase:random()*Math.PI*2}));
    surface.clouds = Array.from({length:compact.matches?6:11}, () => ({x:random()*width,y:random()*height,span:width*(.65+random()*.65),depth:.5+random()*.5,phase:random()*Math.PI*2}));
  }
  const observer = new ResizeObserver(() => { size(background); });
  observer.observe(layer);
  function clear(surface) { if (surface) surface.context.clearRect(0,0,surface.width,surface.height); }
  function draw(surface,delta,time) {
    if (!surface) return;
    const {context:ctx,width,height} = surface;
    ctx.clearRect(0,0,width,height);
    const surge = .5+.5*Math.sin(time*.00065 + .7*Math.sin(time*.00018));
    const gust = .9 + surge*.95;
    // Broad dust banks roll across the full screen at different depths.
    ctx.fillStyle='rgba(168,116,55,'+(.045+surge*.035).toFixed(3)+')';
    ctx.fillRect(0,0,width,height);
    for(const cloud of surface.clouds) {
      cloud.x += delta*(45+cloud.depth*85)*gust;
      if(cloud.x-cloud.span*.5>width) {cloud.x=-cloud.span*.5;cloud.y=random()*height;}
      const tall=Math.max(height*.34,cloud.span*.4);
      const y=cloud.y+Math.sin(time*.00055+cloud.phase)*height*.09;
      ctx.globalAlpha=(.28+cloud.depth*.26)*( .7+surge*.3 );
      ctx.drawImage(dust,cloud.x-cloud.span*.5,y-tall*.5,cloud.span,tall);
    }
    ctx.globalAlpha=1;
    for (const p of surface.particles) {
      const velocity = p.speed*(.5+p.depth)*gust;
      p.x += delta*velocity; p.y -= delta*(velocity*.16 + Math.sin(time*.002+p.phase)*(12+surge*20));
      if(p.x>width+25) { p.x=-25; p.y=random()*height; }
      if(p.y < -10) p.y=height+10;
      const ink = 'rgba(228,182,112,' + (.18+p.depth*.4).toFixed(3) + ')';
      if (p.depth>.6) {
        ctx.strokeStyle=ink;ctx.lineWidth=.4+p.depth*.8;ctx.beginPath();ctx.moveTo(p.x,p.y);
        ctx.lineTo(p.x+2+p.depth*9*gust,p.y-(2+p.depth*9*gust)*.16);ctx.stroke();
      } else {
        ctx.fillStyle=ink;ctx.beginPath();ctx.arc(p.x,p.y,.45+p.depth*.85,0,Math.PI*2);ctx.fill();
      }
    }
    {
      const sweep = ((time*.000025)%1)*1.8-.4;
      const haze = ctx.createLinearGradient(width*sweep,height,width*(sweep+.35),0);
      haze.addColorStop(0,'rgba(206,146,60,0)'); haze.addColorStop(.5,'rgba(218,166,88,.09)'); haze.addColorStop(1,'rgba(206,146,60,0)');
      ctx.fillStyle=haze; ctx.fillRect(0,0,width,height);
      // Wide, feathered dust ribbons read as sand gusts rather than rain streaks.
      for(let i=0;i<3;i++) {
        const y=height*(.15+i*.34)+Math.sin(time*.00055+i*2)*height*.14;
        const band=ctx.createLinearGradient(0,y-height*.11,0,y+height*.15);
        band.addColorStop(0,'rgba(222,169,91,0)');band.addColorStop(.45,'rgba(222,169,91,.11)');band.addColorStop(1,'rgba(222,169,91,0)');
        ctx.fillStyle=band;ctx.beginPath();ctx.moveTo(-width*.1,y);
        ctx.bezierCurveTo(width*.5,y-height*.3,width*.7,y+height*.1,width*1.1,y-height*.2);
        ctx.lineTo(width*1.1,y+height*.1);ctx.bezierCurveTo(width*.7,y+height*.4,width*.5,y-height*.1,-width*.1,y+height*.2);ctx.closePath();ctx.fill();
      }
    }
  }
  function tick(time) {
    if (!running) return;
    if (!last || time-last >= 1000/30) {
      const delta = Math.min(.06,last ? (time-last)/1000 : 1/30); last=time; frameCount++;
      draw(background,delta,time);
    }
    frame=requestAnimationFrame(tick);
  }
  function sync() {
    const active = requested && !reduced.matches && !document.hidden && !document.querySelector('dialog[open]');
    document.body.dataset.sandActive=String(active);
    if (active && background) {
      size(background);
      if (!running) { running=true;last=0;frame=requestAnimationFrame(tick); }
    } else { running=false;cancelAnimationFrame(frame);frame=0;clear(background); }
    const c=copy[document.documentElement.lang] || copy.en;
    control.querySelector('span').textContent=c[0];control.querySelector('b').textContent=requested&&!reduced.matches?c[1]:c[2];
    control.disabled=reduced.matches;control.setAttribute('aria-pressed',String(requested&&!reduced.matches));
    control.setAttribute('aria-label',reduced.matches?c[4]:c[3]);control.title=reduced.matches?c[4]:c[3];
  }
  control.addEventListener('click', () => { requested=!requested;try{localStorage.setItem(key,requested?'on':'off');}catch(_){}sync(); });
  reduced.addEventListener('change',sync);
  compact.addEventListener('change', () => {size(background);sync();});
  document.addEventListener('visibilitychange',sync);
  document.querySelectorAll('dialog').forEach(dialog => new MutationObserver(sync).observe(dialog,{attributes:true,attributeFilter:['open']}));
  window.addEventListener('server504:localechange',sync);
  window.addEventListener('pagehide', () => {running=false;cancelAnimationFrame(frame);});
  window.addEventListener('pageshow',sync);
  window.Server504Sandstorm = { getState: () => ({requested,running,reduced:reduced.matches,hidden:document.hidden,dialogOpen:!!document.querySelector('dialog[open]'),frameCount,coverage:'viewport',intensity:'storm',backgroundParticles:background?.particles.length||0,dustBanks:background?.clouds.length||0,heroParticles:0,canvasCount:document.querySelectorAll('.s5-sandstorm canvas').length,dpr:background?.dpr||0}) };
  size(background);sync();
})();
