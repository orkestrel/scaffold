<!-- Opus 5.5 planner lane, 2026-10-06, blind to the analyst; brief reading/design-brief.md -->

# Proposal: one line-addressed `read` and the round's other changes (subjective lane)

**Lane:** subjective. This proposal covers API shape, naming, copy, and guide voice. Feasibility, latency, and the exact mechanics are for the objective lane, and the Tensions section lists each one I'm handing over.

**The design in one paragraph:**
- The page vocabulary drops from 11 tools to 8: `read`, `click`, `type`, `press`, `navigate`, `wait`, `dialog`, and `switch`.
- `read` replaces `look`, `read`, and `plain`. It shows one window of numbered lines built from the outline engine both placements already share. References like `e7` appear inline, and `from`/`to` address lines.
- A search opens the window at the first matching line and lists the line numbers of every match.
- Every action returns its receipt line plus that same kind of window, with an exact footer. A handled form submission waits for the page's first change before it answers.
- `tabs` becomes part of the `read` header.
- The journey tools keep all seven names. Every journey result fits the limit, and the views inside journey results use the `read` window.

---

## 1. The surface

### Page vocabulary

| Tool | Intent | What it absorbs |
| --- | --- | --- |
| `read` | See the page, or find something on it | Old `look` (elements and references), `read` (headings, tables, link addresses), `plain` (exact words for `wait`/`type`), `tabs` (header line), search, continuation |
| `click` | Activate one element | Settling, then the `read` window of the result |
| `type` | Enter text or choose an option, and optionally submit | Settling; a handled submission waits for the page's first change; then the window |
| `press` | Send a key or chord | Settling, focus clause, window |
| `navigate` | Open an address | Load wait, window; accepts a path relative to the page |
| `wait` | Hold until text appears or leaves | Returns the window opened at the line holding the text |
| `dialog` | Answer an open dialog (staged) | Window after the answer |
| `switch` | Move to another tab | Window of that tab |

The tool wiring this replaces is at `BrowserToolset.ts:280-319`.

### Exact copy

Every tool description below stays at or under 25 words, and every parameter description stays at or under 100 characters, as `BrowserToolset.test.ts:1046-1047` and `:1057-1061` require. Copy marked "unchanged" keeps the bytes in `constants.ts:604-721`.

| Tool | Description | Parameters (required first) | Annotations |
| --- | --- | --- | --- |
| `read` | `Shows numbered lines of the page, with references like e4 to act on. Call it to learn a fact or to find an element.` (24 words) | `from` integer, required: `The first line to show: 1 for the top, or the line a reply's footer names.` (75 chars). `to` integer: `The last line to show. Default: as many lines as fit.` (53). `search` string: `Words to find; the reply starts at the first matching line at or after from.` (76) | `pure`, `untrusted` |
| `click` | unchanged | `ref` unchanged | none |
| `type` | unchanged | `ref`, `text`, `submit`, `secret` unchanged | none |
| `press` | unchanged | `key` unchanged | none |
| `navigate` | `Opens that web address, absolute or relative to this page, in the current tab.` | `url`: `The address, such as https://example.com/ or /cart.` (51) | none |
| `wait` | unchanged | `text`, `absent`, `timeout` unchanged | `pure` |
| `dialog` | unchanged | `accept`, `text` unchanged | none |
| `switch` | `Switches to an open tab that read lists, such as t2.` | `tab` unchanged | none |

`read` requires `from` because every tool must declare at least one required parameter (`constants.ts:534-535`, `BrowserToolset.test.ts:1044`). That choice also retires the empty-string `search` "no search" value, which the absence law forbids (`AGENTS.md:57`).

### Copy that changes elsewhere

Each "call look" in these strings becomes "call read":
- `BROWSER_TOOL_DEADLINE_NOTE` (`constants.ts:433-434`), `BROWSER_TOOL_PENDING_NOTE` (`:444`), and `BROWSER_TOOL_CHANGED_NOTE` (`:459-460`);
- the reference refusals (`helpers.ts:692`, `BrowserToolset.ts:1325`, `BrowserJourneyToolset.ts:577`);
- the capture error (`BrowserToolset.ts:1858`);
- the busy refusal (guide `browser.md:3055`).

The handled-submission status splits in two (section 4, item 6):
- `BROWSER_TOOL_HANDLED_STATUS`: `the page handled the submission without navigating`
- `BROWSER_TOOL_UNCHANGED_STATUS`: `the page handled the submission and has not changed yet; call wait for the text you expect`

### Journey vocabulary

All seven tools stay. Each covers a distinct intent, and no merge passes the split law:
- `record` and `save` are two moments that bracket the user's actions, so one call can't do both.
- `forget` deletes a whole journey, which is a different action from `edit`'s step operations.
- `capture` stays by ruling (`campaign.md:29`).

What lands this round and what waits:

| Change | Round |
| --- | --- |
| Every journey result bounded to the limit, with exact footers | This round |
| `record` and `replay` views become the `read` window sized to the room left after their own text | This round |
| `save` and `edit` listings cut with `BROWSER_TOOL_CUT_FOOTER` | This round |
| `journeys` continues by character `offset` | Kept this round |
| `journeys` moves to `from` lines and numbered listing rows | Waits |

The move to `from` lines waits because the harness reads listing rows by regular expression (`setupStore.ts:1767-1776`, `:1790-1796`). The cost of waiting is that the journey case sees two continuation units: lines on `read` and characters on `journeys`.

---

## 2. The projection specification

### What one line is

One line is one outline row in document order, from `renderBrowserOutline`. That renderer is shared by both placements (`BrowserElementManager.ts:95`, `BrowserDOMElementManager.ts:111`).

