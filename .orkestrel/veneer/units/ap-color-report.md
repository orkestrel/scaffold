# Unit AP-COLOR report

`opus` on Opus 5.5, native, in `/home/user/veneer-apc` (branch `unit/apc`, base `712ae72`). Nothing committed. Status: done. Every acceptance gate exits 0, every Execution step 7 proof passes, and every step 8 mutation reddened its named proof.

## Changes by file

Owned files:

- `src/styles/_tokens.scss`: adds `$neutrals: light, dark;` beside `$aliased`, with a one-line comment. It is the only home of the exclusion. `'link'` reads `var(--vn-color-primary-emphasis)` in light and dark. The dark `link-rgb` moves from `79, 185, 238` to `103, 191, 238`, and the dark `link-hover-rgb` moves from `141, 210, 244` to `156, 214, 244`. The light triplets stay, because the light color did not change. Light `'valid'` and `'invalid'` read `var(--vn-color-success-emphasis)` and `var(--vn-color-danger-emphasis)`.
- `src/styles/utilities/_color.scss`: each `$aliased` member outside `$neutrals` writes `rgb(from var(--bs-<role>-text-emphasis) r g b / var(--bs-text-opacity))`. The opacity local, the `!important` priority, and the map order are unchanged. `light`, `dark`, black, white, and body keep the channel form. The comment is updated.
- `src/styles/utilities/_link.scss`: each non-neutral `.link-<role>` paints `rgb(from var(--vn-color-<role>-emphasis) r g b / …)` for `color` and `text-decoration-color`. Hover and focus paint `color-mix(in srgb, var(--vn-text-emphasis-base) 20%, var(--vn-color-<role>-emphasis))`, with `$shift` as the endpoint's share. Both states keep the existing opacity variables. `.link-light` and `.link-dark` keep their old rule byte for byte. The file adds `@use 'sass:list'`, and the comment is updated.
- `src/styles/components/_button.scss`: for every `$roles` member outside `tokens.$neutrals`, tertiary included, `.btn-outline-<role>` sets `--bs-btn-color` and `--bs-btn-disabled-color` to `var(--vn-color-<role>-emphasis)`. Borders, hover, and active keep the fill. The comment is updated.
- `tests/src/styles/utilities/color.test.ts`: the release-record case takes Veneer's tier value for the tier keys. The file adds the neutral, contrast, identity, per-role opacity, and retune proofs. The retune proof replaces the old `-rgb` retune case.
- `tests/src/styles/utilities/link.test.ts`: adds the rest and hover proofs for the tier roles. The old channel and label-direction cases are narrowed to `light` and `dark`. The case where a text color wins over a colored link reads the tier for the underline.
- `tests/src/styles/components/button.test.ts`: adds the resting-contrast proof over the outline roles. The outline state case expects the tier as resting and disabled text for the tier roles, and the fill for the border and for the neutral roles.
- `tests/src/styles/components/validation.test.ts`: adds the contrast proof for feedback and the checked label, and the proof that border, feedback, and checked fill take the tier. One comment is corrected.
- `tests/src/styles/elements/a.test.ts`: adds the proof that `a` equals `.text-primary`. One comment is corrected. The dark readings live in `TEXT_A_CASES`.
- `tests/src/styles/theme.test.ts`: the dark-island secondary case reads the fill off `border-top-color`, because the outline text is now the tier. The case keeps its contrast comparison against the release.
- `tests/src/styles/utilities/color-bg.test.ts`: the case where a colored link wins over a pair expects the danger tier.

Shared files, report-only, edited here and returned in `/home/user/scaffold/.orkestrel/veneer/units/apc-shared.patch`:

- `tests/setupStyles.ts` adds the following exports:
  - `TEXT_TIER_CASES`: Veneer's `.text-<role>` values, kept beside `TEXT_COLOR_CASES`. `TEXT_COLOR_CASES` stays the Bootstrap baseline and is unchanged.
  - `TEXT_NEUTRAL_ROLES`.
  - `TEXT_TIER_SHARE`, with the value `'70%'`.
  - `BUTTON_TIER_ROLES`.

  It also changes these existing entries:
  - The dark readings in `TEXT_A_CASES`: the color is `oklab(0.7687 -0.0641665 -0.0876326)` and the hover is `color(srgb 0.611704 0.837659 0.957503)`, both measured by `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-link-probe.mjs`.
  - The `LINK_ROLES` doc line, which claimed that every link class reads the channels.
- `tests/setupStyles.test.ts` adds the four names to the export inventory. It adds a case asserting three things: the tier and neutral roles split `LINK_ROLES`, every tier key is a `TEXT_COLOR_CASES` key, and `BUTTON_TIER_ROLES` is the tier roles plus `tertiary`, with the tables frozen.
- `guides/veneer.md` changes three groups of content:
  - **Ledger.** 48 stale ledger rows are replaced with their measured values, for the `.btn-outline-*` `--bs-btn-color` and `--bs-btn-disabled-color` rows and the `.link-*` rest, hover, and focus rows. Six `aliased` rows are added for `.text-primary` through `.text-danger` `color`, before `.text-black-50`. The row text is the conformance gate's own output.
  - **Token rows.** The `--vn-link-base` and `--vn-link-hover-base` rows get the tier and the new dark triplets. The `--vn-form-valid` and `--vn-form-invalid` rows read the emphasis tier with source `derived`.
  - **Prose.** § Color utilities gets the role-color paragraph and the proof paragraphs. It gains the P7-4 identity sentence ("So at the default opacity a role class and its emphasis class paint one color…"). It also gains a departure bullet, "A role color reads the on-canvas tier", which carries the P7-3 sentence. The colored-link departure bullet is rewritten. The outline-button prose, the validation prose, and the link-token prose are updated.
  - Oxfmt realigned every table whose column width moved, so the guide hunks are wide.

## Failing-first evidence

The command for every reading in this section is `npm run test:src:styles`.

