# Unit F5c TOKENS-TRUTH — report 2 (the fix round)

`opus` on Opus 5.5, sole writer in `/home/user/veneer-f5c`. Every obligation in
`tmp/units/f5c-brief-2.md` is done and the gate chain is green, `npm test` included. One claim is
flagged unverified: the § Reference map Links paragraph points at `§ Outside the ledger`, a heading
F5b lands and this worktree does not yet carry.

The § Reference map value gate can no longer pass while a cell is wrong. The reader refuses every
cell form it cannot read rather than returning `undefined`, so `ReferenceRow.light` and
`ReferenceRow.dark` are required strings and the gate compares every row in both modes with no
skip. The pre-edit population of rows reading `undefined` is closed to nothing.

## Touched files

| File | Change |
| --- | --- |
| `tests/setupStyles.ts` | Makes `ReferenceRow.light` and `.dark` required; gives `collectRowTokens` and `collectReferenceRows` a refusal for every unreadable range, column, table, and cell; moves and renames the scratch map to `REFERENCE_MARKUP` beside `TABLE_MARKUP` with a dark tier expression of its own; adds `UNMAPPED_TOKENS`; extends the readers section comment to name the guide readers |
| `tests/setupStyles.test.ts` | Adds the range-refusal, malformed-table-refusal, unreadable-cell-refusal, dark-cell mutation control, and percentage cases; updates the scratch-map case and the inventory for the renamed and added exports |
| `tests/src/styles/tokens.test.ts` | Removes the `undefined` skip; reads the declaration fallback from the mode's own scope before `:root`; adds the coverage-floor membership assertion and the dark-scope assertion |
| `guides/veneer.md` | States a machine-readable value in every § Reference map cell that carried a description; fixes the cell contract and the comparison paragraph; rewrites the Links departure sentence and the retained-highlight paragraph |

```text
 guides/veneer.md                | 169 +++++++++++-------
 src/core/constants.ts           |   2 -
 src/styles/_mixins.scss         |   6 +-
 tests/setupStyles.test.ts       | 140 ++++++++++++++-
 tests/setupStyles.ts            | 375 +++++++++++++++++++++++++++++++++++++++-
 tests/src/styles/tokens.test.ts |  87 ++++++++++
 6 files changed, 708 insertions(+), 71 deletions(-)
```

```text
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/tokens.test.ts
```

`src/core/constants.ts` and `src/styles/_mixins.scss` carry the Orchestrator's integration of the
first run's obligation-4 patch set, untouched here.

## The pre-edit `undefined` population

Measured before editing, with a throwaway probe under `tmp/probe/` that ran
`collectReferenceRows(guide, collectTokenNames(TOKEN_NAMES))` through the `probe` project and
listed every row reading `undefined` in either mode. The probe is deleted.

```text
npm run test:probe
exit 0 — TOTAL ROWS 175
```

Every role's `subtle` and `emphasis` tier read `undefined` in dark alone, because the tier table's
dark cells were prose: `--vn-color-{role}-subtle` and `--vn-color-{role}-emphasis` for `primary`,
`secondary`, `tertiary`, `success`, `info`, `warning`, `danger`, `light`, and `dark`.

These rows read `undefined` in both modes: `--vn-text-tertiary`, `--vn-font-sans`,
`--vn-font-mono-base`, `--vn-font-mono-short`, `--vn-space-1`, `--vn-space-2`, `--vn-space-3`,
`--vn-space-4`, `--vn-space-5`, `--vn-space-6`, `--vn-space-7`, `--vn-space-8`, `--vn-space-12`,
`--vn-space-24`, `--vn-border-translucent`, `--vn-radius-small`, `--vn-radius-base`,
`--vn-radius-large`, `--vn-radius-xlarge`, `--vn-radius-xxlarge`, `--vn-radius-pill`,
`--vn-shadow-1`, `--vn-shadow-2`, `--vn-shadow-3`, `--vn-shadow-inset`, `--vn-form-valid`, and
`--vn-form-invalid`.

