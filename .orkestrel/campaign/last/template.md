# Last changes: template

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `7ffa579`, merge base with `origin/main` `6f88ef4`, layer L2, declared version 0.0.5, registry version 0.0.5.

## Commits since origin/main

```text
b4e46fb 2026-08-28 Update every dependency to the published latest
944770b 2026-08-28 Adopt the catalog and guide mirrors for the wave
7d0237a 2026-08-28 Apply the verified src-audit fixes
fdb3f99 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
bf94339 2026-09-01 Adopt the renamed guide helpers in the parity test
50da0d2 2026-09-02 Count templates, return undefined for a missing one, drop remove()
2eccc62 2026-09-02 Restore the no-argument remove overload
8fdc167 2026-09-02 Remove every present id in a batch and report whether all were present
85bc44b 2026-09-02 Point the README at the guide the package ships
7ffa579 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md            |  17 ++++++------
 README.md                              |   2 +-
 package.json                           |   6 ++--
 src/core/Template.ts                   |  33 +++++++++++-----------
 src/core/TemplateManager.ts            |  79 +++++++++++++++++++++++++++++------------------------
 src/core/constants.ts                  |  13 +++++----
 src/core/errors.ts                     |   8 +++---
 src/core/factories.ts                  |   4 +--
 src/core/helpers.ts                    | 109 +++++++++++++++++++++++++++++++++++++++----------------------------------
 src/core/index.ts                      |   1 +
 src/core/shapers.ts                    |  39 ++++++++++++++++++++++++++
 src/core/types.ts                      | 103 ++++++++++++++++++++++++++++++++++++++++++++++++++-------------------
 tests/guides.test.ts                   |  22 +++++++--------
 tests/src/core/TemplateManager.test.ts |  53 +++++++++++++++++++++++++-----------
 tests/src/core/factories.test.ts       |   2 +-
 tests/src/core/helpers.test.ts         |  71 +++++++++++++++++++++++++++++++++++++----------
 tests/src/core/shapers.test.ts         |  25 +++++++++++++++++
 17 files changed, 389 insertions(+), 198 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index 34ecaa1..0235323 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -4,8 +4,8 @@ import type { MissingPolicy } from './types.js'
 // UPPER_SNAKE_CASE data, the sole home for module-scope literal defaults).
 
 /**
- * The single-pass `{{name}}` substitution pattern shared by `Template#fill`
- * and `Template#validate`.
+ * Holds the single-pass `{{name}}` substitution pattern shared by
+ * `Template#fill` and `Template#validate`.
  *
  * @remarks
  * Global-flagged, two-alternative pattern: a match of the FIRST alternative
