// Run one repository's release visit, or print the fleet's layer order. Run from the checkout root:
//   node .agents/skills/orkestrel-publish/scripts/wave.ts --visit [--target DIR] [--offline] [--from STEP] [--to STEP] [--prior VERSION] [--dry-run] [--json] [--out FILE]
//   node .agents/skills/orkestrel-publish/scripts/wave.ts --plan [--catalog PATH] [--json]
// --visit runs the visit `wave.md` § Visit a repository fixes, in order, stopping at the first step
// that fails: pin (read `scaffold audit --json`, whose drift exit is the reading the pin closes, then
// re-pin every @orkestrel range to the registry caret and install), commit (`git commit --only` of
// the manifest and lockfile as the preparation commit), overwrite (`scaffold overwrite --json`, then
// `scaffold audit` exiting 0; offline, an exit of 1 whose note names the catalog refusal is
// accepted; on @orkestrel/scaffold itself both are skipped with a note, because the vendored host
// is staged from that checkout), verify (`scaffold audit --json` prints the releases envelope and
// every declared range matches the registry; on @orkestrel/scaffold itself an audit exit of 1 is
// read as the expected foreign-path findings of its own canonical sources), install,
// pins (the self-pin sweep with --prior or the manifest version and every range the visit moved; hits are reported, not
// fatal), format, gates (format:check, lint:check, check, build, test), and compare (the rebuilt
// dist against the published tarball, and the final runtime dependency set against the published
// manifest `npm view NAME --json` serves; both readings are reported, not fatal). The summary
// carries each step's exit and duration, a failed step's refusal (the `code: message` envelope or
// the `note` a JSON verb prints on stdout, else the last stderr lines), the bump ruling, and a
// Markdown row for `.orkestrel/release.md`. --dry-run prints the commands and runs nothing, so its
// ruling is unanswered. --plan reads the marker-bounded catalog table in
// `.claude/agents/orkestrel.md` and prints the packages by layer. Exit 0 when every step passed, 1
// when a step failed, 2 when a reading failed, 64 on usage.
import type { SpawnSyncReturns } from 'node:child_process'
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
	parseJsonRecord,
	readJsonObject,
	readMissingFlags,
	readOption,
	readString,
	runNpm,
} from '../../orkestrel-dispatch/scripts/helpers.ts'

const STEPS: readonly string[] = [
	'pin',
	'commit',
	'overwrite',
	'verify',
	'install',
	'pins',
	'format',
	'gates',
	'compare',
]
const GATES: readonly string[] = ['format:check', 'lint:check', 'check', 'build', 'test']
const RUNTIME_FIELDS: readonly string[] = ['dependencies', 'peerDependencies']
const RANGE_FIELDS: readonly string[] = [...RUNTIME_FIELDS, 'devDependencies']
const CATALOG = '.claude/agents/orkestrel.md'
const OFFLINE_REFUSAL = "'catalog' does not take --offline"
// The vendored host is staged from this package's checkout, so overwriting it from the host deletes
// and replaces its own canon.
const SCAFFOLD = '@orkestrel/scaffold'
const VERSION = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u
// The checkout runs the `.ts` sources and a built twin under `dist/agents` runs `.js` siblings.
const EXTENSION = extname(fileURLToPath(import.meta.url))
const COMPARE = fileURLToPath(new URL(`./compare${EXTENSION}`, import.meta.url))
const PINS = fileURLToPath(new URL(`./pins${EXTENSION}`, import.meta.url))

interface Release {
	readonly name: string
	readonly range: string
	readonly latest: string | undefined
}

interface StepResult {
	readonly step: string
	readonly command: string
	readonly exit: number | undefined
	readonly durationMs: number
	readonly note: string | undefined
}

interface Verdict {
	readonly exit: number | undefined
	readonly note: string | undefined
}

interface RangeMove {
	readonly ranges: Record<string, unknown>
	readonly moved: readonly string[]
}

interface Ruling {
	readonly distMoved: boolean | undefined
	readonly rangesMoved: boolean | undefined
	readonly ranges: readonly string[] | undefined
	readonly hits: number | undefined
}

interface Visit {
	readonly target: string
	readonly name: string | undefined
	readonly version: string | undefined
	readonly steps: readonly StepResult[]
	readonly ruling: Ruling
	readonly row: string
}

