// Pin a consumer to fresh local tarballs of the packages it depends on, report every pin against the
// ledger that records it, and restore the ranges the pins replaced. Run from any directory:
//   node .agents/skills/orkestrel-publish/scripts/swap.ts --pin --consumer DIR --source DIR [--source DIR ...] [--override NAME ...] [--no-build] [--dry-run] [--json]
//   node .agents/skills/orkestrel-publish/scripts/swap.ts --restore --consumer DIR [--package NAME ...] [--json]
//   node .agents/skills/orkestrel-publish/scripts/swap.ts --status --consumer DIR [--json]
// Give exactly one of --pin, --restore, and --status; --source, --override, and --package repeat.
// --pin refuses a source whose packed manifest names a local dependency in any dependency field:
// npm's local forms, a file: or link: prefix, a path start (., ~/, /, \, or a drive letter), or an
// archive name ending in .tgz, .tar.gz, or .tar that carries no protocol and is not a user/repo
// shorthand. It builds each source (`npm run build`, unless --no-build), and packs it with
// --ignore-scripts, a source that carries a ledger of its own packing with the ranges that ledger
// replaced. Each archive moves to
// <consumer>/tmp/tarballs/<scope>-<name>-<version>-<12 hex of its SHA-256>.tgz. The ledger
// <consumer>/tmp/tarballs/pins.json records the replaced range, the tarball and its SHA-256, the
// source with its commit and dirty flag, whether the overrides block existed before the first pin,
// and the time, and is written before the manifest. The field that declares each package then takes
// the tarball's absolute file: spec, because a relative spec breaks after the consumer is itself
// packed and installed elsewhere. --override NAME sets overrides[NAME] to $NAME when the consumer
// declares NAME, else to the tarball spec of the source named NAME, and a created block lands where
// oxfmt sorts it. The install runs with --ignore-scripts and deletes node_modules/.vite, then the
// proof requires each pinned package, an override-only one included, to be a directory whose file
// set is its pack list and whose bytes are its source's, no other copy of it to be installed, and
// every other top-level @orkestrel package to be byte-unchanged; a proved pin records the digest of
// its installed bytes. --dry-run builds, packs, and writes nothing, and prints the plan.
// --restore puts back each recorded range (all, or each --package) and every override the pins
// replaced, keeps an overrides block that existed before the pin, drops the lock entry and the
// installed copy of each package it restores from the registry or whose override it drops so the
// install resolves them again, installs, and proves each package is installed at what its range
// names. Before it writes anything, --restore refuses with 64 a ledger whose package or override
// keys are not package names, and a removal whose install path resolves outside node_modules.
// --status writes nothing and reports each drift between the ledger, the manifest, the tarballs, the
// installed bytes, and the source commits; a manifest spec holds its tarball only when it names the
// ledger archive's full location.
// --pin and --restore write a receipt create-only to tmp/units/swap-<consumer>-<time>.json under the
// working directory. Every mode prints text lines, or one JSON line with --json.
// Exit 0 on success, 1 when a command or a proof failed, 3 when --status reports drift, 64 on usage.
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import {
	existsSync,
	lstatSync,
	mkdirSync,
	mkdtempSync,
	readdirSync,
	readFileSync,
	realpathSync,
	renameSync,
	rmSync,
	writeFileSync,
} from 'node:fs'
import { basename, dirname, isAbsolute, join, relative, resolve } from 'node:path'
import {
	normalizeSlashes,
	parseJsonRecord,
	readMissingFlags,
	readOption,
	readOptions,
	readString,
	runNpm,
} from '../../orkestrel-dispatch/scripts/helpers.ts'

type Manifest = Readonly<Record<string, unknown>>

// The manifest fields a pin rewrites; `peerDependencies` stays a registry range.
type ManifestField = 'dependencies' | 'devDependencies'

type SwapMode = 'pin' | 'restore' | 'status'

interface Command {
	readonly mode: SwapMode
	readonly consumer: string
	readonly sources: readonly string[]
	readonly overrides: readonly string[]
	readonly packages: readonly string[]
	readonly build: boolean
	readonly dry: boolean
	readonly json: boolean
}

type CommandResult =
	| { readonly ok: true; readonly command: Command }
	| { readonly ok: false; readonly message: string }

interface Source {
	readonly directory: string
	readonly name: string
	readonly version: string
}

interface Declaration {
	readonly field: ManifestField
	readonly spec: string
}

// One source after its pack, or planned with a `pending` hash under --dry-run.
interface Tarball {
	readonly source: Source
	readonly file: string
	readonly spec: string
	readonly sha256: string
	readonly files: readonly string[]
	readonly commit: string | undefined
	readonly dirty: boolean | undefined
}

interface LedgerEntry {
	readonly field?: ManifestField
	readonly replaced?: string
	readonly tarball: string
	readonly sha256: string
	readonly source: string
	readonly commit?: string
	readonly dirty?: boolean
	readonly inventory?: string
	readonly at: string
}

interface OverrideEntry {
	readonly value: string
	readonly replaced?: string
	readonly at: string
}

interface Ledger {
	readonly packages: Readonly<Record<string, LedgerEntry>>
	readonly overrides: Readonly<Record<string, OverrideEntry>>
	readonly blockExisted?: boolean
}

interface Change {
	readonly block: string
	readonly name: string
	readonly from: string | undefined
	readonly to: string | undefined
}

interface PinPlan {
	readonly manifest: Manifest
	readonly ledger: Ledger
	readonly changes: readonly Change[]
}

interface RestorePlan {
	readonly manifest: Manifest
	readonly ledger: Ledger
	readonly changes: readonly Change[]
	readonly rows: ReadonlyArray<{ readonly name: string; readonly entry: LedgerEntry }>
	readonly dropped: readonly string[]
}

interface Copy {
	readonly name: string
	readonly path: string
	readonly version: string | undefined
	readonly link: boolean
}

interface Version {
	readonly major: number
	readonly minor: number
	readonly patch: number
	readonly pre: string | undefined
}

interface Comparator {
	readonly operator: '>=' | '>' | '<=' | '<' | '='
	readonly version: Version
}

const FIELDS: readonly ManifestField[] = ['dependencies', 'devDependencies']
const MODES: readonly SwapMode[] = ['pin', 'restore', 'status']
const TARBALL_DIRECTORY = 'tmp/tarballs'
const LEDGER_FILE = 'pins.json'
const RECEIPT_DIRECTORY = 'tmp/units'
const EXIT_FAILURE = 1
const EXIT_DRIFT = 3
const EXIT_USAGE = 64
const FORMAT_PROBLEM =
	'package.json is not tab-indented JSON with a trailing newline; the script would reformat it'

const VALUE_FLAGS: Readonly<Record<SwapMode, readonly string[]>> = {
	pin: ['--consumer', '--source', '--override'],
	restore: ['--consumer', '--package'],
	status: ['--consumer'],
}

const SWITCH_FLAGS: Readonly<Record<SwapMode, readonly string[]>> = {
	pin: ['--pin', '--no-build', '--dry-run', '--json'],
	restore: ['--restore', '--json'],
	status: ['--status', '--json'],
}

