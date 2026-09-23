# UTIL-PLACEMENT (`upl`) report

Executor: `opus` on Opus 5.5, native Claude subagent, worktree `/home/user/veneer-upl` at `e4e6a40`.

Deviation state: no stop taken; the work is complete in the owned files, and every shared change is a
report-only patch. These findings need an Orchestrator ruling: an unlisted file the consumer proof
needs (`tests/service/tailwind/consumer.test.ts`), two criterion readings that contradict what the
release and Chromium measure, one named mutation that is equivalent, and the Scope line's
`overflow: auto`. § Deviations lists each one with its evidence.

## Touched files

Owned (untracked except the shell partial, which is modified):

- `src/styles/utilities/_position.scss`: the `position`, `top`, `bottom`, `start`, `end`,
  `translate-middle`, and `z-index` entries, written through the `utility` mixin in map order inside
  one `breakpoint-each` walk.
- `src/styles/utilities/_sizing.scss`: the sizing entries (`w`, `mw`, `vw`, `min-vw`, `h`,
  `mh`, `vh`, `min-vh`), written through the `utility` mixin in map order.
- `src/styles/utilities/_visibility.scss`: the classless `visibility` entry, written through the
  `utility` mixin with `''` as its class.
- `src/styles/utilities/_visually-hidden.scss`: the important helper in the utilities layer, with its
  `:not(caption)` and `*` branches, written by hand (see § Deviations, item 7).
- `src/styles/components/_position.scss`: the `.fixed-*` and `.sticky{infix}-*` helpers in the
  components layer, reading `--vn-stack-fixed` and `--vn-stack-sticky`.
- `app/browser/styles/_shell.scss`: adds the layout-only `.viewport` frame (`height: 24rem`,
  `overflow: clip`, `contain: layout paint`) and a `.scroller` box (`height: 100%`, `overflow: auto`)
  for the sticky demonstration.
- `app/browser/sections/PositionSection.ts`, `SizingSection.ts`, `VisibilitySection.ts`: the
  `SpecimenSection` subclasses.
- `tests/src/styles/utilities/position.test.ts`, `sizing.test.ts`, `visibility.test.ts`,
  `visually-hidden.test.ts`, `tests/src/styles/components/position.test.ts`: the mirrored proofs.
- `tests/app/browser/sections/PositionSection.test.ts` (with the frame contract),
  `SizingSection.test.ts`, `VisibilitySection.test.ts`: the section proofs.

Diffstat, owned (`git status --porcelain` shows 17 entries; `git diff --stat` covers the tracked one):
`_shell.scss` +22; `_position.scss` (components) 35, `_position.scss` (utilities) 41, `_sizing.scss`
33, `_visibility.scss` 16, `_visually-hidden.scss` 29; each section 22; `position.test.ts`
(utilities) 242, `sizing.test.ts` 148, `visibility.test.ts` 80, `visually-hidden.test.ts` 161,
`position.test.ts` (components) 127; `PositionSection.test.ts` 241, `SizingSection.test.ts` 170,
`VisibilitySection.test.ts` 118 lines, all added.

Shared (report-only): `/home/user/veneer-upl/tmp/units/upl-shared.patch` (SHA-256
`e5b86fe3ca50465c5facc2c85108ced7841e9a7bccedf841cf93de99f48ae6c9`; 15 files, 693 insertions, 95
deletions by `git apply --stat`). Unlisted file, report-only: `/home/user/veneer-upl/tmp/units/upl-consumer.patch`
(SHA-256 `5c86e5379455680e38cbfc19bf15aef982b964ecbfd9be910a08360faba6936b`). The full text of both
patches is in § Shared-file patches at the end of this report.

Instruments and logs: `/home/user/veneer-upl/tmp/units/upl-instruments/` (`mutate.py`, `census.mjs`,
`stage.sh`, `sync.sh`, `patch.sh`, `fresh.sh`, `logs/*.log.txt`). These scripts name
`tmp/probe/` and scratchpad paths. Those paths were deleted before this report, as the brief
requires, so rebuild the copy before re-running a script. The runtime probes (the release reading and
the frame reading) were deleted too; their readings are quoted where they are used.

## Baseline (worktree at `e4e6a40`, before any edit)

- `npm run test:conformance`: exit 0, `Tests 22 passed (22)`.
- `npm run test:service`: exit 0, `Tests 18 passed (18)`. This run wrote
  `tmp/tailwind/candidates.txt` through the service readiness, so the worktree's untracked `tmp/tailwind/`
  directory comes from the gate. `tmp/` is ignored.

## Failing-first and after

- Styles proofs, with the proofs present and the barrel carrying no `@use` line for the unit's
  partials (the owned partials built without being loaded):
  `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/sizing.test.ts tests/src/styles/utilities/position.test.ts tests/src/styles/utilities/visually-hidden.test.ts tests/src/styles/utilities/visibility.test.ts tests/src/styles/components/position.test.ts`
  gave exit 1, `42 failed (42)`. After the barrel lines: exit 0, `42 passed (42)`.
- Section proofs before the section classes existed:
  `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SizingSection.test.ts tests/app/browser/sections/PositionSection.test.ts tests/app/browser/sections/VisibilitySection.test.ts`
  failed at collection, with exit 1 and no case run (`Failed to import test file` for each). That
  red is an import failure, not an assertion count. With the sections present and the base shell
  (no `.viewport` rule), the same command gave `5 failed | 8 passed (13)`: both frame-contract cases,
  the sticky-bars case, and both Sizing geometry cases. After: `13 passed (13)`.
- Conformance with the partials built and no guide rows or listed-key patch: `4 failed | 18 passed (22)`.
  The failures were the `listed` literal (19 keys missing), the departure ledger (27 unrecorded rows),
  the order case (`utilities/sizing` unmapped), and one ENOENT on `dist/src/core/index.js`. The
  ENOENT came from building only the styles; a full `build:src` clears it. After the patch: `22 passed (22)`.
- Consumer proof with the shared names in the markup and on the line, and no `consumer.test.ts`
  change: `1 failed | 17 passed (18)`, with 6 × `width: 1140px became 1280px` on
  `keeps an important shared declaration whatever the recipe withholds`. After
  `upl-consumer.patch`: `18 passed (18)`.

## Built cascade against the inventory (criterion 3)

`npm run build:src` exits 0. A census of `dist/src/styles/index.css` (`census.mjs`) reads 63
selectors recorded under the unit's keys in `tests/fixtures/oracle/inventory.json` and 63 emitted.
None is missing, no other selector answers to those keys, and no empty `@media` block is emitted by
the non-responsive walks. Every declaration on the 49 utility and visually-hidden selectors carries
`!important`. The 14 `.fixed-*` and `.sticky-*` helper selectors carry normal declarations, as the
release writes them (R6: helpers keep their recorded priorities). The conformance case
`carries the priority the release writes on every declaration both sheets make, and adds none` is
green over them. No custom property is declared under these keys. Criterion 3's wording
("`!important` on each property declaration") reads against the helpers; § Deviations item 6 records
that.

## Coverage matrix

Case titles are from the mirrored proof named in each row. Every mutation was run through the five
styles proofs, or through the section proofs for the frame, with `mutate.py` in the validation copy,
and the red counts are measured out of 42 (or 13). Scenarios are the capture registry rows in the
patch.

| Inventory selectors (condition) | Proof case | Distinguishing mutation (measured red) | Specimen | Scenario |
| --- | --- | --- | --- | --- |
| `.w-25`, `.w-50`, `.w-75`, `.w-100` (—) | sizing: `resolves every width and height step against a container of definite size` | `25: 25px` in `$steps` (3 red) | `Width steps` | `width-steps` (`.w-75`, `width`) |
| `.w-auto` (—) | sizing: `sizes an auto step by its content over a width or height of its own` | mixin `!important` dropped (8 red, this case included) | `Width steps` | `width-steps` |
| `.h-25`, `.h-50`, `.h-75`, `.h-100` (—) | the same step case (heights in a flex row of definite height) | `25: 25px` (3 red) | `Height steps` | `height-steps` (`.h-75`, `height`) |
| `.h-auto` (—) | the auto case | mixin `!important` dropped (8 red) | `Height steps` | `height-steps` |
| `.mw-100`, `.mh-100` (—) | sizing: `caps an element at its container with the maximum sizes` | `100: 50%` in `$whole` (2 red) | `Maximum sizes` | `maximum-sizes` (`.mw-100`, `max-width`) |
| `.vw-100`, `.vh-100` (—) | sizing: `reads the viewport sizes against the %i viewport rather than against the container` at 390 and 1280; `resolves a later entry over an earlier one on the property both set` | `100vw` → `100px` (3 red); `100vh` → `100px` (3 red) | `Viewport sizes` (inside `.viewport`) | `viewport-sizes` (`.vw-100`, `width`) |
| `.min-vw-100`, `.min-vh-100` (—), the `min` key | the viewport case; `writes no breakpoint infix, so no sizing class answers to a boundary` | `min-vw` entry omitted (3 red); `min-vh` entry omitted (3 red) | `Viewport sizes` | `viewport-sizes` |
| `.position-static`, `-relative`, `-absolute`, `-fixed`, `-sticky` (—) | position: `resolves every position value` | `sticky` dropped from the value list (1 red) | `Position values` (inside `.viewport`) | `position-values` (`.position-absolute`, `position`) |
| `.top-0/50/100`, `.bottom-0/50/100`, `.start-0/50/100`, `.end-0/50/100` (—) | position: `offsets each edge by a share of the containing block`; `keeps the start and end offsets on the physical left and right edges in a right-to-left scope` | `50: 50px` in `$edges` (5 red); `start` written as `inset-inline-start` (1 red) | `Edge offsets` (0 and 100 steps), `Centered translation` (50 steps) | `edge-offsets` (`.bottom-0.end-0`, `right`) |
| `.translate-middle`, `-x`, `-y` (—) | position: `centers a box on each axis with the translation entries` | `translateX(-50%)` → `translateX(-25%)` (2 red) | `Centered translation` | `centered-translation` (`.translate-middle`, `transform`) |
| `.z-n1`, `.z-0`, `.z-1`, `.z-2`, `.z-3` (—) | position: `stacks the levels in order where their boxes overlap` (hit-tested) | `3: 0` (2 red) | `Stacking levels` | `stacking-levels` (`.z-3`, `z-index`) |
| `.fixed-top`, `.fixed-bottom` (—) | components/position: `pins each fixed bar across the viewport at one edge`; `stacks the bars on the fixed and sticky levels and follows a retuned level` | `top: 10px` (1 red); literal `z-index: 1030` (1 red) | `Fixed bars` (inside `.viewport`) | `fixed-bars` (`.fixed-top`, `z-index`) |
| `.sticky-top`, `.sticky-bottom` (—) | components/position: `sticks each 'xs' helper at each edge of a scroll container from its boundary up` (375 and 1401) | `position: absolute` for the top helpers (6 red, one per infix); literal `z-index: 1020` (1 red) | `Sticky bars` (a `.scroller` inside `.viewport`) | `sticky-bars` (`.sticky-top`, `position`) |
| `.sticky-{sm,md,lg,xl,xxl}-{top,bottom}` (`@media (min-width: 576/768/992/1200/1400px)`) | the same case per infix at the boundary, one pixel below it, and one above it | the same `absolute` mutation (6 red); breakpoint condition `>=` → `>` in the mixin (6 red) | `Sticky bars` shows the unconditional pair | `sticky-bars` |
| `.visually-hidden` (—) | visually-hidden: `hides an element in a clipped one-pixel box while it stays in the accessible name`, plus the priority, escape, and dark-island cases | helper moved to `@layer components` (2 red) | `Visually hidden` | `visually-hidden` (`.position-relative:has(> .visually-hidden)`, `position`) |
| `.visually-hidden:not(caption)` (—) | `keeps a caption in its table position, so it never becomes an anonymous cell`; `sits ahead of every utility…` | `&:not(caption)` written `&` (2 red) | `Visually hidden` | `visually-hidden` |
| `.visually-hidden *` (—) | the clipped-box case (child overflow) | the `*` branch dropped (1 red) | `Visually hidden` | `visually-hidden` |
| `.visually-hidden-focusable:not(:focus):not(:focus-within)`, its `:not(caption)` and `*` forms (—) | `reveals the focusable form while the element holds focus, and while a descendant does` (`traverseAccessible`); section: `reveals the skip link while the keyboard holds focus on it, and hides it again after` | `:not(:focus-within)` dropped (1 red); both pseudo-classes dropped (1 red); `:not(:focus)` dropped is equivalent (0 red, § Deviations item 3) | `Skip link` | `skip-link` (`.position-relative:has(> .visually-hidden-focusable)`, `position`); `skip-link-focus` (driven) |
| `.visible` (—) | visibility: `shows a visible element inside an invisible ancestor` | `visible: inherit` (1 red) | `Visible and invisible` | `visible-and-invisible` (`.visible`, `visibility`) |
| `.invisible` (—) | visibility: `hides an invisible element while it keeps its box and its room in the line` | a later `.invisible { display: none !important }` (1 red) | `Visible and invisible` | `visible-and-invisible` |

Every proof also reads a dark island and the density factor, or its absence, for the keys that have
no token. The sizing, position, and visibility proofs also assert that no class answers to a
breakpoint infix.

## Precedence cases

