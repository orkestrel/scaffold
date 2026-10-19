import type {
	Artifact,
	Audit,
	Axis,
	Blueprint,
	CatalogEntry,
	Dependency,
	DependencyPinSet,
	Environment,
	Extension,
	Group,
	ManifestScript,
	Mirror,
	Question,
	Release,
} from '@src/core'
import type {
	CLICommand,
	ErrorEnvelope,
	GitChunk,
	ScriptChain,
	ScriptInvocations,
	ScriptStep,
	ScriptToken,
	TargetQuestion,
	Verb,
	VersionResolution,
} from './types.js'
import type { Host, MaterializeResult, UpstreamOptions } from '@src/server'
import { align, strip, stripControls, width } from '@orkestrel/console'
import {
	attempt,
	isArray,
	isDefined,
	isError,
	isRecord,
	isString,
	parseJSON,
} from '@orkestrel/contract'
import { createMarkdown, flattenText, isTableNode } from '@orkestrel/markdown'
import {
	AXES,
	blueprintToDevDependencies,
	blueprintToScripts,
	blueprintToWritableScripts,
	CATALOG_AGENT_PATH,
	compareVersions,
	DEPENDENCY_NAME_PATTERN,
	ENVIRONMENTS,
	FRAMEWORKS,
	extractRangeMajor,
	extractVersion,
	GROUPS,
	isScaffoldError,
	isSheetName,
	iterateAnswers,
	manifestToDependencies,
	MAX_PATH_LENGTH,
	parseExtension,
	RESERVED_SHEET_NAMES,
	ScaffoldError,
	SHEET_ENTRY_NAME,
	SHOWCASE_CONFIG_PATH,
	SHOWCASE_DEV_DEPENDENCIES,
	SHOWCASE_PAGES_PATH,
	STYLES_ENTRY_PATH,
	THEMES_BARREL_PATH,
	THEMES_ENTRY_PATH,
} from '@src/core'
import {
	isExactCaseFile,
	isPhysicalDirectory,
	MAX_INVENTORY_PATHS,
	readFileText,
	resolveContainedPath,
} from '@src/server'
import { readdirSync } from 'node:fs'
import { normalize } from 'node:path'
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
	ROOT_IMPORT_PATTERN,
	SHEET_IMPORT_PATTERN,
	VERB_OPTIONS,
	VERB_SUMMARY,
	VERBS,
} from './constants.js'
import { isUsageError, UsageError } from './errors.js'

/**
 * Reads the option name out of the token usage displays it as.
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
 * Projects process environment endpoints into upstream reader options.
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
 * Renders one verb's synopsis.
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
 * Renders the whole command reference.
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
 * Reads one command out of the arguments following the executable's own name.
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
	const paths = isArray(values.from) ? values.from.filter(isString) : []
	if (verb !== 'catalog' && paths.length > 1) {
		throw new UsageError(
			`'${verb}' takes --from once, and was given it ${String(paths.length)} times.`,
		)
	}
	const src = isString(values.src) ? values.src : undefined
	const app = isString(values.app) ? values.app : undefined
	const bin = values.bin === true
	const offline = values.offline === true
	const dependencies = isString(values.deps) ? values.deps : undefined
	const target = isString(values.target) ? values.target : undefined
	const json = values.json === true
	const [from] = paths
	const extensions = isArray(values.extend) ? values.extend.filter(isString) : []
	if (extensions.length > 1)
		throw new UsageError("'new' takes --extend once; combine entries in one list.")
	const [extension] = extensions
	const location = target === undefined ? {} : { target }
	const source = from === undefined ? {} : { from }
	const selection = isString(values.groups) ? { groups: values.groups } : {}
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
				...(values.styles === true ? { styles: true } : {}),
				...(values.themes === true ? { themes: true } : {}),
				...(values.showcase === true ? { showcase: true } : {}),
				...(extension === undefined ? {} : { extensions: extension }),
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
 * Reads the exit code an audit reports.
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
 * Reads the runtime and development rows a writing verb may raise.
 *
 * @param manifest - The target manifest text.
 * @param blueprint - The workspace shape that supplies the planned tool set.
 * @returns The declared fleet rows and planned foreign tools in their writable sections.
 * @remarks
 * Selected showcase tools retain every string declaration in both sections.
 * Other foreign tools retain runtime precedence when declared in both sections.
 */
