# Folds the E-ID-FLOW-2 landing into Veneer's ROADMAP.md: the E-IDENTITY plan row's carrier cell names the E-ID units
# landed so far and what follows. Successor to eid-fold.py, which closed carrier rows; this one rewrites one plan cell.
# Usage: python3 eid-fold-3.py <flow2-landing-sha>. Run from the Veneer checkout after the chain is green; oxfmt
# re-pads the table afterwards.
import sys
sha=sys.argv[1]
p='ROADMAP.md'
s=open(p).read()
lines=s.split('\n')
hits=[i for i,l in enumerate(lines) if l.startswith('| E-IDENTITY ')]
assert len(hits)==1, hits
cells=lines[hits[0]].split('|')
assert cells[2].strip()=='`opus` on Opus 5.5', cells[2]
cells[2]=(' `opus` on Opus 5.5 per `/home/user/scaffold/.orkestrel/veneer/e-identity-design-verdict.md`; E-ID-RECORD landed as'
 ' `6c26b14`, E-ID-LAYOUT as `dd4300a`, E-ID-CODE as `4edb3c6`, E-ID-FLOW as `b4825e0`, and E-ID-FLOW-2 as `'+sha+'`'
 ' (each audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`); E-ID-BUTTON-CASCADE and'
 ' E-ID-BUTTON-CLASSES follow per `/home/user/scaffold/.orkestrel/veneer/e-id-button-design-verdict.md`; motion waits'
 ' on the user\'s ruling ')
lines[hits[0]]='|'.join(cells)
open(p,'w').write('\n'.join(lines))
print('folded')
