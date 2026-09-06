# Gate report — U6-fix (scaffold)

## 1. `npm run format:check`
Exit code: 0

```
Checking formatting...

All matched files use the correct format.
Finished in 9178ms on 222 files using 4 threads.
```

## 2. `npm run lint:check`
Exit code: 0

```
> @orkestrel/scaffold@0.0.63 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 3. Extended guard's control over `tests/setup.ts`

Command a: `sed -i "1i import type { Node } from 'typescript'" tests/setup.ts`
Output: none (silent success).

Command b: `npm run lint:check` (expected red)
Exit code: 1

```
> @orkestrel/scaffold@0.0.63 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .

tests/setup.ts:1:15: error eslint(no-unused-vars): Type 'Node' is imported but never used. help: Consider removing this import.
tests/setup.ts:1:1: error eslint(no-restricted-imports): 'typescript' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
```

The plant reddened `lint:check`, naming `tests/setup.ts` and the message "the in-process compiler API is not a surface the fleet uses".

Command c: `sed -i '1d' tests/setup.ts`
Output: none (silent success).

Command d: `git diff --stat -- tests/setup.ts` (expected empty)
Output: empty. Exit code: 0.

## 4. `npm run check`
Exit code: 0

```
> @orkestrel/scaffold@0.0.63 check
> tsc --noEmit --project tsconfig.json && npm run check:src

> @orkestrel/scaffold@0.0.63 check:src
> npm run check:src:core && npm run check:src:server && npm run check:src:bin

> @orkestrel/scaffold@0.0.63 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json

> @orkestrel/scaffold@0.0.63 check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json

> @orkestrel/scaffold@0.0.63 check:src:bin
> tsc --noEmit -p configs/src/tsconfig.bin.json
```

## 5. `npm run build`
Exit code: 0. The `build:inventory` step regenerated `host.json` as expected.

```
build-host: staged 121 file(s) into dist/host
build-inventory: staged 121 file(s) into host.json
```

## 6. `npm run test:src:core`
Exit code: 0

```
 Test Files  9 passed (9)
      Tests  385 passed (385)
   Start at  22:08:44
   Duration  19.06s (transform 2.27s, setup 2.18s, import 1.25s, tests 17.96s, environment 1ms)
```

## 7. `npm run test:policy`
Exit code: 0

```
 Test Files  1 passed (1)
      Tests  77 passed (77)
   Start at  22:09:09
   Duration  1.16s (transform 574ms, setup 553ms, import 111ms, tests 297ms, environment 0ms)
```

## 8. `npm run test:config`
Exit code: 0

```
 Test Files  1 passed (1)
      Tests  111 passed | 1 skipped (112)
   Start at  22:09:16
   Duration  5.72s (transform 694ms, setup 482ms, import 600ms, tests 4.46s, environment 0ms)
```

## 9. `npm run test:guides`
Exit code: 0

```
 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  22:09:27
   Duration  3.87s (transform 767ms, setup 528ms, import 700ms, tests 2.42s, environment 0ms)
```

## 10. `git status --short`

```
 M .oxlintrc.json
 M PROPOSAL.md
 M ROADMAP.md
 M guides/scaffold.md
 M host.json
 M package-lock.json
 M package.json
 M src/core/constants.ts
 M src/core/templates.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/bin/main.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/fixtures/setup-false-manifest.txt
 M tests/src/core/fixtures/source-manifest.txt
 M vite.config.ts
```

No trace of the plant on `tests/setup.ts` remains.

## Anomalies

None observed.

GATES: GREEN
