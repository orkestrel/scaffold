import { it } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { isRecord } from '@orkestrel/contract'
import { Matrix } from '../matrix/Matrix.ts'
import { Comparison } from '../matrix/Comparison.ts'
import {
	buildBudget,
	listResourceFailures,
	nameMatrix,
	readExecution,
	readFrozen,
	readResource,
} from '../matrix/helpers.ts'
import { parseMatrixRun } from '../matrix/parsers.ts'
import { isMatrixIdentity, isMatrixResource } from '../matrix/validators.ts'
import { HARNESS, MODELS } from '../constants.ts'
import { hashFile } from '../refit/helpers.ts'
import { readJSON, readRows } from '../helpers.ts'
import { MatrixPeer } from './matrixFixture.ts'
import { Driver, parseFlags } from '../Driver.ts'
import { Refit } from '../refit/Refit.ts'
import { Shadow } from '../shadow.ts'
import { buildOptions } from './refit/helpers.ts'

it('rejects l6 run and series identities before any cold-start process can execute', () => {
	const directory = resolve('tmp/units/aggregate-matrix-tool-fixtures')
	mkdirSync(directory, { recursive: true })
	const plan = join(directory, 'invalid.json')
	writeFileSync(
		plan,
		JSON.stringify([
			{ name: 'l6-q2-think0-records-v2', harness: 'bench5', estimate: 1, args: ['--run'] },
		]),
	)
	const single = spawnSync(
		process.execPath,
		[
			join(HARNESS, 'tools', 'run-one.ts'),
			'l6-q2-think0-records-v2',
			'bench5',
			directory,
			'--',
			'--run',
		],
		{ encoding: 'utf8' },
	)
	assert.notEqual(single.status, 0)
	assert.match(single.stderr, /l6 run requires an explicit execution manifest/)
	const series = spawnSync(
		process.execPath,
		[join(HARNESS, 'tools', 'series.ts'), '--plan', plan, '--base', directory, '--budget', '1'],
		{ encoding: 'utf8' },
	)
	assert.notEqual(series.status, 0)
	assert.match(series.stderr, /series l6 identity differs/)
})

it('separates l5 from every explicit l6 model, thinking, arm, and copy identity', () => {
	const names = new Set<string>()
	for (const key of ['q2', 'q4', 'g2', 'g4'])
		for (const think of [false, true])
			for (const arm of ['records', 'aggregate', 'full'] as const)
				for (let copy = 1; copy <= 8; copy += 1) {
					const identity = { protocol: 'l6' as const, key, think, arm, copy }
					assert.ok(isMatrixIdentity(identity))
					assert.ok(!names.has(nameMatrix(identity)))
					names.add(nameMatrix(identity))
				}
	assert.equal(isMatrixIdentity({ protocol: 'l5', key: 'q2', arm: 'control', copy: 1 }), false)
	assert.equal(isMatrixIdentity({ protocol: 'l6', key: 'q2', arm: 'records', copy: 1 }), false)
	assert.deepEqual(buildBudget(8192), { reserve: 8192, window: 10752, predict: 7680 })
	assert.throws(() => buildBudget(513), /ladder/)
})

