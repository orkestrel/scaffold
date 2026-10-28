// Probe a bench with one bounded round trip and resolve its entry. Run from the checkout root:
//   node .agents/skills/orkestrel-dispatch/scripts/bench.ts --cursor [--resolve] [--model ID] [--cap SECONDS]
//   node .agents/skills/orkestrel-dispatch/scripts/bench.ts --codex [--model ID] [--sandbox MODE] [--cap SECONDS]
//   node .agents/skills/orkestrel-dispatch/scripts/bench.ts --claude [--model ALIAS] [--cap SECONDS]
// --cursor resolves the Cursor CLI entry (the newest versioned install under LOCALAPPDATA on
// Windows, `agent` on PATH elsewhere), reads its version (an entry that cannot answer `--version` is
// dark, with or without --resolve), and runs one bounded prompt through
// launch.ts into tmp/cursor/bench.jsonl; --resolve stops after printing the entry. --codex reads
// `codex --version` and `codex login status`, then runs one bounded exec into tmp/codex/bench.jsonl
// under the sandbox the host allows (danger-full-access on Windows, read-only elsewhere). --claude
// reads `claude --version` and runs one bounded print-mode prompt into tmp/claude/bench.jsonl. The
// script runs launch.ts and result.ts as child processes beside it and imports neither. The JSON
// summary carries the command, the version, the session id, the answer, and `live`. --cap is a
// number of seconds above 0 and at most 2147483, checked before any probe runs. Name one bench per
// run; the script refuses a flag it does not read, the `--flag=value` form included. Exit 0 when the
// bench answered READY, 3 when it is dark, 64 on usage.
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, realpathSync, statSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Names the directory this script runs from, which holds the launch and result siblings. */
export const SCRIPTS = dirname(fileURLToPath(import.meta.url))

/** Names the extension of the running file: the checkout runs `.ts` sources and a built twin runs `.js` siblings. */
export const EXTENSION = extname(fileURLToPath(import.meta.url))

/** Holds the one-word request every bench round trip sends. */
export const PROMPT = 'Reply with the single word READY and nothing else.'

/** Names the Cursor model a round trip uses unless the call names another. */
export const CURSOR_MODEL = process.env.CURSOR_GROK_MODEL ?? 'grok-4.7-xhigh'

/** Names the Codex model a round trip uses unless the call names another. */
export const CODEX_MODEL = process.env.CODEX_ASTRA_MODEL ?? 'gpt-6-astra'

/** Names the Claude model alias a round trip uses unless the call names another. */
export const CLAUDE_MODEL = 'opus'

/** Holds the seconds a round trip may run when the call gives no cap. */
export const DEFAULT_CAP = 180

/** Holds the longest cap in whole seconds that a Node timer carries through the launcher. */
export const MAX_CAP_SECONDS = 2_147_483

/** Lists the flags that each select one bench. */
export const BENCH_FLAGS: readonly string[] = ['--cursor', '--codex', '--claude']

/** Lists the flags that take a value. */
export const VALUE_FLAGS: readonly string[] = ['--model', '--cap', '--sandbox']

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = [...BENCH_FLAGS, '--resolve', ...VALUE_FLAGS]

/** Holds the usage line printed when a call names no bench or more than one. */
export const USAGE =
	'usage: bench.ts --cursor [--resolve] [--model ID] [--cap SECONDS] | --codex [--model ID] [--sandbox MODE] [--cap SECONDS] | --claude [--model ALIAS] [--cap SECONDS]; name one bench'

/** Names one bench a probe can run against. */
export type Bench = 'cursor' | 'codex' | 'claude'

/** Describes a resolved bench entry: the command that starts it, its version, and why it did not resolve. */
export interface Entry {
	readonly command: readonly string[]
	readonly version: string | undefined
	readonly error: string | undefined
}

/** Describes what one round trip observed. */
export interface Summary {
	readonly session: string | undefined
	readonly answer: string | undefined
	readonly exit: number | undefined
	readonly capped: boolean
	readonly durationMs: number | undefined
}

/** Describes what a probe decided: the JSON report to print and the exit code to return. */
export interface Probe {
	readonly report: Record<string, unknown>
	readonly exit: number
}

/**
 * Reads the value that follows a flag.
 *
 * @remarks
 * The first occurrence of a flag wins, a following value that opens with `--` is a missing value,
 * and the `--flag=value` form is not read.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--cap`.
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
 * A `--flag=value` argument is unknown, because the script reads no such form. A bare `--` ends the
 * scan.
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
 * Reads a finite number member of a record.
 *
 * @param record - The record, or undefined.
 * @param key - The member name.
 * @returns The number, or undefined when the member is absent, not a number, or not finite.
 */
