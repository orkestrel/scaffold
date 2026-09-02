# Unit middleware-fixup — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark). Committed by the Orchestrator as `ec186e4` over
`453f794`. Returned report, as data:

| Finding | State | Change |
| --- | --- | --- |
| 1 claim 2 `data payload` | closed | `src/core/factories.ts:92,117` → "The session entity type" |
| 2 F1/R-3 state claim | closed | `src/core/types.ts:305`, `src/core/Session.ts:10`, `guides/middleware.md:298` restated to the enforced fact; getter unchanged |
| 3 F2/D cycle | closed | `DatabaseSessionStore` constructor takes `restore: (value: unknown) => SessionInterface \| undefined` before `options`; `createDatabaseSessionStore` supplies `createRestoredSession`; the store imports nothing from factories; test "rebuilds through the step it was constructed with" (red 1 of 12, then 12) |
| 4 F3 earlier columns | closed, no store change | the run: a row written under `lastSeen`/`createdAt` reads back through the driver but the table declared with `sessionColumns` resolves `undefined` — its `#cast` row guard refuses it — so `get` never sees missing cursors; test at `tests/src/core/stores/DatabaseSessionStore.test.ts:180` drives `store.get('a', 10_000_000)` against `ttl: 1_000`; guide `:669` states it |
| 5 F4 empty filename | closed | `guides/middleware.md:489` "with a zero-byte body" |
| 6 F5 constants | closed | `DEFAULT_MULTIPART_FILE_SIZE`, `_FILE_COUNT`, `_FIELD_SIZE`, `_FIELD_COUNT` across constants, helpers, types, tests, guide |
| 7 R-1 DELETE | closed | `tests/src/core/middlewares.test.ts:1386`; reddened by reinstating the short-circuit (1 of 119), then 119 |
| 8 R-2 construction guard | closed | store and factory cases; reddened by removing `validateSessionLimits` (3 of 37), then 37 |
| 9 Referral B renames | closed | `transferSessionState`, `buildClient` across helpers, middlewares, tests, guide rows |
| 10 Referral C snapshot | closed | `SessionSnapshot.state`; `snapshotSession`, `createRestoredSession` and its `@example`, tests, guide |

Constructor shape: one positional `restore` parameter typed inline, keeping the guard's narrowing
role, the `SessionStoreInterface` contract, and the public factory signature unchanged; only a
direct `new DatabaseSessionStore(...)` states the step.

Prose sweep over `src`, `tests`, `guides/middleware.md`, `README.md`: zero hits for every retired
name and inflection; the surviving `data` tokens are `multipart/form-data`, the vendored policy
label, an SSE fixture body, and two prose uses.

Gates: `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `test` 0 (src 425 passed, 1
skipped, 1 todo — both pre-existing; policy 111; config 46; setup 23; guides 38). One intermediate
red: `SessionSnapshot` is not assignable to the table's `JSONValue` column type in a test, fixed
by writing the stored rows as literal wire values.

```text
 15 files changed, 272 insertions(+), 102 deletions(-)
```
