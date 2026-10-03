# Recommended design: how `@orkestrel/browser` reads a page (2026-10-03)

**Lane: subjective** (naming, shape, ergonomics). The objective lane's rulings are carried as constraints. Where the two judges disagree, I give a ruling and list it under Tensions. Paths are under `C:/Users/mikes/WebstormProjects/browser-wt-browse` unless named otherwise.

## Design

### 1. The recommendation

**Keep the reading methods the library already has, and fix what they promise instead of adding methods.**
- `read()` captures a page or element.
- `markdown()`, `text()`, and `html` project that capture.

**There are three changes:**

1. **`what` becomes `search`.** The agent argument is renamed on `look`, `read`, `tabs`, and `journeys`. On every tool it does one job: the entries that share the most words with it are listed first, on the first page only, outside the paged text.
2. **`read` uses its search.** Matching lines are listed first, each with the offset to continue reading from. Today the handler ignores the argument (`src/core/BrowserToolset.ts:736-767`).
3. **`distill` defaults to `false`.** A bare `text()` or `markdown()` then returns the whole page's text. Main content becomes something you ask for.

**The placeholder that page tools receive becomes `purpose`.** It is a placeholder, not a search, so it gets its own word.

**Plain text on the agent tool is left for you to decide.**
- A switch on `read` is refused by the naming rule.
- A separate sibling tool is lawful. It measured 18% smaller on one page, but no recorded run needed it.

### 2. Reader angles

The following table lists what a reader can want and which method serves it.

| Angle | What a reader wants | Method that serves it, or why none does yet |
|---|---|---|
| Whole page | Every fact, including the header status and banners | `markdown()` and `text()` with the flipped default; tool `read`. b2's header-status reads got distilled body text instead (`tmp/codex/reading-surface-map.md:285`) |
| Main content | An article without page chrome | `distill: true` (library). No tool option: no run asked for it |
| One element or region | A dialog, a card, a panel | `element.read()` (`src/core/types.ts:2551-2556`). No tool path: references exist only for interactive roles (`src/core/constants.ts:319-347`) |
| One frame | Iframe content | `frame.read()`. No tool path |
| Structured text | Headings, links, tables, image text | `markdown()`; tool `read` |
| Just the words | Text without Markdown syntax | `text()` (library). The tool waits on decision D2 |
| Markup | Parsed structure | `reading.html`. Refused on the tool: untrusted markup, and the floor is unchanged (`tmp/codex/reading-design-brief.md:20`) |
| Things to act on, and their state | Controls, references, pressed and checked | `elements.outline()`; tool `look` |
| Find a fact by its words | The line about the delivery date on a 60,000-character page | `matchBrowserText` (added); `read` with `search`. The store proof called `read` seven times without an offset (`guides/browser.md:3403`) |
| Find an element by its words | The archive button | outline `search`; `look` with `search` (`src/core/BrowserToolset.ts:695-705`) |
| Find a tab or a journey | `add-kettle` among many saved journeys | `tabs` and `journeys` with `search` (added job) |
| Length | Bounded replies that continue exactly | `offset`, `limit`, footers (`src/core/BrowserToolset.ts:791-811`), and match offsets |
| Form values | What was typed or selected | Item 11's lowering (`tmp/codex/browse-11-design.md:67-91`) plus outline values |
| Link destinations | Where a link goes, usable by `navigate` | `markdown()` writes `[text](absolute URL)`. This needs N2 plus resolution at projection time, because `navigate` takes only absolute addresses (`src/core/constants.ts:617`) |
| Images | Their alternative text | Markdown `![alt]()`. `src` is refused by the floor (`tmp/codex/reading-surface-map.md:206`) |
| Which page | Title and address | `reading.url` and `title`, `look`'s first line, `tabs`. Description, language, and canonical URL: none, because there is no consumer and item 11 drops `head` (`tmp/codex/browse-11-design.md:93`) |
| Text arrived or left | A toast's exit | `wait` with `absent` (item 12, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/showcase/browse.md:59-67`) |
| What changed since the last read | A diff | None. Refused: no consumer, and `read` at offset 0 captures again |
| Pixels | What it looks like | None; roadmap item 7 |
| Summary or schema by a model | "Extract the price" | Refused: mechanism, not product policy |
| Hidden content you can reveal | A closed `details` | Refused in `read`. Open it with `click`; `frame.evaluate` reaches the source |
| Quote text exactly into `wait` | A string that matches `innerText` | None on the tool yet. Markdown escapes are unmeasured; `text()` serves it in the library |
| Raw accessibility or DOM tree | Inspection | `accessibility.snapshot()` and `page.snapshot()` (CDP only) |

