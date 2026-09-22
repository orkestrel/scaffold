# B-FORMS-RANGE-5 — report

`opus` on Opus 5, sole writer in `/home/user/veneer-bfr` (worktree detached at `3a9202a`).
Brief: `tmp/units/b-forms-range-brief-5.md`.

**Headline.** Finding 1 is closed. The resting thumb and the held tint read `--vn-palette-blue` in
the partial, the case table, the ledger, the guide, and the proof; the proof ran red under the role
token restored and green after the exact reverse edit, with the partial byte-identical. The remaining
`unavailable` site in `FORM_RANGE_MARKUP` reads `Disabled range value`. `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run build:src`, `npm run test:src:styles`, and
`npm run test:conformance` exit 0; `npm run test:setup` carries the sweep case as its only red. No
deviation.

## Diffs

Each diff is this round's change alone, taken against a copy of the file made before the round
started. `git diff` shows the whole RANGE unit instead, because the unit's earlier rounds are
uncommitted.

### Patch A — `src/styles/components/_form-range.scss`

```diff
--- a/src/styles/components/_form-range.scss
+++ b/src/styles/components/_form-range.scss
@@ -51,7 +51,7 @@
 				margin-top: calc(var(--vn-space-2) * -1);
 			}
 			appearance: none;
-			background-color: var(--vn-color-primary-base);
+			background-color: var(--vn-palette-blue);
 			border: 0;
 			border-radius: var(--vn-radius-xlarge);
 			@include transition(
@@ -63,12 +63,13 @@
 			);
 		}
 
-		// The held thumb lightens to three tenths of the role fill over the white palette entry,
-		// which is the tint the release bakes into its own literal.
+		// The held thumb lightens to three tenths of the blue palette entry over the white one,
+		// which is the tint the release bakes into its own literal. The fill is the palette entry
+		// rather than the role token, because the release's own value is that blue.
 		.form-range#{$thumb}:active {
 			background-color: color-mix(
 				in srgb,
-				var(--vn-color-primary-base) 30%,
+				var(--vn-palette-blue) 30%,
 				var(--vn-palette-white-base)
 			);
 		}
```

Both engines take the rewrite from the one `@each` declaration, so the WebKit and Gecko halves move
together. `--vn-color-primary-base` no longer appears in the partial.

### Patch B — `tests/setupStyles.ts`

```diff
--- a/tests/setupStyles.ts
+++ b/tests/setupStyles.ts
@@ -2789,7 +2789,7 @@
 		reads: Object.freeze([
 			'--vn-space-8',
 			'--vn-space-2',
-			'--vn-color-primary-base',
+			'--vn-palette-blue',
 			'--vn-radius-xlarge',
 			'--vn-motion-feedback',
 			'--vn-ease-standard',
@@ -2800,7 +2800,7 @@
 		engine: 'gecko',
 		reads: Object.freeze([
 			'--vn-space-8',
-			'--vn-color-primary-base',
+			'--vn-palette-blue',
 			'--vn-radius-xlarge',
 			'--vn-motion-feedback',
 			'--vn-ease-standard',
@@ -2809,12 +2809,12 @@
 	Object.freeze({
 		selector: '.form-range::-webkit-slider-thumb:active',
 		engine: 'webkit',
-		reads: Object.freeze(['--vn-color-primary-base', '--vn-palette-white-base']),
+		reads: Object.freeze(['--vn-palette-blue', '--vn-palette-white-base']),
 	}),
 	Object.freeze({
 		selector: '.form-range::-moz-range-thumb:active',
 		engine: 'gecko',
-		reads: Object.freeze(['--vn-color-primary-base', '--vn-palette-white-base']),
+		reads: Object.freeze(['--vn-palette-blue', '--vn-palette-white-base']),
 	}),
 	Object.freeze({
 		selector: '.form-range::-webkit-slider-runnable-track',
@@ -2841,5 +2841,5 @@
 /** Holds the range markup the proofs mount: the class under test beside the bare control. */
 export const FORM_RANGE_MARKUP =
 	'<input class="form-range" type="range" aria-label="Range value" min="0" max="100" value="50">' +
-	'<input class="form-range" type="range" aria-label="Unavailable range value" min="0" max="100" value="50" disabled>' +
+	'<input class="form-range" type="range" aria-label="Disabled range value" min="0" max="100" value="50" disabled>' +
 	'<input type="range" aria-label="Bare range value" min="0" max="100" value="50">'
```

