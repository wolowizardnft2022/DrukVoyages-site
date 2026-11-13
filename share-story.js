/* Guest story upload page (R-18): share-story.html?t=<invite token>.
   1. Check the invite (GET /api/stories/invite/:token) and greet the party, or explain why the link can't be used.
   2. Resize the chosen photo to at most 1600px and re-encode it as JPEG on a canvas. That also drops EXIF (GPS);
      the server strips metadata again, because it can't trust this step.
   3. Validate, then POST /api/stories. Show "thank you" (or "we'll add it shortly" in approval mode).
   Strings come from i18n/<lang>.json → "shareStory"; the English in the HTML is the fallback. */
(() => {
  'use strict';
  const API_URL = (window.DRUK_VOYAGES_API_URL || window.location.origin).replace(/\/+$/, '');
  const LANGUAGES = ['en', 'ja', 'zh', 'ko', 'es', 'fr', 'vi', 'pt'];
  const MAX_EDGE = 1600, MIN_EDGE = 400, MAX_BYTES = 2.8 * 1024 * 1024;
  const $ = id => document.getElementById(id);
  const token = new URLSearchParams(location.search).get('t') || '';
  let strings = {}, photoData = '', previewUrl = '', remaining = 0, statusKey = 'checking', greetingLabel = '';

  const store = { get(key) { try { return localStorage.getItem(key); } catch { return null; } }, set(key, value) { try { localStorage.setItem(key, value); } catch { /* private mode */ } } };
  function pickLanguage() {
    const saved = store.get('druk-language');
    if (LANGUAGES.includes(saved)) return saved;
    for (const tag of navigator.languages || [navigator.language || 'en']) {
      const base = String(tag).slice(0, 2).toLowerCase();
      if (LANGUAGES.includes(base)) return base;
    }
    return 'en';
  }
  // English for the messages validation depends on, in case a language file fails to load.
  const FALLBACK = { required: 'Please complete this field.', storyShort: 'Please write at least 20 characters.', photoError: 'This photo couldn’t be read. Please choose another one.', photoSmall: 'Please choose a photo at least 400 pixels on each side.' };
  const t = (key, vars = {}) => String(strings[key] || FALLBACK[key] || '').replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');

  // Fill every element marked with data-s / data-s-html / data-s-placeholder from the loaded strings.
  function applyStrings() {
    document.querySelectorAll('[data-s]').forEach(el => { const value = t(el.dataset.s); if (value) el.textContent = value; });
    document.querySelectorAll('[data-s-html]').forEach(el => {
      const value = t(el.dataset.sHtml);
      if (!value) return;
      // Only <em> is allowed in translated titles; everything else is set as text.
      el.textContent = '';
      value.split(/(<em>.*?<\/em>)/).forEach(part => {
        const em = /^<em>(.*)<\/em>$/.exec(part);
        if (em) { const node = document.createElement('em'); node.textContent = em[1]; el.appendChild(node); } else if (part) el.appendChild(document.createTextNode(part));
      });
    });
    document.querySelectorAll('[data-s-placeholder]').forEach(el => { const value = t(el.dataset.sPlaceholder); if (value) el.placeholder = value; });
    document.querySelectorAll('[data-star]').forEach(label => { const value = t('star', { n: label.dataset.star }); if (value) label.querySelector('.sr-only').textContent = value; });
    if (strings.pageTitle) document.title = strings.pageTitle;
    if (greetingLabel) $('shareGreeting').textContent = t('greeting', { label: greetingLabel }) || greetingLabel;
    if (strings[statusKey]) $('shareStatus').textContent = t(statusKey);
    updateCount();
  }
  async function loadLanguage(lang) {
    document.documentElement.lang = lang;
    $('shareLang').value = lang;
    try {
      const res = await fetch(`i18n/${lang}.json?v=20261112-stories`, { signal: AbortSignal.timeout(8000) });
      strings = (await res.json()).shareStory || {};
    } catch { strings = {}; }
    if (lang !== 'en' && !strings.title) return loadLanguage('en');
    applyStrings();
  }

  function setStatus(key, problem = false) {
    statusKey = key;
    const status = $('shareStatus');
    status.hidden = false;
    status.classList.toggle('is-problem', problem);
    status.textContent = t(key) || status.textContent;
  }

  async function checkInvite() {
    if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) return setStatus('invalid', true);
    try {
      const res = await fetch(`${API_URL}/api/stories/invite/${encodeURIComponent(token)}`, { signal: AbortSignal.timeout(8000) });
      const data = await res.json();
      if (!data.valid) return setStatus(data.reason === 'unknown' ? 'invalid' : 'expired', true);
      remaining = data.remaining;
      greetingLabel = data.label;
      $('shareGreeting').textContent = t('greeting', { label: data.label }) || data.label;
      $('shareGreeting').hidden = false;
      $('shareStatus').hidden = true;
      $('shareForm').hidden = false;
    } catch { setStatus('offline', true); }
  }

  /* ── Photo: decode (respecting EXIF rotation), check size, resize, re-encode as JPEG ── */
  async function decode(file) {
    if ('createImageBitmap' in window) {
      try { return await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch { /* fall back */ }
    }
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      return img;
    } finally { URL.revokeObjectURL(url); }
  }
  const toBlob = (canvas, quality) => new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', quality));
  const toDataUrl = blob => new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(blob); });

  async function choosePhoto(file) {
    showFieldError('Photo', '');
    photoData = '';
    if (!file) return;
    let image;
    try { image = await decode(file); } catch { return showFieldError('Photo', t('photoError')); }
    const width = image.width, height = image.height;
    if (Math.min(width, height) < MIN_EDGE) return showFieldError('Photo', t('photoSmall'));
    const scale = Math.min(1, MAX_EDGE / Math.max(width, height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
    image.close?.();
    let blob = await toBlob(canvas, 0.85);
    if (blob && blob.size > MAX_BYTES) blob = await toBlob(canvas, 0.7);
    if (!blob || blob.size > MAX_BYTES) return showFieldError('Photo', t('photoError'));
    photoData = await toDataUrl(blob);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = URL.createObjectURL(blob);
    $('sharePreview').src = previewUrl;
    $('sharePreview').hidden = false;
    $('sharePhotoBox').classList.add('has-photo');
    $('sharePhotoBox').querySelector('[data-s]').dataset.s = 'photoChange';
    applyStrings();
  }

  /* ── Validation and sending ── */
  function showFieldError(field, message) {
    const error = $(`share${field}Error`);
    const input = { Photo: 'sharePhoto', Name: 'shareName', From: 'shareFrom', Text: 'shareText', Consent: 'shareConsent' }[field];
    error.textContent = message;
    error.hidden = !message;
    $(input).setAttribute('aria-invalid', String(Boolean(message)));
  }
  function updateCount() { $('shareCount').textContent = `${[...$('shareText').value].length}/400`; }

  function validate() {
    const checks = [
      ['Photo', photoData ? '' : t('required')],
      ['Name', $('shareName').value.trim() ? '' : t('required')],
      ['From', $('shareFrom').value.trim() ? '' : t('required')],
      ['Text', $('shareText').value.trim().length >= 20 ? '' : t('storyShort')],
      ['Consent', $('shareConsent').checked ? '' : t('required')],
    ];
    checks.forEach(([field, message]) => showFieldError(field, message));
    const first = checks.find(([, message]) => message);
    if (first) $({ Photo: 'sharePhoto', Name: 'shareName', From: 'shareFrom', Text: 'shareText', Consent: 'shareConsent' }[first[0]]).focus();
    return !first;
  }

  async function send(event) {
    event.preventDefault();
    $('shareError').hidden = true;
    if (!validate()) return;
    const button = $('shareSubmit');
    button.disabled = true;
    button.textContent = t('sending') || 'Sending…';
    try {
      const res = await fetch(`${API_URL}/api/stories`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(60000),
        body: JSON.stringify({
          token, name: $('shareName').value, from: $('shareFrom').value, text: $('shareText').value,
          rating: Number(document.querySelector('input[name="rating"]:checked').value),
          consent: $('shareConsent').checked, photo: photoData, website: $('shareWebsite').value,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 403) { $('shareForm').hidden = true; $('shareGreeting').hidden = true; return setStatus(data.reason === 'unknown' ? 'invalid' : 'expired', true); }
      if (!res.ok) throw new Error(data.error || 'failed');
      remaining -= 1;
      showDone(data.status === 'pending');
    } catch {
      $('shareError').textContent = t('error') || 'Your story couldn’t be sent. Please try again.';
      $('shareError').hidden = false;
    } finally {
      button.disabled = false;
      button.textContent = t('submit') || 'Share my moment';
    }
  }

  function showDone(pending) {
    $('shareForm').hidden = true;
    $('shareDonePhoto').src = previewUrl;
    $('shareDoneText').dataset.s = pending ? 'donePending' : 'doneText';
    $('shareAnother').hidden = remaining < 1;
    $('shareDone').hidden = false;
    applyStrings();
    $('shareDoneTitle').focus();
  }
  function startAgain() {
    $('shareForm').reset();
    photoData = '';
    $('sharePreview').hidden = true;
    $('sharePhotoBox').classList.remove('has-photo');
    $('sharePhotoBox').querySelector('[data-s]').dataset.s = 'photoHint';
    $('shareDone').hidden = true;
    $('shareForm').hidden = false;
    applyStrings();
    $('sharePhoto').focus();
  }

  $('sharePhoto').addEventListener('change', event => choosePhoto(event.target.files[0]));
  $('shareText').addEventListener('input', updateCount);
  $('shareForm').addEventListener('submit', send);
  $('shareAnother').addEventListener('click', startAgain);
  // Clear a field's message as soon as the guest fixes it, instead of waiting for the next submit.
  [['Name', () => $('shareName').value.trim()], ['From', () => $('shareFrom').value.trim()],
    ['Text', () => $('shareText').value.trim().length >= 20], ['Consent', () => $('shareConsent').checked]]
    .forEach(([field, isFixed]) => {
      const input = $(`share${field}`);
      ['input', 'change'].forEach(type => input.addEventListener(type, () => { if (!$(`share${field}Error`).hidden && isFixed()) showFieldError(field, ''); }));
    });
  $('shareLang').addEventListener('change', event => { store.set('druk-language', event.target.value); loadLanguage(event.target.value); });

  loadLanguage(pickLanguage()).then(checkInvite);
})();
