# Unit RM-SCAFFOLD round 3 report

## Evidence re-readings

- `grep -rn readVitestReport --include=*.ts --include=*.md . | grep -v node_modules | grep -v '^./tmp'`
  returned `tests/setupServer.ts` (the TSDoc `@example` and the declaration), `tests/setupServer.test.ts`
  (the import and its calls), and `tests/distribution.test.ts` (the import and its calls), matching the
  brief's Evidence exactly.
- The `readVitestReport` TSDoc opened `Reads the test files a Vitest JSON report records.`, and its
  `@remarks` read the text the brief quotes, matching exactly.
- The `buildReleaseScenarios` TSDoc `@remarks` ended `Each rival rewrites the workspace for its own run,
  and the caller restores the generated text after it.`, matching exactly.
- The comment in `declares every emitted project factory with the override parameter` in
  `tests/src/core/templates.test.ts` opened and contained the text the brief quotes, matching exactly.
- The case in `tests/setupServer.test.ts` was titled `reads every test file a Vitest report records, and
  refuses a text that is not a report`, matching exactly.

No reading differed from the brief. All items applied as written.

## Items applied

1. **F1.** Renamed `readVitestReport` to `parseVitestReport` at its declaration in `tests/setupServer.ts`,
   its `@example`, and every import and call site in `tests/setupServer.test.ts` and
   `tests/distribution.test.ts`. Replaced the TSDoc opening sentence with `Parses the test files a Vitest
   JSON report records.` and the `@remarks` text with the brief's replacement. Retitled the case to
   `parses every test file a Vitest report records, and refuses a text that is not a report`.

   Before (`tests/setupServer.ts`):
   ```
    * Reads the test files a Vitest JSON report records.
    * ...
    * @remarks
    * The whole report is refused rather than the malformed entry dropped, so a reader never reports a
    * partial file list as the run's. The reader narrows only the structure it walks; every verdict
    * field stays the reporter's value.
    *
    * @example
    * ```ts
    * readVitestReport('{"testResults":[]}') // []
    * ```
    */
   export function readVitestReport(text: string): readonly TestReportFile[] | undefined {
   ```
   After:
   ```
    * Parses the test files a Vitest JSON report records.
    * ...
    * @remarks
    * The whole report is refused rather than the malformed entry dropped, so a caller never receives
    * a partial file list as the run's. The parser narrows only the structure it walks; every verdict
    * field stays the reporter's value.
    *
    * @example
    * ```ts
    * parseVitestReport('{"testResults":[]}') // []
    * ```
    */
   export function parseVitestReport(text: string): readonly TestReportFile[] | undefined {
   ```
   Every `readVitestReport` call site in `tests/setupServer.test.ts` and `tests/distribution.test.ts`
   renamed to `parseVitestReport`, including the import statements.

2. **F2.** In the comment of `declares every emitted project factory with the override parameter` in
   `tests/src/core/templates.test.ts`, replaced `its own environment record` with `its own invocation
   record`, and replaced `so a value carrying the pair returns the base in the record's mode and carries
   none of its other fields.` with `so `mergeOverride`, given a value carrying the pair, returns the base
   in the record's mode and carries none of its other fields.` oxfmt rewrapped only the comment's lines.

   Before:
   ```
   // Vitest calls a project row with its own environment record, so a factory that
   // declares a parameter receives those fields in the override position. The
   // emitted `mergeOverride` is what makes the parameter safe: a `UserConfig` declares
   // `mode` but not `command`, and the record always carries both, so a value carrying
   // the pair returns the base in the record's mode and carries none of its other
   // fields. The vendored `tests/config.test.ts` drives every registered row through
   // that projection. ...
   ```
   After:
   ```
   // Vitest calls a project row with its own invocation record, so a factory that
   // declares a parameter receives those fields in the override position. The
   // emitted `mergeOverride` is what makes the parameter safe: a `UserConfig` declares
   // `mode` but not `command`, and the record always carries both, so `mergeOverride`,
   // given a value carrying the pair, returns the base in the record's mode and
   // carries none of its other fields. The vendored `tests/config.test.ts` drives
   // every registered row through that projection. ...
   ```

3. **F3.** In the `buildReleaseScenarios` TSDoc, replaced `Each rival rewrites the workspace for its own
   run, and the caller restores the generated text after it.` with the brief's replacement text.

   Before:
   ```
    * The rivals are a configuration Vite cannot load, a proof that fails to collect on another
    * import, a proof whose own assertion fails, and a run its timeout ends. Each rival rewrites the
    * workspace for its own run, and the caller restores the generated text after it.
    */
   ```
   After:
   ```
    * The rivals are a configuration Vite cannot load, a proof that fails to collect on another
    * import, a proof whose own assertion fails, and a run its timeout ends. Each rewriting rival
    * writes its `files` for its own run alone, and the caller restores the generated text after it;
    * the `timeout` rival runs the workspace as generated and differs only in its timeout.
    */
   ```

## Gate table

| Gate | Command | Exit | Log |
| --- | --- | --- | --- |
| format:check | `npm run format:check` | 0 | `tmp/units/rm-3-formatcheck.log.txt` |
| lint:check | `npm run lint:check` | 0 | `tmp/units/rm-3-lint.log.txt` |
| check | `npm run check` | 0 | `tmp/units/rm-3-check.log.txt` |
| vitest setup | `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts -t "the release-mode fixtures"` | 0 | `tmp/units/rm-3-vitest-setup.log.txt` |
| vitest templates | `npx vitest run --config vite.config.ts --no-cache --project src:core tests/src/core/templates.test.ts -t "override parameter"` | 1 (timeout, observation) | `tmp/units/rm-3-vitest-templates.log.txt`, retried alone in `tmp/units/rm-3-vitest-templates-retry.log.txt`, still red |
| build | `npm run build` | 0 | `tmp/units/rm-3-build.log.txt` |
| test:policy | `npm run test:policy` | 1 (timeout, observation) | `tmp/units/rm-3-testpolicy.log.txt` |
| test:distribution | `npm run test:distribution -- -t "fails the release run of a generated distribution proof"` | 0 | `tmp/units/rm-3-testdist.log.txt` |

## Observations

Both red gates fail on `Error: Test timed out in 5000ms`, not on an assertion. The templates case failed
the same way on an isolated retry with no other unit running. Both edits touched are comment-only or
TSDoc-only text with no runtime effect on the covered code, so the timeout is unrelated to the Items'
content. Per the brief's standing condition that other units run suites on this 4-CPU host, and per the
Deviation contract's instruction to report a timeout under load as an observation rather than diagnose
it, this report records the reading and does not investigate further. The Orchestrator's own re-run
after every unit exits is the authoritative reading for these two gates.

## Artifacts

- `tmp/units/rm-3.diff` — `git diff 392aa1e0`, 869 lines.
- `tmp/units/rm-3-status.txt` — `git status --short`, listing `guides/scaffold.md`, `host.json`,
  `src/core/compilers.ts`, `src/core/templates.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`,
  `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/src/core/compilers.test.ts`,
  `tests/src/core/templates.test.ts`, and `vite.config.ts` as modified. The files outside this round's
  scope (`guides/scaffold.md`, `src/core/compilers.ts`, `src/core/templates.ts`, `tests/config.test.ts`,
  `tests/src/core/compilers.test.ts`, `vite.config.ts`) are the standing round 1 and round 2 uncommitted
  state the brief names as staying as they are; this round did not touch them. `host.json` changed
  because `npm run build` regenerates it.
