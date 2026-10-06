**Stopped at branch point.** Chromium 141.0.7390.37 does not return the nested declarations through `scanSheetRules`. Both TSDoc fixes are applied. `SheetEntry`, both readers, and attribution behavior remain unchanged.

The branch reading comes from `CSSOM instruments > reads nested container declarations with their media context and layer beside a flat control`, using:

```css
@layer x { .container { @media (min-width: 40rem) { max-width: 40rem } } }
```

The flat control is `.container { max-width: 40rem }`. Verbatim output follows; `<undefined>` represents an undefined layer:

```text
B2 container reading {"entries":[{"rule":"CSSLayerBlockRule","context":"","layer":"<undefined>"},{"rule":"CSSStyleRule","context":"","layer":"x"}],"control":[{"rule":"CSSStyleRule","context":"","layer":"<undefined>"}],"grouping":false}
```

Direct CSSOM access confirmed that the nested `CSSMediaRule` and `CSSNestedDeclarations` exist and declare `max-width: 40rem`. The scanner omitted both.

The real witness proof, `reads nested preflight placeholder declarations from the recipe sheet`, reads the existing `recipeRecord.recipe`. Its verbatim output is:

```text
B2 placeholder reading {"sheet":"::placeholder {\n  color: currentcolor;\n  @supports (color: color-mix(in lab, red, red)) {\n  color: color-mix(in oklab, currentcolor, transparent);\n}\n}","reading":[{"rule":"CSSStyleRule","context":"@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px)","layer":"base"}]}
```

Direct CSSOM access confirmed the nested supports declaration exists. The scanner returned only its enclosing placeholder rule.

The attribution proof, `reads nested departure attribution beside a flat declaration control`, uses `.a { @media (min-width: 1px) { color: red } }` and `.a { color: red }`. It passed with:

```text
B2 attribution reading {"nested":"unattributed","flat":"resolved","computed":"rgb(255, 0, 0)"}
```

The symbol locations at clean base `2ba68b9` are:

| File | Symbol or region | Base line |
|---|---|---:|
| `tests/setupStyles.ts` | `attributeDeparture` | 609 |
| `tests/setupStyles.ts` | `resolveDepartureAnchor` TSDoc / `@param coupled` / function | 743 / 748 / 755 |
| `tests/setupStyles.ts` | `SheetEntry` | 1031 |
| `tests/setupStyles.ts` | `scanSheetRules` TSDoc / function / grouping guard | 1279 / 1288 / 1299 |
| `tests/setupStyles.ts` | `collectLayerClasses` / descent condition | 1854 / 1869 |
| `tests/setupBrowser.ts` | `SheetEntry` import | 24 |
| `tests/setupBrowser.ts` | `mapReading` TSDoc / function / `* 16` conversion | 306 / 323 / 336 |
| `tests/setupBrowser.ts` | `PartitionEntry` | 463 |
| `tests/setupBrowser.ts` | `readPartitionRules` TSDoc / function | 2030 / 2039 |
| `tests/setupBrowser.ts` | Partition pending list / entries / descent | 2043 / 2049 / 2055 |
| `tests/setupBrowser.ts` | Partition nested-declaration filters | 2082 / 2109 |
| `tests/setupBrowser.ts` | Other `SheetEntry` reader signature / scan | 2254 / 2260 |
| `tests/setupBrowser.ts` | Preservation rules scan | 2341 |
| `tests/setupBrowser.test.ts` | Nested partition declaration proof | 2336 |

The bounded `scanSheetRules|SheetEntry` search identified these count and layer pins for the follow-on branch to re-read. Locations refer to `2ba68b9`; no expectations were changed:

| Proof location | Existing pin |
|---|---|
| `tests/setupStyles.test.ts:843` | Three style-rule layers: `['foundation', 'foundation', 'foundation']` |
| `tests/setupStyles.test.ts:951` | Empty scan: `[]` |
| `tests/src/bootstrap/index.test.ts:168` | One layer statement |
| `tests/src/bootstrap/index.test.ts:173` | Every layer block is `bootstrap` |
| `tests/src/styles/index.test.ts:24` | Every layer block belongs to the declared owned-layer set |
| `tests/src/styles/themes/index.test.ts:32` | Layer blocks: `['@layer theme']` |
| `tests/src/tailwindcss/index.test.ts:302` | No CSSOM `@source` entries |
| `tests/src/tailwindcss/index.test.ts:495,552` | 80 derived selector-copy pairs; copied entries retain `bootstrap` and precede components |
| `tests/integration.test.ts:554` | Linked-alone utility and source lists are empty; recipe utility list is `['calc(var(--spacing) * 3)']` |
| `tests/app/browser/integration.test.ts:1005` | One `.collapse` style rule |
| `tests/app/browser/integration.test.ts:1490` | No matching `word-spacing` declaration |
| `tests/setupBrowser.test.ts:2336` | Two nested `.container` declaration entries, both in `utilities`, with distinct media/supports contexts |

