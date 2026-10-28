// Check a Vitest JSON report against named red and green cases. Run from the checkout root:
//   node .agents/skills/orkestrel-parallel/scripts/cases.ts --report FILE.json [--passed NAME ...] [--failed NAME ...]
// The report is Vitest's `--reporter=json` output. A name matches every case whose full name (its
// `describe` titles and its own title, joined by spaces) or whose own title equals it exactly; a name
// that opens with `--` cannot be given. Each `--passed NAME` requires every case it matches to have
// passed and each `--failed NAME` requires every one to have failed; a name that matches no case is
// missing. A failed case that no name matches is refused, so a run that fails more than the request
// expected reads as a difference. Name no case to require a report with no failure. Both flags repeat
// and a name may not be given to both. The script prints one summary line, one line per difference,
// and `ok` or `differences=N`. The script refuses a flag it does not read, the `--flag=value` form
// included. Exit 0 when the report matches the names, 3 when it does not, 2 when the report cannot
// be read as a Vitest report, 64 on usage.
import { existsSync, readFileSync, realpathSync, statSync } from 'node:fs'
import { relative } from 'node:path'

/** Lists the flags that take a value. */
export const VALUE_FLAGS: readonly string[] = ['--report', '--passed', '--failed']

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = VALUE_FLAGS

/** Holds the usage line printed when a call names no report. */
export const USAGE =
	'usage: cases.ts --report FILE.json [--passed NAME ...] [--failed NAME ...]; --passed and --failed repeat'

/** Describes one test case a report holds. */
export interface Case {
	readonly file: string
	readonly fullName: string
	readonly title: string
	readonly status: string
}

/**
 * Names the value flags a caller gave with no value, at any occurrence.
 *
 * @param argv - The arguments after the script path.
 * @param names - The flags that take a value.
 * @returns Each named flag that appears last or is followed by another flag, in argument order.
 */
export function readMissingFlags(
	argv: readonly string[],
	names: readonly string[],
): readonly string[] {
	return names.filter((name) =>
		argv.some((argument, index) => argument === name && isMissingValue(argv, index)),
	)
}

/**
 * Checks whether the argument after a flag is absent or is another flag.
 *
 * @param argv - The arguments after the script path.
 * @param index - The position of the flag.
 * @returns True when no value follows the flag; false otherwise.
 */
