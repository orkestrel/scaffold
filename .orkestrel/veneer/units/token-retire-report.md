# TOKEN-RETIRE report

Retained by the Orchestrator from `/home/user/veneer-tret/tmp/units/tret-report.md`. Every `tmp/units/` log, script, diff, probe, and status
file it names is retained in `tret-instruments/` beside this report; other paths are relative to `/home/user/veneer-tret/`, and the
round is committed there as `a5a85d8` on `unit/tret`.

`opus` on Opus 5.5, sole writer in `/home/user/veneer-tret` (branch `unit/tret`, base `1deced0`).
The built cascade declares none of `--vn-focus-reset`, `--vn-color-tertiary-subtle`,
`--vn-color-tertiary-border`, or `--vn-color-tertiary-rgb`. `TOKEN_NAMES` names none of them, every
painted reading is unchanged, and the guide names none of them. Every acceptance gate exits 0.
A scope deviation is recorded under "Deviation state": the brief's default-reset proof
needs an include in `tests/src/styles/fixtures/mixins.scss`, a file outside the owned set.

## Touched files

- `src/styles/_tokens.scss`: removes the `'focus-reset'` entries from `$light` and `$dark`. The
  `:root` `-rgb` loop emits a triplet only for a role in `$aliased`. The `$triplets` comment states
  that the tertiary triplet stays for the contrast rule alone.
- `src/styles/_mixins.scss`: the `focus-ring` mixin's `$reset` default becomes `none`. The theme
  closure drops its `--vn-focus-reset` declaration. `role-each` takes `$aliased: $roles` and emits
  `-subtle` and `-border` only for a role in `$aliased`, with `-emphasis` for every role. The
  `theme-tokens` include passes `$aliased`. The fixture's call keeps the default, so it still gets
  every tier.
- `src/core/constants.ts` (shared, applied in the worktree): removes the `focus.reset` leaf and the
  tertiary `rgb`, `subtle`, and `border` leaves. The hunk is later in this report.
- `tests/setupStyles.ts`: removes `'--vn-color-tertiary-rgb'` from `UNMAPPED_TOKENS`. Removes the
  tertiary `subtle` and `border` rows from `CALIBRATED_TIERS`, and adds a remarks sentence
  explaining why those rows are absent.
- `tests/src/styles/tokens.test.ts`: adds the retired-name proof and the tertiary-scope proof, and imports `collectCustomProperties`.
- `tests/src/styles/mixins.test.ts`: adds the default-reset proof and the shipped-caller forced-colors proof.
- `tests/src/styles/fixtures/mixins.scss` (outside the owned set; see "Deviation state"): adds
  `.vn-fixture-ring { @include focus-ring; }`.
- `guides/veneer.md`: prose and reference-map changes, listed under "Guide changes".

The following diffstat is from `git diff 1deced0 --stat`:

```text
 guides/veneer.md                      | 43 +++++++++++++++++---------
 src/core/constants.ts                 |  4 ---
 src/styles/_mixins.scss               | 41 +++++++++++++++----------
 src/styles/_tokens.scss               | 12 +++++---
 tests/setupStyles.ts                  |  9 ++----
 tests/src/styles/fixtures/mixins.scss |  6 ++++
 tests/src/styles/mixins.test.ts       | 57 +++++++++++++++++++++++++++++++++++
 tests/src/styles/tokens.test.ts       | 34 +++++++++++++++++++++
```

The full diff is in `tmp/units/tret.diff`, and the status is in `tmp/units/tret-status.txt`. The
status lists exactly the files in the diffstat, each as ` M`. The `tmp/` directory is
ignored.

## Searches

The before search ran at `1deced0`, before any edit. The command was
`grep -rn -e "focus-reset" -e "tertiary-subtle" -e "tertiary-border" -e "tertiary-rgb" -e "focus\.reset" -e "tertiary\.rgb" -e "tertiary\.subtle" -e "tertiary\.border" tests src app guides README.md ROADMAP.md`.
It found these hits:

- `src/styles/_mixins.scss` (the `$reset` default and the theme-closure declaration) and
  `src/styles/_tokens.scss` (the `'focus-reset'` entry in `$light` and in `$dark`). Each file is owned.
