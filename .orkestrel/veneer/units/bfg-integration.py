#!/usr/bin/env python3
"""GROUP landing integration edits (applied in /home/user/veneer after the cherry-pick): the validation proof's
'5' patch, the INPUT_GROUP_SPECIMENS remark, the guide's toolbar sentence and compatibility row (the round-1 D4
patch), and the ROADMAP carrier rows from the round-3 and round-4 reports (the barrel-order row superseded by
D35 and the guide-patch row closed here are omitted). The B-FORMS row is fold 22's."""
import re,subprocess
root='/home/user/veneer/'
def edit(path, pairs, regex=False):
    p=root+path; s=open(p).read(); o=s
    for a,b in pairs:
        if regex:
            s,n=re.subn(a,b,s,flags=re.S); assert n==1,(path,a[:60],n)
        else:
            assert s.count(a)==1,(path,a[:60],s.count(a)); s=s.replace(a,b)
    open(p,'w').write(s); print('edited',path)
edit('tests/src/styles/components/validation.test.ts',[
 ("\t\t// The release lifts a child only while it is out of focus, so a rule dropping the guard\n\t\t// would keep the focused child under its neighbour.\n",
  "\t\t// The release lifts a child by its state only while it is out of focus, and the group's own\n\t\t// focus rule lifts the focused child above both state steps; a rule dropping the guard would\n\t\t// hold the focused child at its state step instead.\n"),
 ("\t\texpect(readStyle(requireValue(passing, 'No passing child'), 'z-index')).toBe('auto')\n",
  "\t\texpect(readStyle(requireValue(passing, 'No passing child'), 'z-index')).toBe('5')\n"),
])
edit('app/browser/constants.ts',[
 (" * Every control announces a name of its own, because the journey reaches the plain group's control\n * by name through keyboard traversal and a shared name would resolve to either control. The large\n",
  " * Every control announces a name of its own, because the journey reaches the control beside the\n * grouped button by name through keyboard traversal and a shared name would resolve to either\n * control. The large\n"),
])
edit('guides/veneer.md',[
 ("The `.btn-toolbar .input-group` combinator stays withheld, because Forms owns the input group it\nsizes; § Deferred selectors carries its row.",
  "The `.btn-toolbar .input-group` combinator ships with the input group it sizes, from\n`src/styles/components/_input-group.scss`; § Input group classes describes it."),
 ("The `.btn-toolbar .input-group` combinator is recorded under § Styles.",
  "The `.btn-toolbar .input-group` combinator ships from `src/styles/components/_input-group.scss`, and `tests/src/styles/components/input-group.test.ts` proves its width."),
])
# ROADMAP carrier rows
p=root+'ROADMAP.md'; s=open(p).read()
lines=s.split('\n'); i=[k for k,l in enumerate(lines) if l.startswith('| Validation tooltip specimens')][0]
lines[i]="| Validation tooltip specimens: `valid-tooltip` and `invalid-tooltip` ship from B-FORMS-GROUP with no rendered specimen (D6, D31) | B-FORMS-CLOSE adds `Input group valid tooltip` and `Input group invalid tooltip` as resting element frames over a wrapper that keeps the tooltip's overflow room beneath the group, and registers their scenarios |"
new=[
"| `INPUT_GROUP_ROUNDING` in `tests/setupStyles.ts` and the `### Input group classes` sentence on the consumer radius hold while the text control and select classes carry no radius (D31) | B-FORMS-CONTROL retires the fixture and the sentence when the control and select classes ship their own radius |",
"| `_button.scss`, `_pagination.scss`, and `_placeholder.scss` still repeat a size pair that D30 gives one `@each` | B-PASSIVE-CLOSE drives each pair with one `@each` over a list, the compile proved byte-identical before and after |",
"| The input-group frames show a grouped control with the browser's own border, and the seam paints two columns until the control ships its border | B-FORMS-CONTROL recaptures the input-group frames and confirms the one-line seam once `.form-control` ships its border, and rewrites the two seam sentences of `### Input group classes` to the one-line reading |",
"| `BUTTON_OUTLINE_CASES` in `tests/setupStyles.ts` binds `theme` for the axis its TSDoc calls `mode` (the CHECK fix round's reviewer R3) | B-PASSIVE-CLOSE renames the field to `mode` with its consumers |",
]
lines[i+1:i+1]=new; s='\n'.join(lines); open(p,'w').write(s); print('roadmap rows added')
