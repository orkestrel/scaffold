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
// JSON summary carries the command, the version, the session id, the answer, and `live`. Exit 0 when
// the bench answered READY, 3 when it is dark, 64 on usage.
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readJsonObject, readMissingFlags, readNumber, readOption, readString } from './helpers.ts'

const SCRIPTS = dirname(fileURLToPath(import.meta.url))
// The checkout runs the `.ts` sources and a built twin under `dist/agents` runs `.js` siblings.
const EXTENSION = extname(fileURLToPath(import.meta.url))
const PROMPT = 'Reply with the single word READY and nothing else.'
const CURSOR_MODEL = process.env.CURSOR_GROK_MODEL ?? 'grok-4.7-xhigh'
const CODEX_MODEL = process.env.CODEX_ASTRA_MODEL ?? 'gpt-6-astra'
const CLAUDE_MODEL = 'opus'
const DEFAULT_CAP = 180

interface Entry {
	readonly command: readonly string[]
	readonly version: string | undefined
	readonly error: string | undefined
}

interface Summary {
	readonly session: string | undefined
	readonly answer: string | undefined
	readonly exit: number | undefined
	readonly capped: boolean
	readonly durationMs: number | undefined
}

function readVersion(command: readonly string[]): string | undefined {
	const [file, ...args] = command
	if (file === undefined) return undefined
	const result = spawnSync(file, [...args, '--version'], { encoding: 'utf8', windowsHide: true })
	return result.status === 0 ? result.stdout.trim() : undefined
}

function resolveCursor(): Entry {
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

function runRoundTrip(
	bench: 'cursor' | 'codex' | 'claude',
	command: readonly string[],
	cap: number,
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
		{ encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'], windowsHide: true },
	)
	const launched = readJsonObject(launch.stdout)
	const result = spawnSync(
		process.execPath,
		[join(SCRIPTS, `result${EXTENSION}`), `--${bench}`, journal, '--out', answer],
		{ encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'], windowsHide: true },
	)
	const read = readJsonObject(result.stdout)
	return {
		session: readString(read, 'session'),
		answer: existsSync(answer) ? readFileSync(answer, 'utf8').trim().slice(0, 200) : undefined,
		exit: readNumber(launched, 'exit'),
		capped: launched?.capped === true,
		durationMs: readNumber(launched, 'durationMs'),
	}
}

function isLive(summary: Summary): boolean {
	return (
		summary.session !== undefined &&
		summary.exit === 0 &&
		!summary.capped &&
		summary.answer !== undefined &&
		/^READY\.?$/u.test(summary.answer.trim())
	)
}

function probeCursor(argv: readonly string[]): number {
	const entry = resolveCursor()
	const model = readOption(argv, '--model') ?? CURSOR_MODEL
	if (entry.error !== undefined || entry.version === undefined) {
		console.log(JSON.stringify({ bench: 'cursor', ...entry, live: false }))
		return 3
	}
	if (argv.includes('--resolve')) {
		console.log(JSON.stringify({ bench: 'cursor', command: entry.command, version: entry.version }))
		return 0
	}
	const cap = Number(readOption(argv, '--cap') ?? DEFAULT_CAP)
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
	)
	const live = isLive(summary)
	console.log(
		JSON.stringify({
			bench: 'cursor',
			command: entry.command,
			version: entry.version,
			model,
			...summary,
			live,
			journal: 'tmp/cursor/bench.jsonl',
		}),
	)
	return live ? 0 : 3
}

function probeCodex(argv: readonly string[]): number {
	const version = readVersion(['codex'])
	const login = spawnSync('codex', ['login', 'status'], { encoding: 'utf8', windowsHide: true })
	const model = readOption(argv, '--model') ?? CODEX_MODEL
	const sandbox =
		readOption(argv, '--sandbox') ??
		(process.platform === 'win32' ? 'danger-full-access' : 'read-only')
	const status = `${login.stdout}${login.stderr}`.trim()
	if (version === undefined || login.status !== 0) {
		console.log(JSON.stringify({ bench: 'codex', version, login: status, live: false }))
		return 3
	}
	const cap = Number(readOption(argv, '--cap') ?? DEFAULT_CAP)
	const summary = runRoundTrip(
		'codex',
		[
			'codex',
			'exec',
			'--json',
			'-C',
			process.cwd(),
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
	)
	const live = isLive(summary)
	console.log(
		JSON.stringify({
			bench: 'codex',
			version,
			login: status,
			model,
			sandbox,
			...summary,
			live,
			journal: 'tmp/codex/bench.jsonl',
		}),
	)
	return live ? 0 : 3
}

function probeClaude(argv: readonly string[]): number {
	const version = readVersion(['claude'])
	const model = readOption(argv, '--model') ?? CLAUDE_MODEL
	if (version === undefined) {
		console.log(JSON.stringify({ bench: 'claude', version, live: false }))
		return 3
	}
	const cap = Number(readOption(argv, '--cap') ?? DEFAULT_CAP)
	const summary = runRoundTrip(
		'claude',
		['claude', '-p', PROMPT, '--output-format', 'stream-json', '--verbose', '--model', model],
		cap,
	)
	const live = isLive(summary)
	console.log(
		JSON.stringify({
			bench: 'claude',
			version,
			model,
			...summary,
			live,
			journal: 'tmp/claude/bench.jsonl',
		}),
	)
	return live ? 0 : 3
}

function main(argv: readonly string[]): number {
	const missing = readMissingFlags(argv, ['--model', '--cap', '--sandbox'])
	if (missing.length > 0) {
		console.error(`bench: ${missing.join(', ')} given with no value`)
		return 64
	}
	if (argv.includes('--cursor')) return probeCursor(argv)
	if (argv.includes('--codex')) return probeCodex(argv)
	if (argv.includes('--claude')) return probeClaude(argv)
	console.error(
		'usage: bench.ts --cursor [--resolve] [--model ID] [--cap SECONDS] | --codex [--model ID] [--sandbox MODE] [--cap SECONDS] | --claude [--model ALIAS] [--cap SECONDS]',
	)
	return 64
}

process.exitCode = main(process.argv.slice(2))
