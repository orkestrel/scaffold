I'll read the brief and follow it exactly.The brief is a read-only map of every page-reading path. I'll pull the design notes, tool handlers, and public interfaces first.# Reading surface of `@orkestrel/browser`

Checkout named by the brief: `73c608f`, with uncommitted edits in `src/core/types.ts`, `tests/setup.ts`, `tests/src/browser/BrowserDOMView.test.ts`, and `tests/src/browser/helpers.test.ts`. The capture functions are not in that set. They still serialize `outerHTML`. The working-tree remarks and tests describe a computed-style prune those functions do not perform.

There is no `find` tool. `find` is a library query on the element manager.

## Partial edits versus the capture the other files implement

`BrowserReadingInput` still has `url`, `title`, `html`, `epoch`, and `navigation` (`src/core/types.ts:2314-2320`). Its working-tree remarks say a view, frame, or element imports the root into an HTML document without a window and prunes the copy against computed style: empty HTML for a `display: none` root or ancestor, `display: none` descendants removed except the document root's `head`, text under `visibility: hidden` or `collapse` removed, unslotted or hidden-slot shadow children removed, a closed `details` reduced to its first `summary`, and `content-visibility: hidden` plus `canvas`, `video`, `audio`, and `iframe` losing their children (`src/core/types.ts:2298-2312`). The same file points `BrowserElementInterface.read`, `BrowserViewInterface.read`, and `BrowserFrameInterface.read` at that definition (`src/core/types.ts:2552-2556`, `2647-2651`, `3065-3071`).

The functions those remarks describe do not do that:

| Placement | What the capture returns |
|---|---|
| CDP document | `compileReadFunction` returns `{ url: location.href, title: document.title, html: document.documentElement.outerHTML }`, or `html: ''` when there is no root (`src/core/compilers.ts:419-423`). `BrowserFrame.read` evaluates that in the isolated world under the result-size guard (`src/core/BrowserFrame.ts:94-136`). `BrowserPage.read` waits for DOM readiness, then calls that (`src/core/BrowserPage.ts:416-420`). |
| CDP element | `BrowserPageElement.read` calls the same function, then sets `capture.html = this.outerHTML` (`src/core/elements/BrowserPageElement.ts:103-121`). |
| DOM document | `BrowserDOMView.read` passes `documentElement` to `readBrowserCapture` (`src/browser/BrowserDOMView.ts:99-105`). |
| DOM element | `BrowserDOMElement.read` passes the element node (`src/browser/elements/BrowserDOMElement.ts:138-140`). |
| DOM capture | `readBrowserCapture` sets `html` to `node.outerHTML` and measures `JSON.stringify({ url, title, html })` (`src/browser/helpers.ts:46-56`). |

`createBrowserReading` parses the string it is given (`src/core/BrowserReading.ts:40-46`, `src/core/factories.ts:85-86`). Caller-supplied HTML is not pruned.

The uncommitted tests assert the prune the functions do not perform. `tests/setup.ts:1-35` adds `RENDERED_PAGE` and `RENDERED_PHRASES`. `tests/src/browser/helpers.test.ts:418-426` expects distilled Markdown of the capture to contain a phrase exactly when `document.body.innerText` does. `tests/src/browser/helpers.test.ts:436-441` expects empty HTML for a child inside a `display: none` host, including a shadow child. `tests/src/browser/helpers.test.ts:463-466` expects a `display: none` block larger than `BROWSER_RESULT_LIMIT` to be omitted so the capture succeeds. `tests/src/browser/BrowserDOMView.test.ts:16-21` expects `view.read()` Markdown to omit `Notes pane inactive`. `readBrowserCapture` returns `node.outerHTML` (`src/browser/helpers.ts:48`), and default distillation drops the `hidden` attribute and `aria-hidden="true"`, not a stylesheet `display: none` (`node_modules/@orkestrel/html/dist/src/core/index.js:5257-5258`). The published guide still describes frame `read` as a size-guarded HTML capture (`guides/browser.md:1642`).

Item 11's design lane records the same split. `tmp/browse-item-11-design.md` (ruling 9) says the tool copy stays, and `BrowserToolset.ts` is untouched. `tmp/codex/browse-11-design.md` says `HTML.distill` drops `aside`, `footer`, `header`, `menu`, and `nav`, can select a single `main` or `article`, and that lowering floor elements is not enough for visible prose under those regions (`tmp/codex/browse-11-design.md` paragraph at the `node_modules/@orkestrel/html/dist/src/core/index.js:5158` citation). It also says the `read` tool's quoted description stays, and `wait` still uses `innerText`.

## 1. Agent tools

Reserved names: `look`, `read`, `click`, `type`, `press`, `navigate`, `wait`, `dialog`, `tabs`, `switch` (`src/core/constants.ts:479-490`). A page-backed toolset advertises the first seven, stages `dialog` while a dialog is open, and adds `tabs` and `switch` when given a context. A view-backed toolset advertises `look`, `read`, `click`, `type`, and `wait` (`src/core/BrowserToolset.ts:100-105`, `272-300`). `record`, `save`, `journeys`, `edit`, `replay`, and `forget` list journeys, not the page (`src/core/constants.ts:676-721`). Adopted page tools return the page tool's own output (`src/core/BrowserToolset.ts:1209-1222`).

Every tool runs through `#execute`. The handler returns a body and a suffix. The boundary cuts the body at `limit` characters, then appends the suffix (`src/core/BrowserToolset.ts:631-661`). Default `limit` is `BROWSER_TOOL_LIMIT`, 4,000 UTF-16 code units (`src/core/constants.ts:394`, `src/core/types.ts:2850-2851`, `src/core/BrowserToolset.ts:245`). A cut keeps the first `limit` units, one fewer when that would split a surrogate pair, then `\n[characters 0–END of TOTAL; FOOTER]` (`src/core/helpers.ts:519-526`). `look` and `read` use footer `the rest was cut` (`src/core/constants.ts:449`). An action or `dialog` receipt that carries a view uses `the rest was cut; call look with what you want to find` (`src/core/constants.ts:455`). While a dialog is open, every tool except `dialog` is refused (`src/core/BrowserToolset.ts:649`). `look`, `read`, and `tabs` are observations and are not recorded as journey steps (`src/core/constants.ts:431-435`, `guides/browser.md:2064`).

`look` and `read` page with `extractBrowserSlice`: the window ends after the last line break past the start, or at `limit` when no such break fits, without splitting a surrogate pair (`src/core/helpers.ts:1980-1999`, `src/core/BrowserToolset.ts:116-119`). A full result at offset 0 has no range footer (`src/core/BrowserToolset.ts:807`). Otherwise the footer is `[characters START–END of TOTAL; call NAME with offset END for more]` (`src/core/BrowserToolset.ts:808-810`).

