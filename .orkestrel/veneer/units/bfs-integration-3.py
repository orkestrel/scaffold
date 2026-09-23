#!/usr/bin/env python3
"""bfs landing correction: the three tooltip sentences were appended after the FIRST `The page frame the` sentence (the range section); move them to the § Input group classes paragraph holding the `Input group button` page-frame sentence."""
import textwrap
p='/home/user/veneer/guides/veneer.md'; s=open(p).read()
new=' '.join(open('/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfs-guide-sentences.txt').read().split())
def rewrap(s, pos):
    a=s.rindex('\n\n',0,pos)+2; b=s.index('\n\n',pos)
    para=' '.join(s[a:b].split())
    return s[:a]+textwrap.fill(para,width=100,break_long_words=False,break_on_hyphens=False)+s[b:]
# 1. remove from the wrong paragraph (compare on whitespace-normalized text)
wrong=s.index('the ring paints on a part with no resolved reading')
a=s.rindex('\n\n',0,wrong)+2; b=s.index('\n\n',wrong)
para=' '.join(s[a:b].split())
assert new in para, 'sentences not in the range paragraph'
para=para.replace(' '+new,'')
s=s[:a]+textwrap.fill(para,width=100,break_long_words=False,break_on_hyphens=False)+s[b:]
# 2. append to the input-group paragraph
anchor=s.index("the capture journey writes shows the `Input group button` specimen's control under keyboard")
b=s.index('\n\n',anchor)
s=s[:b]+' '+new+s[b:]
s=rewrap(s, anchor)
open(p,'w').write(s); print('moved')
