// What the skill scripts share: argument reading, tree walking, JSON line reading, and the npm
// command. This module runs nothing. Import it from a sibling or another skill's script with the
// `.ts` extension, for example `import { readOption } from '../../orkestrel-dispatch/scripts/helpers.ts'`.
import type { SpawnSyncReturns } from 'node:child_process'
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'

/** Names the directories every tree walk in a skill script skips. */
export const SKIPPED_DIRECTORIES: ReadonlySet<string> = new Set([
	'node_modules',
	'.git',
	'dist',
	'tmp',
	'.orkestrel',
	'.idea',
])

/** Describes one file a tree walk found, with the modification time the sweep reads. */
export interface WalkedFile {
	readonly path: string
	readonly modified: number
}

/** Describes how to spawn npm on this host without a shell where the CLI entry is present. */
export interface NpmCommand {
	readonly file: string
	readonly prefix: readonly string[]
	readonly shell: boolean
}

/**
 * Reads the value that follows a flag.
 *
 * @remarks
 * Every skill script reads `--flag value` pairs: the first occurrence of a flag wins, a following
 * value that opens with `--` is a missing value, and the `--flag=value` form is not read.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--journal`.
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
 * Reads every value that follows a repeatable flag.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--range`.
 * @returns The values in order, empty when the flag never appears.
 */
export function readOptions(argv: readonly string[], name: string): readonly string[] {
	const values: string[] = []
	argv.forEach((argument, index) => {
		const value = argv[index + 1]
		if (argument === name && value !== undefined && !value.startsWith('--')) values.push(value)
	})
	return values
}

/**
 * Reads the values that follow a flag up to the next flag.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--tree`.
 * @returns The values between the flag and the next `--` argument, empty when the flag is absent.
 */
export function readList(argv: readonly string[], name: string): readonly string[] {
	const index = argv.indexOf(name)
	if (index === -1) return []
	const values: string[] = []
	for (const argument of argv.slice(index + 1)) {
		if (argument.startsWith('--')) break
		values.push(argument)
	}
	return values
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
 * Lists every regular file beneath a directory, skipping the directories skill scripts never read.
 *
 * @remarks
 * A skipped name matches a directory at any depth, exactly and case-sensitively, so a
 * `src/dist/` directory is skipped with the build output and a `Node_Modules/` directory is not.
 *
 * @param directory - The directory to walk.
 * @param skipped - The directory names to skip. Default: {@link SKIPPED_DIRECTORIES}.
 * @returns Each file's forward-slash path and modification time, in walk order.
 * @throws Thrown when `directory` does not exist or cannot be read; check `existsSync` first.
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
 * Reads the last non-empty line of a text as a JSON object.
 *
 * @param text - Text whose last line a script printed as JSON.
 * @returns The parsed object, or undefined when the last line is not a JSON object.
 */
export function readJsonObject(text: string): Record<string, unknown> | undefined {
	const line = text
		.split(/\r\n|\n/)
		.filter((candidate) => candidate.trim() !== '')
		.at(-1)
	if (line === undefined) return undefined
	try {
		const parsed: unknown = JSON.parse(line)
		if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
			return Object.fromEntries(Object.entries(parsed))
		}
	} catch {}
	return undefined
}

/**
 * Parses a whole text as one JSON object.
 *
 * @param text - A JSON document, formatted or not, such as a manifest or `npm view --json` output.
 * @returns The parsed object, or undefined when the text is not a JSON object.
 */
export function parseJsonRecord(text: string): Record<string, unknown> | undefined {
	try {
		const parsed: unknown = JSON.parse(text)
		if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
			return Object.fromEntries(Object.entries(parsed))
		}
	} catch {}
	return undefined
}

/**
 * Reads a string member of a record.
 *
 * @param record - The record, or undefined.
 * @param key - The member name.
 * @returns The string, or undefined when the member is absent or not a string.
 */
export function readString(
	record: Record<string, unknown> | undefined,
	key: string,
): string | undefined {
	const value = record?.[key]
	return typeof value === 'string' ? value : undefined
}

/**
 * Reads a finite number member of a record.
 *
 * @param record - The record, or undefined.
 * @param key - The member name.
 * @returns The number, or undefined when the member is absent, not a number, or not finite.
 */
export function readNumber(
	record: Record<string, unknown> | undefined,
	key: string,
): number | undefined {
	const value = record?.[key]
	return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

/**
 * Resolves the npm command for this host.
 *
 * @remarks
 * The `npm-cli.js` entry beside the running Node binary spawns without a shell on every host; the
 * `npm` shim on Windows is a `.cmd` file that needs one, so that path is the fallback alone.
 *
 * @returns The file to spawn, the arguments that precede npm's own, and whether a shell is needed.
 */
export function resolveNpm(): NpmCommand {
	const cli = join(dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js')
	if (existsSync(cli)) return { file: process.execPath, prefix: [cli], shell: false }
	return { file: 'npm', prefix: [], shell: process.platform === 'win32' }
}

/**
 * Runs npm with the given arguments and returns the finished child.
 *
 * @param args - The npm arguments, such as `['view', '@orkestrel/scaffold', 'version']`.
 * @param cwd - The working directory. Default: the current directory.
 * @returns The spawn result with `utf8` stdout and stderr.
 */
export function runNpm(args: readonly string[], cwd?: string): SpawnSyncReturns<string> {
	const npm = resolveNpm()
	return spawnSync(npm.file, [...npm.prefix, ...args], {
		encoding: 'utf8',
		windowsHide: true,
		shell: npm.shell,
		maxBuffer: 64 * 1024 * 1024,
		...(cwd === undefined ? {} : { cwd }),
	})
}