| Case | Resolution | Mutation (measured red) |
| --- | --- | --- |
| A later entry over an earlier one on one property: `.vw-100.w-25.vh-100.h-25` at 390 | the viewport width and height | `vw` entry written before `w` (1 red) |
| A later value inside an entry: `.position-absolute.position-relative`, `.translate-middle-x.translate-middle`, `.z-3.z-n1` | `absolute`, `matrix(1, 0, 0, 1, -50, 0)`, `3` | `3: 0` (2 red); `translateX(-25%)` (2 red) |
| A later visibility value: `.invisible.visible` | `hidden` | map order reversed (1 red) |
| The helper ahead of the utilities: `.visually-hidden.w-100` in a 400px container | `400px` (the release: 100%, measured 414px on `bootstrap.css` 5.3.8 in the probe page) | helper in `@layer components` (2 red) |
| The helper's own specificity: `.visually-hidden.position-relative`; `caption.visually-hidden.position-relative` | `absolute`; `relative` (the release, measured: `absolute`, `relative`) | `&:not(caption)` → `&` (2 red) |
| Priority over a later unlayered rule (every partial) | the shipped value | mixin `!important` dropped (8 red) |
| The escape: an unlayered `!important` loses and one inside `@layer utilities` wins | as stated | sizing partial moved out of the layer (2 red) |
| Normal helpers: an unlayered `.fixed-top` rule wins; `.fixed-bottom.position-static` resolves `static`; `.sticky-top.z-1` resolves `1` | as stated | `position: fixed !important` in the helper (1 red) |

## Frame contract readings (criterion 9)

The readings come from the frame-reading probe in the Position section proof's harness, with the
dialog stand-in (a `0.5rem` margin around a 320px box inside a fixed `w-100 h-100` wrapper) and the
`position-fixed top-0 start-0 vw-100 vh-100` backdrop appended to the `Fixed bars` frame:

| Reading | 390 | 1280 |
| --- | --- | --- |
| Viewport (`innerWidth` × `innerHeight`) | 390 × 896 | 1280 × 896 |
| Frame border box and client box | 390 × 384 and 390 × 384 | 1280 × 384 and 1280 × 384 |
| Frame `scrollWidth` × `scrollHeight` | 390 × 896 | 1280 × 896 |
| Frame `scrollTop` after `scrollTop = 50` | 0 | 0 |
| Page `scrollWidth` and `clientWidth` | 390 and 390 | 1280 and 1280 |
| Page `scrollHeight` growth from the backdrop | 0 | 0 |
| Backdrop size | 390 × 896, placed at the frame's corner | 1280 × 896, placed at the frame's corner |
| Dialog stand-in (left, top, width, height, room below) | 8, 8, 374, 320, 56 | 8, 8, 1264, 320, 56 |
| Frame paint | `background-color: rgba(0, 0, 0, 0)`, `background-image: none`, `box-shadow: none`, every border width 0 | the same |

Mutations, run through the section proofs: dropping `contain` gives `2 failed` (the backdrop's
origin reads `[0, -1662]` and `[0, -1578]`, placed against the page). Writing `overflow: clip` as
`overflow: auto` gives `2 failed` (the frame accepts the scroll). Dropping the height gives `3 failed`
(the bars and the dialog leave the frame, and the sticky box stops scrolling).

## Shared names against Tailwind

Measured through the consumer proof's own readers (`collectSharedNames`, `collectRuleLonghands`,
`collectImportantNames` over `stage.expand`) against the installed compiler, in the validation copy
with the unit's cascade built. The status is what the derived equality requires, and the patched
line matches it (`npm run test:service` 18 passed).

| Shared name | Longhands Tailwind declares | Veneer `!important` covers them | Exclusion line |
| --- | --- | --- | --- |
| `w-25`, `w-50`, `w-75`, `w-100`, `w-auto` | `width` | yes | off |
| `h-25`, `h-50`, `h-75`, `h-100`, `h-auto` | `height` | yes | off |
| `top-0`, `top-50`, `top-100` | `top` | yes | off |
| `bottom-0`, `bottom-50`, `bottom-100` | `bottom` | yes | off |
| `start-0`, `start-50`, `start-100` | `inset-inline-start` | no (Veneer declares `left`) | on |
| `end-0`, `end-50`, `end-100` | `inset-inline-end` | no (Veneer declares `right`) | on |
| `z-0`, `z-1`, `z-2`, `z-3` | `z-index` | yes | off |
| `visible`, `invisible` | `visibility` | yes | off |

No other name the unit ships is shared: `z-n1`, `mw-100`, `mh-100`, `vw-100`, `vh-100`,
`min-vw-100`, `min-vh-100`, `position-*`, `translate-middle*`, `fixed-*`, `sticky-*`, and
`visually-hidden*` are absent from the instrument profile's output. The line gains
`end-0 end-50 end-100 start-0 start-50 start-100`, placed after `container` in the line and in
every copy (`tests/setup.css`, `consumer.css`, `preflight.css`, and both recipe fences in the guide).
`markup.html` gains one element per shared name, appended after the `.container` element.

Negative controls, measured through `npm run test:service`:

- `w-25` written onto the `consumer.css` line: `4 failed | 14 passed` (the copies-equal case, the
  derived-equality case, the recipe-equals-fence case, and the partial-importance case).
- The mixin's `!important` dropped: `3 failed | 15 passed` (the equality cases and the importance
  branch).
- `start-0 start-50 start-100` taken off the `consumer.css` line: `4 failed | 14 passed`.

## Ledger rows written

`#### fixed` (between `#### figure` and `#### g`):

```text
fixed | .fixed-top | z-index | — | 1030 | var(--vn-stack-fixed) | tokenized
fixed | .fixed-bottom | z-index | — | 1030 | var(--vn-stack-fixed) | tokenized
```

`#### position` (between `#### placeholder` and `#### icon-link`):

```text
position | .position-sticky | position | — | -webkit-sticky | sticky | declared
```

`#### sticky` (between `#### row-gap` and `#### table`), for each of `.sticky-top`,
`.sticky-bottom`, and `.sticky-{sm,md,lg,xl,xxl}-{top,bottom}`, under `—` or
`@media (width >= 576px/768px/992px/1200px/1400px)`:

```text
sticky | .sticky-top | position | — | -webkit-sticky | sticky | declared
sticky | .sticky-top | z-index | — | 1020 | var(--vn-stack-sticky) | tokenized
```

That makes 24 `sticky` rows, and 27 departure rows in all, which are exactly the rows the ledger
gate printed. `### Additions` gains no row, because `additions.unrecorded` is empty. The compatibility
table gains one `selector` row per key (`w`, `mw`, `vw`, `min`, `h`, `mh`, `vh`, `position`, `top`,
`bottom`, `start`, `end`, `translate-middle`, `z`, `fixed`, `sticky`, `visually-hidden`, `visible`,
`invisible`) after the `pagination | variable` row. No key needs a `variable` row, because the
inventory records no custom property for any of them.

## Section text

The region copy, the specimen tables, the `### Position utilities`, `### Sizing utilities`, and
`### Visibility utilities` sections (between `### Gap utilities` and `### Deferred selectors`), the
§ Showcase frame paragraph, the § Tailwind sentences, the § Files rows, and the § Tests links are
in the patch that follows, verbatim. Regions construct after `Input group` in the order Position,
Sizing, Visibility.

## Gates

All gates below ran in a fresh copy (`git archive e4e6a40`, `cp -al node_modules`, the owned files
laid over it, then `git apply` of both patches; `git apply --check` exit 0 for each), driven by
`fresh.sh`. The log is `upl-instruments/logs/fresh-2.log.txt`.

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | no diagnostic |
| `npm run build:src` | 0 | built |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot` over the five owned proofs | 0 | `42 passed (42)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser` over the three section proofs, `Showcase.test.ts`, and `index.test.ts` | 0 | `18 passed (18)` |
| `npm run test:conformance` | 0 | `22 passed (22)` |
| `npm run build:src:styles && npm run test:service` | 0 | `18 passed (18)` |
| `npm run test:guides` | 0 | `19 passed (19)` |
| `npm run test:policy` | 0 | `109 passed \| 1 skipped (110)` (the vendored skip is present at `e4e6a40`) |
| `npm run test:setup` | 0 | `250 passed (250)` |

In the worktree: `npm run format:check` exits 0 and `npm run lint:check` exits 0. `npm run check`
exits 2 there, because the sections import `POSITION_COPY`, `SIZING_COPY`, and `VISIBILITY_COPY`
with their tables from the shared `app/browser/constants.ts`, which carries them only in the patch;
it exits 0 in the copy. `git diff --check` is clean.

Observations, not criteria: the whole styles project in the fresh copy gave exit 0,
`808 passed (808)`; `npm run test:app` gave exit 0, `79 passed (79)`; `npm run test:config` gave exit 0,
`173 passed | 1 skipped (174)`. The journey
(`npx vitest run --config configs/app/vite.journey.config.ts`) ran once on the first validation
copy and gave exit 0, `4 files, 156 passed`, covering the four variants, the resting rows, and the
`skip-link-focus` case. That copy predates the final guide rewrap and the `_sizing.scss` reshape
into named maps. After the reshape the census read 63 of 63, with none missing and none extra.
`CAPTURE=1` was not run.

## Deviations

Each item gives what the brief expected, what the tree measured, and what the unit did. None stopped
the unit, and each one needs an Orchestrator ruling where it says so.

1. **Unlisted file needed by criterion 7 (needs a ruling).** Expected: the consumer proof reads each
   shared name through the fixtures the brief shares. Found: the importance-branch case reads the
   union of every branch name's longhands on every branch element. With `w-*` in the branch, that
   union includes `width`, and the gap rows sit inside the `.container` element, whose width moves
   from 1140px to 1280px when the line drops, so the case reported 6 × `width: 1140px became 1280px`
   (`1 failed | 17 passed`). The fix is in `tests/service/tailwind/consumer.test.ts`, which the brief
   names neither as owned nor as shared: read each element on its own name's longhands. The fix
   was returned as `upl-consumer.patch`, applied only in the copy, and gives `18 passed`. The guide
   patch adds the sentence that describes it. Hypothesis: every later unit that ships a
   width-declaring or height-declaring shared name would meet the same failure.
2. **Criterion 4, `.visually-hidden.position-relative` (needs a ruling).** Expected: it resolves
   `relative`, with the helper-in-components mutation reddening it. Found: the release resolves it
   `absolute`. A probe page loading `bootstrap/dist/css/bootstrap.css` read `absolute` for that
   element, `414px` (100%) for `.visually-hidden.w-100`, and `relative` for
   `caption.visually-hidden.position-relative`. The helper's `:not(caption)` rule, at specificity
   (0,1,1), beats `.position-relative` at (0,1,0) in either layer, so no placement makes it `relative`,
   and the named mutation cannot distinguish on that element. Done: the proof asserts the release's
   `absolute` and the caption's `relative`, and it distinguishes the placement through
   `.visually-hidden.w-100` (400px at the head of the utilities layer, 1px in components; 2 red).
3. **Criterion 4, the skip link mutation.** Expected: dropping `:not(:focus)` reddens the skip link
   case. Found: that mutant is equivalent. `:focus-within` matches the focused element itself, so
   `.visually-hidden-focusable:not(:focus-within)` still reveals a focused link (measured 0 red).
   Done: the proof distinguishes dropping `:not(:focus-within)` (a focused descendant no longer
   reveals its container; 1 red) and dropping both (the skip link stays 1px under
   `traverseAccessible`; 1 red).
4. **Criterion 9, `scrollHeight` equal to `clientHeight` (needs a ruling).** Expected: with the
   backdrop inside the frame, the frame's `scrollHeight` equals its `clientHeight`. Found: Chromium
   reports the clipped extent under `overflow: clip`: `scrollHeight` is 896 against a `clientHeight`
   of 384 at both widths. `overflow: hidden` and `overflow: auto` report the same extent. Done, as the
   measured alternative M3 allows: the proof reads "no scrollbar" as the frame refusing a scroll
   (`scrollTop` stays 0 after `scrollTop = 50`, which `overflow: auto` and `overflow: hidden` both
   accept), a zero gutter, the page's `scrollWidth` equal to the viewport width, and no growth in the
   page's `scrollHeight`. The frame's `scrollWidth` equals its `clientWidth`, and the proof asserts
   it.
5. **Scope against Context on the frame's overflow.** Scope says `overflow: auto`; Context, criterion
   9, and M3 say `overflow: clip`, and criterion 9 names `auto` as the mutation. Shipped: `clip`.
6. **Criterion 3's importance wording.** It asks for `!important` on each property declaration of
   every selector under the keys. The `fixed` and `sticky` helpers are normal in the release, and R6
   keeps helpers at their recorded priorities, so the cascade writes them normal. The priority
   conformance case holds them equal to the release.
7. **The brief's "no partial writes `!important` by hand" against family ruling 2.** The ruling
   scopes the ban to utility entries. `.visually-hidden` is a helper whose declarations each carry
   their own value, and the `utility` mixin writes one value per call on a class name, so
   reproducing the helper's `:not(caption)` and `*` branches through it would mean passing
   selector fragments as `$class`. The helper is written by hand, as `_link.scss` writes its
   helpers. The family record governs.
8. **An added shell class.** No overflow utility ships at `e4e6a40`, and the frame clips, so the
   sticky demonstration needs a scroll box. `_shell.scss` (owned) adds `.scroller` beside
   `.viewport`, layout only.
9. **`traverseAccessible` needs a focused starting point.** From a page with nothing focused, the
   installed traversal's `userEvent.tab()` lands on no element (an empty trail). The proofs mount a
   case-owned `Start` button, focus it, and then traverse. The journey case focuses the link
   directly, as the close-control focus case does.
10. **The sticky prefix.** The mixin writes one value per property, so `position: -webkit-sticky`
    cannot precede `position: sticky` on `.position-sticky`. The unit drops the prefixed value on the
    helpers too, following the guide's prefixed-alias precedent. That gives 13 `declared` rows and
    one guide bullet.
11. **Ancillary choices settled.** The regions run Position, Sizing, Visibility, the barrel order of
    their partials. The specimens draw their boxes with `.placeholder` (the release's consumer of
    the width utilities), with `.card` where a bar or a stacked box has to paint, and with text
    elsewhere. The `Visually hidden` and `Skip link` sentences carry `position-relative`, so the
    absolutely placed hidden element stays inside its sentence, and their registry rows read that
    host (`.position-relative:has(> …)`, `position`): `tests/setup.test.ts` requires a class-led
    selector, and the 1px element would give a blank frame region. The `Edge offsets` row reads
    `.bottom-0.end-0`, because a `top-100` element would read as hanging under the journey's check.
    The guide's § Files table realigns whole, because the `_visually-hidden.scss` path widens its
    first column. The brief names `index.d.cts` for the browser entry; the installed browser entry
    carries `index.d.ts` alone.
12. **Unknowns settled.** Every recorded selector reaches its key through inventory membership:
    each one is recorded under exactly one key, and `attributeSelector` returns that key. The
    ladder in `tests/setupServer.ts` needs no change, and the ledger threw no claim collision. The
    exclusion status of each shared name is in the shared-name table.

No `ROADMAP.md` patch: the landing fold is the Orchestrator's, and no carrier row closes here. The
"all normal shared name" row stays open, because every shared name the unit ships is important.
No `tests/setupStyles.ts` or `tests/setupStyles.test.ts` patch was needed.

## What the unit could not close

- The grant or reroute for `tests/service/tailwind/consumer.test.ts` (item 1). Without it, criterion
  7 is red after integration.
- Criterion 9's literal `scrollHeight` reading and criterion 4's literal `relative` reading (items 4
  and 2), which contradict Chromium and the release. The proofs assert the measured alternatives.
- The `:not(:focus)` mutation (item 3), which no proof can distinguish.
- `npm run check` in the worktree stays red until `app/browser/constants.ts` takes the patch.
- `CAPTURE=1` frames and the journey on the final tree are the Orchestrator's runs.

## Shared-file patches

`/home/user/veneer-upl/tmp/units/upl-shared.patch`, unified diff against `e4e6a40`:

```diff
--- a/src/styles/index.scss
+++ b/src/styles/index.scss
@@ -69,5 +69,10 @@
 @use 'components/placeholder';
 @use 'components/icon-link';
 @use 'components/ratio';