export function manifestToWritableDependencies(
	manifest: string,
	blueprint: Blueprint,
): DependencyPinSet {
	const declared = manifestToDependencies(manifest)
	const parsed = parseJSON(manifest)
	if (!isRecord(parsed)) {
		return {
			runtime: dependenciesToFleet(declared.runtime),
			development: dependenciesToFleet(declared.development),
		}
	}
	const runtimeRecord = isRecord(parsed.dependencies) ? parsed.dependencies : {}
	const developmentRecord = isRecord(parsed.devDependencies) ? parsed.devDependencies : {}
	const rows = Object.keys(blueprintToDevDependencies(blueprint))
		.sort()
		.filter((name) => !name.startsWith('@orkestrel/'))
		.map((name) => ({
			name,
			runtimeRange: runtimeRecord[name],
			developmentRange: developmentRecord[name],
			dual:
				blueprint.showcase &&
				blueprint.app.includes('browser') &&
				Object.hasOwn(SHOWCASE_DEV_DEPENDENCIES, name),
		}))
	return {
		runtime: [
			...dependenciesToFleet(declared.runtime),
			...rows.flatMap(({ name, runtimeRange }) =>
				isString(runtimeRange) ? [{ name, range: runtimeRange }] : [],
			),
		],
		// A tool declared in both sections keeps its runtime row alone, unless a selected showcase
		// declares it in both on purpose.
		development: [
			...dependenciesToFleet(declared.development),
			...rows.flatMap(({ name, runtimeRange, developmentRange, dual }) =>
				(isString(runtimeRange) && !dual) || !isString(developmentRange)
					? []
					: [{ name, range: developmentRange }],
			),
		],
	}
}

/**
 * Reads the planned dependencies a target manifest declares in neither writable section.
 *
 * @param manifest - The target manifest text.
 * @param blueprint - The workspace shape that supplies the planned dependencies.
 * @returns The undeclared planned dependencies at their planned ranges, in name order, each in
 * the list naming the section the plan assigns it.
 *
 * @remarks
 * The plan declares its tooling under `devDependencies`, so every row lands in `development` and
 * `runtime` stays empty: the blueprint's runtime packages are read from the manifest's own
 * `dependencies`, so none of them is ever missing. A planned package either section declares is
 * present, whatever its range. A manifest that is not an object, or whose sections are not
 * objects, yields what its readable sections leave undeclared, and the caller's refusal of that
 * malformed shape decides whether a write may follow.
 *
 * @example
 * ```ts
 * import { createBlueprint } from '@src/core'
 * import { manifestToAdditions } from './helpers.js'
 *
 * const blueprint = createBlueprint('sample', { src: ['core'] })
 * manifestToAdditions('{"devDependencies": {}}', blueprint).development.some(
 *   ({ name }) => name === 'typescript',
 * ) // true
 * ```
 */
export function manifestToAdditions(manifest: string, blueprint: Blueprint): DependencyPinSet {
	const parsed = parseJSON(manifest)
	const runtime = isRecord(parsed) && isRecord(parsed.dependencies) ? parsed.dependencies : {}
	const development =
		isRecord(parsed) && isRecord(parsed.devDependencies) ? parsed.devDependencies : {}
	return {
		runtime: [],
		development: Object.entries(blueprintToDevDependencies(blueprint))
			.filter(([name]) => !Object.hasOwn(runtime, name) && !Object.hasOwn(development, name))
			.map(([name, range]) => ({ name, range })),
	}
}

