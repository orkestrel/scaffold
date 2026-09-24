# OFFCANVAS (`oc`) report

The `offcanvas` key ships from `src/styles/components/_offcanvas.scss` with its responsive ramp, the
`.offcanvas-header .btn-close` combinator, the `overlay-backdrop` backdrop, the drawer stack
bindings, the Offcanvas region, and the `Navbar with offcanvas` specimen. Every gate the criteria
name exits 0 on the validation copy, and the shared patch passes `git apply --check` on a fresh
extract of `2a3f223`. Two decisions need the Orchestrator's ruling: the priority gate refinement in
the `tests/conformance.test.ts` file, and the partial's two emission sites (see Deviation state).

Unit: `opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-oc`, base `2a3f223`. No bench
lane ran, so no journal applies.

## Touched files

Owned files in the worktree:

- `src/styles/components/_offcanvas.scss` (new): the panel maps, the variable rule over every panel
  class, the ramp walk pairing the `breakpoint-down` and `breakpoint-up` mixins at one name, the bare
  panel, the backdrop through the `overlay-backdrop` mixin, the header and its close combinator, the
  title, and the body.
- `tests/src/styles/components/offcanvas.test.ts` (new): the browser proof of every recorded
  selector and condition (the R19 matrix follows).
- `app/browser/sections/OffcanvasSection.ts` (new): the `SpecimenSection` subclass for the Offcanvas
  region.
- `tests/app/browser/sections/OffcanvasSection.test.ts` (new): the region contract, the frames, the
  backdrop, and the dialog markup.
- `tests/app/browser/sections/NavbarSection.test.ts`: the `Navbar with offcanvas` specimen, the
  flipped no-panel assertion and its comment, and the offcanvas toggler's own assertions.
- `tests/src/styles/components/navbar.test.ts`: the below-boundary reading the shipped panel rules
  move, and its comment.

Shared files, returned as the patch at the end of this report and in
`/home/user/veneer-oc/.orkestrel/veneer/units/oc-shared.patch`:

- `src/styles/index.scss`: `@use 'components/offcanvas'` after `components/spinner`.
- `src/styles/_mixins.scss`: the `overlay-backdrop` block appended verbatim after the
  `utility-variable` mixin.
- `tests/setupStyles.ts`: `.offcanvas-header .btn-close` moved from `CLOSE_DEFERRED` to
  `CLOSE_SELECTORS`; the `OFFCANVAS_SELECTORS`, `OFFCANVAS_PLACEMENTS`, `OFFCANVAS_FRAME`,
  `OFFCANVAS_MARKUP`, `OFFCANVAS_STATE_CASES`, and `OFFCANVAS_GEOMETRY` tables.
- `tests/setupStyles.test.ts`: the tables in the export list; the `offcanvas case tables` block
  binding each table to the inventory by derivation; the frozen-table case. The close partition case
  is unchanged in shape.
- `tests/setup.ts`: the `CaptureSubject` members, the resting `CASCADE_KEYS` rows, and the decline
  paragraph in the `CASCADE_KEYS` remarks. No `DRIVEN_KEYS` row.
- `tests/app/browser/integration.test.ts`: the `OFFCANVAS_SPECIMENS` import and its place in the
  declared-subject list.
- `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`: the `Offcanvas` region
  after `Accordion`, and the `OFFCANVAS_COPY`, `OFFCANVAS_SPECIMENS`, and `OffcanvasSection` exports.
- `tests/conformance.test.ts`: `'offcanvas'` in `listed`; `offcanvas` in the order case after
  `spinner`; the priority case compares each sheet's priority set per selector and property.
- `tests/setupServer.test.ts`: `'offcanvas'` in the dash-proof component set.
- `app/browser/constants.ts`: `OFFCANVAS_COPY`, `OFFCANVAS_SPECIMENS`, the `Navbar with offcanvas`
  entry, its `NAVBAR_SPECIMENS` comment, and the `NAVBAR_COPY` paragraph.
