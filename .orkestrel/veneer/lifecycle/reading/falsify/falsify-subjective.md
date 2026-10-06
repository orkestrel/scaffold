# falsify:subjective

1. **Claim 1: UNRESOLVED.** Reading the code, every path I followed stays within the bound:
   - header metadata is capped at `helpers.ts:769-790`;
   - `#window` reserves room at `BrowserToolset.ts:1917-1925`;
   - every journey result passes through `boundBrowserText` at `BrowserJourneyToolset.ts:181-186`.

   A run must settle it. Probe: a property test over `renderBrowserPassage`/`#window` with a 5,000-unit title, a 10,000-unit token with no whitespace, surrogate pairs, 400 tabs and 500 matches, asserting `length <= 4000` and that every printed `N:` row is whole.
2. **Claim 2: UNRESOLVED.** Continuation is exact by construction: the footer's next line is `end + 1` (`helpers.ts:756`, `835`), wrapping happens before numbering (`helpers.ts:505-508`), and a `↳` fragment is a separate syntax span (`helpers.ts:633`). "Both placements" still needs a run. Probe: follow footers from 1 to the end on one page in `tests/service/toolset.test.ts` and `document.test.ts`, then compare the joined rows with `outline.lines`.
3. **Claim 3: UNRESOLVED.** The change flag is derived from projection equality (`BrowserToolset.ts:749-769`). Receipts update the projection (`:1900`), so a read after an action carries no false change note. Whether references stay identical, and whether every printed reference acts on its element, needs a live run.
4. **Claim 4: CONFIRMED.**
   - Scoring reads only text spans (`helpers.ts:673-676`).
   - Prefix needs `min(length) >= 4` (`:685`); only the best score is kept (`:690-693`); the window opens at `max(from, first - 1)` (`:796`); a miss opens at `from` (`:791-794`); the list caps at 50 with "… and K more" (`:798`).
   - Attacks that failed: search `e12345 value` (reference and syntax only) returns `[]` (`reading.test.ts:46`); `ced` and `hipping` return `[]` (`reading.test.ts:49`, `guides.test.ts:272`); a match on line `from` cannot open earlier.
   - Noted: the "4" counts UTF-16 units, which the guide states.
5. **Claim 5: CONFIRMED.**
   - Attacks: `from` 1.5 and `"1"` are refused (`BrowserToolset.ts:788-796`); `to < from` and `from > total` on a non-empty page are refused (`helpers.ts:714-720`); `to` = 10^9 clamps (`helpers.ts:825`).
   - `from` 5 on an empty page prints `[empty page; the whole page]` with no line 0 (`helpers.ts:749`).
   - Both schemas require `from` (`constants.ts:550`, `:706`).
6. **Claim 6: CONFIRMED.** Every site that accepts a reference goes through `parseBrowserReference` (`BrowserToolset.ts:1276`, `BrowserJourneyToolset.ts:623`, `BrowserElementManager.ts:298`, `:449`, `BrowserDOMElementManager.ts:150`, `:206`). Its regex requires a leading `e` (`parsers.ts:711`). Attacks with `"12"`, `12`, `"[12]"`, `"ref=12"` and `"12: e4"` all fail.
7. **Claim 7: BROKEN.**
   - **Failing input:** `type {ref, text: "Tide  4821" (two spaces), secret: true}` into a non-password textbox, then `read {from: 1}`.
   - **Why it leaks:** the value span is rendered through `normalizeBrowserName`, which collapses whitespace (`helpers.ts:579`). Redaction then searches each span and the whole result for the raw secret (`helpers.ts:507`, `BrowserToolset.ts:695`), which no longer matches. The window prints `value="Tide 4821"`. The same happens to a leading or trailing space, and to a newline typed into a textarea.
   - **Fix:** in `redactBrowserText` (`helpers.ts:1011`), redact `normalizeBrowserName(secret)` as well as the raw and JSON-escaped forms. Add a whitespace-secret case to the redaction test.
