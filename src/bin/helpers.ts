import type {
	Audit,
	Blueprint,
	CatalogEntry,
	Dependency,
	DependencyPinSet,
	Environment,
	Group,
	Mirror,
	Question,
	Release,
} from '@src/core'
import type {
	CLICommand,
	ErrorEnvelope,
	ScriptInvocations,
	Verb,
	VersionResolution,
} from './types.js'
import type { MaterializeResult, UpstreamOptions } from '@src/server'
import { align, strip, stripControls, width } from '@orkestrel/console'
import { attempt, isError, isRecord, isString, parseJSON } from '@orkestrel/contract'
import { createMarkdown, flattenText, isTableNode } from '@orkestrel/markdown'
import { executeSync } from '@orkestrel/process/server'
import {
	blueprintToDevDependencies,
	CATALOG_AGENT_PATH,
	compareVersions,
	DEPENDENCY_NAME_PATTERN,
	ENVIRONMENTS,
	extractRangeMajor,
	extractVersion,
	GROUPS,
	isScaffoldError,
	manifestToDependencies,
	MAX_MANIFEST_BYTES,
	ScaffoldError,
} from '@src/core'
import { isPhysicalDirectory, readFileText, resolveContainedPath } from '@src/server'
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
 * option and an accepted option cannot be separate lists.
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
 * Project process environment endpoints into upstream reader options.
 *
 * @param environment - The process environment to read.
 * @returns The configured endpoint groups, or `undefined` when neither endpoint
 * is configured.
 */
export function environmentToUpstream(
	environment: Readonly<Record<string, string | undefined>>,
): UpstreamOptions | undefined {
	const registry = environment.ORKESTREL_SCAFFOLD_REGISTRY
	const repository = environment.ORKESTREL_SCAFFOLD_REPOSITORY
	if (registry === undefined && repository === undefined) return undefined
	return {
		...(registry === undefined ? {} : { registry: { base: registry } }),
		...(repository === undefined ? {} : { repository: { base: repository } }),
	}
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
 * printed once for every verb rather than repeated per verb, because
 * `--from <path>`, `--target <path>`, and `--json` are shared by every verb and
 * a reader comparing two verbs wants the difference, not the repetition.
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
 * refusal has to happen before the value exists. It refuses in these ways, each
 * naming what was wrong — a word that is not a verb, a word that is not an
 * option, an option this verb does not take, and an argument this verb does not
 * take. `node:util` decides the unknown option and this decides the rest, so an unknown
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
			isError(cause) ? cause.message : `Could not read the arguments to '${verb}'.`,
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
	const offline = values.offline === true
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
				...(offline ? { offline } : {}),
				...(dependencies === undefined ? {} : { dependencies }),
			}
		case 'audit':
			return { verb, json, ...location, ...source, ...selection, ...(offline ? { offline } : {}) }
		case 'repair':
			return { verb, json, ...location, ...source, ...selection, ...(offline ? { offline } : {}) }
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
				...(offline ? { offline } : {}),
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
 * Read the runtime and development rows a writing verb may raise.
 *
 * @param manifest - The target manifest text.
 * @param blueprint - The workspace shape that supplies the planned tool set.
 * @returns The declared fleet rows and planned foreign tools in their writable sections.
 */
export function manifestToWritableDependencies(
	manifest: string,
	blueprint: Blueprint,
): DependencyPinSet {
	const declared = manifestToDependencies(manifest)
	const runtime = [...dependenciesToFleet(declared.runtime)]
	const development = [...dependenciesToFleet(declared.development)]
	const parsed = parseJSON(manifest)
	if (!isRecord(parsed)) return { runtime, development }
	const runtimeRecord = isRecord(parsed.dependencies) ? parsed.dependencies : {}
	const developmentRecord = isRecord(parsed.devDependencies) ? parsed.devDependencies : {}
	for (const name of Object.keys(blueprintToDevDependencies(blueprint)).sort()) {
		if (name.startsWith('@orkestrel/')) continue
		const runtimeRange = runtimeRecord[name]
		if (isString(runtimeRange)) {
			runtime.push({ name, range: runtimeRange })
			continue
		}
		const developmentRange = developmentRecord[name]
		if (isString(developmentRange)) development.push({ name, range: developmentRange })
	}
	return { runtime, development }
}

