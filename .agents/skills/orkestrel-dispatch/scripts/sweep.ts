// Campaign artifact sweep. Run from the checkout root with Node's type stripping:
//   node .agents/skills/orkestrel-dispatch/scripts/sweep.ts --report
//   node .agents/skills/orkestrel-dispatch/scripts/sweep.ts --tmp [--older-than MINUTES]
//   node .agents/skills/orkestrel-dispatch/scripts/sweep.ts --unit UNIT [--delete]
// --report lists leftovers under tmp/ and .orkestrel/ by age and deletes nothing. It also checks
// every .md file under .orkestrel/: a backticked repository-relative path that git ignores prints
// `<file>:<line> cites ignored path <path>` (a path git tracks is never reported, nor is a glob or
// placeholder whose literal prefix git tracks), and an absolute machine path on a line prints
// `<file>:<line> names a machine path`. Both lines are report-only.
// --tmp deletes launch files older than the threshold (default 60 minutes), removes emptied
// directories, and refuses while any launch file changed in the last 2 minutes.
// --unit lists one accepted unit's files under the launch directories (the brief, report, claims,
// journal, errors, status, pid, and last-message files whose name is UNIT followed by `-` or `.`), and
// --delete removes them, refusing while one changed in the last 2 minutes.
// --tmp and --unit --delete never delete a file git tracks: each prints `kept tracked <path>` and the
// refusal ignores a tracked file; --unit alone marks a tracked file in its listing.
// Name one mode per run; the script reads its flags with `parseArgs` in strict mode. Exit 0 on success, 2 when a deletion is refused, 64 on usage.
import type { ParseArgsOptionsConfig } from 'node:util'
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, realpathSync, rmSync, statSync } from 'node:fs'
import { basename, join } from 'node:path'
import { parseArgs } from 'node:util'

/** Lists the directories under `tmp/` that hold launch files. */
export const LAUNCH_DIRECTORIES: readonly string[] = [
	'tmp/units',
	'tmp/cursor',
	'tmp/codex',
	'tmp/claude',
	'tmp/probes',
	'tmp/type',
	'tmp/captures',
]

/** Holds the milliseconds within which a changed launch file counts as still in use. */
export const RECENT_MS = 2 * 60_000

/** Holds the minutes a launch file must age before `--tmp` deletes it, when the call gives no threshold. */
export const DEFAULT_THRESHOLD = 60

/** Names the directories a tree walk skips. */
export const SKIPPED_DIRECTORIES: ReadonlySet<string> = new Set([
	'node_modules',
	'.git',
	'dist',
	'tmp',
	'.orkestrel',
	'.idea',
])

/** Names no directory: a launch directory holds nothing a walk skips, so every file beneath it counts. */
export const NOTHING_SKIPPED: ReadonlySet<string> = new Set()

/** Holds the buffer size for git's output, which the repository's file count bounds. */
export const GIT_BUFFER = 64 * 1024 * 1024

/**
 * Matches an absolute machine path: a drive-letter path, or one that opens `/Users/`, `/home/`, or
 * `~/`. The lookbehind keeps `https://`, `src/home/`, and `./home/` from matching.
 */
export const MACHINE_PATH = /(?<![\w.-])(?:[A-Za-z]:[\\/]|\/(?:Users|home)\/|~\/)/u

