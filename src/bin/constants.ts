import type { ParseArgsOptionsConfig } from 'node:util'
import type { Verb } from './types.js'

/**
 * The name the executable installs as.
 *
 * @remarks
 * `package.json`'s `bin` field is the authority for what the command is called;
 * this is the same word, so every usage line the executable prints is a command
 * a reader can paste back.
 */
export const EXECUTABLE_NAME = 'scaffold'

/**
 * The five {@link Verb} values in usage order, frozen.
 *
 * @remarks
 * The order the type declares them in, which is also the order usage lists them:
 * the verb that creates a workspace, then the one that only reads it, then the
 * three that write to one that already exists, widest last.
 */
export const VERBS: readonly Verb[] = Object.freeze([
	'new',
	'audit',
	'repair',
	'catalog',
	'overwrite',
])

/** The exit code reporting that the target matched its plan and every step completed. */
export const EXIT_CLEAN = 0

/** The exit code reporting that the target drifted, or that a step failed. */
export const EXIT_DRIFT = 1

/** The exit code reporting that the command line was not a command. */
export const EXIT_USAGE = 2

/**
 * What each exit code means, frozen.
 *
 * @remarks
 * Keyed by the three code constants rather than by literals, so the usage block
 * cannot document a code the executable does not return.
 */
export const EXIT_SUMMARY: Readonly<Record<number, string>> = Object.freeze({
	[EXIT_CLEAN]: 'clean',
	[EXIT_DRIFT]: 'drift or failure',
	[EXIT_USAGE]: 'usage error',
})

/**
 * The machine-readable code a malformed command line reports.
 *
 * @remarks
 * The executable contributes its own codes to the failure envelope, which is why
 * that envelope's `code` is a plain string rather than a `ScaffoldErrorCode`: a
 * command line that never became a command failed before any coded package
 * operation could.
 */
export const USAGE_CODE = 'USAGE'

/** The machine-readable code a failure carrying no code of its own reports. */
export const FAILED_CODE = 'FAILED'

/** What the failure envelope says when the raised value carried no message. */
export const FAILED_MESSAGE = 'The command failed for an unrecognized reason'

/**
 * The positional argument `new` alone takes, as usage writes it.
 *
 * @remarks
 * The workspace name is the only positional argument any verb takes, so it is
 * one value rather than a per-verb table with four holes in it.
 */
export const NAME_ARGUMENT = '<name>'

/**
 * Every option the executable accepts, as `node:util` parses them, frozen.
 *
 * @remarks
 * One table for every verb rather than one per verb, because the verb an option
 * belongs to is a domain fact the command union already fixes: parsing decides
 * only whether the word is an option at all, and {@link VERB_OPTIONS} decides
 * whether this verb takes it. No option declares a default, so the parsed keys
 * are exactly the options the caller supplied, which is what makes an option
 * offered to the wrong verb visible rather than silently absorbed. `from`
 * collects repeats because `catalog` may draw on more than one local source; a
 * verb that takes it once refuses the second.
 */
export const COMMAND_OPTIONS: ParseArgsOptionsConfig = Object.freeze({
	src: Object.freeze({ type: 'string' }),
	app: Object.freeze({ type: 'string' }),
	bin: Object.freeze({ type: 'boolean' }),
	deps: Object.freeze({ type: 'string' }),
	groups: Object.freeze({ type: 'string' }),
	all: Object.freeze({ type: 'boolean' }),
	dirty: Object.freeze({ type: 'boolean' }),
	from: Object.freeze({ type: 'string', multiple: true }),
	target: Object.freeze({ type: 'string' }),
	json: Object.freeze({ type: 'boolean' }),
})

/**
 * What each option does, keyed by the token usage prints, frozen.
 *
 * @remarks
 * The key order is the glossary order. A key is the whole displayed token,
 * value placeholder included, because that token is what a reader copies and
 * what {@link VERB_OPTIONS} lists.
 */
export const OPTION_SUMMARY: Readonly<Record<string, string>> = Object.freeze({
	'--src <list>': 'the published library environments to build: core, browser, server',
	'--app <list>': 'the private application environments to build: core, browser, server',
	'--bin': 'scaffold a command-line executable at src/bin/main.ts',
	'--deps <list>': 'the @orkestrel/* packages the workspace depends on',
	'--groups <list>': 'the artifact groups to cover; every group when absent',
	'--all': 'fetch a guide for every package the organization publishes, not just the declared ones',
	'--dirty': 'delete from a tree carrying uncommitted changes',
	'--from <path>':
		'read the data root from a local path instead of the bundled one; catalog alone accepts it more than once',
	'--target <path>': 'the directory the verb operates on; the working directory when absent',
	'--json': 'emit one machine-readable value instead of a report',
})

/**
 * The options each verb takes, in usage order, frozen.
 *
 * @remarks
 * The executable's half of the frozen command union: every option a branch
 * declares is listed against its verb, and every option a branch excludes is
 * absent from it. An option a verb does not list is refused by name rather than
 * parsed and ignored.
 */
export const VERB_OPTIONS: Readonly<Record<Verb, readonly string[]>> = Object.freeze({
	new: Object.freeze([
		'--src <list>',
		'--app <list>',
		'--bin',
		'--deps <list>',
		'--from <path>',
		'--target <path>',
		'--json',
	]),
	audit: Object.freeze(['--groups <list>', '--from <path>', '--target <path>', '--json']),
	repair: Object.freeze(['--groups <list>', '--from <path>', '--target <path>', '--json']),
	catalog: Object.freeze(['--all', '--from <path>', '--target <path>', '--json']),
	overwrite: Object.freeze([
		'--groups <list>',
		'--dirty',
		'--from <path>',
		'--target <path>',
		'--json',
	]),
})

/**
 * What each verb does, in one line, frozen.
 *
 * @remarks
 * Each line names what the verb writes, because authority is the verb's: a
 * reader deciding which one to run is deciding what they are authorizing.
 */
export const VERB_SUMMARY: Readonly<Record<Verb, string>> = Object.freeze({
	new: 'scaffold a workspace',
	audit: 'report how the target compares to its plan, writing nothing',
	repair: 'write each planned path the target is missing or has let drift',
	catalog: 'regenerate the package table and refresh the guide mirrors',
	overwrite:
		'do everything repair and catalog do, then delete what the plan does not own and re-declare the dependency ranges',
})
