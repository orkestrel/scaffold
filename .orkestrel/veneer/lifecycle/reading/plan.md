# Plan: one line-addressed `read` (reconciled 2026-10-06)

This plan reconciles the two blind proposals, `proposal-planner.md` (Opus 5.5) and `proposal-analyst.md` (GPT-6 Astra), into one design. Where the two disagree, § Rulings names the lane each choice follows and the reason. The campaign and its exit criterion are in `campaign.md`.

## The page vocabulary: 8 tools, down from 11

| Tool | Intent | Absorbs |
| --- | --- | --- |
| `read` | See the page or find something on it | `look`, `read`, `plain`, the `tabs` listing (in the header), search, and continuation |
| `click` | Activate one element | Settling, then the `read` window |
| `type` | Enter text or choose an option, and optionally submit | Settling. A handled submission waits for the page's first change. Then the window |
| `press` | Send a key or chord | Settling and the window |
| `navigate` | Open an absolute address | The load wait and the window |
| `wait` | Hold until text appears or leaves | The window, opened at the line holding the text |
| `dialog` | Answer an open dialog | The resumed action, settling, and the window |
| `switch` | Move to another tab | The window of that tab |

The tools stay distinct for these reasons:
- **`click`, `type`, and `press`:** merging them needs an action selector, which `names.md` § Split behavioral variants refuses.
- **`wait`:** folding it into `read` would make an observation block. `wait` stays a journey step.
- **`dialog`:** `press` cannot carry acceptance, dismissal, and prompt text.

### Copy

Copy that already exists keeps its bytes unless this list changes it.

- **`read`:**
  - Description: `Shows numbered lines of the page, with references like e4 to act on. Call it to learn a fact or to find an element.`
  - `from` (integer, required): `The first line to show: 1 for the top, or the line a reply's footer names.`
  - `to` (integer): `The last line to show. Default: as many lines as fit.`
  - `search` (string): `Words to find; the reply opens one line before the first match at or after from.` (amended after the audit, because the window opens one line before the match).
  - Annotations: `pure` and `untrusted`.
- **Action descriptions** name the flow they absorb, each within 25 words. Take the wording from the analyst's table: for example, `Clicks the referenced element, settles its action, and returns the page.` The `type`, `press`, `navigate`, `wait`, `dialog`, and `switch` descriptions follow the same pattern. `switch` names the tabs `read` lists.
- **Notes and refusals:** every "call look" note and refusal becomes "call read" (`BROWSER_TOOL_DEADLINE_NOTE`, `BROWSER_TOOL_PENDING_NOTE`, `BROWSER_TOOL_CHANGED_NOTE`, the reference refusals, the capture error, and the busy refusal).
- **Removed:** `BROWSER_TOOL_VIEW_FOOTER`, because every view carries its own footer.
- **Bounds:** the copy tests keep the 100-character parameter bound, the 25-word description bound, and the measured-total rule. Re-measure the totals; the analyst measured the journey copy at 3,399 against its 3,400 bound.

## The projection

### Source

- **Engine:** build lines from the accessibility outline engine that both placements share (`renderBrowserOutline`; `BrowserElementManager.ts:95`, `BrowserDOMElementManager.ts:111`), extended with:
  - heading levels;
  - link destinations;
  - list markers;
  - table rows;
  - named images;
  - control values.
- **Never Markdown:** never splice in the HTML capture's Markdown.
- **The DOM placement** supplies the same data from its own traversal.
- **Capture consistency:** bracket each capture with document identity. When the document changes during capture, retry once within the capture deadline; otherwise return a bounded capture failure.

### A line

