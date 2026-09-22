# Unit B-PASSIVE-A — report

`badge`, `breadcrumb`, and `btn-close` ship. The partials, proofs, sections, section proofs, capture
scenarios, ledger rows, compatibility rows, and guide sections all landed. Three gate cases stay red,
each inside a file this unit does not own, and each one's exact patch is in § Deviations.

## Pre-edit measurement

Taken on the untouched worktree at `3a9202a`, before any edit.

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run build:src` | 0 | — |
| `npm run test:conformance` | 0 | 17 passed; the `cascade ledger` describe printed no row for `badge`, `breadcrumb`, or `btn-close` |

The § Deferred selectors rows this unit retires were located by name in `guides/veneer.md` and
counted before removal; the removal script reported the same set it was given, with none left over
(§ Deferral rows retired).

## Per obligation

### Obligation 1 — the partials

| File | Summary |
| --- | --- |
| `src/styles/components/_badge.scss` | New. `.badge`, `.badge:empty`, and `.btn .badge` under `@layer components`. |
| `src/styles/components/_breadcrumb.scss` | New. `.breadcrumb`, the item inset, the `::before` divider, and the active item. |
| `src/styles/components/_close.scss` | New. `.btn-close`, its hover, focus, and refusal rules, and `.btn-close-white`. |
| `src/styles/index.scss` | Appended `@use 'components/breadcrumb'`, `@use 'components/badge'`, and `@use 'components/close'` after `@use 'components/vr'`, in the barrel order family ruling 8 fixes. |

The four header combinators (`.alert-dismissible .btn-close`, `.toast-header .btn-close`,
`.modal-header .btn-close`, `.offcanvas-header .btn-close`) are authored absent.
`--bs-breadcrumb-font-size` is declared nowhere and read once, which is Bootstrap's own shape:
`grep -c -e '--bs-breadcrumb-font-size:' dist/src/styles/index.css` → `0`;
`grep -c -e 'var(--bs-breadcrumb-font-size)' dist/src/styles/index.css` → `1`.

`src/styles/_mixins.scss` carries no `escape-svg` idiom, so the close mark is the recorded data URI
written literally.

### Obligation 2 — the proofs

| File | Summary |
| --- | --- |
| `tests/src/styles/components/badge.test.ts` | New. The relative box at two host sizes, the centered inline layout, the empty collapse, the button offset, the cascade's rule set, the palette token, a consumer override, the radius factor, and each mode. 10 cases. |
| `tests/src/styles/components/breadcrumb.test.ts` | New. Each item's inset and divider, the wrapping row, the cascade's rule set, the density factor, the divider override, the empty fill and radius, the inherited size, and each mode. 10 cases. |
| `tests/src/styles/components/close.test.ts` | New. The content box and mark, the palette token and override, the radius factor, the shipped and deferred rule sets, each state's variable, the driven opacity walk, both refusals, a consumer override, and the filter in each mode. 17 cases. |
| `tests/setupStyles.ts` | Appended `BREADCRUMB_SELECTORS`, `BREADCRUMB_MARKUP`, `BREADCRUMB_ITEM_CASES`, `BADGE_SELECTORS`, `BADGE_GEOMETRY_CASES`, `CLOSE_SELECTORS`, `CLOSE_DEFERRED`, `CLOSE_STATE_CASES`, `CLOSE_MARK`, `CLOSE_INVERSION`. |
| `tests/setupStyles.test.ts` | Registered each name in the export literal and the import list, and appended `describe('passive component case tables')`: the selector tables bound to `tests/fixtures/oracle/inventory.json`, the badge geometry and breadcrumb inset derived from the recorded declarations, the close opacities and mark derived from them, and the freeze sweep. |

`npm run test:src:styles` → 0, 453 passed.

Two readings were measured rather than assumed, and each changed a case:

- A component variable declared on the element itself cannot be reached from an ancestor, so each
  override case loads a consumer stylesheet through `scene.load` rather than setting the property on
  a wrapper. A wrapper override on `.badge` and on `.btn-close` read back the shipped value.
- A factor set on an ancestor moves nothing, because a token's computed value carries its own
  `var()` references already substituted. Each factor case sets the factor on `document.documentElement`
  and removes it in a `finally` block, the way `tests/src/styles/tokens.test.ts` does.
- The bare `button` element carries `color` and `opacity` transitions, so every close-state reading
  follows `waitForAnimations`. Without it the reading is the pre-transition value and the case passes
  or fails on timing.

### Obligation 3 — the showcase and the capture registry

| File | Summary |
| --- | --- |
| `app/browser/constants.ts` | Appended `BADGE_COPY`, `BADGE_SPECIMENS`, `BREADCRUMB_COPY`, `BREADCRUMB_SPECIMENS`, `CLOSE_COPY`, `CLOSE_SPECIMENS`, each frozen and each derived from a source list through one `.map`. |
| `app/browser/sections/BadgeSection.ts`, `BreadcrumbSection.ts`, `CloseSection.ts` | New `SpecimenSection` subclasses, the shape `TableSection.ts` sets. |
| `app/browser/index.ts` | Appended the three re-exports. |
| `app/browser/Showcase.ts` | Constructs the three sections after `TableSection`, in alphabetical order of region name. |
| `tests/app/browser/sections/BadgeSection.test.ts`, `BreadcrumbSection.test.ts`, `CloseSection.test.ts` | New. Each renders its declared specimens through the shared contract, states what separates its specimens from one another, and releases its region on repeated destruction. |
| `tests/app/browser/Showcase.test.ts` | Inserted the three regions in the region literal and the three tables in the specimen concatenation. |
| `tests/app/browser/index.test.ts` | Inserted the nine new export names at their sorted positions. |
| `tests/setup.ts` | Extended `CaptureSubject` with five subjects, appended six rows to `CASCADE_KEYS`, added `CLOSE_KEYS` for the driven states, and spread it last into `CAPTURE_KEYS`. |
| `tests/setup.test.ts` | Added `CLOSE_KEYS` to the import list and the export literal, and extended the one concatenation assertion, under the Orchestrator's mid-unit grant. |
| `tests/app/browser/integration.test.ts` | Inserted the three specimen tables in the portfolio guard's `declared` set and appended one journey case driving the close control to hover and to focus and placing a page frame for each. |

Three showcase constraints were measured rather than assumed, and each shaped the specimens:

- `expect(extractStyles(mounted.host)).toEqual([])` refuses an inline `style` attribute anywhere in
  the mounted showcase, and `expect(census.undeclared).toEqual([])` refuses a class no loaded sheet
  declares. Every specimen is therefore built from shipped classes alone.
- `expect(variation).toBeGreaterThan(0)` refuses a frame region painting one color. The badge paints
  white text and declares no fill, so a badge on the page background photographs white on white. Each
  badge specimen sits in a `.table-dark` cell, which is the surface Veneer already ships, and the
  inverted close control sits in the same cell for the same reason.
- `tests/app/browser/Showcase.test.ts` reads `host.querySelectorAll('.btn')` and holds it against
  `BUTTON_SPECIMENS`, so a `.btn` host rendered outside the Button section reddens that case. The
  `.btn .badge` offset is therefore proved in the cascade proof and rendered by no specimen.

`npm run test:app` → 1 failed, 31 passed; the one failure is Deviation 3 and sits outside this unit's
files. The three section proofs pass.

### Obligation 4 — the accounting

The loop ran `npm run build:src && npm run test:conformance` after the partials compiled. The first
run reported nine unrecorded departures and two stale rows, and no additions. Every row was written
as the comparison printed it, and the re-run was green.

`npm run test:conformance` → 0, 17 passed: the four ledger gates, the deferral gate, the
compatibility presence gate, and the elements-layer tag gate.

Compatibility rows added to § Compatibility, each with Status `shipped` and Proof `—`: a `selector`
and a `variable` row for `badge`, for `breadcrumb`, and for `btn-close`. The keys were added to the
`listed` literal in `tests/conformance.test.ts` at their sorted positions.

### Obligation 5 — the guide

| Section | Change |
| --- | --- |
| § Files | Three rows after the `_icon-link.scss` row, one per partial. |
| § Styles | `### Breadcrumb classes`, `### Badge classes`, and `### Close classes`, in barrel order after `### Helper classes`, in the voice `### Table classes` fixes. |
| § Deferred selectors | Fourteen rows struck (§ Deferral rows retired). |
| § Compatibility | Six rows (Obligation 4). |
| § Showcase | One sentence naming the three added regions, after the existing region sentence. |
| § Tests | Four stem rows in the capture table and three links in the style-proof list. |