/** Matches one backticked token in a line. */
export const BACKTICKED = /`([^`\n]+)`/gu

/** Matches the first glob or placeholder character in a path. */
export const PLACEHOLDER = /[*?<{]/u

/** Holds the usage line printed when a call names an unknown mode. */
export const USAGE =
	'usage: sweep.ts --report | --tmp [--older-than MINUTES] | --unit UNIT [--delete]'

/** Declares every flag the script reads, for `parseArgs`. */
export const OPTIONS: ParseArgsOptionsConfig = Object.freeze({
	unit: Object.freeze({ type: 'string' }),
	'older-than': Object.freeze({ type: 'string' }),
	report: Object.freeze({ type: 'boolean' }),
	tmp: Object.freeze({ type: 'boolean' }),
	delete: Object.freeze({ type: 'boolean' }),
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

/** Describes one file a tree walk found, with the modification time the sweep reads. */
export interface WalkedFile {
	readonly path: string
	readonly modified: number
}

/** Describes a backticked repository path: the path, whether it names a directory, and its glob prefix. */
export interface Citation {
	readonly path: string
	readonly directory: boolean
	readonly prefix: string | undefined
}

/** Describes one report finding: a machine path when the citation is absent, a cited path otherwise. */
export interface Finding {
	readonly file: string
	readonly line: number
	readonly citation: Citation | undefined
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
 * Formats a modification time as its UTC day.
 *
 * @param modified - A time in milliseconds since the epoch.
 * @returns The day as `YYYY-MM-DD`.
 */
export function formatDay(modified: number): string {
	return new Date(modified).toISOString().slice(0, 10)
}

/**
 * Reports how many files a launch directory holds and the age of the oldest.
 *
 * @param directory - The directory to report on.
 * @returns The report line, or undefined when the directory is absent or empty.
 */
export function reportDirectory(directory: string): string | undefined {
	if (!existsSync(directory)) return undefined
	const files = listFiles(directory, NOTHING_SKIPPED)
	if (files.length === 0) return undefined
	const oldest = files.reduce((low, file) => Math.min(low, file.modified), Number.POSITIVE_INFINITY)
	return `sweep: ${directory} holds ${files.length} file(s), oldest ${formatDay(oldest)}`
}

/**
 * Lists the campaign directories under `.orkestrel/`.
 *
 * @returns Each directory's path, or nothing when `.orkestrel/` is absent.
 */
export function listCampaignDirectories(): readonly string[] {
	if (!existsSync('.orkestrel')) return []
	return readdirSync('.orkestrel', { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => join('.orkestrel', entry.name))
}

/**
 * Reports the ecosystem files that sit directly under `.orkestrel/`.
 *
 * @returns The report line, or undefined when there are none.
 */
export function reportCampaignFiles(): string | undefined {
	if (!existsSync('.orkestrel')) return undefined
	const files = readdirSync('.orkestrel', { withFileTypes: true }).filter((entry) => entry.isFile())
	if (files.length === 0) return undefined
	return `sweep: .orkestrel holds ${files.length} ecosystem file(s): ${files.map((entry) => entry.name).join(', ')}`
}

/**
 * Removes every empty directory beneath a directory, deepest first.
 *
 * @param directory - The directory whose empty descendants are removed; the directory itself stays.
 */
export function removeEmptyDirectories(directory: string): void {
	for (const entry of readdirSync(directory, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue
		const path = join(directory, entry.name)
		removeEmptyDirectories(path)
		if (readdirSync(path).length === 0) rmSync(path, { recursive: true })
	}
}

/**
 * Parses the `--older-than` threshold in minutes.
 *
 * @param text - The value after `--older-than`, or undefined when the flag is absent.
 * @returns The default threshold when the flag is absent, the number when it is finite and above 0,
 * and undefined otherwise.
 */
export function parseThreshold(text: string | undefined): number | undefined {
	if (text === undefined) return DEFAULT_THRESHOLD
	const value = Number(text)
	return Number.isFinite(value) && value > 0 ? value : undefined
}

/**
 * Lists the files git tracks beneath a scope, as forward-slash paths from the root.
 *
 * @remarks
 * Any git failure reads as nothing tracked, so the run keeps its old behavior.
 *
 * @param scope - The paths to list beneath; the whole repository when empty.
 * @returns The tracked paths.
 */
export function listTracked(scope: readonly string[]): readonly string[] {
	const args = ['ls-files', '-z', ...(scope.length === 0 ? [] : ['--', ...scope])]
	const run = spawnSync('git', args, { encoding: 'utf8', windowsHide: true, maxBuffer: GIT_BUFFER })
	if (run.status !== 0) return []
	return run.stdout.split('\0').filter((path) => path !== '')
}

/**
 * Names the probes git ignores, from one batched `git check-ignore`.
 *
 * @remarks
 * Status 0 and 1 both answer, and any other status reads as nothing ignored.
 *
 * @param probes - The paths to ask about.
 * @returns The probes git ignores.
 */
export function readIgnored(probes: readonly string[]): ReadonlySet<string> {
	if (probes.length === 0) return new Set()
	const run = spawnSync('git', ['check-ignore', '--stdin', '-z'], {
		encoding: 'utf8',
		windowsHide: true,
		maxBuffer: GIT_BUFFER,
		input: probes.join('\0'),
	})
	if (run.status !== 0 && run.status !== 1) return new Set()
	return new Set(run.stdout.split('\0').filter((path) => path !== ''))
}

/**
 * Reads a backticked token as a repository-relative citation.
 *
 * @remarks
 * A token counts when it has no whitespace, contains `/`, and is no URL; the path stops at its first
 * glob or placeholder character and drops a trailing `/`. A machine path, a path outside the
 * repository, and a backslash path are no citation.
 *
 * @param token - The text between two backticks.
 * @returns The citation, or undefined when the token is none.
 */
export function readCitation(token: string): Citation | undefined {
	if (/\s/u.test(token) || !token.includes('/') || token.includes('://')) return undefined
	const stop = token.search(PLACEHOLDER)
	const cut = (stop === -1 ? token : token.slice(0, stop)).replace(/^\.\//u, '')
	const path = cut.replace(/\/+$/u, '')
	if (path === '' || /^(?:\/|~|\.\.(?:\/|$)|-|[A-Za-z]:)/u.test(path) || path.includes('\\')) {
		return undefined
	}
	return { path, directory: cut.endsWith('/'), prefix: stop === -1 ? undefined : cut }
}

/**
 * Lists the findings a campaign Markdown file carries: machine paths and backticked citations.
 *
 * @param file - The Markdown file to read.
 * @returns Each finding with its file and line, a machine path before the citations of its line.
 */
export function listFindings(file: string): readonly Finding[] {
	const lines = readFileSync(file, 'utf8').split(/\r\n|\n/u)
	return lines.flatMap((text, index) => {
		const line = index + 1
		const machine = MACHINE_PATH.test(text) ? [{ file, line, citation: undefined }] : []
		const cited = [...text.matchAll(BACKTICKED)].flatMap((match) => {
			const citation = readCitation(match[1] ?? '')
			return citation === undefined ? [] : [{ file, line, citation }]
		})
		return [...machine, ...cited]
	})
}

/**
 * Builds the path git is asked about for a citation.
 *
 * @param citation - The citation.
 * @returns The path, with a trailing `/` when the citation names a directory.
 */
export function probeOf(citation: Citation): string {
	return citation.directory ? `${citation.path}/` : citation.path
}

/**
 * Checks whether git tracks a citation's path, a file beneath it, or a file its glob prefix opens.
 *
 * @param citation - The citation.
 * @param tracked - The tracked paths.
 * @returns True if a tracked path covers the citation; false otherwise.
 */
export function isCovered(citation: Citation, tracked: readonly string[]): boolean {
	return tracked.some(
		(path) =>
			path === citation.path ||
			path.startsWith(`${citation.path}/`) ||
			(citation.prefix !== undefined && path.startsWith(citation.prefix)),
	)
}

/**
 * Describes a finding as the message the report prints for it.
 *
 * @param finding - The finding.
 * @param ignored - The probes git ignores.
 * @param tracked - The tracked paths.
 * @returns `names a machine path`, `cites ignored path <path>`, or undefined when git tracks the
 * cited path or does not ignore it.
 */
export function describeFinding(
	finding: Finding,
	ignored: ReadonlySet<string>,
	tracked: readonly string[],
): string | undefined {
	const { citation } = finding
	if (citation === undefined) return 'names a machine path'
	return ignored.has(probeOf(citation)) && !isCovered(citation, tracked)
		? `cites ignored path ${citation.path}`
		: undefined
}

/**
 * Reports the campaign Markdown lines that cite an ignored path or name a machine path.
 *
 * @returns One report line per finding, each file and line and message once.
 */
export function reportCitations(): readonly string[] {
	if (!existsSync('.orkestrel')) return []
	const findings = listFiles('.orkestrel', NOTHING_SKIPPED)
		.map((file) => file.path)
		.filter((path) => /\.md$/iu.test(path))
		.sort()
		.flatMap((path) => listFindings(path))
	const probes = new Set(
		findings.flatMap(({ citation }) => (citation === undefined ? [] : [probeOf(citation)])),
	)
	const ignored = readIgnored([...probes])
	const tracked = ignored.size === 0 ? [] : listTracked([])
	const lines = new Set(
		findings.flatMap((finding) => {
			const text = describeFinding(finding, ignored, tracked)
			return text === undefined ? [] : [`${finding.file}:${finding.line} ${text}`]
		}),
	)
	return [...lines].map((key) => `sweep: ${key}`)
}

/**
 * Prints the leftover report.
 *
 * @returns The exit code, always 0.
 */
export function runReport(): number {
	for (const directory of [...LAUNCH_DIRECTORIES, ...listCampaignDirectories()]) {
		const line = reportDirectory(directory)
		if (line !== undefined) console.log(line)
	}
	const files = reportCampaignFiles()
	if (files !== undefined) console.log(files)
	for (const line of reportCitations()) console.log(line)
	return 0
}

/**
 * Deletes the launch files older than a threshold and keeps every tracked file.
 *
 * @param thresholdMinutes - The minutes a launch file must age before it is deleted.
 * @returns The exit code: 0 on success, 2 when a launch file changed within the recent window.
 */
export function runSweep(thresholdMinutes: number): number {
	const now = Date.now()
	const present = LAUNCH_DIRECTORIES.filter((directory) => existsSync(directory))
	const tracked = new Set(listTracked(LAUNCH_DIRECTORIES))
	const files = present.flatMap((directory) => listFiles(directory, NOTHING_SKIPPED))
	if (files.some((file) => !tracked.has(file.path) && now - file.modified < RECENT_MS)) {
		console.error('sweep: a launch file changed within the last 2 minutes; refusing to delete')
		return 2
	}
	const cutoff = now - thresholdMinutes * 60_000
	for (const file of files) {
		if (file.modified > cutoff) continue
		if (tracked.has(file.path)) {
			console.log(`sweep: kept tracked ${file.path}`)
			continue
		}
		rmSync(file.path, { force: true })
		console.log(`sweep: deleted ${file.path}`)
	}
	for (const directory of present) removeEmptyDirectories(directory)
	return 0
}

/**
 * Lists one unit's files under the launch directories.
 *
 * @param unit - The unit name; a file belongs to it when its name is the unit followed by `-` or `.`.
 * @returns Each file's path and modification time.
 */
export function listUnitFiles(unit: string): ReadonlyArray<{ path: string; modified: number }> {
	return LAUNCH_DIRECTORIES.filter((directory) => existsSync(directory))
		.flatMap((directory) => listFiles(directory, NOTHING_SKIPPED))
		.filter((file) => {
			const name = basename(file.path)
			return name.startsWith(unit) && /^[-.]/u.test(name.slice(unit.length))
		})
}

/**
 * Lists or deletes one unit's launch files.
 *
 * @param unit - The unit name.
 * @param remove - If true, deletes the untracked files; if false, lists them.
 * @returns The exit code: 0 on success, 2 when a deletion is refused, 64 on usage.
 */
export function runUnit(unit: string, remove: boolean): number {
	if (!/^[A-Za-z0-9._][A-Za-z0-9._-]*$/u.test(unit)) {
		console.error(
			`sweep: --unit takes letters, digits, dots, underscores, and hyphens, not opening with a hyphen, not ${JSON.stringify(unit)}; ${USAGE}`,
		)
		return 64
	}
	const files = listUnitFiles(unit)
	const tracked = new Set(listTracked(LAUNCH_DIRECTORIES))
	if (
		remove &&
		files.some((file) => !tracked.has(file.path) && Date.now() - file.modified < RECENT_MS)
	) {
		console.error(`sweep: a file of ${unit} changed within the last 2 minutes; refusing to delete`)
		return 2
	}
	for (const file of files) {
		if (tracked.has(file.path)) {
			console.log(
				remove ? `sweep: kept tracked ${file.path}` : `sweep: found ${file.path} (tracked)`,
			)
			continue
		}
		if (remove) rmSync(file.path, { force: true })
		console.log(`sweep: ${remove ? 'deleted' : 'found'} ${file.path}`)
	}
	console.log(`sweep: ${files.length} file(s) for ${unit}`)
	return 0
}

/**
 * Runs the script on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 on success, 2 when a deletion is refused, 64 on usage.
 */
export function main(argv: readonly string[]): number {
	const parsed = parseArguments(argv)
	if (!parsed.success) {
		console.error(`sweep: ${parsed.error}; ${USAGE}`)
		return 64
	}
	const { values } = parsed.value
	if (!existsSync('.git')) {
		console.error('sweep: run from the repository root')
		return 64
	}
	const unit = typeof values.unit === 'string' ? values.unit : undefined
	const modes = [values.report, values.tmp, unit].filter((value) => value !== undefined)
	if (modes.length > 1) {
		console.error(`sweep: --report, --tmp, and --unit are three modes; name one; ${USAGE}`)
		return 64
	}
	if (values.tmp === true) {
		const text = typeof values['older-than'] === 'string' ? values['older-than'] : undefined
		const threshold = parseThreshold(text)
		if (threshold === undefined) {
			console.error(
				`sweep: --older-than takes a number of minutes above 0, not ${JSON.stringify(text)}; ${USAGE}`,
			)
			return 64
		}
		return runSweep(threshold)
	}
	if (unit !== undefined) return runUnit(unit, values.delete === true)
	if (argv.length === 0 || values.report === true) return runReport()
	console.error(USAGE)
	return 64
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
