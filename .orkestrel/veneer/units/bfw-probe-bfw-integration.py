#!/usr/bin/env python3
"""bfw landing integration: the noun after each code token the audit's claim 8 faulted (analyst and checker agree): the FORM_LABEL_SPECIMENS doc block, the section proof's `for` comment, and the registry check's selector comment. Runs in the tree named by argv[1] (the bfw worktree before landing)."""
import sys
root=sys.argv[1]
def edit(path, pairs):
    p=f'{root}/{path}'; s=open(p).read()
    for old,new in pairs:
        assert s.count(old)==1, (path, old); s=s.replace(old,new)
    open(p,'w').write(s); print('edited', path)
edit('app/browser/constants.ts', [(
" * Each label names its control through `for`, so every control announces the label's text as its\n"
" * name, and each `id` is unique to the showcase so a label names one control. The stacked control\n"
" * names its help text through `aria-describedby`, which is the pairing the help text exists to\n"
" * hold.\n",
" * Each label names its control through its `for` attribute, so each labelled control announces its\n"
" * label's text as its name, and each `id` attribute is unique to the showcase so a label names one\n"
" * control. The stacked control names its help text through its `aria-describedby` attribute, which\n"
" * is the pairing the help text exists to hold.\n")])
edit('tests/app/browser/sections/FormLabelSection.test.ts', [(
"\t\t\t// Each label is tied to its control by `for`, so the control announces the label's own\n"
"\t\t\t// text, and no two controls share a name the journey could resolve to either of.\n",
"\t\t\t// Each label is tied to its control by its `for` attribute, so the control announces the\n"
"\t\t\t// label's own text, and no two controls share a name the journey could resolve to either of.\n")])
edit('tests/setup.test.ts', [(
"\t\t// A selector leads with the class whose rule the key reads, alone or qualified by the element\n"
"\t\t// that carries it, as `legend.col-form-label` is. A bare element selector such as `legend`\n"
"\t\t// names no class, so the check refuses it.\n",
"\t\t// A selector leads with the class whose rule the key reads, alone or qualified by the element\n"
"\t\t// that carries it, as the `legend.col-form-label` selector is. A bare element selector such as\n"
"\t\t// the `legend` selector names no class, so the check refuses it.\n")])
