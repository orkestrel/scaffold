// Prove a test catches a mutation: apply an edit file, run a command, restore the files, run the
// command again. Run from the checkout root:
//   node .agents/skills/orkestrel-falsify/scripts/mutate.ts --edits EDITS.md -- COMMAND [ARGS...]
// The edit file has the shape `patch.ts` of the `orkestrel-dispatch` skill reads: blocks of a
// `### <path>` heading (relative to the working directory), a `reason:` line, and fenced `old:` and
// `new:` texts, where each `old` text must occur exactly once in its file after the earlier edits to
// that file. The script resolves every edit before it touches a file, saves each file's original
// bytes under `tmp/probes/mutate/`, writes the mutated files, runs the command with no shell and
// its output sent to this script's standard error, restores the original bytes and proves each
// file's SHA-256 digest equals the original, runs the command again, and prints one JSON line:
// `{"edits":N,"files":[{"path":"...","digest":"..."}],"mutatedExit":N,"restoredExit":N,"restored":true}`.
// The saved bytes are deleted once the restore is proven. Edits that spell one file two ways
// (`a.ts` and `./a.ts`, or a case-only difference on a host that folds case) apply to it in order,
// each against the text the earlier ones left. A mutation that leaves the suite uncollected also
// reads as a failing run, so read the command's own test count on standard error.
// A killed parent leaves the tree mutated, so a run refuses to start while a run directory remains
// and names the line that restores it, and
//   node .agents/skills/orkestrel-falsify/scripts/mutate.ts --restore tmp/probes/mutate/run-NAME
// writes each saved original back, proves each file's SHA-256 digest against the run's manifest,
// deletes the run directory, and prints `{"files":[{"path":"...","digest":"..."}],"restored":true}`.
// The script refuses a flag it does not read before the bare `--`, the `--flag=value` form included,
// and names an unknown flag before a flag given with no value.
// Exit 0 when the mutated run failed and the restored run passed (or a `--restore` is proven), 3
// when either did not, 2 when a restore is not proven or the command cannot start, 64 on usage, an
// edit that does not resolve, or a run directory an earlier run left.
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import {
	existsSync,
	mkdirSync,
	mkdtempSync,
	readdirSync,
	readFileSync,
	realpathSync,
	rmSync,
	statSync,
	writeFileSync,
} from 'node:fs'
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'

/** Lists the flags that take a value. */
export const VALUE_FLAGS: readonly string[] = ['--edits', '--restore']

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = VALUE_FLAGS

/** Holds the usage line printed when a call names no edit file or no command. */
export const USAGE =
	'usage: mutate.ts --edits EDITS.md -- COMMAND [ARGS...] | mutate.ts --restore tmp/probes/mutate/run-NAME'

/** Holds the directory, under the working directory, that keeps the original bytes of a run. */
export const BACKUP_ROOT = 'tmp/probes/mutate'

/** Holds the name every run directory opens with. */
export const RUN_PREFIX = 'run-'

/** Holds the name of the manifest file a run directory keeps beside its saved bytes. */
export const MANIFEST = 'manifest.json'

/** Matches one edit block with its path, reason, and fenced old and new texts. */
export const EDIT_BLOCK =
	/^### (.+?)[ \t]*\n+reason:[ \t]*(.*?)[ \t]*\n+old:\n+(`{3,})[^\n`]*\n([\s\S]*?)\n\3[ \t]*\n+new:\n+(`{3,})[^\n`]*\n([\s\S]*?)\n?\5[ \t]*$/gmu