Other scan consumers occur in `tests/app/browser/sections/integration.test.ts` and the setup helpers listed by the search; their membership, declaration, and context assertions also need review when traversal expands.

The executed proof command was:

```bash
node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/units/completion-b2-proof.log --errors tmp/units/completion-b2-proof.err --cap 2400 -- flock -w 1800 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/completion-b2-proof-1 --kind command --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:setup:browser -- tests/setupStyles.test.ts -t 'reads nested'
```

Its run folder is [completion-b2-proof-1](/home/user/veneer/tmp/units/journey-cost/runs/completion-b2-proof-1). Bare result lines are:

```text
 Test Files  1 failed (1)
      Tests  2 failed | 1 passed | 48 skipped (51)
   Duration  8.32s (transform 0ms, setup 867ms, import 114ms, tests 20ms, environment 0ms)
```

The runner recorded child exit `1`, runner exit `1`, and no instrument errors. The skipped tests were excluded by the title filter. No dependency-optimization import failure occurred, so no rerun was taken.

Format, lint, check, full setup-browser, Tailwind, integration, and journey gates were not run after the mandatory stop. No gate is claimed passed.

The deviations and ancillary choices are:

- **Expected:** nested declarations returned with media context and layer. **Found:** only the layer block and style rule returned. **Evidence:** the container output and failing equality assertion. **Done:** proofs and TSDoc fixes. **Not done:** traversal, selector-field, partition-reader, or attribution repairs. **Hypothesis:** descending through `CSSStyleRule` will expose the missing rules; selector propagation and attribution require separate verification.
- The placeholder proof also has an incorrect expected outer context: it expects `''`, while the recipe places the rule inside `@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px)`. This additional assertion defect is disclosed and left untouched after the stop. Its missing-child observation remains independently visible in the output.
- Proof titles and inline CSS are shown in the diff. Existing recipe data and teardown helpers were reused; no fixture, helper, dependency, or public type was added.
- Diagnostic output records rule constructor names and uses `<undefined>` only for serialization.
- The launch cap was 2400 seconds, covering the prescribed 1800-second lock wait plus execution allowance. The launcher recorded `capped:false`.
- No sub-agents, network access, installs, commits, shared-file edits, or scaffold-record edits were performed. No journey comparison was made; the user-specified J-B1 baselines govern any subsequent journey run.

The actual `git status --porcelain` output is:

```text
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

The actual `git diff` is:

```diff
diff --git a/tests/setupBrowser.ts b/tests/setupBrowser.ts
index c4b35d4..ab0236a 100644
--- a/tests/setupBrowser.ts
+++ b/tests/setupBrowser.ts
@@ -315,6 +315,7 @@ export function readTokenScales(): readonly TokenScaleReading[] {
  * color mode selects that row. The `--bs-dark-text-emphasis` and `--bs-highlight-color`
  * variables take the light row and are outside this helper's contract, as is a dark-mode
  * `#dee2e6` reading from the `.dropdown-menu-dark .dropdown-item` rule.
+ * The helper maps record rows, not breakpoint-band states, at a 16 px root.
  * @example
  * ```ts
  * mapReading(document.body, 'padding-top', '16px', []) // '16px'
diff --git a/tests/setupStyles.test.ts b/tests/setupStyles.test.ts
index 70be117..b49e86b 100644
--- a/tests/setupStyles.test.ts
+++ b/tests/setupStyles.test.ts
@@ -840,6 +840,115 @@ describe('CSSOM instruments', () => {
 		expect(document.adoptedStyleSheets).toEqual(previous)
 	})
 
+	it('reads nested container declarations with their media context and layer beside a flat control', () => {
+		const sheet = new CSSStyleSheet()
+		sheet.replaceSync(
+			'@layer x { .container { @media (min-width: 40rem) { max-width: 40rem } } }',
+		)
+		const flat = new CSSStyleSheet()
+		flat.replaceSync('.container { max-width: 40rem }')
+		const layer = requireValue(sheet.cssRules[0])
+		if (!(layer instanceof CSSLayerBlockRule)) throw new Error('Expected a layer block')
+		const container = requireValue(layer.cssRules[0])
+		if (!(container instanceof CSSStyleRule)) throw new Error('Expected a style rule')
+		const media = requireValue(container.cssRules[0])
+		if (!(media instanceof CSSMediaRule)) throw new Error('Expected a media rule')
+		const declaration = requireValue(media.cssRules[0])
+		if (!(declaration instanceof CSSNestedDeclarations))
+			throw new Error('Expected nested declarations')
+		const entries = scanSheetRules(sheet).map(({ rule, context, layer }) => ({
+			rule: rule.constructor.name,
+			context,
+			layer: layer ?? '<undefined>',
+		}))
+		const control = scanSheetRules(flat).map(({ rule, context, layer }) => ({
+			rule: rule.constructor.name,
+			context,
+			layer: layer ?? '<undefined>',
+		}))
+		console.info(
+			'B2 container reading',
+			JSON.stringify({ entries, control, grouping: container instanceof CSSGroupingRule }),
+		)
+		expect(declaration.style.getPropertyValue('max-width')).toBe('40rem')
+		expect(control).toEqual([{ rule: 'CSSStyleRule', context: '', layer: '<undefined>' }])
+		expect(requireValue(flat.cssRules[0]) instanceof CSSStyleRule).toBe(true)
+		expect(entries).toEqual([
+			{ rule: 'CSSLayerBlockRule', context: '', layer: '<undefined>' },
+			{ rule: 'CSSStyleRule', context: '', layer: 'x' },
+			{ rule: 'CSSMediaRule', context: '', layer: 'x' },
+			{ rule: 'CSSNestedDeclarations', context: '@media (min-width: 40rem)', layer: 'x' },
+		])
+	})
+	it('reads nested preflight placeholder declarations from the recipe sheet', () => {
+		const sheet = new CSSStyleSheet()
+		sheet.replaceSync(recipeRecord.recipe)
+		const entries = scanSheetRules(sheet)
+		const placeholder = requireValue(
+			entries.find(
+				({ rule, layer }) =>
+					layer === 'base' &&
+					rule instanceof CSSStyleRule &&
+					rule.selectorText === '::placeholder' &&
+					Array.from(rule.cssRules).some((child) => child instanceof CSSSupportsRule),
+			),
+		)
+		if (!(placeholder.rule instanceof CSSStyleRule)) throw new Error('Expected a style rule')
+		const supports = requireValue(
+			Array.from(placeholder.rule.cssRules).find((rule) => rule instanceof CSSSupportsRule),
+		)
+		const declaration = requireValue(
+			Array.from(supports.cssRules).find((rule) => rule instanceof CSSNestedDeclarations),
+		)
+		const reading = entries
+			.filter(({ rule }) => rule === placeholder.rule || rule === supports || rule === declaration)
+			.map(({ rule, context, layer }) => ({
+				rule: rule.constructor.name,
+				context,
+				layer,
+			}))
+		console.info(
+			'B2 placeholder reading',
+			JSON.stringify({ sheet: placeholder.rule.cssText, reading }),
+		)
+		expect(declaration.style.getPropertyValue('color')).not.toBe('')
+		expect(reading).toEqual([
+			{ rule: 'CSSStyleRule', context: '', layer: 'base' },
+			{ rule: 'CSSSupportsRule', context: '', layer: 'base' },
+			{
+				rule: 'CSSNestedDeclarations',
+				context: `@supports ${supports.conditionText}`,
+				layer: 'base',
+			},
+		])
+	})
+	it('reads nested departure attribution beside a flat declaration control', () => {
+		const carrier = document.createElement('div')
+		carrier.className = 'a'
+		document.body.append(carrier)
+		teardown.add(() => carrier.remove())
+		const nested = adoptSheet('.a { @media (min-width: 1px) { color: red } }')
+		teardown.add(() => nested.release())
+		const flat = new CSSStyleSheet()
+		flat.replaceSync('.a { color: red }')
+		const options = {
+			lifted: new CSSStyleSheet(),
+			shared: new Set<string>(),
+			tailwind: [],
+			ancestors: new Map<Element, ReadonlySet<string>>(),
+		}
+		const reading = {
+			nested: attributeDeparture(carrier, 'color', { ...options, sheets: [nested.sheet] }),
+			flat: attributeDeparture(carrier, 'color', { ...options, sheets: [flat] }),
+			computed: getComputedStyle(carrier).color,
+		}
+		console.info('B2 attribution reading', JSON.stringify(reading))
+		expect(reading).toEqual({
+			nested: 'unattributed',
+			flat: 'resolved',
+			computed: 'rgb(255, 0, 0)',
+		})
+	})
 	it('compares layered and unlayered fixture sequences with nested grouping context', () => {
 		const original = adoptSheet(plain)
 		teardown.add(() => original.release())
diff --git a/tests/setupStyles.ts b/tests/setupStyles.ts
index ac490fd..75f1c36 100644
--- a/tests/setupStyles.ts
+++ b/tests/setupStyles.ts
@@ -745,7 +745,7 @@ export function matchesExcludedDeparture(property: string): boolean {
  * @param property - The departing longhand.
  * @param before - The Bootstrap computed values.
  * @param after - The recipe computed values.
- * @param coupled - If `true`, follow CSS Overflow 3 coupling; if `false`, keep the overflow longhand for a regression control. Default: `true`.
+ * @param coupled - If `true`, follow the visible-to-auto half of CSS Overflow 3 coupling; if `false`, keep the overflow longhand for a regression control. A clip-to-hidden coupling reads `unattributed` and fails closed. Default: `true`.
  * @returns The departing anchor when the computed readings follow it; otherwise the original longhand.
  * @example
  * ```ts
```