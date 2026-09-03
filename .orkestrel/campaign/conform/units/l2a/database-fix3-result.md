All rows applied, gates green, audit clean.

## Fix round 3

| Row | Closed by |
| --- | --- |
| 1. F1 | `src/core/DriverIterator.ts`'s `@example` now opens with `import type { Row } from '@orkestrel/database'` ahead of the `DatabaseError, DriverIterator` value import, so the declared `rows: AsyncIterator<Row>` line compiles as written. |
| 2. F2 | `tests/guides.test.ts:441`'s `auditDriver` case now cites `guides/database.md:1770-1771` — the `auditDriver` call at `:1770` and its `// []` value comment at `:1771` — instead of the comment line alone. |

Claims 7 and 9's refutations rest on `configs/browsers.ts` and the Orchestrator's own `scaffold repair` refresh between the round 1 and round 2 audit reads, per § Fix round 2's R3; no row in this round revisits them.

**Gates**

| Gate | Command | Exit |
| --- | --- | --- |
| `format:check` | `npm --prefix /home/user/fleet/database run format:check` | 0 |
| `lint:check` | `npm --prefix /home/user/fleet/database run lint:check` | 0 |
| `check` | `npm --prefix /home/user/fleet/database run check` | 0 |
| `build` | `npm --prefix /home/user/fleet/database run build` | 0 |
| `test` | `npm --prefix /home/user/fleet/database test` | 0 (`policy` 111/111, `config` 46/46, `setup` 63/63, `guides` 84/84) |

`scaffold audit --offline`: `0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.`

Files changed: `/home/user/fleet/database/src/core/DriverIterator.ts`, `/home/user/fleet/database/tests/guides.test.ts`, `/home/user/scaffold/tmp/units/conform/conform-database-report.md`.
