# Unit AP-COLOR round 5 report

`opus` on Opus 5.5, native, in `/home/user/veneer-apc` (uncommitted over `712ae72`). Brief: `/home/user/scaffold/.orkestrel/veneer/units/ap-color-brief-5.md`. Status: done, no stop.

Every case in `tests/src/styles/utilities/color.test.ts` now meets the seam ruling's invariant. The M1 and M2 assertions each survived their named mutation before they were added and read red under it after. The new runner refuses a selection that executed no test, and its negative control shows the refusal. The scoped color proof and every gate exit 0. The status equals round 4's, and no file outside `color.test.ts` changed.

## Changes

All test changes are in `tests/src/styles/utilities/color.test.ts`:

- **M1.** The fill-and-body case gains an assertion after the body-text retune. It checks that `.text-primary-emphasis` matches the `#text-twin` twin, `color-mix(in oklab, var(--vn-color-primary-base) 70%, rgb(0, 128, 0))`, in the same way the fill half checks the emphasis class. The title stays "moves a role color and its emphasis class to the tier of a fill or body text retuned at the scope declaring the %s theme", which is now true for the fill retune and the body-text retune.
- **M2.** The density-and-channel case gains `expect(readStyle(emphasis, 'color')).toBe(resting[1])` under the `--vn-color-primary-rgb` retune. Its title is now the brief's: "leaves a role color and its emphasis class on their tier when the role channels or the density factor are retuned, in %s mode".
- **Sweep, narrowed title.** The neutral case changed from "keeps the neutral roles on their own channels rather than their emphasis tiers in %s mode" to "keeps each neutral role color on its own channels in %s mode". No assertion reads an emphasis tier there, and "rather than their emphasis tiers" is false for `.text-light` in dark mode, whose gray-100 tier equals its `248, 249, 250` channels. The bound says to narrow a title where the property is false.
- **Sweep, sibling named.** The token-and-alias case now reads "…, and to an alias retuned on its own element while a sibling keeps its color". The case already asserts that the sibling `.text-primary` keeps its resting color under the element-level alias retune; the title now names that element and condition.
- **Sweep, pair named.** The priority case is now "keeps a text color and the fill of a color-and-background pair over a later unlayered consumer rule". The escape case is now "yields a text color and the fill of a color-and-background pair to an important override inside the utilities layer and to no unlayered one". Each already reads a `.text-bg-*` pair's `background-color`, which the old titles, "keeps its priority…" and "yields to…", never named. The `.probe` consumer in the priority case proves the unlayered rule reached the page, so it is a control.

New files, retained under `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/`:

- **M3.** `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-mutate-5.py` is the successor runner. Its selectors match the current titles. It reads the verbose reporter's lines for each selected test and ends with one verdict line:
  - `VERDICT: RED` (exit 0) when every named proof ran and at least one of its tests failed.
  - `VERDICT: SURVIVED` (exit 1) when every named proof ran and passed.
  - `VERDICT: EMPTY SELECTION` (exit 2) when any named proof executed no test.

  Its `selection-control` entry applies a real mutation but selects the round-3 emphasis-opacity title, which no current test carries.
- **Gate chain.** `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-final.sh` runs the scoped color proof and then the gates. Its chain log is `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-final-chain.log.txt`.

## Per-case record

| Case title (`%s` is the mode) | Elements and conditions its assertions read | Ruling |
| --- | --- | --- |
| resolves each text color to the value the release records, and each role outside the neutral roles to its on-canvas tier, in %s mode | Every `.text-<key>` of the release's color entry, at rest in the mode. It checks the `--bs-text-opacity` value `1` and the color against the recorded twin, and the reset key inheriting. Each tier role's `.text-<key>` matches the ruling's tier twin and not the channel twin. The twins are references. | holds |
| keeps each neutral role color on its own channels in %s mode | `.text-light` and `.text-dark` at rest in the mode, against `rgb(var(--bs-<role>-rgb))` | title narrowed (the old clause "rather than their emphasis tiers" read nothing and is false for `.text-light` in dark mode) |
| reads each role color outside the neutral roles at or above the contrast bar against the page in %s mode | Each tier `.text-<key>` at rest on the painted page in the mode: `readContrast` of at least `CONTRAST_BAR` | holds |
| paints each role color outside the neutral roles and its emphasis class in one color at the default opacity in %s mode | Each tier `.text-<key>` and `.text-<key>-emphasis` at rest in the mode | holds |
| resolves each emphasis tier through the alias its own mode declares | Every `.text-<role>-emphasis` in a light scope and a dark scope, against its recorded `var(--bs-<role>-text-emphasis)` twin. Also checks that the dark readings differ from the light ones. | holds |
| paints each opacity step as the on-canvas tier of every role outside the neutral roles, at the alpha the step names, in %s mode | Each tier `.text-<key>.text-opacity-<step>`: the step's `--bs-text-opacity`, alpha, and channels. `.text-<key>-emphasis` is read as the tier reference. | holds |
| leaves a role color and its emphasis class on their tier when the role channels or the density factor are retuned, in %s mode | `.text-primary` and `.text-primary-emphasis` under the root density retune, then under the theme-scope channel retune. The `.text-bg-primary` fill is the control. | M2: assertion added, title changed to the brief's wording |
| moves a role color and its emphasis class to the tier of a fill or body text retuned at the scope declaring the %s theme | `.text-primary` and `.text-primary-emphasis` under the theme-scope fill retune, then under the theme-scope body-text retune, against the fill and text twins | M1: assertion added |
| moves a role color to an emphasis token retuned at the scope declaring the %s theme, and to an alias retuned on its own element while a sibling keeps its color | `.text-primary` under the theme-scope token retune. `#local` `.text-primary` under its own alias retune, with the sibling `.text-primary` under that same retune. A pre-check covers the resting color. | title names the sibling |
| leaves a role color and moves the colored link when the emphasis token is retuned below the scope declaring the %s theme | `#local` `.text-primary` and `#local-link` `.link-primary` under an element-level token retune. A pre-check covers the link at rest. | holds |
| keeps each emphasis class outside the neutral roles opaque under an opacity step and fades its role class beside it, in %s mode | Each tier `.text-<key>-emphasis.text-opacity-50` and `.text-<key>.text-opacity-50`: the alpha of each | holds |
| keeps a text color and the fill of a color-and-background pair over a later unlayered consumer rule | `.text-success` color and the `.text-bg-success` `background-color` under a later unlayered rule. The `.probe` consumer is the control. | title names the pair |
| yields a text color and the fill of a color-and-background pair to an important override inside the utilities layer and to no unlayered one | `.text-primary` color and the `.text-bg-dark` `background-color`, under an unlayered important override and then under one inside the utilities layer | title names the pair |

