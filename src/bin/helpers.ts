import type { Audit } from '@src/core'
import type { CLICommand, ErrorEnvelope, Verb } from './types.js'
import { align, width } from '@orkestrel/console'
import { attempt } from '@orkestrel/contract'
import { isScaffoldError } from '@src/core'
import { parseArgs } from 'node:util'
import {
	COMMAND_OPTIONS,
	EXECUTABLE_NAME,
	EXIT_CLEAN,
	EXIT_DRIFT,
	EXIT_SUMMARY,
	FAILED_CODE,
	FAILED_MESSAGE,
	NAME_ARGUMENT,
	OPTION_SUMMARY,
	VERB_OPTIONS,
	VERB_SUMMARY,
	VERBS,
} from './constants.js'
import { isUsageError, UsageError } from './errors.js'

/**
 * Read the option name out of the token usage displays it as.
 *
 * @param option - The displayed token, such as `--from <path>`.
 * @returns The bare name `node:util` parses the option under.
 *
 * @remarks
 * One token serves both readers: a person reads the value placeholder and the
 * parser reads the name in front of it. Deriving the name means a documented
 * option and an accepted option cannot be two different lists.
 *
 * @example
 * ```ts
 * import { optionToName } from './helpers.js'
 *
 * optionToName('--from <path>') // 'from'
 * optionToName('--json') // 'json'
 * ```
 */
export function optionToName(option: string): string {
	const [token = option] = option.split(' ')
	return token.startsWith('--') ? token.slice(2) : token
}

/**
 * Render one verb's synopsis.
 *
 * @param verb - The verb to describe.
 * @returns The command line this verb accepts, with every option bracketed.
 *
 * @remarks
 * The synopsis is derived from the verb's own option list rather than stored
 * beside it, so a line that documents an option the verb does not take cannot be
 * written. `new` alone carries the positional argument.
 *
 * @example
 * ```ts
 * import { verbToSyntax } from './helpers.js'
 *
 * verbToSyntax('audit') // 'scaffold audit [--groups <list>] …'
 * ```
 */
export function verbToSyntax(verb: Verb): string {
	const argument = verb === 'new' ? ` ${NAME_ARGUMENT}` : ''
	const options = VERB_OPTIONS[verb].map((option) => `[${option}]`).join(' ')
	return `${EXECUTABLE_NAME} ${verb}${argument} ${options}`
}

/**
 * Render the whole command reference.
 *
 * @returns One line per output call: the synopsis, every verb, the option glossary, and the exit codes.
 *
 * @remarks
 * Returned as lines because the executable writes through a handler that takes
 * one line, so the caller never has to split a block back apart. The glossary is
 * printed once for every verb rather than repeated per verb, since seven of the
 * nine options are shared and a reader comparing two verbs wants the difference,
 * not the repetition.
 */
export function renderUsage(): readonly string[] {
	const summaries = Object.entries(OPTION_SUMMARY)
	const column = Math.max(...summaries.map(([option]) => width(option)))
	return [
		`${EXECUTABLE_NAME} <verb> [options]`,
		'',
		...VERBS.flatMap((verb) => [`  ${verbToSyntax(verb)}`, `      ${VERB_SUMMARY[verb]}`]),
		'',
		'options',
		...summaries.map(([option, summary]) => `  ${align(option, column)}  ${summary}`),
		'',
		'exit codes',
		...Object.entries(EXIT_SUMMARY).map(([code, meaning]) => `  ${code}  ${meaning}`),
	]
}

/**
 * Read one command out of the arguments following the executable's own name.
 *
 * @param argv - The arguments the executable was given.
 * @returns The command the arguments denote.
 * @throws {@link UsageError} when they denote no command.
 *
 * @remarks
 * The one place untrusted argument text becomes a domain value, and it stays one
 * function because the command union admits no partial command to hand on: every
 * refusal has to happen before the value exists. It refuses in four ways, each
 * naming what was wrong — a word that is not a verb, a word that is not an
 * option, an option this verb does not take, and an argument this verb does not
 * take. `node:util` decides the second and this decides the rest, so an unknown
 * option is reported by the parser that found it rather than re-derived here.
 *
 * A request for usage is not a command and never reaches this: the caller
 * answers it first.
 *
 * @example
 * ```ts
 * import { argvToCommand } from './helpers.js'
 *
 * argvToCommand(['audit', '--json']) // { verb: 'audit', json: true }
 * ```
 */
