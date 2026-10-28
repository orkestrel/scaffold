// Check that every `file:line` citation in a report, verdict, or distillate resolves. Run from the
// checkout root:
//   node .agents/skills/orkestrel-dispatch/scripts/cite.ts PATH [--root DIR] [--json]
// A citation resolves when its path exists under the root (a path relative to the root resolves
// first, and a backslash reads as a slash) and the line is within the file, where a trailing line
// break ends the last line. A citation naming a bare filename that no root-relative
// file matches resolves when exactly one file under the root carries that name, outside
// node_modules, dist, tmp, .git, .orkestrel, and .idea. The summary lists every citation that does
// not resolve, with the reason. The script refuses a flag it does not read, the `--flag=value` form
// included. Exit 0 when all resolve, 3 when any does not, 64 on usage.
import { existsSync, readdirSync, readFileSync, realpathSync, statSync } from 'node:fs'
import { basename, join, relative, resolve } from 'node:path'

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

/** Lists the flags that take a value. */
export const VALUE_FLAGS: readonly string[] = ['--root']

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = [...VALUE_FLAGS, '--json']

/** Holds the usage line printed when a call names no report. */
export const USAGE = 'usage: cite.ts PATH [--root DIR] [--json]'

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
 * Reads the value that follows a flag.
 *
 * @remarks
 * The first occurrence of a flag wins, a following value that opens with `--` is a missing value,
 * and the `--flag=value` form is not read.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--root`.
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
 * Normalizes a host path to forward slashes.
 *
 * @param path - A host path.
 * @returns The same path with every backslash replaced by a slash.
 */
export function normalizeSlashes(path: string): string {
	return path.split('\\').join('/')
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
	const missing = readMissingFlags(argv, VALUE_FLAGS)
	if (missing.length > 0) {
		console.error(`cite: ${missing.join(', ')} given with no value`)
		return 64
	}
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(`cite: ${unknown.join(', ')} is not a flag this script reads; ${USAGE}`)
		return 64
	}
	const root = readOption(argv, '--root') ?? process.cwd()
	const path = argv.find(
		(argument, position) => !argument.startsWith('--') && argv[position - 1] !== '--root',
	)
	if (path === undefined || !existsSync(path)) {
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
	if (argv.includes('--json')) {
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
