import type { Audit, Release, ToolchainHold } from '@src/core'
import type { CLICommand } from '../../../src/bin/types.js'
import { describe, expect, expectTypeOf, it } from 'vitest'
import { width } from '@orkestrel/console'
import { join, resolve } from 'node:path'
import { isString } from '@orkestrel/contract'
import {
	blueprintToDevDependencies,
	blueprintToToolchainHolds,
	blueprintToScripts,
	blueprintToTestArtifacts,
	blueprintToWritableScripts,
	CATALOG_AGENT_PATH,
	createBlueprint,
	MAX_PATH_LENGTH,
	MAX_RANGE_LENGTH,
	ScaffoldError,
	TOOLCHAIN_HOLDS,
} from '@src/core'
import { computeDigest, MAX_INVENTORY_PATHS, pathToStorage } from '@src/server'
import { captureError, requireValue } from '@orkestrel/test'
import { createScratch } from '@orkestrel/test/server'
import {
	CHECKOUT_ARGUMENT,
	COMMAND_OPTIONS,
	EXECUTABLE_NAME,
	EXIT_CLEAN,
	EXIT_DRIFT,
	EXIT_SUMMARY,
	EXIT_USAGE,
	FAILED_CODE,
	FAILED_MESSAGE,
	NAME_ARGUMENT,
	OPTION_SUMMARY,
	USAGE_CODE,
	VERB_OPTIONS,
	VERB_SUMMARY,
	VERBS,
} from '../../../src/bin/constants.js'
import { isUsageError, UsageError } from '../../../src/bin/errors.js'
import {
	argvToCommand,
	auditToExit,
	auditToSummary,
	catalogToNames,
	collectScriptChain,
	dependenciesToFloors,
	dependenciesToFleet,
	entriesToReleases,
	environmentToUpstream,
	errorToEnvelope,
	fetchToRefusal,
	findGitRefusal,
	manifestToAdditions,
	manifestToWritableDependencies,
	manifestToWritableScripts,
	mergeResults,
	optionToName,
	pinsToLifts,
	releasesToExit,
	releasesToPins,
	releasesToQuestions,
	renderUsage,
	resolveFloor,
	resultToTally,
	sanitizeLine,
	scanScriptTokens,
	scriptToInvocations,
	selectionToEnvironments,
	selectionToExtensions,
	selectionToGroups,
	selectionToPackages,
	sheetTestToQuestion,
	splitGitRecords,
	targetToEnvironments,
	targetToExtensions,
	targetToFacts,
	verbToSyntax,
	versionsToRefusal,
} from '../../../src/bin/helpers.js'
import {
	buildDependency,
	buildLazyCase,
	buildMissingCase,
	buildRelease,
	buildSparse,
	createClosableList,
	createProducer,
	createServedList,
	DOCUMENTED_OPTIONS,
	readLazily,
	refuseClose,
	refuseObject,
	UNDOCUMENTED_OPTIONS,
} from '../../setup.js'
import {
	AUDIT_EXIT_CASES,
	buildHostManifest,
	buildHostManifestEntry,
	buildOptionArgv,
	CATALOG_AGENT_ROWS_TEXT,
	COMMAND_CASES,
	SCRATCH_PREFIX,
	USAGE_CASES,
} from '../../setupServer.js'

it('excludes checkouts from every other command branch and accepts surface offline', () => {
	expectTypeOf<{
		readonly verb: 'new'
		readonly name: string
		readonly checkouts: readonly string[]
	}>().not.toExtend<CLICommand>()
	expectTypeOf<{
		readonly verb: 'audit'
		readonly checkouts: readonly string[]
	}>().not.toExtend<CLICommand>()
	expectTypeOf<{
		readonly verb: 'repair'
		readonly checkouts: readonly string[]
	}>().not.toExtend<CLICommand>()
	expectTypeOf<{
		readonly verb: 'catalog'
		readonly checkouts: readonly string[]
	}>().not.toExtend<CLICommand>()
	expectTypeOf<{
		readonly verb: 'overwrite'
		readonly checkouts: readonly string[]
	}>().not.toExtend<CLICommand>()
	expect(argvToCommand(['surface', '--offline', 'candidate'])).toMatchObject({
		verb: 'surface',
		offline: true,
		checkouts: ['candidate'],
	})
})

it('writes the checkout list into the surface synopsis', () => {
	expect(verbToSyntax('surface')).toBe(
		`${EXECUTABLE_NAME} surface ${CHECKOUT_ARGUMENT} [--offline] [--from <path>] [--target <path>] [--json]`,
	)
	expect(CHECKOUT_ARGUMENT).toBe('[<checkout>...]')
})

it('resolves the bundled host, a built root, and a raw checkout as the floor', () => {
	const workspace = createScratch()
	try {
		const bundled = resolveFloor()
		expect(isString(bundled) ? undefined : Object.keys(bundled.bytes)).toContain(CATALOG_AGENT_PATH)
		workspace.write('checkout/package.json', '{"name":"@orkestrel/alpha"}')
		expect(resolveFloor(join(workspace.path, 'checkout'))).toBe(join(workspace.path, 'checkout'))
		const text = '| Package |\n| --- |\n| @orkestrel/alpha |\n'
		const storage = pathToStorage(CATALOG_AGENT_PATH)
		workspace.write(`built/${storage}`, text)
		workspace.write(
			'built/manifest.json',
			JSON.stringify(
				buildHostManifest({
					entries: [
						buildHostManifestEntry({
							storage,
							destination: CATALOG_AGENT_PATH,
							digest: computeDigest(text),
						}),
					],
					roots: [],
				}),
			),
		)
		const built = resolveFloor(join(workspace.path, 'built'))
		expect(catalogToNames(built)).toEqual(['@orkestrel/alpha'])
		expect(catalogToNames(join(workspace.path, 'built'))).toEqual([])
	} finally {
		workspace.destroy()
	}
})

describe('selected showcase declaration projection', () => {
	it('projects both selected sections while retaining ordinary runtime precedence', () => {
		const manifest = JSON.stringify({
			dependencies: { vite: '^6.0.0', 'vite-plugin-singlefile': '2.3.3', typescript: '^6.0.3' },
			devDependencies: { vite: '^8.3.4', 'vite-plugin-singlefile': '^2.2.0', typescript: '^6.0.2' },
		})
		const selected = manifestToWritableDependencies(
			manifest,
			createBlueprint('display', { app: ['browser'], showcase: true }),
		)
		expect(selected.runtime).toEqual([
			{ name: 'typescript', range: '^6.0.3' },
			{ name: 'vite', range: '^6.0.0' },
			{ name: 'vite-plugin-singlefile', range: '2.3.3' },
		])
		expect(selected.development).toEqual([
			{ name: 'vite', range: '^8.3.4' },
			{ name: 'vite-plugin-singlefile', range: '^2.2.0' },
		])
		expect(
			manifestToWritableDependencies(manifest, createBlueprint('display', { app: ['browser'] })),
		).toEqual({
			runtime: [
				{ name: 'typescript', range: '^6.0.3' },
				{ name: 'vite', range: '^6.0.0' },
			],
			development: [],
		})
	})
})

describe('extension selections', () => {
	it('maps creation options to the command contract', () => {
		expect(
			argvToCommand([
				'new',
				'sample',
				'--styles',
				'--themes',
				'--showcase',
				'--extend',
				'browser:vue,styles:print',
			]),
		).toMatchObject({
			verb: 'new',
			styles: true,
			themes: true,
			showcase: true,
			extensions: 'browser:vue,styles:print',
		})
	})
	it('assigns every selected browser axis and preserves sheet names', () => {
		expect(selectionToExtensions('browser:vue,styles:print', ['src', 'app'], true)).toStrictEqual([
			{ surface: 'browser', name: 'vue', axes: ['src', 'app'] },
			{ surface: 'styles', name: 'print' },
		])
		expect(selectionToExtensions(undefined, [], false)).toStrictEqual([])
		expect(selectionToExtensions('browser:vue', ['app'], false)).toStrictEqual([
			{ surface: 'browser', name: 'vue', axes: ['app'] },
		])
	})

	it('refuses repeated entries, absent surfaces, reserved names, and unsupported frameworks', () => {
		expect(() => selectionToExtensions('browser:react', ['app'], false)).toThrow(UsageError)
		expect(() => selectionToExtensions('styles:core', [], true)).toThrow(UsageError)
		expect(() => selectionToExtensions('styles:', [], true)).toThrow(UsageError)
		expect(() => selectionToExtensions('styles:print,styles:print', [], true)).toThrow(UsageError)
		expect(() => selectionToExtensions('browser:vue', [], false)).toThrow(UsageError)
		expect(() => selectionToExtensions('styles:print', [], false)).toThrow(UsageError)
	})
})

