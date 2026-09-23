# UTIL-PLACEMENT (`upl`) report, round 2

Executor: `opus` on Opus 5.5, a native Claude subagent, the sole writer in `/home/user/veneer-upl`
(branch `unit/upl`, uncommitted over `e4e6a40`). Brief: `/home/user/scaffold/.orkestrel/veneer/units/upl-brief-2.md`.

Deviation state: no stop taken. Every round-1 finding the reconciled verdict carries is closed in
the owned files and in the shared-file patch. One file outside the Shared row needs a ruling:
`tests/setupBrowser.test.ts` asserts the exact export set of `tests/setupBrowser.ts`, so the
builder criterion 3 requires reddens it. Its change is returned as another report-only patch,
`/home/user/scaffold/.orkestrel/veneer/units/upl-unlisted-2.patch` (§ Deviations, item 1). No stop condition the brief names fired:
the moved tables change no proof's reading, the `Maximum sizes` box inside the frame leaves the cap
readings unchanged, and every guide site the ruling names was located.

## Touched files

The owned files are untracked except the shell partial, which is modified. Round 2 edited these in
place:

- `src/styles/utilities/_position.scss`: the map comment names the edge entries without a count.
- `src/styles/utilities/_sizing.scss`: the map comments name the shared steps and the single-value
  maps without a count.
- `tests/src/styles/utilities/sizing.test.ts`: imports the steps, the container, the entry table,
  the infixes, and the variant widths from `tests/setupStyles.ts`; the floors comment carries no
  count.
- `tests/src/styles/utilities/position.test.ts`: imports the position values, the offset edges and
  steps, the stacking levels, the entry table, the container, the box, and the infixes; the hit
  order derives from the level table.
- `tests/src/styles/utilities/visibility.test.ts`: imports the infixes.
- `tests/src/styles/utilities/visually-hidden.test.ts`: imports the container and the hidden
  reading, and mounts the focused start control through the `mountTraversalStart` builder.
- `tests/src/styles/components/position.test.ts`: imports the sticky scroller.
- `tests/app/browser/sections/SizingSection.test.ts`: imports the steps, the viewport-size table,
  and the variant widths; asserts that every `.vw-100` box sits inside a `.viewport` element and
  that the `Maximum sizes` width cap sits inside the frame.
- `tests/app/browser/sections/PositionSection.test.ts`: imports the stacking levels and the variant
  widths.
- `tests/app/browser/sections/VisibilitySection.test.ts`: mounts the focused start control through
  the builder and clears the scene after each case.

Unchanged from round 1: `src/styles/utilities/_visibility.scss`,
`src/styles/utilities/_visually-hidden.scss`, `src/styles/components/_position.scss`,
`app/browser/styles/_shell.scss`, and the `PositionSection.ts`, `SizingSection.ts`, and
`VisibilitySection.ts` files under `app/browser/sections/`.

Report-only patches, each a `git diff` with an `index` line per file against `e4e6a40`:

- `/home/user/scaffold/.orkestrel/veneer/units/upl-shared-2.patch` supersedes `upl-shared.patch` and `upl-consumer.patch` whole. Its
  file list equals the Shared row: `app/browser/Showcase.ts`, `app/browser/constants.ts`,
  `app/browser/index.ts`, `guides/veneer.md`, `src/styles/index.scss`,
  `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`,
  `tests/app/browser/integration.test.ts`, `tests/conformance.test.ts`,
  `tests/fixtures/tailwind/consumer.css`, `tests/fixtures/tailwind/markup.html`,
  `tests/fixtures/tailwind/preflight.css`, `tests/service/tailwind/consumer.test.ts`,
  `tests/setup.css`, `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupServer.test.ts`,
  `tests/setupStyles.test.ts`, and `tests/setupStyles.ts`.
- `/home/user/scaffold/.orkestrel/veneer/units/upl-unlisted-2.patch`: `tests/setupBrowser.test.ts` alone (§ Deviations, item 1).

Review evidence: `tmp/units/upl-2.diff` (`git diff` for `_shell.scss`, then `git diff --no-index
/dev/null <path>` per untracked owned file) and `tmp/units/upl-2-status.txt` (`git -C
/home/user/veneer-upl status --porcelain`, the same entries round 1 recorded).

Round-over-round records: `/home/user/scaffold/.orkestrel/veneer/units/upl-instruments-2/round-delta.diff` (each owned file, round 1
against round 2) and `/home/user/scaffold/.orkestrel/veneer/units/upl-instruments-2/round-delta-shared.diff` (each shared file as
round 1's patches left it against round 2's).

## Diffstat

Owned, measured with `wc -l` over each untracked file and `git diff --stat` over the shell partial
(all lines added against `e4e6a40`): `_shell.scss` +22; `src/styles/components/_position.scss` 35;
`src/styles/utilities/_position.scss` 41; `_sizing.scss` 33; `_visibility.scss` 16;
`_visually-hidden.scss` 29; `PositionSection.ts`, `SizingSection.ts`, and `VisibilitySection.ts`
22 each; `tests/src/styles/utilities/position.test.ts` 227; `sizing.test.ts` 140;
`visibility.test.ts` 81; `visually-hidden.test.ts` 146; `tests/src/styles/components/position.test.ts`
121; `PositionSection.test.ts` 242; `SizingSection.test.ts` 175; `VisibilitySection.test.ts` 121.

Shared: `git apply --stat` reports `1047 insertions(+), 110 deletions(-)` over the files the Shared row names. Unlisted: `git apply --stat` reports `14 insertions(+)` in `tests/setupBrowser.test.ts`.

SHA-256: `upl-shared-2.patch` `9b99fb54c152a19276f2f072c74ed2b3aff4c0f60cd55363ed2d5c029a75c79e`; `upl-unlisted-2.patch` `d025920ecd5aa4f21e5fe9e7c047b8014d52dc1dc67703e60439dc215b429c90`.

## Findings closed

Each item names the site, what round 1 shipped, and what round 2 ships. The full text of every
change is in the round-over-round records named in § Touched files.

### Claim 3: the proof matrix, the missing logs, and the populations

- Before: the round-1 matrix attributed the helper-placement mutation to the clipped-box, priority,
  and dark-island cases; no log existed for the visibility map-order mutation or the important
  fixed helper; the frame logs cited a superseded `PositionSection.test.ts`, with a population of
  the Position section proof alone, while the report stated 13.
