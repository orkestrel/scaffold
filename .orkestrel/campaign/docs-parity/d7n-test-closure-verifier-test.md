# Gate Report — d7n-test-verify

## Preconditions
- `git rev-parse --short HEAD`: `997499c`
- `git status --short`: empty (no uncommitted edits present, contrary to the brief's standing condition that the tree carries the closing unit's edits)
- Installed `@orkestrel/guide` version: `0.0.18` (packed tip, `--no-save`; `package.json` declares `^0.0.17`, matching the recorded head-start state)

## Per-command results

1. `git rev-parse --short HEAD && git status --short` — PASS (exit 0). Output above.
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — PASS (exit 0). Output: `0.0.18`.
3. `npm run format:check` — PASS (exit 0). Last line: `Finished in 1619ms on 60 files using 4 threads.`
4. `npm run lint:check` — PASS (exit 0). No output beyond the command echo.
5. `npm run check` — PASS (exit 0). All four `tsc --noEmit` passes (root, core, browser, server) completed silently.
6. `npm run build` — PASS (exit 0). Built `core`, `browser`, `server` targets; only advisory `*** The target project appears to use TypeScript 6.0.3...` notices from API Extractor, no errors.
7. `npm run docs` — PASS (exit 0). Output: `rows read: 1, disagreements found: 0` — matches the expected shape.
8. `PATH=/opt/npm11/bin:$PATH npm test` — **FAIL (exit 1)**. Per-project totals:
   - `test:src` (core/browser/server): 7 files passed, 496 passed | 8 skipped (504) — PASS
   - `test:policy`: 1 file passed, 90 passed | 1 skipped (91) — PASS
   - `test:config`: 1 file passed, 172 passed | 1 skipped (173) — PASS
   - `test:setup`: 3 files passed, 24 passed (24) — PASS
   - `test:guides`: 1 file **failed**, 1 failed | 94 passed (95) — FAIL

   Failure excerpt, owning file `/home/user/fleet/test/tests/guides.test.ts:253`:
   ```
   FAIL  |guides| tests/guides.test.ts > Test > documents an example for every Surface function
   AssertionError: expected [ 'isRecorderMapComplete', …(17) ] to deeply equal []
   - Expected: []
   + Received: [
       "isRecorderMapComplete", "checkBounds", "buildRetryExhausted", "dropRegistration",
       "decodeJSONLines", "requireContained", "isExcluded", "readIdentity", "matchesIdentity",
       "readErrorCode", "createLink", "removeTree", "isRunning", "waitForSocketClose",
       "supportsDirectoryLinks", "supportsMode", "supportsCase", "supportsBytes",
     ]
    ❯ tests/guides.test.ts:253:6
   ```
   This is not a timing failure; it is a deterministic content-parity assertion (`documents an example for every Surface function`) failing on 18 named exports with no guide `@example`.

9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (present in `package.json:81`) — PASS (exit 0). Output: 1 file passed, 11 passed | 4 skipped (15).

## Anomalies
- `git status --short` returned empty, though the brief's standing condition states the tree carries the closing unit's uncommitted edits. Recorded as read; no discrepancy investigated per the read-only mandate.
- During `test:src`, `vitest` logged two intentional unhandled-error/rejection console entries from `tests/src/browser/factories.test.ts:453` and `tests/src/browser/factories.test.ts:462` (`Boom`, `Ignored`) — these are the test's own fault-injection assertions, not suite failures; the project still reported all 7 files passed.

## Overall verdict
RED. First place to look: `/home/user/fleet/test/tests/guides.test.ts:253` (`documents an example for every Surface function`), which requires a documented `@example` in the matching guide for each of the 18 listed Surface functions currently undocumented.

GATES: RED npm test (test:guides)
