import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import { runSkillScript } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-dispatch/scripts/launch.ts'

describe('launch.ts', () => {
	it('journals a command, ends the errors file with the exit trailer, and prints a summary', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-' })
		try {
			scratch.write('say.cjs', "process.stdout.write('hello\\n'); process.stderr.write('warn\\n')")
			const run = runSkillScript(
				SCRIPT,
				[
					'--journal',
					'tmp/units/say.jsonl',
					'--errors',
					'tmp/units/say.err',
					'--cap',
					'30',
					'--status',
					'--',
					process.execPath,
					'say.cjs',
				],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(0)
			expect(scratch.read('tmp/units/say.jsonl')).toBe('hello\n')
			expect(scratch.read('tmp/units/say.err')).toMatch(
				/^warn\n\nexit=0 signal=none capped=false duration_ms=\d+\n$/u,
			)
			expect(scratch.has('tmp/units/say.jsonl.status-before.txt')).toBe(true)
			expect(scratch.has('tmp/units/say.jsonl.status-after.txt')).toBe(true)
			expect(run.json?.exit).toBe(0)
			expect(run.json?.capped).toBe(false)
			expect(typeof run.json?.pid).toBe('number')
		} finally {
			scratch.destroy()
		}
	})

	it('kills a command at the cap and exits 124', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-cap-' })
		try {
			scratch.write('sleep.cjs', 'setTimeout(() => {}, 20000)')
			const run = runSkillScript(
				SCRIPT,
				[
					'--journal',
					'tmp/units/sleep.jsonl',
					'--errors',
					'tmp/units/sleep.err',
					'--cap',
					'1',
					'--',
					process.execPath,
					'sleep.cjs',
				],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(124)
			expect(run.json?.capped).toBe(true)
			expect(scratch.read('tmp/units/sleep.err')).toContain('capped=true')
		} finally {
			scratch.destroy()
		}
	})

	it('reports a command that cannot start as exit 127 with the reason in the errors file', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-start-' })
		try {
			const run = runSkillScript(
				SCRIPT,
				[
					'--journal',
					'tmp/units/none.jsonl',
					'--errors',
					'tmp/units/none.err',
					'--cap',
					'5',
					'--',
					'this-command-does-not-exist-anywhere',
				],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(127)
			expect(run.json?.exit).toBe(127)
			expect(typeof run.json?.error).toBe('string')
			expect(scratch.read('tmp/units/none.err')).toMatch(/could not start[\s\S]*exit=127 /u)
		} finally {
			scratch.destroy()
		}
	})

	it('reads its own flags before the separator alone and passes the rest verbatim', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-flags-' })
		try {
			scratch.write('echo.cjs', 'process.stdout.write(process.argv.slice(2).join(" "))')
			const run = runSkillScript(
				SCRIPT,
				[
					'--journal',
					'tmp/units/echo.jsonl',
					'--errors',
					'tmp/units/echo.err',
					'--cap',
					'30',
					'--',
					process.execPath,
					'echo.cjs',
					'--cap',
					'1',
					'--journal',
					'other',
				],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(0)
			expect(scratch.read('tmp/units/echo.jsonl')).toBe('--cap 1 --journal other')
			expect(run.json?.capped).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a missing separator, a flag with no value, a shared journal path, an empty command, and a cap that is not a number', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-usage-' })
		try {
			expect(
				runSkillScript(SCRIPT, ['--journal', 'a', '--errors', 'b'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--journal', '--errors', 'b', '--', process.execPath, '-v'], {
					cwd: scratch.path,
				}).status,
			).toBe(64)
			expect(
				runSkillScript(
					SCRIPT,
					['--journal', 'same', '--errors', 'same', '--', process.execPath, '-v'],
					{ cwd: scratch.path },
				).status,
			).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--journal', 'a', '--errors', 'b', '--', ''], { cwd: scratch.path })
					.status,
			).toBe(64)
			expect(
				runSkillScript(
					SCRIPT,
					['--journal', 'a', '--errors', 'b', '--cap', 'soon', '--', process.execPath, '-v'],
					{ cwd: scratch.path },
				).status,
			).toBe(64)
			expect(
				runSkillScript(
					SCRIPT,
					['--journal', 'a', '--errors', 'b', '--cap', '--', process.execPath, '-v'],
					{ cwd: scratch.path },
				).status,
			).toBe(64)
			expect(scratch.has('a')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})
})
