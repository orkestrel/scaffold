# Drag 1 review

Worktree: `/home/user/.wave/veneer-drag`, detached at `867f3b4`; no commit. Full diff: [drag.patch](drag.patch), 23 files, 1,301 insertions and 23 deletions. All changed paths are owned. Every root browser source file except the one-row barrel change is byte-identical to the landing.

The six-file native module provides same-host pointer and keyboard sorting, cancelable host events, atomic moves with a fallback, and an owned polite output. The showcase adds the five-row Native specimen, explicit plugin composition, and a MutationObserver per host in `Showcase.start`. Its filtered callback toggles `opacity-50`, `border-top`, `border-bottom`, `border-primary`, and `border-2`; teardown disconnects observers. All five classes already belong to the admitted Bootstrap registry. The fragment has no style element; no fence exception was applied to Matrix. The two authorized snapshot pins and the exact Native ownership assertion are applied.

The final journey passes 102/102; final app-browser reads 244 passed and 2 failed. Those failures are retained below. Other requested final checks pass. The comparison has expected markup differences and therefore exits 67.

## Browser proofs

The complete source-browser suites pass 812/812 under Chrome 141.0.7390.37 and Chrome 153.0.8010.12. The following readings are the assertions exercised in both passing suites.

| Proof | Reading under 141 and 153 |
| --- | --- |
| Real pointer drag | First moves one place: Second, First, Third. Host events are start, move, end; move is `{from:0,to:1,by:'pointer'}` and end is `moved:true`. |
| Keyboard | The same First item moves one place with Alt+ArrowDown, `{from:0,to:1,by:'keyboard'}`; focus stays on it. |
| Prevented move | Pointer and keyboard order stay unchanged; both ends read `moved:false`. |
| Handle and control refusals | A real grab outside the handle starts nothing, including when the parent item is draggable. Input-descendant grabs and prevented starts are refused. Authored draggable attributes survive. |
| Nested crossing | Real dragleave from Other child to Nested target retains `data-vn-insert='before'`. |
| Outside drop | Real drag to the external textarea leaves order unchanged, emits one `moved:false` end, exports no text payload, and inserts no text. |
| External and cross-host drops | External text and file events are unaccepted; real dragging between hosts with matching group values exchanges nothing. |
| Live region | Pointer and keyboard moves announce `Moved to position 2 of 3`; the input case announces `Moved to position 2 of 2`. |
| moveBefore | The method exists; an input descendant keeps `Retained edit` and focus after its item moves. |
| Axis and ends | Row-axis Alt+ArrowRight moves once, unrelated arrows do nothing, and movement stops at both ends. |
| Composition and teardown | No native dragstart listener or output appears without composition. Composition acquires the listener and owned output; teardown releases them. Configured identity and authored-output preservation pass. |
| Escape | Ordinary Escape reaches the document once. During native dragging, raw CDP Escape produces zero document keydowns and zero ends. Explicit browser-protocol dragCancel then produces one native dragend, `moved:false`, no drop, unchanged order, and cleared indicator. Physical Escape cancellation is not established. |
| Separation | Every Bootstrap root file except index is read as text and has no drags import or protected native tokens. Bootstrap plugin names and order stay pinned. |

The versioned native traces are in `drag-proofs.json`; gate evidence is in `drag-gates.json`.


## Route shape

`createDragPlugin()` boots `[data-vn-drag]`. Capture routing matches `[data-vn-drag] > *` for pointerdown, dragstart, dragenter, dragover, dragleave, drop, dragend, and keydown. The trigger's parent is the host. The controller remembers the item in that host, reads authored handles and the original pressed control, and admits only that host's session. Drop, dragend, and Escape clear outstanding state through scoped context. The module holds no native listeners itself. `createBootstrapPlugins()` is unchanged.


## Final journey comparison

The candidate is `drag-journey-r12`, with registration `102/0`, four files and 102 cases passed. The new case, `reorders the native sortable list by pointer and keyboard under every face`, passes once per variant, driving all three faces, actual drag input, Alt keys, order, focus, live text, utility painting, registry admission, and utility cleanup. The four existing Matrix entries pass.

