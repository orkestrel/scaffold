# Unit U4e-e — `@orkestrel/mcp`: the subscription stream paces its producers, survives them, and reads in one voice

Successor to U4e (`tmp/codex/U4e-mcp-list-changed-brief.md`, staged beside this file; its report
`U4e-mcp-list-changed-report.md`). This file carries the A4k findings — the objective lane's
claims 2 and 7 (`A4k-audit-analyst.md`), the subjective lane's R1–R14 and its two referrals
(`A4k-audit-reviewer.md`) — with the Orchestrator's rulings, and wins over any sentence it
amends. The Orchestrator's probe `P20-a4k-probe.md` replays the objective lane's two vectors on
the host at your baseline; its red readings are the readings your carriers 1 and 2 turn green.

## Role and engine

`sol` route: GPT-6 Astra, a `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/mcp`. Perform the assignment directly and spawn nothing. You
are the sole writer in this checkout while this unit runs. The `src:core`, `setup`, and
`guides` projects run in the sandbox (U4e ran them; the read-only A4k lane could not, which is a
sandbox difference and not a defect); no browser is needed. Opus 5 audits this round as the
cross-engine lane with the checker, and the Orchestrator replays P20 after you exit.

## Carriers (close every one; each names its ruling)

1. **The consumer producer advances only on demand** (analyst 2, first vector). Ruling: the
   consumer iterator is pulled through the native `ReadableStream` `pull` callback — one producer
   item per pull, parsed, owned, and matched as today — so a reader that reads nothing leaves the
   producer parked after at most the queue's high-water mark; the registry callbacks keep
   enqueuing on their events (carrier 3 bounds them). Release on abort as today. Pin
   `advances the consumer producer only on demand`: acknowledge, write 32 prompts frames into a
   transform-stream producer while the reader reads nothing, and assert the writes beyond the
   demand stay pending until reads resume (red against the free-running loop: P20 read 32 of 32
   resolved); keep a control that a reading client receives all 32 in order.
2. **A producer failure delivers what was queued, then the terminal** (analyst 2, second
   vector). Ruling: a failure thrown by the consumer iterator is recorded and the stream is CLOSED
   rather than errored, so every notification already queued reaches the reader; the outer
   `subscriptions/listen` generator throws the recorded failure after its `for await` completes,
   and `#contain` builds the same detail-free `-32603` terminal it builds today — after the queued
   notifications rather than instead of them. An abort keeps its current path (no terminal). Pin
   `delivers queued notifications before a producer failure's terminal`: the producer yields one
   prompts frame and throws before the reader reads; the reader receives the frame, then the
   terminal (red against `controller.error`: P20 read the terminal first); keep the normal-close
   control.
3. **The registry side coalesces** (reviewer referral 1). Ruling: `notifications/tools/list_changed`
   carries no payload, so a parked reader gains nothing from a second unread frame; a stream holds
   at most ONE unread registry frame, and registry changes that arrive while it is unread coalesce
   into it. That bounds the registry side by construction, with no capacity option. Pin
   `coalesces registry changes while the last frame is unread`: read the acknowledgement, drive a
   loop of `add`/`clear` while nothing is read, then read exactly one frame; a further change
   after that read produces one more. Amend the guide's "one per change" sentence to say a
   promptly read stream sees one frame per change and a parked one sees the changes coalesced.
4. **A destroyed registry** (reviewer referral 2). Ruling: read `tools.emitter.destroyed` (the
   installed `@orkestrel/emitter` declaration names the member) at the stream's start; when the
   registry is already destroyed, register nothing, deliver the acknowledgement, produce nothing
   for the family, and end on the signal as today — no throw reaches the client. Pin
   `acknowledges a tools subscription on a destroyed registry and produces nothing`.
5. **No nested generator in the pins** (analyst 7). Extract the three `async function*`
   producers in `tests/src/core/MCPServer.test.ts` (near `:154`, `:193`, `:235`) into exported
   helpers in `tests/setup.ts`, named for what each scripts (fold into one parametrised helper
   where the shapes allow: frames to yield, a recorder for the filter or the signal, whether to
   park on the signal), tested in `tests/setup.test.ts`, and call them from the pins. Read the
   other core test files for the same form and close each site the same way.
6. **`MCPConsumerFilter` is declared** (reviewer R7). Ruling: declare in `src/core/types.ts` the
   filter a consumer may supply — `MCPSubscriptionFilter` with `toolsListChanged` narrowed to
   `false | undefined` — type `MCPSubscriptionOptions.notifications` with it, make
   `isMCPConsumerFilter` a real `(value: unknown) => value is MCPConsumerFilter` guard whose
   `@param` reads "The unknown value to inspect", keep the runtime refusal for JavaScript callers,
   export the type through the core barrel, and keep the guide's Surface row and the
   `PUBLISHED_GUARDS` entry in step. Pin the guard in `tests/src/core/validators.test.ts`.
7. **The refusal reads in the package's voice** (reviewer R10, R11): the thrown `MCPError`'s
   message is a sentence about the caller's mistake that names why — the server produces the
   tools family from its registry — and the pin asserts the class through the installed
   `isMCPError` guard beside the code.
