<!-- Retained by the Orchestrator: `up-status.txt` and `up.diff` captured read-only from /home/user/veneer-up at retention, because the unit returned none. -->
# UTIL-PAINT (`up`) report

Unit UTIL-PAINT on `opus` (Opus 5.5, native subagent) in `/home/user/veneer-up`, branch `unit/up`
from `2a3f223`. The owned files are written and uncommitted. Every shared file comes back as a
patch against `2a3f223`. No commit, push, install, or destructive git command was run.

**Deviation state: one stop-class finding (D1) and one process deviation (D2), reported rather than resolved.** The paint names
`border` and `border-0` leave the exclusion line as measured. So both executed Tailwind profiles
now emit a utility that registers `--tw-border-style`, and they read `--color-black` and
`--color-white`. Two cases in `tests/service/tailwind/profiles.test.ts` assume that no emitted
utility does either, and they go red. That file is in neither the owned list nor the shared list.
The unit therefore returns a proposed patch for it in `.orkestrel/veneer/units/up-unscoped-profiles.patch`, and
does not claim criterion 7 closed. See § Deviations. Everything else is closed on the validation
copy.

## Touched files (owned)

| File | Lines | Summary |
| --- | --- | --- |
| `src/styles/utilities/_background.scss` | 64 (new) | The `background-color` fills with the `bg-opacity` local, the `bg-opacity` css-var steps, the subtle tiers, and the gradient, in the release's map order, through the `utility` and `utility-variable` mixins inside one `breakpoint-each` walk. Roles walk `tokens.$aliased`. |
| `src/styles/utilities/_border.scss` | 110 (new) | The `border` shorthand, the four sides, the colors with the `border-opacity` local, the subtle colors, the widths, the `border-opacity` css-var steps, and the five rounded entries, in the release's map order. The rounded entries sit beside the border entries. |
| `tests/src/styles/utilities/background.test.ts` | 263 (new) | 10 cases (read in the run below). |
| `tests/src/styles/utilities/border.test.ts` | 411 (new) | 12 cases. |
| `app/browser/sections/BackgroundSection.ts` | 22 (new) | `SpecimenSection` subclass fed by `BACKGROUND_COPY` and `BACKGROUND_SPECIMENS`. |
| `app/browser/sections/BorderSection.ts` | 22 (new) | `SpecimenSection` subclass fed by `BORDER_COPY` and `BORDER_SPECIMENS`. |
| `tests/app/browser/sections/BackgroundSection.test.ts` | 150 (new) | Contract, captions, compositions, paint readings, and destruction. |
| `tests/app/browser/sections/BorderSection.test.ts` | 177 (new) | Contract, captions, compositions, side, width, opacity, and corner readings, and destruction. |

`git status --porcelain` in the worktree lists exactly these files as untracked (`??`). `tmp/probe/`
was deleted before this report. `tmp/tailwind/`, which the baseline service run created, was also
deleted.

Ancillary choices this unit settled:

- **The css-var entries are guarded inside the walk.** `utility-variable` takes no infix. So each
  partial writes its opacity entry under `@if $infix == ''` inside the walk, which is how `utility`
  gates a non-responsive entry. UTIL-TEXT meets the same shape, and two partials sharing the guard
  is a mixin candidate: an `$infix` parameter on `utility-variable` would retire it. That parameter
  is UTIL-SPACER's file, so it is recorded here, not patched.
- **The rounded entries are written beside the border entries.** The release writes them after
  `pointer-events`. No utility in between sets a radius, so no resolution moves. The order case maps
  the rounded entries to `utilities/border`.
- **Specimens are captioned swatches.** Each swatch is a `.ratio.ratio-4x3` box in a
  `figure.figure.w-100` inside a `row row-cols-3 row-cols-md-5 g-2` grid. Its `figcaption` names the
  swatch's classes. Text utilities have not shipped, so no label sits on a fill.

## Baseline (worktree, `2a3f223`, before any edit)

