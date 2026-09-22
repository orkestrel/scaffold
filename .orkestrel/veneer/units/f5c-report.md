# Unit F5c TOKENS-TRUTH — report

`opus` on Opus 5.5, sole writer in `/home/user/veneer-f5c` (worktree of Veneer, detached at
`07fc3c3`). Obligations 1, 2, and 3 are done and the gates are green. Obligation 4 is **not done**:
the older highlight token pair cannot be removed inside this brief's owned files, because
`src/core/constants.ts` registers both names and is off-limits. § Obligation 4 carries the stop
report and the exact patch set.

## Touched files

| File | Change |
| --- | --- |
| `tests/setupStyles.ts` | Adds the `ReferenceRow` interface, the `collectReferenceRows` reader over § Reference map, its `splitCellSpans`, `collectRowTokens`, and `substituteRole` leaves, the `normalizeDeclaration` comparison form, and the `PROBE_REFERENCE` scratch map |
| `tests/setupStyles.test.ts` | Registers the new exports in the inventory case and adds the scratch-map case, the cell-grammar case, the token-expansion case, and the normalization case |
| `tests/src/styles/tokens.test.ts` | Adds the value gate over every row the reader returns, resolved on a mounted root and in a nested `[data-bs-theme='dark']` island |
| `guides/veneer.md` | States the § Reference map cell contract and its comparison form; rewrites the Links rows to the values the cascade declares; adds the `--vn-link-base` departure sentence; replaces the elided `--vn-motion-panel` value |

```text
 guides/veneer.md                |  34 ++++-
 tests/setupStyles.test.ts       |  86 +++++++++++++
 tests/setupStyles.ts            | 272 ++++++++++++++++++++++++++++++++++++++++
 tests/src/styles/tokens.test.ts |  67 ++++++++++
 4 files changed, 453 insertions(+), 6 deletions(-)
```

```text
 M guides/veneer.md
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/tokens.test.ts
```

## The measured row diff, before correction

The gate ran red against the guide as it stood. Command and reading:

```text
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot \
  tests/src/styles/tokens.test.ts
exit 1 — Tests  1 failed | 30 passed (31)
```

Each failing row, as the gate printed it. `Declared` is the value the built cascade carries in that
mode; `Stated` is the guide's own cell.

| Token | Mode | Declared | Stated |
| --- | --- | --- | --- |
| `--vn-link-base` | light | `color-mix(in oklab, var(--vn-color-primary-base) 70%, var(--vn-text-body-base))` | `var(--vn-color-primary-base)` |
| `--vn-link-rgb` | light | `13, 54, 172` | `8, 65, 234` |
| `--vn-link-hover-rgb` | light | `10, 43, 137` | `6, 52, 187` |
| `--vn-motion-panel` | light | `calc(250ms * var(--vn-factor-motion))` | `calc(250ms * …)` |
| `--vn-link-base` | dark | `color-mix(in oklab, var(--vn-color-primary-base) 80%, var(--vn-text-body-base))` | `color-mix(in srgb, var(--vn-palette-white-base) 40%, var(--vn-color-primary-base))` |
| `--vn-link-rgb` | dark | `79, 185, 238` | `85, 205, 243` |
| `--vn-link-hover-base` | dark | `color-mix(in srgb, var(--vn-link-base) 80%, black)` | `color-mix(in srgb, var(--vn-palette-white-base) 20%, var(--vn-link-base))` |
| `--vn-link-hover-rgb` | dark | `63, 148, 190` | `119, 215, 246` |
| `--vn-motion-panel` | dark | `calc(250ms * var(--vn-factor-motion))` | `calc(250ms * …)` |

A further row was stale as written and the gate accepted it on its color comparison, because both
expressions paint the same color: `--vn-link-hover-base` in light, declared
`color-mix(in srgb, var(--vn-link-base) 80%, black)` where the guide stated
`color-mix(in srgb, var(--vn-palette-black-base) 20%, var(--vn-link-base))`. It is rewritten with
the rest, so the row is now true as written.

No reference-map row names a token the cascade does not declare: the gate's presence reading
reported none.

## Obligation 1 — the reference-map reader

`collectReferenceRows(source, names)` in `tests/setupStyles.ts` walks § Reference map through
`selectSectionBlocks`, `findColumnIndex`, and `extractCellText`, the same installed projections
`readDeferrals` reads a table with, and it locates the map by its heading text rather than by
position. It takes the guide's Markdown as a string, so the module stays host-independent and the
browser project reaches the guide through a `?raw` import.

