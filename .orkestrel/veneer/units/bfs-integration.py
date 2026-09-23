#!/usr/bin/env python3
"""bfs landing integration: append the reviewer's three sentences to § Input group classes after the `Input group button` page-frame sentence (R12; claim 8)."""
p='/home/user/veneer/guides/veneer.md'; s=open(p).read()
anchor_start=s.index('The page frame the')  # the `Input group button` page-frame sentence opens here
para_end=s.index('\n\n', anchor_start)      # the paragraph holding it ends at the blank line
new=open('/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfs-guide-sentences.txt').read().rstrip('\n')
s=s[:para_end]+' '+new.replace('\n',' ')+s[para_end:]
open(p,'w').write(s); print('appended after the page-frame paragraph')