+@use 'components/position' as position-component;
 @use 'components/vr';
+@use 'utilities/visually-hidden';
+@use 'utilities/position';
+@use 'utilities/sizing';
 @use 'utilities/gap';
+@use 'utilities/visibility';
--- a/app/browser/constants.ts
+++ b/app/browser/constants.ts
@@ -1704,3 +1704,155 @@
 			'<div class="container-fluid"><fieldset class="row"><legend class="col-5 col-form-label">Pickup</legend><div class="col-7"><input class="form-control" type="date" aria-label="Pickup date" value="2026-09-23"></div></fieldset></div>',
 	}),
 ])
+
+/** Holds the Position section's visible copy and accessible name. */
+export const POSITION_COPY = Object.freeze({
+	region: 'Position',
+	paragraph:
+		'Compare the position values, the edge offsets and the centered translation that place a box inside its container, and the stacking levels that order boxes where they overlap. The fixed bars hold to the edges of the frame they render in, and the sticky bars hold to the edges of the box they scroll in.',
+})
+
+/**
+ * Holds the position specimens, each rendered inside a frame of the shell's own.
+ *
+ * @remarks
+ * A fixed or sticky element is placed against its containing block or its scroll container rather
+ * than against its parent, so every specimen renders inside the shell's `viewport` frame: the frame
+ * is the containing block of each fixed and absolute descendant, and its bounded height is what a
+ * percentage offset resolves against. The frame clips rather than scrolls, so the sticky bars scroll
+ * inside the shell's `scroller` box within it. The bars and the stacked boxes are cards, because a
+ * bar or a stacked box has to paint to show where it sits; every other specimen places text alone.
+ */
+export const POSITION_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([
+	Object.freeze({
+		name: 'Position values',
+		markup:
+			'<div class="viewport"><div class="position-relative h-100"><p class="position-static">Static, in the flow</p><p class="position-relative start-50">Relative, shifted</p><p class="position-sticky top-0">Sticky, in the flow</p><p class="position-absolute bottom-0 end-0">Absolute, at the bottom end</p><p class="position-fixed top-0 end-0">Fixed, at the top end</p></div></div>',
+	}),
+	Object.freeze({
+		name: 'Edge offsets',
+		markup:
+			'<div class="viewport"><div class="position-relative h-100"><div class="position-absolute top-50 start-50 translate-middle w-50 h-50"><span class="position-absolute top-0 start-0">Top start</span><span class="position-absolute top-0 end-0">Top end</span><span class="position-absolute bottom-0 start-0">Bottom start</span><span class="position-absolute bottom-0 end-0">Bottom end</span><span class="position-absolute top-100 start-100">Past the end</span><span class="position-absolute bottom-100 end-100">Before the start</span></div></div></div>',
+	}),
+	Object.freeze({
+		name: 'Centered translation',
+		markup:
+			'<div class="viewport"><div class="position-relative h-100"><span class="position-absolute top-0 start-50 translate-middle-x">Centered across the top</span><span class="position-absolute top-50 start-50 translate-middle">Centered</span><span class="position-absolute top-50 start-0 translate-middle-y">Centered down the start</span></div></div>',
+	}),
+	Object.freeze({
+		name: 'Stacking levels',
+		markup: `<div class="viewport"><div class="position-relative h-100">${[
+			{ level: 'n1', place: 'bottom-0 start-0 w-50 h-50', label: 'Level -1' },
+			{ level: '0', place: 'top-0 end-0 w-50 h-50', label: 'Level 0' },
+			{ level: '1', place: 'top-0 start-0 w-75 h-75', label: 'Level 1' },
+			{ level: '2', place: 'bottom-0 end-0 w-75 h-75', label: 'Level 2' },
+			{ level: '3', place: 'top-50 start-50 translate-middle w-50 h-50', label: 'Level 3' },
+		]
+			.map(
+				({ level, place, label }) =>
+					`<div class="card position-absolute ${place} z-${level}"><div class="card-body">${label}</div></div>`,
+			)
+			.join('')}</div></div>`,
+	}),
+	Object.freeze({
+		name: 'Fixed bars',
+		markup:
+			'<div class="viewport"><div class="card fixed-top"><div class="card-body">Fixed to the top of the frame</div></div><p>The frame is the containing block of each fixed bar, so each bar holds to an edge of the frame rather than to an edge of the page.</p><div class="card fixed-bottom"><div class="card-body">Fixed to the bottom of the frame</div></div></div>',
+	}),
+	Object.freeze({
+		name: 'Sticky bars',
+		markup:
+			'<div class="viewport"><div class="scroller"><div class="card sticky-top"><div class="card-body">Sticky at the top of the box</div></div><div class="vh-100"><p>Scroll this box: each bar holds to its edge while this content moves under it.</p></div><div class="card sticky-bottom"><div class="card-body">Sticky at the bottom of the box</div></div></div></div>',
+	}),
+])
+
+/** Holds the Sizing section's visible copy and accessible name. */
+export const SIZING_COPY = Object.freeze({
+	region: 'Sizing',
+	paragraph:
+		'Compare the width and height steps that size a box against its container, the maximum sizes that cap a box at its container, and the viewport sizes that read the viewport itself. Resize the viewport to watch the viewport sizes follow it while the steps follow their container.',
+})
+
+/**
+ * Holds the sizing specimens, each drawing its boxes as placeholders.
+ *
+ * @remarks
+ * A sized box has to paint to show its size, and the placeholder is the release's own consumer of
+ * the width utilities, so each box is a placeholder hidden from assistive technology. A percentage
+ * height resolves only against a container of definite height, so the height steps and the height
+ * cap render inside the shell's `viewport` frame, whose height is bounded. The viewport sizes render
+ * inside the same frame, which clips what they overflow, so a box as wide as the viewport raises no
+ * scrollbar on the page.
+ */
+export const SIZING_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([
+	Object.freeze({
+		name: 'Width steps',
+		markup: [
+			...['25', '50', '75', '100'].map(
+				(step) => `<p><span class="placeholder w-${step}" aria-hidden="true"></span></p>`,
+			),
+			'<p><span class="placeholder w-auto" aria-hidden="true">Auto width</span></p>',
+		].join(''),
+	}),
+	Object.freeze({
+		name: 'Height steps',
+		markup: `<div class="viewport"><div class="container-fluid h-100"><div class="row h-100">${[
+			'25',
+			'50',
+			'75',
+			'100',
+			'auto',
+		]
+			.map(
+				(step) =>
+					`<div class="col"><span class="placeholder w-100 h-${step}" aria-hidden="true"></span></div>`,
+			)
+			.join('')}</div></div></div>`,
+	}),
+	Object.freeze({
+		name: 'Maximum sizes',
+		markup:
+			'<p><span class="placeholder vw-100 mw-100" aria-hidden="true"></span></p><div class="viewport"><div class="h-50"><span class="placeholder w-25 vh-100 mh-100" aria-hidden="true"></span></div></div>',
+	}),
+	Object.freeze({
+		name: 'Viewport sizes',
+		markup:
+			'<div class="viewport"><p><span class="placeholder vw-100" aria-hidden="true"></span></p><p><span class="placeholder min-vw-100" aria-hidden="true"></span></p><span class="placeholder w-25 vh-100" aria-hidden="true"></span> <span class="placeholder w-25 min-vh-100" aria-hidden="true"></span></div>',
+	}),
+])
+
+/** Holds the Visibility section's visible copy and accessible name. */
+export const VISIBILITY_COPY = Object.freeze({
+	region: 'Visibility',
+	paragraph:
+		'Compare an invisible word that keeps its room with the visible words beside it, a visually hidden phrase that stays in the text a screen reader announces, and a skip link that appears only while it holds focus. Press Tab to reach the skip link.',
+})
+
+/**
+ * Holds the visibility specimens, each rendering its hidden subject beside visible text.
+ *
+ * @remarks
+ * A hidden subject paints nothing of its own, so each specimen carries the visible text around it:
+ * the room an invisible word keeps shows as the gap between its neighbors, and the visually hidden
+ * phrase and the resting skip link sit inside a visible sentence. That sentence is positioned, so
+ * the hidden element, which the helper positions absolutely, is placed inside the sentence rather
+ * than against a distant ancestor. The skip link points at the `#main` fragment the link specimens
+ * point at.
+ */
+export const VISIBILITY_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([
+	Object.freeze({
+		name: 'Visible and invisible',
+		markup:
+			'<p><span class="visible">Visible word</span> <span class="invisible">Invisible word</span> <span>Next word, after the room the invisible word keeps</span></p>',
+	}),
+	Object.freeze({
+		name: 'Visually hidden',
+		markup:
+			'<p class="position-relative">Unread messages: 3<span class="visually-hidden">, all sent since your last visit</span></p>',
+	}),
+	Object.freeze({
+		name: 'Skip link',
+		markup:
+			'<p class="position-relative">Press Tab to reveal the link this line holds. <a class="visually-hidden-focusable" href="#main">Skip to main content</a></p>',
+	}),
+])
--- a/app/browser/Showcase.ts
+++ b/app/browser/Showcase.ts
@@ -22,11 +22,14 @@
 import { MediaSection } from './sections/MediaSection.js'
 import { PaginationSection } from './sections/PaginationSection.js'
 import { PlaceholderSection } from './sections/PlaceholderSection.js'
+import { PositionSection } from './sections/PositionSection.js'
 import { ProgressSection } from './sections/ProgressSection.js'
+import { SizingSection } from './sections/SizingSection.js'
 import { SpinnerSection } from './sections/SpinnerSection.js'
 import { TableSection } from './sections/TableSection.js'
 import { TypeSection } from './sections/TypeSection.js'
 import { ValidationSection } from './sections/ValidationSection.js'