### `look`

Copy: "Shows the page's text and the elements you can act on, each with a reference like e4. Call it first and after the page changes." Parameters: required `what` (string), `offset` (integer, default 0). Annotations: `pure`, `untrusted` (`src/core/constants.ts:525-544`).

Handler: reads `offset`, uses `what` as an outline `search` when it is a string, and calls `elements.outline` with `limit: Number.MAX_SAFE_INTEGER` (`src/core/BrowserToolset.ts:690-706`). An offset at or past the outline length restarts at 0 (`src/core/BrowserToolset.ts:711`). On the first page only, rows that match `what` are listed before the outline, in at most half the remaining room (`src/core/BrowserToolset.ts:714-727`). Those rows are outside the paged text, so later offsets do not depend on `what` (`src/core/BrowserToolset.ts:714`). Each call captures again (`src/core/BrowserToolset.ts:709-710`).

The outline text is `renderBrowserOutline` (`src/core/helpers.ts:320-370`):

| Returned | Dropped |
|---|---|
| First line `page "TITLE" URL`. | Nodes with `ignored`, and roles `none`, `generic`, `InlineTextBox`, `RootWebArea`, `WebArea` (`src/core/constants.ts:375-377`, `src/core/helpers.ts:341`). |
| A heading as `# NAME`, with no reference and no level (`src/core/helpers.ts:343-345`). | Heading level, accessible description, and every AX property other than the ones below. |
| `StaticText` when its normalized name is non-empty and differs from its parent's name (`src/core/helpers.ts:347-351`). | Static text equal to the parent name. |
| A referenced row: `REF ROLE "NAME"`, then `value="…"`, `pressed`, `expanded`, `selected`, `[checked]`, `[disabled]`, `[tool=NAME]` (`src/core/helpers.ts:184-198`). | Roles that are not interactive, not `heading`, and not `StaticText`, unless a page-tool form forces a reference (`src/core/elements/BrowserElementManager.ts:369-374`). |
| Closing `(COUNT of TOTAL elements)` (`src/core/helpers.ts:360`). | Referenced rows past `limit`. `look` passes a limit of `Number.MAX_SAFE_INTEGER`, so this cap does not apply to the tool. The library default is 150 (`src/core/constants.ts:306`). |
| `matches`: best word matches, past `limit`, in document order (`src/core/helpers.ts:239-271`). | Search words shorter than 3 letters or digits (`src/core/constants.ts:316`). Substring matches. Headings and static text as match candidates (`src/core/helpers.ts:251-257`). |
| `focus`: last referenced row with `focused: true`, past `limit` (`src/core/helpers.ts:355`, `369`). | `look` returns `outline.text` only. It does not print `focus` (`src/core/BrowserToolset.ts:708-733`). |

References are the roles in `BROWSER_INTERACTIVE_ROLES`: `button`, `link`, `textbox`, `searchbox`, `combobox`, `listbox`, `option`, `checkbox`, `radio`, `switch`, `slider`, `spinbutton`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `tab`, `treeitem`, `DisclosureTriangle`, `PopUpButton`, `ColorWell`, `Date`, `DateTime`, `Time`, `InputTime`, `Iframe` (`src/core/constants.ts:319-347`).

### `read`

Copy: "Reads the page's text for what you name. Call it to learn a fact; continue with the offset a cut result names." Parameters: required `what` (string), `offset` (integer, default 0). Annotations: `pure`, `untrusted` (`src/core/constants.ts:545-564`).

The handler never reads `what`. It reads `offset`, then `view.read()`, then `reading.markdown({ offset, limit })` with no `distill` argument (`src/core/BrowserToolset.ts:736-767`). Default `distill` is `true` (`src/core/BrowserReading.ts:65`, `84-86`). A continuation reuses the retained reading while the view is the same object and `stale` is false. Offset 0, a different view, or a stale reading recaptures. An offset at or past the retained Markdown length restarts at 0 (`src/core/BrowserToolset.ts:744-760`). An edit that does not navigate leaves `stale` false (`src/core/BrowserReading.ts:60-61`; the guide states the same at `guides/browser.md:2893`).

The tool therefore returns one slice of distilled Markdown of the whole current view. It does not return `reading.text()`, `reading.html`, `reading.title`, or `reading.url`. Title and address are inside the projection only when the HTML projection keeps them. It does not scope to an element. A `ref` argument is refused before the handler (`guides/browser.md:2887`, `tests/src/core/BrowserToolset.test.ts:868-886`).

What that Markdown drops is section 3. The service test expects the confirmation page's distilled Markdown and passes `what: 'the confirmation'` (`tests/service/toolset.test.ts:431-434`).

### `wait`

Copy: "Waits for that text to appear on the page." Parameters: required `text` (string), `timeout` (integer seconds, default 5, at most 30). Annotation: `pure` (`src/core/constants.ts:622-637`, `472-473`).

Returns `"TEXT" is on the page.` or `"TEXT" did not appear within N s.` (`src/core/BrowserToolset.ts:1095-1113`). It returns no page text. The predicate is `(document.body?.innerText ?? '').includes(text)` on CDP (`src/core/compilers.ts:66-71`, `src/core/BrowserPage.ts:423-448`) and the same `innerText` check on the DOM view (`src/browser/BrowserDOMView.ts:108-124`, `156-157`). A miss is outcome `timeout` (`src/core/BrowserToolset.ts:1104-1112`). The recorder drops a step that is not `done`, so a timeout is not kept as a journey step (`guides/browser.md:2064`). There is no `absent` parameter (`src/core/constants.ts:622-636`).

### Action receipts and `dialog`

`click`, `type`, `press`, `navigate`, `switch`, and `dialog` return `renderBrowserReceipt`: an action sentence, an optional status, an optional dialog sentence, then a blank line and a fresh outline (`src/core/helpers.ts:660-672`). The outline comes from `#capture`, which calls `elements.outline` with no `limit`, so the library default of 150 referenced rows applies (`src/core/BrowserToolset.ts:1787-1808`, `src/core/constants.ts:306`). Failure notes replace the view: deadline (`src/core/constants.ts:417-418`), page changed (`src/core/constants.ts:442-443`), or the error message (`src/core/BrowserToolset.ts:1813-1817`). A second capture is attempted only after a `GONE` element error (`src/core/BrowserToolset.ts:1819-1834`). `press` appends `focus is on …` when the outline names a focused referenced row (`src/core/BrowserToolset.ts:1428-1429`, `1004-1014`). `click` and `type` do not.

