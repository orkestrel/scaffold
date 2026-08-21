## Complete unelided VF diff

```diff
diff --git a/guides/scaffold.md b/guides/scaffold.md
--- a/guides/scaffold.md
+++ b/guides/scaffold.md
@@ -123,7 +123,9 @@ Exported from `@orkestrel/scaffold`, and reachable from
 | `MAX_NAME_LENGTH`                 | const | Maximum bare workspace name length.                                                              |
 | `MAX_PATH_LENGTH`                 | const | Maximum length of one path, matching the longest a supported filesystem accepts.                 |
 | `MAX_RANGE_LENGTH`                | const | Maximum length of one declared package range.                                                    |
+| `MAX_REGISTRY_BYTES`              | const | Maximum decoded bytes accepted from one registry response.                                       |
 | `MAX_TOTAL_ARTIFACT_BYTES`        | const | Maximum bytes retained across one whole plan or audit.                                           |
+| `MAX_TOTAL_REGISTRY_BYTES`        | const | Maximum decoded bytes accepted across one registry-reading call.                                 |
 | `MINIMUM_NODE_VERSION`            | const | The oldest Node version the generated toolchain supports.                                        |
 | `NAME_PATTERN`                    | const | The bare workspace name syntax: lowercase alphanumeric with hyphens, letter first.               |
 | `ORCHESTRATION_PATH_NAMES`        | const | The exact root filenames that wire an agent bench rather than the toolchain, frozen.             |
@@ -451,6 +453,7 @@ options
   --from <path>    read the data root from a local path instead of the bundled one; catalog alone accepts it more than once
   --target <path>  the directory the verb operates on; the working directory when absent
   --json           emit one machine-readable value instead of a report
+  ORKESTREL_SCAFFOLD_REGISTRY  the registry base mapped to upstream.registry.base
 
 exit codes
   0  clean
@@ -892,10 +895,12 @@ lookup verdict records why the registry row could not enter a layer.
 
 ## Dependency floors
 
-Every range scaffold declares, and every range it hands a generated workspace, is a floor: a caret
-over a whole `major.minor.patch` version. The triple is the newest release the registry served when
-that floor was last raised, so a workspace generated with no network still receives the latest floor
-scaffold knew rather than a bare `major.0.0`.
+Every scaffold-owned range from its dependency tables is a floor: a caret over a whole
+`major.minor.patch` version. The triple is the newest release the registry served when that floor
+was last raised, so a workspace generated with no network still receives the latest floor scaffold
+knew rather than a bare `major.0.0`. Caller extras and peers pass through unchanged. Extras follow
+`EXTRA_RANGE_PATTERN`; fleet peers follow `ORKESTREL_RANGE_PATTERN`; foreign peers follow
+`FLOOR_RANGE_PATTERN`.
 
 The floors live in scaffold's own `package.json`. `BASE_DEV_DEPENDENCIES` and the tables beside it
 derive each row scaffold installs from that manifest, and the self-pin from its `version` field, so
@@ -1116,10 +1121,10 @@ truncate the map, and falls back to the latest tag only when that tag is itself
 
 Each bound counts decoded bytes, and a version lookup asks the registry for the abbreviated
 packument — `dist-tags` and a trimmed version map, rather than the full per-version metadata no
-verdict reads. That is the smallest form the registry publishes, and `limit` is capped at
-`MAX_ARTIFACT_BYTES`, so a package with enough published releases to pass it cannot be looked up at
-all. It comes back as a `failed` verdict naming the limit, which is this reader's bound and not a
-statement about the package.
+verdict reads. That is the smallest form the registry publishes. The default response limit is
+`MAX_REGISTRY_BYTES`, and the default call budget is `MAX_TOTAL_REGISTRY_BYTES`. A package that
+passes the response limit comes back as a `failed` verdict naming the limit, which is this reader's
+bound and not a statement about the package.

diff --git a/src/bin/CLI.ts b/src/bin/CLI.ts
--- a/src/bin/CLI.ts
+++ b/src/bin/CLI.ts
@@ -47,6 +47,7 @@ import {
 	Compiler,
 	DEPENDENCY_NAME_PATTERN,
 	ENVIRONMENTS,
+	extractRangeMajor,
 	GROUPS,
 	GLOBAL_SETUP_PATH,
 	GUIDES_TEST_PATH,
@@ -258,13 +259,9 @@ export class CLI implements CLIInterface {
 		const blueprint = this.#derive(target)
 		const declared = manifestToPlannedDependencies(manifest, blueprint)
 		const releases = await this.#lookup(declared)
-		const served = await this.#lookup(
-			declared.filter((dependency) => !dependency.name.startsWith('@orkestrel/')),
-			true,
-		)
 		const questions = [
 			...this.#targetQuestions(target, blueprint),
-			...releasesToQuestions(releases, served),
+			...releasesToQuestions(releases),
 		]
 		const materializer = new Materializer(
 			command.from === undefined ? undefined : { host: command.from },
@@ -481,15 +478,22 @@ export class CLI implements CLIInterface {
 
 	// Measure each fleet row against the registry's newest release and each
 	// foreign row against the newest release its declared major admits.
-	async #lookup(declared: readonly Dependency[], unbounded = false): Promise<readonly Release[]> {
+	async #lookup(declared: readonly Dependency[]): Promise<readonly Release[]> {
 		if (declared.length === 0) return []
 		const upstream = new Upstream(this.#upstream)
 		try {
 			const releases = await upstream.lookup(
-				declared.map((dependency) => ({
-					name: dependency.name,
-					range: unbounded || dependency.name.startsWith('@orkestrel/') ? '*' : dependency.range,
-				})),
+				declared.map((dependency) => {
+					const major = extractRangeMajor(dependency.range)
+					return {
+						name: dependency.name,
+						range: dependency.name.startsWith('@orkestrel/')
+							? '*'
+							: major === undefined
+								? dependency.range
+								: `^${String(major)}`,
+					}
+				}),
 			)
 			return releases.map((release, index): Release => {
 				const dependency = declared[index]

diff --git a/src/bin/constants.ts b/src/bin/constants.ts
--- a/src/bin/constants.ts
+++ b/src/bin/constants.ts
@@ -122,6 +122,7 @@ export const OPTION_SUMMARY: Readonly<Record<string, string>> = Object.freeze({
 		'read the data root from a local path instead of the bundled one; catalog alone accepts it more than once',
 	'--target <path>': 'the directory the verb operates on; the working directory when absent',
 	'--json': 'emit one machine-readable value instead of a report',
+	ORKESTREL_SCAFFOLD_REGISTRY: 'the registry base mapped to upstream.registry.base',
 })

diff --git a/src/bin/helpers.ts b/src/bin/helpers.ts
--- a/src/bin/helpers.ts
+++ b/src/bin/helpers.ts
@@ -301,7 +301,7 @@ export function releasesToExit(releases: readonly Release[]): number {
  * Project foreign floor and supported-major drift into audit questions.
  *
  * @param releases - The release verdicts to measure.
- * @param served - The unbounded release verdicts used only to detect a newer served major.
+ * @param served - Alternate release verdicts used to detect a newer served major.
  * @returns One non-blocking question for each stale floor and each crossed major.
  */
 export function releasesToQuestions(
@@ -333,8 +333,10 @@ export function releasesToQuestions(
 				blocking: false,
 			})
 		}
-		const latest = served.find((candidate) => candidate.name === release.name)
-		const published = latest?.lookup === 'found' ? extractVersion(latest.latest)?.[0] : undefined
+		const alternate = served.find((candidate) => candidate.name === release.name)
+		const published =
+			release.major ??
+			(alternate?.lookup === 'found' ? extractVersion(alternate.latest)?.[0] : undefined)
 		if (declared !== undefined && published !== undefined && declared < published) {
 			questions.push({
 				field: 'dependencies',

diff --git a/src/core/compilers.ts b/src/core/compilers.ts
--- a/src/core/compilers.ts
+++ b/src/core/compilers.ts
@@ -12,7 +12,13 @@ import type {
 	Snapshot,
 	ViteMachinery,
 } from './types.js'
-import { attempt, canonicalStringify, compareValues, sortValues } from '@orkestrel/contract'
+import {
+	attempt,
+	canonicalStringify,
+	compareValues,
+	parseJSON,
+	sortValues,
+} from '@orkestrel/contract'
 import { fillTemplate } from '@orkestrel/template'
 import {
 	APP_BROWSER_DEV_DEPENDENCIES,
@@ -1452,15 +1458,16 @@ export function applyOverrides(
  *
  * @param manifest - The manifest text to compile.
  * @param dependencies - The declared names and replacement ranges.
- * @returns The manifest with every matching quoted value replaced, or
- * `undefined` when any name has no quoted declaration.
+ * @returns The manifest with every matching dependency-section value replaced,
+ * or `undefined` when any name has no quoted declaration in those sections.
  *
  * @remarks
  * The compiler replaces values in place instead of serializing the manifest,
  * so description, keywords, scripts, key order, indentation, and every byte
- * outside the named ranges survive. Every occurrence of a declared name moves,
- * which keeps duplicate declarations aligned across dependency sections until
- * the manifest's own validation reports the duplicate.
+ * outside the named ranges survive. Every occurrence in `dependencies`,
+ * `devDependencies`, and `peerDependencies` moves, which keeps duplicate
+ * declarations aligned until the manifest's own validation reports the
+ * duplicate. An override or resolution with the same name stays untouched.
  *
  * @example
  * ```ts
