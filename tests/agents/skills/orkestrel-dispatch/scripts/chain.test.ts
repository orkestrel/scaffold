import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import { CHAIN_SCRIPT, runSkillScript } from '../../../../setupServer.js'
import {
	formatStep,
	isStringArray,
	isStringRecord,
	mergeEnv,
	parseJson,
	parsePlan,
	readMissingFlags,
	readOption,
	readStep,
	readStepProblems,
	readUnknownFlags,
	runStep,
} from '../../../../../.agents/skills/orkestrel-dispatch/scripts/chain.ts'

describe('chain.ts', () => {
	it('reads a valid plan into steps with default cwd and env', () => {
		const plan = parsePlan(
			JSON.stringify([
				{ name: 'one', command: 'node', args: ['-v'] },
				{ name: 'two.b-c_d', command: 'git', args: [], cwd: 'sub', env: { A: '1' } },
			]),
		)
		expect(plan.problems).toStrictEqual([])
		expect(plan.steps).toStrictEqual([
			{ name: 'one', command: 'node', args: ['-v'], cwd: undefined, env: {} },
			{ name: 'two.b-c_d', command: 'git', args: [], cwd: 'sub', env: { A: '1' } },
		])
	})

	it('names every problem of a plan in one pass: shape, keys, names, and repeats', () => {
		expect(parsePlan('{').problems).toStrictEqual(['the plan is not a JSON array of steps'])
		expect(parsePlan('{}').problems).toStrictEqual(['the plan is not a JSON array of steps'])
		expect(parsePlan('[]').problems).toStrictEqual(['the plan holds no step'])
		const problems = parsePlan(
			JSON.stringify([
				7,
				{ name: '../x', command: '', args: 'no', cwd: '', env: { A: 1 }, extra: true },
				{ name: 'dup', command: 'node', args: [] },
				{ name: 'dup', command: 'node', args: [] },
			]),
		).problems
		expect(problems).toContain('step 1 is not an object')
		expect(problems.filter((problem) => problem.startsWith('step 2'))).toHaveLength(6)
		expect(problems).toContain('step 2 carries the unexpected key "extra"')
		expect(problems).toContain('the name "dup" is used by more than one step')
		expect(
			parsePlan(JSON.stringify([{ name: '-x', command: 'node', args: [] }])).problems,
		).toHaveLength(1)
	})

	it('checks entries, string arrays, string records, and JSON without throwing', () => {
		expect(readStepProblems({ name: 'a', command: 'c', args: ['x'] }, 0)).toStrictEqual([])
		expect(readStepProblems(null, 4)).toStrictEqual(['step 5 is not an object'])
		expect(readStep({ name: 'a', command: 'c', args: [1] })).toStrictEqual([])
		expect(readStep('text')).toStrictEqual([])
		expect(isStringArray(['a', 'b'])).toBe(true)
		expect(isStringArray(['a', 1])).toBe(false)
		expect(isStringArray('a')).toBe(false)
		expect(isStringRecord({ a: 'x' })).toBe(true)
		expect(isStringRecord({ a: 1 })).toBe(false)
		expect(isStringRecord(['x'])).toBe(false)
		expect(parseJson('[1]')).toStrictEqual([1])
		expect(parseJson('[')).toBeUndefined()
		expect(readOption(['--plan', 'p.json'], '--plan')).toBe('p.json')
		expect(readOption(['--plan', '--journal'], '--plan')).toBeUndefined()
		expect(readMissingFlags(['--plan'], ['--plan', '--journal'])).toStrictEqual(['--plan'])
		expect(readUnknownFlags(['--plan', 'p', '--plan=x', '--no'], ['--plan'])).toStrictEqual([
			'--plan=x',
			'--no',
		])
	})

	it('formats a finished step with its exit and duration, or with the reason it never exited', () => {
		const step = { name: 'build', command: 'x', args: [], cwd: undefined, env: {} }
		expect(formatStep(step, { exit: 0, error: undefined, durationMs: 12 })).toBe(
			'build exit=0 durationMs=12',
		)
		expect(formatStep(step, { exit: undefined, error: 'spawn x ENOENT', durationMs: 0 })).toBe(
			'build exit=none durationMs=0 error="spawn x ENOENT"',
		)
	})

	it('runs a step with no shell, its output and errors together in one file, its cwd and env applied', () => {
		const scratch = createScratch({ prefix: 'orkestrel-chain-step-' })
		try {
			scratch.write('sub/keep.txt', 'x')
			const output = join(scratch.path, 'out.txt')
			const finish = runStep(
				{
					name: 'probe',
					command: process.execPath,
					args: [
						'-e',
						"console.log('to-out ' + process.env.CHAIN_PROBE + ' ' + require('node:path').basename(process.cwd())); console.error('to-err'); process.exit(3)",
					],
					cwd: join(scratch.path, 'sub'),
					env: { CHAIN_PROBE: 'set' },
				},
				output,
			)
			expect(finish.exit).toBe(3)
			expect(finish.error).toBeUndefined()
			expect(scratch.read('out.txt')).toContain('to-out set sub')
			expect(scratch.read('out.txt')).toContain('to-err')
			const missing = runStep(
				{ name: 'gone', command: 'orkestrel-no-such-command', args: [], cwd: undefined, env: {} },
				join(scratch.path, 'gone.txt'),
			)
			expect(missing.exit).toBeUndefined()
			expect(missing.error).toContain('ENOENT')
		} finally {
			scratch.destroy()
		}
	})

	it('lays a step env over the inherited environment by case-folded name', () => {
		expect(
			mergeEnv(
				{ NPM_CONFIG_CACHE: 'outer', Path: 'bin', KEEP: 'k' },
				{ npm_config_cache: 'inner', PATH: 'other' },
			),
		).toStrictEqual({ KEEP: 'k', npm_config_cache: 'inner', PATH: 'other' })
		expect(mergeEnv({ KEEP: 'k' }, {})).toStrictEqual({ KEEP: 'k' })
	})

	it('hands a step only its own spelling of a variable the chain inherited in another case', () => {
		const scratch = createScratch({ prefix: 'orkestrel-chain-case-' })
		try {
			scratch.write(
				'plan.json',
				JSON.stringify([
					{
						name: 'probe',
						command: process.execPath,
						args: [
							'-e',
							"console.log(Object.keys(process.env).filter((name) => name.toLowerCase() === 'chain_case').map((name) => name + '=' + process.env[name]).join(','))",
						],
						env: { chain_case: 'inner' },
					},
				]),
			)
			const run = runSkillScript(CHAIN_SCRIPT, ['--plan', 'plan.json', '--journal', 'j'], {
				cwd: scratch.path,
				env: { CHAIN_CASE: 'outer' },
			})
			expect(run.status).toBe(0)
			expect(scratch.read('j/probe.txt')?.trim()).toBe('chain_case=inner')
		} finally {
			scratch.destroy()
		}
	})

	it('runs every step in order, journals each, and prints one line per step', () => {
		const scratch = createScratch({ prefix: 'orkestrel-chain-ok-' })
		try {
			scratch.write(
				'plan.json',
				JSON.stringify([
					{ name: 'first', command: process.execPath, args: ['-e', "console.log('A')"] },
					{ name: 'second', command: process.execPath, args: ['-e', "console.error('B')"] },
				]),
			)
			const run = runSkillScript(CHAIN_SCRIPT, ['--plan', 'plan.json', '--journal', 'tmp/j/deep'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(0)
			const lines = run.stdout.split(/\r\n|\n/u).filter((line) => line !== '')
			expect(lines).toHaveLength(2)
			expect(lines[0]).toMatch(/^first exit=0 durationMs=\d+$/u)
			expect(lines[1]).toMatch(/^second exit=0 durationMs=\d+$/u)
			expect(scratch.read('tmp/j/deep/first.txt')?.trim()).toBe('A')
			expect(scratch.read('tmp/j/deep/second.txt')?.trim()).toBe('B')
		} finally {
			scratch.destroy()
		}
	})

	it('stops at the first failing step, exits with its code, and writes no later journal', () => {
		const scratch = createScratch({ prefix: 'orkestrel-chain-stop-' })
		try {
			scratch.write(
				'plan.json',
				JSON.stringify([
					{ name: 'good', command: process.execPath, args: ['-e', '0'] },
					{ name: 'bad', command: process.execPath, args: ['-e', 'process.exit(7)'] },
					{ name: 'never', command: process.execPath, args: ['-e', '0'] },
				]),
			)
			const run = runSkillScript(CHAIN_SCRIPT, ['--journal', 'j', '--plan', 'plan.json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(7)
			expect(run.stdout).toContain('bad exit=7')
			expect(run.stdout).not.toContain('never')
			expect(scratch.has('j/bad.txt')).toBe(true)
			expect(scratch.has('j/never.txt')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('exits 2 when a step cannot start and names the step', () => {
		const scratch = createScratch({ prefix: 'orkestrel-chain-spawn-' })
		try {
			scratch.write(
				'plan.json',
				JSON.stringify([
					{ name: 'ghost', command: 'orkestrel-no-such-command', args: [] },
					{ name: 'after', command: process.execPath, args: ['-e', '0'] },
				]),
			)
			const run = runSkillScript(CHAIN_SCRIPT, ['--plan', 'plan.json', '--journal', 'j'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(2)
			expect(run.stdout).toContain('ghost exit=none')
			expect(run.stdout).not.toContain('after')
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a missing plan or journal, an invalid plan, an unknown flag, and the --flag=value form', () => {
		const scratch = createScratch({ prefix: 'orkestrel-chain-usage-' })
		try {
			scratch.write('plan.json', JSON.stringify([{ name: 'a b', command: '', args: 1 }]))
			const cwd = { cwd: scratch.path }
			expect(runSkillScript(CHAIN_SCRIPT, [], cwd).status).toBe(64)
			expect(runSkillScript(CHAIN_SCRIPT, ['--plan', 'plan.json'], cwd).status).toBe(64)
			expect(runSkillScript(CHAIN_SCRIPT, ['--journal', 'j'], cwd).status).toBe(64)
			expect(
				runSkillScript(CHAIN_SCRIPT, ['--plan', 'gone.json', '--journal', 'j'], cwd).status,
			).toBe(64)
			const bad = runSkillScript(CHAIN_SCRIPT, ['--plan', 'plan.json', '--journal', 'j'], cwd)
			expect(bad.status).toBe(64)
			expect(bad.stderr).toContain('step 1 "name"')
			expect(bad.stderr).toContain('step 1 "command"')
			expect(bad.stderr).toContain('step 1 "args"')
			expect(scratch.has('j')).toBe(false)
			const unknown = runSkillScript(
				CHAIN_SCRIPT,
				['--plan', 'plan.json', '--journal', 'j', '--no-such-flag'],
				cwd,
			)
			expect(unknown.status).toBe(64)
			expect(unknown.stderr).toContain('--no-such-flag')
			const joined = runSkillScript(CHAIN_SCRIPT, ['--plan=plan.json', '--journal', 'j'], cwd)
			expect(joined.status).toBe(64)
			expect(joined.stderr).toContain('--plan=plan.json')
			const bare = runSkillScript(CHAIN_SCRIPT, ['--plan', '--journal', 'j'], cwd)
			expect(bare.status).toBe(64)
			expect(bare.stderr).toContain('--plan given with no value')
			const both = runSkillScript(CHAIN_SCRIPT, ['--plan', '--journal=out'], cwd)
			expect(both.status).toBe(64)
			expect(both.stderr).toContain('--journal=out')
			expect(scratch.has('out')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})
})
