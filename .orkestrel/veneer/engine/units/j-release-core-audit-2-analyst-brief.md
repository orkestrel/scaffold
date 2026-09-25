# J-RELEASE-CORE round 2 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the code and its contracts actually permit.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E25 and § E35 with its amendment.
- Your round-1 verdict, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-core-audit-objective-verdict.md`, and the Orchestrator's `j-release-core-audit-verdict.md` beside it.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-core-audit-claims-2.md`. It names the subject, Veneer `03526bc`, and each evidence file by its path.

## Subject

Read every file at `03526bc` with `git -C C:/Users/mikes/WebstormProjects/veneer show 03526bc:<path>`. The base is `d702bb8`.

## Focus

- Rule every claim, and weight claims 1, 2, and 3.
- Re-run your round-1 inputs against `03526bc`: the held record from the abort listener, and the `on` getter that destroys the owner.
- For claim 2, trace the listener in both orderings and in a class destroyed inside its construction.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