// oxfmt 0.72.0 sorts these `package.json` keys ahead of `overrides`; every other key it knows, and
// every key it does not know, follows it.
const OVERRIDE_PRECEDERS: readonly string[] = [
	'$schema',
	'name',
	'displayName',
	'version',
	'stableVersion',
	'private',
	'description',
	'categories',
	'keywords',
	'homepage',
	'bugs',
	'license',
	'author',
	'maintainers',
	'contributors',
	'repository',
	'funding',
	'qna',
	'publisher',
	'man',
	'style',
	'example',
	'examplestyle',
	'assets',
	'bin',
	'source',
	'directories',
	'workspaces',
	'binary',
	'files',
	'os',
	'cpu',
	'libc',
	'type',
	'sideEffects',
	'main',
	'module',
	'browser',
	'types',
	'typings',
	'typesVersions',
	'react-native',
	'svelte',
	'unpkg',
	'jsdelivr',
	'jsnext:main',
	'umd:main',
	'imports',
	'exports',
	'publishConfig',
	'scripts',
	'betterScripts',
	'dependencies',
	'devDependencies',
	'dependenciesMeta',
	'peerDependencies',
	'peerDependenciesMeta',
	'optionalDependencies',
	'bundledDependencies',
	'bundleDependencies',
	'resolutions',
]

// The manifest blocks whose values are dependency specs; `overrides` nests records of them.
const SPEC_BLOCKS: readonly string[] = [
	'dependencies',
	'devDependencies',
	'peerDependencies',
	'optionalDependencies',
	'overrides',
]

// npm-package-arg reads a spec as local when it carries a `file:` or `link:` prefix or begins like a
// path: a dot, `~/`, a separator, or a drive letter.
const LOCAL_SPEC_PATTERN = /^(?:file:|link:|\.|~[\\/]|[\\/]|[A-Za-z]:)/iu

// It also reads a spec as local when the spec ends in an archive extension and carries no protocol...
const ARCHIVE_SPEC_PATTERN = /^[^:]+\.(?:tgz|tar\.gz|tar)$/iu

// ...unless the spec is a `user/repo` shorthand, which names a hosted repository whatever it ends in.
const SHORTHAND_SPEC_PATTERN = /^[^:@%/\s.-][^:@%/\s]*\/[^:@\s/%]+$/u

// An optional `@scope/` and a name of the characters a registry URL carries untouched; a path
// separator beyond the scope's one `/`, an absolute form, and a drive form fall outside it.
const PACKAGE_NAME_PATTERN = /^(?:@[A-Za-z0-9~-][A-Za-z0-9._~-]*\/)?[A-Za-z0-9~-][A-Za-z0-9._~-]*$/u

const PACKAGE_NAME_LIMIT = 214

const USAGE = [
	'usage: swap.ts --pin --consumer DIR --source DIR [--source DIR ...] [--override NAME ...] [--no-build] [--dry-run] [--json]',
	'       swap.ts --restore --consumer DIR [--package NAME ...] [--json]',
	'       swap.ts --status --consumer DIR [--json]',
].join('\n')

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isLocalSpec(spec: string): boolean {
	const text = spec.trimStart()
	return (
		LOCAL_SPEC_PATTERN.test(text) ||
		(ARCHIVE_SPEC_PATTERN.test(text) && !SHORTHAND_SPEC_PATTERN.test(text))
	)
}

function isPackageName(name: string): boolean {
	return (
		name.length <= PACKAGE_NAME_LIMIT && !name.includes('..') && PACKAGE_NAME_PATTERN.test(name)
	)
}

function isManifestField(value: unknown): value is ManifestField {
	return value === 'dependencies' || value === 'devDependencies'
}

function isLedgerEntry(value: unknown): value is LedgerEntry {
	return (
		isRecord(value) &&
		typeof value.tarball === 'string' &&
		typeof value.sha256 === 'string' &&
		typeof value.source === 'string' &&
		typeof value.at === 'string' &&
		(value.field === undefined || isManifestField(value.field)) &&
		(value.replaced === undefined || typeof value.replaced === 'string') &&
		(value.commit === undefined || typeof value.commit === 'string') &&
		(value.dirty === undefined || typeof value.dirty === 'boolean') &&
		(value.inventory === undefined || typeof value.inventory === 'string')
	)
}

function isOverrideEntry(value: unknown): value is OverrideEntry {
	return (
		isRecord(value) &&
		typeof value.value === 'string' &&
		typeof value.at === 'string' &&
		(value.replaced === undefined || typeof value.replaced === 'string')
	)
}

// A ledger with one malformed row is refused whole, so a restore never drops a range it cannot read.
function parseLedger(value: unknown): Ledger | undefined {
	if (!isRecord(value) || !isRecord(value.packages) || !isRecord(value.overrides)) return undefined
	const rows = Object.entries(value.packages)
	const packages = rows.flatMap(([name, entry]): Array<[string, LedgerEntry]> =>
		isLedgerEntry(entry) ? [[name, entry]] : [],
	)
	const entries = Object.entries(value.overrides)
	const overrides = entries.flatMap(([name, entry]): Array<[string, OverrideEntry]> =>
		isOverrideEntry(entry) ? [[name, entry]] : [],
	)
	if (packages.length !== rows.length || overrides.length !== entries.length) return undefined
	if (value.blockExisted !== undefined && typeof value.blockExisted !== 'boolean') return undefined
	return {
		packages: Object.fromEntries(packages),
		overrides: Object.fromEntries(overrides),
		...(value.blockExisted === undefined ? {} : { blockExisted: value.blockExisted }),
	}
}

function serializeJSON(value: unknown): string {
	return `${JSON.stringify(value, null, '\t')}\n`
}

function readBlock(manifest: Manifest, field: string): Readonly<Record<string, unknown>> {
	const block = manifest[field]
	return isRecord(block) ? block : {}
}

function findDeclaration(manifest: Manifest, name: string): Declaration | undefined {
	const field = FIELDS.find((candidate) => typeof readBlock(manifest, candidate)[name] === 'string')
	const spec = field === undefined ? undefined : readBlock(manifest, field)[name]
	return field === undefined || typeof spec !== 'string' ? undefined : { field, spec }
}

function compareKeys(left: string, right: string): number {
	return left < right ? -1 : left > right ? 1 : 0
}

// A block whose keys are sorted stays sorted, because oxfmt sorts a dependency or override block;
// any other block takes the added keys last.
function mergeEntries(
	kept: ReadonlyArray<readonly [string, unknown]>,
	added: ReadonlyArray<readonly [string, unknown]>,
): ReadonlyArray<readonly [string, unknown]> {
	const sorted = kept.every(
		([name], index) => index === 0 || compareKeys(kept[index - 1]?.[0] ?? '', name) <= 0,
	)
	const merged = [...kept, ...added]
	return sorted ? merged.toSorted(([left], [right]) => compareKeys(left, right)) : merged
}

// A created block lands before the first key oxfmt sorts after `overrides`, or last when every key
// sorts ahead of it.
function placeBlock(manifest: Manifest, field: string, block: Record<string, unknown>): Manifest {
	const entries = Object.entries(manifest)
	const follower = entries.findIndex(([key]) => !OVERRIDE_PRECEDERS.includes(key))
	const position = follower === -1 ? entries.length : follower
	return Object.fromEntries([
		...entries.slice(0, position),
		[field, block],
		...entries.slice(position),
	])
}

// A changed key keeps its position, a key mapped to undefined is removed, and an `overrides` block
// left empty is removed unless `keepEmpty` is set. A block that is absent and gains nothing is not
// created.
function rewriteBlock(
	manifest: Manifest,
	field: string,
	changes: ReadonlyMap<string, string | undefined>,
	keepEmpty: boolean,
): Manifest {
	const present = Object.entries(readBlock(manifest, field))
	const kept = present.flatMap(([name, value]): Array<readonly [string, unknown]> => {
		if (!changes.has(name)) return [[name, value]]
		const next = changes.get(name)
		return next === undefined ? [] : [[name, next]]
	})
	const added = [...changes].flatMap(([name, spec]): Array<readonly [string, unknown]> =>
		spec === undefined || present.some(([existing]) => existing === name) ? [] : [[name, spec]],
	)
	const next = mergeEntries(kept, added)
	if (!Object.hasOwn(manifest, field)) {
		return next.length === 0 ? manifest : placeBlock(manifest, field, Object.fromEntries(next))
	}
	return Object.fromEntries(
		Object.entries(manifest).flatMap(([key, value]): Array<[string, unknown]> => {
			if (key !== field) return [[key, value]]
			return next.length === 0 && field === 'overrides' && !keepEmpty
				? []
				: [[key, Object.fromEntries(next)]]
		}),
	)
}

