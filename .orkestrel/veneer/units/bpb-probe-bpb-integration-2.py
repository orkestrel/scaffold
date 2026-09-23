#!/usr/bin/env python3
"""bpb landing integration, second step: reflow the pagination value paragraph so the section sign and its noun stay on one line (the first step's wrap split them). Runs in the tree named by argv[1]."""
import sys, textwrap
root=sys.argv[1]; p=f'{root}/guides/veneer.md'; g=open(p).read()
start=g.index("Every value the family paints is Bootstrap 5.3.8's own, apart from")
end=g.index("\n\n", start)
para=' '.join(line.strip() for line in g[start:end].split('\n')).replace('§ Additions','§\x00Additions')
wrapped='\n'.join(textwrap.wrap(para, width=100, break_long_words=False, break_on_hyphens=False)).replace('\x00',' ')
assert '§\n' not in wrapped and '\n§' not in wrapped.replace('\n§ Additions','')
g=g[:start]+wrapped+g[end:]; open(p,'w').write(g); print('reflowed')
