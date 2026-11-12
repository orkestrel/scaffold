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
// Exit 0 with no hits, 3 with hits, 64 on usage. The script reads its flags with `parseArgs` in
// strict mode.
import type { ParseArgsOptionsConfig } from 'node:util'
import { readdirSync, readFileSync, realpathSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { parseArgs } from 'node:util'

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

/** Holds the usage line the script prints on a usage refusal. */
export const USAGE =
	'usage: pins.ts --version PRIOR [--range PRIOR_RANGE ...] [--paths src,tests,guides] [--json]'

/** Declares every flag the script reads, for `parseArgs`. */
export const OPTIONS: ParseArgsOptionsConfig = Object.freeze({
	version: Object.freeze({ type: 'string' }),
	range: Object.freeze({ type: 'string', multiple: true }),
	paths: Object.freeze({ type: 'string' }),
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
			allowPositionals: false,
		})
		return { success: true, value: { values, positionals } }
	} catch (error) {
		return { success: false, error: error instanceof Error ? error.message : String(error) }
	}
}

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
	return path.replaceAll('\\', '/')
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
 * Runs the sweep and prints its hits.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 with no hits, 3 with hits, 64 on usage.
 */
export function main(argv: readonly string[]): number {
	const parsed = parseArguments(argv)
	if (!parsed.success) {
		console.error(`pins: ${parsed.error}; ${USAGE}`)
		return 64
	}
	const { values } = parsed.value
	const version = typeof values.version === 'string' ? values.version : undefined
	const ranges = collectStrings(values.range)
	const paths = (typeof values.paths === 'string' ? values.paths : 'src,tests,guides').split(',')
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
	if (values.json === true) {
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
