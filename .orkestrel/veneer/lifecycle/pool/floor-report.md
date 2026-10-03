Implemented `@orkestrel/pool` 0.0.14. Both commits are on `main`; nothing was pushed or published. No budget or timeout was raised. The final tracked tree is clean.

The commits are:

| Change | Commit |
| --- | --- |
| Contract dependency and installed lockfile | `12cf8e73a77289c07dce91f3d1c184d8a74e7a8a` |
| Warm floor, bounded refills, watch, token destruction, tests, and documentation | `aea3bdabe53c2c1f0b39dfff1c292a112789092f` |

`npm install` exited 0 after changing the direct contract range to `^0.0.19`. `npm ls @orkestrel/contract --omit=dev` exited 0 and reported direct contract `0.0.19` plus emitter `0.0.11`'s nested contract `0.0.18`. Emitter still declares `^0.0.18`; it was not changed.

The following evidence maps each requested rule to its failing control and passing implementation. B and C identify the exact commands in the next table. Every red command exited 1; every restored green command exited 0. Filtered-out tests are excluded from the counts.

| Rule | Red and green evidence |
| --- | --- |
| `min`, equal explicit `max`, default maximum, construction without creation | B: 15 failed, then 15 passed. Cases reject zero, negative zero, negative, fractional, non-finite, and unsafe minima; reject either unequal maximum; warm exactly the floor. |
| Required, non-negative safe `restarts`; no default | B: 15 failed, then 15 passed. C(strike): 1 failed, then 1 passed after restoring `strikes > restarts`. With `restarts: 1`, create calls stop at 2 and both startup and queued acquire retain the last cause. |
| `start()`, restart after exhaustion, immediate lazy startup, destruction during startup | B: 15 failed, then 15 passed. Cases cover restart, no lazy creation at startup, rejection with `destroyed`, and cleanup of a late create before teardown completes. |
| Watch fulfillment, duplicate settlement, rejection, and synchronous throw | B: 15 failed, then 15 passed. The synchronous-throw case separately produced 1 failure among 10 race cases, then all 10 passed after startup settlement waited for the refill operation. Rejection reaches `error(error, 'watch')`; a throwing error handler is isolated. |
| Watch abort at disposal, V4 | C(abort): 4 failed, then 4 passed for watch loss, clear, invalid validation, and pool destruction. Token destruction also asserts its watch signal aborts. D: 4 failed, then 4 passed, including a watch that settles because disposal aborts its signal. |
| Exact token destruction and release/destroy idempotence | B: 15 failed, then 15 passed. D: 4 failed, then 4 passed, including an old token destroyed after its record has been leased again. |
| Failed refill and never-leased loss strikes; lease-grant reset | C(reset): 1 failed, then 1 passed. C(used): 1 failed, then 1 passed. The sequence failed create, lease, release, loss, failed refill, successful refill ends with 4 create calls and 1 idle record. |
| Retain failed floor cleanup against capacity, V1 correction | C(retained): 3 failed, then 3 passed. Token, watch, clear, and validation disposal retain failed resources, refuse replacement beside them, and preserve original causes for terminal `cleanup`. |
| Queued acquires never create under `min`, V3 | C(demand): 2 failed, then 2 passed. Disabling the floor branch creates before startup and raises the failed-refill case from 2 create calls to 4. |
| Leased loss earns an attempt after exhaustion, V5 | C(owed): 4 failed, then 4 passed. Covers idle-loss exhaustion, failure of the owed attempt, leased loss during a failing refill, and the reverse ordering. The owed attempt does not revive other spent capacity. |
| Lost records never cross validation or the FIFO ready barrier | C(races): 2 failed, then 2 passed with both ownership guards restored. Both controls ran an engine with working floor creation. |
| No holder, event payloads, acquire options, or token signal, V6 | D: 4 failed, then 4 passed. The surface case asserts only `value`, `release`, and `destroy` on tokens, empty event tuples, and capacity at every event. Typecheck and guide parity preserve `acquire(signal?)`. |
| Existing behavior without `min` | All 41 original Pool cases and all 47 original core cases remain unchanged. An intermediate implementation caused 6 original cleanup failures; restoring direct validation cleanup and lazy cleanup ordering made the Pool file pass 56/56 at that stage. Final core: 77/77. |
| `release` wording, guide, README, TSDoc, version | B proves release events for initial refills. Final guide gate: 23 passed, including the executed floor example. Package and lockfile are 0.0.14; built declarations expose the additions. |

