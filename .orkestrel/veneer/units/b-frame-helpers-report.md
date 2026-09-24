# FRAME-HELPERS (`fh`) report

The `opus` role on Opus 5.5 ran this unit natively in `/home/user/veneer-fh` (branch `unit/fh`, head `5afa37b`). All
gates are green, every named mutation reddens, and one shared-file patch is returned. Nothing is committed.

## The helper

The shared engine is the `FrameManager` class in `tests/setupBrowser.ts`. It has two methods, and its pure parts
live in `tests/setup.ts`.

```ts
constructor(portfolio: PortfolioInterface, outlines?: OutlineCapture) // OutlineCapture { painted; suppressed }
lift<T>(specimen: Element, action: (wrapper: HTMLElement) => Promise<T>, options?: LiftOptions): Promise<T>
//   LiftOptions { padded?: boolean /* default true: p-3 */; reachable?: boolean /* max-width = runner window */ }
focus(scenario: CaptureScenario, wrapper: HTMLElement, target: HTMLElement, options?: FocusOptions): Promise<FocusReading>
//   FocusOptions { ring?: Element; subject?: Element; frame?: Element; keys?: string }
scanFocusReading(reading: FocusReading): readonly string[] // tests/setup.ts; FocusReading { visible; reach; cropped; entered; outline }
```

- **`lift`.** Moves a connected specimen, or attaches a detached copy, into a `tabindex="-1"` wrapper at the start
  of the body. The wrapper carries the `p-3` class unless the lift is unpadded. The method runs the action and then
  puts the specimen back, or removes the copy, on every path.
- **`focus`.** Does each of these steps in order:
  - parks the pointer and records every element of the specimen the pointer enters (R-c);
  - stages reduced motion;
  - reaches the target with Tab from the wrapper, through the installed `driveTraversal` function;
  - reads the reach with the `computeRingReach` function and places the frame;
  - stages the pane again and reads `:focus-visible`;
  - reads the ring grown by its reach, and the region, against the frame's edges;
  - where the ring's element paints an outline, shoots through the outline portfolios as painted and as suppressed,
    and reads the fraction of the `computeRingBand` strip that differs between the two frames.
- **Other additions.**
  - The `readElement` function is the checked read that replaces every `querySelector<HTMLElement>` narrowing in
    the journey (R-b).
  - The `readImageRegion` function holds the decode and clip code, which the `measureVariation` and
    `measureDifference` functions share.
  - The `FrameRegion` interface moved to `tests/setup.ts`, and both pure helpers type against it (R3).
- **Routed cases.** Every lifted driven case and every focus case goes through the helper:
  - the Primary focus case, and the Primary hover and active case;
  - the validation text rings;
  - the page strip;
  - both check-group cases;
  - the range, floating, select, and text-control focus cases;
  - the list-group actions;
  - the role hovers;
  - the link button;
  - the grow spinners;
  - the role actions;
  - the menu item, close control, and both carousel cases;
  - the checkbox focus and indeterminate cases;
  - the switch;
  - the pressed forms;
  - the file hover;
  - the empty textarea;
  - the grouped buttons, and the grouped select and floating control;
  - the plaintext focus case;
  - the validated select and check;
  - the input group button;
  - the nav base and nav underline cases;
  - the accordion;
  - the skip link;
  - the navbar;
  - the focus-ring links;
  - the link specimens;
  - the focusable container.

  No driven case keeps a private lift block, wrapper, crop reading, reach reading, or guard block. That includes
  the reach reading that the `nav-underline-focus` case and the forms and utilities cases kept (F1). The wrapper is
  `wrapper`, the lifted element is `specimen` or `host`, and the shot element is `frame` in every case (F2).
- **Cases left as they stand.**
  - The `toggle-pressed` case shoots in place and lifts nothing.
  - The resting cascade case is not driven. It keeps its `pt-5` copy lift.
  - The page strip's mode that takes no shot reaches focus through the installed `driveTraversal` function
    directly, because the `focus` method always places a frame.

## Drives changed, with frame readings

