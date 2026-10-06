# Reading surface of `@orkestrel/browser` 0.0.26 (`0379087`)

Grok 4.7 High distillate from 2026-10-06 (journal scaffold `tmp/cursor/reading-absorb.jsonl`, session `e78524be-5fed-487d-88b6-090fa7b5a85b`, 450 s).

Checked out at `C:/Users/mikes/WebstormProjects/browser`, `package.json:3`, commit `0379087` (`Release 0.0.26`).

## 1. The three projections

`look`, `read`, and `plain` are three tools over one view. `look` renders an accessibility outline. `read` and `plain` share one HTML capture and project it two ways. The toolset wires them at `src/core/BrowserToolset.ts:280-289`: `look` calls `#look`; `read` calls `#read` with `reading.markdown()`; `plain` calls `#read` with `reading.text()`.

**`look`.** Each call asks the current view for a fresh outline with `limit: Number.MAX_SAFE_INTEGER` and the call's `search` (`BrowserToolset.ts:717-723`). The manager enables accessibility and reads `Accessibility.getFullAXTree` on the page session and on each out-of-process iframe session (`src/core/elements/BrowserElementManager.ts:312-363`). `renderBrowserOutline` (`src/core/helpers.ts:409-459`) builds the text:

- first line `page "TITLE" URL` (`helpers.ts:416`);
- a heading row is `# NAME` with no level and no reference (`helpers.ts:432-434`);
- `StaticText` is the name when it is non-empty and differs from the parent name (`helpers.ts:436-440`);
- an interactive row is `REF ROLE "NAME"` plus `value`, `pressed`, `expanded`, `selected`, `[checked]`, `[disabled]`, and `[tool=NAME]` (`helpers.ts:186-200`);
- last line `(COUNT of TOTAL elements)` (`helpers.ts:449`).

References are minted only for nodes that are not ignored and whose role is in `BROWSER_INTERACTIVE_ROLES`, or that back a page tool (`BrowserElementManager.ts:384-412`, `src/core/constants.ts:335-362`). The prefix is `e` (`constants.ts:319`). Headings and `StaticText` get no reference (`constants.ts:395-398`). The outline has no table grid, no link address, and no separate image alt: a link or image appears only as an accessibility row. Roles `none`, `generic`, `InlineTextBox`, `RootWebArea`, and `WebArea` are omitted (`constants.ts:391-393`).

**`read` and `plain`.** Both call `view.read()` (`BrowserToolset.ts:770`). `BrowserFrame.read` samples the navigation epoch, then evaluates `compileReadFunction()` inside `compileGuardedEvaluateExpression` under `BROWSER_RESULT_LIMIT` (`2_500_000`) in the frame's isolated world (`src/core/BrowserFrame.ts:94-136`, `src/core/compilers.ts:417-434`, `constants.ts:117`). The in-page function imports the root into a document without a window, prunes against live layout, writes each anchor's live `href`, and lowers fields, selects, buttons, and named graphics into inert text (`compilers.ts:434-753`, `src/core/types.ts:2320-2350`). Password and hidden inputs are removed (`compilers.ts:518`, `types.ts:2341-2342`). The result is a `BrowserReading` (`BrowserFrame.ts:129-136`, `src/core/factories.ts:85-86`).

`markdown()` and `text()` default `distill` to `false`, so they project the whole capture (`src/core/BrowserReading.ts:64-81`, `types.ts:2260-2261`). Each mode is cached on the reading (`BrowserReading.ts:35-37`). The undistilled source runs `resolveAttributes(node, url)` (`BrowserReading.ts:84-90`). `distill: true` uses `html.distill({ base: url })` (`BrowserReading.ts:91`). `read` then calls `renderMarkdown(htmlToMarkdown(...))` (`BrowserReading.ts:68`). `plain` calls `renderText(...)` (`BrowserReading.ts:78`). The tools pass no options, so both are undistilled (`BrowserToolset.ts:283`, `:288`).

The advertised split is in the copy and the guide. `read`: "Reads the page as Markdown, with headings, tables, and link addresses." (`constants.ts:566-567`). `plain`: "Reads the page as plain text, without Markdown, link addresses, or image text." (`constants.ts:586-587`). The guide says `read` returns Markdown with headings, tables, link addresses, and image alternatives, and `plain` returns plain text without Markdown, link addresses, or image text (`guides/browser.md:3006`). The capture contract says named graphics carry one explicit alternative (`types.ts:2335-2336`). Neither projection carries `e` references.

