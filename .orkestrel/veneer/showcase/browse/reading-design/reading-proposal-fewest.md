## Design

**Lane:** subjective. It covers shape, naming, ergonomics, and design fit, judged from the angle of the fewest well-named words. Every path is under `C:/Users/mikes/WebstormProjects/browser-wt-browse`.

**Decision:**
- The library gains no member.
- The agent toolset gains no tool and no argument.
- The `read` tool puts its ignored `what` argument to work: on the first page, the projection's lines that share the most words with `what` come first, under the rule `look` already applies to rows. Every page is the whole rendered page in Markdown (`distill: false`), not the distilled region.
- Every other reader need is already a named method, is deferred until a consumer exists, or is refused.

### 1. The axes

| Axis | Reader need | Ruling |
|---|---|---|
| Format: markup, Markdown, plain text | Parse, read with structure, or read words only | Covered. `reading.html`, `markdown()`, and `text()` are separate algorithms, so they stay separate methods (`.claude/rules/names.md:65-81`). The tool keeps Markdown and gets no format switch; see Tensions. |
| Whole page against main content | Learn a fact that sits anywhere (a header status, a cart count) against reading an article | Covered by the existing `distill` option. The tool reads the whole page, because the b2 header-status `read` calls returned distilled body text instead of the requested sentence (`tmp/codex/reading-surface-map.md:285`). |
| Find within the text | Get the line about X without paging 60,000 characters | Covered by putting the `read` tool's `what` to work. The surface map finds that the handler never reads `what` (`tmp/codex/reading-surface-map.md:59`). |
| Rendered against all | What a person sees | This is the substrate: item 11's capture (`tmp/codex/browse-11-design.md:1-3`). No method switch. Reading hidden text is refused (see Refusals). |
| Region or element | Read one part of the page | Library: covered by `element.read()` (`src/core/types.ts:2551-2556`). Tool: deferred, and the `ref` refusal stays. The outline gives references only to interactive roles (`src/core/constants.ts:319-347`), so a region such as a banner or status has no reference to pass. `what` serves the "part I need" case. |
| Interactive structure and state | Act on controls | Covered by `look`, `outline`, and `accessibility.snapshot`. Unchanged. |
| Form values | Read typed values | Covered by item 11's lowering in the capture and by outline rows. Unchanged. |
| Links and images | Destinations and alternative text | Covered inside the Markdown. A separate listing is deferred: it has no consumer, and Firecrawl's separate `links` format is the only prior art for one (`tmp/codex/reading-prior-art.md:12`). |
| Metadata: language, description, canonical URL | Identify the page | `url` and `title` are covered. The rest is deferred: it has no consumer, and item 11 drops `head` (`tmp/codex/browse-11-design.md:93`). |
| Change over time | Text appeared, text left, the reading went stale | Covered by `wait` with `absent` (item 12, already ruled) and by `stale`. A diff is refused. |
| Length and paging | Bounded replies | Covered by `offset` and `limit`. Unchanged. |
| Shaping by a language model (schema, summary) | Structured answers | Refused (see Refusals). |
| Pixels | What the page looks like | Deferred to `ROADMAP.md` item 7 (screenshots). |

### 2. The method set

Library: no added, renamed, or removed member.

| Method | One sentence a newcomer understands | Returns | Leaves out | Surfaces and placements | Options |
|---|---|---|---|---|---|
| `view.read()`, `page.read()`, `frame.read()`, `element.read()` | Captures what the page or element shows, once. | `BrowserReadingInterface` | Hidden and redacted content, as item 11 defines | Library; CDP and DOM | `timeout`, `signal` |
| `reading.markdown(options)` | The captured page as Markdown. | `BrowserReadResult` | Anything the floor drops; with `distill` left on, also boilerplate and everything outside a single `main` or `article` | Library, and the tool through `read`; both placements | `distill` (boolean, default `true`: project the distilled document), `offset` (integer, `0`), `limit` (integer, unbounded) |
| `reading.text(options)` | The captured page as plain text. | `BrowserReadResult` | The same, plus link destinations, image alternative text, heading levels, and list markers | Library; both placements | The same options as `markdown` |
| `reading.html` | The parsed capture. | `HTMLInterface` | Nothing beyond what the capture drops | Library | None |
| `view.wait(text, options)` | Waits until the text shows, or until it is gone. | `void` | Not applicable | Library, and the tool through `wait`; both placements | `absent`, under the type renamed to `BrowserWaitOptions` (item 12, already ruled) |
| `elements.outline(options)` | Lists the page's text and the elements you can act on. | `BrowserOutline` | Unchanged | Library, and the tool through `look`; both placements | Unchanged |

