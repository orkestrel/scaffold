<!-- Retained from u7a-4-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7a-4.jsonl, thread 01a0c13c-794d-73e3-950e-0089eb3b523e, exit 0, 2026-09-20 20:12. A stop on the export-inventory case the new helper grows; the guard helper and its cases landed in the tree; superseded by units/u7a-brief-5.md with a standing clause on enumerating assertions. -->

# U7a successor report 4

Stopped on a scope conflict in the setup proof's export inventory. The physical-axis guard passes with the rule-local symmetry filter, but Button CSS has not shipped. The working tree remains incomplete and uncommitted. HEAD is `2bc922d`.

## Deviation

- **Expected:** Export `filterAsymmetricDeclarations`, add its cases, and leave the other setup cases unchanged under brief 4's grant: “`tests/setupStyles.test.ts` for that helper's cases alone” and “Everything else in those files … stands.”
- **Found:** The existing export-inventory case compares every export from `tests/setupStyles.ts` against an explicit list. Adding the required export makes that unrelated case fail unless its list changes.
- **Exact evidence:** `npm.cmd run test:setup -- tests/setupStyles.test.ts` exits 1 on `tests/setupStyles.test.ts:65`, in `exports the scanner, the predicates, the collectors, and the compatibility oracle, and nothing the document has to answer`. Its received list adds `filterAsymmetricDeclarations`; its expected list omits that name. The helper's behavioral cases pass. The log is `tmp/u7a/helper-scope-4.log`.
- **Attempt and restoration:** I initially added the helper's name to that export list, and the setup file passed. I then removed that addition because the grant leaves the existing case outside scope. The returned diff changes only the import and the helper's added cases in that file. The earlier green setup reading does not describe the returned tree.
- **Stop rule:** The inherited brief requires a stop on “a need to edit an off-limits file.” Here the needed edit is an off-limits case inside a partially granted file. The concrete missing grant is the `filterAsymmetricDeclarations` entry in the existing export-inventory assertion.

No further implementation or acceptance controls ran after that scope failure.

## Completed and outstanding work

The baseline styles run reproduced the reported failure on symmetric `border-left-*` and `border-right-*` declarations. The helper removes a physical declaration only when its opposite-side twin appears in the same input rule with a value equal through `normalizeValueToken`. It retains unmatched properties, unequal pairs, and `background-position-x`, whose name has no opposite-side twin. Other property families retain the existing predicate's decisions.

The helper cases cover the symmetric border expansion, empty input, a lone margin, unequal padding, a physical property without a twin, normalized function spacing, property-name casing, distinct custom-property names in values, and the shorthand and keyword families. The cascade guard invokes the helper separately for each `CSSStyleRule` before flattening its findings.

The Elements partial writes `border: 0` plainly. The inherited registry, state tokens, theme closure, focus-ring mixin, and barrel changes remain. The `theme-tokens` mixin and its retained `--bs-btn-close-filter` declaration are unchanged.

The component partial, mounted focus-ring proof, Button browser proofs, binding table, deferral table, shipped-row transition, explicit conformance-list entry, controls, and guide updates remain unfinished. The guide's Button CSS rows remain `accepted`; the conformance list remains empty. No departure was added to the guide.

## Bindings, deferrals, and mixer

No Button binding table or deferral table landed. The U3 close-filter property remains declared and is not deferred.

The inherited provisional mixer is `color(srgb 0.00742457 0.0232852 0.0925134)` in light mode and `var(--vn-palette-white-base)` in dark mode, with hover at `12%` and active at `22%`. The calibration strings fixing that choice are `color(srgb 0.00742457 0.0232852 0.0925134 / 0.12)` and `color(srgb 1 1 1 / 0.12)`, with the active readings at `/ 0.22`. This run took no Button color measurements on Chromium or Edge, so the choice remains unverified for Button.

The inherited defaults are `--vn-button-opacity: 0.65`, `--vn-button-shadow: none`, `--vn-button-transparent: transparent`, `--vn-button-face: ButtonFace`, `--vn-button-text: ButtonText`, `--vn-button-highlight: Highlight`, and `--vn-button-disabled: GrayText`.

The forced-colors reading remains open. The installed `MediaOptions` declaration at `node_modules/@orkestrel/test/dist/src/browser/index.d.ts:1621` exposes `print` and `motion`, without a forced-colors axis. The Button fallback and the guide's required Compatibility sentence were not reached. No Button forced-colors browser proof is claimed; the later Test unit owns the helper axis.