### 3. The methods

The following table lists every reading method after the change. Only the two helpers are added.

| Name | What anyone expects from the name | Returns | Leaves out | Surface |
|---|---|---|---|---|
| `read()` on view, page, frame, element | Takes in this page or element | `BrowserReadingInterface` | Everything item 11 prunes or cannot render (section 9) | Library; tool `read` |
| `reading.markdown()` | The page as Markdown | `BrowserReadResult` | Unsafe-element text item 11 does not lower; image `src` | Both |
| `reading.text()` | The page's words | `BrowserReadResult` | Link destinations, image text, heading levels, list markers (`tmp/codex/reading-surface-map.md:232-244`) | Library |
| `reading.html` | The markup | `HTMLInterface` | The original source bytes; it is the normalized capture | Library |
| `reading.url`, `title`, `stale` | Where, what, and whether the page has moved on | Strings and a boolean | Mutation freshness: `stale` tracks navigation only (`src/core/BrowserReading.ts:60-62`) | Library |
| `elements.outline()` | The page's structure with what you can act on | `BrowserOutline` | Heading levels, descriptions, non-interactive roles (`tmp/codex/reading-surface-map.md:43-51`) | Both (`look`) |
| `wait(text)` | Waits for text | `void` | Text inside child frames | Both |
| `matchBrowserText(text, search)` (added) | The lines of a text that match these words | `readonly BrowserReadMatch[]`, each `{ offset, text }`, in document order | Lines below the top score; words under 3 letters or digits (`src/core/constants.ts:316`) | Library; drives `search` on `read`, `tabs`, and `journeys` |
| `collectBrowserWords(text)` (added) | The searchable words of a text | `ReadonlySet<string>` | Words under 3 letters or digits | Library; shared with `matchBrowserOutline` (`src/core/helpers.ts:243-245`, `:259-264`) |
| `accessibility.snapshot()`, `page.snapshot()` | Raw trees | Nodes | A prose projection | Library, CDP only |

**Why these are methods:**
- `markdown()` and `text()` are different algorithms. "A literal that selects a different action is a magic mode and requires separate functions/methods" (`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md:75`).
- Scope is the receiver (`element.read()` against `page.read()`), never an option.
- A match is a pure function of the projected string, so it is a helper, not a reading method.

### 4. Options that fine-tune the methods

| Option | Default | Why it is an option and not a method |
|---|---|---|
| `distill` on `markdown()` and `text()` | **`false`** (was `true`, `src/core/BrowserReading.ts:65`, `:75`) | It narrows the source of the same projection, and a binary switch is a boolean. False is the default so that a bare `text()` keeps its name's promise, and so that `element.read()` on a `nav` or `header` root stops returning `''` (`tmp/codex/reading-surface-map.md:266`). Measured cost on the showcase: Markdown +2.2% (90,033 against 88,053), text +10.2% (73,691 against 66,852) (`tmp/codex/reading-feasibility.md:207-210`) |
| `offset`, `limit` | 0, unbounded | A window over the same text: data |
| outline `limit`, `within`, `search` | 150, none, none | Unchanged (`src/core/types.ts:2393-2407`) |
| `wait` `absent`, `timeout` | false; 30,000 ms on CDP, 5,000 ms on DOM | `absent` negates the same predicate, as ruled in item 12 |
| tool `search` on `look`, `read`, `tabs`, `journeys` | Required while M1 shows the Ollama rule holds | It selects which entries go first in the same listing. Data, not an algorithm |
| tool `offset` on `look`, `read`, `journeys` | 0 | Continuation |

**How `search` behaves on each tool:**
- **On the first page only** (start 0, keyed like `look` at `src/core/BrowserToolset.ts:711`, `:717`), a block `COUNT NOUN match "SEARCH":` precedes the listing.
- **Room:** the block takes at most half the room and stays outside the paged text, so offsets never depend on `search`.
- **What each tool lists:**
  - `look`: rows, as today.
  - `read`: `[OFFSET] LINE`.
  - `journeys`: `[OFFSET] HEADING` for each matching journey's first line.
  - `tabs`: the matching tab rows.
