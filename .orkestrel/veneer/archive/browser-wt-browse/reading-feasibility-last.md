Recommend separate `markdown` and `text` tools, retain `look` for interaction, and retain the library’s `read()` capture with its `markdown()` and `text()` projections. Remove the agent `read` tool and its ignored `what` argument without an alias. Keep item 11’s capture substrate and both dependency floors unchanged. This design is feasible for the substrate’s declared coverage; it does not resolve item 11’s outstanding exactness claims.

The measured complete tool definitions occupy **6,463 UTF-16 code units**, including item 12’s `absent` argument, against the existing **6,050** bound. After shortening the proposed copy, the permitted replacement bound is **6,500**. The baseline is **6,023**. Measurements describe checkout `9541dbb` with the supplied partial edits, not an implemented item 11 capture.

**1. The axes**

The following axes separate reader needs from representation and transport choices.

| Axis | Reader need | Ruling |
|---|---|---|
| Interaction | Find a control, reference it, and inspect its state. | Cover with `look` / `elements.outline()`. Keep actionable references, names, values, and state separate from prose. |
| Structured content | Preserve headings, link destinations, lists, code, and tables. | Cover with `markdown`. Tables remain the existing lossy GFM projection; cell spans and nested layout are not preserved. |
| Plain content | Obtain words without Markdown punctuation or link destinations. | Cover with `text`. This is structural plain text from the capture, not `innerText`, OCR, or a screen-reader transcript. |
| Selection | Read a document, frame, element, or named region. | Cover through library ownership: view/page/frame/element `read()`. Tools gain optional `ref`; an omitted reference means the current document. Arbitrary region discovery remains the library’s query capability. |
| Editorial relevance | Read only an article, or answer a question about the page. | Defer a dedicated main-content method. Refuse question answering as an implicit browser operation. Item 11 neutralizes the regions that an article selector would need. |
| Visual inclusion | Exclude collapsed and hidden content while keeping document content outside the viewport. | Inherit item 11’s bounded layout pruning and lowering. Refuse an “exactly what a person sees” promise. No `visible`, `hidden`, or viewport switch in these projections. |
| Semantic state | Distinguish pressed, expanded, selected, checked, and disabled. | Cover through outlines and existing accessibility diagnostics. A checkbox’s submission value is not printed prose. |
| Links, images, tables, forms | Obtain particular content categories. | Cover the existing Markdown/text/outline representations. Defer dedicated `links`, `images`, `tables`, and `forms` APIs until a consumer requires their structured schemas. |
| Metadata | Obtain document title and address. | Retain `reading.title`, `reading.url`, `view.title()`, and `view.url`. Defer a metadata aggregator for description, canonical address, and language. |
| Source and diagnostics | Inspect captured markup, DOM structure, accessibility, or pixels. | Retain `reading.html`, page `snapshot()`, `accessibility.snapshot()`, and screenshot APIs. Do not advertise normalized capture as original source. No additional diagnostic agent tool in this change. |
| Time | Continue one observation, refresh it, or wait for a condition. | Retain immutable readings and explicit offset-0 refresh. Keep `wait`, including `absent`, as a condition rather than a reading. Defer automatic differences and subscriptions. |
| Extent | Read child frames and shadow content. | Respect each placement’s reach. No recursive frame aggregation or shadow-text expansion added to item 11’s capture. |
| Delivery | Bound output and resume it without losing characters. | Retain UTF-16 offsets, line-ended slices, surrogate-pair protection, and continuation footers. Bound the body separately from the footer. |
| Interpretation | Summarize, infer facts, translate, or fill a schema. | Refuse inside this mechanism. The caller interprets the returned evidence. |

These distinctions follow the recorded gaps at `tmp/codex/reading-surface-map.md:246` and the substrate limitations at `tmp/codex/browse-11-design.md:99` and `:107`. The existing handler ignores `what` at `src/core/BrowserToolset.ts:736`; promising relevance without implementing selection is incorrect.

**2. The method set**

Keep capture, projection, interaction, and waiting as separate operations. Do not add convenience `page.text()` or `page.markdown()` wrappers: the reading object supplies the retention boundary and avoids another capture for every projection.

