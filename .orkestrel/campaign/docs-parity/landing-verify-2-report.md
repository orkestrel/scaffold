Lane held: verifier

# Gate report — joint landing of D4, D5, D6, D6b (scaffold)

## 1. `npm run docs; echo EXIT $?`
Exit 0.
```
rows read: 1, disagreements found: 0
EXIT 0
```

## 2. `grep -n "findDrift\|tagline\|locateComment" node_modules/@orkestrel/guide/dist/src/core/index.d.ts | head -3`
Non-empty (GREEN per brief step 2 standing condition):
```
154: * and {@link locateComment} matches a caller's key against the whole map. A change to the head
826: * so {@link findDrift} reports the absence.
915: * table without it leaves every row's summary absent, which {@link findDrift} reports.
```

## 3. `npm run format:check`
Exit 0.
```
All matched files use the correct format.
Finished in 9403ms on 223 files using 4 threads.
```

## 4. `npm run lint:check`
Exit 0 (no output).

## 5. `npm run check`
Exit 0. `tsc --noEmit` for root, core, server, bin projects all completed with no diagnostics.

## 6. `npm run build`
Exit 0. `build:src:core`, `build:src:server`, `build:src:bin` all built successfully; `build:host` staged 122 files into `dist/host`; `build:inventory` staged 122 files into `host.json`.

## 7. `sha256sum host.json && npm run build:inventory && sha256sum host.json`
Same digest before and after:
```
d05eed514c5b9e95870ae4a3954fb66cfa51d1ab47f9b23de050eb2eb3461228  host.json
build-inventory: staged 122 file(s) into host.json
d05eed514c5b9e95870ae4a3954fb66cfa51d1ab47f9b23de050eb2eb3461228  host.json
```

## 8. `PATH=/opt/npm11/bin:$PATH npm --version` then `npm test`
`npm --version` reported `11.19.1`.

`npm test` exit 0. Per-project totals and durations:

- `test:src:core`: 9 test files passed, 402 tests passed, duration 20.07s
- `test:src:server`: 5 test files passed, 432 tests passed, duration 3.45s
- `test:src:bin`: 3 test files passed, 245 tests passed, duration 18.92s
- `test:policy`: 1 test file passed, 91 tests passed, duration 1.81s
- `test:config`: 1 test file passed, 172 tests passed and 1 skipped (173 total), duration 6.42s
- `test:setup`: 2 test files passed, 74 tests passed, duration 1.89s
- `test:guides`: 1 test file passed, 20 tests passed, duration 7.52s

## 9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
Exit 1: 1 test file failed, 1 test failed, 4 tests passed (5 total), duration 38.47s.

Per-case reading: the distribution project ran 5 cases. Four passed. The one failing case is
`installed package consumer > installs the packed scaffold and passes one generated core/server
workspace through prepublish [requires a reachable npm registry]`, failing at
`tests/distribution.test.ts:938` on `expect(gates.status).toBe(0)` (received 2, expected 0). This
is exactly the packed-install case the brief names as red by dependency order until
`@orkestrel/guide` publishes the readers and scaffold re-pins. No other case failed. Per the
brief's standing condition, this reading counts as GREEN for this brief's purpose.

## 10. `node dist/bin/main.js audit --groups configs --offline; echo EXIT $?`
Exit 0.
```
0 of 17 planned paths drifted from the plan. Audit compared bytes at 16, existence at 1, and nothing at 0.
EXIT 0
```

## 11. `git status --short`
```
 M .claude/rules/documentation.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M README.md
 M guides/scaffold.md
 M host.json
 M package.json
 M src/core/Compiler.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/templates.ts
 M src/core/types.ts
 M src/server/Materializer.ts
 M src/server/Upstream.ts
 M src/server/helpers.ts
 M tests/distribution.test.ts
 M tests/guides.test.ts
 M tests/setupServer.ts
 M tests/src/core/Compiler.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/templates.test.ts
 M tests/src/server/helpers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```
This is the expected dirty pre-commit working tree for the joint landing (D4, D5, D6, D6b) and no tracked file was reverted or discarded during this run.

## Anomalies

- None. `test:src:core` printed two expected stderr lines from a deliberate malformed-config test case (`refuses a non-object peer dependency declaration at config load`); these are the test's own asserted stderr output, not a failure signal.

GATES: GREEN
