# Fix report: sqlite

## Dispositions

- **s18-10** deferred_breaking: Re-verified: `foreignKeys` is still the option key at src/server/types.ts:70, read at SQLiteDatabase.ts:34/:42/:63. Renaming it renames a published option key on the exported `SQLiteDatabaseOptions` interface, which the breaking test defers whole. The two lane corrections also disagree on the replacement word (`foreign` versus `references`), so the name is unsettled as well.
- **s18-11** deferred_breaking: Re-verified: `exec(sql)` is still declared on the exported `SQLiteDatabaseInterface` (types.ts:123 pre-edit, :138 post-edit) and implemented at SQLiteDatabase.ts:79. Renaming an exported interface method is a published-surface rename and defers whole. Nothing partial stands on its own, because the guide and TSDoc text is only correct while the method keeps its current name.
- **s18-12** deferred_breaking: Re-verified: `transaction<R>(scope)` is still declared on the exported `SQLiteDatabaseInterface` and implemented at SQLiteDatabase.ts:100. Renaming it to `transact` is a published-surface method rename. One lane also requires the rename to run fleet-wide in layer order starting at `@orkestrel/database`, which is outside this package's scope.
- **s18-15** applied (src/server/types.ts, src/server/helpers.ts, guides/sqlite.md): Declared `export type SQLiteBinding` in types.ts (placed directly after `SQLiteParameters`, the type it normalizes) and annotated `bindParameters` with it. Purely additive: the alias is structurally identical to the anonymous union it replaces, so the call signature is unchanged. Added the `SQLiteBinding` row to the guide's Types table, which the surface bijection parity test requires for a new barrel export. Kept the `SQLiteValue` type import in helpers.ts — the `isArray<SQLiteValue>` guard still needs it. Wrote the new TSDoc in third-person voice.
- **s18-30** applied (src/server/types.ts): Corrected the `begin()` TSDoc path from `guides/src/sqlite.md` to `guides/sqlite.md`. Confirmed the string occurred exactly once in the tree and that `guides/src/` does not exist.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2456ms on 43 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (no diagnostics, exit 0)
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.server.json (no diagnostics). First run reported src/server/helpers.ts(61,14): error TS2304: Cannot find name 'SQLiteValue' from my own edit; I restored the type import and re-ran clean.
- npm run build: pass — dist/src/server/index.js 11.55 kB | gzip: 4.05 kB; dist/src/server/index.cjs 11.90 kB | gzip: 4.13 kB; built in 2.55s; Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
- npm test: pass — src: 4 files / 51 tests passed; policy: 1 file / 111 tests passed; config: 1 file / 46 tests passed; setup: 2 files / 4 tests passed; guides: 1 file / 23 tests passed. No failures.

## Diffstat

```text
 guides/sqlite.md      |  1 +
 src/server/helpers.ts | 10 +++-------
 src/server/types.ts   | 17 ++++++++++++++++-
 3 files changed, 20 insertions(+), 8 deletions(-)
```

- dist moves: true

## Deviations

s18-10 lane conflict, reported rather than resolved: the DRIFT-RESHAPE/high lane requires renaming `foreignKeys` to `foreign`, the DRIFT/medium lane requires `references`. The lanes share only the rejection of the finding's own word `constraints`, and they name no common replacement, so the work order must settle the name. The finding defers on the breaking test regardless, so this conflict blocked nothing here.

Observation for the work order, outside this dossier: the `begin()` TSDoc I touched for s18-30 still reads "a caller composing its own transaction alongside others should branch on ..." — `.claude/rules/writing.md` bans `should`. I left it, because no dossier finding covers it and rewriting it was outside the s18-30 repair.
