// Apply an edit file of exact old-to-new replacements. Run from the checkout root:
//   node .agents/skills/orkestrel-dispatch/scripts/patch.ts EDITS.md (--plan | --apply) [--skip N ...]
// An edit file holds blocks of this shape, in the order they apply:
//   ### path/relative/to/the/working/directory
//   reason: one line saying why
//   old:
//   ```ts
//   the exact text to replace
//   ```
//   new:
//   ```ts
//   the replacement text
//   ```
// A fence opens with three or more backticks and closes with the same count, so a block can carry a
// shorter fence. Prose outside the blocks is ignored, but a stray `###`, `reason:`, `old:`, or `new:`
// line that opens no complete block is refused. Every `old` text must occur exactly once in its file
// after the earlier edits to that file, and nothing is written unless every selected edit resolves.
// `--plan` prints each edit's resolution and writes nothing; `--apply` writes the files after every
// edit resolved. `--skip N` leaves out edit number N, as the plan numbers them, and repeats. The
// script refuses a flag it does not read, the `--flag=value` form included.
// Exit 0 when every selected edit resolved, 1 when one did not, 64 on usage.
import { existsSync, readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs'
import { isAbsolute, relative, resolve, sep } from 'node:path'

/** Lists the flags that each select one operation. */
export const MODE_FLAGS: readonly string[] = ['--plan', '--apply']

/** Lists the flags that take a value. */
export const VALUE_FLAGS: readonly string[] = ['--skip']

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = [...MODE_FLAGS, ...VALUE_FLAGS]

/** Holds the usage line printed when a call names no edit file or no mode, or two. */
export const USAGE =
	'usage: patch.ts EDITS.md (--plan | --apply) [--skip N ...]; name one mode; --skip repeats'

/** Matches one edit block with its path, reason, and fenced old and new texts. */
export const EDIT_BLOCK =
	/^### (.+?)[ \t]*\n+reason:[ \t]*(.*?)[ \t]*\n+old:\n+(`{3,})[^\n`]*\n([\s\S]*?)\n\3[ \t]*\n+new:\n+(`{3,})[^\n`]*\n([\s\S]*?)\n?\5[ \t]*$/gmu

/** Matches a line that belongs to an edit block and so must not remain outside one. */
export const STRAY_LINE = /^(?:### |reason:|old:|new:)/u

/** Describes one edit: the file it changes, why, and the text it swaps. */
export interface Edit {
	readonly number: number
	readonly path: string
	readonly reason: string
	readonly before: string
	readonly after: string
}

/** Describes what happened to one edit: the problem that stopped it, or undefined when it resolved. */
export interface Outcome {
	readonly number: number
	readonly path: string
	readonly reason: string
	readonly problem: string | undefined
}

/** Describes one file's text after its edits, with each edit's outcome. */
export interface Resolution {
	readonly text: string
	readonly outcomes: readonly Outcome[]
}

/** Describes one file whose edits all resolved, with the text to write. */
export interface Resolved {
	readonly path: string
	readonly text: string
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
 * @param name - The flag, such as `--skip`.
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
 * Quotes an untrusted text for a diagnostic, JSON-encoded and cut to a bounded length.
 *
 * @param text - The text to quote.
 * @returns The JSON string literal of the text, ending in an ellipsis inside the quotes when cut.
 */
export function quote(text: string): string {
	return JSON.stringify(text.length > 80 ? `${text.slice(0, 80)}…` : text)
}

/**
 * Reads the edit blocks of an edit file in order.
 *
 * @param text - The edit file's text; a carriage return before a line break is ignored.
 * @returns Each complete block as an edit numbered from 1.
 */
export function parseEdits(text: string): readonly Edit[] {
	return [...text.replace(/\r\n/gu, '\n').matchAll(EDIT_BLOCK)].map((match, index) => ({
		number: index + 1,
		path: match[1] ?? '',
		reason: match[2] ?? '',
		before: match[4] ?? '',
		after: match[6] ?? '',
	}))
}

/**
 * Finds the lines of an edit file that open or continue a block no complete block holds.
 *
 * @param text - The edit file's text.
 * @returns Each stray `###`, `reason:`, `old:`, or `new:` line, in order.
 */
export function readStrays(text: string): readonly string[] {
	return text
		.replace(/\r\n/gu, '\n')
		.replace(EDIT_BLOCK, '')
		.split(/\r\n|\n/u)
		.filter((line) => STRAY_LINE.test(line))
}

/**
 * Counts how many places a text occurs in another, overlapping places included.
 *
 * @param text - The text to search.
 * @param part - The text to find; an empty text occurs nowhere.
 * @returns The number of start positions at which `part` occurs.
 */
export function countOccurrences(text: string, part: string): number {
	if (part === '') return 0
	const escaped = part.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
	return [...text.matchAll(new RegExp(`(?=${escaped})`, 'gu'))].length
}

/**
 * Applies a file's edits in order, each against the text the earlier edits left.
 *
 * @param text - The file's text before any edit.
 * @param edits - The file's edits in file order.
 * @returns The text after the edits that resolved and one outcome per edit; an edit whose `old` text
 * does not occur exactly once changes nothing and carries its problem.
 */
export function applyEdits(text: string, edits: readonly Edit[]): Resolution {
	return edits.reduce<Resolution>(
		(state, edit) => {
			const count = countOccurrences(state.text, edit.before)
			const problem = count === 1 ? undefined : `old text occurs ${String(count)} times`
			return {
				text:
					problem === undefined ? state.text.replace(edit.before, () => edit.after) : state.text,
				outcomes: [...state.outcomes, describeOutcome(edit, problem)],
			}
		},
		{ text, outcomes: [] },
	)
}

/**
 * Describes what happened to one edit.
 *
 * @param edit - The edit.
 * @param problem - The problem that stopped it, or undefined when it resolved.
 * @returns The edit's number, path, and reason with the problem.
 */
export function describeOutcome(edit: Edit, problem: string | undefined): Outcome {
	return { number: edit.number, path: edit.path, reason: edit.reason, problem }
}

/**
 * Checks whether a path sits strictly inside a directory.
 *
 * @param root - The directory.
 * @param target - The path to check.
 * @returns True when `target` is below `root`; false for `root` itself and for any path outside.
 */
export function isInside(root: string, target: string): boolean {
	const path = relative(root, target)
	return path !== '' && path !== '..' && !path.startsWith(`..${sep}`) && !isAbsolute(path)
}

/**
 * Reads the numbers a caller asked to skip.
 *
 * @param values - The `--skip` values.
 * @param count - How many edits the file holds.
 * @returns Each value that is not a whole number from 1 to `count`, in order.
 */
export function readInvalidSkips(values: readonly string[], count: number): readonly string[] {
	return values.filter((value) => !/^[1-9]\d*$/u.test(value) || Number(value) > count)
}

/**
 * Resolves every selected edit against the files under a root, writing nothing.
 *
 * @param root - The working directory the edit paths resolve against.
 * @param edits - The selected edits in file order.
 * @returns One outcome per edit in file order, and the text of each file whose edits all resolved.
 */
export function resolveEdits(
	root: string,
	edits: readonly Edit[],
): { readonly outcomes: readonly Outcome[]; readonly files: readonly Resolved[] } {
	const results = [...new Set(edits.map((edit) => edit.path))].map((path) => {
		const own = edits.filter((edit) => edit.path === path)
		const target = resolve(root, path)
		const problem = readTargetProblem(root, target)
		if (problem !== undefined) {
			return { path, text: undefined, outcomes: own.map((edit) => describeOutcome(edit, problem)) }
		}
		const resolution = applyEdits(readFileSync(target, 'utf8'), own)
		const failed = resolution.outcomes.some((outcome) => outcome.problem !== undefined)
		return { path, text: failed ? undefined : resolution.text, outcomes: resolution.outcomes }
	})
	return {
		outcomes: results.flatMap((result) => result.outcomes).sort((a, b) => a.number - b.number),
		files: results.flatMap((result) =>
			result.text === undefined ? [] : [{ path: result.path, text: result.text }],
		),
	}
}

/**
 * Names why an edit target cannot be edited.
 *
 * @param root - The working directory the edit paths resolve against.
 * @param target - The resolved target path.
 * @returns The problem, or undefined when the target is a file inside the root.
 */
export function readTargetProblem(root: string, target: string): string | undefined {
	if (!isInside(root, target)) return 'path leaves the working directory'
	if (!existsSync(target) || !statSync(target).isFile()) return 'no such file'
	return undefined
}

/**
 * Runs the script on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 when every selected edit resolved, 1 when one did not, 64 on usage.
 */
export function main(argv: readonly string[]): number {
	const missing = readMissingFlags(argv, VALUE_FLAGS)
	if (missing.length > 0) {
		console.error(`patch: ${missing.join(', ')} given with no value`)
		return 64
	}
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(`patch: ${unknown.join(', ')} is not a flag this script reads; ${USAGE}`)
		return 64
	}
	const modes = MODE_FLAGS.filter((flag) => argv.includes(flag))
	const sources = readPositionals(argv, VALUE_FLAGS)
	const source = sources[0]
	if (modes.length !== 1 || sources.length !== 1 || source === undefined) {
		console.error(USAGE)
		return 64
	}
	if (!existsSync(source) || !statSync(source).isFile()) {
		console.error(`patch: ${quote(source)} is not a readable edit file; ${USAGE}`)
		return 64
	}
	const text = readFileSync(source, 'utf8')
	const edits = parseEdits(text)
	const strays = readStrays(text)
	if (edits.length === 0 || strays.length > 0) {
		console.error(
			`patch: ${quote(source)} ${edits.length === 0 ? 'holds no complete edit block' : `has a line that opens no complete block: ${strays.map(quote).join(', ')}`}; a block is a "### path" line, a "reason:" line, and fenced "old:" and "new:" texts`,
		)
		return 64
	}
	const skips = readOptions(argv, '--skip')
	const invalid = readInvalidSkips(skips, edits.length)
	if (invalid.length > 0) {
		console.error(
			`patch: --skip ${invalid.map(quote).join(', ')} names no edit; the file holds edits 1 to ${String(edits.length)}`,
		)
		return 64
	}
	const skipped = new Set(skips.map(Number))
	const selected = edits.filter((edit) => !skipped.has(edit.number))
	const root = process.cwd()
	const resolution = resolveEdits(root, selected)
	for (const edit of edits) {
		const outcome = resolution.outcomes.find((candidate) => candidate.number === edit.number)
		if (outcome === undefined) console.log(`#${String(edit.number)} skipped ${edit.path}`)
		else if (outcome.problem === undefined) {
			console.log(`#${String(edit.number)} ok ${edit.path} — ${edit.reason}`)
		} else console.log(`#${String(edit.number)} FAIL ${edit.path}: ${outcome.problem}`)
	}
	if (resolution.outcomes.some((outcome) => outcome.problem !== undefined)) {
		console.log('nothing written')
		return 1
	}
	const apply = argv.includes('--apply')
	if (apply) {
		for (const file of resolution.files) writeFileSync(resolve(root, file.path), file.text)
	}
	console.log(
		`${apply ? 'applied' : 'planned'} edits to ${String(resolution.files.length)} file(s)`,
	)
	return 0
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
