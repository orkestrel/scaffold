# B-PASSIVE-D-2 report — pagination fix round

Worktree `/home/user/veneer-bd`, detached at `3a9202a`. Every finding this round carries is closed
in the owned files. Each proof change ran red under its named mutation and green after the exact
reverse edit. The pagination frames are regenerated for the four variants and the focus ring has
captured space on every side. `npm run test:setup` stays red on `tests/setupServer.test.ts` and
`tests/setupStyles.test.ts`, both off-limits; neither failure is this round's work, and the second is
a standing contradiction recorded under § Deviations.

## § Unknowns — the ledger padding

`npx oxfmt --config .oxfmtrc.json --check guides/ledger/departures.md` exits 0: "All matched files
use the correct format." The formatter reads no padding defect in the `#### \`pagination\`` table,
so finding 8 needs no change and `guides/ledger/departures.md` is untouched this round. The
reviewer's referral is answered: `oxfmt` does not normalize Markdown table column padding under
`guides/ledger/`, and the wider header and separator rows the reviewer measured by eye are
format-clean.

## Per finding

### Finding 1 — the disabled forms lack a pointer assertion (analyst 3)

**Change.** `tests/src/styles/components/pagination.test.ts`. The equivalence case
(`paints $direct and $parent alike`) compares `pointer-events` beside the paint properties. The
pointer case, renamed `refuses the pointer on a disabled page under either spelling and leaves its
neighbour reachable`, marks the first item with `disabled` (parent form) and the fourth item's link
with `disabled` (direct form), reads `pointer-events` on each, reads `auto` on the neighbour between
them, and drives `elementFromPoint` at the centre of each refused link.

**Mutation.** `src/styles/components/_pagination.scss` gained a trailing rule inside
`@layer components`, leaving the grouped rule intact:

```scss
	.page-link.disabled {
		pointer-events: auto;
	}
```

**Red.** `npm run test:src:styles -- tests/src/styles/components/pagination.test.ts`:
`Tests 2 failed | 14 passed (16)`, exit 1.

- `paints '.page-link.disabled' and '.disabled > .page-link' alike` —
  `AssertionError: expected 'none' to be 'auto'`.
- `refuses the pointer on a disabled page under either spelling and leaves its neighbour reachable` —
  `AssertionError: expected 'auto' to be 'none'`.

Both readings distinguish the mutation independently, which is what the finding asked for: the
equivalence case reports the split between the spellings, the pointer case reports the direct form's
own resolved value.

**Green.** After the exact reverse edit (the planted rule deleted, nothing else touched), the same
command: `Tests 16 passed (16)`, exit 0. `sha256sum src/styles/components/_pagination.scss` reads
`1ff72744a4948e68feed28cc73c618d37e7a5469b18370817e1cf10172445788` before the plant and after the
revert.

### Finding 2 — the lifted specimen clips its focus ring (analyst 4)

**Change.** `tests/app/browser/integration.test.ts`, pagination case. The specimen is lifted into a
stage the case creates and removes rather than onto `document.body` directly:

```ts
const stage = build('div', { attributes: { style: 'padding: 1rem' } })
const marker = build('div')
specimen.before(marker)
stage.append(specimen)
document.body.prepend(stage)
```

The `finally` restores the specimen with `marker.replaceWith(specimen)` and then removes the stage,
so the page is handed back exactly as before on every path. The 16-pixel padding is four times the
ring's `0.25rem` spread, on every side.

**Frames.** Regenerated for every registered variant with
`CAPTURE=1 npm run test:journey -- --project 'journey:<variant>*'`:

| Variant      | Result                                  |
| ------------ | --------------------------------------- |
| `light-390`  | `Test Files 1 passed / Tests 26 passed` |
| `light-1280` | `Test Files 1 passed / Tests 26 passed` |
| `dark-390`   | `Test Files 1 passed / Tests 26 passed` |
| `dark-1280`  | `Test Files 1 passed / Tests 26 passed` |

`tmp/capture/states/` holds `page-strip`, `active-page`, `disabled-page`, `small-pagination`, and
`large-pagination` at each of the four variants, plus `page-strip-hover` and `page-strip-focus` at
each of the four, every one of them written by this round's runs. Each rest subject carries its
`-accessibility.txt` artifact beside it.

**The frame read back.** `page-strip-focus--light-390.png` is 390x9122. Reading it with
`tmp/units/b-passive-d-ring-reading.mjs`, the instrument retained beside this report:

- The first painted row is 12. Rows 0 to 11 are the page background, so the ring is photographed
  with 12 pixels of space above it where the previous frame started the border box at row 0.
- The ring's own mix color occupies rows 12 to 15 across `x 105..177` (the band above the focused
  page), `x 105..108` for rows 17 to 76 (the band to its left), and rows 78 to 81 across
  `x 105..177` (the band below it).
- The right-hand band is painted over by Page 2's active fill, which is the stacking consequence
  finding 3 puts in the guide, not a clip: the frame carries pixels on that side.

Read as an image, the crop of the top 300 rows shows the focused Page 1 with its blue halo whole on
the top, left, and bottom, white space above and to the left of it, and Page 2's fill against its
right edge. The other three focus frames report the same first painted row of 12
(`light-1280` and `dark-1280` at 1280x8477, `dark-390` at 390x9122), so none of them clips.

### Finding 3 — the guide promises an unobscured ring (analyst 6)

**Change.** `guides/veneer.md` § Pagination classes, the stacking paragraph. It reads:

> Stacking decides whose chrome paints over the edge two pages share. Adjacent pages share one
> border, because every page after the first pulls itself one border width towards the page before
> it. A hovered page lifts to `2`, so its own border paints over that shared edge, and a focused
> page and the active page each lift to `3`, so either of them paints over a hovered neighbour.
> Focus and active hold the same value, so document order settles the pair where they meet: an
> active page later in the strip paints over the ring of the focused page before it. A disabled page
> lifts to nothing and refuses the pointer outright.

The sentence promising that the ring and the active fill "are never cut by the page beside them" is
gone. Bootstrap's declarations are untouched: `_pagination.scss` is byte-identical.

### Finding 4 — the palette consequence (reviewer 6)

**Change.** `guides/veneer.md` § Pagination classes, closing the paragraph that names
`--vn-palette-blue`:

> The active page therefore holds one fill in both color modes while the pages around it retune, and
> it holds that fill through a brand retune as well: a `--vn-color-primary-base` override leaves the
> active page and the page focus ring on Bootstrap's blue, because each reads the palette token
> rather than the primary role, and the overrides that move them are `--bs-pagination-active-bg`,
> `--bs-pagination-active-border-color`, and `--bs-pagination-focus-box-shadow` declared on the
> strip, which is where the proof's own override case sets a published property.

Verified before writing it: `src/styles/_tokens.scss:162` declares `--vn-palette-blue: #0d6efd` as a
literal, `_mixins.scss:233` derives `--vn-color-primary-base` from the role map, and the built
cascade resolves that role to `oklch(48% .255 264)` in light and `oklch(70% .15 233)` in dark, so the
two are independent. `_pagination.scss:23-26` reads the palette token for the active fill, the active
border, and the focus mix. § Customization is untouched.

### Finding 5 — `mountPagination` is a hidden reusable builder (analyst O1)

**Change.** The builder moved to `tests/setupBrowser.ts`, appended after `scene` — the registry it
mounts through — with an exported `PaginationOptions` interface and TSDoc in the file's voice. It
takes the page items as its first parameter and the strip's classes and the wrapper's attributes as
one options record, so a caller no longer passes empty positional strings:

```ts
export function mountPagination(markup: string, options: PaginationOptions = {}): HTMLElement
```

`tests/setupBrowser.test.ts` gains `'mountPagination'` in the export inventory, the named import, and
the case `renders every page its markup declares, under the classes and attributes it was asked
for`. `tests/src/styles/components/pagination.test.ts` imports it and every call site passes
`PAGINATION_MARKUP`.

**Mutation.** The builder mounting one fewer page than asked:

```ts
`<div ${attributes}><ul class="pagination ${classes}">${markup.slice(0, markup.lastIndexOf('<li'))}</ul></div>`
```

**Red.** `npm run test:setup:browser`: `Tests 1 failed | 54 passed (55)`, exit 1, on
`renders every page its markup declares, under the classes and attributes it was asked for` —
`AssertionError: expected [ 'Previous page', 'Page 1', 'Page 2' ] to deeply equal [ 'Previous page',
'Page 1', …(2) ]`.

**Green.** After the exact reverse edit, the same command: `Tests 55 passed (55)`, exit 0.