@@ -25,15 +25,16 @@ import type { MissingPolicy } from './types.js'
  */
 export const FILL_PATTERN = /\\\{\{|\{\{([^{}]+?)\}\}/g
 
-/** Default `missing` policy for `Template#fill` / `TemplateManager#fill` when unspecified. */
+/** Holds the default `missing` policy for `Template#fill` / `TemplateManager#fill` when unspecified. */
 export const DEFAULT_MISSING_POLICY: MissingPolicy = 'error'
 
-/** Default `locale` for `Template#fill` / `TemplateManager#fill` when unspecified. */
+/** Holds the default `locale` for `Template#fill` / `TemplateManager#fill` when unspecified. */
 export const DEFAULT_LOCALE = 'en-US'
 
 /**
- * Prototype-pollution-unsafe field-path segments — a fill lookup refuses to
- * resolve ANY path containing one, treating the placeholder as unresolved.
+ * Lists the prototype-pollution-unsafe field-path segments — a fill lookup
+ * refuses to resolve ANY path containing one, treating the placeholder as
+ * unresolved.
  */
 export const UNSAFE_FIELD_SEGMENTS: readonly string[] = Object.freeze([
 	'__proto__',
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 6267c01..471e57c 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -4,7 +4,7 @@ import type { TemplateErrorCode } from './types.js'
 // carrying a machine-readable `code`, so a `catch` branches on `error.code`.
 
 /**
- * An error thrown by the template layer.
+ * Represents an error thrown by the template layer.
  *
  * @remarks
  * Thrown for: a required placeholder staying unresolved under the `error`
@@ -31,17 +31,17 @@ export class TemplateError extends Error {
 }
 
 /**
- * Narrow an unknown caught value to a {@link TemplateError}.
+ * Narrows an unknown caught value to a {@link TemplateError}.
  *
  * @param value - The value to test (typically a `catch` binding)
- * @returns `true` when `value` is a {@link TemplateError}
+ * @returns True if `value` is a {@link TemplateError}; false otherwise
  *
  * @example
  * ```ts
  * import { isTemplateError } from '@src/core'
  *
  * try {
- * 	manager.template('missing')
+ * 	manager.fill('missing')
  * } catch (error) {
  * 	if (isTemplateError(error) && error.code === 'NOTFOUND') return
  * }
diff --git a/src/core/index.ts b/src/core/index.ts
index 82efd75..2eaebda 100644
--- a/src/core/index.ts
+++ b/src/core/index.ts
@@ -2,6 +2,7 @@ export * from './types.js'
 export * from './constants.js'
 export * from './errors.js'
 export * from './helpers.js'
+export * from './shapers.js'
 export * from './Template.js'
 export * from './TemplateManager.js'
 export * from './factories.js'
diff --git a/src/core/types.ts b/src/core/types.ts
index 4bf2cff..2398d37 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -10,9 +10,9 @@ import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkes
 // === Template data model — pure JSON-serializable, versionable
 
 /**
- * One placeholder a {@link TemplateDefinition}'s `content` declares — its
- * lookup name, an optional field path into the values record, whether it is
- * required, and a literal fallback.
+ * Represents one placeholder a {@link TemplateDefinition}'s `content`
+ * declares — its lookup name, an optional field path into the values record,
+ * whether it is required, and a literal fallback.
  *
  * @remarks
  * `name` is the `{{name}}` token as written in `content`. `path`, when
@@ -32,7 +32,7 @@ export interface TemplatePlaceholder {
 }
 
 /**
- * A named, versionable template record — pure data, no behavior.
+ * Represents a named, versionable template record — pure data, no behavior.
  *
  * @remarks
  * `content` is the raw string carrying `{{name}}` tokens (see
@@ -52,7 +52,7 @@ export interface TemplateDefinition {
 }
 
 /**
- * How {@link TemplateInterface#fill} handles an unresolved required
+ * Names how {@link TemplateInterface#fill} handles an unresolved required
  * placeholder.
  *
  * @remarks
@@ -62,16 +62,49 @@ export interface TemplateDefinition {
  */
 export type MissingPolicy = 'error' | 'empty' | 'literal'
 
-/** The values a {@link TemplateInterface#fill} / `#validate` call resolves placeholders against. */
+/** Represents the values a {@link TemplateInterface#fill} / `#validate` call resolves placeholders against. */
 export type TemplateFillValues = Readonly<Record<string, unknown>>
 
-/** Per-call options for `TemplateInterface#fill` / `TemplateManagerInterface#fill`. */
+/** Carries the per-call options for `TemplateInterface#fill` / `TemplateManagerInterface#fill`. */
 export interface TemplateFillOptions {
 	readonly missing?: MissingPolicy
 	readonly locale?: string
 }
 
-/** The outcome of `TemplateInterface#validate` — which required placeholders are unresolved, and which supplied values are unused. */
+/**
+ * Carries the full option bag `fillTemplate` takes — the per-call
+ * {@link TemplateFillOptions} plus the declared placeholders tokens resolve
+ * against.
+ *
+ * @remarks
+ * `Template#fill` supplies `placeholders` from its own declaration; a direct
+ * `fillTemplate` caller supplies them per call, and omitting them fills
+ * against undeclared tokens alone.
+ */
+export interface TemplateFillContext extends TemplateFillOptions {
+	readonly placeholders?: readonly TemplatePlaceholder[]
+}
+
+/**
+ * Represents one `{{name}}` token's resolution — the single token rule
+ * `fillTemplate` and `TemplateInterface#validate` share.
+ *
+ * @remarks
+ * `value` is the resolved fill value, `undefined` when the path is
+ * unresolved or refused by the prototype-pollution guard. `declared` is the
+ * matching {@link TemplatePlaceholder}, `undefined` for an undeclared token.
+ * `required` is `true` for an undeclared token and for a declared
+ * placeholder whose `required` is not `false`. A declared `fallback` is left
+ * on `declared` rather than applied here, because `fill` substitutes it and
+ * `validate` only counts it.
+ */
+export interface TemplateTokenResolution {
+	readonly value: unknown
+	readonly declared: TemplatePlaceholder | undefined
+	readonly required: boolean
+}
+
+/** Reports the outcome of `TemplateInterface#validate` — which required placeholders are unresolved, and which supplied values are unused. */
 export interface TemplateValidationResult {
 	readonly valid: boolean
 	readonly missing: readonly string[]
@@ -79,7 +112,7 @@ export interface TemplateValidationResult {
 }
 
 /**
- * Options for `createTemplate` / the `Template` constructor.
+ * Carries the options for `createTemplate` / the `Template` constructor.
  *
  * @remarks
  * `id` defaults to a generated id when omitted. `placeholders` defaults to
@@ -99,7 +132,18 @@ export interface TemplateOptions {
 	readonly locale?: string
 }
 
-/** A query for `TemplateManagerInterface#find` — every supplied field must match. */
+/**
+ * Carries the options for `TemplateManagerInterface#register`.
+ *
+ * @remarks
+ * `replace` overwrites an existing entry sharing the registered id instead of
+ * throwing a {@link TemplateError} coded `CONFLICT`.
+ */
+export interface TemplateRegisterOptions {
+	readonly replace?: boolean
+}
+
+/** Represents a query for `TemplateManagerInterface#find` — every supplied field must match. */
 export interface TemplateQuery {
 	readonly name?: string
 	readonly category?: string
@@ -107,7 +151,7 @@ export interface TemplateQuery {
 }
 
 /**
- * The template contract (AGENTS §22 — exact bijection with `Template`).
+ * Declares the template contract (AGENTS §22 — exact bijection with `Template`).
  *
  * @remarks
  * `definition` returns the plain {@link TemplateDefinition} data. `fill`
@@ -137,21 +181,22 @@ export interface TemplateInterface {
 // === Manager — event map, options, interface
 
 /**
- * The push observation surface of a {@link TemplateManagerInterface} (AGENTS
- * §13) — an id-keyed registry, so `register` / `remove` are the events
+ * Declares the push observation surface of a {@link TemplateManagerInterface}
+ * (AGENTS §13) — an id-keyed registry, so `register` / `remove` are the events
  * (never ordered-list `append`/`prepend`).
  */
 export type TemplateManagerEventMap = {
-	/** A template was registered — carries the registered template. */
+	/** Fires when a template is registered — carries the registered template. */
 	readonly register: readonly [template: TemplateInterface]
-	/** A template was removed — carries the removed template. */
+	/** Fires when a template is removed — carries the removed template. */
 	readonly remove: readonly [template: TemplateInterface]
-	/** The registry was cleared. */
+	/** Fires when the registry is cleared. */
 	readonly clear: readonly []
 }
 
 /**
- * Options for `createTemplateManager` / the `TemplateManager` constructor.
+ * Carries the options for `createTemplateManager` / the `TemplateManager`
+ * constructor.
  *
  * @remarks
  * `templates` seeds the registry — either constructed {@link TemplateInterface}
@@ -169,25 +214,27 @@ export interface TemplateManagerOptions {
 }
 
 /**
- * The template registry — a self-owning, id-keyed record-holder (AGENTS §9.1
- * singular/plural accessors, §9.2 batch overloads).
+ * Declares the template registry — a self-owning, id-keyed record-holder
+ * (AGENTS §9.1 singular/plural accessors, §9.2 batch overloads).
  *
  * @remarks
  * `register` accepts either a constructed {@link TemplateInterface} or a
  * plain {@link TemplateOptions} bag (constructed internally), and throws a
  * {@link TemplateError} coded `CONFLICT` when the id already exists unless
- * `options.replace` is `true`. `template` throws `NOTFOUND` for an unknown
- * id. `remove`'s batch form is all-or-nothing: any missing id in the list
- * leaves the collection untouched and returns `false`.
+ * `options.replace` is `true`. `template` returns `undefined` for an unknown
+ * id; `fill`, `validate`, and `parameters` throw `NOTFOUND` for one, because
+ * each needs a template to proceed. `remove()` removes every registered
+ * template. `remove`'s batch form removes every present id and reports
+ * `true` only when all listed ids were present.
  */
 export interface TemplateManagerInterface {
 	readonly emitter: EmitterInterface<TemplateManagerEventMap>
-	readonly size: number
+	readonly count: number
 	register(
 		template: TemplateInterface | TemplateOptions,
-		options?: { readonly replace?: boolean },
+		options?: TemplateRegisterOptions,
 	): TemplateInterface
-	template(id: string): TemplateInterface
+	template(id: string): TemplateInterface | undefined
 	templates(): readonly TemplateInterface[]
 	find(query?: TemplateQuery): readonly TemplateInterface[]
 	has(id: string): boolean
@@ -203,12 +250,12 @@ export interface TemplateManagerInterface {
 // === Errors
 
 /**
- * Coded misuse / failure conditions thrown as a {@link TemplateError}.
+ * Names the coded misuse / failure conditions thrown as a {@link TemplateError}.
  *
  * @remarks
  * `MISSING` — a required placeholder stayed unresolved under the `error`
- * {@link MissingPolicy}. `NOTFOUND` — `TemplateManagerInterface#template`
- * (or `fill` / `validate` / `parameters` by id) was handed an unknown id.
+ * {@link MissingPolicy}. `NOTFOUND` — `TemplateManagerInterface#fill`,
+ * `#validate`, or `#parameters` was handed an unknown id.
  * `INVALID` — `createTemplate` was handed data that fails validation.
  * `CONFLICT` — `register` was handed an id already present without
  * `options.replace`.
```
