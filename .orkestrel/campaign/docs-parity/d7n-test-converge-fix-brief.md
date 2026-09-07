# Brief — `d7n-test-converge-fix` (the test audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/test` from its branch tip (clean; `@orkestrel/guide@0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Read `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-test-audit-verdict.md` and the subjective lane's F1 to F3 in `d7n-test-audit-subjective.md` first; the pilot's placement is `/home/user/fleet/abort/guides/abort.md:60-62`.

## Items

1. **The `Shape` convention sentence above every table that carries the column.** `guides/test.md:128-131`, `:238-239`, `:600-601` sit under their tables and `:605` above; move each to sit directly above its table, one sentence per table, worded against that table's rows.
2. **One header for a constant's declared type.** `guides/test.md:135` and `:243` head that column `Signature`; `:607` heads it `Shape`. Rename the core and browser Constants tables' column to `Shape`, splitting rows on a pipe not preceded by a backslash, and give each a convention sentence above it (`A `Shape` cell holds the constant's declared type.`). The readers locate the compared column by `Summary`, so `docs` stays at zero; confirm.
3. **§ Tests names the titled fence.** `guides/test.md` § Tests: "the titled fence against the `@example` block of that title" → "the titled `Own a temporary directory` fence against the `@example` block of that title".
4. After the edits, run `node /home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/pass/cells/compare-cells.mjs /home/user/fleet/test HEAD guides/test.md` and paste its output: every changed cell must be the renamed header's column and nothing else, with no row missing or added.

## Scope

Owned: `guides/test.md`. Off-limits: everything else.

## Acceptance criteria

1. `npx oxfmt --check guides/test.md` and `npx oxlint --config .oxlintrc.json --deny-warnings guides/test.md` exit 0; `npm run test:policy` exit 0.
2. `npm run docs` exit 0 at `rows read: 1, disagreements found: 0`; `npm run test:guides` exit 0.
3. The comparator's output as item 4 states.
4. `git status --short` lists `guides/test.md` only.

## Output

`/home/user/scaffold/tmp/units/d7n-test-converge-fix-report.md`: per item the hunk, per criterion the command and its last lines. No count in prose. No process diary.

## Deviation contract

Stop if a correction needs a file outside `guides/test.md`, or if `docs` leaves zero after the header rename.