The queued comparison reads `Different: 196 differences`, exit 67. [Every numbered difference](drag-differences-r12.json) carries its classification, reason, and full evidence; [raw comparison](drag-compare-r12.md) preserves the tool output. Classification counts: {'expected': 196}.

| Difference family | Count | Classification |
| --- | --- | --- |
| preservation counters | 168 | expected under the amended ruling |
| Native coverage and census | 2 | expected under the amended ruling |
| row order | 1 | expected under the amended ruling |
| partition counters | 24 | expected under the amended ruling |
| Native contents journal | 1 | expected under the amended ruling |

Closed preservation reads 10,547 → 10,565 elements and +18 boxes; excluded elements 119 → 123. Light signatures grow 1,746 → 1,749, dark 1,750 → 1,753; layout exclusions +6, invisible exclusions +4, excluded signatures +3. Active component summaries retain their active readings and count +22 excluded elements. Partition element population reads 8,001 → 8,010 under each face and width. Causes, copied-rule counts, propagation, lost, missing, and undeclared lists are unchanged. All changed fields are enumerated by channel, width, theme, and state in [paired preservation deltas](drag-preservation-deltas-r12.json).

The [coverage delta](drag-coverage-r12.json) changes nine existing signature counts by one: Native contents group label/list, contents link, specimen heading/caption, figure/figcaption, section, and group heading. No signature key departs. Native navigation adds four Sortable list clicks to the journal.

Removing only preservation and signature-coverage families leaves exactly the same ordered resolved rows in all variants, including all contrast readings; [row evidence](drag-row-order-r12.json). The [statechart evidence](drag-statechart-order-r12.json) directly compares the recorded ordered names in each chart; all 38 chart sequences are identical. No statechart row moves.

## Contents deadline and final app findings

Exact case title: `reads every header button at 4.5:1 or more, pressed or not, in both color modes`, `tests/app/browser/Showcase.test.ts:512`. It has no explicit timeout; the browser test default is 15,000 ms. The final Native tree measures **15,123.8 ms**, status failed, `Test timed out in 15000ms`. Earlier amended r11 measures 13,792.4 ms and passes. The prior `Timeout 65ms exceeded` was a remaining per-action allowance calculated from the same test budget, not a fixed 65 ms Contents deadline. No deadline, helper, config, or body line changed. Evidence: r12 `report.json` and `stderr.log`, r11 `report.json`; local defaults and allowance sources are recorded in [drag-amendment.json](drag-amendment.json).

One hypothesis is that the existing six-face async work can exhaust the fixed budget. The following unchanged case, `switches every outline button's text to its filled color on hover, press, and active under every face`, then fails after 3,513.9 ms with `Interactive target "Bootstrap" is ambiguous across 2 elements`. One hypothesis is that the timed-out async body continues through its awaited pointer cleanup before destroying its page, overlapping the following mounted showcase. These are findings, not established causes; neither failed body was retried.

## Gate commands and results

All queued folders below are under `/home/user/veneer/tmp/units/journey-cost/runs/`; cwd is `/home/user/.wave/veneer-drag`, with `PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH`. Every final command used a fresh detached `nohup bash -c 'exec setsid flock -w 7200 ...'` waiter. Polling used shell `sleep 120` calls; no queued command was canceled. The full journey uses `--kind journey`; the other gates use `--kind command`. Each folder records `start.json`, `end.json`, and the bare stdout/stderr. The complete ledger, including every previous failed or dead launch, is [drag-gates.json](drag-gates.json).

