# J-CASCADE audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E5 and § E26.
- The claims file, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-cascade-audit-claims.md`, which names the subject (Veneer `a963585`) and its evidence.

## Subject

Read every file at `a963585`, either with `git -C C:/Users/mikes/WebstormProjects/veneer show a963585:<path>` or from the snapshot directory the claims file names. The base is `6dd5034`. Never read the worktree.

## Focus

- Rule on every claim, and weight claims 2, 3, and 7.
- For claim 2, compare each reworked Toast case at `6dd5034` with its form at `a963585`, and say what each asserted before and after.
- For claim 3, trace each engine's wait (`settleAnimations` in `src/browser/helpers.ts` and each engine's call to it) against the shipped `_fade.scss` and `_tokens.scss`. Say whether a case could pass while the engine ignored the transition.
- For claim 7, read `_toast.scss` and the Toast engine's show path.
- You can run read-only commands. Run no test.
- Report no prose-voice finding. Claim 7 is about truth, not wording.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