+import { VisibilitySection } from './sections/VisibilitySection.js'
 
 /**
  * Mounts a heading, color-mode control, named showcase region, and the sections after it.
@@ -114,6 +117,9 @@
 			new BreadcrumbSection(this.#main),
 			new CloseSection(this.#main),
 			new InputGroupSection(this.#main),
+			new PositionSection(this.#main),
+			new SizingSection(this.#main),
+			new VisibilitySection(this.#main),
 		]
 	}
 
--- a/app/browser/index.ts
+++ b/app/browser/index.ts
@@ -27,3 +27,6 @@
 export * from './sections/BreadcrumbSection.js'
 export * from './sections/CloseSection.js'
 export * from './sections/InputGroupSection.js'
+export * from './sections/PositionSection.js'
+export * from './sections/SizingSection.js'
+export * from './sections/VisibilitySection.js'
--- a/tests/setup.ts
+++ b/tests/setup.ts
@@ -199,6 +199,19 @@
 	| 'Waving placeholder'
 	| 'Gap steps'
 	| 'Responsive gap'
+	| 'Position values'
+	| 'Edge offsets'
+	| 'Centered translation'
+	| 'Stacking levels'
+	| 'Fixed bars'
+	| 'Sticky bars'
+	| 'Width steps'
+	| 'Height steps'
+	| 'Maximum sizes'
+	| 'Viewport sizes'
+	| 'Visible and invisible'
+	| 'Visually hidden'
+	| 'Skip link'
 
 /**
  * Names one state a journey drives its subject to, or reads that subject in.
@@ -1077,6 +1090,84 @@
 		selector: '.gap-md-3',
 		property: 'column-gap',
 	}),
+	Object.freeze({
+		scenario: 'position-values',
+		subject: 'Position values',
+		selector: '.position-absolute',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'edge-offsets',
+		subject: 'Edge offsets',
+		selector: '.bottom-0.end-0',
+		property: 'right',
+	}),
+	Object.freeze({
+		scenario: 'centered-translation',
+		subject: 'Centered translation',
+		selector: '.translate-middle',
+		property: 'transform',
+	}),
+	Object.freeze({
+		scenario: 'stacking-levels',
+		subject: 'Stacking levels',
+		selector: '.z-3',
+		property: 'z-index',
+	}),
+	Object.freeze({
+		scenario: 'fixed-bars',
+		subject: 'Fixed bars',
+		selector: '.fixed-top',
+		property: 'z-index',
+	}),
+	Object.freeze({
+		scenario: 'sticky-bars',
+		subject: 'Sticky bars',
+		selector: '.sticky-top',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'width-steps',
+		subject: 'Width steps',
+		selector: '.w-75',
+		property: 'width',
+	}),
+	Object.freeze({
+		scenario: 'height-steps',
+		subject: 'Height steps',
+		selector: '.h-75',
+		property: 'height',
+	}),
+	Object.freeze({
+		scenario: 'maximum-sizes',
+		subject: 'Maximum sizes',
+		selector: '.mw-100',
+		property: 'max-width',
+	}),
+	Object.freeze({
+		scenario: 'viewport-sizes',
+		subject: 'Viewport sizes',
+		selector: '.vw-100',
+		property: 'width',
+	}),
+	Object.freeze({
+		scenario: 'visible-and-invisible',
+		subject: 'Visible and invisible',
+		selector: '.visible',
+		property: 'visibility',
+	}),
+	Object.freeze({
+		scenario: 'visually-hidden',
+		subject: 'Visually hidden',
+		selector: '.position-relative:has(> .visually-hidden)',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'skip-link',
+		subject: 'Skip link',
+		selector: '.position-relative:has(> .visually-hidden-focusable)',
+		property: 'position',
+	}),
 ])
 
 /**
@@ -1121,6 +1212,7 @@
 	Object.freeze({ scenario: 'form-floating-empty-focus', subject: 'Form floating empty' }),
 	Object.freeze({ scenario: 'form-select-base-focus', subject: 'Form select base' }),
 	Object.freeze({ scenario: 'form-control-text-focus', subject: 'Form control text' }),
+	Object.freeze({ scenario: 'skip-link-focus', subject: 'Skip link' }),
 ])
 
 /**
--- a/tests/conformance.test.ts
+++ b/tests/conformance.test.ts
@@ -98,6 +98,7 @@
 		const listed: readonly string[] = [
 			'badge',
 			'blockquote',
+			'bottom',
 			'breadcrumb',
 			'btn',
 			'btn-close',
@@ -108,7 +109,9 @@
 			'column-gap',
 			'container',
 			'display',
+			'end',
 			'figure',
+			'fixed',
 			'form',
 			'form-check',
 			'form-control',
@@ -119,6 +122,7 @@
 			'gap',
 			'gx',
 			'gy',
+			'h',
 			'h1',
 			'h2',
 			'h3',
@@ -131,6 +135,7 @@
 			'input-group',
 			'invalid-feedback',
 			'invalid-tooltip',
+			'invisible',
 			'is-invalid',
 			'is-valid',
 			'lead',
@@ -139,9 +144,13 @@
 			'list-inline',
 			'list-unstyled',
 			'mark',
+			'mh',
+			'min',
+			'mw',
 			'offset',
 			'pagination',
 			'placeholder',
+			'position',
 			'progress',
 			'ratio',
 			'reboot',
@@ -149,11 +158,21 @@
 			'row-gap',
 			'small',
 			'spinner',
+			'start',
+			'sticky',
 			'table',
+			'top',
+			'translate-middle',
 			'valid-feedback',
 			'valid-tooltip',
+			'vh',
+			'visible',
+			'visually-hidden',
 			'vr',
+			'vw',
+			'w',
 			'was-validated',
+			'z',
 		]
 		expect(
 			scanCompatibilityPresence(rows, readOracleInventory(), readDeferrals(), readBuiltCascade()),
@@ -452,8 +471,22 @@
 			'visually-hidden': 'utilities/visually-hidden',
 		}
 		const entryPaths: Readonly<Record<string, string>> = {
+			top: 'utilities/position',
+			bottom: 'utilities/position',
+			start: 'utilities/position',
+			end: 'utilities/position',
+			'translate-middle': 'utilities/position',
+			width: 'utilities/sizing',
+			'max-width': 'utilities/sizing',
+			'viewport-width': 'utilities/sizing',
+			'min-viewport-width': 'utilities/sizing',
+			height: 'utilities/sizing',
+			'max-height': 'utilities/sizing',
+			'viewport-height': 'utilities/sizing',
+			'min-viewport-height': 'utilities/sizing',
 			'row-gap': 'utilities/gap',
 			'column-gap': 'utilities/gap',
+			'z-index': 'utilities/position',
 		}
 		const helperOrder = helpers.map((name) => helperPaths[name] ?? `components/${name}`)
 		const utilityOrder = [
--- a/tests/setupServer.test.ts
+++ b/tests/setupServer.test.ts
@@ -1338,6 +1338,7 @@
 			new Set([
 				'badge',
 				'blockquote',
+				'bottom',
 				'breadcrumb',
 				'btn',
 				'btn-close',
@@ -1348,8 +1349,10 @@
 				'column-gap',
 				'container',
 				'display',
+				'end',
 				'engine',
 				'figure',
+				'fixed',
 				'form',
 				'form-check',
 				'form-control',
@@ -1360,6 +1363,7 @@
 				'gap',
 				'gx',
 				'gy',
+				'h',
 				'h1',
 				'h2',
 				'h3',
@@ -1372,6 +1376,7 @@
 				'input-group',
 				'invalid-feedback',
 				'invalid-tooltip',
+				'invisible',
 				'is-invalid',
 				'is-valid',
 				'lead',
@@ -1380,9 +1385,13 @@
 				'list-inline',
 				'list-unstyled',
 				'mark',
+				'mh',
+				'min',
+				'mw',
 				'offset',
 				'pagination',
 				'placeholder',
+				'position',
 				'progress',
 				'ratio',
 				'reboot',
@@ -1390,11 +1399,21 @@
 				'row-gap',
 				'small',
 				'spinner',
+				'start',
+				'sticky',
 				'table',
+				'top',
+				'translate-middle',
 				'valid-feedback',
 				'valid-tooltip',
+				'vh',
+				'visible',
+				'visually-hidden',
 				'vr',
+				'vw',
+				'w',
 				'was-validated',
+				'z',
 			]),
 		)
 		expect(
--- a/tests/app/browser/Showcase.test.ts
+++ b/tests/app/browser/Showcase.test.ts
@@ -20,13 +20,16 @@
 	MEDIA_SPECIMENS,
 	PAGINATION_SPECIMENS,
 	PLACEHOLDER_SPECIMENS,
+	POSITION_SPECIMENS,
 	PROGRESS_SPECIMENS,
 	SHOWCASE_COPY,
+	SIZING_SPECIMENS,
 	SPINNER_SPECIMENS,
 	Showcase,
 	TYPE_SPECIMENS,
 	TABLE_SPECIMENS,
 	VALIDATION_SPECIMENS,
+	VISIBILITY_SPECIMENS,
 } from '@app/browser'
 import { Button, BUTTON_SELECTOR } from '@src/browser'
 import { requireValue } from '@orkestrel/test'
@@ -111,6 +114,9 @@
 				'Breadcrumb',
 				'Close',
 				'Input group',
+				'Position',
+				'Sizing',
+				'Visibility',
 			])
 			expect(
 				[...host.querySelectorAll('[data-specimen]')].map((element) =>
@@ -142,6 +148,9 @@
 					...BREADCRUMB_SPECIMENS,
 					...CLOSE_SPECIMENS,
 					...INPUT_GROUP_SPECIMENS,
+					...POSITION_SPECIMENS,
+					...SIZING_SPECIMENS,
+					...VISIBILITY_SPECIMENS,
 				].map((specimen) => specimen.name),
 			)
 			expect(readPerception('Showcase')).toBe('Explore the color mode with the Dark mode control.')
--- a/tests/app/browser/index.test.ts
+++ b/tests/app/browser/index.test.ts
@@ -69,16 +69,22 @@
 			'PAGINATION_SPECIMENS',
 			'PLACEHOLDER_COPY',
 			'PLACEHOLDER_SPECIMENS',
+			'POSITION_COPY',
+			'POSITION_SPECIMENS',
 			'PROGRESS_COPY',
 			'PROGRESS_SPECIMENS',
 			'PaginationSection',
 			'PlaceholderSection',
+			'PositionSection',
 			'ProgressSection',
 			'SHOWCASE_CONTROL',
 			'SHOWCASE_COPY',
+			'SIZING_COPY',
+			'SIZING_SPECIMENS',
 			'SPINNER_COPY',
 			'SPINNER_SPECIMENS',
 			'Showcase',
+			'SizingSection',
 			'SpecimenSection',
 			'SpinnerSection',
 			'TABLE_COPY',
@@ -89,7 +95,10 @@
 			'TypeSection',
 			'VALIDATION_COPY',
 			'VALIDATION_SPECIMENS',
+			'VISIBILITY_COPY',
+			'VISIBILITY_SPECIMENS',
 			'ValidationSection',
+			'VisibilitySection',
 		])
 	})
 })
--- a/tests/app/browser/integration.test.ts
+++ b/tests/app/browser/integration.test.ts
@@ -59,12 +59,15 @@
 	MEDIA_SPECIMENS,
 	PAGINATION_SPECIMENS,
 	PLACEHOLDER_SPECIMENS,
+	POSITION_SPECIMENS,
 	PROGRESS_SPECIMENS,
 	SHOWCASE_COPY,
+	SIZING_SPECIMENS,
 	SPINNER_SPECIMENS,
 	TABLE_SPECIMENS,
 	TYPE_SPECIMENS,
 	VALIDATION_SPECIMENS,
+	VISIBILITY_SPECIMENS,
 } from '@app/browser'
 import {
 	buildStem,
@@ -1566,6 +1569,39 @@
 		)
 		JOURNAL.record('focus', readName(control), lifted)
 	})
+	it('reveals the skip link under focus and photographs the revealed link', async () => {
+		await applyTheme(VARIANT)
+		const specimen = readSpecimen(mounted.host, 'Skip link')
+		const link = requireValue(
+			specimen.querySelector<HTMLAnchorElement>('.visually-hidden-focusable'),
+			'The "Skip link" specimen renders no .visually-hidden-focusable',
+		)
+		const resting = link.getBoundingClientRect().width
+		// The focus frame is a page frame, the way the close control's is: the revealed link sits in
+		// the line that holds it, and the declared region is the link itself, so a reader of the
+		// whole document is pointed at it. Focus survives the staging a pointer does not, so the
+		// link is focused where the section renders it.
+		link.focus()
+		expect(link.matches(':focus')).toBe(true)
+		const revealed = link.getBoundingClientRect().width
+		await FRAMES.page('skip-link-focus', link)
+		await stagePane(window.innerWidth, window.innerHeight)
+		const framedFocus = link.matches(':focus')
+		const framed = link.getBoundingClientRect().width
+		await releasePane()
+		link.blur()
+		const rested = link.getBoundingClientRect().width
+		// The frame is held to the state it was shot in, so a shot that found the link unfocused
+		// reddens here instead of being written under a name claiming the reveal.
+		expect(framedFocus).toBe(true)
+		expect(framed).toBe(revealed)
+		expect([resting, rested]).toStrictEqual([1, 1])
+		expect(revealed).toBeGreaterThan(1)
+		ARTIFACT.push(
+			JSON.stringify({ reading: 'skip link', mode: VARIANT, resting, revealed, framed, rested }),
+		)
+		JOURNAL.record('focus', readName(link), String(revealed))
+	})
 })
 
 describe('refusal', () => {
@@ -1698,6 +1734,9 @@
 				TABLE_SPECIMENS,
 				TYPE_SPECIMENS,
 				VALIDATION_SPECIMENS,
+				POSITION_SPECIMENS,
+				SIZING_SPECIMENS,
+				VISIBILITY_SPECIMENS,
 			].flatMap((table) => table.map((specimen) => specimen.name)),
 			SHOWCASE_COPY.region,
 		])
--- a/tests/setup.css
+++ b/tests/setup.css
@@ -11,4 +11,4 @@
 @import 'tailwindcss/theme.css' layer(theme);
 @import 'tailwindcss/utilities.css' layer(utilities) source(none);
 @source '../tmp/tailwind/candidates.txt';
-@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 container table");
+@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 container end-0 end-50 end-100 start-0 start-50 start-100 table");
--- a/tests/fixtures/tailwind/consumer.css
+++ b/tests/fixtures/tailwind/consumer.css
@@ -4,4 +4,4 @@
 @import '@orkestrel/veneer/styles';
 /* Your own markup directory. */
 @source './markup.html';
-@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 container table");
+@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 container end-0 end-50 end-100 start-0 start-50 start-100 table");
--- a/tests/fixtures/tailwind/preflight.css
+++ b/tests/fixtures/tailwind/preflight.css
@@ -3,4 +3,4 @@
 @layer theme, reset, base, elements, components, utilities;
 @import 'tailwindcss' source(none);
 @source '../../../tmp/tailwind/candidates.txt';
