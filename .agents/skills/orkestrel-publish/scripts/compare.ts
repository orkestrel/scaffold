// Compare the rebuilt dist/ against the published tarball on material content. Run from the
// publishing package's root after its build:
//   node .agents/skills/orkestrel-publish/scripts/compare.ts [--package NAME] [--version V] [--tarball PATH] [--dist dist] [--json]
// The package defaults to the manifest's name and the version to what the registry serves; --tarball
// compares against a local .tgz instead of fetching. Sourcemaps are excluded, a text file differs
// only when it differs with all whitespace removed, and a binary file differs on any byte. The
// summary lists the paths added, removed, and changed. Exit 0 when nothing material differs, 3 when
// something does, 2 when the tarball cannot be read, 64 on usage, including a flag the script does
// not read and the `--flag=value` form.
import type { SpawnSyncReturns } from 'node:child_process'
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, realpathSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { gunzipSync } from 'node:zlib'

/** Holds the byte size of one tar block. */
export const BLOCK = 512

/** Names the directory every npm tarball entry sits under. */
export const PACKAGE_PREFIX = 'package/'

/** Names the directories every tree walk skips by default. */
export const SKIPPED_DIRECTORIES: ReadonlySet<string> = new Set([
	'node_modules',
	'.git',
	'dist',
	'tmp',
	'.orkestrel',
	'.idea',
])

/** Holds the empty skip set, because a dist tree holds nothing a walk skips, so every emitted file counts. */
export const NOTHING_SKIPPED: ReadonlySet<string> = new Set()

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = ['--package', '--version', '--tarball', '--dist', '--json']

/** Holds the usage line the script prints on a usage refusal. */
export const USAGE =
	'usage: compare.ts [--package NAME] [--version V] [--tarball PATH] [--dist dist] [--json]'

/** Describes the name and version a package manifest declares. */
export interface Manifest {
	readonly name: string | undefined
	readonly version: string | undefined
}

/** Describes the tarball a run compares against, or why none could be read. */
export interface Source {
	readonly archive: Buffer | undefined
	readonly version: string | undefined
	readonly failure: string | undefined
}

/** Describes the reader's position and the files found so far in one tar archive. */
export interface TarState {
	readonly next: number
	readonly name: string | undefined
	readonly files: ReadonlyArray<readonly [string, Buffer]>
	readonly done: boolean
}

/** Describes one file a tree walk found, with the modification time the walk read. */
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
 * Normalizes a host path to forward slashes.
 *
 * @param path - A host path.
 * @returns The same path with every backslash replaced by a slash.
 */
export function normalizeSlashes(path: string): string {
	return path.split('\\').join('/')
}

/**
 * Reads the value that follows a flag.
 *
 * @remarks
 * Reads `--flag value` pairs: the first occurrence of a flag wins, a following value that opens
 * with `--` is a missing value, and the `--flag=value` form is not read.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--package`.
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
 * Reads the arguments before a bare `--`, which opens a command a script passes on. A `--flag=value`
 * argument is unknown, because the script reads no such form.
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
 * Lists every regular file beneath a directory, skipping the directories named.
 *
 * @remarks
 * A skipped name matches a directory at any depth, exactly and case-sensitively.
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
 * Parses a whole text as one JSON object.
 *
 * @param text - A JSON document, formatted or not, such as a manifest.
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

/**
 * Reads the name and version a directory's package manifest declares.
 *
 * @param directory - The directory that holds `package.json`.
 * @returns The name and version, each undefined when the manifest is absent, unreadable, or lacks it.
 */
export function readManifest(directory: string): Manifest {
	const path = join(directory, 'package.json')
	if (!existsSync(path)) return { name: undefined, version: undefined }
	try {
		const record = parseJsonRecord(readFileSync(path, 'utf8'))
		return { name: readString(record, 'name'), version: readString(record, 'version') }
	} catch {
		return { name: undefined, version: undefined }
	}
}

/**
 * Reads one value npm printed as JSON.
 *
 * @param text - npm's output with the surrounding whitespace removed.
 * @returns The text without its enclosing quotes, or undefined when nothing remains.
 */
export function readField(text: string): string | undefined {
	const stripped = text.replace(/^"|"$/gu, '')
	return stripped === '' ? undefined : stripped
}

/**
 * Reads a NUL-terminated text field out of a tar header block.
 *
 * @param header - The header block.
 * @param start - The field's first byte.
 * @param length - The field's byte length.
 * @returns The field's text up to its first NUL.
 */
export function readHeaderText(header: Buffer, start: number, length: number): string {
	const slice = header.subarray(start, start + length)
	const end = slice.indexOf(0)
	return slice.subarray(0, end === -1 ? slice.length : end).toString('utf8')
}