`npm run test:guides` → 0, 18 passed. `npm run test:policy` → 0, 109 passed, 1 skipped.

The guide's raw diff is 236 changed lines and its whitespace-ignoring diff is 114, so roughly half of
it is `oxfmt` re-aligning the § Files table: the `_breadcrumb.scss` path is one character wider than
the widest path already there, so the formatter widened every row of that table. `npm run format:check`
is an acceptance criterion and refuses the un-aligned table, so the realignment is not optional.
**Integration note:** every sibling unit adding a § Files row will produce the same realignment, so
expect a whole-table conflict there and resolve it by re-running `oxfmt` after the merge rather than
by hand.

No `guides/ledger/` path was written into `guides/veneer.md` or into any prose this unit authored.

## Ledger rows

Per the Orchestrator's D14 ruling. These rows are written into this worktree's
`guides/ledger/departures.md`, which is the launch-time location; they belong under
`guides/veneer.md` § Tokens § Departures once that revert lands. The comparison reported **no**
addition rows for this unit's keys, so `guides/ledger/additions.md` is unchanged.

### `#### \`badge\`` — new table, placed before `#### \`blockquote\``

```text
| Component | Selector | Property           | Condition | Bootstrap 5.3.8 | Veneer                         | Departure |
| --------- | -------- | ------------------ | --------- | --------------- | ------------------------------ | --------- |
| `badge`   | `.badge` | `--bs-badge-color` | —         | `#fff`          | `var(--vn-palette-white-base)` | tokenized |
```

### `#### \`breadcrumb\`` — new table, placed between `#### \`blockquote\`` and `#### \`btn\``

