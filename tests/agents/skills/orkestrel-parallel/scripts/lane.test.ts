import { existsSync, readFileSync, realpathSync } from 'node:fs'
import { tmpdir, userInfo } from 'node:os'
import { join } from 'node:path'
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
} from '../../../../setupServer.js'
import {
	BREACH_CODE,
	buildOutcome,
	buildTicket,
	classifyLight,
	decideTurn,
	fitsBudget,
	FLAGS,
	HISTORY_DIRECTORY,
	isBreach,
	isGone,
	isLimits,
	isTicket,
	KILL_BUDGET,
	killMembers,
	linkStage,
	measurePeak,
	parkOn,
	parseGauges,
	parseRows,
	RECENT_RUNS,
	quote,
	readCommandId,
	readLimits,
	readMissingFlags,
	readNames,
	readOption,
	readOutcomeNames,
	readOutcomes,
	readPositionals,
	readQueue,
	readRun,
	readSeed,
	readSequences,
	readSnapshot,
	readStatus,
	readTree,
	readUnknownFlags,
	reclaimTicket,
	renderEndpoint,
	renderKey,
	renderOutcomeName,
	renderRunName,
	renderStatus,
	renderTicketName,
	resolveLauncher,
	resolveRoot,
	Sampler,
	selectMembers,
	sweepTree,
	tallySample,
	Token,
	TOKEN_PATTERN,
	VALUE_FLAGS,
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
			expect(readOption(['--label', 'one', '--label', 'two'], '--label')).toBe('one')
			expect(readOption(['--label', '--cap'], '--label')).toBeUndefined()
			expect(readMissingFlags(['--label', '--cap', '5'], VALUE_FLAGS)).toStrictEqual(['--label'])
			expect(readUnknownFlags(['--cap=5', '--', '--anything'], FLAGS)).toStrictEqual(['--cap=5'])
			expect(readPositionals(['--cap', '5', 'stray'], VALUE_FLAGS)).toStrictEqual(['stray'])
			expect(quote('x'.repeat(100))).toBe(`"${'x'.repeat(80)}…"`)
		})

		it.each([
			['no arguments', []],
			['an unknown flag', ['--nope']],
			['the equals form', ['--cap=5']],
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

		it('resolves the sibling launcher by the running extension', () => {
			expect(resolveLauncher()).toBe(join(WORKSPACE_ROOT, LAUNCH_SCRIPT))
		})
	})

	describe('the launcher the lane depends on', () => {
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
			bench.scratch.write(join('root', renderTicketName(1)), '{}')
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
			bench.scratch.write(join('root', renderTicketName(1)), text)
			const run = bench.lane('arrival')
			expect(await run.exit()).toBe(75)
			expect(run.output).toContain(expected)
			expect(bench.meter.marks).toStrictEqual([])
			expect(bench.scratch.names('root')).toStrictEqual([renderTicketName(1)])
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
				join('root', renderTicketName(1)),
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
				join('root', renderTicketName(1)),
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
				join('root', renderTicketName(1)),
				JSON.stringify(buildTicket(FIRST_TOKEN, 'dead')),
			)
			writeRun(bench.root, 1, { started, launcher: living.pid, command: undefined })
			const refused = bench.lane('refused')
			expect(await refused.exit()).toBe(75)
			expect(refused.output).toContain('"dead"')
			expect(refused.output).toContain(renderRunName(1))
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
				join('root', renderTicketName(1)),
				JSON.stringify(buildTicket(FIRST_TOKEN, 'dead')),
			)
			writeRun(bench.root, 1, { started: Date.now(), launcher: undefined, command: undefined })
			const refused = bench.lane('refused')
			expect(await refused.exit()).toBe(75)
			expect(refused.output).toContain('before its tree could be identified')
			expect(refused.output).toContain(renderRunName(1))
			expect(bench.meter.marks).toStrictEqual([])
			expect(bench.scratch.has(join('root', renderTicketName(1)))).toBe(true)
		})

		it('refuses a dead ticket whose run record is malformed', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.scratch.write(join('root', renderRunName(1)), 'not json')
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
				() => bench.scratch.has(join('root', renderRunName(1))),
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
				join('root', renderTicketName(1)),
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
			bench.scratch.write(join('root', renderTicketName(1)), 'not json')
			bench.scratch.write(
				join('root', renderTicketName(2)),
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
			['two projects', [...VITEST, '--project', 'skills', '--project', 'policy'], undefined],
			['inline code', ['node', '-e', 'process.exit(0)'], undefined],
			['a checkout path that holds a heavy word', ['/live/node', '/live/oxlint', '.'], 'light'],
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

		it('reads a ticket of the first release as heavy', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			bench.record(bench.command('one'), [CLEAN, CLEAN, CLEAN])
			const token = new Token()
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
			bench.scratch.remove(join('root', renderRunName(1)))
			bench.scratch.remove(join('root', renderTicketName(1)))
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
			expect(readProcessPriority(light ?? 0)).toBe(6)
			expect(readProcessPriority(heavy ?? 0)).toBe(8)
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
			const own = new Sampler(Date.now(), undefined, () => undefined)
			const pid = own.pid
			await own.stop()
			expect(readSnapshot()?.some((row) => row.pid === pid)).toBe(false)
		})

		it('names each ticket lane and every holder in --status', async () => {
			const bench = await startLaneBench()
			onTestFinished(() => bench.destroy())
			bench.limit(LIMITS)
			bench.record(bench.command('one'), [CLEAN, CLEAN, CLEAN])
			bench.record(bench.command('two'), [CLEAN, CLEAN, CLEAN])
			const runs = [bench.lane('alpha')]
			await bench.meter.reach('enter', 'alpha')
			runs.push(bench.lane('one'), bench.lane('two'))
			await Promise.all([bench.meter.reach('enter', 'one'), bench.meter.reach('enter', 'two')])
			runs.push(bench.lane('beta'))
			await runs[3]?.reach('lane: waiting behind "alpha"')
			await waitForCondition(
				'every holder has its run record',
				() =>
					[1, 2, 3].every((sequence) => bench.scratch.has(join('root', renderRunName(sequence)))),
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
})