- `src/core/constants.ts`: the tertiary `rgb`, `subtle`, and `border` leaves and the focus `reset`
  leaf. This file is shared.
- `tests/setupStyles.ts`: the `UNMAPPED_TOKENS` entry. Owned.
- `tests/src/styles/utilities/background.test.ts` and `border.test.ts`: each asserts
  `.bg-tertiary-subtle` or `.border-tertiary-subtle` absent. Those are class names, not the retired
  tokens, and each still passes unedited.
- `guides/veneer.md`: the mode-scope token list and the § Reference map focus row. Owned.
- `ROADMAP.md`: the row that carries this unit, which is off-limits. The landing closes it.
- The hits on `--vn-surface-tertiary-rgb`, `--bs-tertiary-bg-rgb`, and the `_focus-ring.scss` comment
  on `--bs-tertiary-rgb` are other tokens.

The dynamic search found retired tokens written through a role or a tier variable. The
command was
`grep -rn -e 'role}-subtle' -e 'role}-border' -e 'role}-rgb' -e "role\]-" -e 'focus-reset' -e "'reset'" tests src guides`,
followed by `grep -n "'tertiary'" tests/setupStyles.ts`. It found these:

- `CALIBRATED_TIERS` rows `['tertiary', 'light'|'dark', 'subtle'|'border', …]` in
  `tests/setupStyles.ts`. Owned.
- The guide's `Tier` table in § Reference map expands `--vn-color-{role}-subtle` and `-border` over
  every role a preceding `Role` table names, `tertiary` included. Owned.
- Every other dynamic reader walks `$aliased` or an aliased case table: `_link.scss`, `_color.scss`,
  `_background.scss`, `_border.scss`, and the `SUBTLE_TIER_CASES` walks in the app and style tests.
  None of them reaches `tertiary`.
- `tests/src/styles/theme.test.ts` walks `Object.entries(TOKEN_NAMES.color)` structurally and passes
  unedited.

The after search ran the before search's command over `tests src app guides`. Its only hits are the literal
names inside the added proofs, at `tests/src/styles/tokens.test.ts:77-80` and
`tests/src/styles/mixins.test.ts:92`. `grep -cE -- "--vn-color-tertiary-(subtle|border|rgb)|--vn-focus-reset" dist/src/styles/index.css`
returns `0`.

No hit sits in `src/browser/**`, `app/**`, or any other off-limits path.

## Before and after readings

The instrument is `tmp/units/probe/readings.test.ts`, run through
`tmp/units/probe/tret-probe.config.ts`, which is the `src:styles` browser project with its include
pointed at the probe. It reads these results:

- The forced-colors `box-shadow` declaration on every shipped focus-ring rule.
- The painted `color`, `background-color`, `border-left-color`, `box-shadow`, `outline-*`, and
  `opacity` on an element `button`, a `.btn`, and a `.btn-link` while each shows `:focus-visible`,
  with and without forced colors.
- The same properties on `.btn-tertiary` and `.btn-outline-tertiary` in the light and dark modes,
  at rest, focus, hover, active, and disabled.
- The `--vn-color-tertiary-base`, `-emphasis`, `-subtle`, `-border`, and `-rgb` token readings.

The captured readings are in these files:

- Before: `tmp/units/tret-readings-before.json.txt`, with the log in
  `tmp/units/tret-readings-before.log.txt`.
- After: `tmp/units/tret-readings-after.json.txt`, with the log in
  `tmp/units/tret-readings-after.log.txt`.
- The comparison: `tmp/units/tret-readings-compare.log.txt`, written by
  `node tmp/units/probe/compare.mjs`.

The comparison reports `same=222` and lists each difference. Every difference is one of the retired
token readings, and each goes from a value to `""`: the tertiary `subtle`, `border`, and `rgb` readings on
each button specimen, in each mode. No painted reading changed. These readings held both before and
after:

- The forced-colors declarations: `button:focus-visible`, the `.btn:focus-visible` group, and
  `.btn-link:focus-visible` each write `box-shadow: var(--vn-button-shadow)`.
