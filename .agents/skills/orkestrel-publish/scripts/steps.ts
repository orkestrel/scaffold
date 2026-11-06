// Derive a release chain from the manifest's `prepublishOnly` script and run it, so a release names
// every step it leaves out. Run from the package root:
//   node .agents/skills/orkestrel-publish/scripts/steps.ts --journal DIR [--omit NAME=REASON ...] [--no-ci] [--dry-run] [--json]
// The script splits `prepublishOnly` on `&&` and reads each segment as `npm test`, `npm run NAME`, or
// `npm run NAME -- ARGS...`; any other segment or shell operator is refused by name, because the
// script can then state no complete step list. The plan opens with `ci` (`npm ci --ignore-scripts`)
// and `clean` (`npm run clean`), then the derived steps in script order, each named from its script
// with every character `chain.ts` refuses in a step name replaced by `-`. A name that repeats, or the
// name `omitted`, whose journal would overwrite `omitted.txt`, is refused, case-folded because a
// journal file name folds on Windows. `--omit`, which repeats, leaves one derived step out for a
// non-empty one-line reason; `ci` and `clean` are not omittable through it. On Windows `ci` is left
// out when a `.node`, `.dll`, or `.exe` file under `node_modules` refuses a write-mode open at chain start,
// and `--no-ci` leaves `ci` out with the reason `--no-ci`. The script writes the plan to
// `DIR/plan.json` and every omitted step to `DIR/omitted.txt`, prints each omitted step on its own
// line, and runs the sibling `chain.ts` with stdio inherited and `npm_config_prefer_online=true`
// merged into its environment. `--dry-run` prints the steps and omissions, writes nothing, and runs
// nothing; `--json`, which `--dry-run` must accompany, prints them as one JSON value.
// Exit with the chain's code: 0 when every step exited 0, the failing step's code when one did not,
// 2 when a step or the chain cannot start. Exit 2 when the journal cannot be written, 64 on usage,
// and 65 when no complete step list can be derived or an `--omit` names no derived step. A step
// exiting 65 reads alike with that refusal.
import { spawnSync } from 'node:child_process'
import {
	closeSync,
	existsSync,
	mkdirSync,
	openSync,
	readdirSync,
	readFileSync,
	realpathSync,
	writeFileSync,
} from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Lists the flags that take a value. */
export const VALUE_FLAGS: readonly string[] = ['--journal', '--omit']

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = [...VALUE_FLAGS, '--no-ci', '--dry-run', '--json']

/** Holds the usage line printed when a call names no journal or gives a malformed flag. */
export const USAGE =
	'usage: steps.ts --journal DIR [--omit NAME=REASON ...] [--no-ci] [--dry-run] [--json]'

/** Matches a step name `chain.ts` accepts. */
export const STEP_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/u

/** Matches every character `chain.ts` refuses in a step name. */
export const REFUSED_CHARACTER = /[^A-Za-z0-9._-]/gu

/**
 * Matches one token of a segment.
 *
 * @remarks
 * The characters admitted carry no meaning to `sh` or `cmd.exe`, so a token reaches npm unchanged and
 * every shell operator, quote, and expansion falls outside the admitted language.
 */
export const SEGMENT_TOKEN = /^[A-Za-z0-9@+=:,./_-]+$/u

/** Matches a native file a process can hold loaded, by its extension. */
export const NATIVE_FILE = /\.(?:node|dll|exe)$/iu

/** Names the file extension of the running script, which the sibling chain shares. */
export const EXTENSION = extname(fileURLToPath(import.meta.url))

/** Holds the path of the sibling `chain` script of the `orkestrel-dispatch` skill. */
export const CHAIN = fileURLToPath(
	new URL(`../../orkestrel-dispatch/scripts/chain${EXTENSION}`, import.meta.url),
)

/** Lists the steps every plan opens with, per the layer preparation `wave.md` fixes. */
export const OPENERS: readonly Segment[] = [
	{ name: 'ci', args: ['ci', '--ignore-scripts'] },
	{ name: 'clean', args: ['run', 'clean'] },
]