interface Runner {
	readonly target: string
	readonly dry: boolean
	readonly offline: boolean
	readonly steps: StepResult[]
}

function readManifest(target: string): Record<string, unknown> | undefined {
	try {
		return parseJsonRecord(readFileSync(join(target, 'package.json'), 'utf8'))
	} catch {
		return undefined
	}
}

function readRanges(
	manifest: Record<string, unknown>,
	fields: readonly string[],
): ReadonlyMap<string, string> {
	return new Map(
		fields.flatMap((field) => {
			const block = manifest[field]
			if (typeof block !== 'object' || block === null) return []
			return Object.entries(block).flatMap(([name, range]) =>
				typeof range === 'string' ? [[`${field} ${name}`, range] as const] : [],
			)
		}),
	)
}

function compareRanges(
	published: ReadonlyMap<string, string>,
	final: ReadonlyMap<string, string>,
): readonly string[] {
	const names = [...new Set([...published.keys(), ...final.keys()])].sort()
	return names.flatMap((name) => {
		const before = published.get(name)
		const after = final.get(name)
		if (before === after) return []
		if (before === undefined) return [`${name} ${String(after)} added`]
		if (after === undefined) return [`${name} ${before} removed`]
		return [`${name} ${before} -> ${after}`]
	})
}

function resolveScaffold(target: string): readonly string[] {
	const installed = join(target, 'node_modules', '@orkestrel', 'scaffold', 'dist', 'bin', 'main.js')
	if (existsSync(installed)) return [process.execPath, installed]
	const own = join(target, 'dist', 'bin', 'main.js')
	if (existsSync(own)) return [process.execPath, own]
	return []
}

function readReleases(text: string): readonly Release[] | undefined {
	const releases = readJsonObject(text)?.releases
	if (!Array.isArray(releases)) return undefined
	return releases.flatMap((entry) => {
		if (typeof entry !== 'object' || entry === null) return []
		const record = Object.fromEntries(Object.entries(entry))
		const name = readString(record, 'name')
		const range = readString(record, 'range')
		if (name === undefined || range === undefined) return []
		return [{ name, range, latest: readString(record, 'latest') }]
	})
}

function describeCommand(file: string, args: readonly string[]): string {
	return [file === process.execPath ? 'node' : file, ...args].join(' ')
}

// A JSON verb writes its refusal envelope or its partial-run note on stdout, so the stderr tail
// alone reads empty for exactly the failures the operator needs named.
function describeFailure(result: SpawnSyncReturns<string>): string | undefined {
	if (result.status === 0) return undefined
	const value = readJsonObject(result.stdout)
	const error = value?.error
	if (typeof error === 'object' && error !== null && !Array.isArray(error)) {
		const envelope = Object.fromEntries(Object.entries(error))
		const code = readString(envelope, 'code')
		const message = readString(envelope, 'message')
		if (code !== undefined && message !== undefined) return `${code}: ${message}`
	}
	const note = readString(value, 'note')
	if (note !== undefined) return note
	return result.stderr
		.trim()
		.split(/\r\n|\n/)
		.slice(-3)
		.join(' | ')
}

function readVerdict(result: SpawnSyncReturns<string>): Verdict {
	return { exit: result.status ?? undefined, note: describeFailure(result) }
}

// A judge reads the finished command and answers the exit and note its one log entry carries, so no
// entry is amended after it is appended.
function runStep(
	runner: Runner,
	step: string,
	file: string,
	args: readonly string[],
	cwd: string,
	judge: (result: SpawnSyncReturns<string>) => Verdict = readVerdict,
): SpawnSyncReturns<string> | undefined {
	const command = describeCommand(file, args)
	if (runner.dry) {
		runner.steps.push({ step, command, exit: undefined, durationMs: 0, note: 'dry run' })
		return undefined
	}
	const started = Date.now()
	const result = spawnSync(file, args, {
		cwd,
		encoding: 'utf8',
		windowsHide: true,
		maxBuffer: 64 * 1024 * 1024,
	})
	const durationMs = Date.now() - started
	const verdict = judge(result)
	runner.steps.push({ step, command, exit: verdict.exit, durationMs, note: verdict.note })
	return result
}

