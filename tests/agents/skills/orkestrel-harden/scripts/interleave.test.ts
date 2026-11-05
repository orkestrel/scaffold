import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import {
	INTERLEAVE_SAMPLE,
	INTERLEAVE_SCRIPT,
	buildInterleaveControl,
	buildInterleaveSide,
	readInterleaveLog,
	runSkillScript,
} from '../../../../setupServer.js'
import {
	QUOTE_LIMIT,
	computeDeviation,
	computeMedian,
	computeReport,
	computeSchedule,
	computeSummary,
	isRecord,
	isStringArray,
	isStringRecord,
	mergeEnv,
	parseJson,
	parsePlan,
	parseReading,
	parseRounds,
	quote,
	readLastLine,
	readMissingFlags,
	readOption,
	readPlanText,
	readSide,
	readSideProblems,
	readStrayArguments,
	readUnknownFlags,
	renderNumber,
	renderReport,
	renderSummary,
	runSample,
	runSchedule,
	writeOutput,
} from '../../../../../.agents/skills/orkestrel-harden/scripts/interleave.ts'

describe('interleave.ts', () => {
	it('alternates which side runs first from round to round', () => {
		expect(computeSchedule(4)).toStrictEqual([
			{ round: 1, side: 'baseline' },
			{ round: 1, side: 'candidate' },
			{ round: 2, side: 'candidate' },
			{ round: 2, side: 'baseline' },
			{ round: 3, side: 'baseline' },
			{ round: 3, side: 'candidate' },
			{ round: 4, side: 'candidate' },
			{ round: 4, side: 'baseline' },
		])
	})

	it('admits an even whole round count of at least 2 and refuses the rest of the class', () => {
		for (const [text, rounds] of [
			['2', 2],
			['4', 4],
			['1000', 1000],
		] as const)
			expect(parseRounds(text)).toBe(rounds)
		for (const text of [
			'',
			'0',
			'1',
			'3',
			'25',
			'-2',
			'+2',
			'02',
			'2.0',
			'2.5',
			'1e2',
			'0x10',
			' 2',
			'two',
			'NaN',
			'Infinity',
			'9'.repeat(30),
		])
			expect(parseRounds(text)).toBeUndefined()
	})

	it('reads the last non-empty line of an output on either line ending', () => {
		expect(readLastLine('12.5\n')).toBe('12.5')
		expect(readLastLine('12.5\r\n')).toBe('12.5')
		expect(readLastLine('building\r\n12.5\r\n\r\n')).toBe('12.5')
		expect(readLastLine('12.5\nbuilt\n')).toBe('built')
		expect(readLastLine('  12.5  \n')).toBe('12.5')
		expect(readLastLine('')).toBe('')
		expect(readLastLine('\n \r\n')).toBe('')
	})

	it('admits a finite non-negative decimal reading and refuses the rest of the class', () => {
		for (const [line, reading] of [
			['0', 0],
			['12', 12],
			['007', 7],
			['35.78', 35.78],
			['1.5e-7', 1.5e-7],
			['2E3', 2000],
			['1e+2', 100],
		] as const)
			expect(parseReading(line)).toBe(reading)
		for (const line of [
			'',
			'-1',
			'+1',
			'.5',
			'5.',
			'0x10',
			'1,5',
			'12ms',
			'12 ms',
			'NaN',
			'Infinity',
			'1e999',
			'1e',
		])
			expect(parseReading(line)).toBeUndefined()
	})

	it('computes the median, the median absolute deviation, and the summary from unsorted input', () => {
		expect(computeMedian([3])).toBe(3)
		expect(computeMedian([9, 1, 5])).toBe(5)
		expect(computeMedian([4, 1, 3, 2])).toBe(2.5)
		const input = [100, 1, 3, 2]
		expect(computeDeviation(input)).toBe(1)
		expect(input).toStrictEqual([100, 1, 3, 2])
		expect(computeDeviation([7, 7, 7])).toBe(0)
		expect(computeSummary([104, 100, 104, 100])).toStrictEqual({
			samples: [104, 100, 104, 100],
			median: 102,
			deviation: 2,
			minimum: 100,
			maximum: 104,
		})
		expect(() => computeMedian([])).toThrow('at least one number')
	})

	it('computes the difference and the relative change and carries no bar or verdict', () => {
		const report = computeReport([
			{ round: 1, side: 'baseline', reading: 40 },
			{ round: 1, side: 'candidate', reading: 50 },
			{ round: 2, side: 'candidate', reading: 30 },
			{ round: 2, side: 'baseline', reading: 20 },
		])
		expect(report).toStrictEqual({
			rounds: 2,
			baseline: { samples: [40, 20], median: 30, deviation: 10, minimum: 20, maximum: 40 },
			candidate: { samples: [50, 30], median: 40, deviation: 10, minimum: 30, maximum: 50 },
			difference: 10,
			relative: 10 / 30,
		})
		const faster = computeReport([
			{ round: 1, side: 'baseline', reading: 40 },
			{ round: 1, side: 'candidate', reading: 30 },
		])
		expect(faster.difference).toBe(-10)
		expect(faster.relative).toBe(-0.25)
	})

	it('reports no relative change over a baseline median of 0', () => {
		const report = computeReport([
			{ round: 1, side: 'baseline', reading: 0 },
			{ round: 1, side: 'candidate', reading: 5 },
		])
		expect(report.difference).toBe(5)
		expect(report.relative).toBeUndefined()
		expect(JSON.parse(JSON.stringify(report))).not.toHaveProperty('relative')
		expect(renderReport(report).split('\n').at(-1)).toBe('difference=5 relative=none')
	})

	it('renders the statistics to a bounded precision and each sample as it was read', () => {
		expect(renderNumber(0.8999999999999986)).toBe('0.9')
		expect(renderNumber(36.68)).toBe('36.68')
		expect(renderNumber(1234567.8)).toBe(String(1234570))
		expect(
			renderSummary('baseline', {
				samples: [35.123456789, 36],
				median: 35.5617283945,
				deviation: 0.4382716055,
				minimum: 35.123456789,
				maximum: 36,
			}),
		).toBe(
			'baseline median=35.5617 deviation=0.438272 minimum=35.1235 maximum=36 samples=35.123456789,36',
		)
		expect(
			renderReport(
				computeReport([
					{ round: 1, side: 'baseline', reading: 35.78 },
					{ round: 1, side: 'candidate', reading: 36.68 },
				]),
			),
		).toBe(
			[
				'rounds=1',
				'baseline median=35.78 deviation=0 minimum=35.78 maximum=35.78 samples=35.78',
				'candidate median=36.68 deviation=0 minimum=36.68 maximum=36.68 samples=36.68',
				'difference=0.9 relative=2.51537%',
			].join('\n'),
		)
	})

	it('reads a valid plan, the optional keys included', () => {
		const side = { command: 'node', args: ['--version'] }
		expect(parsePlan(JSON.stringify({ baseline: side, candidate: side }))).toStrictEqual({
			sides: {
				baseline: { ...side, cwd: undefined, env: {} },
				candidate: { ...side, cwd: undefined, env: {} },
			},
			problems: [],
		})
		const placed = { ...side, cwd: 'child', env: { MARK: 'set' } }
		expect(
			parsePlan(JSON.stringify({ baseline: side, candidate: placed })).sides?.candidate,
		).toStrictEqual(placed)
		expect(readSide('text')).toBeUndefined()
		expect(readSide({ command: 1, args: [] })).toBeUndefined()
	})

	it('names every problem of a malformed plan in one refusal', () => {
		for (const text of ['{', '[]', 'null', '5'])
			expect(parsePlan(text)).toStrictEqual({
				sides: undefined,
				problems: ['the plan is not a JSON object with "baseline" and "candidate" sides'],
			})
		expect(parsePlan('{}').problems).toStrictEqual([
			'the plan holds no "baseline" side',
			'the plan holds no "candidate" side',
		])
		const plan = parsePlan(
			JSON.stringify({
				baseline: { command: '', args: [1], cwd: '', env: { A: 1 }, name: 'x' },
				candidate: 'node',
				extra: true,
			}),
		)
		expect(plan.sides).toBeUndefined()
		expect(plan.problems).toStrictEqual([
			'the plan carries the unexpected key "extra"',
			'baseline "command" must be a non-empty string',
			'baseline "args" must be an array of strings',
			'baseline "cwd" must be a non-empty string when present',
			'baseline "env" must be a record of strings when present',
			'baseline carries the unexpected key "name"',
			'candidate is not an object',
		])
		expect(readSideProblems({ command: 'node', args: [] }, 'candidate')).toStrictEqual([])
	})

	it('reads flags and refuses a positional and a bare separator', () => {
		expect(readOption(['--plan', 'a', '--plan', 'b'], '--plan')).toBe('a')
		expect(readOption(['--plan', '--json'], '--plan')).toBeUndefined()
		expect(readOption(['--json'], '--plan')).toBeUndefined()
		expect(readMissingFlags(['--rounds'], ['--plan', '--rounds'])).toStrictEqual(['--rounds'])
		expect(
			readUnknownFlags(['--plan', 'a', '--bad', '--plan=b', '--', '--after'], ['--plan']),
		).toStrictEqual(['--bad', '--plan=b'])
		expect(
			readStrayArguments(['--plan', 'a', 'stray', '--json', '--', 'tail'], ['--plan']),
		).toStrictEqual(['stray', '--', 'tail'])
	})

	it('keeps its small readers total', () => {
		expect(isRecord([])).toBe(false)
		expect(isRecord(null)).toBe(false)
		expect(isRecord({})).toBe(true)
		expect(isStringArray(['a'])).toBe(true)
		expect(isStringArray(['a', 1])).toBe(false)
		expect(isStringArray('a')).toBe(false)
		expect(isStringRecord({ a: 'b' })).toBe(true)
		expect(isStringRecord({ a: 1 })).toBe(false)
		expect(parseJson('{"a":1}')).toStrictEqual({ a: 1 })
		expect(parseJson('{')).toBeUndefined()
		expect(quote('a"b')).toBe('"a\\"b"')
		expect(quote('x'.repeat(QUOTE_LIMIT + 1))).toBe(`"${'x'.repeat(QUOTE_LIMIT)}…"`)
		expect(
			mergeEnv({ NPM_CONFIG_CACHE: 'old', KEPT: 'yes' }, { npm_config_cache: 'added' }),
		).toStrictEqual({ KEPT: 'yes', npm_config_cache: 'added' })
	})

	it('reads a known difference from a fixture whose first sample of a round costs extra, and the same reading fails when the sides swap or the order stops alternating', () => {
		const scratch = createScratch({ prefix: 'orkestrel-interleave-control-' })
		try {
			scratch.write('sample.mjs', INTERLEAVE_SAMPLE)
			const script = join(scratch.path, 'sample.mjs')
			const known = 10
			scratch.write(
				'plan.json',
				JSON.stringify(buildInterleaveControl(script, join(scratch.path, 'run.txt'))),
			)
			const run = runSkillScript(
				INTERLEAVE_SCRIPT,
				['--plan', 'plan.json', '--rounds', '4', '--json'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(0)
			expect(run.json).toStrictEqual({
				rounds: 4,
				baseline: {
					samples: [104, 100, 104, 100],
					median: 102,
					deviation: 2,
					minimum: 100,
					maximum: 104,
				},
				candidate: {
					samples: [110, 114, 110, 114],
					median: 112,
					deviation: 2,
					minimum: 110,
					maximum: 114,
				},
				difference: known,
				relative: known / 102,
			})
			expect(readInterleaveLog(scratch.read('run.txt')).map(([side]) => side)).toStrictEqual([
				'baseline',
				'candidate',
				'candidate',
				'baseline',
				'baseline',
				'candidate',
				'candidate',
				'baseline',
			])

			const swap = buildInterleaveControl(script, join(scratch.path, 'swapped.txt'))
			scratch.write(
				'swapped.json',
				JSON.stringify({ baseline: swap.candidate, candidate: swap.baseline }),
			)
			const swapped = runSkillScript(
				INTERLEAVE_SCRIPT,
				['--plan', 'swapped.json', '--rounds', '4', '--json'],
				{ cwd: scratch.path },
			)
			expect(swapped.status).toBe(0)
			expect(swapped.json?.difference).toBe(-known)

			const fixed = runSchedule(
				buildInterleaveControl(script, join(scratch.path, 'fixed.txt')),
				[1, 2, 3, 4].flatMap((round) => [
					{ round, side: 'baseline' as const },
					{ round, side: 'candidate' as const },
				]),
			)
			expect(fixed.failure).toBeUndefined()
			expect(computeReport(fixed.readings).difference).toBe(6)

			const odd = runSchedule(
				buildInterleaveControl(script, join(scratch.path, 'odd.txt')),
				computeSchedule(3),
			)
			expect(odd.failure).toBeUndefined()
			expect(computeReport(odd.readings).difference).toBe(6)
		} finally {
			scratch.destroy()
		}
	})

	it('supports an A/A comparison of identical commands', () => {
		const scratch = createScratch({ prefix: 'orkestrel-interleave-same-' })
		try {
			scratch.write('sample.mjs', INTERLEAVE_SAMPLE)
			const side = buildInterleaveSide(join(scratch.path, 'sample.mjs'), {
				log: join(scratch.path, 'run.txt'),
				side: 'same',
				amount: 50,
				lead: 0,
			})
			scratch.write('plan.json', JSON.stringify({ baseline: side, candidate: side }))
			const run = runSkillScript(
				INTERLEAVE_SCRIPT,
				['--plan', 'plan.json', '--rounds', '2', '--json'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(0)
			const summary = { samples: [50, 50], median: 50, deviation: 0, minimum: 50, maximum: 50 }
			expect(run.json).toStrictEqual({
				rounds: 2,
				baseline: summary,
				candidate: summary,
				difference: 0,
				relative: 0,
			})
			expect(readInterleaveLog(scratch.read('run.txt'))).toHaveLength(4)
		} finally {
			scratch.destroy()
		}
	})

	it('runs each sample in its own process, with no shell, from an argument array, in the plan’s directory and environment', () => {
		const scratch = createScratch({ prefix: 'orkestrel-interleave-fresh-' })
		try {
			scratch.write('sample.mjs', INTERLEAVE_SAMPLE)
			scratch.ensure('child')
			const extra = ['$HOME && echo "a b" | %PATH%', '', "it's"]
			const side = buildInterleaveSide(
				join(scratch.path, 'sample.mjs'),
				{ log: join(scratch.path, 'run.txt'), side: 'same', amount: 1, lead: 0 },
				extra,
			)
			scratch.write(
				'plan.json',
				JSON.stringify({
					baseline: side,
					candidate: { ...side, cwd: 'child', env: { INTERLEAVE_MARK: 'set' } },
				}),
			)
			const run = runSkillScript(INTERLEAVE_SCRIPT, ['--plan', 'plan.json', '--rounds', '2'], {
				cwd: scratch.path,
				env: { INTERLEAVE_MARK: 'inherited' },
			})
			expect(run.status).toBe(0)
			const log = readInterleaveLog(scratch.read('run.txt'))
			expect(new Set(log.map(([, identity]) => identity)).size).toBe(4)
			expect(log.map((fields) => fields[4])).toStrictEqual(
				Array.from({ length: 4 }, () => JSON.stringify(extra)),
			)
			expect(log.map((fields) => fields[3])).toStrictEqual(['inherited', 'set', 'set', 'inherited'])
			expect(log.map((fields) => fields[2]?.endsWith('child'))).toStrictEqual([
				false,
				true,
				true,
				false,
			])
		} finally {
			scratch.destroy()
		}
	})

	it('fails the run on a sample that exits nonzero, names the side and the round, and prints no report', () => {
		const scratch = createScratch({ prefix: 'orkestrel-interleave-exit-' })
		try {
			scratch.write('sample.mjs', INTERLEAVE_SAMPLE)
			const script = join(scratch.path, 'sample.mjs')
			const log = join(scratch.path, 'run.txt')
			scratch.write(
				'plan.json',
				JSON.stringify({
					baseline: buildInterleaveSide(script, {
						log,
						side: 'baseline',
						amount: 100,
						lead: 0,
						exit: 3,
					}),
					candidate: buildInterleaveSide(script, { log, side: 'candidate', amount: 100, lead: 0 }),
				}),
			)
			const run = runSkillScript(
				INTERLEAVE_SCRIPT,
				['--plan', 'plan.json', '--rounds', '4', '--json'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(2)
			expect(run.stderr).toContain('baseline round 2: exited 3: "sample failed"')
			expect(run.stdout).toBe('')
			expect(readInterleaveLog(scratch.read('run.txt'))).toHaveLength(4)
		} finally {
			scratch.destroy()
		}
	})

	it('fails the run on a reading that does not parse, and stops there', () => {
		const scratch = createScratch({ prefix: 'orkestrel-interleave-text-' })
		try {
			scratch.write('sample.mjs', INTERLEAVE_SAMPLE)
			const script = join(scratch.path, 'sample.mjs')
			const log = join(scratch.path, 'run.txt')
			scratch.write(
				'plan.json',
				JSON.stringify({
					baseline: buildInterleaveSide(script, { log, side: 'baseline', amount: 100, lead: 0 }),
					candidate: buildInterleaveSide(script, {
						log,
						side: 'candidate',
						amount: 100,
						lead: 0,
						text: 2,
					}),
				}),
			)
			const run = runSkillScript(INTERLEAVE_SCRIPT, ['--plan', 'plan.json', '--rounds', '4'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(2)
			expect(run.stderr).toContain(
				'candidate round 2: printed no reading, its last line is "twelve ms"',
			)
			expect(run.stdout).toBe('')
			expect(readInterleaveLog(scratch.read('run.txt'))).toHaveLength(3)
		} finally {
			scratch.destroy()
		}
	})

	it('fails a sample that cannot start, prints nothing, or ends itself by a signal', () => {
		const side = { args: [], cwd: undefined, env: {} }
		const missing = runSample({ ...side, command: 'orkestrel-interleave-no-such-command' })
		expect(missing.success).toBe(false)
		expect(!missing.success && missing.error).toContain('did not finish')
		const silent = runSample({ ...side, command: process.execPath, args: ['-e', ''] })
		expect(silent).toStrictEqual({
			success: false,
			error: 'printed no reading, its last line is ""',
		})
		const killed = runSample({
			...side,
			command: process.execPath,
			args: ['-e', "process.kill(process.pid, 'SIGTERM')"],
		})
		expect(killed.success).toBe(false)
		const reading = runSample({ ...side, command: process.execPath, args: ['-p', '35.78'] })
		expect(reading).toStrictEqual({ success: true, value: 35.78 })
	})

	it('stops a run and keeps the samples before the failure out of any report', () => {
		const good = { command: process.execPath, args: ['-p', '1'], cwd: undefined, env: {} }
		const bad = {
			command: process.execPath,
			args: ['-e', 'process.exit(5)'],
			cwd: undefined,
			env: {},
		}
		const run = runSchedule({ baseline: good, candidate: bad }, computeSchedule(2))
		expect(run.readings).toStrictEqual([{ round: 1, side: 'baseline', reading: 1 }])
		expect(run.failure).toStrictEqual({ round: 1, side: 'candidate', problem: 'exited 5: ""' })
	})

	it('prints text by default and writes the form each --out extension names', () => {
		const scratch = createScratch({ prefix: 'orkestrel-interleave-output-' })
		try {
			const side = { command: process.execPath, args: ['-p', '10'] }
			scratch.write(
				'plan.json',
				JSON.stringify({ baseline: side, candidate: { ...side, args: ['-p', '11'] } }),
			)
			const lines = [
				'rounds=2',
				'baseline median=10 deviation=0 minimum=10 maximum=10 samples=10,10',
				'candidate median=11 deviation=0 minimum=11 maximum=11 samples=11,11',
				'difference=1 relative=10%',
			]
			const cwd = { cwd: scratch.path }
			const text = runSkillScript(
				INTERLEAVE_SCRIPT,
				['--plan', 'plan.json', '--rounds', '2', '--out', 'reports/deep/run.json'],
				cwd,
			)
			expect(text.status).toBe(0)
			expect(text.stdout.split(/\r\n|\n/u).filter((line) => line !== '')).toStrictEqual(lines)
			const written = parseJson(scratch.read('reports/deep/run.json') ?? '')
			expect(isRecord(written) && written.difference).toBe(1)
			const json = runSkillScript(
				INTERLEAVE_SCRIPT,
				['--plan', 'plan.json', '--rounds', '2', '--json', '--out', 'run.txt'],
				cwd,
			)
			expect(json.status).toBe(0)
			expect(json.json?.difference).toBe(1)
			expect(scratch.read('run.txt')).toBe(`${lines.join('\n')}\n`)
		} finally {
			scratch.destroy()
		}
	})

	it('keeps the printed report and exits 2 when --out cannot be written', () => {
		const scratch = createScratch({ prefix: 'orkestrel-interleave-write-' })
		try {
			const side = { command: process.execPath, args: ['-p', '10'] }
			scratch.write('plan.json', JSON.stringify({ baseline: side, candidate: side }))
			const run = runSkillScript(
				INTERLEAVE_SCRIPT,
				['--plan', 'plan.json', '--rounds', '2', '--json', '--out', 'plan.json/run.txt'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(2)
			expect(run.stderr).toContain('--out could not be written')
			expect(run.json?.difference).toBe(0)
			expect(writeOutput(join(scratch.path, 'plain.txt'), 'text')).toBeUndefined()
			expect(scratch.read('plain.txt')).toBe('text\n')
			expect(writeOutput(join(scratch.path, 'plan.json', 'run.txt'), 'text')).toBeTypeOf('string')
			expect(readPlanText(join(scratch.path, 'plain.txt'))).toBe('text\n')
			expect(readPlanText(scratch.path)).toBeUndefined()
		} finally {
			scratch.destroy()
		}
	})

	it('refuses every usage error with exit 64 and runs no sample', () => {
		const scratch = createScratch({ prefix: 'orkestrel-interleave-usage-' })
		try {
			scratch.write('sample.mjs', INTERLEAVE_SAMPLE)
			const side = buildInterleaveSide(join(scratch.path, 'sample.mjs'), {
				log: join(scratch.path, 'run.txt'),
				side: 'same',
				amount: 1,
				lead: 0,
			})
			scratch.write('plan.json', JSON.stringify({ baseline: side, candidate: side }))
			scratch.write('broken.json', JSON.stringify({ baseline: side }))
			const plan = ['--plan', 'plan.json']
			const rounds = ['--rounds', '2']
			for (const [args, message] of [
				[[], 'usage: interleave.ts'],
				[plan, 'usage: interleave.ts'],
				[rounds, 'usage: interleave.ts'],
				[[...plan, ...rounds, '--no-such-flag'], '--no-such-flag is not a flag'],
				[['--plan=plan.json', ...rounds], '--plan=plan.json is not a flag'],
				[[...rounds, '--plan'], '--plan given with no value'],
				[['--plan', '--json', ...rounds], '--plan given with no value'],
				[[...plan, '--rounds'], '--rounds given with no value'],
				[[...plan, ...rounds, '--out'], '--out given with no value'],
				[[...plan, ...rounds, 'stray'], '"stray" is not an argument'],
				[[...plan, ...rounds, '--', 'node'], '"--", "node" is not an argument'],
				[[...plan, ...rounds, '--out', 'run.md'], '--out takes a .json or .txt file'],
				[[...plan, '--rounds', '3'], '--rounds takes an even whole number of at least 2, got "3"'],
				[[...plan, '--rounds', '0'], '--rounds takes an even whole number'],
				[['--plan', 'absent.json', ...rounds], '"absent.json" cannot be read'],
				[['--plan', 'broken.json', ...rounds], 'the plan holds no "candidate" side'],
			] as const) {
				const run = runSkillScript(INTERLEAVE_SCRIPT, args, { cwd: scratch.path })
				expect(run.status).toBe(64)
				expect(run.stderr).toContain(message)
				expect(run.stdout).toBe('')
			}
			expect(scratch.has('run.txt')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})
})
