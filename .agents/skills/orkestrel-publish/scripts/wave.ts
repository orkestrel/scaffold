// Run one repository's release visit, or print the fleet's layer order. Run from the checkout root:
//   node .agents/skills/orkestrel-publish/scripts/wave.ts --visit [--target DIR] [--offline] [--regenerate] [--from STEP] [--to STEP] [--prior VERSION] [--dry-run] [--json] [--out FILE]
//   node .agents/skills/orkestrel-publish/scripts/wave.ts --plan [--catalog PATH] [--json]
// --visit runs the visit `wave.md` § Visit a repository fixes, in order, stopping at the first step
// that fails: pin (read `scaffold audit --json`, whose drift exit is the reading the pin closes, then
// re-pin every range the audit release readings name to the registry caret and install), commit (`git commit --only` of
// the manifest and lockfile as the preparation commit), overwrite (`scaffold overwrite --json`, then
// `scaffold audit` exiting 0; offline, an exit of 1 whose note names the catalog refusal is
// accepted; on @orkestrel/scaffold itself both are skipped with a note, because the vendored host
// is staged from that checkout), verify (`scaffold audit --json` prints the releases envelope and
// the audit's writable dependency population matches its lookup bounds; on @orkestrel/scaffold itself an audit exit of 1 is
// read as the expected foreign-path findings of its own canonical sources), install,
// pins (the self-pin sweep with --prior or the manifest version and every range the visit moved; hits are reported, not
// fatal), format, record (commit the overwrite paths), gates (format:check, lint:check, check, build, test), and compare (the rebuilt
// dist against the published tarball, and the final runtime dependency set against the published
// manifest `npm view NAME --json` serves; both readings are reported, not fatal). The summary
// carries each step's exit and duration, a failed step's refusal (the `code: message` envelope or
// the `note` a JSON verb prints on stdout, else the last stderr lines), the bump ruling, and a
// Markdown row for `.orkestrel/release.md`. --dry-run prints the commands and runs nothing, so its
// ruling is unanswered. --plan reads the marker-bounded catalog table in
// `.claude/agents/orkestrel.md` and prints the packages by layer. The pins and compare steps run
// `pins.ts` and `compare.ts` as child commands. Exit 0 when every step passed, 1 when a step
// failed, 2 when a reading failed, 64 on usage, including --plan --regenerate, a flag the script
// does not read, and the `--flag=value` form.
import type { SpawnSyncReturns } from 'node:child_process'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import {
	copyFileSync,
	existsSync,
	lstatSync,
	readFileSync,
	mkdirSync,
	realpathSync,
	renameSync,
	rmSync,
	unlinkSync,
	writeFileSync,
} from 'node:fs'
import { basename, dirname, extname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Lists the steps of a visit in the order they run. */
export const STEPS: readonly string[] = [
	'pin',
	'commit',
	'overwrite',
	'verify',
	'install',
	'pins',
	'format',
	'record',
	'gates',
	'compare',
]

/** Lists the package scripts the gates step runs, in order. */
export const GATES: readonly string[] = ['format:check', 'lint:check', 'check', 'build', 'test']

/** Lists the manifest fields whose ranges ship to a consumer. */
export const RUNTIME_FIELDS: readonly string[] = ['dependencies', 'peerDependencies']

/** Lists the manifest fields whose ranges a visit re-pins. */
export const RANGE_FIELDS: readonly string[] = [...RUNTIME_FIELDS, 'devDependencies']

/** Names the agent file that carries the catalog table. */
export const CATALOG = '.claude/agents/orkestrel.md'

/** Holds the text an offline overwrite refusal names. */
export const OFFLINE_REFUSAL = "'catalog' does not take --offline"

/**
 * Names the package whose checkout the vendored host is staged from.
 *
 * @remarks
 * The vendored host is staged from this package's checkout, so overwriting it from the host deletes
 * and replaces its own canon.
 */
export const SCAFFOLD = '@orkestrel/scaffold'

/** Matches a plain version, optionally with a prerelease. */
export const VERSION = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u

/**
 * Names the extension of the running file.
 *
 * @remarks
 * The checkout runs the `.ts` sources and a built twin under `dist/agents` runs `.js` siblings.
 */
export const EXTENSION = extname(fileURLToPath(import.meta.url))

/** Holds the path of the sibling `compare` script. */
export const COMPARE = fileURLToPath(new URL(`./compare${EXTENSION}`, import.meta.url))

/** Holds the path of the sibling `pins` script. */
export const PINS = fileURLToPath(new URL(`./pins${EXTENSION}`, import.meta.url))

/**
 * Matches one entry of `git status --porcelain=v1 -z` output.
 *
 * @remarks
 * A rename or copy entry carries its original path as a second NUL-terminated field. The first
 * group holds a rename's new path, the second its original, and the third any other entry's path.
 */
export const DIRTY_ENTRY =
	/(?=[RC][^\0]|[^\0][RC])[^\0]{2} ([^\0]*)\0([^\0]*)(?:\0|$)|[^\0]{2} ([^\0]*)(?:\0|$)/gu

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = [
	'--visit',
	'--plan',
	'--target',
	'--offline',
	'--regenerate',
	'--from',
	'--to',
	'--prior',
	'--dry-run',
	'--json',
	'--out',
	'--catalog',
]

/** Holds the usage line the script prints when no mode was given. */
export const USAGE =
	'usage: wave.ts --visit [--target DIR] [--offline] [--regenerate] [--from STEP] [--to STEP] [--prior VERSION] [--dry-run] [--json] [--out FILE] | --plan [--catalog PATH] [--json]'

/** Names the manifest fields that hold specs, including nested overrides. */
export const SPEC_FIELDS: readonly string[] = Object.freeze([
	'dependencies',
	'devDependencies',
	'peerDependencies',
	'optionalDependencies',
	'overrides',
])

/** Matches npm local prefixes and path starts, including drive-relative paths. */
export const LOCAL_SPEC_PATTERN = /^(?:file:|link:|\.|~[\\/]|[\\/]|[A-Za-z]:)/iu

/** Matches archive specs with no protocol and a tgz, tar.gz, or tar extension. */
export const ARCHIVE_SPEC_PATTERN = /^[^:]+\.(?:tgz|tar\.gz|tar)$/iu

/** Matches hosted user/repository shorthand even when its name ends in an archive extension. */
export const SHORTHAND_SPEC_PATTERN = /^[^:@%/\s.-][^:@%/\s]*\/[^:@\s/%]+$/u

/** Describes one dependency the audit read a release for. */
export interface Release {
	readonly name: string
	readonly range: string
	readonly latest: string | undefined
}

/** Describes one row of a visit's log. */
export interface StepResult {
	readonly step: string
	readonly command: string
	readonly exit: number | undefined
	readonly durationMs: number
	readonly note: string | undefined
	readonly journal?: string
	readonly superseded?: true
}

/** Describes the exit and note a judge reads from a finished command. */
export interface Verdict {
	readonly exit: number | undefined
	readonly note: string | undefined
	readonly superseded?: true
}

/** Describes the ranges after a re-pin and the moves that made them. */
export interface RangeMove {
	readonly ranges: Record<string, unknown>
	readonly moved: readonly string[]
}

/** Describes the bump ruling a visit reaches. */
export interface Ruling {
	readonly distMoved: boolean | undefined
	readonly rangesMoved: boolean | undefined
	readonly ranges: readonly string[] | undefined
	readonly hits: number | undefined
}

/** Describes a finished visit. */
export interface Visit {
	readonly target: string
	readonly name: string | undefined
	readonly version: string | undefined
	readonly steps: readonly StepResult[]
	readonly ruling: Ruling
	readonly row: string
}

/** Describes the state one visit runs with. */
export interface Runner {
	readonly target: string
	readonly dry: boolean
	readonly offline: boolean
	readonly regenerate: boolean
	readonly directory: string | undefined
	readonly steps: StepResult[]
}

/** Describes the receipt the overwrite step leaves for the record step. */
export interface OverwriteReceipt {
	readonly head: string
	readonly version: string
	readonly offline: boolean
	readonly written: readonly string[]
	readonly removed: readonly string[]
}

/** Describes the outcome of writing a journal file. */
export interface Journal {
	readonly path?: string
	readonly failure?: string
}

/** Describes the outcome of regenerating a lock and its tree. */
export interface Regeneration {
	readonly exit: number
	readonly note: string
	readonly installed?: SpawnSyncReturns<string>
	readonly listed?: SpawnSyncReturns<string>
	readonly duration?: number
}

/** Describes how to spawn npm on this host without a shell where the CLI entry is present. */
export interface NpmCommand {
	readonly file: string
	readonly prefix: readonly string[]
	readonly shell: boolean
}

/**
 * Checks whether a value is a non-null, non-array object.
 *
 * @param value - The value to inspect.
 * @returns True if the value is an object other than null or an array; false otherwise.
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Checks whether npm resolves a spec from the local host.
 *
 * @param spec - The package spec, with leading whitespace ignored.
 * @returns True if the spec names a local path or archive; false otherwise.
 */
export function matchesLocalSpec(spec: string): boolean {
	const text = spec.trimStart()
	return (
		LOCAL_SPEC_PATTERN.test(text) ||
		(ARCHIVE_SPEC_PATTERN.test(text) && !SHORTHAND_SPEC_PATTERN.test(text))
	)
}

/**
 * Collects string specs with the dotted path of each nested record member.
 *
 * @param path - The field path that prefixes each finding.
 * @param value - A string or finite, acyclic manifest record; other values contribute no specs.
 * @returns The path and spec pairs in record order.
 */
export function collectSpecs(
	path: string,
	value: unknown,
): ReadonlyArray<readonly [string, string]> {
	if (typeof value === 'string') return [[path, value]]
	if (!isRecord(value)) return []
	return Object.entries(value).flatMap(([key, child]) => collectSpecs(`${path}.${key}`, child))
}

/**
 * Finds local specs in the manifest's spec fields, including nested overrides.
 *
 * @param manifest - A finite, acyclic package manifest record.
 * @returns Each local spec's dotted field path and spec, in field and record order.
 */
export function scanLocalSpecs(
	manifest: Readonly<Record<string, unknown>>,
): ReadonlyArray<readonly [string, string]> {
	return SPEC_FIELDS.flatMap((field) =>
		collectSpecs(field, manifest[field]).filter(([, spec]) => matchesLocalSpec(spec)),
	)
}

/**
 * Removes a tree with bounded retries for transient host removal errors.
 *
 * @param path - The directory to remove; a missing path succeeds.
 * @returns Nothing after the removal succeeds.
 * @throws Thrown when removal fails after the bounded retries or the host refuses the path.
 */
export function removeTree(path: string): void {
	rmSync(path, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
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
 * @param name - The flag, such as `--target`.
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
 * Reads the last non-empty line of a text as a JSON object.
 *
 * @param text - Text whose last line a script printed as JSON.
 * @returns The parsed object, or undefined when the last line is not a JSON object.
 */
export function parseJsonLine(text: string): Record<string, unknown> | undefined {
	const line = text
		.split(/\r\n|\n/)
		.filter((candidate) => candidate.trim() !== '')
		.at(-1)
	if (line === undefined) return undefined
	try {
		const parsed: unknown = JSON.parse(line)
		if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
			return Object.fromEntries(Object.entries(parsed))
		}
	} catch {}
	return undefined
}

/**
 * Parses a whole text as one JSON object.
 *
 * @param text - A JSON document, formatted or not, such as a manifest or `npm view --json` output.
 * @returns The parsed object, or undefined when the text is not a JSON object.
 */
export function parseJsonRecord(text: string): Record<string, unknown> | undefined {
	try {
		const parsed: unknown = JSON.parse(text)
		if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
			return Object.fromEntries(Object.entries(parsed))
		}
	} catch {}
	return undefined
}

/**
 * Reads a string member of a record.
 *
 * @param record - The record, or undefined.
 * @param key - The member name.
 * @returns The string, or undefined when the member is absent or not a string.
 */
export function readString(
	record: Record<string, unknown> | undefined,
	key: string,
): string | undefined {
	const value = record?.[key]
	return typeof value === 'string' ? value : undefined
}

/**
 * Resolves the npm command for this host.
 *
 * @remarks
 * The `npm-cli.js` entry beside the running Node binary spawns without a shell on every host; the
 * `npm` shim on Windows is a `.cmd` file that needs one, so that path is the fallback alone.
 *
 * @returns The file to spawn, the arguments that precede npm's own, and whether a shell is needed.
 */
export function resolveNpm(): NpmCommand {
	const cli = join(dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js')
	if (existsSync(cli)) return { file: process.execPath, prefix: [cli], shell: false }
	return { file: 'npm', prefix: [], shell: process.platform === 'win32' }
}

/**
 * Runs npm with the given arguments and returns the finished child.
 *
 * @param args - The npm arguments, such as `['install']`.
 * @param cwd - The working directory. Default: the current directory.
 * @returns The spawn result with `utf8` stdout and stderr.
 */
export function runNpm(args: readonly string[], cwd?: string): SpawnSyncReturns<string> {
	const npm = resolveNpm()
	return spawnSync(npm.file, [...npm.prefix, ...args], {
		encoding: 'utf8',
		windowsHide: true,
		shell: npm.shell,
		maxBuffer: 64 * 1024 * 1024,
		...(cwd === undefined ? {} : { cwd }),
	})
}

/**
 * Reads a target's package manifest.
 *
 * @param target - The target directory.
 * @returns The manifest record, or undefined when it is absent, unreadable, or not a JSON object.
 */
export function readManifest(target: string): Record<string, unknown> | undefined {
	try {
		return parseJsonRecord(readFileSync(join(target, 'package.json'), 'utf8'))
	} catch {
		return undefined
	}
}

/**
 * Reads the ranges a manifest declares in the named fields.
 *
 * @param manifest - The manifest record.
 * @param fields - The fields to read.
 * @returns Each string range keyed by `field name`.
 */
export function readRanges(
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

/**
 * Lists how the final ranges differ from the published ones.
 *
 * @param published - The ranges the published manifest declares.
 * @param final - The ranges the target declares now.
 * @returns One message per range added, removed, or changed, sorted by key.
 */
export function compareRanges(
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

/**
 * Resolves the scaffold executable a target runs.
 *
 * @param target - The target directory.
 * @returns Node and the installed scaffold entry, else Node and the target's own built entry, else
 * none.
 */
export function resolveScaffold(target: string): readonly string[] {
	const installed = join(target, 'node_modules', '@orkestrel', 'scaffold', 'dist', 'bin', 'main.js')
	if (existsSync(installed)) return [process.execPath, installed]
	const own = join(target, 'dist', 'bin', 'main.js')
	if (existsSync(own)) return [process.execPath, own]
	return []
}

/**
 * Reads the release readings out of an audit's standard output.
 *
 * @param text - The audit's standard output, whose last line is the JSON envelope.
 * @returns One release per reading that names a dependency and its range, or undefined when the
 * envelope carries no `releases` list.
 */
export function readReleases(text: string): readonly Release[] | undefined {
	const releases = parseJsonLine(text)?.releases
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

/**
 * Renders a command as the line a step row carries.
 *
 * @param file - The executable.
 * @param args - Its arguments.
 * @returns The command line, naming the running Node binary as `node`.
 */
export function renderCommand(file: string, args: readonly string[]): string {
	return [file === process.execPath ? 'node' : file, ...args].join(' ')
}

/**
 * Names why a finished command failed.
 *
 * @remarks
 * A JSON verb writes its refusal envelope or its partial-run note on stdout, so the stderr tail
 * alone reads empty for exactly the failures the operator needs named.
 *
 * @param result - The finished command.
 * @returns Nothing for exit 0; else the `code: message` envelope, the `note`, or the last stderr lines.
 */
export function describeFailure(result: SpawnSyncReturns<string>): string | undefined {
	if (result.status === 0) return undefined
	const value = parseJsonLine(result.stdout)
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
		.split(/\r\n|\n/)
		.filter((line) => line.trim() !== '')
		.slice(-3)
		.join(' | ')
}

/**
 * Reads the verdict of a finished command by its exit alone.
 *
 * @param result - The finished command.
 * @returns The exit and the failure note.
 */
export function readVerdict(result: SpawnSyncReturns<string>): Verdict {
	return { exit: result.status ?? undefined, note: describeFailure(result) }
}

/**
 * Runs a command as one step of the visit and logs its row.
 *
 * @remarks
 * A judge reads the finished command and answers the exit and note its one log entry carries, so no
 * entry is amended after it is appended.
 *
 * @param runner - The visit's state.
 * @param step - The step's name.
 * @param file - The executable.
 * @param args - Its arguments.
 * @param cwd - The working directory.
 * @param judge - Reads the exit and note from the result. Default: {@link readVerdict}.
 * @param input - Standard input for the command. Default: none.
 * @returns The finished command, or undefined under --dry-run.
 */
export function runStep(
	runner: Runner,
	step: string,
	file: string,
	args: readonly string[],
	cwd: string,
	judge: (result: SpawnSyncReturns<string>) => Verdict = readVerdict,
	input?: string,
): SpawnSyncReturns<string> | undefined {
	const command = renderCommand(file, args)
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
		...(input === undefined ? {} : { input }),
	})
	const durationMs = Date.now() - started
	const verdict = judge(result)
	appendResult(runner, step, command, result, durationMs, verdict)
	return result
}

/**
 * Judges the pin step's audit.
 *
 * @remarks
 * The audit exits 1 on the drift the pin step exists to close, so its exit is a reading here.
 *
 * @param result - The audit.
 * @returns Exit 0 with the reading count when the audit printed releases and exited 0 or 1; else a
 * failing exit with the reason.
 */
export function judgePin(result: SpawnSyncReturns<string>): Verdict {
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

/**
 * Judges the overwrite command.
 *
 * @param result - The overwrite.
 * @param offline - If `true`, an exit of 1 whose note names the catalog refusal passes; if `false`,
 * the exit alone decides.
 * @returns The verdict.
 */
export function judgeOverwrite(result: SpawnSyncReturns<string>, offline: boolean): Verdict {
	if (!offline || result.status !== 1) return readVerdict(result)
	const note = readString(parseJsonLine(result.stdout), 'note')
	return note !== undefined && note.includes(OFFLINE_REFUSAL)
		? { exit: 0, note: 'offline overwrite skipped the catalog step by design' }
		: { exit: 1, note: describeFailure(result) }
}

/**
 * Judges the verify step's audit.
 *
 * @remarks
 * The audit reads the canonical sources of scaffold's own checkout as foreign paths and exits 1.
 *
 * @param result - The audit.
 * @param own - If `true`, the target is scaffold's own checkout and an exit of 1 passes; if `false`,
 * the exit alone decides.
 * @returns The verdict; an audit that printed no releases envelope fails.
 */
export function judgeVerify(result: SpawnSyncReturns<string>, own: boolean): Verdict {
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

/**
 * Runs npm as one step of the visit and logs its row.
 *
 * @param runner - The visit's state.
 * @param step - The step's name.
 * @param args - The npm arguments.
 * @param judge - Reads the exit and note from the result. Default: {@link readVerdict}.
 * @returns The finished command, or undefined under --dry-run.
 */
export function runNpmStep(
	runner: Runner,
	step: string,
	args: readonly string[],
	judge: (result: SpawnSyncReturns<string>) => Verdict = readVerdict,
): SpawnSyncReturns<string> | undefined {
	const command = `npm ${args.join(' ')}`
	if (runner.dry) {
		runner.steps.push({
			step,
			command,
			exit: undefined,
			durationMs: 0,
			note:
				runner.regenerate && args[0] === 'install'
					? 'dry run (regenerates on ERESOLVE)'
					: 'dry run',
		})
		return undefined
	}
	const started = Date.now()
	const result = runNpm(args, runner.target)
	appendResult(runner, step, command, result, Date.now() - started, judge(result))
	return result
}

/**
 * Writes one step's full output to the visit's journal directory.
 *
 * @param runner - The visit's state.
 * @param step - The step's name.
 * @param command - The command line.
 * @param exit - The exit code.
 * @param stdout - The standard output.
 * @param stderr - The standard error.
 * @returns The journal path, the failure that stopped the write, or neither when the visit keeps no
 * journal.
 */
export function writeJournal(
	runner: Runner,
	step: string,
	command: string,
	exit: number | undefined,
	stdout: string,
	stderr: string,
): Journal {
	if (runner.directory === undefined) return {}
	const path = join(
		runner.directory,
		`${String(runner.steps.length + 1).padStart(2, '0')}-${step}.log`,
	)
	try {
		validateWavePath(runner.target, path)
		mkdirSync(runner.directory, { recursive: true })
		validateWavePath(runner.target, path)
		writeFileSync(
			path,
			`command: ${command}\nexit: ${String(exit)}\nstdout:\n${stdout}\nstderr:\n${stderr}\n`,
		)
		return { path }
	} catch (error) {
		return { failure: `journal failed: ${path}: ${String(error)}` }
	}
}

/**
 * Appends a finished command's row to the visit's log.
 *
 * @param runner - The visit's state.
 * @param step - The step's name.
 * @param command - The command line.
 * @param result - The finished command.
 * @param durationMs - How long it ran.
 * @param verdict - The exit and note to record; a journal failure turns the exit into 1.
 * @returns Nothing after the row is appended.
 */
export function appendResult(
	runner: Runner,
	step: string,
	command: string,
	result: SpawnSyncReturns<string>,
	durationMs: number,
	verdict: Verdict,
): void {
	const journal = writeJournal(
		runner,
		step,
		command,
		result.status ?? undefined,
		result.stdout ?? '',
		result.stderr ?? '',
	)
	runner.steps.push({
		step,
		command,
		durationMs,
		...(journal.path === undefined ? {} : { journal: journal.path }),
		...(journal.failure === undefined
			? verdict
			: {
					exit: 1,
					note: [verdict.note, journal.failure].filter((value) => value !== undefined).join('; '),
				}),
	})
}

/**
 * Appends a row for a step the script ran itself.
 *
 * @param runner - The visit's state.
 * @param step - The step's name.
 * @param command - The label the row carries as its command.
 * @param note - What the step found or did.
 * @param exit - The exit the row records. Default: 0.
 * @returns Nothing after the row is appended.
 */
export function appendStep(
	runner: Runner,
	step: string,
	command: string,
	note: string,
	exit = 0,
): void {
	const journal = runner.dry ? {} : writeJournal(runner, step, command, exit, note, '')
	runner.steps.push({
		step,
		command,
		exit: runner.dry ? undefined : journal.failure === undefined ? exit : 1,
		durationMs: 0,
		note: journal.failure === undefined ? note : `${note}; ${journal.failure}`,
		...(journal.path === undefined ? {} : { journal: journal.path }),
	})
}

/**
 * Checks whether a visit's log holds a failure.
 *
 * @remarks
 * The one predicate the visit's steps and the script's exit code share. A superseded row, a row with
 * no exit (a dry run), and a pins or compare row are readings, not failures.
 *
 * @param steps - The rows logged so far.
 * @returns True if a row exited nonzero, was not superseded, and is not a pins or compare row; false
 * otherwise.
 */
export function failed(steps: readonly StepResult[]): boolean {
	return steps.some(
		(entry) =>
			entry.superseded !== true &&
			entry.exit !== undefined &&
			entry.exit !== 0 &&
			entry.step !== 'pins' &&
			entry.step !== 'compare',
	)
}

/**
 * Reads the resolution conflict an install reported.
 *
 * @param result - The finished install.
 * @returns The conflict line npm printed, a generic reason when it printed none, or undefined when
 * the install did not fail with ERESOLVE.
 */
export function extractConflict(result: SpawnSyncReturns<string>): string | undefined {
	const output = `${result.stdout}\n${result.stderr}`
	if (!/\bcode ERESOLVE\b/u.test(output)) return undefined
	const lines = output.split(/\r\n|\n/)
	return (
		(
			lines.find((line) => line.includes('Conflicting peer dependency:')) ??
			lines.find((line) => line.includes('Could not resolve dependency:'))
		)?.replace(/^npm (?:error|ERR!)\s*/u, '') ?? 'the install could not move a locked peer'
	)
}

/**
 * Runs the install and regenerates the lock when asked and the install cannot resolve.
 *
 * @param runner - The visit's state.
 * @param step - The step the rows belong to.
 * @returns Nothing after the rows are appended.
 */
export function runInstall(runner: Runner, step: string): void {
	// npm can unlink a node_modules junction before reporting its resolution failure.
	if (
		!runner.dry &&
		runner.regenerate &&
		existsSync(join(runner.target, 'node_modules')) &&
		lstatSync(join(runner.target, 'node_modules')).isSymbolicLink()
	) {
		appendStep(
			runner,
			step,
			'regenerate lock and modules',
			'ERESOLVE; regeneration refused: node_modules is a link',
			1,
		)
		return
	}
	const installed = runNpmStep(runner, step, ['install'], (result) => {
		const conflict = extractConflict(result)
		return conflict === undefined || result.status === 0
			? readVerdict(result)
			: {
					exit: result.status ?? 1,
					note: `ERESOLVE (${conflict}): pass --regenerate and resume with --from ${step} to replace package-lock.json and node_modules from the manifest`,
					...(runner.regenerate ? { superseded: true } : {}),
				}
	})
	if (
		installed !== undefined &&
		installed.status !== 0 &&
		extractConflict(installed) !== undefined &&
		runner.regenerate
	)
		regenerateLock(runner, step, installed)
}

/**
 * Refuses a manifest that holds local dependency specs.
 *
 * @param runner - The visit's state.
 * @param step - The step that refuses.
 * @returns True if a failing row was appended; false when the manifest holds none.
 */
export function refuseLocalSpecs(runner: Runner, step: string): boolean {
	const specs = scanLocalSpecs(readManifest(runner.target) ?? {})
	if (specs.length === 0) return false
	appendStep(
		runner,
		step,
		'scan manifest specs',
		`local dependency specs: ${specs.map(([path, spec]) => `${path}: ${spec}`).join(', ')}; restore the pins first`,
		1,
	)
	return true
}

/**
 * Names why the lock must not be regenerated.
 *
 * @param runner - The visit's state.
 * @returns The first refusal, or undefined when the lock is tracked and clean, the manifest holds no
 * local spec or workspace, `tmp/` is ignored, and the target is its work tree's root.
 */
export function readRegenerationRefusal(runner: Runner): string | undefined {
	if (
		runStep(
			runner,
			'regenerate',
			'git',
			['ls-files', '--error-unmatch', 'package-lock.json'],
			runner.target,
		)?.status !== 0
	)
		return 'package-lock.json is untracked'
	const status = runStep(
		runner,
		'regenerate',
		'git',
		['status', '--porcelain', '--', 'package-lock.json'],
		runner.target,
	)
	if (status?.status !== 0 || status.stdout.trim() !== '')
		return 'package-lock.json carries uncommitted changes'
	const manifest = readManifest(runner.target)
	const specs = scanLocalSpecs(manifest ?? {})
	if (specs.length > 0)
		return `local dependency specs: ${specs.map(([path, spec]) => `${path}: ${spec}`).join(', ')}`
	if (manifest !== undefined && 'workspaces' in manifest) return 'the manifest declares workspaces'
	if (
		runStep(
			runner,
			'regenerate',
			'git',
			['check-ignore', '-q', 'tmp/units/wave/probe'],
			runner.target,
		)?.status !== 0
	)
		return 'tmp/ is not git-ignored'
	const root = runStep(runner, 'regenerate', 'git', ['rev-parse', '--show-toplevel'], runner.target)
	if (
		root?.status !== 0 ||
		normalizeSlashes(resolve(root.stdout.trim())) !== normalizeSlashes(resolve(runner.target))
	)
		return 'the target is not the root of its work tree'
	return undefined
}

/**
 * Renames a directory, retrying while the host holds it.
 *
 * @param source - The directory to move.
 * @param target - Its new path.
 * @param attempt - The retries spent so far. Default: 0.
 * @returns Nothing after the rename.
 * @throws Thrown when the rename fails for another reason or after the retries.
 */
export function moveModules(source: string, target: string, attempt = 0): void {
	try {
		renameSync(source, target)
	} catch (error) {
		if (!isRecord(error) || (error.code !== 'EBUSY' && error.code !== 'EPERM') || attempt >= 9)
			throw error
		Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100)
		moveModules(source, target, attempt + 1)
	}
}

/**
 * Regenerates the lock and the installed tree from the manifest.
 *
 * @param runner - The visit's state.
 * @param step - The step the rows belong to.
 * @param conflict - The install that failed with ERESOLVE.
 * @returns Nothing after the rows are appended; a failed regeneration restores the tree and lock.
 */
export function regenerateLock(
	runner: Runner,
	step: string,
	conflict: SpawnSyncReturns<string>,
): void {
	const refusal = readRegenerationRefusal(runner)
	if (refusal !== undefined || runner.directory === undefined) {
		appendStep(
			runner,
			step,
			'regenerate lock and modules',
			`ERESOLVE; regeneration refused: ${refusal ?? 'tmp/ is not git-ignored'}`,
			1,
		)
		return
	}
	const lock = join(runner.target, 'package-lock.json')
	const modules = join(runner.target, 'node_modules')
	const backup = join(runner.directory, 'package-lock.before.json')
	const moved = join(runner.directory, 'node_modules.before')
	const manifest = readFileSync(join(runner.target, 'package.json'))
	const before = createHash('sha256').update(readFileSync(lock)).digest('hex')
	try {
		for (const path of [backup, moved, lock, modules]) validateWavePath(runner.target, path)
		mkdirSync(runner.directory, { recursive: true })
		for (const path of [backup, moved, lock, modules]) validateWavePath(runner.target, path)
		copyFileSync(lock, backup)
		moveModules(modules, moved)
	} catch (error) {
		appendStep(
			runner,
			step,
			'regenerate lock and modules',
			`ERESOLVE; regeneration refused: ${isRecord(error) ? String(error.code) : ''} in use; stop the processes that hold it; ${String(error)}`,
			1,
		)
		return
	}
	const result = regenerateTree(runner.target, manifest, before)
	const restored = result.exit === 0 ? undefined : restoreLock(runner.target, moved, backup, before)
	const cleanup = result.exit === 0 ? discardBackup(runner.target, moved, backup) : undefined
	const names = [
		...new Set(
			[
				...`${conflict.stdout}\n${conflict.stderr}`.matchAll(
					/(?:node_modules\/)((?:@[^/\s]+\/)?[^/\s]+)/gu,
				),
			].flatMap((match) => (match[1] === undefined ? [] : [match[1]])),
		),
	]
	const versions =
		result.exit === 0
			? names
					.map(
						(name) =>
							`${name}@${readString(readManifest(join(modules, name)), 'version') ?? 'absent'}`,
					)
					.join(', ')
			: undefined
	appendStep(
		runner,
		step,
		'regenerate lock and modules',
		[result.note, restored, versions === undefined ? undefined : `installed ${versions}`, cleanup]
			.filter((value) => value !== undefined)
			.join('; '),
		cleanup === undefined ? result.exit : 1,
	)
	if (result.installed !== undefined)
		appendResult(
			runner,
			step,
			'npm install (regenerated)',
			result.installed,
			result.duration ?? 0,
			readVerdict(result.installed),
		)
	if (result.listed !== undefined)
		appendResult(runner, step, 'npm ls --all --json', result.listed, 0, readVerdict(result.listed))
}

/**
 * Installs from a manifest with no lock and proves the tree.
 *
 * @remarks
 * Journal writes and backup disposal cannot enter the transaction's rollback boundary.
 *
 * @param target - The target directory.
 * @param manifest - The manifest bytes before the install.
 * @param before - The SHA-256 of the lock before.
 * @returns Exit 0 when the install, the tree listing, and the unchanged manifest prove it; else exit 1.
 */
export function regenerateTree(target: string, manifest: Buffer, before: string): Regeneration {
	const lock = join(target, 'package-lock.json')
	try {
		unlinkSync(lock)
		const started = Date.now()
		const installed = runNpm(['install'], target)
		const duration = Date.now() - started
		const listed = installed.status === 0 ? runNpm(['ls', '--all', '--json'], target) : undefined
		const unchanged = manifest.equals(readFileSync(join(target, 'package.json')))
		const proved = installed.status === 0 && existsSync(lock) && listed?.status === 0 && unchanged
		const after = existsSync(lock)
			? createHash('sha256').update(readFileSync(lock)).digest('hex')
			: 'absent'
		return {
			exit: proved ? 0 : 1,
			note: `${proved ? '' : 'ERESOLVE; '}lock SHA-256 ${before} -> ${after}${unchanged ? '' : '; manifest bytes changed'}`,
			installed,
			...(listed === undefined ? {} : { listed }),
			duration,
		}
	} catch (error) {
		return { exit: 1, note: `ERESOLVE; ${String(error)}` }
	}
}

/**
 * Discards the backups after a proved regeneration.
 *
 * @param target - The target directory.
 * @param moved - The moved previous tree.
 * @param backup - The saved lock.
 * @returns Nothing on success, else the failure with the backup paths kept.
 */
export function discardBackup(target: string, moved: string, backup: string): string | undefined {
	try {
		for (const path of [moved, backup, join(target, 'node_modules')]) validateWavePath(target, path)
		removeTree(moved)
		return undefined
	} catch (error) {
		return `backup cleanup failed: ${String(error)}; proved installation retained; backups: ${backup}; ${moved}`
	}
}

/**
 * Restores the previous tree and lock after a failed regeneration.
 *
 * @param target - The target directory.
 * @param moved - The moved previous tree.
 * @param backup - The saved lock.
 * @param before - The SHA-256 the saved lock must still have.
 * @returns `tree and lock restored`, else the failure with the backup paths kept.
 */
export function restoreLock(target: string, moved: string, backup: string, before: string): string {
	try {
		for (const path of [
			moved,
			backup,
			join(target, 'node_modules'),
			join(target, 'package-lock.json'),
		])
			validateWavePath(target, path)
		if (!lstatSync(moved).isDirectory() || !lstatSync(backup).isFile())
			throw new Error('no recoverable backup')
		const saved = readFileSync(backup)
		if (createHash('sha256').update(saved).digest('hex') !== before)
			throw new Error('backup lock digest changed')
		removeTree(join(target, 'node_modules'))
		moveModules(moved, join(target, 'node_modules'))
		writeFileSync(join(target, 'package-lock.json'), saved)
		return 'tree and lock restored'
	} catch (error) {
		return `rollback failed: ${String(error)}; backups: ${backup}; ${moved}`
	}
}

/**
 * Checks that a destination stays inside the target and crosses no link.
 *
 * @param target - The target directory.
 * @param destination - The path to write or remove.
 * @returns Nothing when the path is safe.
 * @throws Thrown when the path resolves outside the target, an ancestor is a link or not a
 * directory, or an ancestor's real location leaves the target's.
 */
export function validateWavePath(target: string, destination: string): void {
	const root = resolve(target)
	const path = resolve(destination)
	const location = relative(root, path)
	if (location === '..' || location.startsWith(`..${sep}`) || isAbsolute(location))
		throw new Error(`unsafe wave path: ${path} resolves outside ${root}`)
	const physical = realpathSync(root)
	const segments = location === '' ? [] : location.split(sep)
	for (const entry of [
		root,
		...segments.map((_, index) => join(root, ...segments.slice(0, index + 1))),
	]) {
		const status = lstatSync(entry, { throwIfNoEntry: false })
		if (status === undefined) continue
		if (status.isSymbolicLink()) throw new Error(`unsafe wave path: ${entry} is a link`)
		if (entry !== path && !status.isDirectory())
			throw new Error(`unsafe wave path: ${entry} is not a directory`)
		const actual = relative(physical, realpathSync(entry))
		if (actual === '..' || actual.startsWith(`..${sep}`) || isAbsolute(actual))
			throw new Error(`unsafe wave path: ${entry} resolves outside ${physical}`)
	}
}

/**
 * Reads the dirty paths out of `git status --porcelain=v1 -z` output.
 *
 * @remarks
 * One pass over the entries with {@link DIRTY_ENTRY}, so the cost grows with the text and no entry
 * recurses.
 *
 * @param text - The command's standard output.
 * @returns Each entry's path; a rename or copy also lists its original path.
 */
export function readDirtyPaths(text: string): readonly string[] {
	return [...text.matchAll(DIRTY_ENTRY)].flatMap((match) =>
		match[1] === undefined ? [match[3] ?? ''] : [match[1], match[2] ?? ''],
	)
}

/**
 * Reads the receipt the overwrite step left.
 *
 * @param target - The target directory.
 * @returns The receipt, or undefined when it is absent, unreadable, or lacks a field in its type.
 */
export function readReceipt(target: string): OverwriteReceipt | undefined {
	try {
		const value = parseJsonRecord(
			readFileSync(join(target, 'tmp', 'units', 'wave', 'overwrite.json'), 'utf8'),
		)
		if (
			value === undefined ||
			typeof value.head !== 'string' ||
			typeof value.version !== 'string' ||
			typeof value.offline !== 'boolean' ||
			!Array.isArray(value.written) ||
			!value.written.every((path) => typeof path === 'string') ||
			!Array.isArray(value.removed) ||
			!value.removed.every((path) => typeof path === 'string')
		)
			return undefined
		return {
			head: value.head,
			version: value.version,
			offline: value.offline,
			written: value.written,
			removed: value.removed,
		}
	} catch {
		return undefined
	}
}

/**
 * Runs the record step.
 *
 * @param runner - The visit's state.
 * @param name - The package name the manifest declares.
 * @returns Nothing after the rows are appended; the overwrite's paths are committed when the receipt
 * attributes every dirty path to them.
 */
export function runRecord(runner: Runner, name: string | undefined): void {
	if (name === SCAFFOLD) {
		appendStep(runner, 'record', 'git commit', `skipped: ${SCAFFOLD}`)
		return
	}
	if (refuseLocalSpecs(runner, 'record')) return
	if (runner.dry) {
		runStep(
			runner,
			'record',
			'git',
			['add', '-A', '--pathspec-from-file=-', '--pathspec-file-nul'],
			runner.target,
		)
		runStep(
			runner,
			'record',
			'git',
			['commit', '-m', 'Overwrite with scaffold <version>'],
			runner.target,
		)
		return
	}
	const status = runStep(
		runner,
		'record',
		'git',
		['status', '--porcelain=v1', '-z', '--untracked-files=all'],
		runner.target,
	)
	if (status?.status !== 0) return
	const dirty = [...new Set(readDirtyPaths(status.stdout))]
	if (dirty.length === 0) {
		appendStep(runner, 'record', 'git commit', 'nothing to commit')
		return
	}
	const receipt = readReceipt(runner.target)
	const head = runStep(runner, 'record', 'git', ['rev-parse', 'HEAD'], runner.target)
	if (receipt === undefined || head?.status !== 0 || receipt.head !== head.stdout.trim()) {
		appendStep(
			runner,
			'record',
			'attribute overwrite paths',
			`uncommitted changes the visit cannot attribute to an overwrite at HEAD: ${dirty.join(', ')}`,
			1,
		)
		return
	}
	if (receipt.offline) {
		appendStep(
			runner,
			'record',
			'git commit',
			'an offline overwrite stays uncommitted until scaffold publishes',
		)
		return
	}
	const allowed = [...receipt.written, ...receipt.removed, 'package.json', 'package-lock.json'].map(
		(path) => normalizeSlashes(relative(runner.target, resolve(runner.target, path))),
	)
	const outside = dirty.filter(
		(path) =>
			!allowed.some(
				(entry) =>
					entry !== '' &&
					entry !== '..' &&
					!entry.startsWith('../') &&
					!isAbsolute(entry) &&
					path === entry,
			),
	)
	if (outside.length > 0) {
		appendStep(
			runner,
			'record',
			'contain overwrite paths',
			`dirty paths outside the overwrite: ${outside.join(', ')}`,
			1,
		)
		return
	}
	runStep(
		runner,
		'record',
		'git',
		['--literal-pathspecs', 'add', '-A', '--pathspec-from-file=-', '--pathspec-file-nul'],
		runner.target,
		readVerdict,
		`${dirty.join('\0')}\0`,
	)
	if (failed(runner.steps)) return
	runStep(
		runner,
		'record',
		'git',
		['commit', '-m', `Overwrite with scaffold ${receipt.version}`],
		runner.target,
	)
	if (failed(runner.steps)) return
	runStep(runner, 'record', 'git', ['status', '--porcelain'], runner.target, (result) =>
		result.status === 0 && result.stdout.trim() !== ''
			? { exit: 1, note: `tree remains dirty: ${result.stdout}` }
			: readVerdict(result),
	)
}

/**
 * Moves each named dependency to the registry caret of its latest release.
 *
 * @remarks
 * A later release of the same name reads the range the earlier reading wrote.
 *
 * @param ranges - The block's ranges by name.
 * @param releases - The audit's release readings.
 * @returns The ranges after the moves and one message per move.
 */
export function computeRanges(
	ranges: Record<string, unknown>,
	releases: readonly Release[],
): RangeMove {
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

/**
 * Writes the re-pinned ranges into the target's manifest.
 *
 * @param target - The target directory.
 * @param releases - The audit's release readings.
 * @returns One message per range moved; the manifest is rewritten only when a range moved.
 */
export function writeRanges(target: string, releases: readonly Release[]): readonly string[] {
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

/**
 * Runs the pin step.
 *
 * @param runner - The visit's state.
 * @param scaffoldFile - The scaffold executable.
 * @param scaffoldPrefix - The arguments that precede scaffold's own.
 * @param offline - The `--offline` argument, or none.
 * @returns Nothing after the rows are appended.
 */
export function runPin(
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
		appendStep(
			runner,
			'pin',
			'rewrite audit release ranges to the registry caret',
			moved.length === 0 ? 'no range moved' : moved.join(', '),
		)
	} else {
		appendStep(runner, 'pin', 'rewrite audit release ranges to the registry caret', 'dry run')
	}
	runInstall(runner, 'pin')
}

/**
 * Runs the commit step.
 *
 * @param runner - The visit's state.
 * @returns Nothing after the rows are appended.
 */
export function runCommit(runner: Runner): void {
	if (refuseLocalSpecs(runner, 'commit')) return
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
		appendStep(runner, 'commit', 'git commit', 'manifest and lockfile already committed')
	}
}

/**
 * Runs the overwrite step.
 *
 * @param runner - The visit's state.
 * @param scaffoldFile - The scaffold executable.
 * @param scaffoldPrefix - The arguments that precede scaffold's own.
 * @param offline - The `--offline` argument, or none.
 * @returns Nothing after the rows are appended and the receipt is written.
 */
export function runOverwrite(
	runner: Runner,
	scaffoldFile: string,
	scaffoldPrefix: readonly string[],
	offline: readonly string[],
): void {
	const overwrite = runStep(
		runner,
		'overwrite',
		scaffoldFile,
		[...scaffoldPrefix, 'overwrite', '--json', ...offline],
		runner.target,
		(result) => judgeOverwrite(result, runner.offline),
	)
	if (overwrite !== undefined && !failed(runner.steps) && runner.directory !== undefined) {
		const receipt = parseJsonLine(overwrite.stdout)
		const head = runStep(runner, 'overwrite', 'git', ['rev-parse', 'HEAD'], runner.target)
		const installed = readManifest(join(runner.target, 'node_modules', '@orkestrel', 'scaffold'))
		const version = readString(installed, 'version')
		if (
			head?.status === 0 &&
			version !== undefined &&
			Array.isArray(receipt?.written) &&
			receipt.written.every((path) => typeof path === 'string') &&
			Array.isArray(receipt.removed) &&
			receipt.removed.every((path) => typeof path === 'string')
		) {
			const path = join(runner.target, 'tmp', 'units', 'wave', 'overwrite.json')
			try {
				validateWavePath(runner.target, path)
				mkdirSync(dirname(path), { recursive: true })
				validateWavePath(runner.target, path)
				writeFileSync(
					path,
					`${JSON.stringify({ head: head.stdout.trim(), version, offline: runner.offline, written: receipt.written, removed: receipt.removed })}\n`,
				)
			} catch (error) {
				appendStep(runner, 'overwrite', 'write overwrite receipt', String(error), 1)
			}
		}
	}
	if (!failed(runner.steps)) {
		runStep(
			runner,
			'overwrite',
			scaffoldFile,
			[...scaffoldPrefix, 'audit', ...offline],
			runner.target,
		)
	}
}

/**
 * Runs the verify step.
 *
 * @param runner - The visit's state.
 * @param scaffoldFile - The scaffold executable.
 * @param scaffoldPrefix - The arguments that precede scaffold's own.
 * @param offline - The `--offline` argument, or none.
 * @param own - If `true`, the target is scaffold's own checkout; if `false`, it is another package.
 * @returns Nothing after the rows are appended.
 */
export function runVerify(
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
	appendStep(
		runner,
		'verify',
		'compare every declared range with the registry',
		drift.length === 0
			? 'all declared ranges match'
			: drift
					.map((release) => `${release.name} ${release.range} vs ${String(release.latest)}`)
					.join(', '),
		drift.length === 0 ? 0 : 1,
	)
}

/**
 * Runs the pins step.
 *
 * @param runner - The visit's state.
 * @param before - The ranges the manifest declared before the visit.
 * @param version - The version to sweep for, or undefined when none is known.
 * @returns The number of hit lines, or undefined when the sweep did not run.
 */
export function runPins(
	runner: Runner,
	before: ReadonlyMap<string, string>,
	version: string | undefined,
): number | undefined {
	const after = readRanges(readManifest(runner.target) ?? {}, RANGE_FIELDS)
	const prior = [...before]
		.filter(([name, range]) => after.get(name) !== range)
		.flatMap(([, range]) => ['--range', range])
	if (version === undefined) {
		appendStep(runner, 'pins', basename(PINS), 'no prior version to sweep for; pass --prior')
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

/**
 * Runs the compare step.
 *
 * @param runner - The visit's state.
 * @param name - The package name the manifest declares.
 * @returns The bump ruling the two readings reach.
 */
export function runCompare(runner: Runner, name: string | undefined): Ruling {
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
		appendStep(runner, 'compare', 'npm view', 'the manifest names no package to read')
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

/**
 * Words one reading of the ruling.
 *
 * @param moved - The reading, or undefined when unanswered.
 * @param movedWord - The word for a moved reading.
 * @param sameWord - The word for an unmoved reading.
 * @returns `unanswered`, the moved word, or the same word.
 */
export function describeChange(
	moved: boolean | undefined,
	movedWord: string,
	sameWord: string,
): string {
	return moved === undefined ? 'unanswered' : moved ? movedWord : sameWord
}

/**
 * Runs one repository's visit.
 *
 * @param argv - The arguments after the script path.
 * @returns The finished visit, or undefined when the target carries no readable manifest or no
 * scaffold executable.
 */
export function runVisit(argv: readonly string[]): Visit | undefined {
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
	const runner: Runner = {
		target: resolve(target),
		dry: argv.includes('--dry-run'),
		offline: argv.includes('--offline'),
		regenerate: argv.includes('--regenerate'),
		directory:
			argv.includes('--dry-run') ||
			(name === SCAFFOLD && from === STEPS.indexOf('record') && to === from)
				? undefined
				: readJournalDirectory(resolve(target)),
		steps: [],
	}
	if (runner.directory !== undefined) {
		try {
			validateWavePath(runner.target, runner.directory)
		} catch (error) {
			appendStep(runner, 'journal', 'validate wave destination', String(error), 1)
		}
	}
	const before = readRanges(manifest, RANGE_FIELDS)
	const offline = runner.offline ? ['--offline'] : []
	if (selected.has('pin') && !failed(runner.steps))
		runPin(runner, scaffoldFile, scaffoldPrefix, offline)
	if (selected.has('commit') && !failed(runner.steps)) runCommit(runner)
	if (selected.has('overwrite') && !failed(runner.steps)) {
		if (name === SCAFFOLD) {
			appendStep(
				runner,
				'overwrite',
				renderCommand(scaffoldFile, [...scaffoldPrefix, 'overwrite', '--json', ...offline]),
				`skipped with its audit: ${SCAFFOLD} is the package whose checkout the vendored host is staged from`,
			)
		} else runOverwrite(runner, scaffoldFile, scaffoldPrefix, offline)
	}
	if (selected.has('verify') && !failed(runner.steps)) {
		runVerify(runner, scaffoldFile, scaffoldPrefix, offline, name === SCAFFOLD)
	}
	if (selected.has('install') && !failed(runner.steps)) runInstall(runner, 'install')
	const hits =
		selected.has('pins') && !failed(runner.steps)
			? runPins(runner, before, readOption(argv, '--prior') ?? version)
			: undefined
	if (selected.has('format') && !failed(runner.steps))
		runNpmStep(runner, 'format', ['run', 'format'])
	if (selected.has('record') && !failed(runner.steps)) runRecord(runner, name)
	if (selected.has('gates') && !failed(runner.steps)) {
		for (const gate of GATES) {
			if (failed(runner.steps)) break
			runNpmStep(runner, 'gates', ['run', gate])
		}
	}
	const compared: Ruling =
		selected.has('compare') && !failed(runner.steps)
			? runCompare(runner, name)
			: { distMoved: undefined, rangesMoved: undefined, ranges: undefined, hits: undefined }
	const ruling: Ruling = { ...compared, hits }
	const bump =
		ruling.distMoved === true || ruling.rangesMoved === true
			? 'bump'
			: ruling.distMoved === undefined || ruling.rangesMoved === undefined
				? 'unanswered'
				: 'no bump'
	const changes = `dist ${describeChange(ruling.distMoved, 'moved', 'same')}, ranges ${describeChange(ruling.rangesMoved, 'moved', 'same')}${hits === undefined ? '' : `, ${hits} self-pin hit(s)`}`
	return {
		target,
		name,
		version,
		steps: runner.steps,
		ruling,
		row: `| ${name ?? target} | ${version ?? '?'} | ${bump} | ${changes} | round |`,
	}
}

/**
 * Chooses the directory a visit journals its steps in.
 *
 * @param target - The target directory.
 * @returns A new stamped directory under the target's `tmp/units/wave/` when the target is inside a
 * work tree that ignores `tmp/`, else undefined.
 */
export function readJournalDirectory(target: string): string | undefined {
	const inside = spawnSync('git', ['rev-parse', '--is-inside-work-tree'], {
		cwd: target,
		encoding: 'utf8',
		windowsHide: true,
	})
	if (inside.status !== 0 || inside.stdout.trim() !== 'true') return undefined
	const ignored = spawnSync('git', ['check-ignore', '-q', 'tmp/units/wave/probe'], {
		cwd: target,
		encoding: 'utf8',
		windowsHide: true,
	})
	return ignored.status === 0
		? join(target, 'tmp', 'units', 'wave', new Date().toISOString().replace(/[:.]/gu, '-'))
		: undefined
}

/**
 * Reads the packages by layer out of the catalog table.
 *
 * @param catalogPath - The agent file that carries the marker-bounded table.
 * @returns Each layer's `name range` members, layers in numeric order, or undefined when the file or
 * its markers are absent.
 */
export function readLayers(
	catalogPath: string,
): ReadonlyMap<string, readonly string[]> | undefined {
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

/**
 * Renders a visit as text lines.
 *
 * @param visit - The finished visit.
 * @returns One line per step, the ruling, each moved range, and the release row.
 */
export function renderVisit(visit: Visit): string {
	const lines = [
		...visit.steps.map(
			(entry) =>
				`wave: ${entry.step.padEnd(9)} exit=${entry.exit === undefined ? 'dry' : String(entry.exit)} ${String(entry.durationMs).padStart(7)} ms  ${entry.command}${entry.note === undefined ? '' : `  (${entry.note})`}${entry.journal === undefined ? '' : `  journal=${entry.journal}`}`,
		),
		`wave: ruling dist ${describeChange(visit.ruling.distMoved, 'moved', 'same')}, ranges ${describeChange(visit.ruling.rangesMoved, 'moved', 'same')}${visit.ruling.hits === undefined ? '' : `, ${visit.ruling.hits} self-pin hit(s)`}`,
		...(visit.ruling.ranges ?? []).map((range) => `wave: range ${range}`),
		visit.row,
	]
	return `${lines.join('\n')}\n`
}

/**
 * Runs the mode the arguments name.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 when every step passed, 1 when one failed, 2 when a reading failed, 64
 * on usage.
 */
export function main(argv: readonly string[]): number {
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(
			`wave: unknown flag ${unknown.join(', ')}; give each flag and its value as separate arguments\n${USAGE}`,
		)
		return 64
	}
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
		if (argv.includes('--regenerate')) {
			console.error('wave: --regenerate requires --visit, not --plan')
			return 64
		}
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
		console.error(USAGE)
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
	return failed(visit.steps) ? 1 : 0
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
