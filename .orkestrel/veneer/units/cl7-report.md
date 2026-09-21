CL7 is implemented from `c8f53f8` under `cl7-brief-2.md` and the unchanged portions of `cl7-brief.md`. The container key reads `shipped`. Every inventory selector ships; none is excluded or unaccounted for. The requested gate chain and Edge suites exit 0. Execution was direct, with no spawned agents and no commit.

The blast-radius readings are unchanged. The before and after density runs each exit 0 (`Tests 1 passed`); their logs are `cl7-space-before.log.txt` and `cl7-space-after.log`.

| Consumer | Before | After |
| --- | --- | --- |
| `src/core/constants.ts`, `TOKEN_NAMES.space[12]` | `--vn-space-12` | `--vn-space-12` |
| `tests/src/styles/tokens.test.ts`, density 1 | 24px | 24px |
| Same assertion, density 1.25 | 30px | 30px |

No style partial consumes that space member through a variable. No consumer moved, and the density proof needed no edit.

The following tokens sit beside the breakpoint tokens. Registry leaves are relative to `TOKEN_NAMES`.

| Token | Value | Registry leaf |
| --- | --- | --- |
| `--vn-container-sm` | 540px | `container.sm` |
| `--vn-container-md` | 720px | `container.md` |
| `--vn-container-lg` | 960px | `container.lg` |
| `--vn-container-xl` | 1140px | `container.xl` |
| `--vn-container-xxl` | 1320px | `container.xxl` |
| `--vn-gutter-x` | 1.5rem | `gutter.x` |
| `--vn-gutter-y` | 0 | `gutter.y` |

The component partial emits the following groups inside `@layer components`, loaded by the styles barrel.

| Group | Emission |
| --- | --- |
| Fluid shell | One grouped rule for `.container`, `.container-fluid`, and `.container-{sm,md,lg,xl,xxl}`; gutter aliases, full inline size, half-gutter inline padding, and automatic inline margins. |
| Breakpoint caps | A loop over `breakpoints()` skips `xs`, accumulates the named variants, and calls `breakpoint-up`. Each group reads its container token. The fluid variant never receives a cap. No ramp member changed. |
| Navigation combinators | One grouped rule for `.navbar >` each shell selector; flex display, inherited wrapping, centered alignment, and space-between justification. |

The compatibility ledger has a shipped selector row and separate shipped variable rows for `--bs-gutter-x` and `--bs-gutter-y`. `collectShippedComponents` requires variable rows because this inventory key has properties. `tests/src/styles/components/container.test.ts` reads resolved defaults of `1.5rem` and `0`, canonical overrides of `2rem` and `0.5rem`, and direct overrides of `3rem` and `1rem`. Inline padding reads 12px, 16px, and 24px respectively; the y property adds no block padding. Every variant is exercised in LTR and RTL. The proof also retunes each cap to 500px and reads the resulting maximum and used width.

The following plain-container readings pass in managed Chromium and Edge. Each triplet follows the viewport triplet in its row.

| Viewports (px) | Resolved maximum widths | Used widths (px) |
| --- | --- | --- |
| 374 / 375 / 376 | none / none / none | 374 / 375 / 376 |
| 575 / 576 / 577 | none / 540px / 540px | 575 / 540 / 540 |
| 767 / 768 / 769 | 540px / 720px / 720px | 540 / 720 / 720 |
| 991 / 992 / 993 | 720px / 960px / 960px | 720 / 960 / 960 |
| 1199 / 1200 / 1201 | 960px / 1140px / 1140px | 960 / 1140 / 1140 |
| 1399 / 1400 / 1401 | 1140px / 1320px / 1320px | 1140 / 1320 / 1320 |

The same viewport visits prove each named variant stays fluid until its own boundary and takes subsequent caps. `.container-fluid` stays fluid throughout. Padding and centered margins are read at every visit.

The failure controls ran against rebuilt CSS: the presence scan in Node and the viewport reading in managed Chromium. Each exact edit was then restored.

| Command | Red | Green |
| --- | --- | --- |
| `npm run test:conformance -- -t 'carries every shipped'` | Exit 1, `Tests 1 failed`; omitting `.navbar > .container-fluid` reports `Shipped component container is missing selector .navbar > .container-fluid`. | Exit 0, `Tests 1 passed`. |
| `npm run test:src:styles -- container.test.ts -t 'ltr direction.*around the 576 boundary'` | Exit 1, `Tests 1 failed`; changing the small token to 541px reports `container at 576: expected '541px' to be '540px'`. | Exit 0, `Tests 1 passed`. |