- `npm run test:conformance`, first run: `Tests 1 failed | 21 passed (22)` in 69.85 s at load
  average 25 on 4 cores (the failing name was not captured). Re-run: `Test Files 1 passed (1)`,
  `Tests 22 passed (22)`. Recorded as a timing reading under contention.
- `npm run test:service`: `Test Files 3 passed (3)`, `Tests 18 passed (18)`.

The re-run's log is `up-baseline-conformance-rerun.log.txt`. The copy's first conformance runs are
`up-copy-conformance-first.log.txt`, taken before the compatibility rows existed (only the order
case failed), and `up-copy-conformance-second.log.txt` (2 timeouts under load).

## Scoped validation (criteria 1 to 7)

Criterion 1 was read in the worktree after `tmp/probe/` was deleted. Criteria 2 to 7 were read on
the validation copy `tmp/probe/base` (`git archive 2a3f223`, `cp -al node_modules`, the owned files
copied over it, the shared patches applied, and `profiles.test.ts` only where stated). The copy is
deleted, and its logs are kept under `tmp/units/` (retained under `.orkestrel/veneer/units/up-instruments/`).

| # | Command | Exit | Reading |
| --- | --- | --- | --- |
| 1 | `npm run format:check` (worktree) | 0 | `All matched files use the correct format.` 359 files (`up-worktree-format-check.log.txt`) |
| 1 | `npm run lint:check` (worktree) | 0 | no diagnostic (`up-worktree-lint-check.log.txt`). An `any` planted in a scratch file on the copy was reported, exit 1, so the silent success is not a skipped population. |
| 2 | `npm run check` (copy) | 0 | no error (`up-copy-check.log.txt`) |
| 3 | `npm run build:src` (copy) | 0 | `up-copy-build.log.txt`. The cascade count instrument (`up-instrument-count-cascade.mjs`, output `up-cascade-count.log.txt`) finds inventory 111 selectors under `bg`, `border`, and `rounded` and cascade 111 selectors, with no extra, missing, duplicate, or conditioned selector. Every property declaration carries `!important`, and no custom property does. |
| 4 | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/background.test.ts tests/src/styles/utilities/border.test.ts` (copy) | 0 | `Test Files 2 passed (2)`, `Tests 22 passed (22)` |
| 5 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/BackgroundSection.test.ts tests/app/browser/sections/BorderSection.test.ts` (copy) | 0 | `Test Files 2 passed (2)`, `Tests 6 passed (6)` |
| 5+ | the same project over `tests/app/browser/Showcase.test.ts` and `tests/app/browser/index.test.ts` (copy) | 0 | `Tests 5 passed (5)` |
| 6 | `npm run build:src && npm run test:conformance` (copy, ledger rows applied through the guide patch) | 0 | `Test Files 1 passed (1)`, `Tests 22 passed (22)` (`up-copy-conformance.log.txt`) |
| 7 | `npm run build:src:styles && npm run test:service` (copy, shared patches only) | 1 | `Tests 2 failed, 16 passed (18)`. The consumer proof is green. The two red cases are both in `profiles.test.ts`: `declares the one order line in every profile…` (the statement reads `['properties']`) and `fills Tailwind reset only under the preflight profile…` (the layers carry `properties`) (`up-service-before-profiles-patch.log.txt`). |
| 7 | the same, with `up-unscoped-profiles.patch` applied (copy) | 0 | `Test Files 3 passed (3)`, `Tests 18 passed (18)` (`up-service-after-profiles-patch.log.txt`) |
| 7 | negative controls (`up-instrument-negative-controls-service.py`) | 1 each | see § Shared-name table |

The guide patch was then revised so that every code token is followed by a noun (mid-campaign note
1). The revision adds "the `!important` flag" twice in the Tailwind paragraph and "the … proof" in
the five compatibility rows. After it, the full set was re-read on a second fresh copy
(`git archive 2a3f223`, `git apply --check` clean for the combined patch, for every per-file patch,
and for `up-unscoped-profiles.patch`). The readings on that copy:

- `npm run check`: exit 0 (`up-final-copy-check.log.txt`).
- `npm run build:src`: exit 0.
- `npm run test:conformance`: exit 0, `Tests 22 passed (22)`.
- `npm run test:guides`: exit 0, `Tests 19 passed (19)`.
- `npm run test:policy`: exit 0, `Tests 109 passed | 1 skipped (110)`.
- The owned styles proofs: exit 0, `Tests 22 passed (22)`.
- The section, Showcase, and index proofs: exit 0, `Tests 11 passed (11)`.

Each reading has its log under `up-final-copy-*.log.txt`. The worktree's `format:check` and
`lint:check` were re-read after the final comment edit: exit 0 and exit 0.

Observations, not criteria:

- `npm run test:guides` (copy): exit 0, `Tests 19 passed (19)` (`up-copy-guides.log.txt`).
- `npm run test:policy` (copy): exit 0, `Tests 109 passed | 1 skipped (110)` (`up-copy-policy.log.txt`).
- Setup project over `tests/setupStyles.test.ts`, `tests/setupServer.test.ts`, and
  `tests/setup.test.ts` (copy): the new case `binds the paint fills, tiers, opacity steps, border
  sides and widths, and radius steps to the inventory` passes. `tests/setup.test.ts` passes. Under
  load average 17 to 25 on 4 cores, 3 cases failed on timeouts only (`Hook timed out in 10100ms`
  and `Test timed out in 5000ms`): `oracle action bindings and exclusions`, `records and reads
  official control state…`, and `binds every range rule to the inventory…`. A separate run failed
  `compiles the authored styles entry…` on a timeout. None of these cases touches this unit's
  files. The deciding re-run belongs to the Orchestrator.

## Failing-first evidence

This is a feature unit, not a defect repair, and the partials were written before their proofs. The
red evidence is therefore the mutation runs. Each case below went red under its named mutation and
green again after the edit was restored. Every run is logged with its site, command, exits, summary,
and failing names in the following files:

- `.orkestrel/veneer/units/up-instruments/up-mutations-styles.log.txt`, from the instrument `up-instrument-mutate-styles.py`
  (17 mutations over the partials and the mixins)
- `.orkestrel/veneer/units/up-instruments/up-mutations-tables-sections-ledger.log.txt`, from the instrument
  `up-instrument-mutate-tables-sections-ledger.py`
- `.orkestrel/veneer/units/up-instruments/up-negative-controls-service.log.txt`

Each log ends with `{"restored": true, "rebuild_exit": 0}`.