/**
 * Keep only dependencies published by the Orkestrel fleet.
 *
 * @param dependencies - The declared dependencies to inspect.
 * @returns The fleet declarations in their original order.
 */
export function dependenciesToFleet(dependencies: readonly Dependency[]): readonly Dependency[] {
	return dependencies.filter((dependency) => dependency.name.startsWith('@orkestrel/'))
}

/**
 * Project declared concrete ranges to their distributed release floors.
 *
 * @param dependencies - The declarations whose floor versions to read.
 * @returns One found floor per declaration, or `undefined` when any range names
 * no concrete version.
 */
export function dependenciesToFloors(
	dependencies: readonly Dependency[],
): readonly Release[] | undefined {
	const releases: Release[] = []
	for (const dependency of dependencies) {
		const version =
			dependency.range.startsWith('^') || dependency.range.startsWith('~')
				? dependency.range.slice(1)
				: dependency.range
		if (extractVersion(version) === undefined) return undefined
		releases.push({ ...dependency, lookup: 'found', latest: version })
	}
	return releases
}

/**
 * Read the exit code registry release evidence earns.
 *
 * @param releases - The release verdicts to measure.
 * @returns `EXIT_DRIFT` for a failed lookup or an exact fleet mismatch; `EXIT_CLEAN` otherwise.
 */
export function releasesToExit(releases: readonly Release[]): number {
	return releases.some(
		(release) =>
			release.lookup !== 'found' ||
			(release.name.startsWith('@orkestrel/') && release.range !== `^${release.latest}`),
	)
		? EXIT_DRIFT
		: EXIT_CLEAN
}

/**
 * Project foreign floor and supported-major drift into audit questions.
 *
 * @param releases - The release verdicts to measure.
 * @param served - Alternate release verdicts used to detect a newer served major.
 * @returns One non-blocking question for each stale floor and each crossed major.
 */
export function releasesToQuestions(
	releases: readonly Release[],
	served: readonly Release[] = releases,
): readonly Question[] {
	const questions: Question[] = []
	for (const release of releases) {
		if (release.name.startsWith('@orkestrel/')) continue
		const declared = extractRangeMajor(release.range)
		const current = release.lookup === 'found' ? release.latest : undefined
		const resolved = current === undefined ? undefined : extractVersion(current)
		const floor = extractVersion(
			release.range.startsWith('^') || release.range.startsWith('~')
				? release.range.slice(1)
				: release.range,
		)
		if (
			declared !== undefined &&
			current !== undefined &&
			resolved !== undefined &&
			floor !== undefined &&
			resolved[0] === declared &&
			compareVersions(current, floor.join('.')) > 0
		) {
			questions.push({
				field: 'dependencies',
				message: `${release.name} declares the floor ${release.range}, while the registry serves ${current} within major ${String(declared)}.`,
				blocking: false,
			})
		}
		const alternate = served.find((candidate) => candidate.name === release.name)
		const published =
			release.major ??
			(alternate?.lookup === 'found' ? extractVersion(alternate.latest)?.[0] : undefined)
		if (declared !== undefined && published !== undefined && declared < published) {
			questions.push({
				field: 'dependencies',
				message: `${release.name} declares major ${String(declared)}, while the registry serves major ${String(published)}.`,
				blocking: false,
			})
		}
	}
	return questions
}

