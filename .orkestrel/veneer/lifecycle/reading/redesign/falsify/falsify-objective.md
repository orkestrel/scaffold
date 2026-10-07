Deviation: the dispatch did not include the diff or `git status --porcelain`, and this lane has no shell to produce them. The audit reads the checked-out trees instead. Browser `.git/refs/heads/main` reads `d9218380c44316af7c564b67cc949c9a167bb121` and ollama reads `b45eae77cc46f1320de60cb09638009ecf4a7e9a`. The `b3083aa` text comes from the writer's own Codex file capture, `C:/Users/mikes/WebstormProjects/ollama/tmp/codex/redesign-harness.jsonl` line 11. No `b6dda22` text was readable. I wrote no probe, so there is nothing to delete.

## 1. Verdicts

1. **BROKEN.** I enumerated the surfaces from source. Rows (`helpers.ts:228`, `:473`), receipts (`helpers.ts:1096`) and the focus clause put `[ref=eN]` after the name or role. Three surfaces fail:
   - `C:/Users/mikes/WebstormProjects/browser/src/core/helpers.ts:1124`: the refusal prints a bare reference: `is not a reference such as e12; call read for fresh refs`. Right: `such as [ref=e12]`.
   - Refusals where the element is known print `Element [ref=eN] …` instead of the reference after the quoted name or role. This happens at `src/core/elements/BrowserPageElement.ts:229`, `:277`, `:304`, `:324`, `:380`, `:395`, `:468`, `:478`, `:504` and `src/browser/elements/BrowserDOMElement.ts:75`, `:96`, `:113`, `:120`, `:142`, `:156`, `:181`, `:192`, `:200`, `:247`, `:260`, `:265`, `:277`, `:288`. Right: pass `{ subject: renderBrowserElement(this) }` there. Keep `Element [ref=eN]` only where just the reference is known (`BrowserToolset.ts:1326`, `BrowserElementManager.ts:463`).
   - The click hint at `BrowserToolset.ts:866` puts the reference after "with", not after a name. It is minor because the name appears earlier on the same line.
   - Referral R1, outside this lane: the agent-visible copy still prints bare `e4` (`constants.ts:454`, `:482`, `:494`, `:675`; ollama `tests/setupStore.ts:137`). Claims 7 and 14 freeze that copy, so claim 1's "no surface" conflicts with them. The Orchestrator rules which claim governs.

2. **CONFIRMED.**
   - Attacks that failed: searches for `ref`, `e7`, `[ref=e17]` and a prefix such as `refe`. `scanBrowserLines` scores only `text` spans (`helpers.ts:614-618`). The reference is one `reference` span (`helpers.ts:473`). A wrap keeps span categories (`helpers.ts:576-583`), and a hard wrap cannot split the token because a space always comes before it.
   - Mutation: retag `helpers.ts:473` as `text`. The test at `tests/src/core/helpers.test.ts:1543-1544` fails, so it distinguishes.

3. **CONFIRMED.**
   - Attacks that failed:
     - a window ending at T−1 (singular form);
     - `to` < T;
     - `from` = T;
     - an empty page;
     - receipt windows at limit 250;
     - the last row dropping the partial line. The loop breaks at the first misfit, so the line always matches `end`.
   - The partial line is computed per candidate inside the fit (`helpers.ts:847-855`). The receipt minimum includes it (`helpers.ts:808`). `renderBrowserFooter` names `end+1`.
   - Mutations: appending the line after fitting fails `helpers.test.ts:1575`; making the condition `index <= lines.length` fails `:1568`.

4. **BROKEN** on the bound "never cuts a reference or a numbered row".
   - Cause: `helpers.ts:786-790` passes the whole note to `boundBrowserText`, which cuts at an arbitrary offset (`helpers.ts:1019-1025`). The note quotes `passage.search` unabbreviated, and `#boundReceipt(options.search, undefined)` leaves the search unbounded (`BrowserToolset.ts:808`, `:746`).
   - Input with the default limit: `read {from: 47, search: S}` on the catalogue, with S repeating "Cedar Tea Tray". Tune S's length so the cut lands inside `11: ### link "Cedar Tea Tray" [ref=e7]`. A longer S removes the sentence and line 11 entirely.
   - Input with a configured limit: `createBrowserToolset(page, { limit: 1200 })`, with the window row and line M both near 700 characters. The cut lands inside line M.
   - The writer's own `helpers.test.ts:1615-1617` exercises a cut note and asserts only the length. `guides/browser.md:2820` documents the cut.
   - When `room < 1` (`:784`), the plain miss sentence is dropped too.
   - Right: quote `abbreviateBrowserText(passage.search, 120)` as `helpers.ts:721` does. When the sentence plus the whole row M exceeds `room`, omit row M, or fall back to `found.text`. Never bound a string that holds a numbered row.
   - The condition, M = `matches[0]` page-wide, the unmoved window and footer, and the page-wide miss all held.
   - Proof gap: changing `[0]` to `.at(-1)` survives every test, because no fixture has two equal best scores.

