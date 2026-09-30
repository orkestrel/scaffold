// Journaled launch of a bench exec or any command that outlives a turn. Run from the checkout root:
//   node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/codex/UNIT.jsonl --errors tmp/codex/UNIT.err --cap 1500 [--status] -- codex exec --json ...
// The command's stdout goes to --journal and its stderr to --errors; stdin is closed. Arguments after
// `--` pass to the command verbatim, so no shell quoting is involved. --cap is in seconds: when it
// expires the process tree is killed and the errors file records `capped=true`. --status records
// `git status --porcelain` before and after beside the journal, which is how a read-only lane's
// containment is checked. Stdout carries up to two JSON lines. The spawn line
// `{"pid","journal","errors"}` prints as soon as the command starts, and the pid, as decimal digits
// and a newline, goes to `<journal>.pid`. A pid file an earlier run left on the same journal is
// removed before the spawn, so neither appears when the command cannot start. The summary line
// prints last, after the command exits, and the errors file ends with `exit=<code>`. At the cap,
// Windows kills the process tree; any other host kills the command alone, not its descendants.
// The launcher's own flags are read before `--` alone. Exit: the command's code; 124 when capped;
// 127 when the command could not start (the errors file names why); 64 on usage, including a
// journal and errors path that are the same file and a cap that is not a number of seconds.
import { spawn, spawnSync } from 'node:child_process'
import { appendFileSync, closeSync, mkdirSync, openSync, rmSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { readMissingFlags, readOption } from './helpers.ts'

function readStatus(): string {
	const result = spawnSync('git', ['status', '--porcelain'], { encoding: 'utf8' })
	return result.status === 0 ? result.stdout : `git status failed: ${result.stderr}`
}

function killTree(pid: number): void {
	if (process.platform === 'win32') {
		spawnSync('taskkill', ['/pid', String(pid), '/T', '/F'], { stdio: 'ignore' })
		return
	}
	try {
		process.kill(pid, 'SIGKILL')
	} catch {}
}

interface Exit {
	readonly code: number | null
	readonly signal: NodeJS.Signals | null
	readonly error: string | undefined
}

function waitForExit(child: ReturnType<typeof spawn>): Promise<Exit> {
	return new Promise((resolve) => {
		child.on('error', (error) => resolve({ code: null, signal: null, error: error.message }))
		child.on('close', (code, signal) => resolve({ code, signal, error: undefined }))
	})
}

async function main(argv: readonly string[]): Promise<number> {
	const separator = argv.indexOf('--')
	// The launcher's own flags end at the separator; everything after it belongs to the command.
	const own = separator === -1 ? argv : argv.slice(0, separator)
	const journal = readOption(own, '--journal')
	const errors = readOption(own, '--errors')
	const cap =
		readMissingFlags(own, ['--cap']).length > 0
			? Number.NaN
			: Number(readOption(own, '--cap') ?? '0')
	const [command, ...args] = separator === -1 ? [] : argv.slice(separator + 1)
	if (
		separator === -1 ||
		journal === undefined ||
		errors === undefined ||
		journal === errors ||
		!Number.isFinite(cap) ||
		cap < 0 ||
		command === undefined ||
		command === ''
	) {
		console.error(
			'usage: launch.ts --journal PATH --errors PATH --cap SECONDS [--status] -- COMMAND [ARGS...]; the journal and the errors file differ, and the cap is a number of seconds (0 for none)',
		)
		return 64
	}
	const status = own.includes('--status')
	mkdirSync(dirname(journal), { recursive: true })
	mkdirSync(dirname(errors), { recursive: true })
	if (status) writeFileSync(`${journal}.status-before.txt`, readStatus())
	const journalFd = openSync(journal, 'w')
	const errorsFd = openSync(errors, 'w')
	rmSync(`${journal}.pid`, { force: true })
	const started = Date.now()
	const child = spawn(command, args, { stdio: ['ignore', journalFd, errorsFd], windowsHide: true })
	if (child.pid !== undefined) {
		writeFileSync(`${journal}.pid`, `${child.pid}\n`)
		console.log(JSON.stringify({ pid: child.pid, journal, errors }))
	}
	let capped = false
	const timer =
		cap > 0
			? setTimeout(() => {
					capped = true
					if (child.pid !== undefined) killTree(child.pid)
				}, cap * 1000)
			: undefined
	const exit = await waitForExit(child)
	if (timer !== undefined) clearTimeout(timer)
	closeSync(journalFd)
	closeSync(errorsFd)
	const durationMs = Date.now() - started
	appendFileSync(
		errors,
		`${exit.error === undefined ? '' : `launch: the command could not start: ${exit.error}\n`}\nexit=${exit.error === undefined ? (exit.code ?? 'null') : '127'} signal=${exit.signal ?? 'none'} capped=${capped} duration_ms=${durationMs}\n`,
	)
	if (status) writeFileSync(`${journal}.status-after.txt`, readStatus())
	console.log(
		JSON.stringify({
			pid: child.pid,
			exit: exit.error === undefined ? exit.code : 127,
			signal: exit.signal,
			capped,
			durationMs,
			journal,
			errors,
			error: exit.error,
		}),
	)
	if (exit.error !== undefined) return 127
	return capped ? 124 : (exit.code ?? 1)
}

main(process.argv.slice(2)).then((code) => {
	process.exitCode = code
})
