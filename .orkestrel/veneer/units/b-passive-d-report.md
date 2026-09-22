# B-PASSIVE-D report — `pagination` as a Bootstrap 5.3.8 baseline

Worktree `/home/user/veneer-bd`, detached at `3a9202a`. The key ships. Every scoped gate this unit
owns is green except `npm run test:setup`, which fails on two off-limits files; both patches are
below. `npm run test:journey` is reported as a timing observation with a probe that separates it
from this unit.

## Pre-edit comparison reading

`npm run build:src && npm run test:conformance` over the untouched worktree: exit 0,
`Test Files 1 passed (1) / Tests 17 passed (17)`, duration 6.85s. No ledger row, no compatibility
row, and no deferral row named `pagination`, `page-link`, or `page-item` in `guides/veneer.md`,
`guides/ledger/departures.md`, or `guides/ledger/additions.md`
(`grep -n -i "pagination\|page-link\|page-item"` over the three files returned nothing), and
`grep -c pagination dist/src/styles/index.css` returned `0`.

§ Deferred selectors carries no `pagination` row, so this unit retires none. No name it ships stays
deferred.

## Per obligation

### Obligation 1 — the partial

`src/styles/components/_pagination.scss` (new, 122 lines) emits Bootstrap 5.3.8's recorded surface
for `pagination` under `@layer components`, after `@use '../mixins' as *`. `src/styles/index.scss`
gains `@use 'components/pagination';` immediately after `@use 'components/vr';`, which is the
position family ruling 8's order gives it against the lines present in this worktree.

`.page-link`'s transition is written through the `transition` mixin, so the
`@media (prefers-reduced-motion: reduce)` twin the inventory records is emitted with it.
`.page-link.active` and `.active > .page-link` are written as one rule of two selectors, as are
`.page-link.disabled` and `.disabled > .page-link`; the compiled cascade carries each selector
separately. The size classes are written inline on `.pagination-lg` and `.pagination-sm`, which is
the tree's idiom for Bootstrap's `pagination-size` mixin — `.btn-sm` and `.btn-lg` in
`_button.scss` write their own declarations, and `.claude/rules/styles.md` refuses a mixin for one
partial.

The partial does not `@use '../tokens'`: it iterates no role list, so the module would be unread.

### Obligation 2 — the proofs

- `tests/src/styles/components/pagination.test.ts` (new, 336 lines), `describe('pagination classes')`,
  16 cases, all green.
- `tests/setupStyles.ts` gains `PAGINATION_SELECTORS`, `PAGINATION_SIZE_CASES`,
  `PAGINATION_STATE_CASES`, `PAGINATION_PARENT_CASES`, and `PAGINATION_MARKUP`, frozen, appended at
  the file's end.
- `tests/setupStyles.test.ts` gains those names in its export literal and its import list, and the
  case `binds the pagination selectors, sizes, states, and state twins to the inventory`, which
  holds every table against `tests/fixtures/oracle/inventory.json` and against its own freeze.

### Obligation 3 — the showcase and the capture registry

- `app/browser/constants.ts` gains `PAGINATION_COPY` and `PAGINATION_SPECIMENS`, frozen, derived
  from one source list through one `.map` the way `TABLE_SPECIMENS` is.
- `app/browser/sections/PaginationSection.ts` (new) extends `SpecimenSection`, the shape
  `TableSection.ts` sets.
- `app/browser/index.ts` re-exports it; `app/browser/Showcase.ts` constructs it after
  `TableSection`, which is its alphabetical position among the region names present.
- `tests/app/browser/sections/PaginationSection.test.ts` (new, 93 lines), 2 cases, green.
- `tests/app/browser/Showcase.test.ts` gains `'Pagination'` at the end of the `regions` literal and
  `...PAGINATION_SPECIMENS` at the end of the specimen concatenation.
- `tests/app/browser/index.test.ts` gains `'PAGINATION_COPY'`, `'PAGINATION_SPECIMENS'`, and
  `'PaginationSection'` at their sorted positions.