The retained conformance test also removes the navigation selector from a cascade copy and asserts the missing-selector diagnostic. Control logs use the `cl7-selector-{red,green}` and `cl7-width-{red,green}` names under ``.

`LayoutSection` extends `SpecimenSection`. Its table renders capped and fluid containers, responsive variants, and navigation parents containing each variant with labeled spans. The section proof checks the region, every specimen's markup, the class populations, and repeated destruction preserving neighboring content. Showcase and barrel proofs include it.

The shared-block sweep covers every recursive style partial, including `_mixins.scss`, and returns `shared: []`. No mixin extraction was needed. Only container compatibility rows changed in the guide. The guide owner's remaining bounds are:

- Document the container partial, token values, registry leaves, Layout section, and proof links.
- Record that `.navbar` is referenced and not defined; its container combinators ship without shipping navigation itself.
- Record the logical-axis substitution for Bootstrap's physical width, padding, and margin declarations. Horizontal LTR/RTL readings match the baseline; vertical writing modes were not measured.
- Document independent gutter tokens, their component-scoped Bootstrap aliases, and their independence from the density-scaled space ramp. No default cap or gutter value departs from the baseline.

The following command results are retained under ``. `cl7-gates.cjs` records the ordered chain in `cl7-gates.json` and `cl7-gate-*.log`. Edge rows set `PLAYWRIGHT_CHANNEL=msedge`; other browser runs use managed Chromium.

| Step | Exit | Final result lines |
| --- | --- | --- |
| `npm run build:src:styles` | 0 | `✓ built in 403ms` |
| Container browser proof | 0 | `Test Files 1 passed (1)`; `Tests 45 passed (45)` |
| Conformance run | 0 | `Test Files 1 passed (1)`; `Tests 10 passed (10)` |
| Section, showcase, and barrel proofs | 0 | `Test Files 3 passed (3)`; `Tests 7 passed (7)` |
| Styles and conformance setup proofs | 0 | `Test Files 2 passed (2)`; `Tests 125 passed (125)` |
| Shared-block sweep | 0 | `Tests 1 passed \| 79 skipped (80)`; skips are the name filter. |
| `npm run format:check` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | `oxlint --config .oxlintrc.json --deny-warnings .`; no diagnostics. |
| `npm run check` | 0 | `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`; no diagnostics. |
| `npm run build` | 0 | `✓ built in 534ms` |
| `npm test` | 0 | Final guide suite: `Test Files 1 passed (1)`; `Tests 18 passed (18)`. |
| Chromium styles / browser setup / application, within `npm test` | 0 | `Tests 355 passed (355)` / `Tests 33 passed (33)` / `Tests 24 passed (24)`. |
| Edge `npm run test:src:styles` | 0 | `Test Files 52 passed (52)`; `Tests 355 passed (355)`. |
| Edge `npm run test:setup:browser` | 0 | `Test Files 1 passed (1)`; `Tests 33 passed (33)`. |
| Edge `npm run test:app:browser` | 0 | `Test Files 9 passed (9)`; `Tests 24 passed (24)`. |

Development failures were corrected before the final chain: a missing setup import caused an uncollected browser suite (exit 1), and an unnarrowed `Element.style` access caused typechecking to exit 2. PowerShell refused the initial `npm.ps1` launch; subsequent commands used `npm.cmd` or the same npm CLI through Node. No product test was skipped to close CL7.

The actual `git diff --stat` output follows; Git omits untracked files from this statistic.

```text
 app/browser/Showcase.ts            |  2 ++
 app/browser/constants.ts           | 43 +++++++++++++++++++++++++++++++++++++-
 app/browser/index.ts               |  1 +
 guides/veneer.md                   |  3 +++
 src/core/constants.ts              | 11 ++++++++++
 src/styles/_tokens.scss            |  8 +++++++
 src/styles/index.scss              |  1 +
 tests/app/browser/Showcase.test.ts | 21 +++++++++++++++----
 tests/app/browser/index.test.ts    |  3 +++
 tests/conformance.test.ts          | 14 +++++++++++++
 tests/setupConformance.test.ts     |  1 +
 tests/setupStyles.test.ts          | 30 ++++++++++++++++++++++++++
 tests/setupStyles.ts               | 21 +++++++++++++++++++
 13 files changed, 154 insertions(+), 5 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output lists only granted files. `git diff --check` exits 0.

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_tokens.scss
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/LayoutSection.ts
?? src/styles/components/_container.scss
?? tests/app/browser/sections/LayoutSection.test.ts
?? tests/src/styles/components/container.test.ts
```

The probe tool's approval check rejected the requested section receipt: `MCP tool call requires approval, but approval policy is never`. No receipt was produced. The reported section results are direct browser-test results.
