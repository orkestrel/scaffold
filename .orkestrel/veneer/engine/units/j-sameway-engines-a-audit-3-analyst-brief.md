# J-SAMEWAY-ENGINES-A rounds 2 and 3 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the rounds, so this cross-engine lane audits them. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does. This round has no checker lane, so you rule the mechanical claims 3, 5, and 8 as well.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E24 and § E25, each with every amendment, including E24's of 2026-09-25.
- Your round-1 verdict, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-a-audit-objective-verdict.md`.
- The claims file, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-a-audit-claims-3.md`, which names the subject (Veneer `dc2a1a7`) and each evidence file by its path.

## Subject

Read every file at `dc2a1a7`, either with `git -C C:/Users/mikes/WebstormProjects/veneer show dc2a1a7:<path>` or from the snapshot directory the claims file names. The base is the merge `2760f7e`. Never read the worktree.

## Focus

- Rule on every claim, and weight claims 1, 2, and 4.
- Re-run your round-1 witnesses through `dc2a1a7`.
- For claim 1, list each engine's exits again: what the change records and what the rewind writes.
- Find any target a change writes that `recordHostChange` does not record.
- Find any rewind that writes a value the target did not hold before the change's first write.
- For claim 4, compare `HostSnapshot.save`'s reading at `2760f7e` and at `dc2a1a7` for an attribute, a token, and an inline property, present and absent.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