- `tests/setup.ts` gains five subject names in `CaptureSubject`, five rows at the end of
  `CASCADE_KEYS`, the new list `PAGINATION_KEYS`, and `...PAGINATION_KEYS` last in `CAPTURE_KEYS`.
- `tests/setup.test.ts` gains `PAGINATION_KEYS` in its import and export literals, and the one
  rewritten line named under Deviations.
- `tests/app/browser/integration.test.ts` gains `PAGINATION_SPECIMENS` in its import and its
  `declared` subject set, and the case `repaints and lifts a page under the pointer and under
  keyboard focus, in both modes`.

### Obligation 4 — the accounting

The loop ran to green. `npm run build:src && npm run test:conformance` reported 13 unrecorded
departure rows and no addition row; the rows were written to `guides/ledger/departures.md` under a
new `#### \`pagination\`` table, placed between `#### \`offset\`` and `#### \`reboot\`` — the order
that file's own introduction fixes ("the order the shipped keys sort"), which is where the tree and
family ruling 5's "barrel order" disagree and the tree wins. `guides/veneer.md` § Compatibility
gains a `selector` row and a `variable` row with Status `shipped`; `tests/conformance.test.ts`
gains `'pagination'` in `listed`. Deferral rows retired: none. Deferred names this unit had to
author absent: none.

### Obligation 5 — the guide

`guides/veneer.md` gains `### Pagination classes` after `### Helper classes` and a § Files row for
the partial after the `_icon-link.scss` row. No `guides/ledger/` path appears in any prose this
unit wrote.

## Token reuse and literal rulings, per value

Family ruling 4's ceiling admits a `--vn-*` token only where it already resolves to Bootstrap's
recorded value, and `.claude/rules/styles.md` refuses a literal color in a partial. Every value was
ruled against both.

| Recorded value                             | Ruling                                                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `0.75rem`, `0.375rem`                      | `var(--vn-space-6)`, `var(--vn-space-3)` — each resolves to the recorded length and carries `--vn-factor-density`.              |
| `1.5rem`, `0.5rem`, `0.25rem` (padding)    | `var(--vn-space-12)`, `var(--vn-space-4)`, `var(--vn-space-2)` — same ruling.                                                   |
| `1rem`, `1.25rem`, `0.875rem`              | `var(--vn-size-3)`, `var(--vn-size-5)`, `var(--vn-size-2)` — each resolves to the recorded size exactly.                        |
| `#fff`                                     | `var(--vn-palette-white-base)` — resolves to `#fff`; a literal color is refused in a partial.                                   |
| `#0d6efd` (active fill and border)         | `var(--vn-palette-blue)` — resolves to `#0d6efd`. `--vn-color-primary-base` is `oklch(0.48 0.255 264)`, so the ceiling bars it. |
| `rgba(13, 110, 253, 0.25)` (focus shadow)  | `color-mix(in srgb, var(--vn-palette-blue) 25%, transparent)` — no token carries the alpha, and a literal color is refused.     |
| `0.25rem` (focus ring spread)              | Literal. `--vn-focus-width` is `0.1875rem`; `--vn-space-2` and `--vn-radius-small` carry the wrong factor for a ring width.     |
| `0.15s ease-in-out` (transition)           | Literal. `--vn-ease-standard` is `ease`, so the ceiling bars the pair `.btn` reads.                                             |
| `var(--bs-link-color)`, `var(--bs-body-bg)`, `var(--bs-border-width)`, `var(--bs-border-color)`, `var(--bs-border-radius)`, `var(--bs-border-radius-lg)`, `var(--bs-border-radius-sm)`, `var(--bs-link-hover-color)`, `var(--bs-tertiary-bg)`, `var(--bs-secondary-bg)`, `var(--bs-secondary-color)` | Written byte for byte; the tree declares each global, so each records nothing. |
| `calc(-1 * var(--bs-border-width))`        | Written byte for byte.                                                                                                         |
| every structural keyword and length on `.page-link`, `.pagination`, and the state rules | Written byte for byte.                                    |

