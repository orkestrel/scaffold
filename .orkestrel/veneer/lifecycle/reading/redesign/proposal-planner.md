# Proposal: a line view that the 2B and the 4B act on (planner)

**Lane:** subjective. This lane covers the shape the model sees: the line form, the reference form, the header and footer words, the search reply, and how a small model reads them. Correctness of the predicates and the measurement arithmetic belong to the objective lane. Where this proposal touches them, the point is listed under § Tensions.

## Design

The footer and the line numbers stay byte for byte. The design makes following the footer harmless on the action tasks, and it gives the reference a label so that no number sits next to it unlabeled.

The proposal makes five changes, ranked by the evidence behind each one and how many failures it covers:

1. **C1: one reference set per page state** (harness predicate). Every reference listed since the page last changed stays valid. This targets O-reference.
2. **C2: an element match quoted in the search header** (browser). Suppose the best-scoring line on the page carries a reference and the window does not show it. The reply then quotes that line with its number. The window never moves. This targets C-loop, and it is how this proposal answers the footer's pull.
3. **C3: a labelled reference after the name** (browser). The row becomes `11: ### link "Cedar Tea Tray" [ref=e7] /product/p3`. This targets the 4B cart detour, and it protects C2's quote from the same misread.
4. **C4: a search-box sentence in the system prompt** (harness copy). This targets S-answer.
5. **C5: a window sentence in the header** (browser), tested beside a neutral harness framing (F1). This targets P-premature.

Every one of these changes can be tested by transforming the bytes the model receives, before any package code changes (§ Validation matrix).

## Answers by question

### Q1. Numbers and references

**The change (C3).** A reference prints as `[ref=eN]` right after the quoted name. This applies to every row an agent reads: projection rows, receipts, and refusals. The `N: ` prefix stays, and every line keeps its number. The following excerpt shows the catalogue rows:

```text
1: link "Catalogue" [ref=e1] /
6: searchbox "Search products" [ref=e4]
11: ### link "Cedar Tea Tray" [ref=e7] /product/p3
12: - $41.00. A slatted cedar tray that drains into a hidden reservoir.
```

Receipts and refusals use the same form, for example `Clicked link "Checkout" [ref=e3].` and `Element button "Search" [ref=e5] takes no text; call click for a button.` A control prints `textbox "Name" [ref=e16] value="Ada Lovelace"`, with the reference before the address, the value, and the states.

**Failure class.** Class 5, the 4B cart detour. It also covers a latent class: C2 points the 2B at "line 11", and a bare `e7` next to `11: ` invites the same `e11` misread.

**Predicted effect.** The following table gives the prediction per model and task:

| Model | Shipping | Cart | Search | Checkout | Paging |
| --- | --- | --- | --- | --- | --- |
| 2B | No change expected (hypothesis): the numbers and footer stay. The X1 loss came from removing numbers (`store-ablate-2-report.md:14`) | Supports C2's quote (hypothesis) | No change expected | No change expected | No change expected (same basis as shipping) |
| 4B | No change expected | First call `click e7` (hypothesis). Observed analogue: with the adjacent number gone, every first call became `click e7` (`store-ablate-2-report.md:5`, `:21`). The detour costs 2 turns (`store-m2diag-report.md:139`): 21.4 s against 13.4 s for checkout (`:70-72`) | Risk (next column) | No change expected | No change expected |

**Mechanism.** In `11: ### e7 link`, the number is the first token and labels the row. The 4B joins `e` and the label into `e11`, which is a real reference (Oak Bread Bin, `seeds/cart.txt:23`). The `ref=` label ties the token to the `ref` parameter the call must fill. It also moves the token away from the number. Playwright MCP prints the same label (`research.md:24`). `parseBrowserReference` already accepts `e7`, `[e7]`, `ref=e7`, and `[ref=e7]` (`browser/src/core/parsers.ts:711`), so a model that copies the label verbatim is still understood.