| Command | Folder | Exit | Bare result |
| --- | --- | --- | --- |
| `npm run build` | `drag-build-r10` | 0 | completed |
| `npm run format:check` | `drag-format-r12` | 0 | All matched files use the correct format. |
| `npm run lint:check` | `drag-lint-r12` | 0 | completed |
| `npm run check` | `drag-check-r12` | 0 | completed |
| `npm run test:src:browser` | `drag-src-141-r8` | 0 | Test Files  34 passed (34); Tests  812 passed (812) |
| `PLAYWRIGHT_EXECUTABLE_PATH=/home/user/.wave/pw-153/chromium-1243/chrome-linux64/chrome npm run test:src:browser` | `drag-src-153-r8` | 0 | Test Files  34 passed (34); Tests  812 passed (812) |
| `npm run test:setup:browser` | `drag-setup-browser-r12` | 0 | Test Files  2 passed (2); Tests  205 passed (205) |
| `npm run test:app:browser -- --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/drag-app-browser-r12/report.json` | `drag-app-browser-r12` | 1 | Test Files  1 failed \| 7 passed (8); Tests  2 failed \| 244 passed (246) |
| `npm run test:integration` | `drag-integration-r6` | 0 | Test Files  1 passed (1); Tests  60 passed (60) |
| `npm run test:guides` | `drag-guides-r12` | 0 | Test Files  1 passed (1); Tests  20 passed (20) |
| `npm run test:policy` | `drag-policy-r6` | 0 | Test Files  1 passed (1); Tests  119 passed \| 1 skipped (120) |
| `npm run test:config` | `drag-config-r6` | 0 | Test Files  1 passed (1); Tests  227 passed \| 1 skipped (228) |
| `npm run test:setup` | `drag-setup-r6` | 0 | Test Files  2 passed (2); Tests  186 passed (186) |
| `npm run test:conformance` | `drag-conformance-r6` | 0 | Test Files  1 passed (1); Tests  130 passed (130) |
| `npm run test:journey -- --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/drag-journey-r12/report.json` | `drag-journey-r12` | 0 | Test Files  4 passed (4); Tests  102 passed (102) |
| `node /home/user/veneer/tmp/units/journey-cost/compare.ts --baseline /home/user/veneer/tmp/units/journey-cost/runs/landing-867f3b4-journey --candidate /home/user/veneer/tmp/units/journey-cost/runs/drag-journey-r12 --host-bound /home/user/veneer/tmp/units/journey-cost/host-bound.json --registration 102/0 --moves /home/user/veneer/tmp/units/journey-cost/redesign-moves.json --out /home/user/.wave/veneer-drag/tmp/units/drag-compare-r12.md` | `drag-compare-r12` | 67 | Different: 196 differences; see /home/user/.wave/veneer-drag/tmp/units/drag-compare-r12.md |
| `bash -c 'npm run build:showcase && sha256sum showcase/browser.html'` | `drag-showcase-a-r12` | 0 | 1378bea975ced7c05d77c5f4a8cf1c2e662302c7de86f18584722643ffa1c1a9  showcase/browser.html |
| `bash -c 'npm run build:showcase && sha256sum showcase/browser.html'` | `drag-showcase-b-r12` | 0 | 1378bea975ced7c05d77c5f4a8cf1c2e662302c7de86f18584722643ffa1c1a9  showcase/browser.html |

The unchanged module and proof files carry the two passing r8 source-browser readings. Other original gates unaffected by the consumer amendment carry their recorded readings above. The final consumer, guide, and app checks are the fresh r12 readings.

Both final showcase SHA-256 hashes are `1378bea975ced7c05d77c5f4a8cf1c2e662302c7de86f18584722643ffa1c1a9`. The generated file is saved as [drag-showcase.html](drag-showcase.html); the tracked `showcase/browser.html` is restored byte-for-byte.

## Deviations

