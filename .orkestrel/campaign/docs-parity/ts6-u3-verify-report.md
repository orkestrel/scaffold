# Verify report — U3 declaration-rollup (scaffold)

## Gate report

1. `node node_modules/typescript/bin/tsc --version`
   - Exit 0
   - `Version 6.0.3`

2. `npm run format:check`
   - Exit 0
   - `All matched files use the correct format.`
   - `Finished in 8507ms on 222 files using 4 threads.`

3. `npm run lint:check`
   - Exit 0
   - No output beyond the command header.

4. `npm run check`
   - Exit 0
   - `tsc --noEmit --project tsconfig.json`, `check:src:core`, `check:src:server`, `check:src:bin` all completed with no diagnostics.

5. `npm run build`
   - Exit 0
   - `build:src:core`, `build:src:server`, `build:src:bin` built cleanly.
   - `build-host: staged 121 file(s) into dist/host`
   - `build-host: staged 121 file(s) into host.json` (regenerates `host.json`, as the brief notes is expected)

6. `npm test`
   - Exit 1
   - Failed at `test:src:core` (`vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core`); the chain stopped before `test:src:server`, `test:src:bin`, `test:policy`, `test:config`, `test:setup`, and `test:guides` ran.
   - Failing test: `tests/src/core/compilers.test.ts > blueprintToRootVite fixed proofs > keeps this repository byte-identical to every configuration it generates`, at `tests/src/core/compilers.test.ts:1197:39`.
   - This is not an Oxlint-language-server, `initialize`-deadline, or plain-timeout failure, so the brief's re-run condition does not apply; it is reported as it stands.
   - Failure excerpt:
     ```
     AssertionError: expected { …(8) } to strictly equal { …(8) }

     - Expected
     + Received

       "configs/src/vite.core.config.ts": "...
     -   dts({
     -     tsconfigPath: resolveWorkspacePath('configs/src/tsconfig.core.json'),
     -     bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } },
     +   declarationRollup({
     +     project: resolveWorkspacePath('configs/src/tsconfig.core.json'),
     +     types: ['node'],
         }),
     ...
       "configs/src/vite.server.config.ts": "...
     -   dts({ tsconfigPath: ..., bundleTypes: true, beforeWriteFile: (path, content) => (...) }),
     +   declarationRollup({ project: ..., rewrite: rewriteCoreSpecifier }),
     ...
     ```
   - Test Files: 1 failed | 8 passed (9). Tests: 1 failed | 389 passed (390).
   - Suspected owning files: `configs/src/vite.core.config.ts`, `configs/src/vite.server.config.ts` (checked-out working tree files, already `declarationRollup`-based) versus the expected blueprint fixture generated inside `tests/src/core/compilers.test.ts` (still emitting the old `vite-plugin-dts`/`dts(...)` shape). The generator this test compares against, `blueprintToRootVite`, has not been updated to emit the `declarationRollup` form the repository's own `configs/src/vite.core.config.ts` and `configs/src/vite.server.config.ts` now use.

7. `git status --short`
   - Exit 0
   ```
    M .orkestrel/campaign/ts6-api/ledger.md
    M configs/helpers.ts
    M configs/src/vite.core.config.ts
    M configs/src/vite.server.config.ts
    M host.json
    M tests/config.test.ts
   ?? .orkestrel/campaign/ts6-api/instruments/commit-u2.sh
   ?? .orkestrel/campaign/ts6-api/instruments/u7-integration.sh
   ?? .orkestrel/campaign/ts6-api/u3-audit-brief.md
   ?? .orkestrel/campaign/ts6-api/u3-declaration-rollup-report.md
   ?? .orkestrel/campaign/ts6-api/u3-declaration-rollup.diff.txt
   ?? .orkestrel/campaign/ts6-api/u3-declaration-rollup.status.txt
   ?? .orkestrel/campaign/ts6-api/u3-verify-brief.md
   ?? .orkestrel/campaign/ts6-api/u7-audit-brief.md
   ?? .orkestrel/campaign/ts6-api/u7-integration-brief.md
   ?? .orkestrel/campaign/ts6-api/u7-integration-report.md
   ?? .orkestrel/campaign/ts6-api/u7-probe-typestage-report.md
   ?? .orkestrel/campaign/ts6-api/u7-probe-typestage.diff.txt
   ?? .orkestrel/campaign/ts6-api/u7-probe-typestage.status.txt
   ?? .orkestrel/campaign/ts6-api/u7-verify-brief.md
   ```

## Overall verdict

RED. Gate 6, `npm test`, fails at `tests/src/core/compilers.test.ts:1197`.

## Anomalies

- None observed on gates 1-5 and 7. `npm run build` regenerated `host.json` as the brief notes is expected.

GATES: RED npm test
