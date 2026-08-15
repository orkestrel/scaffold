## Composition change

`ApplicationRuntime` now creates one `ApplicationPersistence` owning:

- One SQLite driver and merged database schema for `leases`, `runs`, `units`, `snapshots`, and `sessions`.
- One shared `Lane` admitting every supervisor, workflow, and session operation.
- Lane-serialized workflow/session adapters around the installed stores.
- Shutdown queued through the same lane, draining admitted work before closing the database.

### Updated path enumeration

| Path | Ruling after repair |
|---|---|
| `history()` | Safe: `store.list()` and every `snapshots.get()` share one schema and admission lane. |
| `#available()` | Safe on virgin and already-open contexts; repeated start now returns the expected `CONFLICT`. |
| Retained `inspect()` | Safe; snapshot and supervisor reads are admitted serially. |
| `tail()` | Safe; supervisor, snapshot, and broker reads complete successfully. |
| Live `inspect()` | Safe; remains an in-memory workflow plus supervisor-only read. |
| Roster/control | Safe; remains live in-memory state. |
| `LiveBroker.tail()` | Safe; supervisor access shares admission, while the journal is memory-owned. |
| Session-authenticated request → application read | Safe: sessions use the same merged context and lane. |
| Execution completion | Safe: snapshot persistence and supervisor release queue through the same admission owner. |
| Destruction | Safe: database closure itself takes the lane after queued durable work. |

## Red-to-green evidence

Regression command:

```text
npx vitest run --project app:server tests/app/server/ApplicationRuntime.test.ts
```

- Red: exit 1; 1 failed, 3 skipped.
  - `ApplicationError: Workflow history failed`
  - Cause: `DatabaseError: Table 'snapshots' is not in the schema`
- Green: exit 0; 1 passed, 3 skipped.
- Expanded green proof also covers retained inspection, tail, and repeated-start conflict.
- Temporary `.only` isolation was removed.

Additional merged-admission proof:

```text
ApplicationPersistence.test.ts
1 file passed, 1 test passed
```

It overlaps supervisor, snapshot, and session operations against real SQLite.

## Diff delta

Granted-scope round: 8 files, 232 insertions, 35 deletions.

- Added `ApplicationPersistence`.
- Added lane-admitted workflow and session stores.
- Reworked `ApplicationRuntime` persistence construction and destruction.
- Added authoritative composition types and exports.
- Expanded the runtime regression and added its mirrored persistence test.

Total uncommitted H4 tree: 25 tracked files changed, 713 insertions, 58 deletions, plus the new persistence files. `git diff --check` passes.

## Verification

Green:

- `test:src:core` — 176 tests.
- `test:app:core` — 99 tests.
- SQLite supervisor-store integration — 24 tests.
- Persistence/routes/application seam — 4 tests.
- `format:check`
- `lint:check`
- Full `check`
- Full `build`

`npm run test:src` was rerun and retains the same unrelated 20 provider-fixture failures across four unchanged suites; 225 tests pass. No provider implementation or fixture was changed.

## Awaiting the Orchestrator

- `tests/app/server/ApplicationServer.test.ts`, including the SQLite history-restart proof.
- `npm run test:app:server`
- `npm run test:app`