function renderValue(value: unknown): string | undefined {
	if (value === undefined) return undefined
	return typeof value === 'string' ? value : JSON.stringify(value)
}

function diffManifests(before: Manifest, after: Manifest): readonly Change[] {
	return ['dependencies', 'devDependencies', 'overrides'].flatMap((block) => {
		const from = readBlock(before, block)
		const to = readBlock(after, block)
		const names = [...new Set([...Object.keys(from), ...Object.keys(to)])]
		return names.flatMap((name): Change[] => {
			const left = renderValue(from[name])
			const right = renderValue(to[name])
			return left === right ? [] : [{ block, name, from: left, to: right }]
		})
	})
}

function buildTarballName(name: string, version: string, sha256: string): string {
	return `${name.replace(/^@/u, '').replace('/', '-')}-${version}-${sha256.slice(0, 12)}.tgz`
}

// npm resolves a dependency's relative file: spec against that dependency's own directory, so only an
// absolute spec resolves inside a packed consumer installed elsewhere.
function buildTarballSpec(consumer: string, file: string): string {
	return `file:${normalizeSlashes(resolve(consumer, ...TARBALL_DIRECTORY.split('/'), file))}`
}

// The relative `file:tmp/tarballs/<file>` form is what earlier pins wrote, so a re-pin over it keeps
// the range the first pin replaced.
function isTarballSpec(spec: string): boolean {
	if (!spec.startsWith('file:')) return false
	const path = normalizeSlashes(spec.slice('file:'.length))
	return (
		path.startsWith(`${TARBALL_DIRECTORY}/`) ||
		(isAbsolute(path) && path.includes(`/${TARBALL_DIRECTORY}/`))
	)
}

function buildLedgerEntry(
	manifest: Manifest,
	ledger: Ledger,
	tarball: Tarball,
	at: string,
): LedgerEntry {
	const declaration = findDeclaration(manifest, tarball.source.name)
	const prior = ledger.packages[tarball.source.name]
	const repinned =
		prior !== undefined && declaration !== undefined && isTarballSpec(declaration.spec)
	const replaced = repinned ? prior.replaced : declaration?.spec
	return {
		...(declaration === undefined ? {} : { field: declaration.field }),
		...(replaced === undefined ? {} : { replaced }),
		tarball: tarball.file,
		sha256: tarball.sha256,
		source: normalizeSlashes(tarball.source.directory),
		...(tarball.commit === undefined ? {} : { commit: tarball.commit }),
		...(tarball.dirty === undefined ? {} : { dirty: tarball.dirty }),
		at,
	}
}

// The replaced range is kept from the first pin while the manifest still holds a tarball spec, and a
// package no field declares is recorded without a field and takes effect through its override alone.
// The first pin records whether the manifest held an overrides block, so a restore keeps one that
// existed and removes one the pin created.
function planPin(
	manifest: Manifest,
	ledger: Ledger,
	tarballs: readonly Tarball[],
	overrides: readonly string[],
	at: string,
): PinPlan {
	const rows = tarballs.map((tarball) => ({
		name: tarball.source.name,
		spec: tarball.spec,
		entry: buildLedgerEntry(manifest, ledger, tarball, at),
	}))
	const specs = new Map(tarballs.map((tarball) => [tarball.source.name, tarball.spec]))
	const current = readBlock(manifest, 'overrides')
	const added = overrides.flatMap((name): Array<{ name: string; entry: OverrideEntry }> => {
		const value = findDeclaration(manifest, name) === undefined ? specs.get(name) : `$${name}`
		if (value === undefined) return []
		const prior = ledger.overrides[name]
		const replaced = prior === undefined ? current[name] : prior.replaced
		return [{ name, entry: { value, ...(typeof replaced === 'string' ? { replaced } : {}), at } }]
	})
	const pinned = FIELDS.reduce(
		(manifestSoFar, field) =>
			rewriteBlock(
				manifestSoFar,
				field,
				new Map(
					rows.flatMap((row): Array<[string, string]> =>
						row.entry.field === field ? [[row.name, row.spec]] : [],
					),
				),
				true,
			),
		manifest,
	)
	const next = rewriteBlock(
		pinned,
		'overrides',
		new Map(
			added.map((override): [string, string | undefined] => [override.name, override.entry.value]),
		),
		true,
	)
	const fresh =
		Object.keys(ledger.packages).length === 0 && Object.keys(ledger.overrides).length === 0
	const blockExisted =
		ledger.blockExisted ?? (fresh ? Object.hasOwn(manifest, 'overrides') : undefined)
	return {
		manifest: next,
		ledger: {
			packages: {
				...ledger.packages,
				...Object.fromEntries(rows.map((row) => [row.name, row.entry])),
			},
			overrides: {
				...ledger.overrides,
				...Object.fromEntries(added.map((override) => [override.name, override.entry])),
			},
			...(blockExisted === undefined ? {} : { blockExisted }),
		},
		changes: diffManifests(manifest, next),
	}
}

// An empty name list restores every recorded package and override.
function planRestore(manifest: Manifest, ledger: Ledger, names: readonly string[]): RestorePlan {
	const targets = names.length === 0 ? Object.keys(ledger.packages) : names
	const selected = new Set(targets)
	const rows = targets.flatMap((name): Array<{ name: string; entry: LedgerEntry }> => {
		const entry = ledger.packages[name]
		return entry === undefined ? [] : [{ name, entry }]
	})
	const dropped = Object.keys(ledger.overrides).filter(
		(name) => names.length === 0 || selected.has(name),
	)
	const reverted = FIELDS.reduce(
		(manifestSoFar, field) =>
			rewriteBlock(
				manifestSoFar,
				field,
				new Map(
					rows.flatMap((row): Array<[string, string]> =>
						row.entry.field === field && row.entry.replaced !== undefined
							? [[row.name, row.entry.replaced]]
							: [],
					),
				),
				true,
			),
		manifest,
	)
	const next = rewriteBlock(
		reverted,
		'overrides',
		new Map(
			dropped.map((name): [string, string | undefined] => [name, ledger.overrides[name]?.replaced]),
		),
		ledger.blockExisted === true,
	)
	const remaining = {
		packages: Object.fromEntries(
			Object.entries(ledger.packages).filter(([name]) => !selected.has(name)),
		),
		overrides: Object.fromEntries(
			Object.entries(ledger.overrides).filter(([name]) => !dropped.includes(name)),
		),
	}
	const retained =
		Object.keys(remaining.packages).length > 0 || Object.keys(remaining.overrides).length > 0
	return {
		manifest: next,
		ledger: {
			...remaining,
			...(ledger.blockExisted === undefined || !retained
				? {}
				: { blockExisted: ledger.blockExisted }),
		},
		changes: diffManifests(manifest, next),
		rows,
		dropped,
	}
}

