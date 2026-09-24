# FOCUS-FRAME (`ff`) report

Every focus scenario the journey placed with the `page` method is an element frame of its lifted specimen inside a padded wrapper. Each case holds the ring's reach and the declared region inside that frame. The capture runs at dark-1280 and light-390 pass. P3's causes, the radio group a copy joins and the pointer a mode switch leaves, both sit in the capture drive. Each has a failing-first proof and a fix. P2 found no cascade departure, so no SCSS partial changed. The dark skip link and list-group row lost their indicator because of the drive: after the mode switch's pointer press, the browser matches `:focus-visible` on a scripted focus but paints no `auto` outline. The release stylesheet does the same. Tab traversal restores the outline. Nothing stopped the unit. The ancillary choices and the observations for other owners come last.

## Touched files

- `/home/user/veneer-ff/tests/app/browser/integration.test.ts`: converts every focus page placement to an element frame of the lifted specimen in a `p-3` wrapper with `tabindex="-1"`. Each case releases the pointer, reaches focus with Tab, and asserts that the ring reach is greater than 0 and that no ring or region edge is cropped. The file also carries the P3 fixes and their proofs.
  - The resting cascade case drops the `name` attribute from each radio in the copy and asserts `switched`.
  - The grouped alignment focus case releases the pointer and runs a `mouseover` watcher.
  - The list-group focus frame moves onto the padded wrapper and is reached by Tab (P2).
  - The Primary focus frame moves out of the light and dark ring sweeps into a case of its own.
  - Filled fields collapse their Tab selection with an `{ArrowRight}` key press.
  - The ring reading waits for the ring transition (`waitForAnimations`) where a case lacked the wait.
  - The manifest records each case's reach.
- `/home/user/veneer-ff/tests/setup.ts`: adds the `FrameEdge` type, the `computeRingReach` helper, and the `computeCroppedEdges` helper, each with TSDoc. It also corrects the `SHOWCASE_KEYS` remark, which states that the arrival frame is the one page frame.
- `/home/user/veneer-ff/tests/setup.test.ts`: adds the helper proofs (shadow layers, color syntaxes, inset layers, outlines, combined rings, held and crossed edges) and extends the export list.

Diffstat against `e4a6d7c` (`git diff --stat`):

```text
 tests/app/browser/integration.test.ts | 1230 ++++++++++++++++++++++++---------
 tests/setup.test.ts                   |   90 +++
 tests/setup.ts                        |   82 ++-
 3 files changed, 1079 insertions(+), 323 deletions(-)
```

The status (`.orkestrel/veneer/units/ff-status.txt`) lists ` M` for the preceding files and nothing else. No SCSS partial, `tests/setupBrowser.ts` file, `app/**` file, or guide changed.

## P3: probe readings and fixes

**Column center loses its fill in the dark `vertical-group` frames.**

- Reading (probe `ff-radio.test.ts`, output `ff-out-P3-RADIO-*.json`): the named copy was checked when lifted. After the copy was removed, the original `#column-center` radio read `checked: false`, and its label's fill moved from `color(srgb 0.0264 0.2033 0.7349)` to the resting `oklab(0.41 -0.0222 -0.2130)`. A second copy clones unchecked. Control: with the copy's radio names removed, the original stays `checked: true`.
- Cause: the resting cascade case clones each specimen. The Vertical group copy carries radios named `column-alignment`, and inserting the copy's checked radio unchecks the specimen's own. The light pass leaves the specimen unchecked, and the dark pass then copies that state. Baseline frame `ff-baseline/vertical-group--dark-1280.png` shows the loss.
- Fix: each radio in the copy drops its `name` attribute before the copy is attached. Proof: the `switched` assertion requires every copy and its specimen to check the same controls before and after the lift.
  - Red: `light-1280|vertical-group`, exit 1.
  - Green: exit 0.
  - Final frames `ff-final/vertical-group--dark-1280.png` and `--light-390.png` show Column center filled.

**Row copy carries a hover face in `check-group-focus--dark-1280.png`.**

- Reading (probe `ff-hover.test.ts`, which places the real page frame at dark-1280):
  - With the pointer left after `applyTheme`, `:hover` held a showcase card chain before the shot, and the written frame shows Row copy hovered (`ff-probes/ff-hover-left-check-group-focus--dark-1280.png`).
  - With `releasePointer` called after the mode switch, nothing was hovered and the frame is clean (`ff-probes/ff-hover-released-...png`).
