#!/usr/bin/env python3
"""Roadmap fold 37: B-FORMS-CLOSE-FORCED landed; its carrier rows close and the B-FORMS status sentence records it."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
def close(item_start, text):
    global s
    m=re.search(r'^\| '+re.escape(item_start)+r'[^\n]*$', s, re.M); assert m, item_start
    cells=m.group(0).split('|'); assert len(cells)>=4, item_start
    cells[2]=' '+text+' '
    s=s[:m.start()]+'|'.join(cells)+s[m.end():]
close("The validated color control's width holds", f"Closed: B-FORMS-CLOSE-FORCED at `{sha}` binds the width to `--vn-space-24` with the icon room literal, records the ledger cells as `tokenized`, and reads the validated minus resting width equal at density 1 and 2 and under a direct override (R2)")
close("The forms controls' focus indicator under forced colours", f"Closed: B-FORMS-CLOSE-FORCED at `{sha}` extracts `forced-ring` from the forced branch of `focus-ring`, includes it in the forms `:focus` rules with the button compile byte-identical, reads each control under `stageMedia({{ forced: true }})`, and lands the Additions rows and prose (D37, R3)")
close("`.form-control-plaintext:focus` writes `outline: 0` and draws no indicator in any mode", f"dropped on evidence: the release draws no indicator there in any mode, so forced colours remove nothing and D37 does not reach it; B-FORMS-CLOSE-FORCED at `{sha}` states the limit in the guide (R3a)")
old="FORCED after TABLES,"
new=f"FORCED landed as `{sha}` (audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`),"
assert s.count(old)==1; s=s.replace(old,new)
open(p,'w').write(s); print('fold 37 applied with FORCED',sha)