// The audit exits 1 on the drift the pin step exists to close, so its exit is a reading here.
function judgePin(result: SpawnSyncReturns<string>): Verdict {
	const releases = readReleases(result.stdout)
	if (releases === undefined || (result.status !== 0 && result.status !== 1)) {
		return {
			exit: result.status === null || result.status === 0 ? 2 : result.status,
			note:
				releases === undefined ? 'the audit printed no releases envelope' : describeFailure(result),
		}
	}
	return { exit: 0, note: `${releases.length} release reading(s)` }
}

function judgeOverwrite(result: SpawnSyncReturns<string>, offline: boolean): Verdict {
	if (!offline || result.status !== 1) return readVerdict(result)
	const note = readString(readJsonObject(result.stdout), 'note')
	return note !== undefined && note.includes(OFFLINE_REFUSAL)
		? { exit: 0, note: 'offline overwrite skipped the catalog step by design' }
		: { exit: 1, note: describeFailure(result) }
}

// The audit reads the canonical sources of scaffold's own checkout as foreign paths and exits 1.
function judgeVerify(result: SpawnSyncReturns<string>, own: boolean): Verdict {
	if (readReleases(result.stdout) === undefined) {
		return {
			exit: result.status === null || result.status === 0 ? 2 : result.status,
			note: 'the audit printed no releases envelope',
		}
	}
	return own && result.status === 1
		? { exit: 0, note: 'foreign-path findings are expected on the scaffold checkout' }
		: readVerdict(result)
}

function runNpmStep(
	runner: Runner,
	step: string,
	args: readonly string[],
): SpawnSyncReturns<string> | undefined {
	const command = `npm ${args.join(' ')}`
	if (runner.dry) {
		runner.steps.push({ step, command, exit: undefined, durationMs: 0, note: 'dry run' })
		return undefined
	}
	const started = Date.now()
	const result = runNpm(args, runner.target)
	runner.steps.push({
		step,
		command,
		exit: result.status ?? undefined,
		durationMs: Date.now() - started,
		note: describeFailure(result),
	})
	return result
}

function recordStep(runner: Runner, step: string, command: string, note: string): void {
	runner.steps.push({ step, command, exit: runner.dry ? undefined : 0, durationMs: 0, note })
}

function failed(runner: Runner): boolean {
	return runner.steps.some(
		(entry) =>
			entry.exit !== undefined &&
			entry.exit !== 0 &&
			entry.step !== 'pins' &&
			entry.step !== 'compare',
	)
}

// A release moves a declared range to its registry caret when the range differs, and a later release
// of the same name reads the range the earlier one wrote.
function computeRanges(ranges: Record<string, unknown>, releases: readonly Release[]): RangeMove {
	return releases.reduce<RangeMove>(
		(state, release) => {
			if (release.latest === undefined || !(release.name in state.ranges)) return state
			const caret = `^${release.latest}`
			return state.ranges[release.name] === caret
				? state
				: {
						ranges: { ...state.ranges, [release.name]: caret },
						moved: [...state.moved, `${release.name} ${String(release.range)} -> ${caret}`],
					}
		},
		{ ranges, moved: [] },
	)
}

function writeRanges(target: string, releases: readonly Release[]): readonly string[] {
	const manifest = readManifest(target)
	if (manifest === undefined) return []
	const fields = RANGE_FIELDS.flatMap((field) => {
		const block = manifest[field]
		if (typeof block !== 'object' || block === null) return []
		return [{ field, ...computeRanges(Object.fromEntries(Object.entries(block)), releases) }]
	})
	const moved = fields.flatMap((entry) => entry.moved)
	if (moved.length > 0) {
		const written = {
			...manifest,
			...Object.fromEntries(fields.map((entry) => [entry.field, entry.ranges])),
		}
		writeFileSync(join(target, 'package.json'), `${JSON.stringify(written, null, '\t')}\n`)
	}
	return moved
}

function runPin(
	runner: Runner,
	scaffoldFile: string,
	scaffoldPrefix: readonly string[],
	offline: readonly string[],
): void {
	const audit = runStep(
		runner,
		'pin',
		scaffoldFile,
		[...scaffoldPrefix, 'audit', '--json', ...offline],
		runner.target,
		judgePin,
	)
	if (audit !== undefined) {
		const releases = readReleases(audit.stdout)
		if (releases === undefined || (audit.status !== 0 && audit.status !== 1)) return
		const moved = writeRanges(runner.target, releases)
		recordStep(
			runner,
			'pin',
			'rewrite @orkestrel ranges to the registry caret',
			moved.length === 0 ? 'no range moved' : moved.join(', '),
		)
	} else {
		recordStep(runner, 'pin', 'rewrite @orkestrel ranges to the registry caret', 'dry run')
	}
	runNpmStep(runner, 'pin', ['install'])
}

