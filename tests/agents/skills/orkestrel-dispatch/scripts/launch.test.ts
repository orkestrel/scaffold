import { spawn } from 'node:child_process'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { isRecord, parseJSON } from '@orkestrel/contract'
import { createTeardown, waitForCondition, waitForEvent } from '@orkestrel/test'
import { createScratch } from '@orkestrel/test/server'
import {
	buildSkillRun,
	LAUNCH_SCRIPT,
	runSkillScript,
	WORKSPACE_ROOT,
} from '../../../../setupServer.js'

describe('launch.ts', () => {
	it('journals a command, ends the errors file with the exit trailer, and prints a summary', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-' })
		try {
			scratch.write('say.cjs', "process.stdout.write('hello\\n'); process.stderr.write('warn\\n')")
			const run = runSkillScript(
				LAUNCH_SCRIPT,
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
				LAUNCH_SCRIPT,
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
				LAUNCH_SCRIPT,
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

	it('prints a spawn line and writes the pid file while the command runs, then the summary last', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-pid-' })
		const teardown = createTeardown()
		teardown.add(() => scratch.destroy())
		try {
			scratch.write('sleep.cjs', 'setTimeout(() => {}, 20000)')
			const child = spawn(
				process.execPath,
				[
					join(WORKSPACE_ROOT, LAUNCH_SCRIPT),
					'--journal',
					'tmp/units/live.jsonl',
					'--errors',
					'tmp/units/live.err',
					'--cap',
					'3',
					'--',
					process.execPath,
					'sleep.cjs',
				],
				{ cwd: scratch.path, windowsHide: true, stdio: ['ignore', 'pipe', 'ignore'] },
			)
			const output: string[] = []
			child.stdout.setEncoding('utf8')
			child.stdout.on('data', (chunk: string) => {
				output.push(chunk)
			})
			const closed = waitForEvent<[number | null]>(
				(listener) => {
					child.on('close', listener)
				},
				'launch.ts exits at the cap',
				{ budget: 30_000 },
			)
			// The launched tree holds files in the scratch directory until the cap ends it, so the
			// teardown awaits the close before it removes the directory.
			teardown.add(async () => {
				await closed.catch(() => undefined)
			})
			await waitForCondition(
				'launch.ts prints its spawn line',
				() => output.join('').includes('\n'),
				{
					budget: 15_000,
				},
			)
			const stdout = output.join('')
			const spawned = parseJSON(stdout.split(/\r\n|\n/)[0] ?? '')
			const pid = isRecord(spawned) ? spawned.pid : undefined
			expect(typeof pid).toBe('number')
			if (typeof pid !== 'number') return
			expect(spawned).toEqual({
				pid,
				journal: 'tmp/units/live.jsonl',
				errors: 'tmp/units/live.err',
			})
			expect(() => process.kill(pid, 0)).not.toThrow()
			expect(scratch.read('tmp/units/live.jsonl.pid')).toBe(`${pid}\n`)
			const [status] = await closed
			const run = buildSkillRun(status, output.join(''), '')
			expect(run.status).toBe(124)
			expect(run.stdout.split(/\r\n|\n/).filter((line) => line !== '')).toHaveLength(2)
			expect(run.json?.pid).toBe(pid)
			expect(run.json?.capped).toBe(true)
		} finally {
			await teardown.destroy()
		}
	})

	it('removes a pid file an earlier run left on the same journal when the command cannot start', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-stale-' })
		try {
			scratch.write('tmp/units/none.jsonl.pid', '4242\n')
			const run = runSkillScript(
				LAUNCH_SCRIPT,
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
			expect(scratch.has('tmp/units/none.jsonl.pid')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('prints no spawn line and writes no pid file for a command that cannot start', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-nopid-' })
		try {
			const run = runSkillScript(
				LAUNCH_SCRIPT,
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
			expect(run.stdout.split(/\r\n|\n/).filter((line) => line !== '')).toHaveLength(1)
			expect(run.json?.pid).toBeUndefined()
			expect(scratch.has('tmp/units/none.jsonl.pid')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('reads its own flags before the separator alone and passes the rest verbatim', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-flags-' })
		try {
			scratch.write('echo.cjs', 'process.stdout.write(process.argv.slice(2).join(" "))')
			const run = runSkillScript(
				LAUNCH_SCRIPT,
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

	it('refuses a missing separator, a flag with no value, a shared journal path, an empty command, and a cap that is not a number of seconds from 0 to 2147483', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-usage-' })
		try {
			expect(
				runSkillScript(LAUNCH_SCRIPT, ['--journal', 'a', '--errors', 'b'], { cwd: scratch.path })
					.status,
			).toBe(64)
			expect(
				runSkillScript(
					LAUNCH_SCRIPT,
					['--journal', '--errors', 'b', '--', process.execPath, '-v'],
					{
						cwd: scratch.path,
					},
				).status,
			).toBe(64)
			expect(
				runSkillScript(
					LAUNCH_SCRIPT,
					['--journal', 'same', '--errors', 'same', '--', process.execPath, '-v'],
					{ cwd: scratch.path },
				).status,
			).toBe(64)
			expect(
				runSkillScript(LAUNCH_SCRIPT, ['--journal', 'a', '--errors', 'b', '--', ''], {
					cwd: scratch.path,
				}).status,
			).toBe(64)
			expect(
				runSkillScript(
					LAUNCH_SCRIPT,
					['--journal', 'a', '--errors', 'b', '--cap', 'soon', '--', process.execPath, '-v'],
					{ cwd: scratch.path },
				).status,
			).toBe(64)
			expect(
				runSkillScript(
					LAUNCH_SCRIPT,
					['--journal', 'a', '--errors', 'b', '--cap', '--', process.execPath, '-v'],
					{ cwd: scratch.path },
				).status,
			).toBe(64)
			// One second past the longest whole-second wait a Node timer holds.
			const beyond = runSkillScript(
				LAUNCH_SCRIPT,
				['--journal', 'a', '--errors', 'b', '--cap', '2147484', '--', process.execPath, '-v'],
				{ cwd: scratch.path },
			)
			expect(beyond.status).toBe(64)
			expect(beyond.stderr).toContain('from 0 to 2147483')
			expect(scratch.has('a')).toBe(false)
			expect(scratch.has('b')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('runs a command under the longest cap a Node timer holds', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-bound-' })
		try {
			scratch.write('bound.cjs', "process.stdout.write('bounded\\n')")
			const run = runSkillScript(
				LAUNCH_SCRIPT,
				[
					'--journal',
					'tmp/units/bound.jsonl',
					'--errors',
					'tmp/units/bound.err',
					'--cap',
					'2147483',
					'--',
					process.execPath,
					'bound.cjs',
				],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(0)
			expect(scratch.read('tmp/units/bound.jsonl')).toBe('bounded\n')
			expect(scratch.read('tmp/units/bound.err')).toMatch(
				/\nexit=0 signal=none capped=false duration_ms=\d+\n$/u,
			)
			expect(run.json?.capped).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('runs a command under a cap whose milliseconds are fractional', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-fraction-' })
		try {
			scratch.write('fraction.cjs', "process.stdout.write('fractional\\n')")
			const run = runSkillScript(
				LAUNCH_SCRIPT,
				[
					'--journal',
					'tmp/units/fraction.jsonl',
					'--errors',
					'tmp/units/fraction.err',
					'--cap',
					'30.0001',
					'--',
					process.execPath,
					'fraction.cjs',
				],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(0)
			expect(scratch.read('tmp/units/fraction.jsonl')).toBe('fractional\n')
			expect(scratch.read('tmp/units/fraction.err')).toMatch(
				/\nexit=0 signal=none capped=false duration_ms=\d+\n$/u,
			)
			expect(run.json?.capped).toBe(false)
		} finally {
			scratch.destroy()
		}
	})
})
