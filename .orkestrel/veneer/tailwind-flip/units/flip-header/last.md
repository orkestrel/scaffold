Stopped under the brief’s deviation contract. The changes are uncommitted, and the task is incomplete.

Expected: no header box or computed longhand differs between faces. Found: at 1280 × 800, all header boxes match, but each Tailwind face has **94 longhand departures**: inherited `tab-size` changes from `8` to `4`, and zero-width border styles change from `none` to `solid`. The registry and Bootstrap CSS contain no `tab-size` rule. Satisfying strict equality requires changing the authorized scope or criterion.

Evidence is in [P4 output](/home/user/veneer/tmp/units/flip-header/out/p4.json), [P4 error](/home/user/veneer/tmp/units/flip-header/p4-first.err), and the [diff](/home/user/veneer/tmp/units/flip-header/changes.diff). Hypothesis: the strict longhand criterion includes preflight defaults that the earlier chrome partition admitted as invisible departures.

The complete report, including the case-by-case disposition and artifact inventory, is [report.md](/home/user/veneer/tmp/units/flip-header/report.md).

Measurements and implementation status:

| Reading | Result |
|---|---|
| Header at 1280 × 800 | 1280 × 48 px; 94% remains for content |
| Cross-face header boxes at 1280 | Zero departures |
| Header position/top/z-index/background and geometry | Passing case across faces, both modes, 390 and 1280 |
| Planted `px-3` control | Detected |
| Hidden status perception and button contrast | Passing |
| Exact 390 px boxes and content share | Not recorded; P4 stopped at 1280 |
| P4 second run and `cmp` | Not run |
| 768 px single-row layout | Implemented; unverified |

At 1280, the boxes are `(x, y, width, height)` in CSS pixels:

| Subject | Box |
|---|---|
| Stylesheets | `(803.515625, 8, 353.296875, 31)` |
| Bootstrap | `(803.515625, 8, 86.234375, 31)` |
| Tailwind, no layer | `(888.75, 8, 139.609375, 31)` |
| Tailwind + layer | `(1027.359375, 8, 129.453125, 31)` |
| Color mode | `(1164.8125, 8, 103.1875, 31)` |
| Light | `(1164.8125, 8, 52.953125, 31)` |
| Dark | `(1216.765625, 8, 51.234375, 31)` |

Both groups read `buttonsWrap=false` and `overflow=false`. Every button reads `textWrap=false`.

`Showcase` observes the header’s border box and writes root `scroll-padding-top` as header height plus 8 px. It writes the sticky contents’ `top` and `max-height`; `destroy` disconnects the observer and restores the original root inline style. The passing scroll case checks first and deep contents targets at both widths under every face, with an 8 px gap, and checks sticky contents alignment at 1280. Its absolute coordinates were not retained in the Vitest log.

The Bootstrap before/after chrome replacement portion of P4 records zero forbidden departures and zero box departures. Strict cross-face header longhand equality fails; full-page cross-face equality is not established.

The case changes are recorded by exact title in [report.md](/home/user/veneer/tmp/units/flip-header/report.md). They include:

- **Showcase.test.ts:** amended label/status consumers and root-style restoration; added `keeps the compact sticky header neutral under every face at narrow and wide viewports` and `lands first and deep contents headings below the sticky header after a viewport resize`. Lifecycle, pairwise transitions, contrast, and placeholder-navigation cases remain.
- **constants.test.ts:** amended `labels the stylesheet and color-mode buttons and titles the page`.
- **helpers.test.ts:** amended `names the face by its button label and the color mode by its value`.
- **factories.test.ts:** amended `builds the skip link, banner, controls, contents region, and main landmark`, including the planted/removed gap-class control. Registry, no-inline-style, status, and contents cases remain.
- **integration.test.ts:** amended J1’s labels and height/button readings, J2’s labels, and the disabled-control refusal case’s labels. J4, J6, partition, paired engine states, and header statecharts remain; they were not rerun.
- **setupBrowser.test.ts:** amended pressed-label readings, ambiguous-face fixtures, and the absent-button refusal message. Other showcase helper cases remain.
- **sections/integration.test.ts:** unchanged. No case was deleted.

Strings for U7b:

- Labels: `Bootstrap`; `Tailwind, no layer`; `Tailwind + layer`.
- Status example: `Tailwind + layer, dark color mode`.
- Brand: `Veneer` beside `Bootstrap 5.3.8`; heading accessible name remains `Veneer`.
- At 390 px: compact sticky toolbar, brand/version line followed by wrapping Stylesheets and Color mode groups; visually hidden status.
- At 768 px and wider: brand left and groups right on one row; rendering at 768 remains unverified.

No guide or copy-document prose was edited. The old-label sweep finds only the expressly retained Bootstrap-only prose in the Tailwind section.

Run results:

| Command/run | Exit |
|---|---:|
| Baseline `test:app:browser` — 234 passed | 0 |
| Baseline `test:setup:browser` — 134 passed | 0 |
| Focused constants/factories/helpers/Showcase — placeholder-navigation scroll assertion failed | 1 |
| Initial observer cases — neutrality timeout and offset wait failure | 1 |
| Repeated Showcase file — 19 passed | 0 |
| `build:app:browser` | 0 |
| P4 | 1 |
| Formatting explicitly listed owned files | 0 |
| `git diff --check` | 0 |
| Bootstrap digest comparison | Match |

P4’s exact error is:

```text
Error: P4 expectation failed at 1280; see out/p4.json
```

Stopped before `check`, `lint:check`, `format:check`, final app/setup suites, `build`, `build:showcase`, `test:journey`, second P4 run, and `cmp`. Skip reason: the strict P4 criterion conflicts with the permitted registry/stylesheet scope. No journey failing title was observed or classified in this unit; J6 and statechart scroll effects remain unverified.

`showcase/browser.html` was **not rebuilt**. Its before/after SHA-256 remains:

```text
2332e9458dc3eef3574c207d32b39f72d950ac1213073c4613e3f403c7612699
```

Its retained stamp is:

```html
<meta name="build-id" content="dfe758b71986a10d0c72c5c1b3962ed15923c644b2016e5f924b1163fe24b132" />
```

The Bootstrap digest remains:

```text
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f
```

All unit artifacts are under `/home/user/veneer/tmp/units/flip-header/`: `browser.ts`, `lib.ts`, `types.ts`, `p4.ts`, `labels.ts`, `read-p4.ts`, `report.md`, `changes.diff`, `chromium.txt`, `out/p4.json`, and the `.log`, `.err`, and `.log.pid` files for `baseline-app`, `baseline-setup`, `header-cases`, `observer-cases`, `observer-cases-2`, `build-app`, and `p4-first`.

Final `git status --porcelain`:

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/factories.ts
 M app/browser/helpers.ts
 M app/browser/sections/tailwindcss.html
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/constants.test.ts
 M tests/app/browser/factories.test.ts
 M tests/app/browser/helpers.test.ts
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

The falsify lane’s files under `tmp/units/flip-falsify/` are not mine and remain untouched. None appears in the porcelain status.