| Expected | Found and evidence | Done or not | One hypothesis |
| --- | --- | --- | --- |
| Detached queue waits survive the shell | Four old foreground waits returned shell exit 143 before any test ran; plain nohup attempts had no runner end. User identified shell cleanup, with no queue fault. Ledger retains all attempts. | Done: fresh folders ran with nohup and setsid; no queued command canceled. | The shell tool cleans its process group; setsid separates the detached waiter. |
| A real drag lands after the target midpoint | Initial harness defaults landed before; initial CDP motion omitted the held left button. Earlier failed proof readings remain in the ledger. | Done: explicit target offset and held left button; both full source-browser suites pass. | Default harness coordinates and button state did not express the intended grab and insertion side. |
| Escape reaches a document listener during native dragging | Both actual browser versions give zero document keydowns and zero ends for injected Escape; protocol dragCancel then gives one dragend and moved=false. See drag-proofs.json and the guide departure. | Departure recorded. Native cancellation proven; physical Escape cancellation not established. | Renderer key injection may differ from operating-system drag cancellation. |
| The initial fence renders the native state | The amended ruling refuses the fence. Fragment style removed entirely; observer renders five admitted utility classes. The final native journey proves opacity, insertion borders, registry admission, and cleanup under every face. | Done under the amended contract; no native sheet, cursor rule, touch-action rule, or drag inline style. | Existing Bootstrap utilities provide the consumer rendering without adding a stylesheet. |
| Native participates in census and navigation | Initial placement after Tailwind fell beyond the census boundary and prevented the last-heading scroll reading; earlier journey failures are retained. | Done: Native precedes Tailwind; no census helper changed. | Existing readers use Tailwind as the final boundary. |
| The new journey resolves reachable handles | The first draft asked the focus-reach reader to resolve non-focusable list items. | Done: journey resolves grip buttons and reads the list directly; all four final entries pass. | The interaction reader requires focus reach. |
| The implementation passes lint | Earlier module lint rejected array shorthand; r11 rejects a locally declared paint function at Showcase.ts:156. | Done: Array<T> and direct observer callback; drag-lint-r12 exits 0. | The repository policies require explicit array types and admit nested functions only in callback positions. |
| The guide resolves its adapter reference | drag-guides-r11 rejects ../app/browser/Showcase.ts; guide inventory patterns exclude app files. | Done: plain file-and-method reference; drag-guides-r12 passes 20/20. | The guide reader resolves links against its inventory, which omits app/. |
| The formal comparison is instrumented | An earlier read-only analysis ran directly; subsequent formal comparisons, including r12, ran through the host queue. | Done: final compare folder records command, exit, and bare result. | Read-only classification and the formal gate require different instrumentation. |
| Matrix admits the native showcase markup | The previous fence caused four Matrix failures and missing contrast readings. The final journey passes all four Matrix entries and retains four contrast rows in each variant. | Done: remove the fence and render utilities; both original extractStyles assertions stay unchanged. | The fence violated the exact style census; utility classes are already admitted. |
| Native fits app snapshots | Prior pins omitted NATIVE_GROUP and expected 72 contents links. | Done: only the authorized export row and 73-link pin changed; both final snapshot cases pass. | The snapshots enumerate the landing surface explicitly. |
| The Contents contrast case finishes within its deadline | Final r12 duration is 15,123.8 ms; error is Test timed out in 15000ms. Earlier amended r11 passes at 13,792.4 ms. Prior 65 ms was a remaining action allowance, not a fixed Contents deadline. Exact title and JSON evidence appear below. | Not fixed; unchanged 15,000 ms deadline and case body, no body-failure retry. | The existing six-face async work can exhaust the fixed test budget. |
| The following outline case resolves one header | Final case at Showcase.test.ts:607 fails after 3,513.9 ms: Interactive target Bootstrap is ambiguous across 2 elements. | Not fixed; recorded as a second final app finding; its body and deadline are unchanged. | The timed-out async case may continue through its awaited cleanup while the next showcase mounts. |
| All journey differences fit the prediction | Final comparison has 196 differences, classified individually in drag-differences-r12.json. Preservation and partition counters are expected under the amended ruling; no Matrix failures or missing contrast readings remain. | Done: full numbered evidence, paired counter deltas, coverage deltas, remaining-row order, and statechart order are saved. | The new markup expands the reader populations while reusing registered Bootstrap classes. |

## Direct gates and status

`git -C /home/user/.wave/veneer-drag diff --check` — exit 0

```text
No output
```

`git -C /home/user/.wave/veneer-drag diff --stat -- src/browser/*.ts` — exit 0

```text
 src/browser/index.ts | 1 +
 1 file changed, 1 insertion(+)
```

`git -C /home/user/.wave/veneer-drag status --porcelain` — exit 0

```text
 M ROADMAP.md
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/main.ts
 M guides/veneer.md
 M src/browser/index.ts
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/constants.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/app/browser/sections/integration.test.ts
 M tests/src/browser/index.test.ts
?? app/browser/sections/sortable-list.html
?? src/browser/drags/
?? tests/src/browser/drags/
```