`dialog` accepts or dismisses and then returns that receipt (`src/core/constants.ts:638-652`, `src/core/BrowserToolset.ts:1119-1152`). The dialog sentence is `A CATEGORY dialog is open: "MESSAGE"; call dialog.` (`src/core/helpers.ts:666-669`). While it is open, `look` and `read` are refused with that sentence and do not return a page (`tests/src/core/BrowserToolset.test.ts:968-980`).

`type` with `secret: true` replaces the typed text with `[redacted]` in the receipt before clipping (`src/core/BrowserToolset.ts:680-687`, `src/core/constants.ts:592-595`). The outline that follows is not a reading of the control's value.

### `tabs` and `switch`

`tabs`: "Lists the open tabs; the current one is marked." Required `what` is unused (`src/core/constants.ts:653-664`, `src/core/BrowserToolset.ts:1159-1172`). Each line is `tN "TITLE" URL` plus ` (current)` for the view's page. No document body.

`switch` returns a receipt whose view is the selected tab's outline (`src/core/BrowserToolset.ts:1175-1204`).

### Page tools

A page tool's text output reaches the toolset whole. Its JSON output and error message are already cut at `BROWSER_REGISTRY_OUTPUT_LIMIT`, 4,096 (`src/core/constants.ts:300-301`, `src/core/BrowserRegistry.ts:421-428`, `src/core/helpers.ts:454-466`). A synthetic required `what` is stripped before the page tool runs (`src/core/BrowserToolset.ts:1217-1219`). That output is the tool's return value, not a page reading.

## 2. Library surface

`BrowserCallOptions` is `timeout` and `signal` on the async calls (`src/core/types.ts:2660-2668`).

### `BrowserReadingInterface`

Summary: one captured document, parsed once, projected to Markdown or plain text in slices (`src/core/types.ts:2322-2336`).

| Member | Summary | Returns | Drops |
|---|---|---|---|
| `url`, `title` | Document URL and title at capture (`src/core/types.ts:2327-2328`). | Strings from the capture input. | Nothing further. They are not recomputed from `<title>` at projection time. |
| `html` | Parsed document handle (`src/core/types.ts:2329`, `2337-2340`). | `HTMLInterface` from `createHTML(input.html)` (`src/core/BrowserReading.ts:43`). | Not a string. The capture string is whatever the placement passed. |
| `stale` | True after the source frame navigates or detaches (`src/core/types.ts:2330-2331`). | Compares the epoch at construction with `navigation()` (`src/core/BrowserReading.ts:60-61`). | A reading built without `navigation` stays false (`src/core/types.ts:2296-2297`). A DOM edit that does not advance the epoch stays current. |
| `markdown(options?)` | Markdown slice. A bounded slice ends after the last line break past `offset`, otherwise at `limit` (`src/core/types.ts:2342-2347`). | `renderMarkdown(htmlToMarkdown(source))`, then `extractBrowserSlice` (`src/core/BrowserReading.ts:64-71`). | Default source is `html.distill({ base: url })` (`src/core/BrowserReading.ts:84-86`). |
| `text(options?)` | Structural plain text, same slice rule (`src/core/types.ts:2348-2352`). | `renderText` of the same source (`src/core/BrowserReading.ts:74-81`). | Same distill default. |

`BrowserReadOptions`: `distill` (default `true`), `offset` (default `0`), `limit` (default unbounded) (`src/core/types.ts:2246-2260`). `BrowserReadResult` is `text`, `offset`, `total` (`src/core/types.ts:2263-2277`). Characters are UTF-16 code units (`src/core/types.ts:2255`).

A committed test of caller HTML: distilled Markdown of a page with one `main` is the heading and paragraph, with the relative link resolved against `url`; `distill: false` keeps the nav link and the footer (`tests/src/core/BrowserReading.test.ts:22-49`, `96-100`). Distilled plain text of that fixture is `Field notes` (the `<title>`), a newline, then the paragraph. `distill: false` also keeps `Section navigation` and `Footer links` (`tests/src/core/BrowserReading.test.ts:41-49`).

### `BrowserViewInterface`

Summary: document operations shared by remote and DOM-native views (`src/core/types.ts:2630-2637`).

| Member | Summary | Returns |
|---|---|---|
| `url` | Current document URL (`src/core/types.ts:2639`). | String. DOM view reads `document.URL` (`src/browser/BrowserDOMView.ts:81-83`). |
| `title(options?)` | Document title (`src/core/types.ts:2645-2646`). | DOM: `document.title` (`src/browser/BrowserDOMView.ts:93-97`). CDP frame: `document.title` (`src/core/BrowserFrame.ts:88-91`). |
| `read(options?)` | URL, title, and rendered markup; `stale` tracks later navigations (`src/core/types.ts:2647-2651`). | A `BrowserReading`. The markup is the capture in the table above, not the working-tree prune. |
| `wait(text, options?)` | Resolves when `text` is visible; rejects `BROWSER_WAIT_TIMEOUT` (`src/core/types.ts:2652-2656`). | `void`. Match is `body.innerText` (`src/core/compilers.ts:70`, `src/browser/BrowserDOMView.ts:157`). |
| `elements` | Element manager (`src/core/types.ts:2641`). | Outline, find, and element wait below. |
| `screenshot?` | PNG or JPEG bytes when the view can capture (`src/core/types.ts:2636-2644`). | Image bytes, not text. |
| `emitter?` | `console` and uncaught `error` (`src/core/types.ts:2624-2627`). | Log records, not a document projection. |

DOM `wait` default timeout is 5,000 ms (`src/browser/constants.ts:7`, `src/browser/BrowserDOMView.ts:111`). CDP page `wait` default is 30,000 ms (`src/core/constants.ts:93-96`, `src/core/BrowserPage.ts:425`). The tool's default is 5 seconds (`src/core/BrowserToolset.ts:1091-1093`).

### `BrowserFrameInterface` and `BrowserPageInterface`

Frame summary names `read` as capturing URL, title, and HTML (`src/core/types.ts:3042-3057`). The method remarks add the isolated world, the size guard, and `BrowserReadingInput` (`src/core/types.ts:3065-3071`). A frame with no epoch source never reports `stale` (`src/core/types.ts:3068-3070`).

`evaluate` runs an expression under `BROWSER_RESULT_LIMIT`, 2,500,000 serialized characters (`src/core/types.ts:3073-3074`, `src/core/constants.ts:98-117`, `src/core/BrowserFrame.ts:139-144`). It returns whatever the expression returns. It is not a document projection.

