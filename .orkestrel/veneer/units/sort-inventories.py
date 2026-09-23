#!/usr/bin/env python3
"""Sort every string-literal array that follows a `.sort())` expectation in the named test files, and
add the named keys to the shipped-key Set literal in tests/setupServer.test.ts, sorted."""
import re, sys
root=sys.argv[1]; keys=sys.argv[2:]
pat=re.compile(r"(\.sort\(\)\)\s*\.to(?:Strict)?Equal\(\s*\[)(\n(?:\s*'[^']*',\n)+)(\s*\])", re.M)
for f in ['tests/setupBrowser.test.ts','tests/setupStyles.test.ts','tests/setup.test.ts','tests/app/browser/index.test.ts','tests/setupServer.test.ts','tests/conformance.test.ts']:
    p=f'{root}/{f}'; s=open(p).read(); n=0
    def fix(m):
        global n
        body=m.group(2); items=re.findall(r"'([^']*)'", body)
        indent=re.match(r"\n(\s*)", body).group(1)
        srt=sorted(items)
        if srt!=items: n+=1
        return m.group(1)+'\n'+''.join(f"{indent}'{x}',\n" for x in srt)+m.group(3)
    s2=pat.sub(fix, s)
    if s2!=s: open(p,'w').write(s2)
    print(f, 'arrays resorted:', n)
# the conformance proof's component list is compared against the guide's sorted shipped set
cp=f'{root}/tests/conformance.test.ts'; c=open(cp).read()
m=re.search(r"(const listed(?::[^=]*)? = \[)(\n(?:\s*'[^']*',\n)+)(\s*\])", c)
if m:
    items=re.findall(r"'([^']*)'", m.group(2)); indent=re.match(r"\n(\s*)", m.group(2)).group(1)
    if items!=sorted(items):
        c=c[:m.start(2)]+'\n'+''.join(f"{indent}'{x}',\n" for x in sorted(items))+c[m.end(2):]; open(cp,'w').write(c); print('conformance listed resorted')
p=f'{root}/tests/setupServer.test.ts'; t=open(p).read().split('\n')
i=next(k for k,l in enumerate(t) if 'new Set([' in l and k>1200)
j=next(k for k in range(i,len(t)) if t[k].strip().startswith(']),'))
rows=[l.strip().strip(',').strip("'") for l in t[i+1:j] if l.strip().startswith("'")]
new=sorted(set(rows)|set(keys)); indent=t[i+1][:len(t[i+1])-len(t[i+1].lstrip())]
t[i+1:j]=[f"{indent}'{r}'," for r in new]; open(p,'w').write('\n'.join(t))
print('set literal', len(rows), '->', len(new), 'added', sorted(set(new)-set(rows)))
