Lane held: checker sqlite

**Claim 1** — Every item the fix brief names landed in the diff as stated, and nothing else changed (scope honesty against the status file).
PASS. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-sqlite-converge-fix.status.txt` lists exactly `guides/sqlite.md`, `src/server/SQLiteDatabase.ts`, `src/server/SQLiteStatement.ts`, `src/server/types.ts`, `tests/guides.test.ts` — all inside the brief's owned scope (`guides/sqlite.md`, doc blocks under `src/server/**`, `tests/guides.test.ts`); none of the off-limits files (`README.md`, vendored files, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`) appear. Each brief item (S1–S5) has a matching hunk in `d7n-sqlite-converge-fix.diff.txt`: S1 (`tests/guides.test.ts` hoisted `examples` block), S2 (`guides/sqlite.md:60-77` `Shape` column plus `src/server/types.ts` description rewrites), S3 (`guides/sqlite.md:9-11` `node:sqlite` link), S4 (`{@link}` in `SQLiteDatabase.ts:14,16` and `SQLiteStatement.ts:12,14`), S5 (`OLD`→"the earlier connection", `EVERY`→"every" at `guides/sqlite.md:116,230`). The one item not in the numbered brief list — the `INTERNAL` doc-block wording fix in `tests/guides.test.ts` — is inside an owned file, is recorded as an ancillary decision under Ruling 13, and the brief's deviation contract explicitly permits deciding and recording ancillary matters.

**Claim 2** — The report's citations match the tree the unit left; the report states no count in prose; the pin is described only in the words the file carries.
PASS. Citation spot-check: the report claims the `### Types` table sits at `guides/sqlite.md:65-75`; reading `/home/user/fleet/sqlite/guides/sqlite.md:65-77` confirms the table occupies exactly that span with the trailing pointer sentence at line 77. The examples-block diff citation against the pilot (`/home/user/fleet/abort/tests/guides.test.ts:209-228`) matches `tests/guides.test.ts:212-231` in the tree, confirmed directly (both blocks read identically). A word-boundary sweep for the banned-term table and for bare digits over the report's own prose (excluding quoted diff hunks, regex patterns, verbatim command output, exit codes, and timestamps) turned up no writer-stated count: instrument names are listed rather than counted, and every numeral present is either a line-range citation, a timestamp, or literal tool output (`612ms`, `36 passed (36)`, `grep -c` → `1`). The "pin" clause (Ruling 11's guard-and-continue canon) names no sqlite item in this brief or report; nothing in the sqlite report describes a pin, so this sub-clause is vacuous rather than violated.

**Claim 3** — Each named correction is present as the audit's finding asked (sqlite items).
PASS, verified directly against the checked-out tree at `/home/user/fleet/sqlite`, not only against the report:
- Hoisted `examples` binding: `tests/guides.test.ts:215-221` binds `examples` above the `describe`, matching the pilot's `:209-228` block content read at `/home/user/fleet/abort/tests/guides.test.ts:209-228`.
- `Shape` column, Ruling 15's sentence verbatim at `guides/sqlite.md:63`; `SQLiteDatabaseInterface`'s cell at `guides/sqlite.md:75` reads `{ path, connected, transacting } plus connect, close, execute, prepare, transact, begin, commit, rollback, pragma, [Symbol.dispose]`, naming `path` and `connected`.
- `node:sqlite` link present at `guides/sqlite.md:9-10`.
- `{@link}` cross-references present at `src/server/SQLiteDatabase.ts:14,16` and `src/server/SQLiteStatement.ts:12,14`.
- All-caps gone: `grep -n 'OLD|EVERY' guides/sqlite.md` returned no matches.

Findings outside the claims: none. The report's own "Observation, outside this unit's scope" section (the `NEW`/`OLD` body comment in `SQLiteDatabase.ts:91-93` and the plain-span `SQLiteError` references in `errors.ts`/`helpers.ts`) is correctly named as out of this unit's scope and not part of S1–S5; no further undisclosed drift found.

Referrals: none — every criterion here resolved on direct evidence.

VERDICT: PASS
