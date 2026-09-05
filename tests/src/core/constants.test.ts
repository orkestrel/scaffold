import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { isRecord, isString } from '@orkestrel/contract'
import {
	APP_BROWSER_DEV_DEPENDENCIES,
	APP_DEV_DEPENDENCIES,
	APP_SERVER_DEV_DEPENDENCIES,
	BASE_DEV_DEPENDENCIES,
	blueprintToDevDependencies,
	DECLARATION_DEV_DEPENDENCIES,
	extractRangeMajor,
	MAX_REGISTRY_BYTES,
	MAX_TOTAL_REGISTRY_BYTES,
	matchesRange,
	ORKESTREL_RANGE_PATTERN,
	SHOWCASE_DEV_DEPENDENCIES,
	SOURCE_BROWSER_DEV_DEPENDENCIES,
} from '@src/core'
import { buildBlueprint } from '../../setup.js'
import { describe, expect, it } from 'vitest'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')

// A floor is a caret over a whole `major.minor.patch` version: the newest the
// registry served when the floor was last raised. A bare `^6` loses the minor
// and patch an offline generation would otherwise propagate as `6.0.0`, a `~`
// pins the wrong axis, a bare version pins one release, and a prerelease is not
// a floor anyone runs. Fleet rows answer to `ORKESTREL_RANGE_PATTERN` instead,
// because a `0.x` caret means something different.
const TOOLCHAIN_RANGE_PATTERN = /^\^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/

// Every shared table a generated workspace can receive, labelled so a failure
// names the table it came from rather than the row alone.
const TABLES = [
	['base', BASE_DEV_DEPENDENCIES],
	['declaration', DECLARATION_DEV_DEPENDENCIES],
	['source browser', SOURCE_BROWSER_DEV_DEPENDENCIES],
	['app', APP_DEV_DEPENDENCIES],
	['app browser', APP_BROWSER_DEV_DEPENDENCIES],
	['app server', APP_SERVER_DEV_DEPENDENCIES],
	['showcase', SHOWCASE_DEV_DEPENDENCIES],
] as const

// The manifest is read from disk as text here. The tables derive from the same
// file through a compile-time JSON import, so the two answers arrive by
// different mechanisms and can disagree.
function readManifestRecord(): Readonly<Record<string, unknown>> {
	const parsed: unknown = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
	if (!isRecord(parsed)) throw new Error('The package manifest is not a record')
	return parsed
}

function readManifestName(): string {
	const name = readManifestRecord().name
	if (!isString(name)) throw new Error('The package manifest declares no name')
	return name
}

// Both sections, because a table row derives from whichever one declares it.
function readManifestRanges(): Readonly<Record<string, string>> {
	const manifest = readManifestRecord()
	const ranges: Record<string, string> = {}
	for (const section of [manifest.dependencies, manifest.devDependencies]) {
		if (!isRecord(section)) continue
		for (const [name, range] of Object.entries(section)) {
			if (isString(range)) ranges[name] = range
		}
	}
	return ranges
}

// The union of every table, with the self-pin removed: it derives from the
// manifest's `version` field rather than from a declaration, so it is not a row
// the manifest could declare.
function selectSeededNames(): readonly string[] {
	const declared = readManifestRanges()
	const own = readManifestName()
	const seeded = new Set<string>()
	for (const [, table] of TABLES) {
		for (const name of Object.keys(table)) {
			if (name === own || declared[name] !== undefined) continue
			seeded.add(name)
		}
	}
	return [...seeded].sort()
}

describe('shared dependency tables', () => {
	// Scaffold installs most table rows itself, so those derive. The rest are
	// seeds: a supported major scaffold does not run, held at the newest triple
	// the registry served when it was written. Naming the set is what makes a row
	// entering or leaving the manifest visible — a newly installed row stops
	// being a seed, and a removed one starts.
	it('seeds exactly the rows the manifest does not declare', () => {
		expect(selectSeededNames()).toStrictEqual([
			'@orkestrel/middleware',
			'@orkestrel/router',
			'@orkestrel/server',
			'@vitejs/plugin-vue',
			'vite-plugin-singlefile',
			'vue',
			'vue-tsc',
		])
	})

	// The control the preceding claim needs: a row the manifest does declare is
	// not a seed. Without it the set could be every row and still read as exact.
	it('leaves a manifest-declared row out of the seeded set', () => {
		expect(BASE_DEV_DEPENDENCIES['@orkestrel/guide']).toBeDefined()
		expect(readManifestRanges()['@orkestrel/guide']).toBeDefined()
		expect(selectSeededNames()).not.toContain('@orkestrel/guide')
	})

	it('derives every manifest-backed row from the manifest entry of the same name', () => {
		const declared = readManifestRanges()
		const mismatched: string[] = []
		for (const [label, table] of TABLES) {
			for (const [name, range] of Object.entries(table)) {
				const expected = declared[name]
				if (expected !== undefined && range !== expected) {
					mismatched.push(`${label} ${name}: ${range}, manifest ${expected}`)
				}
			}
		}
		expect(mismatched).toStrictEqual([])
	})

	// One floor form across every table, whether the row derives or is seeded. A
	// derived row can only carry what the manifest carries, so the manifest is
	// held to the same form below.
	it('carries a full-triple caret on every foreign table row', () => {
		const offForm: string[] = []
		for (const [label, table] of TABLES) {
			for (const [name, range] of Object.entries(table)) {
				const pattern = name.startsWith('@orkestrel/')
					? ORKESTREL_RANGE_PATTERN
					: TOOLCHAIN_RANGE_PATTERN
				if (!pattern.test(range)) offForm.push(`${label} ${name}: ${range}`)
			}
		}
		expect(offForm).toStrictEqual([])
	})

	it('carries a full-triple caret on every foreign row of its own manifest', () => {
		const offForm: string[] = []
		for (const [name, range] of Object.entries(readManifestRanges())) {
			if (name.startsWith('@orkestrel/')) continue
			if (!TOOLCHAIN_RANGE_PATTERN.test(range)) offForm.push(`${name}: ${range}`)
		}
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

	// The range a workspace receives is the emitted one, so it is read there rather
	// than from the table the emitter read. A workspace whose gate is `tsc` takes the
	// shared range.
	it('emits the shared TypeScript range at the 7 major', () => {
		const emitted = blueprintToDevDependencies(buildBlueprint()).typescript
		if (emitted === undefined)
			throw new Error('The emitted development dependencies carry no TypeScript')
		expect(extractRangeMajor(emitted)).toBe(7)
		expect(matchesRange(emitted, '7.0.2')).toBe(true)
		expect(matchesRange(emitted, '6.0.3')).toBe(false)
	})

	// The fork, and the control the assertion above needs: a workspace selecting
	// `app/browser` checks its Vue sources with `vue-tsc`, which has no TypeScript 7
	// support, so it receives the ceiling instead of the shared range. The ceiling is
	// a floor of the same form, so it answers to the same pattern.
	it('holds a Vue browser workspace at the TypeScript range vue-tsc supports', () => {
		const emitted = blueprintToDevDependencies(buildBlueprint({ app: ['browser'] })).typescript
		if (emitted === undefined)
			throw new Error('The emitted development dependencies carry no TypeScript')
		expect(extractRangeMajor(emitted)).toBe(6)
		expect(matchesRange(emitted, '7.0.2')).toBe(false)
		expect(TOOLCHAIN_RANGE_PATTERN.test(emitted)).toBe(true)
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