- **Text:** a text run that differs from its parent's name. This keeps the rule at `helpers.ts:436-440`.
- **Heading:** `#` repeated to the heading level (the accessibility `level` property, which `readBrowserAccessibility` keeps at `helpers.ts:1471-1475`), a space, then the heading text. When the heading's only referenced descendant carries the heading's own name, the line carries that element's row instead: `### e7 link "Cedar Tea Tray" /product/p3`. That removes the duplicated heading-then-link pair in the measured seed.
- **Element:** `REF ROLE "NAME"`, with the states `renderBrowserOutlineRow` already prints (`helpers.ts:186-200`). Form controls render as before: `e19 textbox "Full name" value="Ada Lovelace"`, `e8 checkbox "Gift wrap" [checked]`, `e9 combobox "Size" value="Large"`. A password field prints no value.
- **Link address:** follows the name. A same-origin link prints its path, query, and fragment. Any other link prints the absolute address. This folds in the old Markdown link addresses (`constants.ts:566-567`).
- **Image:** a named image renders `image "ALT"`. An unnamed image is omitted. This folds in the old image text.
- **Table row:** one line, with the cell texts joined by ` | `. An element inside a cell appears in its row form, which is where references sit mid-line.
- **List item:** its first line starts with `- `, unless that line is a heading line.

**Numbering.** Each line is prefixed `N: `, counting from 1. The colon keeps a line number visually apart from a reference.

**Long lines.** A line longer than a quarter of the toolset `limit` is split at the last space within that width. With no space, it is split at the width, never inside a surrogate pair. Each part becomes its own numbered line. Because every line fits the room, the `BROWSER_TOOLSET_LIMIT` "cannot hold the next character" refusal (`BrowserToolset.ts:821-826`) no longer occurs at the default limit.

**Header.**
- `page "TITLE" URL (T lines)`.
- With two or more tabs in the context, a second line: `tabs: t1 "TITLE" (current), t2 "TITLE"`.
- Then any pending move note, the change note (section 4, item 5), and the search line.

**Footer.** The footer sits outside the limit, as it does today (`BrowserToolset.ts:668-679`):
- `[lines 1–47 of 52; 5 below; call read with from 48 for more]`
- `[lines 20–60 of 120; 19 above, 60 below; call read with from 61 for more]`
- `[lines 48–52 of 52; 47 above; end of page]`
- `[lines 1–7 of 7; the whole page]`

### Rendered examples

Line numbers follow from the fixture structure (`setupStore.ts:299-322`, `:425-547`). The window ends depend on character counts, so they are estimates; U2's real-browser test pins the real figures. The `…` rows stand for lines left out of this proposal only.

**Catalogue, the seed (`read` with `from: 1`):**

```text
page "Harbor Goods — Catalogue" http://127.0.0.1:50129/ (52 lines)
1: e1 link "Catalogue" /
2: e2 link "Cart" /cart
3: e3 link "Checkout" /checkout
4: # Harbor Goods
5: Search products
6: e4 searchbox "Search products"
7: e5 button "Search"
8: ## Featured products
9: ### e6 link "Birch Cutting Board" /product/p2
10: $22.50. An end-grain birch board with a juice groove on one face.
11: ### e7 link "Cedar Tea Tray" /product/p3
12: $41.00. A slatted cedar tray that drains into a hidden reservoir.
…
23: Search to see the whole range.
24: What customers say
25: “The kettle has lived on our stove for three winters and still sings like the first morning.” — Maren, Tromsø
…
40: ## Our story
41: Harbor Goods began as a market stall on the east pier, selling kettles and boards made by three families of makers who shared one workshop behind the fish market.
…
47: Our workshop opens to visitors on the first Saturday of each month. Come and watch a kettle being hammered, or bring an old board and we will show you how to restore it.
[lines 1–47 of 52; 5 below; call read with from 48 for more]
```

**Catalogue, `read` with `{ from: 1, search: "shipping cutoff time" }`:**

```text
page "Harbor Goods — Catalogue" http://127.0.0.1:50129/ (52 lines)
2 lines match "shipping cutoff time": 51, 52
50: We answer every message ourselves, usually within one working day. Tell us what you cook and how you cook it, and we will suggest the piece that suits your kitchen.
51: ## Shipping
52: Orders placed before 2:40 PM ship the same working day. Orders placed later ship the next working day.
[lines 50–52 of 52; 49 above; end of page]
```

**Shipping policy, the seed (`from: 1`).** Section k's heading is line 3 + 2k and its paragraph is line 4 + 2k, so the token paragraph is line 56:

```text
page "Shipping policy" http://127.0.0.1:50129/policy (56 lines)
1: e1 link "Catalogue" /
2: e2 link "Cart" /cart
3: e3 link "Checkout" /checkout
4: # Shipping policy
5: ## Where we ship
6: We ship to every address in the country, including islands and remote postcodes. …
…
31: ## Returns by post
32: To return an unwanted piece, write to us within thirty days. …
[lines 1–32 of 56; 24 below; call read with from 33 for more]
```

**Shipping policy, `{ from: 1, search: "policy token" }`:**

```text
page "Shipping policy" http://127.0.0.1:50129/policy (56 lines)
1 line matches "policy token": 4
3: e3 link "Checkout" /checkout
4: # Shipping policy
…
33: ## Weather and holidays
[lines 3–33 of 56; 2 above, 23 below; call read with from 34 for more]
```

**Shipping policy, `{ from: 34, search: "policy token" }`, past the first window.** This assumes the reworded token section from section 4, item 11:

```text
page "Shipping policy" http://127.0.0.1:50129/policy (56 lines)
No line from 34 on matches "policy token".
34: During storms the ferry to the islands can stop for several days, …
…
55: ## Quoting this version
56: Quote HARBOR-TIDE-7153 when you write to us, so our workshop can match a message to this version of these terms.
[lines 34–56 of 56; 33 above; end of page]
```

### Ranges

