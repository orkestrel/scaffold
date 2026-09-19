S4-2 implementation is present, but acceptance stopped under the Deviation protocol. `test:src:bin` requires a green result and fails in host-baseline cases after the vendored edits. Updating `host.json` or running the build is outside this dispatch.

Expected: `test:src:bin` exits `0`. Found: exit `1`, with `Tests 5 failed | 257 passed (262)`. The direct failure is:

```text
ScaffoldError: The vendored host cannot read the declared file at guides/scaffold.md
❯ readHostFloor src/server/helpers.ts:1244:10
❯ buildInstalledHostReplies tests/setupServer.ts:2627:16
```

The hypothesis is that the Orchestrator’s build resolves these host-baseline failures. That remains unverified.

Each ruling landed at the following site.

| Ruling | Landing site |
|---|---|
| Birth | `src/bin/CLI.ts:230`; proof at `tests/src/bin/CLI.test.ts:446` |
| Agreement | `src/bin/types.ts:234`, `src/bin/helpers.ts:774`, `src/bin/CLI.ts:1048`; proofs at `tests/src/bin/helpers.test.ts:716` and `tests/src/bin/CLI.test.ts:1703` |
| Factory pins | `tests/src/core/templates.test.ts:1088` |
| `readSpecifiers` TSDoc | `tests/setupServer.ts:1530`; member-expression proof at `tests/setupServer.test.ts:662` |
| `inspectSkillImports` TSDoc | `tests/setupPolicy.ts:1289` |
| Guide | `guides/scaffold.md:593`, `:656`, `:905`, and `:962` |

The compiler fixture comparisons passed unchanged in `test:src:core`. The library blueprint default remains unchanged; the CLI creation path selects journey.

The control readings are recorded here.

| Control | Command | Red reading | Green reading |
|---|---|---|---|
| S4-C1 | `npm.cmd run test:src:bin -- tests/src/bin/CLI.test.ts -t 'creates the journey axis'` | Exit `1`; `Tests 1 failed \| 140 skipped (141)`; missing wrapper | Exit `0`; `Tests 1 passed \| 142 skipped (143)` |
| S4-C2, configuration and invocation | `npm.cmd run test:src:bin -- tests/src/bin/CLI.test.ts -t 'reports a.*journey'` | Exit `1`; `Tests 2 failed \| 141 skipped (143)`; each received `questions: []` | Exit `0`; `Tests 2 passed \| 141 skipped (143)` |
| S4-C2, invocation reader | `npm.cmd run test:src:bin -- tests/src/bin/helpers.test.ts -t scriptToInvocations` | Exit `1`; `Tests 6 failed \| 110 skipped (116)` | Exit `0`; `Tests 6 passed \| 110 skipped (116)` |
| S4-C3 | `npm.cmd run test:src:core -- tests/src/core/templates.test.ts -t 'typechecks journey variants'` | Widened `include`: exit `1`; disabled browser: exit `1`. Each reported `Tests 1 failed \| 32 skipped (33)` at its corresponding pin. | Restored: exit `0`; `Tests 1 passed \| 32 skipped (33)` |
| S4-C4 | `npm.cmd run test:setup`; `rg -n 'Two forms' tests/setupServer.ts` | No behavioral fix or red mutation was required for the existing omission. | Setup exits `0`; member-expression case passes. Search exits `1` with no match. |
| S4-C5 | `npm.cmd run test:policy`; `npm.cmd run test:setup` | Documentation correction; no red mutation recorded. | Each exits `0`; totals follow. |
| S4-C6 | Scoped format, lint, and gate commands following this table | Initial scoped lint rejected the extra `expect` argument; corrected. | Incomplete because `test:src:bin` remains red. |

The S4-C3 mutations changed the emitted root text consumed by the test. `src/core/templates.ts` remained untouched.

The unknown is answered: the existing `differing` question does not report the missing journey invocation. Before the agreement edit, this command exercised `repair` first:

```text
npm.cmd run test:src:bin -- tests/src/bin/CLI.test.ts -t 'reports a journey invocation'
Exit: 1
Tests 1 failed | 142 skipped (143)
Received questions: []
```

The added question names `npm run test:journey` and its placement after `npm run test:app`. The passing agreement cases exercise `audit` and `repair` and assert that the manifest remains byte-identical.

The gate readings are from Windows on 2026-09-17. Scoped commands used the changed paths listed in the status output.

| Gate | Exit | Reading |
|---|---:|---|
| `.\node_modules\.bin\oxfmt.cmd --config .oxfmtrc.json --write <changed paths>` | 0 | `Finished in 689ms on 10 files using 16 threads.` |
| `.\node_modules\.bin\oxfmt.cmd --config .oxfmtrc.json --check <changed paths>` | 0 | `All matched files use the correct format.` |
| `.\node_modules\.bin\oxlint.cmd --config .oxlintrc.json --deny-warnings <changed paths>` | 0 | No diagnostics |
| `npm.cmd run check` | 0 | Root, core, server, and bin checks completed without diagnostics |
| `npm.cmd run test:src:core` | 0 | `Tests 425 passed (425)` |
| `npm.cmd run test:src:bin` | 1 | `Tests 5 failed \| 257 passed (262)` |
| `npm.cmd run test:config` | 1 | `Tests 1 failed \| 172 passed \| 1 skipped (174)` |
| `npm.cmd run test:setup` | 0 | `Tests 162 passed \| 3 skipped (165)` |
| `npm.cmd run test:guides` | 0 | `Tests 23 passed (23)` |
| `npm.cmd run test:policy` | 0 | `Tests 110 passed (110)` |
| `git diff --check` | 0 | No diagnostics |

The configuration failure names the reserved inventory work:

```text
Error: The committed host inventory is stale at guides/scaffold.md, tests/setupPolicy.ts
```

No added or removed diff line contains a non-ASCII character. The scan examined changed lines from `git diff --unified=0` with `[^\x00-\x7F]`.

The least-certain claims are host acceptance after rebuilding, browser execution, and instrument coverage beyond emitted-text pins. No browser or `prove` receipt is claimed. The Orchestrator’s settling commands are `npm.cmd run build`, `npm.cmd run test:src:bin`, and `npm.cmd run test:config`. In a generated browser target, browser execution requires `npm.cmd run test:journey`.

The actual diff stat is:

```text
 guides/scaffold.md               |  28 +++++++-
 src/bin/CLI.ts                   |  48 +++++++++++++-
 src/bin/helpers.ts               |  25 ++++----
 src/bin/types.ts                 |   4 +-
 tests/setupPolicy.ts             |   7 +-
 tests/setupServer.test.ts        |   5 ++
 tests/setupServer.ts             |   6 +-
 tests/src/bin/CLI.test.ts        | 135 +++++++++++++++++++++++++++++++++++++++
 tests/src/bin/helpers.test.ts    |  23 ++++++-
 tests/src/core/templates.test.ts |   3 +
 10 files changed, 260 insertions(+), 24 deletions(-)
```

The actual `git status --short` output is:

```text
 M guides/scaffold.md
 M src/bin/CLI.ts
 M src/bin/helpers.ts
 M src/bin/types.ts
 M tests/setupPolicy.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/bin/helpers.test.ts
 M tests/src/core/templates.test.ts
?? .orkestrel/campaign/
```

The campaign directory was present at entry and remained untouched. Git also reported:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

The actual diff follows.

<details>
<summary>Review diff</summary>