- Every caller under forced colors draws a `solid` `3px` outline and paints `box-shadow: none`.
- `.btn-tertiary` in light mode paints `rgb(255, 255, 255)` text on an `oklch(0.541 0.281 293.009)`
  fill. Its hover fill is `color(srgb 0.440814 0.120552 0.887637)` and its active fill is
  `color(srgb 0.391565 0.109499 0.797282)`.
- `.btn-outline-tertiary` in light mode paints its resting text in
  `oklab(0.4411 0.0759527 -0.193617)`, the emphasis tier.

The full sets are in the JSON files.

## Failing-first and green readings

The proofs run with this command:
`npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts tests/src/styles/mixins.test.ts`.
Each run follows `npm run build:src:styles`.

- At the base, with the proofs added and no retirement edits, the result was
  `Tests 2 failed | 98 passed (100)`. The log is `tmp/units/tret-red.log.txt`, and these tests
  failed:
  - `declares no focus reset token and no subtle, border, or channel tier for the tertiary role in any scope`
    failed with
    `AssertionError: expected [ '--vn-color-tertiary-rgb', …(3) ] to deeply equal []`.
  - `writes no shadow under forced colors when its caller passes no reset, and reads no token for it`
    failed on each of its soft assertions. The declared-text reading gave
    `AssertionError: expected [ 'var(--vn-focus-reset)' ] to deeply equal [ 'none' ]`. The rendered
    reading gave `AssertionError: expected 'rgb(255, 0, 0) 0px 0px 0px 5px' to be 'none'`.
- After the retirement and the guide edit, the result was `Tests 100 passed (100)`. The log is
  `tmp/units/tret-green.log.txt`.
- The added guard proofs passed at the base by design, because the state they guard held there:
  - `declares the tertiary fill at the document scope and its emphasis tier in every mode scope`.
  - `outlines every shipped focus-ring caller at the focus width under forced colors and paints no shadow ring`.
  The existing tertiary rows in `BUTTON_LABEL_CASES`, `BUTTON_FILLED_CASES`, and
  `BUTTON_OUTLINE_CASES` also pin every tertiary button paint, and they stay green in the full
  styles run.
- Between the retirement and the guide edit, the existing reference-map proof
  `resolves every value the reference map states to the value its own token carries, in each mode`
  went red. The `Tier` table expanded the retired tertiary tiers. The guide edit closed it.

The rendered half of the default-reset proof tells the base state from the retired state. With the specimen's
`forced-color-adjust: none` set, the base painted the specimen's own shadow under forced colors. A
`var()` naming an undeclared property computes to `none`, so the declared text is the only reading
that separates `var(--vn-focus-reset)` from `none` without that override.

## Rules as written

The `_mixins.scss` `role-each` mixin:

```scss
@mixin role-each($roles, $tint, $edge, $anchor, $aliased: $roles) {
	@each $role in $roles {
		$tiered: list.index($aliased, $role) != null;
		@if $tiered {
			--vn-color-#{$role}-subtle: color-mix(
				in oklab,
				var(--vn-color-#{$role}-base) #{$tint},
				var(--vn-surface-body-base)
			);
		}
		--vn-color-#{$role}-emphasis: color-mix(
			in oklab,
			var(--vn-color-#{$role}-base) 70%,
			var(--vn-text-body-base)
		);
		@if $tiered {
			--vn-color-#{$role}-border: color-mix(
				in oklab,
				var(--vn-color-#{$role}-base) #{$edge},
				#{$anchor}
			);
		}
	}
}
```

The `focus-ring` mixin's parameter list ends with `$highlight: var(--vn-focus-highlight), $reset: none`.
The `theme-tokens` mixin passes `$aliased` as the `role-each` subset argument.

The `_tokens.scss` `:root` loop:

```scss
@each $role, $triplet in $triplets {
	@if list.index($aliased, $role) {
		--vn-color-#{$role}-rgb: #{$triplet};
	}
}
```

The `@if $tiered` guards in `role-each` keep the subtle, emphasis, and border declaration order unchanged for every aliased role.

## `src/core/constants.ts` hunk

The engine session owns this file. Send it this hunk before the landing. It is already applied in
the worktree.

