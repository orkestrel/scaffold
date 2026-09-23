# J-SEED audit — the subjective lane's brief (round 1)

## Role and lane

`reviewer` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; you hold the **subjective** lane: design fit, vocabulary, architecture shape, and coherence of the change with the seed and the verdict. State your lane in your first line and the model the alias served. The other lane runs blind and in parallel; do not hedge toward an imagined consensus. Your own engine (Opus 5.5, the `opus` role) wrote this unit: attack it harder for that reason.

## Subject

The whole chain: Veneer `main` at `376d84a`, the J-SEED unit's uncommitted change in the worktree `C:/Users/mikes/WebstormProjects/veneer-seed` on `unit/seed` (its first and only round), briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-seed-brief.md` to repair the design verdict's R16 (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md`). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-seed.diff` and the actual status `j-seed-status.txt` beside it; the unit's report `j-seed-report.md`; the worktree's files.

## What the round decides

Whether J-SEED lands on Veneer `main` as the engine session's first code landing. A finding is worth more than a clean pass.

## Already established — do not re-run

Verified by the Orchestrator directly: the worktree's status lists exactly the diff's three files; `npm run test:src:browser -- tests/src/browser/ColorMode.test.ts` there exits 0 with `14 passed (14)` in Chromium 153.0.8010.12.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-seed-audit-claims.md`, attempting refutation of each through your lane's lenses (the `reviewer` role file names them). `CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED` with what would settle it; a claim whose only evidence is the writer's report is `UNRESOLVED`. You run no command: for a claim about a run, rule on the source and name the run the Orchestrator takes. An objective defect you notice outside your lane is a referral to the objective lane, evidenced, with no verdict of yours. Report no prose finding.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/quality.md` § Falsification; `names.md`, `typescript.md`, `architecture.md`, `tests.md`, `writing.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence; findings fitting no claim; "Attacked and held"; referrals; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