After the guide rewrite the population is empty, and the reader's return type no longer admits it.

## Obligation 1 — refuse an undeclared range endpoint

`collectRowTokens` refuses a range whose endpoint the registry order does not carry, and one whose
endpoints run in reverse. Each refusal names the endpoint and the cell:

```text
Reference range `--vn-probe-1` through `--vn-probe-9`: --vn-probe-9 is outside the registry order
```

`tests/setupStyles.test.ts` gains
`refuses a range whose endpoint the registry order does not carry`, which reads `REFERENCE_MARKUP`
with its range endpoint replaced by an undeclared name and asserts the throw names that name. It
runs through `collectReferenceRows`, so it proves the refusal reaches the caller rather than the
leaf alone.

Red then green:

```text
npm run test:setup
before: exit 1 — Tests 4 failed | 128 passed (132)
after:  exit 0 — Tests 132 passed (132)
```

The case that previously asserted `collectRowTokens` returns nothing for an undeclared range is
gone; a prose first cell still returns nothing, and that assertion stays.

## Obligation 2 — every stated cell compares

`ReferenceRow.light` and `ReferenceRow.dark` are `string`. `collectReferenceRows` throws, naming
what it read, on: a missing `Tokens / Reference map` subsection, a subsection with no table, a
table whose keyed or valued column it cannot resolve, a table with no body row, a `Tier` table
preceding every `Role` table, a `Source` cell opening with no legend word, a `Tier` or `Role` cell
naming more than one subject, a first cell naming no token, and a value cell that states no value
for each token the row names.

Every guide cell that carried a description now states a value; § The per-row rulings gives each
one. The scratch map lost its prose row and gained a `Tier` row with a dark expression of its own
and a single value column carrying both modes, so every form the reader answers for is still
present.

Two cases carry this obligation, and each contributed a failing reading to the preceding red run:

- `refuses a value cell written in a form it cannot read` replaces the scratch map's
  `` `1px`, dark `2px` `` cell with prose and asserts the throw names `--vn-probe-edge`.
- `states a dark value the dark cell alone decides` is the one-unit mutation control. It reads the
  guide, asserts `--vn-color-primary-subtle` states
  `color-mix(in oklab, var(--vn-color-primary-base) 15%, var(--vn-surface-body-base))` in dark,
  then reads a copy whose dark tier cell says `16%` and asserts the dark value moves with it. Both
  assertions fail against the guide as it stood, because both dark readings were `undefined`.

The value gate itself fails on that mutation, which is what claim 2 said it could not do. Measured
by applying the mutation to `guides/veneer.md`, running the gate, and reverting the exact bytes:

```text
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot \
  tests/src/styles/tokens.test.ts
dark tier cell 15% → 16%: exit 1 — Tests 1 failed | 30 passed (31)
  drift names every role's dark subtle tier, for example
  ["--vn-color-light-subtle","dark","color-mix(in oklab,#f8f9fa 15%,oklch(21% 0.013 256))",
   "color-mix(in oklab,#f8f9fa 16%,oklch(21% 0.013 256))"]
reverted:                  exit 0 — Tests 31 passed (31)
```

The same measurement over the rows the first run left as descriptions, applied together and
reverted together: `--vn-shadow-2`'s first layer alpha `0.06` → `0.07`, `--vn-space-5`'s
`0.625rem` → `0.65rem`, and `--vn-font-mono-short`'s `Menlo` → `Arial`, which is claim 10's own
mutation. Each reddened in both modes:

```text
exit 1 — Tests 1 failed | 30 passed (31)
  drift names --vn-font-mono-short, --vn-space-5, and --vn-shadow-2, in light and in dark
reverted: exit 0 — Tests 31 passed (31)
```

## Obligation 3 — the stated normalization

The § Reference map comparison paragraph and `normalizeDeclaration` say the same thing. The
paragraph gains the percentage clause: a percentage compares as its own number written in full, so
`15%` and `15.0%` compare equal and `16%` does not. `normalizeDeclaration` is unchanged, because
its number rule already produces that reading.

