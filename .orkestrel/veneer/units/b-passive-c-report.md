# Unit B-PASSIVE-C report — `card`, `list-group`

Both keys ship. The built cascade emits every recorded selector and custom property of each key and
nothing else; the comparison reports twelve tokenized departures and no addition; every recorded
selector is exercised by a proof and rendered by a specimen; the portfolio carries a frame per
specimen plus three driven-state frames per variant. Two gates in the `setup` project stay red on
off-limits files, with exact patches under § Deviations.

## Pre-edit comparison reading

Over the untouched worktree at `3a9202a`, with `PATH` carrying npm 11 and Node 22.22.2:

- `npm run build:src` exit 0; `dist/src/styles/index.css` 89.10 kB.
- `npm run test:conformance` exit 0, 17 passed, 0 failed.
- The whole log carries no `card` and no `list-group` match (`grep -ci 'card\|list-group'` → 0), so
  neither key was measured and neither had a ledger row.
- § Deferred selectors carried no row for either key (`grep 'card\|list-group'` over the section
  returned nothing), so this unit retires none.

## Per obligation

### Obligation 1 — the partials

- `src/styles/components/_card.scss` (new, 214 lines): the card box and its slots, the rule and
  list-group combinators, the body and title family, both caps and their radii, both header
  navigations, the overlay, the three image placements, and the card group under the tree's
  `breakpoint-up(sm)` mixin. The `.card > .list-group` combinators are authored here alone.
- `src/styles/components/_list-group.scss` (new, 169 lines): the group box and its slots, items and
  their joins, the selected overlap, the disabled pair, the action states, the numbered counter, the
  horizontal ramp through `breakpoint-each`, the flush edges, and the contextual roles through
  `tokens.$aliased`.
- `src/styles/index.scss` (shared): `@use 'components/card';` and `@use 'components/list-group';`
  appended after `@use 'components/vr';`.

No containment, no `box-shadow` on `.card` (`--bs-card-box-shadow` declares empty), no
`.card-flush`, no `.card-frame`, no `-tertiary` list-group variant, no right-to-left output.

### Obligation 2 — the proofs

- `tests/src/styles/components/card.test.ts` (new, 334 lines), 24 cases.
- `tests/src/styles/components/list-group.test.ts` (new, 385 lines), 33 cases.
- `tests/setupStyles.ts` (shared, appended): `CARD_SELECTORS`, `CARD_SPACE_CASES`,
  `CARD_EMPTY_PROPERTIES`, `CARD_GROUP_CASES`, `CARD_MARKUP`, `LIST_GROUP_SELECTORS`,
  `LIST_GROUP_SPACE_CASES`, `LIST_GROUP_PALETTE_CASES`, `LIST_GROUP_ROLES`,
  `LIST_GROUP_ACTION_CASES`, `LIST_GROUP_HORIZONTAL_CASES`, `LIST_GROUP_MARKUP`.
- `tests/setupStyles.test.ts` (shared, appended): the export-name rows and two binding cases,
  `binds the card case families to the inventory and the ramp` and `binds the list-group case
  families to the inventory and the ramp`, each partitioning the recorded vocabulary and holding
  every table and entry frozen.

`CARD_GROUP_CASES` and `LIST_GROUP_HORIZONTAL_CASES` derive their boundaries from
`GRID_BREAKPOINT_CASES`, and the binding cases read each recorded condition back through
`parseMediaWidth`, so the ramp and the conditions the cascade emits cannot name two widths.

### Obligation 3 — the showcase and the capture registry

- `app/browser/constants.ts` (shared, appended): `CARD_COPY`, `CARD_SPECIMENS` (8 specimens),
  `LIST_GROUP_COPY`, `LIST_GROUP_SPECIMENS` (13 specimens; the breakpoint ramp and the role list are
  each mapped from a source list).