| Method or property | Newcomer description and return | What it leaves out | Surface and placement |
|---|---|---|---|
| `read()` | Captures this document or element so you can read the same content in different forms; returns `Promise<BrowserReadingInterface>`. | Subsequent edits; child-document bodies; shadow-root text under item 11; exact native painting. | Library view/page/frame/element; CDP and DOM where the document is reachable. |
| `reading.markdown()` / tool `markdown` | Reads content with headings, links, lists, code, and tables preserved as Markdown. Library returns `{ text, offset, total }`; tool returns a bounded string and continuation footer. | Action references, full layout, some table structure, original markup, and unsupported capture content. | Both surfaces, both placements. |
| `reading.text()` / tool `text` | Reads the captured words with structural line breaks and no Markdown syntax. Same result shapes as Markdown. | Link destinations, heading levels, emphasis, list markers, image `alt` attributes, and exact screen whitespace. Item 11’s lowered graphic alternatives are ordinary text and can survive. | Both surfaces, both placements. |
| `elements.outline()` / tool `look` | Shows page text and controls with references you can act on. Library returns `BrowserOutline`, including counts, matches, and focus; tool returns its paged text. | Full accessibility properties, most noninteractive roles, heading levels, and visual fidelity. | Both surfaces; native accessibility through CDP, DOM approximation in the browser placement. |
| `wait(text, options)` / tool `wait` | Waits until the named text is present or absent. Library resolves `void`; tool returns a condition receipt or timeout. | Page content, proof that absent text was previously present, and control-value or outline-token assertions. | Both surfaces; retain their declared navigation differences. |
| `reading.html` | Exposes the parsed markup captured for this reading; returns `HTMLInterface`. | Original source bytes, removed secrets, live DOM identity, and content already excluded by capture. | Library, both placements. Keep a property, not another capture method. |
| `accessibility.snapshot()` | Returns the browser’s accessibility nodes and roots for inspection. | Visual truth, screenshot pixels, and a DOM-placement equivalent with identical semantics. | Library, CDP only. |
| `page.snapshot()` | Returns structured DOM documents, nodes, and requested layout information. | A ready-to-read prose projection or an automatically redacted agent reading. | Library, CDP only. |

Projection methods are separate because their algorithms discard different information. A format-selecting `read({ format })` would select those algorithms behind a discriminator, contrary to `../scaffold/.claude/rules/names.md:64`. `look` carries actionable identity and state, while `wait` establishes a temporal condition; neither is a formatting option. `read()` owns a captured object rather than choosing an output representation. The existing implementation already parses once and caches projections independently (`src/core/BrowserReading.ts:34`, `:64`, `:74`).

The options tune each operation without creating another method.

| Operation | Option, type, default | Effect and reason it is an option |
|---|---|---|
| Library `read()` | `timeout?: number`, inherited client deadline; `signal?: AbortSignal`, undefined | Bound or cancel capture. These control its execution, not its meaning. DOM synchronous capture cannot be preempted midway by a timer. |
| Library `markdown()` and `text()` | `distill?: boolean`, true | Apply the existing HTML distillation pass before projection; false projects the captured handle directly. Retain this actual binary operation and its dependency meaning. |
| Same | `offset?: number`, 0; `limit?: number`, unbounded | Non-negative integer start and positive integer maximum, in UTF-16 code units. These page one projection. |
| Tools `markdown` and `text` | `offset: integer`, required, no schema default | Use 0 to capture afresh or the returned offset to continue. Requiring a meaningful paging argument satisfies the existing parser constraint without inventing another ignored `what`. |
| Same | `ref?: string`, undefined | Scope to an existing element reference. Omission selects the current document. Repeat the reference when continuing. Refuse malformed or unknown references on a fresh capture. |
| Library `outline()` | `limit?: number`, 150; `within?: string`, undefined; `search?: string`, undefined; `timeout?`, `signal?` | Limit referenced rows, select a referenced subtree, rank matching rows, or control execution. These preserve the outline result model. |
| Tool `look` | `what: string`, required; `offset?: integer`, 0 | Preserve its existing whole-word control search and paging. `what` promotes matching actionable rows; it is not a semantic question. |
| Library text/element `wait` | `absent?: boolean`, false; `timeout?: number`, CDP text 30,000 ms and DOM text 5,000 ms; `signal?`, undefined | Negate the same predicate, bound it, or abort. Keep item 12’s `BrowserWaitOptions` rename. Element waits retain their query-based predicate and inherited deadlines. |
| Tool `wait` | `text: string`, required; `absent?: boolean`, false; `timeout?: integer`, 5 seconds, maximum 30 | Same condition through the tool boundary. No separate `gone` method. |
| `accessibility.snapshot()` | `root?: number`, undefined; `depth?: number`, undefined | Select a backend-node subtree or bound full-tree depth. Rooted capture uses the partial-tree protocol path; do not promise that `depth` also limits that path. |
| `page.snapshot()` | `styles?: readonly string[]`, empty; `paint?: boolean`, false; `rects?: boolean`, false; `limit?: number`, 100,000 nodes | Request diagnostic fields and bound decoded population. No diagnostic option is promoted to a prose tool. |

