# Gate report — scaffold acceptance run (2026-09-16)

## 1. `npm run format:check`
Exit code: 0 (PASS)
```
Checking formatting...

All matched files use the correct format.
Finished in 3872ms on 224 files using 16 threads.
```

## 2. `npm run lint:check`
Exit code: 0 (PASS)
```
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```
No warnings or errors emitted.

## 3. `npm run check`
Exit code: 0 (PASS)
Runs `tsc --noEmit --project tsconfig.json` then `check:src:core`, `check:src:server`, `check:src:bin`. All four `tsc` invocations completed with no diagnostics printed.

## 4. `npm run build`
Exit code: 0 (PASS)
Builds `src:core`, `src:server`, `src:bin`, then stages the host inventory and rebuilds `host.json`.
```
build-host: staged 172 file(s) into dist/host
build-inventory: staged 172 file(s) into host.json
```
API Extractor printed its standing advisory (expected, not a failure):
```
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
```

## 5. `npm test`
Exit code: 0 (PASS)

Per-project counts:
- `src:core`: 9 test files passed, 422 tests passed
- `src:server`: 5 test files passed, 466 tests passed, 7 skipped (473 total)
- `src:bin`: 3 test files passed, 257 tests passed
- `policy`: 1 test file passed, 102 tests passed
- `config`: 1 test file passed, 172 tests passed, 1 skipped (173 total)
- `setup`: 3 test files passed, 118 tests passed, 3 skipped (121 total)
- `guides`: 1 test file passed, 23 tests passed

Expected (non-failing) stderr during `src:core`:
```
[MIXED_EXPORTS] Entry module "tmp/scaffold-e2-peers-V2kyGu/malformed/vite.config.ts" is using named ... and default exports together.
failed to load config from C:\Users\mikes\WebstormProjects\scaffold\tmp\scaffold-e2-peers-V2kyGu\malformed\vite.config.ts
```
This is the deliberately malformed fixture in `tests/src/core/templates.test.ts` ("refuses a non-object peer dependency declaration at config load"); the failure is the assertion under test, not a suite failure.

API Extractor's TypeScript-version advisory reappears in `config` project output (same expected advisory as in step 4).

## 6. `git status --short`
```
 M configs/src/vite.bin.config.ts
 M configs/src/vite.core.config.ts
 M configs/src/vite.server.config.ts
 M src/core/compilers.ts
 M src/core/templates.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/templates.test.ts
 M vite.config.ts
?? .orkestrel/scaffold/
```
Expected: the working tree carries the uncommitted configuration-generator change and its tests, as stated in the dispatch. Not cleaned.

## 7. `git diff --stat host.json`
No output — `host.json` carries no diff. The `npm run build` regeneration produced a byte-identical vendored-file inventory; no vendored byte moved.

## 8. `git diff --check`
No output — no whitespace errors in the diff.

## Overall verdict
GREEN. Every gate passed by exit code, `host.json` is unchanged by the rebuild, and the diff carries no whitespace damage.

## Anomalies
- None. The two stderr items noted under `npm test` and `npm run build` are expected, deliberate output, called out above rather than left ambiguous.

GATES: GREEN
