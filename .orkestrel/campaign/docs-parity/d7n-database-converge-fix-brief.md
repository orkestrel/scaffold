# Brief — `d7n-database-converge-fix` (database's fix round on the audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/database` from the committed tip `21f0c9a` (clean; the final guide head start installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38c…`; probe's unpublished tip installed beside it, so `@orkestrel/probe/server` resolves). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-database-converge-fix/` inside this checkout; your own red-first control on a file you own is yours to plant and reverse.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` (§ Claims and time bans `guarantee`); `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 7, § Ruling 12, § Ruling 15, § Ruling 18; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-database-audit-verdict.md` (items D1 to D7 and where each came from); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-database-converge-report.md`; the pilot's guide `/home/user/fleet/abort/guides/abort.md` for the voice.

## Items

1. **The reserved store's literal (D1, Ruling 18).** `src/browser/constants.ts` `METADATA_STORE`: the description paragraph or its `@remarks` names `__metadata__` the way `METADATA_TABLE`'s remarks at `src/server/constants.ts` name `_metadata` ("A user table named `__metadata__` collides with the driver's own bookkeeping, so a caller must avoid it; the collision is caught at `open`."); then `--to guide` so the cell at `guides/database.md:148` carries it.
2. **All-caps emphasis, the whole guide and every owning block (D2).** Lower every emphasis word in `guides/database.md` — the table cells at `:102`, `:103`, `:116`, `:140`, `:150`, `:210`, `:267` through their owning blocks (`src/server/constants.ts` `EXACT_COLUMN_STORAGE` and `EXACT_RANGE_COLUMN_STORAGE`, `src/server/compilers.ts` `compileJSONTypeSQL`, `src/browser/helpers.ts` at the `INSIDE` site, `src/core/helpers.ts` `auditDriver`, `src/core/types.ts` `TableEventMap`) and then `--to guide`; the § Contract and § Patterns prose at `:462`, `:482`, `:490`, `:491`, `:500`, `:504`, `:557`, `:561-566`, `:569`, `:572`, `:574`, `:578`, `:615`, `:630`, `:684`, `:689`, `:708`, `:768`, `:769`, `:773`, `:787`, `:798`, `:843`, `:1589` (`OWN`), `:1653`, `:1848` (`AFTER`), `:1894`, `:1995`, `:2195-2196`, `:2346`, `:2350` directly, keeping the contrast in the sentence; and the emphasis the converge round itself added at `src/server/helpers.ts:187-188` (`REFINES`, `REQUIRED`, `NON-NULL` → "refines", "required and non-null"), with `NOT` at `:183` in the same block. Keep SQL keywords (`CREATE TABLE IF NOT EXISTS`, `IS NOT NULL`), the SQLite `BINARY` collation name, and acronyms: they are data. Close with one sweep, `grep -nE '\b[A-Z]{3,}\b' guides/database.md src/**/*.ts` ruled hit by hit, and state the pattern and the paths in the report with every hit you ruled permitted.
3. **Counts in the owned prose (D3).** `guides/database.md:850` "three persistent backends" names the members (`JSONDriver`, `SQLiteDriver`, `IndexedDBDriver`) or drops the number; "the fixed two-table schema" at `:243` and in its block in `src/core/constants.ts`, and again at `:796`, reads "the fixed `users` and `posts` schema" — block and cell in the same edit, `docs` at zero.
4. **The moved type rows name their entry point (D4).** `SQLiteDriverOptions`, `QueryPlan`, and `CompiledSQL` sit under `### Types` with nothing naming which face serves them; each description paragraph names it the way `createSQLiteDriver`'s does (`@orkestrel/database/server`, `@orkestrel/database/browser`); then `--to guide`.
5. **The `## Methods` intro (D5).** `guides/database.md:299-301` claims every `### Classes` class implements an interface the section documents; `DriverIterator` does not. Name the exception or narrow the sentence to the driver and database classes.
6. **`guarantee` (D6).** `guides/database.md:1887` "**The listener-isolation safety guarantee.**" → "**Listener isolation.**"; `:2468` "the emitter's post-commit/no-aborted-event guarantees" → "the emitter's post-commit and no-aborted-event behavior".
7. **Propagation.** `npx oxfmt --write <paths>` after edits; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/database.md`, the doc blocks under `src/**` (no code token moves), `README.md` only if an item reaches it (none does). Off-limits: everything else, including `tests/**`, every vendored file, `package.json`, `package-lock.json`, `guides/README.md`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned .ts paths>`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -c '__metadata__' src/browser/constants.ts` reads at least 2 (the literal and the description); `grep -nE '\b(EQUALITY|RANGE|NESTED|PRESENT|ABSENT|SUPERSET|INSIDE|FULL|ALONGSIDE|REQUIRED|MAY|SAME|OMITS|OWN|AFTER|REFINES|NON-NULL|STRUCTURAL|UNVERSIONED|DEPLOYED|OLDER)\b' guides/database.md src/server/helpers.ts` prints nothing; `grep -n 'three persistent\|two-table\|guarantee' guides/database.md` prints nothing; `grep -n 'database/server\|database/browser' guides/database.md` shows the `SQLiteDriverOptions`, `QueryPlan`, and `CompiledSQL` rows.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `test:src:core` as an observation (the host is under load; report a timing red with its reading, do not diagnose it).

## Output

`/home/user/scaffold/tmp/units/d7n-database-converge-fix-report.md`: per item the hunk, per criterion the command and its last lines, the sweep's pattern and paths and the hits ruled permitted, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red or a cell Ruling 12 cannot express. Decide ancillary matters (which contrast word replaces an emphasis word) and record them.
