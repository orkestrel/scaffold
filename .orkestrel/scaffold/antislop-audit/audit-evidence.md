# Audit evidence: campaign diff and gate truth (Orchestrator-verified at b91dc63)

## git status --porcelain (clean except campaign records)

## Gate truth (run by the Orchestrator in the unconstrained environment)
format:check=0 lint:check=0 check=0 test:policy 59/59 test:config 25/25 (incl. real-binary wiring proof)

## Mutation probes (instrument certification; each restored to green)
=== M1 break jsPlugins specifier -> test:config must fail ===
M1 broken-config test:config exit=1 (expect nonzero)
=== M2 delete policy/no-mocking rule row -> test:config must fail ===
M2 missing-rule test:config exit=1 (expect nonzero)
=== M3 reintroduce a private member in src -> lint:check must fail naming policy(no-keyword-privacy) ===
ls: cannot access 'src/core/*/*.ts': No such file or directory
M3 target: 
sed: can't read : No such file or directory
M3 RULE DID NOT FIRE
fatal: empty string is not a valid pathspec. please use . instead if you meant to match all paths
=== M4 add a disable directive -> test:policy must fail on the suppression rule ===
AssertionError: expected [ { rule: 'suppression', …(3) } ] to deeply equal []
=== restore proof: all four gates green again ===
test:config exit=0
test:policy exit=0
lint:check exit=0
M3 done
M3 rerun on real target: src/core/Compiler.ts:83 'private probeKeyword = 1' -> policy(no-keyword-privacy) fired; restored; lint:check=0

## Full diff 83ff059..HEAD (code and rules paths)
diff --git a/.claude/rules/architecture.md b/.claude/rules/architecture.md
index f08b65b..57ea52e 100644
--- a/.claude/rules/architecture.md
+++ b/.claude/rules/architecture.md
@@ -104,6 +104,10 @@ kind. It reads declaration syntax and file name, never meaning.
   data-kind file, that every centralized declaration is exported, that a class sits in its matching
   implementation or errors file, and that `constants.ts` declares only UPPER_SNAKE_CASE consts with
   no bare collection literal.
+- It proves that no source, test, config, or script file carries an `eslint-disable` or
+  `oxlint-disable` directive. That rule sits in the sweep rather than in the lint plugin because a
+  file-level disable comment silently defeats every lint rule in its file, plugin rules included,
+  while nothing inside a file can suppress the sweep.
 - It does not prove a collection is frozen. It reads the declaration, never the value a call
   returns, so `Object.freeze([…])` and any other call initializer are one syntax to it. The freeze
   obligation in the kind-purity rules above binds regardless; only the bare literal is mechanical.
diff --git a/.claude/rules/typescript.md b/.claude/rules/typescript.md
index 993b6be..e499672 100644
--- a/.claude/rules/typescript.md
+++ b/.claude/rules/typescript.md
@@ -17,12 +17,23 @@ The non-negotiables and design laws in `AGENTS.md` apply without exception and a
 - Place `import type` declarations before value imports.
 - Do not place blank lines between consecutive imports of the same kind.
 - Narrow an accepted `unknown` with a total guard rather than a conditional access.
+- Write no accessibility modifier on a class member: `public` is the default, `protected` has no
+  sanctioned use, and with `private` banned a member's only privacy is a `#` field.
+- Declare no parameter property. A constructor parameter carrying `public`, `private`, `protected`,
+  or `readonly` declares a field as a side effect of a parameter; declare the `#` field and assign
+  it in the constructor body.
 
 ## Types
 
 - Put every reusable or public interface/type alias in the nearest authoritative `*/types.ts`.
 - Public collection properties and return types use `readonly T[]`, `ReadonlyMap<K, V>`, or `ReadonlySet<T>`.
 - Optional state is `T | undefined`; an optional lookup failure returns `undefined`.
