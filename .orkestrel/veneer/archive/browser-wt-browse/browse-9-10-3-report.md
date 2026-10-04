# Browse 9–10 report

Stopped under the deviation contract. Item 9's F1–F12 repairs, F13's regression test, and the C5 repair remain uncommitted. Item 10 is not started. The browser-brand repair is committed separately as `ce66ba336cb072a2f5c3adfd605aed4e32dd0737` on `ccr-d15a48b1-yyyll6`.

## Deviation

- **Expected:** each host-only repair preserves and proves the behavior its unchanged test names; then all prescribed gates pass before commit 1, item 10, commit 2, and an empty final status.
- **Found:** the third run passes the core and browser gates, then `npm run test:src:server` exits 1 with 235 passed, 11 failed, and 3 skipped. The unchanged `FileBrowserStore > names the directory with ACCESS when release cannot rmdir it` also fails alone: `lock()` resolves instead of rejecting. The host-repair condition that the named behavior holds here is not established. Accepting that result would change the asserted behavior; repairing the production path is outside the test-only authorization.
- **Evidence:** `git diff 655906b -- tests/src/server/Browser.test.ts tests/src/server/stores/FileBrowserJourneyStore.test.ts tests/src/server/stores/FileBrowserRunStore.test.ts tests/src/server/stores/FileBrowserStore.test.ts tests/src/server/stores/suite.ts` is empty. The isolated command `npx vitest run --config vite.config.ts --project src:server tests/src/server/stores/FileBrowserStore.test.ts -t 'names the directory with ACCESS'` exits 1: 1 failed, 16 deselected. `node tmp/codex/rmdir-host-probe.ts` exits 0: the empty-directory control removes successfully; removing a regular file with `rmdir` throws `ENOENT`, and its bytes remain `replacement`. Production `src/server/stores/FileBrowserStore.ts:380` accepts `ENOENT` at line 388. Gate evidence is in `tmp/codex/item9-3-gates.log`, `item9-3-gates.err`, and `item9-3-gates.json`; the launcher reports exit 1, uncapped, 89,814 ms.
- **Done / not done:** preserved all earlier repairs and committed the browser-brand test repair with its supporting setup changes. No server failure was edited. Commit 1, commit 2, item 10, and gates after the server gate remain undone. No push, publication, installation, discovery-script invocation, or subagent dispatch occurred in this run.
- **Hypothesis:** the lock-release path conflates a missing path with Windows returning `ENOENT` for an existing non-directory path.

The server gate reports these unresolved failures:

| Test or group | Observed failure |
| --- | --- |
| Browser readiness after the re-executed process closes stderr | Expected an early readiness refusal; received the 10,000 ms deadline refusal. |
| Journey-store chmod permission proof | The child expected permission mode 0; read 292 (octal 0444). |
| Journey-store linked components; run-store capture, clear, delete, and run-file links; file-store temporary link and root alias | Seven tests fail while creating symlinks with `EPERM`, before their refusal assertions. |
| File-store lock release | Resolves instead of rejecting with `BROWSER_JOURNEY_ACCESS`; reproduced alone. |
| File-store failed rename cleanup | Expected `BROWSER_JOURNEY_FILE`; received `BROWSER_JOURNEY_ACCESS`. |

Earlier blockers are retained as evidence across the runs: run 1 stopped at C5's 5,000 ms timeout; run 2 repaired C5 and stopped at the browser-brand assertion; run 3 repairs that assertion and reaches the server failures. Run 1 also recorded the scaffold discovery JSON parsing defect. Runs 2 and 3 did not invoke discovery.

## Host-independence commit

Commit: `ce66ba336cb072a2f5c3adfd605aed4e32dd0737` — **Repair host independence in unchanged browser transport tests**.

The unchanged `SocketCDPTransport > carries a CDP client to Browser.getVersion over the page WebSocket` assumed the product matched `/Chrom/`. Before editing, `git diff 655906b -- tests/src/browser/transports/SocketCDPTransport.test.ts` was empty. Its isolated run completed the CDP round trip but failed on `Edg/154.0.4258.53`: 1 failed, 7 deselected.

The repair compares the WebSocket product with the same endpoint's independent HTTP `/json/version` answer and checks the product, protocol version, revision, JavaScript version, and user-agent shape. Node-side global setup supplies the HTTP product because browser-side fetch failed. Its context proof checks the added product reading. Production transport and client code remain unchanged.

| Command / control | Result |
| --- | --- |
| `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/transports/SocketCDPTransport.test.ts -t 'carries a CDP client'`, original assertion | Exit 1; 1 failed, 7 deselected; product was `Edg/154.0.4258.53`. |
| `node tmp/codex/socket-mutation.ts`: replace decoded CDP results with `{}` in `CDPClient`, then run the targeted case | Mutation exits 1; 1 failed, 7 deselected; expected the HTTP product, received `undefined`. |
| Same mutation runner after restoring production code; full transport file | Exit 0; 8 passed. Runner exits 0. |
| `npx vitest run --config vite.config.ts --project setup tests/setupGlobal.test.ts` | Exit 0; 9 passed. |
| `npx tsc --noEmit --project tsconfig.json` | Exit 0. |
| `git diff --check` | Exit 0. |