- `app/browser/sections/CardSection.ts`, `ListGroupSection.ts` (new): `SpecimenSection` subclasses.
- `app/browser/index.ts`, `app/browser/Showcase.ts` (shared): re-exports and construction after
  `TableSection`, in alphabetical region order (`Card`, then `List group`).
- `tests/app/browser/sections/CardSection.test.ts`, `ListGroupSection.test.ts` (new).
- `tests/app/browser/Showcase.test.ts`, `index.test.ts` (shared): region, specimen, and export
  literals extended at their alphabetical positions.
- `tests/setup.ts` (shared): 21 subject names added to `CaptureSubject`, 21 rows appended to
  `CASCADE_KEYS`, and `LIST_GROUP_KEYS` added after it carrying the three driven scenarios, spread
  last into `CAPTURE_KEYS`.
- `tests/setup.test.ts` (shared): the export row, the concatenation assertion, and a new case
  `drives a state only for a specimen the resting registry already photographs`.
- `tests/app/browser/integration.test.ts` (shared): the specimen tables added to the declared-subject
  set, and a new case `drives one list-group action to hover, focus, and press, and photographs each
  state`.

### Obligation 4 — the accounting

`npm run build:src && npm run test:conformance` printed twelve unrecorded departure rows and no
addition row; the rows were written to the component tables and the loop re-run green (17 passed).
Compatibility rows added: a `selector` row and a `variable` row per key, in the `btn` and `table`
voice, inserted after the `vr` selector row. `listed` in `tests/conformance.test.ts` gained `'card'`
after `'btn'` and `'list-group'` before `'list-inline'`. Deferral rows retired: none — the table
carries no `card` and no `list-group` row. Kept deferred and authored absent: none.

### Obligation 5 — the guide

`guides/veneer.md`: `### Card classes` and `### List group classes` appended after `### Helper
classes` in barrel order, in the voice of `### Table classes`; a § Files row per partial appended
after the `_vr.scss` row. No ledger row and no ledger path was written into `guides/veneer.md`.

## Ledger rows

Per the Orchestrator's D14 ruling these rows were written to their launch-time location and are
reproduced here for the move into `guides/veneer.md` § Tokens. Every row is `tokenized`, every
`Condition` cell is `—`, and no addition row and no deferral row changed.

### `#### \`card\`` — Departures

```text
| `card`    | `.card`  | `--bs-card-spacer-y`            | —         | `1rem`          | `var(--vn-space-8)` | tokenized |
| `card`    | `.card`  | `--bs-card-spacer-x`            | —         | `1rem`          | `var(--vn-space-8)` | tokenized |
| `card`    | `.card`  | `--bs-card-title-spacer-y`      | —         | `0.5rem`        | `var(--vn-space-4)` | tokenized |
| `card`    | `.card`  | `--bs-card-cap-padding-y`       | —         | `0.5rem`        | `var(--vn-space-4)` | tokenized |
| `card`    | `.card`  | `--bs-card-cap-padding-x`       | —         | `1rem`          | `var(--vn-space-8)` | tokenized |
| `card`    | `.card`  | `--bs-card-img-overlay-padding` | —         | `1rem`          | `var(--vn-space-8)` | tokenized |
| `card`    | `.card`  | `--bs-card-group-margin`        | —         | `0.75rem`       | `var(--vn-space-6)` | tokenized |
```

### `#### \`list-group\`` — Departures

