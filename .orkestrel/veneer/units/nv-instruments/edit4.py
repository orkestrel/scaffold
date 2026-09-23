"""Adds the Nav classes section, the Files row, the card sentence, the plugin sentence, and the showcase sentence to the staged guide."""
import sys
sys.path.insert(0, '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nv-unit')
from rows import row, table_sep, widths
STAGE = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nv-stage'
path = f'{STAGE}/guides/veneer.md'
s = open(path).read()

section = open('/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nv-unit/nav-section.md').read()
if '### Nav classes' not in s:
    assert s.count('### Progress classes\n') == 1
    s = s.replace('### Progress classes\n', section + '### Progress classes\n')

old_card = """`.card-header-tabs .nav-link.active` names `.nav-link`, which is Navigation's class. This partial
declares no rule for that class and no rule selects it alone, so the combinator matches nothing
until a consumer brings the tab markup. It is the ruling the container's navigation combinators and
the icon link's `.bi` combinator already carry: the declarations are self-contained on the element
Veneer owns.
"""
new_card = """The `.card-header-tabs .nav-link.active` combinator names the `.nav-link` class, which the nav key
ships, and this partial writes the combinator because the release writes it in its own card partial.
The card specimens carry the release's header markup: a nav list carrying the `.nav-tabs` class or
the `.nav-pills` class beside the card's own header class, with each link inside its item. The
card's header rules tie with the nav rules on specificity, and the barrel loads the card partial
after the nav partial, as the release does, so a tabs strip inside a header drops the strip line and
its active tab paints in the card's own surface.
"""
if old_card in s:
    s = s.replace(old_card, new_card)

old_accept = 'An accepted row records scope; a named Proof step obliges the official recording to agree with the'
plugin = 'A `plugin` row records a behavior J-ENGINE owns, while the classes that behavior sets ship in the\ncascade and render in markup.\n\n'
if 'A `plugin` row records' not in s:
    assert s.count(old_accept) == 1
    s = s.replace(old_accept, plugin + old_accept)

old_show = """label level with the control beside it at each size and as the legend of a group.
"""
new_show = old_show + """A Nav region follows the Input group region, carrying the plain links, the tabs over a pane with one
tab's menu open, the pills, the underline, the filled and justified rows, and the tab panes, each
state class set in markup.
"""
if 'A Nav region follows' not in s:
    assert s.count(old_show) == 1
    s = s.replace(old_show, new_show)

lines = s.split('\n')
if not any(l.startswith('| `src/styles/components/_nav.scss`') for l in lines):
    at = next(i for i, l in enumerate(lines) if l.startswith('| `src/styles/components/_button-group.scss`'))
    ws = widths(table_sep(lines, at))
    lines[at + 1:at + 1] = [row(['`src/styles/components/_nav.scss`', 'The nav row, its links and their states, the tabs, pills, and underline forms, the filled and justified rows, and the tab panes in the components layer.'], ws)]
open(path, 'w').write('\n'.join(lines))
print('edited')
