## Complete V1 diff

```diff
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@
-		"@microsoft/api-extractor": "^7.58.12",
+		"@microsoft/api-extractor": "^7",
@@
-		"@types/node": "^26.2.0",
-		"@vitest/browser-playwright": "^4.1.11",
-		"oxfmt": "^0.64.0",
-		"oxlint": "^1.79.0",
-		"playwright": "^1.62.1",
-		"typescript": "^6.0.3",
-		"vite": "~8.2.1",
-		"vite-plugin-dts": "^5.0.3",
-		"vitest": "^4.1.11"
+		"@types/node": "^26",
+		"@vitest/browser-playwright": "^4",
+		"oxfmt": "^0",
+		"oxlint": "^1",
+		"playwright": "^1",
+		"typescript": "^6",
+		"vite": "^8",
+		"vite-plugin-dts": "^5",
+		"vitest": "^4"
diff --git a/package-lock.json b/package-lock.json
--- a/package-lock.json
+++ b/package-lock.json
@@
-				"@microsoft/api-extractor": "^7.58.12",
+				"@microsoft/api-extractor": "^7",
@@
-				"@types/node": "^26.2.0",
-				"@vitest/browser-playwright": "^4.1.11",
-				"oxfmt": "^0.64.0",
-				"oxlint": "^1.79.0",
-				"playwright": "^1.62.1",
-				"typescript": "^6.0.3",
-				"vite": "~8.2.1",
-				"vite-plugin-dts": "^5.0.3",
-				"vitest": "^4.1.11"
+				"@types/node": "^26",
+				"@vitest/browser-playwright": "^4",
+				"oxfmt": "^0",
+				"oxlint": "^1",
+				"playwright": "^1",
+				"typescript": "^6",
+				"vite": "^8",
+				"vite-plugin-dts": "^5",
+				"vitest": "^4"
diff --git a/src/core/compilers.ts b/src/core/compilers.ts
index d730b64..ff6e865 100644
--- a/src/core/compilers.ts
+++ b/src/core/compilers.ts
@@ -1447,6 +1447,123 @@ export function applyOverrides(
 	})
 }
 
+/**
+ * Replace declared dependency ranges in package manifest text.
+ *
+ * @param manifest - The manifest text to compile.
+ * @param dependencies - The declared names and replacement ranges.
+ * @returns The manifest with every matching quoted value replaced, or
+ * `undefined` when any name has no quoted declaration.
+ *
+ * @remarks
+ * The compiler replaces values in place instead of serializing the manifest,
+ * so description, keywords, scripts, key order, indentation, and every byte
+ * outside the named ranges survive. Every occurrence of a declared name moves,
+ * which keeps duplicate declarations aligned across dependency sections until
+ * the manifest's own validation reports the duplicate.
+ *
+ * @example
+ * ```ts
+ * import { replaceManifestRanges } from '@orkestrel/scaffold'
+ *
+ * const manifest = '{"devDependencies":{"typescript":"^6"}}\n'
+ * replaceManifestRanges(manifest, [{ name: 'typescript', range: '^7' }])
+ * // the manifest with the declared range replaced
+ * ```
+ */
+export function replaceManifestRanges(
+	manifest: string,
+	dependencies: readonly Dependency[],
+): string | undefined {
+	let compiled = manifest
+	for (const dependency of dependencies) {
+		const key = JSON.stringify(dependency.name)
+		const range = JSON.stringify(dependency.range)
+		let index = compiled.indexOf(key)
+		let declared = false
+		while (index >= 0) {
+			let cursor = index + key.length
+			while (cursor < compiled.length && /\s/u.test(compiled.charAt(cursor))) cursor += 1
+			if (compiled.charAt(cursor) !== ':') {
+				index = compiled.indexOf(key, index + key.length)
+				continue
+			}
+			cursor += 1
+			while (cursor < compiled.length && /\s/u.test(compiled.charAt(cursor))) cursor += 1
+			if (compiled.charAt(cursor) !== '"') {
+				index = compiled.indexOf(key, index + key.length)
+				continue
+			}
+			const start = cursor
+			cursor += 1
+			let end: number | undefined
+			while (cursor < compiled.length) {
+				if (compiled.charAt(cursor) === '\\') {
+					cursor += 2
+					continue
+				}
+				if (compiled.charAt(cursor) === '"') {
+					end = cursor + 1
+					break
+				}
+				cursor += 1
+			}
+			if (end === undefined) {
+				index = compiled.indexOf(key, index + key.length)
+				continue
+			}
+			compiled = compiled.slice(0, start) + range + compiled.slice(end)
+			declared = true
+			index = compiled.indexOf(key, start + range.length)
+		}
+		if (!declared) return undefined
+	}
+	return compiled
+}
+
+/**
+ * Replace dependency ranges in a plan's manifest and recompute its identity.
+ *
+ * @param plan - The plan carrying the manifest artifact to compile.
+ * @param dependencies - The declared names and replacement ranges.
+ * @returns A plan with replaced manifest ranges and a matching hash, or
+ * `undefined` when the manifest or its identity cannot be compiled.
+ *
+ * @remarks
+ * The blueprint remains the workspace specification that produced the plan.
+ * Registry answers alter only the manifest artifact that materialization will
+ * write. Recomputing the hash in the same compiler keeps the plan's identity
+ * tied to those final bytes rather than to the unresolved floor.
+ *
+ * @example
+ * ```ts
+ * import { replacePlanRanges } from '@orkestrel/scaffold'
+ *
+ * replacePlanRanges(plan, releases) // the plan carrying the resolved manifest ranges
+ * ```
+ */
+export function replacePlanRanges(
+	plan: Plan,
+	dependencies: readonly Dependency[],
+): Plan | undefined {
+	let replaced = false
+	let refused = false
+	const artifacts = plan.artifacts.map((artifact): Artifact => {
+		if (artifact.path !== 'package.json' || artifact.origin === 'host') return artifact
+		const content = replaceManifestRanges(artifact.content, dependencies)
+		if (content === undefined) {
+			refused = true
+			return artifact
+		}
+		replaced = true
+		return { ...artifact, content }
+	})
+	if (!replaced || refused) return undefined
+	const compiled: Plan = { ...plan, artifacts }
+	const hash = planToHash(compiled)
+	return hash === undefined ? undefined : { ...compiled, hash }
+}
+
 /**
  * Compute a plan's content identity.
  *
diff --git a/src/core/constants.ts b/src/core/constants.ts
index 53c8638..0ecb9dd 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,4 +1,5 @@
 import type { AppDefinition, BuildFormat, Environment, Group, SrcDefinition } from './types.js'
+import manifest from '../../package.json' with { type: 'json' }
 
 /**
  * The `Environment` values, frozen.
@@ -370,42 +371,42 @@ export const DEFAULT_ENGINES = `>=${MINIMUM_NODE_VERSION}`
 
 /** The tooling versions scaffold and every generated workspace share. */
 export const BASE_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
-	'@orkestrel/guide': '^0.0.12',
-	'@orkestrel/probe': '^0.0.1',
-	'@orkestrel/scaffold': '^0.0.46',
-	'@orkestrel/test': '^0.0.7',
-	'@types/node': '^26.2.0',
-	oxfmt: '^0.64.0',
-	oxlint: '^1.79.0',
-	typescript: '^6.0.3',
-	vite: '~8.2.1',
-	vitest: '^4.1.11',
+	'@orkestrel/guide': manifest.devDependencies['@orkestrel/guide'],
+	'@orkestrel/probe': manifest.devDependencies['@orkestrel/probe'],
+	'@orkestrel/scaffold': `^${manifest.version}`,
+	'@orkestrel/test': manifest.devDependencies['@orkestrel/test'],
+	'@types/node': manifest.devDependencies['@types/node'],
+	oxfmt: manifest.devDependencies.oxfmt,
+	oxlint: manifest.devDependencies.oxlint,
+	typescript: manifest.devDependencies.typescript,
+	vite: manifest.devDependencies.vite,
+	vitest: manifest.devDependencies.vitest,
 })
 
 /** The development dependencies that emit declarations for published source or an executable. */
 export const DECLARATION_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
-	'@microsoft/api-extractor': '^7.58.12',
-	'vite-plugin-dts': '^5.0.3',
+	'@microsoft/api-extractor': manifest.devDependencies['@microsoft/api-extractor'],
+	'vite-plugin-dts': manifest.devDependencies['vite-plugin-dts'],
 })
 
 /** The development dependencies a published browser `src` environment adds. */
 export const SOURCE_BROWSER_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
-	'@vitest/browser-playwright': '^4.1.11',
-	playwright: '^1.62.1',
+	'@vitest/browser-playwright': manifest.devDependencies['@vitest/browser-playwright'],
+	playwright: manifest.devDependencies.playwright,
 })
 
 /** The development dependency every private `app` environment adds. */
 export const APP_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
-	'@orkestrel/contract': '^0.0.12',
+	'@orkestrel/contract': manifest.dependencies['@orkestrel/contract'],
 })
 
 /** The development dependencies a private Vue browser application adds. */
 export const APP_BROWSER_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
 	...SOURCE_BROWSER_DEV_DEPENDENCIES,
-	'@orkestrel/html': '^0.0.4',
-	'@vitejs/plugin-vue': '^6.0.8',
-	vue: '^3.5.40',
-	'vue-tsc': '^3.3.7',
+	'@orkestrel/html': manifest.devDependencies['@orkestrel/html'],
+	'@vitejs/plugin-vue': '^6',
+	vue: '^3',
+	'vue-tsc': '^3',
 })
 
 /**
@@ -415,16 +416,16 @@ export const APP_BROWSER_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Ob
  * ```ts
  * import { SHOWCASE_DEV_DEPENDENCIES } from '@orkestrel/scaffold'
  *
