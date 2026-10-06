<!-- GPT-6 Astra analyst lane, 2026-10-06, blind to the planner; brief reading/design-brief.md; journal scaffold tmp/codex/reading-analyst.jsonl -->

## 1. The surface

Replace `look`, `read`, and `plain` with `read`. Keep distinct actions separate. Every page-changing action settles within its deadline and returns the same numbered projection that `read` returns. This implements the campaign’s reading and tool-curation rulings. [campaign.md:8](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/lifecycle/reading/campaign.md:8)

### Exact page definitions

The descriptions below are the proposed tool copy. A parameter is required unless marked optional.

| Tool | Description | Parameters |
|---|---|---|
| `read` | Reads numbered page lines with element references. Searches return matching lines with context; use from and to for a range. | `search: string`; optional `from: integer`, `to: integer` |
| `click` | Clicks the referenced element, settles its action, and returns the page. | `ref: string` |
| `type` | Fills the referenced control, optionally submits its form, settles the action, and returns the page. | `ref: string`, `text: string`; optional `submit: boolean`, `secret: boolean` |
| `press` | Presses a key or chord, settles its action, and returns the page. | `key: string` |
| `navigate` | Opens an absolute web address in the current tab and returns the loaded page. | `url: string` |
| `wait` | Waits for text to appear or leave, then returns the page. | `text: string`; optional `absent: boolean`, `timeout: integer` |
| `dialog` | Answers the open dialog, settles the interrupted action, and returns the page. | `accept: boolean`; optional `text: string` |
| `tabs` | Lists numbered open tabs with their addresses; marks the current tab. | `search: string`; optional `from: integer`, `to: integer` |
| `switch` | Selects an open tab and returns its page. | `tab: string` |

Exact parameter descriptions:

| Tool parameter | Description |
|---|---|
| `read.search` | Words to find, ignoring case. Empty reads a range. |
| `from`, wherever used | First line, starting at 1. Default: 1. |
| `to`, wherever used | Last line, included; -1 means end. Default: up to 40 lines. |
| `ref`, wherever used | The element reference, such as e4. |
| `type.text` | The text to type or the option to choose. |
| `type.submit` | True submits its form after typing. Default: false. |
| `type.secret` | True withholds the text from the receipt and recording. Default: false. |
| `press.key` | The key or chord, such as Enter or Control+a. |
| `navigate.url` | The absolute http or https address. |
| `wait.text` | The visible text to wait for. |
| `wait.absent` | True waits for the text to leave. Default: false. |
| `wait.timeout` | The most seconds to wait, at most 30. Default: 5. |
| `dialog.accept` | True accepts the dialog; false dismisses it. |
| `dialog.text` | The answer to a prompt dialog. |
| `tabs.search` | Words to find in tab titles or addresses. Empty reads a range. |
| `switch.tab` | The tab reference from tabs, such as t2. |

Keep `type.secret` in page-only definitions. Its behavior belongs to typing even when recording is unavailable.

### Exact journey definitions

| Tool | Description | Parameters |
|---|---|---|
| `record` | Starts recording actions as a named journey and returns the page. | `journey: string` |
| `save` | Stops recording, saves the journey, and returns its numbered listing. | `description: string` |
| `journeys` | Reads numbered saved journeys or a saved run, with search and ranges. | `search: string`; optional `journey: string`, `run: string`, `from: integer`, `to: integer` |
| `edit` | Applies a batch of journey edits and returns the saved numbered listing. | `journey: string`, `edits: array \| string` |
| `replay` | Replays a saved journey with inputs and returns its outcome and the page. | `journey: string`; optional `inputs: object` |
| `forget` | Removes a saved journey and its runs. | `journey: string` |
| `capture` | Saves the current view as a PNG and returns its path. | `full: boolean` |

Exact parameter descriptions:

| Parameter | Description |
|---|---|
| Required `journey` | The journey name, such as add-kettle. |
| `save.description` | What the journey achieves, in one sentence. |
| `journeys.search` | Words to find. Empty reads a range. |
| `journeys.journey` | The journey to read. Omit to list saved journeys. |
| `journeys.run` | The saved run id to read; also supply journey. |
| `edit.edits` | Changes as an array or its JSON string. An invalid change refuses the batch. |
| `replay.inputs` | Each parameter value by name. |
| `capture.full` | True captures the full page; false captures the viewport. |

`inputs` accepts string values. Preserve the existing `edits` array-or-JSON-string schema, with its required `operation` and `add`, `remove`, `update`, `declare` values. These are distinct edit operations within one atomic editing intent. Its nested descriptions remain:

| Edit property | Description |
|---|---|
| `operation` | What the change does. |
| `id` | The step to remove or update, such as s3. |
| `step` | The step to add: its action, its arguments, and ref or tab. |
| `before` | The step to add it before, such as s3. |
| `after` | The step to add it after, such as s3. |
| `ref` | The element the added or updated step acts on, such as e4. |
| `arguments` | The arguments to change, merged by key. |
| `name` | The parameter to declare, such as email. |
| `parameter` | The parameter: its default, or secret set to true. |

The preserved schema is defined in [constants.ts:771](C:/Users/mikes/WebstormProjects/browser/src/core/constants.ts:771).

### Curation decisions

