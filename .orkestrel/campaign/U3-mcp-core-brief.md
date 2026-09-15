# Unit U3 — `@orkestrel/mcp` core: cancellation through the server's default execution and the client's wrapped tool; `title` and `annotations` on the wire; explicit refresh

## Role and engine

`sol` route on GPT-6 Astra (objective implementer; Astra stands in the Sol seat), reached as a
`workspace-write` `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`. You are the bench
engine reading this brief inside your own CLI: perform the assignment directly and spawn nothing.
You are the sole writer in this checkout.

## Objective

Adopt the tool contract landed by unit U1 (installed here as a tarball) across mcp's core: the
server's default `tools/call` execution passes `{ signal, caller }` as the `ToolContext`; the
client's wrapped tool forwards `context.signal` into `call` and carries `title` and `annotations`;
the server advertises `title` and `annotations` on `tools/list`; an executed guide example shows
explicit tool-list refresh; the guide's protocol wording is verified.

## Context

**Evidence.**

- Installed tool contract (U1 tarball; U0 receipt at
  `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/u0-receipt.md`; U1 report at
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/U1-tool-contract-report.md`):
  `ToolContext { signal: AbortSignal; caller?: unknown }`; `ToolCall { id; name; arguments }`;
  `ToolInterface.execute(args, context)`; `ToolManagerInterface.execute(call | calls, context?)`
  (mints a signal when omitted; refuses an already-aborted signal with a `ToolFailure`);
  `ToolDefinition { name; title?; description?; parameters?; annotations?: ToolAnnotations {
  pure?; untrusted?; consequential? } }`. Read `node_modules/@orkestrel/tool/dist/src/core/index.d.ts`
  first; it is authoritative over this summary.
- Server dispatch, read by the Orchestrator 2026-09-15: `src/core/MCPServer.ts:794` `const call =
  buildToolCall(request, options.caller, args)`; `:940-956` `#execute(request, call, signal,
  progress?)` runs `this.#options.tools.execute(call)` on the default path and passes `{ request,
  call, tools, signal, progress? }` to a custom `execution` handler. `buildToolCall` at
  `src/core/helpers.ts:651-665` spreads `caller` onto the call. `MCPServerOptions.execution`'s TSDoc
  (`src/core/types.ts:2142-2148`) states that the default path has "no seam to hand a signal
  through" — this unit closes that seam and rewrites that TSDoc.
- Client wrapper, `src/core/MCPClient.ts:774-802`: `#tool(name, descriptor)` builds a `Tool` with
  `execute: this.#execute.bind(this, name)`; `#execute(name, args)` calls `this.call(name, args)` with
  no options, so nothing reaches `MCPCallOptions.signal` (`src/core/types.ts:2696-2706`); it throws
  when the outcome is not `complete`. `MCPToolDescriptor` at `src/core/types.ts:1217` is `{ name;
  description?; inputSchema }`. The server projects `tools.definitions()` for `tools/list`
  (`src/core/helpers.ts:769` per the design lane).
- Client-side list-change subscription exists: `client.listen({ toolsListChanged: true }, {
  signal })` (`src/core/types.ts:1618-1624`); `client.tools()` returns a snapshot (`MCPClient.ts:393`).
- Guide: `guides/mcp.md` places server-initiated requests under `## Declared non-goals` (`:4334-
  4336`) and keeps `ping` legacy-only (`:4341`); `## Declared conformance gaps` and `## Declared
  packaging limits` exist. The tool guide mirror `guides/tool.md` in this checkout is STALE
  (pre-U1); read `C:/Users/mikes/WebstormProjects/tool/guides/tool.md` for the landed contract and
  refresh the mirror by byte copy (Owned).
- MCP wire annotations (specification 2026-07-28, per `G5-webmcp-distillate.md` § 6 and the
  installed constants): a tool descriptor may carry `title` and `annotations { readOnlyHint?,
  destructiveHint?, idempotentHint?, openWorldHint? }`. Project the domain `ToolAnnotations` as:
  `pure` → `readOnlyHint`; `consequential` → `destructiveHint`; `untrusted` has no MCP counterpart
  and is not advertised on the MCP wire (it is advertised by the WebMCP bridge, unit U4). Inbound,
  the client projects `readOnlyHint` → `pure` and `destructiveHint` → `consequential`. Read the
  vendored schema mirror under `tests/mirrors/` and the existing descriptor parsing before deciding
  the exact projection helpers; place them in `src/core/helpers.ts` as exported, tested functions.
