import io,re,sys
FILES=['src/core/constants.ts','src/server/constants.ts','src/browser/constants.ts']
out={}
for f in FILES:
    src=io.open(f,encoding='utf8').read()
    for m in re.finditer(r'^export const ([A-Z0-9_]+)(?:\s*:\s*([^=]+?))?\s*=\s*(.*)$', src, re.M):
        name, ann, val = m.group(1), m.group(2), m.group(3).rstrip()
        out[name]=(f, (ann or '').strip(), val.strip())
for n in sys.argv[1:] or sorted(out):
    f,a,v = out.get(n,('?','',''))
    print(f"{n}\t{a}\t{v}")
