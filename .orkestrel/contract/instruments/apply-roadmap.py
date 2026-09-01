# Applies the campaign's ROADMAP contract-row text to scaffold's ROADMAP.md.
# Usage: python3 apply-roadmap.py <contract commit sha> <roadmap-final.md>
import sys
sha, draft_path = sys.argv[1], sys.argv[2]
p = '/home/user/scaffold/ROADMAP.md'
s = open(p).read()
lines = s.split('\n')
start = next(i for i, l in enumerate(lines) if l.startswith('  performance campaign accepted 2026-09-01: the promoted tracking ledger'))
end = next(i for i, l in enumerate(lines) if i > start and l.rstrip().endswith('hostile-intrinsics test project.'))
draft = open(draft_path).read().rstrip('\n').replace('CONTRACT_SHA', sha).split('\n')
assert all(l.startswith('  ') for l in draft), 'draft lines must carry the row indent'
lines[start:end + 1] = draft
open(p, 'w').write('\n'.join(lines))
print(f'replaced lines {start + 1}-{end + 1} with {len(draft)} draft lines')
