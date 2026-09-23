# UTIL-SPACER (`us`) report — successor brief 2

`opus` on Opus 5, native subagent, worktree `/home/user/veneer-us` (branch `unit/us`, base `87ff1d0`). This run finished the first run's edits and did not restart. It kept the mixins, the gap partial, and their proofs, and fixed one defect in them: the order case read two viewports concurrently through `Promise.all`, and it went red, `1 failed | 20 passed`. It then wrote the Tailwind contract, the Layout proof, and the shared-file patches.

## Outcome

- Owned work is done and green under scoped gates. Two deviations need a ruling (§ Deviations): a write to `tests/service/tailwind/preflight.test.ts`, and a patch to the off-limits `tests/setupServer.test.ts` file that the guide patch requires.
- The exclusion line does not change. `gap-0` to `gap-5` ship with `!important` on the `gap` shorthand, which expands to `row-gap` and `column-gap` and covers every longhand Tailwind's `gap-N` rule declares. So these names stay off the line as shipped names, and the proofs are restated to the derived contract.
- `LayoutSection.test.ts` is red in the worktree until the `app/browser/constants.ts` patch integrates: `1 failed | 1 passed`, specimen list length 12 against 14. It is green with the patch applied in a probe copy.

## Touched files (owned)

| File | Change |
| --- | --- |
| `src/styles/_mixins.scss` | Appends `utility($class, $properties, $values, $infix, $responsive, $locals)` and `utility-variable($class, $variable, $values)`, with `@use 'sass:meta'`. Nothing else changed. |
| `src/styles/utilities/_gap.scss` | Builds a `$spacers` stand-in map over `--vn-gap-*`. Writes `gap`, `row-gap`, and `column-gap` through `utility` inside the one `breakpoint-each` walk, in the release map order. The gutters are untouched. |
| `tests/src/styles/fixtures/mixins.scss` | Adds a utility-partial-shaped caller covering these cases: responsive, static, classless, `null`-keyed, list-valued, a local, and `utility-variable`. |
| `tests/src/styles/mixins.test.ts` | Adds `describe('utility mixins')` with three cases: naming, gating, and priority. |
| `tests/src/styles/utilities/gap.test.ts` | Adds these readings: every step and infix for `gap` and `column-gap` beside the gutters and `row-gap`, density and retune, the dark island, cross-entry and cross-infix order, priority over an unlayered rule, and the `@layer utilities` escape. The order case now visits sequentially. |
| `tests/service/tailwind/profiles.test.ts` | Restates the universal-exclusion cases: each executed profile emits exactly the shared names off the line, and the `tailwind` profile fills `theme` and `utilities` but never `base`. |
| `tests/service/tailwind/consumer.test.ts` | Reads the importance branch on the real `.gap-3`, whose longhands are `row-gap` and `column-gap`, in place of the planted full-importance `col-1`. The partial-importance plant stays. |
| `tests/service/tailwind/preflight.test.ts` | Leaves generated utility rules out of the reset population and out of the base-only assertion. This file is Deviation 1. |
| `tests/fixtures/tailwind/markup.html` | Adds one `.row.gap-N` element per step, `0` to `5`. |
| `tests/app/browser/sections/LayoutSection.test.ts` | Expects the `Gap steps` and `Responsive gap` specimens and their selectors. |

`tests/setup.css`, `consumer.css`, `preflight.css`, `LayoutSection.ts`, `setupService.ts`, and `setupService.test.ts` are unchanged. The contract did not need them.

Diffstat (`git diff 87ff1d0 --stat`): 10 files changed, 463 insertions(+), 63 deletions(-). Review evidence: `us.diff` (launch path `tmp/units/us.diff`) and `us-status.txt` (launch path `tmp/units/us-status.txt`), both captured at hand-back. The status lists only the preceding 10 files as `M`.