function scanPinRequest(
	text: string,
	manifest: Manifest,
	ledger: Ledger,
	sources: readonly Source[],
	overrides: readonly string[],
): readonly string[] {
	const names = sources.map((source) => source.name)
	const current = readBlock(manifest, 'overrides')
	return [
		...(serializeJSON(manifest) === text ? [] : [FORMAT_PROBLEM]),
		...names.flatMap((name, index) =>
			names.indexOf(name) === index ? [] : [`${name} is named by more than one --source`],
		),
		...sources.flatMap((source) => {
			const declaration = findDeclaration(manifest, source.name)
			return [
				...(declaration === undefined && !overrides.includes(source.name)
					? [`${source.name} is declared by no dependencies field and named by no --override`]
					: []),
				...(declaration !== undefined &&
				isTarballSpec(declaration.spec) &&
				ledger.packages[source.name] === undefined
					? [
							`${source.name} holds a tarball spec the ledger has no record of; restore its range by hand first`,
						]
					: []),
			]
		}),
		...overrides.flatMap((name) => [
			...(findDeclaration(manifest, name) === undefined && !names.includes(name)
				? [`override ${name} is declared by the consumer and built by no --source`]
				: []),
			...(current[name] !== undefined &&
			typeof current[name] !== 'string' &&
			ledger.overrides[name] === undefined
				? [`overrides.${name} is not a string and the script would overwrite it`]
				: []),
		]),
	]
}

function parseVersion(text: string): Version | undefined {
	const match = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/u.exec(
		text.trim(),
	)
	if (match === null) return undefined
	return {
		major: Number(match[1]),
		minor: Number(match[2]),
		patch: Number(match[3]),
		pre: match[4],
	}
}

function comparePrerelease(left: string, right: string): number {
	const leftParts = left.split('.')
	const rightParts = right.split('.')
	const first = leftParts
		.map((part, index) => {
			const other = rightParts[index]
			if (other === undefined) return 1
			if (/^\d+$/u.test(part) && /^\d+$/u.test(other)) return Number(part) - Number(other)
			if (/^\d+$/u.test(part)) return -1
			if (/^\d+$/u.test(other)) return 1
			return compareKeys(part, other)
		})
		.find((order) => order !== 0)
	return first ?? leftParts.length - rightParts.length
}

function compareVersions(left: Version, right: Version): number {
	const core = [left.major - right.major, left.minor - right.minor, left.patch - right.patch].find(
		(order) => order !== 0,
	)
	if (core !== undefined) return core
	if (left.pre === right.pre) return 0
	if (left.pre === undefined) return 1
	if (right.pre === undefined) return -1
	return comparePrerelease(left.pre, right.pre)
}

// Reads `*`, `x`, an exact version, `^`, `~`, and the `>=`, `>`, `<=`, `<`, and `=` operators on full
// versions; an empty list matches every version.
function parseComparators(token: string): readonly Comparator[] | undefined {
	if (token === '*' || token === 'x' || token === 'X' || token === '') return []
	const operator = /^(\^|~|>=|<=|>|<|=)?(.+)$/u.exec(token)
	const version = operator === null ? undefined : parseVersion(operator[2] ?? '')
	if (operator === null || version === undefined) return undefined
	const symbol = operator[1]
	if (symbol === '^') {
		const upper: Version =
			version.major > 0
				? { major: version.major + 1, minor: 0, patch: 0, pre: undefined }
				: version.minor > 0
					? { major: 0, minor: version.minor + 1, patch: 0, pre: undefined }
					: { major: 0, minor: 0, patch: version.patch + 1, pre: undefined }
		return [
			{ operator: '>=', version },
			{ operator: '<', version: upper },
		]
	}
	if (symbol === '~') {
		return [
			{ operator: '>=', version },
			{
				operator: '<',
				version: { major: version.major, minor: version.minor + 1, patch: 0, pre: undefined },
			},
		]
	}
	if (symbol === '>=' || symbol === '>' || symbol === '<=' || symbol === '<') {
		return [{ operator: symbol, version }]
	}
	return [{ operator: '=', version }]
}

function matchesComparator(version: Version, comparator: Comparator): boolean {
	const order = compareVersions(version, comparator.version)
	if (comparator.operator === '>=') return order >= 0
	if (comparator.operator === '>') return order > 0
	if (comparator.operator === '<=') return order <= 0
	if (comparator.operator === '<') return order < 0
	return order === 0
}

function supportsRange(range: string): boolean {
	return range.split('||').every((set) =>
		set
			.trim()
			.split(/\s+/u)
			.every((token) => parseComparators(token) !== undefined),
	)
}

// A prerelease satisfies a set only when one of its comparators names a prerelease of the same
// `major.minor.patch`, and an unreadable range is satisfied by nothing.
function matchesRange(text: string, range: string): boolean {
	const version = parseVersion(text)
	if (version === undefined) return false
	return range.split('||').some((set) => {
		const parsed = set
			.trim()
			.split(/\s+/u)
			.map((token) => parseComparators(token))
		if (parsed.some((tokenComparators) => tokenComparators === undefined)) return false
		const comparators = parsed.flatMap((tokenComparators) => tokenComparators ?? [])
		const admitted =
			version.pre === undefined ||
			comparators.some(
				(comparator) =>
					comparator.version.pre !== undefined &&
					comparator.version.major === version.major &&
					comparator.version.minor === version.minor &&
					comparator.version.patch === version.patch,
			)
		return admitted && comparators.every((comparator) => matchesComparator(version, comparator))
	})
}

function parseCommand(argv: readonly string[]): CommandResult {
	const given = MODES.filter((candidate) => argv.includes(`--${candidate}`))
	const mode = MODES.find((candidate) => argv.includes(`--${candidate}`))
	if (mode === undefined)
		return { ok: false, message: 'Give one of --pin, --restore, and --status' }
	if (given.length > 1) {
		return {
			ok: false,
			message: `Give one mode, not ${given.map((candidate) => `--${candidate}`).join(' and ')}`,
		}
	}
	const values = VALUE_FLAGS[mode]
	const switches = SWITCH_FLAGS[mode]
	const unknown = argv.filter((token, index) =>
		token.startsWith('--')
			? !values.includes(token) && !switches.includes(token)
			: !values.includes(argv[index - 1] ?? ''),
	)
	if (unknown.length > 0) {
		return { ok: false, message: `--${mode} does not read ${unknown.join(', ')}` }
	}
	const missing = readMissingFlags(argv, values)
	if (missing.length > 0) {
		return { ok: false, message: `${missing.join(', ')} given with no value` }
	}
	const consumer = readOption(argv, '--consumer')
	if (consumer === undefined) return { ok: false, message: '--consumer DIR is required' }
	const sources = readOptions(argv, '--source')
	if (mode === 'pin' && sources.length === 0) {
		return { ok: false, message: '--pin takes at least one --source DIR' }
	}
	return {
		ok: true,
		command: {
			mode,
			consumer: resolve(consumer),
			sources: sources.map((source) => resolve(source)),
			overrides: readOptions(argv, '--override'),
			packages: readOptions(argv, '--package'),
			build: !argv.includes('--no-build'),
			dry: argv.includes('--dry-run'),
			json: argv.includes('--json'),
		},
	}
}

function computeHash(value: Uint8Array): string {
	return createHash('sha256').update(value).digest('hex')
}

function loadJSONRecord(path: string): Record<string, unknown> | undefined {
	return existsSync(path) ? parseJsonRecord(readFileSync(path, 'utf8')) : undefined
}

function loadSource(directory: string): Source | undefined {
	const manifest = loadJSONRecord(join(directory, 'package.json'))
	const name = readString(manifest, 'name')
	const version = readString(manifest, 'version')
	return name === undefined || version === undefined ? undefined : { directory, name, version }
}

