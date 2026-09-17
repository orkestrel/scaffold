# Gate report — scaffold checkout

## 1. `npm run format:check`
Exit code: 0 (PASS)

```
Checking formatting...

All matched files use the correct format.
Finished in 3981ms on 224 files using 16 threads.
```

## 2. `npm run lint:check`
Exit code: 0 (PASS)

```
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```
No warnings or errors reported.

## 3. `npm run check`
Exit code: 0 (PASS)

Ran `tsc --noEmit` across the root project, then `check:src:core`, `check:src:server`, and
`check:src:bin`. No diagnostics printed by any of the four `tsc` invocations.

## 4. `npm run build`
Exit code: 0 (PASS)

```
dist/src/core/index.js    267.30 kB │ gzip: 72.15 kB
dist/src/core/index.cjs   275.64 kB │ gzip: 72.90 kB
dist/src/server/index.js  183.66 kB │ gzip: 47.93 kB
dist/src/server/index.cjs 193.11 kB │ gzip: 48.45 kB
dist/bin/main.js           87.29 kB │ gzip: 22.65 kB
build-host: staged 172 file(s) into dist/host
build-inventory: staged 172 file(s) into host.json
```

Expected, non-failing stderr: two `*** The target project appears to use TypeScript 6.0.3 which
is newer than the bundled compiler engine` lines from API Extractor, once for `core` and once for
`server`. Informational, not an error.

## 5. `npm test`
Exit code: 0 (PASS)

Per-project counts:

| Project     | Test files | Tests                    |
| ----------- | ---------- | ------------------------- |
| src:core    | 9 passed   | 422 passed                |
| src:server  | 5 passed   | 466 passed, 7 skipped (473) |
| src:bin     | 3 passed   | 257 passed                |
| policy      | 1 passed   | 102 passed                |
| config      | 1 passed   | 172 passed, 1 skipped (173) |
| setup       | 3 passed   | 118 passed, 3 skipped (121) |
| guides      | 1 passed   | 23 passed                 |

Expected, non-failing stderr during `src:core`: a `[MIXED_EXPORTS]` warning and a `failed to load
config from .../tmp/scaffold-e2-peers-tsbBTZ/malformed/vite.config.ts` line, both emitted by the
test `tests/src/core/templates.test.ts > emitted workspaces under their own gates > refuses a
non-object peer dependency declaration at config load`, which deliberately feeds a malformed
config and asserts the refusal. This is the test's intended fixture behavior, not a failure.

Expected, non-failing stdout during `config`: two `Analysis will use the bundled TypeScript
version 5.9.3 ... consider upgrading API Extractor` notices from `tests/config.test.ts > ... rolls
one face into a single declaration and rewrites its core specifier`, matching the same
informational notice seen in the build.

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

This matches the described uncommitted configuration-generator change and its tests plus the
untracked `.orkestrel/scaffold/` campaign folder. `host.json` does not appear in this list.

## 7. `git diff --stat host.json`

Empty output. `npm run build` regenerated `host.json` with no material difference from the
committed baseline; no vendored byte moved.

## Overall verdict

GREEN. Every gate passed on its true exit code, and the vendored `host.json` inventory is
unchanged after the build.

## Anomalies

- None observed. The two informational API Extractor notices and the one test fixture's
  deliberate `[MIXED_EXPORTS]`/config-load-failure stderr are expected output, not gate noise.