- **Long rows:** a first row too long for the room is cut with `…`, without splitting a surrogate pair. Any later row that does not fit is skipped, and the scan continues. Today the scan stops at the first such row (`src/core/BrowserToolset.ts:722`).
- **No block** when there is no word of 3 letters or digits, or no match.

### 5. Agent tools after the change

The names are unchanged: `look`, `read`, `click`, `type`, `press`, `navigate`, `wait`, `dialog`, `tabs`, `switch`, `record`, `save`, `journeys`, `edit`, `replay`, `forget`. The following table lists the copy and the hand-counted change in characters.

| Tool | Description | Arguments | Δ |
|---|---|---|---|
| `look` | `Shows the elements you can act on, each with a reference like e4, and the page's text. Call it first and after the page changes.` | `search*`: `Words to find on this page; matching elements come first.`; `offset` | −12 |
| `read` | `Reads the page's text. Call it to learn a fact.` | `search*`: `Words to find on this page; matching lines come first.`; `offset` | −42 |
| `tabs` | unchanged | `search*`: `Words to find; matching tabs come first.` | +19 |
| `journeys` | unchanged | `search*`: `Words to find; matching journeys come first.`; `offset` | +23 |
| `wait` | Item 12: `Waits for text to appear; set absent to true to wait for it to leave.` (`tmp/codex/reading-feasibility-definitions.json:506`) | `text*`, `timeout`, `absent` | +101 (item 12) |
| others | unchanged | unchanged | 0 |

- **Bound arithmetic:**
  - Baseline: 6,023, measured (`tmp/codex/reading-feasibility-definitions.json:3`).
  - This design: −12, hand count, giving 6,011.
  - With item 12: 6,112.
  - Bound: 6,050 (`tests/src/core/BrowserToolset.test.ts:793`).
  - Under the ruled procedure (`browse.md:67`), the raise is to **6,150**, unless item 12's copy shrinks by 12 or more.
- **Not measured:** the actual length after the change, and the headroom under the separate 3,100 journey bound (`tests/src/core/BrowserToolset.test.ts:791-792`).
- **Every renamed key adds 4 characters per tool:** `"search"` against `"what"` appears once in properties and once in `required`.
- **Word and length limits hold:** the `read` description is 10 words and `look`'s is 25, against the 25-word limit (`:842-843`). Every parameter description is under 100 characters (`:829`).
- **Footer:** `BROWSER_TOOL_VIEW_FOOTER` becomes `the rest was cut; call look with words to find` (`src/core/constants.ts:455`).
- **Page tools:** the synthetic parameter becomes `purpose`, with its description unchanged (`Describe the purpose of this action.`, `src/core/helpers.ts:487`). Page tools are outside the bound (`tests/src/core/BrowserToolset.test.ts:777`).

**Does the Ollama 0.34.4 rule still force `search` to be required? Unknown: it is a measurement to make (M1).**
- Nothing records a re-measurement after `src/core/constants.ts:516-517` and `guides/browser.md:2865`.
- An existing instrument would answer it. `C:/Users/mikes/WebstormProjects/ollama/tests/service/compaction.test.ts:160-166` registers a tool with `properties: {}` against a live Ollama and streams the agent. Its result, together with `ollama --version` on the store-proof host, settles the question.
- **If the call parses:**
  - `search` becomes optional on `look`, `read`, and `journeys`, and `tabs` takes no argument.
  - The `purpose` placeholder and the `schema` skip reason (`src/core/types.ts:2789`) go.
  - The test's `required.length > 0` check (`tests/src/core/BrowserToolset.test.ts:826`) goes.
  - This is decision D4, because older Ollama servers in the field would then break.

### 6. Alternatives considered and rejected

- **Keep `what`.** The user ruled it out. It also carries four meanings today:
  - the search on `look` (`src/core/BrowserToolset.ts:695-696`);
  - ignored on `read`, `tabs`, and `journeys` (`:736-767`, `:1159-1172`, `src/core/BrowserJourneyToolset.ts:259-301`);
  - a stripped placeholder on page tools (`src/core/BrowserToolset.ts:1217-1219`, `src/core/BrowserRegistry.ts:418`).
