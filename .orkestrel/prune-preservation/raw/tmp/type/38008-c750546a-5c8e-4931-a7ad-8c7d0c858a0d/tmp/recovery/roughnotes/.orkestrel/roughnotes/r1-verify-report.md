# Gate report — roughnotes, 2026-09-16

Checkout: `C:\Users\mikes\WebstormProjects\roughnotes`. Working tree carries the expected dirty
state: uncommitted changes to `vite.config.ts` and `tests/conformance.test.ts`, plus untracked
`.orkestrel/roughnotes/` campaign artifacts. Not cleaned.

## 1. `npm run format:check`

Exit code: 0 (PASS)

```
npm notice run oxfmt --config .oxfmtrc.json --check .
Checking formatting...

All matched files use the correct format.
Finished in 1016ms on 122 files using 16 threads.
```

## 2. `npm run lint:check`

Exit code: 0 (PASS)

```
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```

No further output; oxlint reports nothing on a clean run.

## 3. `npm run check`

Exit code: 0 (PASS)

```
npm notice run tsc --noEmit --project tsconfig.json && npm run check:app
npm notice run roughnotes@0.0.1 check:app
npm notice run npm run check:app:core && npm run check:app:browser
npm notice run tsc --noEmit -p configs/app/tsconfig.core.json
npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json
```

## 4. `npm run build`

Exit code: 0 (PASS)

```
✓ 139 modules transformed.
dist/app/browser/index.html                               0.40 kB │ gzip:   0.28 kB
dist/app/browser/assets/bootstrap-icons-mSm7cUeB.woff2  134.04 kB
dist/app/browser/assets/bootstrap-icons-BeopsB42.woff   180.28 kB
dist/app/browser/assets/index-hhVhdyP4.css              323.24 kB │ gzip:  48.09 kB
dist/app/browser/assets/index-BzpKHMm0.js               507.23 kB │ gzip: 132.40 kB

✓ built in 3.45s
[plugin builtin:vite-reporter]
(!) Some chunks are larger than 500 kB after minification. ...
```

The chunk-size warning and the plugin-timings note are expected build output, not a failure.

## 5. `npm test`

Exit code: 0 (PASS)

Per-project counts:

- `test:app` (app:core + app:browser combined): 43 test files passed (43), 186 tests passed (186).
- `test:journey` — journey variants reported as one combined `journey:*` project run:
  - Test Files: 4 passed (4)
  - Tests: 76 passed, 4 skipped (80 total)
  - The log does not break the four journey variants into separate blocks; vitest ran them under
    one `journey:*` project selector and reported one combined summary. No variant reported a
    failure.
- `test:policy`: 1 test file passed (1), 111 tests passed (111).
- `test:config`: 1 test file passed (1), 46 tests passed (46).
- `test:conformance`: 1 test file passed (1), 11 tests passed (11).

Stderr lines observed during `test:app` (`[Vue warn]: injection "Symbol(application)" not found`,
`[Vue warn]: Unhandled error during execution of setup function`) are expected output: they
originate from `tests/app/browser/composables/useApplication.test.ts:12:2`, a test that asserts on
the thrown-when-missing-injection behavior.

## 6. `git status --short`

```
 M tests/conformance.test.ts
 M vite.config.ts
?? .orkestrel/roughnotes/r1-audit-claims.md
?? .orkestrel/roughnotes/r1-audit-objective-brief.md
?? .orkestrel/roughnotes/r1-brief.md
?? .orkestrel/roughnotes/r1-report.md
```

Matches the expected dirty state named in the brief, plus untracked campaign artifacts from a
concurrent audit lane.

## 7. `git diff --check`

Exit code: 0 (PASS). No output — no whitespace errors.

## Deprecation-string sweep

Command: `grep -i "deprecat" tmp/audit/4-build.log tmp/audit/5-test.log | wc -l`

Result: 0 matching lines across the complete `npm run build` output and the complete `npm test`
output.

## Overall verdict

GREEN. Every gate exited 0. No `deprecat` regression in build or test output.

## Anomalies

- The `npm test` background launch pattern (`(... ) &` inside a tracked background command)
  returned control before the underlying `npm test` process finished; the wrapper reported
  complete while a live `node` process (PID 22819) was still running vitest. Polled the log for the
  `EXIT:` marker directly rather than trusting the wrapper's completion notification, and the
  suite finished green on that wait.
- No flakes observed on the single run performed.
