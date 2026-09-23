"""Adds the nav compatibility, plugin, and deferral rows to the staged guide, and nav to the shipped lists."""
import sys
sys.path.insert(0, '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nv-unit')
from rows import row, table_sep, widths

STAGE = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nv-stage'
path = f'{STAGE}/guides/veneer.md'
lines = open(path).read().split('\n')

def find(prefix, last=False):
    hits = [i for i, l in enumerate(lines) if l.startswith(prefix)]
    if not hits:
        raise SystemExit(f'no anchor {prefix}')
    return hits[-1] if last else hits[0]

# Compatibility: the nav selector and variable rows after the pagination rows.
at = find('| pagination       | variable')
ws = widths(table_sep(lines, at))
nav = [
    ['nav', 'selector', 'Every official `.nav` selector ships in the components layer, the tabs, pills, underline, fill, justified, and tab-pane rules included, less the `.navbar` combinators recorded under § Styles; resolved behavior is proved in `tests/src/styles/components/nav.test.ts`.', '—', 'shipped'],
    ['nav', 'variable', 'Every official `--bs-nav-link-*`, `--bs-nav-tabs-*`, `--bs-nav-pills-*`, and `--bs-nav-underline-*` property is declared on its own class; each one is read beside the property it drives in `tests/src/styles/components/nav.test.ts`.', '—', 'shipped'],
]
if not any(l.startswith('| nav              | selector') for l in lines):
    lines[at + 1:at + 1] = [row(r, ws) for r in nav]

# Compatibility: the Tab and ScrollSpy plugin rows after the last engine row.
at = find('| engine ', last=True)
ws = widths(table_sep(lines, at))
plugins = [
    ['engine', 'plugin', 'Tab: `[data-bs-toggle="tab\\|pill\\|list"]` shows the pane its trigger names through `show()`; fires `hide.bs.tab`, `hidden.bs.tab`, `show.bs.tab`, and `shown.bs.tab` with `relatedTarget`, `show` and `hide` cancelable; arrow keys, `Home`, and `End` move focus; writes `role`, `aria-selected`, `tabindex`, and `active`. Owner: J-ENGINE.', '—', 'accepted'],
    ['engine', 'plugin', 'ScrollSpy: `[data-bs-spy="scroll"]` observes the sections its `target` links name through `IntersectionObserver` (`rootMargin`, `threshold`, `offset`, `smoothScroll`); `refresh()`, `dispose()`; fires `activate.bs.scrollspy` with `relatedTarget` and no cancelable event; moves `active`. Owner: J-ENGINE.', '—', 'accepted'],
]
if not any('Tab: `[data-bs-toggle' in l for l in lines):
    lines[at + 1:at + 1] = [row(r, ws) for r in plugins]

# Deferred selectors: the navbar-bearing nav names, owner Navbar, after the table's last row.
start = find('### Deferred selectors')
end = find('### Departures from the workspace rows')
last = max(i for i in range(start, end) if lines[i].startswith('| '))
ws = widths(table_sep(lines, last))
names = [
    '.navbar-nav .nav-link.active',
    '.navbar-nav .nav-link.show',
    '.navbar-expand-sm .navbar-nav .nav-link',
    '.navbar-expand-md .navbar-nav .nav-link',
    '.navbar-expand-lg .navbar-nav .nav-link',
    '.navbar-expand-xl .navbar-nav .nav-link',
    '.navbar-expand-xxl .navbar-nav .nav-link',
    '.navbar-expand .navbar-nav .nav-link',
]
if not any('`.navbar-nav .nav-link.active`' in l for l in lines[start:end]):
    lines[last + 1:last + 1] = [row([f'`{n}`', 'Navbar', 'The owning component supplies this relationship.'], ws) for n in names]

open(path, 'w').write('\n'.join(lines))

# The shipped component lists.
for rel, anchor in (('tests/conformance.test.ts', "\t\t\t'mark',\n"), ('tests/setupServer.test.ts', "\t\t\t\t'mark',\n")):
    p = f'{STAGE}/{rel}'
    s = open(p).read()
    if "'nav'," not in s:
        assert s.count(anchor) == 1, (rel, s.count(anchor))
        s = s.replace(anchor, anchor + anchor.replace('mark', 'nav'))
        open(p, 'w').write(s)
print('edited')