8. **Claim 8: UNRESOLVED.** Only the writer's report covers the settle lifecycle. Probe: `npx vitest run --config vite.config.ts --project service tests/service/toolset.test.ts -t "settle"`, then a mutation run with the change-observer await removed. Observer release on the dialog and abort exits needs `getActiveResourcesInfo` counts read after each exit.
9. **Claim 9: UNRESOLVED.**
   - `#window` opens at line 1, or at the first line whose rendered text contains the `wait` text (`BrowserToolset.ts:1901-1905`).
   - A capture failure returns a note instead of a window (`:1894-1899`), so "every receipt carries a window" holds only as the guide qualifies it.
   - `navigate` and `switch` destination windows need a run.
10. **Claim 10: UNRESOLVED.** `journeys` has no run selector and uses line coordinates (`BrowserJourneyToolset.ts:359-403`). The journey bound proof holds (claim 14). Settling it needs a journey saved under 0.0.26 (format 1) loaded and replayed by 0.0.27. Probe: copy a 0.0.26 `journey.json` fixture into a file store and run `replay`.
11. **Claim 11: BROKEN.**
    - **Failing state:** on a WebMCP-capable browser, the page registers a tool named `look`. Before 0.0.27 that name was reserved. The reserved check now covers only `BROWSER_TOOL_NAMES` and the journey names (`BrowserToolset.ts:2087-2093`), so the toolset adopts `look` and the browse server mirrors it (`BrowserMCPServer.ts:93`, `:1165`). `tools/call look` then runs page code instead of being refused.
    - **Fix:** recommended path, narrow the claim and `guides/browser.md:3086` to "refuses them as unknown tools unless an adopted page tool takes the name", and add a case in `tests/service/browse.test.ts` with a page tool named `look`. The alternative is a list of retired names that page tools may not take.
12. **Claim 12: UNRESOLVED.** No capture compares the two placements for headings, links, lists, tables, images and controls. Probe: `tests/service/document.test.ts` asserting `renderBrowserLine` equality between `page.elements.outline()` and the DOM view on one fixture, with the guide's stated differences (`guides/browser.md:3125`) allowed for.
13. **Claim 13: BROKEN.** Removed names survive outside refusals and history:
    - **Source:** `src/core/helpers.ts:973` names `BROWSER_TOOL_VIEW_FOOTER`.
    - **README:** `README.md:57-59` calls `look`, `read` without `from` (now refused), and `plain`. A consumer copying this published fence gets three refusals.
    - **Test helpers:** `tests/setup.ts:1943`, `:1953` ("`look` or `read` result"), `:1956-1958` (an "offset" the footer names), `:2692` ("the `tabs` tool"); `tests/setupServer.ts:2301`, `:2305`, `:2328`, `:2543`, `:2558`, `:2561` ("first `look`"); `tests/setupService.ts:678`.
    - **Test titles and strings:** `tests/service/toolset.test.ts:743` and `:833`; `tests/src/server/BrowserMCPServer.test.ts:2442` ("look accepted…"); `tests/src/browser/factories.test.ts:117` (variable `look`).
    - **Fix:** rewrite the README fence as `read {from: 1, search: …}` calls. Delete the removed-constant clause from the `boundBrowserText` remark. Rename each test sentence, title and variable to `read` and to lines.
14. **Claim 14: UNRESOLVED.** Three of the five mutations are caught; two have no located test.
    - **Search scores a reference token:** `tests/src/core/reading.test.ts:46` catches it. `e12345` is a 6-character word, so the mutation returns `[1]`.
    - **Footer `from` off by one:** `tests/guides.test.ts:205-206` compares the exact footer string.
    - **Journey bound removed:** `tests/service/journey.test.ts:156-157` catches it either way. Removing the window turns the footer into `[characters…]` and fails the `call journeys with from` match; removing both bounds fails the length check.
    - **Settle wait removed and window redaction dropped:** no test located. Probe: the two mutation runs named in claims 8 and 7, against `tests/service/toolset.test.ts`.
