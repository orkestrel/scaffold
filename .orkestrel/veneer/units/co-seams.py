# co-seams.py: the joiners the three-way merge dropped at the COLLAPSE append seams (each anchor must match once).
import re, sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'seam refused: anchor count {n} in {path} for {old[:60]!r}')
    open(path,'w').write(s.replace(old,new))
# the NAV specimens' last entry (Tab panes) closes, and the array closes, before the Collapse copy
p='app/browser/constants.ts'; s=open(p).read()
pat=re.compile(r"(\t\t\t'<div class=\"tab-content\">[^\n]*\n)(/\*\* Holds the Collapse section's visible copy and accessible name\. \*/)")
if len(pat.findall(s))!=1: sys.exit('seam refused: tab panes anchor')
s=pat.sub(lambda m: m.group(1)+'\t}),\n])\n\n'+m.group(2), s); open(p,'w').write(s)
# the registry: the tab-panes row closes before the collapse-shown row
edit('tests/setup.ts', "\t\tselector: '.tab-content > .active',\n\t\tproperty: 'display',\n\t\tscenario: 'collapse-shown',", "\t\tselector: '.tab-content > .active',\n\t\tproperty: 'display',\n\t}),\n\tObject.freeze({\n\t\tscenario: 'collapse-shown',")
print('co seams joined')
