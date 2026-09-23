### Carousel classes

The carousel key ships whole: the track and its slides, the incoming and outgoing slide states, the
fade variant, the controls and their marks, the indicators, the caption, and the dark class. Each
state is a class set in markup. This section describes what each class renders, and
§ Compatibility records the plugin that moves a carousel between the classes as an engine
obligation. The engine reads the `slide` class to decide whether a change animates, and no Veneer
rule reads it.

The track clears its floated slides and clips what overflows it. Every slide takes the whole track
and floats with a negative right margin, so each displayed slide sits in the same place until a
transform moves it. A slide displays only when it carries the `active` class or an incoming class,
`carousel-item-next` or `carousel-item-prev`. A direction class, `carousel-item-start` or
`carousel-item-end`, marks where a slide is heading: a resting slide carrying one moves a whole
width that way, and an incoming slide carrying the matching one sits in the track. An incoming
slide carrying no direction class rests one width outside the track, on the side it arrives from.
The elements layer draws every `img` element as a block, so a slide is exactly as tall as its
picture and needs no display utility.

The `carousel-fade` class stacks the slides in place and crosses their opacity instead of moving
them: the resting and the incoming slide paint at full opacity above the others, and the outgoing
slide holds its paint for the slide's `0.6s` before it drops to nothing. Each transition — the
slide's move, the outgoing slide's hold, the control's opacity, and the indicator's opacity — is
written through the `transition` mixin, so each one resolves to no transition under the
reduced-motion preference. The slide and indicator durations are Bootstrap's literals, because no
published motion token resolves to `0.6s`. The control's `0.15s` reads `--vn-motion-feedback`, so
`--vn-factor-motion` rescales it.

The controls cover a `15%` band at each side of the carousel at half opacity, and they brighten to
`0.9` under the pointer and on focus. Focus removes the outline, so the opacity change is the focus
indication, and forced colors keep it. The controls paint `--vn-palette-white-base`, which holds the
release's white. Each mark is a data URI whose white fill sits inside the asset, because a data URI
cannot read a custom property, and the control reads `--bs-carousel-control-icon-filter` as its
filter, which is what inverts the white mark over a light picture. The release appends each mark
with the other direction's mark in a right-to-left annotation; that annotation does not ship, so
each mark points the same way whatever the document's writing direction.

The indicators sit at the foot of the carousel, clear of the control bands and inset by
`--vn-space-8`, so `--vn-factor-density` rescales that inset. Each pip is a `30px` by `3px` bar
inside transparent `10px` top and bottom borders, sized as a content box, so the target the pointer
reaches is taller than the bar it paints. A pip paints `--bs-carousel-indicator-active-bg` at half
opacity, and the pip carrying the `active` class paints at full opacity. The caption sits over the
lower part of the slide, inset `15%` from each side, and paints `--bs-carousel-caption-color`.

The theme scopes declare the three `--bs-carousel-*` variables: a white caption, white pips, and no
filter in light, and their dark counterparts in dark, so a carousel inside a dark island paints dark
on its own. The `.carousel-dark` class declares the same dark values on the carousel itself, read
from the dark closure the dark theme scope reads, which is the opt-in for a carousel over light
pictures inside a light island. A light island nested inside a dark one restores the light values.

These are the key's recorded departures.

- **The prefixed backface property is absent.** The official cascade carries
  `-webkit-backface-visibility` beside `backface-visibility` on the slide; Veneer emits the standard
  property alone, the ruling the icon link already carries.
- **The controls paint the white token and read the feedback duration.** The recorded `#fff` becomes
  `var(--vn-palette-white-base)`, and the recorded `opacity 0.15s ease` becomes
  `opacity var(--vn-motion-feedback) var(--vn-ease-standard)`, which resolves to the same value and
  rescales with `--vn-factor-motion`, as the `.btn` class does.
- **The indicator inset reads the space token.** The recorded `1rem` bottom margin becomes
  `var(--vn-space-8)`, which resolves to the same value and rescales with `--vn-factor-density`.
- **The dark class paints the black token.** The recorded `#000` for the pip and the caption becomes
  `var(--vn-palette-black-base)`, which holds the same bytes.

The Carousel region renders a captioned carousel, a fading one, an inverted one over light pictures,
and one caught advancing to its next slide, each slide a fluid image over an inline SVG document.
The inverted specimen carries the `.carousel-dark` class and is named for what that class does,
because a capture scenario's name carries no mode word. Each control is named by its `aria-label`
attribute, because the visually hidden label the release's markup writes is a utility this cascade
does not ship. The region renders no slide carrying an incoming class alone and no carousel carrying
the `pointer-event` class, and the capture registry declines both frames: the lone incoming slide
rests outside its track, so its frame would be the resting frame, and the swipe class changes no
paint. The backward advance and the fade's outgoing slide take no specimen either, because each
leaves the incoming slide at rest in the track, the paint the advancing and the fading frames
already carry.

The `tests/src/styles/components/carousel.test.ts` proof reads each resolved treatment in the
browser: the written selectors, the displayed slides, the track's clearing and clip, both advancing
directions and the lone incoming slide, the fade's stacking and hold, every transition at rest and
under the staged reduced-motion preference, the motion and density factors, the controls, their
marks, and their states under the pointer, on focus, and under forced colors, the pips, the
caption, the swipe class, and the dark class beside a dark island and a nested light one.
