# falsify:objective

1. **BROKEN.** Three inputs exceed the bound or cut a row.
   - **Crash notice on a journey result.** A browser crash calls `#detach`, which queues a notice for the holder (`BrowserMCPServer.ts:791-800`). If the first call after the crash is `journeys`, `save` or `edit` with a listing of about 4,000 characters, `#perform` prepends the notice to that result (`:595-597`, `:600-609`). `#execute` returns the text without a bound (`:343-344`). Journey tools never drain the toolset's `notes` hook, because they take the no-handler path at `BrowserToolset.ts:364-379`.
   - **Catalog.** `acquire` and `tools` return `JSON.stringify` of 14 definitions with no bound (`BrowserMCPServer.ts:381-385`, `:421-425`). Counting the copy at `constants.ts:528-825` gives about 5,000 characters; `edit` alone is about 1,150. Probe: `JSON.stringify(toolset.tools.definitions()).length` on a journeys toolset.
   - **Redaction after the bound.** `read()` re-redacts the finished window with no clause (`BrowserToolset.ts:755-775`), and so do journey results (`:374-376`). A registered secret shorter than `[redacted]` that occurs in the window's line numbers or footer makes the result longer than the bound. For example, CVV `100` with line 100 in the window. On the tool path, `#execute` (`:669`) then cuts the footer.
   - **Fix:**
     - Have journey results drain host notes inside their budget.
     - Bound the text block at `BrowserMCPServer.ts:344` as a backstop.
     - Take `acquire` and `tools` out of the claim and the guide.
     - Redact rows only before numbering (`helpers.ts:505-509`). Drop the re-redaction of rendered windows at `BrowserToolset.ts:755`, `:659-669` and `:374-376`.

2. **BROKEN.** With CVV `100` typed with `secret: true`, a page of 101 or more lines prints `[redacted]: …` at line 100 and `call read with from [redacted] for more`. The redaction at `BrowserToolset.ts:755` and `:659` runs after `renderBrowserWindow` has numbered the rows. Continuation is lost. Without a registered secret, the footers are exact (`helpers.ts:814-842`; `toolset.test.ts:545-570`). **Fix:** as in claim 1, redact only before numbering.

3. **BROKEN.** The interleaving:
   1. `read{from:1}` stores projection A (footer `from 47`).
   2. The page shrinks to 40 lines.
   3. `read{from:47}` captures B, stores it at `BrowserToolset.ts:750`, then throws "Line 47 is past the end".
   4. `read{from:20}` finds the stored projection equal to B and prints no change note, although the model has only seen A's numbering.

   The same happens when a dialog interrupt or a `BROWSER_TOOLSET_LIMIT` error follows the capture, and in `#window` (`:1900`). **Fix:** store the projection only after the render returns (move `:750` after `:755`, and `:1900` after `:1925`).

4. **BROKEN.** `renderBrowserSpans` marks the role word (`helpers.ts:555`) and state values such as `true` (`:589`) as `text`. So `search:"button"` matches every button row on a page with no "button" in its text. Through the prefix rule, `text` and `check` match every `textbox` and `checkbox` row. Guide line 3119 says generated syntax is excluded. **Fix:** make role and state spans `syntax`.
   - Held: the window opens at `first-1` and never before `from` (`:796`).
   - Held: a miss opens at `from`.
   - Held: the match list caps at 50 with a "more" count (`:798`).
   - Held: only the best score counts (`:690-693`).

5. **CONFIRMED.**
   - Attacks refused with `BROWSER_TOOLSET_ARGUMENT` (`helpers.ts:704-721`, `BrowserToolset.ts:788-796`): `from` of 1.5, `"5"`, 0, `MAX_SAFE_INTEGER+1`, `{2,1}`, and 99999.
   - `to` past the end clamps (`:825`).
   - An empty page prints `[empty page; the whole page]` with no row (`:749`, `:836`).
   - `read` and `journeys` both require `from` (`constants.ts:550`, `:706`).
   - Mutation: deleting the `total` check (`helpers.ts:716`) fails `toolset.test.ts:415`.

