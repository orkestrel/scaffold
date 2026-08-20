import type { Group } from '@src/core'
import { describe, expect, it } from 'vitest'
import {
	createBlueprint,
	Compiler,
	isAudit,
	isCollection,
	isCompilerHooks,
	isCompilerOptions,
	isGroups,
	isHex,
	isPath,
	isSnapshot,
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
