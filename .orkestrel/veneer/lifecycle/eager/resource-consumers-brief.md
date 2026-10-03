# Unit resource-consumers — who needs an eagerly created, liveness-tracked, replaceable resource

## Role and engine

Mapper on Grok 4.7 Extra High, reached through the Cursor bench. Read-only: create, edit, move, and delete nothing. Report what the code does, with `path:line`; do not design or recommend.

## Context

`@orkestrel/browser`'s `browse` server needs a small pool of browsers (two expected, three at most) that are created eagerly at server start, tracked (process, endpoint, profile, state), liveness-checked from events and deadlines, assigned work through recorded leases, replaced when one dies (with a restart limit), and torn down cleanly in one place. `@orkestrel/pool` 0.0.13 (`C:\Users\mikes\WebstormProjects\pool`, guide `C:\Users\mikes\WebstormProjects\scaffold\guides\pool.md`) creates on demand under a ceiling, validates only at acquire, does not observe a leased resource, names no resource in its events, and records no holder (`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\eager\capabilities.md` § 3). The user asks whether that gap belongs in `@orkestrel/pool`, in a new package (for example `@orkestrel/lease` or `@orkestrel/resource`), or inside `@orkestrel/browser` for now with a roadmap item. `@orkestrel/supervisor` and `@orkestrel/process`'s `Supervisor` class are ruled out.

## Map

Every repository under `C:\Users\mikes\WebstormProjects\` that is an `@orkestrel/*` package (skip `*-wt-*` worktrees, `roughnotes`, and `veneer` except its tests). Each guide is in `C:\Users\mikes\WebstormProjects\scaffold\guides\`.

1. **Consumers.** Find every place a package keeps a long-lived resource it starts and must keep alive: a child process, a language server, a Vitest or compiler service, a browser, a socket or connection, a worker thread, a database handle. For each: the file and class, whether it starts eagerly or on first use, how it learns the resource died (event, deadline, health check, poll), whether and how it replaces it (immediately, on next use, with a limit), how it tears down, and whether several of the same resource exist at once (a pool) or one (a single supervised resource). Cover at least `browser` (the `browse` server, `tests/setupGlobal.ts`), `probe` (`src/server/Probe.ts`, `ProbeServer.ts`, `stages/*`), `worker`, `mcp` (stdio client transport, sessions), `lsp` (`StdioClientTransport` generations), `ollama`, `process`, `server`, `websocket`, `database`, `sqlite`, `indexeddb`, `agent`, `toolbox`, `program`, `terminal`, and `sea`.
2. **Users of `@orkestrel/pool`.** Every import of `@orkestrel/pool` in those repositories, what it pools, and which `PoolOptions` it sets.
3. **The pool gap, measured.** In `C:\Users\mikes\WebstormProjects\pool\src`, the code size of `Pool.ts` and its kind files, and for each missing capability the code it would touch: a warm floor created eagerly (and refilled), eviction of a resource that reports its own death while idle or leased, events that name the record, a holder recorded on the lease, and a restart limit. Say which of these the existing structure accommodates (an option and a branch) and which needs a different lifecycle.
4. **Shared shape.** For the consumers in section 1, list which of these each one implements by hand today: eager start, death detection, replacement, restart limit, ordered teardown, lease or holder record. Cite each.

## Output

One Markdown document with sections 1 to 4, a consumer table (package, resource, eager or lazy, death signal, replacement, limit, teardown, single or pool, hand-rolled lines cited), and `## Unknowns`. No recommendations.