| Mutation (site) | Command | Exits (build/test) | Red cases |
| --- | --- | --- | --- |
| `tertiary-emitted`: `$aliased` to `$roles` in the fill walk (`_background.scss`) | styles proofs | 0/1 | `writes the aliased roles alone, so no class names the role Veneer adds` |
| `literal-role-fill`: every role fill written `rgba(0, 130, 54, var(--bs-bg-opacity))` | styles proofs | 0/1 | `fills each role from its channel alias…`; `paints the subtle and body tiers…`; `writes the aliased roles alone…` |
| `bg-opacity-before-fill`: the opacity entry moved ahead of the fill entry | styles proofs | 0/1 | `sets the fill alpha from each opacity step, and a step alone paints nothing` |
| `local-important`: `$locals` written with `!important` (`_mixins.scss`, copy only) | styles proofs | 0/1 | `sets the fill alpha…`; `sets the border alpha…`; both `keeps each … over a later unlayered consumer rule, whose opacity local still reaches it` |
| `subtle-light-literal`: every bg subtle tier written `rgb(207, 226, 255)` | styles proofs | 0/1 | `paints the subtle and body tiers from the aliases each mode re-declares, inside a dark island` |
| `border-subtle-light-literal`: every border subtle tier written `rgb(158, 197, 254)` | styles proofs | 0/1 | `colors the default and subtle borders from the aliases each mode re-declares, inside a dark island` |
| `gradient-literal`: `gradient` written as a literal `linear-gradient` | styles proofs | 0/1 | `lays the gradient over a fill from its alias, and leaves the fill beneath it` |
| `opacity-unguarded`: the `@if $infix == ''` guard around the css-var entry dropped | styles proofs | 0/1 | `writes every entry once at the empty infix, so no background class answers to a boundary` |
| `fill-responsive`: the fill entry passed `$responsive: true` | styles proofs | 0/1 | `writes every entry once at the empty infix…` (background) |
| `sides-before-border`: the `border` entry moved after the side entries | styles proofs | 0/1 | `draws each side entry on its own physical side, and removes each side from a whole border` |
| `border-width-literal`: the `border` value written `1px var(--bs-border-style) var(--bs-border-color)` | styles proofs | 0/1 | `draws the default border from the border aliases, so a retuned width token moves it` |
| `radius-literal`: step `2` written `0.375rem` | styles proofs | 0/1 | `rounds every corner at each radius step from the radius aliases, so the radius factor scales them` |
| `rounded-sides-before-rounded`: the `rounded` entry moved after the side entries | styles proofs | 0/1 | `rounds only the corners of each side entry, and each side entry refines a whole radius` |
| `border-literal-role`: every role border written `rgba(0, 130, 54, var(--bs-border-opacity))` | styles proofs | 0/1 | `colors each border from its channel alias and the opacity local, and writes no added role` |
| `border-opacity-before-color`: the opacity entry moved ahead of the color entry | styles proofs | 0/1 | `sets the border alpha from each opacity step, and a step alone leaves the default border` |
| `properties-normal`: `utility` writes properties without `!important` (`_mixins.scss`, copy only) | styles proofs | 0/1 | both `keeps each … over a later unlayered consumer rule…`; both `yields to an important override inside the utilities layer and to no unlayered one` |
| `partial-unlayered`: the background rules moved out of `@layer utilities` | styles proofs | 0/1 | `yields to an important override…` (background) |
| `fill-table-wrong-alias`: `BACKGROUND_FILL_CASES` `body-secondary` aliased to `--bs-tertiary-bg-rgb` | setup `-t "binds the paint"` | –/1 | `binds the paint fills, tiers, opacity steps, border sides and widths, and radius steps to the inventory` |
| `radius-side-corners-reordered`: `RADIUS_SIDE_CASES` `end` corners reversed | same | –/1 | same case |
| `opacity-table-step-dropped`: `PAINT_OPACITY_CASES` step `10` removed | same | –/1 | same case |
| `caption-drift`: captions rewrite `bg-` to `fill-` (`constants.ts`) | section proofs | –/1 | `renders every declared specimen as captioned swatches through the shared section contract` (Background) |
| `opacity-specimen-step-dropped`: step `10` removed from the Background opacity specimen | section proofs | –/1 | that case and `paints every swatch box, each opacity step at its alpha and each gradient over its fill` |
| `rounded-circle-ledger`: `circle: 49%` | `npm run build:src && npm run test:conformance` | –/1 | `records every measured value difference in the guide ledger` (9 `rounded` rows printed as `declared`) |

The "styles proofs" command is `npm run build:src:styles && npx vitest run --config
configs/src/vite.styles.config.ts --no-cache --reporter=verbose` over the two owned styles proofs.
The "section proofs" command is `npx vitest run --config vite.config.ts --no-cache
--reporter=verbose --project app:browser` over the two section proofs.

## Coverage matrix

Every inventory selector under `bg`, `border`, and `rounded` carries no condition. The release
writes none of these entries as responsive, and the inventory records no media for these keys, so
the sole condition is "no at-rule". Each row names the case that reads the row's selectors, the
mutation that turns that case red, the specimen that renders them, and the capture scenario.

