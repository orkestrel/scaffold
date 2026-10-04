Completed browse-11-6 in commit `cfc3ad4c2ae2eea17c0f68ac07914a1d6421fca9` on `ccr-d15a48b1-yyyll6`. The working tree is clean. No agents were spawned; nothing was pushed, published, or installed.

Both capture placements include the privacy, SVG, ancestor, and textarea repairs. The retained performance repair uses paired sibling pointers saved before pruning. All proposed micro changes were dropped.

The following table records the repair evidence. Red runs exited 1 with assertion failures; restored runs exited 0.

| Finding | Repair and proof | Red → green |
| --- | --- | --- |
| 1: privacy | Skip children only for controls actually lowered; sweep password and hidden inputs before serialization. Namespaced selects and iframe-realm adopted selects are pinned in both placements. | Original implementation: 4 failures → 4 passes. Child visitation: 2 failures → 2 passes. |
| 1: final sweep | Revive the old traversal omission: the sweep still protects both captures. Removing that sweep exposes the payload. | Sweep present: 2 passes; removed: 2 failures; restored: 2 passes. |
| 4: SVG | Only the outer SVG lowers its text; lowered foreignObject children enter the carrier. Both cases join CAPTURE_CASES. | 4 failures → 4 passes. |
| 7: traversal | Save previous node and element siblings before removing copied children. Corrupting the copied sibling pointer breaks mixed-node pruning. | 2 failures → 2 passes; performance evidence follows. |
| O1 | Apply closed-details, content-visibility, canvas/video/audio fallback, and shadow-assignment ancestor rules to direct reads. | 12 failures → 12 passes. |
| O2 | Replace expect.poll with waitForCondition and the fixed delay with a post-capture sentinel request. Active-clone substitutions independently break the DOM and isolated-world proofs. | Each substitution: 1 failure; restored: 1 pass. |
| O3 | Pin placeholder color and visibility, each horizontal listbox bound, image-input aria-hidden, and the invisible-button guard. | Each removed guard: 2 failures → 2 passes. |
| O4 | Pin passwords and hidden inputs inside forms, open dialogs, assigned slots, and child frames, including direct private-control reads. | Removed redaction: 8 failures → 8 passes. |
| O5 | Lower a painted placeholder from an empty textarea; omit an unpainted placeholder. | 2 failures → 2 passes. |
| O6 | Replace “may select” with “might select.” | Guide inspection and 248 passing guide tests. |
| O7 | Declare carrier/block separators and the normalized html handle in BrowserReadingInput remarks and the guide. | Guide parity passes; existing separator behavior remains tested. |

The original-source regression selection failed 24 tests and passed none; the identical selection against the repair passed 24. The scoped browser command for every following selector was:

`node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:browser tests/src/browser/helpers.test.ts -t "<selector>" --reporter=dot --reporter=json --outputFile.json=tmp/codex/<result>.json`

| Proof | Selector |
| --- | --- |
| Original regressions | `omits a direct read\|redacts adopted\|visits children of a namespaced\|lowers.*(nested SVG\|foreignObject\|textarea placeholder\|namespaced select privacy)` |
| Final sweep | `lowers.*namespaced select privacy` |
| Child traversal | `visits children of a namespaced` |
| Sibling traversal | `preserves paired siblings` |
| Placeholder guards | `lowers.*placeholder color`, `lowers.*placeholder visibility` |
| Horizontal bounds | `clips listbox` |
| Image and button guards | `lowers.*image privacy`, `lowers.*invisible button` |
| Privacy contexts | `lowers.*(form privacy\|dialog privacy\|slot privacy)\|redacts private controls in child` |

The sentinel controls used the same command with `--project service tests/service/document.test.ts -t "imports inertly"`. Exact results are retained in `browse-11-6-original.json`, `browse-11-6-mutations.json`, `browse-11-6-mutations-siblings.json`, `browse-11-6-greens.json`, `browse-11-6-sweep.json`, and `browse-11-6-sentinel.json` under `tmp/codex/`.

