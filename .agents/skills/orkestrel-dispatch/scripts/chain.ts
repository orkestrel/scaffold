// Run a plan of commands in order and journal each one. Run from the checkout root:
//   node .agents/skills/orkestrel-dispatch/scripts/chain.ts --plan FILE.json --journal DIR
// The plan is a JSON array of steps, each `{ "name": "...", "command": "...", "args": ["..."] }`
// with an optional `"cwd"` (a directory, relative to the working directory) and `"env"` (a record
// of strings laid over this process's environment by case-folded name, so an added variable drops
// every inherited one whose lower-cased name it claims). A step name is letters, digits, dots,
// underscores, and hyphens, opens with a letter or digit, and is unique in the plan. Each step runs
// with no shell and closed stdin, in plan order, with its standard output and standard error
// written together to `DIR/<name>.txt`; the script prints one `name exit=N durationMs=N` line per
// step and stops at the first step that does not exit 0. Because no shell runs, a command that is a
// Windows `.cmd` shim, such as `npm`, starts only through the interpreter it wraps. A step that
// must not stop the chain belongs in a second plan; launch the chain itself through `launch.ts`
// for a cap. The script refuses a flag it does not read, the `--flag=value` form included.
// Exit 0 when every step exited 0, the failing step's exit code when one did not, 2 when a step
// cannot start, 64 on usage.
import { spawnSync } from 'node:child_process'
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, realpathSync } from 'node:fs'
import { join, resolve } from 'node:path'

/** Lists the flags that take a value. */
export const VALUE_FLAGS: readonly string[] = ['--plan', '--journal']

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = VALUE_FLAGS

/** Holds the usage line printed when a call names no plan or no journal. */
export const USAGE = 'usage: chain.ts --plan FILE.json --journal DIR'

/** Matches a step name that is safe as a journal file name. */
export const STEP_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/u

/** Describes one step of a plan. */
export interface Step {
	readonly name: string
	readonly command: string
	readonly args: readonly string[]
	readonly cwd: string | undefined
	readonly env: Readonly<Record<string, string>>
}

/** Describes a plan read from a file: its steps, or every problem that stopped it. */
export interface Plan {
	readonly steps: readonly Step[]
	readonly problems: readonly string[]
}

/** Describes one finished step: how it ended and how long it took. */
export interface Finish {
	readonly exit: number | undefined
	readonly error: string | undefined
	readonly durationMs: number
}

/**
 * Reads the value that follows a flag.
 *
 * @remarks
 * The first occurrence of a flag wins, a following value that opens with `--` is a missing value,
 * and the `--flag=value` form is not read.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--plan`.
 * @returns The value after the flag, or undefined when the flag is absent, last, or followed by
 * another flag.
 */
export function readOption(argv: readonly string[], name: string): string | undefined {
	const index = argv.indexOf(name)
	const value = index === -1 ? undefined : argv[index + 1]
	return value === undefined || value.startsWith('--') ? undefined : value
}

/**
 * Names the value flags a caller gave with no value.
 *
 * @param argv - The arguments after the script path.
 * @param names - The flags that take a value.
 * @returns Each named flag that appears last or is followed by another flag, in argument order.
 */
export function readMissingFlags(
	argv: readonly string[],
	names: readonly string[],
): readonly string[] {
	return names.filter((name) => argv.includes(name) && readOption(argv, name) === undefined)
}

/**
 * Names the flags a caller gave that the script does not read.
 *
 * @remarks
 * A `--flag=value` argument is unknown, because the script reads no such form. A bare `--` ends the
 * scan.
 *
 * @param argv - The arguments after the script path.
 * @param flags - Every flag the script reads, value flags and switches alike.
 * @returns Each argument that opens with `--` and is not a read flag, in argument order.
 */
export function readUnknownFlags(
	argv: readonly string[],
	flags: readonly string[],
): readonly string[] {
	const end = argv.indexOf('--')
	return (end === -1 ? argv : argv.slice(0, end)).filter(
		(argument) => argument.startsWith('--') && !flags.includes(argument),
	)
}

