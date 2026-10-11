import type { MatrixExecution, MatrixRun } from '../matrix/types.js'
import type { Config, RunArm } from '../types.js'
import { it } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { isRecord } from '@orkestrel/contract'
import { Driver, parseFlags, readCopy } from '../Driver.js'
import { HARNESS, COPIES_DIR } from '../constants.js'
import { readJSON, readRows } from '../helpers.js'
import { hashFile } from '../refit/helpers.js'
import { Matrix } from '../matrix/Matrix.js'
import { Comparison } from '../matrix/Comparison.js'
import { writeDeploymentFixture } from '../matrix/tests/helpers.js'
import { parseMatrixRun } from '../matrix/parsers.js'
import { isMatrixDevelopment, isMatrixExecution, isMatrixRequest } from '../matrix/validators.js'
import {
	readExecution,
	readDevelopment,
	readFrozen,
	readAttempt,
	isParserRequest,
	isStoppedRequest,
	permitsReserve,
	permitsContinuation,
	verifyMatrixFeasibility,
	listMatrixPairFailures,
	measureMatrixCosts,
} from '../matrix/helpers.js'
import { MatrixPeer } from './matrixFixture.js'
import { writeDevelopmentFixture } from './refit/helpers.js'

it('runs the fixed development policy in every real arm, retains parser-failed work, and isolates qualification', async () => {
	const parent = resolve('tmp/units/aggregate-development-execution-fixtures')
	mkdirSync(parent, { recursive: true })
	const directory = mkdtempSync(join(parent, 'development-'))
	const peer = new MatrixPeer()
	peer.support = true
	peer.agreement = 0.75
	const url = await peer.start()
	try {
		const seed = join(directory, 'seed.jsonl')
		writeFileSync(seed, '')
		const frozenPath = join(directory, 'freeze', 'manifest.json')
		await Matrix.execute([
			'freeze',
			'--deployment',
			writeDeploymentFixture(directory),
			'--key',
			'q2',
			'--think',
			'false',
			'--seed',
			seed,
			'--settings',
			join(HARNESS, 'bench5', 'settings.json'),
			'--out',
			join(directory, 'freeze'),
			'--live',
			'--url',
			url,
		])
		const frozen = readFrozen(hashFile(frozenPath))
		const policy = writeDevelopmentFixture(directory, frozenPath)
		const policyPath = join(directory, 'development.json')
		writeFileSync(policyPath, JSON.stringify(policy))
		assert.ok(isMatrixDevelopment(policy))
		for (const change of [
			{ agree: 0.68 },
			{ change: 0.57 },
			{ separated: true },
			{ accepted: true },
			{ continuation: 'retry' },
			{ limitation: '' },
		])
			assert.equal(isMatrixDevelopment({ ...policy, ...change }), false)
		const base: MatrixExecution = {
			protocol: 'l6',
			phase: 'development',
			key: 'q2',
			think: false,
			arm: 'records',
			copy: 1,
			frozen: hashFile(frozenPath),
			budget: policy.paired,
			development: hashFile(policyPath),
		}
		assert.ok(isMatrixExecution(base))
		for (const change of [
			{ copy: 2 },
			{ phase: 'evaluation' },
			{ phase: 'pilot' },
			{ fit: policy.diagnosis },
			{ development: undefined },
		])
			assert.equal(isMatrixExecution({ ...base, ...change }), false)
		assert.throws(() => readDevelopment({ ...base, budget: policy.expanded }, frozen), /budget/)
		assert.throws(
			() => readDevelopment({ ...base, key: 'g2' }, frozen),
			/execution identity differs/,
		)
		assert.throws(
			() => readDevelopment({ ...base, think: true }, frozen),
			/execution identity differs/,
		)
		assert.throws(
			() =>
				readDevelopment(base, {
					...frozen,
					decision: { ...frozen.decision, digest: '0'.repeat(64) },
				}),
			/decision changed/,
		)
		assert.throws(() => readDevelopment(base, { ...frozen, seed: frozen.settings }), /seed changed/)
		assert.throws(
			() =>
				readDevelopment(base, {
					...frozen,
					files: frozen.files.map((file) =>
						file.path.endsWith('Support.ts') ? { ...file, hash: '0'.repeat(64) } : file,
					),
				}),
			/semantic input changed/,
		)
		const stale = readFileSync(policyPath, 'utf8')
		writeFileSync(policyPath, `${stale}\n`)
		assert.throws(() => readDevelopment(base, frozen), /custody mismatch/)
		writeFileSync(policyPath, stale)
		const runs = new Map<RunArm, MatrixRun>()
		const arms: readonly RunArm[] = ['records', 'aggregate', 'full']
		for (const arm of arms) {
			peer.decisions = 0
			peer.parser = 2
			const execution: MatrixExecution = {
				...base,
				arm,
				budget: arm === 'full' ? policy.expanded : policy.paired,
			}
			const manifest = join(directory, `${arm}-development.json`)
			writeFileSync(manifest, JSON.stringify(execution))
			assert.deepEqual(readExecution(manifest).execution, execution)
			assert.throws(
				() =>
					readAttempt({
						execution: hashFile(manifest),
						run: directory,
						budget: execution.budget,
						accepted: true,
						failures: [],
						resource: false,
						files: [],
					}),
				/attempt execution differs/,
			)
			const cache = join(directory, `${arm}-cache`)
			mkdirSync(cache)
			writeFileSync(join(cache, 'judge.jsonl'), readFileSync(seed))
			const out = join(directory, arm)
			const flags = [
				'--run',
				'--live',
				'--copy',
				'1',
				'--manifest',
				manifest,
				'--cache',
				cache,
				'--out',
				out,
				'--url',
				url,
			]
			assert.equal(parseFlags([...flags, '--fit', policyPath]).success, false)
			assert.equal(parseFlags([...flags, '--goals', 'g01']).success, false)
			const config = parseFlags(flags)
			assert.ok(config.success, config.success ? '' : config.error)
			if (arm === 'records') {
				const changes: ReadonlyArray<Partial<Config>> = [
					{ copy: 2 },
					{ goals: ['g01'] },
					{ key: 'g2' },
					{ model: 'unbound-model' },
					{ arm: 'full' },
					{ think: true },
					{ reserve: 1024 },
					{ frozen: undefined },
					{ frozen: { ...frozen, seed: frozen.settings } },
					{ allowance: frozen.configuration.allowance },
					{ retry: frozen.configuration.retry },
					{ predict: frozen.configuration.predict },
					{ settings: policyPath },
					{ fit: policyPath },
					{ studyPath: policyPath },
					{
						runtime: {
							id: 'substitution',
							system: '',
							topics: [],
							days: [],
							seed: [],
							tools: {},
							lookups: [],
							goals: [],
						},
					},
					{
						study: {
							protocol: 'e1',
							key: 'q2',
							think: false,
							arm: 'records',
							phase: 'development',
							frozen: execution.frozen,
							resource: policy.resource,
							runtime: policy.packet,
							budget: policy.paired,
							limits: {
								calls: 1,
								tokens: 1,
								retries: 0,
								wall: 1,
								goals: 1,
								derivation: 'substitution',
								evidence: [],
							},
						},
					},
				]
				for (const [at, change] of changes.entries()) {
					const output = join(directory, `construction-${at}`)
					const routes = peer.routes.length
					const calls = peer.calls.length
					await assert.rejects(
						new Driver({ ...config.value, ...change, out: output }).execute(),
						/effective development configuration differs/,
					)
					assert.equal(peer.routes.length, routes)
					assert.equal(peer.calls.length, calls)
					assert.equal(peer.decisions, 0)
					assert.equal(existsSync(output), false)
				}
			}
			assert.equal(await new Driver(config.value).execute(), 0)
			const run = parseMatrixRun(out)
			assert.ok(run)
			runs.set(arm, run)
			const goals = readCopy(join(COPIES_DIR, 'v1.json')).goals
			assert.deepEqual(
				run.rows.map((row) => row.goal),
				goals.map((goal) => goal.id),
			)
			assert.equal(run.status, 'development-failed-goals')
			const failed = run.requests.filter(isParserRequest)
			assert.equal(failed.length, 1)
			const fault = failed[0]
			assert.ok(fault)
			assert.equal(fault.goal, goals[1]?.id)
			assert.equal(fault.status, 500)
			assert.equal(fault.prompt, undefined)
			assert.equal(fault.completion, undefined)
			assert.ok(fault.capacity)
			const row = run.rows.find((entry) => entry.goal === fault.goal)
			assert.ok(row)
			assert.equal(row.success, false)
			assert.match(row.error ?? '', /qualification failed: transport/)
			const follower = run.requests.find((entry) => entry.sequence === fault.sequence + 1)
			assert.ok(follower)
			assert.equal(follower.sent, false)
			assert.ok(isStoppedRequest(follower, run.requests))
			assert.equal(permitsReserve(run.requests), false)
			assert.throws(
				() => verifyMatrixFeasibility(run),
				/operational matrix fault is not configuration infeasibility/,
			)
			assert.ok(run.requests.some((entry) => entry.sent && entry.goal === goals[2]?.id))
			assert.ok(
				!run.failures.some(
					(entry) => entry === `request ${follower.sequence}: thinking policy differs`,
				),
			)
			const messages = readRows(join(out, 'messages.jsonl'))
			assert.ok(
				messages.some(
					(entry) =>
						isRecord(entry) && entry.role === 'user' && entry.content === goals[1]?.request,
				),
			)
			assert.ok(
				messages.some(
					(entry) =>
						isRecord(entry) &&
						entry.role === 'assistant' &&
						entry.goal === goals[0]?.id &&
						entry.content === 'Fixture answer.',
				),
			)
			const last = goals.at(-1)
			assert.ok(
				messages.some(
					(entry) => isRecord(entry) && entry.role === 'assistant' && entry.goal === last?.id,
				),
			)
			const costs = measureMatrixCosts(run).wire.find(
				(entry) => entry.role === 'agent' && entry.phase === 'trajectory',
			)
			assert.ok(costs)
			assert.equal(costs.missing, 1)
			assert.equal(
				costs.requests,
				run.requests.filter(
					(entry) => entry.role === 'agent' && entry.sent && entry.goal !== undefined,
				).length,
			)
			assert.ok(costs.wall >= fault.wall)
			for (const change of [
				{ goal: 'wrong' },
				{ turn: 999 },
				{ sequence: follower.sequence + 1 },
				{ error: 'other' },
				{ request: {} },
			])
				assert.equal(isStoppedRequest({ ...follower, ...change }, run.requests), false)
			for (const response of [
				'{"error":"unrelated failure"}',
				'{"error":"XML syntax error"}',
				fault.response + '\n{}',
			])
				assert.equal(isParserRequest({ ...fault, response }), false)
			assert.equal(
				permitsContinuation(
					run.requests,
					frozen,
					{ ...execution, phase: 'full' },
					fault.goal ?? '',
				),
				false,
			)
			assert.equal(
				permitsContinuation(
					[...run.requests, { ...follower, sequence: run.requests.length + 1, error: 'unrelated' }],
					frozen,
					execution,
					fault.goal ?? '',
				),
				false,
			)
			const report = readJSON(join(out, 'run.json'))
			assert.ok(isRecord(report) && isRecord(report.fit))
			assert.deepEqual(report.fit, { agree: 0.67, change: 0.56, separated: false })
		}
		const records = runs.get('records')
		const aggregate = runs.get('aggregate')
		assert.ok(records && aggregate)
		assert.deepEqual(listMatrixPairFailures(records, aggregate), [])
		assert.ok(
			aggregate.journal.some(
				(entry) => isRecord(entry) && entry.event === 'build' && entry.status === 'current',
			),
		)
		assert.ok(aggregate.picks.some((entry) => (entry.aggregates?.length ?? 0) > 0))
		const plan = join(directory, 'development-plan.json')
		writeFileSync(plan, JSON.stringify([{ name: 'l6-q2-think0-aggregate-v1' }]))
		assert.throws(
			() =>
				Comparison.execute([
					'blind',
					'--base',
					directory,
					'--plan',
					plan,
					'--out',
					join(directory, 'answers.jsonl'),
					'--keys',
					join(directory, 'keys.json'),
				]),
			/malformed identity/,
		)
		for (const control of ['transport', 'length', 'usage', 'capacity']) {
			peer.parser = undefined
			peer.decisions = 0
			peer.fault = control === 'transport'
			peer.length = control === 'length'
			peer.missing = control === 'usage'
			peer.metadata = control === 'capacity' ? 500 : 200
			const manifest = join(directory, 'records-development.json')
			const out = join(directory, control)
			const config = parseFlags([
				'--run',
				'--live',
				'--copy',
				'1',
				'--manifest',
				manifest,
				'--cache',
				join(directory, `${control}-cache`),
				'--out',
				out,
				'--url',
				url,
			])
			assert.ok(config.success, config.success ? '' : config.error)
			await assert.rejects(new Driver(config.value).execute(), /qualification|calibration/)
			assert.ok(
				readRows(join(out, 'rows.jsonl')).length <
					readCopy(join(COPIES_DIR, 'v1.json')).goals.length,
			)
		}
	} finally {
		await peer.destroy()
	}
})

it('recognizes the actual retained parser stop without granting reserve advancement', () => {
	const path = resolve(
		'.orkestrel/agent/instruments/results/l9/q2-think0/full/preflight/l6-q2-think0-full-v1/requests.jsonl',
	)
	const requests = readRows(path)
	const parser = requests[19]
	const follower = requests[20]
	assert.ok(isRecord(parser) && isRecord(follower))
	// Full request guards keep the regression tied to the actual wire recording.
	assert.ok(isMatrixRequest(parser) && isMatrixRequest(follower))
	assert.ok(isParserRequest(parser))
	assert.ok(isStoppedRequest(follower, [parser, follower]))
	assert.equal(permitsReserve([parser, follower]), false)
})
