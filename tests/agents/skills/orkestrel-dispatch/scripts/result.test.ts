import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import { RESULT_STREAM, runSkillScript, RESULT_SCRIPT } from '../../../../setupServer.js'

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
})
