# Unit F5b ACCOUNTING-LEDGER — report

`opus` on native Opus 5.5, sole writer in `/home/user/veneer-f5b` (worktree at `07fc3c3`).
Brief: `tmp/units/f5b-brief.md`. Every gate below ran after the final edit.

## The measurement

Taken with the unit's own `collectDepartures` over `compileExpandedCascade()` (Sass
`style: 'expanded'`, `loadPaths: ['src/styles']`), the pinned inventory, and
`collectShippedComponents(readCompatibility())`. Shipped keys: 31. Departures: 880. Additions: 125.
Compile 588 ms, comparison 1013 ms.

| Component | Departures | By member |
| --- | --- | --- |
| `btn` | 286 | tokenized 213, dropped 69, aliased 2, declared 2 |
| `link` | 99 | tokenized 63, dropped 36 |
| `reboot` | 97 | tokenized 43, dropped 36, declared 18 |
| `table` | 73 | aliased 48, tokenized 25 |
| `g` | 72 | tokenized 72 |
| `row` | 38 | tokenized 38 |
| `gx` | 36 | tokenized 36 |
| `gy` | 36 | tokenized 36 |
| `row-gap` | 36 | tokenized 36 |
| `container` | 34 | tokenized 34 |
| `display` | 18 | tokenized 12, dropped 6 |
| `h1` | 6 | tokenized 3, dropped 3 |
| `h2` | 6 | tokenized 3, dropped 3 |
| `h3` | 6 | tokenized 3, dropped 3 |
| `h4` | 6 | tokenized 3, dropped 3 |
| `blockquote` | 5 | tokenized 5 |
| `h5` | 5 | tokenized 3, dropped 2 |
| `h6` | 5 | tokenized 3, dropped 2 |
| `offset` | 5 | declared 5 |
| `icon-link` | 4 | tokenized 2, dropped 2 |
| `mark` | 3 | tokenized 2, declared 1 |
| `figure` | 1 | tokenized 1 |
| `img` | 1 | tokenized 1 |
| `lead` | 1 | tokenized 1 |
| `list-inline` | 1 | tokenized 1 |

Whole population by member: tokenized 639, dropped 165, aliased 50, declared 26, fallback 0. The
`fallback` member has no measured row after the `_body.scss` removal this brief grants; the plant in
`tests/setupServer.test.ts` proves the member.

Additions by category: selector 12, declaration 113, property 0, keyframes 0. The compile emits no
`@keyframes` and declares no custom property outside a shipped component's own recorded set, so
those two categories are measured-empty and plant-proved.

**Excluded as a compile artefact: 0.** No row was dropped on computed-value grounds. The comparison
applies exactly one equivalence: a value that is empty on either side reads as an absence, because
an empty declaration leaves the property with nothing to read. The rows a reader might call
artefacts are recorded as `declared` rows rather than excluded, so the guide carries them and the
gate binds them: `reboot | body | -webkit-tap-highlight-color | rgba(0, 0, 0, 0) -> transparent`;
`reboot | small | font-size | 0.875em -> 87.5%` and the `sub`, `sup`, `pre`, `code`, `kbd`, and
`samp` font-size rows beside it; `offset | .offset-*-0 | margin-left | 0 -> 0%` (five rows).

**No logical property is met.** With the retained probe's logical map applied, the per-component
counts are identical to the map-free run, and a direct sweep over the compile finds no
`*-inline-*`, `*-block-*`, `inline-size`, `block-size`, or `inset` property anywhere. The Unknowns'
stop condition does not fire.

## Per obligation

**1 — the ledger types.** `tests/setupServer.ts` declares `Departure`
(`'tokenized' | 'aliased' | 'declared' | 'fallback' | 'dropped'`), `AdditionCategory`
(`'selector' | 'declaration' | 'property' | 'keyframes'`), `DepartureRow`, `CascadeAddition`,
`AdditionRow extends CascadeAddition` (the guide row adds `reason`, which no measurement fixes),
`CascadeLedger`, and `CascadeBlock`. `recorded` and `emitted` are `string | undefined`: an absence
on either side means that side leaves the property with no value. No member was added to either
union.

