# J-MOTION-PROOFS-A audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the proofs and the Modal change actually do.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E24, § E25, and § E32 with its amendment.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-motion-proofs-a-audit-claims.md`, which names the subject (Veneer `beb7cd8`) and each evidence file by its path.
- The checker job's verdict `j-motion-proofs-a-audit-checker-verdict.md` in the same directory. It ruled claims 1, 6, and 7. Its claim-6 failure names files that J-MOTION-PROOFS-B and -C own, and the Orchestrator rules on it.

## Subject

Read every file at `beb7cd8` with `git -C C:/Users/mikes/WebstormProjects/veneer show beb7cd8:<path>`. The base is `0865c67`. Never read the worktree.

## Focus

- Rule claims 2, 3, 4, 5, and 8, and weight claims 2 and 3.
- For claim 2, read `Modal`'s show and hide paths with `#settle`. Say whether any exit returns before both waits settle, and whether the settle reads the dialog that the change moved.
- For claim 3, name each completion event a converted proof reads, and say whether its assertion reads every element the engine moved.
- For claim 8, the replay (`j-motion-proofs-a-replay-2.log.txt`) lists four mutated row logs that also report an unhandled `AbortError: The user aborted a request`: `backdrop-hide-skip`, `backdrop-show-skip`, `offcanvas-hide-panel`, and `offcanvas-show-panel`. The unmutated control reports none. Rule whether each of those kills is still an assertion on its named case.
- Name any behaviour defect in `Modal`, `Offcanvas`, `Backdrop`, or `Alert` that the converted proofs no longer catch now that they pin no literal.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
