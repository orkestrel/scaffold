# Browse 9–10 report

Stopped under the brief's deviation contract. F1–F12 repairs, F13's test, and the C5 host-independence repair remain uncommitted. Item 10 is not started. Neither requested commit was created. HEAD remains `655906b5ebf0007f7a0f7db861d38b50f79449b2` on `ccr-d15a48b1-yyyll6`.

## Deviation

- **Expected:** the prescribed gates pass before commit 1, followed by item 10, commit 2, and an empty final status.
- **Found:** after the C5 repair, `npm run test:src:core` passes all 1,200 tests. The next gate, `npm run test:src:browser`, exits 1: 238 passed, 1 failed, 1 skipped. `SocketCDPTransport > carries a CDP client to Browser.getVersion over the page WebSocket` expects `/Chrom/` but receives `Edg/154.0.4258.53`.
- **Evidence:** `tests/src/browser/transports/SocketCDPTransport.test.ts:16`, `tmp/codex/item9-2-gates.log`, `tmp/codex/item9-2-gates.err`, and `tmp/codex/item9-2-gates.json`. `git diff 655906b -- tests/src/browser/transports/SocketCDPTransport.test.ts` is empty. The launcher reports exit 1, `capped=false`, and 65,610 ms.
- **Done / not done:** preserved the first run's repairs and added the requested C5 repair with a failing mutation and passing restored test. Remaining gates, both commits, and item 10 are not done. No push, publication, installation, or subagent dispatch occurred.
- **Hypothesis:** the test's browser-product assertion excludes the Edge endpoint selected on this host, although that endpoint supplies the requested CDP response.

The first run stopped at C5's 5,000 ms timeout: the core gate reported 1,199 passed and 1 failed, and the isolated case reported 1 failed and 18 deselected. That blocker is repaired. The first run also encountered the scaffold discovery JSON parsing defect recorded in `tmp/codex/browse-9-10-report.md`. This run did not invoke discovery. The manual census command `npx vitest list --config vite.config.ts --project src:core --json=tmp/codex/list-src-core.json` exited 0.

## Item 9 findings

The repairs and mutation evidence from the first run are preserved. Documentation-only findings have no red/green test count; the guide gate has not been reached in either run.

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

The first run's commands were `node tmp/codex/item9-mutations.ts` and `node tmp/codex/item9-mutations.ts --green`, both exit 0. The script records the literal mutations; outputs are `tmp/codex/F*-red.log` and `tmp/codex/F*-green.log`. This run's core gate passes the preserved tests within its 1,200 passing tests. Every mutation is restored.

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

The mutation runner `node tmp/codex/c5-mutation.ts` exited 0. Evidence is in that script and `tmp/codex/C5-red.log` and `tmp/codex/C5-green.log`. The host-independence repair remains uncommitted because the browser gate failed.

## F13 ruling

In the first run's real Chromium test, focusing the child input names `e2 textbox "Child"`. Focusing the preceding parent button changes the child document's `activeElement` to its body and names `e1 button "Parent"`. Blurring the parent button yields `undefined` focus.

The control assertion that the child retains its input failed: 1 failed, exit 1. Replacing that assumed observation with the observed body while retaining the focus assertions passed: 1 passed, exit 0. Both used:

`npx vitest run --config vite.config.ts --project src:browser tests/src/browser/elements/BrowserDOMElementManager.test.ts -t 'discards stale focus'`

This run's browser gate also passes that regression; its failure is in the separate transport test. The specified sequence does not justify a production focus change. This reading does not establish behavior on every Chromium version.

## Item 10 rulings

No item 10 probe, implementation, guide change, roadmap change, or red/green check ran because item 9 did not clear its gates.

| Ruling | Repair and red/green status |
| --- | --- |
| Row state format, order, and shared renderer | Not started; no commands or counts |
| Preserve CDP capture behavior | Not started; no commands or counts |
| DOM token/state mapping, native select/options, and summary exclusion | Not started; no commands or counts |
| Role restrictions for each state | Not started; no commands or counts |

## Gate results

The host reports npm `12.0.2`. Both gate chains stop at their first failure. Output and exit codes were read without filtering. Commit 2 has no gate run because commit 1 has not been created.

| Command | Commit 1 candidate, first run | Commit 1 candidate, this run | Commit 2 |
| --- | --- | --- | --- |
| `npm run format:check` | Exit 0 | Exit 0 | Not run |
| `npm run lint:check` | Exit 0 | Exit 0 | Not run |
| `npm run check` | Exit 0 | Exit 0 | Not run |
| `npm run test:src:core` | Exit 1; 1,199 passed, 1 failed | Exit 0; 1,200 passed | Not run |
| `npm run test:src:browser` | Not run | Exit 1; 238 passed, 1 failed, 1 skipped | Not run |
| `npm run test:src:server` | Not run | Not run | Not run |
| `npm run test:src:bin` | Not run | Not run | Not run |
| `npm run test:guides` | Not run | Not run | Not run |
| `npm run test:policy` | Not run | Not run | Not run |
| `npm run test:setup` | Not run | Not run | Not run |
| `npm run test:setup:browser` | Not run | Not run | Not run |
| `npm run build` | Not run | Not run | Not run |
| `npm run test:service` | Not run | Not run | Not run |
| `git diff --check` | Exit 0 | Exit 0 | Not run |

Commit 1 hash: **not created**. Commit 2 hash: **not created**.

Final `git status --porcelain` is not empty; the preserved edits are:

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
