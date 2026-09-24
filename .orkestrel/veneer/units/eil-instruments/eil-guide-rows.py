#!/usr/bin/env python3
# Rewrites the dd departure rows and the dl, dd, blockquote, and figure addition rows in the guide
# ledger, keeping every cell inside its table's padded width so the formatter re-pads no other row.
p = '/home/user/veneer-eil/guides/veneer.md'
lines = open(p).read().split('\n')

def cells(line):
    return [cell.strip() for cell in line.strip().strip('|').split('|')]

def find(predicate):
    found = [index for index, line in enumerate(lines) if predicate(line)]
    assert len(found) == 1, found
    return found[0]

def pad(template, values):
    widths = [len(cell) for cell in template.strip().strip('|').split('|')]
    out = []
    for width, value in zip(widths, values):
        text = f' {value} '
        assert len(text) <= width, (value, len(text), width)
        out.append(text.ljust(width))
    return '|' + '|'.join(out) + '|'

departure = find(lambda l: l.startswith('| `reboot`') and cells(l)[1] == '`dd`' and cells(l)[2] == '`margin-bottom`')
lines[departure] = pad(lines[departure], ['`reboot`', '`dd`', '`margin-bottom`', '—', '`0.5rem`', '`var(--vn-space-4)`', 'tokenized'])
del lines[find(lambda l: l.startswith('| `reboot`') and cells(l)[1] == '`dd`' and cells(l)[2] == '`margin-left`')]

def addition(name):
    return find(lambda l: l.startswith('| `reboot`') and len(cells(l)) == 5 and cells(l)[1] == name)

def row(template, name, category, reason):
    return pad(template, ['`reboot`', f'`{name}`', '—', category, reason])

anchor = addition('`dl { display }`')
template = lines[anchor]
for name in ['`dl { grid-template-columns }`', '`dl { gap }`', '`dd { margin }`']:
    del lines[addition(name)]
lines[anchor:anchor + 1] = [
    row(template, 'dl:not([class])', 'selector', "Elements lays a bare description list out as a two-column grid, which the release leaves as flow content; a list carrying a class, such as `.row`, keeps the flow."),
    row(template, 'dt { grid-column }', 'declaration', "Elements holds every term in the first column of a bare list's grid, whatever its neighbors; a flex row ignores the placement."),
    row(template, 'dd { grid-column }', 'declaration', "Elements holds every description in the second column of a bare list's grid, whatever its neighbors; a flex row ignores the placement."),
]
anchor = addition('`blockquote { padding-left }`')
for name in ['`blockquote { border-left }`', '`blockquote { font-style }`']:
    del lines[addition(name)]
lines[anchor] = row(lines[anchor], 'blockquote:not([class])', 'selector', "Elements marks a bare quotation with an inline-start rule, inset text, and italic type; the `.blockquote` class keeps the release's upright, unruled block.")
anchor = addition('`figure { display }`')
for name in ['`figure { flex-direction }`', '`figure { gap }`']:
    del lines[addition(name)]
lines[anchor] = row(lines[anchor], 'figure:not(:has(> .blockquote))', 'selector', "Elements stacks a figure and its caption in a column; a figure holding the `.blockquote` class keeps the release's flow, where the footer meets the quotation's edge.")
open(p, 'w').write('\n'.join(lines))
