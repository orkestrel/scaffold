# Unit TAILWIND-RECIPE report

The `preflight` fence in `guides/veneer.md` § Tailwind is now held line for line to a compiled fixture, and every
component rule's longhands resolve the same under the recipe alone as under the cascade alone. No component longhand
moved, so no stop condition fired. The garbled § Tailwind prose reads whole. Every gate in Acceptance exited 0, and
every mutation fails a case with an `AssertionError`. Deviation state: none. No shared-file patches.

Role and engine: `opus` on Opus 5.5, native Claude subagent, worktree `/home/user/veneer-twr`, branch `unit/twr` at
`21c821a`.

## Touched files

- `tests/fixtures/tailwind/consumer-preflight.css` (new): the guide's `preflight` fence with the `@source './src';`
  line replaced by `@source './markup.html';`, the way `consumer.css` holds the `tailwind` fence.
- `tests/fixtures/tailwind/components.html` (new): component markup the preflight recipe is read over. It carries the
  brief's floor classes (`.btn`, `.form-control` on an `input` and a `textarea`, `.form-select`, `.form-check-input`,
  `.btn-close`, `.nav-link`, `.page-link`, `.table`) plus list-group, dropdown, accordion, navbar-toggler, form-range,
  and input-group classes, inside their wrappers.
- `tests/service/tailwind/consumer.test.ts`: the recipe case now holds both fences to their fixtures. A new
  `the preflight recipe` block adds the order case, the component case with its in-test control, and the shared-name
  equality under the preflight recipe.
- `guides/veneer.md`: § Tailwind table row, the recipe paragraph, a new preflight-recipe paragraph, the restored
  shared-name prose, § Files `tests/fixtures/tailwind/` row, and the § Tests Tailwind sentence.

Diffstat (`git diff --stat 21c821a`; the new files are untracked and appended to `tmp/units/twr.diff` through
`git diff --no-index /dev/null <file>`):

```text
 guides/veneer.md                        | 100 ++++++++-----
 tests/service/tailwind/consumer.test.ts | 256 +++++++++++++++++++++++++++++---
 2 files changed, 295 insertions(+), 61 deletions(-)
 tests/fixtures/tailwind/components.html        | 56 lines (new)
 tests/fixtures/tailwind/consumer-preflight.css |  6 lines (new)
```

Most of the `guides/veneer.md` diff is oxfmt realigning the § Files table after the `tests/fixtures/tailwind/`
row grew, and the § Tailwind table after the `preflight` proof cell grew.

## Evidence re-readings (worktree at `21c821a`)

Every reading matched the brief, apart from the line numbers of the garbled prose.

- `tests/fixtures/tailwind/preflight.css` writes `@import 'tailwindcss' source(none);`, scans
  `../../../tmp/tailwind/candidates.txt`, and has no Veneer import. The guide fence (after `The following recipe is the
  \`preflight\` profile`) writes `@import 'tailwindcss';`, the Veneer import, `@source './src';`, and the exclusion
  line. Matches.
- `consumer.test.ts`, case `executes the recipe the guide ships, apart from the markup line each one names`, filtered
  to fences containing `@import 'tailwindcss/theme.css'` and held only the `tailwind` fence to `consumer.css`.
  `profiles.test.ts` held only the exclusion line of the fences. Matches.
- `preflight.test.ts` mounts only `NEUTRAL_MARKUP`. Matches.
- The garbled prose sat at worktree lines 3487 (`cover it. The \`bg-black\``), 3493 to 3494 (`The proof asserts that` /
  `cover it. The \`text-start\``), and 3501 to 3502 (the repeated `gap-3` sentence). The verdict cites the probe tree's
  3480 to 3496. Line 3466 (`cover it. The \`opacity-0\``) is the legitimate end of the `start-*` offsets sentence and
  was not garbled.
- `package.json` runs `test:service` as `vitest run --config vite.config.ts --no-cache --reporter=dot --project service`,
  and the `test` chain omits it. Matches.
- Mutation evidence at the baseline: with the `21c821a` copy of `consumer.test.ts` in place and the fence's order line
  deleted, `npm run test:service` reported `Tests  21 passed (21)` and `exit=0`
  (`tmp/units/twr-plant-order-baseline.log.txt`). That reproduces claim 11's surviving mutation before the change.

## Unknowns

