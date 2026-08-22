import { describe, expect, it } from 'vitest'
import { requireValue } from '@orkestrel/test'
import { contentToHex, MAX_COLLECTION_ITEMS } from '@src/core'
import {
	computeDigest,
	isCatalogEntries,
	isDependencies,
	isDependencyNames,
	isDigest,
	isFilesystemPath,
	isHost,
	isInventory,
	isMirrors,
	isRepository,
	MAX_INVENTORY_PATHS,
} from '@src/server'
import { buildHostileCases, readKeyCount, selectHostileCase } from '../../setup.js'
import {
	buildBoundaryCases,
	buildHostManifest,
	buildServerGuardCases,
	FILESYSTEM_PATH_CASES,
	SCRATCH_PREFIX,
	WORKSPACE_ROOT,
} from '../../setupServer.js'
import { createScratch } from '@orkestrel/test/server'

describe('guard totality', () => {
	it('reports a real failure when the probe under it is not total', () => {
		const revoked = selectHostileCase('revoked proxy')
		const oversized = selectHostileCase('oversized array')
		// The negative control sits outside the population the matrix covers: a naive
		// reader rather than a total guard. It must break both halves of the matrix's
		// assertion — the throw and the verdict — or the matrix proves nothing.
		expect(() => readKeyCount(revoked.value)).toThrow(/revoked/u)
		expect(readKeyCount(oversized.value) > 0).toBe(true)
		expect(isInventory(revoked.value)).toBe(false)
	})

	for (const guardCase of buildServerGuardCases()) {
		it(`${guardCase.name} answers every hostile value without throwing`, () => {
			const hostileCases = buildHostileCases()
			for (const hostile of hostileCases) {
				expect(() => guardCase.guard(hostile.value)).not.toThrow()
				expect(typeof guardCase.guard(hostile.value)).toBe('boolean')
			}
			const observed = hostileCases.map(
				(hostile) => `${hostile.label} -> ${String(guardCase.guard(hostile.value))}`,
			)
			const expected = hostileCases.map(
				(hostile) => `${hostile.label} -> ${String(guardCase.admits.includes(hostile.label))}`,
			)
			expect(observed).toStrictEqual(expected)
		})

		it(`${guardCase.name} accepts every value it must`, () => {
			expect(guardCase.accepted.length).toBeGreaterThan(0)
			for (const accepted of guardCase.accepted) expect(guardCase.guard(accepted)).toBe(true)
		})
	}
})

describe('isFilesystemPath', () => {
	for (const pathCase of FILESYSTEM_PATH_CASES) {
		it(`${pathCase.accepted ? 'accepts' : 'refuses'} ${pathCase.label}`, () => {
			expect(isFilesystemPath(pathCase.path)).toBe(pathCase.accepted)
		})
	}

	it('refuses every value that is not a string', () => {
		const values: readonly unknown[] = [undefined, null, 42, ['project'], Symbol('project')]
		for (const value of values) expect(isFilesystemPath(value)).toBe(false)
	})

	it('accepts the absolute paths this host actually produced', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const file = workspace.write('guides/router.md', '# Router\n')
			expect(isFilesystemPath(WORKSPACE_ROOT)).toBe(true)
			expect(isFilesystemPath(workspace.path)).toBe(true)
			expect(isFilesystemPath(file)).toBe(true)
			expect(workspace.read('guides/router.md')).toBe('# Router\n')
		} finally {
			workspace.destroy()
		}
	})

	it('refuses the portable target law it is not', () => {
		// The laws are deliberately different: a host path may name a sibling
		// directory and carry a drive prefix, and a target-relative path may not.
		expect(isFilesystemPath('../sibling')).toBe(true)
		expect(isFilesystemPath('C:/project')).toBe(true)
		expect(isFilesystemPath('project\\src')).toBe(true)
	})
})

