#!/usr/bin/env python3
"""Roadmap fold 41: B-FORMS-LABEL-CASCADE landed; the form-key row and the FORM_FLOATING_CASES row close, and the B-FORMS status sentence records the landing."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
def setcell(item_start, text):
    global s
    m=re.search(r'^\| '+re.escape(item_start)+r'[^\n]*$', s, re.M); assert m, item_start
    cells=m.group(0).split('|'); assert len(cells)>=4, item_start
    cells[2]=' '+text+' '
    s=s[:m.start()]+'|'.join(cells)+s[m.end():]
setcell("The `form` key of the forms family", f"Closed: B-FORMS-LABEL-SHOW at `ce75c0d` lands the `FormLabelSection` region, its specimens, and its capture rows; B-FORMS-LABEL-CASCADE at `{sha}` lands `_form-label.scss`, the tiered attribution ladder through `matchSelectorKey`, `FORM_LABEL_CASES`, the shipped-key lists, the retired `.col-form-label*` deferral rows, and the guide (R5)")
setcell("The `FORM_FLOATING_CASES` table in the `tests/setupStyles.ts` module keeps", f"Closed: B-FORMS-LABEL-CASCADE at `{sha}` declares `FormFloatingCase` with a per-property `reads` map compared through `collectDeclarationReads` and `renderRuleKey` (R6)")
old="and LABEL-CASCADE follows;"
new=f"and LABEL-CASCADE landed as `{sha}` (audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`);"
assert s.count(old)==1, 'status sentence'; s=s.replace(old,new)
anchor_re=re.compile(r'^\| The `FORM_CHECK_SPECIMENS` doc block[^\n]*$', re.M)
m=anchor_re.search(s); assert m, 'anchor row'
rows=[
"| Bare code tokens that predate the label units beside repaired sites: `tests/setupServer.ts` (the `collectShippedComponents` and `collectKeyframeNames` sites), the `FormRangeCase` remarks in `tests/setupStyles.ts` (the B-FORMS-LABEL-CASCADE round-2 audit) | B-PASSIVE-PROSE, a `builder` unit after the family close, with the § Tests link lists |",
"| The guide's § Tests link lists omit the proofs for pagination, button group, progress, spinner, placeholder, card, list group, and validation, and all but three section proofs (the B-PASSIVE-CLOSE design round) | B-PASSIVE-PROSE adds every proof's link once |",
"| The barrel's passive block (pagination, button-group, progress, spinner, placeholder, card, list-group, breadcrumb, badge, close) loads in landing order rather than family ruling 8's order, and the helpers load before the forms (the B-PASSIVE-CLOSE design round, R6) | B-PASSIVE-ORDER reorders the block with the conformance order case extended, the guide's sections and `#### <key>` tables following, after the family close |",
]
s=s[:m.end()]+"\n"+"\n".join(rows)+s[m.end():]
open(p,'w').write(s); print('fold 41 applied with LABEL-CASCADE',sha)