```text
| `list-group` | `.list-group` | `--bs-list-group-item-padding-x`      | —         | `1rem`          | `var(--vn-space-8)`            | tokenized |
| `list-group` | `.list-group` | `--bs-list-group-item-padding-y`      | —         | `0.5rem`        | `var(--vn-space-4)`            | tokenized |
| `list-group` | `.list-group` | `--bs-list-group-active-color`        | —         | `#fff`          | `var(--vn-palette-white-base)` | tokenized |
| `list-group` | `.list-group` | `--bs-list-group-active-bg`           | —         | `#0d6efd`       | `var(--vn-palette-blue)`       | tokenized |
| `list-group` | `.list-group` | `--bs-list-group-active-border-color` | —         | `#0d6efd`       | `var(--vn-palette-blue)`       | tokenized |
```

### Additions

None. `guides/ledger/additions.md` is unmodified (`git diff --stat` over it is empty).

### Deferral rows struck

None.

## Token reuse and literal rulings, per value

Routed onto an existing `--vn-*` token that already resolves to the recorded value:

| Property                          | Bootstrap 5.3.8 | Token                      | Why it is reachable                        |
| --------------------------------- | --------------- | -------------------------- | ------------------------------------------ |
| `--bs-card-spacer-y`              | `1rem`          | `--vn-space-8`             | Resolves to `1rem` at the published density |
| `--bs-card-spacer-x`              | `1rem`          | `--vn-space-8`             | Same                                       |
| `--bs-card-title-spacer-y`        | `0.5rem`        | `--vn-space-4`             | Resolves to `0.5rem`                        |
| `--bs-card-cap-padding-y`         | `0.5rem`        | `--vn-space-4`             | Same                                       |
| `--bs-card-cap-padding-x`         | `1rem`          | `--vn-space-8`             | Same                                       |
| `--bs-card-img-overlay-padding`   | `1rem`          | `--vn-space-8`             | Same                                       |
| `--bs-card-group-margin`          | `0.75rem`       | `--vn-space-6`             | Resolves to `0.75rem`                       |
| `--bs-list-group-item-padding-x`  | `1rem`          | `--vn-space-8`             | Same                                       |
| `--bs-list-group-item-padding-y`  | `0.5rem`        | `--vn-space-4`             | Same                                       |
| `--bs-list-group-active-color`    | `#fff`          | `--vn-palette-white-base`  | Resolves to `#fff`                          |
| `--bs-list-group-active-bg`       | `#0d6efd`       | `--vn-palette-blue`        | Resolves to `#0d6efd`                       |
| `--bs-list-group-active-border-color` | `#0d6efd`   | `--vn-palette-blue`        | Same                                       |

Written as the release writes them, recording nothing: every value already naming a `--bs-*` global
the tree declares — `var(--bs-border-width)`, `var(--bs-border-color-translucent)`,
`var(--bs-border-radius)`, `var(--bs-body-bg)`, `var(--bs-body-color)`, `var(--bs-border-color)`,
`var(--bs-secondary-color)`, `var(--bs-emphasis-color)`, `var(--bs-tertiary-bg)`,
`var(--bs-secondary-bg)`, `var(--bs-{role}-text-emphasis)`, `var(--bs-{role}-bg-subtle)`,
`var(--bs-{role}-border-subtle)` — plus `rgba(var(--bs-body-color-rgb), 0.03)`,
`calc(var(--bs-border-radius) - (var(--bs-border-width)))`, and the six card slots the release
declares with no value.

**The one ruling where design fit and the ceiling point different ways.**
`--bs-list-group-active-bg` and `--bs-list-group-active-border-color` record `#0d6efd`.
`--vn-color-primary-base` is the semantic token for a selected surface, and it is what `_button.scss`
routes `.btn-primary` onto — but it resolves to `oklch(0.48 0.255 264)`, which is not the recorded
value, so family ruling 4 bars it. `--vn-palette-blue` resolves to `#0d6efd` exactly, and
`.claude/rules/styles.md` bars the literal outside `_tokens.scss`, so the palette entry is the one
token the ceiling admits. The consequence is recorded in the guide and read by
`list-group tokens > reads $property from its own token`: retuning the palette entry moves the
selected row, retuning the primary role does not. **This is an observation for the Orchestrator, not
a criterion:** a later ruling that the selected row must follow the primary role is a departure of a
different member and a guide sentence, not a change this unit can make under ruling 4.

## Coverage matrix

Every recorded site of each key, with the proof case that reads it, the subject that case reads, the
specimen that renders it, and the capture scenario that photographs it. The condition column is `—`
where the site sits under no at-rule.

