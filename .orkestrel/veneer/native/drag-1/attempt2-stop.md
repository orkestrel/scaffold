Drag 1 is implemented in 20 owned files, with no commit. Both Chromium source suites pass. Verification is not fully green: the app gate has three failures, and the journey has four Matrix failures.

[Full diff](/home/user/.wave/veneer-drag/tmp/units/drag.patch) · [Complete review report](/home/user/.wave/veneer-drag/tmp/units/drag-report.md) · [All 55 command attempts](/home/user/.wave/veneer-drag/tmp/units/drag-gates.json)

The plugin boots `[data-vn-drag]` and routes captured `pointerdown`, `dragstart`, `dragenter`, `dragover`, `dragleave`, `drop`, `dragend`, and `keydown` through `[data-vn-drag] > *`. Drop, dragend, and Escape clear outstanding sessions through scoped context. `createBootstrapPlugins()` retains its names and order; every other root-browser file stays unchanged.

These proof readings pass under Chrome **141.0.7390.37** and **153.0.8010.12**:

| Proof | Reading in both versions |
|---|---|
| Real pointer drag | `Second, First, Third`; events start → move → end; move `{from:0,to:1,by:'pointer'}`, end `moved:true`. |
| Keyboard | Same item moves with Alt+ArrowDown; `{from:0,to:1,by:'keyboard'}`; focus stays. |
| Prevented move | Pointer and keyboard leave order unchanged; ends read `moved:false`. |
| Outside handle | Real grab starts no drag, including with a draggable parent item. |
| Input refusal | Input-descendant grabs and prevented starts are refused; authored draggable attributes survive. |
| Nested crossing | Real child-to-child crossing retains the insertion indicator. |
| Outside drop | Order unchanged; one `moved:false` end; no text payload or textarea insertion. |
| Foreign/cross-host drop | External text/files are unaccepted; matching group values exchange nothing. |
| Live region | `Moved to position 2 of 3`; input case reads `Moved to position 2 of 2`. |
| `moveBefore` | Method exists; input retains `Retained edit` and focus after movement. |
| Axis/endpoints | Row-axis keys work; unrelated arrows do nothing; no wrapping. |
| Composition | No dragstart listener or output without the plugin; teardown releases owned resources. |
| Escape | Ordinary Escape reaches document. During native dragging, injected Escape yields **0 document keydowns and 0 ends**. Protocol cancellation then yields one native dragend, `moved:false`, unchanged order, and cleared indicator. Physical Escape cancellation is not established. |
| Separation | Root-file purity and Bootstrap plugin-order pins pass. |

The new sortable journey passes all **four variant entries**, each under all three faces. Full registration is **102/0**; overall journey result is **98 passed, 4 failed**. Matrix rejects the required fragment’s style fence before collecting contrast readings.

The instrumented comparison exits **67**, with **211 differences**: **147 expected, 36 findings, 28 mixed**. [Every difference is classified](/home/user/.wave/veneer-drag/tmp/units/drag-differences-r9.json). Findings beyond the prediction include preservation signature/exclusion counters, partition population `8001 → 8010`, missing contrast readings, and four non-host-bound Matrix failures. After excluding the three changed row families, all remaining rows retain identical order in every variant; **no statechart row moves**. [Order evidence](/home/user/.wave/veneer-drag/tmp/units/drag-row-order.json)

All folders below are under `/home/user/veneer/tmp/units/journey-cost/runs/`; queued commands used the requested worktree and npm11 PATH.