8. **Shape** (reviewer R8, R9, R12, R13): fold the one-call-site `#listen` into the subscription
   method (carrier 1 rewrites that construction anyway); state the stream lifetime rule — which
   stream ever ends on its own — in the wiring comment that states cancellation ownership;
   render the case-table titles as sentences without quotes (the array form of `it.each`, or a
   title field read as `%s`); fix the relative clause in `src/core/types.ts` near `:1757-1760` so
   the subscription, not the family, is what stays open, and rewrap the paragraph.
9. **Prose that U4e made false or left silent** (reviewer R1, R2, R4, R14, and carriers 1–3):
   `guides/mcp.md` near `:5416-5423` carries the same qualifier as `:935-938` (ending the
   consumer's producer closes gracefully when the honoured filter omits `toolsListChanged`; a
   stream honouring the tools family stays open until its signal aborts); the `probeOwnership`
   remark in `tests/setup.ts` near `:782` names the built-in family as what keeps its exchange
   open; `buildDiscoverResult`'s remark says `tools.listChanged` is always advertised because the
   server produces the family from its own registry; the refresh section near `:4273` leads with
   the registry as the source and says "a second notification written by the application"
   instead of "another publish call"; the conformance gap near `:5178` records that a stream
   honouring the tools family has no graceful end; the server's `subscription` paragraph and
   `MCPSubscriptionOptions.producer`'s TSDoc state that the producer advances on the stream's
   demand, that a failure terminates the stream after the notifications it already produced, and
   that registry changes coalesce while a frame is unread.
10. **Test placement and names** (reviewer R3, R5, R6): move the `MCPServer — registry
    notifications` block below the file's header comment and shared fixtures and give it the
    explanatory comment its siblings carry; rename the `tools` binding in `tests/guides.test.ts`
    near `:1316` to `prompts`; split the refresh proof so the replacement and the removal are
    driven through the same `for await` loop in a second test named for what it proves.

## Rulings that stand

The server owns the tools family; the construction refusal; `tools.listChanged` in discovery;
the executed guide proof; the migrated client and handler scenarios and the discover literals
(U4e-b, U4e-c, U4e-d); the one-queue merge (no installed async-iterable merge primitive).

## Context, law, host, and bench

`AGENTS.md` and `.claude/rules/{names,typescript,architecture,patterns,tests,documentation,writing}.md`
in the scaffold checkout govern: types first; no `any`, no assertions, no nested functions
(only a direct anonymous callback argument or a directly returned anonymous function),
single-word entity members, `#` fields, readonly collections, one class per implementation file,
helpers in their centralized files. Installed primitives you must reuse: `@orkestrel/test`
(`createRecorder`, `createRecorders`, `waitForAbort`, `waitForDelay`, `captureError`, `collect`),
`@orkestrel/contract`, `@orkestrel/emitter` (`on`/`off`/`destroyed`); read their declarations
under `node_modules/@orkestrel/*/dist/src/core/index.d.ts` before writing a helper. Host and
bench as U4e: PowerShell exec shell (`npm.cmd`), `prove` unreachable, network denied; a
grandchild process is denied — nothing here needs one. **Standing condition:** the tree is
DIRTY with the fourteen files of U4e … U4e-d on commit `7959f08` (uncommitted, audited by A4k);
leave every one of them as you find it except where a carrier names it. Run only scoped Vitest
projects and the non-mutating checks; never tree-wide `format` or `lint --fix`.

## Scope

**Owned.** `src/core/MCPServer.ts`, `src/core/types.ts`, `src/core/helpers.ts`,
`src/core/validators.ts`, `src/core/index.ts` (the type export), `tests/setup.ts`,
`tests/setup.test.ts`, `tests/src/core/MCPServer.test.ts`, `tests/src/core/validators.test.ts`,
`tests/guides.test.ts` (carrier 10 only), `guides/mcp.md` (the named paragraphs and rows).
**Off-limits.** `package.json`, `package-lock.json`, the `scaffold repair` set, `src/browser/**`,
`src/server/**`, `tests/src/browser/**`, `tests/src/server/**`, `tests/src/core/MCPClient.test.ts`,
`dist/**`.

## Deviation contract

Stop and report when the demand-driven pull cannot coexist with the registry's push in one
queue without a poll, when the failure ordering needs a change outside the owned files, or when
the installed emitter exposes no way to read that it is destroyed. Decide and record helper
names, paragraph placement, and the coalescing mechanism's field name yourself.

## Acceptance criteria

1. `npm.cmd run lint:check`, `check`, `format:check` exit 0.
2. `npm.cmd run test:src:core` exit 0 with, red first: `advances the consumer producer only on
   demand`, `delivers queued notifications before a producer failure's terminal`,
   `coalesces registry changes while the last frame is unread`, `acknowledges a tools
   subscription on a destroyed registry and produces nothing`; the `isMCPConsumerFilter` pin;
   every existing pin green.
3. `npm.cmd run test:setup` exit 0 with the new helpers tested; `npm.cmd run test:guides` exit 0
   with the split refresh proofs.
4. No `function` or `async function*` expression assigned to a property or a binding inside a
   test body across `tests/src/core/*.test.ts` (report the search and its pattern).
5. Only owned files changed beyond the fourteen dirty ones; `git diff --check` clean.

## Output

U4e's Output shape: touched files; diff stat over the owned files; status; baseline; per-behaviour
test titles with red-then-green commands and counts; the helper names and the coalescing field;
acceptance readings; the search for criterion 4; deviation state. Logs under
`tmp/codex/U4e-e-*.log`.