**2 — the readers.** `tests/setupServer.ts` adds `compileExpandedCascade`, `readCascadeBlocks`,
`collectKeyframeNames`, `normalizeDeclarationValue`, `normalizeMediaCondition`, `collectValueNames`,
`classifyDeparture`, `matchShippedKey`, `collectSelectorClasses`, `attributeSelector`,
`collectValueGaps`, `collectCascadeAdditions`, `collectDepartures`, `describeDeparture`,
`describeAddition`, `readDepartures`, `readAdditions`, `splitTopLevelCompounds`, `readCompoundTag`,
`collectElementTags`, `isDeparture`, `isAdditionCategory`, `ABSENT_CELL`, and `LAYER_COMPONENTS`.
`readDeferrals`, `readDepartures`, and `readAdditions` now share `selectSubsectionTables`,
`selectTableColumns`, and `readTableCells`, which keep `readDeferrals`' refusal messages verbatim;
`readCompatibility` takes the same column selector. `OracleVocabulary` gained `rules` (selector,
condition, declarations) and `keyframes`, keeping `selectors` as the projection every presence
reading takes.

**3 — the gates.** `tests/conformance.test.ts` gains `describe('cascade ledger')` with: records
every measured value difference; names no departure the compiled cascade no longer carries; records
every emitted name the official inventory lacks; names no addition the compiled cascade no longer
emits; defers no name the built cascade ships; and selects in the elements layer exactly the tags
the partial table names. Each failure names the row by its cells. The plants sit in
`tests/setupServer.test.ts` (`LEDGER_GUIDE`, `LEDGER_CASCADE`, `LEDGER_INVENTORY`, `LEDGER_SHIPPED`)
and cover a planted difference of every member, a planted stale row, a planted extra name of every
category, a missing column, an empty cell, an unknown member, an unknown category, a missing
subsection, a missing table, and a compound the tag reader cannot read.

**4 — the ledger rows.** `guides/veneer.md` § Departures from Bootstrap is replaced, under the same
`## Tokens` parent, by `### Departures` (880 rows, one table per component under a `#### <key>`
heading), `### Additions` (125 rows, one table), and `### Outside the ledger` (prose). Every § E site
the brief names is present: `a.btn[aria-disabled=true]`, `.btn-tertiary`, `.btn-outline-tertiary`,
the reset-layer `:root`, `html`, `var`, `figcaption`, `colgroup`, `button:hover`, `button:active`,
`button:focus-visible`, `button:disabled`, and the `.btn-check` hiding declarations (`width`,
`height`, `clip-path`, `overflow`, `white-space`). The `dl`, `blockquote`, `code`, `pre`, `kbd`, and
`hr` changes land where the comparison puts them: the `hr` margin and opacity as `declared`
departures, and the rest as `declaration` additions, because the release writes no declaration there
to depart from.

**5 — no right-to-left support.** `BOOTSTRAP_RTL_CSS_DIGEST` and every read of it are gone: the
constant, the conformance byte pin (the CSS and bundle pins stay), and the inventory-digest and
distinct-digest assertions in `tests/setupServer.test.ts`. `OracleInventory` declares and reads no
`rtl` member. The fixture's `rtl` field was removed from all 135 components by a script under
`tmp/probe/` that parsed the JSON, deleted that one field per component, and wrote it back through
`JSON.stringify(inventory, undefined, '\t')`; the scoped `oxfmt` run followed. Digests of
`tests/fixtures/oracle/inventory.json`: before
`84807911383272d6bc929a817c44b10a0557cd10ea768bad2322f56130143f05`, after the script
`62f7e9fa01eeac54a5c33d9e71ce2be8abd775c11190e30e4773b6b61491072d`, after `oxfmt`
`c4ee764f2bdf9235ad9398a15b657dec7859c2f2a60bc08cc7bcfb46766a378a`. The only field touched is
`rtl`: every component key now reads `selectors,declarations,properties,keyframes,media`, and the
`digests['bootstrap.rtl.css']` entry is untouched, as the brief requires. The script is deleted.

