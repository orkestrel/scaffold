Implemented the owned changes; **full acceptance remains blocked by J3’s out-of-scope hint lookup and the separate setup-loader timeout**. Nothing was committed. The generated page is restored.

The [complete diff](/tmp/as2/as2.patch) contains 15 modified source files and two new caption fragments. It implements flex wrapping, validation clearance, overflow reservation, badge placement, thumbnail alignment, dialog spacing, table/list extensions, Scrollspy recreation and cleanup, the 25-pair census, captions, readings, and guide updates.

U4.1 is stopped as instructed. `px-5` and the still-used `FLUID_TEMPLATES` remain. No style attribute or replacement stylesheet class was introduced.

The floor probe tried every spelling below under all three faces at 390 and 1280. Bootstrap and no-layer measurements agreed throughout. O/E/S means overflowing chips / escaped chips / split longest words, totaled across grid, gutters, float, and flex.

| Spelling | 390 Bootstrap = no-layer | 390 layer | 1280 Bootstrap = no-layer | 1280 layer | Failed properties |
|---|---:|---:|---:|---:|---|
| Original | 0/0/0 | 156/0/2 | 0/0/0 | 0/0/0 | Layer labels overflow; float splits “wraps” |
| No floor | 484/185/2 | 476/184/2 | 0/0/0 | 0/0/0 | Header widths change; containment and whole-word failures |
| `col-auto` | 484/185/2 | 476/184/2 | 0/0/0 | 0/0/0 | Same failures |
| `d-inline-block` | 492/185/2 | 484/184/2 | 100/0/0 | 100/0/0 | Header widths change; grid chips shrink to 2 px |
| `d-table` | 492/185/2 | 484/184/2 | 100/0/0 | 100/0/0 | Same failures |
| `text-nowrap` | 484/185/0 | 476/184/2 | 0/0/0 | 0/0/0 | Header widths change; layer float still splits |
| `min-vw-100` | 0/0/0 | 0/0/0 | 0/0/0 | 0/0/0 | Headers become 394 px; frames size from viewport |
| `dropdown-menu d-block position-static` | 0/17/0 | 0/18/0 | 0/100/0 | 0/101/0 | Headers become 168 px; flex children escape |
| `row gx-5` | 628/72/0 | 628/108/0 | 116/0/0 | 132/0/0 | Width/containment failures; forbidden spacer dependency |

Every alternative changes Bootstrap’s original 390 header widths, 111.8125–139.375 px. The [complete probe](/tmp/as2/FLOOR.md) records all 216 specimen measurements, including exact header vectors and minimum chip widths; [raw readings](/tmp/as2/floor-readings.csv) accompany it.

Proof results:

| Proof | Before | Final |
|---|---|---|
| Flex nowrap | Recipe: two child tops; Bootstrap: one | One top under both sheets; containment and cross-axis assertions pass |
| 1280 Bootstrap → layer | Overlays, both themes | Feedback, both themes |
| 1280 layer → Bootstrap | No active link, both themes | Feedback, both themes |
| 390 tall-section capture | Corrected harness already read Feedback | Feedback, both themes |
| Opposite-order census | Planted conflict detected | 25 pairs; 12,499 elements; zero conflicts; planted control = 1 |

The initial narrow harness incorrectly selected a 461-pixel section for an 844-pixel viewport. It was corrected to capture Position utilities before Live components; **there is no narrow red reproduction**. Registration is **98 + 4 wide transitions + 2 narrow captures + 1 census = 105/0**. [Proof record](/tmp/as2/PROOFS.md), [final readings](/tmp/as2/final/proof-readings.json).

All nine new reading rows passed across four variants and three faces—108 values. Bootstrap and no-layer agree:

| Reading | Bootstrap / no-layer | Layer |
|---|---|---|
| Thumbnail height | 64 px | 64 px |
| `.shadow` | `rgba(.15) 0 8px 16px 0` | `rgba(.1) 0 1px 3px 0`, `rgba(.1) 0 1px 2px -1px` |
| `.shadow-sm` | `rgba(.075) 0 2px 4px 0` | Same as layer `.shadow` |
| `.shadow-lg` | `rgba(.176) 0 16px 48px 0` | `rgba(.1) 0 10px 15px -3px`, `rgba(.1) 0 4px 6px -4px` |
| `--bs-box-shadow` | `0 .5rem 1rem rgba(0,0,0,.15)` | `0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)` |
| Dark card background | `rgb(33,37,41)` | `rgb(3,7,18)` |
| Header border | Light: black/.176; dark: white/.15 | Same |
| `--bs-gutter-x` | 3 rem | 3 rem |
| `.gap-5` | 48 px | 20 px |

