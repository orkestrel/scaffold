# ud-seam-blank.py: insert the blank line the constants file keeps between a specimen list's closing `])` and the next
# doc comment, at the two seams the earlier joiner closed without it (before the Accordion copy and before the Display
# copy constants). Anchor-refusing; run from the landing checkout's root after the chain and before the push.
import sys
p='app/browser/constants.ts'; s=open(p).read()
for name in ('Accordion', 'Display'):
    old=f"])\n/** Holds the {name} section's visible copy and accessible name. */\n"
    new=f"])\n\n/** Holds the {name} section's visible copy and accessible name. */\n"
    n=s.count(old)
    if n!=1: sys.exit(f'seam refused: anchor count {n} for {name}')
    s=s.replace(old,new)
open(p,'w').write(s); print('blank lines inserted at the Accordion and Display seams')
