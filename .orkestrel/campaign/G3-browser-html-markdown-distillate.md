<!-- journal: tmp/cursor/G3-browser-html-markdown.jsonl | session: 9d363116-c68f-4317-a197-64c4863d9f9b | subtype: success | duration_ms: 317343 | events: 1195 -->

I'll read the brief and the governing instruction files first, then follow the brief exactly.The brief is a read-only grok lane. I'll absorb the scoped files in the order it lists, then return only the specified output shape.I'll read the contracts and the page-reading implementations next, then the HTML and Markdown surfaces.I'll fill remaining launch, factory, HTML/Markdown, and test evidence next.Question: Under the contracts published today, how does `@orkestrel/browser` let a consumer read a page (snapshot, accessibility tree, HTML, text) and act on it; what does `@orkestrel/html` parse and into what structure; and can `@orkestrel/markdown` turn HTML (or an HTML tree) into Markdown?

Evidence:

1. Barrel and environment map.
- `browser/src/` has `core/` and `server/` only; no `src/browser` directory (`browser/src` listing).
- Package exports `.` → `dist/src/core` and `./server` → `dist/src/server` (`browser/package.json:31-51`).
- Core barrel `browser/src/core/index.ts:1-35` re-exports types, constants, errors, helpers, parsers, compilers, factories, then these classes:
  - navigate: `BrowserPage` — top-level page, target lifecycle, child frames (`BrowserPage.ts:74`); `BrowserNavigationManager` — URL/predicate waits (`BrowserNavigationManager.ts:13`); `BrowserContext` — pages and shared state in one Chromium context (`BrowserContext.ts:33`).
  - read: `BrowserSnapshot` — navigable serializable DOM snapshot (`BrowserSnapshot.ts:16`); `BrowserAccessibility` — Accessibility-domain snapshots (`BrowserAccessibility.ts:10`); `BrowserFrame` — one attached document frame (`BrowserFrame.ts:29`).
  - act: `BrowserLocator` — strict semantic locator (`BrowserLocator.ts:44`); `BrowserSelectorManager` — locator factories (`BrowserSelectorManager.ts:11`); `BrowserKeyboard` / `BrowserMouse` / `BrowserTouch` — CDP Input (`BrowserKeyboard.ts:14`, `BrowserMouse.ts:16`, `BrowserTouch.ts:5`); `BrowserCodegen` — records interactions and compiles replay scripts (`BrowserCodegen.ts:20`).
  - observe: `BrowserNetworkManager` — Network/Fetch lifecycle (`BrowserNetworkManager.ts:35`); `BrowserHARManager` — HAR record/replay (`BrowserHARManager.ts:26`); `BrowserWebSocket` — Network-domain WebSocket (`BrowserWebSocket.ts:10`); `BrowserDiagnostics` — tracing/coverage/performance/profiler group (`BrowserDiagnostics.ts:16`); `BrowserCoverage` / `BrowserPerformance` / `BrowserProfiler` / `BrowserTracing` (`BrowserCoverage.ts:15`, `BrowserPerformance.ts:5`, `BrowserProfiler.ts:7`, `BrowserTracing.ts:14`); `BrowserClock` — virtual time (`BrowserClock.ts:8`).
  - configure: `CDPClient` — JSON-RPC CDP over injected transport (`CDPClient.ts:19`); `BrowserTransition` — shared in-flight transition (`BrowserTransition.ts:4`); `BrowserEmulationManager` / `BrowserCookieManager` / `BrowserPermissionManager` / `BrowserStorageManager` / `BrowserScriptManager` (`BrowserEmulationManager.ts:10`, `BrowserCookieManager.ts:13`, `BrowserPermissionManager.ts:3`, `BrowserStorageManager.ts:20`, `BrowserScriptManager.ts:17`).
- Present as files but not in the core barrel: `BrowserHandle`, `BrowserDialog`, `BrowserFileChooser`, `BrowserDownload`, `BrowserRoute`, `BrowserWorker`.
- Server barrel `browser/src/server/index.ts:1-8`: `types` (engine/connection/options/interfaces); `constants` (CDP port/paths/launch flags); `errors`; `helpers` (executable discovery, spawn, CDP wait); `WebSocketCDPTransport` (Node WebSocket CDP pipe); `FileBrowserWriter` (fs sink); `Browser` (discover/launch/connect façade); `factories` (`createBrowser`, `createCDPTransport`, `createBrowserWriter`).

