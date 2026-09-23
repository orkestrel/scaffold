"""Writes the DROPDOWN guide additions into the guide at the path given, which must be the c3ac297 text.

Usage: python3 apply-guide.py GUIDE, then oxfmt over the guide to re-pad the rows the script edits.
Reads section.md and r1-guide-added.txt beside this script: the section text, and the round-1 guide
patch's added lines, from which the § Files row, the deferral rows, and the departure table are taken.
"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
path = sys.argv[1]
text = open(path).read()
added = open(os.path.join(HERE, 'r1-guide-added.txt')).read().split('\n')
section = open(os.path.join(HERE, 'section.md')).read()


def once(old, new):
    global text
    assert text.count(old) == 1, (old[:90], text.count(old))
    text = text.replace(old, new)


def insert_after_line(prefix, lines):
    global text
    rows = text.split('\n')
    hits = [i for i, row in enumerate(rows) if row.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    rows[hits[0] + 1:hits[0] + 1] = lines
    text = '\n'.join(rows)


def insert_before_line(prefix, lines):
    global text
    rows = text.split('\n')
    hits = [i for i, row in enumerate(rows) if row.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    rows[hits[0]:hits[0]] = lines
    text = '\n'.join(rows)


# § Files: the partial's row before the button-group row, as round 1 placed it.
files_row = [row for row in added if row.startswith('| `src/styles/components/_dropdown.scss`')]
assert len(files_row) == 1
insert_before_line('| `src/styles/components/_button-group.scss`', files_row)

# The section, at its post-BPO position: directly before the button-group section.
once('### Button group classes\n', section + '\n### Button group classes\n')

# § Deferred selectors: the round-1 rows after the table's last row.
deferred = [row for row in added if row.startswith('| `.dropdown-toggle-split') or row.startswith('| `.dropup .dropdown-toggle-split')
            or row.startswith('| `.dropend .dropdown-toggle-split') or row.startswith('| `.dropstart .dropdown-toggle-split')
            or row.startswith('| `.nav-tabs .dropdown-menu`') or row.startswith('| `.navbar')]
assert len(deferred) == 13, len(deferred)
insert_after_line('| `.offcanvas-header .btn-close`', deferred)

# The departure table, after the validation tables and before the card table (the barrel's order).
start = added.index('#### `dropdown`')
table = added[start:start + 2]
for row in added[start + 2:]:
    table.append(row)
    if row == '':
        break
assert table[2].startswith('| Component') and table[-1] == '', table[:3]
once('#### `card`\n', '\n'.join(table) + '\n#### `card`\n')

# § Compatibility: the selector and variable rows after the pagination rows, with each code token
# taking its noun, and the plugin row after the table's last row with the owner named as the family
# names it, then the R8 sentence in NAV's wording.
selector_row = [row for row in added if row.startswith('| dropdown         | selector')]
variable_row = [row for row in added if row.startswith('| dropdown         | variable')]
plugin_row = [row for row in added if row.startswith('| engine           | plugin')]
assert len(selector_row) == len(variable_row) == len(plugin_row) == 1
variable = variable_row[0].replace(
    'declared on `.dropdown-menu` and retuned by `.dropdown-menu-dark`, and every alignment class declares `--bs-position`;',
    'declared on the `.dropdown-menu` class and retuned by the `.dropdown-menu-dark` class, and every alignment class declares the `--bs-position` property;',
)
assert variable != variable_row[0]
plugin = plugin_row[0].replace('centering included. J-ENGINE owns it.', 'centering included. Owner: J-ENGINE.')
assert plugin != plugin_row[0]
insert_after_line('| pagination       | variable', [selector_row[0], variable])
insert_after_line('| engine           | initialization | util/index.js: `getjQuery`', [
    plugin,
    '',
    'A `plugin` row records a behavior J-ENGINE owns, while the classes that behavior sets ship in the',
    'cascade and render in markup.',
])

# § Tests: each link in its alphabetical position.
once(
    '[content specimens](../tests/app/browser/sections/ContentSection.test.ts),\n',
    '[content specimens](../tests/app/browser/sections/ContentSection.test.ts),\n'
    '[dropdown specimens](../tests/app/browser/sections/DropdownSection.test.ts),\n',
)
once(
    '[the close classes](../tests/src/styles/components/close.test.ts),\n',
    '[the close classes](../tests/src/styles/components/close.test.ts),\n'
    '[the dropdown classes](../tests/src/styles/components/dropdown.test.ts),\n',
)

open(path, 'w').write(text)
