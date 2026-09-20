<!-- Retained from u7a-3-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7a-3.jsonl, thread 01a0c133-8cd8-7240-9305-42f99bdcae37, exit 0, 2026-09-20 20:00. A stop after the Elements partial: the build emits border:0 from the logical border declarations and the physical-axis guard refuses the expanded longhands; the tree carries the unit's partial work. -->

# U7a successor report 3

Stopped after the Elements partial's styles gate remained red following an owned-file fix. Button CSS has not shipped. The working tree contains incomplete implementation changes for review; nothing was committed.

The effective assignment is `u7a-brief-3.md`, carrying its predecessor briefs. HEAD remains `2bc922d`. The close-filter ruling is respected: `theme-tokens` and its `--bs-btn-close-filter` declaration are unchanged.

## Deviation

- **Expected:** Author logical properties and keep the built cascade's physical-axis guard green.
- **Found:** The styles build emits `border:0` from the Elements partial's `border-block: 0` and `border-inline: 0` declarations. Chromium exposes physical border longhands from that emitted shorthand, and the guard rejects them.
- **Exact evidence:** `tests/src/styles/index.test.ts:28` fails its `declares no physical inline-axis property anywhere in the shipped cascade` case. The received entries are `border-right-width: 0px`, `border-left-width: 0px`, `border-right-style: none`, `border-left-style: none`, `border-right-color: currentcolor`, and `border-left-color: currentcolor`. The built `button` rule contains `border:0`; its radius declarations remain logical.
- **Fix attempted:** Replaced the initial `border: 0` declaration with `border-block: 0` and `border-inline: 0`, and replaced `border-radius` with the logical corner declarations. The same command remained red after that edit.
- **Stop rule:** The inherited brief's deviation contract says to stop on “a gate red after your own fix inside owned files.” No further repair or build-configuration change was attempted.
- **Hypothesis:** The build's CSS optimization recombines the logical border declarations into the physical shorthand. This report records the source/output difference; it does not isolate the optimizer responsible.

## Completed and outstanding work

The registry carries the state mixer and percentages, Button presentation defaults, and system-color tokens. The root and explicit theme scopes declare the state values. The `focus-ring` mixin emits the shadow and suppresses the outline. The Elements partial declares the bare Button treatment and is loaded by the barrel.

The existing token parity and theme proofs passed after the token edit and after the mixin edit. The partial's final styles run retained the passing token proofs and tag-pair guard, but failed the physical-axis guard.

The component partial, Button browser proofs, mounted focus-ring proof, binding table, deferral table, shipped-row transition, explicit conformance-list change, controls, and guide updates were not completed. The mixin has only the Elements caller at this stop. The Button system-color tokens have no component consumer yet. No new test was written.

The installed `@orkestrel/test` browser declaration exposes `matchesColor` and `readStyle`. Its `MediaOptions` interface exposes `print` and `motion`, with no forced-colors option. No Button forced-colors reading was taken; the planned `stageMedia` helper cannot stage that feature through its declared options.

## Mixer decision and bindings

The provisional light mixer is `color(srgb 0.00742457 0.0232852 0.0925134)`, the near-black endpoint recorded by the bare hover reading. Dark uses `var(--vn-palette-white-base)`. Hover uses `12%`; active uses `22%`.

The calibration strings fixing that choice are `color(srgb 0.00742457 0.0232852 0.0925134 / 0.12)` for light bare hover and `color(srgb 1 1 1 / 0.12)` for dark bare hover, with the active readings at `/ 0.22`. This choice has not received the required Button color comparison on Chromium or Edge. It is not a completed calibration claim.

The provisional defaults are `--vn-button-opacity: 0.65`, `--vn-button-shadow: none`, `--vn-button-transparent: transparent`, `--vn-button-face: ButtonFace`, `--vn-button-text: ButtonText`, `--vn-button-highlight: Highlight`, and `--vn-button-disabled: GrayText`. The existing spacing, radius, typography, and focus tokens were reused.

No `--bs-btn-*` binding table landed. No deferral table landed. The selector and variable rows remain `accepted`, and the explicit conformance list remains empty. The retained U3 close-filter property appears in no deferral row. No departure was added to the guide.

## Executed gates

Every run here used `npm.cmd run test:src:styles`, which builds the cascade before running the browser project. These readings were taken on Windows on 2026-09-20 with the default managed Chromium channel.

After the token edit, the command exited 0; the log is `tmp/u7a/tokens.log`.

```text
Test Files  7 passed (7)
     Tests  40 passed (40)
  Start at  19:45:37
  Duration  4.81s (transform 0ms, setup 322ms, import 275ms, tests 187ms, environment 0ms)
```

After the mixin edit, the command exited 0; the log is `tmp/u7a/mixin.log`.

```text
Test Files  7 passed (7)
     Tests  40 passed (40)
  Start at  19:45:55
  Duration  2.14s (transform 0ms, setup 304ms, import 280ms, tests 194ms, environment 0ms)
```

After the initial Elements partial, the command exited 1; the log is `tmp/u7a/elements.log`.

```text
Test Files  1 failed | 6 passed (7)
     Tests  1 failed | 39 passed (40)
  Start at  19:46:26
  Duration  2.14s (transform 0ms, setup 292ms, import 293ms, tests 188ms, environment 0ms)
```

After the logical-border fix, the command exited 1; the log is `tmp/u7a/elements-fixed.log`.

```text
Test Files  1 failed | 6 passed (7)
     Tests  1 failed | 39 passed (40)
  Start at  19:46:44
  Duration  2.16s (transform 0ms, setup 326ms, import 278ms, tests 190ms, environment 0ms)
```

The final run completed the styles build before the assertion failed. Its artifact readings were:

```text
dist/src/styles/index.css      33.30 kB │ gzip: 4.44 kB
dist/src/styles/index.rtl.css  33.30 kB │ gzip: 4.44 kB
dist/src/styles/index.js        0.00 kB │ gzip: 0.02 kB
```

The SHA-256 of `dist/src/styles/index.css` after that build is:

```text
8d8cd14a026c36b5b622ace52f561b029d406bade9383fe3554a06fb9123950e
```

This digest identifies the incomplete cascade returned with the failed guard.

The acceptance runs of `format:check`, `lint:check`, `check`, `test:src:core`, `test:conformance`, and `test:guides` were not run. The Edge run with `PLAYWRIGHT_CHANNEL=msedge` was not run. The ordinary conformance red-on-flip measurement was not reached.

## Controls and provenance

`PLANT-SELECTOR`, `PLANT-PHYSICAL`, and `PLANT-TOKEN` were not run. No control mutation was planted, and no control restore comparison was performed. The physical-axis failure came from the implementation, not from an acceptance control.

The brief marks `prove` blocked. This report carries ordinary gate output and no `prove` receipt. The earlier deferral instruments remain unchanged under `tmp/u7a/`.

No agent was spawned. No dependency was installed. Nothing was staged or committed. No tree-wide formatter, lint fix, full build, scaffold repair, or prohibited Git recovery command ran. The launching CLI journal path and session identifier were not supplied to this executor; the launching Orchestrator owns that provenance.

## Diff and status

The changes remain limited to owned paths. The report and run logs are under ignored `tmp/`. Git exited 0 for the diff and status readings and warned that it could not access `C:\Users\mikes/.config/git/ignore`.

The actual tracked diff follows.

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
```

The untracked Elements partial has the following complete content.

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
		border-block: 0;
		border-inline: 0;
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

The actual status reading follows.

```text
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M src/styles/_theme.scss
 M src/styles/_tokens.scss
 M src/styles/index.scss
?? src/styles/elements/_button.scss
```