## Scoped gate evidence (worktree)

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | "All matched files use the correct format" (291 files; `tmp/` not scanned) |
| `npm run lint:check` | 0 | — |
| `npm run check` | 0 | — |
| `npm run build:src` | 0 | — |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/mixins.test.ts tests/src/styles/utilities/gap.test.ts` | 0 | 2 files, 21 passed |
| `npm run build:src:styles && npm run test:service` | 0 | 3 files, 18 passed |
| `npm run test:conformance` (observation) | 0 | 21 passed (worktree, guide unpatched) |
| `npm run test:setup` (observation) | 0 | 250 passed |
| `npm run test:guides` (observation) | 0 | — |
| `npm run test:policy` (observation) | 0 | 109 passed, 1 skipped |

Baseline at `87ff1d0`, taken by the first run before any edit at 12:59:
- `npm run test:service` exited 0 with 3 files and 18 passed.
- The styles command over `gap.test.ts` and `mixins.test.ts` exited 0 with 2 files and 15 passed.

The following runs took place in a probe copy of the worktree with the shared patch applied. The copy was built from `git ls-files` plus a hard-linked `node_modules`, under `tmp/probe/tree`, and is deleted.

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run test:conformance` | 0 | 22 passed (the utilities-order case added) |
| `npm run test:guides` | 0 | 18 passed |
| `npm run test:setup` (with the `setupServer.test.ts` patch) | 0 | 250 passed; without that patch, 1 failed (`skips engine and CSS obligations whose Proof cell is a dash`) |
| `npm run test:setup:browser` | 0 | 65 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot` (whole styles project) | 0 | 76 files, 764 passed |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/LayoutSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | 0 | 7 passed |
| `npx oxfmt --config .oxfmtrc.json --check` over the patched shared files | 0 | — |

The journey, `CAPTURE=1`, and the regenerated frames were not run. They belong to the Orchestrator at landing, so no frames accompany this report.

## Failing-first evidence

- **Service contract.** Before the restatement, `npm run test:service` against the gap-shipping cascade exited 1 with `4 failed | 14 passed`:
  - `consumer > derives the shared class names…` failed: `gap-0`…`gap-5` were unmounted.
  - `preflight > derives the overlapping tags…` failed: `.gap-*` declarations sat outside `base`.
  - `profiles > fills Tailwind reset only under the preflight profile` failed: expected `[]`, received `['theme', 'utilities']`.
  - `profiles > withholds every shared class name…` failed: the universal-exclusion assertion.

  After the restatement, the same command exited 0 with 18 passed.
- **Negative controls.** Each control was applied and then copied back byte for byte.
  - Control A: `!important` dropped from `.gap-3` in the built cascade. Exit 1, `3 failed | 15 passed`. The red cases are `consumer > derives…` (the equality), `consumer > keeps an important shared declaration…` ("expected [gap-0, gap-1, gap-2, …] to include 'gap-3'"), and `consumer > keeps a shared name on the line…` (the equality).
  - Control B: `gap-3` written onto the line in `setup.css`, `consumer.css`, and `preflight.css`. Exit 1, `5 failed | 13 passed`. The red cases are:
    - `consumer > executes the recipe…` (the guide fence differs)
    - `consumer > derives…`
    - `consumer > keeps a shared name on the line…`
    - `profiles > withholds…` ("expected [...] to include 'gap-3'")
    - `profiles > holds every written copy…`
- **Styles mutation sweep.** Each mutation rebuilt `dist` and ran the owned styles command. Every mutation reddened:

| Mutation | Result | Red cases |
| --- | --- | --- |
| `!important` dropped from `utility` | `4 failed | 17 passed` | the mixins naming and priority cases; gap `keeps every gap priority over a later unlayered consumer rule`; gap `yields to an important override…` |
| `!important` added to `utility-variable` | `2 failed | 19 passed` | the mixins naming case (the `cssText`) and the priority case |
| `$responsive` ignored as always true | `1 failed | 20 passed` | the mixins naming case (the static entry gains infix classes) |
| `$responsive` ignored as always false | `8 failed | 13 passed` | the mixins naming and gating cases; gap order; every gap boundary case except `xs` |
| The hyphen always inserted (`.-vn-utility-visible`, `.vn-utility-border-`) | `1 failed | 20 passed` | the mixins naming case |
| Wrong step map (`--vn-gap-{5-n}`) | `11 failed | 10 passed` | every gap case |
| A step reads `--vn-space-*` | `11 failed | 10 passed` | every gap case |
| Density factor added | `7 failed | 14 passed` | the six boundary cases and the density case |
| Loop run per entry (three walks) | `1 failed | 20 passed` | gap `resolves a later entry over an earlier one…`: `.gap-md-4.column-gap-sm-2` at 768px reads 8px, not 24px |

- **Layout proof.** In the worktree, `LayoutSection.test.ts` exits 1 with `1 failed | 1 passed`, specimen names 12 against 14. With the constants patch in the probe copy, it exits 0.
- **Utilities-order case.** The case ran in the probe copy under `-t 'loads the helpers and the utilities'`, with each plant compiled.
  - Baseline: 1 passed.
  - Normal helper out of order (`components/vr` moved ahead of `components/icon-link`): 1 failed.
  - An important helper after a utility partial (`utilities/visually-hidden`, an empty partial loaded after `utilities/gap`): 1 failed.
  - The same partial loaded ahead of `utilities/gap`: 1 passed, the control.
  - An unmapped utility partial (`utilities/spare`): 1 failed.

Retained instruments are in `us-instruments/` (launch path `tmp/units/us-instruments/`): `mutate-service.sh`, `mutate-styles.py`, `mutate-order.sh`, and `compare.mjs`. Each one writes its backups and logs under `tmp/probe/`, so create that directory before a re-run. `mutate-order.sh` also expects the probe copy at `tmp/probe/tree`.

## Criterion 3 (built cascade)

The `compare.mjs` script compares the built cascade against a baseline compiled from the `87ff1d0` `_gap.scss` and `_mixins.scss` files:
- All 180 baseline `g`, `gx`, `gy`, and `row-gap` rules are present and unchanged, with the same selector, condition, and declarations.
- 72 rules were added: 36 `gap` and 36 `column-gap`.
- Against the inventory, each of the 36 `gap`, 36 `column-gap`, and 36 `row-gap` selectors appears once, at its recorded condition width. Each reads `<property>:var(--vn-gap-N)!important`, with no extra selector.

The release's `-moz-column-gap` is not emitted. It is recorded as `dropped` rows and as a departure bullet.

## Unknowns answered

- **Can the line carry `gap-*` off while the universal-exclusion cases stand?** No. Those cases asserted that the executed profile emits nothing, which is false once an important shared name ships. The unit restated them per R10. Before and after readings for each service case are in § Failing-first evidence.
- **What does Tailwind's `gap-N` rule declare?** Only the `gap` shorthand. Chromium expands it to `row-gap` and `column-gap`, and the consumer proof asserts `longhands.get('gap-3')` equals `['row-gap', 'column-gap']`. The compiled values are `0px` for `gap-0`, `var(--spacing)` for `gap-1`, and `calc(var(--spacing) * N)` from `gap-2` up. No custom property is declared, so `.gap-N` with important `gap` leaves the line.

## Coverage matrix (`gap`, `column-gap`)

The inventory records 36 selectors per key: steps `0` to `5` at the infixes `""`, `-sm`, `-md`, `-lg`, `-xl`, and `-xxl`, with the conditions `@media (min-width: 576|768|992|1200|1400px)`.

| Inventory population | Proof case | Specimen | Scenario |
| --- | --- | --- | --- |
| `.gap-{0..5}`, no condition | `gap.test.ts` `resolves every step around the 'xs' boundary` (375, 1401); density and retune; dark island (`.gap-3`); priority; escape (`.gap-4`) | `Gap steps` (every step) | `gap-steps` (`.gap-5`, `column-gap`) |
| `.gap-{sm..xxl}-{0..5}`, each `min-width` condition | `resolves every step around the '<name>' boundary`, at the boundary, one pixel below, and one pixel above; order case (`.gap-md-4` at 767 and 768) | `Responsive gap` (`gap-md-3`) | `responsive-gap` (`.gap-md-3`, `column-gap`) |
| `.column-gap-{0..5}`, no condition | the `xs` boundary case; density and retune (`.column-gap-4`); dark island (`.column-gap-5`); order (`.column-gap-5` over `.gap-3`, `.column-gap-2` over `.gap-4`); priority; escape | `Gap steps` resolves no bare `.column-gap-N`; `Responsive gap` carries `column-gap-xl-2` | — |
| `.column-gap-{sm..xxl}-{0..5}`, each condition | each boundary case; order case (`.column-gap-sm-2` at 767, and under `.gap-md-4` at 768) | `Responsive gap` (`column-gap-xl-2`) | `responsive-gap` reads `column-gap` at both widths |
| `-moz-column-gap` on every `column-gap` selector | not emitted; `#### column-gap` `dropped` rows under the ledger gate | — | — |

The mode reading is `resolves the same steps inside a dark island`, with no mode rule in the partial. The token reading is the `--vn-gap-4` retune on every axis. The factor's absence is read under `--vn-factor-density: 2`.

## Shared-name table

| Name | Tailwind longhands (instrument, expanded) | Veneer important longhands (built cascade, expanded) | Line status |
| --- | --- | --- | --- |
| `gap-0` … `gap-5` | `row-gap`, `column-gap` | `row-gap`, `column-gap` | off the line; emitted by both executed profiles; the page resolves Veneer's value |
| `caption-bottom`, `caption-top`, `col-auto`, `col-1` … `col-12`, `container`, `table` | unchanged | none | on the line (unchanged) |

The executed profiles emit exactly `.gap-0` to `.gap-5`, and the profiles proof asserts this. The line and its copies are unchanged, so no line names are returned for the set union.

## Precedence cases and their mutations

| Case | Reading | Mutation that reddens it |
| --- | --- | --- |
| Axis entry over `gap` at one infix | `.gap-3.row-gap-1.column-gap-5` resolves 4px and 48px; `.column-gap-2.gap-4` resolves 24px and 8px | reorder the entries or run the loop per entry |
| Wider infix over narrower | `.gap-md-4.column-gap-sm-2` resolves `normal`/`8px` at 767 and `24px`/`24px` at 768 | loop per entry (8px at 768) |
| Priority over a later unlayered rule | `.row { gap: 7px }` leaves 24px on each shipped axis | `!important` dropped from `utility` |
| `@layer utilities` escape | unlayered `gap: 9px !important` leaves 24px; `@layer utilities { … column-gap: 2rem !important }` moves it to 32px | `!important` dropped (the unlayered important then wins) |
| Tailwind importance branch | `.gap-3` is in the branch; with the line dropped, every branch element resolves the cascade's values | Control A |

## Ledger rows

These rows are in the guide patch that follows. They are generated from the gate's own `unrecorded` output (`npm run test:conformance` over the patched compatibility rows) and aligned by `oxfmt`.
- `#### gap` holds 36 rows, one per selector: `gap` with the recorded value against `var(--vn-gap-N)`, `tokenized`.
- `#### column-gap` holds 72 rows: per selector, a `column-gap` `tokenized` row and a `-moz-column-gap` `dropped` row.