It returns `ReferenceRow` — `token`, `light`, `dark`, and `source`. A single-value table fills both
modes from its `Value` cell. A `Role` table's row takes that role's own `--vn-color-{role}-base`. A
`Tier` table's row is a template over `{role}` and `{fill}` and expands over every role the
preceding table named, so each tier's expression is read for each role. Where a cell describes its
value in prose, both modes read `undefined` rather than a sentinel.

The cell forms that state a value are named in the guide: one code span for each token the row's
first cell names; `` `light`, dark `dark` `` where a single value column carries both modes; and
`the same expression` where the dark scope repeats the light cell.

Leaves beside it, each exported and covered: `splitCellSpans` (a cell's spans, and nothing where
prose sits beside them), `collectRowTokens` (a comma list with suffix expansion, and a `through`
range sliced from the registry order), `substituteRole`, and `normalizeDeclaration`.

`tests/setupStyles.test.ts` gains the inventory rows for each export and these cases:

- `reads a reference map into one row per token, and states no value for a cell carrying prose` —
  reads `PROBE_REFERENCE`, a scratch map written in the guide's shape, and asserts the whole row
  list. It carries a mode-splitting `Role` cell, a `{role}` template with a repeated dark cell, a
  range, a suffix list, a prose cell, and a table outside the map that must not appear.
- `reads a cell as stated values only where one separator joins its spans`
- `expands a suffix over the token before it, and a range over the registry order`
- `writes every number in full and every millisecond duration in seconds`

## Obligation 2 — the value gate

`tests/src/styles/tokens.test.ts` gains
`resolves every value the reference map states to the value its own token carries, in each mode`.
For every row the reader returns it mounts a light root and a nested `[data-bs-theme='dark']`
island, sets the row's stated value on a probe custom property in that scope, and compares the
probe's computed value against the token's own computed value.

The probe is what makes the comparison possible. Measured with a Playwright Chromium probe before
the case was written: Chromium substitutes every `var()` reference into an unregistered custom
property's computed value, so `--vn-text-secondary` reads back as
`color-mix(in srgb, oklch(0.208 0.042 265.755) 75%, transparent)` rather than as the authored
expression. Putting the guide's cell through the same substitution in the same scope is what lets a
cell naming another token compare as written — a `color-mix` expression included.

The case's comparison, in order, each tier stated in the case's own doc:

1. the normalized texts, which is the "as written" reading;
2. the color each side paints, through the installed `matchesColor`, because the styles build
   rewrites an `oklch()` lightness channel into the engine's serialization and no text rule undoes
   that;
3. the built declaration, for a row whose reading is empty on both sides, which is the CSS-wide
   keyword case `--vn-text-heading` carries.

`normalizeDeclaration` collapses whitespace, drops the space beside a bracket or a comma, writes
every number in full, and writes a millisecond duration in seconds. The number rule and the
duration rule exist because the build ships `0.75rem` as `.75rem` and `150ms` as `.15s`; the
earlier red run named exactly those differences, and each is the same value written another way
rather than drift.

The case also reads every row's token out of the `:root` rules the installed `readRules` reports,
so a row naming a token the package does not declare reddens on its own.

Failing first, then green:

```text
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot \
  tests/src/styles/tokens.test.ts
before the row corrections: exit 1 — Tests  1 failed | 30 passed (31)
after  the row corrections: exit 0 — Tests 31 passed (31)
```

## Obligation 3 — the rows

Corrections in `guides/veneer.md`:

- The Links table's `--vn-link-base`, `-rgb` row now states
  `color-mix(in oklab, var(--vn-color-primary-base) 70%, var(--vn-text-body-base))` and
  `13, 54, 172` in light, and the same mix at `80%` with `79, 185, 238` in dark.
- The `--vn-link-hover-base`, `-rgb` row now states
  `color-mix(in srgb, var(--vn-link-base) 80%, black)` in each mode, with `10, 43, 137` in light
  and `63, 148, 190` in dark.
- A sentence under the Links table names `--vn-link-base` as a departure from Bootstrap's link
  color, gives Bootstrap's own `#0d6efd` and `#6ea8fe` and its hover directions, states that Veneer
  carries the primary fill toward the body text and shades the hover toward black in each mode, and
  points at § Departures from Bootstrap for the row.
