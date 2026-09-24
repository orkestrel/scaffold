# Resolves every merge conflict block in a file by keeping the HEAD side (the unit's branch) and
# dropping the incoming side, for hunks a unit rewrote that main also touched (J-ISINSTANCE).
# Usage: python resolve-ours.py <file>
import sys
from pathlib import Path

path = Path(sys.argv[1])
lines = path.read_text(encoding='utf-8').split('\n')
out = []
state = 'copy'
blocks = 0
for line in lines:
    if line.startswith('<<<<<<< '):
        state = 'ours'
        blocks += 1
        continue
    if state == 'ours' and line.startswith('======='):
        state = 'theirs'
        continue
    if state == 'theirs' and line.startswith('>>>>>>> '):
        state = 'copy'
        continue
    if state in ('copy', 'ours'):
        out.append(line)
path.write_text('\n'.join(out), encoding='utf-8')
print(f'{path.name}: kept HEAD in {blocks} conflict blocks')