15. **Claim 15: BROKEN.**
    - **Recorded-exchange claim:** `guides/browser.md:3760` says "the exchange that follows drove the command … over stdio directly". `:3762` calls the same fence an illustration and cites "the earlier recorded exchange", which no longer exists in the guide. `README.md:76` also promises "a recorded exchange". The fence was not executed: the writer's report, row "MCP example", says so. `:3780` also shows `save` as its status line alone, but `save` returns the numbered listing.
      - Fix: record a real exchange from the packed binary (`tests/distribution.test.ts` already drives it), or reword `:3760` and `:3762` as an unexecuted illustration and drop the dangling reference.
    - **"Near the matching text":** `guides/browser.md:3129` says a successful wait opens "near the matching text". The code opens at the first line whose rendered text contains it, or at line 1 when no single line does, for example text split across two accessibility rows (`BrowserToolset.ts:1901-1905`). That replaces an exact behaviour with an unfalsifiable word.
      - Fix: state that rule.
    - **Universal refusal:** `guides/browser.md:3086` is false (see claim 11).
    - **Store proof sentence:** `guides/browser.md:3675` says "never from the model's answer: the store proof checks … the read fact against the page state". The store proof does read the answer (`ollama/tests/setupStore.ts:1483`, and the search and checkout predicates). The fact is checked against a model read, not page state.
      - Fix: state what the predicates check.
16. **Claim 16: BROKEN.** The tools are distinct and each completes its flow, but one copy clause is false.
    - **The defect:** the `read` `search` copy says "the reply starts at the first matching line at or after from" (`constants.ts:546-547`). The window opens one line earlier (`helpers.ts:796`; capture `reading-examples.json`, "search": match 120, window starts at 119). That copy is what the plan prescribed, so this needs a plan amendment as well.
    - **Fix:** "Words to find; the reply opens one line before the first match at or after from." (under 100 characters).
17. **Claim 17: UNRESOLVED.**
    - The code holds: a string value is passed unchanged, a non-string is `JSON.stringify`'d, and the error passes through (`agent/src/core/Agent.ts:559-563`).
    - Mutations: always stringifying, or adding `.trim()`, should fail the exact-equality cases. I did not read those cases, so whether they distinguish the mutation is open.
    - The fleet census rests only on the report. Probe: grep every sibling checkout (excluding `node_modules`, `dist`, `tmp`) for `JSON.parse` applied to tool-message `content`.
18. **Claim 18: UNRESOLVED.** I cannot diff `58c08d8..e8f29f1` without a shell. Probe: `git -C ollama diff 58c08d8..e8f29f1 -- tests/setupStore.ts`, mapping each removed predicate condition to the report's table.
19. **Claim 19: BROKEN.** The non-empty-`search` refusal narrows the claim.
    - **Failing transcript:** model `read {from: 1}` → footer `call read with from 35` → model `read {from: 35, search: "policy token"}`. No line from 35 on matches, so the window starts at 35 and carries the token. The claim's pass condition holds, but `setupStore.ts:1444` refuses it.
    - **Why it matters:** the 2B's measured first reply has exactly this shape: `read({ from: 47, search: "shipping cutoff time" })` (ollama `tmp/codex/reading-harness-report.md:70`). The plan kept search with a range because "the 2B fills `search` on every call".
    - **Ruling:** the refusal does not belong to the claim. The `Number(first) === from` check at `:1441` already refuses any window that search moved. A search that leaves the window at `from` produces the same rows, so the refusal adds no strength.
    - **Fix:** delete the condition at `setupStore.ts:1444` and its refusal control in `setupStore.test.ts`.
    - Separately, "earlier" is implemented as "immediately preceding" (`:1430-1432`). This is defensible under the plan's "a stale footer never passes".
20. **Claim 20: UNRESOLVED.** Line numbers are port-independent, because same-origin links print paths only (`helpers.ts:568-570`). Window ends are not: the header carries the URL with its port (`helpers.ts:769`), and the window ends at the last whole row that fits in 4,000 units. A 4-digit port can admit row 35 or row 64 if the slack is within 1–4 units. Probe: render the seed and the next window at ports 1024, 9999, 49171 and 65535, then compare the last rows and footers.
21. **Claim 21: UNRESOLVED.**
    - Ports and order are fixed, `COUNT` is the single count, and `pass` is the shared predicate (`store-series.test.ts:67`).
    - Reload is recorded apart from elapsed time (`:38`, `:84`), and `wall >= elapsed` is asserted (`:76`).
    - `store-first` adds a journeys arm that plan M1 (5 tasks × 8 ports) does not name: the full matrix is 80 draws (`store-first.test.ts:12`, `:26-28`). Referred to the Orchestrator for a ruling.

