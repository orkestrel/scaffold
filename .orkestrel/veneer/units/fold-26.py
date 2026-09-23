#!/usr/bin/env python3
"""Roadmap fold 26: B-PASSIVE-CLOSE-A landed; its four carrier rows close and the B-PASSIVE row records the split."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
closures=[
 ("| `_button.scss`, `_pagination.scss`, and `_placeholder.scss` still repeat a size pair that D30 gives one `@each`", f"Closed: B-PASSIVE-CLOSE-A at `{sha}` gives each partial one `@each` over a size list, compiling byte-identical to the blocks it replaced"),
 ("| `BUTTON_OUTLINE_CASES` in `tests/setupStyles.ts` binds `theme` for the axis its TSDoc calls `mode`", f"Closed: B-PASSIVE-CLOSE-A at `{sha}` names the axis `mode` in the button tables and their proof, keeping `theme` where it names the `data-bs-theme` attribute"),
 ("| A cross-reference `below` in a `tests/setupServer.test.ts` comment", f"Closed: B-PASSIVE-CLOSE-A at `{sha}` reads \"the following row\""),
 ("| The ledger readers' repeated default guide path and the working-directory `VENEER_GUIDE_PATH` read in `tests/setupStyles.test.ts`", f"Closed: B-PASSIVE-CLOSE-A at `{sha}` defaults the readers to `VENEER_GUIDE_PATH` under the workspace root and routes the style proofs through `readVeneerGuide`"),
]
for prefix,closure in closures:
    m=re.search(r'^'+re.escape(prefix)+r'[^\n]*?\| ([^|\n]*) \|\s*$', s, re.M)
    assert m, prefix[:60]
    row=m.group(0); cells=row.split('|'); assert len(cells)>=4, row[:80]
    cells[2]=' '+closure+' '
    s=s[:m.start()]+'|'.join(cells)+s[m.end():]
old="B-PASSIVE-CLOSE"
# the B-PASSIVE unit row records the split
m=re.search(r'^\| B-PASSIVE +\|[^\n]*$', s, re.M); assert m
row=m.group(0)
assert 'B-PASSIVE-CLOSE-A' not in row
row=row.replace('| Veneer ', f'; B-PASSIVE-CLOSE-A landed as `{sha}` (`builder` on Sonnet, verified by `checker`; the size lists, the mode axis, the guide-path defaults, the comment) and B-PASSIVE-CLOSE-B follows the forms family | Veneer ',1)
s=s[:m.start()]+row+s[m.end():]
open(p,'w').write(s); print('fold 26 applied with B-PASSIVE-CLOSE-A',sha)
