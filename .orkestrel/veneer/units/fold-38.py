#!/usr/bin/env python3
"""Roadmap fold 38: B-FORMS-LABEL-SHOW landed; the form-key row records the showcase half, the status sentence records the landing, and the FORM_CHECK_SPECIMENS bare-token carrier row joins § Carriers under B-PASSIVE-CLOSE."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
def setcell(item_start, text):
    global s
    m=re.search(r'^\| '+re.escape(item_start)+r'[^\n]*$', s, re.M); assert m, item_start
    cells=m.group(0).split('|'); assert len(cells)>=4, item_start
    cells[2]=' '+text+' '
    s=s[:m.start()]+'|'.join(cells)+s[m.end():]
setcell("The `form` key of the forms family", f"B-FORMS-LABEL-SHOW at `{sha}` lands the `FormLabelSection` region, its specimens, and its capture rows; B-FORMS-LABEL-CASCADE lands the partial, the tiered attribution ladder, the tables, the shipped-key lists, the retired deferral rows, and the guide (R5)")
old="and LABEL (the `form` key) after FORCED;"
new=f"and LABEL (the `form` key) as two units after FORCED: LABEL-SHOW landed as `{sha}` (audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`) and LABEL-CASCADE follows;"
assert s.count(old)==1, 'status sentence'; s=s.replace(old,new)
anchor_re=re.compile(r'^\| `\.page-link:focus` and `\.btn-close:focus` write[^\n]*$', re.M)
m=anchor_re.search(s); assert m, 'anchor row'
row="| The `FORM_CHECK_SPECIMENS` doc block in `app/browser/constants.ts` writes the bare `id` token where the `FORM_LABEL_SPECIMENS` block writes the `id` attribute (the B-FORMS-LABEL-SHOW audit, outside the unit's diff) | B-PASSIVE-CLOSE gives the token its noun in the same pass as the guide-wide token-noun sweep |"
s=s[:m.end()]+"\n"+row+s[m.end():]
open(p,'w').write(s); print('fold 38 applied with LABEL-SHOW',sha)
