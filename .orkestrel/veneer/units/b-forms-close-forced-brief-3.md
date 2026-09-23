# Unit B-FORMS-CLOSE-FORCED (`bff`), round 3 — the validation forced-colours case's run-order dependence

Successor to `b-forms-close-forced-brief-2.md` (round 2, unedited). What changed and why: round
2's report flags that round 1's validation forced-colours case fails when it is the first case to
run in its file (`-t "forced-colors outline"`: "Interactive target "Stated entry" is not reachable
through forward Tab traversal" with an empty trail), and passes in the whole-file run; a fresh
frame has no focused element, so `traverseAccessible` never reaches the control within its Tab
budget. Round 2's criterion 1 kept that case's assertions unchanged, so the fix is this round's.

## Role and engine

`opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bff` (the worktree
over `ccb10a7` holding rounds 1 and 2 uncommitted, which this round builds on and never discards;
`dist/` is built). Perform the assignment directly and spawn nothing. Use absolute paths under
`/home/user/veneer-bff`, run every npm and npx command from there, and run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell. Do not commit, push, install, run `corepack use`, or run `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The validation forced-colours case passes alone and in its file, reaching focus the way the file's
own ring cases do, with its readings unchanged.

## Context

**Evidence.** `tests/src/styles/components/validation.test.ts` around line 378: the case
`keeps the forced-colors outline on a focused $state control, because the state ring writes no
outline` mounts one stated control and a gauge and reaches focus through
`await traverseAccessible('Stated entry')`. The file's older ring cases reach focus with
`host.focus()` (around lines 123, 145, 363) and read `:focus-visible` after a keyboard step where
they need it. The round-2 report (`b-forms-close-forced-report-2.md`, "Claims flagged as weakest")
records the failing command, the error, and the hypothesis. The control proofs' forced cases pass
alone (the report), so only this case changes.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,writing}.md`.
Skill: none. Guide: none owned.

**Installed primitives.** `@orkestrel/test` browser entry (`traverseAccessible`,
`driveTraversal`, `stageMedia`, `releaseMedia`, `readStyle`, `readPixels`).

**Host.** As round 1. **Measurements.** Reproduce the failing command before editing and record
its output. **Control identifiers.** The round-2 weakest claim. **Standing conditions.** The
worktree is dirty with rounds 1 and 2 by design.

## Unknowns

none.

## Scope

**Owned.** `tests/src/styles/components/validation.test.ts` (the forced-colours case only),
`tmp/units/bff-report-3.md`.

**Shared (report-only).** Everything else.

**Off-limits.** Every other file.

**What asserts the state this change ends.** The case itself (Owned).

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/bff-report-3.md`: the failing run before the edit, the diff of the case, each
criterion with its command and result line. Return the same content as your final message.

## Deviation contract

Stop and report where the case cannot reach `:focus-visible` through the file's own pattern.
Decide, record, and carry on for the exact focus mechanism (the file's `focus()` pattern, or a
focused starting element the traversal walks from).

## Acceptance criteria

1. Before the edit: `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/validation.test.ts -t "forced-colors outline"`
   exits 1 with the traversal error; record it.
2. After the edit the same command exits 0, and the whole-file run
   (`npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/validation.test.ts`)
   exits 0; the case's readings (`none`, `solid`, the gauge width, `none`) and its `:focus-visible`
   assertion are unchanged; its comment names how focus is reached.
3. `npx oxfmt --check` over the file, `npm run lint:check`, and `npm run check` exit 0.

**Observations, not criteria.** The scoped five-file styles run.

## Review evidence

The diff of the case and this report.
