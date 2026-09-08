# Gate report — U2-fix-3 (scaffold)

1. `node node_modules/typescript/bin/tsc --version` — PASS (exit 0). Output: `Version 6.0.3`

2. `npm run format:check` — PASS (exit 0). Last lines:
```
All matched files use the correct format.
Finished in 13954ms on 222 files using 4 threads.
```

3. `npm run lint:check` — PASS (exit 0). Last lines:
```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no diagnostics reported)

4. `npm run check` — PASS (exit 0). Last lines:
```
> @orkestrel/scaffold@0.0.63 check:src:bin
> tsc --noEmit -p configs/src/tsconfig.bin.json
```
(all four tsc invocations — root, core, server, bin — completed with no output)

5. `npm run build` — PASS (exit 0). Last lines:
```
> @orkestrel/scaffold@0.0.63 build:host
build-host: staged 121 file(s) into dist/host

> @orkestrel/scaffold@0.0.63 build:inventory
build-inventory: staged 121 file(s) into host.json
```
The `build:inventory` step regenerated `host.json` as expected.

6. `npm test` — PASS (exit 0). Summary blocks:
```
Test Files  3 passed (3)
     Tests  245 passed (245)
   Duration  14.62s
```
```
> test:policy
Test Files  1 passed (1)
     Tests  77 passed (77)
```
```
> test:config
Test Files  1 passed (1)
     Tests  108 passed (108)
```
```
> test:setup
Test Files  2 passed (2)
     Tests  70 passed (70)
```
```
> test:guides
Test Files  1 passed (1)
     Tests  17 passed (17)
```
No red rows; no re-run needed.

7. `git status --short` — reported for context (not a gate). Modified: `.claude/rules/architecture.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`, `.orkestrel/campaign/ts6-api/ledger.md`, `.oxlintrc.json`, `configs/policy.ts`, `guides/scaffold.md`, `host.json`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`. Untracked: campaign artifacts under `.orkestrel/campaign/ts6-api/`.

GATES: GREEN
