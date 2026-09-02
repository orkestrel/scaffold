# Unit database-fixup — report (2026-09-02)

Writer: `builder` on Claude Sonnet (native). Returned report, as data:

- F1 closed — `src/browser/drivers/IndexedDBDriver.ts:750-763`: the `column.remove` branch throws
  `DatabaseError('MIGRATION', 'migrate: stored value is not a record', { table })` on a non-record
  cursor value; the skip comment is gone. Test "a column.remove migration fails closed on a
  non-record stored value" at `tests/src/browser/drivers/IndexedDBDriver.test.ts:1286`; failing
  first against the skip `1 failed | 79 passed (80)`, then `80 passed (80)`. Seeding path: open the
  driver on the deployed schema, write one row, close, connect a native
  `createIndexedDBDatabase` on the same name, `putIndexedDBValue(db, 'users', 'x', 42)`, close,
  reopen a fresh driver and call `migrate` with the `column.remove` step. Guide sentence at
  `guides/database.md:567-568`.
- R1 closed — `tests/src/browser/helpers.test.ts`: `describe('INDEXABLE_STORAGE')` asserts
  `Object.isFrozen` and the exact members `['text', 'integer', 'real']`.
- R2 closed — `guides/database.md:307`: the `StorageInterface` `scan` row reads "Iterate a
  table's rows in ascending key order inside the transaction."; the `DriverInterface` row unchanged.
- Membership closed — `src/browser/helpers.ts:166`, `src/server/helpers.ts:163` read
  `.includes(column.storage)`; the `INDEXABLE_STORAGE` TSDoc names `includes`. The builder also
  converted the three `EXACT_RANGE_COLUMN_STORAGE.some(...)` reads at `src/server/helpers.ts:175,180,223`
  because acceptance criterion 4 demanded a repository-wide zero; same owned file, recorded.

Gates: `npm run format:check` 0 (after `npm run lint` then `npm run format` to converge);
`npm run lint:check` 0; `npm run check` 0; `npm run build` 0; `npm test` 0 (src 926 in 21 files;
policy 111; config 46; setup 63; guides 63). No timing-suspect failure.

```text
 guides/database.md                                | 34 ++++++++++----------
 src/browser/constants.ts                          |  2 +-
 src/browser/drivers/IndexedDBDriver.ts            | 22 ++++++-------
 src/browser/helpers.ts                            |  2 +-
 src/server/helpers.ts                             | 12 +++----
 tests/src/browser/drivers/IndexedDBDriver.test.ts | 39 +++++++++++++++++++++++
 tests/src/browser/helpers.test.ts                 |  8 +++++
 7 files changed, 82 insertions(+), 37 deletions(-)
```

Committed by the Orchestrator as `2ded05a`.