**Performance decision.** Keep the sibling walk; drop collection snapshots, per-node Sets, slot caching, optgroup caching, and reading aria-label before innerText. The independent confirmation reduced the 4,000-row capture from 211.1 to 147.8 ms in the DOM placement and from 211.5 to 148.1 ms in the compiled placement. Increasing rows fourfold increased original capture time 4.74×/4.72×, versus 4.04×/3.95× with sibling traversal. The visible grid exposed the growing traversal term; collapsed-panel and form differences were small.

Before the initial measurements, the keep criterion was a repeatable 2× improvement and 20 ms saved beyond sample variation. That criterion rejected the micro changes. The exploratory sibling comparison exposed an algorithmic gain masked by unchanged capture work. Before an independent confirmation, the algorithmic criterion was revised to at least 50 ms saved on the heavy grid, separated sample ranges, and near-linear scaling. Removing that much synchronous work is worthwhile even without halving the whole capture. The confirmation satisfied that revised criterion; it was not the exploratory run used again.

Fixtures model unvirtualized order grids with eight cells per row at 1,000, 2,000, and 4,000 rows, visible and inside closed details. These sizes exercise thousands of real row elements while staying inside the capture limit. The visible grid uses an invisible wrapper with visible row overrides, exercising the review's pruning pattern. The form has 100 editable line items, each with text/number fields, a grouped warehouse listbox, and a remove button, assigned through an open shadow slot. Veneer's actual `showcase/browser.html` was served locally with Vite preview. No 5,000-row target was carried over from the superseded cost brief.

Timings cover in-page capture and its serialized-size guard, excluding navigation, protocol transport, and text projection. Pilot comparisons used 3 warmups and 11 measured captures per variant; independent confirmation used 3 warmups and 17 captures in a fresh browser. These odd sample counts give an unambiguous median and quartiles without making fixture setup part of the timed work. Variant order alternated. Output equality was checked outside the timed interval; a missing-content control failed as required.

`Get-Process chrome,msedge,node` recorded other host processes. Before the first comparison: Chrome absent, 65 Edge processes using 1,431.5 MiB, and 33 Node processes using 5,650.9 MiB. Before the original-traversal comparison: Chrome absent, 71 Edge processes using 1,525.4 MiB, and 17 Node processes using 1,668.1 MiB. Raw process IDs, cumulative CPU readings, and working sets are retained in `browse-11-6-host-*.json`. This was a shared Windows host, not an idle-host claim. This unit ran no tests beside timed comparisons.

The tables report every measured variant. Values are median milliseconds; paired values mean DOM / compiled. Full samples and quartiles are in [the measurement ledger](/C:/Users/mikes/WebstormProjects/browser-wt-browse/tmp/codex/browse-11-6-performance.md). “Arrays” means snapshotting child collections; “Sets,” “Slots,” “Groups,” and “Label first” isolate the other proposed changes.

**Exploratory baseline retaining collection aliases.**

| Fixture | Baseline | Arrays | Sets | Slots | Groups | Label first |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| showcase | 111.9 / 128.1 | 169.0 / 165.6 | 113.8 / 121.4 | 124.5 / 112.5 | 117.8 / 118.1 | 113.2 / 111.4 |
| table-1000 | 54.4 / 57.0 | 80.9 / 78.5 | 52.2 / 49.8 | 53.6 / 52.5 | 54.1 / 53.7 | 51.8 / 53.3 |
| table-2000 | 108.3 / 110.9 | 152.4 / 151.5 | 104.6 / 100.9 | 108.7 / 105.7 | 113.4 / 109.9 | 105.6 / 107.9 |
| table-4000 | 240.5 / 235.9 | 309.2 / 297.7 | 233.7 / 234.8 | 240.9 / 233.3 | 243.1 / 240.6 | 237.4 / 232.4 |
| collapsed-1000 | 3.4 / 3.4 | 4.7 / 4.1 | 3.6 / 3.8 | 3.5 / 4.0 | 3.7 / 3.5 | 3.5 / 3.5 |
| collapsed-2000 | 7.2 / 7.1 | 9.3 / 10.1 | 7.2 / 7.0 | 7.1 / 7.1 | 7.3 / 7.7 | 7.9 / 7.5 |
| collapsed-4000 | 15.5 / 15.1 | 20.3 / 20.3 | 18.5 / 15.9 | 15.7 / 15.4 | 16.0 / 14.9 | 15.7 / 16.3 |
| form | 32.9 / 26.4 | 29.8 / 32.7 | 29.4 / 26.5 | 32.8 / 27.5 | 29.7 / 26.6 | 30.9 / 28.3 |

