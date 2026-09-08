import re, subprocess

def rows(text):
    out = []
    for line in text.splitlines():
        if not line.startswith('| '): continue
        if re.match(r'^\|[\s:-]+\|', line): continue
        cells = [c.strip() for c in re.split(r'(?<!\\)\|', line)[1:-1]]
        out.append(cells)
    return out

base = rows(subprocess.run(['git','show','HEAD:guides/relation.md'],capture_output=True,text=True).stdout)
new  = rows(open('guides/relation.md').read())

bkey = {r[0]: r for r in base}
nkey = {r[0]: r for r in new}
print('baseline rows:', len(base), 'new rows:', len(new))
print('rows lost:', [k for k in bkey if k not in nkey])
print('rows gained:', [k for k in nkey if k not in bkey])
changed = []
for k, r in nkey.items():
    b = bkey.get(k)
    if b is None: continue
    # compare every cell except the last (Summary) of the new row
    for i in range(len(r) - 1):
        if i < len(b) and b[i] != r[i]:
            changed.append((k, i, b[i], r[i]))
for c in changed:
    print('NON-SUMMARY CHANGE:', c[0], 'col', c[1], '|', c[2], '=>', c[3])
print('non-summary changes:', len(changed))
