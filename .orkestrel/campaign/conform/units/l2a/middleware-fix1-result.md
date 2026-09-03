I have the full report. Now returning the final response.

## Deviation report — fix round 1 stopped incomplete

**Expected.** Row middleware-fix1-1 required failing-first controls for `middleware-obj-2`, `-obj-3`, and `-obj-4`, then the gate chain green.

**Found.**
1. **obj-3 cannot be plant-proved within Owned scope.** Its Repair (`conform-middleware-brief.md:59-65`) creates `tests/src/core/validators.test.ts`, `tests/src/server/parsers.test.ts`, and `tests/src/server/MultipartParser.test.ts`, exercising `isMultipartBody`/`isSession`/`isSessionControl` (`src/core/validators.ts`), `parseMultipartRequest` (`src/server/parsers.ts`), and `MultipartParser` (`src/server/MultipartParser.ts`) — none of which the fix1 brief's Owned list names (Owned names only `src/server/helpers.ts`, and only for row middleware-fix1-4). No helper or fixture from obj-3 landed in `tests/setup.ts` or `tests/setupServer.ts`, the only two files this round permits a plant in. I made no edit to any off-limits file.
2. **`check` and `test` redden on something no row touches.** `npm --prefix /home/user/fleet/middleware run check` exits 2 on `TableInterface<unknown>` not assignable to `TableInterface<SessionRow>` at `tests/setup.ts:369`, `tests/src/core/factories.test.ts:167,170`, `tests/src/core/stores/DatabaseSessionStore.test.ts:225` — every site inside `buildStore` or a `buildStore` call. `npm --prefix /home/user/fleet/middleware test` fails the same way at runtime (`DatabaseError: Driver schema is invalid` inside `node_modules/@orkestrel/database`'s `cloneDriverSchema`), reproduced twice on the tree with every plant already reverted. The predecessor's own `gate-test.txt` (13:24 UTC) carries no such failure. `format:check`, `lint:check`, and `build` still exit 0.

**Evidence.** `/home/user/work/evidence/middleware-proofs/fix1-check.txt`, `fix1-format-check.txt`, `fix1-lint-check.txt`, `fix1-build.txt`, `obj-4-baseline-check.txt`, `obj-4-baseline-check2.txt`, `obj-2-control-red.txt`, `obj-2-control-green.txt`, `obj-4-control-red.txt`, `obj-4-control-green.txt`. Report: `/home/user/scaffold/tmp/units/conform/conform-middleware-report.md` § Fix round 1, § Deviation (fix round 1).

**Done / not done.**
- Done: middleware-fix1-2 (F1 disclosure and Behaviour change section), middleware-fix1-3 (SECRET/TEST_SECRET sweeps), middleware-fix1-4 (`since`→`because` at `src/server/helpers.ts:511`), middleware-fix1-5 (duplicate `isMultipartBody` proof deleted from `tests/src/core/middlewares.test.ts`, with its now-unused imports).
- Two-thirds done: middleware-fix1-1 — obj-2 and obj-4 controls read red then green and both plants were reverted to their exact prior text (confirmed by `git -C /home/user/fleet/middleware diff -- tests/setup.ts tests/setupServer.ts` and a `fix1-plant` marker sweep returning nothing); obj-3 not done.
- Not done: the gate-chain close (`check` and `test` exit nonzero on the unrelated `buildStore`/`@orkestrel/database` drift).
- Evidence regenerated: `/home/user/work/evidence/conform-middleware.diff` (4624 lines) and `.status` (27 entries, every one under Owned), through `node /home/user/scaffold/tmp/work/evidence.mjs middleware`.

**Hypothesis.** The `node_modules` re-stage at 15:22 UTC on 2026-09-03 (named in the fix1 brief's Host section) landed a `@orkestrel/database` build whose `TableInterface` type and driver-schema runtime check disagree with the shape `buildStore` (`tests/setup.ts:363-`, the predecessor's middleware-obj-4 addition) passes it, after the unit's original green `check`/`test` readings were taken against the closure staged before that re-stage.

Files touched: `/home/user/fleet/middleware/src/server/helpers.ts` (row middleware-fix1-4), `/home/user/fleet/middleware/tests/src/core/middlewares.test.ts` (row middleware-fix1-5), `/home/user/fleet/middleware/tests/setup.ts` and `/home/user/fleet/middleware/tests/setupServer.ts` (plants applied and reverted, ending as they began), `/home/user/scaffold/tmp/units/conform/conform-middleware-report.md` (§ Fix round 1 and § Deviation added).
