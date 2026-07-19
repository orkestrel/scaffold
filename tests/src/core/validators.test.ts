import {
	blueprint,
	dependency,
	isArtifact,
	isBlueprint,
	isDependency,
	isMember,
	isOverride,
	isPlan,
	member,
	override,
	parseBlueprint,
	parsePlan,
	pinPlan,
} from '@src/core'
import { describe, expect, it } from 'vitest'

// Every exact-record guard: valid / invalid / adversarial junk, off-vocabulary
// literal rejection, and the parse↔guard soundness of parseBlueprint / parsePlan.

describe('isDependency', () => {
	it('accepts a valid Dependency', () => {
		expect(isDependency(dependency('@orkestrel/contract', '^0.0.5'))).toBe(true)
	})

	it('rejects an empty name or range', () => {
		expect(isDependency({ name: '', range: '^0.0.5' })).toBe(false)
		expect(isDependency({ name: '@orkestrel/contract', range: '' })).toBe(false)
	})

	it('rejects adversarial junk', () => {
		expect(isDependency(null)).toBe(false)
		expect(isDependency(undefined)).toBe(false)
		expect(isDependency('dependency')).toBe(false)
		expect(isDependency(42)).toBe(false)
		expect(isDependency([])).toBe(false)
		expect(isDependency({})).toBe(false)
	})

	it('rejects an object carrying an extra key (exact-record)', () => {
		expect(isDependency({ name: 'x', range: '^1', extra: true })).toBe(false)
	})
})

describe('isOverride', () => {
	it('accepts a valid Override', () => {
		expect(isOverride(override('README.md', 'hi'))).toBe(true)
	})

	it('rejects an empty path or content', () => {
		expect(isOverride({ path: '', content: 'hi' })).toBe(false)
		expect(isOverride({ path: 'README.md', content: '' })).toBe(false)
	})

	it('rejects adversarial junk', () => {
		expect(isOverride(null)).toBe(false)
		expect(isOverride([1, 2])).toBe(false)
		expect(isOverride(() => {})).toBe(false)
	})
})

describe('isMember', () => {
	it('accepts a valid Member', () => {
		expect(isMember(member('Router', 'entity', 'The Router entity.'))).toBe(true)
	})

	it('rejects an off-vocabulary category', () => {
		expect(isMember({ name: 'Router', category: 'widget', summary: 'x', surface: 'core' })).toBe(
			false,
		)
	})

	it('rejects an off-vocabulary surface', () => {
		expect(isMember({ name: 'Router', category: 'entity', summary: 'x', surface: 'client' })).toBe(
			false,
		)
	})

	it('rejects adversarial junk', () => {
		expect(isMember(null)).toBe(false)
		expect(isMember('member')).toBe(false)
		expect(isMember({ name: 'Router' })).toBe(false)
	})
})

describe('isBlueprint', () => {
	it('accepts a valid Blueprint', () => {
		expect(isBlueprint(blueprint('router'))).toBe(true)
	})

	it('rejects an empty surfaces array', () => {
		expect(isBlueprint({ ...blueprint('router'), surfaces: [] })).toBe(false)
	})

	it('rejects an off-vocabulary surface literal', () => {
		expect(isBlueprint({ ...blueprint('router'), surfaces: ['mobile'] })).toBe(false)
	})

	it('rejects a malformed nested dependency', () => {
		expect(
			isBlueprint({
				...blueprint('router'),
				dependencies: [{ name: '', range: '^1' }],
			}),
		).toBe(false)
	})

	it('does NOT enforce NAME_PATTERN — that lives in validateBlueprint, not this shape', () => {
		expect(isBlueprint({ ...blueprint('Router Uppercase!'), name: 'Router Uppercase!' })).toBe(true)
	})

	it('rejects adversarial junk', () => {
		expect(isBlueprint(null)).toBe(false)
		expect(isBlueprint(42)).toBe(false)
		expect(isBlueprint([])).toBe(false)
		expect(isBlueprint('{}')).toBe(false)
	})
})