describe('target extension markers', () => {
	it('reads physical browser axes and sorted complete sheet pairs only', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			scratch.ensure('src/vue')
			scratch.ensure('app/vue')
			scratch.write('src/print/index.scss', '')
			scratch.write('src/print/sheet.ts', '')
			scratch.write('src/alpha/index.scss', '')
			scratch.write('src/alpha/sheet.ts', '')
			scratch.write('src/incomplete/index.scss', '')
			scratch.write('src/core/index.scss', '')
			scratch.write('src/core/sheet.ts', '')
			expect(targetToExtensions(scratch.path)).toStrictEqual([
				{ surface: 'browser', name: 'vue', axes: ['src', 'app'] },
				{ surface: 'styles', name: 'alpha' },
				{ surface: 'styles', name: 'print' },
			])
			scratch.remove('src/vue')
			expect(targetToExtensions(scratch.path)[0]).toStrictEqual({
				surface: 'browser',
				name: 'vue',
				axes: ['app'],
			})
		} finally {
			scratch.destroy()
		}
	})

	it('refuses case-colliding sheet names or the uppercase spelling on a folding filesystem', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			scratch.write('src/Print/index.scss', '')
			scratch.write('src/Print/sheet.ts', '')
			scratch.write('src/print/index.scss', '')
			scratch.write('src/print/sheet.ts', '')
			const distinct = scratch.names('src').includes('print')
			expect(() => targetToExtensions(scratch.path)).toThrow(
				distinct ? /Case-colliding/u : /Invalid sheet/u,
			)
		} finally {
			scratch.destroy()
		}
	})

	it('derives independent surface facts from exact-case files and physical showcase directories', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(targetToFacts(scratch.path)).toStrictEqual({
				styles: false,
				themes: false,
				showcase: false,
			})
			scratch.write('src/styles/Index.scss', '')
			scratch.write('src/styles/themes/index.scss', '')
			expect(targetToFacts(scratch.path).styles).toBe(false)
			expect(targetToFacts(scratch.path).themes).toBe(false)
			scratch.remove('src/styles/Index.scss')
			scratch.write('src/styles/index.scss', '')
			scratch.write('src/styles/themes/sheet.ts', '')
			scratch.ensure('showcase')
			expect(targetToFacts(scratch.path)).toStrictEqual({
				styles: true,
				themes: true,
				showcase: true,
			})
			scratch.remove('showcase')
			scratch.write('configs/app/vite.showcase.config.ts', '')
			expect(targetToFacts(scratch.path).showcase).toBe(true)
		} finally {
			scratch.destroy()
		}
	})
})

describe('optionToName', () => {
	it('reads the bare name out of a token carrying a value placeholder', () => {
		expect(optionToName('--from <path>')).toBe('from')
		expect(optionToName('--groups <list>')).toBe('groups')
	})

	it('reads the bare name out of a flag token', () => {
		expect(optionToName('--json')).toBe('json')
	})

	it('names an option the parser accepts, for every documented token', () => {
		for (const option of DOCUMENTED_OPTIONS) {
			expect(Object.keys(COMMAND_OPTIONS)).toContain(optionToName(option))
		}
	})

	it('names an option the parser refuses, for a token from outside the set', () => {
		for (const option of UNDOCUMENTED_OPTIONS) {
			expect(Object.keys(COMMAND_OPTIONS)).not.toContain(optionToName(option))
		}
	})
})

describe('environmentToUpstream', () => {
	it('maps each configured process endpoint to its upstream group', () => {
		expect(
			environmentToUpstream({
				ORKESTREL_SCAFFOLD_REGISTRY: 'http://127.0.0.1:4101',
				ORKESTREL_SCAFFOLD_REPOSITORY: 'http://127.0.0.1:4102',
			}),
		).toStrictEqual({
			registry: { base: 'http://127.0.0.1:4101' },
			repository: { base: 'http://127.0.0.1:4102' },
		})
	})

	it('leaves upstream options absent when neither endpoint is configured', () => {
		expect(environmentToUpstream({})).toBeUndefined()
	})
})

describe('verbToSyntax', () => {
	it('opens every synopsis with the installed command and its verb', () => {
		for (const verb of VERBS) {
			expect(verbToSyntax(verb).startsWith(`${EXECUTABLE_NAME} ${verb} `)).toBe(true)
		}
	})

	it('brackets every option its verb takes', () => {
		for (const verb of VERBS) {
			const syntax = verbToSyntax(verb)
			for (const option of VERB_OPTIONS[verb]) expect(syntax).toContain(`[${option}]`)
		}
	})

	it('omits every option its verb does not take', () => {
		for (const verb of VERBS) {
			const syntax = verbToSyntax(verb)
			const absent = DOCUMENTED_OPTIONS.filter((option) => !VERB_OPTIONS[verb].includes(option))
			for (const option of absent) expect(syntax).not.toContain(`[${option}]`)
		}
	})

	it('carries the positional argument on the one verb that takes it', () => {
		expect(verbToSyntax('new')).toContain(NAME_ARGUMENT)
		for (const verb of VERBS.filter((candidate) => candidate !== 'new')) {
			expect(verbToSyntax(verb)).not.toContain(NAME_ARGUMENT)
		}
	})
})

describe('renderUsage', () => {
	it('documents the bin workspace option in the new synopsis and glossary', () => {
		const usage = renderUsage().join('\n')
		expect(verbToSyntax('new')).toContain('[--bin]')
		expect(usage).toContain('--bin')
	})

	it('returns one line per output call', () => {
		for (const line of renderUsage()) expect(line).not.toContain('\n')
	})

	it('names every verb beside what it does', () => {
		const usage = renderUsage()
		for (const verb of VERBS) {
			expect(usage).toContain(`  ${verbToSyntax(verb)}`)
			expect(usage).toContain(`      ${VERB_SUMMARY[verb]}`)
		}
	})

	it('documents every option some verb takes', () => {
		const usage = renderUsage().join('\n')
		for (const option of DOCUMENTED_OPTIONS) {
			expect(Object.keys(OPTION_SUMMARY)).toContain(option)
			expect(usage).toContain(option)
		}
	})

	it('documents nothing the executable does not accept', () => {
		const usage = renderUsage().join('\n')
		for (const option of UNDOCUMENTED_OPTIONS) expect(usage).not.toContain(option)
	})

	it('aligns the glossary on the widest token', () => {
		const options = Object.entries(OPTION_SUMMARY)
		const column = Math.max(...options.map(([option]) => width(option)))
		const usage = renderUsage()
		for (const [option, summary] of options) {
			expect(usage).toContain(`  ${option}${' '.repeat(column - width(option))}  ${summary}`)
		}
	})

	it('states what every exit code it returns means', () => {
		const usage = renderUsage()
		expect(Object.keys(EXIT_SUMMARY)).toStrictEqual(
			[EXIT_CLEAN, EXIT_DRIFT, EXIT_USAGE].map(String),
		)
		for (const [code, meaning] of Object.entries(EXIT_SUMMARY)) {
			expect(usage).toContain(`  ${code}  ${meaning}`)
		}
	})

	it('answers identically on every call', () => {
		expect(renderUsage()).toStrictEqual(renderUsage())
	})
})

describe('argvToCommand', () => {
	it('reads offline on the verbs that own a distributed floor and refuses it on catalog', () => {
		expect(argvToCommand(['new', 'widget', '--offline'])).toStrictEqual({
			verb: 'new',
			name: 'widget',
			json: false,
			offline: true,
		})
		expect(argvToCommand(['audit', '--offline'])).toStrictEqual({
			verb: 'audit',
			json: false,
			offline: true,
		})
		expect(argvToCommand(['repair', '--offline'])).toStrictEqual({
			verb: 'repair',
			json: false,
			offline: true,
		})
		expect(argvToCommand(['overwrite', '--offline'])).toStrictEqual({
			verb: 'overwrite',
			json: false,
			dirty: false,
			offline: true,
		})
		expect(() => argvToCommand(['catalog', '--offline'])).toThrow(
			"'catalog' does not take --offline.",
		)
	})

	it('reads the bin workspace option on new', () => {
		expect(argvToCommand(['new', 'widget', '--bin'])).toStrictEqual({
			verb: 'new',
			name: 'widget',
			json: false,
			bin: true,
		})
	})

	it('refuses the bin workspace option by name on every reading verb', () => {
		for (const verb of ['audit', 'repair', 'catalog', 'overwrite']) {
			expect(() => argvToCommand([verb, '--bin'])).toThrow(`'${verb}' does not take --bin.`)
		}
	})

	for (const commandCase of COMMAND_CASES) {
		it(`reads ${commandCase.label}`, () => {
			expect(argvToCommand(commandCase.argv)).toStrictEqual(commandCase.command)
		})
	}

	for (const usageCase of USAGE_CASES) {
		it(`refuses ${usageCase.label}`, () => {
			const raised = captureError(() => argvToCommand(usageCase.argv))
			expect(isUsageError(raised)).toBe(true)
			expect(raised instanceof Error ? raised.message : '').toContain(usageCase.mention)
			expect(raised instanceof UsageError ? raised.code : '').toBe(USAGE_CODE)
		})
	}

	it('accepts every option it documents, on the verb that documents it', () => {
		for (const verb of VERBS) {
			for (const option of VERB_OPTIONS[verb]) {
				expect(() => argvToCommand(buildOptionArgv(verb, option))).not.toThrow()
			}
		}
	})

	it('refuses every option it does not document, on every verb', () => {
		for (const verb of VERBS) {
			for (const option of UNDOCUMENTED_OPTIONS) {
				expect(() => argvToCommand(buildOptionArgv(verb, option))).toThrow(UsageError)
			}
		}
	})

	it('leaves the arguments it was given untouched', () => {
		const argv = ['audit', '--groups', 'manifest', '--json']
		const before = [...argv]
		argvToCommand(argv)
		expect(argv).toStrictEqual(before)
	})

	it('returns a command the caller owns', () => {
		const first = argvToCommand(['audit'])
		const second = argvToCommand(['audit'])
		expect(first).toStrictEqual(second)
		expect(first).not.toBe(second)
	})
})

