**Lane: subjective.** I judged naming, API shape, ergonomics, and fit to the user's criteria. I did not rule on the rule letter, the measurements, or the capture substrate; those questions are referred where they come up.

## 1. Each proposal: strongest ideas and defects

### 1.1 `reading-proposal-needs.md` (reader needs first)

**Strongest ideas:**
- **The widest map of reader angles.** It has 24 axes, each with a ruling. A10 ("locate a fact by its words") is tied to recorded evidence: the store proof called `read` seven times (`guides/browser.md:3403`), and the guide's own prompt tells models to "call read with what set to your question" (`guides/browser.md:48`, `:3416`).
- **Match rows carry offsets** (`[1520] Delivery: …`, proposal `:83-86`). This is the only proposal that turns a match into a place to continue reading. That mirrors how `look`'s rows carry a reference to act on.
- **The library default flips to whole-page** (`distill: false`), so the library and the tool read the same thing.
- **`collectBrowserWords` is the right helper name.** `collect*` means gathering members into a collection (`names.md:102`), and the proposal explicitly rejects `extract*`.
- **It names A24:** text quoted from Markdown back into `wait` or `type` can miss on escapes.

**Defects:**
- **It refuses plain text on the tool** (A6, `:22`) because "Markdown is a superset for a model". That goes against the user's own example, and the measurements contradict it.
  - Undistilled text is 73,691 characters against 90,033 for Markdown: 19 slices against 23 (`reading-feasibility.md:208-210`).
  - Its own A24 is fixed by plain text, which has no Markdown escapes.
  - The proposal never connects the two.
- **A15 overclaims link targets.** It says links are "Covered through Markdown `[text](url)`". With `distill: false`, `base` is never applied, so links stay relative (`reading-surface-map.md:196`; `tests/src/core/BrowserReading.test.ts:100`). A whole-page read then returns `[Track](/orders/7)`. Only sees caught this (its N2).
- **"passages" in the copy over-promises.** Each row is one projected line, not a span with context.

### 1.2 `reading-proposal-fewest.md` (fewest well-named words)

**Strongest ideas:**
- **No library change.** The `read` copy shrinks to `Reads the page's text. Call it to learn a fact.` (−63 characters) by relying on the footer that already says `call read with offset END` (`src/core/BrowserToolset.ts:810`).
- **The long-row tension (`:216`).** `look`'s block stops at the first row that does not fit (`src/core/BrowserToolset.ts:722`). On `read`, one long paragraph would then hide every later match. Skip-and-continue is the right rule.
- **A capture-level `nav` test (`:224`).** It guards `distill: true` from silently dying under item 11. The existing distill tests use caller HTML, so they would keep passing.
- **It flags that `match*` is not a sanctioned prefix** (`:217`).

**Defects:**
- **Two defaults for one reading.** The library keeps `distill: true` while the tool passes `false` (`:218`). A newcomer calling `reading.text()` gets main-content-only text under a name that promises the page's text, and the tool's "read" returns something different from the library's. That breaks one concept, one term.
- **`extractBrowserWords` uses the wrong verb.** `extract*` "extracts structure" (`names.md:92`); a set of words is a collection, so `collect*` fits.
- **`matchBrowserLines` returns `string[]`,** so the match block has nothing to continue from.
- **It misses N2** (relative links), which its own tool-side `distill: false` creates.

### 1.3 `reading-proposal-sees.md` (what a person sees)

**Strongest ideas:**
- **The fidelity argument for the flip (`:67`):** a bare `text()` must keep its name's promise.
- **N2 (`:254`):** write each `href` from the live resolved property.
- **Removing "visible" from `wait`'s summary (`:92`),** because `innerText` is not "visible".
- **The table of cases item 11 cannot render (`:239-249`),** each mapped to the channel that carries it.
- **N3 (`:255`)** states the substrate consequence plainly.

**Defects:**
- **Renaming `look` to `outline`** (`:108-110`) costs about 40 sites and a store-proof re-run (`:335`). It is justified by a name-only confusion that no recorded run shows; b2's failures were `what` being ignored and distillation, not tool choice (`reading-surface-map.md:285`).
  - To a newcomer, `outline` means headings and document structure, not "controls with references to act on".
  - The copy "as a screen reader announces it" is a claim nothing tests, and the outline drops roles and duplicate text (`reading-surface-map.md:45-48`).
