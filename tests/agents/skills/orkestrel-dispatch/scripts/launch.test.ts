import type { Socket } from 'node:net'
import { spawn, spawnSync } from 'node:child_process'
import { closeSync, existsSync, openSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:net'
import { delimiter, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { describe, expect, it } from 'vitest'
import { isRecord, parseJSON } from '@orkestrel/contract'
import { createRecorder, createTeardown, waitForCondition, waitForEvent } from '@orkestrel/test'
import { createScratch, destroyScratch } from '@orkestrel/test/server'
import {
	buildEnvironment as buildTestEnvironment,
	buildSkillRun,
	createRepository,
	LAUNCH_SCRIPT,
	runSkillScript,
	WORKSPACE_ROOT,
	runFlagRefusals,
} from '../../../../setupServer.js'
import {
	OPTIONS,
	buildEnvironment,
	collectVariables,
	computeCapMilliseconds,
	endRunning,
	forceKillTree,
	HANDOFF_SUFFIX,
	isHandoff,
	isVariables,
	killLauncher,
	matchesRecord,
	matchesSameFile,
	MAX_CAP_SECONDS,
	parseArguments,
	parseCreation,
	parseHandoff,
	POWERSHELL_MS,
	quoteArgument,
	readCommandLine,
	readConfirmation,
	readGitStatus,
	readPid,
	readRefusal,
	readRunning,
	REFUSED_SUFFIX,
	renderCommandLine,
	runDetach,
	runPowerShell,
	startCommand,
	waitForConfirmation,
	waitForExit,
	writeClosing,
} from '../../../../../.agents/skills/orkestrel-dispatch/scripts/launch.ts'

describe('launch.ts', () => {
	it('B5.1 reports a shim that cannot start as exit 127 with its trailer and no pid', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-shim-' })
		try {
			const shim = scratch.write('shim.cmd', '@echo off\r\nexit /b 0\r\n')
			const run = runSkillScript(
				LAUNCH_SCRIPT,
				[
					'--journal',
					'tmp/units/shim.jsonl',
					'--errors',
					'tmp/units/shim.err',
					'--cap',
					'5',
					'--status',
					'--',
					shim,
				],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(127)
			expect(run.json?.exit).toBe(127)
			expect(run.json?.error).toEqual(expect.any(String))
			expect(run.json?.error).not.toBe('')
			expect(run.json?.pid).toBeUndefined()
			expect(run.json?.capped).toBe(false)
			expect(run.stdout.split(/\r\n|\n/).filter((line) => line !== '')).toHaveLength(1)
			expect(scratch.read('tmp/units/shim.jsonl')).toBe('')
			expect(scratch.read('tmp/units/shim.err')).toMatch(
				/^launch: the command could not start: .+\n\nexit=127 signal=none capped=false duration_ms=\d+\n$/u,
			)
			expect(scratch.has('tmp/units/shim.jsonl.pid')).toBe(false)
			expect(scratch.has('tmp/units/shim.jsonl.status-before.txt')).toBe(true)
			expect(scratch.has('tmp/units/shim.jsonl.status-after.txt')).toBe(true)
		} finally {
			scratch.destroy()
		}
	})

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
			expect(beyond.stderr).toContain('--cap takes a number of seconds from 0 to 2147483')
			expect(beyond.stderr).toContain('not "2147484"')
			const empty = runSkillScript(
				LAUNCH_SCRIPT,
				['--journal', 'a', '--errors', 'b', '--cap', '', '--', process.execPath, '-v'],
				{ cwd: scratch.path },
			)
			expect(empty.status).toBe(64)
			expect(empty.stderr).toContain('--cap takes a number of seconds from 0 to 2147483')
			expect(empty.stderr).toContain('not ""')
			const same = runSkillScript(
				LAUNCH_SCRIPT,
				['--journal', 'same', '--errors', 'same', '--', process.execPath, '-v'],
				{ cwd: scratch.path },
			)
			expect(same.stderr).toContain('--journal and --errors name the same file')
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

	it('refuses an unknown flag with the parseArgs message before the separator, starts nothing, and reads the --flag=value form', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-unknown-' })
		try {
			const unknown = runSkillScript(
				LAUNCH_SCRIPT,
				['--journal', 'a', '--errors', 'b', '--bogus', '--', process.execPath, '-v'],
				{ cwd: scratch.path },
			)
			expect(unknown.status).toBe(64)
			expect(unknown.stderr).toContain("'--bogus'")
			expect(unknown.stderr).toContain('usage: launch.ts')
			expect(unknown.stdout).toBe('')
			expect(scratch.has('a')).toBe(false)
			expect(scratch.has('b')).toBe(false)
			const equals = runSkillScript(
				LAUNCH_SCRIPT,
				['--journal=a', '--errors=b', '--cap=30', '--', process.execPath, '-v'],
				{ cwd: scratch.path },
			)
			expect(equals.status).toBe(0)
			expect(scratch.read('a')?.trim()).toBe(process.version)
			expect(parseArguments(['--cap=5', '--status'])).toEqual({
				success: true,
				value: { values: { cap: '5', status: true }, positionals: [] },
			})
		} finally {
			scratch.destroy()
		}
	})

	it('keeps an argument of the command that looks like an unknown flag intact after the separator', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-after-' })
		try {
			scratch.write('echo.cjs', 'process.stdout.write(process.argv.slice(2).join(" "))')
			const run = runSkillScript(
				LAUNCH_SCRIPT,
				[
					'--journal',
					'tmp/units/after.jsonl',
					'--errors',
					'tmp/units/after.err',
					'--cap',
					'30',
					'--',
					process.execPath,
					'echo.cjs',
					'--bogus',
					'--',
					'--journal',
					'--x=1',
				],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(0)
			expect(scratch.read('tmp/units/after.jsonl')).toBe('--bogus -- --journal --x=1')
		} finally {
			scratch.destroy()
		}
	})
})

describe('the cap decision', () => {
	it('aborts the controller and kills a command that is still running when the cap lands', async () => {
		const child = spawn(process.execPath, ['-e', 'setTimeout(() => {}, 20000)'], {
			stdio: 'ignore',
			windowsHide: true,
		})
		const closed = waitForEvent<[number | null]>(
			(listener) => {
				child.on('close', listener)
			},
			'the running command closes after the cap kills it',
			{ budget: 30_000 },
		)
		const ended = new AbortController()
		endRunning(child, ended)
		expect(ended.signal.aborted).toBe(true)
		await closed
		expect(child.exitCode !== null || child.signalCode !== null).toBe(true)
	})

	it('leaves the controller alone for a command that already exited on its own', async () => {
		const child = spawn(process.execPath, ['-e', ''], { stdio: 'ignore', windowsHide: true })
		await waitForEvent<[number | null]>(
			(listener) => {
				child.on('close', listener)
			},
			'the command exits on its own',
			{ budget: 30_000 },
		)
		expect(child.exitCode).toBe(0)
		const ended = new AbortController()
		endRunning(child, ended)
		expect(ended.signal.aborted).toBe(false)
	})

	it('computes whole milliseconds with 1 ms the least', () => {
		expect(computeCapMilliseconds(1)).toBe(1000)
		expect(computeCapMilliseconds(0.5)).toBe(500)
		expect(computeCapMilliseconds(30.0001)).toBe(30_000)
		expect(computeCapMilliseconds(0.0001)).toBe(1)
		expect(computeCapMilliseconds(MAX_CAP_SECONDS)).toBe(MAX_CAP_SECONDS * 1000)
	})

	it('kills a running process tree and tolerates a process that is already gone', async () => {
		const child = spawn(process.execPath, ['-e', 'setTimeout(() => {}, 20000)'], {
			stdio: 'ignore',
			windowsHide: true,
		})
		const closed = waitForEvent<[number | null]>(
			(listener) => {
				child.on('close', listener)
			},
			'the process closes after the force kill',
			{ budget: 30_000 },
		)
		const pid = child.pid
		expect(typeof pid).toBe('number')
		if (pid === undefined) return
		forceKillTree(pid)
		await closed
		expect(() => {
			forceKillTree(pid)
		}).not.toThrow()
	})
})

describe('the command start', () => {
	it('starts a command into the journal and errors files and waits for its exit code', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-start-fd-' })
		try {
			const journal = openSync(join(scratch.path, 'out.txt'), 'w')
			const errors = openSync(join(scratch.path, 'err.txt'), 'w')
			const started = startCommand(
				process.execPath,
				['-e', 'process.stdout.write("out"); process.stderr.write("err"); process.exit(3)'],
				journal,
				errors,
			)
			if ('error' in started) throw new Error('The command did not start')
			expect(await waitForExit(started)).toEqual({ code: 3, signal: null, error: undefined })
			closeSync(journal)
			closeSync(errors)
			expect(scratch.read('out.txt')).toBe('out')
			expect(scratch.read('err.txt')).toBe('err')
		} finally {
			scratch.destroy()
		}
	})

	it('reports a command that cannot start as an error exit', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-start-missing-' })
		try {
			const journal = openSync(join(scratch.path, 'out.txt'), 'w')
			const errors = openSync(join(scratch.path, 'err.txt'), 'w')
			const started = startCommand('this-command-does-not-exist-anywhere', [], journal, errors)
			const exit = 'error' in started ? started : await waitForExit(started)
			closeSync(journal)
			closeSync(errors)
			expect(exit.code).toBeNull()
			expect(exit.signal).toBeNull()
			expect(typeof exit.error).toBe('string')
		} finally {
			scratch.destroy()
		}
	})
})

