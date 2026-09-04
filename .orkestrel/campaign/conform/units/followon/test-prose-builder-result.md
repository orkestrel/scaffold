## Edits

`/home/user/fleet/test/guides/test.md:1358` — `... so it does not restate ` `TaskStatus` `.` → `... so it does not restate ` `LifecycleStatus` `.` (the concept-table row naming workflow's landed type). Applying `npx oxfmt --config .oxfmtrc.json guides/test.md` to satisfy `format:check` realigned the same table's column padding around the widened cell (22 lines changed via whitespace-only padding, no other content moved); confirmed with `git diff` before accepting. `tests/guides.test.ts` was checked and carried no existing quote of the old clause, so no edit was owed or made there.

## Sweep

`grep -rn 'TaskStatus\|PhaseStatus\|WorkflowStatus\|WorkflowFunctions' /home/user/fleet/test/guides/test.md /home/user/fleet/test/README.md /home/user/fleet/test/src /home/user/fleet/test/tests` → no match (exit 1). Ruling: no old alias remains in the package's own prose or code.

## Scoped validation

| Gate | Command | Exit code |
| --- | --- | --- |
| test:guides (row 1) | `npm --prefix /home/user/fleet/test run test:guides` | 0 |
| format:check | `npm --prefix /home/user/fleet/test run format:check` | 0 |
| lint:check | `npm --prefix /home/user/fleet/test run lint:check` | 0 |
| check | `npm --prefix /home/user/fleet/test run check` | 0 |
| build | `npm --prefix /home/user/fleet/test run build` | 0 |
| test | `npm --prefix /home/user/fleet/test test` | 0 |
| audit | `npx scaffold audit --offline` → `0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.` | 0 |
| evidence | `node /home/user/scaffold/tmp/work/evidence.mjs test` → wrote `/home/user/work/evidence/conform-test.diff` (56 lines) and `/home/user/work/evidence/conform-test.status` (1 entries) | 0 |

## git status --short

```
 M guides/test.md
```

Only the owned file is dirty. No commit, stage, install, or discarding command was run.

Report written to `/home/user/scaffold/tmp/units/followon/test-prose-report.md`.