describe('auditToExit', () => {
	for (const auditCase of AUDIT_EXIT_CASES) {
		it(`reports ${auditCase.clean ? 'a clean run' : 'drift'} for ${auditCase.label}`, () => {
			expect(auditToExit(auditCase.audit)).toBe(auditCase.clean ? EXIT_CLEAN : EXIT_DRIFT)
		})
	}

	it('distinguishes the verdicts across the whole table', () => {
		const codes = AUDIT_EXIT_CASES.map((auditCase) => auditToExit(auditCase.audit))
		expect(codes).toContain(EXIT_CLEAN)
		expect(codes).toContain(EXIT_DRIFT)
	})
})

describe('release evidence', () => {
	it('projects concrete declarations to their exact distributed floors', () => {
		expect(
			dependenciesToFloors([
				{ name: '@orkestrel/router', range: '^0.0.8' },
				{ name: 'vite', range: '~8.2.0' },
			]),
		).toStrictEqual([
			{
				name: '@orkestrel/router',
				range: '^0.0.8',
				lookup: 'found',
				latest: '0.0.8',
			},
			{ name: 'vite', range: '~8.2.0', lookup: 'found', latest: '8.2.0' },
		])
		expect(dependenciesToFloors([{ name: 'vite', range: '^8' }])).toBeUndefined()
	})

	it('refuses a hole in the declarations as the declaration it reads as', () => {
		const dependencies = buildSparse(2, new Map([[1, { name: 'vite', range: '~8.2.0' }]]))

		expect(() => dependenciesToFloors(dependencies)).toThrow(TypeError)
	})

	it('reports exact fleet drift and failed lookups as drift', () => {
		expect(
			releasesToExit([
				{ name: '@orkestrel/router', range: '^0.0.8', lookup: 'found', latest: '0.0.8' },
			]),
		).toBe(EXIT_CLEAN)
		expect(
			releasesToExit([
				{ name: '@orkestrel/router', range: '^0.0.7', lookup: 'found', latest: '0.0.8' },
			]),
		).toBe(EXIT_DRIFT)
		expect(
			releasesToExit([
				{ name: '@orkestrel/router', range: '^0.0.8', lookup: 'failed', note: 'offline' },
			]),
		).toBe(EXIT_DRIFT)
		expect(
			releasesToExit([{ name: 'typescript', range: '^6.0.3', lookup: 'found', latest: '6.0.4' }]),
		).toBe(EXIT_CLEAN)
	})

	it('reports a stale foreign floor beside a served newer major', () => {
		expect(
			releasesToQuestions(
				[
					{ name: 'typescript', range: '^6.0.3', lookup: 'found', latest: '6.0.4' },
					{ name: 'vite', range: '^8.2.2', lookup: 'found', latest: '8.2.2' },
				],
				[
					{ name: 'typescript', range: '^6.0.3', lookup: 'found', latest: '7.0.2' },
					{ name: 'vite', range: '^8.2.2', lookup: 'found', latest: '8.2.2' },
				],
				TOOLCHAIN_HOLDS,
			),
		).toStrictEqual([
			{
				field: 'dependencies',
				message:
					'typescript declares the floor ^6.0.3, while the registry serves 6.0.4 within major 6.',
				blocking: false,
			},
			{
				field: 'dependencies',
				message: `typescript is held at major 6, while the registry serves major 7: ${TOOLCHAIN_HOLDS.typescript?.reason ?? ''}.`,
				blocking: false,
			},
		])
	})

	it('reports a served newer major when the declared-major lookup finds no release', () => {
		expect(
			releasesToQuestions(
				[{ name: 'typescript', range: '^6.0.3', lookup: 'failed', note: 'missing' }],
				[{ name: 'typescript', range: '^6.0.3', lookup: 'found', latest: '7.0.2' }],
				{},
			),
		).toStrictEqual([
			{
				field: 'dependencies',
				message: 'typescript declares major 6, while the registry serves major 7.',
				blocking: false,
			},
		])
	})

	it('raises no toolchain question for a non-Vue workspace on the baseline releases', () => {
		const blueprint = createBlueprint('router', { src: ['core'] })
		expect(
			releasesToQuestions(
				[
					{ name: 'typescript', range: '^7.0.2', lookup: 'found', latest: '7.0.2', major: 7 },
					{ name: 'vitest', range: '^5.0.5', lookup: 'found', latest: '5.0.5', major: 5 },
				],
				undefined,
				blueprintToToolchainHolds(blueprint),
			),
		).toStrictEqual([])
	})

	it('names the hold and its reason where a held tool meets a newer served major', () => {
		const holds: Readonly<Record<string, ToolchainHold>> = {
			typescript: { framework: 'vue', range: '^6.0.3', reason: 'the framework checker requires 6' },
		}
		expect(
			releasesToQuestions(
				[
					{ name: 'typescript', range: '^6.0.3', lookup: 'found', latest: '6.0.3', major: 7 },
					{ name: 'vite', range: '^8.3.5', lookup: 'found', latest: '8.3.5', major: 9 },
				],
				undefined,
				holds,
			),
		).toStrictEqual([
			{
				field: 'dependencies',
				message:
					'typescript is held at major 6, while the registry serves major 7: the framework checker requires 6.',
				blocking: false,
			},
			{
				field: 'dependencies',
				message: 'vite declares major 8, while the registry serves major 9.',
				blocking: false,
			},
		])
	})

	it('reports a declaration past its hold, and none at or below it', () => {
		const holds: Readonly<Record<string, ToolchainHold>> = {
			typescript: { framework: 'vue', range: '^6.0.3', reason: 'the framework checker requires 6' },
		}
		expect(
			releasesToQuestions(
				[{ name: 'typescript', range: '^7.0.2', lookup: 'found', latest: '7.0.2', major: 7 }],
				undefined,
				holds,
			),
		).toStrictEqual([
			{
				field: 'dependencies',
				message:
					'typescript declares major 7, past its hold at major 6: the framework checker requires 6.',
				blocking: false,
			},
		])
		expect(
			releasesToQuestions(
				[{ name: 'typescript', range: '^5.9.3', lookup: 'found', latest: '5.9.3', major: 5 }],
				undefined,
				holds,
			),
		).toStrictEqual([])
	})

	it('refuses a hole in the releases as the release it reads as', () => {
		// The release comes first, so a search that stops at the release never reaches the hole after it.
		const releases = buildSparse<Release>(
			2,
			new Map([[0, { name: 'vite', range: '^8.2.2', lookup: 'found', latest: '8.2.2' }]]),
		)

		expect(() => releasesToQuestions(releases)).toThrow(TypeError)
	})

	it('reads writable fleet rows and planned foreign tools without peers', () => {
		const blueprint = createBlueprint('sample', { src: ['core'] })
		const declared = manifestToWritableDependencies(
			'{"dependencies":{"@orkestrel/emitter":"^0.0.7","vite":"^8.2.2"},"devDependencies":{"typescript":"^6.0.3"},"peerDependencies":{"@orkestrel/router":"^0.0.8"}}',
			blueprint,
		)
		expect(declared).toStrictEqual({
			runtime: [
				{ name: '@orkestrel/emitter', range: '^0.0.7' },
				{ name: 'vite', range: '^8.2.2' },
			],
			development: [{ name: 'typescript', range: '^6.0.3' }],
		})
	})

	it('lifts declared toolchain majors to the plan while retaining holds and admitted majors', () => {
		const manifest = JSON.stringify({
			devDependencies: { vitest: '^4.1.12', typescript: '^6.0.3', oxlint: '^1.90.0' },
			peerDependencies: { vitest: '^4.1.12', typescript: '^6.0.3' },
		})
		const core = createBlueprint('sample', { src: ['core'] })
		const vue = createBlueprint('sample', {
			src: ['core', 'browser'],
			extensions: [{ surface: 'browser', name: 'vue', axes: ['src'] }],
		})
		expect(manifestToWritableDependencies(manifest, core, true)).toStrictEqual({
			runtime: [],
			development: [
				{ name: 'oxlint', range: '^1.90.0' },
				{ name: 'typescript', range: '^7.0.2' },
				{ name: 'vitest', range: '^5.0.5' },
			],
		})
		expect(manifestToWritableDependencies(manifest, vue, true)).toStrictEqual({
			runtime: [],
			development: [
				{ name: 'oxlint', range: '^1.90.0' },
				{ name: 'typescript', range: '^6.0.3' },
				{ name: 'vitest', range: '^5.0.5' },
			],
		})
		for (const range of [
			'^6.0.0',
			'~5.0.1',
			'^4.1.12 || ^5.0.5',
			'>=4.0.0',
			`^4.0.0-${'a'.repeat(MAX_RANGE_LENGTH)}`,
		]) {
			expect(
				manifestToWritableDependencies(
					JSON.stringify({ devDependencies: { vitest: range } }),
					core,
					true,
				),
			).toStrictEqual({ runtime: [], development: [{ name: 'vitest', range }] })
		}
		expect(
			manifestToWritableDependencies(
				JSON.stringify({ dependencies: { vitest: '^4.1.12' } }),
				core,
				true,
			),
		).toStrictEqual({ runtime: [{ name: 'vitest', range: '^4.1.12' }], development: [] })
		expect(manifestToWritableDependencies(manifest, core).development).toContainEqual({
			name: 'vitest',
			range: '^4.1.12',
		})
		expect(
			manifestToWritableDependencies(
				JSON.stringify({ devDependencies: { vitest: '^3.0.0 || ^4.1.12' } }),
				core,
				true,
			),
		).toStrictEqual({ runtime: [], development: [{ name: 'vitest', range: '^5.0.5' }] })
	})

	it('reports only planned lifts that reached the written dependency section', () => {
		const declared = {
			runtime: [{ name: 'vitest', range: '^4.1.12' }],
			development: [{ name: 'typescript', range: '^6.0.3' }],
		}
		const planned = {
			runtime: [{ name: 'vitest', range: '^5.0.5' }],
			development: [{ name: 'typescript', range: '^7.0.2' }],
		}
		expect(pinsToLifts(declared, planned, declared)).toStrictEqual([])
		expect(pinsToLifts(declared, planned, { runtime: [], development: [] })).toStrictEqual([])
		expect(
			pinsToLifts(declared, planned, {
				runtime: [{ name: 'vitest', range: '^5.0.6' }],
				development: declared.development,
			}),
		).toStrictEqual([{ name: 'vitest', from: '^4.1.12', to: '^5.0.6' }])
		expect(pinsToLifts(declared, declared, planned)).toStrictEqual([])
	})

	it('keeps only declared fleet dependencies in source order', () => {
		expect(
			dependenciesToFleet([
				{ name: 'typescript', range: '^6.0.3' },
				{ name: '@orkestrel/router', range: '^0.0.10' },
				{ name: '@orkestrel/emitter', range: '^0.0.5' },
			]),
		).toStrictEqual([
			{ name: '@orkestrel/router', range: '^0.0.10' },
			{ name: '@orkestrel/emitter', range: '^0.0.5' },
		])
	})
})

