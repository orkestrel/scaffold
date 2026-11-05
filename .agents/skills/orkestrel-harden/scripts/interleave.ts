// Compare two commands sample by sample under one host load. Run from the checkout root:
//   node .agents/skills/orkestrel-harden/scripts/interleave.ts --plan FILE.json --rounds N [--json] [--out FILE.json|FILE.txt]
// The plan is a JSON object `{ "baseline": SIDE, "candidate": SIDE }`, each side
// `{ "command": "...", "args": ["..."] }` with an optional `"cwd"` (a directory, relative to the
// working directory) and `"env"` (a record of strings laid over this process's environment by
// case-folded name). Identical sides are a supported A/A comparison, which calibrates the run.
// `N` is an even whole number of at least 2. `baseline` runs first in each odd round and `candidate`
// in each even round; an odd count is refused because the side with the extra lead puts its leading
// readings at the median, and that order cost reads as a difference between the sides.
// Each sample is a fresh process with no shell and closed stdin. The reading is the number the
// child prints as its last non-empty standard output line, a finite non-negative decimal with an
// optional fraction and exponent. The script reads no clock, so the child's marked region alone
// decides what a reading covers, and process start stays out of it unless that region includes it.
// A sample that cannot start, ends by a signal, exits nonzero, or prints no reading fails the run:
// the script names the side and the round on stderr, runs no further sample, and prints no report,
// so a statistic never omits a failed sample.
// The report carries each side's samples in round order, its median, its deviation (the median
// absolute deviation, which stays on the median's scale and moves little under one load spike, where
// a standard deviation or a range follows the spike), its minimum and maximum, then `difference`
// (candidate median minus baseline median) and `relative` (`difference` over the baseline median,
// absent when that median is 0). It rules nothing: it carries no bar and no verdict.
// Print text by default or one JSON line with `--json`; `--out` writes `.json` or `.txt`
// independently. Launch the script through `launch.ts` from the dispatch skill for a cap. The script
// refuses a flag it does not read, the `--flag=value` form included, and every positional argument.
// Exit 0 when every sample read, 2 when a sample failed or `--out` could not be written, 64 on usage.
import { spawnSync } from 'node:child_process'
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { dirname, extname, resolve } from 'node:path'

/** Lists the flags that take a value. */
export const VALUE_FLAGS: readonly string[] = ['--plan', '--rounds', '--out']

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = [...VALUE_FLAGS, '--json']

/** Holds the usage line printed when a call names no plan or no round count. */
export const USAGE =
	'usage: interleave.ts --plan FILE.json --rounds N [--json] [--out FILE.json|FILE.txt]'

/** Caps the characters of an untrusted text a diagnostic echoes. */
export const QUOTE_LIMIT = 200

/** Holds the significant digits a text report gives a computed statistic. */
export const REPORT_PRECISION = 6

/** Matches a reading: a non-negative decimal with an optional fraction and exponent. */
export const READING = /^\d+(?:\.\d+)?(?:[eE][-+]?\d+)?$/u

/** Matches a whole number with no sign, exponent, or leading zero. */
export const WHOLE = /^[1-9]\d*$/u

/** Names the two sides of a comparison. */
export type SideName = 'baseline' | 'candidate'

/** Describes one side's command, the shape of a `chain.ts` step without its name. */
export interface Side {
	readonly command: string
	readonly args: readonly string[]
	readonly cwd: string | undefined
	readonly env: Readonly<Record<string, string>>
}

/** Maps each side's name to its command. */
export type Sides = Readonly<Record<SideName, Side>>

/** Describes a plan read from a file: its sides, or every problem that stopped it. */
export interface Plan {
	readonly sides: Sides | undefined
	readonly problems: readonly string[]
}

/** Names one sample's place in a run. */
export interface Slot {
	readonly round: number
	readonly side: SideName
}

/** Describes one sample that read. */
export interface Reading extends Slot {
	readonly reading: number
}

/** Describes the sample that stopped a run. */
export interface Failure extends Slot {
	readonly problem: string
}

/** Describes how one sample ended: its reading, or why it has none. */
export type SampleResult =
	| { readonly success: true; readonly value: number }
	| { readonly success: false; readonly error: string }

/** Describes a run: the samples in the order they ran, and the failure that stopped it, if any. */
export interface Run {
	readonly readings: readonly Reading[]
	readonly failure: Failure | undefined
}

/** Describes one side's samples and the statistics read from them. */
export interface Summary {
	readonly samples: readonly number[]
	readonly median: number
	readonly deviation: number
	readonly minimum: number
	readonly maximum: number
}

