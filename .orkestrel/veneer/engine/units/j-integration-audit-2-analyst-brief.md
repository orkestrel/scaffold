# J-INTEGRATION landing audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this lane runs on the engine that did not. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E13, § E18, and § E22 with its amendment; your round-1 verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-integration-audit-objective-verdict.md`.

## Subject

The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-integration-audit-claims-2.md` names the subject and its evidence. Read the source in the worktree (`src/browser/Modal.ts`, `Offcanvas.ts`, `Backdrop.ts`, and their tests); the landing diff is a map.

## Focus

Rule on every claim. Weight claims 1, 2, 3, 4, and 5: whether each door's returning step writes exactly what the change wrote by that door (no write the change did not make, none it made left unreturned), whether a backdrop element or its press listener can outlive a completed hide or a destruction, and whether a reaction inside a returning write can leave the host incoherent. You can run read-only commands and no test. Report no prose or wording finding.

## Output

A per-claim table (claim, CONFIRMED, FAIL, or UNRESOLVED, evidence with `file:line`, and for each proof claim the mutation and whether it is distinguished), then any behaviour defect outside the claims, then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
