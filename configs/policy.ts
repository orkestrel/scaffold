/** The expression fields inspected by the policy rules. */
export interface PolicyExpression {
	readonly type: string
	readonly name?: string
	readonly value?: unknown
	readonly object?: PolicyExpression
	readonly property?: PolicyExpression
	readonly computed?: boolean
}

/** The call-expression fields inspected by the policy rules. */
export interface PolicyCall {
	readonly type: 'CallExpression'
	readonly callee: PolicyExpression
}

/** The class-member fields inspected by the policy rules. */
export interface PolicyClassMember {
	readonly type: string
	readonly accessibility?: 'private' | 'protected' | 'public' | null
}

/** One diagnostic emitted by a policy rule. */
export interface PolicyDiagnostic {
	readonly node: PolicyCall | PolicyClassMember
	readonly messageId: string
	readonly data?: Readonly<Record<string, string>>
}

/** The Oxlint context operations used by the policy rules. */
export interface PolicyContext {
	report(diagnostic: PolicyDiagnostic): void
}

/** The rule documentation fields supplied to Oxlint. */
export interface PolicyDocs {
	readonly description: string
}

/** The rule metadata fields supplied to Oxlint. */
export interface PolicyMeta {
	readonly type: 'problem'
	readonly docs: PolicyDocs
	readonly messages: Readonly<Record<string, string>>
}

/** The Oxlint visitor entries used by the policy rules. */
export interface PolicyVisitor {
	readonly CallExpression?: (node: PolicyCall) => void
	readonly MethodDefinition?: (node: PolicyClassMember) => void
	readonly PropertyDefinition?: (node: PolicyClassMember) => void
	readonly AccessorProperty?: (node: PolicyClassMember) => void
	readonly TSAbstractMethodDefinition?: (node: PolicyClassMember) => void
	readonly TSAbstractPropertyDefinition?: (node: PolicyClassMember) => void
	readonly TSAbstractAccessorProperty?: (node: PolicyClassMember) => void
}

/** The complete behavior exposed by one policy rule. */
export interface PolicyRuleInterface {
	readonly meta: PolicyMeta
	create(context: PolicyContext): PolicyVisitor
}

/** Report banned calls on the named Vitest and Jest framework objects. */
export function reportMocking(context: PolicyContext, node: PolicyCall): void {
	const callee = node.callee
	if (
		callee.type !== 'MemberExpression' ||
		callee.object === undefined ||
		callee.property === undefined ||
		callee.computed === undefined
	) {
		return
	}

	const object = callee.object
	if (object.type !== 'Identifier' || (object.name !== 'vi' && object.name !== 'jest')) {
		return
	}

	const property = callee.property
	let member: string | undefined
	if (callee.computed) {
		if (property.type === 'Literal' && typeof property.value === 'string') {
			member = property.value
		}
	} else if (property.type === 'Identifier') {
		member = property.name
	}

	switch (member) {
		case 'mock':
		case 'doMock':
		case 'unstable_mockModule':
			context.report({ node, messageId: 'mock' })
			break
		case 'fn':
		case 'spyOn':
			context.report({ node, messageId: 'spy' })
			break
		case 'useFakeTimers':
		case 'setSystemTime':
			context.report({ node, messageId: 'clock' })
			break
		case 'stubGlobal':
		case 'stubEnv':
			context.report({ node, messageId: 'stub' })
			break
	}
}

/** Report TypeScript privacy keywords on class members. */
export function reportPrivacy(context: PolicyContext, node: PolicyClassMember): void {
	if (node.accessibility === 'private' || node.accessibility === 'protected') {
		context.report({
			node,
			messageId: 'keyword',
			data: { keyword: node.accessibility },
		})
	}
}

/** Ban framework mocking, spying, fake clocks, and global or environment stubs. */
export const MOCKING_RULE: PolicyRuleInterface = {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Disallow named vi and jest mocking APIs; a renamed import alias escapes this name-based rule.',
		},
		messages: {
			mock: 'Replace module mocking with a real injected collaborator; a missing seam is a missing injection point, not an untestable truth.',
			spy: 'Use createRecorder from @orkestrel/test; framework spies and mock functions are banned.',
			clock:
				'Use real short timers and waitForDelay from @orkestrel/test; never replace the host clock.',
			stub: 'Drive the real implementation or a protocol-faithful fixture; never stub globals or environment.',
		},
	},
	create(context) {
		return {
			CallExpression: (node) => reportMocking(context, node),
		}
	},
}

/** Ban compile-time-only TypeScript privacy keywords on class members. */
export const PRIVACY_RULE: PolicyRuleInterface = {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Disallow private and protected class members in favor of runtime-enforced # privacy.',
		},
		messages: {
			keyword: 'Use runtime-enforced # privacy; TypeScript {{keyword}} is compile-time-only.',
		},
	},
	create(context) {
		return {
			MethodDefinition: (node) => reportPrivacy(context, node),
			PropertyDefinition: (node) => reportPrivacy(context, node),
			AccessorProperty: (node) => reportPrivacy(context, node),
			TSAbstractMethodDefinition: (node) => reportPrivacy(context, node),
			TSAbstractPropertyDefinition: (node) => reportPrivacy(context, node),
			TSAbstractAccessorProperty: (node) => reportPrivacy(context, node),
		}
	},
}

/** The workspace Oxlint plugin. */
export default {
	meta: { name: 'policy' },
	rules: {
		'no-mocking': MOCKING_RULE,
		'no-keyword-privacy': PRIVACY_RULE,
	},
}
