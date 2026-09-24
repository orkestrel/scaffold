# J-INTEGRATION round-3 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this lane runs on the engine that did not. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E13, § E18, and § E22 with its amendment; the round-2 landing verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-integration-audit-2-verdict.md`.

## Subject

The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-integration-audit-claims-3.md` names the subject, commit `7fd28dc`, and its evidence. Read every source at that commit with `git show 7fd28dc:<path>` in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/integration`; the worktree's files have since merged `main`. The mutation specs sit in that worktree under `tmp/j-integration/`.

## Focus

Rule on every claim. Weight claims 3 and 4: trace each call site of `#reshow` and `#rehide` in both engines back to the state of `#changing` and `#change` on arrival, and trace what a `show`, `hide`, `destroy`, or `update` a reaction calls inside each returning write does to the stale step's remaining writes and to the host. Then claim 5: whether the two removed writes leave anything a later settle or listener acts on. You can run read-only commands and no test. Report no prose or wording finding.

## Output

A per-claim table (claim, CONFIRMED, FAIL, or UNRESOLVED, evidence with `file:line` at `7fd28dc`, and for each proof claim the mutation and whether it is distinguished), then any behaviour defect outside the claims, then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
