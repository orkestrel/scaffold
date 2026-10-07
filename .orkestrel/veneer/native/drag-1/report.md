Implemented Drag 1 and the consumer utility adapter. [Full diff](/home/user/.wave/veneer-drag/tmp/units/drag.patch): **23 files, 1,301 insertions, 23 deletions**. No commit.

The final journey passes **102/102**. The final app browser gate has **244 passed, 2 failed**, detailed below. The fragment’s `<style>` is removed; the two snapshot pins are applied; both Matrix `extractStyles` assertions remain unchanged.

The module writes state attributes. `Showcase.start` observes them and toggles the five existing Bootstrap utilities; teardown disconnects the observers. The final native journey proves painting, registry admission, cleanup, pointer sorting, keyboard sorting, focus, and live text under every face.

Both full source-browser suites pass **812/812**.

| Proof | Chrome 141.0.7390.37 and 153.0.8010.12 |
|---|---|
| Real pointer drag | Order becomes Second, First, Third. Events: `start`, `move`, `end`; move `{from:0,to:1,by:'pointer'}`, end `moved:true`. |
| Keyboard | Alt+ArrowDown moves the same item; `{from:0,to:1,by:'keyboard'}`; focus remains. |
| Prevented move | Pointer and keyboard order unchanged; ends read `moved:false`. |
| Handle refusal | Real grab outside the handle starts nothing, including with a draggable parent. Authored `draggable` survives. |
| Control refusal | Input-descendant grabs and prevented starts are refused. |
| Nested crossing | Real crossing between nested children retains the insertion indicator. |
| Outside drop | No move; one `moved:false` end; no text payload or text insertion. |
| External/cross-host | External text/files refused; matching group values exchange nothing. |
| Live region | `Moved to position 2 of 3`; input case: `Moved to position 2 of 2`. |
| `moveBefore` | Method exists; input retains `Retained edit` and focus. |
| Axis/ends | Row-axis Alt+ArrowRight works; unrelated arrows do nothing; no wrap. |
| Composition/lifetime | No dragstart listener or output without composition; teardown releases both; authored output preserved. |
| Purity | Root-file token/import checks and Bootstrap plugin names/order pass. |
| Escape | Ordinary Escape reaches the document once. Native-session injected Escape produces **zero keydowns and zero ends**. Explicit protocol cancellation then produces one dragend, `moved:false`, no drop/move, and cleared indicator. |

The [guide departure](/home/user/.wave/veneer-drag/guides/veneer.md:1105) records the Escape reading. Physical Escape cancellation remains unestablished. [Versioned traces](/home/user/.wave/veneer-drag/tmp/units/drag-proofs.json) preserve both readings.

Routing boots `[data-vn-drag]` and captures `[data-vn-drag] > *` for `pointerdown`, all six native drag events, and `keydown`. The trigger’s parent supplies the host; scoped clearing handles drop, dragend, and Escape. Admission requires that host’s recorded drag. `emitEvent` and `createBootstrapPlugins()` are unchanged.

The queued [final comparison](/home/user/.wave/veneer-drag/tmp/units/drag-compare-r12.md) exits **67**, reporting **196 differences**. [Every difference is individually classified](/home/user/.wave/veneer-drag/tmp/units/drag-differences-r12.json): **196 expected, zero findings**.

| Difference family | Count | Classification |
|---|---:|---|
| Preservation counters and row/line/journal copies | 168 | Expected under amended ruling |
| Partition counters | 24 | Expected under amended ruling |
| Native coverage/census | 2 | Expected |
| Native contents journal | 1 | Expected |
| Row-order summary, dark-390 | 1 | Expected; remaining rows retain exact order |

Closed preservation gains 18 elements and boxes; excluded elements read 119→123. Light signatures read 1,746→1,749 and dark 1,750→1,753; layout exclusions +6, invisible exclusions +4, excluded signatures +3. Active summaries retain their readings and count +22 excluded elements. Partition population reads 8,001→8,010. Causes, copies, propagation, lost, missing, and undeclared lists are unchanged.

**Matrix failures and missing contrast readings are gone.** All four contrast rows remain in every variant. All **38 statechart sequences retain their ordered rows**. [Counter deltas](/home/user/.wave/veneer-drag/tmp/units/drag-preservation-deltas-r12.json), [coverage](/home/user/.wave/veneer-drag/tmp/units/drag-coverage-r12.json), [remaining row order](/home/user/.wave/veneer-drag/tmp/units/drag-row-order-r12.json), and [statechart order](/home/user/.wave/veneer-drag/tmp/units/drag-statechart-order-r12.json) contain the evidence.

The Contents case is **“reads every header button at 4.5:1 or more, pressed or not, in both color modes”**, at [Showcase.test.ts:512](/home/user/.wave/veneer-drag/tests/app/browser/Showcase.test.ts:512). Its unchanged deadline is **15,000 ms**. With Native present:

- r11 passed in **13,792.4 ms**.
- Final r12 failed after **15,123.8 ms**: `Test timed out in 15000ms`.
- The earlier **65 ms** was remaining action allowance, not a fixed Contents deadline.

One hypothesis is that the existing six-face work exhausts the test budget. The following case, **“switches every outline button's text to its filled color on hover, press, and active under every face”**, failed after **3,513.9 ms** with `Interactive target "Bootstrap" is ambiguous across 2 elements`. One hypothesis is that the timed-out body continues through awaited cleanup while the next showcase mounts. Neither deadline nor body was changed; neither failure was retried.

