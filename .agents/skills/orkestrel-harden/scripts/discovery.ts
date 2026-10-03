// Census of test discovery: which projects the gates reach, what each collects, and where a suite
// skips. Run from the checkout root:
//   node .agents/skills/orkestrel-harden/scripts/discovery.ts [--config vite.config.ts] [--projects a,b] [--json]
// The script follows every root script chain in package.json (a script no other script invokes) to
// the `--project` names its Vitest scripts gate and the test files its `node` scripts run, runs
// `vitest list --json=FILE` once through the local vitest entry to read what each project collects, and
// reads every collected file for `.skip(`, `.todo(`, `.skipIf(`, `.runIf(`, `retry:`, and
// `timeout:`. It flags a collected project no root chain reaches, a named project that collects
// nothing, and a test file under tests/ that no project collects and no root script runs directly.
// A browser instance's tests, which Vitest names `NAME (BROWSER)`, count under the gated project NAME.
// A project with no test file and no gate is outside the census. Exit 0 with no flag, 3 with one, 2 when Vitest cannot list, 64 on
// usage.
import { spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative, resolve } from 'node:path'
import {
	listFiles,
	readMissingFlags,
	readOption,
} from '../../orkestrel-dispatch/scripts/helpers.ts'

const VITEST = 'node_modules/vitest/vitest.mjs'
const MARKERS: readonly string[] = ['.skip(', '.todo(', '.skipIf(', '.runIf(', 'retry:', 'timeout:']

interface Collected {
	readonly file: string
	readonly projectName: string
}

interface Gates {
	readonly projects: ReadonlyMap<string, string>
	readonly files: ReadonlyMap<string, string>
}

interface Project {
	readonly name: string
	readonly gate: string | undefined
	readonly files: number
	readonly tests: number
}

interface Census {
	readonly file: string
	readonly projects: readonly string[]
	readonly markers: Readonly<Record<string, number>>
}

// Vitest reports a browser project's tests under `NAME (BROWSER)` while a gate names `NAME`.
function normalizeProject(name: string, known: ReadonlySet<string>): string {
	const base = name.replace(/ \([^()]+\)$/u, '')
	return base !== name && known.has(base) ? base : name
}

function readScripts(): Readonly<Record<string, string>> {
	const parsed: unknown = JSON.parse(readFileSync('package.json', 'utf8'))
	if (typeof parsed !== 'object' || parsed === null) return {}
	const scripts = Object.fromEntries(Object.entries(parsed)).scripts
	if (typeof scripts !== 'object' || scripts === null) return {}
	const record: Record<string, string> = {}
	for (const [key, value] of Object.entries(scripts))
		if (typeof value === 'string') record[key] = value
	return record
}

function listInvocations(text: string): readonly string[] {
	return [...text.matchAll(/npm run ([A-Za-z0-9:_-]+)/gu)].flatMap((match) =>
		match[1] === undefined ? [] : [match[1]],
	)
}

function readGates(scripts: Readonly<Record<string, string>>): Gates {
	const invoked = new Set(Object.values(scripts).flatMap(listInvocations))
	const projects = new Map<string, string>()
	const files = new Map<string, string>()
	for (const root of Object.keys(scripts).filter((name) => !invoked.has(name))) {
		const visited = new Set<string>()
		const pending = [root]
		while (pending.length > 0) {
			const name = pending.pop()
			if (name === undefined || visited.has(name)) continue
			visited.add(name)
			const text = scripts[name]
			if (text === undefined) continue
			pending.push(...listInvocations(text))
			const gate = root === name ? name : `${root} > ${name}`
			if (/\bvitest\b/u.test(text)) {
				for (const match of text.matchAll(/--project[= ]([A-Za-z0-9:_-]+)/gu)) {
					if (match[1] !== undefined && !projects.has(match[1])) projects.set(match[1], gate)
				}
			}
			for (const match of text.matchAll(
				/(?:^|\s)((?:tests|src|app)\/[A-Za-z0-9_./-]+\.test\.[cm]?ts)\b/gu,
			)) {
				if (match[1] !== undefined && !files.has(match[1])) files.set(match[1], gate)
			}
		}
	}
	return { projects, files }
}

function listCollected(
	config: string,
	projects: readonly string[],
): readonly Collected[] | undefined {
	const directory = mkdtempSync(join(tmpdir(), 'discovery-'))
	const listing = join(directory, 'listing.json')
	try {
		const result = spawnSync(
			process.execPath,
			[
				VITEST,
				'list',
				'--config',
				config,
				`--json=${listing}`,
				...projects.flatMap((name) => ['--project', name]),
			],
			{
				encoding: 'utf8',
				maxBuffer: 64 * 1024 * 1024,
				windowsHide: true,
			},
		)
		if (
			projects.length > 0 &&
			result.status === 1 &&
			result.stderr.includes('No projects matched the filter "')
		)
			return []
		if (result.status !== 0 || !existsSync(listing)) {
			const diagnostic = result.stderr || result.error?.message || result.stdout
			console.error(
				diagnostic
					.split(/\r\n|\n/u)
					.filter((line) => line.trim() !== '')
					.slice(0, 12)
					.join('\n'),
			)
			return undefined
		}
		const parsed: unknown = JSON.parse(readFileSync(listing, 'utf8'))
		if (!Array.isArray(parsed)) return undefined
		const collected: Collected[] = []
		for (const entry of parsed) {
			if (typeof entry !== 'object' || entry === null) continue
			const record = Object.fromEntries(Object.entries(entry))
			if (typeof record.file === 'string' && typeof record.projectName === 'string') {
				collected.push({
					file: relative(process.cwd(), record.file).split('\\').join('/'),
					projectName: record.projectName,
				})
			}
		}
		return collected
	} catch (error) {
		console.error(error instanceof Error ? error.message : String(error))
		return undefined
	} finally {
		rmSync(directory, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 })
	}
}

