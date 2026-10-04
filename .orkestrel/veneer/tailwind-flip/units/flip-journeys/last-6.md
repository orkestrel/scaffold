**U6 remains incomplete. Nothing was committed.** The partition passes at both widths, but the full journey gate reports **82 passed, 7 failed, and 3 skipped**, exit **1**.

The remaining failures reach the explicitly protected `actOnDisclosureControl` helper and cases the brief requires keeping unchanged. I stopped at that scope boundary. Their cause remains unresolved; the reported 5000ms waits are inner condition failures, not case timeouts.

The [complete report](/home/user/veneer/tmp/units/flip-journeys/sixth-report.md) contains every specimen triple, transition, case disposition, diagnostic, and artifact path.

The header harness results are:

| Family | Variant | Passed |
|---|---|---:|
| Face | light-390 | 9/9 |
| Face | dark-1280 | 9/9 |
| Pair | light-390 | 6/6 |
| Theme | light-390 | 4/4 |

The face table covers every starting-face/button combination. The pair table reaches each face/theme combination. See [the exact transitions](/home/user/veneer/tmp/units/flip-journeys/statechart-rows.json).

All 23 specimen triples repeat at 1280px and 390px, with no recorded P5 departure. The 768px alignment witness reads `left / left / left`. The full journey repeats the readings under light and dark; see [the measured values](/home/user/veneer/tmp/units/flip-journeys/sixth-readings.json).

The partition reads **8,112 elements per face per width**, carrying **192 utility names and 17 component names**. Both widths report **zero violations**.

| Width | Clause | Comparisons | Competing skips | Resolved skips | Masked skips | Geometry skips |
|---:|---|---:|---:|---:|---:|---:|
| 1280 | U | 49,402 | 126 | 46 | 12 | 1,112 |
| 1280 | C | 2,556 | 432 | 3,298 | 0 | 0 |
| 1280 | V | 76,705 | 2,486 | 1,139 | 12 | 41 |
| 390 | U | 49,417 | 111 | 46 | 12 | 1,112 |
| 390 | C | 2,610 | 326 | 3,346 | 0 | 0 |
| 390 | V | 76,720 | 2,471 | 1,139 | 12 | 41 |

The measured differences between Tailwind faces are **20,607 utility pairs** at each width, plus **511 component pairs at 1280px** and **509 at 390px**. Clause 5 attribution remains outside the journey.

Every control detects its intended change:

| Control | 1280px | 390px |
|---|---|---|
| Planted `.mt-3` | 10/10 failures; `2px` | 10/10 failures; `2px` |
| Restored important rule | 10/10 failures; `16px` | 10/10 failures; `16px` |
| Unexcluded inverse | 10,346 violations | 10,344 violations |
| Stripped curation | 88 rules removed; `500 → 400` | 88 rules removed; `500 → 400` |

Restored readings pass. The curation control now selects the emitted `bootstrap` layer; its inherited `reset` selector removed no rules.

The partition takes **268.2834 seconds** during the full run, below its unchanged **300-second limit**. It remains selected by `it.skipIf(VARIANT !== 'light-1280')`, with both widths inside the case. The focused passing run reports **226.61 seconds** of tests.

The collector handles nested declarations and chooses winners only where that system declares the longhand. Removing those fixes fails both targeted regression tests; restoring them passes both. `scanSheetRules` remains unchanged. **A shared nested-aware reader is a fix-unit candidate.**

The census reports **33 undeclared tokens under Bootstrap and 21 under each Tailwind face**, in every variant, including the planted census controls. Exact token lists are preserved in the measurement records.

The paired engine-output results are:

| Variant | Tables equal across three faces | Failure |
|---|---|---|
| light-1280 | alert, popover, carousel, modal, scrollspy-1280; six popover switches pass | None |
| dark-1280 | button, tab, dropdown, offcanvas | navbar-1280 |
| light-390 | None completed | accordion |
| dark-390 | tooltip | collapse |

Tables after those failures were not reached.

Both 390px variants measure the same header: group **366 × 52px**, x=12, right=378. All buttons share top=78.875 and height=52.

| Button | X | Width |
|---|---:|---:|
| Bootstrap only | 12 | 91.1875 |
| Tailwind without the layer | 102.1875 | 146.609375 |
| Tailwind with the layer | 247.796875 | 130.203125 |

The full journey wall is **628.52 seconds**, against the inherited failing baseline of **314.30 seconds** and the **235-second budget**. No green full-run budget reading exists. Per-project spans, longest tests, and peak memory remain unmeasured.

The seven failures are:

| Variant | Case | Diagnostic |
|---|---|---|
| dark-1280 | Paired engine states | `Toggle navigation lost its panel sentence` |
| light-390 | J8 | `Named region "Uploads" is not visible` |
| light-390 | Paired engine states | `Shipping and delivery renders an empty panel` |
| light-390 | Accordion, motion=false | Enter-burst completion waits fail |
| dark-390 | Paired engine states | `Depot hours lost its panel sentence` |
| dark-390 | Tooltip, motion=true | `Refusal emitted a delayed lifecycle event` |
| dark-390 | Collapse, motion=false | Enter-burst completion waits fail |

See [the exact diagnostics and failing rows](/home/user/veneer/tmp/units/flip-journeys/sixth-failures.txt).

Acceptance commands, in the required order:

| Command | Exit |
|---|---:|
| `npm run check` | 0 |
| `npm run lint:check` | 0 |
| `npm run format:check` | 0 |
| `npm run test:setup:browser` | 0 — 134 passed |
| `npm run build` | 0 |
| `npm run build:showcase` | 0 |
| `npm run test:journey` | 1 |
| `npm run test:app:browser` | Not run after scope stop |
| `git diff --check` | 0 |
| `sha256sum dist/src/bootstrap/index.css` | 0 — matched |

The unrun application-browser command emitted no error or skip line. The full-run skips are the partition case in non-default variants. No case was deleted, no retry added, and no timeout raised.

Both digests are unchanged before and after rebuilding:

```text
showcase/browser.html
2332e9458dc3eef3574c207d32b39f72d950ac1213073c4613e3f403c7612699

dist/src/bootstrap/index.css
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f
```

Edited files are [setupBrowser.ts](/home/user/veneer/tests/setupBrowser.ts), [setupBrowser.test.ts](/home/user/veneer/tests/setupBrowser.test.ts), and [integration.test.ts](/home/user/veneer/tests/app/browser/integration.test.ts). See [every case disposition](/home/user/veneer/tmp/units/flip-journeys/sixth-case-inventory.md), [the complete diff](/home/user/veneer/tmp/units/flip-journeys/sixth-changes.patch), and [every artifact path](/home/user/veneer/tmp/units/flip-journeys/sixth-artifact-manifest.txt). Protected helpers and engine sections compare equal to `HEAD`. Browser evidence is Chromium-only.

Final `git status --porcelain`:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

`flip-probe-3`’s files remain untouched; none appears in porcelain status.