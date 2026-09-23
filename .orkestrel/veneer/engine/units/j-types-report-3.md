# Unit J-TYPES — report 3: the declaration rollup's `Sanitizer` reference

Executor: `opus` on Opus 5.5, native Claude subagent, sole writer in `C:/Users/mikes/WebstormProjects/veneer-types` (branch `unit/types`, base `1868007`). Brief: `j-types-brief-3.md`. Nothing committed, installed, or discarded.

## Outcome

E11 is applied. `src/browser/types.ts` declares the `SanitizerConfig` mirror, `SetHTMLOptions.sanitizer` is typed by it, and no declaration references the DOM global `Sanitizer`. `npm run build:src:browser` exits 0 and the declaration rollup completes. Every acceptance criterion reads green.

## Declarations after the edit

The following block is `src/browser/types.ts` from the `SanitizerConfig` doc block through the end of `SanitizeTargetInterface`, verbatim.

```ts

/**
 * Mirrors the HTML standard's dictionary that lists the elements and attributes the platform sanitizer keeps.
 *
 * @remarks
 * The HTML standard names this dictionary `SanitizerConfig`. The mirror carries only its `elements`,
 * `attributes`, and `dataAttributes` fields, the ones the tip sanitizer sets. TypeScript 6.0.3
 * declares the dictionary globally, but the declaration rollup compiles with TypeScript 5.9.3, whose DOM
 * library declares no sanitizer types, so the public contract declares its own mirror.
 */
export interface SanitizerConfig {
	/** Lists the element names the sanitized markup keeps, mirroring the dictionary's `elements` field. */
	readonly elements?: readonly string[]
	/** Lists the attribute names every kept element keeps, mirroring the dictionary's `attributes` field. */
	readonly attributes?: readonly string[]
	/** If `true`, keeps every `data-*` attribute; if `false`, drops each one, mirroring the dictionary's `dataAttributes` field. Default: dropped when `attributes` is given. */
	readonly dataAttributes?: boolean
}

/**
 * Mirrors the WHATWG dictionary the platform's `setHTML` method reads its sanitizer from.
 *
 * @remarks
 * The HTML standard gives the dictionary this name, and TypeScript's DOM library does not declare it.
 */
export interface SetHTMLOptions {
	/** Carries the configuration the markup is sanitized through. Default: the platform's safe baseline. */
	readonly sanitizer?: SanitizerConfig
}

/**
 * Describes a node whose `setHTML` method parses markup through a sanitizer.
 *
 * @remarks
 * The DOM library of TypeScript 6.0.3 omits `setHTML`, so a guard narrows an element to this contract
 * before the tip content is written. The declaration rollup's compiler declares no platform `Sanitizer`
 * interface, so the contract carries the `SanitizerConfig` dictionary rather than a sanitizer object.
 */
export interface SanitizeTargetInterface {
	/**
	 * Replaces the node's children with the markup the sanitizer keeps, mirroring the platform's `setHTML` method.
	 *
	 * @param html - The markup to parse.
	 * @param options - The sanitizer configuration to parse it through.
	 * @example
	 * ```ts
	 * target.setHTML('<b>Saved</b>', { sanitizer: { elements: ['b'] } })
	 * ```
	 */
	setHTML(html: string, options?: SetHTMLOptions): void
}
```

The guide row added to `guides/veneer.md` § Surface, between `SanitizeOptions` and `SetHTMLOptions`, is the following line.

```md
| `SanitizerConfig`         | interface | Mirrors the HTML standard's dictionary that lists the elements and attributes the platform sanitizer keeps.                          |
```

## Rulings inside the owned scope