**Risk to passing tasks.**
- Removing the numbers cost the 4B 2 search draws (X1: 6 of 8, `store-ablate-2-report.md:21`), so any change to the line form might move that cell.
- Each reference adds about 6 characters, and the seed fills `BROWSER_TOOL_LIMIT` (`constants.ts:332`). The catalogue seed can therefore end one line earlier, and the footer would then name 46 or 45 instead of 47. The shipping fact stays on line 52, past the window, so its oracle holds.

**Rulings.** It keeps "numbered lines with references inline" (`campaign.md:9`). It amends the plan's choice of `N: ` with a bare `e7` (`plan.md:243`). That was the Orchestrator's ruling, not the user's.

**Rulings on the options:**
- **Number form and delimiter:** keep `N: `. The 2B's footer-following is recorded only with this form (A0 shipping 8 of 8 and paging 8 of 8, `store-ablate-2-report.md:13`). Changing the number and the reference together would confound the arms. `L11`, `11| `, and the `cat -n` arrow stay as fallback arm N1, run only if C3 fails.
- **Reference form and position:** labelled, after the name. Arm L2 (`ref=e7` at the start of the row) separates the effect of the label from the effect of the position.
- **Lines without a reference:** keep their numbers:
  - `from` and `to` address every line;
  - a footer can name a prose line;
  - the paging oracle reads the window's first row as `^N: ` (`ollama/tests/setupStore.ts:1457`).

### Q2. Search scope

**The change (C2).** The window rule stays as it is. The window opens one line before the first in-range match and never before `from` (`helpers.ts:724`). The in-range match row keeps its wording. One header line is added when the best-scoring line on the whole page carries a reference and is not among the printed rows. That line quotes the row, bounded like a note (`helpers.ts:754`).

The following excerpt shows the 2B's cart first call (`read {"from":47,"search":"Cedar Tea Tray","to":52}`) under C2 and C3:

```text
page "Harbor Goods — Catalogue" http://127.0.0.1:PORT/ (52 lines)
No line from 47 on matches "Cedar Tea Tray".
Line 11 matches: ### link "Cedar Tea Tray" [ref=e7] /product/p3
47: Our workshop opens to visitors on the first Saturday of each month. …
[lines 47–52 of 52; 46 above; end of page]
```

**Rulings on the options:**
- **A page-wide match row:** adopted only for an element line, as one quoted row. A page-wide list of numbers is refused. It adds a backward pull on continuation reads: the policy page's line 4 holds "policy" (`seeds/paging.txt:8`), and no task needs that list.
- **Wrapping to the first match:** refused.
  - The 2B attaches `search` to its continuation reads (`read {"from":35,"search":"policy token"}` and then `{"from":64,…}`, `store-m2diag-report.md:118`).
  - Wrapping would send them back to line 3. That breaks the footer chain and the paging oracle's first-row check (`setupStore.ts:1457-1467`).
- **The window's position:** stays at `from`, as described in the change.

**Failure class.** C-loop (2B cart), and the 4 of 8 checkout first calls that carry `search: "checkout"` (`store-measure-report.md:85-92`).

**Predicted effect.** The following table gives the prediction per model and task:

| Model | Shipping | Cart | Search | Checkout | Paging |
| --- | --- | --- | --- | --- | --- |
| 2B | Bytes unchanged: the best lines 51 and 52 are in the window | First read lists `[ref=e7]` on all 8 ports, because all 8 made this call (`store-measure-report.md:85-92`). The M1 judge counts a read that shows the tray link (`tmp/probes/store-helpers.ts:83-84`). Completion is a hypothesis | Bytes unchanged: no kettle line carries a reference | The 4 `search: "checkout"` reads list `[ref=e3]`, so the later `click e3` is in the latest result. Completion was already observed (`store-m2diag-report.md:136`) | Bytes unchanged: the best line 4 is a heading with no reference |
| 4B | No change: its first calls do not search | No change | No change | No change | No change |

