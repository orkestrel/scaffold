# Gate report — U5-fix verify

| Command | Exit code | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | PASS — "All matched files use the correct format." (222 files) |
| `npm run lint:check` | 0 | PASS — no output, no warnings/errors |
| `npm run check` | 0 | PASS — `tsc --noEmit` root, core, server, bin all clean |
| `npm run test:setup` | 0 | PASS — Test Files 2 passed (2), Tests 74 passed (74) |
| `npm run test:guides` | 0 | PASS — Test Files 1 passed (1), Tests 17 passed (17) |
| `npm run test:src:core` | 0 | PASS — Test Files 9 passed (9), Tests 385 passed (385) |
| `git status --short` | 0 | Working tree dirty: `M tests/guides.test.ts`, `M tests/setupServer.test.ts`, `M tests/setupServer.ts`, `M tests/src/core/templates.test.ts` |

## Anomalies

- `tests/src/core/templates.test.ts` emits expected stderr noise from its own test case ("refuses a non-object peer dependency declaration at config load") — a Vite mixed-exports warning and a "failed to load config" line produced by the test's own malformed fixture. The test still passed; this is the test intentionally exercising a failure path, not a gate failure.

GATES: GREEN
