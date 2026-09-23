#!/usr/bin/env python3
"""Roadmap fold 35: B-FORMS-CLOSE-TABLES landed; its carrier rows close and the B-FORMS status sentence records it."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
def close(item_start, text):
    global s
    m=re.search(r'^\| '+re.escape(item_start)+r'[^\n]*$', s, re.M); assert m, item_start
    cells=m.group(0).split('|'); assert len(cells)>=4, item_start
    cells[2]=' '+text+' '
    s=s[:m.start()]+'|'.join(cells)+s[m.end():]
close('`INPUT_GROUP_ROUNDING` in `tests/setupStyles.ts`', f"Closed: B-FORMS-CLOSE-TABLES at `{sha}` retires the fixture, binds the corner proofs to the radius `input-border` writes, and the landing integration rewrites the `### Input group classes` paragraph to the shipped radius, border, and floating rules (D31, R12)")
close('The `FORM_RANGE_CASES` table in the `tests/setupStyles.ts` module', f"Closed: B-FORMS-CLOSE-TABLES at `{sha}` declares `FormRangeCase` with a property-keyed `reads` map, one row per reduced-motion twin, the Node case comparing per property through the exported `collectDeclarationReads` helper the text-control and input-group cases share, and the R9 exclusion of a block under a condition the inventory records for no range rule")
close('A literal declaration added to a shipped `.form-control` rule', f"Closed: B-FORMS-CLOSE-TABLES at `{sha}`: the retained probe reads the Node binding case and the browser proof green with a `letter-spacing` plant and the conformance additions case red with `form-control | .form-control {{ letter-spacing }} | — | declaration`; an in-memory conformance case over the real cascade pins that reading and the `FORM_CONTROL_CASES` remark names the gate")
close('The later paragraph of the `### Input group classes` section still says', f"B-FORMS-CLOSE-TABLES at `{sha}` retired the fixture and rewrote its doc block, the corner comments, and the paragraph to the shipped radius, border, and floating rules (D31); B-FORMS-CLOSE-SPECIMENS rewrites the focus comment to read that the button's leading border paints over the shared border until the control is lifted past it")
old="SPECIMENS and TABLES on `opus` on Opus 5 in parallel worktrees from `d02bd46`, FORCED after TABLES,"
new=f"SPECIMENS and TABLES on `opus` on Opus 5 in parallel worktrees from `d02bd46`; TABLES landed as `{sha}` (audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`); FORCED after TABLES,"
assert s.count(old)==1; s=s.replace(old,new)
open(p,'w').write(s); print('fold 35 applied with TABLES',sha)