- The `--vn-motion-feedback`, `--vn-motion-panel` row stated `--vn-motion-panel` as
  `calc(250ms * …)`, an elision the gate cannot read and the writing rules refuse. It now states
  `calc(250ms * var(--vn-factor-motion))`.
- § Reference map gains the paragraph that fixes which cell forms state a value and the paragraph
  that fixes the comparison form.

No other reference-map row was stale.

### The factor override cases

Every factor already has its override case in `tests/src/styles/tokens.test.ts`, so none was added.
Each ran green in the final `npm run test:src:styles`:

- `rescales every consumer when the density factor is set on the document element`
- `rescales a radius consumer when the radius factor is set on the document element`
- `rescales an elevation consumer when the elevation factor is set on the document element`
- `rescales a motion consumer when the motion factor is set on the document element`

Beside them, `falls back to the factor initial value when the document element is given an invalid
factor` and `rescales a subtree that re-declares the scale beside the factor, and holds one that
sets the factor alone` also ran green.

## Obligation 4 — the highlight pair: NOT DONE

### The search

```text
grep -rn -- '--vn-text-highlight' src app tests guides
src/styles/_mixins.scss:249:	--vn-text-highlight: var(--vn-text-body-base);
src/styles/_mixins.scss:298:	--bs-highlight-color: var(--vn-text-highlight);
src/core/constants.ts:133:		highlight: '--vn-text-highlight',
guides/veneer.md:593: | `--vn-text-highlight` | … (the § Text and surface row, elided here)

grep -rn -- '--vn-surface-highlight' src app tests guides
src/styles/_mixins.scss:257:	--vn-surface-highlight: #{map.get($values, 'highlight')};
src/styles/_mixins.scss:299:	--bs-highlight-bg: var(--vn-surface-highlight);
src/core/constants.ts:150:		highlight: '--vn-surface-highlight',
guides/veneer.md:599: | `--vn-surface-highlight` | … (the § Text and surface row, elided here)
```

No rule in the shipped cascade paints with either name. Their only readers are the retained
`--bs-highlight-color` and `--bs-highlight-bg` declarations, which D7 keeps, so the removal binds
each of those to the underlying value instead.

### Why it stopped

**Expected.** The pair's declaration sites sit in files this brief owns.

**Found.** `src/core/constants.ts` registers both names under `TOKEN_NAMES.text.highlight` and
`TOKEN_NAMES.surface.highlight`, and that file is off-limits. Removing the cascade declaration
while the registry keeps the name reddens cases this brief cannot reach.

**Evidence.** The removal was applied to `src/styles/_mixins.scss` alone and measured, then undone
by restoring the file's own bytes:

```text
npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts \
  --no-cache --reporter=dot tests/src/styles/tokens.test.ts
exit 1 — Tests  3 failed | 28 passed (31)

FAIL  tokens.test.ts:42  declares the canonical registry and the compatibility list at the document scope
      - "--vn-surface-highlight"
      - "--vn-text-highlight"
FAIL  tokens.test.ts:113 declares the same partitions in the right-to-left cascade
      - "--vn-surface-highlight"
      - "--vn-text-highlight"
FAIL  tokens.test.ts:63  resolves every value the reference map states ... (the guide rows)
```

The registry cases at `tokens.test.ts:42` and `tokens.test.ts:113` compare the declared `--vn-`
names against `collectTokenNames(TOKEN_NAMES)`, so only an edit to `src/core/constants.ts` closes
them. `git diff -- src/styles/_mixins.scss` is empty and the built cascade was rebuilt from the
restored source.

**Done or not done.** Not done. Nothing of the removal is in the working tree.

**Hypothesis.** The brief's owned list names the styles files the removal touches and not the
registry that declares the names.

### The patch set the removal needs

Give these to one unit that owns `src/core/constants.ts`, `src/styles/_mixins.scss`, and
`guides/veneer.md` § Text and surface. The ROADMAP carriers row names F5c for this item, so it
needs a re-baselined carrier.

`src/core/constants.ts` — off-limits here:

```diff
 		code: '--vn-text-code',
-		highlight: '--vn-text-highlight',
 		mark: '--vn-text-mark',
```

```diff
 		}),
-		highlight: '--vn-surface-highlight',
 		mark: '--vn-surface-mark',
```

`src/styles/_mixins.scss` — owned here, withheld because the gate cannot reach green alone:

```diff
 	--vn-text-code: #{map.get($values, 'code')};
-	--vn-text-highlight: var(--vn-text-body-base);
 	--vn-surface-body-base: #{map.get($values, 'canvas')};
```