The mutation script and `socket-red.log` / `socket-green.log` preserve the evidence. The green mutation run reported a Vitest teardown warning but exited 0; the subsequent prescribed browser gate passed without that warning.

## Item 9 findings

The repairs and mutation evidence from the first run are preserved. Documentation-only findings have no red/green test count; the guide gate has not been reached in any run.

| Finding | Repair and evidence |
| --- | --- |
| F1 | Corrected `boundBrowserText` remarks: view-bearing action and `dialog` receipts use the view footer; other results, including `look` and `read`, use the cut footer. Documentation repair; no mutation count. |
| F2 | Added matching headers exceeding half the room and the whole room, and a header that fits without a row. Each of three mutations failed 1 targeted test; restored code passed 1 each. |
| F3 | Added popup `look` paging with a move note, body bound, outline-only end offset, and continuation-prefix assertion. Omitting note-length subtraction failed 1 test; restored code passed 1. The mutation produced a 544-character body against the 500-character limit. |
| F4 | Added the exact Enter receipt carrying both the no-submission status and focused textbox. Reversing clauses and changing the separator each failed 1 test; restored code passed 1 each. |
| F5 | Gave the text fixture a reference, added a referenced generic row, asserted distinct-word ties, and tested `Zurück` and `日本語`. Each exclusion, deduplication, and Unicode mutation failed 1 test; restored code passed 1 each. |
| F6 | Corrected the guide's full tool-copy bound to 6,050. Documentation repair; no mutation count. |
| F7 | Added `look` to limit error sources and documented the `look`/`read` next-character refusal. Documentation repair; no mutation count. |
| F8 | Updated the argument-validation example to `call look with what and offset.` Documentation repair; no mutation count. |
| F9 | Repaired the same stale footer remarks as F1 and aligned cut-footer descriptions in the constant and guide. Documentation repair; no mutation count. |
| F10 | Named `dialog` beside action receipts in the view-footer constant, toolset documentation, and guide receipt prose/table. Documentation repair; no mutation count. |
| F11 | Documented the line-break-past-start condition, window-end fallback, surrogate-pair preservation, and final outline/reading endpoint. Documentation repair; no mutation count. |
| F12 | Replaced the possessive code token with “the `what` parameter of a `look` call” and corrected the adjacent legend wording. Documentation repair; no mutation count. |
| F13 | The specified iframe sequence did not reproduce stale focus. Retained its regression test without a production repair; ruling follows. |

Each F2–F5 mutation used this command, with the file and filter in the following table, before and after restoring production code:

`node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/FILE.test.ts -t "FILTER"`

| Finding / mutation | FILE | FILTER | Red | Green |
| --- | --- | --- | --- | --- |
| F2: bypass header-fit check | BrowserToolset | omits an oversized | 1 failed; exit 1 | 1 passed; exit 0 |
| F2: compare header against whole room | BrowserToolset | omits an oversized | 1 failed; exit 1 | 1 passed; exit 0 |
| F2: remove block's blank line | BrowserToolset | omits an oversized | 1 failed; exit 1 | 1 passed; exit 0 |
| F3: omit note-length subtraction | BrowserToolset | shares the look | 1 failed; exit 1 | 1 passed; exit 0 |
| F4: reverse status and focus | BrowserToolset | places the focus | 1 failed; exit 1 | 1 passed; exit 0 |
| F4: join clauses with comma | BrowserToolset | places the focus | 1 failed; exit 1 | 1 passed; exit 0 |
| F5: remove StaticText exclusion | helpers | never matches an ignored | 1 failed; exit 1 | 1 passed; exit 0 |
| F5: remove omitted-role exclusion | helpers | never matches an ignored | 1 failed; exit 1 | 1 passed; exit 0 |
| F5: count repeated search words | helpers | counts distinct | 1 failed; exit 1 | 1 passed; exit 0 |
| F5: replace Unicode letters with ASCII | helpers | counts distinct | 1 failed; exit 1 | 1 passed; exit 0 |

The first run's commands were `node tmp/codex/item9-mutations.ts` and `node tmp/codex/item9-mutations.ts --green`, both exit 0. The script records the literal mutations; outputs are `tmp/codex/F*-red.log` and `tmp/codex/F*-green.log`. The second run's core gate passes the preserved tests within its 1,200 passing tests. Every mutation is restored.

## C5 host-independence repair

