# Fix report: process

## Dispositions

- **s13-15** deferred_breaking: Re-verified: `ProcessChild` is still declared at `src/server/types.ts:25` and is a published export of `@orkestrel/process/server` — the barrel star-exports `./types.js`, the guide documents it in the Server contracts table, and `tests/guides.test.ts` pins the name in the `REFUSALS` parity list. Renaming an exported symbol is on the defer list, so nothing was applied.
- **s13-16** applied (src/server/cloners.ts, src/server/helpers.ts, src/server/index.ts, src/server/Process.ts, src/server/Supervisor.ts, tests/src/server/cloners.test.ts, tests/src/server/helpers.test.ts, guides/process.md): Re-verified against the merged tree: the declaration sat at `src/server/helpers.ts:157`, the importers were `Supervisor.ts` and `Process.ts` plus three in-file call sites; `Session.ts` does not reference it and `src/server/execution/execute.ts` no longer exists. Added `src/server/cloners.ts` with `snapshotCommand` moved unchanged, added `export * from './cloners.js'` to `src/server/index.ts` so the published surface is identical, and repointed both class importers and the three in-file call sites through a `./cloners.js` import in `helpers.ts`. Moved the two `snapshotCommand` cases to a new `tests/src/server/cloners.test.ts` and added its row to the guide's Tests section.
- **s13-17** applied (src/server/types.ts, src/server/Supervisor.ts, guides/process.md, tests/guides.test.ts): Re-verified: the inline structural bundle was still in the `Supervisor` constructor and both `Process.ts:113` and `Session.ts:83` construct one. Declared `SupervisorFace` in `src/server/types.ts` with the same six readonly members (`chunk`, `fault`, `relieve?`, `close`, `terminal`, `teardown`) and referenced it from the constructor, which collapsed to one line. `src/server/types.ts` is barrelled, so this is an additive published export: parity therefore required a Surface row under Server contracts in `guides/process.md` and a `'SupervisorFace'` entry in the `REFUSALS` foreign list in `tests/guides.test.ts`. Both added. `Supervisor` itself stays stranded in the `INTERNALS` table, unchanged.
- **s13-18** applied (src/core/errors.ts): Re-verified: `ProcessError` still carried a single-line TSDoc with no `@example` while `isProcessError` and the `create*` factories each carry one. (`Retention` is gone from the tree; that does not affect the repair's subject.) Expanded the class TSDoc with an `@example` constructing a `ProcessError` with a code and a context. Ran the fence against the built `dist/src/core/index.js`: it reports `code` as `'invalid'` and `context` as `{ command: 'git status' }`, so the `// 'invalid'` comment is true.
- **s13-19** applied (src/core/types.ts): Re-verified: `ExecuteResult.signal` and `ExecuteInput.code`/`signal` were the only undocumented members of those interfaces. Gave each `signal` the wording `ProcessExit.signal` already carries — "The terminating signal name, or `null` when the process exited on its own." — and gave `ExecuteInput.code` the wording `ExecuteResult.code` carries, which is faithful because `buildExecuteResult` passes both fields through unchanged.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 1996ms on 54 files using 4 threads. (exit 0; required one converge cycle of `npm run lint` then `npm run format` on guides/process.md and src/server/Process.ts, both files I wrote)
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — no diagnostics, exit 0
- npm run check: pass — tsc --noEmit --project tsconfig.json, then check:src:core and check:src:server against configs/src/tsconfig.core.json and configs/src/tsconfig.server.json — exit 0
- npm run build: pass — 10 modules transformed; dist/src/server/index.js 79.12 kB; declaration files built in 2238ms; built in 2.58s; Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts — exit 0
- npm test: pass — src: Test Files 6 passed (6), Tests 184 passed | 8 skipped (192). policy: 111 passed. config: 46 passed. setup: 10 passed. guides: Tests 102 passed | 1 skipped (103). Exit 0.

## Diffstat

```text
 guides/process.md                | 11 ++++++++---
 src/core/errors.ts               | 13 ++++++++++++-
 src/core/types.ts                |  3 +++
 src/server/Process.ts            |  9 ++-------
 src/server/Supervisor.ts         | 15 +++------------
 src/server/helpers.ts            | 37 +------------------------------------
 src/server/index.ts              |  1 +
 src/server/types.ts              | 28 ++++++++++++++++++++++++++++
 tests/guides.test.ts             |  1 +
 tests/src/server/helpers.test.ts | 34 ----------------------------------
 10 files changed, 59 insertions(+), 93 deletions(-)

Two files are new and untracked, so `git diff --stat` does not count them: src/server/cloners.ts (35 lines) and tests/src/server/cloners.test.ts (34 lines). Full `git status --porcelain`: M guides/process.md, M src/core/errors.ts, M src/core/types.ts, M src/server/Process.ts, M src/server/Supervisor.ts, M src/server/helpers.ts, M src/server/index.ts, M src/server/types.ts, M tests/guides.test.ts, M tests/src/server/helpers.test.ts, ?? src/server/cloners.ts, ?? tests/src/server/cloners.test.ts. No off-limits file appears. The tree is uncommitted and unstaged.
```

- dist moves: true

## Deviations

Two judgment calls, neither blocking.

1. s13-16 lane detail. The two lane amends agree on the code move, the barrel row, and the corrected importer list, and I applied exactly that. They differ on follow-on files: one amend also moved the test cases and named `guides/process.md:105` and `:762`; the other named neither. I moved the tests, because `.claude/rules/tests.md` maps `src/server/cloners.ts` to `tests/src/server/cloners.test.ts` and the cases' scope is now that module, and I added the matching row to the guide's Tests section so `tests/guides.test.ts` still finds every test file listed. I did not move the `guides/process.md:105` surface row out of "Command helpers" and did not move the `:762` fence: those tables and fences group by concept and by published specifier, not by source file, and the specifier `@orkestrel/process/server` is unchanged. Applying the file-shaped move there would have split a concept table for a reason the guide does not organize by.

2. s13-17 published-surface consequence. `.claude/rules/typescript.md` § Types puts the reusable type in `src/server/types.ts`, which the barrel star-exports, so `SupervisorFace` becomes a published export. That is an additive export and so on the apply list, but it does widen the surface: parity then required a guide Surface row and a `'SupervisorFace'` entry in the `REFUSALS` foreign list in `tests/guides.test.ts`, both of which I added. Worth a ruling from the orchestrator, because `Supervisor` itself is deliberately stranded in the `INTERNALS` table with the rationale that no consumer can construct one — so a consumer now receives the face type for an engine it cannot reach. Reverting is a one-line change if the fleet prefers the type stay unpublished, but there is no non-barrelled types module in this package to hold it.

No finding's repair required an off-limits file, and no lane correction conflicted in a way re-verification could not settle.
