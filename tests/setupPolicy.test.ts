import {
	chmodSync,
	existsSync,
	readdirSync,
	readFileSync,
	rmSync,
	statSync,
	writeFileSync,
} from 'node:fs'
import { userInfo } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { describe, expect, it } from 'vitest'
import { createRecorder, requireValue } from '@orkestrel/test'
import { createScratch } from '@orkestrel/test/server'
import { execute } from '@orkestrel/process/server'
import {
	blueprintToConfigArtifacts,
	blueprintToSourceArtifacts,
	blueprintToTestArtifacts,
	blueprintToManifest,
	createBlueprint,
	renderSkillPointer,
} from '@src/core'
import { POLICY_FILENAMES } from './setup.js'
import {
	collectSheets,
	collectFrameworks,
	readConfigRecord,
	readConfigScript,
	collectFaceWrappers,
	collectGuideStatements,
	inspectSheetConfiguration,
	readSheetPrelude,
	SHEET_POLICY_BARREL_PATTERN,
	SHEET_POLICY_ORDER_PATTERN,
	readImportDiagnostics,
	collectPolicyDeclarations,
	createPolicyLazyCase,
	createPolicyReads,
	createPolicyScratch,
	createPolicySparse,
	createPolicySurfaceFixture,
	denyPolicyRead,
	failPolicyRead,
	inspectBridge,
	inspectPolicyConfiguration,
	inspectPolicyFilenamePaths,
	inspectPolicyMirrorPaths,
	inspectPolicyWiring,
	inspectSkill,
	inspectSkillBridges,
	inspectSkillImports,
	inspectPolicyWorkspace,
	extractPolicySection,
	inspectPolicySetup,
	inspectSkillTemplateTODOs,
	isPolicyDirectory,
	matchesSkillToken,
	matchesScaffoldSetup,
	normalizePolicyFilename,
	normalizePolicyPath,
	parsePolicyJSON,
	parseSkillFrontmatter,
	POLICY_DENY_PRINCIPAL,
	POLICY_EXTRACTOR,
	POLICY_LAZY_CASES,
	POLICY_PUBLISHES,
	POLICY_ROOT,
	POLICY_STUDIES_POPULATION,
	POLICY_SURFACE_HOST,
	POLICY_SURFACE_EXPORT_CASES,
	POLICY_WIRING_RULES,
	createPolicySurfaceGuide,
	readPolicyDeclarations,
	readPolicyJSON,
	readPolicyPackage,
	readPolicyPermissions,
	readPolicySurface,
	readSkillExports,
	readSkillDeclarations,
	readSkillManifest,
	resolvePolicyPackage,
	resolveSkillDeclaration,
	runPolicyCommand,
	settlePolicyOutcome,
	SKILL_DECLARATION_MESSAGES,
	SKILL_DECLARATION_REFUSALS,
	SKILL_REFUSAL_CASES,
	SETUP_POLICY_CONTROLS,
	SHEET_POLICY_SELECTIONS,
} from './setupPolicy.js'