/**
 * Project an audit into the human summary of its outcome.
 *
 * @param audit - The comparison to summarize.
 * @returns The refusal, or the planned-path outcome, its grounds, and any foreign-path count.
 *
 * @remarks
 * A blocking question means the gate produced no plan, so the target was not
 * compared and no finding count is reported. Otherwise the grounds
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
	const message = isError(error) ? error.message : FAILED_MESSAGE
	return { error: { code: FAILED_CODE, message } }
}

/**
 * Writes one report line to the process output stream.
 *
 * @param line - The already-sanitized line to write.
 *
 * @remarks
 * The destination a terminal caller means for the report. It is the executable's
 * default `output` handler and the only place this package names
 * `process.stdout`, so a caller driving the executable from inside another
 * process replaces the whole write path by supplying its own handler.
 *
 * @example
 * ```ts
 * import { writeOutput } from './helpers.js'
 *
 * writeOutput('0 written, 0 unchanged, 0 removed in ./target.')
 * ```
 */
export function writeOutput(line: string): void {
	process.stdout.write(`${line}\n`)
}

/**
 * Writes one diagnostic line to the process error stream.
 *
 * @param line - The already-sanitized line to write.
 *
 * @remarks
 * The destination a terminal caller means for everything that must stay off the
 * report, so a piped machine-readable value is never polluted by a warning. It
 * is the executable's default `diagnostic` handler and the only place this
 * package names `process.stderr`.
 *
 * @example
 * ```ts
 * import { writeDiagnostic } from './helpers.js'
 *
 * writeDiagnostic('FAILED: the target is not a git repository.')
 * ```
 */
export function writeDiagnostic(line: string): void {
	process.stderr.write(`${line}\n`)
}

/**
 * Strips one line of everything a terminal would act on rather than print.
 *
 * @param line - The line to sanitize.
 * @returns The line with ANSI escapes and control characters removed and every
 * break folded to a space.
 *
 * @remarks
 * The single write path's cleaner, and the only place hostile bytes are answered
 * for. A refusal quotes the argument that caused it, so an escape sequence, a
 * bell, or a forged second line arrives here inside otherwise ordinary prose.
 * ANSI escapes go first because they are what repaints a terminal, control
 * characters next, and what remains is folded onto one line because a handler
 * takes one line and a caller writing a record per call must get one record.
 *
 * @example
 * ```ts
 * import { sanitizeLine } from './helpers.js'
 *
 * sanitizeLine('first\nsecond') // 'first second'
 * ```
 */
export function sanitizeLine(line: string): string {
	return stripControls(strip(line)).split(/\r?\n/).join(' ')
}

/**
 * Projects an incomplete version resolution into the refusal it earns.
 *
 * @param versions - The resolution to measure.
 * @returns The refusal to throw, or `undefined` when the resolution is complete.
 *
 * @remarks
 * Read before a caller opens a write, so a run that could not name every floor
 * refuses instead of writing a partial pin set.
 *
 * @example
 * ```ts
 * import { versionsToRefusal } from './helpers.js'
 *
 * versionsToRefusal({ releases: [], pins: { runtime: [], development: [] }, forced: false, complete: true })
 * // undefined
 * ```
 */
export function versionsToRefusal(versions: VersionResolution): ScaffoldError | undefined {
	if (versions.complete) return undefined
	const names = versions.releases
		.filter((release) => release.lookup !== 'found')
		.map((release) => release.name)
	return new ScaffoldError(
		'FETCH',
		names.length === 0
			? 'A declared dependency names no concrete floor.'
			: `The registry named no release for ${names.join(', ')}.`,
		{ names: names.length },
	)
}

/**
 * Projects an incomplete catalog fetch into the refusal it earns.
 *
 * @param entries - The catalog rows the fetch produced.
 * @param mirrors - The guide mirrors the fetch produced.
 * @returns The refusal to throw, or `undefined` when every row answered.
 *
 * @remarks
 * A catalog transaction starts only after every packument answered. A mirror the
 * host could not serve — a failed read or an absent guide, which is what a
 * published package with a private repository answers with — is skipped and
 * reported rather than refusing every other write, because one unreachable
 * package never costs the caller the rest of the fetch.
 *
 * @example
 * ```ts
 * import { fetchToRefusal } from './helpers.js'
 *
 * fetchToRefusal([], []) // undefined
 * ```
 */
