# tokens-t2 — token map enablement

Owned T2 implementation and proofs pass. Every prescribed acceptance command ran, but acceptance is not all green: six off-limits browser-helper expectations and fifteen journey instances move with the sheet; three additional journey failures match the Host-bound set. The exact titles and readings are handed to T3 below.

Launch: `6874b79`, branch `ccr-d15a48b1-yyyll6`, clean tree. Sole tracked-file writer; no commit, install, publication, or off-scope edit.

## Findings by item

1. **The map is on: 126 palette rows and 26 scale rows.** `maps.test.ts` generates both Sass maps from the guarded token record. The context row is `#dee2e6@dark → #e5e7eb`; ordinary `#dee2e6 → #d1d5dc`. Keys use the normalized six-digit spelling required by T1's `-key`; `-spell` supplies the original hex, triplet, or escape family at the call site. The conformance case compares every compiled map entry to the record and rejects a planted palette row and a removed radius row.

2. **The recipe and preflight records regenerate deterministically.** The existing recipe writers ran unchanged. Both recipe records bind `sheet` to `9a20b9662d0ee44abc317e2fbd31d16e1f81e46de9be4166e865c846b659edeb`. Each recipe writer and the ported preflight writer ran twice, with `oxfmt` after each run; all three `cmp` exits were 0. Preflight remains Chromium 141: 2,595 → 2,793 rows, 276 existing rows changed, 198 added, none removed. [Every changed address and before/after reading](preflight-changes.json) and [the longhand/element census](preflight-summary.json) are recorded. The changes include mapped colors, font fallback readings, and the reset-layer effects exposed when the baseline becomes the tuned sheet alone.

3. **Owned component proofs use the tuned sheet alone.** Curation, preflight witness values, component winners in class relationships, and collapse use that baseline. Raw Bootstrap composition and utility-misuse controls retain their expressly raw subject. The CSSOM recipe sequence remains pinned to the tuned sheet. The lifted-baseline control detects the navbar-text anchor moving from `rgb(33, 37, 41)` to `rgb(3, 7, 18)`. Raw preflight's `--theme()` function and compiled preflight resolve differently for monospace text; the composition clause now independently compiles the theme and reset before comparing composed readings. Showcase and journey sources remain untouched.

4. **The Chromium cases pass with their controls.** [Contrast readings](contrast.json) contain Bootstrap and tuned ratios for all 223 pairings: 142 prior, 17 judge additions, and 64 adjacent surfaces. All 159 text pairings meet `min(Bootstrap, 4.5)` except the two inherited exceptions; all surfaces meet 1.05 except the inherited light subtle/page pair. No new floor violation occurred. `alert-primary-dark@blue` reads **8.080737389600186** (Bootstrap **7.454487353184765**); `alert-success@green` reads **6.483258798586505** (Bootstrap **10.350972700739907**). The blue-500 control reads 3.76; the dark secondary gray-950 control reads 1.00.

   The [relation record](relation.json) reproduces T0's **5,661** departures over the **17** shared component names and **19** `RELATION_WIDTHS`: **5,168 color**, **429 scale**, **64 breakpoint-band**, **0 unclassified**. An independent Bootstrap CSSOM copy changes only recorded values and conditions, in cumulative color/scale/band stages; the first matching stage classifies each departure. The observed band widths are 576, 639, 992, 1023, 1200, 1279, 1400, and 1535px. The grid and infix proofs cover **640, 768, 1024, 1280, and 1536px**, at the pixel before, at, and after each aligned boundary; `xxl` joins Tailwind's `2xl`. RFS stays at **1200px**; the deliberately moved cap reads `.h1` as **41.2px** at 1279px instead of 40px.

5. **Measured structural pins stand.** The statement count is **8,573 → 8,573**. Reboot originals/copies/scoped copies/precedence pairs remain **73/72/8/80**. The joined media blocks change from 576/768/992/1200/1400px counts **175/175/175/178/175** to 40/48/64/80/96rem counts **175 each**, plus **3** independent 1200px RFS joins. Empty reset **1**, empty bootstrap **215**, bootstrap joins **46**, table-th join **1**, dropstart join **1**, and print joins **10** remain unchanged.

## Digests