- `app/browser/Showcase.ts`, `app/browser/index.ts`: `OffcanvasSection` after `AccordionSection`.
- `guides/veneer.md`: the § Files row, `### Offcanvas classes`, the `#### offcanvas` ledger, the
  compatibility rows and the Offcanvas `plugin` row, the deleted `Overlays` deferral row, the drawer
  Alias cell, the `### Navbar classes` sentences, and the § Showcase and § Tests links.

`ROADMAP.md`: no change.

## Diffstat

Worktree against `2a3f223` (`git -C /home/user/veneer-oc diff --stat 2a3f223`, new files by
`wc -l`):

```text
 tests/app/browser/sections/NavbarSection.test.ts | 37 ++++++++++++++++++++----
 tests/src/styles/components/navbar.test.ts       |  7 +++--
 2 files changed, 36 insertions(+), 8 deletions(-)
new: src/styles/components/_offcanvas.scss 186 lines, app/browser/sections/OffcanvasSection.ts 20,
     tests/src/styles/components/offcanvas.test.ts 500, tests/app/browser/sections/OffcanvasSection.test.ts 174
```

Shared patch (`git apply --stat` on the fresh extract):

```text
 app/browser/Showcase.ts               |   2 +
 app/browser/constants.ts              |  63 +++-
 app/browser/index.ts                  |   1 +
 guides/veneer.md                      | 172 +++++++++-
 src/styles/_mixins.scss               |  21 ++
 src/styles/index.scss                 |   1 +
 tests/app/browser/Showcase.test.ts    |   3 +
 tests/app/browser/index.test.ts       |   3 +
 tests/app/browser/integration.test.ts |   2 +
 tests/conformance.test.ts             |  35 +-
 tests/setup.ts                        |  78 +++++
 tests/setupServer.test.ts             |   1 +
 tests/setupStyles.test.ts             | 128 +++++++
 tests/setupStyles.ts                  | 141 +++++++-
```

`git status --porcelain` at hand-back is in `/home/user/veneer-oc/.orkestrel/veneer/units/oc-status.txt`, and the
review diff with the new files rendered is in `/home/user/veneer-oc/.orkestrel/veneer/units/oc.diff`.

## Ledger rows the gate measured

The departures gate measured the following rows, and the patch records them under `#### offcanvas`:

| Selector | Property | Bootstrap 5.3.8 | Veneer | Departure |
| --- | --- | --- | --- | --- |
| `.offcanvas`, `.offcanvas-xxl`, `.offcanvas-xl`, `.offcanvas-lg`, `.offcanvas-md`, `.offcanvas-sm` (one row each) | `--bs-offcanvas-zindex` | `1045` | `var(--vn-stack-drawer-base)` | tokenized |
| the same selectors, one row each | `--bs-offcanvas-padding-x` | `1rem` | `var(--vn-space-8)` | tokenized |
| the same selectors, one row each | `--bs-offcanvas-padding-y` | `1rem` | `var(--vn-space-8)` | tokenized |
| the same selectors, one row each | `--bs-offcanvas-title-line-height` | `1.5` | `var(--vn-line-body)` | tokenized |
| `.offcanvas-backdrop` | `z-index` | `1040` | `var(--vn-stack-drawer-backdrop)` | tokenized |
| `.offcanvas-backdrop` | `background-color` | `#000` | `var(--vn-palette-black-base)` | tokenized |

No row moved out of `#### navbar`: the gate measures no departure for any
`.navbar-expand{infix} .offcanvas*` selector, because the navbar partial writes the recorded values,
so the D22 ladder files no row for them under either key. No `.offcanvas-header .btn-close` row
exists under `#### btn-close`, because the combinator's declarations equal the record. No
`### Additions` row: the additions gate reports nothing unrecorded.

## Resting rows and subjects

The `CaptureSubject` members and the `CASCADE_KEYS` rows, appended at the registry's end:

| Scenario | Subject | Selector | Property |
| --- | --- | --- | --- |
| `start-offcanvas` | `Start offcanvas` | `.offcanvas-start` | `transform` |
| `end-offcanvas` | `End offcanvas` | `.offcanvas-end` | `transform` |
| `top-offcanvas` | `Top offcanvas` | `.offcanvas-top` | `transform` |
| `bottom-offcanvas` | `Bottom offcanvas` | `.offcanvas-bottom` | `transform` |
| `responsive-offcanvas-sm` … `-xxl` | `Responsive offcanvas sm` … `xxl` | `.offcanvas-sm` … `.offcanvas-xxl` | `position` |
| `navbar-with-offcanvas` | `Navbar with offcanvas` | `.navbar-expand-lg .offcanvas` | `position` |

No `DRIVEN_KEYS` row: no state here needs a drive. The `CASCADE_KEYS` remarks gain the decline of
the `showing`, `hiding`, and fade-alone frames and of the `.offcanvas-xxl` inline frame.

## R19 proof matrix

Cases are in `tests/src/styles/components/offcanvas.test.ts` unless named. Each named mutation is a
logged run in `/home/user/veneer-oc/.orkestrel/veneer/units/oc-instruments/oc-mutations.log.txt`. `{infix}` spans `sm`, `md`,
`lg`, `xl`, and `xxl`, and `{X}` is that infix's boundary.

| Recorded selector | Condition | Case | Distinguishing mutation | Specimen | Scenario |
| --- | --- | --- | --- | --- | --- |
| `.offcanvas` (variables) | none | `stacks the panel on the drawer rung…`; `sets the title line and the body inset…`; `paints the panel from the body aliases…` | `literal-rungs`, `insets-literal`, `literal-colours` | each placement specimen, `Navbar with offcanvas` | `start-offcanvas`, `end-offcanvas`, `top-offcanvas`, `bottom-offcanvas`, `navbar-with-offcanvas` |
| `.offcanvas` (fixed panel) | none | `pins the $placement panel…`; `keeps the bare panel fixed at every width` | `absent-partial` | each placement specimen | the placement scenarios |
| `.offcanvas` | `(prefers-reduced-motion: reduce)` | `slides with the recorded transform transition…` | `transition-without-mixin` | each placement specimen | no reduced-motion variant is registered |
| `.offcanvas.offcanvas-{start,end,top,bottom}` | none | `pins the $placement panel…` | `placements-start-end-transforms-swapped` | `Start offcanvas`, `End offcanvas`, `Top offcanvas`, `Bottom offcanvas` | the matching placement scenario |
| `.offcanvas.show`, `.offcanvas.show:not(.hiding)` | none | `paints a panel carrying "$classes"…`; `pins the $placement panel…` | `show-rule-dropped` | every panel specimen | every offcanvas scenario |
| `.offcanvas.showing`, `.offcanvas.hiding` | none | `paints a panel carrying "$classes"…` (declared-and-resolved, M2) | `show-rule-dropped`, `state-case-hiding-marked-unslid` | none: engine-written | no frame; the registry declines it |
| `.offcanvas-{infix}` (variables) | none | `fixes the $name panel below its boundary…` | `absent-partial` | `Responsive offcanvas {infix}` | `responsive-offcanvas-{infix}` |
| `.offcanvas-{infix}` (fixed panel), its placement and state rules | `(max-width: {X-0.02}px)` | `fixes the $name panel below its boundary…` at `{X}-1` | `md-down-and-up-names-shifted-apart`, `ramp-nested-rules-dropped` | `Responsive offcanvas {infix}` | `responsive-offcanvas-{infix}` at 390, and `-xxl` at 1280 |
| `.offcanvas-{infix}` | `(max-width: {X-0.02}px) and (prefers-reduced-motion: reduce)` | `slides with the recorded transform transition…` (xxl at 1399); the ramp case's condition list | `transition-without-mixin` | `Responsive offcanvas {infix}` | no reduced-motion variant is registered |
| `.offcanvas-{infix}`, `.offcanvas-{infix} .offcanvas-header`, `.offcanvas-{infix} .offcanvas-body` | `(min-width: {X}px)` | `fixes the $name panel below its boundary…` at `{X}` and `{X}+1` | `md-down-and-up-names-shifted-apart`; `body-fill-important-dropped` (priority gate) | `Responsive offcanvas {infix}` | `responsive-offcanvas-{sm,md,lg,xl}` at 1280; the `xxl` inline state has no frame (R16), because 1400 is wider than both variants |
| `.offcanvas-backdrop` | none | `covers the viewport from the frame corner…`; `stacks the panel…` | `backdrop-without-mixin-no-states`, `backdrop-without-mixin-full-copy` (duplication gate), `literal-rungs` | `Start offcanvas` | `start-offcanvas` |
| `.offcanvas-backdrop.fade` | none | `covers the viewport…` (fading reading) | `backdrop-without-mixin-no-states` | none: fade alone is engine-written | no frame; the registry declines it |
| `.offcanvas-backdrop.show` | none | `covers the viewport…` | `backdrop-without-mixin-no-states` | `Start offcanvas` | `start-offcanvas` |
| `.offcanvas-header` | none | `fits the header close control…` | `absent-partial` | every panel specimen | every offcanvas scenario |
| `.offcanvas-header .btn-close` | none | `fits the header close control…`; `close.test.ts` reads `CLOSE_SELECTORS` | `combinator-widened-to-offcanvas-btn-close` | every panel specimen | every offcanvas scenario |
| `.offcanvas-title` | none | `sets the title line and the body inset…` | `title-margin-reset-dropped` | every panel specimen | every offcanvas scenario |
| `.offcanvas-body` | none | `sets the title line and the body inset…` | `insets-literal` | every panel specimen | every offcanvas scenario |
| `.navbar-expand{infix} .offcanvas`, `… .offcanvas-header`, `… .offcanvas-body` | `(min-width: {X}px)` | `lays a shown and a resting panel into the $name expanded bar…`; `navbar.test.ts` over an inline hidden state | `navbar-expanded-width-flag-dropped`, `navbar-expanded-transform-flag-dropped`, `navbar-expanded-border-flag-dropped` | `Navbar with offcanvas` (the `lg` step) | `navbar-with-offcanvas`: the fixed panel at 390, the expanded row at 1280 |
| `.navbar-expand .offcanvas`, `… .offcanvas-header`, `… .offcanvas-body` | none | `lays a shown and a resting panel into the 'xs' expanded bar…` | the same flag runs | none: the region renders the `lg` step alone | no frame |