2. How a page is read.
- `DOM.getDocument` does not appear in `browser/src/**`.
- `BrowserSnapshot` is decoded data plus navigation; it does not call CDP. Capture is `BrowserPage.snapshot`. Tree node type: `BrowserNode` (`types.ts:1861-1882`), documents `BrowserDocument` (`types.ts:1885-1894`).
  - `walk(options?: BrowserWalkOptions): Generator<BrowserNode, void, unknown>` `BrowserSnapshot.ts:37`
  - `descendants(node: BrowserNode): Generator<BrowserNode, void, unknown>` `:41`
  - `document(node: BrowserNode): BrowserDocument | undefined` `:52`
  - `children` / `parent` / `siblings` / `ancestors` / `common` / `distance` / `find` / `filter` / `closest` / `path` `:56-158`
  - Parsed tree: yes — `readonly documents: readonly BrowserDocument[]` of `BrowserNode` (`category` is DOM `nodeType` number, `types.ts:1858-1868`).
- `BrowserPage.snapshot(options?: BrowserSnapshotOptions): Promise<BrowserSnapshotInterface>` `types.ts:2082`; impl `BrowserPage.ts:381-392` sends `DOMSnapshot.captureSnapshot` with `computedStyles`, `includePaintOrder`, `includeDOMRects`, then `new BrowserSnapshot(readBrowserSnapshot(...))`. Decoder `helpers.ts:1651` `readBrowserSnapshot(value, styles, limit): BrowserSnapshotInput`.
- `BrowserAccessibility.snapshot(options?: BrowserAccessibilityOptions): Promise<BrowserAccessibilitySnapshot>` `types.ts:498`, `BrowserAccessibility.ts:27`.
  - CDP: `Accessibility.enable` `:29`; if `options.root === undefined` then `Accessibility.getFullAXTree` `{ depth, frameId }` `:33-36`; else `Accessibility.getPartialAXTree` `{ backendNodeId: options.root, fetchRelatives: true }` `:37-40`; `Accessibility.disable` `:43`.
  - Parsed tree: yes — `BrowserAccessibilitySnapshot` `{ roots: readonly string[]; nodes: readonly BrowserAXNode[] }` `types.ts:484-487`; node `BrowserAXNode` `types.ts:469-481`. Decoder `readBrowserAccessibility` `helpers.ts:775`.
  - Options in types: `{ root?: number; depth?: number }` `types.ts:490-493`. Guide example uses `{ interesting: true }` (`browser.md:1415`), which is not on the type.
- `BrowserFrame` / `BrowserPage` (page extends frame `BrowserPage.ts:86`):
  - `title(): Promise<string>` `types.ts:1781`; `BrowserFrame.ts:107-110` evaluates `document.title` via `#evaluate` → `Runtime.evaluate` `BrowserFrame.ts:251`. Isolated world: `Page.createIsolatedWorld` `:260-264`.
  - `content(): Promise<BrowserContentResult>` `types.ts:1783`; `BrowserFrame.ts:113-134`. Parallel `#evaluate('document.title')`, `#captureHTML()` = guarded `document.documentElement.outerHTML` `:234-237`, guarded `document.body ? document.body.innerText : ""` `:118-122`, `location.href`. Result `{ url, title, html, text }` all `string` `types.ts:391-396`. CDP: `Runtime.evaluate` only (plus `Page.createIsolatedWorld`).
  - `article(): Promise<string>` `types.ts:1788`; `BrowserFrame.ts:137-140`: capture HTML string, `renderText(createHTML(html).distill().document)` — returns plain text, not a tree.
  - `evaluate(expression: string, timeout?: number): Promise<unknown>` `types.ts:1801`; `BrowserFrame.ts:162` → guarded `Runtime.evaluate`.
  - `handle(expression: string): Promise<BrowserHandleInterface>` `types.ts:1805`; `BrowserFrame.ts:170-190` `Runtime.evaluate` with `returnByValue: false`.
  - `screenshot` is on page/locator, not frame. `BrowserPage.screenshot(options?: BrowserScreenshotOptions): Promise<BrowserScreenshotResult>` `types.ts:2071`; `BrowserPage.ts:264-349`: `Page.getLayoutMetrics` `:269,:291`; `Runtime.evaluate` (prep/cleanup/devicePixelRatio); `Emulation.setDefaultBackgroundColorOverride` `:329,:344`; `Page.captureScreenshot` `:334`. Returns `{ bytes: Uint8Array; path: string | undefined }` `types.ts:405-408`.
  - `pdf(options?: BrowserPDFOptions): Promise<BrowserPDFResult>` `BrowserPage.ts:352` `Page.printToPDF`.
  - `frames(): Promise<readonly BrowserFrameInterface[]>` `:375` `Page.getFrameTree`.
