#!/usr/bin/env python3
"""bft landing integration: replace the § Input group classes consumer-radius paragraph with the reviewer's text (R12; claim 8)."""
p='/home/user/veneer/guides/veneer.md'; s=open(p).read()
start=s.index('The text control and select classes carry no radius of their own in this cascade')
end=s.index('rather than on a rendered floating', start)
end=s.index('label.', end)+len('label.')  # the span ends at the floating-label sentence's full stop
old=s[start:end]
assert old.count('\n')<=5, old
new=open('/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bft-guide-paragraph.txt').read().rstrip('\n')
s=s[:start]+new+s[end:]
open(p,'w').write(s); print('replaced', old.count('\n')+1, 'lines')