- **The `read` copy `Reads the page as a person sees it` (`:116`) overclaims.** Its own risk list (`:347`) concedes shadow-root and iframe text are missing.
- **`matchBrowserText` returns `string[]` with no offsets.**

### 1.4 `reading-feasibility.md` (objective lane, with measurements)

**Strongest ideas:**
- **Measurements:**
  - copy baseline 6,023;
  - size per form and per distill setting (`:207-210`): distilled and whole-page Markdown differ by about 2% on the showcase, so flipping the default costs little there;
  - the cost of each projection.
- **The distill finding (`:63`):** on a capture that neutralizes regions, `distill: true` cannot mean "main content". Every other proposal's N3 depends on this.
- **Continuation identity keyed by method and source (`:65`).**
- **Footers that name the tool to call next.**
- **The dialog refusal is checked before the cache.**

**Defects:**
- **It removes `read` and `what`.**
  - This discards the one reader angle with recorded evidence (`guides/browser.md:3403`) and breaks the guide's documented prompt (`guides/browser.md:48`, `:3416`).
  - It leaves `look` with `what` and its reading siblings without it, so the two observation tools take different shapes.
- **Tool names say the form, not the purpose.**
  - `markdown` and `text` answer "which format", while a model is asking "how do I learn a fact".
  - No agent toolset in the prior art has a format-named tool (`reading-prior-art.md:6-16`).
  - A `text` tool collides with the `text` argument of `wait` and `type`, which means "a string you supply" (`src/core/constants.ts:584-586`, `:628`).
- **A required `offset` used only to satisfy the parser (`:52`)** forces a meaningless `0` on every fresh read.
- **`ref` is added (`:53`) with no region to point at.** References exist only for interactive roles (`src/core/constants.ts:319-347`), and an `Iframe` reference reads the element, not its document (its own `:169`).
- **+440 characters of copy.**
- **It accepts that region neutralization turns `distill` into "normalization"** (`:120`). A library option whose name means "boil down to the essence" would then do something else on every capture.

## 2. Disagreements and rulings

1. **The fate of the `read` tool and what `what` means.** Keep `read`. At offset 0, `what` lists the best-matching lines before the body, outside the paged text, under `look`'s matching rule.
   - Each row carries its offset (graft from needs).
   - The block skips a row that does not fit and continues (graft from fewest).
   - Why: the same argument does the same thing in both observation tools, the guide's prompt depends on it, and the store proof is a real consumer. Feasibility's removal is rejected.
2. **Separate `markdown` and `text` tools against one `read`.** Keep one `read` tool; reject the two format tools for the naming and collision reasons in 1.4.
   - The user's "just the text" belongs as the fine-tuning option after the methods are fixed, as they asked.
   - **The option:** a boolean `plain` ("True for plain text without Markdown syntax or link addresses").
   - **Value:** about 18% fewer characters on the showcase, and strings that can be quoted into `wait`.
   - **Prior art:** the MCP fetch server's `raw` is a boolean form switch on its one reading tool; `plain` avoids `raw`'s three meanings.
   - **Referred to the objective lane:** whether a boolean that picks between `markdown()` and `text()` at the tool boundary is the magic mode `names.md:75` forbids or the boolean behavior `AGENTS.md` asks for. If that lane rules it a magic mode, defer plain text on the tool and record it as the user's open question. Do not adopt two tools.
