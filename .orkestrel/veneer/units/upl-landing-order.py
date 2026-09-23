# upl-landing-order.py: the UTIL-PLACEMENT landing's integration edit. The append resolution of the `@use` block in
# src/styles/index.scss placed the position helpers after the stack helpers UTIL-DISPLAY landed, and the conformance
# proof "loads the passive block and the helpers in the release order" reads the release order as icon-link, ratio,
# position, stacks, vr. Moves the position line above the stacks line. Anchor-refusing.
import sys
p='/home/user/veneer/src/styles/index.scss'; s=open(p).read()
old="@use 'components/stacks';\n@use 'components/position' as position-component;\n"
new="@use 'components/position' as position-component;\n@use 'components/stacks';\n"
if s.count(old)!=1: sys.exit(f'integration refused: anchor count {s.count(old)}')
open(p,'w').write(s.replace(old,new)); print('index.scss: position before stacks')