export function isMissingValue(argv: readonly string[], index: number): boolean {
	const value = argv[index + 1]
	return value === undefined || value.startsWith('--')
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
 * Reads every value that follows a repeatable flag.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--passed`.
 * @returns The values in order, empty when the flag never appears.
 */
export function readOptions(argv: readonly string[], name: string): readonly string[] {
	return argv.flatMap((argument, index) => {
		const value = argv[index + 1]
		return argument === name && value !== undefined && !value.startsWith('--') ? [value] : []
	})
}

/**
 * Reads the arguments that are neither a flag nor the value of a value flag.
 *
 * @param argv - The arguments after the script path.
 * @param valueFlags - The flags that take a value.
 * @returns The positional arguments in order.
 */
export function readPositionals(
	argv: readonly string[],
	valueFlags: readonly string[],
): readonly string[] {
	return argv.filter(
		(argument, index) => !argument.startsWith('--') && !valueFlags.includes(argv[index - 1] ?? ''),
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
 * Quotes an untrusted text for a diagnostic, JSON-encoded and cut to a bounded length.
 *
 * @param text - The text to quote.
 * @returns The JSON string literal of the text, ending in an ellipsis inside the quotes when cut.
 */
export function quote(text: string): string {
	return JSON.stringify(text.length > 120 ? `${text.slice(0, 120)}…` : text)
}

/**
 * Reads one assertion result of a report as a case.
 *
 * @param file - The test file the result belongs to.
 * @param result - The parsed JSON value of one assertion result.
 * @returns The case as a one-member list, or an empty list when the result lacks a title or status.
 */
export function readCase(file: string, result: unknown): readonly Case[] {
	if (!isRecord(result)) return []
	const { title, status, fullName, ancestorTitles } = result
	if (typeof title !== 'string' || typeof status !== 'string') return []
	const ancestors = Array.isArray(ancestorTitles)
		? ancestorTitles.filter((member) => typeof member === 'string')
		: []
	return [
		{
			file,
			title,
			status,
			fullName: typeof fullName === 'string' ? fullName : [...ancestors, title].join(' '),
		},
	]
}

/**
 * Reads the cases of a Vitest JSON report.
 *
 * @param report - The parsed JSON value of the report.
 * @returns Every case in file order, or undefined when the value is not a Vitest report: an object
 * whose `testResults` is an array.
 */
export function readCases(report: unknown): readonly Case[] | undefined {
	if (!isRecord(report) || !Array.isArray(report.testResults)) return undefined
	return report.testResults.flatMap((suite): readonly Case[] => {
		if (!isRecord(suite) || !Array.isArray(suite.assertionResults)) return []
		const file = typeof suite.name === 'string' ? suite.name : ''
		return suite.assertionResults.flatMap((result) => readCase(file, result))
	})
}

/**
 * Checks whether a name matches a case.
 *
 * @param entry - The case.
 * @param name - The name from `--passed` or `--failed`.
 * @returns True when the name equals the case's full name or its own title; false otherwise.
 */
export function matchesCase(entry: Case, name: string): boolean {
	return entry.fullName === name || entry.title === name
}

/**
 * Judges the cases of a report against the names a caller gave.
 *
 * @param cases - The report's cases.
 * @param passed - The names that must have passed.
 * @param failed - The names that must have failed.
 * @param base - The directory the file names in each difference are written relative to.
 * @returns Each difference in order: missing names, wrong statuses, then failed cases no name
 * matches; empty when the report matches.
 */
export function judgeCases(
	cases: readonly Case[],
	passed: readonly string[],
	failed: readonly string[],
	base: string,
): readonly string[] {
	const expectations = [
		...passed.map((name) => ({ name, status: 'passed' })),
		...failed.map((name) => ({ name, status: 'failed' })),
	]
	const named = expectations.flatMap((expectation) => {
		const matches = cases.filter((entry) => matchesCase(entry, expectation.name))
		if (matches.length === 0) return [`missing: ${quote(expectation.name)} matches no case`]
		return matches
			.filter((entry) => entry.status !== expectation.status)
			.map(
				(entry) =>
					`status: ${quote(entry.fullName)} is ${entry.status}, expected ${expectation.status}${describeFile(base, entry.file)}`,
			)
	})
	const unnamed = cases
		.filter(
			(entry) =>
				entry.status === 'failed' &&
				!expectations.some((expectation) => matchesCase(entry, expectation.name)),
		)
		.map((entry) => `unnamed failure: ${quote(entry.fullName)}${describeFile(base, entry.file)}`)
	return [...named, ...unnamed]
}

/**
 * Describes the file a case belongs to, written relative to a directory.
 *
 * @param base - The directory the path is written relative to.
 * @param file - The test file path from the report.
 * @returns ` in <path>` with forward slashes, or an empty text when the report names no file.
 */
export function describeFile(base: string, file: string): string {
	return file === '' ? '' : ` in ${relative(base, file).split('\\').join('/')}`
}

/**
 * Counts the cases that carry a status.
 *
 * @param cases - The report's cases.
 * @param status - The status, such as `passed`.
 * @returns How many cases have exactly that status.
 */
export function countStatus(cases: readonly Case[], status: string): number {
	return cases.filter((entry) => entry.status === status).length
}

/**
 * Reads a report file as JSON.
 *
 * @param path - The report file.
 * @returns The parsed value, or undefined when the file is not readable JSON.
 */
export function readReport(path: string): unknown {
	try {
		return JSON.parse(readFileSync(path, 'utf8'))
	} catch {
		return undefined
	}
}

/**
 * Runs the script on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 when the report matches the names, 3 when it does not, 2 when the report
 * cannot be read as a Vitest report, 64 on usage.
 */
export function main(argv: readonly string[]): number {
	const missing = readMissingFlags(argv, VALUE_FLAGS)
	if (missing.length > 0) {
		console.error(`cases: ${missing.join(', ')} given with no value`)
		return 64
	}
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(`cases: ${unknown.join(', ')} is not a flag this script reads; ${USAGE}`)
		return 64
	}
	const reports = readOptions(argv, '--report')
	const path = reports[0]
	const passed = readOptions(argv, '--passed')
	const failed = readOptions(argv, '--failed')
	if (path === undefined || readPositionals(argv, VALUE_FLAGS).length > 0) {
		console.error(USAGE)
		return 64
	}
	const both = passed.filter((name) => failed.includes(name))
	if (both.length > 0) {
		console.error(
			`cases: ${both.map(quote).join(', ')} given to both --passed and --failed; ${USAGE}`,
		)
		return 64
	}
	if (!existsSync(path) || !statSync(path).isFile()) {
		console.error(`cases: ${quote(path)} is not a readable file`)
		return 2
	}
	const cases = readCases(readReport(path))
	if (cases === undefined) {
		console.error(
			`cases: ${quote(path)} is not a Vitest JSON report; it needs a "testResults" array (run vitest with --reporter=json)`,
		)
		return 2
	}
	const differences = judgeCases(cases, passed, failed, process.cwd())
	const green = countStatus(cases, 'passed')
	const red = countStatus(cases, 'failed')
	console.log(
		`cases total=${String(cases.length)} passed=${String(green)} failed=${String(red)} other=${String(cases.length - green - red)}`,
	)
	for (const difference of differences) console.log(difference)
	console.log(differences.length === 0 ? 'ok' : `differences=${String(differences.length)}`)
	return differences.length === 0 ? 0 : 3
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