**Sizes on a measured page.** These figures are from 2026-10-03, not a remeasurement of `0379087`. On the Bootstrap showcase at 1400×1000 with 15,388 elements and no iframes (`reading-design/reading-feasibility.md:180-181`):

- CDP complete outline: 75,924 characters (`reading-feasibility.md:193`);
- undistilled Markdown: 90,033 characters, 23 slices of 4,000 (`reading-feasibility.md:208`);
- undistilled text: 73,691 characters, 19 slices (`reading-feasibility.md:210`);
- the then-current first `look` reply: 4,066 including its footer; the first `read` reply: 4,030 including its footer (`reading-feasibility.md:197-198`).

A later run of that showcase reported 73,911 text characters (`reading-review/reading-change-last.md:56`). A tool reply keeps at most `BROWSER_TOOL_LIMIT` (4,000) characters of body; the continuation footer sits after that cut (`constants.ts:403-410`, `BrowserToolset.ts:812-834`).

## 2. Slicing and continuation

`BROWSER_TOOL_LIMIT` is `4_000` UTF-16 code units before a footer (`constants.ts:403-410`). The toolset default is that constant (`BrowserToolset.ts:253`).

`boundBrowserText` returns a string that fits, and otherwise keeps `limit` units, one fewer when the cut would split a surrogate, then appends `\n[characters 0–END of TOTAL; FOOTER]` (`helpers.ts:608-615`). Action and `dialog` receipts that carry a view use `BROWSER_TOOL_VIEW_FOOTER`, "the rest was cut; call look with words to find" (`constants.ts:469-472`, `BrowserToolset.ts:291-304`). Every other cut, including a `look` or `read` body that still exceeds the limit, uses `BROWSER_TOOL_CUT_FOOTER`, "the rest was cut" (`constants.ts:463-466`, `BrowserToolset.ts:280-289`).

`look`, `read`, and `plain` page inside that limit and add their own footer. `#pageSlice` returns the body and, unless the slice starts at 0 and holds the whole text, `\n\n[characters START–END of TOTAL; call NAME with offset END for more]` (`BrowserToolset.ts:814-834`). The "call … for more" clause is omitted when the slice reaches the end. `#execute` bounds the body, then appends that suffix (`BrowserToolset.ts:668-679`), so the suffix is outside the 4,000. A window that cannot hold the next character throws `BROWSER_TOOLSET_LIMIT` (`BrowserToolset.ts:821-826`).

Offsets count UTF-16 units in the projection, not in the reply. `extractBrowserSlice` ends a bounded window after the last line break past the start, or at the limit when none fits, and will not split a surrogate pair (`helpers.ts:2069-2088`).

**`look` offsets.** Every call recaptures. `start` is the requested offset when it is below `outline.text.length`, and `0` otherwise (`BrowserToolset.ts:725-728`). The match block is included only when `start === 0`, and it is outside the paged text (`BrowserToolset.ts:731-745`). The slice is taken from the room left after the move note and the block (`BrowserToolset.ts:730-745`).

**`read` and `plain` offsets.** One retained reading is kept, keyed by view, reading, and `'read' | 'plain'` (`BrowserToolset.ts:230-236`). A call recaptures when `offset === 0`, when nothing is retained, when the projection name differs, when the view differs, or when `reading.stale` is true (`BrowserToolset.ts:762-771`). Otherwise it reuses the capture. `start` is the requested offset only when that same reading is reused and the offset is below `total`; a recapture or an offset at or past the end uses `0` (`BrowserToolset.ts:774`). The match block is built only when `start === 0` (`BrowserToolset.ts:778-784`). `stale` is true when a navigation function was supplied and its current epoch differs from the epoch sampled before the capture (`BrowserReading.ts:60-62`, `BrowserFrame.ts:96-98`). A same-document navigation, a cross-document navigation, and a detachment each advance that epoch (`guides/browser.md:1897`). An edit that is not a navigation leaves the retained reading current (`guides/browser.md:3008`). The feasibility instrument added a visible marker after capture: the retained reading excluded it with `stale === false` (`reading-feasibility.md:216`).

