// Census of test discovery across each gated config, mode, and project filter. Run from the checkout root:
//   node .agents/skills/orkestrel-harden/scripts/discovery.ts [--config vite.config.ts] [--projects a,b] [--json]
// The script follows every root script chain in package.json (a script no other script invokes) to
// its Vitest scripts' `--config`, `--mode`, and `--project` flags (space or equals forms). A config
// defaults to this script's --config; no project filter gates everything that config and mode collect.
// Run `vitest list --json=FILE` once per distinct config and mode, unioning named project filters unless
// a gate is unfiltered. Census this script's own config without a gate filter to expose ungated projects.
// With --projects, filter every listing to those names instead. Merge repeated tests across listings,
// retaining duplicate names within a listing, and report non-default units on their project rows.
// Also read test files root scripts run directly and every collected file for `.skip(`, `.todo(`,
// `.skipIf(`, `.runIf(`, `retry:`, and `timeout:`. It flags a collected project no root chain reaches, a named project that collects
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
	readOptions,
} from '../../orkestrel-dispatch/scripts/helpers.ts'

const VITEST = 'node_modules/vitest/vitest.mjs'
const MARKERS: readonly string[] = ['.skip(', '.todo(', '.skipIf(', '.runIf(', 'retry:', 'timeout:']

interface Collected {
	readonly file: string
	readonly projectName: string
	readonly name: string
}

interface Gates {
	readonly units: readonly Gate[]
	readonly files: ReadonlyMap<string, string>
}

interface Unit {
	readonly config: string
	readonly mode: string | undefined
}

interface Gate extends Unit {
	readonly projects: readonly string[]
	readonly chain: string
}

interface Listing extends Unit {
	readonly collected: readonly Collected[]
	readonly gates: readonly Gate[]
}

interface Invocation {
	readonly name: string
	readonly args: readonly string[]
	readonly ancestors: readonly string[]
}

