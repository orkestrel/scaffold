#!/usr/bin/env python3
"""Roadmap fold 34: the B-FORMS-CLOSE design round is reconciled; its rows name the close unit that carries each, the R3a, R5, R6, and R10 findings gain carrier rows, and the B-FORMS status sentence records the four-unit close."""
import re
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
V='`/home/user/scaffold/.orkestrel/veneer/b-forms-close-design-verdict.md`'
def cell(item_start, new_carrier):
    global s
    m=re.search(r'^\| '+re.escape(item_start)+r'[^\n]*$', s, re.M); assert m, item_start
    cells=m.group(0).split('|'); assert len(cells)>=4, item_start
    cells[2]=' '+new_carrier+' '
    s=s[:m.start()]+'|'.join(cells)+s[m.end():]
    return m
cell('Validation tooltip specimens:', "B-FORMS-CLOSE-SPECIMENS adds `Input group valid tooltip` and `Input group invalid tooltip` as resting element frames over each specimen, whose following button-led group is the room the tooltip hangs over, registers their scenarios, and reads the tooltip's display, room, and stacking in the journey (R1 in "+V+")")
cell('`INPUT_GROUP_ROUNDING` in `tests/setupStyles.ts`', "B-FORMS-CLOSE-TABLES retires the `INPUT_GROUP_ROUNDING` fixture after the control and select classes ship their own radius and returns the rewritten closing paragraph of the `### Input group classes` section, which lands at its landing (D31, R12)")
cell('Cascade-key prose (the `CASCADE_KEYS` doc block', 'B-FORMS-CLOSE-SPECIMENS rewrites both once for the family')
cell("The validated color control's width holds", "B-FORMS-CLOSE-FORCED binds the width to `--vn-space-24` with the icon room literal, records the ledger cells as `tokenized`, and reads the validated minus resting width at density 1 and 2 (R2)")
cell('The `FORM_RANGE_CASES` table in the `tests/setupStyles.ts` module', "B-FORMS-CLOSE-TABLES gives the table a per-property `reads` map under `FormRangeCase` and the Node case the per-property comparison through one exported `collectDeclarationReads` helper the text-control and input-group cases share (R7, R9)")
cell('A literal declaration added to a shipped `.form-control` rule', "B-FORMS-CLOSE-TABLES plants one such declaration in a retained probe, pins the reading with an in-memory conformance case over the real cascade, and names the additions gate as the reporter in the `FORM_CONTROL_CASES` remark (R4)")
m=cell('The later paragraph of the `### Input group classes` section still says', "B-FORMS-CLOSE-TABLES retires the fixture and rewrites its doc block, the corner comments, and the paragraph to the shipped radius, border, and floating rules (D31); B-FORMS-CLOSE-SPECIMENS rewrites the focus comment to read that the button's leading border paints over the shared border until the control is lifted past it")
# new rows after the round-6 row
end=s.index('\n', s.index('| B-FORMS-CLOSE-TABLES retires the fixture and rewrites its doc block'))
rows=[
 "| The `form` key of the forms family (`_form-label.scss`, `form-label.test.ts`, `FormLabelSection.ts`, and the three `.col-form-label*` deferral rows the family verdict gives B-FORMS-CLOSE) has no unit among the close's enumerated rows | B-FORMS-LABEL lands it after B-FORMS-CLOSE-FORCED, with its own terrain and design round (R5) |",
 "| The `FORM_FLOATING_CASES` table in the `tests/setupStyles.ts` module keeps the joined-string `reads` shape the range table retires | B-FORMS-LABEL gives it the per-property `reads` map and the shared comparison (R6) |",
 "| `.form-control-plaintext:focus` writes `outline: 0` and draws no indicator in any mode | dropped: the release draws no indicator there in any mode, so forced colours remove nothing and D37 does not reach it; B-FORMS-CLOSE-FORCED states the limit in the guide (R3a) |",
]
s=s[:end+1]+'\n'.join(rows)+'\n'+s[end+1:]
cell("The forms controls' focus indicator under forced colours", "B-FORMS-CLOSE-FORCED extracts a `forced-ring` mixin from the forced branch of `focus-ring`, includes it in the forms `:focus` rules with the button compile byte-identical, and reads each control under `stageMedia({ forced: true })` (D37, R3)")
end=s.index('\n', s.index('| B-FORMS-CLOSE-FORCED extracts a `forced-ring` mixin'))
row="| `.page-link:focus` and `.btn-close:focus` write `outline: 0` with a `box-shadow` ring, which forced colours do not paint | B-PASSIVE-CLOSE-B includes `forced-ring` in both rules and reads them under `stageMedia({ forced: true })` (R10) |"
s=s[:end+1]+row+'\n'+s[end+1:]
old="CLOSE follows; B-FORMS-FLOOR"
new="CLOSE runs as four units per "+V+": SPECIMENS and TABLES on `opus` on Opus 5 in parallel worktrees from `d02bd46`, FORCED after TABLES, and LABEL (the `form` key) after FORCED; B-FORMS-FLOOR"
assert s.count(old)==1; s=s.replace(old,new)
open(p,'w').write(s); print('fold 34 applied')
