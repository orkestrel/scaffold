# U7c — audit verdict

Subject: unit U7c in the Veneer checkout, written by `opus` on native Opus 5 under
`units/u7c-brief.md` with the dispatch message `units/u7c-dispatch-message.txt`, report
`units/u7c-report.md`, over the U7b landing `0cbb563`. Claims: `u7c-audit-claims.md`. Evidence
rendered for the read-only lanes: `units/u7c-diff.patch.txt` (tracked and untracked files) and
`units/u7c-status.txt`. Scope: implementation only, by the user's ruling.

## Round 1, 2026-09-21

Opus wrote the unit, so the Astra analyst holds the objective lane and the Opus reviewer the
subjective lane. All four ran, blind to each other, on one claims file.

| Lane | Role | Engine | Record | Terminal line |
| --- | --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0c269-9cc1-7503-acd0-6410ec44b8ad`, exit 0 | `units/u7c-audit-analyst.sh`, `units/u7c-audit-analyst-report.md` | fix round with claims 2, 4, 8, and finding 10 |
| subjective | `reviewer` | native Opus 5, Workflow `wf_014be581-50d` | `units/u7c-audit-reviewer-brief.md`, `units/lane-u7c-reviewer.md` | fix round on claims 4, 7, and 8; findings 10 to 14 |
| mechanical | `checker` | native Sonnet, the same Workflow | `units/u7c-audit-checker-brief.md`, `units/lane-u7c-checker.md` | fix round on claim 8; finding 10 |
| gates | `verifier` | native Sonnet, the same Workflow | `units/u7c-gate-brief.md`, `units/lane-u7c-verifier.md` | every step exit 0: `format:check`, `lint:check`, `check`, `build`, `test:setup`, `test:setup:browser`, `test:app:browser`, `test:journey`, `CAPTURE=1 test:journey`, `test:distribution`, `test:guides`, `npm test`, the Edge journey, app browser, and setup browser runs, the read-only `scaffold audit`; 48 capture frames listed; the status identical before and after |

### Claims

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 the section family | CONFIRMED | CONFIRMED | — | CONFIRMED; the `destroy()` order clause has no observable consequence, recorded |
| 2 the table proven | REFUTED (partition proof partial) | CONFIRMED | — | REFUTED; carried as brief-2 finding 1 |
| 3 the projection | CONFIRMED (the reducer executed against the fixture) | CONFIRMED | — | CONFIRMED |
| 4 the journeys | REFUTED (`oracle.excluded` never asserted empty; the dark ring sweep reads `Primary` alone) | REFUTED (the same self-comparison) | — | REFUTED; carried as brief-2 findings 2 and 3 |
| 5 the capture registry | REFUTED on wording (an element frame holds one specimen; `home` and `button-primary-rest` frames byte-identical) | UNDECIDABLE (no portfolio supplied) | — | the registry and proofs CONFIRMED from the verifier's listing and the code; the "no frame duplicates another" wording REFUTED and recorded, not carried |
| 6 the consumer case | UNDECIDABLE (run) | CONFIRMED (code) | — | CONFIRMED from the verifier's `test:distribution` reading |
| 7 no new surface, scope | REFUTED on wording (exports are `.`, `./browser`, `./styles`, `./package.json`; the sub-barrel) | REFUTED (the same; the sub-barrel) | CONFIRMED | scope honesty CONFIRMED; the `./server` wording was the Orchestrator's error (also in the U7b landing message); the sub-barrel carried as brief-2 finding 6 |
| 8 law | REFUTED (`driveOracle`, `compareOracle` unexported; no `Label` assertion) | REFUTED (the same) | REFUTED (the `Label` sub-claim) | REFUTED; the helpers and the matrices carried as brief-2 finding 4; the `Label` sub-claim was the Orchestrator's wording, no assertion required |
| 9 gates | UNDECIDABLE | UNDECIDABLE | — | CONFIRMED from the verifier |

### Findings carried into the fix round (`units/u7c-brief-2.md`)

1. Analyst 2: the ownership partition asserted before destruction over both populations.
2. Analyst 4 and reviewer 10: `EXCLUDED` asserted equal to `[]`; the self-comparison deleted.
3. Analyst 4: the dark-mode ring sweep over every `PAINTED` specimen.
4. Analyst 8, reviewer 11, checker 10: the case matrices and `driveOracle` moved to the setup
   files, exported, and proven; `compareOracle` split into a data half in setup and the `expect`
   calls in the journey.
5. Analyst 10: the journey teardown made independent of a rejected pointer release.
6. Reviewer 12: the `sections/index.ts` sub-barrel deleted; the app barrel exports the class.
7. Reviewer 13: `resolveSpecimen` named for the population it searches, its selector a named
   exported constant or a parameter.
8. Reviewer 14: the distribution reader and its `published` field renamed for what they carry.

Recorded, not carried: the `destroy()` order clause; the byte-identical `home` and
`button-primary-rest` page frames (kept until the Test-side element-frame defect is fixed); the
`Label` specimen's absence from `ORACLE_ACTIONS` (a one-line comment permitted); the `./server`
wording. Observations outside the unit from the verifier's `scaffold audit`: unchanged from U7b
(`tests/setupListeners.ts` without a proof file; the registry's later majors).

### Terminal (round 1)

Verdict: fix round. `units/u7c-brief-2.md` on native Opus; the Astra analyst stays the objective
auditor.

## Round 2, 2026-09-21 (the fix round: brief 2)

Opus wrote the fix, so the Astra analyst holds the objective lane. Claims:
`u7c-audit-claims-2.md`. Evidence: `units/u7c-diff-2.patch.txt` beside round 1's,
`units/u7c-status-2.txt`.

| Lane | Role | Engine | Record | Terminal line |
| --- | --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0c28d-5e6c-75a2-971e-9112825cdddf`, exit 0 | `units/u7c-audit-2-analyst.sh`, `units/u7c-audit-2-analyst-report.md` | fix round with claims 2 and 4 and finding 8 |
| subjective | `reviewer` | native Opus 5, Workflow `wf_82c12b75-cad` | `units/u7c-audit-2-reviewer-brief.md`, `units/lane-u7c-2-reviewer.md` | fix round on findings 8 and 9; finding 10 carried forward |
| mechanical | `checker` | native Sonnet, the same Workflow | `units/u7c-audit-2-checker-brief.md`, `units/lane-u7c-2-checker.md` | accept |
| gates | `verifier` | native Sonnet, the same Workflow | `units/u7c-gate-brief.md`, `units/lane-u7c-2-verifier.md` | every step exit 0 (nineteen steps, `npm test`, `CAPTURE=1 test:journey`, the Edge runs, the read-only `scaffold audit` included) |

