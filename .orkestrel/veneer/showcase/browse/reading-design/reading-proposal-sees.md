# Reading-method design, 2026-10-03: what a person sees

**Lane: subjective** (shape, naming, ergonomics, design fit). **Angle:** a page has three readings, and every name says which one it returns.

**Root.** Every `src/`, `tests/`, and `guides/` citation is under `C:/Users/mikes/WebstormProjects/browser-wt-browse`. Laws are cited from `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md`. Evidence comes from `tmp/codex/reading-surface-map.md`, `tmp/codex/reading-prior-art.md`, `tmp/codex/browse-11-design.md`, `tmp/browse-item-12-design.md`, and `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/showcase/browse.md`.

## Design

### Three readings, one name each

| Reading | What it is | Library name | Tool name |
|---|---|---|---|
| Rendered | The text a person reads on the page: item 11's pruned, lowered capture | `read()`, then `reading.text()` and `reading.markdown()` | `read` |
| Accessible | Roles, names, values, and states that assistive technology exposes | `elements.outline()` and `page.accessibility.snapshot()` | `outline` (renamed from `look`) |
| Source | The markup as the document serializes it, hidden parts included | no named method; `frame.evaluate` and `page.snapshot()` cover it | none |

**Fidelity rule.** A member named `text` returns the text of its owning entity, and that text is what a person reads of it:

- `reading.text()` is what a person reads of the page, so it must exclude nav-stripping, icon names, and values that are not printed.
- `outline.text` and `BrowserReadResult.text` stay as they are. Their entity is the outline or the slice, so "text" there means the string form of that entity.

**Unrenderable rule.** When the capture cannot read a printed string exactly, the rendered reading leaves it out. The outline carries the control under its role, name, and value. No channel puts a substitute string where a printed string belongs.

### 1. The axes

| Axis | Reader need | Ruling |
|---|---|---|
| Fidelity | Is this what I would see, what the markup holds, or what a screen reader exposes? | **Covered** by the three-reading split. Source is **deferred**: it has no consumer, and `frame.evaluate` already returns `outerHTML` under the result limit. |
| Format | Plain words, structured text, or markup | **Covered**: `text()`, `markdown()`, the `html` handle, outline text, and accessibility nodes. |
| Whole page or main content | Skip menus on an article | **Covered** in the library by `distill` (boolean), whose default becomes `false`. **Refused** on the tool: b2 shows distillation hid the header-status sentence the agent asked for (`reading-surface-map.md` § 5, T254–T270 row). `what` serves relevance instead. |
| Region or element | Read one panel or dialog | **Covered** in the library by `element.read()`. **Deferred** on the tool: references exist only for interactive roles (`src/core/constants.ts:319-347`), so `ref` cannot name a region. |
| Relevance | "The sentence I asked about" | **Covered** on the tool: `read`'s `what` lists the matching lines first, as `look`'s `what` does. |
| Interactive elements and state | What can I act on, and is it pressed, checked, or expanded? | **Covered** by the outline. |
| Field values | What is typed or selected | **Covered** twice. The printed value is in `read` (item 11 lowering), and the accessibility value is in the outline row. |
| Links and destinations | Where a link goes | **Covered** by `markdown()`. This needs capture need N2 because whole-page projection does not resolve against `base`. |
| Images and graphic alternatives | Icon names and alt text | **Covered** by `markdown()` as `![ALT]()`. `text()` leaves them out because a person does not read them. This needs capture need N1. |
| Metadata (description, language, canonical URL) | Page facts | **Deferred**: no consumer. Item 11 drops `head`, so `evaluate` is the path. `url` and `title` are covered. |
| Arrival and departure of text | Has the toast appeared, or left? | **Covered** by `wait` and item 12's `absent`. |
| Changes since the last read | A diff | **Refused**: no consumer. A fresh `read` at offset 0 recaptures. |
| Length | Bounded slices | **Covered**: `offset` and `limit`. |
| Pixels | What it looks like | **Deferred** to roadmap item 7. |
| Model extraction or summary | "Extract the price" | **Refused**: "Mechanism, not product policy" (`AGENTS.md:67`). The library carries no model. |
| Revealable hidden content | A closed `details` or a collapsed panel | **Refused** in `read`, because a person does not see it. The agent opens it with `click`. Source holds it through `evaluate`. |
| Content item 11 cannot render exactly | Dates, native captions, MathML, and others | **Covered by channel**: left out of `read`, carried by `outline`. See the closing table of this section. |