All queued folders below are under `/home/user/veneer/tmp/units/journey-cost/runs/`, with cwd `/home/user/.wave/veneer-drag` and the supplied npm11 PATH. Commands ran detached through the lock. No queued command was canceled. `F` denotes the absolute folder in that row.

| Command | Folder | Exit | Bare result |
|---|---|---:|---|
| `npm run build` | `drag-build-r10` | 0 | completed |
| `npm run format:check` | `drag-format-r12` | 0 | All matched files use the correct format. |
| `npm run lint:check` | `drag-lint-r12` | 0 | completed |
| `npm run check` | `drag-check-r12` | 0 | completed |
| `npm run test:src:browser` | `drag-src-141-r8` | 0 | 34 files; 812 tests passed |
| `PLAYWRIGHT_EXECUTABLE_PATH=/home/user/.wave/pw-153/chromium-1243/chrome-linux64/chrome npm run test:src:browser` | `drag-src-153-r8` | 0 | 34 files; 812 tests passed |
| `npm run test:setup:browser` | `drag-setup-browser-r12` | 0 | 2 files; 205 tests passed |
| `npm run test:app:browser -- --reporter=json --outputFile=F/report.json` | `drag-app-browser-r12` | 1 | 1 file failed, 7 passed; 2 tests failed, 244 passed |
| `npm run test:integration` | `drag-integration-r6` | 0 | 60 passed |
| `npm run test:guides` | `drag-guides-r12` | 0 | 20 passed |
| `npm run test:policy` | `drag-policy-r6` | 0 | 119 passed, 1 skipped |
| `npm run test:config` | `drag-config-r6` | 0 | 227 passed, 1 skipped |
| `npm run test:setup` | `drag-setup-r6` | 0 | 186 passed |
| `npm run test:conformance` | `drag-conformance-r6` | 0 | 130 passed |
| `npm run test:journey -- --reporter=json --outputFile=F/report.json` | `drag-journey-r12` | 0 | 4 files; 102 tests passed |
| Comparison command below | `drag-compare-r12` | 67 | Different: 196 differences |
| `bash -c 'npm run build:showcase && sha256sum showcase/browser.html'` | `drag-showcase-a-r12` | 0 | Hash below |
| Same command | `drag-showcase-b-r12` | 0 | Same hash |

```sh
node /home/user/veneer/tmp/units/journey-cost/compare.ts \
  --baseline /home/user/veneer/tmp/units/journey-cost/runs/landing-867f3b4-journey \
  --candidate /home/user/veneer/tmp/units/journey-cost/runs/drag-journey-r12 \
  --host-bound /home/user/veneer/tmp/units/journey-cost/host-bound.json \
  --registration 102/0 \
  --moves /home/user/veneer/tmp/units/journey-cost/redesign-moves.json \
  --out /home/user/.wave/veneer-drag/tmp/units/drag-compare-r12.md
```

Both final showcase hashes equal:

```text
1378bea975ced7c05d77c5f4a8cf1c2e662302c7de86f18584722643ffa1c1a9
```

The tracked page is restored byte-for-byte. The unchanged module/proof files carry the passing r8 browser readings. [Complete report](/home/user/.wave/veneer-drag/tmp/units/drag-report.md) and [gate ledger](/home/user/.wave/veneer-drag/tmp/units/drag-gates.json) retain every command, folder, exit, bare result, and all 75 launch records.

| Expected | Found/evidence | Done or not | One hypothesis |
|---|---|---|---|
| Detached waits survive | Four shell exits 143 before tests; plain nohup attempts lacked runner records | Fixed with fresh setsid launches; no queue fault | Shell process-group cleanup |
| Pointer lands after midpoint | Initial default offset/held-button readings failed | Fixed; both browser suites pass | Harness defaults differed from intended input |
| Escape reaches document | Both versions swallow injected Escape | Guide departure recorded; physical cancellation unproven | Renderer injection differs from OS cancellation |
| Fence renders state | Amended ruling refuses it | Removed; utility adapter proven | Existing utilities supply rendering |
| Native enters census/navigation | Placement after Tailwind missed boundary | Native precedes Tailwind | Tailwind is reader’s final boundary |
| Journey resolves items | Initial non-focusable item resolution failed | Uses grips; four final entries pass | Helper requires focus reach |
| Lint passes | Array shorthand and nested `paint` rejected | Fixed; final lint passes | Repository policy |
| Guide link resolves | App file outside guide inventory | Plain method/file reference; 20 passed | Inventory excludes `app/` |
| Formal compare instrumented | Earlier analysis ran directly | Final comparison queued | Formal gate requires instrumentation |
| Matrix retains styles contract | Fence caused four failures/missing contrast | Gone; assertions unchanged | Exact stylesheet census |
| Snapshots admit Native | Prior export/link pins failed | `NATIVE_GROUP` and 73 applied | Closed landing snapshots |
| Contents meets deadline | Final 15,123.8 ms timeout | Unresolved; deadline unchanged | Six-face work exhausts budget |
| Following header is unique | Two Bootstrap targets | Unresolved | Timed-out cleanup overlaps next mount |
| Prediction covers changes | Additional population counters | All 196 expected under amended ruling | New markup expands populations |

Direct gates pass: `git diff --check` emits nothing; root-browser diff stat contains only `index.ts`, one insertion. Every other root browser file remains byte-identical.

`git status --porcelain`:

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