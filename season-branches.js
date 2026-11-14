/* Best Time season branches (styles.css "Season branches"): each season card gets a tree branch that sways in the wind
   while the card is on screen. Spring: cherry blossoms; monsoon: wet green leaves with drops sliding off; autumn:
   golden leaves that let go and fall; winter: a bare branch with snow on it and snow clumps dropping. The same
   hand-placed branch (limbs and twig tips) carries every season's foliage; placement and colours use a fixed
   pseudo-random hash, so the picture is the same on every visit. Drawn as inline SVG; main.js has already added the
   .season-fx layer, which the card's .fx-live class starts and stops (under reduced motion the branch stays still). */
(function () {
  const LIMBS = [
    ['M336,-8 C268,18 206,26 152,68 S72,118 18,172', 7.5],
    ['M252,20 C242,48 226,70 206,92', 4], ['M186,46 C170,24 150,14 120,10', 3.4],
    ['M152,68 C142,98 122,124 96,140', 3.8], ['M112,92 C88,82 62,86 34,68', 3],
    ['M62,128 C54,142 56,156 50,170', 3], ['M96,140 C108,150 116,160 114,172', 2.6],
    ['M206,92 C214,112 212,128 224,146', 2.6],
  ];
  const TIPS = [[206, 92], [120, 10], [96, 140], [34, 68], [50, 170], [18, 172], [114, 172], [224, 146], [152, 68], [186, 46],
    [252, 20], [226, 70], [132, 104], [70, 112], [88, 84], [60, 130], [170, 24], [240, 48], [112, 92], [180, 80]];
  const pick = (n, salt) => { const v = Math.sin((n + 1) * 12.9898 + salt * 78.233) * 43758.5453; return v - Math.floor(v); };
  const num = value => value.toFixed(1);
  const BARK = '#4b3527';

  const limbs = (season, extra = '') => LIMBS.map(([d, w]) =>
    `<path d="${d}" fill="none" stroke="${BARK}" stroke-width="${w}" stroke-linecap="round"${extra}/>`).join('');

  const BLOSSOM = '<g id="sb-blossom"><g fill="#f9d2dc" stroke="#e48aa4" stroke-width=".5">' +
    [0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-5" rx="3.7" ry="5.4" transform="rotate(${a})"/>`).join('') +
    '</g><circle r="1.7" fill="#d9487a"/><g stroke="#c43a68" stroke-width=".5">' +
    [20, 90, 160, 230, 300].map(a => `<path d="M0,0 L${num(Math.cos(a * Math.PI / 180) * 3.4)},${num(Math.sin(a * Math.PI / 180) * 3.4)}"/>`).join('') + '</g></g>';
  const LEAF = id => `<g id="${id}"><path d="M0,0 C4,-6 13,-7 20,0 C13,7 4,6 0,0Z"/><path d="M1,0 L18,0" stroke="rgba(0,0,0,.28)" stroke-width=".6" fill="none"/></g>`;


  /* Real leaves for monsoon and autumn: they sprout along the limbs, alternating left and right on short stalks (petioles),
     pointing towards the tip with a little droop, bigger in the middle of a twig and smaller at its end, with a leaf at
     every twig tip. Each leaf is an ovate blade with a pointed tip, a darker half, a midrib and side veins, filled with a
     base-to-tip gradient. Placement walks the limb paths with getPointAtLength, so the limbs themselves are unchanged. */
  const GRADIENTS = {
    summer: [['#2c6e37', '#58a84f'], ['#337a3c', '#6dba5c'], ['#255f33', '#4a9a45'], ['#3b8a41', '#7cc263'], ['#2f7336', '#5fae52']],
    autumn: [['#d9a62f', '#e2562a'], ['#e8b53a', '#d9731f'], ['#c9702a', '#a62f26'], ['#efc54f', '#e48a2a'], ['#8f9a35', '#e1a22e'], ['#d9731f', '#b8341f']],
  };
  const BLADE = 'M0,0 C3,-7 11,-8.5 17,-3.5 C19.5,-1.8 21,-.6 24,0 C21,1 19.5,2.2 17,3.8 C11,8 3,6.5 0,0Z';
  const STALK = 5;

  function leafPlacements() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.style.cssText = 'position:absolute;visibility:hidden';
    document.body.appendChild(svg);
    const leaves = [];
    let n = 0;
    LIMBS.forEach(([d], limb) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d); svg.appendChild(path);
      const length = path.getTotalLength();
      let at = limb === 0 ? length * 0.42 : length * 0.22, side = pick(limb, 31) > 0.5 ? 1 : -1;
      while (at < length - 5) {
        const t = at / length, p = path.getPointAtLength(at), q = path.getPointAtLength(Math.min(length, at + 3)), o = path.getPointAtLength(Math.max(0, at - 3));
        const along = Math.atan2(q.y - o.y, q.x - o.x);
        // Limbs run from the top-right corner towards the tip, so "along" already points to the tip.
        const spread = (48 + pick(n, 32) * 26) * Math.PI / 180;
        let angle = along + side * spread;
        const droop = 0.3 * (Math.PI / 2 - angle + 2 * Math.PI * Math.round((angle - Math.PI / 2) / (2 * Math.PI)));
        angle += Math.max(-0.5, Math.min(0.5, droop));
        const scale = (limb === 0 ? 1.15 : 0.95) * (0.82 + pick(n, 33) * 0.5) * (1 - 0.3 * Math.abs(t - 0.55));
        leaves.push({ x: p.x, y: p.y, a: angle, s: scale, n: n++ });
        at += 13 + pick(n, 34) * 8; side = -side;
      }
      if (limb > 0) {   // a leaf at the twig tip, continuing the twig
        const e = path.getPointAtLength(length), f = path.getPointAtLength(length - 3);
        leaves.push({ x: e.x, y: e.y, a: Math.atan2(e.y - f.y, e.x - f.x) + (pick(limb, 35) - 0.5) * 0.5, s: 0.85 + pick(limb, 36) * 0.3, n: n++ });
      }
    });
    svg.remove();
    // Keep the foliage clear of the season name under the branch.
    return leaves.filter(l => l.y + Math.sin(l.a) * (STALK + 24) * l.s <= 178);
  }

  function leafyBranch(season) {
    const grads = GRADIENTS[season];
    const defs = grads.map(([from, to], i) =>
      `<linearGradient id="sbg-${season}-${i}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>`).join('') +
      `<g id="sb-leaf-${season}"><path d="${BLADE}"/><path d="M0,0 L24,0 C21,1 19.5,2.2 17,3.8 C11,8 3,6.5 0,0Z" fill="rgba(0,0,0,.16)"/>` +
      '<path d="M0,0 L22,0 M6,0 L11,-4.6 M6,0 L11,4.2 M11.5,0 L16.5,-3.7 M11.5,0 L16.5,3.5" stroke="rgba(0,0,0,.26)" stroke-width=".55" fill="none" stroke-linecap="round"/>' +
      (season === 'summer' ? '<ellipse cx="9" cy="-3" rx="4.2" ry="1.1" fill="rgba(255,255,255,.28)" transform="rotate(-14 9 -3)"/>' : '') + '</g>';
    const leaves = leafPlacements();
    let out = '';
    leaves.forEach(l => {
      const grad = Math.floor(pick(l.n, 37) * grads.length);
      const order = Math.floor(Math.hypot(l.x - 336, l.y + 8) / 7);
      out += `<g transform="translate(${num(l.x)} ${num(l.y)}) rotate(${num(l.a * 180 / Math.PI)}) scale(${num(l.s)})">` +
        `<g class="sb-lf" style="--i:${order};--k:${l.n % 7}"><path d="M0,0 L${STALK + 1},0" stroke="${BARK}" stroke-width="1.1" stroke-linecap="round"/>` +
        `<use href="#sb-leaf-${season}" x="${STALK}" fill="url(#sbg-${season}-${grad})"/></g></g>`;
    });
    // Leaves that let go (autumn) or drops that run off the leaf tips (monsoon).
    const tipOf = l => ({ x: l.x + Math.cos(l.a) * (STALK + 22) * l.s, y: l.y + Math.sin(l.a) * (STALK + 22) * l.s });
    const spaced = [...leaves].sort((a, b) => tipOf(b).y - tipOf(a).y).filter((_, i) => i % 3 === 0).slice(0, 6);
    let moving = '';
    if (season === 'autumn') {
      spaced.slice(0, 5).forEach((l, n) => {
        moving += `<g transform="translate(${num(l.x)} ${num(l.y)})"><g class="sb-drop-leaf" style="--n:${n}"><g transform="rotate(${num(l.a * 180 / Math.PI)}) scale(${num(l.s)})"><use href="#sb-leaf-${season}" fill="url(#sbg-${season}-${(n * 2) % grads.length})"/></g></g></g>`;
      });
    } else {
      spaced.forEach((l, n) => {
        const t = tipOf(l);
        moving += `<g transform="translate(${num(t.x)} ${num(t.y + 1.5)})"><circle class="sb-drip" style="--n:${n}" r="1.9" fill="#e4f3ff" opacity=".9"/></g>`;
      });
    }
    return `<defs>${defs}</defs>${out}${moving}`;
  }

  function foliage(season) {
    let out = '';
    if (season === 'spring') {
      TIPS.forEach(([x, y], i) => {
        const count = 2 + Math.floor(pick(i, 1) * 2);
        for (let k = 0; k < count; k++) {
          const px = x + (pick(i * 5 + k, 2) - 0.5) * 30, py = y + (pick(i * 5 + k, 3) - 0.5) * 26;
          const s = 0.8 + pick(i * 5 + k, 4) * 0.7;
          out += `<g transform="translate(${num(px)} ${num(py)}) scale(${num(s)})"><use class="sb-sway" href="#sb-blossom" style="--i:${i + k};--r:${Math.round((pick(i, k + 6) - 0.5) * 16)}deg"/></g>`;
        }
        if (pick(i, 9) > 0.55) out += `<circle cx="${num(x + 8)}" cy="${num(y - 9)}" r="2.2" fill="#e79ab1"/>`;
      });
      return `<defs>${BLOSSOM}</defs>${out}`;
    }
    if (season === 'summer' || season === 'autumn') return leafyBranch(season);
    // winter: snow lies on top of the limbs, clumps drop off now and then
    const snow = LIMBS.map(([d, w]) =>
      `<path d="${d}" fill="none" stroke="#fdfdff" stroke-width="${num(w * 0.5)}" stroke-linecap="round" transform="translate(0 ${num(-w * 0.42)})" stroke-dasharray="${num(w * 7)} ${num(w * 1.6)}"/>`).join('');
    const clumps = [[120, 10, 0], [34, 68, 1], [206, 92, 2], [50, 170, 3], [224, 146, 4]].map(([x, y, n]) =>
      `<g transform="translate(${x} ${y})"><circle class="sb-clump" style="--n:${n}" r="3" fill="#ffffff"/></g>`).join('');
    const icicles = [[152, 70, 12], [96, 142, 9], [186, 48, 10], [20, 174, 11]].map(([x, y, h], i) =>
      `<path d="M${x - 1.6},${y + 3} L${x + 1.6},${y + 3} L${x},${y + 3 + h}Z" fill="#e6f3ff" opacity=".85" class="sb-ice" style="--i:${i}"/>`).join('');
    return snow + icicles + clumps;
  }

  // main.js adds the .season-fx layer on DOMContentLoaded (and not at all under reduced motion), so this runs after it
  // and makes its own layer when none exists: the branch is then drawn but never moves.
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.season-card').forEach(card => {
      const season = ['spring', 'summer', 'autumn', 'winter'].find(name => card.classList.contains(name));
      if (!season) return;
      let layer = card.querySelector('.season-fx');
      if (!layer) {
        layer = document.createElement('span');
        layer.className = 'season-fx season-fx-still';
        layer.setAttribute('aria-hidden', 'true');
        card.prepend(layer);
      }
      layer.insertAdjacentHTML('afterbegin',
        `<svg class="season-branch season-branch-${season}" viewBox="0 0 320 190" aria-hidden="true" focusable="false">${limbs(season)}${foliage(season)}</svg>`);
    });
  });
})();
