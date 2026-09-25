# J-SAMEWAY-ENGINES-B round 5 — audit claims (2026-09-25)

**Subject.** Veneer `4c9a7dd` on `unit/engines-b` over `3bb9afb`. Read the files at `4c9a7dd` with `git -C C:/Users/mikes/WebstormProjects/veneer show 4c9a7dd:<path>`, or in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b`, which holds `4c9a7dd` clean with the unit's probes under `tmp/`.

**Evidence.** Every path here is under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`.
- The brief `j-sameway-engines-b-brief-5.md` and the report `j-sameway-engines-b-report-5.md`.
- `j-sameway-engines-b-5.diff` and `j-sameway-engines-b-5-status.txt`.
- The probes:
  - `j-sameway-engines-b-5-recorder.ts`, which records around the native `ResizeObserver`;
  - `-loop.test.ts`, the platform reproduction;
  - `-vitest.probe.config.ts`, the workbench config;
  - the scripts `-copy.py`, `-run.sh`, `-accept.sh`, `-analyze.py`, `-summarize.py`, and `-task.py`.
- The unit's logs: `-summary.txt`, `-platform.log.txt`, the four site logs, the two control logs, and the two acceptance logs.
- The Orchestrator's replay: `j-sameway-engines-b-replay-5.log.txt` (the instrument is `../tools/replay-engines-b-5.sh`).
- Round 4's verdict `j-sameway-engines-b-audit-4-verdict.md`, claim 4.

**The law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/tests.md` and `.claude/rules/quality.md` § Probes before arguments.
- `../decisions.md` § E35.

## Claims

1. **Each wait drains a report that appears without it.**
   - With one wait removed, each of the four sites reports a `ResizeObserver` loop in five of five runs.
   - Each control copy, with every wait kept, reports none.
2. **The report is the platform's.** The platform reproduction reports the loop with no Veneer code:
   - a second observation that starts at the same depth, in the microtask after a delivery, reports it;
   - so does one started inside the delivering callback;
   - neither the next-task control nor the deeper-target control reports it;
   - one `Placement` on a fresh trigger reports it only when it is built in the microtask after a native delivery.
3. **No Veneer callback feeds the loop.** Across the recorder's runs, the `Placement` callbacks write only the tip's `data-popper-placement` and the arrow's inline style, and no write changes the size of an element a live observer watches. Rule whether the recorder could miss such a write: it reads `MutationObserver.takeRecords()` and each watched element's size before and after each callback.
4. **The ruling and the comments.**
   - Keeping the four waits is correct, because the cause is outside Veneer.
   - Each rewritten comment states the measured cause truly: an observation started during a delivery at a depth no deeper than the delivered target is deferred to the next frame and reported.
   - Say whether a consumer page meets the same report through shipped code alone, and whether that makes it an engine defect under E35 or the platform's behaviour to document.
5. **Scope.** The changed paths are `Tooltip.test.ts` and `Popover.test.ts`, their comments only. No engine file changed.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `4c9a7dd`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
