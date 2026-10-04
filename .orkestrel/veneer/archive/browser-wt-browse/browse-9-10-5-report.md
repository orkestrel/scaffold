Windows portability and item 9 are committed. Item 10 is implemented as an uncommitted candidate, but its required DOM/CDP parity test exposes a conflict between the prescribed mapping and this Chromium version. Work stopped under the fifth brief's public-behavior stop condition. The final worktree is therefore not empty.

**Stop ruling**

- **Expected:** preserve CDP capture, render a state only when its property exists, make the DOM helper default an unannotated tab's selection to `false`, and prove equal DOM/CDP rows for a tablist containing tabs with and without `aria-selected`.
- **Found:** Edge `154.0.4258.53` omits `selected` on an unannotated tab inside a tablist. The mandated DOM default produces `selected=false`. The required comparison fails on exactly this row: CDP returns `tab "Default tab"`; DOM returns `tab "Default tab" selected=false`.
- **Evidence:** `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project service tests/service/document.test.ts -t "complete DOM rows"` exits 1: 1 failed, 7 deselected. The CDP state preconditions pass. `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project probe tmp/probes/toggle-states.test.ts` exits 0: 1 passed. Its controls show an unannotated tab outside a tablist and an explicitly false tab inside one both carry `selected: false`; unannotated button and div tabs inside tablists both omit it. Raw protocol data and decoded nodes are in `tmp/codex/toggle-states-reading.json`; journals are `item10-parity-conflict.*` and `toggle-probe-controls.*` under `tmp/codex/`.
- **Done / not done:** commit A and commit 1 have passed their required gates and are committed. Item 10's source, tests, guide, and roadmap candidate remain uncommitted. No commit 2 or completed item 10 gate chain exists. Repairing this mismatch requires changing the design's documented DOM default or its CDP property-presence rule; the fifth brief requires stopping at that boundary.
- **Hypothesis:** the design's earlier default-selection reading did not exercise the same containing tablist context.

The additional treeitem probe likewise found no `selected` property on an unannotated treeitem inside a tree, although the design prescribes a DOM default of false. No alternative mapping was substituted for either prescribed rule.

**Cumulative outcomes**

| Run | Outcome |
| --- | --- |
| 1 | Repaired F1–F12 and exercised F13. Core stopped at unchanged C5: 1,199 passed, 1 failed. Scaffold discovery also failed parsing optimizer output as JSON. |
| 2 | Repaired C5 without reducing its workload or increasing its budget. Core passed 1,200. Browser stopped at the product-brand assertion: 238 passed, 1 failed, 1 skipped. |
| 3 | Committed the browser-brand repair. Browser passed 239 with 1 skipped. Server stopped at 235 passed, 11 failed, 3 skipped. |
| 4 | Proved chmod mode 0 leaves the file readable on this host, contradicting that brief's premise. No tracked edit or commit. |
| 5 | Completed and committed Windows portability, then item 9/C5. Item 10's required real-placement comparison exposed the mapping conflict above. |

Earlier readings are carried from the four preceding reports. Run 5 used Windows, Node 24.21.0, npm 12.0.2, and Edge 154.0.4258.53. No Linux execution was available.

**Commit A: Windows portability**

The original focused baseline command was:

`node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:server tests/src/server/stores tests/src/server/Browser.test.ts`

It exited 1: 11 failed, 162 passed, 1 skipped. The first repaired server project passed 248 with 9 skipped; after the deterministic lock-publication control was added, the accepted server gate passed 249 with 9 skipped. Conditional skips below are unavailable scenarios, not passing refusal proofs.