/** Lists the case-folded names no derived step can take. */
export const RESERVED: readonly string[] = ['ci', 'clean', 'omitted']

/** Describes one step before npm is resolved: its name and npm's arguments. */
export interface Segment {
	readonly name: string
	readonly args: readonly string[]
}

/** Describes what a manifest yields: its derived steps, or every problem that stopped them. */
export interface Derivation {
	readonly segments: readonly Segment[]
	readonly problems: readonly string[]
}

/** Describes one step left out of a plan and why. */
export interface Omission {
	readonly name: string
	readonly reason: string
}

/** Describes a native file that refused a write-mode open and the code it refused with. */
export interface HeldFile {
	readonly path: string
	readonly code: string
}

/** Describes how to start npm without the `shell` spawn option. */
export interface NpmCommand {
	readonly file: string
	readonly prefix: readonly string[]
}

/** Describes one entry of the plan `chain.ts` reads. */
export interface Step {
	readonly name: string
	readonly command: string
	readonly args: readonly string[]
}

/** Describes a function that throws when a file refuses a write-mode open. */
export type OpenFunction = (path: string) => void

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
 * Quotes an untrusted text for a diagnostic, JSON-encoded and cut to a bounded length.
 *
 * @param text - The text to quote.
 * @returns The JSON string literal of the text, ending in an ellipsis inside the quotes when cut.
 */
export function quote(text: string): string {
	return JSON.stringify(text.length > 80 ? `${text.slice(0, 80)}…` : text)
}

/**
 * Parses a JSON text without throwing.
 *
 * @param text - The text to parse.
 * @returns The parsed value, or undefined when the text is not JSON.
 */
export function parseJson(text: string): unknown {
	try {
		return JSON.parse(text)
	} catch {
		return undefined
	}
}

/**
 * Reads the value after each occurrence of a flag.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--omit`.
 * @returns One member per occurrence, undefined where the flag is last or a value opens with `--`.
 */
export function readValues(
	argv: readonly string[],
	name: string,
): ReadonlyArray<string | undefined> {
	return argv.flatMap((argument, index) => {
		if (argument !== name) return []
		const value = argv[index + 1]
		return [value === undefined || value.startsWith('--') ? undefined : value]
	})
}

/**
 * Names the value flags a caller gave with no value.
 *
 * @param argv - The arguments after the script path.
 * @param names - The flags that take a value.
 * @returns Each named flag with an occurrence that is last or followed by another flag.
 */
export function readMissingFlags(
	argv: readonly string[],
	names: readonly string[],
): readonly string[] {
	return names.filter((name) => readValues(argv, name).includes(undefined))
}

/**
 * Names the flags a caller gave that the script does not read.
 *
 * @remarks
 * A `--flag=value` argument is unknown, because the script reads no such form. The script passes no
 * command on, so a bare `--` is unknown too, and the scan stops there and reads nothing after it.
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
	return (end === -1 ? argv : argv.slice(0, end + 1)).filter(
		(argument) => argument.startsWith('--') && !flags.includes(argument),
	)
}

/**
 * Names the arguments no flag reads as its value.
 *
 * @param argv - The arguments after the script path.
 * @param names - The flags that take a value.
 * @returns Each argument that neither opens with `--` nor follows a value flag.
 */
export function readStrayArguments(
	argv: readonly string[],
	names: readonly string[],
): readonly string[] {
	return argv.filter(
		(argument, index) => !argument.startsWith('--') && !names.includes(argv[index - 1] ?? ''),
	)
}

/**
 * Parses one `--omit` value.
 *
 * @param text - The value, such as `test-distribution=the registry refuses this host`.
 * @returns The omission, or undefined when the name or the reason is empty, or the reason spans lines
 * and so cannot stay one line of `omitted.txt`.
 */
