# J-RELEASE-RECORD round 2 check — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this cross-engine lane checks it. Perform the assignment directly and spawn nothing.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E24 and § E35.
- Your round-1 verdict, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-record-audit-objective-verdict.md`.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-record-audit-claims-2.md`. It names the subject, Veneer `d3a3969`, and each evidence file by its path.

## Subject

Read every file at `d3a3969` with `git -C C:/Users/mikes/WebstormProjects/veneer show d3a3969:<path>`. The base is `a1041bd`.

## Focus

- Rule every claim, and weight claim 3: search for an input that reaches the removed Carousel door.
- You can run read-only commands. Run no test.
- Report no prose finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each door case, the deleted lines and whether the assertions distinguish the deletion. Then list any behaviour defect, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