/** Describes a finished comparison. */
export interface Report {
	readonly rounds: number
	readonly baseline: Summary
	readonly candidate: Summary
	readonly difference: number
	readonly relative: number | undefined
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
 * Reads the arguments the script has no place for: a positional, or a bare `--`, which would open a
 * command this script does not pass on.
 *
 * @param argv - The arguments after the script path.
 * @param valueFlags - The flags that take a value.
 * @returns Each such argument in order.
 */
export function readStrayArguments(
	argv: readonly string[],
	valueFlags: readonly string[],
): readonly string[] {
	return argv.filter(
		(argument, index) =>
			(argument === '--' || !argument.startsWith('--')) &&
			!valueFlags.includes(argv[index - 1] ?? ''),
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
	return JSON.stringify(text.length > QUOTE_LIMIT ? `${text.slice(0, QUOTE_LIMIT)}…` : text)
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
 * Lists what is wrong with one side of a plan.
 *
 * @param entry - The parsed JSON value under the side's key.
 * @param name - The side's name, named in each problem.
 * @returns Each problem in the entry, empty when the entry is a side.
 */
export function readSideProblems(entry: unknown, name: SideName): readonly string[] {
	if (entry === undefined) return [`the plan holds no "${name}" side`]
	if (!isRecord(entry)) return [`${name} is not an object`]
	const known = ['command', 'args', 'cwd', 'env']
	const unexpected = Object.keys(entry).filter((key) => !known.includes(key))
	return [
		...(typeof entry.command === 'string' && entry.command !== ''
			? []
			: [`${name} "command" must be a non-empty string`]),
		...(isStringArray(entry.args) ? [] : [`${name} "args" must be an array of strings`]),
		...(entry.cwd === undefined || (typeof entry.cwd === 'string' && entry.cwd !== '')
			? []
			: [`${name} "cwd" must be a non-empty string when present`]),
		...(entry.env === undefined || isStringRecord(entry.env)
			? []
			: [`${name} "env" must be a record of strings when present`]),
		...unexpected.map((key) => `${name} carries the unexpected key ${quote(key)}`),
	]
}

/**
 * Reads a validated plan entry as a side.
 *
 * @param entry - A plan entry that `readSideProblems` found no problem in.
 * @returns The side, or undefined when the entry is not a valid side.
 */
export function readSide(entry: unknown): Side | undefined {
	if (!isRecord(entry)) return undefined
	const { command, args, cwd, env } = entry
	if (typeof command !== 'string' || !isStringArray(args)) return undefined
	return {
		command,
		args,
		cwd: typeof cwd === 'string' ? cwd : undefined,
		env: isStringRecord(env) ? env : {},
	}
}

/**
 * Reads a plan from its JSON text.
 *
 * @param text - The plan file's text.
 * @returns The sides when the plan is valid, and every problem otherwise: not a JSON object, an
 * unexpected key, a missing side, or a malformed side.
 */
export function parsePlan(text: string): Plan {
	const parsed = parseJson(text)
	if (!isRecord(parsed))
		return {
			sides: undefined,
			problems: ['the plan is not a JSON object with "baseline" and "candidate" sides'],
		}
	const problems = [
		...Object.keys(parsed)
			.filter((key) => key !== 'baseline' && key !== 'candidate')
			.map((key) => `the plan carries the unexpected key ${quote(key)}`),
		...readSideProblems(parsed.baseline, 'baseline'),
		...readSideProblems(parsed.candidate, 'candidate'),
	]
	const baseline = readSide(parsed.baseline)
	const candidate = readSide(parsed.candidate)
	return problems.length > 0 || baseline === undefined || candidate === undefined
		? { sides: undefined, problems }
		: { sides: { baseline, candidate }, problems: [] }
}

/**
 * Reads a plan file's text without throwing.
 *
 * @param path - The plan file.
 * @returns The file's text, or undefined when it cannot be read.
 */
export function readPlanText(path: string): string | undefined {
	try {
		return readFileSync(path, 'utf8')
	} catch {
		return undefined
	}
}

/**
 * Parses a round count.
 *
 * @param text - The value of `--rounds`.
 * @returns The count when the text is an even whole number of at least 2, and a safe integer;
 * undefined otherwise.
 */
export function parseRounds(text: string): number | undefined {
	const rounds = WHOLE.test(text) ? Number(text) : undefined
	return rounds !== undefined && Number.isSafeInteger(rounds) && rounds % 2 === 0
		? rounds
		: undefined
}

/**
 * Reads the last non-empty line of a child's standard output.
 *
 * @param output - The child's standard output.
 * @returns The line with its surrounding whitespace trimmed, or an empty string when no line holds
 * text.
 */
export function readLastLine(output: string): string {
	return (
		output
			.split(/\r\n|\n/u)
			.map((line) => line.trim())
			.findLast((line) => line !== '') ?? ''
	)
}

/**
 * Parses one line as a reading.
 *
 * @param line - The line the child printed.
 * @returns The finite non-negative number the whole line spells, or undefined otherwise.
 */
export function parseReading(line: string): number | undefined {
	const reading = READING.test(line) ? Number(line) : undefined
	return reading !== undefined && Number.isFinite(reading) ? reading : undefined
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
 * @param added - The variables the side sets.
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
 * Computes the order a run takes its samples in.
 *
 * @param rounds - The round count.
 * @returns One slot per side per round, numbered from 1, with `baseline` first in each odd round and
 * `candidate` first in each even round.
 */
export function computeSchedule(rounds: number): readonly Slot[] {
	return Array.from({ length: rounds }, (_, index) => index + 1).flatMap((round) => {
		const order: readonly SideName[] =
			round % 2 === 1 ? ['baseline', 'candidate'] : ['candidate', 'baseline']
		return order.map((side) => ({ round, side }))
	})
}

/**
 * Runs one sample in a fresh process with no shell and closed stdin.
 *
 * @param side - The side's command.
 * @returns The reading, or the reason the sample has none.
 */
export function runSample(side: Side): SampleResult {
	const result = spawnSync(side.command, side.args, {
		cwd: side.cwd === undefined ? undefined : resolve(side.cwd),
		env: mergeEnv(process.env, side.env),
		stdio: ['ignore', 'pipe', 'pipe'],
		encoding: 'utf8',
		windowsHide: true,
		shell: false,
	})
	if (result.error !== undefined)
		return { success: false, error: `did not finish: ${quote(result.error.message)}` }
	if (result.signal !== null) return { success: false, error: `ended by ${result.signal}` }
	if (result.status !== 0)
		return {
			success: false,
			error: `exited ${String(result.status)}: ${quote(result.stderr.trim())}`,
		}
	const line = readLastLine(result.stdout)
	const reading = parseReading(line)
	return reading === undefined
		? { success: false, error: `printed no reading, its last line is ${quote(line)}` }
		: { success: true, value: reading }
}

/**
 * Runs a schedule in order and stops at the first sample that fails.
 *
 * @param sides - The commands.
 * @param schedule - The samples to take.
 * @returns The readings in the order they ran, and the failure when a sample failed.
 */
export function runSchedule(sides: Sides, schedule: readonly Slot[]): Run {
	const readings: Reading[] = []
	for (const slot of schedule) {
		const sample = runSample(sides[slot.side])
		if (!sample.success) return { readings, failure: { ...slot, problem: sample.error } }
		readings.push({ ...slot, reading: sample.value })
	}
	return { readings, failure: undefined }
}

/**
 * Computes the median of a list of numbers.
 *
 * @param values - The numbers, in any order.
 * @returns The middle value, or the mean of the two middle values for an even count.
 * @throws Thrown when the list is empty.
 */
export function computeMedian(values: readonly number[]): number {
	if (values.length === 0) throw new Error('interleave: a median needs at least one number')
	const sorted = [...values].sort((left, right) => left - right)
	const middle = sorted.slice(
		Math.floor((sorted.length - 1) / 2),
		Math.floor(sorted.length / 2) + 1,
	)
	return middle.reduce((sum, value) => sum + value, 0) / middle.length
}

/**
 * Computes the median absolute deviation of a list of numbers.
 *
 * @param values - The numbers, in any order.
 * @returns The median distance of each number from the list's median.
 * @throws Thrown when the list is empty.
 */
export function computeDeviation(values: readonly number[]): number {
	const median = computeMedian(values)
	return computeMedian(values.map((value) => Math.abs(value - median)))
}

/**
 * Computes one side's statistics.
 *
 * @param samples - The side's samples in round order.
 * @returns The samples with their median, deviation, minimum, and maximum.
 * @throws Thrown when the list is empty.
 */
export function computeSummary(samples: readonly number[]): Summary {
	return {
		samples,
		median: computeMedian(samples),
		deviation: computeDeviation(samples),
		minimum: Math.min(...samples),
		maximum: Math.max(...samples),
	}
}

/**
 * Computes the report of a finished run.
 *
 * @param readings - Every reading of a run that no sample failed.
 * @returns Each side's summary, the candidate median minus the baseline median, and that difference
 * over the baseline median, undefined when that median is 0.
 * @throws Thrown when a side has no reading.
 */
export function computeReport(readings: readonly Reading[]): Report {
	const baseline = computeSummary(
		readings.filter((entry) => entry.side === 'baseline').map((entry) => entry.reading),
	)
	const candidate = computeSummary(
		readings.filter((entry) => entry.side === 'candidate').map((entry) => entry.reading),
	)
	const difference = candidate.median - baseline.median
	return {
		rounds: baseline.samples.length,
		baseline,
		candidate,
		difference,
		relative: baseline.median === 0 ? undefined : difference / baseline.median,
	}
}

/**
 * Renders a computed statistic to the report's precision.
 *
 * @param value - The statistic.
 * @returns The number at `REPORT_PRECISION` significant digits, with no trailing zero.
 */
export function renderNumber(value: number): string {
	return String(Number(value.toPrecision(REPORT_PRECISION)))
}

/**
 * Renders one side's line of the text report.
 *
 * @param name - The side's name.
 * @param summary - The side's statistics.
 * @returns The line, with the samples as they were read.
 */
export function renderSummary(name: SideName, summary: Summary): string {
	return [
		name,
		`median=${renderNumber(summary.median)}`,
		`deviation=${renderNumber(summary.deviation)}`,
		`minimum=${renderNumber(summary.minimum)}`,
		`maximum=${renderNumber(summary.maximum)}`,
		`samples=${summary.samples.map(String).join(',')}`,
	].join(' ')
}

/**
 * Renders the text report.
 *
 * @param report - The finished comparison.
 * @returns A rounds line, one line per side, and a line with the difference and the relative change
 * in percent, `none` when the baseline median is 0.
 */
export function renderReport(report: Report): string {
	const relative =
		report.relative === undefined ? 'none' : `${renderNumber(report.relative * 100)}%`
	return [
		`rounds=${String(report.rounds)}`,
		renderSummary('baseline', report.baseline),
		renderSummary('candidate', report.candidate),
		`difference=${renderNumber(report.difference)} relative=${relative}`,
	].join('\n')
}

/**
 * Writes a report form to a file, creating its parent directories, without throwing.
 *
 * @param path - The output file.
 * @param text - The report form.
 * @returns The reason the file could not be written, or undefined when it was.
 */
export function writeOutput(path: string, text: string): string | undefined {
	try {
		const target = resolve(path)
		mkdirSync(dirname(target), { recursive: true })
		writeFileSync(target, `${text}\n`)
		return undefined
	} catch (error) {
		return error instanceof Error ? error.message : String(error)
	}
}

/**
 * Runs the script on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 when every sample read, 2 when a sample failed or `--out` could not be
 * written, 64 on usage.
 */
export function main(argv: readonly string[]): number {
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(`interleave: ${unknown.join(', ')} is not a flag this script reads; ${USAGE}`)
		return 64
	}
	const missing = readMissingFlags(argv, VALUE_FLAGS)
	if (missing.length > 0) {
		console.error(`interleave: ${missing.join(', ')} given with no value`)
		return 64
	}
	const stray = readStrayArguments(argv, VALUE_FLAGS)
	if (stray.length > 0) {
		console.error(`interleave: ${stray.map(quote).join(', ')} is not an argument; ${USAGE}`)
		return 64
	}
	const path = readOption(argv, '--plan')
	const count = readOption(argv, '--rounds')
	const out = readOption(argv, '--out')
	if (path === undefined || count === undefined) {
		console.error(USAGE)
		return 64
	}
	if (out !== undefined && !['.json', '.txt'].includes(extname(out))) {
		console.error(`interleave: --out takes a .json or .txt file, got ${quote(out)}`)
		return 64
	}
	const rounds = parseRounds(count)
	if (rounds === undefined) {
		console.error(
			`interleave: --rounds takes an even whole number of at least 2, got ${quote(count)}`,
		)
		return 64
	}
	const text = readPlanText(path)
	if (text === undefined) {
		console.error(`interleave: the plan ${quote(path)} cannot be read`)
		return 64
	}
	const plan = parsePlan(text)
	if (plan.sides === undefined) {
		console.error(`interleave: ${quote(path)} is not a valid plan: ${plan.problems.join('; ')}`)
		return 64
	}
	const run = runSchedule(plan.sides, computeSchedule(rounds))
	if (run.failure !== undefined) {
		const { side, round, problem } = run.failure
		console.error(`interleave: ${side} round ${String(round)}: ${problem}`)
		return 2
	}
	const report = computeReport(run.readings)
	const json = JSON.stringify(report)
	const rendered = renderReport(report)
	console.log(argv.includes('--json') ? json : rendered)
	const refusal =
		out === undefined ? undefined : writeOutput(out, extname(out) === '.json' ? json : rendered)
	if (refusal !== undefined) {
		console.error(`interleave: --out could not be written: ${quote(refusal)}`)
		return 2
	}
	return 0
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