// npm 11 prints an array and npm 12 an object keyed by package name.
function readPack(text: string): { readonly filename: string; readonly files: readonly string[] } {
	const parsed: unknown = JSON.parse(text)
	const entry: unknown = Array.isArray(parsed)
		? parsed[0]
		: isRecord(parsed)
			? Object.values(parsed)[0]
			: undefined
	if (!isRecord(entry) || typeof entry.filename !== 'string' || !Array.isArray(entry.files)) {
		throw new Error('Unreadable npm pack output')
	}
	const files = entry.files.map((file: unknown) => {
		if (!isRecord(file) || typeof file.path !== 'string') {
			throw new Error('Unreadable npm pack file entry')
		}
		return normalizeSlashes(file.path)
	})
	return { filename: entry.filename, files: files.toSorted() }
}

function invokeNpm(args: readonly string[], cwd: string): string {
	const result = runNpm(args, cwd)
	if (result.error !== undefined) {
		throw new Error(`npm ${args.join(' ')} could not start in ${cwd}: ${result.error.message}`)
	}
	if (result.status !== 0) {
		throw new Error(
			`npm ${args.join(' ')} exited ${String(result.status)} in ${cwd}: ${result.stderr.trim().slice(-2000)}`,
		)
	}
	return result.stdout
}

function inspectCheckout(directory: string): {
	readonly commit: string | undefined
	readonly dirty: boolean | undefined
} {
	const head = spawnSync('git', ['rev-parse', 'HEAD'], {
		cwd: directory,
		encoding: 'utf8',
		windowsHide: true,
	})
	const status = spawnSync('git', ['status', '--porcelain'], {
		cwd: directory,
		encoding: 'utf8',
		windowsHide: true,
	})
	return {
		commit: head.status === 0 ? head.stdout.trim() : undefined,
		dirty: status.status === 0 ? status.stdout.trim() !== '' : undefined,
	}
}

function replaceFile(path: string, text: string): void {
	const temporary = `${path}.${String(process.pid)}.tmp`
	writeFileSync(temporary, text)
	renameSync(temporary, path)
}

function removeTree(path: string): void {
	rmSync(path, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
}

// Vite keys its pre-bundle on the installed version, so a same-version tarball would serve stale bytes.
function installConsumer(consumer: string): void {
	invokeNpm(['install', '--ignore-scripts', '--no-audit', '--no-fund'], consumer)
	removeTree(join(consumer, 'node_modules', '.vite'))
}

// The package's own `node_modules` is skipped, and a link is listed as `path (link)`.
function collectFiles(directory: string, prefix = ''): readonly string[] {
	return readdirSync(directory, { withFileTypes: true })
		.flatMap((entry): readonly string[] => {
			const path = prefix === '' ? entry.name : `${prefix}/${entry.name}`
			if (entry.isSymbolicLink()) return [`${path} (link)`]
			if (entry.isDirectory()) {
				return prefix === '' && entry.name === 'node_modules'
					? []
					: collectFiles(join(directory, entry.name), path)
			}
			return entry.isFile() ? [path] : []
		})
		.toSorted()
}

function computeInventory(directory: string): string {
	const lines = collectFiles(directory).map((path) => {
		const file = join(directory, ...path.split('/'))
		return `${path}\t${existsSync(file) ? computeHash(readFileSync(file)) : 'unreadable'}`
	})
	return computeHash(Buffer.from(lines.join('\n')))
}

function computeScope(
	consumer: string,
	excluded: ReadonlySet<string>,
): Readonly<Record<string, string>> {
	const scope = join(consumer, 'node_modules', '@orkestrel')
	if (!existsSync(scope)) return {}
	return Object.fromEntries(
		readdirSync(scope, { withFileTypes: true }).flatMap((entry): Array<[string, string]> => {
			const name = `@orkestrel/${entry.name}`
			if (excluded.has(name) || entry.name.startsWith('.')) return []
			const path = join(scope, entry.name)
			return [[name, lstatSync(path).isSymbolicLink() ? 'link' : computeInventory(path)]]
		}),
	)
}

function describeMoved(
	before: Readonly<Record<string, string>>,
	after: Readonly<Record<string, string>>,
): readonly string[] {
	return [...new Set([...Object.keys(before), ...Object.keys(after)])].flatMap((name) => {
		const was = before[name]
		const now = after[name]
		if (was === now) return []
		const verb = was === undefined ? 'added' : now === undefined ? 'removed' : 'changed'
		return [`${name} was ${verb} by the install`]
	})
}

// A link is reported and not entered.
function scanModules(directory: string, names: ReadonlySet<string>): readonly Copy[] {
	if (!existsSync(directory)) return []
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		if (entry.name.startsWith('.')) return []
		const packages = entry.name.startsWith('@')
			? readdirSync(join(directory, entry.name), { withFileTypes: true }).map((child) => ({
					id: `${entry.name}/${child.name}`,
					path: join(directory, entry.name, child.name),
					link: child.isSymbolicLink(),
				}))
			: [{ id: entry.name, path: join(directory, entry.name), link: entry.isSymbolicLink() }]
		return packages.flatMap((found): readonly Copy[] => {
			const named: readonly Copy[] = names.has(found.id)
				? [
						{
							name: found.id,
							path: found.path,
							version: readString(loadJSONRecord(join(found.path, 'package.json')), 'version'),
							link: found.link,
						},
					]
				: []
			return found.link
				? named
				: [...named, ...scanModules(join(found.path, 'node_modules'), names)]
		})
	})
}

function locateInstalled(consumer: string, name: string): string {
	return join(consumer, 'node_modules', ...name.split('/'))
}

// A source that is itself pinned was packed with its registry ranges, so its installed manifest is
// compared to those bytes rather than to the source's own manifest. Every pinned source must be
// installed at the top level, so an override that selects no installed dependency fails the proof.
function proveInstalled(
	consumer: string,
	tarball: Tarball,
	declared: boolean,
	copies: readonly Copy[],
): readonly string[] {
	const name = tarball.source.name
	const top = locateInstalled(consumer, name)
	const named = copies.filter((copy) => copy.name === name)
	const nested = named.filter((copy) => resolve(copy.path) !== resolve(top))
	const installed = named.find((copy) => resolve(copy.path) === resolve(top))
	const real = installed !== undefined && !installed.link
	const present = real ? collectFiles(top) : []
	const packed = readPackedManifest(tarball.source.directory)
	const differing = real
		? tarball.files.filter((path) => {
				const file = join(top, ...path.split('/'))
				const expected =
					path === 'package.json' && packed !== undefined
						? Buffer.from(packed)
						: readFileSync(join(tarball.source.directory, ...path.split('/')))
				return !existsSync(file) || computeHash(readFileSync(file)) !== computeHash(expected)
			})
		: []
	return [
		...(installed === undefined
			? [
					`${name} is not installed at ${normalizeSlashes(relative(consumer, top))}${declared ? '' : '; its override selects no installed dependency'}`,
				]
			: []),
		...(installed?.link === true ? [`${name} is installed as a link`] : []),
		...(real && JSON.stringify(present) !== JSON.stringify(tarball.files)
			? [`${name} file set differs from its pack list`]
			: []),
		...(differing.length > 0 ? [`${name} differs from its source in ${differing.join(', ')}`] : []),
		...nested.map(
			(copy) =>
				`${name} has another copy at ${normalizeSlashes(relative(consumer, copy.path))} (version ${copy.version ?? 'unknown'}); add an --override`,
		),
	]
}

function loadResolved(consumer: string, name: string): string | undefined {
	const packages = loadJSONRecord(join(consumer, 'package-lock.json'))?.packages
	const entry = isRecord(packages) ? packages[`node_modules/${name}`] : undefined
	return readString(isRecord(entry) ? entry : undefined, 'resolved')
}