/**
 * Reads the root-relative imports a target keeps in a planned birth-owned sheet test.
 *
 * @param artifact - The planned artifact at the path the target holds.
 * @param present - The text the target holds at that path.
 * @returns A non-blocking `tests` question naming the file and each root-relative specifier beside
 * the relative specifier to write, or `undefined` when the artifact is not a birth-owned sheet
 * test or the text imports nothing by a root-relative specifier.
 *
 * @remarks
 * Birth ownership never rewrites a present file, so a target born before the sheet test imported
 * the built sheet by a relative path keeps the root-relative import, and the content-owned lint
 * configuration refuses it. The relative specifier climbs one `../` per directory of the
 * artifact's path to the workspace root, which is the specifier the planned test itself imports.
 *
 * @example
 * ```ts
 * import { sheetTestToQuestion } from './helpers.js'
 *
 * const artifact = {
 *   path: 'tests/src/styles/index.test.ts',
 *   group: 'tests',
 *   ownership: 'birth',
 *   origin: 'template',
 *   content: "import sheet from '../../../dist/src/styles/index.css?raw'\n",
 * } as const
 * sheetTestToQuestion(artifact, "import sheet from '/dist/src/styles/index.css?raw'\n")?.field // 'tests'
 * sheetTestToQuestion(artifact, artifact.content) // undefined
 * ```
 */
export function sheetTestToQuestion(
	artifact: Artifact,
	present: string,
): TargetQuestion | undefined {
	if (artifact.origin === 'host' || artifact.ownership !== 'birth') return undefined
	if (!SHEET_IMPORT_PATTERN.test(artifact.content)) return undefined
	const root = '../'.repeat(artifact.path.split('/').length - 1)
	const replacements = [...present.matchAll(ROOT_IMPORT_PATTERN)].map(
		(match) => `'${match[2] ?? ''}' with '${root}${(match[2] ?? '').slice(1)}'`,
	)
	if (replacements.length === 0) return undefined
	const single = replacements.length === 1
	return {
		field: 'tests',
		message: `The birth-owned sheet test ${artifact.path} imports by ${single ? 'a root-relative specifier' : 'root-relative specifiers'}, which oxlint's import/no-absolute-path rule refuses under --deny-warnings. Replace ${replacements.join(' and ')}. Scaffold does not rewrite a birth-owned file.`,
		blocking: false,
		groups: ['tests'],
	}
}

/**
 * Reads the manifest scripts a writing verb may write.
 *
 * @param manifest - The target manifest text.
 * @param blueprint - The workspace shape that supplies the planned scripts.
 * @returns The blueprint's writable scripts, followed by the planned `test` chain when the
 * declared chain is a generated predecessor of it.
 *
 * @remarks
 * A declared `test` chain is a generated predecessor when it runs fewer `&&` steps than the
 * planned chain and every step it runs is a planned step, in the planned order. That is the chain
 * a birth or an earlier write left before a structural fact planned another step, such as a root
 * `tests/setupBrowser.test.ts` proof planning `npm run test:setup:browser`, so the write lands the
 * planned chain in its place. A chain running a step the plan does not generate, or running the
 * planned steps in another order, is one the package owns, and no entry names it.
 *
 * The planned chain joins only when every step it adds runs a script the manifest declares or the
 * writable scripts supply. The `test:src` and `test:app` aggregates sit outside the writable
 * scripts, so a planned chain adding an aggregate the manifest lacks stays with the package rather
 * than landing a step that names a missing script.
 */
export function manifestToWritableScripts(
	manifest: string,
	blueprint: Blueprint,
): readonly ManifestScript[] {
	const writable = blueprintToWritableScripts(blueprint)
	const planned = blueprintToScripts(blueprint).test
	const parsed = parseJSON(manifest)
	const scripts = isRecord(parsed) && isRecord(parsed.scripts) ? parsed.scripts : {}
	const declared = scripts.test
	if (planned === undefined || !isString(declared)) return writable
	const steps = declared.split('&&').map((step) => step.trim())
	const expected = planned.split('&&').map((step) => step.trim())
	if (steps.length >= expected.length) return writable
	// Each declared step must appear in the planned order, so every search resumes
	// where the previous match stopped.
	const resumed = expected.values()
	if (!steps.every((step) => resumed.some((entry) => entry === step))) return writable
	const supplied = new Set(writable.map(({ name }) => name))
	for (const step of expected) {
		if (steps.includes(step)) continue
		const name = /^npm run (\S+)$/.exec(step)?.[1]
		if (name === undefined || (!supplied.has(name) && !isString(scripts[name]))) return writable
	}
	return [...writable, { name: 'test', command: planned, accepted: [declared] }]
}