The `dropped` rows carry the inventory's condition form, `@media (min-width: …)`, because the gate prints it that way. The `tokenized` rows carry `@media (width >= …)`.

The compatibility rows `gap` and `column-gap` are added as `shipped`. The conformance `listed` array gains `'column-gap'` and `'gap'`.

## Shared-file patches

The shared-file patch file is `us-shared.patch` (launch path `/home/user/veneer-us/tmp/units/us-shared.patch`). It covers `app/browser/constants.ts`, `tests/setup.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts` (off-limits, Deviation 2), `tests/setupStyles.ts`, `guides/veneer.md`, and `ROADMAP.md`. `git -C /home/user/veneer-us apply --check tmp/units/us-shared.patch` passes. Every patched file passes `oxfmt --check`.

No patch is needed for these files:
- `src/styles/index.scss`: `_gap.scss` is already loaded.
- `tests/setup.test.ts`: the registry cases pass with the rows appended, `test:setup` 250 passed.
- `tests/app/browser/integration.test.ts`: the journey iterates `CASCADE_KEYS` and needs no edit. Its run is the Orchestrator's.

The patch follows in full.

```diff
--- a/app/browser/constants.ts
+++ b/app/browser/constants.ts
@@ -497,7 +497,7 @@
 export const LAYOUT_COPY = Object.freeze({
 	region: 'Layout',
 	paragraph:
-		'Containers center content with inline gutters, and a vertical rule separates inline content. Resize the viewport to compare their caps, grid columns, offsets, row counts, and gutter and row-gap steps.',
+		'Containers center content with inline gutters, and a vertical rule separates inline content. Resize the viewport to compare their caps, grid columns, offsets, row counts, gutter and row-gap steps, and gap steps.',
 })
 
 /** Lists the container and grid specimens. */
@@ -577,6 +577,20 @@
 		markup:
 			'<div class="navbar"><div class="container-fluid"><span>Leading content</span><div class="vr"></div><span>Trailing content</span></div></div>',
 	}),
+	Object.freeze({
+		name: 'Gap steps',
+		markup: Object.keys(TOKEN_NAMES.gap)
+			.map(
+				(step) =>
+					`<div class="row row-cols-auto g-0 gap-${String(step)}"><div class="card"><div class="card-body">Gap ${String(step)}</div></div><div class="card"><div class="card-body">Neighbor</div></div></div>`,
+			)
+			.join(''),
+	}),
+	Object.freeze({
+		name: 'Responsive gap',
+		markup:
+			'<div class="row row-cols-auto g-0 gap-1 gap-md-3 row-gap-lg-5 column-gap-xl-2"><div class="card"><div class="card-body">Resize for gap steps</div></div><div class="card"><div class="card-body">Column gap</div></div><div class="card"><div class="card-body">Row gap on wrap</div></div></div>',
+	}),
 ])
 
 /** Holds the Table section's visible copy and accessible name. */
--- a/tests/setup.ts
+++ b/tests/setup.ts
@@ -197,6 +197,8 @@
 	| 'Vertical group'
 	| 'Wrapping toolbar'
 	| 'Waving placeholder'
+	| 'Gap steps'
+	| 'Responsive gap'
 
 /**
  * Names one state a journey drives its subject to, or reads that subject in.
@@ -1063,6 +1065,18 @@
 		selector: 'legend.col-form-label',
 		property: 'margin-bottom',
 	}),
+	Object.freeze({
+		scenario: 'gap-steps',
+		subject: 'Gap steps',
+		selector: '.gap-5',
+		property: 'column-gap',
+	}),
+	Object.freeze({
+		scenario: 'responsive-gap',
+		subject: 'Responsive gap',
+		selector: '.gap-md-3',
+		property: 'column-gap',
+	}),
 ])
 
 /**
--- a/tests/conformance.test.ts
+++ b/tests/conformance.test.ts
@@ -105,6 +105,7 @@
 			'btn-toolbar',
 			'card',
 			'col',
+			'column-gap',
 			'container',
 			'display',
 			'figure',
@@ -115,6 +116,7 @@
 			'form-range',
 			'form-select',
 			'g',
+			'gap',
 			'gx',
 			'gy',
 			'h1',
@@ -349,6 +351,78 @@
 		].flatMap(([, name]) => (name === undefined ? [] : [name]))
 		expect(loaded.filter((name) => release.includes(name))).toEqual(release)
 	})
+
+	it('loads the helpers and the utilities in the release order, each important helper ahead of the utilities', () => {
+		// The release imports its helpers from one partial and declares its utilities as one map, in
+		// that order. A helper whose declarations are normal sits in the components layer in the
+		// release's helper order. A helper the release writes with `!important` sits in the utilities
+		// layer ahead of every utility partial, because the cascade reverses layer order for important
+		// declarations, so an earlier layer's important declaration beats a later one's. The utility
+		// partials follow the map's entry order, which is the order the release emits them in. Each
+		// release name reaches the barrel path of the Veneer partial writing it: a helper defaults to
+		// its own name under `components`, an entry to its own name under `utilities`, and each
+		// record names the paths that differ. The `color-bg` helper's rules head the `color` utility
+		// partial, so that partial takes the utility's place in the order.
+		const scss = resolve(dirname(BOOTSTRAP_MANIFEST_PATH), 'scss')
+		const helpers = [
+			...readFileSync(resolve(scss, '_helpers.scss'), 'utf8').matchAll(
+				/@import "helpers\/([\w-]+)";/gu,
+			),
+		].flatMap(([, name]) => (name === undefined ? [] : [name]))
+		expect(helpers).toEqual([
+			'clearfix',
+			'color-bg',
+			'colored-links',
+			'focus-ring',
+			'icon-link',
+			'ratio',
+			'position',
+			'stacks',
+			'visually-hidden',
+			'stretched-link',
+			'text-truncation',
+			'vr',
+		])
+		const entries = [
+			...readFileSync(resolve(scss, '_utilities.scss'), 'utf8').matchAll(/^ {4}"([\w-]+)": \(/gmu),
+		].flatMap(([, name]) => (name === undefined ? [] : [name]))
+		expect(entries.slice(entries.indexOf('gap'), entries.indexOf('gap') + 3)).toEqual([
+			'gap',
+			'row-gap',
+			'column-gap',
+		])
+		const helperPaths: Readonly<Record<string, string>> = {
+			'color-bg': 'utilities/color',
+			'colored-links': 'utilities/link',
+			'visually-hidden': 'utilities/visually-hidden',
+		}
+		const entryPaths: Readonly<Record<string, string>> = {
+			'row-gap': 'utilities/gap',
+			'column-gap': 'utilities/gap',
+		}
+		const helperOrder = helpers.map((name) => helperPaths[name] ?? `components/${name}`)
+		const utilityOrder = [
+			...new Set(entries.map((name) => entryPaths[name] ?? `utilities/${name}`)),
+		]
+		const loaded = [
+			...readFileSync(resolve(WORKSPACE_ROOT, 'src/styles/index.scss'), 'utf8').matchAll(
+				/^@use '((?:components|utilities)\/[\w-]+)'/gmu,
+			),
+		].flatMap(([, path]) => (path === undefined ? [] : [path]))
+		expect(loaded).toContain('utilities/gap')
+		const components = helperOrder.filter((path) => path.startsWith('components/'))
+		expect(loaded.filter((path) => components.includes(path))).toEqual(
+			components.filter((path) => loaded.includes(path)),
+		)
+		expect(loaded.filter((path) => path.startsWith('utilities/'))).toEqual(
+			[
+				...helperOrder.filter(
+					(path) => path.startsWith('utilities/') && !utilityOrder.includes(path),
+				),
+				...utilityOrder,
+			].filter((path) => loaded.includes(path)),
+		)
+	})
 })
 
 describe('runtime boundaries', () => {
--- a/tests/setupServer.test.ts
+++ b/tests/setupServer.test.ts
@@ -1345,6 +1345,7 @@
 				'btn-toolbar',
 				'card',
 				'col',
+				'column-gap',
 				'container',
 				'display',
 				'engine',
@@ -1356,6 +1357,7 @@
 				'form-range',
 				'form-select',
 				'g',
+				'gap',
 				'gx',
 				'gy',
 				'h1',
--- a/tests/setupStyles.ts
+++ b/tests/setupStyles.ts
@@ -1828,7 +1828,7 @@
 /** Lists the offset steps, with zero emitted only at a non-zero breakpoint. */
 export const GRID_OFFSET_STEPS = Object.freeze([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
 
-/** Pins the density-independent gutter and row-gap steps against the official inventory. */
+/** Pins the density-independent gutter and gap steps against the official inventory. */
 export const GAP_STEP_CASES = Object.freeze([
 	Object.freeze({ step: 0, value: '0', pixels: 0, token: TOKEN_NAMES.gap[0] }),
 	Object.freeze({ step: 1, value: '0.25rem', pixels: 4, token: TOKEN_NAMES.gap[1] }),
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -255,7 +255,7 @@
 | `src/styles/elements/_iframe.scss`          | The iframe family and its mandated pairs in the elements layer.                                                                                                                                                                                    |
 | `src/styles/elements/_details.scss`         | The details family and its mandated pairs in the elements layer.                                                                                                                                                                                   |
 | `src/styles/elements/_progress.scss`        | The progress family and its mandated pairs in the elements layer.                                                                                                                                                                                  |
-| `src/styles/utilities/_gap.scss`            | The gutter and row-gap step utilities in the utilities layer.                                                                                                                                                                                      |
+| `src/styles/utilities/_gap.scss`            | The gutter and gap step utilities in the utilities layer.                                                                                                                                                                                          |
 | `src/styles/index.scss`                     | The compilation barrel.                                                                                                                                                                                                                            |
 | `src/styles/index.ts`                       | The side-effect entry, and the build's library entry.                                                                                                                                                                                              |
 | `configs/src/vite.styles.config.ts`         | The build and test wrapper, composed from the root's `srcBrowser` factory.                                                                                                                                                                         |
@@ -418,22 +418,26 @@
 name that gains the `!important` declarations the rule asks for leaves the line. The proof reads
 Tailwind's longhands from the unexcluded instrument and Veneer's importance from the built cascade,
 each as Chromium expands it, so a shorthand counts as the longhands it sets. The importance branch
-runs over the shared names that rule lets leave the line. No shipped shared name is important, so
-that branch is driven by planted `!important` declarations on the `grid-column-start` and
-`grid-column-end` longhands Tailwind's `col-1` rule declares, and it reads what the rule claims:
-with the exclusion line dropped and Tailwind's own rule on the page, the element resolves, for
-every property that rule declares, what it resolves under the cascade and the plant alone. The
-partial-importance plant makes only the `grid-column-start` longhand important, and the equality
-still holds with the `col-1` class on the line.
+runs over the shared names that rule lets leave the line. The gap steps `gap-0` to `gap-5` are the
+shipped names off the line: Tailwind's rule for each declares the `gap` shorthand, which Chromium
+expands to the `row-gap` and `column-gap` longhands, and Veneer declares the same shorthand with
+`!important`. The proof asserts that `gap-3` is in the branch and reads what the rule claims: with
+the exclusion line dropped and Tailwind's own rule on the page, every element carrying a name in the
+branch resolves, for every property that rule declares, what it resolves under the cascade alone.
+A planted declaration drives the partial-importance case: it makes only the `grid-column-start`
+longhand of Tailwind's `col-1` rule important, and the equality still holds with the `col-1` class
+on the line.
 
 The workspace executes the profiles from `tests/setup.css` for the `tailwind` profile and
 `tests/fixtures/tailwind/preflight.css` for the `preflight` profile. Those profiles scan a
-candidate list derived from the built cascade rather than your markup, and every name that list
-offers is on the exclusion line, so the executed `tailwind` profile emits nothing at all — and that
-silence is what proves the exclusion complete. The `tests/fixtures/tailwind/unexcluded.css`
-instrument drops the line and adds an `@source inline(…)` control naming utilities the cascade
-declares no class for, so the same compilation emits something and the composed imports are read
-from what it emits.
+candidate list derived from the built cascade rather than your markup, so every utility an executed
+profile emits is a shared name, and the stylesheet profiles proof holds each profile's emitted
+utilities equal to the shared names off the exclusion line, the gap steps among them. A name that
+stays on the line is withheld, and a name that leaves it is generated and loses to Veneer's
+important declaration. The `tests/fixtures/tailwind/unexcluded.css` instrument drops the line and
+adds an `@source inline(…)` control naming utilities the cascade declares no class for, so its
+compilation emits something whatever the line holds, and the composed imports are read from what
+it emits.
 
 The proofs under `tests/service/tailwind/` run in the `service` project. They compile each profile
 in Node through the installed `@tailwindcss/postcss` plugin, from the profile's own path; they read
@@ -1701,6 +1705,44 @@
 
 `tests/src/styles/components/close.test.ts` reads each resolved treatment in the browser.
 
+### Gap utilities
+
+The gap keys ship whole in the utilities layer, from the `src/styles/utilities/_gap.scss` partial
+beside the gutter classes: `.gap-*` sets both axes, `.row-gap-*` the row axis, and
+`.column-gap-*` the column axis, each at the steps `0` to `5` and at every breakpoint infix. The
+gutter classes `.g-*`, `.gx-*`, and `.gy-*` set the `--bs-gutter-x` and `--bs-gutter-y` properties
+the grid reads, and they stay in the same partial and the same layer.
+
+Every step reads the `--vn-gap-*` scale the gutters read, and that scale carries no density factor,
+so a retuned `--vn-gap-3` token moves `.gap-3`, `.row-gap-3`, `.column-gap-3`, and `.g-3` together,
+and the `--vn-factor-density` token moves none of them. Each gap declaration carries the
+`!important` the release writes, and the gutter properties stay normal, as the release writes them.
+§ Styles shows the escape from an important utility inside the utilities layer.
+
+The partial writes the gap keys through the `utility` mixin in `src/styles/_mixins.scss`, which names
+each class the way the release's utility API names it: the class, then the infix, then a hyphen and
+the step. The mixin writes every property with `!important` and every local variable it is given
+without it, and its `utility-variable` sibling writes a `--bs-*` custom property utility without it,
+as the release writes a `css-var` utility. The partial walks the breakpoints once and writes every
+entry inside each infix in the release's map order: `gap`, then `row-gap`, then `column-gap`. So at
+one infix an axis class beats `.gap-*` on its own axis, and a wider infix beats every narrower one:
+at a 768px viewport, `.gap-md-4.column-gap-sm-2` resolves a 24px column gap.
+
+`tests/src/styles/utilities/gap.test.ts` reads each step at every infix at its boundary and one pixel
+below it, the density factor and a retuned step, a dark island, the order between entries and
+between infixes, the priority over a later unlayered rule, and the escape inside the utilities layer.
+`tests/src/styles/mixins.test.ts` reads the mixins' naming, their breakpoint gating, and the priority
+of each declaration they write, from a fixture that calls them the way a utility partial does.
+
+These are the keys' recorded departures.
+
+- **The steps read Veneer's gap scale.** The release writes each step as a literal length; Veneer
+  writes `var(--vn-gap-0)` to `var(--vn-gap-5)`, which resolve to the same lengths and move with the
+  gutters.
+- **The prefixed column-gap property is absent.** The official cascade carries `-moz-column-gap`
+  beside `column-gap`; Veneer emits the standard property alone, because the managed Chromium and
+  Edge receipts this cascade is proved on resolve it and leave the alias redundant.
+
 ### Deferred selectors
 
 Each row names an official selector or custom property withheld from the built cascade, its reason,
@@ -2049,9 +2091,9 @@
 576px, `--vn-container-md` from 768px, and `--vn-container-xxl` from 1400px. `.container-fluid` reads
 no cap.
 
-The gutter and row-gap utilities read a separate scale. Its tokens carry no density factor,
+The gutter and gap utilities read a separate scale. Its tokens carry no density factor,
 matching the default gutter tokens. Override a step to retune its utilities without changing the
-default gutters. The `gap` and `column-gap` keys remain assigned to the utilities family.
+default gutters. § Gap utilities names the classes that read it.
 
 | Token        | Value     | Source                              | Alias |
 | ------------ | --------- | ----------------------------------- | ----- |
@@ -2574,6 +2616,83 @@
 | `col`     | `.col-form-label-sm` | `padding-bottom` | —         | `calc(0.25rem + var(--bs-border-width))`  | `calc(var(--vn-space-2) + var(--bs-border-width))` | tokenized |
 | `col`     | `.col-form-label-sm` | `font-size`      | —         | `0.875rem`                                | `var(--vn-size-2)`                                 | tokenized |
 
+#### `column-gap`
+
+| Component    | Selector            | Property          | Condition                    | Bootstrap 5.3.8 | Veneer            | Departure |
+| ------------ | ------------------- | ----------------- | ---------------------------- | --------------- | ----------------- | --------- |
+| `column-gap` | `.column-gap-0`     | `-moz-column-gap` | —                            | `0`             | —                 | dropped   |
+| `column-gap` | `.column-gap-0`     | `column-gap`      | —                            | `0`             | `var(--vn-gap-0)` | tokenized |
+| `column-gap` | `.column-gap-1`     | `-moz-column-gap` | —                            | `0.25rem`       | —                 | dropped   |
+| `column-gap` | `.column-gap-1`     | `column-gap`      | —                            | `0.25rem`       | `var(--vn-gap-1)` | tokenized |
+| `column-gap` | `.column-gap-2`     | `-moz-column-gap` | —                            | `0.5rem`        | —                 | dropped   |
+| `column-gap` | `.column-gap-2`     | `column-gap`      | —                            | `0.5rem`        | `var(--vn-gap-2)` | tokenized |
+| `column-gap` | `.column-gap-3`     | `-moz-column-gap` | —                            | `1rem`          | —                 | dropped   |
+| `column-gap` | `.column-gap-3`     | `column-gap`      | —                            | `1rem`          | `var(--vn-gap-3)` | tokenized |
+| `column-gap` | `.column-gap-4`     | `-moz-column-gap` | —                            | `1.5rem`        | —                 | dropped   |
+| `column-gap` | `.column-gap-4`     | `column-gap`      | —                            | `1.5rem`        | `var(--vn-gap-4)` | tokenized |
+| `column-gap` | `.column-gap-5`     | `-moz-column-gap` | —                            | `3rem`          | —                 | dropped   |
+| `column-gap` | `.column-gap-5`     | `column-gap`      | —                            | `3rem`          | `var(--vn-gap-5)` | tokenized |
+| `column-gap` | `.column-gap-sm-0`  | `-moz-column-gap` | `@media (min-width: 576px)`  | `0`             | —                 | dropped   |
+| `column-gap` | `.column-gap-sm-0`  | `column-gap`      | `@media (width >= 576px)`    | `0`             | `var(--vn-gap-0)` | tokenized |
+| `column-gap` | `.column-gap-sm-1`  | `-moz-column-gap` | `@media (min-width: 576px)`  | `0.25rem`       | —                 | dropped   |
+| `column-gap` | `.column-gap-sm-1`  | `column-gap`      | `@media (width >= 576px)`    | `0.25rem`       | `var(--vn-gap-1)` | tokenized |
+| `column-gap` | `.column-gap-sm-2`  | `-moz-column-gap` | `@media (min-width: 576px)`  | `0.5rem`        | —                 | dropped   |
+| `column-gap` | `.column-gap-sm-2`  | `column-gap`      | `@media (width >= 576px)`    | `0.5rem`        | `var(--vn-gap-2)` | tokenized |
+| `column-gap` | `.column-gap-sm-3`  | `-moz-column-gap` | `@media (min-width: 576px)`  | `1rem`          | —                 | dropped   |
+| `column-gap` | `.column-gap-sm-3`  | `column-gap`      | `@media (width >= 576px)`    | `1rem`          | `var(--vn-gap-3)` | tokenized |
+| `column-gap` | `.column-gap-sm-4`  | `-moz-column-gap` | `@media (min-width: 576px)`  | `1.5rem`        | —                 | dropped   |
+| `column-gap` | `.column-gap-sm-4`  | `column-gap`      | `@media (width >= 576px)`    | `1.5rem`        | `var(--vn-gap-4)` | tokenized |
+| `column-gap` | `.column-gap-sm-5`  | `-moz-column-gap` | `@media (min-width: 576px)`  | `3rem`          | —                 | dropped   |
+| `column-gap` | `.column-gap-sm-5`  | `column-gap`      | `@media (width >= 576px)`    | `3rem`          | `var(--vn-gap-5)` | tokenized |
+| `column-gap` | `.column-gap-md-0`  | `-moz-column-gap` | `@media (min-width: 768px)`  | `0`             | —                 | dropped   |
+| `column-gap` | `.column-gap-md-0`  | `column-gap`      | `@media (width >= 768px)`    | `0`             | `var(--vn-gap-0)` | tokenized |
+| `column-gap` | `.column-gap-md-1`  | `-moz-column-gap` | `@media (min-width: 768px)`  | `0.25rem`       | —                 | dropped   |
+| `column-gap` | `.column-gap-md-1`  | `column-gap`      | `@media (width >= 768px)`    | `0.25rem`       | `var(--vn-gap-1)` | tokenized |
+| `column-gap` | `.column-gap-md-2`  | `-moz-column-gap` | `@media (min-width: 768px)`  | `0.5rem`        | —                 | dropped   |
+| `column-gap` | `.column-gap-md-2`  | `column-gap`      | `@media (width >= 768px)`    | `0.5rem`        | `var(--vn-gap-2)` | tokenized |
+| `column-gap` | `.column-gap-md-3`  | `-moz-column-gap` | `@media (min-width: 768px)`  | `1rem`          | —                 | dropped   |
+| `column-gap` | `.column-gap-md-3`  | `column-gap`      | `@media (width >= 768px)`    | `1rem`          | `var(--vn-gap-3)` | tokenized |
+| `column-gap` | `.column-gap-md-4`  | `-moz-column-gap` | `@media (min-width: 768px)`  | `1.5rem`        | —                 | dropped   |
+| `column-gap` | `.column-gap-md-4`  | `column-gap`      | `@media (width >= 768px)`    | `1.5rem`        | `var(--vn-gap-4)` | tokenized |
+| `column-gap` | `.column-gap-md-5`  | `-moz-column-gap` | `@media (min-width: 768px)`  | `3rem`          | —                 | dropped   |
+| `column-gap` | `.column-gap-md-5`  | `column-gap`      | `@media (width >= 768px)`    | `3rem`          | `var(--vn-gap-5)` | tokenized |
+| `column-gap` | `.column-gap-lg-0`  | `-moz-column-gap` | `@media (min-width: 992px)`  | `0`             | —                 | dropped   |
+| `column-gap` | `.column-gap-lg-0`  | `column-gap`      | `@media (width >= 992px)`    | `0`             | `var(--vn-gap-0)` | tokenized |
+| `column-gap` | `.column-gap-lg-1`  | `-moz-column-gap` | `@media (min-width: 992px)`  | `0.25rem`       | —                 | dropped   |
+| `column-gap` | `.column-gap-lg-1`  | `column-gap`      | `@media (width >= 992px)`    | `0.25rem`       | `var(--vn-gap-1)` | tokenized |
+| `column-gap` | `.column-gap-lg-2`  | `-moz-column-gap` | `@media (min-width: 992px)`  | `0.5rem`        | —                 | dropped   |
+| `column-gap` | `.column-gap-lg-2`  | `column-gap`      | `@media (width >= 992px)`    | `0.5rem`        | `var(--vn-gap-2)` | tokenized |
+| `column-gap` | `.column-gap-lg-3`  | `-moz-column-gap` | `@media (min-width: 992px)`  | `1rem`          | —                 | dropped   |
+| `column-gap` | `.column-gap-lg-3`  | `column-gap`      | `@media (width >= 992px)`    | `1rem`          | `var(--vn-gap-3)` | tokenized |
+| `column-gap` | `.column-gap-lg-4`  | `-moz-column-gap` | `@media (min-width: 992px)`  | `1.5rem`        | —                 | dropped   |
+| `column-gap` | `.column-gap-lg-4`  | `column-gap`      | `@media (width >= 992px)`    | `1.5rem`        | `var(--vn-gap-4)` | tokenized |
+| `column-gap` | `.column-gap-lg-5`  | `-moz-column-gap` | `@media (min-width: 992px)`  | `3rem`          | —                 | dropped   |
+| `column-gap` | `.column-gap-lg-5`  | `column-gap`      | `@media (width >= 992px)`    | `3rem`          | `var(--vn-gap-5)` | tokenized |
+| `column-gap` | `.column-gap-xl-0`  | `-moz-column-gap` | `@media (min-width: 1200px)` | `0`             | —                 | dropped   |
+| `column-gap` | `.column-gap-xl-0`  | `column-gap`      | `@media (width >= 1200px)`   | `0`             | `var(--vn-gap-0)` | tokenized |
+| `column-gap` | `.column-gap-xl-1`  | `-moz-column-gap` | `@media (min-width: 1200px)` | `0.25rem`       | —                 | dropped   |
+| `column-gap` | `.column-gap-xl-1`  | `column-gap`      | `@media (width >= 1200px)`   | `0.25rem`       | `var(--vn-gap-1)` | tokenized |
+| `column-gap` | `.column-gap-xl-2`  | `-moz-column-gap` | `@media (min-width: 1200px)` | `0.5rem`        | —                 | dropped   |
+| `column-gap` | `.column-gap-xl-2`  | `column-gap`      | `@media (width >= 1200px)`   | `0.5rem`        | `var(--vn-gap-2)` | tokenized |
+| `column-gap` | `.column-gap-xl-3`  | `-moz-column-gap` | `@media (min-width: 1200px)` | `1rem`          | —                 | dropped   |
+| `column-gap` | `.column-gap-xl-3`  | `column-gap`      | `@media (width >= 1200px)`   | `1rem`          | `var(--vn-gap-3)` | tokenized |
+| `column-gap` | `.column-gap-xl-4`  | `-moz-column-gap` | `@media (min-width: 1200px)` | `1.5rem`        | —                 | dropped   |
+| `column-gap` | `.column-gap-xl-4`  | `column-gap`      | `@media (width >= 1200px)`   | `1.5rem`        | `var(--vn-gap-4)` | tokenized |
+| `column-gap` | `.column-gap-xl-5`  | `-moz-column-gap` | `@media (min-width: 1200px)` | `3rem`          | —                 | dropped   |
+| `column-gap` | `.column-gap-xl-5`  | `column-gap`      | `@media (width >= 1200px)`   | `3rem`          | `var(--vn-gap-5)` | tokenized |
+| `column-gap` | `.column-gap-xxl-0` | `-moz-column-gap` | `@media (min-width: 1400px)` | `0`             | —                 | dropped   |
+| `column-gap` | `.column-gap-xxl-0` | `column-gap`      | `@media (width >= 1400px)`   | `0`             | `var(--vn-gap-0)` | tokenized |
+| `column-gap` | `.column-gap-xxl-1` | `-moz-column-gap` | `@media (min-width: 1400px)` | `0.25rem`       | —                 | dropped   |
+| `column-gap` | `.column-gap-xxl-1` | `column-gap`      | `@media (width >= 1400px)`   | `0.25rem`       | `var(--vn-gap-1)` | tokenized |
+| `column-gap` | `.column-gap-xxl-2` | `-moz-column-gap` | `@media (min-width: 1400px)` | `0.5rem`        | —                 | dropped   |
+| `column-gap` | `.column-gap-xxl-2` | `column-gap`      | `@media (width >= 1400px)`   | `0.5rem`        | `var(--vn-gap-2)` | tokenized |
+| `column-gap` | `.column-gap-xxl-3` | `-moz-column-gap` | `@media (min-width: 1400px)` | `1rem`          | —                 | dropped   |
+| `column-gap` | `.column-gap-xxl-3` | `column-gap`      | `@media (width >= 1400px)`   | `1rem`          | `var(--vn-gap-3)` | tokenized |
+| `column-gap` | `.column-gap-xxl-4` | `-moz-column-gap` | `@media (min-width: 1400px)` | `1.5rem`        | —                 | dropped   |
+| `column-gap` | `.column-gap-xxl-4` | `column-gap`      | `@media (width >= 1400px)`   | `1.5rem`        | `var(--vn-gap-4)` | tokenized |
+| `column-gap` | `.column-gap-xxl-5` | `-moz-column-gap` | `@media (min-width: 1400px)` | `3rem`          | —                 | dropped   |
+| `column-gap` | `.column-gap-xxl-5` | `column-gap`      | `@media (width >= 1400px)`   | `3rem`          | `var(--vn-gap-5)` | tokenized |
+
 #### `container`
 
 | Component   | Selector           | Property        | Condition                  | Bootstrap 5.3.8 | Veneer                    | Departure |
@@ -2719,6 +2838,47 @@
 | `g`       | `.g-xxl-5` | `--bs-gutter-x` | `@media (width >= 1400px)` | `3rem`          | `var(--vn-gap-5)` | tokenized |
 | `g`       | `.g-xxl-5` | `--bs-gutter-y` | `@media (width >= 1400px)` | `3rem`          | `var(--vn-gap-5)` | tokenized |
 
+#### `gap`
+
+| Component | Selector     | Property | Condition                  | Bootstrap 5.3.8 | Veneer            | Departure |
+| --------- | ------------ | -------- | -------------------------- | --------------- | ----------------- | --------- |
+| `gap`     | `.gap-0`     | `gap`    | —                          | `0`             | `var(--vn-gap-0)` | tokenized |
+| `gap`     | `.gap-1`     | `gap`    | —                          | `0.25rem`       | `var(--vn-gap-1)` | tokenized |
+| `gap`     | `.gap-2`     | `gap`    | —                          | `0.5rem`        | `var(--vn-gap-2)` | tokenized |
+| `gap`     | `.gap-3`     | `gap`    | —                          | `1rem`          | `var(--vn-gap-3)` | tokenized |
+| `gap`     | `.gap-4`     | `gap`    | —                          | `1.5rem`        | `var(--vn-gap-4)` | tokenized |
+| `gap`     | `.gap-5`     | `gap`    | —                          | `3rem`          | `var(--vn-gap-5)` | tokenized |
+| `gap`     | `.gap-sm-0`  | `gap`    | `@media (width >= 576px)`  | `0`             | `var(--vn-gap-0)` | tokenized |
+| `gap`     | `.gap-sm-1`  | `gap`    | `@media (width >= 576px)`  | `0.25rem`       | `var(--vn-gap-1)` | tokenized |
+| `gap`     | `.gap-sm-2`  | `gap`    | `@media (width >= 576px)`  | `0.5rem`        | `var(--vn-gap-2)` | tokenized |
+| `gap`     | `.gap-sm-3`  | `gap`    | `@media (width >= 576px)`  | `1rem`          | `var(--vn-gap-3)` | tokenized |
+| `gap`     | `.gap-sm-4`  | `gap`    | `@media (width >= 576px)`  | `1.5rem`        | `var(--vn-gap-4)` | tokenized |
+| `gap`     | `.gap-sm-5`  | `gap`    | `@media (width >= 576px)`  | `3rem`          | `var(--vn-gap-5)` | tokenized |
+| `gap`     | `.gap-md-0`  | `gap`    | `@media (width >= 768px)`  | `0`             | `var(--vn-gap-0)` | tokenized |
+| `gap`     | `.gap-md-1`  | `gap`    | `@media (width >= 768px)`  | `0.25rem`       | `var(--vn-gap-1)` | tokenized |
+| `gap`     | `.gap-md-2`  | `gap`    | `@media (width >= 768px)`  | `0.5rem`        | `var(--vn-gap-2)` | tokenized |
+| `gap`     | `.gap-md-3`  | `gap`    | `@media (width >= 768px)`  | `1rem`          | `var(--vn-gap-3)` | tokenized |
+| `gap`     | `.gap-md-4`  | `gap`    | `@media (width >= 768px)`  | `1.5rem`        | `var(--vn-gap-4)` | tokenized |
+| `gap`     | `.gap-md-5`  | `gap`    | `@media (width >= 768px)`  | `3rem`          | `var(--vn-gap-5)` | tokenized |
+| `gap`     | `.gap-lg-0`  | `gap`    | `@media (width >= 992px)`  | `0`             | `var(--vn-gap-0)` | tokenized |
+| `gap`     | `.gap-lg-1`  | `gap`    | `@media (width >= 992px)`  | `0.25rem`       | `var(--vn-gap-1)` | tokenized |
+| `gap`     | `.gap-lg-2`  | `gap`    | `@media (width >= 992px)`  | `0.5rem`        | `var(--vn-gap-2)` | tokenized |
+| `gap`     | `.gap-lg-3`  | `gap`    | `@media (width >= 992px)`  | `1rem`          | `var(--vn-gap-3)` | tokenized |
+| `gap`     | `.gap-lg-4`  | `gap`    | `@media (width >= 992px)`  | `1.5rem`        | `var(--vn-gap-4)` | tokenized |
+| `gap`     | `.gap-lg-5`  | `gap`    | `@media (width >= 992px)`  | `3rem`          | `var(--vn-gap-5)` | tokenized |
+| `gap`     | `.gap-xl-0`  | `gap`    | `@media (width >= 1200px)` | `0`             | `var(--vn-gap-0)` | tokenized |
+| `gap`     | `.gap-xl-1`  | `gap`    | `@media (width >= 1200px)` | `0.25rem`       | `var(--vn-gap-1)` | tokenized |
+| `gap`     | `.gap-xl-2`  | `gap`    | `@media (width >= 1200px)` | `0.5rem`        | `var(--vn-gap-2)` | tokenized |
+| `gap`     | `.gap-xl-3`  | `gap`    | `@media (width >= 1200px)` | `1rem`          | `var(--vn-gap-3)` | tokenized |
+| `gap`     | `.gap-xl-4`  | `gap`    | `@media (width >= 1200px)` | `1.5rem`        | `var(--vn-gap-4)` | tokenized |
+| `gap`     | `.gap-xl-5`  | `gap`    | `@media (width >= 1200px)` | `3rem`          | `var(--vn-gap-5)` | tokenized |
+| `gap`     | `.gap-xxl-0` | `gap`    | `@media (width >= 1400px)` | `0`             | `var(--vn-gap-0)` | tokenized |
+| `gap`     | `.gap-xxl-1` | `gap`    | `@media (width >= 1400px)` | `0.25rem`       | `var(--vn-gap-1)` | tokenized |
+| `gap`     | `.gap-xxl-2` | `gap`    | `@media (width >= 1400px)` | `0.5rem`        | `var(--vn-gap-2)` | tokenized |
+| `gap`     | `.gap-xxl-3` | `gap`    | `@media (width >= 1400px)` | `1rem`          | `var(--vn-gap-3)` | tokenized |
+| `gap`     | `.gap-xxl-4` | `gap`    | `@media (width >= 1400px)` | `1.5rem`        | `var(--vn-gap-4)` | tokenized |
+| `gap`     | `.gap-xxl-5` | `gap`    | `@media (width >= 1400px)` | `3rem`          | `var(--vn-gap-5)` | tokenized |
+
 #### `gx`
 
 | Component | Selector    | Property        | Condition                  | Bootstrap 5.3.8 | Veneer            | Departure |
@@ -3807,6 +3967,8 @@
 | gy               | selector       | Every official .gy step and breakpoint selector ships; resolved margins, padding, and row gaps are proved in tests/src/styles/utilities/gap.test.ts.                                                                                                                                                                                                                                                                                                             | —                     | shipped  |
 | gy               | variable       | The `--bs-gutter-y` property reads the density-independent `--vn-gap-{n}` scale; resolved geometry is proved in tests/src/styles/utilities/gap.test.ts.                                                                                                                                                                                                                                                                                                          | —                     | shipped  |
 | row-gap          | selector       | Every official .row-gap step and breakpoint selector ships; resolved margins, padding, and row gaps are proved in tests/src/styles/utilities/gap.test.ts.                                                                                                                                                                                                                                                                                                        | —                     | shipped  |
+| gap              | selector       | Every official .gap step and breakpoint selector ships; resolved row and column gaps are proved in tests/src/styles/utilities/gap.test.ts.                                                                                                                                                                                                                                                                                                                       | —                     | shipped  |
+| column-gap       | selector       | Every official .column-gap step and breakpoint selector ships; resolved column gaps are proved in tests/src/styles/utilities/gap.test.ts.                                                                                                                                                                                                                                                                                                                        | —                     | shipped  |
 | row              | selector       | Every `.row-gap-*` selector ships; resolved row gaps are proved in `tests/src/styles/utilities/gap.test.ts`.                                                                                                                                                                                                                                                                                                                                                     | —                     | shipped  |
 | row              | selector       | The `.row` family ships with physical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                                                                                                                                                                                                                                                              | —                     | shipped  |
 | row              | selector       | The `.row > *` family ships with physical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                                                                                                                                                                                                                                                          | —                     | shipped  |
@@ -3981,7 +4143,7 @@
 text specimens, lists, quotations, code, media, tables, form controls, and interactive tags, a Type
 region carrying the typography, list, and quotation classes, and a Media region carrying the image
 and figure classes beside the aspect-ratio boxes, and a Links region carrying the link classes and
-the icon links, and a Layout region carrying the container, grid, and gutter specimens and the
+the icon links, and a Layout region carrying the container, grid, gutter, and gap specimens and the
 vertical rule, and a Table region carrying the table variant and responsive specimens. Each helper
 key sits in the region whose subject it belongs to rather than in a region of its own, which is how
 every other section is grouped: the image classes and the figure classes share Media, and the
@@ -4150,7 +4312,7 @@
 [the input group classes](../tests/src/styles/components/input-group.test.ts),
 [the floating label classes](../tests/src/styles/components/form-floating.test.ts),
 [the select classes](../tests/src/styles/components/form-select.test.ts),
-[the gutter utilities](../tests/src/styles/utilities/gap.test.ts), and
+[the gutter and gap utilities](../tests/src/styles/utilities/gap.test.ts), and
 [the customization recipe](../tests/src/styles/integration.test.ts).
 Those proofs resolve declarations against the cascade's layer order; § Styles states that order and
 names the partial that declares it.
--- a/ROADMAP.md
+++ b/ROADMAP.md
@@ -375,7 +375,7 @@
 | Chrome receipt                                                                                                                                                                                                                                                                                                                                                                                                   | E-RECEIPTS records the promised hosts (F4 HOST-OBSERVATIONS pinned them, `af673cb`); the install is the user's                                                                                                                                                                                                                                                            |
 | U1-del legacy tree in the working tree                                                                                                                                                                                                                                                                                                                                                                           | X-RETENTION carries the working-tree deletion (recorded drop: `fc36cec`)                                                                                                                                                                                                                                                                                                  |
 | Cross-cutting reconciliation                                                                                                                                                                                                                                                                                                                                                                                     | closed: the F5 ACCOUNTING units landed before the families opened (F5a `984d062` through F5e `67d12d7`)                                                                                                                                                                                                                                                                   |
-| CL8b gap keys `gap` and `column-gap`, with `row-gap`                                                                                                                                                                                                                                                                                                                                                             | B-UTILITIES                                                                                                                                                                                                                                                                                                                                                               |
+| CL8b gap keys `gap` and `column-gap`, with `row-gap`                                                                                                                                                                                                                                                                                                                                                             | B-UTILITIES UTIL-SPACER ships `gap` and `column-gap` beside `row-gap` in `src/styles/utilities/_gap.scss`, proved in `tests/src/styles/utilities/gap.test.ts` (closed)                                                                                                                                                                                                    |
 | U7c paint calibration readings                                                                                                                                                                                                                                                                                                                                                                                   | E-ELEMENTS takes the readings; E-IDENTITY lands the ruling (its own later row)                                                                                                                                                                                                                                                                                            |
 | Frame grammar; unaligned filename stems; one-sided palette gap; accessibility artifacts not comparable; the link key's single-anchor frame; the pixel guard running only under the capture flag; the sampler's origin pixel                                                                                                                                                                                      | F7 CAPTURE                                                                                                                                                                                                                                                                                                                                                                |
 | Portfolio finding 5 (differing context) and finding 7 (ineffective link crop)                                                                                                                                                                                                                                                                                                                                    | F7 CAPTURE proves comparable context and includes the link's actual background                                                                                                                                                                                                                                                                                            |
```