The section census test changes only the authorized assertion. The app export and contents snapshot files change only their authorized pins. The two existing Matrix style assertions are unchanged. No commit was made. All required queued work has completed; the final app gate remains failed as explicitly recorded.

## Every recorded launch

| Command | Folder | Exit | Bare result |
| --- | --- | --- | --- |
| `npm run test:src:browser -- tests/src/browser/drags` | `drag-module-141-r2` | no runner end |  |
| `npm run check` | `drag-check-r2` | no runner end |  |
| `npm run lint:check` | `drag-lint-r2` | no runner end |  |
| `npm run test:guides` | `drag-guides-r2` | no runner end |  |
| `npm run build` | `drag-build-r3` | no runner end |  |
| `npm run format:check` | `drag-format-r3` | no runner end |  |
| `npm run test:src:browser` | `drag-src-141-r3` | no runner end |  |
| `PLAYWRIGHT_EXECUTABLE_PATH=/home/user/.wave/pw-153/chromium-1243/chrome-linux64/chrome npm run test:src:browser` | `drag-src-153-r3` | no runner end |  |
| `npm run test:setup:browser` | `drag-setup-browser-r3` | no runner end |  |
| `npm run test:app:browser` | `drag-app-browser-r3` | no runner end |  |
| `npm run test:integration` | `drag-integration-r3` | no runner end |  |
| `npm run test:policy` | `drag-policy-r3` | no runner end |  |
| `npm run test:config` | `drag-config-r3` | no runner end |  |
| `npm run test:setup` | `drag-setup-r3` | no runner end |  |
| `npm run test:conformance` | `drag-conformance-r3` | no runner end |  |
| `npm run test:src:browser -- tests/src/browser/drags` | `drag-module-141-r4` | no runner end |  |
| `npm run test:src:browser -- tests/src/browser/drags` | `drag-module-141-r5` | 1 | Test Files  2 failed \| 2 passed (4); Tests  3 failed \| 8 passed (11) |
| `npm run check` | `drag-check-r6` | 0 | completed |
| `npm run lint:check` | `drag-lint-r6` | 1 | failed; see stdout.log and stderr.log |
| `npm run test:guides` | `drag-guides-r6` | 0 | Test Files  1 passed (1); Tests  20 passed (20) |
| `npm run build` | `drag-build-r6` | 0 | completed |
| `npm run format:check` | `drag-format-r6` | 0 | All matched files use the correct format. |
| `npm run test:src:browser` | `drag-src-141-r6` | 1 | Test Files  1 failed \| 33 passed (34); Tests  1 failed \| 811 passed (812) |
| `PLAYWRIGHT_EXECUTABLE_PATH=/home/user/.wave/pw-153/chromium-1243/chrome-linux64/chrome npm run test:src:browser` | `drag-src-153-r6` | 1 | Test Files  1 failed \| 33 passed (34); Tests  1 failed \| 811 passed (812) |
| `npm run test:setup:browser` | `drag-setup-browser-r6` | 0 | Test Files  2 passed (2); Tests  205 passed (205) |
| `npm run test:app:browser` | `drag-app-browser-r6` | 1 | Test Files  2 failed \| 6 passed (8); Tests  2 failed \| 244 passed (246) |
| `npm run test:integration` | `drag-integration-r6` | 0 | Test Files  1 passed (1); Tests  60 passed (60) |
| `npm run test:policy` | `drag-policy-r6` | 0 | Test Files  1 passed (1); Tests  119 passed \| 1 skipped (120) |
| `npm run test:config` | `drag-config-r6` | 0 | Test Files  1 passed (1); Tests  227 passed \| 1 skipped (228) |
| `npm run test:setup` | `drag-setup-r6` | 0 | Test Files  2 passed (2); Tests  186 passed (186) |
| `npm run test:conformance` | `drag-conformance-r6` | 0 | Test Files  1 passed (1); Tests  130 passed (130) |
| `npm run test:journey -- --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/drag-journey-r6/report.json` | `drag-journey-r6` | 65 | Test Files  4 failed (4); Tests  16 failed \| 86 passed (102) |
| `bash -c 'npm run build:showcase && sha256sum showcase/browser.html'` | `drag-showcase-a-r6` | 0 | 0aef9bbf24a02500d3bb941e5080cb9b2efef62eda6a0b898386fd3b108f1904  showcase/browser.html |
| `bash -c 'npm run build:showcase && sha256sum showcase/browser.html'` | `drag-showcase-b-r6` | 0 | 0aef9bbf24a02500d3bb941e5080cb9b2efef62eda6a0b898386fd3b108f1904  showcase/browser.html |
| `npm run test:src:browser -- tests/src/browser/drags` | `drag-module-141-r7` | 1 | Test Files  1 failed \| 3 passed (4); Tests  1 failed \| 10 passed (11) |
| `npm run lint:check` | `drag-lint-r7` | 0 | completed |
| `PLAYWRIGHT_EXECUTABLE_PATH=/home/user/.wave/pw-153/chromium-1243/chrome-linux64/chrome npm run test:src:browser -- tests/src/browser/drags` | `drag-module-153-r8` | 1 | Test Files  1 failed \| 3 passed (4); Tests  1 failed \| 10 passed (11) |
| `npm run test:src:browser` | `drag-src-141-r8` | 0 | Test Files  34 passed (34); Tests  812 passed (812) |
| `PLAYWRIGHT_EXECUTABLE_PATH=/home/user/.wave/pw-153/chromium-1243/chrome-linux64/chrome npm run test:src:browser` | `drag-src-153-r8` | 0 | Test Files  34 passed (34); Tests  812 passed (812) |
| `npm run test:journey -- --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/drag-journey-r9/report.json` | `drag-journey-r9` | 1 | Test Files  4 failed (4); Tests  4 failed \| 98 passed (102) |
| `npm run build` | `drag-build-r10` | 0 | completed |
| `npm run format:check` | `drag-format-r10` | 0 | All matched files use the correct format. |
| `npm run lint:check` | `drag-lint-r10` | 0 | completed |
| `npm run check` | `drag-check-r10` | 0 | completed |
| `npm run test:guides` | `drag-guides-r10` | 0 | Test Files  1 passed (1); Tests  20 passed (20) |
| `bash -c 'npm run build:showcase && sha256sum showcase/browser.html'` | `drag-showcase-a-r10` | 0 | 14bfb517790f64208ec806ae0ded0e3801ee385684cff3d87d3a02a81acd3e04  showcase/browser.html |
| `bash -c 'npm run build:showcase && sha256sum showcase/browser.html'` | `drag-showcase-b-r10` | 0 | 14bfb517790f64208ec806ae0ded0e3801ee385684cff3d87d3a02a81acd3e04  showcase/browser.html |
| `npm run test:app:browser` | `drag-app-browser-r10` | 1 | Test Files  2 failed \| 6 passed (8); Tests  3 failed \| 243 passed (246) |
| `npm run check:src:browser` | `drag-types` | 0 | completed |
| `npm run build` | `drag-wt-build` | 0 | completed |
| `npm run test:src:browser -- tests/src/browser/drags` | `drag-module-141` | 143 | Killed while waiting for the lock; no test ran |
| `npm run check` | `drag-check-initial` | 143 | Killed while waiting for the lock; no test ran |
| `npm run lint:check` | `drag-lint-initial` | 143 | Killed while waiting for the lock; no test ran |
| `npm run test:app:browser` | `drag-app-browser` | 143 | Killed while waiting for the lock; no test ran |
| `node /home/user/veneer/tmp/units/journey-cost/compare.ts --baseline /home/user/veneer/tmp/units/journey-cost/runs/landing-867f3b4-journey --candidate /home/user/veneer/tmp/units/journey-cost/runs/drag-journey-r9 --host-bound /home/user/veneer/tmp/units/journey-cost/host-bound.json --registration 102/0 --moves /home/user/veneer/tmp/units/journey-cost/redesign-moves.json --out /home/user/.wave/veneer-drag/tmp/units/drag-compare-r10.md` | `drag-compare-r10` | 67 | Different: 211 differences; see /home/user/.wave/veneer-drag/tmp/units/drag-compare-r10.md |
| `npm run test:app:browser -- --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/drag-app-browser-r11/report.json` | `drag-app-browser-r11` | 0 | Test Files  8 passed (8); Tests  246 passed (246) |
| `npm run test:setup:browser` | `drag-setup-browser-r11` | 0 | Test Files  2 passed (2); Tests  205 passed (205) |
| `npm run test:journey -- --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/drag-journey-r11/report.json` | `drag-journey-r11` | 0 | Test Files  4 passed (4); Tests  102 passed (102) |
| `bash -c 'npm run build:showcase && sha256sum showcase/browser.html'` | `drag-showcase-a-r11` | 0 | 46011e55a86252984169afb3ec7971546ea0431acc431b64b48d3e6441e0ec48  showcase/browser.html |
| `bash -c 'npm run build:showcase && sha256sum showcase/browser.html'` | `drag-showcase-b-r11` | 0 | 46011e55a86252984169afb3ec7971546ea0431acc431b64b48d3e6441e0ec48  showcase/browser.html |
| `npm run format:check` | `drag-format-r11` | 0 | All matched files use the correct format. |
| `npm run lint:check` | `drag-lint-r11` | 1 | failed; see stdout.log and stderr.log |
| `npm run check` | `drag-check-r11` | 0 | completed |
| `npm run test:guides` | `drag-guides-r11` | 1 | Test Files  1 failed (1); Tests  1 failed \| 19 passed (20) |
| `node /home/user/veneer/tmp/units/journey-cost/compare.ts --baseline /home/user/veneer/tmp/units/journey-cost/runs/landing-867f3b4-journey --candidate /home/user/veneer/tmp/units/journey-cost/runs/drag-journey-r11 --host-bound /home/user/veneer/tmp/units/journey-cost/host-bound.json --registration 102/0 --moves /home/user/veneer/tmp/units/journey-cost/redesign-moves.json --out /home/user/.wave/veneer-drag/tmp/units/drag-compare-r11.md` | `drag-compare-r11` | 67 | Different: 196 differences; see /home/user/.wave/veneer-drag/tmp/units/drag-compare-r11.md |
| `npm run format:check` | `drag-format-r12` | 0 | All matched files use the correct format. |
| `npm run lint:check` | `drag-lint-r12` | 0 | completed |
| `npm run check` | `drag-check-r12` | 0 | completed |
| `npm run test:guides` | `drag-guides-r12` | 0 | Test Files  1 passed (1); Tests  20 passed (20) |
| `npm run test:app:browser -- --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/drag-app-browser-r12/report.json` | `drag-app-browser-r12` | 1 | Test Files  1 failed \| 7 passed (8); Tests  2 failed \| 244 passed (246) |
| `npm run test:setup:browser` | `drag-setup-browser-r12` | 0 | Test Files  2 passed (2); Tests  205 passed (205) |
| `npm run test:journey -- --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/drag-journey-r12/report.json` | `drag-journey-r12` | 0 | Test Files  4 passed (4); Tests  102 passed (102) |
| `bash -c 'npm run build:showcase && sha256sum showcase/browser.html'` | `drag-showcase-a-r12` | 0 | 1378bea975ced7c05d77c5f4a8cf1c2e662302c7de86f18584722643ffa1c1a9  showcase/browser.html |
| `bash -c 'npm run build:showcase && sha256sum showcase/browser.html'` | `drag-showcase-b-r12` | 0 | 1378bea975ced7c05d77c5f4a8cf1c2e662302c7de86f18584722643ffa1c1a9  showcase/browser.html |
| `node /home/user/veneer/tmp/units/journey-cost/compare.ts --baseline /home/user/veneer/tmp/units/journey-cost/runs/landing-867f3b4-journey --candidate /home/user/veneer/tmp/units/journey-cost/runs/drag-journey-r12 --host-bound /home/user/veneer/tmp/units/journey-cost/host-bound.json --registration 102/0 --moves /home/user/veneer/tmp/units/journey-cost/redesign-moves.json --out /home/user/.wave/veneer-drag/tmp/units/drag-compare-r12.md` | `drag-compare-r12` | 67 | Different: 196 differences; see /home/user/.wave/veneer-drag/tmp/units/drag-compare-r12.md |