### `card` — 37 recorded sites

| Recorded site(s) | Condition | Proof case (`card.test.ts`) | Subject read | Specimen | Scenario |
| --- | --- | --- | --- | --- | --- |
| `.card`, `.card-body`, `.card-title`, `.card-subtitle`, `.card-header`, `.card-footer` | — | `card geometry > spaces the caps, the body, and the title family from the card slots` | `.card` and its caps and body | `Card base` | `card-base` |
| `.card-text:last-child`, `.card-link + .card-link`, `.card > hr` | — | `card geometry > clears the last text block and separates a rule and a link pair` | the two `.card-text` blocks, the two `.card-link` anchors, the `hr` | `Card rule` | `card-rule` |
| `.card-header:first-child`, `.card-footer:last-child`, `.card-img`, `.card-img-top`, `.card-img-bottom` | — | `card geometry > rounds the caps and the images to the card inner radius` | both caps and the three images | `Card images` | `card-images` |
| `.card-img-overlay` | — | `card geometry > bounds the overlay to the card box and pads it from its own slot` | the overlay | `Card overlay` | `card-overlay` |
| `.card > .list-group`, `:first-child`, `:last-child`, `.card > .card-header + .list-group`, `.card > .list-group + .card-footer` | — | `card geometry > rounds and unrounds a list group by the position it takes inside the card` | the group, the footer after it, the cap before it | `Card list` | `card-list` |
| `.card-header-tabs`, `.card-header-tabs .nav-link.active`, `.card-header-pills` | — | `card geometry > paints an already active header tab into the cap and pulls both header navigations flush` | both navigations, the active tab, a resting link | `Card tabs`, `Card pills` | `card-tabs`, `card-pills` |
| `.card-group > .card` | — | `card groups > joins its cards into one row only at and above the card-group boundary` (below the boundary) | both cards | `Card group` | `card-group` |
| `.card-group`, `> .card`, `> .card + .card`, `> .card:not(:last-child)` and its four children, `> .card:not(:first-child)` and its four children | `@media (min-width: 576px)` | the same case (at and above the boundary, at `575`, `576`, `577`) | both cards, both caps, both images | `Card group` | `card-group` |

The token, override, factor, and mode readings sit in `card tokens`: `reads $property from its own
token` (7 cases), `declares %s with no value of its own` (6 cases), `retunes a card from the
compatibility properties a consumer sets on it`, `rescales the card with the density and radius
factors`, and `repaints the card and its caps in %s mode` (2 cases).

### `list-group` — 67 recorded sites

| Recorded site(s) | Condition | Proof case (`list-group.test.ts`) | Subject read | Specimen | Scenario |
| --- | --- | --- | --- | --- | --- |
| `.card > .list-group` and its four card siblings | — | read in `card.test.ts`, `card geometry > rounds and unrounds a list group by the position it takes inside the card` | the group inside a card | `Card list` | `card-list` |
| `.list-group`, `.list-group-item`, `:first-child`, `:last-child` | — | `list-group geometry > stacks its items, pads them from its own slots, and rounds the ends alone` | the group and its three items | `List group base` | `list-group-base` |
| `.list-group-item + .list-group-item`, `+ .list-group-item.active`, `.list-group-item.active` | — | `list-group geometry > collapses the shared edge between adjacent items and restores it under an active one` | the first and middle items | `List group active` | `list-group-active` |
| `.list-group-numbered`, `.list-group-numbered > .list-group-item::before` | — | `list-group geometry > numbers its items from a counter the group resets` | the group and an item's `::before` | `List group numbered` | `list-group-numbered` |
| `.list-group-flush`, `> .list-group-item`, `> .list-group-item:last-child` | — | `list-group geometry > flushes its own edges and drops the last item rule` | the group and its items | `List group flush` | `list-group-flush` |
| `.list-group-item.disabled`, `.list-group-item:disabled` | — | `list-group geometry > disables an item on a class and on the native attribute alike` | the flagged anchor, the native button, a resting action | `List group disabled` | `list-group-disabled` |
| `.list-group-item-action` | — | `list-group actions > widens an action and returns its text to the container alignment` | a button host | `List group actions` | `list-group-actions` |
| `.list-group-item-action:not(.active):hover`, `:focus`, `:active` | — | `list-group actions > paints a resting action on $state and leaves an active one alone` (3 cases) | the resting anchor and the selected anchor | `List group actions` | `list-group-actions-hover`, `list-group-actions-focus`, `list-group-actions-active` |
| `.list-group-horizontal` and its five children | — | `horizontal list groups > lays list-group-horizontal out as a row only at and above its boundary` | the group and its three items | `List group horizontal` | `list-group-horizontal` |
| `.list-group-horizontal-{sm,md,lg,xl,xxl}` and their five children each | `@media (min-width: {576,768,992,1200,1400}px)` | the same case per name, at `boundary - 1`, `boundary`, `boundary + 1` | the group and its three items | `List group horizontal {sm..xxl}` | `list-group-horizontal-{sm..xxl}` |
| `.list-group-item-{primary,secondary,success,info,warning,danger,light,dark}` | — | `contextual list-group roles > retunes every group slot from the %s role` (8 cases) | the tinted item against a plain one | `List group roles` | `list-group-roles` |