The visibility and fill flags on the expanded navbar panel outrank no shipped rule, so no browser
reading over the shipped cascade separates a dropped flag there: the navbar proof reads them over an
inline hidden state, and the priority gate holds each flag against the release.

Every recorded site is present in the built cascade and no rule naming an offcanvas class sits
outside the record: `/home/user/veneer-oc/.orkestrel/veneer/units/oc-instruments/oc-cascade.log.txt` lists every built
selector and condition naming those classes with its declarations, and reports no missing and no
extra site (instrument `oc-cascade-probe.cjs.txt`). The ledger gate compares their declarations.

## Failing-first and mutation record

Every run is in `/home/user/veneer-oc/.orkestrel/veneer/units/oc-instruments/oc-mutations.log.txt` with its mutated site,
command, build exit, test exit, summary, and failing case names. The instrument is
`oc-mutate.py.txt`. Each run mutates the validation copy, runs `npm run build:src:styles`, runs the
command, and restores the copy.

- Failing first, style proof: `absent-partial` (the `@use` removed) runs
  `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/offcanvas.test.ts`:
  `Tests 26 failed | 3 passed (29)`, exit 1. The cases that pass with no partial are the `show` and
  `showing` state cases (an unstyled element is visible and unslid) and the always-expanded navbar
  case (the navbar partial ships those rules). The same command with the partial: exit 0.
- Failing first, section proofs: `failing-first-section-proofs` (constants, showcase, and barrel at
  `2a3f223`) runs
  `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/sections/OffcanvasSection.test.ts tests/app/browser/sections/NavbarSection.test.ts`:
  `Test Files 2 failed (2)`, exit 1; with the patch: `Tests 7 passed (7)`, exit 0.
