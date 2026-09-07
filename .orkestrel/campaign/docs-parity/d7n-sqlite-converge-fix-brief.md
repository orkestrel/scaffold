# Brief — `d7n-sqlite-converge-fix` (sqlite's fix round on the audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/sqlite` from the committed tip `3b211a0` (clean; `@orkestrel/guide@0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-sqlite-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.claude/rules/documentation.md` § Parity; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13, § Ruling 15; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-single-face-audit-verdict.md`; the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole and its Types table `/home/user/fleet/abort/guides/abort.md:58-67`; `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row).

## Items

1. **The `examples` binding (S1).** Hoist the mapped `examples` ternary out of the `it` body at `tests/guides.test.ts:212-228` to the examples loop's own scope above its `describe`, so the block matches the pilot's `:209-228` byte for byte (Ruling 13). Show the diff of the block against the pilot.
2. **The `Shape` column (S2, Ruling 15).** `### Types` (`guides/sqlite.md:60-72`) heads `API | Kind | Shape | Summary` under Ruling 15's convention sentence; each interface row's data members as bare names, `?` on an optional one, `plus` its call-signature members (`SQLiteDatabaseInterface`: `{ path, connected, transacting } plus prepare, execute, transact, begin, commit, rollback, …` — read `src/server/types.ts:149-` for the exact list, `[Symbol.dispose]` written as such; `SQLiteStatementInterface`, `SQLiteExecuteResult` `{ changes, rowid }`, `SQLiteDatabaseOptions` `{ path, readonly?, timeout?, foreignKeys?, bigints? }`); each type alias's own literal with `\|` (`SQLiteValue`, `SQLiteRow`, `SQLiteParameters`, `SQLiteBinding`, `SQLiteErrorCode`). The `Summary` header stays last. A description that is only a member list is rewritten to state what the type represents, then `--to guide`; a description that names members inside a sentence about the type stays. The paragraph at `:80` keeps its behavioural sentences about `transacting`; a clause that only lists members a `Shape` cell now holds goes.
3. **The upstream reference (S3).** Re-attach [`node:sqlite`](https://nodejs.org/api/sqlite.html) as a link in the opening prose (`guides/sqlite.md:7-12`), beside the "Requires Node.js" sentence.
4. **Cross-references as links (S4).** `src/server/SQLiteDatabase.ts:14` and `src/server/SQLiteStatement.ts:12` write `` `SQLiteDatabaseInterface` `` and `` `SQLiteStatementInterface` `` as plain code spans where the files write `{@link …}` elsewhere; write them as `{@link …}` (the compared form is unchanged, so `docs` stays at zero).
5. **All-caps (S5).** `guides/sqlite.md:116` "OLD", `:230` "EVERY" → plain wording ("the earlier connection", "every integer column").
6. **Propagation.** `npx oxfmt --write <paths>` after edits; `npm run docs -- --to guide` after any description edit; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/sqlite.md`, the doc blocks under `src/server/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned .ts paths>`, `npm run check` exit 0.
3. `npm run docs` at zero, both directions `written: 0`.
4. `grep -c 'A `Shape` cell holds' guides/sqlite.md` reads the sentence once above `### Types`; no `interface` row's `Shape` cell carries `:`; `grep -n 'OLD\|EVERY' guides/sqlite.md` prints nothing.
5. The examples block equals the pilot's (`diff` empty).
6. `npm run test:guides` and `npm run test:policy` exit 0 (record the summaries).

## Output

`/home/user/scaffold/tmp/units/d7n-sqlite-converge-fix-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No count in prose. No process diary. Re-read every citation against the tree you leave.

## Deviation contract

Stop on a gate outside the owned files going red, or a `Shape` cell Ruling 12 cannot express. Decide ancillary matters and record them.