// A registry range needs a real directory whose version the range accepts and a lockfile `resolved`
// that is a registry URL; a `file:` directory range needs a link to that directory or a directory of
// its version; any other spec is reported as unproven.
function proveRestored(consumer: string, name: string, range: string): readonly string[] {
	const installed = locateInstalled(consumer, name)
	if (!existsSync(installed)) return [`${name} is not installed`]
	const link = lstatSync(installed).isSymbolicLink()
	const version = readString(loadJSONRecord(join(installed, 'package.json')), 'version')
	if (range.startsWith('file:')) {
		const target = resolve(consumer, range.slice('file:'.length))
		const expected = readString(loadJSONRecord(join(target, 'package.json')), 'version')
		const linked = link && existsSync(target) && realpathSync(installed) === realpathSync(target)
		return linked || (!link && version !== undefined && version === expected)
			? []
			: [`${name} is not installed from ${range}`]
	}
	if (!supportsRange(range))
		return [`${name} range ${range} is not a registry range the script reads`]
	const resolved = loadResolved(consumer, name)
	return [
		...(link ? [`${name} is installed as a link`] : []),
		...(version === undefined || !matchesRange(version, range)
			? [`${name} ${version ?? 'unknown'} does not satisfy ${range}`]
			: []),
		...(resolved === undefined || !/^https?:/u.test(resolved)
			? [`the lockfile records no registry source for ${name}`]
			: []),
	]
}

function locateLedger(consumer: string): string {
	return join(consumer, ...TARBALL_DIRECTORY.split('/'), LEDGER_FILE)
}

// An absent ledger is an empty one; a malformed ledger is undefined.
function loadLedger(consumer: string): Ledger | undefined {
	const path = locateLedger(consumer)
	if (!existsSync(path)) return { packages: {}, overrides: {} }
	return parseLedger(loadJSONRecord(path))
}

function readLedger(consumer: string): Ledger {
	const ledger = loadLedger(consumer)
	if (ledger === undefined)
		throw new Error(`${normalizeSlashes(locateLedger(consumer))} is malformed`)
	return ledger
}

function renderStamp(at: string): string {
	return at.replace(/[:.]/gu, '-')
}

function writeReceipt(
	consumer: string,
	at: string,
	receipt: Readonly<Record<string, unknown>>,
): string {
	mkdirSync(RECEIPT_DIRECTORY, { recursive: true })
	const path = join(RECEIPT_DIRECTORY, `swap-${basename(consumer)}-${renderStamp(at)}.json`)
	writeFileSync(path, `${JSON.stringify(receipt, null, 2)}\n`, { flag: 'wx' })
	return normalizeSlashes(path)
}

function printReport(
	json: boolean,
	lines: readonly string[],
	report: Readonly<Record<string, unknown>>,
): void {
	process.stdout.write(json ? `${JSON.stringify(report)}\n` : `${lines.join('\n')}\n`)
}

function reportUsage(message: string): number {
	process.stderr.write(`swap: ${message}\n${USAGE}\n`)
	return EXIT_USAGE
}

function hasPins(ledger: Ledger): boolean {
	return Object.keys(ledger.packages).length > 0 || Object.keys(ledger.overrides).length > 0
}

// The manifest a source is packed with: its own, with the ranges and overrides its ledger replaced
// put back when it carries pins.
function loadPackedManifest(directory: string): Manifest {
	const manifest = loadJSONRecord(join(directory, 'package.json'))
	if (manifest === undefined) throw new Error(`${directory}/package.json is unreadable`)
	const ledger = readLedger(directory)
	return hasPins(ledger) ? planRestore(manifest, ledger, []).manifest : manifest
}

// The text a pinned source's manifest is rewritten to for the pack; undefined when the source carries
// no pins and packs its own manifest.
function readPackedManifest(directory: string): string | undefined {
	return hasPins(readLedger(directory)) ? serializeJSON(loadPackedManifest(directory)) : undefined
}

// A source that packs a local dependency spec ships a tarball that resolves only on this host, whether
// or not a ledger recorded the spec.
function scanPackedSpecs(source: Source): readonly string[] {
	const manifest = loadPackedManifest(source.directory)
	return SPEC_BLOCKS.flatMap((block) =>
		collectSpecs(block, manifest[block]).flatMap(([path, spec]) =>
			isLocalSpec(spec)
				? [`${source.name} would pack a local dependency spec: ${path} is ${spec}`]
				: [],
		),
	)
}

// An `overrides` value can nest records, so the path names every key down to the spec.
function collectSpecs(path: string, value: unknown): ReadonlyArray<readonly [string, string]> {
	if (typeof value === 'string') return [[path, value]]
	if (!isRecord(value)) return []
	return Object.entries(value).flatMap(([key, child]) => collectSpecs(`${path}.${key}`, child))
}

// A source that carries a ledger of its own has its manifest rewritten to the recorded ranges for the
// pack and restored byte for byte whether the pack succeeds or throws, so a consumer never receives a
// tarball spec that resolves only inside the source.
function packSource(directory: string, scratch: string): string {
	const args = ['pack', '--ignore-scripts', '--json', '--pack-destination', scratch]
	const packed = readPackedManifest(directory)
	if (packed === undefined) return invokeNpm(args, directory)
	const path = join(directory, 'package.json')
	const original = readFileSync(path)
	writeFileSync(path, packed)
	try {
		return invokeNpm(args, directory)
	} finally {
		writeFileSync(path, original)
	}
}

function packSources(
	sources: readonly Source[],
	build: boolean,
	consumer: string,
): readonly Tarball[] {
	const tarballs = join(consumer, ...TARBALL_DIRECTORY.split('/'))
	mkdirSync(tarballs, { recursive: true })
	const scratch = mkdtempSync(join(tarballs, '.scratch-'))
	try {
		return sources.map((source) => {
			if (build) invokeNpm(['run', 'build'], source.directory)
			const pack = readPack(packSource(source.directory, scratch))
			const packed = join(scratch, basename(pack.filename))
			const sha256 = computeHash(readFileSync(packed))
			const file = buildTarballName(source.name, source.version, sha256)
			renameSync(packed, join(tarballs, file))
			return {
				source,
				file,
				spec: buildTarballSpec(consumer, file),
				sha256,
				files: pack.files,
				...inspectCheckout(source.directory),
			}
		})
	} finally {
		removeTree(scratch)
	}
}

function planTarballs(sources: readonly Source[], consumer: string): readonly Tarball[] {
	return sources.map((source) => {
		const file = buildTarballName(source.name, source.version, '<sha256:12>')
		return {
			source,
			file,
			spec: buildTarballSpec(consumer, file),
			sha256: 'pending',
			files: [],
			...inspectCheckout(source.directory),
		}
	})
}

function renderChange(change: Change): string {
	return `swap: ${change.block}.${change.name} ${change.from ?? '(absent)'} -> ${change.to ?? '(absent)'}`
}

// A proved pin records the digest of its installed bytes, which `--status` compares the install to.
function recordInventory(consumer: string, ledger: Ledger, tarballs: readonly Tarball[]): Ledger {
	const proved = new Map(
		tarballs.flatMap((tarball): Array<[string, string]> => {
			const top = locateInstalled(consumer, tarball.source.name)
			return existsSync(top) && !lstatSync(top).isSymbolicLink()
				? [[tarball.source.name, computeInventory(top)]]
				: []
		}),
	)
	return {
		...ledger,
		packages: Object.fromEntries(
			Object.entries(ledger.packages).map(([name, entry]) => {
				const inventory = proved.get(name)
				return [name, inventory === undefined ? entry : { ...entry, inventory }]
			}),
		),
	}
}

