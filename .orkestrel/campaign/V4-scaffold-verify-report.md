<!-- V4 — verifier (Sonnet, native), the authoritative gates for the D4 chain after the AD4 fix rounds. Retained from the completion notification, 2026-09-15 (279 s, 13 tool uses). Output files retained beside this file as V4-*.out.txt. -->

## Gate Report — Unit V4, `@orkestrel/scaffold` (checkout `95f7f18b`, dirty)

| # | Command | Exit code | Reading |
|---|---------|-----------|---------|
| 1 | `npm run format:check` | 0 (PASS) | "All matched files use the correct format." — 224 files, 3898ms |
| 2 | `npm run lint:check` | 0 (PASS) | No warnings/errors printed after the run header |
| 3 | `npm run check` | 0 (PASS) | `tsc --noEmit` clean for root config, `check:src:core`, `check:src:server`, `check:src:bin` |
| 4 | `npm run build` | 0 (PASS) | `dist/bin/main.js` built (87.35 kB); `build:host` staged 172 files into `dist/host`; `build:inventory` staged 172 files into `host.json` |
| 5 | `npm test` | 0 (PASS) | Seven Vitest projects, all passed: `Test Files 9 passed (9)` / `Tests 412 passed (412)`; `5 passed (5)` / `464 passed \| 6 skipped (470)`; `3 passed (3)` / `257 passed (257)`; `1 passed (1)` / `102 passed (102)`; `1 passed (1)` / `172 passed \| 1 skipped (173)`; `3 passed (3)` / `110 passed \| 2 skipped (112)`; `1 passed (1)` / `23 passed (23)`. One transient stderr line (`failed to load config from …\malformed\vite.config.ts`) is an intentional negative-fixture probe, not a suite failure |
| 6 | `npm run test:distribution` | 0 (PASS) | `Test Files 1 passed (1)` / `Tests 5 passed \| 1 skipped (6)`, duration 78.07s |
| 7 | `node dist/bin/main.js audit` | 1 (evidence, not gated) | Reports two dependency-major drifts (`typescript` declares major 6 vs. registry major 7; `vitest` declares major 4 vs. registry major 5) and "2 of 42 planned paths drifted from the plan. Audit compared bytes at 27, existence at 4, and nothing at 11. The plan does not own 100 further paths beneath its groups." Rows read `foreign`/`stale` under the `orchestration`/`docs` groups; final line: "Upstream fallback selected the distributed baseline: versions=live, host=floor." |
| 8 | `node dist/bin/main.js catalog --help` | 0 (PASS) | Printed full usage text; local help text only — no registry call |
| 9 | `git status --porcelain` / `git diff --stat HEAD` | n/a (evidence) | See below |

### `git status --porcelain`
```
 M .agents/templates/brief.md
 M .claude/agents/orkestrel.md
 M .claude/rules/names.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M .prettierignore
 M guides/README.md
 M guides/scaffold.md
 M host.json
 M package-lock.json
 M package.json
 M src/bin/CLI.ts
 M src/bin/helpers.ts
 M src/bin/types.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/server/Materializer.ts
 M src/server/Upstream.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M src/server/validators.ts
 M tests/distribution.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.test.ts
 M tests/setupPolicy.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/constants.test.ts
 M tests/src/core/fixtures/app-only-toolchain.txt
 M tests/src/core/fixtures/setup-false-manifest.txt
 M tests/src/core/fixtures/source-manifest.txt
 M tests/src/core/helpers.test.ts
 M tests/src/server/Materializer.test.ts
 M tests/src/server/Upstream.test.ts
 M tests/src/server/WriteTransaction.test.ts
 M tests/src/server/helpers.test.ts
 M tests/src/server/validators.test.ts
?? .orkestrel/
?? guides/supervisor.md
```

Beyond `host.json` (the build-owned tracked artifact) and the ignored/untracked `dist/`, no tracked file changed as a result of running commands 1-8; every other modified/untracked path predates this run and matches the D4-chain description in the brief.

### Failure excerpts
None. No gate (commands 1-6, 8) exited non-zero. Command 7 (`audit`) is evidence per the brief, not a gate.

### Overall verdict
GREEN on every gated command (1, 2, 3, 4, 5, 6, 8). Command 7 is out-of-gate evidence, exit code 1, reported verbatim for the Orchestrator's landing decision.

### Anomalies
- `npm test` emitted one stderr line from a negative-config fixture; the owning project still reported all tests passed.
- Command 8 (`catalog --help`) never reached the registry; command 7 (`audit`) did and reported live dependency-major drift against the registry.