`BrowserPageInterface` extends the frame and the view (`src/core/types.ts:3295-3315`). Page `read` waits for the current document first (`src/core/BrowserPage.ts:416-420`). Page `wait` is the CDP `innerText` wait (`src/core/types.ts:3321-3322`, `src/core/BrowserPage.ts:423-448`).

| Page member | Summary | What it holds |
|---|---|---|
| `accessibility` | Accessibility-tree inspector (`src/core/types.ts:3329`). | `snapshot` below. |
| `snapshot(options?)` | Every attached document, shadow root, template content, layout box, and requested computed style (`src/core/types.ts:3361-3365`). | `BrowserSnapshotInterface`. Node fields include `text`, `input`, `checked`, `selected`, `attributes`, `layout` (`src/core/types.ts:3133-3154`). `text` and `input` come from the snapshot's rare string tables (`src/core/helpers.ts:2342-2343`, `2410-2411`). Default node cap is 100,000 (`src/core/constants.ts:145-147`). Options: `styles`, `paint`, `rects`, `limit` (`src/core/types.ts:3266-3270`). |
| `screenshot`, `pdf` | Image bytes and PDF bytes (`src/core/types.ts:3350-3356`). | Not a text reading. |
| `frames`, `frame` | Flattened frame tree and lookup by name or URL (`src/core/types.ts:3357-3360`). | Frame metadata: id, parent, name, url (`src/core/types.ts:3035-3040`). |

`BrowserSnapshotInterface` walks, finds, and filters nodes (`src/core/types.ts:3200-3253`). `BrowserNodeQuery` can match `name`, `text` (layout text and node value), `attributes`, `frame`, `visible`, and `clickable` (`src/core/types.ts:3276-3290`). This is a DOM snapshot, not the Markdown reading. The guide says `BrowserSnapshot` does not render, extract, or distill (`guides/browser.md:3119`).

### `BrowserAccessibilityInterface`

Summary: inspects the accessibility tree (`src/core/types.ts:615-619`). `snapshot(options?)` reads the full tree, or a partial tree when `root` is a backend node id. `depth` applies to the full tree (`src/core/BrowserAccessibility.ts:27-44`, `src/core/types.ts:609-613`). Each node keeps `role`, `name`, `description`, `value`, `properties`, `ignored`, and `backend` (`src/core/types.ts:588-601`, `src/core/helpers.ts:1371-1405`). The TSDoc phrase "optionally pruned to the interesting nodes" (`src/core/types.ts:617`) has no `interesting` option. The options are `root` and `depth` only.

The outline's CDP capture uses `Accessibility.getFullAXTree` per frame and follows `Iframe` nodes into child frames (`src/core/elements/BrowserElementManager.ts:289-346`). It then drops ignored nodes and non-interactive roles from references (`src/core/elements/BrowserElementManager.ts:361-374`).

### `BrowserElementManagerInterface`

| Method | Summary | Returns | Drops |
|---|---|---|---|
| `outline(options?)` | Document-order outline. References interactive elements. `limit` bounds referenced rows. `search` and focus reach past `limit` (`src/core/types.ts:2594-2599`, `2393-2426`). | `BrowserOutline`: `url`, `title`, `text`, `count`, `total`, `matches`, `focus`. | See `look`. Default `limit` 150 (`src/core/elements/BrowserElementManager.ts:78-79`, `src/browser/elements/BrowserDOMElementManager.ts:102-104`). |
| `find(query, options?)` | Elements by role, accessible-name substring, or CSS, optionally within a reference (`src/core/types.ts:2600-2604`). | Element objects. `exact: true` is a whole-name, case-sensitive match after whitespace normalization (`src/core/types.ts:2376-2378`, `src/core/helpers.ts:133-148`). | CDP CSS search is the main frame (`src/core/elements/BrowserElementManager.ts:110`). A CSS query whose `within` is another frame returns no rows (`src/core/elements/BrowserElementManager.ts:147-149`). |
| `wait(query, options?)` | Elements after a mutation produces a match, or none when `absent` is set (`src/core/types.ts:2605-2612`, `2388-2391`). | The matches. | Not a text projection. |
| `element`, `elements` | One reference, or every held reference (`src/core/types.ts:2613-2619`). | Elements. | A dropped or unknown reference is `undefined`. |

`BrowserElementInterface` properties `reference`, `role`, and `name` are the bound outline identity (`src/core/types.ts:2531-2533`). `read(options?)` captures that element's markup with the document URL and title (`src/core/types.ts:2551-2556`). On CDP that markup is `this.outerHTML` (`src/core/elements/BrowserPageElement.ts:107-108`). On DOM it is `readBrowserCapture(node)` (`src/browser/elements/BrowserDOMElement.ts:138-140`). `BrowserPageElementInterface` adds `quad` and `screenshot` of the element's box (`src/core/types.ts:2581-2587`).

### DOM outline walk

`BrowserDOMElementManager.outline` renders the same outline from a DOM walk (`src/browser/elements/BrowserDOMElementManager.ts:102-111`, `214-316`).

| Kept in the walk | Left out of the walk |
|---|---|
| Elements that are not `matchesBrowserHidden`: no `hidden` attribute, no `aria-hidden="true"`, computed `display` not `none` (`src/browser/helpers.ts:348-353`, `src/browser/elements/BrowserDOMElementManager.ts:218-226`). | The hidden element and its subtree. |
| Text whose parent is not `matchesBrowserInvisible` (`src/browser/elements/BrowserDOMElementManager.ts:241-251`). Invisible means computed `visibility` of `hidden` or `collapse`, or `checkVisibility({ visibilityProperty: true, contentVisibilityAuto: true })` failing, except `display: contents`. An `option` or `optgroup` follows its `select` (`src/browser/helpers.ts:381-395`). | That text. Descendants of an invisible element are still walked (`src/browser/helpers.ts:366-367`). Zero-size and off-screen elements stay visible (`src/browser/helpers.ts:387`). |
| Open shadow roots and flattened slot assignments (`src/browser/elements/BrowserDOMElementManager.ts:282-311`). | Light-DOM children of a shadow host are not walked as the host's children; the walker skips the host subtree after the shadow walk (`src/browser/elements/BrowserDOMElementManager.ts:306-311`). |
| Same-origin iframe documents (`src/browser/elements/BrowserDOMElementManager.ts:264-277`). | Cross-origin iframes become one row: `iframe "NAME" (cross-origin, not readable)`. |
| Interactive roles, headings, and forms with `toolname` (`src/browser/elements/BrowserDOMElementManager.ts:290-304`). | A content-named role silences descendant text so the accessible name is not repeated (`src/browser/constants.ts:103-123`, `src/browser/elements/BrowserDOMElementManager.ts:300`). A `textarea` row skips its subtree (`src/browser/elements/BrowserDOMElementManager.ts:301-304`). |

