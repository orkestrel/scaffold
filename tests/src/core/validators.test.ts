import type { Group } from '@src/core'
import { describe, expect, it } from 'vitest'
import {
	createBlueprint,
	Compiler,
	isArtifact,
	isAudit,
	isCollection,
	isCompilerHooks,
	isCompilerOptions,
	isCatalogEntry,
	isBlueprint,
	isBrowserExtension,
	isStylesExtension,
	isSurface,
	isExtension,
	isSheetName,
	isGroups,
	isHex,
	isMirror,
	isPath,
	isPlan,
	isSnapshot,
	MANIFEST_PATH,
	MAX_AUDIT_FINDINGS,
	MAX_COLLECTION_ITEMS,
} from '@src/core'
import { createRecorder } from '@orkestrel/test'
import {
	buildGuardCases,
	buildHostileCases,
	buildUnionCases,
	PATH_CASES,
	readKeyCount,
	selectHostileCase,
} from '../../setup.js'

describe('extension guards', () => {
	it('reads the supported surfaces and refuses targets and environments', () => {
		expect(isSurface('browser')).toBe(true)
		expect(isSurface('styles')).toBe(true)
		expect(isSurface('themes')).toBe(false)
		expect(isSurface('server')).toBe(false)
		expect(isSurface(undefined)).toBe(false)
	})
	it('admits supported surfaces and refuses unsupported names and repeated axes', () => {
		expect(isBrowserExtension({ surface: 'browser', name: 'vue', axes: ['src', 'app'] })).toBe(true)
		expect(isBrowserExtension({ surface: 'browser', name: 'react', axes: ['app'] })).toBe(false)
		expect(isBrowserExtension({ surface: 'browser', name: 'vue', axes: ['app', 'app'] })).toBe(
			false,
		)
		expect(isBrowserExtension({ surface: 'browser', name: 'vue', axes: ['styles'] })).toBe(false)
		expect(isStylesExtension({ surface: 'styles', name: 'print' })).toBe(true)
		expect(isStylesExtension({ surface: 'styles', name: 'vue' })).toBe(false)
		expect(isStylesExtension({ surface: 'styles', name: 'core' })).toBe(false)
		expect(isSheetName('print-sheet')).toBe(true)
		expect(isSheetName('../print')).toBe(false)
		expect(isExtension({ surface: 'server', name: 'print' })).toBe(false)
	})

	it('answers hostile values without throwing', () => {
		for (const hostile of buildHostileCases()) {
			expect(isExtension(hostile.value)).toBe(false)
			expect(isSurface(hostile.value)).toBe(false)
			expect(isBrowserExtension(hostile.value)).toBe(false)
			expect(isStylesExtension(hostile.value)).toBe(false)
			expect(isSheetName(hostile.value)).toBe(false)
		}
	})

	it('requires the structural fields and validates their values', () => {
		const blueprint = createBlueprint('sheets', {
			styles: true,
			themes: true,
			extensions: [{ surface: 'styles', name: 'print' }],
		})
		expect(isBlueprint(blueprint)).toBe(true)
		expect(isBlueprint({ ...blueprint, styles: 'true' })).toBe(false)
		expect(isBlueprint({ ...blueprint, themes: undefined })).toBe(false)
		expect(
			isBlueprint({ ...blueprint, extensions: [{ surface: 'browser', name: 'react', axes: [] }] }),
		).toBe(false)
	})
})