The `reads` entries of `.form-range::-webkit-slider-thumb`, `.form-range::-moz-range-thumb`,
`.form-range::-webkit-slider-thumb:active`, and `.form-range::-moz-range-thumb:active` are the only
entries touched. No other line of the file changed, and the accessible names in the markup stay
distinct: `Range value`, `Disabled range value`, `Bare range value`.

### Patch C — `guides/ledger/departures.md`

The `background-color` row of each thumb selector takes the rewritten Veneer cell. Each row's
departure member stays `tokenized`, and each rewritten cell is repadded to the table's own
194-character Veneer column, so every row in the `form-range` table keeps the cell widths
`[14, 46, 22, 43, 100, 196, 11]` it had before the round.

```text
| `form-range` | `.form-range::-webkit-slider-thumb`        | `background-color` | — | `#0d6efd` | `var(--vn-palette-blue)`
| `form-range` | `.form-range::-moz-range-thumb`            | `background-color` | — | `#0d6efd` | `var(--vn-palette-blue)`
| `form-range` | `.form-range::-webkit-slider-thumb:active` | `background-color` | — | `#b6d4fe` | `color-mix(in srgb, var(--vn-palette-blue) 30%, var(--vn-palette-white-base))`
| `form-range` | `.form-range::-moz-range-thumb:active`     | `background-color` | — | `#b6d4fe` | `color-mix(in srgb, var(--vn-palette-blue) 30%, var(--vn-palette-white-base))`
```

### Patch D — `guides/veneer.md` § Form range classes

```diff
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -393,9 +393,11 @@
   read `--vn-space-12`, `--vn-space-8`, `--vn-space-2`, `--vn-space-4`, and `--vn-radius-xlarge`, so
   the whole control rescales with `--vn-factor-density` and `--vn-factor-radius` as the shipped
   partials do.
-- **The thumb paints the role fill.** The resting thumb reads `--vn-color-primary-base`, and the
-  held thumb lightens it to three tenths of that fill over `--vn-palette-white-base`, which is the
-  tint the official cascade bakes into its own literal.
+- **The thumb paints the blue palette entry.** The resting thumb reads `--vn-palette-blue`, the
+  entry that resolves to the official cascade's own `#0d6efd`, and the held thumb lightens it to
+  three tenths of that entry over `--vn-palette-white-base`, which is the tint the official cascade
+  bakes into its own literal. A `--vn-color-primary-base` retune therefore leaves the thumb on the
+  official blue, because the rule reads the palette entry rather than the role fill.
 - **The focus ring binds the focus tokens.** The official shadow is a hairline over a quarter-rem
   ring in the official brand color; Veneer keeps the hairline and reads `--vn-focus-width` and
   `--vn-focus-color` for the ring, which resolves to a `0.1875rem` ring and is the binding `.btn`
```

### Patch E — `tests/src/styles/components/form-range.test.ts`

```diff
--- a/tests/src/styles/components/form-range.test.ts
+++ b/tests/src/styles/components/form-range.test.ts
@@ -4,6 +4,7 @@
 	findRule,
 	readPixels,
 	readRing,
+	readRules,
 	readStyle,
 	readToken,
 	releaseMedia,
@@ -178,14 +179,27 @@
 		const controls = [...host.querySelectorAll('.form-range')]
 		const light = requireValue(controls[0], 'No light range control')
 		const dark = requireValue(controls[2], 'No dark range control')
