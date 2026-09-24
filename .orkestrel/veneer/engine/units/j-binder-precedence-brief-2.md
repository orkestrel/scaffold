# Unit J-BINDER-PRECEDENCE — successor brief 2: the tree-wide typecheck red the round-1 unit left

This brief supersedes `j-binder-precedence-brief.md` for one mechanical edit on the same uncommitted worktree. What changed and why: the round-1 unit typed the detail-less events `CustomEvent<null>` (P6) and ran the scoped browser typecheck, which passed, but the tree-wide `npm run check` (the root `tsconfig.json`, which the Orchestrator's run `units/j-binder-precedence-gates.log.txt` records) is red on `tests/src/browser/helpers.test.ts`: the `bindEventMap` proof's hooks are still typed `CustomEvent<undefined>` where the map now says `CustomEvent<null>` (`error TS2322` at (96,34) and (96,56); `error TS2379` at (106,4)).

## Role and engine

`builder` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, and `Bash`; the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-precedence` (branch `unit/precedence`, round 1 uncommitted). Perform the assignment directly and spawn nothing.

## Objective

Make `tests/src/browser/helpers.test.ts` typecheck under the root project by typing its `bindEventMap` proof's hooks and recorders with `CustomEvent<null>` where they read `CustomEvent<undefined>` for a detail-less collapse event, changing no assertion.

## Context

Read the failing lines first: `npx tsc --noEmit --project tsconfig.json` from the worktree prints them. The edit is the type argument only: `CustomEvent<undefined>` becomes `CustomEvent<null>` at each site the diagnostics name in that file (and any sibling site in the same proof that the fix reveals), so the hooks match `CollapseEventMap` in `src/browser/types.ts`. Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`. Host: Windows 11, Git Bash, npm 12.0.2, the worktree root.

## Scope

**Owned.** `tests/src/browser/helpers.test.ts`. **Off-limits.** Every other file. **Tools and limits.** `Edit` on the owned file; `Bash` for `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:browser`, `npx oxfmt --config .oxfmtrc.json --check tests/src/browser/helpers.test.ts`, and `npm run test:src:browser -- tests/src/browser/helpers.test.ts` only; no install, commit, push, or discarding git command.

## Output

Return as your final message: the exact edits (each old and new line), and the output of the four commands verbatim with their exit codes, then `git status --short`.

## Acceptance criteria

1. `npx tsc --noEmit --project tsconfig.json` exits 0. 2. `npm run check:src:browser` exits 0. 3. The format check exits 0. 4. `npm run test:src:browser -- tests/src/browser/helpers.test.ts` exits 0 with the same test count as before the edit (31).

## Review evidence

The Orchestrator re-captures `j-binder-precedence.diff` and `j-binder-precedence-status.txt` after this edit and re-runs its gates; the round-1 audit lanes run on that capture.