Why each of these is a method and not an option:
- `markdown`, `text`, and `html` are different algorithms. A `format` literal would be the magic mode that `.claude/rules/names.md:75` forbids.
- `read` is the capture. The projections are its views. Merging them would recapture on every slice.

Why each of these is an option and not a method:
- `distill` selects a datum for the same projection: which document gets projected.
- `offset` and `limit` bound one result.

Tool-side helper (exported, tested, not a library entity method):

```ts
export function matchBrowserLines(text: string, search: string): readonly string[]
```

- It returns the non-blank lines of `text` that share the most distinct words of at least 3 letters or digits with `search`, in document order. A text with no matching line returns an empty array.
- It shares the scoring of `matchBrowserOutline` (`src/core/helpers.ts:239-272`) through `extractBrowserWords(text: string): ReadonlySet<string>`. That helper is extracted from `src/core/helpers.ts:243-245` and `:259-264` and exported with a test.
- Why a helper and not a `search` option on `markdown`: matching is independent of the slice, so it does not belong in every `BrowserReadResult`. The toolset is the only consumer (`AGENTS.md` § Minimal public API).

### 3. The tool surface

**Tools.** The set is unchanged: `look`, `read`, `click`, `type`, `press`, `navigate`, and `wait`, plus `dialog`, `tabs`, `switch`, and the journey tools where they apply. No tool is added and none is renamed.

**`read`:**
- Description: `Reads the page's text. Call it to learn a fact.`
  - 10 words and 47 characters, against the existing 110.
  - The phrase about continuing goes, because the footer already says `call read with offset END for more` (`src/core/BrowserToolset.ts:810`), and `look`'s description carries no such phrase.
- Arguments: `what` (string, required) and `offset` (integer, default 0).
  - `what` description: `What you want to learn; the lines that match are listed first.` That is 62 characters against the existing 37, and it mirrors `look`'s wording at `src/core/constants.ts:534`.
- Ruling on what `what` does:
  - At offset 0, the reply opens with `COUNT lines match "WHAT":` (`1 line matches` for one), then the matching lines, then a blank line. This block takes at most half the room, the same rule as `look` (`src/core/BrowserToolset.ts:714-727`).
  - After the block comes the paged whole-page Markdown.
  - The block sits outside the paged text, so `offset` never depends on `what`.
  - A later offset gets no block.
  - A `what` with no word of at least 3 letters or digits, or with no match, gets no block.
- Projection: `reading.markdown({ distill: false })`, computed once per reading and sliced with `extractBrowserSlice`.

**`look`, `wait`, and receipts:**
- `look` is unchanged.
- `wait` takes item 12's `absent` as ruled.
- Receipts are unchanged.

**Effect on the 6,050-character bound:**

| Change | Characters |
|---|---|
| `read` description | −63 |
| `what` description | +25 |
| This design, net | −38 (estimated) |
| Item 12 | about +140 (`tmp/browse-item-12-design.md:178`) |

The baseline serialized length was not measured in this lane; see Measurements. This design shrinks the copy, so it never forces a raise of the bound.

### 4. Naming defense

| Name | What a reader expects | Prior-art match or collision | Why it wins over the two strongest alternatives |
|---|---|---|---|
| `read` (tool and method) | Read the page's words | Matches "Reader" in Jina and Readability | `extract` means "run a language model" in browser-use and Stagehand. `content` means HTML in Playwright and Puppeteer (`reading-prior-art.md:34`). |
| `look` | See what is on screen and what can be acted on | No collision | `snapshot` sounds like a picture (`reading-prior-art.md:34`). `outline` is the library method; as a tool name it hides that the result carries references. |
| `what` | What the reader is after | The tool-side term in `look`, `read`, `tabs`, and `journeys` | `search` is the library key, but renaming the tool argument changes four tools' copy for one concept. `query` suggests a selector (CSS or XPath). |
| `markdown`, `text`, `html` | The named format | Understood without documentation (`reading-prior-art.md:33`). After item 11, `text` is close to innerText, which is the Jina and Playwright meaning. | `content` is ambiguous. `plain` is an adjective, not a format name. |
| `distill` | Reduce to the essence | Only this fleet says "distill" (`reading-prior-art.md:20`); it is `HTMLInterface.distill`'s own term. Read as a request in the way `submit` is. | `main` misleads, because distill also drops boilerplate when the page has no `main`. `whole` inverts the sense and renames a published key for no new capability. |
| `absent` | The text is not there | Shared with the element wait (`src/core/types.ts:2389-2391`) | `gone` and `hidden` are rejected in item 12's rulings. |
| `matchBrowserLines` | Find the best-matching lines | Mirrors `matchBrowserOutline` | `filterBrowserLines` fits the `filter*` prefix, but it would split one concept across two prefixes. `searchBrowserText` has no sanctioned verb. |
| `lines match` (receipt) | Lines of the page match | Mirrors `elements match` | `results match` is vague. `paragraphs match` is false for table rows. |