`contextual list-group roles > emits no variant for the role Bootstrap 5.3.8 does not name` reads
`.list-group-item-tertiary` as an unstyled item, which is the absence the role walk owes. The token,
override, factor, and mode readings sit in `list-group tokens`: `reads $property from its own token`
(2 space cases and 3 palette cases), `retunes a group from the compatibility properties a consumer
sets on it`, `rescales the group with the density and radius factors`, and `repaints the group and
its action states in %s mode` (2 cases).

## Written capture names

`CAPTURE=1 npm run test:journey` exit 0 wrote 132 frames and 116 accessibility artifacts under
`tmp/capture/states`, 244 files including the four per-variant manifests. The scenarios this unit
registered, each expanded over `light-1280`, `dark-1280`, `light-390`, and `dark-390`:

```text
card-base                      card-rule                      card-images
card-overlay                   card-list                      card-tabs
card-pills                     card-group                     list-group-base
list-group-active              list-group-disabled            list-group-actions
list-group-actions-hover       list-group-actions-focus       list-group-actions-active
list-group-numbered            list-group-flush               list-group-horizontal
list-group-horizontal-sm       list-group-horizontal-md       list-group-horizontal-lg
list-group-horizontal-xl       list-group-horizontal-xxl      list-group-roles
```

Each frame is `<scenario>--<theme>-<viewport>.png`; each of the 21 subjects also received
`<stem>--<theme>-<viewport>-accessibility.txt`.

**Observation on the driven frames.** `list-group-actions-hover` and `list-group-actions-focus` are
byte-identical in size at each variant, because the cascade's hover rule and focus rule declare one
pair of slots and the programmatic focus paints no ring. The two frames are an honest record of that
identity rather than a duplicate of one state.

## Commands run, with exit codes

Gate chain, all after the final edit, in the order family ruling 14 fixes:

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | 219 files |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | no diagnostic |
| `npm run build:src` | 0 | `dist/src/styles/index.css` written |
| `npm run test:setup` | 1 | 161 passed, 2 failed (both off-limits, § Deviations) |
| `npm run test:src:styles` | 0 | 473 passed |
| `npm run test:app` | 0 | 30 passed |
| `npm run test:conformance` | 0 | 17 passed |
| `npm run test:guides` | 0 | 18 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped |
| `npm run test:journey` | 0 | 104 passed |
| `CAPTURE=1 npm run test:journey` | 0 | 104 passed, 244 files written |

Built-cascade presence, read from `dist/src/styles/index.css` with postcss after the final
`npm run build:src`:

