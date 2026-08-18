1. `git status --porcelain`

```text
 M .oxlintrc.json
 M src/core/constants.ts
?? .orkestrel/scaffold/antislop-audit/unit-plugin-brief.md
?? .orkestrel/scaffold/antislop-audit/unit-rules-brief.md
?? configs/policy.ts
```

The two `.orkestrel/` files were pre-existing.

Full owned-file diff:

```diff
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
diff --git a/configs/policy.ts b/configs/policy.ts
new file mode 100644
index 0000000..0189746
--- /dev/null
+++ b/configs/policy.ts
@@ -0,0 +1,175 @@
+/** The expression fields inspected by the policy rules. */
+export interface PolicyExpression {
+	readonly type: string
+	readonly name?: string
+	readonly value?: unknown
+	readonly object?: PolicyExpression
+	readonly property?: PolicyExpression
+	readonly computed?: boolean
+}
+
+/** The call-expression fields inspected by the policy rules. */
+export interface PolicyCall {
+	readonly type: 'CallExpression'
+	readonly callee: PolicyExpression
+}
+
+/** The class-member fields inspected by the policy rules. */
+export interface PolicyClassMember {
+	readonly type: string
+	readonly accessibility?: 'private' | 'protected' | 'public' | null
+}
+
+/** One diagnostic emitted by a policy rule. */
+export interface PolicyDiagnostic {
+	readonly node: PolicyCall | PolicyClassMember
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
+	readonly CallExpression?: (node: PolicyCall) => void
+	readonly MethodDefinition?: (node: PolicyClassMember) => void
+	readonly PropertyDefinition?: (node: PolicyClassMember) => void
+	readonly AccessorProperty?: (node: PolicyClassMember) => void
+	readonly TSAbstractMethodDefinition?: (node: PolicyClassMember) => void
+	readonly TSAbstractPropertyDefinition?: (node: PolicyClassMember) => void
+	readonly TSAbstractAccessorProperty?: (node: PolicyClassMember) => void
+}
+
+/** The complete behavior exposed by one policy rule. */
+export interface PolicyRuleInterface {
+	readonly meta: PolicyMeta
+	create(context: PolicyContext): PolicyVisitor
+}
+
+/** Report banned calls on the named Vitest and Jest framework objects. */
+export function reportMocking(context: PolicyContext, node: PolicyCall): void {
+	const callee = node.callee
+	if (
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
+	} else if (property.type === 'Identifier') {
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
+export function reportPrivacy(context: PolicyContext, node: PolicyClassMember): void {
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
+			clock: 'Use real short timers and waitForDelay from @orkestrel/test; never replace the host clock.',
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
+			description: 'Disallow private and protected class members in favor of runtime-enforced # privacy.',
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
```

2. Fixture runs

Violating fixture:

```text
node_modules/.bin/oxlint --config .oxlintrc.json --format agent /tmp/plugin-fixture/violations.ts
```

Exit `1`:

```text
/tmp/plugin-fixture/violations.ts:11:2: error typescript(explicit-member-accessibility): Public accessibility modifier on method definition visible. help: Remove the 'public' modifier. Members are public by default, so the modifier is redundant.
/tmp/plugin-fixture/violations.ts:13:14: error typescript(parameter-properties): Property value should be declared as a class property. help: Remove the parameter modifier and declare this member on the class instead.
/tmp/plugin-fixture/violations.ts:1:1: error policy(no-mocking): Replace module mocking with a real injected collaborator; a missing seam is a missing injection point, not an untestable truth.
/tmp/plugin-fixture/violations.ts:2:1: error policy(no-mocking): Use createRecorder from @orkestrel/test; framework spies and mock functions are banned.
/tmp/plugin-fixture/violations.ts:3:1: error policy(no-mocking): Use real short timers and waitForDelay from @orkestrel/test; never replace the host clock.
/tmp/plugin-fixture/violations.ts:4:1: error policy(no-mocking): Drive the real implementation or a protocol-faithful fixture; never stub globals or environment.
/tmp/plugin-fixture/violations.ts:7:2: error policy(no-keyword-privacy): Use runtime-enforced # privacy; TypeScript private is compile-time-only.
/tmp/plugin-fixture/violations.ts:9:2: error policy(no-keyword-privacy): Use runtime-enforced # privacy; TypeScript protected is compile-time-only.
/tmp/plugin-fixture/violations.ts:17:2: error policy(no-keyword-privacy): Use runtime-enforced # privacy; TypeScript protected is compile-time-only.
/tmp/plugin-fixture/violations.ts:18:2: error policy(no-keyword-privacy): Use runtime-enforced # privacy; TypeScript protected is compile-time-only.
/tmp/plugin-fixture/violations.ts:19:2: error policy(no-keyword-privacy): Use runtime-enforced # privacy; TypeScript protected is compile-time-only.
```

`policy/no-mocking` messageIds by fixture line:

```text
1 mock
2 spy
3 clock
4 stub
```

`policy/no-keyword-privacy` emitted `keyword` for both `private` and `protected`. Lines 17–19 prove the distinct `TSAbstractMethodDefinition`, `TSAbstractPropertyDefinition`, and `TSAbstractAccessorProperty` visitors fire.

Clean fixture:

```text
node_modules/.bin/oxlint --config .oxlintrc.json --format agent /tmp/plugin-fixture/clean.ts
```

Exit `0`, no output.

3. Gate exit-code truth

```text
npm run lint:check
exit 0

> @orkestrel/scaffold@0.0.40 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

```text
npm run format:check
exit 1

> @orkestrel/scaffold@0.0.40 format:check
> oxfmt --config .oxfmtrc.json --check .

Checking formatting...

.orkestrel/fleet/BACKLOG.md
.orkestrel/fleet/briefs/toolbox-fix.md
.orkestrel/scaffold/antislop-audit/adoption-report.md
.orkestrel/scaffold/antislop-audit/design-lanes-evidence.md
.orkestrel/scaffold/antislop-audit/design-objective-report.md
.orkestrel/scaffold/antislop-audit/design-subjective-report.md
.orkestrel/scaffold/antislop-audit/unit-plugin-brief.md
configs/policy.ts

Format issues found in above 8 files. Run without `--check` to fix.
Finished in 8924ms on 216 files using 4 threads.
```

```text
npm run check
not run; the deviation contract required an immediate stop after format:check reported off-limits findings
```

Dependency files remain byte-identical:

```text
b0e2978d0bdbdf9906f4926d6cbd1e39f37040db775c39befb7010c46ece353e  package.json
7fe60c717786b0e4c7c060c84378e33228e2b1f6e9fa515a4dd6df9267ca9d54  package-lock.json
```

4. Deviation findings

Expected: all three whole-tree gates exit `0`.

Found: `format:check` exited `1`. It reported `configs/policy.ts` and seven off-limits `.orkestrel/` files this unit did not introduce.

Exact evidence: the `format:check` output above.

Done or not done: implementation and fixture proof are done. Acceptance is not done. No formatting, off-limits edits, or remaining gate were performed after the required stop.

Hypothesis: the campaign artifacts were already formatter-red, while the new plugin also needs formatter convergence.