- `BrowserLocator` read methods (all via `frame.evaluate` → `Runtime.evaluate` compiled locator JS):
  - `text(): Promise<string>` `types.ts:777`; `BrowserLocator.ts:301` `?.innerText`
  - `texts(): Promise<readonly string[]>` `types.ts:779`; `:308`
  - `html(): Promise<string>` `types.ts:781` “inner HTML”; impl `this.#string('outerHTML', ...)` `:318-319,:501-505` — property is `outerHTML`
  - `value(): Promise<string>` `:322`; `attribute(name: string): Promise<string | undefined>` `:329`
  - `screenshot(options?: BrowserScreenshotOptions): Promise<BrowserScreenshotResult>` `:348`: `DOM.getContentQuads` `:498`; `Page.captureScreenshot` `:394`; `Emulation.setDefaultBackgroundColorOverride` `:389`; `Runtime.evaluate` for prep/cleanup
  - `upload` → `DOM.setFileInputFiles` `:420`
  - No locator method returns a parsed tree.
- `BrowserHandle`: `value(): Promise<unknown>` `types.ts:421`; `call`/`property` use `Runtime.callFunctionOn` `BrowserHandle.ts:31,47`; `dispose` `Runtime.releaseObject` `:78`. Not a document tree.

3. Locators.
- `BrowserSelector = 'css' | 'role' | 'text' | 'label' | 'placeholder' | 'testId'` `types.ts:698`. No `xpath` symbol in `browser/src/core`.
- `BROWSER_TEST_ID_ATTRIBUTE = 'data-testid'` `constants.ts:154`.
- `BrowserSelectorManager` factories `BrowserSelectorManager.ts:29-67`: `css`/`role`/`text`/`label`/`placeholder`/`testId` each `new BrowserLocator(frame, { selector, value, ... })`.
- Compilation: `compileLocatorListExpression(query: BrowserQuery): string` `compilers.ts:301`; `compileLocatorExpression` wraps `[0]` `:436`. In-page `switch (candidate.selector)` `:393-415`: `css` → `element.matches`; `role` → inferred/explicit role + optional name; `text` → deepest textContent match; `label` → labelOf; `placeholder` → placeholder attr; `testId` → `data-testid`. Shadow-inclusive walk `:306-323`. Optional `filter.text` / `filter.visible` / `index` `:418-423`.

4. `@orkestrel/html` usage in browser.
- Sole import in `browser/src/**`: `import { createHTML, renderText } from '@orkestrel/html'` `BrowserFrame.ts:26`.
- Sole call site `article()` `BrowserFrame.ts:137-140`: `renderText(createHTML(html).distill().document)` — parse HTML string, distill, project to plain text.

