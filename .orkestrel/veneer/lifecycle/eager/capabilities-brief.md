# Unit eager-capabilities — which `@orkestrel/*` packages fit a small eager browser pool

## Role and engine

Mapper on Grok 4.7 Extra High, reached through the Cursor bench. Read-only: create, edit, move, and delete nothing. Report what the guides and the code say, with `path:line`; do not design.

## Context

`@orkestrel/browser`'s `browse` MCP server will launch Chromium at server start, recover a crashed browser, and keep a small pool (two browsers expected, three at most) whose every browser is launched when the owner decides, tracked (process, endpoint, profile, state), liveness-checked, assigned work through recorded leases, warm before work arrives, set up in one place as early as possible, and torn down in one place cleanly. The design is at `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\eager\design-brief.md`. The browser package installs `abort`, `emitter`, `mcp`, `process`, `queue`, `timeout`, and `tool` among others (`C:\Users\mikes\WebstormProjects\browser-wt-browse\node_modules\@orkestrel`), not `pool`, `supervisor`, `worker`, or `workflow`.

## Map

Read each package's guide in `C:\Users\mikes\WebstormProjects\scaffold\guides\` and its repository at `C:\Users\mikes\WebstormProjects\<name>` (its `package.json`, `src/**/types.ts`, the implementation of every capability you report, and its `ROADMAP.md` if present). Cover `pool`, `supervisor`, `worker`, `workflow`, `queue`, `process`, `timeout`, `abort`, `emitter`, `budget`, and `msg`, and any other package whose guide shows a capability below.

1. Per package: its published version and whether it is current (`npm view` is not available to you; read `package.json` and the git log in its repository), its environment entries (core, browser, server), its runtime dependencies, and whether its guide or roadmap marks it retired or unmaintained.
2. Per capability the pool needs, every package that provides it, with the exported names, the signatures, and the semantics, cited: owning a fixed set of long-lived resources created eagerly; acquiring and releasing a resource (a lease) with a record of the holder; choosing which resource serves work (balancing); detecting that a resource died or stopped answering (events, deadlines, health checks) and whether any of it polls; replacing a dead resource; restart limits or backoff; warm-up before first use; ordered teardown that releases everything, including after a crash; supervising a child process (exit, signals, stderr tail, tree kill).
3. For `pool` in particular: its full public surface, its resource lifecycle (create, validate, acquire, release, destroy), what it does when a resource fails while leased and while idle, whether it creates resources eagerly or on demand, whether its size is fixed, and how it reports state. For `supervisor`: what it supervises (processes, tasks), its restart policy, and its status relative to `@orkestrel/process`'s `Supervisor` class.
4. Dependency fit: whether `@orkestrel/browser`'s `src/server` could depend on each package (the browser package's own `AGENTS.md` dependency rules and `package.json`), and what each adds to the install.

## Output

One Markdown document with sections 1 to 4, a capability table (capability, package, exported names, semantics, polls or not), and `## Unknowns`. No recommendations.
