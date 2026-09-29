// Campaign artifact sweep. Run from the checkout root with Node's type stripping:
//   node .agents/skills/orkestrel-dispatch/scripts/sweep.ts --report
//   node .agents/skills/orkestrel-dispatch/scripts/sweep.ts --tmp [--older-than MINUTES]
//   node .agents/skills/orkestrel-dispatch/scripts/sweep.ts --unit UNIT [--delete]
// --report lists leftovers under tmp/ and .orkestrel/ by age and deletes nothing.
// --tmp deletes launch files older than the threshold (default 60 minutes), removes emptied
// directories, and refuses while any launch file changed in the last 2 minutes.
// --unit lists one accepted unit's files under the launch directories (the brief, report, claims,
// journal, errors, status, and last-message files whose name is UNIT followed by `-` or `.`), and
// --delete removes them, refusing while one changed in the last 2 minutes.
// Exit 0 on success, 2 when a deletion is refused, 64 on usage.
import { existsSync, readdirSync, rmSync } from 'node:fs'
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

function runReport(): number {
	for (const directory of [...LAUNCH_DIRECTORIES, ...listCampaignDirectories()]) {
		const line = reportDirectory(directory)
		if (line !== undefined) console.log(line)
	}
	const files = reportCampaignFiles()
	if (files !== undefined) console.log(files)
	return 0
}

function runSweep(thresholdMinutes: number): number {
	const now = Date.now()
	const present = LAUNCH_DIRECTORIES.filter((directory) => existsSync(directory))
	const files = present.flatMap((directory) => listFiles(directory, NOTHING_SKIPPED))
	if (files.some((file) => now - file.modified < RECENT_MS)) {
		console.error('sweep: a launch file changed within the last 2 minutes; refusing to delete')
		return 2
	}
	const cutoff = now - thresholdMinutes * 60_000
	for (const file of files) {
		if (file.modified > cutoff) continue
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
	if (remove && files.some((file) => Date.now() - file.modified < RECENT_MS)) {
		console.error(`sweep: a file of ${unit} changed within the last 2 minutes; refusing to delete`)
		return 2
	}
	for (const file of files) {
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
