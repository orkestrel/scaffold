import { describe, expect, it } from 'vitest'
import { isString } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import { runSkillScript, BENCH_SCRIPT } from '../../../../setupServer.js'
import {
	DEFAULT_CAP,
	MAX_CAP_SECONDS,
	isLive,
	parseCap,
	parseJsonLine,
	probeClaude,
	probeCodex,
	quote,
	readMissingFlags,
	readNumber,
	readOption,
	readString,
	readUnknownFlags,
	readVersion,
	runRoundTrip,
	SANDBOX_MODES,
} from '../../../../../.agents/skills/orkestrel-dispatch/scripts/bench.ts'

describe('bench.ts', () => {
	it('refuses a call that names no bench or gives a flag with no value', () => {
		expect(runSkillScript(BENCH_SCRIPT, []).status).toBe(64)
		expect(runSkillScript(BENCH_SCRIPT, ['--cursor', '--resolve', '--cap']).status).toBe(64)
		expect(runSkillScript(BENCH_SCRIPT, ['--codex', '--model']).status).toBe(64)
	})

	it('refuses an unknown flag, the equals form, and two benches before any probe runs', () => {
		const dark = { PATH: '', Path: '' }
		const unknown = runSkillScript(BENCH_SCRIPT, ['--claude', '--bogus'], { env: dark })
		expect(unknown.status).toBe(64)
		expect(unknown.stderr).toContain('--bogus')
		expect(unknown.stdout).toBe('')
		const equals = runSkillScript(BENCH_SCRIPT, ['--claude', '--model=opus'], { env: dark })
		expect(equals.status).toBe(64)
		expect(equals.stderr).toContain('--model=opus')
		expect(equals.stdout).toBe('')
		const two = runSkillScript(BENCH_SCRIPT, ['--claude', '--codex'], { env: dark })
		expect(two.status).toBe(64)
		expect(two.stdout).toBe('')
	})

	it('refuses a cap that is not a number of seconds above 0 as a usage fault, not as a dark bench', () => {
		const dark = { PATH: '', Path: '' }
		for (const cap of ['abc', '0', '-5', '', 'Infinity', String(MAX_CAP_SECONDS + 1)]) {
			const run = runSkillScript(BENCH_SCRIPT, ['--claude', '--cap', cap], { env: dark })
			expect({ cap, status: run.status }).toEqual({ cap, status: 64 })
			expect(run.stderr).toContain('--cap takes a number of seconds')
			expect(run.stdout).toBe('')
		}
		expect(runSkillScript(BENCH_SCRIPT, ['--claude', '--cap', '5'], { env: dark }).status).toBe(3)
	})

	it('refuses a sandbox outside the three modes and --resolve without --cursor as usage faults', () => {
		const dark = { PATH: '', Path: '' }
		for (const sandbox of ['sudo', 'READ-ONLY', 'workspace', '']) {
			const run = runSkillScript(BENCH_SCRIPT, ['--codex', '--sandbox', sandbox], { env: dark })
			expect({ sandbox, status: run.status }).toEqual({ sandbox, status: 64 })
			expect(run.stderr).toContain('--sandbox takes one of read-only, workspace-write')
			expect(run.stdout).toBe('')
		}
		for (const sandbox of SANDBOX_MODES) {
			const run = runSkillScript(BENCH_SCRIPT, ['--codex', '--sandbox', sandbox], { env: dark })
			expect({ sandbox, status: run.status }).toEqual({ sandbox, status: 3 })
		}
		for (const bench of ['--codex', '--claude']) {
			const run = runSkillScript(BENCH_SCRIPT, [bench, '--resolve'], { env: dark })
			expect({ bench, status: run.status }).toEqual({ bench, status: 64 })
			expect(run.stderr).toContain('--resolve belongs to --cursor')
			expect(run.stdout).toBe('')
		}
	})

	it('reports a Claude CLI that cannot start as a dark bench', () => {
		const run = runSkillScript(BENCH_SCRIPT, ['--claude'], { env: { PATH: '', Path: '' } })
		expect(run.status).toBe(3)
		expect(run.json).toMatchObject({ bench: 'claude', live: false })
		expect(run.json?.session).toBeUndefined()
	})

	it('reports a Codex CLI that cannot start as a dark bench', () => {
		const run = runSkillScript(BENCH_SCRIPT, ['--codex'], { env: { PATH: '', Path: '' } })
		expect(run.status).toBe(3)
		expect(run.json).toMatchObject({ bench: 'codex', live: false })
		expect(run.json?.session).toBeUndefined()
	})

	// The Cursor entry is read from LOCALAPPDATA inside the script's win32 branch alone, so the
	// resolution refusals are observable only where that branch runs.
	it.runIf(process.platform === 'win32')(
		'reports a missing or malformed versioned Cursor install as dark',
		() => {
			const scratch = createScratch({ prefix: 'orkestrel-bench-' })
			try {
				const absent = runSkillScript(BENCH_SCRIPT, ['--cursor', '--resolve'], {
					cwd: scratch.path,
					env: { LOCALAPPDATA: scratch.path },
				})
				expect(absent.status).toBe(3)
				expect(absent.json?.live).toBe(false)
				expect(
					isString(absent.json?.error) && absent.json.error.includes('is not a directory'),
				).toBe(true)
				scratch.write('cursor-agent/versions', 'not a directory')
				const file = runSkillScript(BENCH_SCRIPT, ['--cursor', '--resolve'], {
					cwd: scratch.path,
					env: { LOCALAPPDATA: scratch.path },
				})
				expect(file.status).toBe(3)
				expect(isString(file.json?.error) && file.json.error.includes('is not a directory')).toBe(
					true,
				)
				scratch.remove('cursor-agent/versions')
				scratch.ensure('cursor-agent/versions/2026.01.01-abcdef0')
				const bare = runSkillScript(BENCH_SCRIPT, ['--cursor', '--resolve'], {
					cwd: scratch.path,
					env: { LOCALAPPDATA: scratch.path },
				})
				expect(bare.status).toBe(3)
				expect(
					isString(bare.json?.error) && bare.json.error.includes('lacks node.exe or index.js'),
				).toBe(true)
				scratch.write('cursor-agent/versions/2026.01.01-abcdef0/node.exe', '')
				scratch.write('cursor-agent/versions/2026.01.01-abcdef0/index.js', '')
				const mute = runSkillScript(BENCH_SCRIPT, ['--cursor', '--resolve'], {
					cwd: scratch.path,
					env: { LOCALAPPDATA: scratch.path },
				})
				expect(mute.status).toBe(3)
				expect(mute.json?.live).toBe(false)
			} finally {
				scratch.destroy()
			}
		},
	)
})

