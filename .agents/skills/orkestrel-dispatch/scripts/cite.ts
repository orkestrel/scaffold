// Check that every `file:line` citation in a report, verdict, or distillate resolves. Run from the
// checkout root:
//   node .agents/skills/orkestrel-dispatch/scripts/cite.ts PATH [--root DIR] [--json]
// A citation resolves when its path exists under the root (a path relative to the root resolves
// first, and a backslash reads as a slash) and the line is within the file, where a trailing line
// break ends the last line. A citation naming a bare filename that no root-relative file matches
// resolves when exactly one file under the root carries that name, outside node_modules, dist, tmp,
// .git, .orkestrel, and .idea. The summary lists every citation that does not resolve, with the
// reason. The script reads its flags with `parseArgs` in strict mode. Exit 0 when all resolve, 3
// when any does not, 64 on usage.
import type { ParseArgsOptionsConfig } from 'node:util'
import { existsSync, readdirSync, readFileSync, realpathSync, statSync } from 'node:fs'
import { basename, join, relative, resolve } from 'node:path'
import { parseArgs } from 'node:util'

/** Matches one `file:line` or `file:line-line` citation in a text. */
export const CITATION =
	/(?<![\w/\\.-])((?:\.{1,2}[/\\])?\.?[A-Za-z0-9_@][A-Za-z0-9_./\\@-]*\.[a-z]{1,5}):(\d+)(?:[-–](\d+))?(?![\w:])/gu

/** Names the directories a tree walk skips. */
export const SKIPPED_DIRECTORIES: ReadonlySet<string> = new Set([
	'node_modules',
	'.git',
	'dist',
	'tmp',
	'.orkestrel',
	'.idea',
])

/** Holds the usage line printed when a call names no report. */
export const USAGE = 'usage: cite.ts PATH [--root DIR] [--json]'