+- `as const` is sanctioned. It annotates a literal with its own type and never overrides the
+  checker, so the assertion ban does not reach it. Use it where the value is the only place the
+  literal types exist: deriving a literal union from a value, and fixing a tuple's arity and element
+  types.
+- Do not write `as const` on a value whose contract is already declared. Annotate the declaration
+  and let the checker place the value against it.
 
 ## Immutability
 
diff --git a/.claude/rules/workspace.md b/.claude/rules/workspace.md
index 67e2c11..a51e904 100644
--- a/.claude/rules/workspace.md
+++ b/.claude/rules/workspace.md
@@ -60,13 +60,18 @@ Define aliases in `tsconfig.json` first. `vite.config.ts` derives from `compiler
 - `*/types.ts`: public API contracts.
 - `configs/src/` and `configs/app/`: thin per-target wrappers, including optional
   `configs/src/*bin*` files. Shared logic remains in root configs.
-- `configs/helpers.ts` and `configs/browsers.ts`: the only permitted leaves under `configs/`. Each
-  imports nothing from the workspace, which is what keeps it a leaf. Each `configs/src/*.config.ts`
-  imports the root config rather than a leaf, so shared build logic stays in one place.
+- `configs/helpers.ts`, `configs/browsers.ts`, and `configs/policy.ts`: the only permitted leaves
+  under `configs/`. Each imports nothing from the workspace, which is what keeps it a leaf. Each
+  `configs/src/*.config.ts` imports the root config rather than a leaf, so shared build logic stays
+  in one place.
 - Keep `configs/helpers.ts` free of any dependency a core-only workspace does not declare. It is
   vendored byte-identical to every workspace, so an import there must resolve in all of them.
   `configs/browsers.ts` exists for that reason: it imports `playwright` and
   `@vitest/browser-playwright`, and only a workspace with a browser environment is given it.
+- Keep `configs/policy.ts` free of imports entirely. It is the workspace's oxlint plugin, the lint
+  instrument of the policy law, and it is vendored byte-identical to every workspace including a
+  core-only one, so a module that imports nothing at all is the only form that resolves in all of
+  them.
 
 Environment rules:
 
@@ -225,6 +230,22 @@ Run `show` only **after** formatting. The committed `demo/showcase.html` is gene
 - Node build targets derive from the package's declared supported runtime. Keep `engines`, bundler targets, scoped configs, tests, and documentation aligned; never hard-code one Node version line-wide.
 - Browser framework: Vue 3 when present.
 
+Policy instruments:
+
+- Put every rule of the policy law in exactly one of two instruments. `configs/policy.ts` — the
+  oxlint plugin, namespace `policy` — takes the rules a single file's AST decides. The policy sweep
+  (`tests/setupPolicy.ts`) takes the rules that are path- or text-shaped, and every rule whose
+  subject is suppression itself.
+- Choose between them by what can defeat the rule: an instrument must not be suppressible by the
+  thing it polices. A file-level `oxlint-disable` silently defeats every lint rule in its file,
+  plugin rules included, and nothing inside a file can suppress the sweep.
+- Write each visitor in the plugin's visitor table as a one-line context-binding arrow delegating to
+  a named module-scope `report{Noun}` function. Never write rule logic inline in the table. This is
+  the `routes.ts` idiom over a foreign API shape, and it is the sanctioned exception to the in-body
+  function-expression limits in `.claude/rules/architecture.md` for exactly that table.
+- Name no individual rule id here. This section fixes the two instruments and how work is assigned
+  between them; each rule's substance stays with the law it enforces.
+
 ## Text integrity
 
 - Store text as UTF-8.
diff --git a/.oxlintrc.json b/.oxlintrc.json
index e4654af..aa40e13 100644
--- a/.oxlintrc.json
+++ b/.oxlintrc.json
@@ -1,12 +1,15 @@
 {
 	"$schema": "https://raw.githubusercontent.com/oxc-project/oxc/main/npm/oxlint/configuration_schema.json",
 	"plugins": ["import", "typescript", "vitest"],
+	"jsPlugins": [{ "name": "policy", "specifier": "./configs/policy.ts" }],
 	"rules": {
 		"@typescript-eslint/no-explicit-any": "error",
 		"@typescript-eslint/no-non-null-assertion": "error",
 		"typescript/consistent-type-assertions": ["error", { "assertionStyle": "never" }],
 		"typescript/no-require-imports": "error",
 		"typescript/array-type": ["error", { "default": "array-simple" }],
+		"typescript/parameter-properties": "error",
+		"typescript/explicit-member-accessibility": ["error", { "accessibility": "no-public" }],
 		"typescript/ban-ts-comment": [
 			"error",
 			{
@@ -50,7 +53,10 @@
 		"no-underscore-dangle": "warn",
 
 		"vitest/no-alias-methods": "error",
-		"vitest/warn-todo": "off"
+		"vitest/warn-todo": "off",
+
+		"policy/no-mocking": "error",
+		"policy/no-keyword-privacy": "error"
 	},
 	"categories": {
 		"correctness": "error",
@@ -67,6 +73,12 @@
 				"import/no-default-export": "off"
 			}
 		},
+		{
+			"files": ["configs/policy.ts"],
+			"rules": {
+				"import/no-default-export": "off"
+			}
+		},
 		{
 			"files": ["*.vue"],
 			"rules": {
diff --git a/.prettierignore b/.prettierignore
index 34fb1fa..490f105 100644
--- a/.prettierignore
+++ b/.prettierignore
@@ -6,3 +6,6 @@ dist/
 
 # Generated single-file application showcase.
 demo/showcase.html
+
+# Campaign records under the orchestration folder are verbatim evidence, not formatted source.
+.orkestrel/
diff --git a/configs/policy.ts b/configs/policy.ts
new file mode 100644
index 0000000..57502b7
--- /dev/null
+++ b/configs/policy.ts
@@ -0,0 +1,182 @@
+/** The expression fields inspected by the policy rules. */
+export interface PolicyExpression {
+	readonly type: string
+	readonly range: [number, number]
+	readonly name?: unknown
+	readonly value?: unknown
+	readonly object?: PolicyExpression
+	readonly property?: PolicyExpression
+	readonly computed?: boolean
+	readonly callee?: PolicyExpression
+	readonly accessibility?: 'private' | 'protected' | 'public' | null
+}
+
+/** The call-expression fields inspected by the policy rules. */
+export interface PolicyCall extends PolicyExpression {
+	readonly type: 'CallExpression'
+	readonly callee: PolicyExpression
+}
+
+/** The class-member fields inspected by the policy rules. */
+export interface PolicyClassMember extends PolicyExpression {
+	readonly accessibility?: 'private' | 'protected' | 'public' | null
+}
+
+/** One diagnostic emitted by a policy rule. */
+export interface PolicyDiagnostic {
+	readonly node: PolicyExpression
+	readonly messageId: string
+	readonly data?: Readonly<Record<string, string>>
+}
+
+/** The Oxlint context operations used by the policy rules. */
+export interface PolicyContext {
+	report(diagnostic: PolicyDiagnostic): void
+}
+
+/** The rule documentation fields supplied to Oxlint. */
+export interface PolicyDocs {
+	readonly [key: string]: unknown
+	readonly description: string
+}
+
+/** The rule metadata fields supplied to Oxlint. */
+export interface PolicyMeta {
+	readonly type: 'problem'
+	readonly docs: PolicyDocs
+	readonly messages: Readonly<Record<string, string>>
+}
+
+/** The Oxlint visitor entries used by the policy rules. */
+export interface PolicyVisitor {
+	readonly [key: string]: ((node: PolicyExpression) => void) | undefined
+	readonly CallExpression?: (node: PolicyExpression) => void
+	readonly MethodDefinition?: (node: PolicyExpression) => void
+	readonly PropertyDefinition?: (node: PolicyExpression) => void
+	readonly AccessorProperty?: (node: PolicyExpression) => void
+	readonly TSAbstractMethodDefinition?: (node: PolicyExpression) => void
+	readonly TSAbstractPropertyDefinition?: (node: PolicyExpression) => void
+	readonly TSAbstractAccessorProperty?: (node: PolicyExpression) => void
+}
+
+/** The complete behavior exposed by one policy rule. */
+export interface PolicyRuleInterface {
+	readonly meta: PolicyMeta
+	create(context: PolicyContext): PolicyVisitor
+}
+
+/** Report banned calls on the named Vitest and Jest framework objects. */
+export function reportMocking(context: PolicyContext, node: PolicyExpression): void {
+	const callee = node.callee
+	if (
+		callee === undefined ||
+		callee.type !== 'MemberExpression' ||
+		callee.object === undefined ||
+		callee.property === undefined ||
+		callee.computed === undefined
+	) {
+		return
+	}
+
+	const object = callee.object
+	if (object.type !== 'Identifier' || (object.name !== 'vi' && object.name !== 'jest')) {
+		return
+	}
+
+	const property = callee.property
+	let member: string | undefined
+	if (callee.computed) {
+		if (property.type === 'Literal' && typeof property.value === 'string') {
+			member = property.value
+		}
+	} else if (property.type === 'Identifier' && typeof property.name === 'string') {
+		member = property.name
+	}
+
+	switch (member) {
+		case 'mock':
+		case 'doMock':
+		case 'unstable_mockModule':
+			context.report({ node, messageId: 'mock' })
+			break
+		case 'fn':
+		case 'spyOn':
+			context.report({ node, messageId: 'spy' })
+			break
+		case 'useFakeTimers':
+		case 'setSystemTime':
+			context.report({ node, messageId: 'clock' })
+			break
+		case 'stubGlobal':
+		case 'stubEnv':
+			context.report({ node, messageId: 'stub' })
+			break
+	}
+}
+
+/** Report TypeScript privacy keywords on class members. */
+export function reportPrivacy(context: PolicyContext, node: PolicyExpression): void {
+	if (node.accessibility === 'private' || node.accessibility === 'protected') {
+		context.report({
+			node,
+			messageId: 'keyword',
+			data: { keyword: node.accessibility },
+		})
+	}
+}
+
+/** Ban framework mocking, spying, fake clocks, and global or environment stubs. */
+export const MOCKING_RULE: PolicyRuleInterface = {
+	meta: {
+		type: 'problem',
+		docs: {
+			description:
+				'Disallow named vi and jest mocking APIs; a renamed import alias escapes this name-based rule.',
+		},
+		messages: {
+			mock: 'Replace module mocking with a real injected collaborator; a missing seam is a missing injection point, not an untestable truth.',
+			spy: 'Use createRecorder from @orkestrel/test; framework spies and mock functions are banned.',
+			clock:
+				'Use real short timers and waitForDelay from @orkestrel/test; never replace the host clock.',
+			stub: 'Drive the real implementation or a protocol-faithful fixture; never stub globals or environment.',
+		},
+	},
+	create(context) {
+		return {
+			CallExpression: (node) => reportMocking(context, node),
+		}
+	},
+}
+
+/** Ban compile-time-only TypeScript privacy keywords on class members. */
+export const PRIVACY_RULE: PolicyRuleInterface = {
+	meta: {
+		type: 'problem',
+		docs: {
+			description:
+				'Disallow private and protected class members in favor of runtime-enforced # privacy.',
+		},
+		messages: {
+			keyword: 'Use runtime-enforced # privacy; TypeScript {{keyword}} is compile-time-only.',
+		},
+	},
+	create(context) {
+		return {
+			MethodDefinition: (node) => reportPrivacy(context, node),
+			PropertyDefinition: (node) => reportPrivacy(context, node),
+			AccessorProperty: (node) => reportPrivacy(context, node),
+			TSAbstractMethodDefinition: (node) => reportPrivacy(context, node),
+			TSAbstractPropertyDefinition: (node) => reportPrivacy(context, node),
+			TSAbstractAccessorProperty: (node) => reportPrivacy(context, node),
+		}
+	},
+}
+
+/** The workspace Oxlint plugin. */
+export default {
+	meta: { name: 'policy' },
+	rules: {
+		'no-mocking': MOCKING_RULE,
+		'no-keyword-privacy': PRIVACY_RULE,
+	},
+}
diff --git a/src/core/constants.ts b/src/core/constants.ts
index aa23a67..741774d 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -143,6 +143,7 @@ export const HOST_PATHS: readonly string[] = Object.freeze([
 	'tests/policy.test.ts',
 	'tests/config.test.ts',
 	'configs/helpers.ts',
+	'configs/policy.ts',
 	'.editorconfig',
 	'.gitattributes',
 	'.gitignore',
diff --git a/tests/config.test.ts b/tests/config.test.ts
index 7de07a7..d18694e 100644
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
@@ -454,6 +457,161 @@ describe('root configuration', () => {
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
+				const diagnostics: unknown = Object.getOwnPropertyDescriptor(report, 'diagnostics')?.value
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
 	it('exposes every helper this proof requires', () => {
 		const required = [
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
 	SKILL_POLICY_APOSTROPHE,
 	SKILL_POLICY_CONTROLS,
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
 
 describe('instrument negative controls', () => {
diff --git a/tests/setupPolicy.ts b/tests/setupPolicy.ts
index 0e00bd8..ea6d9c6 100644
--- a/tests/setupPolicy.ts
+++ b/tests/setupPolicy.ts
@@ -23,6 +23,7 @@ export type PolicyRule =
 	| 'mirror'
 	| 'parser'
 	| 'skill'
+	| 'suppression'
 	| 'type'
 
 /** One TypeScript source supplied to the placement instrument. */
@@ -172,6 +173,21 @@ export const POLICY_TESTS_MODULE_GLOB = `tests/**/${POLICY_TESTS_MODULE_PREFIX}*
 /** The mirrored module-test population inspected under either workspace axis. */
 export const POLICY_TEST_GLOB = 'tests/{app,src}/**/*.test.ts'
 
+// Compose suppression tokens so the instrument does not report its own definitions or controls.
+export const POLICY_SUPPRESSION_DIRECTIVE = ['oxlint', '-disable'].join('')
+
+/** Source, test, config, and script files inspected for lint suppression directives. */
+export const POLICY_SUPPRESSION_GLOB: readonly string[] = Object.freeze([
+	'{src,app,tests,configs,scripts}/**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}',
+	'*.{cjs,cts,js,mjs,mts,ts}',
+])
+
+/** Either lint suppression token the text sweep refuses. */
+export const POLICY_SUPPRESSION_PATTERN = new RegExp(
+	[['eslint', '-disable'].join(''), POLICY_SUPPRESSION_DIRECTIVE].join('|'),
+	'u',
+)
+
 /**
  * Normalize platform separators for stable matching and diagnostics.
  *
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
 /**
  * Resolve an exact-case directory beneath a physical root.
  *
@@ -938,7 +980,11 @@ export function inspectSkillFamily(root: string): readonly PolicyViolation[] {
  * @returns Every source-placement and mirror violation.
  */
 export function inspectPolicyWorkspace(root: string): readonly PolicyViolation[] {
-	return [...inspectPolicySources(readPolicySources(root)), ...inspectPolicyMirrors(root)]
+	return [
+		...inspectPolicySources(readPolicySources(root)),
+		...inspectPolicyMirrors(root),
+		...inspectPolicySuppressions(root),
+	]
 }
 
 /**
@@ -966,6 +1012,17 @@ export function inspectPolicyControl(control: PolicyControl): readonly PolicyVio
 
 /** Physical negative controls, one for each rule the instrument claims to enforce. */
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
 		label: 'rejects a type outside types.ts',
 		membership: 'top-level type declarations whose filename is not types.ts',
