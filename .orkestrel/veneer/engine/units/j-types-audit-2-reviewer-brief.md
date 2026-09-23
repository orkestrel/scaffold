# J-TYPES audit round 2 — the subjective lane's brief (the fix round)

## Role and lane

`reviewer` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; you hold the **subjective** lane: API shape, naming, ergonomics, and design fit of the repaired contracts with the verdict and the seed. State your lane in your first line and the model the alias served. The other lane runs blind and in parallel; do not hedge toward an imagined consensus. Your own engine (Opus 5.5, the `opus` role) wrote this fix round: attack it harder for that reason.

## Subject

The J-TYPES unit's fix round (round 2) in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` on `unit/types` (base `376d84a`), uncommitted on top of round 1's tree, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-brief-2.md` (edits E1 to E10) to close the items round 1's reconciled verdict `j-types-audit-verdict.md` carried (its claims 3, 4, 6, 7, 9, finding F1, referrals R2 to R4, and the bounds). Review evidence: the actual diff against the base `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-2.diff` (both rounds), the round-2 delta of the types file `j-types-2-types-delta.diff`, the actual status `j-types-2-status.txt`; the unit's report `j-types-report-2.md`; round 1's lane verdicts `j-types-audit-subjective-verdict.md` (yours) and `j-types-audit-objective-verdict.md`; the worktree's files; Bootstrap 5.3.8's source at `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/` where a claim names it.

## What the round decides

Whether the contracts land on Veneer `main` as the base every implementation unit writes against.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree on the fixed tree (`j-types-gates-2.log.txt`): the status lists exactly the diff's two files; the scoped typecheck, oxlint, and oxfmt checks, `npm run test:guides` (19 of 19), `npm run test:policy`, and the browser index proof pass; the Orchestrator's own run of the unit's probe `j-types-probe-2.ts` (`j-types-probe-2.log.txt`) reports exactly its five `BAD` lines.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-audit-claims-2.md`, attempting refutation of each through your lane's lenses; claims 1, 2, 6, 7, and 10 are the ones your lane decides, and on the others you rule from the source and refer an objective defect. For claim 10, re-run your round-1 attacks for claims 5, 9, 13, and 14 and your "Attacked and held" list against the fixed tree and name each. `CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED` with what would settle it; a claim whose only evidence is the writer's report is `UNRESOLVED`. You run no command: for a claim about a run, rule on the source and name the run the Orchestrator takes. Report no prose finding: a TSDoc wording you would change is a bound, recorded at the end, unless the sentence states a behaviour the verdict contradicts, which is a finding.

## Unknowns

Whether the two inline `placement` groups (Tooltip's `{ position, offset, fallbacks }`, Dropdown's `{ offset, static }`) beside the mechanism's `PlacementOptions` (`{ position, offset, fallbacks, static }`) are the right shape under `patterns.md` § Options and `AGENTS.md` § Design laws, or whether a consumer reading all three would take them for one concept under three declarations (claim 1): rule on it. Whether the `ButtonHooks` alias should keep its own doc block or defer to `EventHooks` (claim 7): rule on it under `documentation.md` § Parity.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/quality.md` § Falsification; `names.md`, `typescript.md`, `patterns.md`, `architecture.md`, `documentation.md`, `writing.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence; findings fitting no claim; "Attacked and held"; referrals; bounds; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