-@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 container table");
+@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 container end-0 end-50 end-100 start-0 start-50 start-100 table");
--- a/tests/fixtures/tailwind/markup.html
+++ b/tests/fixtures/tailwind/markup.html
@@ -60,3 +60,31 @@
 	</div>
 	<button type="button" class="btn px-8">Action</button>
 </div>
+<div class="w-25">Width step 25</div>
+<div class="w-50">Width step 50</div>
+<div class="w-75">Width step 75</div>
+<div class="w-100">Width step 100</div>
+<div class="w-auto">Width step auto</div>
+<div class="h-25">Height step 25</div>
+<div class="h-50">Height step 50</div>
+<div class="h-75">Height step 75</div>
+<div class="h-100">Height step 100</div>
+<div class="h-auto">Height step auto</div>
+<div class="top-0">Top offset 0</div>
+<div class="top-50">Top offset 50</div>
+<div class="top-100">Top offset 100</div>
+<div class="bottom-0">Bottom offset 0</div>
+<div class="bottom-50">Bottom offset 50</div>
+<div class="bottom-100">Bottom offset 100</div>
+<div class="start-0">Start offset 0</div>
+<div class="start-50">Start offset 50</div>
+<div class="start-100">Start offset 100</div>
+<div class="end-0">End offset 0</div>
+<div class="end-50">End offset 50</div>
+<div class="end-100">End offset 100</div>
+<div class="z-0">Stacking level 0</div>
+<div class="z-1">Stacking level 1</div>
+<div class="z-2">Stacking level 2</div>
+<div class="z-3">Stacking level 3</div>
+<div class="visible">Visible</div>
+<div class="invisible">Invisible</div>
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -205,90 +205,95 @@
 
 The following files carry the axis.
 
-| File                                        | Role                                                                                                                                                                                                                                               |
-| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
-| `src/styles/elements/_button.scss`          | The bare button and its same-element states in the elements layer.                                                                                                                                                                                 |
-| `src/styles/components/_button.scss`        | The Button class vocabulary and state relationships in the components layer.                                                                                                                                                                       |
-| `src/styles/components/_type.scss`          | The heading, display, lead, small, mark, and initialism classes in the components layer.                                                                                                                                                           |
-| `src/styles/components/_list.scss`          | The unstyled and inline list classes in the components layer.                                                                                                                                                                                      |
-| `src/styles/components/_quote.scss`         | The quotation class, its last-child rule, and its footer in the components layer.                                                                                                                                                                  |
-| `src/styles/components/_link.scss`          | The link color, opacity, offset, and underline classes in the components layer.                                                                                                                                                                    |
-| `src/styles/components/_container.scss`     | The container family, its breakpoint caps, and navigation combinators in the components layer.                                                                                                                                                     |
-| `src/styles/components/_grid.scss`          | The row, column, and offset families and their gutters in the components layer.                                                                                                                                                                    |
-| `src/styles/components/_table.scss`         | The table classes, state layers, caption class, and responsive wrappers in the components layer.                                                                                                                                                   |
-| `src/styles/components/_image.scss`         | The image and figure classes in the components layer.                                                                                                                                                                                              |
-| `src/styles/components/_icon-link.scss`     | The icon link, its icon combinator, and its hover and focus shifts in the components layer.                                                                                                                                                        |
-| `src/styles/components/_breadcrumb.scss`    | The breadcrumb trail, its item inset, its divider, and the current page in the components layer.                                                                                                                                                   |
-| `src/styles/components/_badge.scss`         | The badge box, its empty collapse, and its offset inside a button in the components layer.                                                                                                                                                         |
-| `src/styles/components/_close.scss`         | The close control, its states, and its opt-in inversion in the components layer.                                                                                                                                                                   |
-| `src/styles/components/_progress.scss`      | The progress track, its stacked form, and the bar families in the components layer.                                                                                                                                                                |
-| `src/styles/components/_spinner.scss`       | The border and grow spinners, their small twins, and their keyframes in the components layer.                                                                                                                                                      |
-| `src/styles/components/_placeholder.scss`   | The placeholder, its height floors, its button box, and the glow and wave animations in the components layer.                                                                                                                                      |
-| `src/styles/components/_button-group.scss`  | The button group, its vertical twin, their joining relationships, and the toolbar in the components layer, read by `tests/src/styles/components/button-group.test.ts`.                                                                             |
-| `src/styles/components/_ratio.scss`         | The aspect-ratio box, its pseudo-element, and the named aspects in the components layer.                                                                                                                                                           |
-| `src/styles/components/_vr.scss`            | The vertical rule in the components layer.                                                                                                                                                                                                         |
-| `src/styles/components/_card.scss`          | The card box, its caps and body, the image and overlay placements, the header navigations, and the card group in the components layer.                                                                                                             |
-| `src/styles/components/_list-group.scss`    | The list-group box, its item joins, action states, numbering, flush edges, horizontal ramp, and contextual roles in the components layer.                                                                                                          |
-| `src/styles/components/_form-label.scss`    | The form label, the help text, and the horizontal label at each size in the components layer, read by `tests/src/styles/components/form-label.test.ts`.                                                                                            |
-| `src/styles/components/_form-control.scss`  | The text control, its file button, date parts, placeholder, and states, the plaintext form, the sizes, the textarea heights, and the color control in the components layer.                                                                        |
-| `src/styles/components/_form-check.scss`    | The check, radio, and switch controls, their states, the reverse and inline layouts, and the dark knob in the components layer.                                                                                                                    |
-| `src/styles/components/_form-range.scss`    | The range control, its engine-specific thumb and track rules, and their states in the components layer.                                                                                                                                            |
-| `src/styles/components/_form-select.scss`   | The select, its caret in both modes, its focus, list, disabled, and size forms, and the Gecko focus-ring reset in the components layer.                                                                                                            |
-| `src/styles/components/_form-floating.scss` | The floating container, the floated geometry of its controls, the label and its transforms, the textarea backdrop, and the disabled and plaintext labels in the components layer.                                                                  |
-| `src/styles/components/_input-group.scss`   | The input group row, its addon, sizes, squared corners, overlap, and lifts in the components layer, read by `tests/src/styles/components/input-group.test.ts`.                                                                                     |
-| `src/styles/components/_validation.scss`    | The validation scope, state classes, feedback, and tooltips in the components layer, read by `tests/src/styles/components/validation.test.ts`.                                                                                                     |
-| `src/styles/components/_pagination.scss`    | The pagination strip, its page links, their states, and the size classes in the components layer.                                                                                                                                                  |
-| `src/styles/_reset.scss`                    | The universal box model, hidden state, and motion-aware root scrolling in the reset layer.                                                                                                                                                         |
-| `src/styles/elements/_html.scss`            | The document baseline in the elements layer.                                                                                                                                                                                                       |
-| `src/styles/elements/_body.scss`            | The body baseline in the elements layer.                                                                                                                                                                                                           |
-| `src/styles/elements/_heading.scss`         | The heading family text treatment in the elements layer.                                                                                                                                                                                           |
-| `src/styles/elements/_p.scss`               | The p text treatment in the elements layer.                                                                                                                                                                                                        |
-| `src/styles/elements/_hr.scss`              | The hr text treatment in the elements layer.                                                                                                                                                                                                       |
-| `src/styles/elements/_a.scss`               | The a text treatment in the elements layer.                                                                                                                                                                                                        |
-| `src/styles/elements/_ul.scss`              | The ul text treatment in the elements layer.                                                                                                                                                                                                       |
-| `src/styles/elements/_ol.scss`              | The ol text treatment in the elements layer.                                                                                                                                                                                                       |
-| `src/styles/elements/_dl.scss`              | The dl text treatment in the elements layer.                                                                                                                                                                                                       |
-| `src/styles/elements/_blockquote.scss`      | The blockquote text treatment in the elements layer.                                                                                                                                                                                               |
-| `src/styles/elements/_address.scss`         | The address text treatment in the elements layer.                                                                                                                                                                                                  |
-| `src/styles/elements/_abbr.scss`            | The abbr text treatment in the elements layer.                                                                                                                                                                                                     |
-| `src/styles/elements/_strong.scss`          | The strong text treatment in the elements layer.                                                                                                                                                                                                   |
-| `src/styles/elements/_small.scss`           | The small text treatment in the elements layer.                                                                                                                                                                                                    |
-| `src/styles/elements/_mark.scss`            | The mark text treatment in the elements layer.                                                                                                                                                                                                     |
-| `src/styles/elements/_sub.scss`             | The sub text treatment in the elements layer.                                                                                                                                                                                                      |
-| `src/styles/elements/_sup.scss`             | The sup text treatment in the elements layer.                                                                                                                                                                                                      |
-| `src/styles/elements/_code.scss`            | The code text treatment in the elements layer.                                                                                                                                                                                                     |
-| `src/styles/elements/_pre.scss`             | The pre text treatment in the elements layer.                                                                                                                                                                                                      |
-| `src/styles/elements/_kbd.scss`             | The kbd text treatment in the elements layer.                                                                                                                                                                                                      |
-| `src/styles/elements/_samp.scss`            | The samp text treatment in the elements layer.                                                                                                                                                                                                     |
-| `src/styles/elements/_var.scss`             | The var text treatment in the elements layer.                                                                                                                                                                                                      |
-| `src/styles/elements/_b.scss`               | The b family and its mandated pairs in the elements layer.                                                                                                                                                                                         |
-| `src/styles/elements/_figure.scss`          | The figure family and its mandated pairs in the elements layer.                                                                                                                                                                                    |
-| `src/styles/elements/_img.scss`             | The img family and its mandated pairs in the elements layer.                                                                                                                                                                                       |
-| `src/styles/elements/_svg.scss`             | The svg family and its mandated pairs in the elements layer.                                                                                                                                                                                       |
-| `src/styles/elements/_table.scss`           | The table family and its mandated pairs in the elements layer.                                                                                                                                                                                     |
-| `src/styles/elements/_tr.scss`              | The tr family and its mandated pairs in the elements layer.                                                                                                                                                                                        |
-| `src/styles/elements/_label.scss`           | The label family and its mandated pairs in the elements layer.                                                                                                                                                                                     |
-| `src/styles/elements/_input.scss`           | The input family and its mandated pairs in the elements layer.                                                                                                                                                                                     |
-| `src/styles/elements/_select.scss`          | The select family and its mandated pairs in the elements layer.                                                                                                                                                                                    |
-| `src/styles/elements/_optgroup.scss`        | The optgroup family and its mandated pairs in the elements layer.                                                                                                                                                                                  |
-| `src/styles/elements/_textarea.scss`        | The textarea family and its mandated pairs in the elements layer.                                                                                                                                                                                  |
-| `src/styles/elements/_fieldset.scss`        | The fieldset family and its mandated pairs in the elements layer.                                                                                                                                                                                  |
-| `src/styles/elements/_output.scss`          | The output family and its mandated pairs in the elements layer.                                                                                                                                                                                    |
-| `src/styles/elements/_iframe.scss`          | The iframe family and its mandated pairs in the elements layer.                                                                                                                                                                                    |
-| `src/styles/elements/_details.scss`         | The details family and its mandated pairs in the elements layer.                                                                                                                                                                                   |
-| `src/styles/elements/_progress.scss`        | The progress family and its mandated pairs in the elements layer.                                                                                                                                                                                  |
-| `src/styles/utilities/_gap.scss`            | The gutter and gap step utilities in the utilities layer.                                                                                                                                                                                          |
-| `src/styles/index.scss`                     | The compilation barrel.                                                                                                                                                                                                                            |
-| `src/styles/index.ts`                       | The side-effect entry, and the build's library entry.                                                                                                                                                                                              |
-| `configs/src/vite.styles.config.ts`         | The build and test wrapper, composed from the root's `srcBrowser` factory.                                                                                                                                                                         |
-| `configs/src/tsconfig.styles.json`          | The check-only TypeScript project.                                                                                                                                                                                                                 |
-| `tests/setupStyles.ts`                      | The cascade readers, the normalizer, the guide table and fence readers, the case tables, and the retained value lists.                                                                                                                             |
-| `tests/setupServer.ts`                      | The Node-only readers: the installed and built cascades and the guide, the compiled-stylesheet reader, the shared-name readings, the guide's compatibility, deferral, and ledger rows, the cascade comparisons, and the elements-layer tag reader. |
-| `tests/setupService.ts`                     | The service setup: the readiness that verifies the compiler, the built cascade, the pinned Chromium, and the candidate list; the paths of the Tailwind profiles and fixtures; the profile compiler; and the stage that reads what a page resolves. |
-| `tests/src/styles/`                         | The browser proofs of the shipped cascade.                                                                                                                                                                                                         |
-| `tests/setup.css`                           | The `tailwind` profile the service proofs compile, and the home of the exclusion line.                                                                                                                                                             |
-| `tests/fixtures/tailwind/`                  | The `preflight` profile, the unexcluded instrument, the executed consumer profile, and the markup that profile scans.                                                                                                                              |
-| `tests/service/tailwind/`                   | The Node proofs of the Tailwind profiles, the consumer pairing, and the preflight pairing, run in the `service` project.                                                                                                                           |
+| File                                         | Role                                                                                                                                                                                                                                               |
+| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
+| `src/styles/elements/_button.scss`           | The bare button and its same-element states in the elements layer.                                                                                                                                                                                 |
+| `src/styles/components/_button.scss`         | The Button class vocabulary and state relationships in the components layer.                                                                                                                                                                       |
+| `src/styles/components/_type.scss`           | The heading, display, lead, small, mark, and initialism classes in the components layer.                                                                                                                                                           |
+| `src/styles/components/_list.scss`           | The unstyled and inline list classes in the components layer.                                                                                                                                                                                      |
+| `src/styles/components/_quote.scss`          | The quotation class, its last-child rule, and its footer in the components layer.                                                                                                                                                                  |
+| `src/styles/components/_link.scss`           | The link color, opacity, offset, and underline classes in the components layer.                                                                                                                                                                    |
+| `src/styles/components/_container.scss`      | The container family, its breakpoint caps, and navigation combinators in the components layer.                                                                                                                                                     |
+| `src/styles/components/_grid.scss`           | The row, column, and offset families and their gutters in the components layer.                                                                                                                                                                    |
+| `src/styles/components/_table.scss`          | The table classes, state layers, caption class, and responsive wrappers in the components layer.                                                                                                                                                   |
+| `src/styles/components/_image.scss`          | The image and figure classes in the components layer.                                                                                                                                                                                              |
+| `src/styles/components/_icon-link.scss`      | The icon link, its icon combinator, and its hover and focus shifts in the components layer.                                                                                                                                                        |
+| `src/styles/components/_breadcrumb.scss`     | The breadcrumb trail, its item inset, its divider, and the current page in the components layer.                                                                                                                                                   |
+| `src/styles/components/_badge.scss`          | The badge box, its empty collapse, and its offset inside a button in the components layer.                                                                                                                                                         |
+| `src/styles/components/_close.scss`          | The close control, its states, and its opt-in inversion in the components layer.                                                                                                                                                                   |
+| `src/styles/components/_progress.scss`       | The progress track, its stacked form, and the bar families in the components layer.                                                                                                                                                                |
+| `src/styles/components/_spinner.scss`        | The border and grow spinners, their small twins, and their keyframes in the components layer.                                                                                                                                                      |
+| `src/styles/components/_placeholder.scss`    | The placeholder, its height floors, its button box, and the glow and wave animations in the components layer.                                                                                                                                      |
+| `src/styles/components/_button-group.scss`   | The button group, its vertical twin, their joining relationships, and the toolbar in the components layer, read by `tests/src/styles/components/button-group.test.ts`.                                                                             |
+| `src/styles/components/_ratio.scss`          | The aspect-ratio box, its pseudo-element, and the named aspects in the components layer.                                                                                                                                                           |
+| `src/styles/components/_position.scss`       | The fixed and sticky helpers in the components layer.                                                                                                                                                                                              |
+| `src/styles/components/_vr.scss`             | The vertical rule in the components layer.                                                                                                                                                                                                         |
+| `src/styles/components/_card.scss`           | The card box, its caps and body, the image and overlay placements, the header navigations, and the card group in the components layer.                                                                                                             |
+| `src/styles/components/_list-group.scss`     | The list-group box, its item joins, action states, numbering, flush edges, horizontal ramp, and contextual roles in the components layer.                                                                                                          |
+| `src/styles/components/_form-label.scss`     | The form label, the help text, and the horizontal label at each size in the components layer, read by `tests/src/styles/components/form-label.test.ts`.                                                                                            |
+| `src/styles/components/_form-control.scss`   | The text control, its file button, date parts, placeholder, and states, the plaintext form, the sizes, the textarea heights, and the color control in the components layer.                                                                        |
+| `src/styles/components/_form-check.scss`     | The check, radio, and switch controls, their states, the reverse and inline layouts, and the dark knob in the components layer.                                                                                                                    |
+| `src/styles/components/_form-range.scss`     | The range control, its engine-specific thumb and track rules, and their states in the components layer.                                                                                                                                            |
+| `src/styles/components/_form-select.scss`    | The select, its caret in both modes, its focus, list, disabled, and size forms, and the Gecko focus-ring reset in the components layer.                                                                                                            |
+| `src/styles/components/_form-floating.scss`  | The floating container, the floated geometry of its controls, the label and its transforms, the textarea backdrop, and the disabled and plaintext labels in the components layer.                                                                  |
+| `src/styles/components/_input-group.scss`    | The input group row, its addon, sizes, squared corners, overlap, and lifts in the components layer, read by `tests/src/styles/components/input-group.test.ts`.                                                                                     |
+| `src/styles/components/_validation.scss`     | The validation scope, state classes, feedback, and tooltips in the components layer, read by `tests/src/styles/components/validation.test.ts`.                                                                                                     |
+| `src/styles/components/_pagination.scss`     | The pagination strip, its page links, their states, and the size classes in the components layer.                                                                                                                                                  |
+| `src/styles/_reset.scss`                     | The universal box model, hidden state, and motion-aware root scrolling in the reset layer.                                                                                                                                                         |
+| `src/styles/elements/_html.scss`             | The document baseline in the elements layer.                                                                                                                                                                                                       |
+| `src/styles/elements/_body.scss`             | The body baseline in the elements layer.                                                                                                                                                                                                           |
+| `src/styles/elements/_heading.scss`          | The heading family text treatment in the elements layer.                                                                                                                                                                                           |
+| `src/styles/elements/_p.scss`                | The p text treatment in the elements layer.                                                                                                                                                                                                        |
+| `src/styles/elements/_hr.scss`               | The hr text treatment in the elements layer.                                                                                                                                                                                                       |
+| `src/styles/elements/_a.scss`                | The a text treatment in the elements layer.                                                                                                                                                                                                        |
+| `src/styles/elements/_ul.scss`               | The ul text treatment in the elements layer.                                                                                                                                                                                                       |
+| `src/styles/elements/_ol.scss`               | The ol text treatment in the elements layer.                                                                                                                                                                                                       |
+| `src/styles/elements/_dl.scss`               | The dl text treatment in the elements layer.                                                                                                                                                                                                       |
+| `src/styles/elements/_blockquote.scss`       | The blockquote text treatment in the elements layer.                                                                                                                                                                                               |
+| `src/styles/elements/_address.scss`          | The address text treatment in the elements layer.                                                                                                                                                                                                  |
+| `src/styles/elements/_abbr.scss`             | The abbr text treatment in the elements layer.                                                                                                                                                                                                     |
+| `src/styles/elements/_strong.scss`           | The strong text treatment in the elements layer.                                                                                                                                                                                                   |
+| `src/styles/elements/_small.scss`            | The small text treatment in the elements layer.                                                                                                                                                                                                    |
+| `src/styles/elements/_mark.scss`             | The mark text treatment in the elements layer.                                                                                                                                                                                                     |
+| `src/styles/elements/_sub.scss`              | The sub text treatment in the elements layer.                                                                                                                                                                                                      |
+| `src/styles/elements/_sup.scss`              | The sup text treatment in the elements layer.                                                                                                                                                                                                      |
+| `src/styles/elements/_code.scss`             | The code text treatment in the elements layer.                                                                                                                                                                                                     |
+| `src/styles/elements/_pre.scss`              | The pre text treatment in the elements layer.                                                                                                                                                                                                      |
+| `src/styles/elements/_kbd.scss`              | The kbd text treatment in the elements layer.                                                                                                                                                                                                      |
+| `src/styles/elements/_samp.scss`             | The samp text treatment in the elements layer.                                                                                                                                                                                                     |
+| `src/styles/elements/_var.scss`              | The var text treatment in the elements layer.                                                                                                                                                                                                      |
+| `src/styles/elements/_b.scss`                | The b family and its mandated pairs in the elements layer.                                                                                                                                                                                         |
+| `src/styles/elements/_figure.scss`           | The figure family and its mandated pairs in the elements layer.                                                                                                                                                                                    |
+| `src/styles/elements/_img.scss`              | The img family and its mandated pairs in the elements layer.                                                                                                                                                                                       |
+| `src/styles/elements/_svg.scss`              | The svg family and its mandated pairs in the elements layer.                                                                                                                                                                                       |
+| `src/styles/elements/_table.scss`            | The table family and its mandated pairs in the elements layer.                                                                                                                                                                                     |
+| `src/styles/elements/_tr.scss`               | The tr family and its mandated pairs in the elements layer.                                                                                                                                                                                        |
+| `src/styles/elements/_label.scss`            | The label family and its mandated pairs in the elements layer.                                                                                                                                                                                     |
+| `src/styles/elements/_input.scss`            | The input family and its mandated pairs in the elements layer.                                                                                                                                                                                     |
+| `src/styles/elements/_select.scss`           | The select family and its mandated pairs in the elements layer.                                                                                                                                                                                    |
+| `src/styles/elements/_optgroup.scss`         | The optgroup family and its mandated pairs in the elements layer.                                                                                                                                                                                  |
+| `src/styles/elements/_textarea.scss`         | The textarea family and its mandated pairs in the elements layer.                                                                                                                                                                                  |
+| `src/styles/elements/_fieldset.scss`         | The fieldset family and its mandated pairs in the elements layer.                                                                                                                                                                                  |
+| `src/styles/elements/_output.scss`           | The output family and its mandated pairs in the elements layer.                                                                                                                                                                                    |
+| `src/styles/elements/_iframe.scss`           | The iframe family and its mandated pairs in the elements layer.                                                                                                                                                                                    |
+| `src/styles/elements/_details.scss`          | The details family and its mandated pairs in the elements layer.                                                                                                                                                                                   |
+| `src/styles/elements/_progress.scss`         | The progress family and its mandated pairs in the elements layer.                                                                                                                                                                                  |
+| `src/styles/utilities/_visually-hidden.scss` | The visually hidden helper and its focusable form in the utilities layer, ahead of every utility partial.                                                                                                                                          |
+| `src/styles/utilities/_position.scss`        | The position, offset, translation, and stacking utilities in the utilities layer.                                                                                                                                                                  |
+| `src/styles/utilities/_sizing.scss`          | The width, height, maximum-size, and viewport-size utilities in the utilities layer.                                                                                                                                                               |
+| `src/styles/utilities/_gap.scss`             | The gutter and gap step utilities in the utilities layer.                                                                                                                                                                                          |
+| `src/styles/utilities/_visibility.scss`      | The visible and invisible utilities in the utilities layer.                                                                                                                                                                                        |
+| `src/styles/index.scss`                      | The compilation barrel.                                                                                                                                                                                                                            |
+| `src/styles/index.ts`                        | The side-effect entry, and the build's library entry.                                                                                                                                                                                              |
+| `configs/src/vite.styles.config.ts`          | The build and test wrapper, composed from the root's `srcBrowser` factory.                                                                                                                                                                         |
+| `configs/src/tsconfig.styles.json`           | The check-only TypeScript project.                                                                                                                                                                                                                 |
+| `tests/setupStyles.ts`                       | The cascade readers, the normalizer, the guide table and fence readers, the case tables, and the retained value lists.                                                                                                                             |
+| `tests/setupServer.ts`                       | The Node-only readers: the installed and built cascades and the guide, the compiled-stylesheet reader, the shared-name readings, the guide's compatibility, deferral, and ledger rows, the cascade comparisons, and the elements-layer tag reader. |
+| `tests/setupService.ts`                      | The service setup: the readiness that verifies the compiler, the built cascade, the pinned Chromium, and the candidate list; the paths of the Tailwind profiles and fixtures; the profile compiler; and the stage that reads what a page resolves. |
+| `tests/src/styles/`                          | The browser proofs of the shipped cascade.                                                                                                                                                                                                         |
+| `tests/setup.css`                            | The `tailwind` profile the service proofs compile, and the home of the exclusion line.                                                                                                                                                             |
+| `tests/fixtures/tailwind/`                   | The `preflight` profile, the unexcluded instrument, the executed consumer profile, and the markup that profile scans.                                                                                                                              |
+| `tests/service/tailwind/`                    | The Node proofs of the Tailwind profiles, the consumer pairing, and the preflight pairing, run in the `service` project.                                                                                                                           |
 
 The barrel's `@use` rules name the `_tokens.scss` and `_theme.scss` partials and the element
 partials under the `elements/`, `components/`, and `utilities/` directories; the `_mixins.scss` partial reaches the build through the
