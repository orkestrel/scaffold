# Gate report — U3 `d7-guide-verify` (`/home/user/fleet/guide`)

## Installed scaffold version

`0.0.63` — from `node -p "require('./node_modules/@orkestrel/scaffold/package.json').version"`, exit 0.

## Per command

1. `git rev-parse --short HEAD && git status --short` — exit 0
   ```
   c25c689
   ```
   `git status --short` produced no output (clean tree).

2. `node -p "require('./node_modules/@orkestrel/scaffold/package.json').version"` — exit 0
   ```
   0.0.63
   ```

3. `npm run format:check` — exit 0
   ```
   Checking formatting...

   All matched files use the correct format.
   Finished in 2784ms on 81 files using 4 threads.
   ```

4. `npm run lint:check` — exit 0
   ```
   > @orkestrel/guide@0.0.18 lint:check
   > oxlint --config .oxlintrc.json --deny-warnings .
   ```
   (no findings reported)

5. `npm run check` — exit 0
   ```
   > @orkestrel/guide@0.0.18 check:src:core
   > tsc --noEmit -p configs/src/tsconfig.core.json
   ```

6. `npm run build` — exit 0
   ```
   Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
   ```

7. `npm run build && npm run docs` — exit 0
   ```
   rows read: 1, disagreements found: 0
   ```
   Matches the brief's expected line exactly.

8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0

   Totals per Vitest project:
   - `src:core` — Test Files 8 passed (8); Tests 600 passed (600)
   - `policy` — Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
   - `config` — Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
   - `setup` — Test Files 1 passed (1); Tests 7 passed (7)
   - `guides` — Test Files 1 passed (1); Tests 54 passed (54)

9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0

   Totals: `distribution` — Test Files 1 passed (1); Tests 9 passed (9)
   ```
   Duration  16.37s (transform 170ms, setup 64ms, import 2.52s, tests 13.57s, environment 0ms)
   ```

10. `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — exit 1 (gates nothing, recorded per brief)
    ```
    dependencies: The manifest at . does not declare a planned dependency: vite-plugin-dts. Add this exact dependency line to dependencies or devDependencies in package.json: "vite-plugin-dts": "^5.0.3",
    ┌─────────────────────────────────┬─────────┬───────┐
    │ path                            │ group   │ drift │
    ├─────────────────────────────────┼─────────┼───────┤
    │ tsconfig.json                   │ configs │ stale │
    │ vite.config.ts                  │ configs │ stale │
    │ configs/src/vite.core.config.ts │ configs │ stale │
    │ configs/helpers.ts              │ configs │ stale │
    │ configs/policy.ts               │ configs │ stale │
    │ .oxlintrc.json                  │ configs │ stale │
    │ tests/setupPolicy.ts            │ tests   │ stale │
    │ tests/policy.test.ts            │ tests   │ stale │
    │ tests/config.test.ts            │ tests   │ stale │
    └─────────────────────────────────┴─────────┴───────┘
    9 of 33 planned paths drifted from the plan. Audit compared bytes at 23, existence at 4, and nothing at 6.
    ```
    This matches the brief's expectation: vendored paths from the head start read as drift against the registry `0.0.63` until scaffold publishes.

## Anomalies

None observed. Every command 3 through 9 ran on the first attempt with no retries, no cache-related output, and no flakes.

GATES: GREEN
