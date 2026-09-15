import { rmSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { describe, expect, it } from 'vitest'
import { requireValue } from '@orkestrel/test'
import { POLICY_FILENAMES } from './setup.js'
import {
	collectPolicyDeclarations,
	createPolicySurfaceFixture,
	inspectPolicyWorkspace,
	normalizePolicyFilename,
	normalizePolicyPath,
	POLICY_SURFACE_HOST,
	POLICY_SURFACE_EXPORT_CASES,
	createPolicySurfaceGuide,
	readPolicyDeclarations,
	readPolicySurface,
} from './setupPolicy.js'

describe('readPolicyDeclarations', () => {
	for (const scenario of POLICY_SURFACE_EXPORT_CASES) {
		it(`accounts for a planted setup ${scenario.label} export`, () => {
			const scratch = createPolicySurfaceFixture()
			try {
				scratch.write(
					`${POLICY_SURFACE_HOST}/guides/other.md`,
					createPolicySurfaceGuide(['waitForCondition']),
				)
				scratch.write('tests/setupServer.ts', scenario.text)
				expect(inspectPolicyWorkspace(scratch.path)).toContainEqual({
					rule: 'surface',
					path: 'tests/setupServer.ts',
					line: 1,
					message: 'surface name belongs to one package: waitForCondition (other)',
				})
			} finally {
				scratch.destroy()
			}
		})
	}

	it('accounts for a star barrel over a namespace', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			scratch.write('src/core/index.ts', "export * from './helpers.js'\n")
			scratch.write('src/core/helpers.ts', 'export namespace readShared { export const value = 1 }')
			expect(inspectPolicyWorkspace(scratch.path)).toContainEqual({
				rule: 'surface',
				path: 'src/core/helpers.ts',
				line: 1,
				message: 'surface name belongs to one package: readShared (other)',
			})
		} finally {
			scratch.destroy()
		}
	})

	it('accounts for a setup star export over a namespace', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			scratch.write('tests/setupServer.ts', "export * from './helpers.js'\n")
			scratch.write('tests/helpers.ts', 'export namespace readShared { export const value = 1 }')
			expect(inspectPolicyWorkspace(scratch.path)).toContainEqual({
				rule: 'surface',
				path: 'tests/helpers.ts',
				line: 1,
				message: 'surface name belongs to one package: readShared (other)',
			})
		} finally {
			scratch.destroy()
		}
	})

	it('refuses an unresolved setup star export', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			scratch.write('tests/setupServer.ts', "export * from './absent.js'\n")
			expect(inspectPolicyWorkspace(scratch.path)).toContainEqual(
				expect.objectContaining({
					rule: 'surface',
					path: 'tests/setupServer.ts',
					message: expect.stringContaining('surface population incomplete:'),
				}),
			)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses unsupported setup exports and malformed source', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			scratch.write('tests/setupServer.ts', 'export default 1')
			expect(inspectPolicyWorkspace(scratch.path)).toContainEqual(
				expect.objectContaining({
					rule: 'surface',
					path: 'tests/setupServer.ts',
					message: expect.stringContaining('surface population incomplete:'),
				}),
			)
			scratch.write('tests/setupServer.ts', 'export const =')
			expect(inspectPolicyWorkspace(scratch.path)).toContainEqual(
				expect.objectContaining({
					rule: 'surface',
					path: 'tests/setupServer.ts',
					message: expect.stringContaining('surface population incomplete:'),
				}),
			)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a namespace export aliased as default', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			scratch.write('tests/setupServer.ts', "export * as default from './helpers.js'\n")
			expect(inspectPolicyWorkspace(scratch.path)).toContainEqual(
				expect.objectContaining({
					rule: 'surface',
					path: 'tests/setupServer.ts',
					message: expect.stringContaining('surface population incomplete:'),
				}),
			)
		} finally {
			scratch.destroy()
		}
	})
	it('locates declarations across comments and CRLF while normalizing paths', () => {
		expect(
			readPolicyDeclarations(
				'tests\\setupServer.ts',
				'/** Reads a value. */\r\nexport function readSample() {}\r\n// export const hidden = true\r\nexport const SAMPLE = true\r\n',
			),
		).toEqual([
			{ name: 'readSample', path: 'tests/setupServer.ts', line: 2 },
			{ name: 'SAMPLE', path: 'tests/setupServer.ts', line: 4 },
		])
	})
})

describe('collectPolicyDeclarations', () => {
	it('reads the declarations when the reader does not throw', () => {
		expect(
			collectPolicyDeclarations(
				resolve('collect root'),
				'tests/setupServer.ts',
				'export const SAMPLE = true\n',
			),
		).toEqual({
			declarations: [{ name: 'SAMPLE', path: 'tests/setupServer.ts', line: 1 }],
			violation: undefined,
		})
	})

	it('converts the reader throw into a surface violation', () => {
		expect(
			collectPolicyDeclarations(
				resolve('collect root'),
				'tests/setupServer.ts',
				'export default 1',
			),
		).toEqual({
			declarations: [],
			violation: {
				rule: 'surface',
				path: 'tests/setupServer.ts',
				message:
					'surface population incomplete: export statement is unsupported at tests/setupServer.ts:1: ExportDefaultDeclaration',
			},
		})
	})
})

