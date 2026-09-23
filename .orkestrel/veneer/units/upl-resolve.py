# upl-resolve.py: resolve the UTIL-PLACEMENT patch's three-way conflicts on the session head (55ca0cd and later: the
# disclosure, ALERT, CAROUSEL, UTIL-DISPLAY landings and the engine's rollup fix over e4e6a40). Three conflict shapes:
# an `@source not inline("...")` line both sides extended (the guide's Tailwind fences, tests/setup.css, and the
# consumer and preflight fixtures) resolves to the union of the two token lists in ours' order with theirs' new tokens
# appended where theirs places them, each token once; the guide's file table (both sides added rows and theirs re-padded
# the columns) resolves to ours' rows plus theirs' rows absent from ours, keyed by the File cell, in theirs' padding
# (oxfmt re-pads either way); every other conflict is an append conflict at the landed insertion points and keeps ours
# then theirs. The sorted inventory lists are re-sorted by sort-inventories.py after this script.
import re, sys, subprocess
files=[l[3:] for l in subprocess.run(['git','status','--porcelain'],capture_output=True,text=True).stdout.split('\n') if l.startswith('UU')]
pat=re.compile(r'<<<<<<< ours\n(.*?)=======\n(.*?)>>>>>>> theirs\n', re.S)
src=re.compile(r'^(\s*@source not inline\(")([^"]*)("\).*)$')
def union_source(o, t):
    mo, mt = src.match(o), src.match(t)
    if not (mo and mt) or mo.group(1)!=mt.group(1) or mo.group(3)!=mt.group(3): sys.exit('source line shape differs: '+repr(o[:60]))
    a, b = mo.group(2).split(), mt.group(2).split()
    out=list(a)
    for tok in b:
        if tok not in out: out.append(tok)
    return mo.group(1)+' '.join(out)+mo.group(3)
def cell(l): return l.split('|')[1].strip() if l.startswith('|') else l
def union_table(o, t):
    ours=[l for l in o.split('\n') if l]; theirs=[l for l in t.split('\n') if l]
    if not (ours[0].startswith('| File') and theirs[0].startswith('| File')): sys.exit('table conflict shape')
    keys={cell(l) for l in ours}
    extra=[l for l in theirs[2:] if cell(l) not in keys]
    return '\n'.join(ours+extra)+'\n'
report=[]
for f in files:
    s=open(f).read()
    def resolve(m):
        ours, theirs = m.group(1), m.group(2)
        ol, tl = ours.strip('\n').split('\n'), theirs.strip('\n').split('\n')
        if len(ol)==1 and len(tl)==1 and src.match(ol[0]) and src.match(tl[0]):
            return union_source(ol[0], tl[0])+'\n'
        if ol[0].startswith('| File') and tl[0].startswith('| File'):
            return union_table(ours, theirs)
        return ours + theirs
    n=len(pat.findall(s)); s2=pat.sub(resolve, s)
    if '<<<<<<<' in s2 or '>>>>>>>' in s2: sys.exit(f'unresolved markers in {f}')
    open(f,'w').write(s2); report.append(f'{f}: {n} block(s)')
print('\n'.join(report))
