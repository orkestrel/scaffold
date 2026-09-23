# upl-landing-order-2.py: successor of upl-landing-order.py for the UTIL-PLACEMENT landing's second integration edit. The
# append resolution of the two `@use 'utilities/…'` conflict blocks in src/styles/index.scss placed the visually-hidden
# helper after the flex utilities and the position and sizing utilities after them, and the conformance proof "loads
# the passive block and the helpers in the release order" reads the release order as visually-hidden, vertical-align,
# display, position, sizing, flex, gap, visibility. Reorders the block's lines to that sequence, each line's text kept
# (its alias included). Anchor-refusing: the block's set of utility names must equal the expected set.
import re, sys
p='/home/user/veneer/src/styles/index.scss'; s=open(p).read()
order=['visually-hidden','vertical-align','display','position','sizing','flex','gap','visibility']
lines=s.split('\n')
idx=[i for i,l in enumerate(lines) if re.match(r"@use 'utilities/[\w-]+'", l)]
if idx!=list(range(idx[0], idx[0]+len(idx))): sys.exit('integration refused: the utilities block is not contiguous')
names={re.match(r"@use 'utilities/([\w-]+)'", lines[i]).group(1): lines[i] for i in idx}
if set(names)!=set(order): sys.exit(f'integration refused: names {sorted(names)} vs expected {sorted(order)}')
lines[idx[0]:idx[-1]+1]=[names[n] for n in order]
open(p,'w').write('\n'.join(lines)); print('index.scss utilities: ' + ', '.join(order))