- Failing first, priority gate: `priority-gate-before-refinement` restores the gate's previous
  body over the shipped cascade and runs
  `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project conformance -t priority`:
  it reports `.offcanvas-sm { background-color }: release normal, cascade important` and the same
  line for `md`, `lg`, `xl`, and `xxl`, exit 1. The refined gate passes on the shipped cascade and
  reddens on `body-fill-important-dropped` with `.offcanvas-sm .offcanvas-body { background-color }:
  release important, cascade normal` and its siblings. The first logged run of the old gate also
  failed the forced-colors case at 6248 ms; its rerun alone passed, so that failure was timing under
  load.
- Style-proof mutations, each exit 1 on the offcanvas proof: `literal-rungs`,
  `backdrop-without-mixin-no-states`, `placements-start-end-transforms-swapped`,
  `show-rule-dropped`, `md-down-and-up-names-shifted-apart`,
  `combinator-widened-to-offcanvas-btn-close`, `literal-colours`, `transition-without-mixin`,
  `insets-literal`, `title-margin-reset-dropped`, `ramp-nested-rules-dropped`,
  `navbar-expanded-width-flag-dropped`, `navbar-expanded-transform-flag-dropped`,
  `navbar-expanded-border-flag-dropped`.
- Duplication gate: `backdrop-without-mixin-full-copy` (the mixin's whole block written into the
  partial) reddens `repeats no partial's written declaration block in another partial beyond the
  coincidence floor` in `tests/setupStyles.test.ts`, exit 1. The browser proof cannot separate a
  complete copy from the include, and this gate does.
- Table bindings in `tests/setupStyles.test.ts`, each exit 1: `state-case-hiding-marked-unslid`,
  `placement-start-sign-flipped`, `geometry-width-wrong`.
- Section proofs, each exit 1: `app-panel-without-show`, `app-backdrop-on-end-panel`,
  `app-aria-modal-added`, `app-responsive-frame-dropped`, `app-navbar-offcanvas-specimen-dropped`.

## Gates on the validation copy

The validation copy is `tmp/probe/base`: `git archive 2a3f223`, `node_modules` hard-linked, the
owned files copied over it, and the shared patch applied. Every line is in
`/home/user/veneer-oc/.orkestrel/veneer/units/oc-instruments/oc-gates.log.txt`.

| Command | Result | Exit |
| --- | --- | --- |
| `npm run format:check` (worktree) | All matched files use the correct format. | 0 |
| `npm run lint:check` (worktree) | no diagnostic | 0 |
| `npm run format:check` | All matched files use the correct format. | 0 |
| `npm run lint:check` | no diagnostic | 0 |
| `npm run check` | no diagnostic | 0 |
| `npm run build:src` | each build `✓ built` | 0 |
| `npm run test:setup` | `Tests 269 passed (269)` | 0 |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/offcanvas.test.ts tests/src/styles/components/close.test.ts tests/src/styles/components/navbar.test.ts` | `Tests 86 passed (86)` | 0 |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/OffcanvasSection.test.ts tests/app/browser/sections/NavbarSection.test.ts` | `Tests 7 passed (7)` | 0 |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | `Tests 5 passed (5)` | 0 |
| `npm run test:conformance` | `Tests 22 passed (22)` | 0 |
| `npm run test:guides` | `Test Files 1 passed (1)` | 0 |
| `npm run test:policy` | `Tests 109 passed \| 1 skipped (110)` | 0 |
| `git apply --check oc-shared.patch` on a fresh extract of `2a3f223` | clean | 0 |

Baseline at `2a3f223` in the worktree before any edit: `npm run test:conformance` exit 0 with
`Tests 22 passed (22)`, and the close and navbar proofs exit 0 with `Tests 57 passed (57)`.

One reading needs the Orchestrator's rerun: after the final guide edit, one run of `test:setup` and
one of `test:policy` each reported one failed case. Their output file sat in the session scratchpad,
which I removed under mid-campaign note 2, so the failing case names are not retained. Nothing in the
copy changed before the reruns, and two reruns of each passed (`Tests 269 passed (269)` and
`Tests 109 passed | 1 skipped (110)`, exit 0). Other units' processes were running on the host, so
I read this as a timing failure under load, and the deciding run is yours.

