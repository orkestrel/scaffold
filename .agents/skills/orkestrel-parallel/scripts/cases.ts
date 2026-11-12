// Check a Vitest JSON report against named red and green cases. Run from the checkout root:
//   node .agents/skills/orkestrel-parallel/scripts/cases.ts --report FILE.json [--passed NAME ...] [--failed NAME ...]
// The report is Vitest's `--reporter=json` output. A name matches every case whose full name (its
// `describe` titles and its own title, joined by spaces) or whose own title equals it exactly; give
// a name that opens with `-` in the `--passed=NAME` form. Each `--passed NAME` requires every case
// it matches to have passed and each `--failed NAME` requires every one to have failed; a name that
// matches no case is missing. A failed case that no name matches is refused, so a run that fails
// more than the request expected reads as a difference. A test file that failed with no failed case
// (it did not collect, or a hook threw) is an unnamed failure named by its file, and a report whose
// `success` is false while no case and no file failed is a difference too. Name no case to require
// a report with no failure. Both flags repeat and a name may not be given to both. The script
// prints one summary line, one line per difference, and `ok` or `differences=N`. The script reads
// its flags with `parseArgs` in strict mode. Exit 0 when the report matches the names, 3 when it
// does not, 2 when the report cannot be read as a Vitest report, 64 on usage.
import type { ParseArgsOptionsConfig } from 'node:util'
import { readFileSync, realpathSync, statSync } from 'node:fs'
import { relative } from 'node:path'
import { parseArgs } from 'node:util'

/** Holds the usage line printed when a call names no report. */
export const USAGE =
	'usage: cases.ts --report FILE.json [--passed NAME ...] [--failed NAME ...]; --passed and --failed repeat'

/** Declares every flag the script reads, for `parseArgs`. */
export const OPTIONS: ParseArgsOptionsConfig = Object.freeze({
	report: Object.freeze({ type: 'string' }),
	passed: Object.freeze({ type: 'string', multiple: true }),
	failed: Object.freeze({ type: 'string', multiple: true }),
})

/** Describes the arguments `parseArgs` read: each flag's value by name, and the positionals. */
export interface Arguments {
	readonly values: Readonly<
		Record<string, string | boolean | ReadonlyArray<string | boolean> | undefined>
	>
	readonly positionals: readonly string[]
}

/** Describes how `parseArgs` read the arguments: the arguments, or the message it refused them with. */
export type ArgumentsResult =
	| { readonly success: true; readonly value: Arguments }
	| { readonly success: false; readonly error: string }

/**
 * Parses the arguments in strict mode against `OPTIONS`.
 *
 * @param argv - The arguments after the script path.
 * @returns The values and positionals, or the message `parseArgs` refused the arguments with.
 */
export function parseArguments(argv: readonly string[]): ArgumentsResult {
	try {
		const { values, positionals } = parseArgs({
			args: [...argv],
			options: OPTIONS,
			strict: true,
			allowPositionals: false,
		})
		return { success: true, value: { values, positionals } }
	} catch (error) {
		return { success: false, error: error instanceof Error ? error.message : String(error) }
	}
}

/** Describes one test case a report holds. */
export interface Case {
	readonly file: string
	readonly fullName: string
	readonly title: string
	readonly status: string
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
 * Reads the test files of a report that failed with no failed case.
 *
 * @param report - The parsed JSON value of the report.
 * @returns The `name` of each `testResults` entry whose `status` is `failed` and whose assertion
 * results hold no failed case, in file order; an empty text stands for an entry with no name.
 */
export function readFailedFiles(report: unknown): readonly string[] {
	if (!isRecord(report) || !Array.isArray(report.testResults)) return []
	return report.testResults.flatMap((suite): readonly string[] => {
		if (!isRecord(suite) || suite.status !== 'failed') return []
		const results = Array.isArray(suite.assertionResults) ? suite.assertionResults : []
		if (results.some((result) => isRecord(result) && result.status === 'failed')) return []
		return [typeof suite.name === 'string' ? suite.name : '']
	})
}

/**
 * Checks whether a report states that the run did not succeed.
 *
 * @param report - The parsed JSON value of the report.
 * @returns True when the report is an object whose `success` is `false`; false otherwise.
 */
export function isUnsuccessful(report: unknown): boolean {
	return isRecord(report) && report.success === false
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
 * Judges the failures a report holds outside its cases.
 *
 * @param cases - The report's cases.
 * @param failedFiles - The test files that failed with no failed case, from {@link readFailedFiles}.
 * @param unsuccessful - Whether the report states that the run did not succeed.
 * @param base - The directory the file names in each difference are written relative to.
 * @returns One unnamed failure per failed file; or, when no file and no case failed yet the report
 * is not successful, one unnamed failure for the report; empty otherwise.
 */
export function judgeFailures(
	cases: readonly Case[],
	failedFiles: readonly string[],
	unsuccessful: boolean,
	base: string,
): readonly string[] {
	if (failedFiles.length > 0) {
		return failedFiles.map(
			(file) =>
				`unnamed failure: ${file === '' ? 'a test file' : quote(relativeFile(base, file))} failed with no failed case`,
		)
	}
	return unsuccessful && cases.every((entry) => entry.status !== 'failed')
		? ['unnamed failure: the report is not successful, yet no case and no file in it failed']
		: []
}

/**
 * Writes a test file path relative to a directory.
 *
 * @param base - The directory the path is written relative to.
 * @param file - The test file path from the report.
 * @returns The relative path with forward slashes.
 */
export function relativeFile(base: string, file: string): string {
	return relative(base, file).split('\\').join('/')
}

/**
 * Describes the file a case belongs to, written relative to a directory.
 *
 * @param base - The directory the path is written relative to.
 * @param file - The test file path from the report.
 * @returns ` in <path>` with forward slashes, or an empty text when the report names no file.
 */
export function describeFile(base: string, file: string): string {
	return file === '' ? '' : ` in ${relativeFile(base, file)}`
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
 * Collects the strings a repeatable flag's value holds.
 *
 * @param value - The value `parseArgs` read for a flag declared with `multiple: true`.
 * @returns Each string in order, empty when the flag never appears.
 */
export function collectStrings(value: unknown): readonly string[] {
	return Array.isArray(value)
		? value.filter((member): member is string => typeof member === 'string')
		: []
}

/**
 * Runs the script on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 when the report matches the names, 3 when it does not, 2 when the report
 * cannot be read as a Vitest report, 64 on usage.
 */
export function main(argv: readonly string[]): number {
	const parsed = parseArguments(argv)
	if (!parsed.success) {
		console.error(`cases: ${parsed.error}; ${USAGE}`)
		return 64
	}
	const { values } = parsed.value
	const path = typeof values.report === 'string' ? values.report : undefined
	const passed = collectStrings(values.passed)
	const failed = collectStrings(values.failed)
	if (path === undefined) {
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
	if (statSync(path, { throwIfNoEntry: false })?.isFile() !== true) {
		console.error(`cases: ${quote(path)} is not a readable file`)
		return 2
	}
	const report = readReport(path)
	const cases = readCases(report)
	if (cases === undefined) {
		console.error(
			`cases: ${quote(path)} is not a Vitest JSON report; it needs a "testResults" array (run vitest with --reporter=json)`,
		)
		return 2
	}
	const differences = [
		...judgeCases(cases, passed, failed, process.cwd()),
		...judgeFailures(cases, readFailedFiles(report), isUnsuccessful(report), process.cwd()),
	]
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