it('plans all three arms in both thinking states, refuses exposure laundering, and reports actual valid denominators and blind ambiguity bounds', async () => {
	const parent = resolve('tmp/units/aggregate-matrix-fixtures')
	mkdirSync(parent, { recursive: true })
	const directory = mkdtempSync(join(parent, 'comparison-'))
	const peer = new MatrixPeer()
	peer.support = true
	const url = await peer.start()
	try {
		const seed = join(directory, 'seed.jsonl')
		writeFileSync(seed, '')
		const settings = join(HARNESS, 'bench5', 'settings.json')
		for (const think of [false, true]) {
			const base = join(directory, `q2-think${think ? '1' : '0'}`)
			const frozenPath = join(base, 'freeze', 'manifest.json')
			const resource = join(base, 'resource', 'manifest.json')
			assert.equal(
				await Matrix.execute([
					'freeze',
					'--key',
					'q2',
					'--think',
					String(think),
					'--seed',
					seed,
					'--settings',
					settings,
					'--out',
					join(base, 'freeze'),
					'--live',
					'--url',
					url,
				]),
				0,
			)
			assert.equal(
				await Matrix.execute([
					'resource',
					'--frozen',
					frozenPath,
					'--out',
					join(base, 'resource'),
					'--live',
					'--url',
					url,
				]),
				0,
			)
			assert.equal(
				await Matrix.execute([
					'full',
					'--frozen',
					frozenPath,
					'--resource',
					resource,
					'--out',
					join(base, 'full'),
					'--live',
					'--url',
					url,
				]),
				0,
			)
			const frozen = readFrozen(hashFile(frozenPath))
			// Synthetic fitted threshold only authorizes a protocol fixture. The real classifier,
			// summarizer, maintenance, planner, provider, and admission checks still execute.
			const fit = join(base, 'fixture-fit.json')
			writeFileSync(
				fit,
				JSON.stringify({
					agree: 0.8,
					change: 0.56,
					separated: true,
					matrix: {
						summarizer: frozen.summarizer,
						judge: frozen.judge,
						files: frozen.files,
						settings: frozen.settings.hash,
						seed: frozen.seed.hash,
					},
				}),
			)
			assert.equal(
				await Matrix.execute([
					'pilot',
					'--frozen',
					frozenPath,
					'--resource',
					resource,
					'--fit',
					fit,
					'--out',
					join(base, 'pilot'),
					'--live',
					'--url',
					url,
				]),
				0,
				readFileSync(join(base, 'pilot', 'manifest.json'), 'utf8'),
			)
			if (!think) {
				peer.escalations = true
				assert.equal(
					await Matrix.execute([
						'pilot',
						'--frozen',
						frozenPath,
						'--resource',
						resource,
						'--fit',
						fit,
						'--out',
						join(base, 'stale-pilot'),
						'--live',
						'--url',
						url,
					]),
					3,
				)
				assert.match(
					readFileSync(join(base, 'stale-pilot', 'manifest.json'), 'utf8'),
					/sole-carried stale phrase/,
				)
				peer.escalations = false
			}
		}
		const planPath = join(directory, 'plans', 'A.json')
		assert.equal(
			await Matrix.execute(['plan', '--root', directory, '--stage', 'A', '--out', planPath]),
			0,
		)
		const plan = readJSON(planPath)
		assert.ok(Array.isArray(plan))
		assert.equal(plan.length, 24)
		assert.deepEqual(
			new Set(
				plan.map((entry: unknown) =>
					isRecord(entry) && typeof entry.name === 'string'
						? entry.name.split('-').slice(2, 4).join('-')
						: '',
				),
			),
			new Set([
				'think0-records',
				'think0-aggregate',
				'think0-full',
				'think1-records',
				'think1-aggregate',
				'think1-full',
			]),
		)
		const runs = join(directory, 'runs')
		mkdirSync(runs)
		for (const entry of plan) {
			assert.ok(
				isRecord(entry) &&
					typeof entry.name === 'string' &&
					Array.isArray(entry.args) &&
					entry.args.every((arg: unknown) => typeof arg === 'string'),
			)
			if (!entry.name.includes('think0') || !entry.name.endsWith('-v2')) continue
			const config = parseFlags([...entry.args, '--out', join(runs, entry.name), '--url', url])
			assert.ok(config.success)
			assert.equal(await new Driver(config.value).execute(), 0)
		}
		const aggregate = join(runs, 'l6-q2-think0-aggregate-v2')
		const shadow = join(directory, 'shadow.json')
		assert.equal(
			await new Shadow({
				run: aggregate,
				out: shadow,
				cache: join(directory, 'shadow-cache'),
				copies: join(HARNESS, 'bench', 'variants', 'long'),
				live: true,
				url,
			}).execute(),
			0,
		)
		const packet = join(directory, 'blind', 'packet.json')
		const keys = join(directory, 'private', 'keys.json')
		assert.equal(
			Comparison.execute([
				'blind',
				'--base',
				runs,
				'--plan',
				planPath,
				'--out',
				packet,
				'--keys',
				keys,
			]),
			0,
		)
		const items = readJSON(packet)
		assert.ok(Array.isArray(items))
		assert.equal(items.length, 72)
		assert.ok(
			items.every(
				(item: unknown) =>
					isRecord(item) && !('model' in item) && !('success' in item) && !('goal' in item),
			),
		)
		const labels = join(directory, 'labels.json')
		writeFileSync(
			labels,
			JSON.stringify({
				authority: 'root-adjudicated',
				packet: hashFile(packet).hash,
				labels: items.map((item: unknown) => ({
					id: isRecord(item) ? item.id : undefined,
					verdict: 'ambiguous',
					evidence: 'Fixture-only deliberate uncertainty.',
				})),
			}),
		)
		const reportPath = join(directory, 'report.json')
		assert.equal(
			Comparison.execute([
				'report',
				'--base',
				runs,
				'--plan',
				planPath,
				'--out',
				reportPath,
				'--packet',
				packet,
				'--keys',
				keys,
				'--labels',
				labels,
				'--shadow',
				shadow,
				'--preparation',
				join(directory, 'q2-think0', 'stale-pilot', 'manifest.json'),
			]),
			0,
		)
		const report = readJSON(reportPath)
		assert.ok(
			isRecord(report) &&
				Array.isArray(report.pairs) &&
				Array.isArray(report.shadows) &&
				Array.isArray(report.preparation),
		)
		assert.equal(report.shadows.length, 1)
		assert.ok(report.preparation.length >= 3)
		assert.ok(report.preparation.some((cost) => isRecord(cost) && cost.accepted === false))
		for (const pair of report.pairs) {
			assert.ok(isRecord(pair))
			assert.equal(pair.denominator, 23)
			assert.equal(pair.audited, 23)
			assert.equal(pair.low, -23)
			assert.equal(pair.high, 23)
		}
		const executionPath = join(directory, 'plans', 'executions', 'l6-q2-think0-aggregate-v2.json')
		const admitted = readExecution(executionPath)
		assert.ok(admitted.execution.pilot !== undefined)
		const pilot = readJSON(admitted.execution.pilot.path)
		assert.ok(isRecord(pilot))
		writeFileSync(admitted.execution.pilot.path, JSON.stringify({ ...pilot, exposed: 0 }))
		const stale = join(directory, 'stale-execution.json')
		writeFileSync(
			stale,
			JSON.stringify({ ...admitted.execution, pilot: hashFile(admitted.execution.pilot.path) }),
		)
		assert.throws(() => readExecution(stale), /majority body exposure/)
		writeFileSync(admitted.execution.pilot.path, `${JSON.stringify(pilot, null, 2)}\n`)
		const requestPath = join(aggregate, 'requests.jsonl')
		const requests = readRows(requestPath)
		const first = requests.find(
			(entry: unknown) => isRecord(entry) && entry.goal !== undefined && entry.role === 'agent',
		)
		assert.ok(isRecord(first) && typeof first.response === 'string')
		first.response = first.response.replace('"done_reason":"stop"', '"done_reason":"length"')
		writeFileSync(requestPath, requests.map((request) => JSON.stringify(request)).join('\n'))
		const invalidPath = join(directory, 'invalid-report.json')
		Comparison.execute(['report', '--base', runs, '--plan', planPath, '--out', invalidPath])
		const invalid = readJSON(invalidPath)
		assert.ok(isRecord(invalid) && Array.isArray(invalid.pairs))
		const refused = invalid.pairs.find(
			(entry: unknown) => isRecord(entry) && entry.arm === 'aggregate',
		)
		assert.ok(isRecord(refused))
		assert.equal(refused.denominator, 0)
		writeFileSync(join(directory, 'archive.json'), JSON.stringify([{ name: 'l5-q2-control-v2' }]))
		assert.throws(
			() =>
				Comparison.execute([
					'report',
					'--base',
					runs,
					'--plan',
					join(directory, 'archive.json'),
					'--out',
					join(directory, 'archive-report.json'),
				]),
			/archive/,
		)
	} finally {
		await peer.destroy()
		rmSync(directory, { recursive: true, force: true })
	}
})