DOM row values (`src/browser/elements/BrowserDOMElementManager.ts:372-420`): selected option labels joined for a `select`; `textarea.value`; `input.value` for `BROWSER_TYPED_INPUTS` and `range`, except `password`. `BROWSER_TYPED_INPUTS` is `date`, `datetime-local`, `email`, `month`, `number`, `password`, `search`, `tel`, `text`, `time`, `url`, `week` (`src/browser/constants.ts:167-181`). Checkbox and radio contribute `[checked]` from `input.checked` or `aria-checked="true"`, not the value string. Pressed, expanded, and selected come from `readBrowserStates` (`src/browser/helpers.ts:712-738`): buttons read `aria-pressed`; a native single-line `select` is `expanded=false`; other expansion follows `BROWSER_EXPANDED_ROLES` (`src/browser/constants.ts:141-154`); selection follows `BROWSER_SELECTED_ROLES` (`option`, `tab`, `treeitem`) (`src/browser/constants.ts:162-164`).

The CDP outline does not run this walk. It renders the accessibility node's `value` when that value is a non-empty string (`src/core/helpers.ts:188-189`). Accessible description is stored and not rendered (`src/core/helpers.ts:184-198`).

## 3. Projections

`@orkestrel/html` and `@orkestrel/markdown` see the captured HTML string after `createHTML`. They do not see layout. `BrowserReading` calls `distill` only for the default projection, then `htmlToMarkdown` plus `renderMarkdown`, or `renderText` (`src/core/BrowserReading.ts:64-87`).

### `distill`

`HTML.distill` returns a new handle (`node_modules/@orkestrel/html/dist/src/core/index.d.ts:447-477`). Options replace defaults: `base`, `elements` (default `CONTENT_ELEMENTS`), `boilerplate` (default `BOILERPLATE_ELEMENTS`) (`index.d.ts:521-551`). `BrowserReading` passes only `{ base: url }` (`src/core/BrowserReading.ts:86`).

Order (`guides/html.md:313-318`, `index.d.ts:452-460`):

1. Drop each boilerplate element with its children, and every element with a `hidden` attribute or `aria-hidden="true"` (`index.js:5257-5258`). The attribute check trims and lowercases `aria-hidden`.
2. Sanitize with the default floor.
3. Re-root at the single `main`, or else the single `article` (`REGION_ELEMENTS`, `index.js:692`). Zero or several of that name leaves the document (`guides/html.md:317`).
4. Keep `CONTENT_ELEMENTS`. Unwrap every other safe element. Collapse an attribute-free element whose only child is the same tag. Collapse whitespace outside `pre` and `code`. Drop an empty non-void element. Drop comments and doctypes. Resolve surviving URL attributes against `base`.

`BOILERPLATE_ELEMENTS`: `aside`, `footer`, `header`, `menu`, `nav` (`index.js:681-687`). Their text is removed, not unwrapped (`index.d.ts:51-57`, `guides/html.md:315`).

`CONTENT_ELEMENTS`: `a`, `b`, `blockquote`, `br`, `code`, `dd`, `dl`, `dt`, `em`, `figcaption`, `figure`, `h1`–`h6`, `hr`, `i`, `img`, `li`, `ol`, `p`, `pre`, `strong`, `table`, `tbody`, `td`, `th`, `thead`, `tr`, `ul` (`index.js:639-672`). A safe element outside this set unwraps, so its text can survive (`index.d.ts:120-127`).

`base` resolves URLs that survived sanitize. The guide says that is in practice `href` and `cite`, because a resource `src` was already removed (`guides/html.md:322`). An unresolvable value is left as written.

`distill: false` skips this pass and projects `reading.html` (`src/core/BrowserReading.ts:84-85`). Relative links stay relative (`tests/src/core/BrowserReading.test.ts:96-100`). `htmlToMarkdown` still applies its own drops, below.

### Sanitize floor, `UNSAFE_ELEMENTS`

Distill sanitizes with the defaults, and the floor cannot be lowered (`index.d.ts:452-455`, `guides/html.md:292-294`). `UNSAFE_ELEMENTS` are removed whole, text included (`index.d.ts:1494-1505`):

`applet`, `base`, `button`, `dialog`, `embed`, `form`, `frame`, `frameset`, `iframe`, `input`, `link`, `math`, `meta`, `noscript`, `object`, `option`, `script`, `select`, `style`, `svg`, `template`, `textarea` (`index.js:606-629`).

The guide names the reason: `script`, `style`, `template`, and `noscript` bodies would become live markup if unwrapped; `svg` and `math` have no namespace in this AST; form and metadata elements act rather than describe (`guides/html.md:294`). That list is why a button label, a dialog's text, a form's controls, an input's value, a select's options, a textarea's value, and MathML or SVG text are absent from every distilled projection and from `htmlToMarkdown` even when `distill` is false.

Also always removed: `on*` attributes, `style`, `srcdoc`, `xmlns` (`guides/html.md:295`). `javascript:`, `data:`, `vbscript:`, and `file:` URLs are refused (`guides/html.md:297`). `SAFE_ATTRIBUTES` omits resource `src`, so a sanitized `img` keeps `alt` and loses its download (`guides/html.md:301`). `SAFE_ATTRIBUTES` includes `align`, `alt`, `cite`, `class`, `colspan`, `dir`, `height`, `href`, `lang`, `rowspan`, `span`, `start`, `title`, `width` (`index.js:523-538`). `SAFE_URL_SCHEMES` are `http`, `https`, `mailto`, `tel` (`index.js:572-577`). A thrown distill or sanitize becomes an empty document (`index.d.ts:468-469`). Descent stops at depth 64 (`index.d.ts:1080`).

### `htmlToMarkdown` and `renderMarkdown`

`htmlToMarkdown` folds an HTML node into a `MarkdownDocument` (`node_modules/@orkestrel/markdown/dist/src/core/index.d.ts:548`, `guides/markdown.md:512-545`).