describe('readPolicySurface', () => {
	it('follows nested barrels and cycles while excluding unbarrelled declarations', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			scratch.write('src/core/index.ts', "export * from './nested/index.js'\n")
			scratch.write(
				'src/core/nested/index.ts',
				"export * from '../index.js'\nexport * from '../helpers.js'\n",
			)
			scratch.write('src/core/helpers.ts', 'export function readSample() {}\n')
			scratch.write('src/core/unused.ts', 'export function readShared() {}\n')
			expect(readPolicySurface(scratch.path)).toEqual({
				declarations: [{ name: 'readSample', path: 'src/core/helpers.ts', line: 1 }],
				violations: [],
			})
		} finally {
			scratch.destroy()
		}
	})

	it('refuses an unresolved barrel target through the workspace route', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			scratch.write('src/core/index.ts', "export * from './absent.js'\n")
			expect(inspectPolicyWorkspace(scratch.path)).toEqual([
				{
					rule: 'surface',
					path: 'src/core/index.ts',
					line: 1,
					message: 'surface population incomplete: barrel target is unreadable: ./absent.js',
				},
			])
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a template statement the guide projection masks', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			scratch.write('src/core/index.ts', '`unread statement`\n')
			expect(inspectPolicyWorkspace(scratch.path)).toEqual([
				{
					rule: 'surface',
					path: 'src/core/index.ts',
					line: 1,
					message:
						'surface population incomplete: barrel requires a relative .js star export on one line',
				},
			])
		} finally {
			scratch.destroy()
		}
	})

	it('refuses syntactically unreadable barrels', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			scratch.write('src/core/index.ts', 'export * from\n')
			expect(inspectPolicyWorkspace(scratch.path)).toEqual([
				{
					rule: 'surface',
					path: 'src/core/index.ts',
					message: 'surface population incomplete: barrel syntax is unreadable',
				},
			])
		} finally {
			scratch.destroy()
		}
	})
})

describe('inspectPolicySurface evidence', () => {
	it('refuses absent hosted roots instead of accepting an empty comparison', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			rmSync(join(scratch.path, POLICY_SURFACE_HOST), { recursive: true, force: true })
			expect(inspectPolicyWorkspace(scratch.path)).toEqual([
				{
					rule: 'surface',
					path: 'guides',
					message: 'surface evidence missing: hosted guides and a populated catalog are required',
				},
			])
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a catalog guide with no Surface section', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			scratch.write(`${POLICY_SURFACE_HOST}/guides/other.md`, '# Other\n')
			expect(inspectPolicyWorkspace(scratch.path)).toEqual([
				{
					rule: 'surface',
					path: `${POLICY_SURFACE_HOST}/guides/other.md`,
					message: 'surface evidence missing: hosted guide has no Surface section',
				},
			])
		} finally {
			scratch.destroy()
		}
	})

	it('compares names case-sensitively across environments and declaration kinds', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			scratch.write('src/browser/index.ts', "export * from './types.js'\n")
			scratch.write(
				'src/browser/types.ts',
				'export type readShared = string\nexport type ReadShared = string\n',
			)
			const violations = inspectPolicyWorkspace(scratch.path)
			expect(requireValue(violations[0])).toEqual({
				rule: 'surface',
				path: 'src/browser/types.ts',
				line: 1,
				message: 'surface name belongs to one package: readShared (other)',
			})
			expect(violations.slice(1)).toEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('excludes app, ordinary tests, nested setup files, and setup proofs from subjects', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			scratch.write('app/core/index.ts', "export * from './helpers.js'\n")
			scratch.write('app/core/helpers.ts', 'export function readShared() {}\n')
			scratch.write('tests/setupServer.test.ts', 'export function readShared() {}\n')
			scratch.write('tests/nested/setupServer.ts', 'export function readShared() {}\n')
			scratch.write('tests/ordinary.ts', 'export function readShared() {}\n')
			expect(inspectPolicyWorkspace(scratch.path)).toEqual([])
		} finally {
			scratch.destroy()
		}
	})
})

describe('normalizePolicyFilename', () => {
	it('normalizes native relative paths, native absolute paths, and generated file URLs', () => {
		const root = resolve('policy filename root')
		for (const filename of POLICY_FILENAMES) {
			const absolute = resolve(root, filename)
			expect(normalizePolicyFilename(root, filename)).toBe(filename)
			expect(normalizePolicyFilename(root, absolute)).toBe(filename)
			expect(normalizePolicyFilename(root, pathToFileURL(absolute).href)).toBe(filename)
		}
	})

	it('keeps different files and roots distinguishable', () => {
		const root = resolve('policy filename root')
		const nested = resolve(root, 'nested')
		const first = resolve(root, 'src/first.ts')
		const second = resolve(root, 'src/second.ts')
		expect(normalizePolicyFilename(root, first)).not.toBe(normalizePolicyFilename(root, second))
		expect(normalizePolicyFilename(root, first)).not.toBe(normalizePolicyFilename(nested, first))
	})

	it('throws for a malformed file URL', () => {
		expect(() => normalizePolicyFilename(resolve('policy filename root'), 'file:///%')).toThrow(
			'URI malformed',
		)
	})
})

describe('normalizePolicyPath', () => {
	it('changes separators without resolving segments or decoding percent text', () => {
		expect(normalizePolicyPath('src//member.ts')).toBe('src/member.ts')
		expect(normalizePolicyPath('src\\parent\\..\\literal%20#雪.ts')).toBe(
			'src/parent/../literal%20#雪.ts',
		)
	})
})