/**
 * Keeps only dependencies published by the Orkestrel fleet.
 *
 * @param dependencies - The declared dependencies to inspect.
 * @returns The fleet declarations in their original order.
 */
export function dependenciesToFleet(dependencies: readonly Dependency[]): readonly Dependency[] {
	return dependencies.filter((dependency) => dependency.name.startsWith('@orkestrel/'))
}

/**
 * Projects declared concrete ranges to their distributed release floors.
 *
 * @param dependencies - The declarations whose floor versions to read.
 * @returns One found floor per declaration, or `undefined` when any range names
 * no concrete version.
 */
export function dependenciesToFloors(
	dependencies: readonly Dependency[],
): readonly Release[] | undefined {
	// The iterator the list names serves every declaration, however many entries the list's length
	// reports, and the read stops at the first range naming no version. A hole reads as an
	// `undefined` declaration, which the range read refuses.
	const floors = [
		...iterateAnswers(dependencies, (dependency): Release | undefined => {
			const version =
				dependency.range.startsWith('^') || dependency.range.startsWith('~')
					? dependency.range.slice(1)
					: dependency.range
			return extractVersion(version) === undefined
				? undefined
				: { ...dependency, lookup: 'found', latest: version }
		}),
	]
	return floors.every(isDefined) ? floors : undefined
}

/**
 * Reads the exit code registry release evidence earns.
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
 * Projects foreign floor and supported-major drift into audit questions.
 *
 * @param releases - The release verdicts to measure.
 * @param served - Alternate release verdicts used to detect a newer served major.
 * @returns One non-blocking question for each stale floor and each crossed major.
 */
export function releasesToQuestions(
	releases: readonly Release[],
	served: readonly Release[] = releases,
): readonly Question[] {
	// The iterator consumes one release at a time, and reads a hole as an `undefined` release, which
	// the name read refuses before a later release is read.
	return Iterator.from(releases)
		.flatMap((release): readonly Question[] => {
			if (release.name.startsWith('@orkestrel/')) return []
			const declared = extractRangeMajor(release.range)
			const current = release.lookup === 'found' ? release.latest : undefined
			const resolved = current === undefined ? undefined : extractVersion(current)
			const floor = extractVersion(
				release.range.startsWith('^') || release.range.startsWith('~')
					? release.range.slice(1)
					: release.range,
			)
			const alternate = served.find((candidate) => candidate.name === release.name)
			const published =
				release.major ??
				(alternate?.lookup === 'found' ? extractVersion(alternate.latest)?.[0] : undefined)
			return [
				...(declared !== undefined &&
				current !== undefined &&
				resolved !== undefined &&
				floor !== undefined &&
				resolved[0] === declared &&
				compareVersions(current, floor.join('.')) > 0
					? [
							{
								field: 'dependencies',
								message: `${release.name} declares the floor ${release.range}, while the registry serves ${current} within major ${String(declared)}.`,
								blocking: false,
							},
						]
					: []),
				...(declared !== undefined && published !== undefined && declared < published
					? [
							{
								field: 'dependencies',
								message: `${release.name} declares major ${String(declared)}, while the registry serves major ${String(published)}.`,
								blocking: false,
							},
						]
					: []),
			]
		})
		.toArray()
}

/**
 * Projects an audit into the human summary of its outcome.
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
 * Projects a raised value into the machine-readable failure envelope.
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
 * A lone carriage return is folded as a break too, because a terminal repaints
 * the line already printed on one. The fold is a replacement rather than a line
 * split, so no bare `\r` is read as a line terminator here.
 *
 * @example
 * ```ts
 * import { sanitizeLine } from './helpers.js'
 *
 * sanitizeLine('first\nsecond') // 'first second'
 * ```
 */
