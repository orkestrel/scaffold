# Records J-CONCERNS in plan.md (2026-09-25): the landing step names w2-land-2d.sh and the kickoff item 5 gate list,
# the queue gains J-CONCERNS-A (dispatched) and J-CONCERNS-B (after J-SAMEWAY-ENGINES-B), and In flight names the unit.
# Each anchor must occur once.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')


def swap(old, new):
    global t
    assert t.count(old) == 1, (old[:60], t.count(old))
    t = t.replace(old, new, 1)


swap(
    "then `tools/w2-land-2c.sh <unit> [hold]` (the merge commit, a reinstall where the merge moved the lockfile, the gate chain, and, without `hold`, the fast-forward)",
    "then `tools/w2-land-2d.sh <unit> [hold]` (the merge commit, a reinstall where the merge moved the lockfile, the gate chain, and, without `hold`, the fast-forward)",
)
swap(
    "The chain runs `format:check`, `lint:check`, `check`, `test:guides`, `test:policy`, `test:src:browser`, the three builds, `test:conformance`, `test:setup`, and `test:setup:browser`; a unit that touches `app/**` or `tests/setup*` adds `test:app`, `test:journey`, and `build:app`.",
    "The chain runs the kickoff brief's acceptance item 5 list exactly: `format:check`, `lint:check`, `check`, `build`, `test`, and `test:service`. Its predecessor `w2-land-2c.sh` ran each project's gate but never `test` or `test:service`, so it is retired.",
)
swap(
    "- Grok's second queue: SWIPE-TERRAIN (Elements' and Mailbox's toast swipe), then EXIT-EVIDENCE (the exit items' evidence at `main`).",
    "- J-CONCERNS-A (`units/j-concerns-a-brief.md`, `opus` on Opus 5.5) writes in `tmp/worktrees/concerns-a` from `0865c67`: ScrollSpy's cancellation, focus, and motion, and Button's focus and motion, each closed by a case or by a ruling that carries one.\n"
    "- J-TOAST-SWIPE's design round: the `planner` lane on Opus 5.5 is running; the `analyst` lane on Astra follows J-SAMEWAY-ENGINES-A's audit on the Codex bench.\n"
    "- The kickoff gate list on `0865c67` (`tools/kickoff-gates.sh`, `units/kickoff-gates-0865c67.log.txt`).",
)
swap(
    "- J-SAMEWAY-ENGINES-B round 3, after J-SAMEWAY-ENGINES-A lands.\n",
    "- J-SAMEWAY-ENGINES-B round 3, after J-SAMEWAY-ENGINES-A lands.\n"
    "- J-CONCERNS-B, after J-SAMEWAY-ENGINES-B lands, because that unit owns both files: Dropdown's motion and Popover's cancellation, under J-CONCERNS-A's rule for each cell.\n",
)
p.write_bytes(t.encode('utf-8'))
print('ok')