export function fetchToRefusal(
	entries: readonly CatalogEntry[],
	mirrors: readonly Mirror[],
): ScaffoldError | undefined {
	const failed = [
		...entries.filter((entry) => entry.lookup !== 'found').map((entry) => entry.name),
		...mirrors
			.filter(
				(mirror) =>
					mirror.lookup !== 'found' && mirror.lookup !== 'failed' && mirror.lookup !== 'missing',
			)
			.map((mirror) => mirror.name),
	]
	if (failed.length === 0) return undefined
	return new ScaffoldError(
		'FETCH',
		`Upstream produced no complete catalog answer for ${failed.join(', ')}.`,
		{ names: failed.length },
	)
}

/**
 * Projects the catalog packuments already read into declared release evidence.
 *
 * @param declared - The declared dependencies to answer for, in declaration order.
 * @param entries - The catalog rows the fetch produced.
 * @returns One release verdict per declaration, in input order.
 *
 * @remarks
 * The catalog verb already holds every fleet packument, so a declared range is
 * measured against what that read returned rather than against a second request.
 *
 * @example
 * ```ts
 * import { entriesToReleases } from './helpers.js'
 *
 * entriesToReleases([{ name: '@orkestrel/emitter', range: '^0.0.5' }], [])
 * // [{ name: '@orkestrel/emitter', range: '^0.0.5', lookup: 'missing', note: '…' }]
 * ```
 */
export function entriesToReleases(
	declared: readonly Dependency[],
	entries: readonly CatalogEntry[],
): readonly Release[] {
	return declared.map((dependency): Release => {
		const entry = entries.find((candidate) => candidate.name === dependency.name)
		if (entry?.lookup === 'found') {
			return { ...dependency, lookup: 'found', latest: entry.version }
		}
		return {
			...dependency,
			lookup: entry?.lookup ?? 'missing',
			note: entry?.note ?? 'the organization catalog does not list the declared package',
		}
	})
}

/**
 * Projects release evidence into the complete pin set a write may apply.
 *
 * @param releases - The release verdicts, one per declared dependency, in the
 * order the declarations were looked up.
 * @param declared - The runtime and development declarations the verdicts answer for.
 * @returns The runtime and development pins, each at the caret of its release.
 * @throws `ScaffoldError('FETCH', …)` when a verdict named no release, when a
 * verdict has no matching declaration, or when the two sets differ in length.
 *
 * @remarks
 * All or nothing: a caller never writes a partial pin set, because a manifest
 * carrying some raised ranges and some stale ones is harder to recover from than
 * one that was not written at all.
 *
 * @example
 * ```ts
 * import { releasesToPins } from './helpers.js'
 *
 * releasesToPins(
 * 	[{ name: '@orkestrel/emitter', range: '^0.0.5', lookup: 'found', latest: '0.0.6' }],
 * 	{ runtime: [{ name: '@orkestrel/emitter', range: '^0.0.5' }], development: [] },
 * ) // { runtime: [{ name: '@orkestrel/emitter', range: '^0.0.6' }], development: [] }
 * ```
 */
export function releasesToPins(
	releases: readonly Release[],
	declared: DependencyPinSet,
): DependencyPinSet {
	const refused = releases.filter((release) => release.lookup !== 'found')
	if (refused.length > 0) {
		throw new ScaffoldError(
			'FETCH',
			`The registry named no release for ${refused.map((release) => release.name).join(', ')}.`,
			{ names: refused.length },
		)
	}
	const dependencies = [...declared.runtime, ...declared.development]
	const pins: Dependency[] = []
	for (let index = 0; index < releases.length; index += 1) {
		const release = releases[index]
		const dependency = dependencies[index]
		if (release === undefined || dependency === undefined) {
			throw new ScaffoldError('FETCH', 'The release answer has no matching declaration.')
		}
		if (release.lookup !== 'found') {
			throw new ScaffoldError('FETCH', `The registry named no release for ${release.name}.`)
		}
		pins.push({ name: dependency.name, range: `^${release.latest}` })
	}
	if (pins.length !== dependencies.length) {
		throw new ScaffoldError('FETCH', 'The release answer does not match the declaration set.')
	}
	return {
		runtime: pins.slice(0, declared.runtime.length),
		development: pins.slice(declared.runtime.length),
	}
}

