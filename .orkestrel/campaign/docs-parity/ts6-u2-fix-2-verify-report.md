# Gate report — U2-fix-2 (scaffold)

1. `node node_modules/typescript/bin/tsc --version` — PASS (exit 0)
   Version 6.0.3

2. `npm run format:check` — PASS (exit 0)
   All matched files use the correct format.
   Finished in 7042ms on 222 files using 4 threads.

3. `npm run lint:check` — PASS (exit 0)
   (no diagnostics; command completed clean)

4. `npm run check` — PASS (exit 0)
   tsc --noEmit --project tsconfig.json, check:src:core, check:src:server, check:src:bin all completed with no output (clean).

5. `npm run build` — PASS (exit 0)
   ...
   build-host: staged 121 file(s) into dist/host
   build-inventory: staged 121 file(s) into host.json
   (`build:inventory` regenerated `host.json`, matching the expected write named in the brief.)

6. `npm test` — PASS (exit 0)
   Test Files  3 passed (3) / Tests 245 passed (245) — main run
   test:policy — Test Files 1 passed (1), Tests 77 passed (77)
   test:config — Test Files 1 passed (1), Tests 108 passed (108)
   test:setup — Test Files 2 passed (2), Tests 70 passed (70)
   test:guides — Test Files 1 passed (1), Tests 17 passed (17)
   No red Vitest row occurred; no re-run needed.

7. `git status --short` — reported (not a pass/fail gate)
   Modified: .claude/rules/architecture.md, .claude/rules/tests.md, .claude/rules/workspace.md,
   .orkestrel/campaign/ts6-api/ledger.md, .oxlintrc.json, configs/policy.ts, guides/scaffold.md,
   host.json, tests/config.test.ts, tests/policy.test.ts, tests/setupPolicy.ts
   Untracked: campaign artifacts under .orkestrel/campaign/ts6-api/ (briefs, reports, diffs, status files, verdicts)

## Anomalies

None observed.

GATES: GREEN