The computed layer shadow strings also contain four transparent zero-shadow entries. [Exact strings and all 108 values](/tmp/as2/READINGS.md). All twelve final reading vectors match the earlier passing journey; their original 58-value prefixes remain unchanged.

The application-browser failure was investigated without changing its timeout:

- `reads every header button at 4.5:1 or more, pressed or not, in both color modes` exceeded 15,000 ms. A diagnostic with a larger budget completed in **14,797 ms**, with every contrast assertion passing.
- The following `switches every outline button's text to its filled color on hover, press, and active under every face` found **two Bootstrap controls** while the timed-out case’s asynchronous cleanup delayed destruction.
- Controlled mean settled switch times without/with re-seat were **352.048/358.006 ms at 414**, and **365.473/354.573 ms at 1280**. Re-seating after header writes did not improve them. The constructor moves mandatory stylesheet layout into the handler; measured end-to-end changes were small and changed sign.
- The final application-browser gate passed **246/246**, without timeout or re-seat-order changes.

[Timing method, per-face measurements, and evidence](/tmp/as2/SWITCH-COST.md).

All final captures completed **72 sections × three faces**, with no page errors, at 390 light, 1280 light, and 390 dark. Re-capture readings:

| Item | Final acceptance reading |
|---|---|
| U4.1 | Stop confirmed: grid/float census unchanged from audit; original floor defects remain |
| U4.2 | Four nowrap children share one top throughout |
| U4.3 | Tooltip clearances: Bootstrap/no-layer 17.40625 and 33.40625 px; layer 1.40625 and 17.40625 px |
| U4.4 | Last-line clearance at 390: 80.5/124.5 px Bootstrap/layer; at 1280: 193.890625/175.921875 px; vertical table scroll range zero |
| U4.5 | Badge clears inner box by 8.625 px; label-to-badge horizontal clearance ≥50.34375 px |
| U4.6 | Thumbnail 64×64 under every face |
| U4.8 | Dialog paragraph margin/button clearance: 16 px Bootstrap/no-layer, 12 px layer; offcanvas paragraph remains bare |
| U4.9 | 1280 table client/scroll widths: 878/1367 Bootstrap/no-layer, 890/1208 layer; five breakpoint lists contain 13 rows; minimum inactive-footer clearance 2.75 px in extended probes |
| U5.1 | Official layer captures show Feedback in all three requested variants; all 18 geometry observations read Feedback at scrollTop 0 |
| C10 | Zero conflicting pairs |
| C11 | Reading rows pass; divider contrast is approximately 1.097/1.012 in light and 1.703/1.528 in dark, Bootstrap/layer |

The underline-color specimens no longer carry `link-underline`; the layer’s remaining absent underline belongs to the pending ruling and was left alone. [Re-capture review](/tmp/as2/final/recapture-review.json), [geometry](/tmp/as2/final/geometry-summary.json), [census/digest comparison](/tmp/as2/final/census-digest-review.json).

The final journey registered **105/0**, with **97 passing and 8 failing**:

- `J3 browses every section through the contents`: seven scrollers are reported unhinted in each variant because its lookup examines the inner frame’s immediate sibling.
- `places every registered state and writes the variant artifact`: each variant has 64 of 77 placements after J3 stops.
- Child exit: **1**. Runner exit: **65**, correctly rejecting the stale portfolio artifact.

The final compare used `--registration 105/0` and exited **67**. Its sole difference is classified as **missing fresh candidate evidence after the J3/portfolio failures**. It could not perform the canonical final row/line/journal comparison. [Compare](/tmp/as2/final/compare.md), [classification](/tmp/as2/final/compare-classified.json).

Independent final stdout comparison confirms unchanged **4 header-statechart, 18 engine-equality, 2 narrow-header, and 12 face-census records**. Component, partition, and reading records match the earlier passing journey. The earlier comparison’s 337 differences remain fully classified: 201 predicted; 136 outside the literal prediction—78 required reading additions/copies, four insertion-order changes, 12 partition statistics, 16 repaired-cause/reader-control copies, 24 partition controls, and two fractional heading-margin journal entries. Those are historical evidence, not a substitute for the blocked final canonical compare. [All 337 classifications](/tmp/as2/compare-classified.json), [final stdout comparison](/tmp/as2/final/stdout-diff.json).

