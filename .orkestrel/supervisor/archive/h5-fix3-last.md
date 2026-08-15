Implemented all five H5 items from baseline `ce3ad45`; no commit created.

### Touched files

- [HistoryManager.ts](/workspace/supervisor/app/browser/controllers/HistoryManager.ts)
- [Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts)
- [types.ts](/workspace/supervisor/app/browser/types.ts)
- [supervisor.md](/workspace/supervisor/guides/src/supervisor.md)
- [HistoryManager.test.ts](/workspace/supervisor/tests/app/browser/controllers/HistoryManager.test.ts)
- [Operator.test.ts](/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts)
- [ClientHistory.test.ts](/workspace/supervisor/tests/app/browser/services/ClientHistory.test.ts)

```text
7 files changed, 94 insertions(+), 29 deletions(-)
```

### Item closure

| Item | Status | Closure |
|---|---|---|
| 1 | Closed | Added history clears to signed-out `identify()` and `#expire()`. Added the held-refusal signed-out regression. Updated expiry assertions to prove the manager is completely empty. Corrected both handler contracts and documented `#refuse`/`#expire` asymmetry. |
| 2 | Closed | Captures the first retained snapshot and waits for a different snapshot before asserting identical content leaves `changed` false. Binding red/green proof recorded below. |
| 3 | Closed | Both named cursor cases execute: space/plus encoding and literal percent-escape data. Exact serialized queries prove space → `+` and plus → `%2B`. |
| 4 | Closed | Moved only `ApplicationTail` from the server-composition table to the application-role table beside `ObserveFrame`. Guide debt remains exactly 8 failures / 296 passes. |
| 5 | Closed | Documented deliberate exclusion of `status` and `paused`; added the present-empty-roster baseline regression, which changes when a run appears. |

### Binding red/green proof

Exact command:

```text
NODE_OPTIONS='--experimental-webstorage --localstorage-file=/tmp/h5-history-storage' ./node_modules/.bin/vitest run --config /tmp/h5-history-vitest.config.ts --reporter=dot --testNamePattern='keeps changed false when a new roster delivery has identical run identity and update content'
```

RED with temporary reference-identity derivation:

```text
AssertionError: expected true to be false // Object.is equality

 Test Files  1 failed (1)
      Tests  1 failed | 8 skipped (9)
exit=1
```

GREEN with the committed content-key derivation:

```text
 Test Files  1 passed (1)
      Tests  1 passed | 8 skipped (9)
exit=0
```

### Verification

Green:

```text
npm run format:check  exit 0
npm run lint:check    exit 0
npm run check         exit 0
npm run build         exit 0
test:src:core         178 passed
test:app:core         100 passed
test:policy           17 passed
HistoryManager        9 passed
targeted Operator/cursor regressions  4 passed
git diff --check      exit 0
```

Expected baseline debt:

```text
npm run test:guides
Test Files  1 failed (1)
Tests       8 failed | 296 passed (304)
```

Awaiting the Orchestrator because they require loopback/native execution:

- `npm run test:app:browser`
- `npm run test:app:browser:integration`
- `npm run test:app:server`

Additionally, `test:src:server` requires Orchestrator rerun: this sandbox produced 20 process-fixture failures / 53 passes under Vitest, unrelated to the seven-file diff; the same fixture executed directly successfully.

### Git status

```text
 M app/browser/controllers/HistoryManager.ts
 M app/browser/controllers/Operator.ts
 M app/browser/types.ts
 M guides/src/supervisor.md
 M tests/app/browser/controllers/HistoryManager.test.ts
 M tests/app/browser/controllers/Operator.test.ts
 M tests/app/browser/services/ClientHistory.test.ts
```

Deviations: none in implementation or scope. Verification exceptions are enumerated above.