## Fix round 1

Closes audit round 1's refutation of claims 2 and 9, finding F1, and referral R1.

| Row | Closed by |
| --- | --- |
| 1. The three fences | Three cases added to `tests/guides.test.ts`'s `flagship fences: core helpers` block: `planMigration` against `guides/database.md:1548`, asserting `plan.from`, `plan.to`, and `plan.steps`; `auditDriver` against `:1771`, asserting the empty finding array; the `AdmissionInterface` boundary against `:1472-1473`, asserting `boundary.accepting` and the resolved `track` call. |
| 2. Claim 9, the cell | The `database-obj-6` disposition cell in § Rows now names every transcribed fence by guide line and the two exclusions (`conditionToRange` at `guides/database.md:2376`, `selectPlan` at `:2383`) with their reason, mirroring the browser-fence note this report already carried. |
| 3. F1 | The `database-subj-2` disposition cell now points to `tests/src/core/Table.test.ts:953` (the case constructing the database with `error: errors.handler` at `:958`) instead of an internal `see § Behavioural proofs` pointer. |
| 4. R1 | `tests/src/server/factories.test.ts`'s `jsonPath` helper (declared at the former `:22`, used at the former `:79`) is renamed `databasePath`; it is shared by the `createJSONDriver` and `createSQLiteDriver` describe blocks and yields a SQLite path in the latter, so `databasePath` is format-neutral where `jsonPath` was not. |

### Runs

| Run | Command | Result | File |
| --- | --- | --- | --- |
| Fences before | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts` | `81 passed` | `fix1-fences-before.txt` |
| Fences after | same | `84 passed` (three more cases) | `fix1-fences-after.txt` |
| Fences control red | same, with `plan.from` asserted as `1` instead of `0` inside the new `planMigration` case (never in the guide) | `1 failed \| 83 passed` — the planted case fails, restored to `84 passed` after reverting | `fix1-fences-control-red.txt` |
| Factories rename | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/factories.test.ts` | `5 passed` | `fix1-factories.txt` |

### Gates

| Gate | Command | Exit | File |
| --- | --- | --- | --- |
| `format:check` | `npm --prefix /home/user/fleet/database run format:check` | 0 | `fix1-format-check.txt` |
| `lint:check` | `npm --prefix /home/user/fleet/database run lint:check` | 0 | `fix1-lint-check.txt` |
| `check` | `npm --prefix /home/user/fleet/database run check` | 0 | `fix1-check.txt` |
| `build` | `npm --prefix /home/user/fleet/database run build` | 0 | `fix1-build.txt` |
| `test` | `npm --prefix /home/user/fleet/database test` | 0 | `fix1-test.txt` (`src` 969/969, `policy` 111/111, `config` 46/46, `setup` 63/63, `guides` 84/84) |

No gate needed converging with `lint` or `format`; each ran clean on the first pass.

### `scaffold audit --offline`, read as directed

`cd /home/user/fleet/database && npx scaffold audit --offline`:

```text
0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
```

Read as directed, not acted on: the `configs/browsers.ts` row round 1 reported stale no longer
drifts. This unit's owned files are `tests/guides.test.ts`, `tests/src/server/factories.test.ts`,
`/home/user/work/evidence/database-proofs/**`, and this report; none of them touches
`configs/**`, so this reading is carried forward rather than caused by a row here.

---

Files changed: `/home/user/fleet/database/tests/guides.test.ts` (three new flagship-fence cases plus `auditDriver`/`planMigration`/`AdmissionInterface` imports), `/home/user/fleet/database/tests/src/server/factories.test.ts` (`jsonPath` renamed `databasePath`), `/home/user/scaffold/tmp/units/conform/conform-database-report.md` (database-subj-2 and database-obj-6 cells rewritten, `## Fix round 1` appended). Evidence captured under `/home/user/work/evidence/database-proofs/` and refreshed at `/home/user/work/evidence/conform-database.diff` and `.status`.
