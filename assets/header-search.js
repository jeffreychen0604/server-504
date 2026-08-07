(() => {
  const headerSearchInput = document.getElementById('headerSearchInput');
  if (!headerSearchInput) return;

  const launchSearch = () => {
    if (typeof openSearch === 'function') openSearch();
  };

  headerSearchInput.addEventListener('click', launchSearch);
  headerSearchInput.addEventListener('keydown', event => {
    if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
      launchSearch();
    }
  });
})();
