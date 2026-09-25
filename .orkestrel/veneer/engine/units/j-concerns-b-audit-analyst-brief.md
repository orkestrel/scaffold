# J-CONCERNS-B audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the proofs actually prove.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E9, § E11, and § E32 with all three amendments.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-concerns-b-audit-claims.md`. It names the subject, Veneer `7ab04db`, and each evidence file by its path.

## Subject

Read every file at `7ab04db` with `git -C C:/Users/mikes/WebstormProjects/veneer show 7ab04db:<path>`. The base is `b867c96`. Read Bootstrap's `node_modules/bootstrap/js/src/dropdown.js` and `tooltip.js` in `C:/Users/mikes/WebstormProjects/veneer`.

## Focus

- Rule every claim, and weight claims 1 and 2.
- For claim 1, say whether the planted rule's running animation at each event is established by an assertion, or only assumed.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