- **Other names:**
  - `query` is taken by element, node, and route queries (`src/core/types.ts:1256`, `:2604`, `:3239`).
  - `find` is the element manager's method.
  - `focus` is `BrowserOutline.focus` (`:2426`).
  - `match` collides with `matches` (`:2413`).
  - `question` promises an answer engine.
  - `words` is exact and collision-free, but it makes a second term for the library's `search`.
- **`search` for the page-tool placeholder.** Refused. A page tool that declares an optional `search` would be skipped (`src/core/helpers.ts:480`), and `search` is a common page-tool parameter. A placeholder is also a different concept.
- **Separate `markdown` and `text` tools that replace `read`** (`tmp/codex/reading-feasibility.md:75-79`). Rejected for three reasons:
  - It drops `read`, which the store proof uses (`guides/browser.md:3403`).
  - The tool names describe a format, not a purpose.
  - `text` collides with the `text` argument of `type`, `wait`, and `dialog` (`src/core/constants.ts:584`, `:628`, `:648`).
- **A `plain` boolean on `read`.** Refused: different value, different algorithm, so split (`names.md:79`).
- **Renaming `look` to `outline`.** Rejected. It touches about 40 sites and needs a store-proof re-run (`tmp/codex/reading-proposal-sees.md:335`), and no recorded run shows a model confusing the two tools. The overlap is in the copy, which section 5 fixes.
- **Library keeps `distill: true` while the tool passes `false`** (`tmp/codex/reading-proposal-fewest.md:218`). Rejected: one reading would then have two defaults.
- **`ref` on `read`.** Deferred: no region carries a reference (`src/core/constants.ts:319-347`). The refusal test stays (`tests/src/core/BrowserToolset.test.ts:868-887`).
- **A `search` option on `markdown()` or `text()` that returns matches.** Rejected. It widens the slice shape shared with outline paging, for a value that is a pure function of the text.

### 7. What changes for existing callers (no shims)

The following list names every changed site.

- **Agent callers:** `what` becomes `search` on `look`, `read`, `tabs`, and `journeys`. A call that still sends `what` is refused with `The look tool takes no what parameter; call look with search and offset.`, through the existing check (`src/core/helpers.ts:547-560`). Page-tool callers send `purpose` in place of `what`.
- **Library callers:** `markdown()` and `text()` return the whole page unless they pass `distill: true`. Undistilled links resolve against `url`.
- **Types (`src/core/types.ts`):**
  - `:2250-2251` the distill default;
  - add `BrowserReadMatch` after `:2278`;
  - `:2734` "omitting optional-purpose schemas";
  - `:2789` `schema` names `purpose`.
- **Source:**
  - `src/core/BrowserReading.ts:65`, `:75` become `?? false`. At `:84-88` the undistilled source applies `html.map` with `resolveAttributes(node, url)` (`node_modules/@orkestrel/html/dist/src/core/index.d.ts:385`, `:1284`).
  - `src/core/helpers.ts` gains `collectBrowserWords`, `matchBrowserText`, and `renderBrowserMatches(heading, rows, room)`. It also changes `:239-272`, `:469-491` (`purpose`), and `:543-544`.
  - `src/core/constants.ts:455`, `:509-564`, `:653-664`, `:706-721`.
  - `src/core/BrowserToolset.ts:116-120`, `:171-173`, `:184`, `:690-734`, `:736-768`, `:1159-1172`, `:1217-1219`.
  - `src/core/BrowserRegistry.ts:418`.
  - `src/core/BrowserJourneyToolset.ts:259-301` and `:556-561` (`search: ''`).
  - `src/core/factories.ts:110`, `:124-125`, `:139`.
  - `src/browser/factories.ts:59`.
  - `README.md`.
- **Tests:**
  - Every file a sweep for the `what` key matches: 17 files, 255 occurrences, including `tests/src/core/BrowserToolset.test.ts` (134), `tests/service/toolset.test.ts` (27), `tests/src/core/BrowserJourneyToolset.test.ts` (24), and `tests/src/server/BrowserMCPServer.test.ts` (15).
  - The tests that relied on the distilled default, listed at `tmp/codex/reading-proposal-needs.md:131-142`.
- **Guide (`guides/browser.md`):**
  - `:48` and `:3416`: "call read with search set to words from your question".
  - `:49`: "To use the site's search box, call type with its reference…", which separates site search from the argument.
  - `:63` and `:3428`: seed with `search: ''`, which drops the noise sample `'the page'`.
  - `:2865-2887`, `:2893`, `:2895`, `:3395`, the distill example near `:1839-1854`, and the bound figure.
