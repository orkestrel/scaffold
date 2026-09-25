# J-RELEASE-CORE round 3 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the code and its contracts actually permit.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E25 and § E35 with its amendment.
- Your round-2 verdict, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-core-audit-2-objective-verdict.md`, and the Orchestrator's `j-release-core-audit-2-verdict.md` beside it.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-core-audit-claims-3.md`. It names the subject, Veneer `8b4e9d6`, and each evidence file by its path.

## Subject

Read every file at `8b4e9d6` with `git -C C:/Users/mikes/WebstormProjects/veneer show 8b4e9d6:<path>`. The base is `03526bc`.

## Focus

- Rule every claim, and weight claims 2, 3, and 4.
- Re-run your round-2 inputs against `8b4e9d6`: the joined child holding a throwing release, destroyed through its owner and directly, and the child lifetime that ended before it joined.
- For claim 4, trace the ending's position in the child's drain, and an owner destruction nested before it.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