5. **CONFIRMED.**
   - `renderBrowserPassage` pushes the note whenever `changed` is set (`helpers.ts:764`). `changed` needs a previous projection that differs (`BrowserToolset.ts:814`), so the first read has none.
   - Attacks that failed:
     - a re-read after a receipt: the receipt stores its projection (`BrowserToolset.ts:1964`), which matches the note's own words "since the last view";
     - a read that overlaps an action: the stale read is flagged, which is correct relative to the last read.
   - Mutation: restore a `from !== 1` guard. `helpers.test.ts:1628` fails.

6. **CONFIRMED.**
   - Attack: follow the footer from a search window, a best-match window, a `to`-capped window and a receipt window. Each footer names `end+1`, and the partial line names the same line.
   - `read {from}` with no search opens at `from` (`helpers.ts:718`).
   - This holds on an unchanged page. A changed page carries the note.

7. **UNRESOLVED.**
   - The `type` description equals the approved bytes (`constants.ts:490`). It is 17 words, and every parameter description is under 100 characters.
   - "Every other tool, parameter, and handler is unchanged" rests only on the writer's `tmp/codex/redesign-audit.ts`.
   - To settle it: `git diff b6dda22 d921838 -- src/core/constants.ts src/core/BrowserToolset.ts` should show only `:490` and `:866`. See also R1.

8. **UNRESOLVED.**
   - Each named mutation would fail a core test (core ran green, verified by the Orchestrator):
     - an approved string: the partial line at `helpers.test.ts:1563` or the best-match line at `:1602`;
     - the reference position: `:1536`;
     - the partial line's condition: `:1568`, `:1569`;
     - the best-match condition: `:1605`, `:1607`, `:1614`.
   - The store byte equality (`tests/service/toolset.test.ts:525-567` against the inline copies at `tests/setupService.ts:997-1010`) has only the writer's service run. Spot check: the seed opening and the partial line appear in `validate-4/2b/T1+P1/attempts/inputs/49171-cart.json`.
   - To settle it: run `npm exec -- vitest run --config vite.config.ts --project service tests/service/toolset.test.ts -t "line redesign"` and `node tmp/codex/redesign-audit.ts`.

9. **BROKEN.**
   - `guides/browser.md:2816` says "Every element reference renders as `[ref=eN]` immediately after its quoted name". `describeBrowserRefusal('e7','GONE')` returns `Element [ref=e7] …`, which `helpers.test.ts:1546` pins.
   - `guides/browser.md:2820` documents the cut that claim 4 denies.
   - Right: fix the code per claims 1 and 4, then make the prose match.
   - Running the fences belongs to the S lane.

10. **UNRESOLVED.** This is a subjective ruling for the S lane. The objective blockers are claims 1, 4 and 11.

11. **BROKEN.**
    - Cause: `C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:1166-1173` clears the exposed set on every call in `BROWSER_JOURNEY_ACTIONS`, even a refused one and even `wait` or `dialog`. The page did not change in those cases.
    - Interleaving on `/`:
      1. The seed lists `e4` (searchbox) and `e5` (button).
      2. `type {ref:'e5', text:'kettle', submit:true}` is refused before anything is sent (`BrowserToolset.ts:172-173`). `e5` passes the check, then the set is cleared.
      3. `type {ref:'e4', …}` succeeds in the browser, but `e4` is no longer in the set. It is flagged unlisted and the search run fails.
    - The user's rule counts `e4` because a read of the same unchanged page listed it. A `wait` that times out on an unchanged page clears the set the same way.
    - Right: clear on an action only when it succeeded and is not `wait`. Keep the resets for a header change, a change note and a refusal. Add a case: refused action, then a listed reference, then accepted.
    - The four named interleavings held:
      - an accidental header match: new element ids change the projection, so the change note fires (`BrowserToolset.ts:814`);
      - a quoted line before a page change;
      - another tab: `switch` resets, and the toolset refuses a foreign reference as not in view (`BrowserToolset.ts:1322-1332`), which counts as unlisted;
      - an action with no view (`setupStore.test.ts:963-992`).

