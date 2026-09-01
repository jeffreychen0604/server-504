/* Server 504 — lightweight site-wide sakura ambient runtime */
(() => {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  if (document.querySelector('.seasonal-sakura')) return;

  const layer = document.createElement('div');
  layer.className = 'seasonal-sakura';
  layer.setAttribute('aria-hidden', 'true');

  const petals = [
    ['4%',  '8px',  '18s', '-3s',   '118px', '620deg', '.48'],
    ['10%', '10px', '15s', '-11s',  '92px',  '520deg', '.54'],
    ['17%', '7px',  '20s', '-7s',   '136px', '680deg', '.42'],
    ['24%', '11px', '17s', '-14s',  '76px',  '560deg', '.58'],
    ['31%', '8px',  '19s', '-9s',   '104px', '720deg', '.48'],
    ['38%', '12px', '16s', '-4s',   '128px', '600deg', '.56'],
    ['45%', '7px',  '21s', '-16s',  '84px',  '760deg', '.40'],
    ['52%', '9px',  '18s', '-12s',  '112px', '640deg', '.52'],
    ['59%', '11px', '15s', '-6s',   '72px',  '540deg', '.58'],
    ['65%', '8px',  '20s', '-18s',  '130px', '700deg', '.46'],
    ['71%', '12px', '17s', '-2s',   '98px',  '580deg', '.60'],
    ['77%', '7px',  '22s', '-13s',  '146px', '780deg', '.40'],
    ['82%', '10px', '16s', '-8s',   '86px',  '560deg', '.56'],
    ['87%', '8px',  '19s', '-15s',  '120px', '680deg', '.46'],
    ['92%', '11px', '17s', '-5s',   '74px',  '520deg', '.58'],
    ['96%', '7px',  '21s', '-17s',  '102px', '740deg', '.40'],
    ['56%', '6px',  '23s', '-20s',  '152px', '820deg', '.36'],
    ['14%', '6px',  '24s', '-19s',  '144px', '800deg', '.36']
  ];

  petals.forEach(([left, size, duration, delay, drift, spin, opacity]) => {
    const petal = document.createElement('span');
    petal.className = 'sakura-petal';
    petal.style.setProperty('--left', left);
    petal.style.setProperty('--size', size);
    petal.style.setProperty('--duration', duration);
    petal.style.setProperty('--delay', delay);
    petal.style.setProperty('--drift', drift);
    petal.style.setProperty('--spin', spin);
    petal.style.setProperty('--petal-opacity', opacity);
    layer.appendChild(petal);
  });

  document.body.appendChild(layer);
})();