/**
 * Reads the literal Vitest projects and npm run scripts one shell command invokes.
 *
 * @param script - The manifest script text to read.
 * @returns The invoked projects and scripts, or `undefined` when the command
 * cannot be read literally.
 *
 * @remarks
 * Quotes group a token but do not hide the option, while shell expansions make
 * its value unresolved and therefore refuse the write that asked the question.
 * An unterminated quote, a trailing escape, and an unresolved `--project` value
 * all answer `undefined` rather than a partial reading.
 *
 * @example
 * ```ts
 * import { scriptToInvocations } from './helpers.js'
 *
 * scriptToInvocations('vitest run --project src:core')
 * // { projects: ['src:core'], scripts: [] }
 * ```
 */
export function scriptToInvocations(script: string): ScriptInvocations | undefined {
	const tokens: Array<{ value: string; resolved: boolean }> = []
	let value = ''
	let resolved = true
	let started = false
	let quote: string | undefined
	for (let index = 0; index < script.length; index += 1) {
		const character = script[index]
		if (character === undefined) return undefined
		if (quote === undefined) {
			if (/\s/.test(character)) {
				if (started) tokens.push({ value, resolved })
				value = ''
				resolved = true
				started = false
				continue
			}
			if (';&|()'.includes(character)) {
				if (started) tokens.push({ value, resolved })
				const paired = script[index + 1] === character && (character === '&' || character === '|')
				tokens.push({ value: paired ? `${character}${character}` : character, resolved: true })
				value = ''
				resolved = true
				started = false
				if (paired) index += 1
				continue
			}
			if (character === '"' || character === "'") {
				quote = character
				started = true
				continue
			}
			if (character === '\\') {
				const escaped = script[index + 1]
				if (escaped === undefined) return undefined
				value += escaped
				started = true
				index += 1
				continue
			}
			if (character === '$' || character === '`' || character === '%') resolved = false
			value += character
			started = true
			continue
		}
		if (character === quote) {
			quote = undefined
			continue
		}
		if (character === '\\' && quote === '"') {
			const escaped = script[index + 1]
			if (escaped === undefined) return undefined
			value += escaped
			index += 1
			continue
		}
		if (quote === '"' && (character === '$' || character === '`' || character === '%')) {
			resolved = false
		}
		value += character
		started = true
	}
	if (quote !== undefined) return undefined
	if (started) tokens.push({ value, resolved })

	const projects: string[] = []
	const scripts: string[] = []
	for (let index = 0; index < tokens.length; index += 1) {
		const token = tokens[index]
		if (token === undefined) return undefined
		if (token.value === 'npm' && tokens[index + 1]?.value === 'run') {
			const name = tokens[index + 2]
			if (
				name === undefined ||
				!name.resolved ||
				name.value.length === 0 ||
				['&&', '||', ';', '|', '&', '(', ')'].includes(name.value)
			)
				return undefined
			scripts.push(name.value)
			index += 2
			continue
		}
		if (token.value === '--project') {
			const project = tokens[index + 1]
			if (
				project === undefined ||
				!project.resolved ||
				project.value.length === 0 ||
				['&&', '||', ';', '|', '&', '(', ')'].includes(project.value)
			)
				return undefined
			projects.push(project.value)
			index += 1
			continue
		}
		if (token.value.startsWith('--project=')) {
			const project = token.value.slice('--project='.length)
			if (!token.resolved || project.length === 0) return undefined
			projects.push(project)
			continue
		}
		if (!token.resolved && token.value.includes('--project')) return undefined
	}
	return { projects, scripts }
}