| HTML | Markdown |
|---|---|
| `h1`–`h6` | Heading at that level. |
| `p`, `li`, `blockquote` | Block content. |
| `hr`, `br` | Thematic break, hard break. |
| `strong`/`b`, `em`/`i` | Emphasis. |
| `code` | Code span. Newlines in the raw text collapse to one space. |
| `pre` | Fenced code block. A first `code` child is verbatim and its `language-` class names the language. Otherwise `renderText`. |
| `a`, `img` | Link and image. `href` and `src` are sanitized again. `alt` becomes the image's text (`index.d.ts:1796-1811`). A refused destination is `''`, and the link or image is kept (`index.d.ts:522-527`). |
| `ul`/`ol` | List, ordered from the tag, numbered from `start`. An empty `li` remains an item. |
| `th`/`td`, `tr`, `table` | GFM table. Alignment from a cell's `align`. Header is the first row that contains a `th`. |
| Any `UNSAFE_ELEMENTS` element | Nothing, text included (`guides/markdown.md:544`, `561`). |
| Anything else | Unwraps to its children (`guides/markdown.md:545`). |

Also dropped (`guides/markdown.md:557-563`): comments and doctypes; attributes other than `href`, `src`, `alt`, `class` on a code language, `align` on a cell, and `start` on an `ol`; block content inside a table cell, flattened to one whitespace-collapsed line.

`renderMarkdown` writes canonical Markdown: ATX headings, `-` bullets, `N.` ordinals, GFM tables, `[text](href)`, `![alt](src)`, fenced code (`index.d.ts:1915-1944`). It does not sanitize again (`guides/markdown.md:504`). A document with no blocks renders `''` (`index.d.ts:1931`). Depth past 64 degrades a value-bearing node to escaped text and any other node to `''` (`index.d.ts:1928-1930`). The package's own cap is 64; `htmlToMarkdown`'s cap is html's (`guides/markdown.md:71`).

### `renderText`

`renderText` is structural plain text (`index.d.ts:1256-1270`, `guides/html.md:326-341`).

| Structure | In the text |
|---|---|
| Blocks and `br` | Line breaks. |
| Headings | A bare line, no level. |
| Lists | One line per block inside an item. No marker, ordinal, or depth. |
| Links | The link text. The destination is gone. |
| `img` | Nothing. `alt` is an attribute and does not project. |
| Tables | Tabs between direct cells, newlines between rows. `th` and `td` look the same. |
| `pre` / `code` | Whitespace under `pre` stays. Standalone `code` collapses. No fence or language. |
| `strong`, `em` | Their text, unmarked. |
| `script`, `style` | Excluded. `title` and `textarea` text remains (`index.d.ts:1262-1263`). |

The `read` tool calls `markdown`, not `text` (`src/core/BrowserToolset.ts:763-766`). Image alt can appear in the tool result as Markdown image syntax and is absent from `reading.text()`.

### What the default reading therefore keeps

For a captured `outerHTML` document, default `markdown()` keeps prose that survives boilerplate removal, the hidden-attribute prune, the unsafe-element floor, optional re-rooting to one `main` or `article`, and the content vocabulary. Headings keep levels. Links keep sanitized, base-resolved destinations. Tables become GFM. Images keep alt and lose `src`. Code under `pre` stays fenced. `<title>` text can remain, because `title` is not an unsafe element and not boilerplate; the field-notes fixture's distilled plain text begins with `Field notes` from that element (`tests/src/core/BrowserReading.test.ts:44-45`).

It does not keep button labels, input values, select options, textarea values, dialog text, form structure, SVG text, MathML, `meta`, `link`, `script`, `style`, `nav`, `header`, `footer`, `aside`, or `menu`. A single `main` or `article` drops the rest of the body. Stylesheet `display: none` and `visibility: hidden` remain in the HTML, so their text remains unless an attribute or a boilerplate tag also drops them. Shadow trees are absent from `outerHTML`, so they are absent from the reading. Live control values that are not in the serialized markup are absent with it.

## 4. Gaps by reader need

