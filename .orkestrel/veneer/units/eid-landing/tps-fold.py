# Folds the E-ID-MOTION-FADE, TOKEN-PROOFS, and STATES landing into Veneer's ROADMAP.md: the E-IDENTITY row names the
# fade's easing unit as landed, the E-TENETS row names TOKEN-PROOFS and STATES as landed, and the § Carriers rows for
# the token proofs (claim 6, F-STACK-ROW) and the range states (claims 7 and 12) close on their commits. A `-` for a
# commit skips that unit's rows. Usage: python3 tps-fold.py <fade-sha> <tkp-sha> <sts-sha>, from the Veneer checkout;
# oxfmt re-pads the tables afterwards.
import sys
fade, tkp, sts = sys.argv[1], sys.argv[2], sys.argv[3]
p = 'ROADMAP.md'
lines = open(p).read().split('\n')


def row(prefix):
    hits = [i for i, l in enumerate(lines) if l.startswith(prefix)]
    assert len(hits) == 1, (prefix, hits)
    return hits[0]


def swap(prefix, cell, old, new):
    i = row(prefix)
    cells = lines[i].split('|')
    assert old in cells[cell], (prefix, cells[cell])
    cells[cell] = cells[cell].replace(old, new)
    lines[i] = '|'.join(cells)


if fade != '-':
    swap('| E-IDENTITY ', 2,
     'E-ID-MOTION takes Elements\' motion for the collapse, modal, offcanvas, and carousel under the user\'s ruling the'
     ' engine session records as E26 (D48)',
     'E-ID-MOTION takes Elements\' motion for the collapse, modal, offcanvas, and carousel under the user\'s ruling the'
     ' engine session records as E26 (D48); E-ID-MOTION-FADE, the `.fade` rule on Elements\' `ease-out` and the shared'
     ' `sampleTransition` reader, landed as `' + fade + '` (three rounds, audited by `analyst` on Astra, `reviewer` on'
     ' Opus 5.5, and `checker`)')
if tkp != '-':
    swap('| E-TENETS ', 2, 'TOKEN-PROOFS;',
     'TOKEN-PROOFS landed as `' + tkp + '` (four rounds; the Orchestrator ruled the § Customization text at the seam\'s'
     ' third round);')
if sts != '-':
    swap('| E-TENETS ', 2, 'STATES;',
     'STATES landed as `' + sts + '` (three rounds; D52 keeps the integration case\'s own centre read);')
if tkp != '-':
    swap('| No proof overrides a `link`', 2, 'TOKEN-PROOFS',
     'Closed: `' + tkp + '`. TOKEN-PROOFS proves each token on a shipped consumer beside a twin, pins the placement rule'
     ' § Customization states, and adds the stacking row')
if sts != '-':
    swap('| The range thumb\'s press, disabled', 2, 'STATES',
     'Closed: `' + sts + '`. STATES reads the press, the disabled thumb, the reduced-motion transition, and the disabled'
     ' `.btn-link` from rendered frames')
open(p, 'w').write('\n'.join(lines))
print('folded')