**Risk to passing tasks.** A quote appears only when an element line is the page's best match outside the window. None of the passing first calls meets that condition (each cell of the table states why). The quote carries no instruction.

**Rulings.** It keeps "a search that returns line-numbered matches with context" (`campaign.md:12`) and "`from` and `to`, with a bounded default window".

### Q3. Truncation salience

**The change (C5).** When rows remain after the window, a second header line states the window state, before any content, for example `This read shows lines 1–34 of 80; lines 35–80 are not shown yet.` The first header line stays unchanged, so the harness's page comparison (`setupStore.ts:1458`) is unaffected.

The harness framing is tested as arm F1. It replaces "The browser shows this page:" (`setupStore.ts:880`) with "The browser's first read of the page:", which matches the system prompt's "The first message is a read of the page" (`setupStore.ts:134`).

**On placement and words:**
- **Header or footer:** both. The footer keeps the command, and the header carries the state.
- **Words:** "not shown" contradicts the 4B's own sentence directly: "I've reviewed the entire shipping policy page content" (`store-ablate-2-report.md:88`). "shows this page" asserts a whole page, and F1 removes that assertion.

**Failure class.** P-premature (4B paging).

**Predicted effect.**
- **4B paging:** a rise, as a hypothesis. No record tested the header or the framing: X1 to X6 covered numbers, the footer, the prompt, and the parameter name (`store-ablate-2-report.md:28`), and A1 to A4 ran on the 2B only (`store-ablate-report.md:18`). One record has the 4B continuing a paging seed: on browser 0.0.26's format it called `read`/`look` with `offset` 3770 (`model4b-last.md:31-33`). That format had no line count in the header, so it is weak and confounded support.
- **2B shipping and paging:** no change, or a rise.
- **2B action tasks:** a stronger pull toward line 47 is possible (§ Tensions).

**Risk.** The 2B's action-task first calls, and one more line lost from each seed.

**Rulings.** It keeps "a footer naming the next line" and every oracle.

### Q4. The footer's pull

**The change.** The footer keeps its bytes. C1 and C2 turn the pull into a one-turn detour instead of a dead end.

**Why the footer cannot move:**
- Without it, shipping fell to 0 of 8 on both models (X2, `store-ablate-2-report.md:15`, `:22`).
- The declarative footer (A1) cost the 2B 2 shipping draws and 3 paging draws (`store-ablate-report.md:8`).
- Putting the task last (A4) took the 2B's paging to 0 of 8 (`store-ablate-report.md:11`).

**Failure classes.** C-loop and O-reference, through C2 and C1.

**Predicted effect.**
- **2B:** its first calls stay `read from 47` (observed in every A0 row).
- **2B cart:** the read lists `[ref=e7]` (C2). Completing the task is a hypothesis.
- **2B checkout:** passes under C1 without any model change, as the re-judged transcripts predict (Q6).
- **2B search:** this mechanism does not cover it, which is why Q5 has its own change.
- **Shipping and paging, both models:** no byte changes.

**Rulings.** All kept.

### Q5. 2B search

The comparison between browser 0.0.26's seed (`store-campaign/attempt-3/S0/run-1/transcripts/search-1.json:4-5`, `absorb.md:13-19`) and the seed this campaign measured (`seeds/search.txt`, `seeds/system.txt`) shows these differences:

| Aspect | 0.0.26 | b6dda22 |
| --- | --- | --- |
| Rows | Unnumbered. `# Cedar Tea Tray` and `e7 link "Cedar Tea Tray"` on separate rows, with no address | `N: ` rows; heading folded into `### e7 link … /product/p3` |
| Footer | `[characters 0–3994 of 4457; call look with offset 3994 for more]`: it names `look`, not the fact tool | `call read with from 47 for more`: it names the tool that also owns `search` |
| Header | `page "TITLE" URL` | Adds `(52 lines)` |
| Type sentence | "To use the site's search box, call type with its reference, the words, and submit true." | "To enter text or search, call type with the reference, text, and submit true." |
| Fact tool copy | `read`: "Call it to learn a fact; …" | `read`: "Call it to learn a fact or to find an element." (`constants.ts:454`) |