| Artifact | Before | After |
| --- | --- | --- |
| `dist/src/bootstrap/index.css` | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` |
| `dist/src/tailwindcss/index.css` | `b946eefe63628fa64183e8a1518cffb0b145ea6ccd083c69105ae1f6fe900662` | `9a20b9662d0ee44abc317e2fbd31d16e1f81e46de9be4166e865c846b659edeb` |

Formatted record SHA-256:

| Record | SHA-256 |
| --- | --- |
| `tests/fixtures/tailwindcss/recipe.json` | `a2271939e381a373df4d89c8786c0fe6ebdca589a38ec7fb2f72aa834f90ecd7` |
| `app/browser/recipe.json` | `f8bf93eb56ec9e812993bab297729696951a33980564c81ebf9d5da141812b03` |
| `tests/fixtures/tailwindcss/preflight.json` | `cedbe9067132f57fff75d54e84e28c99bc27303e775c72817045b617a9212f2d` |
| `tests/fixtures/tailwindcss/tokens.json` (unchanged) | `9885f2e2fce98138d13cde7745a0deb05a8b7b7cafcc5e0a15a97163eb589a8c` |
| `tests/fixtures/tailwindcss/palette.json` (unchanged) | `5c5b170e98c0fc2cf5b3e376230827cdce1edf9cdcdd683e2fbce7d7e970d886` |

## Case titles and controls

| Case | Controls |
| --- | --- |
| `pins the palette and scale maps to the token record` | Planted palette row; removed radius row. |
| `derives the tuned sequences by substituting tokens, withholding, moving, copying, restoring, and nothing else` | Unknown `#0d6efe`; removed primary row; identity white changed to `#fffffe`; restored `.mt-3`; `#f8f9fa → #f9fafb` and existing `#f9fafb → #fafbfc`, once each; planted rule and removed curation selector. |
| `keeps the RFS cap at 1200px and aligns every grid condition to Tailwind's breakpoints` | Cap moved to 1280px, producing 41.2px at 1279px. |
| `keeps every union text pairing at its floor and every adjacent surface distinct` | Removed pairing count; blue-500 button at 3.76; dark secondary gray-950 separation at 1.00. |
| `pins every curation witness against the tuned sheet alone and rejects each removed repair` | Each repair removed separately; lifted-sheet navbar-text color fails the tuned baseline. |
| `differs from Bootstrap alone by the token table and nothing else` | Unmapped `.card` padding at 13px differs from the mapped oracle; identity-map `.btn-primary` background differs from tuned. |
| `agrees every Bootstrap infix with its Tailwind variant at each aligned breakpoint` | Bootstrap plus unexcluded Tailwind at 600px reads `block` versus `none`. |
| `pins the tuned-sheet statement sequence to the measured syntactic rewrites` | Appended rule changes the sequence. |

The helper cases additionally cover CSSOM shorthand-variable preservation, one-pass color chaining, independent scale/band stages, RFS preservation, missing color/address refusal, empty populations, and resolved shorthand contrast addresses.

## Execution notes

The available npm 10.9.7 refuses this repository's dev-engine floor. Commands used the already-installed npm 11.21.0 at `/root/.npm/_npx/676e59db29371ba5/node_modules/.bin`; nothing was installed. Long commands ran through the scaffold dispatch launcher's built twin. Pre-acceptance failures exposed reader defects (shorthand CSSOM handling and native declaration serialization), Sass selector quote normalization, and the raw-versus-compiled preflight distinction; each was corrected and its focused proof passed. No deviation-contract stop condition occurred.

## T3 handoff and off-limits failures

`test:setup:browser` exits **1**, with **141 passed / 6 failed**. All failures are in `tests/setupBrowser.test.ts`, whose source and helper are explicitly off-limits to T2. They are token/scale expectation changes, not members of the Host-bound set. [Complete evidence](accept-19-test-setup-browser.log).

| Failing title | Reading that moves |
| --- | --- |
| `applyFace and applyTheme > select a face and a color mode through the header buttons` | Tailwind dark body background: expected `#212529`, now `rgb(3, 7, 18)` (`#030712`). |
| `specimen readings > at 1280 px > reads every Tailwind reading the caption claims under the three faces in light color mode` | Tailwind container `max-width`: 1140px → 1280px; bare table `th` and `td` border-bottom-color: `rgb(222, 226, 230)` → `rgb(209, 213, 220)`. |
| `specimen readings > at 1280 px > reads every Tailwind reading the caption claims under the three faces in dark color mode` | Same container move; table borders: `rgb(73, 80, 87)` → `rgb(74, 85, 101)`. |
| `specimen readings > at 390 px > reads every Tailwind reading the caption claims under the three faces in light color mode` | The light table-border move; container remains `none`. |
| `specimen readings > at 390 px > reads every Tailwind reading the caption claims under the three faces in dark color mode` | The dark table-border move; container remains `none`. |
| `statechart tables > drives every face and color-mode row through the header buttons` | `tailwindcss:dark` still expects `#212529`; Chromium paints `rgb(3, 7, 18)`. |