export function argvToCommand(argv: readonly string[]): CLICommand {
	const [head, ...rest] = argv
	const verb = VERBS.find((candidate) => candidate === head)
	if (verb === undefined) {
		const found = head === undefined ? 'No command given.' : `Unknown command '${head}'.`
		throw new UsageError(`${found} Run '${EXECUTABLE_NAME} --help' for the command list.`)
	}
	const parsed = attempt(() =>
		parseArgs({ args: rest, options: COMMAND_OPTIONS, allowPositionals: true, strict: true }),
	)
	if (!parsed.success) {
		const cause = parsed.error
		throw new UsageError(
			cause instanceof Error ? cause.message : `Could not read the arguments to '${verb}'.`,
		)
	}
	const { positionals, values } = parsed.value
	const accepted = VERB_OPTIONS[verb].map((option) => optionToName(option))
	const refused = Object.keys(values).filter((name) => !accepted.includes(name))
	if (refused.length > 0) {
		const names = refused.map((name) => `--${name}`).join(', ')
		throw new UsageError(`'${verb}' does not take ${names}.`)
	}
	const [name] = positionals
	if (positionals.length > 1) {
		throw new UsageError(
			`'${verb}' takes at most one argument, and was given ${String(positionals.length)}.`,
		)
	}
	if (verb !== 'new' && name !== undefined) {
		throw new UsageError(`'${verb}' takes no argument, and was given '${name}'.`)
	}
	const paths = Array.isArray(values.from)
		? values.from.filter((value) => typeof value === 'string')
		: []
	if (verb !== 'catalog' && paths.length > 1) {
		throw new UsageError(
			`'${verb}' takes --from once, and was given it ${String(paths.length)} times.`,
		)
	}
	const src = typeof values.src === 'string' ? values.src : undefined
	const app = typeof values.app === 'string' ? values.app : undefined
	const bin = values.bin === true
	const dependencies = typeof values.deps === 'string' ? values.deps : undefined
	const target = typeof values.target === 'string' ? values.target : undefined
	const json = values.json === true
	const [from] = paths
	const location = target === undefined ? {} : { target }
	const source = from === undefined ? {} : { from }
	const selection = typeof values.groups === 'string' ? { groups: values.groups } : {}
	switch (verb) {
		case 'new':
			if (name === undefined) {
				throw new UsageError(`'new' needs the workspace ${NAME_ARGUMENT} it is scaffolding.`)
			}
			return {
				verb,
				name,
				json,
				...location,
				...source,
				...(src === undefined ? {} : { src }),
				...(app === undefined ? {} : { app }),
				...(bin ? { bin } : {}),
				...(dependencies === undefined ? {} : { dependencies }),
			}
		case 'audit':
			return { verb, json, ...location, ...source, ...selection }
		case 'repair':
			return { verb, json, ...location, ...source, ...selection }
		case 'catalog':
			return {
				verb,
				json,
				all: values.all === true,
				...location,
				...(paths.length === 0 ? {} : { from: paths }),
			}
		case 'overwrite':
			return {
				verb,
				json,
				dirty: values.dirty === true,
				...location,
				...source,
				...selection,
			}
	}
}

