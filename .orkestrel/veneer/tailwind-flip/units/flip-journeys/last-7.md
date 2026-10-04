**1,665 signatures cover 8,112 elements at each width.** The partition passes with zero violations in **53.1015 seconds focused** and **67.3415 seconds inside the full run**, down from 268.2834 seconds. All controls remain effective, both widths remain inside the case, and `it.skipIf(VARIANT !== 'light-1280')` is unchanged.

**U6 acceptance remains unmet.** The full journey reports **83 passed, 6 failed, 3 skipped**, including a popover failure outside the original seven.

The original failures have these diagnoses:

| Failure | Without partition | Optimized full run | Finding |
|---|---|---|---|
| dark-1280 paired states: Toggle navigation | Fails | Fails | Real `unexcluded` visibility break on `#navbar-open-menu`. |
| light-390 J8: Uploads | Passes | Passes | Load-sensitive early reading: Bootstrap’s `.toast.showing { opacity: 0; }` still applies. The instrumented diagnostic also reproduces it without the partition, so a permanent cure is unproved. |
| light-390 paired states: Shipping and delivery | Fails | Fails | Real `unexcluded` visibility break on `#accordion-default-shipping`. |
| light-390 accordion, motion=false | Fails | Fails | The trace records both complete transition pairs within 49.5 ms. The protected observer reads availability after document-capture engine dispatch sets `collapsing`, undercounting accepted inputs. |
| dark-390 paired states: Depot hours | Fails | Fails | Real `unexcluded` visibility break on `#collapse-shown-panel`. |
| dark-390 tooltip, motion=true | Fails | Fails | The document-wide refusal recorder catches a sibling tooltip’s show/hide events during the Escape check. The incidental pointer crossing’s origin remains undetermined. |
| dark-390 collapse, motion=false | Fails | Passes | Undetermined: the focused diagnostic also passes. The exact failing burst trace and committed-base reproduction are missing. |

For all three paired panels, `visibility` reads **`visible / collapse / visible`** under **bootstrap / unexcluded / tailwindcss**. The winning rule is **`.collapse { visibility: collapse; }`** in the `utilities` layer of `style#veneer-unexcluded`. This is Tailwind’s shared component-name utility, not preflight, curation, a withheld Bootstrap utility, or U5b chrome.

Their failing-state boxes are:

| Element | x, y | Width × height |
|---|---|---|
| `#navbar-open-menu` | 373, 419.859375 | 386 × 144 |
| `#accordion-default-shipping` | 42, 447.796875 | 306 × 128 |
| `#collapse-shown-panel` | 41, 456.5 | 308 × 106 |

Each retains populated `textContent` but has empty `innerText`. Each reads `display: block`, `opacity: 1`, and visible overflow throughout its ancestors. They are hidden by visibility, not off-screen, zero-sized, or empty.

J8’s toast reads **350 × 85 at (24, 743)**, on-screen and populated with “The customs invoice finished uploading.” Its display is `block`, visibility is `visible`, and opacity is **0**; ancestor opacity is 1 and overflow is visible.

The requested `a73b951` worktree was created. Base tests could not collect because `../node_modules/tailwindcss/preflight.css?raw` was missing. No install, dependency copy, or symlink was made. **Base reproduction remains unavailable for all seven failures.**

The unexpected full-run failure is **light-1280 popover, motion=true**: “Billing status description is shown” times out after 5000 ms. It passes in isolation afterward, but its cause remains undetermined and the full-run failure remains recorded.

Every acceptance command ran in order:

| Command | Exit |
|---|---:|
| `npm run check` | 0 |
| `npm run lint:check` | 0 |
| `npm run format:check` | 0 |
| `npm run test:setup:browser` | 0 — 134 passed |
| `npm run build` | 0 |
| `npm run build:showcase` | 0 |
| `npm run test:journey` | 1 — 6 failures |
| `npm run test:app:browser` | 0 — 234 passed |
| `git diff --check` | 0 |
| `sha256sum dist/src/bootstrap/index.css` | 0 — required digest matched |

Journey wall time is **405.03 seconds without the partition** and **458.02 seconds with it**, respectively **170.03** and **223.02 seconds over the 235-second budget**. The partition’s full-run timer is **67.3415 seconds**, overlapping other variants.

See the [complete report](/home/user/veneer/tmp/units/flip-journeys/seventh-report.md), [diagnostic readings](/home/user/veneer/tmp/units/flip-journeys/seventh-diagnosis.md), and [per-signature coverage](/home/user/veneer/tmp/units/flip-journeys/seventh-coverage.json). This run edits only the integration test; the setup changes are inherited. Protected helpers and engine sections remain unchanged. Nothing was committed.

Final `git status --porcelain`:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```