/**
 * Checks whether a value is a non-null, non-array object.
 *
 * @param value - The value to inspect.
 * @returns True if the value is an object other than null or an array; false otherwise.
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Checks whether a value is an array of strings.
 *
 * @param value - The value to inspect.
 * @returns True if the value is an array whose every member is a string; false otherwise.
 */
export function isStringArray(value: unknown): value is readonly string[] {
	return Array.isArray(value) && value.every((member) => typeof member === 'string')
}

/**
 * Checks whether a value is a record whose every member is a string.
 *
 * @param value - The value to inspect.
 * @returns True if the value is a record with only string members; false otherwise.
 */
export function isStringRecord(value: unknown): value is Record<string, string> {
	return isRecord(value) && Object.values(value).every((member) => typeof member === 'string')
}

/**
 * Quotes an untrusted text for a diagnostic, JSON-encoded and cut to a bounded length.
 *
 * @param text - The text to quote.
 * @returns The JSON string literal of the text, ending in an ellipsis inside the quotes when cut.
 */
export function quote(text: string): string {
	return JSON.stringify(text.length > 80 ? `${text.slice(0, 80)}…` : text)
}

/**
 * Lists what is wrong with one plan entry.
 *
 * @param entry - The parsed JSON value at one position of the plan.
 * @param position - The entry's zero-based position, named in each problem.
 * @returns Each problem in the entry, empty when the entry is a step.
 */
export function readStepProblems(entry: unknown, position: number): readonly string[] {
	const where = `step ${String(position + 1)}`
	if (!isRecord(entry)) return [`${where} is not an object`]
	const known = ['name', 'command', 'args', 'cwd', 'env']
	const unexpected = Object.keys(entry).filter((key) => !known.includes(key))
	return [
		...(typeof entry.name === 'string' && STEP_NAME.test(entry.name)
			? []
			: [
					`${where} "name" must be letters, digits, dots, underscores, and hyphens, opening with a letter or digit`,
				]),
		...(typeof entry.command === 'string' && entry.command !== ''
			? []
			: [`${where} "command" must be a non-empty string`]),
		...(isStringArray(entry.args) ? [] : [`${where} "args" must be an array of strings`]),
		...(entry.cwd === undefined || (typeof entry.cwd === 'string' && entry.cwd !== '')
			? []
			: [`${where} "cwd" must be a non-empty string when present`]),
		...(entry.env === undefined || isStringRecord(entry.env)
			? []
			: [`${where} "env" must be a record of strings when present`]),
		...unexpected.map((key) => `${where} carries the unexpected key ${quote(key)}`),
	]
}

/**
 * Reads a plan from its JSON text.
 *
 * @param text - The plan file's text.
 * @returns The steps in order when the plan is valid, and every problem otherwise: not JSON, not an
 * array, empty, a malformed step, or a name used twice.
 */
export function parsePlan(text: string): Plan {
	const parsed = parseJson(text)
	if (!Array.isArray(parsed))
		return { steps: [], problems: ['the plan is not a JSON array of steps'] }
	if (parsed.length === 0) return { steps: [], problems: ['the plan holds no step'] }
	const problems = parsed.flatMap((entry, position) => readStepProblems(entry, position))
	const names = parsed.flatMap((entry) =>
		isRecord(entry) && typeof entry.name === 'string' ? [entry.name] : [],
	)
	const repeated = [...new Set(names.filter((name, index) => names.indexOf(name) !== index))]
	const all = [
		...problems,
		...repeated.map((name) => `the name ${quote(name)} is used by more than one step`),
	]
	if (all.length > 0) return { steps: [], problems: all }
	return { steps: parsed.flatMap((entry) => readStep(entry)), problems: [] }
}

/**
 * Parses a JSON text without throwing.
 *
 * @param text - The text to parse.
 * @returns The parsed value, or undefined when the text is not JSON.
 */
export function parseJson(text: string): unknown {
	try {
		return JSON.parse(text)
	} catch {
		return undefined
	}
}

/**
 * Reads a validated plan entry as a step.
 *
 * @param entry - A plan entry that `readStepProblems` found no problem in.
 * @returns The step as a one-member list, or an empty list when the entry is not a valid step.
 */
