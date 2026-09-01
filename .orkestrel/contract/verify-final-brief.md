# Unit verify-final — authoritative gate chain over the campaign result

## Role and engine

`verifier` on Sonnet, native Claude subagent. Independent of every writer; fixes nothing.

## Objective

The exit-code truth of the acceptance gate chain on the contract repository at commit 950a241.

## Context

**Evidence.** The campaign landed commits b3852d9, 1cd4ac8, 7e762ab, fcdd4d0, and 950a241 on
branch `claude/method-memoization-contracts-yus26p`. Every unit ran scoped gates green; this
run is the authoritative tree-wide sweep no writer's self-report establishes.

**Law.** `AGENTS.md` § Work process (the gate order). Skill: none. Guide: none.

**Host.** Linux, `/home/user/contract`, dependencies installed, Node v22.22.2. The `test`
script chain runs several Vitest projects; each command finishes well inside the shell cap.

**Measurements.** none pre-taken; this unit takes them.

**Control identifiers.** none.

**Standing conditions.** `git status --porcelain` must be clean before you start; report and
stop if it is not. `dist/` is rebuilt by the `build` step; a stale `dist/` beforehand is
expected, not a finding.

## Unknowns

none.

## Scope

**Owned.** none — this unit edits nothing.

**Tools and limits.** `Bash` (the exact commands below), `Read`, `Grep`, `Glob`. No edit, no
write, no fix, no commit.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Run each command bare —
no pipeline stage after a gate — read the full output, and continue through the chain even
after a failure so the report carries every gate's state.

1. `git -C /home/user/contract status --porcelain` and `git -C /home/user/contract log --oneline -1`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run build`
6. `npm test`

## Output

Return as the final message, per command: the exact command, its exit code, and its final
result lines (counts for test runs, the failing diagnostic in full on any failure). One line at
the end: every gate's exit code in chain order. No process diary.

## Deviation contract

This unit fixes nothing and diagnoses nothing. A red gate is reported with its complete output
excerpt and the chain continues.

## Acceptance criteria

1. Every command in the list ran and its exit code is reported.

## Review evidence

The command outputs themselves, returned in the final message.
