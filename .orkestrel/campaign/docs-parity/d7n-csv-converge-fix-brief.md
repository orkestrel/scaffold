# Brief — `d7n-csv-converge-fix` (slice 2's audit findings on csv)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/csv` from its branch tip (clean; `@orkestrel/guide@0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Read `/home/user/scaffold/AGENTS.md` § Writing, `.claude/rules/writing.md` § Not adopted (the spaced em dash), `.claude/rules/documentation.md` § Parity (a false prose claim), then `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice2-audit-verdict.md`, `rulings.md` § Ruling 12, the subjective lane's F3, F7, F8, F9 and the objective lane's A, C, and claim 15 in `d7n-slice2-audit-{subjective,objective}.md`, and the pilot's examples loop at `/home/user/fleet/abort/tests/guides.test.ts:206-235`.

## Items

1. **The examples binding (claim 15).** `tests/guides.test.ts:234` region: hoist the mapped `examples` ternary out of the `it` callback to sit beside `documented` at the loop's own scope, matching the pilot byte for byte outside this package's constants.
2. **Prose truth (F7).** `src/core/types.ts` `RowResult`'s description reads "either the row, or the error that excluded it" where `buildRow` (`src/core/helpers.ts:902` region) returns `{ row, error }` under `ragged: 'collect'`. Rewrite the description to the truth the code and its own `@remarks` state (the row, the error that excluded it, or both under `ragged: 'collect'`), then `npm run docs -- --to guide` carries the cell.
3. **The em dash (F8, A).** Every description paragraph under `src/core/**` that breaks a clause with a spaced hyphen (` - `) or writes `->` in prose takes the spaced em dash (` — `) the writing rules fix; then `npm run docs -- --to guide` and the scoped format, so the cells read in the guide's voice. Record each block changed.
4. **§ Surface's lead-in (F9).** `guides/csv.md:28` region: "A short intro, then a minimal usage example:" becomes what the reader does ("Parse a document, read its rows as typed records, and query them:" or the sentence the fences support).
5. **The README count (C).** `README.md:10` region: "options on those two calls" names the calls (`createCSV` and `renderCSV`).
6. **The `Shape` idiom (Ruling 12).** The convention sentence above each table carrying `Shape` states the fleet's idiom; rewrite every row that spells member types (`:47`), or optional-marked names with types (`:62`), to bare names in braces with `?` for optional, splitting on a pipe not preceded by a backslash; compare every other cell against the baseline with `node /home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/pass/cells/compare-cells.mjs /home/user/fleet/csv HEAD guides/csv.md` and paste its output.
7. `npm run docs` at zero, `--to guide` and `--to source` at `written: 0`, the suite green after the items.

## Scope

Owned: `guides/csv.md`, `README.md`, the doc blocks under `src/core/**` (whole; no code token moves), `tests/guides.test.ts`. Off-limits: everything else.

## Acceptance criteria

1. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned paths>`, `npm run check` exit 0.
2. `npm run docs` exit 0 at `rows read: 1, disagreements found: 0`; `--to guide` and `--to source` at `written: 0`; `npm run test:guides`, `npm run test:policy`, `npm run test:src:core` exit 0.
3. The comparator's output shows no row missing or added and every changed non-`Summary` cell in `Shape`.
4. `git status --short` lists the owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-csv-converge-fix-report.md`: per item the hunk and the runs, per criterion the command and its last lines. No count in prose; cite the tree you leave; describe the pin only in the words the file carries. No process diary.

## Deviation contract

Stop if a description's truth cannot be settled from the code, if a correction needs a file outside the owned set, or if `docs` leaves zero after the propagation.
