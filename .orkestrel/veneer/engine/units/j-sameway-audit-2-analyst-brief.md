# J-SAMEWAY round-2 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, which departed from its prescriptions, so it takes this cross-engine round. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E22 and § E24 with their amendments; your round-1 verdict `units/j-sameway-audit-objective-verdict.md`; the claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-audit-claims-2.md`, which names the subject (Veneer `dc838aa`) and its evidence.

## Subject

Read every source at `dc838aa` with `git -C C:/Users/mikes/WebstormProjects/veneer show dc838aa:<path>` or from the snapshot directory the claims file names; round 1 is `622181f`. Never read the worktree.

## Focus

Rule on every claim. Weight claims 1, 2, 3, and 4: re-run your round-1 witness and its hide mirror through `dc838aa`; trace `Backdrop.show` with an `owned` that destroys the backdrop, destroys the owner, or starts a nested change; trace a throw at each point of the two constructors after the claim through `destroy()` on the half-built instance; and try to reach the forward owner read. You can run read-only commands and no test. Report no prose or wording finding (claims 5 and 6 are the checker's).

## Output

A per-claim table (claim, CONFIRMED, FAIL, or UNRESOLVED, evidence with `file:line`, and for each proof claim the mutation and whether it is distinguished), then any behaviour defect outside the claims with the smallest input that reaches it, then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