export function readStep(entry: unknown): readonly Step[] {
	if (!isRecord(entry)) return []
	const { name, command, args, cwd, env } = entry
	if (typeof name !== 'string' || typeof command !== 'string' || !isStringArray(args)) return []
	return [
		{
			name,
			command,
			args,
			cwd: typeof cwd === 'string' ? cwd : undefined,
			env: isStringRecord(env) ? env : {},
		},
	]
}

/**
 * Lays added variables over an inherited environment by case-folded name.
 *
 * @remarks
 * A Windows environment block folds names by case, so an inherited `NPM_CONFIG_CACHE` would
 * outrank an added `npm_config_cache`; every inherited variable whose lower-cased name an added
 * variable claims is dropped first.
 *
 * @param inherited - The environment the child would inherit.
 * @param added - The variables the step sets.
 * @returns The inherited variables no added name claims, followed by the added variables.
 */
export function mergeEnv(
	inherited: Readonly<Record<string, string | undefined>>,
	added: Readonly<Record<string, string>>,
): Record<string, string | undefined> {
	const claimed = new Set(Object.keys(added).map((name) => name.toLowerCase()))
	return {
		...Object.fromEntries(
			Object.entries(inherited).filter(([name]) => !claimed.has(name.toLowerCase())),
		),
		...added,
	}
}

/**
 * Runs one step with no shell, its output and errors written together to a file.
 *
 * @param step - The step to run.
 * @param output - The file that receives the step's standard output and standard error.
 * @returns The exit code, or undefined with the reason when the command cannot start or a signal
 * ended it; and the duration.
 */
export function runStep(step: Step, output: string): Finish {
	const started = Date.now()
	const descriptor = openSync(output, 'w')
	try {
		const result = spawnSync(step.command, step.args, {
			cwd: step.cwd === undefined ? undefined : resolve(step.cwd),
			env: mergeEnv(process.env, step.env),
			stdio: ['ignore', descriptor, descriptor],
			windowsHide: true,
			shell: false,
		})
		const error =
			result.error?.message ?? (result.signal === null ? undefined : `ended by ${result.signal}`)
		return {
			exit: error === undefined ? (result.status ?? undefined) : undefined,
			error,
			durationMs: Date.now() - started,
		}
	} finally {
		closeSync(descriptor)
	}
}

/**
 * Formats the line printed for a finished step.
 *
 * @param step - The step.
 * @param finish - How the step ended.
 * @returns `name exit=N durationMs=N`, with `exit=none` and the reason when it never exited.
 */
export function formatStep(step: Step, finish: Finish): string {
	const exit = finish.exit === undefined ? 'none' : String(finish.exit)
	const reason = finish.error === undefined ? '' : ` error=${quote(finish.error)}`
	return `${step.name} exit=${exit} durationMs=${String(finish.durationMs)}${reason}`
}

/**
 * Runs the script on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 when every step exited 0, the failing step's exit code, 2 when a step
 * cannot start, 64 on usage.
 */
export function main(argv: readonly string[]): number {
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(`chain: ${unknown.join(', ')} is not a flag this script reads; ${USAGE}`)
		return 64
	}
	const missing = readMissingFlags(argv, VALUE_FLAGS)
	if (missing.length > 0) {
		console.error(`chain: ${missing.join(', ')} given with no value`)
		return 64
	}
	const path = readOption(argv, '--plan')
	const journal = readOption(argv, '--journal')
	if (path === undefined || journal === undefined || !existsSync(path)) {
		console.error(USAGE)
		return 64
	}
	const plan = parsePlan(readFileSync(path, 'utf8'))
	if (plan.problems.length > 0) {
		console.error(`chain: ${quote(path)} is not a valid plan: ${plan.problems.join('; ')}`)
		return 64
	}
	mkdirSync(journal, { recursive: true })
	for (const step of plan.steps) {
		const finish = runStep(step, join(journal, `${step.name}.txt`))
		console.log(formatStep(step, finish))
		if (finish.exit === undefined) return 2
		if (finish.exit !== 0) return finish.exit
	}
	return 0
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