Claims 1, 3, 5, and 6 CONFIRMED by the analyst and the reviewer (6 by the checker too); claim 7
CONFIRMED from the verifier. Claim 2 REFUTED by the analyst on its last conjunct: the ring value
is pinned only relative to the same run's `Primary` reading, in both modes. Claim 4 REFUTED by
the analyst: the teardown aggregates a rejected release, but the next case mounts regardless.
Analyst finding 8: the setup proofs repeat the release-before-cleanup ordering. Reviewer
findings 8 and 9: `Showcase.test.ts` re-declares the ownership rule by hand and closes on a
tautology with no non-empty guard. Claim 6's `test:probe` conjunct was the Orchestrator's
wording (the script pre-exists at `0cbb563`). Reviewer finding 10 (`driveOracle` honours its
root for the host reading only) is recorded and carried to the unit that adds the second
section.

### Findings carried into the fix round (`units/u7c-brief-3.md`)

1. Analyst 2: the calibrated ring ratios pinned per mode from an exported table.
2. Analyst 4: a teardown failure marker that refuses to mount the next case.
3. Analyst 8: the setup proofs' mount cleanup in an unconditional `finally`.
4. Reviewer 8 and 9: `Showcase.test.ts` derives `owned` from `BUTTON_SELECTOR`, guards it
   non-empty, and closes on the reclaimed-host name list.

### Terminal (round 2)

Verdict: fix round. `units/u7c-brief-3.md` on native Opus; the Astra analyst stays the objective
auditor.
