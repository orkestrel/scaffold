import sys, re
p = sys.argv[1]
text = open(p, encoding="utf-8").read()
lines = text.split("\n")
for m in re.finditer(r"/\*\*[\s\S]*?\*/", text):
    start = text[:m.start()].count("\n")
    end = text[:m.end()].count("\n")
    raw = m.group(0)
    if start == end:
        stripped = [raw[3:-2].strip()]
    else:
        inner = raw.split("\n")
        stripped = [re.sub(r"^\s*\*\s?", "", l) for l in inner[1:-1]]
    first = []
    for l in stripped:
        if l.strip() == "" or l.strip().startswith("@"):
            break
        first.append(l.rstrip())
    rets = [l.rstrip() for l in stripped if l.strip().startswith("@returns")]
    decl = ""
    for i in range(end+1, min(end+3, len(lines))):
        if lines[i].strip():
            decl = lines[i].strip()
            break
    print(f"--- L{start+1} :: {decl[:110]}")
    for l in first: print("  |" + l)
    for l in rets: print("  R|" + l)
