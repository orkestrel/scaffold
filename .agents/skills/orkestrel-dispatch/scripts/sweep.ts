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
// Exit 0 on success, 2 when a deletion is refused, 64 on usage.
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { basename, join } from 'node:path'
import { listFiles, readMissingFlags, readOption } from './helpers.ts'

const LAUNCH_DIRECTORIES = [
	'tmp/units',
	'tmp/cursor',
	'tmp/codex',
	'tmp/claude',
	'tmp/probes',
	'tmp/type',
	'tmp/captures',
]
const RECENT_MS = 2 * 60_000

// A launch directory holds nothing a walk skips, so every file beneath it counts.
const NOTHING_SKIPPED: ReadonlySet<string> = new Set()

// Git's output is bounded by the repository's file count, so a generous buffer is the only limit.
const GIT_BUFFER = 64 * 1024 * 1024

// An absolute machine path: a drive-letter path, or one that opens `/Users/`, `/home/`, or `~/`. The
// lookbehind keeps `https://`, `src/home/`, and `./home/` from matching.
const MACHINE_PATH = /(?<![\w.-])(?:[A-Za-z]:[\\/]|\/(?:Users|home)\/|~\/)/u
const BACKTICKED = /`([^`\n]+)`/gu
const PLACEHOLDER = /[*?<{]/u

interface Citation {
	readonly path: string
	readonly directory: boolean
	readonly prefix: string | undefined
}

interface Finding {
	readonly file: string
	readonly line: number
	readonly citation: Citation | undefined
}

function formatDay(modified: number): string {
	return new Date(modified).toISOString().slice(0, 10)
}

function reportDirectory(directory: string): string | undefined {
	if (!existsSync(directory)) return undefined
	const files = listFiles(directory, NOTHING_SKIPPED)
	if (files.length === 0) return undefined
	const oldest = files.reduce((low, file) => Math.min(low, file.modified), Number.POSITIVE_INFINITY)
	return `sweep: ${directory} holds ${files.length} file(s), oldest ${formatDay(oldest)}`
}

function listCampaignDirectories(): readonly string[] {
	if (!existsSync('.orkestrel')) return []
	return readdirSync('.orkestrel', { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => join('.orkestrel', entry.name))
}

function reportCampaignFiles(): string | undefined {
	if (!existsSync('.orkestrel')) return undefined
	const files = readdirSync('.orkestrel', { withFileTypes: true }).filter((entry) => entry.isFile())
	if (files.length === 0) return undefined
	return `sweep: .orkestrel holds ${files.length} ecosystem file(s): ${files.map((entry) => entry.name).join(', ')}`
}

function removeEmptyDirectories(directory: string): void {
	for (const entry of readdirSync(directory, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue
		const path = join(directory, entry.name)
		removeEmptyDirectories(path)
		if (readdirSync(path).length === 0) rmSync(path, { recursive: true })
	}
}

function readThreshold(argv: readonly string[]): number | undefined {
	if (!argv.includes('--older-than')) return 60
	const value = Number(readOption(argv, '--older-than'))
	return Number.isFinite(value) && value > 0 ? value : undefined
}

// Lists the files git tracks beneath the scope (the whole repository when empty), as forward-slash
// paths from the root. Any git failure reads as nothing tracked, so the run keeps its old behavior.
function listTracked(scope: readonly string[]): readonly string[] {
	const args = ['ls-files', '-z', ...(scope.length === 0 ? [] : ['--', ...scope])]
	const run = spawnSync('git', args, { encoding: 'utf8', windowsHide: true, maxBuffer: GIT_BUFFER })
	if (run.status !== 0) return []
	return run.stdout.split('\0').filter((path) => path !== '')
}

// Names the probes git ignores, from one batched `git check-ignore`: status 0 and 1 both answer,
// and any other status reads as nothing ignored.
function readIgnored(probes: readonly string[]): ReadonlySet<string> {
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

// Reads a backticked token as a repository-relative citation. A token counts when it has no
// whitespace, contains `/`, and is no URL; the path stops at its first glob or placeholder character
// and drops a trailing `/`. A machine path, a path outside the repository, and a backslash path are
// no citation.
function readCitation(token: string): Citation | undefined {
	if (/\s/u.test(token) || !token.includes('/') || token.includes('://')) return undefined
	const stop = token.search(PLACEHOLDER)
	const cut = (stop === -1 ? token : token.slice(0, stop)).replace(/^\.\//u, '')
	const path = cut.replace(/\/+$/u, '')
	if (path === '' || /^(?:\/|~|\.\.(?:\/|$)|-|[A-Za-z]:)/u.test(path) || path.includes('\\')) {
		return undefined
	}
	return { path, directory: cut.endsWith('/'), prefix: stop === -1 ? undefined : cut }
}

function listFindings(file: string): readonly Finding[] {
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

function probeOf(citation: Citation): string {
	return citation.directory ? `${citation.path}/` : citation.path
}

// A citation is covered when git tracks the path, a file beneath it, or a file its glob prefix opens.
function isCovered(citation: Citation, tracked: readonly string[]): boolean {
	return tracked.some(
		(path) =>
			path === citation.path ||
			path.startsWith(`${citation.path}/`) ||
			(citation.prefix !== undefined && path.startsWith(citation.prefix)),
	)
}

function reportCitations(): readonly string[] {
	if (!existsSync('.orkestrel')) return []
	const findings = listFiles('.orkestrel', NOTHING_SKIPPED)
		.map((file) => file.path)
		.filter((path) => /\.md$/iu.test(path))
		.sort()
		.flatMap((path) => listFindings(path))
	const probes = new Set<string>()
	for (const finding of findings) {
		if (finding.citation !== undefined) probes.add(probeOf(finding.citation))
	}
	const ignored = readIgnored([...probes])
	const tracked = ignored.size === 0 ? [] : listTracked([])
	const seen = new Set<string>()
	const lines: string[] = []
	for (const { file, line, citation } of findings) {
		const text =
			citation === undefined
				? 'names a machine path'
				: ignored.has(probeOf(citation)) && !isCovered(citation, tracked)
					? `cites ignored path ${citation.path}`
					: undefined
		if (text === undefined) continue
		const key = `${file}:${line} ${text}`
		if (seen.has(key)) continue
		seen.add(key)
		lines.push(`sweep: ${key}`)
	}
	return lines
}

function runReport(): number {
	for (const directory of [...LAUNCH_DIRECTORIES, ...listCampaignDirectories()]) {
		const line = reportDirectory(directory)
		if (line !== undefined) console.log(line)
	}
	const files = reportCampaignFiles()
	if (files !== undefined) console.log(files)
	for (const line of reportCitations()) console.log(line)
	return 0
}

function runSweep(thresholdMinutes: number): number {
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

function listUnitFiles(unit: string): ReadonlyArray<{ path: string; modified: number }> {
	return LAUNCH_DIRECTORIES.filter((directory) => existsSync(directory))
		.flatMap((directory) => listFiles(directory, NOTHING_SKIPPED))
		.filter((file) => {
			const name = basename(file.path)
			return name.startsWith(unit) && /^[-.]/u.test(name.slice(unit.length))
		})
}

function runUnit(unit: string | undefined, remove: boolean): number {
	if (unit === undefined || !/^[A-Za-z0-9._][A-Za-z0-9._-]*$/u.test(unit)) {
		console.error('usage: sweep.ts --unit UNIT [--delete]')
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

function main(argv: readonly string[]): number {
	if (!existsSync('.git')) {
		console.error('sweep: run from the repository root')
		return 64
	}
	const missing = readMissingFlags(argv, ['--unit', '--older-than'])
	if (missing.length > 0) {
		console.error(`sweep: ${missing.join(', ')} given with no value`)
		return 64
	}
	const modes = ['--report', '--tmp', '--unit'].filter((flag) => argv.includes(flag))
	if (modes.length > 1) {
		console.error(
			'usage: sweep.ts names one mode: --report | --tmp [--older-than MINUTES] | --unit UNIT [--delete]',
		)
		return 64
	}
	if (argv.includes('--tmp')) {
		const threshold = readThreshold(argv)
		if (threshold === undefined) {
			console.error('usage: sweep.ts --tmp [--older-than MINUTES]; MINUTES is a positive number')
			return 64
		}
		return runSweep(threshold)
	}
	if (argv.includes('--unit')) return runUnit(readOption(argv, '--unit'), argv.includes('--delete'))
	if (argv.length === 0 || argv.includes('--report')) return runReport()
	console.error('usage: sweep.ts --report | --tmp [--older-than MINUTES] | --unit UNIT [--delete]')
	return 64
}

process.exitCode = main(process.argv.slice(2))
