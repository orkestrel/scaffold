import re, sys
FENCE=re.compile(r'^```')
for path in sys.argv[1:]:
    lines=open(path).read().split('\n')
    infence=False
    for i,l in enumerate(lines,1):
        if FENCE.match(l.strip()):
            infence = not infence
            continue
        if infence: continue
        stripped=re.sub(r'`[^`]*`','',l)
        for m in re.finditer(r'\b[A-Z]{2,}\b', stripped):
            w=m.group(0)
            print(f'{path}:{i}: {w}\t{l.strip()[:110]}')