- After: § Proof matrix names, for every case in the owned proofs, the mutations that redden it,
  read mechanically from each log's header by `tools/matrix.py`. The helper-placement mutation
  (`helper-in-components`) reddens the utility-precedence case (`sits ahead of every utility, so a
  utility the release lets win still wins`) and the layer-escape case (`yields to an important
  override inside the utilities layer`) and no other. `visibility-order-reversed` and
  `fixed-important` ran and are logged. The frame mutations ran against the shipped section proofs
  (§ Frame runs against the shipped section proof). Every log opens with its mutation, its command, and the population the command
  collected.

### Claim 4: the `Maximum sizes` placement

- Before (`app/browser/constants.ts`, the `Maximum sizes` specimen's markup, which ends in the
  unchanged height cap):
  `<p><span class="placeholder vw-100 mw-100" aria-hidden="true"></span></p><div class="viewport"><div class="h-50">`
- After: `<div class="viewport"><p><span class="placeholder vw-100 mw-100" aria-hidden="true"></span></p><div class="h-50">`
- The `SIZING_SPECIMENS` remark, before: "The viewport sizes render inside the same frame, which
  clips what they overflow, so a box as wide as the viewport raises no scrollbar on the page."
  After: "Every box sized to the viewport renders inside a frame too, which clips what it overflows:
  the viewport sizes, and the width cap's viewport-wide box beside the height cap. So no box as
  wide as the viewport raises a scrollbar on the page."
- The Sizing section proof asserts `[data-specimen="Maximum sizes"] .viewport > p >
  .placeholder.vw-100.mw-100` and that no `.vw-100` box in the region lies outside a `.viewport`
  element. The § Showcase sentence follows (claim 7).
- The cap readings, taken by `tools/caps-reading.sh` through the section proof's own reading at each
  variant, are identical before and after the move: `[[390,390],[192,192]]` at 390 and
  `[[1280,1280],[192,192]]` at 1280, with the viewport readings `[390,390,896,896]` and
  `[1280,1280,896,896]` and the page width equal to the variant (`logs/caps-before.log.txt`,
  `logs/caps-after.log.txt`).

### Claim 7: the guide

§ Tailwind, before: "Each element is read on the longhands its own name's rule declares, because
the gap rows sit inside the `.container` element, whose width moves when the line is dropped."
After: "Each element is read on the longhands its own name's rule declares, because a longhand
another name declares can move for a reason outside the equality: the gap rows sit inside the
`.container` element, whose width moves when the line is dropped, and the width steps declare the
`width` longhand."

`### Position utilities`, each before and after:

- "the stacking levels `.z-n1` to `.z-3`" → "the stacking levels from the `.z-n1` class to the
  `.z-3` class".
- "carries the `!important` the release writes" → "carries the `!important` flag the release
  writes".
- "`.position-absolute.position-relative` resolves `absolute`, and
  `.translate-middle.translate-middle-x` resolves the horizontal translation alone" → "an element
  carrying the `.position-absolute` and `.position-relative` classes resolves the `absolute` value,
  and an element carrying the `.translate-middle` and `.translate-middle-x` classes resolves the
  horizontal translation alone".
- "`.top-50` places a box half its containing block's height from the top, and `.start-50` half its
  width from the start" → "the `.top-50` class places a box half its containing block's height from
  the top, and the `.start-50` class places it half the block's width from the start".
- "so a right-to-left scope leaves `.start-0` on the left edge" → "so in a right-to-left scope the
  `.start-0` class still holds a box to the left edge".
- "`.sticky-md-top` sticks from a 768px viewport and stays in the flow below it" → "the
  `.sticky-md-top` helper sticks a box from a 768px viewport and leaves it in the flow below that
  width".
- "read the `--vn-stack-fixed` level … the `--vn-stack-sticky` level" → "read the
  `--vn-stack-fixed` token … the `--vn-stack-sticky` token".
- Departures: "writes `1030` for the fixed helpers and `1020` for the sticky helpers; Veneer writes
  `var(--vn-stack-fixed)` and `var(--vn-stack-sticky)`" → "writes the `1030` level for the fixed
  helpers and the `1020` level for the sticky helpers; Veneer writes the `var(--vn-stack-fixed)` and
  `var(--vn-stack-sticky)` values"; "writes `position: -webkit-sticky` ahead of `position: sticky`"
  → "writes the `position: -webkit-sticky` declaration ahead of the `position: sticky`
  declaration".

`### Sizing utilities`, each before and after:

- "the width and height steps `25`, `50`, `75`, `100`, and `auto`, the maximum sizes `.mw-100` and
  `.mh-100`, the viewport sizes `.vw-100` and `.vh-100`, and the viewport floors `.min-vw-100` and
  `.min-vh-100`" → "the `25`, `50`, `75`, `100`, and `auto` width and height steps, the `.mw-100` and
  `.mh-100` maximum sizes, the `.vw-100` and `.vh-100` viewport sizes, and the `.min-vw-100` and
  `.min-vh-100` viewport floors".
- "so `.w-50` resolves half its container's width" → "so the `.w-50` class resolves half its
  container's width".
- "The `auto` step sizes a box by its content over a size of the element's own." → "The `auto` step
  sets aside a width or height the element declares, so the box takes its content's size."
- "so `.vw-100` is as wide as the viewport wherever it sits" → "so a box carrying the `.vw-100` class
  is as wide as the viewport wherever it sits".
- "`.w-25.vw-100` resolves the viewport's width" → "an element carrying the `.w-25` and `.vw-100`
  classes resolves the viewport's width".
- Proof sentence: "the `auto` step over a size of the element's own, both caps" → "the `auto` step
  over a width and a height the element declares, the width and height caps".

`### Visibility utilities`, each before and after:

- "the `.visible` class shows a box, one inside an invisible ancestor included" → "the `.visible`
  class shows a box, including a box inside an invisible ancestor".
- "with `!important` on every declaration" → "with the `!important` flag on every declaration".
- "`.visually-hidden.w-100` resolves its container's width" → "an element carrying the
  `.visually-hidden` and `.w-100` classes resolves its container's width".
- "`.visually-hidden.position-relative` stays absolute" → "an element carrying the
  `.visually-hidden` and `.position-relative` classes stays absolute".

The `position` compatibility row: "each resolved scheme is proved" → "each resolved value is proved".

§ Showcase frame paragraph, before: "The Position, Sizing, and Visibility regions follow the
component regions. A fixed, sticky, or viewport-sized specimen renders inside the shell's
`viewport` frame, which paints nothing. …The sticky bars scroll inside the shell's `scroller` box
within the frame…" After:

> The shell's `viewport` class marks a frame that paints nothing. Layout containment makes the frame
> the containing block of every fixed and absolute element inside it, and paint containment with a
> clip keeps what such an element overflows inside the frame without making the frame scroll. So a
> fixed bar holds to the frame's edge, and a backdrop sized to the viewport raises no scrollbar on
> the frame or on the page. The frame's bounded height holds a default dialog at the 390 viewport and
> gives a percentage height or offset a definite height to resolve against. Every Position specimen
> and the Sizing region's `Height steps`, `Maximum sizes`, and `Viewport sizes` specimens render
> inside an element carrying the shell's `viewport` class. The sticky bars scroll inside an element
> carrying the shell's `scroller` class within the frame, because the frame clips rather than
> scrolls; see [position specimens](../tests/app/browser/sections/PositionSection.test.ts), which
> proves the frame at the 390 and 1280 viewports.

The set of framed specimens is the shipped markup's: every `POSITION_SPECIMENS` entry opens with
`<div class="viewport">`, and in `SIZING_SPECIMENS` the `Height steps`, `Maximum sizes`, and
`Viewport sizes` entries carry one, and the `Width steps` entry does not; no `VISIBILITY_SPECIMENS`
entry carries one. The region-order sentence is gone.

### Claim 8: tables, fixtures, infixes, the start control, the nested function, and the comments

`tests/setupStyles.ts` exports these frozen, documented constants after `GAP_STEP_CASES`, and the
proofs import them:

| Constant | Replaces | Imported by |
| --- | --- | --- |
| `BREAKPOINT_INFIXES` (derived from `GRID_BREAKPOINT_CASES`) | the hand-typed infix list | `sizing.test.ts`, `position.test.ts`, `visibility.test.ts` |
| `VIEWPORT_WIDTHS` | the `[390, 1280]` case matrix | `sizing.test.ts`, `SizingSection.test.ts`, `PositionSection.test.ts` |
| `PLACEMENT_CONTAINER` | each proof's `CONTAINER` | `sizing.test.ts`, `position.test.ts`, `visually-hidden.test.ts` |
| `PLACEMENT_BOX` | `BOX` | `position.test.ts` |
| `STICKY_SCROLLER` | `SCROLLER` and `SCROLLED` | `components/position.test.ts` |
| `SIZE_STEP_CASES` | `SIZE_STEPS` and the section proof's step lists | `sizing.test.ts`, `SizingSection.test.ts` |
| `SIZING_ENTRY_CASES` | the sizing class and stem lists | `sizing.test.ts` |
| `VIEWPORT_SIZE_CASES` | the section proof's selector and axis pairs | `SizingSection.test.ts` |
| `POSITION_VALUES` | `POSITION_VALUES` | `position.test.ts` |
| `OFFSET_EDGES` | the edge list | `position.test.ts` |
| `OFFSET_STEP_CASES` | `EDGE_STEPS` | `position.test.ts` |
| `STACK_LEVEL_CASES` | the level lists and their `z-index` values | `position.test.ts`, `PositionSection.test.ts` |
| `POSITION_ENTRY_CASES` | the position class and stem lists | `position.test.ts` |
| `VISUALLY_HIDDEN_PROPERTIES` | `HIDDEN_PROPERTIES` | `visually-hidden.test.ts` |
| `VISUALLY_HIDDEN_READING` | `HIDDEN` | `visually-hidden.test.ts` |

- `tests/setupStyles.test.ts` adds the case `binds the placement steps, values, and fixtures to the
  inventory, the ramp, and the journey`, beside the gap steps' case. It binds each step, value,
  level, edge, entry stem, viewport axis, and the hidden reading to `inventory.json`, the infixes to
  `compileBreakpointRamp`, the variant widths to `configs/app/vite.journey.config.ts`, the container's
  sides to differ from each other and from each variant width, and freezes every table and entry. The
  export-list case gains the constants.
- `tests/setupBrowser.ts` exports `mountTraversalStart(): HTMLButtonElement`, which mounts a `Start`
  button through `scene`, focuses it, and returns it. `visually-hidden.test.ts` and
  `VisibilitySection.test.ts` call it in place of the repeated
  `mount(build('button', { text: 'Start', attributes: { type: 'button' } }))` fixture.
- `tests/service/tailwind/consumer.test.ts`, before: `const properties = (name: string): readonly
  string[] => longhands.get(name) ?? []` inside the test body, called at each read. After: no
  function assignment; `longhands.get(name) ?? []` is inlined at the standalone read, the coverage
  check, and the paired read. The comment states the cause the guide states.
- `_position.scss`: "which the four edge entries share" → "which the edge entries share".
  `_sizing.scss`: "the one-step maps" → "the single-value maps", and "which share one set of steps"
  → "which share their steps".
- A proof restates no table, fixture, or infix list. The remaining literals in the proofs are
  single-case subjects and expectations, such as the translation case's selectors and its
  `[[150, 80], [150, 0], [0, 80]]` reading.

### F1: the hidden-host convention

`tests/setup.ts`, the `CASCADE_KEYS` remark gains a paragraph after the `display: none` paragraph:
"A key whose recorded rule clips its element to one pixel names the element's positioned host
through a `:has()` selector over that element, such as `.position-relative:has(> .visually-hidden)`,
and reads the host's `position` property, because a frame declared on the one-pixel box reads back
nothing. The helper's cascade proof reads the hidden box itself."

### F2: the consumer patch

The corrected consumer change travels inside `upl-shared-2.patch` as the
`tests/service/tailwind/consumer.test.ts` section. The round-1 negative controls stay red against
it (§ Mutation record: `line-gains-w-25`, `importance-dropped-service`, `start-off-line`), and the
importance-branch case `keeps an important shared declaration whatever the recipe withholds` is
among the cases the `importance-dropped-service` run reddens.

### REPORT-COUNTS

This report states no count of a set anyone can add to. The numbers it carries are measurements
with the run that produced them, sizes, widths, versions, and exit codes.

## Failing-first and after

- The setup tables. With the case and the export-list entries added to `tests/setupStyles.test.ts`
  and no constant exported, in the land copy after `npm run build:src`:
  `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`
  gave exit 1, `Tests  2 failed | 108 passed (110)` (the export-list case and the placement case;
  `logs/setup-styles-before.log.txt`). After the constants: the same command in the fresh copy gave
  exit 0, `Tests  110 passed (110)` (`logs/fresh-setup-styles.log.txt`).
