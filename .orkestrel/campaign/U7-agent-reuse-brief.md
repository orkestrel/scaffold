# Unit U7 — `@orkestrel/agent`: observe aborts in tests through `@orkestrel/test`'s `waitForAbort`

## Role and engine

`builder` on Sonnet, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/agent` checkout while this unit runs.

## Objective

Replace every hand-built deferred that observes an abort signal in `tests/src/core/Agent.test.ts`
with the installed `@orkestrel/test` wait helpers, without changing what any test proves.

## Context

**Evidence.** The G6 reuse sweep (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/G6-reuse-sweep-distillate.md`,
row 5) found that `tests/src/core/Agent.test.ts:1644-1658` and `:1685-1713` resolve a
`Promise.withResolvers` from a one-shot `context.signal` `abort` listener and race the result
against `waitForDelay`. `@orkestrel/test` 0.0.14 (installed at `node_modules/@orkestrel/test`)
exports `waitForAbort(signal: AbortSignal): Promise<void>` (already-aborted resolves at once;
otherwise parks on a one-shot listener), `waitForCondition(description, condition, options?:
WaitOptions)`, and `waitForEvent(subscribe, description, options?)`; `WaitOptions` is
`{ budget?, interval?, signal? }`. The file already imports `createRecorder` and `waitForDelay`
from that package. `tests/src/core/tools/ToolManager.test.ts` in the tool checkout already uses
`waitForAbort` at `:216` and `:637` — the pattern to follow.

**The Orchestrator's ruling on the guide fence.** `guides/agent.md:1212-1227` (the cancellation
fence) and its byte-equal transcription in `tests/guides.test.ts:292-307` show a consumer's
handler resolving from its own abort listener. That is the consumer's code, not test
infrastructure; `@orkestrel/test` is a development dependency a consumer does not hold. Leave the
fence and the transcription untouched. The same fence mirrored into ollama's `guides/agent.md`
stays untouched for the same reason.

**Law.** scaffold `AGENTS.md`; `.claude/rules/tests.md` § "Shared test infrastructure" and
§ Condition; `.claude/rules/typescript.md`; `.claude/rules/writing.md`.

**Host.** Windows 11, Git Bash; `npm run <script>` works. No network. The checkout is clean at
`ac7ef43`.

**Standing conditions.** `node_modules/@orkestrel/tool` is the accepted tool tarball installed
`--no-save`; do not touch the manifest or lockfile.

## Scope

**Owned.** `tests/src/core/Agent.test.ts`. **Off-limits.** Everything else, including
`guides/agent.md`, `tests/guides.test.ts`, `tests/setup.ts`, `src/**`, the `scaffold repair` set.

## Execution

1. `grep -n "addEventListener('abort'\|Promise.withResolvers\|performance.now()" tests/src/core/Agent.test.ts`
   and read each hit with its test.
2. For each handler under test that registers an `abort` listener to resolve a deferred: rewrite
   it as `await waitForAbort(context.signal)` followed by the same recording (`observed.handler(...)`)
   and the same return value; drop the deferred it replaced. Keep an `entered` latch the test
   resolves itself, and keep a `completion` latch the test itself resolves (the ignore-signal
   case at `:1728` and `:1753`): those observe no abort.
3. For each `Promise.race([completion.promise, waitForDelay(...)])` that waited for the handler's
   observation: replace with `waitForCondition('<what the test waits for>', () => observed.count
   === 1, { budget: DEADLINE * 6 })` (or the recorder the test already holds), so the wait names
   its condition and fails with it.
4. Run `npm run lint:check`, `npm run format:check` (scoped `npx oxfmt --config .oxfmtrc.json
   --write tests/src/core/Agent.test.ts` is permitted first), `npm run check`, and
   `npm run test:src:core`.

## Output

Final message: the `file:line` of each rewrite with the test title; `git diff --stat`; `git
status --porcelain`; the four command exit codes and the `Tests` summary line; deviation state. No
process diary.

## Deviation contract

Stop and report if a rewrite would change what a test proves, if a hit lies outside the owned
file, or if a helper you need is not in the installed `@orkestrel/test` declaration. Decide and
record wording of `waitForCondition` descriptions.

## Acceptance criteria

1. `grep -n "addEventListener('abort'" tests/src/core/Agent.test.ts` returns nothing.
2. `grep -n "performance.now()" tests/src/core/Agent.test.ts` returns nothing.
3. `npm run lint:check`, `npm run format:check`, `npm run check`, `npm run test:src:core` exit 0
   with the same test count as before (763).
4. Only `tests/src/core/Agent.test.ts` is modified.
