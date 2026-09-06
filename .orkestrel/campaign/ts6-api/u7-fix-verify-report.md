# Gate report — U7-fix (probe), the whole U7 change

## 1. `node node_modules/typescript/bin/tsc --version`

Exit code: 0

```
Version 6.0.3
```

## 2. `npm run format:check`

Exit code: 0

```
Checking formatting...

All matched files use the correct format.
Finished in 2700ms on 70 files using 4 threads.
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

> @orkestrel/probe@0.0.12 check:src
> npm run check:src:core && npm run check:src:server && npm run check:src:bin

> @orkestrel/probe@0.0.12 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json

> @orkestrel/probe@0.0.12 check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json

> @orkestrel/probe@0.0.12 check:src:bin
> tsc --noEmit -p configs/src/tsconfig.bin.json
```

## 5. `npm run build`

Exit code: 0

```
✓ built in 1.92s
...
dist/src/server/index.js  112.88 kB │ gzip: 30.77 kB │ map: 223.42 kB
...
dist/src/server/index.cjs  117.41 kB │ gzip: 31.02 kB │ map: 227.01 kB
✓ built in 3.56s
...
dist/bin/main.js  0.41 kB │ gzip: 0.28 kB │ map: 0.63 kB
✓ built in 22ms
```

## 6. `npm test`

Exit code: 1

```
FAIL  |src:server| tests/src/server/Probe.test.ts > probe > expires only the active inspection, cleans its revision, and serves a queued claim
AssertionError: expected [ [ { …(3) } ], [ { …(3) } ] ] to strictly equal [ [ { …(3) } ] ]

- Expected
+ Received

@@ -2,10 +2,43 @@
   [
     {
       "case": {
         "files": [],
         "test": {
+           "path": "tmp/probe/arm-type.probe-26286-b20b0bea-60b0-447c-aa23-861f96390850.test.ts",
+           "text": "import type { Signal } from './arm-type.probe-26286-b20b0bea-60b0-447c-aa23-861f96390850.js'
+ import { expect, test } from 'vitest'
+ const SIGNAL: Signal = 'before'
+ test('revalidates a mutated type', () => {
+ 	expect(SIGNAL).toBe('before')
+ })
+ ",
+         },
+       },
+       "control": {
+         "files": [],
+         "reason": "the imported type changed on disk between the two inspections",
+         "stage": "type",
...
 ❯ tests/src/server/Probe.test.ts:696:31
    694|      }),
    695|     })
    696|     expect(expirations.calls).toStrictEqual([[hanging]])
       |                               ^

 Test Files  1 failed | 11 passed (12)
      Tests  1 failed | 243 passed (244)
   Start at  11:42:57
   Duration  512.45s (transform 1.92s, setup 799ms, import 3.13s, tests 1090.26s, environment 1ms)
```

This failure does not name the Oxlint language server, an `initialize` deadline, a `deadline` code,
or a plain test timeout, so it is reported as it stands per the brief and was not re-run. A stray
`failed to load config from /tmp/orkestrel-test-4fMRZG/vite.config.ts` line appeared on stderr during
`RuntimeStage.test.ts > runtime stage > recycles the resident runner after 64 written specifications,
evicts disk caches, and strips the replacement warm's termination listeners`, which passed (its row
shows no failure).

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
