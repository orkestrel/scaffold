S4-3 is implemented, but acceptance is incomplete. The regression controls pass. `test:src:bin` exits `1` in upstream-baseline cases, including:

```text
ScaffoldError: The vendored host cannot read the declared file at guides/scaffold.md
❯ readHostFloor src/server/helpers.ts:1244:10
❯ buildInstalledHostReplies tests/setupServer.ts:2627:16
```

Expected: S4-3-C6 requires `test:src:bin` exit `0`. Found: `Tests 5 failed | 262 passed (267)`. Under the Deviation protocol, work stops here. Updating `host.json` or running the build is outside this dispatch. The hypothesis that the Orchestrator’s build clears every upstream-baseline failure remains unverified.

Each successor ruling landed at these sites.

| Ruling | Landing site |
|---|---|
| Configuration shorthand | `src/bin/helpers.ts:763`, `:859`; contract at `src/bin/types.ts:233`; proofs at `tests/src/bin/helpers.test.ts:740` |
| Transitive journey chain | `src/bin/CLI.ts:1094`, `:1132`; proof at `tests/src/bin/CLI.test.ts:1750` |
| Vitest configuration bound | `src/bin/CLI.ts:1059`; proof at `tests/src/bin/CLI.test.ts:1793` |
| Remedy names the invocation | `src/bin/CLI.ts:1071`; expected message at `tests/src/bin/CLI.test.ts:1741` |
| Guide bounds, chain, and reporting order | `guides/scaffold.md:652`, `:666`, `:677`; Summary cells retain their matching descriptions |
| `import.meta.resolve` exclusion | `tests/setupServer.ts:1532`; proof at `tests/setupServer.test.ts:662` |

The control readings follow.

| Control | Command | Red reading | Green reading |
|---|---|---|---|
| S4-3-C1 | `npm.cmd run test:src:bin -- tests/src/bin/helpers.test.ts -t 'configuration shorthand'` | Exit `1`; `Tests 3 failed \| 116 skipped (119)` | Exit `0`; `Tests 3 passed \| 116 skipped (119)` |
| S4-3-C2, S4-3-C3, S4-3-C4 | `npm.cmd run test:src:bin -- tests/src/bin/CLI.test.ts -t 'grouped test script\|Playwright configuration\|reports an absent journey configuration\|reports a journey invocation'` | Exit `1`; `Tests 3 failed \| 1 passed \| 141 skipped (145)` | Exit `0`; `Tests 4 passed \| 141 skipped (145)` |
| S4-3-C5 | `npm.cmd run test:guides`; `npm.cmd run test:setup` | No red mutation required | Each exits `0`; totals follow |
| S4-3-C6 | Scoped formatting, lint, typechecking, and source suites | Bin suite remains red | Formatting, lint, typechecking, and core suite pass |

The grouped-chain, Playwright, and remedy assertions each failed before their corresponding fixes. The existing missing-invocation case passed before and after.

The member-expression proof also passed:

```text
npm.cmd run test:setup -- tests/setupServer.test.ts -t 'member-expression calls'
Exit: 0
Tests 1 passed | 72 skipped (73)
```

The inherited unknown remains answered: the existing `differing` question does not cover the missing journey invocation. Its comparison covers writable script rows, which exclude the `test` chain. The earlier report records the pre-fix `repair` reading as `questions: []`; this round’s missing-invocation case passes through `repair` and `audit` while preserving the manifest.

The gate readings are from Windows on 2026-09-17. `<owned files>` expands to the tracked modified paths in the status output.

