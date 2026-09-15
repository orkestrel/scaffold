# Unit U4e-b — `@orkestrel/mcp`: migrate four client subscription scenarios off the tools family

Successor to U4e (`.orkestrel/campaign/U4e-mcp-list-changed-brief.md`; its report
`U4e-mcp-list-changed-report.md`). U4e made the server the sole producer of the tools family: a
consumer producer's `notifications/tools/list_changed` frame is no longer the client's to receive
through a `subscriptions/listen` stream, and `createSubscriptionServer` in `tests/setup.ts`
already declares the consumer's filter as `promptsListChanged`, `resourcesListChanged`, and two
resource subscriptions. Four scenarios in `tests/src/core/MCPClient.test.ts` still inject
consumer-produced tools frames; they test the CLIENT (frame stamping and order, isolation by
request id, queue capacity, a read parked past the request deadline), not the family, so they move
to the prompts family, which a consumer producer still owns.

## Role and engine

`builder` on Sonnet, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. The tree is dirty with U4e's
ten files on commit `7959f08`; leave every one of them as you find it.

## Carriers

In `tests/src/core/MCPClient.test.ts`, inside exactly these four tests and nowhere else:

1. `yields stamped frames in order as owned snapshots and returns the validated result` (near
   `:3721`): the filter `{ toolsListChanged: true, resourceSubscriptions: ['resource://one'] }`
   becomes `{ promptsListChanged: true, resourceSubscriptions: ['resource://one'] }`; the local
   binding `tools` becomes `prompts` with method `notifications/prompts/list_changed`; the
   assertion on that frame's `method` follows.
2. `keeps concurrent subscriptions isolated by their stamped request ids` (near `:3864`): the
   `tools` transform stream becomes `prompts`; the producer branch
   `filter.toolsListChanged === true ? tools.readable : resources.readable` becomes
   `filter.promptsListChanged === true ? prompts.readable : resources.readable`; `toolStream`
   and `toolAcknowledgement` become `promptStream` and `promptAcknowledgement`; the listen filter
   `{ toolsListChanged: true }` becomes `{ promptsListChanged: true }`; the written frame and the
   asserted `method` become `notifications/prompts/list_changed`.
3. `fails loudly when the subscription frame queue reaches capacity` (near `:4071`): the filter
   and the two written frames move to the prompts family the same way.
4. `delivers to a read parked past the configured request deadline` (near `:4096`): the filter,
   the written frame, and the asserted `method` move to the prompts family the same way.

Leave every other test untouched, including the ones near `:3940-3950` and `:4036-4044` that
still name the tools family (they pass under U4e and are not this unit's subject). Do not edit
`tests/setup.ts` or any U4e file.

## Context, law, host, and bench

`AGENTS.md`, `.claude/rules/tests.md`, and `.claude/rules/writing.md` in the scaffold checkout
govern. Windows host: Git Bash for the Bash tool; no heredocs, no `node -e`. The scoped run is
`npm run test:src:core -- tests/src/core/MCPClient.test.ts`; the whole core project is
`npm run test:src:core` (U4e's baseline: `945 passed, 4 failed` — those four). Run only scoped
Vitest projects and the non-mutating checks; never tree-wide `format` or `lint --fix`. Do not
commit, stash, checkout, restore, reset, clean, or run `npm install`.

## Scope

**Owned.** `tests/src/core/MCPClient.test.ts`, only at the four sites. **Off-limits.** Everything
else, including the ten U4e files (`guides/mcp.md`, `src/core/MCPServer.ts`, `src/core/helpers.ts`,
`src/core/types.ts`, `src/core/validators.ts`, `tests/guides.test.ts`, `tests/setup.ts`,
`tests/src/core/MCPServer.test.ts`, `tests/src/core/helpers.test.ts`,
`tests/src/core/validators.test.ts`).

## Deviation contract

Stop and report (expected, found, evidence, done or not) if a migrated scenario stays red on
the prompts family (that would name a server defect, not a test defect — report the exact
assertion and do not touch the server), or if any test outside the four is red. Decide and record
nothing else; the edits are fixed.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:src:core` exits 0 with every test passing (949 expected: U4e's 945 plus the
   four migrated ones).
3. `git status --short` names the ten U4e files plus `tests/src/core/MCPClient.test.ts`, and
   `git diff HEAD -- tests/src/core/MCPClient.test.ts` touches only the four tests.

## Output

The four tests' before and after (filter, frames, bindings); the acceptance readings (command,
exit, reading); the `git status --short` list; deviation state.
