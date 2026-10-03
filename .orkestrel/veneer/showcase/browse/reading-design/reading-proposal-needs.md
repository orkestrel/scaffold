**Lane:** subjective (shape, naming, ergonomics, design fit), reasoned from what a reader of a page needs. Tree: `C:/Users/mikes/WebstormProjects/browser-wt-browse`, with item 11's capture as the substrate and item 12's `wait` with `absent` as ruled.

## Design

**What I propose.** Keep the reading methods (`read`, `markdown`, `text`, `html`) and add no reading method. Make three changes:

1. **Library default.** `distill` becomes opt-in (default `false`). A reading projects what was captured, and main-content extraction is something the reader asks for.
2. **Search.** Add one pure helper, `matchBrowserText`. It lists the lines of a projection that share the most search words, each with its offset. It uses the same word rule as `look`'s `search`.
3. **The `read` tool.** It reads the whole captured page and finally uses `what`: passages that match are listed first, each with an offset you can continue from. This mirrors `look`.

`look`, `wait` (item 12 as ruled), receipts, and every capture method keep their shape.

### 1. The axes a reader wants

| # | Axis | Reader need and evidence | Ruling |
|---|---|---|---|
| A1 | Scope: the whole visible page | Header status, banners, and toasts sit outside `main`. b2's header-status `read` calls got distilled body text instead (`reading-surface-map.md:285`). | **Cover.** It is the library default and what the tool reads. |
| A2 | Scope: main content only | A long article without page chrome. | **Cover** in the library with `distill: true`. **Defer** on the tool: no recorded run asked to narrow, and `what` plus `offset` reach a fact on a long page. |
| A3 | Scope: one element or region | Read a dialog, a card, or a listbox (map §4 row "named region"). | **Cover** in the library with `element.read()`, which now projects whole by default. **Defer** on the tool: references exist only for interactive roles (`src/core/constants.ts:319-347`), so no region a reader wants (article, dialog, card) has one. |
| A4 | Scope: one frame | Content inside an iframe. | **Cover** in the library with `frame.read()`. **Defer** on the tool: the outline reaches frames, `read` reads the main document. |
| A5 | Form: Markdown | Headings with levels, link targets, tables, image alt. | **Cover** in both (unchanged). |
| A6 | Form: plain text | Diffing and exact strings (the user's example). | **Cover** in the library with `text()`. **Refuse** on the tool: Markdown is a superset for a model (it keeps link targets, alt, heading levels, and table headers that `renderText` drops, map §3). |
| A7 | Form: markup | Raw structure. | **Cover** in the library with `reading.html`. **Refuse** on the tool: untrusted active markup, size, and the floor stays unchanged (brief:20). |
| A8 | Form: structure and what you can act on | Controls, states, references. | **Cover** with `look` and `elements.outline` (unchanged, items 9 and 10). |
| A9 | Form: raw accessibility or DOM snapshot | Tree inspection. | **Cover** in the library (`accessibility.snapshot`, `snapshot`). **Refuse** on the tool: `look` already renders the tree. |
| A10 | Locate a fact by its words | Small-model store proof: `read` called seven times without an offset, each returning the first slice (`guides/browser.md:3403`). The prompt already sets `what` to the question (`:3395`), and the tool ignores it (`src/core/BrowserToolset.ts:736-767`). | **Cover.** `matchBrowserText` in the library; `read`'s `what` on the tool. |
| A11 | Locate an element to act on | b2 T37 and T276. | **Cover** with `look`'s `what` (item 9). |
| A12 | Length and paging | Pages of 62,448 characters (b2 T276). | **Cover** with `offset`/`limit` (unchanged). Match offsets add jump targets. |
| A13 | Rendered versus every node | b2 T254, T257, and T270 read hidden content. | **Cover** through the substrate (item 11). Reading hidden document text is **refused** on the tool because it misled b2. In the library it is reachable by composition: `evaluate` plus `createBrowserReading`. |
| A14 | Form field values | Typed values and the selected option. | **Cover** through item 11's lowering (the `read` text) and the outline row values (`look`). |
| A15 | Links and their targets | Where a link goes. | **Cover** through Markdown `[text](url)` plus `what` search. A separate links list is **deferred**: no run reached for one. |
| A16 | Tables | Rows and headers. | **Cover** through GFM Markdown. |
| A17 | Images and their alternatives | Alt text. | **Cover** through Markdown alt. `src` stays **refused** by the floor (`guides/html.md:301`). |
| A18 | Headings as an outline | Document shape. | **Cover** through Markdown levels. A heading level in `look` (`src/core/helpers.ts:343-345`) is **deferred**. |
| A19 | Which page: title and URL | Orientation. | **Cover** with `look`'s first line, `tabs`, and `reading.url`/`title`. Meta description, `lang`, and canonical URL are **deferred**: item 11 drops `meta`/`link`, and no run reached for them. |
| A20 | Text arrived or left | Exits of toasts and panels. | **Cover** with `wait` plus `absent` (item 12 rulings). |
| A21 | What changed since the last read | A diff. | **Deferred.** Only Firecrawl offers it (prior art axis 8). A fresh `read` at offset 0 recaptures. |
| A22 | What it looks like | Screenshot. | **Deferred** to roadmap item 7. |
| A23 | A summary or schema extraction by a model | Firecrawl `summary`/`json`, Stagehand `extract`. | **Refuse.** "Mechanism, not product policy" (`AGENTS.md` § Design laws); the calling agent is the model. |
| A24 | Quoting exact text back into `wait` or `type` | Markdown escapes and link syntax differ from `innerText`. | **Uncovered; named under Risks.** It needs a measured reading first. |

### 2. The method set

| Method | One sentence for a newcomer | Returns | Leaves out | Surfaces and placements | Options |
|---|---|---|---|---|---|
| `read` on view, page, frame, element | "Captures what the page or element shows right now so you can read it." | `BrowserReadingInterface` | Everything item 11 prunes or cannot render (shadow-root text, generated content, native captions, dates, MathML) | Library; tool through `read`. CDP and DOM. | `timeout`, `signal` (unchanged) |
| `reading.markdown` | "Returns the captured page as Markdown." | `BrowserReadResult` | Unsafe-element text item 11 does not lower; image `src` | Library; tool. Placement-independent. | `distill`: boolean, default **`false`** (was `true`); true removes boilerplate regions and re-roots at the single `main` or `article`. `offset`: integer, default 0. `limit`: integer, default unbounded. |
| `reading.text` | "Returns the captured page as plain text." | `BrowserReadResult` | Link targets, image alt, heading levels, list markers | Library | Same as `markdown` |
| `reading.html`, `url`, `title`, `stale` | "The captured markup, address, title, and whether the page has moved on since." | Handle, strings, boolean | None | Library | None |
| `matchBrowserText(text, search)` (added) | "Finds the lines of a text that share the most words with what you search for." | `readonly BrowserReadMatch[]`, each `{ offset, text }` in document order | Lines below the top score; words under 3 letters or digits (`BROWSER_SEARCH_PATTERN`, `src/core/constants.ts:316`) | Library; drives the tool's `what` | None |
| `collectBrowserWords(text)` (added) | "Splits text into its lowercase search words." | `ReadonlySet<string>` | Words under 3 letters or digits | Library; shared by both matchers | None |
| `elements.outline`, `find`, `wait` | Unchanged | | | Library; `look` | Unchanged |
| `view.wait(text, options?)` | "Waits for text to appear on the page, or to leave it with `absent`." | `void` | Child frames | Library; tool | As item 12 rules |
| `accessibility.snapshot` | Unchanged | | | Library | Unchanged. Its TSDoc phrase "optionally pruned to the interesting nodes" (`src/core/types.ts:617`) names no option, so it is deleted. |

**Why each method is a method:**
- `markdown` and `text` are different projection algorithms with different output grammars. `.claude/rules/names.md` § Split behavioral variants splits them.
- Scope is the receiver (`element.read()` against `page.read()`), never an option.
- `matchBrowserText` is a helper and not a reading method, for three reasons:
  - A match is a pure function of the projected string.
  - A reading method would need a projection selector (a magic mode) or two compound names.
  - Its offsets index whatever text you pass, so they are valid continuation offsets for that projection.

**Why each option is an option:**
- `distill` narrows the source of the same projection. `AGENTS.md` names a binary behavioral switch a boolean. It defaults to `false` because absence reads as "not narrowed", and dropping `nav`/`header`/`footer` is a policy the caller opts into.
- `offset` and `limit` select a window over the same text, which is data.

### 3. The tool surface

The tools after the change are `look`, `read`, `click`, `type`, `press`, `navigate`, `wait`, `dialog`, `tabs`, and `switch`. No tool is added or removed.

| Tool | Copy | Arguments | Change |
|---|---|---|---|
| `look` | Unchanged | `what`, `offset` | None |
| `read` | Unchanged: `Reads the page's text for what you name. Call it to learn a fact; continue with the offset a cut result names.` | `what` (string, required): `What you want to learn; the passages that match are listed first.` (65 characters, was 37). `offset` unchanged. | +28 characters |
| `wait` | As item 12 rules | `text`, `timeout`, `absent` | Item 12's own delta, about +140 by that design's estimate |

**Ruling on `read`'s `what`.**
- At offset 0, `read` recaptures and projects the whole capture as Markdown. Because the default flips, it passes no `distill`.
- It runs `matchBrowserText(markdown, what)`. When anything matches, it lists the passages before the slice, in at most half the remaining room, outside the paged text:

  ```text
  2 passages match "delivery date":
  [1520] Delivery: Thursday 2026-10-08
  [3104] The delivery date can change after you…

  ```

- The heading wording is `1 passage matches` or `N passages match`, mirroring `look` (`src/core/BrowserToolset.ts:719`).
- Each row is `[OFFSET] LINE`. A line longer than the block's room is cut to fit and ends with `…`, so the first match always shows its offset. Listing stops at the first row that does not fit.
- At an offset above 0, or with no word of 3 letters or digits, or with no match, there is no block. Offsets therefore never depend on `what`.
- A continuation keeps the retained capture (`src/core/BrowserToolset.ts:747-756`), so a listed offset continues in the reading it was computed from.
- `ref` stays refused (`tests/src/core/BrowserToolset.test.ts:868-886`).

**Copy bound.** This design adds +28 characters on top of the length after item 12. Neither the current length nor the length after item 12 is measured; see Measurements. Within the 25-word and 100-character limits, `read`'s description stays at 22 words and the parameter is 65 characters (`tests/src/core/BrowserToolset.test.ts:829`, `:843`). If the bound breaks, follow the item 12 ruling (`browse.md:61`).

### 4. Naming defense

| Name | What a reader expects | Prior-art match or collision | Beats |
|---|---|---|---|
| `read` (method and tool) | Get the words of the page | Universal, with no collision | `extract` (means a model call in browser-use and Stagehand, raw text elsewhere); `content` (HTML in Playwright and Puppeteer, article HTML in Readability) |
| `markdown`, `text`, `html` | The format by name | Understood without documentation (prior art "Naming lessons"). `text` is `innerText` in Jina and Playwright but `textContent` in Readability; after item 11 ours is rendered text, the `innerText` side. | `content` and `raw` (three meanings) |
| `distill` | Boil down to the essence | Nobody outside the fleet says it, but `@orkestrel/html` owns `distill` for exactly this pass (`guides/html.md:309-318`). One concept, one term across the fleet wins. | `main` (implies only the `<main>` element, while the pass also strips `nav`/`header` without one); `article` (same flaw, and Readability's main-only default); `fit` (Crawl4AI jargon) |
| `what` (tool) | What I am after | Same word and same "matches listed first" behavior as `look` | `search` or `query` (would differ from `look`'s argument and break one term per concept); `question` (implies an answer engine) |
| `matchBrowserText` | Match against text | Sibling of `matchBrowserOutline` (`src/core/helpers.ts:239`) | `searchBrowserText` (no `search*` helper prefix exists); `findBrowserText` (`find` returns elements in this package) |
| `BrowserReadMatch` | One match from a reading | Sits with `BrowserReadOptions` and `BrowserReadResult`; plain data takes the `{Entity}` form (`names.md` § Type-level identifiers) | `BrowserTextMatch` (no `BrowserText` entity); `BrowserPassage` (a second term for the same line) |
| `collectBrowserWords` | Gather words into a set | `collect*` gathers members into a collection (`names.md` § Standalone helpers) | `extractBrowserWords` (`extract*` extracts structure); `tokenize` (a bare one-word helper that is not unmistakable here) |
| "passages" (copy) | Readable pieces of text | Mirrors `look`'s "elements" | "lines" (Markdown line is an implementation fact); "paragraphs" (false for table rows and list items) |

### 5. Migration (no shim)

**Types: `src/core/types.ts`**
- `:2246-2261`: `distill` remark becomes "if `true`, projects the distilled document; if `false` or omitted, projects the whole capture. Default: `false`".
- `:2322-2336`: remarks become "over the whole document by default and over `html.distill({ base: url })` with `distill: true`".
- Add `BrowserReadMatch` after `BrowserReadResult`, with remarks `offset` (where the line starts in the searched text, a valid continuation offset) and `text` (the line without its break).
- `:617`: delete "optionally pruned to the interesting nodes".

**Source**
- `src/core/BrowserReading.ts:65`, `:75`: `?? false`. `:26`: example becomes `reading.markdown({ distill: true }) // { text: 'Body', offset: 0, total: 4 }`.
- `src/core/factories.ts:82`: example becomes `reading.text()`; any distilled example line takes `{ distill: true }`.
- `src/core/helpers.ts`:
  - Add `collectBrowserWords` and `matchBrowserText` beside `matchBrowserOutline`.
  - `matchBrowserOutline` (`:243-245`, `:259-264`) uses `collectBrowserWords`.
  - Export both through the core barrel.
- `src/core/constants.ts:552-555`: `what` description. `:517-519` remarks: add "`read` lists the passages that share the most words with `what` first, with their offsets".
- `src/core/BrowserToolset.ts`:
  - `:736-767` `#read`: add the match block at start 0.
  - Extract the shared block rendering of `#look` (`:715-727`) and `#read` into one private method taking the noun and pre-rendered rows. This changes no `look` output.
  - `:116-119` class TSDoc: name the `read` match block.

**Tests whose expectation relied on the distilled default.** Each either passes `{ distill: true }` (when it proves distillation) or updates the expected text to the whole projection (when it proves capture):
- `tests/src/core/BrowserReading.test.ts:22-49`, `:62-89`, `:96-100`: titles change from "with distill false" to "by default".
- `tests/service/browser.test.ts:99-102`, `:866-896`: `distilled = reading.text({ distill: true })`, and its slice loop passes `distill: true`.
- `tests/src/browser/BrowserDOMView.test.ts:19`, `:31-33`, `:53`.
- `tests/src/browser/elements/BrowserDOMElement.test.ts:565`, `:584`: drop the explicit `false`.
- `tests/src/core/BrowserFrame.test.ts:166`, `:195-196`.
- `tests/src/core/BrowserPage.test.ts:236-290`, `:709`.
- `tests/setup.test.ts:331`.
- `tests/src/browser/helpers.test.ts:425`, `:431`.
- `tests/src/core/elements/BrowserPageElement.test.ts:68`.
- `tests/src/core/BrowserToolset.test.ts:5611-5626`, `:5775`.
- `tests/service/toolset.test.ts:431-434`: re-derive from the placed page's whole projection. "the confirmation" shares no word with its lines, so no block appears.

**Tests added**
- `tests/src/core/helpers.test.ts`:
  - `collectBrowserWords` cases: lowercase, words under 3 letters or digits, Unicode letters.
  - `matchBrowserText`: top score only, document order, offsets equal to `text.indexOf(line)` for distinct lines, blank lines skipped, empty for no word.
  - Control: a second-best line is absent.
- `tests/src/core/BrowserToolset.test.ts`:
  - `read` with a matching `what` opens with `2 passages match` and rows whose offsets continue in the same projection when passed back.
  - An offset above 0 has no block.
  - A non-matching `what` has no block.
  - An over-long first passage is cut with `…` and keeps its offset.
  - The `what` description is asserted by equality.
  - The vocabulary bound is re-measured.
- `tests/service/toolset.test.ts`: a page whose answer line sits past 4,000 characters and inside a `header`; `read` with that line's words lists it first. Control: no shared word, no block.

**Guide (`guides/browser.md`)**
- `:1839`, and the fence at `:1846-1854`: `const article = reading.text({ distill: true }) // navigation and footer removed`.
- `:2870`: parameter column `what` (string, required; the passages that match are listed first).
- `:2893`: the `read` tool paragraph names the whole projection and the match block.
- Helper and type tables gain `matchBrowserText`, `collectBrowserWords`, and `BrowserReadMatch`, with summaries equal to their TSDoc.
- `:3584`: test list sentence.
- The vendored html and markdown guides are untouched.

**Journeys:** none. `read` is never a step (`guides/browser.md:2986`).

**`ROADMAP.md`:** item 11's text names the whole-capture default.

### 6. Open questions for the user

Each question carries my recommendation; the same items appear under Tensions for ruling.

- **Flip `distill` to default `false`?** Recommend yes. It is a breaking change in a 0.0.x package with no consumer outside this repository: the matches elsewhere are guide mirrors and sibling clones of this repository (the 2026-10-03 sweep).
- **Drop item 11's wrapper neutralization?** Recommend yes. With the tool reading whole, item 11 no longer needs to neutralize `nav`/`header`/`main` wrappers and hiding attributes "to preserve all captured visible prose" (`tmp/codex/browse-11-design.md:99`). Keeping that expansion would make `distill: true` unable to find boilerplate in a capture, which empties the option.
- **Landing order?** Recommend after items 11 and 12. Before item 11, a whole-page read surfaces stylesheet-hidden text plus every boilerplate region.

## Alternatives

- **Add `distill` (or `main`) as a boolean on the `read` tool.** Rejected for this round. It costs about 90 characters of copy, and no recorded run needed narrowing; b2 needed the reverse. Add it when a run shows the need.
- **A `search` option on `markdown`/`text` returning `matches` in `BrowserReadResult`.** Rejected. It widens a slice shape shared with `look`'s outline paging (`extractBrowserSlice`, `src/core/helpers.ts:1980`) and every `toEqual` on a slice (`tests/src/core/BrowserReading.test.ts:25`, `:89`; `tests/service/browser.test.ts:893`), for a value that is a pure function of the text.

## Constraints

- `src/core/constants.ts:516-517`: every tool declares at least one required parameter (Ollama 0.34.4), so `what` stays required.
- `tests/src/core/BrowserToolset.test.ts:793`: copy at most 6050. `:829`: each parameter description at most 100 characters. `:843`: each description at most 25 words.
- `tests/src/core/BrowserToolset.test.ts:868-874`: `look` and `read` advertise exactly `what` and `offset`.
- `src/core/BrowserToolset.ts:747-760`: a continuation reuses the retained capture, and offset 0 recaptures.
- `src/core/BrowserReading.ts:84-87`: distillation is `html.distill({ base: url })`; the floor is unchanged (brief:20).
- `browse.md:61`: the bound-raise procedure.

## Refusals

- **Model-shaped extraction:** "**Mechanism, not product policy.** Framework code stops before application decisions." (`AGENTS.md` § Design laws).
- **A format selector such as `read({ format: 'text' })`:** "A literal that selects a different action is a magic mode and requires separate functions/methods." (`names.md` § Split behavioral variants).
- **Keeping `distill: true` beside a renamed `main` option:** "**No compatibility shims.** Update every consumer in the same change." (`AGENTS.md`).
- **Raw HTML on the tool:** the brief rules the floor unchanged (`reading-design-brief.md:20`).

## Measurements

**Supplied**
- b2 run, 2026-10-02 (`b2-report.md:41`, `:62`).
- Store proof, 0.0.19 (`guides/browser.md:3399-3403`).
- `page.read()` B0 median 322.6014 ms over five runs (`browse.md:86`).
- Bound 6050.

**Missing**
- The serialized copy length today and after item 12.
- Markdown line-length distribution on the showcase page, which sizes the `…` cut.
- `matchBrowserText` time on the 62,448-character page; estimated linear and small, not measured.
- Whether `renderMarkdown` escapes change sentence text an agent then passes to `wait`.

## Units

1. **U1, library contract.** Writer, `opus`, high. Depends on items 11 and 12 landing.
   - Owns `src/core/types.ts` (reading section and `:617`), `src/core/BrowserReading.ts`, `src/core/factories.ts:82`, the helper section of `src/core/helpers.ts`, the core barrel, and every library test listed in Migration plus `tests/src/core/helpers.test.ts`.
   - Accepts when `npm run check`, `npm run test:src:core`, `npm run test:src:browser`, `npm run test:setup`, and `npm run build` then `npm run test:service` exit 0, read bare, and the matcher tests fail when the top-score filter is removed.
2. **U2, toolset.** Writer, `opus`, high. Depends on U1.
   - Owns `src/core/constants.ts:509-564`, `src/core/BrowserToolset.ts`, `tests/src/core/BrowserToolset.test.ts`, and `tests/service/toolset.test.ts`.
   - Accepts when the same project gates exit 0 and the copy length is reported before and after against the bound.
3. **U3, guide and roadmap.** Writer, `opus`. Depends on U2.
   - Owns `guides/browser.md` and `ROADMAP.md`.
   - Accepts when `npm run test:guides` and `npm run test:policy` exit 0.
4. **U4, review.** One reviewer who wrote none of U1 to U3, on the default flip's test updates (distill-proving against capture-proving) and the match-block offsets.
5. **U5, gates.** `verifier` runs the tree-wide gates.

## Tensions

- **Default flip of `distill`:** subjective lane and user. Recommend the flip.
- **Item 11's wrapper neutralization:** Orchestrator. Recommend dropping it, because this design makes it unnecessary and it would empty `distill`.
- **Landing order:** recommend after items 11 and 12.
- **Over-long passage rule:** cut to fit with `…` (no constant) against a fixed passage limit. Recommend cut to fit until a line-length reading exists.
- **Stopwords:** `the` and `what` score like content words, as in `look`. Recommend leaving them, since a stopword list is language policy.
- **`ref` on `read`:** recommend deferring until the outline references regions.

## Risks

- **Noise from common words:** a question-shaped `what` can tie many lines on common words. The top-score rule bounds the block to half the room.
- **Ollama store proof drift:** a whole-page default lengthens its pages and adds the block. Re-run that proof at the re-pin; its 0.0.19 readings no longer describe the tool.
- **Markdown escapes (axis A24):** text quoted from `read` into `wait` can miss on escapes or link syntax. Uncovered until measured.
- **Capture limits carry through:** a whole-page read inherits every item 11 limit (dates, native captions, MathML) in a bigger surface. Keep the copy at "the page's text"; never say "exactly what you see".
- **Library readers relying on the old default:** any reader that relied on the distilled default silently gets more text. No consumer outside this repository was found.