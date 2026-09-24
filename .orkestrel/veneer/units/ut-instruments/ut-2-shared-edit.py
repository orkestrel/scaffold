#!/usr/bin/env python3
"""Applies the round-2 shared edits on top of the round-1 shared patch in the validation copy."""
import os
os.chdir('/home/user/veneer-ut/tmp/probe/base')
def swap(p, a, b, count=1):
    s = open(p).read()
    assert s.count(a) == count, (p, a[:90], s.count(a))
    open(p, 'w').write(s.replace(a, b))
# T-d: the barrel and the order case, skipped where a run already applied them.
if "@use 'utilities/color-bg';" not in open('src/styles/index.scss').read():
    swap('src/styles/index.scss', "@use 'utilities/link';\n", "@use 'utilities/color-bg';\n@use 'utilities/link';\n")
    swap('tests/conformance.test.ts', "\t\t\t'color-bg': 'utilities/color',\n", "\t\t\t'color-bg': 'utilities/color-bg',\n")
    swap('tests/conformance.test.ts', "\t\t\t\t'components/text-truncation',\n\t\t\t\t'utilities/link',\n", "\t\t\t\t'components/text-truncation',\n\t\t\t\t'utilities/color-bg',\n\t\t\t\t'utilities/link',\n")
    swap('tests/conformance.test.ts', """	// `utilities` directory, and each record names the paths that differ. The `color-bg` helper's
	// rules head the `color` utility partial, so that partial takes the utility's place in the
	// order. The link entries follow the text colors in that partial, where the map writes them, so
	// the `colored-links` helper alone takes the `link` partial ahead of every utility partial.
""", """	// `utilities` directory, and each record names the paths that differ. The `color-bg` helper and
	// the `colored-links` helper each take a partial of their own ahead of every utility partial, in
	// the release's helper order. The link entries follow the text colors in the `color` partial,
	// where the map writes them.
""")
# T-c, T-e, T-f: the constants.
swap('app/browser/constants.ts', """ * Each line is labeled with the classes it demonstrates. A line whose behaviour depends on the room
 * it has renders inside a column, so the line meets the column's edge at every width: the wrapping
 * lines and the broken word sit in the narrowest column the grid ships, which is narrower than
 * each of them at both journey widths and leaves the unwrapped line inside the page at the
 * narrowest one, and the truncated line sits""", """ * Each line is labeled with the classes it demonstrates. A line whose behavior depends on the room
 * it has renders inside a column, so the line meets the column's edge at every width: the wrapping
 * lines and the broken word sit in a two-twelfths column, which is narrower than each of them at
 * the 390 and 1280 journey widths and leaves the unwrapped line inside the page at the 390 width,
 * and the truncated line sits""")
swap('app/browser/constants.ts', "the white colors on the dark pair, and the black colors on the light pair.", "the white colors on the dark pair, and the dark role and the black colors on the light pair.")
swap('app/browser/constants.ts', "and the pairs that set a readable foreground on each role's fill.", "and the pairs that set the foreground the release records on each role's fill.")
swap('app/browser/constants.ts', """			.map((role) =>
				role === 'light'
					? '<p class="text-bg-dark"><span class="text-light">text-light</span></p>'
					: `<p class="text-${role}">text-${role}</p>`,
			)""", """			.map((role) => {
				if (role === 'light')
					return '<p class="text-bg-dark"><span class="text-light">text-light</span></p>'
				if (role === 'dark')
					return '<p class="text-bg-light"><span class="text-dark">text-dark</span></p>'
				return `<p class="text-${role}">text-${role}</p>`
			})""")
