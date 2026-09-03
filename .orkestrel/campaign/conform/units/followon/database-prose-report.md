# Unit database-prose report

## Row 1 — `via` and `e.g.` in tests

Applied. Sweep pattern `\b(via|e\.g\.|i\.e\.)\b` case-insensitive over `tests/**` (excluding the vendored files) found every hit in the banned mechanism sense; no `e.g.` or `i.e.` hit occurred. Sites changed:

- `tests/src/core/Query.test.ts:240` — `via an array path` → `through an array path`.
- `tests/src/core/helpers.test.ts:219` — `via equalsValue` → `by using equalsValue` (kept `NaN now equals NaN`, a value-named `now` outside this row's scope).
- `tests/src/core/Database.test.ts:907` — `// via \`planMigration\`,` → `// by using \`planMigration\`,`.
- `tests/src/core/Table.test.ts:459` — `via the engine` → `through the engine`.
- `tests/src/core/Table.test.ts:571` — `via lazy counting` → `through lazy counting`.
- `tests/src/browser/drivers/IndexedDBDriver.test.ts:393` — `via \`deriveIndexedDBIndexName\`` → `by using \`deriveIndexedDBIndexName\``.
- `tests/src/browser/drivers/IndexedDBDriver.test.ts:1002` — `via migrate` → `by using migrate`.
- `tests/src/browser/drivers/IndexedDBDriver.test.ts:1024` — `via migrate` → `by using migrate`.
- `tests/src/browser/drivers/IndexedDBDriver.test.ts:2033` — `// still reads correctly via a full scan.` → `// still reads correctly through a full scan.`.
- `tests/src/server/drivers/SQLiteDriver.test.ts:736` — `via changes` → `through changes`.
- `tests/src/server/drivers/SQLiteDriver.test.ts:2684` — `// … input via the` → `// … input through the`.
- `tests/src/server/compilers.test.ts:207` — `via Array.from,` → `by using Array.from,`.
- `tests/src/server/compilers.test.ts:486` — `via the declared type.` → `through the declared type.`.

Re-sweep of `tests/**` with the same pattern reads empty.

## Row 2 — `now` in the guide

Applied. Sweep pattern `\b(now|currently)\b` case-insensitive over `guides/database.md` found every hit temporal, in the banned sense. Sites changed:

- `guides/database.md:475` — `\`JSONDriver\` now DOES implement` → `\`JSONDriver\` DOES implement` (deleted).
- `guides/database.md:488` — `Both reference drivers now also implement` → `Both reference drivers also implement` (deleted).
- `guides/database.md:663` — `both now implement` → `both implement` (deleted).
- `guides/database.md:665` — `while \`JSONDriver\` now implements` → `while \`JSONDriver\` implements` (deleted).
- `guides/database.md:740` — `knowing what is currently deployed.` → `knowing what is deployed.` (deleted).
- `guides/database.md:778` — `snapshot boundary now fails conformance` → `snapshot boundary fails conformance` (deleted).
- `guides/database.md:826` — `every flush is now atomic` → `every flush is atomic` (deleted).
- `guides/database.md:1561` — `track what is currently deployed:` → `track what is deployed:` (deleted).
- `guides/database.md:1942` — `// connects now — table() calls after this never wait on it` → `// connects immediately — table() calls after this never wait on it` (gave the timing word instead of deleting, since the comment names a moment in the example's execution order).

No presence guard in `tests/guides.test.ts` quotes any of the changed sentences, so no guard string changed.

Re-sweep of `guides/database.md` with the same pattern reads empty.

## Row 3 — sweep record

- `tests/**` (excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`), pattern `\b(via|e\.g\.|i\.e\.)\b`, case-insensitive: every hit ruled banned mechanism sense and replaced; re-sweep empty.
- `guides/database.md`, pattern `\b(now|currently)\b`, case-insensitive: every hit ruled banned temporal sense and replaced; re-sweep empty.

## Gates

- `npm run format:check` — exit 0 (`All matched files use the correct format.`, 99 files).
- `npm run lint:check` — exit 0 (no output, no violations).
- `npm run check` — exit 0 (`tsc --noEmit` root plus `check:src:core`, `check:src:browser`, `check:src:server`, no diagnostics).
- `npm run build` — exit 0 (core, browser, server bundles and declarations built).
- `npm test` — exit 0 across `test:src`, `test:policy`, `test:config`, `test:setup`, `test:guides`; every project's suite passed, `test:guides` included.

## Audit

`npx scaffold audit --offline` from `/home/user/fleet/database`: `0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.`

## Tree state

`git -C /home/user/fleet/database status --short` lists only Owned paths: `guides/database.md`, `tests/src/browser/drivers/IndexedDBDriver.test.ts`, `tests/src/core/Database.test.ts`, `tests/src/core/Query.test.ts`, `tests/src/core/Table.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/server/compilers.test.ts`, `tests/src/server/drivers/SQLiteDriver.test.ts`.

Evidence captured to `/home/user/work/evidence/conform-database.diff` and `/home/user/work/evidence/conform-database.status` by `node /home/user/scaffold/tmp/work/evidence.mjs database`.