- The start builder. With the case added to `tests/setupBrowser.test.ts` and no builder:
  `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser tests/setupBrowser.test.ts`
  failed at collection with exit 1, `SyntaxError: The requested module '/tests/setupBrowser.ts' does
  not provide an export named 'mountTraversalStart'` and no case run
  (`logs/setup-browser-before.log.txt`). That red is an import failure, not an assertion count; the
  `start-unfocused` mutation is the assertion-level control (`1 failed | 65 passed (66)`). After:
  `npm run test:setup:browser` in the fresh copy gave exit 0, `Tests  66 passed (66)` (`logs/fresh-setup-browser.log.txt`).
- The `Maximum sizes` frame. With the round-2 Sizing section proof and round 1's specimen:
  `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SizingSection.test.ts`
  gave exit 1, `Tests  1 failed | 3 passed (4)`, the case `renders every declared specimen through
  the shared section contract` (`logs/sizing-section-before.log.txt`). After the markup move: exit 0,
  `Tests  4 passed (4)` (`logs/caps-after.log.txt`, the same file through `tools/caps-reading.sh`).
- The consumer's nested function, the guide sentences, the remark sentence, and the comment counts
  have no gate that reads them; each is closed by the text change in § Findings closed.

## Proof matrix

Each row names a case, as `vitest list` reports it (`logs/case-list.txt`), and the mutations whose
logs record it red (`logs/matrix.txt`, produced by `tools/matrix.py` from the log headers). A style
run's population is the style proofs' `42` cases, a section run's is the section proofs' `13` cases,
a setup run's is `tests/setupStyles.test.ts` at `110` cases or `tests/setupBrowser.test.ts` at `66`
cases, and a service run's is the `service` project's `18` cases, each read from the run's own
`Tests` line.

| Proof | Case | Mutations that redden it |
| --- | --- | --- |
| `tests/src/styles/components/position.test.ts` | pins each fixed bar across the viewport at one edge | `fixed-top-edge` |
| `tests/src/styles/components/position.test.ts` | stacks the bars on the fixed and sticky levels and follows a retuned level | `boundary-exclusive`, `fixed-literal`, `sticky-literal` |
| `tests/src/styles/components/position.test.ts` | sticks each 'xs' helper at each edge of a scroll container from its boundary up | `sticky-absolute` |
| `tests/src/styles/components/position.test.ts` | sticks each 'sm' helper at each edge of a scroll container from its boundary up | `boundary-exclusive`, `sticky-absolute` |
| `tests/src/styles/components/position.test.ts` | sticks each 'md' helper at each edge of a scroll container from its boundary up | `boundary-exclusive`, `sticky-absolute` |
| `tests/src/styles/components/position.test.ts` | sticks each 'lg' helper at each edge of a scroll container from its boundary up | `boundary-exclusive`, `sticky-absolute` |
| `tests/src/styles/components/position.test.ts` | sticks each 'xl' helper at each edge of a scroll container from its boundary up | `boundary-exclusive`, `sticky-absolute` |
| `tests/src/styles/components/position.test.ts` | sticks each 'xxl' helper at each edge of a scroll container from its boundary up | `boundary-exclusive`, `sticky-absolute` |
| `tests/src/styles/components/position.test.ts` | yields to a later unlayered consumer rule and to an important utility, as normal helpers | `fixed-important` |
| `tests/src/styles/utilities/position.test.ts` | resolves every position value | `sticky-value-omitted` |
| `tests/src/styles/utilities/position.test.ts` | offsets each edge by a share of the containing block | `edge-length` |
| `tests/src/styles/utilities/position.test.ts` | keeps the start and end offsets on the physical left and right edges in a right-to-left scope | `start-logical` |
| `tests/src/styles/utilities/position.test.ts` | centers a box on each axis with the translation entries | `edge-length`, `translate-x-quarter` |
| `tests/src/styles/utilities/position.test.ts` | stacks the levels in order where their boxes overlap | `level-3-zero` |
| `tests/src/styles/utilities/position.test.ts` | writes no breakpoint infix, so no position class answers to a boundary | `position-responsive` |
| `tests/src/styles/utilities/position.test.ts` | keeps every offset independent of the density factor and inside a dark island | `edge-length` |
| `tests/src/styles/utilities/position.test.ts` | resolves a later value over an earlier one inside an entry | `level-3-zero`, `translate-x-quarter` |
| `tests/src/styles/utilities/position.test.ts` | keeps every entry over a later unlayered consumer rule | `edge-length`, `importance-dropped` |
| `tests/src/styles/utilities/position.test.ts` | yields to an important override inside the utilities layer and to no unlayered one | `edge-length`, `importance-dropped`, `unlayered-position` |
| `tests/src/styles/utilities/sizing.test.ts` | resolves every width and height step against a container of definite size | `step-75-length`, `step-length` |
| `tests/src/styles/utilities/sizing.test.ts` | sizes an auto step by its content over a width or height of its own | `importance-dropped` |
| `tests/src/styles/utilities/sizing.test.ts` | caps an element at its container with the maximum sizes | `cap-halved` |
| `tests/src/styles/utilities/sizing.test.ts` | reads the viewport sizes against the 390 viewport rather than against the container | `min-vh-omitted`, `min-vw-omitted`, `viewport-height-length`, `viewport-width-length` |
| `tests/src/styles/utilities/sizing.test.ts` | reads the viewport sizes against the 1280 viewport rather than against the container | `min-vh-omitted`, `min-vw-omitted`, `viewport-height-length`, `viewport-width-length` |
| `tests/src/styles/utilities/sizing.test.ts` | writes no breakpoint infix, so no sizing class answers to a boundary | `min-vh-omitted`, `min-vw-omitted`, `sizing-responsive` |
| `tests/src/styles/utilities/sizing.test.ts` | keeps every step independent of the density factor and inside a dark island | `step-75-length` |
| `tests/src/styles/utilities/sizing.test.ts` | resolves a later entry over an earlier one on the property both set | `order-swapped`, `viewport-height-length`, `viewport-width-length` |
| `tests/src/styles/utilities/sizing.test.ts` | keeps every step over a later unlayered consumer rule | `cap-halved`, `importance-dropped`, `step-length` |
| `tests/src/styles/utilities/sizing.test.ts` | yields to an important override inside the utilities layer and to no unlayered one | `importance-dropped`, `step-length`, `unlayered-sizing` |
| `tests/src/styles/utilities/visibility.test.ts` | hides an invisible element while it keeps its box and its room in the line | `invisible-display-none` |
| `tests/src/styles/utilities/visibility.test.ts` | shows a visible element inside an invisible ancestor | `visible-hidden` |
| `tests/src/styles/utilities/visibility.test.ts` | writes the entry with no class, so each value names its own class at no infix | `visibility-responsive` |
| `tests/src/styles/utilities/visibility.test.ts` | resolves the later value where an element carries both | `visibility-order-reversed` |
| `tests/src/styles/utilities/visibility.test.ts` | keeps each value over a later unlayered consumer rule and inside a dark island | `importance-dropped` |
| `tests/src/styles/utilities/visibility.test.ts` | yields to an important override inside the utilities layer and to no unlayered one | `importance-dropped`, `unlayered-visibility` |
| `tests/src/styles/utilities/visually-hidden.test.ts` | hides an element in a clipped one-pixel box while it stays in the accessible name | `child-overflow-dropped`, `helper-static` |
| `tests/src/styles/utilities/visually-hidden.test.ts` | keeps a caption in its table position, so it never becomes an anonymous cell | `caption-branch-dropped` |
| `tests/src/styles/utilities/visually-hidden.test.ts` | reveals the focusable form while the element holds focus, and while a descendant does | `both-focus-dropped`, `focus-within-dropped`, `helper-static` |
| `tests/src/styles/utilities/visually-hidden.test.ts` | sits ahead of every utility, so a utility the release lets win still wins | `caption-branch-dropped`, `helper-in-components`, `helper-static`, `importance-dropped`, `unlayered-sizing` |
| `tests/src/styles/utilities/visually-hidden.test.ts` | keeps the hidden box over a later unlayered consumer rule, important or not | `helper-static`, `helper-width-normal` |
| `tests/src/styles/utilities/visually-hidden.test.ts` | yields to an important override inside the utilities layer | `helper-in-components`, `helper-static` |
| `tests/src/styles/utilities/visually-hidden.test.ts` | hides the same box inside a dark island | `helper-static` |
| `tests/app/browser/sections/PositionSection.test.ts` | renders every declared specimen inside a frame through the shared section contract | `position-values-unframed` |
| `tests/app/browser/sections/PositionSection.test.ts` | contains a fixed descendant and a viewport-sized backdrop inside the frame at the 390 variant | `frame-contain-dropped`, `frame-height-unbounded`, `frame-overflow-auto`, `position-values-unframed` |
| `tests/app/browser/sections/PositionSection.test.ts` | contains a fixed descendant and a viewport-sized backdrop inside the frame at the 1280 variant | `frame-contain-dropped`, `frame-height-unbounded`, `frame-overflow-auto`, `position-values-unframed` |
| `tests/app/browser/sections/PositionSection.test.ts` | paints nothing of its own on the frame | `frame-shadowed` |
| `tests/app/browser/sections/PositionSection.test.ts` | holds the sticky bars to the edges of the box they scroll in | `frame-height-unbounded`, `scroller-unscrolled` |
| `tests/app/browser/sections/PositionSection.test.ts` | releases its region and preserves neighboring content through repeated destruction | `region-kept` |
| `tests/app/browser/sections/SizingSection.test.ts` | renders every declared specimen through the shared section contract | `maximum-outside-frame` |
| `tests/app/browser/sections/SizingSection.test.ts` | sizes the steps against their container and the viewport sizes against the viewport at the 390 variant | `frame-height-unbounded`, `step-length-sections` |
| `tests/app/browser/sections/SizingSection.test.ts` | sizes the steps against their container and the viewport sizes against the viewport at the 1280 variant | `frame-height-unbounded`, `step-length-sections` |
| `tests/app/browser/sections/SizingSection.test.ts` | releases its region and preserves neighboring content through repeated destruction | `region-kept` |
| `tests/app/browser/sections/VisibilitySection.test.ts` | renders every declared specimen beside visible text through the shared section contract | `hidden-sentence-unpositioned` |
| `tests/app/browser/sections/VisibilitySection.test.ts` | reveals the skip link while the keyboard holds focus on it, and hides it again after | `both-focus-dropped-sections` |
| `tests/app/browser/sections/VisibilitySection.test.ts` | releases its region and preserves neighboring content through repeated destruction | `region-kept` |
| `tests/setupStyles.test.ts` | binds the placement steps, values, and fixtures to the inventory, the ramp, and the journey | `setup-share-wrong`, `setup-level-wrong`, `setup-infix-narrowed`, `setup-clip-wrong`, `setup-width-wrong` |
| `tests/setupStyles.test.ts` | exports the cascade and guide readers, the selector grammar the normalizer stands on, the frozen case tables, and the retained value lists | the failing-first run with the constants absent (`logs/setup-styles-before.log.txt`) |
| `tests/setupBrowser.test.ts` | mounts a focused start control, so a traversal reaches the first control mounted after it | `start-unfocused` |
| `tests/service/tailwind/consumer.test.ts` | keeps an important shared declaration whatever the recipe withholds | `importance-dropped-service` |

