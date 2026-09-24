#!/usr/bin/env python3
"""Rewrites the validation copy's guide from the base revision with every UTIL-TEXT edit."""
import subprocess
BASE='/home/user/veneer-ut/tmp/probe/base'
p=BASE+'/guides/veneer.md'
s=subprocess.run(['git','-C','/home/user/veneer-ut','show','2a3f223:guides/veneer.md'],capture_output=True,text=True,check=True).stdout
def rep(old,new,count=1):
    global s
    assert s.count(old)==count, (old[:80], s.count(old))
    s=s.replace(old,new)
# The exclusion line in both recipe fences.
rep('start-50 start-100");','start-50 start-100 text-wrap text-nowrap");',2)
# The compatibility rows, after the navbar variable row.
lines=s.split('\n')
idx=[i for i,l in enumerate(lines) if l.startswith('| navbar           | variable')][0]
def crow(comp,kind,obl):
    return f'| {comp} | {kind} | {obl} | — | shipped |'
lines[idx+1:idx+1]=[
 crow('text','selector',"Every official `.text-*` selector ships in the utilities layer: the alignment at every breakpoint infix, the decoration, transform, wrapping, and break classes, the role, body, and emphasis colors, the opacity steps, and the `.text-bg-*` color-and-background pairs; resolved values are proved in the `tests/src/styles/utilities/text.test.ts` and `tests/src/styles/utilities/color.test.ts` proofs."),
 crow('text','variable',"The `--bs-text-opacity` property is set to the `1` value by every text color class and to its step by each `.text-opacity-*` class, as normal declarations; the resolved alpha is proved in the `tests/src/styles/utilities/color.test.ts` proof."),
 crow('text-truncate','selector',"The official `.text-truncate` helper ships with normal declarations in the components layer; the ellipsis on a constrained box is proved in the `tests/src/styles/components/text-truncation.test.ts` proof."),
]
s='\n'.join(lines)
# The ledger table, after the table key's table.
rows=[
('.text-bg-primary','#fff','var(--vn-palette-white-base)'),
('.text-bg-secondary','#fff','var(--vn-palette-white-base)'),
('.text-bg-success','#fff','var(--vn-palette-white-base)'),
('.text-bg-info','#000','var(--vn-palette-black-base)'),
('.text-bg-warning','#000','var(--vn-palette-black-base)'),
('.text-bg-danger','#fff','var(--vn-palette-white-base)'),
('.text-bg-light','#000','var(--vn-palette-black-base)'),
('.text-bg-dark','#fff','var(--vn-palette-white-base)'),
('.text-black-50','rgba(0, 0, 0, 0.5)','rgba(var(--vn-palette-black-rgb), 0.5)'),
('.text-white-50','rgba(255, 255, 255, 0.5)','rgba(var(--vn-palette-white-rgb), 0.5)'),
]
table=['#### `text`','','| Component | Selector | Property | Condition | Bootstrap 5.3.8 | Veneer | Departure |','| --- | --- | --- | --- | --- | --- | --- |']
table+=[f'| `text` | `{sel}` | `color` | — | `{rec}` | `{emi}` | tokenized |' for sel,rec,emi in rows]
rep('#### `is-invalid`\n','\n'.join(table)+'\n\n#### `is-invalid`\n')
open(p,'w').write(s)
