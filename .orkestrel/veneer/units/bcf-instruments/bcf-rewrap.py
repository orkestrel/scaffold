#!/usr/bin/env python3
"""Rewrites two specimen TSDoc paragraphs in the constants file and rewraps each at 100 columns."""
import textwrap
p = '/home/user/veneer-bcf/app/browser/constants.ts'
s = open(p).read()

def rewrite(start_marker, end_marker, new_text):
	global s
	start = s.index(start_marker)
	start = s.rindex('\n', 0, start) + 1
	end = s.index(end_marker, start)
	end = s.index('\n', end) + 1
	wrapped = textwrap.fill(' '.join(new_text.split()), width=97, break_long_words=False, break_on_hyphens=False)
	s = s[:start] + ''.join(f' * {line}\n' for line in wrapped.split('\n')) + s[end:]

rewrite(' * The tab whose menu is open carries the markup the dropdown script leaves', ' * and once as bare links, because the key writes a rule for each spelling.', """The tab whose menu is open carries the markup the dropdown script leaves: the toggle and the menu
carry `show`, and the item holding them carries none. The item carrying `show` in the tabs strip
is therefore a plain tab of its own, as it is in the pills and the underline rows. The tab whose
menu is open hangs that menu below the strip. The pane after the strip is the room the menu hangs
over: the room is in-flow content rather than a declared height, because an inline style is
refused on this surface, and a menu lying over the pane under its tab is the release's own
arrangement. The pane is taller than the menu at both widths the journey renders. The tab holding
the menu sits second in the strip, because the menu opens from its tab's start edge, and a tab
further along the strip would push the menu past the specimen's end at the narrow width. The
filled and justified rows each render their items twice, once as list items and once as bare
links, because the key writes a rule for each spelling.""")
open(p, 'w').write(s)
s = open(p).read()
rewrite(' * Every state is written in the markup, and no specimen carries a script: the collapsed bar', " * specimen's word, because the journey reaches a link by that name.", """Every state is written in the markup, and no specimen carries a script: the collapsed bar's
toggler carries the `collapsed` class over content without the `show` class, and the opened bar
carries the content's `show` class and the open menu the dropdown script leaves, whose toggle and
menu carry the `show` class. The opened bar's menu lies in the column's flow, so it needs no
reserved room. The bar whose menu hangs open is always expanded, so its list runs in the bar's row
and the open menu leaves the flow, hanging under its toggle over the body of the card that holds
the bar. That body is the room the menu lies over. The menu carries the static placement attribute
the dropdown script writes on a menu inside a bar, and its toggle leads the list, so the menu ends
inside the specimen at the narrow width. The always-expanded bar and every breakpoint bar carry a
toggler, a closed menu, and a scrolling list, so the rules hiding the toggler, placing the menu,
and releasing the list's overflow under each expand class have a subject. The dark attribute and
the dark class each sit on a card carrying the dark mode, because the bar paints no surface of its
own and a light page gives light text nothing to read against. The card's dark scope alone paints
a plain bar's brand white, so the class bar opens a light island with its own `data-bs-theme`
attribute, and the white it shows is the class's paint. Each breakpoint bar is derived from one
source list, so the steps cannot drift apart, and each link announces a name of its own, qualified
by its specimen's word, because the journey reaches a link by that name.""")
open(p, 'w').write(s)
