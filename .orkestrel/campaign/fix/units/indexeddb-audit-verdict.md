# Audit verdict — unit breaking-indexeddb

Bench: Sol dark; objective and subjective lanes on the writer's engine (Opus 5) in clean
contexts, told so, blind to each other; `checker` and `verifier` on Sonnet. Subject: commit
`0e5cf50` (`units/indexeddb.diff`, `units/indexeddb-report.md`). The subjective lane ran because
the unit reshaped a published context into two managers and extracted a shared interface.

| Claim | Objective | Subjective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows (s16-10, s16-12, s16-15, s16-17, the s16-08 branch comment, the cross-package shared member set) | CONFIRMED | — | CONFIRMED | — | stands |
| 2 no old name in owned files; the three new interfaces in `types.ts` and barrelled by `export *` | CONFIRMED | — | CONFIRMED | — | stands |
| 3 ruled form at every site (no `null` query parameter; the two wrappers deleted and the five builders kept; `value: Row \| undefined` with the executed assertion and its recorded negative control; the context reduced to data with `stores`/`indexes` managers) | CONFIRMED | CONFIRMED | — | — | stands |
| 4 no alias or shim (`IndexedDBRecordStoreInterface` is the ruled extraction, member sets byte-identical) | CONFIRMED | CONFIRMED | — | — | stands |
| 5 guide rows, fences, `@example` moved; `INTERNAL` empty matches the barrel; changed behavior asserted | — | CONFIRMED (one unchanged-behavior clause carried as R4) | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | — | CONFIRMED | — | stands |
| 7 gates | — | — | CONFIRMED on the quoted commands | GREEN (337 tests) | stands |
| 8 nothing hidden | CONFIRMED | — | — | — | stands |

Findings outside the claims, ruled and closed by the builder fix-up `bf4730e`
(`units/indexeddb-fixup-brief.md`, `units/indexeddb-fixup-report.md`; full chain green, 337
tests): R1 the `IndexedDBStoreInterface` summary described the pre-extraction shape; R2 the
`IndexedDBUpgradeContext` paragraph rendered under the transaction-store table and now sits in
the Methods preamble, stating that `context.stores` is the manager whose list is `names` while
the database's `stores` is the name list (referral F1 closed as a stated asymmetry); R3
`above`/`below` in unit-authored prose; R4 the guide's `key`/`primary` clause for a non-record
cursor position had no executed assertion; the two manager blocks open with a noun phrase.

Referral F2, ruled to stand as the s16-17 ruling fixed it and recorded for the next change:
`open` is a state boolean on `IndexedDBDatabaseInterface` and the verb on the store manager, and
`context.stores.open(name)` beside `transaction.store(name)` returns one interface under two
verbs. F1's rename half (moving the database's list behind `stores.names`) is recorded with it.

Observations recorded, no change: the guide carries the shared record member set in three
tables because the landed guide parity requires inherited rows; the range-builder rule sits after
the fence that mixes both spellings; the pre-existing `above`/`below` and `AGENTS §N` pointers
belong to the prose voice wave; the "Explicit transaction control" fence names its scope
parameter `tx`.

Terminal lines: objective PASS; subjective PASS; checker PASS on its claims; verifier GREEN.
**Verdict: PASS.** The unit closes **applied** for every row. Tip packed: `indexeddb-bf4730e.tgz`.