6. **CONFIRMED.**
   - `parseBrowserReference` requires `e` (`parsers.ts:711`).
   - The refused inputs are `12`, `"12"`, `"12: e4"` and `"[12]"`.
   - The check covers `#element` (`BrowserToolset.ts:1276`), the journey `#target` (`BrowserJourneyToolset.ts:623`) and both managers' `element()` (`BrowserElementManager.ts:298`, `BrowserDOMElementManager.ts:150`).

7. **BROKEN.**
   - **Whitespace secrets.** `renderBrowserSpans` collapses whitespace in the value before redacting (`helpers.ts:574-582`), and so does `renderBrowserOutline` for names (`:406`, `:507`).
     - A secret `" hunter2 "` typed into a text input appears as `value="hunter2"`.
     - A multi-line secret in a textarea appears with its line breaks turned into spaces.
     - No redaction form matches either (`:1010-1019`).
     - 0.0.26's `renderBrowserOutlineRow` JSON-quoted the raw value, so this is a regression.
   - **MCP crash notice.** The notice prints the lost page's URL unredacted (`server/helpers.ts:126`, `BrowserMCPServer.ts:793`, `:605`). The new lease's toolset no longer holds the old secrets, so a secret submitted through a GET form returns after a crash.
   - **Fix:**
     - Redact the raw `node.value` and `node.name` before normalizing, and also redact `normalizeBrowserName(secret)`.
     - Redact the departure URL with the lost toolset's secrets.

8. **BROKEN (scope).** The page placement holds:
   - The observer arms in the capture-phase submit listener (`compilers.ts:165-173`).
   - The read leaves the observer in place (`:221-244`).
   - Hidden, `aria-hidden`, `inert` and attribute-only mutations do not change `state.read()` (`:157-158`).
   - Every exit releases the observer (`BrowserToolset.ts:1447-1450`, `:845-854`).
   - Actions serialize through `#acquire`, so a second action cannot submit during a settle.

   The DOM placement installs no observation, because it only runs when `#page` exists (`:897-909`). So `#settle` never waits (`:1401-1405`). Input: `createDocumentToolset`, a form whose handler calls `preventDefault` and renders "Order confirmed" after 200 ms, then `type` with `submit`. The receipt carries no status and no confirmation. Guide line 3131 states the settle without naming a placement. **Fix:** scope guide line 3131 and the claim to the page placement, as guide line 2108 already does.

9. **BROKEN.** `wait` matches `document.body.innerText`, but `#window` searches each rendered line for the raw text (`BrowserToolset.ts:1901-1905`).
   - Input: `<p>Order <b>A12</b> placed</p>` and `wait("Order A12 placed")`. CDP makes one line per text node, so no line matches and the window opens at line 1.
   - The same happens with a quote inside a name, which is JSON-escaped, or text split across a wrap.
   - **Fix:** match against the whitespace-normalized, concatenated text spans of consecutive lines. Failing that, state in the claim and the guide: "else line 1".
   - Held: a timeout opens at line 1, and `navigate` and `switch` capture the destination (`:1062`, `:1198-1202`).

10. **BROKEN.** The first sub-point fails through the crash-notice path in claim 1. `journeys` continues by line (`BrowserJourneyToolset.ts:395-402`), and `save` and `edit` footers name `journeys` (`:356`). The 0.0.26 file sub-point is **UNRESOLVED**: no test loads a 0.0.26 journey. Probe: replay a `journey.json` written by browser 0.0.26 through 0.0.27's `FileBrowserJourneyStore`.

11. **BROKEN.** "Every text block is bounded" fails through the crash notice and the catalog (claim 1). `look`, `plain` and `tabs` are refused (`browse.test.ts:123-126`). The advertised list is pinned to `BROWSE_VOCABULARY` (`main.test.ts:162`).

12. **BROKEN.**
   - CDP makes every StaticText node its own line, and prints it unless it equals its immediate parent's name (`helpers.ts:479-491`). The DOM placement joins the text of a block and mutes text inside a link (`BrowserDOMElementManager.ts:246-257`, `:319-324`).
   - For `<a href="/p3"><span>Cedar</span> Tea Tray</a>`, CDP prints the link row plus lines `Cedar` and `Tea Tray`. The DOM placement prints only the link row.
   - For `<li><b>Free</b> shipping</li>`, CDP prints two lines and the DOM placement prints one.
   - Guide line 3125 states other differences, not these.
   - Probe: compare `outline().lines.map(renderBrowserLine)` for both placements on these two fragments.
   - **Fix:** in `renderBrowserOutline`, join consecutive StaticText under one block or owner, and omit text inside a named referenced owner. Otherwise state the difference in the guide.