### 2. The method set

**`BrowserReadingInterface`.** Names are unchanged; the default and the docs change.

| Member | One sentence for a newcomer | Returns | Leaves out | Surfaces and placements |
|---|---|---|---|---|
| `text(options?)` | Returns the words a person reads on the captured page, as plain lines. | `BrowserReadResult` slice of `renderText` over the capture | Link destinations, graphic alternatives, heading levels and list markers, and everything item 11 prunes or cannot render | Library; CDP and DOM |
| `markdown(options?)` | Returns what a person reads as Markdown: heading levels, lists, tables, link destinations, and graphics marked by their alternative text. | `BrowserReadResult` slice | The same pruned and unrenderable cases | Library, and the tool `read`; CDP and DOM |
| `html` | The parsed markup this reading projects. | `HTMLInterface` | Not a string; not the page source once a view captured it | Library |
| `url`, `title`, `stale` | Unchanged | | | |

**Options** (`BrowserReadOptions`):

- `distill: boolean`, **default `false`** (it was `true`). When `true`, the projection is the distilled main content: boilerplate regions are dropped, and the projection re-roots at one `main` or `article`.
- `offset: number`, default 0.
- `limit: number`, default unbounded.

**Why `text` and `markdown` are separate methods.** They are different projection algorithms with different output grammars. "A literal that selects a different action is a magic mode and requires separate functions" (`names.md:75`).

**Why `distill` is an option.** It filters the source of the same projection. "A binary behavioral switch is a boolean" (`AGENTS.md:55`).

**Why the default flips.** A bare `text()` has to keep its name's promise. With distillation on, `text()` returns main-content text, which is not the page's text.

**Why `offset` and `limit` are options.** They are data for the same operation (`names.md:80`).

**`read(options?)` on view, page, frame, and element.**

- **Name:** unchanged.
- **Summary:** "Captures what a person sees of the document (or element) as a reading whose `stale` flag tracks later navigations; `BrowserReadingInput` lists what the capture prunes, lowers, redacts, and cannot render."
- **Options:** `BrowserCallOptions`.

**`elements.outline(options?)`.**

- **Name:** unchanged.
- **Summary:** add "names and values come from the accessibility tree".
- **Options:** `limit`, `within`, and `search`, unchanged.

**`page.accessibility.snapshot(options?)`.**

- **Name:** unchanged; the owning entity says "accessibility".
- **Fix:** the TSDoc "optionally pruned to the interesting nodes" (`src/core/types.ts:617`) has no matching option. The summary becomes "Reads the accessibility tree, or the subtree under `root`, to `depth` levels."

**`wait(text, options?)` on view and page.**

- **Name:** unchanged, with item 12's `BrowserWaitOptions.absent`.
- **Summary:** "Resolves when the document body's laid-out text (`innerText`) contains `text`, or lacks it with `absent` set; …"
- **Change:** the word "visible" goes. `innerText` keeps opacity-0, clipped, and collapsed-select option text. It does not match typed values, which `read` shows.

**Added helpers, exported and tested from `src/core/helpers.ts`:**

- `collectBrowserWords(text: string): ReadonlySet<string>` extracts the lowercased `BROWSER_SEARCH_PATTERN` words. It replaces the inline splits in `matchBrowserOutline` (`src/core/helpers.ts:243-264`).
- `matchBrowserText(text: string, search: string): readonly string[]` returns the non-empty lines of `text` that share the most distinct search words with `search`, scored above 0 and in document order. It is a sibling of `matchBrowserOutline`.

### 3. The tool surface

**Tools after the change:**

- `outline`, `read`, `click`, `type`, `press`, `navigate`, `wait`.
- `dialog` while a dialog is open.
- `tabs` and `switch` with a `context`.
- The journey tools with `journeys`.

**`outline` (renamed from `look`).**

- **Copy:** `Outlines the page as a screen reader announces it, with references like e4 to act on. Call it first and after the page changes.` (24 words)
- **Arguments:** `what` and `offset`, unchanged.
- **Handler:** unchanged.

