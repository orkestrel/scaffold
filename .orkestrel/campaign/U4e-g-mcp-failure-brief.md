# Unit U4e-g — `@orkestrel/mcp`: a caught `undefined` keeps its identity, the state record stays private, and two comments become one line

Successor to U4e-f (`.orkestrel/campaign/U4e-f-mcp-shape-brief.md`; its report
`U4e-f-mcp-shape-report.md`). This file carries the A4m objective findings
(`A4m-audit-analyst.md`, claims 4 and 7) with the Orchestrator's rulings, and wins over any
sentence it amends. The A4m checker passed; the chain closes when these land.

## Role and engine

`sol` route: GPT-6 Astra, a `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/mcp`. Perform the assignment directly and spawn nothing. You
are the sole writer in this checkout while this unit runs. The `src:core`, `setup`, and
`guides` projects run in the sandbox (U4e and U4e-e ran them). Opus 5 audits this round with the
checker, and the Orchestrator replays the two executed vectors on the host.

## What A4m found

- **Claim 4, BROKEN.** `MCPSubscriptionState.failure: unknown` (`src/core/types.ts:1812`) cannot
  distinguish absence from a caught `undefined`: executed against the built `dist/`, a consumer
  producer that yields a prompts notification and then `throw undefined` delivers the
  notification and then completes gracefully with no `-32603` terminal (an `Error`, `null`, and
  `false` each produce the terminal); and after that graceful close a registry `clear` throws
  `TypeError: Invalid state: Controller is already closed`, because `#change`
  (`src/core/MCPServer.ts:1524`) no longer suppresses the enqueue once the stream closed on a
  failure it cannot see. Separately, the published `MCPSubscriptionState` carries writable
  members against `AGENTS.md` § Non-negotiable rules, and publication is not forced: a private
  inline structural annotation at each private method is admitted by the placement rules, with
  the repeated annotation as its consolidation cost.
- **Claim 7, BROKEN.** The two requested one-line comments landed as multi-line blocks
  (`tests/src/core/MCPServer.test.ts:715`, `src/core/MCPServer.ts:1486`).

## Carriers (close every one; each names its ruling)

1. **A caught value keeps its identity.** Ruling: the record's failure member holds a wrapper,
   `{ readonly error: unknown } | undefined`, so absence is `undefined` and a caught `undefined`
   is `{ error: undefined }`; the outer generator rethrows `failure.error` after draining, so a
   producer that throws `undefined` ends with the same `-32603` terminal as any other thrown
   value. Pin `terminates with the failure terminal when the producer throws undefined`: yield
   one prompts frame, `throw undefined`; the reader receives the frame, then the terminal (red
   first: today it completes gracefully).
2. **A closed stream refuses the registry's enqueue.** Ruling: after the stream closes (on a
   failure or on the producer's end), `#change` enqueues nothing — read the record's closed
   state, or the failure, before `controller.enqueue`. Pin `ignores registry changes after the
   stream closed on a producer failure`: acknowledge, let the producer throw `undefined` (and,
   in a second case, throw an `Error`), then `clear` the registry before reading the terminal;
   no `TypeError` surfaces and the terminal arrives (red first: today `Invalid state: Controller
   is already closed`).
3. **The state record is private.** Ruling: remove `MCPSubscriptionState` from `src/core/types.ts`,
   its guide Surface row, and any `PUBLISHED_*` entry that names it; annotate the record inline
   at the private methods that take it (the repeated structural annotation is the accepted
   cost), with the same members (`frame`, `failure`, `iterator`) and the wrapper from carrier 1.
   The members stay mutable because one record is shared by the registry listener, the pull, and
   the generator; that is admitted for a private structural type and refused for a published
   interface. Run `npm.cmd run lint:check` and `check` to confirm the placement rules admit the
   form; if a policy rule refuses an inline annotation, stop and report the rule and its message.
4. **Two one-line comments** (claim 7): condense the refusal-literal comment
   (`tests/src/core/MCPServer.test.ts:715`) and the `!emitter.destroyed` comment
   (`src/core/MCPServer.ts:1486`) to one line each, keeping the JavaScript-refusal rationale and
   the explicit destroyed-registry intent.
5. **Prose.** The guide's producer paragraph and `MCPSubscriptionHandler`'s `@remarks` already say
   a failure terminates the stream after the notifications it produced; make sure neither names
   the removed `MCPSubscriptionState`, and that the coalescing sentence stays once.

## Rulings that stand

Everything U4e … U4e-f landed: the pull-driven consumer, the failure delivered after the queued
frames, the coalesced registry side, the destroyed-registry case, `MCPConsumerFilter`, the
release reason, the two-cause refusal, `createProducerScript`, the placement and prose items.

## Context, law, host, and bench

`AGENTS.md` and `.claude/rules/{names,typescript,architecture,patterns,tests,documentation,writing}.md`
in the scaffold checkout govern (types first; no `any`, no assertions, no nested functions;
absence is `undefined`; interface properties readonly; one class per implementation file). Host
and bench as U4e-e: PowerShell exec shell (`npm.cmd`), `prove` unreachable, network denied; a
grandchild process is denied. **Standing condition:** the tree is DIRTY with the fifteen files of
U4e … U4e-f on commit `7959f08` (uncommitted, audited by A4k, A4l, A4m); leave every one of them
as you find it except where a carrier names it. Run only scoped Vitest projects and the
non-mutating checks; never tree-wide `format` or `lint --fix`.

## Scope

**Owned.** `src/core/MCPServer.ts`, `src/core/types.ts` (the removal), `tests/src/core/MCPServer.test.ts`,
`tests/src/core/validators.test.ts` (only if a `PUBLISHED_*` entry names the removed type),
`guides/mcp.md` (the removed row; the named paragraphs). **Off-limits.** Everything else,
including `package.json`, `package-lock.json`, the `scaffold repair` set, `src/browser/**`,
`src/server/**`, `tests/src/browser/**`, `tests/src/server/**`, `tests/src/core/MCPClient.test.ts`,
`tests/setup.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`, `dist/**`.

## Deviation contract

Stop and report when a policy rule refuses the inline structural annotation (name the rule and
its message), or when the closed-stream suppression needs a change outside the owned files.
Decide and record wording yourself.

## Acceptance criteria

1. `npm.cmd run lint:check`, `check`, `format:check` exit 0.
2. `npm.cmd run test:src:core` exit 0 with, red first: `terminates with the failure terminal
   when the producer throws undefined`, `ignores registry changes after the stream closed on a
   producer failure` (both cases); every existing pin green unchanged.
3. `npm.cmd run test:guides` exit 0 (the removed row no longer demanded).
4. Searches: `MCPSubscriptionState` appears nowhere under `src/**`, `tests/**`, `guides/**`;
   the two comments are single lines (report each).
5. Only owned files changed beyond the fifteen dirty ones; `git diff --check` clean.

## Output

U4e-e's Output shape: touched files; diff stat over the owned files; status; baseline;
per-behaviour test titles with red-then-green commands and counts; the inline annotation's
form; acceptance readings; the searches; deviation state. Logs under `tmp/codex/U4e-g-*.log`.
