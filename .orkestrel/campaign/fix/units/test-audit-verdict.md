# Audit verdict — unit breaking-test

Bench: Sol dark; the objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; `verifier` on Sonnet for the gates. Round 1 subject: commits `2f94b93` (the
unit) and `30f6211` (the `parseCSSColor` fix-up) against base `440b54f`; `units/test.diff`,
`units/test-report.md`.

## Round 1

| Claim | Objective lane | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 every row applied/refused/stopped | CONFIRMED (`test-report.md:7-11`; tree corroborated) | CONFIRMED | — | stands |
| 2 no old name survives; contracts in `types.ts` | BROKEN: `src/browser/helpers.ts:1474` still says `` `style` ``; `guides/test.md:456` still says `` `states` `` for the `PortfolioInterface` member | BROKEN: `helpers.ts:1474` | — | upheld; both corrected by `test-fixup-2` |
| 3 ruled forms landed | CONFIRMED (`parseCSSColor`, `matchesColor`, `read*` family, `placements`; `PortfolioOptions.states` untouched) | — | — | stands |
| 4 no alias or shim | CONFIRMED (every added `export` is the renamed declaration; barrel is `export *`) | — | — | stands |
| 5 guide rows, fences, examples moved; parity list; executed assertions | — | CONFIRMED (no `INTERNAL` list in this package) | — | stands |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates as reported | — | UNRESOLVED (no shell) | GREEN: every gate exit 0 (450 passed, 8 pre-existing skips) | CONFIRMED by the verifier |
| 8 report hides no criterion failure | BROKEN: the report's status line claims a clean sweep that misses two survivors; the import-order deviation claim is contradicted after the fix-up placed `parseCSSColor` in `resolveColor`'s slot | — | — | upheld; `test-fixup-2` re-sorts the import and re-runs the full sweep, and this verdict corrects the record |

Terminal lines: objective `FAIL 2, 8`; checker `FAIL 2`; verifier GREEN.

**Findings outside the claims, upheld.** A renamed interface member ships a stale guide sentence
with every gate green because parity resolves only exports; every later unit brief now requires a
word-boundary prose sweep over `src`, `tests`, and `guides` for each old name (template updated,
commit `fbb4bb3`). A fix-up that edits a file a returned deviation describes restates that
deviation in the successor record: `test-fixup-2`'s report is appended to `test-report.md`.

**Fix round.** `test-fixup-2` (builder on Sonnet): `style` → `readStyle` at `helpers.ts:1474`,
`states` → `placements` at `guides/test.md:456`, `parseCSSColor` re-sorted after `parseColor` in
the test import list, full old-name sweep classified. Round 2 verdict follows below.

## Round 2 (fix round `test-fixup-2`)

Subject: the three-line diff closing the objective lane's required changes 1-3 and the re-run
sweep (required change 4). Orchestrator verification in place of a lane, on a diff of three
lines: `rg` confirms `` `readStyle` where the subject `` at `helpers.ts:1474`, `` `placements` and
`paths` `` at `guides/test.md:456`, and `parseCSSColor` directly after `parseColor` in the import
list; the builder's sweep classifies every remaining hit with no survivor; the gate chain exits 0
per the builder's run. Verdict: PASS. The unit closes **applied** for s11-36, s11-37 (with
`parseCSSColor` for `rgba`), s11-38, and the two audit carriers s11-31 and s11-35.
