# J-TYPES audit — the subjective lane's brief (round 1)

## Role and lane

`reviewer` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; you hold the **subjective** lane: API shape, naming, ergonomics, design fit with the verdict and the seed, and the coherence of the contract set a consumer and every later implementation unit will read. State your lane in your first line and the model the alias served. The other lane runs blind and in parallel; do not hedge toward an imagined consensus. Your own engine (Opus 5.5, the `opus` role) wrote this unit: attack it harder for that reason.

## Subject

The whole chain: Veneer `main` at `376d84a` (its tip is `97ac9ab`, one commit on `src/browser/ColorMode.ts`, its test, and one guide sentence, which this unit does not touch), the J-TYPES unit's uncommitted change in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` on `unit/types` (its first and only round), briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-brief.md` to declare every engine contract the design verdict (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md`, R2 to R14) fixes, types first, before any implementation unit. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types.diff` and the actual status `j-types-status.txt` beside it; the unit's report `j-types-report.md` (its "Rulings taken" section records the shapes the unit settled under the brief's Unknown 2); the worktree's files; Bootstrap 5.3.8's source at `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/` where a claim names it.

## What the round decides

Whether the contracts land on Veneer `main` as the base every implementation unit writes against. A shape defect here is repeated by eleven components, so a finding is worth more than a clean pass.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree (`j-types-gates.log.txt`): the status lists exactly the diff's two files; `npm run check:src:browser`, the scoped oxlint and oxfmt checks, `npm run test:guides` (19 of 19), `npm run test:policy`, and the browser index proof all pass; the claim 15 mutation ran as the claim states; `git diff -w -U0 -- guides/veneer.md` removes three lines and adds 240.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-audit-claims.md`, attempting refutation of each through your lane's lenses (the `reviewer` role file names them); claims 5, 9, 13, and 14 are the ones your lane decides, and on the others you rule from the source and refer an objective defect. `CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED` with what would settle it; a claim whose only evidence is the writer's report is `UNRESOLVED`. You run no command: for a claim about a run, rule on the source and name the run the Orchestrator takes. An objective defect you notice outside your lane is a referral to the objective lane, evidenced, with no verdict of yours. Report no prose finding: a TSDoc wording you would change is a bound, recorded as such at the end, unless the sentence states a behaviour the verdict contradicts, which is a finding.

## Unknowns

Whether `PlacementInput.hint` (a boolean selecting `popover="hint"` against `popover="manual"`) is the right axis, or whether the promotion mode is a real domain state that a literal union names (claim 9): rule on it under `AGENTS.md` § Design laws. Whether `SanitizeTargetInterface` and `SetHTMLOptions` take the names the naming law prescribes for a structural mirror of a platform dictionary and method (claim 14): rule on it under `names.md`.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/quality.md` § Falsification; `names.md`, `typescript.md`, `patterns.md`, `architecture.md`, `documentation.md`, `writing.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence; findings fitting no claim; "Attacked and held"; referrals; bounds; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