```text
card: recorded selectors=36 missing=[]; recorded properties=19 missing=[]
list-group: recorded selectors=67 missing=[]; recorded properties=17 missing=[]
```

(36 and 67 are the distinct selector strings; the card key's 37 recorded sites include
`.card-group > .card` twice, once under no condition and once under the `sm` query.)

**Observations, not criteria.** `npm test` exits 1 at `test:setup` with the same two off-limits
failures and every project before it green: `src` 77 passed, `src:styles` 473 passed, `app` 30
passed, journey 104 passed, policy 109 passed, config 173 passed. Wall clock: the whole chain
2m41s, `test:journey` 1m10s, `CAPTURE=1 npm run test:journey` 1m07s, `test:conformance` 8s.

## Status and diffstat

`git status --porcelain` lists owned and shared files only:

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
?? app/browser/sections/CardSection.ts
?? app/browser/sections/ListGroupSection.ts
?? src/styles/components/_card.scss
?? src/styles/components/_list-group.scss
?? tests/app/browser/sections/CardSection.test.ts
?? tests/app/browser/sections/ListGroupSection.test.ts
?? tests/src/styles/components/card.test.ts
?? tests/src/styles/components/list-group.test.ts
```

`git diff --stat` over the tracked files:

```text
 app/browser/Showcase.ts               |   4 +
 app/browser/constants.ts              | 119 ++++++++++++++++++
 app/browser/index.ts                  |   2 +
 guides/ledger/departures.md           |  22 ++++
 guides/veneer.md                      | 224 ++++++++++++++++++++++++----------
 src/styles/index.scss                 |   2 +
 tests/app/browser/Showcase.test.ts    |   6 +
 tests/app/browser/index.test.ts       |   6 +
 tests/app/browser/integration.test.ts |  94 ++++++++++++++
 tests/conformance.test.ts             |   2 +
 tests/setup.test.ts                   |  21 +++-
 tests/setup.ts                        | 167 +++++++++++++++++++++++++
 tests/setupStyles.test.ts             | 159 ++++++++++++++++++++++++
 tests/setupStyles.ts                  | 199 ++++++++++++++++++++++++++++++
 14 files changed, 964 insertions(+), 63 deletions(-)
```

The new files add 1334 lines: `_card.scss` 214, `_list-group.scss` 169, `card.test.ts` 334,
`list-group.test.ts` 385, the two sections 20 each, `CardSection.test.ts` 86,
`ListGroupSection.test.ts` 106.

## Deviations

### D1 — `tests/setupServer.test.ts` is red and off-limits (not done, patch supplied)

**Expected** `npm run test:setup` exit 0. **Found** exit 1, 2 failed. The case
`server setup > skips engine and CSS obligations whose Proof cell is a dash` compares the
compatibility table's component set against a written `Set` literal, so the two compatibility rows
this unit adds redden it:

```text
AssertionError: expected Set{ 'g', 'gx', 'gy', 'row-gap', …(30) } to deeply equal Set{ 'blockquote', 'btn', 'col', …(29) }
+   "card",
+   "list-group",
```

The file is off-limits under family ruling 13, so it was not touched. Exact patch, inside the `new
Set([...])` literal around line 1130:

```diff
 				'btn',
+				'card',
 				'col',
@@
 				'link',
+				'list-group',
 				'list-inline',
