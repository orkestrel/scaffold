import type { SyncReport } from '@src/core'
import { createContract, seededRandom } from '@orkestrel/contract'
import {
	blueprint,
	blueprintShape,
	dependency,
	isBlueprint,
	isSyncReport,
	syncReportShape,
} from '@src/core'
import { describe, expect, it } from 'vitest'
import { CONTRACT_SHAPES, GENERATABLE_CONTRACT_SHAPES } from '../../setup.js'

// blueprintShape / planShape (and their sibling section shapes) compiled
// through createContract: guard/parser/schema/generator lockstep — the
// generator's output always satisfies the shape's own guard, across many
// deterministic seeds, and a generated Blueprint satisfies isBlueprint.

describe.each(Object.entries(CONTRACT_SHAPES))('%s shape — contract lockstep', (name, build) => {
	it('emits the expected root JSON Schema', () => {
		const contract = createContract(build())

		const valid =
			name === 'artifact' ? contract.schema.anyOf?.length === 2 : contract.schema.type === 'object'
		expect(valid).toBe(true)
	})
})

describe.each(Object.entries(GENERATABLE_CONTRACT_SHAPES))(
	'%s generatable shape — contract lockstep',
	(name, build) => {
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
	},
)

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

describe('blueprintShape — structural axes', () => {
	it.each([
		{ bin: false, integration: false, service: false },
		{ bin: false, integration: false, service: true },
		{ bin: false, integration: true, service: false },
		{ bin: false, integration: true, service: true },
		{ bin: true, integration: false, service: false },
		{ bin: true, integration: false, service: true },
		{ bin: true, integration: true, service: false },
		{ bin: true, integration: true, service: true },
	])('guard/parser round-trips $bin/$integration/$service', (axes) => {
		const contract = createContract(blueprintShape())
		const value = blueprint('axes', axes)

		expect(contract.is(value)).toBe(true)
		expect(contract.parse(value)).toEqual(value)
		expect(isBlueprint(value)).toBe(true)
	})

	it.each([false, true])('guard/parser round-trips global: %s', (global) => {
		const contract = createContract(blueprintShape())
		const value = blueprint('browser-fixture', { src: ['browser'], global })

		expect(contract.is(value)).toBe(true)
		expect(contract.parse(value)).toEqual(value)
		expect(isBlueprint(value)).toBe(true)
	})
})

describe('syncReportShape — pattern boundary', () => {
	it('accepts only the documented target-aware baselines', () => {
		const contract = createContract(syncReportShape())
		const absent = {
			target: '.',
			guides: [
				{
					name: '@orkestrel/contract',
					path: 'guides/src/contract.md',
					content: '# contract',
					freshness: 'behind',
					baseline: 'absent',
				},
			],
			versions: [],
			clean: false,
			failed: 0,
		}
		const digest = structuredClone(absent)
		const guide = digest.guides[0]
		if (guide === undefined) throw new Error('expected a guide fixture')
		guide.baseline = '0'.repeat(64)
		const malformed = structuredClone(absent)
		const malformedGuide = malformed.guides[0]
		if (malformedGuide === undefined) throw new Error('expected a guide fixture')
		malformedGuide.baseline = 'not-a-digest'

		expect(contract.is(absent)).toBe(true)
		expect(contract.is(digest)).toBe(true)
		expect(contract.is(malformed)).toBe(false)
		expect(isSyncReport(absent)).toBe(true)
		expect(isSyncReport(digest)).toBe(true)
		expect(isSyncReport(malformed)).toBe(false)
	})
})

describe('syncReportShape — GuideSync / VersionSync note round-trips', () => {
	it('a report with note present on a failed guide/version satisfies is() and round-trips through parse()', () => {
		const contract = createContract(syncReportShape())
		const value: SyncReport = {
			target: '.',
			guides: [
				{
					name: '@orkestrel/contract',
					path: 'guides/src/contract.md',
					content: '',
					freshness: 'failed',
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
					freshness: 'failed',
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
		const value: SyncReport = {
			target: '.',
			guides: [
				{
					name: '@orkestrel/contract',
					path: 'guides/src/contract.md',
					content: '# Contract Guide\n',
					freshness: 'current',
				},
			],
			versions: [
				{
					name: '@orkestrel/contract',
					range: '^0.0.5',
					latest: '0.0.5',
					freshness: 'current',
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