| When | Result | Log |
| --- | --- | --- |
| Before editing, at `712ae72` | 1432 passed, 115 files | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-baseline-styles.log.txt` |
| After the source change, before any test edit | 47 failed, 1385 passed | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-after-source-styles.log.txt` |
| Final | 1447 passed, 115 files | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-final-test-src-styles.log.txt` |

The run after the source change had reds in 7 files:
- `button.test.ts`: the outline case, 14 rows.
- `link.test.ts`: the rest and hover cases, 23 rows, plus the case where a text color wins over a colored link.
- `color.test.ts`: the release-record case in both modes and the `-rgb` retune case.
- `a.test.ts`: both dark cases.
- `tokens.test.ts`: the reference-map case and the triplet case.
- `theme.test.ts`: the dark-island secondary case.
- `color-bg.test.ts`: the colored-link case.

The 15 net new tests have no pre-fix run. The step 8 mutations bind each of them to red instead: each mutation restores the relevant pre-unit behavior (dark danger on the channel, light `valid` on the fill, neutrals on the tier) or a named regression.

## Proof table

Every contrast proof uses `readContrast` from `@orkestrel/test/browser` against a scope painted `background-color: var(--bs-body-bg)`, in light and in dark, with the bar `CONTRAST_BAR` (4.5). Color equality uses `matchesColor`. The unit added no color or contrast helper.

| Proof (test name, abridged) | File | What it reads |
| --- | --- | --- |
| reads each role color outside the neutral roles at or above the contrast bar against the page in %s mode | `tests/src/styles/utilities/color.test.ts` | `.text-{primary…danger}` contrast per role |
| paints each role color outside the neutral roles and its emphasis class in one color at the default opacity in %s mode | same | `.text-<role>` against `.text-<role>-emphasis` |
| paints each opacity step as the on-canvas tier …, at the alpha the step names, in %s mode | same | every tier role × `.text-opacity-{25,50,75,100}`: the step's alpha and the `.text-<role>-emphasis` channels |
| retunes a role color from the fill and the body text at the scope declaring the theme, ignores the role channels and the density factor | same | Setting `--vn-color-primary-rgb` on `:root` moves the `.text-bg-primary` fill to `rgb(20, 80, 140)` and leaves `.text-primary` unchanged. `--vn-color-primary-base: rgb(200, 0, 0)` gives the inline `color-mix(in oklab, rgb(200, 0, 0) 70%, var(--vn-text-body-base))` twin. `--vn-text-body-base: rgb(0, 128, 0)` gives its twin. The density factor is inert. |
| keeps the neutral roles on their own channels rather than their emphasis tiers in %s mode | same | `.text-light` and `.text-dark` against `rgb(var(--bs-<role>-rgb))` |
| resolves each text color to the value the release records, and each role outside the neutral roles to its on-canvas tier, in %s mode | same | each `.text-*` against its recorded twin, with Veneer's value for the tier keys |
| paints the %s on-canvas tier at rest at or above the contrast bar, and scales it by the opacity variables | `tests/src/styles/utilities/link.test.ts` | `.link-<role>` color and underline against `--vn-color-<role>-emphasis`, and the contrast. A `-rgb` override leaves the color unchanged, and an emphasis override with opacity reads `[20, 80, 140, 0.5]` and `0.25`. |
| moves the %s hover and focus color toward the emphasis text at or above the resting contrast … | same | the hover color, which equals an independent sRGB 80/20 weighting of rest and `--vn-text-emphasis-base`, and its contrast at or above `max(rest, 4.5)`. Focus paints the same color, and the opacity variables scale it. |
| reads each outline button outside the neutral roles at or above the contrast bar against the page at rest in %s mode | `tests/src/styles/components/button.test.ts` | `.btn-outline-<role>` for the 7 roles, tertiary included: text against `--vn-color-<role>-emphasis`, and the contrast |
| paints outline %s in %s mode across rest, hover, active, focus, and disabled states | same | resting and disabled text against the tier, or against the fill for `light` and `dark`. The border stays the fill. |
| reads the $state feedback and the checked $state label at or above the contrast bar against the page, in both modes | `tests/src/styles/components/validation.test.ts` | `.valid-feedback`, `.invalid-feedback`, and the checked `.form-check-label` |
| paints the $state border, feedback, and checked fill from the $role on-canvas tier, in both modes | same | the `.form-control` border, the checked box's `background-color`, and the feedback color against `--vn-color-<role>-emphasis`. A control asserts the tier differs from the fill. |
| paints the link in the primary text color, the on-canvas tier, in $mode mode | `tests/src/styles/elements/a.test.ts` | `a[href]` against `.text-primary` and `--vn-color-primary-emphasis` |
| resolves each channel triplet to the color its own token paints, in each mode | `tests/src/styles/tokens.test.ts` (unchanged) | the dark `--vn-link-rgb` and `--vn-link-hover-rgb` against the rendered tokens |

## Mutation table

The runner is `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-mutate.py`. For each mutation it copies the file, applies the mutation, rebuilds the styles bundle, and runs the named proof with `-t`. It then restores the copy and confirms the file is byte-identical. Every log below records that the restore is byte-identical.

| Mutation | Proof that reddened | Reading | Log |
| --- | --- | --- | --- |
| Tier at 80 percent in dark: every tier role's emphasis token is overridden through `$retuned` in `_tokens.scss`, at 70% in light and 80% in dark | color: contrast proof, dark | info 4.29, danger 3.97 | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-mutation-tier-80-dark.log.txt` |
| `.text-danger` back on the channel | color: contrast proof, dark | danger 2.76 | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-mutation-danger-channel.log.txt` |
| Bare `color-mix()` in `.text-<role>` | color: opacity-step proof, both modes | alpha stays 1 at every step | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-mutation-bare-mix.log.txt` |
| `$neutrals: ()` | color: neutral proof, both modes | light mode: `.text-light` and `.text-dark` leave their channels. Dark mode: `.text-dark` leaves its channels. | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-mutation-neutrals-empty.log.txt` |
| Light `'valid'` back on `var(--vn-color-success-base)` | validation: tier proof, `valid` | light border, checked fill, and feedback off the tier | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-mutation-valid-fill.log.txt` |

