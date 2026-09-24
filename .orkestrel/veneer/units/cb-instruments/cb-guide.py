# Applies the BARE-BUTTON guide edits to the scratch copy's guide.
import sys
path = sys.argv[1]
lines = open(path, encoding='utf-8').read().split('\n')

def split_row(line):
    return [c for c in line.split('|')[1:-1]]

def render_row(cells, widths):
    return '|' + '|'.join(' ' + c.ljust(w) + ' ' for c, w in zip(cells, widths)) + '|'

def widths_of(sep_line):
    return [len(c) - 2 for c in split_row(sep_line)]

def find_sep_above(i):
    while not set(lines[i].replace('|', '').replace(' ', '')) <= set('-'):
        i -= 1
    return i

# The Files row.
row = next(i for i, l in enumerate(lines) if l.startswith('| `src/styles/elements/_button.scss`'))
w = widths_of(lines[find_sep_above(row)])
lines[row] = render_row(['`src/styles/elements/_button.scss`', "The release's reboot on every button, and the calibrated surface and its states on a button no class claims, in the elements layer."], w)

# The reboot departure rows.
for prop in ['border-radius', 'font-family', 'font-size', 'line-height']:
    hits = [i for i, l in enumerate(lines) if l.startswith('| `reboot`  | `button`      | `' + prop + '`')]
    assert len(hits) == 1, prop
    del lines[hits[0]]

# The additions rows.
first = next(i for i, l in enumerate(lines) if l.startswith('| `reboot`       | `button { padding }`'))
last = next(i for i, l in enumerate(lines) if l.startswith('| `reboot`       | `button:disabled`'))
w = widths_of(lines[find_sep_above(first)])
name = 'button:not([class], [data-bs-target])'
rows = [
    (name, '—', "Elements paints a button no class claims with the calibrated button surface, which the release leaves unpainted."),
    (name, '`@media (prefers-reduced-motion: reduce)`', "The release declares no transition on a button no class claims, and the `transition` mixin writes this one with its reduced-motion pair."),
    (name + ':hover', '—', "Elements repaints a button no class claims on hover, which the release leaves to its button component."),
    (name + ':active', '—', "Elements repaints a button no class claims while it is pressed, which the release leaves to its button component."),
    (name + ':focus-visible', '—', "Elements rings a button no class claims on keyboard focus, which the release leaves to its button component."),
    (name + ':focus-visible', '`@media (forced-colors: active)`', "The focus ring is repainted in system colors under forced colors, which the release does not query."),
    (name + ':disabled', '—', "Elements dims a disabled button no class claims, which the release leaves to its button component."),
]
lines[first:last + 1] = [render_row(['`reboot`', '`' + n + '`', c, 'selector', r], w) for n, c, r in rows]

open(path, 'w', encoding='utf-8').write('\n'.join(lines))