`compares a percentage as its own number written in full` in `tests/setupStyles.test.ts` pins it.
The case passed on the first run against the normalizer as it stood; it never ran red, and it binds
the behaviour rather than a defect. The withdrawn "six significant digits" clause appears nowhere
in § Reference map. Every occurrence of that phrase in the tree is about the grid's aspect
ratios, and each is outside this unit.

## Obligation 4 — the value gate reads every row

`tests/src/styles/tokens.test.ts` drops the `if (value === undefined) continue` skip, because the
reader's return type no longer admits it. Reading against the corrected guide:

```text
npm run test:src:styles
exit 0 — Test Files 58 passed (58), Tests 413 passed (413)
```

The gate compares 175 rows in each mode and reports empty drift.

## Obligation 5 — the guide's sentences

The Links departure sentence now points at `§ Outside the ledger` and at the preceding Links table,
states that the departure ledger carries no link row because its comparison reaches no theme-scope
token, and says what `tests/src/styles/elements/a.test.ts` proves: it reads the `a` tag's resting
and hover colors in each mode against the recorded readings of `--vn-link-base` and
`--vn-link-hover-base`. The claim that the mix reproduces the color Elements renders is gone.

The retained-highlight paragraph states the rule without the `D7` identifier and gives its true
reason: a consumer's own Bootstrap markup reads `--bs-highlight-color` and `--bs-highlight-bg`,
which is why the compatibility contract retains them, and no rule in the shipped cascade reads
them, which is why no canonical token stands in front of them.

```text
grep -n 'Departures from Bootstrap records\|D7 keeps\|reproduces the color Elements' guides/veneer.md
exit 1 — prints nothing
```

The first run's proposed § Departures link row is withdrawn. F5b replaces that section, and the
sentence the row was written for points at `§ Outside the ledger` instead.

## Obligation 6 — placement and naming

`PROBE_REFERENCE` is `REFERENCE_MARKUP`, and it sits under the frozen-tables section comment
immediately after `TABLE_MARKUP`, which is the convention `ICON_LINK_MARKUP` and `TABLE_MARKUP`
already give a written source. The readers section's opening comment names the guide readers as a
kind the file carries, and states why a guide reader takes Markdown as a string: the browser
project reaches the guide through a `?raw` import and the Node project reads the file.

The inventory case in `tests/setupStyles.test.ts` registers `REFERENCE_MARKUP` and
`UNMAPPED_TOKENS`, and its title names the guide readers beside the cascade readers.

## Obligation 7 — refuse a malformed table and floor the coverage

`collectReferenceRows` throws where it used to `continue`, in the position `readDeferrals` throws
from: a missing subsection, a missing table, an unresolvable keyed or valued column, and a table
with no body row. Renaming a `Value` column reddens as a refusal rather than dropping the table,
and renaming `### Reference map` reddens as a missing subsection.

`refuses a table whose value column it cannot resolve` in `tests/setupStyles.test.ts` renames the
scratch map's `Value` header and asserts the throw names the column. Its red reading is in the
obligation-1 run.

The gate's coverage floor is a membership reading rather than a total. `UNMAPPED_TOKENS` in
`tests/setupStyles.ts` names every canonical token the § Tokens section states outside its
reference map — each role's channel triplet, which the roles subsection states as a law and
`collectTripletGroups` pairs with its own fill, and the state and button names the
§ Button states and bindings table states. The gate asserts that the registry minus the map's
tokens equals exactly that list, so a table the reader stops contributing rows for leaves its
tokens in neither list and reddens.

## Obligation 8 — the third tier reads the mode's own scope

The gate collects declarations into one map per normalized selector and reads a row's fallback from
the mode's own scope before `:root`. A light row reads `[data-bs-theme=light]`, a dark row reads
`[data-bs-theme=dark]`, and each falls back to `:root` for a name its scope does not re-declare.

