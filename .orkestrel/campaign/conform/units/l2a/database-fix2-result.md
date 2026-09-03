All rows applied and gates green.

## Fix round 2

Closes audit round 2's refutation of claim 9 and F3, and records the Orchestrator's ruling on F2.

| Row | Closed by |
| --- | --- |
| 1. Claim 9, the cell | The `database-obj-6` disposition cell's exclusion clause now reads `guides/database.md:2372` (`conditionToRange`), `:2376` and `:2383` (`selectPlan`) — the line `conditionToRange` is called at and the two lines `selectPlan` is called at, read from the guide directly. |
| 2. F3 | A comment ahead of the boundary case in `tests/guides.test.ts` (line 446) states that the case is a type-conformance transcription of a caller-supplied `AdmissionInterface` literal, proved by the fence's compile, and names `tests/src/core/DatabaseContext.test.ts` and `tests/src/core/TransactionScope.test.ts` as the suites that drive the real implementors. |

**F2, the ruling.** `databasePath` keeps its noun form, sanctioned by the `tempDatabasePath` precedent it wraps (`.claude/rules/names.md` admits the form where the module already carries it).

**R3.** The report's two audit readings — `1 of 45` at this unit's exit and `0 of 45` after the Orchestrator's `scaffold repair` — are consistent as written. The Orchestrator's `scaffold repair` of `configs/browsers.ts` between the two readings is what moved the count from `1 of 45` to `0 of 45`.

## Gates

| Gate | Command | Exit |
| --- | --- | --- |
| `format:check` | `npm --prefix /home/user/fleet/database run format:check` | 0 |
| `lint:check` | `npm --prefix /home/user/fleet/database run lint:check` | 0 |
| `check` | `npm --prefix /home/user/fleet/database run check` | 0 |
| `build` | `npm --prefix /home/user/fleet/database run build` | 0 |
| `test` | `npm --prefix /home/user/fleet/database test` | 0 |

`scaffold audit --offline` summary: `0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.`

Files touched: `/home/user/fleet/database/tests/guides.test.ts` (comment added ahead of line 446), `/home/user/scaffold/tmp/units/conform/conform-database-report.md` (claim 9 cell corrected, `Fix round 2` section added).
