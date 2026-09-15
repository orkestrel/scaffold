# Unit A2-fix, second run — successor to `a2-fix-brief.md`

This brief supersedes one line of `tmp/units/a2-fix-brief.md` and restates the deviation contract.
Everything else in the first brief stands unchanged: the findings F10–F19 and their carriers, the
Owned and Off-limits lists for every other file, the tools and limits, the output shape, and the
acceptance criteria.

## Role and engine

`sol` route (the `implementer` work class) on GPT 6 Astra (`gpt-6-astra`), reached through
`codex exec --sandbox workspace-write` rooted at `C:/Users/mikes/WebstormProjects/agent`. You are
the bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. You are the sole writer in this checkout for the life of this unit.

## What changed and why

The first run stopped, correctly, on an ownership conflict it reported in
`tmp/units/a2-fix-report.md`: the assertion at `tests/src/core/AgentProvider.test.ts:280`
(`expect(body.bytes).toBe(MAX_ERROR_BODY_LENGTH + 512)`) was moved to that value by unit A2's
lookahead (F9), and F10 removes the lookahead, so F10 makes that assertion false — and the first
brief's Owned line for that file admitted only assertions F16's template makes false. The
Orchestrator's ownership line omitted F10's own consequence in the base's test file.

## The superseding line

**Owned, `tests/src/core/AgentProvider.test.ts`.** The exact-bound stall case (F10), the
empty-excerpt case (F16), and every existing assertion that F10's rule or F16's template makes
false — which includes the byte count at `:280`, which returns to `MAX_ERROR_BODY_LENGTH` because
without the lookahead the reader stops after the first chunk that reaches the budget and cancels
the remainder; keep that test's other assertions (the bounded excerpt, `cancelled`, `locked`)
as they are. No other change to that file.

## Standing conditions added

- The tree at launch is `0fa4090`, clean; the first run wrote only `tmp/units/a2-fix-report.md`.
- Git prints a warning that it cannot access `C:\Users\mikes/.config/git/ignore` inside the
  sandbox. The warning is harmless; `git status`, `git diff`, and `git log` still answer.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn
nothing. Read `tmp/units/a2-fix-brief.md` first, then `tmp/units/a2-fix-report.md`, then this
brief, and execute the first brief as amended here.

## Output

Write the report to `tmp/units/a2-fix-report-2.md` and return the same text as your final
message, in the shape the first brief's § Output fixes.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when
a fix needs a file outside Owned or would change a behaviour the ruled contract fixes. Decide,
record, and carry on from test naming and ordering. A shape you must widen inside Owned is not a
stop. An existing assertion inside an Owned file that a carried finding makes false is yours to
change, with the change named in the report.
