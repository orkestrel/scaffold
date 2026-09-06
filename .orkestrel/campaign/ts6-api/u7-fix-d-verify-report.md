# Verify report — U7-fix-d (probe), the whole U7 change after every fix

## 1. `node node_modules/typescript/bin/tsc --version`

Exit code: 0

```
Version 6.0.3
```

## 2. `npm run format:check`

Exit code: 1

```
> @orkestrel/probe@0.0.12 format:check
> oxfmt --config .oxfmtrc.json --check .

Checking formatting...

guides/probe.md (1087ms)

Format issues found in above 1 files. Run without `--check` to fix.
Finished in 4010ms on 70 files using 4 threads.
```

## 3. `npm run lint:check`

Exit code: 0

```
> @orkestrel/probe@0.0.12 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 4. `npm run check`

Exit code: 0

```
> @orkestrel/probe@0.0.12 check
> tsc --noEmit --project tsconfig.json && npm run check:src
...
> @orkestrel/probe@0.0.12 check:src:bin
> tsc --noEmit -p configs/src/tsconfig.bin.json
```

## 5. `npm run build`

Exit code: 0

```
✓ built in 24ms
```
(`build:src:core`, `build:src:server`, `build:src:bin` all completed; declaration bundling for core and server succeeded with the API Extractor TypeScript-6.0.3-newer-than-bundled-5.9.3 notice, not an error.)

## 6. `npm test`

Exit code: 1

```
 FAIL  |src:server| tests/src/server/Probe.test.ts > probe > serializes project resolution against a live type inspection
ProbeError: No inputs were found in config file 'projects/tsconfig.b.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '[]'.
 ❯ TypeStage.#fault src/server/stages/TypeStage.ts:551:10
 ❯ TypeStage.#configure src/server/stages/TypeStage.ts:420:40
 ❯ TypeStage.#resolve src/server/stages/TypeStage.ts:215:18
 ❯ guardStage src/server/helpers.ts:840:10
 ❯ Probe.#bound src/server/Probe.ts:487:11
 ❯ Probe.#resolve src/server/Probe.ts:557:12
 ❯ Probe.prove src/server/Probe.ts:147:20

 Test Files  1 failed | 11 passed (12)
      Tests  1 failed | 247 passed (248)
   Start at  16:39:09
   Duration  566.12s (transform 2.52s, setup 923ms, import 4.25s, tests 1238.96s, environment 1ms)
```

This row does not name the Oxlint language server, an `initialize` deadline, a `deadline` code, or a plain test timeout, so `test:policy`, `test:config`, `test:setup`, and `test:guides` never ran (`npm test` chains with `&&` and stopped at `test:src`). Not re-run.

A separate stderr line appeared during the passing run and did not fail a test: `tests/src/server/stages/RuntimeStage.test.ts > runtime stage > recycles the resident runner after 64 written specifications, evicts disk caches, and strips the replacement warm's termination listeners` logged `failed to load config from /tmp/orkestrel-test-FyHkPU/vite.config.ts` to stderr; the test itself passed.

## 7. `git status --short`

Exit code: 0

```
 M guides/probe.md
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/server/Overlay.ts
 M src/server/Probe.ts
 M src/server/helpers.ts
 M src/server/index.ts
 A src/server/parsers.ts
 M src/server/stages/RuntimeStage.ts
 M src/server/stages/TypeStage.ts
 M src/server/types.ts
 M tests/src/core/errors.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/validators.test.ts
 M tests/src/server/Overlay.test.ts
 M tests/src/server/Probe.test.ts
 M tests/src/server/ProbeServer.test.ts
 M tests/src/server/helpers.test.ts
 A tests/src/server/parsers.test.ts
 M tests/src/server/stages/TypeStage.test.ts
```

GATES: RED npm run format:check
