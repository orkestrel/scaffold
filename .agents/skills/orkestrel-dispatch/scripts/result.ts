// Read a bench lane's answer, session id, and liveness from its journal. Run from the checkout root:
//   node .agents/skills/orkestrel-dispatch/scripts/result.ts --cursor tmp/cursor/UNIT.jsonl [--out tmp/cursor/UNIT-result.md]
//   node .agents/skills/orkestrel-dispatch/scripts/result.ts --claude tmp/claude/UNIT.jsonl [--out tmp/claude/UNIT-result.md]
//   node .agents/skills/orkestrel-dispatch/scripts/result.ts --codex tmp/codex/UNIT.jsonl [--out tmp/codex/UNIT-result.md]
// A Cursor or Claude journal is the `--output-format stream-json` stream: the `init` event carries
// the session id and the `result` event carries the answer. A Codex journal is the `--json` stream:
// the `thread.started` event carries the thread id and the answer sits in the sibling `UNIT-last.md`
// file that `--output-last-message` wrote. The summary also reads the sibling `UNIT.err` file that
// launch.ts wrote (`exit`, `capped`, `durationMs`) and the journal's `bytes`, `ageMs`, and last
// event, which is the liveness reading for a run still going. The answer is written to --out when
// given, and a journal with no session or answer exits 3 so a driver cannot pass off an empty lane.
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { readMissingFlags, readNumber, readOption, readString } from './helpers.ts'

interface Reading {
	readonly session: string | undefined
	readonly answer: string | undefined
	readonly durationMs: number | undefined
}

interface Errors {
	readonly exit: number | undefined
	readonly capped: boolean | undefined
	readonly durationMs: number | undefined
}

function readEvents(path: string): ReadonlyArray<Record<string, unknown>> {
	const events: Array<Record<string, unknown>> = []
	for (const line of readFileSync(path, 'utf8').split(/\r\n|\n/)) {
		if (line.trim() === '') continue
		try {
			const parsed: unknown = JSON.parse(line)
			if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
				events.push(Object.fromEntries(Object.entries(parsed)))
			}
		} catch {}
	}
	return events
}

function readAnswer(text: string | undefined): string | undefined {
	return text === undefined || text.trim() === '' ? undefined : text
}

function readStream(events: ReadonlyArray<Record<string, unknown>>): Reading {
	const init = events.find((event) => event.type === 'system' && event.subtype === 'init')
	const result = events.find((event) => event.type === 'result')
	return {
		session: init === undefined ? undefined : readString(init, 'session_id'),
		answer: result === undefined ? undefined : readAnswer(readString(result, 'result')),
		durationMs: result === undefined ? undefined : readNumber(result, 'duration_ms'),
	}
}

function readCodex(path: string, events: ReadonlyArray<Record<string, unknown>>): Reading {
	const started = events.find((event) => event.type === 'thread.started')
	const last = path.replace(/\.jsonl$/u, '-last.md')
	return {
		session: started === undefined ? undefined : readString(started, 'thread_id'),
		answer: existsSync(last) ? readAnswer(readFileSync(last, 'utf8')) : undefined,
		durationMs: undefined,
	}
}

function readErrors(path: string): Errors {
	const errors = path.replace(/\.jsonl$/u, '.err')
	if (!existsSync(errors)) return { exit: undefined, capped: undefined, durationMs: undefined }
	const match = readFileSync(errors, 'utf8').match(
		/exit=(\S+) signal=\S+ capped=(true|false) duration_ms=(\d+)\s*$/u,
	)
	if (match === null) return { exit: undefined, capped: undefined, durationMs: undefined }
	const exit = Number(match[1])
	return {
		exit: Number.isFinite(exit) ? exit : undefined,
		capped: match[2] === 'true',
		durationMs: Number(match[3]),
	}
}

function describeEvent(event: Record<string, unknown> | undefined): string | undefined {
	if (event === undefined) return undefined
	const type = readString(event, 'type')
	const subtype = readString(event, 'subtype')
	return subtype === undefined ? type : `${type}/${subtype}`
}

function main(argv: readonly string[]): number {
	const missing = readMissingFlags(argv, ['--cursor', '--claude', '--codex', '--out'])
	if (missing.length > 0) {
		console.error(`result: ${missing.join(', ')} given with no value`)
		return 64
	}
	const modes = ['--cursor', '--claude', '--codex'].filter((flag) => argv.includes(flag))
	const mode = modes[0]
	const path = mode === undefined ? undefined : readOption(argv, mode)
	const out = readOption(argv, '--out')
	if (modes.length !== 1 || mode === undefined || path === undefined || !existsSync(path)) {
		console.error(
			'usage: result.ts (--cursor JOURNAL | --claude JOURNAL | --codex JOURNAL) [--out PATH]; name one mode',
		)
		return 64
	}
	const events = readEvents(path)
	const reading = mode === '--codex' ? readCodex(path, events) : readStream(events)
	const errors = readErrors(path)
	const stat = statSync(path)
	if (reading.answer !== undefined && out !== undefined) {
		mkdirSync(dirname(out), { recursive: true })
		writeFileSync(out, reading.answer)
	}
	console.log(
		JSON.stringify({
			journal: path,
			session: reading.session,
			durationMs: reading.durationMs ?? errors.durationMs,
			exit: errors.exit,
			capped: errors.capped,
			bytes: stat.size,
			ageMs: Math.max(0, Math.round(Date.now() - stat.mtimeMs)),
			lastEvent: describeEvent(events.at(-1)),
			answerLength: reading.answer?.length ?? 0,
			out: reading.answer === undefined ? undefined : out,
		}),
	)
	return reading.session === undefined || reading.answer === undefined ? 3 : 0
}

process.exitCode = main(process.argv.slice(2))
