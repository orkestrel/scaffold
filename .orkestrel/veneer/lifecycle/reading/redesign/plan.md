# Plan amendment: a line view that the 2B and the 4B act on (2026-10-07)

This plan amends `lifecycle/reading/plan.md`. Its sources are:
- the brief `design-brief.md`;
- the two proposals and `reconcile.md`;
- four measured rounds, `store-validate` through `store-validate-4`, with reports in ollama `tmp/codex/`.

## The finding

M1 stopped the series on browser `b6dda22`. Three diagnostics traced each failure to the line view and to one harness rule.

| Failure | Cause, as measured |
| --- | --- |
| 4B cart detours through `click e11` | The bare line number `11: ` beside the bare reference `e7` |
| 4B paging answers without reading on | The first view is taken as the whole page |
| 2B cart spends 8 turns | Its search starts at the footer's line 47 and misses the tray on line 11 |
| 2B search answers from prose | It reads instead of typing into the search box |
| 2B checkout fails a completed order | The harness clears the exposed references on every window, including empty ones |

## The change set

Every change keeps the user's rulings in `campaign.md`:
- numbered lines with inline references;
- `from` and `to` with a bounded window;
- a footer naming the next line;
- a line-numbered search;
- unchanged budgets.

### Browser

1. **References after the name.** Every reference prints as `[ref=eN]` immediately after its element's quoted name: in reading rows, action receipts, refusals, journey listings, and MCP text. Every line keeps its `N: ` number. For example, `11: ### link "Cedar Tea Tray" [ref=e7] /product/p3`. `parseBrowserReference` already accepts `ref=e7` and `[ref=e7]`.
2. **A partial-view line.** When lines remain after the window, a second header line reads `This read shows lines A–B of T; lines B+1–T are not shown yet.` The footer keeps its bytes.
3. **A search past `from` names its best match.** When the requested range holds no match and the page does, the reply adds `No line from F on matches "Q"; the best match is line M:` and line M quoted in full. The window does not move, and the footer describes only the window.
4. **A change note from line 1.** A changed read from line 1 also carries the change note, so a reader can tell a changed page from a re-read.
5. **`type` names a search box.** Its description becomes `Types into a field such as a search box, optionally submits its form, and returns the page.`

### Ollama harness

6. **The framing and the type sentence.**
   - The seed turn reads `The browser's first read of the page:`, replacing "The browser shows this page:".
   - The system prompt's type sentence reads `To fill a field or use the site's search box, call type with its reference, the text, and submit true.` It names a procedure that the 0.0.26 prompt carried, and no answer. The user rules whether it counts as task copy.
7. **Rule R, which needs the user's ruling.** The exposed reference set accumulates across reads of one unchanged page. It resets on a page change, a change note, a tab change, or an action; an action's own reference is checked before its reset. A reference refused as not in view counts as unlisted.
   - **What it keeps:** the claim the oracle names, "the model never invents a reference". An invented reference, a stale reference after a page change, and a refused reference all still fail.
   - **What it drops:** the stricter rule that a reference must appear in the latest window. The tool does not make that rule, and it failed every completed 2B checkout.
8. **The parsers.** They read the new reference form. The oracles keep every condition: the fact on line 52, the token on line 80, the continuation at the footer's line, and exactly one checkout order.
9. **Measurement roles.** M1 is reported as a diagnostic and no longer stops the series, because a first call does not predict completion. M2 is the gate, and M3 to M5 are unchanged. The checkout judge counts a read that shows the Checkout link, as cart's judge already counts the tray link.

## The evidence

Every figure is out of 8 draws, one per port, at temperature 0. Each row names its record.

| Change | Before | After | Record |
| --- | --- | --- | --- |
| 1, the reference form | 4B cart first call 0 | 8 | `store-validate-report.md`, arm L1 |
| 2 + 6, the partial line and framing | 4B paging first call 0 | 8; 2B paging stays 8 | `store-validate-2-report.md`, C2; paging re-judge `scaffold/tmp/units/paging-rejudge.ts` |
| 3, the best-match line | 2B cart completion 0 (M2diag) | 8 | `store-validate-3-report.md`, control C2 |
| 5, the `type` description | 2B search completion 0 | 6 | `store-validate-3-report.md`, arm T1 |
| 5 + 6, the `type` description and the type sentence | 2B search completion 0 | 8; cart stays 8 | `store-validate-4-report.md`, arm T1+P1 |
| 7, rule R | 2B checkout 0 | 8, re-judged from the M2diag transcripts | `store-validate-report.md`, Stage 0 |

**The guard.** The guard covers the first calls of every cell at 8 of 8 on the shipped bytes. Under the full set:
- 2B shipping and paging stay at 8;
- 4B shipping, cart, search, and paging are at 8;
- 4B checkout is at 7: one port reads from line 46 before acting, which costs one turn and is not a failure.

The plan's guard threshold is 7. The unit applied 8 and reported a fail.

**Rejected:** the analyst's `read` copy (D1) took 2B search to 0 with T1, and to 2 with T1 and P1.

**The first-call figures are transforms, not the package.** The completion figures ran every tool result through the transform. The implementation must reproduce those bytes, and M2 to M5 measure the real package.

## Units

The units run after the user's approval:

| Unit | Engine | Owns | Acceptance |
| --- | --- | --- | --- |
| U1 contract and copy | Opus; the Orchestrator runs commands | browser `src/core/constants.ts` (the `type` description, the partial-line and best-match copy), `src/core/types.ts` where a shape changes | Copy tests within the 100-character bound; `check` |
| U2 projection | Astra | browser `src/core/helpers.ts`, `src/core/BrowserToolset.ts`, the journey and MCP renderers that print references, and their tests | One case per rule: the reference form in rows, receipts, and refusals; the partial line only when rows follow; the best-match line on a range miss, absent on an in-range hit and on a page-wide miss, with the window unmoved; the change note from line 1; every result within `BROWSER_TOOL_LIMIT`; the project tests and `check` |
| U3 guide | Opus | browser `guides/browser.md` and changed TSDoc | `test:guides`; prose re-read against what shipped |
| O1 harness | Astra | ollama `tests/setupStore.ts`, `tests/setupStore.test.ts`, `tests/service/browser.test.ts`, `tmp/probes/store-helpers.ts` | Rule R's cases (refused: invented, stale after a change, and not in view; accepted: earlier on an unchanged page); the framing; the parsers; the seed and best-match bytes equal to the validated transforms, port-masked; the fact and token positions held; `test:setup`, `check` |
| F audit | Opus on the Astra code, Astra on the Opus copy | read-only | One `orkestrel-falsify` round |
| V, M, P | as in `plan.md` | | Gates; M1 diagnostic; M2 gate at 7 of 8 per task on both models; M3 16 clean runs on the 2B; M4 2 runs on the 4B; M5 the journey; then browser 0.0.27, agent 0.0.27, and ollama |
