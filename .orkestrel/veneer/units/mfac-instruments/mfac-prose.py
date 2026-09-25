# Rewrites the guide prose for the motion-factor transitions: each family section and § Factors.
p = 'guides/veneer.md'
s = open(p).read()

def rep(old, new):
    global s
    assert s.count(old) == 1, old[:80]
    s = s.replace(old, new, 1)

# Form floating: departure bullet and proof reading.
rep("""- **The disabled label reads the gray token.** The release compiles `#6c757d`; the partial writes
  `var(--vn-gray-600)`, which resolves to that color and holds it in both modes.
""", """- **The disabled label reads the gray token.** The release compiles `#6c757d`; the partial writes
  `var(--vn-gray-600)`, which resolves to that color and holds it in both modes.
- **The label transition scales with the motion factor.** The release writes the
  `opacity 0.1s ease-in-out, transform 0.1s ease-in-out` value; the partial multiplies each `0.1s`
  duration by the `--vn-factor-motion` factor as `calc(100ms * var(--vn-factor-motion))`, because no
  motion token resolves to that duration. The transition resolves to the release's value at a factor
  of `1`, rescales with the factor, and keeps the release's `ease-in-out` curve.
""")
rep("""valid or invalid control keeps for its state icon, and the transition at rest and under the staged
reduced-motion preference. It also reads the height and every inset at a doubled density factor, the""",
"""valid or invalid control keeps for its state icon, and the transition at rest and under the staged
reduced-motion preference. It reads the transform transition the browser runs as a value lifts the
label: the release's duration and curve at the resting motion factor, twice that duration at a
doubled factor, and no transition at a zero factor. It also reads the height and every inset at a
doubled density factor, the""")

# Nav.
rep("""The link transition carries Bootstrap's own `0.15s ease-in-out` rather than the motion tokens the
Button family reads, because this family ships the release's recorded surface. It is written through
the `transition` mixin, so the reduced-motion rule the release records beside it is emitted with it.
""", """The link transition's duration reads the `--vn-motion-feedback` token, which resolves to the
release's `0.15s` value at a factor of `1` and rescales with the `--vn-factor-motion` factor. Its
curve stays the release's `ease-in-out`, which no motion token resolves to. The transition is written
through the `transition` mixin, so the reduced-motion rule the release records beside it is emitted
with it.
""")
rep("""header, the density factor, the light and dark modes, and the transition collapse under the staged
preference.

### Navbar classes""", """header, the density factor, the light and dark modes, and the transition collapse under the staged
preference. It also reads the transitions the browser runs as a tab becomes the active one: the
release's duration and curve at the resting motion factor, twice that duration at a doubled factor,
and no transition at a zero factor.

### Navbar classes""")

# Navbar.
rep("""through the `forced-ring` mixin, because forced colors paint no shadow ring. The toggler's
`box-shadow 0.15s ease-in-out` transition is written through the `transition` mixin, so the
reduced-motion rule the release records beside it is emitted with it.""",
"""through the `forced-ring` mixin, because forced colors paint no shadow ring. The toggler's
`box-shadow` transition runs over the `--vn-motion-feedback` token on the release's `ease-in-out`
curve, so it resolves to the release's `0.15s` value at a factor of `1` and rescales with the
`--vn-factor-motion` factor. It is written through the `transition` mixin, so the reduced-motion
rule the release records beside it is emitted with it.""")
rep("""spelling's retunes, the dark icon's scope, the toggler's ring, its forced-colors outline, and its
transition under the staged preference, the density factor, and the light and dark modes.""",
"""spelling's retunes, the dark icon's scope, the toggler's ring, its forced-colors outline, and its
transition under the staged preference, the density factor, and the light and dark modes. It also
reads the ring transition the browser runs as the toggler takes focus: the release's duration and
curve at the resting motion factor, twice that duration at a doubled factor, and no transition at a
zero factor.""")

