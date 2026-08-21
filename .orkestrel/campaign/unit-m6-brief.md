# Unit M6: pin `stop()` against `process.stdin` listeners

## Role and engine

Role `builder`, engine Sonnet, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/probe`. You perform the assignment directly and spawn nothing.

## Objective

The ROADMAP row: mcp 0.0.20's stdin detach shipped
(`node_modules/@orkestrel/mcp/dist/...` carries it; the source detach is
`StdioServerTransport.#release` removing the `data`, `close`, and `error` listeners), but the
pin the finding prescribed never landed — a probe test asserting that after teardown,
`process.stdin.listenerCount('data')` is back to zero. Land that pin.

## Context

Authority: `AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/typescript.md`,
`.claude/rules/writing.md`. Read `tests/src/server/ProbeServer.test.ts` FIRST and follow its
own idiom exactly: it already reads `process.stdin` listener deltas (`readInput()` near the
top), drives `ProbeServer.start`/`destroy` against real stdin flow, and pins the injected
`PassThrough` case at `:237-251`. The gap: no case asserts the `process.stdin` `data` listener
count returns to its pre-start reading after the server's own teardown.

The pin to land, following the file's delta idiom (assert against the BEFORE reading, never a
literal zero — other machinery may hold listeners): record the pre-start
`listenerCount('data')` (and the file's other tracked events if its idiom tracks them), drive
a real `ProbeServer` start-then-destroy (or `stop()` where that is the file's public door),
and assert the counts return to the recorded readings.

## Scope

- Owned: `tests/src/server/ProbeServer.test.ts` only.
- Off-limits: everything else. The tree carries many standing campaign modifications — leave
  every one; your `git status` acceptance is that YOUR change adds only this file's entry
  being already-listed (it is `M` only if a prior unit touched it — measure and report the
  before/after status lines for it).
- No commits, installs, or git checkout/restore/stash/reset/clean. Use `npx.cmd`.

## Acceptance criteria, in this order

1. The before/after `git status --porcelain` lines for the owned file, with no other path
   changing state.
2. `npx.cmd oxfmt --config .oxfmtrc.json --check tests/src/server/ProbeServer.test.ts` exits 0.
3. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings tests/src/server/ProbeServer.test.ts`
   exits 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:server tests/src/server/ProbeServer.test.ts`
   exits 0 with the new pin listed and every pre-existing proof passing; report totals.

## Output

The diff; raw output and exit code per criterion. No process diary.

## Deviation contract

Stop if the file's public teardown door cannot reach the detach (that is a product finding).
Test naming and the exact tracked-event set are yours: decide, record, carry on.
