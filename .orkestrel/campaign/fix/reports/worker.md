# Fix report: worker

## Dispositions

- **s17-23** applied (src/server/helpers.ts, src/server/validators.ts, src/server/index.ts, src/server/Dispatch.ts, src/server/handlers.ts, tests/src/server/helpers.test.ts, tests/src/server/validators.test.ts, guides/worker.md): Re-verified against the current tree: isReply(value, id) still lived in src/server/validators.ts as a two-argument correlated predicate, so the violation stood. Took the repair's first branch, which architecture.md § Kind purity prescribes for wrong file / right name: moved isReply verbatim into src/server/helpers.ts, deleted validators.ts, dropped its barrel row from src/server/index.ts, and repointed the Dispatch.ts import to ./helpers.js. Published surface is unchanged — dist/src/server/index.d.ts still declares `export declare function isReply(value: unknown, id: string): value is Reply;`. Ancillary decisions: (a) tests/src/server/validators.test.ts had to move too, because tests/policy.test.ts rejects an unmirrored module test and its source mirror no longer exists; its describe block moved unaltered into tests/src/server/helpers.test.ts (all eight cases verified running there) and the file was deleted, and guides/worker.md folded that bullet into the helpers.test.ts bullet so no guide link points at a deleted file. (b) Added one @remarks sentence, in third-person voice, stating that isReply correlates on the id argument and is therefore not a Guard<Reply> — the fact a consumer needs, given dispatch takes a Guard; left the deferred-wave first sentence and boolean @returns wording verbatim. (c) Corrected 'total guard' to 'total predicate' / 'total, correlated' in the guides/worker.md fence comment and Threads table row, and repointed the stale validators.ts reference in the handlers.ts header comment. Observation, not a defect found by any gate: helpers.ts and Dispatch.ts now import each other (helpers imports the Dispatch class, Dispatch imports isReply). isReply is a hoisted function declaration and Dispatch uses it only inside a method body, so no temporal-dead-zone risk exists; the Rolldown build emitted no circular-dependency warning and oxlint configures no import/no-cycle rule.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2457ms on 72 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — no output, exit 0
- npm run check: pass — tsc --noEmit --project tsconfig.json, then check:src:core and check:src:server — all clean, exit 0
- npm run build: pass — dist/src/server/index.js 21.17 kB, dist/src/core/index.cjs 8.12 kB, declarations bundled; no circular-dependency warning
- npm test: pass — src:core 106 passed (5 files); src:server 111 passed (1 file); config 46 passed; setup 9 passed; guides 14 passed — 0 failed

## Diffstat

```text
 guides/worker.md                    | 11 +++--
 src/server/Dispatch.ts              |  2 +-
 src/server/handlers.ts              |  2 +-
 src/server/helpers.ts               | 26 +++++++++++-
 src/server/index.ts                 |  1 -
 src/server/validators.ts            | 23 ----------
 tests/src/server/helpers.test.ts    | 83 ++++++++++++++++++++++++++++++++++++-
 tests/src/server/validators.test.ts | 81 ------------------------------------
 8 files changed, 113 insertions(+), 116 deletions(-)
```

- dist moves: true
