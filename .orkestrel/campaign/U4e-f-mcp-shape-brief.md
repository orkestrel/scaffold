# Unit U4e-f — `@orkestrel/mcp`: the subscription stream's state record, its release reason, and the last text and placement items

Successor to U4e-e (`.orkestrel/campaign/U4e-e-mcp-pump-brief.md`; its report
`U4e-e-mcp-pump-report.md`). This file carries the A4l reviewer's findings
(`A4l-audit-reviewer.md`: F1–F3 required, every recommended item, and the release-reason
carry-forward, all accepted by the Orchestrator) with the Orchestrator's rulings, and wins over
any sentence it amends. The A4l checker passed; the P20 replay is green; no vector is red.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. A GPT-6 Astra session wrote
U4e-e; you are the cross-engine hand on its shape. GPT-6 Astra audits this round with the checker.

## Carriers (close every one; each names its ruling)

1. **F2 — the refusal message covers both causes.** `isMCPConsumerFilter` refuses a malformed or
   missing filter as well as a tools claim, and the `MCPError` at `src/core/MCPServer.ts:168-176`
   names only the second. Ruling: one message covering both —
   `The consumer filter must be a valid filter that omits tools changes, because the server
   produces that family from its registry` — and the refusal pin
   (`tests/src/core/MCPServer.test.ts:672-685`) gains the malformed case asserting the same
   code and class. Keep the guide's and the TSDoc's description of the refusal in step.
2. **F3 — the Shape cell is a type shape.** `guides/mcp.md:2537`: `MCPSubscriptionFilter plus
   { toolsListChanged?: false }`, the form the section defines and every other extended row uses.
3. **F1 — the setup test block sits with its siblings.** Move `describe('createSubscriptionScript')`
   in `tests/setup.test.ts` (`:75-132`) below the module constants so the preamble is contiguous
   and the block opens the describe sequence.
4. **One state record per subscription (recommended, accepted).** Replace the three "at most one"
   collections (`failures[]`, `iterators[]`, `unread` Set) threaded through `#startSubscription`,
   `#change`, `#pullSubscription`, and `#failSubscription` with one mutable per-subscription record
   built in `#subscription` and passed as a single parameter, whose members are
   `frame`, `failure`, and `iterator`, each `X | undefined` (`AGENTS.md` § Design laws: absence is
   `undefined`). Behaviour is unchanged; every existing pin stays green untouched. Declare the
   record's type in `src/core/types.ts` if it is reused across methods (name it for what it is,
   single-word members), otherwise keep it private to the class.
5. **The release reason (carry-forward, accepted into this unit).** `#releaseProducer` returns
   the consumer's iterator with `undefined`; for a `ReadableStream`-backed producer that is the
   cancel reason, so the producer's pending writes reject with `undefined`. Ruling: pass the
   stream signal's reason (`options.signal.reason`) at both release sites; state it in
   `MCPSubscriptionHandler`'s `@remarks` (`src/core/types.ts` near `:1763-1767`) beside the
   sentence that tells a producer to observe the signal; pin `releases the consumer producer
   with the stream's abort reason` with a `TransformStream` producer whose pending write rejects
   with the exact reason the test aborted with (red first against `undefined`).
6. **Guide precision and duplication (recommended, accepted).** `guides/mcp.md:919`: "A stream
   read between changes receives one frame per change; changes that arrive together, or while
   the previous frame is unread, coalesce into one." Strike the repeat of the coalescing rule at
   `:927` (the consumer paragraph). Rewrap `:929-946` and `src/core/helpers.ts:1131-1132` to the
   files' widths.
7. **Names and comments (recommended, accepted).** Rename `createSubscriptionScript` →
   `createProducerScript` and `SubscriptionScriptOptions` → `ProducerScriptOptions` (one term:
   what it is is a producer; how it behaves is scripted), with every call site and its tests, and
   extend the helper's `@remarks` to say `failure` throws before `park` is reached. Add the
   one-line comment above the refusal literal at `tests/src/core/MCPServer.test.ts:678` (the
   declared type forbids the literal; the pin proves the runtime refusal a JavaScript caller still
   reaches). Add the one-line comment at `src/core/MCPServer.ts:1491` naming why the
   `!emitter.destroyed` condition stays (the server's intent is explicit rather than resting on
   the installed emitter's tolerance). Sort the inserted import names with their blocks in
   `src/core/validators.ts:60`, `tests/setup.ts:30`, `tests/src/core/MCPServer.test.ts:35`, and
   `tests/src/core/validators.test.ts:25-26`.

## Rulings that stand

Everything U4e … U4e-e landed in the tree: the server owns the tools family; the pull-driven
consumer; the failure delivered after the queued frames; the coalesced registry side; the
destroyed-registry case; `MCPConsumerFilter`; the executed guide proofs; the migrated scenarios.

## Context, law, host, and bench

`AGENTS.md` and `.claude/rules/{names,typescript,architecture,patterns,tests,documentation,writing}.md`
in the scaffold checkout govern; `guides/mcp.md` is the spec. Installed primitives you must
reuse: `@orkestrel/test`, `@orkestrel/contract`, `@orkestrel/emitter`; read their declarations
before writing a helper. **Standing condition:** the tree is DIRTY with the fifteen files of
U4e … U4e-e on commit `7959f08` (uncommitted, audited by A4k and A4l); leave every one of them as
you find it except where a carrier names it. Windows host: Git Bash for the Bash tool; no
heredocs, no `node -e`. Run only scoped Vitest projects (`npm run test:src:core`,
`test:setup`, `test:guides`) and the non-mutating checks; never tree-wide `format` or
`lint --fix`. Do not commit, stash, checkout, restore, reset, clean, or run `npm install`.

## Scope

**Owned.** `src/core/MCPServer.ts`, `src/core/types.ts`, `src/core/helpers.ts` (the remark
rewrap), `src/core/validators.ts` (the import order), `tests/setup.ts`, `tests/setup.test.ts`,
`tests/src/core/MCPServer.test.ts`, `tests/src/core/validators.test.ts` (the import order),
`guides/mcp.md` (the named rows and paragraphs). **Off-limits.** Everything else, including
`package.json`, `package-lock.json`, the `scaffold repair` set, `src/browser/**`, `src/server/**`,
`tests/src/browser/**`, `tests/src/server/**`, `tests/src/core/MCPClient.test.ts`,
`tests/guides.test.ts`, `dist/**`.

## Deviation contract

Stop and report (expected, found, evidence, done or not) if the state record cannot replace a
collection without a behaviour change an existing pin observes, or if the release reason does
not reach a `TransformStream` producer's pending write through `iterator.return(reason)`. Decide
and record the record type's name and placement, and comment wording, yourself.

## Acceptance criteria

1. `npm run lint:check`, `check`, `format:check` exit 0.
2. `npm run test:src:core` exit 0 with, red first: the malformed-filter refusal case and
   `releases the consumer producer with the stream's abort reason`; every existing pin green
   unchanged (the state record changes no behaviour).
3. `npm run test:setup` and `npm run test:guides` exit 0.
4. Searches: `createSubscriptionScript` and `SubscriptionScriptOptions` appear nowhere under
   `src/**`, `tests/**`, `guides/**`; `failures[`, `iterators[`, and `unread.size` appear nowhere in
   `src/core/MCPServer.ts`.
5. Only owned files changed beyond the fifteen dirty ones; `git diff --check` clean.

## Output

U4k's Output shape: touched files with line pointers, per-carrier closure, failing-first test
names with red and green readings, acceptance readings, the searches, baselines (the fifteen-path
status before and after), shared-file patches (none expected), deviation state.
