# Design brief — a probe package, and whether to ship it as an executable

Read `/home/user/scaffold/PROBE.md` first. Its ruling is accepted: the probe mechanism is a
resident engine of three stages (TypeScript `LanguageService`, Oxlint, Vitest) reached as an MCP
tool built on `@orkestrel/mcp`, with a vendored instrument pair as the cold path.

The user now asks three questions. Answer all three.

1. Should this become a first-class fleet package, `@orkestrel/probe`?
2. Should it be packed as a single executable with `@orkestrel/sea`, either instead of or beside
   the package?
3. How and when does the server start, and how portable is it?

## Measured facts (this checkout, 2026-08-18). Do not contradict without your own measurement.

1. `@orkestrel/sea` version 0.0.7 exists: a pure-TypeScript Node Single Executable Application
   builder, layer 2, depending only on `@orkestrel/contract` and `@orkestrel/emitter`.
2. `@orkestrel/probe` does NOT exist on the registry. The name is free.
3. `@orkestrel/mcp` version 0.0.17, layer 3, deps `contract`, `emitter`, `sse`, `tool`,
   `websocket`; REQUIRED peers `router` and `server` (`peerDependenciesMeta` is empty). Installing
   it into an empty project pulls 10 `@orkestrel` packages and 6.3 MB with no unmet peer warning.
4. `createStdioServer(createMCPLegacy(mcp))` answers `initialize`, `tools/list`, and `tools/call`
   correctly at a measured 3.08 ms median warm round trip. WITHOUT `createMCPLegacy` the same calls
   fail `Invalid params: malformed modern request metadata`.
5. TOOLCHAIN DRIFT IS ALREADY LIVE. `BASE_DEV_DEPENDENCIES` in `src/core/constants.ts:368-371`
   declares `oxlint: '^1.77.0'`, `typescript: '^6.0.3'`, `vitest: '^4.1.10'`. This checkout has
   oxlint 1.78.0 installed against that `^1.77.0` range.
6. Oxlint is a native Rust binary with 19 platform-specific optional bindings
   (`@oxlint/binding-linux-x64-gnu`, `-darwin-arm64`, `-win32-x64-msvc`, and so on). This host
   installed `binding-linux-x64-gnu` and `binding-linux-x64-musl`.
7. A Single Executable Application's floor is the Node binary, measured at 118.9 MB on this host.
   `typescript` is 24 MB, `vitest` 2.2 MB, `oxlint` 2.4 MB on disk.
8. `node:sea` is present on Node 22.22.2.
9. Warm stage costs: type 57–83 ms, lint 15–22 ms through the Oxlint LSP, runtime 259–346 ms,
   combined median 337 ms. Cold: TypeScript 1198 ms, Vitest boot 358 ms plus first run 771 ms,
   Oxlint LSP initialize 269 ms.
10. `.mcp.json`, `.cursor/mcp.json`, and `.codex/config.toml` are all `HOST_PATHS` members
    (`src/core/constants.ts:134-137`), so one registration vendors to 44 targets.
    `.claude/settings.json:3` already sets `enableAllProjectMcpServers: true`.
11. A warm resident service returns confident WRONG answers about freshly edited source in both the
    type stage and the runtime stage until it revalidates. Revalidation costs a measured 0.5 ms
    over 60 files.

## The question that decides the executable

A probe exists so an agent can predict whether the target's gates will pass. Rule explicitly on
whether an executable carrying its own frozen `typescript`, `vitest`, and `oxlint` can still make
that prediction, given fact 5 and fact 6. If it cannot, say so plainly and say what a Single
Executable Application IS good for here, if anything.

## Constraints

- `AGENTS.md`, `.claude/rules/*.md` bind. Never add a dependency the user has not asked for; the
  user HAS asked about `@orkestrel/probe`, `@orkestrel/mcp`, and `@orkestrel/sea`.
- The fleet publishes in topological layers derived from runtime dependencies. A new package needs
  a layer, and `.claude/agents/orkestrel.md` carries the catalog.
- `peerDependencies` mean the consumer supplies the dependency. This repository ran a peer
  externalization campaign recently, so the mechanism is understood.

## Output, under 600 lines, no process diary

1. `PACKAGE` — rule on `@orkestrel/probe`. If yes: its layer, its runtime dependencies, its peer
   dependencies, what it exports, and which environments (`core`, `server`, `bin`) it needs.
   Justify the peer choice against fact 5 specifically.
2. `EXECUTABLE` — rule on `@orkestrel/sea`. Give the size arithmetic and the portability
   arithmetic. State what a SEA is good for here or that it is good for nothing here.
3. `LIFECYCLE` — how the server starts, when, who starts it, what it does on `initialize`, how it
   warms, when it stops, and what happens on a second concurrent client.
4. `PORTABILITY` — Windows, macOS, Linux, and the remote container. Name what breaks on each.
5. `REJECTED` — with reasons.
6. `RISKS` — ranked, each with the cheapest probe that exposes it.