| Case | Classification | Probe and control | Repair | Red-before → green-after |
| --- | --- | --- | --- | --- |
| Lock-directory release | Product defect | `rmdir` on an existing file returns `ENOENT`, with bytes remaining; empty-directory removal succeeds. | Accept `ENOENT` only when a following `lstat` also reports absence; otherwise preserve the ACCESS refusal and path. | Existing release test fails before and passes after. Run 3's isolated command also failed 1 test. |
| Failed rename cleanup | Product classification defect | File-over-directory rename returns `EPERM`; rename to an unused file path succeeds with intact bytes. | Inspect the destination after rename failure; a directory collision maps to FILE independently of the host's native code. | Existing cleanup test expected FILE but got ACCESS before; passes afterward, retaining cleanup and byte-preservation assertions. Linux's native error path was not executed here. |
| Readiness after stderr closes | Fixture defect | Live control, `closeSync(2)`, and `process.stderr.destroy()` leave the inherited pipe open; process exit produces stream end/close. | Re-executed fixture exits without the readiness line, closing inherited handles. Added a fixture closure proof. | Existing test reached the 10,000 ms deadline before; early-readiness-refusal test and new fixture proof pass afterward. |
| chmod permission refusal | Unavailable host capability | Readable control succeeds; chmod 0 reads back `0444`, and denied-target read still succeeds. | Probe read refusal in the child; skip the whole case with the chmod/read mechanism when unavailable. Keep EACCES assertions where denial can be built. | Original mode assertion failed; repaired case conditionally skips here. No denied-read proof claimed on this host. |
| Journey-store linked components | Partial host capability | File/directory symlinks return `EPERM`; junction succeeds, `lstat` identifies the link, target remains ordinary. | Separate component cases; directory cases use junction fallback, unavailable file cases cite privilege failure. | Original combined case failed; 3 directory cases pass, 2 file cases skip. |
| Run-store capture links | Partial host capability | Same symlink/junction probe and ordinary-target control. | Separate capture components and use the same link helper. | Original case failed; 3 directory cases pass, 1 file case skips. |
| Run-store clear links | Directory equivalent available | Junction discrimination succeeds while target is an ordinary directory. | Exercise refusal through a real junction and retain target-byte checks. | Original case failed creating a symlink; repaired case passes. |
| Run-store delete links | Directory equivalent available | Same junction and target control. | Exercise refusal through a real junction and preserve target bytes. | Original case failed creating a symlink; repaired case passes. |
| Run-store run-file link | File-link capability unavailable | File symlink returns `EPERM`; ordinary target file exists and is readable. | Conditional skip with the failed mechanism cited. | Original case failed; repaired case skips. |
| File-store temporary link | File-link capability unavailable | Same file-link probe and ordinary-file control. | Conditional skip; move unrelated path/argument assertions into an always-running case. | Original case failed; link scenario skips, separate assertions pass. |
| File-store root alias | Directory equivalent available | Junction is identified as a link; ordinary target is not. | Exercise canonicalization and root-replacement refusal through junctions. | Original case failed creating a symlink; repaired case passes. |
| Competing writers | Host scheduling assumption | Full gate observed both children refuse LOCKED. Deterministic competing-entry publication refuses; removing it admits an uncontended control. | Assert at most one save, exact valid refusals, resulting revision, uncontended advancement, and stale-revision refusal. Preserve production admission policy. | Earlier full server gate: 1 failed, 247 passed, 9 skipped; accepted gate: 249 passed, 9 skipped. New deterministic control passes. |
| Early native timer | Unavailable timing scenario | Fifty aligned 10 ms samples produced no early completion; 25 ms control and lower bounds pass. | Bound the probe, retain lower-bound assertions, and skip only when the host produces no early sample, citing the measurement. | Existing setup case failed; repaired capability case skips here. Accepted setup: 175 passed, 4 skipped. |
| WebMCP discovery and mirror | Browser-version assertion defect | Schema omits WebMCP although `WebMCP.enable` succeeds and registry start returns true; nonexistent method refuses with `-32601`. | Test command support directly; only method-not-found means absent. Preserve other protocol errors. | First service gate had both failures; targeted repaired cases: 2 passed, 27 deselected. Setup helper file: 33 passed. Accepted service: 103 passed. |

Filesystem probe: `node tmp/codex/portability-capabilities.ts`, exit 0, reused from run 4. Pipe probe: `node tmp/codex/stderr-capabilities.ts`. WebMCP probe: `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project probe tmp/probes/registry-capability.test.ts`, 1 passed; reading in `tmp/codex/registry-capability.json`.

The targeted WebMCP command was `npx vitest run --config vite.config.ts --project service tests/service/browser.test.ts -t "direct WebMCP|mirrors a page-registered"`. The isolated release command was `npx vitest run --config vite.config.ts --project src:server tests/src/server/stores/FileBrowserStore.test.ts -t "names the directory with ACCESS"`.

**Preserved browser-brand repair**

Commit `ce66ba336cb072a2f5c3adfd605aed4e32dd0737` compares the CDP product with independent HTTP `/json/version` discovery and checks the response's product/version/revision/JavaScript/user-agent shape. Production transport behavior is unchanged.

The original `/Chrom/` assertion failed on `Edg/154.0.4258.53`: 1 failed, 7 deselected. Replacing the decoded response with `{}` also failed 1 targeted test. Restoring production code passed the full transport file: 8 passed. Setup-global proof: 9 passed; TypeScript and diff checks exited 0. Commands and mutation are preserved in `tmp/codex/socket-mutation.ts` and the run 3 report.

**Item 9 findings, committed with C5**