The case reads the rendered pages back as accessible names against the caller's own list, so it also
distinguishes a reordering mutation, which a count would not. The class and attribute readings
distinguish a builder that dropped either option.

### Finding 6 — case-table rows addressed by position (reviewer F2)

**Change.** `tests/src/styles/components/pagination.test.ts`. The stacking case looks each
expectation up by the state it is about, in the tree's idiom:

```ts
const hover = requireValue(
	PAGINATION_STATE_CASES.find(({ name }) => name === 'hover'),
	'No hover state case',
)
```

`focus` and `active` are read the same way, and the size case reads
`PAGINATION_SIZE_CASES.find(({ name }) => name === 'pagination')`. The element the case reads the
active stacking off is renamed `lifted`, so the row named `active` and the link carrying that class
are distinct identifiers. `grep -n "_CASES\[" tests/src/styles/components/pagination.test.ts`
returns nothing.

**Mutation, and its limit.** The mutation this change is about is a reordered or renamed row in
`PAGINATION_STATE_CASES`, which lives in `tests/setupStyles.ts` — off-limits to this unit, so I
planted nothing there. What the change buys is stated rather than measured: a reorder that silently
moved the expectation raises `No hover state case` at the lookup instead of comparing against
another state's number. The rewritten stacking and size cases ran green in the file-scoped runs
recorded under finding 1. Settle the reorder mutation on the host if the audit wants it executed.

### Finding 7 — state vocabulary

`guides/veneer.md` § Pagination classes writes `active` and `disabled` for the class states: the
ships-whole sentence, the surfaces sentence, the palette sentences, and the stacking paragraph.
`tests/app/browser/sections/PaginationSection.test.ts` reads "The page marked current announces
itself through `aria-current`, and every disabled page is announced and taken out of the tab order
rather than being dimmed alone", which keeps "current" for the attribute and drops "unavailable".
The pagination case in `tests/app/browser/integration.test.ts` reads "its active page and its
disabled pages at rest".

`tests/src/styles/components/pagination.test.ts` needed no change: its comments already write the
class words. `grep -rn -i "unavailable"` over the owned files returns nothing. The shared files
`tests/setup.ts` and `app/browser/constants.ts` still carry the alternation; their patches are under
§ Shared-file patches.

### Finding 8 — the ledger padding

Closed by § Unknowns. Nothing lands.

## Touched files

| File                                                  | Change                                                                                                           |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `tests/setupBrowser.ts`                               | Appends `PaginationOptions` and `mountPagination` after `scene`, with TSDoc.                                     |
| `tests/setupBrowser.test.ts`                          | Adds the import, the inventory row, and the builder's case.                                                      |
| `tests/src/styles/components/pagination.test.ts`      | Imports the builder, drops the local one, adds the pointer readings under both spellings, looks rows up by name. |
| `tests/app/browser/integration.test.ts`               | Lifts the specimen into a padded stage removed in the same `finally`; state vocabulary.                          |
| `tests/app/browser/sections/PaginationSection.test.ts` | State vocabulary in one comment.                                                                                 |
| `guides/veneer.md`                                    | § Pagination classes: the stacking rewrite, the palette consequence, the class words.                            |
| `src/styles/components/_pagination.scss`              | Transient plant only; byte-identical, SHA-256 unchanged.                                                         |
| `tmp/capture/states/**`                               | The regenerated pagination frames and their accessibility artifacts.                                             |

`git diff --stat` over the tracked files this round touched reports
`guides/veneer.md | 175 +++---`, `tests/app/browser/integration.test.ts | 106 ++++`,
`tests/setupBrowser.test.ts | 27 ++`, `tests/setupBrowser.ts | 39 ++`, for
`4 files changed, 285 insertions(+), 62 deletions(-)`. That stat is cumulative over both rounds for
`guides/veneer.md` and `tests/app/browser/integration.test.ts`, which the first round also wrote;
`tests/setupBrowser.ts` (+39) and `tests/setupBrowser.test.ts` (+27) are this round's alone. This
round's own edits to `tests/app/browser/integration.test.ts` are the stage block and the vocabulary
line. `tests/src/styles/components/pagination.test.ts` (370 lines) and
`tests/app/browser/sections/PaginationSection.test.ts` (93 lines) are untracked, so git reports no
per-round delta for them.

## Gates

Every command ran from `/home/user/veneer-bd`.