```text
| Component    | Selector      | Property                         | Condition | Bootstrap 5.3.8 | Veneer              | Departure |
| ------------ | ------------- | -------------------------------- | --------- | --------------- | ------------------- | --------- |
| `breadcrumb` | `.breadcrumb` | `--bs-breadcrumb-margin-bottom`  | —         | `1rem`          | `var(--vn-space-8)` | tokenized |
| `breadcrumb` | `.breadcrumb` | `--bs-breadcrumb-item-padding-x` | —         | `0.5rem`        | `var(--vn-space-4)` | tokenized |
```

### `#### \`btn\`` — six rows appended to the existing table

The comparison attributes every `.btn-close*` rule to `btn`, because the pinned inventory records
those selectors under the `btn` key as well and `attributeSelector` answers with the first shipped
key the inventory records. There is no `#### \`btn-close\`` table.

```text
| `btn`     | `.btn-close`                      | `--bs-btn-close-color`           | —         | `#000`                                                                                                                      | `var(--vn-palette-black-base)`                                                                                                                                                                                                                                                                                         | tokenized |
| `btn`     | `.btn-close`                      | `border-radius`                  | —         | `0.375rem`                                                                                                                  | `var(--vn-radius-base)`                                                                                                                                                                                                                                                                                                | tokenized |
| `btn`     | `.btn-close:disabled`             | `-webkit-user-select`            | —         | `none`                                                                                                                      | —                                                                                                                                                                                                                                                                                                                      | dropped   |
| `btn`     | `.btn-close:disabled`             | `-moz-user-select`               | —         | `none`                                                                                                                      | —                                                                                                                                                                                                                                                                                                                      | dropped   |
| `btn`     | `.btn-close.disabled`             | `-webkit-user-select`            | —         | `none`                                                                                                                      | —                                                                                                                                                                                                                                                                                                                      | dropped   |
| `btn`     | `.btn-close.disabled`             | `-moz-user-select`               | —         | `none`                                                                                                                      | —                                                                                                                                                                                                                                                                                                                      | dropped   |
```

### `#### \`btn\`` — two stale rows struck

Shipping `.btn-close-white` puts a recorded selector for `--bs-btn-close-filter` into the cascade, so
the comparison stops falling back to the theme scopes for that property and these two rows go stale.
`tests/conformance.test.ts` named both as stale before they were struck.

```text
| `btn`     | `:root`                           | `--bs-btn-close-filter`          | —         | `invert(1) grayscale(100%) brightness(200%)`                                                                                | (empty)                                                                                                                                                                                                                                                                                                                | declared  |
| `btn`     | `[data-bs-theme=light]`           | `--bs-btn-close-filter`          | —         | `invert(1) grayscale(100%) brightness(200%)`                                                                                | (empty)                                                                                                                                                                                                                                                                                                                | declared  |
```

### Rows by member and category

| Member | Rows |
| --- | --- |
| `tokenized` | 5 rows: `--bs-badge-color`, `--bs-breadcrumb-margin-bottom`, `--bs-breadcrumb-item-padding-x`, `--bs-btn-close-color`, `.btn-close { border-radius }` |
| `dropped` | 4 rows: the `-webkit-user-select` and `-moz-user-select` pair on each of `.btn-close:disabled` and `.btn-close.disabled` |
| Addition rows | None in any category. |

## Deferral rows retired

Fourteen rows deleted whole from § Deferred selectors, each because this unit ships the name:

```text
| `.btn .badge`                     | Passive | The owning component supplies this relationship. |
| `.btn-close`                      | Passive | The owning component supplies this relationship. |
| `.btn-close:hover`                | Passive | The owning component supplies this relationship. |
| `.btn-close:focus`                | Passive | The owning component supplies this relationship. |
| `.btn-close:disabled`             | Passive | The owning component supplies this relationship. |
| `.btn-close.disabled`             | Passive | The owning component supplies this relationship. |
| `.btn-close-white`                | Passive | The owning component supplies this relationship. |
| `--bs-btn-close-color`            | Passive | Close button supplies this property.             |
| `--bs-btn-close-bg`               | Passive | Close button supplies this property.             |
| `--bs-btn-close-opacity`          | Passive | Close button supplies this property.             |
| `--bs-btn-close-hover-opacity`    | Passive | Close button supplies this property.             |
| `--bs-btn-close-focus-shadow`     | Passive | Close button supplies this property.             |
| `--bs-btn-close-focus-opacity`    | Passive | Close button supplies this property.             |
| `--bs-btn-close-disabled-opacity` | Passive | Close button supplies this property.             |
```

Kept deferred and authored absent, owner `Overlays`: `.alert-dismissible .btn-close`,
`.toast-header .btn-close`, `.modal-header .btn-close`, `.offcanvas-header .btn-close`. Each is absent
from the built cascade: `grep -c -F` over `dist/src/styles/index.css` returns `0` for all four.

## Token reuse and literal rulings, per value

The ceiling admits a `--vn-*` token only where it already exists and already resolves to Bootstrap's
recorded value. Every other value is Bootstrap's literal, and a value already naming a `--bs-*`
global the tree declares matches byte for byte and records nothing.

