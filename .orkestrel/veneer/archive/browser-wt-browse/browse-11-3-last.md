Implemented item 11 in commit `9ef60f9e5d93b5804cd7e4c58fa21899febb9df1` on `ccr-d15a48b1-yyyll6`.

Both `readBrowserCapture` and `compileReadFunction` now import into an inert document, prune against live layout, and lower supported controls before projection. Direct element reads serialize the replacement root. Password and hidden inputs are removed before serialization, including detached and windowless documents across realms. Links carry their live resolved addresses. Region elements and the existing default distillation remain intact. The HTML/Markdown dependencies and public property shapes are unchanged. Guide parity is updated; ROADMAP item 11 is closed under the ruling that declared limits do not block acceptance, and item 8's shifted citation is corrected.

**Rule evidence.** Expectations are fixed, independently authored strings derived from the archived person-sees fixtures, not computed from capture output. The shared cases assert ordered text in Markdown and plain text with both distillation settings, plus forbidden defaults/payloads in capture HTML. Real-browser tests execute both the DOM helper and the compiled CDP function. Public service tests repeat the 15 shared cases through CDP and the built DOM bundle.

Every mutation below produced **2 failed, 0 passed, exit 1**; restoring the rule produced **2 passed, 0 failed, exit 0**: one test per placement. `L(name)` means the exact selector `lowers 'name'`. Other selectors are literal substrings. The command for each row and phase was:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:browser tests/src/browser/helpers.test.ts -t "<selector>" --reporter=json --outputFile=tmp/codex/browse-11-<red|green>-<id>.json
```

| ID | Rule challenged / failure-producing change | Selector |
| --- | --- | --- |
| form | Leave the form floor tag instead of its neutral carrier | L(form) |
| dialog | Leave the dialog floor tag | L(dialog) |
| button | Leave button floor tags, including disabled buttons | L(buttons) |
| selection | Use the first/default option instead of live selection and label | L(selection) |
| listbox | Keep selected options only, losing displayed unselected rows | L(listbox) |
| groups | Omit optgroup captions | L(groups) |
| scroll | Ignore the listbox client viewport | `scrolls listbox` |
| values | Read default input values instead of live values | L(values) |
| textarea | Read default textarea children instead of live multiline value | L(values) |
| privacy | Disable early password/hidden redaction | `redacts private controls` |
| nontext | Substitute generic input values for type-specific text rules | L(nontext) |
| file | Emit the file input's fake path instead of its sole filename | L(nontext) |
| svg | Disable SVG text/alternative lowering | L(graphics) |
| image | Use submission value instead of the image alternative | L(graphics) |
| icon-once | Ignore the icon-only parent's name, retaining the duplicate child name | L(graphics) |
| printed-button | Give ARIA precedence over printed button text | L(buttons) |
| separators | Remove surviving carrier breaks | L(separators) |
| painted | Retain obsolete ARIA hiding after live layout decisions | L(painted) |
| regions | Neutralize nav/header/footer/aside/menu, violating N3 | `keeps regions and resolves` |
| href | Keep the raw relative address instead of resolved href, violating N2 | `keeps regions and resolves` |
| root | Serialize the detached original instead of its replacement | `reads replacement roots` |
| display | Bypass display-none pruning | `prunes hidden branches` |
| visibility | Bypass visibility pruning and its descendant override behavior | `prunes hidden branches` |
| shadow | Bypass open-shadow assignment pruning | `prunes hidden branches` |
| details | Retain closed-details contents beyond the first summary | `prunes hidden branches` |
| content-visibility | Retain content-visibility-hidden contents | `prunes hidden branches` |
| fallback | Retain canvas/video/audio fallback children | `prunes hidden branches` |
| ancestor | Ignore hidden ancestors, including shadow hosts | `empties roots under hidden` |
| inert | Replace inert import with live-document cloneNode | `copies without constructors` |
| placeholder | Ignore an opacity-zero placeholder | L(placeholder) |
| captions | Remove explicit submit/reset/button captions | L(captions) |
| active-floor | Disable the active-element drop list | `drops active floor subtrees` |
| math-limit | Retain MathML instead of the declared omission | L(limits) |

The active floor covers script, style, template, frame, frameset, iframe, object, embed, applet, noscript, meta, link, and base, including disconnected roots. The region test also verifies that default distillation still drops regions/outside-main prose while `distill: false` retains it.

Two boundary mutations used the same Vitest command prefix, with these arguments and results:

| ID | Mutation and selected proof | Red | Restored green |
| --- | --- | --- | --- |
| final-size | Measure original HTML instead of the final lowered, JSON-escaped capture; browser helpers selector `measures lowered and JSON escaped\|measures pruned markup against` | 4 failed; exit 1 | 4 passed; exit 0 |
| public-root | Restore the outerHTML overwrite in both public element reads; projects `src:browser` and `service`, files `tests/src/browser/BrowserDOMView.test.ts` and `tests/service/document.test.ts`, selector `reads live fields and a direct\|captures direct roots` | 2 failed; exit 1 | 2 passed; exit 0 |

Additional independently authored edge fixtures exposed and pinned repairs in both placements:

| Evidence ID | Defect challenged | Before repair | After repair |
| --- | --- | --- | --- |
| edge | Hidden SVG descendants leaked; a hidden first option erased its group caption; multiple files emitted unprinted names | 6 failed; exit 1 | 6 passed; exit 0 |
| svg-override | Hidden SVG wrapper erased a visible text descendant | 2 failed; exit 1 | 2 passed; exit 0 |
| realm | Cross-realm windowless documents bypassed private-control traversal | 2 failed; exit 1 | 2 passed; exit 0 |

These ran `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/helpers.test.ts -t "<selector>" --reporter=json --outputFile=tmp/codex/browse-11-<id>-<red|green>.json`. Selectors respectively were `prunes hidden SVG|keeps a group caption|omits unavailable native`, `retains visible SVG`, and `redacts private controls`.

The public service proof also covers child frames, hidden ancestors, direct roots, and read-tool parity when a hidden panel becomes shown. The inert-copy proof observes no capture-induced requests, constructor calls, or live writes in the DOM/main world and CDP isolated world; live clone controls produce requests and constructor activity. Fixture requests settle through network completion events before measurement. Modal background and visible SVG text remain independently of accessibility-tree exclusion. Final focused browser helper/public DOM validation passed 252 tests.

Exact mutation edits, argument lists, counts, and per-phase assertion reports are retained under `tmp/codex/`: [browse-11-mutations.json](/C:/Users/mikes/WebstormProjects/browser-wt-browse/tmp/codex/browse-11-mutations.json), [browse-11-extra-mutations.json](/C:/Users/mikes/WebstormProjects/browser-wt-browse/tmp/codex/browse-11-extra-mutations.json), and [browse-11-boundaries.json](/C:/Users/mikes/WebstormProjects/browser-wt-browse/tmp/codex/browse-11-boundaries.json). Red results were assertion failures, not collection or syntax failures.

**B0/B1.** The archived five-read B0 and the final behavioral implementation's five-read B1 used the veneer showcase page and system Edge. Times are milliseconds.

| Reading | Five samples | Median | Min–max | Spread |
| --- | --- | ---: | --- | ---: |
| B0 | 386.6187, 316.6214, 330.8159, 311.8977, 322.6014 | 322.6014 | 311.8977–386.6187 | 74.7210 |
| B1 | 455.7817, 413.5002, 337.5531, 483.6608, 372.4729 | 413.5002 | 337.5531–483.6608 | 146.1077 |

B1's median is **90.8988 ms / 28.18% higher** than B0. This is a five-sample historical comparison, not evidence of a speed improvement or a controlled performance guarantee. An earlier B1 before the final realm repair measured 290.7569, 270.3186, 243.0088, 251.1830, and 285.6148 ms, median 270.3186 ms; it is not substituted for the final reading.

Final B1 command: `node node_modules/vitest/vitest.mjs bench --config vite.config.ts --no-cache --project probe tmp/probes/browse-11-bench.test.ts --run`; exit 0, launcher duration 5,981 ms. Evidence: `read-rendered-B0.json`, `read-rendered-B1.json`, and `browse-11-B1-final.log/.err`. The benchmark source is archived as `tmp/codex/browse-11-bench-final.test.ts`; its collected throwaway copy was removed. Subsequent source cleanup only removed trailing whitespace from the generated function.

**Declared limits and their tests.** `BrowserReadingInput` remarks and the guide state these bounds; they do not promise exact equivalence to `innerText` or everything painted on every page.

| Limit / intentional omission | Test pin |
| --- | --- |
| Native default submit/reset captions, file choose/empty captions, localized date and datetime text, MathML | Shared `limits` case in browser helpers and public CDP/DOM service tests; expects only `Supported prose`. Math omission also has the mutation above. |
| Invalid/intermediate number editing | Service test `omits a number during an invalid edit without substituting its placeholder`: actual keyboard entry `1e`, badInput precondition, empty output in both placements. Valid committed 37 is covered by `values`. |
| Native multiple-file summary | `omits unavailable native multiple-file summaries`, both placements; two filenames are not substituted for the native summary. |
| Checkbox/radio/range/color state graphics and submission values | `nontext` case; painted external label survives once, submission payloads do not. |
| Shadow-owned text; offscreen/transparent content | Rendered fixture pins open-slot behavior, omission of shadow-owned text, and retention of opacity-zero prose; the auto/offscreen test retains content-visibility-auto content. |
| General clipping outside listboxes, localized number formatting, generated content, text transformations, textarea clipping, and significant spaces | Declared fidelity exclusions, not claims of exact rendering. Listbox intersection/scrolling and textarea value/order have dedicated positive tests. |

Detached and windowless roots use a data-only fallback, not a rendered-text claim. Their private controls are still removed from capture HTML and both projections. Explicit graphic alternatives are declared alternatives; they are not represented as printed text.

**Gates.** Every command in the final prescribed sequence exited 0. The sequence took 280,198 ms; 2,507 tests passed with 15 existing skips.

| Command | Result | Exit |
| --- | --- | ---: |
| `npm run format:check` | 232 files checked | 0 |
| `npm run lint:check` | Passed | 0 |
| `npm run check` | Passed | 0 |
| `npm run test:src:core` | 1,202 passed | 0 |
| `npm run test:src:browser` | 357 passed, 1 skipped | 0 |
| `npm run test:src:server` | 253 passed, 9 skipped | 0 |
| `npm run test:src:bin` | 4 passed, 1 skipped | 0 |
| `npm run test:guides` | 248 passed | 0 |
| `npm run test:policy` | 119 passed, 1 skipped | 0 |
| `npm run test:setup` | 175 passed, 3 skipped | 0 |
| `npm run test:setup:browser` | 22 passed | 0 |
| `npm run build` | Core/server/browser/bin built | 0 |
| `npm run test:service` | 127 passed | 0 |
| `git diff --check` | No output | 0 |
| `git status --porcelain` after commit | Empty | 0 |

Gate commands, exits, durations, and unfiltered output are in `browse-11-gates-final.json`, `browse-11-gates-final.log`, and `browse-11-final-gate-*.log`. Existing skips were retained; no new skip was added.

**Deviations and observations.** No ruling required dependency or public-shape changes. The shared browser execution helper and its own setup test were added beyond the design's file map to execute the real compiled function in both-placement proofs. Some cited-path rechecks occurred after the initial saved patch was applied; final symbols and shifted citations were checked. No agents were spawned, and nothing was pushed, published, or installed outside the worktree.

The first service run had 126 passes and one CDP Runtime.callFunctionOn timeout in the existing in-process-to-out-of-process frame submission test. The retry had 126 passes and a timeout in the existing journey records/saves/lists/edits test; the original failure passed. Both cases then passed in isolation together: 2 passed, 64 excluded by selection, exit 0, duration 5,874 ms (`browse-11-timing-check.log/.err`). Their assertions and timeouts were unchanged. The final full service run passed all 127 tests in 81.51 seconds.

The installed discovery script reported browser project aliases as ungated/empty despite successful explicit collection in their prescribed gates; its exit 1 was an auxiliary census mismatch, not replaced test evidence. A browser setup run emitted Vitest's close-timeout warning while exiting 0. Build warnings about the API Extractor/compiler TypeScript version and ignored output formats did not fail the build. A direct launcher attempt with `npm` failed to resolve the Windows executable; subsequent launches used Node with npm-cli.js. The first diff check found generated-string trailing whitespace; it was removed before the final gate sequence. Sweep ran in report-only mode; requested evidence/report artifacts and pre-existing probes were retained.