- **Outside this repository:**
  - `C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:134` (the prompt) and the `what` calls in `tests/setupStore.test.ts` (from `:335`), followed by a store-proof re-run on 0.0.22.
  - The veneer and scaffold guide mirrors, refreshed at the re-pin.
- **Journeys:** none. Observations are never steps (`guides/browser.md:2064`).

### 8. Decisions for you

| # | Decision | Recommendation |
|---|---|---|
| D1 | Name of the argument | `search`. It is the library's word for the same words (`src/core/types.ts:2397-2406`), and prior art reads it without documentation (`tmp/codex/reading-prior-art.md:33`). The copy says "on this page" so that it does not read as the site's search box |
| D2 | Plain text for agents | Defer. If you want it, add a sibling tool, never a switch. Measured gain: 19 slices against 23 on the showcase (`tmp/codex/reading-feasibility.md:208-210`). The name `text` collides with the `text` argument |
| D3 | Flip `distill` to `false` | Yes |
| D4 | Drop the required-parameter rule if M1 shows it is gone | Keep it unless you set a minimum Ollama version |
| D5 | `tabs` gets a working `search`, rather than a placeholder | Yes, while the rule holds; no argument at all if it goes |
| D6 | Rename `look` | No; the copy is fixed instead |
| D7 | `reading.text().text` reads awkwardly | Leave it this round. `BrowserReadResult.text` is shared with outline paging |
| D8 | Landing order | Item 11 (with N2 and N3), then this change, then item 12; measure the bound once, over both |

### 9. What item 11's capture still cannot read exactly

Each case below is left out of `read`, and the outline carries the control by role, name, and value. Sources are `tmp/codex/browse-11-design.md:83-91`, `:107`, and `tmp/codex/reading-proposal-sees.md:239-249`.

| Case | In `read` | In `look` |
|---|---|---|
| Date input (`10/03/2026` painted, `2026-10-03` value) | Left out | `Date` row with its value |
| Submit or reset input with no value; the file control's native captions | Left out; a chosen filename is kept | Button row |
| Number input while being edited | Left out | `spinbutton` row |
| MathML | Left out | `MathMLMath` row |
| Checkbox, radio, range, color, password | No value text | State or value on the row |
| Icon button, named SVG, image input | `![NAME]()` in Markdown; unproven (N1) until a test shows `htmlToMarkdown` renders an `img` without `src` | `button "NAME"` |
| Open shadow-root text; same-origin iframe content | Left out | Static text and rows past the `Iframe` reference |
| Generated content, `text-transform`, opacity 0, partial clipping | Source text as written | Accessible names |

**How the design states these limits:**
- The `BrowserReadingInput` remarks (`src/core/types.ts:2287`) list them.
- The tool copy says "the page's text" and never "as a person sees it" or "exactly".
- No placeholder text stands in for a printed string.

## Alternatives

- **Separate `markdown` and `text` tools.** Rejected (section 6).
- **Keep `what` and give it the job.** Rejected by the user's ruling.

## Constraints