Replaced each per-iteration delay with a deferred resolved by the `WebMCP.invokeTool` send handler. A subsequent `Runtime.evaluate` reply forms a protocol completion barrier before the fresh response arrives, so a retained stale response cannot be overwritten before the assertion observes it. The same synchronization precedes the first loop. That loop emits every foreign response without a per-iteration wait. C5 contains no remaining delay or polling loop, retains all 1,000 foreign ID reuses, and keeps its 5,000 ms budget.

The mutation changes the response retention condition in `BrowserRegistry.#respond` from a matching entry in `#awaiting` to one in `#pending`, retaining foreign responses outside the reply window during the long invocation. Production code is restored after the check.

The red and green command was:

`node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/BrowserRegistry.test.ts -t "C5 drops foreign responses"`

| Reading | Result |
| --- | --- |
| Original test, first run | 1 failed from the 5,000 ms timeout; exit 1 |
| Repaired test with retention mutation | 1 failed, 18 deselected; expected `fresh`, received `stale`; exit 1 |
| Repaired test with restored production code | 1 passed, 18 deselected; 75 ms test duration; exit 0 |
| Full touched file: `npx vitest run --config vite.config.ts --project src:core tests/src/core/BrowserRegistry.test.ts` | 19 passed; exit 0 |
| Prescribed core gate | 1,200 passed; exit 0 |

The mutation runner `node tmp/codex/c5-mutation.ts` exited 0. Evidence is in that script and `tmp/codex/C5-red.log` and `tmp/codex/C5-green.log`. The host-independence repair remains uncommitted because the second run's browser gate failed. The third run passes the browser gate but stops at the server gate.

## F13 ruling

In the first run's real Chromium test, focusing the child input names `e2 textbox "Child"`. Focusing the preceding parent button changes the child document's `activeElement` to its body and names `e1 button "Parent"`. Blurring the parent button yields `undefined` focus.

The control assertion that the child retains its input failed: 1 failed, exit 1. Replacing that assumed observation with the observed body while retaining the focus assertions passed: 1 passed, exit 0. Both used:

`npx vitest run --config vite.config.ts --project src:browser tests/src/browser/elements/BrowserDOMElementManager.test.ts -t 'discards stale focus'`

The second run's browser gate also passes that regression; its failure is in the separate transport test. The specified sequence does not justify a production focus change. This reading does not establish behavior on every Chromium version.

## Item 10 rulings

No item 10 probe, implementation, guide change, roadmap change, or red/green check ran because item 9 did not clear its gates.

| Ruling | Repair and red/green status |
| --- | --- |
| Row state format, order, and shared renderer | Not started; no commands or counts |
| Preserve CDP capture behavior | Not started; no commands or counts |
| DOM token/state mapping, native select/options, and summary exclusion | Not started; no commands or counts |
| Role restrictions for each state | Not started; no commands or counts |

## Gate results

The host reports npm `12.0.2`. Each chain stops at its first failure. Gate output and exit codes were read without filtering. No commit 2 gate ran.

| Command | Commit 1 candidate, run 1 | Commit 1 candidate, run 2 | Commit 1 candidate, run 3 | Commit 2 |
| --- | --- | --- | --- | --- |
| `npm run format:check` | Exit 0 | Exit 0 | Exit 0 | Not run |
| `npm run lint:check` | Exit 0 | Exit 0 | Exit 0 | Not run |
| `npm run check` | Exit 0 | Exit 0 | Exit 0 | Not run |
| `npm run test:src:core` | Exit 1; 1,199 passed, 1 failed | Exit 0; 1,200 passed | Exit 0; 1,200 passed | Not run |
| `npm run test:src:browser` | Not run | Exit 1; 238 passed, 1 failed, 1 skipped | Exit 0; 239 passed, 1 skipped | Not run |
| `npm run test:src:server` | Not run | Not run | Exit 1; 235 passed, 11 failed, 3 skipped | Not run |
| `npm run test:src:bin` | Not run | Not run | Not run | Not run |
| `npm run test:guides` | Not run | Not run | Not run | Not run |
| `npm run test:policy` | Not run | Not run | Not run | Not run |
| `npm run test:setup` | Not run | Not run | Not run | Not run |
| `npm run test:setup:browser` | Not run | Not run | Not run | Not run |
| `npm run build` | Not run | Not run | Not run | Not run |
| `npm run test:service` | Not run | Not run | Not run | Not run |
| `git diff --check` | Exit 0 | Exit 0 | Exit 0, standalone after stop | Not run |

Host-independence commit: **`ce66ba336cb072a2f5c3adfd605aed4e32dd0737`**. Commit 1: **not created**. Commit 2: **not created**.

Final `git status --porcelain` is not empty; these preserved edits remain:

```text
 M guides/browser.md
 M src/core/BrowserToolset.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M tests/src/browser/elements/BrowserDOMElementManager.test.ts
 M tests/src/core/BrowserRegistry.test.ts
 M tests/src/core/BrowserToolset.test.ts
 M tests/src/core/helpers.test.ts
```