- * SHOWCASE_DEV_DEPENDENCIES['vite-plugin-singlefile'] // '^2.3.3'
+ * SHOWCASE_DEV_DEPENDENCIES['vite-plugin-singlefile'] // the showcase plugin range
  * ```
  */
 export const SHOWCASE_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
-	'vite-plugin-singlefile': '^2.3.3',
+	'vite-plugin-singlefile': '^2',
 })
 
 /** The development dependencies a private server application adds. */
 export const APP_SERVER_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
-	'@orkestrel/emitter': '^0.0.7',
+	'@orkestrel/emitter': manifest.dependencies['@orkestrel/emitter'],
 	'@orkestrel/middleware': '^0.0.16',
 	'@orkestrel/router': '^0.0.10',
 	'@orkestrel/server': '^0.0.14',
diff --git a/src/core/helpers.ts b/src/core/helpers.ts
index 686688e..a50ccf8 100644
--- a/src/core/helpers.ts
+++ b/src/core/helpers.ts
@@ -599,6 +599,36 @@ export function extractVersion(
 	return [major, minor, patch]
 }
 
+/**
+ * Extract the major component of an admitted dependency range.
+ *
+ * @param range - The candidate range text.
+ * @returns The major number, or `undefined` when the text is not a canonical
+ * major caret or an admitted full-version form.
+ *
+ * @remarks
+ * A canonical toolchain range is `^MAJOR`. Existing consumer declarations may
+ * instead carry an exact `major.minor.patch` version or that version under a
+ * caret or tilde. The projection reads those forms without deciding whether a
+ * version satisfies them; {@link matchesRange} owns that separate question.
+ *
+ * @example
+ * ```ts
+ * import { extractRangeMajor } from '@orkestrel/scaffold'
+ *
+ * extractRangeMajor('^6') // the declared major
+ * extractRangeMajor('>=6.0.0') // undefined
+ * ```
+ */
+export function extractRangeMajor(range: string): number | undefined {
+	const match =
+		/^(?:\^(0|[1-9]\d*)|(?:\^|~)?(0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*)?)$/.exec(
+			range,
+		)
+	const major = match?.[1] ?? match?.[2]
+	return major === undefined ? undefined : Number(major)
+}
+
 /**
  * Compare two versions by their numeric components.
  *
diff --git a/src/core/types.ts b/src/core/types.ts
index 3fba69f..13e257f 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -214,15 +214,15 @@ export type CatalogEntry =
 	  }
 
 /**
- * One declared dependency range measured against the registry's latest release.
+ * One declared dependency range measured against a registry release.
  *
  * @remarks
- * A found lookup carries the version upstream reported; one that produced no
- * answer carries the cause and no version. Whether the declared range already
- * admits that version is not recorded, because it is a deterministic function
- * of `range` and `latest`: a stored answer could only disagree with the
- * fields beside it. One centralized helper decides it, and every caller reads
- * the same decision.
+ * A found lookup carries the newest version upstream selected under `range`;
+ * one that produced no answer carries the cause and no version. Whether the
+ * declared range already admits that version is not recorded, because it is a
+ * deterministic function of `range` and `latest`: a stored answer could only
+ * disagree with the fields beside it. One centralized helper decides it, and
+ * every caller reads the same decision.
  */
 export type Release =
 	| {
diff --git a/tests/src/core/helpers.test.ts b/tests/src/core/helpers.test.ts
index cf1c18e..5dcbc1f 100644
--- a/tests/src/core/helpers.test.ts
+++ b/tests/src/core/helpers.test.ts
@@ -11,6 +11,7 @@ import {
 	computeBytes,
 	computeHash,
 	contentToHex,
+	extractRangeMajor,
 	extractVersion,
 	GROUPS,
 	HOST_PATHS,
@@ -466,6 +467,27 @@ describe('extractVersion and compareVersions', () => {
 	})
 })
 
+describe('extractRangeMajor', () => {
+	it('projects canonical majors and admitted full-version forms', () => {
+		expect(extractRangeMajor('^6')).toBe(6)
+		expect(extractRangeMajor('^0')).toBe(0)
+		expect(extractRangeMajor('^6.0.3')).toBe(6)
+		expect(extractRangeMajor('~6.4.0')).toBe(6)
+		expect(extractRangeMajor('6.5.1')).toBe(6)
+		expect(extractRangeMajor('^6.0.0-beta.1')).toBe(6)
+	})
+
+	it('answers nothing for off-form text', () => {
+		expect(extractRangeMajor('6')).toBeUndefined()
+		expect(extractRangeMajor('~6')).toBeUndefined()
+		expect(extractRangeMajor('^6.0')).toBeUndefined()
+		expect(extractRangeMajor('>=6.0.0')).toBeUndefined()
+		expect(extractRangeMajor('01.2.3')).toBeUndefined()
+		expect(extractRangeMajor('^^6')).toBeUndefined()
+		expect(extractRangeMajor('')).toBeUndefined()
+	})
+})
+
 describe('matchesRange', () => {
 	for (const rangeCase of RANGE_CASES) {
 		it(`${rangeCase.satisfied ? 'admits' : 'refuses'} ${rangeCase.latest} under ${rangeCase.range}`, () => {
```