describe('manifestToAdditions', () => {
	const blueprint = createBlueprint('sample', { src: ['core'] })
	const planned = blueprintToDevDependencies(blueprint)

	it('lists each planned dependency neither writable section declares, at its planned range, under development', () => {
		const declared = Object.fromEntries(
			Object.entries(planned).filter(([name]) => name !== 'typescript' && name !== 'vitest'),
		)
		expect(
			manifestToAdditions(
				JSON.stringify({ dependencies: { vitest: '^4.0.0' }, devDependencies: declared }),
				blueprint,
			),
		).toStrictEqual({
			runtime: [],
			development: [{ name: 'typescript', range: requireValue(planned.typescript) }],
		})
		expect(
			manifestToAdditions(JSON.stringify({ devDependencies: planned }), blueprint),
		).toStrictEqual({ runtime: [], development: [] })
	})

	it('reads an absent, malformed, or unparsable manifest as declaring nothing', () => {
		const everything = Object.entries(planned).map(([name, range]) => ({ name, range }))
		for (const manifest of ['{}', '{"devDependencies": "invalid"}', '{ not json', '[]']) {
			expect(manifestToAdditions(manifest, blueprint)).toStrictEqual({
				runtime: [],
				development: everything,
			})
		}
	})
})

describe('sheetTestToQuestion', () => {
	const blueprint = createBlueprint('sample', { src: ['core'], styles: true, themes: true })
	const artifacts = blueprintToTestArtifacts(blueprint)
	const styles = requireValue(
		artifacts.find(({ path }) => path === 'tests/src/styles/index.test.ts'),
	)
	const themes = requireValue(
		artifacts.find(({ path }) => path === 'tests/src/styles/themes/index.test.ts'),
	)

	it('names the file and the relative specifier the planned test imports for a root-relative sheet import', () => {
		expect(styles.content).toContain("from '../../../dist/src/styles/index.css?raw'")
		expect(
			sheetTestToQuestion(styles, styles.content.replace('../../../dist/', '/dist/')),
		).toStrictEqual({
			field: 'tests',
			message:
				"The birth-owned sheet test tests/src/styles/index.test.ts imports by a root-relative specifier, which oxlint's import/no-absolute-path rule refuses under --deny-warnings. Replace '/dist/src/styles/index.css?raw' with '../../../dist/src/styles/index.css?raw'. Scaffold does not rewrite a birth-owned file.",
			blocking: false,
			groups: ['tests'],
		})
		expect(
			sheetTestToQuestion(
				themes,
				'import sheet from "/dist/src/styles/themes/index.css?raw"\nimport {\n\tadoptSheet,\n} from \'/tests/setupStyles.js\'\n',
			)?.message,
		).toContain(
			"Replace '/dist/src/styles/themes/index.css?raw' with '../../../../dist/src/styles/themes/index.css?raw' and '/tests/setupStyles.js' with '../../../../tests/setupStyles.js'.",
		)
	})

	it('raises nothing for a relative import, a protocol-relative specifier, an entry test, or an artifact another owner writes', () => {
		expect(sheetTestToQuestion(styles, styles.content)).toBeUndefined()
		expect(
			sheetTestToQuestion(styles, "import sheet from '//cdn.example/sheet.css'\n"),
		).toBeUndefined()
		expect(
			sheetTestToQuestion(styles, 'const note = \'import from "/dist/src/styles/index.css"\'\n'),
		).toBeUndefined()
		expect(
			sheetTestToQuestion(
				{ ...styles, content: "import { describe } from 'vitest'\n" },
				"import sheet from '/dist/src/styles/index.css?raw'\n",
			),
		).toBeUndefined()
		expect(
			sheetTestToQuestion(
				{ ...styles, ownership: 'content' },
				"import sheet from '/dist/src/styles/index.css?raw'\n",
			),
		).toBeUndefined()
	})
})

describe('manifestToWritableScripts', () => {
	const blueprint = createBlueprint('sample', { src: ['core'], setup: ['node', 'browser'] })
	const planned = blueprintToScripts(blueprint)
	const writable = blueprintToWritableScripts(blueprint)
	const chain = requireValue(planned.test)

	it('writes the planned test chain over a generated predecessor that predates a planned step', () => {
		const predecessor = chain.replace(' && npm run test:setup:browser', '')
		expect(predecessor).not.toBe(chain)
		const manifest = JSON.stringify({ scripts: { ...planned, test: predecessor } })
		expect(manifestToWritableScripts(manifest, blueprint)).toStrictEqual([
			...writable,
			{ name: 'test', command: chain, accepted: [predecessor] },
		])
		// A chain missing several planned steps is still a predecessor, and the
		// spacing around each separator decides nothing.
		const sparse = 'npm run test:src&&npm run test:config'
		expect(
			manifestToWritableScripts(JSON.stringify({ scripts: { test: sparse } }), blueprint).at(-1),
		).toStrictEqual({ name: 'test', command: chain, accepted: [sparse] })
	})

	it('leaves a test chain the package owns out of the writable set', () => {
		const owned = [
			// A step the plan does not generate.
			`${chain} && npm run check`,
			chain.replace(' && npm run test:setup:browser', ' && npm run check'),
			// The planned steps out of order, in a chain shorter than the planned one
			// so the order walk decides it rather than the length.
			'npm run test:config && npm run test:policy',
			// The planned chain itself needs no write.
			chain,
			'',
		]
		for (const test of owned) {
			expect(
				manifestToWritableScripts(JSON.stringify({ scripts: { ...planned, test } }), blueprint),
			).toStrictEqual(writable)
		}
	})

	it('leaves the chain with the package where the planned chain adds an aggregate the manifest lacks', () => {
		const grown = createBlueprint('sample', { src: ['core'], app: ['core'] })
		const born = blueprintToScripts(createBlueprint('sample', { src: ['core'] }))
		const target = requireValue(blueprintToScripts(grown).test)
		expect(target).toContain('npm run test:app')
		expect(born).not.toHaveProperty('test:app')
		expect(blueprintToWritableScripts(grown).map(({ name }) => name)).not.toContain('test:app')
		expect(manifestToWritableScripts(JSON.stringify({ scripts: born }), grown)).toStrictEqual(
			blueprintToWritableScripts(grown),
		)
		// The control: the same chain over a manifest that declares the aggregate,
		// whatever its value, takes the planned chain.
		const declared = { ...born, 'test:app': 'vitest run --project app:core' }
		expect(
			manifestToWritableScripts(JSON.stringify({ scripts: declared }), grown).at(-1),
		).toStrictEqual({ name: 'test', command: target, accepted: [born.test] })
	})

	it('answers the blueprint scripts for a manifest with no readable test chain', () => {
		for (const manifest of [
			'{}',
			'not json',
			JSON.stringify({ scripts: [] }),
			JSON.stringify({ scripts: { test: 7 } }),
			JSON.stringify({ scripts: { lint: 'oxlint' } }),
		]) {
			expect(manifestToWritableScripts(manifest, blueprint)).toStrictEqual(writable)
		}
	})
})

