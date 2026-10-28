import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import { RESULT_STREAM, runSkillScript, RESULT_SCRIPT } from '../../../../setupServer.js'
import {
	describeEvent,
	parseJsonLine,
	readAnswer,
	readCodex,
	readErrors,
	readEvents,
	readMissingFlags,
	readNumber,
	readOption,
	readStream,
	readString,
	readUnknownFlags,
} from '../../../../../.agents/skills/orkestrel-dispatch/scripts/result.ts'

describe('result.ts', () => {
	it('reads a stream journal, its errors trailer, and its liveness fields, and writes the answer into a directory it creates', () => {
		const scratch = createScratch({ prefix: 'orkestrel-result-' })
		try {
			scratch.write('tmp/cursor/u.jsonl', RESULT_STREAM)
			scratch.write('tmp/cursor/u.err', '\nexit=0 signal=none capped=false duration_ms=99\n')
			const run = runSkillScript(
				RESULT_SCRIPT,
				['--cursor', 'tmp/cursor/u.jsonl', '--out', 'tmp/cursor/deep/u-result.md'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(0)
			expect(run.json).toMatchObject({
				session: 's1',
				durationMs: 42,
				exit: 0,
				capped: false,
				lastEvent: 'result',
				answerLength: 5,
			})
			expect(typeof run.json?.bytes).toBe('number')
			expect(typeof run.json?.ageMs).toBe('number')
			expect(scratch.read('tmp/cursor/deep/u-result.md')).toBe('READY')
			const claude = runSkillScript(RESULT_SCRIPT, ['--claude', 'tmp/cursor/u.jsonl'], {
				cwd: scratch.path,
			})
			expect(claude.status).toBe(0)
			expect(claude.json?.session).toBe('s1')
		} finally {
			scratch.destroy()
		}
	})

	it('reads the errors trailer when the journal carries no result event yet', () => {
		const scratch = createScratch({ prefix: 'orkestrel-result-live-' })
		try {
			scratch.write(
				'tmp/cursor/live.jsonl',
				'{"type":"system","subtype":"init","session_id":"s1"}\n{"type":"thinking","subtype":"delta"}\n',
			)
			const run = runSkillScript(RESULT_SCRIPT, ['--cursor', 'tmp/cursor/live.jsonl'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(3)
			expect(run.json).toMatchObject({
				session: 's1',
				lastEvent: 'thinking/delta',
				answerLength: 0,
			})
			expect(run.json?.exit).toBeUndefined()
		} finally {
			scratch.destroy()
		}
	})

	it('treats a blank answer as absent and reads a Codex journal from its last-message file', () => {
		const scratch = createScratch({ prefix: 'orkestrel-result-codex-' })
		try {
			scratch.write(
				'tmp/cursor/blank.jsonl',
				'{"type":"system","subtype":"init","session_id":"s1"}\n{"type":"result","result":"  "}\n',
			)
			expect(
				runSkillScript(RESULT_SCRIPT, ['--cursor', 'tmp/cursor/blank.jsonl'], { cwd: scratch.path })
					.status,
			).toBe(3)
			scratch.write(
				'tmp/codex/c.jsonl',
				'{"type":"thread.started","thread_id":"t1"}\n{"type":"turn.completed"}\n',
			)
			expect(
				runSkillScript(RESULT_SCRIPT, ['--codex', 'tmp/codex/c.jsonl'], { cwd: scratch.path })
					.status,
			).toBe(3)
			scratch.write('tmp/codex/c-last.md', 'answer')
			const run = runSkillScript(RESULT_SCRIPT, ['--codex', 'tmp/codex/c.jsonl'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(0)
			expect(run.json).toMatchObject({
				session: 't1',
				answerLength: 6,
				lastEvent: 'turn.completed',
			})
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a missing journal, two modes at once, and a flag with no value', () => {
		const scratch = createScratch({ prefix: 'orkestrel-result-usage-' })
		try {
			scratch.write('tmp/cursor/u.jsonl', RESULT_STREAM)
			scratch.write('tmp/codex/c.jsonl', '{"type":"thread.started","thread_id":"t1"}\n')
			expect(
				runSkillScript(RESULT_SCRIPT, ['--cursor', 'tmp/none.jsonl'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(
					RESULT_SCRIPT,
					['--cursor', 'tmp/cursor/u.jsonl', '--codex', 'tmp/codex/c.jsonl'],
					{
						cwd: scratch.path,
					},
				).status,
			).toBe(64)
			expect(
				runSkillScript(RESULT_SCRIPT, ['--cursor', 'tmp/cursor/u.jsonl', '--out'], {
					cwd: scratch.path,
				}).status,
			).toBe(64)
			expect(runSkillScript(RESULT_SCRIPT, [], { cwd: scratch.path }).status).toBe(64)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses an unknown flag and the equals form before it reads the journal', () => {
		const scratch = createScratch({ prefix: 'orkestrel-result-flags-' })
		try {
			scratch.write('tmp/cursor/u.jsonl', RESULT_STREAM)
			const unknown = runSkillScript(RESULT_SCRIPT, ['--cursor', 'tmp/cursor/u.jsonl', '--bogus'], {
				cwd: scratch.path,
			})
			expect(unknown.status).toBe(64)
			expect(unknown.stderr).toContain('--bogus')
			expect(unknown.stdout).toBe('')
			const equals = runSkillScript(RESULT_SCRIPT, ['--cursor=tmp/cursor/u.jsonl'], {
				cwd: scratch.path,
			})
			expect(equals.status).toBe(64)
			expect(equals.stderr).toContain('--cursor=tmp/cursor/u.jsonl')
			const out = runSkillScript(
				RESULT_SCRIPT,
				['--cursor', 'tmp/cursor/u.jsonl', '--out=tmp/answer.md'],
				{ cwd: scratch.path },
			)
			expect(out.status).toBe(64)
			expect(scratch.has('tmp/answer.md')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})
})

describe('the journal readers', () => {
	it('reads every JSON object line and skips a blank, a malformed, and an array line', () => {
		const scratch = createScratch({ prefix: 'orkestrel-result-events-' })
		try {
			const path = scratch.write(
				'j.jsonl',
				'{"type":"a"}\r\n\r\nnot json\r\n[1]\r\n{"type":"b","subtype":"c"}\r\n',
			)
			expect(readEvents(path)).toEqual([{ type: 'a' }, { type: 'b', subtype: 'c' }])
			expect(readEvents(scratch.write('empty.jsonl', ''))).toEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('reads an answer as present only when it carries something besides whitespace', () => {
		expect(readAnswer(undefined)).toBeUndefined()
		expect(readAnswer('')).toBeUndefined()
		expect(readAnswer(' \n\t')).toBeUndefined()
		expect(readAnswer('READY')).toBe('READY')
		expect(readAnswer(' READY \n')).toBe(' READY \n')
	})

	it('reads the session from the init event and the answer and duration from the result event', () => {
		expect(
			readStream([
				{ type: 'system', subtype: 'init', session_id: 's1' },
				{ type: 'result', result: 'READY', duration_ms: 42 },
			]),
		).toEqual({ session: 's1', answer: 'READY', durationMs: 42 })
		expect(readStream([])).toEqual({ session: undefined, answer: undefined, durationMs: undefined })
		expect(readStream([{ type: 'system', subtype: 'init' }]).session).toBeUndefined()
		expect(
			readStream([{ type: 'system', subtype: 'other', session_id: 'x' }]).session,
		).toBeUndefined()
		expect(readStream([{ type: 'result', result: '  ' }]).answer).toBeUndefined()
		expect(readStream([{ type: 'result', result: 'x', duration_ms: Number.NaN }]).durationMs).toBe(
			undefined,
		)
	})

	it('reads a Codex thread id from the journal and the answer from the last-message file beside it', () => {
		const scratch = createScratch({ prefix: 'orkestrel-result-codex-reader-' })
		try {
			const path = join(scratch.path, 'c.jsonl')
			const events = [{ type: 'thread.started', thread_id: 't1' }, { type: 'turn.completed' }]
			expect(readCodex(path, events)).toEqual({
				session: 't1',
				answer: undefined,
				durationMs: undefined,
			})
			scratch.write('c-last.md', '  ')
			expect(readCodex(path, events).answer).toBeUndefined()
			scratch.write('c-last.md', 'answer')
			expect(readCodex(path, events).answer).toBe('answer')
			expect(readCodex(path, [{ type: 'turn.completed' }]).session).toBeUndefined()
		} finally {
			scratch.destroy()
		}
	})

	it('reads the exit trailer launch.ts wrote, and nothing from a missing file or a trailer that does not end the file', () => {
		const scratch = createScratch({ prefix: 'orkestrel-result-trailer-' })
		try {
			const path = join(scratch.path, 'u.jsonl')
			const none = { exit: undefined, capped: undefined, durationMs: undefined }
			expect(readErrors(path)).toEqual(none)
			scratch.write('u.err', 'warn\n\nexit=0 signal=none capped=false duration_ms=99\n')
			expect(readErrors(path)).toEqual({ exit: 0, capped: false, durationMs: 99 })
			scratch.write('u.err', '\nexit=124 signal=SIGKILL capped=true duration_ms=5\n')
			expect(readErrors(path)).toEqual({ exit: 124, capped: true, durationMs: 5 })
			scratch.write('u.err', '\nexit=null signal=SIGTERM capped=false duration_ms=7\n')
			expect(readErrors(path)).toEqual({ exit: undefined, capped: false, durationMs: 7 })
			scratch.write('u.err', 'exit=0 signal=none capped=false duration_ms=1\nmore output\n')
			expect(readErrors(path)).toEqual(none)
			scratch.write('u.err', 'no trailer at all\n')
			expect(readErrors(path)).toEqual(none)
		} finally {
			scratch.destroy()
		}
	})

	it('describes an event by its type and subtype', () => {
		expect(describeEvent(undefined)).toBeUndefined()
		expect(describeEvent({ type: 'result' })).toBe('result')
		expect(describeEvent({ type: 'system', subtype: 'init' })).toBe('system/init')
		expect(describeEvent({})).toBeUndefined()
	})
})

describe('the record readers', () => {
	it('reads the last JSON object line and typed members', () => {
		expect(parseJsonLine('noise\n{"a":1,"b":"x"}\n\n')).toEqual({ a: 1, b: 'x' })
		expect(parseJsonLine('{"a":1}\r\n{"a":2}\r\n')).toEqual({ a: 2 })
		expect(parseJsonLine('{"a":1}\n[1]\n')).toBeUndefined()
		expect(parseJsonLine('{"a":1}\nnot json\n')).toBeUndefined()
		expect(parseJsonLine('')).toBeUndefined()
		expect(readString({ b: 'x' }, 'b')).toBe('x')
		expect(readString({ b: 1 }, 'b')).toBeUndefined()
		expect(readString(undefined, 'b')).toBeUndefined()
		expect(readNumber({ a: 1 }, 'a')).toBe(1)
		expect(readNumber({ a: Number.NaN }, 'a')).toBeUndefined()
		expect(readNumber({ a: Number.POSITIVE_INFINITY }, 'a')).toBeUndefined()
		expect(readNumber({ a: '1' }, 'a')).toBeUndefined()
	})
})

describe('the argument readers', () => {
	it('reads a flag value and treats a following flag as a missing value, keeping the first occurrence', () => {
		const argv = ['--cursor', 'j.jsonl', '--out']
		expect(readOption(argv, '--cursor')).toBe('j.jsonl')
		expect(readOption(argv, '--absent')).toBeUndefined()
		expect(readOption(['--cursor', '--out', 'x'], '--cursor')).toBeUndefined()
		expect(readOption(['--x', '1', '--x', '2'], '--x')).toBe('1')
		expect(readMissingFlags(argv, ['--cursor', '--out'])).toEqual(['--out'])
		expect(readMissingFlags(['--cursor', 'j'], ['--out'])).toEqual([])
	})

	it('names an unread flag and the equals form, and stops at the command separator', () => {
		expect(
			readUnknownFlags(['--cursor=j.jsonl', '--out', 'a', '--bogus'], ['--cursor', '--out']),
		).toEqual(['--cursor=j.jsonl', '--bogus'])
		expect(readUnknownFlags(['--out', 'a', '--', '--watch'], ['--out'])).toEqual([])
		expect(readUnknownFlags([], [])).toEqual([])
	})
})
