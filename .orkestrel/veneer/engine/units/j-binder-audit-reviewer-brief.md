# J-BINDER audit — the subjective lane's brief (round 1)

## Role and lane

`reviewer` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; you hold the **subjective** lane: design fit with the verdict and the contracts, the shape and naming of the mechanisms and helpers, the architecture placement, the guide's `## Engine` section voice, and E6 and E9 compliance. State your lane in your first line and the model the alias served. The other lane runs blind and in parallel; do not hedge toward an imagined consensus. Your own engine (Opus 5.5, the `opus` role) wrote this unit: attack it harder for that reason.

## Subject

The whole chain: Veneer `main` at `1868007`, the J-BINDER unit's uncommitted change in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` on `unit/binder` (its first round), briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-brief.md`. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder.diff` and the actual status `j-binder-status.txt`; the unit's report `j-binder-report.md`; the terrain record `j-binder-evidence.txt`; the design verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md`; E6, E9, and E10 in `decisions.md`; the worktree's files; Bootstrap 5.3.8's source at `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/` where a claim names it.

## What the round decides

Whether the mechanisms every component builds on land on Veneer `main`. A shape defect here is repeated by eleven components.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree (`j-binder-gates.log.txt`): the status lists the fourteen modified and four new files; `npm run check:src:browser`, the scoped oxlint and oxfmt checks, `npm run test:src:browser` (101 of 101 on Chromium 153.0.8010.12), and `npm run test:guides` (19 of 19) pass; `npm run test:policy` reports exactly the two `surface` names E10 rules on; `npm run build:src:browser` fails only on the base's inherited `Sanitizer` reference (J-TYPES round 3's repair, not this unit's file).

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-audit-claims.md`, attempting refutation of each through your lane's lenses (the `reviewer` role file names them); claims 3, 7, 8, 9, and 10 are the ones your lane decides, and on the others you rule from the source and refer an objective defect. `CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED` with what would settle it; a claim whose only evidence is the writer's report is `UNRESOLVED`. You run no command: for a claim about a run, rule on the source and name the run the Orchestrator takes. An objective defect you notice outside your lane is a referral to the objective lane, evidenced, with no verdict of yours. Report no prose finding: a TSDoc or guide wording you would change is a bound, recorded at the end, unless the sentence states a behaviour the code contradicts, which is a finding.

## Unknowns

Whether `resolveOptions` as a `helpers.ts` leaf taking a `parsers` table is the right home and shape against R13's `parsers.ts` with `parse{Entity}Attributes` (claim 7): rule under `architecture.md` § Kind purity and the centralization law, given E10's acceptance of the unit's reading. Whether `Delegate`'s static `#driven` map and `Button`'s static `#registry` are the right placement for cross-instance state under `architecture.md` and the design laws (claim 3): rule on it. Whether the `## Engine` section's intro and four subsections say what R18 assigns them in the guide's voice, with each departure from Bootstrap recorded where a reader looks for it (claim 10): rule on it.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/quality.md` § Falsification; `names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `documentation.md`, `writing.md`; E6, E9, E10; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence; findings fitting no claim; "Attacked and held"; referrals; bounds; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