describe('auditToSummary', () => {
	it('reports a refused blueprint without inventing a comparison', () => {
		expect(
			auditToSummary({
				findings: [],
				questions: [{ field: 'src', message: 'Core is required.', blocking: true }],
			}),
		).toBe('Audit did not compare the target because the blueprint was refused.')
	})

	it('inflects a single planned path only on the noun', () => {
		const audit: Audit = {
			findings: [{ path: 'package.json', group: 'manifest', ownership: 'birth', drift: 'aligned' }],
			questions: [],
		}
		expect(auditToSummary(audit)).toBe(
			'0 of 1 planned path drifted from the plan. Audit compared bytes at 0, existence at 0, and nothing at 1.',
		)
	})

	it('partitions one finding from each ownership by what decided it', () => {
		const audit: Audit = {
			findings: [
				{
					path: 'AGENTS.md',
					group: 'docs',
					ownership: 'content',
					drift: 'aligned',
					observed: '68690a',
				},
				{
					path: '.claude/agents/catalog.md',
					group: 'orchestration',
					ownership: 'presence',
					drift: 'aligned',
					observed: '68690a',
				},
				{
					path: 'package.json',
					group: 'manifest',
					ownership: 'birth',
					drift: 'aligned',
				},
			],
			questions: [],
		}
		expect(auditToSummary(audit)).toBe(
			'0 of 3 planned paths drifted from the plan. Audit compared bytes at 1, existence at 1, and nothing at 1.',
		)
	})

	it('counts foreign findings apart from planned findings', () => {
		const audit: Audit = {
			findings: [
				{ path: 'README.md', group: 'docs', ownership: 'content', drift: 'missing' },
				{ path: 'stray.txt', group: 'docs', drift: 'foreign', observed: '68690a' },
			],
			questions: [],
		}
		expect(auditToSummary(audit)).toBe(
			'1 of 1 planned path drifted from the plan. Audit compared bytes at 0, existence at 1, and nothing at 0. The plan does not own 1 further path beneath its groups.',
		)
	})
})

describe('errorToEnvelope', () => {
	it('reports a usage error under its own code', () => {
		expect(errorToEnvelope(new UsageError("Unknown command 'pull'."))).toStrictEqual({
			error: { code: USAGE_CODE, message: "Unknown command 'pull'." },
		})
	})

	it('reports a scaffold error under the code it was raised with', () => {
		expect(errorToEnvelope(new ScaffoldError('TARGET', 'The target moved.'))).toStrictEqual({
			error: { code: 'TARGET', message: 'The target moved.' },
		})
	})

	it('reports an uncoded error under one code, keeping its message', () => {
		expect(errorToEnvelope(new Error('boom'))).toStrictEqual({
			error: { code: FAILED_CODE, message: 'boom' },
		})
	})

	it('quotes nothing from a raised value that is not an error', () => {
		for (const raised of [undefined, null, 'boom', 42, Symbol('boom'), { message: 'boom' }]) {
			expect(errorToEnvelope(raised)).toStrictEqual({
				error: { code: FAILED_CODE, message: FAILED_MESSAGE },
			})
		}
	})

	it('does not report a coded error under the uncoded code', () => {
		for (const raised of [new UsageError('bad'), new ScaffoldError('WRITE', 'bad')]) {
			expect(errorToEnvelope(raised).error.code).not.toBe(FAILED_CODE)
		}
	})
})

describe('isUsageError', () => {
	it('narrows a usage error', () => {
		expect(isUsageError(new UsageError('bad'))).toBe(true)
	})

	it('refuses everything else, including a lookalike', () => {
		for (const value of [
			new Error('bad'),
			new ScaffoldError('INVALID', 'bad'),
			{ name: 'UsageError', code: USAGE_CODE, message: 'bad' },
			undefined,
			null,
		]) {
			expect(isUsageError(value)).toBe(false)
		}
	})
})

describe('sanitizeLine', () => {
	it('folds every break onto one line', () => {
		expect(sanitizeLine('first\nsecond')).toBe('first second')
		expect(sanitizeLine('first\r\nsecond')).toBe('first second')
		expect(sanitizeLine('first\rsecond')).toBe('first second')
	})

	it('removes ANSI escapes and control characters, keeping ordinary prose', () => {
		expect(sanitizeLine('\u001b[31mred\u001b[0m')).toBe('red')
		expect(sanitizeLine('be\u0007ll')).toBe('bell')
		expect(sanitizeLine('plain prose')).toBe('plain prose')
	})
})

describe('versionsToRefusal', () => {
	const pins = { runtime: [], development: [] }

	it('answers no refusal for a complete resolution', () => {
		expect(versionsToRefusal({ releases: [], pins, forced: false, complete: true })).toBeUndefined()
	})

	it('names every dependency the registry could not answer for', () => {
		const refusal = versionsToRefusal({
			releases: [
				{ name: '@orkestrel/emitter', range: '^0.0.5', lookup: 'missing', note: 'absent' },
				{ name: '@orkestrel/router', range: '^0.0.8', lookup: 'found', latest: '0.0.8' },
			],
			pins,
			forced: false,
			complete: false,
		})
		expect(refusal?.code).toBe('FETCH')
		expect(refusal?.message).toContain('@orkestrel/emitter')
		expect(refusal?.message).not.toContain('@orkestrel/router')
	})

	it('reports an incomplete resolution that named no failed release', () => {
		const refusal = versionsToRefusal({ releases: [], pins, forced: false, complete: false })
		expect(refusal?.message).toBe('A declared dependency names no concrete floor.')
	})
})

describe('fetchToRefusal', () => {
	it('answers no refusal for an empty fetch and for a complete one', () => {
		expect(fetchToRefusal([], [])).toBeUndefined()
		expect(
			fetchToRefusal(
				[
					{
						name: '@orkestrel/emitter',
						lookup: 'found',
						version: '0.0.6',
						dependencies: [],
						peers: [],
					},
				],
				[{ name: '@orkestrel/emitter', path: 'guides/emitter.md', lookup: 'found', content: '' }],
			),
		).toBeUndefined()
	})

	it('refuses a catalog row that did not answer', () => {
		const refusal = fetchToRefusal(
			[{ name: '@orkestrel/emitter', lookup: 'failed', note: 'transport' }],
			[],
		)
		expect(refusal?.code).toBe('FETCH')
		expect(refusal?.message).toContain('@orkestrel/emitter')
	})

	// A mirror the host could not serve is skipped rather than refused, so a failed
	// and a missing mirror are the control the mirror rule needs.
	it('carries a failed and a missing mirror instead of refusing them', () => {
		expect(
			fetchToRefusal(
				[],
				[
					{ name: '@orkestrel/emitter', path: 'guides/emitter.md', lookup: 'failed', note: 'x' },
					{ name: '@orkestrel/router', path: 'guides/router.md', lookup: 'missing', note: 'x' },
				],
			),
		).toBeUndefined()
		expect(
			fetchToRefusal(
				[],
				[{ name: '@orkestrel/queue', path: 'guides/queue.md', lookup: 'unmatched', note: 'x' }],
			)?.message,
		).toContain('@orkestrel/queue')
	})
})