| Decision | Flow absorbed | Cost of the rejected alternative |
|---|---|---|
| Merge the reading tools into `read` | Observation, search, references, range and continuation | Keeping separate readers preserves a tool-choice failure before the model obtains evidence. |
| Keep `click`, `type`, and `press` | Each absorbs settlement and its resulting page | Combining them requires an action selector or incompatible optional parameters. |
| Keep `navigate` and `switch` | Each returns its destination page | A combined destination parameter conflates loading a document with selecting an existing tab. |
| Keep `tabs` and `switch` | `tabs` absorbs bounded listing and search | Selecting a tab while listing would introduce a mutation into an observation. |
| Keep `wait` | Explicit text condition followed by a page | Folding it into `read` makes observation unexpectedly block. Removing it loses application-specific waiting. |
| Keep `dialog` | Answer, resume, settle, return page | Folding it into `press` cannot represent acceptance, dismissal and prompt text clearly. |
| Keep journey intents | `record` returns the page; `save` and `edit` return the listing; `replay` returns outcome and page | Merging recording with saving requires implicit completion or another behavioral selector. Merging editing with deletion hides destructive behavior. |
| Keep `capture` in journeys | Save PNG and return its path | Folding image capture into text reading adds an unrelated artifact-producing behavior. |

All listed changes land in this round. Automatic journey completion, implicit saving, and combined destructive editing are excluded; they require different lifecycle contracts and add no necessary support for the campaign.

### Measured copy

The copy test measures compact JSON containing `name`, `description`, and `parameters`; its limits are 7,000 UTF-16 code units overall and 3,400 for journey definitions plus `type.secret`. [BrowserToolset.test.ts:989](C:/Users/mikes/WebstormProjects/browser/tests/src/core/BrowserToolset.test.ts:989)

| Measurement | Proposed |
|---|---:|
| Full definitions | 6,545 UTF-16 units; 6,545 UTF-8 bytes |
| Page definitions | 3,264 UTF-16 units; 3,264 UTF-8 bytes |
| Journey definitions plus `type.secret` | 3,399 UTF-16 units; 3,399 UTF-8 bytes |
| Longest tool description | 20 words |
| Longest parameter description | 76 characters |

Measured using `node --input-type=module-typescript`, with the exact definitions above supplied on stdin and the existing nested edit schema imported from `browser/dist/src/core/index.js`. The measurement expressions were:

```ts
const all = JSON.stringify(definitions)
const journey =
	JSON.stringify(definitions.filter((entry) => Object.hasOwn(proposal.journey, entry.name))) +
	JSON.stringify({ secret: proposal.page.type.properties.secret })

console.log(all.length, Buffer.byteLength(all))
console.log(journey.length, Buffer.byteLength(journey))
```

The journey copy has only one UTF-16 unit of headroom. Any copy change must rerun the existing measurement.

## 2. The projection specification

### Capture and identity

Produce a semantic document, then paginate it. Do not paginate the accessibility outline and subsequently splice in independently rendered Markdown.

Reuse the existing DOM snapshot machinery: `BrowserPage.snapshot()` invokes `DOMSnapshot.captureSnapshot`; its decoder retains backend node IDs and attributes. Join that data to accessibility nodes and element references by session/frame/backend identity. The element manager already binds references from backend identities. [BrowserPage.ts:699](C:/Users/mikes/WebstormProjects/browser/src/core/BrowserPage.ts:699), [helpers.ts:2429](C:/Users/mikes/WebstormProjects/browser/src/core/helpers.ts:2429), [types.ts:3174](C:/Users/mikes/WebstormProjects/browser/src/core/types.ts:3174), [BrowserElementManager.ts:384](C:/Users/mikes/WebstormProjects/browser/src/core/elements/BrowserElementManager.ts:384)

Use the existing DOM element traversal for in-document views. It already traverses slots, shadow roots and readable frames, and identifies unreadable cross-origin frames. Feed both backends into the same projection renderer. [BrowserDOMElementManager.ts:214](C:/Users/mikes/WebstormProjects/browser/src/browser/elements/BrowserDOMElementManager.ts:214)

Do not match controls by accessible name. Duplicate names are valid and cannot establish identity.

### Lines and content

An addressed line is a deterministic fragment of a semantic block:

- A heading retains its level: `## Shipping`.
- A paragraph occupies a block, wrapped when necessary.
- A list item retains its marker and nesting indentation.
- A table emits its caption, then labelled rows and cells in source order. Include column labels and nontrivial row/column spans. Do not invent missing headers.
- A link prints its accessible text, inline reference when actionable, and absolute destination.
- An image prints `image "alternative text"`; omit decorative images. Do not invent OCR or captions.
- A form control prints reference, role, accessible name, relevant state and safe value.
- Hidden content, password values and registered secrets remain excluded.
- Frame boundaries identify the frame. An unreadable frame is explicit.

Example control:

```text
18 | [e14] textbox "Full name" value=""
19 | [e15] button "Place order" enabled
```

Reference syntax is `[e14]`. Line numbers never become element references.

Wrap block content at a maximum of 240 UTF-16 units before adding its line prefix. Prefer whitespace boundaries. Hard-wrap an oversized token without splitting a Unicode code point; mark a hard continuation with `+` instead of `|`, so the reader knows to concatenate without inserting a space. Never split a reference token.

Wrapping happens before selecting a range. Window size, action prefixes and search do not renumber the document.