export function parseOmission(text: string): Omission | undefined {
	const at = text.indexOf('=')
	const reason = text.slice(at + 1).trim()
	if (at <= 0 || reason === '' || /[\r\n]/u.test(reason)) return undefined
	return { name: text.slice(0, at), reason }
}

/**
 * Reads the first usage problem in the arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The refusal to print, or undefined when the arguments are well formed.
 */
export function readUsageProblem(argv: readonly string[]): string | undefined {
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) return `${unknown.join(', ')} is not a flag this script reads; ${USAGE}`
	const missing = readMissingFlags(argv, VALUE_FLAGS)
	if (missing.length > 0) return `${missing.join(', ')} given with no value; ${USAGE}`
	const strays = readStrayArguments(argv, VALUE_FLAGS)
	if (strays.length > 0) return `${strays.map(quote).join(', ')} is not read by a flag; ${USAGE}`
	if (readValues(argv, '--journal').length === 0) return USAGE
	if (argv.includes('--json') && !argv.includes('--dry-run')) {
		return `--json reads only with --dry-run, because the chain prints to standard output; ${USAGE}`
	}
	const values = readValues(argv, '--omit').flatMap((value) => (value === undefined ? [] : [value]))
	const malformed = values.filter((value) => parseOmission(value) === undefined)
	if (malformed.length > 0) {
		return `--omit takes NAME=REASON with a non-empty one-line reason, given ${malformed.map(quote).join(', ')}`
	}
	const names = values.map((value) => value.slice(0, value.indexOf('=')))
	const repeated = [...new Set(names.filter((name, index) => names.indexOf(name) !== index))]
	if (repeated.length > 0) {
		return `--omit names a step more than once: ${repeated.map(quote).join(', ')}`
	}
	return undefined
}

/**
 * Reads the given `--omit` values as omissions.
 *
 * @param argv - Arguments that `readUsageProblem` found no problem in.
 * @returns One omission per occurrence, in argument order.
 */
export function readOmissions(argv: readonly string[]): readonly Omission[] {
	return readValues(argv, '--omit').flatMap((value) => {
		const omission = value === undefined ? undefined : parseOmission(value)
		return omission === undefined ? [] : [omission]
	})
}

/**
 * Parses one segment of `prepublishOnly`.
 *
 * @remarks
 * The admitted language is `npm test`, `npm run NAME`, and `npm run NAME -- ARGS...` with at least one
 * argument, in tokens that spaces or tabs separate. A line break is refused as a shell command
 * separator, and every token outside `SEGMENT_TOKEN` is refused as a shell operator.
 *
 * @param text - The segment's text.
 * @returns The named step, or undefined when the segment falls outside the admitted language.
 */
export function parseSegment(text: string): Segment | undefined {
	const tokens = text.trim().split(/[ \t]+/u)
	if (!tokens.every((token) => SEGMENT_TOKEN.test(token))) return undefined
	const [npm, verb, script, separator, ...rest] = tokens
	if (npm !== 'npm') return undefined
	if (verb === 'test') return tokens.length === 2 ? { name: 'test', args: ['test'] } : undefined
	if (verb !== 'run' || script === undefined) return undefined
	const name = script.replace(REFUSED_CHARACTER, '-')
	if (separator === undefined) return { name, args: ['run', script] }
	return separator === '--' && rest.length > 0
		? { name, args: ['run', script, '--', ...rest] }
		: undefined
}

/**
 * Derives the named steps of a `prepublishOnly` script.
 *
 * @param script - The script's text.
 * @returns The steps in script order, or every problem in the script: a segment outside the admitted
 * language, a name `chain.ts` would refuse, and a name that repeats or is reserved.
 */
