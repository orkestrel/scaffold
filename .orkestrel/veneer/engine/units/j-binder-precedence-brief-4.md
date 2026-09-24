# Unit J-BINDER-PRECEDENCE — successor brief 4: the `emitEvent` example's detail argument

This brief supersedes `j-binder-precedence-brief-3.md` for one mechanical edit on the same uncommitted worktree. What changed and why: round 3 stopped on Q5's example because the brief asked it to omit the detail argument while `emitEvent(host, type, detail, cancelable)` requires it (`units/j-binder-precedence-report-3.md` § Deviation state). The Orchestrator rules: the example passes `null`, the value the platform delivers for an absent detail and the type the maps now carry, exactly as the unit proposed.

## Role and engine

`builder` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, and `Bash`; the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-precedence` (branch `unit/precedence`, rounds 1 to 3 uncommitted). Perform the assignment directly and spawn nothing.

## Objective

In `src/browser/helpers.ts`, the `emitEvent` TSDoc `@example` line `if (!emitEvent(host, 'show.vn.collapse', undefined, true)) return false` becomes `if (!emitEvent(host, 'show.vn.collapse', null, true)) return false`, and nothing else changes.

## Scope

**Owned.** `src/browser/helpers.ts`, that one line. **Off-limits.** Every other file and every other line. **Tools and limits.** `Edit` on the owned line; `Bash` for `npx oxfmt --config .oxfmtrc.json --check src/browser/helpers.ts`, `npm run check:src:browser`, and `npm run test:guides` only; no install, commit, push, or discarding git command.

## Output

Return as your final message: the old and new line, the three commands' output verbatim with exit codes, and `git status --short`.

## Acceptance criteria

1. The format check exits 0. 2. `npm run check:src:browser` exits 0. 3. `npm run test:guides` exits 0 (the example is not a titled fence the guide mirrors; report the reading either way).