**6 — the tag population.** `collectElementTags` reads every `elements`-layer rule of the compile,
splits each selector into compounds through the house grammar, takes each compound's leading type
identifier, closes the set under `MANDATED_TAG_PAIRS`, and refuses a compound it cannot read
(including a namespace separator) rather than skipping it. The conformance case requires that set to
equal the distinct values of the `ELEMENT_TAGS` tag column; both sides are 58 tags. The closure is
what makes the comparison an equality: the column's own doc states it carries the mandated relative
of each selected tag, and `details`, `li`, and `option` are in the column for that reason while no
elements-layer rule selects them. The `ELEMENT_TAGS` doc now names the binding.

**7 — the prose.** § Departures, § Additions, and § Outside the ledger each name the reader that
parses them and the gate that reddens on drift. § Deferred selectors no longer points at the retired
`Name`/`Waiting on` table. § Bootstrap variables Veneer retains keeps the three carousel variables
and points at § Departures for `--bs-btn-close-filter`. The § Button states and bindings sentence
about the retained `--bs-btn-close-filter` value now points at the measured rows.

## Retired rows, by name

**§ Departures from Bootstrap (the old token-keyed table).** Reproduced as measured rows, so the
fact survives in the ledger: `figure, figcaption`; `img`; `table, caption`; `td, th`; `colgroup`;
`th` text alignment; `button`; `h1`–`h6`; `.h1`–`.h6`; `.display-1`–`.display-6`;
`--bs-btn-focus-shadow-rgb`. Retired with the source change this brief grants:
`--bs-body-text-align`. Retired as token-scope facts the comparison cannot reach, and carried into
§ Outside the ledger with a pointer at § Reference map: `--vn-text-code`, `--vn-size-2`,
`--vn-weight-heading`, `--vn-color-primary-base`, `--vn-color-secondary-base`,
`--vn-color-success-base`, `--vn-color-info-base`, `--vn-color-warning-base`,
`--vn-color-danger-base`, `--vn-text-body-base`, `--vn-surface-body-base` dark, `--vn-border-color`,
`--vn-shadow-1`, `-2`, `-3`, `--vn-focus-width`, `--vn-focus-opacity`, and `--vn-font-sans` (whose
dropped families § Outside the ledger names). Retired with no measured counterpart, and reported
here rather than rewritten: `legend` (the compile matches every recorded `legend` value, so nothing
departs) and `[hidden]` (a layer-order claim, not a value difference; `tests/src/styles/index.test.ts`
is where that claim is proved).

**§ Deferred names.** Retired whole, and its two facts carried into § Outside the ledger, not into
§ Deferred selectors: `scroll-padding` on the document, and the hint surface with the
component-scoped tokens. Neither name sits in the pinned inventory, and
`scanCompatibilityPresence` refuses a deferral row naming a name outside it, so the deferral table
cannot hold either one.

**§ Deferred selectors.** No row moved. The new deferral gate names no shipped deferral.

## The gate chain after the final edit

Run from `/home/user/veneer-f5b` with npm 11.19.1 on `PATH`:

```text
npm run format:check      exit=0
npm run lint:check        exit=0
npm run check             exit=0
npm run build             exit=0
npm run test:setup        exit=0   Test Files 3 passed (3)   Tests 134 passed (134)
npm run test:conformance  exit=0   Test Files 1 passed (1)   Tests 17 passed (17)
npm run test:guides       exit=0   Test Files 1 passed (1)   Tests 18 passed (18)
npm run test:policy       exit=0   Test Files 1 passed (1)   Tests 109 passed | 1 skipped (110)
```