## Gate table

Final chain `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-final.sh`, run after the mutations:

| Gate | Result | Log |
| --- | --- | --- |
| `npm run test:src:styles` | exit 0, 1447 passed | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-final-test-src-styles.log.txt` |
| `npm run test:setup` | exit 0, 320 passed | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-final-test-setup.log.txt` |
| `npm run test:conformance` | exit 0, 26 passed | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-final-test-conformance.log.txt` |
| `npm run test:guides` | exit 0, 20 passed | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-final-test-guides.log.txt` |
| `npm run format:check` | exit 0 | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-final-format-check.log.txt` |
| `npm run lint:check` | exit 0 | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-final-lint-check.log.txt` |
| `npm run check` | exit 0 | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-final-check.log.txt` |

`git diff 712ae72 --stat` names only owned and shared files: 14 files, 718 insertions, 233 deletions (`/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-diffstat.txt`). `npm run test:journey` and `npm test` were not run, as the brief directs.

## Artifacts

- `/home/user/scaffold/.orkestrel/veneer/units/apc.diff`: `git diff 712ae72` over the owned files.
- `/home/user/scaffold/.orkestrel/veneer/units/apc-shared.patch`: `git diff 712ae72 -- tests/setupStyles.ts tests/setupStyles.test.ts guides/veneer.md`. It reverse-applies cleanly.
- `/home/user/scaffold/.orkestrel/veneer/units/apc-status.txt`: `git status --short`.
- Instruments: `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-run.sh`, `apc-scoped.sh`, `apc-gates.sh`, `apc-final.sh`, `apc-mutate.py`, and `apc-link-probe.mjs`, which writes `apc-link-probe.log.txt`.

## Deviation state

No stop. Ancillary choices and standing conditions:

- **npm version.** The shell's npm 10.9.7 fails the package's `devEngines` check (`EBADDEVENGINES`, needs npm 11.6.0 or later). Every `npm run` went through `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-run.sh`, which puts the scratchpad's npm 11.19.1 (`…/scratchpad/npm11`) on `PATH` and sets `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. It installs nothing.
- **`npm run build:src`.** It ran once in this worktree (`/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-build-src.log.txt`), because the conformance case "bundles no forbidden runtime" reads `dist/src/core/index.js`, which this worktree lacked. It wrote only to the ignored `dist/` directory.
- **Tier-80 mutation site.** The mutation went through `$retuned` in the owned `_tokens.scss`, not through `role-each` in the off-limits `_mixins.scss`. The planner's idea of writing `valid` and `invalid` once inside `theme-tokens` was not taken, for the same reason. The verdict does not require it.
- **Neutral proof coverage.** In dark mode the `light` tier (gray-100) equals the `light` channels (`248, 249, 250`). The neutral proof therefore separates the channels from the tier for `.text-light` in light mode only, and for `.text-dark` in both modes. The mutation run confirms this.
- **Stopped run.** I stopped my own first final chain (`apc-final.sh`) during its styles build to move two module-scope derived tables out of the test files and inline. I confirmed the process tree was dead before relaunching.
- **Observation, not a criterion.** Intermediate runs under load average 14 to 16 on 4 cores, while AP-TYPE ran its browser suite, went red on timeouts only: `apc-gate-test-setup.log.txt`, `apc-setup-1.log.txt`, and `apc-conformance-2.log.txt`. The reds were the setupServer oracle and compile cases, two setupStyles range-rule cases, and the conformance Button oracle, each a `Test timed out` failure. The final chain passed all of them.