### 5. Migration (no shim)

Source:
- `src/core/constants.ts:545-564`: `read`'s description and the `what` description, as in section 3.
- `src/core/constants.ts:517-519`: the remark becomes "`read` takes `what` and `offset`; the lines that match `what` are listed first, and the text is the whole rendered page."
- `src/core/helpers.ts`:
  - Add `extractBrowserWords` and `matchBrowserLines`.
  - `matchBrowserOutline` uses `extractBrowserWords`.
- `src/core/BrowserToolset.ts:714-727`: move the block builder into one private method that `#look` and `#read` share.
- `src/core/BrowserToolset.ts:736-767` (`#read`):
  - Read `what`.
  - Hold `const whole = reading.markdown({ distill: false })` and use `whole.total` in place of the calls at `:758` and `:765`.
  - Slice `whole.text` with `extractBrowserSlice` at `:766`.
  - Build the block when `start === 0`.
  - Pass the block to `#pageSlice`.
- `src/core/BrowserToolset.ts`, class TSDoc near `:100-119`: one sentence on `read`'s `what` and whole-page projection.

Tests:
- `tests/src/core/BrowserToolset.test.ts:850`: the description.
- The same file, a `what` description assertion beside `:860-865`.
- `tests/src/core/BrowserToolset.test.ts:5611-5626`: paging over the whole-page projection, with totals recomputed from the fixture.
- `tests/service/toolset.test.ts:431-434`: the expected text includes the confirmation page's non-`main` text.
- `tests/src/core/helpers.test.ts`: cases for `matchBrowserLines` and `extractBrowserWords`.

Guide (`guides/browser.md`):
- `:385`: add rows for `matchBrowserLines` and `extractBrowserWords` beside `matchBrowserOutline`.
- `:2870`: the `read` row.
- `:2893`: the `read` paragraph (block, whole page).
- `:2895`: `WHAT` covers `read` too.
- `:2899`: add a `lines match` receipt row.
- `:2976`: the bound figure if item 12 changes it.

Unchanged: journeys (`read` is never recorded, `guides/browser.md:2064`), the library types, the DOM placement code, and every receipt other than `read`'s.

## Alternatives

- **A `text` boolean or a `format` argument on the `read` tool, plus a `whole` or `distill` boolean.** Rejected.
  - A format is a behavior split (`.claude/rules/names.md:75`).
  - The agent would have to guess two switches, which costs about 200 characters of copy.
  - The b2 run shows the failure came from the region choice, not the format.
- **A separate `find` or `search` tool, the pattern of Playwright MCP `browser_find` and browser-use `search_page` (`reading-prior-art.md:6,10`).** Rejected.
  - It grows the advertised list that `tests/src/core/BrowserToolset.test.ts:802-803` holds at seven.
  - It adds copy.
  - It duplicates a required argument that `read` already carries and ignores.

## Constraints

- `.claude/rules/names.md:75` and `:79`: a literal that selects a different action is a magic mode and needs separate methods. This keeps `markdown` and `text` apart.
- `src/core/constants.ts:516-517`: every tool needs a required parameter (Ollama 0.34.4), so `what` stays required on `read`.
- `tests/src/core/BrowserToolset.test.ts:793`, `:829`, `:842-843`: the copy is at most 6,050 characters, each parameter description at most 100 characters, and each tool description at most 25 words.
- `tests/src/core/BrowserToolset.test.ts:802-803`: the seven advertised tools.
- `src/core/BrowserToolset.ts:714`: matches stay outside the paged text.
- `src/core/BrowserReading.ts:84-87`: `distill: false` projects the whole capture. That has meaning only while the capture keeps the region elements.
- `tmp/codex/browse-11-design.md:99`: item 11 proposes neutralizing `nav`, `header`, `footer`, `aside`, and `menu` in the capture. Under this design, that neutralization would make `distill`'s boilerplate pass a dead option. See Tensions.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/showcase/browse.md:57-61`: item 12's rulings, which this design inherits.

## Refusals

- **A `format` argument:** "Do not write `parse(input, format)`. A literal that selects a different action is a magic mode and requires separate functions/methods." (`.claude/rules/names.md:75`)
- **A `links`, `meta`, or `language` reader now:** "Create or substantively expand a capability with its first real consumer" (`AGENTS.md` § Design laws).
- **A schema or summary reader backed by a language model:** "Mechanism, not product policy. Framework code stops before application decisions." (`AGENTS.md` § Design laws)
- **A `hidden` switch that reads unrendered text:** it contradicts item 11's person-sees substrate. It also needs no new method: `distill: false` over `outerHTML` is the evaluate path's concern (`page.evaluate`).
- **`view.markdown()` or `view.text()` shortcuts:** "A wrapper adds a boundary, invariant, composition, translation, lifecycle, or materially narrower contract, or it goes." (`AGENTS.md` § Design laws)
- **A diff between readings:** it has no consumer, and `stale` plus `wait` cover the runs on record.

