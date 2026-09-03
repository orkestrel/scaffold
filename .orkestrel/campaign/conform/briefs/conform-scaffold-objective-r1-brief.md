# Lane brief — unit conform-scaffold, objective lane, audit round 1

Role and engine: `reviewer` on Claude Opus 5, holding the objective lane as the recorded substitution for the dark Sol bench. Read-only: no Edit, no Write, no command that changes the tree. Perform the audit directly and spawn nothing.

Subject: the uncommitted unit in `/home/user/scaffold` — the orchestrator's own checkout, which is also the subject package. Read the audit brief `/home/user/scaffold/tmp/units/conform/conform-scaffold-audit-brief.md` first; it names the claims, the threshold, and the output shape. Then the Luna distillate `/home/user/scaffold/tmp/cursor/scaffold-r1-distill-luna.result.md` (a map with `file:line` pointers, never a verdict), the writer's report `/home/user/scaffold/tmp/units/conform/conform-scaffold-report.md`, the unit brief `/home/user/scaffold/tmp/units/conform/conform-scaffold-brief.md`, and the evidence `/home/user/work/evidence/conform-scaffold.diff` and `/home/user/work/evidence/conform-scaffold.status`.

Standing conditions: `.orkestrel/**` in the status is the campaign's record and is outside the unit; `tmp/**` is ignored; `host.json` is regenerated because `guides/scaffold.md` is a vendored host path, so its hunk is the unit's; `tests/guides.test.ts` carries the Orchestrator's adoption of guide's renamed `fenceImports` and `missingSymbols` (recorded in the report under Orchestrator integration). Exclude `node_modules/**` from every sweep. Claim 8's gate reading is NOT-EVIDENCED for a read-only lane and settles on the Orchestrator's deciding run at landing; say so rather than reading the report's exit codes as your own.

Method: attempt to refute each numbered claim with the smallest evidence that would break it; re-run every sweep you rely on rather than reading it from the report or the distillate; quote `file:line`. CONFIRMED with evidence, or REFUTED with the failing input and the smallest correct fix. List findings outside the claims as O-numbered items and questions for the Orchestrator as R-numbered referrals.

Output: per-claim verdicts, findings outside the claims, referrals, and one terminal line: `PASS` or `FAIL <claim numbers>`.