13. **BROKEN.** Stale names remain (subjective lane is primary):
   - `helpers.ts:973` names `BROWSER_TOOL_VIEW_FOOTER`.
   - Test docs name a `look` call: `tests/setupServer.ts:2301`, `:2305`, `:2543`, `:2558`, `:2561`; `tests/setup.ts:1943`, `:1953`; `tests/setupService.ts:678`.
   - `server/helpers.ts:126` names "the retained reading".

14. **BROKEN.**
   - **Settle wait removed:** caught by the `delayed` case (`toolset.test.ts:572-604`, `setupService.ts:742`).
   - **Journey bound removed:** caught by `journey.test.ts:190` when the `#view` prefix bound goes (`BrowserJourneyToolset.ts:662-666`). The outer bound at `:181` is redundant, so no test catches removing it.
   - **Footer off by one:** caught by `reading.test.ts:84-85` and `toolset.test.ts:566`.
   - **Reference token scored:** caught by `reading.test.ts:46`. The `'e4'` case at `guides.test.ts:202` can never fail, because a two-character word is never a search word.
   - **Secret redaction dropped from a window:** survives. Deleting the outline layer (`helpers.ts:507`) passes `toolset.test.ts:360`, because `BrowserToolset.ts:755` re-redacts the raw secret. Deleting the toolset layer passes too, because the outline still redacts. **Fix:** add a `renderBrowserOutline` unit case with secrets that a hard wrap splits, and a case with a whitespace secret.

15. **BROKEN.** These sentences are objectively false (subjective lane is primary):
   - Guide line 377 says `compileSubmitReadExpression` removes the observer. The code does not (`compilers.ts:221-244`), and guide line 2113 says it stays.
   - Guide line 3131 has no placement scope (claim 8).
   - Guide line 3123 says secrets are redacted before wrapping, which whitespace secrets defeat (claim 7).

   The rest of the claim goes to the subjective lane.

16. **UNRESOLVED.** This is a subjective judgment against `campaign.md`; I refer it to the subjective lane.

17. **UNRESOLVED.**
   - `Agent.ts:559-563` passes strings unchanged, keeps `JSON.stringify` for other values, and passes errors unchanged.
   - `Agent.test.ts:375-405` uses multiline, quotes, backslashes, CRLF, Unicode and empty input.
   - Mutation: restoring `JSON.stringify` for strings fails `:389` and `:405`.
   - The fleet census rests on the analyst's report. Probe: grep every sibling `src` and `tests` for decoding of `role:'tool'` content, then run ollama `tests/service/page.test.ts`, `tools.test.ts` and supervisor's parser.

18. **UNRESOLVED.** With no shell, I cannot read `58c08d8`. These hold today:
   - Page tasks get no journey tools (`setupStore.ts:1008-1018`, `setupStore.test.ts:263-270`).
   - Checkout requires exactly one order (`:1505-1512`).
   - The journey case requires one saved submission and the removed cart click (`:1863-1884`).
   - The retry predicate is the assertion (`browser.test.ts:42-64`).

   Probe: `git -C C:/Users/mikes/WebstormProjects/ollama show 58c08d8:tests/setupStore.ts`, then compare every predicate body. Check first the journey call allowance `(1+followups)*limit` (`:1901-1904`). The report names this change but gives no plan reason; if the old journey oracle capped calls at `STORE_BOUNDS.limit`, the change raises a limit.