The option contracts are at `src/core/types.ts:2246`, `:2393`, `:2660`, `:609`, and `:3255`; defaults are implemented at `src/core/BrowserPage.ts:701`, `src/core/constants.ts:96`, and `src/browser/constants.ts:7`. `reading.html`, `reading.url`, `reading.title`, and `reading.stale` take no options. Existing screenshot options and APIs remain unchanged; screenshot is a separate pixel-reading capability, not a projection of `BrowserReading` (`src/core/types.ts:490`).

Do not expose `distill` on the proposed tools. Item 11 neutralizes boilerplate and region wrappers so supported visible prose survives default distillation (`tmp/codex/browse-11-design.md:99`). Consequently `distill: true` cannot honestly mean “main article” on that substrate. It still means the concrete dependency pass: normalization, sanitization, and URL resolution. Caller-supplied HTML retains the existing difference between true and false. A future main-content operation needs selection before region identity is discarded; it cannot reconstruct that identity from the normalized capture.

Preserve the existing reading lifetime, with a stricter continuation identity. Retain one active tool reading keyed by view identity, source reference or undefined, projection method, and the source’s existing navigation epoch. Offset 0 always captures. A continuation with matching identity reuses the capture even after a DOM edit. A changed method, reference, view, stale epoch, or missing reading captures and starts at 0. An offset at or beyond the retained end restarts that retained projection at 0, matching the existing tool behavior. A library slice past the end remains an empty slice; it does not recapture. Do not add a refresh flag or mutation polling.

The snapshot’s content remains valid historical evidence when `stale` becomes true. The flag is navigation validity, not mutation freshness. For an element continuation, retain the captured reading rather than resolving the live element on every slice; a fresh read must resolve the reference again. Preserve library behavior for readings without an epoch source, whose `stale` remains false (`src/core/BrowserReading.ts:60`, `src/core/elements/BrowserPageElement.ts:103`, `src/browser/elements/BrowserDOMElement.ts:138`). No history manager or second freshness flag is needed.

Preserve the 4,000-character body contract. The footer is appended outside that limit; the measured `look` and `read` responses exceed 4,000 characters for this reason. Offset arithmetic counts projection text only, excluding move notes, promoted matches, and footers. Retain the newline boundary, surrogate-pair protection, and inability-to-advance refusal. Footers name `markdown` or `text`, and a scoped continuation must repeat `ref`. The handler must not clip a projection after calculating a larger continuation offset (`src/core/helpers.ts:1980`, `src/core/BrowserToolset.ts:785`, `:803`).

**3. The tool surface**

The following table gives the complete proposed native vocabulary and exact one-line descriptions. An asterisk marks a required argument; optional arguments are omitted by default unless a default is stated. Existing action and journey argument semantics remain intact.