| Gate | Exit | Reading |
|---|---:|---|
| `.\node_modules\.bin\oxfmt.cmd --config .oxfmtrc.json --write <owned files>` | 0 | `Finished in 684ms on 8 files using 16 threads.` |
| `.\node_modules\.bin\oxfmt.cmd --config .oxfmtrc.json --check <owned files>` | 0 | `All matched files use the correct format.` |
| `.\node_modules\.bin\oxlint.cmd --config .oxlintrc.json --deny-warnings <owned files>` | 0 | No diagnostics |
| `npm.cmd run check` | 0 | Root, core, server, and bin checks completed without diagnostics |
| `npm.cmd run test:src:core` | 0 | `Tests 425 passed (425)` |
| `npm.cmd run test:src:bin` | 1 | `Tests 5 failed \| 262 passed (267)` |
| `npm.cmd run test:config` | 1 | `Tests 1 failed \| 172 passed \| 1 skipped (174)` |
| `npm.cmd run test:setup` | 0 | `Tests 162 passed \| 3 skipped (165)` |
| `npm.cmd run test:guides` | 0 | `Tests 23 passed (23)` |
| `git diff --check` | 0 | No diagnostics |

The configuration failure is the standing inventory observation:

```text
Error: The committed host inventory is stale at guides/scaffold.md
```

`tests/setupServer.ts` is also vendored. `host.json` remains untouched. Suite logs are under `tmp/codex/s4-3-test-*.log`.

No added or removed diff line contains a non-ASCII code point. No commit, build, install, browser launch, or `prove` run was performed. The brief declares the browser and `prove` process requirements unavailable in this sandbox.

The least-certain claim is that rebuilding the inventory resolves every bin failure. Host verification remains necessary with `npm.cmd run build`, followed by `npm.cmd run test:src:bin` and `npm.cmd run test:config`.

The actual diff stat is:

```text
 guides/scaffold.md            | 24 +++++++-----
 src/bin/CLI.ts                | 43 +++++++++++----------
 src/bin/helpers.ts            |  5 ++-
 src/bin/types.ts              |  3 +-
 tests/setupServer.test.ts     |  3 +-
 tests/setupServer.ts          |  2 +-
 tests/src/bin/CLI.test.ts     | 89 ++++++++++++++++++++++++++++++++++++++++++-
 tests/src/bin/helpers.test.ts | 20 ++++++++++
 8 files changed, 153 insertions(+), 36 deletions(-)
```

The actual `git status --short` output is:

```text
 M guides/scaffold.md
 M src/bin/CLI.ts
 M src/bin/helpers.ts
 M src/bin/types.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/bin/helpers.test.ts
?? .orkestrel/campaign/
```

The campaign directory was already untracked at entry and remains untouched. Git also reported permission warnings for `C:\Users\mikes/.config/git/ignore`.

The actual diff follows.

