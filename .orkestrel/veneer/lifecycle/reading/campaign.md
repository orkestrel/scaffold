# Campaign: one line-addressed read for small models (opened 2026-10-06)

The user ruled this campaign on 2026-10-06. It follows the store implementation investigation (`lifecycle/store-design/`). Size: large, so it follows `.agents/orchestration.md` § Campaign. The hand-off record is `lifecycle/holders/status.md`.

## The user's rulings

- **Target model:** a model as small as `qwen3.5:2b-q4_K_M` must complete the store tasks. If a small model can, a larger one can.
- **Reading surface:** fold `look`, `read`, and `plain` into one line-addressed reading tool, in the manner of a coding harness's file read:
  - numbered lines, with element references inline;
  - `from` and `to` ranges, with a bounded default window;
  - a footer naming the next line;
  - a search that returns line-numbered matches with context.
- **Fewer, more capable tools** (the user's principle, 2026-10-06):
  - each tool covers one distinct intent, and the steps that serve that intent happen inside one call;
  - options are preferred over extra tools, and kept few and clear;
  - the curation covers the whole page vocabulary, and is proposed for the journey tools.
- **Improve the API** (the user, 2026-10-06, during the browser fix round):
  - Improve `@orkestrel/browser`'s public API using what the ecosystem's other packages do well.
  - The user named `agent`, `database`, `relation`, `table`, `workspace`, `workflow`, and `form` (scaffold `guides/`) as examples of what they look for, and invited reading further guides.
  - The API design goes to the user for approval before implementation.
- **Also in this round:**
  - journey results stay within `BROWSER_TOOL_LIMIT`;
  - search reaches page text;
  - the agent passes string tool results unchanged;
  - the double-order trio: checkout pins one order, a handled submission settles before its receipt, and the journey case stops depending on a second submission.
- **Confirmation:** 16 clean store-task runs on the 2B, plus 2 runs on the 4B.
- **Tests:** tune them for time. Each case pins a needed claim at the least cost.
- **The line-view redesign** (the user, 2026-10-07; `redesign/plan.md`):
  - The user approved the change set:
    - in browser, `[ref=eN]` after the name, the partial-view line, the best-match line on a range miss, the change note from line 1, and the `type` description;
    - in the harness, the framing, the type sentence, rule R, the parsers, and M1 as a diagnostic with M2 the gate.
  - **Rule R is adopted.** A reference counts as shown when any read of the same unchanged page listed it. An invented, stale, or refused reference still fails.
  - **The system prompt's search-box sentence is allowed** as procedure, not task copy.
- **Binding rulings from 2026-10-04:**
  - no raised budget, attempt count, iteration limit, predict, or temperature;
  - never weaken an oracle's claim;
  - no copy that answers a task;
  - rank 4 stays refused;
  - `capture` stays a feature;
  - the 100-character parameter-description bound stands.

## Exit criterion

The campaign ends when all of the following hold.

1. **Browser:**
   - The page vocabulary is curated under the user's principle, in the page toolset and in the browse MCP server. One line-addressed reading tool replaces `look`, `read`, and `plain`, and each action completes its flow.
   - Its search returns line-numbered matches that reach page text.
   - Every journey result fits `BROWSER_TOOL_LIMIT`.
   - A handled submission settles before its receipt.
   - The public API follows the API design the user approved, drawn from the ecosystem's patterns.
   - Guide parity holds, and the tree-wide gates pass.
2. **Agent:** a string tool result reaches the model unchanged, and every live tool test that reads tool content passes.
3. **Ollama's harness:**
   - Page tasks advertise only the page tools.
   - Every case pins its claim against the new surface, and no oracle loses a condition: shipping pins a fact past the first window, paging pins a continuation at the line a footer names, and checkout pins exactly one order.
   - The journey case passes without a second submission.
   - The unread meter is gone, and each case's retry predicate equals its assertion.
4. **Measurement,** on `qwen3.5:2b-q4_K_M` with Ollama 0.35.1, temperature 0, and unchanged budgets:
   - 16 store-task runs, each passing all five page tasks;
   - 2 runs on `qwen3.5:4b-q4_K_M` passing all five;
   - the journey case passing;
   - each case's duration reported against the budget the design sets.
5. **Releases:** browser 0.0.27 and agent 0.0.27 are published, followed by ollama re-pinned and released. Each publish needs the user's one-time code.

## Phases

1. **Absorb:**
   - map: scaffold `tmp/units/reading-map.txt`;
   - one Grok lane on the reading internals and the prior reading design (`showcase/browse/reading-design/`);
   - one research lane on line-addressed reading in agent harnesses;
   - the earlier small-model research (`store-design/map-research.md`).
2. **Design:** one adversarial round, an Opus `planner` and an Astra `analyst` on one brief, blind to each other. Then reconcile into one plan with units.
3. **Implement, integrate, and audit:** the audit is one `orkestrel-falsify` round.
4. **Verify, re-baseline, and accept.**

## Consumers

- `@orkestrel/browser` toolset code is consumed only by ollama's harness (`tests/setupStore.ts`, `tests/setupStore.test.ts`, `tests/service/browser.test.ts`). Read 2026-10-06 with Grep over every sibling checkout, excluding `node_modules`, `dist`, and `tmp`.
- database, workflow, indexeddb, veneer, ollama, and scaffold each carry `guides/browser.md` as a vendored mirror, refreshed at each one's visit.