| Value | Recorded | Shipped | Ruling |
| --- | --- | --- | --- |
| `--bs-badge-padding-x` | `0.65em` | `0.65em` | Literal. The `--vn-space-*` ramp is `rem`-based; no token resolves to an `em` value. |
| `--bs-badge-padding-y` | `0.35em` | `0.35em` | Literal, same reason. |
| `--bs-badge-font-size` | `0.75em` | `0.75em` | Literal. `--vn-size-1` is `0.75rem`, a different unit and a different resolved length. |
| `--bs-badge-font-weight` | `700` | `700` | Literal. `--vn-weight-body` is `400` and `--vn-weight-heading` is `600`. |
| `--bs-badge-color` | `#fff` | `var(--vn-palette-white-base)` | Token reuse. The token holds `#fff` exactly. Departure row. |
| `--bs-badge-border-radius` | `var(--bs-border-radius)` | `var(--bs-border-radius)` | Compatibility global the tree declares. Byte identical, no row. |
| `--bs-breadcrumb-padding-x`, `-y` | `0` | `0` | Literal. Zero needs no token. |
| `--bs-breadcrumb-margin-bottom` | `1rem` | `var(--vn-space-8)` | Token reuse. `--vn-space-8` is `calc(1rem * var(--vn-factor-density))`, which resolves to `1rem` at the factor's initial value. Departure row. |
| `--bs-breadcrumb-bg`, `--bs-breadcrumb-border-radius` | empty | empty | Literal. The declaration stands with nothing after the colon, which is the release's own writing. |
| `--bs-breadcrumb-divider-color`, `--bs-breadcrumb-item-active-color` | `var(--bs-secondary-color)` | `var(--bs-secondary-color)` | Compatibility global the tree declares. Byte identical, no row. |
| `--bs-breadcrumb-item-padding-x` | `0.5rem` | `var(--vn-space-4)` | Token reuse, as the margin. Departure row. |
| breadcrumb divider `content` | `var(--bs-breadcrumb-divider, "/")` | the same | Literal. Sass emits the double-quoted string the record carries. |
| `--bs-btn-close-color` | `#000` | `var(--vn-palette-black-base)` | Token reuse. The token holds `#000` exactly. Departure row. |
| `--bs-btn-close-bg` | the recorded data URI | the same | Literal. A data URI cannot read a custom property, and `_mixins.scss` carries no `escape-svg` idiom. |
| `--bs-btn-close-opacity`, `-hover-opacity`, `-focus-opacity`, `-disabled-opacity` | `0.5`, `0.75`, `1`, `0.25` | the same | Literal. No published Veneer opacity scale carries these values; `--vn-button-opacity` is `0.65` and `--vn-focus-opacity` is `0.45`. |
| `--bs-btn-close-focus-shadow` | `0 0 0 0.25rem rgba(13, 110, 253, 0.25)` | the same | Literal. `--vn-focus-width` is `0.1875rem` and `--vn-focus-color` is a mix over the retuned primary, so neither resolves to the recorded value. |
| `.btn-close { border-radius }` | `0.375rem` | `var(--vn-radius-base)` | Token reuse. `--vn-radius-base` is `calc(0.375rem * var(--vn-factor-radius))`, which resolves to `0.375rem` at the factor's initial value. Departure row. |
| `.btn-close { width }`, `{ height }`, `{ padding }` | `1em`, `1em`, `0.25em 0.25em` | the same | Literal. Each is relative to the control's own text size; no token is. |
| `.btn-close-white { --bs-btn-close-filter }` | `invert(1) grayscale(100%) brightness(200%)` | the same | Literal. The same string the theme scopes already emit from `close-filter`. |

## Coverage matrix

Every selector the pinned inventory records for these keys, with the proof case that exercises it,
the showcase subject and specimen that render it, and the capture scenario that photographs it. No
recorded rule for these keys carries an at-rule condition, so the condition column is `—` throughout
and is omitted.

