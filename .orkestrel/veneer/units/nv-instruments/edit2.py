"""Adds the nav departure table and the forced-colors addition row to the staged guide."""
import sys
sys.path.insert(0, '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nv-unit')
from rows import row, table_sep, widths

STAGE = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nv-stage'
path = f'{STAGE}/guides/veneer.md'
lines = open(path).read().split('\n')

def code(v):
    return f'`{v}`'

header = ['Component', 'Selector', 'Property', 'Condition', 'Bootstrap 5.3.8', 'Veneer', 'Departure']
data = [
    ['nav', '.nav', '--bs-nav-link-padding-x', '1rem', 'var(--vn-space-8)'],
    ['nav', '.nav', '--bs-nav-link-padding-y', '0.5rem', 'var(--vn-space-4)'],
    ['nav', '.nav-link:focus-visible', 'box-shadow', '0 0 0 0.25rem rgba(13, 110, 253, 0.25)', '0 0 0 0.25rem color-mix(in srgb, var(--vn-palette-blue) 25%, transparent)'],
    ['nav', '.nav-pills', '--bs-nav-pills-link-active-color', '#fff', 'var(--vn-palette-white-base)'],
    ['nav', '.nav-pills', '--bs-nav-pills-link-active-bg', '#0d6efd', 'var(--vn-palette-blue)'],
    ['nav', '.nav-underline', '--bs-nav-underline-gap', '1rem', 'var(--vn-space-8)'],
]
cells = [[code(c), code(s), code(p), '—', code(b), code(v), 'tokenized'] for c, s, p, b, v in data]
ws = [max(len(r[i]) for r in cells + [header]) for i in range(len(header))]
table = [row(header, ws), '| ' + ' | '.join('-' * w for w in ws) + ' |'] + [row(r, ws) for r in cells]
if '#### `nav`' not in lines:
    at = lines.index('#### `card`')
    lines[at:at] = ['#### `nav`', ''] + table + ['']

start = lines.index('### Additions')
end = lines.index('### Outside the ledger')
anchor = max(i for i in range(start, end) if lines[i].startswith('| `btn-close`    | `.btn-close:focus { outline }`'))
ws = widths(table_sep(lines, anchor))
addition = ['`nav`', '`.nav-link:focus-visible { outline }`', '`@media (forced-colors: active)`', 'declaration', 'Under forced colors the ring is drawn as a system-color outline, because the shadow it is drawn with elsewhere is not painted there.']
if not any(l.startswith('| `nav`') for l in lines[start:end]):
    lines[anchor + 1:anchor + 1] = [row(addition, ws)]
open(path, 'w').write('\n'.join(lines))
print('edited')