/** Declares every flag the script reads, for `parseArgs`. */
export const OPTIONS: ParseArgsOptionsConfig = Object.freeze({
	root: Object.freeze({ type: 'string' }),
	json: Object.freeze({ type: 'boolean' }),
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

/** Describes one citation that did not resolve and why. */
export interface Unresolved {
	readonly citation: string
	readonly reason: string
}

/** Describes where a citation's file resolved, or why it did not. */
export interface Resolution {
	readonly path: string | undefined
	readonly reason: string | undefined
}

/** Describes one citation read from a text: its file, its line, and the end of its range. */
export interface Citation {
	readonly citation: string
	readonly file: string
	readonly line: number
	readonly end: number | undefined
}

/** Describes one file a tree walk found, with the modification time it carries. */
export interface WalkedFile {
	readonly path: string
	readonly modified: number
}

/**
 * Normalizes a host path to forward slashes.
 *
 * @param path - A host path.
 * @returns The same path with every backslash replaced by a slash.
 */
export function normalizeSlashes(path: string): string {
	return path.replaceAll('\\', '/')
}

/**
 * Lists every regular file beneath a directory, skipping the directories the script never reads.
 *
 * @remarks
 * A skipped name matches a directory at any depth, exactly and case-sensitively.
 *
 * @param directory - The directory to walk.
 * @param skipped - The directory names to skip. Default: the skipped directories.
 * @returns Each file's forward-slash path and modification time, in walk order.
 * @throws Thrown when `directory` does not exist or cannot be read.
 */
export function listFiles(
	directory: string,
	skipped: ReadonlySet<string> = SKIPPED_DIRECTORIES,
): readonly WalkedFile[] {
	const files: WalkedFile[] = []
	const pending = [directory]
	while (pending.length > 0) {
		const current = pending.pop()
		if (current === undefined) break
		for (const entry of readdirSync(current, { withFileTypes: true })) {
			if (skipped.has(entry.name)) continue
			const path = join(current, entry.name)
			if (entry.isDirectory()) pending.push(path)
			else if (entry.isFile()) {
				files.push({ path: normalizeSlashes(path), modified: statSync(path).mtimeMs })
			}
		}
	}
	return files
}

/**
 * Extracts every citation a text carries.
 *
 * @param text - The report text.
 * @returns Each citation in text order, with its file, its line, and the end of a range.
 */
export function extractCitations(text: string): readonly Citation[] {
	return [...text.matchAll(CITATION)].flatMap((match): Citation[] =>
		match[1] === undefined
			? []
			: [
					{
						citation: match[0],
						file: match[1],
						line: Number(match[2]),
						end: match[3] === undefined ? undefined : Number(match[3]),
					},
				],
	)
}

/**
 * Indexes every file under a root by its basename.
 *
 * @param root - The directory to walk.
 * @returns Each basename mapped to the root-relative forward-slash paths that carry it.
 */
export function indexBasenames(root: string): ReadonlyMap<string, readonly string[]> {
	return new Map(
		[...Map.groupBy(listFiles(root), (file) => basename(file.path))].map(([name, files]) => [
			name,
			files.map((file) => normalizeSlashes(relative(root, file.path))),
		]),
	)
}

/**
 * Counts the lines of a file.
 *
 * @param path - The file to read.
 * @returns The number of lines, where a trailing line break ends the last line and an empty file has none.
 */
export function countLines(path: string): number {
	const text = readFileSync(path, 'utf8')
	if (text === '') return 0
	const lines = text.split(/\r\n|\n/)
	// A trailing line break ends the last line rather than opening a phantom one.
	return lines.at(-1) === '' ? lines.length - 1 : lines.length
}

/**
 * Resolves a citation's file directly under the root.
 *
 * @param root - The directory a citation's path is relative to.
 * @param file - The cited path, a backslash read as a slash.
 * @returns The absolute path of the file, or undefined when no regular file sits there.
 */
export function resolveDirect(root: string, file: string): string | undefined {
	const direct = resolve(root, normalizeSlashes(file))
	// The path comes from report text, and existsSync answers false where a stat would throw.
	return existsSync(direct) && statSync(direct).isFile() ? direct : undefined
}

/**
 * Checks whether a citation can resolve only through the basename index.
 *
 * @param root - The directory a citation's path is relative to.
 * @param file - The cited path.
 * @returns True if no root-relative file matches and the path is a bare filename; false otherwise.
 */
export function needsIndex(root: string, file: string): boolean {
	return resolveDirect(root, file) === undefined && !/[/\\]/u.test(file)
}

/**
 * Resolves a citation's file, directly or through the basename index.
 *
 * @param root - The directory a citation's path is relative to.
 * @param file - The cited path.
 * @param index - The basename index, or undefined when no citation needed one.
 * @returns The resolved absolute path, or the reason the file did not resolve.
 */
export function resolveFile(
	root: string,
	file: string,
	index: ReadonlyMap<string, readonly string[]> | undefined,
): Resolution {
	const direct = resolveDirect(root, file)
	if (direct !== undefined) return { path: direct, reason: undefined }
	if (/[/\\]/u.test(file)) return { path: undefined, reason: 'file does not exist' }
	const candidates = index?.get(basename(file)) ?? []
	const only = candidates.length === 1 ? candidates[0] : undefined
	if (only !== undefined) return { path: resolve(root, only), reason: undefined }
	if (candidates.length === 0) return { path: undefined, reason: 'file does not exist' }
	return { path: undefined, reason: `ambiguous basename: ${candidates.join(', ')}` }
}

/**
 * Judges whether a cited line or range lies within a file.
 *
 * @param path - The resolved file.
 * @param line - The cited line.
 * @param end - The end of a cited range, or undefined for a single line.
 * @param counts - The line counts already read, by file.
 * @returns The reason the line or range is outside the file, or undefined when it is inside.
 */
export function judgeLines(
	path: string,
	line: number,
	end: number | undefined,
	counts: ReadonlyMap<string, number>,
): string | undefined {
	const total = counts.get(path) ?? countLines(path)
	if (line < 1 || line > total) return `line ${line} is outside 1-${total}`
	if (end !== undefined && (end < line || end > total))
		return `range end ${end} is outside ${line}-${total}`
	return undefined
}

/**
 * Runs the script on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 when every citation resolves, 3 when one does not, 64 on usage.
 */
export function main(argv: readonly string[]): number {
	const parsed = parseArguments(argv)
	if (!parsed.success) {
		console.error(`cite: ${parsed.error}; ${USAGE}`)
		return 64
	}
	const { values, positionals } = parsed.value
	const root = typeof values.root === 'string' ? values.root : process.cwd()
	const [path, ...extra] = positionals
	if (path === undefined || extra.length > 0 || !existsSync(path)) {
		console.error(USAGE)
		return 64
	}
	const named = extractCitations(readFileSync(path, 'utf8'))
	const citations = named.length
	// The basename index walks the root, so it is built once and only when a citation needs it.
	const index = named.some(({ file }) => needsIndex(root, file)) ? indexBasenames(root) : undefined
	const resolutions = named.map((entry) => ({
		entry,
		resolved: resolveFile(root, entry.file, index),
	}))
	// Each resolved file is counted once, however many citations name it.
	const counts = new Map(
		[...new Set(resolutions.flatMap(({ resolved }) => resolved.path ?? []))].map((file) => [
			file,
			countLines(file),
		]),
	)
	const unresolved = resolutions.flatMap(({ entry, resolved }): Unresolved[] => {
		const reason =
			resolved.path === undefined
				? (resolved.reason ?? 'file does not exist')
				: judgeLines(resolved.path, entry.line, entry.end, counts)
		return reason === undefined ? [] : [{ citation: entry.citation, reason }]
	})
	if (values.json === true) {
		console.log(JSON.stringify({ path, root, citations, unresolved }))
	} else {
		console.log(`cite: ${citations} citation(s) in ${path}, ${unresolved.length} unresolved`)
		for (const entry of unresolved) console.log(`cite: ${entry.citation} — ${entry.reason}`)
	}
	return unresolved.length === 0 ? 0 : 3
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