The fallback tier fires only where both computed readings are empty, which today is the CSS-wide
keyword `--vn-text-heading: inherit`, and that name is declared at `:root` alone. The row-level
path is therefore inert, so the case pins the mechanism directly: it asserts the dark scope map
exists and that its `--vn-text-body-base` differs from the `:root` reading. Keying the lookup
without `normalizeSelectorText` fails that assertion, which is how the assertion was shown to
distinguish a working scope map from a missing one.

## The per-row rulings

Each row the reader previously left without a stated value, and the ruling taken. No row was left
as a law: every one of them names a value the cascade declares, so each is stated and the gate
compares it. The laws that left the cells are restated in sentences beside their tables, where
they are prose about a scale rather than a value a gate reads.

| Row | Ruling |
| --- | --- |
| `--vn-color-{role}-subtle` dark | Valued. The dark cell states `color-mix(in oklab, {fill} 15%, var(--vn-surface-body-base))` in full, replacing "the same mix at `15%`" |
| `--vn-color-{role}-emphasis` dark | Valued. The dark cell states `the same expression`, which the reader already reads as a repeat of the light cell |
| `--vn-text-tertiary` | Valued. The light cell states `color-mix(in srgb, var(--vn-text-body-base) 50%, transparent)` in full, replacing "the same expression at `50%`" |
| `--vn-font-sans` | Valued. A font stack is a value, so the cell states the whole stack as one code span, written as the built cascade serializes it with double quotation marks |
| `--vn-font-mono-base` | Valued, as one code span. The row previously wrote one span per family, which states no value for a row naming one token |
| `--vn-font-mono-short` | Valued, as one code span, the same way |
| `--vn-space-1` | Valued. The cell states `calc(0.125rem * var(--vn-factor-density))` and the px reading moves to the sentence after the table |
| `--vn-space-2` through `--vn-space-8` | Valued. The cell states each step's own `calc()` expression, in token order. The scale law moves to the sentence after the table, because the declared value multiplies the step out rather than carrying the `N` the law names |
| `--vn-space-12`, `--vn-space-24` | Valued, the same way |
| `--vn-border-translucent` | Valued. The dark reading states `color-mix(in srgb, var(--vn-palette-white-base) 15%, transparent)` in full, replacing "dark white at `15%`" |
| `--vn-radius-small`, `-base`, `-large` | Valued. Each states its own `calc()` expression, replacing "scaled the same way" |
| `--vn-radius-xlarge`, `-xxlarge`, `-pill` | Valued, the same way, with `--vn-radius-pill` stating the unscaled `50rem` |
| `--vn-shadow-1`, `--vn-shadow-2`, `--vn-shadow-3` | Valued, one row each. A rung is a pair of layers whose commas cannot share a cell with another rung's, so the combined row is split and each states its own full declaration. The pair structure moves to the sentence after the table |
| `--vn-shadow-inset` | Valued, stating its full declaration |
| `--vn-form-valid`, `--vn-form-invalid` | Valued, one row each. The pair carries different dark values, and a single value column states both modes only for a row naming one token, so the combined row is split and each states `` `light`, dark `dark` `` |

## Commands and exit codes

