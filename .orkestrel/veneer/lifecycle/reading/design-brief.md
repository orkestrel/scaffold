# Design brief: one line-addressed read, and the round's other changes

One brief goes to two blind lanes in clean contexts:
- an Opus `planner` (subjective lane: API shape, naming, copy, guide voice);
- an Astra `analyst` (objective lane: correctness, constraints, feasibility, measurement).

Each lane works read-only and returns one proposal document as its final message. Edit nothing.

## Objective

Design the changes that let `qwen3.5:2b-q4_K_M` complete ollama's five live store page tasks robustly and quickly. The center is one line-addressed reading tool that replaces `look`, `read`, and `plain` in `@orkestrel/browser`. The exit criterion is in `campaign.md`, beside this brief.

## The user's design principle (2026-10-06)

Apply this principle to the whole page toolset, not only to reading.

- **Fewer tools, each more capable.** Each tool covers one distinct intent, one train of thought about what the action is for. A small model commits to the path it is on and does not reconsider which tool would have served better, so every extra tool is a chance to choose wrong.
- **Each tool completes its own flow.** Steps that belong to one intent happen inside one call, not across several calls the model must chain. For example:
  - an action settles the page and returns what the model needs next, so no separate `wait` or `look` call follows;
  - a read covers range, search, and continuation in one tool.
- **Options over tools, with options kept few and clear:** single-word parameters, sensible defaults, and descriptions of at most 100 characters.
- **Curation decides the set:** two intents stay two tools. Never hide a different behavior behind a mode string; `.claude/rules/names.md` § Split behavioral variants refuses a value that selects a different action. Steps that serve one intent belong together.

Under this principle, decide:
- the full page vocabulary: `look`, `read`, `plain`, `click`, `type`, `press`, `navigate`, `wait`, `dialog`, `tabs`, and `switch`;
- which tools merge, which stay, and which steps each absorbs.

Also propose the same curation for the journey tools (`record`, `save`, `journeys`, `edit`, `replay`, `forget`, and `capture`), and mark what lands in this round and what waits.

## Inputs

All paths are absolute or relative to C:/Users/mikes/WebstormProjects/scaffold.

- **This campaign:**
  - `.orkestrel/veneer/lifecycle/reading/campaign.md`: the user's rulings and the exit criterion;
  - `.orkestrel/veneer/lifecycle/reading/research.md`: line-addressed reading in agent harnesses;
  - `.orkestrel/veneer/lifecycle/reading/absorb.md`: the Grok distillate of the reading internals and the prior reading design (journal `tmp/cursor/reading-absorb.jsonl`, session `e78524be-5fed-487d-88b6-090fa7b5a85b`).
- **The earlier investigation,** under `.orkestrel/veneer/lifecycle/store-design/`:
  - `synthesize.md` and its review `review.md`, which are binding where they record a fact;
  - `design-surface.md`, `design-harness.md`, `design-economics.md`, and `map-research.md`.
- **Measurements,** under C:/Users/mikes/WebstormProjects/ollama/tmp/codex/:
  - `toolset-probe-last.md`;
  - `model4b-last.md`;
  - `store-campaign4-last.md`;
  - the transcripts under `store-campaign/attempt-3/S0/run-*/transcripts/` and `store-campaign/model-4b-2/S0/run-1/transcripts/`.
- **Browser source,** in C:/Users/mikes/WebstormProjects/browser at `0379087` (0.0.26):
  - `src/core/BrowserToolset.ts`, `src/core/BrowserJourneyToolset.ts`, `src/core/helpers.ts`, `src/core/constants.ts`, `src/core/types.ts`, `src/core/factories.ts`;
  - `src/server/BrowserMCPServer.ts`;
  - `guides/browser.md`;
  - `tests/src/core/BrowserToolset.test.ts`.
