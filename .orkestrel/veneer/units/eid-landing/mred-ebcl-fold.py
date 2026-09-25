# Folds the E-ID-MOTION-REDUCED and E-ID-BUTTON-CLASSES landing into Veneer's ROADMAP.md: the E-IDENTITY row names
# both units as landed. Usage: python3 mred-ebcl-fold.py <reduced-sha> <classes-sha>, from the Veneer checkout; oxfmt
# re-pads the tables afterwards.
import sys
reduced, classes = sys.argv[1], sys.argv[2]
p = 'ROADMAP.md'
lines = open(p).read().split('\n')


def swap(prefix, cell, old, new):
    hits = [i for i, l in enumerate(lines) if l.startswith(prefix)]
    assert len(hits) == 1, (prefix, hits)
    cells = lines[hits[0]].split('|')
    assert cells[cell].count(old) == 1, (prefix, cells[cell])
    cells[cell] = cells[cell].replace(old, new)
    lines[hits[0]] = '|'.join(cells)


swap('| E-IDENTITY ', 2, 'E-ID-BUTTON-CLASSES follows per',
     'E-ID-BUTTON-CLASSES, which compares each button form with the release\'s in one browser, landed as `' + classes +
     '` (three rounds) per')
swap('| E-IDENTITY ', 2, 'from a terrain on Cursor Grok and a design round on `planner` and `analyst`',
     'from a terrain on Cursor Grok and a design round on `planner` and `analyst`; E-ID-MOTION-REDUCED, which stops the '
     'placeholder and spinner animations under reduced motion, landed as `' + reduced + '` (two rounds, audited by '
     '`analyst` on Astra, `reviewer` on Opus 5.5, and `checker`)')
open(p, 'w').write('\n'.join(lines))
print('folded')