Observation, not a criterion: the journey's resting cascade-key case and its declared-subject case
pass on the four variants without `CAPTURE=1`
(`npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot -t "resting cascade key|names a specimen the showcase declares"`:
`Tests 8 passed | 168 skipped (176)`, exit 0; log `oc-journey-observation.log.txt`). The full
journey, `CAPTURE=1`, `test:service`, and the whole styles project are yours.

## Navbar proof readings

The shipped bare `.offcanvas` rules move the navbar proof's below-boundary reading at 991 pixels:
`position` from `static` to `fixed`, and the header's `display` from `block` to `flex`. The
expanded readings at 992 are unchanged. Before: the first run over the shipped partial, in
`oc-first-styles-run.log.txt`, and the logged run `navbar-proof-reading-before-correction`
(`Tests 1 failed | 39 passed (40)`, exit 1). After: `Tests 86 passed (86)`, exit 0. The case keeps
its inline hidden state and its name.

## Shared-name reading

No offcanvas class shares a name with a Tailwind utility. I compiled `tailwindcss/theme` and
`tailwindcss/utilities` (tailwindcss 4.3.3) through `@tailwindcss/node`, with one compiler per
candidate, for `offcanvas`, each `offcanvas-{infix}`, each placement class, `offcanvas-backdrop`,
`offcanvas-header`, `offcanvas-title`, `offcanvas-body`, `showing`, `hiding`, `show`, and `fade`. Each
one adds no output. The controls `top-0` and `collapse` report shared. The exclusion line in
`tests/setup.css` stays as the base has it, and `test:service` is an observation (M17). Log
`oc-tailwind.log.txt`, instrument `oc-tailwind-probe.mjs.txt`.

## Guide text

The patch adds the following section in the barrel's position, between `### Spinner classes` and
`### Placeholder classes`. The patch at the end of this report carries every other guide line.