it('refuses a real frozen corpus from another source/settings population before calibration calls', async () => {
	const parent = resolve('tmp/units/aggregate-matrix-fixtures')
	mkdirSync(parent, { recursive: true })
	const directory = mkdtempSync(join(parent, 'corpus-'))
	const peer = new MatrixPeer()
	const url = await peer.start()
	try {
		const corpus = join(directory, 'corpus')
		const options = buildOptions(corpus)
		assert.equal(await new Refit(options).execute(), 0)
		const frozen = join(directory, 'freeze', 'manifest.json')
		await Matrix.execute([
			'freeze',
			'--key',
			'q2',
			'--think',
			'false',
			'--seed',
			join(options.cache, 'judge.jsonl'),
			'--settings',
			options.settings,
			'--out',
			join(directory, 'freeze'),
			'--live',
			'--url',
			url,
		])
		const before = peer.calls.length
		const out = join(directory, 'generate')
		assert.equal(
			await Refit.run([
				'generate',
				'--frozen',
				frozen,
				'--corpus',
				corpus,
				'--cache',
				join(directory, 'fresh-cache'),
				'--model',
				MODELS.q2,
				'--out',
				out,
			]),
			3,
		)
		assert.match(
			readFileSync(join(out, 'diagnosis.json'), 'utf8'),
			/frozen corpus source\/settings\/seed population mismatch/,
		)
		assert.equal(peer.calls.length, before)
	} finally {
		await peer.destroy()
		rmSync(directory, { recursive: true, force: true })
	}
})