- **Summary sentence.** The `SanitizerConfig` description opens with the `-s` verb `Mirrors` and does not name `SanitizerConfig`, because `.claude/rules/typescript.md` § Comments and API documentation (enforced by `policy/no-malformed-summary`) refuses a first sentence naming the declared symbol. The standard's dictionary name sits in `@remarks` instead, which satisfies the brief's "the interface's summary naming the standard's dictionary" by naming it as "the HTML standard's dictionary" and giving its name one sentence later.
- **Leaf TSDoc.** Each leaf ends with "mirroring the dictionary's `<field>` field", per `.claude/rules/names.md` § General vocabulary (a mirrored external field keeps its wording and its TSDoc names the source). `dataAttributes` uses the "If `true`, …; if `false`, …" form and "Default: dropped when `attributes` is given." per `.claude/rules/typescript.md`, matching the probe's `dictionary.dataAbsent` reading.
- **Leaf order.** `elements`, `attributes`, `dataAttributes`, the standard's own order (brief § Deviation contract).
- **Remarks wording on the rollup.** `SanitizerConfig` `@remarks` states that TypeScript 6.0.3 declares the dictionary globally while the rollup's TypeScript 5.9.3 declares no sanitizer types, so the contract declares its own mirror. Measured: `node_modules/typescript/lib/lib.dom.d.ts` declares `interface SanitizerConfig` (around line 2640) and `declare var Sanitizer` (around line 34629); `node_modules/@microsoft/api-extractor/node_modules/typescript/lib/lib.dom.d.ts` contains no `Sanitizer` substring (`grep -c` returned 0). The exported module-scope interface shadows the 6.0.3 global inside the module, so no name clash arises; `check:src:browser` confirms it.
- **`SanitizeTargetInterface` remarks.** They name the platform `Sanitizer` interface once, in prose, as the reason the contract carries the dictionary. That hit is prose naming the platform's sanitizer, which criterion 3 permits. The example passes `{ sanitizer: { elements: ['b'] } }` as the brief fixes. The `@param options` text reads "The sanitizer configuration to parse it through."
- **`SetHTMLOptions`.** Its doc block and § Surface row stay unchanged: the HTML standard still names that options dictionary `SetHTMLOptions`, and neither TypeScript DOM library declares it (no `interface SetHTMLOptions` match in the 6.0.3 lib). The `sanitizer` leaf reads "Carries the configuration the markup is sanitized through. Default: the platform's safe baseline."
- **Guide § Methods.** The `SanitizeTargetInterface` method table is unchanged, because the `setHTML` description paragraph is unchanged.
- **Consumers.** `grep -rn "Sanitizer\b\|new Sanitizer\|SetHTMLOptions" src app tests --include=*.ts` outside `src/browser/types.ts` returned nothing, so no consumer changed (E6).

## Acceptance evidence

### Criterion 1 — `npm run build:src:browser` (exit 0)

```text
npm notice run @orkestrel/veneer@0.0.1 build:src:browser
npm notice run vite build --config configs/src/vite.browser.config.ts
vite v8.3.0 building client environment for production...
transforming...
✓ 9 modules transformed.
rendering chunks...
computing gzip size...
dist/src/browser/index.js  10.52 kB │ gzip: 3.41 kB │ map: 17.13 kB

✓ built in 70ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
build exit 0
```

The rolled-up `dist/src/browser/index.d.ts` carries `export declare interface SanitizerConfig` and `readonly sanitizer?: SanitizerConfig;`. The API Extractor notice about the bundled 5.9.3 compiler is informational and does not affect the exit code.

### Criterion 2 — typecheck, lint, format check

```text
npm notice run @orkestrel/veneer@0.0.1 check:src:browser
npm notice run tsc --noEmit -p configs/src/tsconfig.browser.json
check exit 0
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts
oxlint exit 0
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md
Checking formatting...

All matched files use the correct format.
Finished in 3953ms on 2 files using 16 threads.
oxfmt exit 0
```

### Criterion 3 — `grep -n "Sanitizer" src/browser/types.ts`

```text
400: * The HTML standard names this dictionary `SanitizerConfig`. The mirror carries only its `elements`,
405:export interface SanitizerConfig {
422:	readonly sanitizer?: SanitizerConfig
430: * before the tip content is written. The declaration rollup's compiler declares no platform `Sanitizer`
431: * interface, so the contract carries the `SanitizerConfig` dictionary rather than a sanitizer object.
```