- **The agent:** C:/Users/mikes/WebstormProjects/agent/src/core/Agent.ts (tool message encoding near `:557-562`).
- **Ollama's harness:** C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts, `tests/setupStore.test.ts`, `tests/service/browser.test.ts`, and `tests/setupService.ts`.
- **Law:** the scaffold `AGENTS.md`, plus `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, and `documentation.md`. Each fleet checkout carries its own copies.

## Decide

1. **The toolset under the principle:**
   - every page tool that remains, each with one intent, a one-word name, its parameters (each name one word, each description at most 100 characters), and its description;
   - what each tool absorbs (settling, the returned view, continuation);
   - the cost of each merge you reject.
2. **The line projection:**
   - what one line is;
   - how element references appear inline;
   - how headings, lists, tables, links, images, and form controls render;
   - how a line longer than the window or the limit is split and still addressed;
   - the header, with the page title, the address, and the total lines;
   - the footer, naming the next line and the lines hidden above and below.
3. **Ranges:** `from` and `to` semantics, the end sentinel, and the default window, both as a line count and within `BROWSER_TOOL_LIMIT`. Neither the limit nor any budget may change.
4. **Search:**
   - matching rules (words, substrings, case, stemming);
   - context lines;
   - the cap and the over-cap answer;
   - whether search and a range combine;
   - what a match row prints, so the model can jump to it.
5. **Stability:**
   - line numbers while the page is unchanged;
   - what a read after a page change returns;
   - how staleness is reported.
6. **Action receipts:** what `click`, `type`, `press`, `navigate`, `wait`, `dialog`, `tabs`, and `switch` return under the new projection. Also the handled-submission receipt, which must settle before it answers so a model does not submit twice. Choose between a receipt that waits for the page's first change and a `wait` that accepts no text, and bound the wait inside the existing deadlines.
7. **The cases the old tools covered:** `plain` (words to pass to `wait` or `type`), Markdown link addresses, and image text. Fold each into the one tool, or rule it out with the reason.
8. **The journey toolset:**
   - `record` and `replay` views under the new projection;
   - every journey result fits `BROWSER_TOOL_LIMIT` with exact continuation lines;
   - the guide's journey passages.
9. **The browse MCP server:** what changes in its exposed tools and its tests.
10. **The agent:** a string tool result reaches the model unchanged. Name every consumer in the fleet that parses tool-message content.
11. **Ollama's harness:**
    - page tasks advertise only the page tools;
    - each case's claim re-specified against the new surface without losing an oracle condition: shipping pins a fact past the first window, paging pins a continuation at the line a footer names, checkout pins exactly one order, and cart and search keep theirs;
    - the journey case redesigned so it needs no second submission;
    - the unread meter removed;
    - each retry predicate equal to its assertion;
    - the store fixtures where a claimed mechanism can be bypassed.
12. **Measurement to the exit criterion:**
    - instruments, ordered cheapest first: first-reply probes across loopback ports, then single attempts, then the 16-run series, the 2 runs on the 4B, and the journey case;
    - a decision rule for every count;
    - guards with the smallest fall each can detect, stated before the run;
    - per-case time budgets derived from measured turn latency.
13. **Units:**
    - owned files, dependencies, parallel and serial order, acceptance criteria, and review;
    - routing: Astra for any unit that must run commands (native Opus subagents have no shell on this host), and Opus for API shape and guide voice, with the Orchestrator running its commands;
    - the release order: browser 0.0.27 and agent 0.0.27, then the ollama re-pin.

## Constraints

- **The user's rulings:** those in `campaign.md`.
- **AGENTS.md laws:**
  - types first;
  - single-word entity APIs;
  - no compatibility shims: update every consumer in the same change;
  - no mocks or fakes of project-owned behavior;
  - minimal public API;
  - mechanism, not product policy.
- **Copy:** the 100-character parameter-description bound and the browser copy tests.
- **`capture`** stays a journey tool.

## Output

One Markdown proposal with these sections:

1. **The surface:** the exact tool definitions with their copy.
2. **The projection specification:** with rendered examples of the store's catalogue page, its shipping policy page past the first window, and a search on each.
3. **The contract types:** the `types.ts` changes.
4. **The other changes:** items 6 to 11.
5. **The measurement plan.**
6. **The units.**
7. **Risks.**
8. **Points that need the user's ruling.**

Cite file:line for every claim about existing code. State the cost of each choice you reject.
