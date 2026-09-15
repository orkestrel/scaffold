# Unit U8d — `@orkestrel/tool`: pin the third-instance replacement vector

## Role and engine

`builder` on Sonnet, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/tool` checkout while this unit runs.

## Objective

Add the one test the A8b reviewer named (`.orkestrel/campaign/A8b-audit-reviewer.md` claim 3):
during a replacement, a `remove` listener installs a third instance under the same name; the
published stream is `remove(previous)`, `remove(replacement)`, `add(third)`; `add` never carries
`replacement`; the registry ends holding `third`. This is the vector that separates the identity
check at `src/core/tools/ToolManager.ts:72` (`=== tools`) from a presence check
(`!== undefined`), which every existing test leaves green.

## Context

The case sits beside `replacement reentry preserves publication consistency` in
`tests/src/core/tools/ToolManager.test.ts` (around `:299`) and uses the same instruments: real
`ToolManager`, `createTool`, `createRecorders(manager.emitter, ['add', 'remove'])` from
`@orkestrel/test` (explicit type arguments as the file already writes them — inference was
refused, `U8c-inference.log.txt`). Register `manager.emitter.once('remove', () => manager.add(third))`
before the replacing `add`. Name the test for what it proves, in the file's voice:
`publishes the third instance a removal listener installs during a replacement`.

Mutation control (the red reading): before writing the test, change `:72` to `!== undefined`,
run the new test (it must fail), restore `=== tools`, run it again (it must pass); capture both
runs' per-test output to `tmp/probe/U8d-red.log.txt` and `tmp/probe/U8d-green.log.txt` (create
the directory; delete both files and the directory before you return, after copying their
contents into your report verbatim).

**Law.** scaffold `AGENTS.md`; `.claude/rules/tests.md` § "Shared test infrastructure".

**Host.** Windows 11, Git Bash; `npm run test:src:core -- -t "<title>"` runs one test.

**Standing conditions.** The tree is dirty with U8a, U8b, U8c (accepted); `tmp/` is ignored.

## Scope

**Owned.** `tests/src/core/tools/ToolManager.test.ts`; `guides/tool.md` `## Tests` list (one
title added, if that section lists titles); `tmp/probe/**` (transient). **Off-limits.** Everything
else, including `src/**` beyond the transient mutation you restore byte-for-byte.

## Output

Final message: the test's `file:line`; the red and green per-test output verbatim; `git diff
--stat`; `git status --porcelain` (must show `src/core/tools/ToolManager.ts` unchanged from
before you started — compare its `git diff` hunk count before and after); `npm run test:src:core`
exit and count; deviation state.

## Acceptance criteria

1. The test exists and passes; the mutation made it fail (both captured).
2. `npm run test:src:core` exit 0 (90 tests); `npm run lint:check`, `npm run format:check` exit 0.
3. `src/core/tools/ToolManager.ts` byte-identical to its state before the unit.
4. `tmp/probe/` removed.