it('classifies raw usage, length, explicit refusal, truncation, and capacity without consulting answer scores', () => {
	const request = { truncate: false, options: { num_ctx: 3072, num_predict: 512 }, messages: [] }
	const response = JSON.stringify({
		done: true,
		done_reason: 'stop',
		prompt_eval_count: 2559,
		eval_count: 512,
	})
	assert.deepEqual(listResourceFailures('agent', request, response, buildBudget(512), 200), [])
	assert.deepEqual(
		listResourceFailures(
			'agent',
			request,
			JSON.stringify({ done: true, done_reason: 'stop', prompt_eval_count: 2560, eval_count: 512 }),
			buildBudget(512),
			200,
		),
		['capacity'],
	)
	assert.deepEqual(listResourceFailures('agent', request, '{}', buildBudget(512), 200), ['usage'])
	assert.deepEqual(
		listResourceFailures('agent', request, '{"error":"out of memory"}', buildBudget(512), 500),
		['capacity'],
	)
	assert.deepEqual(
		listResourceFailures(
			'agent',
			request,
			response.replace('stop', 'length'),
			buildBudget(512),
			200,
		),
		['length'],
	)
	assert.deepEqual(
		listResourceFailures(
			'agent',
			request,
			response.replace('"done":true', '"done":true,"truncated":true'),
			buildBudget(512),
			200,
		),
		['truncation'],
	)
})

it('runs the complete real-component resource ladder, ignores wrong answers, freezes the first valid reserve, and refuses changed settings', async () => {
	const parent = resolve('tmp/units/aggregate-matrix-fixtures')
	mkdirSync(parent, { recursive: true })
	const directory = mkdtempSync(join(parent, 'resource-'))
	const peer = new MatrixPeer()
	const url = await peer.start()
	try {
		const seed = join(directory, 'seed.jsonl')
		writeFileSync(seed, '')
		const settings = join(directory, 'settings.json')
		writeFileSync(settings, readFileSync(join(HARNESS, 'bench5', 'settings.json')))
		const frozen = join(directory, 'freeze', 'manifest.json')
		assert.equal(
			await Matrix.execute([
				'freeze',
				'--key',
				'q2',
				'--think',
				'true',
				'--seed',
				seed,
				'--settings',
				settings,
				'--out',
				join(directory, 'freeze'),
				'--live',
				'--url',
				url,
			]),
			0,
		)
		peer.length = true
		assert.equal(
			await Matrix.execute([
				'resource',
				'--frozen',
				frozen,
				'--out',
				join(directory, 'resource'),
				'--live',
				'--url',
				url,
			]),
			0,
		)
		const resource = readResource(
			hashFile(join(directory, 'resource', 'manifest.json')),
			hashFile(frozen),
		)
		assert.equal(resource.budget?.reserve, 1024)
		assert.deepEqual(
			resource.attempts.map((attempt) => attempt.budget.reserve),
			[512, 1024],
		)
		const last = resource.attempts.at(-1)
		assert.ok(last)
		const run = parseMatrixRun(last.run)
		assert.ok(run)
		assert.equal(run.rows.length, 24)
		assert.ok(run.rows.every((row) => row.success === false))
		assert.equal(run.failures.length, 0)
		assert.ok(
			run.requests
				.filter((request) => request.role === 'agent' && request.goal !== undefined)
				.every((request) => isRecord(request.request) && request.request.think === true),
		)
		peer.length = false
		const before = peer.calls.length
		assert.equal(
			await Matrix.execute([
				'resource',
				'--frozen',
				frozen,
				'--out',
				join(directory, 'baseline'),
				'--live',
				'--url',
				url,
			]),
			0,
		)
		const baseline = readJSON(join(directory, 'baseline', 'manifest.json'))
		assert.ok(isMatrixResource(baseline))
		assert.equal(baseline.attempts.length, 1)
		assert.ok(peer.calls.length > before)
		assert.equal(
			await Matrix.execute([
				'full',
				'--frozen',
				frozen,
				'--resource',
				join(directory, 'baseline', 'manifest.json'),
				'--out',
				join(directory, 'full'),
				'--live',
				'--url',
				url,
			]),
			0,
		)
		const full = readJSON(join(directory, 'full', 'manifest.json'))
		assert.ok(isMatrixResource(full))
		assert.ok(full.budget !== undefined && full.budget.window > 3072)
		const fullAttempt = full.attempts[0]
		assert.ok(fullAttempt)
		const fullRun = parseMatrixRun(fullAttempt.run)
		assert.ok(fullRun)
		assert.equal(fullRun.failures.length, 0)
		assert.ok(
			fullRun.picks.every((pick) => pick.briefing === '' && (pick.aggregates?.length ?? 0) === 0),
		)
		peer.missing = true
		assert.equal(
			await Matrix.execute([
				'resource',
				'--frozen',
				frozen,
				'--out',
				join(directory, 'missing'),
				'--live',
				'--url',
				url,
			]),
			3,
		)
		const missing = readJSON(join(directory, 'missing', 'manifest.json'))
		assert.ok(isMatrixResource(missing))
		assert.equal(missing.attempts.length, 1)
		assert.equal(missing.attempts[0]?.resource, false)
		writeFileSync(settings, '{}')
		assert.throws(() => readFrozen(hashFile(frozen)), /custody mismatch/)
	} finally {
		await peer.destroy()
		rmSync(directory, { recursive: true, force: true })
	}
})