- **Tab replaces a scripted focus with a key press.** This applies to the `link-focus`, `nav-underline-focus`,
  `page-strip-focus`, `default-focus-ring-focus`, and `focus-ring-roles-focus` scenarios, and to each role
  `*-focus-ring-focus` scenario (R5). The guide's list of Tab-driven frames is replaced by one sentence: every
  focus frame goes through the `focus` method.
- **`dropdown-menu-focus`.** A scripted focus became Tab, and the frame moved from the specimen to the padded
  wrapper. The dark frame shows the outline. The outline differential read 1 at dark-1280 and 0.994 at
  light-390.
- **`captioned-carousel-focus` and `fading-carousel-focus`.** A scripted focus became Tab. The brief expected an
  outline here, and the measurement contradicts it. The carousel focus rule writes `outline: 0`, as the release's
  does. Each case therefore asserts `{ visible: true, reach: 0, cropped: [], entered: [], outline: undefined }`.
  No pixel guard applies, and the frames show the focus opacity.
- **Outline differential, dark-1280 and light-390.**

  | Case | dark-1280 | light-390 |
  | --- | --- | --- |
  | List-group row | 0.995 | 0.486 |
  | Skip link | 1 | 0.145 |
  | Focusable container | 1 | 0.991 |

- **Reach key (OVERLAY-FRAMES).** The fading carousel lifts with `{ reachable: true }`, so its wrapper's width is
  the runner window's `window.top.innerWidth`. A probe measured the runner window at 800×513 and the staged
  tester at x 0. The next control's frame is 768×384 at dark-1280.
- **Carried comment.** The plaintext case's comment says focus "moves the content box of an empty floating one down".
- **Frame geometry.** The frame comparison reports are in `fh-compare-dark-1280.txt` and
  `fh-compare-light-390.txt`, set against `fh-baseline/`.
  - Wrappers that carried `p-2` carry `p-3`, so their frames grow 16 CSS pixels in each dimension.
  - Frames shot on a specimen inside a padded wrapper are narrower by the padding: 32 CSS pixels against an
    unpadded baseline wrapper and 16 against a `p-2` one. The fading carousel's frame follows the reach key
    instead.
  - Frames whose baseline wrapper was unpadded keep that wrapper through `{ padded: false }` and stay identical.
    These are the Primary hover, check-group copy, indeterminate copy, menu hover, close hover, nav hover, and
    navbar hover frames.
  - Only the progress, placeholder, and spinner animation frames changed at equal size.

## Mutations

The mutation log is `fh-mutations.log.txt`, and each run's own log is `fh-mutation-<n>-<name>.log.txt`. Each run
applied the mutation, ran the command, and reverted the mutation exactly.