This preserves the old readers’ useful outputs—visible words, link addresses and image text—inside one tool. The existing reading contract already preserves links and suppresses password content; those are requirements to retain. [types.ts:2312](C:/Users/mikes/WebstormProjects/browser/src/core/types.ts:2312)

### Header and footer

Normal header:

```text
page "Shipping policy" http://127.0.0.1:43123/policy | revision 1 | 58 lines
```

Bound displayed title and address to 120 and 160 UTF-16 units respectively. If either needs abbreviation, mark it explicitly and place its complete value in addressed metadata lines. Escape embedded newlines and control characters.

Normal footer:

```text
[lines 35-40 of 58; 34 above; 18 below; next: read from 41 with search=""]
```

The footer names the first omitted line after the returned range. At the end, print `next: end`.

The **entire result**—action status, header, rows and footer—must fit `BROWSER_TOOL_LIMIT`. Reserve complete metadata and footer space before adding rows. Never truncate an addressed row or its continuation instruction afterward.

This strengthens the present implementation, which bounds the body before appending its suffix. The constant remains 4,000 UTF-16 units. [BrowserToolset.ts:668](C:/Users/mikes/WebstormProjects/browser/src/core/BrowserToolset.ts:668), [constants.ts:403](C:/Users/mikes/WebstormProjects/browser/src/core/constants.ts:403)

### Ranges

- `from` is a safe integer, 1-based and inclusive; default `1`.
- `to` is inclusive. Omitted means at most 40 lines beginning at `from`.
- `to: -1` requests through the end, still constrained by the result limit.
- An explicit `to` can request more than 40 lines.
- Clamp `to` above the document end.
- Reject invalid numbers, reversed ranges and `from` beyond a nonempty document.
- An empty document returns its header and an empty footer, with no fictitious line zero.
- Returning fewer lines because of the character limit always yields the exact next line.

Reject silent restart for an out-of-range request. A stale capture is a separate, explicitly reported condition.

### Search

Search the semantic text and destinations of every projected line, including ordinary page text. Exclude generated reference tokens and header/footer syntax.

Matching is:

1. Unicode letter/digit words;
2. case-insensitive;
3. no stemming or substring matching;
4. score by distinct query words shared with a line;
5. return every highest-positive-score line, in document order.

This retains useful partial-word-set matching without retaining the old restriction to reference-bearing outline rows. That restriction and the old text scorer are separate implementations today. [helpers.ts:249](C:/Users/mikes/WebstormProjects/browser/src/core/helpers.ts:249), [helpers.ts:281](C:/Users/mikes/WebstormProjects/browser/src/core/helpers.ts:281), [helpers.ts:300](C:/Users/mikes/WebstormProjects/browser/src/core/helpers.ts:300)

Include one addressed context line before and after each match; deduplicate overlaps. A match prints `N >`; context prints `N |`.

Cap matches at 10. If the matched rows and their complete context cannot fit the whole-result limit, return no partial hit set. Report that the search is too broad and request narrower words; retain the ordinary `read` continuation path. Report no match explicitly.

Reject a nonempty `search` combined with `from` or `to`. Search locates lines; an empty search reads a range.

Rejected alternatives:

- Substrings and stemming increase accidental matches and make the matching rule harder to explain.
- Returning the first matches conceals later ties.
- Searching only a requested window can falsely imply that absent text does not exist.
- Automatically prefixing search results to a normal window spends the output budget on overlapping content.

### Stability

Retain a revision for the last exposed projection.

An unchanged document identity, canonical content and reference mapping preserve its revision and line numbers. On each `read`, recapture and compare.

If a range request refers to the previously exposed page but the projection changed:

- increment the revision;
- state that the previous lines are stale;
- return the first window of the new projection;
- do not apply the old range silently.

A search reruns against the new projection and reports the revision change. An action returns the first window of its resulting projection.

Bracket the joined capture with document identity and mutation observations. Retry once if it changes during capture, within the capture deadline; otherwise return a bounded capture failure. Do not claim an atomic snapshot from separately completed protocol requests.

This contract detects changes since the last exposed view. Without a caller-supplied revision, it cannot detect a caller reusing numbers from an older, already superseded view. Accept that limitation rather than adding another model parameter.

### Rendered examples and measurements

These are proposed renderings of the existing fixture text, not outputs from an implemented renderer. Catalogue content comes from [setupStore.ts:244](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:244), [setupStore.ts:261](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:261), and [setupStore.ts:299](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:299). Policy content comes from [setupStore.ts:425](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:425).

Catalogue, `read({ search: "", from: 1, to: 12 })`:

```text
page "Harbor Goods — Catalogue" http://127.0.0.1:43123/ | revision 1 | 51 lines
1 | [e1] link "Catalogue" <http://127.0.0.1:43123/>
2 | [e2] link "Cart" <http://127.0.0.1:43123/cart>
3 | [e3] link "Checkout" <http://127.0.0.1:43123/checkout>
4 | # Harbor Goods
5 | [e4] searchbox "Search products" value=""
6 | [e5] button "Search"
7 | ## Featured products
8 | - ### [e6] link "Birch Cutting Board" <http://127.0.0.1:43123/product/p2>
9 |   $22.50. An end-grain birch board with a juice groove on one face.
10 | - ### [e7] link "Cedar Tea Tray" <http://127.0.0.1:43123/product/p3>
11 |   $41.00. A slatted cedar tray that drains into a hidden reservoir.
12 | - ### [e8] link "Linen Apron" <http://127.0.0.1:43123/product/p5>
[lines 1-12 of 51; 0 above; 39 below; next: read from 13 with search=""]
```

