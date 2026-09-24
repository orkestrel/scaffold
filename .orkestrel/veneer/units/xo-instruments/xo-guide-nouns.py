# Gives each code token in the Alert classes and Carousel classes sections its noun, then reflows
# each edited paragraph to 100 columns.
import textwrap
p = '/home/user/veneer-xo/tmp/units/xo-shared/guides/veneer.md'
s = open(p).read()
pairs = [
# Alert classes
("inset and the bottom spacing read Veneer's density scale. The edge reads `--bs-border-width` and the\nradius reads `--bs-border-radius`, which this cascade declares over `--vn-radius-base`, so\n`--vn-factor-radius` reaches the alert's corners.",
 "inset and the bottom spacing read Veneer's density scale. The edge reads the `--bs-border-width` variable and the\nradius reads the `--bs-border-radius` variable, which this cascade declares over the `--vn-radius-base` token, so\nthe `--vn-factor-radius` token reaches the alert's corners."),
("takes the fixed `700` weight Bootstrap writes and paints from `--bs-alert-link-color`, which a\ncontextual role sets to its text tier; no published Veneer weight resolves to `700`, so that weight\nstays literal.",
 "takes the fixed `700` weight Bootstrap writes and paints from the `--bs-alert-link-color` variable, which a\ncontextual role sets to its text tier; no published Veneer weight resolves to the `700` value, so that weight\nstays literal."),
("is placed in that room: against the top and right edges of the alert's padding box, at\n`z-index: 2`, with a block inset of `1.25` times the inline one.",
 "is placed in that room: against the top and right edges of the alert's padding box, at the\nstacking level the `z-index: 2` declaration sets, with a block inset 1.25 times the inline one."),
("- **The spacing reads Veneer's density scale.** The release writes `1rem` for the alert's inset and\n  bottom spacing and `3rem` for the dismissible right padding;",
 "- **The spacing reads Veneer's density scale.** The release writes the `1rem` length for the alert's inset and\n  bottom spacing and the `3rem` length for the dismissible right padding;"),
("inside a dismissible alert, `1.25rem` and `1rem` in the release, is written over the same\n  `--vn-space-8` token, so `--vn-factor-density` moves the room and the control together.",
 "inside a dismissible alert, the `1.25rem` and `1rem` lengths in the release, is written over the same\n  `--vn-space-8` token, so the `--vn-factor-density` token moves the room and the control together."),
# Carousel classes
("A slide displays only when it carries the `active` class or an incoming class,\n`carousel-item-next` or `carousel-item-prev`. A direction class, `carousel-item-start` or\n`carousel-item-end`, marks where a slide is heading:",
 "A slide displays only when it carries the `active` class or an incoming class,\nthe `carousel-item-next` class or the `carousel-item-prev` class. A direction class, the `carousel-item-start` class or\nthe `carousel-item-end` class, marks where a slide is heading:"),
("slide holds its paint for the slide's `0.6s` before it drops to nothing.",
 "slide holds its paint for the slide's `0.6s` duration before it drops to nothing."),
("published motion token resolves to `0.6s`. The control's `0.15s` reads `--vn-motion-feedback`, so\n`--vn-factor-motion` rescales it.",
 "published motion token resolves to the `0.6s` duration. The control's `0.15s` duration reads the `--vn-motion-feedback` token, so\nthe `--vn-factor-motion` token rescales it."),
("and they brighten to\n`0.9` under the pointer and on focus.",
 "and they brighten to\nthe `0.9` opacity under the pointer and on focus."),
("The controls paint `--vn-palette-white-base`, which holds the\nrelease's white.",
 "The controls paint the `--vn-palette-white-base` token, which holds the\nrelease's white."),
("and the control reads `--bs-carousel-control-icon-filter` as its\nfilter,",
 "and the control reads the `--bs-carousel-control-icon-filter` variable as its\nfilter,"),
("clear of the control bands and inset by\n`--vn-space-8`, so `--vn-factor-density` rescales that inset.",
 "clear of the control bands and inset by\nthe `--vn-space-8` token, so the `--vn-factor-density` token rescales that inset."),
("A pip paints `--bs-carousel-indicator-active-bg` at half\nopacity,",
 "A pip paints the `--bs-carousel-indicator-active-bg` variable at half\nopacity,"),
("The caption sits over the\nlower part of the slide, inset `15%` from each side, and paints `--bs-carousel-caption-color`.",
 "The caption sits over the\nlower part of the slide, inset by a `15%` offset from each side, and paints the `--bs-carousel-caption-color` variable."),
("- **The prefixed backface property is absent.** The official cascade carries\n  `-webkit-backface-visibility` beside `backface-visibility` on the slide;",
 "- **The prefixed backface property is absent.** The official cascade carries\n  the `-webkit-backface-visibility` property beside the `backface-visibility` property on the slide;"),
("The recorded `#fff` becomes\n  `var(--vn-palette-white-base)`, and the recorded `opacity 0.15s ease` becomes\n  `opacity var(--vn-motion-feedback) var(--vn-ease-standard)`, which resolves to the same value and\n  rescales with `--vn-factor-motion`, as the `.btn` class does.",
 "The recorded `#fff` value becomes\n  the `var(--vn-palette-white-base)` value, and the recorded `opacity 0.15s ease` transition becomes\n  the `opacity var(--vn-motion-feedback) var(--vn-ease-standard)` transition, which resolves to the same value and\n  rescales with the `--vn-factor-motion` token, as the `.btn` class does."),
("The recorded `1rem` bottom margin becomes\n  `var(--vn-space-8)`, which resolves to the same value and rescales with `--vn-factor-density`.",
 "The recorded `1rem` bottom margin becomes\n  the `var(--vn-space-8)` value, which resolves to the same length and rescales with the `--vn-factor-density` token."),
("The recorded `#000` for the pip and the caption becomes\n  `var(--vn-palette-black-base)`, which holds the same bytes.",
 "The recorded `#000` value for the pip and the caption becomes\n  the `var(--vn-palette-black-base)` value, which holds the same bytes."),
]
touched = []
for old, new in pairs:
	assert s.count(old) == 1, old[:80]
	s = s.replace(old, new)
	touched.append(new)
# Reflow each paragraph holding an edited span.
blocks = s.split('\n\n')
out = []
for block in blocks:
	if any(t in block for t in touched) and not block.startswith('|') and not block.startswith('```'):
		if block.startswith('- '):
			items = block.split('\n- ')
			wrapped = []
			for n, item in enumerate(items):
				text = ' '.join(line.strip() for line in item.split('\n'))
				if n == 0:
					text = text[2:]
				lines = textwrap.wrap(text, width=98, break_long_words=False, break_on_hyphens=False)
				wrapped.append('- ' + '\n  '.join(lines))
			out.append('\n'.join(wrapped))
		else:
			text = ' '.join(line.strip() for line in block.split('\n'))
			out.append('\n'.join(textwrap.wrap(text, width=100, break_long_words=False, break_on_hyphens=False)))
	else:
		out.append(block)
s = '\n\n'.join(out)
open(p, 'w').write(s)
