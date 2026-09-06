# Gate report — U6 scaffold-seeds (scaffold), after the Orchestrator's install

Run from `/home/user/scaffold`.

## 1. `node node_modules/typescript/bin/tsc --version`
Exit 0.
```
Version 6.0.3
```

## 2. `npm run format:check`
Exit 0.
```
Checking formatting...
All matched files use the correct format.
Finished in 9311ms on 222 files using 4 threads.
```

## 3. `npm run lint:check`
Exit 0.
```
> @orkestrel/scaffold@0.0.63 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no findings)

## 4. Restricted-import control over `src/core/helpers.ts`

**Plant:** `sed -i "1i import ts from 'typescript'" src/core/helpers.ts`
```
     1	import ts from 'typescript'
     2	import type {
     3		Artifact,
```

**`npm run lint:check` with plant applied:** exit 1 (red, as expected).
```
> @orkestrel/scaffold@0.0.63 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .

src/core/helpers.ts:1:8: error eslint(no-unused-vars): Identifier 'ts' is imported but never used. help: Consider removing this import.
src/core/helpers.ts:1:1: error eslint(no-restricted-imports): 'typescript' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
```
The plant reddened `lint:check`, naming `src/core/helpers.ts` and the restricted-import message. The control passed.

**Removal:** `sed -i '1d' src/core/helpers.ts` — exit 0.

**`git diff --stat -- src/core/helpers.ts` after removal:** empty (exit 0), confirming the plant left no residue.

## 5. `npm run check`
Exit 0.
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

## 6. `npm run build`
Exit 0. Its `build:inventory` step regenerated `host.json` as expected:
```
dist/src/core/index.cjs  266.86 kB │ gzip: 70.68 kB │ map: 351.11 kB
...
dist/src/server/index.cjs  183.64 kB │ gzip: 45.64 kB │ map: 287.43 kB
...
dist/bin/main.js  82.83 kB │ gzip: 21.39 kB │ map: 151.05 kB

> @orkestrel/scaffold@0.0.63 build:host
build-host: staged 121 file(s) into dist/host

> @orkestrel/scaffold@0.0.63 build:inventory
build-inventory: staged 121 file(s) into host.json
```

## 7. `npm test`
Exit 1.
```
 FAIL  |src:core| tests/src/core/templates.test.ts > emitted workspaces under their own gates > emits browser configurations their own typecheck accepts
 FAIL  |src:core| tests/src/core/templates.test.ts > emitted browser resolver > publishes every name the emitted root configuration is built on
 FAIL  |src:core| tests/src/core/templates.test.ts > emitted browser resolver > ranks an operator override above every browser it could discover
 FAIL  |src:core| tests/src/core/templates.test.ts > emitted browser resolver > reads a pinned-revision miss as a fallthrough rather than as absence
 FAIL  |src:core| tests/src/core/templates.test.ts > emitted browser resolver > keeps Playwright launch defaults when the pinned revision is installed

Error: Cannot find package '/home/user/scaffold/node_modules/playwright/index.js' imported from .../browsers.ts
    at legacyMainResolve (node:internal/modules/esm/resolve:205:26)
    ...
    code: 'ERR_MODULE_NOT_FOUND'

 Test Files  1 failed | 8 passed (9)
      Tests  5 failed | 380 passed (385)
   Start at  21:46:57
   Duration  8.02s (transform 2.74s, setup 2.50s, import 1.60s, tests 6.76s, environment 1ms)
```
Owning file: `tests/src/core/templates.test.ts` (driving `browsers.ts` emitted into a temp directory, which cannot resolve `playwright` from `/home/user/scaffold/node_modules`). This failure names `ERR_MODULE_NOT_FOUND` for the `playwright` package, not the Oxlint language server, an `initialize` deadline, or a plain test timeout, so it is reported as it stands with no re-run per the brief.

## 8. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
Exit 0.
```
> @orkestrel/scaffold@0.0.63 test:distribution
> vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution

 Test Files  1 passed (1)
      Tests  5 passed (5)
   Start at  21:47:18
   Duration  71.96s (transform 754ms, setup 594ms, import 851ms, tests 70.32s, environment 0ms)
```

## 9. `grep -rn "vite-plugin-dts" src tests configs guides package.json ROADMAP.md PROPOSAL.md`
Exit 1 (grep convention for no matches). No line printed — the expected reading.

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
`host.json` shows modified from the `build:inventory` regeneration in step 6, as the brief expects. `src/core/helpers.ts` shows no diff, confirming step 4's plant left no residue. No other file changed.

GATES: RED npm test
