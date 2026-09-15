# Unit U4e — `@orkestrel/mcp`: the server produces `notifications/tools/list_changed` from the registry

## Role and engine

`sol` route: GPT-6 Astra, a `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/mcp` — objective, constraint-heavy wiring of an event source into
the modern server's held-open stream. Perform the assignment directly and spawn nothing. You are
the sole writer in this checkout while this unit runs. The `src:core` project runs in the sandbox;
no browser is needed.

## Objective

`@orkestrel/tool`'s registry publishes `add`, `remove`, and `clear` (`ToolManagerEventMap`;
`ToolManagerInterface.emitter`; read `node_modules/@orkestrel/tool/dist/src/core/index.d.ts`), and
`@orkestrel/emitter` 0.0.10's `on` returns `void` (the cleanup is `off` with the same handler
reference). Close the server-side consumer the emitter was authorized for (`plan.md` § Re-baseline
2, ruling 1); the browser bridge's follow landed in U4f.

1. **The server owns the tools family.** Every `subscriptions/listen` stream whose honoured filter
   carries `toolsListChanged` yields one `notifications/tools/list_changed` per registry change
   (`add`, `remove`, `clear`), from a producer the server parks on `tools.emitter` at the stream's
   start and releases (`off`) when `options.signal` aborts. No polling, no deadline read. A
   registry destroyed under a live stream publishes its final `clear` and then nothing; the stream
   still ends on its signal.
2. **Composition with a consumer producer.** The honoured filter is the consumer's
   `subscription.notifications` (when supplied) plus `toolsListChanged: true`, and the stream
   pumps the consumer's producer and the built-in one together. Rule on the merge: reuse an
   installed primitive that merges async iterables if one exists across the installed
   `@orkestrel/*` declarations (read them first — name what you read), otherwise pump both through
   the server's existing stream machinery (`MCPStreamController` and the `subscriptions/listen`
   handler at `src/core/MCPServer.ts:328` and `:1395-1470`) with one queue, and record the ruling.
   A consumer filter that claims `toolsListChanged` is refused at construction (`INVALID`): the
   tools family has one producer and it is the server's. Document the refusal.
3. **Discovery advertises it.** `buildDiscoverResult` (`src/core/helpers.ts:1140-1170`) stamps
   `tools: { listChanged: true }`; the existing `resources` and `prompts` stamps keep their
   consumer-producer conditions.
4. **The executed refresh example proves it end to end.** The guide's refresh section
   (`guides/mcp.md`, the `listen({ toolsListChanged: true }, …)` fence near `:4301` and
   `refreshTools` near `:4274`) is executed by `tests/guides.test.ts`; extend the executed proof so
   a registry `add` on the server side reaches the client's stream and the refresh installs the
   new tool, with no re-publish and no poll. The guide's prose for the server's `subscription`
   option and the `MCPSubscriptionFilter` row state the built-in family.

## Context

`MCPSubscriptionFilter` (`src/core/types.ts:1641`), `MCPSubscriptionHandler` (`:1765`),
`MCPSubscriptionOptions { notifications; producer }` (`:1771`), `MCPServerOptions.subscription`
(`:2190`); `buildSubscriptionFilter` (`src/core/helpers.ts:1003`), `matchesSubscriptionNotification`
(`:1037`); the listen handler (`MCPServer.ts:1395-1470`: the slot, `buildSubscriptionAcknowledgement`,
the iterator pump, `stampSubscriptionNotification`, `buildSubscriptionResult`). The client side
already refreshes (`client.listen`, `guides/mcp.md:1061`).

**Installed primitives you must reuse.** `@orkestrel/emitter` (`on`/`off`), `@orkestrel/test`
(`createRecorders`, `waitForEvent`, `waitForAbort`, `collect`, `captureError`), `@orkestrel/contract`;
read every surface first. A helper whose job an installed export does is a defect.

**Law.** `AGENTS.md`; `.claude/rules/{names,typescript,architecture,patterns,tests,documentation,
writing,quality}.md`. Types first; no `any`, no assertions, no nested functions, single-word entity
members, `#` fields, readonly collections.

**Host and bench.** PowerShell exec shell (`npm.cmd`, `npx.cmd`); `prove` unreachable; network
denied; vitest `src:core`, `guides`, `setup` run in the sandbox; `src:browser` needs Chromium and is
the Orchestrator's on the host. Bench sandbox denies a grandchild process; nothing here needs one.

**Standing conditions.** The mcp checkout is at commit `7959f08` on `main` — the landed U4 chain
(the page server and the WebMCP bridge; `feat: host an MCP server in the page and bridge the
registry to WebMCP`, 2026-09-15) — and `git status --short --untracked-files=no` is empty at
launch. The tree is clean apart from the ignored `tmp/` directory that holds this brief.

## Scope

**Owned.** `src/core/types.ts` (the option's TSDoc and any new member), `src/core/MCPServer.ts`,
`src/core/helpers.ts`, `src/core/validators.ts` (the construction refusal), `src/core/index.ts` (a
new export), `tests/setup.ts`, `tests/src/core/MCPServer.test.ts`, `tests/src/core/helpers.test.ts`,
`tests/src/core/validators.test.ts`, `tests/guides.test.ts`, `guides/mcp.md`. **Off-limits.**
`package.json`, `package-lock.json`, the `scaffold repair` set, `guides/tool.md`, `src/browser/**`,
`tests/src/browser/**`, `dist/**`.

## Acceptance criteria

1. `npm.cmd run lint:check`, `check`, `format:check` exit 0.
2. `npm.cmd run test:src:core` exit 0 with, red first: `pushes tools/list_changed when the
   registry adds a tool`, `… removes a tool`, `… clears`, `releases the registry subscription
   when the stream signal aborts`, `pumps a consumer producer beside the built-in tools family`,
   `refuses a consumer filter that claims the tools family`, `advertises tools.listChanged`.
3. `npm.cmd run test:guides` exit 0 with the executed refresh proof extended (red first against
   the current server, which produces nothing for the family).
4. Only owned files changed.

## Output

U3d's Output shape: touched files; diff stat; status; baseline; per-behaviour test titles with
red-then-green commands and counts; the merge ruling with the declarations read; acceptance
readings; deviation state.

## Deviation contract

Stop and report when the tools family cannot be produced without a second event source or a
poll, or when the executed guide proof cannot be extended inside `tests/guides.test.ts`. Decide
and record an ancillary placement (section, heading, helper file) yourself.
