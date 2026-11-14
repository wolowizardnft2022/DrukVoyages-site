/* Click actions for the page's buttons and overlays (R-10). They replace the inline onclick="" attributes so the
   Content Security Policy can drop 'unsafe-inline' for scripts. Each element names its action in data-act and may
   pass one argument in data-arg. The functions live in the page scripts and are looked up when the click happens. */
(function () {
  const call = name => (e, el) => window[name](e, el);
  const ACTIONS = {
    closeMobileNav: () => closeMobileNav(),
    filter: (e, el) => filterItineraries(el.dataset.arg, el),
    galleryOverlay: e => closeGalleryLightbox(e),
    galleryClose: () => closeGalleryLightbox(),
    translationOverlay: e => closeTranslationDisclaimer(e),
    cancelLanguageChange: () => cancelLanguageChange(),
    agreeLanguageChange: () => agreeLanguageChange(),
    modalOverlay: e => closeModal(e),
    closeItineraryModal: () => closeItineraryModal(),
    openModal: (e, el) => openModal(Number(el.dataset.arg)),
    chatSetupToggle: () => chatSetupToggle(),
    chatClear: () => chatClear(),
    chatToggle: () => chatToggle(),
    chatSaveKey: () => chatSaveKey(),
    chatQuick: (e, el) => chatQuick(el.dataset.arg),
    chatSend: () => chatSend(),
  };
  document.addEventListener('click', e => {
    const el = e.target instanceof Element ? e.target.closest('[data-act]') : null;
    const action = el && ACTIONS[el.dataset.act];
    if (action) action(e, el);
  });
})();