## Ledger rows

No addition row was measured. No deferral row was struck. Every row below belongs to the
`#### \`pagination\`` table, written verbatim as follows.

| Component    | Selector         | Property                              | Condition | Bootstrap 5.3.8                          | Veneer                                                                      | Departure |
| ------------ | ---------------- | ------------------------------------- | --------- | ---------------------------------------- | --------------------------------------------------------------------------- | --------- |
| `pagination` | `.pagination`    | `--bs-pagination-padding-x`           | —         | `0.75rem`                                | `var(--vn-space-6)`                                                         | tokenized |
| `pagination` | `.pagination`    | `--bs-pagination-padding-y`           | —         | `0.375rem`                               | `var(--vn-space-3)`                                                         | tokenized |
| `pagination` | `.pagination`    | `--bs-pagination-font-size`           | —         | `1rem`                                   | `var(--vn-size-3)`                                                          | tokenized |
| `pagination` | `.pagination`    | `--bs-pagination-focus-box-shadow`    | —         | `0 0 0 0.25rem rgba(13, 110, 253, 0.25)` | `0 0 0 0.25rem color-mix(in srgb, var(--vn-palette-blue) 25%, transparent)` | tokenized |
| `pagination` | `.pagination`    | `--bs-pagination-active-color`        | —         | `#fff`                                   | `var(--vn-palette-white-base)`                                              | tokenized |
| `pagination` | `.pagination`    | `--bs-pagination-active-bg`           | —         | `#0d6efd`                                | `var(--vn-palette-blue)`                                                    | tokenized |
| `pagination` | `.pagination`    | `--bs-pagination-active-border-color` | —         | `#0d6efd`                                | `var(--vn-palette-blue)`                                                    | tokenized |
| `pagination` | `.pagination-lg` | `--bs-pagination-padding-x`           | —         | `1.5rem`                                 | `var(--vn-space-12)`                                                        | tokenized |
| `pagination` | `.pagination-lg` | `--bs-pagination-padding-y`           | —         | `0.75rem`                                | `var(--vn-space-6)`                                                         | tokenized |
| `pagination` | `.pagination-lg` | `--bs-pagination-font-size`           | —         | `1.25rem`                                | `var(--vn-size-5)`                                                          | tokenized |
| `pagination` | `.pagination-sm` | `--bs-pagination-padding-x`           | —         | `0.5rem`                                 | `var(--vn-space-4)`                                                         | tokenized |
| `pagination` | `.pagination-sm` | `--bs-pagination-padding-y`           | —         | `0.25rem`                                | `var(--vn-space-2)`                                                         | tokenized |
| `pagination` | `.pagination-sm` | `--bs-pagination-font-size`           | —         | `0.875rem`                               | `var(--vn-size-2)`                                                          | tokenized |

Members: `tokenized` × 13. Categories among additions: none.

## Coverage matrix

Every selector the inventory records for `pagination`, against the proof case that reads it, the
specimen that renders it, and the capture scenario that photographs it. `Condition` names the
at-rule where the inventory records one.

