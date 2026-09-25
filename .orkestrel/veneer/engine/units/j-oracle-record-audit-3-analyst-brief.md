# J-ORACLE-RECORD round 3 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the oracle actually records and compares.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E28 with both amendments of 2026-09-25.
- Your round-2 verdict, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-record-audit-2-objective-verdict.md`, and the Orchestrator's `j-oracle-record-audit-2-verdict.md` beside it.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-record-audit-claims-3.md`, which names the subject (Veneer `6880e63`) and each evidence file by its path.

## Subject

Read every file at `6880e63` with `git -C C:/Users/mikes/WebstormProjects/veneer show 6880e63:<path>`. The base is `c66e317`. Never read the worktree.

## Focus

- Rule every claim, and weight claims 1, 2, 3, and 7.
- Re-run your round-2 witnesses through `6880e63`: a fractional scroll offset, a tag change, swapped siblings, and text placed around a child element.
- For claim 3, find any content difference the reading still misses, such as a comment, a whitespace-only run, or a text run split across nodes, and say whether a plugin's parity depends on it.
- For claim 6, say whether the prevented-show control's added row is a difference the seam truly adds.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the comparison distinguishes it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