function listTestFiles(directory: string): readonly string[] {
	if (!existsSync(directory)) return []
	return listFiles(directory)
		.map((file) => file.path)
		.filter((path) => /\.test\.[cm]?ts$/u.test(path))
}

function countMarkers(file: string): Readonly<Record<string, number>> {
	const text = readFileSync(file, 'utf8')
	const counts: Record<string, number> = {}
	for (const marker of MARKERS) {
		const count = text.split(marker).length - 1
		if (count > 0) counts[marker] = count
	}
	return counts
}

function main(argv: readonly string[]): number {
	const missing = readMissingFlags(argv, ['--config', '--projects'])
	if (missing.length > 0) {
		console.error(`discovery: ${missing.join(', ')} given with no value`)
		return 64
	}
	const config = readOption(argv, '--config') ?? 'vite.config.ts'
	if (!existsSync(config) || !existsSync('package.json')) {
		console.error('usage: discovery.ts [--config vite.config.ts] [--projects a,b] [--json]')
		return 64
	}
	if (!existsSync(VITEST)) {
		console.error(`discovery: ${VITEST} is missing; run npm ci first`)
		return 2
	}
	const gates = readGates(readScripts())
	const named = (readOption(argv, '--projects') ?? '').split(',').filter((name) => name !== '')
	const listed = listCollected(config, named)
	if (listed === undefined) {
		console.error('discovery: vitest list failed')
		return 2
	}
	const known = new Set([...gates.projects.keys(), ...named])
	const collected = listed.map((entry) => ({
		file: entry.file,
		projectName: normalizeProject(entry.projectName, known),
	}))
	const names = new Set<string>([
		...(named.length === 0 ? gates.projects.keys() : named),
		...collected.map((entry) => entry.projectName),
		...named,
	])
	const projects: Project[] = [...names].sort().map((name) => {
		const mine = collected.filter((entry) => entry.projectName === name)
		const fileGate = mine
			.map((entry) => gates.files.get(entry.file))
			.find((gate) => gate !== undefined)
		return {
			name,
			gate: gates.projects.get(name) ?? fileGate,
			files: new Set(mine.map((entry) => entry.file)).size,
			tests: mine.length,
		}
	})
	const collectedFiles = new Set(collected.map((entry) => entry.file))
	const undiscovered = (named.length === 0 ? listTestFiles('tests') : [])
		.filter((file) => !collectedFiles.has(file) && !gates.files.has(file))
		.sort()
	const ungated = projects
		.filter((project) => project.gate === undefined && project.tests > 0)
		.map((project) => project.name)
	// A project no chain reaches is a workbench (the `probe` project collects `tmp/probes/**`), so an
	// empty one is reported, never flagged.
	const empty = projects
		.filter((project) => project.tests === 0 && project.gate?.includes(' > ') === true)
		.map((project) => project.name)
	const workbenches = projects
		.filter((project) => project.tests === 0 && project.gate?.includes(' > ') !== true)
		.map((project) => project.name)
	const census: Census[] = [...collectedFiles].sort().map((file) => ({
		file,
		projects: [
			...new Set(
				collected.filter((entry) => entry.file === file).map((entry) => entry.projectName),
			),
		],
		markers: countMarkers(resolve(file)),
	}))
	const flagged = undiscovered.length + ungated.length + empty.length > 0
	if (argv.includes('--json')) {
		console.log(
			JSON.stringify({ config, projects, ungated, empty, workbenches, undiscovered, census }),
		)
	} else {
		for (const project of projects) {
			console.log(
				`discovery: ${project.name.padEnd(14)} ${String(project.files).padStart(3)} file(s) ${String(project.tests).padStart(5)} test(s) gate=${project.gate ?? 'none'}`,
			)
		}
		for (const name of ungated)
			console.log(`discovery: ${name} collects tests but no root script chain reaches it`)
		for (const name of empty) console.log(`discovery: ${name} collects nothing`)
		for (const name of workbenches)
			console.log(`discovery: ${name} is a workbench no chain runs; it collects nothing`)
		for (const file of undiscovered) console.log(`discovery: ${file} is collected by no project`)
		for (const entry of census) {
			const marks = Object.entries(entry.markers)
			if (marks.length > 0) {
				console.log(
					`discovery: ${entry.file} ${marks.map(([marker, count]) => `${marker}×${count}`).join(' ')}`,
				)
			}
		}
	}
	return flagged ? 3 : 0
}

process.exitCode = main(process.argv.slice(2))
