# FOCUS-FRAME (`ff`) audit round 2 — the Orchestrator's verdict

Claims: `ff-audit-2-claims.md`. Lanes, blind on that one file: the objective lane, `analyst` on GPT-6 Astra
(`ff-audit-2-objective-verdict.md`); the subjective lane, `reviewer` on Opus 5.5 (`ff-audit-2-subjective-verdict.md`);
the checker on Sonnet (`ff-audit-2-checker-verdict.md`). The unit was written by `opus` on Opus 5.5.

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Scope | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 Outline guard | UNRESOLVED | CONFIRMED | — | UNRESOLVED: the list-group control-removal red is predicted, never run |
| 3 Helper logic | BROKEN | BROKEN | UNRESOLVED | BROKEN: two branches no row decides |
| 4 Pointer watcher | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 5 Drive readings | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 6 Law | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |

- **Claim 3.** The objective lane: replacing the larger offset magnitude with the vertical one, or dropping the
  horizontal absolute value, leaves every row satisfied (`rgb(0, 0, 0) -5px 2px 3px 1px` reads 9 correctly and 6 under
  either mutant). The subjective lane: the `shadow === 'none'` branch changes no row, because `'none'` reads 0 either
  way. The checker's open sub-clause (the plain split against the journey's shadows) is settled by the round-2 capture
  runs, which ran green on the plain split.

## Outside the claims

| Finding | Lane | Ruling | Carrier |
| --- | --- | --- | --- |
| GUARD-TERM: the pixel check reuses "guard", the frame guard's term, in its variable and its `tmp/capture/guard` directory | subjective | Confirmed | FOCUS-FRAME round 3 |
| SETUP-FOCUS-UNIVERSAL: a `tests/setup.ts` TSDoc says every focus frame uses a padded wrapper, where the dropdown and carousel placements do not | objective | Confirmed | FOCUS-FRAME round 3 |
| REPORT-TOKEN-NOUNS | objective | Report defect, accepted on the record by the user's instruction to put implementation first | — |
| R-a: retention of `ff-final-2/` and `ff-probes-2/` | subjective referral | Closed by the Orchestrator: both copied into `ff-instruments/` | — |
| R-b: `querySelector<HTMLElement>` narrows without a check | subjective referral | Confirmed as a pattern the baseline carries too | FRAME-HELPERS |
| R-c: parked-pointer entries on the validation and floating specimens have no watcher | subjective referral | Confirmed as unproved | FRAME-HELPERS |
| R-d: the inline region type | subjective referral | Already carried | FRAME-HELPERS |

VERDICT: FAIL 3; claim 2 unresolved; outside the claims: GUARD-TERM, SETUP-FOCUS-UNIVERSAL — carried by FOCUS-FRAME round 3 (`b-focus-frame-brief-3.md`).