# Accordion.
rep("""The button transition and the chevron transition carry Bootstrap's own `0.15s` and `0.2s` timings
rather than the motion tokens the Button family reads, because this family ships the release's
recorded surface. Each is written through the `transition` mixin, so the reduced-motion rule the
release records beside it is emitted with it, and each duration resolves to a `0s` duration under
that preference.""",
"""The button transition's durations read the `--vn-motion-feedback` token on the release's own
curves, so they resolve to the release's `0.15s` value at a factor of `1` and rescale with the
`--vn-factor-motion` factor. The chevron transition carries Bootstrap's own `0.2s` timing. Each is
written through the `transition` mixin, so the reduced-motion rule the release records beside it is
emitted with it, and each duration resolves to a `0s` duration under that preference.""")
rep("""- **The focus ring mixes the palette blue.** The release writes the ring's color as a literal, and
  the `--bs-accordion-btn-focus-box-shadow` property mixes the `--vn-palette-blue` token, which
  carries that literal, at the same quarter strength.
""", """- **The focus ring mixes the palette blue.** The release writes the ring's color as a literal, and
  the `--bs-accordion-btn-focus-box-shadow` property mixes the `--vn-palette-blue` token, which
  carries that literal, at the same quarter strength.
- **The button transition scales with the motion factor.** The release writes each duration in the
  `--bs-accordion-transition` property as `0.15s`; the partial writes each as the
  `--vn-motion-feedback` token, which resolves to that value at a factor of `1`, and keeps the
  release's `ease-in-out` curves and the `ease` curve on the radius.
""")
rep("""lifts, the forced-colors outline, the dark chevrons against an empty theme scope, the light and dark
modes, the density factor, and each transition at rest and under the staged preference.""",
"""lifts, the forced-colors outline, the dark chevrons against an empty theme scope, the light and dark
modes, the density factor, and each transition at rest and under the staged preference. It also
reads the button transitions the browser runs as the last item collapses: the release's durations
and curves at the resting motion factor, twice those durations at a doubled factor, and no
transition at a zero factor.""")

# Pagination.
rep("""The link transition carries Bootstrap's own `0.15s ease-in-out` rather than the motion tokens the
Button family reads, because this family ships the release's recorded surface and no published token
resolves to that easing. It is written through the `transition` mixin, so the reduced-motion rule the
release records beside it is emitted with it and the transition collapses under that preference.""",
"""The link transition's duration reads the `--vn-motion-feedback` token, which resolves to the
release's `0.15s` value at a factor of `1` and rescales with the `--vn-factor-motion` factor. Its
curve stays the release's `ease-in-out`, because no published token resolves to that easing. It is
written through the `transition` mixin, so the reduced-motion rule the release records beside it is
emitted with it and the transition collapses under that preference.""")
rep("""spellings, the refused pointer, the density and radius factors, a consumer's own override, and the
transition collapse under the staged preference.""",
"""spellings, the refused pointer, the density and radius factors, a consumer's own override, and the
transition collapse under the staged preference. It also reads the transitions the browser runs as a
page takes focus and the active class: the release's duration and curve at the resting motion
factor, twice that duration at a doubled factor, and no transition at a zero factor.""")

# Progress.
rep("""The bar's width transition is written through the `transition` mixin, so the reduced-motion
preference collapses it;""",
"""The bar's width transition multiplies the release's `0.6s` duration by the `--vn-factor-motion`
factor, so it resolves to the release's value at a factor of `1`, and keeps the release's `ease`
curve. It is written through the `transition` mixin, so the reduced-motion preference collapses it;""")
rep("""  `rgba(var(--vn-palette-white-rgb), 0.15)`, which resolves to the same color.
""", """  `rgba(var(--vn-palette-white-rgb), 0.15)`, which resolves to the same color.
- **The width transition scales with the motion factor.** The release writes the `width 0.6s ease`
  value in the `--bs-progress-bar-transition` property; the partial writes
  `width calc(600ms * var(--vn-factor-motion)) ease`, because no motion token resolves to that
  duration.
""")
rep("""The `tests/src/styles/components/progress.test.ts` proof reads the resolved track, bar, stripe,
transition, and animation in the browser, under each motion preference and in each color mode.""",
"""The `tests/src/styles/components/progress.test.ts` proof reads the resolved track, bar, stripe,
transition, and animation in the browser, under each motion preference and in each color mode. It
also reads the width transition the browser runs as the bar's width moves: the release's duration
and curve at the resting motion factor, twice that duration at a doubled factor, and no transition
at a zero factor.""")

# Factors.
rep("""A factor takes effect where the scale it multiplies is declared.""",
"""The motion factor scales every transition duration the cascade writes except the collapse, modal
dialog, offcanvas panel, carousel slide and indicator, and accordion chevron timings, which keep the
release's literals as their own sections record. A scaled duration reads a `--vn-motion-*` token or
multiplies the release's own duration by the factor, so it resolves to the release's value at a
factor of `1`, doubles at a factor of `2`, and starts no transition at a factor of `0`.

A factor takes effect where the scale it multiplies is declared.""")
open(p, 'w').write(s)
