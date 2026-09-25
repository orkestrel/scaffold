# Unit TAILWIND-RECIPE round 3 — report

## Item 1 — the opening paragraph's first three sentences

Before: "Under the composable imports, Tailwind fills a layer only for the utilities it generates
from the markup your `@source` rule names: the `utilities` layer carries those rules and the
`theme` layer carries the variables those rules read. A build whose markup uses no Tailwind utility
therefore fills no layer at all. The bare import differs, because preflight is not generated from
your markup: it fills `base` and reads font variables of its own, so the `preflight` profile carries
`theme` and `base` whatever your markup uses."

After: "Under the composable imports, Tailwind fills a layer only for the utilities it generates
from the files it scans: the `utilities` layer carries those rules and the `theme` layer carries the
variables those rules read. Each recipe's Tailwind import leaves Tailwind's automatic source
detection on, so your build scans the project it runs from as well as the directory your `@source`
rule names. A build whose scanned files name no Tailwind utility therefore fills no layer at all.
The bare import differs, because preflight is not generated from your files: it fills `base` and
reads font variables of its own, so the `preflight` profile carries `theme` and `base` whatever your
files use." The paragraph's last sentence (the stylesheet profiles proof cross-reference) is kept
unchanged.

## Item 2 — the recipe-intro sentence

Before: "it names your own markup directory, which is what Tailwind scans to decide which utilities
to generate."

After: "it names your own markup directory, which Tailwind scans beside the files its automatic
detection finds to decide which utilities to generate."

## Item 3 — the workspace-compile sentence

Before: "The compile roots the plugin's automatic source detection at an empty directory, so the
markup line"

After: "The compile roots the plugin's automatic source detection at an empty directory, which your
build does not do, so the markup line"

## Item 4 — the `px-8` sentence

Before: "the markup's `px-8` utility is generated, a reading a recipe without its markup line
fails;"

After: "the markup's `px-8` utility is generated, and a recipe without its markup line fails that
reading;"

## Item 5 — `tests/fixtures/tailwind/` Files row

Before: "the executed consumer profile of each recipe, the markup those profiles scan,"

After: "the executed copy of each recipe, the markup those copies scan,"

## Item 6 — `COMPONENT_FLOOR` summary in `tests/setupService.ts`

Before: "Lists the component classes the `preflight` recipe has to leave where the cascade puts
them before a reading over the rest of the component rules means anything."

After: "Lists the component classes the `preflight` recipe's component reading has to reach, on a
longhand Tailwind's reset also writes, before its equality means anything."

## Item 7 — rename in `consumer.test.ts`

`preflightSource` renamed to `consumerPreflightSource` and `preflightProfile` renamed to
`consumerPreflightProfile` at every use in `tests/service/tailwind/consumer.test.ts` (declaration,
the `executed` array, the order/unordered derivation, the `describe('the preflight recipe', ...)`
block's `compiledBlocks`/`cascadeBlocks` derivation, `scratch.write`, and the `SheetReader`
construction). `profiles.test.ts` keeps its own separate local `preflightSource`/`preflightProfile`
bindings unchanged — those name `TAILWIND_PATHS.preflight`, a different fixture than
`TAILWIND_PATHS.consumer.preflight`, and Item 7 scopes the rename to `consumer.test.ts` alone.

## Item 8 — moving `ORDER`/`CONTROL_VARIABLES`/`EXECUTED_SOURCE`/`SHIPPED_SOURCE`