The scoped color proof's verbose log lists every current title as executed and passing (`/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-scoped-color.log.txt`).

## Mutation table

The runner is `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-mutate-5.py`. Each mutation edits `src/styles/utilities/_color.scss` only inside the runner, and the runner rebuilds the styles bundle through `npm run build:src:styles`. The `-before` logs ran on the test file before the M1 and M2 assertions existed. The other runs used the final test file.

| Mutation | Assertion it targets | Reading | Log | Restore |
| --- | --- | --- | --- | --- |
| M1 `emphasis-resting-body`: the emphasis class paints `color-mix(in oklab, var(--vn-color-<role>-base) 70%, light-dark(<light text>, <dark text>))`, keeping the fill but using each mode's resting body color written from the token maps | before the assertion existed | `SURVIVED`: the fill-and-body case ran in light and dark and passed, including the fill half's emphasis check | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-mutation-emphasis-resting-body-before.log.txt` | byte-identical = True |
| same | the M1 emphasis assertion after the body-text retune (`color.test.ts:286`) | `RED` in light and dark, `expected false to be true` at that line | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-mutation-emphasis-resting-body.log.txt` | byte-identical = True |
| M2 `emphasis-reads-channel`: the emphasis class paints `rgb(var(--vn-color-<role>-rgb))` | before the assertion existed | `SURVIVED`: the density-and-channel case ran in light and dark and passed | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-mutation-emphasis-reads-channel-before.log.txt` | byte-identical = True |
| same | the M2 emphasis assertion under the channel retune (`color.test.ts:241`) | `RED`: light `expected 'rgb(20, 80, 140)' to be 'rgb(8, 65, 234)'`, dark `expected 'rgb(20, 80, 140)' to be 'rgb(0, 172, 236)'` | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-mutation-emphasis-reads-channel.log.txt` | byte-identical = True |
| M3 `selection-control`: the round-3 emphasis-opacity mutation, selected by the round-3 title | the runner's empty-selection refusal | `EMPTY SELECTION`, exit 2, `proof "stale emphasis opacity": executed 0` | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-mutation-selection-control-before.log.txt` | byte-identical = True |

The retitles and the narrowed title add no assertion, so they have no mutation row.

## Gate table

The chain is `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-final.sh`, run after the final mutation runs, with `CAPTURE` unset.

| Gate | Result | Log |
| --- | --- | --- |
| Scoped color proof: `npm run build:src:styles`, then `vitest run` of `color.test.ts` | exit 0; 23 passed, 1 file | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-scoped-color.log.txt` |
| `npm run format:check` | exit 0 | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-final-format-check.log.txt` |
| `npm run lint:check` | exit 0 | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-final-lint-check.log.txt` |
| `npm run check` | exit 0 | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-final-check.log.txt` |
| `npm run test:src:styles` | exit 0; 1456 passed, 115 files | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-final-test-src-styles.log.txt` |

The status and scope check is in `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-status-check.txt`:
- `apc-5-status.txt` equals `apc-4-status.txt`.
- Every file other than `color.test.ts` has a `git diff 712ae72` section byte-equal to its round-3 section in `apc-3.diff` or `/home/user/scaffold/.orkestrel/veneer/units/apc-shared-3.patch`. The result is `True`.
- The control compares `color.test.ts` itself against round 3 and returns `False`, as it must.

## Artifacts

- `/home/user/scaffold/.orkestrel/veneer/units/apc-5.diff`: `git diff 712ae72 -- tests/src/styles/utilities/color.test.ts`.
- `/home/user/scaffold/.orkestrel/veneer/units/apc-5-status.txt`: `git status --short`.
- `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-mutate-5.py`: the runner.
- `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-5/apc-5-final.sh`: the gate chain.

## Deviation state

No stop. Choices settled within the brief:

- **M1 mutation site.** The M1 mutation changes the emphasis class in `_color.scss` rather than the shared tier token, so the role-color assertions ahead of it stay green and the new assertion is the one that fails. The `-before` run shows the fill half still passes under it.
- **M2 assertion placement.** The M2 assertion follows the role assertion under the channel retune.
- **Title wording.** The sweep titles use the elements as the assertions read them. The narrowed neutral title removes a clause rather than adding an assertion, because that property is false for `.text-light` in dark mode.
- **Build step.** The mutation runs and the chain rebuild the styles bundle through `npm run build:src:styles`, the same step `npm run test:src:styles` runs. Neither runs `npm run build` or `npm run format`, and I formatted only `color.test.ts`, through `./node_modules/.bin/oxfmt`.
