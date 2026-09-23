# ac-resolve.py: resolve the ACCORDION patch's three-way conflicts on the session head (55ca0cd and later: the ALERT,
# CAROUSEL, and BROWSER-SERIALIZATION landings and the engine's rollup fix over a658879). Every conflict is an append
# conflict at the alert and carousel insertion points, so each keeps ours (the landed lines) then theirs (accordion);
# the Accordion region thereby follows Carousel. The guide's ledger rows append in landing order. The sorted inventory
# lists are re-sorted by sort-inventories.py after this script, and land-seams.py joins the dropped closings.
import re, sys, subprocess
files=[l[3:] for l in subprocess.run(['git','status','--porcelain'],capture_output=True,text=True).stdout.split('\n') if l.startswith('UU')]
pat=re.compile(r'<<<<<<< ours\n(.*?)=======\n(.*?)>>>>>>> theirs\n', re.S)
report=[]
for f in files:
    s=open(f).read()
    n=len(pat.findall(s)); s2=pat.sub(lambda m: m.group(1)+m.group(2), s)
    if '<<<<<<<' in s2 or '>>>>>>>' in s2: sys.exit(f'unresolved markers in {f}')
    open(f,'w').write(s2); report.append(f'{f}: {n} block(s)')
print('\n'.join(report))