describe('entriesToReleases', () => {
	it('answers one verdict per declaration, in input order', () => {
		expect(
			entriesToReleases(
				[
					{ name: '@orkestrel/emitter', range: '^0.0.5' },
					{ name: '@orkestrel/router', range: '^0.0.8' },
				],
				[
					{
						name: '@orkestrel/emitter',
						lookup: 'found',
						version: '0.0.6',
						dependencies: [],
						peers: [],
					},
				],
			),
		).toStrictEqual([
			{ name: '@orkestrel/emitter', range: '^0.0.5', lookup: 'found', latest: '0.0.6' },
			{
				name: '@orkestrel/router',
				range: '^0.0.8',
				lookup: 'missing',
				note: 'the organization catalog does not list the declared package',
			},
		])
	})

	it('carries the verdict and note a listed row answered with', () => {
		expect(
			entriesToReleases(
				[{ name: '@orkestrel/emitter', range: '^0.0.5' }],
				[{ name: '@orkestrel/emitter', lookup: 'failed', note: 'transport' }],
			),
		).toStrictEqual([
			{ name: '@orkestrel/emitter', range: '^0.0.5', lookup: 'failed', note: 'transport' },
		])
	})
})

describe('releasesToPins', () => {
	it('pins every declaration at the caret of its release, runtime ahead of development', () => {
		expect(
			releasesToPins(
				[
					{ name: '@orkestrel/emitter', range: '^0.0.5', lookup: 'found', latest: '0.0.6' },
					{ name: '@orkestrel/test', range: '^0.0.8', lookup: 'found', latest: '0.0.9' },
				],
				{
					runtime: [{ name: '@orkestrel/emitter', range: '^0.0.5' }],
					development: [{ name: '@orkestrel/test', range: '^0.0.8' }],
				},
			),
		).toStrictEqual({
			runtime: [{ name: '@orkestrel/emitter', range: '^0.0.6' }],
			development: [{ name: '@orkestrel/test', range: '^0.0.9' }],
		})
	})

	it('refuses the whole set when one release is missing', () => {
		expect(() =>
			releasesToPins(
				[{ name: '@orkestrel/emitter', range: '^0.0.5', lookup: 'missing', note: 'absent' }],
				{ runtime: [{ name: '@orkestrel/emitter', range: '^0.0.5' }], development: [] },
			),
		).toThrow(ScaffoldError)
	})

	it('refuses a verdict list that does not match the declaration set', () => {
		expect(() =>
			releasesToPins(
				[{ name: '@orkestrel/emitter', range: '^0.0.5', lookup: 'found', latest: '0.0.6' }],
				{ runtime: [], development: [] },
			),
		).toThrow(ScaffoldError)
	})

	it('refuses a hole in the verdicts as a verdict with no declaration', () => {
		const releases = buildSparse<Release>(
			2,
			new Map([
				[1, { name: '@orkestrel/test', range: '^0.0.8', lookup: 'found', latest: '0.0.9' }],
			]),
		)
		const declared = {
			runtime: [{ name: '@orkestrel/emitter', range: '^0.0.5' }],
			development: [{ name: '@orkestrel/test', range: '^0.0.8' }],
		}
		const refusal = captureError(() => releasesToPins(releases, declared))

		expect(refusal).toBeInstanceOf(ScaffoldError)
		expect(refusal instanceof Error ? refusal.message : '').toBe(
			'The release answer has no matching declaration.',
		)
	})
})

describe('scanScriptTokens', () => {
	it('splits words on whitespace and keeps each operator as its own token', () => {
		expect(scanScriptTokens('a  b\tc')?.map((token) => token.value)).toStrictEqual(['a', 'b', 'c'])
		expect(scanScriptTokens('a&&b||c;d|e&f(g)')?.map((token) => token.value)).toStrictEqual([
			'a',
			'&&',
			'b',
			'||',
			'c',
			';',
			'd',
			'|',
			'e',
			'&',
			'f',
			'(',
			'g',
			')',
		])
		expect(scanScriptTokens(';;&&&')?.map((token) => token.value)).toStrictEqual([
			';',
			';',
			'&&',
			'&',
		])
		expect(scanScriptTokens('')).toStrictEqual([])
		expect(scanScriptTokens(' \n ')).toStrictEqual([])
	})

	it('drops quotes and escapes from a value and joins adjacent segments into one word', () => {
		expect(scanScriptTokens('a"b c"\'d e\'\\ f')?.map((token) => token.value)).toStrictEqual([
			'ab cd e f',
		])
		expect(scanScriptTokens('"a\\"b" \'a\\b\' ""')?.map((token) => token.value)).toStrictEqual([
			'a"b',
			'a\\b',
			'',
		])
		expect(scanScriptTokens('"a && b"')?.map((token) => token.value)).toStrictEqual(['a && b'])
	})

	it('marks a word unresolved only when an expansion character is neither escaped nor single-quoted', () => {
		const scripts: ReadonlyArray<readonly [script: string, resolved: readonly boolean[]]> = [
			['$A `b` 100%', [false, false, false]],
			['"$A" "x`y`"', [false, false]],
			["'$A' '`b`' '%'", [true, true, true]],
			['\\$A "\\$A" "\\`"', [true, true, true]],
			['plain "quoted" \'single\' && ;', [true, true, true, true, true]],
		]
		for (const [script, resolved] of scripts) {
			expect(scanScriptTokens(script)?.map((token) => token.resolved)).toStrictEqual(resolved)
		}
	})

	it('answers undefined for a quote never closed and for a trailing backslash', () => {
		expect(scanScriptTokens('a "b')).toBeUndefined()
		expect(scanScriptTokens("a 'b")).toBeUndefined()
		expect(scanScriptTokens('a "b\\"')).toBeUndefined()
		expect(scanScriptTokens('a \\')).toBeUndefined()
		expect(scanScriptTokens('a b\\')).toBeUndefined()
	})
})

describe('scriptToInvocations', () => {
	it('reaches a planned wrapper only through its Vitest run command', () => {
		const wrappers = new Map([['configs/src/vite.print.config.ts', 'src:print']])
		expect(
			scriptToInvocations(
				'npm run build && vitest run --config "./configs/src/vite.print.config.ts"',
				wrappers,
			),
		).toStrictEqual({
			projects: ['src:print'],
			configs: ['./configs/src/vite.print.config.ts'],
			scripts: ['build'],
		})
		expect(
			scriptToInvocations('vitest run --config=configs/src/vite.print.config.ts', wrappers)
				?.projects,
		).toStrictEqual(['src:print'])
		expect(
			scriptToInvocations('vitest run -c configs/src/vite.print.config.ts', wrappers)?.projects,
		).toStrictEqual(['src:print'])
		expect(
			scriptToInvocations('vite build --config configs/src/vite.print.config.ts', wrappers)
				?.projects,
		).toStrictEqual([])
		expect(
			scriptToInvocations(
				'vitest run --config vite.config.ts && vite build --config configs/src/vite.print.config.ts',
				wrappers,
			)?.projects,
		).toStrictEqual([])
		expect(
			scriptToInvocations('echo vitest run --config configs/src/vite.print.config.ts', wrappers)
				?.projects,
		).toStrictEqual([])
		expect(
			scriptToInvocations('vitest bench --config configs/src/vite.print.config.ts', wrappers)
				?.projects,
		).toStrictEqual([])
		expect(
			scriptToInvocations('vitest run --config configs/src/vite.unknown.config.ts', wrappers)
				?.projects,
		).toStrictEqual([])
	})

	it('reads a project named as a separate token and as one token', () => {
		expect(scriptToInvocations('vitest run --project src:core')).toStrictEqual({
			projects: ['src:core'],
			configs: [],
			scripts: [],
		})
		expect(scriptToInvocations('vitest run --project=src:server')).toStrictEqual({
			projects: ['src:server'],
			configs: [],
			scripts: [],
		})
	})

	it('reads configuration paths in command order through either option spelling', () => {
		expect(
			scriptToInvocations('vitest run --config "configs/first path.ts" --config=configs/next.ts'),
		).toStrictEqual({
			projects: [],
			configs: ['configs/first path.ts', 'configs/next.ts'],
			scripts: [],
		})
	})

	it('reads configuration shorthand in command order beside long options', () => {
		expect(
			scriptToInvocations(
				'vitest run --config configs/start.ts -c "configs/journey path.ts" --config=configs/end.ts',
			),
		).toStrictEqual({
			projects: [],
			configs: ['configs/start.ts', 'configs/journey path.ts', 'configs/end.ts'],
			scripts: [],
		})
	})

	it('refuses configuration shorthand whose value a shell expansion decides', () => {
		expect(scriptToInvocations('vitest run -c $CONFIG')).toBeUndefined()
	})

	it('refuses dangling configuration shorthand', () => {
		expect(scriptToInvocations('vitest run -c')).toBeUndefined()
	})

	it('reads every npm run script and reads through quotes', () => {
		expect(scriptToInvocations('npm run build && npm run "test:src"')).toStrictEqual({
			projects: [],
			configs: [],
			scripts: ['build', 'test:src'],
		})
	})

	it('refuses a command whose value a shell expansion decides', () => {
		expect(scriptToInvocations('vitest run --project $PROJECT')).toBeUndefined()
		expect(scriptToInvocations('vitest run "--project=$PROJECT"')).toBeUndefined()
		expect(scriptToInvocations('vitest run --config $CONFIG')).toBeUndefined()
		expect(scriptToInvocations('vitest run "--config=$CONFIG"')).toBeUndefined()
		expect(scriptToInvocations('npm run `echo build`')).toBeUndefined()
	})

	it('refuses an unterminated quote, a trailing escape, and an empty selection', () => {
		expect(scriptToInvocations("vitest run --project 'src:core")).toBeUndefined()
		expect(scriptToInvocations('vitest run --project src:core \\')).toBeUndefined()
		expect(scriptToInvocations('vitest run --project=')).toBeUndefined()
		expect(scriptToInvocations('vitest run --project && echo done')).toBeUndefined()
		expect(scriptToInvocations('vitest run --config=')).toBeUndefined()
		expect(scriptToInvocations('vitest run --config && echo done')).toBeUndefined()
	})

	it('reads a command naming neither a project nor a script', () => {
		expect(scriptToInvocations('tsc --noEmit')).toStrictEqual({
			projects: [],
			configs: [],
			scripts: [],
		})
	})
})