**Footers a model is told to follow.** The three tools' own footer names the next character offset (`BrowserToolset.ts:833`). A cut action view tells the model to call `look` (`constants.ts:472`). Deadline, change, and pending notes also say "call look." (`constants.ts:433-444`, `:459-460`).

**Half-room cap.** `renderBrowserMatches` takes `Math.floor(room / 2)` (`helpers.ts:341`). The heading and rows must fit in that half, with two characters reserved per row (`helpers.ts:345`). An oversized first row is cut with `…` without splitting a surrogate (`helpers.ts:347-356`). Room is reserved for a later row only when the cut still keeps the first row through its first space (`helpers.ts:350-352`). Later rows that do not fit are skipped (`helpers.ts:348`). An empty result or a cut with nothing before the ellipsis yields no block (`helpers.ts:360`). For `look`, `read`, and `plain`, `room` is `limit` minus the move note (`BrowserToolset.ts:730`, `:776`).

**Receipt capture.** After an action, `#capture` calls `elements.outline()` with no raised limit, so the receipt view uses `BROWSER_OUTLINE_LIMIT` (`150`) referenced rows (`BrowserToolset.ts:1847-1851`, `constants.ts:322`, `BrowserElementManager.ts:80`). That view is `outline.text`. A capture that fails because the document is gone waits for readiness and reads once more; a second failure yields `BROWSER_TOOL_CHANGED_NOTE` (`BrowserToolset.ts:1856-1877`). A deadline yields `BROWSER_TOOL_DEADLINE_NOTE` (`BrowserToolset.ts:1835-1836`).

## 3. Search

All three tools take a required `search` string (`constants.ts:551-560`, `:571-579`, `:591-599`). An empty string lists nothing: `collectBrowserWords` keeps only lowercase runs of at least 3 letters or digits (`helpers.ts:281-284`, `constants.ts:332`). Words compare whole. There is no substring or prefix match (`helpers.ts:208-210`).

**`scanBrowserOutline` (`look`).** A candidate must not be ignored, must have a reference, and must not be an omitted role, `heading`, or `StaticText` (`helpers.ts:249-257`). The score is the count of distinct search words that equal a word of `role + name` (`helpers.ts:259-261`). Every node with the highest score above 0 is returned, in document order (`helpers.ts:266`). `renderBrowserOutline` turns those nodes into rows and stores them on `matches`, past the row limit (`helpers.ts:456-457`). `#look` prints them only on the first page as `COUNT elements match "SEARCH":` (`1 element matches` when one), then the rows (`BrowserToolset.ts:732-739`). It cannot match page text that is only a heading or `StaticText`, and it cannot match a link address or an image URL.

**`scanBrowserText` (`read` and `plain`).** It scores each non-empty line of the whole projection the same way and returns `{ offset, text }` using the match's UTF-16 index (`helpers.ts:300-313`). `#read` prints `[OFFSET] LINE` under `COUNT lines match "SEARCH":` (`BrowserToolset.ts:778-783`). `read` can match a Markdown heading, a table line, or a link line when those words survive `htmlToMarkdown`. `plain` can match only words that survive `renderText`. Neither scans the accessibility name of a control that the capture does not print. Neither returns lines below the top score.

**`renderBrowserMatches`.** Shared by `look`, `read`, `plain`, and `journeys` (`BrowserToolset.ts:735`, `:780`, `src/core/BrowserJourneyToolset.ts:334`). The guide states the same rules (`guides/browser.md:3000`).

The test `reading search on %s jumps beyond 4000 and pages its projection` pins, for both `read` and `plain`: a heading past character 4,000, a first-page block `[OFFSET] HEADING`, a continuation from that offset with no second block, a full reconstruction under a hold with no `action` event, and a projection switch that recaptures and restarts at 0 (`tests/src/core/BrowserToolset.test.ts:207-277`).

## 4. What depends on the three tools by name

**Journey toolset.** `record` ends with a `look` of `search: ''` (`BrowserJourneyToolset.ts:230`, `:608-616`). `replay` appends the same view after `renderBrowserRun` (`BrowserJourneyToolset.ts:484`). That `look` is the first page at the toolset limit and carries move notes (`BrowserJourneyToolset.ts:608-610`). `journeys` uses `scanBrowserText` and `renderBrowserMatches` on headings, not on page text (`BrowserJourneyToolset.ts:332-337`). The journey `#execute` returns the handler string with no `boundBrowserText` (`BrowserJourneyToolset.ts:153-163`). A `record` result is therefore the recording sentence plus a `look` body plus `look`'s footer. A later reading recorded `record` results of 4,087 and 4,086 characters against the 4,000 limit (`scaffold/.orkestrel/veneer/lifecycle/holders/status.md:362`).

