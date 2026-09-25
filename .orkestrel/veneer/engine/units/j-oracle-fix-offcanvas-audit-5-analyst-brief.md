# J-ORACLE-FIX-OFFCANVAS rounds 3 to 5 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the rounds, so this cross-engine lane audits them. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the code and the proofs actually do.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E24, § E28, and § E35.
- Your round-2 verdict, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-fix-offcanvas-audit-2-objective-verdict.md`, and your design proposal `j-oracle-fix-offcanvas-design-analyst-proposal.md` beside it.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-fix-offcanvas-audit-claims-5.md`. It names the subject, Veneer `88d06f4`, and each evidence file by its path.

## Subject

Read every file at `88d06f4` with `git -C C:/Users/mikes/WebstormProjects/veneer show 88d06f4:<path>`. The audited base is `dcff520`.

## Focus

- Rule every claim, and weight claims 1, 2, 5, and 9.
- Re-run your round-2 residual inputs, and your design proposal's B′ cautions, against `88d06f4`.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
