# PREFLIGHT-HOST (`pl`) report

The preflight proof passes under the host's Chromium 141 defaults and under staged Chromium 153 `select` and `table` defaults. It reddens on every named mutation. It needs `pl-shared.patch` applied to the guide. Without the patch, the worktree's proof reds on the `input`, `select`, and `textarea` `height` rows the guide still records (`pl-worktree-unpatched.log.txt`). No stop condition was reached.

## Touched files

The following owned files changed. Diffstat: 3 files changed, 284 insertions(+), 54 deletions(-).

- `tests/service/tailwind/preflight.test.ts`: runs the pairing once per build in the `PREFLIGHT_BUILDS` table. Compares each move by tag, property, and preflight value. Holds a moved height to its content extent. Adds a control case that proves the staged defaults reach the page beneath the cascade and the profile. Drops the always-true `not.toBe` assertion, which sat inside the branch where the two values already differ.
- `tests/setupStyles.ts`: adds the frozen `PREFLIGHT_BUILDS` table (build, staged sheet) and the frozen `PREFLIGHT_DIMENSIONS` table (`height` and its border and padding edges). Adds the `computeContentExtent` helper. The `readPreflightDepartures` reader is unchanged, because the new comparison uses the same row shape.
- `tests/setupStyles.test.ts`: adds `PREFLIGHT_BUILDS`, `PREFLIGHT_DIMENSIONS`, and `computeContentExtent` to the export list. Adds a proof for each table (frozen; the staging sits in a sublayer of the first layer the built cascade places; each edge is a physical padding or border-width longhand) and a proof for `computeContentExtent` (border-box, content-box, no `box-sizing`, a non-pixel value, a missing edge, and negative zero).

## Classification of each moved row

The probe `pl-classify-probe.test.ts.txt` produced this classification (output in `pl-classify.out.txt`). A move counts as declared when a `base`-layer rule whose selector matches the fixture element (read as `tag:is(selector)`) declares that longhand.

- **Declared by the reset. Compared by preflight value.**
  - Every `border-*-style` row and every `tab-size` row, from the universal rule and the `html` rule.
  - The `html` rows for `font-family`, `line-height`, and `-webkit-tap-highlight-color`.
  - The `display` rows for `iframe` and `svg`, and the `vertical-align` row for `iframe`.
  - For `input`, `select`, `optgroup`, and `textarea`: `border-*-color`, `border-*-width`, `color`, and `background-color`, plus `font-weight` for `optgroup`.
  - The physical `padding-*` rows for `input` and `textarea`.
  - The `table | border-*-color` rows.
- **Consequences with a build-independent value. Kept in the equality population.**
  - `text-decoration-color` for `input`, `select`, `optgroup`, and `textarea`. Its initial `currentcolor` resolves to the `color` the reset declares as `inherit`.
  - `padding-block-start`, `padding-block-end`, and `padding-inline-start` for `input` and `textarea`. Each is the logical mirror of a physical padding the universal `padding: 0` sets.
  - Each follows a declared value one to one, so its preflight value is the same on every build.
- **Consequences with no build-independent value. Left the equality population.**
  - `input | height`, `select | height`, and `textarea | height`.
  - The reset declares no height for a form control. The height drops by the padding and border the reset zeroes, around a content box the build renders: 18px for `select` on Chromium 141, 21px on Chromium 153.
  - The build-independent reading is the content extent: the height less its vertical padding and border under `border-box` sizing. The profile leaves it unchanged.
- **Outside the population.** `width` also moves on the `input`, `select`, and `textarea` controls. The proof's property population excludes the profile's generated utilities, and `width` comes only from those, so no proof reads it.

## Comparison shape after the change

The proof makes these checks for each build in `PREFLIGHT_BUILDS`:

- Every property Veneer's `elements` layer declares for the tag keeps its standalone value. This check is unchanged.
- A moved dimension from `PREFLIGHT_DIMENSIONS` is held to equal content extents, standalone and paired.
- Every other move (`tag | property | preflight value`) is a recorded row.
- Every recorded row is the value the profile resolves for its pair, whether or not that build's default already held it.
- No recorded row names a pair Veneer declares, or a dimension.
- Non-empty guards: `hr | border-top-style` is kept, `html | tab-size | 4` moves, and `select | height` is a moved dimension.

The Standalone column is informational and no assertion reads it.

## Emulated-build reading