/**
 * Reads the `path` record out of a pax extended header.
 *
 * @param data - The header's data blocks, each record written as `LENGTH KEY=VALUE` and a line feed.
 * @param offset - The byte where the search starts. Default: 0.
 * @returns The path the first `path=` record names, or undefined when no record does or one is malformed.
 */
export function readPaxPath(data: Buffer, offset = 0): string | undefined {
	if (offset >= data.length) return undefined
	const space = data.indexOf(0x20, offset)
	if (space === -1) return undefined
	const length = Number(data.subarray(offset, space).toString('utf8'))
	if (!Number.isFinite(length) || length <= 0) return undefined
	const record = data.subarray(space + 1, offset + length - 1).toString('utf8')
	return record.startsWith('path=')
		? record.slice('path='.length)
		: readPaxPath(data, offset + length)
}

/**
 * Advances a tar reader by the block at one offset.
 *
 * @remarks
 * A tar entry occupies a header block and the data blocks its size names, so a step ignores every
 * block offset an earlier entry already consumed.
 *
 * @param archive - The uncompressed archive.
 * @param state - The reader's state before this block.
 * @param offset - The block's first byte.
 * @returns The state after the block: a regular file added, a pax or GNU long name remembered for the
 * next entry, or the reader done at the first all-zero block.
 */
export function stepTar(archive: Buffer, state: TarState, offset: number): TarState {
	if (state.done || offset < state.next) return state
	const header = archive.subarray(offset, offset + BLOCK)
	if (header.every((byte) => byte === 0)) return { ...state, done: true }
	const size = Number.parseInt(readHeaderText(header, 124, 12).trim() || '0', 8)
	const type = String.fromCharCode(header[156] ?? 0)
	const magic = readHeaderText(header, 257, 6)
	const prefix = magic.startsWith('ustar') ? readHeaderText(header, 345, 155) : ''
	const shortName = readHeaderText(header, 0, 100)
	const name = state.name ?? (prefix === '' ? shortName : `${prefix}/${shortName}`)
	const data = archive.subarray(offset + BLOCK, offset + BLOCK + size)
	const next = offset + BLOCK + Math.ceil(size / BLOCK) * BLOCK
	return {
		next,
		name:
			type === 'x'
				? readPaxPath(data)
				: type === 'L'
					? readHeaderText(data, 0, data.length)
					: undefined,
		files:
			type === '0' || type === '\0' ? [...state.files, [name, Buffer.from(data)]] : state.files,
		done: !Number.isFinite(next),
	}
}

/**
 * Reads the regular files out of an uncompressed tar archive.
 *
 * @param archive - The uncompressed archive.
 * @returns Each file's path and bytes; a later entry of the same name replaces an earlier one at the
 * earlier position, as a map write does.
 */
export function readTar(archive: Buffer): ReadonlyMap<string, Buffer> {
	const offsets = Array.from(
		{ length: Math.floor(archive.length / BLOCK) },
		(_, index) => index * BLOCK,
	)
	return new Map(
		offsets.reduce<TarState>((state, offset) => stepTar(archive, state, offset), {
			next: 0,
			name: undefined,
			files: [],
			done: false,
		}).files,
	)
}

/**
 * Unpacks a gzip-compressed tar archive.
 *
 * @param archive - The compressed archive.
 * @returns The regular files it holds, or the error that stopped the unpacking.
 */
export function unpackTar(archive: Buffer): ReadonlyMap<string, Buffer> | Error {
	try {
		return readTar(gunzipSync(archive))
	} catch (error) {
		return error instanceof Error ? error : new Error(String(error))
	}
}

/**
 * Reads one value from npm's view of the registry.
 *
 * @param args - The npm arguments, such as `['view', 'name', 'version', '--json']`.
 * @returns The value npm printed, or undefined when npm exited nonzero or printed nothing.
 */
export function readNpmValue(args: readonly string[]): string | undefined {
	const result = runNpm(args)
	return result.status === 0 ? readField(result.stdout.trim()) : undefined
}

/**
 * Fetches a tarball over HTTP.
 *
 * @param url - The tarball's address.
 * @returns The response body, or undefined when the request failed or answered a non-success status.
 */
export async function fetchTarball(url: string): Promise<Buffer | undefined> {
	try {
		const response = await fetch(url)
		if (!response.ok) return undefined
		return Buffer.from(await response.arrayBuffer())
	} catch {
		return undefined
	}
}

/**
 * Reads the tarball a run compares against.
 *
 * @param name - The package name to look up when no tarball file is given.
 * @param requested - The version to compare, or undefined for the one the registry serves.
 * @param tarball - A local `.tgz` path, or undefined to fetch from the registry.
 * @returns The archive with its version, or the reason none could be read.
 */
