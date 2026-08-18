## 1. Status and diff

```text
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
?? .orkestrel/scaffold/antislop-audit/unit-plugin-report.md
?? .orkestrel/scaffold/antislop-audit/unit-proofs-brief.md
```

```diff
diff --git a/tests/config.test.ts b/tests/config.test.ts
index 7de07a7..98fea1b 100644
--- a/tests/config.test.ts
+++ b/tests/config.test.ts
@@ -1,6 +1,7 @@
 // P1: Every checked population must exist and be non-empty; absence fails instead of passing vacuously.
 // P2: Required items are checked strictly; extra items are ignored before their shape is read.
 
+import { spawnSync } from 'node:child_process'
 import {
 	existsSync,
 	globSync,
@@ -15,7 +16,9 @@ import { dirname, join, resolve } from 'node:path'
 import { fileURLToPath, pathToFileURL } from 'node:url'
 import { build, loadConfigFromFile } from 'vite'
 import { createScratch } from '@orkestrel/test/server'
+import { RuleTester } from 'oxlint/plugins-dev'
 import * as configHelpers from '../configs/helpers.js'
+import { MOCKING_RULE, PRIVACY_RULE } from '../configs/policy.js'
 import configuration, { resolveWorkspacePath } from '../vite.config.js'
 import tsconfig from '../tsconfig.json' with { type: 'json' }
 import { describe, expect, it } from 'vitest'
@@ -454,6 +457,164 @@ describe('root configuration', () => {
 	})
 })
 
+describe('policy plugin', () => {
+	RuleTester.describe = describe
+	RuleTester.it = it
+
+	const tester = new RuleTester({ languageOptions: { parserOptions: { lang: 'ts' } } })
+	tester.run('no-mocking', MOCKING_RULE, {
+		valid: [
+			{ name: 'accepts recorders', code: 'createRecorder()' },
+			{ name: 'accepts non-framework members', code: "registry.mock('./x')" },
+			{ name: 'accepts unlisted framework members', code: 'vi.clearAllMocks()' },
+		],
+		invalid: [
+			{
+				name: 'rejects module mocking [membership: named vi and jest module APIs]',
+				code: "vi.mock('./x')",
+				errors: [{ messageId: 'mock' }],
+			},
+			{
+				name: 'rejects computed module mocking [membership: named vi and jest module APIs]',
+				code: `vi['mock']('./x')`,
+				errors: [{ messageId: 'mock' }],
+			},
+			{
+				name: 'rejects spy factories [membership: named vi and jest spy APIs]',
+				code: 'jest.fn()',
+				errors: [{ messageId: 'spy' }],
+			},
+			{
+				name: 'rejects fake clocks [membership: named vi and jest clock APIs]',
+				code: 'vi.useFakeTimers()',
+				errors: [{ messageId: 'clock' }],
+			},
+			{
+				name: 'rejects environment stubs [membership: named vi and jest stub APIs]',
+				code: "vi.stubEnv('A', '1')",
+				errors: [{ messageId: 'stub' }],
+			},
+		],
+	})
+
+	tester.run('no-keyword-privacy', PRIVACY_RULE, {
+		valid: [
+			{ name: 'accepts runtime-private fields', code: 'class Example { #value = 1 }' },
+			{
+				name: 'accepts unannotated members',
+				code: 'class Example { value = 1; read() { return this.value } }',
+			},
+		],
+		invalid: [
+			{
+				name: 'rejects private properties [membership: keyword-annotated class members]',
+				code: 'class Example { private value = 1 }',
+				errors: [{ messageId: 'keyword' }],
+			},
+			{
+				name: 'rejects private methods [membership: keyword-annotated class members]',
+				code: 'class Example { private read() { return 1 } }',
+				errors: [{ messageId: 'keyword' }],
+			},
+			{
+				name: 'rejects protected properties [membership: keyword-annotated class members]',
+				code: 'class Example { protected value = 1 }',
+				errors: [{ messageId: 'keyword' }],
+			},
+			{
+				name: 'rejects protected methods [membership: keyword-annotated class members]',
+				code: 'class Example { protected read() { return 1 } }',
+				errors: [{ messageId: 'keyword' }],
+			},
+		],
+	})
+
+	it('loads every configured policy rule through the real binary', () => {
+		const scratch = createScratch({ prefix: 'orkestrel-config-policy-' })
+		try {
+			scratch.write(
+				'violations/fixture.ts',
+				[
+					"vi.mock('./x')",
+					'class PrivateMember { private value = 1 }',
+					'class ParameterMember { constructor(readonly value: string) {} }',
+					'class PublicMember { public value = 1 }',
+					'void PrivateMember',
+					'void ParameterMember',
+					'void PublicMember',
+				].join('\n'),
+			)
+			scratch.write(
+				'clean/fixture.ts',
+				[
+					'class CleanMember {',
+					'\t#value = 1',
+					'\tvalue(): number { return this.#value }',
+					'}',
+					'void CleanMember',
+				].join('\n'),
+			)
+
+			const binary = resolve(root, 'node_modules/.bin/oxlint')
+			const config = resolve(root, '.oxlintrc.json')
+			const violations = spawnSync(
+				binary,
+				['--config', config, '--format', 'json', resolve(scratch.path, 'violations')],
+				{ cwd: root, encoding: 'utf8', timeout: 15_000 },
+			)
+			const clean = spawnSync(
+				binary,
+				['--config', config, '--format', 'json', resolve(scratch.path, 'clean')],
+				{ cwd: root, encoding: 'utf8', timeout: 15_000 },
+			)
+			const reports: string[][] = []
+			for (const result of [violations, clean]) {
+				if (result.error !== undefined) throw result.error
+				const report: unknown = JSON.parse(result.stdout)
+				if (typeof report !== 'object' || report === null) {
+					throw new Error('Oxlint returned no JSON report')
+				}
+				const diagnostics: unknown = Object.getOwnPropertyDescriptor(
+					report,
+					'diagnostics',
+				)?.value
+				if (!Array.isArray(diagnostics)) throw new Error('Oxlint returned no diagnostic list')
+				const codes: string[] = []
+				for (const diagnostic of diagnostics) {
+					if (typeof diagnostic !== 'object' || diagnostic === null) {
+						throw new Error('Oxlint returned a malformed diagnostic')
+					}
+					const code: unknown = Object.getOwnPropertyDescriptor(diagnostic, 'code')?.value
+					if (typeof code !== 'string') {
+						throw new Error('Oxlint returned a diagnostic without a rule id')
+					}
+					codes.push(code)
+				}
+				reports.push(codes)
+			}
+
+			const violationCodes = reports[0]
+			const cleanCodes = reports[1]
+			if (violationCodes === undefined || cleanCodes === undefined) {
+				throw new Error('Oxlint returned no fixture reports')
+			}
+			expect(violations.status).toBe(1)
+			for (const rule of [
+				'policy(no-mocking)',
+				'policy(no-keyword-privacy)',
+				'typescript(parameter-properties)',
+				'typescript(explicit-member-accessibility)',
+			]) {
+				expect(violationCodes).toContain(rule)
+			}
+			expect(clean.status).toBe(0)
+			expect(cleanCodes).toHaveLength(0)
+		} finally {
+			scratch.destroy()
+		}
+	})
+})
+
 describe('configuration helpers', () => {
diff --git a/tests/policy.test.ts b/tests/policy.test.ts
index 573cacf..48ff8c3 100644
--- a/tests/policy.test.ts
+++ b/tests/policy.test.ts
@@ -8,6 +8,7 @@ import {
 	inspectPolicyWorkspace,
 	inspectSkillFamily,
 	POLICY_CONTROLS,
+	POLICY_SUPPRESSION_DIRECTIVE,
 	readSkillFamily,
@@ -285,6 +286,22 @@ describe('policy population controls', () => {
 			}),
 		).toEqual([])
 	})
+
+	it('excludes documentation from the suppression population', () => {
+		expect(
+			inspectPolicyControl({
+				label: 'excludes documentation from the suppression population',
+				membership: 'files outside source, test, config, and script code',
+				rule: 'suppression',
+				files: [
+					{
+						path: 'guides/sample.md',
+						content: `<!-- ${POLICY_SUPPRESSION_DIRECTIVE} -->\n`,
+					},
+				],
+			}),
+		).toEqual([])
+	})
 })
diff --git a/tests/setupPolicy.ts b/tests/setupPolicy.ts
index 0e00bd8..89b5b70 100644
--- a/tests/setupPolicy.ts
+++ b/tests/setupPolicy.ts
@@ -23,6 +23,7 @@ export type PolicyRule =
 	| 'mirror'
 	| 'parser'
 	| 'skill'
+	| 'suppression'
 	| 'type'
@@ -172,6 +173,21 @@ export const POLICY_TESTS_MODULE_GLOB = `tests/**/${POLICY_TESTS_MODULE_PREFIX}*
 export const POLICY_TEST_GLOB = 'tests/{app,src}/**/*.test.ts'
 
