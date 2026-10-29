import {
	BASE_DEV_DEPENDENCIES,
	blueprintToDevDependencies,
	createBlueprint,
	BROWSE_UPSTREAM,
	CAPTURE_DEV_DEPENDENCIES,
	CAPTURE_UPSTREAM,
	extractRangeMajor,
	MAX_REGISTRY_BYTES,
	MAX_TOTAL_REGISTRY_BYTES,
	matchesRange,
	ORKESTREL_RANGE_PATTERN,
	SEED_GUIDE_PATHS,
	SHOWCASE_DEV_DEPENDENCIES,
	TOOLCHAIN_HOLDS,
} from '@src/core'
import { buildBlueprint, DEPENDENCY_TABLES, TOOLCHAIN_RANGE_PATTERN } from '../../setup.js'
import { collectRuntimeClosure, readCheckoutRanges, selectSeededNames } from '../../setupServer.js'
import { describe, expect, it } from 'vitest'

describe('browse upstream', () => {
	// A re-pin of the browser package can move its closure, and the omission it
	// drives is only as current as this list.
	it('equals the installed runtime closure of the browser package', () => {
		expect(BROWSE_UPSTREAM).toStrictEqual(collectRuntimeClosure('@orkestrel/browser'))
		expect(Object.isFrozen(BROWSE_UPSTREAM)).toBe(true)
	})
})

describe('capture upstream', () => {
	it('freezes the sorted fleet closure and the capture package itself', () => {
		expect(CAPTURE_UPSTREAM).toStrictEqual([
			'@orkestrel/capture',
			'@orkestrel/contract',
			'@orkestrel/emitter',
			'@orkestrel/process',
			'@orkestrel/timeout',
		])
		expect(Object.isFrozen(CAPTURE_UPSTREAM)).toBe(true)
	})
})

describe('toolchain holds', () => {
	it('ties each framework hold to its planned floor and the manifest baseline', () => {
		const declared = readCheckoutRanges()
		expect(Object.keys(TOOLCHAIN_HOLDS)).toStrictEqual(['typescript'])
		for (const [name, hold] of Object.entries(TOOLCHAIN_HOLDS)) {
			const blueprint = createBlueprint('panel', {
				src: ['browser'],
				extensions: [{ surface: 'browser', name: hold.framework, axes: ['src'] }],
			})
			expect(blueprintToDevDependencies(blueprint)[name]).toBe(hold.range)
			expect(extractRangeMajor(hold.range)).toBe(6)
			expect(extractRangeMajor(declared[name] ?? '')).toBe(7)
			expect(hold.reason).toContain('@volar/typescript@2.4.30')
			expect(Object.isFrozen(hold)).toBe(true)
		}
		expect(Object.isFrozen(TOOLCHAIN_HOLDS)).toBe(true)
	})
})

describe('seed guide paths', () => {
	it('names the initial guide mirrors and freezes their membership', () => {
		expect(SEED_GUIDE_PATHS).toStrictEqual(['guides/guide.md', 'guides/scaffold.md'])
		expect(Object.isFrozen(SEED_GUIDE_PATHS)).toBe(true)
	})
})