function runCommit(runner: Runner): void {
	const status = runStep(
		runner,
		'commit',
		'git',
		['status', '--porcelain', '--', 'package.json', 'package-lock.json'],
		runner.target,
	)
	if (status === undefined || status.stdout.trim() !== '') {
		runStep(
			runner,
			'commit',
			'git',
			[
				'commit',
				'--only',
				'-m',
				'Re-pin the @orkestrel ranges for the release visit',
				'--',
				'package.json',
				'package-lock.json',
			],
			runner.target,
		)
	} else {
		recordStep(runner, 'commit', 'git commit', 'manifest and lockfile already committed')
	}
}

function runOverwrite(
	runner: Runner,
	scaffoldFile: string,
	scaffoldPrefix: readonly string[],
	offline: readonly string[],
): void {
	runStep(
		runner,
		'overwrite',
		scaffoldFile,
		[...scaffoldPrefix, 'overwrite', '--json', ...offline],
		runner.target,
		(result) => judgeOverwrite(result, runner.offline),
	)
	if (!failed(runner)) {
		runStep(
			runner,
			'overwrite',
			scaffoldFile,
			[...scaffoldPrefix, 'audit', ...offline],
			runner.target,
		)
	}
}

function runVerify(
	runner: Runner,
	scaffoldFile: string,
	scaffoldPrefix: readonly string[],
	offline: readonly string[],
	own: boolean,
): void {
	const audit = runStep(
		runner,
		'verify',
		scaffoldFile,
		[...scaffoldPrefix, 'audit', '--json', ...offline],
		runner.target,
		(result) => judgeVerify(result, own),
	)
	if (audit === undefined) return
	const releases = readReleases(audit.stdout)
	if (releases === undefined) return
	const drift = releases.filter(
		(release) => release.latest !== undefined && release.range !== `^${release.latest}`,
	)
	runner.steps.push({
		step: 'verify',
		command: 'compare every declared range with the registry',
		exit: drift.length === 0 ? 0 : 1,
		durationMs: 0,
		note:
			drift.length === 0
				? undefined
				: drift
						.map((release) => `${release.name} ${release.range} vs ${String(release.latest)}`)
						.join(', '),
	})
}

function runPins(
	runner: Runner,
	before: ReadonlyMap<string, string>,
	version: string | undefined,
): number | undefined {
	const after = readRanges(readManifest(runner.target) ?? {}, RANGE_FIELDS)
	const prior = [...before]
		.filter(([name, range]) => after.get(name) !== range)
		.flatMap(([, range]) => ['--range', range])
	if (version === undefined) {
		recordStep(runner, 'pins', basename(PINS), 'no prior version to sweep for; pass --prior')
		return undefined
	}
	const swept = runStep(
		runner,
		'pins',
		process.execPath,
		[PINS, '--version', version, ...prior],
		runner.target,
	)
	return swept === undefined
		? undefined
		: swept.stdout.split(/\r\n|\n/).filter((line) => /^\S+:\d+: /u.test(line)).length
}

function runCompare(runner: Runner, name: string | undefined): Ruling {
	const compared = runStep(runner, 'compare', process.execPath, [COMPARE, '--json'], runner.target)
	const distMoved =
		compared === undefined
			? undefined
			: compared.status === 3
				? true
				: compared.status === 0
					? false
					: undefined
	if (name === undefined) {
		recordStep(runner, 'compare', 'npm view', 'the manifest names no package to read')
		return { distMoved, rangesMoved: undefined, ranges: undefined, hits: undefined }
	}
	const view = runNpmStep(runner, 'compare', ['view', name, '--json'])
	const published =
		view === undefined || view.status !== 0 ? undefined : parseJsonRecord(view.stdout)
	if (published === undefined) {
		return { distMoved, rangesMoved: undefined, ranges: undefined, hits: undefined }
	}
	const ranges = compareRanges(
		readRanges(published, RUNTIME_FIELDS),
		readRanges(readManifest(runner.target) ?? {}, RUNTIME_FIELDS),
	)
	return { distMoved, rangesMoved: ranges.length > 0, ranges, hits: undefined }
}