function executePin(command: Command): number {
	const manifestPath = join(command.consumer, 'package.json')
	if (!existsSync(manifestPath)) return reportUsage(`${command.consumer} has no package.json`)
	const text = readFileSync(manifestPath, 'utf8')
	const manifest = parseJsonRecord(text)
	if (manifest === undefined) return reportUsage(`${manifestPath} is not a JSON object`)
	const ledger = readLedger(command.consumer)
	const sources = command.sources.map((directory) => loadSource(directory))
	const unreadable = command.sources.filter((_directory, index) => sources[index] === undefined)
	if (unreadable.length > 0) {
		return reportUsage(`No package name and version in ${unreadable.join(', ')}`)
	}
	const known = sources.flatMap((source) => (source === undefined ? [] : [source]))
	const problems = [
		...scanPinRequest(text, manifest, ledger, known, command.overrides),
		...known.flatMap((source) => scanPackedSpecs(source)),
	]
	if (problems.length > 0) return reportUsage(problems.join('\n'))
	const at = new Date().toISOString()
	if (command.dry) {
		const plan = planPin(
			manifest,
			ledger,
			planTarballs(known, command.consumer),
			command.overrides,
			at,
		)
		printReport(
			command.json,
			['swap: dry run, nothing written', ...plan.changes.map(renderChange)],
			{
				mode: 'pin',
				dry: true,
				consumer: normalizeSlashes(command.consumer),
				build: command.build,
				changes: plan.changes,
				ledger: plan.ledger,
			},
		)
		return 0
	}
	const names = new Set(known.map((source) => source.name))
	const before = computeScope(command.consumer, names)
	const tarballs = packSources(known, command.build, command.consumer)
	const plan = planPin(manifest, ledger, tarballs, command.overrides, at)
	replaceFile(locateLedger(command.consumer), serializeJSON(plan.ledger))
	replaceFile(manifestPath, serializeJSON(plan.manifest))
	installConsumer(command.consumer)
	const copies = scanModules(join(command.consumer, 'node_modules'), names)
	const failures = [
		...tarballs.flatMap((tarball) =>
			proveInstalled(
				command.consumer,
				tarball,
				findDeclaration(manifest, tarball.source.name) !== undefined,
				copies,
			),
		),
		...describeMoved(before, computeScope(command.consumer, names)),
	]
	const recorded =
		failures.length === 0 ? recordInventory(command.consumer, plan.ledger, tarballs) : plan.ledger
	if (failures.length === 0) replaceFile(locateLedger(command.consumer), serializeJSON(recorded))
	const receipt = {
		mode: 'pin',
		consumer: normalizeSlashes(command.consumer),
		at,
		packages: tarballs.map((tarball) => ({
			name: tarball.source.name,
			version: tarball.source.version,
			...recorded.packages[tarball.source.name],
			spec: tarball.spec,
			files: tarball.files.length,
		})),
		overrides: recorded.overrides,
		changes: plan.changes,
		copies: copies.map((copy) => ({
			name: copy.name,
			path: normalizeSlashes(relative(command.consumer, copy.path)),
			version: copy.version,
			link: copy.link,
		})),
		ok: failures.length === 0,
		problems: failures,
	}
	const path = writeReceipt(command.consumer, at, receipt)
	printReport(
		command.json,
		[
			...tarballs.map((tarball) => {
				const replaced = recorded.packages[tarball.source.name]?.replaced
				return `swap: pinned ${tarball.source.name}@${tarball.source.version} to ${tarball.file}${replaced === undefined ? '' : ` (replaced ${replaced})`}`
			}),
			...Object.entries(recorded.overrides).map(
				([name, entry]) => `swap: overrides.${name} is ${entry.value}`,
			),
			...failures.map((failure) => `swap: problem: ${failure}`),
			`swap: receipt ${path}`,
		],
		{ ...receipt, receipt: path },
	)
	return failures.length === 0 ? 0 : EXIT_FAILURE
}

// The re-pin arguments name every source the restored rows recorded and every override they
// dropped, so the pins can come back after a verb that needed the registry ranges.
function buildRepin(consumer: string, plan: RestorePlan): readonly string[] {
	return [
		'--pin',
		'--consumer',
		normalizeSlashes(consumer),
		...plan.rows.flatMap((row) => ['--source', row.entry.source]),
		...plan.dropped.flatMap((name) => ['--override', name]),
	]
}