**Browse MCP server.** The constructor registers one dispatcher per `BROWSER_TOOL_NAMES` and `BROWSER_JOURNEY_TOOL_NAMES` entry, copying `BROWSER_TOOL_COPY`, before Chromium starts (`src/server/BrowserMCPServer.ts:85-89`, `:219-227`). `#forward` sends the arguments to the holder's toolset manager (`BrowserMCPServer.ts:471-480`, `:535-537`). A string result is one MCP text block (`BrowserMCPServer.ts:328-336`). The hosted toolset is `createBrowserToolset` with file journey stores (`BrowserMCPServer.ts:935-943`).

**Action receipts.** `click`, `type`, `press`, `navigate`, `switch`, and `dialog` are created with `BROWSER_TOOL_VIEW_FOOTER` (`BrowserToolset.ts:291-311`). The view after the receipt line is the outline from `#capture`, not `read` or `plain` (`BrowserToolset.ts:1474-1478`, `:1830-1851`). A `click` or `type` whose role is in `BROWSER_TYPED_ROLES` names `type` or `click` in the receipt line (`BrowserToolset.ts:847-849`, `:916-919`). An untrusted view ends the line with ` (untrusted event)` (`helpers.ts:759`).

**Guide.** The tool table, receipt rows, and continuation rules are `guides/browser.md:2964-3050`. `BrowserReadingInterface` is `guides/browser.md:1887-1941`. Journeys state that `look`, `read`, `plain`, `tabs`, and the journey tools are never steps (`guides/browser.md:3104`). The small-model prompt tells the model to seed with `look` and to continue `read` from a named offset (`src/core/factories.ts:120-128`).

**Tests.** `tests/src/core/BrowserToolset.test.ts:207-277` pins `read` and `plain` search, offsets, and projection identity. `:280-298` refuses `what` on `look`, `read`, and `plain`. `:821-826` admits all three under a replay hold. `:989-1010` bounds serialized tool copy at 7,000 characters and journey copy plus `type.secret` at 3,400, from measured 6,941 and 3,356. `:1013-1048` requires every parameter description's length to be at most 100. `:1057-1071` pins the three descriptions at 25 words or fewer, including the exact `look`, `read`, and `plain` sentences.

**Constants and types that name them.**

- `BrowserToolName` includes `'look' | 'read' | 'plain'` (`src/core/types.ts:2809-2827`).
- `BROWSER_TOOL_NAMES` lists them first (`constants.ts:496-507`).
- `BROWSER_OBSERVATION_TOOL_NAMES` is `look`, `read`, `plain`, `tabs` (`constants.ts:447-451`).
- `BROWSER_JOURNEY_NON_STEP_TOOLS` spreads that list (`constants.ts:967-969`).
- `BROWSER_TOOL_COPY.look`, `.read`, and `.plain` (`constants.ts:544-602`).
- `BrowserToolsetInterface.native` names both the page-backed and view-backed sets (`types.ts:2956-2958`).
- `BrowserReadOptions`, `BrowserReadResult`, `BrowserReadMatch`, and `BrowserReadingInput` are the library reading contracts (`types.ts:2267-2358`). They do not name the three tools. `BrowserReadMatch.offset` is a character index (`types.ts:2296-2298`).

## 5. The prior reading design

The round is dated 2026-10-03. The user asked for methods before any switch on `read` (`reading-design/reading-design-brief.md:5-6`). The synthesis is `showcase/browse/reading-design.md`. The user rulings are `showcase/browse.md:41-51`.

**Options weighed.**

