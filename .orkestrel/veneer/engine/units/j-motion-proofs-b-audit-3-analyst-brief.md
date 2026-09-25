# J-MOTION-PROOFS-B round 3 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the code and the proofs actually do.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E24, § E32 with both amendments, and § E34.
- Your previous verdict, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-motion-proofs-b-audit-objective-verdict.md`, and the Orchestrator's `j-motion-proofs-b-audit-verdict.md` beside it.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-motion-proofs-b-audit-claims-3.md`. It names the subject, Veneer `dfd9204`, and each evidence file by its path.

## Subject

Read every file at `dfd9204` with `git -C C:/Users/mikes/WebstormProjects/veneer show dfd9204:<path>`. The base is `fd82ae9`.

## Focus

- Rule every claim, and weight claims 2, 3, and 4.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
