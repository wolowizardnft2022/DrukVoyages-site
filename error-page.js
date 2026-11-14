    try {
      const language = localStorage.getItem('druk-language') || 'en';
      const copy = window.DRUK_I18N[language]?.errorPage;
      if (copy) {
        document.documentElement.lang = language;
        document.getElementById('errorTitle').textContent = `${copy[0]} — Druk Voyages`;
        document.getElementById('errorHeading').textContent = copy[0];
        document.getElementById('errorMessage').textContent = copy[1];
        document.getElementById('errorHome').textContent = copy[2];
        document.getElementById('errorOr').textContent = copy[3];
        document.getElementById('errorPlan').textContent = copy[4];
      }
    } catch (_) {}
  
