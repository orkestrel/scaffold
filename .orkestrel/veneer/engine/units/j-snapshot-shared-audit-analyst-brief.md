# J-SNAPSHOT-SHARED audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this lane runs on the engine that did not. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E13 with its amendments and § E25; the claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-snapshot-shared-audit-claims.md`, which names the subject (Veneer `3b3b4a9`) and its evidence.

## Subject

Read every source at `3b3b4a9` with `git -C C:/Users/mikes/WebstormProjects/veneer show 3b3b4a9:<path>` or from the snapshot directory the claims file names; the pre-change source is `3acad4c`. Never read the `tmp/worktrees/snapshot-shared` worktree, which is under a mutation run.

## Focus

Rule on every claim. Weight claims 2, 3, 4, 5, and 7: trace `save`, `restore`, `clear`, `#relinquish`, `#writeBack`, and `#withdraw` through the interleavings a reaction can produce (a save, a restore, or a clear on the same or another snapshot from inside a write), and search every `HostSnapshot` owner in `src/browser` for a lifetime-ending path without `restore()` or `clear()`. Then claims 1, 9, and 10. You can run read-only commands and no test. Report no prose or wording finding.

## Output

A per-claim table (claim, CONFIRMED, FAIL, or UNRESOLVED, evidence with `file:line`, and for each proof claim the mutation and whether it is distinguished), then any behaviour defect outside the claims with the smallest input that reaches it, then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
