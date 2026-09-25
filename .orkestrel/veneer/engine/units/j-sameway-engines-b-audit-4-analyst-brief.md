# J-SAMEWAY-ENGINES-B round 4 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits the fix round. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the code actually does.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E18, § E24 with every amendment, and § E25.
- Your round-3 verdict, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-b-audit-3-objective-verdict.md`, and the Orchestrator's `j-sameway-engines-b-audit-3-verdict.md` beside it.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-b-audit-claims-4.md`, which names the subject (Veneer `3bb9afb`) and each evidence file by its path.

## Subject

Read every file at `3bb9afb` with `git -C C:/Users/mikes/WebstormProjects/veneer show 3bb9afb:<path>`. The base is `87dc147`. Never read the worktree.

## Focus

- Rule every claim, and weight claims 1, 2, and 4.
- Re-run your round-3 witnesses through `3bb9afb`: the pre-existing `vn-tooltip-0` token, the changed tip id, and the stranded placement after a superseding show and a hide.
- For claim 2, find any path where the replaced placement's destruction runs consumer code that the show does not read around, or where a show destroys a placement it did create.
- For claim 4, read the placement's resize handling and say whether a `ResizeObserver` loop points at an engine defect.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