- Cause: the case's own `applyTheme` call presses the Dark mode control and leaves the pointer there. The page frame's staging then moves Row copy under the pointer.
- Fix: the case releases the pointer after the mode switch, and a `mouseover` watcher records every element of the subject the pointer enters during the shot.
  - Red: received `["Row copy"]`.
  - Green: exit 0.
  - After the conversion, the watcher's scope is the lifted specimen, and every converted focus case releases the pointer onto its wrapper's padding.
  - An earlier run scoped the watcher to the whole showcase and also caught the heading at the pointer's parked origin. That run and the narrowing are in the mutation log.

## P1: converted scenarios

Before: baseline capture at dark-1280 (`ff-baseline/`). After: final capture runs (`ff-final/`). Frames are in device pixels. Reach is the CSS-pixel distance the ring paints past the wearing element's box, read by the `computeRingReach` helper. Every case asserts that reach is greater than 0 and that `cropped` is `[]`, and the final runs at dark-1280 and light-390 passed those assertions.

In every before frame whose region x reads 0, the ring's left arm sat on the frame's edge. That was P1's finding.

| Scenario | Before dark-1280 | After dark-1280 | After light-390 | Region in the after frame | Reach |
| --- | --- | --- | --- | --- | --- |
| `primary-focus` | 1280×800 page, region x 0 | 1280×67 | 390×67 | host | 3 |
| `valid-control-focus` | 1280×800 page, region x 0 | 1280×91 | 390×91 | control (its label sits over it) | 3 |
| `invalid-control-focus` | 1280×800 page, region x 0 | 1280×91 | 390×91 | control | 3 |
| `check-group-focus` | 1280×800 page | 1280×67 | 390×67 | checked label (ring worn by label) | 3 |
| `range-focus` | 1280×800 page, region x 0 | 1280×62 | 390×62 | specimen | withheld (thumb) |
| `form-floating-empty-focus` | 1280×800 page, region x 0 | 1280×90 | 390×90 | field | 3 |
| `form-select-base-focus` | 1280×800 page, region x 0 | 1280×70 | 390×70 | select | 3 |
| `form-control-text-focus` | 1280×800 page, region x 0 | 1280×70 | 390×70 | control | 3 |
| `close-control-focus` | 1280×800 page, region x 0 | 1280×56 | 390×56 | control | 4 |
| `form-check-box-focus` | 1280×800 page, region x 0 | 1280×58 | 390×58 | row; ring read on box | 3 |
| `input-group-button-focus` | 1280×800 page, region x 0 | 1280×70 | 390×70 | specimen; ring read on control | 3 |
| `nav-base-focus` | 1280×800 page, region x 0 | 1280×69 | 390×106 | link | 4 |
| `accordion-base-focus` | 1280×800 page, region x 0 | 1280×245 | 390×287 | specimen; ring read on button | 4 |
| `skip-link-focus` | 1280×800 page | 1280×53 | 390×74 | link (`auto` outline) | 2 |
| `navbar-collapsed-focus` | 1280×1803 page | 1280×88 | 390×88 | toggler | 4 |
| `default-focus-ring-focus` | 1280×800 page, region x 0 | 1280×53 | 390×53 | link | 3 |
| `focus-ring-roles-focus` | 1280×800 page | 1280×53 | 390×164 | danger link | 3 |
| `list-group-actions-focus` | 1280×115 element, unpadded, region x 0 | 1280×147 | 390×147 | row (`auto` outline) | 2 |

Readings behind the table:

- The `range-focus` ring paints on the thumb, whose computed style Chromium withholds. The `ff-range.test.ts` probe read `box-shadow` through the `::-webkit-slider-thumb` pseudo-element as `none`. The case asserts a reach of 0 on the host, and it holds the declared region inside the frame. The frame is the ring's evidence, and it shows the ring.
- The `showcase` scenario stays the one page frame.
- The declared regions sit inside their element frames in every scenario, including the region that is a label, a row, or a specimen. No scenario failed to hold its declared region.
- The `auto` outline reach of 2 (`1px` width plus `1px` offset) was measured from pixels, not assumed. The `ff-extent.test.ts` probe diffed a pair of capture frames: focused as painted, and focused with the outline removed inline. The skip link measured 1.59 to 2.00 CSS px past its box. The control, the Primary shadow ring, measured 3 against its declared `3px` spread.
- Acceptance check: the ring check reddens when a converted placement goes back on the unpadded specimen. In the text control case, changing `const shot: HTMLElement = lifted` to `specimen` failed with `cropped` equal to `["top","right","bottom","left"]`. Restored, the case passes.

## P2: dark indicators, Veneer against the release

Readings come from the `ff-indicator.test.ts` probe: Veneer in the mounted showcase, and the release's `bootstrap/dist/css/bootstrap.css` stylesheet (5.3.8) in a same-origin iframe carrying the same markup. They were taken under keyboard focus. Ring ratios come from the journey manifests (the `readRing` function), and the release ratios are computed with the WCAG formula from the release's composite over its canvas.

