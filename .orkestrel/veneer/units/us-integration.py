# us-integration.py: the landing's integration edits for UTIL-SPACER (the round-2 audit's SC3 and the comment half of M2),
# each with the lane's exact wording; every anchor must match exactly once.
import sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'integration refused: anchor count {n} in {path} for {old[:50]!r}')
    open(path,'w').write(s.replace(old,new))
edit('src/styles/_mixins.scss', 'adds a second class after the base class', 'adds a class after the base class')
edit('tests/app/browser/sections/LayoutSection.test.ts', 'lays two plain items out', 'lays a plain item and its neighbor out')
edit('tests/app/browser/sections/LayoutSection.test.ts', 'The two leading items', 'The leading item and its neighbor')
print('integration edits applied')