describe('isDigest', () => {
	it('accepts what the host digest actually produces', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write('AGENTS.md', '# Agents\n')
			const digest = computeDigest(requireValue(workspace.read('AGENTS.md')))
			expect(digest).toHaveLength(64)
			expect(isDigest(digest)).toBe(true)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a digest of the wrong case, length, or alphabet', () => {
		const digest = computeDigest('scaffold')
		expect(isDigest(digest.toUpperCase())).toBe(false)
		expect(isDigest(digest.slice(1))).toBe(false)
		expect(isDigest(`${digest}0`)).toBe(false)
		expect(isDigest('')).toBe(false)
		expect(isDigest('g'.repeat(64))).toBe(false)
	})
})

describe('isHost', () => {
	it('accepts a whole host whose manifest and fill are both the declared shape', () => {
		const manifest = buildHostManifest()
		const bytes = Object.fromEntries(
			manifest.entries.map((entry) => [entry.destination, contentToHex(`${entry.destination}\n`)]),
		)
		expect(isHost({ manifest, bytes })).toBe(true)
		// Whether the halves agree is the reader's question, so a fill that covers
		// none of the membership is still the declared shape.
		expect(isHost({ manifest, bytes: {} })).toBe(true)
	})

	it('refuses a half that is absent, off shape, or joined by a key it does not declare', () => {
		const manifest = buildHostManifest()
		expect(isHost({ manifest })).toBe(false)
		expect(isHost({ bytes: {} })).toBe(false)
		expect(isHost({ manifest, bytes: {}, root: 'dist/host' })).toBe(false)
		expect(
			isHost({ manifest: { ...manifest, digest: manifest.digest.toUpperCase() }, bytes: {} }),
		).toBe(false)
	})

	it('measures the fill by the core snapshot law it composes', () => {
		const manifest = buildHostManifest()
		expect(isHost({ manifest, bytes: { 'AGENTS.md': contentToHex('# Agents\n') } })).toBe(true)
		expect(isHost({ manifest, bytes: { 'AGENTS.md': 'hi' } })).toBe(false)
		expect(isHost({ manifest, bytes: { 'AGENTS.md': '68690A' } })).toBe(false)
		expect(isHost({ manifest, bytes: { '../secrets': '68690a' } })).toBe(false)
	})

	it('answers every hostile value without throwing', () => {
		for (const hostile of buildHostileCases()) {
			expect(() => isHost(hostile.value)).not.toThrow()
			expect(isHost(hostile.value)).toBe(false)
		}
	})
})

describe('boundary law', () => {
	for (const boundaryCase of buildBoundaryCases()) {
		it(`${boundaryCase.accepted ? 'accepts' : 'refuses'} ${boundaryCase.label}`, () => {
			expect(boundaryCase.guard(boundaryCase.value)).toBe(boundaryCase.accepted)
		})
	}
})

describe('composition with core', () => {
	it('measures every list element by the core guard it names', () => {
		expect(isDependencyNames(['router'])).toBe(false)
		expect(isDependencyNames(['@orkestrel/../etc'])).toBe(false)
		expect(isDependencies([{ name: '@orkestrel/emitter' }])).toBe(false)
		expect(
			isMirrors([{ name: '@orkestrel/router', path: '../secrets', lookup: 'found', content: '' }]),
		).toBe(false)
		expect(isCatalogEntries([{ name: 'router', lookup: 'found', version: '0.0.8' }])).toBe(false)
	})

	it('bounds a caller-supplied list by the core collection ceiling', () => {
		const atLimit = Array.from({ length: MAX_COLLECTION_ITEMS }, () => '@orkestrel/router')
		const overLimit = Array.from({ length: MAX_COLLECTION_ITEMS + 1 }, () => '@orkestrel/router')
		expect(isDependencyNames(atLimit)).toBe(true)
		expect(isDependencyNames(overLimit)).toBe(false)
	})

	it('bounds a target inventory far above that ceiling instead', () => {
		const beyondCollection = Array.from({ length: MAX_COLLECTION_ITEMS + 1 }, () => 'AGENTS.md')
		expect(MAX_INVENTORY_PATHS).toBeGreaterThan(MAX_COLLECTION_ITEMS)
		expect(isDependencyNames(beyondCollection)).toBe(false)
		expect(isRepository({ tracked: beyondCollection, dirty: [] })).toBe(true)
	})
})