/**
 * Read the exit code an audit reports.
 *
 * @param audit - The comparison of a plan against a target.
 * @returns `EXIT_CLEAN` when the target matched the plan, `EXIT_DRIFT` otherwise.
 *
 * @remarks
 * One rule for every verb that carries an audit, so `audit`, `repair`, and
 * `overwrite` cannot disagree about what a clean run is. A blocking question
 * means the gate refused the blueprint, so the audit says nothing about the
 * target and the run is a failure. A foreign finding counts: the target holds a
 * file the plan does not own, which is a difference from the plan whether or not
 * this verb was allowed to remove it. A non-blocking question rides a complete
 * result and does not.
 *
 * @example
 * ```ts
 * import { auditToExit } from './helpers.js'
 *
 * auditToExit({ findings: [], questions: [] }) // 0
 * ```
 */
export function auditToExit(audit: Audit): number {
	const blocked = audit.questions.some((question) => question.blocking)
	const drifted = audit.findings.some((finding) => finding.drift !== 'aligned')
	return blocked || drifted ? EXIT_DRIFT : EXIT_CLEAN
}

/**
 * Project an audit into the human summary of its outcome.
 *
 * @param audit - The comparison to summarize.
 * @returns The refusal, or the planned-path outcome, its grounds, and any foreign-path count.
 *
 * @remarks
 * A blocking question means the gate produced no plan, so the target was not
 * compared and no finding count is reported. Otherwise the three grounds
 * describe what this run did. `bytes` means content-owned
 * bytes were observed, `existence` means presence or absence alone decided the
 * finding, and `nothing` means a birth-owned path was not examined. Foreign
 * paths remain a separate population because no planned ownership accounts for
 * them.
 *
 * @example
 * ```ts
 * import { auditToSummary } from './helpers.js'
 *
 * auditToSummary({
 *  findings: [],
 *  questions: [{ field: 'src', message: 'Core is required.', blocking: true }],
 * })
 * // 'Audit did not compare the target because the blueprint was refused.'
 * ```
 */
export function auditToSummary(audit: Audit): string {
	if (audit.questions.some((question) => question.blocking)) {
		return 'Audit did not compare the target because the blueprint was refused.'
	}
	const planned = audit.findings.filter((finding) => finding.drift !== 'foreign')
	const drifted = planned.filter((finding) => finding.drift !== 'aligned').length
	// These counts say what decided each verdict on this run. They partition the
	// planned findings, so they sum to `planned.length` and never to `drifted`.
	const bytes = planned.filter(
		(finding) => finding.ownership === 'content' && finding.observed !== undefined,
	).length
	const existence = planned.filter(
		(finding) =>
			finding.ownership === 'presence' ||
			(finding.ownership === 'content' && finding.drift === 'missing'),
	).length
	const nothing = planned.filter((finding) => finding.ownership === 'birth').length
	const foreign = audit.findings.length - planned.length
	const summary = `${String(drifted)} of ${String(planned.length)} planned path${planned.length === 1 ? '' : 's'} drifted from the plan. Audit compared bytes at ${String(bytes)}, existence at ${String(existence)}, and nothing at ${String(nothing)}.`
	return foreign === 0
		? summary
		: `${summary} The plan does not own ${String(foreign)} further path${foreign === 1 ? '' : 's'} beneath its groups.`
}

/**
 * Project a raised value into the machine-readable failure envelope.
 *
 * @param error - The value a command raised.
 * @returns The envelope naming the coded reason and what went wrong.
 *
 * @remarks
 * A `ScaffoldError` and a {@link UsageError} both publish a code, so both are
 * reported under their own. Anything else failed without saying why, and is
 * reported under one code rather than under an invented reading of it; a raised
 * value that is not an `Error` carries no message worth quoting, so the envelope
 * says so instead of stringifying whatever it was.
 *
 * @example
 * ```ts
 * import { errorToEnvelope } from './helpers.js'
 *
 * errorToEnvelope(new Error('boom')) // { error: { code: 'FAILED', message: 'boom' } }
 * ```
 */
export function errorToEnvelope(error: unknown): ErrorEnvelope {
	if (isUsageError(error) || isScaffoldError(error)) {
		return { error: { code: error.code, message: error.message } }
	}
	const message = error instanceof Error ? error.message : FAILED_MESSAGE
	return { error: { code: FAILED_CODE, message } }
}