/**
 * Reads the environments one axis of a target physically ships.
 *
 * @param target - The target directory to read.
 * @param axis - The axis directory, `src` or `app`.
 * @returns The environments that axis holds as directories, in declared order.
 *
 * @remarks
 * Read as directories rather than declared, because a directory is the fact and
 * a declaration would be a second copy of it free to disagree.
 *
 * @example
 * ```ts
 * import { targetToEnvironments } from './helpers.js'
 *
 * targetToEnvironments('./packages/router', 'src') // ['core', 'server']
 * ```
 */
export function targetToEnvironments(target: string, axis: string): readonly Environment[] {
	return ENVIRONMENTS.filter((environment) => {
		const full = resolveContainedPath(target, `${axis}/${environment}`)
		return full !== undefined && isPhysicalDirectory(full)
	})
}

/**
 * Reads the packages a target's catalog table listed before this run.
 *
 * @param target - The target directory holding the catalog agent file.
 * @returns The package names the table's first column carries, in table order,
 * and no names when the file is absent.
 *
 * @remarks
 * Read through the declared markdown parser rather than by pattern, so a row is
 * a row because the document says so.
 *
 * @example
 * ```ts
 * import { catalogToNames } from './helpers.js'
 *
 * catalogToNames('./packages/router') // ['@orkestrel/contract', '@orkestrel/emitter']
 * ```
 */
export function catalogToNames(target: string): readonly string[] {
	const text = readFileText(target, CATALOG_AGENT_PATH)
	if (text === undefined) return []
	const names: string[] = []
	for (const table of createMarkdown(text).filter(isTableNode)) {
		for (const row of table.rows) {
			const [cell] = row
			if (cell === undefined) continue
			const name = cell.map(flattenText).join('').trim()
			if (DEPENDENCY_NAME_PATTERN.test(name)) names.push(name)
		}
	}
	return names
}

/**
 * Reads one git query as its NUL-separated records.
 *
 * @param target - The repository the query runs in.
 * @param args - The git arguments, without the program name.
 * @returns The non-empty records git wrote, in git's own order.
 * @throws `ScaffoldError('TARGET', …)` when the query fails, which is what a
 * directory that is not a git repository answers with.
 *
 * @remarks
 * Git is asked rather than reimplemented, because the tracked set and the dirty
 * set are git's own answers and nothing else can give them. `executeSync`
 * resolves the bare `git` name against `PATH` and `PATHEXT` on Windows, never
 * through a shell, so the query runs without an extension of its own. A failed
 * run resolves instead of throwing there, so git's own refusal is buffered into
 * the result rather than written onto a stream nobody chose.
 *
 * @example
 * ```ts
 * import { readGitRecords } from './helpers.js'
 *
 * readGitRecords('./packages/router', ['ls-files', '-z']) // ['package.json', 'src/core/index.ts']
 * ```
 */
export function readGitRecords(target: string, args: readonly string[]): readonly string[] {
	const result = executeSync(
		{ file: 'git', arguments: [...args] },
		{ workspace: target, limit: MAX_MANIFEST_BYTES, strict: false },
	)
	if (result.failed) {
		throw new ScaffoldError('TARGET', `The target at ${target} is not a git repository.`, {
			target,
		})
	}
	return result.stdout.split('\0').filter((record) => record.length > 0)
}

/**
 * Reads the environments a comma-separated selection names.
 *
 * @param selection - The selection text, or `undefined` for no selection.
 * @param axis - The axis the option configures, quoted in a refusal.
 * @returns The named environments in declared order, and none for no selection.
 * @throws `UsageError` when the selection names something that is not an environment.
 *
 * @example
 * ```ts
 * import { selectionToEnvironments } from './helpers.js'
 *
 * selectionToEnvironments('server,core', 'src') // ['core', 'server']
 * ```
 */
