# Gate report — roughnotes acceptance run (2026-09-16)

## 1. `npm run format:check`
Exit code: 0 (PASS)

Last lines:
```
Checking formatting...

All matched files use the correct format.
Finished in 1042ms on 122 files using 16 threads.
```

## 2. `npm run lint:check`
Exit code: 0 (PASS)

Full output:
```
npm notice run roughnotes@0.0.1 lint:check
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```
No further output; `oxlint` returned no findings.

## 3. `npm run check`
Exit code: 0 (PASS)

Last lines:
```
npm notice run roughnotes@0.0.1 check:app:browser
npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json
```
Root `tsc --noEmit`, `check:app:core`, and `check:app:browser` all completed with no diagnostics.

## 4. `npm run build`
Exit code: 0 (PASS)

Last lines:
```
dist/app/browser/index.html                               0.40 kB │ gzip:   0.28 kB
dist/app/browser/assets/bootstrap-icons-mSm7cUeB.woff2  134.04 kB
dist/app/browser/assets/bootstrap-icons-BeopsB42.woff   180.28 kB
dist/app/browser/assets/index-hhVhdyP4.css              323.24 kB │ gzip:  48.09 kB
dist/app/browser/assets/index-BzpKHMm0.js               507.23 kB │ gzip: 132.40 kB

✓ built in 3.50s
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rolldownOptions.output.codeSplitting to improve chunking
[PLUGIN_TIMINGS] Plugin hooks ran for 3.4s of this 3.5s build (97%).
```
The chunk-size warning and plugin-timings notice are expected stderr/stdout output from Vite's
built-in reporter, not a build failure.

**Built CSS asset**: `dist/app/browser/assets/index-hhVhdyP4.css` is 323.24 kB, matching the
323.24 kB size recorded before this change. The application's built CSS surface did not move.

## 5. `npm test`
Exit code: 0 (PASS)

Per-project counts, in run order:

- `test:app` (`app:core` + `app:browser` projects): 43 test files passed (43), 186 tests passed (186).
- `test:journey` (`journey:*` projects): 4 test files passed (4), 76 tests passed, 4 skipped (80 total).
- `test:policy`: 1 test file passed (1), 111 tests passed (111).
- `test:config`: 1 test file passed (1), 46 tests passed (46).
- `test:conformance`: 1 test file passed (1), 11 tests passed (11).

The `[Vue warn]` lines in `useApplication.test.ts` output (`injection "Symbol(application)" not
found`, `Unhandled error during execution of setup function`) are expected stderr output — the
test at `tests/app/browser/composables/useApplication.test.ts:12` asserts on exactly that thrown
injection error.

## 6. `git status --short`
Exit code: 0

```
 M tests/conformance.test.ts
 M tests/setup.ts
 M vite.config.ts
?? .orkestrel/roughnotes/r1-audit-claims.md
?? .orkestrel/roughnotes/r1-audit-objective-brief.md
?? .orkestrel/roughnotes/r1-audit-objective-report.md
?? .orkestrel/roughnotes/r1-audit-subjective-report.md
?? .orkestrel/roughnotes/r1-brief.md
?? .orkestrel/roughnotes/r1-instruments/
?? .orkestrel/roughnotes/r1-report.md
?? .orkestrel/roughnotes/r1-verify-report.md
?? .orkestrel/roughnotes/r2-audit-claims.md
?? .orkestrel/roughnotes/r2-brief.md
?? .orkestrel/roughnotes/r2-report.md
```
This matches the dispatch's stated dirty-by-design tree: modified `vite.config.ts`,
`tests/conformance.test.ts`, `tests/setup.ts`, plus untracked `.orkestrel/roughnotes/` campaign
records. No unexpected file changed.

## 7. `git diff --check`
Exit code: 0 (PASS), no output — no whitespace-error conflict markers in the tracked diff.

## Extra checks

- **`deprecat` search.** Command: `grep -ic "deprecat" tmp/audit/4-build.log` and
  `grep -ic "deprecat" tmp/audit/5-test.log` (case-insensitive line count over the complete captured
  build output and the complete captured test output). Both returned `0`. No Sass deprecation
  warnings resurfaced.
- **Built CSS asset size.** `dist/app/browser/assets/index-hhVhdyP4.css` reports 323.24 kB in the
  `npm run build` output, unchanged from the 323.24 kB baseline.

## Overall verdict

GREEN. Every gate exited 0, the tree's dirty state matches the dispatch's stated expectation, the
`deprecat` sweep found no matches, and the built CSS size (323.24 kB) is unchanged.

## Anomalies

None observed. No flakes, no cache-state irregularities, no unexpected stderr beyond the two
named-and-classified expected cases (build's chunk-size/plugin-timing notices, and the
`useApplication` test's intentional Vue injection warning).

GATES: GREEN