## Deviations

1. **`tests/service/tailwind/preflight.test.ts` was written.** The brief's Owned row names only the profiles and consumer proofs. Its "What asserts the state this change ends" row reads "the three service proofs (Owned)". The unit took the explicit "(Owned)" annotation as the grant.
   - Why the file had to change: shipping `gap-*` makes its "every non-custom declaration sits in `base`" assertion false. The preflight profile scans the same candidate list, so it generates the off-line names.
   - The edit is 21 lines. It leaves generated utility selectors out of the reset's property population and out of that assertion. The profiles proof holds those selectors equal to the off-line names.
   - To revert: take the hunk out of `us.diff` (launch path `tmp/units/us.diff`) and supply it as a patch. `test:service` then reports this case red.
2. **The off-limits `tests/setupServer.test.ts` file is made false by the guide patch.** Its `skips engine and CSS obligations whose Proof cell is a dash` case enumerates the compatibility components, and the new `gap` and `column-gap` rows are outside that enumeration. The file is not written. Its exact patch is in `us-shared.patch`: `'column-gap'` and `'gap'` are added. With the patch, `test:setup` passes 250; without it, 1 case fails.
   - The same file is owned by B-PASSIVE-PROSE. The brief omitted it from "What asserts the state this change ends."
   - Hypothesis: the brief was scoped from the terrain's § H list, which does not name this enumeration.

