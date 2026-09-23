# nv-resolve.py: resolve the NAV patch's three-way conflicts on the DROPDOWN landing (append conflicts keep ours then theirs;
# the conformance comment keeps the merged case and gains NAV's clause; the plugin rows keep the R8 sentence last).
import re, sys, subprocess
files=[l[3:] for l in subprocess.run(['git','status','--porcelain'],capture_output=True,text=True).stdout.split('\n') if l.startswith('UU')]
pat=re.compile(r'<<<<<<< ours\n(.*?)=======\n(.*?)>>>>>>> theirs\n', re.S)
report=[]
for f in files:
    s=open(f).read()
    def resolve(m):
        ours, theirs = m.group(1), m.group(2)
        if f=='tests/conformance.test.ts':
            assert ours.startswith('\t// sequence. The release also imports')
            return ours.replace('\t// sequence. The release also imports', '\t// sequence, and the nav partial joins the block at the release\'s position between the button\n\t// group and the card. The release also imports', 1)
        if f=='guides/veneer.md' and 'A `plugin` row records a behavior J-ENGINE owns' in ours:
            row_dd = ours.split('\n')[0] + '\n'
            tail = ours[len(row_dd):]
            return row_dd + theirs + tail
        return ours + theirs
    n=len(pat.findall(s))
    s2=pat.sub(resolve, s)
    if '<<<<<<<' in s2 or '>>>>>>>' in s2: sys.exit(f'unresolved markers in {f}')
    open(f,'w').write(s2); report.append(f'{f}: {n} block(s) resolved')
print('\n'.join(report))
