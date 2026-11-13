import { spawnSync } from 'node:child_process'
import { chmodSync, existsSync, readFileSync, realpathSync } from 'node:fs'
import { tmpdir, userInfo } from 'node:os'
import { randomUUID } from 'node:crypto'
import { dirname, join } from 'node:path'
import { describe, expect, it, onTestFinished } from 'vitest'
import { waitForCondition, waitForDelay } from '@orkestrel/test'
import {
	LAUNCH_SCRIPT,
	LANE_SCRIPT,
	readProcessPriority,
	renderLaneFlags,
	renderLanePublisher,
	renderLaneResolver,
	runSkillScript,
	startLaneBench,
	WORKSPACE_ROOT,
	runFlagRefusals,
} from '../../../../setupServer.js'
import {
	OPTIONS,
	parseArguments,
	BREACH_CODE,
	buildOutcome,
	buildTicket,
	classifyLight,
	decideTurn,
	extractMutation,
	fitsBudget,
	HISTORY_AGE_MS,
	HISTORY_DIRECTORY,
	HANDOVER_MS,
	HISTORY_KEYS,
	isBreach,
	isGone,
	isLimits,
	isTicket,
	KILL_BUDGET,
	killMembers,
	linkStage,
	MAX_CAP_SECONDS,
	measurePeak,
	normalizeDirectory,
	normalizeCommand,
	parkOn,
	parseCap,
	parseGauges,
	parseRows,
	parseSample,
	pruneHistory,
	RECENT_RUNS,
	RUN_SUFFIX,
	SAMPLE_MS,
	quote,
	READY_LINE,
	READY_MS,
	readExecTool,
	readCommandId,
	readLimits,
	readMeasure,
	readNames,
	readOutcomeNames,
	readOutcomes,
	readRun,
	readSeed,
	readSequences,
	readSnapshot,
	readQueue,
	readStatus,
	readTree,
	reclaimTicket,
	renderEndpoint,
	renderKey,
	renderOutcomeName,
	renderStatus,
	renderName,
	resolveLauncher,
	resolveRoot,
	runHolder,
	Sampler,
	selectTree,
	sharesDirectory,
	selectMembers,
	sweepTree,
	tallySample,
	Token,
	TICKET_SUFFIX,
	TOKEN_PATTERN,
	writeOutcome,
	writeRun,
	writeStage,
} from '../../../../../.agents/skills/orkestrel-parallel/scripts/lane.ts'

const FIRST_TOKEN = '11111111-1111-4111-8111-111111111111'
const SECOND_TOKEN = '22222222-2222-4222-8222-222222222222'
const THIRD_TOKEN = '33333333-3333-4333-8333-333333333333'
const PUBLISHER_STAGE = '11111111-2222-4333-8444-555555555555.stage'
const DEFAULT_ROOT = join(userInfo().homedir, '.orkestrel', 'lane')
const DEFAULT_PRESENT = existsSync(DEFAULT_ROOT)
const GIB = 1024 ** 3
const LIMITS = {
	slots: 3,
	budget: { cores: 64, memory: 64 * GIB, processes: 1000 },
	threshold: { duration: 600_000, cores: 16, memory: 8 * GIB, processes: 100 },
}
const CLEAN = { duration: 1000, cpu: 100, memory: 50_000_000, processes: 3, code: 0 }
const USAGE = { cores: 1, memory: 100_000_000, processes: 4 }
const NPM = ['node', 'C:/scoop/apps/nodejs22/node_modules/npm/bin/npm-cli.js']
const VITEST = ['node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts']

