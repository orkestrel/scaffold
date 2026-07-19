import { createContract, seededRandom } from '@orkestrel/contract'
import {
	artifactShape,
	blueprint,
	blueprintShape,
	dependency,
	dependencyShape,
	isBlueprint,
	isSyncReport,
	memberShape,
	overrideShape,
	planShape,
	syncReportShape,
} from '@src/core'
import { describe, expect, it } from 'vitest'

// blueprintShape / planShape (and their sibling section shapes) compiled
// through createContract: guard/parser/schema/generator lockstep — the
// generator's output always satisfies the shape's own guard, across many
// deterministic seeds, and a generated Blueprint satisfies isBlueprint.

const shapes = {
	dependency: dependencyShape,
	override: overrideShape,
	member: memberShape,
	artifact: artifactShape,
	blueprint: blueprintShape,
	plan: planShape,
	syncReport: syncReportShape,
} as const

describe.each(Object.entries(shapes))('%s shape — contract lockstep', (_name, build) => {
	it('emits a JSON Schema of type object', () => {
		const contract = createContract(build())

		expect(contract.schema.type).toBe('object')
	})

	it('every generated value across 25 deterministic seeds satisfies is()', () => {
		const contract = createContract(build())

		for (let seed = 0; seed < 25; seed += 1) {
			const random = seededRandom(seed)
			const value = contract.generate(random)

			expect(contract.is(value)).toBe(true)
		}
	})

	it('parse() round-trips a generated (guard-valid) value unchanged', () => {
		const contract = createContract(build())
		const value = contract.generate(seededRandom(7))

		expect(contract.parse(value)).toEqual(value)
	})

	it('generate() is deterministic for a fixed seed', () => {
		const contract = createContract(build())

		expect(contract.generate(seededRandom(11))).toEqual(contract.generate(seededRandom(11)))
	})
})

describe('blueprintShape — generated blueprints satisfy isBlueprint', () => {
	it('a generated Blueprint round-trips the higher-level isBlueprint guard too', () => {
		const contract = createContract(blueprintShape())

		for (let seed = 0; seed < 25; seed += 1) {
			const value = contract.generate(seededRandom(seed))

			expect(isBlueprint(value)).toBe(true)
		}
	})
})

describe('blueprintShape — a hand-built blueprint with peers (one optional) and extras', () => {
	it('satisfies is() and round-trips through parse() unchanged', () => {
		const contract = createContract(blueprintShape())
		const value = blueprint('router', {
			peers: [
				dependency('@orkestrel/contract', '^0.0.5'),
				dependency('@orkestrel/emitter', '^0.0.2', true),
			],
			extras: [dependency('@orkestrel/database', '^0.0.9')],
		})

		expect(contract.is(value)).toBe(true)
		expect(contract.parse(value)).toEqual(value)
		expect(isBlueprint(value)).toBe(true)
	})
})

describe('syncReportShape — generated reports satisfy isSyncReport', () => {
	it('a generated SyncReport round-trips the higher-level isSyncReport guard too', () => {
		const contract = createContract(syncReportShape())

		for (let seed = 0; seed < 25; seed += 1) {
			const value = contract.generate(seededRandom(seed))

			expect(isSyncReport(value)).toBe(true)
		}
	})
})

describe('syncReportShape — GuideSync / VersionSync note round-trips', () => {
	it('a report with note present on a failed guide/version satisfies is() and round-trips through parse()', () => {
		const contract = createContract(syncReportShape())
		const value = {
			target: '.',
			guides: [
				{
					name: '@orkestrel/contract',
					path: 'guides/src/contract.md',
					content: '',
					freshness: 'failed' as const,
					note: 'HTTP 500',
				},
			],
			versions: [
				{
					name: '@orkestrel/contract',
					range: '^0.0.5',
					// `latest` is `stringShape({ min: 1 })` — a failed VersionSync's
					// unknown latest is represented by a placeholder, never `''`.
					latest: 'unknown',
					freshness: 'failed' as const,
					note: 'fetch failed: ECONNREFUSED',
				},
			],
			clean: false,
			failed: 2,
		}

		expect(contract.is(value)).toBe(true)
		expect(contract.parse(value)).toEqual(value)
		expect(isSyncReport(value)).toBe(true)
	})

	it('a report with note absent on a current guide/version satisfies is() and round-trips through parse()', () => {
		const contract = createContract(syncReportShape())
		const value = {
			target: '.',
			guides: [
				{
					name: '@orkestrel/contract',
					path: 'guides/src/contract.md',
					content: '# Contract Guide\n',
					freshness: 'current' as const,
				},
			],
			versions: [
				{
					name: '@orkestrel/contract',
					range: '^0.0.5',
					latest: '0.0.5',
					freshness: 'current' as const,
				},
			],
			clean: true,
			failed: 0,
		}

		expect(contract.is(value)).toBe(true)
		expect(contract.parse(value)).toEqual(value)
		expect(isSyncReport(value)).toBe(true)
	})
})
