# J-SNAPSHOT-SHARED round-2 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, which went past its brief's letter, so it takes this cross-engine round. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E25; your round-1 verdict `units/j-snapshot-shared-audit-objective-verdict.md`; the claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-snapshot-shared-audit-claims-2.md`, which names the subject (Veneer `e3167f7`) and its evidence.

## Subject

Read every source at `e3167f7` with `git -C C:/Users/mikes/WebstormProjects/veneer show e3167f7:<path>` or from the snapshot directory the claims file names; round 1 is `3b3b4a9`. Never read the worktree.

## Focus

Rule on every claim. Weight claims 1, 2, and 3: check the key rule against the DOM and CSSOM name-matching rules; for each of the nine constructors, trace what a throw after the claim leaves when `destroy()` runs on the half-built instance (fields not yet assigned, listeners not yet bound, a `Swipe` or a moved title already written); and search every class in `src/browser` for a claim or save followed by a throwing read. You can run read-only commands and no test. Report no prose or wording finding.

## Output

A per-claim table (claim, CONFIRMED, FAIL, or UNRESOLVED, evidence with `file:line`, and for each proof claim the mutation and whether it is distinguished), then any behaviour defect outside the claims with the smallest input that reaches it, then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
