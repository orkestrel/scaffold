# CL8 scout — the grid and gutter keys, and what CL7 left for them

## Role and engine

`grok` (Cursor Grok 4.6 through the Cursor CLI, read-only). The Claude-side driver carries this
brief across unaltered and returns the journal path and the distillate untouched; the engine
behind the CLI reads it and answers directly, spawning nothing.

## Objective

A distilled map, with `file:line` pointers, of the six keys unit CL8 owns and of the machinery
CL7 just landed that CL8 builds on. CL8 is the largest remaining unit in this family by key
count, and its keys are generated families rather than fixed selector lists, so the map must make
the generation rules visible rather than quoting every selector.

## Context

Checkout: `C:/Users/mikes/WebstormProjects/veneer`, at the CL7 landing. **CL7 landed the
container classes, the container and gutter tokens with their registry leaves, and a loop that
emits breakpoint-scoped rules from the ramp**, so read the tree as it stands rather than any
earlier map. Read only these, and read nothing else:

- `tests/fixtures/oracle/inventory.json` — the `row`, `col`, `offset`, `g`, `gx`, and `gy`
  entries. Each entry carries a `selectors` array of objects with a `selector` string and a
  `declarations` array, a flattened `declarations` index, a `properties` object, and a `media`
  field. **These are large**: describe each key by its generation rule and its bounds rather than
  by listing every selector.
- `src/styles/components/_container.scss` — the whole file, as the pattern CL8 follows.
- `src/styles/_tokens.scss` and `src/core/constants.ts` — the container and gutter tokens and
  their registry leaves, and every token whose name contains `gutter`, `space`, or `breakpoint`.
- `src/styles/_mixins.scss` — the breakpoint members and anything the container partial reads.
- `tests/setupStyles.ts` — the container case tables and the breakpoint case table.
- `tests/src/styles/components/container.test.ts` — the whole file, as the proof pattern.
- `guides/veneer.md` — its § Compatibility rows for the container key, and any § Deferred
  selectors row naming a grid selector.

## Unknowns

The Orchestrator does not know how many distinct selectors each key generates, whether the column
key's rules are breakpoint-scoped in the same shape the container's caps are, or whether the
three gutter keys share one generation rule with different properties. Name what you find rather
than resolving it.

## Scope

Read-only. You own no file. Write nothing, run no build, run no test.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Five sections, each with `file:line` pointers and no raw dumps.

1. **The six keys by generation rule.** For each key: how many selectors it carries, the rule that
   generates them (the variable parts and their ranges), the declarations each generated rule
   emits, the media conditions involved, and the `properties` object's keys. Say for each key
   whether its properties object is empty, because that decides whether it needs variable rows.
2. **What the row and column keys need from each other.** Name every custom property one key
   declares that another reads, and say which key must ship first for the other to resolve.
3. **The container pattern CL8 follows.** How the container partial groups its families, how its
   loop over the ramp is written, and how its proof drives the viewport and reads resolved
   values. Name the exact members and tables a grid partial and proof would reuse.
4. **The gutter tokens as they now stand.** The container and gutter tokens, their values, their
   registry leaves, and every consumer of each. Say whether the three gutter keys would read the
   tokens CL7 landed or need their own.
5. **The guide and the deferrals.** Whether any deferral row names a grid selector, and what the
   container key's compatibility rows look like as the pattern CL8's rows follow.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself how you summarize a large
selector family and how much of a declaration list you quote. Stop and report if a file this
brief names does not exist.

## Acceptance criteria

1. Section 1 gives every key a generation rule and a selector count, and says whether its
   properties object is empty.
2. Section 2 names every cross-key property dependency.
3. Section 3 names the exact members and tables a grid partial and proof would reuse.
4. Every claim carries a `file:line` pointer.