- Keep `read` and `markdown()` / `text()` as separate methods. All four proposals agreed they are different algorithms (`reading-design.md:72-74`, `judge-subjective.md:147`).
- Put `read`'s ignored `what` to work as a first-page match block with character offsets. Needs was the only proposal that made a match jumpable (`judge-objective.md:12-13`, `reading-proposal-needs.md:7-9`).
- Flip `distill` from `true` to `false`. Needs and Sees proposed it. Fewest kept the library default at `true` while the tool passed `false`, which the subjective judge called two defaults for one reading (`judge-subjective.md:31`).
- A `plain` boolean on `read`. The subjective judge proposed it, citing the MCP fetch server's `raw` (`judge-subjective.md:82-88`). The objective judge ruled it out: "Different value selects a different action/algorithm → split" (`judge-objective.md:103-104`). The synthesis repeats that refusal (`reading-design.md:240`).
- Separate `markdown` and `text` tools that replace `read`. Feasibility proposed that vocabulary (`reading-feasibility.md:75-79`). The synthesis rejected it because it drops `read`, the names describe a format, and `text` collides with the `text` argument (`reading-design.md:147-150`). The objective judge agreed (`judge-objective.md:86-89`).
- Rename `look` to `outline`. Sees proposed it (`reading-proposal-sees.md:14`). The synthesis rejected it: about 40 sites and a store-proof re-run, with no recorded confusion (`reading-design.md:153`).
- A `ref` on `read`. Deferred. References exist only for interactive roles (`reading-design.md:154`, `judge-objective.md:117`).
- Names for a sibling tool: `words`, `text`, `plain`, `quote`, `lines`, and others. The naming verdict recommended `words` (`plain-text-name-verdict.md:1-3`). The law namer ranked `plain` as "An adjective with no noun" (`plain-text-name-law.md:69`). The english namer rejected `lines` because it "promises numbered lines" (`plain-text-name-english.md:74`). The caller namer said `lines` "suggests line numbers, a line count, or code" (`plain-text-name-caller.md:60`).

No file in this round adopts one line-numbered tool that replaces `look`, `read`, and `plain`. Addresses in the adopted design are UTF-16 character offsets (`reading-design.md:86`, `types.ts:2265`).

**Why three tools.** The synthesis kept two agent reading tools, `look` and `read`, and left plain text as decision D2: "Defer. If you want it, add a sibling tool, never a switch." (`reading-design.md:196`). The objective judge said a separate tool is lawful and sent the choice to the user with the 18% figure (`judge-objective.md:105-106`). The user then chose the sibling, named `plain`, with the copy that shipped (`browse.md:45`). `look` kept its name (D6, `browse.md:45`).

**Judges and reviewers.**

- Objective judge: Needs is the base, but not as written. It kept `what`, its copy alone exceeded 6,050 (6,023 + 28 = 6,051), and whole-page links stayed relative (`judge-objective.md:178`).
- Subjective judge: same base; graft Sees' link resolution and region elements, Fewest's row skip, and Feasibility's measurements; keep `look` and `read`; flip `distill`; add `plain` only if the objective lane allows it (`judge-subjective.md:158`).
- Implementation review, objective, at `fcefa2a`: `plain` "projects `reading.text()` from the same `view.read()` capture" and is an observation (`reading-review/objective.md:43-47`). It failed the surrogate-pair proof and a reservation that can cut an `[OFFSET]` off a match row (`reading-review/objective.md:24-34`).
- Implementation review, subjective: names `search`, `plain`, and `purpose` "are the names the user and the Orchestrator chose" (`reading-review/subjective.md:6`). It failed the same row cut and guide rows that omitted `plain` (`reading-review/subjective.md:24-32`).
- The repair `c52714f` renamed the helpers to `scanBrowserOutline` and `scanBrowserText` and kept the leading token of a cut match row (`browse.md:14`). The current reservation is `helpers.ts:350-352`.

**Measured evidence the design used.**