| Finding | Repair and evidence |
| --- | --- |
| F1 | Corrected `boundBrowserText` remarks: view-bearing action/dialog receipts use the view footer; other results, including look/read, use the cut footer. |
| F2 | Added headers exceeding half and all of the available room, plus a header that fits without a row. Three mutations each fail 1 test; restored code passes 1 each. |
| F3 | Added popup look paging that charges the move note against the body limit and preserves outline-only offsets. Mutation fails 1; restoration passes 1. Mutated body measured 544 characters against a 500-character limit. |
| F4 | Pinned the exact Enter receipt with status before focus and the semicolon separator. Clause-order and separator mutations each fail 1; restoration passes 1 each. |
| F5 | Added referenced StaticText/generic exclusions, distinct-word ties, and Unicode matches for `Zurück` and `日本語`. Four mutations each fail 1; restoration passes 1 each. |
| F6 | Corrected the guide's tool-copy bound to 6,050 characters. |
| F7 | Added look to limit error sources and documented the next-character refusal for look/read. |
| F8 | Corrected the validation example to `call look with what and offset.` |
| F9 | Aligned helper, constant, and guide cut-footer descriptions. |
| F10 | Named dialog explicitly beside action receipts in view-footer documentation. |
| F11 | Documented the line-break-past-start condition, window-end fallback, surrogate preservation, and final endpoint. |
| F12 | Removed the possessive code token and corrected receipt-legend wording. |
| F13 | Preserved a real iframe focus regression; the specified stale-focus sequence did not reproduce. No production focus change. |

Documentation repairs have no artificial red mutation count. The accepted guide gate passes 248 tests.

Each F2–F5 mutation and restoration used:

`node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/FILE.test.ts -t "FILTER"`

| Finding / mutation | FILE | FILTER | Red → restored green |
| --- | --- | --- | --- |
| F2: bypass header fit | BrowserToolset | omits an oversized | 1 failed → 1 passed |
| F2: compare with whole room | BrowserToolset | omits an oversized | 1 failed → 1 passed |
| F2: remove blank-line cost | BrowserToolset | omits an oversized | 1 failed → 1 passed |
| F3: omit note-length subtraction | BrowserToolset | shares the look | 1 failed → 1 passed |
| F4: reverse clauses | BrowserToolset | places the focus | 1 failed → 1 passed |
| F4: use comma separator | BrowserToolset | places the focus | 1 failed → 1 passed |
| F5: remove text exclusion | helpers | never matches an ignored | 1 failed → 1 passed |
| F5: remove omitted-role exclusion | helpers | never matches an ignored | 1 failed → 1 passed |
| F5: count repeated words | helpers | counts distinct | 1 failed → 1 passed |
| F5: replace Unicode matching with ASCII | helpers | counts distinct | 1 failed → 1 passed |

Red commands exit 1; green commands exit 0. Run 1's `node tmp/codex/item9-mutations.ts` and its `--green` invocation both exit 0. All mutations were restored; `F*-red.log` and `F*-green.log` retain their output.

C5 now waits for request-send events and a protocol completion barrier instead of per-iteration delays. It retains 1,000 ID reuses and the 5,000 ms budget. The mutation changes retention membership from `#awaiting` to `#pending`, allowing a stale foreign response to settle a fresh invocation.

`node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/BrowserRegistry.test.ts -t "C5 drops foreign responses"` failed 1 test under that mutation and passed 1 after restoration, with 18 deselected and a 75 ms passing test duration. The complete file passed 19. The runner `node tmp/codex/c5-mutation.ts` exited 0. Accepted core gates pass 1,200.

F13's real-browser sequence reports `e2 textbox "Child"` after focusing the iframe input. Focusing the parent button makes the child document's active element its body and reports `e1 button "Parent"`; blurring the parent yields undefined focus. The assumed retained-input control failed 1 test; correcting that observation while keeping the focus assertions passed 1. Command: `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/elements/BrowserDOMElementManager.test.ts -t "discards stale focus"`. This is a host/version reading, not a claim about every Chromium release.

**Item 10 candidate and evidence**

