# Unit T5 report — element-frame staging and the sized decode refusal

Role and engine: `opus` on Opus 5.5, a native Claude subagent. Checkout `/home/user/test-tf`, branch
`unit/tf`, baseline `80c419e`. The only files touched are the owned files listed under "Changes",
and nothing is committed.

## Outcome

- **Staging (`T5-STAGE`).** Done. An element frame now stages the pane to the element's own bottom
  edge. A fixed `30vh` panel over a 1600-row document reads back 390x254 on the panel's own color.
  The unfixed code read back 480 rows.
- **Sized refusal (`T5-SIZE`).** Done. A PNG header over bytes that don't decode is refused with
  `…decodes: 40000x30000 device pixels`.
- **Scope addition.** Staging alone could not satisfy proof 2, so the unit adds a mechanism the brief
  did not name: the tester is lifted to the runner window's origin and composited for the shot. The
  unknowns explain why. The brief left the staging choice to the unit; this report records the
  choice for audit.
- **Gates.** Every acceptance criterion ran green except criterion 5. `npm run test:guides` needs a
  built `dist/`, and the permission floor bars a unit from running `npm run build`, whose `clean`
  step deletes `dist/`. See the gate table.

## Unknowns' readings

The unknowns were settled by probe blocks appended to the owned test file and run with
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "zzprobe"`.
A browser probe cannot go through the Node `probe` project. Each probe was removed afterward: the
test file was restored from a saved copy and checked byte-identical with `cmp`, and the probe frames
were deleted. On this host the runner's top-level window is 800x513 (`window.top.innerWidth` and
`window.top.innerHeight`), because Vitest sets no viewport while its UI is enabled
(`getContextOptions` sets `viewport = null` in `@vitest/browser-playwright`).

1. **Does the provider's element shot cover rows below the pane when the element ends below it?**
   No. With a declared 844-row pane, an element at document rows 1200 to 1300 shot with no
   restaging made the provider scroll the tester to 828 and centre the element. With the pane
   staged at 1300, the same element read back 390x100 on the runner's white. The cause is in
   Playwright's `screenshotElement` (`playwright-core/lib/coreBundle.js`): it passes
   `captureBeyondViewport: !fitsViewport`. An element that fits the 513-row window is therefore
   captured only where that window shows it. Readings:
   - An element at rows 0 to 100 read blue, which is correct.
   - An element at rows 600 to 700 of an 844-row pane read white.
   - Page frames are unaffected, because the body is taller than the window, so the capture goes
     beyond the viewport.

   The fix lifts the tester until the element sits at the window's origin. With the lift, an element
   at rows 1200 to 1300 reads 390x100 blue, and a transparent element reads the document's green.
2. **Does a fixed element's edge read as the pane's height at scroll 0?** Yes. A bottom-anchored
   `30vh` panel in an 844-row pane reads `getBoundingClientRect().bottom` of 844 at scroll 0. At
   scroll 404 the document-coordinate edge (`bottom + scrollY`) read 1248, so an element frame
   scrolls the tester to the top before it reads the edge.
3. **Additional finding: lifted fixed elements are culled unless the tester is composited.** Under
   a lift, a fixed element whose top lies past the window's height in the tester's own coordinates
   is culled from the shot. The shot then shows the document behind it. Bisection with the panel at
   the pane's bottom:
   - The panel painted at pane 720 (panel top 504).
   - The panel was culled at pane 760 (panel top 532) and at every larger pane up to 1000.
   - A lift applied through Playwright's `style` option or through a rule in the runner page gave
     the same result.
   - A transform lift and a negative-margin lift were also culled.

   Adding `will-change: transform` to the lifted tester painted the panel. A `translateZ(0)`
   transform, or a runner document taller than the lift, also painted it.
4. **Rejected route: the `style` screenshot option.** Playwright's `style` option would scope the
   lift to the shot, but `src/browser` compiles without the Playwright provider's type augmentation
   (`configs/src/tsconfig.browser.json`, peer `vitest` only). `tsc -p configs/src/tsconfig.browser.json`
   refused it with TS2769. So the lift is a style element written into the runner page, followed by
   two frames, and removed in `captureFrame`'s `finally` block.
5. **Beyond-viewport seam.** The final `captureFrame` was run with the probe block, which was then
   removed. A 700-row element, taller than the window, read 390x700 on its own red. An `80vh` fixed
   panel read 390x676 on its own blue.

## Changes

- `src/browser/helpers.ts`, the `captureFrame` function:
  - An element frame scrolls the tester to the top, then reads
    `ceil(element.getBoundingClientRect().bottom + scrollY)`, floored at `options.height`, in place
    of `measureContent`.
  - The growth-carrying loop was restructured to a single reading site. The page-frame arithmetic,
    the `CAPTURE_STAGINGS` bound, and the refusal text are unchanged.
  - An element frame appends a lift rule (`top`/`left` at the negated element box, and
    `will-change:transform`) to the runner page, waits two frames, and removes the rule in the
    `finally` block.
  - The TSDoc remarks were updated.
- `src/browser/helpers.ts`, the `readFrame` function: on a decode failure, the first 24 bytes are
  read from the base64 content. When they carry the PNG signature and `IHDR`, the refusal appends
  `: <w>x<h> device pixels`, read as big-endian `uint32` values at bytes 16 and 20. Otherwise the
  text is unchanged. The TSDoc remarks were updated.
- `tests/src/browser/helpers.test.ts`, the `captureFrame` group gains two cases:
  - "shoots a fixed viewport-height panel at the declared pane rather than at the document height"
  - "shoots an element that ends below the declared pane whole, on the document floor"
- `tests/src/browser/helpers.test.ts`, the `readFrame` group:
  - Gains the case "names the size a PNG header declares when the image under it does not decode".
  - The non-PNG refusal is tightened to an exact-message assertion.
- `guides/test.md`:
  - The page-frame paragraph is qualified with "A page frame".
  - An element-frame paragraph is added.
  - The `readFrame` paragraph gains the sized refusal.
  - A voice-table row is added.
  - The driven-refusals sentence is reworded without a count.
  - The layout rule and the coverage list are updated.
  - The Surface rows are unchanged, because the first TSDoc sentences are unchanged.

`src/browser/types.ts` and `src/browser/constants.ts` are untouched: the contract needed no change
and no constant was added.

## Proofs

The red and green commands for each proof are the brief's baseline command:
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "captureFrame|readFrame"`.

