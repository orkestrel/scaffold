# J-MOTION-PROOFS-A round 3 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits the fix round. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the proofs and the Modal change actually do.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E24, § E25, and § E32 with its amendment.
- Your rounds-1-and-2 verdict, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-motion-proofs-a-audit-objective-verdict.md`, and the Orchestrator's verdict `j-motion-proofs-a-audit-verdict.md` beside it.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-motion-proofs-a-audit-claims-3.md`, which names the subject (Veneer `180d513`) and each evidence file by its path.

## Subject

Read every file at `180d513` with `git -C C:/Users/mikes/WebstormProjects/veneer show 180d513:<path>`. The base is `beb7cd8`. Never read the worktree.

## Focus

- Rule claims 1 to 7, and weight claims 1, 2, and 6.
- Re-run your round-1 witnesses through `180d513`: the stale dialog, and the backdrop hide a mutation could skip unseen.
- For claim 1, read every use of the dialog in `Modal.ts`. Say whether any path still reads a dialog found earlier, and whether a dialog removed or replaced mid-change can leave a settle waiting on an element no longer in the host.
- For claim 5, read `j-motion-proofs-a-plant.py`. Say whether it writes the motion ruling's values (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` § The ruling) and whether any converted proof would still fail against them.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
