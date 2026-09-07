# Audit verdict — slice 2 (budget, csv, emitter), over each package's P.1 and P.2

## Round 1 (2026-09-07, Workflow `wf_1745fae9-33e`)

Lanes: subjective `reviewer` (Opus 5), objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench), `checker` ×3 (Sonnet). Brief: `d7n-slice2-audit-brief.md` (generated before Ruling 11 and the examples-binding wording reached the template). Returns: `d7n-slice2-audit-{subjective,objective,checker-budget,checker-csv,checker-emitter}.md`.

### Rulings per claim

- **Claim 9 (budget) — FAIL by the subjective lane and the checker, PASS by the objective lane, ruled accepted.** The `TokenBudgetOptions` `Shape` cell names the documented `TokenScope` alias where the baseline inlined its union, and the `BudgetInterface` cell takes the brace idiom; both are disclosed in the report and both are what Ruling 12 requires. No escaped pipe was lost (`TokenScope`'s own row spells the union).
- **Claims 12, 25, 38 — FAIL, annotated.** Counts in prose in every report (the campaign's own "the three cases" term among them, renamed "the gate cases" in the plan and the templates), stale citations in budget's and csv's converge reports, and csv's and emitter's reports describing the pin in words the file does not carry.
- **Claims 15 (csv) and 28 (emitter) — FAIL.** The mapped `examples` binding sits inside the `it`; the brief named the mapping and not the hoist, so the defect is the brief's (objective D) and the template now names the hoist. Carried to the fix rounds.
- **Claims 11, 24, 37 — CANNOT RULE**, referred to the per-package `verifier` after the fix rounds.
- **Every other claim — PASS.**

### Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| budget's opening paragraph re-teaches § Surface | subjective F1 | budget fix |
| `GUIDE_SPEC` unused at the one other site reading the path (budget, emitter) | subjective F2 | budget and emitter fixes; the template names it |
| The `Shape` sentence claims one idiom over cells rendered three ways | subjective F3 | Ruling 12; every fix round rewrites its rows; the template states the idiom |
| emitter's class row names the interface in prose | subjective F4 | emitter fix |
| The pin form's wording | subjective F5 | Ruling 11 (already) |
| `--to source` is lossy over summaries with no guard | subjective F6, objective B | for the owner: a seed unit after the pass (`--to source` writes example bodies alone unless a flag names summaries); the procedural order stands meanwhile |
| csv's `RowResult` summary is falsified by `buildRow` under `ragged: 'collect'` | subjective F7 | csv fix; the template adds prose truth |
| csv's propagated cells carry spaced hyphens from its source blocks | subjective F8, objective A | csv fix: the source blocks take the spaced em dash |
| csv's § Surface lead-in describes the document | subjective F9 | csv fix |
| budget's See also link text names `../README.md` | subjective F10 | budget fix |
| csv's README states a count | objective C | csv fix |
| The examples-binding hoist reached one of three units | objective D | the template (done); csv and emitter fixes |
| "the three cases" in the campaign's own vocabulary | objective E | renamed in `d7-fleet-plan.md` and `gen-p2.sh` |
| budget's report cites baseline lines | objective F | annotated |

Round 1 closes as `VERDICT: FAIL 9 12 15 25 28 38` reconciled: 9 accepted under Ruling 12, the report faults annotated, 15 and 28 and the findings carried into `d7n-{budget,csv,emitter}-converge-fix`, each closed by `checker` and the package's `verifier`.