@@ -379,7 +384,7 @@
 @import '@orkestrel/veneer/styles';
 /* Your own markup directory. */
 @source './src';
-@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 container table");
+@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 container end-0 end-50 end-100 start-0 start-50 start-100 table");
 ```
 
 The following recipe is the `preflight` profile, which takes the bare import so Tailwind's own reset
@@ -392,7 +397,7 @@
 @import '@orkestrel/veneer/styles';
 /* Your own markup directory. */
 @source './src';
-@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 container table");
+@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 container end-0 end-50 end-100 start-0 start-50 start-100 table");
 ```
 
 The workspace compiles the `tailwind` recipe as written. The `tests/fixtures/tailwind/consumer.css`
@@ -443,10 +448,17 @@
 runs over the shared names that rule lets leave the line. The gap steps `gap-0` to `gap-5` are
 shipped names off the line: Tailwind's rule for each declares the `gap` shorthand, which Chromium
 expands to the `row-gap` and `column-gap` longhands, and Veneer declares the same shorthand with
-`!important`. The proof asserts that the `gap-3` name is in the branch and reads what the rule
-claims: with the exclusion line dropped and Tailwind's own rule on the page, every element carrying
-a name in the branch resolves, for every property that rule declares, what it resolves under the
-cascade alone. A planted rule drives the partial-importance case: it declares `!important` on the
+`!important`. The width and height steps, the `top-*` and `bottom-*` offsets, the `z-0` to `z-3`
+levels, and the `visible` and `invisible` classes are shipped names off the line too: Tailwind's
+rule for each declares the one longhand Veneer declares with `!important`. The `start-*` and `end-*`
+offsets stay on the line: Tailwind's rule for each declares the logical `inset-inline-start` or
+`inset-inline-end` longhand, and Veneer's important declaration is on the physical `left` or `right`
+longhand, which does not cover it. The proof asserts that the `gap-3` name is in the branch and
+reads what the rule claims: with the exclusion line dropped and Tailwind's own rule on the page,
+every element carrying a name in the branch resolves, for every property that rule declares, what it
+resolves under the cascade alone. Each element is read on the longhands its own name's rule
+declares, because the gap rows sit inside the `.container` element, whose width moves when the line
+is dropped. A planted rule drives the partial-importance case: it declares `!important` on the
 `grid-column-start` longhand alone, leaving the `grid-column-end` longhand that Tailwind's `col-1`
 rule also declares normal, and the equality still holds with the `col-1` class on the line.
 