The final gate results follow. Folder names are under `/home/user/veneer/tmp/units/journey-cost/runs/`; every command used the prescribed detached queue wrapper.

| Command | Folder | Exit | Bare result |
|---|---|---:|---|
| `npm run build` | `as2-final-build` | 0 | Completed |
| `npm run format:check` | `as2-final-format` | 0 | All matched files formatted |
| `npm run lint:check` | `as2-final-lint` | 0 | Passed |
| `npm run check` | `as2-final-check` | 0 | Passed |
| `npm run test:setup:browser` | `as2-final-setup-browser` | 0 | 205 passed |
| `npm run test:app:browser` | `as2-final-app-browser` | 0 | 246 passed |
| `npm run test:integration` | `as2-final-integration` | 0 | 60 passed |
| `npm run test:guides` | `as2-final-guides` | 0 | 20 passed |
| `npm run test:policy` | `as2-final-policy` | 0 | 119 passed, 1 skipped |
| `npm run test:config` | `as2-final-config` | 0 | 227 passed, 1 skipped |
| `npm run test:setup` | `as2-final-setup` | 1 | 185 passed, 1 timeout |
| `npm run test:conformance` | `as2-final-conformance` | 0 | 130 passed |
| `npm run build:showcase` | `as2-final-showcase-a` | 0 | Built |
| `npm run build:showcase` | `as2-final-showcase-b` | 0 | Built; identical hash |
| `node /tmp/as2/final-geometry.ts` | `as2-final-geometry` | 0 | 18 observations |
| `capture-faces.ts … 390 light …` | `as2-final-capture-light-390` | 0 | 72 sections/face; no errors |
| `capture-faces.ts … 1280 light …` | `as2-final-capture-light-1280` | 0 | 72 sections/face; no errors |
| `capture-faces.ts … 390 dark …` | `as2-final-capture-dark-390` | 0 | 72 sections/face; no errors |
| `census.ts … 390 light …` | `as2-final-census-light-390` | 0 | Completed |
| `census.ts … 390 dark …` | `as2-final-census-dark-390` | 0 | Completed |
| `digest.ts /tmp/as2/final/audit` | `as2-final-digest` | 0 | Completed |
| `npm run test:journey -- --reporter=json --outputFile=…/report.json` | `as2-final-journey` | 65 | 97 passed, 8 failed; stale artifact |
| `compare.ts … --registration 105/0 …` | `as2-final-compare` | 67 | Candidate unreadable |

[Exact commands, full folders, exits, timings, and bare results for all 69 attempts](/tmp/as2/GATES.md).

Both final showcase hashes are:

```text
679581d05a4281bec17d1c8de4dad174e9f8670b44eab205e274c2b3420421fb
```

The setup failure is `Tailwind comparison loaders > canonicalizes eligible declarations and rejects unsupported rule contexts`, exceeding 5,000 ms. Its fixed sample and installed Tailwind design-system compilation do not consume showcase markup. The diagnostic profile attributed 4.619 seconds to Tailwind and 0.695 seconds to GC. An earlier serial control passed at 4,800 ms and an earlier exact repeat passed; the latest failure remains reported. Its helper and timeout are outside ownership.

[Every deviation](/tmp/as2/DEVIATIONS.md) records expected/found behavior, evidence, disposition, and explanation or hypothesis, including the initial overflow correction, narrow-harness correction, caption/export proof fixes, aggregate comparison findings, capture-helper differences, and launcher interruptions.

`git diff --check` exits 0; `git diff --stat -- src` is empty. Final `git status --porcelain`:

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/factories.ts
 M app/browser/sections/color-background.html
 M app/browser/sections/live-components.html
 M app/browser/sections/position-helpers.html
 M app/browser/sections/position-utilities.html
 M app/browser/sections/stretched-link.html
 M app/browser/sections/tables.html
 M app/browser/sections/validation.html
 M app/browser/types.ts
 M guides/veneer.md
 M tests/app/browser/factories.test.ts
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.ts
?? app/browser/sections/gutters.html
?? app/browser/sections/shadows.html
```

May I apply the prepared [two-line J3 hint-lookup adjustment](/tmp/as2/overflow-fix-proposal.patch) and rerun the journey/compare? The brief explicitly limits edits in that file to the three Scrollspy cases and census; J3 falls outside that ownership. The adjustment preserves the rendered-paragraph assertion and follows the required outer ratio wrapper.