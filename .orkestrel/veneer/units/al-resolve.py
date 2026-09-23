# al-resolve.py: resolve the ALERT patch's three-way conflicts on the disclosure landing (a658879). Every conflict is an
# append conflict at the disclosure keys' insertion points, so each keeps ours (the disclosure keys) then theirs (alert);
# the Alert region thereby follows Nav, the M14 placement the audit accepted for integration. The plugin block keeps the
# disclosure rows, adds the Alert row, and keeps the R8 sentence in NAV's wording (ALERT's variant dropped).
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
            row_al = theirs.split('\n')[0] + '\n'
            return rows_ours + row_al + tail
        return ours + theirs
    n=len(pat.findall(s)); s2=pat.sub(resolve, s)
    if '<<<<<<<' in s2 or '>>>>>>>' in s2: sys.exit(f'unresolved markers in {f}')
    open(f,'w').write(s2); report.append(f'{f}: {n} block(s)')
print('\n'.join(report))