The Bootstrap and unexcluded columns retain their existing values. T3 needs face-aware theme expectations, the tuned component baseline in the preservation/partition and paired-engine cases, and the additional token/contrast readings required by V §5. `tmp/probes/tokens2/partition.ts` contains the old partition mechanism rather than a callable `mapReading`; T2 ports no journey helper into owned code.

### Read-only journey result

`npm run test:journey` exits **1** after **495.022 seconds**: **72 passed, 18 failed, 6 skipped**. There are **15** failure instances whose expectations or dependent portfolio state move with this sheet, and **3** instances in the named Host-bound set. [Every full failing title and diagnostic](journey-failures.json), [the extracted readings](journey-readings.json), and [the complete run](accept-22-test-journey.log) are retained.

| Failing title in `tests/app/browser/integration.test.ts` | Variants / instances | Reading or consequence for T3 |
| --- | --- | --- |
| `showcase journeys > J4 compares the three faces through the Stylesheets buttons` | light-1280, dark-1280, light-390, dark-390 (4) | At 1280, the container now reads 1280px instead of 1140px. At both widths, table `th`/`td` border-bottom-color changes from `rgb(222, 226, 230)` to `rgb(209, 213, 220)` in light mode and from `rgb(73, 80, 87)` to `rgb(74, 85, 101)` in dark mode. |
| `showcase matrix > reads resolved values, Tailwind readings, the census, and contrast under its declared variant` | light-1280, dark-1280, light-390, dark-390 (4) | The same container and table-border readings fail before the remaining census/contrast clauses run. T3 also needs the required tuned-face contrast subjects and token additions. |
| `showcase matrix > attributes every component departure of the tailwindcss face to a declared cause other than preflight at both widths` | light-1280, reading 1280 and 390 (1) | The old lifted baseline records 9,596/9,494 departures and rejects 48 at each width. Examples: SVG `fill` changes `rgba(33, 37, 41, 0.75)` → `rgba(3, 7, 18, 0.75)`; form-control font-family changes from Bootstrap's system-ui stack to the recorded Tailwind fallback. All 96 rejected addresses are in the retained run/reading artifacts. T3 must adopt the tuned-alone baseline. |
| `showcase matrix > partitions the shared names under the three faces at both widths` | light-1280 (1) | Two container signatures at 1280 fail clause 2: expected 1140px, read 1280px. The assertion stops before the 390px iteration. T3's `mapReading`/baseline work owns this. |
| `showcase statecharts > drives the 'pair' header table through the header buttons` | light-390 (1) | `tailwindcss:dark` paints `rgb(3, 7, 18)` while the shared assertion expects `#212529`. |
| `showcase portfolio > places every registered state and writes the variant artifact` | light-1280, dark-1280, light-390, dark-390 (4) | `tailwindcss-face` is missing from `placed` after J4 stops on the changed readings. This is downstream of the specimen expectation failures. |

Host-bound failures observed, retained without repair:

| Failing title | Variant | Observed failure |
| --- | --- | --- |
| `showcase journeys > J8 drives the engine through the component sections and opens nothing on arrival` | light-390 | The `Uploads` toast region is not visible when read. This title/variant is in the Host-bound set. |
| `showcase statecharts > drives the 'accordion' table through its controls with motion=false` | light-390 | Warranty coverage's Enter burst misses the 5000ms condition. This title/variant is in the Host-bound set. |
| `showcase statecharts > drives the 'collapse' table through its controls with motion=false` | dark-390 | Delivery details and Expand details Enter bursts miss the 5000ms condition. This title/variant is in the Host-bound set. |

`showcase matrix > compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover` passes in all four variants. Its T3 baseline instruction remains applicable, but this run establishes no changed engine-output expectation. The Host-bound tooltip and navbar titles did not fail in this run.

The six off-limits browser-helper failures above and these journey failures are reported for the next unit. The owned T2 conformance, source, integration, and CSSOM helper proofs pass; the overall acceptance suite is **not all green**.

## Ordered acceptance