Added `LAYER_ORDER` (renamed from `ORDER`), `CONTROL_VARIABLES`, `EXECUTED_SOURCE`, and
`SHIPPED_SOURCE` to `tests/setupService.ts`, beside `TAILWIND_PATHS`, each frozen and each carrying
its existing comment turned into a TSDoc block opened with a third-person verb (`Names …`) to
satisfy `policy(no-malformed-summary)`. `tests/service/tailwind/profiles.test.ts` now imports
`CONTROL_VARIABLES` and `LAYER_ORDER` from `../../setupService.js` instead of declaring them
locally, and every `ORDER` reference is renamed `LAYER_ORDER`.
`tests/service/tailwind/consumer.test.ts` now imports `EXECUTED_SOURCE` and `SHIPPED_SOURCE` from
`../../setupService.js` instead of declaring them locally. `tests/setupService.test.ts` adds all
four to the export-list case's expected `Object.keys(setup).sort()` array, adds
`Object.isFrozen(CONTROL_VARIABLES)` and `Object.isFrozen(LAYER_ORDER)` checks and value checks for
`EXECUTED_SOURCE`/`SHIPPED_SOURCE`, and the case's title gained "the layer order, the control
variables, and the source lines" before "the proof budgets". The `tests/setupService.ts` § Files
row's cell "the paths of the Tailwind profiles and fixtures and the floors and budgets of their
proofs" became "the paths of the Tailwind profiles and fixtures, the layer order, control variables,
and source lines their proofs read, and the floors and budgets of those proofs".

## Item 9 — `collectMovedLonghands` case and plant

Added the case `reports every moved longhand of one reading, in the reading's property order` to
`describe('collectMovedLonghands')` in `tests/setupServer.test.ts`: one standalone reading
(`'btn'`) carrying two longhands (`padding-left`, `padding-right`) that both differ from its
paired reading, expecting both moved lines in property order.

Plant: edited `tests/setupServer.ts`'s `collectMovedLonghands` to `break` out of the inner `for`
loop after pushing the first moved longhand of each reading, so it stops after one move per
reading. Ran the new case under the plant; it failed with an `AssertionError` (expected two moved
lines, received one), logged to `twr-instruments/r3/twr-3-plant-first-only.log.txt`. Restored
`tests/setupServer.ts` byte-identically from the pre-plant backup
(`twr-instruments/r3/twr-3-setupServer.ts.bak`); `diff` against the backup reports no difference.

## Gate table

| Gate                                                                                    | Result | Log |
| ---------------------------------------------------------------------------------------- | ------ | --- |
| oxfmt `--check` (owned files, after applying oxfmt once to converge)                     | exit 0 | `twr-instruments/r3/twr-3-oxfmt.log.txt` |
| `npm run check`                                                                          | exit 0 | `twr-instruments/r3/twr-3-check.log.txt` |
| `npm run lint:check`                                                                     | exit 0 | `twr-instruments/r3/twr-3-lint.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts tests/setupService.test.ts` | exit 0 (151 passed) | `twr-instruments/r3/twr-3-vitest-setup.log.txt` |
| `npm run build:src`                                                                      | exit 0 | `twr-instruments/r3/twr-3-build.log.txt` |
| `npm run test:service`                                                                   | exit 0 (24 passed) | `twr-instruments/r3/twr-3-test-service.log.txt` |
| `npm run test:guides`                                                                    | exit 0 (26 passed) | `twr-instruments/r3/twr-3-test-guides.log.txt` |
| `npm run test:policy`                                                                    | exit 0 (109 passed, 1 skipped) | `twr-instruments/r3/twr-3-test-policy.log.txt` |
| plant case (`collectMovedLonghands`, first-only break)                                  | `AssertionError`, as expected | `twr-instruments/r3/twr-3-plant-first-only.log.txt` |

Each log carries its command, `echo "exit=$?"`, and `cat /proc/loadavg`. No gate read red outside
the plant's expected failure; no timeout occurred.

## Diff and status

`twr-3.diff` holds `git diff 21c821a` over the owned tracked files
(`guides/veneer.md`, `tests/setupService.ts`, `tests/setupService.test.ts`,
`tests/service/tailwind/consumer.test.ts`, `tests/service/tailwind/profiles.test.ts`,
`tests/setupServer.test.ts`) plus the untracked fixtures' diffs
(`tests/fixtures/tailwind/components.html` and `tests/fixtures/tailwind/consumer-preflight.css`,
carried from rounds 1 and 2, unchanged in this round). `twr-3-status.txt` holds
`git status`; it also shows `tests/service/tailwind/preflight.test.ts` and
`tests/setupServer.ts` as modified from `21c821a` — both are round 1/2 carryover, this round's
plant on `tests/setupServer.ts` was reverted byte-identically, and neither file is in this round's
owned set.

## Deviations

None. Every Evidence reading matched the brief before editing, every Item's site fell inside the
owned set, and every gate read as expected.
