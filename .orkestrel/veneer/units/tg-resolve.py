# tg-resolve.py: resolve the TOGGLES patch's three-way conflicts on the session head (the UTIL-DISPLAY landing tip and later,
# over a658879). The TOGGLES patch adds no region: it edits the button-group and input-group specimens and doc blocks in
# `app/browser/constants.ts`, the guide's button-group, input-group, and dropdown sections, registry rows in `tests/setup.ts`,
# and tables in `tests/setupStyles.ts` and `tests/setupStyles.test.ts`. Every conflict is an append conflict at a landed
# insertion point (a sorted import or export list, a registry seam, a ledger seam), so each keeps ours (the landed lines) then
# theirs (toggles); a Markdown table both sides extended and re-padded (its header and separator in both sides) resolves to
# ours' rows plus theirs' rows absent from ours, keyed by the first cell (oxfmt re-pads it); `sort-inventories.py` re-sorts the sorted lists and `land-seams.py` joins the dropped closings. A conflict
# whose ours side and theirs side rewrite the same sentence (the dropdown compatibility cell or the § Dropdown classes sentence
# that NAVBAR also rewrites) stops this script by name, because that collision is the Orchestrator's ruling at the NAVBAR landing.
import re, sys, subprocess
files=[l[3:] for l in subprocess.run(['git','status','--porcelain'],capture_output=True,text=True).stdout.split('\n') if l.startswith('UU')]
def cell(l): return l.split('|')[1].strip() if l.startswith('|') else l
pat=re.compile(r'<<<<<<< ours\n(.*?)=======\n(.*?)>>>>>>> theirs\n', re.S)
report=[]
for f in files:
    s=open(f).read()
    def resolve(m):
        ours, theirs = m.group(1), m.group(2)
        ol, tl = ours.strip('\n').split('\n'), theirs.strip('\n').split('\n')
        if len(ol)>1 and len(tl)>1 and ol[0].startswith('| ') and tl[0].startswith('| ') and ol[1].startswith('| -') and tl[1].startswith('| -'):
            keys={cell(l) for l in ol}
            return '\n'.join(ol+[l for l in tl[2:] if cell(l) not in keys])+'\n'
        if f=='guides/veneer.md' and ('dropdown' in ours.lower() and 'dropdown' in theirs.lower()) and not ours.lstrip().startswith('|') and not theirs.lstrip().startswith('|'):
            sys.exit(f'collision refused in {f}: ours {ours[:80]!r} theirs {theirs[:80]!r}')
        return ours + theirs
    n=len(pat.findall(s)); s2=pat.sub(resolve, s)
    if '<<<<<<<' in s2 or '>>>>>>>' in s2: sys.exit(f'unresolved markers in {f}')
    open(f,'w').write(s2); report.append(f'{f}: {n} block(s)')
print('\n'.join(report))
