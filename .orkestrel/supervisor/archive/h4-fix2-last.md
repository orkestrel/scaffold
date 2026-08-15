## Root cause

`ApplicationRuntime` creates supervisor, workflow-snapshot, and session databases as independent database contexts over one SQLite driver. Each context caches its readiness while the driver retains one active schema, so later sequential reads can address the wrong schema; local `await` ordering cannot repair the composition.

## Cross-wrapper enumeration

| Path | Sequence | Ruling |
|---|---|---|
| `history()` | `store.list()` → `snapshots.get()` | Unsafe; reproduced with `snapshots` absent from the active supervisor schema. |
| `#available()` | `snapshots.get()` → `store.get()` | Only accidentally safe during virgin initialization; unsafe after both contexts cache readiness. |
| Retained `inspect()` | `snapshots.get()` → `store.get()` | Unsafe for the same reason. |
| `tail()` | `store.get()` → `snapshots.get()` | Unsafe for the same reason. |
| Live `inspect()` | live workflow snapshot → supervisor run inspection | Safe; does not cross the durable wrappers. |
| Roster/control methods | in-memory workflow and supervisor state | Safe. |
| `LiveBroker.tail()` | supervisor store plus memory journal | Safe; no snapshot wrapper crossing. |
| Session-authenticated request → application read | session database → supervisor/snapshot database | Unsafe third context sharing the same driver. |
| Execution completion | snapshot persistence → supervisor release | Also composition-sensitive despite not being a read path. |

The class-wide repair must change [ApplicationRuntime.ts](/workspace/supervisor/app/server/ApplicationRuntime.ts:100) to use one merged database context with shared admission, or separately owned drivers with explicit closure. That file is outside H4’s unchanged owned list, and neither store interface exposes its driver/context, so no authorized `SupervisorApplication` change can perform the repair.

## Failing-first evidence

```text
npx vitest run --project app:server tests/app/server/ApplicationRuntime.test.ts
Exit: 1
Tests: 1 failed, 3 skipped
ApplicationError: Workflow history failed
Cause: DatabaseError: Table 'snapshots' is not in the schema
```

The proof drives `runtime.application.history()` directly after an event-confirmed release, with no HTTP listener or client concurrency. Temporary `.only` isolation was removed.

Green evidence is unavailable because the required production fix is off-limits.

## Diff delta

- [ApplicationRuntime.test.ts](/workspace/supervisor/tests/app/server/ApplicationRuntime.test.ts:112): expanded the fresh-SQLite proof through completion and direct history retrieval.
- Second-round delta: 1 test file, 25 insertions, 1 deletion.
- No production files changed this round.
- `git diff --check` passes.

## Suites awaiting the Orchestrator

After authorization and implementation of the composition repair:

- `tests/app/server/ApplicationServer.test.ts`
- `npm run test:app:server`
- `npm run test:app`

Listener-free suites were not claimed green because the new regression intentionally remains red. The required scope expansion is `app/server/ApplicationRuntime.ts` plus any centralized composition helper/type and its tests.