export function sanitizeLine(line: string): string {
	return stripControls(strip(line)).replace(/\r\n|\r|\n/gu, ' ')
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
	// The keys name a hole too, so a release the answer lacks reads as one with no declaration.
	const pins = Array.from(releases.keys(), (index): Dependency => {
		const release = releases[index]
		const dependency = dependencies[index]
		if (release === undefined || dependency === undefined) {
			throw new ScaffoldError('FETCH', 'The release answer has no matching declaration.')
		}
		if (release.lookup !== 'found') {
			throw new ScaffoldError('FETCH', `The registry named no release for ${release.name}.`)
		}
		return { name: dependency.name, range: `^${release.latest}` }
	})
	if (pins.length !== dependencies.length) {
		throw new ScaffoldError('FETCH', 'The release answer does not match the declaration set.')
	}
	return {
		runtime: pins.slice(0, declared.runtime.length),
		development: pins.slice(declared.runtime.length),
	}
}

/**
 * Scans a shell command for the words and operators it splits into.
 *
 * @param script - The shell command text to split.
 * @returns The words and the `&&`, `||`, `;`, `|`, `&`, `(`, and `)` operators in command order, or
 * `undefined` when a quote is never closed or the command ends in a backslash.
 *
 * @remarks
 * Quotes group a word without hiding it and a backslash outside single quotes escapes the next
 * character, so the word value carries neither. A `$`, a backtick, or a `%` that no backslash
 * escapes and no single quote encloses marks its word unresolved, because a shell expansion
 * decides what the word names. Operators are always resolved.
 *
 * @example
 * ```ts
 * import { scanScriptTokens } from './helpers.js'
 *
 * scanScriptTokens('vitest run --project "src:core"')?.map((token) => token.value)
 * // ['vitest', 'run', '--project', 'src:core']
 * ```
 */