## Acceptance evidence

### Status before

Exit code: `0`

```text
 M .claude/rules/workspace.md
D  package-lock.json
 M package.json
?? .orkestrel/campaign/design-versions-brief-amendment1.md
?? .orkestrel/campaign/design-versions-brief.md
?? .orkestrel/campaign/design-versions-objective-report.md
?? .orkestrel/campaign/design-versions-reconciliation.md
?? .orkestrel/campaign/design-versions-subjective-report.md
?? .orkestrel/campaign/unit-v1-brief.md
?? package-lock.json
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

### Status after

Exit code: `0`

```text
 M .claude/rules/workspace.md
D  package-lock.json
 M package.json
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/src/core/helpers.test.ts
?? .orkestrel/campaign/design-versions-brief-amendment1.md
?? .orkestrel/campaign/design-versions-brief.md
?? .orkestrel/campaign/design-versions-objective-report.md
?? .orkestrel/campaign/design-versions-reconciliation.md
?? .orkestrel/campaign/design-versions-subjective-report.md
?? .orkestrel/campaign/unit-v1-brief.md
?? package-lock.json
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

No path outside the standing entries and V1-owned files was added.

### Lockfile installation

Command:

```text
npm.cmd install
```

Exit code: `0`

```text
up to date in 558ms

32 packages are looking for funding
  run `npm fund` for details
```

