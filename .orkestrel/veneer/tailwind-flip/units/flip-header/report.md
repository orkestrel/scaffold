Unit `flip-header` remains incomplete: the journey produced a failure outside the named host-bound set, which triggers the brief's deviation stop. Nothing is committed. The header implementation, revised neutrality case, browser/setup tests, and builds are complete. The P4 reruns and byte comparison are not run.

Expected: every journey failure belongs to § Host-bound set in `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md`. Found: the dark-1280 paired-engine case reads a dropdown's `data-popper-placement` as `top-start` against the baseline's `bottom-start`. Its serialized inline style is unchanged. Evidence: `journey-2.err:7`, with the assertion at `tests/app/browser/integration.test.ts:954`. This title is absent from the host-bound set. Hypothesis, unverified: the scroll padding changes the trigger's viewport position enough to select a different placement fallback. No engine repair or focused repeat is attempted after the stop.

The rendered measurements from `gates-2.log` and `journey-2.log` are:

| Viewport | Header box (x, y, width, height), CSS px | Content height share |
| --- | --- | --- |
| 390 × 844 | 0, 0, 390, 116 | 86.26% |
| 1280 × 800 | height 48; sticky bottom 48 | 94% |

The 390px journey records the same header and button boxes in light and dark. Each button is one line high:

| Button | x | y | Width | Height |
| --- | ---: | ---: | ---: | ---: |
| Bootstrap | 12 | 37 | 86.234375 | 31 |
| Tailwind, no layer | 97.234375 | 37 | 139.609375 | 31 |
| Tailwind + layer | 235.84375 | 37 | 129.453125 | 31 |
| Light | 12 | 76 | 52.953125 | 31 |
| Dark | 63.953125 | 76 | 51.234375 | 31 |

The Stylesheets group box is `(12, 37, 353.296875, 31)`. Its buttons share one row and its right edge is 365.296875px, inside the viewport. The Color mode buttons share y=76 and span x=12 through 115.1875; their enclosing span is `(12, 76, 103.1875, 31)`, derived from the measured buttons, not a direct group-box reading. Neither group has wrapping buttons or buttons outside the viewport. The P4 `buttonsWrap` and `overflow` fields, a direct Color mode group box, and the 768px header reading remain unrecorded.

The `ResizeObserver` sets root `scroll-padding-top` to the header height plus 8px, the sticky contents `top` to the header height, and its `max-height` to the remaining viewport height. `destroy` disconnects the observer and restores the prior root style attribute, including absence and an important prior scroll-padding value. The section headings read as follows after real contents clicks; fractional native scrolling stays within the case's 1px tolerance:

| Width | Face | Containers top | Tailwind on Bootstrap markup top | Header bottom |
| --- | --- | ---: | ---: | ---: |
| 1280 | Bootstrap | 55.59375 | 55.59375 | 48 |
| 1280 | Tailwind, no layer | 55.59375 | 56.34375 | 48 |
| 1280 | Tailwind + layer | 55.59375 | 55.859375 | 48 |
| 390 | Bootstrap | 124.765625 | 123.875 | 116 |
| 390 | Tailwind, no layer | 124.765625 | 124.34375 | 116 |
| 390 | Tailwind + layer | 123.765625 | 123.75 | 116 |

At 1280 the sticky contents top is 48px under every face, equal to the header bottom, and its bottom is 800px. Removing scroll padding exposes a covered heading and fails the positive criterion. The setup's native-scroll case also follows the header-plus-8px landing. J6 passes in the journey. The paired-engine dropdown placement is the unresolved changed reading.

The revised Showcase neutrality case passes at 390 and 1280, in light and dark, over every face: zero box departures and zero remaining longhand departures after its declared exclusions. The planted `px-3` is detected through `padding-left` and geometry; removal restores equality. Selection, status, pointer, and focus are normalized before comparison. The existing chrome reader gains a banner-only option so this matrix avoids repeatedly reading the entire contents tree.

The P4 copy is adapted to record excluded counts by class and longhand, remaining departures, mobile geometry, scroll positions, and the 768px header. It has not been executed in this continuation. Excluded-longhand counts at both widths, the P4 result, and byte identity therefore remain unverified. `out/p4.json` is the first run's stale, strict-comparison output; it is not evidence of a passing rerun under this ruling.

The acceptance commands ran in the following order:

| Command | Exit | Result |
| --- | ---: | --- |
| `npm run check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run format:check` | 0 | Passed |
| `npm run test:app:browser` | 0 | 236 passed |
| `npm run test:setup:browser` | 0 | 134 passed |
| `npm run build` | 0 | Passed, including `build:app:browser` |
| `npm run build:showcase` | 0 | Rebuilt `showcase/browser.html` |
| `npm run test:journey` | 1 | 86 passed, 3 failed, 3 skipped; Vitest 501.94s, launcher 503.517s |
| P4 twice, then `cmp` | — | Not run: journey failure outside the host-bound set triggers the deviation stop |
| `git diff --check` | 0 | Passed; final read-only evidence |
| `sha256sum dist/src/bootstrap/index.css` | 0 | Required digest unchanged |

Every journey failure is classified against the named host-bound set:

- **Outside the set:** `showcase matrix > compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover`, dark-1280. Error: `AssertionError: dropdown: expected [ …(231) ] to deeply equal [ …(231) ]`. The differing field is `bottom-start` versus `top-start` on the shown dropdown menu. This is the stop.
- **In the set:** `showcase journeys > J8 drives the engine through the component sections and opens nothing on arrival`, light-390. Error: `Named region "Uploads" is not visible`.
- **In the set:** `showcase statecharts > drives the 'accordion' table through its controls with motion=false`, light-390. The Enter bursts time out at 5000ms for Shipping and delivery, Warranty coverage, and Cancelling a plan; Cancelling a plan also fails from Adding seats. The harness reads 82 passed and 4 failed of 86 rows.

The shared-name partition passes with zero violations at 1280 and 390 over 1666 signatures per width, and all planted/removed controls detect their departures. The three skips are the other variants of `partitions the shared names under the three faces at both widths`, selected by the retained `it.skipIf(VARIANT !== 'light-1280')`; the light-1280 invocation reads both widths. No case or retry is added to excuse a journey failure. Chromium is 141.0.7390.37.

The strings for U7b are:

- Labels, in order: `Bootstrap`; `Tailwind, no layer`; `Tailwind + layer`.
- Status example: `Tailwind + layer, dark color mode`; the named status remains visually hidden.
- Brand: `Veneer` beside `Bootstrap 5.3.8`; the h1 accessible name stays exactly `Veneer`.
- At 390px: a compact sticky toolbar, brand/version line first, Stylesheets and Color mode groups wrapping below it.
- At 768px and wider: intended one-row layout with the brand left and groups right; 1280 is measured, 768 remains unverified.
- Native anchors reserve header height plus 8px; sticky contents reserve the header height.
- Guide style wording must distinguish detached factory markup from the observer's runtime root and contents styles.

No guide or copy-document prose is edited. The old-label sweep across `app` and `tests` finds only the retained `Bootstrap only` specimen prose in `app/browser/sections/tailwindcss.html`; neither old Tailwind label nor `on Veneer CSS` remains.

The artifact digests are:

- Showcase before: `2332e9458dc3eef3574c207d32b39f72d950ac1213073c4613e3f403c7612699`.
- Showcase after: `db52837f85eead1457a0504e85e551dd981245c7fabbf1c1d464eec1241e48e4`.
- Build-id line: `<meta name="build-id" content="4e30051b2b309cfef02bc0dafbc528adf2f9ebc1ebe14d302c1522fd6b8df3e1" />`.
- Bootstrap before and after: `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.

No `src/**` or `app/browser/recipe.json` change appears in the diff. The actual diff is retained as `tmp/units/flip-header/changes-2.diff`. The diagnostic runs before the final gate sequence remain in the unit directory; the final focused Showcase run passes 19 tests. The prior report is preserved as `report-first.md`.

The following cases change for the header. No case is deleted.

`tests/app/browser/Showcase.test.ts`:

- Amended `mounts the page under the Bootstrap face and the light color mode`: labels and status.
- Amended `holds the recipe compile alone under the tailwindcss face`: labels and status.
- Amended `inserts the unexcluded compile directly before the Bootstrap sheet under the unexcluded face`: labels and status.
- Kept `moves between every pair of faces through the Stylesheets buttons`: shared labels follow the header.
- Amended `leaves a host stylesheet in place under each face`: labels.
- Amended `writes the selected color mode to data-bs-theme on the root element`: labels and status.
- Amended `reads every header button at 4.5:1 or more, pressed or not, in both color modes`: labels; retained contrast assertions.
- Amended `restores the title, a %s data-bs-theme, the head, and the body on destroy`: reads root inline-style restoration, including an absent attribute and an important prior scroll-padding value.
- Added `keeps the compact sticky header neutral under every face at narrow and wide viewports`: boxes and computed longhands, declared neutrality exclusions, normalized selection and focus, planted and removed `px-3`, light and dark at 390 and 1280.
- Added `lands first and deep contents headings below the sticky header after a viewport resize`: first/deep targets, every face, both widths, sticky contents bounds, and removed scroll-padding control.
- Amended `ignores a click on the header of a destroyed mount, also after a second start`: labels and status.
- Amended `mounts a fresh page under the defaults on a second start after destroy`: labels.
- Amended `restarts a mounted page instead of mounting a second one`: labels.
- Kept toast ownership, dialog/toast engine behavior, placeholder-link/form/anchor behavior, main-region guard cleanup, and pagehide lifecycle cases.

`tests/app/browser/constants.test.ts`:

- Amended `labels the stylesheet and color-mode buttons and titles the page`: exact label literals.
- Kept every other case.

`tests/app/browser/helpers.test.ts`:

- Amended `names the face by its button label and the color mode by its value`: status literals under each face and mode.
- Kept every other case.

`tests/app/browser/factories.test.ts`:

- Amended `builds the skip link, banner, controls, contents region, and main landmark`: sticky classes, compact layout, labels, sibling version, hidden status, planted and removed gap-class control.
- Kept `presses %s and %s and reads them in the status line`, the registry/no-inline-style/unique-id case, the sticky contents overflow case, and every other case.

`tests/app/browser/integration.test.ts`:

- Amended `J1 arrives on the showcase and reads its header, state, and contents`: labels, mobile header bound, header/button boxes, and single-line button heights.
- Amended `J2 reaches the skip link, the five header buttons, the contents, and a specimen field by keyboard`: labels, retained order.
- Amended `refuses disabled and aria-disabled controls and the fieldset-disabled form`: face-button labels.
- Amended `reads the resolved values under its declared variant and partitions every departure of the tailwindcss face`: admits the observer's sticky contents element only after asserting its exact property names, top, and resolved maximum height; retains planted style-escape controls.
- Kept J3, J4, J6, paired engine-state readings, the partition proof, and face/color-mode/pair statecharts. Their shared labels and face-row names follow `tests/setupBrowser.ts`.

`tests/setupBrowser.test.ts`:

- Amended `reads the face and color mode the header buttons announce`: labels.
- Amended `refuses a face group that announces two faces or none, and an absent button`: fixture labels.
- Amended `refuses a name that selects no theme and a page that renders no button`: exact refusal label.
- Amended `detects chrome changes outside the specimen sections and restores normalization`: proves the banner-only reader agrees with the full reader and detects the planted outline-color departure.
- Amended `censuses controls, detects an occluded pointer route, and parks real hover`: native scroll landing follows the header bottom plus 8px.
- Kept every other case, including face/color-mode/pair scenario proofs.

`tests/app/browser/sections/integration.test.ts` stays unchanged.

The edited tracked paths and final `git status --porcelain` are:

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/factories.ts
 M app/browser/helpers.ts
 M app/browser/sections/tailwindcss.html
 M showcase/browser.html
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/constants.test.ts
 M tests/app/browser/factories.test.ts
 M tests/app/browser/helpers.test.ts
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

Every file under `tmp/units/flip-header/` is listed below. The falsify lane's ignored files under `tmp/units/flip-falsify/` are not this unit's and remain untouched; no falsify path appears in status.

```text
baseline-app.err
baseline-app.log
baseline-app.log.pid
baseline-setup.err
baseline-setup.log
baseline-setup.log.pid
browser.ts
build-app.err
build-app.log
build-app.log.pid
cases-2.md
changes-2.diff
changes.diff
check-2.err
check-2.log
check-2.log.pid
chromium.txt
files-2.txt
gates-2.err
gates-2.json
gates-2.log
gates-2.log.pid
gates-2.ts
header-cases.err
header-cases.log
header-cases.log.pid
journey-2.err
journey-2.log
journey-2.log.pid
labels.ts
lib.ts
lint-2.err
lint-2.log
lint-2.log.pid
neutrality-2.err
neutrality-2.log
neutrality-2.log.pid
neutrality-3.err
neutrality-3.log
neutrality-3.log.pid
neutrality-4.err
neutrality-4.log
neutrality-4.log.pid
observer-cases-2.err
observer-cases-2.log
observer-cases-2.log.pid
observer-cases.err
observer-cases.log
observer-cases.log.pid
out/p4.json
p4-first.err
p4-first.log
p4-first.log.pid
p4-repeat.ts
p4.ts
read-p4.ts
record-report-2.ts
report-body-2.md
report-first.md
report.md
types.ts
```
