# Unit U4e-c — `@orkestrel/mcp`: the server and browser tests U4e made false on the host

Successor to U4e (`.orkestrel/campaign/U4e-mcp-list-changed-brief.md`, report
`U4e-mcp-list-changed-report.md`) and U4e-b (`U4e-b-mcp-client-tests-brief.md`, report
`U4e-b-mcp-client-tests-report.md`). U4e ran on a bench that cannot run the `src:server` and
`src:browser` projects, and U4e-b covered only `src:core`; the Orchestrator's authoritative gates
`after-u4e-b` (`U4e-b-mcp-gates-test-full.log.txt`) reddened eight tests in three files that
U4e's result makes false. This unit closes exactly those eight.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. The tree is dirty with U4e's
ten files and U4e-b's `tests/src/core/MCPClient.test.ts` on commit `7959f08`; leave every one of
them as you find it. A GPT-6 Astra session wrote U4e; you are the cross-engine reader of what it
made false.

## What U4e changed, as it bears on these tests

- A consumer `subscription.notifications` filter that claims `toolsListChanged: true` is refused
  at `createMCPServer` (`MCPError`, `-32602`: `Invalid subscription filter: the server owns
  toolsListChanged`, `src/core/MCPServer.ts:173`). The honoured filter of a stream is
  `buildSubscriptionFilter(requested, { ...configured.notifications, toolsListChanged: true })`
  (`MCPServer.ts:1422-1426`), so a client may still ask for the tools family; the server produces
  it from the registry.
- `buildDiscoverResult` stamps `capabilities.tools` as `{ listChanged: true }`
  (`src/core/helpers.ts:1141`); `resources` and `prompts` keep their consumer-producer conditions.

## Carriers

1. **`tests/src/server/handlers.test.ts`** — `pumps a held-open subscription acknowledgement,
   notifications, and closure onto SSE` (near `:446`) and `aborts an A4 subscription handler when
   a real HTTP client disconnects` (near `:571`). Each constructs a server whose consumer filter
   is `{ toolsListChanged: true }`. Migrate each scenario to the prompts family consistently, the
   way U4e-b migrated the client scenarios: the consumer's declared filter becomes
   `{ promptsListChanged: true }`; the fixture producer's frames (`subscriptionEvents`,
   `disconnectEvents`, wherever they are declared) emit `notifications/prompts/list_changed`
   where they emitted the tools family; the client's `subscriptions/listen` params ask for
   `{ promptsListChanged: true }`; the expected acknowledgement echoes the honoured filter
   (`{ promptsListChanged: true }`) and the expected notification frames follow. The subject of
   each test (the SSE pump and closure; the HTTP disconnect reaching the producer's signal) is
   unchanged. Where a producer fixture is shared by a test that must keep the tools family,
   parametrise it rather than duplicating it, and say so.
2. **`tests/src/server/transports/WebSocketClientTransport.test.ts`** — `ignores the old socket
   close after a new socket has replaced it` (near `:237-252`): the expected discover result's
   `capabilities: { tools: {} }` becomes `capabilities: { tools: { listChanged: true } }`.
3. **`tests/src/browser/factories.test.ts`** — `expectModernReply` (near `:693-711`) compares
   `capabilities: { tools: {} }`; change it to `{ tools: { listChanged: true } }`, which closes
   the five `createScopeServer` tests that call it. Re-read the helper's remark, if any, so it
   names the capability the server advertises.
4. Read the rest of each of the three projects' expectations for the same two facts (a consumer
   filter claiming the tools family; a discover literal with an empty `tools` capability) and
   close any further site the gates did not reach only because it sits in the same file — but
   record each such site, and touch no file outside the owned list.

## Context, law, host, and bench

`AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/writing.md` in the scaffold checkout govern;
`guides/mcp.md` is the spec (U4e's edits to it are in the tree). Windows host: Git Bash for the
Bash tool; no heredocs, no `node -e`. Scoped runs: `npm run test:src:server -- <file>`,
`npm run test:src:browser -- <file>` (Chromium launches natively). Run only scoped Vitest projects
and the non-mutating checks; never tree-wide `format` or `lint --fix`. Do not commit, stash,
checkout, restore, reset, clean, or run `npm install`.

## Scope

**Owned.** `tests/src/server/handlers.test.ts`, `tests/src/server/transports/WebSocketClientTransport.test.ts`,
`tests/src/browser/factories.test.ts`. **Off-limits.** Everything else, including `src/**`, the
ten U4e files, `tests/src/core/MCPClient.test.ts`, `tests/setup.ts`, `tests/setupServer.ts`,
`tests/setupBrowser.ts`, and `guides/**`.

## Deviation contract

Stop and report (expected, found, evidence, done or not) if a migrated handler scenario stays
red on the prompts family (the acknowledgement echo or the frame delivery would then name a server
defect — report the exact assertion and touch no source file), if a shared fixture cannot be
parametrised without editing an off-limits file, or if any test outside the eight is red. Decide
and record the wording of any remark you touch.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:src:server` and `npm run test:src:browser` exit 0 with every test passing (the
   eight named tests green; the count the gates log reports for those projects, plus nothing lost).
3. `git status --short` names the eleven U4e/U4e-b files plus only the owned files you changed.

## Output

Per-carrier before and after (the filters, the frames, the literals); each further site carrier 4
closed; the acceptance readings (command, exit, reading); the `git status --short` list;
deviation state.