Resolved versions:

```text
@orkestrel/scaffold@0.0.47 C:\Users\mikes\WebstormProjects\scaffold
+-- oxfmt@0.64.0
+-- typescript@6.0.3
`-- vite@8.2.2
```

Exit code: `0`.

### Formatting

Command:

```text
npx.cmd oxfmt --config .oxfmtrc.json --check package.json package-lock.json src/core/constants.ts src/core/helpers.ts src/core/compilers.ts src/core/types.ts tests/src/core/helpers.test.ts
```

Exit code: `0`

```text
Checking formatting...

All matched files use the correct format.
Finished in 5ms on 6 files using 16 threads.
npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run oxfmt --config .oxfmtrc.json --check package.json package-lock.json src/core/constants.ts src/core/helpers.ts src/core/compilers.ts src/core/types.ts tests/src/core/helpers.test.ts
```

### Lint

Command:

```text
npx.cmd oxlint --config .oxlintrc.json --deny-warnings src/core/constants.ts src/core/helpers.ts src/core/compilers.ts src/core/types.ts tests/src/core/helpers.test.ts
```

Exit code: `0`

```text
npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/core/constants.ts src/core/helpers.ts src/core/compilers.ts src/core/types.ts tests/src/core/helpers.test.ts
```

### Root TypeScript check

Command:

```text
npx.cmd tsc --noEmit --project tsconfig.json
```

Exit code: `0`

```text
npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run tsc --noEmit --project tsconfig.json
```

### Scoped core TypeScript check

Command:

```text
npx.cmd tsc --noEmit -p configs/src/tsconfig.core.json
```

Exit code: `0`

```text
npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run tsc --noEmit -p configs/src/tsconfig.core.json
```

### Build

The Windows command-shell equivalent was:

```text
npm.cmd run build
```

Exit code: `0`

```text
vite v8.2.2 building client environment for production...
transforming...
✓ 14 modules transformed.
rendering chunks...

