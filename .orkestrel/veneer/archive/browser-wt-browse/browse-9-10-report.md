# Browse 9–10 report

Stopped under the brief's deviation contract. Item 9 repairs are uncommitted; item 10 is not started. Neither requested commit was created. HEAD remains `655906b5ebf0007f7a0f7db861d38b50f79449b2` on `ccr-d15a48b1-yyyll6`.

## Deviation

- **Expected:** the prescribed gates pass before committing item 9, followed by item 10 and an empty final status.
- **Found:** `npm run test:src:core` exited 1: 1,199 passed, 1 failed. The unchanged test `BrowserRegistry > C5 drops foreign responses outside a reply window during a long invocation` timed out at 5,000 ms. Its isolated rerun also exited 1: 1 failed, 18 deselected.
- **Evidence:** `tmp/codex/item9-gates.log`, `tmp/codex/item9-gates.err`, and `tests/src/core/BrowserRegistry.test.ts:360`. Isolated command: `npx vitest run --config vite.config.ts --project src:core tests/src/core/BrowserRegistry.test.ts -t 'C5 drops foreign responses'`.
- **Done / not done:** F1–F12 edits and F2–F5 mutation checks are complete. F13 was exercised without a production repair. Remaining gates, both commits, and item 10 are not done. No push, publication, installation, or subagent dispatch occurred. Final status contains the preserved edits listed below.
- **Hypothesis:** the existing C5 loop's 1,000 sequential `waitForDelay()` calls exceed its 5,000 ms budget on this Windows host. This cause is not proved.

The required discovery command also exited 1: `node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-harden/scripts/discovery.js --config vite.config.ts --projects src:core,src:browser --json`. Its `JSON.parse` rejected output beginning `[vite] (client) [optimizer] scanning dependencies...` at `discovery.js:76`. No scaffold-owned file was changed.

## Item 9 findings

The following repairs remain in the worktree. Documentation-only repairs have no mutation test or red/green count; their full guide gate was not reached.

| Finding | Repair and evidence |
| --- | --- |
| F1 | Corrected `boundBrowserText` footer remarks. View-bearing action and `dialog` receipts use the view footer; other results, including `look` and `read`, use the cut footer. |
| F2 | Added oversized matching headers at lengths exceeding half the room and the whole room, plus a header that fits without a row. Three mutations each failed 1 targeted test; restored code passed 1 each. |
| F3 | Added popup `look` paging with a move note, body bound, outline-only end offset, and continuation-prefix assertion. Removing note-length subtraction failed 1 test; restored code passed 1. The mutation produced a 544-character body against the 500-character limit. |
| F4 | Added the exact Enter receipt with both the no-submission status and focused textbox. Reversing clauses and changing the separator each failed 1 test; restored code passed 1 each. |
| F5 | Gave the text fixture a reference, added a referenced generic row, asserted distinct-word ties, and tested `Zurück` and `日本語`. Removing text exclusion, omitted-role exclusion, deduplication, or Unicode letter matching each failed 1 test; restored code passed 1 each. |
| F6 | Changed the guide's full tool-copy bound from 5 900 to 6 050. |
| F7 | Added `look` to the limit error sources and documented the `look`/`read` next-character refusal. |
| F8 | Updated the argument-validation example to `call look with what and offset.` |
| F9 | Repaired the same stale footer remarks as F1; aligned cut-footer documentation in the constant and guide. |
| F10 | Included `dialog` explicitly in the view-footer constant, toolset documentation, and guide receipt prose/table. |
| F11 | Documented the line-break-past-start condition, window-end fallback, surrogate-pair preservation, and final outline/reading endpoint. |
| F12 | Replaced the possessive code token with “the `what` parameter of a `look` call”; corrected the adjacent legend wording. |
| F13 | The specified iframe sequence did not reproduce stale focus. See the ruling below. |

### Mutation commands and counts

Each row ran the following command with the listed file and filter, first under the mutation and then with the original production code restored:

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

The runner and literal mutations are recorded in `tmp/codex/item9-mutations.ts`. Commands were `node tmp/codex/item9-mutations.ts` and `node tmp/codex/item9-mutations.ts --green`, both exit 0. Individual outputs are `tmp/codex/F*-red.log` and `tmp/codex/F*-green.log`. Every mutation was restored.

### F13 ruling

On this host's real Chromium, focusing the child input names `e2 textbox "Child"`. Focusing the preceding parent button changes the child document's `activeElement` to its body and names `e1 button "Parent"`. Blurring the parent button yields `undefined` focus.

The control assertion that the child retains its input failed: 1 failed, exit 1. Replacing that assumed observation with the observed body and retaining the required focus assertions passed: 1 passed, exit 0. Command for both runs:

`npx vitest run --config vite.config.ts --project src:browser tests/src/browser/elements/BrowserDOMElementManager.test.ts -t 'discards stale focus'`

No production focus change is justified by this sequence. The regression test remains. This reading does not establish behavior on every Chromium version.

## Item 10 rulings

No item 10 probe, implementation, guide change, roadmap change, or red/green check ran because item 9 did not clear its gates.

| Ruling | Status |
| --- | --- |
| Row state format, order, and shared renderer | Not started |
| Preserve CDP capture behavior | Not started |
| DOM token/state mapping, native select/options, and summary exclusion | Not started |
| Role restrictions for each state | Not started |

## Gate results

The host reported npm `12.0.2`. Gate output was read without filtering. The item 9 gate chain stopped at its failure.

| Command | Item 9 commit candidate | Item 10 |
| --- | --- | --- |
| `npm run format:check` | Exit 0 | Not run |
| `npm run lint:check` | Exit 0 | Not run |
| `npm run check` | Exit 0 | Not run |
| `npm run test:src:core` | Exit 1; 1,199 passed, 1 failed | Not run |
| `npm run test:src:browser` | Not run | Not run |
| `npm run test:src:server` | Not run | Not run |
| `npm run test:src:bin` | Not run | Not run |
| `npm run test:guides` | Not run | Not run |
| `npm run test:policy` | Not run | Not run |
| `npm run test:setup` | Not run | Not run |
| `npm run test:setup:browser` | Not run | Not run |
| `npm run build` | Not run | Not run |
| `npm run test:service` | Not run | Not run |
| `git diff --check` | Exit 0 | Not run |

Commit 1 hash: **not created**. Commit 2 hash: **not created**.

Final `git status --porcelain` is not empty:

```text
 M guides/browser.md
 M src/core/BrowserToolset.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M tests/src/browser/elements/BrowserDOMElementManager.test.ts
 M tests/src/core/BrowserToolset.test.ts
 M tests/src/core/helpers.test.ts
```
