# Last changes: guide

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `8b6ac02`, merge base with `origin/main` `9880c86`, layer L3, declared version 0.0.15, registry version 0.0.15.

## Commits since origin/main

```text
43a44ef 2026-08-28 Update every dependency to the published latest
57469fb 2026-08-28 Adopt the catalog and guide mirrors for the wave
b0ae1b1 2026-08-28 Apply the verified src-audit fixes
907df3a 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
8eca8dc 2026-09-01 Apply the breaking rows in guide
b015704 2026-09-01 Close the guide unit's audit findings
be6111e 2026-09-01 Skip an empty head with no bases when locating a declaration
8b6ac02 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md                               |  17 +-
 README.md                                                 |  12 +-
 package.json                                              |   6 +-
 src/core/Guide.ts                                         |   4 +-
 src/core/constants.ts                                     |  29 +++-
 src/core/factories.ts                                     |  12 +-
 src/core/helpers.ts                                       | 282 +++++++++++++++++++-------------
 src/core/parsers.ts                                       |  19 ++-
 src/core/shapers.ts                                       |  15 +-
 src/core/sources/Source.ts                                | 101 ++++++++----
 src/core/sources/SourceManager.ts                         |   4 +-
 src/core/types.ts                                         | 191 ++++++++++++++++------
 src/core/validators.ts                                    |  33 ++--
 tests/fixtures/broken/phantom-import/guides/src/widget.md |   2 +-
 tests/fixtures/broken/wrong-kind/widget.md                |   2 +-
 tests/guides.test.ts                                      |  18 +-
 tests/src/core/Guide.test.ts                              |  18 +-
 tests/src/core/helpers.test.ts                            | 480 +++++++++++++++++++++++++++++++++++++-----------------
 tests/src/core/shapers.test.ts                            |  25 ++-
 tests/src/core/sources/Source.test.ts                     | 275 ++++++++++++++++++++++++++++---
 tests/src/core/sources/SourceManager.test.ts              |   8 +-
 21 files changed, 1087 insertions(+), 466 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index 197f46c..e957881 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,25 +1,44 @@
 /**
- * The `## Surface` heading text a guide's documented exports section is keyed on.
+ * Lists the five declaration kinds a documented or exported symbol carries, in
+ * the order the reflection grammar names them.
+ *
+ * @remarks
+ * One frozen list feeds the `ExportKind` type, the `isExportKind` guard, and
+ * `surfaceSymbolShape`, so a kind cannot be admitted by one and refused by
+ * another. Comment and template payload is excluded before reflection, and
+ * `enum` is outside this population rather than forbidden by general package
+ * policy.
+ */
+export const EXPORT_KINDS = Object.freeze([
+	'type',
+	'interface',
+	'const',
+	'function',
+	'class',
+] as const)
+
+/**
+ * Names the `## Surface` heading text a guide's documented exports section is keyed on.
  */
 export const SURFACE: string = 'Surface'
 
 /**
- * The `## Methods` heading text a guide's documented interface-methods section is keyed on.
+ * Names the `## Methods` heading text a guide's documented interface-methods section is keyed on.
  */
 export const METHODS: string = 'Methods'
 
 /**
- * The `## Tests` heading text a guide's documented test-link section is keyed on.
+ * Names the `## Tests` heading text a guide's documented test-link section is keyed on.
  */
 export const TESTS: string = 'Tests'
 
 /**
- * The `## By concept` heading text the manifest's run-map table is keyed on.
+ * Names the `## By concept` heading text the manifest's run-map table is keyed on.
  */
 export const MANIFEST: string = 'By concept'
 
 /**
- * The link `href` schemes a guides-parity link check skips as external — a link
+ * Lists the link `href` schemes a guides-parity link check skips as external — a link
  * with one of these prefixes (or a bare `#` anchor, handled separately in
  * `isExternalLink`) is never resolved against the filesystem.
  */