The staged sheet is `@layer theme.defaults { select { background-color: Field; contain: size; contain-intrinsic-height: 21px } table { border-color: currentcolor } }`, loaded before the standalone reading. The host row loads `@layer theme.defaults {}`, because Playwright's `addStyleTag` method refuses empty content.

The following readings come from `pl-classify.out.txt`:

| Reading | Without staged defaults (Chromium 141) | With staged Chromium 153 defaults |
| --- | --- | --- |
| `select` height | `20px` to `18px` | `23px` to `21px` |
| `table` border colors | `rgb(128, 128, 128)` to `oklch(0.208 0.042 265.755)` | no move |
| `select` background | `rgb(239, 239, 239)` to transparent | `rgb(255, 255, 255)` to transparent |

These match the engine session's Chromium 153 row.

**Failing-first proof.** The pairing ran under the host build and the staged Chromium 153 build, with the comparison unchanged:

- Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project service tests/service/tailwind/preflight.test.ts`
- Exit 1, `Tests  1 failed | 2 passed (3)`. The failing case is the Chromium 153 pass.
- The diff reads `select | height | 21px` against `18px`, and the `table | border-*-color` rows are absent. This matches the engine session's reading.
- Log: `pl-red-baseline.log.txt`.

**After the fix.** The same command ran in the scratch copy with the patch applied:

- Exit 0, `Tests  4 passed (4)`. The host-build and Chromium 153 passes are green.
- Log: `pl-green.log.txt`.

**How the emulation stands in for the real build.**

- The staged rules sit in a sublayer of `theme`, the first layer the built cascade places. Every rule of the cascade and the profile beats them, the way author rules beat the user-agent origin.
- The staging reproduces only the differences the Chromium 153 reading names: the `select` background, the `select` content height, and the `table` border color.
- Size containment fixes the `select` content height, and it also fixes the content width. `width` is outside the population, so this changes no reading.
- A real user-agent origin also differs in `!important` and `revert` handling. No declaration in the pairing uses either.
- The control case "stages the Chromium 153 defaults beneath the cascade and the profile" proves the staging reached the page. The staged `table` border color equals the text color. The `select` content extent equals the staged `contain-intrinsic-height`. The profile's background beats the staged one.

## Mutations and their red runs

`pl-mutations.log.txt` records the site, command, build exit, test exit, summary line, failing cases, and message for each mutation. The instrument is `pl-mutations.sh`. Run `pl-scratch.sh` first, because the mutation script edits the scratch copy it creates.

| Mutation | Result line | Assertion that reddens |
| --- | --- | --- |
| M1a: preflight value changed (`vertical-align: middle` to `top`) | `Tests  2 failed \| 2 passed (4)` | move not recorded: `iframe \| vertical-align \| top` |
| M1b: preflight value changed (replaced elements `display: inline`) | `2 failed \| 2 passed (4)` | row not resolved: `iframe \| display \| block` and one more |
| M2: Veneer declaration stops holding (`_ul.scss` `list-style-type: revert-layer`; build exit 0) | `2 failed \| 2 passed (4)` | kept: `ul \| list-style-type \| none` vs `disc` |
| M3: guide row removed (`a \| tab-size`) | `2 failed \| 2 passed (4)` | move not recorded: `a \| tab-size \| 4` |
| M4: guide preflight cell changed (`html \| tab-size` to `2`) | `2 failed \| 2 passed (4)` | move not recorded: `html \| tab-size \| 4` |
| M5: guide records a dimension (`select \| height` row) | `2 failed \| 2 passed (4)` | dimension row on the host pass; row not resolved (`select \| height \| 18px`) on the Chromium 153 pass |
| M6: dimension edge dropped (`padding-top`) | `2 failed \| 2 passed (4)` | content extent: `input \| height \| 21` vs `22` |
| M7: staging above the cascade (`@layer defaults`) | `2 failed \| 2 passed (4)` | control: background not overridden; Chromium 153 pass also red |
| M8: staging never reaches the page (empty layer) | `1 failed \| 3 passed (4)` | control only: table `rgb(128, 128, 128)` vs `oklch(…)` |
| M9: host row not a `theme` sublayer | `1 failed \| 148 passed (149)` | setup proof: sublayer |
| M10: `computeContentExtent` ignores `box-sizing` | `1 failed \| 148 passed (149)` | setup proof: `19` vs `20.5` |
| M11: dimension edge `margin-top` | `1 failed \| 148 passed (149)` | setup proof: `height \| margin-top` |
| M12: guide row names a pair Veneer declares (`hr \| border-top-style`) | `2 failed \| 2 passed (4)` | pair Veneer declares: `hr \| border-top-style` |
| M13: dimension `width` in place of `height` | `Tests  4 failed (4)` | population lacks `width`; non-empty guard `select \| height` |

M8 matters most. Without the control case, the pairing alone passes under an emulation that never reached the page.

The last mutation pass restored the scratch copy and ran after the lint-driven restructure.

## Gates

Each gate ran in `/home/user/veneer-pl` unless a scratch copy is stated:

- `npx oxfmt --check tests/service/tailwind/preflight.test.ts tests/setupStyles.ts tests/setupStyles.test.ts`: exit 0, "All matched files use the correct format." (`pl-gate-format.log.txt`)
- `npm run lint:check`: exit 0 (`pl-gate-lint.log.txt`).
- `npm run check`: exit 0 (`pl-gate-check.log.txt`).
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`: exit 0, `Tests  149 passed (149)` (`pl-setup.log.txt`).
- The preflight proof, command as in the preceding section:
  - In the scratch copy with the patch: exit 0, `Tests  4 passed (4)` (`pl-green.log.txt`).
  - In the worktree without the patch: exit 1, `Tests  2 failed | 2 passed (4)` (`pl-worktree-unpatched.log.txt`). The guide still records the `height` rows.
