Unit `flip-header` is **incomplete and stopped under the deviation contract**. The journey found a failure outside the named host-bound set. Nothing is committed.

The complete report is saved in [report.md](/home/user/veneer/tmp/units/flip-header/report.md), with the [actual diff](/home/user/veneer/tmp/units/flip-header/changes-2.diff).

The stopping failure is:

- **Title:** `showcase matrix > compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover`
- **Variant:** dark-1280.
- **Expected:** equal dropdown engine output across faces.
- **Found:** `data-popper-placement` changes from `bottom-start` to `top-start`; the serialized inline style is unchanged.
- **Evidence:** [journey diagnostics](/home/user/veneer/tmp/units/flip-header/journey-2.err:7), assertion at [integration.test.ts](/home/user/veneer/tests/app/browser/integration.test.ts:954).
- **Classification:** outside § Host-bound set.
- **Hypothesis, unverified:** scroll padding changes the trigger’s viewport position enough to select a different placement fallback.

No engine repair or repeat was attempted after the stop.

The recorded header measurements are:

| Viewport | Header height | Viewport height left for content |
|---|---:|---:|
| 390 × 844 | 116px | 86.26% |
| 1280 × 800 | 48px | 94% |

The 390px journey records identical button boxes in light and dark. Coordinates are CSS pixels:

| Button | x | y | Width | Height |
|---|---:|---:|---:|---:|
| Bootstrap | 12 | 37 | 86.234375 | 31 |
| Tailwind, no layer | 97.234375 | 37 | 139.609375 | 31 |
| Tailwind + layer | 235.84375 | 37 | 129.453125 | 31 |
| Light | 12 | 76 | 52.953125 | 31 |
| Dark | 63.953125 | 76 | 51.234375 | 31 |

The Stylesheets group box is `(12, 37, 353.296875, 31)`. The Color mode buttons span `(12, 76, 103.1875, 31)`; this is derived from their measured boxes, not a direct group measurement. Buttons share a row within each group, stay inside the viewport, and have single-line heights. The direct Color mode group box, P4 `buttonsWrap`/`overflow` fields, and 768px header measurement remain unrecorded.

The observer writes root scroll padding equal to header height plus 8px, and the sticky contents’ `top` and `max-height`. Destruction disconnects the observer and restores the prior root style. Recorded contents-click landings are:

| Width | Face | First heading top | Deep heading top | Header bottom |
|---|---|---:|---:|---:|
| 1280 | Bootstrap | 55.59375 | 55.59375 | 48 |
| 1280 | Tailwind, no layer | 55.59375 | 56.34375 | 48 |
| 1280 | Tailwind + layer | 55.59375 | 55.859375 | 48 |
| 390 | Bootstrap | 124.765625 | 123.875 | 116 |
| 390 | Tailwind, no layer | 124.765625 | 124.34375 | 116 |
| 390 | Tailwind + layer | 123.765625 | 123.75 | 116 |

The headings are `Containers` and `Tailwind on Bootstrap markup`. Every landing is within the test’s 1px tolerance of the required 8px gap. At 1280, sticky contents starts at 48px and ends at 800px. Removing scroll padding exposes a covered heading.

The revised neutrality test passes at both widths and in both color modes: **zero box departures and zero remaining longhand departures** after its declared exclusions. The planted `px-3` produces a padding and geometry departure; removal restores equality.

The P4 copy is adapted but **not executed in this continuation**. Excluded-longhand counts per width, P4 results, and byte identity remain unverified. `out/p4.json` remains the first run’s stale strict-comparison output.

The acceptance results, in order, are:

| Command | Exit | Result |
|---|---:|---|
| `npm run check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run format:check` | 0 | Passed |
| `npm run test:app:browser` | 0 | 236 passed |
| `npm run test:setup:browser` | 0 | 134 passed |
| `npm run build` | 0 | Passed |
| `npm run build:showcase` | 0 | Rebuilt |
| `npm run test:journey` | 1 | 86 passed, 3 failed, 3 skipped |
| P4 twice, then `cmp` | — | Not run: mandatory journey deviation stop |
| `git diff --check` | 0 | Passed |
| `sha256sum dist/src/bootstrap/index.css` | 0 | Required digest unchanged |

The journey took 501.94s according to Vitest, 503.517s according to the launcher. Every failing title is classified:

| Variant | Failing title | Classification |
|---|---|---|
| dark-1280 | `compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover` | **Outside the set**; dropdown placement discrepancy described above |
| light-390 | `J8 drives the engine through the component sections and opens nothing on arrival` | **In the set**; `Named region "Uploads" is not visible` |
| light-390 | `drives the 'accordion' table through its controls with motion=false` | **In the set**; Enter-burst waits exceed 5000ms; harness reports 82 passed and 4 failed of 86 rows |