describe('configuration infrastructure', () => {
	it.each(SHEET_POLICY_SELECTIONS)(
		'executes the vendored alias and sheet proofs for src=$src styles=$styles themes=$themes',
		async (selection) => {
			const { files, control, ...options } = selection
			const blueprint = createBlueprint('paper', options)
			const scratch = createScratch({ prefix: 'scaffold-sheet-proof-' })
			try {
				for (const artifact of [
					...blueprintToConfigArtifacts(blueprint),
					...blueprintToSourceArtifacts(blueprint),
					...blueprintToTestArtifacts(blueprint),
				]) {
					if (artifact.origin !== 'host') scratch.write(artifact.path, artifact.content)
				}
				scratch.write('package.json', blueprintToManifest(blueprint))
				for (const file of files ?? []) scratch.write(file.path, file.content)
				for (const path of [
					'configs/helpers.ts',
					'configs/policy.ts',
					'tests/config.test.ts',
					'tests/setupPolicy.ts',
				])
					scratch.write(path, readFileSync(resolve(path), 'utf8'))
				for (const entry of readdirSync(resolve('node_modules'), { withFileTypes: true })) {
					if (!entry.isDirectory() || entry.name === '.bin') continue
					if (entry.name === '@orkestrel') {
						for (const name of readdirSync(resolve('node_modules/@orkestrel'))) {
							if (name !== 'scaffold')
								scratch.link(
									`node_modules/@orkestrel/${name}`,
									resolve('node_modules/@orkestrel', name),
								)
						}
					} else scratch.link(`node_modules/${entry.name}`, resolve('node_modules', entry.name))
				}
				scratch.link('node_modules/@orkestrel/scaffold', resolve('.'))
				const result = await execute(
					{
						file: process.execPath,
						arguments: [
							resolve('node_modules/vitest/vitest.mjs'),
							'run',
							'--config',
							'vite.config.ts',
							'--project',
							'config',
							'tests/config.test.ts',
							'-t',
							'resolves every declared alias|loads each selected sheet and framework|registers every workspace project',
						],
					},
					{ workspace: scratch.path, timeout: 90_000, strict: false },
				)
				if (result.failed) throw new Error(result.stdout + result.stderr)
				expect(result.code).toBe(0)
				expect(result.stdout).toMatch(/3 passed/u)
				for (const mutation of control === undefined ? [] : [control]) {
					const path = resolve(scratch.path, 'vite.config.ts')
					const original = readFileSync(path)
					const config = original.toString('utf8')
					expect(config).toContain(mutation.before)
					try {
						for (const mutated of [false, true, false]) {
							writeFileSync(
								path,
								mutated ? config.replace(mutation.before, mutation.after) : original,
							)
							expect(readFileSync(path).equals(original)).toBe(!mutated)
							const measured = await execute(
								{
									file: process.execPath,
									arguments: [
										resolve('node_modules/vitest/vitest.mjs'),
										'run',
										'--config',
										'vite.config.ts',
										'--project',
										'config',
										'tests/config.test.ts',
										'-t',
										'registers every workspace project',
									],
								},
								{ workspace: scratch.path, timeout: 90_000, strict: false },
							)
							expect(measured.code).toBe(mutated ? 1 : 0)
							expect(measured.stdout).toMatch(mutated ? /1 failed/u : /1 passed/u)
							expect(measured.stderr.includes(mutation.failure)).toBe(mutated)
						}
					} finally {
						writeFileSync(path, original)
						expect(readFileSync(path).equals(original)).toBe(true)
					}
				}
			} finally {
				scratch.destroy()
			}
		},
		120_000,
	)
	it('reads authored sheet preludes and refuses reversed directives and a non-order opening rule', () => {
		for (const prefix of [
			'',
			'\n// Authored sheet.\n\n',
			'/* Authored\r\n * sheet. */\r\n// Order.\r\n',
		]) {
			for (const quote of ["'", '"']) {
				const barrel = `@use ${quote}../tokens${quote};\n@use ${quote}default${quote};\n`
				expect(readSheetPrelude(prefix + barrel)).toMatch(SHEET_POLICY_BARREL_PATTERN)
			}
			expect(readSheetPrelude(prefix + '@layer reset, base;')).toMatch(SHEET_POLICY_ORDER_PATTERN)
			expect(readSheetPrelude(prefix + "@use 'default';\n@use '../tokens';")).not.toMatch(
				SHEET_POLICY_BARREL_PATTERN,
			)
			expect(readSheetPrelude(prefix + ':root { --value: 1; }\n@layer reset, base;')).not.toMatch(
				SHEET_POLICY_ORDER_PATTERN,
			)
			expect(readSheetPrelude(prefix + '@layer reset;')).not.toMatch(SHEET_POLICY_ORDER_PATTERN)
			expect(readSheetPrelude(prefix + '@layer reset, base {}')).not.toMatch(
				SHEET_POLICY_ORDER_PATTERN,
			)
		}
	})
	it('allocates a scratch directory in its requested parent and removes only that directory', () => {
		const parent = createPolicyScratch({ prefix: 'scaffold-parent-' })
		try {
			const child = createPolicyScratch({ parent: parent.path, prefix: 'scaffold-child-' })
			try {
				expect(dirname(child.path)).toBe(parent.path)
				expect(child.path).not.toBe(parent.path)
				child.write('proof.txt', 'owned')
				expect(readFileSync(join(child.path, 'proof.txt'), 'utf8')).toBe('owned')
			} finally {
				child.destroy()
			}
			expect(existsSync(child.path)).toBe(false)
			expect(existsSync(parent.path)).toBe(true)
		} finally {
			parent.destroy()
		}
	})
	it('collects complete sheets and refuses incomplete markers', () => {
		const scratch = createPolicyScratch({ prefix: 'scaffold-sheets-' })
		try {
			expect(collectSheets(scratch.path)).toEqual([])
			scratch.write('src/print/index.scss', '')
			expect(collectSheets(scratch.path)).toEqual([])
			scratch.write('src/print/sheet.ts', '')
			expect(collectSheets(scratch.path)).toEqual(['print'])
		} finally {
			scratch.destroy()
		}
	})
	it('collects framework directories on each axis and excludes other names', () => {
		const scratch = createPolicyScratch({ prefix: 'scaffold-frameworks-' })
		try {
			expect(collectFrameworks(scratch.path)).toEqual([])
			scratch.write('src/browser/index.ts', '')
			scratch.write('src/vue/index.ts', '')
			scratch.write('app/vue/index.ts', '')
			expect(collectFrameworks(scratch.path)).toEqual(['src/vue', 'app/vue'])
		} finally {
			scratch.destroy()
		}
	})
	it('reads own record entries and refuses arrays and absence', () => {
		const value = { test: { browser: true } }
		expect(readConfigRecord(value)).toEqual(value)
		expect(readConfigRecord(value)).not.toBe(value)
		for (const invalid of [undefined, null, [], 'record']) {
			expect(() => readConfigRecord(invalid)).toThrow('Expected a configuration record')
		}
	})
	it('reads script strings and refuses missing or non-string commands', () => {
		expect(readConfigScript({ build: 'vite build' }, 'build')).toBe('vite build')
		expect(() => readConfigScript({}, 'build')).toThrow('Missing script build')
		expect(() => readConfigScript({ build: true }, 'build')).toThrow('Missing script build')
	})
	it('requires wrappers for every source-selected face', () => {
		const scratch = createPolicyScratch({ prefix: 'scaffold-wrappers-' })
		try {
			expect(collectFaceWrappers(scratch.path)).toEqual([])
			scratch.write('src/vue/index.ts', '')
			expect(() => collectFaceWrappers(scratch.path)).toThrow(
				'Missing wrapper configs/src/vite.vue.config.ts',
			)
			scratch.write('configs/src/vite.vue.config.ts', '')
			expect(collectFaceWrappers(scratch.path)).toEqual(['configs/src/vite.vue.config.ts'])
		} finally {
			scratch.destroy()
		}
	})
	it('requires styles setup only when the target has the file and preserves isolation and themes order', () => {
		const project = {
			test: {
				setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts', './tests/setupStyles.ts'],
				isolate: false,
			},
		}
		const scratch = createPolicyScratch({ prefix: 'scaffold-sheet-setup-' })
		const withoutStyles = {
			test: { ...project.test, setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'] },
		}
		try {
			expect(inspectSheetConfiguration(withoutStyles, undefined, scratch.path)).toEqual([])
			scratch.write('tests/setupStyles.ts', 'export {}\n')
			expect(inspectSheetConfiguration(withoutStyles, undefined, scratch.path)).toEqual([
				'./tests/setupStyles.ts',
			])
			expect(
				inspectSheetConfiguration(
					project,
					'vite.styles.config.ts && vite.themes.config.ts',
					scratch.path,
				),
			).toEqual([])
			expect(inspectSheetConfiguration({ test: {} }, undefined, scratch.path)).toEqual([
				'./tests/setup.ts',
				'./tests/setupBrowser.ts',
				'./tests/setupStyles.ts',
				'isolate',
			])
			expect(
				inspectSheetConfiguration(
					project,
					'vite.themes.config.ts && vite.styles.config.ts',
					scratch.path,
				),
			).toEqual(['themes order'])
		} finally {
			scratch.destroy()
		}
	})
	it('reads real import diagnostics and refuses an uncollected sentinel', () => {
		const scratch = createPolicyScratch({ prefix: 'scaffold-diagnostics-' })
		try {
			scratch.write(
				'.oxlintrc.json',
				JSON.stringify({
					rules: { 'no-debugger': 'error', 'no-restricted-imports': ['error', 'node:fs'] },
				}),
			)
			scratch.write('entry.ts', "import 'node:fs'\ndebugger\n")
			expect(readImportDiagnostics(scratch.path, ['entry.ts'])).toEqual(
				new Set(['eslint(no-debugger) entry.ts', 'eslint(no-restricted-imports) entry.ts']),
			)
			scratch.write('entry.ts', "import 'node:fs'\n")
			expect(() => readImportDiagnostics(scratch.path, ['entry.ts'])).toThrow(
				'Uncollected fixture entry.ts',
			)
		} finally {
			scratch.destroy()
		}
	})
	it('distinguishes computed-import and dynamic-require diagnostics from their collection sentinels', () => {
		const scratch = createPolicyScratch({ prefix: 'scaffold-computed-diagnostics-' })
		try {
			scratch.write(
				'.oxlintrc.json',
				JSON.stringify({
					plugins: ['import'],
					rules: {
						'no-debugger': 'error',
						'import/no-dynamic-require': ['error', { esmodule: false }],
					},
				}),
			)
			scratch.write(
				'import.ts',
				'const selected = process.argv[2]\nvoid import(selected)\ndebugger\n',
			)
			scratch.write(
				'require.ts',
				'const selected = process.argv[2]\nvoid require(selected)\ndebugger\n',
			)
			expect(readImportDiagnostics(scratch.path, ['import.ts', 'require.ts'])).toEqual(
				new Set([
					'eslint(no-debugger) import.ts',
					'eslint(no-debugger) require.ts',
					'import(no-dynamic-require) require.ts',
				]),
			)
		} finally {
			scratch.destroy()
		}
	})
})

describe('inspectPolicySetup', () => {
	it('admits scaffold-owned setup paths and reports both laws for target-owned collisions', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			expect(matchesScaffoldSetup('tests\\setupDistribution.ts')).toBe(true)
			expect(matchesScaffoldSetup('tests/setupPolicy.ts')).toBe(true)
			expect(matchesScaffoldSetup('tests/setupExtra.ts')).toBe(false)
			expect(matchesScaffoldSetup('tests/setupDistribution.ts/extra.ts')).toBe(false)
			scratch.write('tests/setupDistribution.ts', 'export function readShared() {}\n')
			expect(inspectPolicySetup(scratch.path)).toEqual([])
			expect(inspectPolicyWorkspace(scratch.path)).toEqual([])
			scratch.write('tests/setupExtra.ts', 'export function readShared() {}\n')
			expect(inspectPolicySetup(scratch.path).map(({ rule, path }) => ({ rule, path }))).toEqual([
				{ rule: 'mirror', path: 'tests/setupExtra.ts' },
			])
			expect(
				inspectPolicyWorkspace(scratch.path)
					.filter(({ rule }) => rule === 'surface')
					.map(({ rule, path }) => ({ rule, path })),
			).toEqual([{ rule: 'surface', path: 'tests/setupExtra.ts' }])
		} finally {
			scratch.destroy()
		}
	})
	it.each(SETUP_POLICY_CONTROLS)('$label through the setup inspector', (control) => {
		const scratch = createPolicyScratch({ prefix: 'scaffold-setup-control-' })
		try {
			for (const file of control.files) scratch.write(file.path, file.content)
			expect(inspectPolicySetup(scratch.path)).toEqual(control.violations)
		} finally {
			scratch.destroy()
		}
	})
	it('reads TypeScript import declarations and excludes import-shaped strings', () => {
		const scratch = createPolicyScratch({ prefix: 'scaffold-setup-typescript-' })
		try {
			scratch.write('tests/setup.ts', '')
			scratch.write('tests/setupCanvas.ts', 'export interface Canvas { readonly width: number }\n')
			scratch.write(
				'tests/setup.test.ts',
				"import type { Canvas } from './setupCanvas.js'\nconst canvas: Canvas = { width: 1 }\nvoid canvas\n",
			)
			expect(inspectPolicySetup(scratch.path)).toEqual([])
			scratch.write(
				'tests/setup.test.ts',
				"const text = `\nimport { Canvas } from './setupCanvas.js'\n`\nvoid text\n",
			)
			expect(inspectPolicySetup(scratch.path)).toEqual([
				expect.objectContaining({ rule: 'mirror', path: 'tests/setupCanvas.ts' }),
			])
		} finally {
			scratch.destroy()
		}
	})
	it('excludes an indented module augmentation export and detects a top-level export', () => {
		const scratch = createPolicyScratch({ prefix: 'scaffold-augmentation-' })
		try {
			scratch.write(
				'tests/setupBrowser.ts',
				"import 'vitest'\ndeclare module 'vitest' {\n\texport interface ProvidedContext { readonly capture: boolean }\n}\n",
			)
			expect(inspectPolicySetup(scratch.path)).toEqual([])
			scratch.write(
				'tests/setupBrowser.ts',
				'export interface Capture { readonly enabled: boolean }\n',
			)
			expect(inspectPolicySetup(scratch.path)).toEqual([
				expect.objectContaining({ rule: 'mirror', path: 'tests/setupBrowser.ts' }),
			])
		} finally {
			scratch.destroy()
		}
	})
	it('requires proof for an exporting root module and admits its sibling proof', () => {
		const scratch = createPolicyScratch({ prefix: 'orkestrel-setup-mirror-' })
		try {
			scratch.write('tests/setupCanvas.ts', 'export const CANVAS = 1\n')
			expect(inspectPolicySetup(scratch.path)).toEqual([
				{
					rule: 'mirror',
					path: 'tests/setupCanvas.ts',
					message:
						'exporting setup module requires its sibling proof or an import from tests/setup.test.ts',
				},
			])
			scratch.write('tests/setupCanvas.test.ts', '')
			expect(inspectPolicySetup(scratch.path)).toEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('admits a non-exporting module without a proof', () => {
		const scratch = createPolicyScratch({ prefix: 'orkestrel-setup-mirror-' })
		try {
			scratch.write('tests/setupCanvas.ts', 'const canvas = 1\nvoid canvas\n')
			expect(inspectPolicySetup(scratch.path)).toEqual([])
			scratch.write('tests/setupCanvas.ts', 'export const CANVAS = 1\n')
			expect(inspectPolicySetup(scratch.path)).toEqual([
				expect.objectContaining({ rule: 'mirror', path: 'tests/setupCanvas.ts' }),
			])
		} finally {
			scratch.destroy()
		}
	})

	it('requires a module for a root setup proof', () => {
		const scratch = createPolicyScratch({ prefix: 'orkestrel-setup-mirror-' })
		try {
			scratch.write('tests/setupCanvas.test.ts', '')
			expect(inspectPolicySetup(scratch.path)).toEqual([
				{
					rule: 'mirror',
					path: 'tests/setupCanvas.test.ts',
					message: 'setup proof requires its module: tests/setupCanvas.ts',
				},
			])
			scratch.write('tests/setupCanvas.ts', '')
			expect(inspectPolicySetup(scratch.path)).toEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('admits exporting modules imported by the shared setup proof and covers setup itself', () => {
		const scratch = createPolicyScratch({ prefix: 'orkestrel-setup-mirror-' })
		try {
			scratch.write('tests/setup.ts', 'export const SHARED = 1\n')
			scratch.write('tests/setupCanvas.ts', 'export const CANVAS = 1\n')
			scratch.write('tests/setup.test.ts', "import { CANVAS } from './setupCanvas.js'\n")
			expect(inspectPolicySetup(scratch.path)).toEqual([])
			scratch.write('tests/setup.test.ts', "import { CANVAS } from './setupCanvasOther.js'\n")
			expect(inspectPolicySetup(scratch.path)).toEqual([
				expect.objectContaining({ rule: 'mirror', path: 'tests/setupCanvas.ts' }),
			])
		} finally {
			scratch.destroy()
		}
	})

	it('excludes inventory-vendored setup modules without exempting target-owned names', () => {
		const scratch = createPolicyScratch({ prefix: 'orkestrel-setup-mirror-' })
		try {
			scratch.write('tests/setupPolicy.ts', 'export const POLICY = 1\n')
			expect(inspectPolicySetup(scratch.path)).toEqual([])
			scratch.write('tests/setupStyles.ts', 'export const SHEET = 1\n')
			expect(inspectPolicySetup(scratch.path)).toEqual([
				expect.objectContaining({ rule: 'mirror', path: 'tests/setupStyles.ts' }),
			])
		} finally {
			scratch.destroy()
		}
	})
})

describe('readSkillManifest', () => {
	it('reads the manifest a directory holds and reports absence for one holding none', () => {
		const scratch = createPolicyScratch({ prefix: 'orkestrel-skill-manifest-' })
		try {
			scratch.write('package.json', '{"name":"@orkestrel/sample"}')
			const manifest = readSkillManifest(scratch.path)
			expect(requireValue(manifest)).toEqual({ name: '@orkestrel/sample' })
			expect(readSkillManifest(join(scratch.path, 'absent'))).toBeUndefined()
		} finally {
			scratch.destroy()
		}
	})
})

describe('readSkillExports', () => {
	it('resolves root exports from the installed declaration entry', () => {
		const entry = readSkillExports(process.cwd(), '@orkestrel/test')
		expect(entry.outcome).toBe('read')
		expect(entry.names).toContain('waitForCondition')
		expect(entry.names).toContain('WaitOptions')
		expect(entry.names).not.toContain('s2MissingValue')
	})

	it('resolves browser exports without loading the browser runtime', () => {
		const entry = readSkillExports(process.cwd(), '@orkestrel/test/browser')
		expect(entry.outcome).toBe('read')
		expect(entry.names).toContain('clickAccessible')
		expect(entry.names).toContain('CaptureVariant')
		expect(entry.names).not.toContain('S2MissingType')
	})

	it('resolves the package this workspace publishes through its own manifest', () => {
		const entry = readSkillExports(process.cwd(), '@orkestrel/scaffold')
		expect(entry.outcome).toBe('read')
		expect(entry.names).toContain('BASE_DEV_DEPENDENCIES')
		expect(entry.names).toContain('HOST_PATHS')
	})

	it('names the exports key an installed map does not declare', () => {
		const entry = readSkillExports(process.cwd(), '@orkestrel/test/missing')
		expect(entry.outcome).toBe('entry')
		expect(entry.detail).toBe('./missing')
		expect(entry.names).toEqual([])
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
			expect(readSkillExports(scratch.path, '@orkestrel/test').names).toEqual([
				'Renamed',
				'exportedValue',
			])
			expect(readSkillExports(scratch.path, '@orkestrel/test/values').outcome).toBe('entry')
			expect(readSkillExports(scratch.path, '@orkestrel/test/runtime').outcome).toBe('entry')
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
			const entry = readSkillDeclarations(join(scratch.path, 'entry.d.ts'))
			expect(entry.outcome).toBe('read')
			expect(entry.names).toEqual([
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

	it('resolves a name re-exported through a cycle against what the visited file declares', () => {
		const scratch = createPolicyScratch({ prefix: 'orkestrel-skill-cycle-' })
		try {
			scratch.write(
				'entry.d.ts',
				"export declare const VALUE: string\nexport { VALUE as ALIAS } from './bridge.js'\n",
			)
			scratch.write('bridge.d.ts', "export { VALUE } from './entry.js'\n")
			const entry = readSkillDeclarations(join(scratch.path, 'entry.d.ts'))
			expect(entry.outcome).toBe('read')
			expect(entry.names).toEqual(['ALIAS', 'VALUE'])
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a name re-exported through a cycle that the visited file does not declare', () => {
		const scratch = createPolicyScratch({ prefix: 'orkestrel-skill-cycle-absent-' })
		try {
			scratch.write(
				'entry.d.ts',
				"export declare const VALUE: string\nexport { ABSENT } from './bridge.js'\n",
			)
			scratch.write('bridge.d.ts', "export { ABSENT } from './entry.js'\n")
			const entry = readSkillDeclarations(join(scratch.path, 'entry.d.ts'))
			expect(entry.outcome).toBe('name')
			expect(entry.detail).toBe('ABSENT')
		} finally {
			scratch.destroy()
		}
	})

	it('reads a star re-export cycle without looping or dropping a declared name', () => {
		const scratch = createPolicyScratch({ prefix: 'orkestrel-skill-cycle-star-' })
		try {
			scratch.write(
				'entry.d.ts',
				"export declare const ROOT: string\nexport * from './bridge.js'\n",
			)
			scratch.write(
				'bridge.d.ts',
				"export declare const LEAF: string\nexport * from './entry.js'\n",
			)
			const entry = readSkillDeclarations(join(scratch.path, 'entry.d.ts'))
			expect(entry.outcome).toBe('read')
			expect(entry.names).toEqual(['LEAF', 'ROOT'])
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
				const entry = readSkillDeclarations(join(scratch.path, 'entry.d.ts'))
				expect(Object.hasOwn(SKILL_DECLARATION_MESSAGES, entry.outcome)).toBe(true)
				expect(entry.names).toEqual([])
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
	it('reports a specifier whose exports map declares no such entry', () => {
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
				message:
					'skill fence import @orkestrel/test/missing has no declaration entry for ./missing',
			},
		])
	})

	it('accepts a named import of the package this workspace publishes', () => {
		expect(
			inspectSkillImports(
				process.cwd(),
				'SKILL.md',
				'```ts\nimport { BASE_DEV_DEPENDENCIES } from "@orkestrel/scaffold"\n```\n',
			),
		).toEqual([])
	})

	for (const scenario of SKILL_REFUSAL_CASES) {
		it(`names the refusal cause: ${scenario.label}`, () => {
			const scratch = createPolicyScratch({ prefix: 'orkestrel-skill-cause-' })
			try {
				for (const file of scenario.files) scratch.write(file.path, file.content)
				expect(
					inspectSkillImports(
						scratch.path,
						'SKILL.md',
						`\`\`\`ts\nimport { VALUE } from '${scenario.specifier}'\n\`\`\`\n`,
					),
				).toEqual([{ rule: 'skill', path: 'SKILL.md', message: scenario.message }])
			} finally {
				scratch.destroy()
			}
		})
	}

	it('names the parser message a declaration file raised', () => {
		const scratch = createPolicyScratch({ prefix: 'orkestrel-skill-cause-syntax-' })
		try {
			scratch.write(
				'node_modules/@orkestrel/test/package.json',
				'{"name":"@orkestrel/test","exports":{".":{"types":"./entry.d.ts"}}}',
			)
			scratch.write('node_modules/@orkestrel/test/entry.d.ts', 'export const =\n')
			expect(
				inspectSkillImports(
					scratch.path,
					'SKILL.md',
					'```ts\nimport { VALUE } from "@orkestrel/test"\n```\n',
				),
			).toEqual([
				{
					rule: 'skill',
					path: 'SKILL.md',
					message:
						'skill fence import @orkestrel/test has a declaration syntax error: Unexpected token',
				},
			])
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a fence the parser cannot read beside an Orkestrel import', () => {
		expect(
			inspectSkillImports(
				process.cwd(),
				'SKILL.md',
				'```ts\nimport { waitForCondition } from "@orkestrel/test"\nconst value =\n```\n',
			),
		).toEqual([
			{
				rule: 'skill',
				path: 'SKILL.md',
				message: 'skill fence could not be parsed: Unexpected token',
			},
		])
	})

	it('leaves a fence the parser cannot read outside the check when it names no Orkestrel import', () => {
		expect(
			inspectSkillImports(
				process.cwd(),
				'SKILL.md',
				'```ts\nimport { external } from "external-package"\nconst value =\n```\n',
			),
		).toEqual([])
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

	it('accepts sheet barrels over bare SCSS entries for base, extension, and themes faces', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			scratch.write('src/core/index.ts', "export * from './helpers.js'\n")
			scratch.write('src/core/helpers.ts', 'export function readSample() {}\n')
			for (const face of ['styles', 'print', 'styles/themes']) {
				scratch.write(`src/${face}/index.scss`, '')
				scratch.write(`src/${face}/index.ts`, "export * from './sheet.js'\n")
				scratch.write(`src/${face}/sheet.ts`, "import './index.scss'\n")
			}
			expect(readPolicySurface(scratch.path)).toEqual({
				declarations: [{ name: 'readSample', path: 'src/core/helpers.ts', line: 1 }],
				violations: [],
			})
		} finally {
			scratch.destroy()
		}
	})

	it('refuses extra exports in each selected sheet entry', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			for (const face of ['styles', 'print', 'styles/themes']) {
				scratch.write(`src/${face}/index.scss`, '')
				scratch.write(`src/${face}/index.ts`, "export * from './sheet.js'\n")
				scratch.write(`src/${face}/sheet.ts`, "import './index.scss'\nexport const token = 1\n")
				expect(readPolicySurface(scratch.path).violations).toEqual([
					{
						rule: 'surface',
						path: `src/${face}/sheet.ts`,
						line: 1,
						message:
							'surface population incomplete: styles entry must import ./index.scss and nothing else',
					},
				])
				scratch.write(`src/${face}/sheet.ts`, "import './index.scss'\n")
			}
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a direct SCSS import in a sheet barrel', () => {
		const scratch = createPolicySurfaceFixture()
		try {
			scratch.write('src/styles/index.ts', "import './index.scss'\n")
			expect(readPolicySurface(scratch.path).violations).toEqual([
				{
					rule: 'surface',
					path: 'src/styles/index.ts',
					line: 1,
					message:
						'surface population incomplete: barrel requires a relative .js star export on one line',
				},
			])
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
			scratch.write('tests/setupServer.ts', '')
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

describe('inspectSkill', () => {
	it('accepts the pointer set a target receives for a real skill of this checkout', () => {
		const name = 'orkestrel-harden'
		const canonical = readFileSync(join(process.cwd(), `.agents/skills/${name}/SKILL.md`), 'utf8')
		const files = {
			[`.agents/skills/${name}/SKILL.md`]: requireValue(renderSkillPointer(canonical, name)),
			[`.agents/skills/${name}/agents/openai.yaml`]: readFileSync(
				join(process.cwd(), `.agents/skills/${name}/agents/openai.yaml`),
				'utf8',
			),
			[`.claude/skills/${name}/SKILL.md`]: readFileSync(
				join(process.cwd(), `.claude/skills/${name}/SKILL.md`),
				'utf8',
			),
		}
		const scratch = createPolicyScratch({ prefix: 'orkestrel-skill-pointer-' })
		const control = createPolicyScratch({ prefix: 'orkestrel-skill-canonical-' })
		try {
			for (const [path, text] of Object.entries(files)) {
				scratch.write(path, text)
				control.write(path, text)
			}
			expect(inspectSkill(scratch.path, name, process.cwd())).toStrictEqual([])
			expect(inspectBridge(scratch.path, name)).toStrictEqual([])
			expect(inspectSkillBridges(scratch.path)).toStrictEqual([])
			// The control: the canonical file itself, carried without the references and
			// scripts it names, is what the pointer keeps out of a target.
			control.write(`.agents/skills/${name}/SKILL.md`, canonical)
			expect(inspectSkill(control.path, name, process.cwd())).not.toStrictEqual([])
		} finally {
			scratch.destroy()
			control.destroy()
		}
	})
})

describe('the policy readers', () => {
	it('parses JSON text and answers undefined for text that is not JSON', () => {
		expect(parsePolicyJSON('{"scripts":{"test":"vitest"}}')).toStrictEqual({
			scripts: { test: 'vitest' },
		})
		expect(parsePolicyJSON('[1,2]')).toStrictEqual([1, 2])
		expect(parsePolicyJSON('{')).toBe(undefined)
		expect(parsePolicyJSON('')).toBe(undefined)
	})

	it('extracts the lines beneath a heading up to the next second-level heading', () => {
		const lines = ['# Top', '## Rules', 'one', 'two', '### Sub', '## Next', 'three']
		expect(extractPolicySection(lines, 1)).toStrictEqual(['one', 'two', '### Sub'])
		expect(extractPolicySection(lines, 5)).toStrictEqual(['three'])
		expect(extractPolicySection(lines, 6)).toStrictEqual([])
		expect(extractPolicySection(lines, 0)).toStrictEqual([])
	})

	it('folds a description block, joins its blank lines, and stops at the next key', () => {
		const frontmatter = requireValue(
			parseSkillFrontmatter(
				'---\nname: demo\ndescription: >-\n  Use it.\n  More.\n\n  Third.\nextra: yes\n---\nBody\n',
			),
		)
		expect(frontmatter.keys).toStrictEqual(['name', 'description', 'extra'])
		expect(frontmatter.name).toBe('demo')
		expect(frontmatter.description).toBe('Use it. More.\nThird.')
		expect(frontmatter.source).toStrictEqual({
			name: ' demo',
			description: ' >-\n  Use it.\n  More.\n\n  Third.',
		})
		// The controls: a quoted description, a folded block on another key, and an unclosed block
		// each refuse, so the folding above is not a reader that accepts every shape.
		expect(parseSkillFrontmatter('---\nname: demo\ndescription: "Use it."\n---\n')).toBe(undefined)
		expect(parseSkillFrontmatter('---\nname: >-\n  demo\n---\n')).toBe(undefined)
		expect(parseSkillFrontmatter('---\nname: demo\n')).toBe(undefined)
	})

	it('matches a skill token only as a complete name', () => {
		expect(matchesSkillToken('Use $demo now', 'demo')).toBe(true)
		expect(matchesSkillToken('Use $demo', 'demo')).toBe(true)
		expect(matchesSkillToken('Use $demo-two now', 'demo')).toBe(false)
		expect(matchesSkillToken('Use $demox now', 'demo')).toBe(false)
		expect(matchesSkillToken('Use $demo-two and $demo.', 'demo')).toBe(true)
		expect(matchesSkillToken('Use demo', 'demo')).toBe(false)
	})

	it('matches a token at every occurrence, one that overlaps another included', () => {
		// A name carrying `$` makes the token overlap itself: `$a$` occurs at index 0 and at index 2.
		expect(matchesSkillToken('$a$a$', 'a$')).toBe(true)
		expect(matchesSkillToken('$a$a', 'a$')).toBe(false)
		// Repeated `$` signs start a candidate each, and only the occurrence that ends the prompt or
		// meets a character outside the name alphabet is complete.
		expect(matchesSkillToken('$$$', '$')).toBe(true)
		expect(matchesSkillToken('$$a', '$a')).toBe(true)
		expect(matchesSkillToken('$$ab', '$a')).toBe(false)
		expect(matchesSkillToken('$$a-$a ', '$a')).toBe(false)
		expect(matchesSkillToken('$$a-$$a ', '$a')).toBe(true)
		expect(matchesSkillToken('', 'a')).toBe(false)
	})

	it('finds a token in a prompt far longer than the token', () => {
		const filler = 'x'.repeat(200_000)
		expect(matchesSkillToken(`${filler}$demo`, 'demo')).toBe(true)
		expect(matchesSkillToken(`$demo ${filler}`, 'demo')).toBe(true)
		// The controls: the same prompt without the token, and with only an extended name, matches nothing.
		expect(matchesSkillToken(filler, 'demo')).toBe(false)
		expect(matchesSkillToken(`${filler}$demo-two`, 'demo')).toBe(false)
	})

	it('reports each template TODO outside code spans and fences, in line order', () => {
		const content = [
			'# Title',
			'TODO outside',
			'`TODO inline` and TODO',
			'```',
			'TODO fenced',
			'```',
			'TODO after',
			'~~~~',
			'TODO in tilde',
			'~~~',
			'still fenced TODO',
			'~~~~',
			'TODO end',
			'TODO `unterminated TODO',
		].join('\n')
		expect(
			inspectSkillTemplateTODOs('skill', '.agents/skills/demo/SKILL.md', content).map(
				({ line }) => line,
			),
		).toStrictEqual([2, 3, 7, 13, 14, 14])
		expect(inspectSkillTemplateTODOs('bridge', 'path', 'clean\n`TODO`\n')).toStrictEqual([])
	})
})

describe('the inspectors over caller-supplied lists with holes', () => {
	const enabled = Object.fromEntries(POLICY_WIRING_RULES.map((rule) => [rule, 'error']))
	const malformed = ['override entries must be records']

	it('builds a list whose holes are absent rather than undefined', () => {
		const list = createPolicySparse(3, new Map([[1, 'x']]))
		expect(list.length).toBe(3)
		expect(Object.keys(list)).toStrictEqual(['1'])
		expect(0 in list).toBe(false)
		expect(createPolicySparse(2, new Map<number, string>()).length).toBe(2)
	})

	it('reports a hole among the overrides as it reports an undefined entry', () => {
		expect(
			inspectPolicyConfiguration({
				rules: enabled,
				overrides: createPolicySparse(1, new Map<number, unknown>()),
			}),
		).toStrictEqual(malformed)
		expect(
			inspectPolicyConfiguration({
				rules: enabled,
				overrides: createPolicySparse(2, new Map([[1, {}]])),
			}),
		).toStrictEqual(malformed)
		expect(
			inspectPolicyConfiguration({
				rules: enabled,
				overrides: createPolicySparse(
					3,
					new Map([
						[0, 7],
						[2, 8],
					]),
				),
			}),
		).toStrictEqual([...malformed, ...malformed, ...malformed])
		// The controls: an undefined entry reports the same, and an empty list and a record report none.
		expect(inspectPolicyConfiguration({ rules: enabled, overrides: [undefined] })).toStrictEqual(
			malformed,
		)
		expect(inspectPolicyConfiguration({ rules: enabled, overrides: [] })).toStrictEqual([])
		expect(inspectPolicyConfiguration({ rules: enabled, overrides: [{}] })).toStrictEqual([])
	})

	it('skips a hole among the ignore patterns as it skips a pattern that is no string', () => {
		expect(
			inspectPolicyConfiguration({
				rules: enabled,
				ignorePatterns: createPolicySparse(2, new Map([[1, 'src']])),
			}),
		).toStrictEqual(['ignorePatterns must not reach src'])
		expect(
			inspectPolicyConfiguration({ rules: enabled, ignorePatterns: [undefined, 'src'] }),
		).toStrictEqual(['ignorePatterns must not reach src'])
	})

	it('names a hole among the rules the way it names an undefined rule', () => {
		const sparse = createPolicySparse(2, new Map([[1, 'absent-rule']]))
		expect(inspectPolicyWiring({ rules: enabled }, sparse, [])).toStrictEqual([
			'undefined is enabled by no top-level or override rules record',
			'absent-rule is enabled by no top-level or override rules record',
		])
		// The control: a dense list names each rule once and names none that is enabled.
		expect(
			inspectPolicyWiring({ rules: enabled }, ['absent-rule', ...POLICY_WIRING_RULES], []),
		).toStrictEqual(['absent-rule is enabled by no top-level or override rules record'])
	})

	it('refuses a hole among the populations as it refuses an entry that is no list', () => {
		const sparse = createPolicySparse(2, new Map([[1, ['a']]]))
		expect(() => inspectPolicyWiring({ rules: enabled }, [], sparse)).toThrow(/join/u)
		// The control: the entry after the hole alone reports its population.
		expect(inspectPolicyWiring({ rules: enabled }, [], [['a']])).toStrictEqual([
			'no override files list declares the population exactly: a',
		])
	})

	it('normalizes a hole among the mirror paths, which refuses it', () => {
		const sparse = createPolicySparse(2, new Map([[0, 'tests/src/core/A.test.ts']]))
		expect(() => inspectPolicyMirrorPaths(sparse, new Set())).toThrow(/replaceAll/u)
		// The control: the dense list reports the missing module.
		expect(
			inspectPolicyMirrorPaths(['tests/src/core/A.test.ts'], new Set()).map(({ path }) => path),
		).toStrictEqual(['tests/src/core/A.test.ts'])
	})

	it('normalizes a hole among the filename paths, which refuses it', () => {
		expect(() =>
			inspectPolicyFilenamePaths(createPolicySparse(1, new Map<number, string>())),
		).toThrow(/replaceAll/u)
		expect(() =>
			inspectPolicyFilenamePaths(createPolicySparse(2, new Map([[1, 'a/B.ts']]))),
		).toThrow(/replaceAll/u)
		// The control: the dense list reports the case collision.
		expect(inspectPolicyFilenamePaths(['a/b.ts', 'a/B.ts']).map(({ path }) => path)).toStrictEqual([
			'a/B.ts',
		])
	})
})

describe('the inspectors consume a caller-supplied list one entry at a time', () => {
	it.each(POLICY_LAZY_CASES)('$label', (lazy) => {
		const reads = createRecorder<[number]>()
		expect(lazy.observe(reads.handler)).toBe(lazy.outcome)
		expect(reads.calls).toStrictEqual(lazy.reads.map((index) => [index]))
	})

	it('separates a reader that copies the list first from one that consumes it', () => {
		// The control: a spread reads entry 1 before it reads entry 0's hole, so the failing entry
		// that the lazy case never reads is read and its constructor replaces the hole's.
		const copying = createPolicyLazyCase(
			'copying reader',
			(list: string[]) => [...list].map((entry) => entry.length),
			{ length: 2, entries: new Map([[1, failPolicyRead]]) },
			{ outcome: 'throw TypeError', reads: [] },
		)
		const reads = createRecorder<[number]>()
		expect(copying.observe(reads.handler)).toBe('throw RangeError')
		expect(reads.calls).toStrictEqual([[1]])
		const consuming = createPolicyLazyCase(
			'consuming reader',
			(list: string[]) => Array.from(list, (entry) => entry.length),
			{ length: 2, entries: new Map([[1, failPolicyRead]]) },
			{ outcome: 'throw TypeError', reads: [] },
		)
		const stopped = createRecorder<[number]>()
		expect(consuming.observe(stopped.handler)).toBe(consuming.outcome)
		expect(stopped.calls).toStrictEqual([])
	})

	it('builds a list whose getters record each read and leave every other index a hole', () => {
		const reads = createRecorder<[number]>()
		const list = createPolicyReads(
			3,
			new Map([
				[0, () => 'a'],
				[2, failPolicyRead],
			]),
			reads.handler,
		)
		expect(list.length).toBe(3)
		expect(Object.keys(list)).toStrictEqual(['0', '2'])
		expect(1 in list).toBe(false)
		expect(reads.calls).toStrictEqual([])
		expect(list[0]).toBe('a')
		expect(list[0]).toBe('a')
		expect(() => list[2]).toThrow(RangeError)
		expect(reads.calls).toStrictEqual([[0], [0], [2]])
		// The control: an empty map builds a list of holes that records nothing.
		const empty = createRecorder<[number]>()
		expect(
			Object.keys(createPolicyReads(2, new Map<number, () => string>(), empty.handler)),
		).toStrictEqual([])
		expect(empty.calls).toStrictEqual([])
	})

	it('settles a return, an error, and a thrown non-error into text', () => {
		expect(settlePolicyOutcome(() => [1, 'a'])).toBe('return [1,"a"]')
		expect(settlePolicyOutcome(() => undefined)).toBe('return undefined')
		expect(
			settlePolicyOutcome(() => {
				throw new TypeError('refused')
			}),
		).toBe('throw TypeError')
		expect(settlePolicyOutcome(failPolicyRead)).toBe('throw RangeError')
		expect(
			settlePolicyOutcome(() => {
				throw 'refused'
			}),
		).toBe('throw string')
	})
})

describe('collectGuideStatements', () => {
	const exclusion = POLICY_STUDIES_POPULATION.exclusion

	it('collects each prose sentence that names the subject with a marker, across line breaks', () => {
		const markdown = [
			'# Guide',
			'',
			'Add an exact-case `*.test.ts` file beneath `tests/studies`,',
			`${exclusion}, for \`studies\`. A sibling sentence names no marker for \`studies\`.`,
			'',
			'The `studies` project collects test files. Another subject has test files too.',
		].join('\n')
		expect(collectGuideStatements(markdown, POLICY_STUDIES_POPULATION)).toStrictEqual([
			`Add an exact-case \`*.test.ts\` file beneath \`tests/studies\`, ${exclusion}, for \`studies\`.`,
			'The `studies` project collects test files.',
		])
	})

	it('reads each table cell as a text of its own and a fenced block as no prose', () => {
		const markdown = [
			'| `STUDIES_TEST_INCLUDE` | const | The `studies` test files. |',
			'',
			'```text',
			'The `studies` test files are here.',
			'```',
			'',
			'Prose names the `studies` test files.',
		].join('\n')
		expect(collectGuideStatements(markdown, POLICY_STUDIES_POPULATION)).toStrictEqual([
			'The `studies` test files.',
			'Prose names the `studies` test files.',
		])
		// A subject in one cell and a marker in another state nothing together, and a pipe the cell
		// escapes stays inside it.
		expect(
			collectGuideStatements('| `studies` | a `*.test.ts` file |', POLICY_STUDIES_POPULATION),
		).toStrictEqual([])
		expect(
			collectGuideStatements(
				'| name | The `studies` test files \\| and more. |',
				POLICY_STUDIES_POPULATION,
			),
		).toStrictEqual(['The `studies` test files \\| and more.'])
	})

	it('separates a sentence that carries the exclusion from one that omits it', () => {
		// The control: the instrument tells the two apart, so an empty list of offenders is a result.
		const markdown = [
			`The \`studies\` fact reads a \`*.test.ts\` file ${exclusion}.`,
			'',
			'The `studies` fact reads a `*.test.ts` file beneath `tests/studies`.',
		].join('\n')
		const statements = collectGuideStatements(markdown, POLICY_STUDIES_POPULATION)
		expect(statements.length).toBe(2)
		expect(statements.filter((sentence) => !sentence.includes(exclusion))).toStrictEqual([
			'The `studies` fact reads a `*.test.ts` file beneath `tests/studies`.',
		])
		expect(collectGuideStatements('', POLICY_STUDIES_POPULATION)).toStrictEqual([])
	})
})

describe('runPolicyCommand', () => {
	it('returns what the command printed, and refuses a failing or absent command', () => {
		expect(runPolicyCommand(process.execPath, ['-p', '6*7']).trim()).toBe('42')
		expect(() => runPolicyCommand(process.execPath, ['-e', 'process.exit(3)'])).toThrow(
			/exited with 3/u,
		)
		expect(() => runPolicyCommand('orkestrel-absent-command', [])).toThrow(/ENOENT/u)
	})
})

describe('denyPolicyRead', () => {
	it('refuses the read while it holds and restores the permission state it found', (context) => {
		context.skip(
			process.getuid?.() === 0,
			'a POSIX root user reads a file whose mode withholds read, so no denial reaches the read',
		)
		const scratch = createScratch({ prefix: 'policy-deny-' })
		try {
			const file = scratch.write('package.json', '{"name":"@orkestrel/control"}')
			const before = readPolicyPermissions(file)
			const restore = denyPolicyRead(file)
			try {
				expect(readPolicyPermissions(file)).not.toBe(before)
				expect(() => readFileSync(file, 'utf8')).toThrow(/EPERM|EACCES/u)
			} finally {
				restore()
			}
			expect(readPolicyPermissions(file)).toBe(before)
			expect(readFileSync(file, 'utf8')).toBe('{"name":"@orkestrel/control"}')
		} finally {
			scratch.destroy()
		}
	})

	it('keeps a deny entry the file already carried', (context) => {
		context.skip(
			process.platform !== 'win32',
			'an access-control entry that denies one right is a Windows list entry; the POSIX state is the mode the next case keeps',
		)
		const scratch = createScratch({ prefix: 'policy-deny-entry-' })
		try {
			const file = scratch.write('package.json', '{}')
			const user = userInfo().username
			runPolicyCommand('icacls', [file, '/deny', `${user}:(W)`])
			try {
				const before = readPolicyPermissions(file)
				expect(before).toContain('(DENY)(W)')
				denyPolicyRead(file)()
				expect(readPolicyPermissions(file)).toBe(before)
			} finally {
				runPolicyCommand('icacls', [file, '/remove:d', user])
			}
		} finally {
			scratch.destroy()
		}
	})

	it('refuses to report a restore that left the state different', (context) => {
		context.skip(
			process.platform !== 'win32',
			'a POSIX mode restore writes back the exact mode it read, so only a Windows list can hold an entry the restore also removes',
		)
		const scratch = createScratch({ prefix: 'policy-deny-differs-' })
		try {
			const file = scratch.write('package.json', '{}')
			runPolicyCommand('icacls', [file, '/deny', `${POLICY_DENY_PRINCIPAL}:(R)`])
			try {
				const restore = denyPolicyRead(file)
				expect(restore).toThrow(/did not restore exactly/u)
			} finally {
				runPolicyCommand('icacls', [file, '/remove:d', POLICY_DENY_PRINCIPAL])
			}
		} finally {
			scratch.destroy()
		}
	})

	it('restores the mode the file carried rather than a fixed one', (context) => {
		context.skip(
			process.platform === 'win32',
			'Windows maps a written mode onto the read-only attribute alone, so a mode does not round-trip there',
		)
		const scratch = createScratch({ prefix: 'policy-deny-mode-' })
		try {
			const file = scratch.write('package.json', '{}')
			chmodSync(file, 0o640)
			expect(readPolicyPermissions(file)).toBe('640')
			const restore = denyPolicyRead(file)
			expect(readPolicyPermissions(file)).toBe('0')
			restore()
			expect(readPolicyPermissions(file)).toBe('640')
			expect(statSync(file).mode & 0o7777).toBe(0o640)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a file the host cannot read the permissions of', () => {
		const scratch = createScratch({ prefix: 'policy-deny-absent-' })
		try {
			expect(() => denyPolicyRead(join(scratch.path, 'absent.json'))).toThrow(
				process.platform === 'win32' ? /icacls .* exited with/u : /ENOENT/u,
			)
		} finally {
			scratch.destroy()
		}
	})
})

describe('readPolicyPackage', () => {
	it('answers undefined for a manifest the host refuses to read and its name once it may', (context) => {
		context.skip(
			process.getuid?.() === 0,
			'a POSIX root user reads a file whose mode withholds read, so no denial reaches the read',
		)
		const scratch = createScratch({ prefix: 'policy-package-' })
		try {
			const manifest = scratch.write('package.json', '{"name":"@orkestrel/control"}')
			expect(readPolicyPackage(scratch.path)).toBe('control')
			const restore = denyPolicyRead(manifest)
			try {
				// The host refuses the open, so the regular-file check above the read is the only gate left.
				expect(() => readFileSync(manifest, 'utf8')).toThrow(/EPERM|EACCES/u)
				expect(readPolicyPackage(scratch.path)).toBe(undefined)
			} finally {
				restore()
			}
			expect(readPolicyPackage(scratch.path)).toBe('control')
		} finally {
			scratch.destroy()
		}
	})

	it('answers undefined for malformed manifest text, a directory, and an absent file', () => {
		const scratch = createScratch({ prefix: 'policy-package-' })
		const directory = createScratch({ prefix: 'policy-package-directory-' })
		try {
			expect(readPolicyPackage(scratch.path)).toBe(undefined)
			scratch.write('package.json', '{')
			expect(readPolicyPackage(scratch.path)).toBe(undefined)
			scratch.write('package.json', '{"name":7}')
			expect(readPolicyPackage(scratch.path)).toBe(undefined)
			scratch.write('package.json', '{"name":"plain"}')
			expect(readPolicyPackage(scratch.path)).toBe('plain')
			directory.ensure('package.json')
			expect(readPolicyPackage(directory.path)).toBe(undefined)
			expect(readPolicyJSON(join(scratch.path, 'package.json'))).toStrictEqual({ name: 'plain' })
			expect(readPolicyJSON(join(scratch.path, 'absent.json'))).toBe(undefined)
			expect(readPolicyJSON(join(directory.path, 'package.json'))).toBe(undefined)
			scratch.write('malformed.json', '{')
			expect(readPolicyJSON(join(scratch.path, 'malformed.json'))).toBe(undefined)
		} finally {
			scratch.destroy()
			directory.destroy()
		}
	})
})

describe('the workspace readings', () => {
	it('anchors the root at the checkout the tests run in', () => {
		expect(POLICY_ROOT).toBe(resolve('.'))
		expect(existsSync(join(POLICY_ROOT, 'tests', 'setupPolicy.ts'))).toBe(true)
	})

	it('reads a physical directory and refuses a file, a missing path, and a link', () => {
		const scratch = createScratch({ prefix: 'policy-directory-' })
		try {
			scratch.write('directory/file.txt', 'x')
			expect(isPolicyDirectory(join(scratch.path, 'directory'))).toBe(true)
			expect(isPolicyDirectory(join(scratch.path, 'directory', 'file.txt'))).toBe(false)
			expect(isPolicyDirectory(join(scratch.path, 'absent'))).toBe(false)
			scratch.link('linked', join(scratch.path, 'directory'))
			expect(isPolicyDirectory(join(scratch.path, 'linked'))).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('resolves an installed package and answers undefined for an absent one', () => {
		const resolved = requireValue(resolvePolicyPackage('vitest/package.json'))
		expect(existsSync(resolved)).toBe(true)
		expect(resolvePolicyPackage('@absent/policy-package')).toBe(undefined)
	})

	it('derives the published axis and the extractor from what the checkout holds', () => {
		const published = ['core', 'browser', 'server'].some((environment) =>
			existsSync(join(POLICY_ROOT, 'src', environment)),
		)
		expect(POLICY_PUBLISHES).toBe(published)
		expect(POLICY_EXTRACTOR !== undefined).toBe(
			existsSync(join(POLICY_ROOT, 'node_modules', '@microsoft', 'api-extractor')),
		)
	})
})