| Subject | Mode | Veneer | Release |
| --- | --- | --- | --- |
| Valid control | light | `rgba(0, 130, 54, 0.25) 0 0 0 3px`, border `oklch(0.527 0.154 150.069)`, ratio 1.425 | `rgba(25, 135, 84, 0.25) 0 0 0 4px`, border `rgb(25, 135, 84)`, ratio 1.390 |
| Valid control | dark | same shadow, border `oklab(0.6476 -0.0944 0.0500)`, ratio 1.282 | same shadow, border `rgb(117, 183, 152)`, ratio 1.312 |
| Invalid control | light | `rgba(193, 0, 7, 0.25) 0 0 0 3px`, border `oklch(0.505 0.213 27.518)`, ratio 1.624 | `rgba(220, 53, 69, 0.25) 0 0 0 4px`, border `rgb(220, 53, 69)`, ratio 1.446 |
| Invalid control | dark | same shadow, border `oklab(0.6322 0.1313 0.0651)`, ratio 1.112 | same shadow, border `rgb(234, 134, 143)`, ratio 1.248 |
| Skip link | light and dark | `outline: auto 1px`, offset `1px`, color `rgb(16, 16, 16)`, no shadow | identical |
| List-group action row | light | `auto 1px` outline plus fill `rgb(248, 249, 250)` | identical |
| List-group action row | dark | `auto 1px` outline plus fill `color(srgb 0.1667 0.1863 0.2059)` | `auto 1px` outline plus fill `rgb(43, 48, 53)` |

Rulings:

- **Valid and invalid controls: Veneer matches the release.** The rule is the release's own formula, a 25% role triplet ring. Its width reads the `--vn-focus-width` token (3px against 4px), and the guide already records those rows as `tokenized`. Against a dark canvas the ring reads about 1.1 to 1.3 in Veneer and in the release. The lower dark invalid ratio (1.112 against 1.248) follows the recorded palette departures: Veneer's darker `danger` triplet and darker dark canvas, which P7's E-ELEMENTS ruling owns. No fix. The element frames (`ff-final/valid-control-focus--dark-1280.png` and `ff-final/invalid-control-focus--dark-1280.png`) are the evidence at resolution. The baseline page frame cropped the ring's left arm.
- **Skip link and list-group action row: the computed paint is identical to the release's. The missing dark indicator came from the drive, not the cascade.** The two-frame pixel diff (`ff-release-extent.test.ts`, release stylesheet alone) measured the differing pixels that the outline paints:

  | Drive | Light | Dark |
  | --- | --- | --- |
  | No pointer press | 768 | 1160 |
  | Pointer press, then scripted focus plus a Shift press | 0 | 0 |
  | Pointer press, then Tab | 768 | 1160 |

  `:focus-visible` matched in every row. Veneer behaves the same way: in dark, 0 differing pixels for the `auto` outline, while an inline `2px solid` outline painted. Only dark runs press a button (the mode switch), which is why only the dark frames lost the indicator. Fix, in the owned cases: the skip link and the list-group row are reached by Tab from the padded wrapper. The final frames `ff-final/skip-link-focus--dark-1280.png` and `ff-final/list-group-actions-focus--dark-1280.png` show the outline.
- The UTIL-FRAMES evidence the coordinator forwarded agrees with this cause. That unit's link-state case, at `/home/user/veneer-fu/tests/app/browser/integration.test.ts` around the `focusable-container-focus` placement, calls `applyTheme` (a press in dark runs), then `releasePointer`, then `link.focus()` and `{ArrowRight}`. Its frames (`/home/user/veneer-fu/tmp/capture/states/role-links-focus--dark-390.png` and `focusable-container-focus--dark-390.png`) show no outline while the reading is `auto 1px 1px rgb(16, 16, 16)`. That is the scripted-focus-after-press row of the preceding table: my probe used a Shift press after the scripted focus rather than ArrowRight, and read 0 differing pixels. The fix belongs in that unit's case (reach the link with Tab). No file of mine is involved, so this unit did not stop.
- No P2 fix changed an SCSS partial, so no style proof was added, and acceptance criterion 2's style-proof clause has no subject.

## Gates

| Command, exactly as run in `/home/user/veneer-ff` | Exit | Result line |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check tests/app/browser/integration.test.ts tests/setup.ts tests/setup.test.ts` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | no diagnostic printed |
| `npm run check` | 0 | no diagnostic printed (last step `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`) |
| `npm run test:setup` | 0 | `Tests  304 passed (304)` |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:dark-1280*"` | 0 | `Tests  47 passed (47)`, 343 s (`ff-capture-final4-dark-1280.log.txt`) |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:light-390*"` | 0 | `Tests  47 passed (47)`, 276 s (`ff-capture-final4-light-390.log.txt`) |
| `npm run test:guides` in the scratch copy `tmp/probe/ff-guides-copy` with `ff-shared.patch` applied | 0 | `Tests  19 passed (19)` (`ff-guides.log.txt`) |