The command definitions and recorded controls are:

| ID | Exact command or selector | Control |
| --- | --- | --- |
| B | `npx vitest run --config vite.config.ts --project src:core tests/src/core/Pool.test.ts -t "Pool floor"` | Original engine versus the initial floor implementation: 15 failed → 15 passed. |
| C | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/Pool.test.ts -t "SELECTOR"` | Replace SELECTOR with the corresponding literal below; run with the named mutation, restore source, repeat the same command. |
| C(strike) | `pins the last allowed failure` | Replace `>` with `>=` in the exhaustion check. |
| C(abort) | `aborts watch\|aborts every watch\|disposes idle loss` | Remove the watch controller's abort. |
| C(reset) | `resets strikes at a lease grant` | Remove the lease-grant strike reset. |
| C(used) | `resets strikes at a lease grant` | Count previously leased records as never leased. |
| C(retained) | `retains failed cleanup against max\|keeps a watch cleanup failure once\|retains clear and invalid-validation` | Disable failed-cleanup retention. |
| C(demand) | `does not create for an acquire before start\|pins the last allowed failure` | Disable the floor-only branch in the waiter pump. |
| C(owed) | `owes a leased loss\|counts an owed refill\|preserves the owed attempt` | Remove the leased-loss refill credit. |
| C(races) | `never grants a` | Remove validation and ready-commit ownership guards. |
| D | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/Pool.test.ts -t "keeps capacity bounded\|ignores an old token\|ignores watches settling\|rejects a restart bound"` | Replay `Pool.ts` from `12cf8e7`, then restore: 4 failed → 4 passed. |

The vertical bars in selectors are regular-expression alternatives. The controls were executed through `node tmp/codex/floor-control.ts NAME` and `node tmp/codex/floor-baseline.ts`, which restore source before returning. The full-file command `npx vitest run --config vite.config.ts --project src:core tests/src/core/Pool.test.ts` finished with 71 passed.

The following gates were read bare after each commit. Every entry reports exit 0.

| Command | Contract commit | Capability commit |
| --- | --- | --- |
| `npm run format:check` | Passed | Passed |
| `npm run lint:check` | Passed | Passed |
| `npm run check` | Passed, including core isolation | Passed, including core isolation |
| `npm run test:src:core` | 47 passed | 77 passed |
| `npm run test:guides` | 22 passed | 23 passed |
| `npm run test:policy` | 112 passed, 1 skipped | 112 passed, 1 skipped |
| `npm run test:config` | 172 passed, 1 skipped | 172 passed, 1 skipped |
| `npm run test:setup` | 3 passed | 4 passed |
| `npm run build` | ESM, CommonJS, declarations | ESM, CommonJS, declarations |
| `npm test` | 356 passed, 2 skipped | 388 passed, 2 skipped |
| `git diff --check` | Passed | Passed |
| `npm run test:distribution` | 9 passed | 9 passed |

Distribution for the contract commit was checked afterward by replaying its exact changed files, building them, and running the package's distribution script through `node tmp/codex/floor-distribution.ts`. The script restored the capability files; its build was then regenerated. Both distribution runs installed local tarballs without publishing.

Discovery exited 0 through `node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-harden/scripts/discovery.js`. Every proof is reached by its declared gate. The empty `probe` project and `test:bench` are workbenches, not gate suites. The existing policy skip concerns the absent locally authored substitution table; the config skip concerns the installed extractor's unavailable-extractor negative branch. Distribution skipped nothing. No test was added with a skip, todo, retry, or enlarged timeout.

Deviations and limits: execution and verification were solo as the brief requires; no independent reviewer was dispatched. Evidence uses direct Vitest controls rather than a `prove` MCP receipt; no probe server was registered. Within the named startup contract, retained failed cleanup rejects `start()` with `cleanup` instead of leaving it pending forever; this is documented and tested. Refills are serialized. Verification ran on Windows on 2026-10-03; Linux was not run. The existing API Extractor version warning and distribution fixture's Node shell warning did not fail their gates. No scaffold-owned file was edited.

`git status --porcelain` produced no output. The report is saved at `tmp/codex/floor-report.md`.