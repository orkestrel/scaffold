# Checker lane — unit database-prose (a follow-on in /home/user/fleet/database)

## Role and engine

`checker` on the Cursor bench, read-only, in `/home/user/fleet/database`. Perform the assignment directly and spawn nothing. Never edit, never run a command that changes the tree.

## Subject

The follow-on unit `database-prose` (brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/database-prose-brief.md`, report `/home/user/scaffold/tmp/units/followon/database-prose-report.md`, evidence `/home/user/work/evidence/conform-database.diff` and `conform-database.status`), on the landed tip `67c50a9`, uncommitted.

## Claims

1. Every site the report names is applied in the tree: the `via` sites in `tests/src/core/Query.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/Database.test.ts`, `tests/src/core/Table.test.ts`, `tests/src/browser/drivers/IndexedDBDriver.test.ts`, `tests/src/server/drivers/SQLiteDriver.test.ts`, and `tests/src/server/compilers.test.ts` read `through` or `by using`; the `now` and `currently` sites in `guides/database.md` (formerly lines 475, 488, 663, 665, 740, 778, 826, 1561, and 1942) carry no temporal `now` or `currently`, the fence comment formerly at 1942 reading `connects immediately`.
3. The sweeps `\b(via|e\.g\.|i\.e\.)\b` over the non-vendored `tests/**` and `\b(now|currently)\b` over `guides/database.md` (both case-insensitive; excluding `node_modules`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`) return no hit in a banned sense; re-run them and rule every hit by sense (`NaN now equals NaN` at `tests/src/core/helpers.test.ts` names a value relationship inside a test title and is outside the brief's rows; a code token or a wire value is permitted).
5. `tests/guides.test.ts` carries no presence guard quoting a sentence the unit changed (grep the changed sentences' old and new text), and the guide's method tables and Surface rows are untouched by the diff.
7. `/home/user/work/evidence/conform-database.status` lists only `guides/database.md` and the seven test files claim 1 names, and the diff carries no hunk outside them and none under `src/**`.
9. No `TODO`, deferred row, skipped test, `.only`, or debug residue entered on an added line; no replacement changed a wire value, an identifier, or an assertion's expected value (read each `tests/**` hunk and rule it a comment or a title change); the report's sites match the diff hunk for hunk.

Claims 2, 4, 6, and 8 are not held by this lane; mark them `not held`.

## Output

Per-claim verdicts (`CONFIRMED`, `REFUTED`, or `UNRESOLVED` with `file:line` evidence), `Findings outside the claims`, `Referrals`, `Claims attacked and held`, exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <ids or none>`, then `Journal` (leave for the driver) and `Deviation` (any tree change observed, or none).
