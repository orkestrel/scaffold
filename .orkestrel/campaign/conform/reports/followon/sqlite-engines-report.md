# Unit followon-sqlite-engines — report

## Rows

| Row | Site | Disposition | Note |
| --- | ---- | ------------ | ---- |
| sqlite-obj-1a | `package.json` `engines.node` | applied | `>=22.12.0` → `^22.18.0 \|\| >=24.4.0` |
| sqlite-obj-1b | `.github/workflows/ci.yml` `matrix.node` | applied | `'22.12.0'` → `'22.18.0'`; `'26'` unchanged |
| sqlite-obj-1c | `README.md` Requirements bullet | applied | `- Node.js >= 22.12` → the row-3 text naming `timeout`, `isTransaction`, `readBigInts`, `StatementSync.iterate` |
| sqlite-obj-1d | `guides/sqlite.md` tagline | applied | tagline stated no floor; appended one sentence: "Requires Node.js ^22.18 \|\| >=24.4 (the releases carrying the `timeout`, `isTransaction`, and `readBigInts` options and `StatementSync.iterate`)." — every other sentence unchanged |
| sqlite-obj-1e | `guides/sqlite.md` Entities `SQLiteDatabase` row | applied | Summary cell extended with `; readonly \`path\`, \`connected\`, and \`transacting\`.`; column re-padded by `npm run format` |
| sqlite-obj-1f | `guides/sqlite.md` Contract item 1 | applied | `The wrapper ships no deep import path.` → `` `.` is the only code entry; `./package.json` is the manifest. `` |
| sqlite-obj-1g | `guides/sqlite.md` Contract item 5 and `src/server/types.ts` `SQLiteStatementInterface` doc block | applied | both sentences replaced with the row-7 text; rewrapped the `types.ts` block at its existing width; searched `tests/guides.test.ts` for a guard quoting either replaced sentence — none found, so no test changed |

## Gates

| Command | Exit code | Note |
| --- | --- | --- |
| `npm run format:check` | 1 then 0 | first run flagged `guides/sqlite.md`; `npm run format` rewrote it (the row-5 table re-padding), re-run exited 0 |
| `npm run lint:check` | 0 | |
| `npm run check` | 0 | |
| `npm run test:guides` | 0 | 33 tests passed, no guard needed updating |
| `npm run build` | 0 | |
| `npm test` | 0 (observation) | 219 tests passed across `test:src`, `test:policy`, `test:config`, `test:setup`, `test:guides` |

Offline audit: `npx scaffold audit --offline` → `0 of 35 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 7.`

## Standing-condition observation

The negative control (`npm test` on Node 22.12.0 reddening `iterate`, `transacting`, and `bigints`) did not run — this host carries only Node v22.22.2. Recorded as an observation per the brief, not as a gate.

## Deviations

None. Every site's text matched § Rows and § Added rows exactly as quoted before editing.

## Paths touched

- `/home/user/fleet/sqlite/package.json`
- `/home/user/fleet/sqlite/.github/workflows/ci.yml`
- `/home/user/fleet/sqlite/README.md`
- `/home/user/fleet/sqlite/guides/sqlite.md`
- `/home/user/fleet/sqlite/src/server/types.ts`

`git status --short` in `/home/user/fleet/sqlite` lists exactly these five files, all under Owned (§ Scope extends Owned to `src/server/types.ts` for row 7 only).

## Evidence files

- `/home/user/work/evidence/followon-sqlite-engines.diff` (`git diff HEAD`)
- `/home/user/work/evidence/followon-sqlite-engines.status` (`git status --short`)