```

### D2 — the shared-declaration sweep needs a mixin in an off-limits file (not done, patch supplied)

**Expected** the sweep clean. **Found**
`styles setup > carries no shared written declaration block across style partials` reports four
overlaps, each of at least two identical declarations across distinct partials:

```text
components/_card.scss:4       <-> components/_list-group.scss:5   :: ["display: flex","flex-direction: column"]
components/_card.scss:4       <-> elements/_figure.scss:4         :: ["display: flex","flex-direction: column"]
components/_list-group.scss:5 <-> elements/_figure.scss:4         :: ["display: flex","flex-direction: column"]
components/_card.scss:136     <-> components/_ratio.scss:17       :: ["position: absolute","top: 0","left: 0"]
```

Both declarations are the release's own and cannot be split or reordered away. The repository's own
remedy is `_mixins.scss`, which family ruling 13 puts off-limits together with `elements/_figure.scss`
and every component partial that is not this unit's, so the change was measured on a scratch copy of
`src/styles` rather than applied. **Measurement:** with the patch applied, the expanded Sass compile
is the same length and carries the same declaration multiset as the current one; three lines differ,
all inside `.card-img-overlay`, where `left: 0` moves ahead of `right: 0` and `bottom: 0`. No other
partial writes either shape afterwards (`_button.scss` writes `position: absolute` alone, which is a
one-declaration intersection the sweep does not report).

`src/styles/_mixins.scss`, before `@mixin image-size`:

```scss
// Emits the column flex stack `figure`, `.card`, and `.list-group` each lay their content out
// with. The three write the same pair and nothing else of the shape, so it is written once here
// rather than copied into each partial.
@mixin stack-column {
	display: flex;
	flex-direction: column;
}

// Emits the absolute origin an overlay box pins itself to. `.ratio > *` and `.card-img-overlay`
// each take it and then declare the edges or the size of their own, so the shared start sits here
// and the difference stays with the caller.
@mixin pin-origin {
	position: absolute;
	top: 0;
	left: 0;
}
```

`src/styles/components/_ratio.scss`:

```diff
 @use 'sass:math';