export async function readSource(
	name: string,
	requested: string | undefined,
	tarball: string | undefined,
): Promise<Source> {
	if (tarball !== undefined) {
		return existsSync(tarball)
			? { archive: readFileSync(tarball), version: requested, failure: undefined }
			: { archive: undefined, version: requested, failure: `${tarball} does not exist` }
	}
	const version = requested ?? readNpmValue(['view', name, 'version', '--json'])
	const url =
		version === undefined
			? undefined
			: readNpmValue(['view', `${name}@${version}`, 'dist.tarball', '--json'])
	if (version === undefined || url === undefined) {
		return {
			archive: undefined,
			version,
			failure: `the registry served no tarball for ${name}${version === undefined ? '' : `@${version}`}`,
		}
	}
	const fetched = await fetchTarball(url)
	return fetched === undefined
		? { archive: undefined, version, failure: `fetching ${url} failed` }
		: { archive: fetched, version, failure: undefined }
}

/**
 * Checks whether a published path counts in the comparison.
 *
 * @param path - A path inside the tarball or the dist tree.
 * @returns True if the path is not a sourcemap; false otherwise.
 */
export function isMaterial(path: string): boolean {
	return !path.endsWith('.map')
}

/**
 * Checks whether two versions of one file differ materially.
 *
 * @param left - One version's bytes.
 * @param right - The other version's bytes.
 * @returns True if a file holding a NUL byte differs on any byte, or a text file differs with all
 * whitespace removed; false otherwise.
 */
export function differs(left: Buffer, right: Buffer): boolean {
	if (left.includes(0) || right.includes(0)) return !left.equals(right)
	return left.toString('utf8').replace(/\s+/gu, '') !== right.toString('utf8').replace(/\s+/gu, '')
}

/**
 * Runs the comparison and prints its summary.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 when nothing material differs, 3 when something does, 2 when the tarball
 * cannot be read, 64 on usage.
 */
export async function main(argv: readonly string[]): Promise<number> {
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(
			`compare: unknown flag ${unknown.join(', ')}; give each flag and its value as separate arguments\n${USAGE}`,
		)
		return 64
	}
	const missing = readMissingFlags(argv, ['--package', '--version', '--tarball', '--dist'])
	if (missing.length > 0) {
		console.error(`compare: ${missing.join(', ')} given with no value`)
		return 64
	}
	const manifest = readManifest('.')
	const name = readOption(argv, '--package') ?? manifest.name
	const dist = readOption(argv, '--dist') ?? 'dist'
	const tarball = readOption(argv, '--tarball')
	if (
		name === undefined ||
		!existsSync(dist) ||
		(argv.includes('--tarball') && tarball === undefined)
	) {
		console.error(USAGE)
		return 64
	}
	const source = await readSource(name, readOption(argv, '--version'), tarball)
	const { archive, version } = source
	if (archive === undefined) {
		console.error(`compare: ${source.failure}`)
		return 2
	}
	const entries = unpackTar(archive)
	if (entries instanceof Error) {
		console.error(`compare: the tarball could not be read: ${entries.message}`)
		return 2
	}
	const prefixed = `${PACKAGE_PREFIX}${dist}/`
	const published = new Map(
		[...entries].flatMap(([path, content]) =>
			path.startsWith(prefixed) && isMaterial(path)
				? [[path.slice(prefixed.length), content] as const]
				: [],
		),
	)
	const local = new Map(
		listFiles(dist, NOTHING_SKIPPED).flatMap(({ path }) => {
			const key = normalizeSlashes(relative(dist, path))
			return isMaterial(key) ? [[key, readFileSync(path)] as const] : []
		}),
	)
	const added = [...local.keys()].filter((key) => !published.has(key)).sort()
	const removed = [...published.keys()].filter((key) => !local.has(key)).sort()
	const changed = [...local.keys()]
		.filter((key) => {
			const other = published.get(key)
			const mine = local.get(key)
			return other !== undefined && mine !== undefined && differs(mine, other)
		})
		.sort()
	const material = added.length + removed.length + changed.length > 0
	const summary = {
		package: name,
		version,
		tarball,
		dist,
		compared: published.size,
		added,
		removed,
		changed,
		material,
	}
	if (argv.includes('--json')) console.log(JSON.stringify(summary))
	else {
		console.log(
			`compare: ${name}${version === undefined ? '' : `@${version}`} — ${published.size} published file(s), ${added.length} added, ${removed.length} removed, ${changed.length} changed`,
		)
		for (const path of added) console.log(`compare: added ${path}`)
		for (const path of removed) console.log(`compare: removed ${path}`)
		for (const path of changed) console.log(`compare: changed ${path}`)
	}
	return material ? 3 : 0
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	main(process.argv.slice(2)).then((code) => {
		process.exitCode = code
	})
}