- `npm run test:guides` in the scratch copy with the patch: exit 0, `Tests  20 passed (20)` (`pl-test-guides.log.txt`).
- `npm run test:service`, run once, in the scratch copy with the patch: exit 0, `Test Files  3 passed (3)`, `Tests  20 passed (20)` (`pl-test-service.log.txt`).
  - This reading predates the lint fix. That fix moved the extent assertion behind a `continue` so it is unconditional, and changed the setup edge assertion to a prefix string. The scoped preflight proof and the full mutation pass re-ran green and red after the fix.
- Guide checks:
  - `git apply --check .orkestrel/veneer/units/pl-shared.patch`: exit 0, against a guide equal to `fc3ddfe`.
  - `npx oxfmt --check guides/veneer.md` on the patched copy: exit 0.

## Shared-file patch

`pl-shared.patch` changes the `guides/veneer.md` file against `fc3ddfe`:

- Removes the `input`, `select`, and `textarea` `height` rows.
- Adds a paragraph on form-control height and content extent.
- Rewrites the column paragraph. It keeps the Standalone column as the Chromium 141 reading and states the comparison shape. It names the Chromium 153 differences and the staged `theme` sublayer.
- Amends one sentence to exclude a form control's height from the rows.

## Decisions within scope

- **Case renamed.** The case is "keeps every property the elements layer declares, and holds every move the profile makes to its recorded preflight value, under %s", with "the host build" or "Chromium 153" in place of `%s`. The standing reading in `host-chromium-153-reading.md` names the old title, so update any verifier comparison keyed on it.
- **Tables placed in `tests/setupStyles.ts`.** `PREFLIGHT_BUILDS` and `PREFLIGHT_DIMENSIONS` sit beside `NEUTRAL_MARKUP` in the setup file this unit owns. `tests/setupService.ts` was not granted and is unchanged.
- **Staged `select` background.** The staged background uses the `Field` system color rather than a literal color. On this host it resolves to `rgb(255, 255, 255)`, the Chromium 153 reading.

## Deviation state

No stop condition was reached. One slip against note 2: a throwaway `pl-dummy` file was written into the session scratchpad and removed in the same command. I created it, and nothing else was touched there.

## Artifacts

All artifacts are under `/home/user/veneer-pl/tmp/units/`:

- Required: `pl-report.md`, `pl.diff`, `pl-status.txt`, `pl-shared.patch`, and `pl-mutations.log.txt`.
- Instruments: `pl-mutations.sh`, `pl-scratch.sh`, and `pl-classify-probe.test.ts.txt` with its output `pl-classify.out.txt`.
- Logs: `pl-red-baseline.log.txt`, `pl-green.log.txt`, `pl-worktree-unpatched.log.txt`, `pl-setup.log.txt`, `pl-test-guides.log.txt`, `pl-test-service.log.txt`, and the `pl-gate-*.log.txt` files.
- The patched guide copy the mutation script restores from is `/home/user/veneer-pl/tmp/probe/pl-guide-patched.md`.