- **Model:** a line is a list of spans: text, syntax, and reference. Search scores text spans, link destinations included, and never reference tokens or syntax. Line numbers derive from position.
- **Rendering:** `N: ` and then the content. References keep the form `e7`, so `e7 link "Cedar Tea Tray" /product/p3`.
- **Headings:** `#` repeated to the level. When a heading's only referenced descendant carries the heading's own name, the heading folds into that element's row: `### e7 link "Cedar Tea Tray" /product/p3`.
- **Links:** a same-origin link prints its path, query, and fragment; any other link prints its absolute address.
- **Images:** a named image renders as `image "ALT"`. Decorative images are omitted.
- **Table rows:** the cells joined by ` | `.
- **Lists:** a list item starts with `- `.
- **Form controls:** a control prints its reference, role, name, state, and the value the accessibility tree exposes.
  - Chromium masks a password field's value, and the accessibility tree carries no discriminator a captured source supplies. So the projection carries the mask and never the secret, as `look` did in 0.0.26 (amended 2026-10-06 after the unit's deviation report: browser `tmp/codex/reading-source.json`, `reading-source-raw.json`).
  - A text line equal to its parent control's value is omitted.
  - Every existing redaction of text typed with `secret: true` stays in force in every rendered result.
- **Exclusions:** hidden content and registered secrets stay out.
- **Wrapping:**
  - Wrap at whitespace, so that no line exceeds the window room and a typical paragraph of the store fixtures stays one line. The projection unit picks the width from that property and reports it.
  - A token with no whitespace splits hard, never inside a surrogate pair. Mark the continuation fragment so a reader joins it without a space.
  - Wrapping happens before range selection, and nothing renumbers the document.

### Header and footer

- **Header:** `page "TITLE" URL (T lines)`.
  - Bound the displayed title and address, and mark an abbreviation.
  - With two or more tabs, a second header line lists them within a bounded share of the room: `tabs: t1 "TITLE" (current), t2 "TITLE"`. When more tabs exist than fit, it names how many are left out.
  - Then come any move note, the change note, and the search line.
- **Footer:**
  - `[lines 1–47 of 52; 5 below; call read with from 48 for more]`
  - `[lines 20–60 of 120; 19 above, 60 below; call read with from 61 for more]`
  - `[lines 48–52 of 52; 47 above; end of page]`
  - `[lines 1–7 of 7; the whole page]`
- **The whole result fits `BROWSER_TOOL_LIMIT`:** the status, header, rows, and footer. Reserve the header and footer before adding rows. Never cut an addressed row or its continuation afterward. The limit stays 4,000.

### Ranges

- **`from`:** a 1-based safe integer, inclusive and required.
- **`to`:** inclusive and optional. A `to` past the end reads to the end. There is no end sentinel.
- **Default window:** from `from` through `min(to, from + BROWSER_READ_LINES − 1, T)`. It ends earlier at the last whole line that fits. `BROWSER_READ_LINES` is 100.
- **Refusals,** each with code `BROWSER_TOOLSET_ARGUMENT`:
  - a `from` past the end of a non-empty page: `Line 80 is past the end; the page has 52 lines.`;
  - a reversed range;
  - a number that is not an integer.
- **An empty page** returns its header and a footer, with no line 0.

### Search

- **Matching:**
  - Words of 3 or more letters or digits, case-folded.
  - A search word matches a line word when the two are equal, or when the shorter has at least 4 letters and begins the longer. So `ship` matches `shipping`, but `the` does not match `these`.
  - There is no in-word or stemming match.
  - Only the best score counts.
- **Scope:** lines `from` through `to`, or to the end when `to` is omitted. Search and range combine, and a stray `search` is never refused.
- **Output:**
  - The line after the header: `COUNT lines match "SEARCH": N1, N2, …`, capped at `BROWSER_READ_MATCHES` (50), then `… and K more; add words to narrow`.
  - The window opens one line before the first match and runs as far as fits, with an exact footer.
- **No match:** `No line matches "SEARCH".` or `No line from N on matches "SEARCH".`, and the window opens at `from`.

### Stability

- **Recapture:** every `read` and every receipt recaptures. The retained `#reading` and the toolset's `view.read()` go away.
- **Unchanged page:** an unchanged page renders the same lines and the same references.
- **Changed page:** the toolset keeps the last projection of each view. When a read with `from` greater than 1 meets a changed projection, the header carries `The page changed since the last view; line numbers might differ.`, and the read serves the fresh projection at `from`. A stale capture is never served.

### References

- `parseBrowserReference` refuses a bare number (`parsers.ts:711-712`), so a line number can never act as a reference.

## Action receipts and the settle

