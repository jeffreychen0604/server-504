(() => {
  const applyRouteTheme = () => {
    const route = (location.hash.replace(/^#\//, '').split('?')[0] || 'home').split('/')[0];
    document.body.dataset.route = route;
  };

  applyRouteTheme();
  window.addEventListener('hashchange', applyRouteTheme);
})();