**`read`.**

- **Copy:** `Reads the page as a person sees it. Call it to learn a fact; continue with the offset a cut result names.` (22 words)
- **`what`:** `What you want to learn; the lines that match it are listed first.` (65 characters)
- **`offset`:** unchanged. `ref` is still refused.

**How `read` treats `what`.** This copies `look`'s rule (`src/core/BrowserToolset.ts:714-727`):

- At offset 0, the handler opens with `N lines match "WHAT":` (`1 line matches` for one), followed by `matchBrowserText(markdown, what)`.
- The list takes at most half the room and sits outside the paged text, so an offset never depends on `what`.
- Lines are listed whole while they fit. A first line longer than the half is cut at the half, without splitting a surrogate pair.
- The body is `reading.markdown({ offset, limit })` at the flipped default, which is the whole rendered page.

**`wait`.** Item 12's copy and `absent`, unchanged by this design.

**Receipts, notes, and footers.** Every "call look" becomes "call outline":

- `BROWSER_TOOL_VIEW_FOOTER`, `BROWSER_TOOL_CHANGED_NOTE`, and `BROWSER_TOOL_PENDING_NOTE`.
- The deadline note at `src/core/constants.ts:418`.
- `src/core/errors.ts:53`.
- `src/core/BrowserToolset.ts:555`, `:1142`, `:1282`, `:1588`, and `:1815`.
- `src/core/BrowserJourneyToolset.ts:525` and `:586`.
- `src/core/helpers.ts:603`.
- The ref refusal at `src/core/helpers.ts:544`: `The outline tool takes no ref parameter; call outline with what and offset.`

**Bound arithmetic.** These are counted by hand; the measurement is missing.

| Change | Characters |
|---|---|
| Name `look` to `outline` | +3 |
| `outline` description | 0 (127 to 127) |
| `read` description | −5 (110 to 105) |
| `read`'s `what` description | +28 (37 to 65) |
| **This design** | **about +26** |

Item 12's `absent` adds about 140 on its own. Apply the ruled procedure: shorten first, then raise to the smallest multiple of 50 that holds the measured length, and record both lengths.

### 4. Naming defense

| Name | What a reader expects | Prior art it matches or collides with | Beats |
|---|---|---|---|
| `text` (reading) | The words on the page | Matches Jina and Playwright (`innerText`). Collides with Readability's `textContent`. After the flip it matches. | `visible`: an adjective that wrongly takes in icon names. `plain`: names the format, not the fidelity. |
| `markdown` | Markdown, including link and image syntax | Universal: Firecrawl, Jina, Crawl4AI | `structured`: vague. `document`: collides with `HTMLInterface.document`. |
| `html` | Markup | Firecrawl's `html` is cleaned and Jina's is `outerHTML`. The remarks rule which one. | `markup`: same meaning, less known. `source`: false after item 11, and reserved for a deferred source method. |
| `distill` | Boil down to the essence | Only this fleet uses it (`HTML.distill`). One concept, one term (`AGENTS.md:54`) wins over field spread. | `main`: collides with `<main>` and leaves out the boilerplate pass. `onlyMainContent`: compound (`names.md:38`). |
| `read` (tool and method) | Take in the content | Fetch server and Jina `read` | `content`: HTML in Playwright and Puppeteer. `extract`: an LLM in Stagehand and browser-use. |
| `outline` (tool) | The page's structure, headings, and controls | Same word as `elements.outline`, which the tool runs | `look`: says vision and overlaps `read`, so a newcomer cannot tell the two apart by name. `snapshot`: prior art flags it as sounding like a picture, and it collides with `page.snapshot()`. |
| `what` | What I am after | Same meaning on both observation tools | `search` and `query`: longer to explain, and they break the shared parameter. |
| `wait` and `absent` | Block until a condition holds | Ruled in item 12 | — |
| `matchBrowserText` | Lines matching a search | Sibling of `matchBrowserOutline` | `filterBrowserLines`: `filter*` means a plain predicate, not best-score. |

### 5. Migration (no shim)

**Types (`src/core/types.ts`):**