> ### Offcanvas classes
>
> The offcanvas key ships whole: the panel, its placements and its shown state, a responsive panel
> for each breakpoint, the backdrop, the header and the close control it fits, the title, and the
> body. The expanded navbar combinators the key records ship from the navbar partial, and § Navbar
> classes gives them. Each state is a class set in markup. This section describes what each class
> renders, and § Compatibility records the plugin that moves a panel between the classes as an
> engine obligation.
>
> Each `--bs-offcanvas-*` property is declared on the `.offcanvas` class and on each responsive class,
> so the panel itself is where a consumer retunes one, and the same override on an ancestor is
> shadowed. The inset variables read the `--vn-space-8` token, so the `--vn-factor-density` factor
> rescales the header's and the body's padding and the close control's fit, and the title's
> line-height variable reads the `--vn-line-body` token. The `400px` width, the `30vh` height, and the
> `transform 0.3s ease-in-out` transition keep the release's literals, because no Veneer token
> resolves to them. The fixed panel paints its text and its fill from the `--bs-body-color` and
> `--bs-body-bg` aliases and its edge from the `--bs-border-color-translucent` alias, so a panel
> inside a dark island paints that island's surface.
>
> The `.offcanvas` class fixes the panel as a hidden column at every width, and each placement class
> pins it to one edge of its containing block. The `.offcanvas-start` and `.offcanvas-end` classes pin
> a side panel the recorded width across the whole height, and the `.offcanvas-top` and
> `.offcanvas-bottom` classes pin an edge panel the recorded height across the whole width, never
> taller than its containing block. Each placement draws the border on the panel's inner side and
> slides the panel one whole width or height out past its edge. The `show` class clears the slide and
> shows the panel. The placements are physical, so the start panel sits at the left whatever the
> document's writing direction.
>
> The offcanvas script writes the `showing` class while a panel slides in and the `hiding` class
> while it slides out: a showing panel paints as a shown one, and a hiding panel stays visible while
> it slides back past its edge. The script appends the backdrop to the panel's parent carrying the
> `fade` class and then adds the `show` class. The `.offcanvas-backdrop` rule covers the viewport from
> the corner of its containing block in the `--vn-palette-black-base` token, transparent while it
> carries the `fade` class alone and at the release's `0.5` opacity after the `show` class arrives.
> The `overlay-backdrop` mixin in the `src/styles/_mixins.scss` partial writes that backdrop.
>
> Each panel class declares the `--bs-offcanvas-zindex` variable over the `--vn-stack-drawer-base`
> token, and the fixed panel's `z-index` property reads that variable. The backdrop's `z-index`
> property reads the `--vn-stack-drawer-backdrop` token, the rung beneath. A scope retuning either
> rung moves the fixed panel's level or the backdrop's with it, and the panel stays over its backdrop.
>
> Each `.offcanvas-sm`, `.offcanvas-md`, `.offcanvas-lg`, `.offcanvas-xl`, and `.offcanvas-xxl` class
> is the fixed panel below its breakpoint and part of the page's flow at and above it. Below the
> breakpoint the class paints the panel, its placements, and its states as the `.offcanvas` class
> does. At and above the breakpoint the panel is visible whatever its classes, drops its fill and its
> edge, hides its header, and lays its body out as a row with no inset. The release marks the panel's
> clear fill and the body's clear fill important, so a background utility on either does not paint the
> inline panel. The class also sets the `--bs-offcanvas-height` variable to `auto` and the
> `--bs-offcanvas-border-width` variable to `0` there, as the release does; no rule reads either
> variable at that width, because the placement rules apply below the breakpoint alone. The
> `breakpoint-down` and `breakpoint-up` mixins write each pair at one breakpoint, so the fixed state
> ends at the width where the inline state begins.
>
> The `.offcanvas-header` class lays the title and the close control out in a centered row inside the
> panel's inset. The `.offcanvas-header .btn-close` rule fits the control into that inset: half the
> inset around the control, and a negative margin of that half on the top, the right, and the bottom,
> while the automatic left margin pushes the control to the end of the row. The rule selects the
> control through the header, so a close control elsewhere in the panel keeps the close partial's own
> treatment, which § Close classes gives. The `.offcanvas-title` class clears the title's bottom
> margin and sets its line height, and the `.offcanvas-body` class grows to fill the panel, insets
> its content, and scrolls it.
>
> The panel's transition is written through the `transition` mixin, so the reduced-motion rule the
> release records beside it, for the bare panel and for each responsive panel below its breakpoint, is
> emitted with it.
>
> These are the key's recorded departures.
>
> - **The stacking levels read the drawer rungs.** The `--bs-offcanvas-zindex` variable on every panel
>   class reads the `--vn-stack-drawer-base` token in place of the recorded `1045` value, and the
>   backdrop's `z-index` property reads the `--vn-stack-drawer-backdrop` token in place of the
>   recorded `1040` value. Each rung holds the release's number.
> - **The insets and the title line read Veneer's scale.** The `--bs-offcanvas-padding-x` and
>   `--bs-offcanvas-padding-y` variables read the `--vn-space-8` token in place of the recorded `1rem`
>   value, and the `--bs-offcanvas-title-line-height` variable reads the `--vn-line-body` token in
>   place of the recorded `1.5` value. Each token resolves to the recorded value, and the insets
>   rescale with the `--vn-factor-density` factor.
> - **The backdrop paints the black token.** The backdrop's fill reads the `--vn-palette-black-base`
>   token in place of the recorded `#000` value, and the token holds the same bytes.
>
> The Offcanvas region renders a shown panel at each edge and a shown responsive panel for each
> breakpoint, each responsive panel at the end edge. A fixed panel is placed against its containing
> block, so every specimen renders inside an element carrying the shell's `viewport` class, and no
> specimen carries an inline style. The start panel carries the backdrop as a sibling inside the same
> frame, and no other specimen carries one. Each panel is a dialog named by its title and announces no
> modal state, because a static specimen holds no focus and locks no scrolling, and each close
> control is named through its `aria-label` attribute. The region renders no panel carrying the
> `showing` class or the `hiding` class and no backdrop carrying the `fade` class alone, and the
> capture registry declines those frames: each is a moment of a transition a template never writes,
> a showing panel paints the shown frame, a hiding panel rests past its edge where the frame clips
> it, and a fading backdrop paints nothing. The journey renders at 390 and 1280 pixels wide, so the
> `.offcanvas-xxl` panel has no inline frame: its breakpoint is wider than either width, and the
> proof reads its inline state at the breakpoint instead.
>
> The `tests/src/styles/components/offcanvas.test.ts` proof reads each resolved treatment in the
> browser: the written selectors, each placement's edge, span, border, and slide, the shown state
> beside the engine's showing and hiding classes, the stacking levels and a retuned rung, the backdrop
> fading and shown, each responsive panel one pixel below its breakpoint, at it, and one pixel above
> it, the bare panel at every width, the header's close control beside a control outside the header,
> the title and the body, the density factor, the light and dark modes, the transition under the
> staged reduced-motion preference, and a shown and a resting panel inside each expanded navbar step.

