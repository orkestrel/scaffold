# Unit W1 — mcp stdio server write outcome

## Role and engine

`sol` on GPT-5.6 Sol, reached as the journaled codex CLI. This brief is read by the bench engine
inside its own CLI.

## Objective

Land the ruled write-outcome contract on `StdioServerTransport.send`, its executed pins, and its
guide parity, in `/home/user/orkestrel/mcp`.

## Context

**Evidence.** The send site: `src/server/transports/StdioServerTransport.ts:99-101` —
`this.#output.write(...)` with no return check, no callback, no `error` subscription on
`#output`; `#input` gets `#failure` on `error` at `:96`. The constructor is `(input, output)`
(`:60-64`); factory options `StdioServerOptions` at `src/server/types.ts:478-481`. The family
map and the existing send tests
(`tests/src/server/transports/StdioServerTransport.test.ts:128-154`) are in the ruling record.
`bindServer` already catches a `send` rejection and routes it to the server emitter's `error`
(`src/core/helpers.ts:1162-1172`), so the stronger contract has a live consumer.

**Law.** `AGENTS.md`; `.claude/rules/typescript.md`, `architecture.md`, `names.md`, `tests.md`,
`patterns.md`, `documentation.md`, `writing.md`. Skill: `orkestrel-harden-package` (the
implementation-unit phases the work touches). Guide: `guides/mcp.md`.

**The ruling to implement (fixed; not yours to reopen).**

1. Extract `writeLine(output, line)` into `src/server/helpers.ts` as an exported pure leaf: it
   performs one `write` with a completion callback, resolves when the callback fires clean,
   rejects with the callback's error, and converts a synchronous `write` throw into the same
   rejection. Barrel and document it.
2. `send` awaits `writeLine`. It rejects after `close()` (matching the stdio client's
   not-connected refusal). The completion-callback await is what delivers backpressure: state
   that in the method's TSDoc rather than adding a `drain` listener.
3. `start()` subscribes `#output` to `error` with the existing `#failure` handler; `#release()`
   removes exactly that listener. The caller-owned stream is never ended, destroyed, or
   blanket-cleared.
4. `close()` settles every pending send with a rejection; no send promise stays parked after
   closure.
5. Sibling transports do not move. The `send` contract's TSDoc in `src/core/types.ts` (the
   `MCPClientTransportInterface.send` row at `:2130`) gains the family sentence: a transport
   whose channel confirms the write rejects on its failure; a transport whose exchange reports
   through the emitter resolves; a transport whose channel cannot confirm a write no-ops on a
   closed channel.

**Host.** POSIX bash, working path `/home/user/orkestrel/mcp`, sandbox `workspace-write`,
network denied. Your sandbox denies grandchild processes and loopback listeners — every pin here
runs in-process against injected `node:stream` writables, which your sandbox reaches.

**Measurements.** The existing suite: `npm run test:src:server` green at HEAD. The send tests at
`:128-154` pass and stay.

**Control identifiers.** none.

**Standing conditions.** `tmp/` may hold bench journals; ignore them. Do not run `npm install`
(network denied); the installed tree is current.

## Unknowns

Whether `#release()` is the actual teardown seam or the class names it differently — read the
class and use its real seam, recording the name in your report.

## Scope

**Owned.** `src/server/transports/StdioServerTransport.ts`, `src/server/helpers.ts`,
`src/server/index.ts` (barrel row), `src/core/types.ts` (the `send` TSDoc rows only),
`tests/src/server/transports/StdioServerTransport.test.ts`, `tests/src/server/helpers.test.ts`
(the `writeLine` cases), `guides/mcp.md` (the transport section rows the change makes false).

**Shared (report-only).** none.

**Off-limits.** Every sibling transport implementation file, `package.json`, `dist/**`,
`src/browser/**`.

**What asserts the state this change ends.** The two existing send tests at `:128-154` (they
must stay green under the awaited form); `tests/guides.test.ts` parity over the new export; the
guide's transport rows. All owned or listed here.

**Tools and limits.** Your sandboxed shell, read and write inside the workspace; scoped
validation only: `npx tsc --noEmit -p configs/src/tsconfig.server.json`, oxlint scoped to owned
files, and `npm run test:src:server`. No tree-wide format, no build, no git state changes, no
commit.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn
nothing.

## Output

Write nothing outside the workspace. Your final message is the report: what changed per ruling
item, the pins with their one-line results, the mutation controls with their failing lines, the
teardown-seam name, and any claim you could not close. The Orchestrator captures your journal.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when
a ruling item contradicts the class's actual structure or an existing green test. Where a
sentence sits in the guide, and how a test case is named, are yours to settle and record.

## Acceptance criteria

1. `npx tsc --noEmit -p configs/src/tsconfig.server.json` green.
2. Scoped lint green over owned files.
3. `npm run test:src:server` green, including the new pins: rejection on callback error;
   rejection on synchronous throw; out-of-band output `error` reaches the domain `error` and the
   process survives; `close()` removes this transport's listeners from both caller-owned streams
   and settles pending sends; `send` after `close()` rejects; sequential sends over a
   `highWaterMark: 1` writable that defers callbacks resolve in call order (asserted as
   ordering, never as duration); `sendStream` over that writable delivers in order.
4. Each pin carries a mutation control you ran once and reverted: with the awaited callback
   removed, the rejection pins fail; with the `error` subscription removed, the survival pin
   fails. Report the failing lines; leave the tree with controls reverted.
5. `tests/guides.test.ts` green (`npm run test:guides`).

**Observations, not criteria.** The whole-suite `npm test` and `format:check` are the
Orchestrator's authoritative runs after you exit.

## Review evidence

The Orchestrator captures `git -C /home/user/orkestrel/mcp diff` and `git status --porcelain`
after your exit; your report plus that diff is the audit's subject.