| Inventory selectors | Proof case | Distinguishing mutation | Specimen | Scenario |
| --- | --- | --- | --- | --- |
| `.bg-{primary,secondary,success,info,warning,danger,light,dark,black,white}` | `fills each role from its channel alias…`; `writes the aliased roles alone…`; priority and escape cases | `literal-role-fill`, `tertiary-emitted`, `properties-normal` | Background roles | `background-roles` (`.bg-primary`, `background-color`) |
| `.bg-body`, `.bg-body-secondary`, `.bg-body-tertiary` | `fills each role…`; `paints the subtle and body tiers…` (light and dark islands) | `literal-role-fill` | Body backgrounds | `body-backgrounds` (`.bg-body-secondary`) |
| `.bg-transparent` | `resets the opacity local on every fill…`; `writes the aliased roles alone…` | `fill-responsive` (infix case) | Body backgrounds | `body-backgrounds` |
| `.bg-opacity-{10,25,50,75,100}` | `sets the fill alpha from each opacity step…`; `resets the opacity local…`; `keeps each fill … opacity local still reaches it` | `bg-opacity-before-fill`, `local-important`, `opacity-unguarded` | Background opacity | `background-opacity` (`.bg-opacity-50`) |
| `.bg-{8 roles}-subtle` | `paints the subtle and body tiers…` | `subtle-light-literal` | Subtle backgrounds | `subtle-backgrounds` (`.bg-primary-subtle`) |
| `.bg-gradient` | `lays the gradient over a fill…`; `reads no density factor…` | `gradient-literal` | Background gradient | `background-gradient` (`.bg-primary.bg-gradient`, `background-image`) |
| `.border`, `.border-0` | `draws the default border…`; `draws each side entry…`; `colors the default and subtle borders…` (dark island) | `border-width-literal`, `sides-before-border` | Additive borders, Subtractive borders | `additive-borders` (`.border-top`), `subtractive-borders` (`.border-top-0`) |
| `.border-{top,end,bottom,start}`, `.border-{top,end,bottom,start}-0` | `draws each side entry on its own physical side…` | `sides-before-border` | Additive borders, Subtractive borders | same |
| `.border-{8 roles,black,white}` | `colors each border from its channel alias…` | `border-literal-role` | Border roles | `border-roles` (`.border-primary`, `border-top-color`) |
| `.border-{8 roles}-subtle` | `colors the default and subtle borders…` | `border-subtle-light-literal` | Subtle borders | `subtle-borders` (`.border-primary-subtle`) |
| `.border-{1..5}` | `widens the border at each width step…`; `reads the dark island and no density factor…` | ledger (`declared` row on a value change); order: `sides-before-border` family | Border widths | `border-widths` (`.border-5`, `border-top-width`) |
| `.border-opacity-{10,25,50,75,100}` | `sets the border alpha…`; `writes every entry once at the empty infix…` | `border-opacity-before-color`, `local-important` | Border opacity | `border-opacity` (`.border-opacity-50`) |
| `.rounded`, `.rounded-{0..5,circle,pill}` | `rounds every corner at each radius step…` (the `--vn-factor-radius` token at `2` doubles `.rounded` and `.rounded-2` from 6px to 12px) | `radius-literal`, `rounded-circle-ledger` | Rounded corners, Rounded sizes | `rounded-sizes` (`.rounded-5`, `border-top-left-radius`) |
| `.rounded-{top,end,bottom,start}` × `{bare,0..5,circle,pill}` | `rounds only the corners of each side entry…` | `rounded-sides-before-rounded` | Rounded corners (`-4` step), sizes via `.rounded-*` | `rounded-corners` (`.rounded-top-4`) |
| every selector above, at the empty infix alone | both `writes every entry once at the empty infix…` (rule count, no media parent, no infixed name, and a reading at each `GRID_BREAKPOINT_CASES` boundary and one pixel below it through `visitBreakpoint`) | `opacity-unguarded`, `fill-responsive` | none | none |

No driven rows: no key here has a state, so `DRIVEN_KEYS` gains nothing. Each resting row's
scenario is its subject's stem.

## Shared-name table

