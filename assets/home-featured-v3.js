/* Server 504 — Featured Events grouped layout
 * LIVE NOW and COMING UP remain distinct sections.
 * Event timing is resolved from content/server-status.json so cards can move
 * from upcoming -> live and disappear after endAt without a manual status edit.
 */
(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const statusSource = './content/server-status.json';
  let queued = false;
  let processing = false;
  let schedulePromise = null;

  const normalizeName = value => String(value || '').trim().toLowerCase();

  const loadSchedule = () => {
    schedulePromise ||= fetch(statusSource, { cache: 'no-store' })
      .then(response => response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`)))
      .then(data => {
        const map = new Map();
        ['live', 'upcoming', 'archive'].forEach(group => {
          (data?.featuredEvents?.[group] || []).forEach(event => {
            const name = normalizeName(event?.name);
            if (!name) return;
            const startAt = event.startAt ? Date.parse(event.startAt) : null;
            const endAt = event.endAt ? Date.parse(event.endAt) : null;
            map.set(name, {
              startAt: Number.isFinite(startAt) ? startAt : null,
              endAt: Number.isFinite(endAt) ? endAt : null
            });
          });
        });
        return map;
      })
      .catch(error => {
        console.warn('Featured event schedule unavailable.', error);
        return new Map();
      });
    return schedulePromise;
  };

  const makeStateBadge = (state, label) => {
    const badge = document.createElement('span');
    badge.className = `featured-state-badge ${state}`;
    badge.dataset.eventState = state;
    badge.innerHTML = '<i aria-hidden="true"></i><b></b>';
    badge.querySelector('b').textContent = label;
    return badge;
  };

  const prepareCard = (card, state, label) => {
    card.classList.remove('featured-state-live', 'featured-state-upcoming', 'live', 'upcoming', 'featured-hero-event');
    card.classList.add(`featured-state-${state}`, state);
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

  const classifyCard = (card, schedule, now) => {
    const title = normalizeName(card.querySelector('h3')?.textContent);
    const timing = schedule.get(title);

    if (timing) {
      if (timing.endAt && now >= timing.endAt) return 'expired';
      if (timing.startAt && now < timing.startAt) return 'upcoming';
      if (timing.startAt || timing.endAt) return 'live';
    }

    if (card.classList.contains('upcoming') || card.dataset.featuredState === 'upcoming') return 'upcoming';
    return 'live';
  };

  const enhanceFeatured = () => {
    queued = false;
    if (processing) return;

    const panel = app.querySelector('.fancy-home-v2 .featured-panel');
    if (!panel) return;
    processing = true;

    const sourceLiveLabel = panel.querySelector('.featured-column-title.live')?.textContent?.trim()
      || panel.querySelector('.featured-section-head.live strong')?.textContent?.trim();
    const sourceUpcomingLabel = panel.querySelector('.featured-column-title.upcoming')?.textContent?.trim()
      || panel.querySelector('.featured-section-head.upcoming strong')?.textContent?.trim();

    loadSchedule().then(schedule => {
      if (!panel.isConnected) return;

      const liveLabel = sourceLiveLabel || 'LIVE NOW';
      const upcomingLabel = sourceUpcomingLabel || 'COMING UP';
      const now = Date.now();
      const liveCards = [];
      const upcomingCards = [];

      [...panel.querySelectorAll('.event-card')].forEach(card => {
        const state = classifyCard(card, schedule, now);
        if (state === 'expired') {
          card.remove();
          return;
        }
        prepareCard(card, state, state === 'live' ? liveLabel : upcomingLabel);
        (state === 'live' ? liveCards : upcomingCards).push(card);
      });

      const signature = [
        ...liveCards.map(card => `live:${normalizeName(card.querySelector('h3')?.textContent)}`),
        ...upcomingCards.map(card => `upcoming:${normalizeName(card.querySelector('h3')?.textContent)}`)
      ].join('|') || 'none';

      if (!liveCards.length && !upcomingCards.length) {
        panel.hidden = true;
        panel.dataset.featuredSignature = signature;
        return;
      }

      panel.hidden = false;
      if (panel.dataset.featuredSignature === signature && panel.querySelector('.featured-event-layout-grouped')) return;

      const layout = document.createElement('div');
      layout.className = 'featured-event-layout-v3 featured-event-layout-grouped';

      if (liveCards.length) {
        const liveSection = document.createElement('section');
        liveSection.className = 'featured-event-section featured-live-section';
        liveSection.appendChild(makeSectionHead('live', liveLabel, liveCards.length));

        const hero = liveCards.find(card => {
          const type = card.querySelector('.event-type')?.textContent?.trim().toLowerCase() || '';
          return card.classList.contains('big-event-card') || type === 'big event';
        }) || null;

        if (hero) {
          hero.classList.add('featured-hero-event');
          liveSection.appendChild(hero);
        }

        const standardLive = liveCards.filter(card => card !== hero);
        if (standardLive.length) liveSection.appendChild(makeGrid(standardLive, 'featured-live-grid'));
        layout.appendChild(liveSection);
      }

      if (upcomingCards.length) {
        const upcomingSection = document.createElement('section');
        upcomingSection.className = 'featured-event-section featured-upcoming-section';
        upcomingSection.appendChild(makeSectionHead('upcoming', upcomingLabel, upcomingCards.length));
        upcomingSection.appendChild(makeGrid(upcomingCards, 'featured-upcoming-grid'));
        layout.appendChild(upcomingSection);
      }

      const source = panel.querySelector('.featured-event-layout-v3') || panel.querySelector('.featured-columns');
      if (source) source.replaceWith(layout);
      else panel.appendChild(layout);

      panel.dataset.featuredSignature = signature;
      panel.dataset.featuredLayoutGrouped = '1';
      panel.dataset.featuredLayoutV3 = '1';
    }).finally(() => {
      processing = false;
    });
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(enhanceFeatured);
  };

  new MutationObserver(schedule).observe(app, { childList: true, subtree: true });
  window.addEventListener('hashchange', schedule);
  window.addEventListener('server504:localechange', schedule);
  window.setInterval(schedule, 60 * 1000);
  schedule();
})();
