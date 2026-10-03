**Lane: objective.** I checked correctness, the law in `scaffold/AGENTS.md` and `.claude/rules/names.md`, what each placement can deliver, the bound, migration completeness, and the citations. Paths are under `C:/Users/mikes/WebstormProjects/browser-wt-browse` unless they name the scaffold checkout.

The user's own request governs this verdict: "Not a fan of an argument called what, find a better name for that." `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/showcase/browse.md:40` already records that the user ruled `what` out. All four proposals keep `look.what`, and three keep `read.what`.

## Verdicts

### 1. Each proposal

**1.1 Needs** (`reading-proposal-needs.md`)

Strongest ideas:
- It flips the `distill` default to `false`. Its migration list for that flip is the most complete of the four (`:112-166`).
- The match block gives each matching line an offset you can continue from (`:80-92`). Only this proposal makes a match jumpable.
- It extracts `collectBrowserWords`, which fits the sanctioned `collect*` prefix.
- It drops item 11's wrapper neutralization (`:175`).

Defects:
- **It keeps `what`.** It defends `what` with "one term per concept" (`:104`). That claim is false. `what` carries four meanings today:
  - On `look` it is the search words (`src/core/BrowserToolset.ts:695-696`).
  - On `read`, `tabs`, and `journeys` it is ignored (`BrowserToolset.ts:736-767`, `:1159-1172`; `BrowserJourneyToolset.ts` reads only `journey`, `description`, `offset`, `edits`, and `inputs`).
  - On an adopted page tool it is a synthetic placeholder described as "Describe the purpose of this action." (`src/core/helpers.ts:487`), which is stripped before the tool runs (`BrowserToolset.ts:1218`, `BrowserRegistry.ts:418`).
- **Its copy alone breaks the bound.** The measured baseline is 6,023 (`tmp/codex/reading-feasibility-definitions.json:3`), so its +28 gives 6,051, over the 6,050 limit (`tests/src/core/BrowserToolset.test.ts:793`). That is before item 12. It reports the baseline as "not measured" (`:207-208`).
- **Link targets stay relative.** An undistilled projection does not resolve them (`src/core/BrowserReading.ts:84-86`, `tests/src/core/BrowserReading.test.ts:100`). `navigate` accepts only an absolute address (`src/core/constants.ts:617`). Its claim that links are covered (A15, `:31`) therefore fails for every relative `href` on a whole-page read.
- **The block rule is ambiguous.** "At an offset above 0 … no block" (`:91`) does not match `look`, which keys on `start === 0` (`BrowserToolset.ts:717`). An offset past the end restarts at 0 and does show a block there. Key the block on `start`.

**1.2 Fewest** (`reading-proposal-fewest.md`)

Strongest ideas:
- It adds no library member.
- Its copy delta is −38, and its counts check: 110 to 47 characters, 37 to 62 characters.
- It finds that `look`'s block builder stops at the first row that does not fit (`:216`; confirmed at `BrowserToolset.ts:722`), so one long Markdown line empties `read`'s block.
- It flags that the `match*` prefix is not sanctioned (`names.md:91-104` sanctions `matches*` as a predicate only).
- Its test list names a failing control for each feature.

Defects:
- **It keeps `what`.** Its argument that renaming "changes four tools' copy for one concept" (`:100`) fails: three of those four tools never read the argument.
- **It keeps the library default at `true`, which leaves a defect.** `element.read()` on a `header`, `nav`, `footer`, `aside`, or `menu` root projects to an empty string by default, because distill drops that region whole (`reading-surface-map.md:190`, `:266`).
- It has the same relative-link defect as Needs: the tool passes `distill: false` (`:76`).
- Its matches carry no offset, so a matched line cannot be continued from.

**1.3 Sees** (`reading-proposal-sees.md`)

Strongest ideas:
- It flips the default.
- Capture need N2 finds the relative-link defect, and is the only proposal that does (`:255`).
- N3 keeps the region elements in the capture (`:255`).
- It lists the cases item 11 cannot render exactly, each with the channel that carries it (`:239-249`).
- It is the only proposal that finds the `wait` TSDoc's word "visible" is false (`:92`).

Defects:
- **It keeps `what`.** It says `search` "breaks the shared parameter" (`:161`), which holds only if `look` keeps `what`.
- **The `outline` copy overclaims.** "Outlines the page as a screen reader announces it" (`:110`) is not true:
  - The DOM placement walks the DOM and is not an accessibility-tree reading (`reading-surface-map.md:161-171`).
  - The outline drops heading levels, descriptions, and non-interactive roles (`:46-48`).
  - This breaks the writing rule "Claim only what the reader can check".
- **Citation errors:**
  - "Fetch server … `read`" (`:159`): the MCP fetch server's tool is `fetch` (`reading-prior-art.md:16`).
  - `guides/browser.md:2974` measures against `4a10abe`, not `254d107` (`:285`).
