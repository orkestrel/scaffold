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
// Name one mode per run; the script refuses a flag it does not read, the `--flag=value` form
// included. Exit 0 when the lane answered, 3 when it carries no session or answer, 64 on usage.
import { existsSync, mkdirSync, readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

/** Lists the flags that each select one journal reader. */
export const MODE_FLAGS: readonly string[] = ['--cursor', '--claude', '--codex']

/** Lists the flags that take a value. */
export const VALUE_FLAGS: readonly string[] = [...MODE_FLAGS, '--out']

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = VALUE_FLAGS

/** Holds the usage line printed when a call names no journal or two modes. */
export const USAGE =
	'usage: result.ts (--cursor JOURNAL | --claude JOURNAL | --codex JOURNAL) [--out PATH]; name one mode'

/** Describes what a journal's events say: the session, the answer, and the run's duration. */
export interface Reading {
	readonly session: string | undefined
	readonly answer: string | undefined
	readonly durationMs: number | undefined
}

/** Describes what the sibling errors file says about the run that wrote the journal. */
export interface Errors {
	readonly exit: number | undefined
	readonly capped: boolean | undefined
	readonly durationMs: number | undefined
}

/**
 * Reads the value that follows a flag.
 *
 * @remarks
 * The first occurrence of a flag wins, a following value that opens with `--` is a missing value,
 * and the `--flag=value` form is not read.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--out`.
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
 * @param text - Text whose last line is JSON, such as one journal line.
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
 * Reads every JSON object line of a journal.
 *
 * @param path - The journal file.
 * @returns Each line that parses as a JSON object, in order; a blank or malformed line is skipped.
 */
export function readEvents(path: string): ReadonlyArray<Record<string, unknown>> {
	return readFileSync(path, 'utf8')
		.split(/\r\n|\n/)
		.flatMap((line) => {
			const event = parseJsonLine(line)
			return event === undefined ? [] : [event]
		})
}

/**
 * Reads an answer text as present only when it carries something besides whitespace.
 *
 * @param text - The answer text, or undefined.
 * @returns The text unchanged, or undefined when it is absent or blank.
 */
export function readAnswer(text: string | undefined): string | undefined {
	return text === undefined || text.trim() === '' ? undefined : text
}

/**
 * Reads a Cursor or Claude stream journal's events.
 *
 * @param events - The journal's events.
 * @returns The session from the `init` event and the answer and duration from the `result` event.
 */
export function readStream(events: ReadonlyArray<Record<string, unknown>>): Reading {
	const init = events.find((event) => event.type === 'system' && event.subtype === 'init')
	const result = events.find((event) => event.type === 'result')
	return {
		session: init === undefined ? undefined : readString(init, 'session_id'),
		answer: result === undefined ? undefined : readAnswer(readString(result, 'result')),
		durationMs: result === undefined ? undefined : readNumber(result, 'duration_ms'),
	}
}

/**
 * Reads a Codex journal's events and its sibling last-message file.
 *
 * @param path - The journal path; the answer sits beside it in `<name>-last.md`.
 * @param events - The journal's events.
 * @returns The thread id from the `thread.started` event and the answer from the last-message file.
 */
export function readCodex(path: string, events: ReadonlyArray<Record<string, unknown>>): Reading {
	const started = events.find((event) => event.type === 'thread.started')
	const last = path.replace(/\.jsonl$/u, '-last.md')
	return {
		session: started === undefined ? undefined : readString(started, 'thread_id'),
		answer: existsSync(last) ? readAnswer(readFileSync(last, 'utf8')) : undefined,
		durationMs: undefined,
	}
}

/**
 * Reads the exit trailer launch.ts wrote to the errors file beside a journal.
 *
 * @param path - The journal path; the trailer sits beside it in `<name>.err`.
 * @returns The exit code, whether the run was capped, and its duration; each is undefined when the
 * file is absent or carries no trailer.
 */
export function readErrors(path: string): Errors {
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

/**
 * Describes an event by its type and subtype.
 *
 * @param event - The event, or undefined.
 * @returns `type` or `type/subtype`, or undefined when there is no event.
 */
export function describeEvent(event: Record<string, unknown> | undefined): string | undefined {
	if (event === undefined) return undefined
	const type = readString(event, 'type')
	const subtype = readString(event, 'subtype')
	return subtype === undefined ? type : `${type}/${subtype}`
}

/**
 * Runs the script on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 when the lane answered, 3 when it carries no session or answer, 64 on usage.
 */
export function main(argv: readonly string[]): number {
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(`result: ${unknown.join(', ')} is not a flag this script reads; ${USAGE}`)
		return 64
	}
	const missing = readMissingFlags(argv, VALUE_FLAGS)
	if (missing.length > 0) {
		console.error(`result: ${missing.join(', ')} given with no value`)
		return 64
	}
	const modes = MODE_FLAGS.filter((flag) => argv.includes(flag))
	const mode = modes[0]
	const path = mode === undefined ? undefined : readOption(argv, mode)
	const out = readOption(argv, '--out')
	if (modes.length !== 1 || mode === undefined || path === undefined || !existsSync(path)) {
		console.error(USAGE)
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

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
