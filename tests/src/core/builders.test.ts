import {
	blueprint,
	dependency,
	isBlueprint,
	isDependency,
	isMember,
	isOverride,
	member,
	override,
} from '@src/core'
import { describe, expect, it } from 'vitest'

// The small builder functions — dependency / override / member / blueprint —
// each a fresh-record factory whose output round-trips its exact-record guard.

describe('dependency', () => {
	it('builds a Dependency with both fields set', () => {
		const result = dependency('@orkestrel/contract', '^0.0.5')

		expect(result).toEqual({ name: '@orkestrel/contract', range: '^0.0.5' })
	})

	it('round-trips the isDependency exact-record guard', () => {
		expect(isDependency(dependency('@orkestrel/contract', '^0.0.5'))).toBe(true)
	})
})

describe('override', () => {
	it('builds an Override with both fields set', () => {
		const result = override('README.md', '# router\n')

		expect(result).toEqual({ path: 'README.md', content: '# router\n' })
	})

	it('round-trips the isOverride exact-record guard', () => {
		expect(isOverride(override('README.md', '# router\n'))).toBe(true)
	})
})

describe('member', () => {
	it('defaults surface to core when omitted', () => {
		const result = member('RouterOptions', 'type', 'Options for creating a Router.')

		expect(result).toEqual({
			name: 'RouterOptions',
			category: 'type',
			summary: 'Options for creating a Router.',
			surface: 'core',
		})
	})

	it('honors an explicit surface', () => {
		const result = member('Router', 'entity', 'The Router entity.', 'browser')

		expect(result.surface).toBe('browser')
	})

	it('round-trips the isMember exact-record guard', () => {
		expect(isMember(member('Router', 'entity', 'The Router entity.'))).toBe(true)
		expect(isMember(member('Router', 'entity', 'The Router entity.', 'server'))).toBe(true)
	})
})

describe('blueprint', () => {
	it('fills every default when only a name is given', () => {
		const result = blueprint('router')

		expect(result.name).toBe('router')
		expect(result.keywords).toEqual([])
		expect(result.surfaces).toEqual(['core'])
		expect(result.dependencies).toEqual([])
		expect(result.version).toBe('0.0.1')
		expect(result.engines).toBe('>=22')
		expect(result.overrides).toEqual([])
	})

	it('omits description entirely when absent (own-key check, not just undefined)', () => {
		const result = blueprint('router')

		expect(Object.hasOwn(result, 'description')).toBe(false)
	})

	it('includes description when supplied', () => {
		const result = blueprint('router', { description: 'A router.' })

		expect(result.description).toBe('A router.')
		expect(Object.hasOwn(result, 'description')).toBe(true)
	})

	it('honors every explicit option over its default', () => {
		const result = blueprint('router', {
			keywords: ['routing'],
			surfaces: ['core', 'server'],
			dependencies: [dependency('@orkestrel/contract', '^0.0.5')],
			version: '1.2.3',
			engines: '>=24',
			overrides: [override('README.md', 'hi')],
		})

		expect(result.keywords).toEqual(['routing'])
		expect(result.surfaces).toEqual(['core', 'server'])
		expect(result.dependencies).toEqual([dependency('@orkestrel/contract', '^0.0.5')])
		expect(result.version).toBe('1.2.3')
		expect(result.engines).toBe('>=24')
		expect(result.overrides).toEqual([override('README.md', 'hi')])
	})

	it('round-trips the isBlueprint exact-record guard for the bare default', () => {
		expect(isBlueprint(blueprint('router'))).toBe(true)
	})

	it('round-trips the isBlueprint exact-record guard with description present', () => {
		expect(isBlueprint(blueprint('router', { description: 'A router.' }))).toBe(true)
	})

	it('round-trips the isBlueprint exact-record guard with every field populated', () => {
		const full = blueprint('router', {
			description: 'A router.',
			keywords: ['routing'],
			surfaces: ['core', 'browser', 'server'],
			dependencies: [dependency('@orkestrel/contract', '^0.0.5')],
			version: '1.2.3',
			engines: '>=24',
			overrides: [override('README.md', 'hi')],
		})

		expect(isBlueprint(full)).toBe(true)
	})
})
