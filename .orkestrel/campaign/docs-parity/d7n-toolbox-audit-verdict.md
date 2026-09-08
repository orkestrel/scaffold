# Audit verdict — toolbox

Workflow `wf_6147154e-77c`, 2026-09-08, 14 minutes, a giant alone: the subjective lane (`reviewer`, Opus 5), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), and a `checker` (Sonnet), blind and clean, on `d7n-toolbox-audit-brief.md`. Lanes retained as `d7n-toolbox-audit-{subjective,objective,checker-toolbox}.md`.

| Lane | Verdict | Substance |
| --- | --- | --- |
| subjective | FAIL 5 9 | claim 5 on the report's rewritten-blocks list (two unrecorded `src/core/shapers.ts` rewrites); claim 9 on a `both` tally at `guides/toolbox.md:79`; findings F1 to F9 |
| objective | FAIL 9 12 | claim 9 on the same tally; claim 12 on counts in the prep report's prose; findings F1 to F7 |
| checker | PASS | every mechanical claim; the brief's claim 10 named `9d54594`, the commit the Orchestrator amended into `d4c724d` (the substance was ruled against the retained diff) |

## Findings carried into the fix round (`d7n-toolbox-converge-fix-brief.md`)

- T1 — the lowercase `note` after a full stop at `guides/toolbox.md:312` and the fence comments at `:948` and `:985` (subjective F1).
- T2 — the `both` tallies at `guides/toolbox.md:79` and `:344` (subjective F8, objective claim 9).
- T3 — `### Lifecycle classes` over one `DatabaseResolver` row (subjective F9).
- T4 — the `### Shapes` table's `Shape` column under Ruling 25 (subjective F4).
- T5 — `createTerminalRoutes`'s empty `Shape` cell under Ruling 26 and the `### Server routes` sentence's fixed constants wording (subjective F3, objective F2).
- T6 — the `//` section comments' emphasis and counts (subjective F5).
- T7 — the `tests/setup.ts` openers at `:170` and `:187` (subjective F7).

## Rulings and carries

- Subjective F2, objective F1, F5, and F7, and objective claim 12: report defects; the Orchestrator annotates the converge and prep reports rather than reopening the units.
- Objective F3: the prep instruments are retained under `instruments/d7/units/toolbox/prep/` beside the converge instruments.
- Objective F4 (the vendored voice rule passes a noun opener ending in `s`): carried to scaffold's next vendored release in `d7-fleet-plan.md`.
- Subjective F6 (`findDrift` counts a both-absent pair as a disagreement): carried to the guide package in `d7-fleet-plan.md`.
- Objective F6: the brief's claim 10 carried the pre-amend hash; the evidence lines named `d4c724d`.
- Subjective F3 and F4 asked for fleet-wide decisions: Rulings 25 and 26 take them.