- Every journey command ran with `PATH` carrying npm 11 and `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, through `.orkestrel/veneer/units/ff-instruments/ff-capture.sh`. `npm run build:src` ran first, with exit 0.
- Failing-first counts:
  - `npm run test:setup`: `Tests  5 failed | 299 passed (304)` before the helpers were implemented, and `304 passed` after.
  - Journey red and green runs: see the mutation log.
- The earlier capture runs at dark-1280 and light-390 also passed. They are superseded by the final runs because of later edits that added reach fields and ring-settle waits.
- The container load average stood near 12 to 13 during the later runs.

## Artifacts

- Mutation log: `/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mutations.log.txt`. It records the setup-helper mutations (each reddens only its named test), the radio red and green runs, the pointer red and green runs with the scope correction, the unpadded-placement mutation, and the helper failing-first run.
- Shared patch: `/home/user/scaffold/.orkestrel/veneer/units/ff-shared.patch`, against `e4a6d7c`, touching `guides/veneer.md` only. It changes the frame sentences in § Form control classes, § Form select classes, § Form check classes, § Form range classes (the frame shows the thumb's ring as its only evidence), and § Input group classes, and in § Tests. The § Tests changes cover the copy's radio names, the one page frame, the padded focus frame, the reach and crop reading, the pointer release, and the Tab drive with the `auto` outline finding. No ledger row changed.
- Diff and status: `/home/user/scaffold/.orkestrel/veneer/units/ff.diff` and `/home/user/scaffold/.orkestrel/veneer/units/ff-status.txt`.
- Frames:
  - `/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-baseline/` holds the before frames at dark-1280 and their manifest.
  - `/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-final/` holds the after frames and manifests at dark-1280 and light-390.
  - The full portfolio is in `/home/user/veneer-ff/tmp/capture/states`.
- Probe instruments and their outputs are retained in `/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-probes/`. The `tmp/probe/` directory is deleted.
  - The output of the release probe's still-against-press run was overwritten by its Tab run. The P2 table carries the still, the press, and the Tab readings.
  - The first pixel instrument used the tester's screenshot, which came back scaled to about 0.124 of CSS size. It was replaced by the two-capture-frame diff, and its control reads the declared 3px.

## Deviation state and ancillary choices

The unit did not stop, and it edited no off-limits file. It made these choices within scope:

- The padding depth is the `p-3` class (16px measured).
- The wrapper carries `tabindex="-1"`, so Tab traversal starts at the lifted specimen.
- The Primary focus frame is its own case, "rings the Primary host inside its lifted padded frame when Tab reaches it", so the frame is not placed twice from the sweep cases.
- The skip link is reached by a single `{Tab}` key press rather than by `traverseAccessible`, because the link renders at 1px until focused.
- Filled fields press `{ArrowRight}` to collapse the Tab selection, which appeared as a highlight in the first converted frames.
- `list-group-actions-focus` was not a page placement. It is converted because P2 names that row and its `auto` outline sits outside the row's box.

## Observations for other owners (report-only)

- **`tests/setupBrowser.ts` (off-limits).** For its owner:
  - The `FrameManager.page` method's remark "A page frame carries a focus state and never a pointer state" states a capability that no journey placement uses after this unit.
  - The `FrameRegion` interface lives there, so the `computeCroppedEdges` helper types its box structurally. Moving `FrameRegion` to `tests/setup.ts` would let the helper name it.
  - The lift-into-a-padded-wrapper block repeats across the converted cases. A single DOM helper there would hold it.
- **Unconverted scenarios (unverified).** The `dropdown-menu-focus` and `captioned-carousel-focus` scenarios are not page placements. They reach focus by a scripted `focus()` call after pointer drives, so in dark runs any `auto` outline they rely on may not paint. That is unverified. Their frames were not read against it.
- **UTIL-FRAMES link focus frames.** The `role-links-focus` and `focusable-container-focus` scenarios lose their `auto` outline in dark for the cause the P2 section describes. The carrier is UTIL-FRAMES.
- **Overlap with FORMS-FRAMES.** This unit rewrote the forms focus cases (validation, floating, select, text, check box, range, input group), so FORMS-FRAMES's edits to those cases merge three-way at landing. Any focus row FORMS-FRAMES adds to the floating or validation specimen tables goes through the converted loops.