describe('guard totality', () => {
	it('reports a real failure when the probe under it is not total', () => {
		const revoked = selectHostileCase('revoked proxy')
		const oversized = selectHostileCase('oversized array')
		// The negative control sits outside the population the matrix covers: a naive
		// reader rather than a total guard. It must break both halves of the matrix's
		// assertion — the throw and the verdict — or the matrix proves nothing.
		expect(() => readKeyCount(revoked.value)).toThrow(/revoked/u)
		expect(readKeyCount(oversized.value) > 0).toBe(true)
		expect(isCollection(revoked.value)).toBe(false)
	})

	for (const guardCase of buildGuardCases()) {
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

describe('isPath', () => {
	for (const pathCase of PATH_CASES) {
		it(`${pathCase.accepted ? 'accepts' : 'refuses'} ${pathCase.label}`, () => {
			expect(isPath(pathCase.path)).toBe(pathCase.accepted)
		})
	}

	it('refuses every value that is not a string', () => {
		const values: readonly unknown[] = [undefined, null, 42, ['AGENTS.md'], Symbol('AGENTS.md')]
		for (const value of values) expect(isPath(value)).toBe(false)
	})

	it('admits host-specific segment spellings inside its logical path domain', () => {
		expect(isPath('nul')).toBe(true)
		expect(isPath('src/aux.ts')).toBe(true)
		expect(isPath('guides/data.')).toBe(true)
		expect(isPath('guides/data ')).toBe(true)
		expect(isPath('a'.repeat(300))).toBe(true)
		expect(isPath('../nul')).toBe(false)
	})
})

describe('discriminated branches', () => {
	for (const unionCase of buildUnionCases()) {
		it(`refuses ${unionCase.label}`, () => {
			const changed = Object.keys({ ...unionCase.accepted, ...unionCase.refused }).filter(
				(key) => unionCase.accepted[key] !== unionCase.refused[key],
			)
			expect(changed).toHaveLength(1)
			expect(unionCase.guard(unionCase.accepted)).toBe(true)
			expect(unionCase.guard(unionCase.refused)).toBe(false)
		})
	}

	it('admits unmatched catalog and mirror verdicts', () => {
		expect(
			isCatalogEntry({
				name: '@orkestrel/router',
				lookup: 'unmatched',
				note: 'the answer carries no readable latest version',
			}),
		).toBe(true)
		expect(
			isMirror({
				name: '@orkestrel/router',
				path: 'guides/router.md',
				lookup: 'unmatched',
				note: 'the answer carries no readable latest version',
			}),
		).toBe(true)
	})

	// Only the host branch planned before hydration carries the pointer flag, and
	// the flag is a boolean behaviour switch, so a string reading of it is refused.
	it('admits a host artifact with a boolean pointer flag and refuses any other value', () => {
		const pointer = {
			path: '.agents/skills/orkestrel-harden/SKILL.md',
			group: 'orchestration',
			ownership: 'presence',
			origin: 'host',
		}
		expect(isArtifact({ ...pointer, pointer: true })).toBe(true)
		expect(isArtifact({ ...pointer, pointer: false })).toBe(true)
		expect(isArtifact(pointer)).toBe(true)
		expect(isArtifact({ ...pointer, pointer: 'yes' })).toBe(false)
		expect(isArtifact({ ...pointer, ownership: 'content', hex: '2d2d2d', pointer: true })).toBe(
			false,
		)
		expect(isArtifact({ ...pointer, ownership: 'content', hex: '2d2d2d' })).toBe(true)
	})

	it('refuses a found catalog row without peers and admits one with peers: []', () => {
		expect(
			isCatalogEntry({
				name: '@orkestrel/router',
				lookup: 'found',
				version: '0.0.8',
				dependencies: [],
			}),
		).toBe(false)
		expect(
			isCatalogEntry({
				name: '@orkestrel/router',
				lookup: 'found',
				version: '0.0.8',
				dependencies: [],
				peers: [],
			}),
		).toBe(true)
	})
})

describe('isCompilerHooks', () => {
	it('refuses a misspelled event key on its own', () => {
		const misspelled: Record<string, unknown> = {
			compiled: createRecorder<readonly [unknown]>().handler,
		}
		expect(isCompilerHooks(misspelled)).toBe(false)
	})

	it('accepts an empty record and every declared event', () => {
		const empty: Record<string, unknown> = {}
		const complete: Record<string, unknown> = {
			compile: createRecorder<readonly [unknown]>().handler,
			audit: createRecorder<readonly [unknown]>().handler,
			block: createRecorder<readonly [unknown]>().handler,
			error: createRecorder<readonly [unknown]>().handler,
			destroy: createRecorder<readonly []>().handler,
		}
		expect(isCompilerHooks(empty)).toBe(true)
		expect(isCompilerHooks(complete)).toBe(true)
	})

	it('refuses a declared event wired to something that is not a function', () => {
		const wrong: Record<string, unknown> = { compile: 'compile' }
		expect(isCompilerHooks(wrong)).toBe(false)
		expect(isCompilerOptions({ on: wrong })).toBe(false)
	})
})

describe('collection bounds', () => {
	it('accepts a collection at the item ceiling and refuses one item past it', () => {
		const atLimit: readonly Group[] = Array.from({ length: MAX_COLLECTION_ITEMS }, () => 'manifest')
		const overLimit: readonly Group[] = Array.from(
			{ length: MAX_COLLECTION_ITEMS + 1 },
			() => 'manifest',
		)
		expect(isCollection(atLimit)).toBe(true)
		expect(isCollection(overLimit)).toBe(false)
		expect(isGroups(atLimit)).toBe(true)
		expect(isGroups(overLimit)).toBe(false)
	})

	it('refuses a sparse selection through the composed element guard', () => {
		const sparse = selectHostileCase('sparse array')
		expect(isCollection(sparse.value)).toBe(true)
		expect(isGroups(sparse.value)).toBe(false)
	})
})

describe('isAudit', () => {
	it('accepts the findings a compiler can produce from a full snapshot', () => {
		const current: Record<string, string> = {}
		for (let index = 0; index < MAX_COLLECTION_ITEMS; index += 1) {
			current[`foreign/f${index}.md`] = ''
		}
		const compiler = new Compiler()
		const audit = compiler.audit(createBlueprint('sample', { src: ['core'] }), current)
		compiler.destroy()

		expect(audit.findings.length).toBeGreaterThan(MAX_COLLECTION_ITEMS)
		expect(isAudit(audit)).toBe(true)
		const finding = audit.findings[0]
		if (finding === undefined) throw new Error('Expected the compiler to produce findings')
		expect(
			isAudit({
				findings: Array.from({ length: MAX_AUDIT_FINDINGS }, () => finding),
				questions: [],
			}),
		).toBe(true)
		expect(
			isAudit({
				findings: Array.from({ length: MAX_AUDIT_FINDINGS + 1 }, () => finding),
				questions: [],
			}),
		).toBe(false)
	})
})

describe('isPlan', () => {
	it('refuses a content-owned manifest while accepting the compiler plan', () => {
		const compiler = new Compiler()
		const scaffolding = compiler.compile(createBlueprint('sample', { src: ['core'] }))
		compiler.destroy()
		const plan = scaffolding.plan
		if (plan === undefined) throw new Error('Expected the compiler to produce a plan')
		const claimed = {
			...plan,
			artifacts: plan.artifacts.map((artifact) =>
				artifact.path === MANIFEST_PATH
					? {
							path: MANIFEST_PATH,
							group: 'manifest',
							ownership: 'content',
							origin: 'computed',
							content: '{\n\t"peerDependencies": {\n\t\t"@orkestrel/contract": "^0.0.13"\n\t}\n}\n',
						}
					: artifact,
			),
		}
		const present = {
			...claimed,
			artifacts: claimed.artifacts.map((artifact) =>
				artifact.path === MANIFEST_PATH ? { ...artifact, ownership: 'presence' } : artifact,
			),
		}

		expect(isPlan(plan)).toBe(true)
		expect(isPlan(claimed)).toBe(false)
		expect(isPlan(present)).toBe(false)
	})
})

describe('isHex', () => {
	it('accepts empty content and exact lowercase byte pairs', () => {
		expect(isHex('')).toBe(true)
		expect(isHex('68690a')).toBe(true)
	})

	it('refuses uppercase digits, an odd length, and non-hexadecimal text', () => {
		expect(isHex('68690A')).toBe(false)
		expect(isHex('68690')).toBe(false)
		expect(isHex('hi')).toBe(false)
	})
})

describe('isSnapshot', () => {
	it('accepts an empty record and a bounded path-keyed record of exact bytes', () => {
		const empty: Record<string, unknown> = {}
		const filled: Record<string, unknown> = { 'AGENTS.md': '68690a', 'guides/README.md': '' }
		expect(isSnapshot(empty)).toBe(true)
		expect(isSnapshot(filled)).toBe(true)
	})

	it('refuses a key outside target-relative path syntax and a value that is not exact bytes', () => {
		const traversal: Record<string, unknown> = { '../secrets': '68690a' }
		const text: Record<string, unknown> = { 'AGENTS.md': 'hi' }
		const absent: Record<string, unknown> = { 'AGENTS.md': undefined }
		expect(isSnapshot(traversal)).toBe(false)
		expect(isSnapshot(text)).toBe(false)
		expect(isSnapshot(absent)).toBe(false)
	})

	it('refuses a record carrying more entries than one collection accepts', () => {
		const oversized: Record<string, string> = {}
		for (let index = 0; index <= MAX_COLLECTION_ITEMS; index += 1) {
			oversized[`guides/${index}.md`] = '68690a'
		}
		expect(Object.keys(oversized)).toHaveLength(MAX_COLLECTION_ITEMS + 1)
		expect(isSnapshot(oversized)).toBe(false)
	})
})