```diff
diff --git a/guides/scaffold.md b/guides/scaffold.md
index 058bec5a..f037930e 100644
--- a/guides/scaffold.md
+++ b/guides/scaffold.md
@@ -649,12 +649,13 @@ package before a publish lifecycle script runs, so crediting it would report a d
 one. Generated integration runs from `test`. One shell-token pass reads quoted and unquoted
 `--project value` and `--project=value` forms and follows literal `npm run` calls. A shell expansion
 or malformed quote that prevents a project or script name from being resolved statically produces a
-question instead of licensing a write. The classifier is deliberately bounded to manifest script
-text that names `vitest`; an external wrapper whose name does not identify its runner supplies no
-static Vitest fact to infer.
+question instead of licensing a write. The absent-project and absent-configuration checks read
+only manifest script text that names `vitest`; the configuration check also requires a `test:*`
+script name. An external wrapper whose text does not name `vitest` supplies no static Vitest fact
+to infer for these checks.
 
-The invocation reader also reads literal `--config <path>` and `--config=<path>` values in command
-order. A configuration value containing an unresolved shell expansion makes the whole reading
+The invocation reader also reads literal `-c <path>`, `--config <path>`, and `--config=<path>` values
+in command order. A configuration value containing an unresolved shell expansion makes the whole reading
 `undefined`. The executable keeps this contract in its own modules:
 
 | Declaration           | Summary                                                                                            |
@@ -662,16 +663,19 @@ order. A configuration value containing an unresolved shell expansion makes the
 | `ScriptInvocations`   | Lists the literal Vitest projects, configuration paths, and npm run scripts a shell command names. |
 | `scriptToInvocations` | Reads the literal Vitest projects, configuration paths, and npm run scripts a shell command names. |
 
-When a `test:*` script names a configuration that the plan does not emit and the target does not
-hold, the non-blocking `projects` question names the script and configuration path. When the plan
-emits `test:journey` and the manifest's `test` chain omits `npm run test:journey`, that question
-asks you to insert the invocation after `npm run test:app`. These advisories belong to `configs`
+When a `test:*` script whose text names `vitest` names a configuration that the plan does not emit
+and the target does not hold, the non-blocking `projects` question names the script and configuration
+path. Its remedy asks you to add the configuration, or remove the script that names it and its
+invocation from the `test` chain. When the plan emits `test:journey` and no chain from `test` reaches
+`npm run test:journey` through literal `npm run` calls, that question asks you to insert the invocation
+after `npm run test:app`. These advisories belong to `configs`
 and remain report-only during `repair`: the command preserves the `test` chain and an unplanned
 script. A configuration emitted by the plan or present in the target does not raise the absent
 configuration advisory.
 
 `audit` still completes the comparison and reports one non-blocking `projects` question when its
-selection includes `configs`. A scoped audit that excludes `configs` omits that question. For a
+selection includes `configs`. It reports the earliest of the facts it finds; settling that fact and
+re-running surfaces the next. A scoped audit that excludes `configs` omits that question. For a
 literal absent project, its advisory tells the developer to register the project or remove the
 script. For a planned project absent from the gate chains, the advisory reads the manifest after a
 writable script projection. The `scripts` question owns an absent direct `test:<project>` line. The
diff --git a/src/bin/CLI.ts b/src/bin/CLI.ts
index 3c8ba239..ab6fc5a3 100644
--- a/src/bin/CLI.ts
+++ b/src/bin/CLI.ts
@@ -1056,7 +1056,7 @@ export class CLI implements CLIInterface {
 			)
 			const configurations: string[] = []
 			for (const [name, script] of Object.entries(scripts)) {
-				if (!name.startsWith('test:') || !isString(script)) continue
+				if (!name.startsWith('test:') || !isString(script) || !script.includes('vitest')) continue
 				const invoked = scriptToInvocations(script)
 				if (invoked === undefined) continue
 				for (const config of invoked.configs) {
@@ -1068,7 +1068,7 @@ export class CLI implements CLIInterface {
 			if (configurations.length > 0) {
 				return {
 					field: 'projects',
-					message: `The manifest at ${target} names a Vitest configuration the plan does not emit and the target does not hold: ${configurations.join(', ')}. Add the configuration or remove the script that names it.`,
+					message: `The manifest at ${target} names a Vitest configuration the plan does not emit and the target does not hold: ${configurations.join(', ')}. Add the configuration, or remove the script that names it and its invocation from the test chain.`,
 					blocking: false,
 					groups: ['configs'],
 				}
@@ -1091,22 +1091,26 @@ export class CLI implements CLIInterface {
 		}
 
 		const reachable = new Set<string>()
-		const visited = new Set<string>()
-		const pending = [...gates]
-		while (pending.length > 0) {
-			const name = pending.shift()
-			if (name === undefined || visited.has(name)) continue
-			visited.add(name)
-			const script = scripts[name]
-			if (!isString(script)) continue
-			const invoked = scriptToInvocations(script)
-			if (invoked === undefined) {
-				unresolved = true
-				continue
-			}
-			for (const project of invoked.projects) reachable.add(project)
-			for (const called of invoked.scripts) {
-				if (!visited.has(called)) pending.push(called)
+		const chains = new Map<string, Set<string>>()
+		for (const gate of gates) {
+			const visited = new Set<string>()
+			chains.set(gate, visited)
+			const pending = [gate]
+			while (pending.length > 0) {
+				const name = pending.shift()
+				if (name === undefined || visited.has(name)) continue
+				visited.add(name)
+				const script = scripts[name]
+				if (!isString(script)) continue
+				const invoked = scriptToInvocations(script)
+				if (invoked === undefined) {
+					unresolved = true
+					continue
+				}
+				for (const project of invoked.projects) reachable.add(project)
+				for (const called of invoked.scripts) {
+					if (!visited.has(called)) pending.push(called)
+				}
 			}
 		}
 		if (unresolved) {
@@ -1125,8 +1129,7 @@ export class CLI implements CLIInterface {
 			if (
 				!writing &&
 				expected['test:journey'] !== undefined &&
-				(!isString(scripts.test) ||
-					!scriptToInvocations(scripts.test)?.scripts.includes('test:journey'))
+				!chains.get('test')?.has('test:journey')
 			) {
 				return {
 					field: 'projects',
diff --git a/src/bin/helpers.ts b/src/bin/helpers.ts
index 59c4eedf..6fd73a40 100644
--- a/src/bin/helpers.ts
+++ b/src/bin/helpers.ts
@@ -760,7 +760,8 @@ export function releasesToPins(
  * @remarks
  * Quotes group a token but do not hide the option, while shell expansions make
  * its value unresolved and therefore refuse the write that asked the question.
- * An unterminated quote, a trailing escape, and an unresolved `--project` or `--config` value
+ * Configuration paths use `-c <path>`, `--config <path>`, or `--config=<path>`.
+ * An unterminated quote, a trailing escape, and an unresolved `--project`, `--config`, or `-c` value
  * all answer `undefined` rather than a partial reading.
  *
  * @example
@@ -855,7 +856,7 @@ export function scriptToInvocations(script: string): ScriptInvocations | undefin
 			index += 2
 			continue
 		}
-		if (token.value === '--project' || token.value === '--config') {
+		if (token.value === '--project' || token.value === '--config' || token.value === '-c') {
 			const project = tokens[index + 1]
 			if (
 				project === undefined ||
diff --git a/src/bin/types.ts b/src/bin/types.ts
index eb3e6387..610bd4c7 100644
--- a/src/bin/types.ts
+++ b/src/bin/types.ts
@@ -230,10 +230,11 @@ export interface VersionResolution {
  * @remarks
  * Literal only: a token whose value a shell expansion decides is unresolved, so
  * the whole reading answers `undefined` rather than reporting a name it guessed.
+ * Configuration paths use `-c <path>`, `--config <path>`, or `--config=<path>`.
  */
 export interface ScriptInvocations {
 	readonly projects: readonly string[]
-	/** Lists literal --config values in command order, empty when none are named. */
+	/** Lists literal configuration values in command order, empty when none are named. */
 	readonly configs: readonly string[]
 	readonly scripts: readonly string[]
 }
diff --git a/tests/setupServer.test.ts b/tests/setupServer.test.ts
index 4152cea0..854df940 100644
--- a/tests/setupServer.test.ts
+++ b/tests/setupServer.test.ts
@@ -659,8 +659,9 @@ describe('the parsed specifier reader', () => {
 		])
 	})
 
-	it('omits a require member expression from the specifier reading', () => {
+	it('omits member-expression calls from the specifier reading', () => {
 		expect(readSpecifiers("require.resolve('pkg')\n", 'member.cts')).toStrictEqual([])
+		expect(readSpecifiers("import.meta.resolve('pkg')\n", 'member.mts')).toStrictEqual([])
 		expect(readSpecifiers("require('pkg')\n", 'direct.cts')).toStrictEqual(['pkg'])
 	})
 
diff --git a/tests/setupServer.ts b/tests/setupServer.ts
index 21aed075..ea9ac060 100644
--- a/tests/setupServer.ts
+++ b/tests/setupServer.ts
@@ -1529,7 +1529,7 @@ export function readStatements(source: string, name: string): readonly TestState
  * other argument reports `undefined`, because an argument assembled at runtime
  * names no module a caller can rule on. The reading omits an `import()` in type
  * position (`TSImportType`), a load through a binding some other name holds, and
- * a `require` reached through a member expression such as `require.resolve`.
+ * a member-expression call such as `require.resolve` or `import.meta.resolve`.
  *
  * @example
  * ```ts
