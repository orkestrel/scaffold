// Recover a bench login. Run from the checkout root:
//   node .agents/skills/orkestrel-dispatch/scripts/login.ts --codex [--cap SECONDS]
//   node .agents/skills/orkestrel-dispatch/scripts/login.ts --claude
// --codex reads `codex login status`; when it reports no login, the script runs
// `codex login --device-auth` with its output journaled to tmp/codex/login.log, prints the
// verification URL and the one-time code the moment the journal carries them, polls
// `codex login status` every 5 seconds until it answers or the cap (default 600 seconds) ends, then
// kills the login by its pid. --claude reads `claude auth status` and prints it. The JSON summary
// carries `live`; exit 0 when the bench is logged in, 3 when it is not, 64 on usage.
import { spawn, spawnSync } from 'node:child_process'
import { closeSync, existsSync, mkdirSync, openSync, readFileSync } from 'node:fs'
import { readMissingFlags, readOption } from './helpers.ts'

const JOURNAL = 'tmp/codex/login.log'
const POLL_MS = 5_000
const URL_PATTERN = /https?:\/\/[^\s"'<>]+/u
const CODE_PATTERN = /\b([A-Z0-9]{4,5}-[A-Z0-9]{4,5})\b/u

interface Status {
	readonly live: boolean
	readonly text: string
}

interface Poll {
	readonly url: string | undefined
	readonly code: string | undefined
	readonly live: boolean
}

function readStatus(command: string, args: readonly string[]): Status {
	const result = spawnSync(command, args, { encoding: 'utf8', windowsHide: true })
	if (result.error !== undefined)
		return { live: false, text: `${command} could not start: ${result.error.message}` }
	return { live: result.status === 0, text: `${result.stdout ?? ''}${result.stderr ?? ''}`.trim() }
}

function killTree(pid: number): void {
	if (process.platform === 'win32') {
		spawnSync('taskkill', ['/pid', String(pid), '/T', '/F'], { stdio: 'ignore' })
		return
	}
	try {
		process.kill(pid, 'SIGTERM')
	} catch {}
}

function waitFor(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

async function pollLogin(
	started: number,
	capSeconds: number,
	url?: string,
	code?: string,
): Promise<Poll> {
	if (Date.now() - started >= capSeconds * 1000) return { url, code, live: false }
	await waitFor(POLL_MS)
	const text = existsSync(JOURNAL) ? readFileSync(JOURNAL, 'utf8') : ''
	const nextUrl = url ?? text.match(URL_PATTERN)?.[0]
	if (url === undefined && nextUrl !== undefined) console.error(`login: open ${nextUrl}`)
	const nextCode = code ?? text.match(CODE_PATTERN)?.[1]
	if (code === undefined && nextCode !== undefined) {
		console.error(`login: enter the code ${nextCode}`)
	}
	if (readStatus('codex', ['login', 'status']).live) {
		return { url: nextUrl, code: nextCode, live: true }
	}
	return pollLogin(started, capSeconds, nextUrl, nextCode)
}

async function loginCodex(capSeconds: number): Promise<number> {
	const before = readStatus('codex', ['login', 'status'])
	if (before.live) {
		console.log(JSON.stringify({ bench: 'codex', live: true, status: before.text }))
		return 0
	}
	mkdirSync('tmp/codex', { recursive: true })
	const journal = openSync(JOURNAL, 'w')
	const started = Date.now()
	const child = spawn('codex', ['login', '--device-auth'], {
		stdio: ['ignore', journal, journal],
		windowsHide: true,
	})
	const { url, code, live } = await pollLogin(started, capSeconds)
	if (child.exitCode === null && child.pid !== undefined) killTree(child.pid)
	closeSync(journal)
	console.log(
		JSON.stringify({
			bench: 'codex',
			live,
			url,
			code,
			durationMs: Date.now() - started,
			journal: JOURNAL,
			status: readStatus('codex', ['login', 'status']).text,
		}),
	)
	return live ? 0 : 3
}

function loginClaude(): number {
	const status = readStatus('claude', ['auth', 'status'])
	console.log(JSON.stringify({ bench: 'claude', live: status.live, status: status.text }))
	return status.live ? 0 : 3
}

async function main(argv: readonly string[]): Promise<number> {
	const missing = readMissingFlags(argv, ['--cap'])
	if (missing.length > 0) {
		console.error(`login: ${missing.join(', ')} given with no value`)
		return 64
	}
	if (argv.includes('--codex') && argv.includes('--claude')) {
		console.error('usage: login.ts names one bench: --codex [--cap SECONDS] | --claude')
		return 64
	}
	if (argv.includes('--codex')) return loginCodex(Number(readOption(argv, '--cap') ?? 600))
	if (argv.includes('--claude')) return loginClaude()
	console.error('usage: login.ts --codex [--cap SECONDS] | --claude')
	return 64
}

main(process.argv.slice(2)).then((code) => {
	process.exitCode = code
})