- `:2246-2261`: `distill` defaults to `false`; remarks rewritten.
- `:2287-2313`: item 11 owns these remarks; add N1–N3 and the limits table.
- `:2322-2353`: reading summary and method summaries per § 2.
- `:2551-2556`, `:2647-2656`, and the frame and page `read`/`wait` at `:3065-3071` and `:3321-3322`: summaries.
- `:617`: snapshot TSDoc.
- `:2765`: `BrowserToolName` member `'look'` becomes `'outline'`.
- `:2910` and `:2961`: tool lists and notes.

**Reading and constants:**

- `src/core/BrowserReading.ts:65` and `:75`: `?? false`. Rewrite the `@example` at `:17-27` to show both modes.
- `src/core/constants.ts:418-455`, `:476-490`, and `:509-564`: names, notes, copy, and remarks.

**Helpers:**

- `src/core/helpers.ts:239-272`: switch to `collectBrowserWords`.
- Add `matchBrowserText`.
- `:503`, `:544`, `:588`, and `:603`: update the "look" references.

**Toolset:**

- `src/core/BrowserToolset.ts`: `#look` becomes `#outline`, plus `:101-119`, `:184`, `:272-281`, the `#pageSlice` union at `:792`, every note, and the `what` block in `#read` at `:736-767`.
- `src/core/BrowserJourneyToolset.ts:47`, `:525`, `:556-561`, and `:586`.
- `src/core/factories.ts:110-138`.
- `src/core/errors.ts:34` and `:53`.

**Other source:**

- `src/browser/factories.ts:39` and `:59`.
- `src/browser/BrowserDOMView.ts:44-45` example.
- `src/server/BrowserMCPServer.ts:36`.

**Tests:**

| File | Change |
|---|---|
| `tests/src/core/BrowserReading.test.ts:22-100` | Swap the explicit and default modes |
| `tests/service/browser.test.ts:866-896` | `distill: true` names the main-content case |
| `tests/src/browser/BrowserDOMView.test.ts:16-33`, `:53` | Follow the default flip |
| `tests/src/browser/elements/BrowserDOMElement.test.ts:565`, `:584` | Drop `{ distill: false }` |
| `tests/src/core/BrowserPage.test.ts:236-290`, `:709`; `tests/src/core/BrowserFrame.test.ts:166-196` | Re-read the expected strings under the whole-page default |
| `tests/setup.test.ts:331` | Follow the default flip |
| `tests/src/core/BrowserToolset.test.ts` | The seven-name list `:802`, annotations `:809-817`, descriptions `:849-850`, the bound `:793`, ref refusal `:868-886`, dialog refusal `:968-980`, read paging `:5611-5626` and `:5775`, plus a `what`-block case |
| `tests/src/core/helpers.test.ts` | `matchBrowserText` and `collectBrowserWords` cases |
| `tests/src/core/BrowserJourneyToolset.test.ts` | "call outline" receipts |
| `tests/service/toolset.test.ts:431-434` | Whole-page Markdown, plus the match block for `the confirmation` |
| `tests/service/journey.test.ts:564-568` | `outline` in the hold list |
| `tests/src/browser/factories.test.ts` | DOM toolset names |

**Guide `guides/browser.md`:**

- `:125`, `:1686`, and `:1843-1853`: the example becomes `const main = reading.text({ distill: true })`.
- `:225`: drift; it says the footer names `read`.
- `:228`, `:330`, `:687`, `:1947`, `:2865-2887`, `:2893-2952`, and `:2973`: tool names, copy, and receipts.
- `:3395-3420`: the store-proof prompt says "as outline returns it". Mark the measured paragraph at `:3397-3403` as taken against 0.0.19 with `look`.
- `:2976`: the bound.
- The `BrowserReadingInput` remarks rows: the limits.

**Roadmap:** `ROADMAP.md` item 11 gains N1–N3.

**Outside this repository:**

- `@orkestrel/ollama`'s store-proof system prompt and its re-run.
- Veneer and scaffold guide mirrors refresh at the 0.0.22 re-pin.
- Stored journeys are untouched: `look` and `read` are never steps (`guides/browser.md:2973`).

### Cases item 11 cannot render exactly

The source for each row is `tmp/codex/browse-11-design.md`.