| Selector | Proof case | Subject | Specimen | Scenario |
| --- | --- | --- | --- | --- |
| `.badge` | `badge geometry > resolves the relative box on a $name`; `> lays the label out as a centered inline box that never wraps`; `badge paint > paints the recorded text color from the palette token` | `Badge counter` | Badge counter, Badge word, Badge at heading scale | `badge-counter` |
| `.badge:empty` | `badge geometry > collapses a badge carrying no content and restores it when content arrives` | — | Badge collapsed | none |
| `.btn .badge` | `badge geometry > lifts a badge inside a button host and leaves a loose badge in flow` | — | none | none |
| `.breadcrumb` | `breadcrumb layout > lays the trail out as a wrapping flex row carrying no list marker`; `breadcrumb overrides > declares the fill and the radius with nothing after the colon and paints on demand` | `Breadcrumb trail` | Breadcrumb trail, Breadcrumb single step | `breadcrumb-trail` |
| `.breadcrumb-item + .breadcrumb-item` | `breadcrumb layout > insets and divides the $name as the recorded rules select it` (middle item, active item) | `Breadcrumb trail` | Breadcrumb trail | `breadcrumb-trail` |
| `.breadcrumb-item + .breadcrumb-item::before` | the same case; `breadcrumb overrides > replaces the divider through the published variable and keeps the recorded fallback` | `Breadcrumb trail` | Breadcrumb trail | `breadcrumb-trail` |
| `.breadcrumb-item.active` | `breadcrumb overrides > paints the divider and the active item from the mode in %s` | `Breadcrumb trail` | Breadcrumb trail, Breadcrumb single step | `breadcrumb-trail` |
| `.btn-close` | `close control geometry > resolves the recorded content box, inset, and mark`; `> paints the recorded text color from the palette token and takes a consumer override`; `> rescales the control corner with the published radius factor` | `Close control` | Close control | `close-control` |
| `.btn-close:hover` | `close control states > moves the opacity through rest, hover, and focus` | `Close control` | Close control | `close-control-hover` |
| `.btn-close:focus` | the same case | `Close control` | Close control | `close-control-focus` |
| `.btn-close:disabled` | `close control states > refuses a disabled control through the attribute and through the class alike` | `Close refused by attribute` | Close refused by attribute | `close-refused-by-attribute` |
| `.btn-close.disabled` | the same case | `Close refused by class` | Close refused by class | `close-refused-by-class` |
| `.btn-close-white` | `close control inversion > inverts the mark in %s through the opt-in class`; `> reads the recorded filter the %s theme scope declares` | `Close inverted` | Close inverted | `close-inverted` |

Two selectors carry no capture scenario, each for a reason the registry itself enforces:

- `.badge:empty` resolves `display: none`, so its box is zero on each axis and `readRegion` clips to
  no pixel. `measureVariation` refuses such a region by throwing. The Badge collapsed specimen still
  renders it and the proof reads the collapse.
- `.btn .badge` cannot be rendered in the showcase at all, because a `.btn` host outside the Button
  section reddens `tests/app/browser/Showcase.test.ts`. The proof reads the offset and the loose
  badge beside it.

## Capture names written

`CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --project journey:<variant>` was
run once per variant, serially. The frame names, each written at all four variants
(`light-1280`, `dark-1280`, `light-390`, `dark-390`):

```text
badge-counter--<variant>.png
breadcrumb-trail--<variant>.png
close-control--<variant>.png
close-control-focus--<variant>.png
close-control-hover--<variant>.png
close-inverted--<variant>.png
close-refused-by-attribute--<variant>.png
close-refused-by-class--<variant>.png
```

Accessibility artifacts, one per subject and variant:

```text
badge-counter--<variant>-accessibility.txt
breadcrumb-trail--<variant>-accessibility.txt
close-control--<variant>-accessibility.txt
close-inverted--<variant>-accessibility.txt
close-refused-by-attribute--<variant>-accessibility.txt
close-refused-by-class--<variant>-accessibility.txt
```

The directory `tmp/capture/states` holds 68 frames after the four runs, which is the whole registry's
expansion. Four frames were read directly and each shows what its scenario claims:
`badge-counter--light-1280.png` is a white `4` on the dark table row, `close-inverted--light-1280.png`
is a white mark on the same row, `breadcrumb-trail--light-1280.png` is `Home / Materials / Hardwood /
Oak` with the slash dividers and the muted current page, and `close-control--dark-1280.png` is the
inverted mark on the dark page, which is the theme scope's filter rather than the opt-in class.

## Commands and exit codes

The chain after the final edit, in order. No source file changed after it.

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | 223 files |
| `npm run lint:check` | 0 | — |
| `npm run check` | 0 | — |
| `npm run build:src` | 0 | — |
| `npm run test:setup` | 1 | 2 failed, 162 passed — Deviations 1 and 2 |
| `npm run test:src:styles` | 0 | 453 passed |
| `npm run test:app` | 1 | 1 failed, 31 passed — Deviation 3 |
| `npm run test:conformance` | 0 | 17 passed |
| `npm run test:guides` | 0 | 18 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped |

The journey, run per variant serially:

| Command | Exit | Reading |
| --- | --- | --- |
| `... --project journey:light-1280` with `CAPTURE=1` | 0 | 26 passed |
| `... --project journey:dark-1280` with `CAPTURE=1` | 0 | 26 passed |
| `... --project journey:dark-390` with `CAPTURE=1` | 0 | 26 passed |
| `... --project journey:light-390` with `CAPTURE=1` | 0 | 26 passed, on the second run; the first reported one failure (§ Deviation 4) |

**Observation, not a criterion.** `npm test` was not run as a chain: every gate in it ran
individually and is reported here, and the chain would stop at the first of the two known-red gates.
`npm run test:journey`, which runs the four variants concurrently, fails widely on this container
(§ Deviation 4).

## Deviations

### Deviation 1 — `tests/setupStyles.test.ts` refuses a declaration pair three partials share

**Expected.** `npm run test:setup` green.
**Found.** `styles setup > carries no shared written declaration block across style partials` reports
three overlaps, each between one of this unit's partials and an off-limits partial:

