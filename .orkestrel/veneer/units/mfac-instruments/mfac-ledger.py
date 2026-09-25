# Inserts the motion-factor departure rows into the guide's per-component ledger tables.
p = 'guides/veneer.md'
lines = open(p).read().split('\n')

def row(cells):
    return '| ' + ' | '.join(cells) + ' |'

def find(prefix_cells):
    # Returns the index of the unique ledger row whose leading cells match, ignoring padding.
    hits = []
    for i, line in enumerate(lines):
        if not line.startswith('| `'):
            continue
        cells = [c.strip() for c in line.strip('|').split('|')]
        if cells[: len(prefix_cells)] == prefix_cells:
            hits.append(i)
    assert len(hits) == 1, (prefix_cells, hits)
    return hits[0]

F = '`var(--vn-motion-feedback)`'
inserts = [
    # (anchor cells, before?, new row cells)
    (['`accordion`', '`.accordion`', '`--bs-accordion-btn-padding-y`'], True,
     ['`accordion`', '`.accordion`', '`--bs-accordion-transition`', '—',
      '`color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease`',
      '`color var(--vn-motion-feedback) ease-in-out, background-color var(--vn-motion-feedback) ease-in-out, border-color var(--vn-motion-feedback) ease-in-out, box-shadow var(--vn-motion-feedback) ease-in-out, border-radius var(--vn-motion-feedback) ease`',
      'tokenized']),
    (['`form-floating`', '`.form-floating > label`', '`padding`'], False,
     ['`form-floating`', '`.form-floating > label`', '`transition`', '—',
      '`opacity 0.1s ease-in-out, transform 0.1s ease-in-out`',
      '`opacity calc(100ms * var(--vn-factor-motion)) ease-in-out, transform calc(100ms * var(--vn-factor-motion)) ease-in-out`',
      'tokenized']),
    (['`nav`', '`.nav-link:focus-visible`', '`box-shadow`'], True,
     ['`nav`', '`.nav-link`', '`transition`', '—',
      '`color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out`',
      '`color var(--vn-motion-feedback) ease-in-out, background-color var(--vn-motion-feedback) ease-in-out, border-color var(--vn-motion-feedback) ease-in-out`',
      'tokenized']),
    (['`navbar`', '`.navbar`', '`--bs-navbar-toggler-font-size`'], False,
     ['`navbar`', '`.navbar`', '`--bs-navbar-toggler-transition`', '—',
      '`box-shadow 0.15s ease-in-out`', '`box-shadow var(--vn-motion-feedback) ease-in-out`', 'tokenized']),
    (['`pagination`', '`.pagination-lg`', '`--bs-pagination-padding-x`'], True,
     ['`pagination`', '`.page-link`', '`transition`', '—',
      '`color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out`',
      '`color var(--vn-motion-feedback) ease-in-out, background-color var(--vn-motion-feedback) ease-in-out, border-color var(--vn-motion-feedback) ease-in-out, box-shadow var(--vn-motion-feedback) ease-in-out`',
      'tokenized']),
    (['`progress`', '`.progress`', '`--bs-progress-bar-bg`'], False,
     ['`progress`', '`.progress`', '`--bs-progress-bar-transition`', '—',
      '`width 0.6s ease`', '`width calc(600ms * var(--vn-factor-motion)) ease`', 'tokenized']),
    (['`progress`', '`.progress-stacked`', '`--bs-progress-bar-bg`'], False,
     ['`progress`', '`.progress-stacked`', '`--bs-progress-bar-transition`', '—',
      '`width 0.6s ease`', '`width calc(600ms * var(--vn-factor-motion)) ease`', 'tokenized']),
]
for anchor, before, cells in inserts:
    i = find(anchor)
    lines.insert(i if before else i + 1, row(cells))
open(p, 'w').write('\n'.join(lines))