| Case | `read` (`text` and `markdown`) | `outline` carries |
|---|---|---|
| Date input (`10/03/2026` painted, `2026-10-03` value) | Left out | `Date` row with `value="2026-10-03"` |
| Submit or reset with no value; file "Choose File" and "No file chosen" | Captions left out; a chosen filename from `files[].name` is kept | `button "Submit"`, and the file button with its value |
| Number input during invalid editing | Left out, because `.value` is empty | `spinbutton` row |
| MathML | Left out | `MathMLMath "NAME"` |
| Checkbox, radio, range, color, password | Left out: graphics or masks | `[checked]`, `value=`, and the row without a value |
| Icon button, named SVG, image input | Left out of `text()`; `![NAME]()` in `markdown()` (N1) | `button "NAME"` |
| Open shadow-root text | Left out; outside the capture | Static text, because the accessibility tree flattens shadow roots |
| Same-origin iframe content | Left out; the capture empties `iframe` | Rows after the `Iframe` reference |
| Generated content, `text-transform`, opacity 0, partial clipping, textarea whitespace | Source text kept as written; declared limits | Accessibility names |

**Capture needs** (the substrate cannot give these as designed):

- **N1.** Lower every graphic alternative (icon-only button, named `svg`, image input) to an `img` with `alt` and no `src`, instead of a text carrier. Drop an `img` whose `alt` is empty.
- **N2.** Write each copied `a`'s `href` from the live element's resolved `href` property.
- **N3.** Keep `main`, `article`, `nav`, `header`, `footer`, `aside`, and `menu` as elements. Remove only the `hidden` and `aria-hidden` attributes after the layout prune. Item 11's plan to neutralize region wrappers (`browse-11-design.md` paragraph citing `index.js:5158`) existed only because distillation was the default. With the flip, neutralizing them would turn `distill: true` into a no-op.

## Alternatives

1. **Keep `look`, fix only its copy.** This costs about 40 source sites less and needs no store-proof re-run. It loses because, by name alone, `look` and `read` both mean "perceive the page". `outline` and `read` split structure from content, and `outline` is the library's own term.
2. **Keep `distill` defaulting to `true` and add a `whole` option or a `page()` method.** This keeps token counts down for small models. It loses because the bare `text()` would still break its name. Distillation also dropped the header status that b2's agent asked for, and a second switch for the same axis breaks "one concept, one term".

## Constraints

- `AGENTS.md:52`, `:54`, `:55`, `:65`, `:66`, `:67`: single-word APIs, one term, boolean switch, minimal API, no shims, mechanism.
- `names.md:75-81`: split behavior, keep data as options.
- `tests/src/core/BrowserToolset.test.ts:793` (6050), `:829` (100 characters), `:842-843` (25 words).
- `src/core/constants.ts:517-518`: every tool needs a required parameter (Ollama 0.34.4).
- `src/core/BrowserReading.ts:84-87`: `base` resolves only under distillation, which is why N2 is needed.
- `browse.md` § Item 12 rulings: `absent`, the receipts, and the bound procedure.

## Refusals

- **A `format: 'text' | 'markdown'` argument.** Refused: "Do not write `parse(input, format)`. A literal that selects a different action is a magic mode" (`names.md:75`).
- **An LLM `extract` method.** Refused: "Framework code stops before application decisions" (`AGENTS.md:67`).
- **Changing the `@orkestrel/html` floor.** Refused by the brief's ruled constraint.
- **A `source()` method.** Refused: "Create or substantively expand a capability with its first real consumer" (`AGENTS.md:65`). `evaluate` covers it.
- **Keeping `look` as an alias of `outline`.** Refused: "No compatibility shims. Update every consumer in the same change" (`AGENTS.md:66`).

## Measurements

**Supplied:**

- Item 11 readings on Edge 154.0.4258.53, 2026-10-03.
- B0 `page.read()` median 322.6014 ms over 5 runs (`browse.md:86`).
- Store proof against 0.0.19 at `254d107`, 1,651 tokens for the full tool list on 2026-10-01 (`guides/browser.md:2974`, `:3397`).
- The 6050 bound.
- b2: the outline cut at 62,448 characters.

**Missing:**