- **Every receipt:** the receipt line, then the `read` window from line 1. The whole result is bounded and the footer is exact.
- **`wait`:** on success it returns `"TEXT" is on the page.` and the window opened at the text. On timeout it returns the timeout line and the window from line 1.
- **Handled submission:** the receipt waits for the first relevant rendered change.
  1. Install submission observation before dispatching the input.
  2. Arm change observation in the capture-phase submit listener, before application handlers run.
  3. Record both synchronous and delayed changes.
  4. Read the submission state without destroying the observer.
  5. Await the first relevant change, a navigation, a dialog, an abort, or a detachment, stopping before the capture reservation (`BROWSER_TOOL_TIMEOUT_MS` minus `BROWSER_TOOL_CAPTURE_MS`).
  6. Capture.
  7. Release every observer on every exit.
- **What does not count as completion:** typing before the submission, hidden mutations, or document bookkeeping. Never repeat a submission.
- **Statuses:**
  - `the page handled the submission and changed`;
  - `the page handled the submission and has not changed yet; do not submit again; call read or wait for the text you expect`.
- **Opening at the first changed line:** deferred. Record it as a candidate.

## Journey tools

- **Names:** all seven stay: `record`, `save`, `journeys`, `edit`, `replay`, `forget`, and `capture`.
- **Bounds:** every result fits `BROWSER_TOOL_LIMIT` as a whole result, with exact continuation lines.
- **Results:**
  - `record`: its status, then a `read` window sized to the room left.
  - `replay`: its outcome, then a window sized to what remains. When the room cannot hold a header and one line, it prints `(Call read to see the page.)`.
  - `save` and `edit`: the numbered listing, continued through `journeys` with `from`.
  - `journeys`: moves from character `offset` to `from` and `to` lines, so one coordinate system covers every reading result. It adds no run selector.
- **Thrown messages** are cut and re-thrown with their code and context.

## Browse MCP server

- It registers the revised definitions with no aliases.
- `look`, `plain`, and `tabs` are refused as unknown tools.
- Its tests assert the whole returned text against the bound.

## Agent

- A successful string tool result reaches the model unchanged. A non-string value is JSON-encoded, and the error path stays as it is.
- Cover exact equality for multiline text, quotes, backslashes, Unicode, and empty strings.
- **The consumer census** (analyst): no fleet consumer JSON-decodes string tool content. After integration, run the live tool-content consumers:
  - ollama `tests/service/page.test.ts` and `tools.test.ts`;
  - supervisor's parser.

## Ollama's harness