+@use '../mixins' as *;
@@
 	.ratio > * {
-		position: absolute;
-		top: 0;
-		left: 0;
+		@include pin-origin;
 		width: 100%;
```

`src/styles/elements/_figure.scss`:

```diff
 	figure {
-		display: flex;
-		flex-direction: column;
+		@include stack-column;
 		gap: var(--vn-space-4);
```

`src/styles/components/_card.scss` (this unit's, applied with the rest):

```diff
 		position: relative;
-		display: flex;
-		flex-direction: column;
+		@include stack-column;
 		min-width: 0;
@@
 	.card-img-overlay {
-		position: absolute;
-		top: 0;
+		@include pin-origin;
 		right: 0;
 		bottom: 0;
-		left: 0;
```

`src/styles/components/_list-group.scss` (this unit's, applied with the rest):

```diff
 	.list-group {
@@
-		display: flex;
-		flex-direction: column;
+		@include stack-column;
 		padding-left: 0;
```

The unit's own half was left unapplied deliberately: a partial including a mixin `_mixins.scss` does
not declare fails the build, so applying half would take every other gate red. Apply the patch whole
at integration; the compiled cascade, the ledger, and the conformance gate are unaffected by it.

### D3 — one existing line rewritten in `tests/setup.test.ts` (done, under the Orchestrator's grant)

`expect(CAPTURE_KEYS).toStrictEqual([...SHOWCASE_KEYS, ...BUTTON_KEYS, ...CASCADE_KEYS])` became a
four-member spread across five lines, adding `...LIST_GROUP_KEYS`. The Orchestrator's mid-unit note
grants this for a driven-state list; family ruling 13 otherwise forbids it. The overlap with a
sibling's own spread is resolved at integration.

### D4 — the guide's § Files table was re-padded by the formatter (done, recorded)

`src/styles/components/_list-group.scss` is one character longer than the widest cell that table
carried, so `npm run format:check` failed until `oxfmt` re-padded the File column. The diff is
contained to lines 179–242 and touches no prose:

```text
179,194c179,194
196,242c196,242
```

This is the mutating `format` the gate order tells a unit to run first to converge, applied to a
shared file. Every sibling unit adding a partial with a long path produces the same reflow, and
re-running the formatter after integration makes any two of them agree.

### D5 — the design verdict resolved outside the worktree (done, recorded)

The brief names `./tmp/units/b-passive-design-verdict.md`. That file is absent from
`/home/user/veneer-bc/tmp/units/`; it was read from its retained copy at
`/home/user/scaffold/.orkestrel/veneer/b-passive-design-verdict.md`. Its ruling 5 fixes the showcase
shape rather than a per-key specimen list, so the specimen set was derived from that shape, from the
brief's own Obligation 1 sentence, and from family ruling 9's floor: every recorded selector rendered
by a specimen at least once.

### D6 — two specimen names and one role table changed shape (decided within scope, recorded)

- A specimen may not share a name with a region: `readSubject` refuses `2 rendered subjects answer
  to the name "Card"`. The base specimens are named `Card base` and `List group base`.
- A scenario stem may carry no mode token (`tests/setup.test.ts > carries no mode token in a
  scenario`), so a per-role specimen named `List group light` or `List group dark` cannot be
  registered. The eight contextual roles share one `List group roles` specimen, mapped from the role
  list, rather than one specimen each.
- The action specimen's hosts are named `Dispatch lane`, `Holding lane`, and `Return lane` so the
  journey's name-based pointer verbs resolve one control. The card links, both header navigations,
  and the disabled specimen's anchors carry no `href`, which keeps them painted and out of the tab
  order; the journey's traversal cases sit at 7.1s and 5.1s against a 15s cap on the untouched
  showcase, and every focusable a section adds is paid on every traversal.

### D7 — the driven frames are element frames of a lifted specimen (deviates from the note, measured)

The Orchestrator's note says to place a driven frame with `FRAMES.page`. Measured against that:

- A page frame scrolls the document under a pointer that does not move with it, so the hover frame
  came back at the resting fill and `expect(host.matches(':hover')).toBe(true)` reddened after the
  shot.
- An element frame of the specimen where the showcase renders it came back blank at the 390-wide
  variants — 390x116 at 463 bytes, against 4611 bytes for the same frame taken at the document's
  start — and the capture guard reported `Uniform frame region:
  tmp/capture/states/list-group-actions-hover--light-390.png`.

The case therefore moves the rendered specimen itself to the document's start for its own duration
and puts it back in a `finally` block, which is the cascade scenarios' lift without the copy: a copy
answers to the same accessible name as the original and the pointer verbs resolve a control by that
name. All three frames are element frames of the moved specimen, the pointer readings are taken in
the staged layout the shot uses, and the case asserts the specimen is back under its own parent
before it ends. `CAPTURE=1 npm run test:journey` exits 0 with the guard green at every variant.

### D8 — one cascade key's sampling selector was widened (decided within scope, recorded)

`Card rule` first declared `.card > hr` as its `CascadeKey` selector, which made the frame's declared
region a one-pixel uniform line and reddened the capture guard with `Uniform frame region:
tmp/capture/states/card-rule--light-1280.png`. The key now reads `.card` and
`border-bottom-color`; the rule itself is still rendered by the specimen and read by
`card geometry > clears the last text block and separates a rule and a link pair`.

## Claims of my own I flag as unverified

- **The traversal budget.** `journey > toggles a native host and an anchor host through the keyboard`
  and `journey > paints a focus ring on every variant reached through the keyboard` timed out at
  15s in two of the four-variant runs taken while this unit was in flight, and passed in every run
  after the specimen markup settled, including the two final ones. The measured cost with the new
  sections is 9.3s and 5.5s against a 15s cap, from 7.1s and 5.1s without them. I have not
  established a margin: the cases are timing-sensitive, they sit inside a four-project parallel run,
  and each further B-PASSIVE section spends more of the same budget. The authoritative reading
  belongs to the Orchestrator's own `verifier` run.
- **The two byte-identical driven frames.** I read the hover and focus frames as identical because
  the two rules declare one pair of slots, and the file sizes agree at each variant. I did not
  compare their bytes.
- **The `-tertiary` absence.** `contextual list-group roles > emits no variant for the role
  Bootstrap 5.3.8 does not name` reads the class as unstyled, which is evidence that no rule matches
  it in the built cascade rather than proof that no rule exists anywhere for it.