12. **CONFIRMED.**
    - Attacks that failed: the partial line, the header, the tabs line, the note lines, a search hit line such as `1 line matches …`, a cut quote, and a page row that starts with "No line". `extractWindowText` (`setupStore.ts:1466-1481`) skips only the line that follows the exact best-match sentence. It keeps only lines that start with `N: `.
    - Mutation: drop the quoted skip. `setupStore.test.ts:1113` fails.

13. **CONFIRMED** against the `b3083aa` capture.
    - The shipping, cart, checkout and search predicates are byte-identical.
    - `findContinuedRead` is stricter: it checks the token in window rows only, and the first row excludes the quote.
    - The shared oracle is weaker only by the user's accumulation rule.
    - `tests/service/browser.test.ts:58` and `:64` use the same predicate.
    - Held: a best-match quote can carry the shipping fact. That still counts as the model receiving the fact.

14. **CONFIRMED.** The capture shows the framing changed from "The browser shows this page:" to the approved bytes (`setupStore.ts:883`). The type sentence is the approved bytes (`:140`). The other six sentences are byte-identical.

15. **CONFIRMED** on binding.
    - The bytes probe reads the records directly (`tmp/probes/redesign-harness-bytes.test.ts:45-71`), so it catches a changed reference form.
    - The positions probe catches a moved fact or token (`redesign-harness-positions.test.ts:52-77`).
    - Neither probe catches a framing byte; `setupStore.test.ts:859` does, with an exact match.
    - Whether the probes pass rests only on the writer's report.

16. **CONFIRMED.**
    - Either reference form is read through `parseBrowserReference` and `extractReferences` (`tmp/probes/store-helpers.ts:73-84`).
    - The checkout read clause (`:108-114`) mirrors cart's (`:88-97`).
    - The paging footer comes from the same `seed` passed to `buildStorePrompt` (`:119`, `:157`).
    - Two clauses did change against the capture, both stricter: cart now requires a reference on the row, and paging's first row skips the quote. Neither weakens a condition.

## 2. Findings outside the claims

- **F1.** `C:/Users/mikes/WebstormProjects/browser/src/core/helpers.ts:787` (and the plain miss at `:726`) prints `No line from F on matches` while ignoring `to`. When line M is past `to`, the sentence contradicts itself. Input: `read {from:1, to:1, search:'Tea Tray'}` returns `No line from 1 on matches "Tea Tray"; the best match is line 2:`, which `helpers.test.ts:1607-1610` pins. Right: when `to` is given, print `No line from F to T matches "Q"; …`. That changes an approved string, so it needs the Orchestrator's ruling.
- **F2.** `helpers.ts:557-591` can split a reference from its name. The soft wrap breaks at the last whitespace, which can be the space before the reference span (`:473`). Input: a link whose `[ref=eN]` starts between column 792 and 800. Line N then holds `link "…"` and line N+1 holds `[ref=e7] /product/p3` with no `↳` mark. The window can end at N, and a best-match quote of N shows no reference. Before the redesign, the reference came before the name. Right: never break at the whitespace immediately before a `reference` span; break earlier inside the name.
- **ADVISORY A1.** `ollama/tests/setupStore.ts:1132` counts any `[ref=eN]` in page text, and any row that starts with `eN ` (the legacy branch), as listed. A page that prints such text lets an invented reference pass.
- **ADVISORY A2.** The negative control at `redesign-harness-bytes.test.ts:72` cannot fail. The bytes and positions probes sit under `tmp/probes`, which no gate runs.

## 3. Attacked and held

- `extractReferences` excludes refusal text, because the success check comes first (`setupStore.ts:1174`).
- Header resets on growth of `(N lines)`.
- The best-match `minimum` includes the partial line, so the final window always fits one row.
- The partial-line guards `tool === 'read'` and `startsWith('page ')` are redundant but harmless; the journey listings use the `journeys` tool.
- The MCP server forwards the toolset text unchanged.
- Journey listings print no references (`helpers.ts:3245-3264`).
- The `type` copy fits the 25-word and 100-character bounds.
- The retry predicate equals the assertion.

VERDICT: FAIL 1, 4, 9, 11; outside the claims: F1, F2