```diff
diff --git a/guides/scaffold.md b/guides/scaffold.md
index a560e790..220e2db8 100644
--- a/guides/scaffold.md
+++ b/guides/scaffold.md
@@ -590,7 +590,11 @@ files on `main`, the scaffold repository's `host.json` file, and changed vendore
 answers a read and grant no verb write authority that it did not already have.
 
 `new --bin` creates the executable entry, its test, and its scoped Vite and TypeScript wrappers. The
-other structural facts do not need creation flags. Add a root `tests/setup*.test.ts` proof for
+`new --app browser` command selects the journey axis, creates its birth-owned wrapper, defines
+`appJourney` in the root configuration, and excludes the browser integration suite from
+`app:browser`. Its manifest declares `test:journey` and invokes it after `npm run test:app` in
+`test`. A selection without a browser application emits no journey axis. Creation leaves `setup`
+empty. The other structural facts do not need creation flags. Add a root `tests/setup*.test.ts` proof for
 `setup`, `tests/guides.test.ts` for `guides`, `tests/integration.test.ts` for `integration`,
 `tests/conformance.test.ts` for `conformance`, `tests/setupService.ts` for `service`,
 `tests/setupGlobal.ts` for `global`, `configs/app/vite.showcase.config.ts` for `showcase`, and
@@ -649,6 +653,23 @@ question instead of licensing a write. The classifier is deliberately bounded to
 text that names `vitest`; an external wrapper whose name does not identify its runner supplies no
 static Vitest fact to infer.
 
+The invocation reader also reads literal `--config <path>` and `--config=<path>` values in command
+order. A configuration value containing an unresolved shell expansion makes the whole reading
+`undefined`. The executable keeps this contract in its own modules:
+
+| Declaration           | Summary                                                                                            |
+| --------------------- | -------------------------------------------------------------------------------------------------- |
+| `ScriptInvocations`   | Lists the literal Vitest projects, configuration paths, and npm run scripts a shell command names. |
+| `scriptToInvocations` | Reads the literal Vitest projects, configuration paths, and npm run scripts a shell command names. |
+
+When a `test:*` script names a configuration that the plan does not emit and the target does not
+hold, the non-blocking `projects` question names the script and configuration path. When the plan
+emits `test:journey` and the manifest's `test` chain omits `npm run test:journey`, that question
+asks you to insert the invocation after `npm run test:app`. These advisories belong to `configs`
+and remain report-only during `repair`: the command preserves the `test` chain and an unplanned
+script. A configuration emitted by the plan or present in the target does not raise the absent
+configuration advisory.
+
 `audit` still completes the comparison and reports one non-blocking `projects` question when its
 selection includes `configs`. A scoped audit that excludes `configs` omits that question. For a
 literal absent project, its advisory tells the developer to register the project or remove the
@@ -881,7 +902,7 @@ because the shape is chosen once and read afterwards: `new` refuses the advisory
 caller creating a workspace holds the same refusal, and the Compile section states it.
 
 `bin`, `setup`, `guides`, `integration`, `conformance`, `service`, `vendors`, `global`, `showcase`,
-and `journey` are structural facts. Each is set only when the workspace physically ships the directory
+and `journey` are structural facts. Reading verbs set each only when the workspace physically ships the directory
 or exact-case file that defines it, never because of the workspace's name and never because a
 sibling fact is set.
 
@@ -938,7 +959,8 @@ rather than withholding it.
 no artifact, configuration, script, or dependency, and the gate reports a non-blocking question on
 that field so the caller who set it learns it emitted nothing.
 
-The `journey` flag defaults to `false` and also requires a browser application. Without that
+The library's `journey` flag defaults to `false`; `new` sets it when its `app` selection includes
+`browser`. Reading verbs infer it from the wrapper's presence. The flag requires a browser application. Without that
 application, it emits no journey configuration or script and raises a non-blocking `journey`
 question. With that application, the content-owned root configuration defines
 `appJourney(variant, variants)` and excludes `tests/app/browser/integration.test.ts` from the
diff --git a/src/bin/CLI.ts b/src/bin/CLI.ts
index 4c29a755..3c8ba239 100644
--- a/src/bin/CLI.ts
+++ b/src/bin/CLI.ts
@@ -45,6 +45,7 @@ import { renderTable } from '@orkestrel/console'
 import { attempt, isRecord, isString, parseJSON } from '@orkestrel/contract'
 import {
 	BIN_ENTRY_PATH,
+	blueprintToConfigArtifacts,
 	blueprintToDevDependencies,
 	blueprintToRootVite,
 	blueprintToScripts,
@@ -229,9 +230,11 @@ export class CLI implements CLIInterface {
 	// blueprint the command line describes, and write it into a vacant target.
 	async #create(command: NewCommand): Promise<number> {
 		const target = command.target ?? command.name
+		const app = selectionToEnvironments(command.app, 'app')
 		const blueprint = createBlueprint(command.name, {
 			src: selectionToEnvironments(command.src, 'src'),
-			app: selectionToEnvironments(command.app, 'app'),
+			app,
+			journey: app.includes('browser'),
 			bin: command.bin === true,
 			setup: [],
 			dependencies: selectionToPackages(command.dependencies).map((name) => ({
@@ -1045,6 +1048,32 @@ export class CLI implements CLIInterface {
 				groups: ['configs'],
 			}
 		}
+		if (!writing) {
+			const paths = new Set(
+				blueprintToConfigArtifacts(blueprint).map((artifact) =>
+					resolveContainedPath(target, artifact.path),
+				),
+			)
+			const configurations: string[] = []
+			for (const [name, script] of Object.entries(scripts)) {
+				if (!name.startsWith('test:') || !isString(script)) continue
+				const invoked = scriptToInvocations(script)
+				if (invoked === undefined) continue
+				for (const config of invoked.configs) {
+					const path = resolveContainedPath(target, config)
+					if (path !== undefined && (paths.has(path) || isExactCaseFile(path))) continue
+					configurations.push(`${name} --config ${config}`)
+				}
+			}
+			if (configurations.length > 0) {
+				return {
+					field: 'projects',
+					message: `The manifest at ${target} names a Vitest configuration the plan does not emit and the target does not hold: ${configurations.join(', ')}. Add the configuration or remove the script that names it.`,
+					blocking: false,
+					groups: ['configs'],
+				}
+			}
+		}
 		const expected = blueprintToScripts(blueprint)
 		const expectedLines = new Map<string, string>()
 		for (const [name, script] of Object.entries(expected)) {
@@ -1092,7 +1121,22 @@ export class CLI implements CLIInterface {
 			.filter(([project]) => !reachable.has(project))
 			.sort(([left], [right]) => left.localeCompare(right))
 		const ungated = missing.filter(([project]) => isString(scripts[`test:${project}`]))
-		if (ungated.length === 0) return undefined
+		if (ungated.length === 0) {
+			if (
+				!writing &&
+				expected['test:journey'] !== undefined &&
+				(!isString(scripts.test) ||
+					!scriptToInvocations(scripts.test)?.scripts.includes('test:journey'))
+			) {
+				return {
+					field: 'projects',
+					message: `The manifest at ${target} does not invoke npm run test:journey from its test chain. Add npm run test:journey after npm run test:app.`,
+					blocking: false,
+					groups: ['configs'],
+				}
+			}
+			return undefined
+		}
 		const names = ungated.map(([project]) => project)
 		const disk = parseJSON(text)
 		const written = isRecord(disk) && isRecord(disk.scripts) ? disk.scripts : {}
diff --git a/src/bin/helpers.ts b/src/bin/helpers.ts
index e98ae549..59c4eedf 100644
--- a/src/bin/helpers.ts
+++ b/src/bin/helpers.ts
@@ -751,16 +751,16 @@ export function releasesToPins(
 }
 
 /**
- * Reads the literal Vitest projects and npm run scripts one shell command invokes.
+ * Reads the literal Vitest projects, configuration paths, and npm run scripts a shell command names.
  *
  * @param script - The manifest script text to read.
- * @returns The invoked projects and scripts, or `undefined` when the command
+ * @returns The named projects, configurations, and scripts, or `undefined` when the command
  * cannot be read literally.
  *
  * @remarks
  * Quotes group a token but do not hide the option, while shell expansions make
  * its value unresolved and therefore refuse the write that asked the question.
- * An unterminated quote, a trailing escape, and an unresolved `--project` value
+ * An unterminated quote, a trailing escape, and an unresolved `--project` or `--config` value
  * all answer `undefined` rather than a partial reading.
  *
  * @example
@@ -768,7 +768,7 @@ export function releasesToPins(
  * import { scriptToInvocations } from './helpers.js'
  *
  * scriptToInvocations('vitest run --project src:core')
- * // { projects: ['src:core'], scripts: [] }
+ * // { projects: ['src:core'], configs: [], scripts: [] }
  * ```
  */
 export function scriptToInvocations(script: string): ScriptInvocations | undefined {
@@ -837,6 +837,7 @@ export function scriptToInvocations(script: string): ScriptInvocations | undefin
 	if (started) tokens.push({ value, resolved })
 
 	const projects: string[] = []
+	const configs: string[] = []
 	const scripts: string[] = []
 	for (let index = 0; index < tokens.length; index += 1) {
 		const token = tokens[index]
@@ -854,7 +855,7 @@ export function scriptToInvocations(script: string): ScriptInvocations | undefin
 			index += 2
 			continue
 		}
-		if (token.value === '--project') {
+		if (token.value === '--project' || token.value === '--config') {
 			const project = tokens[index + 1]
 			if (
 				project === undefined ||
@@ -863,19 +864,21 @@ export function scriptToInvocations(script: string): ScriptInvocations | undefin
 				['&&', '||', ';', '|', '&', '(', ')'].includes(project.value)
 			)
 				return undefined
-			projects.push(project.value)
+			const names = token.value === '--project' ? projects : configs
+			names.push(project.value)
 			index += 1
 			continue
 		}
-		if (token.value.startsWith('--project=')) {
-			const project = token.value.slice('--project='.length)
+		if (token.value.startsWith('--project=') || token.value.startsWith('--config=')) {
+			const project = token.value.slice(token.value.indexOf('=') + 1)
 			if (!token.resolved || project.length === 0) return undefined
-			projects.push(project)
+			const names = token.value.startsWith('--project=') ? projects : configs
+			names.push(project)
 			continue
 		}
-		if (!token.resolved && token.value.includes('--project')) return undefined
+		if (!token.resolved && /--project|--config/.test(token.value)) return undefined
 	}
-	return { projects, scripts }
+	return { projects, configs, scripts }
 }
 
 /**
diff --git a/src/bin/types.ts b/src/bin/types.ts
index 52f85e32..eb3e6387 100644
--- a/src/bin/types.ts
+++ b/src/bin/types.ts
@@ -225,7 +225,7 @@ export interface VersionResolution {
 }
 
 /**
- * Lists the literal Vitest projects and npm run scripts one shell command invokes.
+ * Lists the literal Vitest projects, configuration paths, and npm run scripts a shell command names.
  *
  * @remarks
  * Literal only: a token whose value a shell expansion decides is unresolved, so
@@ -233,6 +233,8 @@ export interface VersionResolution {
  */
 export interface ScriptInvocations {
 	readonly projects: readonly string[]
+	/** Lists literal --config values in command order, empty when none are named. */
+	readonly configs: readonly string[]
 	readonly scripts: readonly string[]
 }
 
diff --git a/tests/setupPolicy.ts b/tests/setupPolicy.ts
index f76dde57..8ddc6e0d 100644
--- a/tests/setupPolicy.ts
+++ b/tests/setupPolicy.ts
@@ -1286,9 +1286,10 @@ export function readSkillDeclarations(
  * violation.
  * @remarks The guide parser supplies fences, including fences nested in lists and blockquotes.
  * The Oxc parser reads named value and type bindings, aliases, comments, and multiline imports.
- * A fence the parser refuses reports a violation when its text names an `@orkestrel/` specifier,
- * because error recovery drops the statements after the failure; a refused fence naming no such
- * specifier stays outside this check, as prose, table cells, indented code, default imports,
+ * A fence the parser refuses reports a violation when its text carries an `@orkestrel/` substring
+ * anywhere, including comments and string literals, because error recovery drops the statements
+ * after the failure. A refused fence without that substring stays outside this check, as prose,
+ * table cells, indented code, default imports,
  * namespace imports, and imports from other scopes do. A package outside BASE_DEV_DEPENDENCIES
  * reports a violation, and each refused declaration reading reports the cause
  * {@link SKILL_DECLARATION_MESSAGES} names. This check proves exported names, not call signatures
diff --git a/tests/setupServer.test.ts b/tests/setupServer.test.ts
index f69dc507..4152cea0 100644
--- a/tests/setupServer.test.ts
+++ b/tests/setupServer.test.ts
@@ -659,6 +659,11 @@ describe('the parsed specifier reader', () => {
 		])
 	})
 