[unplugin:dts] Start generate declaration files...
[unplugin:dts] Start bundling declaration files...
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
[unplugin:dts] Declaration files built in 1789ms.

computing gzip size...
dist/src/core/index.js  185.87 kB │ gzip: 49.89 kB │ map: 258.78 kB

transforming...
✓ 14 modules transformed.
rendering chunks...
computing gzip size...
dist/src/core/index.cjs  193.11 kB │ gzip: 50.51 kB │ map: 260.89 kB

✓ built in 2.04s
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
vite v8.2.2 building client environment for production...
transforming...
✓ 9 modules transformed.
rendering chunks...

[unplugin:dts] Start generate declaration files...
[unplugin:dts] Start bundling declaration files...
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
[unplugin:dts] Declaration files built in 2123ms.

computing gzip size...
dist/src/server/index.js  140.36 kB │ gzip: 36.47 kB │ map: 229.56 kB

transforming...
✓ 9 modules transformed.
rendering chunks...
computing gzip size...
dist/src/server/index.cjs  147.38 kB │ gzip: 36.92 kB │ map: 234.02 kB

✓ built in 2.33s
Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
vite v8.2.2 building client environment for production...
transforming...
✓ 6 modules transformed.
rendering chunks...
computing gzip size...
dist/bin/main.js  49.40 kB │ gzip: 13.67 kB │ map: 96.11 kB