+// Compose suppression tokens so the instrument does not report its own definitions or controls.
+export const POLICY_SUPPRESSION_DIRECTIVE = 'oxlint' + '-disable'
+
+/** Source, test, config, and script files inspected for lint suppression directives. */
+export const POLICY_SUPPRESSION_GLOB: readonly string[] = Object.freeze([
+	'{src,app,tests,configs,scripts}/**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}',
+	'*.{cjs,cts,js,mjs,mts,ts}',
+])
+
+/** Either lint suppression token the text sweep refuses. */
+export const POLICY_SUPPRESSION_PATTERN = new RegExp(
+	['eslint' + '-disable', POLICY_SUPPRESSION_DIRECTIVE].join('|'),
+	'u',
+)
+
@@ -731,6 +747,32 @@ export function inspectPolicyMirrors(root: string): readonly PolicyViolation[] {
 	return inspectPolicyMirrorPaths(tests, modules)
 }
 
+/**
+ * Inspect code-shaped workspace files for lint suppression directives.
+ *
+ * @param root - The workspace root to inspect.
+ * @returns Every suppression occurrence in path and line order.
+ */
+export function inspectPolicySuppressions(root: string): readonly PolicyViolation[] {
+	const violations: PolicyViolation[] = []
+	const paths = globSync(POLICY_SUPPRESSION_GLOB, { cwd: root }).map(normalizePolicyPath).sort()
+	for (const path of paths) {
+		const lines = readFileSync(join(root, path), 'utf8').split('\n')
+		for (let index = 0; index < lines.length; index += 1) {
+			const line = lines[index]
+			if (line !== undefined && POLICY_SUPPRESSION_PATTERN.test(line)) {
+				violations.push({
+					rule: 'suppression',
+					path,
+					line: index + 1,
+					message: 'file carries a lint suppression directive',
+				})
+			}
+		}
+	}
+	return violations
+}
+
@@ -938,7 +980,11 @@ export function inspectSkillFamily(root: string): readonly PolicyViolation[] {
 export function inspectPolicyWorkspace(root: string): readonly PolicyViolation[] {
-	return [...inspectPolicySources(readPolicySources(root)), ...inspectPolicyMirrors(root)]
+	return [
+		...inspectPolicySources(readPolicySources(root)),
+		...inspectPolicyMirrors(root),
+		...inspectPolicySuppressions(root),
+	]
 }
@@ -966,6 +1012,17 @@ export function inspectPolicyControl(control: PolicyControl): readonly PolicyVio
 export const POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
+	{
+		label: 'rejects a suppression directive in a scanned source file',
+		membership: 'source, test, config, and script files in the suppression population',
+		rule: 'suppression',
+		files: [
+			{
+				path: 'scripts/control.ts',
+				content: `// ${POLICY_SUPPRESSION_DIRECTIVE}\ndebugger\n`,
+			},
+		],
+	},
 	{
```

## 2. Exit-code truth

- `npm run test:policy`: exit `0`; `59 passed`.
- `npm run test:config`: exit `1`; `24 passed`, `1 failed`.
- `npm run lint:check`: not run after the mandatory deviation stop.
- `npm run format:check`: not run after the mandatory deviation stop.
- `npm run check`: not run after the mandatory deviation stop.

## 3. Assertion failure proofs

Suppression control before the scanner:

```text
npm run test:policy
exit 1
Tests  1 failed | 58 passed (59)

FAIL instrument negative controls >
rejects a suppression directive in a scanned source file
[membership: source, test, config, and script files in the suppression population]

Expected: true
Received: false
```

After the scanner, the control fired and the outside-population control stayed clean:

```text
npm run test:policy
exit 0
Tests  59 passed (59)
```

Direct installed-binary probe outside Vitest:

- Clean fixture: exit `0`; `diagnostics: []`.
- Violation fixture: exit `1`; actual rule IDs:

```text
eslint(no-unused-vars)
typescript(parameter-properties)
typescript(explicit-member-accessibility)
policy(no-mocking)
policy(no-keyword-privacy)
```

The in-test spawned binary produced no rule-id output because process creation failed with `EPERM`.

## 4. Deviation finding

- Expected: `tests/config.test.ts` spawns `node_modules/.bin/oxlint`, loads the repository’s real `.oxlintrc.json`, reports all four required rule IDs for the violation fixture, and reports zero findings for the clean fixture.
- Found: RuleTester drove both plain-object rules successfully, but the real-binary test could not spawn the installed executable.
- Exact evidence:

```text
FAIL |config| tests/config.test.ts > policy plugin >
loads every configured policy rule through the real binary

Error: spawnSync /home/user/scaffold/node_modules/.bin/oxlint EPERM
at tests/config.test.ts:560:23
```

- Done: suppression sweep and controls; RuleTester valid/invalid cases; real-binary fixture and assertions written.
- Not done: passing real-binary wiring proof and required final gates.
- Hypothesis: the sandbox permits the harness to execute Oxlint directly but denies nested process creation from the Vitest worker.