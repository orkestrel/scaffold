<!-- Unit F0-BRIDGE, run 2: `builder` on Sonnet, native, returned 2026-09-22. Brief: f0-bridge-brief-2.md over f0-bridge-brief.md. Retained verbatim. -->

git status --short:
 D .orkestrel/veneer/handoff.md
 M .orkestrel/veneer/plan.md
?? .orkestrel/veneer/units/f0-bridge-brief-2.md
?? .orkestrel/veneer/units/f0-bridge-brief.md
?? .orkestrel/veneer/units/veneer-pin-gates-report.md

git diff --stat:
 .orkestrel/veneer/handoff.md |  375 -------
 .orkestrel/veneer/plan.md    | 2205 +-----------------------------------------
 2 files changed, 17 insertions(+), 2563 deletions(-)

Line count of the rewritten plan.md: 19

Acceptance checks:
1. git status --short prints ` M .orkestrel/veneer/plan.md`, ` D .orkestrel/veneer/handoff.md`, and the three untracked units/ paths named in the successor brief's standing conditions, and nothing else — pass.
2. diff <(sed -n '/^```markdown$/,/^```$/p' tmp/units/f0-bridge-brief.md | sed '1d;$d') .orkestrel/veneer/plan.md prints nothing — pass.
3. grep -n -i -E '\bshould\b|\bsimply\b|\beasy\b|\bjust\b|\bcurrently\b|\bvia\b|\be\.g\.|\bi\.e\.|\betc\.' .orkestrel/veneer/plan.md prints nothing — pass.