| Inventory selector and condition                            | Proof case                                                     | Subject          | Specimen           | Capture scenario                     |
| ------------------------------------------------------------ | -------------------------------------------------------------- | ---------------- | ------------------ | ------------------------------------ |
| `.pagination`                                                | lays the strip out as an unstyled row …                        | Page strip       | Page strip         | `page-strip`                         |
| `.page-link`                                                 | lays the strip out …; resolves the padding, font, and radius … | Page strip       | Page strip         | `page-strip`                         |
| `.page-link` @media (prefers-reduced-motion: reduce)         | collapses the feedback transition under the staged preference … | Page strip      | Page strip         | `page-strip`                         |
| `.page-link:hover`                                           | lifts a hovered link over its neighbour …                      | Page strip       | Page strip         | `page-strip-hover`                   |
| `.page-link:focus`                                           | paints the focus ring as a shadow the reader can measure …     | Page strip       | Page strip         | `page-strip-focus`                   |
| `.page-link.active`                                          | paints $direct and $parent alike; repaints the resting and active page in %s | Active page | Active page  | `active-page`                        |
| `.active > .page-link`                                       | paints $direct and $parent alike; lifts a hovered link …       | Page strip       | Page strip         | `page-strip`                         |
| `.page-link.disabled`                                        | paints $direct and $parent alike; refuses the pointer …        | Disabled page    | Disabled page      | `disabled-page`                      |
| `.disabled > .page-link`                                     | paints $direct and $parent alike; refuses the pointer …        | Disabled page    | Disabled page      | `disabled-page`                      |
| `.page-item:not(:first-child) .page-link`                    | collapses each pair of adjacent borders into one border width  | Page strip       | Page strip         | `page-strip`                         |
| `.page-item:first-child .page-link`                          | resolves the padding, font, and radius $name declares          | Page strip       | Page strip         | `page-strip`                         |
| `.page-item:last-child .page-link`                           | resolves the padding, font, and radius $name declares          | Page strip       | Page strip         | `page-strip`                         |
| `.pagination-lg`                                             | resolves the padding, font, and radius $name declares          | Large pagination | Large pagination   | `large-pagination`                   |
| `.pagination-sm`                                             | resolves the padding, font, and radius $name declares          | Small pagination | Small pagination   | `small-pagination`                   |

Every recorded selector also reaches the shipped cascade's components layer, read back through
`collectLayer('components')` in the case `lays the strip out as an unstyled row and every recorded
selector reaches the components layer`.

The four readings family ruling 11 owes per key:

- **Token beside the property it drives** — `consumes an override of every published property the
  resting link paints from` reads `--bs-pagination-bg` on the link and the `background-color` it
  drives.
- **Override** — the same case declares `--bs-pagination-padding-x`, `--bs-pagination-bg`, and
  `--bs-pagination-border-radius` on the strip and re-reads the padding, the fill, and the radius.
  It also reads the shadowed case first: the family class declares every published property itself,
  so a declaration on an ancestor is outranked and the strip is where a consumer retunes one.
- **Factor** — `drives the padding and the radius from the density and radius factors` doubles
  `--vn-factor-density` and `--vn-factor-radius` on the document element and reads the padding and
  the radius double.
- **Mode** — `repaints the resting and active page in %s` and `reads one resting surface in light
  and another in dark` read the fill, the text, and the border inside `data-bs-theme`.

## Capture names written

`CAPTURE=1 npm run test:journey` wrote 28 frames and 20 accessibility artifacts for this unit's
scenarios, at `tmp/capture/states/`:

- `page-strip--{light,dark}-{390,1280}.png`
- `page-strip-hover--{light,dark}-{390,1280}.png`
- `page-strip-focus--{light,dark}-{390,1280}.png`
- `active-page--{light,dark}-{390,1280}.png`
- `disabled-page--{light,dark}-{390,1280}.png`
- `small-pagination--{light,dark}-{390,1280}.png`
- `large-pagination--{light,dark}-{390,1280}.png`
- `page-strip--{light,dark}-{390,1280}-accessibility.txt`, and the same suffix for
  `active-page`, `disabled-page`, `small-pagination`, and `large-pagination`.

Every one of them passed the portfolio guard's `variation > 0` reading inside its declared region.

## Commands and exit codes

Taken after the final edit, in order, on the host the family record names.

| Command                                   | Result                                                        |
| ----------------------------------------- | ------------------------------------------------------------- |
| `npm run format:check`                    | exit 0                                                        |
| `npm run lint:check`                      | exit 0                                                        |
| `npm run check`                           | exit 0                                                        |
| `npm run build:src`                       | exit 0                                                        |
| `npm run test:setup`                      | 2 failed \| 159 passed (161) — both in off-limits files       |
| `npm run test:src:styles`                 | 59 files, 432 passed (432)                                    |
| `npm run test:app`                        | 11 files, 28 passed (28)                                      |
| `npm run test:conformance`                | 1 file, 17 passed (17)                                        |
| `npm run test:guides`                     | exit 0                                                        |
| `npm run test:policy`                     | 109 passed \| 1 skipped (110)                                 |
| `CAPTURE=1 npm run test:journey`          | 4 failed \| 100 passed (104) — see the timing observation     |

