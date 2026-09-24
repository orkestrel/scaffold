// Compares the round-5 computeOffset arithmetic with a bounded candidate over the objective lane's counterexamples,
// the retained cases, and a sweep of fractional boxes; reports any candidate move that leaves a fitting box outside.
const box = (x, y, w, h) => ({ left: x, top: y, right: x + w, bottom: y + h, width: w, height: h })
const round5 = (b, W, H) => { const f = b.width <= W && b.height <= H; return { top: f ? Math.min(0, H - Math.ceil(b.bottom)) : 0, left: f ? Math.min(0, W - Math.ceil(b.right)) : 0 } }
const axis = (s, e, n) => (e <= n ? 0 : Math.max(n - Math.ceil(e), -s))
const bounded = (b, W, H) => { const f = b.width <= W && b.height <= H; return { top: f ? axis(b.top, b.bottom, H) : 0, left: f ? axis(b.left, b.right, W) : 0 } }
const cases = [[box(0, 0.5, 100, 513), 800, 513], [box(0.5, 0, 800, 100), 800, 513], [box(0, 0, 800, 512.5), 800, 512.5], [box(0, 400, 100, 344.5), 800, 413], [box(0, -10, 100, 50), 800, 513], [box(0, 0, 100, 100), 800, 513], [box(750, 480, 100, 100), 800, 513]]
for (const [b, W, H] of cases) console.log(JSON.stringify({ box: [b.left, b.top, b.width, b.height], W, H, round5: round5(b, W, H), bounded: bounded(b, W, H) }))
let bad = 0, n = 0
for (let y = 0; y <= 20; y += 0.25) for (let h = 1; h <= 520; h += 7.75) for (const H of [513, 512.5]) {
  const b = box(0, y, 10, h); if (b.height > H) continue; n++
  const m = bounded(b, 800, H); const t = b.top + m.top, e = b.bottom + m.top
  if (m.top > 0 || t < 0 || e > H + 1e-9 && !(b.bottom <= H)) bad++
}
console.log('sweep', n, 'boxes; bounded moves leaving a fitting box outside or moving down:', bad)
