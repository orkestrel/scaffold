# Review of `465fb2d4f` and `8da606341` — discovery run 3, confirming pass

Lane: objective, Opus 5.5 reviewer, read-only over the worktree tip; it ran no git or Vitest command.

VERDICT: FAIL 1, 4, 5; outside: O1, O2. Item 2 (templates) and item 3 (the `templates` project) PASS.

## 1. Census (`.agents/skills/orkestrel-harden/scripts/discovery.ts`): FAIL

Held: gates come only from collecting listings (`:332-336`); file gates only from non-Vitest commands (`:207-213`); per-test identity (`:344-357`, `:398-404`); the Playwright browser list (`@vitest/browser-playwright/dist/index.d.ts:7`); non-browser wildcard, negation, and case filters; command position for `npm ls vitest` and `vitest list`.

Wrong for five inputs:

- F1. A `!name` filter on a browser project gates tests Vitest never runs. Config: browser project `web` (Playwright, one chromium instance); script `vitest run --project !web`. The canonical listing is unfiltered (`:321-323`); `web (chromium)` matches `^(?!web$)`, so `:334` marks it gated and the census exits 0. Vitest removes the whole browser project when a negation matches its original name (`cli-api.CnMVyzaz.js:11262`, `isExcludedByProjectFilter`). The negation proof (`discovery.test.ts:198-224`) uses only non-browser projects.
- F2. A positional file filter gates the whole project. `node` includes `tests/*.test.ts`; files `tests/a.test.ts` and `tests/b.test.ts`; script `vitest run tests/a.test.ts`. `:189-204` reads only `--config`, `--mode`, and `--project`, and `listCollected` (`:224-234`) passes no filters, so `b` counts as gated though it never runs.
- F3. `vitest bench` still gates ordinary tests. `vitest list` always runs in Vitest mode `test` (`cac.uFydS1Z4.js:2267`); `--mode` overrides only the Vite mode (`cli-api.CnMVyzaz.js:14284`); the include list switches to `benchmark.include` only in Vitest's own `benchmark` mode (`coverage.DM_a_rWm.js:156`, `:381-389`). Input `{"test":"vitest bench --project core"}` reports `core` gated and exits 0. The X2 proof (`discovery.test.ts:273-304`) locks the defect in.
- F4. The per-listing fold splits one project into two rows and double-counts its tests. Browser project `web`; script `vitest run --mode ci --project web`. The canonical listing keeps `web (chromium)` (`:86-93`, `:331`); the `ci` listing folds the same tests to `web`; rows `web` (gated) and `web (chromium)` (ungated) each count the same tests, and the census exits 3.
- F5. The empty-workbench fallback depends on script order. `:401` takes the first gate naming the row in `package.json` key order. With `"bench": "vitest bench --project probe"`, `"test": "npm run test:unit"`, `"test:unit": "vitest run --project core --project probe"`, and `probe` collecting nothing, the gate found is `bench`, `probe` becomes a workbench (`:427-429`), and the census exits 0; swapping the key order exits 3. Classify the row as empty when any gate chain containing ` > ` names it.

## 4. Distribution harness: FAIL

No committed change. The writer's untracked runner `tmp/codex/run-gates.ts:10-18` pointed `TEMP`, `TMP`, and `TMPDIR` at `tmp/codex/gate-resources` for `test:distribution`; the green run used that redirect (`tmp/codex/final3-10-test-distribution.log:9`). `prepublishOnly` runs with the system temporary directory, and no run at `8da606341` under it is recorded. Required: run `npm run test:distribution` at the tip with no temporary-directory override and read the result bare; if a scratch directory inside the checkout is needed, commit it as a harness change with its own proof.

## 5. Parity and rules: FAIL

`SKILL.md:16` states three false rules: `!` negation as Vitest matches it (F1); `benchmark` as the default mode of `vitest bench` (F3, also the opening comment at `:18`); folding only provider browser suffixes from the installed declarations, while `discovery.ts:36` hard-codes the Playwright list, so a webdriverio `x (chrome)` never folds.

## Outside the claims

- O1 `tests/src/core/templates.test.ts:806-814`: the comment about the format and lint sweeps now sits above `describe('live browser factory names')` (`:815`) instead of the `describe('emitted workspaces under their own gates')` it describes (`:923`, cases from `:1339`). Move the inserted `describe` above that comment.
- O2 `discovery.ts:183-186`: a runner beyond the second word is missed (`node --max-old-space-size=4096 node_modules/vitest/vitest.mjs run`, `npm exec vitest run`), giving a false ungated flag (exit 3, the safe direction).
