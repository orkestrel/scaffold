# Gate report — scaffold checkout, 2026-09-16

## 1. `npm run format:check`
Exit code: 0 (PASS)

```
Checking formatting...

All matched files use the correct format.
Finished in 3974ms on 224 files using 16 threads.
```

## 2. `npm run lint:check`
Exit code: 0 (PASS)

```
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```
(no warnings or errors reported)

## 3. `npm run check`
Exit code: 0 (PASS)

Ran `tsc --noEmit --project tsconfig.json` followed by `check:src:core`, `check:src:server`,
and `check:src:bin`. No diagnostics reported by any project.

## 4. `npm run build`
Exit code: 0 (PASS)

```
dist/src/core/index.js    267.24 kB
dist/src/server/index.js  183.66 kB
dist/bin/main.js           87.29 kB
build-host: staged 172 file(s) into dist/host
build-inventory: staged 172 file(s) into host.json
```

Note: API Extractor logs `*** The target project appears to use TypeScript 6.0.3 which is
newer than the bundled compiler engine` for both `src:core` and `src:server`. This is an
informational notice, not a build failure — exit code stayed 0.

## 5. `npm test`
Exit code: 0 (PASS)

Per-project test counts:

| Project      | Test files | Tests                        |
| ------------ | ---------- | ----------------------------- |
| src:core     | 9 passed   | 420 passed                    |
| src:server   | 5 passed   | 466 passed, 7 skipped (473)   |
| src:bin      | 3 passed   | 257 passed                    |
| policy       | 1 passed   | 102 passed                    |
| config       | 1 passed   | 172 passed, 1 skipped (173)   |
| setup        | 3 passed   | 118 passed, 3 skipped (121)   |
| guides       | 1 passed   | 23 passed                     |

`tests/src/core/templates.test.ts > emitted workspaces under their own gates > refuses a
non-object peer dependency declaration at config load` intentionally triggers a Vite config
load failure to `stderr` (`failed to load config from
tmp\scaffold-e2-peers-T23EQr\malformed\vite.config.ts`) as part of asserting a refusal path.
The test itself passed; this is expected stderr noise from the case under test, not a failure.

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

## 7. `git diff --stat host.json`

```
(empty — no output)
```

`host.json` shows no diff after `npm run build` regenerated it, confirming the build did not
move any vendored byte.

## Overall verdict

GREEN. Every gate passed by exit code: format:check, lint:check, check, build, and test all
exited 0. The vendored-file inventory (`host.json`) is unchanged after the build regenerated it.

## Anomalies

- None. The template-refusal test's `stderr` output and the API Extractor
  TypeScript-version notice are both expected, non-failing output from the commands as
  designed.
