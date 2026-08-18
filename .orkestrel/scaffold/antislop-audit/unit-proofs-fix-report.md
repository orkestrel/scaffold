1. `git diff` from the tree found

```diff
diff --git a/configs/policy.ts b/configs/policy.ts
--- a/configs/policy.ts
+++ b/configs/policy.ts
@@ -1,28 +1,30 @@
 /** The expression fields inspected by the policy rules. */
 export interface PolicyExpression {
 	readonly type: string
-	readonly name?: string
+	readonly range: [number, number]
+	readonly name?: unknown
 	readonly value?: unknown
 	readonly object?: PolicyExpression
 	readonly property?: PolicyExpression
 	readonly computed?: boolean
+	readonly callee?: PolicyExpression
+	readonly accessibility?: 'private' | 'protected' | 'public' | null
 }
 
 /** The call-expression fields inspected by the policy rules. */
-export interface PolicyCall {
+export interface PolicyCall extends PolicyExpression {
 	readonly type: 'CallExpression'
 	readonly callee: PolicyExpression
 }
 
 /** The class-member fields inspected by the policy rules. */
-export interface PolicyClassMember {
-	readonly type: string
+export interface PolicyClassMember extends PolicyExpression {
 	readonly accessibility?: 'private' | 'protected' | 'public' | null
 }
 
 /** One diagnostic emitted by a policy rule. */
 export interface PolicyDiagnostic {
-	readonly node: PolicyCall | PolicyClassMember
+	readonly node: PolicyExpression
 	readonly messageId: string
 	readonly data?: Readonly<Record<string, string>>
 }
@@ -34,6 +36,7 @@ export interface PolicyContext {
 
 /** The rule documentation fields supplied to Oxlint. */
 export interface PolicyDocs {
+	readonly [key: string]: unknown
 	readonly description: string
 }
 
@@ -46,13 +49,14 @@ export interface PolicyMeta {
 
 /** The Oxlint visitor entries used by the policy rules. */
 export interface PolicyVisitor {
-	readonly CallExpression?: (node: PolicyCall) => void
-	readonly MethodDefinition?: (node: PolicyClassMember) => void
-	readonly PropertyDefinition?: (node: PolicyClassMember) => void
-	readonly AccessorProperty?: (node: PolicyClassMember) => void
-	readonly TSAbstractMethodDefinition?: (node: PolicyClassMember) => void
-	readonly TSAbstractPropertyDefinition?: (node: PolicyClassMember) => void
-	readonly TSAbstractAccessorProperty?: (node: PolicyClassMember) => void
+	readonly [key: string]: ((node: PolicyExpression) => void) | undefined
+	readonly CallExpression?: (node: PolicyExpression) => void
+	readonly MethodDefinition?: (node: PolicyExpression) => void
+	readonly PropertyDefinition?: (node: PolicyExpression) => void
+	readonly AccessorProperty?: (node: PolicyExpression) => void
+	readonly TSAbstractMethodDefinition?: (node: PolicyExpression) => void
+	readonly TSAbstractPropertyDefinition?: (node: PolicyExpression) => void
+	readonly TSAbstractAccessorProperty?: (node: PolicyExpression) => void
 }
 
 /** The complete behavior exposed by one policy rule. */
@@ -62,9 +66,10 @@ export interface PolicyRuleInterface {
 }
 
 /** Report banned calls on the named Vitest and Jest framework objects. */
-export function reportMocking(context: PolicyContext, node: PolicyCall): void {
+export function reportMocking(context: PolicyContext, node: PolicyExpression): void {
 	const callee = node.callee
 	if (
+		callee === undefined ||
 		callee.type !== 'MemberExpression' ||
 		callee.object === undefined ||
 		callee.property === undefined ||
@@ -84,7 +89,7 @@ export function reportMocking(context: PolicyContext, node: PolicyCall): void {
 		if (property.type === 'Literal' && typeof property.value === 'string') {
 			member = property.value
 		}
-	} else if (property.type === 'Identifier') {
+	} else if (property.type === 'Identifier' && typeof property.name === 'string') {
 		member = property.name
 	}
 
@@ -110,7 +115,7 @@ export function reportMocking(context: PolicyContext, node: PolicyCall): void {
 }
 
 /** Report TypeScript privacy keywords on class members. */
-export function reportPrivacy(context: PolicyContext, node: PolicyClassMember): void {
+export function reportPrivacy(context: PolicyContext, node: PolicyExpression): void {
 	if (node.accessibility === 'private' || node.accessibility === 'protected') {
 		context.report({
 			node,
diff --git a/tests/config.test.ts b/tests/config.test.ts
--- a/tests/config.test.ts
+++ b/tests/config.test.ts
@@
-				const diagnostics: unknown = Object.getOwnPropertyDescriptor(
-					report,
-					'diagnostics',
-				)?.value
+				const diagnostics: unknown = Object.getOwnPropertyDescriptor(report, 'diagnostics')?.value
diff --git a/tests/setupPolicy.ts b/tests/setupPolicy.ts
--- a/tests/setupPolicy.ts
+++ b/tests/setupPolicy.ts
@@
-export const POLICY_SUPPRESSION_DIRECTIVE = 'oxlint' + '-disable'
+export const POLICY_SUPPRESSION_DIRECTIVE = ['oxlint', '-disable'].join('')
@@
-	['eslint' + '-disable', POLICY_SUPPRESSION_DIRECTIVE].join('|'),
+	[['eslint', '-disable'].join(''), POLICY_SUPPRESSION_DIRECTIVE].join('|'),
```

`tests/policy.test.ts`: no delta from the tree found.

2. Exit-code truth

- `npm run check`: exit `0`.
- `npm run lint:check`: exit `0`.
- `npm run format:check`: exit `0`.
- `npm run test:policy`: exit `0`; 59 passed.
- `npm run test:config`: exit `1`; 24 passed, 1 failed. The sole failure was the expected `spawnSync .../node_modules/.bin/oxlint EPERM` wiring test. No other failure appeared.

3. Findings

1. Closed: both suppression tokens now use array `join('')`, retaining the self-match-avoidance comment and behavior.
2. Closed: `tests/config.test.ts` was converged with the required scoped Oxfmt command.
3. Closed: the local policy interfaces now match Oxlint’s ranged diagnostic, open docs, context, and visitor structures without assertions, `any`, suppressions, dependencies, or imports in `configs/policy.ts`; rule messages, exports, adapters, and observable behavior remain unchanged.

4. Deviation findings

none