`### Navbar classes`: the sentences that said the rules ship ahead of the panel's own partial and
that the region renders no offcanvas panel are rewritten. The text says the flags win over the panel's
fixed, hidden, and sliding state although the offcanvas partial loads later, and that the key
records these rules as well. It adds the offcanvas bar to the region's list and states its frame at
each variant.

## Deviation state

No stop condition fired. I settled the following choices myself and flag them for the audit:

1. **The priority gate is refined (shared, beyond the brief's listed items).** The gate in the
   `tests/conformance.test.ts` file keys each declaration by selector and property, with no
   condition. The release writes the responsive panel's `background-color` property as normal below
   the boundary and `!important` at and above it, so the old gate compared the release's first
   declaration with the cascade's OR and reported `release normal, cascade important` for the
   release's own shape. The reader lives in `tests/setupServer.ts`, which is off-limits, so the gate
   now compares each sheet's set of priorities for a selector and property. The runs are in the
   Failing-first section. If you rule against the refinement, the alternative is a condition field
   on the `SheetReader` class, which is outside this unit.
2. **The partial writes the panel through Sass maps with two emission sites.** The bare panel is
   unconditioned and the `breakpoint-down` mixin emits nothing at the zero boundary, so one block
   cannot serve both without a mixin taking content. The `meta.apply` function does that in the
   `sass` CLI, but Vite's asynchronous Sass compile refuses it with `Mixin doesn't accept a content
   block` (sass 1.104.1, reproduced by `oc-sass-async-probe.mjs.txt`). The declarations live once in
   the `$panel` and `$nested` maps, and the bare rule and the ramp walk emit them. A `_mixins.scss`
   mixin emitting unwrapped content for a missing boundary would remove the second site, but it is
   outside this unit's `_mixins.scss` grant.
3. **The insets and the title line are tokenized** under the family's token rule, which adds the
   padding and line-height rows per panel class to the ledger.
4. **The offcanvas toggler in `Navbar with offcanvas` carries no `aria-expanded` attribute and no
   `collapsed` class**, as the release markup has it, because the offcanvas script writes neither.
   The navbar section proof asserts that pairing.
5. **The `NAVBAR_COPY` paragraph** names the offcanvas bar.
6. **The compatibility rows fit the table's existing column width**, so the patch does not reflow
   the table the sibling units also extend. The Alias cell fits its column for the same reason.
7. **Scratchpad.** Before mid-campaign note 2 arrived I wrote instruments and logs to the session
   scratchpad under `scratchpad/oc/`, a directory I created. I copied the retained ones into
   `tmp/units/` with the `oc-` prefix and removed `scratchpad/oc/` by its own path. I read nothing
   else from the scratchpad beyond the npm 11 `PATH` entry.

Mid-campaign note 1 is applied: every code token in the prose I wrote takes a noun, apart from table cells that list tokens as data, as the other Alias cells do; the section proof
iterates the specimen table, and the state population lives in the `OFFCANVAS_STATE_CASES` table;
every mutation run is logged; the guide says which rule applies each value, including the height and
border-width variables that no rule reads at and above the breakpoint; and each table binds by
derivation from the inventory.

`tmp/probe/` is deleted before hand-back.

## Shared patch

The exact shared patch is `.orkestrel/veneer/units/oc-shared.patch`; the retained copy drops the appended duplicate.
