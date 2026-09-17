# Gate Report — scaffold checkout

## 1. `npm run format:check`
Exit code: 0 (PASS)
```
All matched files use the correct format.
Finished in 3847ms on 224 files using 16 threads.
```

## 2. `npm run lint:check`
Exit code: 0 (PASS)
```
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```
No warnings or errors reported.

## 3. `npm run check`
Exit code: 0 (PASS)
Ran `tsc --noEmit` against the root project plus `check:src:core`, `check:src:server`, and `check:src:bin`. No diagnostics emitted.

## 4. `npm run build`
Exit code: 0 (PASS)
```
dist/src/core/index.js    266.75 kB
dist/src/server/index.js  183.66 kB
dist/bin/main.js           87.29 kB
build-host: staged 172 file(s) into dist/host
build-inventory: staged 172 file(s) into host.json
```
Anomaly (non-failing): API Extractor prints `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` for core and server builds. Informational only, exit code unaffected.

## 5. `npm test`
Exit code: 0 (PASS)

Per-project counts:
- `src:core`: 9 files passed, 419 tests passed
- `src:server`: 5 files passed, 466 passed | 7 skipped (473)
- `src:bin`: 3 files passed, 257 tests passed
- `policy`: 1 file passed, 102 tests passed
- `config`: 1 file passed, 172 passed | 1 skipped (173)
- `setup`: 3 files passed, 118 passed | 3 skipped (121)
- `guides`: 1 file passed, 23 tests passed

Anomaly (non-failing): one `src:core` test intentionally exercises a malformed `vite.config.ts` fixture and Vite logs a `[MIXED_EXPORTS]` warning plus a `failed to load config` stderr line as expected negative-path output; the test still passed.

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

Anomaly: this differs from the working-tree snapshot recorded at session start (`src/bin/errors.ts`, `src/bin/helpers.ts`, `src/core/compilers.ts`, `src/core/errors.ts`, `src/server/Upstream.ts`, `src/server/WriteTransaction.ts`, `src/server/helpers.ts`, `tests/distribution.test.ts`). The tree changed under this checkout between session start and this verification run — consistent with the dispatch note that the tree carries an uncommitted change to the configuration generator and its tests, but the exact file set moved. No files were reverted or cleaned by this run.

## 7. `git diff --stat host.json`
```
(empty)
```
No diff. `host.json`, the committed vendored-file inventory, did not move during `npm run build`.

## Overall verdict
GREEN. Every gate passed by exit code: `format:check`, `lint:check`, `check`, `build`, and `test` all returned 0, and `host.json` shows no drift after `build` regenerated it.

## Anomalies
- API Extractor's TypeScript-version-mismatch notice appears twice during `build` (core, server); informational, not a failure.
- One `src:core` test deliberately triggers a Vite `[MIXED_EXPORTS]` warning and a `failed to load config` stderr line as its expected negative-path assertion; the test passed.
- `git status --short` at verification time differs from the session-start snapshot in exactly which files are modified, though both snapshots show a dirty tree touching the configuration generator and its tests. This run made no destructive or cleaning git calls.

GATES: GREEN