The Tailwind consumer cases the unit changed read red under the service runs in § Mutation record.

## Mutation record

Every run is logged once, under `/home/user/scaffold/.orkestrel/veneer/units/upl-instruments-2/logs/mutations/<run>.log.txt`, by
`tools/mutate.py`, which replaces every occurrence of the old text in the fresh copy, rebuilds the
styles before the command where the change is in a partial the style proofs read from `dist/`, runs
the command, and restores the file (and the build). Each log's header states the file, the old and
replacement text, the command, the exit code, the population, the result line, and each red case. The
invocations are `tools/mutations.sh`, `tools/rerun.sh`, and `tools/rerun-2.sh`. The commands are:

- style runs: `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/sizing.test.ts tests/src/styles/utilities/position.test.ts tests/src/styles/utilities/visually-hidden.test.ts tests/src/styles/utilities/visibility.test.ts tests/src/styles/components/position.test.ts`;
- section runs: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SizingSection.test.ts tests/app/browser/sections/PositionSection.test.ts tests/app/browser/sections/VisibilitySection.test.ts`;
- setup runs: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`, or `--project setup:browser tests/setupBrowser.test.ts`;
- service runs: `npm run test:service`.

| Run | File | Change | Command | Result |
| --- | --- | --- | --- | --- |
| `control-styles` | — | none (unmutated control) | style | exit 0, `42 passed (42)` |
| `control-sections` | — | none (unmutated control) | section | exit 0, `13 passed (13)` |
| `control-setup-styles` | — | none (unmutated control) | setup | exit 0, `110 passed (110)` |
| `control-setup-browser` | — | none (unmutated control) | setup | exit 0, `66 passed (66)` |
| `control-service` | — | none (unmutated control) | service | exit 0, `18 passed (18)` |
| `step-length` | `src/styles/utilities/_sizing.scss` | `25: 25%` → `25: 25px` | style (rebuilt) | exit 1, `3 failed \| 39 passed (42)` |
| `step-75-length` | `src/styles/utilities/_sizing.scss` | `75: 75%` → `75: 75px` | style (rebuilt) | exit 1, `2 failed \| 40 passed (42)` |
| `importance-dropped` | `src/styles/_mixins.scss` | the `utility` mixin writes `$value` without `!important` | style (rebuilt) | exit 1, `8 failed \| 34 passed (42)` |
| `cap-halved` | `src/styles/utilities/_sizing.scss` | `$whole` `100: 100%` → `100: 50%` | style (rebuilt) | exit 1, `2 failed \| 40 passed (42)` |
| `viewport-width-length` | `src/styles/utilities/_sizing.scss` | `100: 100vw` → `100: 100px` | style (rebuilt) | exit 1, `3 failed \| 39 passed (42)` |
| `viewport-height-length` | `src/styles/utilities/_sizing.scss` | `100: 100vh` → `100: 100px` | style (rebuilt) | exit 1, `3 failed \| 39 passed (42)` |
| `min-vw-omitted` | `src/styles/utilities/_sizing.scss` | the `min-vw` include removed | style (rebuilt) | exit 1, `3 failed \| 39 passed (42)` |
| `min-vh-omitted` | `src/styles/utilities/_sizing.scss` | the `min-vh` include removed | style (rebuilt) | exit 1, `3 failed \| 39 passed (42)` |
| `order-swapped` | `src/styles/utilities/_sizing.scss` | the `w` include moved after the `vw` include | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `unlayered-sizing` | `src/styles/utilities/_sizing.scss` | `@layer utilities {` → `@media all {` | style (rebuilt) | exit 1, `2 failed \| 40 passed (42)` |
| `sizing-responsive` | `src/styles/utilities/_sizing.scss` | the `w` include gains `$responsive: true` | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `sticky-value-omitted` | `src/styles/utilities/_position.scss` | `sticky` dropped from the position values | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `edge-length` | `src/styles/utilities/_position.scss` | `50: 50%` → `50: 50px` in `$edges` | style (rebuilt) | exit 1, `5 failed \| 37 passed (42)` |
| `start-logical` | `src/styles/utilities/_position.scss` | the `start` entry writes `inset-inline-start` | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `translate-x-quarter` | `src/styles/utilities/_position.scss` | `translateX(-50%)` → `translateX(-25%)` | style (rebuilt) | exit 1, `2 failed \| 40 passed (42)` |
| `level-3-zero` | `src/styles/utilities/_position.scss` | `3: 3` → `3: 0` | style (rebuilt) | exit 1, `2 failed \| 40 passed (42)` |
| `position-responsive` | `src/styles/utilities/_position.scss` | the `top` include gains `$responsive: true` | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `unlayered-position` | `src/styles/utilities/_position.scss` | `@layer utilities {` → `@media all {` | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `fixed-top-edge` | `src/styles/components/_position.scss` | `.fixed-top` `top: 0` → `top: 10px` | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `fixed-literal` | `src/styles/components/_position.scss` | `z-index: var(--vn-stack-fixed)` → `z-index: 1030` | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `sticky-literal` | `src/styles/components/_position.scss` | `z-index: var(--vn-stack-sticky)` → `z-index: 1020` | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `sticky-absolute` | `src/styles/components/_position.scss` | the top helpers write `position: absolute` | style (rebuilt) | exit 1, `6 failed \| 36 passed (42)` |
| `fixed-important` | `src/styles/components/_position.scss` | `.fixed-top` writes `position: fixed !important` | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `boundary-exclusive` | `src/styles/_mixins.scss` | `@media (width >= #{$width})` → `@media (width > #{$width})` in `breakpoint-up` | style (rebuilt) | exit 1, `6 failed \| 36 passed (42)` |
| `helper-in-components` | `src/styles/utilities/_visually-hidden.scss` | `@layer utilities {` → `@layer components {` | style (rebuilt) | exit 1, `2 failed \| 40 passed (42)` |
| `caption-branch-dropped` | `src/styles/utilities/_visually-hidden.scss` | `&:not(caption) {` → `& {` | style (rebuilt) | exit 1, `2 failed \| 40 passed (42)` |
| `child-overflow-dropped` | `src/styles/utilities/_visually-hidden.scss` | the `*` branch removed | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `focus-within-dropped` | `src/styles/utilities/_visually-hidden.scss` | `:not(:focus-within)` removed | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `both-focus-dropped` | `src/styles/utilities/_visually-hidden.scss` | `:not(:focus):not(:focus-within)` removed | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `focus-dropped` | `src/styles/utilities/_visually-hidden.scss` | `:not(:focus)` removed (equivalent mutant) | style (rebuilt) | exit 0, `42 passed (42)` |
| `helper-width-normal` | `src/styles/utilities/_visually-hidden.scss` | `width: 1px !important` → `width: 1px` | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `helper-static` | `src/styles/utilities/_visually-hidden.scss` | `position: absolute !important` → `position: static !important` | style (rebuilt) | exit 1, `6 failed \| 36 passed (42)` |
| `visible-hidden` | `src/styles/utilities/_visibility.scss` | `visible: visible` → `visible: inherit` | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `invisible-display-none` | `src/styles/utilities/_visibility.scss` | a `.invisible { display: none !important }` rule added in the layer | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `visibility-order-reversed` | `src/styles/utilities/_visibility.scss` | the `invisible` value written before the `visible` value | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `visibility-responsive` | `src/styles/utilities/_visibility.scss` | the include gains `$responsive: true` | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `unlayered-visibility` | `src/styles/utilities/_visibility.scss` | `@layer utilities {` → `@media all {` | style (rebuilt) | exit 1, `1 failed \| 41 passed (42)` |
| `frame-contain-dropped` | `app/browser/styles/_shell.scss` | `.viewport` loses `contain: layout paint` | section | exit 1, `2 failed \| 11 passed (13)` |
| `frame-overflow-auto` | `app/browser/styles/_shell.scss` | `.viewport` `overflow: clip` → `overflow: auto` | section | exit 1, `2 failed \| 11 passed (13)` |
| `frame-height-unbounded` | `app/browser/styles/_shell.scss` | `.viewport` loses `height: 24rem` | section | exit 1, `5 failed \| 8 passed (13)` |
| `frame-shadowed` | `app/browser/styles/_shell.scss` | `.viewport` gains `box-shadow: 0 0 0 1px currentcolor` | section | exit 1, `1 failed \| 12 passed (13)` |
| `scroller-unscrolled` | `app/browser/styles/_shell.scss` | `.scroller` `overflow: auto` → `overflow: visible` | section | exit 1, `1 failed \| 12 passed (13)` |
| `maximum-outside-frame` | `app/browser/constants.ts` | the `Maximum sizes` width cap moved back outside the frame (round 1's markup) | section | exit 1, `1 failed \| 12 passed (13)` |
| `position-values-unframed` | `app/browser/constants.ts` | the `Position values` frame element written `class="frame"` | section | exit 1, `3 failed \| 10 passed (13)` |
| `hidden-sentence-unpositioned` | `app/browser/constants.ts` | the `Visually hidden` sentence loses `position-relative` | section | exit 1, `1 failed \| 12 passed (13)` |
| `region-kept` | `app/browser/sections/SpecimenSection.ts` | `SpecimenSection.destroy` keeps the region | section | exit 1, `3 failed \| 10 passed (13)` |
| `step-length-sections` | `src/styles/utilities/_sizing.scss` | `25: 25%` → `25: 25px` | section | exit 1, `2 failed \| 11 passed (13)` |
| `both-focus-dropped-sections` | `src/styles/utilities/_visually-hidden.scss` | `:not(:focus):not(:focus-within)` removed | section | exit 1, `1 failed \| 12 passed (13)` |
| `setup-share-wrong` | `tests/setupStyles.ts` | the `75` step's `share` `0.75` → `0.7` | setup | exit 1, `1 failed \| 109 passed (110)` |
| `setup-level-wrong` | `tests/setupStyles.ts` | the `3` level's `value` `3` → `4` | setup | exit 1, `1 failed \| 109 passed (110)` |
| `setup-infix-dropped` | `tests/setupStyles.ts` | the non-zero filter written `boundary > 576` (matched `BREAKPOINT_INFIXES` and `TABLE_RESPONSIVE_CASES`) | setup | exit 1, `2 failed \| 108 passed (110)` |
| `setup-infix-narrowed` | `tests/setupStyles.ts` | the same filter change on `BREAKPOINT_INFIXES` alone | setup | exit 1, `1 failed \| 109 passed (110)` |
| `setup-clip-wrong` | `tests/setupStyles.ts` | the hidden reading's clip `rect(0px, 0px, 0px, 0px)` → `auto` | setup | exit 1, `1 failed \| 109 passed (110)` |
| `setup-width-wrong` | `tests/setupStyles.ts` | `VIEWPORT_WIDTHS` `[390, 1280]` → `[390, 1024]` | setup | exit 1, `1 failed \| 109 passed (110)` |
| `start-unfocused` | `tests/setupBrowser.ts` | `mountTraversalStart` no longer calls `focus` | setup | exit 1, `1 failed \| 65 passed (66)` |
| `line-gains-w-25` | `tests/fixtures/tailwind/consumer.css` | `w-25` added to the `consumer.css` exclusion line | service | exit 1, `4 failed \| 14 passed (18)` |
| `importance-dropped-service` | `src/styles/_mixins.scss` | the `utility` mixin writes `$value` without `!important` | service (rebuilt) | exit 1, `3 failed \| 15 passed (18)` |
| `start-off-line` | `tests/fixtures/tailwind/consumer.css` | `start-0 start-50 start-100` removed from the `consumer.css` exclusion line | service | exit 1, `4 failed \| 14 passed (18)` |

Notes on the record:

- `focus-dropped` is the equivalent mutant round 1 ruled on (item 3 of round 1's deviations): the
  style runs stay green, because `:focus-within` matches the focused element itself.
- `setup-infix-dropped` matched the same filter in the `TABLE_RESPONSIVE_CASES` declaration, so it
  also reddened `binds table case families and maximum widths to the inventory and ramp`.
  `setup-infix-narrowed` repeats it on the `BREAKPOINT_INFIXES` declaration alone and reddens the
  placement case alone. Both logs stay.
- `step-75-length` was added after the matrix showed no recorded mutation reddening `keeps every
  step independent of the density factor and inside a dark island`, which reads the `.w-75` and
  `.h-50` steps.
- The runs used `mutation-run-shared.patch` (in the instrument directory). The final `upl-shared-2.patch` differs from it
  in the `SIZING_SPECIMENS` remark alone, a comment no case reads; the gates in § Gates on the fresh copy ran on the
  final patch.

## Frame runs against the shipped section proof

The frame mutations ran over the section proofs (`SizingSection.test.ts`,
`PositionSection.test.ts`, `VisibilitySection.test.ts`), population `13` cases, against the shipped
`app/browser/styles/_shell.scss` and `tests/app/browser/sections/PositionSection.test.ts`. The
failing lines are the shipped file's:

| Run | Result | Red cases and the failing assertion |
| --- | --- | --- |
| `frame-contain-dropped` (`contain: layout paint;` removed) | `2 failed \| 11 passed (13)` | the frame case at 390 and at 1280: `expect(reading.origin).toEqual([0, 0])` (`PositionSection.test.ts` around line 148) reads `[0, -1662]` and `[0, -1578]` |
| `frame-overflow-auto` (`overflow: clip` written `auto`) | `2 failed \| 11 passed (13)` | the frame case at 390 and at 1280: `expect(reading.scrolled).toEqual([0, 0])` (around line 144) reads `[50, 0]` |
| `frame-height-unbounded` (`height: 24rem;` removed) | `5 failed \| 8 passed (13)` | the frame case at 390 (`reading.inset` reads `[true, true, false]`, around line 157) and at 1280 (`[false, false, false]`); `holds the sticky bars to the edges of the box they scroll in` (`box.scrollHeight` 1006 not greater than `clientHeight` 1006, around line 198); the Sizing geometry case at 390 and at 1280 (the height shares read `0.6666666666666666` against `0.25`, `SizingSection.test.ts` around line 143) |
| `frame-shadowed` (a `box-shadow` on the frame) | `1 failed \| 12 passed (13)` | `paints nothing of its own on the frame` |
| `scroller-unscrolled` (`.scroller` written `overflow: visible`) | `1 failed \| 12 passed (13)` | `holds the sticky bars to the edges of the box they scroll in` |

The unmutated section control is `control-sections`: exit 0, `13 passed (13)`.

## Gates on the fresh copy

`tools/fresh.sh` built the fresh copy (`git archive e4e6a40`, `git init`, the base committed, its
tree `a817b53ebc8c7683e74bb79b784ea0732076678b` equal to `e4e6a40^{tree}`, `cp -al node_modules`,
the owned files laid over it), checked and applied both patches, ran the gates, reversed both
patches, confirmed every tracked file but the owned shell partial back at the base, and checked the
patches again. The log is `logs/fresh.log.txt`; each gate's full output is `logs/fresh-<gate>.log.txt`.

| Gate | Command | Exit | Result line |
| --- | --- | --- | --- |
| format | `npm run format:check` | 0 | `All matched files use the correct format.` |
| lint | `npm run lint:check` | 0 | no diagnostic (the log ends at the command echo) |
| types | `npm run check` | 0 | no diagnostic |
| build | `npm run build:src` | 0 | `✓ built in 2.10s` |
| style proofs | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/sizing.test.ts tests/src/styles/utilities/position.test.ts tests/src/styles/utilities/visually-hidden.test.ts tests/src/styles/utilities/visibility.test.ts tests/src/styles/components/position.test.ts` | 0 | `Tests  42 passed (42)` |
| setup tables | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | 0 | `Tests  110 passed (110)` |
| section proofs | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SizingSection.test.ts tests/app/browser/sections/PositionSection.test.ts tests/app/browser/sections/VisibilitySection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | 0 | `Tests  18 passed (18)` |
| conformance | `npm run test:conformance` | 0 | `Tests  22 passed (22)` |
| service | `npm run build:src:styles && npm run test:service` | 0 | `Tests  18 passed (18)` |
| guides | `npm run test:guides` | 0 | `Tests  19 passed (19)` |
| policy | `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` (the vendored skip is present at `e4e6a40`) |
| setup | `npm run test:setup` | 0 | `Tests  251 passed (251)` |
| setup browser | `npm run test:setup:browser` | 0 | `Tests  66 passed (66)` (with `upl-unlisted-2.patch`) |

`git apply --check` lines from `logs/fresh.log.txt`: `apply-check shared at base exit=0`, `apply-check unlisted at base exit=0`, and, after both patches were reversed and the tracked files other than the owned shell partial read back at the base (`git diff --quiet` exit 0), `apply-check shared after return to base exit=0` and `apply-check unlisted after return to base exit=0`.

Observation: in the worktree, `npm run check` stays red until `app/browser/constants.ts` takes the
patch, because the sections import `POSITION_COPY`, `SIZING_COPY`, and `VISIBILITY_COPY` from it.
`git diff --check` in the worktree exits 0. The journey and `CAPTURE=1` are the Orchestrator's at
landing.

## Deviations

1. **An unlisted file the builder makes false (needs a ruling).** Expected: the Shared row covers
   every file the change makes false. Found: `tests/setupBrowser.test.ts`, case `exports the
   showcase mount, the component mounts, the case matrices, the oracle drive, the recorders, the
   cascade readers, and the position scan`, holds `Object.keys(setup)` equal to a literal list, so
   the `mountTraversalStart` export criterion 3 requires reddens it under `npm run
   test:setup:browser` (`logs/setup-browser-without-unlisted.log.txt`: exit 1, `Tests  1 failed | 64 passed (65)`, that export-list case alone). Done:
   the export name and a case proving the builder (`mounts a focused start control, so a traversal
   reaches the first control mounted after it`) are returned as `/home/user/scaffold/.orkestrel/veneer/units/upl-unlisted-2.patch`,
   kept apart so `upl-shared-2.patch` equals the Shared row. Hypothesis: the brief's "What asserts
   the state" list omitted this file because the setup-browser proof sits in its own project.
2. **Tables beyond the ruling's named set (ancillary: the constants' shapes and names).** The
   objective lane named "the viewport case matrices" alongside the named tables, and each proof
   also restated the entry stems, the stacking levels, the offset edges, and the viewport-size
   pairs. Those moved too (§ Findings closed, claim 8). The round-1 container fixtures were near
   duplicates of one shape, so they became `PLACEMENT_CONTAINER` (`position: relative; width:
   400px; height: 200px`); the visually hidden proof's container gains the height it lacked. No
   reading moved: the style control is green at `42 passed (42)`, and every round-1 mutation
   rerun here reddens the same case titles its round-1 log records, except
   `frame-height-unbounded`, whose run here spans the section proofs rather than the Position
   section proof alone and so also reddens the Sizing geometry case at each variant.
3. **`SIZE_STEP_CASES` holds the percentage steps and leaves out `auto` (ancillary: shape).**
   The `auto` step has no share, and the proofs read it in its own case, so the section proof lists
   `[...SIZE_STEP_CASES.map(({ step }) => step), 'auto']` and the placement case binds `.w-auto`
   and `.h-auto` to the inventory beside the table.
4. **Observation, outside this unit's scope.** `TABLE_RESPONSIVE_CASES` in `tests/setupStyles.ts`
   derives its rows through the same non-zero breakpoint filter `BREAKPOINT_INFIXES` names. Routing
   it through `BREAKPOINT_INFIXES` is a consolidation for the unit that owns the table cases; the
   carrier is not yet known.

Ancillary choices settled and recorded: the constant names and doc comments in the preceding
table; the builder's name and signature `mountTraversalStart(): HTMLButtonElement`, mounted through
`scene` so each proof's `afterEach` hook removes it; the placement case's title; the logs' layout
under `logs/` (gate logs at its root, the gate chain over the mutation-run patch under `logs/gates-mutation-run/`, every mutation
under `logs/mutations/`); paragraph wrapping at the repository's width.

## Instruments

`/home/user/scaffold/.orkestrel/veneer/units/upl-instruments-2/`:

- `tools/stage.sh` and `tools/sync.sh`: build a copy of `e4e6a40` as a git repository under
  `tmp/probe/$COPY` and lay the owned files over it (`land`, the editing copy, took round 1's
  patches; `fresh`, the gate copy, takes none).
- `tools/patch.sh`: writes both patches from the land copy with `git diff`.
- `tools/fresh.sh`: the gate chain in § Gates on the fresh copy.
- `tools/mutate.py`, `tools/mutations.sh`, `tools/rerun.sh`, `tools/rerun-2.sh`: the mutation
  record.
- `tools/matrix.py`: the per-case matrix from the log headers.
- `tools/caps-reading.sh`: the cap readings before and after the `Maximum sizes` move.
- `tools/without-unlisted.sh`: the setup-browser run with the unlisted patch reversed
  (`logs/without-unlisted.log.txt` and `logs/setup-browser-without-unlisted.log.txt`).
- `mutation-run-shared.patch`: the shared patch the mutation runs used.
- `round-delta.diff`, `round-delta-shared.diff`: round 1 against round 2.
- `logs/`: every gate, control, mutation, and failing-first log named in this report, plus
  `mutations.log.txt` (the printed summary of the runs), `case-list.txt`, and `matrix.txt`.

`tmp/probe/` was deleted after the logs and scripts were copied here, so rebuild a copy with
`tools/stage.sh` before re-running a script.
