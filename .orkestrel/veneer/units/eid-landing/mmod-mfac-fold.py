# Folds the E-ID-MOTION-MODAL and E-ID-MOTION-FACTOR landing into Veneer's ROADMAP.md: the E-IDENTITY row names both
# units as landed, and the F-MOTION-SCOPE carrier row names what closed it. Usage:
# python3 mmod-mfac-fold.py <mmod-sha> <mfac-sha> <fl-sha> <fc-sha>, from the Veneer checkout; oxfmt re-pads the tables afterwards.
import sys
mmod, mfac, fl, fc = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
p = 'ROADMAP.md'
lines = open(p).read().split('\n')


def swap(prefix, cell, old, new):
    hits = [i for i, l in enumerate(lines) if l.startswith(prefix)]
    assert len(hits) == 1, (prefix, hits)
    cells = lines[hits[0]].split('|')
    assert cells[cell].count(old) == 1, (prefix, cells[cell])
    cells[cell] = cells[cell].replace(old, new)
    lines[hits[0]] = '|'.join(cells)


reduced = ('E-ID-MOTION-REDUCED, which stops the placeholder and spinner animations under reduced motion, landed as '
           '`0879800` (two rounds, audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`)')
swap('| E-IDENTITY ', 2, reduced,
     reduced + '; E-ID-MOTION-MODAL, which moves the dialog and both backdrops on Elements\' panel motion, landed as `'
     + mmod + '` (three rounds, audited by `analyst` on Astra and `reviewer` on Opus 5.5); E-ID-MOTION-FACTOR, which '
     'scales every transition that kept a release literal through the motion tokens, landed as `' + mfac + '` (four '
     'rounds, audited by `analyst` on Astra and `reviewer` on Opus 5.5), with FACTORS-LEDGER\'s § Factors sentence at `'
     + fl + '` and FLOATING-CASES\' floating label case row at `' + fc + '`')
swap('| The motion factor does not reach the transitions that keep Bootstrap\'s literals', 2,
     'E-ID-MOTION-FACTOR, per `/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md`',
     'Closed: E-ID-MOTION-FACTOR at `' + mfac + '` scales every transition that kept a release literal through the '
     '`--vn-motion-*` tokens, apart from the timings § Factors names')
open(p, 'w').write('\n'.join(lines))
print('folded')