## Measurements

Supplied:
- b2 readings: T254, T257, and T270, the header-status `read` calls, and the T272–T275 `wait` absences (`reading-surface-map.md:279-285`).
- B0 `page.read()` median of 322.6014 ms over 5 runs (`browse.md`, Item 11 probe readings).
- The bound of 6,050 characters.
- Item 12's estimate of about +140 characters.

Missing:
- The serialized copy length at HEAD, after item 12, and after this design.
- Whether `renderMarkdown` writes one line per paragraph. This decides how fine-grained a match is.
- Whole-page against distilled Markdown length on veneer's `showcase/browser.html`, which sets how many pages an agent reads.
- A run of an agent using `what` on `read`.

## Units

1. **U1, toolset and helper.**
   - Role and engine: writer, `opus`, high.
   - Depends on items 11 and 12 having landed.
   - Owns `src/core/helpers.ts` (the two helpers and `matchBrowserOutline`), `src/core/BrowserToolset.ts`, `src/core/constants.ts:509-564`, `tests/src/core/helpers.test.ts`, `tests/src/core/BrowserToolset.test.ts`, and `tests/service/toolset.test.ts`.
   - Tests, each failing when its feature is removed:
     - A page `<header><p>Status: 3 orders pending</p></header><main><p>Body</p></main>`: `read` contains `3 orders pending`. It fails with `distill` left on.
     - A page with 200 paragraphs and a matching line past the limit: `read` with `what: 'pending orders'` opens with `1 line matches "pending orders":`. It fails without the block.
     - Control: `what: 'zz'` gets no block.
     - `offset` greater than 0 gets no block.
     - A tie lists every best line in document order.
   - Accepts when `npm run check`, `npm run test:src:core`, `npm run build`, and then `npm run test:service` exit 0, read bare, and the copy length before and after is reported.
2. **U2, guide.**
   - Role and engine: writer, `opus`.
   - Depends on U1.
   - Owns `guides/browser.md`.
   - Accepts when `npm run test:guides` and `npm run test:policy` exit 0.
3. **U3, review.** One reviewer who wrote neither unit checks the block's offset independence, the whole-page projection, and the copy.
4. **U4, gates.** The verifier runs the tree-wide gates.

## Tensions

- **Item 11's wrapper neutralization against `distill`.** This design is the reason to rule this one first.
  - Recommendation: the capture keeps `nav`, `header`, `footer`, `aside`, `menu`, `main`, and `article` as written, and it may still strip hiding attributes after layout.
  - Whole-page reading comes from `distill: false` in the tool, not from the capture.
  - Goes to the Orchestrator.
- **The tool's default region.** Recommendation: whole page, as specified. The alternative keeps `distill` on and loses header and footer facts.
- **Plain text for the agent.** Recommendation: no switch. Markdown keeps headings, tables, and links, and the user's "just the text" case is served in the library by `reading.text()`. Goes to the user.
- **`ref` on `read`.** Recommendation: defer until the outline references regions. Goes to the user.
- **The block builder's handling of a row too long for the half-page.** `look` breaks at such a row (`src/core/BrowserToolset.ts:722`); one long Markdown paragraph would then block every later match. Recommendation: the shared builder skips a row that does not fit and continues, which changes `look` only when one row exceeds half the room. Without the change, one long paragraph empties `read`'s block. Goes to the objective lane.
- **The `match*` prefix.** `names.md` sanctions `matches*` and `filter*`, not `match*`. Recommendation: keep the parallel with `matchBrowserOutline` here, and rename both in a separate change if the Orchestrator rules for `filter*`.
- **Library `distill` default.** Recommendation: keep `true`. The tool passes `false` explicitly, so the library's scraping default stays and nothing breaks.

## Risks

- **Whole-page replies run longer.** Navigation text repeats on every first page. The match block mitigates this; the page counts are unmeasured.
- **A matched line can lose its context**, such as a table row without its header. The paged text that follows still carries the context.
- **Item 11 might land with wrapper neutralization.** Then `distill`'s boilerplate pass dies silently, and the `distill: true` tests in `tests/src/core/BrowserReading.test.ts:22-49` still pass, because they use caller HTML. A capture-level test with a `nav` must guard this.
- **Match granularity depends on line breaks in `renderMarkdown`.** This is unmeasured. If paragraphs soft-wrap, matches become fragments.
- **The tool and `wait` still read different texts:** the capture against `innerText`. Whole-page reading narrows the gap; item 11 owns the rest.