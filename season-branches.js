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
    if (season === 'summer' || season === 'autumn') {
      const palette = season === 'summer' ? ['#2f7d3a', '#3f9446', '#58a94f', '#2a6b36', '#4c9a41']
        : ['#e8a93a', '#d9731f', '#c4452a', '#f0c24c', '#b8571d'];
      let falling = '';
      TIPS.forEach(([x, y], i) => {
        const count = 2 + Math.floor(pick(i, 1) * 2);
        for (let k = 0; k < count; k++) {
          const n = i * 5 + k, angle = Math.round(pick(n, 2) * 360), s = 0.75 + pick(n, 3) * 0.75;
          const fill = palette[Math.floor(pick(n, 4) * palette.length)];
          const tx = x + (pick(n, 5) - 0.5) * 22, ty = y + (pick(n, 6) - 0.5) * 22;
          out += `<g transform="translate(${num(tx)} ${num(ty)}) rotate(${angle}) scale(${num(s)})" fill="${fill}"><use class="sb-sway" href="#sb-leaf" style="--i:${n};--r:${Math.round((pick(n, 7) - 0.5) * 14)}deg"/></g>`;
        }
      });
      if (season === 'autumn') {
        [[120, 10, 0], [34, 68, 1], [206, 92, 2], [50, 170, 3], [224, 146, 4]].forEach(([x, y, n]) => {
          falling += `<g transform="translate(${x} ${y})"><g class="sb-drop-leaf" style="--n:${n}"><g transform="rotate(${40 + n * 50})" fill="${palette[n % palette.length]}"><use href="#sb-leaf"/></g></g></g>`;
        });
      } else {
        [[120, 10, 0], [34, 68, 1], [50, 170, 2], [224, 146, 3], [114, 172, 4], [96, 140, 5]].forEach(([x, y, n]) => {
          falling += `<g transform="translate(${x + 8} ${y + 6})"><circle class="sb-drip" style="--n:${n}" r="2" fill="#dcefff" opacity=".9"/></g>`;
        });
      }
      return `<defs>${LEAF('sb-leaf')}</defs>${out}${falling}`;
    }
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