Tailwind 4.3.3 expanded each name through the installed compiler
(`up-instrument-tailwind-longhands.mjs`, output `up-tailwind-longhands.log.txt`). The consumer proof
derived the exclusion status and held the line equal to it (`derives the shared class names…`,
green on the copy).

| Shared name | Tailwind declares | Veneer declares `!important` | Measured status |
| --- | --- | --- | --- |
| `bg-black` | `background-color: var(--color-black)` | `background-color` | off the line |
| `bg-white` | `background-color: var(--color-white)` | `background-color` | off the line |
| `bg-transparent` | `background-color: transparent` | `background-color` | off the line |
| `border` | `border-style: var(--tw-border-style)`, `border-width: 1px` (style and width longhands) | the `border` shorthand, which covers every style, width, and color longhand | off the line |
| `border-0` | `border-style`, `border-width: 0px` | the `border` shorthand | off the line |
| `border-1` to `border-5` | `border-style`, `border-width: Npx` | `border-width` alone, so the style longhands are uncovered | **on the line** (`border-1 border-2 border-3 border-4 border-5`, appended to the line and its copies) |
| `border-black` | `border-color: var(--color-black)` | `border-color` | off the line |
| `border-white` | `border-color: var(--color-white)` | `border-color` | off the line |
| `rounded` | `border-radius: 0.25rem` | `border-radius` | off the line |

Every other paint class the cascade declares, such as `border-top`, `rounded-top`, `bg-opacity-*`,
and `bg-gradient`, is a name Tailwind 4.3.3 does not generate, so it is not shared.

Negative controls, each red (`up-negative-controls-service.log.txt`, command `npm run
build:src:styles && npm run test:service`):

- `rounded-written-onto-line`: `rounded` is added to every copy of the line. Build 0, test 1,
  `Tests 2 failed | 16 passed`. Red: `derives the shared class names, and mounts an element for
  every one of them` and `keeps a shared name on the line while its importance covers only some…`.
- `border-width-dropped-from-line`: the widths are removed from every copy. Build 0, test 1,
  `Tests 3 failed | 15 passed`. Red: those two cases and `leaves every shared name resolving to the
  declaration the cascade ships`.
- `rounded-importance-dropped`: `.rounded` is written as a normal rule. Build 0, test 1,
  `Tests 2 failed | 16 passed`. Red: the same two equality cases.

Line names returned for the union: `border-1 border-2 border-3 border-4 border-5`. Markup appended
to `tests/fixtures/tailwind/markup.html`: one element per shared name, 13 lines after the
`.invisible` line.

## Precedence cases and their mutations

- **Priority over an unlayered rule.** An unlayered `background-color`, `background-image`,
  `border`, or `border-radius` leaves the utility's value. An unlayered `--bs-bg-opacity` or
  `--bs-border-opacity` reaches the fill, because the local is normal. Mutations:
  `properties-normal` and `local-important`.
- **The escape.** An unlayered `!important` leaves the utility's value. The same declaration inside
  `@layer utilities` wins. Mutations: `properties-normal` and `partial-unlayered`.
- **Order between entries.** An opacity step beats a fill's local (`bg-opacity-before-fill`,
  `border-opacity-before-color`). A side removal beats `.border`, whatever order the classes are
  written in (`sides-before-border`). A side radius beats `.rounded-3` (`rounded-sides-before-rounded`).
  A width step beats `.border` (the class order in markup is reversed).
- **Mode.** The subtle tiers, the body tiers, and the default border read each island's own alias,
  and every tier differs between light and dark. Mutations: `subtle-light-literal` and
  `border-subtle-light-literal`.
- **Factor.** The `--vn-factor-radius` token at `2` doubles `.rounded-2` (`radius-literal`). The
  `--vn-border-width` token at `3px` moves `.border` (`border-width-literal`). The
  `--vn-factor-density` token at `2` moves no fill, width, or radius.

## Ledger rows written