| Need | Path that serves it | What that path loses |
|---|---|---|
| Main article text | `read` tool, or `reading.markdown()` / `reading.text()` with default distill. One `main` or else one `article` becomes the root (`guides/html.md:317`). | Everything outside that region. Boilerplate regions even inside the kept tree. Unsafe elements' text, including controls in the article. Heading levels survive in Markdown and disappear in `text()`. The tool ignores `what` (`src/core/BrowserToolset.ts:736-767`). |
| Every visible text, including navigation, header, and footer | `reading.markdown({ distill: false })` or `reading.text({ distill: false })` keeps nav and footer text (`tests/src/core/BrowserReading.test.ts:32-49`). `look` includes static text the outline walk or the accessibility tree exposes. DOM `wait` matches `body.innerText` (`src/browser/BrowserDOMView.ts:157`). | The `read` tool cannot pass `distill: false`. Default distill removes `nav`, `header`, `footer`, `aside`, and `menu` with their children (`index.js:681-687`). `look` drops omitted roles, ignored accessibility nodes, and duplicate static text (`src/core/helpers.ts:341-351`). `innerText` is not what `read` returns. `outerHTML` includes stylesheet-hidden text that `innerText` omits (`ROADMAP.md` item 11). |
| Structure of interactive controls and their states | `look`, and the outline on action receipts. Rows carry role, name, value, pressed, expanded, selected, checked, disabled (`src/core/helpers.ts:184-198`). `elements.find` returns the element objects (`src/core/types.ts:2600-2604`). `page.accessibility.snapshot` returns the raw nodes, including `description` (`src/core/types.ts:588-601`). | `look` has no references for non-interactive roles. Heading rows have no level. Description is not printed. Receipts stop at 150 referenced rows (`src/core/constants.ts:306`) and then at 4,000 characters. CDP and DOM disagree on where state comes from: DOM uses the rules in `readBrowserStates` (`src/browser/helpers.ts:712-738`); CDP prints the accessibility value and properties. The b2 run's missing pressed and selected states are against browse 0.0.20; this tree's row renderer includes them (`src/core/helpers.ts:190-196`). |
| Form field values | DOM outline: selected option labels, textarea value, typed input value except password, range value (`src/browser/elements/BrowserDOMElementManager.ts:392-401`). CDP outline: the accessibility node's non-empty value (`src/core/helpers.ts:188-189`). Snapshot nodes carry `input`, `checked`, and `selected` (`src/core/types.ts:3144-3146`). | The `read` tool's Markdown drops `form`, `input`, `textarea`, `select`, `option`, and `button` whole (`index.js:606-629`). Password value is omitted on the DOM outline and the element is omitted from Markdown. `outerHTML` is the serialized markup (`src/browser/helpers.ts:48`), not a separate read of each live value. Checkbox and radio outlines report checked state, not the submission value. |
| Links and their targets | Distilled Markdown: `[text](absolute URL)` when `href` survives sanitize and resolves against the captured URL (`tests/src/core/BrowserReading.test.ts:96-99`). `distill: false` keeps the href as written (`tests/src/core/BrowserReading.test.ts:100`). `look` lists `link` rows with accessible names and references. | Destinations refused by the URL floor become empty (`index.d.ts:522-527`). `renderText` keeps the words and drops the destination (`guides/html.md:334`). Links inside `nav`, `header`, `footer`, `aside`, or `menu` are removed by default distill (`index.js:681-687`). Links inside a single `main`'s surroundings go with the re-root. |
| Tables | Distilled Markdown renders a GFM table when `table`, `tr`, and cells survive (`guides/markdown.md:543`). `renderText` uses tabs and newlines (`guides/html.md:336`). The snapshot keeps the cells as nodes. | A cell's blocks become one line (`guides/markdown.md:563`). `renderText` does not mark headers. Spans and attributes other than cell `align` are dropped (`guides/markdown.md:563`). Tables inside boilerplate or outside the single `main` are dropped by distill. |
| Images and their alternatives | Distilled Markdown keeps `img` and its `alt` as an image (`guides/markdown.md:541`). `src` is removed by sanitize (`guides/html.md:301`). | `renderText` drops `alt` (`guides/html.md:335`). The `read` tool uses Markdown, so alt can appear there. SVG is an unsafe element, so its text and title are dropped (`index.js:626`). A hidden or boilerplate image goes with that prune. The DOM outline names an image only when its role is interactive; an `img` with empty `alt` computes role `none` (`src/browser/helpers.ts:98`) and `none` is omitted (`src/core/constants.ts:375-377`). |
| Headings as an outline | `reading.markdown()` keeps `h1`–`h6` levels (`guides/markdown.md:533`). `look` prints each accessibility heading as `# NAME` (`src/core/helpers.ts:343-345`). | `look` drops the level. `renderText` drops the level (`guides/html.md:333`). Headings inside boilerplate or outside the single content region are absent from default Markdown. Headings with role omitted or ignored are absent from `look`. |
| A named region or element | `element.read()` captures that element's `outerHTML` (`src/core/elements/BrowserPageElement.ts:107-108`, `src/browser/elements/BrowserDOMElement.ts:138-140`). `outline({ within })` and `find({ within })` scope the outline (`src/core/types.ts:2393-2406`). `accessibility.snapshot({ root })` reads a partial accessibility tree (`src/core/BrowserAccessibility.ts:32-40`). `snapshot().find` matches a node query (`src/core/types.ts:3238-3244`). | No tool takes a reference for `read` (`src/core/constants.ts:517-518`). Projecting the element reading still distills by default, so a region that is a `nav` or that contains inputs loses those parts. CDP `find` by CSS does not search child frames (`src/core/elements/BrowserElementManager.ts:110`). |
| Metadata: title, description, language, canonical URL | Title is `reading.title`, `view.title()`, the outline's first line, and the `tabs` line (`src/core/types.ts:2328`, `2645-2646`, `src/core/helpers.ts:327`). The snapshot document has `url` and `title` (`src/core/types.ts:3157-3164`). `url` on the reading is the captured document URL (`src/core/types.ts:2327`). | No method reads a meta description, `lang`, or a canonical link. `meta` and `link` are unsafe and drop out of every projection (`index.js:612-619`). `lang` is a safe attribute (`index.js:531`) and is discarded when the `html` element unwraps, because `html` is not in `CONTENT_ELEMENTS`. The strings exist in the captured `outerHTML` and on snapshot attribute records only as markup the caller would walk. |
| Text that changed after an action | Action receipts recapture the outline (`src/core/BrowserToolset.ts:1787-1808`). `look` recaptures on every call (`src/core/BrowserToolset.ts:709-710`). `wait` polls `innerText` (`src/core/compilers.ts:70`). | `read` reuses the previous reading until offset 0, a view change, or `stale` (`src/core/BrowserToolset.ts:744-756`). A DOM edit that does not navigate leaves the retained Markdown in place (`guides/browser.md:2893`). The receipt outline is capped at 150 referenced rows. `wait` reports presence or a timeout sentence, not the new text. |
| Hidden or collapsed content a person can reveal | The captured `outerHTML` still contains it, and default distill removes it only when it has `hidden`, `aria-hidden="true"`, or sits in boilerplate (`index.js:5257-5258`, `681-687`). `reading.markdown({ distill: false })` keeps that markup's text, aside from unsafe elements. DOM `look` omits `display: none`, `hidden`, and `aria-hidden="true"` subtrees (`src/browser/helpers.ts:348-353`). `wait` sees the string once `innerText` contains it. | The `read` tool always distills, so attribute-hidden and boilerplate text stay out, and stylesheet-hidden text stays in. `look` on CDP follows accessibility `ignored`, which the design probe found does not match paint: opening a modal removed the background from the accessibility tree while it stayed painted (`tmp/codex/browse-11-design.md`, modal row). The DOM walk has no `details` rule. The working-tree remark that a closed `details` keeps only its first `summary` (`src/core/types.ts:2308-2309`) is not in `compileReadFunction` or the DOM walk. |

## 5. Evidence of agent use

### `b2-report.md`

`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse\b2-report.md`, Linux, 2026-10-02, browse 0.0.20 at `fc4c4a2`. The run operated the showcase and replayed a 10-step dialog journey. It says browse cannot fully report control states, expose later element references, or distinguish visible text through `read` (opening paragraph).

The run used `look`, `click`, `press`, `wait`, `type` (blocked on reference discovery), `read`, `record`/`save`/`replay`. Excerpted results:

| Call | What the report records |
|---|---|
| T2 `look` | Banner, buttons, status, contents. Pressed states omitted (line 9). |
| T35 replay | `look` kept returning the document's opening text while replay captures showed the landed headings (line 23). |
| T37, T276 `look` | A request for the archive button returned the opening outline. The Tracking number request returned header references and `[characters 0–4000 of 62448; the rest was cut…]` (lines 41, 58). No textbox reference was obtained. |
| T47, T53, T62–T70, T75–T80, T83–T85, T89–T91, T100, T106, T173–T176, T181–T184, T197–T220, T242–T244 | `wait` reported `"…" is on the page.` or `did not appear within 1 s.` Collapse, accordion, tooltip, tab, popover, toast, and alert exits were timeouts. The report says those timeouts are not disappearance assertions (line 44). |
| T254, T257, T270 `read` | T270 returned a dismissed toast body and the inactive Notes pane. T272 and T273 `wait` reported both absent. T257 returned a closed offcanvas title and T254 an inactive carousel caption; T274 and T275 reported both absent (line 62). Header-status `read` calls returned distilled body content rather than the requested sentence (line 62). |
| T169, T182 | Toggle and tab selection omitted from the tool view (lines 26, 29, 60). |
| Screenshots | Replay PNGs only, 780×493. No screenshot tool (lines 52-54). |

