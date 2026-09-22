<!-- Unit TEST-RELEASE-GATES report: `verifier` on Sonnet (native subagent), returned 2026-09-22. Brief: units/test-release-gates-brief.md. Checkout /home/user/test, branch claude/inspiring-allen-t4qzv1, working tree carrying the tolerance edit, the 0.0.19 bump, and the regenerated lockfile. Host npm 10.9.7 on the verifier's path. Retained verbatim. -->

Gate Report — @orkestrel/test 0.0.19 release gates, branch `claude/inspiring-allen-t4qzv1`, `/home/user/test`

Standing condition confirmed: `git status --porcelain` shows exactly
```
 M package-lock.json
 M package.json
 M tests/src/browser/helpers.test.ts
```
matching the brief's expected dirty state.

1. `npm run format:check` → PASS (exit 0). `oxfmt --check` reports all 60 matched files correctly formatted.

2. `npm run lint:check` → PASS (exit 0). `oxlint --deny-warnings` reports no output, no warnings.

3. `npm run check` → PASS (exit 0). `tsc --noEmit` across the root project and `configs/src/tsconfig.{core,browser,server}.json` reports no diagnostics.

4. `npm run build` → PASS (exit 0). `vite build` for `core`, `browser`, and `server` each complete (`✓ built in`), and the `.d.cts` copy steps for `core` and `server` both report `Copied:`. API Extractor logs an informational notice that the bundled TypeScript version (5.9.3) is older than the project's TypeScript (6.0.3); this is not a failure.

5. `npm test` → PASS (exit 0). `test:src` reports `Test Files 7 passed (7)` and `Tests 644 passed | 2 expected fail | 8 skipped (654)`; `test:policy` reports `109 passed | 1 skipped (110)`; `test:config` reports `173 passed | 1 skipped (174)`; `test:setup` reports `21 passed (21)`; `test:setup:browser` reports `6 passed (6)`; `test:guides` reports `51 passed (51)`. The `[Unhandled error] Error: Boom` and `Error: Ignored` lines printed mid-run come from `tests/src/browser/factories.test.ts:471` and `:480`, which dispatch synthetic `error` and `unhandledrejection` events on purpose to exercise the journal; they are not failures.

6. `npm run test:distribution -- --mode release` → FAIL (exit 1).
   Failing excerpt:
   ```
   FAIL  |distribution| tests/distribution.test.ts [ tests/distribution.test.ts ]
   Error: Installing the packed archive failed: npm error Cannot read properties of null (reading 'edgesOut')
   npm error A complete log of this run can be found in: /tmp/distribution-nteOEZ/cache/_logs/2026-09-22T13_27_07_406Z-debug-0.log
    ❯ buildStage tests/distribution.test.ts:709:9
    ❯ openStage tests/distribution.test.ts:788:10
    ❯ tests/distribution.test.ts:795:15
   ```
   Owning file: `tests/distribution.test.ts:709` (`buildStage`'s install-status check), triggered from `openStage` at `tests/distribution.test.ts:788`. The npm debug log itself was already swept by the test's own teardown by the time it was read, so only the captured stdout/stderr excerpt above is available as evidence.

Overall verdict: RED. Gates 1 through 5 are green; gate 6, the release distribution proof, fails on `npm install` raising `Cannot read properties of null (reading 'edgesOut')` while installing the packed archive — an `npm` dependency-graph error, not an assertion failure in the test itself. Look first at `tests/distribution.test.ts:709` (`buildStage`) and the exact `npm install` invocation it runs against the packed tarball in `/tmp/distribution-*`.

Anomalies:
- Piping a command through `tail` in the same shell invocation returns `tail`'s exit code, not the command's; re-running each gate with output redirected to a file and reading `$?` directly (rather than through a pipe) was necessary to get a true exit code, and gates 1 through 5 all read 0 on that re-run.
- The `test:distribution` npm debug log path it names (`/tmp/distribution-nteOEZ/cache/_logs/...`) was already gone when checked immediately after the failing run, because the test harness tears down its temporary directory on failure exit; only the console excerpt above is retained.
- Re-running `test:distribution -- --mode release` a second time reproduced the identical `edgesOut` failure with a fresh temp directory (`/tmp/distribution-uwbSlO` the first time, `/tmp/distribution-nteOEZ` the second), so this is a repeatable failure, not a flake.