5. `@orkestrel/html` surface.
- Barrel `html/src/core/index.ts:1-8`: `export *` types, constants, validators, parsers, helpers, shapers, factories, `HTML`.
- Host: runtime dep `@orkestrel/contract` only (`html/package.json:75-77`). `html/src` has no `node:` imports. `HTML.ts` / validators / shapers / helpers import `@orkestrel/contract`.
- Tagline (`guides/html.md:3-6`): “A types-first HTML toolkit: a hand-written, index-based tokenizer that turns any page or fragment into an immutable `HTML` handle over a typed AST, plus the sanitizer, the distiller, and the standalone renderers that project that AST back out as canonical HTML or structural plain text.”
- Heading tree to two levels: `# HTML`; `## Surface`, `## Methods`, `## The AST model`, `## The parse pipeline`, `## Roundtrip laws`, `## The sanitize floor`, `## The distill pass`, `## Text is the lossy projection`, `## Relationship with @orkestrel/contract`, `## Patterns`, `## Tests`, `## See also`.
- Types `html/src/core/types.ts`: `HTMLAttribute` name/value; `HTMLStartTag` / `HTMLTag` scanner tags; `ElementNode` `{ category: 'element', name, attributes, children }`; `TextNode` `{ category: 'text', value }`; `CommentNode`; `DoctypeNode`; `HTMLDocument` `{ category: 'document', children }`; `HTMLNode` union of those; `HTMLSpan`; `HTMLSource`; `HTMLOpenPosition`; `HTMLScan`; `HTMLParseResult`; `HTMLDerivation`; `HTMLRawText`; `HTMLHandler` / `HTMLHandlerMap`; `HTMLRewriteHandler`; `HTMLPruneHandler`; `HTMLSanitizeOptions`; `HTMLDistillOptions` (“prose a reader (or a language model) actually wants”, `types.ts:348`); `HTMLInterface` handle.
- Parse HTML text → tree: `parseDocument(html: string): HTMLDocument` `parsers.ts:43`; `parseProvenance(html: string): HTMLParseResult` `:58`; `createHTML(input: string | HTMLDocument): HTMLInterface` `factories.ts:35`; `class HTML` `HTML.ts:70`. Node kinds: document, element, text, comment, doctype. Attributes on elements; text in `TextNode.value`; children on document/element.
- Serialize tree: `renderHTML(node: HTMLNode): string` `helpers.ts:989`; `renderText(node: HTMLNode): string` `:1141`.
- Query tree: `HTMLInterface.walk/find/filter/reduce/fold/stream/span` `types.ts:418-457`; leaves `walkNodes`, `foldNode`.
- Sanitize / distill: `sanitize(options?: HTMLSanitizeOptions): HTMLInterface` `types.ts:467`; `distill(options?: HTMLDistillOptions): HTMLInterface` `:478`; impl `HTML.ts:236,:280`.
- Fail-closed tag parse: `parseStartTag` `helpers.ts:363`. Other helpers: scanners, entity encode/decode, URL sanitize, `pruneDocument`, etc.
- Validators: `isHTMLNode`, `isHTMLDocument`, `isElementNode`, `isTextNode`, `isCommentNode`, `isDoctypeNode`, `isHTMLAttribute`, `isHTMLCodePoint`.
- Shapers: `attributeShape`, `textShape`, `commentShape`, `doctypeShape`.
- Constants include `VOID_ELEMENTS`, `SAFE_ELEMENTS`, `SAFE_ATTRIBUTES`, `UNSAFE_ELEMENTS`, `CONTENT_ELEMENTS`, `BOILERPLATE_ELEMENTS`, `MAX_DEPTH`, `NAMED_ENTITIES`, …

