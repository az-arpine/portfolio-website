(() => {
  // Guard against double-initialization
  if (window.__LB_INIT__) { console.warn('Lightbox already initialized.'); return; }
  window.__LB_INIT__ = true;

  // Wait until DOM is ready even if this ran early
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else { fn(); }
  }

  onReady(() => {
    const DESKTOP_MQ = window.matchMedia('(min-width: 1024px)');
    let overlay = document.getElementById('lightbox');

    // If overlay missing, inject it (prevents “works inline only”)
    if (!overlay) {
      console.warn('#lightbox not found. Injecting fallback overlay.');
      overlay = document.createElement('div');
      overlay.id = 'lightbox';
      overlay.className = 'lightbox';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML =
        '<button type="button" class="lightbox__close" aria-label="Close">×</button>' +
        '<img class="lightbox__img" alt="">';
      document.body.appendChild(overlay);
    }

    const overlayImg = overlay.querySelector('.lightbox__img');
    const closeBtn   = overlay.querySelector('.lightbox__close');

    function openLightbox(src, alt) {
      overlayImg.src = src;
      overlayImg.alt = alt || '';
      overlay.setAttribute('aria-hidden', 'false');
    }
    function closeLightbox() {
      overlay.setAttribute('aria-hidden', 'true');
      overlayImg.src = '';
    }

    // Click handler (capture phase to beat other listeners)
    function onDocClickCapture(e) {
      if (!DESKTOP_MQ.matches) return;               // desktop-only
      const a = e.target.closest('a[data-zoom]');
      if (!a) return;

      // ignore modified clicks / right-click
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      e.stopPropagation();
      const img = a.querySelector('img');
      openLightbox(a.href, img ? img.alt : '');
    }

    // Bind once
    document.addEventListener('click', onDocClickCapture, true);
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

    // Re-bind when crossing the 1024px boundary
    const apply = () => {
      // nothing to do; we check mq inside handler
      console.log('Lightbox active. Desktop =', DESKTOP_MQ.matches);
    };
    DESKTOP_MQ.addEventListener ? DESKTOP_MQ.addEventListener('change', apply)
                                : DESKTOP_MQ.addListener(apply);
    apply();
  });
})();


  // disable anchor behavior on mobile only (optional)
  (() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    document.addEventListener('click', function (e) {
      const a = e.target.closest('a[data-zoom]');
      if (!a) return;
      if (mq.matches) return; // desktop ok
      e.preventDefault();     // mobile: do nothing
    }, true);
  })();
