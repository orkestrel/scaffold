# J-RELEASE-RECORD audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the code and the proofs actually do.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E24 with its amendments, § E25, and § E35 with its amendment.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-record-audit-claims.md`. It names the subject, Veneer `a1041bd`, and each evidence file by its path.

## Subject

Read every file at `a1041bd` with `git -C C:/Users/mikes/WebstormProjects/veneer show a1041bd:<path>`. The audited base is `b8c6a08`. Bootstrap's source is `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/`.

## Focus

- Rule every claim, and weight claims 1, 2, 3, 5, 6, and 9.
- For claim 2, search the five engines at `a1041bd` for every direct host write, and name each one you find.
- For claim 5, read Bootstrap's `tab.js` order yourself.
- You can run read-only commands. Run no test.
- Report no prose finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