@@ -1768,6 +1780,117 @@
   beside `column-gap`; Veneer emits the standard property alone, because the managed Chromium and
   Edge receipts this cascade is proved on resolve it and leave the alias redundant.
 
+### Position utilities
+
+The position keys ship whole in the utilities layer: the position values, the top, bottom, start,
+and end offsets at the `0`, `50`, and `100` steps, the centered translation on both axes and on each
+one, and the stacking levels `.z-n1` to `.z-3`. The fixed and sticky helpers ship beside them in the
+components layer.
+
+The `src/styles/utilities/_position.scss` partial writes every entry through the `utility` mixin
+that § Styles describes, so each declaration carries the `!important` the release writes, and no
+position key writes a breakpoint infix. The partial writes the entries and their values in the
+release's map order, so where an element carries two values of one entry, the later value wins:
+`.position-absolute.position-relative` resolves `absolute`, and
+`.translate-middle.translate-middle-x` resolves the horizontal translation alone. The release writes
+the `z-index` entry last in its map, and the partial writes it beside the position entries; no other
+utility sets that property, so the placement moves no resolution.
+
+An offset step is a share of the containing block: `.top-50` places a box half its containing
+block's height from the top, and `.start-50` half its width from the start. The `.start-*` and
+`.end-*` classes set the physical `left` and `right` properties, as the release's own stylesheet
+does, so a right-to-left scope leaves `.start-0` on the left edge. The offsets, the translations,
+and the stacking levels stay literal, because no published Veneer token carries them, and none of
+them reads the density factor.
+
+The `.fixed-top` and `.fixed-bottom` helpers pin a box across its containing block at one edge. The
+`.sticky-top` and `.sticky-bottom` helpers stick a box to one edge of its scroll container, each
+from its breakpoint infix up: `.sticky-md-top` sticks from a 768px viewport and stays in the flow
+below it. The `src/styles/components/_position.scss` partial writes the helpers in the components
+layer with normal declarations, as the release writes them, so a position utility or a rule of your
+own overrides them. The fixed helpers read the `--vn-stack-fixed` level and the sticky helpers read
+the `--vn-stack-sticky` level, so a retuned level moves the helpers beside the overlays that read
+the same ladder.
+
+The `tests/src/styles/utilities/position.test.ts` proof reads every position value, each offset
+against a containing block of definite size, the physical edges in a right-to-left scope, the
+translation on each axis, the stacking order where boxes overlap, the density factor, a dark island,
+the order inside an entry, the priority over a later unlayered rule, and the escape inside the
+utilities layer. The `tests/src/styles/components/position.test.ts` proof reads the fixed helpers
+against the viewport, both stacking levels and their retune, each sticky helper inside a real scroll
+container at its boundary and one pixel below it, and the helpers yielding to a later rule and to a
+position utility.
+
+These are the keys' recorded departures.
+
+- **The helpers read Veneer's stacking ladder.** The release writes `1030` for the fixed helpers and
+  `1020` for the sticky helpers; Veneer writes `var(--vn-stack-fixed)` and `var(--vn-stack-sticky)`,
+  which resolve to the same levels.
+- **The prefixed sticky value is absent.** The official cascade writes `position: -webkit-sticky`
+  ahead of `position: sticky` on the `.position-sticky` class and on every sticky helper; Veneer
+  writes the standard value alone, because the managed Chromium and Edge receipts this cascade is
+  proved on resolve it and leave the prefixed value redundant.
+
+### Sizing utilities
+
+The sizing keys ship whole in the utilities layer: the width and height steps `25`, `50`, `75`,
+`100`, and `auto`, the maximum sizes `.mw-100` and `.mh-100`, the viewport sizes `.vw-100` and
+`.vh-100`, and the viewport floors `.min-vw-100` and `.min-vh-100`, which the `min` key carries.
+
+A step is a share of the containing block, so `.w-50` resolves half its container's width, and a
+height step resolves only inside a container of definite height. The `auto` step sizes a box by its
+content over a size of the element's own. A maximum size caps a box at its container. A viewport
+size and a viewport floor read the viewport rather than the container, so `.vw-100` is as wide as
+the viewport wherever it sits. Every value stays literal, because no published Veneer token carries
+a share or a viewport size, and none of them reads the density factor.
+
+The `src/styles/utilities/_sizing.scss` partial writes every entry through the `utility` mixin in
+the release's map order: the width, maximum-width, viewport-width, and viewport-floor entries, then
+the same entries for the height. So a viewport size wins over a step on the same property:
+`.w-25.vw-100` resolves the viewport's width. No sizing key writes a breakpoint infix.
+
+The `tests/src/styles/utilities/sizing.test.ts` proof reads every step against a container of
+definite size, the `auto` step over a size of the element's own, both caps, each viewport size and
+floor at the 390 and 1280 viewports, the density factor, a dark island, the order between entries,
+the priority over a later unlayered rule, and the escape inside the utilities layer. The sizing keys
+carry no recorded departure.
+
+### Visibility utilities
+
+The visibility keys ship whole in the utilities layer: the `.visible` and `.invisible` classes, and
+the visually hidden helper with its focusable form.
+
+The `.invisible` class hides a box while the box keeps its room in the layout, and the `.visible`
+class shows a box, one inside an invisible ancestor included. The release's entry carries no class,
+so each value's key is the whole class name; the `src/styles/utilities/_visibility.scss` partial
+writes the entry through the `utility` mixin with an empty class, and no visibility class writes a
+breakpoint infix.
+
+The `.visually-hidden` helper clips a box to one pixel and keeps its text in the accessible name, so
+a screen reader announces text a sighted reader does not see. The `.visually-hidden-focusable`
+helper does the same until the element or one of its descendants holds focus, which is how a skip
+link appears when the keyboard reaches it. A caption keeps its table position rather than turning
+absolute, and a child of a hidden box keeps its overflow hidden.
+
+The release writes the helper with `!important` on every declaration, so the
+`src/styles/utilities/_visually-hidden.scss` partial places it in the utilities layer ahead of every
+utility partial. The helper is not a utility entry and each of its declarations carries its own
+value, so the partial writes the declarations itself rather than through the `utility` mixin. The
+cascade reverses layer order for important declarations, so in the components layer the helper would
+beat every utility. At the head of the utilities layer, a utility the release lets win still wins:
+`.visually-hidden.w-100` resolves its container's width. The helper's own `:not(caption)` rule is
+more specific than a position utility, so `.visually-hidden.position-relative` stays absolute, as it
+does in the release.
+
+The `tests/src/styles/utilities/visibility.test.ts` proof reads the room an invisible box keeps
+beside a visible twin, a visible box inside an invisible ancestor, the later value where an element
+carries both, a dark island, the priority over a later unlayered rule, and the escape inside the
+utilities layer. The `tests/src/styles/utilities/visually-hidden.test.ts` proof reads the clipped
+box and the accessible name, the caption, the reveal under keyboard focus and under a descendant's
+focus, the helper's place ahead of the utilities, the priority over a later unlayered rule whether
+or not that rule is important, the escape inside the utilities layer, and a dark island. The
+visibility keys carry no recorded departure.
+
 ### Deferred selectors
 
 Each row names an official selector or custom property withheld from the built cascade, its reason,
@@ -2798,6 +2921,13 @@
 | --------- | ------------- | --------------- | --------- | --------------- | ------------------- | --------- |
 | `figure`  | `.figure-img` | `margin-bottom` | —         | `0.5rem`        | `var(--vn-space-4)` | tokenized |
 
+#### `fixed`
+
+| Component | Selector        | Property  | Condition | Bootstrap 5.3.8 | Veneer                  | Departure |
+| --------- | --------------- | --------- | --------- | --------------- | ----------------------- | --------- |
+| `fixed`   | `.fixed-top`    | `z-index` | —         | `1030`          | `var(--vn-stack-fixed)` | tokenized |
+| `fixed`   | `.fixed-bottom` | `z-index` | —         | `1030`          | `var(--vn-stack-fixed)` | tokenized |
+
 #### `g`
 
 | Component | Selector   | Property        | Condition                  | Bootstrap 5.3.8 | Veneer            | Departure |
@@ -3352,6 +3482,35 @@
 | `row-gap` | `.row-gap-xxl-4` | `row-gap` | `@media (width >= 1400px)` | `1.5rem`        | `var(--vn-gap-4)` | tokenized |
 | `row-gap` | `.row-gap-xxl-5` | `row-gap` | `@media (width >= 1400px)` | `3rem`          | `var(--vn-gap-5)` | tokenized |
 
+#### `sticky`
+
+| Component | Selector             | Property   | Condition                  | Bootstrap 5.3.8  | Veneer                   | Departure |
+| --------- | -------------------- | ---------- | -------------------------- | ---------------- | ------------------------ | --------- |
+| `sticky`  | `.sticky-top`        | `position` | —                          | `-webkit-sticky` | `sticky`                 | declared  |
+| `sticky`  | `.sticky-top`        | `z-index`  | —                          | `1020`           | `var(--vn-stack-sticky)` | tokenized |
+| `sticky`  | `.sticky-bottom`     | `position` | —                          | `-webkit-sticky` | `sticky`                 | declared  |
+| `sticky`  | `.sticky-bottom`     | `z-index`  | —                          | `1020`           | `var(--vn-stack-sticky)` | tokenized |
+| `sticky`  | `.sticky-sm-top`     | `position` | `@media (width >= 576px)`  | `-webkit-sticky` | `sticky`                 | declared  |
+| `sticky`  | `.sticky-sm-top`     | `z-index`  | `@media (width >= 576px)`  | `1020`           | `var(--vn-stack-sticky)` | tokenized |
+| `sticky`  | `.sticky-sm-bottom`  | `position` | `@media (width >= 576px)`  | `-webkit-sticky` | `sticky`                 | declared  |
+| `sticky`  | `.sticky-sm-bottom`  | `z-index`  | `@media (width >= 576px)`  | `1020`           | `var(--vn-stack-sticky)` | tokenized |
+| `sticky`  | `.sticky-md-top`     | `position` | `@media (width >= 768px)`  | `-webkit-sticky` | `sticky`                 | declared  |
+| `sticky`  | `.sticky-md-top`     | `z-index`  | `@media (width >= 768px)`  | `1020`           | `var(--vn-stack-sticky)` | tokenized |
+| `sticky`  | `.sticky-md-bottom`  | `position` | `@media (width >= 768px)`  | `-webkit-sticky` | `sticky`                 | declared  |
+| `sticky`  | `.sticky-md-bottom`  | `z-index`  | `@media (width >= 768px)`  | `1020`           | `var(--vn-stack-sticky)` | tokenized |
+| `sticky`  | `.sticky-lg-top`     | `position` | `@media (width >= 992px)`  | `-webkit-sticky` | `sticky`                 | declared  |
+| `sticky`  | `.sticky-lg-top`     | `z-index`  | `@media (width >= 992px)`  | `1020`           | `var(--vn-stack-sticky)` | tokenized |
+| `sticky`  | `.sticky-lg-bottom`  | `position` | `@media (width >= 992px)`  | `-webkit-sticky` | `sticky`                 | declared  |
+| `sticky`  | `.sticky-lg-bottom`  | `z-index`  | `@media (width >= 992px)`  | `1020`           | `var(--vn-stack-sticky)` | tokenized |
+| `sticky`  | `.sticky-xl-top`     | `position` | `@media (width >= 1200px)` | `-webkit-sticky` | `sticky`                 | declared  |
+| `sticky`  | `.sticky-xl-top`     | `z-index`  | `@media (width >= 1200px)` | `1020`           | `var(--vn-stack-sticky)` | tokenized |
+| `sticky`  | `.sticky-xl-bottom`  | `position` | `@media (width >= 1200px)` | `-webkit-sticky` | `sticky`                 | declared  |
+| `sticky`  | `.sticky-xl-bottom`  | `z-index`  | `@media (width >= 1200px)` | `1020`           | `var(--vn-stack-sticky)` | tokenized |
+| `sticky`  | `.sticky-xxl-top`    | `position` | `@media (width >= 1400px)` | `-webkit-sticky` | `sticky`                 | declared  |
+| `sticky`  | `.sticky-xxl-top`    | `z-index`  | `@media (width >= 1400px)` | `1020`           | `var(--vn-stack-sticky)` | tokenized |
+| `sticky`  | `.sticky-xxl-bottom` | `position` | `@media (width >= 1400px)` | `-webkit-sticky` | `sticky`                 | declared  |
+| `sticky`  | `.sticky-xxl-bottom` | `z-index`  | `@media (width >= 1400px)` | `1020`           | `var(--vn-stack-sticky)` | tokenized |
+
 #### `table`
 
 | Component | Selector           | Property                   | Condition | Bootstrap 5.3.8                            | Veneer                                                                                   | Departure |