| Tool | Arguments | Exact description |
|---|---|---|
| `look` | `what*: string`, `offset?: integer = 0` | Shows the page’s text and the elements you can act on, each with a reference like e4. Call it first and after the page changes. |
| `markdown` | `offset*: integer`, `ref?: string` | Reads content as Markdown. Call it for headings, links, and tables. |
| `text` | `offset*: integer`, `ref?: string` | Reads content as plain text. Call it for words without Markdown syntax. |
| `click` | `ref*: string` | Clicks the element with that reference. |
| `type` | `ref*: string`, `text*: string`, `submit?: boolean = false`, `secret?: boolean = false` | Types into the text control with that reference; set submit to true to submit its form. |
| `press` | `key*: string` | Presses that key or chord, such as Enter or Control+a. |
| `navigate` | `url*: string` | Opens that absolute web address in the current tab. |
| `wait` | `text*: string`, `timeout?: integer = 5`, `absent?: boolean = false` | Waits for text to appear; set absent to true to wait for it to leave. |
| `dialog` | `accept*: boolean`, `text?: string` | Accepts or dismisses the open dialog. |
| `tabs` | `what*: string` | Lists the open tabs; the current one is marked. |
| `switch` | `tab*: string` | Switches to a tab from tabs, such as t2. |
| `record` | `journey*: string` | Starts recording your next actions as a journey with that name; call save when it is done. |
| `save` | `description*: string` | Stops recording and saves the journey; describe what it achieves in one sentence. |
| `journeys` | `what*: string`, `offset?: integer = 0` | Lists the saved journeys with their steps and the parameters each one takes. |
| `edit` | `journey*: string`, `edits*: array or JSON string` | Changes a saved journey: add, remove, or update steps by their ids from journeys, or declare a parameter. |
| `replay` | `journey*: string`, `inputs?: Record<string, string>` | Replays a saved journey step by step; give each parameter’s value under inputs. |
| `forget` | `journey*: string` | Removes a saved journey and all its runs; the name is free to record again. |

Each `edit` entry retains required `operation` (`add`, `remove`, `update`, or `declare`) and optional `id`, `step`, `before`, `after`, `ref`, `arguments`, `name`, and `parameter`. Its complete unchanged schema, and every parameter description, are included in `tmp/codex/reading-feasibility-definitions.json`.

Both proposed reading tools annotate `pure` and `untrusted`. They replace `read` in the native registrations, reserved names, hold-admission observation list, and recorder non-step list. Page-backed tools add `press` and `navigate`; context-backed tools add `tabs` and `switch`; DOM-backed tools retain their smaller action surface. Journey tools remain conditional. `dialog` remains staged only for a page that exposes it (`src/core/BrowserToolset.ts:272`).

Rule `read.what` as removed, not repurposed. The tool itself is replaced. `markdown({ offset: 0 })` is the explicit migration for the old Markdown reading; `text({ offset: 0 })` serves the requested plain-text need. Neither accepts `what`, and neither claims to find the requested fact. Keep `look.what` because it has implemented matching semantics. The unused `tabs.what` and journey-list compatibility arguments are outside this page-reading change.

Allow both reading tools during a replay hold and exclude them from recorded steps. Keep `wait` allowed during a hold but record successful waits outside a hold as journey assertions. This distinction follows `src/core/BrowserToolset.ts:644`, `src/core/constants.ts:431`, `:903`, and `src/core/recorders/BrowserRecorder.ts:112`. Do not add either reading method to `BROWSER_JOURNEY_ACTIONS`.

Refuse both reading tools while a JavaScript dialog is open, including requests that could return a retained slice. Perform that check before touching the cache, preserving `src/core/BrowserToolset.ts:649`. DOM execution cannot work around a native dialog that blocks its own JavaScript thread. An HTML `<dialog>` is different: its content follows item 11’s layout capture rules. Action receipts keep their existing fresh, bounded outlines; adding a complete content capture to every action would impose capture and projection work without changing the action’s purpose.

The budget measurement uses the exact test expression: `JSON.stringify(Object.values(copy).map(({ name, description, parameters }) => ({ name, description, parameters }))).length`. Annotations, transport envelopes, and page-adopted tools are excluded, as in `tests/src/core/BrowserToolset.test.ts:775`. The result is 6,023 before and 6,463 after, a 440-character increase. The candidate has already shortened the reading descriptions and argument copy. Apply the ruled smallest-multiple-of-50 policy: **6,500**, with 37 characters remaining. Update the guide’s stale 5,900 figure. This is a proposal, not a changed test bound (`../scaffold/.orkestrel/veneer/showcase/browse.md:53`).

**4. Naming defense**

Use the method name to identify the reading, and options to select its extent or execution constraints.