```text
components/_badge.scss:11      <-> components/_button.scss:5     :: display: inline-block | text-align: center
components/_breadcrumb.scss:10 <-> components/_grid.scss:6       :: display: flex | flex-wrap: wrap
components/_close.scss:12      <-> components/_icon-link.scss:17 :: width: 1em | height: 1em
```

Each pair is a declaration Bootstrap records for both components, so neither side can drop it.
`scanStyleBlocks` refuses any two blocks in separate partials sharing two identical declarations, and
its own documented remedy is a mixin. `src/styles/_mixins.scss` and the three partner partials are all
off-limits, so the fix cannot land inside this unit's files.
**Done or not done.** Not done; reported as an exact patch, per the Orchestrator's instruction not to
split or reorder declarations.

**The measured patch.** Built on a scratch copy of `src/styles`, then measured:

- Compiled output is byte-identical. `sass.compile` over both trees, `style: 'expanded'`:
  `shipped 113299 bytes 78d3eabc8e6102f76b1a5c4adaedea5406a68b2012756729d584ee7b9175e3f6`;
  `patched 113299 bytes 78d3eabc8e6102f76b1a5c4adaedea5406a68b2012756729d584ee7b9175e3f6`; identical
  `true`.
- `scanStyleBlocks` over the patched tree: `files 59 pairs 1711 shared 0`. Over the shipped tree:
  `files 59 pairs 1711 shared 3`.

```diff
--- a/src/styles/_mixins.scss
+++ b/src/styles/_mixins.scss
@@ -19,6 +19,29 @@
 	color: var(--bs-heading-color);
 }
 
+// Lays out an inline box whose own content centers on its line.
+//
+// Bootstrap writes this pair on its button class and on its badge class alike, and a declaration
+// block two partials write is what `tests/setupStyles.test.ts` refuses, so the pair lives here and
+// each caller yields the declarations that sit between them.
+@mixin inline-center {
+	display: inline-block;
+	@content;
+	text-align: center;
+}
+
+// Lays out a flex row whose items wrap onto further lines.
+@mixin flex-wrap {
+	display: flex;
+	flex-wrap: wrap;
+}
+
+// Sizes a square box to the text it sits in.
+@mixin text-square {
+	width: 1em;
+	height: 1em;
+}
+
 @mixin image-size {
 	max-width: 100%;
 	height: auto;
--- a/src/styles/components/_button.scss
+++ b/src/styles/components/_button.scss
@@ -36,14 +36,14 @@
 		--bs-btn-disabled-bg: var(--vn-button-transparent);
 		--bs-btn-disabled-border-color: var(--vn-button-transparent);
 		--bs-btn-disabled-opacity: var(--vn-button-opacity);
-		display: inline-block;
-		padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
-		font-family: var(--bs-btn-font-family);
-		font-size: var(--bs-btn-font-size);
-		font-weight: var(--bs-btn-font-weight);
-		line-height: var(--bs-btn-line-height);
-		color: var(--bs-btn-color);
-		text-align: center;
+		@include inline-center {
+			padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
+			font-family: var(--bs-btn-font-family);
+			font-size: var(--bs-btn-font-size);
+			font-weight: var(--bs-btn-font-weight);
+			line-height: var(--bs-btn-line-height);
+			color: var(--bs-btn-color);
+		}
 		text-decoration: none;
 		vertical-align: middle;
 		cursor: pointer;
--- a/src/styles/components/_grid.scss
+++ b/src/styles/components/_grid.scss
@@ -5,8 +5,7 @@
 @layer components {
 	.row {
 		@include alias-gutters;
-		display: flex;
-		flex-wrap: wrap;
+		@include flex-wrap;
 		margin-top: calc(-1 * var(--bs-gutter-y));
 		margin-right: calc(-0.5 * var(--bs-gutter-x));
 		margin-left: calc(-0.5 * var(--bs-gutter-x));
--- a/src/styles/components/_icon-link.scss
+++ b/src/styles/components/_icon-link.scss
@@ -16,8 +16,7 @@
 	// carry.
 	.icon-link > .bi {
 		flex-shrink: 0;
-		width: 1em;
-		height: 1em;
+		@include text-square;
 		fill: currentcolor;
 		@include transition(transform var(--vn-motion-feedback) var(--vn-ease-standard));
 	}
--- a/src/styles/components/_badge.scss
+++ b/src/styles/components/_badge.scss
@@ -1,3 +1,5 @@
+@use '../mixins' as *;
+
 @layer components {
 	// The badge ships Bootstrap's recorded geometry and nothing more. Its padding, font size, and
 	// weight are written as the release writes them: each is relative to the badge's own inherited
@@ -15,13 +17,13 @@
 		--bs-badge-font-weight: 700;
 		--bs-badge-color: var(--vn-palette-white-base);
 		--bs-badge-border-radius: var(--bs-border-radius);
-		display: inline-block;
-		padding: var(--bs-badge-padding-y) var(--bs-badge-padding-x);
-		font-size: var(--bs-badge-font-size);
-		font-weight: var(--bs-badge-font-weight);
-		line-height: 1;
-		color: var(--bs-badge-color);
-		text-align: center;
+		@include inline-center {
+			padding: var(--bs-badge-padding-y) var(--bs-badge-padding-x);
+			font-size: var(--bs-badge-font-size);
+			font-weight: var(--bs-badge-font-weight);
+			line-height: 1;
+			color: var(--bs-badge-color);
+		}
 		white-space: nowrap;
 		vertical-align: baseline;
 		border-radius: var(--bs-badge-border-radius);
--- a/src/styles/components/_breadcrumb.scss
+++ b/src/styles/components/_breadcrumb.scss
@@ -1,3 +1,5 @@
+@use '../mixins' as *;
+
 @layer components {
 	// The trail ships Bootstrap's recorded surface. Its bottom margin and item inset are the two
 	// lengths a Veneer spacing token already resolves to, so each routes through that token and
@@ -16,8 +18,7 @@
 		--bs-breadcrumb-divider-color: var(--bs-secondary-color);
 		--bs-breadcrumb-item-padding-x: var(--vn-space-4);
 		--bs-breadcrumb-item-active-color: var(--bs-secondary-color);
-		display: flex;
-		flex-wrap: wrap;
+		@include flex-wrap;
 		padding: var(--bs-breadcrumb-padding-y) var(--bs-breadcrumb-padding-x);
 		margin-bottom: var(--bs-breadcrumb-margin-bottom);
 		font-size: var(--bs-breadcrumb-font-size);
--- a/src/styles/components/_close.scss
+++ b/src/styles/components/_close.scss
@@ -1,3 +1,5 @@
+@use '../mixins' as *;
+
 @layer components {
 	// The close control ships Bootstrap's recorded surface. Its text color routes through the
 	// palette token that already holds black byte for byte, and its radius through the base radius
@@ -18,8 +20,7 @@
 		--bs-btn-close-focus-opacity: 1;
 		--bs-btn-close-disabled-opacity: 0.25;
 		box-sizing: content-box;
-		width: 1em;
-		height: 1em;
+		@include text-square;
 		padding: 0.25em 0.25em;
 		color: var(--bs-btn-close-color);
 		background: transparent var(--bs-btn-close-bg) center / 1em auto no-repeat;
```

