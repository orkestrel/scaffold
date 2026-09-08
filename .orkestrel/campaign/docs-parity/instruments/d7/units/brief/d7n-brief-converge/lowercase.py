import re, sys
KEEP = {'JSON','API','README','URL','LLM','MDN','MCP','DSL','AGENTS','CLAUDE','TS','SH','ISO','UUID','HTML','CSS'}
FENCE = re.compile(r'^\s*```')
SPAN = re.compile(r'`[^`]*`')

def fix_line(l):
    parts = []
    last = 0
    out = []
    # protect code spans
    spans = [(m.start(), m.end()) for m in SPAN.finditer(l)]
    def protected(i):
        return any(a <= i < b for a, b in spans)
    res = []
    for m in re.finditer(r'\b[A-Z]{2,}\b', l):
        if protected(m.start()):
            continue
        if m.group(0) in KEEP:
            continue
        res.append((m.start(), m.end(), m.group(0).lower()))
    if not res:
        return l
    new = []
    prev = 0
    for a, b, rep in res:
        new.append(l[prev:a]); new.append(rep); prev = b
    new.append(l[prev:])
    return ''.join(new)

for path in sys.argv[1:]:
    lines = open(path).read().split('\n')
    infence = False
    changed = 0
    for i, l in enumerate(lines):
        if FENCE.match(l):
            infence = not infence
            continue
        if infence:
            continue
        n = fix_line(l)
        if n != l:
            lines[i] = n
            changed += 1
    open(path, 'w').write('\n'.join(lines))
    print(path, 'lines changed:', changed)
