# al-seams.py: the joiner the three-way merge dropped at the ALERT registry seam (the last collapse row before the first alert row); the anchor must match once.
import sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'seam refused: anchor count {n} in {path} for {old[:60]!r}')
    open(path,'w').write(s.replace(old,new))
edit('tests/setup.ts', "\t\tselector: '.card:has(> .collapse-horizontal)',\n\t\tproperty: 'height',\n\t\tscenario: 'role-alerts',", "\t\tselector: '.card:has(> .collapse-horizontal)',\n\t\tproperty: 'height',\n\t}),\n\tObject.freeze({\n\t\tscenario: 'role-alerts',")
print('al seam joined')
