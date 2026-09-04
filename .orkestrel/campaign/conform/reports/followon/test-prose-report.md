# Unit test-prose — report

## The clause now

`guides/test.md:1358` (row "A statechart transition table and its runner") reads:

> `STATECHART_STATUSES` names a harness's reported run state rather than a task's derived status,
> so it does not restate `LifecycleStatus`.

`tests/guides.test.ts` carried no quote of the old clause (`grep -n 'TaskStatus\|does not restate' tests/guides.test.ts` returned no match), so no presence-guard edit was owed there and none was made.

## The sweep, with its rulings

Command: `grep -rn 'TaskStatus\|PhaseStatus\|WorkflowStatus\|WorkflowFunctions' guides/test.md README.md src tests`

Result: no match (exit 1). Ruling: no old alias remains in the package's own prose or code; the sweep is clean.

## Gates

| Gate | Command | Exit code |
| --- | --- | --- |
| test:guides | `npm run test:guides` | 0 |
| format:check | `npm run format:check` (after `npx oxfmt --config .oxfmtrc.json guides/test.md`, which realigned the same table's column padding to the widened `LifecycleStatus` cell, 22 lines changed, no content beyond the one clause) | 0 |
| lint:check | `npm run lint:check` | 0 |
| check | `npm run check` | 0 |
| build | `npm run build` | 0 |
| test | `npm test` | 0 |

## Audit line

`npx scaffold audit --offline` → `0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.`

## git status --short

```
 M guides/test.md
```
