# ud-resolve.py: resolve the UTIL-DISPLAY patch's three-way conflicts on the session head (55ca0cd: the disclosure, ALERT,
# CAROUSEL, and BROWSER-SERIALIZATION landings and the engine's rollup fix over e4e6a40). Every conflict is an append
# conflict at the collapse, alert, and carousel insertion points, so each keeps ours (the landed lines) then theirs
# (display); the Display region thereby follows Carousel, after the last constructed region. The sorted import, export,
# and inventory lists are re-sorted by sort-inventories.py after this script. No plugin row is added.
import re, sys, subprocess
files=[l[3:] for l in subprocess.run(['git','status','--porcelain'],capture_output=True,text=True).stdout.split('\n') if l.startswith('UU')]
pat=re.compile(r'<<<<<<< ours\n(.*?)=======\n(.*?)>>>>>>> theirs\n', re.S)
report=[]
for f in files:
    s=open(f).read()
    def resolve(m):
        ours, theirs = m.group(1), m.group(2)
        return ours + theirs
    n=len(pat.findall(s)); s2=pat.sub(resolve, s)
    if '<<<<<<<' in s2 or '>>>>>>>' in s2: sys.exit(f'unresolved markers in {f}')
    open(f,'w').write(s2); report.append(f'{f}: {n} block(s)')
print('\n'.join(report))