| Ruling | Candidate implementation | Red-before and green evidence |
| --- | --- | --- |
| Row format/order/shared renderer | Append string/boolean `pressed`, `expanded`, and `selected`, including false, after value and before bracket flags in `renderBrowserOutlineRow`. Cover outline, matches, and focus. | Initial targeted core test fails 1. Implemented full helper file passes 136. Removing each state separately later fails 1 targeted test. |
| CDP capture unchanged | Keep `readBrowserAccessibility`; render the properties it already preserves. Add live look and form-row assertions. | Before implementation, targeted service run fails 2 tests plus the document block's CDP precondition. The final parity run establishes the CDP states successfully; no complete green service run exists for item 10. |
| DOM token mapping | Export `readBrowserToken`: lowercase, no trimming, empty/missing/undefined absent. | Removing lowercasing fails 2 tests; trimming fails 1. Initial implemented browser helper/manager files pass 198 tests combined. |
| DOM state mapping | Export `readBrowserStates`; preserve native single-select collapse, option selectedness and ARIA overrides; omit summary's unsupported role. | Original manager file: 3 failed, 38 passed. Implemented manager file passes within the 198-test focused run. State-removal mutations fail 6 pressed, 16 expanded, and 10 selected tests. |
| Role restrictions | Export frozen readonly expanded/selected role sets and apply them; pressed is button-only. | Real-DOM cases cover supported roles, link/radio/textbox exclusions, native select/options, tab defaults, and summary control. Five additional role cases were added after the initial green run and are not claimed as executed. |
| Same-page DOM/CDP parity | Compare sorted complete rows through `collectOutlineEntries`, retaining suffixes and deduplicating repeated references. | Required comparison fails 1 test after its CDP preconditions pass, exposing the stop conflict. No green-after exists. |
| Guide/roadmap | Add public-surface rows and ordered row format; candidate removes item 10 and updates shifted citations in items 11/12. | Uncommitted; item 10 guide gate not run. The candidate roadmap edit is not an accepted closure. |

The probe confirms pressed `true`/`false`/`mixed`, uppercase normalization, empty/undefined omission, arbitrary-token truth, and no trimming; unsupported pressed/expanded/selected roles omit those states. Native single select remains collapsed despite `aria-expanded="true"`; native option ARIA overrides are preserved. Summary appears as a CDP DisclosureTriangle, while the DOM role gap remains outside scope. Constants retain the design's cited Chromium 141.0.7390.37 provenance; this run's measurements are from Edge 154.

Focused commands were:

- Core: `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/helpers.test.ts`, 136 passed after implementation; initial red added `-t "renders toggle states"`.
- DOM: `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:browser tests/src/browser/helpers.test.ts tests/src/browser/elements/BrowserDOMElementManager.test.ts`, 198 passed after implementation. Original manager-only command failed 3, passed 38.
- Service red: `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project service tests/service/toolset.test.ts tests/service/document.test.ts -t "pressed and expanded|runs one task end to end|complete DOM rows"`, exit 1: 2 failed, 40 deselected/skipped, and 1 failed precondition block.
- Feature mutations: `node tmp/codex/item10-mutations.ts`, exit 0. Core removals each yielded 1 failed/135 deselected. Browser filter `readBrowserToken and readBrowserStates` yielded: lowercase 2 failed/36 passed; trim 1/37; pressed 6/32; expanded 16/22; selected 10/28, each with 119 deselected.

All feature mutations were restored. The cited 136/198 green runs preceded those mutations; a final focused green rerun was not completed before the stop. A separate DOM-removal/build experiment encountered the tab precondition conflict before reaching its intended comparison, so it is not counted as a successful mutation proof. Its `finally` restored source and rebuilt the browser bundle, exit 0. The subsequent unmutated comparison is the failing proof cited in the stop ruling.

**Gate tables**

`P`, `F`, and `S` below mean passed, failed, and skipped. Earlier chains stopped at the first failure.

| Command | Run 1 candidate | Run 2 candidate | Run 3 candidate | Run 4 |
| --- | --- | --- | --- | --- |
| `npm run format:check` | 0 | 0 | 0 | Not run |
| `npm run lint:check` | 0 | 0 | 0 | Not run |
| `npm run check` | 0 | 0 | 0 | Not run |
| `npm run test:src:core` | 1; 1199 P, 1 F | 0; 1200 P | 0; 1200 P | Not run |
| `npm run test:src:browser` | Not run | 1; 238 P, 1 F, 1 S | 0; 239 P, 1 S | Not run |
| `npm run test:src:server` | Not run | Not run | 1; 235 P, 11 F, 3 S | Not run |
| `npm run test:src:bin` | Not run | Not run | Not run | Not run |
| `npm run test:guides` | Not run | Not run | Not run | Not run |
| `npm run test:policy` | Not run | Not run | Not run | Not run |
| `npm run test:setup` | Not run | Not run | Not run | Not run |
| `npm run test:setup:browser` | Not run | Not run | Not run | Not run |
| `npm run build` | Not run | Not run | Not run | Not run |
| `npm run test:service` | Not run | Not run | Not run | Not run |
| `git diff --check` | 0 | 0 | 0 after stop | Not run |

