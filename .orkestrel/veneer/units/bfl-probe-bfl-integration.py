#!/usr/bin/env python3
"""bfl landing integration (the round-2 audit): the stacked `.form-label` takes its noun, the `legend` sentence names its subject, the vacuous "at each size" leaves the one-size sentence, and the proof paragraph names each horizontal label's type step. Runs in the tree named by argv[1]."""
import sys, textwrap
root=sys.argv[1]; p=f'{root}/guides/veneer.md'; g=open(p).read()
def reflow(g, anchor, edits):
    i=g.index(anchor); start=g.rfind("\n\n", 0, i)+2; end=g.index("\n\n", start)
    para=' '.join(l.strip() for l in g[start:end].split('\n'))
    for old,new in edits:
        assert para.count(old)==1, old; para=para.replace(old,new)
    para=para.replace('§ Additions','§\x00Additions')
    wrapped='\n'.join(textwrap.wrap(para, width=100, break_long_words=False, break_on_hyphens=False)).replace('\x00',' ')
    return g[:start]+wrapped+g[end:]
g=reflow(g, "the stacked `.form-label` keeps inheriting", [
 ("The unsized horizontal label reads `--vn-size-3`, the control's type step, so its text sits level with the control's at each size, and the stacked `.form-label` keeps inheriting the surrounding type. On a `legend` element it also clears the element's own trailing margin and type size, so the legend reads at its control's type step.",
  "The unsized horizontal label reads `--vn-size-3`, the control's type step, so its text sits level with the control's, and the stacked `.form-label` class keeps inheriting the surrounding type. On a `legend` element the horizontal label also clears the element's own trailing margin and type size, so the legend reads at its control's type step.")])
g=reflow(g, "sized labels' type steps and insets", [("the sized labels' type steps and insets","each horizontal label's type step and the sized labels' insets")])
open(p,'w').write(g); print('edited guides/veneer.md')
