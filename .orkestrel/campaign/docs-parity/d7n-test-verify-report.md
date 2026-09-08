# Report — d7n-test-verify

Lane held: verifier test

## Standing condition check

- Installed `@orkestrel/guide` version: `0.0.18` (packed tip, `--no-save`; `package.json` declares `^0.0.17` — recorded head-start state, not a defect).

## Commands, exit codes, and last lines

1. `git rev-parse --short HEAD && git status --short` — exit 0
   ```
   1b6ce04
   (git status --short: no output, clean tree)
   ```

2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0
   ```
   0.0.18
   ```

3. `npm run format:check` — exit 0
   ```
   Checking formatting...
   All matched files use the correct format.
   Finished in 1753ms on 60 files using 4 threads.
   ```

4. `npm run lint:check` — exit 0
   ```
   > @orkestrel/test@0.0.14 lint:check
   > oxlint --config .oxlintrc.json --deny-warnings .
   ```
   (no warnings/errors reported)

5. `npm run check` — exit 0
   ```
   > @orkestrel/test@0.0.14 check:src:server
   > tsc --noEmit -p configs/src/tsconfig.server.json
   ```
   (tsc --noEmit for root, core, browser, server all completed with no errors printed)

6. `npm run build` — exit 0
   ```
   > @orkestrel/test@0.0.14 copy
   > node -e "..." dist/src/server/index.d.ts dist/src/server/index.d.cts
   Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
   ```
   (all sub-builds, including `dist/src/server/index.js` and `index.cjs`, completed; API Extractor emitted only its standing TypeScript-version-mismatch notice, no errors)

7. `npm run docs` — exit 0
   ```
   > @orkestrel/test@0.0.14 docs
   > node --experimental-strip-types scripts/docs.ts
   rows read: 1, disagreements found: 0
   ```

8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Per-project totals:
   - `test:src` (`src:core`, `src:browser`, `src:server`): Test Files 7 passed (7); Tests 496 passed | 8 skipped (504); Duration 21.53s.
     Two `[Unhandled error]`/`[Unhandled rejection]` lines appear mid-run from `tests/src/browser/factories.test.ts:453` and `:462` (`Boom`, `Refused`, `Ignored`) — these are the test's own deliberately dispatched `ErrorEvent`/`PromiseRejectionEvent` fixtures exercising a journal's error capture, not a failure; the suite finished 7 passed with no failed tests.
   - `test:policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91); Duration 618ms.
   - `test:config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173); Duration 4.58s.
   - `test:setup`: Test Files 3 passed (3); Tests 24 passed (24); Duration 389ms.
   - `test:guides`: Test Files 1 passed (1); Tests 95 passed (95); Duration 1.04s.

9. `grep -n '"test:distribution"' package.json` — present (line 81: `"test:distribution": "vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution"`).
   `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0
   ```
   Test Files  1 passed (1)
        Tests  11 passed | 4 skipped (15)
     Start at  02:41:44
     Duration  22.58s
   ```

## Anomalies

- `npm run build` and `test:config` each print API Extractor's standing notice: "The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor." Informational only; no gate failed on it.
- The `[Unhandled error]`/`[Unhandled rejection]` console lines during `test:src` are fixture-dispatched events asserted by `tests/src/browser/factories.test.ts`, not real failures; the file's test count (7 passed) confirms this.

GATES: GREEN