3. **The library `distill` default.** Flip it to `false`, as needs and sees propose. A bare `text()` then returns the page's text, the library matches the tool, and the measured cost on the showcase is about 2%.
   - This only stays coherent if the capture keeps region elements (sees' N3) and links resolve (N2).
   - Whether the capture keeps region elements is item 11's call; refer it to the Orchestrator and the objective lane. Subjectively, the API needs it.
4. **Renaming `look`.** Keep `look`. The real overlap is in the copy: both tools say "the page's text" (`src/core/constants.ts:528`, `:548`). Fix it there:
   - `look`'s description leads with the elements you can act on;
   - `read` keeps "the page's text" without "as a person sees it".
   - Record the rename as an open question for the user, to revisit if a measured run shows a model mixing the two up.
5. **`ref` on reading tools.** Defer it, as three of the proposals do. No reference points at a region a reader wants.
6. **Added helpers.**
   - Add `collectBrowserWords`.
   - Add `matchBrowserText(text, search)`: it pairs with `matchBrowserOutline(outline, search)` because it is named for what it searches. It returns `{ offset, text }` records as `BrowserReadMatch`, because the tool shows offsets.
   - Reject `extractBrowserWords` and the `string[]` return.
   - Referred to the objective lane: whether `match*` must become `filter*` or a sanctioned prefix for both helpers (`names.md:91-103`).
7. **Noun in the copy.** Use "lines" over "passages", because a row is one projected line. Whether `renderMarkdown` writes one line per paragraph is unmeasured; refer it to the objective lane.

## 3. Base and grafts

**Base:** `reading-proposal-needs.md`.

**Grafts:**
- **From sees:**
  - N2: resolved `href` in the capture, which the flip requires;
  - the fidelity argument for the flip;
  - `wait`'s summary without "visible";
  - the table of cases item 11 cannot render, for the `BrowserReadingInput` remarks;
  - N1 and N3, referred into item 11.
- **From fewest:**
  - the shorter `read` description that relies on the footer;
  - skip-and-continue for a long row;
  - the capture-level `nav` test that keeps `distill: true` honest.
- **From feasibility:**
  - its measurements, as the copy baseline (6,023) and the cost of each form;
  - continuation identity that includes the projection, which becomes necessary if `plain` lands;
  - its point that `distill` stops meaning "main content" on a neutralized capture, used as the reason N3 must be ruled first.

## 4. What all four missed

- **The user's order: methods first, then options.**
  - None delivers the user's own example as a ruled tool option after the methods. Needs and sees refuse it, fewest leaves it to the user without the measurements, and feasibility pays for it by deleting `read`.
  - None connects plain text to the A24 quoting problem it fixes.
- **The documented example matches noise.**
  - The guide's sample calls use `what: 'the page'` (`guides/browser.md:63`, `:3428`), and models copy them. Under the shared match rule, `the` and `page` score as content words, so a `read` block on a real page fills with noise lines.
  - Stop words are flagged generically (needs `:233`, sees `:346`), but nobody tests against the package's own example.
  - At minimum, change the guide's sample to a real question.
- **The match block repeats the body.** At offset 0, matches that already sit in the first slice are printed twice, inside half the room. List only matches past the returned slice; that is where an offset to jump to has value.
- **`reading.text().text` and `reading.markdown().text` read badly.** The slice field `BrowserReadResult.text` makes both stumble for a newcomer.
  - Sees keeps it (`:19`); the others don't mention it.
  - Raise it with the user as a naming question. It is shared with outline paging, so do not change it in this round.
- **The overlap is in the copy.** `look` and `read` both claim "the page's text" in their descriptions; only sees saw the overlap, and it reached for a rename.

## Findings outside the claims

- `src/core/constants.ts:528`: `look`'s description says "Shows the page's text", the same promise `read` makes at `:548`. It should lead with the elements you can act on and their references, so the two observation tools differ by name and by copy.
- `guides/browser.md:63` and `:3428`: the sample `what: 'the page'` teaches a search that matches nothing specific. It should be a sample question, such as `what: 'delivery date'`, after `read` starts using `what`.

## Attacked and held

- **`what` on `read` has a consumer.** It held: the guide's prompt (`guides/browser.md:48`) and the store proof (`:3403`).
- **The library methods `markdown()`, `text()`, and `html` are a real split.** It held: they are different projection algorithms (`names.md:79`), and all four agree.
- **`distill` keeps its name.** It held: `@orkestrel/html` owns the term, and `main` misleads when a page has no `<main>`.
- **Model-driven extraction is refused.** It held, under "Mechanism, not product policy" in `AGENTS.md`.

The source files behind these rulings:
- `C:/Users/mikes/WebstormProjects/browser-wt-browse/tmp/codex/reading-proposal-needs.md`
- `C:/Users/mikes/WebstormProjects/browser-wt-browse/tmp/codex/reading-proposal-sees.md`
- `C:/Users/mikes/WebstormProjects/browser-wt-browse/tmp/codex/reading-proposal-fewest.md`
- `C:/Users/mikes/WebstormProjects/browser-wt-browse/tmp/codex/reading-feasibility.md`
- `C:/Users/mikes/WebstormProjects/browser-wt-browse/src/core/constants.ts`
- `C:/Users/mikes/WebstormProjects/browser-wt-browse/guides/browser.md`

VERDICT: base = needs; graft sees N2/N3, fidelity rule, and wait wording; graft fewest's short copy, row skip, and nav guard; graft feasibility's measurements and continuation identity; keep `read` (`what` matches with offsets) and `look`; flip `distill` to false; add `plain` on `read` subject to the objective lane's magic-mode ruling; defer `ref`.