// A Node program run with `-e` stands in for the CLI: the `--` after the program keeps the CLI
// arguments the probe appends (`-p`, `--json`) from reaching Node as its own options, and the
// program reads them from `process.argv.slice(1)`.
describe('the Claude probe', () => {
	it.each([
		{ answer: 'READY', argv: [], model: 'opus', exit: 0, live: true },
		{
			answer: 'I cannot help with that.',
			argv: ['--model', 'sonnet'],
			model: 'sonnet',
			exit: 3,
			live: false,
		},
	])(
		'reports live $live for a CLI that streams the answer $answer through launch and result',
		({ answer, argv, model, exit, live }) => {
			const scratch = createScratch({ prefix: 'orkestrel-bench-claude-' })
			try {
				const program = `if (process.argv[1] === '--version') { process.stdout.write('9.9.9 (fixture)\\n') } else { process.stdout.write(JSON.stringify({ type: 'system', subtype: 'init', session_id: 'fixture-session' }) + '\\n'); process.stdout.write(JSON.stringify({ type: 'result', result: ${JSON.stringify(answer)}, duration_ms: 7 }) + '\\n') }`
				const probe = probeClaude([process.execPath, '-e', program, '--'], argv, 60, scratch.path)
				expect(probe.exit).toBe(exit)
				expect(probe.report).toMatchObject({
					bench: 'claude',
					version: '9.9.9 (fixture)',
					model,
					session: 'fixture-session',
					answer,
					exit: 0,
					capped: false,
					live,
					journal: 'tmp/claude/bench.jsonl',
				})
				expect(scratch.read('tmp/claude/bench-answer.md')).toBe(answer)
				expect(scratch.read('tmp/claude/bench.jsonl')).toContain('fixture-session')
				expect(scratch.read('tmp/claude/bench.err')).toMatch(/exit=0 signal=none capped=false/u)
			} finally {
				scratch.destroy()
			}
		},
	)

	it('passes the prompt, the output format, and the model to the CLI as its arguments', () => {
		const scratch = createScratch({ prefix: 'orkestrel-bench-claude-args-' })
		try {
			const program = `if (process.argv[1] === '--version') { process.stdout.write('1.0.0\\n') } else { process.stdout.write(JSON.stringify({ type: 'system', subtype: 'init', session_id: 's' }) + '\\n'); process.stdout.write(JSON.stringify({ type: 'result', result: process.argv.slice(1).join(' '), duration_ms: 1 }) + '\\n') }`
			const probe = probeClaude([process.execPath, '-e', program, '--'], [], 60, scratch.path)
			expect(probe.report.answer).toBe(
				'-p Reply with the single word READY and nothing else. --output-format stream-json --verbose --model opus',
			)
			expect(probe.exit).toBe(3)
		} finally {
			scratch.destroy()
		}
	})

	it('reports a CLI that cannot answer --version as dark without a round trip', () => {
		const scratch = createScratch({ prefix: 'orkestrel-bench-claude-mute-' })
		try {
			const probe = probeClaude(
				[process.execPath, '-e', 'process.exitCode = 1', '--'],
				[],
				60,
				scratch.path,
			)
			expect(probe).toEqual({ report: { bench: 'claude', live: false }, exit: 3 })
			expect(scratch.has('tmp')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})
})

describe('the Codex probe', () => {
	it('reads the version and login, runs the exec through launch and result, and reports live', () => {
		const scratch = createScratch({ prefix: 'orkestrel-bench-codex-' })
		try {
			const program = `const args = process.argv.slice(1); if (args[0] === '--version') { process.stdout.write('codex 9.9.9\\n') } else if (args[0] === 'login' && args[1] === 'status') { process.stdout.write('Logged in using the fixture\\n') } else if (args[0] === 'exec') { require('node:fs').writeFileSync(args[args.indexOf('--output-last-message') + 1], 'READY'); process.stdout.write(JSON.stringify({ type: 'thread.started', thread_id: 'thread-1' }) + '\\n') } else { process.exitCode = 2 }`
			const probe = probeCodex(
				[process.execPath, '-e', program, '--'],
				['--model', 'm', '--sandbox', 'read-only'],
				60,
				scratch.path,
			)
			expect(probe.exit).toBe(0)
			expect(probe.report).toMatchObject({
				bench: 'codex',
				version: 'codex 9.9.9',
				login: 'Logged in using the fixture',
				model: 'm',
				sandbox: 'read-only',
				session: 'thread-1',
				answer: 'READY',
				exit: 0,
				capped: false,
				live: true,
				journal: 'tmp/codex/bench.jsonl',
			})
		} finally {
			scratch.destroy()
		}
	})

	it('reports a CLI that is not logged in as dark without a round trip', () => {
		const scratch = createScratch({ prefix: 'orkestrel-bench-codex-out-' })
		try {
			const program = `if (process.argv[1] === '--version') { process.stdout.write('codex 9.9.9\\n') } else { process.stderr.write('Not logged in\\n'); process.exitCode = 1 }`
			const probe = probeCodex([process.execPath, '-e', program, '--'], [], 60, scratch.path)
			expect(probe.exit).toBe(3)
			expect(probe.report).toEqual({
				bench: 'codex',
				version: 'codex 9.9.9',
				login: 'Not logged in',
				live: false,
			})
			expect(scratch.has('tmp')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('reports an empty command as dark', () => {
		const scratch = createScratch({ prefix: 'orkestrel-bench-codex-empty-' })
		try {
			expect(probeCodex([], [], 60, scratch.path)).toEqual({
				report: { bench: 'codex', version: undefined, login: '', live: false },
				exit: 3,
			})
		} finally {
			scratch.destroy()
		}
	})
})

describe('the round trip', () => {
	it('ends a command still running at the cap and reports it capped, with no session or answer', () => {
		const scratch = createScratch({ prefix: 'orkestrel-bench-capped-' })
		try {
			const summary = runRoundTrip(
				'claude',
				[process.execPath, '-e', 'setTimeout(() => {}, 60000)'],
				1,
				scratch.path,
			)
			expect(summary.capped).toBe(true)
			expect(summary.session).toBeUndefined()
			expect(summary.answer).toBeUndefined()
			expect(isLive(summary)).toBe(false)
		} finally {
			scratch.destroy()
		}
	})
})

describe('the cap reader', () => {
	it('defaults an absent cap and accepts a finite number of seconds up to the longest cap', () => {
		expect(parseCap(undefined)).toBe(DEFAULT_CAP)
		expect(parseCap('1')).toBe(1)
		expect(parseCap('0.5')).toBe(0.5)
		expect(parseCap(String(MAX_CAP_SECONDS))).toBe(MAX_CAP_SECONDS)
	})

	it('refuses zero, a negative, a non-number, a blank, an infinity, and a cap past the longest', () => {
		for (const text of [
			'0',
			'-1',
			'abc',
			'',
			' ',
			'Infinity',
			'NaN',
			String(MAX_CAP_SECONDS + 1),
		]) {
			expect({ text, cap: parseCap(text) }).toEqual({ text, cap: undefined })
		}
	})
})

describe('the liveness reading', () => {
	const live = { session: 's', answer: 'READY', exit: 0, capped: false, durationMs: 1 }

	it('is live for a session, a clean exit, no cap, and a READY answer with an optional full stop', () => {
		expect(isLive(live)).toBe(true)
		expect(isLive({ ...live, answer: 'READY.' })).toBe(true)
		expect(isLive({ ...live, answer: '  READY\n' })).toBe(true)
	})

	it('is dark when any one of the four conditions fails', () => {
		expect(isLive({ ...live, session: undefined })).toBe(false)
		expect(isLive({ ...live, exit: 1 })).toBe(false)
		expect(isLive({ ...live, exit: undefined })).toBe(false)
		expect(isLive({ ...live, capped: true })).toBe(false)
		expect(isLive({ ...live, answer: undefined })).toBe(false)
		expect(isLive({ ...live, answer: 'READY now' })).toBe(false)
		expect(isLive({ ...live, answer: 'ready' })).toBe(false)
	})
})

describe('the version reader', () => {
	it('reads the output of a command that answers --version and nothing from one that cannot', () => {
		expect(readVersion([process.execPath])).toBe(process.version)
		expect(readVersion([])).toBeUndefined()
		expect(readVersion(['this-command-does-not-exist-anywhere'])).toBeUndefined()
	})
})

describe('the argument readers', () => {
	it('reads a flag value and treats a following flag as a missing value, keeping the first occurrence', () => {
		const argv = ['--model', 'opus', '--cap', '5', '--claude']
		expect(readOption(argv, '--model')).toBe('opus')
		expect(readOption(argv, '--absent')).toBeUndefined()
		expect(readOption(['--claude'], '--claude')).toBeUndefined()
		expect(readOption(['--cap', '--claude', 'x'], '--cap')).toBeUndefined()
		expect(readOption(['--x', '1', '--x', '2'], '--x')).toBe('1')
		expect(
			readMissingFlags(['--model', '--cap', '5', '--sandbox'], ['--model', '--cap', '--sandbox']),
		).toEqual(['--model', '--sandbox'])
		expect(readMissingFlags(['--cap', '5'], ['--model'])).toEqual([])
	})

	it('names an unread flag and the equals form, and stops at the command separator', () => {
		expect(
			readUnknownFlags(
				['--model=opus', '--claude', '--cap', '5', '--bogus'],
				['--model', '--claude', '--cap'],
			),
		).toEqual(['--model=opus', '--bogus'])
		expect(readUnknownFlags(['--cap', '5', '--', 'node', '--watch'], ['--cap'])).toEqual([])
		expect(readUnknownFlags(['--cap', '5', 'path', '-x'], ['--cap'])).toEqual([])
		expect(readUnknownFlags([], [])).toEqual([])
	})
})

describe('the quoter', () => {
	it('encodes an untrusted text as JSON and cuts a long one inside the quotes', () => {
		expect(quote('a"b')).toBe('"a\\"b"')
		expect(quote('x'.repeat(100))).toBe(`"${'x'.repeat(80)}…"`)
		expect(SANDBOX_MODES).toEqual(['read-only', 'workspace-write', 'danger-full-access'])
	})
})

describe('the record readers', () => {
	it('reads the last JSON object line and typed members', () => {
		expect(parseJsonLine('noise\n{"a":1,"b":"x"}\n\n')).toEqual({ a: 1, b: 'x' })
		expect(parseJsonLine('{"a":1}\r\n{"a":2}\r\n')).toEqual({ a: 2 })
		expect(parseJsonLine('{"a":1}\n[1]\n')).toBeUndefined()
		expect(parseJsonLine('{"a":1}\nnot json\n')).toBeUndefined()
		expect(parseJsonLine('')).toBeUndefined()
		expect(parseJsonLine('\n  \n')).toBeUndefined()
		expect(readString({ b: 'x' }, 'b')).toBe('x')
		expect(readString({ b: 1 }, 'b')).toBeUndefined()
		expect(readString(undefined, 'b')).toBeUndefined()
		expect(readNumber({ a: 1 }, 'a')).toBe(1)
		expect(readNumber({ a: Number.NaN }, 'a')).toBeUndefined()
		expect(readNumber({ a: Number.POSITIVE_INFINITY }, 'a')).toBeUndefined()
		expect(readNumber({ a: '1' }, 'a')).toBeUndefined()
	})
})