- **N2 covers less than it could.** It resolves links in the capture only, so caller HTML passed to `createBrowserReading` keeps relative links. The installed `@orkestrel/html` exports `resolveAttributes` and `resolveURL` (`node_modules/@orkestrel/html/dist/src/core/index.d.ts:1284`, `:1293`), which can resolve links at the projection step with no floor change.
- **N1 is unproven.** It assumes `htmlToMarkdown` renders an `img` without `src` as `![ALT]()` and marks this unmeasured itself (`:293`). Rule it unproven until that test exists.

**1.4 Feasibility** (`reading-feasibility.md`)

Strongest ideas:
- It holds the only measurements, with artifacts:
  - copy length 6,023 before and 6,463 after;
  - projection sizes (`:205-210`);
  - a negative control on the vocabulary bound (`:216`).
- It notes that `distill: false` must never become a privacy bypass (`:168`).
- It keeps the dialog refusal ahead of the reading cache (`:103`).
- It pins the retention identity and the hold and recorder rows (`:65`, `:101`).
- Its migration inventory is the widest: recorder, MCP server, guide tests, and DOM factories (`:138-158`).
- It lets a required `offset` satisfy the Ollama parameter rule honestly (`:52`).

Defects:
- **It adds `ref` with no consumer.** References exist only for interactive roles (`src/core/constants.ts:319-347`). Reading a control gives the label `look` already prints. It concedes that reading an `Iframe` element is not reading its document (`:169`). This fails "first real consumer" (`AGENTS.md:65`), and it replaces the tested refusal (`tests/src/core/BrowserToolset.test.ts:868-886`).
- **It accepts item 11's neutralization, which hollows `distill`.**
  - On a capture, `distill: true` would no longer remove boilerplate. On caller HTML it still would. One option would then mean two things depending on where the input came from.
  - `reading.html` would lose the region structure the page has.
- **"Update the guide's stale 5,900 figure" (`:105`) is false.** The guide says 6 050 (`guides/browser.md:2976`).
- **It cites the wrong line.** `names.md:64` is not the format rule; the rule is at `:75` (`:43`).
- **It names a tool `text`.** Three tools already take a `text` argument meaning an input string (`type`, `wait`, `dialog`; `src/core/constants.ts:584`, `:628`, `:648`). That is a confusion risk, not a law breach.

### 2. Disagreements and rulings

**2.1 The `read` tool's fate.** Keep it, reading Markdown, with a working search argument. Removing it (Feasibility) is lawful under the no-shim rule, but the reasons given do not hold:
- The `ref` it adds has no consumer.
- `markdown` names a format, not an action.
- Plain text does not need `read` removed (see 2.3).

**2.2 What replaces `what`.** Rename the search argument to `search` on every tool that searches. `look` and `read` have one concept here, and the library already names it `BrowserOutlineOptions.search` (`src/core/types.ts:2397-2406`), with results in `matches`. One concept takes one term (`AGENTS.md:54`). The alternatives each collide:
- `query` collides with `elements.find(query)`.
- `find` collides with `elements.find`.
- `focus` collides with `BrowserOutline.focus`.
- `match` collides with `matches`.

The rename also has a practical effect. `what`'s copy ("What you want to learn") invites a question. Three-letter question words such as `what` and `the` then score like content words (`BROWSER_SEARCH_PATTERN`, `constants.ts:316`) and fill half the room with tied lines. Copy that asks for words to find steers toward keywords.

The placeholder uses are a separate concept, so they must not take `search`:
- **Adopted page tools:** name the synthetic parameter `purpose`, matching its own description (`helpers.ts:487`). Under `search`, any page tool declaring an optional `search` would be skipped (`helpers.ts:480`). That name is common in page tools.
- **`tabs` and `journeys`:** either implement matching, listing matches first as `look` does, or name a placeholder for what it is. Never advertise a `search` that is ignored; that is the defect the surface map found in `read.what`. My recommendation is to implement it. The Orchestrator rules.

**2.3 One `read` tool, or separate `markdown` and `text` tools.**
- The law rules out a boolean or format switch on `read` for plain text. Markdown and plain text are different algorithms, and "Different value selects a different action/algorithm → split" (`names.md:79`). A boolean that swaps the output grammar is that case; `distill`, `submit`, and `absent` change a step of one operation and are not.
- A separate tool is lawful. The measured case for it: undistilled plain text is 73,691 characters against 90,033 for Markdown, 18% smaller (`reading-feasibility.md:208-210`).
- Whether to add it goes to the user, with that number and the `text`-name collision attached. If added, it is a sibling tool, never a switch.

**2.4 The library `distill` default.** Flip it to `false` (Needs and Sees):
- It removes the empty `element.read()` on a boilerplate root.
- It makes distilling a step the caller asks for, as `HTML.distill` is in `@orkestrel/html` (mechanism, not policy).
- The cost is small on the showcase: whole-page Markdown is 2.2% larger (90,033 against 88,053) and text 10.2% larger (73,691 against 66,852) (`reading-feasibility.md:207-210`).

Keep the region elements in the capture (N3). Resolve link targets on the undistilled path with `resolveAttributes`.