| Name | Expectation, prior-art fit, and strongest alternatives |
|---|---|
| `text` | Means words without markup. Retain the established library spelling and explicitly describe structural text. `plain` does not name the returned thing; `read` conceals which representation is returned. Jina uses `text` for `innerText`, so the definition must state this difference. |
| `markdown` | Names the returned representation directly. `read` conceals structure; `content` collides with HTML-returning browser APIs and says nothing about format. Match the existing projection and common scraping terminology. |
| `read` on a view/frame/element | Obtains a reading from its owner. `capture` also suggests pixels, DOM snapshots, or accessibility; `snapshot` already names a materially different library entity. Retain it only at the capture layer. |
| `look` / `outline` | `look` orients an agent before action; `outline` describes the library’s ordered, reduced structure. `snapshot` collides with accessibility and image meanings; `observe` can imply ongoing monitoring or suggested actions. Keep the existing names and their explicit descriptions. |
| `html` | Identifies the parsed markup representation. `source` falsely suggests original bytes; `raw` falsely suggests no pruning, lowering, or privacy filtering. |
| `accessibility.snapshot` / `page.snapshot` | The owning entity disambiguates the structured capture. `tree` understates retained properties and documents; `inspect` does not identify the result. Keep existing diagnostics rather than creating another agent synonym. |
| `wait` | Names a temporal operation. `gone` splits a boolean condition; `assert` suggests an immediate check and hides the deadline. |
| `distill` | Keeps the exact existing dependency operation. `main` promises a region that normalization has erased; `clean` implies sanitization only. Retain it for library callers, omit it from tool copy. |
| `ref` | Matches the reference supplied by `look` and consumed by actions. `selector` promises CSS; `within` sounds descendant-only and differs from the selected element’s own `read()`. |
| `offset`, `limit` | Reuse the established character-index and maximum-length vocabulary. `page`/`size` suggests page numbering; `start`/`length` obscures whether the second number is requested or total length. |
| `search`, `what` | Retain the library’s search term and the working tool’s user wording. `query` suggests selectors or a richer query language; `question` promises interpretation. Neither belongs on the projection tools. |
| `absent` | States the predicate’s polarity. `gone` implies a previous presence; `disappear` names a transition the existing first-check behavior does not require. |
| `stale` | Retain the existing navigation-validity flag with its explicit definition. `fresh` implies mutation freshness; `changed` implies comparison of content. |
| `timeout`, `signal` | Match the shared execution contract. `duration` describes elapsed time rather than a deadline; `cancel` conflicts with the fixed abort vocabulary. |

Names and options on unchanged action, journey, screenshot, and diagnostic APIs are retained, not offered as alternative page-reading designs. Their schemas remain the existing contracts; this proposal adds no synonyms for them.

