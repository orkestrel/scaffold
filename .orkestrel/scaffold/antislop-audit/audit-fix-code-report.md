## Git diff

```diff
diff --git a/configs/policy.ts b/configs/policy.ts
index 57502b7..a5d0697 100644
--- a/configs/policy.ts
+++ b/configs/policy.ts
@@ -8,17 +8,8 @@ export interface PolicyExpression {
 	readonly property?: PolicyExpression
 	readonly computed?: boolean
 	readonly callee?: PolicyExpression
-	readonly accessibility?: 'private' | 'protected' | 'public' | null
-}
-
-/** The call-expression fields inspected by the policy rules. */
-export interface PolicyCall extends PolicyExpression {
-	readonly type: 'CallExpression'
-	readonly callee: PolicyExpression
-}
-
-/** The class-member fields inspected by the policy rules. */
-export interface PolicyClassMember extends PolicyExpression {
+	readonly quasis?: readonly PolicyExpression[]
+	readonly expressions?: readonly PolicyExpression[]
 	readonly accessibility?: 'private' | 'protected' | 'public' | null
 }
 
@@ -88,6 +79,18 @@ export function reportMocking(context: PolicyContext, node: PolicyExpression): v
 	if (callee.computed) {
 		if (property.type === 'Literal' && typeof property.value === 'string') {
 			member = property.value
+		} else if (
+			property.type === 'TemplateLiteral' &&
+			property.quasis?.length === 1 &&
+			property.expressions?.length === 0
+		) {
+			const quasi = property.quasis[0]
+			const value = quasi?.value
+			if (typeof value === 'object' && value !== null) {
+				const cooked: unknown = Object.getOwnPropertyDescriptor(value, 'cooked')?.value
+				const raw: unknown = Object.getOwnPropertyDescriptor(value, 'raw')?.value
+				member = typeof cooked === 'string' ? cooked : typeof raw === 'string' ? raw : undefined
+			}
 		}
 	} else if (property.type === 'Identifier' && typeof property.name === 'string') {
 		member = property.name
diff --git a/tests/config.test.ts b/tests/config.test.ts
index d18694e..c60e60d 100644
--- a/tests/config.test.ts
+++ b/tests/config.test.ts
@@ -21,6 +21,7 @@ import * as configHelpers from '../configs/helpers.js'
 import { MOCKING_RULE, PRIVACY_RULE } from '../configs/policy.js'
 import configuration, { resolveWorkspacePath } from '../vite.config.js'
 import tsconfig from '../tsconfig.json' with { type: 'json' }
+import { inspectPolicyConfiguration } from './setupPolicy.js'
 import { describe, expect, it } from 'vitest'
 
 const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
@@ -455,6 +456,34 @@ describe('root configuration', () => {
 			hasService && publishes,
 		)
 	})
+
+	it('keeps policy rules active across every linted workspace path', () => {
+		const parsed: unknown = JSON.parse(readFileSync(resolve(root, '.oxlintrc.json'), 'utf8'))
+		expect(inspectPolicyConfiguration(parsed)).toEqual([])
+		if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
+			throw new Error('The Oxlint configuration is not a record')
+		}
+		const controlled = structuredClone(parsed)
+		const overrides: unknown = Object.getOwnPropertyDescriptor(controlled, 'overrides')?.value
+		if (!Array.isArray(overrides)) throw new Error('The Oxlint configuration has no overrides')
+		Object.defineProperty(controlled, 'overrides', {
+			value: overrides.concat({
+				files: ['src/**'],
+				rules: { 'policy/no-mocking': 'off' },
+			}),
+			enumerable: true,
+			configurable: true,
+			writable: true,
+		})
+		expect(inspectPolicyConfiguration(controlled)).toEqual([
+			'overrides must not configure policy/no-mocking',
+		])
+	})
+
+	it('omits the audit-confirmed dead policy type exports', () => {
+		const source = readFileSync(resolve(root, 'configs/policy.ts'), 'utf8')
+		expect(source).not.toMatch(/\bPolicy(?:Call|ClassMember)\b/u)
+	})
 })
 
 describe('policy plugin', () => {
@@ -479,6 +508,11 @@ describe('policy plugin', () => {
 				code: `vi['mock']('./x')`,
 				errors: [{ messageId: 'mock' }],
 			},
+			{
+				name: 'rejects template module mocking [membership: named vi and jest module APIs]',
+				code: `vi[\`mock\`]('./x')`,
+				errors: [{ messageId: 'mock' }],
+			},
 			{
 				name: 'rejects spy factories [membership: named vi and jest spy APIs]',
 				code: 'jest.fn()',
diff --git a/tests/setupPolicy.ts b/tests/setupPolicy.ts
index ea6d9c6..824ebde 100644
--- a/tests/setupPolicy.ts
+++ b/tests/setupPolicy.ts
@@ -8,7 +8,7 @@ import {
 	writeFileSync,
 } from 'node:fs'
 import { tmpdir } from 'node:os'
-import { basename, dirname, join } from 'node:path'
+import { basename, dirname, join, matchesGlob } from 'node:path'
 import * as ts from 'typescript'
 
 /** A rule the fleet placement instrument can decide from syntax and a file path. */
@@ -179,7 +179,23 @@ export const POLICY_SUPPRESSION_DIRECTIVE = ['oxlint', '-disable'].join('')
 /** Source, test, config, and script files inspected for lint suppression directives. */
 export const POLICY_SUPPRESSION_GLOB: readonly string[] = Object.freeze([
 	'{src,app,tests,configs,scripts}/**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}',
-	'*.{cjs,cts,js,mjs,mts,ts}',
+	'*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}',
+])
+
+/** Rules whose workspace-wide lint wiring must not be weakened by configuration. */
+export const POLICY_WIRING_RULES: readonly string[] = Object.freeze([
+	'policy/no-mocking',
+	'policy/no-keyword-privacy',
+	'typescript/parameter-properties',
+	'typescript/explicit-member-accessibility',
+])
+
+/** Linted workspace roots that ignore patterns must not reach. */
+export const POLICY_WIRING_ROOTS: readonly string[] = Object.freeze([
+	'src',
+	'app',
+	'tests',
+	'configs',
 ])
 
 /** Either lint suppression token the text sweep refuses. */
@@ -773,6 +789,78 @@ export function inspectPolicySuppressions(root: string): readonly PolicyViolatio
 	return violations
 }
 