| Command                                              | Exit | Reading                                                  |
| ---------------------------------------------------- | ---- | -------------------------------------------------------- |
| `npx oxfmt --config .oxfmtrc.json --write <owned>`    | 0    | 6 files, 910ms                                           |
| `npm run format:check`                                | 0    | All matched files use the correct format, 215 files      |
| `npm run lint:check`                                  | 0    | No output                                                |
| `npm run check`                                       | 0    | Root, `src:core`, `src:browser`, `src:styles`, `app:browser` |
| `npm run build:src`                                   | 0    | Run inside `test:src:styles`, which builds the cascade first |
| `npm run test:src:styles`                             | 0    | `Test Files 59 passed (59)` / `Tests 432 passed (432)`, 67.49s |
| `npm run test:app`                                    | 0    | `Test Files 11 passed (11)` / `Tests 28 passed (28)`     |
| `npm run test:setup:browser`                          | 0    | `Test Files 1 passed (1)` / `Tests 55 passed (55)`       |
| `npm run test:guides`                                 | 0    | `Test Files 1 passed (1)` / `Tests 18 passed (18)`       |
| `npm run test:policy`                                 | 0    | `Tests 109 passed, 1 skipped (110)`                      |
| `CAPTURE=1 npm run test:journey -- --project 'journey:light-390*'` | 0 | `Tests 26 passed (26)`, 43.99s              |
| `CAPTURE=1 npm run test:journey -- --project 'journey:light-1280*'` | 0 | `Tests 26 passed (26)`, 46.71s             |
| `CAPTURE=1 npm run test:journey -- --project 'journey:dark-390*'` | 0 | `Tests 26 passed (26)`, 46.31s               |
| `CAPTURE=1 npm run test:journey -- --project 'journey:dark-1280*'` | 0 | `Tests 26 passed (26)`, 50.49s              |

`npm run test:policy` is outside the brief's list and ran because this round rewrites a guide
section: it carries the authored-Markdown prose sweep. A banned-term grep over the section and over
every line this round added reports nothing under the unconditional rows. The judged rows resolve as
permitted: `above` in "the ring above Page 1" is spatial, and `new` appears only as the `new Error`
and `new Set` operator.

**Observations, not criteria.**

- `npm run test:journey` whole: exit 0, `Test Files 4 passed (4)` / `Tests 104 passed (104)`, 61.27s
  wall with 184.32s of test time, at load average 15.67.
- `npm run test:setup`: exit 1, `Tests 2 failed | 159 passed (161)`. Both failures are on off-limits
  files and neither is this round's. They are named under § Deviations.

## Frames

Under `tmp/capture/states/`, all written by this round's four capture runs:

```text
page-strip--{light,dark}-{390,1280}.png            active-page--{light,dark}-{390,1280}.png
disabled-page--{light,dark}-{390,1280}.png         small-pagination--{light,dark}-{390,1280}.png
large-pagination--{light,dark}-{390,1280}.png      page-strip-hover--{light,dark}-{390,1280}.png
page-strip-focus--{light,dark}-{390,1280}.png
```

Each rest subject carries its `-accessibility.txt` artifact beside it. Every name in that expansion
is on disk, written by the four capture runs recorded under § Gates.

## `git status --porcelain`

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
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/PaginationSection.ts
?? src/styles/components/_pagination.scss
?? tests/app/browser/sections/PaginationSection.test.ts
?? tests/src/styles/components/pagination.test.ts
```

The first round's paths plus `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`, which is
acceptance criterion 5. `tests/setup.ts`, `tests/setup.test.ts`, and `app/browser/constants.ts`
carry the first round's writes and nothing of this one.

## `_pagination.scss` SHA-256

- Before the plant: `1ff72744a4948e68feed28cc73c618d37e7a5469b18370817e1cf10172445788`
- After the revert: `1ff72744a4948e68feed28cc73c618d37e7a5469b18370817e1cf10172445788`

## Shared-file patches

**Patch A — `tests/setupServer.test.ts`, carried unapplied from the first round.** Insert
`'pagination',` between `'offset',` at line 1155 and `'ratio',` at line 1156, inside the expected
compatibility Set literal.

**Patch C — `src/styles/components/_pagination.scss:58-59`, raised by this round.** The partial's own
comment carries the promise finding 3 struck from the guide, and the scope keeps the file
byte-identical, so it is returned rather than applied:

```scss
	// Hover lifts one link over its neighbour's shared border; focus and the active page lift over a
	// hovered one, so the focus ring and the active fill are never cut by the link beside them.