export function deriveSegments(script: string): Derivation {
	const parts = script.split('&&').map((text) => ({ text, segment: parseSegment(text) }))
	const segments = parts.flatMap((part) => (part.segment === undefined ? [] : [part.segment]))
	const names = [...RESERVED, ...segments.map((segment) => segment.name.toLowerCase())]
	const repeated = [...new Set(names.filter((name, index) => names.indexOf(name) !== index))]
	const problems = [
		...parts
			.filter((part) => part.segment === undefined)
			.map(
				(part) =>
					`prepublishOnly segment ${quote(part.text.trim())} is not \`npm test\`, \`npm run NAME\`, or \`npm run NAME -- ARGS...\`, so no complete step list can be derived`,
			),
		...segments
			.filter((segment) => !STEP_NAME.test(segment.name))
			.map(
				(segment) =>
					`prepublishOnly script ${quote(segment.args[1] ?? segment.name)} gives the step name ${quote(segment.name)}, which does not open with a letter or digit`,
			),
		...repeated.map(
			(name) =>
				`the step name ${quote(name)} repeats or is reserved: ${RESERVED.join(', ')} and every derived name are one use each`,
		),
	]
	return problems.length > 0 ? { segments: [], problems } : { segments, problems: [] }
}

/**
 * Derives the named steps of the manifest in a directory.
 *
 * @param root - The package root.
 * @returns The derived steps, or the problems, a missing manifest and a missing script among them.
 */
export function readDerivation(root: string): Derivation {
	const path = join(root, 'package.json')
	if (!existsSync(path)) return { segments: [], problems: [`no package.json in ${quote(root)}`] }
	const manifest = parseJson(readFileSync(path, 'utf8'))
	const scripts = isRecord(manifest) ? manifest.scripts : undefined
	const script = isRecord(scripts) ? scripts.prepublishOnly : undefined
	return typeof script === 'string'
		? deriveSegments(script)
		: { segments: [], problems: ['package.json holds no string at scripts.prepublishOnly'] }
}

/**
 * Lists the problems of omissions against the steps a manifest derives.
 *
 * @param omissions - The omissions the caller gave.
 * @param segments - The derived steps; `ci` and `clean` are not among them.
 * @returns One refusal per omission that matches no derived step, listing the valid names.
 */
export function readOmissionProblems(
	omissions: readonly Omission[],
	segments: readonly Segment[],
): readonly string[] {
	const valid = segments.map((segment) => segment.name)
	return omissions
		.filter((omission) => !valid.includes(omission.name))
		.map(
			(omission) =>
				`--omit ${quote(omission.name)} matches no derived step; the valid names are ${valid.join(', ')}`,
		)
}

/**
 * Opens a file in write mode and closes it, writing no byte.
 *
 * @param path - The file to open.
 * @throws A system error when the file refuses the open.
 */
export function openWritable(path: string): void {
	closeSync(openSync(path, 'r+'))
}

/**
 * Lists the native files under a tree.
 *
 * @param root - The directory to walk, where a missing directory holds no file.
 * @returns The path of each regular file with a `.node`, `.dll`, or `.exe` extension; a link is not followed.
 */
export function collectNative(root: string): readonly string[] {
	if (!existsSync(root)) return []
	return readdirSync(root, { recursive: true, withFileTypes: true })
		.filter((entry) => entry.isFile() && NATIVE_FILE.test(entry.name))
		.map((entry) => join(entry.parentPath, entry.name))
}

/**
 * Lists the native files under a tree that refuse a write-mode open at this moment.
 *
 * @remarks
 * The check branches on `process.platform` because the behavior is platform-defined. Windows refuses
 * to delete a loaded image, so `npm ci` stops at `EPERM` on a held file and leaves a partial tree, and
 * a loaded image refuses a write-mode open with `EBUSY`. A host outside Windows unlinks a mapped
 * file, so the check does not run there. Any refused open counts as held, whatever its code, and the
 * omission names the code. A process whose working directory sits under the tree also stops `npm ci`,
 * and this read cannot see it.
 *
 * @param root - The directory to walk.
 * @param open - The opener. Default: `openWritable`.
 * @param platform - The host platform. Default: `process.platform`.
 * @returns Each file that refused, with the code it refused with; empty off `win32`.
 */
