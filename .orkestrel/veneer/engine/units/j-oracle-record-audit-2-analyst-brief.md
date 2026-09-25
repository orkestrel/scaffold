# J-ORACLE-RECORD round 2 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the oracle actually records and compares.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E28 with its amendment of 2026-09-25.
- Your round-1 verdict, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-record-audit-objective-verdict.md`, and the Orchestrator's verdict `j-oracle-record-audit-verdict.md` beside it.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-record-audit-claims-2.md`, which names the subject (Veneer `c66e317`) and each evidence file by its path.

## Subject

Read every file at `c66e317` with `git -C C:/Users/mikes/WebstormProjects/veneer show c66e317:<path>`. The base is `9ea360d`. Never read the worktree. Bootstrap's sources are under `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/`.

## Focus

- Rule claims 1, 2, 3, 8, 9, and 10, and weight claims 2, 3, and 9.
- Re-run your round-1 witnesses through `c66e317`: the `__proto__` and `constructor` labels, the gap between the motion check and the state read, the classifier on a kill beside a failed suite, and the leaked browser and scratch.
- For claim 3, name any end-state facet still outside the recording that a plugin's parity depends on, beyond the limits E28's amendment names.
- For claim 9, the plant is `j-oracle-record-mutation-2.test.ts`. Name what each row plants, and say whether the comparison distinguishes it.
- The subjective lane referred one question to you (`j-oracle-record-audit-2-reviewer-verdict.md` § Referral). `drivePluginAction`'s `switch` has no exhaustiveness check, so an added `PluginAction` member compiles and sends no input. Rule whether a `never` check is owed.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the comparison distinguishes it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