Ancillary choices this unit settled:
- **Specimen copy and markup.** Cards frame the items; `.row.row-cols-auto.g-0` is the flex host.
- **`Layout` paragraph.** It gains "and gap steps".
- **Scenario rows.** `gap-steps` reads `.gap-5` `column-gap`; `responsive-gap` reads `.gap-md-3` `column-gap`.
- **Guide placement.**
  - `### Gap utilities` is placed after `### Close classes`.
  - The ledger tables are sorted as `column-gap` after `col`, and `gap` after `g`.
  - The compatibility rows follow `row-gap`.
- **Utilities-order case form.** Two in-case records hold the release-name-to-path overrides, and each wave-2 unit extends `entryPaths`, or `helperPaths` for a relocated helper.
- **ROADMAP CL8b cell.** It is marked closed on landing; restate it if the Orchestrator records landings differently.
- **Probe copy location.** The probe copy sat under `tmp/probe/tree` with hard-linked `node_modules`, because a symlinked `node_modules` trips the environment-boundary plugin's "Resolved dependencies must remain inside their physical package root" check. It is deleted.

## What the unit could not close

- The LayoutSection proof stays red in the worktree until the `app/browser/constants.ts` patch integrates. That is criterion 6 at integration.
- The `test:setup` result depends on the off-limits `setupServer.test.ts` patch (Deviation 2).
- The journey, `CAPTURE=1`, the regenerated frames for `gap-steps` and `responsive-gap`, and the tree-wide `npm test` were not run. They are the Orchestrator's.
- The `utility` mixin, for an empty `$class` at a non-empty infix, emits `.-md-key`. The release strips the infix's hyphen there and emits `.md-key`. No release entry is both classless and responsive, so no recorded selector exercises the branch. It is recorded as an observation, not fixed: fixing it would add an unconsumed branch.
- The guide's § Styles important-utility paragraph is duplicated around the calendar-picker sentence. That defect predates this unit, belongs to CLOSE-GUIDE, and was left untouched.
