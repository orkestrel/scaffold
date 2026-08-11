import type { Audit } from '@src/core'
import { describe, expect, it } from 'vitest'
import { width } from '@orkestrel/console'
import { ScaffoldError } from '@src/core'
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
	errorToEnvelope,
	optionToName,
	renderUsage,
	verbToSyntax,
} from '../../../src/bin/helpers.js'
import { AUDIT_EXIT_CASES, buildOptionArgv, COMMAND_CASES, USAGE_CASES } from '../../setupServer.js'

// Every option token some verb documents, once, in verb order.
const DOCUMENTED: readonly string[] = [...new Set(VERBS.flatMap((verb) => VERB_OPTIONS[verb]))]

// The negative control for every membership claim below, drawn from outside the
// population those claims cover: one word the executable has never accepted, and
// the two flags the retired surface carried. An instrument that answers
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

	it('distinguishes the two verdicts across the whole table', () => {
		const codes = AUDIT_EXIT_CASES.map((auditCase) => auditToExit(auditCase.audit))
		expect(codes).toContain(EXIT_CLEAN)
		expect(codes).toContain(EXIT_DRIFT)
	})
})

describe('auditToSummary', () => {
	it('reports no planned paths without inventing a comparison', () => {
		expect(auditToSummary({ findings: [], questions: [] })).toBe(
			'0 of 0 planned paths drifted from the plan. Audit compared bytes at 0, existence at 0, and nothing at 0.',
		)
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
