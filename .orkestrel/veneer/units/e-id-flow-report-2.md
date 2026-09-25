# Unit E-ID-FLOW round 2 report: density titles, the address run, and the nested-list record

Every finding the round carries is closed. Each density case's title states both halves. The `address` literal mutation reads red. Each of the guide's nested-list Excluded rows carries the verbatim clause. The nested-list case reads red under its named mutation. Every gate this round names exits 0. Worktree: `/home/user/veneer-flow`, base `6882751`, round 1 still uncommitted beneath this round. Nothing is committed.

## Changes

- **F1.** Each density case is retitled to state both halves. `address.test.ts`, `ol.test.ts`, `p.test.ts`, and `ul.test.ts` under `tests/src/styles/elements/` now read `takes the release block margins at the default density and scales the block-end margin with the density factor`.
  - `tests/src/styles/elements/heading.test.ts` reads `takes the release block margins on every level at the default density and scales the block-end margin with the density factor`.
  - `tests/src/styles/components/type.test.ts` reads `takes the release block margins on the $twin class at the default density and scales the block-end margin with the density factor`.
  - Assertions and comments are unchanged.
- **F2.** No source change. The mutation run is in the following mutation table.
- **F3, guide** (`guides/veneer.md`, shared). The Reason cell of each Excluded row for `ol ol`, `ul ul`, `ol ul`, and `ul ol` reads: ``Nested list treatment infers styling from tag composition, so an inner list keeps the list's `1rem` bottom margin where the release writes `0`; the `.mb-0` class removes it.`` The clause replaces the cell's closing period. The table's column width already held the longer cell, so `oxfmt` realigned only these rows.
- **F3, proof** (`tests/src/styles/elements/ul.test.ts`, owned). The added case is `keeps the block-end margin on a list nested in a list item, and the .mb-0 class removes it`.
  - Fixture: an outer `ul` whose first `li` holds a bare inner `ul` and whose second `li` holds an inner `ul.mb-0`. The unit settled this fixture itself.
  - Selection: both inner lists are taken by `li > ul`. The case asserts their class names first, so the fixture cannot swap them unnoticed.
  - Assertions: the bare inner list reads `margin-bottom` 16px, and the `.mb-0` inner list reads 0px.

## Mutation table

`/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/flow-mutate.sh`, from round 1, runs each mutation. The script copies the file, applies the mutation, rebuilds the styles, runs the named file, restores the copy, and compares the SHA-256 digests. `/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/flow-2.sh` rebuilds the styles from the restored source before any gate runs.

| Mutation | Assertion it reddens | Reading | Log | Restore |
| --- | --- | --- | --- | --- |
| `src/styles/elements/_address.scss` `var(--vn-space-8)` → `1rem` | `address` density case, `release * 2` (`expected 16 to be 32`) | 1 failed, 2 passed | `/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/logs/mutation-address-literal.log.txt` | identical, `95351988…2011` |
| `src/styles/elements/_ul.scss` adds `ul ul { margin-bottom: 0; }` inside `@layer elements` | nested-list case, the bare inner list (`expected +0 to be 16`, `ul.test.ts:61`) | 1 failed, 3 passed | `/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/logs/mutation-nested-list.log.txt` | identical, `d0f4d5c4…ed65` |

## Gate table

The run is `/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/flow-2.sh`, with its console output in `/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/logs/flow-2-run.log.txt`. Each log sits under `/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/logs/` and ends in `exit=<code>`.

| Gate | Exit | Reading | Log |
| --- | --- | --- | --- |
| `npm run build:src:styles` (before the owned run) | 0 | — | `build-r2-before.log.txt` |
| Owned files plus `card.test.ts` (styles project), before the mutations | 0 | 85 passed | `owned-r2-before.log.txt` |
| `npm run build:src:styles` (from the restored source) | 0 | — | `build-r2.log.txt` |
| Owned files plus `card.test.ts` (styles project), after the restore | 0 | 85 passed | `owned-r2.log.txt` |
| `npm run test:src:styles` | 0 | 1475 passed | `src-styles-r2.log.txt` |
| `npm run test:conformance` | 0 | 26 passed | `conformance-r2.log.txt` |
| `npm run test:guides` | 0 | 20 passed | `guides-r2.log.txt` |
| `npm run format:check` | 0 | — | `format-check-r2.log.txt` |
| `npm run lint:check` | 0 | — | `lint-check-r2.log.txt` |
| `npm run check` | 0 | — | `check-r2.log.txt` |

No timing failure occurred.

## Shared-file hunks

This round changes one shared file. The exact bytes are in `/home/user/scaffold/.orkestrel/veneer/units/flow-2.diff`.

- `guides/veneer.md`, § Deferred selectors table: each Reason cell for the `ol ol`, `ul ul`, `ol ul`, and `ul ol` rows changes as follows.

  ```diff
  -Nested list treatment infers styling from tag composition.
  +Nested list treatment infers styling from tag composition, so an inner list keeps the list's `1rem` bottom margin where the release writes `0`; the `.mb-0` class removes it.
  ```

  The cell padding shrinks to keep the column width.

The round-1 hunks in `src/styles/_mixins.scss`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and the ledger rows of `guides/veneer.md` are unchanged. `/home/user/scaffold/.orkestrel/veneer/units/e-id-flow-report.md` lists them.

## Diff and status

- `/home/user/scaffold/.orkestrel/veneer/units/flow-2.diff` is `git diff 6882751`, covering round 1 and round 2 together.
- `/home/user/scaffold/.orkestrel/veneer/units/flow-2-status.txt` is `git status --short`. It lists the same modified paths as round 1, and this round adds no path. This round's edits are in `guides/veneer.md`, `tests/src/styles/components/type.test.ts`, and `tests/src/styles/elements/{address,heading,ol,p,ul}.test.ts`.

## Deviation state

No stop. The unit settled these choices itself:

- It built the nested-list fixture with bare inner lists taken by `li > ul`, with no marker classes, so only the tag rule and `.mb-0` act on them.
- It placed `on every level` and `on the $twin class` right after `block margins`, which is where the round-1 titles placed them.
- It ran `npm run format:check`, `npm run lint:check`, and `npm run check` in addition to the named gates, because the common criteria require them.

Observation: the new nested-list case was written against round 1's source, so its red reading comes from the named mutation rather than from a pre-change run.
