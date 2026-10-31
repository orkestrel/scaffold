// Sweep source, tests, and guides for a prior version or range literal after a bump or a re-pin.
// Run from the publishing package's root:
//   node .agents/skills/orkestrel-publish/scripts/pins.ts --version 0.0.76 [--range ^0.0.16 ...] [--paths src,tests,guides] [--json]
// `--range` repeats. A version hit is the literal bounded by characters other than digits and dots,
// so `~0.0.76` and `"0.0.76"` both hit and `0.0.760` does not. A range that is one comparator over
// one version (`^8.3.0`, `~8.3.0`, `>=8.3.0`, `v8.3.0`) hits its bare version in any form, bounded the
// same way, so `--range ^8.3.0` hits `~8.3.0` and `serves 8.3.0` and misses `^8.3.1`; any other
// range (`>=1.2.0 <2.0.0`, `8.x`) hits its literal bounded the same way and not preceded by another
// range operator. Each matching line prints once as path:line: text, naming the first requested
// literal that matched in the order --version then each --range, so the operator rules on it.
// Exit 0 with no hits, 3 with hits, 64 on usage, including a flag the script does not read and the
// `--flag=value` form.
import { readdirSync, readFileSync, realpathSync, statSync } from 'node:fs'
import { join } from 'node:path'

/** Matches the file extensions the sweep skips as binary. */
export const BINARY = /\.(png|jpg|jpeg|gif|webp|ico|woff2?|ttf|otf|eot|zip|tgz|gz|pdf|wasm)$/u

/** Matches a range that is one comparator over one full version and captures the version. */
export const COMPARATOR =
	/^(?:\^|~|>=|>|<=|<|=)?v?(\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)$/u

/** Names the directories every tree walk skips. */
export const SKIPPED_DIRECTORIES: ReadonlySet<string> = new Set([
	'node_modules',
	'.git',
	'dist',
	'tmp',
	'.orkestrel',
	'.idea',
])

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = ['--version', '--range', '--paths', '--json']

/** Holds the usage line the script prints on a usage refusal. */
export const USAGE =
	'usage: pins.ts --version PRIOR [--range PRIOR_RANGE ...] [--paths src,tests,guides] [--json]'

/** Describes one requested literal and the pattern that finds it in a line. */
export interface Literal {
	readonly literal: string
	readonly pattern: RegExp
}

/** Describes one line that carries a requested literal. */
export interface Hit {
	readonly path: string
	readonly line: number
	readonly literal: string
	readonly text: string
}

/** Describes one file a tree walk found, with the modification time the walk read. */
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
 * @param name - The flag, such as `--paths`.
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
 * Reads every value that follows a repeatable flag.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--range`.
 * @returns The values in order, empty when the flag never appears.
 */
export function readOptions(argv: readonly string[], name: string): readonly string[] {
	return argv.flatMap((argument, index) => {
		const value = argv[index + 1]
		return argument === name && value !== undefined && !value.startsWith('--') ? [value] : []
	})
}

/**
 * Lists every regular file beneath a directory, skipping the directories the sweep never reads.
 *
 * @remarks
 * A skipped name matches a directory at any depth, exactly and case-sensitively, so a
 * `src/dist/` directory is skipped with the build output and a `Node_Modules/` directory is not.
 *
 * @param directory - The directory to walk.
 * @param skipped - The directory names to skip. Default: {@link SKIPPED_DIRECTORIES}.
 * @returns Each file's forward-slash path and modification time, in walk order.
 * @throws Thrown when `directory` does not exist or cannot be read; check `statSync` first.
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
 * Escapes a literal for use inside a regular expression.
 *
 * @param literal - The text to match exactly.
 * @returns The text with every regular expression metacharacter backslash-escaped.
 */
export function escapePattern(literal: string): string {
	return literal.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
}

/**
 * Builds the pattern that finds a version bounded by characters other than digits and dots.
 *
 * @param version - The version literal.
 * @returns The pattern.
 */
export function buildVersionPattern(version: string): RegExp {
	return new RegExp(`(?<![0-9.])${escapePattern(version)}(?![0-9.])`, 'u')
}

/**
 * Builds the literal for a requested version.
 *
 * @param literal - The version as the operator wrote it.
 * @returns The literal with its bounded pattern.
 */
export function buildVersionLiteral(literal: string): Literal {
	return { literal, pattern: buildVersionPattern(literal) }
}

/**
 * Builds the literal for a requested range.
 *
 * @param literal - The range as the operator wrote it.
 * @returns A one-comparator range matched by its bare version in any form, any other range matched as
 * its own text not preceded by a range operator.
 */
export function buildRangeLiteral(literal: string): Literal {
	const version = COMPARATOR.exec(literal)?.[1]
	if (version !== undefined) return { literal, pattern: buildVersionPattern(version) }
	return {
		literal,
		pattern: new RegExp(`(?<![0-9.^~<>=])${escapePattern(literal)}(?![0-9.])`, 'u'),
	}
}

/**
 * Finds the lines of one file that carry a requested literal.
 *
 * @param path - The file to read.
 * @param literals - The literals to look for, in the order that names a line's literal.
 * @returns One hit per matching line, naming the first literal that matched; none for a binary file.
 */
export function sweepFile(path: string, literals: readonly Literal[]): readonly Hit[] {
	const content = readFileSync(path)
	if (content.includes(0)) return []
	return content
		.toString('utf8')
		.split(/\r\n|\n/)
		.flatMap((text, index) => {
			const match = literals.find((entry) => entry.pattern.test(text))
			return match === undefined
				? []
				: [{ path, line: index + 1, literal: match.literal, text: text.trim() }]
		})
}

/**
 * Runs the sweep and prints its hits.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 with no hits, 3 with hits, 64 on usage.
 */
export function main(argv: readonly string[]): number {
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(
			`pins: unknown flag ${unknown.join(', ')}; give each flag and its value as separate arguments\n${USAGE}`,
		)
		return 64
	}
	const missing = readMissingFlags(argv, ['--version', '--range', '--paths'])
	if (missing.length > 0) {
		console.error(`pins: ${missing.join(', ')} given with no value`)
		return 64
	}
	const version = readOptions(argv, '--version')[0]
	const ranges = readOptions(argv, '--range')
	const paths = (readOptions(argv, '--paths')[0] ?? 'src,tests,guides').split(',')
	if (version === undefined && ranges.length === 0) {
		console.error(USAGE)
		return 64
	}
	const literals = [
		...(version === undefined ? [] : [buildVersionLiteral(version)]),
		...ranges.map(buildRangeLiteral),
	]
	const present = paths.filter((path) => {
		try {
			return statSync(path).isDirectory()
		} catch {
			return false
		}
	})
	const skipped = paths.filter((path) => !present.includes(path))
	for (const path of skipped) console.error(`pins: ${path} is not a directory; skipped`)
	const hits = present
		.flatMap((directory) => listFiles(directory).map((file) => file.path))
		.filter((file) => !BINARY.test(file))
		.flatMap((file) => sweepFile(file, literals))
	const names = literals.map((entry) => entry.literal)
	if (argv.includes('--json')) {
		console.log(JSON.stringify({ literals: names, paths: present, skipped, hits }))
	} else {
		for (const hit of hits) console.log(`${hit.path}:${hit.line}: ${hit.text}`)
		console.log(`pins: ${hits.length} hit(s) for ${names.join(', ')} under ${present.join(', ')}`)
	}
	return hits.length === 0 ? 0 : 3
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
