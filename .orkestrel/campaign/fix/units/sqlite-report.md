# Unit breaking-sqlite — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s18-11** — applied: `exec` → `execute` on `SQLiteDatabaseInterface` (src/server/types.ts) and `SQLiteDatabase` (src/server/SQLiteDatabase.ts), contract first. Carried atomically: the in-class callers `begin`, `commit`, `rollback`, and `pragma`; the interface `@remarks` and the class `@remarks`; the `createSQLiteDatabase` `@example`; the guide's `SQLiteDatabase` Entities row, the `SQLiteDatabaseInterface` Methods row, the `Connect, execute, and round-trip a row` heading, every guide fence that ran the member, and the Tests bullet; and the tests naming the old member. No alias, re-export, or shim. `this.#require().exec(sql)` in SQLiteDatabase.ts keeps `exec` deliberately — that receiver is `node:sqlite`'s `DatabaseSync`, whose native member is not this package's surface.
- **s18-10** — refused: REFUSED per the Orchestrator ruling. Rule text, from `.claude/rules/names.md` § General vocabulary as the brief quotes it: "An option key, constant, or member that transliterates an external protocol field, format field, or engine pragma keeps the external wording in this project's casing, and its TSDoc names the source it mirrors: the `foreignKeys` key mirrors the `PRAGMA foreign_keys` statement, and the `keepAlive` key mirrors the Ollama `keep_alive` field." `SQLiteDatabaseOptions.foreignKeys` is unchanged. The ruling's required TSDoc sentence landed in the `SQLiteDatabaseOptions` `@remarks`: the key now reads "enables foreign-key constraint enforcement (native `enableForeignKeyConstraints`) and mirrors SQLite's `PRAGMA foreign_keys` statement". The paragraph tail was rewrapped so no line is left ragged; the wording is otherwise unchanged. No guide edit: the guide rows the brief listed were the rename's consequences, and the rename did not happen.
- **s18-12** — refused: REFUSED per the Orchestrator ruling; no edit. Rule text, from `AGENTS.md` § Design laws: "**One concept, one term.** Do not alternate synonyms. Lifecycle verbs have fixed meanings." Renaming only this package's `transaction` would create the alternation with `@orkestrel/database` that the rule exists to prevent, and renaming `database` is a rescope with no finding against it. `SQLiteDatabaseInterface.transaction` and `SQLiteDatabase.transaction` are untouched.
- **s18-30-sibling** — applied: README.md Status section corrected: the link text and the GitHub URL both said `guides/src/sqlite.md`, a path that does not exist. Both now read `guides/sqlite.md`, which matches the tree and the `guides/README.md` manifest entry.

## Symbols moved

- SQLiteDatabaseInterface.exec → SQLiteDatabaseInterface.execute
- SQLiteDatabase.exec → SQLiteDatabase.execute

## Files touched

- /home/user/fleet/sqlite/src/server/types.ts
- /home/user/fleet/sqlite/src/server/SQLiteDatabase.ts
- /home/user/fleet/sqlite/src/server/factories.ts
- /home/user/fleet/sqlite/guides/sqlite.md
- /home/user/fleet/sqlite/README.md
- /home/user/fleet/sqlite/tests/src/server/SQLiteDatabase.test.ts
- /home/user/fleet/sqlite/tests/src/server/SQLiteStatement.test.ts
- /home/user/fleet/sqlite/tests/src/server/factories.test.ts
- /home/user/fleet/sqlite/tests/src/server/helpers.test.ts

## Tests changed

- /home/user/fleet/sqlite/tests/src/server/SQLiteDatabase.test.ts — every wrapper call site moved to `execute` (`db`, `seed`, `holder`, `contender` receivers), plus the file header comment and the `SQLiteDatabase — execute and prepare` suite name.
- /home/user/fleet/sqlite/tests/src/server/SQLiteStatement.test.ts — the `beforeEach` seed and the mid-stream-fault setup moved to `execute`.
- /home/user/fleet/sqlite/tests/src/server/factories.test.ts — the round-trip call, the header comment, and the `connect → execute → prepare → round-trip` test name.
- /home/user/fleet/sqlite/tests/src/server/helpers.test.ts — only the wrapper call in the end-to-end CONSTRAINT test moved. The `database.exec` and `holder.exec` calls there drive a raw `node:sqlite` `DatabaseSync` and keep the native name.