```diff
@@ -68,10 +68,7 @@ export const TOKEN_NAMES = Object.freeze({
 		} as const),
 		tertiary: Object.freeze({
 			base: '--vn-color-tertiary-base',
-			rgb: '--vn-color-tertiary-rgb',
-			subtle: '--vn-color-tertiary-subtle',
 			emphasis: '--vn-color-tertiary-emphasis',
-			border: '--vn-color-tertiary-border',
 		} as const),
 		success: Object.freeze({
 			base: '--vn-color-success-base',
@@ -239,7 +236,6 @@ export const TOKEN_NAMES = Object.freeze({
 		opacity: '--vn-focus-opacity',
 		color: '--vn-focus-color',
 		highlight: '--vn-focus-highlight',
-		reset: '--vn-focus-reset',
 	} as const),
 	state: Object.freeze({
 		mixer: '--vn-state-mixer',
```

`TokenMap` and `TokenName` in `src/core/types.ts` derive from `TOKEN_NAMES`, so they need no edit.
`npm run check` exits 0 with the hunk applied. The copy is in `tmp/units/tret-constants.diff.txt`.

## Guide changes

`guides/veneer.md` has these changes:

- § Color modes, the mode-scope paragraph: drops `--vn-focus-reset` from the list of names each mode
  scope declares again.
- § Semantic roles, opening: "Each role Bootstrap names carries a fill, its channel triplet, and
  the subtle, emphasis, and border tiers." It states that `tertiary` carries a fill and an emphasis
  tier alone.
- § Semantic roles, the aliased roles' `Role` table: removes the `tertiary` row, so the `Tier` table no longer
  expands the retired tiers over it.
- The `--vn-color-{role}-rgb` paragraph: "for every role apart from `tertiary`".
- The contrast paragraph: the tertiary triplet lives in `src/styles/_tokens.scss` alone, for the
  contrast rule.
- The end of § Semantic roles gets a paragraph, a `Role` table holding the tertiary fill, and a
  `Token` table holding `--vn-color-tertiary-emphasis`. The paragraph states that no Bootstrap class
  reads a subtle tier, a border tier, or a channel triplet for a role Bootstrap does not name. The
  emphasis row's value is
  `color-mix(in oklab, var(--vn-color-tertiary-base) 70%, var(--vn-text-body-base))`, with
  `the same expression` for dark, `derived`, and no alias. The reference-map proof resolves the
  fill row and the emphasis row in each mode.
- § Motion, focus, validation, breakpoints, and stacking: the focus row becomes
  `--vn-focus-highlight` | `Highlight` | `derived` — system outline for the shared focus mixin.
- Ledger rows: `npm run test:conformance` passed with no row change and printed no row to
  regenerate, so no ledger row changed. The § Engine sections are untouched.

## Plant table

`tmp/units/tret-plant.sh` backs up `src/styles/_mixins.scss` and applies the plant. It then rebuilds
the styles, runs the proof command, restores the file from the backup, checks it with `cmp`, and
rebuilds again.

| Plant | Edit | Failing proof and error | Restore |
| ----- | ---- | ----------------------- | ------- |
| `focus-reset` (`tmp/units/tret-plant-focus-reset.log.txt`) | `--vn-focus-reset: none;` after `--vn-focus-highlight` in the theme closure | `declares no focus reset token …`: `AssertionError: expected [ '--vn-focus-reset' ] to deeply equal []`. The registry proof also fails: `AssertionError: expected [ '--vn-border-color', …(191) ] to deeply equal [ '--vn-border-color', …(190) ]`. Result: `2 failed \| 98 passed (100)` | `cmp` reports identical; `restored identical` |
| `tertiary-subtle` (`tmp/units/tret-plant-tertiary-subtle.log.txt`) | the subtle tier's `@if $tiered {` becomes `@if true {` | `declares no focus reset token …`: `AssertionError: expected [ '--vn-color-tertiary-subtle' ] to deeply equal []`. The registry proof also fails as in the preceding row. Result: `2 failed \| 98 passed (100)` | `cmp` reports identical; `restored identical` |

## Gate table