```

becomes

```scss
	// Hover lifts one link over its neighbour's shared border, and focus and the active page each
	// lift over a hovered one. Focus and active hold the same value, so where they meet the later
	// sibling paints over the earlier one's chrome.
```

**Patch D — `tests/setup.ts:325-326`, state vocabulary.** In the `PAGINATION_KEYS` remark, "The
current page and the unavailable pages are class states the showcase renders at rest" becomes "The
active page and the disabled pages are class states the showcase renders at rest".

**Patch E — `app/browser/constants.ts`, state vocabulary, a judgment call for the Orchestrator.**
Line 628's rendered paragraph reads "read its current page, its unavailable pages", and the
`PAGINATION_SPECIMENS` remark at lines 636-637 reads "The current page is marked on the item … and
the unavailable pages are marked each of those ways as well". The remark is developer prose and
takes the class words: "The active page is marked on the item … and the disabled pages are marked
each of those ways as well". The paragraph is copy a showcase reader sees rather than developer
prose, so I recommend leaving it and record the alternation instead. Changing it would also move
`PAGINATION_COPY`, which `tests/app/browser/sections/PaginationSection.test.ts` reads back.

## Deviations

Per § Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. Neither of these
prevented the objective; both are reported rather than resolved.

**D1 (carried). `npm run test:setup` is red on `tests/setupServer.test.ts`.** Expected: the failing case the brief
names, from the first round's Blocker D1. Found: `skips engine and CSS obligations whose Proof cell is a dash`,
`AssertionError: expected Set{ 'g', 'gx', 'gy', 'row-gap', …(29) } to deeply equal Set{
'blockquote', 'btn', 'col', …(29) }`. The file is off-limits and Patch A is unapplied by
instruction. Not mine.

**D2 (raised this round). `npm run test:setup` is also red on `tests/setupStyles.test.ts`.** Expected: that case alone.
Found: another failing case, `carries no shared written declaration block across style partials`, reporting
the pair `components/_list.scss` line 3 and the pagination block, both declaring `padding-left: 0`
and `list-style: none`. This is the contradiction reviewer F3 and analyst 7 recorded: D15's amendment
refuses the `list-reset` extraction, and `scanStyleBlocks` implements no carve-out for a block two
partials share because each records an external value. Every file that could close it —
`tests/setupServer.ts`, `tests/setupStyles.test.ts`, `src/styles/components/_list.scss` — is
off-limits, and `_pagination.scss` must stay byte-identical, so nothing inside this unit's grant
reaches it. Hypothesis: the gate needs the carve-out its governing rule states, which is a decision
for the family round rather than for this unit. Done: everything else in § Findings.

**Ancillary choices settled inside the scope.**

- `mountPagination` takes the markup as a parameter rather than reading `PAGINATION_MARKUP` itself,
  so `tests/setupBrowser.ts` gains no import of `tests/setupStyles.ts`. That edge would pull
  `postcss` and the Markdown readers into the `app:browser` project, whose tests import
  `setupBrowser.ts` and never `setupStyles.ts`; `tests/setupBrowser.test.ts` already imports
  `setupStyles.ts` for its breakpoint tables, so the `setup:browser` project carries them either way.
  The builder's own case supplies inert markup of its own, which is what lets the mutation read as
  "one fewer page than asked".
- The options record carries `classes` and `attributes`. The first round's second positional
  parameter was named `wrapper` and held attribute text, which named the element rather than what it
  carried.
- The stage in finding 2 is a padded `div` created beside the marker and removed in the same
  `finally`, padded at `1rem` against the ring's `0.25rem` spread.
- Finding 7 extends to the pagination case's own comment in
  `tests/app/browser/integration.test.ts`, which is inside the owned lines and carried the same
  alternation.
- The case titles: the pointer case is renamed for the direct and parent spellings it proves; the builder's
  case is named for what it proves rather than for the option it drives.

## Retained instrument

`tmp/units/b-passive-d-ring-reading.mjs` reads a capture frame's top band with the installed
`pngjs` decoder and reports the first painted row and each row carrying the focus ring's mix color
with its span. It is the instrument behind finding 2's frame reading:
`node tmp/units/b-passive-d-ring-reading.mjs tmp/capture/states/page-strip-focus--light-390.png 120`.
