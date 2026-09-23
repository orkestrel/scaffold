# co-resolve.py: resolve the COLLAPSE patch's three-way conflicts on the DROPDOWN and NAV landings. Barrel order puts
# collapse before dropdown, so the barrel, the section order, the region lists, the sorted literals, the compatibility
# rows, the plugin rows, and the § Tests links take theirs (collapse) before ours; the registry and the fixtures append in
# landing order (ours then theirs); the conformance comment keeps the merged case and gains COLLAPSE's stem clause; the
# plugin block keeps DROPDOWN's R8 sentence and drops COLLAPSE's.
import re, sys, subprocess
files=[l[3:] for l in subprocess.run(['git','status','--porcelain'],capture_output=True,text=True).stdout.split('\n') if l.startswith('UU')]
pat=re.compile(r'<<<<<<< ours\n(.*?)=======\n(.*?)>>>>>>> theirs\n', re.S)
THEIRS_FIRST={'src/styles/index.scss','app/browser/Showcase.ts','app/browser/index.ts','tests/app/browser/Showcase.test.ts','tests/setupServer.test.ts'}
report=[]
for f in files:
    s=open(f).read()
    def resolve(m):
        ours, theirs = m.group(1), m.group(2)
        if f=='tests/conformance.test.ts':
            if ours.startswith('\t// stem, so this case maps them'):
                return ours.replace('\t// stem, so this case maps them the way the forms case maps its own renamed partials. The\n\t// passive block', "\t// stem, and it writes the collapse classes in its `transitions` partial, which Veneer writes as\n\t// the `collapse` stem, so this case maps them the way the forms case maps its own renamed\n\t// partials. The passive block", 1)
            return theirs + ours
        if f=='guides/veneer.md':
            if 'A `plugin` row records a behavior J-ENGINE owns' in ours:
                row_co = theirs.split('\n')[0] + '\n'
                return row_co + ours
            if theirs.startswith('### Collapse classes'):
                return theirs + ('\n' if not theirs.endswith('\n\n') else '') + ours
            return theirs + ours
        if f in THEIRS_FIRST: return theirs + ours
        return ours + theirs
    n=len(pat.findall(s)); s2=pat.sub(resolve, s)
    if '<<<<<<<' in s2 or '>>>>>>>' in s2: sys.exit(f'unresolved markers in {f}')
    open(f,'w').write(s2); report.append(f'{f}: {n} block(s)')
print('\n'.join(report))