```diff
 	--vn-surface-tertiary-rgb: #{map.get($values, 'surface-tertiary-rgb')};
-	--vn-surface-highlight: #{map.get($values, 'highlight')};
 	--vn-surface-code: #{map.get($values, 'surface-code')};
```

```diff
-	--bs-highlight-color: var(--vn-text-highlight);
-	--bs-highlight-bg: var(--vn-surface-highlight);
+	--bs-highlight-color: var(--vn-text-body-base);
+	--bs-highlight-bg: #{map.get($values, 'highlight')};
```

The `'highlight'` key in the light and dark maps in `src/styles/_tokens.scss` stays: it is what
`--bs-highlight-bg` reads after the change.

`guides/veneer.md` § Text and surface — delete the `--vn-text-highlight` row and the
`--vn-surface-highlight` row, and add a sentence under that table naming `--bs-highlight-color` and
`--bs-highlight-bg`, because those rows are the only place the guide records them:

```markdown
`--bs-highlight-color` and `--bs-highlight-bg` answer no canonical token. Veneer declares
`--bs-highlight-color` as the body text and `--bs-highlight-bg` as Bootstrap's own tint over the
warning role — `color-mix(in srgb, var(--vn-palette-white-base) 80%, var(--vn-color-warning-base))`
in light and the same mix over `var(--vn-palette-black-base) 60%` in dark — because no rule in the
shipped cascade paints with either, and D7 keeps no Veneer alias in front of a retained Bootstrap
variable.
```

The sentence under the same table that names `--vn-text-mark` and `--vn-surface-mark` stays true
after the deletion, and so does the `mark highlight` comment in `src/styles/_tokens.scss`.

## Shared-file patch: § Departures from Bootstrap

`guides/veneer.md` § Departures is F5b's ledger and report-only here. Its table carries no link
row, and the sentence this unit added under the Links table points at it. Insert this row after the
`--vn-text-code` row, padded to the table's column widths:

```markdown
| `--vn-link-base`, `--vn-link-hover-base` | `color-mix(in oklab, var(--vn-color-primary-base) 70%, var(--vn-text-body-base))` in light and the same mix at `80%` in dark, with the hover at `color-mix(in srgb, var(--vn-link-base) 80%, black)` in each mode | `#0d6efd` / `#6ea8fe`, with the hover at `#0a58ca` / `#8bb9fe` |
```

Bootstrap's values were read from `node_modules/bootstrap/dist/css/bootstrap.css`:
`--bs-link-color: #0d6efd`, `--bs-link-hover-color: #0a58ca`, and under the dark scope
`--bs-link-color: #6ea8fe`, `--bs-link-hover-color: #8bb9fe`.

No `ROADMAP.md` patch is proposed: the carrier decision for the highlight pair is a re-baseline.

## Commands and exit codes

Every command ran with npm 11.19.1 on `PATH` and Chromium at `/opt/pw-browsers`. The gate chain
under the rule ran after the final edit, in the order the table gives, and each reading is that
run's own.

| Command | Exit | Reading |
| --- | --- | --- |
| a throwaway `node` probe compiling `src/styles/index.scss` with `sass` and walking it with `postcss` | 0 | the `:root`, light, and dark declarations, which is the reading every row was diffed against |
| a throwaway `node` probe driving Playwright Chromium over that cascade | 0 | Chromium substitutes `var()` into an unregistered custom property's computed value |
| `npx vitest run … tokens.test.ts` (red, before the normalization rules) | 1 | Tests 2 failed \| 30 passed (32) |
| `npx vitest run … tokens.test.ts` (red, with the normalization rules and the color comparison) | 1 | Tests 1 failed \| 30 passed (31) |
| `npx vitest run … tokens.test.ts` (green, after the row corrections) | 0 | Tests 31 passed (31) |
| `npx vitest run … tokens.test.ts` (highlight removal measured, then undone) | 1 | Tests 3 failed \| 28 passed (31) |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format — 209 files |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | root, `src:core`, `src:browser`, `src:styles`, `app:browser` |
| `npm run test:setup` | 0 | Test Files 3 passed (3), Tests 127 passed (127) |
| `npm run test:src:styles` | 0 | Test Files 58 passed (58), Tests 413 passed (413) |
| `npm run build:src` | 0 | core, browser, styles |
| `npm run test:conformance` | 0 | Tests 11 passed (11) |
| `npm run test:guides` | 0 | Tests 18 passed (18) |
| `npm run test:policy` | 0 | Tests 109 passed \| 1 skipped (110) |

