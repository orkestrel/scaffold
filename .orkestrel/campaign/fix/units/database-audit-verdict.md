# Audit verdict — unit breaking-database

Bench: Sol dark; objective and subjective lanes on the writer's engine (Opus 5) in clean
contexts, told so, blind to each other; `checker` and `verifier` on Sonnet. Subject: commit
`c7baae0` (`units/database.diff`, `units/database-report.md`). The subjective lane ran because
the unit is wide (sixteen files, upstream adoptions, a guide restructure).

| Claim | Objective | Subjective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows (s05-06, s05-12, s05-21, s05-23, the s05-04 half, the s05-01/07 and s05-18 fix-ups, the W-DEV carrier, the sqlite and indexeddb adoptions) | CONFIRMED | — | CONFIRMED | — | stands |
| 2 no old name (survivors only in the vendored `guides/indexeddb.md` and `guides/sqlite.md` mirrors) | CONFIRMED | — | CONFIRMED | — | stands |
| 3 ruled form (`scanDriver`; the wrappers deleted; `INDEXABLE_STORAGE` frozen array; the `compile*SQL` trio; `transaction` untouched; the `DriverInterface` table lists every inherited member) | CONFIRMED | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | CONFIRMED | — | — | stands |
| 5 guide rows, fences, README; parity; changed behavior asserted | — | BROKEN (the frozen-array claim and the duplicated `scan` row) | CONFIRMED | — | closed by the fix-up |
| 6 only owned files | CONFIRMED | — | CONFIRMED | — | stands |
| 7 gates | — | — | CONFIRMED on the quoted commands | GREEN (924 src) | stands |
| 8 nothing hidden (one incomplete observation, F2) | CONFIRMED | — | — | — | stands |

Findings outside the claims, ruled and closed by the builder fix-up `2ded05a`
(`units/database-fixup-brief.md`, `units/database-fixup-report.md`; full chain green, 926 src
tests): F1 the IndexedDB `column.remove` migration skipped a non-record stored value against the
fail-closed contract, now `MIGRATION` with a seeded test; R1 the frozen `INDEXABLE_STORAGE`
claim now has an executed assertion; R2 both `scan` rows name ascending key order, which every
driver yields (SQLite orders by the primary column); the membership referral ruled to
`includes` across both helpers.

Ruled and recorded, no change: F2 the stale-mirror observation names only one of two mirrors
(`guides/sqlite.md` is equally stale; both refresh at the re-pin after publish); F3 the
vocabulary substitutions inside the re-wraps (`now`, `simply`, `e.g.`) were applied and not
listed, so the voice wave re-sweeps these files rather than trusting the deferral note; the
optional `DriverInterface.transaction?` absent from the Methods table with a sentence naming the
guide parser (pre-existing, a guide-package question); `scanDriver` beside `driver.scan` (two
senses of one word in one barrel, correct under the prefix contract).

Terminal lines: objective PASS; subjective FAIL 5 (closed); checker PASS; verifier GREEN.
**Verdict: PASS after the fix-up.** The unit closes **applied** for every row. Tip packed:
`database-2ded05a.tgz`. Middleware's closure carries database and re-stages after its own fix-up
lands, before the L2 tips are packed for L3.
