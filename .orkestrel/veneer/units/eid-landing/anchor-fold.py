# Folds the E-ID-ANCHOR landing into Veneer's ROADMAP.md: the E-IDENTITY row names the unit as landed. Usage:
# python3 anchor-fold.py <anchor-sha>, from the Veneer checkout; oxfmt re-pads the table afterwards.
import sys
anchor = sys.argv[1]
p = 'ROADMAP.md'
lines = open(p).read().split('\n')
hits = [i for i, l in enumerate(lines) if l.startswith('| E-IDENTITY ')]
assert len(hits) == 1, hits
cells = lines[hits[0]].split('|')
old = 'E-ID-ANCHOR restates anchored visibility on the promoted overlays (D47)'
assert cells[2].count(old) == 1, cells[2][:200]
cells[2] = cells[2].replace(old, 'E-ID-ANCHOR, which emits anchored visibility on the open dropdown menu, tooltip, and popover through one '
                            'rule per partial (D47, D47a, D47b), landed as `' + anchor + '` (four rounds, audited by `analyst` on '
                            'Astra, `reviewer` on Opus 5.5, and `checker`)')
lines[hits[0]] = '|'.join(cells)
open(p, 'w').write('\n'.join(lines))
print('folded')