6. `@orkestrel/markdown` surface.
- Barrel `markdown/src/core/index.ts:1-9`: types, constants, helpers, compilers, parsers, shapers, validators, `Markdown`, factories.
- Tagline (`guides/markdown.md:3-6`): “A types-first markdown layer over `@orkestrel/html`: a linear-time scanner that parses GitHub-Flavored Markdown into a typed AST, a stateful `Markdown` workspace that queries, rewrites, folds, and streams that AST, and standalone projections that carry it out to sanitized HTML or canonical markdown source and carry an HTML AST back in.”
- Heading tree to two levels: `# Markdown`; `## Surface`, `## Methods`, `## The AST model`, `## The parse pipeline`, `## Source provenance`, `## Sanitization policy`, `## renderMarkdown round-trip`, `## htmlToMarkdown projection`, `## Relationship with @orkestrel/contract`, `## Patterns`, `## Tests`, `## See also`.
- Types: scan matches (`ListItemMatch`, `HeadingMatch`, `FenceMatch`, …); `MarkdownSpan`/`Segment`/`Source`; inline `TextNode`/`EmphasisNode`/`CodeSpanNode`/`LineBreakNode`/`LinkNode`/`ImageNode` discriminated by `element`; blocks `HeadingNode`/`ParagraphNode`/`ListItemNode`/`ListNode`/`TableNode`/`CodeBlockNode`/`BlockquoteNode`/`ThematicBreakNode`; `MarkdownDocument`; `MarkdownNode`; `MarkdownCell`; `MarkdownProjection`; `MarkdownHandler`/`Map`; `MarkdownRewriteHandler`; `MarkdownParseResult`; `MarkdownDerivation`; `MarkdownInterface`.
- Directions:
  - Markdown → tree: `parseDocument(markdown: string): MarkdownDocument` `parsers.ts:209`; `createMarkdown(input: string | MarkdownDocument)` `factories.ts:47`.
  - tree → Markdown: `renderMarkdown(node: MarkdownNode): string` `helpers.ts:1742`.
  - Markdown → HTML tree: `markdownToHTML(node: MarkdownNode): HTMLDocument` `helpers.ts:1432`.
  - Markdown → HTML string: `renderHTML(node: MarkdownNode): string` `compilers.ts:32` (sanitize then html `renderHTML`).
  - HTML tree → Markdown tree: `htmlToMarkdown(node: HTMLNode): MarkdownDocument` `helpers.ts:2750`. Takes `HTMLNode`, not an HTML string.
  - HTML string → Markdown: no markdown export; example uses html `parseDocument` then `htmlToMarkdown` (`helpers.ts:2744-2747`).
- `@orkestrel/html` imports:
  - `helpers.ts:1-8` types `CommentNode`, `DoctypeNode`, `ElementNode`, `HTMLDocument`, `HTMLNode`, `TextNode as HTMLTextNode`.
  - `helpers.ts:41-50` values `SAFE_URL_SCHEMES`, `TABLE_ALIGNMENTS`, `UNSAFE_ELEMENTS`, `attributeOf`, `collapseSpace`, `foldNode as foldHTMLNode`, `renderText`, `sanitizeURL` — used by `htmlToMarkdown` fold (`helpers.ts:2750-2762`) and URL/text policy.
  - `compilers.ts:2` `HTML`, `SAFE_ATTRIBUTES`, `renderHTML as renderHTMLDocument` — `renderHTML` constructs `new HTML(markdownToHTML(node)).sanitize({ attributes: [...SAFE_ATTRIBUTES, 'src'] }).document` then serializes (`compilers.ts:32-35`).
- Class `Markdown` wraps `MarkdownDocument` (`Markdown.ts:14`). Factories also `createTextContract` / `createCodeSpanContract` / `createLineBreakContract` / `createCodeBlockContract` / `createThematicBreakContract`.