interface Project {
	readonly name: string
	readonly gate: string | undefined
	readonly files: number
	readonly tests: number
	readonly units?: readonly Unit[]
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

function readCommands(text: string): ReadonlyArray<readonly string[]> {
	const commands: string[][] = []
	let command: string[] = []
	for (const match of text.matchAll(/(?:[^\s"';&|]+|"[^"]*"|'[^']*')+|[;&|]+/gu)) {
		if (/^[;&|]+$/u.test(match[0])) {
			commands.push(command)
			command = []
		} else {
			command.push(match[0].replace(/["']/gu, ''))
		}
	}
	commands.push(command)
	return commands
}

function listInvocations(commands: ReadonlyArray<readonly string[]>): readonly Invocation[] {
	const invoked: Invocation[] = []
	for (const command of commands) {
		const index = command.indexOf('npm')
		const name = command[index + 2]
		if (index < 0 || command[index + 1] !== 'run' || name === undefined) continue
		const separator = command.indexOf('--', index + 3)
		invoked.push({ name, args: separator < 0 ? [] : command.slice(separator + 1), ancestors: [] })
	}
	return invoked
}

function readGates(scripts: Readonly<Record<string, string>>, config: string): Gates {
	const commands = Object.fromEntries(
		Object.entries(scripts).map(([name, text]) => [name, readCommands(text)]),
	)
	const invoked = new Set(
		Object.values(commands)
			.flatMap(listInvocations)
			.map((entry) => entry.name),
	)
	const units: Gate[] = []
	const files = new Map<string, string>()
	for (const root of Object.keys(scripts).filter((name) => !invoked.has(name))) {
		const visited = new Set<string>()
		const pending: Invocation[] = [{ name: root, args: [], ancestors: [] }]
		while (pending.length > 0) {
			const invocation = pending.pop()
			if (invocation === undefined) continue
			const { name, args, ancestors } = invocation
			const key = JSON.stringify([name, args])
			if (visited.has(key) || ancestors.includes(name)) continue
			visited.add(key)
			const script = commands[name]
			if (script === undefined) continue
			const expanded = script.map((command, index) =>
				index === script.length - 1 ? [...command, ...args] : command,
			)
			pending.push(
				...listInvocations(expanded).map((entry) => ({
					...entry,
					ancestors: [...ancestors, name],
				})),
			)
			const gate = root === name ? name : `${root} > ${name}`
			for (const command of expanded) {
				const index = command.indexOf('vitest')
				if (index >= 0) {
					const flags = command.slice(index + 1).flatMap((argument) => {
						const equals = argument.indexOf('=')
						return argument.startsWith('--') && equals > 0
							? [argument.slice(0, equals), argument.slice(equals + 1)]
							: [argument]
					})
					units.push({
						config: relative(process.cwd(), resolve(readOption(flags, '--config') ?? config))
							.split('\\')
							.join('/'),
						mode: readOption(flags, '--mode'),
						projects: readOptions(flags, '--project'),
						chain: gate,
					})
				}
				for (const argument of command) {
					if (
						/^(?:tests|src|app)\/[A-Za-z0-9_./-]+\.test\.[cm]?ts$/u.test(argument) &&
						!files.has(argument)
					)
						files.set(argument, gate)
				}
			}
		}
	}
	return { units, files }
}

function listCollected(unit: Unit, projects: readonly string[]): readonly Collected[] | undefined {
	const directory = mkdtempSync(join(tmpdir(), 'discovery-'))
	const listing = join(directory, 'listing.json')
	try {
		const result = spawnSync(
			process.execPath,
			[
				VITEST,
				'list',
				'--config',
				unit.config,
				...(unit.mode === undefined ? [] : ['--mode', unit.mode]),
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
			if (
				typeof record.file === 'string' &&
				typeof record.projectName === 'string' &&
				typeof record.name === 'string'
			) {
				collected.push({
					file: relative(process.cwd(), record.file).split('\\').join('/'),
					projectName: record.projectName,
					name: record.name,
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

function collectListings(
	config: string,
	named: readonly string[],
	gates: Gates,
): readonly Listing[] | undefined {
	const units: Unit[] = [{ config, mode: undefined }]
	for (const gate of gates.units) {
		if (!units.some((unit) => unit.config === gate.config && unit.mode === gate.mode)) {
			units.push({ config: gate.config, mode: gate.mode })
		}
	}
	const listings: Listing[] = []
	for (const unit of units) {
		const reached = gates.units.filter(
			(gate) => gate.config === unit.config && gate.mode === unit.mode,
		)
		const projects =
			named.length > 0
				? named
				: (unit.config === config && unit.mode === undefined) ||
					  reached.some((gate) => gate.projects.length === 0)
					? []
					: [...new Set(reached.flatMap((gate) => gate.projects))]
		const collected = listCollected(unit, projects)
		if (collected === undefined) return undefined
		listings.push({ ...unit, collected, gates: reached })
	}
	return listings
}

function mergeCollected(
	listings: readonly Listing[],
	known: ReadonlySet<string>,
): readonly Collected[] {
	const collected = new Map<string, Collected>()
	for (const listing of listings) {
		const occurrences = new Map<string, number>()
		for (const entry of listing.collected) {
			const identity = JSON.stringify([entry.file, entry.projectName, entry.name])
			const occurrence = (occurrences.get(identity) ?? 0) + 1
			occurrences.set(identity, occurrence)
			collected.set(JSON.stringify([identity, occurrence]), {
				...entry,
				projectName: normalizeProject(entry.projectName, known),
			})
		}
	}
	return [...collected.values()]
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
	const canonical = relative(process.cwd(), resolve(config)).split('\\').join('/')
	const gates = readGates(readScripts(), canonical)
	const named = (readOption(argv, '--projects') ?? '').split(',').filter((name) => name !== '')
	const listings = collectListings(canonical, named, gates)
	if (listings === undefined) {
		console.error('discovery: vitest list failed')
		return 2
	}
	const known = new Set([...gates.units.flatMap((gate) => gate.projects), ...named])
	const collected = mergeCollected(listings, known)
	const reachedFiles = new Map(gates.files)
	for (const listing of listings) {
		for (const entry of listing.collected) {
			const name = normalizeProject(entry.projectName, known)
			const gate = listing.gates.find(
				(candidate) => candidate.projects.length === 0 || candidate.projects.includes(name),
			)
			if (gate !== undefined && !reachedFiles.has(entry.file))
				reachedFiles.set(entry.file, gate.chain)
		}
	}
	const names = new Set<string>([
		...(named.length === 0 ? known : named),
		...collected.map((entry) => entry.projectName),
		...named,
	])
	const projects: Project[] = [...names].sort().map((name) => {
		const mine = collected.filter((entry) => entry.projectName === name)
		const units = listings.filter(
			(listing) =>
				listing.collected.some((entry) => normalizeProject(entry.projectName, known) === name) ||
				listing.gates.some((gate) => gate.projects.includes(name)) ||
				listing.collected.some(
					(entry) =>
						mine.some((candidate) => candidate.file === entry.file) &&
						listing.gates.some(
							(gate) =>
								gate.projects.length === 0 ||
								gate.projects.includes(normalizeProject(entry.projectName, known)),
						),
				),
		)
		const gate = units
			.flatMap((unit) => unit.gates)
			.find((entry) => entry.projects.length === 0 || entry.projects.includes(name))?.chain
		const fileGate = mine
			.map((entry) => reachedFiles.get(entry.file))
			.find((chain) => chain !== undefined)
		return {
			name,
			gate: gate ?? fileGate,
			files: new Set(mine.map((entry) => entry.file)).size,
			tests: mine.length,
			...(units.some((unit) => unit.config !== canonical || unit.mode !== undefined)
				? { units: units.map((unit) => ({ config: unit.config, mode: unit.mode })) }
				: {}),
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