The report's proposed items 9–12 are the source of the current roadmap items 11 and 12. Its line citations (`BrowserToolset.ts:683`, `constants.ts:517`, `helpers.ts:185`, `compilers.ts:419`) are from that 0.0.20 tree. In this tree, `look` does pass `what` as `search` (`src/core/BrowserToolset.ts:695-705`), `offset` exists (`src/core/constants.ts:536-539`), and outline rows include pressed, expanded, and selected (`src/core/helpers.ts:190-196`). `read` still captures `outerHTML` and distills (`src/core/compilers.ts:419-423`, `src/core/BrowserReading.ts:64-72`).

### `br1-report.md`

`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse\br1-report.md`, committed as `360e27e`. It measures replay and live `look`, `click`, and `press` after an outline-render cut. It does not record a `read` call. A full accessibility capture of 25,043 nodes dominated live cost (lines 18-24). The saved 42-step replay stopped at s10 because `wait` for `"Orders placed before 2 p.m."` timed out (lines 3, 16, 67). The report says the faster path skipped the unused outline during replay steps and still captured the final replay view (line 33).

### `ROADMAP.md` items 6 to 12

Closed items leave the file (`ROADMAP.md` opening paragraph). Items 9 and 10 are not in it. Items present:

| Item | What it says about reading |
|---|---|
| 6 | No viewport on the browse server. Showcase was checked at 780 by 493 (`ROADMAP.md` item 6). |
| 7 | Screenshots exist inside replay (`src/core/BrowserReplay.ts:343-345`, cited there). No exploratory screenshot tool. |
| 8 | `#pointer` (`src/core/elements/BrowserPageElement.ts:361-381`) can hit-test during a smooth scroll. This is an action failure, not a reading. |
| 11 | `read` projects `document.documentElement.outerHTML` through distill. The item says distill drops only `hidden` and `aria-hidden="true"` (`node_modules/@orkestrel/html/dist/src/core/index.js:5257-5258`) and that stylesheet `display: none` and `visibility: hidden` still read as page text, while `wait` matches `innerText` (`src/core/compilers.ts:66-71`, `src/browser/BrowserDOMView.ts:157`). It cites the b2 calls T270, T257, T254 against T272–T275. The item's "only hidden and aria-hidden" sentence does not mention boilerplate removal, re-rooting, or `UNSAFE_ELEMENTS`. Those are in section 3 of this map. |
| 12 | `wait` advertises appearance only (`src/core/constants.ts:622-636`). A miss returns timeout (`src/core/BrowserToolset.ts:1102-1111`) and the recorder drops it. Element managers already wait for absence (`src/core/elements/BrowserElementManager.ts:252`, `src/browser/elements/BrowserDOMElementManager.ts:161-164`). No tool reaches that wait. |

### Tests and journeys that drive `read`

Journeys do not record `read` (`guides/browser.md:2064`, `2986`). These tests call the tool:

| Test | What it drives |
|---|---|
| `tests/service/toolset.test.ts:431-434` | After a real form submission, `read` with `what: 'the confirmation'` equals `# Order placed` plus the delivery sentence. The argument is not used to select that sentence. |
| `tests/src/core/BrowserToolset.test.ts:606-611` | `read` is allowed while a replay hold blocks actions. |
| `tests/src/core/BrowserToolset.test.ts:878-886` | `read` with `ref` is refused and does not call the view. |
| `tests/src/core/BrowserToolset.test.ts:968-980` | `read` is refused while a confirm dialog is open. |
| `tests/src/core/BrowserToolset.test.ts:5611-5626` | `read` pages distilled Markdown at `limit: 200` and a later offset continues the same projection. The fixture answers any expression whose source includes `outerHTML`. |
| `tests/service/journey.test.ts:564-568` | `read` is one of the calls allowed during a held replay. |

Library `read` is also driven by `tests/src/core/BrowserReading.test.ts` (caller HTML, distill on and off), `tests/src/core/BrowserPage.test.ts` (page and frame capture, staleness), `tests/service/browser.test.ts:99`, `277`, `336-341`, `869`, `1044`, `1066` (page capture and the result limit), `tests/setup.test.ts:306`, `331`, `350`, and `tests/src/core/elements/BrowserPageElement.test.ts:68`. The uncommitted DOM cases are `tests/src/browser/BrowserDOMView.test.ts:16-21` and `tests/src/browser/helpers.test.ts:417-476`.

## Unknowns

- The working-tree remarks at `src/core/types.ts:2298-2312` were not diffed line-by-line against `HEAD`. Git status marks `src/core/types.ts`, `tests/setup.ts`, `tests/src/browser/BrowserDOMView.test.ts`, and `tests/src/browser/helpers.test.ts` modified. The capture functions are unmodified and return `outerHTML`.
- Whether a closed `details` body, a closed `dialog`, or `content-visibility: hidden` computes `display: none` in the DOM outline is not encoded as a special case in `#walk` (`src/browser/elements/BrowserDOMElementManager.ts:214-316`). The design probe measured a closed dialog as `display: none` and a closed dialog's accessibility node as ignored (`tmp/codex/browse-11-design.md`, tables). This map did not re-run that probe.
- How much of a live control value `outerHTML` serializes, per input type, is not asserted by the committed capture. The design probe recorded disagreements among painted text, `innerText`, the DOM value, and the accessibility value (`tmp/codex/browse-11-design.md`, measured pairs). The product capture does not apply that probe's lowering rules.
- CDP outline password values are whatever the accessibility node carries (`src/core/helpers.ts:188-189`). The DOM outline skips `type="password"` (`src/browser/elements/BrowserDOMElementManager.ts:397-401`). The design probe saw masking dots on Edge 154.0.4258.53. This tree does not redact the HTML handle.
- `br1-report.md` does not say whether any `read` ran. `b2-report.md` cites a transcript that is not in this checkout.
- Items 9 and 10 are absent from `ROADMAP.md`. This map does not say which commit removed them. The current `look` search and the current row states are the code cited above.
- No API assembles meta description, document language, or a canonical URL. They are present only as markup inside a particular page's `outerHTML` or snapshot attributes.