**2.5 Renaming `look`.** No law requires it. If the subjective lane or the user takes it, the copy must not claim a screen-reader reading. The cost is about 40 sites plus the external `@orkestrel/ollama` prompt and a store-proof re-run. Referred to the subjective lane.

**2.6 `ref` on the reading tools.** Defer it, for the reasons in 1.4. Keep the refusal test.

**2.7 Helpers.**
- Add `collectBrowserWords` (`collect*` is sanctioned).
- Add one line matcher that returns `{ offset, text }` (Needs' shape). Its offsets must be scan positions, not `indexOf`, so duplicate lines carry their own offsets.
- Graft Fewest's rule for rows: skip a row that does not fit and continue. Keep Needs' rule that cuts the first row with `…`.
- The `match*` prefix sits outside `names.md:91-104`. Keep it parallel with the existing `matchBrowserOutline`, and refer the prefix question to the Orchestrator.

### 3. Best base and grafts

**Base: Needs.** Graft:
- **The rename (user):** `search` on `look` and `read`, `purpose` for the synthetic page-tool parameter, and the `tabs`/`journeys` ruling from 2.2.
- **From Sees:** N3, plus N2 done at the projection step with `resolveAttributes`; the cases-it-cannot-render table; the `wait` TSDoc fix.
- **From Feasibility:**
  - the measured baseline and the measurement script;
  - the privacy, dialog-order, hold, and recorder invariants;
  - the migration rows for the recorder, MCP server, guide tests, and DOM factories;
  - the plain-text option for the user under 2.3.
- **From Fewest:** the row-skip rule and its failing-control tests.

### 4. What all four missed

**4.1 The `what` name.** The user rejects it, and it carries four concepts (2.2). The migration list none of them has:
- **Source:**
  - `src/core/constants.ts:455`, `:517-519`, `:532-541`, `:552-561`, `:659-661`, `:712-718`
  - `src/core/BrowserToolset.ts:120`, `:171-173`, `:184`, `:695-696`, `:714`, `:1218`
  - `src/core/BrowserRegistry.ts:418`
  - `src/core/helpers.ts:469-491`, `:543`
  - `src/core/types.ts:2789`
  - `src/core/BrowserJourneyToolset.ts:557-561`
  - `src/core/factories.ts:110`, `:139`
  - `src/browser/factories.ts:59`
- **Tests:** `tests/src/core/BrowserToolset.test.ts:869-874` and its other `what` calls, `BrowserRegistry.test.ts`, `BrowserJourneyToolset.test.ts`, `BrowserMCPServer.test.ts`, `tests/service/toolset.test.ts`, `tests/service/journey.test.ts`, `tests/src/browser/factories.test.ts`, `tests/src/core/helpers.test.ts`.
- **Guide:** `guides/browser.md` at `:2870`, `:2895`, and `:3395`.
- **Outside this repository:** the `@orkestrel/ollama` store-proof prompt ("`read` with `what` set to the question") and a re-run of that proof.

**4.2 The bound.** The baseline is 6,023, so the headroom is 27.
- `what` to `search` adds 2 characters per occurrence: +16 if `tabs` and `journeys` are renamed too, +8 for `look` and `read` alone. The rewritten descriptions come on top of that.
- `journeys` also counts against the separate 3,100 journey-copy bound (`BrowserToolset.test.ts:791-792`), whose headroom is unmeasured.
- Every design here, with item 12, needs the ruled procedure: shorten first, then raise.

**4.3 Relative links on any whole-page projection.** `navigate` refuses a relative address. Only Sees saw this.

**4.4 The empty element read under the current default.** Only the flip removes it. None of the four names it.

**4.5 The Ollama 0.34.4 rule (`constants.ts:516-517`).** Every placeholder exists because of it, and it has not been re-measured against the Ollama version the store proof pins. If the rule no longer holds, the placeholders can go instead of being renamed.

## Findings outside the claims

- `BROWSER_TOOL_VIEW_FOOTER` (`src/core/constants.ts:455`), "call look with what you want to find", must name the renamed argument. Write "call look with the words you want to find" or "call look with a search".
- `deriveBrowserToolSchema` remarks (`src/core/helpers.ts:469-473`) and `types.ts:2789` document `what` as part of the public skip contract. Rename them with the parameter, with no shim.

## Attacked and held

- Every proposal refuses a `format` literal (`names.md:75`).
- The match block stays outside the paged text, so an offset never depends on the search (`BrowserToolset.ts:714`).
- A continuation reuses the retained capture (`:747-756`).
- Feasibility's bound arithmetic: 6,463 needs 6,500.
- Fewest's copy counts: 47 and 62 characters.
- Needs' store-proof citations (`guides/browser.md:3395`, `:3403`).
- The 25-word and 100-character limits (`BrowserToolset.test.ts:829`, `:843`).

VERDICT: Needs is the best base, but not as written. It keeps `what` against the user's ruling, its copy alone exceeds the 6,050 bound (6,023 + 28 = 6,051), and it leaves whole-page links relative. Rename the search argument to `search`, give the placeholder its own name, and apply the grafts in section 3.