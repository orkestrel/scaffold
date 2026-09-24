# J-GUARDS audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this lane runs on the engine that did not. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E23; the claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-guards-audit-claims.md`, which names the subject (Veneer `f609bb0`) and its evidence.

## Subject

Read every source at `f609bb0` with `git -C C:/Users/mikes/WebstormProjects/veneer show f609bb0:<path>`, or from the snapshot directory the claims file names; never from the `tmp/worktrees/guards` worktree, which is under a mutation run. The pre-change source is `b1d314d`.

## Focus

Rule on every claim. Weight claims 1, 2, 5, 6, and 10. For 5, trace every `resolveOptions` call site in the engines at `f609bb0` (Collapse, Dropdown, Carousel, Toast, ScrollSpy, Modal, Offcanvas, Tooltip, Popover) and say whether any engine reads from the resolved object a key its parser table does not declare, or relied at `b1d314d` on the removed copy loop to carry a key into the result. For 10, read each mutation spec in `units/j-guards-mutations.py` against its named case in the test file at `f609bb0` and say whether the case's assertions distinguish it. You can run read-only commands and no test. Report no prose or wording finding.

## Output

A per-claim table (claim, CONFIRMED, FAIL, or UNRESOLVED, evidence with `file:line`, and for each proof claim the mutation and whether it is distinguished), then any behaviour defect outside the claims, then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
