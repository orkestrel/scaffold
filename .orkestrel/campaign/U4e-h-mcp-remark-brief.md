# Unit U4e-h — `@orkestrel/mcp`: one TSDoc home for the producer's rules, and three small test and comment items

Successor to U4e-g (`.orkestrel/campaign/U4e-g-mcp-failure-brief.md`). This file carries the A4n
reviewer's findings (`A4n-audit-reviewer.md`: R1 required, three recommended, all accepted by the
Orchestrator). The A4n checker passed; P21 is green; no behaviour changes. This is the last text
round before the chain lands.

## Role and engine

`builder` on Sonnet, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. The tree is dirty with the
fifteen files of U4e … U4e-g on commit `7959f08`; leave every one of them as you find it except
where a carrier names it.

## Carriers (make exactly these edits)

1. **R1 — one TSDoc home.** In `src/core/types.ts`, the `MCPSubscriptionHandler` `@remarks`
   (near `:1763-1771`) carries the two sentences "The producer advances on the stream's demand."
   and "A failure terminates the stream after the notifications it already produced." at
   `:1766-1767`, and `MCPSubscriptionOptions.producer`'s `@remarks` (near `:1793-1794`) carries
   the identical pair. Ruling: `MCPSubscriptionOptions.producer` is the single home (demand,
   failure ordering, and coalescing already read there as one paragraph about the configured
   producer). Delete the pair from the Handler remark and rewrap that paragraph to the file's
   width so no line ends short of its neighbours.
2. **The twin failure pins fold.** In `tests/src/core/MCPServer.test.ts`, the pins
   `delivers queued notifications before a producer failure's terminal` (near `:526-552`, the
   `Error` case) and `terminates with the failure terminal when the producer throws undefined`
   (near `:554-579`) differ in one value. Fold them into one `it.each` over
   `[new Error('private producer detail'), undefined]` titled for what it proves —
   `delivers the queued frame before the failure terminal whatever the producer threw (%s)` —
   keeping every assertion of both. Decide the `waitForDelay(10)` inconsistency: the stream is
   demand-driven, so drop the delay unless a run without it is red; record which.
3. **The guard's clause.** At `src/core/MCPServer.ts:1532` (`#change`'s early return), add one
   clause to the guard's comment naming why the failure is the whole closed-stream test: the
   graceful close runs only when the honoured filter omits the tools family, and `#change` is
   registered only when it carries it, so a stream with these listeners closes on a failure or
   its signal and on nothing else.
4. **One term.** In `tests/src/core/MCPServer.test.ts` near `:585`, rename the local binding
   `registry` (`createToolManager({ error: failures.handler })`) to `tools`, with its uses in
   that test.

## Context, law, host, and bench

`.claude/rules/typescript.md` § TSDoc, `.claude/rules/tests.md`, and `.claude/rules/writing.md`
in the scaffold checkout govern. Windows host: Git Bash for the Bash tool; no heredocs, no
`node -e`. The scoped run is `npm run test:src:core -- tests/src/core/MCPServer.test.ts`. Run only
scoped Vitest projects and the non-mutating checks; never tree-wide `format` or `lint --fix`. Do
not commit, stash, checkout, restore, reset, clean, or run `npm install`.

## Scope

**Owned.** `src/core/types.ts` (carrier 1), `src/core/MCPServer.ts` (carrier 3, comment only),
`tests/src/core/MCPServer.test.ts` (carriers 2 and 4). **Off-limits.** Everything else.

## Deviation contract

Stop and report if the folded pin is red in either case, or if a run without the delay is red
(then keep the delay and say why). Decide and record the wording of the guard clause yourself.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:src:core -- tests/src/core/MCPServer.test.ts` exits 0 (one test fewer than
   before the fold, none lost: report the counts before and after).
3. `npm run test:guides` exits 0.
4. Searches: the sentence "The producer advances on the stream's demand." appears exactly once
   under `src/**`; `const registry =` appears nowhere in `tests/src/core/MCPServer.test.ts`.
5. `git status --short --untracked-files=no` names the same fifteen paths; `git diff --check`
   clean.

## Output

Per-carrier before and after; the acceptance readings (command, exit, reading, the counts before
and after the fold); the searches; deviation state.
