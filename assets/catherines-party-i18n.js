/* Localized presentation for Catherine's Party. Official in-game names remain unchanged. */
(() => {
  const translations = {
    en: {
      type: 'Big Event',
      description: "A balloon-shooting party event featuring Catherine's Party, Catherine's Gift and Puzzle Battle. In the main activity, players shoot balloons across layers to find the hidden jackpot and earn layer prizes.",
      duration: 'Aug 21, 2026 00:00 – Aug 28, 2026 00:00 (UTC+7)',
      rewards: 'Jackpot rewards · Layer Prize rewards · Catherine event rewards'
    },
    fr: {
      type: 'Événement majeur',
      description: "Un événement de tir sur ballons comprenant Catherine's Party, Catherine's Gift et Puzzle Battle. Dans l'activité principale, les joueurs tirent sur les ballons étage après étage pour trouver le jackpot caché et obtenir les récompenses de niveau.",
      duration: '21 août 2026 00:00 – 28 août 2026 00:00 (UTC+7)',
      rewards: 'Récompenses du jackpot · Récompenses de niveau · Récompenses de l’événement Catherine'
    },
    es: {
      type: 'Gran evento',
      description: "Evento de disparos a globos con Catherine's Party, Catherine's Gift y Puzzle Battle. En la actividad principal, los jugadores disparan a los globos por capas para encontrar el jackpot oculto y conseguir premios de capa.",
      duration: '21 ago 2026 00:00 – 28 ago 2026 00:00 (UTC+7)',
      rewards: 'Recompensas del jackpot · Premios de capa · Recompensas del evento Catherine'
    },
    pt: {
      type: 'Grande evento',
      description: "Evento de tiro em balões com Catherine's Party, Catherine's Gift e Puzzle Battle. Na atividade principal, os jogadores atiram nos balões por camadas para encontrar o jackpot escondido e receber prêmios de camada.",
      duration: '21 ago 2026 00:00 – 28 ago 2026 00:00 (UTC+7)',
      rewards: 'Recompensas do jackpot · Prêmios de camada · Recompensas do evento Catherine'
    },
    ko: {
      type: '대형 이벤트',
      description: "Catherine's Party, Catherine's Gift, Puzzle Battle로 구성된 풍선 사격 이벤트입니다. 메인 활동에서는 층별로 풍선을 쏘아 숨겨진 잭팟을 찾고 Layer Prize를 획득합니다.",
      duration: '2026년 8월 21일 00:00 – 8월 28일 00:00 (UTC+7)',
      rewards: '잭팟 보상 · Layer Prize 보상 · Catherine 이벤트 보상'
    },
    vi: {
      type: 'Sự kiện lớn',
      description: "Sự kiện bắn bóng gồm Catherine's Party, Catherine's Gift và Puzzle Battle. Ở hoạt động chính, người chơi bắn các quả bóng theo từng layer để tìm jackpot đang được giấu và nhận Layer Prize.",
      duration: '21/08/2026 00:00 – 28/08/2026 00:00 (UTC+7)',
      rewards: 'Phần thưởng Jackpot · Layer Prize · Phần thưởng sự kiện Catherine'
    }
  };

  const app = document.getElementById('app');
  if (!app) return;
  let queued = false;

  const locale = () => {
    const value = window.Server504I18N?.locale?.() || localStorage.getItem('server504-locale') || 'en';
    return translations[value] ? value : 'en';
  };

  const setTrailingText = (container, value) => {
    if (!container) return;
    const strong = container.querySelector('strong');
    if (!strong) return;
    let node = strong.nextSibling;
    if (!node || node.nodeType !== Node.TEXT_NODE) {
      node = document.createTextNode(' ' + value);
      container.appendChild(node);
    } else {
      node.nodeValue = ' ' + value;
    }
  };

  const apply = () => {
    queued = false;
    const tr = translations[locale()];
    app.querySelectorAll('.event-card').forEach(card => {
      const title = card.querySelector('h3')?.textContent?.trim();
      if (title !== "Catherine's Party") return;
      const type = card.querySelector('.event-type');
      const description = card.querySelector('p');
      if (type) type.textContent = tr.type;
      if (description) description.textContent = tr.description;

      const rows = card.querySelectorAll('.event-meta > div');
      const durationRow = rows[rows.length - 1];
      const label = durationRow?.querySelector('span');
      if (label) {
        let node = label.nextSibling;
        if (!node || node.nodeType !== Node.TEXT_NODE) {
          node = document.createTextNode(' ' + tr.duration);
          durationRow.appendChild(node);
        } else {
          node.nodeValue = ' ' + tr.duration;
        }
      }
      setTrailingText(card.querySelector('.event-rewards'), tr.rewards);
    });
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(apply);
  };

  new MutationObserver(schedule).observe(app, { childList: true, subtree: true });
  document.getElementById('languageSelect')?.addEventListener('change', () => setTimeout(schedule, 0));
  window.addEventListener('server504:localechange', schedule);
  window.addEventListener('hashchange', schedule);
  schedule();
})();
