import type { Audit } from '@src/core'
import { describe, expect, it } from 'vitest'
import { width } from '@orkestrel/console'
import { resolve } from 'node:path'
import { CATALOG_AGENT_PATH, createBlueprint, ScaffoldError } from '@src/core'
import { createScratch } from '@orkestrel/test/server'
import {
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
	dependenciesToFloors,
	dependenciesToFleet,
	entriesToReleases,
	environmentToUpstream,
	errorToEnvelope,
	fetchToRefusal,
	manifestToWritableDependencies,
	mergeResults,
	optionToName,
	readGitRecords,
	releasesToExit,
	releasesToPins,
	releasesToQuestions,
	renderUsage,
	resultToTally,
	sanitizeLine,
	scriptToInvocations,
	selectionToEnvironments,
	selectionToGroups,
	selectionToPackages,
	targetToEnvironments,
	verbToSyntax,
	versionsToRefusal,
} from '../../../src/bin/helpers.js'
import {
	AUDIT_EXIT_CASES,
	buildOptionArgv,
	CATALOG_AGENT_ROWS_TEXT,
	COMMAND_CASES,
	SCRATCH_PREFIX,
	USAGE_CASES,
	WORKSPACE_ROOT,
} from '../../setupServer.js'

// Every option token some verb documents, once, in verb order.
const DOCUMENTED: readonly string[] = [...new Set(VERBS.flatMap((verb) => VERB_OPTIONS[verb]))]

// The negative control for every membership claim below, drawn from outside the
// population those claims cover: one word the executable has never accepted, and
// the flags the retired surface carried. An instrument that answers
// "documented" or "accepted" for these has measured nothing.
const UNDOCUMENTED: readonly string[] = ['--surfaces <list>', '--apply', '--prune']

describe('optionToName', () => {
	it('reads the bare name out of a token carrying a value placeholder', () => {
		expect(optionToName('--from <path>')).toBe('from')
		expect(optionToName('--groups <list>')).toBe('groups')
	})

	it('reads the bare name out of a flag token', () => {
		expect(optionToName('--json')).toBe('json')
	})

	it('names an option the parser accepts, for every documented token', () => {
		for (const option of DOCUMENTED) {
			expect(Object.keys(COMMAND_OPTIONS)).toContain(optionToName(option))
		}
	})

	it('names an option the parser refuses, for a token from outside the set', () => {
		for (const option of UNDOCUMENTED) {
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
			const absent = DOCUMENTED.filter((option) => !VERB_OPTIONS[verb].includes(option))
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
		for (const option of DOCUMENTED) {
			expect(Object.keys(OPTION_SUMMARY)).toContain(option)
			expect(usage).toContain(option)
		}
	})

	it('documents nothing the executable does not accept', () => {
		const usage = renderUsage().join('\n')
		for (const option of UNDOCUMENTED) expect(usage).not.toContain(option)
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
			let raised: unknown
			try {
				argvToCommand(usageCase.argv)
			} catch (error) {
				raised = error
			}
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
			for (const option of UNDOCUMENTED) {
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
				message: 'typescript declares major 6, while the registry serves major 7.',
				blocking: false,
			},
		])
	})

	it('reports a served newer major when the declared-major lookup finds no release', () => {
		expect(
			releasesToQuestions(
				[{ name: 'typescript', range: '^6.0.3', lookup: 'failed', note: 'missing' }],
				[{ name: 'typescript', range: '^6.0.3', lookup: 'found', latest: '7.0.2' }],
			),
		).toStrictEqual([
			{
				field: 'dependencies',
				message: 'typescript declares major 6, while the registry serves major 7.',
				blocking: false,
			},
		])
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
		expect(sanitizeLine('[31mred[0m')).toBe('red')
		expect(sanitizeLine('bell')).toBe('bell')
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
})

describe('scriptToInvocations', () => {
	it('reads a project named as a separate token and as one token', () => {
		expect(scriptToInvocations('vitest run --project src:core')).toStrictEqual({
			projects: ['src:core'],
			scripts: [],
		})
		expect(scriptToInvocations('vitest run --project=src:server')).toStrictEqual({
			projects: ['src:server'],
			scripts: [],
		})
	})

	it('reads every npm run script and reads through quotes', () => {
		expect(scriptToInvocations('npm run build && npm run "test:src"')).toStrictEqual({
			projects: [],
			scripts: ['build', 'test:src'],
		})
	})

	it('refuses a command whose value a shell expansion decides', () => {
		expect(scriptToInvocations('vitest run --project $PROJECT')).toBeUndefined()
		expect(scriptToInvocations('vitest run "--project=$PROJECT"')).toBeUndefined()
		expect(scriptToInvocations('npm run `echo build`')).toBeUndefined()
	})

	it('refuses an unterminated quote, a trailing escape, and an empty selection', () => {
		expect(scriptToInvocations("vitest run --project 'src:core")).toBeUndefined()
		expect(scriptToInvocations('vitest run --project src:core \\')).toBeUndefined()
		expect(scriptToInvocations('vitest run --project=')).toBeUndefined()
		expect(scriptToInvocations('vitest run --project && echo done')).toBeUndefined()
	})

	it('reads a command naming neither a project nor a script', () => {
		expect(scriptToInvocations('tsc --noEmit')).toStrictEqual({ projects: [], scripts: [] })
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

describe('readGitRecords', () => {
	it('answers the records git wrote for this repository', () => {
		const records = readGitRecords(WORKSPACE_ROOT, ['ls-files', '-z'])
		expect(records).toContain('package.json')
		expect(records.every((record) => record.length > 0)).toBe(true)
	})

	it('refuses a directory that is not a git repository', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(() => readGitRecords(workspace.path, ['ls-files', '-z'])).toThrow(ScaffoldError)
		} finally {
			workspace.destroy()
		}
	})
})