Catalogue, `read({ search: "shipping cutoff time" })`:

```text
page "Harbor Goods — Catalogue" http://127.0.0.1:43123/ | revision 1 | 51 lines
Matches "shipping cutoff time": 1
49 | We answer every message ourselves, usually within one working day. Tell us what you cook and how you cook it, and we will suggest the piece that suits your kitchen.
50 > ## Shipping
51 | Orders placed before 2:40 PM ship the same working day. Orders placed later ship the next working day.
[lines 49,50,51 of 51; 48 above; 0 below; 0 between; search complete; next: end]
```

Policy after its first window, `read({ search: "", from: 35, to: 40 })`:

```text
page "Shipping policy" http://127.0.0.1:43123/policy | revision 1 | 58 lines
35 | During storms the ferry to the islands can stop for several days, and parcels wait at the harbour depot until it runs again. Between the last week of December and the first working day of January the workshop is closed and nothing ships.
36 | ## Tracking your parcel
37 | The tracking link arrives by email on the day the parcel leaves the workshop. It shows each scan the carrier records: collection, the sorting depot, the local depot, and the delivery van. A parcel can go a day without a scan while it
38 | travels between depots.
39 | ## Delivery to a workplace
40 | You can send an order to a workplace. Add the company name on the address line and the floor or department on the second line, so the post room can find you. Most post rooms sign for parcels, so a workplace delivery rarely misses.
[lines 35-40 of 58; 34 above; 18 below; next: read from 41 with search=""]
```

Policy, `read({ search: "tracking your parcel" })`:

```text
page "Shipping policy" http://127.0.0.1:43123/policy | revision 1 | 58 lines
Matches "tracking your parcel": 2
10 | ## Carriers
11 > Standard parcels travel with the national post. Heavy parcels, over ten kilograms, travel with a courier who books a delivery window by text message. Both carriers give you a tracking link on the day your parcel leaves the workshop.
12 | ## Delivery times
35 | During storms the ferry to the islands can stop for several days, and parcels wait at the harbour depot until it runs again. Between the last week of December and the first working day of January the workshop is closed and nothing ships.
36 > ## Tracking your parcel
37 | The tracking link arrives by email on the day the parcel leaves the workshop. It shows each scan the carrier records: collection, the sorting depot, the local depot, and the delivery van. A parcel can go a day without a scan while it
[lines 10,11,12,35,36,37 of 58; 9 above; 21 below; 22 between; search complete; next: read from 38 with search=""]
```

Measured without a trailing newline:

| Rendering | UTF-16 units | UTF-8 bytes |
|---|---:|---:|
| Catalogue range shown | 797 | 799 |
| Catalogue search shown | 489 | 491 |
| Policy range shown | 959 | 959 |
| Policy search shown | 1,014 | 1,014 |
| Default catalogue window, lines 1–40 | 3,415 | 3,508 |
| Default policy window, lines 1–34 | 3,877 | 3,877 |

Command: `node --input-type=module-typescript`, with fixture blocks, the 240-unit wrapping rule, and complete rendered strings supplied on stdin. Each measurement used:

```ts
console.log(JSON.stringify({
	length: rendered.length,
	bytes: Buffer.byteLength(rendered),
}))
```

The catalogue shipping fact lies beyond its measured default window. The policy fixture needs extension for the stricter paging proof described below; that extension will change its total and requires remeasurement.

## 3. The contract types

Define projection contracts in `browser/src/core/types.ts` before implementation:

```ts
export type BrowserSpan =
	| {
			readonly category: 'text'
			readonly text: string
	  }
	| {
			readonly category: 'syntax'
			readonly text: string
	  }
	| {
			readonly category: 'reference'
			readonly ref: string
	  }

export interface BrowserLine {
	readonly spans: readonly BrowserSpan[]
	readonly continuation: boolean
}

export interface BrowserProjection {
	readonly url: string
	readonly title: string
	readonly lines: readonly BrowserLine[]
}

export interface BrowserWindowOptions {
	readonly search: string
	readonly from?: number
	readonly to?: number
}
```

`continuation` identifies a hard-split token fragment. Line numbers derive from array position. Search text and displayed text derive from spans; do not store duplicate searchable or formatted strings.

Add `project(options?: BrowserCallOptions): Promise<BrowserProjection>` to the shared element-manager contract. Its first consumers are the page reader and action receipts. Both manager implementations use a shared pure renderer; neither forwards through a renamed outline wrapper.

Extend `BrowserSnapshotOptions` with the existing call cancellation/deadline contract and pass it through snapshot acquisition. Its present options cover capture shape but contain no signal or timeout. [types.ts:3313](C:/Users/mikes/WebstormProjects/browser/src/core/types.ts:3313), [types.ts:2711](C:/Users/mikes/WebstormProjects/browser/src/core/types.ts:2711)

Also:

- Remove `look` and `plain` from tool-name unions, definitions, observation sets and examples.
- Replace tool-level `offset` with `from` and `to`.
- Add the journey selectors `journey` and `run`; require `journey` when `run` is supplied.
- Replace the handler’s body/footer tuple with an internal result contract that permits budget reservation before rendering.
- Add explicit receipt outcomes for a handled submission whose page changed and one whose deadline expired without a change.
- Keep projection state, revision allocation and capture lifecycle in the toolset class.
- Put pure rendering, wrapping, matching and window-selection functions in their kind files and export reusable leaves.