- `src/core/constants.ts:516-517`: every tool declares a required parameter, per Ollama 0.34.4. Unmeasured since.
- `tests/src/core/BrowserToolset.test.ts:793`: the 6,050 bound. `:791-792`: the 3,100 journey bound. `:829`: parameter descriptions at most 100 characters. `:842-843`: descriptions at most 25 words.
- `src/core/BrowserToolset.ts:714`: matches stay outside the paged text. `:747-756`: a continuation reuses the retained capture.
- `src/core/helpers.ts:480`: a page tool that declares the placeholder name as optional is skipped.
- `src/core/BrowserReading.ts:84-86`: only the distilled path resolves links.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/showcase/browse.md:40`: the user ruled out `what`. `:67`: the procedure for raising the bound.

## Refusals

- **A format or `plain` switch:** "A literal that selects a different action is a magic mode and requires separate functions/methods." (`names.md:75`)
- **Model extraction:** "Mechanism, not product policy." (`AGENTS.md` § Design laws)
- **`look` or `what` kept as an alias:** "No compatibility shims. Update every consumer in the same change." (`AGENTS.md` § Design laws)
- **`ref` on `read` and a metadata reader:** "Create or substantively expand a capability with its first real consumer." (`AGENTS.md` § Design laws)

## Measurements

**Supplied:**
- Copy baseline 6,023.
- Projection sizes and slice counts (`tmp/codex/reading-feasibility.md:205-210`, Edge 154.0.4258.53, 2026-10-03).
- b2 header-status misses (`tmp/codex/reading-surface-map.md:285`).
- Store-proof paging (`guides/browser.md:3403`).

**Missing:**
- M1, the Ollama rule.
- The serialized copy length after this change and after item 12.
- Journey-bound headroom.
- How long Markdown lines run on the showcase, which sizes the `…` cut.
- Markdown escapes against `wait` text.
- The N1 rendering of an image without `src`.
- A store-proof run with `search`.

## Units

- **M1, probe** (sonnet, medium). Read `ollama --version` on the store-proof host and run `C:/Users/mikes/WebstormProjects/ollama/tests/service/compaction.test.ts`.
  - Accept on a reported version plus a pass or fail read bare.
- **U1, library contract** (opus, high). Depends on item 11 landing N2 and N3.
  - Owns:
    - `src/core/types.ts` (reading section, `:2734`, `:2789`);
    - `src/core/BrowserReading.ts`;
    - the helpers in `src/core/helpers.ts` (`collectBrowserWords`, `matchBrowserText`, `renderBrowserMatches`, `matchBrowserOutline`, `deriveBrowserToolSchema`);
    - `src/core/BrowserRegistry.ts`;
    - the library tests.
  - Accept when:
    - the matcher tests fail with the top-score filter removed;
    - duplicate lines carry their own scan offsets;
    - a relative link in an undistilled projection is absolute and fails with the resolution removed;
    - a capture-level page with `nav` and one `main` drops the nav text only under `distill: true`;
    - `npm run check`, `test:src:core`, `test:src:browser`, and `test:setup` exit 0.
- **U2, toolset** (opus, high). Depends on U1 and M1.
  - Owns:
    - `src/core/constants.ts`;
    - `src/core/BrowserToolset.ts`;
    - `src/core/BrowserJourneyToolset.ts`;
    - the examples in `src/core/factories.ts` and `src/browser/factories.ts`;
    - the toolset, journey, registry, MCP, and service tests.
  - Accept when:
    - a `read` with `search` lists a header line from past 4,000 characters with an offset that continues correctly;
    - an offset above 0 and a non-matching search give no block;
    - a long first row is cut and later rows still list;
    - `journeys` and `tabs` list their matches first;
    - a call carrying `what` is refused;
    - the copy length is reported before and after against the bound;
    - `build` and then `test:service` exit 0.
- **U3, guide and README** (opus). Depends on U2. Accept when `npm run test:guides` and `test:policy` exit 0.
- **U4, review** by one reviewer who wrote none of U1 to U3. Scope: the block's independence from offsets, the default-flip test changes, and the copy.
- **U5, `verifier`:** the tree-wide gates.
- **U6, after 0.0.22:** the ollama prompt and a store-proof re-run, with results per task.

## Tensions

- **`search` read as the site's search box.** Mitigated by "on this page" in the copy and the rewritten prompt line. The fallback is `words`. Goes to the subjective lane and the user.
- **Match block repeats the first slice.** Keep `look`'s rule of listing every best match. Filtering by the slice would make the block depend on the slice it shares room with.
- **`match*` prefix.** It is not sanctioned (`names.md:91-104`); `scan*` might fit. Keep the parallel with `matchBrowserOutline` and rename both at once if the Orchestrator rules otherwise.
- **N2 placement.** Do both: the capture writes the live `href`, which handles `<base>`, and projection resolves whatever caller HTML leaves relative.
- **Item 11's wrapper neutralization against N3.** The Orchestrator rules before U1.
- **Stop words.** Add no list: that is language policy.

## Risks

- **Small-model regression from the rename and whole-page reads.** U6 gates the release notes on a measured run.
- **Common words** (`the`, `page`, `what`) tie many lines. The copy steers toward keywords.
- **A page tool that declares an optional `purpose` is skipped.**
- **Item 11 might land with region neutralization,** which silently kills `distill`. U1's capture-level guard catches it.
- **Markdown escapes** can make `wait` miss text quoted from `read`.