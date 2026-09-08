import re
import subprocess
import sys

SPLIT = re.compile(r'(?<!\\)\|')


def rows(text):
    out = []
    header = None
    for line in text.split('\n'):
        s = line.strip()
        if not s.startswith('|'):
            header = None
            continue
        cells = [c.strip() for c in SPLIT.split(s)[1:-1]]
        if all(set(c) <= set('-: ') and c for c in cells):
            continue
        if header is None:
            header = cells
            out.append(('HEADER', tuple(header)))
            continue
        out.append((cells[0], tuple(zip(header, cells))))
    return out


before = rows(subprocess.run(['git', 'show', 'HEAD:guides/rater.md'], capture_output=True, text=True, cwd='/home/user/fleet/rater').stdout)
after = rows(open('/home/user/fleet/rater/guides/rater.md').read())

bmap = {}
for key, value in before:
    bmap.setdefault(key, []).append(value)
amap = {}
for key, value in after:
    amap.setdefault(key, []).append(value)

print('== headers ==')
for value in bmap.get('HEADER', []):
    print('  before:', ' | '.join(value))
for value in amap.get('HEADER', []):
    print('  after :', ' | '.join(value))

print('\n== non-Summary cells, per row key ==')
for key in sorted(set(bmap) | set(amap)):
    if key == 'HEADER':
        continue
    b = bmap.get(key, [])
    a = amap.get(key, [])
    bcells = {h: c for pairs in b for h, c in pairs if h != 'Summary'}
    acells = {h: c for pairs in a for h, c in pairs if h != 'Summary'}
    if bcells == acells:
        print(f'  {key}: unchanged {bcells}')
    else:
        print(f'  {key}:')
        print(f'      before {bcells}')
        print(f'      after  {acells}')
