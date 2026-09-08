# Gate report — U2-fix (scaffold)

1. `node node_modules/typescript/bin/tsc --version` — PASS (exit 0)
   Last line: `Version 6.0.3`

2. `npm run format:check` — PASS (exit 0)
   Last lines:
   ```
   All matched files use the correct format.
   Finished in 10377ms on 222 files using 4 threads.
   ```

3. `npm run lint:check` — PASS (exit 0)
   No output beyond the command echo (no findings).

4. `npm run check` — PASS (exit 0)
   All four `tsc --noEmit` steps (root, core, server, bin) completed with no diagnostics.

5. `npm run build` — PASS (exit 0)
   Last lines:
   ```
   build-host: staged 121 file(s) into dist/host
   build-inventory: staged 121 file(s) into host.json
   ```

6. `npm test` — PASS (exit 0)
   Last lines (final project, `guides`):
   ```
   Test Files  1 passed (1)
        Tests  17 passed (17)
     Start at  03:42:39
     Duration  3.61s
   ```
   All five projects passed: root/main (245 passed), policy (76 passed), config (108 passed),
   setup (70 passed), guides (17 passed). No red row; no re-run needed.

7. `git status --short` — PASS (exit 0)
   Last lines:
   ```
    M .claude/rules/architecture.md
    M .claude/rules/tests.md
    M .claude/rules/workspace.md
    M .orkestrel/campaign/ts6-api/ledger.md
    M .oxlintrc.json
    M configs/policy.ts
    M guides/scaffold.md
    M host.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
   ?? .orkestrel/campaign/ts6-api/u2-audit-brief.md
   ?? .orkestrel/campaign/ts6-api/u2-audit-checker.md
   ?? .orkestrel/campaign/ts6-api/u2-audit-objective.md
   ?? .orkestrel/campaign/ts6-api/u2-audit-subjective.md
   ?? .orkestrel/campaign/ts6-api/u2-audit-verdict.md
   ?? .orkestrel/campaign/ts6-api/u2-fix-audit-brief.md
   ?? .orkestrel/campaign/ts6-api/u2-fix-brief.md
   ?? .orkestrel/campaign/ts6-api/u2-fix-report.md
   ?? .orkestrel/campaign/ts6-api/u2-fix-verify-brief.md
   ?? .orkestrel/campaign/ts6-api/u2-fix.diff.txt
   ?? .orkestrel/campaign/ts6-api/u2-fix.status.txt
   ?? .orkestrel/campaign/ts6-api/u2-policy-plugin-brief.md
   ?? .orkestrel/campaign/ts6-api/u2-policy-plugin-report.md
   ?? .orkestrel/campaign/ts6-api/u2-policy-plugin.diff.txt
   ?? .orkestrel/campaign/ts6-api/u2-policy-plugin.status.txt
   ?? .orkestrel/campaign/ts6-api/u2-verify-brief.md
   ?? .orkestrel/campaign/ts6-api/u2-verify-report.md
   ?? .orkestrel/campaign/ts6-api/u7-probe-typestage-brief.md
   ```

## Anomalies

None observed.

GATES: GREEN
