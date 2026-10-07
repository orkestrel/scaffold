# Design brief: a line view that the 2B and the 4B act on (2026-10-07)

## Where this sits

- **The campaign:** `lifecycle/reading/campaign.md`. Its § The user's rulings binds every proposal. The plan it amends is `lifecycle/reading/plan.md`.
- **The implementation:** browser `main` `b6dda22`, not yet released. It folds `look`, `read`, and `plain` into one line-addressed `read`.
- **The measurement stopped at M1.** Three diagnostics followed. This brief asks for the smallest change set that lets `qwen3.5:2b-q4_K_M` complete all five store tasks, without losing what the 4B and the 2B already do.

## Evidence

Every path is in the ollama checkout, `C:/Users/mikes/WebstormProjects/ollama`, unless it names another checkout.

| Record | What it holds |
| --- | --- |
| `tmp/codex/store-measure-report.md` | Gates V passed. M1, the first calls, 5 tasks × 8 ports |
| `tmp/codex/store-ablate-report.md` | Copy variants A0 to A4 on the 2B, and A0 on the 4B |
| `tmp/codex/store-ablate-2-report.md` | Single factors X1 to X6 on both models, with reply text |
| `tmp/codex/store-m2diag-report.md` | Single attempts to completion, 8 per task on both models, with call sequences and failure classes |
| `tmp/codex/store-campaign5/M1/seeds/` | The first user turn of each task, the system prompt, and the tool definitions |
| `tmp/codex/store-campaign5/M2diag/<2b,4b>/logs/` | Every attempt's transcript |
| `tmp/codex/toolset-probe-last.md` | First calls on browser 0.0.26's format, before the redesign |
| browser `src/core/helpers.ts`, `src/core/BrowserToolset.ts`, `src/core/constants.ts` | The line projection, the `read` handler, and the tool copy |
| ollama `tests/setupStore.ts` | The system prompt, the seed, the predicates, and the reference tracking |

Passes on single attempts (M2diag), out of 8:

| Model | Shipping | Cart | Search | Checkout | Paging |
| --- | --- | --- | --- | --- | --- |
| 2B | 8 | 0 | 0 | 0 | 8 |
| 4B | 8 | 8 | 8 | 8 | 0 |

The failure classes, from the transcripts:

1. **2B cart, C-loop.** The first call is `read {"from":47,"search":"Cedar Tea Tray","to":52}`. The tray link `e7` is on line 11, and the search covers only lines at or after `from`, so it finds nothing. The model then types into buttons, submits empty searches, and spends its 8 turns.
2. **2B search, S-answer.** The first call is `read` from line 47, or with `search: "kettle"`. The model then answers from the review prose, which mentions kettles, and never uses the search box `e4`. On browser 0.0.26's format, the 2B's first call on this task was `type {"ref":"e4","text":"kettle","submit":true}`, 16 of 16 (`toolset-probe-last.md`, arm A3).
3. **2B checkout, O-reference.** The model reads lines 47 to 52, which list no references, then clicks `e3` and submits the order through `e16`. The store records exactly one order, and the answer carries the right code. The predicate fails the attempt because `e3` was not in the latest result: the harness replaces the exposed reference set on every result that lists references, and an empty listing counts. `e3` was still valid on the unchanged page, and the click succeeded.
4. **4B paging, P-premature.** The model makes no call. It answers that it "reviewed the entire shipping policy page" and that no token exists. The view ends at line 34 of 80, with the footer `[lines 1–34 of 80; 46 below; call read with from 35 for more]`, and the header says `(80 lines)`. No variant moved this (A0 to A4, X1 to X6).
5. **4B cart, a detour that passes.** The first call is `click e11`. The tray's reference is `e7`, printed on line 11 as `11: ### e7 link "Cedar Tea Tray" /product/p3`. Removing the `N: ` prefixes (X1) changed every first call to `click e7`.

What the factors showed:

- **The footer is necessary.** Without it (X2), shipping falls to 0 of 8 on both models; they answer "not mentioned" or invent a time.
- **The 2B needs the line numbers to follow the footer.** Without them (X1), its shipping falls to 1 of 8.
- **The footer's command pulls the 2B's first call** to `from` 47 on every task that opens on the catalogue.
- **No copy change alone moves 2B search:** not the declarative footer, the task order, the system prompt's read sentences, or `search` renamed `find`.

## Bindings

- **The user's rulings in `campaign.md`:**
  - numbered lines with references inline;
  - `from` and `to`, with a bounded default window;
  - a footer naming the next line;
  - a search that returns line-numbered matches;
  - fewer, more capable tools;
  - no raised budget, attempt count, iteration limit, predict, or temperature;
  - never weaken an oracle's claim;
  - no copy that answers a task;
  - the 100-character parameter-description bound.
- **Leaving a ruling:** a proposal that leaves one of these rulings (for example, dropping line numbers) must name the ruling, and it goes to the user. Prefer a form that keeps the ruling.
- **Oracles:** the shipping fact stays on line 52, past the first window, and the paging token on line 80. Every predicate keeps its claim.

## Questions

Answer each one. Rule on every option you list.

1. **Numbers and references.** What form of numbered line stops the 4B taking the line number for the reference, and keeps the 2B following the footer? Consider:
   - the number's form and delimiter;
   - the reference's form and position on the line;
   - whether lines without a reference need a number.
2. **Search scope.** What must a search with `from` past every match return, so that a model searching for a visible element finds it? Rule on:
   - a page-wide match row;
   - wrapping to the first match;
   - and the window's position.
3. **Truncation salience.** What makes a 4B treat a first window as partial? Consider:
   - where the window state appears (the header, the footer, or both);
   - its words;
   - the harness's framing "The browser shows this page:".
4. **The footer's pull.** How can the footer keep shipping and paging, which need it, while the 2B acts on visible elements on the action tasks?
5. **2B search.** What in browser 0.0.26's format made `type e4` the 2B's first call, and what in the line view replaced it? Compare the 0.0.26 seed (`toolset-probe-last.md` and `lifecycle/reading/absorb.md` § 1) with today's seed. Name the change that restores it.
6. **Reference tracking.** Does replacing the exposed set on every result, with an empty window counting as a listing, pin the claim "the model never invents a reference"? Or does it pin a stricter claim that the tool does not make? Rule on accumulating the set across reads of one unchanged page and resetting it on a page change, and state whether that weakens the oracle.
7. **Validation before implementation.** For each change, can a probe transform of the bytes the model receives test it, the way `tmp/probes/store-ablate.test.ts` does? Or does it need the package's code? Name the matrix to run.

## Output

For each question, write:
- the change;
- the failure class it targets;
- the predicted effect per model and task, with the mechanism and the evidence row behind it;
- the risk to each task that passes today;
- whether it keeps every ruling.

Then write:
- one ranked change set;
- its validation matrix;
- its implementation units, each with the files it owns and its acceptance.

Cite file and line for every claim about code or a record. Edit nothing.