Do not change `BrowserReadOptions` merely to remove its character offsets. That contract belongs to the independent programmatic HTML reading API, not the model tool schema. Retaining that capability is not retaining a `look` or `plain` compatibility tool. [types.ts:2267](C:/Users/mikes/WebstormProjects/browser/src/core/types.ts:2267), [BrowserReading.ts:64](C:/Users/mikes/WebstormProjects/browser/src/core/BrowserReading.ts:64)

## 4. The other changes

### Action receipts and handled submissions

| Tool | Result |
|---|---|
| `click`, `type`, `press` | Action outcome, any dialog information, then the settled page window |
| `navigate` | Navigation outcome and loaded page window |
| `wait` | Condition outcome and page window, including on timeout when capture remains possible |
| `dialog` | Answer outcome, resumed-action outcome and resulting page |
| `tabs` | Numbered tab listing, current marker, addresses and exact continuation |
| `switch` | Selected-tab outcome and page window |

`wait` currently returns a condition sentence without the view; update that boundary. [BrowserToolset.ts:1101](C:/Users/mikes/WebstormProjects/browser/src/core/BrowserToolset.ts:1101)

For handled submissions, choose **waiting for the first relevant rendered page change inside the action receipt**. Do not add empty-text `wait`.

The existing receipt has a 5,000 ms deadline and reserves 1,000 ms for capture. Its handled-submission copy tells the model to call `wait`; the observer reader also deletes the observation and listeners. Those facts explain why changing the copy alone cannot close the race. [constants.ts:413](C:/Users/mikes/WebstormProjects/browser/src/core/constants.ts:413), [constants.ts:440](C:/Users/mikes/WebstormProjects/browser/src/core/constants.ts:440), [compilers.ts:195](C:/Users/mikes/WebstormProjects/browser/src/core/compilers.ts:195)

Implement this lifecycle:

1. Install submission observation before dispatching the input.
2. In the capture-phase submit listener, arm change observation before application handlers run.
3. Record synchronous changes as well as delayed changes.
4. Read submission state without destroying the observer.
5. For prevented submission, await the first relevant rendered change, navigation, dialog, abort or detachment.
6. Stop waiting before the existing capture reservation.
7. Capture the resulting page and release every observer in cleanup.

Do not count typing before submission, hidden mutations or unrelated document bookkeeping as completion. Do not repeat a submission.

Use bounded, factual outcomes:

- `Submission sent; the page changed.`
- `Submission sent; no page update before the deadline. Do not submit again; read the page for its status.`

A first change can be a loading indicator. The browser cannot infer arbitrary business completion from it. The receipt must not claim that an order succeeded unless the page says so.

Test synchronous handling, the delayed fixture, no change, unrelated mutation, navigation, dialog, abort, frame detachment and observer cleanup against real pages. The store fixture deliberately prevents navigation and appends confirmation after 200 ms, making it a direct regression case. [setupStore.ts:379](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:379)

### Journey bounds and continuation

The journey execution boundary currently returns handler text directly; recording, saving, editing and replay concatenate their own views or listings. [BrowserJourneyToolset.ts:142](C:/Users/mikes/WebstormProjects/browser/src/core/BrowserJourneyToolset.ts:142), [BrowserJourneyToolset.ts:230](C:/Users/mikes/WebstormProjects/browser/src/core/BrowserJourneyToolset.ts:230), [BrowserJourneyToolset.ts:484](C:/Users/mikes/WebstormProjects/browser/src/core/BrowserJourneyToolset.ts:484)

Replace that with result-aware formatting:

- `record`: bounded status plus first page window; continue through `read`.
- `save`, `edit`: bounded status plus the canonical numbered saved-journey listing; continue through `journeys` with `journey`.
- `journeys`: numbered index, selected journey or selected persisted run.
- `replay`: bounded outcome, saved run identity and final page window. Continue the page through `read`; inspect the complete run through `journeys` with `journey` and `run`.
- `forget`: fixed bounded confirmation.
- `capture`: complete path or explicit bounded failure; never return a clipped path.

Saved run lookup already exists in the run-store interface, so inspection can reuse persisted evidence. [types.ts:2127](C:/Users/mikes/WebstormProjects/browser/src/core/types.ts:2127)

Use the same range, search and whole-result budgeting rules for textual journey documents. Reserve selectors and footer before rows. A selector or storage path that cannot fit must produce an explicit boundary failure, not an unusable continuation. Validate predictable oversized identifiers before mutation; report an unexpected store return truthfully without retrying the mutation.

Update the guide’s vocabulary, reading examples, continuation, recording observations, delayed submission, bounded listings and replay inspection. Remove the recommendation that a handled checkout needs a separate wait, and remove the duplicate-submission editing example. Those passages exist at [browser.md:3000](C:/Users/mikes/WebstormProjects/browser/guides/browser.md:3000), [browser.md:3092](C:/Users/mikes/WebstormProjects/browser/guides/browser.md:3092), and [browser.md:3114](C:/Users/mikes/WebstormProjects/browser/guides/browser.md:3114).

### Browse MCP server

Expose the revised definitions without aliases. Remove `look` and `plain`; reject their invocation. Preserve capability-dependent availability.

