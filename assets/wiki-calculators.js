(() => {
  const nf = new Intl.NumberFormat('en-US');

  function asNumber(id) {
    const el = document.getElementById(id);
    const value = Number(el?.value || 0);
    return Number.isFinite(value) && value >= 0 ? value : 0;
  }

  function mountCalculators() {
    const mount = document.getElementById('wikiCalcMount');
    if (!mount || mount.dataset.mounted === 'true') return;
    mount.dataset.mounted = 'true';

    mount.innerHTML = `
      <div class="wiki-calc-grid">
        <section class="wiki-calc-card">
          <div class="wiki-calc-kicker">OFFICIAL FORMULA</div>
          <h3>Honor migration converter</h3>
          <p>Historical shop-migration conversion only. It does not calculate current event earnings.</p>
          <label>Capital Glory Badges<input id="honorCapital" type="number" min="0" step="1" value="0"></label>
          <label>Black Gold Coins<input id="honorBlackGold" type="number" min="0" step="1" value="0"></label>
          <div class="wiki-calc-result"><span>Honor Points</span><strong id="honorTotal">0</strong></div>
          <small>Official: Badge × 40 + Black Gold Coin × 2.</small>
        </section>

        <section class="wiki-calc-card">
          <div class="wiki-calc-kicker wiki-calc-kicker-community">COMMUNITY-OBSERVED DEFAULT</div>
          <h3>Orange Chip material planner</h3>
          <p>Use the current Server 504 Chip Factory value if it differs from the default.</p>
          <label>Orange Chips wanted<input id="chipTarget" type="number" min="0" step="1" value="4"></label>
          <label>Advanced materials owned<input id="chipOwned" type="number" min="0" step="1" value="0"></label>
          <label>Advanced materials per chip<input id="chipCost" type="number" min="1" step="1" value="800"></label>
          <div class="wiki-calc-result"><span>Materials still needed</span><strong id="chipNeeded">3,200</strong></div>
          <div class="wiki-calc-subresult" id="chipCraftable">Craftable now: 0</div>
          <small>800 is community-observed, not an official published recipe. Override it when the in-game UI shows another value.</small>
        </section>
      </div>`;

    const honorInputs = ['honorCapital', 'honorBlackGold'];
    const chipInputs = ['chipTarget', 'chipOwned', 'chipCost'];

    function updateHonor() {
      const total = asNumber('honorCapital') * 40 + asNumber('honorBlackGold') * 2;
      const out = document.getElementById('honorTotal');
      if (out) out.textContent = nf.format(total);
    }

    function updateChip() {
      const target = asNumber('chipTarget');
      const owned = asNumber('chipOwned');
      const cost = Math.max(1, asNumber('chipCost'));
      const needed = Math.max(0, target * cost - owned);
      const craftable = Math.floor(owned / cost);
      const needOut = document.getElementById('chipNeeded');
      const craftOut = document.getElementById('chipCraftable');
      if (needOut) needOut.textContent = nf.format(needed);
      if (craftOut) craftOut.textContent = `Craftable now: ${nf.format(craftable)}`;
    }

    honorInputs.forEach(id => document.getElementById(id)?.addEventListener('input', updateHonor));
    chipInputs.forEach(id => document.getElementById(id)?.addEventListener('input', updateChip));
    updateHonor();
    updateChip();
  }

  const observer = new MutationObserver(mountCalculators);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('hashchange', () => setTimeout(mountCalculators, 80));
  setTimeout(mountCalculators, 180);
})();