**The component longhands Tailwind's preflight also writes.** The component case derives them per run. It expands the
compiled recipe's `base` blocks (Tailwind's installed preflight as compiled, because the raw `tailwindcss/preflight.css`
carries `--theme()` calls Chromium drops) and the built cascade's `components` blocks in Chromium. It then intersects
their longhands, leaving custom properties out. This run on Chromium 141 wrote these longhands in the reset:

`box-sizing`, `margin-top`, `margin-right`, `margin-bottom`, `margin-left`, `padding-top`, `padding-right`,
`padding-bottom`, `padding-left`, `border-{top,right,bottom,left}-{width,style,color}`, `border-image-source`,
`border-image-slice`, `border-image-width`, `border-image-outset`, `border-image-repeat`, `line-height`,
`text-size-adjust`, `tab-size`, `font-family`, `font-feature-settings`, `font-variation-settings`,
`-webkit-tap-highlight-color`, `height`, `color`, `text-decoration-line`, `text-decoration-thickness`,
`text-decoration-style`, `text-decoration-color`, `font-size`, `font-weight`, `position`, `vertical-align`, `bottom`,
`top`, `text-indent`, `border-collapse`, `display`, `list-style-position`, `list-style-image`, `list-style-type`,
`max-width`, `font-style`, `font-variant-ligatures`, `font-variant-caps`, `font-variant-numeric`,
`font-variant-east-asian`, `font-variant-alternates`, `font-variant-position`, `font-variant-emoji`, `font-stretch`,
`font-optical-sizing`, `font-size-adjust`, `font-kerning`, `letter-spacing`, the four `border-*-radius` corners,
`background-color`, `opacity`, `padding-inline-start`, `margin-inline-end`, `resize`, `appearance`, `min-height`,
`text-align`, `padding-block-start`, `padding-block-end`.

The following table lists, for each floor class, the longhands its component rules write that the reset also writes.
It comes from the same run, captured through a temporary write that was then removed, with
`cmp` confirming the restore. The raw capture is `tmp/units/twr-probe-components.json`.

| Class              | Shared longhands                                                                                                                                                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `btn`              | padding (four sides), `font-family`, `font-size`, `font-weight`, `line-height`, `color`, `text-align`, `vertical-align`, `background-color`, border width/style/color (four sides), `border-image-*`, radii, `text-decoration-*`, `display`, `opacity`, `position`, `margin-left`, `margin-top`, `top` |
| `form-control`     | padding, `font-size`, `font-weight`, `line-height`, `color`, `appearance`, `background-color`, border width/style/color, `border-image-*`, radii, `display`, `height`, margin (four sides), `opacity`, `margin-inline-end`, `min-height`, `position`                |
| `form-select`      | padding, `font-size`, `font-weight`, `line-height`, `color`, `appearance`, `background-color`, border width/style/color, `border-image-*`, radii, `display`, `height`, `min-height`, `position`                                                                  |
| `form-check-input` | `margin-left`, `margin-right`, `margin-top`, `vertical-align`, `appearance`, `background-color`, border width/style/color, `border-image-*`, `height`, radii, `opacity`, `color`                                                                                  |
| `btn-close`        | padding, `position`, `top`, `box-sizing`, `height`, `color`, `background-color`, radii, `opacity`, border width/style/color, `border-image-*`, `text-decoration-*`, margin (four sides)                                                                         |
| `nav-link`         | padding, `font-size`, `font-weight`, `color`, `background-color`, border width/style/color, `border-image-*`, `text-decoration-*`, `display`, `margin-bottom`, radii, `text-align`                                                                              |
| `page-link`        | padding, `font-size`, `color`, `background-color`, border width/style/color, `border-image-*`, `text-decoration-*`, `display`, `position`, `margin-left`, radii                                                                                                  |
| `table`            | `vertical-align`, border colors (four sides), `margin-bottom`, `color`, `background-color`, `border-bottom-width`, padding (four sides)                                                                                                                         |

**Whether a component class loses a longhand under the recipe.** None does. Across every component rule that matched a
mounted element at rest, the list of moved longhands was empty on the recipe-alone page. The same reading on the
control page (the compiled recipe with its order line removed) moved longhands on every floor class, for example
`.btn | border-top-width: 1px became 0px`, `.btn-close | box-sizing: content-box became border-box`, and
`.nav-link | text-decoration-line: none became underline`.

## Cases

The following cases are in `tests/service/tailwind/consumer.test.ts`:

- `the consumer pairing > executes each recipe the guide ships, apart from the markup line each one names`. This case
  was rewritten. It selects the `css` fences carrying the `@source './src';` line, the `tailwind` recipe first and
  the `preflight` recipe second. It holds them line for line, apart from the markup line, to `consumer.css` and
  `consumer-preflight.css`.
