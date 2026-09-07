# Brief — `d7n-html-converge-fix` (slice 3's audit findings on html)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/html` from its branch tip (clean; `@orkestrel/guide@0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Read `/home/user/scaffold/AGENTS.md` § Writing, `.claude/rules/writing.md`, then `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice3-audit-verdict.md`, `rulings.md` § Ruling 12 and § Ruling 13, the subjective lane's claim 9 and S-1 to S-5, F-1, and the objective lane's claim 9 and finding 4 in `d7n-slice3-audit-{subjective,objective}.md`, and the pilot's drop-in `/home/user/fleet/abort/tests/guides.test.ts`.

## Items

1. **Counts and all-caps (claim 9).** In `guides/html.md` and every doc block under `src/core/**`: name the members or drop the number at `:16`, `:68`, `:102`, `:170` and their source blocks (`MAX_DEPTH`, `findOpenPosition`); lower every emphasis the objective lane lists (`ALREADY`, `REPLACES`, `THE`, `DEFAULTS`, `EXACTLY`, `BEFORE`, `NOT`, `WHOLE`, `KEPT`, `DERIVED`, `WITH`) to plain wording in the guide cells, `src/core/HTML.ts`, `src/core/constants.ts`, and `src/core/types.ts`, rewriting the block first and propagating with `npm run docs -- --to guide`. Sweep both files and every owned block for any remaining count or emphasis and record each site.
2. **`HTML.ts:56` (S-3, objective 4).** Rewrap the bullet to the block's width and state the `distill` order the code runs (read `src/core/HTML.ts:249-271`), replacing the vague wording.
3. **The opening sentence (S-2).** `guides/html.md:8` region restates the tagline; rewrite the opening prose to carry what the tagline does not.
4. **`HTMLInterface`'s row (S-4).** Its description names the operations the interface declares (query, rewrite, fold, reduce, `stream`, `sanitize`, `distill`), not fewer than the class row; rewrite the block, propagate.
5. **The `Shape` idiom (Ruling 12, S-1, S-5).** The convention sentence above each table carrying `Shape` states the fleet's idiom; rewrite every row that spells member types or mixes spellings to bare names in braces with `?` for optional; a generic alias keeps its own literal with its parameter binding (`HTMLScan<TNode extends HTMLNode>` = `{ node, next }` — the binding stays in the cell, the members bare), so `TNode` and `T` are bound where they appear. Split on a pipe not preceded by a backslash; compare every other cell with `node /home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/pass/cells/compare-cells.mjs /home/user/fleet/html HEAD guides/html.md` and paste its output.
6. **The drop-in (Ruling 13, F-1).** `tests/guides.test.ts`: the examples case is named `documents an example for every Surface function`; the equality case sits directly after the methods loop and before the examples case, as in the pilot's original order; the `INTERNAL` doc block reads "the assertion that follows it"; the file matches the pilot byte for byte outside this package's constants.
7. `npm run docs` at zero, `--to guide` and `--to source` at `written: 0`, the suite green after the items.

## Scope

Owned: `guides/html.md`, `README.md`, the doc blocks under `src/core/**` (whole; no code token moves), `tests/guides.test.ts`. Off-limits: everything else.

## Acceptance criteria

1. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>`, `npm run check` exit 0.
2. `npm run docs` exit 0 at `rows read: 1, disagreements found: 0`; `--to guide` and `--to source` at `written: 0`; `npm run test:guides`, `npm run test:policy`, `npm run test:src:core` exit 0.
3. The comparator's output shows no row missing or added and every changed non-`Summary` cell in `Shape`.
4. `git status --short` lists the owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-html-converge-fix-report.md`: per item the hunk and the runs, per criterion the command and its last lines. No count in prose; cite the tree you leave. No process diary.

## Deviation contract

Stop if a correction needs a file outside the owned set or if `docs` leaves zero after the propagation.