- `from` is 1-indexed and inclusive.
- `to` is inclusive and optional. A `to` past the last line reads to the end.
- There is no end sentinel such as `-1`, because the law is "No sentinels" (`AGENTS.md:57`). The objective lane can rule that a negative `to` is refused with `The to parameter must be a line number; omit it to read as far as fits.`
- `from` past the last line is refused, coded `BROWSER_TOOLSET_ARGUMENT`, with `Line 80 is past the end; the page has 52 lines.` This replaces the silent restart at 0 that a past-end offset got before (`BrowserToolset.ts:774`).
- **Default window:** from `from` through `min(to, from + BROWSER_READ_LINES − 1, T)`, cut earlier at the last whole line that keeps the body within the room. The room is `limit` minus the notes and the header.
- `BROWSER_READ_LINES` is 100, the window SWE-agent measured best (`research.md:8-9`). On the store pages the 4,000-character limit binds first, so the line cap matters only on pages full of short lines.
- `BROWSER_TOOL_LIMIT` stays 4,000 (`constants.ts:410`).

### Search

**Matching.**
- Whole words of 3 or more letters or digits, case-folded, using the existing `BROWSER_SEARCH_PATTERN` (`constants.ts:332`) and `collectBrowserWords` (`helpers.ts:281-285`).
- A search word matches a line word when the two are equal, or when the shorter has at least 4 letters and begins the longer. So `ship` matches `shipping` and `token` matches `tokens`, but `the` does not match `these`.
- There is no matching inside a word and no stemming dictionary.
- A line scores the number of distinct search words it matches. Only lines with the best score count, as in `helpers.ts:300-313`.

**Scope.** The search looks at lines `from` through `to`, or through the end when `to` is omitted. Search and range combine: the range bounds where the search looks.

**Window.** The window opens one line before the first best-scoring line (`BROWSER_READ_CONTEXT`, which is 1) and runs as far as the room allows. That window is the context: the match and what follows it, ending in an exact footer.

**Match row.** The line after the header is `COUNT lines match "SEARCH": N1, N2, …` (`1 line matches` for one). To jump to a match, call `read` with `from` set to its number.

**Cap.** `BROWSER_READ_MATCHES` is 50, the cap SWE-agent measured (`research.md:10`). Over the cap, the match row lists the first 50 numbers and then `… and K more; add words to narrow`, and the window still opens at the first match.

**No match.** The row reads `No line matches "SEARCH".`, or `No line from N on matches "SEARCH".`, and the window opens at `from`. Every `read` therefore returns content, and a continuation that carries a stray `search` (the 2B fills `search` in every recorded first call, `toolset-probe-last.md:22-41`) still shows the lines it asked for.

### Stability

- **Unchanged page:** line numbers stay fixed while the projection is unchanged. The projection is a pure function of the outline nodes and the limit-derived split width, and references are keyed by session and backend node (`BrowserElementManager.ts:398-409`), so an unchanged page renders the same lines and the same references.
- **Every call recaptures:** each `read` and each receipt recaptures, as `look` did (`BrowserToolset.ts:717-728`). The retained `#reading` (`:230-236`) and the toolset's use of `view.read()` (`:770`) go away.
- **Changed page:** the toolset keeps the last window's projection for each view. When a read with `from` greater than 1 meets a different projection, the header carries `The page changed since the last view; line numbers might differ.` and the read serves the fresh projection at `from`. It never serves a stale capture. The guide says the old behaviour kept a mutated page's stale reading (`browser.md:3008`).

---

## 3. The contract types

These are the `src/core/types.ts` changes. TSDoc follows the existing remark style.

```ts
/** Names a tool the browser toolset reserves. */
export type BrowserToolName =
	| 'read' | 'click' | 'type' | 'press' | 'navigate' | 'wait' | 'dialog' | 'switch'
	| 'record' | 'save' | 'journeys' | 'edit' | 'replay' | 'forget' | 'capture'

/**
 * Configures an outline's element limit and optional subtree.
 * (`search` leaves: line search moves to `scanBrowserLines`.)
 */
export interface BrowserOutlineOptions extends BrowserCallOptions {
	readonly limit?: number
	readonly within?: string
}

/**
 * Carries a document-order outline as unnumbered lines, with its element counts.
 *
 * @remarks
 * - `lines` — one entry per outline row, rendered by the line rules (headings with levels, element rows
 *   with link addresses, named images, list markers, table rows)
 * - `focus` — the rendered row of the focused referenced element, or `undefined`
 */
export interface BrowserOutline {
	readonly url: string
	readonly title: string
	readonly lines: readonly string[]
	readonly count: number
	readonly total: number
	readonly focus: string | undefined
}

/**
 * Configures one window of the read projection.
 *
 * @remarks
 * - `from` — the first line, 1-based. Default: `1`
 * - `to` — the last line, inclusive. Default: as many lines as fit
 * - `search` — words whose first best-matching line at or after `from` opens the window
 * - `limit` — the most characters before the footer. Default: the toolset's `limit`
 */
export interface BrowserToolsetReadOptions extends BrowserCallOptions {
	readonly from?: number
	readonly to?: number
	readonly search?: string
	readonly limit?: number
}

/** Describes one window of a page's lines before rendering. */
export interface BrowserPassage {
	readonly url: string
	readonly title: string
	readonly lines: readonly string[]
	readonly from: number
	readonly total: number
	readonly search: string | undefined
	readonly matches: readonly number[]
	readonly tabs: readonly BrowserTab[]
	readonly changed: boolean
}

export interface BrowserToolsetInterface {
	// existing members unchanged, `native` remarks updated to
	// `read`, `click`, `type`, `press`, `navigate`, and `wait` (page-backed) and
	// `read`, `click`, `type`, and `wait` (view-backed)
	/** Renders the read tool's reply over the current view within `limit`, draining pending move notes. */
	read(options?: BrowserToolsetReadOptions): Promise<string>
}
```

