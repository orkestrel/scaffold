# Audit verdict — U3 declaration-rollup, round 1 (2026-09-06)

Lanes run: subjective (`reviewer`, Opus 5), objective (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), `checker` (Sonnet), `verifier` (Sonnet). Every lane ran after the relaunch; none returned empty. Verifier: `GATES: RED npm test` on one row, `tests/src/core/compilers.test.ts` › `keeps this repository byte-identical to every configuration it generates`: scaffold's own `vite.core.config.ts` and `vite.server.config.ts` now call `declarationRollup` while the seeded templates in `src/core/templates.ts` still emit `dts(...)`.

## Per claim

| Claim | Subjective | Objective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 load mechanism | PASS (the literal `createRequire` form is the conforming one; `.oxlintrc.json:41` corroborates the lint half) | PASS | CANNOT RULE on the measurement | PASS; the `tsc` half is corroborated by the round-1 `check` green in a tree that installs the extractor and by the writer's control run; a comment at the call records the reason (carried) |
| 2 spawn | PASS | PASS | PASS | closed |
| 3 override | PASS | PASS | PASS | closed |
| 4 options and rewrite | PASS | PASS | PASS | closed; the interfaces sit in `configs/helpers.ts` because no `configs/types.ts` may exist (F3 carried) |
| 5 hook | PASS | PASS | CANNOT RULE on the measurement | PASS; the ordering trace is in the report and the real-build proof pins it (carried) |
| 6 material equality | CANNOT RULE | PASS | CANNOT RULE | PASS on the Orchestrator's own reading after the verifier's `build`: `cmp` exit 0 on core and on server against U1's copies, one `.d.ts` per face, no scratch folder |
| 7 the proof | PASS | FAIL: the proof fabricates the resolved config and drives the hooks by `Reflect.apply`; no Vite build runs; the ordering rationale has no committed proof | PASS | FAIL, carried: the fixture face is driven through a real `build()` with `declarationRollup` in `plugins`, keeping every assertion |
| 8 to 9 | PASS | PASS | PASS | closed |
| 10 flagged carries | PASS | PASS | CANNOT RULE on `configObjectFullPath` | PASS; the byte-identical build is the evidence the token path is tolerated |
| 11 names and prose | FAIL: `both` tallies unnamed members at `configs/helpers.ts:498` and `:503` | (the same finding) | PASS | FAIL, carried |

## Findings outside the claims, each with its ruling

- The red gate row: the seeds are U3's own consequence, so the fix round owns the seeded `vite.*.config.ts` templates, the renderer's `fillTemplate` calls, `nameToRewrite` and its tests and guide row, and the compilers test expectations; U6 no longer carries them (re-baseline recorded).
- Subjective F1: `createRequire(import.meta.url)` is built twice in one hook. Carried.
- Subjective F3: the workspace rule's waiver sentence names `configs/policy.ts` alone. Carried: name `configs/helpers.ts` too.
- Subjective F4 and the objective `rmSync` finding: the scratch emit sits inside the published output and its unconditional removal would take a face's own `declarations` folder. Carried: the scratch moves to a per-run temporary directory outside the workspace.
- Objective: the skip control compares against a fixed `node_modules` path that a hoisted install does not hold. Carried: compare against the resolved path.
- Objective: `succeeded !== true` cannot see errors routed at `logLevel: none`. Ruled: recipe fidelity keeps the reporters off; the distribution proof reads the shipped rollup; carried to the roadmap list for the capability that owns the roll-up.
- Objective: the report's list of `vite-plugin-dts` sites omits `src/core/helpers.ts:419` and `ROADMAP.md:45`. Carried to U6's brief.
- Subjective R3: `isExtractorModule`'s true branch runs only under the skip. Carried: a positive case over a hand-built module.
- Subjective R1, R2, R4: settled by the byte-identical build, the real-build proof, and the scratch move.

Dropped: nothing. Every finding has one carrier: the U3-fix brief or the U6 brief.

## Routing of the fix round

The writer was the Opus `implementer`; the fix is routed to `builder` on Sonnet with every edit prescribed, and its auditors are a clean-context Opus `reviewer` pair plus `checker` and `verifier`.

VERDICT: FAIL 7, 11 and the red gate row — fix round U3-fix dispatched