- The serialized copy length before and after.
- The whole-page Markdown length of the showcase, against the distilled length.
- Whether `htmlToMarkdown` renders an `img` with no `src` as `![ALT]()`. The map implies it does; one test settles it.
- `matchBrowserText` quality when `what` is a question (stop words).
- A store-proof run with `outline` and the flipped default.

## Units

1. **U0: capture rules N1–N3, folded into item 11.**
   - Role and engine: writer, `opus`, high.
   - Owns item 11's files: `src/core/compilers.ts`, `src/browser/helpers.ts`, and the `BrowserReadingInput` remarks.
   - Depends on: item 11's design.
   - Accepts when:
     - an icon button's name is absent from `text()` and present once as `![NAME]()` in `markdown()`;
     - a relative link reads as absolute in whole-page Markdown;
     - a page with `nav` and one `main` gives `distill: true` without the nav text and the default with it;
     - every case fails when its rule is removed;
     - `test:src:core`, `test:src:browser`, and `test:service` exit 0.
2. **U1: library reading.**
   - Role and engine: writer, `opus`, high. Depends on U0.
   - Owns: `src/core/types.ts` (reading, read, wait, and snapshot TSDoc), `src/core/BrowserReading.ts`, `src/browser/BrowserDOMView.ts` (example), and the reading tests listed in § 5.
   - Accepts when: `npm run check`, `test:src:core`, `test:src:browser`, `test:setup`, `build`, and `test:service` exit 0.
3. **U2: toolset.**
   - Role and engine: writer, `opus`, high. Depends on U1.
   - Owns:
     - the `look` to `outline` rename across `src/core/{constants,helpers,errors,factories,BrowserToolset,BrowserJourneyToolset}.ts`, `src/browser/factories.ts`, and `src/server/BrowserMCPServer.ts`;
     - `matchBrowserText` and `collectBrowserWords`;
     - the `read` `what` block;
     - the toolset, journey, and service tests.
   - Accepts when:
     - the copy length is measured and reported against the bound;
     - a `read` with `what` lists a matching header line before the body;
     - offset continuation does not depend on `what`;
     - the same gates exit 0.
4. **U3: guide and roadmap.**
   - Role and engine: writer, `sonnet`. Depends on U2.
   - Owns `guides/browser.md` and `ROADMAP.md`.
   - Accepts when `test:guides` and `test:policy` exit 0.
5. **U4: review.** One reviewer who wrote none of U0–U3. Scope: the fidelity claims in the TSDoc against the item 11 limits, and the `what` block paging.
6. **U5: gates.** `verifier`.
7. **U6: dependents.** After 0.0.22: the ollama prompt and the store-proof re-run, with the per-task results recorded.

## Tensions

- **Rename `look` to `outline`** (recommend: rename). It costs a store-proof re-run and about 40 sites. The other lane or the Orchestrator rules.
- **Default `distill: false`** (recommend: flip). It trades tokens for fidelity, backed by the b2 header-status miss.
- **N1–N3 amend item 11's design** (recommend: fold them into item 11 before its implementation). N3 reverses item 11's plan to neutralize region wrappers. The Orchestrator rules.
- **`wait` stays on `innerText`** (recommend: keep and declare). A shared rendered-text predicate would cost a capture per wake, against about 322 ms per `read` in B0.
- **Leave out, or mark, the unrenderable cases** (recommend: leave out). A placeholder such as `[date field]` would add text no person reads.
- **`ref` on `read` for iframe rows** (recommend: defer to a frame-merge item).
- **Raising the bound** follows the ruled procedure.

## Risks

- **Small-model regression from the rename and the whole-page default.** Recommendation: U6 gates the release notes on a measured store-proof run.
- **`what` as a question** matches stop words ("the", "what"). Recommendation: measure first; add no stop-word list, because that is language policy.
- **Overclaim.** "As a person sees it" misses shadow-root and iframe text. Recommendation: the `BrowserReadingInput` limits table carries these. Open a roadmap item for flattening open shadow roots and merging same-origin frames into the capture.
- **Larger whole-page `read` results.** Agents page more. `what` and `offset` cover this; recommendation: measure on the showcase.
- **Fidelity depends on item 11 landing.** Until it does, `text()` returns `outerHTML` text, stylesheet-hidden content included. Recommendation: land U1 only after item 11.