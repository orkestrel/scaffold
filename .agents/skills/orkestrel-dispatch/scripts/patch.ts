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
// after the earlier edits to that file, however the blocks spell its path (`src/a.ts` and `./src/a.ts`
// name one file), and nothing is written unless every selected edit resolves.
// `--plan` prints each edit's resolution and writes nothing; `--apply` writes the files after every
// edit resolved. `--skip N` leaves out edit number N, as the plan numbers them, and repeats. The
// script reads its flags with `parseArgs` in strict mode.
// Exit 0 when every selected edit resolved, 1 when one did not, 64 on usage.
import type { ParseArgsOptionsConfig } from 'node:util'
import { existsSync, readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs'
import { isAbsolute, relative, resolve, sep } from 'node:path'
import { parseArgs } from 'node:util'

/** Holds the usage line printed when a call names no edit file or no mode, or two. */
export const USAGE =
	'usage: patch.ts EDITS.md (--plan | --apply) [--skip N ...]; name one mode; --skip repeats'

/** Declares every flag the script reads, for `parseArgs`. */
export const OPTIONS: ParseArgsOptionsConfig = Object.freeze({
	plan: Object.freeze({ type: 'boolean' }),
	apply: Object.freeze({ type: 'boolean' }),
	skip: Object.freeze({ type: 'string', multiple: true }),
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
			allowPositionals: true,
		})
		return { success: true, value: { values, positionals } }
	} catch (error) {
		return { success: false, error: error instanceof Error ? error.message : String(error) }
	}
}

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
	const keyed = edits.map((edit) => {
		const target = resolve(root, edit.path)
		return { edit, target, key: readFileKey(target) }
	})
	const results = [...new Set(keyed.map((item) => item.key))].map((key) => {
		const group = keyed.filter((item) => item.key === key)
		const own = group.map((item) => item.edit)
		const path = own[0]?.path ?? ''
		const target = group[0]?.target ?? ''
		const problem = group
			.map((item) => readTargetProblem(root, item.target))
			.find((candidate) => candidate !== undefined)
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
 * Names the file an edit target stands for, so every spelling of one file shares one key.
 *
 * @remarks
 * The host's own path resolution folds case where the host folds it, so `./src/a.ts`, `src/a.ts`, and
 * on a case-folding host `SRC/A.ts` name one key when the file exists.
 *
 * @param target - The resolved target path.
 * @returns The file's canonical path when it exists, and the resolved path otherwise.
 */
export function readFileKey(target: string): string {
	return existsSync(target) ? realpathSync.native(target) : target
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
	return readFileProblem(target)
}

/**
 * Names why a path is not a file this script can read.
 *
 * @remarks
 * A stat that throws, such as one refused with `EACCES` or given a path that holds a NUL byte, is a
 * problem named by its error code, never an uncaught error.
 *
 * @param path - The path to read.
 * @returns The problem, or undefined when the path is a file.
 */
export function readFileProblem(path: string): string | undefined {
	try {
		return statSync(path, { throwIfNoEntry: false })?.isFile() === true ? undefined : 'no such file'
	} catch (error) {
		const code =
			error instanceof Error && 'code' in error && typeof error.code === 'string'
				? error.code
				: String(error)
		return `cannot be read: ${code}`
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
 * @returns The exit code: 0 when every selected edit resolved, 1 when one did not, 64 on usage.
 */
export function main(argv: readonly string[]): number {
	const parsed = parseArguments(argv)
	if (!parsed.success) {
		console.error(`patch: ${parsed.error}; ${USAGE}`)
		return 64
	}
	const { values, positionals } = parsed.value
	const apply = values.apply === true
	const [source, ...extra] = positionals
	if (apply === (values.plan === true) || extra.length > 0 || source === undefined) {
		console.error(USAGE)
		return 64
	}
	if (readFileProblem(source) !== undefined) {
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
	const skips = collectStrings(values.skip)
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