function describeReading(moved: boolean | undefined, movedWord: string, sameWord: string): string {
	return moved === undefined ? 'unanswered' : moved ? movedWord : sameWord
}

function runVisit(argv: readonly string[]): Visit | undefined {
	const target = readOption(argv, '--target') ?? process.cwd()
	if (!existsSync(join(target, 'package.json'))) {
		console.error(`wave: ${target} carries no package.json`)
		return undefined
	}
	const scaffold = resolveScaffold(target)
	if (scaffold.length === 0) {
		console.error(`wave: no scaffold executable under ${target}; run npm install first`)
		return undefined
	}
	const [scaffoldFile, ...scaffoldPrefix] = scaffold
	if (scaffoldFile === undefined) return undefined
	const runner: Runner = {
		target,
		dry: argv.includes('--dry-run'),
		offline: argv.includes('--offline'),
		steps: [],
	}
	const from = STEPS.indexOf(readOption(argv, '--from') ?? 'pin')
	const to = STEPS.indexOf(readOption(argv, '--to') ?? 'compare')
	const selected = new Set(STEPS.slice(from, to + 1))
	const manifest = readManifest(target)
	if (manifest === undefined) {
		console.error(`wave: ${target} carries an unreadable package.json`)
		return undefined
	}
	const name = readString(manifest, 'name')
	const version = readString(manifest, 'version')
	const before = readRanges(manifest, RANGE_FIELDS)
	const offline = runner.offline ? ['--offline'] : []
	if (selected.has('pin')) runPin(runner, scaffoldFile, scaffoldPrefix, offline)
	if (selected.has('commit') && !failed(runner)) runCommit(runner)
	if (selected.has('overwrite') && !failed(runner)) {
		if (name === SCAFFOLD) {
			recordStep(
				runner,
				'overwrite',
				describeCommand(scaffoldFile, [...scaffoldPrefix, 'overwrite', '--json', ...offline]),
				`skipped with its audit: ${SCAFFOLD} is the package whose checkout the vendored host is staged from`,
			)
		} else runOverwrite(runner, scaffoldFile, scaffoldPrefix, offline)
	}
	if (selected.has('verify') && !failed(runner)) {
		runVerify(runner, scaffoldFile, scaffoldPrefix, offline, name === SCAFFOLD)
	}
	if (selected.has('install') && !failed(runner)) runNpmStep(runner, 'install', ['install'])
	const hits =
		selected.has('pins') && !failed(runner)
			? runPins(runner, before, readOption(argv, '--prior') ?? version)
			: undefined
	if (selected.has('format') && !failed(runner)) runNpmStep(runner, 'format', ['run', 'format'])
	if (selected.has('gates') && !failed(runner)) {
		for (const gate of GATES) {
			if (failed(runner)) break
			runNpmStep(runner, 'gates', ['run', gate])
		}
	}
	const compared: Ruling =
		selected.has('compare') && !failed(runner)
			? runCompare(runner, name)
			: { distMoved: undefined, rangesMoved: undefined, ranges: undefined, hits: undefined }
	const ruling: Ruling = { ...compared, hits }
	const bump =
		ruling.distMoved === true || ruling.rangesMoved === true
			? 'bump'
			: ruling.distMoved === undefined || ruling.rangesMoved === undefined
				? 'unanswered'
				: 'no bump'
	const reading = `dist ${describeReading(ruling.distMoved, 'moved', 'same')}, ranges ${describeReading(ruling.rangesMoved, 'moved', 'same')}${hits === undefined ? '' : `, ${hits} self-pin hit(s)`}`
	return {
		target,
		name,
		version,
		steps: runner.steps,
		ruling,
		row: `| ${name ?? target} | ${version ?? '?'} | ${bump} | ${reading} | round |`,
	}
}