## Executed readings

The commands ran on Windows on 2026-09-20. Browser readings used managed Chromium. Each styles command built the cascade before running the suite.

The baseline `npm.cmd run test:src:styles` exited 1. Its guard reported `border-right-width: 0px`, `border-left-width: 0px`, `border-right-style: none`, `border-left-style: none`, `border-right-color: currentcolor`, and `border-left-color: currentcolor`. The final lines in `tmp/u7a/guard-red-4.log` are:

```text
Test Files  1 failed | 6 passed (7)
     Tests  1 failed | 39 passed (40)
  Start at  19:54:14
  Duration  2.11s (transform 0ms, setup 286ms, import 269ms, tests 191ms, environment 0ms)
```

After the helper and guard edit, the same `npm.cmd run test:src:styles` command exited 0. The final lines in `tmp/u7a/guard-green-4.log` are:

```text
Test Files  7 passed (7)
     Tests  40 passed (40)
  Start at  19:55:19
  Duration  2.14s (transform 0ms, setup 285ms, import 269ms, tests 197ms, environment 0ms)
```

With the temporary export-inventory addition, `npm.cmd run test:setup -- tests/setupStyles.test.ts` exited 0. This superseded reading in `tmp/u7a/helper-4.log` does not establish a green returned tree:

```text
Test Files  1 passed (1)
     Tests  71 passed (71)
  Start at  19:55:22
  Duration  1.12s (transform 109ms, setup 31ms, import 699ms, tests 236ms, environment 0ms)
```

After removing that inventory addition, the same setup command exited 1. The final lines in `tmp/u7a/helper-scope-4.log` are:

```text
Test Files  1 failed (1)
     Tests  1 failed | 70 passed (71)
  Start at  19:56:32
  Duration  1.15s (transform 107ms, setup 31ms, import 725ms, tests 247ms, environment 0ms)
```

The acceptance runs of `format:check`, `lint:check`, `check`, `test:src:core`, `test:conformance`, and `test:guides` were not run. The Edge styles run was not run. The conformance red-on-flip measurement was not reached. Formatting convergence was not completed before the stop.

The SHA-256 of `dist/src/styles/index.css` after the successful styles build is:

```text
8d8cd14a026c36b5b622ace52f561b029d406bade9383fe3554a06fb9123950e
```

The digest matches the inherited incomplete cascade. Changing the authored border spelling did not change that artifact.

## Controls and provenance

`PLANT-ASYMMETRIC`, `PLANT-SELECTOR`, `PLANT-PHYSICAL`, and `PLANT-TOKEN` were not run. No control mutation remains, and no control restore comparison is claimed. The guard's baseline failure and its green run establish the symmetric-border correction only; the requested planted controls remain outstanding.

The brief marks `prove` blocked. This report carries ordinary command output and no receipt. No agent was spawned, dependency installed, commit made, or prohibited Git recovery command run. No tree-wide formatter, lint fix, full build, or scaffold repair ran. The launching CLI journal path and session identifier were not supplied to this executor; the launching Orchestrator owns that provenance.

## Diff and status

`git diff --check` exited 0. The tracked diff and the untracked partial follow. Git warned that it could not access `C:\Users\mikes/.config/git/ignore`; the status command succeeded. The report and logs are under ignored `tmp/`.

The actual tracked diff is:

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index 1bb5d37..3ca7e6c 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -223,6 +223,20 @@ export const TOKEN_NAMES = Object.freeze({
 		opacity: '--vn-focus-opacity',
 		color: '--vn-focus-color',
 	} as const),
+	state: Object.freeze({
+		mixer: '--vn-state-mixer',
+		hover: '--vn-state-hover',
+		active: '--vn-state-active',
+	} as const),
+	button: Object.freeze({
+		opacity: '--vn-button-opacity',
+		shadow: '--vn-button-shadow',
+		transparent: '--vn-button-transparent',
+		face: '--vn-button-face',
+		text: '--vn-button-text',
+		highlight: '--vn-button-highlight',
+		disabled: '--vn-button-disabled',
+	} as const),
 	form: Object.freeze({
 		valid: '--vn-form-valid',
 		invalid: '--vn-form-invalid',
diff --git a/src/styles/_mixins.scss b/src/styles/_mixins.scss
index 26c396c..6429938 100644
--- a/src/styles/_mixins.scss
+++ b/src/styles/_mixins.scss
@@ -19,6 +19,11 @@
 	}
 }
 
