# J-SAMEWAY round-3 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E13, § E22, and § E24, each with its amendments.
- Your round-2 verdict, `units/j-sameway-audit-2-objective-verdict.md`.
- The claims file, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-audit-claims-3.md`, which names the subject (Veneer `e557bfe`), its evidence, and the Orchestrator's ruling on the writer's deviation 2.

## Subject

Read every source at `e557bfe`, either with `git -C C:/Users/mikes/WebstormProjects/veneer show e557bfe:<path>` or from the snapshot directory the claims file names. Round 2 is `dc838aa`. Never read the worktree.

## Focus

- Rule on every claim, and weight claims 1, 2, 3, and 4.
- Re-run your round-2 witness through `e557bfe` in both engines.
- For every exit of the show and the hide, list what the returning step receives and what it writes. Find any write the call makes that no entry returns and no rule in claim 1 excuses. Find any return that writes something the call did not write, such as a token it never removed, or a backdrop moved into a parent it was not removed from.
- Trace a reaction that moves the backdrop between the removal and the return.
- Trace a destruction inside a backdrop return.
- You can run read-only commands. Run no test.
- Report no prose or wording finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
