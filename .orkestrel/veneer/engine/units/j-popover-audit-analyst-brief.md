# J-POPOVER audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this lane runs on the engine that did not. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, constraints, and what the code and contracts actually permit.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `architecture.md`, `patterns.md`, and `tests.md` in that repository; the decisions `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` E18 (the door mechanism, with its amendment) and the design verdict's R12 (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md`).

## Subject

The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-popover-audit-claims.md` names the subject and its evidence (the worktree, the diff, the status, the report, the instrument, its log, and the Orchestrator's gate log). Read the source in the worktree; the diff is a map, not a substitute. Bootstrap 5.3.8's source is at `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/`.

## Focus

Rule on every claim. Weight claims 1, 2, 4, 5, 6, 7, 8, 9, and 13: the seam's completeness (a table, code, or literal still read from the tooltip for every class), the registry keying, the body slot's resolution order, the `owned` read's position in the placement constructor and what `destroy()` restores there, the door's binding in `#place`, the release site on the stop path and the throw path, and whether each proof distinguishes its mutation. The sandbox is read-only: you can run read-only commands (`git -C <worktree> diff`, `grep`), and no test, so state the mutation and the assertion that would catch it from the source. Report no prose or wording finding: the user's ruling is that audits weigh implementation, and a sentence is in scope only where it states behaviour the code contradicts.

## Output

A per-claim table (claim, CONFIRMED, FAIL, or UNRESOLVED, evidence with `file:line`, and for each proof claim the mutation and whether it is distinguished), then any finding outside the claims that is a defect in behaviour, with its evidence, then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
