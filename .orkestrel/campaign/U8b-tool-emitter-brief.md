# Unit U8b — `@orkestrel/tool`: the registry owns an emitter (successor to U8)

Successor to `tmp/units/U8-tool-emitter-brief.md` (staged beside this file as
`U8-tool-emitter-brief.md`). Read that brief in full first; it stays the brief. This file records
the one correction and wins over the sentence it amends.

## Role and engine

`sol` route: GPT-6 Astra, a `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/tool`. Perform the assignment directly and spawn nothing. You are
the sole writer in this checkout while this unit runs.

## Why a successor

U8 stopped under its deviation contract (thread `01a0a43a-431a-71f3-aaca-6fe46b8ab6c3`,
2026-09-15): the emitter guide requires a type-alias event map, and `EmitterInterface<TMap>`
rejects an `interface` map with TS2344 (missing string index signature), which U8 proved with an
in-memory compile. The brief's surface block declared `ToolManagerEventMap` as an `interface`.
That was the brief's error; nothing in the tree changed.

## Amendment

Declare the event map as a type alias, the form `guides/emitter.md` prescribes and the fleet uses
(for example `MCPServerEventMap` in `C:/Users/mikes/WebstormProjects/mcp/src/core/types.ts`):

```ts
/** Names the events a tool registry publishes. */
export type ToolManagerEventMap = {
	/** Fires after a tool is registered, with the registered instance. */
	readonly add: readonly [tool: ToolInterface]
	/** Fires after a tool is removed, with the removed instance. */
	readonly remove: readonly [tool: ToolInterface]
	/** Fires once per `clear`, with the tools it removed in registration order. */
	readonly clear: readonly [tools: readonly ToolInterface[]]
}
```

Everything else in U8 — `ToolManagerOptions`, `emitter`, `destroy`, the semantics to pin, the
guide work, the installed primitives, the scope, the acceptance criteria, and the Output shape —
is unchanged. The Unknown is answered by your own reading (`emit()` does nothing after
`destroy()`): pin it with a test that a later `add` after `destroy` reaches no listener, and state
in TSDoc that a destroyed registry publishes nothing.