Acceptance criterion 2's grep, over `dist/src/styles/index.css` after `npm run build:src`, matching
each recorded selector in the minified spelling the build emits:

```text
PRESENT  .pagination
PRESENT  .page-link
PRESENT  .page-link   under @media (prefers-reduced-motion: reduce)
PRESENT  .page-link:hover
PRESENT  .page-link:focus
PRESENT  .page-link.active
PRESENT  .active > .page-link
PRESENT  .page-link.disabled
PRESENT  .disabled > .page-link
PRESENT  .page-item:not(:first-child) .page-link
PRESENT  .page-item:first-child .page-link
PRESENT  .page-item:last-child .page-link
PRESENT  .pagination-lg
PRESENT  .pagination-sm
PRESENT  reduced-motion .page-link{transition:none}
ALL PRESENT: true
```

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
?? app/browser/sections/PaginationSection.ts
?? src/styles/components/_pagination.scss
?? tests/app/browser/sections/PaginationSection.test.ts
?? tests/src/styles/components/pagination.test.ts
```

`git diff --stat`:

```text
 app/browser/Showcase.ts               |   2 +
 app/browser/constants.ts              |  75 +++++++++++++++
 app/browser/index.ts                  |   1 +
 guides/ledger/departures.md           |  18 ++++
 guides/veneer.md                      | 168 +++++++++++++++++++++-------------
 src/styles/index.scss                 |   1 +
 tests/app/browser/Showcase.test.ts    |   3 +
 tests/app/browser/index.test.ts       |   3 +
 tests/app/browser/integration.test.ts |  96 +++++++++++++++++++
 tests/conformance.test.ts             |   1 +
 tests/setup.test.ts                   |   9 +-
 tests/setup.ts                        |  55 +++++++++++
 tests/setupStyles.test.ts             |  87 ++++++++++++++++++
 tests/setupStyles.ts                  | 124 +++++++++++++++++++++++++
 14 files changed, 582 insertions(+), 63 deletions(-)
```

New files: `_pagination.scss` 122 lines, `pagination.test.ts` 336 lines, `PaginationSection.ts` 20
lines, `PaginationSection.test.ts` 93 lines.

## Off-limits patches, report-only

### Patch A — `tests/setupServer.test.ts`

The case `skips engine and CSS obligations whose Proof cell is a dash` compares the compatibility
component set against a written Set literal. Add one line at its sorted position, between
`'offset',` and `'ratio',` (around line 1150, inside the `new Set([…])` argument):

```text
				'pagination',
```

Failing before the patch: `npm run test:setup` → `2 failed | 159 passed (161)`; this case reports
`expected Set{ 'g', 'gx', 'gy', 'row-gap', …(29) } to deeply equal Set{ 'blockquote', 'btn', 'col',
…(29) }` with `+ "pagination"` in the received set.

### Patch B — the shared declaration block

`.pagination` carries Bootstrap's `list-unstyled()` pair, which `.list-unstyled, .list-inline` in
`src/styles/components/_list.scss` already carries, so `scanStyleBlocks` reports the overlap and
`tests/setupStyles.test.ts` case `carries no shared written declaration block across style
partials` reddens. `.claude/rules/styles.md` puts a pattern in more than one partial into
`_mixins.scss`; `_mixins.scss` and `_list.scss` are both off-limits here. The declarations were not
split or reordered to dodge the sweep.

Measured on a scratch copy of `src/styles` at
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/mixinprobe/styles`:

- `sass.compile` of the patched copy and of `src/styles/index.scss`, both `style: 'expanded'`:
  113587 bytes each, `IDENTICAL: true`.