describe('selectionToEnvironments', () => {
	it('answers the named environments in declared order', () => {
		expect(selectionToEnvironments('server,core', 'src')).toStrictEqual(['core', 'server'])
	})

	it('answers none for no selection', () => {
		expect(selectionToEnvironments(undefined, 'src')).toStrictEqual([])
	})

	it('refuses a name that is not an environment, quoting the axis', () => {
		expect(() => selectionToEnvironments('styles', 'app')).toThrow(UsageError)
		expect(() => selectionToEnvironments('styles', 'app')).toThrow("'--app'")
	})
})

describe('selectionToGroups', () => {
	it('answers the named groups in plan order', () => {
		expect(selectionToGroups('tests,manifest')).toStrictEqual(['manifest', 'tests'])
	})

	it('answers undefined for no selection, which covers every group', () => {
		expect(selectionToGroups(undefined)).toBeUndefined()
	})

	it('refuses a name that is not a group', () => {
		expect(() => selectionToGroups('sources')).toThrow(UsageError)
	})
})

describe('selectionToPackages', () => {
	it('answers the named packages in selection order', () => {
		expect(selectionToPackages('@orkestrel/router,@orkestrel/emitter')).toStrictEqual([
			'@orkestrel/router',
			'@orkestrel/emitter',
		])
	})

	it('answers none for no selection', () => {
		expect(selectionToPackages(undefined)).toStrictEqual([])
	})

	it('refuses a name outside the published scope', () => {
		expect(() => selectionToPackages('vitest')).toThrow(UsageError)
	})
})

describe('mergeResults', () => {
	it('carries both path lists under the target the first result names', () => {
		expect(
			mergeResults(
				{ target: './first', written: ['a'], skipped: ['b'], removed: [] },
				{ target: './second', written: ['c'], skipped: [], removed: ['d'] },
			),
		).toStrictEqual({
			target: './first',
			written: ['a', 'c'],
			skipped: ['b'],
			removed: ['d'],
		})
	})

	it('names a path both mutations reported in one list once, and keeps a path one wrote and the other skipped in both', () => {
		expect(
			mergeResults(
				{ target: './t', written: ['package.json', 'a'], skipped: ['b'], removed: ['c'] },
				{ target: './t', written: ['package.json'], skipped: ['b'], removed: ['c'] },
			),
		).toStrictEqual({
			target: './t',
			written: ['package.json', 'a'],
			skipped: ['b'],
			removed: ['c'],
		})
		expect(
			mergeResults(
				{ target: './t', written: [], skipped: ['package.json'], removed: [] },
				{ target: './t', written: ['package.json'], skipped: [], removed: [] },
			),
		).toStrictEqual({
			target: './t',
			written: ['package.json'],
			skipped: ['package.json'],
			removed: [],
		})
	})
})

describe('resultToTally', () => {
	it('states each tally and the target', () => {
		expect(resultToTally({ target: './t', written: ['a'], skipped: ['b', 'c'], removed: [] })).toBe(
			'1 written, 2 unchanged, 0 removed in ./t.',
		)
	})
})

describe('targetToEnvironments', () => {
	it('reads the environments an axis holds as directories', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.ensure('project/src/core')
			workspace.ensure('project/src/server')
			// The control: a directory on the other axis is outside what this axis
			// ships, so an answer reading the target rather than the axis reports it.
			workspace.ensure('project/app/browser')
			const project = resolve(workspace.path, 'project')
			expect(targetToEnvironments(project, 'src')).toStrictEqual(['core', 'server'])
			expect(targetToEnvironments(project, 'app')).toStrictEqual(['browser'])
		} finally {
			workspace.destroy()
		}
	})

	it('answers none for an axis the target does not hold', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(targetToEnvironments(workspace.path, 'src')).toStrictEqual([])
		} finally {
			workspace.destroy()
		}
	})
})

describe('catalogToNames', () => {
	it('reads the package names the catalog table lists, in table order', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write(`project/${CATALOG_AGENT_PATH}`, CATALOG_AGENT_ROWS_TEXT)
			expect(catalogToNames(resolve(workspace.path, 'project'))).toStrictEqual([
				'@orkestrel/contract',
				'@orkestrel/emitter',
			])
		} finally {
			workspace.destroy()
		}
	})

	it('answers no names when the target holds no catalog file', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(catalogToNames(workspace.path)).toStrictEqual([])
		} finally {
			workspace.destroy()
		}
	})
})

describe('collectScriptChain', () => {
	it('walks a gate through every script it runs and collects their projects', () => {
		const chain = collectScriptChain(
			'test',
			{
				test: 'npm run test:src && npm run test:app',
				'test:src': 'vitest run --project src:core',
				'test:app': 'npm run test:app:core',
				'test:app:core': 'vitest run --project app:core',
			},
			new Map(),
		)

		expect([...chain.visited]).toStrictEqual(['test', 'test:src', 'test:app', 'test:app:core'])
		expect([...chain.projects]).toStrictEqual(['src:core', 'app:core'])
		expect([...chain.unreadable]).toStrictEqual([])
	})

	it('ends where a cycle closes and still reads every script once', () => {
		const chain = collectScriptChain(
			'a',
			{ a: 'npm run b', b: 'npm run a && vitest run --project p:x' },
			new Map(),
		)

		expect([...chain.visited]).toStrictEqual(['a', 'b'])
		expect([...chain.projects]).toStrictEqual(['p:x'])
	})

	it('names a script whose command cannot be read and follows nothing from it', () => {
		const chain = collectScriptChain(
			'test',
			{
				test: 'npm run first && npm run second',
				first: 'vitest run --project  && npm run hidden',
				second: 'vitest run --project src:core',
				hidden: 'vitest run --project src:server',
			},
			new Map(),
		)

		expect([...chain.unreadable]).toStrictEqual(['first'])
		expect([...chain.visited]).toStrictEqual(['test', 'first', 'second'])
		expect([...chain.projects]).toStrictEqual(['src:core'])
	})

	it('visits a script the manifest does not declare as a string and reads nothing from it', () => {
		const chain = collectScriptChain('test', { test: 'npm run broken', broken: 42 }, new Map())

		expect([...chain.visited]).toStrictEqual(['test', 'broken'])
		expect([...chain.projects]).toStrictEqual([])
		expect([...chain.unreadable]).toStrictEqual([])
	})

	it('answers only the gate for a gate the manifest does not declare', () => {
		const chain = collectScriptChain('absent', {}, new Map())

		expect([...chain.visited]).toStrictEqual(['absent'])
		expect([...chain.projects]).toStrictEqual([])
		expect([...chain.unreadable]).toStrictEqual([])
	})

	it('omits the projects of a script the gate never reaches', () => {
		const chain = collectScriptChain(
			'test',
			{ test: 'vitest run --project a', other: 'vitest run --project b' },
			new Map(),
		)

		expect([...chain.projects]).toStrictEqual(['a'])
		expect(chain.visited.has('other')).toBe(false)
	})

	it('reads a planned wrapper configuration as the face project it runs', () => {
		const chain = collectScriptChain(
			'test',
			{ test: 'vitest run --config configs/src/vite.core.config.ts' },
			new Map([['configs/src/vite.core.config.ts', 'src:core']]),
		)

		expect([...chain.projects]).toStrictEqual(['src:core'])
	})
})

