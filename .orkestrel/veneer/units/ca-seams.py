# ca-seams.py: the joiner the three-way merge dropped at the CAROUSEL registry seam (the last alert row before the first carousel row); the anchor must match once.
import sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'seam refused: anchor count {n} in {path} for {old[:60]!r}')
    open(path,'w').write(s.replace(old,new))
edit('tests/setup.ts', "\t\tselector: '.alert-dismissible',\n\t\tproperty: 'padding-right',\n\t\tscenario: 'captioned-carousel',", "\t\tselector: '.alert-dismissible',\n\t\tproperty: 'padding-right',\n\t}),\n\tObject.freeze({\n\t\tscenario: 'captioned-carousel',")
print('ca seam joined')
# appended: the joiner dropped at the constants seam (the last collapse specimen before the Carousel copy constant).
s=open('app/browser/constants.ts').read(); a="\n/** Holds the Carousel section's visible copy and accessible name. */\n"
if s.count(a)!=1: sys.exit('seam refused: carousel copy anchor')
head, tail = s.split(a)
if head.endswith("\t}),\n])\n"): print('constants seam already closed')
else:
    if not head.endswith("',"): sys.exit('seam refused: unexpected line before the carousel copy: '+repr(head[-40:]))
    open('app/browser/constants.ts','w').write(head + "\n\t}),\n])\n" + a + tail); print('constants seam joined')
