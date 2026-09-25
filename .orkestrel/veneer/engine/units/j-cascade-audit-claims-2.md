# J-CASCADE round 2 — audit claims (2026-09-25)

**Subject.** Veneer commit `8bc940d` on `unit/cascade`, over the merge `a447ce5`, which carries round 1's `4765f6f` and `a963585` over Veneer `main` `4cd56a8`. A read-only snapshot of `src`, `tests`, and `guides` at `8bc940d` sits in `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/snapshot-cascade2-8bc940d/`. Beside it are the round's diff `j-cascade-2.diff`, its status `j-cascade-2-status.txt`, the writer's report `j-cascade-report-2.md`, and the Orchestrator's replay `j-cascade-mutations-2-orchestrator.log.txt`. A shell reads `git -C C:/Users/mikes/WebstormProjects/veneer show 8bc940d:<path>`. Never read the worktree.

**What this round answers.** Your round-1 verdict `units/j-cascade-audit-objective-verdict.md` (claim 3, and the instrument's classification) and the brief `units/j-cascade-brief-2.md` (R1 and R2).

## Claims

1. **Each motion-factor case bounds the arrival.** In each of the five cases (Alert, Tab, Toast, Tooltip, and Popover):
   - at factor `0`, the case requires the completed event, then the call's resolution, then a frame started right after the call;
   - at factor `4`, it requires the transition's `finished`, then the event, then a frame started inside `finished`'s callback.

   The case fails for an engine that waits a fixed time (the `FIXED` rows) and for one that waits past the animation (the `LATE` rows).
2. **The bounds do not depend on load.** Between an animation's `finished` and the completed event's dispatch, each engine's wait (`settleAnimations` and each engine's continuation after it) takes no timer, no animation frame, and no other task boundary. So the event precedes any later frame whatever the host's load.
3. **The instrument counts a kill only on an assertion.** It reads KILLED only when the failure message's first line matches `^(AssertionError\b|expected .+)`. The `BOOM` and `UNBOUND` rows read REFUSED, and each row reads as the Orchestrator's replay records. For each proof claim you confirm, name the mutation that makes the proof fail, and say whether its assertions distinguish that mutation from the passing case.
4. **Scope.** `8bc940d` changes only the five test files. No source and no guide changed.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `8bc940d`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