**Original collection access, isolated changes.**

| Fixture | Baseline | Arrays | Sets | Slots | Groups | Label first |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| showcase | 83.8 / 86.9 | 122.4 / 121.0 | 84.4 / 85.4 | 88.8 / 89.9 | 87.5 / 86.2 | 87.1 / 87.3 |
| table-1000 | 44.4 / 45.2 | 66.0 / 65.0 | 42.4 / 42.5 | 43.8 / 43.8 | 44.2 / 44.5 | 42.6 / 42.3 |
| table-2000 | 92.2 / 90.2 | 129.0 / 130.3 | 87.4 / 89.9 | 91.5 / 89.6 | 91.1 / 89.5 | 87.0 / 86.8 |
| table-4000 | 204.2 / 211.8 | 259.2 / 259.2 | 200.1 / 200.1 | 208.6 / 208.5 | 208.7 / 205.0 | 205.0 / 197.2 |
| collapsed-1000 | 2.8 / 2.8 | 3.6 / 3.6 | 2.9 / 2.9 | 2.9 / 2.8 | 2.9 / 2.9 | 2.8 / 2.8 |
| collapsed-2000 | 6.4 / 6.5 | 8.1 / 8.0 | 6.6 / 6.4 | 6.5 / 6.4 | 6.9 / 6.2 | 6.8 / 6.2 |
| collapsed-4000 | 13.4 / 13.1 | 16.6 / 16.5 | 13.0 / 13.1 | 13.2 / 13.3 | 13.6 / 13.2 | 13.5 / 13.2 |
| form | 21.0 / 20.9 | 21.1 / 21.6 | 20.8 / 20.6 | 21.1 / 20.9 | 20.7 / 20.8 | 20.7 / 21.2 |

**Exploratory sibling comparison.**

| Fixture | DOM before → after | Compiled before → after |
| --- | ---: | ---: |
| showcase | 85.2 → 68.1 | 87.5 → 68.3 |
| table-1000 | 44.0 → 36.2 | 44.9 → 35.8 |
| table-2000 | 92.7 → 73.9 | 91.2 → 71.7 |
| table-4000 | 209.8 → 146.9 | 211.3 → 145.5 |
| collapsed-1000 | 3.3 → 2.9 | 3.1 → 2.9 |
| collapsed-2000 | 6.4 → 6.0 | 6.2 → 5.9 |
| collapsed-4000 | 13.5 → 12.7 | 13.4 → 12.8 |
| form | 20.8 → 20.3 | 20.6 → 20.0 |

**Independent confirmation.**

| Fixture | DOM before → after | Compiled before → after |
| --- | ---: | ---: |
| showcase | 88.0 → 67.8 | 86.5 → 67.9 |
| table-1000 | 44.5 → 36.6 | 44.8 → 37.5 |
| table-2000 | 93.5 → 73.5 | 94.1 → 74.0 |
| table-4000 | 211.1 → 147.8 | 211.5 → 148.1 |
| collapsed-1000 | 3.1 → 2.9 | 3.1 → 2.9 |
| collapsed-2000 | 6.5 → 6.0 | 6.5 → 6.1 |
| collapsed-4000 | 13.9 → 12.8 | 13.5 → 13.0 |
| form | 21.4 → 21.0 | 20.8 → 20.2 |