7. Launch and transport.
- `Browser.connect()` → `#establish` `Browser.ts:293-338`: retained owned endpoint; else explicit `cdp.endpoint` → `#connectCDP`; else if `cdp.discover ?? true` probe `#discoverCDP` and attach if `endpoint` defined; else `#assertPortFree` then `#launch`.
- Discovery: `GET http://{host}:{port}/json/version` (`BROWSER_CDP_PROTOCOL`/`BROWSER_DEFAULT_CDP_PORT=9222`/`BROWSER_CDP_VERSION_PATH='/json/version'` `server/constants.ts:8-23`; `Browser.ts:516-535`). Reads `webSocketDebuggerUrl` and `Browser`.
- Launch `#launch` `Browser.ts:599-678`: executable from `options.executable` or `findSystemBrowser({ ...browsers, engine })` `helpers.ts:107`; profile `createBrowserProfile`; `launchBrowserProcess(executable, cdpPort, headless ?? true, profile.path, options.args)` `helpers.ts:323-344` args: caller `extra`, then `--remote-debugging-port=${port}`, `BROWSER_LAUNCH_ARGS` `--no-first-run` `--no-default-browser-check` (`constants.ts:34-37`), `--headless=new` if headless (`:42`), `--user-data-dir` if profile. Then `waitForCDPReady` polls `/json/version` for `webSocketDebuggerUrl` (`helpers.ts:358`). Edge re-exec: `#takeEndpointOwner` may `SystemInfo.getProcessInfo` `Browser.ts:694-699`.
- `#connectCDP` `Browser.ts:568`: `createCDPTransport({ url: endpoint })` then `new CDPClient({ transport })`.
- `WebSocketCDPTransport` implements `CDPTransportInterface`; RFC 6455 HTTP upgrade then `createNodeWebSocket` from `@orkestrel/websocket` (`WebSocketCDPTransport.ts:24-31,:204`).
- `CDPClient` accepts any `CDPTransportInterface` via `CDPClientOptions.transport` `types.ts:76-77,:30-41`; constructor `CDPClient.ts:67`. Interface: `start`/`send`/`close` plus `emitter`.
- `FileBrowserWriter.write` mkdir + writeFile `FileBrowserWriter.ts:30-32`.
- Service tests `browser/tests/setupService.ts:54-63` `requireSystemBrowser()` → `findSystemBrowser` (optional `BROWSER_COMPATIBILITY_ENGINE`); throws if none. Flags `SERVICE_BROWSER_ARGS` `--no-sandbox` `--disable-dev-shm-usage` `--disable-gpu` `:26-30`.
- `browser/tests/service/browser.test.ts` describe `Browser real launch`; launches via `createBrowser({ executable: REAL_BROWSER_EXECUTABLE, headless: true, profile: temp, args: REAL_BROWSER_ARGS, cdp: { port: reserved } })` then `connect()`. Titles: `creates a page and navigates it in a real browser`; `drives locators, frames, routes, snapshots, accessibility, and PDF in a real browser`; `screenshot returns real PNG bytes from a real browser page`; `launches and destroys a real browser process, fully exiting it`; `connect() with a profile launches with a persistent user-data dir`; `accepts explicit headless option against a real launch`; `an oversized evaluate() result rejects with a coded error and the session survives`; `content() on a huge DOM never crashes the session`; `reattaching over CDP reports the correct page url immediately, before navigate()/content()`; `transport-loss resumability against a real Chromium process, proxied over a raw TCP pipe`; `close() gracefully shuts down an owned real browser process`; `close() on a cdp-attached instance shuts down the shared real browser and the owner observes disconnect`; `navigate() with a per-call timeout rejects well under the client default and the session survives`; `records and replays a contenteditable fill through codegen on a real DOM`.

8. Guide `browser.md`.
- Two-level headings: `# Browser`; `## Surface`; `## Methods`; `## Contract`; `## Patterns`; `## Tests`.
- agents: none found (only “user-agent metadata”, `browser.md:922`).
- models: none found as a model/LLM surface. Verb use: “`BrowserPage` model a CDP browser context and its pages” `browser.md:8-10`.
- tokens: none found.
- Markdown: none found.
- snapshots for a model: none found.
- accessibility tree as a reading surface:
  > Inspects the accessibility tree. (`browser.md:795`)
  > Reads the page's accessibility tree as a serializable snapshot. (`browser.md:1408`)
  > `snapshot` | `Promise<BrowserAccessibilitySnapshot>` | Reads the full accessibility tree, optionally pruned to the interesting nodes. (`browser.md:1412`)
- Related reading (not those keywords): opening `article()` “distills a captured document to its reader-facing prose through `@orkestrel/html`” `browser.md:12-13`; contract “`article()` on the frame is where distillation lives” `browser.md:1876-1881`.

9. Packaging.
- `files`: `["dist/src", "README.md"]` `package.json:23-26`
- `sideEffects`: `false` `:28`
- `exports`:
```
".": {
  "import": { "types": "./dist/src/core/index.d.ts", "default": "./dist/src/core/index.js" },
  "require": { "types": "./dist/src/core/index.d.cts", "default": "./dist/src/core/index.cjs" }
},
"./server": {
  "import": { "types": "./dist/src/server/index.d.ts", "default": "./dist/src/server/index.js" },
  "require": { "types": "./dist/src/server/index.d.cts", "default": "./dist/src/server/index.cjs" }
},
"./package.json": "./package.json"
```
`package.json:31-52`
- `engines`: `{ "node": ">=22.12.0" }` `:107-109`
- Vitest projects `vite.config.ts:195-199` `projects: [srcCore, srcServer, policy, config, setup, guides, service, distribution, probe]`; names/environments: `src:core` node (`:42-46`); `src:server` node (`:88-93`); `policy` node (`:100-104`); `config` node (`:110-114`); `setup` node (`:126-130`); `guides` node (`:137-141`); `service` node (`:152-156`); `distribution` node (`:166-169`); `probe` node (`:184-187`). All `browser: { enabled: false }` where set.

