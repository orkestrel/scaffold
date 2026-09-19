import { rmSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { describe, expect, it } from 'vitest'
import { requireValue } from '@orkestrel/test'
import { POLICY_FILENAMES } from './setup.js'
import {
	collectPolicyDeclarations,
	createPolicyScratch,
	createPolicySurfaceFixture,
	inspectSkillImports,
	inspectPolicyWorkspace,
	normalizePolicyFilename,
	normalizePolicyPath,
	POLICY_SURFACE_HOST,
	POLICY_SURFACE_EXPORT_CASES,
	createPolicySurfaceGuide,
	readPolicyDeclarations,
	readPolicySurface,
	readSkillExports,
	readSkillDeclarations,
	resolveSkillDeclaration,
	SKILL_DECLARATION_REFUSALS,
} from './setupPolicy.js'

describe('readSkillExports', () => {
	it('resolves root exports from the installed declaration entry', () => {
		const names = readSkillExports(process.cwd(), '@orkestrel/test')
		expect(names).toContain('waitForCondition')
		expect(names).toContain('WaitOptions')
		expect(names).not.toContain('s2MissingValue')
	})

	it('resolves browser exports without loading the browser runtime', () => {
		const names = readSkillExports(process.cwd(), '@orkestrel/test/browser')
		expect(names).toContain('clickAccessible')
		expect(names).toContain('CaptureVariant')
		expect(names).not.toContain('S2MissingType')
	})

	it('returns absence when an installed entry has no declaration', () => {
		expect(readSkillExports(process.cwd(), '@orkestrel/test/missing')).toBeUndefined()
	})

	it('follows star and aliased declaration exports selected by the exports map', () => {
		const scratch = createPolicyScratch({ prefix: 'orkestrel-skill-exports-' })
		try {
			scratch.write(
				'node_modules/@orkestrel/test/package.json',
				JSON.stringify({
					name: '@orkestrel/test',
					type: 'module',
					exports: {
						'.': { import: { types: './entry.d.ts', default: './entry.js' } },
						'./runtime': './runtime.js',
					},
				}),
			)
			scratch.write(
				'node_modules/@orkestrel/test/entry.d.ts',
				"export * from './values.js'\nexport { Original as Renamed } from './types.js'\n",
			)
			scratch.write(
				'node_modules/@orkestrel/test/values.d.ts',
				'declare const exportedValue: string\ndeclare const hiddenValue: string\nexport { exportedValue }\n',
			)
			scratch.write(
				'node_modules/@orkestrel/test/types.d.ts',
				'export interface Original { readonly value: string }\n',
			)
			scratch.write(
				'node_modules/@orkestrel/test/entry.js',
				'throw new Error("The declaration reader must never execute this entry")\n',
			)
			scratch.write('node_modules/@orkestrel/test/runtime.js', 'export const runtimeValue = true\n')
			expect(readSkillExports(scratch.path, '@orkestrel/test')).toEqual([
				'Renamed',
				'exportedValue',
			])
			expect(readSkillExports(scratch.path, '@orkestrel/test/values')).toBeUndefined()
			expect(readSkillExports(scratch.path, '@orkestrel/test/runtime')).toBeUndefined()
		} finally {
			scratch.destroy()
		}
	})
})

describe('readSkillDeclarations', () => {
	it('reads declaration forms and relative value and type re-exports', () => {
		const scratch = createPolicyScratch({ prefix: 'orkestrel-skill-forms-' })
		try {
			scratch.write(
				'entry.d.ts',
				[
					'export * from "./values.js"',
					'export type * from "./types.js"',
					'export { readValue as readAlias, VALUE } from "./values.js"',
					'export type { Options as Settings } from "./types.js"',
					'export { type Name as Label } from "./types.js"',
					'export * from "./esm.mjs"',
					'export * from "./common.cjs"',
					'export * from "./direct.d.ts"',
				].join('\n'),
			)
			scratch.write(
				'values.d.ts',
				[
					'export declare function readValue(): string',
					'export declare const VALUE: string, OTHER: number',
					'export declare class Entity {}',
					'export declare enum Phase { Ready }',
					'declare const local: string',
					'declare const hidden: string',
					'export { local as visible }',
					'export * from "./entry.js"',
				].join('\n'),
			)
			scratch.write('types.d.ts', 'export interface Options {}\nexport type Name = string\n')
			scratch.write('esm.d.mts', 'export declare const ESM: string\n')
			scratch.write('common.d.cts', 'export declare const COMMON: string\n')
			scratch.write('direct.d.ts', 'export declare const DIRECT: string\n')
			expect(readSkillDeclarations(join(scratch.path, 'entry.d.ts'))).toEqual([
				'COMMON',
				'DIRECT',
				'ESM',
				'Entity',
				'Label',
				'Name',
				'OTHER',
				'Options',
				'Phase',
				'Settings',
				'VALUE',
				'readAlias',
				'readValue',
				'visible',
			])
		} finally {
			scratch.destroy()
		}
	})

	for (const declaration of SKILL_DECLARATION_REFUSALS) {
		it(`refuses an unreadable declaration inventory: ${declaration}`, () => {
			const scratch = createPolicyScratch({ prefix: 'orkestrel-skill-refusal-' })
			try {
				scratch.write('entry.d.ts', declaration)
				scratch.write('values.d.ts', 'export declare const VALUE: string\n')
				expect(readSkillDeclarations(join(scratch.path, 'entry.d.ts'))).toBeUndefined()
			} finally {
				scratch.destroy()
			}
		})
	}
})

describe('resolveSkillDeclaration', () => {
	it('selects explicit declaration paths through supported conditions', () => {
		expect(resolveSkillDeclaration('./entry.d.ts')).toBe('./entry.d.ts')
		expect(resolveSkillDeclaration({ types: './entry.d.mts' })).toBe('./entry.d.mts')
		expect(resolveSkillDeclaration({ import: { types: './entry.d.ts' } })).toBe('./entry.d.ts')
		expect(resolveSkillDeclaration({ default: { types: './entry.d.cts' } })).toBe('./entry.d.cts')
	})

	it('refuses runtime paths and unsupported export conditions', () => {
		expect(resolveSkillDeclaration('./entry.js')).toBeUndefined()
		expect(resolveSkillDeclaration(['./entry.d.ts'])).toBeUndefined()
		expect(resolveSkillDeclaration({ require: './entry.d.cts' })).toBeUndefined()
		expect(resolveSkillDeclaration(null)).toBeUndefined()
	})
})

describe('inspectSkillImports', () => {
	it('reports a specifier with no installed declaration entry', () => {
		expect(
			inspectSkillImports(
				process.cwd(),
				'SKILL.md',
				'```ts\nimport { missing } from "@orkestrel/test/missing"\n```\n',
			),
		).toEqual([
			{
				rule: 'skill',
				path: 'SKILL.md',
				message: 'skill fence import @orkestrel/test/missing has no installed declaration entry',
			},
		])
	})

	it('reads multiline aliased and commented imports in nested fences', () => {
		const content =
			'> ~~~ts\r\n> import {\r\n>   /* exported name */ s2MissingValue as local,\r\n>   type WaitOptions,\r\n> } from "@orkestrel/test"\r\n> ~~~\r\n'
		expect(inspectSkillImports(process.cwd(), 'references/example.md', content)).toEqual([
			{
				rule: 'skill',
				path: 'references/example.md',
				message: 'skill fence import @orkestrel/test does not export s2MissingValue',
			},
		])
	})

	it('reads each fence inside a list and after a longer outer fence', () => {
		const content =
			'- Example\n\n  ~~~ts\n  import { s2MissingList } from "@orkestrel/test"\n  ~~~\n\n````text\n```\n````\n\n```ts\nimport type { S2MissingLater } from "@orkestrel/test"\n```\n'
		expect(inspectSkillImports(process.cwd(), 'SKILL.md', content)).toEqual([
			{
				rule: 'skill',
				path: 'SKILL.md',
				message: 'skill fence import @orkestrel/test does not export s2MissingList',
			},
			{
				rule: 'skill',
				path: 'SKILL.md',
				message: 'skill fence import @orkestrel/test does not export S2MissingLater',
			},
		])
	})

	it('excludes prose, table cells, and commented or quoted import text', () => {
		const content =
			'import { missing } from "@orkestrel/test"\n\n| Symbol |\n| --- |\n| `import { missing } from "@orkestrel/test"` |\n\n```ts\n// import { missing } from "@orkestrel/test"\nconst sentence = \'import { missing } from "@orkestrel/test"\'\nimport { external } from "external-package"\n```\n'
		expect(inspectSkillImports(process.cwd(), 'SKILL.md', content)).toEqual([])
	})
})

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

	it("reports an overloaded export's collision once", () => {
		const scratch = createPolicySurfaceFixture()
		try {
			scratch.write(
				`${POLICY_SURFACE_HOST}/guides/other.md`,
				createPolicySurfaceGuide(['waitForCondition']),
			)
			scratch.write(
				'tests/setupServer.ts',
				'export function waitForCondition(value: string): void\n' +
					'export function waitForCondition(value: number): void\n' +
					'export function waitForCondition() {}',
			)
			expect(
				inspectPolicyWorkspace(scratch.path).filter(
					(violation) =>
						violation.message === 'surface name belongs to one package: waitForCondition (other)',
				),
			).toEqual([
				{
					rule: 'surface',
					path: 'tests/setupServer.ts',
					line: 1,
					message: 'surface name belongs to one package: waitForCondition (other)',
				},
			])
		} finally {
			scratch.destroy()
		}
	})

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

	it('reads each signature of an exported function overload', () => {
		expect(
			readPolicyDeclarations(
				'tests/setupServer.ts',
				'export function buildResult(input: string): string\n' +
					'export function buildResult(input: number): string\n' +
					'export function buildResult(input: string | number): string {\n' +
					'\treturn String(input)\n' +
					'}\n',
			),
		).toEqual([
			{ name: 'buildResult', path: 'tests/setupServer.ts', line: 1 },
			{ name: 'buildResult', path: 'tests/setupServer.ts', line: 2 },
			{ name: 'buildResult', path: 'tests/setupServer.ts', line: 3 },
		])
		expect(() => readPolicyDeclarations('tests/setupServer.ts', 'export default 1\n')).toThrow(
			'export statement is unsupported at tests/setupServer.ts:1: ExportDefaultDeclaration',
		)
		expect(() =>
			readPolicyDeclarations(
				'tests/setupServer.ts',
				"export import Legacy = require('node:path')\n",
			),
		).toThrow(
			'export declaration is unsupported at tests/setupServer.ts:1: TSImportEqualsDeclaration',
		)
		expect(() => readPolicyDeclarations('tests/setupServer.ts', 'export = 1\n')).toThrow(
			'export statement is unsupported at tests/setupServer.ts:1: TSExportAssignment',
		)
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
		expect(normalizePolicyPath('src\\parent\\..\\literal%20#?.ts')).toBe(
			'src/parent/../literal%20#?.ts',
		)
	})
})