// npm keeps a lock entry whose version satisfies the restored range, so the tarball `resolved` of a
// pinned package outlives the restore; removing the entry and the installed copy makes the install
// resolve the package again from the registry.
function removePinnedInstalls(consumer: string, names: readonly string[]): void {
	const path = join(consumer, 'package-lock.json')
	const text = existsSync(path) ? readFileSync(path, 'utf8') : undefined
	const lock = text === undefined ? undefined : parseJsonRecord(text)
	if (text !== undefined && lock !== undefined && isRecord(lock.packages)) {
		const kept = Object.entries(lock.packages).filter(
			([key]) => !names.some((name) => key === `node_modules/${name}`),
		)
		const indent = /^\{\r?\n([ \t]+)"/u.exec(text)?.[1] ?? '  '
		replaceFile(
			path,
			`${JSON.stringify({ ...lock, packages: Object.fromEntries(kept) }, null, indent)}\n`,
		)
	}
	for (const name of names) removeTree(locateInstalled(consumer, name))
}

// The packages whose lock entry and installed copy the restore removes: each restored row that
// returns to a registry range, and each dropped override.
function listRemovals(plan: RestorePlan): readonly string[] {
	return [
		...new Set([
			...plan.rows.flatMap((row) =>
				row.entry.field === undefined ||
				row.entry.replaced === undefined ||
				row.entry.replaced.startsWith('file:')
					? []
					: [row.name],
			),
			...plan.dropped,
		]),
	]
}

// Every ledger key becomes a manifest key, a lock key, and an install path, so each must be a package
// name before the restore writes anything.
function scanLedgerNames(ledger: Ledger): readonly string[] {
	return [
		...scanNames('packages', Object.keys(ledger.packages)),
		...scanNames('overrides', Object.keys(ledger.overrides)),
	]
}

function scanNames(block: string, names: readonly string[]): readonly string[] {
	return names
		.filter((name) => !isPackageName(name))
		.map((name) => `The ledger ${block} key ${JSON.stringify(name)} is not a package name`)
}

// A name that passes the package-name rules still resolves outside `node_modules` when a scope
// directory on its way is a link, so the target's real parent is compared to the real `node_modules`.
function isContained(root: string, target: string): boolean {
	const parent = dirname(target)
	const inside = relative(
		existsSync(root) ? realpathSync(root) : resolve(root),
		join(existsSync(parent) ? realpathSync(parent) : resolve(parent), basename(target)),
	)
	return inside !== '' && !isAbsolute(inside) && inside.split(/[\\/]/u)[0] !== '..'
}

function scanRemovals(consumer: string, names: readonly string[]): readonly string[] {
	const root = join(consumer, 'node_modules')
	return names
		.filter((name) => !isContained(root, locateInstalled(consumer, name)))
		.map((name) => `The install of ${name} resolves outside node_modules`)
}

function executeRestore(command: Command): number {
	const manifestPath = join(command.consumer, 'package.json')
	if (!existsSync(manifestPath)) return reportUsage(`${command.consumer} has no package.json`)
	const text = readFileSync(manifestPath, 'utf8')
	const manifest = parseJsonRecord(text)
	if (manifest === undefined) return reportUsage(`${manifestPath} is not a JSON object`)
	if (serializeJSON(manifest) !== text) return reportUsage(FORMAT_PROBLEM)
	const ledger = readLedger(command.consumer)
	const invalid = scanLedgerNames(ledger)
	if (invalid.length > 0) return reportUsage(invalid.join('\n'))
	const unknown = command.packages.filter((name) => ledger.packages[name] === undefined)
	if (unknown.length > 0) return reportUsage(`The ledger records no pin for ${unknown.join(', ')}`)
	if (Object.keys(ledger.packages).length === 0) {
		return reportUsage('The ledger records no pin to restore')
	}
	const at = new Date().toISOString()
	const plan = planRestore(manifest, ledger, command.packages)
	const removals = listRemovals(plan)
	const escaping = scanRemovals(command.consumer, removals)
	if (escaping.length > 0) return reportUsage(escaping.join('\n'))
	replaceFile(manifestPath, serializeJSON(plan.manifest))
	replaceFile(locateLedger(command.consumer), serializeJSON(plan.ledger))
	removePinnedInstalls(command.consumer, removals)
	installConsumer(command.consumer)
	const proved = plan.rows.flatMap((row) =>
		row.entry.field === undefined || row.entry.replaced === undefined
			? []
			: [
					{
						name: row.name,
						range: row.entry.replaced,
						problems: proveRestored(command.consumer, row.name, row.entry.replaced),
					},
				],
	)
	const failures = proved.flatMap((proof) => proof.problems)
	const receipt = {
		mode: 'restore',
		consumer: normalizeSlashes(command.consumer),
		at,
		restored: proved.map((proof) => ({
			name: proof.name,
			range: proof.range,
			source: plan.rows.find((row) => row.name === proof.name)?.entry.source,
			version: readString(
				loadJSONRecord(join(locateInstalled(command.consumer, proof.name), 'package.json')),
				'version',
			),
			resolved: loadResolved(command.consumer, proof.name),
		})),
		dropped: plan.dropped,
		changes: plan.changes,
		repin: buildRepin(command.consumer, plan),
		ok: failures.length === 0,
		problems: failures,
	}
	const path = writeReceipt(command.consumer, at, receipt)
	printReport(
		command.json,
		[
			...proved.map((proof) => `swap: restored ${proof.name} to ${proof.range}`),
			...plan.dropped.map((name) => `swap: dropped overrides.${name}`),
			...failures.map((failure) => `swap: problem: ${failure}`),
			`swap: re-pin with ${receipt.repin.join(' ')}`,
			`swap: receipt ${path}`,
		],
		{ ...receipt, receipt: path },
	)
	return failures.length === 0 ? 0 : EXIT_FAILURE
}

// The manifest spec of a tarball resolved to the location it names, relative specs against the
// consumer, so a spec holds its tarball only when it names the ledger archive itself.
function locateSpecTarget(consumer: string, spec: string): string {
	return normalizeSlashes(resolve(consumer, spec.slice('file:'.length)))
}

function describeStatus(
	name: string,
	entry: LedgerEntry,
	archive: string,
	report: {
		readonly pinned: boolean
		readonly tarball: boolean
		readonly installed: { readonly link: boolean; readonly intact: boolean | undefined } | undefined
		readonly moved: boolean
	},
): readonly string[] {
	return [
		...(report.pinned ? [] : [`${name}: the manifest does not hold ${archive}`]),
		...(report.tarball
			? []
			: [`${name}: ${entry.tarball} is missing or does not match its recorded SHA-256`]),
		...(report.installed === undefined ? [`${name}: not installed`] : []),
		...(report.installed?.link === true ? [`${name}: installed as a link`] : []),
		...(report.installed !== undefined &&
		!report.installed.link &&
		report.installed.intact === undefined
			? [`${name}: the ledger records no proved install; re-pin`]
			: []),
		...(report.installed?.intact === false
			? [`${name}: the installed bytes differ from the pinned build`]
			: []),
		...(report.moved ? [`${name}: ${entry.source} moved from ${entry.commit ?? '?'}; re-pin`] : []),
	]
}

function executeStatus(command: Command): number {
	const manifest = loadJSONRecord(join(command.consumer, 'package.json'))
	if (manifest === undefined) return reportUsage(`${command.consumer} has no readable package.json`)
	const ledger = readLedger(command.consumer)
	const tarballs = join(command.consumer, ...TARBALL_DIRECTORY.split('/'))
	const current = readBlock(manifest, 'overrides')
	const packages = Object.entries(ledger.packages).map(([name, entry]) => {
		const declaration = findDeclaration(manifest, name)
		const top = locateInstalled(command.consumer, name)
		const archive = join(tarballs, entry.tarball)
		const git = existsSync(entry.source) ? inspectCheckout(entry.source) : undefined
		const held = entry.field === undefined ? current[name] : declaration?.spec
		const link = existsSync(top) && lstatSync(top).isSymbolicLink()
		const installed = existsSync(top)
			? {
					version: readString(loadJSONRecord(join(top, 'package.json')), 'version'),
					link,
					intact:
						link || entry.inventory === undefined
							? undefined
							: computeInventory(top) === entry.inventory,
				}
			: undefined
		const report = {
			pinned:
				typeof held === 'string' &&
				isTarballSpec(held) &&
				locateSpecTarget(command.consumer, held) === normalizeSlashes(archive),
			tarball: existsSync(archive) && computeHash(readFileSync(archive)) === entry.sha256,
			installed,
			moved: entry.commit !== undefined && git?.commit !== undefined && git.commit !== entry.commit,
		}
		return {
			row: {
				name,
				field: entry.field,
				replaced: entry.replaced,
				manifest: declaration?.spec,
				...report,
				file: entry.tarball,
				source: {
					directory: entry.source,
					commit: { recorded: entry.commit, current: git?.commit },
					dirty: { recorded: entry.dirty, current: git?.dirty },
				},
				at: entry.at,
			},
			problems: describeStatus(name, entry, normalizeSlashes(archive), report),
		}
	})
	const overrides = Object.entries(ledger.overrides).map(([name, entry]) => ({
		name,
		recorded: entry.value,
		replaced: entry.replaced,
		manifest: renderValue(current[name]),
		matches: current[name] === entry.value,
	}))
	const unrecorded = ['dependencies', 'devDependencies', 'overrides'].flatMap((block) =>
		Object.entries(readBlock(manifest, block)).flatMap(([name, spec]) =>
			typeof spec === 'string' &&
			isTarballSpec(spec) &&
			(block === 'overrides' ? ledger.overrides[name] : ledger.packages[name]) === undefined
				? [`${block}.${name} holds a tarball spec the ledger has no record of`]
				: [],
		),
	)
	const problems = [
		...packages.flatMap((pin) => pin.problems),
		...overrides.flatMap((override) =>
			override.matches
				? []
				: [
						`overrides.${override.name} is ${override.manifest ?? '(absent)'}; the ledger records ${override.recorded}`,
					],
		),
		...unrecorded,
	]
	printReport(
		command.json,
		[
			...packages.map(
				(pin) =>
					`swap: ${pin.row.name} ${pin.row.pinned ? 'pinned' : 'unpinned'} ${pin.row.file}${pin.row.replaced === undefined ? '' : ` (replaced ${pin.row.replaced})`}`,
			),
			...problems.map((problem) => `swap: drift: ${problem}`),
			`swap: ${String(packages.length)} pin(s), ${String(problems.length)} drift(s)`,
		],
		{
			mode: 'status',
			consumer: normalizeSlashes(command.consumer),
			packages: packages.map((pin) => pin.row),
			overrides,
			problems,
		},
	)
	return problems.length === 0 ? 0 : EXIT_DRIFT
}

function main(argv: readonly string[]): number {
	const parsed = parseCommand(argv)
	if (!parsed.ok) return reportUsage(parsed.message)
	try {
		if (parsed.command.mode === 'pin') return executePin(parsed.command)
		if (parsed.command.mode === 'restore') return executeRestore(parsed.command)
		return executeStatus(parsed.command)
	} catch (error) {
		process.stderr.write(`swap: ${error instanceof Error ? error.message : String(error)}\n`)
		return EXIT_FAILURE
	}
}

process.exitCode = main(process.argv.slice(2))