export function readNumber(
	record: Record<string, unknown> | undefined,
	key: string,
): number | undefined {
	const value = record?.[key]
	return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

/**
 * Parses the `--cap` value into a number of seconds.
 *
 * @param text - The value after `--cap`, or undefined when the flag is absent.
 * @returns The default cap when the flag is absent, the number when it is finite, above 0, and at
 * most the longest cap, and undefined otherwise.
 */
export function parseCap(text: string | undefined): number | undefined {
	if (text === undefined) return DEFAULT_CAP
	const cap = Number(text)
	return Number.isFinite(cap) && cap > 0 && cap <= MAX_CAP_SECONDS ? cap : undefined
}

/**
 * Reads the version a command prints for `--version`.
 *
 * @param command - The executable and the arguments that precede the flag.
 * @returns The trimmed output, or undefined when the command is empty, cannot start, or exits non-zero.
 */
export function readVersion(command: readonly string[]): string | undefined {
	const [file, ...args] = command
	if (file === undefined) return undefined
	const result = spawnSync(file, [...args, '--version'], { encoding: 'utf8', windowsHide: true })
	return result.status === 0 ? result.stdout.trim() : undefined
}

/**
 * Resolves the Cursor CLI entry for this host.
 *
 * @returns The command and its version, or the reason the entry did not resolve.
 */
export function resolveCursor(): Entry {
	if (process.platform !== 'win32') {
		return { command: ['agent'], version: readVersion(['agent']), error: undefined }
	}
	const local = process.env.LOCALAPPDATA
	if (local === undefined)
		return { command: [], version: undefined, error: 'LOCALAPPDATA is not set' }
	const versions = join(local, 'cursor-agent', 'versions')
	if (!existsSync(versions) || !statSync(versions).isDirectory()) {
		return { command: [], version: undefined, error: `${versions} is not a directory` }
	}
	const newest = readdirSync(versions, { withFileTypes: true })
		.filter((entry) => entry.isDirectory() && /^\d{4}\.\d{2}\.\d{2}-[0-9a-f]+$/u.test(entry.name))
		.map((entry) => entry.name)
		.sort()
		.at(-1)
	if (newest === undefined) {
		return { command: [], version: undefined, error: `no versioned install under ${versions}` }
	}
	const node = join(versions, newest, 'node.exe')
	const index = join(versions, newest, 'index.js')
	if (!existsSync(node) || !existsSync(index)) {
		return { command: [], version: undefined, error: `${newest} lacks node.exe or index.js` }
	}
	return { command: [node, index], version: readVersion([node, index]), error: undefined }
}

/**
 * Runs one bounded round trip through the launch and result scripts beside this one.
 *
 * @param bench - The bench whose journal, errors, and answer files receive the run.
 * @param command - The bench command with its arguments and prompt.
 * @param cap - The seconds the launcher allows the command.
 * @param root - The directory the children run in, which holds the `tmp/<bench>` files.
 * @returns What the launcher and the result reader reported.
 */
export function runRoundTrip(
	bench: Bench,
	command: readonly string[],
	cap: number,
	root: string,
): Summary {
	const journal = `tmp/${bench}/bench.jsonl`
	const errors = `tmp/${bench}/bench.err`
	const answer = `tmp/${bench}/bench-answer.md`
	const launch = spawnSync(
		process.execPath,
		[
			join(SCRIPTS, `launch${EXTENSION}`),
			'--journal',
			journal,
			'--errors',
			errors,
			'--cap',
			String(cap),
			'--',
			...command,
		],
		{ cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'], windowsHide: true },
	)
	const launched = parseJsonLine(launch.stdout)
	const result = spawnSync(
		process.execPath,
		[join(SCRIPTS, `result${EXTENSION}`), `--${bench}`, journal, '--out', answer],
		{ cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'], windowsHide: true },
	)
	const read = parseJsonLine(result.stdout)
	const answerPath = join(root, answer)
	return {
		session: readString(read, 'session'),
		answer: existsSync(answerPath)
			? readFileSync(answerPath, 'utf8').trim().slice(0, 200)
			: undefined,
		exit: readNumber(launched, 'exit'),
		capped: launched?.capped === true,
		durationMs: readNumber(launched, 'durationMs'),
	}
}

/**
 * Checks whether a round trip shows a live bench.
 *
 * @param summary - What the round trip observed.
 * @returns True if the run has a session, exited 0 uncapped, and answered READY; false otherwise.
 */
export function isLive(summary: Summary): boolean {
	return (
		summary.session !== undefined &&
		summary.exit === 0 &&
		!summary.capped &&
		summary.answer !== undefined &&
		/^READY\.?$/u.test(summary.answer.trim())
	)
}

/**
 * Probes the Cursor bench, or prints its entry when the call names `--resolve`.
 *
 * @param argv - The arguments after the script path.
 * @param cap - The validated cap in seconds.
 * @param root - The directory the round trip runs in.
 * @returns Exit 0 when live or resolved, 3 when dark, with the report to print.
 */
export function probeCursor(argv: readonly string[], cap: number, root: string): Probe {
	const entry = resolveCursor()
	const model = readOption(argv, '--model') ?? CURSOR_MODEL
	if (entry.error !== undefined || entry.version === undefined) {
		return { report: { bench: 'cursor', ...entry, live: false }, exit: 3 }
	}
	if (argv.includes('--resolve')) {
		return {
			report: { bench: 'cursor', command: entry.command, version: entry.version },
			exit: 0,
		}
	}
	const summary = runRoundTrip(
		'cursor',
		[
			...entry.command,
			'-p',
			'--trust',
			'--mode=ask',
			'--model',
			model,
			'--output-format',
			'stream-json',
			PROMPT,
		],
		cap,
		root,
	)
	const live = isLive(summary)
	return {
		report: {
			bench: 'cursor',
			command: entry.command,
			version: entry.version,
			model,
			...summary,
			live,
			journal: 'tmp/cursor/bench.jsonl',
		},
		exit: live ? 0 : 3,
	}
}

/**
 * Probes the Codex bench: its version, its login, and one bounded exec.
 *
 * @param command - The executable and the arguments that precede the Codex arguments, such as `['codex']`.
 * @param argv - The arguments after the script path.
 * @param cap - The validated cap in seconds.
 * @param root - The directory the round trip runs in.
 * @returns Exit 0 when live, 3 when dark, with the report to print.
 */
export function probeCodex(
	command: readonly string[],
	argv: readonly string[],
	cap: number,
	root: string,
): Probe {
	const [file, ...leading] = command
	const version = readVersion(command)
	const login =
		file === undefined
			? undefined
			: spawnSync(file, [...leading, 'login', 'status'], { encoding: 'utf8', windowsHide: true })
	const model = readOption(argv, '--model') ?? CODEX_MODEL
	const sandbox =
		readOption(argv, '--sandbox') ??
		(process.platform === 'win32' ? 'danger-full-access' : 'read-only')
	const status = login === undefined ? '' : `${login.stdout ?? ''}${login.stderr ?? ''}`.trim()
	if (version === undefined || login?.status !== 0) {
		return { report: { bench: 'codex', version, login: status, live: false }, exit: 3 }
	}
	const summary = runRoundTrip(
		'codex',
		[
			...command,
			'exec',
			'--json',
			'-C',
			root,
			'--sandbox',
			sandbox,
			'--model',
			model,
			'-c',
			'model_reasoning_effort="low"',
			'--output-last-message',
			'tmp/codex/bench-last.md',
			PROMPT,
		],
		cap,
		root,
	)
	const live = isLive(summary)
	return {
		report: {
			bench: 'codex',
			version,
			login: status,
			model,
			sandbox,
			...summary,
			live,
			journal: 'tmp/codex/bench.jsonl',
		},
		exit: live ? 0 : 3,
	}
}

/**
 * Probes the Claude bench: its version and one bounded print-mode prompt.
 *
 * @param command - The executable and the arguments that precede the Claude arguments, such as `['claude']`.
 * @param argv - The arguments after the script path.
 * @param cap - The validated cap in seconds.
 * @param root - The directory the round trip runs in.
 * @returns Exit 0 when live, 3 when dark, with the report to print.
 */
export function probeClaude(
	command: readonly string[],
	argv: readonly string[],
	cap: number,
	root: string,
): Probe {
	const version = readVersion(command)
	const model = readOption(argv, '--model') ?? CLAUDE_MODEL
	if (version === undefined) {
		return { report: { bench: 'claude', version, live: false }, exit: 3 }
	}
	const summary = runRoundTrip(
		'claude',
		[...command, '-p', PROMPT, '--output-format', 'stream-json', '--verbose', '--model', model],
		cap,
		root,
	)
	const live = isLive(summary)
	return {
		report: {
			bench: 'claude',
			version,
			model,
			...summary,
			live,
			journal: 'tmp/claude/bench.jsonl',
		},
		exit: live ? 0 : 3,
	}
}

/**
 * Runs the probe the call names, against the real `codex` or `claude` command.
 *
 * @param argv - The arguments after the script path, which name one bench.
 * @param cap - The validated cap in seconds.
 * @param root - The directory the round trip runs in.
 * @returns What the probe decided.
 */
export function selectProbe(argv: readonly string[], cap: number, root: string): Probe {
	if (argv.includes('--cursor')) return probeCursor(argv, cap, root)
	if (argv.includes('--codex')) return probeCodex(['codex'], argv, cap, root)
	return probeClaude(['claude'], argv, cap, root)
}

/**
 * Runs the script on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 live, 3 dark, 64 on usage.
 */
export function main(argv: readonly string[]): number {
	const missing = readMissingFlags(argv, VALUE_FLAGS)
	if (missing.length > 0) {
		console.error(`bench: ${missing.join(', ')} given with no value`)
		return 64
	}
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(`bench: ${unknown.join(', ')} is not a flag this script reads; ${USAGE}`)
		return 64
	}
	if (BENCH_FLAGS.filter((flag) => argv.includes(flag)).length !== 1) {
		console.error(USAGE)
		return 64
	}
	const cap = parseCap(readOption(argv, '--cap'))
	if (cap === undefined) {
		console.error(
			`bench: --cap takes a number of seconds above 0 and at most ${String(MAX_CAP_SECONDS)}`,
		)
		return 64
	}
	const probe = selectProbe(argv, cap, process.cwd())
	console.log(JSON.stringify(probe.report))
	return probe.exit
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