-		// Each value the part rules name is read where the part reads it, on the control itself:
-		// the rules paint a part whose computed style this engine withholds, and the custom
+		// The thumb's fill is the release's own blue, so the rule reads the palette entry rather than
+		// the role token: a `--vn-color-primary-base` retune leaves the thumb where the release paints
+		// it. The declaration is read out of the cascade because Chromium withholds the part's
+		// computed style, and the entry it names is mode-independent, so the resting thumb paints the
+		// same blue in either mode.
+		const resting = requireValue(
+			readRules()
+				.filter((rule) => rule instanceof CSSStyleRule)
+				.find((rule) => rule.selectorText === '.form-range::-webkit-slider-thumb'),
+			'The cascade carries no resting thumb rule',
+		)
+		expect(resting.style.getPropertyValue('background-color')).toBe(
+			`var(${TOKEN_NAMES.palette.blue})`,
+		)
+		expect(readToken(dark, TOKEN_NAMES.palette.blue)).toBe(
+			readToken(light, TOKEN_NAMES.palette.blue),
+		)
+		// Each value the remaining part rules name is read where the part reads it, on the control
+		// itself: the rules paint a part whose computed style this engine withholds, and the custom
 		// property behind each declaration resolves on the host by inheritance.
-		for (const name of [
-			TOKEN_NAMES.color.primary.base,
-			'--bs-secondary-bg',
-			'--bs-secondary-color',
-		]) {
+		for (const name of ['--bs-secondary-bg', '--bs-secondary-color']) {
 			expect(readToken(light, name)).not.toBe('')
 			expect(readToken(dark, name)).not.toBe(readToken(light, name))
 		}
```

The exact `selectorText` comparison is what separates the resting rule from `:active` and from the
reduced-motion twin, which a substring `findRule` reading would fold together. The case title stays
as it was: the disabled thumb's `--bs-secondary-color` and the track's `--bs-secondary-bg` still
retune with the color mode, and the track still takes the direct override.

## Mutation

The mutation is the role token restored in the resting thumb rule of the partial, by the reverse of
Patch A's first hunk. The build precedes the run because the styles project reads the built cascade.

```text
npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-range.test.ts
```

- **Red** (exit 1): `Tests  2 failed | 4 passed (6)`.
  - `keeps the WebKit part rules in the cascade and reports the host style for a part pseudo` —
    `AssertionError: expected [ '--vn-palette-blue' ] to deeply equal []`, which is the
    `FORM_RANGE_CASES` record of Patch B meeting the planted declaration.
  - `retunes the thumb fill and the track fill with the color mode and with a direct override` —
    `AssertionError: expected 'var(--vn-color-primary-base)' to be 'var(--vn-palette-blue)'`, which
    is Patch E's own reading.
- Reverted by the exact reverse edit, **green** (exit 0): `Tests  6 passed (6)`.

What the reading distinguishes: the planted value is the role token the partial carried before this
round, and each assertion names `var(--vn-palette-blue)` as an exact string, so a rule that keeps
the role token, drops the declaration, or writes a literal fails all the same. A rule renamed to a
different palette entry fails too. The pair therefore separates the mutation from the passing case
rather than reading the rule's existence.

SHA-256 of `src/styles/components/_form-range.scss`:

```text
79066b6977ce53bfdc48d12edaecdf4c982b72d051dd23dc46cdee42fe1635a8  before the plant
5604674e9b344df9db30e700217a431edfa10a11c9af2024684097184496da36  planted
79066b6977ce53bfdc48d12edaecdf4c982b72d051dd23dc46cdee42fe1635a8  after the revert
```

## Gates

Scoped `npx oxfmt --config .oxfmtrc.json --write` ran over `tests/setupStyles.ts` and
`tests/src/styles/components/form-range.test.ts` first, and rewrote neither file's edit. Every
command ran from `/home/user/veneer-bfr`, and every reading in this table is the final state, after
the mutation's revert.

| Command                    | Exit | Reading                                                      |
| -------------------------- | ---- | ------------------------------------------------------------ |
| `npm run format:check`     | 0    | 215 files, correct format                                    |
| `npm run lint:check`       | 0    | no diagnostic                                                |
| `npm run check`            | 0    | root, `src:core`, `src:browser`, `src:styles`, `app:browser` |
| `npm run build:src`        | 0    | `dist/src/styles/index.css` 91.41 kB                         |
| `npm run test:src:styles`  | 0    | `Test Files  59 passed (59)`, `Tests  422 passed (422)`      |
| `npm run test:conformance` | 0    | `Test Files  1 passed (1)`, `Tests  17 passed (17)`          |
| `npm run test:guides`      | 0    | `Test Files  1 passed (1)`, `Tests  18 passed (18)`          |
| `npm run test:setup`       | 1    | `Tests  1 failed \| 161 passed (162)`                        |

`npm run test:setup`'s single red is
`styles setup > carries no shared written declaration block across style partials`, the sweep case
the brief records as the baseline red until B-SWEEP-2 lands. The range binding case
`binds every range selector to the inventory, to its engine, and to the tokens it reads` is green
inside that run, which is the Gecko half of Patch B read out of the compiled cascade.

The compiled cascade carries the rewrite:

```text
.form-range::-webkit-slider-thumb{…;background-color:var(--vn-palette-blue);…}
.form-range::-moz-range-thumb:active{background-color:color-mix(in srgb, var(--vn-palette-blue) 30%, var(--vn-palette-white-base))}
```

## Touched files

| File                                             | Change                                                                         |
| ------------------------------------------------ | ------------------------------------------------------------------------------ |
| `src/styles/components/_form-range.scss`         | Patch A: the resting fill, the held tint, and the comment on the held rule      |
| `tests/setupStyles.ts`                           | Patch B: the thumb `reads` entries, and `Disabled range value` in the markup    |
| `guides/ledger/departures.md`                    | Patch C: the thumb `background-color` rows' Veneer cell, repadded               |
| `guides/veneer.md`                               | Patch D: the fill bullet in § Form range classes                                |
| `tests/src/styles/components/form-range.test.ts` | Patch E: the resting-fill reading and the narrowed mode loop in the fill case   |

This round's diffstat, against the pre-round copies:

```text
 src/styles/components/_form-range.scss         |  5 +++--
 tests/setupStyles.ts                           |  5 ++---
 guides/ledger/departures.md                    |  4 ++--
 guides/veneer.md                               |  5 +++--
 tests/src/styles/components/form-range.test.ts | 21 ++++++++++++++------
 5 files changed, 40 insertions(+), 22 deletions(-)
```

`unavailable` survives in the package only at `form-range.test.ts:128`, where it names a reading
that cannot be obtained. The other hits in the tree sit in `tests/config.test.ts` and
`guides/scaffold.md`, neither of which names a class state.

## `git status --porcelain`

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/ledger/departures.md
 M guides/veneer.md
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/conformance.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupServer.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/FormRangeSection.ts
?? src/styles/components/_form-range.scss
?? tests/app/browser/sections/FormRangeSection.test.ts
?? tests/src/styles/components/form-range.test.ts
```

The list is the RANGE unit's paths and nothing else, unchanged from the round-4 report. `tmp/` is
ignored, so the capture frames do not appear.

## Deviations

None. No gate named a file outside § Scope, and no obligation needed one.

## Choices settled inside the deviation contract

- Each rewritten ledger cell is repadded to the table's existing 194-character Veneer column, so no
  other row of the `form-range` table moved.
- Patch D's bullet keeps the section's own voice and its `--vn-palette-white-base` clause, and adds
  the retune sentence the patch names; the pagination model the round-3 finding cited has no
  referent in `guides/veneer.md`, as the round-4 report recorded.
- Patch E's reading sits directly after the light and dark control handles and before the mode loop,
  because the resting fill is the subject of the change and the loop's comment then reads as the
  remainder. The comment wording carries the mode-independence claim the assertion makes.
- The fill case keeps its title: the disabled thumb fill and the track fill still retune with the
  color mode, and the track still takes the direct override.

**Observations, not criteria.** `npm run test:guides` ran beyond the brief's list because this round
edits `guides/veneer.md` and `guides/ledger/departures.md`, and it exits 0. `npm run test:app`,
`npm run test:policy`, and the capture journeys were not re-run: the files this round touched feed
no accessible name, section, or frame those suites read, apart from `FORM_RANGE_MARKUP`, which
`tests/setupStyles.test.ts` and the styles proofs alone mount, and each of those ran green. The
deciding whole-suite and timing readings are the Orchestrator's.
