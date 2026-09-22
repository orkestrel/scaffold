# Unit F5c TOKENS-TRUTH — report 3 (the second fix round)

Both findings the brief carried are closed. `collectReferenceRows` refuses a `Role` row whose value
cell states a surplus value and a `Role` table whose header carries a column the reader resolves and
that branch does not consume, and the mutation-control case holds no nested function.

Effective brief: `tmp/units/f5c-brief-3.md`. It supersedes neither earlier brief; both stay unedited.

## Red-then-green readings

Command for each: `npm run test:setup`.

| Reading                                      | Tests                        |
| -------------------------------------------- | ---------------------------- |
| Baseline, before any edit                    | `132 passed (132)`           |
| Plants present, reader unchanged             | `2 failed \| 132 passed (134)` |
| Plants present, reader changed               | `134 passed (134)`           |

### `refuses a role table carrying a column it does not read`

Red message, verbatim from the failing run:

```text
AssertionError: expected [Function] to throw error including 'Reference row <header>: a Role table …' but got 'Reference row `primary`: the value ce…'
Expected: "Reference row <header>: a Role table carries no Dark column"
Received: "Reference row `primary`: the value cell `oklch(0.5 0.1 200)`, dark `oklch(0.8 0.1 200)` states no light fill"
```

The received message is the defect itself: the `Dark` column was consumed as `shaded`, which turned
`split` off and made the cell's own mode split unreadable. A `Role | Light | Dark` table therefore
either threw for the wrong reason or, where the light cell stated a single fill, returned the light
value as the dark one.

### `refuses a role cell stating a surplus value`

Red message, verbatim:

```text
AssertionError: expected [Function] to throw an error
- Expected: null
+ Received: undefined
```

No throw: the surplus span was dropped and the row returned unchanged.

The case carries its control inline. The same cell mutated to a single fill and no surplus
(`` `red` ``) returns `{ token: '--vn-color-primary-base', light: 'red', dark: 'red', source: 'elements' }`,
so the refusal distinguishes a surplus cell from an accepted one rather than firing on every role.
The control for the header plant is the sibling case
`reads a reference map into one row per token, each carrying a value for both modes`, which runs the
unmutated `REFERENCE_MARKUP` value through the same reader and stays green.

## Exact refusal wording

```text
Reference row <header>: a Role table carries no ${header} column
Reference row ${keyText}: the value cell ${lightText} states no single fill
```

Rendered by the plants:

```text
Reference row <header>: a Role table carries no Dark column
Reference row `primary`: the value cell `oklch(0.5 0.1 200)`, `red` states no single fill
```

The header refusal fires per table, before the row loop, for the headers `Tier`, `Token`, `Light`,
`Light expression`, `Fill`, `Value`, `Dark`, and `Dark expression`, excluding the one value column
the reader chose. The cell refusal fires in the `Role` branch when the cell states no mode split and
its span count is not one.

## Touched files

- `tests/setupStyles.ts` — the `Role` header refusal before `shaded` resolves, the `Role` cell
  cardinality refusal in the branch, and the `@remarks` sentence stating the `Role` table's shape.
- `tests/setupStyles.test.ts` — the cases `refuses a role table carrying a column it does not read`
  and `refuses a role cell stating a surplus value`, and the inlined readings in
  `states a dark value the dark cell alone decides`.

## Status and diffstat

`git status --porcelain`:

```text
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/tokens.test.ts
```

`git diff --stat -- tests/setupStyles.ts tests/setupStyles.test.ts`:

```text
 tests/setupStyles.test.ts | 175 +++++++++++++++++++-
 tests/setupStyles.ts      | 403 +++++++++++++++++++++++++++++++++++++++++++++-
 2 files changed, 576 insertions(+), 2 deletions(-)
```

`tmp/probe/` was never created. `grep -n 'const tier' tests/setupStyles.test.ts` prints nothing and
exits 1.

## Gate exits

| Command                    | Exit | Reading                          |
| -------------------------- | ---- | -------------------------------- |
| `npm run format:check`     | 0    | `All matched files use the correct format.` over 209 files |
| `npm run lint:check`       | 0    | no output                        |
| `npm run check`            | 0    | root, `src:core`, `src:browser`, `src:styles`, `app:browser` |
| `npm run test:setup`       | 0    | `134 passed (134)`               |
| `npm run test:src:styles`  | 0    | `413 passed (413)`, observation  |

`oxfmt --write` ran scoped to the two owned files, never tree-wide.

## Deviations

Both are ancillary choices the deviation contract grants this unit. Neither stopped the work.

1. **The surplus plant mutates through a copy rather than appending.** The brief describes the plant
   as `REFERENCE_MARKUP` with `` , `red` `` appended to a role's Fill cell. The only role row in
   `REFERENCE_MARKUP` carries a mode-split cell
   (`` `oklch(0.5 0.1 200)`, dark `oklch(0.8 0.1 200)` ``), and appending there yields
   `splitCellSpans` returning nothing for both separators, so the reader refuses with
   `states no light fill` instead of naming a surplus. The case replaces the mode split with
   `` `oklch(0.5 0.1 200)`, `red` `` in a mutated copy, which is a role cell stating a surplus value
   and reaches the refusal the obligation names. The deviation contract names this choice as the
   unit's own.
2. **The header refusal covers the columns this reader resolves, not every column.** The brief's
   parenthetical reads "any column outside the header shape the reader resolves". Read literally that
   refuses `Alias`, which every table in the guide's reference map carries and no reader consumes, so
   the real guide would be refused. The refusal is scoped to the header names `findColumnIndex`
   resolves, minus `Role`, minus `Source`, and minus the value column the reader chose. `Alias` sits
   outside the reader's vocabulary and is untouched. This covers `Dark` and `Dark expression` beside
   `Fill`, a second value column, and a `Tier` or `Token` column mixed into a `Role` table.

## Observations, not criteria

- **The `Role` table's header contract is stated only in TSDoc.** `guides/veneer.md` is off-limits to
  this unit, and its Reference map prose describes cell forms without stating which columns a `Role`
  table may carry. The rule lives in the `collectReferenceRows` `@remarks` block. A carrier for the
  guide sentence is not yet named.
- **`split` is now honest inside a `Role` table.** With the header refusal in place, `shaded` is
  always `undefined` there, so `shaded === undefined && modes.length === 2` reads the cell rather
  than reading whatever a surplus column did to it.
- **`npm run test:src:styles` ran green under possible contention.** Another worktree's gate chain
  may have run beside it; it passed, so contention did not bite. The authoritative run is the
  Orchestrator's.

## Claims flagged unverified

None. Every reading in this report comes from a command run in `/home/user/veneer-f5c` and recorded
with its output. No bench lane ran.
