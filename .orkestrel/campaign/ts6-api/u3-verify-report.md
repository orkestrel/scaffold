<!-- workflow wf_09893849-681, agent a4bf4ebf504c2acea, captured from journal.jsonl -->

# Verify report — U3 declaration-rollup (scaffold)

## Gate report

1. `node node_modules/typescript/bin/tsc --version` — PASS (exit 0). `Version 6.0.3`

2. `npm run format:check` — PASS (exit 0). `All matched files use the correct format.` / `Finished in 8507ms on 222 files using 4 threads.`

3. `npm run lint:check` — PASS (exit 0). No warnings.

4. `npm run check` — PASS (exit 0). `check:src:core`, `check:src:server`, `check:src:bin` all clean.

5. `npm run build` — PASS (exit 0). `build-host: staged 121 file(s) into dist/host`; `build-inventory: staged 121 file(s) into host.json` (regenerates `host.json`, as the brief notes is expected).

6. `npm test` — FAIL (exit 1). Stopped at `test:src:core`; `test:src:server`, `test:src:bin`, `test:policy`, `test:config`, `test:setup`, `test:guides` never ran.
   - Failing test: `tests/src/core/compilers.test.ts > blueprintToRootVite fixed proofs > keeps this repository byte-identical to every configuration it generates`, at `tests/src/core/compilers.test.ts:1197:39`.
   - This does not name the Oxlint language server, an `initialize` deadline, or a plain test timeout, so the brief's re-run condition does not apply; reported as it stands, no re-run performed.
   - Failure excerpt:
     ```
     AssertionError: expected { …(8) } to strictly equal { …(8) }
     - Expected
     + Received
       "configs/src/vite.core.config.ts": "...
     -   dts({ tsconfigPath: ..., bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } }),
     +   declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] }),
       "configs/src/vite.server.config.ts": "...
     -   dts({ tsconfigPath: ..., bundleTypes: true, beforeWriteFile: (path, content) => (...) }),
     +   declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.server.json'), rewrite: rewriteCoreSpecifier }),
     ```
   - Test Files: 1 failed | 8 passed (9). Tests: 1 failed | 389 passed (390).
   - Suspected owning files: `/home/user/scaffold/configs/src/vite.core.config.ts` and `/home/user/scaffold/configs/src/vite.server.config.ts` (the checked-out files already emit the `declarationRollup` form) versus the `blueprintToRootVite` generator exercised by `/home/user/scaffold/tests/src/core/compilers.test.ts`, which still emits the old `vite-plugin-dts`/`dts(...)` shape and has not been updated to match.

7. `git status --short` — PASS (exit 0). Working tree shows modified `.orkestrel/campaign/ts6-api/ledger.md`, `configs/helpers.ts`, `configs/src/vite.core.config.ts`, `configs/src/vite.server.config.ts`, `host.json`, `tests/config.test.ts`, plus several untracked `.orkestrel/campaign/ts6-api/` artifacts.

## Overall verdict

RED. Gate 6 (`npm test`) fails; first place to look is `/home/user/scaffold/tests/src/core/compilers.test.ts:1197` versus the `blueprintToRootVite` generator's emitted `configs/src/vite.core.config.ts` / `configs/src/vite.server.config.ts` templates.

## Anomalies

- None. Gates 1-5 and 7 passed cleanly; `npm run build` regenerating `host.json` matches the brief's stated expectation.

Report written to `/home/user/scaffold/tmp/units/ts6-u3-verify-report.md`.

GATES: RED npm test