describe('shared dependency tables', () => {
	it('keeps the capture seed frozen at its initial release floor', () => {
		expect(CAPTURE_DEV_DEPENDENCIES).toStrictEqual({ '@orkestrel/capture': '^0.0.1' })
		expect(Object.isFrozen(CAPTURE_DEV_DEPENDENCIES)).toBe(true)
	})

	// Scaffold installs most table rows itself, so those derive. The rest are
	// seeds: a supported major scaffold does not run, held at the newest triple
	// the registry served when it was written. Naming the set is what makes a row
	// entering or leaving the manifest visible — a newly installed row stops
	// being a seed, and a removed one starts.
	it('seeds exactly the rows the manifest does not declare', () => {
		expect(selectSeededNames()).toStrictEqual([
			'@orkestrel/capture',
			'@orkestrel/middleware',
			'@orkestrel/router',
			'@orkestrel/server',
			'@vitejs/plugin-vue',
			'sass',
			'vite-plugin-singlefile',
			'vue',
			'vue-tsc',
		])
	})

	// The control the preceding claim needs: a row the manifest does declare is
	// not a seed. Without it the set could be every row and still read as exact.
	it('leaves a manifest-declared row out of the seeded set', () => {
		expect(BASE_DEV_DEPENDENCIES['@orkestrel/guide']).toBeDefined()
		expect(readCheckoutRanges()['@orkestrel/guide']).toBeDefined()
		expect(selectSeededNames()).not.toContain('@orkestrel/guide')
	})

	it('derives every manifest-backed row from the manifest entry of the same name', () => {
		const declared = readCheckoutRanges()
		const mismatched = [...DEPENDENCY_TABLES].flatMap(([label, table]) =>
			Object.entries(table).flatMap(([name, range]) => {
				const expected = declared[name]
				return expected !== undefined && range !== expected
					? [`${label} ${name}: ${range}, manifest ${expected}`]
					: []
			}),
		)
		expect(mismatched).toStrictEqual([])
	})

	// One floor form across every table, whether the row derives or is seeded. A
	// derived row can only carry what the manifest carries, so the manifest is
	// held to the same form below.
	it('carries a full-triple caret on every foreign table row', () => {
		expect(SHOWCASE_DEV_DEPENDENCIES['vite-plugin-singlefile']).toBe('2.3.3')
		const offForm = [...DEPENDENCY_TABLES].flatMap(([label, table]) =>
			Object.entries(table).flatMap(([name, range]) => {
				if (label === 'showcase' && name === 'vite-plugin-singlefile') return []
				const pattern = name.startsWith('@orkestrel/')
					? ORKESTREL_RANGE_PATTERN
					: TOOLCHAIN_RANGE_PATTERN
				return pattern.test(range) ? [] : [`${label} ${name}: ${range}`]
			}),
		)
		expect(offForm).toStrictEqual([])
	})

	it('carries a full-triple caret on every foreign row of its own manifest', () => {
		const offForm = Object.entries(readCheckoutRanges()).flatMap(([name, range]) =>
			name.startsWith('@orkestrel/') || TOOLCHAIN_RANGE_PATTERN.test(range)
				? []
				: [`${name}: ${range}`],
		)
		expect(offForm).toStrictEqual([])
	})

	// The controls for the two claims above. The pattern must refuse the lazy
	// major-only floor the amendment replaced, the wrong pin axis, an exact
	// version, and a prerelease, and it must accept a major-zero floor — which is
	// where the toolchain the fleet formats with lives.
	it('refuses every range form that is not a full-triple caret', () => {
		expect(TOOLCHAIN_RANGE_PATTERN.test('^0.64.0')).toBe(true)
		expect(TOOLCHAIN_RANGE_PATTERN.test('^6')).toBe(false)
		expect(TOOLCHAIN_RANGE_PATTERN.test('^6.0')).toBe(false)
		expect(TOOLCHAIN_RANGE_PATTERN.test('~8.2.2')).toBe(false)
		expect(TOOLCHAIN_RANGE_PATTERN.test('8.2.2')).toBe(false)
		expect(TOOLCHAIN_RANGE_PATTERN.test('^6.0.0-beta.1')).toBe(false)
		expect(TOOLCHAIN_RANGE_PATTERN.test('>=6.0.0')).toBe(false)
	})

	// Every generated workspace receives this pin, and the fleet only admits a
	// caret below 1.0. The version it names derives from the manifest, so what is
	// left to prove is the shape that derivation produces.
	it('pins this package with the range shape the fleet accepts', () => {
		const pinned = BASE_DEV_DEPENDENCIES['@orkestrel/scaffold']
		if (pinned === undefined) throw new Error('The base development dependencies carry no scaffold')
		expect(ORKESTREL_RANGE_PATTERN.test(pinned)).toBe(true)
		expect(ORKESTREL_RANGE_PATTERN.test('^1.0.0')).toBe(false)
		expect(ORKESTREL_RANGE_PATTERN.test(pinned.slice(1))).toBe(false)
	})

	it('emits the manifest TypeScript 7 baseline without a Vue extension', () => {
		const emitted = blueprintToDevDependencies(buildBlueprint()).typescript
		if (emitted === undefined)
			throw new Error('The emitted development dependencies carry no TypeScript')
		expect(extractRangeMajor(emitted)).toBe(7)
		expect(matchesRange(emitted, '7.0.2')).toBe(true)
		expect(matchesRange(emitted, '6.0.3')).toBe(false)
	})
})

describe('registry read bounds', () => {
	it('leave the measured registry packuments and browser workspace set inside their bounds', () => {
		expect(MAX_REGISTRY_BYTES).toBe(32 * 1_024 * 1_024)
		expect(MAX_REGISTRY_BYTES).toBeGreaterThan(8_647_138)
		expect(MAX_TOTAL_REGISTRY_BYTES).toBe(96 * 1_024 * 1_024)
		expect(MAX_TOTAL_REGISTRY_BYTES).toBeGreaterThan(24 * 1_024 * 1_024)
	})
})
