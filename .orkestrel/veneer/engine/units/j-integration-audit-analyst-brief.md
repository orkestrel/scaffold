# J-INTEGRATION audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this lane runs on the engine that did not. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, constraints, and what the code and contracts actually permit.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `architecture.md`, `patterns.md`, and `tests.md` in that repository; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` E13, E18 with its amendment, and E19.

## Subject

The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-integration-audit-claims.md` names the subject and its evidence. Read the source in the worktree (`Modal.ts`, `Offcanvas.ts`, `Backdrop.ts`, and their tests, and `Delegate.test.ts`); the diff is a map, not a substitute.

## Focus

Rule on every claim. Weight claim 5 (the restore's reach: can a later call start while the hide is in flight, and what does `void backdrop.show()` do to that call's backdrop and to a host that ends hidden), claims 2, 3, 4, 7, and 8 (each door's position against the write it follows, and whether each red reading binds to the defect it names), and whether each new case distinguishes its mutation. You can run read-only commands (`git -C <worktree> diff`, `grep`) and no test, so state each mutation and the assertion that would catch it from the source. Report no prose or wording finding: the user's ruling is that audits weigh implementation, and a sentence is in scope only where it states behaviour the code contradicts.

## Output

A per-claim table (claim, CONFIRMED, FAIL, or UNRESOLVED, evidence with `file:line`, and for each proof claim the mutation and whether it is distinguished), then any behaviour defect outside the claims with its evidence, then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