diff --git a/tests/src/bin/CLI.test.ts b/tests/src/bin/CLI.test.ts
index 19610d6d..a27366a5 100644
--- a/tests/src/bin/CLI.test.ts
+++ b/tests/src/bin/CLI.test.ts
@@ -1738,7 +1738,7 @@ describe('CLI audit', () => {
 				expect(audit.questions).toContainEqual({
 					field: 'projects',
 					blocking: false,
-					message: `The manifest at ${target} names a Vitest configuration the plan does not emit and the target does not hold: test:journey --config configs/app/vite.journey.config.ts. Add the configuration or remove the script that names it.`,
+					message: `The manifest at ${target} names a Vitest configuration the plan does not emit and the target does not hold: test:journey --config configs/app/vite.journey.config.ts. Add the configuration, or remove the script that names it and its invocation from the test chain.`,
 				})
 				expect(workspace.read('fresh/package.json')).toBe(manifest)
 			}
@@ -1747,6 +1747,93 @@ describe('CLI audit', () => {
 		}
 	})
 
+	it('accepts a journey invocation reached through a grouped test script', async () => {
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
+			const manifest = requireValue(workspace.read('fresh/package.json'))
+				.replace(' && npm run test:journey', ' && npm run test:gui')
+				.replace('"scripts": {', '"scripts": {\n\t\t"test:gui": "npm run test:journey",')
+			workspace.write('fresh/package.json', manifest)
+			const sink = createSink()
+			expect(
+				await new CLI(sink.options).execute([
+					'audit',
+					'--offline',
+					'--from',
+					fleet.host,
+					'--target',
+					target,
+					'--groups',
+					'configs',
+					'--json',
+				]),
+			).toBe(EXIT_CLEAN)
+			const result: Audit = JSON.parse(sink.output[0] ?? '')
+			expect(result.questions.filter((question) => question.field === 'projects')).toStrictEqual([])
+		} finally {
+			workspace.destroy()
+		}
+	})
+
+	it('ignores a Playwright configuration in a browser target', async () => {
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
+				'"scripts": {',
+				'"scripts": {\n\t\t"test:e2e": "playwright test --config playwright.config.ts",',
+			)
+			workspace.write('fresh/package.json', manifest)
+			const sink = createSink()
+			expect(
+				await new CLI(sink.options).execute([
+					'audit',
+					'--offline',
+					'--from',
+					fleet.host,
+					'--target',
+					target,
+					'--groups',
+					'configs',
+					'--json',
+				]),
+			).toBe(EXIT_CLEAN)
+			const result: Audit = JSON.parse(sink.output[0] ?? '')
+			expect(result.questions.filter((question) => question.field === 'projects')).toStrictEqual([])
+		} finally {
+			workspace.destroy()
+		}
+	})
+
 	it('reports a journey invocation missing from test without rewriting the chain', async () => {
 		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
 		try {
diff --git a/tests/src/bin/helpers.test.ts b/tests/src/bin/helpers.test.ts
index 6aa7888d..009c1ceb 100644
--- a/tests/src/bin/helpers.test.ts
+++ b/tests/src/bin/helpers.test.ts
@@ -737,6 +737,26 @@ describe('scriptToInvocations', () => {
 		})
 	})
 
+	it('reads configuration shorthand in command order beside long options', () => {
+		expect(
+			scriptToInvocations(
+				'vitest run --config configs/start.ts -c "configs/journey path.ts" --config=configs/end.ts',
+			),
+		).toStrictEqual({
+			projects: [],
+			configs: ['configs/start.ts', 'configs/journey path.ts', 'configs/end.ts'],
+			scripts: [],
+		})
+	})
+
+	it('refuses configuration shorthand whose value a shell expansion decides', () => {
+		expect(scriptToInvocations('vitest run -c $CONFIG')).toBeUndefined()
+	})
+
+	it('refuses dangling configuration shorthand', () => {
+		expect(scriptToInvocations('vitest run -c')).toBeUndefined()
+	})
+
 	it('reads every npm run script and reads through quotes', () => {
 		expect(scriptToInvocations('npm run build && npm run "test:src"')).toStrictEqual({
 			projects: [],
```