- Copy baseline 6,023 characters (`reading-design.md:113`, `reading-feasibility.md:113` in the synthesis's citation). After `plain` landed, full definitions measured 6,559 and the bound became 6,600; journey definitions measured 3,090 and stayed at 3,100 (`reading-change-last.md:46-50`). On `0379087` the test records 6,941 and 3,356, bounded at 7,000 and 3,400 (`BrowserToolset.test.ts:1004-1010`).
- Showcase sizes in section 1 (`reading-feasibility.md:207-210`). The synthesis calls undistilled text "18% smaller" than undistilled Markdown (`reading-design.md:23`, `plain-text-name-verdict.md:58`).
- Header-status `read` calls returned distilled body text (`reading-design.md:31`).
- The store proof called `read` seven times without an offset (`reading-design.md:39`).

## 6. Constraints a unified line-addressed read must keep

**Element references in the action tools.** `click` and `type` require `ref` (`constants.ts:604-637`). `requireBrowserReference` rejects anything `parseBrowserReference` does not accept and tells the caller to "call look for fresh refs" (`helpers.ts:686-693`). Receipts render `REF ROLE "NAME"` (`helpers.ts:666-667`). Journey replay resolves a target by role and exact accessible name, not by the stored reference (`BrowserToolset.ts:1556-1575`). A unified text must still carry those references where an action can use them. `read` and `plain` do not carry them today (`BrowserToolset.test.ts:1094-1112`).

**Untrusted content.** `look`, `read`, and `plain` annotate `{ pure: true, untrusted: true }` (`constants.ts:562`, `:582`, `:602`). The capture is an inert document: "nothing in the copy loads or runs" (`types.ts:2320-2322`). Password and hidden inputs are absent from the capture and both projections (`types.ts:2341-2342`). Adopted page tools are advertised `untrusted` (`BrowserToolset.ts:178`, `:2016`). A click or type on a view whose `trusted` is `false` marks the receipt ` (untrusted event)` (`BrowserToolset.ts:169-170`, `helpers.ts:759`).

**Bounds.** Body limit 4,000 (`constants.ts:410`). Outline default 150 referenced rows on a receipt (`constants.ts:322`). Capture serialization limit 2,500,000 (`constants.ts:117`). Tool descriptions at most 25 words (`constants.ts:532-533`, `BrowserToolset.test.ts:1057-1061`). Serialized definitions at most 7,000, and journey definitions plus `type.secret` at most 3,400 (`BrowserToolset.test.ts:1004-1010`). The continuation footer is outside the 4,000 (`BrowserToolset.ts:668-679`). The 2026-10-06 campaign says `BROWSER_TOOL_LIMIT` is not raised (`scaffold/.orkestrel/veneer/lifecycle/reading/campaign.md:21-26`).

**The 100-character parameter-description test.** `BrowserToolset.test.ts:1046-1047` asserts `description.length <= 100` for every property of every `BROWSER_TOOL_COPY` tool. The constant's remarks state the same bound (`constants.ts:532-533`). The campaign says the bound stands (`campaign.md:26`).

**Public types a recorded consumer imports.** The campaign says the toolset is consumed by ollama's `tests/setupStore.ts`, `tests/setupStore.test.ts`, and `tests/service/browser.test.ts` (`campaign.md:63-64`). From the imports read here:

- `setupStore.ts:2-20` imports `BrowserJourney`, `BrowserJourneyStep`, `BrowserPageInterface`, `BrowserRun`, `BROWSER_JOURNEY_TOOL_NAMES`, `BROWSER_TOOL_LIMIT`, `createBrowserToolset`, `parseBrowserJourney`, `parseBrowserReference`, `parseBrowserRun`, `renderBrowserJourney`, and `validateBrowserToolArguments`.
- `setupStore.test.ts:12-19` imports `BrowserJourney`, `BROWSER_TOOL_COPY`, `BROWSER_TOOL_LIMIT`, `createBrowserReading`, and `renderBrowserJourney`.

`BrowserToolName` is public (`types.ts:2809`) and is re-exported from `src/core/index.ts:1`. Those two ollama files do not import it. `BROWSER_TOOL_COPY` does name the three tools (`constants.ts:543`). `browser.test.ts:23-24` describes its paging oracle as "a `read` continued at the offset an earlier footer named".

## Unknowns

- No projection-size measurement dated on `0379087` was in the files read. The 90,033 / 73,691 / 75,924 figures are from 2026-10-03 (`reading-feasibility.md:207-210`, `:193`).
- `htmlToMarkdown` and `renderText` were not read in the installed `@orkestrel/markdown` and `@orkestrel/html` packages. Image, table, and heading syntax is taken from the tool copy and `guides/browser.md:3006`, not from those floors' source.
- `src/browser` (the DOM placement's outline and capture) was not in the brief's read list. Both placements are stated from `guides/browser.md:2969-2972`.
- String call sites of `look`, `read`, and `plain` inside ollama were not enumerated. The imports above and `browser.test.ts:23-24` are what was read.
- The 2026-10-03 design does not record a single numbered-line tool. Whether any later note outside `reading-design/` and `reading-review/` weighed that shape, other than the 2026-10-06 campaign (`campaign.md:8-12`), was not read.