+	it('omits a require member expression from the specifier reading', () => {
+		expect(readSpecifiers("require.resolve('pkg')\n", 'member.cts')).toStrictEqual([])
+		expect(readSpecifiers("require('pkg')\n", 'direct.cts')).toStrictEqual(['pkg'])
+	})
+
 	it('refuses a source the parser reports an error for', () => {
 		expect(() => readSpecifiers('import { join } from\n', 'broken.ts')).toThrow(
 			'The parser refused broken.ts',
diff --git a/tests/setupServer.ts b/tests/setupServer.ts
index 6cca7ba2..21aed075 100644
--- a/tests/setupServer.ts
+++ b/tests/setupServer.ts
@@ -1527,9 +1527,9 @@ export function readStatements(source: string, name: string): readonly TestState
  * type-only import as an import because that specifier must resolve too. It
  * resolves a string literal and a template literal with no expressions; every
  * other argument reports `undefined`, because an argument assembled at runtime
- * names no module a caller can rule on. Two forms sit outside the reading: an
- * `import()` written in type position, which parses as a `TSImportType` node, and
- * a load through a binding some other name holds.
+ * names no module a caller can rule on. The reading omits an `import()` in type
+ * position (`TSImportType`), a load through a binding some other name holds, and
+ * a `require` reached through a member expression such as `require.resolve`.
  *
  * @example
  * ```
diff --git a/tests/src/bin/CLI.test.ts b/tests/src/bin/CLI.test.ts
index 8b29fba5..19610d6d 100644
--- a/tests/src/bin/CLI.test.ts
+++ b/tests/src/bin/CLI.test.ts
@@ -443,6 +443,44 @@ describe('CLI sanitization', () => {
 })
 
 describe('CLI new', () => {
+	it('creates the journey axis for a browser application and omits it for core', async () => {
+		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
+		try {
+			const fleet = createFleet(workspace)
+			for (const app of ['browser', 'core']) {
+				const target = workspace.ensure(app)
+				const sink = createSink()
+				expect(
+					await new CLI(sink.options).execute([
+						'new',
+						'sample',
+						'--app',
+						app,
+						'--offline',
+						'--from',
+						fleet.host,
+						'--target',
+						target,
+						'--json',
+					]),
+				).toBe(EXIT_CLEAN)
+				const root = requireValue(workspace.read(`${app}/vite.config.ts`))
+				const manifest = requireValue(workspace.read(`${app}/package.json`))
+				expect(workspace.has(`${app}/configs/app/vite.journey.config.ts`)).toBe(app === 'browser')
+				expect(root.includes('export function appJourney(')).toBe(app === 'browser')
+				expect(root.includes("exclude: ['tests/app/browser/integration.test.ts']")).toBe(
+					app === 'browser',
+				)
+				expect(manifest.includes('"test:journey":')).toBe(app === 'browser')
+				expect(manifest.includes('npm run test:app && npm run test:journey')).toBe(
+					app === 'browser',
+				)
+			}
+		} finally {
+			workspace.destroy()
+		}
+	})
+
 	it('creates a bin workspace that round-trips through audit', async () => {
 		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
 		try {
@@ -1662,6 +1700,103 @@ describe('CLI audit', () => {
 		}
 	})
 
+	it('reports an absent journey configuration without removing its script during repair', async () => {
+		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
+		try {
+			const fleet = createFleet(workspace)
+			const target = workspace.ensure('fresh')
+			expect(
+				await new CLI(createSink().options).execute([
+					'new',
+					'sample',
+					'--app',
+					'browser',
+					'--offline',
+					'--from',
+					fleet.host,
+					'--target',
+					target,
+				]),
+			).toBe(EXIT_CLEAN)
+			workspace.remove('fresh/configs/app/vite.journey.config.ts')
+			const manifest = workspace.read('fresh/package.json')
+			for (const verb of ['audit', 'repair']) {
+				const sink = createSink()
+				await new CLI(sink.options).execute([
+					verb,
+					'--offline',
+					'--from',
+					fleet.host,
+					'--target',
+					target,
+					'--groups',
+					'configs',
+					'--json',
+				])
+				const result: Audit | RepairResult = JSON.parse(sink.output[0] ?? '')
+				const audit = 'audit' in result ? result.audit : result
+				expect(audit.questions).toContainEqual({
+					field: 'projects',
+					blocking: false,
+					message: `The manifest at ${target} names a Vitest configuration the plan does not emit and the target does not hold: test:journey --config configs/app/vite.journey.config.ts. Add the configuration or remove the script that names it.`,
+				})
+				expect(workspace.read('fresh/package.json')).toBe(manifest)
+			}
+		} finally {
+			workspace.destroy()
+		}
+	})
+
+	it('reports a journey invocation missing from test without rewriting the chain', async () => {
+		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
+		try {
+			const fleet = createFleet(workspace)
+			const target = workspace.ensure('fresh')
+			expect(
+				await new CLI(createSink().options).execute([
+					'new',
+					'sample',
+					'--app',
+					'browser',
+					'--offline',
+					'--from',
+					fleet.host,
+					'--target',
+					target,
+				]),
+			).toBe(EXIT_CLEAN)
+			const manifest = requireValue(workspace.read('fresh/package.json')).replace(
+				' && npm run test:journey',
+				'',
+			)
+			workspace.write('fresh/package.json', manifest)
+			for (const verb of ['repair', 'audit']) {
+				const sink = createSink()
+				await new CLI(sink.options).execute([
+					verb,
+					'--offline',
+					'--from',
+					fleet.host,
+					'--target',
+					target,
+					'--groups',
+					'configs',
+					'--json',
+				])
+				const result: Audit | RepairResult = JSON.parse(sink.output[0] ?? '')
+				const audit = 'audit' in result ? result.audit : result
+				expect(audit.questions).toContainEqual({
+					field: 'projects',
+					blocking: false,
+					message: `The manifest at ${target} does not invoke npm run test:journey from its test chain. Add npm run test:journey after npm run test:app.`,
+				})
+				expect(workspace.read('fresh/package.json')).toBe(manifest)
+			}
+		} finally {
+			workspace.destroy()
+		}
+	})
+
 	it('rejects wrong-case structural paths while deriving every exact fact', async () => {
 		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
 		try {
diff --git a/tests/src/bin/helpers.test.ts b/tests/src/bin/helpers.test.ts
index 13fd28d7..6aa7888d 100644
--- a/tests/src/bin/helpers.test.ts
+++ b/tests/src/bin/helpers.test.ts
@@ -717,10 +717,22 @@ describe('scriptToInvocations', () => {
 	it('reads a project named as a separate token and as one token', () => {
 		expect(scriptToInvocations('vitest run --project src:core')).toStrictEqual({
 			projects: ['src:core'],
+			configs: [],
 			scripts: [],
 		})
 		expect(scriptToInvocations('vitest run --project=src:server')).toStrictEqual({
 			projects: ['src:server'],
+			configs: [],
+			scripts: [],
+		})
+	})
+
+	it('reads configuration paths in command order through either option spelling', () => {
+		expect(
+			scriptToInvocations('vitest run --config "configs/first path.ts" --config=configs/next.ts'),
+		).toStrictEqual({
+			projects: [],
+			configs: ['configs/first path.ts', 'configs/next.ts'],
 			scripts: [],
 		})
 	})
@@ -728,6 +740,7 @@ describe('scriptToInvocations', () => {
 	it('reads every npm run script and reads through quotes', () => {
 		expect(scriptToInvocations('npm run build && npm run "test:src"')).toStrictEqual({
 			projects: [],
+			configs: [],
 			scripts: ['build', 'test:src'],
 		})
 	})
@@ -735,6 +748,8 @@ describe('scriptToInvocations', () => {
 	it('refuses a command whose value a shell expansion decides', () => {
 		expect(scriptToInvocations('vitest run --project $PROJECT')).toBeUndefined()
 		expect(scriptToInvocations('vitest run "--project=$PROJECT"')).toBeUndefined()
+		expect(scriptToInvocations('vitest run --config $CONFIG')).toBeUndefined()
+		expect(scriptToInvocations('vitest run "--config=$CONFIG"')).toBeUndefined()
 		expect(scriptToInvocations('npm run `echo build`')).toBeUndefined()
 	})
 
@@ -743,10 +758,16 @@ describe('scriptToInvocations', () => {
 		expect(scriptToInvocations('vitest run --project src:core \\')).toBeUndefined()
 		expect(scriptToInvocations('vitest run --project=')).toBeUndefined()
 		expect(scriptToInvocations('vitest run --project && echo done')).toBeUndefined()
+		expect(scriptToInvocations('vitest run --config=')).toBeUndefined()
+		expect(scriptToInvocations('vitest run --config && echo done')).toBeUndefined()
 	})
 
 	it('reads a command naming neither a project nor a script', () => {
-		expect(scriptToInvocations('tsc --noEmit')).toStrictEqual({ projects: [], scripts: [] })
+		expect(scriptToInvocations('tsc --noEmit')).toStrictEqual({
+			projects: [],
+			configs: [],
+			scripts: [],
+		})
 	})
 })
 
diff --git a/tests/src/core/templates.test.ts b/tests/src/core/templates.test.ts
index fd07ef5f..08616ca6 100644
--- a/tests/src/core/templates.test.ts
+++ b/tests/src/core/templates.test.ts
@@ -1085,6 +1085,9 @@ describe('emitted workspaces under their own gates', () => {
 			)
 			stageRootConfig(createBlueprint('sample', { app: ['browser'] }), workspace, 'ordinary')
 			const root = requireValue(workspace.read('journey/vite.config.ts'))
+			const journey = requireValue(root.match(/export function appJourney\([^]*?\n\}/u)?.[0])
+			expect(journey).toContain("include: ['tests/app/browser/integration.test.ts']")
+			expect(journey).toContain('enabled: true')
 			const wrapper = requireValue(workspace.read('journey/configs/app/vite.journey.config.ts'))
 			expect(wrapper).toContain("import type { JourneyVariant } from '@orkestrel/test'")
 			expect(wrapper).toContain("{ name: 'desktop', width: 1280, height: 800 }")
```

</details>