**Naming notes:**
- `BrowserReadOptions` already names the reading-slice options (`types.ts:2267-2271`). The window options therefore take the qualified `BrowserToolsetReadOptions`. `BrowserWindow…` and `BrowserRange…` would collide with the DOM's `Window` and `Range`.
- The public `read` method has its first consumer in the journey toolset, which needs a window sized to its own room (review finding 5, `review.md:39-43`). It also lets the harness seed a prompt without going through the tool manager.

**Helpers (`helpers.ts`)**, each named by the prefix law (`names.md:91-105`):
- `renderBrowserOutline(url, title, nodes, limit)` returns lines and drops its `search` argument (`:409-460`).
- `scanBrowserLines(lines, search, from, to)` returns the best-scoring 1-based line numbers.
- `splitBrowserLines(lines, width)` returns the lines with long lines split.
- `renderBrowserPassage(passage)` returns `[body, footer]`.

**Removed, with every consumer updated in the same change (`AGENTS.md:66`):**
- `scanBrowserOutline` (`helpers.ts:241-267`);
- `BrowserOutline.text` and `.matches`;
- `BROWSER_TOOL_VIEW_FOOTER` (`constants.ts:472`), because every view carries its own footer.

`BROWSER_OBSERVATION_TOOL_NAMES` (`constants.ts:447-452`) becomes `['read']`.

**Added constants:** `BROWSER_READ_LINES` (100), `BROWSER_READ_MATCHES` (50), `BROWSER_READ_CONTEXT` (1), `BROWSER_READ_CHANGED_NOTE`, and `BROWSER_TOOL_UNCHANGED_STATUS`.

**Parser change.** `parseBrowserReference` stops accepting a bare number (`parsers.ts:711-712` accepts `13` as `e13`). Once lines are numbered, a model that passes a line number as `ref` would otherwise act on an unrelated element without any error.

---

## 4. The other changes

### Item 6: action receipts

**Every receipt.** Each receipt is the receipt line, a blank line, and the `read` window from line 1, sized to `limit` minus the receipt line and notes, with the exact `read` footer. This replaces the 150-row outline and the "call look with words to find" footer (`BrowserToolset.ts:1847-1851`, `constants.ts:472`).

When the action kept the same document, and the first changed line falls past the window that line 1 would show, the window opens one line before that change. This uses the retained projection that staleness already needs.

| Tool | Receipt |
| --- | --- |
| `click`, `type`, `press` | Existing action lines and statuses (`BrowserToolset.ts:847-849`, `:922-923`, `:1027`), then the window |
| `navigate` | `Navigated to URL.` and the window. A relative `url` resolves against the current page before the scheme check (`:1059-1073`) |
| `wait` | Success: `"TEXT" is on the page.` and the window opened at the first line `scanBrowserLines` finds for the text. Timeout: the timeout line and the window from line 1 |
| `dialog`, `switch` | Existing lines (`:1185`, `:1235`), then the window |

**Handled submission.** I chose a receipt that waits for the page's first change. When the observer reports a prevented submission and no navigation (`BrowserToolset.ts:1450-1457`):
- the receipt waits, inside the existing bound (`BROWSER_TOOL_TIMEOUT_MS − BROWSER_TOOL_CAPTURE_MS` from the settle start, `:1411-1412`), for the first child-list or text change in the submitting document;
- it then waits for `BROWSER_STABLE_FRAME_COUNT` frames with no further change (`constants.ts:153`);
- then it captures.
- The status is `BROWSER_TOOL_HANDLED_STATUS` when the page changed, or `BROWSER_TOOL_UNCHANGED_STATUS` when the bound passed first.

The rejected alternative is a `wait` that accepts no text. Its cost: neither model called `wait` after the handled receipt, and both submitted again (`model4b-last.md:48`), so it doesn't fix the double order. It would also hide a different wait behind a missing argument (`names.md:75-79`).

### Item 7: the cases the old tools covered

- `plain` (words to pass to `wait` or `type`): folded. Lines carry the page text as rendered, unescaped. Markdown marks appear only as line prefixes (`#`, `- `) and table separators.
- Markdown link addresses: folded into link rows.
- Image text: folded as `image "ALT"` lines.
- Markdown tables: folded as ` | ` rows.

### Item 8: the journey toolset

- **`record`:** returns `Recording NAME; each action you take is a step; call save when it is done.`, a blank line, and `toolset.read({ from: 1, limit: limit − prefix − 2 })`. The footer line stays exact (`BrowserJourneyToolset.ts:230`, `:611-617`).
- **`replay`:** returns the run text, then a window sized to what remains (`:484`). When that room can't hold the header and one line, the view is omitted and `(Call read to see the page.)` takes its place.
- **`save` and `edit`:** listings are cut with `BROWSER_TOOL_CUT_FOOTER` (`:286`, `:409`).
- **Every journey result** passes through `boundBrowserText` in the journey `#execute` as a final bound (`:153-164`). Each thrown message is cut and re-thrown with its code and context, as `BrowserToolset.ts:689-694` does.

**Guide passages** (`browser.md`):
- `:3061`: the `record` row says "followed by the read window".
- `:3092`: the end-of-recording `wait` advice stays, because `wait` stays.
- `:3104`: becomes "`read` and the journey tools are never steps".

### Item 9: the browse MCP server

The server registers one dispatcher per `BROWSER_TOOL_NAMES` entry (`BrowserMCPServer.ts:85-89`, `:219-227`), so its tool list follows the constant: `read`, `click`, `type`, `press`, `navigate`, `wait`, `dialog`, `switch`, plus the journey tools. Forwarding and text blocks are unchanged (`:328-336`, `:471-480`).

The tests that name the old tools also change. A grep of `'look'|"look"|'plain'|'tabs'` over `src` and `tests` in the browser checkout counted 304 occurrences in 26 files, including:
- `tests/src/server/BrowserMCPServer.test.ts` (66);
- `tests/service/browse.test.ts` (25), `toolset.test.ts` (28), `journey.test.ts` (7), and `document.test.ts` (4);
- `tests/distribution.test.ts` and `tests/src/bin/main.test.ts`.

