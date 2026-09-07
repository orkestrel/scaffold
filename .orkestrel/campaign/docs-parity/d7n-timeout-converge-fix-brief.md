# Brief — `d7n-timeout-converge-fix` (slice 4a's audit findings on timeout)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/timeout` from its branch tip (clean; `@orkestrel/guide@0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Read `/home/user/scaffold/AGENTS.md` § Writing, `.claude/rules/writing.md` § Code tokens, then `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice4a-audit-verdict.md`, `rulings.md` § Ruling 12, the subjective lane's F1, F4, F5, F6 and the objective lane's claim 2 and F6 in `d7n-slice4a-audit-{subjective,objective}.md`, and the pilot's constants block and examples loop at `/home/user/fleet/abort/tests/guides.test.ts:26-45` and `:206-235`.

## Items

1. **The examples binding (claim 2).** `tests/guides.test.ts:221` region: hoist the mapped `examples` ternary out of the `it` callback to sit beside `documented` at the loop's own scope, matching the pilot byte for byte outside this package's constants.
2. **The constants' order (F6).** Move `GUIDE_SPEC` to the pilot's position between `EXAMPLE_LANGUAGE` and `MODULES`.
3. **The `Shape` idiom (Ruling 12, F1).** The convention sentence above the Types table states the fleet's idiom; rewrite `TimeoutOptions`' row (`:79-84` region) to bare names in braces with `?` for optional, keeping `TimeoutInterface`'s form, splitting on a pipe not preceded by a backslash; compare every other cell against the baseline with `node /home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/pass/cells/compare-cells.mjs /home/user/fleet/timeout HEAD guides/timeout.md` and paste its output.
4. **The `Shape` members' sentence (objective F6).** `guides/timeout.md:86-89` region: "are `readonly` data members (Surface rows, earlier)" names rows that exist only inside the `Shape` cell; reword to name them as the interface's `readonly` members the `Shape` cell lists, with `start` and `clear` its methods.
5. **Prose (F4, F5).** `:19` region: "`clear()` the deadline if the work finishes first" → "call `clear()` on the deadline if the work finishes first"; `:41` and `:131` regions: `CLEARS` in capitals → `clears`, the contrast carried by the sentence; sweep the guide and the README for any other code token used as a verb, all-caps emphasis, or count in prose and correct each, recording every site.
6. `npm run docs` at zero, `--to guide` and `--to source` at `written: 0`, the suite green after the items.

## Scope

Owned: `guides/timeout.md`, `README.md`, `tests/guides.test.ts`. Off-limits: everything else.

## Acceptance criteria

1. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned paths>`, `npm run check` exit 0.
2. `npm run docs` exit 0 at `rows read: 1, disagreements found: 0`; `--to guide` and `--to source` at `written: 0`; `npm run test:guides`, `npm run test:policy` exit 0.
3. The comparator's output shows no row missing or added and every changed non-`Summary` cell in `Shape`.
4. `git status --short` lists the owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-timeout-converge-fix-report.md`: per item the hunk and the runs, per criterion the command and its last lines. No count in prose; describe the pin only in the words the file carries. No process diary.

## Deviation contract

Stop if a correction needs a file outside the owned set or if `docs` leaves zero.