diff --git a/src/core/types.ts b/src/core/types.ts
index bee2af1..0bb6641 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,23 +1,32 @@
+import type { EXPORT_KINDS } from './constants.js'
+
 /**
- * The declaration kind a documented / exported symbol carries — exactly the
- * five reflected `type`, `interface`, `const`, `function`, and `class` heads.
- * Comment/template payload is excluded before reflection. `enum` is outside
- * this population, not forbidden by general package policy.
+ * Represents the declaration kind a documented / exported symbol carries — exactly the
+ * five reflected `type`, `interface`, `const`, `function`, and `class` heads,
+ * derived from {@link EXPORT_KINDS} so the type, the guard, and the shape name
+ * one population. Comment/template payload is excluded before reflection.
+ * `enum` is outside this population, not forbidden by general package policy.
  */
-export type ExportKind = 'type' | 'interface' | 'const' | 'function' | 'class'
+export type ExportKind = (typeof EXPORT_KINDS)[number]
 
 /**
- * One documented / exported symbol — its identifier plus its declaration kind.
+ * Represents one documented / exported symbol — its identifier plus its declaration kind.
+ *
+ * @remarks
+ * `kind` mirrors the guide Surface table's own `Kind` column header, which this
+ * package locates by that exact text (`findKindIndex`) and cannot rename. The
+ * property keeps the column's spelling so the documented table and the
+ * reflected symbol name one axis.
  */
 export interface SurfaceSymbol {
-	/** Its identifier. */
+	/** Holds the symbol's identifier. */
 	readonly name: string
-	/** Its declaration kind — half of the bijection key alongside {@link name}. */
+	/** Holds the symbol's declaration kind — half of the bijection key alongside {@link name}. */
 	readonly kind: ExportKind
 }
 
 /**
- * The source scope a guide's manifest entry covers — one module directory, or
+ * Represents the source scope a guide's manifest entry covers — one module directory, or
  * several when a layer guide spans multiple source directories (a core module
  * plus its backend implementations). `'.'` is the canonical workspace-root
  * directory; empty, trailing-slash, and dot-segment spellings canonicalize to
@@ -26,67 +35,91 @@ export interface SurfaceSymbol {
 export type GuideModule = string | readonly string[]
 
 /**
- * One terminator-free physical source line and its aligned reflection
+ * Represents one terminator-free physical source line and its aligned reflection
  * projections. Every projection has the same length as {@link source}, and
  * every genuine JSDoc span retains its physical opener column; the final
  * physical line is present even when it is empty.
  */
 export interface SourceLine {
-	/** The exact source characters, excluding the LF or CRLF terminator. */
+	/** Holds the exact source characters, excluding the LF or CRLF terminator. */
 	readonly source: string
-	/** Source code with comment and template spans replaced by aligned spaces. */
+	/** Holds source code with comment and template spans replaced by aligned spaces. */
 	readonly code: string
-	/** Every genuine JSDoc span at its exact source columns, or `undefined` when absent. */
+	/** Holds every genuine JSDoc span at its exact source columns, or `undefined` when absent. */
 	readonly jsdoc: string | undefined
 }
 
 /**
- * One `## By concept` manifest row — a single guides-parity check target, paths
+ * Represents one `## By concept` manifest row — a single guides-parity check target, paths
  * normalized to workspace root.
  */
 export interface ManifestEntry {
-	/** The concept name — the row's first cell, flattened. */
+	/** Holds the concept name — the row's first cell, flattened. */
 	readonly concept: string
-	/** The guide `.md` this entry documents, root-relative. */
+	/** Names the guide `.md` this entry documents, root-relative. */
 	readonly spec: string
-	/** The source directory (or directories) the guide documents. */
+	/** Names the source directory (or directories) the guide documents. */
 	readonly source: GuideModule
-	/** The tests directory the guide's `## Tests` links resolve against. */
+	/** Names the tests directory the guide's `## Tests` links resolve against. */
 	readonly tests: string
 }
 
 /**
- * One `#### \`Interface\`` block in a guide's `## Methods` section — the
+ * Represents one `#### \`Interface\`` block in a guide's `## Methods` section — the
  * documented member names of one behavioral interface.
  */
 export interface MethodGroup {
-	/** The backticked interface name. */
+	/** Holds the backticked interface name. */
 	readonly interface: string
-	/** Its documented Method-cell identifiers, in table order. */
+	/** Lists the group's documented Method-cell identifiers, in table order. */
 	readonly methods: readonly string[]
 }
 