19. **BROKEN.** The harness narrows the claim in two ways (`findContinuedRead`, `setupStore.ts:1424-1452`).
   - **Non-empty search.** `:1444` refuses `read{from:64, search:"policy token"}`, which misses, so the window stays at line 64 and contains the token. The first-row check (`:1441`) already refuses any search hit that moves the window. The plan records that the 2B fills `search` on every call, and the report's first-reply reading shows it. So this refusal goes beyond the claim and can fail valid M2 and M3 attempts. **Fix:** refuse only a result whose header reports a match (`/^\d+ lines? match/m`).
   - **Immediately preceding read.** `prior` must be the call directly before (`:1430-1433`, `:1449`). So `read1→read35→read{from:1,search:…}→read64` is refused on an unchanged page, although an earlier footer named 64. **Fix:** keep the footer lines of successful reads under the same page header until an action or a change note.
   - The seed footer, guessed lines, shifted windows, changed pages and failed calls are correctly refused.

20. **CONFIRMED.**
   - Attack on the port: rows print same-origin paths (`helpers.ts:568-570`). Only the header carries the port, and every instrument port and every OS ephemeral range has 5 digits, so the header length is fixed.
   - The placement is pinned at `setupStore.test.ts:277-310` and captured in `reading-positions.json`: lines 1–46, 52, 1–34, 35–63, 80.
   - Mutation: rewording the token section with "Policy" fails `:366-373`.

21. **BROKEN.**
   - The paging `productive` rule tests `/\d+ lines match /` (`tmp/probes/store-helpers.ts:107`), which misses the singular. `read{from:1, search:"quoting version"}` returns "1 line matches" and a window holding the token, but is counted unproductive. M1's stop rule reads this field. **Fix:** use `/^\d+ lines? match/m`.
   - Held: `store-series` judges with `STORE_PREDICATES` (`:67`), keeps `COUNT` as the only count, fixes port and task order, and records reload apart from elapsed.

**Findings outside the claims**

- **F1.** `read()` drains notes into the passage before `renderBrowserPassage` can throw (`BrowserToolset.ts:770`), and `#window` does the same (`:1915`). A move note ("The view moved to a new tab") is lost when the next `read{from:N}` is refused past the end, and the model never sees it. **Fix:** drain after a successful render, or put the notes back on failure.
- **F2.** Guide line 302 says DOM `submit` throws `BROWSER_DOCUMENT_SUBMIT` when the submit event was prevented. `BrowserDOMElement.ts:167-179` sets `submitted` for any dispatched submit event, prevented or not. **Fix:** say "when no submit event fires or a field is invalid".
- **ADVISORY:**
  - The four unchanged settle cases each wait out the bound of about 4 s (`toolset.test.ts:572`, `setupService.ts:746-761`).
  - `state.read()` scans the whole document with `getComputedStyle` on every mutation batch (`compilers.ts:157-164`).
  - `renderBrowserOutline` makes quadratic membership scans (`helpers.ts:410`, `:433`, `:497-500`).
  - `read` keeps the 1 s `BROWSER_TOOL_CAPTURE_MS` capture budget (`BrowserToolset.ts:713`). Probe: time `outline()` on a page of 5,000 nodes.
  - The instrument ports 49171–49193 fall in the Windows dynamic port range.
  - `store-first` adds a journeys arm that M1's "of 8" rule does not plan for, and rows carry no arm field.

**Attacked and held**

- A soft or hard wrap never splits a reference. A reference always sits between whitespace and row start, and a hard split needs 800 units with no whitespace (`helpers.ts:621-631`).
- The worst header is about 2,700 characters (JSON-escaped title and search of 720 each, URL 160, tabs 430, note 200, matches 300), plus an 806-character row and the footer, which fits in 4,000.
- The `#window` minimum render keeps the first row inside the receipt's room.
- `#unobserve` sends the release without the signal on abort or dialog.
- Typing before a submission cannot arm the change observation. A delayed render that typing triggers and that lands after the submit, such as a debounced suggestion list, does count; that is a limit, not a contradiction.
- An empty page accepts `from` greater than 1, as the claim's "non-empty" allows.
- The prefix rule counts UTF-16 units, as guide line 3119 says.
- `findUnlistedReferences` misses references inside table rows (`setupStore.ts:1128`), but the store fixtures have no tables.
- The MCP list advertises `dialog` statically, a design pinned by `BROWSE_VOCABULARY`.

VERDICT: FAIL 1 2 3 4 7 8 9 10 11 12 13 14 15 19 21; outside the claims: F1 F2