None. The textual ledger (`collectLedger`, whitespace collapsed) reads every declaration under
`bg`, `border`, and `rounded` equal to the release's value. The inventory records `rgba(` in
lowercase, and the partials write `rgba(` too. So no `#### bg`, `#### border`, or `#### rounded`
departure table exists, and no `### Additions` row does, because no extra name ships. The ledger
gate was proved able to see these keys by the `rounded-circle-ledger` mutation, which printed 9
`declared` rows. The compatibility rows written are `bg` selector, `bg` variable, `border`
selector, `border` variable, and `rounded` selector, all `shipped`.

## Section text

The guide gains `### Background utilities` and `### Border utilities` after `### Visibility
utilities`, two `### Files` rows, the compatibility rows, § Tests links, and one Tailwind paragraph
extension. The shared patch carries each of them verbatim. The region copy:

- `BACKGROUND_COPY.paragraph`: "Background classes fill a box with a role color, a subtle tier, or
  a body surface, dim a role fill with an opacity step, and lay a gradient over a fill. Switch the
  color mode to compare the subtle tiers and the body surfaces."
- `BORDER_COPY.paragraph`: "Border classes add a whole border or one side, remove a side from a
  whole border, color a border with a role or a subtle tier, widen it, and dim it with an opacity
  step. Rounded classes round every corner or one side at each radius step. Switch the color mode
  to compare the default and subtle border colors."

## Shared-file patches

Every patch is a unified diff against `2a3f223`, formatted with the repository `oxfmt`
configuration. The combined patch is `.orkestrel/veneer/units/up-shared.patch`, and each file has its own patch
at `.orkestrel/veneer/units/up-instruments/up-shared--<path-with-dashes>.patch`. The combined patch follows in full at the end of
this report.

- `src/styles/index.scss`: `@use 'utilities/border'` after `utilities/position`, and
  `@use 'utilities/background'` after `utilities/gap`.
- `tests/conformance.test.ts`: `bg`, `border`, and `rounded` in `listed`. The `entryPaths` record
  maps `border-top`, `border-end`, `border-bottom`, `border-start`, `border-color`,
  `subtle-border-color`, `border-width`, `border-opacity`, and the five rounded entries to
  `utilities/border`, and `background-color`, `bg-opacity`, `subtle-background-color`, and
  `gradient` to `utilities/background`.
- `tests/setupServer.test.ts`: `bg`, `border`, and `rounded` in the compatibility component set.
- `tests/setupStyles.ts`: `BACKGROUND_FILL_CASES`, `BORDER_COLOR_CASES`, `SUBTLE_TIER_CASES`,
  `PAINT_OPACITY_CASES`, `BORDER_SIDE_CASES`, `BORDER_WIDTH_CASES`, `RADIUS_STEP_CASES`, and
  `RADIUS_SIDE_CASES`, before `RATIO_CASES`.
- `tests/setupStyles.test.ts`: the imports, the export-key list, and the case `binds the paint
  fills, tiers, opacity steps, border sides and widths, and radius steps to the inventory`. That
  case derives every table from the inventory's recorded values.
- `tests/setup.ts`: 13 `CaptureSubject` members after `'Navbar expand xxl'`, and 13 `CASCADE_KEYS`
  rows after the `navbar-expand-xxl` row. `DRIVEN_KEYS` is unchanged.
- `app/browser/constants.ts`: `BACKGROUND_COPY`, `BACKGROUND_SPECIMENS`, `BORDER_COPY`, and
  `BORDER_SPECIMENS` after `VISIBILITY_SPECIMENS`.
- `app/browser/Showcase.ts` and `app/browser/index.ts`: `BackgroundSection` and then
  `BorderSection`, after `VisibilitySection` and before `NavbarSection`.