-/** One fenced code block projected from a guide document. */
+/**
+ * Represents one brace `import` statement projected from a guide fence — its specifier
+ * paired with the exported names it binds.
+ */
+export interface FenceImport {
+	/** Names the module specifier the statement imports from. */
+	readonly specifier: string
+	/** Lists the imported names, each alias resolved to the original exported name. */
+	readonly names: readonly string[]
+}
+
+/** Represents one fenced code block projected from a guide document. */
 export interface GuideFence {
-	/** The info-string language tag, or `undefined` when the fence is untagged. */
+	/** Holds the info-string language tag, or `undefined` when the fence is untagged. */
 	readonly language: string | undefined
-	/** The fence's verbatim code body. */
+	/** Holds the fence's verbatim code body. */
 	readonly code: string
 }
 
 /**
- * The structured, pure view of one parsed guide — every projection extracted and
+ * Represents the structured, pure view of one parsed guide — every projection extracted and
  * cached once at construction (see {@link createGuide}).
  */
 export interface GuideInterface {
-	/** The `##` heading names, in document order — the non-vacuousness guard for section presence. */
+	/**
+	 * Lists the `##` heading names, in document order — the non-vacuousness guard for
+	 * section presence.
+	 *
+	 * @returns The document's `##` heading names, in document order
+	 */
 	sections(): readonly string[]
-	/** Every `## Surface` identifier + kind — table rows union backticked entity headings. */
+	/**
+	 * Lists every `## Surface` identifier + kind — table rows union backticked entity headings.
+	 *
+	 * @returns The documented surface symbols, in encounter order
+	 */
 	surface(): readonly SurfaceSymbol[]
-	/** One {@link MethodGroup} per documented behavioral interface in `## Methods`. */
+	/**
+	 * Returns one {@link MethodGroup} per documented behavioral interface in `## Methods`.
+	 *
+	 * @returns One group per documented behavioral interface, in document order
+	 */
 	methods(): readonly MethodGroup[]
 	/**
-	 * Every link href in the guide, including table cells.
+	 * Lists every link href in the guide, including table cells.
 	 *
 	 * @example
 	 * ```ts
@@ -95,7 +128,7 @@ export interface GuideInterface {
 	 */
 	links(): readonly string[]
 	/**
-	 * The relative test links declared under `## Tests`.
+	 * Lists the relative test links declared under `## Tests`.
 	 *
 	 * @example
 	 * ```ts
@@ -104,7 +137,7 @@ export interface GuideInterface {
 	 */
 	tests(): readonly string[]
 	/**
-	 * Every fenced code block in the whole document, in document order — no
+	 * Lists every fenced code block in the whole document, in document order — no
 	 * language filter, so a consumer decides which languages its checks read.
 	 *
 	 * @example
@@ -116,12 +149,12 @@ export interface GuideInterface {
 }
 
 /**
- * The reflected source truth a guide's documented surface is checked against —
+ * Represents the reflected source truth a guide's documented surface is checked against —
  * a pure view over a consumer-supplied file inventory (see {@link Source}).
  */
 export interface SourceInterface {
 	/**
-	 * Every direct declaration in the selected module keys matching
+	 * Lists every direct declaration in the selected module keys matching
 	 * `export (async )?(function*?|class|const|interface|type) Name`, by
 	 * (name, kind). Module keys are `.ts` inventory keys under the selected
 	 * directories, excluding each directory's exact root `index.ts` and every
@@ -132,10 +165,12 @@ export interface SourceInterface {
 	 * uninterrupted column-zero declaration-head grammar. `enum`
 	 * and other TypeScript export forms are outside this five-kind reflection
 	 * population, not forbidden by general package policy.
+	 *
+	 * @returns The selected modules' direct declarations, deduplicated and sorted by name
 	 */
 	exports(): readonly SurfaceSymbol[]
 	/**
-	 * Every declaration reachable from each selected module's conventional root
+	 * Lists every declaration reachable from each selected module's conventional root
 	 * `index.ts` through complete relative `.js` `export *` rows. Unlike
 	 * {@link exports}, this inventories barrel reachability rather than all
 	 * intentional direct declarations under the selected directories.
@@ -159,11 +194,11 @@ export interface SourceInterface {
 	 * reduce to canonical keys remain valid. Exact workspace-root `index.ts` and
 	 * nested targets ending `/index.ts` recurse as barrels, with a
 	 * per-computation visited set terminating cycles; other targets contribute
-	 * direct declarations from `exportsFrom()`. Missing roots, missing targets, and
+	 * direct declarations from `extractExports()`. Missing roots, missing targets, and
 	 * unsupported export forms contribute no symbols while valid siblings continue.
 	 * Repository policy, typechecking, and builds own validation; this is not
 	 * filesystem or TypeScript resolution. The result is deduplicated by
-	 * `symbolKey()`, retains same-name/different-kind symbols, sorts by name,
+	 * `computeSymbolKey()`, retains same-name/different-kind symbols, sorts by name,
 	 * computes lazily, and caches the same readonly array instance.
 	 *
 	 * @returns The conventional barrel-reachable surface
@@ -174,12 +209,39 @@ export interface SourceInterface {
 	 * ```
 	 */
 	surface(): readonly SurfaceSymbol[]
-	/** The call-signature members of the `class` / `interface` named `name`. */
+	/**
+	 * Returns the call-signature members of the `class` / `interface` named `name`,
+	 * unioned with the members of every declaration it extends.
+	 *
+	 * @remarks
+	 * One declaration answers for `name`: the module scope's files are read in
+	 * sorted key order and the first one whose located head has a body or has
+	 * bases supplies both the members and the bases, so a second file
+	 * declaring the same name adds nothing; a head with neither a body nor
+	 * bases does not count as declared, so an empty `export interface X {}`
+	 * is skipped and resolution continues to a later file or falls through to
+	 * a same-named class. Resolution reads that head's `extends` clause and follows it
+	 * through this same module scope, keeping the keyword it started from: an
+	 * `interface` chain resolves through interfaces and a `class` chain through
+	 * classes, so a class's `implements` clause is outside the walk. A base the
+	 * scope does not declare — imported from another package, written as a
+	 * qualified name, or declared outside the selected directories —
+	 * contributes no members and is not an error. One visited set per call
+	 * collapses a cycle and a diamond to a single visit.
+	 *
+	 * @param name - The declaration's identifier
+	 * @returns Its declared and inherited method names, deduplicated and sorted, a class `constructor` excluded
+	 */
 	methods(name: string): readonly string[]
-	/** Whether a workspace-root-relative path exists in the inventory. */
+	/**
+	 * Checks whether a workspace-root-relative path exists in the inventory.
+	 *
+	 * @param relative - The workspace-root-relative path to look up
+	 * @returns True if the inventory holds that exact key; false otherwise
+	 */
 	exists(relative: string): boolean
 	/**
-	 * Every module-scope declaration LACKING the `export` keyword (AGENTS §5's
+	 * Lists every module-scope declaration LACKING the `export` keyword (AGENTS §5's
 	 * export-discipline reflection) across the same projected physical code lines
 	 * and five declaration kinds as {@link exports}. Comment/template payload and
 	 * `enum` are outside this population; projection preserves physical columns
@@ -193,7 +255,7 @@ export interface SourceInterface {
 	 */
 	hidden(): readonly SurfaceSymbol[]
 	/**
-	 * The names of every exported function whose next-physical-record eligible
+	 * Lists the names of every exported function whose next-physical-record eligible
 	 * genuine JSDoc chain ends in a span carrying an exact block-position
 	 * `@example` tag. Title text is allowed; intervening material severs
 	 * association.
@@ -205,13 +267,19 @@ export interface SourceInterface {
 	 */
 	examples(): readonly string[]
 	/**
-	 * The members of the `class` / `interface` named `name` whose immediately
+	 * Lists the members of the `class` / `interface` named `name` whose immediately
 	 * preceding eligible genuine JSDoc chain, within the declaration body, ends
 	 * in a span carrying an exact block-position `@example` tag. Title text is
 	 * allowed; intervening material severs association. Declaration and callable
 	 * member eligibility comes from aligned projected code while genuine JSDoc
 	 * evidence retains its source columns.
 	 *
+	 * @remarks
+	 * This overload reads only the named declaration's own body, in the first
+	 * file that declares it, under each keyword. Unlike {@link methods}, the
+	 * overload follows no `extends` clause, so an inherited member's `@example`
+	 * belongs to the base that declares it.
+	 *
 	 * @example
 	 * ```ts
 	 * source.examples('GuideInterface') // ['fences', 'links', 'tests']
@@ -221,34 +289,40 @@ export interface SourceInterface {
 }
 
 /**
- * The construction input for a {@link Source} — a consumer-supplied file
+ * Represents the construction input for a {@link Source} — a consumer-supplied file
  * inventory (root-relative path → file text) plus the module scope to
  * reflect. The consumer gathers `files` however their environment allows
  * (`node:fs` in a Node script, `import.meta.glob` in a browser/vitest run) —
  * `Source` itself never touches disk.
  */
 export interface SourceOptions {
-	/** The workspace's exact canonical-segment opaque inventory keys, root-relative path → text. */
+	/**
+	 * Holds the workspace's exact canonical-segment opaque inventory keys, root-relative path
+	 * → text.
+	 */
 	readonly files: Readonly<Record<string, string>>
-	/** The source directory (or directories) this guide documents; `'.'` is workspace root. */
+	/** Names the source directory (or directories) this guide documents; `'.'` is workspace root. */
 	readonly module: GuideModule
 }
 
 /**
- * The construction input for a {@link SourceManager}: one shared file inventory
+ * Represents the construction input for a {@link SourceManager}: one shared file inventory
  * plus the consumer's specifier-to-module policy.
  */
 export interface SourceManagerOptions {
-	/** The workspace's exact canonical-segment opaque inventory keys, root-relative path → text. */
+	/**
+	 * Holds the workspace's exact canonical-segment opaque inventory keys, root-relative path
+	 * → text.
+	 */
 	readonly files: Readonly<Record<string, string>>
-	/** Each local import specifier mapped to the source module it exposes. */
+	/** Maps each local import specifier to the source module it exposes. */
 	readonly modules: Readonly<Record<string, GuideModule>>
 }
 
-/** A specifier resolver that shares one {@link SourceInterface} per module. */
+/** Represents a specifier resolver that shares one {@link SourceInterface} per module. */
 export interface SourceManagerInterface {
 	/**
-	 * Resolve a mapped specifier to its shared source view.
+	 * Resolves a mapped specifier to its shared source view.
 	 *
 	 * @param specifier - The import specifier to resolve
 	 * @returns Its source view, or `undefined` when the specifier is not mapped
@@ -257,13 +331,26 @@ export interface SourceManagerInterface {
 }
 
 /**
- * A declaration head joined into a single line, plus the index of the line
+ * Pairs a declaration head joined into a single line with the index of the line
  * carrying its opening `{` — how a head that oxfmt wrapped across lines
  * (printWidth 100) is matched as if it were written on one.
  */
 export interface DeclarationHead {
-	/** The joined, space-separated head text. */
+	/** Holds the joined, space-separated head text. */
 	readonly text: string
-	/** The index (within the source `lines`) of the line ending in `{`. */
+	/** Holds the index (within the source `lines`) of the line ending in `{`. */
 	readonly end: number
 }
+
+/**
+ * Represents one located `export class` / `export interface` declaration — the body lines
+ * and the base identifiers read from the same head, so a consumer never pairs
+ * one declaration's body with another declaration's heritage (see
+ * {@link extractDeclaration}).
+ */
+export interface Declaration {
+	/** Holds the declaration's raw body lines, between the head and the column-zero closing `}`. */
+	readonly body: readonly string[]
+	/** Lists the base identifiers its head extends, in head order. */
+	readonly bases: readonly string[]
+}
```
