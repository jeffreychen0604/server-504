/* Server 504 — Featured Events grouped layout
 * Keeps LIVE NOW and COMING UP as distinct visual sections.
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

  const makeSectionHead = (state, label, count) => {
    const head = document.createElement('div');
    head.className = `featured-section-head ${state}`;
    head.innerHTML = '<div class="featured-section-title"><i aria-hidden="true"></i><strong></strong></div><small></small>';
    head.querySelector('strong').textContent = label;
    head.querySelector('small').textContent = `${count} ${count === 1 ? 'event' : 'events'}`;
    return head;
  };

  const makeGrid = (cards, className = '') => {
    const grid = document.createElement('div');
    grid.className = `featured-event-grid-v3${className ? ` ${className}` : ''}`;
    grid.dataset.cardCount = String(cards.length);
    cards.forEach(card => grid.appendChild(card));
    return grid;
  };

  const enhanceFeatured = () => {
    queued = false;
    const panel = app.querySelector('.fancy-home-v2 .featured-panel');
    if (!panel || panel.dataset.featuredLayoutGrouped === '1') return;

    const source = panel.querySelector('.featured-columns') || panel.querySelector('.featured-event-layout-v3');
    if (!source) return;

    const sourceLiveLabel = panel.querySelector('.featured-column-title.live')?.textContent?.trim();
    const sourceUpcomingLabel = panel.querySelector('.featured-column-title.upcoming')?.textContent?.trim();
    const cards = [...source.querySelectorAll('.event-card')];
    if (!cards.length) return;

    const liveCards = cards.filter(card => card.classList.contains('live') || card.dataset.featuredState === 'live');
    const upcomingCards = cards.filter(card => card.classList.contains('upcoming') || card.dataset.featuredState === 'upcoming');

    const liveLabel = sourceLiveLabel || liveCards[0]?.querySelector('.featured-state-badge b')?.textContent?.trim() || 'LIVE NOW';
    const upcomingLabel = sourceUpcomingLabel || upcomingCards[0]?.querySelector('.featured-state-badge b')?.textContent?.trim() || 'COMING UP';

    liveCards.forEach(card => prepareCard(card, 'live', liveLabel));
    upcomingCards.forEach(card => prepareCard(card, 'upcoming', upcomingLabel));

    const layout = document.createElement('div');
    layout.className = 'featured-event-layout-v3 featured-event-layout-grouped';

    if (liveCards.length) {
      const liveSection = document.createElement('section');
      liveSection.className = 'featured-event-section featured-live-section';
      liveSection.appendChild(makeSectionHead('live', liveLabel, liveCards.length));

      const hero = liveCards.find(card => {
        const title = card.querySelector('h3')?.textContent?.trim().toLowerCase() || '';
        const type = card.querySelector('.event-type')?.textContent?.trim().toLowerCase() || '';
        return title === 'summer paradise' || card.classList.contains('big-event-card') || type === 'big event';
      }) || null;

      if (hero) {
        hero.classList.add('featured-hero-event');
        liveSection.appendChild(hero);
      }

      const secondaryLive = liveCards.filter(card => card !== hero);
      if (secondaryLive.length) liveSection.appendChild(makeGrid(secondaryLive, 'featured-live-grid'));
      layout.appendChild(liveSection);
    }

    if (upcomingCards.length) {
      const upcomingSection = document.createElement('section');
      upcomingSection.className = 'featured-event-section featured-upcoming-section';
      upcomingSection.appendChild(makeSectionHead('upcoming', upcomingLabel, upcomingCards.length));
      upcomingSection.appendChild(makeGrid(upcomingCards, 'featured-upcoming-grid'));
      layout.appendChild(upcomingSection);
    }

    source.replaceWith(layout);
    panel.dataset.featuredLayoutGrouped = '1';
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