The server registers the shared page and journey definitions and returns string results as MCP text content. Update registration, advertised-schema assertions, invocation tests, stale-reference tests and continuation tests. [BrowserMCPServer.ts:219](C:/Users/mikes/WebstormProjects/browser/src/server/BrowserMCPServer.ts:219), [BrowserMCPServer.ts:328](C:/Users/mikes/WebstormProjects/browser/src/server/BrowserMCPServer.ts:328), [BrowserMCPServer.test.ts:583](C:/Users/mikes/WebstormProjects/browser/tests/src/server/BrowserMCPServer.test.ts:583)

Test the complete returned MCP text against the bound, not only its page body.

### Agent string encoding and fleet consumers

Change successful tool-message construction to preserve strings verbatim and JSON-encode nonstrings. Preserve the existing error path.

`Agent.ts` presently JSON-stringifies successful values, including strings; validators require string message content but do not decode JSON. [Agent.ts:557](C:/Users/mikes/WebstormProjects/agent/src/core/Agent.ts:557), [validators.ts:25](C:/Users/mikes/WebstormProjects/agent/src/core/validators.ts:25)

The scoped fleet census found **no consumer that JSON-decodes string tool-message content**. Relevant consumers are:

| Consumer | Treatment |
|---|---|
| Ollama `mapMessages` | Copies `message.content` unchanged |
| Ollama page service tests | Inspect receipt text with `includes` |
| Ollama tool service tests | Inspect content for the returned datum |
| Supervisor inference-request parser | Validates and copies content |
| Supervisor CLI provider | Refuses tool-role messages |

Evidence: [ollama/helpers.ts:27](C:/Users/mikes/WebstormProjects/ollama/src/core/helpers.ts:27), [page.test.ts:349](C:/Users/mikes/WebstormProjects/ollama/tests/service/page.test.ts:349), [tools.test.ts:112](C:/Users/mikes/WebstormProjects/ollama/tests/service/tools.test.ts:112), [supervisor/parsers.ts:796](C:/Users/mikes/WebstormProjects/supervisor/app/core/parsers.ts:796), [CLIProvider.ts:293](C:/Users/mikes/WebstormProjects/supervisor/app/server/providers/CLIProvider.ts:293).

The store harness’s `renderToolText` independently passes strings through. Its JSON parsing of stored journey files is a different boundary. [setupStore.ts:853](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:853), [setupStore.ts:1674](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:1674)

Add exact-equality coverage for multiline strings, quotes, backslashes, Unicode and empty strings. Retain nonstring and error behavior. Run the live tool-content consumers after integrating the agent release.

### Ollama harness and case claims

Page tasks instantiate only page tools. The journey case opts into journey tools. Do not use the existing page-filter helper unchanged: it also removes `type.secret`. The run builder presently enables journeys and seeds with `look`. [setupStore.ts:1048](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:1048), [setupStore.ts:1581](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:1581)

Seed with `read({ search: "" })`. Update the generic system instructions without supplying task answers.

Use one complete predicate per case for both retries and final assertions:

| Case | Required claim |
|---|---|
| Shipping | Shared oracles; fact absent from seed; a successful model-issued read exposes it; answer contains the fact |
| Cart | Shared oracles; authoritative cart equals exactly the requested product |
| Search | Shared oracles; authoritative submitted query resolves to the intended products; answer names exactly those products |
| Checkout | Shared oracles; exactly one authoritative order, for the requested buyer; answer contains the confirmation code |
| Paging | Shared oracles; a successful model-issued range read starts at the exact next line named by an earlier successful model-issued range read and exposes the token |

These retain the existing shipping, cart and search assertions while strengthening checkout. Search currently retries on a predicate that omits the shared assertions; checkout currently accepts inclusion of the buyer rather than exactly one order. [browser.test.ts:154](C:/Users/mikes/WebstormProjects/ollama/tests/service/browser.test.ts:154), [browser.test.ts:183](C:/Users/mikes/WebstormProjects/ollama/tests/service/browser.test.ts:183), [browser.test.ts:201](C:/Users/mikes/WebstormProjects/ollama/tests/service/browser.test.ts:201), [browser.test.ts:234](C:/Users/mikes/WebstormProjects/ollama/tests/service/browser.test.ts:234)

For paging:

- Preserve the requirement that the earlier footer came from a **model-issued read**. Do not count the seed.
- Extend ordinary policy material so the token is beyond both the seed window and the next default window.
- Put its reference section beyond that boundary.
- Require empty search, an integer `from`, matching document revision and exact footer equality.
- A search hit, guessed line, stale footer or correct final answer alone does not pass.
- Retain the existing distinction that final-answer correctness is reported separately from the paging mechanism claim.

The existing oracle excludes seed footers and does not require the final answer to contain the token. [setupStore.ts:1488](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:1488), [setupStore.ts:1503](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:1503)

The fixture’s labelled policy reference is searchable, so a search can bypass traversal. Reject that sequence in the paging oracle rather than disabling a valid reader capability. [setupStore.ts:529](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:529)

Validate fixture placement through the actual new projection, replacing the existing Markdown character-index proof. [setupStore.test.ts:230](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.test.ts:230)

Update reference tracking to replace the exposed reference set on each page revision, including an empty set. The present recorder retains previous references when a result supplies none. [setupStore.ts:1187](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:1187)