describe('the git status reader', () => {
	it('reads the porcelain status of a repository and names git failure outside one', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-status-' })
		try {
			expect(readGitStatus(scratch.path)).toMatch(/^git status failed: /u)
			createRepository(scratch.path)
			scratch.write('new.txt', 'x')
			expect(readGitStatus(scratch.path)).toContain('?? new.txt')
		} finally {
			scratch.destroy()
		}
	})
})

describe('the detach', () => {
	it('quotes each argument the way CommandLineToArgvW reads it back', () => {
		expect(quoteArgument('plain')).toBe('"plain"')
		expect(quoteArgument('')).toBe('""')
		expect(quoteArgument('with space')).toBe('"with space"')
		expect(quoteArgument('a"b')).toBe('"a\\"b"')
		expect(quoteArgument('a\\"b')).toBe('"a\\\\\\"b"')
		expect(quoteArgument('a\\b')).toBe('"a\\b"')
		expect(quoteArgument('C:\\dir\\')).toBe('"C:\\dir\\\\"')
		expect(renderCommandLine(['C:\\node.exe', '--handoff', 'x y'])).toBe(
			'"C:\\node.exe" "--handoff" "x y"',
		)
	})

	it('round-trips quoted arguments with spaces, quotes, and backslashes through a real node child', (context) => {
		if (process.platform !== 'win32') {
			context.skip(
				'windowsVerbatimArguments is a Windows spawn option: any other host passes an argument array and parses no command line',
			)
		}
		const args = [
			'with space',
			'a"quote',
			'trail\\',
			'C:\\dir with space\\',
			'back\\\\"slash',
			'',
			'plain',
			'\\\\server\\share',
		]
		const result = spawnSync(
			process.execPath,
			[
				quoteArgument('-e'),
				quoteArgument('process.stdout.write(JSON.stringify(process.argv.slice(1)))'),
				...args.map(quoteArgument),
			],
			{ encoding: 'utf8', windowsHide: true, windowsVerbatimArguments: true },
		)
		expect(result.status).toBe(0)
		expect(parseJSON(result.stdout)).toEqual(args)
	})

	it('exits 69 on a host whose platform page records no detach procedure, and writes nothing', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-host-' })
		try {
			const code = await runDetach(
				{
					command: [process.execPath, '-v'],
					cwd: scratch.path,
					cap: 5,
					status: false,
					journal: join(scratch.path, 'tmp', 'units', 'host.jsonl'),
					errors: join(scratch.path, 'tmp', 'units', 'host.err'),
					variables: { PATH: 'lead' },
				},
				'linux',
			)
			expect(code).toBe(69)
			expect(scratch.names('')).toEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it.each([
		[
			'--detach with no cap',
			['--journal', 'j', '--errors', 'e', '--detach', '--', process.execPath, '-v'],
			'--detach takes --cap above 0',
		],
		[
			'--detach with a cap of 0',
			['--journal', 'j', '--errors', 'e', '--cap', '0', '--detach', '--', process.execPath, '-v'],
			'--detach takes --cap above 0',
		],
		[
			'--handoff beside another flag',
			['--handoff', `j${HANDOFF_SUFFIX}`, '--journal', 'j'],
			'--handoff takes no other flag and no `--`, not --journal',
		],
		[
			'--handoff beside a bare --',
			['--handoff', `j${HANDOFF_SUFFIX}`, '--', process.execPath],
			'--handoff takes no other flag and no `--`, not --',
		],
		[
			'--env without --detach',
			['--journal', 'j', '--errors', 'e', '--cap', '5', '--env', 'PATH', '--', process.execPath],
			'--env belongs to --detach',
		],
		[
			'--env naming no variable',
			[
				...['--journal', 'j', '--errors', 'e', '--cap', '5', '--detach', '--env', 'A=B'],
				...['--', process.execPath, '-v'],
			],
			'"A=B" is no name',
		],
		[
			'--env naming an unset variable',
			[
				...['--journal', 'j', '--errors', 'e', '--cap', '5', '--detach'],
				...['--env', 'ORKESTREL_DETACH_UNSET_MARKER', '--', process.execPath, '-v'],
			],
			'"ORKESTREL_DETACH_UNSET_MARKER" is unset',
		],
		[
			'--detach with one file for the journal and the errors',
			['--journal', 'j', '--errors', './j', '--cap', '5', '--detach', '--', process.execPath],
			'--journal and --errors name the same file',
		],
	])('exits 64 and writes nothing on %s', (_name, args, text) => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-detach-usage-' })
		try {
			const run = runSkillScript(LAUNCH_SCRIPT, args, {
				cwd: scratch.path,
				env: { ORKESTREL_LANE: '' },
			})
			expect(run.status).toBe(64)
			expect(run.stderr).toContain(text)
			expect(run.stderr).toContain('usage: launch.ts')
			expect(run.stdout).toBe('')
			expect(scratch.names('')).toEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('exits 64 on --detach inside a lane ticket, naming the ticket, and writes nothing', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-detach-lane-' })
		try {
			const run = runSkillScript(
				LAUNCH_SCRIPT,
				['--journal', 'j', '--errors', 'e', '--cap', '5', '--detach', '--', process.execPath, '-v'],
				{ cwd: scratch.path, env: { ORKESTREL_LANE: 'peer-run' } },
			)
			expect(run.status).toBe(64)
			expect(run.stderr).toContain('--detach refuses a run inside the lane ticket "peer-run"')
			expect(run.stderr).toContain('outside lane.ts')
			expect(scratch.names('')).toEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('exits 75 while the launcher pid file names a live process, and touches no file', (context) => {
		if (process.platform !== 'win32') {
			context.skip(
				'--detach exits 69 before it reads the launcher pid file on a host whose platform page records no detach procedure',
			)
		}
		const scratch = createScratch({ prefix: 'orkestrel-launch-detach-held-' })
		try {
			scratch.write('tmp/units/held.jsonl.launcher.pid', `${process.pid}\n`)
			scratch.write('tmp/units/held.err', 'earlier\n')
			const run = runSkillScript(
				LAUNCH_SCRIPT,
				[
					...['--journal', 'tmp/units/held.jsonl', '--errors', 'tmp/units/held.err'],
					...['--cap', '5', '--detach', '--', process.execPath, '-v'],
				],
				{ cwd: scratch.path, env: { ORKESTREL_LANE: '' } },
			)
			expect(run.status).toBe(75)
			expect(run.stderr).toContain(`the launcher ${String(process.pid)}`)
			expect(run.stderr).toContain('still runs')
			expect(scratch.names('tmp/units')).toEqual(['held.err', 'held.jsonl.launcher.pid'])
			expect(scratch.read('tmp/units/held.err')).toBe('earlier\n')
		} finally {
			scratch.destroy()
		}
	})

	it('exits 75 on a missing handoff record and creates no journal', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-handoff-gone-' })
		try {
			const run = runSkillScript(
				LAUNCH_SCRIPT,
				['--handoff', `tmp/units/gone.jsonl${HANDOFF_SUFFIX}`],
				{
					cwd: scratch.path,
				},
			)
			expect(run.status).toBe(75)
			expect(run.stderr).toContain('cannot be read')
			expect(run.stderr).toContain('nothing ran')
			expect(scratch.names('')).toEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('exits 75 on a malformed record or a file that is no handoff record, keeps each, and runs nothing', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-handoff-bad-' })
		try {
			scratch.write(
				`tmp/units/bad.jsonl${HANDOFF_SUFFIX}`,
				JSON.stringify({ command: [process.execPath, '-v'] }),
			)
			const malformed = runSkillScript(
				LAUNCH_SCRIPT,
				['--handoff', `tmp/units/bad.jsonl${HANDOFF_SUFFIX}`],
				{ cwd: scratch.path },
			)
			expect(malformed.status).toBe(75)
			expect(malformed.stderr).toContain('is not a handoff record')
			expect(scratch.names('tmp/units')).toEqual([
				`bad.jsonl${HANDOFF_SUFFIX}`,
				`bad.jsonl${HANDOFF_SUFFIX}${REFUSED_SUFFIX}`,
			])
			expect(scratch.read(`tmp/units/bad.jsonl${HANDOFF_SUFFIX}${REFUSED_SUFFIX}`)).toMatch(
				/is not a handoff record[^\n]*\n$/u,
			)
			scratch.write('notes.txt', 'kept\n')
			const other = runSkillScript(LAUNCH_SCRIPT, ['--handoff', 'notes.txt'], {
				cwd: scratch.path,
			})
			expect(other.status).toBe(75)
			expect(other.stderr).toContain(`takes the <journal>${HANDOFF_SUFFIX} record`)
			expect(scratch.read('notes.txt')).toBe('kept\n')
			expect(scratch.has(`notes.txt${REFUSED_SUFFIX}`)).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('runs a handoff record in its working directory under its variables, deletes the record before the spawn, and writes the summary file', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-handoff-' })
		try {
			const work = scratch.ensure('work')
			const lead = scratch.ensure('lead')
			const record = join(scratch.path, 'tmp', 'units', `hand.jsonl${HANDOFF_SUFFIX}`)
			const code = `const fs=require('node:fs');process.stdout.write(JSON.stringify({marker:process.env.LAUNCH_MARKER??null,lead:(process.env.PATH??'').split(${JSON.stringify(delimiter)})[0],cwd:process.cwd(),ppid:process.ppid,record:fs.existsSync(${JSON.stringify(record)})}))`
			scratch.write(
				`tmp/units/hand.jsonl${HANDOFF_SUFFIX}`,
				JSON.stringify({
					command: [process.execPath, '-e', code],
					cwd: work,
					cap: 30,
					status: true,
					journal: join(scratch.path, 'tmp', 'units', 'hand.jsonl'),
					errors: join(scratch.path, 'tmp', 'units', 'hand.err'),
					variables: {
						PATH: `${lead}${delimiter}${process.env.PATH ?? ''}`,
						LAUNCH_MARKER: 'handed',
					},
				}),
			)
			const run = runSkillScript(LAUNCH_SCRIPT, ['--handoff', record], {
				cwd: scratch.path,
				env: { LAUNCH_MARKER: 'inherited' },
			})
			expect(run.status).toBe(0)
			const seen = parseJSON(scratch.read('tmp/units/hand.jsonl') ?? '')
			const ppid = isRecord(seen) ? seen.ppid : undefined
			expect(seen).toEqual({ marker: 'handed', lead, cwd: work, ppid, record: false })
			expect(typeof ppid).toBe('number')
			expect(scratch.read('tmp/units/hand.jsonl.launcher.pid')).toBe(`${String(ppid)}\n`)
			expect(scratch.has(`tmp/units/hand.jsonl${HANDOFF_SUFFIX}`)).toBe(false)
			expect(scratch.read('tmp/units/hand.err')).toMatch(
				/^\nexit=0 signal=none capped=false duration_ms=\d+\n$/u,
			)
			expect(scratch.read('tmp/units/hand.jsonl.pid')).toMatch(/^\d+\n$/u)
			expect(scratch.has('tmp/units/hand.jsonl.status-before.txt')).toBe(true)
			expect(scratch.has('tmp/units/hand.jsonl.status-after.txt')).toBe(true)
			const summary = parseJSON(scratch.read('tmp/units/hand.jsonl.summary.json') ?? '')
			expect(isRecord(summary) ? summary.exit : undefined).toBe(0)
			expect(run.json?.exit).toBe(0)
		} finally {
			scratch.destroy()
		}
	})

	it('parses the return value and the process id the detach command prints', () => {
		expect(parseCreation('0 11432\r\n')).toEqual({ code: 0, pid: 11432 })
		expect(parseCreation('\r\n9 \r\n')).toEqual({ code: 9, pid: undefined })
		expect(parseCreation('Access is denied.')).toBeUndefined()
		expect(parseCreation('')).toBeUndefined()
	})

	it('reads a confirmation from a complete pid file or the exit line, and waits for one on the directory', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-confirm-' })
		try {
			const units = scratch.ensure('units')
			const journal = join(units, 'wait.jsonl')
			const errors = join(units, 'wait.err')
			expect(readConfirmation(journal, errors)).toBeUndefined()
			writeFileSync(errors, 'warn\n')
			expect(readConfirmation(journal, errors)).toBeUndefined()
			writeFileSync(`${journal}.pid`, '12')
			expect(readPid(`${journal}.pid`)).toBeUndefined()
			expect(readConfirmation(journal, errors)).toBeUndefined()
			writeFileSync(errors, 'warn\n\nexit=127 signal=none capped=false duration_ms=3\n')
			expect(readConfirmation(journal, errors)).toEqual({ pid: undefined, refusal: undefined })
			writeFileSync(`${journal}.pid`, '4242\n')
			expect(readConfirmation(journal, errors)).toEqual({ pid: 4242, refusal: undefined })
			const refused = `${journal}${HANDOFF_SUFFIX}${REFUSED_SUFFIX}`
			writeFileSync(refused, 'the record is malformed')
			expect(readRefusal(refused)).toBeUndefined()
			writeFileSync(refused, 'the record is malformed\n')
			expect(readConfirmation(journal, errors)).toEqual({
				pid: undefined,
				refusal: 'the record is malformed',
			})
			expect(
				await waitForConfirmation(join(units, 'none.jsonl'), join(units, 'none.err'), 200),
			).toBeUndefined()
			const later = join(units, 'later.jsonl')
			const waited = waitForConfirmation(later, join(units, 'later.err'), 30_000)
			setTimeout(() => writeFileSync(`${later}.pid`, '777\n'), 50)
			expect(await waited).toEqual({ pid: 777, refusal: undefined })
			const declined = join(units, 'declined.jsonl')
			const refusal = waitForConfirmation(declined, join(units, 'declined.err'), 30_000)
			setTimeout(
				() => writeFileSync(`${declined}${HANDOFF_SUFFIX}${REFUSED_SUFFIX}`, 'declined\n'),
				50,
			)
			expect(await refusal).toEqual({ pid: undefined, refusal: 'declined' })
		} finally {
			await destroyScratch(scratch)
		}
	})

	it('guards a handoff record and refuses each member the record does not hold whole', () => {
		const valid = {
			command: [process.execPath, '-v'],
			cwd: WORKSPACE_ROOT,
			cap: 5,
			status: false,
			journal: join(WORKSPACE_ROOT, 'tmp', 'units', 'guard.jsonl'),
			errors: join(WORKSPACE_ROOT, 'tmp', 'units', 'guard.err'),
			variables: { PATH: 'lead', LAUNCH_MARKER: 'x' },
		}
		expect(isHandoff(valid)).toBe(true)
		expect(parseHandoff(JSON.stringify(valid))).toEqual(valid)
		expect(parseHandoff('not json')).toBeUndefined()
		expect(
			isHandoff(Object.fromEntries(Object.entries(valid).filter(([key]) => key !== 'variables'))),
		).toBe(false)
		for (const refused of [
			{ ...valid, extra: 1 },
			{ ...valid, command: [] },
			{ ...valid, command: [''] },
			{ ...valid, command: ['node', 3] },
			{ ...valid, cwd: 'relative' },
			{ ...valid, cap: 0 },
			{ ...valid, cap: MAX_CAP_SECONDS + 1 },
			{ ...valid, cap: Number.NaN },
			{ ...valid, status: 'yes' },
			{ ...valid, journal: 'relative.jsonl' },
			{ ...valid, errors: valid.journal },
			{ ...valid, variables: { PATH: 3 } },
			{ ...valid, variables: [] },
		]) {
			expect(isHandoff(refused)).toBe(false)
		}
		expect(
			isHandoff({
				...valid,
				get variables(): unknown {
					throw new Error('the read throws')
				},
			}),
		).toBe(false)
		expect(isHandoff(null)).toBe(false)
		expect(isHandoff([])).toBe(false)
		expect(isHandoff('record')).toBe(false)
		expect(isVariables({ PATH: 'lead' })).toBe(true)
		expect(isVariables({ '': 'x' })).toBe(false)
		expect(isVariables({ 'A=B': 'x' })).toBe(false)
		expect(isVariables(null)).toBe(false)
	})

	it('collects PATH and each set variable once by case-folded name, and merges by case-folded name', () => {
		expect(
			collectVariables(['A', 'a', 'B', 'GONE'], { PATH: 'lead', A: '1', a: '2', B: '3' }),
		).toEqual({ PATH: 'lead', A: '1', B: '3' })
		expect(collectVariables(['path'], { PATH: 'lead', path: 'other' })).toEqual({ PATH: 'lead' })
		expect(
			buildEnvironment(
				{ Path: 'old', KEEP: 'kept', orkestrel_lane: 'stale' },
				{ PATH: 'new', ORKESTREL_LANE: 'run' },
			),
		).toEqual({ KEEP: 'kept', PATH: 'new', ORKESTREL_LANE: 'run' })
	})

	it('writes the summary, then the status after, then the exit trailer last', () => {
		const recorder = createRecorder<[path: string, text: string, flag: 'w' | 'a']>()
		writeClosing(
			{ journal: 'j', errors: 'e', summary: 'S\n', status: 'T', trailer: '\nexit=0\n' },
			recorder.handler,
		)
		expect(recorder.calls).toEqual([
			['j.summary.json', 'S\n', 'w'],
			['j.status-after.txt', 'T', 'w'],
			['e', '\nexit=0\n', 'a'],
		])
		recorder.clear()
		writeClosing(
			{ journal: 'j', errors: 'e', summary: undefined, status: undefined, trailer: 'x' },
			recorder.handler,
		)
		expect(recorder.calls).toEqual([['e', 'x', 'a']])
	})

	it('compares the journal and errors paths as resolved paths, case-folded on Windows alone', () => {
		expect(matchesSameFile('j', './j', 'linux')).toBe(true)
		expect(matchesSameFile('J', 'j', 'linux')).toBe(false)
		expect(matchesSameFile('tmp/J.jsonl', 'tmp/j.jsonl', 'win32')).toBe(true)
		expect(matchesSameFile('tmp/a.jsonl', 'tmp/b.jsonl', 'win32')).toBe(false)
	})

	it('exits 64 on one file under two spellings in the attached form', () => {
		const scratch = createScratch({ prefix: 'orkestrel-launch-spelling-' })
		try {
			const run = runSkillScript(
				LAUNCH_SCRIPT,
				['--journal', './j', '--errors', 'j', '--cap', '5', '--', process.execPath, '-v'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(64)
			expect(run.stderr).toContain('--journal and --errors name the same file')
			expect(scratch.names('')).toEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('exits 64 on one file under two cases with --detach and without it', async (context) => {
		if (process.platform !== 'win32') {
			context.skip(
				'only a Windows file system folds names by case, so tmp/J.jsonl and tmp/j.jsonl name two files elsewhere',
			)
		}
		const scratch = createScratch({ prefix: 'orkestrel-launch-case-' })
		try {
			for (const detach of [[], ['--detach']]) {
				const run = runSkillScript(
					LAUNCH_SCRIPT,
					[
						...['--journal', 'tmp/J.jsonl', '--errors', 'tmp/j.jsonl', '--cap', '5'],
						...detach,
						...['--', process.execPath, '-v'],
					],
					{ cwd: scratch.path, env: { ORKESTREL_LANE: '' } },
				)
				expect(run.status).toBe(64)
				expect(run.stderr).toContain('--journal and --errors name the same file')
			}
			expect(scratch.names('')).toEqual([])
		} finally {
			await destroyScratch(scratch)
		}
	})

	it('ends a PowerShell call at its bound and reports that the bound ended it', (context) => {
		if (process.platform !== 'win32') {
			context.skip('powershell.exe is the Windows detach path, and no other host has it')
		}
		const result = runPowerShell('Start-Sleep -Seconds 5', {}, 200)
		expect(result.timedOut).toBe(true)
		expect(result.status).toBeNull()
	})

	it('reads the run record as a whole argument of a command line', () => {
		const record = 'C:\\runs\\work.jsonl.handoff.json'
		expect(matchesRecord(`"node.exe" "launch.ts" "--handoff" "${record}"`, record)).toBe(true)
		expect(matchesRecord(`node.exe launch.ts --handoff ${record}`, record)).toBe(true)
		expect(matchesRecord(record, record)).toBe(true)
		expect(matchesRecord(`"node.exe" "--handoff" "${record}.extra.handoff.json"`, record)).toBe(
			false,
		)
		expect(matchesRecord(`"node.exe" "--handoff" "D:${record}"`, record)).toBe(false)
		expect(
			matchesRecord('"node.exe" "--handoff" "C:\\runs\\workXjsonl.handoff.json"', record),
		).toBe(false)
	})

	it('kills a launcher only when its command line names the run record', async (context) => {
		if (process.platform !== 'win32') {
			context.skip('the check reads a command line through WMI, which Windows alone has')
		}
		const other = join(WORKSPACE_ROOT, 'tmp', 'units', `other.jsonl${HANDOFF_SUFFIX}`)
		const mine = join(WORKSPACE_ROOT, 'tmp', 'units', `mine.jsonl${HANDOFF_SUFFIX}`)
		const child = spawn(process.execPath, ['-e', 'setTimeout(() => {}, 30000)', other], {
			stdio: 'ignore',
			windowsHide: true,
		})
		const closed = waitForEvent<[number | null]>(
			(listener) => {
				child.on('close', listener)
			},
			'the stand-in launcher closes',
			{ budget: 45_000 },
		)
		try {
			const pid = child.pid ?? 0
			await waitForCondition(
				'the stand-in launcher names its record',
				() => (readCommandLine(pid, POWERSHELL_MS) ?? '').includes(other),
				{ budget: 15_000 },
			)
			expect(killLauncher(pid, mine, POWERSHELL_MS)).toBe(false)
			expect(readRunning(pid)).toBe(true)
			expect(killLauncher(process.pid, mine, POWERSHELL_MS)).toBe(false)
			expect(readRunning(process.pid)).toBe(true)
			expect(killLauncher(pid, other, POWERSHELL_MS)).toBe(true)
			await closed
		} finally {
			child.kill()
			await closed.catch(() => undefined)
		}
	}, 60_000)

	it('exits 75 with the next step when Win32_Process Create refuses a working directory that does not exist', (context) => {
		if (process.platform !== 'win32') {
			context.skip('runDetach exits 69 before it reaches WMI on a host other than Windows')
		}
		const scratch = createScratch({ prefix: 'orkestrel-launch-create-' })
		try {
			const entry = scratch.write(
				'detach.mjs',
				`import { runDetach } from ${JSON.stringify(pathToFileURL(join(WORKSPACE_ROOT, LAUNCH_SCRIPT)).href)}\nprocess.exitCode = await runDetach(JSON.parse(process.argv[2]), process.platform, Number(process.argv[3]))\n`,
			)
			const units = join(scratch.path, 'tmp', 'units')
			const handoff = {
				command: [process.execPath, '-v'],
				cwd: join(scratch.path, 'missing'),
				cap: 5,
				status: false,
				journal: join(units, 'create.jsonl'),
				errors: join(units, 'create.err'),
				variables: { PATH: process.env.PATH ?? '' },
			}
			const run = spawnSync(process.execPath, [entry, JSON.stringify(handoff), '30000'], {
				cwd: scratch.path,
				encoding: 'utf8',
				windowsHide: true,
			})
			expect(run.status).toBe(75)
			expect(run.stderr).toMatch(/ReturnValue \d+|PowerShell could not run/u)
			expect(run.stderr).toContain(
				'and rerun, or run the command attached and keep the session in its turn',
			)
			expect(scratch.names('tmp/units')).toEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('exits 75 with the next step when the confirmation wait ends, and kills the launcher it created', async (context) => {
		if (process.platform !== 'win32') {
			context.skip('runDetach exits 69 before it reaches WMI on a host other than Windows')
		}
		const scratch = createScratch({ prefix: 'orkestrel-launch-late-' })
		const units = join(scratch.path, 'tmp', 'units')
		try {
			const entry = scratch.write(
				'detach.mjs',
				`import { runDetach } from ${JSON.stringify(pathToFileURL(join(WORKSPACE_ROOT, LAUNCH_SCRIPT)).href)}\nprocess.exitCode = await runDetach(JSON.parse(process.argv[2]), process.platform, Number(process.argv[3]))\n`,
			)
			const handoff = {
				command: [process.execPath, '-e', 'setTimeout(() => {}, 60000)'],
				cwd: scratch.path,
				cap: 60,
				status: false,
				journal: join(units, 'late.jsonl'),
				errors: join(units, 'late.err'),
				variables: { PATH: process.env.PATH ?? '' },
			}
			const run = spawnSync(process.execPath, [entry, JSON.stringify(handoff), '1'], {
				cwd: scratch.path,
				encoding: 'utf8',
				windowsHide: true,
			})
			expect(run.status).toBe(75)
			expect(run.stderr).toContain('within 1 ms; its tree was killed')
			expect(run.stderr).toContain(`late.jsonl.launcher.pid`)
			expect(run.stderr).toContain('then rerun')
			const launcher = Number(/the detached launcher (\d+)/u.exec(run.stderr)?.[1])
			await waitForCondition('the timed-out launcher ends', () => !readRunning(launcher), {
				budget: 15_000,
			})
			expect(existsSync(join(units, `late.jsonl${HANDOFF_SUFFIX}`))).toBe(false)
		} finally {
			for (const name of ['late.jsonl.pid', 'late.jsonl.launcher.pid']) {
				const pid = readPid(join(units, name))
				if (pid !== undefined && readRunning(pid)) forceKillTree(pid)
			}
			await destroyScratch(scratch)
		}
	}, 60_000)

	it('reports the launcher refusal of a malformed record at once and removes the refusal file', async (context) => {
		if (process.platform !== 'win32') {
			context.skip('runDetach exits 69 before it reaches WMI on a host other than Windows')
		}
		const scratch = createScratch({ prefix: 'orkestrel-launch-refused-' })
		const units = join(scratch.path, 'tmp', 'units')
		try {
			const entry = scratch.write(
				'detach.mjs',
				`import { runDetach } from ${JSON.stringify(pathToFileURL(join(WORKSPACE_ROOT, LAUNCH_SCRIPT)).href)}\nprocess.exitCode = await runDetach(JSON.parse(process.argv[2]), process.platform, Number(process.argv[3]))\n`,
			)
			const handoff = {
				command: [process.execPath, '-v'],
				cwd: scratch.path,
				cap: 0,
				status: false,
				journal: join(units, 'declined.jsonl'),
				errors: join(units, 'declined.err'),
				variables: { PATH: process.env.PATH ?? '' },
			}
			const run = spawnSync(process.execPath, [entry, JSON.stringify(handoff), '15000'], {
				cwd: scratch.path,
				encoding: 'utf8',
				windowsHide: true,
			})
			expect(run.status).toBe(75)
			expect(run.stderr).toContain('refused the handoff and ran nothing')
			expect(run.stderr).toContain('is not a handoff record')
			expect(scratch.names('tmp/units')).toEqual([])
		} finally {
			await destroyScratch(scratch)
		}
	}, 60_000)

	it('exits 75 and writes its refusal when the record cannot be deleted, and creates no journal', (context) => {
		if (process.platform !== 'win32') {
			context.skip('the deny-delete entries this case sets are Windows access-control entries')
		}
		const scratch = createScratch({ prefix: 'orkestrel-launch-undeletable-' })
		const held = scratch.ensure('held')
		const record = join(held, `x.jsonl${HANDOFF_SUFFIX}`)
		try {
			scratch.write(
				`held/x.jsonl${HANDOFF_SUFFIX}`,
				JSON.stringify({
					command: [process.execPath, '-v'],
					cwd: scratch.path,
					cap: 5,
					status: false,
					journal: join(held, 'x.jsonl'),
					errors: join(held, 'x.err'),
					variables: { PATH: 'lead' },
				}),
			)
			expect(
				spawnSync('icacls', [record, '/deny', '*S-1-1-0:(DE)'], { windowsHide: true }).status,
			).toBe(0)
			expect(
				spawnSync('icacls', [held, '/deny', '*S-1-1-0:(DC)'], { windowsHide: true }).status,
			).toBe(0)
			const run = runSkillScript(LAUNCH_SCRIPT, ['--handoff', record], { cwd: scratch.path })
			expect(run.status).toBe(75)
			expect(run.stderr).toContain('cannot be deleted')
			expect(scratch.has('held/x.jsonl')).toBe(false)
			expect(scratch.has(`held/x.jsonl${HANDOFF_SUFFIX}`)).toBe(true)
			expect(scratch.read(`held/x.jsonl${HANDOFF_SUFFIX}${REFUSED_SUFFIX}`)).toMatch(
				/cannot be deleted[^\n]*\n$/u,
			)
		} finally {
			spawnSync('icacls', [held, '/remove:d', '*S-1-1-0'], { windowsHide: true })
			spawnSync('icacls', [record, '/remove:d', '*S-1-1-0'], { windowsHide: true })
			scratch.destroy()
		}
	})

	it('detaches a run that outlives the caller tree with its cwd, PATH lead, and named variable, and records exit= when stopped through its pid file', async (context) => {
		if (process.platform !== 'win32') {
			context.skip(
				'--detach exits 69 off Windows: WMI Win32_Process Create is the one detach procedure a platform page records',
			)
		}
		const scratch = createScratch({ prefix: 'orkestrel-launch-detach-' })
		const teardown = createTeardown()
		teardown.add(() => destroyScratch(scratch))
		const sockets: Socket[] = []
		const observations: string[] = []
		const server = createServer((socket) => {
			sockets.push(socket)
			socket.setEncoding('utf8')
			socket.on('data', (chunk: string) => {
				observations.push(chunk)
			})
			socket.on('error', () => undefined)
		})
		teardown.add(
			() =>
				new Promise<void>((resolve) => {
					for (const socket of sockets) socket.destroy()
					server.close(() => resolve())
				}),
		)
		const work = scratch.ensure('work')
		const lead = scratch.ensure('lead')
		const units = join(work, 'tmp', 'units')
		teardown.add(async () => {
			for (const name of ['first', 'second']) {
				const launcher = readPid(join(units, `${name}.jsonl.launcher.pid`))
				if (launcher === undefined) continue
				if (readRunning(launcher)) forceKillTree(launcher)
				await waitForCondition(`the ${name} launcher ends`, () => !readRunning(launcher), {
					budget: 15_000,
				})
			}
		})
		try {
			await new Promise<void>((resolve) => {
				server.listen(0, '127.0.0.1', () => resolve())
			})
			const address = server.address()
			const port = typeof address === 'object' && address !== null ? address.port : 0
			const fixture = `const s=require('node:net').connect(${String(port)},'127.0.0.1',()=>s.write(JSON.stringify({marker:process.env.LAUNCH_MARKER??null,lead:(process.env.PATH??'').split(';')[0],cwd:process.cwd()})+'\\n'));s.on('data',()=>process.exit(0));s.on('error',()=>process.exit(3))`
			const parent = spawn(
				process.execPath,
				[
					'-e',
					"const c=require('node:child_process').spawn(process.execPath,process.argv.slice(1),{stdio:['ignore','inherit','inherit'],windowsHide:true});process.stdout.write(JSON.stringify({caller:c.pid})+'\\n')",
					join(WORKSPACE_ROOT, LAUNCH_SCRIPT),
					...['--journal', 'tmp/units/first.jsonl', '--errors', 'tmp/units/first.err'],
					...['--cap', '60', '--detach', '--env', 'LAUNCH_MARKER'],
					...['--', process.execPath, '-e', fixture],
				],
				{
					cwd: work,
					env: buildTestEnvironment({
						ORKESTREL_LANE: '',
						LAUNCH_MARKER: 'seen',
						PATH: `${lead};${process.env.PATH ?? ''}`,
					}),
					stdio: ['ignore', 'pipe', 'pipe'],
					windowsHide: true,
				},
			)
			const output: string[] = []
			for (const stream of [parent.stdout, parent.stderr]) {
				stream.setEncoding('utf8')
				stream.on('data', (chunk: string) => {
					output.push(chunk)
				})
			}
			const closed = waitForEvent<[number | null]>(
				(listener) => {
					parent.on('close', listener)
				},
				'the parent of the caller closes',
				{ budget: 60_000 },
			)
			await waitForCondition(
				'the caller prints its spawn line',
				() => output.join('').includes('"launcher"'),
				{ budget: 45_000 },
			)
			forceKillTree(parent.pid ?? 0)
			await closed
			const lines = output
				.join('')
				.split(/\r\n|\n/u)
				.filter((line) => line.startsWith('{'))
				.map((line) => parseJSON(line))
			const callerLine = lines.find((line) => isRecord(line) && 'caller' in line)
			const spawned = lines.find((line) => isRecord(line) && 'launcher' in line)
			const caller = isRecord(callerLine) ? callerLine.caller : undefined
			const launcher = isRecord(spawned) ? spawned.launcher : undefined
			const command = isRecord(spawned) ? spawned.pid : undefined
			expect(typeof caller).toBe('number')
			expect(typeof launcher).toBe('number')
			expect(typeof command).toBe('number')
			if (typeof launcher !== 'number') return
			expect(spawned).toEqual({
				launcher,
				pid: command,
				journal: join(units, 'first.jsonl'),
				errors: join(units, 'first.err'),
			})
			expect(readPid(join(units, 'first.jsonl.launcher.pid'))).toBe(launcher)
			expect(readRunning(launcher)).toBe(true)
			const query = spawnSync(
				'powershell.exe',
				[
					'-NoProfile',
					'-NonInteractive',
					'-Command',
					`(Get-CimInstance Win32_Process -Filter 'ProcessId=${String(launcher)}').ParentProcessId`,
				],
				{ encoding: 'utf8', windowsHide: true },
			)
			expect(query.status).toBe(0)
			const launcherParent = Number(query.stdout.trim())
			expect(launcherParent).toBeGreaterThan(0)
			expect(launcherParent).not.toBe(caller)
			expect(launcherParent).not.toBe(parent.pid)
			await waitForCondition(
				'the detached command reports what it sees',
				() => observations.join('').includes('\n'),
				{ budget: 30_000 },
			)
			expect(parseJSON(observations.join('').trim())).toEqual({ marker: 'seen', lead, cwd: work })
			for (const socket of sockets) socket.write('go')
			await waitForCondition(
				'the detached launcher records exit=0',
				() =>
					/\nexit=0 signal=none capped=false duration_ms=\d+\n$/u.test(
						scratch.read('work/tmp/units/first.err') ?? '',
					),
				{ budget: 30_000 },
			)
			expect(existsSync(join(units, `first.jsonl${HANDOFF_SUFFIX}`))).toBe(false)
			const summary = parseJSON(scratch.read('work/tmp/units/first.jsonl.summary.json') ?? '')
			expect(isRecord(summary) ? summary.exit : undefined).toBe(0)
			const second = runSkillScript(
				LAUNCH_SCRIPT,
				[
					...['--journal', 'tmp/units/second.jsonl', '--errors', 'tmp/units/second.err'],
					...[
						'--cap',
						'60',
						'--detach',
						'--',
						process.execPath,
						'-e',
						'setTimeout(() => {}, 60000)',
					],
				],
				{ cwd: work, env: { ORKESTREL_LANE: '' } },
			)
			expect(second.status).toBe(0)
			const stopped = readPid(join(units, 'second.jsonl.pid'))
			expect(typeof stopped).toBe('number')
			if (stopped === undefined) return
			expect(second.json?.pid).toBe(stopped)
			forceKillTree(stopped)
			await waitForCondition(
				'the second launcher records exit=',
				() =>
					/\nexit=\S+ signal=\S+ capped=false duration_ms=\d+\n$/u.test(
						scratch.read('work/tmp/units/second.err') ?? '',
					),
				{ budget: 30_000 },
			)
		} finally {
			await teardown.destroy()
		}
	}, 120_000)
})

describe('the parseArgs refusals', () => {
	it('names the flag parseArgs refuses through the source, a linked directory, and the built twin, and leaves the directory untouched', () => {
		expect(runFlagRefusals(LAUNCH_SCRIPT, OPTIONS)).toStrictEqual([])
	})
})