describe('splitGitRecords', () => {
	it('splits complete records from the unfinished tail', () => {
		expect(splitGitRecords('alpha\0br')).toStrictEqual({ records: ['alpha'], pending: 'br' })
		expect(splitGitRecords('alpha\0')).toStrictEqual({ records: ['alpha'], pending: '' })
	})

	it('drops empty records and keeps a multi-byte record whole', () => {
		expect(splitGitRecords('br\u00fbl\u00e9e\0\0omega')).toStrictEqual({
			records: ['br\u00fbl\u00e9e'],
			pending: 'omega',
		})
	})

	it('answers no record and no tail for no text', () => {
		expect(splitGitRecords('')).toStrictEqual({ records: [], pending: '' })
		expect(splitGitRecords('\0\0')).toStrictEqual({ records: [], pending: '' })
	})
})

describe('findGitRefusal', () => {
	const inventory = 'The git query for target at target exceeded the working-tree inventory limit.'
	const unfinished =
		'The git query for target at target returned an unfinished record beyond the supported path limit.'

	it('accepts the record that reaches the inventory limit and refuses the next', () => {
		expect(
			findGitRefusal('target', MAX_INVENTORY_PATHS - 1, { records: ['last'], pending: '' }),
		).toBeUndefined()
		expect(
			findGitRefusal('target', MAX_INVENTORY_PATHS - 1, { records: ['last', 'over'], pending: '' }),
		).toBe(inventory)
		expect(
			findGitRefusal('target', 0, {
				records: Array.from({ length: MAX_INVENTORY_PATHS }, () => 'kept'),
				pending: '',
			}),
		).toBeUndefined()
	})

	it('accepts the unfinished-path boundary and refuses the next character', () => {
		expect(
			findGitRefusal('target', 0, { records: [], pending: 'p'.repeat(MAX_PATH_LENGTH + 3) }),
		).toBeUndefined()
		expect(
			findGitRefusal('target', 0, { records: [], pending: 'p'.repeat(MAX_PATH_LENGTH + 4) }),
		).toBe(unfinished)
	})

	it('names the inventory limit when both limits are passed', () => {
		expect(
			findGitRefusal('target', MAX_INVENTORY_PATHS, {
				records: ['over'],
				pending: 'p'.repeat(MAX_PATH_LENGTH + 4),
			}),
		).toBe(inventory)
	})
})

// A `for…of` loop reads one entry, works on it, and stops at the first failure, where a copy of the
// list reads every entry first. Each case runs the helper over a list of two recorded entries and
// pins the constructor it raised and the entries it read, as the loop the helper replaced gave them.
describe('release helpers over a caller-supplied list read one entry at a time', () => {
	const declaration = createProducer(buildDependency, { name: 'vite', range: '~8.2.0' })

	it.each([
		buildLazyCase('the declarations a floor is read over', (shape) =>
			readLazily(
				shape,
				declaration,
				(dependencies) => dependenciesToFloors(dependencies),
				refuseObject(declaration),
			),
		),
		buildLazyCase(
			'the releases a foreign floor is measured over',
			(shape) =>
				readLazily(
					shape,
					buildRelease,
					(releases) => releasesToQuestions(releases),
					refuseObject(buildRelease),
				),
			{ dense: { outcome: 'return', reads: [0, 0, 1, 0] } },
		),
		buildLazyCase(
			'the served releases a newer major is read from',
			(shape) =>
				readLazily(
					shape,
					buildRelease,
					(served) => releasesToQuestions([buildRelease()], served),
					refuseObject(buildRelease),
				),
			{ dense: { outcome: 'return', reads: [0] } },
		),
	])('reads $label one entry at a time', ({ read, hole, refused, refusal, dense }) => {
		expect(read('hole-before-entry')).toStrictEqual(hole)
		expect(read('hole-before-refusal')).toStrictEqual(refused)
		expect(read('refusal-before-entry')).toStrictEqual(refusal)
		expect(read('dense-pair')).toStrictEqual(dense)
	})
})

// A `for…of` loop stops at the first declaration whose range names no version and closes its iterator
// there, closes it when its body throws, and leaves an iterator that ended alone. A close that raises
// surfaces when the loop returned, and gives way to the body's own error when the body threw. Each
// case hands the helper a list whose iterator records its steps and closes, and pins the log and the
// constructor the loop the helper replaced gave.
describe('dependenciesToFloors closes the iterator of the list it stops reading as the loop did', () => {
	const floored = createProducer(buildDependency, { name: 'vite', range: '~8.2.0' })
	const floorless = createProducer(buildDependency, { name: 'vite', range: '^8' })

	it('stops at the first declaration naming no version, reads no further and closes once', () => {
		const closable = createClosableList(
			2,
			new Map([
				[0, floorless],
				[1, floored],
			]),
		)

		expect(dependenciesToFloors(closable.list)).toBeUndefined()
		expect(closable.calls).toStrictEqual(['iter', 'next', 'get:0', 'return'])
	})

	it('closes the iterator once when a declaration throws', () => {
		const closable = createClosableList(2, new Map([[1, floored]]))

		expect(() => dependenciesToFloors(closable.list)).toThrow(TypeError)
		expect(closable.calls).toStrictEqual(['iter', 'next', 'return'])
	})

	it('leaves the iterator alone when it ends and reads the step that finds it done', () => {
		const closable = createClosableList(
			2,
			new Map([
				[0, floored],
				[1, floored],
			]),
		)

		expect(dependenciesToFloors(closable.list)).toHaveLength(2)
		expect(closable.calls).toStrictEqual(['iter', 'next', 'get:0', 'next', 'get:1', 'next'])
	})

	it('surfaces the close when the loop returned and drops it when a declaration threw', () => {
		const stopped = createClosableList(1, new Map([[0, floorless]]), { close: refuseClose })
		const thrown = createClosableList(1, new Map<number, () => never>(), { close: refuseClose })
		const answered = createClosableList(1, new Map([[0, floorless]]), { close: () => 5 })

		expect(() => dependenciesToFloors(stopped.list)).toThrow(EvalError)
		expect(() => dependenciesToFloors(thrown.list)).toThrow(TypeError)
		expect(() => dependenciesToFloors(answered.list)).toThrow(TypeError)
		expect(thrown.calls).toStrictEqual(['iter', 'next', 'return'])
	})
})

// A `for…of` loop reads every entry the iterator of a list yields, however long the list says it is.
// A list whose iterator is replaced can yield more entries than its `length`, fewer, or the same
// number in another order. Each case hands the helper such a list, whose iterator records its steps
// and its closes, and pins the answer and the log the loop the helper replaced gave.
describe('dependenciesToFloors reads the entries the iterator of its list yields, not its length', () => {
	const vite = { name: 'vite', range: '~8.2.0' }
	const typescript = { name: 'typescript', range: '^5.9.0' }
	const floorless = { name: 'vite', range: '^8' }

	it('reads every declaration of an iterator that yields more than the list is long', () => {
		const declarations = createServedList([], [vite, typescript])

		expect(dependenciesToFloors(declarations.list)?.map(({ name }) => name)).toStrictEqual([
			'vite',
			'typescript',
		])
		expect(declarations.calls).toStrictEqual(['iter', 'next', 'next', 'next'])
	})

	it('reaches the declaration of an iterator that names no version beyond the list length', () => {
		const declarations = createServedList([], [vite, typescript, floorless])

		expect(dependenciesToFloors(declarations.list)).toBeUndefined()
		expect(declarations.calls).toStrictEqual(['iter', 'next', 'next', 'next', 'return'])
	})

	it('reads the declaration of an iterator that yields fewer than the list is long', () => {
		const declarations = createServedList([vite, typescript, vite], [typescript])

		expect(dependenciesToFloors(declarations.list)?.map(({ name }) => name)).toStrictEqual([
			'typescript',
		])
		expect(declarations.calls).toStrictEqual(['iter', 'next', 'next'])
	})

	it('reads the declarations in the order an iterator yields them when it yields another order', () => {
		const declarations = createServedList([vite, typescript], [typescript, vite])

		expect(dependenciesToFloors(declarations.list)?.map(({ name }) => name)).toStrictEqual([
			'typescript',
			'vite',
		])
		expect(declarations.calls).toStrictEqual(['iter', 'next', 'next', 'next'])
	})
})

// A `for…of` loop takes the iterator a list names and refuses a list that names none, where
// `Array.from` falls back to the indexes and answers. Each case runs the helper over a list whose
// `Symbol.iterator` is `undefined` and pins the constructor and the entries read before it was taken.
describe('release helpers over a list without an iterator refuse it as the loop did', () => {
	const declaration = createProducer(buildDependency, { name: 'vite', range: '~8.2.0' })

	it.each([
		buildMissingCase('the declarations a floor is read over', declaration, (dependencies) =>
			dependenciesToFloors(dependencies),
		),
		buildMissingCase('the releases a foreign floor is measured over', buildRelease, (releases) =>
			releasesToQuestions(releases),
		),
	])('refuses $label after the reads it names', ({ read, reads }) => {
		expect(read()).toStrictEqual({ outcome: 'TypeError', reads })
	})
})
