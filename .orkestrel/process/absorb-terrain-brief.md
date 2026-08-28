# Unit: absorb-terrain

## Role and engine

`grok` driver → Cursor Grok (`cursor-grok-4.6-high`). Read-only. Spawn nothing.

## Objective

Map every place in `/home/user/process` that would become false if the three functions in
`src/server/execution/` moved into `src/server/helpers.ts` and that folder were deleted.

## Context

- Repository root: `/home/user/process` (a git checkout, branch
  `claude/consolidate-execution-functions-v1y62y`). POSIX host, bash, network available.
- The moving symbols are `execute` (`src/server/execution/execute.ts:60`), `executeSync`
  (`src/server/execution/executeSync.ts:43`), and `detach` (`src/server/execution/detach.ts:30`).
- `src/server/index.ts` re-exports each execution module explicitly.
- The coding authority is `/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/`.
- The working tree is clean apart from `tmp/`, which is git-ignored.

## Unknowns

- Whether any config, test-project glob, lint rule, distribution assertion, or guide-parity
  mechanism names the `execution/` path or the per-file module layout. Report what you find and
  say explicitly where you found nothing.

## Scope

Read-only. Owned files: none. Do not edit, create, or delete anything. Allowed tools: reading and
searching only. Never run `git checkout`, `restore`, `stash`, `reset`, or `clean`.

## Execution

Perform this assignment directly. Spawn no agent.

## Output

Return only:

- `Question`: one line.
- `Evidence`: `file:line` pointers grouped under these headings, with a one-line fact each:
  1. **Source consumers** — every import of `execute`, `executeSync`, `detach`, or an
     `execution/...` path anywhere under `src/`.
  2. **Test consumers** — same, under `tests/`, plus the exact test file paths and their
     `describe` titles.
  3. **Configuration** — every occurrence of `execution` or a per-file server module list in
     `vite.config.ts`, `configs/**`, `tsconfig.json`, `.oxlintrc.json`, `.oxlintignore`,
     `.oxfmtrc.json`, `package.json`.
  4. **Guides and docs** — every occurrence of `execution/`, `execute`, `executeSync`, or
     `detach` in `guides/*.md` and `README.md`, with the heading each sits under. State whether
     any guide text names a file path under `src/server/execution/`.
  5. **Parity and policy mechanisms** — how `tests/guides.test.ts`, `tests/policy.test.ts`,
     `tests/config.test.ts`, `tests/distribution.test.ts`, and `tests/setupPolicy.ts` derive what
     they assert, and whether any of them enumerates source file paths or export names.
  6. **Nothing found** — name each place you searched that had no hit.

No raw file dumps. No design, no decision, no edit.

## Acceptance criteria

- Every heading is present and answered, including "Nothing found".
- Every fact carries a `file:line` pointer.
- `git status --porcelain` is byte-identical before and after.
