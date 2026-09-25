# Adds J-SAMEWAY-ENGINES-A round 3's four exported leaves to the sorted barrel export list that
# tests/src/browser/index.test.ts pins, in the engines-a worktree. The Orchestrator's round-3 brief granted helpers.ts but not
# this enumerating assertion, which the replay's whole-suite gate found red. Each name is inserted before the first
# listed name that sorts after it, and each insertion anchor must occur once.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\veneer\tmp\worktrees\engines-a\tests\src\browser\index.test.ts')
t = p.read_bytes().decode('utf-8')
INSERT = [
    ("'readOutermost',", 'readHostValue'),
    ("'reflow',", 'recordHostChange'),
    ("'settleAnimations',", 'rewindHostChanges'),
]
for anchor, name in INSERT:
    line = [l for l in t.split('\n') if l.strip() == anchor]
    assert len(line) == 1, (anchor, len(line))
    indent = line[0][: len(line[0]) - len(line[0].lstrip())]
    t = t.replace(line[0], f"{indent}'{name}',\n{line[0]}", 1)
lines = t.split('\n')
hit = [i for i, l in enumerate(lines) if l.strip() == "'writeContent',"]
assert len(hit) == 1
indent = lines[hit[0]][: len(lines[hit[0]]) - len(lines[hit[0]].lstrip())]
lines.insert(hit[0] + 1, f"{indent}'writeHostValue',")
p.write_bytes('\n'.join(lines).encode('utf-8'))
print('inserted')
