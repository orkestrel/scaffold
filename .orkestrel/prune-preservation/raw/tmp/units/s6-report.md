# Unit S6 report — the emitted journey factory is formatter-clean, and the corpus proves it

## S6-C1: corpus red then green

**Red.** `npm run test:src:core -- --testNamePattern "oxfmt fixed point"`, before the wrap, with
the `journeyed` and `journeyedbare` blueprints added to the corpus:

```
Test Files  1 failed | 8 skipped (9)
      Tests  1 failed | 424 skipped (425)
```

The failure named the emitted `appJourney` signature line as the moved byte:

```
- export function appJourney(variant: JourneyVariant, variants: readonly JourneyVariant[]): UserConfig {
+ export function appJourney(
+ 	variant: JourneyVariant,
+ 	variants: readonly JourneyVariant[],
+ ): UserConfig {
```

**Green.** Same command, after wrapping the template's `appJourney` signature into the formatter's
four-line form:

```
Test Files  1 passed | 8 skipped (9)
      Tests  1 passed | 424 skipped (425)
```

## S6-C2: suite totals and gates

- `npm run test:src:core`: `Test Files  9 passed (9)` / `Tests  425 passed (425)` — matches the
  baseline count; no snapshot or text pin carried the one-line signature.
- `npm run test:src:bin`: `Test Files  3 passed (3)` / `Tests  267 passed (267)`.
- `npm run test:config`: `Test Files  1 passed (1)` / `Tests  173 passed | 1 skipped (174)`.
- Scoped format: `./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --write src/core/templates.ts tests/src/core/templates.test.ts` → `Finished in 5ms on 2 files using 16 threads.` (no bytes moved; the file diff below is unchanged after this run).
- Scoped lint: `npx oxlint src/core/templates.ts tests/src/core/templates.test.ts` → clean, no
  diagnostics.
- `npm run check`: exits 0 (`tsc --noEmit` over the root, `src:core`, `src:server`, `src:bin`
  projects, no diagnostics printed).

## Diff

```diff
diff --git a/src/core/templates.ts b/src/core/templates.ts
index 152fa968..e5b6d46b 100644
--- a/src/core/templates.ts
+++ b/src/core/templates.ts
@@ -349,7 +349,10 @@ function isNamedPlugin(plugin: PluginOption): plugin is { name: string } {
 			journey: `
 // Replace the journey fields directly: merging would concatenate the ordinary include
 // and retain the exclusion of the journey suite.
-export function appJourney(variant: JourneyVariant, variants: readonly JourneyVariant[]): UserConfig {
+export function appJourney(
+	variant: JourneyVariant,
+	variants: readonly JourneyVariant[],
+): UserConfig {
 	const browser = appBrowser()
 	return {
 		...browser,
diff --git a/tests/src/core/templates.test.ts b/tests/src/core/templates.test.ts
index 08616ca6..012ab5cd 100644
--- a/tests/src/core/templates.test.ts
+++ b/tests/src/core/templates.test.ts
@@ -679,6 +679,12 @@ describe('configuration templates', () => {
 					showcase: true,
 				}),
 				createBlueprint('unshowcased', { app: ['core', 'browser', 'server'] }),
+				createBlueprint('journeyed', {
+					app: ['core', 'browser'],
+					journey: true,
+					setup: ['node', 'browser'],
+				}),
+				createBlueprint('journeyedbare', { app: ['core', 'browser'], journey: true, setup: [] }),
 				createBlueprint('a'.repeat(19), { src: ['core', 'browser', 'server'] }),
 				createBlueprint('a'.repeat(20), { src: ['core', 'browser', 'server'] }),
 				createBlueprint('a'.repeat(MAX_NAME_LENGTH), {
```

No fixture or pin under `tests/src/core/fixtures/` or `tests/src/core/compilers.test.ts` carried
the one-line `appJourney` signature, so no third file needed the wrap.

## `git status --short`

```
 M src/core/templates.ts
 M tests/src/core/templates.test.ts
?? .orkestrel/campaign/findings-roughnotes-visit.md
?? .orkestrel/campaign/r-a-brief.md
?? .orkestrel/campaign/r-a-check-brief.md
?? .orkestrel/campaign/r-a-verify-brief.md
?? .orkestrel/campaign/r-a-workflow.js
?? .orkestrel/campaign/r-b-brief.md
?? .orkestrel/campaign/s6-brief.md
?? .orkestrel/campaign/visit/
```

The `.orkestrel/**` entries predate this unit's edits and are off-limits per the brief; this unit
touched only `src/core/templates.ts` and `tests/src/core/templates.test.ts`.

## Deviations

None. No file outside the owned list needed a change.