## Gates

- `npm run format:check` → exit 0 — Checking formatting...
All matched files use the correct format.
Finished in 2668ms on 43 files using 4 threads.
- `npm run lint:check` → exit 0 — > oxlint --config .oxlintrc.json --deny-warnings .
(no diagnostics emitted)
- `npm run check` → exit 0 — > tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.server.json
(no diagnostics emitted)
- `npm run build` → exit 0 — dist/src/server/index.js  11.57 kB | gzip: 4.05 kB
dist/src/server/index.cjs  11.93 kB | gzip: 4.13 kB
✓ built in 1.88s
Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
- `npm test` → exit 0 — src:server — Test Files 4 passed (4), Tests 51 passed (51)
policy — Test Files 1 passed (1), Tests 111 passed (111)
config — Test Files 1 passed (1), Tests 46 passed (46)
setup — Test Files 2 passed (2), Tests 4 passed (4)
guides — Test Files 1 passed (1), Tests 23 passed (23)

## Diff stat

```text
9 files changed, 74 insertions(+), 69 deletions(-)

README.md                                | 1 +  1 -
guides/sqlite.md                         | 11 + 11 -
src/server/SQLiteDatabase.ts             |  6 +  6 -
src/server/factories.ts                  |  2 +  2 -
src/server/types.ts                      | 11 + 10 -
tests/src/server/SQLiteDatabase.test.ts  | 37 + 33 -
tests/src/server/SQLiteStatement.test.ts |  2 +  2 -
tests/src/server/factories.test.ts       |  3 +  3 -
tests/src/server/helpers.test.ts         |  1 +  1 -
```

