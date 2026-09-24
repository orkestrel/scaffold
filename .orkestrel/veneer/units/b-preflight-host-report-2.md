# PREFLIGHT-HOST (`pl`) round 2 report

Round 2 closes every item in brief 2. The preflight proof passes under the host defaults and under the staged Chromium 153 defaults. It fails on every item-1, item-2, and item-3 mutation. `pl-shared-2.patch` replaces `pl-shared.patch` in full.

## Changes by item

1. **Coverage.** For each mounted tag, the pairing reads the reset's property population plus every longhand that Veneer's elements layer declares for the tag. It asserts that each of those longhands keeps its standalone value. Each kept entry records its value, and a guard requires `table | caption-side | top`.
2. **Dimension key.**
   - `tests/setupStyles.ts` exports a `PreflightDimension` interface beside `PreflightDeparture`, with `dimension`, `tags`, and `edges` members.
   - The `PREFLIGHT_DIMENSIONS` table and the `computeContentExtent` parameter use that type. The height row is keyed to `input`, `select`, and `textarea`.
   - The pairing and the refused-row check match on both the dimension and the tag. A height move on any other tag is a move like any other.
3. **Control.**
   - **Run result.** Round 1's control stayed green with the staging moved to `@layer base.defaults` (`pl-r4-round1-base-defaults.log.txt`, exit 0, `4 passed (4)`).
   - **Added check.** The control restates, at `initial` and inside the staged layer, every longhand the cascade declares for `table` and `select`: rules from the layers before `elements`, matched through `tag:is(selector)`, plus the elements-layer rules. The control asserts that no reading changes.
   - **Discrimination.** The same sheet in a later `control` layer must move a longhand from an earlier layer and a longhand from the elements layer, so the check can fail.
4. **Titles.**
   - Pairing case: "keeps every longhand the elements layer declares, holds each moved form-control height to its content box height, and every other move to its recorded preflight value, under %s".
   - Rows: `the host defaults` and `staged Chromium 153 defaults`.
   - Control case: "places the staged Chromium 153 defaults beneath the whole cascade and the profile".
5. **Guide (`pl-shared-2.patch`).**
   - Each longhand Veneer declares is asserted unchanged.
   - Every measured move other than a form control's height is a row.
   - Border style: the universal rule declares it wherever Veneer leaves it unset.
   - Tab size: the `html` rule declares it and every element inherits it.
   - One term, content box height.
   - A `table` border color resolves to the text color.
   - The proof passes under the host defaults and under the staged stand-in. The stand-in fixes the `select` content box height at 21px, so the proof does not measure that height on Chromium 153.
6. **Service reading.** `npm run test:service` ran once on the round-2 tree, in the scratch copy with the patch applied.

## Red runs (`pl-mutations-2.log.txt`)

The instrument is `pl-mutations-2.sh`. Run `pl-scratch-2.sh` first to create the scratch copy it edits.

| Mutation | Result line | Failing assertion |
| --- | --- | --- |
| C1: a later-layer profile rule sets `caption-side: bottom` on `table` | `2 failed \| 2 passed (4)` | `table \| caption-side \| bottom` against `top` |
| C2: the reading drops the declared longhands (the reset population only) | `2 failed \| 2 passed (4)` | guard `table \| caption-side \| top` |
| D1a: reset `hr` height `5px`, no row | `2 failed \| 2 passed (4)` | move not recorded: `hr \| height \| 5px` |
| D1b: the same move with an `hr \| height \| 5px` row | exit 0, `4 passed (4)` | passes, because the move is recorded like any other |
| D2: `select` dropped from the height tags | `2 failed \| 2 passed (4)` | guard `select \| height` |
| D3: guide row `select \| height` | `2 failed \| 2 passed (4)` | refused: `select \| height` |
| D4: edge `padding-top` dropped | `2 failed \| 2 passed (4)` | `input \| height \| 21` against `22` |
| D5: `width` in place of `height` | `4 failed (4)` | population, lookup, and guard |
| S1: staging in `@layer base.defaults` | `1 failed \| 3 passed (4)` | control: `box-sizing` moves |
| S2: staging in top-level `@layer defaults` | `2 failed \| 2 passed (4)` | control: `box-sizing` and `border-collapse` move |
| S3: empty staged layer | `1 failed \| 3 passed (4)` | control: the `table` border color |

The round-1 mutations were re-run on the round-2 tree, and each still reddens: M1a, M1b, M2 (build exit 0), M3, M12, M9, M10, and M11 (M11 also adds an unrendered tag).

The reset's `height: auto` never moves the `img` fixture's height. Its height reads `0px` before and after, even with the reset's value mutated to `10px`. D1a and D1b therefore show the keying on `hr`.

## Gates

Each log prints its exit on its last line.

| Command | Where | Exit | Result line |
| --- | --- | --- | --- |
| `npx oxfmt --check tests/service/tailwind/preflight.test.ts tests/setupStyles.ts tests/setupStyles.test.ts` | worktree | 0 | "All matched files use the correct format." (`pl-gate-format-2.log.txt`) |
| `npm run lint:check` | worktree | 0 | no diagnostics (`pl-gate-lint-2.log.txt`) |
| `npm run check` | worktree | 0 | (`pl-gate-check-2.log.txt`) |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | worktree | 0 | `Tests  149 passed (149)` (`pl-setup-2.log.txt`) |
| `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project service tests/service/tailwind/preflight.test.ts` | scratch copy with patch | 0 | `Tests  4 passed (4)`, both rows (`pl-green-2.log.txt`) |
| `npm run test:guides` | scratch copy with patch | 0 | `Tests  20 passed (20)` (`pl-test-guides-2.log.txt`) |
| `npx oxfmt --check guides/veneer.md` | scratch copy with patch | 0 | (`pl-guide-format-2.log.txt`) |
| `npm run test:service` | scratch copy with patch | 0 | `Test Files  3 passed (3)`, `Tests  20 passed (20)` (`pl-test-service-2.log.txt`) |
| `git apply --check .orkestrel/veneer/units/pl-shared-2.patch` | worktree | 0 | |

## Files

All paths are under `/home/user/veneer-pl/tmp/units/`:

- `pl-2.diff`: both rounds against `fc3ddfe`. It covers the service proof `tests/service/tailwind/preflight.test.ts`, the setup module `tests/setupStyles.ts`, and the setup proof `tests/setupStyles.test.ts`.
- `pl-2-status.txt`
- `pl-shared-2.patch`
- `pl-mutations-2.log.txt`
- `pl-mutations-2.sh` and `pl-scratch-2.sh`
- `pl-round1-preflight.test.ts.txt`: the round-1 service proof, kept for comparison.

The patched guide the mutation script restores from is `/home/user/veneer-pl/tmp/probe/pl-guide-patched-2.md`.

Nothing was written to the session scratchpad. No stop condition was reached.
