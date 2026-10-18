// Let Vitest select each gate's tests, then compare its identities with each config/mode universe.
// Run from the checkout root:
//   node .agents/skills/orkestrel-harden/scripts/discovery.ts [--config vite.config.ts] [--projects a,b] [--json]
// Follow root npm script chains and forwarded arguments. Collect an unfiltered full listing for
// each config/mode/root/dir, including the base config. Pass gate arguments verbatim except the
// reporter, output-file, coverage, color, cache, silent, UI, watch, run-mode, inspector, and
// standalone options;
// use filesOnly for file selection and full collection for name, tag, line, and shard selection.
// Compare file/project/name/line/column identities without renaming projects. With --projects,
// ask Vitest for the reporting scope. Preserve duplicate names within a listing and merge across units.
// Ignore bench, list, mergeReports, listTags, and clearCache invocations as gates. Flag partly ungated rows, empty chained projects,
// and undiscovered files under tests/. Report marker counts and empty standalone workbenches.
// Retry when test files change during collection; refuse another change during that retry.
// Exit 0 with no flag, 3 with a flag, 2 for missing Vitest, unsupported related commands,
// CLI/help/argument/listing/output failures, repeated test-file changes, or filesystem/JSON errors;
// exit 64 on usage.
import { spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, join, relative, resolve } from 'node:path'
import {
	listFiles,
	readMissingFlags,
	readOption,
} from '../../orkestrel-dispatch/scripts/helpers.ts'

const VITEST = 'node_modules/vitest/vitest.mjs'
const MARKERS: readonly string[] = ['.skip(', '.todo(', '.skipIf(', '.runIf(', 'retry:', 'timeout:']
const OMITTED = new Set([
	'reporter',
	'outputFile',
	'coverage',
	'color',
	'cache',
	'silent',
	'ui',
	'watch',
	'run',
	'inspect',
	'inspectBrk',
	'standalone',
])
// Bounds one listing, so an option that waits for input exits 2 naming its gate instead of
// hanging the census.
const LISTING_TIMEOUT = 600_000

interface Option {
	readonly name: string
	readonly argument: string | undefined
}

interface Collected {
	readonly file: string
	readonly projectName: string
	readonly name: string | undefined
	readonly line: number | undefined
	readonly column: number | undefined
	readonly gate?: string | undefined
}

interface Selection {
	readonly selected: readonly string[]
	readonly skip: number
	readonly closed: boolean
}

interface Gates {
	readonly units: readonly Gate[]
	readonly files: ReadonlyMap<string, string>
}

interface Unit {
	readonly config: string | undefined
	readonly mode: string | undefined
	readonly root?: string | undefined
	readonly dir?: string | undefined
}

interface Gate extends Unit {
	readonly projects: readonly string[]
	readonly chain: string
	readonly args: readonly string[]
	readonly full: boolean
}

interface Listing extends Unit {
	readonly collected: readonly Collected[]
	readonly empty: readonly string[]
}

interface UnitReading {
	readonly listing: Listing
	readonly populated: readonly string[]
}