### Item 10: the agent

Tool message content becomes the string itself when the value is a string, `JSON.stringify(value)` otherwise, and the error unchanged (`Agent.ts:559-561`).

Consumers that read tool-message content, from a grep for `role === 'tool'` across the sibling checkouts outside `node_modules`, `dist`, and `tmp`:
- `agent/tests/src/core/Agent.test.ts:647-649` asserts `JSON.stringify(5)` and must keep that, because the value is a number.
- `ollama/tests/service/page.test.ts:347-369` uses `includes` on content, which is unaffected by the encoding.
- `mcp/tests/fixtures/distributionPage.mjs:208` collects content.
- `mailbox/app/browser/examples/CrmExample.vue:924` renders a tool turn.
- `supervisor/app/core/parsers.ts:809` validates the message shape.

The ollama harness's `renderToolText` already renders strings raw (`setupStore.ts:853-856`), so the transcript and the model will agree once this lands. The objective lane owns the complete sweep, including `JSON.parse` over message content.

### Item 11: ollama's harness

**Page tasks.** `StoreTask` and `StoreRunOptions` gain `journeys?: boolean`, set only on the journey task. `runStoreTask` passes the `journeys` option only when it is true (`setupStore.ts:1050-1056`).

**Seed and prompt.**
- `STORE_SEED_ARGUMENTS` becomes `{ from: 1 }` (`:880-882`), and the seed is a `read` (`:1061-1065`).
- `STORE_SYSTEM_PROMPT` (`:131-138`) becomes the following, which U8 checks against the 120-word test (`setupStore.test.ts:433`). The copy names the procedure and no answer.

```text
You control a web browser with tools and must call a tool before you answer. The first message shows the page as read returns it; references such as e4 name its elements. To learn a fact, call read from line 1 with search set to words from your question; when a result names a next line, call read from that line. To use the site's search box, call type with its reference, the words, and submit true. To press a button or follow a link, call click with its reference from the latest result. Never invent a reference. If text you expect has not appeared, call wait once. When the task is done, answer in one short sentence.
```

**Case claims.** No case loses an oracle condition.

| Case | Predicate | Conditions |
| --- | --- | --- |
| Shipping | `matchesShippingOracle` | Seed lacks the fact; a successful `read` result carries it; the answer names it; shared oracles. This drops `look` from `browser.test.ts:158-163` |
| Cart | `matchesCartOracle` | Cart equals `[STORE_NAMED]`; shared oracles |
| Search | `matchesSearchOracle` | Adds `matchesStoreOracles`, so the retry predicate equals the assertion (`browser.test.ts:214` against `:217-218`) |
| Checkout | `matchesCheckoutOracle` | Orders equal `[STORE_BUYER]` exactly (from `includes`, `:242`, `:247`); the answer carries the code; shared oracles |
| Paging | `matchesPagingOracle` | Seed lacks the token; a successful `read` whose `from` equals a line named by any earlier result's footer, the seed included, carries the token; shared oracles |

**Helper changes.**
- `extractFooterLine` replaces `extractFooterOffset` (`:1473-1476`) and reads `call read with from (\d+) for more`.
- `findContinuedRead` takes the transcript, so it can read the seed (`:1488-1500`).
- `extractReferences` reads every `eN ROLE "` token on any line, not only at line start (`:1174-1176`). The rule "the latest result that lists elements replaces the listed set" stays as strict as it is (`:1187-1203`).

Each `it` asserts its predicate, so the retry and the assertion are one function.

**Task keys.** Rename the `STORE_TASKS` keys `read`, `click`, and `form` to `shipping`, `cart`, and `checkout` (`:1278-1296`). `read` names the tool now, and a transcript file `read-1.json` full of `read` calls reads ambiguously. The cost is that the archived classifiers key on the old file names. This is under the user's rulings.

**Journey case.**
- The prompt adds "open the cart" before checkout: `Record a journey named place-order, then open the cart, then complete checkout with the name Ada Lovelace and report the confirmation code.`
- `renderJourneyEdit` (`:1786-1810`) removes the recorded `click link "Cart"` step instead of a second submission.
- `matchesRemovedSubmission` (`:1897-1914`) becomes `matchesRemovedStep`. It requires:
  - the saved listing holds one submission line and one cart click;
  - the edit removes that click's id;
  - the stored listing holds one submission line and no cart click.
- `matchesJourneyOracle` (`:1926-1942`) adds orders equal to `[STORE_BUYER, STORE_JOURNEY_BUYER]`.
- The batch keeps `declare`, `update`, and `remove` (`:1831-1836`).

**The unread meter.** Remove the `meter` option, the `cost` field, the post-run `measureToolCost` call (`:1078-1091`), and the one-token provider (`browser.test.ts:119`). `measureToolCost` stays exported for M1's one reading per arm.

**Fixtures where a mechanism can be bypassed.**
- **Policy token:** the last `STORE_POLICY` entry (`:527-530`) becomes `['Quoting this version', `Quote ${STORE_POLICY_TOKEN} when you write to us, so our workshop can match a message to this version of these terms.`]`. Under the prefix rule it shares no word with the paging prompt. The current line shares `policy` and `token` with it.
- **Catalogue fact:** the fact must lie past the seed window. That is pinned by a real-browser setup case.
- **Paging continuation:** the token must lie inside the window opened at the seed footer's line, also pinned by a real-browser case.
- **Checkout:** the checkout script makes no DOM change before the confirmation (`:379-393`), so the first change is the confirmation.

---

## 5. The measurement plan

All runs use `qwen3.5:2b-q4_K_M` on Ollama 0.35.1, temperature 0, with `STORE_BOUNDS` unchanged (`setupStore.ts:677-704`). Each step records the daemon and model identities before and after, as `toolset-probe-last.md:73-79` did. Instruments run cheapest first.

