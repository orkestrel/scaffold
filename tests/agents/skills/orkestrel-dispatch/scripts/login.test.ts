import { spawn } from 'node:child_process'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createRecorder, waitForCondition, waitForEvent } from '@orkestrel/test'
import { createScratch } from '@orkestrel/test/server'
import { isProcessRunning, runSkillScript, LOGIN_SCRIPT } from '../../../../setupServer.js'
import {
	CODE_PATTERN,
	loginClaude,
	loginCodex,
	parseCap,
	pollLogin,
	readLoginStatus,
	readMissingFlags,
	readOption,
	readUnknownFlags,
	terminateTree,
	URL_PATTERN,
	waitFor,
} from '../../../../../.agents/skills/orkestrel-dispatch/scripts/login.ts'
import type { Flow } from '../../../../../.agents/skills/orkestrel-dispatch/scripts/login.ts'

// A Node program run with `-e` stands in for the Codex CLI: the `--` after the program keeps the
// arguments that follow from reaching Node as its own options, and the program reads them from
// `process.argv.slice(1)`. `login status` exits 0 once the marker file exists. `login --device-auth`
// records its own pid, prints a verification URL and a one-time code, writes the marker half a
// second later when its last argument is `complete` (so a poll reads the journal first), and stays
// alive until something ends it.
const DEVICE_PROGRAM = `const fs = require('node:fs'); const [command, flag, marker, pidFile, completes] = process.argv.slice(1); if (command === 'login' && flag === 'status') { if (fs.existsSync(marker)) { process.stdout.write('Logged in using the fixture\\n') } else { process.stderr.write('Not logged in\\n'); process.exitCode = 1 } } else if (command === 'login' && flag === '--device-auth') { fs.writeFileSync(pidFile, String(process.pid)); process.stdout.write('Open https://example.test/device and enter the code ABCD-12345\\n'); if (completes === 'complete') { setTimeout(() => { fs.writeFileSync(marker, '') }, 500) } setInterval(() => {}, 1000) } else { process.exitCode = 2 }`

/**
 * Builds the flow that points the Codex login at the stand-in program.
 *
 * @param directory - The scratch directory that holds the marker, the pid file, and the journal.
 * @param completes - If true, the device-auth program writes the marker; if false, it never does.
 */
function buildFlow(directory: string, completes: boolean): Flow {
	const marker = join(directory, 'logged-in.marker')
	const pidFile = join(directory, 'device.pid')
	return {
		status: {
			command: process.execPath,
			args: ['-e', DEVICE_PROGRAM, '--', 'login', 'status', marker],
		},
		device: {
			command: process.execPath,
			args: [
				'-e',
				DEVICE_PROGRAM,
				'--',
				'login',
				'--device-auth',
				marker,
				pidFile,
				completes ? 'complete' : 'never',
			],
		},
		journal: join(directory, 'tmp', 'codex', 'login.log'),
		intervalMs: 50,
	}
}