| Command | Folder | Exit | Bare result |
|---|---|---:|---|
| `npm run build` | `drag-build-r10` | 0 | Completed |
| `npm run format:check` | `drag-format-r10` | 0 | Passed |
| `npm run lint:check` | `drag-lint-r10` | 0 | Passed |
| `npm run check` | `drag-check-r10` | 0 | Passed |
| `npm run test:src:browser` | `drag-src-141-r8` | 0 | 812 passed |
| `PLAYWRIGHT_EXECUTABLE_PATH=/home/user/.wave/pw-153/chromium-1243/chrome-linux64/chrome npm run test:src:browser` | `drag-src-153-r8` | 0 | 812 passed |
| `npm run test:setup:browser` | `drag-setup-browser-r6` | 0 | 205 passed |
| `npm run test:app:browser` | `drag-app-browser-r10` | 1 | 243 passed, 3 failed |
| `npm run test:integration` | `drag-integration-r6` | 0 | 60 passed |
| `npm run test:guides` | `drag-guides-r10` | 0 | 20 passed |
| `npm run test:policy` | `drag-policy-r6` | 0 | 119 passed, 1 skipped |
| `npm run test:config` | `drag-config-r6` | 0 | 227 passed, 1 skipped |
| `npm run test:setup` | `drag-setup-r6` | 0 | 186 passed |
| `npm run test:conformance` | `drag-conformance-r6` | 0 | 130 passed |
| `npm run test:journey -- --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/drag-journey-r9/report.json` | `drag-journey-r9` | 1 | 98 passed, 4 failed |
| Comparison command below | `drag-compare-r10` | 67 | Different: 211 differences |
| `bash -c 'npm run build:showcase && sha256sum showcase/browser.html'` | `drag-showcase-a-r10` | 0 | Built; hash below |
| Same showcase command | `drag-showcase-b-r10` | 0 | Built; identical hash |

```sh
node /home/user/veneer/tmp/units/journey-cost/compare.ts --baseline /home/user/veneer/tmp/units/journey-cost/runs/landing-867f3b4-journey --candidate /home/user/veneer/tmp/units/journey-cost/runs/drag-journey-r9 --host-bound /home/user/veneer/tmp/units/journey-cost/host-bound.json --registration 102/0 --moves /home/user/veneer/tmp/units/journey-cost/redesign-moves.json --out /home/user/.wave/veneer-drag/tmp/units/drag-compare-r10.md
```

Both showcase hashes are `14bfb517790f64208ec806ae0ded0e3801ee385684cff3d87d3a02a81acd3e04`. The tracked generated HTML was restored.

| Expected | Found/evidence | Status | One hypothesis |
|---|---|---|---|
| Queue waits survive shell | Four exit-143 waits died before tests; plain nohup launches lacked runner evidence | Fresh detached setsid runs completed; none canceled | Shell process-group cleanup |
| Correct real-drag input | Initial destination chose before; CDP motion omitted held left button | Corrected; both source suites pass | Harness defaults differ from required input |
| Native Escape ends session | Injected Escape is swallowed in both versions | Departure documented; physical Escape unproven | Protocol keys differ from OS cancellation |
| Grab cursor under every face | Later button styling overrode normal reset cursor | Scoped important declaration; journey passes | Layer priority |
| Native census/navigation inclusion | Placement after Tailwind missed existing boundaries | Native precedes Tailwind | Readers use Tailwind as final boundary |
| Reachable journey target | Initial reader required focusable targets | Grip buttons now drive the case | Helper requires focus reach |
| Lint compliance | Array shorthand rejected | Fixed; lint passes | Repository requires `Array<T>` |
| Instrumented comparison | Initial analysis lacked queue records | Queued result completed and is byte-identical | Formal gate needs instrumentation |
| Existing header click succeeds | Final app gate hits a **65 ms Contents timeout** | Unfixed; no retry | Short deadline may be host-sensitive |
| App pins include Native | Export pin omits `NATIVE_GROUP`; contents pin expects 72 instead of 73 | Exact patch prepared, unapplied | Closed snapshots of landing |
| Matrix admits required fence | Two existing style assertions omit it | Exact patch prepared, unapplied | Earlier census assumed only sticky style |
| Prediction covers all changes | Additional counters and missing contrast appear | Every difference classified | New markup expands reader populations; Matrix aborts early |

Direct checks all exit **0**. Root-browser stat is only `src/browser/index.ts | 1 +`. Final `git status --porcelain`:

```text
 M ROADMAP.md
 M app/browser/constants.ts
 M app/browser/main.ts
 M guides/veneer.md
 M src/browser/index.ts
 M tests/app/browser/constants.test.ts
 M tests/app/browser/integration.test.ts
 M tests/app/browser/sections/integration.test.ts
 M tests/src/browser/index.test.ts
?? app/browser/sections/sortable-list.html
?? src/browser/drags/
?? tests/src/browser/drags/
```

The [four exact pin changes](/home/user/.wave/veneer-drag/tmp/units/drag-pin-extension.patch) remain unapplied pending ownership extension. The brief excludes those existing assertions and snapshot files; the separate 65 ms header timeout also remains unresolved.