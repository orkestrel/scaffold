# Verifier brief — U3 final tree gate sweep, run 2 (after the Orchestrator comment edits)

## Role and engine

`verifier` on Sonnet, native Claude subagent, read-only tools plus Bash for the named commands. Perform the assignment directly and spawn nothing. Return the Gate Report shape from your role file and nothing else.

## Objective

Run the default independent sweep on the U3 final working tree of `/home/user/contract` (U3 + U3f + U3g census bump + the Orchestrator comment edits at `src/core/helpers.ts:1996` and `tests/src/core/helpers.test.ts:2992` and `:3254`) over checkpoint 163490f, and report exit-code truth per gate. Run 1 (`u3-final-verifier-report.md`) was GREEN on the tree before the two test-comment edits; this run decides the tree that ships.

## Context

- Repository: `/home/user/contract`, branch `claude/method-memoization-contracts-yus26p`, HEAD 163490f. Seven files are modified and uncommitted; that is the expected state (`git status --porcelain` output follows). Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Standing conditions: `npm run build` prints an API Extractor warning that the project's TypeScript 6.0.3 is newer than its bundled 5.9.3; it is non-fatal and exit 0 on the prior runs. `npm test` chains projects with `&&`, so a failing project stops the later ones; report which projects ran.
- Prior run on the U3 + U3f tree (`/home/user/scaffold/.orkestrel/contract/u3f-verifier-report-1.md`): the `src:core` project failed one test, `tests/src/core/integration.test.ts:967` `expected 217 to be 216`. U3g bumped that pin and the guide sentence at `guides/contract.md:256` to 217. This run decides whether that closure holds tree-wide.
- Run every command from `/home/user/contract` with an explicit `cd /home/user/contract &&` prefix in each Bash call; the working directory does not persist between calls.
- Governing files: `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.agents/orchestration.md`; skill: none.

```
 M guides/contract.md
 M src/core/ContractCompiler.ts
 M src/core/combinators.ts
 M src/core/helpers.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/integration.test.ts
```

## Commands, in order

1. `cd /home/user/contract && npm run format:check`
2. `cd /home/user/contract && npm run lint:check`
3. `cd /home/user/contract && npm run check`
4. `cd /home/user/contract && npm run build`
5. `cd /home/user/contract && npm test`

Run each to completion even when an earlier one fails, and record the exit code of each.

## Scope

Owned files: none. Off-limits: every file in the tree (read and run only; build artifacts under `dist/` and tool caches are allowed to change). Allowed tools: Read, Grep, Glob, Bash for the commands named. Permission limit: no edits, no fixes, no git commands beyond `git status`.

## Output

The Gate Report: per gate the command, PASS or FAIL with the exit code, and on FAIL the exact failing excerpt with its file:line; the per-project test counts on `npm test`; the overall verdict (GREEN only if every gate passed); anomalies one line each.

## Deviation contract

Report a command that does not exist, a script that hangs past 8 minutes, or a tree whose status differs from the status recorded here as a deviation with the exact evidence; do not investigate further.

## Acceptance criteria

1. Every command ran and its exit code is recorded.
2. On `npm test`, the report names each project that ran with its passed and failed counts, and names any project that did not run.