@@ -3754,6 +3913,12 @@
 | `placeholder` | `.placeholder-wave` | `mask-image`         | —         | `linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%)` | `linear-gradient(130deg, var(--vn-palette-black-base) 55%, rgba(var(--vn-palette-black-rgb), 0.8) 75%, var(--vn-palette-black-base) 95%)` | tokenized |
 | `placeholder` | `.placeholder-wave` | `-webkit-mask-size`  | —         | `200% 100%`                                                           | —                                                                                                                                         | dropped   |
 
+#### `position`
+
+| Component  | Selector           | Property   | Condition | Bootstrap 5.3.8  | Veneer   | Departure |
+| ---------- | ------------------ | ---------- | --------- | ---------------- | -------- | --------- |
+| `position` | `.position-sticky` | `position` | —         | `-webkit-sticky` | `sticky` | declared  |
+
 #### `icon-link`
 
 | Component   | Selector           | Property                        | Condition | Bootstrap 5.3.8                                               | Veneer                                                        | Departure |
@@ -4135,6 +4300,25 @@
 | is-invalid       | variable       | The `--bs-form-select-bg-icon` property carries the invalid mark on a single-value select; its value and the icon map behind it are proved in `tests/src/styles/components/validation.test.ts`.                                                                                                                                                                                                                                                                  | —                     | shipped  |
 | pagination       | selector       | Every official `.pagination`, `.page-link`, and `.page-item` selector ships in the components layer; resolved geometry, states, and stacking are proved in `tests/src/styles/components/pagination.test.ts`.                                                                                                                                                                                                                                                     | —                     | shipped  |
 | pagination       | variable       | Every official `--bs-pagination-*` property is declared, and each size class redeclares its padding, font, and radius; overrides are proved in `tests/src/styles/components/pagination.test.ts`.                                                                                                                                                                                                                                                                 | —                     | shipped  |
+| w                | selector       | Every official `.w-*` selector ships in the utilities layer; widths resolved against a definite container are proved in `tests/src/styles/utilities/sizing.test.ts`.                                                                                                                                                                                                                                                                                             | —                     | shipped  |
+| mw               | selector       | The official `.mw-100` selector ships in the utilities layer; the cap against its container is proved in `tests/src/styles/utilities/sizing.test.ts`.                                                                                                                                                                                                                                                                                                            | —                     | shipped  |
+| vw               | selector       | The official `.vw-100` selector ships in the utilities layer; the width read against the viewport is proved in `tests/src/styles/utilities/sizing.test.ts`.                                                                                                                                                                                                                                                                                                      | —                     | shipped  |
+| min              | selector       | The official `.min-vw-100` and `.min-vh-100` selectors ship in the utilities layer; the floors read against the viewport are proved in `tests/src/styles/utilities/sizing.test.ts`.                                                                                                                                                                                                                                                                              | —                     | shipped  |
+| h                | selector       | Every official `.h-*` selector ships in the utilities layer; heights resolved against a definite container are proved in `tests/src/styles/utilities/sizing.test.ts`.                                                                                                                                                                                                                                                                                            | —                     | shipped  |
+| mh               | selector       | The official `.mh-100` selector ships in the utilities layer; the cap against its container is proved in `tests/src/styles/utilities/sizing.test.ts`.                                                                                                                                                                                                                                                                                                            | —                     | shipped  |
+| vh               | selector       | The official `.vh-100` selector ships in the utilities layer; the height read against the viewport is proved in `tests/src/styles/utilities/sizing.test.ts`.                                                                                                                                                                                                                                                                                                     | —                     | shipped  |
+| position         | selector       | Every official `.position-*` selector ships in the utilities layer; each resolved scheme is proved in `tests/src/styles/utilities/position.test.ts`.                                                                                                                                                                                                                                                                                                             | —                     | shipped  |
+| top              | selector       | Every official `.top-*` selector ships in the utilities layer; offsets resolved against the containing block are proved in `tests/src/styles/utilities/position.test.ts`.                                                                                                                                                                                                                                                                                        | —                     | shipped  |
+| bottom           | selector       | Every official `.bottom-*` selector ships in the utilities layer; offsets resolved against the containing block are proved in `tests/src/styles/utilities/position.test.ts`.                                                                                                                                                                                                                                                                                     | —                     | shipped  |
+| start            | selector       | Every official `.start-*` selector ships in the utilities layer on the physical left edge; resolved offsets are proved in `tests/src/styles/utilities/position.test.ts`.                                                                                                                                                                                                                                                                                         | —                     | shipped  |
+| end              | selector       | Every official `.end-*` selector ships in the utilities layer on the physical right edge; resolved offsets are proved in `tests/src/styles/utilities/position.test.ts`.                                                                                                                                                                                                                                                                                          | —                     | shipped  |
+| translate-middle | selector       | Every official `.translate-middle` selector ships in the utilities layer; the centering on each axis is proved in `tests/src/styles/utilities/position.test.ts`.                                                                                                                                                                                                                                                                                                 | —                     | shipped  |
+| z                | selector       | Every official `.z-*` selector ships in the utilities layer; the stacking order of each level is proved in `tests/src/styles/utilities/position.test.ts`.                                                                                                                                                                                                                                                                                                        | —                     | shipped  |
+| fixed            | selector       | The official `.fixed-top` and `.fixed-bottom` helpers ship in the components layer, reading `--vn-stack-fixed`; their placement and level are proved in `tests/src/styles/components/position.test.ts`.                                                                                                                                                                                                                                                          | —                     | shipped  |
+| sticky           | selector       | Every official `.sticky-*` helper ships at every breakpoint infix in the components layer, reading `--vn-stack-sticky`; the sticking at each boundary is proved in `tests/src/styles/components/position.test.ts`.                                                                                                                                                                                                                                               | —                     | shipped  |
+| visually-hidden  | selector       | The official `.visually-hidden` helper and its focusable form ship in the utilities layer ahead of every utility partial; the hidden box and the focus reveal are proved in `tests/src/styles/utilities/visually-hidden.test.ts`.                                                                                                                                                                                                                                | —                     | shipped  |
+| visible          | selector       | The official `.visible` selector ships in the utilities layer; the resolved visibility is proved in `tests/src/styles/utilities/visibility.test.ts`.                                                                                                                                                                                                                                                                                                             | —                     | shipped  |
+| invisible        | selector       | The official `.invisible` selector ships in the utilities layer; the hidden paint and the kept box are proved in `tests/src/styles/utilities/visibility.test.ts`.                                                                                                                                                                                                                                                                                                | —                     | shipped  |
 | engine           | identity       | Cross-cutting engine: `VERSION` `'5.3.8'`; `DATA_KEY` `bs.${NAME}`; `EVENT_KEY` `.${DATA_KEY}`; `eventName(name)` returns `${name}${EVENT_KEY}`                                                                                                                                                                                                                                                                                                                  | —                     | accepted |
 | engine           | option         | Cross-cutting engine: `Default`/`DefaultType` inherited empty from `Config` unless a component overrides                                                                                                                                                                                                                                                                                                                                                         | —                     | accepted |
 | engine           | attribute      | Cross-cutting engine: `data-bs-config` JSON merges with `data-bs-*` attributes read by `Manipulator`; config object wins last                                                                                                                                                                                                                                                                                                                                    | —                     | accepted |
@@ -4192,6 +4376,17 @@
 accessible name. The application barrel is a workspace implementation surface and is outside this
 guide's published API tables.
 
+The Position, Sizing, and Visibility regions follow the component regions. A fixed, sticky, or
+viewport-sized specimen renders inside the shell's `viewport` frame, which paints nothing. Layout
+containment makes the frame the containing block of every fixed and absolute element inside it, and
+paint containment with a clip keeps what such an element overflows inside the frame without making
+the frame scroll, so a fixed bar holds to the frame's edge and a backdrop sized to the viewport
+raises no scrollbar on the frame or on the page. The frame's bounded height holds a default dialog
+at the 390 viewport. The sticky bars scroll inside the shell's `scroller` box within the frame,
+because the frame clips rather than scrolls; see [position
+specimens](../tests/app/browser/sections/PositionSection.test.ts), which proves the frame at the 390
+and 1280 viewports.
+
 The specimen and region names are what the capture registry addresses a frame by: every registered
 scenario names the specimen or the region that is its subject, and § Tests gives the filename law
 built on it, so a shipped key no region renders has no subject to register and no frame to be read
@@ -4244,11 +4439,14 @@
 [list group specimens](../tests/app/browser/sections/ListGroupSection.test.ts),
 [pagination specimens](../tests/app/browser/sections/PaginationSection.test.ts),
 [placeholder specimens](../tests/app/browser/sections/PlaceholderSection.test.ts),
+[position specimens](../tests/app/browser/sections/PositionSection.test.ts),
 [progress specimens](../tests/app/browser/sections/ProgressSection.test.ts),
+[sizing specimens](../tests/app/browser/sections/SizingSection.test.ts),
 [specimen table rendering](../tests/app/browser/sections/SpecimenSection.test.ts),
 [spinner specimens](../tests/app/browser/sections/SpinnerSection.test.ts),
 [table specimens](../tests/app/browser/sections/TableSection.test.ts),
-[validation specimens](../tests/app/browser/sections/ValidationSection.test.ts), and
+[validation specimens](../tests/app/browser/sections/ValidationSection.test.ts),
+[visibility specimens](../tests/app/browser/sections/VisibilitySection.test.ts), and
 [showcase journeys](../tests/app/browser/integration.test.ts).
 
 The journey run also writes the capture portfolio an appearance round is ruled on. Each frame is
@@ -4350,7 +4548,12 @@
 [the spinner classes](../tests/src/styles/components/spinner.test.ts),
 [the list group classes](../tests/src/styles/components/list-group.test.ts),
 [the validation classes](../tests/src/styles/components/validation.test.ts),
-[the gutter and gap utilities](../tests/src/styles/utilities/gap.test.ts), and
+[the gutter and gap utilities](../tests/src/styles/utilities/gap.test.ts),
+[the position utilities](../tests/src/styles/utilities/position.test.ts),
+[the position helpers](../tests/src/styles/components/position.test.ts),
+[the sizing utilities](../tests/src/styles/utilities/sizing.test.ts),
+[the visibility utilities](../tests/src/styles/utilities/visibility.test.ts),
+[the visually hidden helpers](../tests/src/styles/utilities/visually-hidden.test.ts), and
 [the customization recipe](../tests/src/styles/integration.test.ts).
 Those proofs resolve declarations against the cascade's layer order; § Styles states that order and
 names the partial that declares it.
```

`/home/user/veneer-upl/tmp/units/upl-consumer.patch`, unified diff against `e4e6a40` (the unlisted file; § Deviations item 1):

```diff
--- a/tests/service/tailwind/consumer.test.ts
+++ b/tests/service/tailwind/consumer.test.ts
@@ -183,35 +183,39 @@
 		expect(declared).toEqual(['row-gap', 'column-gap'])
 		const branch = collectImportantNames(await stage.expand(readBuiltCascade()), longhands)
 		expect(branch).toContain('gap-3')
-		// The reading is the longhands Tailwind's own rule for each of these names declares, as
+		// Each name's reading is the longhands Tailwind's own rule for that name declares, as
 		// Chromium expands them. Dropping the exclusion line also moves the names outside the
 		// branch, `.container` among them, and an element's used width follows its container, so a
-		// reading of every longhand would report the ancestor moving rather than this rule losing.
-		const properties = [...new Set(branch.flatMap((name) => longhands.get(name) ?? []))]
+		// reading of every longhand, or of a longhand another branch name declares, would report
+		// the ancestor moving rather than this rule losing: the gap rows sit inside the container,
+		// and the width steps declare the `width` longhand.
+		const properties = (name: string): readonly string[] => longhands.get(name) ?? []
 		await stage.mount(consumerMarkup)
-		const standalone: Array<ReadonlyMap<string, string>> = []
+		const standalone: Array<readonly [string, ReadonlyMap<string, string>]> = []
 		for (const name of branch) {
-			standalone.push(...(await stage.read(`[class~="${name}"]`, properties)))
+			for (const snapshot of await stage.read(`[class~="${name}"]`, properties(name)))
+				standalone.push([name, snapshot])
 		}
-		// Each reading has to carry the longhands the cascade declares important, or the comparison
-		// that follows runs over nothing.
-		for (const snapshot of standalone)
-			expect(declared.filter((property) => !snapshot.has(property))).toEqual([])
-		expect(standalone).not.toEqual([])
+		// Each reading has to carry the longhands the cascade declares important for its name, or
+		// the comparison that follows runs over nothing.
+		for (const [name, snapshot] of standalone)
+			expect(properties(name).filter((property) => !snapshot.has(property))).toEqual([])
+		expect(standalone.filter(([name]) => name === 'gap-3')).not.toEqual([])
 		// The instrument is the recipe with its exclusion line dropped, so Tailwind's own rule for
 		// each of these names is on the page, and the element still resolves, for every property
 		// that rule declares, what it resolves under the cascade alone.
 		await stage.load(instrumentProfile)
 		const paired: Array<ReadonlyMap<string, string>> = []
-		for (const name of branch) paired.push(...(await stage.read(`[class~="${name}"]`, properties)))
+		for (const name of branch)
+			paired.push(...(await stage.read(`[class~="${name}"]`, properties(name))))
 		expect(paired).toHaveLength(standalone.length)
 		expect(
-			standalone.flatMap((snapshot, index) => {
+			standalone.flatMap(([name, snapshot], index) => {
 				const after = requireValue(paired[index], 'The paired snapshot was never taken')
 				return Array.from(snapshot).flatMap(([property, value]) =>
 					after.get(property) === value
 						? []
-						: [`${property}: ${value} became ${String(after.get(property))}`],
+						: [`${name} ${property}: ${value} became ${String(after.get(property))}`],
 				)
 			}),
 		).toEqual([])
```