**What made `type e4` the 0.0.26 first call.** No single feature can be identified. On that format the 2B typed into `e4` on 16 of 16 draws in arms A3 and A3−capture. Arm A2, which differed only in the description of the unrelated `edit` tool, flipped it to `look {"search":"kettle","offset":0}` (`toolset-probe-last.md:7-14`, `:30-33`). That arm was the bytes of browser 0.0.23.

Two parts of 0.0.26 supported the path:
- **The sentence anchor:** "the site's search box" matches the row `searchbox "Search products"`.
- **The recovery path:** a `look` search returned the whole outline with `e4` in it, so the archived run recovered through `click e4` and `type e4` (`search-1.json:21-63`, `:138-140`).

**What replaced it.** `read` owns the footer, the `search` parameter, and "to find an element". The 2B's first call was `read` in every variant except X5, where it answered without a call (`store-ablate-2-report.md:13-19`, `:73-80`). The type sentence, the `read` description, and the `type` description were never ablated.

**The change (C4).** In `STORE_SYSTEM_PROMPT` (`setupStore.ts:137`), replace the type sentence with "To fill a field or use the site's search box, call type with its reference, the text, and submit true." The prompt grows to 102 words, inside the 120-word test (`plan.md:167`).

Fallback arms:
- **P2:** C4, plus removing "or to find an element" from the `read` description.
- **S1:** a read search whose best lines carry no element appends the page's `searchbox` row. This restores the 0.0.26 recovery path. It is a completion-stage arm because it changes a reply, not the first call.

**Failure class.** S-answer.

**Predicted effect.**
- **2B search:** a rise, as a hypothesis. The fragility record means it might not move.
- **4B search:** no change; its first call already types into `e4` (`store-m2diag-report.md:125`).
- **2B checkout:** keeps "fill a field", so its `type e16` path stays covered.

**Risk.** Any byte change can flip a 2B first call (the A2 record), so C4 runs on all five tasks.

**Rulings.** No answer is in the copy. The sentence names a general procedure that the 0.0.26 prompt carried. Whether it counts as task copy is listed under § Tensions.

### Q6. Reference tracking

**Finding.** The predicate pins a stricter claim than the tool makes:
- It replaces the set on every result that starts with `page "`, so an empty tail window clears it (`setupStore.ts:1155-1156`).
- The tool keeps references on an unchanged page (`plan.md:112`), and it accepted `e3` (`store-m2diag-report.md:136`).
- The claim the oracle names, "never invents a reference", is broader than "only from the latest result".

**The change (C1).**
- **Accumulate:** a `read` whose first header line equals the previous one, and which carries no change note, adds its listed references to the set.
- **Replace:** any other successful result replaces the set with its own listing. That covers every action receipt, a changed header, and the change note.
- **Refusals:** a refused call changes nothing. A call refused as "not in the current view" counts as unlisted regardless of the set.
- **Pattern:** under C3, `extractReferences` (`setupStore.ts:1128-1132`) matches `\[ref=(e[1-9]\d*)\]` anywhere in a result. The quoted line from C2 therefore counts as a listing.

**Does it weaken the oracle?** No. A reference that no result of the current page state listed is still refused, and so is a stale reference the toolset refused. The only calls this accepts are references that a result of the same unchanged page listed and the toolset honoured. Resetting on every receipt is the conservative choice.

**Failure class.** O-reference.

**Predicted effect.** 2B checkout goes from 0 to 8 by re-judging the archived transcripts. All 8 placed exactly one order and reported `HG-48213` (`store-m2diag-report.md:136`). No other cell is expected to change. The re-judge confirms both.

