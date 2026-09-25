# J-ORACLE-FIX-OFFCANVAS round 2 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the code and the proofs actually do.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E24 and § E35.
- Your round-1 verdict, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-fix-offcanvas-audit-objective-verdict.md`, and the Orchestrator's `j-oracle-fix-offcanvas-audit-verdict.md` beside it.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-fix-offcanvas-audit-claims-2.md`. It names the subject, Veneer `dcff520`, and each evidence file by its path.

## Subject

Read every file at `dcff520` with `git -C C:/Users/mikes/WebstormProjects/veneer show dcff520:<path>`. The base is `eaf3908`.

## Focus

- Rule every claim, and weight claims 1, 2, and 7.
- For claim 1, re-run your round-1 four-placement table against `dcff520`.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
