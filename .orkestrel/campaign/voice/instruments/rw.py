import sys, json
edits = json.load(open(sys.argv[1]))
for e in edits:
    p = e["file"]
    text = open(p, encoding="utf-8").read()
    for pair in e["pairs"]:
        old, new = pair[0], pair[1]
        want = pair[2] if len(pair) > 2 else 1
        n = text.count(old)
        if n != want:
            print(f"FAIL {p}: {n} matches (want {want}) for {old[:90]!r}")
            sys.exit(1)
        text = text.replace(old, new)
    open(p, "w", encoding="utf-8").write(text)
    print(f"ok {p} ({len(e['pairs'])} edits)")
