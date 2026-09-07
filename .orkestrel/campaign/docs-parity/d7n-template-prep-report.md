# Report — `d7n-template-prep`

Wall clock: 2026-09-07T15:49:21Z (first command) to 2026-09-07T15:51:33Z (last gate command).

## Item 1 — `repair --offline`

Command: `node <tip>/dist/bin/main.js repair --offline`

Summary line: `9 written, 27 unchanged, 0 removed in ..`

`git status --short` after:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Hunk:

```diff
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -110,21 +110,27 @@ for (const entry of manifest) {
 		})
 
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})
 			})
@@ -139,22 +145,32 @@ for (const entry of manifest) {
 				.surface()
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})
 
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

No other change to the file. The `findMissing` call against `statement.names` / `face.surface().map(...)` and the `names` / `surface` call inside `imports only real exports in every \`\`\`ts fence` and `resolves every relative link` cases already took string arrays and stayed untouched.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 printed no diagnostic and exited `0`. `npm run test:policy` passed with no `prose` failure naming a line in `guides/**` or `README.md`. No `policy/no-malformed-summary` or `policy/no-banned-term` site existed to fix, consistent with the standing condition's P20 reading (total 0 | summary 0 | banned 0). No edit made for this item.

## Item 4 — the bump

`package.json`:

```diff
-	"version": "0.0.6",
+	"version": "0.0.7",
```

`package-lock.json` untouched.

## Acceptance criteria

1. `git status --short`:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Exactly the P21 repair list plus `tests/guides.test.ts`. No voice-site file was edited under item 3 (none existed to edit).

2. Gates:

- `npm run format:check` — `All matched files use the correct format.` `Finished in 5370ms on 45 files using 4 threads.` exit 0.
- `npx oxlint --config .oxlintrc.json --deny-warnings .` — no output, exit 0.
- `npm run check` — `tsc --noEmit --project tsconfig.json && npm run check:src` then `tsc --noEmit -p configs/src/tsconfig.core.json`, no diagnostics, exit 0.

3. Tests:

- `npm run test:guides` — `Test Files  1 passed (1)` / `Tests  31 passed (31)`, exit 0.
- `npm run test:policy` — `Test Files  1 passed (1)` / `Tests  90 passed | 1 skipped (91)`, exit 0.
- `npm run test:config` — `Test Files  1 passed (1)` / `Tests  172 passed | 1 skipped (173)`, exit 0.

4. `npm run docs` — exit 1, worklist verbatim:

```
guides/template.md type MissingPolicy: guide absent source "Names how `TemplateInterface#fill` handles an unresolved required placeholder."
guides/template.md type TemplateFillValues: guide absent source "Represents the values a `TemplateInterface#fill` / `#validate` call resolves placeholders against."
guides/template.md type TemplateManagerEventMap: guide absent source "Declares the push observation surface of a `TemplateManagerInterface` — an id-keyed registry, so `register` / `remove` are the events (never ordered-list `append`/`prepend`)."
guides/template.md type TemplateErrorCode: guide absent source "Names the coded misuse / failure conditions thrown as a `TemplateError`."
guides/template.md interface TemplatePlaceholder: guide absent source "Represents one placeholder a `TemplateDefinition`'s `content` declares — its lookup name, an optional field path into the values record, whether it is required, and a literal fallback."
guides/template.md interface TemplateDefinition: guide absent source "Represents a named, versionable template record — pure data, no behavior."
guides/template.md interface TemplateFillOptions: guide absent source "Carries the per-call options for `TemplateInterface#fill` / `TemplateManagerInterface#fill`."
guides/template.md interface TemplateFillContext: guide absent source "Carries the full option bag `fillTemplate` takes — the per-call `TemplateFillOptions` plus the declared placeholders tokens resolve against."
guides/template.md interface TemplateTokenResolution: guide absent source "Represents one `{{name}}` token's resolution — the single token rule `fillTemplate` and `TemplateInterface#validate` share."
guides/template.md interface TemplateRegisterOptions: guide absent source "Carries the options for `TemplateManagerInterface#register`."
guides/template.md interface TemplateValidationResult: guide absent source "Reports the outcome of `TemplateInterface#validate` — which required placeholders are unresolved, and which supplied values are unused."
guides/template.md interface TemplateOptions: guide absent source "Carries the options for `createTemplate` / the `Template` constructor."
guides/template.md interface TemplateQuery: guide absent source "Represents a query for `TemplateManagerInterface#find` — every supplied field must match."
guides/template.md interface TemplateInterface: guide absent source "Declares the template contract — exact bijection with `Template`."
guides/template.md interface TemplateManagerOptions: guide absent source "Carries the options for `createTemplateManager` / the `TemplateManager` constructor."
guides/template.md interface TemplateManagerInterface: guide absent source "Declares the template registry — a self-owning, id-keyed record-holder with singular/plural accessors and batch overloads."
guides/template.md const FILL_PATTERN: guide "The shared `{{name}}` / escaped-`\\{{` substitution `RegExp` behind `fill` and `validate`." source "Holds the single-pass `{{name}}` substitution pattern shared by `Template#fill` and `Template#validate`."
guides/template.md const DEFAULT_MISSING_POLICY: guide "`'error'` — default `missing` policy when unspecified." source "Holds the default `missing` policy for `Template#fill` / `TemplateManager#fill` when unspecified."
guides/template.md const DEFAULT_LOCALE: guide "`'en-US'` — default `locale` for finite-number formatting when unspecified." source "Holds the default `locale` for `Template#fill` / `TemplateManager#fill` when unspecified."
guides/template.md const UNSAFE_FIELD_SEGMENTS: guide "`['__proto__', 'constructor', 'prototype']` — prototype-pollution-unsafe field-path segments." source "Lists the prototype-pollution-unsafe field-path segments — a fill lookup refuses to resolve ANY path containing one, treating the placeholder as unresolved."
guides/template.md class TemplateError: guide "Carries a `TemplateErrorCode` + optional `context`." source "Represents an error thrown by the template layer."
guides/template.md function isTemplateError: guide "Narrow a caught value to a `TemplateError`." source "Narrows an unknown caught value to a `TemplateError`."
guides/template.md function formatValue: guide "Format a resolved fill value — finite numbers get locale thousands grouping, everything else String-coerces." source "Formats a resolved fill value for substitution into a template's `content`."
guides/template.md function resolveSafeField: guide "Resolve a field path against a values record, refusing any path touching an unsafe segment." source "Resolves a field path against a fill-values record, refusing any path that touches a prototype-pollution-unsafe segment."
guides/template.md function resolveToken: guide "Resolve one `{{name}}` token — the single rule `fillTemplate` and `validate` both apply." source "Resolves one `{{name}}` token against the declared placeholders and the fill-values record."
guides/template.md function fillTemplate: guide "Substitute every `{{name}}` token in `content` against `values`, in a single pass." source "Substitutes every `{{name}}` token in `content` in a single pass."
guides/template.md function placeholderShape: guide "Build the `@orkestrel/contract` object shape describing a template's declared placeholders." source "Builds the `@orkestrel/contract` object shape describing a template's declared placeholders."
guides/template.md function createTemplate: guide absent source "Creates a template."
guides/template.md function createTemplateManager: guide absent source "Creates a template registry."
guides/template.md class Template: guide "Implements `TemplateInterface` exactly — a named, versionable `{{name}}` template." source "Represents a named, versionable template — `{{name}}` tokens in `content`, filled against a values record."
guides/template.md class TemplateManager: guide "Implements `TemplateManagerInterface` exactly — the self-owning, id-keyed registry." source "Represents the template registry — a self-owning, id-keyed record-holder for the `TemplateInterface` instances a consumer registers, looks up, fills, and validates by id, with singular/plural accessors, batch `remove` overloads, and emitter ownership."
guides/template.md TemplateInterface.definition: guide absent source absent
guides/template.md TemplateInterface.fill: guide absent source absent
guides/template.md TemplateInterface.validate: guide absent source absent
guides/template.md TemplateInterface.parameters: guide absent source absent
guides/template.md TemplateManagerInterface.register: guide absent source absent
guides/template.md TemplateManagerInterface.template: guide absent source absent
guides/template.md TemplateManagerInterface.templates: guide absent source absent
guides/template.md TemplateManagerInterface.find: guide absent source absent
guides/template.md TemplateManagerInterface.has: guide absent source absent
guides/template.md TemplateManagerInterface.remove: guide absent source absent
guides/template.md TemplateManagerInterface.clear: guide absent source absent
guides/template.md TemplateManagerInterface.destroy: guide absent source absent
guides/template.md TemplateManagerInterface.fill: guide absent source absent
guides/template.md TemplateManagerInterface.validate: guide absent source absent
guides/template.md TemplateManagerInterface.parameters: guide absent source absent
guides/template.md pitch: readme absent tagline "A named, versionable template layer: `{{name}}` tokens in a `content` string, resolved against a values record by a single-pass fill engine, and registered/looked-up by id through a self-owning `TemplateManager`. `validate` predicts `fill`'s `'error'`-policy outcome exactly — a token it reports `missing` is precisely a token that would throw. Every fill lookup is prototype-pollution-safe: any field-path segment in `UNSAFE_FIELD_SEGMENTS` (`__proto__` / `constructor` / `prototype`) is refused before `resolveField` is ever called. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 47
```

Matches P21's `docs` reading exactly. This worklist belongs to the converge unit per the objective's scope split.

## Deviations

None. No `repair` write fell outside the P21 list, every before-text in item 2 was found verbatim, no voice diagnostic named an off-limits file (none was raised), `test:policy` reported no red on any file, and no gate other than `docs` read red after the items.