✓ built in 28ms
build-host: staged 108 file(s) into dist/host
npm notice run @orkestrel/scaffold@0.0.47 build
npm notice run npm run clean && npm run build:src && npm run build:host
npm notice run @orkestrel/scaffold@0.0.47 clean
npm notice run node -e "require('node:fs').rmSync('dist',{recursive:true,force:true})"
npm notice run @orkestrel/scaffold@0.0.47 build:src
npm notice run npm run build:src:core && npm run build:src:server && npm run build:src:bin
npm notice run @orkestrel/scaffold@0.0.47 build:src:core
npm notice run vite build --config configs/src/vite.core.config.ts && npm run copy dist/src/core/index.d.ts dist/src/core/index.d.cts
npm notice run @orkestrel/scaffold@0.0.47 copy
npm notice run node -e "const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)" dist/src/core/index.d.ts dist/src/core/index.d.cts
npm notice run @orkestrel/scaffold@0.0.47 build:src:server
npm notice run vite build --config configs/src/vite.server.config.ts && npm run copy dist/src/server/index.d.ts dist/src/server/index.d.cts
"build.lib.formats" will be ignored because "build.rolldownOptions.output" is already an array format.
npm notice run @orkestrel/scaffold@0.0.47 copy
npm notice run node -e "const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)" dist/src/server/index.d.ts dist/src/server/index.d.cts
npm notice run @orkestrel/scaffold@0.0.47 build:src:bin
npm notice run vite build --config configs/src/vite.bin.config.ts
npm notice run @orkestrel/scaffold@0.0.47 build:host
npm notice run node -e "import('./dist/src/server/index.js').then((m)=>{const n=m.stageHost(process.cwd(),'dist/host').length;console.log('build-host: staged '+n+' file(s) into dist/host')})"
```

Inline-version grep, exit code `0`:

```text
6:	version: "0.0.47",
```

The module import block contains only the Orkestrel imports, followed by the inlined manifest object:

```text
import { andOf, arrayOf, attempt, canonicalStringify, cloneJSONValue, compareValues, enumerableKeys, holds, isArray, isBoolean, isFunction, isRecord, isString, limitEntries, literalOf, parseJSON, recordOf, sortValues, stringOf, unionOf } from "@orkestrel/contract";
import { fillTemplate } from "@orkestrel/template";
import { Emitter } from "@orkestrel/emitter";
var package_default = {
	name: "@orkestrel/scaffold",
	version: "0.0.47",
```

Runtime-import check, exit code `0`:

```text
NO_RUNTIME_PACKAGE_JSON_IMPORT_IN_MODULE_IMPORTS
```

### Failing-first helper proof

Mutation: admit a bare major by changing `\^` to `\^?`.

Command:

```text
npx.cmd vitest run tmp/probe/range-major.test.ts --config vite.config.ts --no-cache --reporter=dot --project probe --silent=passed-only
```

Exit code: `1`

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

x

 Test Files  1 failed (1)
      Tests  1 failed (1)
   Start at  11:24:45
   Duration  300ms (transform 119ms, setup 157ms, import 10ms, tests 6ms, environment 0ms)

npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run vitest run tmp/probe/range-major.test.ts --config vite.config.ts --no-cache --reporter=dot --project probe --silent=passed-only

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |probe| tmp/probe/range-major.test.ts > refuses a bare major outside the admitted range forms
AssertionError: expected 6 to be undefined

- Expected:
undefined

+ Received:
6

 ❯ tmp/probe/range-major.test.ts:5:33
      3|
      4| it('refuses a bare major outside the admitted range forms', () => {
      5|  expect(extractRangeMajor('6')).toBeUndefined()
       |                                 ^
      6| })
      7|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯
```

Restored command exit code: `0`

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

·

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  11:25:14
   Duration  290ms (transform 115ms, setup 155ms, import 10ms, tests 2ms, environment 0ms)

npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run vitest run tmp/probe/range-major.test.ts --config vite.config.ts --no-cache --reporter=dot --project probe --silent=passed-only
```

### Failing-first replacement proof

Mutation: pass `[]` to `replaceManifestRanges` instead of `dependencies`.

Command:

```text
npx.cmd vitest run tmp/probe/replace-plan-ranges.test.ts --config vite.config.ts --no-cache --reporter=dot --project probe --silent=passed-only
```

Exit code: `1`

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

x

 Test Files  1 failed (1)
      Tests  1 failed (1)
   Start at  11:25:26
   Duration  311ms (transform 117ms, setup 155ms, import 12ms, tests 16ms, environment 0ms)

npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run vitest run tmp/probe/replace-plan-ranges.test.ts --config vite.config.ts --no-cache --reporter=dot --project probe --silent=passed-only

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |probe| tmp/probe/replace-plan-ranges.test.ts > replaces a plan manifest range and recomputes its hash
AssertionError: expected '{\n\t"name": "@orkestrel/router",\n\t…' to contain '"@orkestrel/scaffold": "^0.0.99"'

- Expected
+ Received

- "@orkestrel/scaffold": "^0.0.99"
+ {
+ 	"name": "@orkestrel/router",
+ 	"version": "0.0.1",
+ 	"description": "The @orkestrel/router package.",
+ 	"keywords": [],
+ 	"homepage": "https://github.com/orkestrel/router#readme",
+ 	"bugs": "https://github.com/orkestrel/router/issues",
+ 	"license": "MIT",
+ 	"repository": {
+ 		"type": "git",
+ 		"url": "git+https://github.com/orkestrel/router.git"
+ 	},
+ 	"files": [
+ 		"dist/src",
+ 		"README.md"
+ 	],
+ 	"type": "module",
+ 	"sideEffects": false,
+ 	"main": "./dist/src/core/index.cjs",
+ 	"module": "./dist/src/core/index.js",
+ 	"types": "./dist/src/core/index.d.ts",
+ 	"exports": {
+ 		".": {
+ 			"import": {
+ 				"types": "./dist/src/core/index.d.ts",
+ 				"default": "./dist/src/core/index.js"
+ 			},
+ 			"require": {
+ 				"types": "./dist/src/core/index.d.cts",
+ 				"default": "./dist/src/core/index.cjs"
+ 			}
+ 		},
+ 		"./package.json": "./package.json"
+ 	},
+ 	"publishConfig": {
+ 		"access": "public"
+ 	},
+ 	"scripts": {
+ 		"clean": "node -e \"require('node:fs').rmSync('dist',{recursive:true,force:true})\"",
+ 		"copy": "node -e \"const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)\"",
+ 		"format": "oxfmt --config .oxfmtrc.json --write .",
+ 		"format:check": "oxfmt --config .oxfmtrc.json --check .",
+ 		"lint": "oxlint --config .oxlintrc.json --fix .",
+ 		"lint:check": "oxlint --config .oxlintrc.json --deny-warnings .",
+ 		"check": "tsc --noEmit --project tsconfig.json && npm run check:src",
+ 		"check:src": "npm run check:src:core",
+ 		"check:src:core": "tsc --noEmit -p configs/src/tsconfig.core.json",
+ 		"test": "npm run test:src && npm run test:policy && npm run test:config",
+ 		"test:src": "vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core",
+ 		"test:src:core": "vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core",
+ 		"test:policy": "vitest run --config vite.config.ts --no-cache --reporter=dot --project policy",
+ 		"test:config": "vitest run --config vite.config.ts --no-cache --reporter=dot --project config",
+ 		"test:probe": "vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe",
+ 		"test:bench": "vitest bench --config vite.config.ts --no-cache --project probe",
+ 		"build": "npm run clean && npm run build:src",
+ 		"build:src": "npm run build:src:core",
+ 		"build:src:core": "vite build --config configs/src/vite.core.config.ts && npm run copy dist/src/core/index.d.ts dist/src/core/index.d.cts",
+ 		"prepack": "npm run clean && npm run build:src",
+ 		"prepublishOnly": "npm run format:check && npm run lint:check && npm run check && npm run build && npm test"
+ 	},
+ 	"dependencies": {},
+ 	"devDependencies": {
+ 		"@microsoft/api-extractor": "^7",
+ 		"@orkestrel/guide": "^0.0.12",
+ 		"@orkestrel/probe": "^0.0.2",
+ 		"@orkestrel/scaffold": "^0.0.47",
+ 		"@orkestrel/test": "^0.0.8",
+ 		"@types/node": "^26",
+ 		"oxfmt": "^0",
+ 		"oxlint": "^1",
+ 		"typescript": "^6",
+ 		"vite": "^8",
+ 		"vite-plugin-dts": "^5",
+ 		"vitest": "^4"
+ 	},
+ 	"engines": {
+ 		"node": ">=22.12.0"
+ 	}
+ }

 ❯ tmp/probe/replace-plan-ranges.test.ts:17:27
     15|   throw new Error('Expected a content manifest artifact')
     16|  }
     17|  expect(artifact.content).toContain('"@orkestrel/scaffold": "^0.0.99"')
       |                           ^
     18|  expect(replaced.hash).not.toBe(plan.hash)
     19| })

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯
```

Restored command exit code: `0`

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

·

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  11:25:38
   Duration  296ms (transform 115ms, setup 153ms, import 11ms, tests 10ms, environment 0ms)

npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run vitest run tmp/probe/replace-plan-ranges.test.ts --config vite.config.ts --no-cache --reporter=dot --project probe --silent=passed-only
```

Probe cleanup check, exit code `0`:

```text
PROBES_REMOVED
```

### Core-project observation

Command:

```text
npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core
```

Exit code: `1`, expected for the V3-owned mirrors and digest.

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

············································································································································································································································x·x·····xx···························································x·············

 Test Files  2 failed | 6 passed (8)
      Tests  5 failed | 314 passed (319)
   Start at  11:27:47
   Duration  9.52s (transform 1.43s, setup 2.46s, import 742ms, tests 9.07s, environment 1ms)

npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core
stderr | tests/src/core/templates.test.ts > emitted workspaces under their own gates > refuses a non-object peer dependency declaration at config load
[MIXED_EXPORTS] Entry module "tmp/scaffold-e2-peers-OJB3St/malformed/vite.config.ts" is using named (including "config", "default", "peers", "policy", "probe", "resolveWorkspacePath", "srcCore") and default exports together. Consumers of your bundle will have to use `chunk.default` to access the default export, which may not be what you want. Use `output.exports: "named"` to disable this warning.

stderr | tests/src/core/templates.test.ts > emitted workspaces under their own gates > refuses a non-object peer dependency declaration at config load
failed to load config from C:\Users\mikes\WebstormProjects\scaffold\tmp\scaffold-e2-peers-OJB3St\malformed\vite.config.ts

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |src:core| tests/src/core/compilers.test.ts > blueprintToDevDependencies compile tooling > keeps library publishing tools in a source workspace
AssertionError: expected '^7' to be '^7.58.12' // Object.is equality

Expected: "^7.58.12"
Received: "^7"

 ❯ tests/src/core/compilers.test.ts:75:47
     73|   const planned = blueprintToDevDependencies(buildBlueprint({ src: ['c…
     74|
     75|   expect(planned['@microsoft/api-extractor']).toBe('^7.58.12')
       |                                               ^
     76|   expect(planned['vite-plugin-dts']).toBe('^5.0.3')
     77|  })

 FAIL  |src:core| tests/src/core/compilers.test.ts > blueprintToDevDependencies compile tooling > keeps library publishing tools in an executable workspace
AssertionError: expected '^7' to be '^7.58.12' // Object.is equality

Expected: "^7.58.12"
Received: "^7"

 ❯ tests/src/core/compilers.test.ts:91:47
     89|   const planned = blueprintToDevDependencies(buildBlueprint({ src: [],…
     90|
     91|   expect(planned['@microsoft/api-extractor']).toBe('^7.58.12')
       |                                               ^
     92|   expect(planned['vite-plugin-dts']).toBe('^5.0.3')
     93|  })

 FAIL  |src:core| tests/src/core/compilers.test.ts > blueprintToDevDependencies compile tooling > keeps a generated source workspace manifest byte-stable
AssertionError: expected 'a789500738aa31fa9eea433047c528a25823b…' to be 'f9730110f2e22865072beb207ccafd7a55748…' // Object.is equality

Expected: "f9730110f2e22865072beb207ccafd7a557481bf012b6346ac919c0730e341c1"
Received: "a789500738aa31fa9eea433047c528a25823b890e502285cd38a5c2ea28c1641"

 ❯ tests/src/core/compilers.test.ts:154:15
    152|   // The digest covers the self-pin, so a release moves it. Update it …
    153|   // version bump in the same change; it is the tripwire for every oth…
    154|   expect(hex).toBe('f9730110f2e22865072beb207ccafd7a557481bf012b6346ac…
       |               ^
    155|  })
    156| })

 FAIL  |src:core| tests/src/core/compilers.test.ts > blueprintToScripts config projects > registers and gates setup proofs only when the blueprint selects them
AssertionError: expected '{\n\t"name": "@orkestrel/sample",\n\t…' to be '{\n\t"name": "@orkestrel/sample",\n\t…' // Object.is equality

- Expected
+ Received

@@ -58,22 +58,22 @@
  		"prepack": "npm run clean && npm run build:src",
  		"prepublishOnly": "npm run format:check && npm run lint:check && npm run check && npm run build && npm test"
  	},
  	"dependencies": {},
  	"devDependencies": {
- 		"@microsoft/api-extractor": "^7.58.12",
+ 		"@microsoft/api-extractor": "^7",
  		"@orkestrel/guide": "^0.0.12",
- 		"@orkestrel/probe": "^0.0.1",
+ 		"@orkestrel/probe": "^0.0.2",
- 		"@orkestrel/scaffold": "^0.0.46",
+ 		"@orkestrel/scaffold": "^0.0.47",
- 		"@orkestrel/test": "^0.0.7",
+ 		"@orkestrel/test": "^0.0.8",
- 		"@types/node": "^26.2.0",
+ 		"@types/node": "^26",
- 		"oxfmt": "^0.64.0",
+ 		"oxfmt": "^0",
- 		"oxlint": "^1.79.0",
+ 		"oxlint": "^1",
- 		"typescript": "^6.0.3",
+ 		"typescript": "^6",
- 		"vite": "~8.2.1",
+ 		"vite": "^8",
- 		"vite-plugin-dts": "^5.0.3",
+ 		"vite-plugin-dts": "^5",
- 		"vitest": "^4.1.11"
+ 		"vitest": "^4"
  	},
  	"engines": {
  		"node": ">=22.12.0"
  	}
  }

 ❯ tests/src/core/compilers.test.ts:169:39
    167|   const scripts = blueprintToScripts(present)
    168|
    169|   expect(blueprintToManifest(absent)).toBe(fixture)
       |                                       ^
    170|   expect(blueprintToRootVite(absent)).not.toContain("name: { label: 's…
    171|   expect(blueprintToScripts(absent)).not.toHaveProperty('test:setup')

 FAIL  |src:core| tests/src/core/templates.test.ts > configuration templates > fills every selected artifact without leaving a template token
AssertionError: expected '^2' to be '^2.3.3' // Object.is equality

Expected: "^2.3.3"
Received: "^2"

 ❯ tests/src/core/templates.test.ts:390:75
    388|   expect(coreConfig?.content).toContain('"types": []')
    389|   expect(browserConfig?.content).toContain('"types": ["vite/client", "…
    390|   expect(blueprintToDevDependencies(blueprint)['vite-plugin-singlefile…
       |                                                                           ^
    391|  })
    392|
```

The red cases are exactly the V3-owned compiler mirrors, manifest digest/fixture, and showcase seed mirror named above. Nothing outside that set reddened.

## Deviations

No design or scope deviation occurred.

The literal PowerShell invocation `npm run build` was blocked before npm started because the host forbids `npm.ps1` execution:

```text
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
CategoryInfo          : SecurityError
FullyQualifiedErrorId : UnauthorizedAccess
```

Exit code: `1`. The equivalent Windows executable invocation `npm.cmd run build` then completed with exit code `0`, as reported above.