After that chain two plants were run and removed, and `npm run build:src && npm run test:conformance`
was re-run green (17 passed) with `npm run format:check` clean, which is the state on disk.

Observation, not a criterion: `npm run test:src:styles` exits 0 (Test Files 58 passed, Tests 412
passed) with both source edits in place, which is the reading that covers the `_body.scss` fallback
removal and the `border-radius` collapse. The whole-chain `npm test` was not run; the
timing-sensitive projects are the Orchestrator's reading.

## Failing-first evidence for each gate

Each reading below is `npm run test:conformance` over the real guide and the real compile.

- **records every measured value difference** — red before the guide carried the rows, and red again
  with one row deleted: `+ "blockquote | .blockquote | font-size | — | 1.25rem | var(--vn-size-5) | tokenized"`.
- **names no departure the compiled cascade no longer carries** — red at 18:35 with the one row whose
  Bootstrap value is empty written as an empty code span:
  `+ "btn | .btn | --bs-btn-font-family | — | `` | var(--vn-font-sans) | tokenized"`. That reading is
  what produced the `recorded: string | undefined` contract.
- **records every emitted name the official inventory lacks** — red with the `.btn-tertiary` row
  renamed: `+ "btn | .btn-tertiary | selector"`.
- **names no addition the compiled cascade no longer emits** — red on the same plant:
  `+ "btn | .btn-quaternary | selector"`.
- **defers no name the built cascade ships** — red with the `ol ol` deferral row renamed `.btn`:
  `+ ".btn"`.
- **selects in the elements layer exactly the tags the partial table names** — red with a temporary
  `article` rule planted in the owned `src/styles/elements/_body.scss`: `+ "article"`, beside
  `+ "reboot | article | selector"` from the additions gate.

Every plant was reverted from a scratch copy held outside the checkout, not with `git restore`, and
the tree was re-read green afterwards (`diff -q` against the backup for the guide, the partial
printed back for `_body.scss`).

## Tree state

`git status --porcelain`:

```text
 M guides/veneer.md
 M src/styles/components/_button.scss
 M src/styles/elements/_body.scss
 M src/styles/elements/_button.scss
 M tests/conformance.test.ts
 M tests/fixtures/oracle/inventory.json
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

`git diff --stat`:

```text
 guides/veneer.md                     | 1281 +++++++++++++++++++++++++--
 src/styles/components/_button.scss   |    5 +-
 src/styles/elements/_body.scss       |    2 +-
 src/styles/elements/_button.scss     |    5 +-
 tests/conformance.test.ts            |   76 +-
 tests/fixtures/oracle/inventory.json | 1597 +++-------------------------------
 tests/setupServer.test.ts            |  424 ++++++++-
 tests/setupServer.ts                 |  901 ++++++++++++++++++-
 tests/setupStyles.test.ts            |    7 +-
 tests/setupStyles.ts                 |    8 +-
 10 files changed, 2690 insertions(+), 1616 deletions(-)