**Hypothesis.** Every B-PASSIVE sibling will hit the same gate, because Bootstrap repeats layout
pairs across its own components. Landing this patch once, before or after the family, closes it for
all of them; `inline-center` and `flex-wrap` are the two most likely to be needed again.

### Deviation 2 — `tests/setupServer.test.ts` carries a second shipped-component literal

**Expected.** `npm run test:setup` green.
**Found.** `server setup > skips engine and CSS obligations whose Proof cell is a dash` compares the
component set read from § Compatibility against a written `Set` literal, so any new compatibility row
reddens it: `expected Set{ …(31) } to deeply equal Set{ …(29) }`, the difference being `badge`,
`breadcrumb`, and `btn-close`. The file is off-limits.
**Done or not done.** Not done; reported as an exact patch.

**The patch.** In `tests/setupServer.test.ts`, inside the `new Set([…])` literal in that case, insert
each line at its sorted position:

```diff
 			new Set([
+				'badge',
 				'blockquote',
+				'breadcrumb',
 				'btn',
+				'btn-close',
 				'col',
```

### Deviation 3 — an unscoped file asserts the state this change ends

**Expected.** `npm run test:app` green.
**Found.** `tests/app/browser/sections/ButtonSection.test.ts:68` —
`ButtonSection > declares a specimen for every button variant the shipped cascade carries` — reads
every `btn-`prefixed class the cascade declares, drops `btn-group*` and `btn-check`, and requires a
Button specimen for the rest. `.btn-close` and `.btn-close-white` now exist, and neither is a button
variant: both belong to the separate `btn-close` inventory key. The failure is
`expected [ 'btn-close', 'btn-close-white' ] to strictly equal []`.

The file is named in neither the owned list nor the off-limits list, so it is unscoped and was left
untouched.
**Done or not done.** Not done; reported as an exact patch.

**The patch.** Widen that case's exclusion predicate:

```diff
 		const variants = declared.filter(
-			(name) => !name.startsWith('btn-group') && name !== 'btn-check',
+			(name) =>
+				!name.startsWith('btn-group') && !name.startsWith('btn-close') && name !== 'btn-check',
 		)
```

### Deviation 4 — the journey's keyboard cases sit at their timeout on this host

**Expected.** `npm run test:journey` green.
**Found.** Run as one command, the four variants run concurrently and several cases fail with
`Test timed out in 15000ms`, mostly `journey > toggles a native host and an anchor host through the
keyboard` and the two focus-ring cases. Run one variant at a time, all four pass.

This was measured rather than assumed. With this unit's three sections removed from the `Showcase`
construction and nothing else changed:

- `journey:light-1280` still failed `toggles a native host and an anchor host through the keyboard`
  with the same timeout, so that case is at its budget on this container independently of this unit.
- `journey:dark-390` also failed it and `paints a focus ring on every variant reached through the
  keyboard` with the sections removed.
- `journey:light-390` passed all three keyboard cases with the sections removed and failed two of
  them with the sections restored.

