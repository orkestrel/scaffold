# Unit flip-journeys-3 — finish U6 after the resolved-value ruling

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files.

## Objective

Complete unit U6 exactly as `/home/user/scaffold/tmp/codex/flip-journeys-brief.md` (with its appended rulings) and `/home/user/scaffold/tmp/codex/flip-journeys-2-brief.md` (the partition-scope ruling) specify, starting from the partial tree the second run left uncommitted, under the ruling in § The resolved-value ruling. The second run's report is `/home/user/scaffold/tmp/codex/flip-journeys-2-last.md`; the unit's complete report is `/home/user/veneer/tmp/units/flip-journeys/report.md`; the partition evidence is `/home/user/veneer/tmp/units/flip-journeys/second-partition.json`.

## State at launch

`git status --porcelain` reads three modified tracked files, all U6's: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/app/browser/integration.test.ts`. Done: the face and pair rows, the 23 triples, the engine equality, `check` exit 0, the partition case restructured to the delta clauses in the default variant reading 8112 elements with all 192 utility and 17 component names in 16.3 s (97698 clause-1, 5439 clause-2, 48849 clause-3 comparisons; 938 competing-class and 1697 geometry skips) and 162 violations. Not done: the 390px header measurement, `test:setup:browser`, `build`, `build:showcase`, the amended full `test:journey` wall time, `test:app:browser`, `lint:check`, `format:check`.

## The resolved-value ruling

Every one of the 162 violations is a resolved value, not a cascade result (read `second-partition.json`): `margin-inline-end`, `margin-inline-start`, `margin-left`, `margin-right`, `margin-top`, `margin-bottom` on `me-auto`, `ms-auto`, `m-auto`, and `container` elements, whose declared value is `auto` and whose computed value is the layout's pixel result (`95.5px`, `267.922px`, `auto`, `70px` against `0px`); `border-*-style` on elements whose shared utility declares only a width (`border-1`), where Tailwind's preflight `border: 0 solid` supplies the style (`none` against `solid`); and `border-*-width` masked by that style (`0px` against `1px`).

Rulings, each a skip the case records with a count:

1. **Declared-longhand scope.** A longhand enters a clause only when the shared utility's own rule for that clause declares it (Tailwind's rule for clause 1, Bootstrap's for clauses 2 and 3), shorthands expanded. `border-1` declares the four widths and no style; `border` declares style, width, and color.
2. **Resolved declared values.** A longhand whose declared value in that rule is `auto`, a percentage, `inherit`, `currentColor`, or a `calc()` of the viewport is skipped (the geometry class, widened to the declared value); the skip count is reported per clause.
3. **Masked border widths.** A `border-*-width` longhand is skipped where Bootstrap alone reads `0px` on it with `border-*-style: none` on the same side, because the style, not the width, decides the computed value.
4. **Zero violations** after these skips is the assertion; a remaining violation is reported with its key, longhand, face, expected, and read values, and is a stop (expected none, found the list).
5. **Controls stay** (planted `.mt-3`, the restored withheld important, the `unexcluded` inverse, the stripped curation) and must each still fail the case.

## Scope deltas against the earlier briefs

None beyond § The resolved-value ruling.

## Acceptance criteria

The `flip-journeys-2` brief's list, bare, in order, each with its exit in the report: `npm run check`; `npm run lint:check`; `npm run format:check`; `npm run test:setup:browser` green; `npm run build`; `npm run build:showcase` (digest reported, not committed); `npm run test:journey` green with the nine face rows, the partition case's seconds, and the full wall time against 235 s (an overrun reported, not fixed); `npm run test:app:browser` as an observation; `git diff --check`; `sha256sum dist/src/bootstrap/index.css` at `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.

## Return shape

As the earlier briefs, plus the skip counts per clause and ruling, the partition case's seconds, the 390px header reading, and the full journey wall time. Nothing committed.

## Deviation contract

As the earlier briefs, with ruling 4 replacing the second run's stop.
