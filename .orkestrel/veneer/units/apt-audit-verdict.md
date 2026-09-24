# AP-TYPE audit, round 1 — the Orchestrator's reconciliation (2026-09-24)

Claims: `apt-audit-claims.md`. Lanes that ran, blind to each other on that one claims file: the objective lane, `analyst`
on GPT-6 Astra (`apt-audit-objective-verdict.md`, thread `01a0d54d-35d8-7951-85f1-c64adf2be0be`); the subjective lane,
`reviewer` on Opus 5.5 (`apt-audit-subjective-verdict.md`); and `checker` on Sonnet (`apt-audit-checker-verdict.md`,
claims 1 and 7 to 10). The unit was written by `opus` on Opus 5.5, so the objective lane ran on an engine that did not
write it. The Orchestrator added a capture over the unit's cascade
(`appearance-instruments/apt-type-capture.mjs`, its log, and `apt-type--<mode>-<width>.png`), because no journey frame
renders the display classes or a bare legend.

## Rulings

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 2 | CONFIRMED | CONFIRMED | — | Held: the rule equals Bootstrap's compiled coefficients for every family at a 16px root. |
| 3 | CONFIRMED | CONFIRMED | — | Held: only the font-size declarations and their caps changed. |
| 4 | CONFIRMED | CONFIRMED | — | Held. |
| 5 | CONFIRMED | CONFIRMED | — | Held. The default legend cannot tell the old formula from the rule, and the 40px retune can. |
| 6 | CONFIRMED | CONFIRMED | — | Held. |
| 7 | BROKEN | BROKEN | UNRESOLVED | Broken on the report's sentence: the guard mutation does not redden the default legend, and the list of baseline-passing proofs omits `.h4` to `.h6`, `.fs-4` to `.fs-6`, and the override case. G1. |
| 8 | BROKEN | CONFIRMED | CONFIRMED | Broken: at and above 1200 each size is exactly its token, and `toBeCloseTo(x, 2)` accepts 36.004px where the base pinned `36px`. The objective lane's executed matcher settles it. G2. |
| 9 | CONFIRMED | BROKEN | CONFIRMED | Broken: "over its size token" is false for the display classes, which scale their display token; "responsive" names two things in one section; "after the walk" names no walk. G3. |
| 10 | BROKEN | BROKEN | REFERRAL | Broken. The continuity blocks cannot fail while the oracle assertions at 1199 and 1200 hold, and the oracle's own step is pinned in `tests/setupStyles.test.ts`, so the Orchestrator strikes the brief's continuity criterion and the blocks go (the repeated reader goes with them). `fluid` is an adjective where the styles rule names a function by a noun. `TYPE_THRESHOLD_CASES` names the floor by another term and its case is titled for an action. G4. |
| Rendered | NOT-EVIDENCED | NOT-EVIDENCED | — | Held on the Orchestrator's capture: every heading, display, size, and legend reads the table's value at 390 and 1280 in both modes, with no page overflow and no clipping. |

The unit ran a tree-wide `oxfmt --write` through `npm run format -- <files>` and `npm run build:src`, in its own worktree
while AP-COLOR ran in another. The brief told it to format through `npm run format`, so the deviation is the brief's; the
status shows no file outside the owned and shared set. Successor briefs name the formatter by path.

## Findings and carriers

| Finding | Source | Carrier |
| --- | --- | --- |
| G1: the failing-first paragraph overstates the guard mutation and lists the baseline-passing proofs incompletely | both lanes | AP-TYPE round 2 (`ap-type-brief-2.md`) |
| G2: exact size pins at and above 1200 became tolerances | objective | AP-TYPE round 2 |
| G3: the display-token scope, the two senses of "responsive", and "after the walk" in § Font utilities | subjective | AP-TYPE round 2 |
| G4: the continuity blocks, the `fluid` name, and the floor table's name and case title | both lanes | AP-TYPE round 2 |
| G5: the inline case matrix in `tests/src/styles/mixins.test.ts` | both lanes | AP-TYPE round 2 |

VERDICT: FAIL 7, 8, 9, 10; outside the claims: G5
