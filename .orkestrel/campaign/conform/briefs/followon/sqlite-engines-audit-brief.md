# Audit brief: follow-on unit sqlite-engines (the Node floor and the added rows)

## Role and engine

`checker` on Claude Sonnet, a native subagent in a clean context, read-only. Perform the audit directly and spawn nothing; never edit.

## Subject

The uncommitted unit in `/home/user/fleet/sqlite` (tip 225bb1c), written by `builder` on Claude Sonnet from `/home/user/scaffold/tmp/units/followon/sqlite-engines-brief.md` (§ Rows and § Added rows); the report `/home/user/scaffold/tmp/units/followon/sqlite-engines-report.md`; the evidence `/home/user/work/evidence/followon-sqlite-engines.diff` and `followon-sqlite-engines.status`.

## Claims

Rule each claim CONFIRMED, REFUTED, or NOT-EVIDENCED with `file:line` evidence read from the tree, never from the report.

1. Each row of the builder brief's § Rows (sqlite-obj-1a to 1d) and § Added rows (sqlite-obj-1e to 1g) is applied at the site the row names, with the replacement text the row quotes; where a row admits two cases (row 4's tagline), the case the tree shows is the one the row prescribes for it.
2. `package.json` differs from tip 225bb1c only in `engines.node`; `version`, `dependencies`, `devDependencies`, `peerDependencies`, `scripts`, and `exports` are unchanged.
3. `.github/workflows/ci.yml` differs from the tip only in the lower entry of the `matrix` `node` list.
4. `src/server/types.ts` differs from the tip only inside the `SQLiteStatementInterface` doc block, and no declaration changed.
5. The status evidence lists exactly `package.json`, `.github/workflows/ci.yml`, `README.md`, `guides/sqlite.md`, and `src/server/types.ts`, and the diff evidence carries no hunk outside those files.
6. `guides/sqlite.md` still names every public export once (the Entities table rows are `SQLiteDatabase` and `SQLiteStatement` with their kinds unchanged), and no fence or claim line the `tests/guides.test.ts` presence guards quote was changed without its guard.
7. The report names `format:check`, `lint:check`, `check`, `build`, and `test` each with exit 0 (a first `format:check` exit 1 converged by `format` is recorded, not hidden), `test:guides` exit 0, and the audit's single zero-drift summary line. The independent gate reading is the Orchestrator's deciding run at landing, which no read-only lane can take: rule that reading NOT-EVIDENCED, never FAIL.
8. No `.skip`, `.only`, `.todo`, retry, or inflated timeout enters the diff, and no TODO or commented-out code.

## Output

Per-claim verdicts with evidence, under 120 words each; findings outside the claims, each with the exact prescription that closes it; and exactly one terminal line `PASS` or `FAIL <claim numbers>`.