`traverseAccessible` walks forward from the current focus and wraps, so the focus-ring case costs one
full walk of the focusable population per Button specimen. This unit's sections add tab stops after
the Buttons region, and every wrap passes through them.

**What this unit did about it.** The Breadcrumb section was cut from three specimens carrying seven
links to two carrying three, which is the reduction available without dropping a shipped selector's
specimen. After it, every variant passes when run alone, including with `CAPTURE=1`.

**Done or not done.** Done for the per-variant runs; the concurrent `npm run test:journey` reading is
carried to the Orchestrator. Per `.agents/orchestration.md` § Writing concurrency rule 10, the
deciding re-run belongs to the Orchestrator after this unit exits.

### Deviation 5 — `tests/setupServer.test.ts` oracle cases time out intermittently

Two cases in that file, `oracle action bindings and exclusions` and `records and reads official
control state and rejects contradicted or absent obligation steps`, each launch a browser and drive
Bootstrap's own bundle inside a 10.1-second budget. Across four `npm run test:setup` runs they failed
in different combinations and passed in the final run, while the two deterministic failures persisted
unchanged. They are timing failures on this container, unrelated to this unit. No patch.

### Deviation 6 — the design verdict the brief names does not exist

`./tmp/units/b-passive-design-verdict.md` is absent from the worktree; `tmp/units/` holds only the
brief, the family record, the baseline addendum, and the terrain report. The family record cites it
for the refusal list (ruling 8), the specimen list (ruling 5), and the reduced-motion ruling
(ruling 9). This unit executed from the brief's own § Obligation 1 unit specifics, which state the
specimens for all three keys; ruling 9 is inert here, because none of these keys records a transition
or an animation, and ruling 8's refusals are satisfied by shipping Bootstrap's recorded set exactly.
**Recorded and carried on** rather than stopped, because the brief supplied the content the missing
file would have.

### Deviation 7 — a scenario name carrying a mode token, corrected

The inverted close scenario was first registered as `close-on-dark`, and
`tests/setup.test.ts > carries no mode token in a scenario` refused it: the grammar bans `light` and
`dark` anywhere in a stem. The subject was renamed `Close inverted` and the scenario
`close-inverted`, in `app/browser/constants.ts`, `tests/setup.ts`, `tests/app/browser/sections/CloseSection.test.ts`,
and the guide's stem table. Recorded rather than stopped: the choice of specimen wording is this
unit's to settle.

## Claims this unit flags as unverified

- **The concurrent journey reading.** `npm run test:journey` has not passed on this container in any
  run, before or after this unit's edits. The per-variant runs are the evidence offered; whether the
  concurrent run is green on a less loaded host is not established here.
- **The mixin patch's effect on the sibling units.** The patch was measured against this worktree's
  tree alone. Whether `inline-center`, `flex-wrap`, and `text-square` cover the pairs B-PASSIVE-B to E
  will meet is a hypothesis, not a measurement.
- **`findRule`'s completeness.** The three proofs use it for rule presence and absence, and it is a
  substring lookup. The conformance ledger is what holds the recorded set whole; the proof cases
  state that in their own comments.
- **The capture regions.** Four frames were read directly and named in § Capture names written. The
  other 52 were guarded by `measureVariation` inside the journey and not read by eye here.

## Tree state

`git status --porcelain`:

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/ledger/departures.md
 M guides/veneer.md
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/conformance.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/BadgeSection.ts
?? app/browser/sections/BreadcrumbSection.ts
?? app/browser/sections/CloseSection.ts
?? src/styles/components/_badge.scss
?? src/styles/components/_breadcrumb.scss
?? src/styles/components/_close.scss
?? tests/app/browser/sections/BadgeSection.test.ts
?? tests/app/browser/sections/BreadcrumbSection.test.ts
?? tests/app/browser/sections/CloseSection.test.ts
?? tests/src/styles/components/badge.test.ts
?? tests/src/styles/components/breadcrumb.test.ts
?? tests/src/styles/components/close.test.ts
```

`git diff --stat`:

```text
 app/browser/Showcase.ts               |   6 +
 app/browser/constants.ts              | 100 +++++++++++++++
 app/browser/index.ts                  |   3 +
 guides/ledger/departures.md           |  21 ++-
 guides/veneer.md                      | 234 +++++++++++++++++++++++-----------
 src/styles/index.scss                 |   3 +
 tests/app/browser/Showcase.test.ts    |   9 ++
 tests/app/browser/index.test.ts       |   9 ++
 tests/app/browser/integration.test.ts |  39 ++++++
 tests/conformance.test.ts             |   3 +
 tests/setup.test.ts                   |   9 +-
 tests/setup.ts                        |  58 +++++++++
 tests/setupStyles.test.ts             | 115 +++++++++++++++++
 tests/setupStyles.ts                  |  84 ++++++++++++
 14 files changed, 614 insertions(+), 79 deletions(-)
```

Every listed path is owned or shared. `ROADMAP.md` was read and not edited. No off-limits file was
touched. The probe directory `tmp/probe/` was deleted before this report was written; `tmp/capture/`
holds the portfolio and `tmp/units/` the launch pair.
