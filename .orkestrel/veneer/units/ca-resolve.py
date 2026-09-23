# ca-resolve.py: resolve the CAROUSEL patch's three-way conflicts on the session head (4977d09: the disclosure and ALERT
# landings over c3ac297). Every conflict is an append conflict at the disclosure and alert insertion points, so each keeps
# ours (the disclosure and alert lines) then theirs (carousel); the Carousel region thereby follows Alert, the placement
# the audit accepted for integration (after the last constructed region). The plugin block keeps the disclosure and Alert
# rows, adds the Carousel row, and keeps the R8 sentence in NAV's wording (CAROUSEL's variant dropped). The registry's
# declined-frame remark keeps the collapse paragraph and adds the carousel paragraph after a blank comment line.
import re, sys, subprocess
files=[l[3:] for l in subprocess.run(['git','status','--porcelain'],capture_output=True,text=True).stdout.split('\n') if l.startswith('UU')]
pat=re.compile(r'<<<<<<< ours\n(.*?)=======\n(.*?)>>>>>>> theirs\n', re.S)
report=[]
for f in files:
    s=open(f).read()
    def resolve(m):
        ours, theirs = m.group(1), m.group(2)
        if f=='guides/veneer.md' and 'A `plugin` row records a behavior J-ENGINE owns' in ours:
            rows_ours = ours.split('\n\nA `plugin` row records')[0] + '\n'
            tail = ours[len(rows_ours):]
            row_ca = theirs.split('\n')[0] + '\n'
            return rows_ours + row_ca + tail
        if f=='tests/setup.ts' and theirs.startswith(' * A carousel slide'):
            return ours + ' *\n' + theirs
        return ours + theirs
    n=len(pat.findall(s)); s2=pat.sub(resolve, s)
    if '<<<<<<<' in s2 or '>>>>>>>' in s2: sys.exit(f'unresolved markers in {f}')
    open(f,'w').write(s2); report.append(f'{f}: {n} block(s)')
print('\n'.join(report))