Primary-source checks confirm the relevant collisions. Playwright distinguishes `innerText` from `textContent` and defines ARIA snapshots as structured role/name output; see [Playwright Locator](https://playwright.dev/docs/api/class-locator). Jina explicitly maps its `text` format to `document.body.innerText` and `html` to `documentElement.outerHTML`; see [Jina Reader](https://github.com/jina-ai/reader). Stagehand’s `extract()` can produce schema-shaped results, while its no-argument call returns accessibility text; see [Stagehand Extract](https://docs.stagehand.dev/v3/basics/extract). Those meanings make `extract` unsuitable for a deterministic projection here.

The supplied comparison of Playwright MCP, DevTools MCP, Puppeteer, BiDi, browser-use, Firecrawl, Readability, Crawl4AI, and MCP fetch remains supporting naming evidence (`tmp/codex/reading-prior-art.md:5`). It supplies no justification for importing their dependencies or adding their full feature sets. In particular, `main`, `raw`, `fit`, and `summary` each imply semantics this capture does not provide.

**5. Migration**

Change consumers atomically. Keep library capture and projection signatures; the breaking vocabulary change is at the agent-tool boundary. The following edit inventory distinguishes that work from the already-owned item 11 and item 12 work.

| Contract or consumer | Required migration |
|---|---|
| `src/core/types.ts:2764`, `:2908` | Replace tool-name `read` with `markdown` and `text`; update native-vocabulary remarks. Preserve `BrowserReadingInterface`, `BrowserReadOptions`, `BrowserReadResult`, `html`, and all library `read()` signatures. Clarify retained-snapshot semantics in reading/toolset remarks. |
| `src/core/constants.ts:431`, `:479`, `:509`, `:545`, `:903` | Replace the observation, reserved-name, and copy entries; declare required `offset` and optional `ref`; remove `what` from these readings. Non-step names derive from observations. Update tool-copy remarks. Keep journey actions unchanged. |
| `src/core/BrowserToolset.ts:100`, `:226`, `:272`, `:736`, `:770`, `:792` | Update advertised lists, retention identity, registrations, projection handlers, argument validation, and method-specific continuation footers. Share capture/retention/slicing machinery; do not duplicate the reading engine or introduce a public mode dispatcher. Refuse unknown fresh references before capture. |
| `src/core/factories.ts:135` | Update the advertised-tool example. |
| `src/server/BrowserMCPServer.ts:104` | Its dispatcher names derive from constants; verify the changed list before browser launch and after forwarding. Do not add a `read` alias. |
| `tests/src/core/BrowserToolset.test.ts:775`, `:796`, `:878`, `:968`, `:4783`, `:4832`, `:5576`, `:5611`, `:5768` | Update vocabulary and bound; replace tool `read` calls; test both representations, reference scoping, missing/invalid offset, obsolete `what`, method/source switches, retention, navigation, move-note arithmetic, end restart, Unicode progress, holds, and dialog refusal. Replace the old blanket `ref` refusal with scoped-read success plus unknown/malformed-reference refusal. |
| `tests/src/core/recorders/BrowserRecorder.test.ts:222` | Replace `read` in the non-step matrix with both projection tools. Verify observations do not create target steps even when `ref` names a child-frame element. |
| `tests/service/toolset.test.ts:432` | Migrate the confirmation read to `markdown` with offset 0; add the plain-text reading and real scoped-control coverage after item 11. |
| `tests/service/journey.test.ts:566` | Exercise both observations during the held replay; keep successful `wait` conditions as steps. |
| `tests/src/browser/factories.test.ts:28` | Update the DOM native tool list and exercise both projections through the real DOM toolset. |
| `tests/setupServer.ts:1887`, `tests/src/server/BrowserMCPServer.test.ts`, `tests/guides.test.ts:64`, `:180` | Update tool-list fixtures and guide transcriptions; prove MCP schemas and forwarding agree. |
| `tests/src/core/BrowserReading.test.ts`, DOM helpers/view tests, CDP frame/element/service reading tests | Retain existing projection behavior. Item 11 adds the capture/lowering/privacy proofs listed in `tmp/codex/browse-11-design.md:111`; this proposal consumes them and must not overwrite the supplied partial edits. Test caches against genuinely different Markdown/text output. |
| `guides/browser.md:225`, `:229`, `:303`, `:307`, `:1905`, `:1926`, `:2064`, `:2261`, `:2865`, `:2870`, `:2893`, `:2931`, `:2952`, `:2986`, `:3069`, `:3138`, `:3499`, `:3545` | Update live vocabulary, descriptions, schemas, error/continuation examples, scope, retained readings, holds, recorder exclusions, MCP registration, and DOM bridge examples. Replace the `read` tool row with both projection rows. |
| `guides/browser.md:1837`, `:1853`, `:2969`, `:3133` | Explain that distillation is not article selection after normalization; qualify the “navigation and footer included” example for caller-supplied HTML; set the measured bound to 6,500; preserve capture/projection invariants. |
| `guides/browser.md:3395` through `:3403` | Preserve the dated historical model-run evidence. Label it as the earlier vocabulary; do not rewrite old calls as runs of the proposed tools. Re-measure consumers at re-pin rather than claiming old runs validate the new names. |
| Item 12 contracts and consumers | Carry its ruled `BrowserElementWaitOptions` → `BrowserWaitOptions` rename, `absent` propagation, event wakeups, receipts, validation, recorder/replay/compiler coverage, and guide rows. Its exact file/test/guide inventory is `tmp/browse-item-12-design.md:238` onward, as amended by `../scaffold/.orkestrel/veneer/showcase/browse.md:53`. Use the shorter `wait` copy measured here. |
| Saved journeys | No reading-step migration: observations were never native steps. Existing appearance waits keep their semantics; authored exit checks gain `absent: true`. Preserve appearance-before-dismissal evidence to prevent vacuous replay success. |
| Downstream tools and guide mirrors | Replace native tool `read` calls with `markdown({ offset: 0 })`, or `text` when requested; remove `what`, carry continuation offsets, and repeat `ref`. Refresh scaffold/veneer guide mirrors through their release/re-pin workflow, not edits to scaffold-owned files here. |
| `ROADMAP.md:7` and item 12 | Keep item 11 open for its unresolved capture fidelity cases. Do not claim this naming design closes it. Item 12 closes only after its prescribed implementation and evidence. |

Literal `read` strings in `tests/setup.ts:2800` describe library capture calls and stay. Policy-reader `read` outcomes in `tests/setupPolicy.ts` also stay. This is a contract migration, not a global text replacement. The library method rows at `guides/browser.md:1642`, `:1677`, `:1712`, `:1777`, `:1812`, and `:2825` retain their names and receive item 11’s capture wording only.

**6. Risks and open questions for the user**

The following decisions need to remain explicit during implementation; each has a recommended disposition.

- **Exact visual fidelity:** accept only the capture’s named coverage. Native default submit/reset/file captions, localized dates, intermediate number edits, placeholders, partial clipping, and meaningful MathML remain unresolved. SVG painted text needs preservation distinct from graphic alternatives. Do not substitute accessible names or `.value` and call that exact rendering (`tmp/codex/browse-11-design.md:62`, `:107`, `:148`).
- **Main-content demand:** defer it. Supporting both all captured prose and automatic article selection requires preserving or selecting live region identity before normalization. A boolean on the normalized reading cannot recover deleted information.
- **Markup privacy:** require item 11’s password/hidden-input redaction before exposing any capture, including `reading.html` and detached-document fallbacks. `distill: false` must never be a privacy bypass. Plain text and Markdown remain untrusted page content.
- **Frames and shadow roots:** document partial reach rather than aggregate implicitly. CDP can read an explicit child frame and outline across attached frame sessions. DOM can drive reachable same-origin frame documents; cross-origin frames remain unreadable. An `iframe` element read is not its document read. Item 11 excludes shadow-root text from document capture; a directly addressed reachable shadow element can be scoped separately, but does not establish complete closed-root support. DOM outlines traverse open roots and slot assignments; CDP outlines follow Chromium accessibility. These are different capture populations (`src/core/elements/BrowserElementManager.ts:289`, `src/browser/elements/BrowserDOMElementManager.ts:264`).
- **Reference reach:** add optional `ref` now because the existing per-element reader is a real consumer-backed capability. It does not make every paragraph or landmark discoverable through `look`; keep arbitrary region selection at the library level until an agent discovery method is separately specified.
- **State versus prose:** keep action receipts as outlines and reserve projection tools for content. DOM and CDP outlines were different sizes in this run. Neither outline proves visual completeness, and accessibility membership can exclude painted modal backgrounds.
- **Wait agreement:** keep `wait` tied to the ruled main-body `innerText` predicate. It cannot assert a lowered control value or graphic alternative merely because a content reading contains it. Preserve item 12’s event gates and navigation difference: CDP can re-arm and settle absence after navigation, whereas DOM `pagehide` refuses with `GONE`. A successful absent wait does not prove disappearance without preceding presence.
- **Freshness and memory:** retain one active capture, compute only requested projections, and clear it on toolset destruction. Document offset-0 refresh. Do not label DOM-edit-stable readings “live.” The capture limit applies before parsing; a small output slice does not prevent a large capture or allocation.
- **Tool names and cost:** accept explicit `markdown` and `text` names with the measured 6,500 bound. Keeping `read` as an additional alias costs vocabulary and violates the no-shim rule; replacing it with a format dispatcher conflicts with the naming rule. Required offset 0 is a transport constraint with observable purpose.
- **Performance acceptance:** remeasure after item 11 lands. Its paired layout traversal and lowering have not been implemented here. The timings below are baseline capture/projection costs, not a forecast or acceptance proof for that implementation. No numerical claim about its eventual overhead is established.

**Measurements**

The successful measurement command was `npm run test:probe -- tmp/probes/reading-feasibility.test.ts`, run on 2026-10-03 at 08:41:46 local time. Vitest 4.1.11 reported **1 passed**, exit **0**, test duration **35.42 s**. Node was **24.21.0**; browser was **Edge 154.0.4258.53**, V8 **15.4.11.7**, CDP **1.3**, headless Windows. The probe served the existing `C:/Users/mikes/WebstormProjects/veneer/showcase/browser.html` through Vite preview with `configFile: false`, `outDir: showcase`, loopback host, and an ephemeral port. It did not rebuild or write the veneer checkout.

The page was the initial Bootstrap-only light showcase, viewport **1400 × 1000**, after its Components text and fonts were ready. The measured population contained **15,388 elements** and **0 iframe elements**. The screenshot was inspected. Browser frame/shadow/control limitations outside that population come from the cited source and supplied item 11 evidence, not this timing run.

The following table reports medians and observed ranges from **5 sequential samples**, without browser-launch cost. These are descriptive timings on a shared host, not uncertainty-bounded benchmarks or a claimed speedup ratio. Sizes are UTF-16 code units unless stated otherwise.

| Reading or stage | Median ms | Range ms | Complete output size / meaning |
|---|---:|---:|---|
| CDP raw capture, guarded evaluation and transfer | 102.528 | 94.369–115.631 | 2,307,806 serialized capture; HTML alone 2,145,198 |
| CDP `page.read()`, including parse | 377.506 | 291.792–472.781 | Reading handle; its separately serialized HTML AST measured 3,773,427 |
| DOM `readBrowserCapture()` | 16.400 | 13.900–23.400 | 2,307,806 serialized capture |
| DOM `view.read()`, including parse | 235.000 | 193.600–331.700 | Same captured HTML population |
| CDP body `innerText` | 6.472 | 4.857–10.643 | 71,968 |
| CDP body `textContent` | 5.539 | 4.828–8.985 | 102,151 |
| CDP complete outline | 941.464 | 872.138–1,110.272 | 75,924 |
| DOM complete outline | 236.700 | 199.100–290.300 | 79,050 |
| CDP accessibility snapshot, including serialization | 902.816 | 773.944–982.574 | 3,470,596 |
| CDP DOM snapshot documents, including serialization | 424.200 | 372.757–466.425 | 7,750,387–7,750,974 |
| Existing `look`, including capture and first reply | 1,002.607 | 845.146–1,036.656 | 4,066 including footer |
| Existing `read`, including capture and first reply | 504.208 | 436.714–669.139 | 4,030 including footer |
| DOM Markdown projection, distill true | 149.800 | 126.100–200.900 | 88,053 |
| DOM text projection after Markdown shared distillation | 6.500 | 5.300–14.600 | 66,852 |
| Viewport PNG through Playwright, one sample | 110.172 | — | 83,489 bytes; no OCR or text projection |

The screenshot row measures the probe’s Playwright capture, not an Orkestrel screenshot timing. The `page.read()` timing ends before the diagnostic AST serialization. The DOM capture and read timings are separate operations. The following host-side projection measurements create a fresh reading for each method and distillation setting; parse and projection are timed separately.

| Projection | Parse median ms | Projection median ms (range) | Output characters | 4,000-character slices | Cached slice median ms |
|---|---:|---:|---:|---:|---:|
| Markdown, distill true | 247.395 | 219.425 (125.824–272.023) | 88,053 | 23 | 0.023 |
| Markdown, distill false | 205.251 | 61.776 (48.334–113.810) | 90,033 | 23 | 0.009 |
| Text, distill true | 293.801 | 158.192 (112.934–172.586) | 66,852 | 17 | 0.242 |
| Text, distill false | 230.076 | 16.141 (12.669–26.651) | 73,691 | 19 | 0.330 |

Each slice count was obtained by repeatedly advancing by the actual returned slice length, including its line-boundary behavior. Cached-slice timings measure offset 4,000 with limit 4,000. The DOM text-after-Markdown row reuses distillation and is therefore not comparable to a cold text projection. The original HTML capture remains below `BROWSER_RESULT_LIMIT` at 2,500,000 serialized characters; normalized item 11 captures must be measured after lowering, not against this baseline.

The measurements support retaining the capture and projection caches and offering plain text for readers that do not need Markdown structure. They do not support using `innerText` or `textContent` as interchangeable faster implementations: their populations and control semantics differ. Nor do the small differences between distilled and undistilled sizes prove that future normalized captures can recover article boundaries.

The instrument checked outside-region and link-destination controls to distinguish distillation from representation. It also added a visible marker after capture: the retained reading excluded it with `stale === false`, while a fresh reading included it. A deliberately doubled definition list failed the vocabulary-bound assertion, caught as the instrument’s negative control. These checks prove the measured paths distinguish the relevant cases; they are not production acceptance of proposed tools or item 11.

Artifacts are `tmp/codex/reading-feasibility-measurements.json`, `reading-feasibility-definitions.json`, `reading-feasibility.png`, and `reading-feasibility-probe.test.ts`. Reproduce with `node tmp/codex/reading-feasibility-run.ts`; it restores the archived probe under `tmp/probes/`, runs the scoped Vitest command, and removes that probe afterward. `node tmp/codex/reading-feasibility-summary.ts` renders the recorded tables. No tracked file was changed, no commit was made, and no agent was spawned.