function readLayers(catalogPath: string): ReadonlyMap<string, readonly string[]> | undefined {
	if (!existsSync(catalogPath)) return undefined
	const text = readFileSync(catalogPath, 'utf8')
	const start = text.indexOf('<!-- orkestrel:catalog -->')
	const end = text.indexOf('<!-- /orkestrel:catalog -->')
	if (start === -1 || end === -1) return undefined
	const rows = text
		.slice(start, end)
		.split(/\r\n|\n/)
		.flatMap((line) => {
			const match = line.match(
				/^\|\s*`(@orkestrel\/[a-z0-9-]+)`\s*\|\s*`([^`]+)`\s*\|\s*(L\d+)\s*\|/u,
			)
			return match?.[1] === undefined || match[3] === undefined
				? []
				: [{ layer: match[3], member: `${match[1]} ${match[2] ?? ''}`.trim() }]
		})
	return new Map(
		[...Map.groupBy(rows, ({ layer }) => layer)]
			.map(([layer, members]) => [layer, members.map(({ member }) => member)] as const)
			.sort(([left], [right]) => Number(left.slice(1)) - Number(right.slice(1))),
	)
}

function renderVisit(visit: Visit): string {
	const lines = [
		...visit.steps.map(
			(entry) =>
				`wave: ${entry.step.padEnd(9)} exit=${entry.exit === undefined ? 'dry' : String(entry.exit)} ${String(entry.durationMs).padStart(7)} ms  ${entry.command}${entry.note === undefined ? '' : `  (${entry.note})`}`,
		),
		`wave: ruling dist ${describeReading(visit.ruling.distMoved, 'moved', 'same')}, ranges ${describeReading(visit.ruling.rangesMoved, 'moved', 'same')}${visit.ruling.hits === undefined ? '' : `, ${visit.ruling.hits} self-pin hit(s)`}`,
		...(visit.ruling.ranges ?? []).map((range) => `wave: range ${range}`),
		visit.row,
	]
	return `${lines.join('\n')}\n`
}

function main(argv: readonly string[]): number {
	const missing = readMissingFlags(argv, [
		'--target',
		'--from',
		'--to',
		'--prior',
		'--catalog',
		'--out',
	])
	if (missing.length > 0) {
		console.error(`wave: ${missing.join(', ')} given with no value`)
		return 64
	}
	if (argv.includes('--plan') && argv.includes('--visit')) {
		console.error('wave: --plan and --visit are two modes; name one')
		return 64
	}
	if (argv.includes('--plan')) {
		const layers = readLayers(readOption(argv, '--catalog') ?? CATALOG)
		if (layers === undefined) {
			console.error('wave: no marker-bounded catalog table; run scaffold catalog first')
			return 2
		}
		if (argv.includes('--json')) console.log(JSON.stringify(Object.fromEntries(layers)))
		else for (const [layer, members] of layers) console.log(`${layer}\t${members.join(', ')}`)
		return 0
	}
	if (!argv.includes('--visit')) {
		console.error(
			'usage: wave.ts --visit [--target DIR] [--offline] [--from STEP] [--to STEP] [--prior VERSION] [--dry-run] [--json] [--out FILE] | --plan [--catalog PATH] [--json]',
		)
		return 64
	}
	const from = STEPS.indexOf(readOption(argv, '--from') ?? 'pin')
	const to = STEPS.indexOf(readOption(argv, '--to') ?? 'compare')
	if (from === -1 || to === -1 || to < from) {
		console.error(`wave: --from and --to name steps in order from: ${STEPS.join(', ')}`)
		return 64
	}
	const prior = readOption(argv, '--prior')
	if (prior !== undefined && !VERSION.test(prior)) {
		console.error(
			'wave: --prior takes the version the package carried before its bump, MAJOR.MINOR.PATCH',
		)
		return 64
	}
	const visit = runVisit(argv)
	if (visit === undefined) return 2
	const output = argv.includes('--json') ? `${JSON.stringify(visit)}\n` : renderVisit(visit)
	const out = readOption(argv, '--out')
	if (out === undefined) process.stdout.write(output)
	else {
		mkdirSync(dirname(out), { recursive: true })
		writeFileSync(out, output)
		console.log(`wave: wrote ${out}`)
	}
	return visit.steps.some(
		(entry) =>
			entry.exit !== undefined &&
			entry.exit !== 0 &&
			entry.step !== 'pins' &&
			entry.step !== 'compare',
	)
		? 1
		: 0
}

process.exitCode = main(process.argv.slice(2))