| Step | Instrument | Decision rule for every count |
| --- | --- | --- |
| M0 | Deterministic browser and setup tests (CPU only) | Any failure stops the series |
| M1 | First replies: 5 tasks × 8 loopback ports, one generate each; a `read` first call is executed because it is pure | Productive first call (shipping: a read that carries the fact; cart: `click` on the tray reference or a read showing it; search: `type` with `submit`; checkout: `click` on Checkout; paging: `read` at the seed footer's line or a read that searches). 6–8 of 8 → M2. 3–5 → M2 with the task flagged. 0–2 → stop and report before M2. Copy that answers a task stays refused |
| M2 | Single attempts, 8 per task, no meter, no retry | Every task 7–8 of 8 → M3. A task at 5–6 → extend it to 16, then 14–16 → M3 and 0–13 → stop and diagnose. A task at 0–4 → stop and diagnose |
| M3 | 16 store-task runs on the 2B | 16 of 16 runs pass all five tasks → M4. The first failing run ends the series; classify it, fix it, and restart the 16 on the fixed build |
| M4 | 2 runs on `qwen3.5:4b-q4_K_M` | 2 of 2 pass all five → M5. Otherwise diagnose, because it tests the premise "a 2B pass implies a 4B pass" |
| M5 | Journey case, 1 run (3 attempts) | Passes → accept. Fails → classify; no budget change |

**Guards, stated before the run.** The guards are absolute thresholds rather than Fisher tests against S0. There is no old surface to revert to, and the exit criterion is absolute. These are my calculations, not runs:
- The 7-of-8 rule passes a task whose true per-attempt rate is 0.9 in 81% of series, 0.7 in 26%, and 0.5 in 3.5%.
- On extension, 14-of-16 at 0.9 passes in 79%.
- For comparison against S0: at 8 attempts, a one-sided Fisher test at 5% detects only cart at 3/8 or below against 16/18 (p ≈ 0.014), checkout at 5/8 or below against 16/16 (p ≈ 0.028), and search at 0/8 against 12/31 (p ≈ 0.036). That is why the absolute rule decides.
- Sixteen clean runs bound per-run failure under about 17% at 95%: 1 − 0.05^(1/16) (`synthesize.md:203`).

**Per-case budgets.** Budgets are reported, never asserted. Each is the expected turns times the measured turn latency plus setup:
- 2.2 s per turn on action turns (click-1: 10.78 s over 5 turns);
- 3.6 s per turn on paging (paging-1: 7.25 s over 2);
- 5.5 s per turn on read-heavy turns (read-1: 27.64 s over 5, `review.md:69`);
- about 3 s of setup once the meter is gone.

| Case | Expected turns | Budget |
| --- | --- | --- |
| Shipping | `read` with search, then answer | ≤ 15 s |
| Cart | click, click, answer | ≤ 12 s |
| Search | `type` with submit, then answer | ≤ 16 s (S0 elapsed 12.40 s) |
| Checkout | click, `type` with submit, answer | ≤ 12 s |
| Paging | `read` at the footer line, then answer | ≤ 12 s |
| Journey | five user turns | about 45–50 s per attempt |

The first case also pays the model reload from the warmup's default context to 16,384 (`review.md:68`). It is recorded as its own setup reading.

**Readings supplied:**
- S0 rates (`store-campaign4-last.md:33-48`);
- A2 14/16 shipping and search (`toolset-probe-last.md:62-67`);
- first-reply repeatability per port (`:18`, `:56`);
- the 4B run and its `record` bodies of 4,087 and 4,086 characters (`model4b-last.md:46-48`);
- prompt tokens: bare 1,032, page 2,091, full 3,062 (`synthesize.md:285`);
- turn latencies;
- copy sizes 6,941 and 3,356 (`BrowserToolset.test.ts:1004-1005`).

**Readings missing:**
- outline capture time per `read` on a large page, now that every continuation recaptures;
- the line counts and window ends of the store pages under this projection;
- whether the 2B sends `from` as an integer;
- prompt tokens with 6 page tools;
- the settle time of the checkout's first change;
- the effect of raw string results;
- the journey case's failure classes.

---

## 6. The units

Every unit stops at its project boundary and reports its commands. The Orchestrator runs commands for Opus units, because native Opus subagents have no shell on this host. The browser units run in series in one checkout.

1. **U1: browser contract.**
   - Role: writer. Engine: Opus 5.5.
   - Owns: browser `src/core/types.ts` and the copy and constants in `src/core/constants.ts`.
   - Depends on: nothing.
   - Acceptance: sections 1 and 3 land verbatim, or with each change recorded. Character and word counts for every description are in the report. The Orchestrator runs `npm run check` and reads that every diagnostic falls in files U2–U4 own.
   - Review: one objective pass on the contract.
2. **U2: projection engine.**
   - Role: astra. Engine: GPT-6 Astra.
   - Owns: `src/core/helpers.ts`, `src/core/parsers.ts`, `src/core/elements/BrowserElementManager.ts`, `src/browser/elements/BrowserDOMElementManager.ts`, and their tests.
   - Depends on: U1.
   - Acceptance: one case each for the following, then `npm run test:src:core`, the browser-placement project, and `npm run check`:
     - heading levels and the heading-link fold;
     - same-origin and cross-origin link addresses;
     - the list marker, the table row, and the named image;
     - the split at width, never inside a surrogate pair;
     - prefix matching (`ship`~`shipping`, `the`≁`these`), best score only, bounded by range;
     - every footer form;
     - the no-match, over-cap, and change notes;
     - a bare `13` refused.
   - Review: one pass on the line rules in both placements.
3. **U3: toolset.**
   - Role: astra.
   - Owns: `src/core/BrowserToolset.ts`, `tests/src/core/BrowserToolset.test.ts`, `src/core/factories.ts`, and `src/browser/factories.ts`.
   - Depends on: U2.
   - Acceptance, then `npm run test:src:core`, `tests/service/toolset.test.ts`, `tests/service/document.test.ts`, and `npm run check`:
     - a continuation at the seed's footer line reproduces the lines exactly on an unchanged page;
     - a search on a fixture page reaches a heading and text past the first window;
     - `from` past the end is refused;
     - the change note appears after a DOM edit;
     - receipts carry exact footers;
     - a prevented submission whose page inserts a line after a delay gets a receipt that carries the line under `BROWSER_TOOL_HANDLED_STATUS`, and a page that never changes gets `BROWSER_TOOL_UNCHANGED_STATUS` within the bound;
     - relative `navigate` resolves and the scheme check still applies;
     - `wait` returns the window at the text;
     - the tabs header appears with two tabs;
     - the copy tests pass, with the full-copy bound re-measured by the smallest-multiple-of-50 rule (`browser.md:3094`).
   - Review: one pass on the settle and the room arithmetic.
4. **U4: journey toolset.**
   - Role: astra.
   - Owns: `src/core/BrowserJourneyToolset.ts`, its test, and `tests/service/journey.test.ts`.
   - Depends on: U3.
   - Acceptance: record the failing count before the change and the same command green after it. Every result is at most `limit` before its footer, and `record`'s footer line is exact.
   - Review: one pass on the bound and the error path.
5. **U5: MCP server, bin, and distribution.**
   - Role: astra.
   - Owns: `src/server/BrowserMCPServer.ts` (where it names tools), `tests/src/server/BrowserMCPServer.test.ts`, `tests/service/browse.test.ts`, `tests/src/bin/main.test.ts`, `tests/distribution.test.ts`, `tests/setupServer.ts`, and `tests/setupService.ts`.
   - Depends on: U3, U4.
   - Acceptance: the server project and the distribution tests pass.
6. **U6: guide and TSDoc voice.**
   - Role: writer. Engine: Opus 5.5.
   - Owns: `guides/browser.md`, covering the Tools table (`:2966-2988`), the search and receipts passages (`:2990-3008`), the receipt rows (`:3014-3070`), and the journey passages (`:3092`, `:3104`). It also owns the doc blocks of every changed export, so Summary cells match.
   - Depends on: U3–U5.
   - Acceptance: the Orchestrator runs `npm run test:guides` green. The prose is re-read against what shipped, and each behaviour sentence has an executed proof (`documentation.md` § Parity).
7. **U7: agent.**
   - Role: astra.
   - Owns: `src/core/Agent.ts`, the tool-message TSDoc in `src/core/types.ts`, `tests/src/core/Agent.test.ts`, and each consumer the sweep finds. The unit lists those consumers before editing and stops on any hit inside a checkout another unit holds.
   - Depends on: nothing. It runs in parallel with U1–U6.
   - Acceptance: a recorder shows a string arriving unchanged, an object arriving as JSON, and an error arriving unchanged. Then `npm run test:src:core`, `npm run check`, and `npm run test:guides` pass.
   - Review: one pass.
8. **U8: ollama harness.**
   - Role: astra.
   - Owns: `tests/setupStore.ts`, `tests/setupStore.test.ts`, and `tests/service/browser.test.ts`.
   - Depends on: the U3–U5 pack, installed with `npm install --no-save` in a detached worktree.
   - Acceptance: real-browser setup cases show:
     - the seed lacks the fact and the token;
     - a read at the seed footer's line carries the token;
     - the token section shares no prefix-rule word with the paging prompt;
     - a page task lists no journey tool;
     - each predicate holds for its passing fixture and fails for an over-limit body;
     - the journey predicates accept one submission plus a removed cart click.
     Then `npm run test:setup` and `npm run check` pass.
   - Review: numbered claims, so no oracle loses a condition.
9. **U9: instruments.**
   - Role: astra.
   - Owns: ollama `tmp/probes/store-first.test.ts` and `store-series.test.ts`.
   - Depends on: U8.
   - Acceptance: each instrument writes one row per draw or attempt at count 1.
10. **U10: measurement M1–M5.**
    - Role: verifier on Astra. It edits no source.
    - Depends on: U9 plus the browser and agent packs.
11. **U11: falsify round.**
    - One `orkestrel-falsify` round over U1–U8 before M3 (campaign phase 3).
12. **U12: releases.**
    - Publish browser 0.0.27 and agent 0.0.27; each needs the user's one-time code.
    - Then re-pin ollama, refresh its vendored `guides/browser.md` mirror, run one store pass, and release.
    - The other mirrors refresh at each package's visit (`campaign.md:69`).

---

## 7. Risks

- **Byte sensitivity.** Every definition byte changes, and the 2B's first reply moves with the bytes (`toolset-probe-last.md:54-56`). M1 reads this first.
- **Capture latency.** Every continuation recaptures the outline. On a 15,388-element page the old outline was 75,924 characters (`absorb.md:29`), and its capture time is unmeasured.
- **Integer typing.** A required integer `from` meets an unverified claim that small models confuse integers and strings (`research.md:45`).
- **Prefix matching** can add false matches, such as `page`~`pages` and `time`~`timer`. The paging fixture claim must be re-pinned under the rule.
- **Settle heuristic.** A page whose first change is a spinner gives a receipt before the outcome. The unchanged status then names `wait`.
- **Reference oracle.** Under windows, the strict "latest listing replaces" rule can refuse a reference that the toolset still holds as valid.
- **Tabs header.** It fetches a title per tab on every read in multi-tab sessions (`BrowserToolset.ts:1283-1291`).
- **DOM placement parity.** The DOM placement must supply heading levels, link addresses, list items, and table rows to its synthetic nodes.
- **Blast radius.** The change touches 304 occurrences of the retired names across 26 browser files, plus service tests that need Chromium.
- **Fleet-wide shift.** The agent change moves every consumer's tool-turn bytes.
- **Relative navigate.** `navigate` accepts more inputs; the scheme allowlist still decides after resolution.
- **The 4B.** Two runs can disprove the premise, but they can't certify it.

---

## 8. Points that need the user's ruling

1. **The paging seed's footer counts.** The seed is a `read` under this surface. Counting its footer means one model `read` at the seed's line passes. That widens the accepted transcripts, as `review.md:16-20` warned. I recommend allowing it, because `read` is the only reading tool.
2. **Journey case redesign.** (A) Record a cart visit and remove it. This keeps `declare`, `update`, and `remove`, but the model has to visit the cart. (B) Add a `wait` for the confirmation after the submission. This is deterministic, but it swaps `remove` for `add` in the batch claim. I recommend (A).
3. **Fold `tabs` into the `read` header.** This removes one tool from the browse MCP server.
4. **Rename the task keys** `read`, `click`, and `form` to `shipping`, `cart`, and `checkout`. Transcript file names change with them.
5. **Search shape.** I recommend a window opened at the first match plus a row of match numbers, rather than a grep-style list of each match with context. Every continuation then shows contiguous lines with an exact footer, even when the 2B adds a search to a continuation. Your ruling's wording, "line-numbered matches with context", might point to the grep-style list instead.
6. **Bare-number references refused.** `13` stops meaning `e13`.

---

## Alternatives

- **Build lines from the HTML capture (`view.read()`) instead of the outline.** Favored by Markdown fidelity. Cost: references would need a node map between the inert capture and the accessibility backend ids, which neither projection carries (`BrowserToolset.test.ts:1094-1112`, `absorb.md:126`), and a capture per window. The outline engine already serves both placements.
- **Keep `look` as the name.** Favored by measured 2B habit. Cost: the prompt teaches `read` for facts (`setupStore.ts:134`), and `read` is the coding-harness word for a line-addressed file read.
- **Name it `view`.** That would collide with the toolset's `view` property (`types.ts:2965`).
- **Grep-style search output.** This is Tension 5 and ruling 5.
- **Fold `wait` into `read`.** Cost: `read` is never a journey step (`constants.ts:967-969`), so a replay would lose the synchronization a recorded `wait` gives (`browser.md:3092`).
- **Merge `click` and `type` into one `act` tool.** A present or absent `text` would select a different action (`names.md:75-79`).
- **Merge `tabs` into `switch`, with no tab meaning list.** Behavior selected by absence.
- **A 30-line window.** 14.3% against 18.0% for 100 lines (`research.md:9`).
- **`record` without a view.** It adds a `read` call after every `record`, against the principle.
- **`journeys` on line paging this round.** It puts the 4/16 journey case and the harness listing regexes (`setupStore.ts:1767-1776`) at risk in the same round.

## Constraints

- At least one required parameter per tool: `constants.ts:534-535`, `BrowserToolset.test.ts:1044`.
- Parameter descriptions ≤ 100 characters and tool descriptions ≤ 25 words: `BrowserToolset.test.ts:1046-1047`, `:1057-1061`.
- `BROWSER_TOOL_LIMIT` is 4,000 and stays: `constants.ts:410`, `campaign.md:25`.
- The footer sits outside the bound: `BrowserToolset.ts:668-679`.
- Receipt bound and capture reserve: `constants.ts:421`, `:427`, `BrowserToolset.ts:1411-1412`.
- One outline renderer serves both placements: `BrowserElementManager.ts:95`, `BrowserDOMElementManager.ts:111`.
- References are stable per backend node: `BrowserElementManager.ts:398-409`.
- Bare numbers parse as references: `parsers.ts:711-712`.
- `wait` is a journey action: `constants.ts:918-926`.
- Journey results are unbounded: `BrowserJourneyToolset.ts:153-164`.
- The harness advertises journeys to page tasks: `setupStore.ts:1050-1056`.
- Laws: types first; single-word entity APIs; `AGENTS.md:55` (boolean behavior), `:57` (no sentinels), `:65` (minimal public API), `:66` (no compatibility shims).

## Refusals

- **A `mode` or `format` string on `read`** selecting outline, Markdown, or plain text. `names.md:75`: "A literal that selects a different action is a magic mode and requires separate functions/methods."
- **`to: -1` as the end.** `AGENTS.md:57`: "Absence is `undefined`. No sentinels."
- **Keeping `look` or `plain` as aliases.** `AGENTS.md:66`: "No compatibility shims. Update every consumer in the same change."
- **Raising the limit, the attempts, the iteration limit, predict, or temperature.** `campaign.md:25`: "no raised budget, attempt count, iteration limit, predict, or temperature".
- **Copy that names where the fact or token sits.** `campaign.md:27`: "no copy that answers a task".
- **Removing `capture`.** `campaign.md:29`: "`capture` stays a feature".
- **Unwrapping JSON in the ollama provider** instead of fixing the agent. `AGENTS.md:66`.

## Tensions (for the objective lane or the Orchestrator)

1. Whether Ollama's parser constraint allows `from` as the only required parameter. Whether a digit string for `from` is parsed or refused.
2. The first-change detection: which mutations count, the stable-frame quiet period, and how it fits inside the bound.
3. Whether the split width at a quarter of `limit` keeps small-limit tests meaningful, and what happens when a header alone exceeds the room.
4. Whether the DOM placement can supply `level`, link address, list item, table, and image data.
5. Whether the public `toolset.read` passes through admission and drains notes exactly as a `read` call through `perform` does.
6. Whether `inferPageTools` and `StoreCost.page` lose their purpose once page tasks advertise only page tools.
7. The opening-at-first-changed-line rule for same-document receipts: whether it is worth its diff cost this round.
8. Whether `BROWSER_READ_MATCHES` and `BROWSER_READ_LINES` (large-model figures from `research.md`) need a 2B reading before release.
