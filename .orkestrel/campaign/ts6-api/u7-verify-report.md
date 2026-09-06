<!-- workflow wf_0476a681-8e9, agent a37b7aa87b59ae007, captured from journal.jsonl -->

# Gate report — U7 probe-typestage (probe)

Run from `/home/user/fleet/probe`.

1. `node node_modules/typescript/bin/tsc --version` — PASS (exit 0). Last line: `Version 6.0.3`

2. `npm run format:check` — PASS (exit 0). Last lines: `All matched files use the correct format.` / `Finished in 3719ms on 70 files using 4 threads.`

3. `npm run lint:check` — PASS (exit 0). No warnings or errors reported.

4. `npm run check` — PASS (exit 0). All four `tsc --noEmit` invocations (`tsconfig.json`, `configs/src/tsconfig.core.json`, `configs/src/tsconfig.server.json`, `configs/src/tsconfig.bin.json`) completed with no diagnostics.

5. `npm run build` — PASS (exit 0). `build:src:core`, `build:src:server`, `build:src:bin` all completed. Last lines: `dist/bin/main.js  0.41 kB │ gzip: 0.28 kB │ map: 0.63 kB` / `✓ built in 23ms`

6. `npm test` — FAIL (exit 1). Failing excerpt:
```
 FAIL  |src:server| tests/src/server/Probe.test.ts > probe > expires only the active inspection, cleans its revision, and serves a queued claim
AssertionError: expected [ [ { …(3) } ], [ { …(3) } ] ] to strictly equal [ [ { …(3) } ] ]
 ❯ tests/src/server/Probe.test.ts:696:31
    696|     expect(expirations.calls).toStrictEqual([[hanging]])
       |                               ^
 Test Files  1 failed | 11 passed (12)
      Tests  1 failed | 235 passed (236)
```
The failure is a strict-equal mismatch on `expirations.calls` (an extra recorded expiration precedes the expected hanging-test entry). It does not name the Oxlint language server, an `initialize` deadline, or a plain test timeout, so per the brief it is reported as it stands with no re-run. Suspected owning files: `/home/user/fleet/probe/tests/src/server/Probe.test.ts:696` (assertion) and `/home/user/fleet/probe/src/server/Probe.ts` (expiration-ordering logic under test).

7. `git status --short` — PASS (exit 0):
```
 M guides/probe.md
 M src/core/constants.ts
 M src/core/types.ts
 M src/server/Overlay.ts
 M src/server/helpers.ts
 M src/server/index.ts
 A src/server/parsers.ts
 M src/server/stages/RuntimeStage.ts
 M src/server/stages/TypeStage.ts
 M src/server/types.ts
 M tests/src/core/errors.test.ts
 M tests/src/server/Overlay.test.ts
 M tests/src/server/Probe.test.ts
 M tests/src/server/helpers.test.ts
 A tests/src/server/parsers.test.ts
 M tests/src/server/stages/TypeStage.test.ts
```

## Overall verdict

RED — `npm test` failed (`tests/src/server/Probe.test.ts`); every other gate passed.

## Anomalies

- Stderr during `RuntimeStage.test.ts` "recycles the resident runner" case: `failed to load config from /tmp/orkestrel-test-28jjB3/vite.config.ts`. That test still passed; this reads as expected diagnostic output from a probe fixture, not a defect.

Report written to `/home/user/fleet/probe/tmp/units/ts6-u7-verify-report.md`.

GATES: RED npm test
