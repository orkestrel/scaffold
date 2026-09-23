#!/usr/bin/env python3
"""FLOATING landing integration on the session branch: the Validation classes sentence, the barrel's forms block in the release order (D35), and the ROADMAP carrier rows from b-forms-floating-report-2.md with the fix audit's wording repairs. The Set literal key is sort-inventories.py's."""
import re
root='/home/user/veneer'
g=root+'/guides/veneer.md'; s=open(g).read()
old="The validation keys ship whole in their own partial after the vertical rule in the components\nlayer:"
new="The validation keys ship whole in their own partial after the forms partials in the components\nlayer:"
assert s.count(old)==1,s.count(old); open(g,'w').write(s.replace(old,new)); print('guide: validation sentence')
b=root+'/src/styles/index.scss'; lines=open(b).read().split('\n')
order=['form-control','form-select','form-check','form-range','form-floating','input-group','validation']
idx=[i for i,l in enumerate(lines) if re.match(r"@use 'components/("+'|'.join(order)+r")';$",l)]
present=[re.match(r"@use 'components/([\w-]+)';$",lines[i]).group(1) for i in idx]
block=["@use 'components/%s';"%n for n in order if n in present]
first=idx[0]
for i in reversed(idx): del lines[i]
lines[first:first]=block
open(b,'w').write('\n'.join(lines)); print('barrel forms block:',[n for n in order if n in present])
rep='/home/user/scaffold/.orkestrel/veneer/units/b-forms-floating-report-2.md'; t=open(rep).read()
sec=t[t.index('## `ROADMAP.md` patch'):t.index('## Bounded sweep')]
rows=[l[1:] for l in sec.split('\n') if l.startswith('+| ')]
assert len(rows)==4,len(rows)
joined='\n'.join(rows)
for old,new in [
 ("reads it resolved once `.form-select` ships `appearance: none`","reads it resolved after the `.form-select` rule ships the `appearance: none` declaration"),
 ("`line-height: 1.25` has","`line-height: 1.25` declaration has"),
 ("`form-range.test.ts` and `form-floating.test.ts` each declare","the `form-range.test.ts` and `form-floating.test.ts` proofs each declare"),
]:
    assert joined.count(old)==1,(old,joined.count(old)); joined=joined.replace(old,new)
r=root+'/ROADMAP.md'; s=open(r).read()
anchor='| The ledger readers\' repeated default guide path'
i=s.index(anchor); s=s[:i]+joined+'\n'+s[i:]
open(r,'w').write(s); print('roadmap: rows inserted before the ledger-readers row')