**Findings outside the claims**

- **F1: false `boundBrowserText` doc.** At `src/core/helpers.ts:968-971` and `:986`, the remark says a longer string "keeps its first `limit` UTF-16 code units … followed by" the footer. The `@example` claims `'abcd\n[characters 0–4 of 6; the rest was cut]'`. The function returns `'abc…'`, as `tests/src/core/helpers.test.ts:501` asserts, and keeps the whole result within `limit`.
  - Fix: rewrite the remark as "the cut text plus footer fits `limit`; a footer that cannot fit abbreviates instead". Correct the example's comment.
- **F2: duplicated search header in `journeys`.** `src/core/BrowserJourneyToolset.ts:378-394` re-implements the search header. It hard-codes `50` and `120` instead of `BROWSER_READ_MATCHES`, prints "1 lines match" (documented at `guides/browser.md:3475`), and lacks the "No line from N on" miss.
  - Fix: extract one helper in `helpers.ts` that returns the opening line and the match line, used by both `renderBrowserPassage` and `#journeys`.
- **F3: "page" wording on journey listings.** `renderBrowserFooter` (`helpers.ts:749-756`) prints "the whole page" and "end of page" when `tool` is `journeys` (`guides/browser.md:3439`, `:3480`, `:3787`).
  - Fix: let the end clause say "listing" when `tool` is `journeys`.
- **F4: `journeys` copy diverges from `read`.** At `constants.ts:689-705` the same parameter names carry different, weaker copy: `from` "The first line to show." gives no "1 for the top", `to` is "Last line.", and the description does not mention numbered lines or a footer. The journey prompt says only "call journeys" (ollama `setupStore.ts:152`), so a 2B has no value for the required `from`.
  - Fix: reuse `read`'s `from` and `to` copy, add "as numbered lines" to the description, and re-derive the 3,400 bound by the measured-total rule.

**Cost findings (ADVISORY)**

- **A1: label rows repeat the control's name.** Each labelled control prints its label as a separate text row (`reading-examples.json` "first", lines 6–9: `Account` / `e118 textbox "Account"`). That spends a line and room per control in a 2B window.
- **A2: `search` can be read as the site's search.** The `read` parameter named `search` overlaps the site-search intent ("Search for kettle…"); only the prompt separates them. M2 decides.
- **A3: COUNT prefixes are task-skewed.** Any `COUNT` below the full matrix selects a task-skewed prefix (`store-first.test.ts:26-28`, `store-series.test.ts:34-36`). Interleave tasks with ports.
- **A4: mixed import specifiers.** 12 test files import `renderBrowserLine` by a relative `src` path beside `@src/core`, for example `tests/src/core/helpers.test.ts:1-2`.
- **A5: stale token measurement.** `guides/browser.md:3207` quotes 2026-10-01 token measurements of the 11-tool vocabulary as the journey cost.
- **A6: stale ollama fixtures.** Ollama test fixtures still model the old vocabulary: `setupStore.test.ts:793`, `:801` (`look`), `:815` (Markdown read result), and `setupStore.ts:1420` (the "`line` argument").

**Attacked and held**

- An abbreviated title cannot leak a cut secret prefix, because title, address and focus are redacted before abbreviation (`helpers.ts:512-517`).
- The small-model fence's 6-tool comment is true without `context` and without an open dialog (`guides.test.ts:544-551`). `limit: 8` means agent turns (`agent/src/core/types.ts:1100-1101`).
- `BrowserToolsetInterface.tabs()` is a host method used by `follow`, not an alias of the removed tool (`guides/browser.md:2121`).
- `BrowserReadingInterface.markdown` with `offset` (`README.md:43`, `guides/browser.md:2015-2051`) is the frame capture API, not the tool vocabulary. If claim 13 is meant literally, that is for the Orchestrator to rule.
- The token section shares no prefix-rule word with the paging prompt (`setupStore.ts:560-561` against "Find the policy token on the shipping policy page").
- The `journeys` search window uses `max(from, first - 1)` and never crosses `from`.

VERDICT: FAIL 7, 11, 13, 15, 16, 19; outside the claims: F1, F2, F3, F4