For the decisive 4,000-row confirmation, DOM quartiles were [207.8, 216.7] ms before and [144.1, 152.5] ms after; compiled quartiles were [209.0, 216.1] and [146.8, 150.0] ms. Quartiles describe variation, not confidence intervals. No micro change met the stated keep criterion.

**Promoted benchmark.** `tests/src/core/compilers.test.ts` retains the guarded comparison with the original indexed traversal as control. It drives both the built DOM bundle and the source compiler through a real browser. After building, run `npm run test:bench -- tests/src/core/compilers.test.ts --run`. The promoted run exited 0; its median readings were:

| Rows / panel | DOM indexed → siblings | Compiled indexed → siblings |
| --- | ---: | ---: |
| 1000 / visible | 48.7 → 39.6 | 49.5 → 40.9 |
| 1000 / collapsed | 3.4 → 3.4 | 3.4 → 3.3 |
| 2000 / visible | 100.9 → 79.9 | 98.4 → 79.1 |
| 2000 / collapsed | 7.2 → 6.7 | 7.5 → 7.3 |
| 4000 / visible | 226.4 → 160.0 | 266.8 → 207.0 |
| 4000 / collapsed | 19.8 → 18.7 | 17.2 → 17.7 |

The exploratory benchmark was archived outside probe collection after promotion. The retained benchmark uses 17 inner measurements; its outer Tinybench iteration count is not the sample count for the capture readings.

**Final gates.** Commands ran in the required order after the final source edit. Every exit was read from the complete output.

| Command | Result | Exit |
| --- | --- | ---: |
| `npm run format:check` | 232 files checked | 0 |
| `npm run lint:check` | Passed | 0 |
| `npm run check` | Passed | 0 |
| `npm run test:src:core` | 1202 passed | 0 |
| `npm run test:src:browser` | 401 passed, 1 existing skip | 0 |
| `npm run test:src:server` | 253 passed, 9 existing skips | 0 |
| `npm run test:src:bin` | 4 passed, 1 existing skip | 0 |
| `npm run test:guides` | 248 passed | 0 |
| `npm run test:policy` | 119 passed, 1 existing skip | 0 |
| `npm run test:setup` | 175 passed, 3 existing skips | 0 |
| `npm run test:setup:browser` | 22 passed | 0 |
| `npm run build` | Core, browser, server, and bin built | 0 |
| `npm run test:service` | 138 passed | 0 |
| `git diff --check` | No output | 0 |
| `git status --porcelain` after commit | Empty | 0 |

Gate logs and durations are retained in `tmp/codex/browse-11-6-gate-*.log` and `browse-11-6-gates.json`.

Service validation required retries. The first full run had 137 passes and a Runtime.callFunctionOn timeout in the existing secret-recording journey. That case passed alone. The next full run had 137 passes and a stopped positive control in the existing wait-timeout journey. Both cases then passed together in isolation. Their code, assertions, and timeouts were unchanged; the final full-service result is the table's reading. The failed-run logs were preserved.

**Deviations and limits.** The algorithmic keep criterion was revised before independent confirmation, as disclosed earlier. The first exploratory baseline retained collection aliases from the stopped run; those readings are reported separately and were not substituted for the original-traversal comparison. No public property shape or dependency changed. The DOM placement can still invoke page-defined getters; inert-copy proofs do not promise to suppress page-world getter behavior.

The installed discovery script reported browser instance aliases as ungated/empty; the explicit browser gates collected and passed their suites. Browser setup emitted its existing close-timeout warning with exit 0. Build emitted API Extractor/TypeScript-version and output-format warnings with exit 0. No skip was added. The cleanup sweep was report-only; requested evidence and pre-existing artifacts were retained.
