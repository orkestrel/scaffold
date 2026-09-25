# Folds the LEDGER-ADDITIONS landing into Veneer's ROADMAP.md: the E-TENETS row names the unit as landed, and the
# ledger carrier row records what it closed and what LEDGER-RETUNE still carries. Usage: python3 lad-fold.py <sha>,
# from the Veneer checkout; oxfmt re-pads the tables afterwards.
import sys
sha = sys.argv[1]
p = 'ROADMAP.md'
lines = open(p).read().split('\n')


def swap(prefix, cell, old, new):
    hits = [i for i, l in enumerate(lines) if l.startswith(prefix)]
    assert len(hits) == 1, (prefix, hits)
    cells = lines[hits[0]].split('|')
    assert cells[cell].count(old) == 1, (prefix, cells[cell])
    cells[cell] = cells[cell].replace(old, new)
    lines[hits[0]] = '|'.join(cells)


swap('| E-TENETS ', 2, 'LEDGER-ADDITIONS then LEDGER-RETUNE per',
     'LEDGER-ADDITIONS landed as `' + sha + '` (four rounds; Rulings 4 to 6), then LEDGER-RETUNE per')
swap('| The ledger compares no canonical value', 2, 'LEDGER-ADDITIONS, then LEDGER-RETUNE',
     'LEDGER-ADDITIONS closed the Additions value, the unattributed rule, and the hand-written shipped list at `' + sha +
     '`; LEDGER-RETUNE carries the canonical values, the `retuned` member, and the `bootstrap` provenance')
open(p, 'w').write('\n'.join(lines))
print('folded')