- `scanStyleBlocks` over the patched copy: `shared` is `[]`, read through a temporary
  `tests/setupScratchSweep.test.ts` under the `setup` project —
  `✓ scratch sweep > reports no shared declaration block in the patched styles copy 62ms`. That
  file was removed; `git status --porcelain` lists no scratch file.

**`src/styles/_mixins.scss`** — insert immediately before `@mixin list-space {`:

```scss
// Strips a list of its marker and its inline start inset, for a list that lays its own items out.
//
// `.list-unstyled`, `.list-inline`, and `.pagination` each carry this pair, which is what puts it
// here rather than inline: a pattern in more than one partial is this file's to own.
@mixin list-reset {
	padding-left: 0;
	list-style: none;
}

```

**`src/styles/components/_list.scss`** — replace the opening of the file:

```scss
@layer components {
	.list-unstyled,
	.list-inline {
		padding-left: 0;
		list-style: none;
	}
```

with:

```scss
@use '../mixins' as *;

@layer components {
	.list-unstyled,
	.list-inline {
		@include list-reset;
	}
```

**`src/styles/components/_pagination.scss`** (this unit's own file, changed in the same patch) —
replace:

```scss
		display: flex;
		padding-left: 0;
		list-style: none;
	}
```

with:

```scss
		display: flex;
		@include list-reset;
	}
```

## Deviations

1. **`tests/setup.test.ts`: one existing line rewritten.** Family ruling 13 forbids it and the
   deviation contract names it as a stop; the Orchestrator's mid-unit note authorises this one line
   for a per-family driven-state list. The assertion that `CAPTURE_KEYS` equals the concatenation
   had to name the new list. Before:

   ```ts
   		expect(CAPTURE_KEYS).toStrictEqual([...SHOWCASE_KEYS, ...BUTTON_KEYS, ...CASCADE_KEYS])
   ```

   After:

   ```ts
   		expect(CAPTURE_KEYS).toStrictEqual([
   			...SHOWCASE_KEYS,
   			...BUTTON_KEYS,
   			...CASCADE_KEYS,
   			...PAGINATION_KEYS,
   		])
   ```

   Every other edit to that file is an insertion. Sibling units A, B, and C need the same line, so
   the Orchestrator resolves the overlap once.

2. **`guides/veneer.md` § Files: the table's first column widened by one character.** Family ruling
   12 requires a § Files row per partial, and `` `src/styles/components/_pagination.scss` `` is 40
   characters against a 39-wide column, so `oxfmt` realigns every row of that table. The change is
   whitespace-only apart from the separator row gaining one dash and the new row itself: `diff -w`
   between the tree before and after the insertion reports exactly those two lines, and 122 further
   changed lines are padding the formatter regenerates. § Compatibility needed no realignment — both
   new rows were written to fit the column widths already there, and `diff` against the formatter's
   output over that section is empty.

3. **`tmp/units/b-passive-design-verdict.md` is absent from the worktree.** The family record and
   the brief both cite it (`find . -name "*design-verdict*"` under the worktree returns nothing).
   The brief's Obligation 1 supplies this unit's specimen list directly, and family ruling 1's own
   first sentence supplies the refusal the verdict's ruling 8 would have carried, so the unit
   proceeded on those. Rulings taken in its place are named in the next section.

4. **Driven scenarios are hover and focus; `active` and `disabled` are photographed at rest.** The
   brief names "hover, focus, active, and disabled as scenarios". Bootstrap writes no `:active` rule
   for `.page-link`, so a frame named for the held pointer would carry the hover paint and claim
   otherwise, which is the duplication `BUTTON_KEYS` already refuses in its own remarks. `.active`
   and `.disabled` are class states the showcase renders at rest, so each is photographed by its own
   cascade row under a scenario whose stem carries the state — `active-page` and `disabled-page`,
   which satisfies family ruling 10's "whose stem carries the state". `CaptureState` therefore
   needed no new member and `tests/setup.ts` keeps that line unchanged.

5. **The resting specimen is named `Page strip`, not `Pagination`.** `readSubject` resolves a
   subject through a labelled specimen container *or* a named region, so a specimen named
   `Pagination` beside a region named `Pagination` made the journey stop with `2 rendered subjects
   answer to the name "Pagination"`. The specimen was renamed; the region keeps the name family
   ruling 9's alphabetical order uses.

6. **The driven case moves its specimen to the document's start.** The strip renders thousands of
   pixels down the showcase, where `stagePane` puts it past what a pointer can reach —
   `locator.hover` fails with `element is outside of the viewport` after Playwright scrolls, which
   is the limit `stagePane`'s own documentation states. The cascade scenarios solve the same problem
   by lifting a copy; a copy here would give the page a second link of the same accessible name and
   the pointer could reach neither, so the specimen is moved and put back in a `finally`.

## Rulings taken inside the owned scope

- The `#### \`pagination\`` departure table sits between `#### \`offset\`` and `#### \`reboot\``,
  which is the sorted order `guides/ledger/departures.md` states and uses; family ruling 5 says
  barrel order, and the tree wins.
- `PAGINATION_KEYS` is a `readonly CaptureKey[]` appended after `CASCADE_KEYS`, the shape
  `BUTTON_KEYS` has, and its frames are placed with `FRAMES.page`. A page frame is what the focus
  scenario needs: the ring paints outside the driven page's border box, so an element frame of that
  page crops the chrome the scenario claims.
- Specimen names, page labels, case titles, the reason sentences, and the guide section's paragraph
  order are this unit's own, settled per the deviation contract.

## Observations, not criteria

**`npm run test:journey` fails on this container, and the probe separates it from this unit.**
The full four-variant run reports the pre-existing Button cases `toggles a native host and an
anchor host through the keyboard` (line 268) and `paints a focus ring on every variant reached
through the keyboard` (line 335) timing out at the 15000ms per-test budget, in a set that changes
run to run. Every variant passes 26/26 when run alone, including under `CAPTURE=1`:

| Run                                                | Result                          |
| -------------------------------------------------- | ------------------------------- |
| `--project journey:light-1280`                     | 26 passed (26), 60.24s          |
| `--project journey:light-390`                      | 26 passed (26), 63.51s          |
| `--project journey:dark-390`                       | 26 passed (26), 60.06s          |
| `--project journey:dark-1280`                      | 26 passed (26), 95.99s          |
| `CAPTURE=1 --project journey:light-1280`           | 26 passed (26), 73.88s          |
| `CAPTURE=1 --project journey:dark-1280`            | 26 passed (26), 84.52s          |

The probe: case 268 was timed on `journey:light-390` with the Pagination section constructed and
with it removed from `app/browser/Showcase.ts`, everything else equal.

```text
with    PaginationSection: ✓ toggles a native host and an anchor host through the keyboard 14708ms
without PaginationSection: ✓ toggles a native host and an anchor host through the keyboard 15127ms
```

The case is slower **without** this unit's section than with it, against a 15000ms budget. The
section is not the cause; the case sits on the timeout boundary on this container and the load
decides it. `app/browser/Showcase.ts` was restored to construct the section, and the restored state
is what every reading in this report was taken against. The deciding run belongs to the Orchestrator
after this unit exits.

**`npm test` was not run**, because the two off-limits failures make its result known in advance.

## Unverified claims of my own

- The claim that the two `npm run test:setup` failures are the only ones caused by this unit rests
  on two consecutive runs of that project. A third run reported two further failures
  (`oracle action bindings and exclusions`, `records and reads official control state …`) that did
  not reappear; both launch a browser and both passed in the runs on either side, so they are read
  as container load rather than as this unit's.
- Patch B's compiled-output equality was measured with `sass.compile` at `style: 'expanded'`, which
  is what the ledger comparison reads. It was not measured through `vite build`, so the claim covers
  the authored cascade rather than the bundled artifact.