10. Naming facts.
- `BrowserPage` one-word members (inherited frame + page): properties `id`, `parent`, `name`, `url`, `selectors`, `keyboard`, `mouse`, `touch`, `emitter`, `network`, `navigation`, `scripts`, `accessibility`, `diagnostics`, `clock`, `opener`, `target`, `closed`; methods `title`, `content`, `article`, `click`, `fill`, `select`, `evaluate`, `handle`, `wait`, `send`, `subscribe`, `unsubscribe`, `save`, `assert`, `update`, `navigate`, `reload`, `back`, `forward`, `screenshot`, `pdf`, `frame`, `frames`, `snapshot`, `codegen`, `destroy`, `close` (`types.ts:1771-2088`, getters `BrowserPage.ts:181-217`, `BrowserFrame.ts:75-105`).
- Core factories: `createCDPClient(options: CDPClientOptions): CDPClientInterface` `factories.ts:24`; `createBrowserSnapshot(input: BrowserSnapshotInput): BrowserSnapshotInterface` `:42`.
- Server factories: `createBrowser(options?: BrowserOptions): BrowserInterface` `server/factories.ts:26`; `createCDPTransport(options: WebSocketCDPTransportOptions): CDPTransportInterface` `:36`; `createBrowserWriter(): BrowserWriterInterface` `:46`.

Distillate:
- Core is host-agnostic over `CDPTransportInterface`; Node launch/attach is `@orkestrel/browser/server`. No `src/browser` env.
- String page read: `content()` → `{ url, title, html, text }` via `Runtime.evaluate` (`outerHTML` + `innerText`); `title()` same path; `article()` is the only `@orkestrel/html` use and returns distilled plain text, not an HTML AST and not Markdown.
- DOM tree read: `page.snapshot()` → `DOMSnapshot.captureSnapshot` decoded to `BrowserSnapshot` of `BrowserNode` (DOM `nodeType` numbers, layout/attrs). Navigable and JSON-round-trippable via `createBrowserSnapshot`. Not `@orkestrel/html`’s `HTMLNode`.
- AX tree read: `page.accessibility.snapshot()` → `Accessibility.getFullAXTree` or `getPartialAXTree` → `{ roots, nodes: BrowserAXNode[] }`.
- Act: `selectors.css|role|text|label|placeholder|testId` compiled to in-page JS (no XPath); locator `click`/`fill`/… plus `text()`/`html()` strings; `evaluate`/`handle`; pointer/keyboard/touch; `screenshot`/`pdf` bytes.
- `@orkestrel/html` parses any HTML string into `HTMLDocument` (`category` union: document/element/text/comment/doctype), queries/sanitizes/distills, `renderHTML`/`renderText`. Host-independent (`@orkestrel/contract` only).
- `@orkestrel/markdown` `htmlToMarkdown(HTMLNode): MarkdownDocument` and `markdownToHTML`/`renderHTML`/`renderMarkdown`. HTML string inbound is html `parseDocument` then `htmlToMarkdown`. Browser does not import markdown.
- `DOM.getDocument` is unused. Locator `html()` reads `outerHTML`.

Unknowns:
- Item 5: whether `browser/guides/html.md` is byte-identical to the scaffold mirror was not compared.
- Item 7: which of chromium/chrome/edge `requireSystemBrowser` returns is host-dependent (`findSystemBrowser` first match).
- Item 8: no browser.md passage treats snapshots or the AX tree as a model/token surface; html.md distill copy about a language model sits outside that item’s file.

Journal: journal: (driver fills)

Deviation: none
