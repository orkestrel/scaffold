# Round 2: rewrites the guide prose round 1 wrote for the label and bar transitions, § Factors, and
# the two easing sentences F2 names.
import pathlib
p = pathlib.Path('guides/veneer.md')
s = p.read_text()
def rep(old, new):
    global s
    assert s.count(old) == 1, old[:80]
    s = s.replace(old, new)

rep("""- **The label transition scales with the motion factor.** The release writes the
  `opacity 0.1s ease-in-out, transform 0.1s ease-in-out` value; the partial multiplies each `0.1s`
  duration by the `--vn-factor-motion` factor as `calc(100ms * var(--vn-factor-motion))`, because no
  motion token resolves to that duration. The transition resolves to the release's value at a factor
  of `1`, rescales with the factor, and keeps the release's `ease-in-out` curve.
""", """- **The label transition scales with the motion factor.** The release writes the
  `opacity 0.1s ease-in-out, transform 0.1s ease-in-out` value; the partial writes each duration as
  `calc(var(--vn-motion-feedback) / 1.5)`, because the label's lift is feedback to the control's own
  input. The transition resolves to the release's value at a factor of `1`, rescales with the factor
  through the token, and keeps the release's `ease-in-out` curve.
""")

rep("""reduced-motion preference. It reads the transform transition the browser runs as a value lifts the
label: the release's duration and curve at the resting motion factor, twice that duration at a
doubled factor, and no transition at a zero factor. It also reads the height and every inset at a
doubled density factor, the
backdrop radius at a doubled radius factor, the label and the backdrop in each color mode, and the
""", """reduced-motion preference. It reads the transform transition the browser runs as a value lifts the
label: the release's duration and curve at the resting motion factor, twice that duration at a
doubled factor, no transition at a zero factor, and the root's duration inside a wrapper that sets a
doubled factor alone. It also reads the height and every inset at a doubled density factor, the
backdrop radius at a doubled radius factor, the label and the backdrop in each color mode, and the
""")

rep("""curve stays the release's `ease-in-out`, which no motion token resolves to. The transition is written
""", """curve stays the release's `ease-in-out`, which no `--vn-ease-*` token resolves to. The transition is
written
""")

rep("""curve stays the release's `ease-in-out`, because no published token resolves to that easing. It is
written through the `transition` mixin,""", """curve stays the release's `ease-in-out`, which no `--vn-ease-*` token resolves to. It is written
through the `transition` mixin,""")

rep("""The bar's width transition multiplies the release's `0.6s` duration by the `--vn-factor-motion`
factor, so it resolves to the release's value at a factor of `1`, and keeps the release's `ease`
curve. It is written through the `transition` mixin, so the reduced-motion preference collapses it; the stripe animation stops under the same preference. Both collapses are
Bootstrap's own recorded behavior rather than an addition here.
""", """The bar's width transition reads four times the `--vn-motion-feedback` token, because the fill's
width change is feedback to the value the bar reports. It resolves to the release's value at a
factor of `1`, rescales with the `--vn-factor-motion` factor through the token, and keeps the
release's `ease` curve. It is written through the `transition` mixin, so the reduced-motion
preference collapses it; the stripe animation stops under the same preference. Both collapses are
Bootstrap's own recorded behavior rather than an addition here.
""")

rep("""- **The width transition scales with the motion factor.** The release writes the `width 0.6s ease`
  value in the `--bs-progress-bar-transition` property; the partial writes
  `width calc(600ms * var(--vn-factor-motion)) ease`, because no motion token resolves to that
  duration.
""", """- **The width transition scales with the motion factor.** The release writes the `width 0.6s ease`
  value in the `--bs-progress-bar-transition` property; the partial writes
  `width calc(var(--vn-motion-feedback) * 4) ease`, which resolves to the release's value at a factor
  of `1` and rescales with the factor through the token.
""")

rep("""also reads the width transition the browser runs as the bar's width moves: the release's duration
and curve at the resting motion factor, twice that duration at a doubled factor, and no transition
at a zero factor.
""", """also reads the width transition the browser runs as the bar's width moves: the release's duration
and curve at the resting motion factor, twice that duration at a doubled factor, no transition at a
zero factor, and the root's duration inside a wrapper that sets a doubled factor alone.
""")

rep("""release's literals as their own sections record. A scaled duration reads a `--vn-motion-*` token or
multiplies the release's own duration by the factor, so it resolves to the release's value at a
factor of `1`, doubles at a factor of `2`, and starts no transition at a factor of `0`.
""", """release's literals as their own sections record. A scaled duration reads a `--vn-motion-*` token or
a multiple of one, so it doubles from its own resting value at a factor of `2` and starts no
transition at a factor of `0`. At a factor of `1`, a scaled duration that keeps the release's timing
resolves to the release's value, and one the departure ledger records, such as the `.icon-link`
transform's, resolves to its token's value.
""")
p.write_text(s)
