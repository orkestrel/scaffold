# Gate report — D3-pre voice-converge after its fix round (scaffold)

1. `node .orkestrel/campaign/docs-parity/instruments/p10/p10b-voice.mjs /home/user/scaffold src app configs tests scripts | tail -2`
   Exit 0. Output: `FILES 58 BLOCKS 662 FLAGGED 0 NODOC 35` — matches expected.

2. `node .orkestrel/campaign/docs-parity/instruments/p10/p10b-voice.mjs .orkestrel/campaign/docs-parity/instruments/p10 . | tail -2`
   Exit 0. Output: `FILES 1 BLOCKS 4 FLAGGED 3 NODOC 0` — matches expected control.

3. `node .orkestrel/campaign/docs-parity/instruments/p9/p9d-terms.mjs /home/user/scaffold | tail -3`
   Exit 0. Output: `FILES 80 HITS 0` — matches expected.

4. `node .orkestrel/campaign/docs-parity/instruments/p9/p9d-terms.mjs /home/user/scaffold .orkestrel/campaign/docs-parity/instruments/p9/control.md | grep -c 'control.md:3'`
   Exit 0. Output: `3` — matches expected.

5. `grep -rn -i -E '\b(should|simply|eas(y|ier|iest|ily)|just|currently|utiliz|leverag|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|sanity[ -]check|dumm(y|ies)|blacklist|whitelist|slave)\b' src configs tests scripts --include=*.ts | grep -E '^\S+:\s*(//|/?\*)'`
   Exit 1 (no matching lines, as expected — `grep` reports no match with exit 1). No output.

6. `npm run format:check`
   Exit 0. "All matched files use the correct format. Finished in 9066ms on 222 files using 4 threads."

7. `npm run lint:check`
   Exit 0. No lint findings.

8. `npm run check`
   Exit 0. `tsc --noEmit` across root, core, server, and bin projects all completed with no errors.

9. `npm run build`
   Exit 0. Built `dist/src`, `dist/bin`, staged 121 file(s) into `dist/host`, staged 121 file(s) into `host.json` (build:inventory ran as part of build).

10. `sha256sum host.json && npm run build:inventory && sha256sum host.json`
    Exit 0. Digest before: `1bb189a79989fe90ba55e70d4e5cdde27b35241317d4d690c635f03e891d7ee5`. `build-inventory: staged 121 file(s) into host.json`. Digest after: `1bb189a79989fe90ba55e70d4e5cdde27b35241317d4d690c635f03e891d7ee5`. Digests match — inventory is stable.

11. `npm test`
    Exit 0. All Vitest projects passed: root (77/77), config (111 passed | 1 skipped of 112), setup (74/74), guides (17/17).

12. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
    Exit 0. distribution project: 5/5 tests passed. Duration 74.07s.

13. `git status --short`
    Working tree shows pre-existing modified and untracked files (no source edits made by this verification run):
    ```
     M .agents/orchestration.md
     M .agents/skills/enterprise-bootstrap/references/bootstrap-reference.md
     M .agents/skills/enterprise-bootstrap/references/frontend-design.md
     M .agents/skills/enterprise-bootstrap/references/utilities.md
     M .agents/skills/orkestrel-debrief/references/field-testing.md
     M .agents/skills/orkestrel-falsify/references/reconcile.md
     M .claude/rules/architecture.md
     M .claude/rules/quality.md
     M AGENTS.md
     M ROADMAP.md
     M configs/helpers.ts
     M configs/policy.ts
     M host.json
     M src/server/Materializer.ts
     M tests/setup.ts
     M tests/setupPolicy.ts
     M tests/setupServer.ts
     M tests/src/core/templates.test.ts
    ?? .orkestrel/campaign/ts6-api/u11-audit-checker.md
    ?? .orkestrel/campaign/ts6-api/u11-audit-objective.md
    ?? .orkestrel/campaign/ts6-api/u11-audit-subjective.md
    ?? .orkestrel/campaign/ts6-api/u11-verify-report.md
    ```

## Anomalies

None. No re-run was needed for any Vitest row.

GATES: GREEN
