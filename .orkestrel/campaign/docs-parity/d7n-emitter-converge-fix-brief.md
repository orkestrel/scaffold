# Brief — `d7n-emitter-converge-fix` (slice 2's audit findings on emitter)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/emitter` from its branch tip (clean; `@orkestrel/guide@0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Read `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice2-audit-verdict.md`, `rulings.md` § Ruling 12, the subjective lane's F2, F3, F4 and the objective lane's claim 28 in `d7n-slice2-audit-{subjective,objective}.md`, and the pilot's examples loop at `/home/user/fleet/abort/tests/guides.test.ts:206-235`.

## Items

1. **The examples binding (claim 28).** `tests/guides.test.ts:220` region: hoist the mapped `examples` ternary out of the `it` callback to sit beside `documented` at the loop's own scope, matching the pilot byte for byte outside this package's constants.
2. **`GUIDE_SPEC` (F2).** `tests/guides.test.ts:273` region reads the guide through a repeated literal; use `GUIDE_SPEC`.
3. **The class row (F4).** `guides/emitter.md:63` region and the `Emitter` class's doc block: "Implements the emitter contract over…" becomes "Implements `EmitterInterface` over…" (the interface named as a code token, as abort's and budget's rows do); rewrite the block first, then `npm run docs -- --to guide` carries the cell.
4. **The `Shape` idiom (Ruling 12).** The convention sentence above each table carrying `Shape` states the fleet's idiom; rewrite every row that departs from it (`:75` against `:76`), splitting on a pipe not preceded by a backslash; compare every other cell against the baseline with `node /home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/pass/cells/compare-cells.mjs /home/user/fleet/emitter HEAD guides/emitter.md` and paste its output.
5. `npm run docs` at zero, `--to guide` and `--to source` at `written: 0`, the suite green after the items.

## Scope

Owned: `guides/emitter.md`, the `Emitter` class's doc block under `src/core/**`, `tests/guides.test.ts`. Off-limits: everything else.

## Acceptance criteria

1. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned paths>`, `npm run check` exit 0.
2. `npm run docs` exit 0 at `rows read: 1, disagreements found: 0`; `--to guide` and `--to source` at `written: 0`; `npm run test:guides`, `npm run test:policy` exit 0.
3. The comparator's output shows no row missing or added and every changed non-`Summary` cell in `Shape`.
4. `git status --short` lists the owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-emitter-converge-fix-report.md`: per item the hunk and the runs, per criterion the command and its last lines. No count in prose; describe the pin only in the words the file carries. No process diary.

## Deviation contract

Stop if a correction needs a file outside the owned set or if `docs` leaves zero.
