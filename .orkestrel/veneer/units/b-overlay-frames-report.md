# OVERLAY-FRAMES (`fo`) report

`opus` on Opus 5.5, worktree `/home/user/veneer-fo` (branch `unit/fo` at `cf5e447`). Every row closed
except the popover header strip frame, which is recorded as a frame no magnification can show, with
the probe reading behind that ruling. That record departs from the brief's "element frame over the
header" wording, and the Orchestrator rules on it (see § Deviation state). Nothing is committed.

## Touched files

- `app/browser/constants.ts`: carousel pictures carry the `w-100` class in place of the `img-fluid`
  class; a `Plain alert` specimen leads the `ALERT_SPECIMENS` table; the `ALERT_COPY` paragraph names
  it; the TSDoc of the carousel and alert tables is updated.
- `tests/setup.ts`: `'Plain alert'` joins the `CaptureSubject` union; a `plain-alert` row joins the
  `CASCADE_KEYS` table; `fading-carousel-hover` and `fading-carousel-focus` rows join the
  `DRIVEN_KEYS` table; the `CASCADE_KEYS` TSDoc records why the header strip takes no frame.
- `tests/app/browser/integration.test.ts`: one added driven case for the next carousel control.
- `tests/app/browser/sections/CarouselSection.test.ts`: added the spanning case; the render case
  asserts the `w-100` class; the advancing case scrolls with the instant behavior.
- `tests/app/browser/sections/AlertSection.test.ts`: loads the cascade; the render case derives its
  names from the `ALERT_SPECIMENS` table; added the plain-alert case.
- `tests/app/browser/sections/PopoverSection.test.ts`: added the header-strip case.

Diffstat against `cf5e447` (`git diff --stat cf5e447`):

```text
 app/browser/constants.ts                           |  39 +++++---
 tests/app/browser/integration.test.ts              | 104 +++++++++++++++++++++
 tests/app/browser/sections/AlertSection.test.ts    |  71 ++++++++++++--
 tests/app/browser/sections/CarouselSection.test.ts |  78 +++++++++++++++-
 tests/app/browser/sections/PopoverSection.test.ts  |  61 +++++++++++-
 tests/setup.ts                                     |  18 ++++
 6 files changed, 342 insertions(+), 29 deletions(-)
```

Review records: `.orkestrel/veneer/units/fo.diff`, `.orkestrel/veneer/units/fo-status.txt`, `.orkestrel/veneer/units/fo-shared.patch`, and
`.orkestrel/veneer/units/fo-instruments/fo-mutations.log.txt`.

## Rows

### P11, the carousel picture

- Change: every `CAROUSEL_SPECIMENS` picture carries the `w-100` class the release's markup gives
  it. The `d-block` class the release writes beside it is left out, because the elements layer
  already draws every `img` element as a block (the `_img.scss` partial, and § Carousel classes
  states it). The `img-fluid` class is gone: the elements layer writes the same `max-width` and
  `height: auto` declarations, and the `w-100` class decides the width.
- Proof: the `spans every displayed slide in every carousel with its picture at every layout
  boundary and journey width` case reads each displayed slide at each `BREAKPOINT_CASES` boundary
  and each `VIEWPORT_WIDTHS` width through the `visitBreakpoint` helper, and holds the slide to the
  track's width and the picture's box to the slide's.
- Red first (log entry `P11 red before the fix`): the added case against the `img-fluid` pictures,
  `Tests  1 failed | 7 passed (8)`, the spanning case failing with the 1400-wide slide against an
  800-wide picture.
- Green (log entry `P11 green after the fix`): `Tests  8 passed (8)`.
- Mutation `picture-own-width` (the advancing specimen's incoming picture back on the `img-fluid`
  class): the spanning case and the render case redden, `Tests  2 failed | 6 passed (8)`. The render
  case reddens on its `w-100` class check.
- Frames: `tmp/capture/states/captioned-carousel--light-1280.png`,
  `fading-carousel--light-1280.png`, `inverted-carousel--light-1280.png`, and
  `advancing-carousel--light-1280.png`: each picture spans the 1280-wide frame.
- Hover residue in the resting frames: gone. The `.orkestrel/veneer/units/fo-instruments/fo-chevrons.py` instrument reads the
  largest channel distance between each control's mark and the picture behind it
  (`.orkestrel/veneer/units/fo-instruments/fo-chevrons-light-1280.log.txt`, `.orkestrel/veneer/units/fo-instruments/fo-chevrons-dark-390.log.txt`):

  | Frame                                 | Previous mark | Next mark |
  | ------------------------------------- | ------------- | --------- |
  | `captioned-carousel--light-1280`      | 102           | 102       |
  | `fading-carousel--light-1280`         | 121           | 121       |
  | `inverted-carousel--light-1280`       | 125           | 125       |
  | `captioned-carousel-hover--light-1280`| 183           | 102       |
  | `fading-carousel-hover--light-1280`   | 121           | 218       |
  | `captioned-carousel--dark-390`        | 32            | 32        |
  | `fading-carousel-hover--dark-390`     | 127           | 228       |

  Each resting frame paints its previous and next marks at one strength, and each driven frame
  paints its driven mark stronger than the other, so the instrument separates the states it rules
  on.