The sequence is recorded in `acceptance.json`. After the off-limits browser-helper failures, the remaining read-only commands continued in order through `acceptance-rest.ts`. No failing test was removed or edited to obtain these results.

| Command | Exit | Seconds | Tests / finding | Evidence |
| --- | --- | --- | --- | --- |
| `npm run check` | 0 | 60.937 |  | [log](accept-0-check.log) |
| `npm run lint:check` | 0 | 1.783 |  | [log](accept-1-lint.log) |
| `npm run format:check` | 0 | 4.218 |  | [log](accept-2-format.log) |
| `npm run build` | 0 | 22.814 |  | [log](accept-3-build.log) |
| `sha256sum dist/src/bootstrap/index.css dist/src/tailwindcss/index.css` | 0 | 0.006 |  | [log](accept-4-digests.log) |
| `npx vitest run --config tmp/units/flip-records/vite.writers.config.ts` | 0 | 2.795 | 2 passed (2) | [log](accept-5-recipe-1.log) |
| `npx vitest run --config tmp/units/tokens-t2/vite.preflight.config.ts` | 0 | 11.191 | 1 passed (1) | [log](accept-6-preflight-1.log) |
| `npx oxfmt --config .oxfmtrc.json --write tests/fixtures/tailwindcss/recipe.json app/browser/recipe.json tests/fixtures/tailwindcss/preflight.json` | 0 | 0.505 |  | [log](accept-7-records-format-1.log) |
| `npx vitest run --config tmp/units/flip-records/vite.writers.config.ts` | 0 | 2.837 | 2 passed (2) | [log](accept-8-recipe-2.log) |
| `npx vitest run --config tmp/units/tokens-t2/vite.preflight.config.ts` | 0 | 15.611 | 1 passed (1) | [log](accept-9-preflight-2.log) |
| `npx oxfmt --config .oxfmtrc.json --write tests/fixtures/tailwindcss/recipe.json app/browser/recipe.json tests/fixtures/tailwindcss/preflight.json` | 0 | 0.440 |  | [log](accept-10-records-format-2.log) |
| `cmp tmp/units/tokens-t2/record-0.json tests/fixtures/tailwindcss/recipe.json` | 0 | 0.005 | byte-identical | [log](accept-11-cmp-0.log) |
| `cmp tmp/units/tokens-t2/record-1.json app/browser/recipe.json` | 0 | 0.004 | byte-identical | [log](accept-12-cmp-1.log) |
| `cmp tmp/units/tokens-t2/record-2.json tests/fixtures/tailwindcss/preflight.json` | 0 | 0.004 | byte-identical | [log](accept-13-cmp-2.log) |
| `npm run test:setup` | 0 | 20.455 | 155 passed (155) | [log](accept-14-test-setup.log) |
| `npm run test:conformance` | 0 | 59.896 | 128 passed (128) | [log](accept-15-test-conformance.log) |
| `npm run test:src:bootstrap` | 0 | 17.253 | 14 passed (14) | [log](accept-16-test-src-bootstrap.log) |
| `npm run test:src:tailwindcss` | 0 | 34.835 | 10 passed (10) | [log](accept-17-test-src-tailwindcss.log) |
| `npm run test:integration` | 0 | 67.424 | 58 passed (58) | [log](accept-18-test-integration.log) |
| `npm run test:setup:browser` | 1 | 166.713 | 6 failed / 141 passed (147) | [log](accept-19-test-setup-browser.log) |
| `npm run test:guides` | 0 | 3.204 | 15 passed (15) | [log](accept-20-test-guides.log) |
| `npm run test:policy` | 0 | 3.631 | 119 passed / 1 skipped (120) | [log](accept-21-test-policy.log) |
| `npm run test:journey` | 1 | 495.022 | 18 failed / 72 passed / 6 skipped (96) | [log](accept-22-test-journey.log) |
| `git diff --check` | 0 | 0.041 |  | [log](accept-23-diff.log) |
| `git status --porcelain` | 0 | 0.006 |  | [log](accept-24-status.log) |

## Final tracked status

Only owned files differ. HEAD remains `6874b792647d6081a1b6d53406b89d76f7480806`. Nothing was committed.

```text
 M app/browser/recipe.json
 M src/tailwindcss/_tokens.scss
 M tests/conformance.test.ts
 M tests/fixtures/tailwindcss/preflight.json
 M tests/fixtures/tailwindcss/recipe.json
 M tests/integration.test.ts
 M tests/setup.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/tailwindcss/index.test.ts
```