| Command | Run 5 commit A | Run 5 commit 1 | Item 10 candidate |
| --- | --- | --- | --- |
| `npm run format:check` | 0 | 0 | Not run |
| `npm run lint:check` | 0 | 0 | 1 during development; standalone hook assertion repaired, not rerun |
| `npm run check` | 0 | 0 | 0 before last test edit; no final gate reading |
| `npm run test:src:core` | 0; 1200 P | 0; 1200 P | Full project not run |
| `npm run test:src:browser` | 0; 239 P, 1 S | 0; 239 P, 1 S | Full project not run |
| `npm run test:src:server` | 0; 249 P, 9 S | 0; 249 P, 9 S | Not run |
| `npm run test:src:bin` | 0; 4 P, 1 S | 0; 4 P, 1 S | Not run |
| `npm run test:guides` | 0; 248 P | 0; 248 P | Not run |
| `npm run test:policy` | 0; 119 P, 1 S | 0; 119 P, 1 S | Not run |
| `npm run test:setup` | 0; 175 P, 4 S | 0; 175 P, 4 S | Not run |
| `npm run test:setup:browser` | 0; 21 P | 0; 21 P | Not run |
| `npm run build` | 0 | 0 | 0 before last test edit; restored browser-only build also 0 |
| `npm run test:service` | 0; 103 P | 0; 103 P on recheck | Full project not run; required targeted parity test fails |
| `git diff --check` | 0 | 0 | 0 at stop |

Commit A's accepted complete chain is `tmp/codex/portability-5-final3-gates.*`, with exit records in `portability-5-gates.json`. Commit 1's chain is `item9-5-gates.*`, followed by `item9-5-service-recheck.*`; every accepted command ran after its last edit. The service-only recheck overwrote `item9-5-gates.json`, so the first journal supplies the earlier gate exits.

Commit 1's first service attempt had 102 passed and 1 `Runtime.callFunctionOn` timeout in the unchanged secret recording/replay test. Its isolated command, `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project service tests/service/journey.test.ts -t "records a secret through the type tool"`, passed 1 with 31 deselected in 1.23 seconds of test time. The full service recheck passed 103. An earlier portability service attempt also hit that test. No source cause was established, and no timeout or assertion was weakened.

**Commits and deviations**

| Commit | Hash |
| --- | --- |
| Browser-brand repair, run 3 | `ce66ba336cb072a2f5c3adfd605aed4e32dd0737` |
| A: Windows portability | `327a67ebd89a84cf0c2171d30af3e09f5f6ca8ca` |
| 1: item 9 findings and C5 | `0a80b99b6019d86cbb05fb61645bd0e278264365` |
| 2: item 10 | Not created |

The fifth run followed the sole-writer instruction: no agents, push, publication, or installation outside the worktree. No scaffold-owned file was edited. Discovery was not rerun; its run 1 parsing failure and the later manual Vitest census remain recorded.

Additional prerequisite builds were needed: the first bin attempt failed 4 tests because `dist/bin/main.js` was absent; a build restored the prerequisite, and accepted ordered chains subsequently passed. Item 10 also rebuilt the served DOM bundle for its real-placement proofs. One direct `npm` launcher attempt failed with `spawn npm ENOENT`; invoking npm's JavaScript entry through Node succeeded. The initial toggle probe called nonexistent `browser.version()`; changing the instrument to raw `Browser.getVersion` produced the recorded readings. Neither failed instrument is counted as product evidence.

Builds emitted the existing API Extractor bundled-TypeScript warning and the Vite output-format warning. One accepted portability browser-setup run emitted a teardown-timeout warning while exiting 0. A premature portability gate run was canceled by its recorded process tree; it is not acceptance evidence.

No public type changed in the committed repairs. File-symlink and chmod refusal scenarios remain unproved on this host where capability probes skip them. Linux behavior was not executed. Item 10 has the explicit stop conflict above and is not accepted.

HEAD is `0a80b99b6019d86cbb05fb61645bd0e278264365` on `ccr-d15a48b1-yyyll6`. Final `git status --porcelain` lists the uncommitted item 10 candidate:

```text
 M ROADMAP.md
 M guides/browser.md
 M src/browser/constants.ts
 M src/browser/elements/BrowserDOMElementManager.ts
 M src/browser/helpers.ts
 M src/core/helpers.ts
 M tests/service/document.test.ts
 M tests/service/toolset.test.ts
 M tests/setupBrowser.ts
 M tests/setupService.test.ts
 M tests/setupService.ts
 M tests/src/browser/elements/BrowserDOMElementManager.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/core/helpers.test.ts
```