- `the preflight recipe > compiles to the order the cascade puts the document in, with Tailwind's reset in its base
  layer`. This case is new. It checks that the compiled order equals `['properties', ...cascade.order]`, that Veneer's
  token namespace is in `theme`, and that `.btn` is in `components`. It also checks that the cascade opens no `base`
  block while the recipe does, and that `.px-8` was generated from the markup line.
- `the preflight recipe > keeps every longhand a component rule declares where the cascade alone resolves it, and moves
  one when the order line is dropped`. This case is new. It derives the reset's longhands and requires each floor
  class to share one. It mounts `components.html` on the cascade-alone page, on a page that links the compiled recipe
  as its cascade, and on a control page that links the recipe without its order line. It then reads every
  `components` rule on the elements it matches. The case requires every floor class to be read on a shared longhand,
  requires no longhand to move on the recipe page, and requires every floor class to move on the control page.
- `the preflight recipe > leaves every shared name resolving, on the recipe alone, what the cascade resolves over
  Tailwind's reset`. This case is new. It repeats the consumer equality under the preflight profile. The baseline is
  the cascade with the recipe's `theme` and `base` blocks loaded beneath it, because the reset moves properties Veneer
  leaves alone. The subject is the recipe-alone page. Every non-custom computed longhand of every element carrying a
  shared name is compared.

The recipe-alone page is `new StageManager(scratch.path)` over a `createScratch` directory whose `CASCADE_PATH` holds the
compiled recipe. This is the pattern `tests/setupService.test.ts` already uses, and the stage's TSDoc sanctions it.
It is required because a sheet loaded after the linked cascade cannot move the page's layer order, so the order line
only matters on a page that links the recipe alone.

## Mutation table

Each plant ran through `tmp/units/twr-plant.sh` (plant program `tmp/units/twr-plant.py`) with the command
`npm run test:service`. The driver restored each file from a backup under `tmp/units/`, and each log records that
`cmp` confirmed the byte-identical restore and that `git diff --stat` was unchanged from before the plant. The plants
ran before a final comment-only edit to `consumer.test.ts`.

| Plant (log `tmp/units/twr-plant-<name>.log.txt`)                   | Failing case                                                                                                   | Failing assertion                                                                                                   | Restored |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------- |
| `order`: delete the fence's `@layer` line in the guide             | `executes each recipe the guide ships, …`                                                                      | `AssertionError: expected [ [ …(6) ], [ …(5) ] ] to deeply equal [ [ …(6) ], [ …(4) ] ]`                            | yes      |
| `swap`: swap `elements` and `base` in that line                    | `executes each recipe the guide ships, …`                                                                      | `AssertionError: expected [ [ …(6) ], [ …(5) ] ] to deeply equal [ [ …(6) ], [ …(5) ] ]`                            | yes      |
| `import`: drop the Veneer import from the fence                    | `executes each recipe the guide ships, …`                                                                      | `AssertionError: expected [ [ …(6) ], [ …(5) ] ] to deeply equal [ [ …(6) ], [ …(4) ] ]`                            | yes      |
| `order-paired`: the `order` plant in the guide and the fixture     | the order case; the component case; the shared-name case                                                       | `expected [ 'properties', 'theme', 'base', …(4) ] to deeply equal [ Array(7) ]`; `expected [ …(240) ] to deeply equal []`; `expected [ …(4) ] to deeply equal []` | yes      |
| `swap-paired`: the `swap` plant in the guide and the fixture       | the order case; the component case; the shared-name case                                                       | `expected [ Array(7) ] to deeply equal [ Array(7) ]`; `expected [ …(16) ] to deeply equal []` (table cell border colors); `expected [ …(50) ] to deeply equal []` | yes      |
| `import-paired`: the `import` plant in the guide and the fixture   | the order case; the component case; the shared-name case                                                       | `expected false to be true`; `expected [ 'components', 'utilities' ] to deeply equal [ 'reset', 'elements' ]`; `expected [ …(5689) ] to deeply equal []` | yes      |
| `exclusion-paired`: drop the exclusion line in the guide and fixture | the shared-name case                                                                                         | `AssertionError: expected [ …(139) ] to deeply equal []`                                                            | yes      |
| `order` against the `21c821a` proofs (`twr-plant-order-baseline`)  | none; `Tests  21 passed (21)`, `exit=0`                                                                        | none; this is the before-reading                                                                                    | yes      |