```

Touched files, one line each:

- `guides/veneer.md` — § Departures from Bootstrap and § Deferred names replaced by § Departures,
  § Additions, and § Outside the ledger; § Deferred selectors, § Bootstrap variables Veneer retains,
  and the Button bindings sentence repointed.
- `src/styles/elements/_body.scss` — the `--bs-body-text-align` fallback removed (owned by the
  brief).
- `src/styles/components/_button.scss`, `src/styles/elements/_button.scss` — the four corner radius
  longhands collapsed to `border-radius` (Orchestrator grant, mid-unit, matching main's `7863d0d`).
- `tests/setupServer.ts` — the ledger types, readers, comparison, describers, cascade and tag
  readers; the shared table helpers; `OracleVocabulary` extended; the RTL digest removed.
- `tests/setupServer.test.ts` — the plants and their fixtures; the export list, inventory case, and
  digest case updated.
- `tests/conformance.test.ts` — the `cascade ledger` describe; the RTL byte pin removed.
- `tests/setupStyles.ts` — the `ELEMENT_TAGS` doc only.
- `tests/fixtures/oracle/inventory.json` — the `rtl` field removed from every component.
- `tests/setupStyles.test.ts` — **one scratch inventory literal** given `rules: []` and
  `keyframes: []`. See the scope note.

## Scope notes and deviations

1. **`tests/setupStyles.test.ts` is neither owned nor off-limits in the brief, and this unit edits
   one literal in it.** Extending `OracleVocabulary` makes the scratch inventory at the
   `equates optimized even-column selectors` neighbour case fail to typecheck. The edit adds
   `rules: []` and `keyframes: []` to that one object and changes nothing else. The alternative was
   to keep a second selector-only vocabulary shape, which is the duplicate the design laws refuse.
2. **`--bs-carousel-control-icon-filter` gets no ledger row, against Obligation 4.** The comparison
   reaches a variable only through a shipped component's vocabulary, and `--bs-carousel-control-icon-filter`
   belongs to the `carousel` key, which is not shipped. A row for it would redden the stale-row gate
   on the same run that wrote it. `--bs-btn-close-filter` does get rows, because the `btn` key owns
   it: `btn | :root | --bs-btn-close-filter` and `btn | [data-bs-theme=light] | --bs-btn-close-filter`.
   The carousel variables stay in § Bootstrap variables Veneer retains, which now says no shipped
   component claims them.
3. **Those two `--bs-btn-close-filter` rows read `dropped`, not `fallback`.** The measurement is that
   this cascade declares the property with an empty value in both light scopes
   (`--bs-btn-close-filter: ;`), against the release's `invert(1) grayscale(100%) brightness(200%)`
   on `.btn-close-white`; the dark scope carries the release value, so it produces no row. `fallback`
   describes a value that keeps the release's behind a `var()` fallback, which is not what the
   cascade writes here. The guide's § Bootstrap variables Veneer retains prose was corrected in the
   same pass, because it claimed each retained variable keeps the release value in the alias scope.
4. **Ancillary decisions taken and recorded.** `condition` carries the emitted at-rule text where the
   comparison found an emitted block and the recorded one otherwise, and `@layer` is not a condition
   (a layer is where a rule sits). A media condition is matched across notations:
   `(min-width: 576px)` normalizes to `(width >= 576px)` and `(max-width: 575.98px)` to
   `(width < 576px)`. An emitted rule is attributed to a component by its layer first
   (`elements` and `reset` answer to `reboot`) and by its longest matching class otherwise; an
   unattributed rule (`:root` and the theme scopes in `@layer theme`, `.caption-top`) is outside the
   ledger. A `declaration` addition's name is `selector { property }`; a `property` addition's name
   is the bare custom property; a `selector` or `keyframes` addition's name is the name itself.
   § Departures carries one table per component rather than one table for all 880 rows: the formatter
   pads every cell of a table to its widest, and one 310-character `Veneer` cell (the `button`
   transition) would pad all 880 rows, which costs 235 KB of spaces. The readers read every table in
   the subsection, so the split needs no reader change.
5. **Guide size.** `guides/veneer.md` goes from 161 KB to 455 KB, of which the ledger is ~290 KB.
   That is the measured population at one row per difference, which the brief fixes. If the
   Orchestrator wants the guide smaller, the row-preserving option is to move the two tables to a
   committed fixture the same readers parse; that is a successor brief, not an integration edit.
6. **Off-limits prose left stale, report-only.** § Files row for `tests/setupServer.ts` ("The
   Node-only reader the styles proofs load the installed and built cascade through") and the § Tests
   paragraph ("The conformance proofs pin the official release … and cross-check the compatibility
   rows") name neither the ledger nor the tag population. Both sections are outside this brief.

## `ROADMAP.md` patch (shared, report-only)

Under § Records:

```diff
-- Read the machine-read record from `guides/veneer.md` alone: § Compatibility, § Deferred
-  selectors, § Departures from Bootstrap, § Deferred names, and the additions table F5 ACCOUNTING
-  adds. Those sections are the definition of done.
+- Read the machine-read record from `guides/veneer.md` alone: § Compatibility, § Deferred
+  selectors, § Departures, and § Additions. Those sections are the definition of done.
```

In the F5c TOKENS-TRUTH row, the clause `§ Deferred names read or retired` is closed by this unit
(retired, its two facts carried into § Outside the ledger) and can be struck from that row's scope
cell.

## Answers to the Orchestrator's mid-unit notes

1. **The pointer heading.** A pointer must name `§ Departures`, a level-3 heading under `## Tokens`;
   a pointer at one row also names its component table, written `§ Departures, the `link` table`
   (level-4 `#### link`). **F5c's sentence needs a correction before it lands:** the comparison
   reports no `--bs-link-color` or `--bs-link-hover-color` row at theme scope, because `:root`,
   `[data-bs-theme='light']`, and `[data-bs-theme='dark']` belong to the inventory's `theme` key,
   which is not a shipped component, and neither variable sits in a shipped component's property
   vocabulary. What the ledger does carry for those names is every shipped consumer that reads
   them, measured and written: `btn | .btn-link | --bs-btn-color`, `--bs-btn-hover-color`, and
   `--bs-btn-active-color`; `icon-link | .icon-link | text-decoration-color` with its prefixed
   twin as `dropped`; `link | .link-underline | text-decoration-color` with its prefixed twin as
   `dropped`; `reboot | a | color`; and `reboot | a:hover | --bs-link-color-rgb` as `dropped`.
   A `--vn-link-base` sentence must therefore point at § Outside the ledger, whose first
   paragraph states that canonical token values sit outside the measurement and that § Reference
   map records each one, or at the § Reference map Links row itself. Pointing it at a departure
   row that does not exist would leave the guide naming a row no gate can produce.
