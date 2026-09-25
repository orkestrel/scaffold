# Resolves the § Phases and units table conflict of the 2026-09-25 merge of Veneer origin/main (the engine session's
# J-ENGINE row, 094a71e) into the styles session branch: each side's rows are compared, whitespace-normalized, against the
# merge base; a row only one side changed takes that side; a row both sides changed stops the resolver. oxfmt re-pads
# the table afterwards. Usage: python3 resolve-phases.py, from the Veneer checkout mid-merge.
import re, subprocess
p='ROADMAP.md'
s=open(p).read().split('\n')
a=s.index(next(l for l in s if l.startswith('<<<<<<< ')))
m=s.index('=======', a)
b=s.index(next(l for l in s[m:] if l.startswith('>>>>>>> ')), m)
ours, theirs = s[a+1:m], s[m+1:b]
base=subprocess.run(['git','show',':1:ROADMAP.md'],capture_output=True,text=True).stdout.split('\n')
def key(l): return l.split('|')[1].strip() if l.startswith('|') else None
def norm(l): return re.sub(r'\s+',' ','|'.join(c.strip() for c in l.split('|')))
bm={key(l):norm(l) for l in base if l.startswith('|') and key(l)}
tm={key(l):l for l in theirs}
out=[]
changed_ours=[]; changed_theirs=[]
for l in ours:
    k=key(l); t=tm.get(k)
    if k is None or t is None: out.append(l); continue
    o_ch = norm(l)!=bm.get(k); t_ch = norm(t)!=bm.get(k)
    if o_ch and t_ch and norm(l)!=norm(t): raise SystemExit('both changed '+k)
    if t_ch and not o_ch: out.append(t); changed_theirs.append(k)
    else:
        out.append(l)
        if o_ch: changed_ours.append(k)
missing=[k for k in tm if k not in {key(l) for l in ours}]
assert not missing, missing
s[a:b+1]=out
open(p,'w').write('\n'.join(s))
print('ours:',changed_ours); print('theirs:',changed_theirs)
