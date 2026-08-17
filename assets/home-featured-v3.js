/* Server 504 — Featured Events V3
 * Reflows Featured Events around a live Big Event hero card and adds
 * high-contrast localized LIVE / UPCOMING state badges to every card.
 */
(() => {
  const app = document.getElementById('app');
  if (!app) return;

  let queued = false;

  const makeStateBadge = (state, label) => {
    const badge = document.createElement('span');
    badge.className = `featured-state-badge ${state}`;
    badge.dataset.eventState = state;
    badge.innerHTML = '<i aria-hidden="true"></i><b></b>';
    badge.querySelector('b').textContent = label;
    return badge;
  };

  const prepareCard = (card, state, label) => {
    card.classList.add(`featured-state-${state}`);
    card.dataset.featuredState = state;

    let kicker = card.querySelector(':scope > .featured-card-kicker');
    if (!kicker) {
      kicker = document.createElement('div');
      kicker.className = 'featured-card-kicker';
      card.prepend(kicker);
    }

    let badge = kicker.querySelector('.featured-state-badge');
    if (!badge) {
      badge = makeStateBadge(state, label);
      kicker.prepend(badge);
    } else {
      badge.className = `featured-state-badge ${state}`;
      badge.dataset.eventState = state;
      const copy = badge.querySelector('b');
      if (copy) copy.textContent = label;
    }

    const type = card.querySelector(':scope > .event-type');
    if (type) kicker.appendChild(type);
  };

  const enhanceFeatured = () => {
    queued = false;
    const panel = app.querySelector('.fancy-home-v2 .featured-panel');
    if (!panel || panel.dataset.featuredLayoutV3 === '1') return;

    const legacy = panel.querySelector('.featured-columns');
    if (!legacy) return;

    const liveLabel = panel.querySelector('.featured-column-title.live')?.textContent?.trim() || 'LIVE NOW';
    const upcomingLabel = panel.querySelector('.featured-column-title.upcoming')?.textContent?.trim() || 'COMING UP';
    const cards = [...legacy.querySelectorAll('.event-card')];
    if (!cards.length) return;

    const liveCards = cards.filter(card => card.classList.contains('live'));
    const upcomingCards = cards.filter(card => card.classList.contains('upcoming'));

    liveCards.forEach(card => prepareCard(card, 'live', liveLabel));
    upcomingCards.forEach(card => prepareCard(card, 'upcoming', upcomingLabel));

    const hero = liveCards.find(card => {
      const title = card.querySelector('h3')?.textContent?.trim().toLowerCase() || '';
      const type = card.querySelector('.event-type')?.textContent?.trim().toLowerCase() || '';
      return title === 'summer paradise' || card.classList.contains('big-event-card') || type === 'big event';
    }) || null;

    const layout = document.createElement('div');
    layout.className = `featured-event-layout-v3${hero ? ' has-hero' : ''}`;

    if (hero) {
      hero.classList.add('featured-hero-event');
      layout.appendChild(hero);
    }

    const gridCards = [
      ...liveCards.filter(card => card !== hero),
      ...upcomingCards
    ];

    if (gridCards.length) {
      const grid = document.createElement('div');
      grid.className = 'featured-event-grid-v3';
      grid.dataset.cardCount = String(gridCards.length);
      gridCards.forEach(card => grid.appendChild(card));
      layout.appendChild(grid);
    }

    legacy.replaceWith(layout);
    panel.dataset.featuredLayoutV3 = '1';
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(enhanceFeatured);
  };

  new MutationObserver(schedule).observe(app, { childList: true, subtree: true });
  window.addEventListener('hashchange', schedule);
  window.addEventListener('server504:localechange', schedule);
  schedule();
})();
