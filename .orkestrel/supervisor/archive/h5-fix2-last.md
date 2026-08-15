## Touched files

Application:

- [HistoryManager.ts](/workspace/supervisor/app/browser/controllers/HistoryManager.ts)
- [Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts)
- [seeders.ts](/workspace/supervisor/app/browser/seeders.ts)
- [Client.ts](/workspace/supervisor/app/browser/services/Client.ts)
- [ClientHistory.ts](/workspace/supervisor/app/browser/services/ClientHistory.ts)
- [browser types.ts](/workspace/supervisor/app/browser/types.ts)
- [browser validators.ts](/workspace/supervisor/app/browser/validators.ts)
- [core types.ts](/workspace/supervisor/app/core/types.ts)
- [server types.ts](/workspace/supervisor/app/server/types.ts)

Tests:

- [HistoryManager.test.ts](/workspace/supervisor/tests/app/browser/controllers/HistoryManager.test.ts)
- [Operator.test.ts](/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts)
- [Client.test.ts](/workspace/supervisor/tests/app/browser/services/Client.test.ts)
- [ClientHistory.test.ts](/workspace/supervisor/tests/app/browser/services/ClientHistory.test.ts)
- [validators.test.ts](/workspace/supervisor/tests/app/browser/validators.test.ts)
- [ApplicationHandlers.test.ts](/workspace/supervisor/tests/app/server/ApplicationHandlers.test.ts)
- [setupBrowser.ts](/workspace/supervisor/tests/setupBrowser.ts)

```text
16 files changed, 362 insertions(+), 103 deletions(-)
```

## Per-item closure

| Item | Closure |
|---|---|
| 1. Held-response race | `HistoryManager` now receives the raw history client and explicit `HistoryRefusalHandler`. Refusals cross that handler only after the manager generation check. The exposed client remains decorated. Added clear, no-workflow login, and adoption race regressions, plus a current-refusal control. |
| 2. Named guards | Exported `isHistoryRun` and `isHistoryPage`; `ClientHistory.read()` consumes `isHistoryPage`. Added exact-shape positive and hostile negative controls, real-client refusal coverage, and colon/percent cursor coverage. |
| 3. Boolean guard | Replaced `literalOf(true, false)` with `isBoolean`. |
| 4. Honest `changed` | Baseline and current roster are compared through the ordered `(id, updated)` content key. Undefined baseline remains false. Added identical delivery, genuine transition, late first arrival, and reload-reset proofs. |
| 5. Terminal/loading words | `terminal` now documents the server’s persisted snapshot fact and contrasts it with `ended`. `loading` documents only the current generation, including immediate clearing of abandoned work. |
| 6. One tail shape | `ApplicationTail` now lives only in `app/core/types.ts`. Browser and server import it; `ClientTail` and the server-local declaration were removed without aliases. |
| 7. Fixture verbs | `ScriptedHistory` now uses `block()`/`allow()`, with seam-specific TSDoc. |
| 8. Proof home | Tail-wire round-trip now has its own `ApplicationHandlers tail wire` describe block; the backpressure comment remains with backpressure tests. |
| 9. Small truths | Sorted history imports, widened `ClientRequestHandler.path` documentation, and replaced “catalog wire vocabulary” with “completed-history wire vocabulary.” |

## Acceptance proofs

### 1. Race and raw-client seam

Named regressions:

```text
routes a current history-manager AUTH refusal through its explicit expiry handler
drops a held history AUTH refusal after clear without expiring the retained session
drops a held history AUTH refusal after a no-workflow login adopts the new session
drops a held history AUTH refusal after session adoption keeps the adopted session
```

`npm run check`:

```text
check:src:core      PASS
check:src:server    PASS
check:app:core      PASS
check:app:browser   PASS
check:app:server    PASS
exit 0
```

Native regression execution awaits the Orchestrator because browser discovery was blocked before tests ran.

### 2. Guards and transport proofs

Added tests cover:

```text
valid exact run/page
surplus keys
missing keys
malformed rows
non-terminal status
negative created/updated/released timestamps
empty cursor
real /history BrowserApplicationError refusal
colon-and-percent opaque cursor
```

The cursor is verified both after `URLSearchParams` round-trip and through the real `Client` path, where the result must not be `CONFIG`.

### 3. Roster content-key proofs

Named tests:

```text
identical run identity/update delivery -> false
genuine content transition -> true, rows unchanged
first roster arrival after load -> false
reload captures a new baseline -> false
```

All compile under `check:app:browser`; native execution awaits the browser runner.

### 4. Mechanical shape proofs

```text
$ rg -n "literalOf\(true, false\)|ClientTail" app tests --glob '*.ts'
(no matches; exit 1)

$ rg -n "export interface ApplicationTail" app tests --glob '*.ts'
app/core/types.ts:202:export interface ApplicationTail {

$ git diff --check
(no output; exit 0)
```

Changed-line scan found no `any`, assertions, suppression directives, TODOs, skips, todos, or replacement characters.

### 5. Gates and listener-free suites

```text
npm run format:check   PASS
npm run lint:check     PASS
npm run check          PASS
npm run build          PASS
```

Listener-free tests:

```text
npm run test:app:core  4 files passed, 100 tests passed
npm run test:src:core  14 files passed, 178 tests passed
npm run test:policy    1 file passed, 17 tests passed
```

Browser attempt:

```text
npm run test:app:browser
Error: listen EPERM: operation not permitted 127.0.0.1:63315
Test Files  no tests
Tests       no tests
exit 1
```

Guide parity ran and reported the expected off-limits documentation delta:

```text
1 file failed
8 tests failed | 296 passed
```

## Parity delta

Relative to `01b4fa7`:

- Removed undocumented `ClientTail`: −1 missing export.
- Added undocumented `HistoryRefusalHandler`, `isHistoryRun`, and `isHistoryPage`: +3.
- `ApplicationTail` moved from `app/server` to `app/core`; it was already documented, so the aggregate missing-export count is unchanged by the move, though its guide placement must move to the host-independent application contract section.
- Net missing-export change: `75 → 77`.
- H5-specific missing exports: `7 → 9`.
- `ClientInterface.tail` documentation still needs its return updated to `ApplicationTail`.
- Previously reported H5 behavioral parity debt remains unchanged.

## Suites awaiting the Orchestrator

- `npm run test:app:browser` — all new operator, manager, validator, client, and cursor regressions.
- `npm run test:app:browser:integration` — real browser/server transport project.
- `npm run test:app:server` — including the relocated real tail-wire proof.
- `npm run test:src:server` — required for the complete repository test gate.
- Aggregate `npm run test:app`, `npm run test:src`, and `npm test` inherit those listener-backed projects.

## Worktree status

```text
 M app/browser/controllers/HistoryManager.ts
 M app/browser/controllers/Operator.ts
 M app/browser/seeders.ts
 M app/browser/services/Client.ts
 M app/browser/services/ClientHistory.ts
 M app/browser/types.ts
 M app/browser/validators.ts
 M app/core/types.ts
 M app/server/types.ts
 M tests/app/browser/controllers/HistoryManager.test.ts
 M tests/app/browser/controllers/Operator.test.ts
 M tests/app/browser/services/Client.test.ts
 M tests/app/browser/services/ClientHistory.test.ts
 M tests/app/browser/validators.test.ts
 M tests/app/server/ApplicationHandlers.test.ts
 M tests/setupBrowser.ts
```

Deviations: none. No commits, pushes, installs, or out-of-scope edits were made.