- `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, and
  `tests/app/browser/integration.test.ts`: the region labels, the specimen lists, the sorted export
  keys, and the portfolio's declared tables.
- `tests/setup.css`, `tests/fixtures/tailwind/consumer.css`, `tests/fixtures/tailwind/preflight.css`,
  and the guide's two recipe fences: ` border-1 border-2 border-3 border-4 border-5` appended to the
  line (union members).
- `tests/fixtures/tailwind/markup.html`: 13 elements appended.
- `guides/veneer.md`: as § Section text states.
- `ROADMAP.md`: no patch. The landing fold names the landing commit, which this unit cannot know.
- `src/styles/_mixins.scss`, `tests/setup.test.ts`, and `tests/setupStyles.test.ts` beyond the
  preceding change: no change was needed.

The B-MODAL wave-2 files are untouched. Every shared file patched above is as `2a3f223` has it
outside this unit's hunks.

## Deviations

**D1 (stop class, reported).** Expected: `npm run build:src:styles && npm run test:service` exits
0 with the shared patches (criterion 7). Found: exit 1. The red cases are
`tests/service/tailwind/profiles.test.ts` › `declares the one order line in every profile, and
leaves the document order unmoved` (the statement reads `['properties']`, not the order line) and
`fills Tailwind reset only under the preflight profile` (the layers carry `properties`, and the
`theme` block carries `--color-black` and `--color-white` beside `--spacing`). Evidence:
`up-service-before-profiles-patch.log.txt` and `up-profile-layers.log.txt`. The executed `tailwind`
profile now emits `.border`, `.border-0`, `.bg-black`, `.bg-white`, `.bg-transparent`,
`.border-black`, `.border-white`, and `.rounded`. The two `border` names register
`@property --tw-border-style`. That file is in neither the owned list nor the shared list, so the
unit edited nothing there. Done: every other criterion. Not done: criterion 7 as written.

Proposed patch: `.orkestrel/veneer/units/up-unscoped-profiles.patch`. With it applied on the copy, `npm run
test:service` exits 0 with `Tests 18 passed (18)`. The patch reads the order line behind a
generated `properties` statement for every profile, as the instrument case already does. It
excludes `properties` from the imported-part layer lists and reads the `theme` block's variables
as `--color-black`, `--color-white`, and `--spacing`.

Hypothesis: UTIL-TEXT (`text-black` and `text-white`) and UTIL-EFFECT meet the same two cases. So
the patch belongs to one carrier, applied once, rather than to each unit.

**D2 (process, reported under mid-campaign note 2).** Before note 2 arrived, this unit wrote
drafts and logs into the session scratchpad under unprefixed names. The names are `conf1.txt`,
`conf2.txt`, `conf3.txt`, `build.txt`, `check.txt`, `tables.ts`, `bind.ts`, `consts.ts`,
`guide_sections.md`, `mut1.out`, and `report_head.md`. It also wrote `lint.txt`, which is absent
at hand-back. Each present file's modification time falls within this unit's run (01:05 to
01:50 UTC). If any of those names held a sibling's file beforehand, this unit overwrote it; the
unit cannot tell. The unit copied its own content into `tmp/units/` (retained under `.orkestrel/veneer/units/up-instruments/`) under the `up-` prefix and
removed nothing from the scratchpad, because it cannot prove that it created each name. The
Orchestrator decides the removal. Since the note, every instrument, draft, and log is under
`tmp/units/` (retained under `.orkestrel/veneer/units/up-instruments/`).

No other disagreement between the brief, the family record, and the tree was found. The
`attributeSelector` ladder was not needed: every paint selector reached its key in the compatibility
and ledger gates without a change to `tests/setupServer.ts`.

## Could not close

- Criterion 7 as written, pending D1's carrier.
- The deciding re-runs of the timing failures in the setup and conformance projects under load.
  Those runs are the Orchestrator's.
- `npm run test:setup` as a whole, the journey, and `CAPTURE=1`. These are the Orchestrator's
  observations. The 13 resting rows are registered, but no frame has been shot.

## Appendix A: combined shared patch (`.orkestrel/veneer/units/up-shared.patch`)

The exact shared patch is `.orkestrel/veneer/units/up-shared.patch`; the retained copy drops the appended duplicate.
