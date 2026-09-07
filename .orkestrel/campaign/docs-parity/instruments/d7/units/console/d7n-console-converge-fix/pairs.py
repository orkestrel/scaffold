import re, sys, json
DIFF='/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-console-converge.diff.txt'
lines=open(DIFF,encoding='utf8').read().split('\n')
cur=None
i=0
blocks=[]  # (file, minus[], plus[])
minus=[]; plus=[]
def flush(f):
    global minus, plus
    if minus or plus: blocks.append((f, minus, plus))
    minus=[]; plus=[]
for l in lines:
    m=re.match(r'^diff --git a/(\S+) b/', l)
    if m:
        flush(cur); cur=m.group(1); continue
    if l.startswith('@@'):
        flush(cur); continue
    if l.startswith('---') or l.startswith('+++') or l.startswith('index '): continue
    if l.startswith('-'):
        if plus: flush(cur)
        minus.append(l[1:]); continue
    if l.startswith('+'):
        plus.append(l[1:]); continue
    flush(cur)
flush(cur)

out=[]
for f, mi, pl in blocks:
    if not f.startswith('src/'): continue
    if not any('{@link import(' in x for x in mi): continue
    out.append({'file':f,'minus':mi,'plus':pl})
json.dump(out, open('tmp/d7n-console-converge-fix/blocks.json','w'), indent=1)
print(len(out),'blocks')
for b in out:
    print('='*70)
    print(b['file'])
    for x in b['minus']: print('-'+x)
    for x in b['plus']: print('+'+x)
