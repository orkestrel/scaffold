# J-SAMEWAY-ENGINES-A round 4 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the code actually does.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E24 and § E25, each with every amendment.
- Your round-3 verdict, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-a-audit-3-objective-verdict.md`.
- The claims file, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-a-audit-claims-4.md`, which names the subject (Veneer `3f62d64`) and each evidence file by its path.

## Subject

Read every file at `3f62d64` with `git -C C:/Users/mikes/WebstormProjects/veneer show 3f62d64:<path>`. The base is `dc2a1a7`. Never read the worktree.

## Focus

- Rule on every claim, and weight claims 1, 2, 3, and 5.
- Re-run your round-3 witnesses through `3f62d64`, including the priority witness.
- List Collapse's exits again, with what each records and what the rewind writes. Look for a target a change writes that `recordHostChange` does not record.
- For claim 2, find any write whose priority change the record misses, or any rewind that writes a priority the target did not hold.
- For claim 3, compare `HostSnapshot`'s write-back at `dc2a1a7` and at `3f62d64` for a token, an attribute, and a property, each present and absent, with and without a priority.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
