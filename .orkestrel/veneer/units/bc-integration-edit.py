#!/usr/bin/env python3
"""C landing integration edit (fix-audit claim 5): drop the sentence tallying the card's radii and
rewrap the paragraph at the guide's width."""
import textwrap
p='/home/user/veneer/guides/veneer.md'
lines=open(p).read().split('\n')
i=next(k for k,l in enumerate(lines) if l.startswith('A card reads two radii. '))
j=i
while j<len(lines) and lines[j].strip()!='': j+=1
para=' '.join(l.strip() for l in lines[i:j]).replace('A card reads two radii. ','',1)
wrapped=textwrap.wrap(para, width=100, break_long_words=False, break_on_hyphens=False)
lines[i:j]=wrapped
open(p,'w').write('\n'.join(lines))
print('\n'.join(wrapped))
