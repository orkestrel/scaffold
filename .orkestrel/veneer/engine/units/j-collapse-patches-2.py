# J-COLLAPSE round 2 remaining report-only patches (C9): each types.ts hunk with the guide rows that
# must equal it, so the guide's parity holds whichever side lands, and the roadmap cell.
import difflib, pathlib

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer-collapse')
OUT = ROOT / 'tmp/j-collapse/patches-2'
OUT.mkdir(parents=True, exist_ok=True)
SURFACE = [41, 9, 150]


def edit(text, old, new):
    if text.count(old) != 1:
        raise SystemExit(f'expected one match: {old[:90]!r} found {text.count(old)}')
    return text.replace(old, new)


def row(cells, widths):
    return '| ' + ' | '.join(cell.ljust(width) for cell, width in zip(cells, widths)) + ' |'


def methods(rows):
    widths = [max(len(line[index]) for line in [['Method', 'Summary'], *rows]) for index in range(2)]
    lines = [row(['Method', 'Summary'], widths), '| ' + ' | '.join('-' * width for width in widths) + ' |']
    return '\n'.join(lines + [row(line, widths) for line in rows]) + '\n'


def diff(name, changes):
    lines = []
    for path, transform in changes:
        before = (ROOT / path).read_text(encoding='utf-8')
        after = transform(before)
        lines.extend(difflib.unified_diff(before.splitlines(keepends=True), after.splitlines(keepends=True),
                                          fromfile=f'a/{path}', tofile=f'b/{path}', n=3))
    (OUT / name).write_text(''.join(lines), encoding='utf-8', newline='\n')
    print(name, len(lines))


DELEGATE_OLD = 'Owns delegated activation and the button engines it constructs.'
DELEGATE_NEW = 'Owns delegated activation and the engines it constructs.'
DESTROY_OLD = 'Releases the click listener and destroys every owned button engine.'
DESTROY_NEW = 'Releases the click listener and destroys every engine it owns.'


def delegate_guide(text):
    text = edit(text, row(['`DelegateInterface`', 'interface', DELEGATE_OLD], SURFACE),
                row(['`DelegateInterface`', 'interface', DELEGATE_NEW], SURFACE))
    return edit(text, methods([['`destroy`', DESTROY_OLD]]), methods([['`destroy`', DESTROY_NEW]]))


diff('j-collapse-delegate-interface.diff', [
    ('src/browser/types.ts', lambda text: edit(edit(text, f'/** {DELEGATE_OLD} */', f'/** {DELEGATE_NEW} */'),
                                               f'\t/** {DESTROY_OLD} */', f'\t/** {DESTROY_NEW} */')),
    ('guides/veneer.md', delegate_guide),
])

COLLAPSE_OLD = 'Releases hooks, abandons a transition in flight, and restores the panel and its triggers.'
COLLAPSE_NEW = ('Releases hooks, abandons a transition in flight, restores the panel and its triggers, and '
                'destroys each sibling collapse it constructed.')
COLLAPSE_ROWS = [
    ['`show`', 'Shows the panel and hides its open accordion siblings.'],
    ['`hide`', 'Hides the panel.'],
    ['`toggle`', 'Hides the panel when it is shown and shows it otherwise.'],
]


def types_destroy(text):
    return edit(text, f'\t * {COLLAPSE_OLD}\n',
                '\t * Releases hooks, abandons a transition in flight, restores the panel and its triggers, and\n'
                '\t * destroys each sibling collapse it constructed.\n')


diff('j-collapse-destroy-summary.diff', [
    ('src/browser/types.ts', types_destroy),
    ('guides/veneer.md', lambda text: edit(text, methods(COLLAPSE_ROWS + [['`destroy`', COLLAPSE_OLD]]),
                                           methods(COLLAPSE_ROWS + [['`destroy`', COLLAPSE_NEW]]))),
])


def roadmap(text):
    lines = text.split('\n')
    found = [index for index, line in enumerate(lines) if line.startswith('| J-ENGINE ')]
    if len(found) != 1:
        raise SystemExit('expected one J-ENGINE row')
    cells = lines[found[0]][1:-1].split('|')
    width = len(cells[1]) - 1
    updated = cells[1].rstrip() + '; J-COLLAPSE carries the Collapse engine, its delegate route, and its `plugin` row'
    if len(updated) > width:
        raise SystemExit('route cell too wide')
    cells[1] = updated.ljust(width) + ' '
    lines[found[0]] = '|' + '|'.join(cells) + '|'
    return '\n'.join(lines)


diff('j-collapse-roadmap.diff', [('ROADMAP.md', roadmap)])


def returns(text):
    text = edit(text, 'a listener prevented `show`, or the collapse is destroyed.',
                'a listener prevented `show`, the collapse is destroyed, or the panel showed the change was taken over.')
    return edit(text, 'a listener prevented `hide`, or the collapse is destroyed.',
                'a listener prevented `hide`, the collapse is destroyed, or the panel showed the change was taken over.')


diff('j-collapse-returns.diff', [('src/browser/types.ts', returns)])