export function scanScriptTokens(script: string): readonly ScriptToken[] | undefined {
	const matches = Array.from(
		script.matchAll(
			/(?<space>\s+)|(?<operator>&&|\|\||[;&|()])|(?<word>(?:[^\s;&|()"'\\]|\\[\s\S]|"(?:\\[\s\S]|[^"\\])*"|'[^']*')+)|[\s\S]/g,
		),
		({ groups }) => groups ?? {},
	)
	// Any character no group takes is a quote that never closes or a backslash that ends the command.
	if (
		matches.some(
			({ space, operator, word }) =>
				space === undefined && operator === undefined && word === undefined,
		)
	) {
		return undefined
	}
	return matches.flatMap(({ space, operator, word }): readonly ScriptToken[] => {
		if (space !== undefined) return []
		if (operator !== undefined) return [{ value: operator, resolved: true }]
		const parts = Array.from(
			(word ?? '').matchAll(/\\([\s\S])|"((?:\\[\s\S]|[^"\\])*)"|'([^']*)'|([\s\S])/g),
			([, escaped, double, single, plain]) => {
				if (escaped !== undefined) return { text: escaped, resolved: true }
				if (single !== undefined) return { text: single, resolved: true }
				if (double !== undefined) {
					return {
						text: double.replaceAll(/\\([\s\S])/g, '$1'),
						resolved: Array.from(double.matchAll(/\\[\s\S]|[$`%]/g)).every((found) =>
							found[0].startsWith('\\'),
						),
					}
				}
				return { text: plain ?? '', resolved: plain === undefined || !'$`%'.includes(plain) }
			},
		)
		return [
			{
				value: parts.map((part) => part.text).join(''),
				resolved: parts.every((part) => part.resolved),
			},
		]
	})
}

/**
 * Reads the literal Vitest projects, configuration paths, and npm run scripts a shell command names.
 *
 * @param script - The manifest script text to read.
 * @param wrappers - Planned wrapper paths mapped to the face projects they run.
 * @returns The named projects, configurations, and scripts, or `undefined` when the command
 * cannot be read literally.
 *
 * @remarks
 * Quotes group a token but do not hide the option, while shell expansions make
 * its value unresolved and therefore refuse the write that asked the question.
 * Configuration paths use `-c <path>`, `--config <path>`, or `--config=<path>`.
 * An unterminated quote, a trailing escape, and an unresolved `--project`, `--config`, or `-c` value
 * all answer `undefined` rather than a partial reading.
 *
 * @example
 * ```ts
 * import { scriptToInvocations } from './helpers.js'
 *
 * scriptToInvocations('vitest run --project src:core')
 * // { projects: ['src:core'], configs: [], scripts: [] }
 * ```
 */
export function scriptToInvocations(
	script: string,
	wrappers: ReadonlyMap<string, string> = new Map(),
): ScriptInvocations | undefined {
	const tokens = scanScriptTokens(script)
	if (tokens === undefined) return undefined
	const configurations = new Map([...wrappers].map(([path, project]) => [normalize(path), project]))
	// Each token that is read leaves one step, and the next token reads from the last step how far
	// the tokens a flag or an npm run took as arguments reach and whether its command runs vitest.
	const steps: ScriptStep[] = []
	for (const [index, token] of tokens.entries()) {
		const previous = steps.at(-1)
		if (previous !== undefined && index <= previous.through) continue
		// A command starts the list or follows a separator, and every later token inherits whether it runs `vitest run`.
		const running =
			index === 0 || ['&&', '||', ';', '|', '&', '('].includes(tokens[index - 1]?.value ?? '')
				? token.resolved && token.value === 'vitest' && tokens[index + 1]?.value === 'run'
				: (previous?.running ?? false)
		if (token.value === 'npm' && tokens[index + 1]?.value === 'run') {
			const name = tokens[index + 2]
			if (
				name === undefined ||
				!name.resolved ||
				name.value.length === 0 ||
				['&&', '||', ';', '|', '&', '(', ')'].includes(name.value)
			)
				return undefined
			steps.push({ projects: [], configs: [], scripts: [name.value], through: index + 2, running })
			continue
		}
		if (token.value === '--project' || token.value === '--config' || token.value === '-c') {
			const project = tokens[index + 1]
			if (
				project === undefined ||
				!project.resolved ||
				project.value.length === 0 ||
				['&&', '||', ';', '|', '&', '(', ')'].includes(project.value)
			)
				return undefined
			const named = token.value === '--project'
			const face = running && !named ? configurations.get(normalize(project.value)) : undefined
			steps.push({
				projects: [...(named ? [project.value] : []), ...(face === undefined ? [] : [face])],
				configs: named ? [] : [project.value],
				scripts: [],
				through: index + 1,
				running,
			})
			continue
		}
		if (token.value.startsWith('--project=') || token.value.startsWith('--config=')) {
			const project = token.value.slice(token.value.indexOf('=') + 1)
			if (!token.resolved || project.length === 0) return undefined
			const named = token.value.startsWith('--project=')
			const face = running && !named ? configurations.get(normalize(project)) : undefined
			steps.push({
				projects: [...(named ? [project] : []), ...(face === undefined ? [] : [face])],
				configs: named ? [] : [project],
				scripts: [],
				through: index,
				running,
			})
			continue
		}
		if (!token.resolved && /--project|--config/.test(token.value)) return undefined
		steps.push({ projects: [], configs: [], scripts: [], through: index, running })
	}
	return {
		projects: steps.flatMap(({ projects }) => projects),
		configs: steps.flatMap(({ configs }) => configs),
		scripts: steps.flatMap(({ scripts }) => scripts),
	}
}

/**
 * Collects the scripts, Vitest projects, and unreadable scripts one gate reaches through `npm run`.
 *
 * @param gate - The script name the walk starts at.
 * @param scripts - The manifest's scripts by name; a value that is not a string names no command.
 * @param wrappers - Planned wrapper paths mapped to the face projects they run.
 * @returns The script names the walk visited, the Vitest projects those scripts name, and the
 * visited scripts whose command cannot be read literally.
 *
 * @remarks
 * The walk is breadth first and reads each script once, so a cycle ends where it closes. A script
 * the manifest does not declare as a string is visited and names nothing. The projects and the
 * unreadable names derive from one log of the reads, never from sets the walk fills.
 *
 * @example
 * ```ts
 * import { collectScriptChain } from './helpers.js'
 *
 * collectScriptChain('test', { test: 'npm run test:src', 'test:src': 'vitest run --project src:core' }, new Map())
 * // { visited: Set { 'test', 'test:src' }, projects: Set { 'src:core' }, unreadable: Set {} }
 * ```
 */
export function collectScriptChain(
	gate: string,
	scripts: Readonly<Record<string, unknown>>,
	wrappers: ReadonlyMap<string, string>,
): ScriptChain {
	const queue = [gate]
	const visited = new Set<string>()
	const reads: Array<{ readonly name: string; readonly invoked: ScriptInvocations | undefined }> =
		[]
	for (const name of queue) {
		if (visited.has(name)) continue
		visited.add(name)
		const script = scripts[name]
		if (!isString(script)) continue
		const invoked = scriptToInvocations(script, wrappers)
		reads.push({ name, invoked })
		for (const called of invoked?.scripts ?? []) {
			if (!visited.has(called)) queue.push(called)
		}
	}
	return {
		visited,
		projects: new Set(reads.flatMap(({ invoked }) => invoked?.projects ?? [])),
		unreadable: new Set(
			reads.flatMap(({ name, invoked }) => (invoked === undefined ? [name] : [])),
		),
	}
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
 * Reads the styles, themes, and showcase markers a target physically holds.
 * @param target - The target directory.
 * @returns The independent structural facts, false when their markers are absent.
 */
export function targetToFacts(target: string): Pick<Blueprint, 'styles' | 'themes' | 'showcase'> {
	const styles = resolveContainedPath(target, STYLES_ENTRY_PATH)
	const themes = resolveContainedPath(target, THEMES_ENTRY_PATH)
	const barrel = resolveContainedPath(target, THEMES_BARREL_PATH)
	const wrapper = resolveContainedPath(target, SHOWCASE_CONFIG_PATH)
	const pages = resolveContainedPath(target, SHOWCASE_PAGES_PATH)
	return {
		styles: styles !== undefined && isExactCaseFile(styles),
		themes:
			themes !== undefined &&
			isExactCaseFile(themes) &&
			barrel !== undefined &&
			isExactCaseFile(barrel),
		showcase:
			(wrapper !== undefined && isExactCaseFile(wrapper)) ||
			(pages !== undefined && isPhysicalDirectory(pages)),
	}
}

/**
 * Reads browser faces and named sheet marker pairs from a target.
 * @param target - The target directory.
 * @returns Browser extensions in framework order followed by sheets in code-unit order.
 * @throws `ScaffoldError` when sheet markers name an invalid or case-colliding face, or the directory cannot be read.
 */
export function targetToExtensions(target: string): readonly Extension[] {
	const browsers = FRAMEWORKS.flatMap((name): readonly Extension[] => {
		const axes = AXES.filter((axis) => {
			const path = resolveContainedPath(target, `${axis}/${name}`)
			return path !== undefined && isPhysicalDirectory(path)
		})
		return axes.length > 0 ? [{ surface: 'browser', name, axes }] : []
	})
	const source = resolveContainedPath(target, 'src')
	if (source === undefined || !isPhysicalDirectory(source)) return browsers
	const entries = readdirSync(source, { withFileTypes: true })
	if (entries.length > MAX_INVENTORY_PATHS)
		throw new ScaffoldError('TARGET', 'The source directory exceeds the inventory limit.')
	const faces = entries.filter((entry) => {
		if (!entry.isDirectory() || RESERVED_SHEET_NAMES.includes(entry.name)) return false
		const sheet = resolveContainedPath(target, `src/${entry.name}/index.scss`)
		const marker = resolveContainedPath(target, `src/${entry.name}/${SHEET_ENTRY_NAME}`)
		return (
			sheet !== undefined &&
			marker !== undefined &&
			isExactCaseFile(sheet) &&
			isExactCaseFile(marker)
		)
	})
	// The first face whose folded name an earlier face already holds is the collision reported.
	const colliding = faces.find(
		(face, index) =>
			faces.findIndex((other) => other.name.toLowerCase() === face.name.toLowerCase()) < index,
	)
	if (colliding !== undefined) {
		throw new ScaffoldError('TARGET', `Case-colliding sheet face '${colliding.name}'.`)
	}
	return [
		...browsers,
		...faces
			.map((face) => face.name)
			.sort()
			.map((name): Extension => {
				if (!isSheetName(name)) throw new ScaffoldError('TARGET', `Invalid sheet face '${name}'.`)
				return { surface: 'styles', name }
			}),
	]
}

/**
 * Reads a creation extension list and assigns its selected browser axes.
 * @param selection - The comma-separated `surface:name` entries, or no selection.
 * @param axes - The axes selecting a browser environment.
 * @param styles - If `true`, admits stylesheet extensions; if `false`, refuses them.
 * @returns The validated extensions in selection order.
 * @throws `UsageError` when an entry is malformed, repeated, unsupported, or lacks its surface.
 */
export function selectionToExtensions(
	selection: string | undefined,
	axes: readonly Axis[],
	styles: boolean,
): readonly Extension[] {
	if (selection === undefined) return []
	return selection.split(',').map((entry, index, entries): Extension => {
		const extension = parseExtension(entry)
		if (extension === undefined || entries.indexOf(entry) < index)
			throw new UsageError(
				`'--extend' refuses '${entry}': use distinct supported surface:name entries.`,
			)
		if (extension.surface === 'browser') {
			if (axes.length === 0)
				throw new UsageError('A browser extension requires browser in --src or --app.')
			return { ...extension, axes }
		}
		if (!styles) throw new UsageError('A styles extension requires --styles.')
		return extension
	})
}

/**
 * Reads the packages a target's catalog table listed before this run.
 *
 * @param target - The target or raw checkout directory, or a verified value host.
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
export function catalogToNames(target: string | Host): readonly string[] {
	const hex = isString(target) ? undefined : target.bytes[CATALOG_AGENT_PATH]
	const text = isString(target)
		? readFileText(target, CATALOG_AGENT_PATH)
		: hex === undefined
			? undefined
			: Buffer.from(hex, 'hex').toString('utf8')
	if (text === undefined) return []
	return createMarkdown(text)
		.filter(isTableNode)
		.flatMap((table) =>
			table.rows.flatMap(([cell]) => {
				const name = cell?.map(flattenText).join('').trim()
				return name !== undefined && DEPENDENCY_NAME_PATTERN.test(name) ? [name] : []
			}),
		)
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
 * @returns One result carrying both path lists, first's paths ahead of second's, each list
 * naming a path once.
 *
 * @remarks
 * Two calls can answer for one path: `overwrite` declares a missing dependency
 * and later rewrites the ranges in the same manifest, so each list keeps a path's
 * first entry. A path one call skipped and another wrote stays in both lists, as
 * the manifest a repair skips by birth and its range write rewrites does.
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
		written: [...new Set([...first.written, ...second.written])],
		skipped: [...new Set([...first.skipped, ...second.skipped])],
		removed: [...new Set([...first.removed, ...second.removed])],
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

/**
 * Splits decoded git output into its complete records and its unfinished tail.
 *
 * @param text - The decoded output, led by the tail the previous chunk left.
 * @returns The non-empty records ended by a NUL, and the text after the last NUL.
 *
 * @example
 * ```ts
 * import { splitGitRecords } from './helpers.js'
 *
 * splitGitRecords('alpha\0\0br') // { records: ['alpha'], pending: 'br' }
 * ```
 */
export function splitGitRecords(text: string): GitChunk {
	const parts = text.split('\0')
	return {
		records: parts.slice(0, -1).filter((record) => record.length > 0),
		pending: parts.at(-1) ?? '',
	}
}

/**
 * Finds the refusal one git output chunk earns.
 *
 * @param target - The repository the query runs in.
 * @param count - The records collected before the chunk.
 * @param chunk - The next split output.
 * @returns The inventory message when the records pass the working-tree inventory limit, else the
 * unfinished-record message when the tail passes the supported path limit, else `undefined`.
 *
 * @example
 * ```ts
 * import { findGitRefusal } from './helpers.js'
 *
 * findGitRefusal('./packages/router', 0, { records: ['package.json'], pending: '' }) // undefined
 * ```
 */
export function findGitRefusal(target: string, count: number, chunk: GitChunk): string | undefined {
	if (count + chunk.records.length > MAX_INVENTORY_PATHS) {
		return `The git query for target at ${target} exceeded the working-tree inventory limit.`
	}
	return chunk.pending.length > MAX_PATH_LENGTH + 3
		? `The git query for target at ${target} returned an unfinished record beyond the supported path limit.`
		: undefined
}
