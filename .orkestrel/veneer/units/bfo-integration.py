#!/usr/bin/env python3
"""CONTROL landing integration (after land-unit.sh bfo and sort-inventories.py form-control):
the FLOATING carrier sentence's text-control half (the report's text, bounded to the text-control
frames per the reviewer's R3), the ROADMAP rows the report returns (the D31 carrier cell restated;
the color-width and RANGE rows appended after the Cascade-key prose row; the D39 row skipped because
fold 29 closed it at L2's landing) plus the D40a row, and the `_mixins.scss` reader lists (the MIXIN
copy's comments kept, `.form-control` added per MIXIN-READERS)."""
import re
root='/home/user/veneer'
def edit(path, old, new):
    p=f'{root}/{path}'; s=open(p).read(); assert s.count(old)==1, (path, old[:60]); open(p,'w').write(s.replace(old,new))
edit('guides/veneer.md',
"`form-floating-select` frame shows the floated label over the styled select; the text control's\nbelong to the `.form-control` rule, which the control family ships, so the text-control frames show\nthe floated geometry over the bare control until it lands.",
"`form-floating-select` frame shows the floated label over the styled select; the text control's\nbelong to the `.form-control` rule, which Veneer ships, so every floating text-control frame shows\nthe floated label over the styled control.")
p=f'{root}/ROADMAP.md'; s=open(p).read()
m=re.search(r'^\| `INPUT_GROUP_ROUNDING` in `tests/setupStyles\.ts` and the `### Input group classes` sentence[^\n]*$', s, re.M); assert m
cells=m.group(0).split('|'); assert len(cells)>=4
cells[2]=" B-FORMS-CLOSE retires the `INPUT_GROUP_ROUNDING` fixture and the consumer-radius sentence of the `### Input group classes` section after the control and select classes ship their own radius (D31) "
s=s[:m.start()]+'|'.join(cells)+s[m.end():]
anchor=re.search(r'^\| Cascade-key prose[^\n]*\n', s, re.M); assert anchor
rows=("| The validated color control's width holds the validation partial's `3rem` literal while the `.form-control-color` rule reads the `--vn-space-24` token, so a density retune widens the resting color control and not the validated one | B-FORMS-CLOSE rules on the binding in the `_validation.scss` partial and its proof |\n"
"| The `FORM_RANGE_CASES` table in the `tests/setupStyles.ts` module binds tokens per selector and its Node case searches the joined declarations, the shape the GROUP and CONTROL fix rounds replaced with per-property references | B-FORMS-CLOSE gives the table a per-property `reads` map and the Node case the per-property comparison |\n"
"| The D40 mixins are named `control-type` and `control-border` where the `_mixins.scss` file's typography-run form is `-text` and `control-text` is the reboot reset (D40a) | B-FORMS-RENAME on `builder` renames them `input-text` and `input-border` after CONTROL lands, with the compile byte-identical |\n")
s=s[:anchor.end()]+rows+s[anchor.end():]
open(p,'w').write(s)
edit('src/styles/_mixins.scss',
"// variables, so `.form-select` and `.input-group-text` read the same four declarations here.",
"// variables, so `.form-control`, `.form-select`, and `.input-group-text` read the same four\n// declarations here.")
edit('src/styles/_mixins.scss',
"// variables, so `.form-select` and `.input-group-text` read the same two declarations here.",
"// variables, so `.form-control`, `.form-select`, and `.input-group-text` read the same two\n// declarations here.")
print('bfo integration applied')