export function selectionToEnvironments(
	selection: string | undefined,
	axis: string,
): readonly Environment[] {
	if (selection === undefined) return []
	const requested = selection.split(',')
	const refused = requested.filter(
		(name) => !ENVIRONMENTS.some((environment) => environment === name),
	)
	if (refused.length > 0) {
		throw new UsageError(
			`'--${axis}' does not take ${refused.join(', ')}. It takes ${ENVIRONMENTS.join(', ')}.`,
		)
	}
	return ENVIRONMENTS.filter((environment) => requested.includes(environment))
}

/**
 * Reads the artifact groups a comma-separated selection names.
 *
 * @param selection - The selection text, or `undefined` for no selection.
 * @returns The named groups in plan order, and `undefined` for no selection,
 * which covers every group.
 * @throws `UsageError` when the selection names something that is not a group.
 *
 * @example
 * ```ts
 * import { selectionToGroups } from './helpers.js'
 *
 * selectionToGroups('tests,manifest') // ['manifest', 'tests']
 * ```
 */
export function selectionToGroups(selection: string | undefined): readonly Group[] | undefined {
	if (selection === undefined) return undefined
	const requested = selection.split(',')
	const refused = requested.filter((name) => !GROUPS.some((group) => group === name))
	if (refused.length > 0) {
		throw new UsageError(
			`'--groups' does not take ${refused.join(', ')}. It takes ${GROUPS.join(', ')}.`,
		)
	}
	return GROUPS.filter((group) => requested.includes(group))
}

/**
 * Reads the fleet packages a comma-separated selection names.
 *
 * @param selection - The selection text, or `undefined` for no selection.
 * @returns The named packages in selection order, and none for no selection.
 * @throws `UsageError` when a name is not a published `@orkestrel` package name.
 *
 * @example
 * ```ts
 * import { selectionToPackages } from './helpers.js'
 *
 * selectionToPackages('@orkestrel/emitter') // ['@orkestrel/emitter']
 * ```
 */
export function selectionToPackages(selection: string | undefined): readonly string[] {
	if (selection === undefined) return []
	const requested = selection.split(',')
	const refused = requested.filter((name) => !DEPENDENCY_NAME_PATTERN.test(name))
	if (refused.length > 0) {
		throw new UsageError(
			`'--deps' does not take ${refused.join(', ')}. Every name is a published @orkestrel package.`,
		)
	}
	return requested
}

/**
 * Merges the results of two mutations of one target into one result.
 *
 * @param first - The earlier result, which fixes the reported target.
 * @param second - The later result.
 * @returns One result carrying both path lists, first's paths ahead of second's.
 *
 * @remarks
 * Written and skipped never overlap across the calls a verb makes, because each
 * call answers for its own paths.
 *
 * @example
 * ```ts
 * import { mergeResults } from './helpers.js'
 *
 * mergeResults(
 * 	{ target: './t', written: ['a'], skipped: [], removed: [] },
 * 	{ target: './t', written: ['b'], skipped: [], removed: [] },
 * ) // { target: './t', written: ['a', 'b'], skipped: [], removed: [] }
 * ```
 */
export function mergeResults(
	first: MaterializeResult,
	second: MaterializeResult,
): MaterializeResult {
	return {
		target: first.target,
		written: [...first.written, ...second.written],
		skipped: [...first.skipped, ...second.skipped],
		removed: [...first.removed, ...second.removed],
	}
}

/**
 * Projects one mutation result into the line that states what it did.
 *
 * @param result - The result to state.
 * @returns One line naming the written, unchanged, and removed tallies and the target.
 *
 * @example
 * ```ts
 * import { resultToTally } from './helpers.js'
 *
 * resultToTally({ target: './t', written: ['a'], skipped: [], removed: [] })
 * // '1 written, 0 unchanged, 0 removed in ./t.'
 * ```
 */
export function resultToTally(result: MaterializeResult): string {
	return `${String(result.written.length)} written, ${String(result.skipped.length)} unchanged, ${String(result.removed.length)} removed in ${result.target}.`
}