Every gate ran serially after the final edit. Each log echoes the command first and ends with its
`exit=` line and `/proc/loadavg`.

| Gate | Log | Result | Exit | Load at end |
| ---- | --- | ------ | ---- | ----------- |
| `npm run check` | `tmp/units/tret-check.log.txt` | clean | 0 | `5.41 5.10 4.00` |
| `npm run lint:check` | `tmp/units/tret-lint-check.log.txt` | clean | 0 | `5.53 5.13 4.01` |
| `oxfmt --check`, owned files and the shared and fixture files | `tmp/units/tret-oxfmt.log.txt` | "All matched files use the correct format." | 0 | `4.09 4.81 3.94` |
| `npm run build:src` | `tmp/units/tret-build-src.log.txt` | built | 0 | `6.85 4.78 3.61` |
| `npm run test:setup` | `tmp/units/tret-setup.log.txt` | `357 passed (357)` | 0 | `5.89 4.81 3.67` |
| `npm run test:conformance` | `tmp/units/tret-conformance.log.txt` | `45 passed (45)` | 0 | `6.00 5.03 3.89` |
| `npm run test:guides` | `tmp/units/tret-guides.log.txt` | `26 passed (26)` | 0 | `6.42 5.19 3.97` |
| `npm run test:policy` | `tmp/units/tret-policy.log.txt` | `109 passed \| 1 skipped (110)` | 0 | `6.31 5.18 3.97` |
| Observation: `npm run test:src:styles` | `tmp/units/tret-src-styles.log.txt` | `Test Files 115 passed (115)`, `Tests 1564 passed (1564)` | 0 | `13.28 8.73 5.81` |

The earlier `npm run test:setup` run in `tmp/units/tret-setup-first.log.txt` failed a case with
`ENOENT … dist/src/core/index.js`, because `dist/src/core` was not yet built. It passed after
`npm run build:src`. The policy skip is the vendored `it.skipIf(!isPolicyFile(…))` case in
`tests/policy.test.ts`.

## Deviation state

- **Out-of-set file, needs a ruling.** The brief requires a proof that a `focus-ring` include with
  no `$reset` argument writes `box-shadow: none` under forced colors. Every shipped caller passes
  `$reset`, so only a test fixture can include the mixin bare. The mixin proof's only compile input
  is `tests/src/styles/fixtures/mixins.scss`, which only `tests/src/styles/mixins.test.ts` imports.
  That fixture is not in the owned set. I applied the include in the worktree, the same
  way the brief handles the shared `constants.ts` hunk, and I report it here for a ruling. If you
  refuse it, strike the `writes no shadow under forced colors …` case too; nothing else depends on
  it. Exact hunk:

  ```diff
  @@ -23,6 +23,12 @@
   	}
   }
   
  +// Includes the focus ring with no argument, so the proof reads the reset the mixin writes by default
  +// under forced colors. Every shipped caller passes its own reset, so no shipped rule shows it.
  +.vn-fixture-ring {
  +	@include focus-ring;
  +}
  +
   // Pins the fill the tiers mix and the body surface and body text they mix against, so the painted
  ```

- **Ancillary choices I settled:**
  - `role-each` takes the `$aliased` subset as a defaulted parameter, so the fixture's
    single-role call is unchanged.
  - The `theme-tokens` include of `role-each` gains the `$aliased` argument. That line sits outside
    `role-each` itself, and it is the call that makes the tier skip take effect.
  - The `:root` `-rgb` loop skips on `$aliased`.
  - The retired names are written inline in the proof as literals. They are an assertion's
    expectation, not a shared table.
  - The tertiary guide rows move to their own `Role` and `Token` tables after the `light` and `dark`
    tables, following the pattern those roles already use.
- **Observations outside scope, with no carrier chosen:**
  - The `ROADMAP.md` row for claim 5 stays open. `ROADMAP.md` is off-limits.
  - `tests/src/styles/utilities/background.test.ts` and `border.test.ts` still assert the tertiary
    subtle classes absent. They are correct as written and were not edited.
- No rendered reading changed, no gate read red after the `build:src` prerequisite ran, and no stop
  condition fired.