**Rulings.** It keeps "never weaken an oracle's claim". The predicate's doc comment changes from "latest view" to "results since the page last changed" (§ Tensions).

### Q7. Validation before implementation

Every change can be tested on transformed bytes. None needs package code before the validation runs. The following table names the transform for each change:

| Change | Transform |
| --- | --- |
| C1 | Predicate only. Re-judge the M2diag transcripts; no model runs |
| C3 (L1, L2) | Rewrite references in the seed and in every tool result. The form adds characters, so the probe must re-fit the window under `BROWSER_TOOL_LIMIT` and rebuild the footer with the exported `renderBrowserFooter` (`helpers.ts:683`). A bare regex is not faithful |
| C2 (R1) | Compose from real pure reads: the model's read; `read {from:1, search}` for the page's best lines; `read {from:N, to:N}` for the quoted row. Insert the quote and re-fit the window |
| C5 (H1), F1, C4 (P1, P2) | Insert the sentence and re-fit the window; replace strings in the user turn, the system prompt, and the definitions |

The package code is needed only afterwards, to confirm that it reproduces the validated bytes (acceptance criteria for U2 and O1).

## Ranked change set

The following table ranks the changes by evidence strength and coverage:

| Rank | Change | Owner | Evidence |
| --- | --- | --- | --- |
| 1 | C1 reference set per page state | ollama harness | Observed through re-judging |
| 2 | C2 element match quote | browser | The call is observed; completion is a hypothesis |
| 3 | C3 `[ref=eN]` after the name | browser and harness pattern | X1 analogue observed; this form is a hypothesis |
| 4 | C4 search-box sentence | ollama harness | Hypothesis, with a fragility record |
| 5 | C5 window sentence (with F1 if it earns its place) | browser and harness | Hypothesis |

## Validation matrix

The instrument follows `tmp/probes/store-ablate.test.ts`: 5 tasks × 8 ports, first read executed, identities before and after. Measured cost per arm is about 148 s on the 2B and about 413 s on the 4B (`store-ablate-report.md:7`, `:13`). Completion stages follow M2diag: 288 s on the 2B and 572 s on the 4B (`store-m2diag-report.md:15-16`).

The stages run in this order:

| Stage | Arms | Models | Decision |
| --- | --- | --- | --- |
| 0 | C1 re-judge of M2diag logs, with the old and new predicates side by side | none | 2B checkout reaches 8 of 8 and no other cell moves → adopt C1 |
| 1 | C0 control, L1 (`[ref=eN]` after the name), L2 (`ref=eN` in place) | 2B, 4B | Pick the arm where 4B cart first calls hit `e7` and no 8 of 8 cell falls below 7 of 8 (the M2 gate, `plan.md:199`). If neither qualifies, run N1 (`11| `) |
| 2 | On the chosen L: R1, P1, P2, H1, F1 (H1 with the framing) | 2B, 4B | Keep an arm when its target cell rises and no 8 of 8 cell falls below 7 of 8. R1 adds a "reveal" column: the first result lists the target reference |
| 3 | ALL (L + R1 + chosen P + chosen H1/F1) | 2B, 4B | First replies, then 8 single attempts per task per model, with every tool result transformed and judged by C1. Every task at 7 or 8 of 8 on both models → implement. Otherwise run the fallbacks S1, F3 (the seed given as a read call and its result), and W ("matches" changed to "has") |

## Units

Each unit has one owner and a defined acceptance:

| Unit | Role and engine | Owns | After | Acceptance |
| --- | --- | --- | --- | --- |
| V1 re-judge | Instrument, Astra | ollama `tmp/codex/store-campaign5/redesign/rejudge.ts` and its output | none | Prints old and new pass counts per model and task over `M2diag/<2b,4b>/logs/<task>-N.json`; changes no source |
| V0 probe | Instrument, Astra | ollama `tmp/probes/store-redesign.test.ts`; in `tmp/probes/store-helpers.ts`, only the row lookup (`:71-77`), changed to find a row by parsed reference in either form | none | The judge reproduces the archived M1 counts (`store-measure-report.md:73-79`). Every input is recorded the way `store-ablate.test.ts:87` records them. Every transformed seed is ≤ 4,000 characters and its footer equals `renderBrowserFooter` output. Identities match |
| G gate | Orchestrator | none | V0, V1 | Rules on each arm by the matrix |
| U1 copy | Contract, Opus (the Orchestrator runs its commands) | browser `src/core/constants.ts`: the window-sentence and quote constants, and the `read` description if P2 is adopted | G | Copy tests within the 100-character bound; measured totals; `npm run check` |
| U2 projection | Implementation, Astra | browser `src/core/helpers.ts` (`renderBrowserSpans` `:457-512`, `renderBrowserOutlineRow` `:225-240`, `renderBrowserElement` `:1048-1050`, `renderBrowserSearch` `:707-727`, `renderBrowserPassage` `:735-759`), every journey renderer that prints a reference, and their tests in `tests/src/core/` and `tests/service/toolset.test.ts` | U1 | Cases for the C3 row form; C2 quote cases (an element line outside the window gives one line; a best line with no reference gives none; a best line inside the window gives none; the quote is bounded); the C5 sentence only when rows follow; whole result ≤ `BROWSER_TOOL_LIMIT`; `test:src:core`, the browser-placement project, `check` |
| U3 guide | Docs, Opus | browser `guides/browser.md` passages on the row form, the search reply, and the header; the TSDoc examples of changed exports (`helpers.ts:222`) | U2 | `npm run test:guides`; prose re-read against what shipped |
| O1 harness | Implementation, Astra | ollama `tests/setupStore.ts` (`STORE_SYSTEM_PROMPT`; `buildStorePrompt` if F1 is adopted; `extractReferences`; `findUnlistedReferences`), `tests/setupStore.test.ts`, `tests/service/browser.test.ts` | U2 pack | Each refused: an invented reference, a reference listed before a page change, and a "not in the current view" refusal. Accepted: an earlier reference on the same page. The real store's seed and cart-miss read equal V0's recorded bytes, port-masked. The paging oracle's existing cases pass unchanged. The prompt stays ≤ 120 words. `test:setup`, `check` |

After these units, the plan's F, V, M, and P steps follow (`plan.md:230-233`).

## Alternatives

A constraint favours each of these, and the design takes a different path:
- **Wrapping the search window** serves "find a visible element". It loses because it moves continuation reads backward (Q2).
- **A page-wide number list** matches the ruling's "line-numbered matches" literally. It loses because it pulls backward with no gain for any task. The quoted element row is still line-numbered.
- **Grep-style match rows with context** follow the campaign wording. The plan rejected them (`plan.md:247`). C2 is their bounded subset.
- **Another number form** follows Claude Code's `cat -n`. It loses because it confounds the only form the 2B is recorded following. It stays as arm N1.
- **The seed given as a read call and its result** follows the 4B's habit of following tool-result footers on shipping. It loses because it changes every task's first turn. It stays as arm F3.
- **A search-box row in read search replies (S1)** restores the 0.0.26 recovery path. It loses first place because it sits at the edge of mechanism and policy (§ Tensions). It stays as a completion fallback.

## Constraints

These records and code locations bind the design:
- `BROWSER_TOOL_LIMIT` is 4,000 (`browser/src/core/constants.ts:332`), and the whole result fits it (`plan.md:83`).
- The window opens at `max(from, first − 1)` (`helpers.ts:724`).
- The footer form is fixed (`helpers.ts:697`), and the harness parses it (`setupStore.ts:1427`).
- The paging oracle needs the first row to equal `from` and parses the header line (`setupStore.ts:1442-1473`).
- The reference listing pattern (`setupStore.ts:1129`) and the replacement rule (`setupStore.ts:1155-1156`).
- The shared oracles (`setupStore.ts:1337-1350`).
- The policy fixture's final section lies past both windows (`setupStore.ts:408`).
- The `read` and search copy (`constants.ts:454`, `:469`), and the prompt (`setupStore.ts:133-140`).
- The judge's form dependencies (`tmp/probes/store-helpers.ts:72-104`).