| Mutation | Command | Red run |
| --- | --- | --- |
| Crop reading dropped | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser -t "frame lifts and focus frames"` | exit 1, `Tests  1 failed \| 4 passed \| 75 skipped (80)`: `expected [] to strictly equal [ 'top', 'right', 'bottom', 'left' ]` |
| Pixel guard dropped (helper proof) | same | exit 1, `Tests  1 failed \| 4 passed \| 75 skipped (80)` (outline undefined) |
| Pixel guard dropped (journey) | `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:dark-1280 -t "<the list-group, menu, skip link, accordion, container, and Primary cases>"` | exit 1, `Tests  3 failed \| 3 passed \| 56 skipped (62)`: the list-group, menu, and skip link cases |
| Drive reverted to a scripted focus with a key press (helper) | same journey command | exit 1, `Tests  4 failed \| 2 passed \| 56 skipped (62)`, each failing on `the outline paints nothing in the strip above its element` |
| Pointer park dropped (R-c) | same journey command | exit 1, `Tests  1 failed \| 5 passed \| 56 skipped (62)`: accordion, `the parked pointer entered button.accordion-button, div.accordion-body, …` |

A defect surfaced while writing the pixel reader, and it was fixed red-first. The region clip at a negative origin
kept the region's full width.

- **Command.** `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser`.
- **Before the fix.** `Tests  1 failed | 79 passed (80)`, with `expected [ 10, 4, 160 ] to strictly equal [ 7, 4, 112 ]`.
- **After the fix.** `Tests  80 passed (80)`.

## Gates

Every gate ran in `/home/user/veneer-fh`. Each log is `.orkestrel/veneer/units/fh-instruments/fh-*.log.txt`.

| Gate | Exit | Result line |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned files | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | no diagnostics |
| `npm run check` | 0 | no diagnostics |
| `npm run test:setup` | 0 | `Tests  313 passed (313)` |
| `npm run test:guides` | 0 | `Tests  20 passed (20)` |
| `npm run test:setup:browser` | 0 | `Tests  80 passed (80)` |
| `npm run test:policy` (read-only reading) | 0 | `Tests  109 passed \| 1 skipped (110)` |
| `CAPTURE=1 … --project journey:dark-1280` (whole variant) | 0 | `Tests  62 passed (62)` (`fh-journey-dark-1280-4.log.txt`) |
| `CAPTURE=1 … --project journey:light-390` (whole variant) | 0 | `Tests  62 passed (62)` (`fh-journey-light-390-3.log.txt`) |
| `CAPTURE=1 … --project journey:dark-390` (acceptance reading) | 0 | `Tests  62 passed (62)` (`fh-journey-dark-390-1.log.txt`) |

After the journey runs, only comments, one test title, and one guide sentence changed. The static gates, the guide
parity check, and `setup:browser` were rerun after those edits.

## Files

The whole diff is `.orkestrel/veneer/units/fh.diff`, and the status is `.orkestrel/veneer/units/fh-status.txt`. It lists only the owned files.
The diffstat is `6 files changed, 1602 insertions(+), 2147 deletions(-)`.

- `tests/setupBrowser.ts`: the `lift` method, the `focus` method, and the private `#outline` method on the frame
  manager; the `readElement`, `readImageRegion`, and `measureDifference` functions; and the option and capture
  interfaces.
- `tests/setup.ts`: the moved `FrameRegion` interface, the `FocusReading` interface, the `scanFocusReading`
  function, and the `FOCUS_READING_CASES` table. The two box helpers type against `FrameRegion`.
- `tests/setupBrowser.test.ts`: proofs of the lift, the ring reading, the crop, the outline differential, and the
  pixel readers.
- `tests/setup.test.ts`: the fault proof and the export list.
- `tests/app/browser/integration.test.ts`: every driven case routed through the helper, and the outline portfolios
  on the `FRAMES` constant.
- `guides/veneer.md` § Tests: the frame helper paragraph, the reach key, and one mode-token sentence.

## Shared-file patch (report-only)

`.orkestrel/veneer/units/fh-shared.patch` deletes the § Showcase paragraph "The capture registry registers no frame for the light
and dark role rings…". This makes the § Tests sentence the single statement of the mode-token limit, as item 8
requires. § Showcase sits outside the owned § Tests.

## Deviation state and decisions

The unit did not stop. It made these ancillary decisions within its scope:

- **The outline check reads a differential, not a floor reading.** The menu item's strip lies on
  the menu's own surface, so the floor-based suppressed reading was non-zero:
  `the strip above the element varies with the outline suppressed` in `fh-journey-dark-1280-1.log.txt`. The
  reading is the fraction of the strip that differs between the painted frame and the suppressed frame. As a
  result, the `OutlineReading` pair became one number.
- **Lifts can be unpadded.** The `padded` lift option exists because the p-3 wrapper narrowed the Nav tabs
  specimen at light-390, and the open dropdown then covered the hovered tab. That run timed out in
  `fh-journey-light-390-1.log.txt`, and a probe's hit test named the item "Tabs by date". The captioned carousel
  stays padded: unpadded, the parked pointer entered its control at light-390, and the helper's watcher reported
  it in `fh-journey-light-390-2.log.txt`.
- **The dist artifacts were built in this worktree.** `npm run build:src:core` and `npm run build:src:styles` ran
  here, because `test:setup` reads `dist/src/styles/index.css` and `dist/src/core/index.js`. The build wrote only
  this worktree's ignored `dist/`.
- **Observation.** The first `test:setup` run timed out once, in the untouched `tests/setupServer.test.ts` case
  "records and reads official control state…". The command was `npm run test:setup`, and the result line was
  `Tests  1 failed | 312 passed (313)`. It passed on the later run.