- **Page tasks** advertise only page tools: `StoreTask` and `StoreRunOptions` gain `journeys?: boolean`, set only on the journey task. `type.secret` stays.
- **Seed and prompt:**
  - The seed is `read({ from: 1 })`.
  - `STORE_SYSTEM_PROMPT` names the procedure (read with search to learn a fact, follow a footer's line, type with submit, click a reference from the latest result, wait once) and no answer. It passes the 120-word test.
- **Each case has one predicate,** used for both its retry and its assertion:

  | Case | Predicate |
  | --- | --- |
  | Shipping | Shared oracles; the seed lacks the fact; a successful model-issued `read` carries it; the answer names it |
  | Cart | Shared oracles; the cart equals exactly the requested product |
  | Search | Shared oracles; the submitted query resolves to the intended products; the answer names exactly those |
  | Checkout | Shared oracles; exactly one order, for the requested buyer; the answer carries the code |
  | Paging | Shared oracles; a successful model-issued `read` whose window starts at the line that an earlier model-issued `read`'s footer named carries the token. The seed's footer never counts, and a search hit, a guessed line, or a stale footer never passes |

- **The paging fixture:**
  - Extend the ordinary policy material so the token lies beyond both the seed window and the next default window.
  - Reword the token section so it shares no prefix-rule word with the paging prompt: `Quoting this version` / `Quote ${STORE_POLICY_TOKEN} when you write to us, so our workshop can match a message to this version of these terms.`
  - Pin the placement with real-browser setup cases through the new projection.
- **The journey case:**
  - The prompt records a journey that opens the cart before checkout.
  - The edit removes the recorded cart click, not a second submission.
  - The predicates require one submission line, the removed cart click, and orders exactly `[STORE_BUYER, STORE_JOURNEY_BUYER]`.
  - The batch keeps `declare`, `update`, and `remove`.
- **Reference tracking:** the exposed reference set is replaced on each result that lists references, and an empty listing counts as a listing. A `read` seed is a listing.
- **Removed:** the unread meter and its plumbing. Timings come from monotonic stamps around each generation, each tool call, and the seed. Model reload is recorded separately.
- **Task keys:** rename `read`, `click`, and `form` to `shipping`, `cart`, and `checkout`.

## Measurement

The model is `qwen3.5:2b-q4_K_M` on Ollama 0.35.1 with `STORE_BOUNDS` unchanged. Every step records the daemon and model identity before and after. The ports and their order are fixed before each step.

| Step | Instrument | Decision |
| --- | --- | --- |
| M0 | Deterministic browser and setup tests | Any failure stops |
| M1 | First replies: 5 tasks × 8 ports. A first `read` is executed, because it is pure | Diagnostic. A task at 2 of 8 or fewer productive first calls stops before M2 and is reported |
| M2 | 8 single attempts per task, no retry | Each task at 7 or 8 of 8 → M3. A task at 6 or fewer → stop and diagnose |
| M3 | 16 store-task runs on the 2B | 16 of 16 clean → M4. The first failed run ends the series. It is classified and fixed, and the series restarts on the fixed build |
| M4 | 2 runs on `qwen3.5:4b-q4_K_M` | 2 of 2 → M5. Otherwise diagnose, because this tests the premise |
| M5 | The journey case | Passes → accept |

**Per-attempt time targets** come from the analyst's derivation: 3 s plus the planned turns × the measured maximum amortized seconds per turn.

| Case | 2B target | 4B target |
| --- | --- | --- |
| Shipping | 16 s | 35 s |
| Cart | 15 s | 25 s |
| Search | 28 s | 27 s |
| Checkout | 14 s | 20 s |
| Paging (three model turns) | 15 s | 31 s |

Report every case's duration and attempt count against its target. A case over its target is read from its transcript. Targets are never adjusted after seeing results.

## Units

The browser writing units run in series in one checkout. The agent unit runs in parallel in its own checkout. Every Astra unit runs through `codex exec` with `danger-full-access`, owns only its files, commits nothing, and reports its commands. The Orchestrator commits each green checkpoint.

| Unit | Engine | Owns | After | Acceptance |
| --- | --- | --- | --- | --- |
| R1 contract | Opus (edits); the Orchestrator runs commands | browser `src/core/types.ts`, `constants.ts` (copy and constants), barrel | none | Types first; copy measured within bounds; `npm run check` shows diagnostics only in files later units own |
| R2 projection | Astra | browser `helpers.ts`, `parsers.ts`, `elements/BrowserElementManager.ts`, `src/browser/elements/BrowserDOMElementManager.ts`, and their tests | R1 | One case each for the line rules in both placements, wrapping, ranges, prefix search, footers, notes, capture retry, and bare-number refusal. `test:src:core`, the browser-placement project, and `check` pass |
| R3 toolset | Astra | `BrowserToolset.ts`, the submission compiler, `factories.ts` (both placements), `tests/src/core/BrowserToolset.test.ts`, `tests/service/toolset.test.ts`, `tests/service/document.test.ts` | R2 | Continuation exactness on an unchanged page; search past the first window; refusals; the change note; whole-result bound; the settle lifecycle (synchronous, delayed, none, unrelated mutation, navigation, dialog, abort, detach, cleanup); `wait` window; tabs header; copy tests |
| R4 journeys and MCP | Astra | `BrowserJourneyToolset.ts`, `BrowserMCPServer.ts` (tool naming), and their tests, `tests/service/journey.test.ts`, `tests/service/browse.test.ts`, `tests/src/bin/main.test.ts`, `tests/distribution.test.ts` | R3 | A failing-before, green-after bound; `journeys` on lines; MCP whole-text bound; server project and distribution tests |
| R5 guide | Opus (edits); the Orchestrator runs commands | browser `guides/browser.md` and the doc blocks of changed exports | R4 | `npm run test:guides`; prose re-read against what shipped |
| A1 agent | Astra | agent `src/core/Agent.ts`, the tool-message TSDoc, `tests/src/core/Agent.test.ts`, agent guide passage | none (parallel) | Exact-equality cases; `test:src:core`, `check`, `test:guides` |
| O1 harness | Astra | ollama `tests/setupStore.ts`, `tests/setupStore.test.ts`, `tests/service/browser.test.ts` | R4 pack, A1 pack | Real-browser setup cases for the seed, fixture placement, page-only tools, predicates, and journey predicates; `test:setup`, `check` |
| O2 instruments | Astra | ollama `tmp/probes/store-first.test.ts`, `store-series.test.ts` | O1 | One row per draw or attempt at count 1 |
| F audit | Opus on Astra-written mechanisms, Astra on Opus-written contracts and copy | read-only | R1–R5, A1, O1 | One `orkestrel-falsify` round |
| V gates | an Astra command runner | read-only | F | Tree-wide gates once per repository |
| M measurement | Astra, edits no source | ollama `tmp/codex/store-campaign5/` | V | M1–M5 |
| P releases | the Orchestrator, with the user's codes | manifests | M | browser 0.0.27, agent 0.0.27, then the ollama re-pin and release. At mcp's agent re-pin, update `mcp/tests/distribution.test.ts:1596` and `:1732` from `['"receipt-1"']` to `['receipt-1']` |

## Rulings on the lanes' differences

| Point | Planner | Analyst | Ruling and reason |
| --- | --- | --- | --- |
| `tabs` | Folded into the `read` header | Kept as a tool | **Folded.** It is an observation, so it fits `read`, and the principle prefers fewer tools |
| Line source | Accessibility outline, extended | DOM snapshot joined to accessibility references | **Outline, extended,** plus the analyst's capture bracket. One engine already serves both placements; the join adds capture cost and identity risk |
| Line model | Strings | Spans (text, syntax, reference) | **Spans.** Search must score text, never reference tokens or syntax |
| Line prefix and references | `N: ` with `e7` | `N \| ` with `[e14]` | **`N: ` with `e7`.** This matches the Anthropic editor form and the references the model already knows |
| Required parameter | `from` | `search`, empty for a range | **`from`.** An empty-string `search` is a sentinel (`AGENTS.md` § Absence) |
| End of range | No sentinel | `to: -1` | **No sentinel** (`AGENTS.md`) |
| Default window | 100 lines within the limit | 40 lines | **100 lines within the limit.** It is the measured best window; the character limit binds first on store pages |
| Bound | Footer outside the 4,000 | Whole result inside | **Whole result inside.** One rule, testable as written |
| Search output | Window at the first match plus a row of match numbers | Grep-style matches with context, cap 10, refused with a range | **Window plus match numbers.** The 2B fills `search` on every call, and a refusal of search with a range would turn its continuations into errors |
| Prefix matching | Yes | No | **Yes.** The fact line holds `ship`, and the 2B searches `shipping` |
| Changed page | Note, then fresh lines at `from` | Revision counter, then the first window | **Note, then fresh lines at `from`.** A reset to line 1 can loop the model |
| Paging oracle | Counts the seed's footer (needs a ruling) | Model-issued reads only; longer fixture | **Model-issued only.** The claim stays strict and no ruling is needed |
| Journey edit | Remove a recorded cart visit | Remove a recorded focus click | **The cart visit.** It is natural to the task; a focus click before typing is not |
| `journeys` | Character offsets for now | Lines, plus run selectors | **Lines, no run selectors.** One coordinate system everywhere; run inspection has no consumer |
| `navigate` | Accepts relative paths | Absolute only | **Absolute only.** A wider input has no consumer this round |
| Receipt window | Opens at the first changed line | First window | **First window.** Opening at the change is deferred |
| Time targets | Reported, round figures | Derived from measured maxima, plus a 3× ceiling on case time | **Derived targets, reported.** A case over target is read from its transcript |

## Deferred

- Receipts that open at the first changed line.
- `journeys` run selectors.
- Relative `navigate`.