describe('login.ts', () => {
	it('refuses a call that names no bench, two benches, or a cap with no value', () => {
		expect(runSkillScript(LOGIN_SCRIPT, []).status).toBe(64)
		expect(runSkillScript(LOGIN_SCRIPT, ['--codex', '--claude']).status).toBe(64)
		expect(runSkillScript(LOGIN_SCRIPT, ['--codex', '--cap']).status).toBe(64)
	})

	it('refuses an unknown flag and the equals form before it starts anything', () => {
		const dark = { PATH: '', Path: '' }
		const unknown = runSkillScript(LOGIN_SCRIPT, ['--claude', '--bogus'], { env: dark })
		expect(unknown.status).toBe(64)
		expect(unknown.stderr).toContain('--bogus')
		expect(unknown.stdout).toBe('')
		const equals = runSkillScript(LOGIN_SCRIPT, ['--codex', '--cap=5'], { env: dark })
		expect(equals.status).toBe(64)
		expect(equals.stderr).toContain('--cap=5')
		expect(equals.stdout).toBe('')
	})

	it('refuses a cap that is not a number of seconds above 0 before any spawn', () => {
		const scratch = createScratch({ prefix: 'orkestrel-login-cap-' })
		try {
			const dark = { PATH: '', Path: '' }
			for (const cap of ['abc', '0', '-5', '', 'Infinity']) {
				const run = runSkillScript(LOGIN_SCRIPT, ['--codex', '--cap', cap], {
					cwd: scratch.path,
					env: dark,
				})
				expect({ cap, status: run.status }).toEqual({ cap, status: 64 })
				expect(run.stderr).toContain('--cap takes a number of seconds above 0')
				expect(run.stdout).toBe('')
			}
			expect(scratch.has('tmp')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('reports a Claude CLI that cannot start as dark with the reason', () => {
		const run = runSkillScript(LOGIN_SCRIPT, ['--claude'], { env: { PATH: '', Path: '' } })
		expect(run.status).toBe(3)
		expect(run.json).toMatchObject({ bench: 'claude', live: false })
		expect(typeof run.json?.status).toBe('string')
		expect(String(run.json?.status)).not.toContain('undefined')
	})

	it('reports a Codex CLI that cannot start as dark and starts no login', () => {
		const scratch = createScratch({ prefix: 'orkestrel-login-codex-absent-' })
		try {
			const run = runSkillScript(LOGIN_SCRIPT, ['--codex', '--cap', '1'], {
				cwd: scratch.path,
				env: { PATH: '', Path: '' },
			})
			expect(run.status).toBe(3)
			expect(run.json).toMatchObject({ bench: 'codex', live: false })
			expect(String(run.json?.status)).toContain('codex could not start')
			expect(scratch.has('tmp/codex/login.log')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})
})

describe('the Claude login', () => {
	it('reads live from a status command that exits 0 and prints its text', () => {
		const outcome = loginClaude({
			command: process.execPath,
			args: ['-e', 'process.stdout.write(\'{"loggedIn":true}\\n\')'],
		})
		expect(outcome).toEqual({
			report: { bench: 'claude', live: true, status: '{"loggedIn":true}' },
			exit: 0,
		})
	})

	it('reads dark from a status command that exits non-zero', () => {
		const outcome = loginClaude({
			command: process.execPath,
			args: ['-e', "process.stderr.write('Not logged in'); process.exitCode = 1"],
		})
		expect(outcome).toEqual({
			report: { bench: 'claude', live: false, status: 'Not logged in' },
			exit: 3,
		})
	})
})

describe('the Codex login', () => {
	it('answers at once and starts no login when the Codex status already reports one', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-login-codex-live-' })
		try {
			scratch.write('logged-in.marker', '')
			const lines: string[] = []
			const outcome = await loginCodex(60, buildFlow(scratch.path, true), (line) => {
				lines.push(line)
			})
			expect(outcome.exit).toBe(0)
			expect(outcome.report).toMatchObject({ bench: 'codex', live: true })
			expect(String(outcome.report.status)).toContain('Logged in using the fixture')
			expect(lines).toEqual([])
			expect(scratch.has('tmp/codex/login.log')).toBe(false)
			expect(scratch.has('device.pid')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('reports a Codex that cannot start as dark and starts no login', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-login-codex-absent-' })
		try {
			const flow: Flow = {
				...buildFlow(scratch.path, true),
				status: { command: 'this-command-does-not-exist-anywhere', args: [] },
			}
			const lines: string[] = []
			const outcome = await loginCodex(60, flow, (line) => {
				lines.push(line)
			})
			expect(lines).toEqual([])
			expect(outcome.exit).toBe(3)
			expect(outcome.report).toMatchObject({ bench: 'codex', live: false })
			expect(String(outcome.report.status)).toContain('could not start')
			expect(scratch.has('tmp/codex/login.log')).toBe(false)
			expect(scratch.has('device.pid')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('echoes the device-auth URL and code, polls until the status answers, and ends the login child', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-login-codex-' })
		try {
			const lines: string[] = []
			const outcome = await loginCodex(60, buildFlow(scratch.path, true), (line) => {
				lines.push(line)
			})
			expect(outcome.exit).toBe(0)
			expect(outcome.report).toMatchObject({
				bench: 'codex',
				live: true,
				url: 'https://example.test/device',
				code: 'ABCD-12345',
			})
			expect(outcome.report.journal).toBe(join(scratch.path, 'tmp', 'codex', 'login.log'))
			expect(String(outcome.report.status)).toContain('Logged in using the fixture')
			expect(lines).toEqual([
				'login: open https://example.test/device',
				'login: enter the code ABCD-12345',
			])
			expect(scratch.read('tmp/codex/login.log')).toContain('ABCD-12345')
			const pid = Number(scratch.read('device.pid'))
			expect(Number.isInteger(pid)).toBe(true)
			await waitForCondition('the device-auth child is gone', () => !isProcessRunning(pid), {
				budget: 15_000,
			})
		} finally {
			scratch.destroy()
		}
	})

	it('ends the poll at the cap with live false, still echoing the URL and code, and ends the login child', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-login-codex-cap-' })
		try {
			const lines: string[] = []
			const outcome = await loginCodex(3, buildFlow(scratch.path, false), (line) => {
				lines.push(line)
			})
			expect(outcome.exit).toBe(3)
			expect(outcome.report).toMatchObject({
				bench: 'codex',
				live: false,
				url: 'https://example.test/device',
				code: 'ABCD-12345',
			})
			expect(lines).toContain('login: enter the code ABCD-12345')
			const pid = Number(scratch.read('device.pid'))
			await waitForCondition('the device-auth child is gone', () => !isProcessRunning(pid), {
				budget: 15_000,
			})
		} finally {
			scratch.destroy()
		}
	}, 60_000)
})

describe('the cap reader', () => {
	it('defaults an absent cap and accepts a finite number of seconds above 0', () => {
		expect(parseCap(undefined)).toBe(600)
		expect(parseCap('1')).toBe(1)
		expect(parseCap('0.5')).toBe(0.5)
		expect(parseCap('1000000')).toBe(1_000_000)
	})

	it('refuses zero, a negative, a non-number, a blank, and an infinity', () => {
		for (const text of ['0', '-1', 'abc', '', ' ', 'Infinity', 'NaN']) {
			expect({ text, cap: parseCap(text) }).toEqual({ text, cap: undefined })
		}
	})
})

describe('the login patterns', () => {
	it('reads the verification URL up to a space or a quote, and nothing from text without one', () => {
		expect('Open https://example.test/device?x=1 now'.match(URL_PATTERN)?.[0]).toBe(
			'https://example.test/device?x=1',
		)
		expect('visit "https://a.test/b" today'.match(URL_PATTERN)?.[0]).toBe('https://a.test/b')
		expect('http://localhost:1455/auth'.match(URL_PATTERN)?.[0]).toBe('http://localhost:1455/auth')
		expect('no link here'.match(URL_PATTERN)).toBeNull()
	})

	it('reads a one-time code of two blocks of four or five capitals and digits', () => {
		expect('enter ABCD-12345 now'.match(CODE_PATTERN)?.[1]).toBe('ABCD-12345')
		expect('code 1A2B-3C4D.'.match(CODE_PATTERN)?.[1]).toBe('1A2B-3C4D')
		expect('AB-123'.match(CODE_PATTERN)).toBeNull()
		expect('abcd-1234'.match(CODE_PATTERN)).toBeNull()
		expect('ABCDEF-1234'.match(CODE_PATTERN)).toBeNull()
	})
})

describe('the status reader and the poll', () => {
	it('reads live from a zero exit, dark from a non-zero exit, and the reason from a command that cannot start', () => {
		const live = readLoginStatus(process.execPath, ['-e', 'process.stdout.write("ok\\n")'])
		expect(live).toEqual({ started: true, live: true, text: 'ok' })
		const dark = readLoginStatus(process.execPath, [
			'-e',
			'process.stderr.write("nope"); process.exit(1)',
		])
		expect(dark).toEqual({ started: true, live: false, text: 'nope' })
		const absent = readLoginStatus('this-command-does-not-exist-anywhere', [])
		expect(absent.started).toBe(false)
		expect(absent.live).toBe(false)
		expect(absent.text).toContain('this-command-does-not-exist-anywhere could not start')
	})

	it('waits the given milliseconds and resolves', async () => {
		const before = Date.now()
		await waitFor(20)
		expect(Date.now() - before).toBeGreaterThanOrEqual(15)
	})

	it('ends the process tree and tolerates a process that is already gone', async () => {
		const child = spawn(process.execPath, ['-e', 'setTimeout(() => {}, 20000)'], {
			stdio: 'ignore',
			windowsHide: true,
		})
		const closed = waitForEvent<[number | null]>(
			(listener) => {
				child.on('close', listener)
			},
			'the process closes after it is ended',
			{ budget: 30_000 },
		)
		const pid = child.pid
		expect(typeof pid).toBe('number')
		if (pid === undefined) return
		terminateTree(pid)
		await closed
		expect(() => {
			terminateTree(pid)
		}).not.toThrow()
	})

	it('returns the URL and code it was given, not live, once the cap has already passed', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-login-poll-' })
		try {
			const flow = buildFlow(scratch.path, true)
			const announced = createRecorder<[line: string]>()
			const poll = await pollLogin(
				Date.now() - 10_000,
				1,
				flow,
				announced.handler,
				'https://u.test',
				'ABCD-1234',
			)
			expect(poll).toEqual({ url: 'https://u.test', code: 'ABCD-1234', live: false })
			expect(await pollLogin(Date.now() - 10_000, 1, flow, announced.handler)).toEqual({
				url: undefined,
				code: undefined,
				live: false,
			})
			expect(announced.calls).toEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('announces the URL and the code once each, and keeps polling while the status is dark', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-login-poll-journal-' })
		try {
			const flow = buildFlow(scratch.path, false)
			scratch.write(
				'tmp/codex/login.log',
				'Open https://example.test/device and enter the code ABCD-12345\n',
			)
			const lines: string[] = []
			const poll = await pollLogin(Date.now(), 0.3, flow, (line) => {
				lines.push(line)
			})
			expect(poll).toEqual({ url: 'https://example.test/device', code: 'ABCD-12345', live: false })
			expect(lines).toEqual([
				'login: open https://example.test/device',
				'login: enter the code ABCD-12345',
			])
		} finally {
			scratch.destroy()
		}
	})
})

describe('the argument readers', () => {
	it('reads a flag value and treats a following flag as a missing value, keeping the first occurrence', () => {
		const argv = ['--codex', '--cap', '5']
		expect(readOption(argv, '--cap')).toBe('5')
		expect(readOption(argv, '--absent')).toBeUndefined()
		expect(readOption(['--cap', '--codex'], '--cap')).toBeUndefined()
		expect(readOption(['--x', '1', '--x', '2'], '--x')).toBe('1')
		expect(readMissingFlags(['--codex', '--cap'], ['--cap'])).toEqual(['--cap'])
		expect(readMissingFlags(argv, ['--cap'])).toEqual([])
	})

	it('names an unread flag and the equals form, and stops at the command separator', () => {
		expect(
			readUnknownFlags(['--codex', '--cap=5', '--bogus'], ['--codex', '--cap', '--claude']),
		).toEqual(['--cap=5', '--bogus'])
		expect(readUnknownFlags(['--cap', '5', '--', '--watch'], ['--cap'])).toEqual([])
		expect(readUnknownFlags([], [])).toEqual([])
	})
})
