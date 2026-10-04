**U6 remains incomplete. Nothing was committed.** The fifth brief’s required stop was reached: the focused partition case reported **6 violations**, against the required zero.

The [complete report](/home/user/veneer/tmp/units/flip-journeys/fifth-report.md) contains the inherited specimen triples, transition tables, case inventory, command evidence, and artifact paths.

Two failures expose an unresolved collector defect: it reports Bootstrap as the winner for `.container`’s nested Tailwind `max-width` declaration. The other four arise from the specified union of longhands: Bootstrap’s `.border-1` declares only width, while Tailwind also declares border style.

| Key | Longhand | Face | Reported winner | Expected | Read |
|---|---|---|---|---|---|
| `196: div.container.bg-body-tertiary.border.rounded.py-2` | `max-width` | unexcluded | bootstrap | 1140px | 1280px |
| `7988: div.container` | `max-width` | unexcluded | bootstrap | 1140px | 1280px |
| `8086: div.border-1.bg-body-tertiary.px-2` | `border-top-style` | unexcluded | bootstrap | none | solid |
| Same element | `border-right-style` | unexcluded | bootstrap | none | solid |
| Same element | `border-bottom-style` | unexcluded | bootstrap | none | solid |
| Same element | `border-left-style` | unexcluded | bootstrap | none | solid |

One implementation hypothesis: `scanSheetRules` does not descend through `CSSStyleRule.cssRules`, so the collector misses `.container`’s nested declarations. The [emitted declaration excerpts](/home/user/veneer/tmp/units/flip-journeys/fifth-declarations.txt) document both findings.

At **1280px**, each face read **8,112 elements**, carrying **192 utility names and 17 component names**. These are observations from the failing instrument, not an accepted partition proof:

| Clause | Comparisons | Competing skips | Resolved skips | Masked skips | Geometry skips |
|---|---:|---:|---:|---:|---:|
| U: utilities, tailwindcss | 49,402 | 126 | 46 | 12 | 1,112 |
| C: components, both faces | 3,644 | 432 | 3,298 | 0 | 0 |
| V: utilities, unexcluded | 76,705 | 2,486 | 1,139 | 12 | 41 |

The observed partition contained **20,607 utility** and **511 component** element–longhand differences between the Tailwind faces. Clause 5 attribution remains outside the journey under the second brief.

The case took **73.575 seconds**, within its unchanged **300-second** limit. Vitest reported **80.04 seconds** overall, exit **1**, uncapped. It retains `it.skipIf(VARIANT !== 'light-1280')`, with both widths inside the case. The assertion stopped execution before **390px** and before the planted `.mt-3`, restored-important, inverse, and stripped-curation controls. None was dropped.

Four focused setup tests passed, covering the retained controls, component winners, competing declarations, and logical-margin mapping. An earlier exploratory partition run was stopped before comparisons because the selector prepass was expensive; selector requests were then batched through Chromium’s existing parser.

The following evidence remains inherited from earlier runs:

- **Statecharts:** nine face rows and six pair rows passed setup verification. Amended journey harness pass counts remain unmeasured. [Exact rows](/home/user/veneer/tmp/units/flip-journeys/statechart-rows.json).
- **Specimens:** all 23 triples repeated without a recorded P5 departure; row 23 at 768px read `left / left / left`. [Every triple](/home/user/veneer/tmp/units/flip-journeys/tailwind-readings.json).
- **Census, light-1280:** 33 undeclared tokens under Bootstrap; 21 under each Tailwind face. [Exact lists](/home/user/veneer/tmp/units/flip-journeys/census.json).
- **Engine equality, light-1280:** alert, popover, carousel, modal, and scrollspy-1280 matched across the three faces, including six shown-popover switches.
- **390px header:** unmeasured.
- **Full journey wall time:** failing baseline **314.30 seconds**; no amended green run exists, so comparison against **235 seconds**, project spans, and longest cases remain unmeasured.

Acceptance commands, in the required order:

| Command | Exit / disposition |
|---|---|
| `npm run check` | **0**, final tracked tree |
| `npm run lint:check` | **0**, before the selector-batching change |
| `npm run format:check` | **0**, before the selector-batching change |
| `npm run test:setup:browser` | Not run; focused setup **0** |
| `npm run build` | Not run after stop |
| `npm run build:showcase` | Not run after stop |
| `npm run test:journey` | Not run; focused partition **1** |
| `npm run test:app:browser` | Not run after stop |
| `git diff --check` | **0** |
| `sha256sum dist/src/bootstrap/index.css` | **0**, matched |

The `ReadonlyArray` lint error is fixed. Only the three owned files were formatted. Unrun commands emitted no error or skip line. The focused failure was:

```text
AssertionError: expected [ { …(7) }, { …(7) }, { …(7) }, …(3) ] to deeply equal []
Test Files  1 failed (1)
Tests  1 failed | 20 skipped (21)
Duration  80.04s
```

Both digests were unchanged before and after this run:

```text
showcase/browser.html
2332e9458dc3eef3574c207d32b39f72d950ac1213073c4613e3f403c7612699

dist/src/bootstrap/index.css
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f
```

See [every case disposition](/home/user/veneer/tmp/units/flip-journeys/fifth-case-inventory.md), [the complete diff](/home/user/veneer/tmp/units/flip-journeys/fifth-changes.patch), and [the artifact manifest](/home/user/veneer/tmp/units/flip-journeys/fifth-artifact-manifest.txt). No complete case was deleted.

Final `git status --porcelain`:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

`flip-probe-3`’s files remain untouched; none appears in porcelain status.