For journeys, replace removal of a second submission with removal of a harmless recorded focus click:

1. Record a click on the full-name field, then enter the name and submit once.
2. Save and inspect the journey.
3. Submit one atomic edit batch that declares the buyer parameter, updates the typing step and removes that redundant focus click.
4. Replay with another buyer.

Assert the actual removed step existed, was the focus click, and was unnecessary because typing focuses the control. Assert the submission step remains, the saved revision is replayed, the input is bound, and each buyer has exactly one order. Preserve sequence, parameter-default, batch-operation, persisted-file, run-completion and tool-limit assertions.

This changes the fixture mechanism explicitly; it does not silently drop the edit-removal claim. The existing oracle requires removing a later submission and checks the persisted replay revision and buyer. [setupStore.ts:1897](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:1897), [setupStore.ts:1926](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:1926), [browser.test.ts:277](C:/Users/mikes/WebstormProjects/ollama/tests/service/browser.test.ts:277)

Remove the unread meter calls and their now-unused harness plumbing. The run currently performs synthetic meter generations after recording elapsed time. Collect usage from real generations instead. [setupStore.ts:1075](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:1075)

## 5. The measurement plan

These measurements are read-only calculations over strings and archived transcripts. They are not implementation or live-service validation.

### Latency evidence and budgets

Use `elapsed / turns.length` as an **amortized historical observation**, not provider-only latency. For example, archived shipping run 1 took 27,642.65 ms over eight model turns: 3.455 seconds per turn. The earlier review’s five-turn denominator does not match that transcript. [read-1.json:217](C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-campaign/attempt-3/S0/run-1/transcripts/read-1.json:217), [read-1.json:259](C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-campaign/attempt-3/S0/run-1/transcripts/read-1.json:259), [review.md:67](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/lifecycle/store-design/review.md:67)

Across the archived S0 attempts:

| Case | Measured attempts | Median seconds/turn | Maximum seconds/turn |
|---|---:|---:|---:|
| Shipping | 48 | 3.172 | 4.058 |
| Cart | 18 | 2.684 | 2.770 |
| Search | 31 | 3.333 | 8.089 |
| Checkout | 16 | 1.985 | 2.612 |
| Paging | 48 | 2.479 | 3.991 |

Measurement command, run with `node -e`, read each matching JSON transcript under `ollama/tmp/codex/store-campaign/attempt-3/S0/run-*/transcripts/`, grouped by `task`, and evaluated:

```ts
transcript.elapsed / transcript.turns.length / 1000
```

Predeclare these per-attempt performance targets:

| Case | Planned model-turn allowance | 2B target | 4B target |
|---|---:|---:|---:|
| Shipping | 3 | 16 s | 35 s |
| Cart | 4 | 15 s | 25 s |
| Search | 3 | 28 s | 27 s |
| Checkout | 4 | 14 s | 20 s |
| Paging | 3 | 15 s | 31 s |

Derivation: round up `3 seconds + planned turns × maximum archived amortized seconds/turn`. The additional 3 seconds is a declared allowance, not a measured setup value. The 4B calculation uses its supplied archived attempts and is a sparse baseline.

Keep every existing execution timeout, attempt limit, context, prediction limit and temperature unchanged. These are performance acceptance targets below the execution ceilings, not permission to extend them. The harness settings are defined at [setupStore.ts:677](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:677).

Instrument new runs with monotonic timestamps around each actual generation, each tool and seed capture. Separate model reload/warm-up time. Report actual prompt usage from those generations. Do not adjust targets after seeing candidate results.

For the journey case, preregister 360 seconds per attempt: the existing conversation allowance of up to 40 model turns multiplied by the measured 8.089-second maximum, plus 30 seconds for setup and actions, rounded up to a minute. Keep its existing attempt and execution ceilings. [browser.test.ts:293](C:/Users/mikes/WebstormProjects/ollama/tests/service/browser.test.ts:293), [setupStore.ts:715](C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:715)

### Cheapest-first decision rules

| Stage | Instrument | Decision |
|---|---|---|
| Deterministic contracts | Real-page projection, mutation, receipt and oracle tests; exact copy/output measurements | Any failure stops promotion |
| First reply | Each page task at eight preselected loopback ports, one generation per fixture | Require 8/8 valid task-directed tool choices per task; otherwise stop |
| Single attempts | Eight fresh attempts per page task, without retries | Require 8/8 full predicate passes within the per-attempt target |
| 2B confirmation | Sixteen complete store-task runs using unchanged retry rules | Require 16/16 runs passing every page task; stop at a failed run |
| 4B confirmation | Two complete runs | Require 2/2 passing every page task |
| Journey | Full recorded/save/inspect/edit/replay case | Require the complete predicate within the existing attempts |

For confirmation, report every first-attempt result and every retry. Require total case time, including failed attempts, to remain within three times its per-attempt target. A retry does not erase its cost.

Classify first replies by a preregistered set of valid actions, not one preferred spelling. For example, shipping may search or continue reading; cart may inspect or follow an exposed product link. Paging must begin a range continuation. Do not accept arbitrary navigation to an unexposed answer-bearing URL.

Fix ports and their order before measuring; do not retain only favorable ports.

### Guard interpretation

Use closed empirical gates, not a nonsignificant test as permission to retain a regression. The previous review identified that problem in the earlier significance guard. [review.md:7](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/lifecycle/store-design/review.md:7)

