#!/usr/bin/env python3
"""SELECT landing integration on the session branch: the barrel's forms block in the release order (D35) and the ROADMAP carrier rows from b-forms-select-report-3.md (the D37 row and the guide-wide token-noun sweep row added; the D26 row's cell replaced by the fuller site list; the MOTION row skipped because the FLOATING landing already carries that finding to B-PASSIVE-CLOSE). The Set literal key is sort-inventories.py's; the floating select sentences go to the FLOATING-SELECT builder unit."""
import re
root='/home/user/veneer'
b=root+'/src/styles/index.scss'; lines=open(b).read().split('\n')
order=['form-control','form-select','form-check','form-range','form-floating','input-group','validation']
idx=[i for i,l in enumerate(lines) if re.match(r"@use 'components/("+'|'.join(order)+r")';$",l)]
present=[re.match(r"@use 'components/([\w-]+)';$",lines[i]).group(1) for i in idx]
block=["@use 'components/%s';"%n for n in order if n in present]
first=idx[0]
for i in reversed(idx): del lines[i]
lines[first:first]=block
open(b,'w').write('\n'.join(lines)); print('barrel forms block:',[n for n in order if n in present])
rep='/home/user/scaffold/.orkestrel/veneer/units/b-forms-select-report-3.md'; t=open(rep).read()
sec=t[t.index('## ROADMAP patch (restated)'):]
sec=sec[:sec.index('\n## ',10)] if '\n## ' in sec[10:] else sec
rows={}
for l in sec.split('\n'):
    if l.startswith('+| '):
        item=l[3:].split('|')[0].strip(); rows[item]=re.sub(r' {3,}',' ',l[1:])
r=root+'/ROADMAP.md'; s=open(r).read()
d37=[v for k,v in rows.items() if k.startswith("The forms controls' focus indicator under forced colours")]; assert len(d37)==1
sweep=[v for k,v in rows.items() if k.startswith('The guide-wide token-noun sweep')]; assert len(sweep)==1
assets=[v for k,v in rows.items() if k.startswith('Theme-scope select caret and switch knob')]; assert len(assets)==1
assert s.count('forced colours (`.form-select:focus`')==0 and s.count('guide-wide token-noun sweep')==0
anchor='| The ledger readers\' repeated default guide path'
i=s.index(anchor); s=s[:i]+d37[0]+'\n'+sweep[0]+'\n'+s[i:]
m=re.search(r'^\| Theme-scope select caret and switch knob +\|[^\n]*$',s,re.M); assert m, 'no assets row'
s=s[:m.start()]+assets[0]+s[m.end():]
open(r,'w').write(s); print('roadmap: D37 row and token-noun sweep row inserted; the D26 row cell replaced')