+@mixin focus-ring($color: var(--vn-focus-color), $width: var(--vn-focus-width), $shadow: 0 0 0 $width $color) {
+	outline: none;
+	box-shadow: $shadow;
+}
+
 // Emits the subtle, emphasis, and border tiers of every role in `$roles`.
 //
 // Each tier is an oklab mix over the role's own fill, so a retuned fill carries its own tiers.
diff --git a/src/styles/_theme.scss b/src/styles/_theme.scss
index 5f1d1ce..21564e0 100644
--- a/src/styles/_theme.scss
+++ b/src/styles/_theme.scss
@@ -9,11 +9,17 @@
 	// leaves behind when it removes the attribute.
 	[data-bs-theme='light'] {
 		color-scheme: light;
+		--vn-state-mixer: #{map.get(tokens.$light, 'state-mixer')};
+		--vn-state-hover: #{map.get(tokens.$light, 'state-hover')};
+		--vn-state-active: #{map.get(tokens.$light, 'state-active')};
 		@include theme-tokens(tokens.$roles, tokens.$aliased, tokens.$light);
 	}
 
 	[data-bs-theme='dark'] {
 		color-scheme: dark;
+		--vn-state-mixer: #{map.get(tokens.$dark, 'state-mixer')};
+		--vn-state-hover: #{map.get(tokens.$dark, 'state-hover')};
+		--vn-state-active: #{map.get(tokens.$dark, 'state-active')};
 		@include theme-tokens(tokens.$roles, tokens.$aliased, tokens.$dark);
 		// Bootstrap declares each of these image-valued variables on its own component rules in dark
 		// alone, so the light scope declares none of them and `tokens.$assets` names where each dark
diff --git a/src/styles/_tokens.scss b/src/styles/_tokens.scss
index 6c24931..00ded8f 100644
--- a/src/styles/_tokens.scss
+++ b/src/styles/_tokens.scss
@@ -1,3 +1,4 @@
+@use 'sass:map';
 @use 'mixins' as *;
 
 @layer theme, reset, base, elements, components, utilities;
@@ -14,6 +15,9 @@ $aliased: primary, secondary, success, info, warning, danger, light, dark;
 // rendering, clamped to the representable range; anything else is Bootstrap 5.3.8's own value,
 // retained with its reason in `guides/veneer.md` under Tokens.
 $light: (
+	'state-mixer': 'color(srgb 0.00742457 0.0232852 0.0925134)',
+	'state-hover': 12%,
+	'state-active': 22%,
 	'primary': 'oklch(0.48 0.255 264)',
 	'primary-rgb': '8, 65, 234',
 	'tint': 12%,
@@ -50,6 +54,9 @@ $light: (
 // dark value alone. Only the primary fill retunes; every other role keeps one fill in light and in
 // dark, and reaches its dark tiers through the mix percentages and the border anchor.
 $dark: (
+	'state-mixer': 'var(--vn-palette-white-base)',
+	'state-hover': 12%,
+	'state-active': 22%,
 	'primary': 'oklch(0.7 0.15 233)',
 	'primary-rgb': '0, 172, 236',
 	'tint': 15%,
@@ -254,6 +261,16 @@ $assets: (
 
 		--vn-focus-width: 0.1875rem;
 		--vn-focus-opacity: 0.45;
+		--vn-state-mixer: #{map.get($light, 'state-mixer')};
+		--vn-state-hover: #{map.get($light, 'state-hover')};
+		--vn-state-active: #{map.get($light, 'state-active')};
+		--vn-button-opacity: 0.65;
+		--vn-button-shadow: none;
+		--vn-button-transparent: transparent;
+		--vn-button-face: ButtonFace;
+		--vn-button-text: ButtonText;
+		--vn-button-highlight: Highlight;
+		--vn-button-disabled: GrayText;
 
 		--vn-breakpoint-xs: 0;
 		--vn-breakpoint-sm: 576px;
diff --git a/src/styles/index.scss b/src/styles/index.scss
index d45457f..9465bac 100644
--- a/src/styles/index.scss
+++ b/src/styles/index.scss
@@ -2,3 +2,4 @@
 @use 'theme';
 @use 'elements/html';
 @use 'elements/body';
+@use 'elements/button';
diff --git a/tests/setupStyles.test.ts b/tests/setupStyles.test.ts
index a0f0bc7..3efd133 100644
--- a/tests/setupStyles.test.ts
+++ b/tests/setupStyles.test.ts
@@ -31,6 +31,7 @@ import {
 	extractSelectorCompounds,
 	extractSelectorIdentifiers,
 	extractShadowLayers,
+	filterAsymmetricDeclarations,
 	findGroupEnd,
 	MANDATED_TAG_PAIRS,
 	matchesCSSWhitespace,
@@ -170,6 +171,38 @@ describe('styles setup', () => {
 		expect(matchesDirectionSensitive('margin-left', '1px')).toBe(true)
 		expect(matchesDirectionSensitive('margin-block-start', '1px')).toBe(false)
 	})
+	it('admits symmetric border expansions within one rule', () => {
+		expect(filterAsymmetricDeclarations([
+			['border-left-width', '0px'], ['border-right-width', '0px'],
+			['border-left-style', 'none'], ['border-right-style', 'none'],
+			['border-left-color', 'currentcolor'], ['border-right-color', 'currentcolor'],
+		])).toEqual([])
+		expect(filterAsymmetricDeclarations([])).toEqual([])
+	})
+	it('retains lone longhands and unequal opposite-side values', () => {
+		expect(filterAsymmetricDeclarations([['margin-left', '1px']])).toEqual([['margin-left', '1px']])
+		expect(filterAsymmetricDeclarations([
+			['padding-left', '1px'], ['padding-right', '2px'],
+		])).toEqual([['padding-left', '1px'], ['padding-right', '2px']])
+		expect(filterAsymmetricDeclarations([['background-position-x', '0%']])).toEqual([['background-position-x', '0%']])
+	})
+	it('normalizes paired values without folding custom-property names', () => {
+		expect(filterAsymmetricDeclarations([
+			['MARGIN-LEFT', 'calc( 1px )'], ['margin-right', 'calc(1px)'],
+		])).toEqual([])
+		expect(filterAsymmetricDeclarations([
+			['margin-left', 'var(--Start)'], ['margin-right', 'var(--start)'],
+		])).toEqual([['margin-left', 'var(--Start)'], ['margin-right', 'var(--start)']])
+	})
+	it('keeps shorthand and keyword decisions with the direction predicate', () => {
+		expect(filterAsymmetricDeclarations([
+			['margin', '0 1px 0 2px'], ['border-radius', '1px 2px'], ['text-align', 'left'],
+			['padding', '0 1px'], ['border-radius', '1px'], ['float', 'inline-start'],
+			['margin-inline-start', '1px'],
+		])).toEqual([
+			['margin', '0 1px 0 2px'], ['border-radius', '1px 2px'], ['text-align', 'left'],
+		])
+	})
 	it('requires the directional outputs from npm run build:src:styles', () => {
 		expect(existsSync('dist/src/styles/index.css')).toBe(true)
 		expect(existsSync('dist/src/styles/index.rtl.css')).toBe(true)
diff --git a/tests/setupStyles.ts b/tests/setupStyles.ts
index 0bf8320..7b83bff 100644
--- a/tests/setupStyles.ts
+++ b/tests/setupStyles.ts
@@ -227,6 +227,35 @@ export function matchesDirectionSensitive(prop: string, value: string): boolean
 	return false
 }
 
+/**
+ * Filters a rule's declarations to the members that carry an inline direction.
+ *
+ * @param declarations - The property and value pairs from one rule.
+ * @returns The direction-sensitive declarations in input order, excluding physical longhands
+ *   whose opposite-side twin has the same value through {@link normalizeValueToken}.
+ *
+ * @example
+ * filterAsymmetricDeclarations([['margin-left', '1px'], ['margin-right', '1px']]) // []
+ */
+export function filterAsymmetricDeclarations(
+	declarations: readonly (readonly [string, string])[],
+): readonly (readonly [string, string])[] {
+	return declarations.filter(([name, value]) => {
+		if (!matchesDirectionSensitive(name, value)) return false
+		const property = name.toLowerCase()
+		if (!PHYSICAL_LONGHANDS.includes(property)) return true
+		const opposite = property.replace(/left|right/u, (side) =>
+			side === 'left' ? 'right' : 'left',
+		)
+		if (opposite === property) return true
+		return !declarations.some(
+			([twin, token]) =>
+				twin.toLowerCase() === opposite &&
+				normalizeValueToken(token) === normalizeValueToken(value),
+		)
+	})
+}
+
 /**
  * Scans a stylesheet for its first direction-sensitive declaration.
  *
diff --git a/tests/src/styles/index.test.ts b/tests/src/styles/index.test.ts
index f5be7b6..f4f73bf 100644
--- a/tests/src/styles/index.test.ts
+++ b/tests/src/styles/index.test.ts
@@ -1,7 +1,7 @@
 import { requireValue } from '@orkestrel/test'
 import { describe, expect, it } from 'vitest'
 import { collectLayer, collectNestedRules, readCascadeSheet } from '../../setupBrowser.js'
-import { matchesDirectionSensitive, matchesLooseTagPair } from '../../setupStyles.js'
+import { filterAsymmetricDeclarations, matchesLooseTagPair } from '../../setupStyles.js'
 
 describe('shipped cascade', () => {
 	it('orders every layer before the rules that fill them', () => {
@@ -27,14 +27,13 @@ describe('shipped cascade', () => {
 	})
 	it('declares no physical inline-axis property anywhere in the shipped cascade', () => {
 		const sheet = requireValue(readCascadeSheet(), 'The document loaded no Veneer cascade')
-		const declarations = collectNestedRules(sheet.cssRules).flatMap((rule) =>
-			rule instanceof CSSStyleRule
-				? Array.from(rule.style).map((name) => [name, rule.style.getPropertyValue(name)] as const)
-				: [],
-		)
-		expect(declarations.length).toBeGreaterThan(0)
-		expect(declarations.filter(([name, value]) => matchesDirectionSensitive(name, value))).toEqual(
-			[],
+		const rules = collectNestedRules(sheet.cssRules).filter((rule) => rule instanceof CSSStyleRule)
+		expect(rules.length).toBeGreaterThan(0)
+		const declarations = rules.flatMap((rule) =>
+			filterAsymmetricDeclarations(
+				Array.from(rule.style).map((name) => [name, rule.style.getPropertyValue(name)] as const),
+			),
 		)
+		expect(declarations).toEqual([])
 	})
 })
```

The untracked Elements partial has this complete content:

```scss
@use '../mixins' as *;

@layer elements {
	button {
		padding-block: var(--vn-space-3);
		padding-inline: var(--vn-space-6);
		font-family: var(--vn-font-sans);
		font-size: var(--vn-size-2);
		font-weight: var(--vn-weight-body);
		line-height: var(--vn-line-body);
		color: var(--vn-text-body-base);
		background-color: var(--vn-button-transparent);
		border: 0;
		border-start-start-radius: var(--vn-radius-base);
		border-start-end-radius: var(--vn-radius-base);
		border-end-start-radius: var(--vn-radius-base);
		border-end-end-radius: var(--vn-radius-base);
		box-shadow: var(--vn-button-shadow);
		cursor: pointer;
		@include transition((color var(--vn-motion-feedback) var(--vn-ease-standard), background-color var(--vn-motion-feedback) var(--vn-ease-standard), border-color var(--vn-motion-feedback) var(--vn-ease-standard), box-shadow var(--vn-motion-feedback) var(--vn-ease-standard), opacity var(--vn-motion-feedback) var(--vn-ease-standard)));
	}

	button:hover {
		background-color: color-mix(in srgb, var(--vn-state-mixer) var(--vn-state-hover), var(--vn-button-transparent));
	}

	button:active {
		background-color: color-mix(in srgb, var(--vn-state-mixer) var(--vn-state-active), var(--vn-button-transparent));
	}

	button:focus-visible {
		@include focus-ring;
	}

	button:disabled {
		color: var(--vn-text-body-base);
		background-color: var(--vn-button-transparent);
		opacity: var(--vn-button-opacity);
		pointer-events: none;
	}
}

```

The actual status reading is:

```text
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M src/styles/_theme.scss
 M src/styles/_tokens.scss
 M src/styles/index.scss
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/index.test.ts
?? src/styles/elements/_button.scss
```