The shared-name partition passed at both widths with zero violations over 1666 signatures and effective controls. The three skips are the other variants of `partitions the shared names under the three faces at both widths`, under the retained `it.skipIf(VARIANT !== 'light-1280')`; its light-1280 invocation covers both widths. J6 passed. Chromium was 141.0.7390.37.

The case changes are recorded fully in [cases-2.md](/home/user/veneer/tmp/units/flip-header/cases-2.md). No case was deleted:

- **`tests/app/browser/Showcase.test.ts` — amended:** `mounts the page under the Bootstrap face and the light color mode`; `holds the recipe compile alone under the tailwindcss face`; `inserts the unexcluded compile directly before the Bootstrap sheet under the unexcluded face`; `leaves a host stylesheet in place under each face`; `writes the selected color mode to data-bs-theme on the root element`; `reads every header button at 4.5:1 or more, pressed or not, in both color modes`; `restores the title, a %s data-bs-theme, the head, and the body on destroy`; `ignores a click on the header of a destroyed mount, also after a second start`; `mounts a fresh page under the defaults on a second start after destroy`; `restarts a mounted page instead of mounting a second one`. Changes cover labels, status, and root-style restoration.
- **Same file — added:** `keeps the compact sticky header neutral under every face at narrow and wide viewports`; `lands first and deep contents headings below the sticky header after a viewport resize`. Both retain effective controls.
- **`tests/app/browser/constants.test.ts` — amended:** `labels the stylesheet and color-mode buttons and titles the page`.
- **`tests/app/browser/helpers.test.ts` — amended:** `names the face by its button label and the color mode by its value`.
- **`tests/app/browser/factories.test.ts` — amended:** `builds the skip link, banner, controls, contents region, and main landmark`, covering compact classes, hidden status, brand/version, labels, and the gap-class control.
- **`tests/app/browser/integration.test.ts` — amended:** J1 header measurements; J2 labels and keyboard order; `refuses disabled and aria-disabled controls and the fieldset-disabled form`; `reads the resolved values under its declared variant and partitions every departure of the tailwindcss face`, which admits only the checked observer-generated contents styles and retains style-escape controls.
- **`tests/setupBrowser.test.ts` — amended:** `reads the face and color mode the header buttons announce`; `refuses a face group that announces two faces or none, and an absent button`; `refuses a name that selects no theme and a page that renders no button`; `detects chrome changes outside the specimen sections and restores normalization`; `censuses controls, detects an occluded pointer route, and parks real hover`. Changes cover labels, the banner-only reader, and the scroll offset.
- **Kept:** other cases, including contrast, face transitions, lifecycle, factory registry/no-inline-style checks, J3/J4/J6, paired-engine readings, partition, and header statecharts. `tests/app/browser/sections/integration.test.ts` is unchanged.

The strings for U7b are:

- Labels: `Bootstrap`; `Tailwind, no layer`; `Tailwind + layer`.
- Status example: `Tailwind + layer, dark color mode`, visually hidden.
- Brand: `Veneer` beside `Bootstrap 5.3.8`; h1 accessible name remains `Veneer`.
- At 390px: compact sticky toolbar, brand/version first, Stylesheets and Color mode groups wrapping below.
- At 768px and wider: intended single row, brand left and groups right; measured at 1280, unverified at 768.
- Native anchors reserve header height plus 8px; sticky contents reserves header height.
- Guide style wording must distinguish detached factory markup from observer-generated runtime styles.

No guide or copy-document prose changed. The old-label sweep finds only retained `Bootstrap only` specimen prose; neither old Tailwind label nor `on Veneer CSS` remains.

The digests are:

```text
showcase/browser.html before:
2332e9458dc3eef3574c207d32b39f72d950ac1213073c4613e3f403c7612699

showcase/browser.html after:
db52837f85eead1457a0504e85e551dd981245c7fabbf1c1d464eec1241e48e4

dist/src/bootstrap/index.css before and after:
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f
```

The rebuilt stamp is:

```html
<meta name="build-id" content="4e30051b2b309cfef02bc0dafbc528adf2f9ebc1ebe14d302c1522fd6b8df3e1" />
```

All unit artifacts are enumerated in [files-2.txt](/home/user/veneer/tmp/units/flip-header/files-2.txt). They include the report and preserved first report, case inventory, both diff files, P4 modules and unrun repeat script, gate script/results, Chromium version, stale P4 output, and logs/errors/PIDs for the baseline, focused tests, checks, builds, gates, and journey.

The final tracked status is:

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

`src/**` and `app/browser/recipe.json` are unchanged. The falsify lane’s ignored files are not this unit’s and remain untouched; none appears in status.