Every command ran with npm 11.19.1 on `PATH` and Chromium at `/opt/pw-browsers`. The gate chain
ran in the rule's order after the final edit, and each reading is that run's own.

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run test:probe` (pre-edit measurement, probe since deleted) | 0 | 175 rows; the `undefined` population listed earlier |
| `npm run test:setup` (red, before the reader and guide changes) | 1 | Tests 4 failed \| 128 passed (132) |
| `npx vitest run … tokens.test.ts` (dark tier cell mutated to `16%`) | 1 | Tests 1 failed \| 30 passed (31) |
| `npx vitest run … tokens.test.ts` (shadow, space, and font stack mutated) | 1 | Tests 1 failed \| 30 passed (31) |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format — 209 files |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | root, `src:core`, `src:browser`, `src:styles`, `app:browser` |
| `npm run build` | 0 | core, browser, styles |
| `npm run test:setup` | 0 | Test Files 3 passed (3), Tests 132 passed (132) |
| `npm run test:src:styles` | 0 | Test Files 58 passed (58), Tests 413 passed (413) |
| `npm run test:guides` | 0 | Tests 18 passed (18) |
| `npm run test:policy` | 0 | Tests 109 passed \| 1 skipped (110) |
| `npm test` | 0 | every project green; the readings are in § The whole suite |

## Acceptance criteria

| Criterion | Result |
| --- | --- |
| 1 `format:check`, `lint:check`, `check` exit 0 | met |
| 2 `test:setup` exits 0 with the range-refusal case, the malformed-table refusal case, the mutation control, and the percentage case present | met |
| 3 `test:src:styles` exits 0 with the value gate reading every row | met |
| 4 `test:guides` and `test:policy` exit 0 | met |
| 5 the `Departures from Bootstrap records`, `D7 keeps`, `reproduces the color Elements` grep prints nothing | met |
| 6 `git status --porcelain` lists the first run's files plus nothing outside the owned set | met |

## The whole suite

```text
npm test                                  exit 0
  test:src          Test Files  8 passed (8)    Tests  73 passed (73)
  test:src:styles   Test Files 58 passed (58)   Tests 413 passed (413)
  test:app          Test Files 10 passed (10)   Tests  26 passed (26)
  test:journey      Test Files  4 passed (4)    Tests  88 passed | 4 skipped (92)
  test:policy       Test Files  1 passed (1)    Tests 109 passed | 1 skipped (110)
  test:config       Test Files  1 passed (1)    Tests 173 passed | 1 skipped (174)
  test:setup        Test Files  3 passed (3)    Tests 132 passed (132)
  test:setup:browser Test Files 1 passed (1)    Tests  45 passed (45)
  test:conformance  Test Files  1 passed (1)    Tests  11 passed (11)
  test:guides       Test Files  1 passed (1)    Tests  18 passed (18)
```

The journey project passed here. The first run recorded it failing on
`Error: Test timed out in 15000ms` with a moving row count, which that run read as a timing failure
under load; this run agrees with that reading. The deciding run still belongs to the Orchestrator
on an idle host.

## Deviations

None. The brief's stop conditions did not fire: every descriptive row could be stated as a value,
so none needed a law the gate computes, and every gate reached green inside the owned files.

Ancillary choices settled inside the owned scope, per the deviation contract:

- The refusal wording follows the `readDeferrals` idiom: `Reference row <header>: …` for a
  table-level fault and `Reference row <first cell>: …` for a row-level one.
- Each shadow rung and each form-validation token takes its own table row, because a single value
  column states both modes only for a row naming one token.
- The scale, radius, and elevation laws sit in a sentence after their table.
- `UNMAPPED_TOKENS` is the name for the population the coverage floor reads against.

## Claims flagged unverified

- **`§ Outside the ledger` does not resolve in this worktree.** The Links departure sentence points
  at it because the brief's obligation 5 fixes that target. `grep -n '^### Departures from
  Bootstrap' guides/veneer.md` still reports the old heading at line 881, and
  `grep -c 'Outside the ledger' guides/veneer.md` reports only the sentence I wrote. F5b lands the
  heading before integration; if F5b names it differently, this sentence needs the correction.
- **The `a.test.ts` sentence rests on the case data rather than on a token read.**
  `TEXT_A_CASES` in `tests/setupStyles.ts` holds frozen `oklab()` and `color(srgb …)` readings and
  the case compares the `a` tag against those, so nothing in that file reads `--vn-link-base`
  itself. The sentence says the readings are recorded, which is what the file shows;
  `tests/src/styles/elements/a.test.ts` is off-limits here, so the tie between the recorded reading
  and the token is not asserted anywhere.
- **`UNMAPPED_TOKENS` is an enumerating assertion.** It names every member of a population a later
  unit can add to, so a unit that adds a canonical token stated outside § Reference map must add it
  there too, and the gate reddens until it does. That is the intended failure, and it is also the
  maintenance cost of the floor.
