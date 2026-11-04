/* Run with Playwright CLI run-code --filename scripts/qa-navigation-race.js.
 * Requires the local preview server on port 8041. No feedback is submitted. */
async (page) => {
  const results = [];
  const cases = [
    { from:'wiki', delay:'**/content/wiki-manifest.json', to:'codex', ready:'.markdown-body h2' },
    { from:'wiki/apc-chips', delay:'**/content/en/wiki/apc-chips.md', to:'home', ready:'.ke-panel' },
    { from:'charter', delay:'**/content/en/charter.md', to:'home', ready:'.ke-panel' },
    { from:'guides', delay:'**/content/guides.json', to:'home', ready:'.ke-panel' },
    { from:'wiki/apc-chips', delay:'**/content/en/wiki/apc-chips.md', language:'vi', ready:'[data-wiki-runtime-article]' },
  ];
  for (const [index, scenario] of cases.entries()) {
    const tab = await page.context().newPage();
    await tab.addInitScript(() => localStorage.setItem('server504-locale', 'en'));
    let release, sawRequest;
    const gate = new Promise(resolve => { release = resolve; });
    const started = new Promise(resolve => { sawRequest = resolve; });
    await tab.route(scenario.delay, async route => { sawRequest(); await gate; await route.continue(); });
    try {
      await tab.goto(`http://127.0.0.1:8041/index.html?race=${index}#/${scenario.from}`);
      await Promise.race([started, new Promise((_,reject) => setTimeout(() => reject(new Error('Delayed request never started')),15000))]);
      if (scenario.language) await tab.locator('#languageSelect').selectOption(scenario.language);
      else await tab.evaluate(route => { location.hash = '#/' + route; }, scenario.to);
      await tab.waitForSelector(scenario.ready);
      const before = await tab.locator('#app h1').innerText();
      release();
      await tab.waitForTimeout(1000);
      const after = await tab.locator('#app h1').innerText();
      const result = await tab.evaluate(() => ({ hash:location.hash, locale:document.documentElement.lang,
        wikiRoute:document.getElementById('app').dataset.wikiRuntimeRoute || '', errors:document.querySelectorAll('.error-box').length }));
      const stable = before === after && !result.errors && (scenario.language ? result.wikiRoute.endsWith(':vi') : result.hash === '#/' + scenario.to);
      results.push({from:scenario.from,to:scenario.to || scenario.language,before,after,stable,...result});
      if (!stable) throw new Error('Late response overwrote the active page: ' + JSON.stringify(results.at(-1)));
    } finally {
      release();
      await tab.close();
    }
  }
  return { cases:results.length, results };
}