The guide-only plants are the brief's step 6. The paired plants keep the line-for-line case green, which shows that the
order case, the component case, and the shared-name case each discriminate on their own.

## Gates

Each gate ran through `tmp/units/twr-gates.sh`, and each log ends with `exit=` and `loadavg=`:

| Gate                                                          | Log                                  | Result                                                     |
| ------------------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------- |
| `oxfmt --config .oxfmtrc.json --check` over the owned files   | `tmp/units/twr-oxfmt-check.log.txt`  | `All matched files use the correct format.`, `exit=0`      |
| `npm run check`                                               | `tmp/units/twr-check.log.txt`        | `exit=0`                                                   |
| `npm run lint:check`                                          | `tmp/units/twr-lint-check.log.txt`   | `exit=0`                                                   |
| `npm run build:src`                                           | `tmp/units/twr-build-src.log.txt`    | `exit=0`                                                   |
| `npm run test:service`                                        | `tmp/units/twr-test-service.log.txt` | `Test Files  3 passed (3)`, `Tests  24 passed (24)`, `exit=0`, 33.89s, loadavg 3.29 |
| `npm run test:guides`                                         | `tmp/units/twr-test-guides.log.txt`  | `Tests  26 passed (26)`, `exit=0`                          |
| `npm run test:policy`                                         | `tmp/units/twr-test-policy.log.txt`  | `Tests  109 passed \| 1 skipped (110)`, `exit=0`           |

The baseline `npm run test:service` before any edit read `Tests  21 passed (21)`, `exit=0`
(`tmp/units/twr-service-baseline.log.txt`). The skipped policy case sits in the vendored `tests/policy.test.ts`, which
this unit did not touch.

## Shared-file patches

None. The unit needed no change to `tests/setupStyles.ts` or `tests/setupBrowser.ts`.

## Observations for the Orchestrator

- **The new fixture paths live outside `TAILWIND_PATHS`.** `consumer.test.ts` resolves the new fixtures beside
  `TAILWIND_PATHS.consumer` instead of adding keys to `TAILWIND_PATHS`. A new key would redden the `TAILWIND_PATHS`
  case and the export-list case in `tests/setupService.test.ts`, which is outside Owned. So the `TAILWIND_PATHS` TSDoc
  ("each Tailwind profile and fixture the service proofs read") no longer lists every fixture. The successor patch is a
  `components` key (`tests/fixtures/tailwind/components.html`) and a `recipe` key
  (`tests/fixtures/tailwind/consumer-preflight.css`) in `tests/setupService.ts`, the two matching rows in that case's
  sorted expectation in `tests/setupService.test.ts`, and the two local constants in `consumer.test.ts` replaced by
  the keys.
- **The snapshot comparison is repeated inline.** The expression that compares a standalone snapshot against a paired
  one, `… became …`, appears inline in more cases of `consumer.test.ts` after this unit. The file already repeated it
  before. Moving it into a shared setup export needs the same `tests/setupService.test.ts` export-list change.
- **The bare import scans the working directory.** `@import 'tailwindcss';` carries no `source(none)`, so the compile
  also detects sources from the working directory. In this worktree the compiled recipe generated utilities such as
  `.ring`, `.blur`, and `.sepia-390` from repository text (`tmp/units/twr-compiled-preflight.css`). `consumer.css`
  behaves the same way (`tmp/units/twr-compiled-consumer.css` carries `.sepia-390` and `.ring`). The equalities read only shared names and component classes, so these utilities do not reach
  any reading.
- **`profiles.test.ts` does not read the new fixture's exclusion line.** Its copies case holds the guide's fences, and
  `consumer-preflight.css` is held to its fence line for line, so the line is held transitively. `profiles.test.ts` is
  unchanged.
- **Retained artifacts.** Plant drivers, backups, the gate script, and the logs are all under `tmp/units/` in this
  worktree, per the mid-unit instruction. The unit wrote nothing to the Orchestrator's scratchpad.

## Review evidence

- Diff: `tmp/units/twr.diff` (`git diff 21c821a`, plus `git diff --no-index /dev/null` for each untracked new file).
- Status: `tmp/units/twr-status.txt` (`git status --short`), which reads:

```text
 M guides/veneer.md
 M tests/service/tailwind/consumer.test.ts
?? tests/fixtures/tailwind/components.html
?? tests/fixtures/tailwind/consumer-preflight.css
```