- Design record: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/plan.md` (R1, R3,
  R4, R10, R11, X1, X3, X7, X11); `D1b-design-astra.md` § Constraints 4 (the full cancellation path
  and the refresh semantics); `D1-design-planner.md` § 4.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; scaffold's
`.claude/rules/{names,typescript,architecture,patterns,tests,documentation,writing,quality}.md`;
skill `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-harden-package/SKILL.md`
(capability lane) with `references/contract.md` and `references/centralization.md`; guide
`guides/mcp.md`. This checkout's `AGENTS.md` is a pointer to scaffold.

**Host.** Windows 11. PowerShell exec shell with script execution disabled: `npm.cmd run <script>`.
Sandbox `workspace-write` rooted here; network denied; `.git` read-only. `prove` blocked; use
`expectTypeOf`. Vitest forks run. The `src:browser` project is Playwright Chromium: you may run
`npm.cmd run test:src:browser` to keep the browser suite green after your core changes, but you
write nothing under `src/browser/**` or `tests/src/browser/**` (unit U4 owns them); if a browser
test must change because of your core change, return the exact patch as a shared-file report.

**Measurements.** The Orchestrator typechecked this checkout against the installed U1 tarball on
2026-09-15 (`npm run check`, exit 2): `src/**` compiles unchanged; the only red is
`tests/src/core/MCPClient.test.ts(1204,29)` (`Expected 2 arguments, but got 1`). That `src/**`
compiles unchanged is the hazard this unit must close by reading, not by the compiler:
`buildToolCall` still spreads `caller` onto the call (a spread raises no excess-property error),
and the client's `execute: this.#execute.bind(this, name)` still compiles because a
fewer-parameter function is assignable. Take your own baseline of `npm.cmd run test:src:core`
before editing and record it.

**Control identifiers.** R1, R3, R10, R11, X1, X3, X7, X11 are control labels; name tests for what
they prove.

**Standing conditions.** `node_modules/@orkestrel/tool` is the U1 tarball installed `--no-save`
(declared range stays `^0.0.14`; the Orchestrator re-pins at landing). `tmp/` is git-ignored. Do
not bump `version`. Do not add any package. Do not edit any file `scaffold repair` restores
(`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `configs/**`,
`.claude/**`, `AGENTS.md`, `CLAUDE.md`, `.oxlintrc.json`, `.oxfmtrc.json`, `tsconfig.json`,
`vite.config.ts`, `.gitignore`, `.gitattributes`, `scripts/**`).

## Unknowns

- Whether the installed MCP schema mirror names `title` and `annotations` on the tool descriptor
  exactly as this brief states: read `tests/mirrors/*.json` and report the fields you found.

## Scope

**Owned.** `src/core/types.ts`, `src/core/helpers.ts`, `src/core/validators.ts`,
`src/core/parsers.ts`, `src/core/MCPServer.ts`, `src/core/MCPClient.ts`, `src/core/MCPLegacy.ts`
(only if it builds a `ToolCall`), `tests/src/core/**`, `tests/setup.ts`, `tests/setupServer.ts`
(only if a fixture builds a tool), `tests/integration.test.ts`, `tests/src/server/**` (only where a
server-face test authors a tool handler that must take `context`), `tests/guides.test.ts`,
`guides/mcp.md`, `guides/tool.md` (byte copy from the tool checkout), `README.md` (tagline only).

**Shared (report-only).** `src/browser/**`, `tests/src/browser/**`, `tests/fixtures/**` — return
exact patches; do not edit.

**Off-limits.** Standing-conditions files; `package.json`, `package-lock.json`; other guide
mirrors; `dist/**`.

**What asserts the state this change ends.** The files the baseline typecheck names; every test
authoring a tool handler with a second `caller` argument or building a `ToolCall` with `caller`;
`tests/src/core/MCPServer.test.ts` cases on default execution; `tests/src/core/MCPClient.test.ts`
cases on `tools()` and the wrapped `execute`; guide fences showing a tool handler.

**Tools and limits.** Read, write, run under this checkout; scoped `npx.cmd oxfmt --config
.oxfmtrc.json --write <owned files>`; no tree-wide `format`, `lint --fix`, `build`; no installs; no
git mutations; no network.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn
nothing.

## The change (exact)

1. `buildToolCall(request, args?)` builds `{ id, name, arguments }` only; `#call` passes
   `options.caller` into the context instead: default path `this.#options.tools.execute(call, {
   signal, ...(caller === undefined ? {} : { caller }) })`. A custom `execution` handler keeps
   receiving `{ request, call, tools, signal, progress? }` plus a new `caller?` member on
   `MCPExecutionInput` so it can forward identity; its TSDoc says the default path now forwards
   the request signal and that a delegating handler forwards `signal` and `caller` itself. The
   `MCPServerOptions.execution` TSDoc no longer claims the default path has no cancellation seam.
2. `MCPToolDescriptor { name; title?; description?; inputSchema; annotations? }` with the wire
   annotation shape as its own declared wire type (external field names kept, TSDoc naming the
   specification); server `tools/list` projects `title` and the two mapped annotation hints from
   each definition; the client's `#tool` carries `title` and the inverse projection onto the wrapped
   `Tool`, and `execute: (args, context) => this.#execute(name, args, context)` where `#execute`
   calls `this.call(name, args, { signal: context.signal })`. The throw for a non-`complete` outcome
   stays.
3. Guide: a `### Refresh the tools an agent holds` (or similarly named, under `## Patterns`)
   executed example: a `ToolManager` holding one local tool and the client's tools; on
   `notifications/tools/list_changed` (received through `listen({ toolsListChanged: true })`) the
   example fetches `client.tools()` again, removes only the names it installed from the client
   before, adds the new snapshot, refuses a name that collides with the local tool (records the
   collision and keeps the local tool), and on a failed `tools()` keeps the last snapshot. The
   transcription in `tests/guides.test.ts` drives it against a real in-process server pair (Node
   `MessageChannel` or the duplex transports already used by core tests). Also a passage in the
   client's section stating what the wire preserves (`title`, `description`, `inputSchema`,
   `annotations`) and what it loses (`summary` and the full description when a `summary` was
   authored).
4. Guide wording: where the guide compares to WebMCP or names server-initiated requests, keep the
   existing "modern-protocol non-goal" framing; add nothing that calls it a conformance gap.

## Output

Final message: touched files with one-line summaries; `git diff --stat`; `git status
--porcelain`; the baseline red typecheck's count and file list; for each new behaviour the test
title; acceptance commands with exit codes and counts; shared-file patches (if any) verbatim; the
Unknown resolved; deviation state. No process diary.

## Deviation contract

Stop and report on: an installed tool declaration differing from the Evidence summary on a member
this change uses; an off-limits or vendored file that must change; a rule forbidding a named
member; a browser test that must change and whose patch you cannot express as a report. Decide,
record, carry on for test placement, fence wording, helper names, and message text.

## Acceptance criteria

1. `npm.cmd run lint:check` exit 0; `npm.cmd run check` exit 0 (from the recorded red baseline).
2. `npm.cmd run test:src:core` exit 0 with tests, each named for what it proves, covering: the
   default execution path passing the request's signal so that a handler observes abort when the
   request is cancelled (`notifications/cancelled` over a duplex transport) and the connection
   stays usable after; a custom `execution` handler receiving `caller`; `tools/list` advertising
   `title` and the mapped hints; the client's wrapped tool forwarding `context.signal` so that
   aborting the agent-side context cancels the in-flight `tools/call` (observed at the server);
   the wrapped tool carrying `title` and the inverse-projected annotations; the refresh example's
   four outcomes (add, replace, collision refused, failure keeps the last snapshot).
3. `npm.cmd run test:src:server` exit 0 and `npm.cmd run test:integration` exit 0.
4. `npm.cmd run test:guides` exit 0; `guides/tool.md` byte-identical to the tool checkout's.
5. `npm.cmd run test:policy`, `test:config`, `test:setup` exit 0.
6. `npm.cmd run format:check` exit 0.

**Observations, not criteria.** `npm.cmd run test:src:browser` (Playwright): report the reading
and any patch a browser test needs; `npm.cmd test` as a whole: report the reading.

## Review evidence

The Orchestrator captures `git diff` and `git status --porcelain` after you exit.
