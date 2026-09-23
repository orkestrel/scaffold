#!/usr/bin/env python3
"""cm landing integration (the analyst's claim 6): the two file tokens in the styles setup module's head comment take their nouns, the paragraph reflowed at 100 columns. Runs in the tree named by argv[1]."""
import sys, textwrap
root=sys.argv[1]; p=f'{root}/tests/setupStyles.ts'; s=open(p).read()
lines=s.split('\n'); hi=0
while lines[hi].startswith('// '): hi+=1
para=' '.join(l[3:].strip() for l in lines[:hi])
old1="A helper that reads a file or a process belongs in `tests/setupServer.ts`, and a helper that drives a document belongs in `tests/setupBrowser.ts`."
new1="A helper that reads a file or a process belongs in the `tests/setupServer.ts` module, and a helper that drives a document belongs in the `tests/setupBrowser.ts` module."
assert para.count(old1)==1; para=para.replace(old1,new1)
wrapped=['// '+l for l in textwrap.wrap(para, width=97, break_long_words=False, break_on_hyphens=False)]
open(p,'w').write('\n'.join(wrapped+lines[hi:])); print('edited tests/setupStyles.ts')
