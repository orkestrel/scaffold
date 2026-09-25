# Resolves the two conflict hunks in tests/setupBrowser.test.ts in the motion-proofs-a worktree (2026-09-25): each side
# added one name to the same sorted list (J-MOTION-PROOFS-A's readDuration; the styles session's readCentre). Each hunk
# keeps both names in sorted order, readCentre before readDuration. Refuses any hunk whose sides are not one name each.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\veneer\tmp\worktrees\motion-proofs-a\tests\setupBrowser.test.ts')
lines = p.read_bytes().decode('utf-8').split('\n')
out = []
i = 0
resolved = 0
while i < len(lines):
    if lines[i].startswith('<<<<<<< '):
        ours = lines[i + 1]
        assert lines[i + 2] == '=======', lines[i + 2]
        theirs = lines[i + 3]
        assert lines[i + 4].startswith('>>>>>>> '), lines[i + 4]
        assert 'readDuration' in ours and 'readCentre' in theirs, (ours, theirs)
        out.extend([theirs, ours])
        resolved += 1
        i += 5
        continue
    out.append(lines[i])
    i += 1
assert resolved == 2, resolved
p.write_bytes('\n'.join(out).encode('utf-8'))
print('resolved', resolved)