+/**
+ * Inspect the lint configuration that keeps policy rules active across the workspace.
+ *
+ * @param configuration - The parsed Oxlint configuration to inspect.
+ * @returns Every wiring violation in rule and configuration order.
+ */
+export function inspectPolicyConfiguration(configuration: unknown): readonly string[] {
+	const violations: string[] = []
+	if (typeof configuration !== 'object' || configuration === null || Array.isArray(configuration)) {
+		return ['Oxlint configuration must be a record']
+	}
+
+	const rules: unknown = Object.getOwnPropertyDescriptor(configuration, 'rules')?.value
+	for (const rule of POLICY_WIRING_RULES) {
+		const setting =
+			typeof rules === 'object' && rules !== null && !Array.isArray(rules)
+				? Object.getOwnPropertyDescriptor(rules, rule)?.value
+				: undefined
+		const severity = Array.isArray(setting) ? setting[0] : setting
+		if (severity !== 'error') violations.push(`${rule} must have top-level error severity`)
+	}
+
+	const ignorePatterns: unknown = Object.getOwnPropertyDescriptor(
+		configuration,
+		'ignorePatterns',
+	)?.value
+	if (ignorePatterns !== undefined && !Array.isArray(ignorePatterns)) {
+		violations.push('ignorePatterns must be an array when declared')
+	} else if (Array.isArray(ignorePatterns)) {
+		for (const pattern of ignorePatterns) {
+			if (typeof pattern !== 'string' || pattern.startsWith('!')) continue
+			const normalized = normalizePolicyPath(pattern).replace(/^\.\//u, '').replace(/^\//u, '')
+			const [first = ''] = normalized.split('/')
+			if (
+				POLICY_WIRING_ROOTS.some(
+					(root) => first === root || (first !== '' && matchesGlob(root, first)),
+				)
+			) {
+				violations.push(`ignorePatterns must not reach ${pattern}`)
+			}
+		}
+	}
+
+	const overrides: unknown = Object.getOwnPropertyDescriptor(configuration, 'overrides')?.value
+	if (overrides !== undefined && !Array.isArray(overrides)) {
+		violations.push('overrides must be an array when declared')
+	} else if (Array.isArray(overrides)) {
+		for (const override of overrides) {
+			if (typeof override !== 'object' || override === null || Array.isArray(override)) {
+				violations.push('override entries must be records')
+				continue
+			}
+			const overrideRules: unknown = Object.getOwnPropertyDescriptor(override, 'rules')?.value
+			if (
+				overrideRules === undefined ||
+				typeof overrideRules !== 'object' ||
+				overrideRules === null ||
+				Array.isArray(overrideRules)
+			) {
+				continue
+			}
+			for (const rule of POLICY_WIRING_RULES) {
+				if (Object.getOwnPropertyDescriptor(overrideRules, rule) !== undefined) {
+					violations.push(`overrides must not configure ${rule}`)
+				}
+			}
+		}
+	}
+
+	return violations
+}
+
 /**
  * Resolve an exact-case directory beneath a physical root.
  *
@@ -1023,6 +1111,17 @@ export const POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 			},
 		],
 	},
+	{
+		label: 'rejects a suppression directive in a root TSX file',
+		membership: 'root code files in the suppression population',
+		rule: 'suppression',
+		files: [
+			{
+				path: 'probeRoot.tsx',
+				content: `// ${POLICY_SUPPRESSION_DIRECTIVE}\ndebugger\n`,
+			},
+		],
+	},
 	{
 		label: 'rejects a type outside types.ts',
 		membership: 'top-level type declarations whose filename is not types.ts',
```

`tests/policy.test.ts` remained unchanged. `configs/policy.ts` has zero imports, and `PolicyCall`/`PolicyClassMember` no longer occur there.

## Validation exit codes

- `npm run check`: `0`
- `npm run lint:check`: `0`
- `npm run format:check`: `0`
- `npm run test:policy`: `0` — 60/60 passed
- `npm run test:config`: `1` — 27 passed; only `loads every configured policy rule through the real binary` failed with the expected sandbox `spawnSync ... EPERM`

## Findings

1. Template computed access: accepted one-quasi, zero-expression template literals using cooked then raw text. Pin: `rejects template module mocking [membership: named vi and jest module APIs]`. Red: expected one error, received zero. Green: the case passes; only sandbox EPERM remains.
2. Dead exports: deleted `PolicyCall` and `PolicyClassMember` without changing `reportMocking`. Pin: `omits the audit-confirmed dead policy type exports`. Mutation red: 1 failed. Restored green: 1 passed.
3. Root suppression population: made root extensions identical to the directory arm. Pin: `rejects a suppression directive in a root TSX file [membership: root code files in the suppression population]`. Red: 1 failed, 59 passed. Green: 60/60 passed.
4. Path-scoped wiring: added `inspectPolicyConfiguration`, returning a dedicated `readonly string[]`, to enforce top-level error severity, reject protected rule IDs in overrides, and reject ignore patterns reaching protected roots. Pin: `keeps policy rules active across every linted workspace path`. Red: injected override returned no violation. Green: injected override returns the expected violation; only sandbox EPERM remains.

Deviation findings: none.