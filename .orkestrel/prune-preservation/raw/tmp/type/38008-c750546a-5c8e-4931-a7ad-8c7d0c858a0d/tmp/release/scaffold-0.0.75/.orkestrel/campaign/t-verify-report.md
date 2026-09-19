# Test package — independent verifier report (Sonnet `verifier`, 2026-09-17)

Retained from the returned message by the Orchestrator (the subagent's transcript file reports
zero bytes). Duration 106 s.

---

# Gate Report

Checkout: `C:/Users/mikes/WebstormProjects/test`, tip `562efcb` matches `git log --oneline -1`; `git status --short` returned no output, so the tree is clean.

| Command | Exit code | Totals line |
|---|---|---|
| `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 1184ms on 60 files using 16 threads.` |
| `npm run lint:check` | 0 | No violation line printed; `oxlint --deny-warnings .` ended with no findings reported. |
| `npm run check` | 0 | All four `tsc --noEmit` invocations (root, `check:src:core`, `check:src:browser`, `check:src:server`) completed with no diagnostics printed. |
| `npm run build` | 0 | `✓ built in 99ms` (Vite); API Extractor emitted its routine bundled-TypeScript-version notice, not an error, and the `dist/src/server/index.d.cts` copy step completed. |
| `npm test` | 0 | Five sub-suites, each `Test Files ... passed`: `test:src` — 7 passed (7), `Tests 577 passed \| 9 skipped (586)`; `test:policy` — 1 passed (1), `Tests 101 passed \| 1 skipped (102)`; `test:config` — 1 passed (1), `Tests 173 passed \| 1 skipped (174)`; `test:setup` — 3 passed (3), `Tests 24 passed (24)`; `test:guides` — 1 passed (1), `Tests 50 passed \| 1 skipped (51)`. The `test:src` run logs two vitest "Unhandled error/rejection" lines from `tests/src/browser/factories.test.ts` (lines 471 and 480), inside a test that dispatches synthetic `error`/`unhandledrejection` events by design; the suite still reports `7 passed (7)`. |
| `npm run test:distribution -- --mode release` | 0 | `Test Files 1 passed (1)` / `Tests 11 passed \| 4 skipped (15)`, `Duration 17.89s`. |

## Dist readings

- Line 2 of `dist/src/browser/index.js`: `import { STATECHART_ATTRIBUTES, STATECHART_STATUSES, buildRefusal, checkBounds, executeScenario, requireValue, waitForAbort, waitForCondition, waitForDelay } from "../core/index.js";`
- `grep -c "did not hold within" dist/src/browser/index.js` prints `0`.

## Anomalies

- `test:src` logs two vitest-reported "Unhandled error"/"Unhandled rejection" console entries from `tests/src/browser/factories.test.ts:471` and `:480`. These come from the test's own `window.dispatchEvent` calls exercising error/rejection capture and do not change the suite's `7 passed (7)` result; flagging as noise, not a failure.
- `npm run test:distribution` logs a Node `DEP0190` deprecation warning about unescaped shell args passed to a child process. This is a warning only; the command still exited 0.

Full logs are at `C:/Users/mikes/WebstormProjects/test/tmp/verify/1-format.log` through `6-distribution.log`.

GATES: GREEN