@@ -1475,50 +1482,148 @@ export function replaceManifestRanges(
 	manifest: string,
 	dependencies: readonly Dependency[],
 ): string | undefined {
-	let compiled = manifest
-	for (const dependency of dependencies) {
-		const key = JSON.stringify(dependency.name)
-		const range = JSON.stringify(dependency.range)
-		let index = compiled.indexOf(key)
-		let declared = false
-		while (index >= 0) {
-			let cursor = index + key.length
-			while (cursor < compiled.length && /\s/u.test(compiled.charAt(cursor))) cursor += 1
-			if (compiled.charAt(cursor) !== ':') {
-				index = compiled.indexOf(key, index + key.length)
+	if (dependencies.length === 0) return manifest
+	const sectionNames = new Set(['dependencies', 'devDependencies', 'peerDependencies'])
+	const sections: Array<{ start: number; end: number }> = []
+	let depth = 0
+	let cursor = 0
+	while (cursor < manifest.length) {
+		const character = manifest.charAt(cursor)
+		if (character === '{') {
+			depth += 1
+			cursor += 1
+			continue
+		}
+		if (character === '}') {
+			depth -= 1
+			cursor += 1
+			continue
+		}
+		if (character !== '"') {
+			cursor += 1
+			continue
+		}
+		const start = cursor
+		cursor += 1
+		while (cursor < manifest.length) {
+			if (manifest.charAt(cursor) === '\\') {
+				cursor += 2
 				continue
 			}
+			if (manifest.charAt(cursor) === '"') break
 			cursor += 1
-			while (cursor < compiled.length && /\s/u.test(compiled.charAt(cursor))) cursor += 1
-			if (compiled.charAt(cursor) !== '"') {
-				index = compiled.indexOf(key, index + key.length)
+		}
+		if (cursor >= manifest.length) return undefined
+		const end = cursor + 1
+		if (depth === 1) {
+			const key: unknown = parseJSON(manifest.slice(start, end))
+			let value = end
+			while (value < manifest.length && /\s/u.test(manifest.charAt(value))) value += 1
+			if (manifest.charAt(value) === ':') {
+				value += 1
+				while (value < manifest.length && /\s/u.test(manifest.charAt(value))) value += 1
+				if (typeof key === 'string' && sectionNames.has(key) && manifest.charAt(value) === '{') {
+					let sectionDepth = 0
+					let sectionCursor = value
+					while (sectionCursor < manifest.length) {
+						const sectionCharacter = manifest.charAt(sectionCursor)
+						if (sectionCharacter === '"') {
+							sectionCursor += 1
+							while (sectionCursor < manifest.length) {
+								if (manifest.charAt(sectionCursor) === '\\') {
+									sectionCursor += 2
+									continue
+								}
+								if (manifest.charAt(sectionCursor) === '"') break
+								sectionCursor += 1
+							}
+							if (sectionCursor >= manifest.length) return undefined
+						} else if (sectionCharacter === '{') sectionDepth += 1
+						else if (sectionCharacter === '}') {
+							sectionDepth -= 1
+							if (sectionDepth === 0) {
+								sections.push({ start: value, end: sectionCursor + 1 })
+								break
+							}
+						}
+						sectionCursor += 1
+					}
+				}
+			}
+		}
+		cursor = end
+	}
+	const replacements = new Map(dependencies.map(({ name, range }) => [name, range]))
+	const declared = new Set<string>()
+	let compiled = manifest
+	for (const bounds of sections.reverse()) {
+		let section = compiled.slice(bounds.start, bounds.end)
+		let sectionDepth = 0
+		let sectionCursor = 0
+		while (sectionCursor < section.length) {
+			const character = section.charAt(sectionCursor)
+			if (character === '{') {
+				sectionDepth += 1
+				sectionCursor += 1
 				continue
 			}
-			const start = cursor
-			cursor += 1
-			let end: number | undefined
-			while (cursor < compiled.length) {
-				if (compiled.charAt(cursor) === '\\') {
-					cursor += 2
+			if (character === '}') {
+				sectionDepth -= 1
+				sectionCursor += 1
+				continue
+			}
+			if (character !== '"') {
+				sectionCursor += 1
+				continue
+			}
+			const keyStart = sectionCursor
+			sectionCursor += 1
+			while (sectionCursor < section.length) {
+				if (section.charAt(sectionCursor) === '\\') {
+					sectionCursor += 2
 					continue
 				}
-				if (compiled.charAt(cursor) === '"') {
-					end = cursor + 1
-					break
-				}
-				cursor += 1
+				if (section.charAt(sectionCursor) === '"') break
+				sectionCursor += 1
+			}
+			if (sectionCursor >= section.length) return undefined
+			const keyEnd = sectionCursor + 1
+			const key: unknown = parseJSON(section.slice(keyStart, keyEnd))
+			let valueStart = keyEnd
+			while (valueStart < section.length && /\s/u.test(section.charAt(valueStart))) valueStart += 1
+			if (sectionDepth !== 1 || section.charAt(valueStart) !== ':') {
+				sectionCursor = keyEnd
+				continue
+			}
+			valueStart += 1
+			while (valueStart < section.length && /\s/u.test(section.charAt(valueStart))) valueStart += 1
+			if (typeof key !== 'string' || section.charAt(valueStart) !== '"') {
+				sectionCursor = keyEnd
+				continue
 			}
-			if (end === undefined) {
-				index = compiled.indexOf(key, index + key.length)
+			const replacement = replacements.get(key)
+			if (replacement === undefined) {
+				sectionCursor = keyEnd
 				continue
 			}
-			compiled = compiled.slice(0, start) + range + compiled.slice(end)
-			declared = true
-			index = compiled.indexOf(key, start + range.length)
+			let valueEnd = valueStart + 1
+			while (valueEnd < section.length) {
+				if (section.charAt(valueEnd) === '\\') {
+					valueEnd += 2
+					continue
+				}
+				if (section.charAt(valueEnd) === '"') break
+				valueEnd += 1
+			}
+			if (valueEnd >= section.length) return undefined
+			const range = JSON.stringify(replacement)
+			section = section.slice(0, valueStart) + range + section.slice(valueEnd + 1)
+			declared.add(key)
+			sectionCursor = valueStart + range.length
 		}
-		if (!declared) return undefined
+		compiled = compiled.slice(0, bounds.start) + section + compiled.slice(bounds.end)
 	}
-	return compiled
+	return dependencies.every(({ name }) => declared.has(name)) ? compiled : undefined
 }

diff --git a/src/core/constants.ts b/src/core/constants.ts
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -354,6 +354,26 @@ export const MAX_ARTIFACT_BYTES = 5_242_880
 /** Maximum length of the hexadecimal string carrying one artifact's bytes. */
 export const MAX_ARTIFACT_HEX_LENGTH = MAX_ARTIFACT_BYTES * 2
 
+/**
+ * Maximum decoded bytes accepted from one registry response.
+ *
+ * @remarks
+ * The 2026-08-21 abbreviated-packument measurements were 8,647,138 bytes for
+ * TypeScript, 8,077,438 for Playwright, 2,315,360 for `@types/node`, 2,298,256
+ * for Vite, and 1,272,652 for Vitest. The bound leaves headroom above those
+ * registry answers.
+ */
+export const MAX_REGISTRY_BYTES = 33_554_432
+
+/**
+ * Maximum decoded bytes accepted across one registry-reading call.
+ *
+ * @remarks
+ * The 2026-08-21 browser-workspace registry set measured about 24 MiB. The
+ * bound leaves headroom for that set to grow without making a call unbounded.
+ */
+export const MAX_TOTAL_REGISTRY_BYTES = 100_663_296
+
 /** Maximum bytes accepted for one package or vendored-host manifest. */
 export const MAX_MANIFEST_BYTES = 1_048_576

diff --git a/src/core/types.ts b/src/core/types.ts
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -217,12 +217,10 @@ export type CatalogEntry =
  * One declared dependency range measured against a registry release.
  *
  * @remarks
- * A found lookup carries the newest version upstream selected under `range`;
- * one that produced no answer carries the cause and no version. Whether the
- * declared range already admits that version is not recorded, because it is a
- * deterministic function of `range` and `latest`: a stored answer could only
- * disagree with the fields beside it. One centralized helper decides it, and
- * every caller reads the same decision.
+ * `range` is the declared range, and `latest` is the version the producer
+ * selected. A found lookup carries that selected version; one that produced no
+ * answer carries the cause and no selected version. `major`, when present, is
+ * the stable major named by the registry's latest tag in the same answer.
  */
 export type Release =
 	| {
@@ -230,6 +228,7 @@ export type Release =
 			readonly range: string
 			readonly lookup: 'found'
 			readonly latest: string
+			readonly major?: number
 			readonly note?: never
 	  }
 	| {
@@ -237,6 +236,7 @@ export type Release =
 			readonly range: string
 			readonly lookup: 'missing' | 'failed'
 			readonly note: string
+			readonly major?: number
 			readonly latest?: never
 	  }

diff --git a/src/server/Materializer.ts b/src/server/Materializer.ts
--- a/src/server/Materializer.ts
+++ b/src/server/Materializer.ts
@@ -352,7 +352,7 @@ export class Materializer implements MaterializerInterface {
 	}
 
 	/**
-	 * Rewrite the `@orkestrel/*` range set in the target's manifest.
+	 * Rewrite the declared dependency ranges the caller names in the target's manifest.
 	 *
 	 * @param dependencies - The names and ranges the manifest must declare.
 	 * @param target - The directory to write into.

diff --git a/src/server/Upstream.ts b/src/server/Upstream.ts
--- a/src/server/Upstream.ts
+++ b/src/server/Upstream.ts
@@ -21,10 +21,11 @@ import {
 	isCollection,
 	isDependencyName,
 	isSnapshot,
-	MAX_ARTIFACT_BYTES,
 	MAX_COLLECTION_ITEMS,
 	MAX_DEPENDENCY_NAME_LENGTH,
+	MAX_REGISTRY_BYTES,
 	MAX_RANGE_LENGTH,
+	MAX_TOTAL_REGISTRY_BYTES,
 	matchesRange,
 	nameToGuide,
 	ScaffoldError,
@@ -80,7 +81,6 @@ export class Upstream implements UpstreamInterface {
 	static readonly #defaultTimeout = 10_000
 	static readonly #defaultConcurrency = 6
 	static readonly #defaultRetries = 0
-	static readonly #defaultBudget = 16_777_216
 	static readonly #scope = 'orkestrel'
 	static readonly #unreadable = 'the answer carries no readable latest version'
 	// The media type that selects the registry's abbreviated packument. It sits
@@ -142,8 +142,8 @@ export class Upstream implements UpstreamInterface {
 		this.#registryTimeout = options?.registry?.timeout ?? Upstream.#defaultTimeout
 		this.#concurrency = options?.concurrency ?? Upstream.#defaultConcurrency
 		this.#retries = options?.retries ?? Upstream.#defaultRetries
-		this.#limit = options?.limit ?? MAX_ARTIFACT_BYTES
-		this.#budget = options?.budget ?? Upstream.#defaultBudget
+		this.#limit = options?.limit ?? MAX_REGISTRY_BYTES
+		this.#budget = options?.budget ?? MAX_TOTAL_REGISTRY_BYTES
 	}
@@ -152,7 +152,7 @@ export class Upstream implements UpstreamInterface {
 	}
 
 	/**
-	 * Look up the registry's latest release for each declared dependency.
+	 * Look up the newest release each declared range admits.
@@ -161,10 +161,11 @@ export class Upstream implements UpstreamInterface {
 	 * torn down before or during the call.
 	 *
 	 * @remarks
-	 * Whether the declared range already admits the reported version is not
-	 * decided here and is not stored on the verdict: it is a function of the
-	 * `range` and `latest` sitting beside each other, and one centralized helper
-	 * answers it for every caller.
+	 * The reader selects across the packument's stable version map before any
+	 * collection bound can truncate it. It falls back to `dist-tags.latest` only
+	 * when that version satisfies the declared range. `*` requests the newest
+	 * stable version outright. The verdict's `major` field carries the stable
+	 * major from the latest tag when that tag can be read.
@@ -325,6 +326,8 @@ export class Upstream implements UpstreamInterface {
 			outcome.lookup === 'found'
 				? this.#releaseVersion(outcome.content, dependency.range)
 				: undefined
+		const tagged = outcome.lookup === 'found' ? this.#latest(outcome.content) : undefined
+		const major = tagged === undefined ? undefined : extractVersion(tagged)?.[0]
 		const release: Release =
 			latest === undefined
 				? {
@@ -332,8 +335,15 @@ export class Upstream implements UpstreamInterface {
 						range: dependency.range,
 						lookup: outcome.lookup === 'missing' ? 'missing' : 'failed',
 						note: outcome.lookup === 'found' ? Upstream.#unreadable : outcome.note,
+						...(major === undefined ? {} : { major }),
+					}
+				: {
+						name: dependency.name,
+						range: dependency.range,
+						lookup: 'found',
+						latest,
+						...(major === undefined ? {} : { major }),
 					}
-				: { name: dependency.name, range: dependency.range, lookup: 'found', latest }
 		this.#emitter.emit('release', release)
 		return release
@@ -484,7 +494,7 @@ export class Upstream implements UpstreamInterface {
 	}
 
 	// `matchesRange` owns full-version declarations. The registry reader adds the
-	// unbounded request form and canonical major carets used by foreign tooling.
+	// unbounded request form and tolerates a bare major caret a consumer may declare.
 	#admits(range: string, version: string): boolean {

diff --git a/src/server/types.ts b/src/server/types.ts
--- a/src/server/types.ts
+++ b/src/server/types.ts
@@ -196,7 +196,7 @@ export interface MaterializerInterface {
 	 */
 	catalog(entries: readonly CatalogEntry[], target: string): MaterializeResult
 	/**
-	 * Rewrite the `@orkestrel/*` range set in the target's manifest.
+	 * Rewrite the declared dependency ranges the caller names in the target's manifest.
@@ -303,7 +303,7 @@ export interface UpstreamOptions {
 export interface UpstreamInterface {
 	readonly emitter: EmitterInterface<UpstreamEventMap>
 	/**
-	 * Look up the registry's latest release for each declared dependency.
+	 * Look up the newest release each declared range admits.

diff --git a/tests/src/bin/CLI.test.ts b/tests/src/bin/CLI.test.ts
--- a/tests/src/bin/CLI.test.ts
+++ b/tests/src/bin/CLI.test.ts
@@ -18,7 +18,10 @@ import {
 	blueprintToScripts,
 	CATALOG_AGENT_PATH,
 	createBlueprint,
+	DECLARATION_DEV_DEPENDENCIES,
 	GROUPS,
+	SHOWCASE_DEV_DEPENDENCIES,
+	SOURCE_BROWSER_DEV_DEPENDENCIES,
 } from '@src/core'
@@ -81,14 +84,38 @@ const FLEET_RELEASE_REPLIES: Readonly<Record<string, TestUpstreamReply>> = Objec
 	[FLEET_UPSTREAM_PATHS.packages.probe]: { status: 200, body: buildPackument('0.0.2') },
 	[FLEET_UPSTREAM_PATHS.packages.scaffold]: { status: 200, body: buildPackument('0.0.47') },
 	[FLEET_UPSTREAM_PATHS.packages.test]: { status: 200, body: buildPackument('0.0.8') },
-	'/@microsoft%2Fapi-extractor': { status: 200, body: buildPackument('7.59.0') },
-	'/@types%2Fnode': { status: 200, body: buildPackument('26.2.0') },
-	'/oxfmt': { status: 200, body: buildPackument('0.64.0') },
-	'/oxlint': { status: 200, body: buildPackument('1.79.0') },
-	'/typescript': { status: 200, body: buildPackument('6.0.3') },
-	'/vite': { status: 200, body: buildPackument('8.2.2') },
-	'/vite-plugin-dts': { status: 200, body: buildPackument('5.0.3') },
-	'/vitest': { status: 200, body: buildPackument('4.1.11') },
+	'/@microsoft%2Fapi-extractor': {
+		status: 200,
+		body: buildPackument(DECLARATION_DEV_DEPENDENCIES['@microsoft/api-extractor']?.slice(1) ?? ''),
+	},
+	'/@types%2Fnode': {
+		status: 200,
+		body: buildPackument(BASE_DEV_DEPENDENCIES['@types/node']?.slice(1) ?? ''),
+	},
+	'/oxfmt': {
+		status: 200,
+		body: buildPackument(BASE_DEV_DEPENDENCIES.oxfmt?.slice(1) ?? ''),
+	},
+	'/oxlint': {
+		status: 200,
+		body: buildPackument(BASE_DEV_DEPENDENCIES.oxlint?.slice(1) ?? ''),
+	},
+	'/typescript': {
+		status: 200,
+		body: buildPackument(BASE_DEV_DEPENDENCIES.typescript?.slice(1) ?? ''),
+	},
+	'/vite': {
+		status: 200,
+		body: buildPackument(BASE_DEV_DEPENDENCIES.vite?.slice(1) ?? ''),
+	},
+	'/vite-plugin-dts': {
+		status: 200,
+		body: buildPackument(DECLARATION_DEV_DEPENDENCIES['vite-plugin-dts']?.slice(1) ?? ''),
+	},
+	'/vitest': {
+		status: 200,
+		body: buildPackument(BASE_DEV_DEPENDENCIES.vitest?.slice(1) ?? ''),
+	},
 })
@@ -130,20 +157,64 @@ const AUDIT_REGISTRY = await createUpstreamServer({
 	'/@orkestrel%2Fscaffold': { status: 200, body: buildPackument('0.0.47') },
 	'/@orkestrel%2Fserver': { status: 200, body: buildPackument('0.0.14') },
 	'/@orkestrel%2Ftest': { status: 200, body: buildPackument('0.0.8') },
-	'/@microsoft%2Fapi-extractor': { status: 200, body: buildPackument('7.59.0') },
-	'/@types%2Fnode': { status: 200, body: buildPackument('26.2.0') },
-	'/@vitejs%2Fplugin-vue': { status: 200, body: buildPackument('6.0.8') },
-	'/@vitest%2Fbrowser-playwright': { status: 200, body: buildPackument('4.1.11') },
-	'/oxfmt': { status: 200, body: buildPackument('0.64.0') },
-	'/oxlint': { status: 200, body: buildPackument('1.79.0') },
-	'/playwright': { status: 200, body: buildPackument('1.62.1') },
-	'/typescript': { status: 200, body: buildPackument('6.0.3') },
-	'/vite': { status: 200, body: buildPackument('8.2.2') },
-	'/vite-plugin-dts': { status: 200, body: buildPackument('5.0.3') },
-	'/vite-plugin-singlefile': { status: 200, body: buildPackument('2.3.3') },
-	'/vitest': { status: 200, body: buildPackument('4.1.11') },
-	'/vue': { status: 200, body: buildPackument('3.5.40') },
-	'/vue-tsc': { status: 200, body: buildPackument('3.3.7') },
+	'/@microsoft%2Fapi-extractor': {
+		status: 200,
+		body: buildPackument(DECLARATION_DEV_DEPENDENCIES['@microsoft/api-extractor']?.slice(1) ?? ''),
+	},
+	'/@types%2Fnode': {
+		status: 200,
+		body: buildPackument(BASE_DEV_DEPENDENCIES['@types/node']?.slice(1) ?? ''),
+	},
+	'/@vitejs%2Fplugin-vue': {
+		status: 200,
+		body: buildPackument(APP_BROWSER_DEV_DEPENDENCIES['@vitejs/plugin-vue']?.slice(1) ?? ''),
+	},
+	'/@vitest%2Fbrowser-playwright': {
+		status: 200,
+		body: buildPackument(
+			SOURCE_BROWSER_DEV_DEPENDENCIES['@vitest/browser-playwright']?.slice(1) ?? '',
+		),
+	},
+	'/oxfmt': {
+		status: 200,
+		body: buildPackument(BASE_DEV_DEPENDENCIES.oxfmt?.slice(1) ?? ''),
+	},
+	'/oxlint': {
+		status: 200,
+		body: buildPackument(BASE_DEV_DEPENDENCIES.oxlint?.slice(1) ?? ''),
+	},
+	'/playwright': {
+		status: 200,
+		body: buildPackument(SOURCE_BROWSER_DEV_DEPENDENCIES.playwright?.slice(1) ?? ''),
+	},
+	'/typescript': {
+		status: 200,
+		body: buildPackument(BASE_DEV_DEPENDENCIES.typescript?.slice(1) ?? ''),
+	},
+	'/vite': {
+		status: 200,
+		body: buildPackument(BASE_DEV_DEPENDENCIES.vite?.slice(1) ?? ''),
+	},
+	'/vite-plugin-dts': {
+		status: 200,
+		body: buildPackument(DECLARATION_DEV_DEPENDENCIES['vite-plugin-dts']?.slice(1) ?? ''),
+	},
+	'/vite-plugin-singlefile': {
+		status: 200,
+		body: buildPackument(SHOWCASE_DEV_DEPENDENCIES['vite-plugin-singlefile']?.slice(1) ?? ''),
+	},
+	'/vitest': {
+		status: 200,
+		body: buildPackument(BASE_DEV_DEPENDENCIES.vitest?.slice(1) ?? ''),
+	},
+	'/vue': {
+		status: 200,
+		body: buildPackument(APP_BROWSER_DEV_DEPENDENCIES.vue?.slice(1) ?? ''),
+	},
+	'/vue-tsc': {
+		status: 200,
+		body: buildPackument(APP_BROWSER_DEV_DEPENDENCIES['vue-tsc']?.slice(1) ?? ''),
+	},
 })
@@ -825,7 +896,9 @@ describe('CLI audit', () => {
 				range: '^6.0.3',
 				lookup: 'found',
 				latest: '6.0.4',
+				major: 7,
 			})
+			expect(server.paths.filter((path) => path === '/typescript')).toHaveLength(1)
@@ -833,6 +906,44 @@ describe('CLI audit', () => {
 	})
 
+	it('reports a major-zero floor below the newest stable release in that major', async () => {
+		const workspace = createWorkspace()
+		const server = await createUpstreamServer({
+			...FLEET_RELEASE_REPLIES,
+			'/oxfmt': {
+				status: 200,
+				body: JSON.stringify({
+					'dist-tags': { latest: '0.65.0' },
+					versions: { '0.64.9': {}, '0.65.0': {} },
+				}),
+			},
+		})
+		try {
+			const fleet = createFleet(workspace)
+			workspace.write('target/package.json', buildTargetManifest())
+			const sink = createSink()
+			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
+				'audit',
+				'--from',
+				fleet.host,
+				'--target',
+				fleet.target,
+				'--json',
+			])
+			expect(code).toBe(EXIT_DRIFT)
+			const result: AuditResult = JSON.parse(sink.output[0] ?? '')
+			expect(result.questions).toContainEqual({
+				field: 'dependencies',
+				message:
+					'oxfmt declares the floor ^0.64.0, while the registry serves 0.65.0 within major 0.',
+				blocking: false,
+			})
+		} finally {
+			await server.destroy()
+			workspace.destroy()
+		}
+	})
+
@@ -2375,6 +2486,38 @@ describe('CLI audit', () => {
 })
 
 describe('CLI repair', () => {
+	it('raises a major-zero floor to the newest stable release in its declared major', async () => {
+		const workspace = createWorkspace()
+		const server = await createUpstreamServer({
+			...FLEET_RELEASE_REPLIES,
+			'/oxfmt': {
+				status: 200,
+				body: JSON.stringify({
+					'dist-tags': { latest: '0.65.0' },
+					versions: { '0.64.9': {}, '0.65.0': {} },
+				}),
+			},
+		})
+		try {
+			const fleet = createFleet(workspace)
+			workspace.write('target/package.json', buildTargetManifest())
+			const sink = createSink()
+			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
+				'repair',
+				'--from',
+				fleet.host,
+				'--target',
+				fleet.target,
+				'--json',
+			])
+			expect(code).toBe(EXIT_CLEAN)
+			expect(workspace.read('target/package.json')).toContain('"oxfmt": "^0.65.0"')
+		} finally {
+			await server.destroy()
+			workspace.destroy()
+		}
+	})
+
@@ -3126,36 +3269,42 @@ describe('CLI overwrite', () => {
 				range: '^0.0.5',
 				lookup: 'found',
 				latest: '0.0.6',
+				major: 0,
 			})
 			expect(result.releases).toContainEqual({
 				name: '@orkestrel/guide',
 				range: '^0.0.9',
 				lookup: 'found',
 				latest: '0.1.0',
+				major: 0,
 			})
 			expect(result.releases).toContainEqual({
 				name: '@orkestrel/probe',
 				range: pinnedProbe,
 				lookup: 'found',
 				latest: published,
+				major: 9,
 			})
 			expect(result.releases).toContainEqual({
 				name: '@orkestrel/scaffold',
 				range: pinnedScaffold,
 				lookup: 'found',
 				latest: published,
+				major: 9,
 			})
 			expect(result.releases).toContainEqual({
 				name: '@orkestrel/test',
 				range: pinnedTest,
 				lookup: 'found',
 				latest: published,
+				major: 9,
 			})
 			expect(result.releases).toContainEqual({
 				name: 'vite',
 				range: '~8.2.0',
 				lookup: 'found',
 				latest: '8.2.2',
+				major: 8,
 			})

diff --git a/tests/src/bin/main.test.ts b/tests/src/bin/main.test.ts
--- a/tests/src/bin/main.test.ts
+++ b/tests/src/bin/main.test.ts
@@ -5,6 +5,7 @@ import { spawn, spawnSync } from 'node:child_process'
 import { existsSync } from 'node:fs'
 import { resolve } from 'node:path'
 import { EXIT_CLEAN, EXIT_DRIFT } from '../../../src/bin/constants.js'
+import { BASE_DEV_DEPENDENCIES, DECLARATION_DEV_DEPENDENCIES } from '@src/core'
@@ -74,11 +75,28 @@ describe('scaffold', () => {
 			'/@orkestrel%2Fprobe': { status: 200, body: buildPackument('0.0.2') },
 			'/@orkestrel%2Fscaffold': { status: 200, body: buildPackument('0.0.47') },
 			'/@orkestrel%2Ftest': { status: 200, body: buildPackument('0.0.8') },
-			'/@microsoft%2Fapi-extractor': { status: 200, body: buildPackument('7.59.0') },
-			'/@types%2Fnode': { status: 200, body: buildPackument('26.2.0') },
-			'/oxfmt': { status: 200, body: buildPackument('0.64.0') },
-			'/oxlint': { status: 200, body: buildPackument('1.79.0') },
-			'/typescript': { status: 200, body: buildPackument('6.0.3') },
+			'/@microsoft%2Fapi-extractor': {
+				status: 200,
+				body: buildPackument(
+					DECLARATION_DEV_DEPENDENCIES['@microsoft/api-extractor']?.slice(1) ?? '',
+				),
+			},
+			'/@types%2Fnode': {
+				status: 200,
+				body: buildPackument(BASE_DEV_DEPENDENCIES['@types/node']?.slice(1) ?? ''),
+			},
+			'/oxfmt': {
+				status: 200,
+				body: buildPackument(BASE_DEV_DEPENDENCIES.oxfmt?.slice(1) ?? ''),
+			},
+			'/oxlint': {
+				status: 200,
+				body: buildPackument(BASE_DEV_DEPENDENCIES.oxlint?.slice(1) ?? ''),
+			},
+			'/typescript': {
+				status: 200,
+				body: buildPackument(BASE_DEV_DEPENDENCIES.typescript?.slice(1) ?? ''),
+			},
@@ -86,8 +104,14 @@ describe('scaffold', () => {
 					versions: { '8.2.0': {}, '8.2.3': {}, '9.0.0': {} },
 				}),
 			},
-			'/vite-plugin-dts': { status: 200, body: buildPackument('5.0.3') },
-			'/vitest': { status: 200, body: buildPackument('4.1.11') },
+			'/vite-plugin-dts': {
+				status: 200,
+				body: buildPackument(DECLARATION_DEV_DEPENDENCIES['vite-plugin-dts']?.slice(1) ?? ''),
+			},
+			'/vitest': {
+				status: 200,
+				body: buildPackument(BASE_DEV_DEPENDENCIES.vitest?.slice(1) ?? ''),
+			},

diff --git a/tests/src/core/compilers.test.ts b/tests/src/core/compilers.test.ts
--- a/tests/src/core/compilers.test.ts
+++ b/tests/src/core/compilers.test.ts
@@ -20,6 +20,7 @@ import {
 	FLOOR_RANGE_PATTERN,
 	isFinding,
 	ORKESTREL_RANGE_PATTERN,
+	replaceManifestRanges,
 } from '@src/core'
@@ -66,6 +67,38 @@ describe('ORKESTREL_RANGE_PATTERN', () => {
 	})
 })
 
+describe('replaceManifestRanges', () => {
+	it('rewrites dependency sections without changing overrides or resolutions', () => {
+		const manifest = `{
+	"dependencies": {
+		"typescript": "^6.0.3"
+	},
+	"devDependencies": {
+		"typescript": "^6.0.3"
+	},
+	"peerDependencies": {
+		"typescript": ">=6.0.0"
+	},
+	"overrides": {
+		"typescript": "6.0.3"
+	},
+	"resolutions": {
+		"typescript": "6.0.2"
+	}
+}
+`
+		const replaced = replaceManifestRanges(manifest, [{ name: 'typescript', range: '^6.0.4' }])
+		expect(replaced).toBe(
+			manifest
+				.replace('"typescript": "^6.0.3"', '"typescript": "^6.0.4"')
+				.replace('"typescript": "^6.0.3"', '"typescript": "^6.0.4"')
+				.replace('"typescript": ">=6.0.0"', '"typescript": "^6.0.4"'),
+		)
+		expect(replaced).toContain('"overrides": {\n\t\t"typescript": "6.0.3"')
+		expect(replaced).toContain('"resolutions": {\n\t\t"typescript": "6.0.2"')
+	})
+})
+
diff --git a/tests/src/core/constants.test.ts b/tests/src/core/constants.test.ts
--- a/tests/src/core/constants.test.ts
+++ b/tests/src/core/constants.test.ts
@@ -10,6 +10,8 @@ import {
 	blueprintToDevDependencies,
 	DECLARATION_DEV_DEPENDENCIES,
 	extractRangeMajor,
+	MAX_REGISTRY_BYTES,
+	MAX_TOTAL_REGISTRY_BYTES,
 	matchesRange,
@@ -110,6 +112,20 @@ describe('shared dependency tables', () => {
 		expect(selectSeededNames()).not.toContain('@orkestrel/guide')
 	})
 
+	it('derives every manifest-backed row from the manifest entry of the same name', () => {
+		const declared = readManifestRanges()
+		const mismatched: string[] = []
+		for (const [label, table] of TABLES) {
+			for (const [name, range] of Object.entries(table)) {
+				const expected = declared[name]
+				if (expected !== undefined && range !== expected) {
+					mismatched.push(`${label} ${name}: ${range}, manifest ${expected}`)
+				}
+			}
+		}
+		expect(mismatched).toStrictEqual([])
+	})
+
@@ -171,3 +187,12 @@ describe('shared dependency tables', () => {
 	})
 })
+
+describe('registry read bounds', () => {
+	it('leave the measured registry packuments and browser workspace set inside their bounds', () => {
+		expect(MAX_REGISTRY_BYTES).toBe(32 * 1_024 * 1_024)
+		expect(MAX_REGISTRY_BYTES).toBeGreaterThan(8_647_138)
+		expect(MAX_TOTAL_REGISTRY_BYTES).toBe(96 * 1_024 * 1_024)
+		expect(MAX_TOTAL_REGISTRY_BYTES).toBeGreaterThan(24 * 1_024 * 1_024)
+	})
+})

diff --git a/tests/src/server/Upstream.test.ts b/tests/src/server/Upstream.test.ts
--- a/tests/src/server/Upstream.test.ts
+++ b/tests/src/server/Upstream.test.ts
@@ -1,6 +1,6 @@
 import type { Mirror, Release } from '@src/core'
 import { gzipSync } from 'node:zlib'
-import { contentToHex, MAX_COLLECTION_ITEMS } from '@src/core'
+import { contentToHex, MAX_ARTIFACT_BYTES, MAX_COLLECTION_ITEMS } from '@src/core'
@@ -185,8 +185,20 @@ describe('Upstream lookup', () => {
 			])
 			expect(releases).toStrictEqual([
-				{ name: '@orkestrel/router', range: '^0.0.8', lookup: 'found', latest: '0.0.8' },
-				{ name: '@orkestrel/emitter', range: '^0.0.5', lookup: 'found', latest: '0.0.5' },
+				{
+					name: '@orkestrel/router',
+					range: '^0.0.8',
+					lookup: 'found',
+					latest: '0.0.8',
+					major: 0,
+				},
+				{
+					name: '@orkestrel/emitter',
+					range: '^0.0.5',
+					lookup: 'found',
+					latest: '0.0.5',
+					major: 0,
+				},
 			])
@@ -716,6 +728,29 @@ describe('Upstream catalog', () => {
 })
 
 describe('Upstream bounds', () => {
+	it('reads an abbreviated packument larger than the artifact limit by default', async () => {
+		const body = JSON.stringify({
+			'dist-tags': { latest: '1.0.0' },
+			versions: { '1.0.0': {} },
+			padding: 'x'.repeat(MAX_ARTIFACT_BYTES),
+		})
+		expect(Buffer.byteLength(body)).toBeGreaterThan(MAX_ARTIFACT_BYTES)
+		const server = await createUpstreamServer({
+			[UPSTREAM_PATHS.router]: { status: 200, body },
+		})
+		const upstream = new Upstream({ registry: { base: server.base } })
+		try {
+			const [release] = await upstream.lookup([
+				buildDependency({ name: '@orkestrel/router', range: '*' }),
+			])
+			expect(release?.lookup).toBe('found')
+			expect(release?.latest).toBe('1.0.0')
+		} finally {
+			upstream.destroy()
+			await server.destroy()
+		}
+	})
+
```

## Status boundary

Before, exit `0`:

```text
 M .claude/rules/workspace.md
 M guides/scaffold.md
MM package-lock.json
 M package.json
 M src/bin/CLI.ts
 M src/bin/helpers.ts
 M src/bin/main.ts
 M src/bin/types.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/server/Materializer.ts
 M src/server/Upstream.ts
 M tests/distribution.test.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/bin/helpers.test.ts
 M tests/src/bin/main.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/constants.test.ts
 M tests/src/core/fixtures/setup-false-manifest.txt
 M tests/src/core/helpers.test.ts
 M tests/src/server/Materializer.test.ts
 M tests/src/server/Upstream.test.ts
?? .orkestrel/campaign/audit-v12-verdict.md
?? .orkestrel/campaign/audit-v3-verdict.md
?? .orkestrel/campaign/design-versions-brief-amendment1.md
?? .orkestrel/campaign/design-versions-brief-amendment2.md
?? .orkestrel/campaign/design-versions-brief.md
?? .orkestrel/campaign/design-versions-objective-report.md
?? .orkestrel/campaign/design-versions-reconciliation.md
?? .orkestrel/campaign/design-versions-subjective-report.md
?? .orkestrel/campaign/unit-v1-brief.md
?? .orkestrel/campaign/unit-v1-report.md
?? .orkestrel/campaign/unit-v2-brief-amendment1.md
?? .orkestrel/campaign/unit-v2-brief.md
?? .orkestrel/campaign/unit-v2-deviation.md
?? .orkestrel/campaign/unit-v2-report.md
?? .orkestrel/campaign/unit-v3-brief.md
?? .orkestrel/campaign/unit-vf-brief.md
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

After, exit `0`:

```text
 M .claude/rules/workspace.md
 M guides/scaffold.md
MM package-lock.json
 M package.json
 M src/bin/CLI.ts
 M src/bin/constants.ts
 M src/bin/helpers.ts
 M src/bin/main.ts
 M src/bin/types.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/server/Materializer.ts
 M src/server/Upstream.ts
 M src/server/types.ts
 M tests/distribution.test.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/bin/helpers.test.ts
 M tests/src/bin/main.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/constants.test.ts
 M tests/src/core/fixtures/setup-false-manifest.txt
 M tests/src/core/helpers.test.ts
 M tests/src/server/Materializer.test.ts
 M tests/src/server/Upstream.test.ts
?? .orkestrel/campaign/audit-v12-verdict.md
?? .orkestrel/campaign/audit-v3-verdict.md
?? .orkestrel/campaign/design-versions-brief-amendment1.md
?? .orkestrel/campaign/design-versions-brief-amendment2.md
?? .orkestrel/campaign/design-versions-brief.md
?? .orkestrel/campaign/design-versions-objective-report.md
?? .orkestrel/campaign/design-versions-reconciliation.md
?? .orkestrel/campaign/design-versions-subjective-report.md
?? .orkestrel/campaign/unit-v1-brief.md
?? .orkestrel/campaign/unit-v1-report.md
?? .orkestrel/campaign/unit-v2-brief-amendment1.md
?? .orkestrel/campaign/unit-v2-brief.md
?? .orkestrel/campaign/unit-v2-deviation.md
?? .orkestrel/campaign/unit-v2-report.md
?? .orkestrel/campaign/unit-v3-brief.md
?? .orkestrel/campaign/unit-vf-brief-amendment1.md
?? .orkestrel/campaign/unit-vf-brief.md
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

The added status rows are the amendment-owned `src/bin/constants.ts` and the owned `src/server/types.ts`. No unowned subject path was added.

## Format and lint

Commands:

```text
npx.cmd oxlint --config .oxlintrc.json --deny-warnings src/bin/CLI.ts src/bin/helpers.ts src/bin/types.ts src/bin/constants.ts src/server/Upstream.ts src/server/Materializer.ts src/server/types.ts src/core/constants.ts src/core/compilers.ts src/core/types.ts guides/scaffold.md tests/src/bin/CLI.test.ts tests/src/bin/main.test.ts tests/src/core/constants.test.ts tests/src/core/compilers.test.ts tests/src/server/Upstream.test.ts tests/src/server/Materializer.test.ts
```

Exit `0`, no diagnostics.

```text
npx.cmd oxfmt --config .oxfmtrc.json --check src/bin/CLI.ts src/bin/helpers.ts src/bin/types.ts src/bin/constants.ts src/server/Upstream.ts src/server/Materializer.ts src/server/types.ts src/core/constants.ts src/core/compilers.ts src/core/types.ts guides/scaffold.md tests/src/bin/CLI.test.ts tests/src/bin/main.test.ts tests/src/core/constants.test.ts tests/src/core/compilers.test.ts tests/src/server/Upstream.test.ts tests/src/server/Materializer.test.ts
```

Exit `0`:

```text
Checking formatting...
All matched files use the correct format.
Finished in 574ms on 17 files using 16 threads.
```

Final patch check:

```text
git diff --check -- <owned files>
```

Exit `0`, no output.

## Typecheck

```text
npx.cmd tsc --noEmit --project tsconfig.json
```

Exit `0`:

```text
npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run tsc --noEmit --project tsconfig.json
```

## Failing-first pairs

Major-zero command:

```text
npx.cmd vitest run tests/src/bin/CLI.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:bin -t "major-zero"
```

Unfixed exit `1`:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

-----------------------------------------x---------------------------------x-------------------------------

 Test Files  1 failed (1)
      Tests  2 failed | 105 skipped (107)
   Start at  13:21:20
   Duration  1.57s (transform 310ms, setup 581ms, import 174ms, tests 662ms, environment 0ms)

npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run vitest run tests/src/bin/CLI.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:bin -t major-zero

Failed Tests 2

FAIL |src:bin| tests/src/bin/CLI.test.ts > CLI audit > reports a major-zero floor below the newest stable release in that major

Expected:
{
  "blocking": false,
  "field": "dependencies",
  "message": "oxfmt declares the floor ^0.64.0, while the registry serves 0.65.0 within major 0.",
}

Received:
[
  {
    "blocking": false,
    "field": "dependencies",
    "message": "oxfmt declares the floor ^0.64.0, while the registry serves 0.64.9 within major 0.",
  },
]

FAIL |src:bin| tests/src/bin/CLI.test.ts > CLI repair > raises a major-zero floor to the newest stable release in its declared major
AssertionError: expected package manifest to contain '"oxfmt": "^0.65.0"'

Expected:
"oxfmt": "^0.65.0"

Received:
"oxfmt": "^0.64.9"
```

Fixed exit `0`:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

-----------------------------------------·---------------------------------·-------------------------------

 Test Files  1 passed (1)
      Tests  2 passed | 105 skipped (107)
   Start at  13:29:05
   Duration  1.49s (transform 345ms, setup 606ms, import 176ms, tests 549ms, environment 0ms)

npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run vitest run tests/src/bin/CLI.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:bin -t major-zero
```

Manifest-scope command:

```text
npx.cmd vitest run tests/src/core/compilers.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:core -t "rewrites dependency sections without changing overrides or resolutions"
```

Unfixed exit `1`:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

----x--------------------------------------------------------------------

 Test Files  1 failed (1)
      Tests  1 failed | 72 skipped (73)
   Start at  13:21:28
   Duration  515ms (transform 167ms, setup 292ms, import 57ms, tests 10ms, environment 0ms)

Expected overrides.typescript to remain "6.0.3".
Expected resolutions.typescript to remain "6.0.2".
Received both rewritten to "^6.0.4".
```

Fixed exit `0`:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

----·--------------------------------------------------------------------

 Test Files  1 passed (1)
      Tests  1 passed | 72 skipped (73)
   Start at  13:29:05
   Duration  532ms (transform 175ms, setup 320ms, import 57ms, tests 3ms, environment 0ms)

npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run vitest run tests/src/core/compilers.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:core -t rewrites dependency sections without changing overrides or resolutions
```

Wiring-control command:

```text
npx.cmd vitest run tests/src/core/constants.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:core -t "derives every manifest-backed row from the manifest entry of the same name"
```

Plant: `@orkestrel/guide` temporarily derived from `manifest.devDependencies['@orkestrel/probe']`.

Planted exit `1`:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

--x-----

 Test Files  1 failed (1)
      Tests  1 failed | 7 skipped (8)
   Start at  13:21:40
   Duration  477ms (transform 144ms, setup 291ms, import 26ms, tests 9ms, environment 0ms)

Received:
[
  "base @orkestrel/guide: ^0.0.2, manifest ^0.0.12",
]
```

The plant was removed by restoring `manifest.devDependencies['@orkestrel/guide']`.

Restored exit `0`:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

--·------

 Test Files  1 passed (1)
      Tests  1 passed | 8 skipped (9)
   Start at  13:29:05
   Duration  497ms (transform 158ms, setup 311ms, import 27ms, tests 4ms, environment 0ms)

npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run vitest run tests/src/core/constants.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:core -t derives every manifest-backed row from the manifest entry of the same name
```

Single-fetch crossed-major pin, exit `0`:

```text
npx.cmd vitest run tests/src/bin/CLI.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:bin -t "reports a stale foreign floor and a crossed major without rewriting"

Test Files  1 passed (1)
Tests       1 passed | 106 skipped (107)
Duration    1.05s
```

Oversized default registry response pin, exit `0`:

```text
npx.cmd vitest run tests/src/server/Upstream.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:server -t "reads an abbreviated packument larger than the artifact limit by default"

Test Files  1 passed (1)
Tests       1 passed | 40 skipped (41)
Duration    1.01s
```

## Saved R3 boundary reading

Negative-control command:

```text
npx.cmd vitest run tmp/probe/r3-boundary.test.ts --config vite.config.ts --no-cache --reporter=verbose --project probe
```

Exit `1`:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

 × |probe| tmp/probe/r3-boundary.test.ts > refuses prerelease and off-form versions at the bare-major boundary 39ms
   → expected '0.65.0' to be '0.65.0-beta.1' // Object.is equality

 Test Files  1 failed (1)
      Tests  1 failed (1)
   Start at  13:10:24
   Duration  491ms (transform 210ms, setup 167ms, import 152ms, tests 40ms, environment 0ms)

Expected: "0.65.0-beta.1"
Received: "0.65.0"
```

Boundary command, after removing the negative control:

```text
npx.cmd vitest run tmp/probe/r3-boundary.test.ts --config vite.config.ts --no-cache --reporter=verbose --project probe
```

Exit `0`:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

 ✓ |probe| tmp/probe/r3-boundary.test.ts > refuses prerelease and off-form versions at the bare-major boundary 35ms
 ✓ |probe| tmp/probe/r3-boundary.test.ts > selects nothing when a bare-major packument serves only refused versions 8ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  13:10:43
   Duration  463ms (transform 199ms, setup 152ms, import 148ms, tests 44ms, environment 0ms)
```

The substituted bare-major range selected stable `0.65.0` over `0.65.0-beta.1` and off-form `0.65`. A packument containing only the refused versions produced no selected release. The saved probe had already been deleted and was not retaken.

## Project gates

`src:core`, exit `0`:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

 Test Files  8 passed (8)
      Tests  324 passed (324)
   Start at  13:32:17
   Duration  9.59s (transform 1.43s, setup 2.58s, import 843ms, tests 9.13s, environment 1ms)

npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core

stderr | tests/src/core/templates.test.ts > emitted workspaces under their own gates > refuses a non-object peer dependency declaration at config load
[MIXED_EXPORTS] Entry module "tmp/scaffold-e2-peers-bPHFFw/malformed/vite.config.ts" is using named and default exports together.

stderr | tests/src/core/templates.test.ts > emitted workspaces under their own gates > refuses a non-object peer dependency declaration at config load
failed to load config from C:\Users\mikes\WebstormProjects\scaffold\tmp\scaffold-e2-peers-bPHFFw\malformed\vite.config.ts
```

`src:server`, exit `0`:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

 Test Files  5 passed (5)
      Tests  356 passed | 4 skipped (360)
   Start at  13:30:22
   Duration  3.19s (transform 2.17s, setup 3.71s, import 503ms, tests 4.71s, environment 1ms)

npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server
```

`src:bin`, exit `0`:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

scaffold <verb> [options]

  scaffold new <name> [--src <list>] [--app <list>] [--bin] [--deps <list>] [--from <path>] [--target <path>] [--json]
  scaffold audit [--groups <list>] [--from <path>] [--target <path>] [--json]
  scaffold repair [--groups <list>] [--from <path>] [--target <path>] [--json]
  scaffold catalog [--all] [--from <path>] [--target <path>] [--json]
  scaffold overwrite [--groups <list>] [--dirty] [--from <path>] [--target <path>] [--json]

options
  --src <list>                 the published library environments to build: core, browser, server
  --app <list>                 the private application environments to build: core, browser, server
  --bin                        scaffold a command-line executable at src/bin/main.ts
  --deps <list>                the @orkestrel/* packages the workspace depends on
  --groups <list>              the artifact groups to cover; every group when absent
  --all                        fetch a guide for every package the organization publishes, not the declared ones alone
  --dirty                      delete from a tree carrying uncommitted changes
  --from <path>                read the data root from a local path instead of the bundled one; catalog alone accepts it more than once
  --target <path>              the directory the verb operates on; the working directory when absent
  --json                       emit one machine-readable value instead of a report
  ORKESTREL_SCAFFOLD_REGISTRY  the registry base mapped to upstream.registry.base

exit codes
  0  clean
  1  drift or failure
  2  usage error

 Test Files  3 passed (3)
      Tests  178 passed (178)
   Start at  13:30:30
   Duration  26.03s (transform 879ms, setup 1.74s, import 333ms, tests 26.21s, environment 0ms)

npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:bin
```

`guides`, exit `0`:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

 Test Files  1 passed (1)
      Tests  10 passed (10)
   Start at  13:31:04
   Duration  1.42s (transform 148ms, setup 293ms, import 99ms, tests 877ms, environment 0ms)

npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project guides
```

## Deviations

None. The amendment resolved `src/bin/constants.ts`. All temporary VF probes used to read the unit boundary and reconstruct the VF-only diff were deleted.