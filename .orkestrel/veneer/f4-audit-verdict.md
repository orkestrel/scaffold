# Audit verdict — F4 HOST-OBSERVATIONS in `@orkestrel/veneer`, landed at `af673cb` (2026-09-22)

Claims: `f4-audit-claims.md`. Evidence: `units/f4-audit-evidence.md`, the diff
`units/f4-core.diff.txt`, and the gate log `units/f4-gates.log.txt`. Lanes, blind, on that one
claims file: `checker` on Sonnet (`units/f4-audit-checker-report.md`), `reviewer` on Opus 5,
subjective (`units/f4-audit-reviewer-report.md`), and `analyst` on GPT-6 Astra, objective
(`units/f4-audit-analyst-report.md`, thread `01a0c9a9-7c62-71f1-a961-b2d442e19d09`). Astra wrote
runs 1 to 3 of the unit and the Orchestrator's engine wrote run 4, so each half has an auditor
that did not write it. The Orchestrator settled claim 5 with the retained control run
`units/f4-claim5-control.sh` and `units/f4-claim5-control.log.txt` before ruling: the matrix
reads 4 failed rows on `expect(host.hasAttribute('class')).toBe(classes !== undefined)` with the
three engine lines reverted and 20 passed with them restored.

## Rulings per claim

| Claim | Checker | Reviewer | Analyst | Ruling and carrier |
| --- | --- | --- | --- | --- |
| 1 recorder reads at delivery | referred | CONFIRMED | CONFIRMED | Held. |
| 2 repaired cases not weakened | referred | CONFIRMED | CONFIRMED | Held. |
| 3 no stored-event read after dispatch | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 4 engine change restores absence | referred | CONFIRMED | CONFIRMED | Held. |
| 5 matrix binds to the defect | referred | UNRESOLVED | UNRESOLVED | Held on the Orchestrator's retained control run named in the preamble; the unit's self-report alone did not establish it. |
| 6 matrix asserts the contract | referred | CONFIRMED | CONFIRMED | Held. |
| 7 build is provenance | referred | CONFIRMED | CONFIRMED | Held; the reviewer's F2 moved the provenance contract under its own case title. |
| 8 receipts true | referred | CONFIRMED | BROKEN | BROKEN as written: "every test project" over-claimed the registry-gated `distribution` project. Fixed in the landed tree: the row names the projects `npm test` invokes and excludes `distribution`. The revision pairing sentence names the retained instrument record's provider string. |
| 9 delegated-release paragraph proved | referred | BROKEN | BROKEN | BROKEN: no case reinserted the host before the release click. Fixed in the landed tree: `tests/src/browser/Delegate.test.ts` case "keeps the engine and the state of a host reinserted before the next root click". |
| 10 stripe scope both directions | referred | CONFIRMED | CONFIRMED | Held. |
| 11 rename complete and bounded | CONFIRMED | BROKEN | CONFIRMED | Held. The reviewer's residual `specimen` hits are the measurement-sense word for the examined element in proof messages, not the registry term; `scene` is the registry and `SceneManager` its class. Ruled to stay. |
| 12 no installed export duplicated | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 13 gate chain green | CONFIRMED | CONFIRMED | CONFIRMED | Held; re-run green on the landed tree (`units/f4-gates.log.txt`, run 3). |
| 14 scope honest | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 15 parity and prose | CONFIRMED | BROKEN | BROKEN | BROKEN: the README row stated a count ("Two `src:browser` cases"). Fixed in the landed tree: the row names the cases by file. |
| 16 unit coherent | referred | BROKEN | CONFIRMED | BROKEN on placement: `EventReading` and `ButtonRestoration` sat in `tests/setup.ts` with an unused type parameter. Fixed in the landed tree: both live in `tests/setupBrowser.ts` beside their only consumers, without type parameters. |

## Findings outside the claims

- Reviewer F1 — class-attribute restoration undocumented. Substantiated; the guide's § Surface
  paragraph on button destruction now states it.
- Reviewer F2 — provenance contract proved under a case titled for something else. Substantiated;
  split into "requires the recording browser as provenance and excludes it from the comparison" in
  `tests/setupConformance.test.ts`.

## Attacked and held

The recorder's composition over the installed `createRecorder`; the `related` narrowing through an
`in` check; the fixture's array-layout diff (the browser member is the only non-whitespace change);
the stripe assertion in the light scope; the `specimen` measurement-sense messages.

## Deviations

The lanes ran in sequence on the Codex bench's one-lane rule; each stayed blind. The checker's
terminal line departs from the skill's form and is read as referral on its unresolved claims. The
fixes landed as Orchestrator edits under `units/f4-brief-4.md`, audited by the two lanes that did
not write them, and the gate chain re-ran green before the landing.

VERDICT: FAIL 8, 9, 15, 16; outside the claims: F1, F2 — all carried and closed in `af673cb`