### P12, the advancing case

- Cause, from a probe (`.orkestrel/veneer/units/fo-instruments/fo-probe-readings.log.txt`): the reset sets `scroll-behavior:
  smooth` on the root, so the default `scrollIntoView` call is still under way when the
  `readHit` helper reads the picture's center. With a planted specimen the page stays at
  `scrollY 0`, the picture's top at 912 in an 896-tall viewport, and the `elementFromPoint` call
  returns nothing. At base the picture's center already sits inside the viewport, which is why the
  case held until a specimen was added.
- Fix: the advancing case calls `scrollIntoView({ block: 'center', behavior: 'instant' })`, the
  instant form the `tests/setupBrowser.ts` module already uses.
- Instruments: `.orkestrel/veneer/units/fo-instruments/fo-plant-carousel.py plant|remove` plants a copy of the captioned
  specimen under its own name, id, and control labels; `.orkestrel/veneer/units/fo-instruments/fo-mutate.py` applies and reverts
  each named mutation.
- Red before (log entry `P12 red before the fix`, base tree with the planted copy):
  `Tests  1 failed | 6 passed (7)`, the advancing case failing with `expected undefined to be <img
  class="img-fluid" …>`.
- Green after (log entry `P12 green after the fix`, planted copy): `Tests  8 passed (8)`.
- Mutation `scroll-default` (the fix reverted, planted copy): the advancing case alone reddens,
  `Tests  1 failed | 7 passed (8)`.

### P16, the frames

**The next carousel control's hover and focus.**

- Scenario: `fading-carousel-hover` and `fading-carousel-focus` rows in the `DRIVEN_KEYS` table.
  Each scenario names one specimen in one state and the captioned carousel's stems already carry
  the previous control, so the next control is driven on the fading carousel, whose marks carry no
  filter from the dark class.
- Case: `drives the next control of a second carousel to hover and to focus on the lifted specimen,
  and photographs each state`. It lifts the specimen itself into a wrapper carrying the `p-2
  col-lg-6` classes, carries the `main`-containment guard, shoots each frame on the lifted
  specimen, holds each frame to the state it was shot in, and reads `['0.5', '0.9', '0.9', '0.5']`
  for rest, hover, focus, and rest again.
- Reach reading behind the `col-lg-6` class (`.orkestrel/veneer/units/fo-instruments/fo-probe-readings.log.txt`): once the pane
  is staged, the runner's window is 800 by 513 CSS pixels, so the pointer reaches only tester points
  inside it. A next control on a full-width 1280 carousel sits at x 1082 to 1280, and its hover
  timed out in the case's draft and in the probe. The `col-lg-6` class holds the wrapper to half
  the page from the large boundary up.
- Red first (log entry `Next control red first`, the tree without the rows): `Tests  1 failed | 46
  skipped (47)`, failing with `expected [ 'fading-carousel-hover', …(1) ] to strictly equal []`. This
  red run followed the green run, because the draft of the case timed out in the hover before any
  registry reading (log entries marked `first draft`).
- Green (log entry `Next control after the fix`): `Tests  1 passed | 46 skipped (47)`.
- Mutation `hover-released` (the pointer released before the hover frame): `expected [ [
  'fading-carousel-hover', false ] ] to strictly equal []`.
- Frames: `tmp/capture/states/fading-carousel-hover--light-1280.png`,
  `fading-carousel-focus--light-1280.png`, `fading-carousel-hover--dark-390.png`, and
  `fading-carousel-focus--dark-390.png`.

**A roleless alert.**

- Specimen: `Plain alert`, `<div class="alert" role="alert">` with fictional copy, leading the
  table. Row: `plain-alert` in the `CASCADE_KEYS` table, selector `.alert`, property `color`.
- Case: `paints no fill, no edge, and the text around it on every alert carrying no role class`.
  The role classes come from the role ramp's own alerts, the plain alerts are the rendered alerts
  carrying none of them, and the ramp's alerts are the control the same reading must refuse.
- Red first (log entry `Plain alert red before the fix`): `Tests  1 failed | 2 passed (3)`, the
  empty population refused. Green: `Tests  3 passed (3)`.
- Mutation `plain-alert-fill` (the plain alert carries the `text-bg-primary` class): `expected [ {
  fill: 'rgb(8, 65, 234)', …(2) } ] to strictly equal [ { fill: 'rgba(0, 0, 0, 0)', …(2) } ]`.
- Frames: `tmp/capture/states/plain-alert--light-1280.png` and `plain-alert--dark-390.png`.

**The popover header strip: recorded, not framed.**

- Reading (`.orkestrel/veneer/units/fo-instruments/fo-strip-probe.test.ts.txt`, readings in
  `.orkestrel/veneer/units/fo-instruments/fo-probe-readings.log.txt`): the strip paints the header's own fill (light
  `rgb(233, 236, 239)`, dark `rgb(52, 58, 64)`, each equal to the header's background) on the
  header's first row. A staged shot of the bottom popover with the strip and one without it differ
  by at most 2 levels (light) and 3 levels (dark) of a channel's 255 at the page's scale, and at
  most 7 and 3 at four times that scale. Hiding the arrow, the control, changes every shot. No
  frame at any size shows a reader the strip.