describe('lane.ts', () => {
	describe('command line', () => {
		it('reads flags by the script law', () => {
			expect(quote('x'.repeat(100))).toBe(`"${'x'.repeat(80)}…"`)
		})

		it.each([
			['no arguments', []],
			['an unknown flag', ['--nope']],
			['a run with only a cap in the equals form', ['--cap=5']],
			['a value given to a switch', ['--status', '--json=1']],
			['a flag with no value', ['--label']],
			['a positional', ['stray']],
			['no command', ['--label', 'a', '--journal', 'j', '--errors', 'e', '--cap', '5', '--']],
			['no separator', ['--label', 'a', '--journal', 'j', '--errors', 'e', '--cap', '5']],
			['a cap of 0', ['--label', 'a', '--journal', 'j', '--errors', 'e', '--cap', '0', '--', 'c']],
			[
				'a cap that is no number',
				['--label', 'a', '--journal', 'j', '--errors', 'e', '--cap', 'soon', '--', 'c'],
			],
			[
				'a cap past the launcher limit',
				['--label', 'a', '--journal', 'j', '--errors', 'e', '--cap', '2147484', '--', 'c'],
			],
			[
				'one file for the journal and the errors',
				['--label', 'a', '--journal', 'j', '--errors', 'j', '--cap', '5', '--', 'c'],
			],
			[
				'json with a run',
				['--label', 'a', '--journal', 'j', '--errors', 'e', '--cap', '5', '--json', '--', 'c'],
			],
			['status with a label', ['--status', '--label', 'a']],
			['status with a journal', ['--status', '--journal', 'j']],
			['status with an errors file', ['--status', '--errors', 'e']],
			['status with a cap', ['--status', '--cap', '5']],
			['status with a command', ['--status', '--', 'c']],
			[
				'status with a whole run',
				['--status', '--label', 'a', '--journal', 'j', '--errors', 'e', '--cap', '5', '--', 'c'],
			],
		])('exits 64 and takes no ticket on %s', async (_name, args) => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const root = join(bench.scratch.path, 'refused')
			const run = runSkillScript(LANE_SCRIPT, ['--root', root, ...args])
			expect(run.status).toBe(64)
			expect(run.stderr).toContain('usage: lane.ts')
			expect(existsSync(root)).toBe(false)
		})

		it.each([
			['a cap that is no number', 'soon', '"soon"'],
			['a cap of 0', '0', '"0"'],
			['a negative cap', '-5', '"-5"'],
			['a cap past the launcher limit', '2147484', '"2147484"'],
		])('names --cap and the value it takes on %s', async (_name, cap, quoted) => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const root = join(bench.scratch.path, 'refused')
			const run = runSkillScript(LANE_SCRIPT, [
				'--root',
				root,
				...['--label', 'a', '--journal', 'j', '--errors', 'e', `--cap=${cap}`, '--', 'c'],
			])
			expect(run.status).toBe(64)
			expect(run.stderr).toContain(
				`--cap takes a number of seconds above 0 up to ${String(MAX_CAP_SECONDS)}, not ${quoted}`,
			)
			expect(run.stderr).toContain('usage: lane.ts')
			expect(existsSync(root)).toBe(false)
		})

		it('reads a cap as a number of seconds above 0 up to the launcher limit', () => {
			expect(parseCap('5')).toBe(5)
			expect(parseCap('0.5')).toBe(0.5)
			expect(parseCap(String(MAX_CAP_SECONDS))).toBe(MAX_CAP_SECONDS)
			expect(parseCap(undefined)).toBeUndefined()
			expect(parseCap('')).toBeUndefined()
			expect(parseCap('0')).toBeUndefined()
			expect(parseCap('soon')).toBeUndefined()
			expect(parseCap(String(MAX_CAP_SECONDS + 1))).toBeUndefined()
		})

		it('exits 75 when the root cannot be created, naming the root', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const file = bench.scratch.write('occupied', 'a file')
			const run = runSkillScript(LANE_SCRIPT, [
				...renderLaneFlags(join(file, 'root'), bench.journals, 'denied'),
				'--',
				process.execPath,
				'-e',
				'',
			])
			expect(run.status).toBe(75)
			expect(run.stderr).toContain('refused the run')
		})

		it('exits 75 and strands no ticket when the run record cannot be written', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const record = bench.scratch.write(join('root', renderName(1, RUN_SUFFIX)), '')
			chmodSync(record, 0o444)
			expect(() => writeRun(bench.root, 1, { started: 1, launcher: 1, command: 1 })).toThrow(
				/EPERM|EACCES/u,
			)
			const run = bench.lane('unwritable')
			expect(await run.exit()).toBe(75)
			expect(run.output).toContain(
				`the run record ${renderName(1, RUN_SUFFIX)} under ${bench.root}`,
			)
			expect(run.output).toContain('could not be written')
			expect(bench.meter.marks).toStrictEqual([])
			expect(bench.scratch.names('root')).toStrictEqual([])
		})

		it('resolves the sibling launcher by the running extension', () => {
			expect(resolveLauncher()).toBe(join(WORKSPACE_ROOT, LAUNCH_SCRIPT))
		})
	})

	describe('the launcher the lane depends on', () => {
		it('reads the --flag=value form and passes everything after the first bare -- to the command unchanged', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const unknown = runSkillScript(LANE_SCRIPT, [
				'--root',
				join(bench.scratch.path, 'refused'),
				'--nope',
			])
			expect(unknown.status).toBe(64)
			expect(unknown.stderr).toContain("'--nope'")
			const echo = bench.scratch.write(
				'echo.cjs',
				'process.stdout.write(JSON.stringify(process.argv.slice(2)))',
			)
			const journal = join(bench.journals, 'equals.jsonl')
			const run = runSkillScript(LANE_SCRIPT, [
				'--label=equals',
				`--journal=${journal}`,
				`--errors=${join(bench.journals, 'equals.err')}`,
				'--cap=40',
				`--root=${bench.root}`,
				'--',
				process.execPath,
				echo,
				'--label',
				'--',
				'--x=1',
			])
			expect(run.status).toBe(0)
			expect(readFileSync(journal, 'utf8')).toBe('["--label","--","--x=1"]')
			expect(bench.scratch.names('root')).toStrictEqual([])
			expect(parseArguments(['--status', '--root=r', '--json'])).toEqual({
				success: true,
				value: { values: { status: true, root: 'r', json: true }, positionals: [] },
			})
		})

		it('relays the spawn line and the summary line and passes on the command code', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const run = runSkillScript(LANE_SCRIPT, [
				...renderLaneFlags(bench.root, bench.journals, 'seven'),
				'--',
				process.execPath,
				'-e',
				'process.exit(7)',
			])
			expect(run.status).toBe(7)
			const lines = run.stdout.split(/\r\n|\n/u).filter((line) => line !== '')
			expect(lines).toHaveLength(2)
			const pid = readFileSync(`${join(bench.journals, 'seven.jsonl')}.pid`, 'utf8').trim()
			expect(readCommandId(lines[0] ?? '')).toBe(Number(pid))
			expect(readCommandId(lines[1] ?? '')).toBeUndefined()
			expect(bench.scratch.names('root')).toStrictEqual([])
		})

		it('passes on 127 when the command cannot start and releases', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const run = runSkillScript(LANE_SCRIPT, [
				...renderLaneFlags(bench.root, bench.journals, 'missing'),
				'--',
				join(bench.scratch.path, 'absent-executable'),
			])
			expect(run.status).toBe(127)
			expect(bench.scratch.names('root')).toStrictEqual([])
		})

		it('exits 124 at the cap with an empty meter and releases', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const run = bench.lane('capped', { cap: 2 })
			expect(await run.exit()).toBe(124)
			expect(bench.meter.present).toStrictEqual([])
			expect(bench.scratch.names('root')).toStrictEqual([])
		})
	})

	describe('exclusive execution across processes and checkouts', () => {
		it('runs one command at a time from different working directories on one root', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const first = bench.lane('alpha', { cwd: bench.scratch.ensure('checkouts/one') })
			await bench.meter.reach('enter', 'alpha')
			const second = bench.lane('beta', { cwd: bench.scratch.ensure('checkouts/two') })
			await second.reach('lane: waiting behind "alpha"')
			const third = bench.lane('gamma', { cwd: bench.scratch.ensure('checkouts/three') })
			await third.reach('lane: waiting behind "beta"')
			expect(bench.meter.present).toStrictEqual(['alpha'])
			bench.meter.release('alpha')
			await bench.meter.reach('enter', 'beta')
			expect(bench.meter.present).toStrictEqual(['beta'])
			bench.meter.release('beta')
			await bench.meter.reach('enter', 'gamma')
			expect(bench.meter.present).toStrictEqual(['gamma'])
			bench.meter.release('gamma')
			expect(await Promise.all([first.exit(), second.exit(), third.exit()])).toStrictEqual([
				0, 0, 0,
			])
			expect(bench.meter.marks.map((mark) => `${mark.event} ${mark.label}`)).toStrictEqual([
				'enter alpha',
				'leave alpha',
				'enter beta',
				'leave beta',
				'enter gamma',
				'leave gamma',
			])
			expect(bench.scratch.names('root')).toStrictEqual([])
		})

		it('admits one holder among arrivals started together', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const labels = ['one', 'two', 'three', 'four', 'five']
			const runs = labels.map((label) => bench.lane(label))
			await bench.serve(labels.length)
			expect(await Promise.all(runs.map((run) => run.exit()))).toStrictEqual([0, 0, 0, 0, 0])
			const marks = bench.meter.marks
			expect(marks.map((mark) => mark.event)).toStrictEqual(
				labels.flatMap(() => ['enter', 'leave']),
			)
			expect(marks.map((mark) => mark.label).toSorted()).toStrictEqual(
				labels.flatMap((label) => [label, label]).toSorted(),
			)
			expect(bench.scratch.names('root')).toStrictEqual([])
		})

		it('overlaps on different roots, which shows the meter can read overlap', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.lane('left', { root: bench.scratch.ensure('roots/left') })
			bench.lane('right', { root: bench.scratch.ensure('roots/right') })
			await Promise.all([bench.meter.reach('enter', 'left'), bench.meter.reach('enter', 'right')])
			expect(bench.meter.present.toSorted()).toStrictEqual(['left', 'right'])
		})

		it('holds a lone ticket behind a live stage file and frees it when the stage ends', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const token = new Token()
			onTestFinished(() => token.destroy())
			await token.listen(renderEndpoint(bench.root, FIRST_TOKEN))
			writeStage(bench.root, buildTicket(FIRST_TOKEN, 'choosing'))
			const run = bench.lane('staged')
			await run.reach('lane: waiting behind an arrival')
			expect(bench.meter.marks).toStrictEqual([])
			bench.scratch.remove(join('root', `${FIRST_TOKEN}.stage`))
			token.publish()
			await bench.meter.reach('enter', 'staged')
			bench.meter.release('staged')
			expect(await run.exit()).toBe(0)
		})

		it('wakes a stage waiter whose connection arrived after the publish', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const token = new Token()
			onTestFinished(() => token.destroy())
			const endpoint = renderEndpoint(bench.root, FIRST_TOKEN)
			await token.listen(endpoint)
			token.publish()
			expect(await parkOn(endpoint, true, () => undefined)).toBeUndefined()
		})

		it('keeps a ticket waiter parked after the publish until the process ends', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const token = new Token()
			onTestFinished(() => token.destroy())
			const endpoint = renderEndpoint(bench.root, FIRST_TOKEN)
			await token.listen(endpoint)
			token.publish()
			const connected = Promise.withResolvers<void>()
			const wait = parkOn(endpoint, false, connected.resolve)
			await connected.promise
			expect(
				await Promise.race([wait.then(() => 'closed'), waitForDelay(200).then(() => 'open')]),
			).toBe('open')
			await token.destroy()
			expect(await wait).toBeUndefined()
		})

		it('decides on the second listing: own ticket gone, a lower ticket, and no lower ticket', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			writeStage(bench.root, buildTicket(FIRST_TOKEN, 'first'))
			expect(linkStage(bench.root, FIRST_TOKEN)).toBe(1)
			bench.scratch.remove(join('root', `${FIRST_TOKEN}.stage`))
			writeStage(bench.root, buildTicket(SECOND_TOKEN, 'second'))
			expect(linkStage(bench.root, SECOND_TOKEN)).toBe(2)
			bench.scratch.remove(join('root', `${SECOND_TOKEN}.stage`))
			expect(decideTurn(bench.root, 1, FIRST_TOKEN)).toStrictEqual({ state: 'holder' })
			const behind = decideTurn(bench.root, 2, SECOND_TOKEN)
			expect(behind.state === 'behind' ? behind.entry.ticket?.label : undefined).toBe('first')
			expect(decideTurn(bench.root, 3, THIRD_TOKEN).state).toBe('refused')
		})
	})

	describe('arrival order', () => {
		it('orders tickets taken in one millisecond by call, whatever their label', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const shared = buildTicket(FIRST_TOKEN, 'x')
			const calls = [
				{ token: FIRST_TOKEN, label: 'zulu' },
				{ token: SECOND_TOKEN, label: 'mike' },
				{ token: THIRD_TOKEN, label: 'alpha' },
			]
			const sequences = calls.map((call) => {
				writeStage(bench.root, { ...shared, token: call.token, label: call.label })
				const sequence = linkStage(bench.root, call.token)
				bench.scratch.remove(join('root', `${call.token}.stage`))
				return sequence
			})
			expect(sequences).toStrictEqual([1, 2, 3])
			const queue = readQueue(bench.root)
			const read = queue.map((entry) => entry.ticket?.label)
			expect(read).toStrictEqual(['zulu', 'mike', 'alpha'])
			// The control: every other key this fixture carries ties or reverses the call order.
			expect(calls.map((call) => call.label).toSorted()).not.toStrictEqual(read)
			expect(new Set(queue.map((entry) => entry.ticket?.arrived)).size).toBe(1)
			expect(new Set(queue.map((entry) => entry.ticket?.pid)).size).toBe(1)
		})

		it('lists again when another process took the name', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			writeStage(bench.root, buildTicket(FIRST_TOKEN, 'first'))
			bench.scratch.write(join('root', renderName(1, TICKET_SUFFIX)), '{}')
			expect(linkStage(bench.root, FIRST_TOKEN)).toBe(2)
		})

		it('serves processes in the order they arrived', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const first = bench.lane('zulu')
			await bench.meter.reach('enter', 'zulu')
			const second = bench.lane('mike')
			await second.reach('lane: waiting behind "zulu"')
			const third = bench.lane('alpha')
			await third.reach('lane: waiting behind "mike"')
			bench.meter.release('zulu')
			await bench.meter.reach('enter', 'mike')
			bench.meter.release('mike')
			await bench.meter.reach('enter', 'alpha')
			bench.meter.release('alpha')
			expect(await Promise.all([first.exit(), second.exit(), third.exit()])).toStrictEqual([
				0, 0, 0,
			])
			expect(
				bench.meter.marks.filter((mark) => mark.event === 'enter').map((mark) => mark.label),
			).toStrictEqual(['zulu', 'mike', 'alpha'])
		})
	})

	describe('recovery from an abandoned ticket', () => {
		it('reclaims a waiter ended while parked, and the later waiter runs', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const holder = bench.lane('holder')
			await bench.meter.reach('enter', 'holder')
			const abandoned = bench.lane('abandoned')
			await abandoned.reach('lane: waiting behind "holder"')
			const later = bench.lane('later')
			await later.reach('lane: waiting behind "abandoned"')
			await abandoned.kill()
			await later.reach('lane: waiting behind "holder"')
			expect(readSequences(readNames(bench.root))).toHaveLength(2)
			bench.meter.release('holder')
			await bench.meter.reach('enter', 'later')
			expect(bench.meter.marks.some((mark) => mark.label === 'abandoned')).toBe(false)
			bench.meter.release('later')
			expect(await Promise.all([holder.exit(), later.exit()])).toStrictEqual([0, 0])
		})

		it('keeps an arrival waiting while the token stays open, and frees it when the token closes', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const token = new Token()
			onTestFinished(() => token.destroy())
			await token.listen(renderEndpoint(bench.root, FIRST_TOKEN))
			writeStage(bench.root, buildTicket(FIRST_TOKEN, 'planted'))
			linkStage(bench.root, FIRST_TOKEN)
			bench.scratch.remove(join('root', `${FIRST_TOKEN}.stage`))
			const run = bench.lane('arrival')
			await run.reach('lane: waiting behind "planted"')
			expect(bench.meter.marks).toStrictEqual([])
			await token.destroy()
			await bench.meter.reach('enter', 'arrival')
			bench.meter.release('arrival')
			expect(await run.exit()).toBe(0)
			expect(bench.scratch.names('root')).toStrictEqual([])
		})

		it('reads only a refused connect as gone', () => {
			expect(isGone('ENOENT')).toBe(true)
			expect(isGone('ECONNREFUSED')).toBe(true)
			expect(isGone('EBUSY')).toBe(false)
			expect(isGone('ETIMEDOUT')).toBe(false)
		})

		it.each([
			['a malformed ticket', '{"protocol":1}', 'cannot be read'],
			[
				'another protocol',
				JSON.stringify({ ...buildTicket(FIRST_TOKEN, 'old'), protocol: 0 }),
				'protocol 0',
			],
			[
				'another host',
				JSON.stringify({ ...buildTicket(FIRST_TOKEN, 'far'), host: 'elsewhere' }),
				'host "elsewhere"',
			],
			[
				'another platform',
				JSON.stringify({ ...buildTicket(FIRST_TOKEN, 'far'), platform: 'plan9' }),
				'platform "plan9"',
			],
		])('exits 75 on %s and removes its own ticket', async (_name, text, expected) => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.scratch.write(join('root', renderName(1, TICKET_SUFFIX)), text)
			const run = bench.lane('arrival')
			expect(await run.exit()).toBe(75)
			expect(run.output).toContain(expected)
			expect(bench.meter.marks).toStrictEqual([])
			expect(bench.scratch.names('root')).toStrictEqual([renderName(1, TICKET_SUFFIX)])
		})
	})

	describe('a publish that cannot strand', () => {
		it('leaves no ticket when a process ends between its stage file and its link', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const publisher = bench.spawn(
				[],
				bench.scratch.path,
				bench.scratch.write('publisher.mjs', renderLanePublisher(bench.root, 'stage')),
			)
			await publisher.reach('parked')
			expect(bench.scratch.names('root')).toStrictEqual([PUBLISHER_STAGE])
			const arrival = bench.lane('waiting')
			await arrival.reach('lane: waiting behind an arrival')
			expect(bench.meter.marks).toStrictEqual([])
			await publisher.kill()
			await bench.meter.reach('enter', 'waiting')
			expect(bench.scratch.names('root')).not.toContain(PUBLISHER_STAGE)
			bench.meter.release('waiting')
			expect(await arrival.exit()).toBe(0)
			expect(bench.scratch.names('root')).toStrictEqual([])
		})

		it('removes the dead stage file for the next arrival when nobody was waiting', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const publisher = bench.spawn(
				[],
				bench.scratch.path,
				bench.scratch.write('publisher.mjs', renderLanePublisher(bench.root, 'stage')),
			)
			await publisher.reach('parked')
			await publisher.kill()
			expect(readSequences(readNames(bench.root))).toStrictEqual([])
			expect(bench.scratch.names('root')).toStrictEqual([PUBLISHER_STAGE])
			const arrival = bench.lane('next')
			await bench.meter.reach('enter', 'next')
			bench.meter.release('next')
			expect(await arrival.exit()).toBe(0)
			expect(bench.scratch.names('root')).toStrictEqual([])
		})

		it('reclaims both names when a process ends after its link and before its unlink', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const publisher = bench.spawn(
				[],
				bench.scratch.path,
				bench.scratch.write('publisher.mjs', renderLanePublisher(bench.root, 'link')),
			)
			await publisher.reach('parked')
			expect(readSequences(readNames(bench.root))).toStrictEqual([1])
			await publisher.kill()
			const arrival = bench.lane('next')
			await bench.meter.reach('enter', 'next')
			bench.meter.release('next')
			expect(await arrival.exit()).toBe(0)
			expect(bench.scratch.names('root')).toStrictEqual([])
		})

		it('publishes a complete ticket in one step', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const ticket = buildTicket(FIRST_TOKEN, 'whole')
			writeStage(bench.root, ticket)
			const sequence = linkStage(bench.root, FIRST_TOKEN)
			expect(readQueue(bench.root)).toStrictEqual([{ sequence, ticket }])
		})
	})

	describe('recovery from an owner that disappears at handover', () => {
		it('reclaims a dead ticket with no run record', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.scratch.write(
				join('root', renderName(1, TICKET_SUFFIX)),
				JSON.stringify(buildTicket(FIRST_TOKEN, 'dead')),
			)
			const run = bench.lane('arrival')
			await bench.meter.reach('enter', 'arrival')
			bench.meter.release('arrival')
			expect(await run.exit()).toBe(0)
			expect(bench.scratch.names('root')).toStrictEqual([])
		})

		it('reclaims a dead ticket whose run record names a tree that is gone', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const started = Date.now()
			const gone = bench.spawn(['process.exit(0)'], bench.scratch.path, '-e')
			expect(await gone.exit()).toBe(0)
			bench.scratch.write(
				join('root', renderName(1, TICKET_SUFFIX)),
				JSON.stringify(buildTicket(FIRST_TOKEN, 'dead')),
			)
			writeRun(bench.root, 1, { started, launcher: gone.pid, command: undefined })
			const run = bench.lane('arrival')
			await bench.meter.reach('enter', 'arrival')
			bench.meter.release('arrival')
			expect(await run.exit()).toBe(0)
			expect(bench.scratch.names('root')).toStrictEqual([])
		})

		it('refuses a dead ticket whose run record names a live tree, until that tree ends', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const started = Date.now()
			const living = bench.spawn(['setInterval(() => undefined, 1000)'], bench.scratch.path, '-e')
			bench.scratch.write(
				join('root', renderName(1, TICKET_SUFFIX)),
				JSON.stringify(buildTicket(FIRST_TOKEN, 'dead')),
			)
			writeRun(bench.root, 1, { started, launcher: living.pid, command: undefined })
			const refused = bench.lane('refused')
			expect(await refused.exit()).toBe(75)
			expect(refused.output).toContain('"dead"')
			expect(refused.output).toContain(renderName(1, RUN_SUFFIX))
			expect(refused.output).toContain(String(living.pid))
			expect(bench.meter.marks).toStrictEqual([])
			await living.kill()
			const next = bench.lane('next')
			await bench.meter.reach('enter', 'next')
			bench.meter.release('next')
			expect(await next.exit()).toBe(0)
			expect(bench.scratch.names('root')).toStrictEqual([])
		})

		it('refuses a dead ticket whose run record names no launcher', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.scratch.write(
				join('root', renderName(1, TICKET_SUFFIX)),
				JSON.stringify(buildTicket(FIRST_TOKEN, 'dead')),
			)
			writeRun(bench.root, 1, { started: Date.now(), launcher: undefined, command: undefined })
			const refused = bench.lane('refused')
			expect(await refused.exit()).toBe(75)
			expect(refused.output).toContain('before its tree could be identified')
			expect(refused.output).toContain(renderName(1, RUN_SUFFIX))
			expect(bench.meter.marks).toStrictEqual([])
			expect(bench.scratch.has(join('root', renderName(1, TICKET_SUFFIX)))).toBe(true)
		})

		it('refuses a dead ticket whose run record is malformed', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.scratch.write(join('root', renderName(1, RUN_SUFFIX)), 'not json')
			expect(readRun(bench.root, 1)).toBe('unread')
			expect(readRun(bench.root, 2)).toBe('absent')
			expect(reclaimTicket(bench.root, 1, buildTicket(FIRST_TOKEN, 'dead'))).toContain(
				'before its tree could be identified',
			)
		})
	})

	describe('a checked kill', () => {
		it('selects members by parent link and creation date', () => {
			const rows = [
				{ pid: 10, parent: 1, created: 1000 },
				{ pid: 11, parent: 10, created: 1001 },
				{ pid: 12, parent: 11, created: 1002 },
				{ pid: 13, parent: 11, created: 900 },
				{ pid: 14, parent: 99, created: 1000 },
			]
			expect(selectMembers(rows, [10], 990, 2000).map((row) => row.pid)).toStrictEqual([10, 11, 12])
			expect(selectMembers(rows, [20], 990, 2000)).toStrictEqual([])
		})

		it('reaches an exited seed through its child and refuses a row that reused its id', () => {
			const orphan = { pid: 11, parent: 10, created: 1001 }
			expect(selectMembers([orphan], [10], 990, 2000)).toStrictEqual([orphan])
			expect(selectMembers([orphan], [10], 1100, 2000)).toStrictEqual([])
			expect(selectMembers([orphan], [10], 990, 1000)).toStrictEqual([])
			const reuser = { pid: 10, parent: 1, created: 3000 }
			const reuserChild = { pid: 12, parent: 10, created: 3001 }
			expect(selectMembers([reuser, reuserChild], [10], 990, 2000)).toStrictEqual([])
			expect(
				selectMembers([reuser, orphan, reuserChild], [10], 990, 2000).map((row) => row.pid),
			).toStrictEqual([11])
		})

		it('terminates on a parent cycle in a snapshot', () => {
			const rows = [
				{ pid: 10, parent: 11, created: 1000 },
				{ pid: 11, parent: 10, created: 1000 },
			]
			expect(selectMembers(rows, [10], 990, 2000).map((row) => row.pid)).toStrictEqual([10, 11])
		})

		it('parses snapshot rows split on either line ending', () => {
			expect(parseRows('10 1 1000\r\n11 10 1001\n\nnot a row\n')).toStrictEqual([
				{ pid: 10, parent: 1, created: 1000 },
				{ pid: 11, parent: 10, created: 1001 },
			])
		})

		it('kills a real parent and grandchild and confirms with a later reading', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const started = Date.now()
			const parent = bench.spawn(
				bench.command('parent', 'grandchild').slice(2),
				bench.scratch.path,
				'-e',
			)
			await Promise.all([
				bench.meter.reach('enter', 'parent'),
				bench.meter.reach('enter', 'grandchild'),
			])
			const run = { started, launcher: parent.pid, command: undefined }
			expect(readTree(run, Date.now())).toContain(parent.pid)
			const sweep = sweepTree(() => readTree(run, Date.now()), killMembers, KILL_BUDGET)
			expect(sweep).toStrictEqual({ gone: true, members: [] })
			await Promise.all([
				bench.meter.reach('drop', 'parent'),
				bench.meter.reach('drop', 'grandchild'),
			])
			expect(readTree(run, Date.now())).toStrictEqual([])
		})

		it('reports the members unconfirmed at a zero budget and leaves the tree alive', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const started = Date.now()
			const parent = bench.spawn(bench.command('parent').slice(2), bench.scratch.path, '-e')
			await bench.meter.reach('enter', 'parent')
			const run = { started, launcher: parent.pid, command: undefined }
			const sweep = sweepTree(() => readTree(run, Date.now()), killMembers, 0)
			expect(sweep.gone).toBe(false)
			expect(sweep.members).toContain(parent.pid)
			expect(bench.meter.present).toStrictEqual(['parent'])
		})

		it('reads the tree again after a kill that ended nothing', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const started = Date.now()
			const parent = bench.spawn(bench.command('parent').slice(2), bench.scratch.path, '-e')
			await bench.meter.reach('enter', 'parent')
			const run = { started, launcher: parent.pid, command: undefined }
			const sweep = sweepTree(
				() => readTree(run, Date.now()),
				() => undefined,
				1,
			)
			expect(sweep.gone).toBe(false)
			expect(sweep.members).toContain(parent.pid)
			expect(bench.meter.present).toStrictEqual(['parent'])
		})

		it('reports a tree it cannot read as not gone, and a run with no launcher as unread', () => {
			expect(
				sweepTree(
					() => undefined,
					() => undefined,
					5,
				),
			).toStrictEqual({ gone: false, members: [] })
			expect(readTree({ started: 0, launcher: undefined, command: undefined }, 0)).toBeUndefined()
		})
	})

	describe('no surviving process tree at handover', () => {
		it('ends a descendant the command left, before the next holder runs', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const first = bench.lane('first', { grandchild: 'descendant' })
			await Promise.all([
				bench.meter.reach('enter', 'first'),
				bench.meter.reach('enter', 'descendant'),
			])
			const second = bench.lane('second')
			await second.reach('lane: waiting behind "first"')
			bench.meter.release('first')
			expect(await first.exit()).toBe(0)
			await bench.meter.reach('enter', 'second')
			const marks = bench.meter.marks.map((mark) => `${mark.event} ${mark.label}`)
			expect(marks).toContain('drop descendant')
			expect(marks.indexOf('drop descendant')).toBeLessThan(marks.indexOf('enter second'))
			bench.meter.release('second')
			expect(await second.exit()).toBe(0)
		})

		it('leaves that descendant on the meter under the bare launcher, the failing control', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const launcher = bench.spawn(
				[
					'--journal',
					join(bench.journals, 'bare.jsonl'),
					'--errors',
					join(bench.journals, 'bare.err'),
					'--cap',
					'40',
					'--',
					...bench.command('bare', 'orphan'),
				],
				bench.scratch.path,
				join(WORKSPACE_ROOT, LAUNCH_SCRIPT),
			)
			await Promise.all([bench.meter.reach('enter', 'bare'), bench.meter.reach('enter', 'orphan')])
			bench.meter.release('bare')
			expect(await launcher.exit()).toBe(0)
			expect(bench.meter.present).toStrictEqual(['orphan'])
			bench.meter.release('orphan')
			await bench.meter.reach('leave', 'orphan')
		})

		it('refuses the next arrival while a forced-out holder leaves a live descendant', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const holder = bench.lane('holder', { grandchild: 'survivor' })
			await Promise.all([
				bench.meter.reach('enter', 'holder'),
				bench.meter.reach('enter', 'survivor'),
			])
			await waitForCondition(
				'the run record names the command',
				() => {
					const run = readRun(bench.root, 1)
					return typeof run === 'object' && run.command !== undefined
				},
				{ budget: 45_000, interval: 10 },
			)
			await holder.kill()
			// The Windows job Node assigns each child ends the launcher and the command with the lane.
			if (process.platform === 'win32') await bench.meter.reach('drop', 'holder')
			expect(bench.meter.present).toContain('survivor')
			const refused = bench.lane('refused')
			expect(await refused.exit()).toBe(75)
			expect(refused.output).toContain('"holder"')
			expect(refused.output).toContain('present')
			expect(bench.meter.marks.some((mark) => mark.label === 'refused')).toBe(false)
			// The control: the same arrival on another root enters beside the survivor.
			const elsewhere = bench.lane('elsewhere', { root: bench.scratch.ensure('roots/other') })
			await bench.meter.reach('enter', 'elsewhere')
			expect(bench.meter.present).toEqual(expect.arrayContaining(['survivor', 'elsewhere']))
			bench.meter.release('elsewhere')
			expect(await elsewhere.exit()).toBe(0)
			bench.meter.releaseAll()
			await bench.meter.closure('survivor')
			const next = bench.lane('next')
			await bench.meter.reach('enter', 'next')
			bench.meter.release('next')
			expect(await next.exit()).toBe(0)
			expect(bench.scratch.names('root')).toStrictEqual([])
		})
	})

	describe('one queue per host', () => {
		it('resolves one root from any working directory and any temporary or home variable', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const fixture = bench.scratch.write('resolver.mjs', renderLaneResolver())
			const readings = ['a', 'b'].map((name) => {
				const cwd = bench.scratch.ensure(`elsewhere/${name}`)
				const overridden = join(cwd, 'variables')
				const run = bench.module(fixture, cwd, {
					HOME: overridden,
					USERPROFILE: overridden,
					TEMP: overridden,
					TMP: overridden,
					TMPDIR: overridden,
				})
				expect(run.status).toBe(0)
				return { json: run.json, overridden }
			})
			expect(resolveRoot()).toBe(DEFAULT_ROOT)
			expect(resolveRoot('given')).toBe('given')
			const [first, second] = readings
			expect(first?.json?.['root']).toBe(DEFAULT_ROOT)
			expect(second?.json?.['root']).toBe(DEFAULT_ROOT)
			// The control: a resolver built on the temporary or the working directory differs per child.
			expect(first?.json?.['temporary']).toBe(first?.overridden)
			expect(second?.json?.['temporary']).toBe(second?.overridden)
			expect(first?.json?.['temporary']).not.toBe(second?.json?.['temporary'])
			expect(first?.json?.['working']).not.toBe(second?.json?.['working'])
			expect(first?.overridden).not.toBe(tmpdir())
			expect(existsSync(DEFAULT_ROOT)).toBe(DEFAULT_PRESENT)
		})

		it('admits only a token form an endpoint can be built from', () => {
			expect(TOKEN_PATTERN.test(FIRST_TOKEN)).toBe(true)
			expect(TOKEN_PATTERN.test('../../outside')).toBe(false)
			expect(renderEndpoint('root', FIRST_TOKEN)).toContain(FIRST_TOKEN)
		})

		it('leaves the default root as the file found it, after every earlier case', () => {
			expect(existsSync(DEFAULT_ROOT)).toBe(DEFAULT_PRESENT)
		})
	})

	describe('--status', () => {
		it('names a live holder and waiter in order and changes no file', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const holder = bench.lane('holding')
			await bench.meter.reach('enter', 'holding')
			await waitForCondition(
				'the run record exists',
				() => bench.scratch.has(join('root', renderName(1, RUN_SUFFIX))),
				{ budget: 45_000, interval: 10 },
			)
			const waiter = bench.lane('queued')
			await waiter.reach('lane: waiting behind "holding"')
			const before = bench.listing()
			const json = runSkillScript(LANE_SCRIPT, ['--status', '--root', bench.root, '--json'])
			const text = runSkillScript(LANE_SCRIPT, ['--status', '--root', bench.root])
			expect(json.status).toBe(0)
			expect(text.status).toBe(0)
			expect(bench.listing()).toStrictEqual(before)
			expect(JSON.parse(json.stdout)).toMatchObject({
				holder: { label: 'holding', state: 'live', sequence: 1 },
				tickets: [
					{ label: 'holding', state: 'live', sequence: 1 },
					{ label: 'queued', state: 'live', sequence: 2 },
				],
			})
			expect(text.stdout).toContain('holder: "holding"')
			expect(text.stdout.indexOf('"holding" pid')).toBeLessThan(text.stdout.indexOf('"queued" pid'))
			bench.meter.release('holding')
			await bench.meter.reach('enter', 'queued')
			bench.meter.release('queued')
			expect(await Promise.all([holder.exit(), waiter.exit()])).toStrictEqual([0, 0])
		})

		it('reports a dead ticket as dead and removes neither it nor a dead stage file', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.scratch.write(
				join('root', renderName(1, TICKET_SUFFIX)),
				JSON.stringify(buildTicket(FIRST_TOKEN, 'dead')),
			)
			writeStage(bench.root, buildTicket(SECOND_TOKEN, 'stage'))
			const before = bench.listing()
			const status = await readStatus(bench.root)
			expect(status.holder).toBeUndefined()
			expect(status.tickets).toMatchObject([{ label: 'dead', state: 'dead', sequence: 1 }])
			expect(renderStatus(status)).toContain('holder: none')
			expect(runSkillScript(LANE_SCRIPT, ['--status', '--root', bench.root]).status).toBe(0)
			expect(bench.listing()).toStrictEqual(before)
		})

		it('reports a malformed or foreign ticket as unread', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.scratch.write(join('root', renderName(1, TICKET_SUFFIX)), 'not json')
			bench.scratch.write(
				join('root', renderName(2, TICKET_SUFFIX)),
				JSON.stringify({ ...buildTicket(FIRST_TOKEN, 'far'), host: 'elsewhere' }),
			)
			const status = await readStatus(bench.root)
			expect(status.tickets.map((row) => row.state)).toStrictEqual(['unread', 'unread'])
		})

		it('reads an absent root as an empty queue and creates nothing', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const root = join(bench.scratch.path, 'absent')
			const text = runSkillScript(LANE_SCRIPT, ['--status', '--root', root])
			expect(text.status).toBe(0)
			expect(text.stdout).toContain('holder: none')
			const json = runSkillScript(LANE_SCRIPT, ['--status', '--root', root, '--json'])
			expect(json.status).toBe(0)
			expect(JSON.parse(json.stdout)).toStrictEqual({ tickets: [] })
			expect(existsSync(root)).toBe(false)
		})

		it('exits 75 when the root cannot be listed', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const run = runSkillScript(LANE_SCRIPT, [
				'--status',
				'--root',
				bench.scratch.write('occupied', 'a file'),
			])
			expect(run.status).toBe(75)
			expect(run.stderr).toContain('cannot be read')
		})

		it('refuses --solo as a run flag', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const root = join(bench.scratch.path, 'refused')
			const run = runSkillScript(LANE_SCRIPT, ['--status', '--solo', '--root', root])
			expect(run.status).toBe(64)
			expect(run.stderr).toContain('two modes')
			expect(existsSync(root)).toBe(false)
		})
	})

	describe('the light reading', () => {
		it('reads a command with no records, a capped run, an exit 70, and a breach as heavy', () => {
			expect(classifyLight(undefined, [], LIMITS)).toBeUndefined()
			expect(classifyLight(undefined, [CLEAN, CLEAN], LIMITS)).toBeUndefined()
			expect(
				classifyLight(undefined, [CLEAN, CLEAN, { ...CLEAN, code: 124 }], LIMITS),
			).toBeUndefined()
			expect(
				classifyLight(undefined, [CLEAN, CLEAN, { ...CLEAN, code: 70 }], LIMITS),
			).toBeUndefined()
			expect(
				classifyLight(undefined, [CLEAN, CLEAN, { ...CLEAN, code: 69 }], LIMITS),
			).toBeUndefined()
			expect(classifyLight(undefined, [CLEAN, CLEAN, undefined], LIMITS)).toBeUndefined()
			for (const breach of [
				{ ...CLEAN, duration: LIMITS.threshold.duration + 1 },
				{ ...CLEAN, cpu: CLEAN.duration * (LIMITS.threshold.cores + 1) },
				{ ...CLEAN, memory: LIMITS.threshold.memory + 1 },
				{ ...CLEAN, processes: LIMITS.threshold.processes + 1 },
			]) {
				expect(isBreach(breach, LIMITS.threshold)).toBe(true)
				expect(classifyLight(undefined, [CLEAN, CLEAN, breach], LIMITS)).toBeUndefined()
			}
			// The control: the same records with no breach read light, with their peaks.
			expect(isBreach(CLEAN, LIMITS.threshold)).toBe(false)
			expect(
				classifyLight(undefined, [CLEAN, CLEAN, { ...CLEAN, memory: 7 }], LIMITS),
			).toStrictEqual({
				cores: CLEAN.cpu / CLEAN.duration,
				memory: CLEAN.memory,
				processes: CLEAN.processes,
			})
			expect(RECENT_RUNS).toBe(3)
		})

		it('seeds by kind: light before any record and demoted by a breach, heavy whatever the records', () => {
			const { cores, memory, processes } = LIMITS.threshold
			expect(classifyLight('light', [], LIMITS)).toStrictEqual({ cores, memory, processes })
			expect(classifyLight('light', [CLEAN], LIMITS)).toStrictEqual({ cores, memory, processes })
			expect(
				classifyLight('light', [CLEAN, { ...CLEAN, processes: processes + 1 }], LIMITS),
			).toBeUndefined()
			expect(classifyLight('heavy', [CLEAN, CLEAN, CLEAN], LIMITS)).toBeUndefined()
			expect(measurePeak([CLEAN, { ...CLEAN, memory: CLEAN.memory * 2 }])).toStrictEqual({
				cores: CLEAN.cpu / CLEAN.duration,
				memory: CLEAN.memory * 2,
				processes: CLEAN.processes,
			})
		})

		it.each([
			['an install', [...NPM, 'ci', '--ignore-scripts'], 'heavy'],
			['the full suite through npm', [...NPM, 'test'], 'heavy'],
			['the release chain', [...NPM, 'run', 'prepublishOnly'], 'heavy'],
			['the release steps', ['node', 'scripts/steps.ts'], 'heavy'],
			['a study', ['node', 'dist/bin/main.js', 'study', 'run'], 'heavy'],
			['a journey project', [...VITEST, '--project', 'journey'], 'heavy'],
			['a capture', [...NPM, 'run', 'test:capture'], 'heavy'],
			['a live-service run', [...NPM, 'run', 'test:live'], 'heavy'],
			['the live-service project script', [...NPM, 'run', 'test:service'], 'heavy'],
			['the pack-and-install script', [...NPM, 'run', 'test:distribution'], 'heavy'],
			['the source aggregate script', [...NPM, 'run', 'test:src'], 'heavy'],
			['the application aggregate script', [...NPM, 'run', 'test:app'], 'heavy'],
			['the live-service project', [...VITEST, '--project', 'service'], 'heavy'],
			['the benchmark script', [...NPM, 'run', 'test:bench'], 'heavy'],
			['a whole browser project', [...VITEST, '--project', 'src:browser'], 'heavy'],
			['a whole Vue project', [...VITEST, '--project', 'app:vue'], 'heavy'],
			[
				'one browser test file',
				[...VITEST, '--project', 'src:browser', 'tests/src/browser/x.test.ts'],
				'light',
			],
			['a wildcard project filter', [...VITEST, '--project', 'src:*'], 'heavy'],
			[
				'a full run with a dotted report flag',
				[...VITEST, '--reporter=json', '--outputFile.json', 'tmp/r.json'],
				'heavy',
			],
			[
				'a report path beside one project',
				[...VITEST, '--project', 'skills', '--outputFile', 'tmp/r.json'],
				'light',
			],
			['the full suite through Vitest', [...VITEST], 'heavy'],
			['a format check', [...NPM, 'run', 'format:check'], 'light'],
			['a lint check', [...NPM, 'run', 'lint:check'], 'light'],
			['a type check through npm', [...NPM, 'run', 'check'], 'light'],
			[
				'a type check through tsc',
				['npx.cmd', '--yes', 'tsc', '--noEmit', '-p', 'x.json'],
				'light',
			],
			['one project', [...NPM, 'run', 'test:skills'], 'light'],
			['named files', [...VITEST, '--project', 'skills', 'tests/a/lane.test.ts'], 'light'],
			['one project in the equals form', ['npx', 'vitest', 'run', '--project=skills'], 'light'],
			['an oxfmt check', ['oxfmt.exe', '--check', '.'], 'light'],
			['an oxlint run', ['node', 'node_modules/oxlint/bin/oxlint', '.'], 'light'],
			['a build', [...NPM, 'run', 'build'], undefined],
			['a lint fix', ['oxlint', '--fix', '.'], undefined],
			['two projects', [...VITEST, '--project', 'skills', '--project', 'policy'], 'heavy'],
			['a directory filter', [...VITEST, 'tests/agents/'], undefined],
			['one project of the source aggregate', [...NPM, 'run', 'test:src:core'], 'light'],
			['inline code', ['node', '-e', 'process.exit(0)'], undefined],
			['a checkout path that holds a heavy word', ['/live/node', '/live/oxlint', '.'], 'light'],
			[
				'one project through npm exec',
				[...NPM, 'exec', '--', 'vitest', 'run', '--project', 'skills'],
				'light',
			],
			['the full suite through npm exec', [...NPM, 'exec', '--', 'vitest', 'run'], 'heavy'],
			['a format check through npm exec', [...NPM, 'exec', '--', 'oxfmt', '--check', '.'], 'light'],
			['a type check through npm x', [...NPM, 'x', '--', 'tsc', '--noEmit'], 'light'],
			['a type check through pnpm exec', ['pnpm', 'exec', 'tsc', '--noEmit'], 'light'],
			[
				'a tool before the bare -- of npm exec',
				[...NPM, 'exec', 'vitest', '--', 'run', '--project=skills'],
				'light',
			],
			[
				'a package flag through npx',
				['npx', '--package', 'typescript', 'tsc', '--noEmit'],
				'light',
			],
			[
				'a tool flag -c through npx',
				['npx', 'vitest', 'run', '-c', 'vite.config.ts', '--project', 'skills'],
				'light',
			],
			['inline code through npm exec', [...NPM, 'exec', '-c', 'vitest run'], undefined],
			[
				'a type check through npm --prefix exec',
				[...NPM, '--prefix', 'packages/a', 'exec', '--', 'tsc', '--noEmit'],
				'light',
			],
			[
				'a type check through npm -w before exec',
				[...NPM, '-w', 'packages/a', 'exec', 'tsc', '--noEmit'],
				'light',
			],
			[
				'a format check through npm --workspace before exec',
				[...NPM, '--workspace', 'a', 'exec', '--', 'oxfmt', '--check', '.'],
				'light',
			],
			[
				'one project through npm exec -w',
				[...NPM, 'exec', '-w', 'packages/a', '--', 'vitest', 'run', '--project', 'skills'],
				'light',
			],
			[
				'a type check through npm exec --workspace',
				[...NPM, 'exec', '--workspace', 'a', 'tsc', '--noEmit'],
				'light',
			],
			['a script beside npm --prefix', [...NPM, '--prefix', 'a', 'run', 'test:skills'], 'light'],
			['a type check through pnpx', ['pnpx', 'tsc', '--noEmit'], 'light'],
			['a format check through bunx', ['bunx.exe', 'oxfmt', '--check', '.'], 'light'],
			['the full suite through pnpm -w', ['pnpm', '-w', 'test'], 'heavy'],
			['a type check through pnpm -w run', ['pnpm', '-w', 'run', 'check'], 'light'],
			[
				'a type check through pnpm --filter exec',
				['pnpm', '--filter', 'a', 'exec', 'tsc', '--noEmit'],
				'light',
			],
		])('seeds %s', (_name, command, expected) => {
			expect(readSeed(command)).toBe(expected)
		})

		it('fits the slots and each budget, and the boundary fits', () => {
			const usage = { cores: 1, memory: 100, processes: 10 }
			const limits = { ...LIMITS, slots: 2, budget: { cores: 2, memory: 200, processes: 20 } }
			expect(fitsBudget([usage, usage], limits)).toBe(true)
			expect(fitsBudget([usage, usage, { cores: 0, memory: 0, processes: 0 }], limits)).toBe(false)
			expect(fitsBudget([usage, { ...usage, cores: 1.5 }], limits)).toBe(false)
			expect(fitsBudget([usage, { ...usage, memory: 101 }], limits)).toBe(false)
			expect(fitsBudget([usage, { ...usage, processes: 11 }], limits)).toBe(false)
		})

		it('reads limits.json as absent, unread, or limits', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			expect(readLimits(bench.root)).toBe('absent')
			bench.limit({ ...LIMITS, slots: 0 })
			expect(readLimits(bench.root)).toBe('unread')
			bench.limit({ ...LIMITS, threshold: { ...LIMITS.threshold, duration: -1 } })
			expect(readLimits(bench.root)).toBe('unread')
			bench.limit(LIMITS)
			expect(readLimits(bench.root)).toStrictEqual(LIMITS)
			expect(isLimits(LIMITS)).toBe(true)
		})

		it('keys a command by the real working directory and the arguments', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const command = [process.execPath, '-e', '']
			const key = renderKey(realpathSync(WORKSPACE_ROOT), command)
			expect(join('root', HISTORY_DIRECTORY, key)).toBe(bench.history(command))
			expect(renderKey(realpathSync(WORKSPACE_ROOT), [...command, 'x'])).not.toBe(key)
		})

		it('writes each record once, lands two records of one key and one millisecond, and prunes', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const key = 'k'
			for (const [index, token] of [FIRST_TOKEN, SECOND_TOKEN, THIRD_TOKEN].entries()) {
				writeOutcome(bench.root, key, renderOutcomeName(index, token), CLEAN)
			}
			const same = renderOutcomeName(10, FIRST_TOKEN)
			writeOutcome(bench.root, key, same, { ...CLEAN, code: 1 })
			writeOutcome(bench.root, key, renderOutcomeName(10, SECOND_TOKEN), { ...CLEAN, code: 2 })
			expect(readOutcomeNames(bench.root, key)).toStrictEqual([
				renderOutcomeName(2, THIRD_TOKEN),
				same,
				renderOutcomeName(10, SECOND_TOKEN),
			])
			expect(readOutcomes(bench.root, key).map((outcome) => outcome?.code)).toStrictEqual([0, 1, 2])
			expect(() => writeOutcome(bench.root, key, same, CLEAN)).toThrow('EEXIST')
			bench.scratch.write(
				join('root', HISTORY_DIRECTORY, key, renderOutcomeName(11, THIRD_TOKEN)),
				'{',
			)
			expect(readOutcomes(bench.root, key).at(-1)).toBeUndefined()
		})

		it('reads a ticket without the optional fields as heavy and refuses malformed ones', () => {
			const ticket = buildTicket(FIRST_TOKEN, 'plain')
			expect('light' in ticket || 'solo' in ticket).toBe(false)
			expect(isTicket(ticket)).toBe(true)
			expect(isTicket({ ...ticket, light: { cores: 1 } })).toBe(false)
			expect(isTicket({ ...ticket, solo: 'yes' })).toBe(false)
			const light = buildTicket(FIRST_TOKEN, 'light', USAGE, true)
			expect(light).toMatchObject({ light: USAGE, solo: true })
			expect(isTicket(light)).toBe(true)
		})

		it('parses a sample line by its marker and reads the ready line as no sample', () => {
			expect(parseSample('1|10 1 1000 20000 300;bad')).toStrictEqual({
				requested: true,
				gauges: [{ pid: 10, parent: 1, created: 1000, cpu: 2, memory: 300 }],
			})
			expect(parseSample('0|')).toStrictEqual({ requested: false, gauges: [] })
			expect(parseSample(READY_LINE)).toBeUndefined()
		})

		it('selects a run tree from rows, and none for a record without a launcher', () => {
			const rows = parseRows('10 1 1000\n11 10 1001\n12 1 1002')
			const run = { started: 1000, launcher: 10, command: undefined }
			expect(selectTree(rows, run, 2000)).toStrictEqual([10, 11])
			expect(selectTree(rows, { ...run, launcher: undefined }, 2000)).toBeUndefined()
		})

		it('extracts the command a mutation wraps and keys a mutation without its edits file', () => {
			const mutate = ['node', '.agents/skills/orkestrel-falsify/scripts/mutate.ts']
			expect(extractMutation([...mutate, '--edits', 'a.md', '--', 'npm', 'test'])).toStrictEqual([
				'npm',
				'test',
			])
			expect(extractMutation([...mutate, '--edits=a.md', '--', 'npm', 'test'])).toStrictEqual([
				'npm',
				'test',
			])
			expect(extractMutation([...mutate, '--restore', 'tmp/probes/mutate/run-x'])).toBeUndefined()
			expect(extractMutation([...mutate, '--edits', 'a.md', '--'])).toBeUndefined()
			expect(extractMutation(['node', 'cases.ts', '--edits', 'a.md', '--', 'x'])).toBeUndefined()
			expect(
				normalizeCommand([...mutate, '--edits', 'a.md', '--', 'x', '--edits', 'b.md']),
			).toStrictEqual([...mutate, '--', 'x', '--edits', 'b.md'])
			expect(normalizeCommand([...mutate, '--edits=a.md', '--', 'x'])).toStrictEqual([
				...mutate,
				'--',
				'x',
			])
			const other = ['node', 'cases.ts', '--edits', 'a.md', '--', 'x']
			expect(normalizeCommand(other)).toBe(other)
			expect(readExecTool(['--yes', '--', 'tsc', '--noEmit'])).toStrictEqual(['tsc', '--noEmit'])
			expect(readExecTool(['--yes'])).toStrictEqual([])
			expect(readExecTool(['--call=tsc'])).toStrictEqual([])
		})

		it('prunes keys past the age bound and past the count bound, newest kept', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const now = Date.now()
			const history = join('root', HISTORY_DIRECTORY)
			bench.scratch.write(
				join(history, 'stale', renderOutcomeName(now - HISTORY_AGE_MS - 1, FIRST_TOKEN)),
				'{}',
			)
			bench.scratch.write(
				join(history, 'edge', renderOutcomeName(now - HISTORY_AGE_MS, FIRST_TOKEN)),
				'{}',
			)
			bench.scratch.ensure(join(history, 'empty'))
			expect(pruneHistory(bench.root, now)).toStrictEqual({ removed: ['stale'], skipped: [] })
			expect(bench.scratch.names(history).toSorted()).toStrictEqual(['edge', 'empty'])
			expect(pruneHistory(bench.root, now)).toStrictEqual({ removed: [], skipped: [] })
		})

		it('skips a stray file under the history and a history that is a file, and throws neither', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const now = Date.now()
			const history = join('root', HISTORY_DIRECTORY)
			bench.scratch.write(join(history, 'stray'), 'x')
			bench.scratch.write(
				join(history, 'stale', renderOutcomeName(now - HISTORY_AGE_MS - 1, FIRST_TOKEN)),
				'{}',
			)
			expect(pruneHistory(bench.root, now)).toStrictEqual({
				removed: ['stale'],
				skipped: ['stray'],
			})
			bench.scratch.remove(history)
			bench.scratch.write(history, 'x')
			expect(pruneHistory(bench.root, now)).toStrictEqual({
				removed: [],
				skipped: [HISTORY_DIRECTORY],
			})
		})

		it('keys a mutation wrapped by npm exec without its edits file, at its own bare --', () => {
			const mutate = ['node', '.agents/skills/orkestrel-falsify/scripts/mutate.ts']
			expect(
				normalizeCommand([...NPM, 'exec', '--', ...mutate, '--edits', 'a.md', '--', 'x']),
			).toStrictEqual([...NPM, 'exec', '--', ...mutate, '--', 'x'])
		})

		it('tallies samples by member and peak and builds the record', () => {
			const gauges = parseGauges('10 1 1000 20000 300; 11 10 1001 10000 200;bad')
			expect(gauges).toStrictEqual([
				{ pid: 10, parent: 1, created: 1000, cpu: 2, memory: 300 },
				{ pid: 11, parent: 10, created: 1001, cpu: 1, memory: 200 },
			])
			const first = tallySample({ cpu: new Map(), memory: 0, processes: 0 }, gauges)
			const second = tallySample(first, parseGauges('10 1 1000 50000 100'))
			expect(second.memory).toBe(500)
			expect(second.processes).toBe(2)
			expect(buildOutcome(second, 1000, 0)).toStrictEqual({
				duration: 1000,
				cpu: 6,
				memory: 500,
				processes: 2,
				code: 0,
			})
		})
	})

	describe('the light admission rule', () => {
		it('wakes a hold waiter when the ticket holds, before and after, and keeps a leave waiter', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const token = new Token()
			onTestFinished(() => token.destroy())
			const endpoint = renderEndpoint(bench.root, FIRST_TOKEN)
			await token.listen(endpoint)
			token.publish()
			const parked = Promise.withResolvers<void>()
			const early = parkOn(endpoint, false, parked.resolve, undefined, true)
			const leave = parkOn(endpoint, false, () => undefined)
			await parked.promise
			await waitForDelay(100)
			token.hold()
			expect(await early).toBeUndefined()
			expect(await parkOn(endpoint, false, () => undefined, undefined, true)).toBeUndefined()
			expect(
				await Promise.race([leave.then(() => 'closed'), waitForDelay(200).then(() => 'open')]),
			).toBe('open')
			await token.destroy()
			expect(await leave).toBeUndefined()
		})

		it('parks a hold waiter that arrives after the ticket leaves until the process ends', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const token = new Token()
			onTestFinished(() => token.destroy())
			const endpoint = renderEndpoint(bench.root, FIRST_TOKEN)
			await token.listen(endpoint)
			token.publish()
			token.hold()
			token.leave()
			const late = parkOn(endpoint, false, () => undefined, undefined, true)
			expect(
				await Promise.race([late.then(() => 'closed'), waitForDelay(200).then(() => 'open')]),
			).toBe('open')
			await token.destroy()
			expect(await late).toBeUndefined()
		})

		it.each([
			['a light ticket behind a light ticket that does not hold', ['light'], [], 'queued'],
			['a light ticket beside a light holder that fits', ['light'], [1], 'holder'],
			['a light ticket beside a heavy holder', ['heavy'], [1], 'holder'],
			['a light ticket behind a solo ticket', ['solo'], [], 'queued'],
			['a light ticket past the slots', ['light', 'light', 'light'], [1, 2, 3], 'queued'],
			['a heavy ticket beside light holders', ['light', 'light'], [1, 2], 'holder'],
			['a heavy ticket behind a heavy ticket', ['light', 'heavy'], [1], 'behind'],
			['a solo ticket behind a light holder', ['light'], [1], 'behind'],
		])('decides %s', async (name, earlier, holding, expected) => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const own = name.startsWith('a light')
				? buildTicket(SECOND_TOKEN, 'own', USAGE)
				: buildTicket(SECOND_TOKEN, 'own', undefined, name.startsWith('a solo'))
			for (const [index, lane] of [...earlier, own].entries()) {
				const ticket =
					typeof lane === 'string'
						? buildTicket(
								`${String(index).repeat(8)}-1111-4111-8111-111111111111`,
								lane,
								lane === 'light' ? USAGE : undefined,
								lane === 'solo',
							)
						: lane
				writeStage(bench.root, ticket)
				linkStage(bench.root, ticket.token)
				bench.scratch.remove(join('root', `${ticket.token}.stage`))
			}
			for (const sequence of holding) {
				writeRun(bench.root, sequence, { started: 0, launcher: undefined, command: undefined })
			}
			const limits = { ...LIMITS, slots: 3 }
			expect(decideTurn(bench.root, earlier.length + 1, SECOND_TOKEN, limits).state).toBe(expected)
		})

		it.each([
			[
				'a light arrival behind a light mutation of its directory that holds',
				{ lane: 'light', edits: false },
				[{ lane: 'light', edits: true, directory: 'same' }],
				[1],
				'behind',
				1,
			],
			[
				'a heavy arrival behind a light mutation of its directory that holds',
				{ lane: 'heavy', edits: false },
				[{ lane: 'light', edits: true, directory: 'same' }],
				[1],
				'behind',
				1,
			],
			[
				'a heavy mutation behind a light holder of its directory',
				{ lane: 'heavy', edits: true },
				[{ lane: 'light', edits: false, directory: 'same' }],
				[1],
				'behind',
				1,
			],
			[
				'a light mutation behind a light holder of its directory',
				{ lane: 'light', edits: true },
				[{ lane: 'light', edits: false, directory: 'same' }],
				[1],
				'behind',
				1,
			],
			[
				'a light mutation behind a heavy holder of its directory',
				{ lane: 'light', edits: true },
				[{ lane: 'heavy', edits: false, directory: 'same' }],
				[1],
				'behind',
				1,
			],
			[
				'a heavy mutation behind the nearest earlier ticket of its directory',
				{ lane: 'heavy', edits: true },
				[
					{ lane: 'light', edits: false, directory: 'same' },
					{ lane: 'light', edits: false, directory: 'other' },
					{ lane: 'light', edits: false, directory: 'same' },
				],
				[1, 2, 3],
				'behind',
				3,
			],
			[
				'a heavy mutation behind an unreadable ticket',
				{ lane: 'heavy', edits: true },
				[{ lane: 'light', edits: false, directory: 'unread' }],
				[],
				'behind',
				1,
			],
			[
				'a light arrival beside a light mutation of another directory',
				{ lane: 'light', edits: false },
				[{ lane: 'light', edits: true, directory: 'other' }],
				[1],
				'holder',
				undefined,
			],
			[
				'a light mutation beside a heavy holder of another directory',
				{ lane: 'light', edits: true },
				[{ lane: 'heavy', edits: false, directory: 'other' }],
				[1],
				'holder',
				undefined,
			],
			[
				'a heavy mutation beside a light holder of another directory',
				{ lane: 'heavy', edits: true },
				[{ lane: 'light', edits: false, directory: 'other' }],
				[1],
				'holder',
				undefined,
			],
			[
				'a light ticket of another directory past a light ticket the directory rule blocks',
				{ lane: 'light', edits: false },
				[
					{ lane: 'heavy', edits: true, directory: 'other' },
					{ lane: 'light', edits: false, directory: 'other' },
				],
				[1],
				'holder',
				undefined,
			],
			[
				'a light ticket past a light mutation the directory rule blocks',
				{ lane: 'light', edits: false },
				[
					{ lane: 'heavy', edits: false, directory: 'other' },
					{ lane: 'light', edits: true, directory: 'other' },
				],
				[1],
				'holder',
				undefined,
			],
			[
				'a light arrival behind a light mutation of its parent directory',
				{ lane: 'light', edits: false },
				[{ lane: 'light', edits: true, directory: 'parent' }],
				[1],
				'behind',
				1,
			],
			[
				'a light arrival behind a light mutation of a child directory',
				{ lane: 'light', edits: false },
				[{ lane: 'light', edits: true, directory: 'child' }],
				[1],
				'behind',
				1,
			],
			[
				'a heavy mutation behind a light holder of a child directory',
				{ lane: 'heavy', edits: true },
				[{ lane: 'light', edits: false, directory: 'child' }],
				[1],
				'behind',
				1,
			],
			[
				'a light arrival beside a light mutation of a sibling directory that shares its name',
				{ lane: 'light', edits: false },
				[{ lane: 'light', edits: true, directory: 'sibling' }],
				[1],
				'holder',
				undefined,
			],
		])('decides by directory: %s', async (_name, own, earlier, holding, expected, entry) => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			for (const [index, item] of earlier.entries()) {
				const token = `${String(index + 1).repeat(8)}-1111-4111-8111-111111111111`
				if (item.directory === 'unread') {
					bench.scratch.write(join('root', renderName(index + 1, TICKET_SUFFIX)), '{')
				} else {
					const ticket = buildTicket(
						token,
						`earlier-${String(index + 1)}`,
						item.lane === 'light' ? USAGE : undefined,
						false,
						item.edits,
					)
					const directories = new Map([
						['other', realpathSync(tmpdir())],
						['child', join(ticket.cwd, 'tests')],
						['parent', dirname(ticket.cwd)],
						['sibling', `${ticket.cwd}-sibling`],
					])
					writeStage(bench.root, { ...ticket, cwd: directories.get(item.directory) ?? ticket.cwd })
					linkStage(bench.root, token)
					bench.scratch.remove(join('root', `${token}.stage`))
				}
			}
			const ticket = buildTicket(
				SECOND_TOKEN,
				'own',
				own.lane === 'light' ? USAGE : undefined,
				false,
				own.edits,
			)
			writeStage(bench.root, ticket)
			linkStage(bench.root, SECOND_TOKEN)
			bench.scratch.remove(join('root', `${SECOND_TOKEN}.stage`))
			for (const sequence of holding) {
				writeRun(bench.root, sequence, { started: 0, launcher: undefined, command: undefined })
			}
			const turn = decideTurn(bench.root, earlier.length + 1, SECOND_TOKEN, LIMITS)
			expect(turn.state).toBe(expected)
			expect(turn.state === 'behind' ? turn.entry.sequence : undefined).toBe(entry)
		})
	})

	// The sampler reads `Win32_Process` through PowerShell, which only Windows serves; on any other host
	// `readMeasure` returns undefined and every ticket is heavy.
	describe.runIf(process.platform === 'win32')('light lanes, driven as processes', () => {
		it('runs every ticket heavy without limits.json and writes no record', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.record(bench.command('one'), [CLEAN, CLEAN, CLEAN])
			bench.record(bench.command('two'), [CLEAN, CLEAN, CLEAN])
			const one = bench.lane('one')
			await bench.meter.reach('enter', 'one')
			const two = bench.lane('two')
			await two.reach('lane: waiting behind "one"')
			expect(bench.meter.present).toStrictEqual(['one'])
			bench.meter.release('one')
			await bench.meter.reach('enter', 'two')
			bench.meter.release('two')
			expect(await Promise.all([one.exit(), two.exit()])).toStrictEqual([0, 0])
			expect(bench.scratch.names(bench.history(bench.command('one')))).toHaveLength(3)
			expect(bench.scratch.names('root')).toStrictEqual([HISTORY_DIRECTORY])
		})

		it('runs every ticket heavy on a malformed limits.json and says so', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.scratch.write(join('root', 'limits.json'), '{"slots":')
			bench.record(bench.command('one'), [CLEAN, CLEAN, CLEAN])
			bench.record(bench.command('two'), [CLEAN, CLEAN, CLEAN])
			const one = bench.lane('one')
			await bench.meter.reach('enter', 'one')
			const two = bench.lane('two')
			await two.reach('lane: waiting behind "one"')
			expect(two.output).toContain('cannot be read as limits')
			bench.meter.releaseAll()
			await bench.meter.reach('enter', 'two')
			bench.meter.release('two')
			expect(await Promise.all([one.exit(), two.exit()])).toStrictEqual([0, 0])
		})

		it('overlaps a heavy ticket and light tickets, and never two heavy tickets', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			bench.record(bench.command('one'), [CLEAN, CLEAN, CLEAN])
			bench.record(bench.command('two'), [CLEAN, CLEAN, CLEAN])
			const alpha = bench.lane('alpha')
			await bench.meter.reach('enter', 'alpha')
			const one = bench.lane('one')
			const two = bench.lane('two')
			await Promise.all([bench.meter.reach('enter', 'one'), bench.meter.reach('enter', 'two')])
			const beta = bench.lane('beta')
			await beta.reach('lane: waiting behind "alpha"')
			expect(bench.meter.present.toSorted()).toStrictEqual(['alpha', 'one', 'two'])
			bench.meter.release('alpha')
			await bench.meter.reach('enter', 'beta')
			expect(bench.meter.present.toSorted()).toStrictEqual(['beta', 'one', 'two'])
			bench.meter.releaseAll()
			expect(await Promise.all([alpha.exit(), one.exit(), two.exit(), beta.exit()])).toStrictEqual([
				0, 0, 0, 0,
			])
			expect(bench.scratch.names('root')).toStrictEqual([HISTORY_DIRECTORY, 'limits.json'])
		})

		it('waits in neither lane behind the other', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			bench.record(bench.command('one'), [CLEAN, CLEAN, CLEAN])
			bench.record(bench.command('two'), [CLEAN, CLEAN, CLEAN])
			const one = bench.lane('one')
			await bench.meter.reach('enter', 'one')
			const alpha = bench.lane('alpha')
			await bench.meter.reach('enter', 'alpha')
			const two = bench.lane('two')
			await bench.meter.reach('enter', 'two')
			expect(bench.meter.present).toStrictEqual(['one', 'alpha', 'two'])
			expect(one.output + alpha.output + two.output).not.toContain('waiting')
			bench.meter.releaseAll()
			expect(await Promise.all([one.exit(), alpha.exit(), two.exit()])).toStrictEqual([0, 0, 0])
		})

		it('holds the slots, and wakes a light waiter on the first earlier light ticket to leave', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit({ ...LIMITS, slots: 2 })
			for (const label of ['one', 'two', 'three']) {
				bench.record(bench.command(label), [CLEAN, CLEAN, CLEAN])
			}
			const one = bench.lane('one')
			await bench.meter.reach('enter', 'one')
			const two = bench.lane('two')
			await bench.meter.reach('enter', 'two')
			const three = bench.lane('three')
			await three.reach('lane: waiting behind "one", "two"')
			expect(bench.meter.present).toStrictEqual(['one', 'two'])
			bench.meter.release('two')
			await bench.meter.reach('enter', 'three')
			expect(bench.meter.present).toStrictEqual(['one', 'three'])
			bench.meter.releaseAll()
			expect(await Promise.all([one.exit(), two.exit(), three.exit()])).toStrictEqual([0, 0, 0])
		})

		it('runs light tickets first in, first out, past a later ticket the budget would admit', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const unit = CLEAN.memory
			bench.limit({ ...LIMITS, budget: { ...LIMITS.budget, memory: unit * 3.5 } })
			bench.record(bench.command('one'), [CLEAN, CLEAN, CLEAN])
			const big = { ...CLEAN, memory: unit * 3 }
			bench.record(bench.command('big'), [big, big, big])
			bench.record(bench.command('small'), [CLEAN, CLEAN, CLEAN])
			const one = bench.lane('one')
			await bench.meter.reach('enter', 'one')
			const large = bench.lane('big')
			await large.reach('lane: waiting behind "one"')
			const small = bench.lane('small')
			await small.reach('lane: waiting behind "one", "big"')
			expect(bench.meter.present).toStrictEqual(['one'])
			bench.meter.release('one')
			await bench.meter.reach('enter', 'big')
			// The head of the light lane always fits; big and small together do not.
			await small.reach('lane: waiting behind "big"')
			expect(bench.meter.present).toStrictEqual(['big'])
			bench.meter.release('big')
			await bench.meter.reach('enter', 'small')
			bench.meter.release('small')
			expect(await Promise.all([one.exit(), large.exit(), small.exit()])).toStrictEqual([0, 0, 0])
			expect(
				bench.meter.marks.filter((mark) => mark.event === 'enter').map((mark) => mark.label),
			).toStrictEqual(['one', 'big', 'small'])
		})

		it('isolates a --solo run from every light ticket', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			bench.record(bench.command('one'), [CLEAN, CLEAN, CLEAN])
			bench.record(bench.command('two'), [CLEAN, CLEAN, CLEAN])
			bench.record(bench.command('sole'), [CLEAN, CLEAN, CLEAN])
			const one = bench.lane('one')
			await bench.meter.reach('enter', 'one')
			const sole = bench.lane('sole', { solo: true })
			await sole.reach('lane: waiting behind "one"')
			const two = bench.lane('two')
			await two.reach('lane: waiting behind "one", "sole"')
			expect(bench.meter.present).toStrictEqual(['one'])
			bench.meter.release('one')
			await bench.meter.reach('enter', 'sole')
			expect(bench.meter.present).toStrictEqual(['sole'])
			bench.meter.release('sole')
			await bench.meter.reach('enter', 'two')
			bench.meter.release('two')
			expect(await Promise.all([one.exit(), sole.exit(), two.exit()])).toStrictEqual([0, 0, 0])
		})

		it('admits a light waiter on the hold of an earlier light ticket that stays live', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			bench.record(bench.command('two'), [CLEAN, CLEAN, CLEAN])
			const token = new Token()
			onTestFinished(() => token.destroy())
			await token.listen(renderEndpoint(bench.root, FIRST_TOKEN))
			writeStage(bench.root, buildTicket(FIRST_TOKEN, 'planted', USAGE))
			linkStage(bench.root, FIRST_TOKEN)
			bench.scratch.remove(join('root', `${FIRST_TOKEN}.stage`))
			token.publish()
			const two = bench.lane('two')
			await two.reach('lane: waiting behind "planted"')
			await waitForDelay(200)
			expect(bench.meter.marks).toStrictEqual([])
			writeRun(bench.root, 1, { started: Date.now(), launcher: undefined, command: undefined })
			token.hold()
			await bench.meter.reach('enter', 'two')
			bench.meter.release('two')
			expect(await two.exit()).toBe(0)
			expect(readSequences(readNames(bench.root))).toStrictEqual([1])
		})

		it('reclaims a dead light ticket a light waiter parks on, and enters', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			bench.record(bench.command('two'), [CLEAN, CLEAN, CLEAN])
			bench.scratch.write(
				join('root', renderName(1, TICKET_SUFFIX)),
				JSON.stringify(buildTicket(THIRD_TOKEN, 'dead', USAGE)),
			)
			const two = bench.lane('two')
			await bench.meter.reach('enter', 'two')
			expect(readSequences(readNames(bench.root))).toStrictEqual([2])
			bench.meter.release('two')
			expect(await two.exit()).toBe(0)
			expect(readSequences(readNames(bench.root))).toStrictEqual([])
		})

		it('reads a ticket of the first release as heavy', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			bench.record(bench.command('one'), [CLEAN, CLEAN, CLEAN])
			const token = new Token()
			onTestFinished(() => token.destroy())
			await token.listen(renderEndpoint(bench.root, FIRST_TOKEN))
			writeStage(bench.root, buildTicket(FIRST_TOKEN, 'planted'))
			linkStage(bench.root, FIRST_TOKEN)
			bench.scratch.remove(join('root', `${FIRST_TOKEN}.stage`))
			writeRun(bench.root, 1, { started: Date.now(), launcher: undefined, command: undefined })
			const one = bench.lane('one')
			await bench.meter.reach('enter', 'one')
			const alpha = bench.lane('alpha')
			await alpha.reach('lane: waiting behind "planted"')
			expect(bench.meter.present).toStrictEqual(['one'])
			bench.scratch.remove(join('root', renderName(1, RUN_SUFFIX)))
			bench.scratch.remove(join('root', renderName(1, TICKET_SUFFIX)))
			await token.destroy()
			await bench.meter.reach('enter', 'alpha')
			bench.meter.releaseAll()
			expect(await Promise.all([one.exit(), alpha.exit()])).toStrictEqual([0, 0])
		})

		it('ends a light run past its threshold with exit 69, and its next arrival queues heavy', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit({ ...LIMITS, threshold: { ...LIMITS.threshold, processes: 2 } })
			const command = bench.command('wide', 'branch')
			const narrow = { ...CLEAN, processes: 2 }
			bench.record(command, [narrow, narrow, narrow])
			const breached = bench.lane('wide', { grandchild: 'branch' })
			expect(await breached.exit()).toBe(BREACH_CODE)
			expect(breached.output).toContain('passed the light threshold')
			const records = readOutcomes(bench.root, renderKey(realpathSync(WORKSPACE_ROOT), command))
			expect(records.at(-1)).toMatchObject({ code: BREACH_CODE })
			expect(records.at(-1)?.processes).toBeGreaterThan(2)
			await Promise.all([bench.meter.closure('wide'), bench.meter.closure('branch')])
			const alpha = bench.lane('alpha')
			await bench.meter.reach('enter', 'alpha')
			const again = bench.lane('wide', { grandchild: 'branch' })
			await again.reach('lane: waiting behind "alpha"')
			bench.meter.release('alpha')
			await bench.meter.reach('leave', 'alpha')
			await waitForCondition(
				'the second wide run joins the meter',
				() => bench.meter.present.includes('wide'),
				{ budget: 45_000, interval: 10 },
			)
			bench.meter.releaseAll()
			expect(await Promise.all([alpha.exit(), again.exit()])).toStrictEqual([0, 0])
		})

		it('lands both records of two concurrent runs of one command, with the sampled tree', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			const command = [process.execPath, '-e', 'setTimeout(() => undefined, 3000)']
			bench.record(command, [CLEAN, CLEAN, CLEAN])
			const runs = ['first', 'second'].map((label) =>
				bench.spawn([...renderLaneFlags(bench.root, bench.journals, label), '--', ...command]),
			)
			expect(await Promise.all(runs.map((run) => run.exit()))).toStrictEqual([0, 0])
			const names = bench.scratch.names(bench.history(command))
			expect(names).toHaveLength(RECENT_RUNS)
			expect(names[0]).toBe(`${String(3).padStart(15, '0')}-seeded.json`)
			const key = renderKey(realpathSync(WORKSPACE_ROOT), command)
			for (const outcome of readOutcomes(bench.root, key).slice(1)) {
				expect(outcome?.code).toBe(0)
				expect(outcome?.duration).toBeGreaterThanOrEqual(3000)
				expect(outcome?.processes).toBeGreaterThanOrEqual(2)
				expect(outcome?.memory).toBeGreaterThan(0)
			}
		})

		it('runs a light command at below-normal priority and a heavy one at normal', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			bench.record(bench.command('one'), [CLEAN, CLEAN, CLEAN])
			const one = bench.lane('one')
			const alpha = bench.lane('alpha')
			await Promise.all([bench.meter.reach('enter', 'one'), bench.meter.reach('enter', 'alpha')])
			const [light, heavy] = ['one', 'alpha'].map((label) =>
				Number(readFileSync(`${join(bench.journals, `${label}.jsonl`)}.pid`, 'utf8').trim()),
			)
			// A heavy child inherits this run's own priority, which is below normal when the lane runs this file light.
			expect(readProcessPriority(light ?? 0)).toBe(6)
			expect(readProcessPriority(heavy ?? 0)).toBe(readProcessPriority(process.pid))
			bench.meter.releaseAll()
			expect(await Promise.all([one.exit(), alpha.exit()])).toStrictEqual([0, 0])
		})

		it('ends the sampler with the lane, and with its own stdin', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			const holder = bench.lane('holder')
			await bench.meter.reach('enter', 'holder')
			await waitForCondition(
				'the run record names the launcher',
				() => {
					const run = readRun(bench.root, 1)
					return typeof run === 'object' && run.launcher !== undefined
				},
				{ budget: 45_000, interval: 10 },
			)
			const run = readRun(bench.root, 1)
			const launcher = typeof run === 'object' ? run.launcher : undefined
			await waitForCondition(
				'the sampler is a child of the lane',
				() =>
					readSnapshot()?.some((row) => row.parent === holder.pid && row.pid !== launcher) === true,
				{ budget: 45_000, interval: 10 },
			)
			const sampler = readSnapshot()?.find(
				(row) => row.parent === holder.pid && row.pid !== launcher,
			)?.pid
			expect(sampler).toBeDefined()
			await holder.kill()
			await waitForCondition(
				'the sampler is gone',
				() => readSnapshot()?.every((row) => row.pid !== sampler) === true,
				{ budget: 45_000, interval: 10 },
			)
			const own = new Sampler(undefined, () => undefined)
			const pid = own.pid
			expect(await own.ready(READY_MS)).toBe(true)
			const rows = await own.sample()
			expect(rows?.some((row) => row.pid === process.pid)).toBe(true)
			await own.stop()
			expect(readSnapshot()?.some((row) => row.pid === pid)).toBe(false)
			expect(await own.sample()).toBeUndefined()
		})

		it('names each ticket lane and every holder in --status', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			bench.record(bench.command('one'), [CLEAN, CLEAN, CLEAN])
			bench.record(bench.command('two'), [CLEAN, CLEAN, CLEAN])
			const runs = [bench.lane('alpha')]
			await bench.meter.reach('enter', 'alpha')
			runs.push(bench.lane('one'))
			await bench.meter.reach('enter', 'one')
			runs.push(bench.lane('two'))
			await bench.meter.reach('enter', 'two')
			runs.push(bench.lane('beta'))
			await runs[3]?.reach('lane: waiting behind "alpha"')
			await waitForCondition(
				'every holder has its run record',
				() =>
					[1, 2, 3].every((sequence) =>
						bench.scratch.has(join('root', renderName(sequence, RUN_SUFFIX))),
					),
				{ budget: 45_000, interval: 10 },
			)
			const json = runSkillScript(LANE_SCRIPT, ['--status', '--root', bench.root, '--json'])
			const text = runSkillScript(LANE_SCRIPT, ['--status', '--root', bench.root])
			expect(JSON.parse(json.stdout)).toMatchObject({
				holder: { label: 'alpha' },
				tickets: [
					{ label: 'alpha', light: false, solo: false, holding: true },
					{ label: 'one', light: true, holding: true },
					{ label: 'two', light: true, holding: true },
					{ label: 'beta', light: false, holding: false, state: 'live' },
				],
			})
			expect(text.stdout).toContain('holder: "alpha"')
			expect(text.stdout).toContain('light: "one", "two"')
			expect(text.stdout).toContain('live heavy holding "alpha"')
			expect(text.stdout).toContain('live light holding "one"')
			expect(text.stdout).toContain('live heavy "beta"')
			bench.meter.releaseAll()
			await bench.meter.reach('enter', 'beta')
			bench.meter.release('beta')
			expect(await Promise.all(runs.map((run) => run.exit()))).toStrictEqual([0, 0, 0, 0])
		})
	})

	describe.runIf(process.platform === 'win32')('the light-lane follow-ups', () => {
		it('prunes a history key past the age bound when a run opens a key, and keeps a recent one', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			const history = join('root', HISTORY_DIRECTORY)
			const now = Date.now()
			bench.scratch.write(
				join(history, 'stale', renderOutcomeName(now - HISTORY_AGE_MS - 60_000, FIRST_TOKEN)),
				JSON.stringify(CLEAN),
			)
			bench.scratch.write(
				join(history, 'recent', renderOutcomeName(now - 60_000, FIRST_TOKEN)),
				JSON.stringify(CLEAN),
			)
			const command = [process.execPath, '-e', '']
			const run = bench.spawn([
				...renderLaneFlags(bench.root, bench.journals, 'opener'),
				'--',
				...command,
			])
			expect(await run.exit()).toBe(0)
			const key = renderKey(realpathSync(WORKSPACE_ROOT), command)
			expect(bench.scratch.names(history).toSorted()).toStrictEqual(['recent', key].toSorted())
		})

		it('keeps the latest keys up to the count bound when a run opens a key', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			const history = join('root', HISTORY_DIRECTORY)
			const now = Date.now()
			const extra = 5
			for (const index of Array.from({ length: HISTORY_KEYS + extra }, (_value, item) => item)) {
				bench.scratch.write(
					join(
						history,
						`key${String(index).padStart(4, '0')}`,
						renderOutcomeName(now - 600_000 + index, FIRST_TOKEN),
					),
					JSON.stringify(CLEAN),
				)
			}
			const command = [process.execPath, '-e', '']
			const run = bench.spawn([
				...renderLaneFlags(bench.root, bench.journals, 'opener'),
				'--',
				...command,
			])
			expect(await run.exit()).toBe(0)
			const names = bench.scratch.names(history)
			expect(names).toHaveLength(HISTORY_KEYS)
			expect(names).toContain(renderKey(realpathSync(WORKSPACE_ROOT), command))
			expect(names).not.toContain('key0000')
			expect(names).not.toContain(`key${String(extra).padStart(4, '0')}`)
			expect(names).toContain(`key${String(extra + 1).padStart(4, '0')}`)
		})

		it('measures a run shorter than the sample interval', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			// The command ends before a sampler that starts beside the launcher can read it.
			const command = [process.execPath, '-e', 'setTimeout(() => undefined, 150)']
			const run = bench.spawn([
				...renderLaneFlags(bench.root, bench.journals, 'short'),
				'--',
				...command,
			])
			expect(await run.exit()).toBe(0)
			const [outcome] = readOutcomes(bench.root, renderKey(realpathSync(WORKSPACE_ROOT), command))
			expect(outcome?.processes).toBeGreaterThanOrEqual(2)
			expect(outcome?.memory).toBeGreaterThan(0)
		})

		it('exits within half a sample interval of its release', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			const ticket = join('root', renderName(1, TICKET_SUFFIX))
			const run = bench.spawn([
				...renderLaneFlags(bench.root, bench.journals, 'quick'),
				'--',
				process.execPath,
				'-e',
				'',
			])
			await waitForCondition('the ticket is published', () => bench.scratch.has(ticket), {
				budget: 45_000,
				interval: 5,
			})
			await waitForCondition('the ticket is released', () => !bench.scratch.has(ticket), {
				budget: 45_000,
				interval: 5,
			})
			const released = performance.now()
			expect(await run.exit()).toBe(0)
			expect(performance.now() - released).toBeLessThan(SAMPLE_MS / 2)
		})

		it('keeps the exit when a stray file sits under the history', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			bench.scratch.write(join('root', HISTORY_DIRECTORY, 'stray'), 'x')
			const run = bench.spawn([
				...renderLaneFlags(bench.root, bench.journals, 'opener'),
				'--',
				process.execPath,
				'-e',
				'',
			])
			expect(await run.exit()).toBe(0)
			expect(run.output).not.toContain('refused the run')
			expect(run.output.split(/\r\n|\n/u).filter((line) => line.includes('prune'))).toHaveLength(1)
		})

		it('leaves no sampler process after a refused arrival', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			bench.record(bench.command('one'), [CLEAN, CLEAN, CLEAN])
			bench.scratch.write(join('root', renderName(1, TICKET_SUFFIX)), '{')
			const refused = bench.lane('one')
			expect(await refused.exit()).toBe(75)
			expect(refused.output).toContain('cannot be read')
			expect(readSnapshot()?.some((row) => row.parent === refused.pid)).toBe(false)
		})

		it('bounds the wait for a sampler that never readies, and destroys it', async () => {
			const stalled = new Sampler(undefined, () => undefined, 'Start-Sleep -Seconds 60')
			const pid = stalled.pid
			expect(await stalled.ready(200)).toBe(false)
			await stalled.destroy()
			expect(readSnapshot()?.some((row) => row.pid === pid)).toBe(false)
			expect(READY_MS).toBeGreaterThan(SAMPLE_MS)
		})

		it('holds a light arrival back behind a live mutation of its directory', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			bench.record(bench.command('one'), [CLEAN, CLEAN, CLEAN])
			const mutation = new Token()
			onTestFinished(() => mutation.destroy())
			await mutation.listen(renderEndpoint(bench.root, THIRD_TOKEN))
			writeStage(bench.root, buildTicket(THIRD_TOKEN, 'mutation', USAGE, false, true))
			linkStage(bench.root, THIRD_TOKEN)
			bench.scratch.remove(join('root', `${THIRD_TOKEN}.stage`))
			writeRun(bench.root, 1, { started: Date.now(), launcher: undefined, command: undefined })
			mutation.publish()
			mutation.hold()
			const one = bench.lane('one')
			await Promise.race([
				one.reach('lane: waiting behind "mutation"'),
				bench.meter.reach('enter', 'one'),
			])
			expect(bench.meter.present).not.toContain('one')
			bench.scratch.remove(join('root', renderName(1, RUN_SUFFIX)))
			await mutation.destroy()
			await bench.meter.reach('enter', 'one')
			bench.meter.release('one')
			expect(await one.exit()).toBe(0)
		})

		it('classes a mutation by its wrapped command under one key, light beside a live ticket of its directory', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			const run = {
				root: bench.root,
				label: 'mutation',
				journal: 'run.jsonl',
				errors: 'run.err',
				cap: 40,
				solo: false,
			}
			const script = ['node', '.agents/skills/orkestrel-falsify/scripts/mutate.ts', '--edits']
			const wrapped = ['--', ...NPM, 'run', 'test:skills']
			const { cores, memory, processes } = LIMITS.threshold
			const first = await readMeasure(
				{ ...run, command: [...script, 'tmp/units/one/edits.md', ...wrapped] },
				FIRST_TOKEN,
			)
			const second = await readMeasure(
				{ ...run, command: [...script, 'tmp/units/live-two/edits.md', ...wrapped] },
				SECOND_TOKEN,
			)
			expect(first?.light).toStrictEqual({ cores, memory, processes })
			expect(second?.light).toStrictEqual({ cores, memory, processes })
			expect(first?.key).toBe(second?.key)
			// The control: a wrapped command that seeds nothing keeps a mutation heavy before its records.
			const unseeded = await readMeasure(
				{ ...run, command: [...script, 'tmp/units/four/edits.md', '--', 'node', '-e', ''] },
				FIRST_TOKEN,
			)
			expect(unseeded?.light).toBeUndefined()
			const neighbor = new Token()
			onTestFinished(() => neighbor.destroy())
			await neighbor.listen(renderEndpoint(bench.root, THIRD_TOKEN))
			writeStage(bench.root, buildTicket(THIRD_TOKEN, 'neighbor'))
			linkStage(bench.root, THIRD_TOKEN)
			bench.scratch.remove(join('root', `${THIRD_TOKEN}.stage`))
			neighbor.publish()
			const beside = await readMeasure(
				{ ...run, command: [...script, 'tmp/units/three/edits.md', ...wrapped] },
				FIRST_TOKEN,
			)
			expect(beside?.key).toBe(first?.key)
			expect(beside?.light).toStrictEqual({ cores, memory, processes })
		})

		it('marks a ticket that carries edits in --status, in its text and its JSON', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const mutation = new Token()
			onTestFinished(() => mutation.destroy())
			await mutation.listen(renderEndpoint(bench.root, THIRD_TOKEN))
			writeStage(bench.root, buildTicket(THIRD_TOKEN, 'mutation', undefined, false, true))
			linkStage(bench.root, THIRD_TOKEN)
			bench.scratch.remove(join('root', `${THIRD_TOKEN}.stage`))
			mutation.publish()
			const status = await readStatus(bench.root)
			expect(status.tickets).toMatchObject([{ label: 'mutation', edits: true }])
			expect(renderStatus(status)).toContain('live heavy edits "mutation"')
			const json = runSkillScript(LANE_SCRIPT, ['--status', '--root', bench.root, '--json'])
			expect(JSON.parse(json.stdout)).toMatchObject({ tickets: [{ edits: true }] })
		})

		it('folds the case of a directory, reads a vanished one without a throw or a match, and compares by containment', () => {
			const cwd = realpathSync(WORKSPACE_ROOT)
			expect(normalizeDirectory(cwd.toUpperCase())).toBe(normalizeDirectory(cwd.toLowerCase()))
			const gone = join(realpathSync(tmpdir()), `lane-gone-${randomUUID()}`)
			expect(() => normalizeDirectory(gone)).not.toThrow()
			expect(sharesDirectory(gone, cwd)).toBe(false)
			expect(sharesDirectory(cwd.toUpperCase(), cwd)).toBe(true)
			expect(sharesDirectory(join(cwd, 'tests'), cwd)).toBe(true)
			expect(sharesDirectory(cwd, join(cwd, 'tests'))).toBe(true)
			expect(sharesDirectory(`${cwd}-sibling`, cwd)).toBe(false)
		})

		it('publishes edits in the ticket of a real mutate command', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			const holder = new Token()
			onTestFinished(() => holder.destroy())
			await holder.listen(renderEndpoint(bench.root, FIRST_TOKEN))
			writeStage(bench.root, buildTicket(FIRST_TOKEN, 'holder'))
			linkStage(bench.root, FIRST_TOKEN)
			bench.scratch.remove(join('root', `${FIRST_TOKEN}.stage`))
			holder.publish()
			const mutation = bench.spawn([
				...renderLaneFlags(bench.root, bench.journals, 'mutation'),
				'--',
				process.execPath,
				'.agents/skills/orkestrel-falsify/scripts/mutate.ts',
				'--edits',
				join(bench.journals, 'edits.md'),
				'--',
				process.execPath,
				'-e',
				'',
			])
			await mutation.reach('lane: waiting behind "holder"')
			expect(readQueue(bench.root).map((entry) => entry.ticket?.edits)).toStrictEqual([
				undefined,
				true,
			])
			await mutation.kill()
		})

		it('runs the command unmeasured and records nothing past the ready bound', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			writeStage(bench.root, buildTicket(FIRST_TOKEN, 'stalled'))
			const sequence = linkStage(bench.root, FIRST_TOKEN)
			bench.scratch.remove(join('root', `${FIRST_TOKEN}.stage`))
			const sampler = new Sampler(undefined, () => undefined, 'Start-Sleep -Seconds 60')
			onTestFinished(() => sampler.destroy())
			const options = {
				root: bench.root,
				label: 'stalled',
				journal: join(bench.journals, 'stalled.jsonl'),
				errors: join(bench.journals, 'stalled.err'),
				cap: 40,
				solo: false,
				command: [process.execPath, '-e', ''],
			}
			const measure = { limits: LIMITS, key: 'stalled', token: FIRST_TOKEN, light: undefined }
			expect(
				await runHolder(options, resolveLauncher(), sequence, measure, undefined, sampler),
			).toBe(0)
			expect(bench.scratch.has(join('root', HISTORY_DIRECTORY))).toBe(false)
			expect(bench.scratch.has(join('root', renderName(sequence, TICKET_SUFFIX)))).toBe(false)
		}, 30_000)

		it('bounds the handover of a sampler that hangs after it readied, and records nothing', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			writeStage(bench.root, buildTicket(FIRST_TOKEN, 'hung'))
			const sequence = linkStage(bench.root, FIRST_TOKEN)
			bench.scratch.remove(join('root', `${FIRST_TOKEN}.stage`))
			const sampler = new Sampler(
				undefined,
				() => undefined,
				`[Console]::Out.WriteLine('${READY_LINE}');[Console]::Out.Flush();Start-Sleep -Seconds 60`,
			)
			onTestFinished(() => sampler.destroy())
			const options = {
				root: bench.root,
				label: 'hung',
				journal: join(bench.journals, 'hung.jsonl'),
				errors: join(bench.journals, 'hung.err'),
				cap: 40,
				solo: false,
				command: [process.execPath, '-e', ''],
			}
			const measure = { limits: LIMITS, key: 'hung', token: FIRST_TOKEN, light: undefined }
			const started = performance.now()
			expect(
				await runHolder(options, resolveLauncher(), sequence, measure, undefined, sampler),
			).toBe(0)
			expect(performance.now() - started).toBeLessThan(HANDOVER_MS * 3)
			expect(bench.scratch.has(join('root', HISTORY_DIRECTORY))).toBe(false)
			const pid = sampler.pid
			expect(readSnapshot()?.some((row) => row.pid === pid)).toBe(false)
		}, 30_000)

		it('bounds the stop of a sampler that ignores its stdin', async () => {
			const sampler = new Sampler(
				undefined,
				() => undefined,
				`[Console]::Out.WriteLine('${READY_LINE}');[Console]::Out.Flush();Start-Sleep -Seconds 60`,
			)
			onTestFinished(() => sampler.destroy())
			expect(await sampler.ready(READY_MS)).toBe(true)
			const pid = sampler.pid
			await sampler.stop()
			expect(readSnapshot()?.some((row) => row.pid === pid)).toBe(false)
		}, 30_000)

		it.each([
			['dies, or exits 70 and its tree ends', false],
			['exits 69 and releases', true],
		])('resumes a waiter behind a mutation holder that %s', async (_name, released) => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			bench.record(bench.command('one'), [CLEAN, CLEAN, CLEAN])
			const mutation = new Token()
			onTestFinished(() => mutation.destroy())
			await mutation.listen(renderEndpoint(bench.root, THIRD_TOKEN))
			writeStage(bench.root, buildTicket(THIRD_TOKEN, 'mutation', undefined, false, true))
			linkStage(bench.root, THIRD_TOKEN)
			bench.scratch.remove(join('root', `${THIRD_TOKEN}.stage`))
			const started = Date.now()
			const ended = spawnSync(process.execPath, ['-e', ''], { windowsHide: true })
			writeRun(bench.root, 1, { started, launcher: ended.pid, command: undefined })
			mutation.publish()
			mutation.hold()
			const one = bench.lane('one')
			await one.reach('lane: waiting behind "mutation"')
			if (released) {
				bench.scratch.remove(join('root', renderName(1, RUN_SUFFIX)))
				bench.scratch.remove(join('root', renderName(1, TICKET_SUFFIX)))
			}
			await mutation.destroy()
			await bench.meter.reach('enter', 'one')
			bench.meter.release('one')
			expect(await one.exit()).toBe(0)
			expect(bench.scratch.has(join('root', renderName(1, TICKET_SUFFIX)))).toBe(false)
		})
	})
})

describe('the parseArgs refusals', () => {
	it('names the flag parseArgs refuses through the source, a linked directory, and the built twin, and leaves the directory untouched', () => {
		expect(runFlagRefusals(LANE_SCRIPT, OPTIONS)).toStrictEqual([])
	})
})
