# Folds the TOKEN-PROOFS and TAILWIND-RECIPE landing into Veneer's ROADMAP.md: the E-TENETS row names both units as
# landed, and each carrier row names what closed it. Usage: python3 tkp-twr-fold.py <tkp-sha> <twr-sha>, from the Veneer
# checkout; oxfmt re-pads the tables afterwards.
import sys
tkp, twr = sys.argv[1], sys.argv[2]
p = 'ROADMAP.md'
lines = open(p).read().split('\n')


def swap(prefix, cell, old, new):
    hits = [i for i, l in enumerate(lines) if l.startswith(prefix)]
    assert len(hits) == 1, (prefix, hits)
    cells = lines[hits[0]].split('|')
    assert cells[cell].count(old) == 1, (prefix, cells[cell])
    cells[cell] = cells[cell].replace(old, new)
    lines[hits[0]] = '|'.join(cells)


swap('| E-TENETS ', 2, 'TOKEN-PROOFS;',
     'TOKEN-PROOFS landed as `' + tkp + '` (ten rounds; D51a states where an override reaches);')
swap('| E-TENETS ', 2, '; TAILWIND-RECIPE',
     '; TAILWIND-RECIPE landed as `' + twr + '` (three rounds)')
swap('| No proof overrides a `link`', 2, 'TOKEN-PROOFS',
     'Closed: TOKEN-PROOFS at `' + tkp + '` overrides each documented token group on an ancestor and reads a shipped '
     'consumer move beside a twin on the rest value')
swap('| No rendered case mounts a component class under Tailwind', 2, 'TAILWIND-RECIPE',
     'Closed: TAILWIND-RECIPE at `' + twr + '` holds the `preflight` recipe to a compiled fixture and reads every '
     'component class that shares a longhand with preflight under it')
open(p, 'w').write('\n'.join(lines))
print('folded')