interface ProjectReading {
	readonly project: string
	readonly populated: boolean
	readonly empty: boolean
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

function readCLIOptions(): ReadonlyMap<string, Option> {
	const help = spawnSync(process.execPath, [VITEST, 'list', '--help', '--expand-help'], {
		encoding: 'utf8',
		windowsHide: true,
	})
	if (help.status !== 0) throw new Error(help.stderr || 'Cannot read Vitest CLI options')
	// A later line that names the same flag replaces the earlier option at the earlier position.
	return new Map(
		help.stdout.split(/\r\n|\n/u).flatMap((line): Array<readonly [string, Option]> => {
			const match = /^\s+(?:(-\w), )?--([\w.-]+)(?: ([<[][^\n]*?[>\]]))?\s{2}/u.exec(line)
			const name = match?.[2]
			if (name === undefined) return []
			const option = { name: name.replace(/^no-/u, ''), argument: match?.[3] }
			return [
				[`--${name}`, option],
				...(name.startsWith('no-') ? [[`--${name.slice(3)}`, option] as const] : []),
				[`--${name.replace(/[A-Z]/gu, (letter) => `-${letter.toLowerCase()}`)}`, option],
				...(match?.[1] === undefined ? [] : [[match[1], option] as const]),
			]
		}),
	)
}

// An option that takes a value consumes the token after it, so that token is never read as a runner.
function skipRunnerOptions(command: readonly string[], index: number): number {
	const skipped = [...command.entries()].reduce<{
		readonly next: number
		readonly found: number | undefined
	}>(
		(state, [position, option]) => {
			if (state.found !== undefined || position < state.next) return state
			if (!option.startsWith('-')) return { ...state, found: position }
			if (['-e', '--eval', '-p', '--print', '-c', '--check'].includes(option)) {
				return { ...state, found: -1 }
			}
			return {
				...state,
				next:
					position +
					([
						'-r',
						'--require',
						'--import',
						'--loader',
						'--experimental-loader',
						'--max-old-space-size',
						'--max_old_space_size',
						'-p',
						'--package',
					].includes(option)
						? 2
						: 1),
			}
		},
		{ next: index, found: undefined },
	)
	return skipped.found ?? skipped.next
}

function findRunner(command: readonly string[]): number {
	const executable = basename(command[0] ?? '').replace(/\.(?:exe|cmd)$/u, '')
	const start =
		executable === 'npm'
			? command[1] === 'exec'
				? 2
				: -1
			: executable === 'node' || executable === 'npx'
				? 1
				: 0
	const index = start > 0 ? skipRunnerOptions(command, start) : start
	if (index < 0) return -1
	return ['vitest', 'vitest.mjs', 'vitest.js'].includes(
		basename(command[index] ?? '').replace(/\.cmd$/u, ''),
	)
		? index
		: -1
}

// The first `--` ends the options, so the rest of the arguments pass verbatim. A runner option that
// takes a value consumes the argument after it, so a step below `skip` reads nothing.
function readSelection(
	argv: readonly string[],
	options: ReadonlyMap<string, Option>,
): readonly string[] {
	return argv.reduce<Selection>(
		(state, token, index) => {
			if (state.closed || index < state.skip) return state
			if (token === '--') {
				return { ...state, selected: state.selected.concat(argv.slice(index)), closed: true }
			}
			if (!token.startsWith('-')) return { ...state, selected: [...state.selected, token] }
			const equals = token.indexOf('=')
			const flag = equals < 0 ? token : token.slice(0, equals)
			const positive = flag.replace(/^--no-/u, '--')
			const option = options.get(positive) ?? options.get(positive.split('.').slice(0, 1).join('.'))
			if (option === undefined || !OMITTED.has(option.name.split('.')[0] ?? '')) {
				return { ...state, selected: [...state.selected, token] }
			}
			const next = argv[index + 1]
			const valued =
				!flag.startsWith('--no-') &&
				equals < 0 &&
				next !== undefined &&
				!next.startsWith('-') &&
				(option.argument !== undefined || next === 'true' || next === 'false')
			return { ...state, skip: index + (valued ? 2 : 1) }
		},
		{ selected: [], skip: 0, closed: false },
	).selected
}

function readArguments(argv: readonly string[], names: readonly string[]): readonly string[] {
	const end = argv.indexOf('--')
	return (end < 0 ? argv : argv.slice(0, end)).flatMap((token, index) => {
		const equals = token.indexOf('=')
		if (!names.includes(equals < 0 ? token : token.slice(0, equals))) return []
		const value = equals < 0 ? argv[index + 1] : token.slice(equals + 1)
		return value !== undefined && !value.startsWith('-') ? [value] : []
	})
}

function readScripts(): Readonly<Record<string, string>> {
	const parsed: unknown = JSON.parse(readFileSync('package.json', 'utf8'))
	if (typeof parsed !== 'object' || parsed === null) return {}
	const scripts = Object.fromEntries(Object.entries(parsed)).scripts
	if (typeof scripts !== 'object' || scripts === null) return {}
	return Object.fromEntries(
		Object.entries(scripts).flatMap(([key, value]) =>
			typeof value === 'string' ? [[key, value] as const] : [],
		),
	)
}

function readCommands(text: string): ReadonlyArray<readonly string[]> {
	const tokens = [...text.matchAll(/(?:[^\s"';&|]+|"[^"]*"|'[^']*')+|[;&|]+/gu)].map(
		(match) => match[0],
	)
	// A separator token ends a command, so the commands are the runs of tokens between the cuts.
	const cuts = tokens.flatMap((token, index) => (/^[;&|]+$/u.test(token) ? [index] : []))
	return [-1, ...cuts].map((cut, at) =>
		tokens.slice(cut + 1, cuts[at] ?? tokens.length).map((token) => token.replace(/["']/gu, '')),
	)
}

function listInvocations(commands: ReadonlyArray<readonly string[]>): readonly Invocation[] {
	return commands.flatMap((command) => {
		const index = command.indexOf('npm')
		const name = command[index + 2]
		if (index < 0 || command[index + 1] !== 'run' || name === undefined) return []
		const separator = command.indexOf('--', index + 3)
		return [{ name, args: separator < 0 ? [] : command.slice(separator + 1), ancestors: [] }]
	})
}

function readGates(
	scripts: Readonly<Record<string, string>>,
	config: string,
	options: ReadonlyMap<string, Option>,
): Gates {
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
			for (const entry of listInvocations(expanded)) {
				pending.push({ ...entry, ancestors: [...ancestors, name] })
			}
			const gate = root === name ? name : `${root} > ${name}`
			for (const command of expanded) {
				const index = findRunner(command)
				if (index >= 0) {
					const verb = command[index + 1]
					if (verb === 'list' || verb === 'bench') continue
					const tokens = command.slice(
						index + (['run', 'watch', 'dev'].includes(verb ?? '') ? 2 : 1),
					)
					const separator = tokens.indexOf('--')
					const before = separator < 0 ? tokens : tokens.slice(0, separator)
					if (
						before.some(
							(token, position) =>
								/^(?:--mergeReports|--merge-reports|--listTags|--list-tags|--clearCache|--clear-cache)(?:=|$)/u.test(
									token,
								) &&
								!token.endsWith('=false') &&
								before[position + 1] !== 'false',
						)
					)
						continue
					if (verb === 'related')
						throw new Error(`${gate}: Vitest list exposes no related command or --related option`)
					const flags = readSelection(tokens, options)
					const mode = readArguments(flags, ['--mode'])[0]
					const directory = readArguments(flags, ['--root', '-r'])[0]
					const dir = readArguments(flags, ['--dir'])[0]
					const configured = readArguments(flags, ['--config', '-c'])[0]
					const path =
						configured ?? (directory === undefined && dir === undefined ? config : undefined)
					units.push({
						config:
							path === undefined
								? undefined
								: relative(process.cwd(), resolve(path)).split('\\').join('/'),
						mode: mode === 'test' ? undefined : mode,
						...(directory === undefined ? {} : { root: directory }),
						...(dir === undefined ? {} : { dir }),
						projects: readArguments(flags, ['--project']),
						chain: gate,
						args:
							configured === undefined && path !== undefined ? ['--config', path, ...flags] : flags,
						full: before.some(
							(flag) =>
								/^(?:-t|--testNamePattern|--test-name-pattern|--tagsFilter|--tags-filter|--shard|--(?:no-)?allowOnly|--(?:no-)?allow-only|--(?:no-)?strictTags|--(?:no-)?strict-tags)(?:=|$)/u.test(
									flag,
								) || /:\d+(?:-\d+)?$/u.test(flag),
						),
					})
					continue
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

function listCollected(
	args: readonly string[],
	full: boolean,
	cache: Map<string, readonly Collected[]>,
): readonly Collected[] | undefined {
	const parameters = [...(full ? ['--includeTaskLocation'] : ['--filesOnly']), ...args]
	const key = JSON.stringify(parameters)
	const cached = cache.get(key)
	if (cached !== undefined) return cached
	const directory = mkdtempSync(join(tmpdir(), 'discovery-'))
	const listing = join(directory, 'listing.json')
	try {
		const result = spawnSync(
			process.execPath,
			[VITEST, 'list', `--json=${listing}`, ...parameters],
			{
				encoding: 'utf8',
				maxBuffer: 64 * 1024 * 1024,
				timeout: LISTING_TIMEOUT,
				windowsHide: true,
			},
		)
		if (
			args.includes('--project') &&
			result.status === 1 &&
			result.stderr.includes('No projects matched the filter "')
		) {
			cache.set(key, [])
			return []
		}
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
		const collected = parsed.flatMap((entry): Collected[] => {
			if (typeof entry !== 'object' || entry === null) return []
			const record = Object.fromEntries(Object.entries(entry))
			const location =
				typeof record.location === 'object' && record.location !== null
					? Object.fromEntries(Object.entries(record.location))
					: {}
			if (
				typeof record.file !== 'string' ||
				(record.projectName !== undefined && typeof record.projectName !== 'string') ||
				(full && typeof record.name !== 'string')
			) {
				return []
			}
			return [
				{
					file: relative(process.cwd(), record.file).split('\\').join('/'),
					projectName: record.projectName ?? '',
					name: typeof record.name === 'string' ? record.name : undefined,
					line: typeof location.line === 'number' ? location.line : undefined,
					column: typeof location.column === 'number' ? location.column : undefined,
				},
			]
		})
		cache.set(key, collected)
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
	return Object.fromEntries(
		MARKERS.map((marker) => [marker, text.split(marker).length - 1] as const).filter(
			([, count]) => count > 0,
		),
	)
}

function collectListings(
	config: string,
	named: readonly string[],
	gates: Gates,
): readonly Listing[] | undefined {
	const base: Unit = { config, mode: undefined }
	// A gate joins the units unless the base unit or an earlier gate already names the same unit.
	const units: readonly Unit[] = [
		base,
		...gates.units
			.filter(
				(gate, index) =>
					![base, ...gates.units.slice(0, index)].some((unit) => isSameUnit(unit, gate)),
			)
			.map((gate) => ({
				config: gate.config,
				mode: gate.mode,
				...(gate.root === undefined ? {} : { root: gate.root }),
				...(gate.dir === undefined ? {} : { dir: gate.dir }),
			})),
	]
	// A listing is a memo keyed by its arguments: each key is written once, on its first miss.
	const cache = new Map<string, readonly Collected[]>()
	const readings = collectReadings(units, (unit) => readUnit(unit, named, gates, cache))
	if (readings === undefined) return undefined
	const listings = readings.map(({ listing }) => listing)
	const populated = new Set(readings.flatMap((reading) => reading.populated))
	// A project empty under one unit may still list tests under another, so each unit is asked for it.
	const rescans = collectReadings(
		[...new Set(listings.flatMap((listing) => listing.empty))]
			.filter((name) => !populated.has(name))
			.flatMap((name) => units.map((unit) => ({ name, unit }))),
		({ name, unit }) => {
			const selection = listCollected([...readUnitArguments(unit), '--project', name], false, cache)
			return selection === undefined ? undefined : { name, listed: selection.length > 0 }
		},
	)
	if (rescans === undefined) return undefined
	const resolved = new Set([
		...populated,
		...rescans.filter(({ listed }) => listed).map(({ name }) => name),
	])
	return listings.map((listing) => ({
		...listing,
		empty: listing.empty.filter((name) => !resolved.has(name)),
	}))
}

// Runs one read per item in order and stops at the first refusal, so no later read spawns.
function collectReadings<Item, Reading>(
	items: readonly Item[],
	read: (item: Item) => Reading | undefined,
): readonly Reading[] | undefined {
	return items.reduce<readonly Reading[] | undefined>((readings, item) => {
		if (readings === undefined) return undefined
		const reading = read(item)
		return reading === undefined ? undefined : [...readings, reading]
	}, [])
}

function isSameUnit(left: Unit, right: Unit): boolean {
	return (
		left.config === right.config &&
		left.mode === right.mode &&
		left.root === right.root &&
		left.dir === right.dir
	)
}

function readUnit(
	unit: Unit,
	named: readonly string[],
	gates: Gates,
	cache: Map<string, readonly Collected[]>,
): UnitReading | undefined {
	const reached = gates.units.filter((gate) => isSameUnit(gate, unit))
	const parameters = readUnitArguments(unit)
	const collected = listCollected(parameters, true, cache)
	if (collected === undefined) return undefined
	const scope =
		named.length === 0
			? undefined
			: listCollected(
					[...parameters, ...named.flatMap((name) => ['--project', name])],
					false,
					cache,
				)
	if (named.length > 0 && scope === undefined) return undefined
	const selected = collectReadings(reached, (gate) => {
		const selection =
			JSON.stringify(gate.args) === JSON.stringify(parameters)
				? collected
				: listCollected(gate.args, gate.full, cache)
		if (selection === undefined) {
			console.error(`discovery: gate ${gate.chain}: vitest list refused ${gate.args.join(' ')}`)
			return undefined
		}
		return {
			gate,
			identities: new Set(
				selection.map((entry) =>
					JSON.stringify([
						entry.file,
						entry.projectName,
						...(gate.full ? [entry.name, entry.line, entry.column] : []),
					]),
				),
			),
		}
	})
	if (selected === undefined) return undefined
	const readings = collectReadings(
		[...new Set([...reached.flatMap((gate) => gate.projects), ...named])].filter(
			(project) => !project.includes('*') && !project.startsWith('!'),
		),
		(project): ProjectReading | undefined => {
			if (
				selected.some(
					({ gate, identities }) =>
						gate.projects.length === 1 && gate.projects[0] === project && identities.size > 0,
				)
			) {
				return { project, populated: true, empty: false }
			}
			const selection = listCollected([...parameters, '--project', project], false, cache)
			if (selection === undefined) return undefined
			return {
				project,
				populated: selection.length > 0,
				empty:
					selection.length === 0 &&
					(reached.some((gate) => gate.projects.includes(project)) || named.includes(project)) &&
					(named.length === 0 || named.includes(project)),
			}
		},
	)
	if (readings === undefined) return undefined
	return {
		listing: {
			...unit,
			collected: collected
				.filter(
					(entry) =>
						scope === undefined ||
						scope.some(
							(chosen) => chosen.file === entry.file && chosen.projectName === entry.projectName,
						),
				)
				.map((entry) => ({
					...entry,
					gate: selected.find(({ gate, identities }) =>
						identities.has(
							JSON.stringify([
								entry.file,
								entry.projectName,
								...(gate.full ? [entry.name, entry.line, entry.column] : []),
							]),
						),
					)?.gate.chain,
				})),
			empty: readings.filter(({ empty }) => empty).map(({ project }) => project),
		},
		populated: readings.filter(({ populated }) => populated).map(({ project }) => project),
	}
}

function readUnitArguments(unit: Unit): readonly string[] {
	return [
		...(unit.config === undefined ? [] : ['--config', unit.config]),
		...(unit.mode === undefined ? [] : ['--mode', unit.mode]),
		...(unit.root === undefined ? [] : ['--root', unit.root]),
		...(unit.dir === undefined ? [] : ['--dir', unit.dir]),
	]
}

function identifyCollected(entry: Collected): string {
	return JSON.stringify([entry.file, entry.projectName, entry.name, entry.line, entry.column])
}

// The same test listed twice in one listing is two occurrences, and the same occurrence listed by
// two listings is one test: the last listing's fields win, and the gate is the last one any named.
function mergeCollected(listings: readonly Listing[]): readonly Collected[] {
	const keyed = listings.flatMap((listing) => {
		const positions = new Map(
			[...Map.groupBy(listing.collected, identifyCollected).values()].flatMap((group) =>
				group.map((entry, position) => [entry, position + 1] as const),
			),
		)
		return listing.collected.map((entry) => ({
			entry,
			key: JSON.stringify([identifyCollected(entry), positions.get(entry)]),
		}))
	})
	return [...Map.groupBy(keyed, ({ key }) => key).values()].flatMap((group) => {
		const last = group.at(-1)
		return last === undefined
			? []
			: [
					{
						...last.entry,
						gate: group.findLast(({ entry }) => entry.gate !== undefined)?.entry.gate,
					},
				]
	})
}

function readSnapshot(gates: Gates): string {
	const bases = [
		process.cwd(),
		...gates.units.flatMap((gate) =>
			[gate.root, gate.dir].filter((path) => path !== undefined).map((path) => resolve(path)),
		),
	]
	const roots = new Set(bases.flatMap((base) => [base, join(base, 'tmp/probes')]))
	// A later listing of the same path replaces the earlier modification time at the earlier position.
	const files = new Map(
		[...roots].flatMap((root) =>
			existsSync(root)
				? listFiles(root)
						.filter((file) => /\.test\.[cm]?[jt]sx?$/u.test(file.path))
						.map((file) => [file.path, file.modified] as const)
				: [],
		),
	)
	return JSON.stringify([...files].sort(([left], [right]) => left.localeCompare(right)))
}

function collectStableListings(
	config: string,
	named: readonly string[],
	gates: Gates,
	attempt = 0,
): readonly Listing[] | undefined {
	const before = readSnapshot(gates)
	const listings = collectListings(config, named, gates)
	if (before === readSnapshot(gates)) return listings
	if (attempt === 1) throw new Error('Test files changed during both census attempts')
	return collectStableListings(config, named, gates, attempt + 1)
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
	const gates = readGates(readScripts(), canonical, readCLIOptions())
	const named = (readOption(argv, '--projects') ?? '').split(',').filter((name) => name !== '')
	const listings = collectStableListings(canonical, named, gates)
	if (listings === undefined) {
		console.error('discovery: vitest list failed')
		return 2
	}
	const collected = mergeCollected(listings)
	const known = listings.flatMap((listing) => listing.empty)
	const names = new Set<string>([...known, ...collected.map((entry) => entry.projectName)])
	const projects: Project[] = [...names].sort().map((name) => {
		const mine = collected.filter((entry) => entry.projectName === name)
		const units = listings.filter((listing) =>
			listing.collected.some((entry) => entry.projectName === name),
		)
		const chains = mine.map((entry) => entry.gate ?? gates.files.get(entry.file))
		const gate =
			mine.length === 0
				? (
						gates.units.find(
							(unit) => unit.projects.includes(name) && unit.chain.includes(' > '),
						) ?? gates.units.find((unit) => unit.projects.includes(name))
					)?.chain
				: chains.every((chain) => chain !== undefined)
					? chains[0]
					: undefined
		return {
			name,
			gate,
			files: new Set(mine.map((entry) => entry.file)).size,
			tests: mine.length,
			...(units.some(
				(unit) =>
					unit.config !== canonical ||
					unit.mode !== undefined ||
					unit.root !== undefined ||
					unit.dir !== undefined,
			)
				? {
						units: units.map((unit) => ({
							config: unit.config,
							mode: unit.mode,
							...(unit.root === undefined ? {} : { root: unit.root }),
							...(unit.dir === undefined ? {} : { dir: unit.dir }),
						})),
					}
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
	// An empty project no chain containing ` > ` names is a workbench, reported without a flag.
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
			console.log(`discovery: ${name} is an empty workbench; no chain containing " > " names it`)
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

try {
	process.exitCode = main(process.argv.slice(2))
} catch (error) {
	console.error(`discovery: ${error instanceof Error ? error.message : String(error)}`)
	process.exitCode = 2
}
