# J-CASCADE round-2 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- Your round-1 verdict, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-cascade-audit-objective-verdict.md`.
- The claims file, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-cascade-audit-claims-2.md`, which names the subject (Veneer `8bc940d`) and its evidence.

## Subject

Read every file at `8bc940d`, either with `git -C C:/Users/mikes/WebstormProjects/veneer show 8bc940d:<path>` or from the snapshot directory the claims file names. The round's base is `a447ce5`. Never read the worktree.

## Focus

- Rule on every claim, and weight claims 1 and 2.
- For claim 2, trace `src/browser/helpers.ts`' `settleAnimations` and each engine's continuation from the awaited `finished` to the completed event's dispatch. List every `await` and what it waits on.
- For claim 3, read the instrument `units/j-cascade-mutations-2.py`'s classification.
- You can run read-only commands. Run no test.
- Report no prose finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