- The eight-trial screens reject an observed fall of one success: 12.5 percentage points.
- The sixteen-run confirmation rejects one failed run: 6.25 percentage points.
- The two-run 4B check rejects one failed run: 50 percentage points.

These are sample resolutions, not population noninferiority guarantees. With no failures, one-sided 95% upper failure bounds are approximately 31.2%, 17.1% and 77.6% respectively.

Measured with:

```text
node -e "for (const n of [8,16,2]) console.log(n,100*(1-Math.pow(.05,1/n)))"
```

Every observed outcome has a decision. A failed candidate needs a changed implementation or an explicit user ruling; running another unchanged series does not reset the evidence.

## 6. The units

The existing blind planner and analyst outputs are the design round. Reconcile them once; do not commission another design opinion on the same brief.

| Unit and route | Owned files | Dependencies and acceptance |
|---|---|---|
| Contract and copy — Opus implementation; Orchestrator runs commands | Browser `types.ts`, `constants.ts`, required barrel declarations | Reconciled design. Types first; exact schemas; no old tool aliases; copy measurements pass |
| Projection — Astra | Browser projection helpers, element managers, snapshot acquisition, corresponding tests | Contract. Shared backend rendering; identity joins; wrapping, ranges, search, stale captures and cancellation proven |
| Receipts — Astra | `BrowserToolset.ts`, submission compiler helpers, corresponding tests | Projection. Whole-result limit; first-change submission settlement; no repeated side effects; cleanup under all exits |
| Journey and MCP integration — Astra | `BrowserJourneyToolset.ts`, MCP integration and corresponding tests | Projection and receipts. Every result bounded; usable continuations; persisted run inspection; revised server vocabulary |
| Agent encoding — Astra | Agent tool-message construction and focused tests | May run alongside browser work in its own checkout. Exact string preservation; nonstring/error parity |
| Harness and instruments — Astra | Ollama `tests/setupStore.ts`, its reusable type/kind files, `setupStore.test.ts`, service browser tests, measurement instruments | Browser contracts available. Exact predicates; projection-based fixture proofs; page-only exposure; no duplicate-submission dependency; meter removed |
| Documentation — Opus; Orchestrator runs commands | Browser and agent guides, source examples and guide proofs; browser guide mirrors | Implemented contracts. No stale names, offsets or duplicate-submit advice; guide parity |
| Independent audit and gates | Read-only reports and evidence | Integrated result. Opus attacks Astra-written mechanisms; Astra attacks Opus-written contracts and copy; independent Astra command runner executes verifier work |

Serialize browser writing units because they share types, helpers and tests. Agent work can proceed in parallel in its separate checkout. Ollama can prepare fixture and oracle changes after the contract settles; live integration waits for locally built browser and agent artifacts.

Writers run the selected proof, touched tests and project checks. The independent gate runner performs tree-wide format, lint, typecheck, build and tests once after integration. Record actual `prove` closing lines where that instrument is selected. Do not substitute a writer’s report for gate output.

Acceptance attacks must include:

- duplicate accessible names and frame-qualified references;
- Unicode and oversized rows;
- missing or clipped continuation;
- changed documents between windows;
- late confirmation and observer cleanup;
- duplicate checkout and replay orders;
- retry/assertion disagreement;
- quoted or escaped string tool messages;
- output growth from journey prefixes and errors.

Release browser **0.0.27** and agent **0.0.27** after acceptance, then re-pin and release ollama. Refresh the browser guide mirrors at their repository visits. Publication requires the user’s one-time codes under the existing campaign ruling. [campaign.md:53](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/lifecycle/reading/campaign.md:53), [campaign.md:69](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/lifecycle/reading/campaign.md:69)

## 7. Risks

- **Joined capture consistency:** DOM and accessibility acquisition are separate operations. Identity joins, mutation detection and bounded retry need real frame and navigation tests.
- **Capture cost:** Acquiring richer content can consume the receipt’s capture reservation. Reuse batched snapshots; reject per-element protocol enrichment. Measure before live model runs.
- **First change is limited evidence:** A loading state can satisfy the settlement barrier. Report the observed change, retain explicit text waiting, and never infer business success.
- **Stale line ambiguity:** Without a revision argument, old numbers reused after a newer exposure cannot always be detected. The visible revision and reset-on-change behavior make this limitation explicit.
- **Search refusal:** Requiring complete matches and context may reject broad queries. That costs another read, but avoids hidden omissions.
- **Paging fixture pressure:** Preserving model-read-to-model-read continuation requires a longer fixture. Do not solve a resulting model failure by counting the seed.
- **Copy headroom:** Journey copy nearly reaches its existing bound. Schema or wording changes require immediate remeasurement.
- **Statistical limits:** The mandated confirmation series demonstrates those runs, not a low population failure rate. Preserve failures and retry costs in the report.
- **Custom storage outputs:** Unbounded identifiers or paths can exceed the tool budget even when page rows are bounded. Fail explicitly and preserve whether a side effect already occurred.

## 8. Points that need the user’s ruling

No new ruling is required to implement this proposal.

If the preserved paging claim or fixed measurement gates fail, return the concrete evidence before changing the acceptance criterion. Counting the seed as a prior read, raising budgets, weakening exact-order assertions or restoring an extra reading tool would require a new ruling.

Publication still requires the one-time codes already specified by the campaign.