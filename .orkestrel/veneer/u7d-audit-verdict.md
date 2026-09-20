# U7d — audit verdict, 2026-09-20

Subject: unit U7d in the Veneer checkout, written by `sol` on Astra under `units/u7d-brief.md`,
report `units/u7d-report.md` (thread `01a0c0f6-9147-7e72-96de-23d64790e7ca`, exit 0). Claims:
`u7d-audit-claims.md`. Evidence rendered for the read-only lanes: `units/u7d-diff.patch.txt`
(`git diff 1b80ccb -- . ':(exclude)tmp'`) and `units/u7d-status.txt`. Landed as Veneer `7da6bb1`
(`units/u7d-land.sh`, `units/u7d-land-message.txt`, `units/u7d-land.log.txt`).

## Lanes

Astra wrote the unit, so the lanes are swapped: Opus holds the objective lane and Astra the
subjective lane. All four ran, blind to each other, on one claims file. The Test-paint tarball
was vendored into Veneer's `node_modules` (`units/test-paint-vendor.sh`) before the lanes
launched, so the verifier read the tree the next unit inherits.

| Lane | Role | Engine | Record | Terminal line |
| --- | --- | --- | --- | --- |
| objective | `reviewer` | native Opus 5, Workflow `wf_bcdd99d9-025` | `units/u7d-audit-reviewer-brief.md`, `units/lane-u7d-reviewer.md` | accept |
| subjective | `analyst` | Astra, `codex exec` read-only, thread `01a0c106-6beb-7613-be7f-8d1174a8ae32`, exit 0 | `units/u7d-audit-analyst.sh`, `units/u7d-audit-analyst-report.md` | accept |
| mechanical | `checker` | native Sonnet, the same Workflow | `units/u7d-audit-checker-brief.md`, `units/lane-u7d-checker.md` | accept |
| gates | `verifier` | native Sonnet, the same Workflow | `units/u7d-gate-brief.md`, `units/lane-u7d-verifier.md` | steps 2 to 8 and 10 to 12 exit 0; step 9 (`npm test`) exit 1 in `tests/setupBrowser.test.ts` |

## Claims

| Claim | Reviewer | Analyst | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 `readDeferrals` | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 2 `collectShippedComponents` | CONFIRMED on the current ledger (finding 15) | CONFIRMED | — | CONFIRMED; finding 15 carried |
| 3 `scanCompatibilityPresence` | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 guide rows and subsection | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 5 engine rows skipped | CONFIRMED as a dash skip | REFUTED as written (the skip is the dash, not the component) | — | CONFIRMED as the lanes read it; the claim's wording was the Orchestrator's error: every engine row carries `—`, and an engine row with a named proof is scanned, which is the guide's rule |
| 6 exact binding first | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 7 explicit `events` | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 8 non-serializable fixture | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 9 manifest-rooted read | CONFIRMED (findings 16, 17) | CONFIRMED | — | CONFIRMED; 16 and 17 carried |
| 10 controls | UNDECIDABLE (writer's report only) | CONFIRMED from the journal's exit codes and byte comparisons | UNDECIDABLE | CONFIRMED from the bench journal of thread `01a0c0f6-9147-7e72-96de-23d64790e7ca` (ephemeral, swept at acceptance; each control exit 1 with its message, restore byte-equal), which the analyst read and the native lanes could not |
| 11 letter of the law | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 12 cases kept | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 13 gates | UNDECIDABLE | UNDECIDABLE | — | CONFIRMED for every gate the brief's item 8 names (verifier steps 2 to 8 and 10, exit 0 on Chromium and Edge). The whole chain's step 9 red is outside the unit: see § The whole-chain red |
| 14 placement | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |

## The whole-chain red

`npm test` failed in the `setup:browser` project on two cases in `tests/setupBrowser.test.ts`
that assert the installed Test reader's limits (`matchesColor(mix, recorded)` is `false`;
`parseCSSColor('oklab(0.5 0 0)')` is `undefined`). Those limits closed when the Test-paint tarball
was vendored: the reader now parses `oklab()`. The file is not in U7d's diff, and U7d's own gates
did not run that project. The red is the vendor step's consequence and is carried as the first
item of the successor unit `u7d-bounds` (`units/u7d-bounds-brief.md`), which runs before U7a so
U7a starts from a green baseline. The wrappers `readPaintedColor` and `matchesPaintedColor` keep
one reading the installed reader lacks — the engine's own paint, gamut-mapped, where the reader
clips — and the unit rewrites their doc blocks and the two cases to that truth, proving the
difference on an out-of-gamut colour or reporting that the engine clips too.

## Bounds carried

None forces a round. Carrier in brackets.

- 15 (reviewer) `collectShippedComponents` reports a component shipped when any row of a CSS
  category is shipped; the guide says the key is listed exactly when its selector and variable rows
  are shipped, and the ledger already carries duplicate rows per category. [`u7d-bounds`: every
  row of each CSS category shipped, at least one present; a case with a split category]
- 16 (reviewer) the chdir case computes its expectation with the implementation's own expression.
  [`u7d-bounds`: assert the digest against `BOOTSTRAP_CSS_DIGEST`]
- 17 (reviewer) `tests/setupStyles.test.ts` reads `node_modules/bootstrap/package.json` and
  `BOOTSTRAP_CASCADE_PATH` relative to the working directory. [`u7d-bounds`: read through the
  manifest-rooted constants]
- 18 (reviewer) the live presence assertion cannot fail while both CSS rows are `accepted` and the
  deferral table is empty. [U7a's brief names it: flipping the rows arms the gate]
- 19 (reviewer) the empty-cell refusal labels the row by the name cell, which is empty when the
  name is missing. [`u7d-bounds`: label by position or first non-empty cell]
- 20 (reviewer) `ORACLE_BINDINGS` gained `Dispatches click`, which no ledger row reaches, and
  nothing asserts a binding's obligation appears in the ledger. [`u7d-bounds`: the assertion]
- 21, 23 (reviewer) an overlong guide line; an unsorted import. [U7e; tidiness]
- 22 (reviewer, referred to the subjective lane, which did not reach it) `### Deferred names`
  under § Tokens (`Name | Waiting on`) and `### Deferred selectors` under § Styles
  (`Name | Owner | Reason`) name one idea with two shapes. [U7e, as a design question for the
  guide: one deferral grammar, or a stated reason for two]
- 24 (reviewer) the chdir case depends on the `setup` project's `forks` pool. [`u7d-bounds`: a
  comment naming the dependence]
- checker 15 restates claim 10's evidence gap; closed by the journal reading in the table.
- The claims file's claim 5 wording and the brief's "gates in item 6" (the gates are item 8) were
  the Orchestrator's errors; the unit read the intended item.

## Terminal

Verdict: accept. Landed as Veneer `7da6bb1`. Successor `u7d-bounds` precedes U7a.