Status at return (writer's reading): `Done. s18-11 and the s18-30 sibling applied; s18-10 and s18-12 refused with the rule text quoted, and s18-10 carries the mirrored-pragma TSDoc sentence its ruling required. The whole gate chain reads green against the new surface: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, and `npm test` each exit 0. |  | `npm run check` exited 0 before any edit, so the staged closure revealed no renamed upstream symbol to adopt — the adoption list is empty, and `node /home/user/work/verify-stage.mjs sqlite` reported `@orkestrel/contract`, `@orkestrel/guide`, `@orkestrel/html`, `@orkestrel/markdown`, and `@orkestrel/test` all as the installed copies. This checkout already carried the renamed guide helpers from commit a397f6c. |  | The prose sweep `grep -rn '\bexec\b' src tests guides README.md` returns only hits that name something other than this package's moved member, and each is classified: `src/server/SQLiteDatabase.ts:81` and `tests/src/server/helpers.test.ts:28,47,48,58` call `node:sqlite`'s native `DatabaseSync.exec`; `tests/config.test.ts:397,424` call `RegExp.prototype.exec`; `guides/contract.md:208,240` sit in a vendored byte-identical mirror, are off-limits, and both discuss `RegExp.prototype.exec`. A repository-wide sweep over tracked files adds only `.claude/settings.json`, whose hit is the `Bash(codex exec *)` permission entry. Sweep bound: every tracked file, word-boundary pattern. |  | The centralization sweep over the touched files found nothing to repair. `src/server/types.ts` holds types only, all exported; `src/server/SQLiteDatabase.ts` holds one class with `#` fields and no module-scope declaration; `src/server/factories.ts` holds one `create*` function; the only in-body function expression is the anonymous liveness callback passed directly to the `SQLiteStatement` constructor, which the no-nested-function law permits. No helper, wrapper, or alias was added. The touched files are valid UTF-8 with no replacement character, no carriage return, and no trailing whitespace.`
Built `dist/` moves: true

## Observations

- The guides-parity gate was proven able to fail before criterion 5 rested on it. Planting the pre-rename `exec` row back into the Methods table and running `npm run test:guides` gave exit 1 with `Tests 4 failed | 19 passed (23)` — reddening `documents every interface method`, `documents no phantom method`, `SQLiteDatabase exposes no undocumented method`, and `documents an example for every method`. The clean run gives `Tests 23 passed (23)`. The file was restored byte-exactly in a `finally` block and the restoration verified against the working-tree diff.
- `dist/` moves, as a rename must. The built declaration now carries `execute(sql: string): void;` on both the interface and the class in `dist/src/server/index.d.ts`, and the TSDoc that reaches consumers spells `execute` throughout. This is a breaking change to the published surface.
- `SQLiteStatementInterface.run` is a banned synonym for `execute` under the § Fixed lifecycle vocabulary text the brief quotes ("`execute` runs a unit of work (`run` and `exec` are banned synonyms)"). No assigned row moves it, so it stays. Recorded against the naming capability for the next change rather than reopened here.
- `README.md` Requirements says `Node.js >= 24` while `package.json` `engines` declares `>=22.12.0`. The manifest is off-limits to this unit and no row names the mismatch. Recorded for the next change.
- The `## Contract` preamble in `guides/sqlite.md` reads "These invariants hold across `src/server/sqlite` ↔ `sqlite.md`", naming a directory that does not exist — the module is `src/server`. Pre-existing, outside the assigned rows, recorded for the next change.
- Whole-suite timing on this host was unremarkable and nothing failed, so there is no timing-suspect result to carry to the authoritative re-run.
- Instrument note: an initial trailing-whitespace check written as `grep -c '[ \t]$'` reported false hits, because POSIX basic regular expressions read `[ \t]` as the set space, backslash, `t` — so every line ending in `t` matched. Re-run as `grep -rnP '[ \t]+$'` it reports none, and `git show HEAD:<file>` confirms none existed at the baseline either.

## Deviations

- The brief's Rulings preamble says a REFUSED row "closes refused with the rule text quoted in the report and no edit", while the s18-10 ruling itself says "Add the TSDoc sentence naming the pragma it mirrors". I followed the row's own ruling as the more specific instruction and made that one TSDoc edit; the `foreignKeys` key itself is unchanged. If the Orchestrator meant the general clause to win, revert the `SQLiteDatabaseOptions` `@remarks` hunk in `src/server/types.ts` and nothing else changes.
- TSDoc first-sentence scope, decided under the deviation contract's wording clause. I applied the third-person `-s` form to `createSQLiteDatabase` ("Create a synchronous SQLite database" → "Creates a synchronous SQLite database") because that block carries the `@example` the rename moved and its first sentence was imperative. I left the noun-phrase descriptions of `SQLiteDatabaseInterface`, `SQLiteDatabaseOptions`, and the `SQLiteDatabase` class as they are, and left the untouched member blocks (`begin`, `commit`, `rollback`, `[Symbol.dispose]`) alone: restyling them is a broad change no assigned row names.
- Guide table padding, decided under the same clause. The widened `SQLiteDatabase` Entities row broke that table's column alignment, so I re-padded the header, the separator, and the `SQLiteStatement` row to match. A first attempt appended the padding after the separator's trailing space, producing `--- ---|`; that was caught on diff review and repaired. Every table in `guides/sqlite.md` now has uniform row width, and the `SQLiteDatabaseInterface` Methods table needed no repadding because the `execute` cell was written to the width the `exec` cell had.
- The parity negative control planted its line in `guides/sqlite.md`, a file this unit did touch, rather than in an untouched file as the general plant rule prefers. No untouched file can exercise this gate — the guide is the gate's subject. The plant was the exact text this unit had replaced, the restore ran in a `finally` block, and `git status --short` plus the re-run gate chain confirm the tree is the intended state.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/sqlite.diff`,
`tmp/units/breaking/sqlite.status`.
