# Records the ROADMAP row landing (Veneer 094a71e) and J-CONCERNS-A's round 2 in plan.md (2026-09-25): the marker's
# Veneer head, the Landed entry, the struck carried finding, and the In flight line. Each anchor must occur once.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')


def swap(old, new):
    global t
    assert t.count(old) == 1, (old[:70], t.count(old))
    t = t.replace(old, new, 1)


lines = t.split('\n')
hit = [i for i, line in enumerate(lines) if line.startswith('| The Veneer `ROADMAP.md` J-ENGINE row names J-GUARDS')]
assert len(hit) == 1
del lines[hit[0]]
t = '\n'.join(lines)

swap(
    "**Marker.** Read 2026-09-25 04:12 UTC: Veneer `origin/main` `0865c67` (J-HOLDERS); scaffold `origin/main` `b9b95685`.",
    "**Marker.** Read 2026-09-25 04:12 UTC: Veneer `origin/main` `094a71e` (this session's ROADMAP row, over the styles session's `2376710`); scaffold `origin/main` `b9b95685`.",
)
swap(
    "- 2026-09-25: J-HOLDERS as `0865c67`,",
    "- 2026-09-25: the ROADMAP J-ENGINE row as `a0bee24`, merged over `2376710` as `094a71e` and pushed (`units/j-roadmap-0925-landing.log.txt`). It closes the carried finding that the row listed its carriers; the row now points at this plan. The landing's merge conflicted on the table's padding, so the Orchestrator rebuilt the table from `main` and re-applied the row (`tools/roadmap-engine-row-0925.py`, `tools/land-doc-resume.sh`).\n"
    "- 2026-09-25: J-HOLDERS as `0865c67`,",
)
lines = t.split('\n')
hit = [i for i, line in enumerate(lines) if line.startswith('- J-CONCERNS-A (`units/j-concerns-a-brief.md`')]
assert len(hit) == 1
lines[hit[0]] = (
    "- J-CONCERNS-A: round 1 is committed as `e92fb7e`, and `main` is merged in as `bd5c882`. The Orchestrator's replay "
    "reads the control green and all ten mutations killed by an assertion (`units/j-concerns-a-mutations-orchestrator.log.txt`). "
    "Round 2 (`units/j-concerns-a-brief-2.md`) removes the Button motion case's pins of cascade values under E32. The "
    "audit follows: `analyst` on Astra, and the `checker` job on Grok."
)
t = '\n'.join(lines)
p.write_bytes(t.encode('utf-8'))
print('ok')