export function readHolders(
	root: string,
	open: OpenFunction = openWritable,
	platform: string = process.platform,
): readonly HeldFile[] {
	if (platform !== 'win32') return []
	return collectNative(root).flatMap((path) => {
		try {
			open(path)
			return []
		} catch (error) {
			const code = isRecord(error) && typeof error.code === 'string' ? error.code : 'unknown'
			return [{ path, code }]
		}
	})
}

/**
 * Reads whether this chain leaves `ci` out.
 *
 * @remarks
 * `--no-ci` wins and reads no holder.
 *
 * @param disabled - If `true`, the caller gave `--no-ci`; if `false`, the holders decide.
 * @param read - The holder reading, taken when `disabled` is false.
 * @returns The omission of `ci` as a one-member list, or an empty list when `ci` runs.
 */
export function readCiOmissions(
	disabled: boolean,
	read: () => readonly HeldFile[],
): readonly Omission[] {
	if (disabled) return [{ name: 'ci', reason: '--no-ci' }]
	const held = read()
	if (held.length === 0) return []
	const paths = held.map((file) => `${file.path} (${file.code})`).join(', ')
	return [{ name: 'ci', reason: `held by a running process: ${paths}` }]
}

/**
 * Lists the steps a chain runs.
 *
 * @param segments - The derived steps.
 * @param omitted - The steps to leave out.
 * @returns The openers then the derived steps, in order, without the omitted ones.
 */
export function selectSegments(
	segments: readonly Segment[],
	omitted: readonly Omission[],
): readonly Segment[] {
	const names = new Set(omitted.map((omission) => omission.name))
	return [...OPENERS, ...segments].filter((segment) => !names.has(segment.name))
}

/**
 * Resolves how a plan starts npm.
 *
 * @remarks
 * The `npm-cli.js` entry beside the Node binary starts with no shell on every host. Where it is
 * absent, Windows starts the `npm` shim, a `.cmd` file, through the interpreter it needs, because
 * `chain.ts` spawns with no shell; `cmd.exe` is platform-defined, and every token that reaches it
 * matched `SEGMENT_TOKEN`. Another host starts `npm` by name.
 *
 * @param binary - The Node binary. Default: `process.execPath`.
 * @param platform - The host platform. Default: `process.platform`.
 * @returns The file to spawn and the arguments that precede npm's own.
 */
export function resolveNpm(
	binary: string = process.execPath,
	platform: string = process.platform,
): NpmCommand {
	const cli = join(dirname(binary), 'node_modules', 'npm', 'bin', 'npm-cli.js')
	if (existsSync(cli)) return { file: binary, prefix: [cli] }
	return platform === 'win32'
		? { file: 'cmd.exe', prefix: ['/d', '/s', '/c', 'npm'] }
		: { file: 'npm', prefix: [] }
}

/**
 * Builds the plan `chain.ts` reads.
 *
 * @param segments - The steps to run, in order.
 * @param npm - How the plan starts npm.
 * @returns One plan entry per step.
 */
export function buildPlan(segments: readonly Segment[], npm: NpmCommand): readonly Step[] {
	return segments.map((segment) => ({
		name: segment.name,
		command: npm.file,
		args: [...npm.prefix, ...segment.args],
	}))
}

/**
 * Formats the line printed and written for one omitted step.
 *
 * @param omission - The omitted step.
 * @returns `omitted NAME: REASON`.
 */
export function formatOmission(omission: Omission): string {
	return `omitted ${omission.name}: ${omission.reason}`
}

/**
 * Formats the line a dry run prints for one step.
 *
 * @param segment - The step.
 * @returns `step NAME: npm ARGS`.
 */
export function formatSegment(segment: Segment): string {
	return `step ${segment.name}: npm ${segment.args.join(' ')}`
}

/**
 * Writes the plan and the omissions into the journal directory.
 *
 * @param journal - The journal directory, created when absent.
 * @param plan - The plan entries.
 * @param omitted - The omitted steps; an empty list writes an empty file, so no earlier run's list
 * stays behind.
 * @returns The reason the write failed, or undefined when it succeeded.
 */