Every hit is the `SanitizerConfig` declaration, its reference in `SetHTMLOptions.sanitizer`, or prose naming the dictionary (lines 400, 431) or the platform's `Sanitizer` interface (line 430). No line references a `Sanitizer` type or constructor.

### Criterion 4 — `npm run test:guides` (exit 0)

```text
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

···················

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  13:36:37
   Duration  921ms (transform 168ms, setup 64ms, import 666ms, tests 44ms, environment 0ms)

```

### Criterion 4 — `npm run test:policy` (exit 0)

```text
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

····································································································-·········

 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  13:36:39
   Duration  2.17s (transform 107ms, setup 61ms, import 246ms, tests 1.72s, environment 0ms)

```

### Observation — `npm run test:src:browser -- tests/src/browser/index.test.ts` (exit 0)

```text
npm notice run @orkestrel/veneer@0.0.1 test:src:browser
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/index.test.ts

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

··

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  13:36:42
   Duration  1.23s (transform 0ms, setup 143ms, import 11ms, tests 19ms, environment 0ms)

```

`tests/src/browser/index.test.ts` stays unmoved; the change is type-only.

## Unknown 1 — does oxfmt re-pad the § Surface table

No. Formatting a scratch copy of the edited guide changed only the added row, padding its Summary cell to the table's existing column width; every other row kept its padding. The single hunk oxfmt produced on the scratch copy follows, and the worktree carries the formatted row.

```diff
--- guides/veneer.md	2026-09-23 13:35:56.475492000 -0400
+++ C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/veneer.md	2026-09-23 13:36:10.266880900 -0400
@@ -61,7 +61,7 @@
 | `SwipeInterface`          | interface | Reports horizontal touch and pen swipes on a host through pointer events.                                                            |
 | `SanitizeAllowlist`       | type      | Maps each element name to the attributes sanitized tip markup keeps on it, mirroring Bootstrap's `allowList` option.                 |
 | `SanitizeOptions`         | interface | Configures how tip markup is sanitized before it is written.                                                                         |
-| `SanitizerConfig`         | interface | Mirrors the HTML standard's dictionary that lists the elements and attributes the platform sanitizer keeps. |
+| `SanitizerConfig`         | interface | Mirrors the HTML standard's dictionary that lists the elements and attributes the platform sanitizer keeps.                          |
 | `SetHTMLOptions`          | interface | Mirrors the WHATWG dictionary the platform's `setHTML` method reads its sanitizer from.                                              |
 | `SanitizeTargetInterface` | interface | Describes a node whose `setHTML` method parses markup through a sanitizer.                                                           |
 | `TipContent`              | type      | Describes the content of a tip slot: text, an element moved in, or a function of the trigger returning either.                       |
```

The same scratch pass over `src/browser/types.ts` produced no diff.

## Worktree state

`git status --short`:

```text
 M guides/veneer.md
 M src/browser/types.ts
```

`git diff --stat`:

```text
 guides/veneer.md     |  1 +
 src/browser/types.ts | 31 +++++++++++++++++++++++++------
 2 files changed, 26 insertions(+), 6 deletions(-)
```

Full diff:

```diff
diff --git a/guides/veneer.md b/guides/veneer.md
index 2dc34bd..bd498c6 100644
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -61,6 +61,7 @@ publishes the color-mode controller. The token values those names carry are in 
 | `SwipeInterface`          | interface | Reports horizontal touch and pen swipes on a host through pointer events.                                                            |
 | `SanitizeAllowlist`       | type      | Maps each element name to the attributes sanitized tip markup keeps on it, mirroring Bootstrap's `allowList` option.                 |
 | `SanitizeOptions`         | interface | Configures how tip markup is sanitized before it is written.                                                                         |
+| `SanitizerConfig`         | interface | Mirrors the HTML standard's dictionary that lists the elements and attributes the platform sanitizer keeps.                          |
 | `SetHTMLOptions`          | interface | Mirrors the WHATWG dictionary the platform's `setHTML` method reads its sanitizer from.                                              |
 | `SanitizeTargetInterface` | interface | Describes a node whose `setHTML` method parses markup through a sanitizer.                                                           |
 | `TipContent`              | type      | Describes the content of a tip slot: text, an element moved in, or a function of the trigger returning either.                       |
diff --git a/src/browser/types.ts b/src/browser/types.ts
index c6912ba..779fca0 100644
--- a/src/browser/types.ts
+++ b/src/browser/types.ts
@@ -393,6 +393,24 @@ export interface SanitizeOptions {
 	readonly filter?: (html: string) => string
 }
 
+/**
+ * Mirrors the HTML standard's dictionary that lists the elements and attributes the platform sanitizer keeps.
+ *
+ * @remarks
+ * The HTML standard names this dictionary `SanitizerConfig`. The mirror carries only its `elements`,
+ * `attributes`, and `dataAttributes` fields, the ones the tip sanitizer sets. TypeScript 6.0.3
+ * declares the dictionary globally, but the declaration rollup compiles with TypeScript 5.9.3, whose DOM
+ * library declares no sanitizer types, so the public contract declares its own mirror.
+ */
+export interface SanitizerConfig {
+	/** Lists the element names the sanitized markup keeps, mirroring the dictionary's `elements` field. */
+	readonly elements?: readonly string[]
+	/** Lists the attribute names every kept element keeps, mirroring the dictionary's `attributes` field. */
+	readonly attributes?: readonly string[]
+	/** If `true`, keeps every `data-*` attribute; if `false`, drops each one, mirroring the dictionary's `dataAttributes` field. Default: dropped when `attributes` is given. */
+	readonly dataAttributes?: boolean
+}
+
 /**
  * Mirrors the WHATWG dictionary the platform's `setHTML` method reads its sanitizer from.
  *
@@ -400,26 +418,27 @@ export interface SanitizeOptions {
  * The HTML standard gives the dictionary this name, and TypeScript's DOM library does not declare it.
  */
 export interface SetHTMLOptions {
-	/** Carries the sanitizer the markup is parsed through. Default: the platform's safe default sanitizer. */
-	readonly sanitizer?: Sanitizer
+	/** Carries the configuration the markup is sanitized through. Default: the platform's safe baseline. */
+	readonly sanitizer?: SanitizerConfig
 }
 
 /**
  * Describes a node whose `setHTML` method parses markup through a sanitizer.
  *
  * @remarks
- * The DOM library of TypeScript 6.0.3 declares `Sanitizer` and `setHTMLUnsafe` and omits `setHTML`,
- * so a guard narrows an element to this contract before the tip content is written.
+ * The DOM library of TypeScript 6.0.3 omits `setHTML`, so a guard narrows an element to this contract
+ * before the tip content is written. The declaration rollup's compiler declares no platform `Sanitizer`
+ * interface, so the contract carries the `SanitizerConfig` dictionary rather than a sanitizer object.
  */
 export interface SanitizeTargetInterface {
 	/**
 	 * Replaces the node's children with the markup the sanitizer keeps, mirroring the platform's `setHTML` method.
 	 *
 	 * @param html - The markup to parse.
-	 * @param options - The sanitizer to parse it through.
+	 * @param options - The sanitizer configuration to parse it through.
 	 * @example
 	 * ```ts
-	 * target.setHTML('<b>Saved</b>', { sanitizer: new Sanitizer() })
+	 * target.setHTML('<b>Saved</b>', { sanitizer: { elements: ['b'] } })
 	 * ```
 	 */
 	setHTML(html: string, options?: SetHTMLOptions): void
```

## Deviation state

None. No off-limits file changed, the rollup named no other symbol, and no shared-file patch is owed.
