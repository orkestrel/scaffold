# Design brief: browser's public API, brought to the ecosystem's patterns

One brief goes to two blind lanes in clean contexts:
- an Opus `planner` (subjective: API shape, naming, ergonomics, guide voice);
- an Astra `analyst` (objective: correctness, consumer impact, migration, constraints).

Each lane works read-only and returns one proposal document as its final message. Edit nothing.

## Objective

The user (2026-10-06): improve `@orkestrel/browser`'s public API, drawing on what the ecosystem's packages do well. The user named `agent`, `database`, `relation`, `table`, `workspace`, `workflow`, and `form` (scaffold `guides/`) as examples of what they look for, and invited further reading.

Propose the improved API: what changes, what stays, and why. The proposal must be ready for the user to approve before any implementation.

## Inputs

All paths are relative to C:/Users/mikes/WebstormProjects/scaffold unless absolute.

- **The ecosystem's patterns,** read first: `.orkestrel/veneer/lifecycle/reading/api/patterns-1.md` (entities, managers, vocabulary) and `patterns-2.md` (surface hygiene).
- **The browser inventory against them:** `.orkestrel/veneer/lifecycle/reading/api/browser-*.md`.
- **The guides themselves:** `guides/agent.md`, `database.md`, `relation.md`, `table.md`, `workspace.md`, `workflow.md`, `form.md`, `tool.md`, and any other guide under `guides/` you find useful. Read the Surface, Methods, and Contract sections where a pattern needs confirming.
- **The browser:** C:/Users/mikes/WebstormProjects/browser at `51cf268`: `src/**`, `guides/browser.md`, `README.md`.
- **The reading campaign,** whose model-facing tool vocabulary of 8 page tools is ruled and stays: `.orkestrel/veneer/lifecycle/reading/campaign.md` and `plan.md`.
- **Law:** `AGENTS.md`, `.claude/rules/names.md`, `architecture.md`, `patterns.md`, `typescript.md`, and `documentation.md`.

## Decide

1. **Entities:**
   - each primary entity (`Browser`, `BrowserContext`, `BrowserPage`, the toolsets, the element managers, the recorders and replay, the stores, the browse MCP server);
   - how a consumer creates it (a `create{Entity}` factory returning the interface, and its options shape);
   - its properties, its methods, and its events, under the ecosystem's vocabulary.
2. **Sub-entities:** which related members become managers exposed as properties (as `table.rows` or `context.instructions` do), with their shared verbs: `add`, `remove`, `clear`, `has`, the noun and nouns lookup pair, `count`, `snapshot`, and `destroy`.
3. **Options:** one-word keys; group by entity noun where several keys configure one sub-entity; no prefixed keys; no behavior-selecting strings.
4. **Lifecycle and observation:** verbs from the fixed vocabulary; emitter event maps with `on`, `emitter.on`, and `error` isolation; status unions only where they name real states.
5. **Errors:** the error classes, their `code` unions, `context`, and their guards, and how abort and timeout integrate (`signal`, `timeout`, `AbortSignal.any`).
6. **Free functions:** classify each exported function as one of these, with a reason per group:
   - a pure leaf a consumer composes, which stays public;
   - a guard or parser, which stays;
   - entity work that a method already does or should do, which becomes internal or a method;
   - an implementation detail, which leaves the barrel.

   Apply the same to the constants and the types.
7. **Stores and extension points:** the journey and run stores, and any provider or driver seam, under the ecosystem's async `get`, `set`, and `delete` store shape and the registry `open` and `save` shape.
8. **Consumers:** every sibling checkout under C:/Users/mikes/WebstormProjects that imports `@orkestrel/browser`, outside `node_modules`, `dist`, and `tmp`, with what each one imports. Plan its migration in the same change, with no compatibility shims.
9. **Scope, ordered:**
   - what must change because it breaks a shared pattern or the naming law;
   - what should change for coherence;
   - what stays, and why.

   Estimate the size of each.
10. **Units:** owned files, order, routing (Astra for units that run commands; Opus for API shape and guide voice, with the Orchestrator running its commands), acceptance criteria, and the guide's restructure toward the ecosystem's Surface, Methods, Contract, and Patterns shape.

## Constraints

- The 8-tool model vocabulary, its copy, and the reading behavior stay as the campaign ruled.
- `AGENTS.md`:
  - types first;
  - single-word entity APIs;
  - no compatibility shims;
  - minimal public API, in which removing a symbol needs the capability itself to be wrong;
  - mechanism, not product policy.
- **Removals:** removing a public export that a consumer uses requires migrating that consumer in the same change.
- **Guide parity:** every export documented, and every Summary cell equal to its doc block.

## Output

One Markdown proposal with these sections:

1. **The API at a glance:** a before-and-after table per entity.
2. **Entities and managers:** their exact interfaces.
3. **Options, events, and errors.**
4. **The free-function, constant, and type classification:** counts, groups, and the reasoning.
5. **Stores and extension points.**
6. **Consumers and their migration.**
7. **Scope, ordered must, should, and stays,** with sizes.
8. **Units.**
9. **Risks.**
10. **Points for the user's ruling.**

Cite file:line for every claim about existing code. State the cost of every choice you reject.