2. **The addition row form, for a blind writer.** The `### Additions` table's columns are, in order,
   `Component`, `Name`, `Category`, `Reason`. A row is
   `| \`<component>\` | \`<name>\` | <category> | <reason sentence>. |` — the component and the name in
   backticks, the category bare (one of `selector`, `declaration`, `property`, `keyframes`), the
   reason a full sentence ending in a period. For F6's `.caption-bottom`, the comparison will
   attribute it to the shipped key whose class prefix it matches; `caption` is not a shipped key and
   `table` does not prefix `caption-bottom`, so **`.caption-bottom` will be unattributed and will
   produce no addition row**, exactly as `.caption-top` does today (it is in the unattributed set in
   this worktree). The row to write blind is therefore none; if F6 wants one, the attribution rule in
   `attributeSelector` is what must change, and that is a successor brief. Run the comparison after
   F6 integrates and write only what it reports.
3. **The single command that re-runs the comparison.** `npm run build:src && npm run test:conformance`
   from the checkout root. The two departure gates and the two addition gates print every row that
   must be added and every row that must be struck, one per line, as the row's cells joined by ` | `
   in table column order: `component | selector | property | condition | bootstrap | veneer | departure`
   for a departure and `component | name | category` for an addition. A cell printed as `—` is written
   bare in the table; every other cell is wrapped in backticks, except the trailing `departure` and
   `category` cells, which stay bare. That is the whole refresh loop: run the gate, read the two
   lists, edit the table, re-run.

## Claims I flag as unverified

- The `reason` cells in § Additions are authored prose, bound by no measurement. They were written
  from the partials in `src/styles/elements/` and `src/styles/components/`, one per measured site,
  and a wrong one reads as plausible. They are the right target for a checker lane.
- The `declared` rows I name as artefact candidates (`transparent` against `rgba(0, 0, 0, 0)`, the
  `em`-against-percentage font sizes, `0` against `0%`) are recorded as departures rather than
  excluded. I did not measure their computed values in a browser; the judgment that recording them
  is safer than excluding them is mine.
- `npm test` as a whole chain was not run here.
