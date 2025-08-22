// Simple lightbox
(function(){
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t && t.matches('[data-lightbox]')) {
      e.preventDefault();
      const src = t.getAttribute('data-lightbox');
      const img = lb.querySelector('img');
      img.src = src;
      lb.classList.add('open');
    }
    if (t && (t.id === 'lightbox' || t.closest('#lightbox-close'))) {
      lb.classList.remove('open');
    }
  });
})();

// Language switch preserve path
(function(){
  const sel = document.getElementById('lang-switch');
  if (!sel) return;
  sel.addEventListener('change', () => {
    const to = sel.value;
    const path = location.pathname.replace(/^\/(en|nl)/,'');
    location.href = `/${to}${path}${location.search}`;
  });
})();
