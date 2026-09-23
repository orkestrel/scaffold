# Unit TM-FIX brief: the guides runner's setup import (fix round on TEST-MATRICES)

## Role and engine

The Orchestrator on Opus 5.5 writes this unit. The TEST-MATRICES audit (`checker` on Sonnet, `analyst` on GPT-6 Astra) covers it, because neither engine wrote it.

## Objective

`npm run test:guides` exits 0 after TEST-MATRICES moved the guides suite's tables into `tests/setup.ts`.

## Context

- Finding: the Orchestrator's full chain at `46336ac` (`tm-full-gates.log.txt`) exits 1 at `test:guides` with `ERR_MODULE_NOT_FOUND` for `tests/setup.js`. The script runs `node --experimental-strip-types tests/guides.test.ts`, with no bundler to map a `.js` specifier to its `.ts` source. The builder could not see it, because its worktree had no `dist/` and the run stopped earlier.
- `tsconfig.json` sets `allowImportingTsExtensions`, so a `.ts` specifier typechecks.
- The existing dynamic `import('./setup.js')` in the file's executed section runs inside Vitest and stays as it is.

## Unknowns

None.

## Scope

- Owned: `tests/guides.test.ts` in `/home/user/test`, the static setup import and the file's header comment.
- Off-limits: every other file.

## Execution

The Orchestrator edits the file directly on `46336ac`.

## Output

`tm-fix.diff`, `git status --porcelain`, and `tm-fix-gates.log.txt`.

## Deviation contract

See `.agents/orchestration.md` § Deviation protocol.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:guides` exits 0.
3. The full chain `t4-full-gates.sh` exits 0 at every gate at the fix commit.

## Review evidence

`tm-fix.diff`, `tm-fix-gates.log.txt`, and the full chain's log at the fix commit.