export function writeJournal(
	journal: string,
	plan: readonly Step[],
	omitted: readonly Omission[],
): string | undefined {
	try {
		mkdirSync(journal, { recursive: true })
		writeFileSync(join(journal, 'plan.json'), `${JSON.stringify(plan, null, '\t')}\n`)
		writeFileSync(
			join(journal, 'omitted.txt'),
			omitted.map((omission) => `${formatOmission(omission)}\n`).join(''),
		)
		return undefined
	} catch (error) {
		return error instanceof Error ? error.message : String(error)
	}
}

/**
 * Lays added variables over an inherited environment by case-folded name.
 *
 * @remarks
 * A Windows environment block folds names by case, so an inherited `NPM_CONFIG_PREFER_ONLINE` would
 * outrank an added `npm_config_prefer_online`; every inherited variable whose lower-cased name an
 * added variable claims is dropped first.
 *
 * @param inherited - The environment the child would inherit.
 * @param added - The variables to set.
 * @returns The inherited variables no added name claims, followed by the added variables.
 */
export function mergeEnv(
	inherited: Readonly<Record<string, string | undefined>>,
	added: Readonly<Record<string, string>>,
): Record<string, string | undefined> {
	const claimed = new Set(Object.keys(added).map((name) => name.toLowerCase()))
	return {
		...Object.fromEntries(
			Object.entries(inherited).filter(([name]) => !claimed.has(name.toLowerCase())),
		),
		...added,
	}
}

/**
 * Runs the sibling chain over the plan in a journal directory, its stdio inherited.
 *
 * @param journal - The journal directory that holds `plan.json`.
 * @returns The chain's exit code, or 2 when it cannot start or a signal ended it.
 */
export function runChain(journal: string): number {
	const result = spawnSync(
		process.execPath,
		[CHAIN, '--plan', join(journal, 'plan.json'), '--journal', journal],
		{
			stdio: 'inherit',
			env: mergeEnv(process.env, { npm_config_prefer_online: 'true' }),
			windowsHide: true,
			shell: false,
		},
	)
	if (result.status !== null) return result.status
	console.error(
		`steps: the chain did not finish: ${result.error?.message ?? String(result.signal)}`,
	)
	return 2
}

/**
 * Runs the script on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: the chain's on a run, 0 on a dry run, 2 when the journal cannot be written
 * or the chain cannot start, 64 on usage, 65 when no complete step list can be derived or an `--omit`
 * names no derived step.
 */
export function main(argv: readonly string[]): number {
	const usage = readUsageProblem(argv)
	const [journal] = readValues(argv, '--journal')
	if (usage !== undefined || journal === undefined) {
		console.error(`steps: ${usage ?? USAGE}`)
		return 64
	}
	const derivation = readDerivation(process.cwd())
	const omissions = readOmissions(argv)
	const problems = [
		...derivation.problems,
		...(derivation.problems.length > 0 ? [] : readOmissionProblems(omissions, derivation.segments)),
	]
	if (problems.length > 0) {
		console.error(`steps: ${problems.join('; ')}`)
		return 65
	}
	const omitted = [
		...readCiOmissions(argv.includes('--no-ci'), () => readHolders('node_modules')),
		...omissions,
	]
	const selected = selectSegments(derivation.segments, omitted)
	const plan = buildPlan(selected, resolveNpm())
	if (argv.includes('--json')) {
		console.log(JSON.stringify({ steps: plan, omitted }))
		return 0
	}
	const lines = omitted.map((omission) => formatOmission(omission))
	if (argv.includes('--dry-run')) {
		console.log([...selected.map((segment) => formatSegment(segment)), ...lines].join('\n'))
		return 0
	}
	const failure = writeJournal(journal, plan, omitted)
	if (failure !== undefined) {
		console.error(`steps: cannot write the journal ${quote(journal)}: ${failure}`)
		return 2
	}
	for (const line of lines) console.log(line)
	return runChain(journal)
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