- Record: the `CASCADE_KEYS` TSDoc states the ruling beside the other overlay declines, and the
  guide patch states it under § Popover classes.
- Promoted proof: `lays each titled popover's header strip on the header's first row, in the
  header's own fill` in the `PopoverSection.test.ts` file. It passes on the tree as it stands; its
  red runs are the mutations `strip-header-fill` (the bottom header carries the `bg-body` class) and
  `strip-off-row` (the bottom header carries the `mt-1` class), each reddening that case alone.

The engine-written transition states stay unframed under V7 of `b-collapse-verify-verdict.md`.

## Unreachable states

None. Each driven state was reached in Chromium once the next control's wrapper was narrowed; the
reach reading is in § P16.

## Gates

Each command ran in `/home/user/veneer-fo` with the brief's `PATH` and `PLAYWRIGHT_BROWSERS_PATH`
values, after the `npm run build:src` command (exit 0).

| Command | Exit | Result line |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check app/browser/constants.ts tests/setup.ts tests/app/browser/integration.test.ts tests/app/browser/sections/CarouselSection.test.ts tests/app/browser/sections/AlertSection.test.ts tests/app/browser/sections/PopoverSection.test.ts` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | oxlint printed no summary line |
| `npm run check` | 0 | no diagnostic |
| `npm run test:setup` | 1 | `Tests  2 failed \| 285 passed \| 12 skipped (299)`, every failure a timeout in `tests/setupServer.test.ts` (load average 14.97) |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts` | 0 | `Tests  111 passed (111)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts` | 0 | `Tests  20 passed (20)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/CarouselSection.test.ts tests/app/browser/sections/AlertSection.test.ts tests/app/browser/sections/PopoverSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | 0 | `Tests  22 passed (22)` |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project journey:light-1280*` | 0 | `Tests  47 passed (47)` |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project journey:dark-390*` | 0 | `Tests  47 passed (47)` |
| `npm run test:guides`, in a scratch copy of the worktree under `tmp/probe/` with `fo-shared.patch` applied | 0 | `Tests  20 passed (20)` |

- The capture runs used the `verbose` reporter in place of the brief's `dot` reporter, so the log
  names each case.
- The light-1280 capture ran before a comment-only edit to the next-control case. The dark-390
  capture and every other gate ran on the final tree.
- Criterion 3 names `npm run test:setup`, and that run exits 1 on timeouts in a file this unit did
  not touch. The same file passes alone. This is a timing observation for the Orchestrator's
  reading.

## Shared-file patch

`.orkestrel/veneer/units/fo-shared.patch`, against `guides/veneer.md` at `cf5e447` (the worktree's copy is byte
identical). It edits § Alert classes (the plain alert), § Popover classes (the strip ruling),
§ Carousel classes (the `w-100` class, and which carousel carries each control's driven frames),
and § Tests (the pointer's reach inside the runner's window).

## Deviation state

No stop. Choices this unit settled and recorded:

- The popover header strip is recorded as unframeable, with its reading and a promoted section
  proof, in place of the "element frame over the header" the brief names. The probe shows the
  frame would carry the header's fill over the header's fill. Rule on it.
- The `ALERT_COPY` paragraph is edited to name the plain alert. The constant sits beside the owned
  table and outside the brief's named list.
- The next control's scenarios use the fading carousel's stem, and its wrapper carries the
  `col-lg-6` class for the pointer's reach.
- The `d-block` class is left off the pictures (see § P11).

## Observations

- In dark mode the theme's carousel variables paint the captioned carousel's caption and marks
  black over its dark pictures (mark strength 32 against the `#343a40` backdrop at dark-390, frame
  `tmp/capture/states/captioned-carousel--dark-390.png`). The section proof's 4.5:1 caption case
  reads light mode only. The carrier is unknown.
- The `POPOVER_COPY` paragraph invites a reader to compare the header strip, which no frame shows.
  It is outside the owned list and left as it is.
- The pointer-reach limit binds any pointer state at the far side of a wide lifted specimen in the
  other frames units.
- `tests/setupServer.test.ts` times out under the container's load; see § Gates.

## Retained instruments

`.orkestrel/veneer/units/fo-instruments/fo-run.sh`, `fo-journey.sh`, `fo-mutate.py`, `fo-plant-carousel.py`, `fo-chevrons.py`,
and the probe copies `fo-strip-probe.test.ts.txt`, `fo-hover-probe.test.ts.txt`,
`fo-reach-probe.test.ts.txt`, `fo-probe.config.ts.txt`, `fo-journey-probe.config.ts.txt`, and
`fo-probe.sh.txt`. The probes and the scratch guide copy under `tmp/probe/` are deleted. The P12
cause probe's source was deleted before retention, and its readings are transcribed in
`fo-probe-readings.log.txt`.
