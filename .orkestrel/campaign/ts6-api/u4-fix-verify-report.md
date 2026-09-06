# Gate report — ts6-u4-fix

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
Finished in 11563ms on 222 files using 4 threads.
```

## 3. `npm run lint:check`
Exit 0. No output beyond the command echo (clean run).

## 4. `npm run check`
Exit 0. All four `tsc --noEmit` invocations (`tsconfig.json`, `configs/src/tsconfig.core.json`, `configs/src/tsconfig.server.json`, `configs/src/tsconfig.bin.json`) completed with no diagnostics printed.

## 5. `npm run build`
Exit 0.
```
dist/bin/main.js  82.83 kB │ gzip: 21.39 kB │ map: 151.05 kB

✓ built in 53ms

> @orkestrel/scaffold@0.0.63 build:host
> node -e "..."
build-host: staged 121 file(s) into dist/host

> @orkestrel/scaffold@0.0.63 build:inventory
> node -e "..."
build-inventory: staged 121 file(s) into host.json
```
The `build:inventory` write to `host.json` is expected.

## 6. `npm test`
Exit 0. All chained projects passed.
```
 Test Files  9 passed (9)
      Tests  385 passed (385)
...
 Test Files  5 passed (5)
...
 Test Files  3 passed (3)
      Tests  245 passed (245)
...
 Test Files  1 passed (1)
      Tests  77 passed (77)
...
 Test Files  1 passed (1)
      Tests  111 passed | 1 skipped (112)
...
 Test Files  2 passed (2)
      Tests  70 passed (70)
...
 Test Files  1 passed (1)
      Tests  17 passed (17)
   Duration  3.58s (transform 822ms, setup 501ms, import 997ms, tests 1.92s, environment 0ms)
```
The `tests/src/core/templates.test.ts` stderr lines about `failed to load config from .../malformed/vite.config.ts` and the `MIXED_EXPORTS` warning are expected output from the "refuses a non-object peer dependency declaration at config load" test case, not a failure.

## 7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
Exit 0.
```
 Test Files  1 passed (1)
      Tests  5 passed (5)
   Duration  63.21s (transform 710ms, setup 507ms, import 785ms, tests 61.74s, environment 0ms)
```

## 8. `bash .orkestrel/campaign/ts6-api/instruments/u4/regenerate.sh`
Every printed line:
```
generate exit=0
0 of 10 planned paths drifted from the plan. Audit compared bytes at 3, existence at 1, and nothing at 6.
1 written, 10 unchanged, 0 removed in /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/u4/regenerate/generated.
repair exit=0
cmp exit=0 (0 is byte-identical)
0
compiler names in the regenerated proof (expected 0)
```
Matches the expected reading: `repair exit=0`, `cmp exit=0`, and `0` compiler names.

## 9. `bash .orkestrel/campaign/ts6-api/instruments/u4/proof.sh`
Every printed line:
```
core: 925 lines, ownership=presence
browser: 1039 lines, ownership=presence
emit exit=0
baseline exit=0
 Test Files  1 passed (1)
      Tests  11 passed (11)
   Start at  17:13:00
   Duration  18.43s (transform 140ms, setup 0ms, import 3.82s, tests 14.45s, environment 0ms)

plant extra removed; /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/u4/stage/dist/src/core/index.js restored
extra: 3 lines name the plant; vitest exit=1
plant undeclared removed; /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/u4/stage/dist/src/core/index.d.ts restored
undeclared: 3 lines name the plant; vitest exit=1
```
Matches the expected reading: `baseline exit=0` with every test passed (11 of 11), and each plant (`extra`, `undeclared`) reporting lines naming it with `vitest exit=1`.

First `TS2741` line of `<scratchpad>/u4/logs/extra.log.txt`:
```
+   "node16: surface.node16-.ts(4,7): error TS2741: Property 'PLANTED_EXTRA' is missing in type 'Record<\"applyOverrides\" | \"artifactsToQuestions\" | \"artifactToFinding\" | \"artifactToHex\" | \"blueprintToConfigArtifacts\" | \"blueprintToDevDependencies\" | \"blueprintToDocumentArtifacts\" | ... 144 more ... | \"WORKSPACE_OWNED_PATHS\", true>' but required in type 'Record<\"applyOverrides\" | \"artifactsToQuestions\" | \"artifactToFinding\" | \"artifactToHex\" | \"blueprintToConfigArtifacts\" | \"blueprintToDevDependencies\" | \"blueprintToDocumentArtifacts\" | ... 145 more ... | \"PLANTED_EXTRA\", true>'.",
```

First `TS2741` line of `<scratchpad>/u4/logs/undeclared.log.txt`:
```
+   "node16: surface.node16-.ts(3,7): error TS2741: Property 'PLANTED_DECLARED' is missing in type '{ readonly APP_BROWSER_DEV_DEPENDENCIES: true; readonly APP_DEV_DEPENDENCIES: true; readonly APP_MATRIX: true; readonly APP_SERVER_DEV_DEPENDENCIES: true; readonly ARTIFACT_TEMPLATES: true; ... 146 more ...; readonly srcToRoot: true; }' but required in type 'Record<\"applyOverrides\" | \"artifactsToQuestions\" | \"artifactToFinding\" | \"artifactToHex\" | \"blueprintToConfigArtifacts\" | \"blueprintToDevDependencies\" | \"blueprintToDocumentArtifacts\" | ... 145 more ... | \"PLANTED_DECLARED\", true>'.",
```

## 10. `git status --short`
```
 M src/core/templates.ts
 M tests/distribution.test.ts
 M tests/src/core/templates.test.ts
```

## Anomalies
None observed. No gate required a re-run.

GATES: GREEN
