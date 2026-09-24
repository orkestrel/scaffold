# Orchestrator's scope check for AP-COLOR round 5: for every file in the worktree's status other than the color test,
# compare its live `git diff 712ae72` section with that file's section in round 3's retained diffs (apc-3.diff and
# apc-shared-3.patch), ignoring the diff header lines and a section's trailing blank lines (the join of the two retained
# files adds one to the last section of the first). The control compares the color test, which must differ.
import re, subprocess
U = '/home/user/scaffold/.orkestrel/veneer/units/'
W = '/home/user/veneer-apc'
def sections(text):
    out, cur = {}, None
    for line in text.splitlines():
        m = re.match(r'^diff --git a/(\S+) b/', line)
        if m:
            cur = m.group(1); out[cur] = []; continue
        if cur and not line.startswith(('index ', '--- ', '+++ ')):
            out[cur].append(line)
    for key in out:
        while out[key] and out[key][-1] == '':
            out[key].pop()
    return out
r3 = sections(open(U + 'apc-3.diff').read() + '\n' + open(U + 'apc-shared-3.patch').read())
files = [l[3:] for l in subprocess.run(['git', '-C', W, 'status', '--porcelain'], capture_output=True, text=True).stdout.splitlines()]
same, differ = [], []
for f in files:
    live = sections(subprocess.run(['git', '-C', W, 'diff', '712ae72', '--', f], capture_output=True, text=True).stdout).get(f, [])
    (same if live == r3.get(f) else differ).append(f)
print('files in status:', len(files))
print('equal to round 3:', ' '.join(sorted(same)))
print('differ from round 3:', ' '.join(sorted(differ)))
print('control (color.test.ts differs):', 'tests/src/styles/utilities/color.test.ts' in differ)
