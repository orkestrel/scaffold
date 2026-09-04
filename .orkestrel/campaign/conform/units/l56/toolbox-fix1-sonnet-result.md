All 27 paths unchanged, no new files, all captures present. This completes the round.

## Edits

- `src/core/factories.ts:1452` — `` `@orkestrel/contract` 0.0.7's `explain` mirrors the normalizing `` → `` `@orkestrel/contract`'s `explain` mirrors the normalizing ``, rewrapped by `npx oxfmt`. `git diff` confirms this is the only new hunk in this file for the round; the `find`/`links` hunks are the prior unit's unchanged `resolveLimit` adoption.
- `tests/src/core/shapers.test.ts:263,382,583` — `workspaceToolShape — the 13-op discriminated union` / `databaseToolShape — the 11-op discriminated union` / `relationToolShape — the 5-op discriminated union` → each `… — the operation-discriminated union`.
- `tests/src/server/terminals/TerminalBridge.test.ts:68,225,289,384` and every `fake.`-prefixed reference in those blocks — `fake` → `timer` (word-boundary rename; `churn` and `timer:` keys untouched).
- `src/core/factories.ts:1371` — plant `Math.min(call.limit ?? cap, cap)` applied, red captured, restored to `resolveLimit(call.limit, cap)`, green captured.
- `tests/src/core/factories.test.ts` — new case `a negative \`limit\` option floors the effective limit at 0 for find and links` inserted after the `:2898-2907` case.
- `src/core/shapers.ts:404` — `description: 'Column name to its type.'` → `description: 'Column name to its primitive or its { primitive, optional } spec.'`.
- `/home/user/scaffold/tmp/units/conform/conform-toolbox-report.md` — O2's `:49` fixed, proof-table rows for `toolbox-obj-4/6/8` updated, and `## Fix round 1` appended with every edit, capture, sweep, and ruling, including the R2 deviation.

## Deviation (decided and carried on, not a stop)

**Expected:** the brief's plant (`Math.min(call.limit ?? cap, cap)` at `factories.ts:1371`) would produce a red on `count`.
**Found:** it does not. With `effective = -1`, the `'find'` probe requests `limit: effective + 1 = 0`; the real `@orkestrel/database` driver (`node_modules/@orkestrel/database/dist/src/core/index.js:702-703`) treats `limit: 0` as literally zero rows, so `rows` is already empty before the buggy `slice(0, -1)` runs. `count` and `truncated` read identically under the buggy and fixed forms.
**Evidence:** initial plant run — `1 passed | 200 skipped (201)`, no failure.
**Resolution:** added `expect(isRecord(found) ? found.limit : undefined).toBe(0)` — the only field that differs (`0` fixed vs. `-1` buggy). Re-plant produced `AssertionError: expected -1 to be +0` (`toolbox-obj-2-factory-red.txt`); restore produced a pass (`toolbox-obj-2-factory-green.txt`).
**Done:** yes, R2 closed with a genuine factory-level guard. Neither of the contract's stop conditions fired (the site reads exactly as quoted; the case was written from existing fixtures), so this stayed an ancillary decision.

## Scoped validation

- `npm run format:check` → exit 0 (`gate-format-check-fix1.txt`)
- `npm run lint:check` → exit 0 (`gate-lint-check-fix1.txt`)
- `npm run check` → exit 0 (`gate-check-fix1.txt`)
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/factories.test.ts` → `201 passed (201)` (`toolbox-obj-4-green.txt`)
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/validators.test.ts` → `13 passed (13)` (`toolbox-obj-6-green.txt`)
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/factories.test.ts -t "many executes with identical args return identical results"` → `1 passed | 200 skipped (201)` (`toolbox-obj-8-green.txt`)
- `npx vitest run … -t "a negative \`limit\` option floors the effective limit at 0 for find and links"` → red (`toolbox-obj-2-factory-red.txt`), green (`toolbox-obj-2-factory-green.txt`)
- `grep -n '0\.0\.7' src/core/factories.ts`, `grep -nE '[0-9]+-op' tests/src/core/shapers.test.ts`, `grep -n '\bfake\b' tests/src/server/terminals/TerminalBridge.test.ts`, `grep -n "Column name to its type" src/core/shapers.ts` — all empty
- `git status --short` — 27 paths, unchanged set from before this round

## Sweeps

- `0\.0\.[0-9]` over `src`, `tests` (minus vendored), `guides/toolbox.md`, `guides/README.md`, `README.md`: one hit, `tests/src/core/factories.test.ts:3147` (`known contract 0.0.6 output`), ruled **permitted** — a fixed fixture-data title, not a dated behavioral claim.
- `[0-9]+-(op|arm|operation|element|member|tool)s?\b` over the same paths: empty.

Relevant paths: `/home/user/fleet/toolbox/src/core/factories.ts`, `/home/user/fleet/toolbox/src/core/shapers.ts`, `/home/user/fleet/toolbox/tests/src/core/shapers.test.ts`, `/home/user/fleet/toolbox/tests/src/core/factories.test.ts`, `/home/user/fleet/toolbox/tests/src/server/terminals/TerminalBridge.test.ts`, `/home/user/scaffold/tmp/units/conform/conform-toolbox-report.md`, `/home/user/work/evidence/toolbox-proofs/`.