## Refusals

A binding rule forecloses each of these options:
- **Raising the seed window so the catalogue fits whole.** Refused by "no raised budget" (`campaign.md:29`) and "the shipping fact stays on line 52, past the first window" (`redesign/design-brief.md:61`).
- **Dropping the line numbers (X1).** It leaves "numbered lines with references inline" (`campaign.md:9`).
- **Removing the footer (X2).** It leaves "a footer naming the next line" (`campaign.md:11`).
- **A mode string that switches `read` between page-wide and range search.** "Never hide a different behavior behind a mode string" (`design-brief.md:22`).
- **Copy that points at the tray or the token.** "no copy that answers a task" (`campaign.md:31`).
- **More turns to absorb the 4B detour.** "no raised budget, attempt count, iteration limit" (`campaign.md:29`).

## Measurements

These readings were supplied:
- **M1:** first calls (`store-measure-report.md:73-94`).
- **Ablations:** A0 to A4 (`store-ablate-report.md:5-14`) and X1 to X6 (`store-ablate-2-report.md:11-27`).
- **M2diag:** pass counts, sequences, and classes (`store-m2diag-report.md:6-137`).
- **The 0.0.26 arms** (`toolset-probe-last.md:20-41`).
- **The 4B on 0.0.26** (`model4b-last.md:31-33`).

These readings are missing:
- A1 to A4 on the 4B.
- Any header or framing variant on either model.
- Any labelled-reference form.
- Any completion run under a non-default variant; every ablation scored first calls only.
- The 2B's turns after a reply that quotes an element.

## Tensions

These judgment calls are left for the objective lane or the Orchestrator:
1. **C5 against the footer's pull.** C5 might strengthen the 2B's pull toward line 47 on the action tasks. The Stage 2 arm decides.
2. **C4's sentence.** "the site's search box" is either procedure (0.0.26 carried it) or task-shaped copy. The user might rule on it.
3. **C1's wording.** C1 changes the shared oracle's stated wording from "latest view" to "results since the page last changed". This lane argues that the claim is unchanged. The objective lane rules.
4. **C2's element-only scope.** The quote is restricted to element lines. A quote of a text line might help fact tasks but adds risk on paging.
5. **C3 against the plan.** C3 amends the plan's `N: ` with `e7` ruling (`plan.md:243`).
6. **The M1 checkout judge.** Under C2, the 2B's checkout first call stays a read that lists `[ref=e3]`. The judge counts only a click (`store-helpers.ts:95`), so the plan's M1 stop rule (`plan.md:198`) would stop again. Either align the judge with cart's reveal rule (`store-helpers.ts:83-84`) before any run, or accept the stop.
7. **S1's boundary.** S1 names a `searchbox` role in a generic tool's reply. It sits between mechanism and product policy.

## Risks

- **2B first calls are sensitive to unrelated bytes.** One unrelated description flipped the search task (`toolset-probe-last.md:30-33`), so every arm runs on all five tasks on both models.
- **The probe must re-fit the window.** A transform that adds characters without re-fitting would test bytes that the package never sends.
- **Page text can spoof a reference.** Text can print `[ref=eN]`. The toolset still refuses unknown references, so the harm is limited to the harness's count, the same exposure as the row-start pattern it replaces.
- **The judge and harness patterns must change together.** Four patterns parse the line form (`setupStore.ts:1129`, `:1427`, `:1457`; `store-helpers.ts:72-104`). Each must change with the form, and none may lose a condition.