## Acceptance criteria

| Criterion | Result |
| --- | --- |
| 1 `format:check`, `lint:check`, `check` exit 0 | met |
| 2 `test:setup` exits 0 with the reader in the inventory and its scratch-table case | met |
| 3 `test:src:styles` exits 0 with the value gate and the factor-override cases | met |
| 4 `build:src && test:conformance` exit 0 | met |
| 5 `test:guides` and `test:policy` exit 0 | met |
| 6 `grep -rn '<HIGHLIGHT_TOKEN>' src app tests guides` prints nothing | **not met** — Obligation 4 stopped, nothing was deleted |
| 7 `git status --porcelain` lists owned files only | met |

## Observations

- **The dark link hover shades toward black, not white.** `src/styles/_tokens.scss` declares
  `'link-hover': 'color-mix(in srgb, var(--vn-link-base) 80%, black)'` in the light map and the
  identical expression in the dark map, so the dark hover is darker than the resting link where
  Bootstrap's is lighter. The guide now records what ships. Whether it must change is an appearance
  question, and the ROADMAP carriers row for link colors names E-ELEMENTS and E-IDENTITY.
- **The color comparison's reach.** The gate falls to `matchesColor` only for a token whose value
  carries an `oklch()` literal, which is where the build rewrote the lightness channel. Measured by
  a throwaway variant that collected the rows taking that path instead of passing them:
  `--vn-border-color`, `--vn-surface-body-base`, `--vn-surface-raised`, `--vn-text-body-base`,
  `--vn-text-muted`, each role's `-base` and `-border` tier. The residual risk is a cell stating a
  different expression that paints the same color; `--vn-link-hover-base` in light was exactly that
  case before the correction, and it is now text-true.
- **Rows the reader leaves without a stated value**, each covered by its own proof rather than by
  the gate: the space scale's law rows, the radius and shadow rows, `--vn-border-translucent` in
  dark, the `--vn-form-valid` and `--vn-form-invalid` pair, and the `--vn-font-sans`,
  `--vn-font-mono-base`, and `--vn-font-mono-short` rows. § Reference map now states that a cell in
  that form describes a scale rather than stating a value.
- **The whole-chain `npm test`** reading is recorded under § The whole suite.
- **The value gate's wall clock**: the case ran in 131 ms inside a `tests/src/styles/tokens.test.ts`
  run whose whole file took 7.31 s.

## Claims flagged unverified

- The departure sentence says the shipped mix "reproduces the color Elements renders for a link".
  That rests on `TEXT_A_CASES` in `tests/setupStyles.ts` pinning the `a` tag's resolved color and on
  the audit verdict's claim 11 wording, not on a reading of Elements taken here.
- The § Departures row's Bootstrap values are read from the installed `bootstrap` package's built
  stylesheet, not from Bootstrap's Sass sources.

## The whole suite

`npm test` exits 1 in this worktree, on a project this unit does not touch and cannot reach.

```text
npm test                                  exit 1
  test:src        Test Files  8 passed (8)    Tests  73 passed (73)
  test:src:styles Test Files 58 passed (58)   Tests 413 passed (413)
  test:app        Test Files 10 passed (10)   Tests  26 passed (26)
  test:journey    Test Files  4 failed (4)    Tests  5 failed | 83 passed | 4 skipped (92)
```

Re-run alone, the journey project still fails, with fewer rows:

```text
npm run test:journey                      exit 1
  Test Files  3 failed | 1 passed (4)     Tests  3 failed | 85 passed | 4 skipped (92)
```

Every failure is `Error: Test timed out in 15000ms` on
`tests/app/browser/integration.test.ts` > `journey` >
`toggles a native host and an anchor host through the keyboard`, waiting on
`traverseAccessible('Toggle')`. The row count moved between the runs, which is the signature of
a timing failure under load rather than a fixed one, so the deciding re-run belongs to the
Orchestrator on an idle host.

That file is off-limits here and untouched. It is also outside this change's graph:
`tests/setupStyles.ts` is loaded by the `src:styles` project alone
(`configs/src/vite.styles.config.ts` names it in `setupFiles`), `configs/app/vite.journey.config.ts`
names none of the files this unit changed, and `tests/app/browser/integration.test.ts` imports none
of them. The keyboard traversal the failing case drives is what the audit verdict's claim 25 and
claim 6 name, and the ROADMAP carries it to F4 and F6.