/** Matches a line that belongs to an edit block and so must not remain outside one. */
export const STRAY_LINE = /^(?:### |reason:|old:|new:)/u

/** Describes one edit: the file it changes, why, and the text it swaps. */
export interface Edit {
	readonly number: number
	readonly path: string
	readonly before: string
	readonly after: string
}

/** Describes one file a mutation touches: its original bytes and the text to write. */
export interface Mutation {
	readonly path: string
	readonly original: Buffer
	readonly mutated: string
}

/** Describes one file a run directory saved: its path, the saved bytes' file, and their digest. */
export interface ManifestEntry {
	readonly path: string
	readonly backup: string
	readonly digest: string
}

/** Describes what resolving the edits against the files found. */
export interface Resolution {
	readonly mutations: readonly Mutation[]
	readonly problems: readonly string[]
}

/** Describes one finished command: its exit code, or why it never exited. */
export interface Finish {
	readonly exit: number | undefined
	readonly error: string | undefined
}

/**
 * Names the value flags a caller gave with no value.
 *
 * @param argv - The arguments before the bare `--`.
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
 * Reads the value that follows a flag.
 *
 * @remarks
 * The first occurrence of a flag wins, a following value that opens with `--` is a missing value,
 * and the `--flag=value` form is not read.
 *
 * @param argv - The arguments before the bare `--`.
 * @param name - The flag, such as `--edits`.
 * @returns The value after the flag, or undefined when the flag is absent, last, or followed by
 * another flag.
 */
export function readOption(argv: readonly string[], name: string): string | undefined {
	const index = argv.indexOf(name)
	const value = index === -1 ? undefined : argv[index + 1]
	return value === undefined || value.startsWith('--') ? undefined : value
}

/**
 * Names the flags a caller gave that the script does not read.
 *
 * @remarks
 * A `--flag=value` argument is unknown, because the script reads no such form. A bare `--` ends the
 * scan, because it opens the command the script runs.
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
 * Reads the arguments that are neither a flag nor the value of a value flag.
 *
 * @param argv - The arguments before the bare `--`.
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
 * Hashes bytes with SHA-256.
 *
 * @param bytes - The bytes to hash.
 * @returns The digest as lowercase hexadecimal.
 */
export function digestBytes(bytes: Uint8Array): string {
	return createHash('sha256').update(bytes).digest('hex')
}

/**
 * Applies one file's edits in order, each against the text the earlier edits left.
 *
 * @param text - The file's text before any edit.
 * @param edits - The file's edits in file order.
 * @returns The text after the edits, and one problem per edit whose `old` text does not occur
 * exactly once; such an edit changes nothing.
 */
export function applyEdits(
	text: string,
	edits: readonly Edit[],
): { readonly text: string; readonly problems: readonly string[] } {
	return edits.reduce<{ readonly text: string; readonly problems: readonly string[] }>(
		(state, edit) => {
			const count = countOccurrences(state.text, edit.before)
			return count === 1
				? { text: state.text.replace(edit.before, () => edit.after), problems: state.problems }
				: {
						text: state.text,
						problems: [
							...state.problems,
							`#${String(edit.number)} ${edit.path}: old text occurs ${String(count)} times`,
						],
					}
		},
		{ text, problems: [] },
	)
}

/**
 * Folds a path's case on a host whose file names ignore case.
 *
 * @param path - The path to fold.
 * @param platform - The host platform, as `process.platform` names it.
 * @returns The path in lowercase on `win32` and `darwin`; the path unchanged elsewhere.
 */
export function foldPath(path: string, platform: string): string {
	return platform === 'win32' || platform === 'darwin' ? path.toLowerCase() : path
}

/**
 * Names the file an edit changes, so two spellings of one path share a name.
 *
 * @param root - The working directory the edit paths resolve against.
 * @param edit - The edit.
 * @returns The edit's resolved path, case-folded where the host folds case.
 */
export function keyEdit(root: string, edit: Edit): string {
	return foldPath(resolve(root, edit.path), process.platform)
}

/**
 * Resolves every edit against the files under a root, writing nothing.
 *
 * @remarks
 * Edits that name one file under two spellings are one file's edits, applied in file order.
 *
 * @param root - The working directory the edit paths resolve against.
 * @param edits - The edits in file order.
 * @returns One mutation per file whose edits all resolved, and each problem found in any file.
 */
export function resolveMutations(root: string, edits: readonly Edit[]): Resolution {
	const results = [...new Set(edits.map((edit) => keyEdit(root, edit)))].map((key) => {
		const own = edits.filter((edit) => keyEdit(root, edit) === key)
		const path = own[0]?.path ?? ''
		const target = resolve(root, path)
		if (!isInside(root, target)) {
			return { mutation: undefined, problems: [`${path}: path leaves the working directory`] }
		}
		if (!existsSync(target) || !statSync(target).isFile()) {
			return { mutation: undefined, problems: [`${path}: no such file`] }
		}
		const original = readFileSync(target)
		const applied = applyEdits(original.toString('utf8'), own)
		return {
			mutation:
				applied.problems.length === 0 ? { path, original, mutated: applied.text } : undefined,
			problems: applied.problems,
		}
	})
	return {
		mutations: results.flatMap((result) =>
			result.mutation === undefined ? [] : [result.mutation],
		),
		problems: results.flatMap((result) => result.problems),
	}
}

/**
 * Runs the command with no shell, its output sent to this process's standard error.
 *
 * @param command - The executable to run.
 * @param args - The arguments after the executable.
 * @returns The exit code, or undefined with the reason when the command cannot start or a signal
 * ended it.
 */
export function runCommand(command: string, args: readonly string[]): Finish {
	const result = spawnSync(command, args, {
		stdio: ['ignore', 2, 2],
		windowsHide: true,
		shell: false,
	})
	const error =
		result.error?.message ?? (result.signal === null ? undefined : `ended by ${result.signal}`)
	return { exit: error === undefined ? (result.status ?? undefined) : undefined, error }
}

/**
 * Writes each mutation's original bytes back to its file.
 *
 * @param root - The working directory the paths resolve against.
 * @param mutations - The mutations to undo.
 * @returns Nothing after every file is written.
 */
export function restoreFiles(root: string, mutations: readonly Mutation[]): void {
	for (const mutation of mutations) writeFileSync(resolve(root, mutation.path), mutation.original)
}

/**
 * Names each file whose bytes no longer match the original digest.
 *
 * @param root - The working directory the paths resolve against.
 * @param mutations - The mutations whose originals are the reference.
 * @returns The path of each file that is missing or whose digest differs, in mutation order.
 */
export function readDrift(root: string, mutations: readonly Mutation[]): readonly string[] {
	return mutations.flatMap((mutation) =>
		digestFile(resolve(root, mutation.path)) === digestBytes(mutation.original)
			? []
			: [mutation.path],
	)
}

/**
 * Hashes a file's bytes with SHA-256.
 *
 * @param path - The file to hash.
 * @returns The digest as lowercase hexadecimal, or undefined when the path cannot be read as a file.
 */
export function digestFile(path: string): string | undefined {
	try {
		return digestBytes(readFileSync(path))
	} catch {
		return undefined
	}
}

/**
 * Writes the mutated files and runs the command, reporting a write the host refuses as a run that
 * never exited.
 *
 * @param root - The working directory the paths resolve against.
 * @param mutations - The mutations to apply.
 * @param command - The executable to run.
 * @param args - The arguments after the executable.
 * @returns How the mutated run ended.
 */
export function runMutated(
	root: string,
	mutations: readonly Mutation[],
	command: string,
	args: readonly string[],
): Finish {
	try {
		for (const mutation of mutations) writeFileSync(resolve(root, mutation.path), mutation.mutated)
		return runCommand(command, args)
	} catch (error) {
		return { exit: undefined, error: error instanceof Error ? error.message : String(error) }
	}
}

/**
 * Restores every file and names the refusal when the host rejects a write.
 *
 * @param root - The working directory the paths resolve against.
 * @param mutations - The mutations to undo.
 * @returns The host's refusal message, or undefined when every file was written back.
 */
export function tryRestore(root: string, mutations: readonly Mutation[]): string | undefined {
	try {
		restoreFiles(root, mutations)
		return undefined
	} catch (error) {
		return error instanceof Error ? error.message : String(error)
	}
}

/**
 * Saves each file's original bytes and a manifest of their digests in a new directory.
 *
 * @param root - The working directory the backup root sits under.
 * @param mutations - The mutations whose originals to save.
 * @returns The directory that holds the saved bytes.
 */
export function saveOriginals(root: string, mutations: readonly Mutation[]): string {
	const base = resolve(root, BACKUP_ROOT)
	mkdirSync(base, { recursive: true })
	const directory = mkdtempSync(join(base, RUN_PREFIX))
	for (const [index, mutation] of mutations.entries()) {
		writeFileSync(join(directory, `${String(index)}.bak`), mutation.original)
	}
	writeFileSync(
		join(directory, MANIFEST),
		JSON.stringify(
			mutations.map((mutation, index) => ({
				path: mutation.path,
				backup: `${String(index)}.bak`,
				digest: digestBytes(mutation.original),
			})),
		),
	)
	return directory
}

/**
 * Lists the run directories an earlier run left under the backup root.
 *
 * @param root - The working directory the backup root sits under.
 * @returns The name of each run directory, sorted; empty when none remains.
 */
export function readLeftovers(root: string): readonly string[] {
	const base = resolve(root, BACKUP_ROOT)
	return existsSync(base)
		? readdirSync(base)
				.filter((name) => name.startsWith(RUN_PREFIX))
				.sort()
		: []
}

/**
 * Checks whether a value is one entry of a run directory's manifest.
 *
 * @param value - The parsed JSON value.
 * @returns True when the value names a path, a backup file with no directory part, and a digest.
 */
export function isManifestEntry(value: unknown): value is ManifestEntry {
	return (
		typeof value === 'object' &&
		value !== null &&
		'path' in value &&
		typeof value.path === 'string' &&
		'backup' in value &&
		typeof value.backup === 'string' &&
		value.backup !== '' &&
		basename(value.backup) === value.backup &&
		'digest' in value &&
		typeof value.digest === 'string'
	)
}

/**
 * Reads the manifest of a run directory.
 *
 * @param directory - The run directory.
 * @returns Each saved file in order, or undefined when the manifest is missing, is not JSON, or
 * holds anything but entries.
 */
export function readManifest(directory: string): readonly ManifestEntry[] | undefined {
	try {
		const parsed: unknown = JSON.parse(readFileSync(join(directory, MANIFEST), 'utf8'))
		return Array.isArray(parsed) && parsed.every(isManifestEntry) ? parsed : undefined
	} catch {
		return undefined
	}
}

/**
 * Writes each saved file's bytes back to its path and names the refusal when the host rejects a
 * write.
 *
 * @param root - The working directory the paths resolve against.
 * @param directory - The run directory that holds the saved bytes.
 * @param entries - The manifest entries to write back.
 * @returns The host's refusal message, or undefined when every file was written.
 */
export function writeSaved(
	root: string,
	directory: string,
	entries: readonly ManifestEntry[],
): string | undefined {
	try {
		for (const entry of entries) {
			writeFileSync(resolve(root, entry.path), readFileSync(join(directory, entry.backup)))
		}
		return undefined
	} catch (error) {
		return error instanceof Error ? error.message : String(error)
	}
}

/**
 * Restores the files a run directory saved and proves each digest from its manifest.
 *
 * @param root - The working directory the manifest paths resolve against.
 * @param argument - The run directory as the caller gave it.
 * @returns The exit code: 0 when every file is back and proven and the run directory is deleted, 2
 * when a saved file no longer matches its digest or a restore is not proven, 64 when the argument
 * is no run directory of this script or its manifest cannot be trusted.
 */
export function restoreRun(root: string, argument: string): number {
	const base = resolve(root, BACKUP_ROOT)
	const directory = resolve(root, argument)
	if (
		foldPath(dirname(directory), process.platform) !== foldPath(base, process.platform) ||
		!basename(directory).startsWith(RUN_PREFIX)
	) {
		console.error(
			`mutate: ${quote(argument)} is not a run directory under ${BACKUP_ROOT}; ${USAGE}`,
		)
		return 64
	}
	const entries = readManifest(directory)
	if (entries === undefined) {
		console.error(`mutate: ${quote(argument)} holds no readable ${MANIFEST}; ${USAGE}`)
		return 64
	}
	const outside = entries.filter((entry) => !isInside(root, resolve(root, entry.path)))
	if (outside.length > 0) {
		console.error(
			`mutate: ${MANIFEST} names a path outside the working directory: ${outside.map((entry) => quote(entry.path)).join(', ')}; nothing was written`,
		)
		return 64
	}
	const damaged = entries.filter(
		(entry) => digestFile(join(directory, entry.backup)) !== entry.digest,
	)
	if (damaged.length > 0) {
		console.error(
			`mutate: the saved bytes of ${damaged.map((entry) => entry.path).join(', ')} no longer match ${MANIFEST}; nothing was written`,
		)
		return 2
	}
	const refusal = writeSaved(root, directory, entries)
	const drift = entries.filter((entry) => digestFile(resolve(root, entry.path)) !== entry.digest)
	if (refusal !== undefined || drift.length > 0) {
		console.error(
			`mutate: restore not proven for ${drift.map((entry) => entry.path).join(', ')}${refusal === undefined ? '' : ` (${refusal})`}; the originals stay under ${directory}`,
		)
		return 2
	}
	rmSync(directory, { recursive: true, force: true })
	console.log(
		JSON.stringify({
			files: entries.map((entry) => ({ path: entry.path, digest: entry.digest })),
			restored: true,
		}),
	)
	return 0
}

/**
 * Runs the script on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 when the mutated run failed and the restored run passed or a `--restore`
 * is proven, 3 when either did not, 2 when a restore is not proven or the command cannot start, 64
 * on usage, an edit that does not resolve, or a run directory an earlier run left.
 */
export function main(argv: readonly string[]): number {
	const end = argv.indexOf('--')
	const own = end === -1 ? argv : argv.slice(0, end)
	const command = end === -1 ? [] : argv.slice(end + 1)
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(`mutate: ${unknown.join(', ')} is not a flag this script reads; ${USAGE}`)
		return 64
	}
	const missing = readMissingFlags(own, VALUE_FLAGS)
	if (missing.length > 0) {
		console.error(`mutate: ${missing.join(', ')} given with no value`)
		return 64
	}
	const restore = readOption(own, '--restore')
	if (restore !== undefined) {
		if (end !== -1 || own.includes('--edits') || readPositionals(own, VALUE_FLAGS).length > 0) {
			console.error(USAGE)
			return 64
		}
		return restoreRun(process.cwd(), restore)
	}
	const source = readOption(own, '--edits')
	const executable = command[0]
	if (
		source === undefined ||
		executable === undefined ||
		readPositionals(own, VALUE_FLAGS).length > 0
	) {
		console.error(USAGE)
		return 64
	}
	if (!existsSync(source) || !statSync(source).isFile()) {
		console.error(`mutate: ${quote(source)} is not a readable edit file; ${USAGE}`)
		return 64
	}
	const text = readFileSync(source, 'utf8')
	const edits = parseEdits(text)
	const strays = readStrays(text)
	if (edits.length === 0 || strays.length > 0) {
		console.error(
			`mutate: ${quote(source)} ${edits.length === 0 ? 'holds no complete edit block' : `has a line that opens no complete block: ${strays.map(quote).join(', ')}`}; a block is a "### path" line, a "reason:" line, and fenced "old:" and "new:" texts`,
		)
		return 64
	}
	const root = process.cwd()
	const leftovers = readLeftovers(root)
	if (leftovers.length > 0) {
		console.error(
			`mutate: an earlier run left its saved originals, so the tree may still be mutated; no file was touched and no command ran. Restore it first: ${leftovers.map((name) => `mutate.ts --restore ${BACKUP_ROOT}/${name}`).join('; ')}`,
		)
		return 64
	}
	const resolution = resolveMutations(root, edits)
	if (resolution.problems.length > 0) {
		console.error(
			`mutate: no file was touched and no command ran: ${resolution.problems.join('; ')}`,
		)
		return 64
	}
	const saved = saveOriginals(root, resolution.mutations)
	console.error(`mutate: originals saved under ${saved}`)
	const mutated = runMutated(root, resolution.mutations, executable, command.slice(1))
	const refusal = tryRestore(root, resolution.mutations)
	const drift = readDrift(root, resolution.mutations)
	if (refusal !== undefined || drift.length > 0) {
		console.error(
			`mutate: restore not proven for ${drift.join(', ')}${refusal === undefined ? '' : ` (${refusal})`}; the originals are under ${saved}`,
		)
		return 2
	}
	if (mutated.exit === undefined) {
		rmSync(saved, { recursive: true, force: true })
		console.error(`mutate: the command did not exit: ${mutated.error ?? 'unknown'}`)
		return 2
	}
	const restored = runCommand(executable, command.slice(1))
	rmSync(saved, { recursive: true, force: true })
	if (restored.exit === undefined) {
		console.error(`mutate: the restored run did not exit: ${restored.error ?? 'unknown'}`)
		return 2
	}
	console.log(
		JSON.stringify({
			edits: edits.length,
			files: resolution.mutations.map((mutation) => ({
				path: mutation.path,
				digest: digestBytes(mutation.original),
			})),
			mutatedExit: mutated.exit,
			restoredExit: restored.exit,
			restored: true,
		}),
	)
	return mutated.exit !== 0 && restored.exit === 0 ? 0 : 3
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
