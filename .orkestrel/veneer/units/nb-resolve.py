#!/usr/bin/env python3
"""nb-resolve.py: resolve the NAVBAR shared patch's three-way conflicts on the session tip (the TOGGLES landing and
later, over a658879), read from diff3-style blocks (`git -c merge.conflictStyle=diff3 apply --3way`). The collisions
the plan reserved for the Orchestrator's ruling are ruled here by name, each keyed by the first line of its ours side:
the guide's § Dropdown classes sentence (TOGGLES ships the split toggle, NAVBAR ships the tab and navbar menus, so nothing
of the dropdown key stays withheld), the dropdown ledger cell (both withheld clauses go), the asset paragraphs (the
navbar toggler icon joins the select, switch, and accordion images on their own dark rules, and the "Bootstrap also
retunes" paragraph goes because no image stays in the theme scope), the token map's two comments (ACCORDION's chevrons
and NAVBAR's toggler icon named together), the `$assets` entries (both sides removed theirs, so the map empties for the
retirement patch to delete), the conformance comment (the nav and navbar partials, then the accordion partial), and
the glyph-map comment. A block whose ours and theirs lines are table rows is left as ours then theirs (the deferral
table is rebuilt by table-merge3.py afterwards; the ledger's two blocks are an append and a ruled cell). Every other
block keeps ours then theirs (an append conflict at a landed insertion point). A ruled prose block's enclosing
paragraph is re-flowed at 100 columns; a ruled comment carries its own line breaks. `land-seams.py` and
`sort-inventories.py` follow. Refuses a block whose ours first line matches no ruling when both sides changed the same
base text (a prose or comment collision this file does not rule)."""
import re, sys, subprocess, textwrap
files = [l[3:] for l in subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True).stdout.split('\n') if l.startswith('UU')]
pat = re.compile(r'<<<<<<< ours\n(.*?)\|\|\|\|\|\|\| base\n(.*?)=======\n(.*?)>>>>>>> theirs\n', re.S)
MARK = '\x00REFLOW\x00'
RULINGS = {
	'key records, the split toggle included, ship from the partials that write them. § Input group': (MARK, "key records, the split toggle included, ship from the partials that write them, and the tab and navbar menu names ship from the nav and navbar partials. § Input group classes and § Button group classes describe the split-toggle partials.\n"),
	'The theme scopes declare `--bs-carousel-indicator-active-bg`, `--bs-carousel-caption-color`, and': ('', "The theme scopes declare `--bs-carousel-indicator-active-bg`, `--bs-carousel-caption-color`, and\n`--bs-carousel-control-icon-filter` with the release's own light and dark values, written through a\npalette token where the release writes a literal. The release records those theme-scope declarations\nunder its `theme` vocabulary rather than under the `carousel` key, so no ledger row measures them\nthere. The `carousel` key measures the same variables where the `.carousel-dark` class declares\nthem, and its rows in § Departures record the black the class paints through\n`--vn-palette-black-base`. The control marks keep the release's filter treatment, because a data URI\ncannot read a custom property; a `mask-image` treatment is outside the baseline.\n`--bs-btn-close-filter` belongs to the `btn` vocabulary instead, so § Departures measures it, and\nits rows there record the empty light-scope declaration this cascade writes against the filter the\nrelease records.\n\nThe `--bs-form-select-bg-img`, `--bs-form-switch-bg`, `--bs-accordion-btn-icon`,\n`--bs-accordion-btn-active-icon`, and `--bs-navbar-toggler-icon-bg` variables are declared on the\nselect's, the switch's, the accordion button's, and the toggler icon's own dark rules by their\npartials instead, so a light island nested inside a dark one keeps the dark caret, knob, chevrons,\nand icon the same way the release does.\n"),
	'// The forms and accordion glyphs Bootstrap paints in the light mode, each as the escaped data URI': ('', "// The forms glyphs, the accordion chevrons, and the navbar toggler icon at their light values, each\n// as the escaped data URI the release compiles its own variable to.\n"),
	'// `--bs-*` variable the component rule reads, never by reaching into this map. The caret, the': ('', "// `--bs-*` variable the component rule reads, never by reaching into this map. The caret, the\n// unchecked knob, the accordion chevrons, and the toggler icon also carry a `$dark` entry under the\n// same key, because the release gives each of those a second value under its dark component rule.\n"),
	"\t'toggler-icon': '--bs-navbar-toggler-icon-bg',": ('', ''),
	"\t// sequence, the nav partial joins the block at the release's position between the button": ('', "\t// sequence, the nav and navbar partials join the block at the release's position between the\n\t// button group and the card, and the accordion partial joins it between the card and the\n\t// breadcrumb. The release also imports its helpers from one partial and declares its utilities\n"),
	'\t\t// The map carries a glyph for every form control and accordion button the release paints,': ('', "\t\t// The map carries a glyph for every form control and accordion button the release paints and the\n\t\t// navbar toggler's light icon, and no shipped rule reads most of them until the check and select\n\t\t// partials land. Each value is compiled out of the map itself and held against the release\n\t\t// declaration that bakes it, named by its own site, so a retinted or re-encoded glyph reports\n\t\t// here rather than under the comment that names its release variable.\n"),
}
def lines(s):
	return s.strip('\n').split('\n') if s.strip('\n') else []
def is_table(ls):
	return bool(ls) and all(l.startswith('| ') for l in ls)
def dropdown_cell(ours):
	old = 'less the navigation names recorded under § Styles; '
	if ours.count(old) != 1:
		sys.exit('dropdown ledger cell: anchor count ' + str(ours.count(old)))
	return ours.replace(old, '')
report = []
for f in files:
	s = open(f).read()
	shapes = []
	def resolve(m):
		ours, base, theirs = m.group(1), m.group(2), m.group(3)
		ol, bl, tl = lines(ours), lines(base), lines(theirs)
		first = ol[0] if ol else ''
		if first in RULINGS:
			mark, text = RULINGS[first]
			shapes.append('ruled: ' + first[:50])
			return mark + text
		if ol and ol[0].startswith('| dropdown         | selector') and tl and tl[0].startswith('| dropdown         | selector'):
			shapes.append('ruled: the dropdown ledger cell')
			return dropdown_cell(ours)
		if is_table(ol) and is_table(tl):
			shapes.append('table rows: ours then theirs')
			return ours + theirs
		if bl and (ours != base and theirs != base) and not (ours.startswith(base) or theirs.startswith(base)):
			sys.exit(f'unruled collision in {f}: ours {first[:70]!r}')
		return ours + theirs
	n = len(pat.findall(s))
	s2 = pat.sub(resolve, s)
	if '<<<<<<<' in s2 or '>>>>>>>' in s2 or '|||||||' in s2:
		sys.exit(f'unresolved markers in {f}')
	if MARK in s2:
		paragraphs = s2.split('\n\n')
		for i, p in enumerate(paragraphs):
			if MARK in p:
				flat = ' '.join(l.strip() for l in p.replace(MARK, '').split('\n') if l.strip())
				paragraphs[i] = textwrap.fill(flat, width=100, break_long_words=False, break_on_hyphens=False)
		s2 = '\n\n'.join(paragraphs)
	open(f, 'w').write(s2)
	report.append(f'{f}: {n} block(s)' + (' — ' + '; '.join(shapes) if shapes else ''))
print('\n'.join(report))
