# Verify report — U7-fix-e (probe), the whole U7 change after every fix

## 1. `node node_modules/typescript/bin/tsc --version`

Exit code: 0

```
Version 6.0.3
```

## 2. `npm run format:check`

Exit code: 0

```
> @orkestrel/probe@0.0.12 format:check
> oxfmt --config .oxfmtrc.json --check .

Checking formatting...

All matched files use the correct format.
Finished in 3328ms on 70 files using 4 threads.
```

## 3. `npm run lint:check`

Exit code: 0

```
> @orkestrel/probe@0.0.12 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no findings)

## 4. `npm run check`

Exit code: 0

```
> @orkestrel/probe@0.0.12 check
> tsc --noEmit --project tsconfig.json && npm run check:src
...
> @orkestrel/probe@0.0.12 check:src:bin
> tsc --noEmit -p configs/src/tsconfig.bin.json
```
(no diagnostics)

## 5. `npm run build`

Exit code: 0

```
> @orkestrel/probe@0.0.12 build
> npm run clean && npm run build:src

> @orkestrel/probe@0.0.12 build:src:core
> vite build --config configs/src/vite.core.config.ts && npm run copy dist/src/core/index.d.ts dist/src/core/index.d.cts

vite v8.2.2 building client environment for production...
transforming...
✓ 8 modules transformed.
rendering chunks...

[unplugin:dts] Start generate declaration files...
[unplugin:dts] Start bundling declaration files...
```
Build completed with exit code 0 (core, server, bin stages all ran to completion).

## 6. `npm test`

Exit code: 1

```
 FAIL  |src:server| tests/src/server/Probe.test.ts > probe > mints receipts only when every stage executes cleanly, including for a control that shares no path with its case, and returns admitted path issues
Error: Test timed out in 60000ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".
 ❯ tests/src/server/Probe.test.ts:88:2

 FAIL  |src:server| tests/src/server/Probe.test.ts > probe > replaces a lint stage its deadline destroyed
ProbeError: The probe could not arm: The type stage exceeded 6000 ms
 ❯ Probe.#arm src/server/Probe.ts:224:20
Caused by: ProbeError: The type stage exceeded 6000 ms
 ❯ AbortSignal.timeout.signal.addEventListener.once src/server/Probe.ts:590:20
 ❯ Timeout._onTimeout node_modules/@orkestrel/timeout/dist/src/core/index.js:207:21
Serialized Error: { origin: 'claimant', code: 'deadline', context: { stage: 'type', deadline: 6000 } }

 Test Files  1 failed | 11 passed (12)
      Tests  2 failed | 246 passed (248)
   Start at  16:59:30
   Duration  628.21s (transform 2.03s, setup 1.14s, import 3.49s, tests 1355.14s, environment 1ms)
```

Both failing cases carry a `deadline` code / plain test timeout, per the brief's carve-out: reported as they stand, not re-run.

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

GATES: RED npm test
