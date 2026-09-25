# J-SAMEWAY audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this lane runs on the engine that did not. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E13, § E22 with its amendment, § E24 with its J-REENTRY-SWEEP amendment; your round-3 verdict `units/j-integration-audit-3-objective-verdict.md` (the two traces this round closes); the claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-audit-claims.md`, which names the subject (Veneer `622181f`) and its evidence.

## Subject

Read every source at `622181f` with `git -C C:/Users/mikes/WebstormProjects/veneer show 622181f:<path>` or from the snapshot directory the claims file names; the base is `4b62bca`. Never read the `tmp/worktrees/integration` worktree, which is under a mutation run.

## Focus

Rule on every claim. Weight claims 2, 3, 4, and 6: trace `show` and `hide` in both engines door by door, with `#owns`, `#holds`, `#apply`, `#reshow`, `#rehide`, and `#revert`, and say at each door what the call has written, what a token move, a nested `show`, `hide`, or `destroy`, or a prevented event does there, and whether the `written` list the returning step receives equals the writes made by that door. Then claim 5 through `Backdrop.show`, and claim 7. You can run read-only commands and no test. Report no prose or wording finding.

## Output

A per-claim table (claim, CONFIRMED, FAIL, or UNRESOLVED, evidence with `file:line`, and for each proof claim the mutation and whether it is distinguished), then any behaviour defect outside the claims with the smallest input that reaches it, then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