- **Baseline, before any edit:** 12 passed, 334 skipped.
- **Red, before the fix:** 3 failed, 12 passed, 334 skipped. The run was repeated with the final
  tests against `git show HEAD:src/browser/helpers.ts` and gave the same count.
  - The fixed panel read `expected 480 to be 254`.
  - The element below the pane read `expected 'rgb(255, 255, 255)' to be 'rgb(0, 128, 0)'`.
  - The PNG header case received the bare message.
- **Green, after the fix:** 15 passed, 334 skipped.
- **Page frame:** the existing `captureFrame` and `readFrame` cases stay green in both runs.

## Mutations

Each mutation was run with the same command and then reverted, and the revert was confirmed with
`cmp`. Each mutation reddened only the named proof, and the assertions distinguish every mutation
from the passing case.

| Mutation                                              | Reddens                                   | Count                 |
| ----------------------------------------------------- | ----------------------------------------- | --------------------- |
| Drop the scroll to the top                            | fixed panel, whose height grows from 254  | 1 failed, 14 passed   |
| Drop `will-change:transform`                          | fixed panel, whose floor is not the panel | 1 failed, 14 passed   |
| Drop the lift                                         | fixed panel and the element below the pane | 2 failed, 13 passed  |
| Element edge replaced by `measureContent`             | fixed panel: 254 or 480                   | 1 failed, 14 passed   |
| Size branch unreachable                               | the PNG header case                       | 1 failed, 14 passed   |
| Size appended to the bare refusal                     | the no-image case, by exact message       | 1 failed, 14 passed   |

The element-below-pane proof needs the element to lie past the runner's window. The fixture reads
`window.top.innerHeight` and places the element past both the window and the pane, so the proof
does not depend on the host's window size.

## Gate table

| Command                                                                                                   | Exit | Result line                                                               |
| --------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------------- |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned files                                           | 0    | `All matched files use the correct format.`                               |
| `npm run lint:check`                                                                                      | 0    | No diagnostics                                                            |
| `npm run check`                                                                                           | 0    | Root and all three `check:src` projects clean                             |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts` | 0 | `Tests  347 passed \| 2 expected fail (349)` |
| `npm run test:guides`                                                                                     | 1    | `ERR_MODULE_NOT_FOUND … dist/src/server/index.js`                         |
| `npm run test:src:browser`                                                                                | 0    | `Tests  401 passed \| 2 expected fail (403)`, duration 46.39 s            |

The `npm run test:guides` failure is a standing condition, not a finding. `tests/guides.test.ts`
imports `@orkestrel/test/server`, which resolves to the built `dist/`, and this checkout has no
`dist/`. `npm run build` runs `npm run clean` and rebuilds `dist/` across the tree, which the unit
may not do. To settle criterion 5, run `npm run build && npm run test:guides` from the host after
the unit exits.

## Evidence files

- `/home/user/test-tf/tmp/units/t5.diff`, the `git diff` output. Diffstat: 3 files changed, 168
  insertions, 23 deletions.
- `/home/user/test-tf/tmp/units/t5-status.txt`, the `git status --short` output: `M` on
  `guides/test.md`, `src/browser/helpers.ts`, and `tests/src/browser/helpers.test.ts`.

## Deviation state

- **Stop condition:** none reached. The element shot can cover a region below the pane when the
  pane is staged and the tester is lifted.
- **Scope addition:** the lift and compositing mechanism in `captureFrame`. It is required by proof
  2 and is an implementation choice inside owned files, recorded here for audit.
- **Shared-file patches:** none.
- **Observation for the page-frame path, outside this unit's scope:** `measureContent` also adds
  `scrollY` to a fixed element's rectangle. So a page frame read from a scrolled tester can
  overshoot for a fixed element, in the same way the element path did before its scroll to the top.
  This was not measured; this unit left the page path unchanged.
- **Observation on host dependence:** the runner window's size (800x513 here) depends on the host,
  so the lift matters only where an element lies past that window.
