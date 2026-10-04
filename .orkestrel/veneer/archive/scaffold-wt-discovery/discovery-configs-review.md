# Review of `81ac20857` (objective lane, Opus, 2026-10-03)

VERDICT: FAIL 2, 3, 4, 5; outside: O1, O2, O3.

## 1. PASS

`discovery.ts:93-118` and `:153-170` read `--config`, `--mode`, and repeated `--project` in both forms, and `npm run test:distribution -- --mode release` as a `{vite.config.ts, release}` unit. A script with no `--project` gates every project of its config and mode (`:286`, `:346`).

## 2. FAIL: the census marks a project gated by a gate that never runs it (new in `81ac20857`)

- `discovery.ts:341-351` builds `reachedFiles` from every file any gated project collects; `:376-381` gates any project sharing one of those files; `:363-371` also carries another listing's unfiltered gate the same way, and `:373-375` returns it. On `54f757a7c`, `fileGate` read only `gates.files`.
- Input: `vite.config.ts` with projects `node` and `browser` both including `tests/a.test.ts`; the only script `"test": "vitest run --project node"`. On `54f757a7c`: `ungated: ["browser"]`, exit 3. On `81ac20857`: `browser` gets `gate: "test"`, exit 0.
- Older gap: instance folding uses one `known` set for all units (`:339`, applied at `:309` and `:344`), so `core (chromium)` in unit A folds into a `core` only unit B's gate runs, is marked gated, and a test both units collect counts twice in the `core` row (`mergeCollected:304` keys on the raw name).
- Fix: gate a project only by a gate in a unit that lists it under its own name; restore `fileGate` to `gates.files`; delete the third clause at `:363-371` and the `reachedFiles` source at `:341-351`; build `known` per listing from that listing's gates.

## 3. FAIL: a proof locks in item 2

The four proofs drive real Vitest through `runSkillScript` and each fails on `54f757a7c` as claimed, and the control still reports `ungated: ['orphan']`. But `discovery.test.ts:46-51` asserts that `vite.config.ts`'s own `wrapper (chromium)` has `gate: 'test > test:wrapper'`, a gate that runs a different project (`wrapped` in `wrapper.config.ts`) linked only by a shared file. The control uses separate files, so it cannot catch a false gate through a shared file. Fix: rewrite `:39-52` so `wrapper (chromium)` is `ungated`; add a proof of two projects in one config sharing a file with one gated, the other reported ungated.

## 4. FAIL: `[object Object] (chromium)`

Vitest builds browser instance names from the raw `test.name` (`veneer/node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:14251-14253`); veneer's `sheetProject`, `srcVue`, and `appVue` set `name: { label, color }` (`veneer/vite.config.ts:149`, `:253`, `:426`), and each wrapper (`configs/src/vite.bootstrap.config.ts:5-23`, `configs/app/vite.vue.config.ts:4`) uses one as its root config, so Vitest stringifies the object; as projects of `vite.config.ts` Vitest uses the resolved label (`:10356`). Discovery should not evaluate configs to recover the label (no second Vite config reader). The fix belongs in the configs: an explicit instance name (`instances: [{ browser: 'chromium', name: `${label} (chromium)` }]`). Veneer's census in `veneer-final.json` merges five projects from five configs into one `[object Object] (chromium)` row (6 files, 34 tests) under `test > test:app:vue`, and gates the five `vite.config.ts` rows only through item 2's bridge; several files sit in two rows.

## 5. FAIL: texts

The opening comment (`:11-12`) and `SKILL.md:16` omit the file-overlap rule, and "count repeated tests once across units" is false under item 2's cross-unit fold; the comment omits the `npm run X -- args` forward. After item 2's fix the existing sentences become true.

## 6. PASS: cost

Veneer's census takes 9 `vitest list` runs; none is redundant by design.

## Outside the claims

- O1: `discovery.test.ts:221-235` (the unions proof) never asserts `gate` on the `browser` and `server` rows.
- O2: `discovery.ts:154`, `command.indexOf('vitest')` matches only a bare `vitest` token; `54f757a7c`'s `/\bvitest\b/` also matched `node node_modules/vitest/vitest.mjs run --project x`. Match by basename.
- O3: units keyed by literal mode (`:273`) list `--mode test` and no `--mode` twice, though Vitest's default mode is `test`.
