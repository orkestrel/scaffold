# J-CONCERNS-A round 3 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits the fix round. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the code and the proofs actually do.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E32 with its amendment, and § E34.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-concerns-a-audit-claims-3.md`, which names the subject (Veneer `90e8b60`) and each evidence file by its path.

## Subject

Read every file at `90e8b60` with `git -C C:/Users/mikes/WebstormProjects/veneer show 90e8b60:<path>`. The round's change is `git diff bcea965 90e8b60`. Never read the worktree.

## Focus

- Rule claims 1 to 6, and weight claims 1 and 4.
- Re-run your round-1 findings on claims 3 and 7 through `90e8b60`, and say whether each is closed.
- For each proof, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
- For claim 1, read both branches of `#scrollTo`, the host and the view. Find any path that scrolls smoothly under reduced motion, or instantly without it.
- Read the verdict `j-concerns-a-audit-verdict.md` for the Orchestrator's rulings on your round-1 findings outside the claims, and report any that still reach a defect.
- You can run read-only commands. Run no test.
- Report no prose-voice finding. This round has no checker lane, so rule the mechanical claims 5 and 6 as well.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