describe('isArtifact', () => {
	it('accepts a template artifact (content, no source)', () => {
		expect(
			isArtifact({ path: 'src/core/types.ts', group: 'source', origin: 'template', content: 'x' }),
		).toBe(true)
	})

	it('accepts a host artifact (source, no content)', () => {
		expect(
			isArtifact({ path: 'AGENTS.md', group: 'docs', origin: 'host', source: 'AGENTS.md' }),
		).toBe(true)
	})

	it('rejects an off-vocabulary group', () => {
		expect(isArtifact({ path: 'x', group: 'scripts', origin: 'host', source: 'x' })).toBe(false)
	})

	it('rejects an off-vocabulary origin', () => {
		expect(isArtifact({ path: 'x', group: 'docs', origin: 'generated', source: 'x' })).toBe(false)
	})

	it('rejects adversarial junk', () => {
		expect(isArtifact(null)).toBe(false)
		expect(isArtifact(true)).toBe(false)
	})
})

describe('isPlan', () => {
	it('accepts a pinned Plan', () => {
		const plan = pinPlan({ blueprint: blueprint('router'), groups: ['manifest'], artifacts: [] })

		expect(isPlan(plan)).toBe(true)
	})

	it('accepts an unpinned Plan (trace/hash optional)', () => {
		expect(isPlan({ blueprint: blueprint('router'), groups: ['manifest'], artifacts: [] })).toBe(
			true,
		)
	})

	it('rejects a malformed nested artifact', () => {
		expect(
			isPlan({
				blueprint: blueprint('router'),
				groups: ['manifest'],
				artifacts: [{ path: 'x', group: 'nowhere', origin: 'host' }],
			}),
		).toBe(false)
	})

	it('rejects adversarial junk', () => {
		expect(isPlan(null)).toBe(false)
		expect(isPlan(0)).toBe(false)
		expect(isPlan([])).toBe(false)
	})
})

describe('parseBlueprint', () => {
	it('round-trips a guard-valid value unchanged', () => {
		const value = blueprint('router')

		expect(parseBlueprint(value)).toEqual(value)
	})

	it('parses a JSON string', () => {
		const value = blueprint('router')

		expect(parseBlueprint(JSON.stringify(value))).toEqual(value)
	})

	it('returns undefined for malformed JSON text', () => {
		expect(parseBlueprint('{not json')).toBeUndefined()
	})

	it('returns undefined for an off-contract value', () => {
		expect(parseBlueprint({ name: 'router', surfaces: ['mobile'] })).toBeUndefined()
	})

	it('never throws on adversarial input', () => {
		expect(() => parseBlueprint(null)).not.toThrow()
		expect(() => parseBlueprint(42)).not.toThrow()
		expect(parseBlueprint(null)).toBeUndefined()
	})

	it('a value it parses always satisfies isBlueprint (soundness)', () => {
		const parsed = parseBlueprint(blueprint('router'))

		expect(parsed !== undefined && isBlueprint(parsed)).toBe(true)
	})
})

describe('parsePlan', () => {
	it('round-trips a guard-valid value unchanged', () => {
		const plan = pinPlan({ blueprint: blueprint('router'), groups: ['manifest'], artifacts: [] })

		expect(parsePlan(plan)).toEqual(plan)
	})

	it('parses a JSON string', () => {
		const plan = pinPlan({ blueprint: blueprint('router'), groups: ['manifest'], artifacts: [] })

		expect(parsePlan(JSON.stringify(plan))).toEqual(plan)
	})

	it('returns undefined for malformed JSON text', () => {
		expect(parsePlan('[[[')).toBeUndefined()
	})

	it('returns undefined for an off-contract value', () => {
		expect(parsePlan({ blueprint: 'not a blueprint', groups: [], artifacts: [] })).toBeUndefined()
	})

	it('a value it parses always satisfies isPlan (soundness)', () => {
		const plan = pinPlan({ blueprint: blueprint('router'), groups: ['manifest'], artifacts: [] })
		const parsed = parsePlan(plan)

		expect(parsed !== undefined && isPlan(parsed)).toBe(true)
	})
})
