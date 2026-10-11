import { it } from 'node:test'
import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { BUILD, HARNESS } from '../../constants.js'
import { MatrixPeer } from '../../tests/matrixFixture.js'
import { hashFile } from '../../refit/helpers.js'
import { readJSON } from '../../helpers.js'
import { readSustainedRun } from '../parsers.js'
import { readSustainedExecution, readSustainedSelection } from '../helpers.js'
import { readWorkload } from '../../build/helpers.js'
import { inspectOracle, readOracle } from '../../endurance/helpers.js'
import { Peer } from './Peer.js'
import { runCommand, writeFixtureLabels, prepareRuntimeFixture } from './helpers.js'
import { isRecord } from '@orkestrel/contract'

it('runs real bounded continuous ledgers, seals runtime-only filing, transfers a fresh refit, and retains late invalidity', async () => {
	const parent = resolve('tmp/units/aggregate-runtime-fixtures')
	mkdirSync(parent, { recursive: true })
	const directory = mkdtempSync(join(parent, 'proof-'))
	const peer = new Peer()
	const matrixPeer = new MatrixPeer()
	matrixPeer.support = true
	const url = await peer.start()
	const matrixUrl = await matrixPeer.start()
	try {
		const {
			workload,
			runtime,
			frozen: frozenPath,
			resource: resourcePath,
			classification: classificationPath,
			classified,
			fit,
		} = await prepareRuntimeFixture(directory, url, matrixUrl)
		assert.equal(
			await runCommand('sustained', [
				'development',
				'--frozen',
				frozenPath,
				'--resource',
				resourcePath,
				'--pilot',
				join(directory, 'pilot/manifest.json'),
				'--runtime',
				runtime,
				'--classification',
				classificationPath,
				'--fit',
				fit,
				'--out',
				join(directory, 'development'),
				'--live',
				'--url',
				url,
			]),
			0,
		)
		const records = readSustainedRun(join(directory, 'development/records/run'))
		const aggregate = readSustainedRun(join(directory, 'development/aggregate/run'))
		assert.equal(records.rows.length, 32)
		assert.deepEqual(records.failures, [])
		assert.deepEqual(aggregate.failures, [])
		assert.equal(records.observations.filter((one) => one.checkpoint).length, 2)
		assert.ok(records.observations.at(-1)?.products.includes('product:development-shift-1-work-1'))
		assert.ok(records.receipts.some((receipt) => receipt.version === 7 && receipt.success))
		assert.ok((records.observations.at(-1)?.history.total ?? 0) > 3072)
		assert.ok(
			records.observations.some((one) => one.omitted.some((id) => id.startsWith('product:'))),
		)
		assert.equal(hashFile(classified.path).hash, classified.hash)
		const selection = join(directory, 'selection.json')
		assert.equal(
			await runCommand('sustained', [
				'select',
				'--development',
				runtime,
				'--evaluation',
				join(workload, 'runtime/evaluation.json'),
				'--candidate',
				join(directory, 'development/candidate.json'),
				'--seed',
				'7',
				'--out',
				selection,
			]),
			0,
		)
		assert.equal(
			await runCommand('sustained', [
				'filing',
				'--selection',
				selection,
				'--out',
				join(directory, 'evaluation-filing'),
				'--live',
				'--url',
				url,
			]),
			0,
		)
		assert.equal(
			await runCommand('sustained', [
				'evaluate',
				'--selection',
				selection,
				'--classification',
				join(directory, 'evaluation-filing/classification.json'),
				'--out',
				join(directory, 'evaluation'),
				'--live',
				'--url',
				url,
			]),
			0,
		)
		const evaluation = readSustainedRun(join(directory, 'evaluation/aggregate/run'))
		assert.equal(evaluation.runtime.id, 'fixture-evaluation-e1')
		assert.deepEqual(evaluation.failures, [])
		const blind = join(directory, 'blind/packet.json')
		const keys = join(directory, 'private/keys.json')
		const auditArgs = [
			'--selection',
			selection,
			'--records',
			join(directory, 'evaluation/records/run'),
			'--aggregate',
			join(directory, 'evaluation/aggregate/run'),
			'--oracle',
			join(workload, 'private/evaluation.json'),
		]
		assert.equal(
			await runCommand('sustained-audit', [
				'blind',
				...auditArgs,
				'--seed',
				'17',
				'--out',
				blind,
				'--keys',
				keys,
			]),
			0,
		)
		const answerLabels = join(directory, 'private/inert-fixture-labels.json')
		writeFixtureLabels(blind, keys, answerLabels)
		const reportPath = join(directory, 'fixture-report.json')
		assert.equal(
			await runCommand('sustained-audit', [
				'report',
				...auditArgs,
				'--packet',
				blind,
				'--keys',
				keys,
				'--labels',
				answerLabels,
				'--out',
				reportPath,
			]),
			0,
		)
		const report = readJSON(reportPath)
		assert.ok(isRecord(report) && report.valid === true)
		const missed = join(directory, 'private/missed-control-labels.json')
		writeFixtureLabels(blind, keys, missed, true)
		assert.equal(
			await runCommand('sustained-audit', [
				'report',
				...auditArgs,
				'--packet',
				blind,
				'--keys',
				keys,
				'--labels',
				missed,
				'--out',
				join(directory, 'missed-control-report.json'),
			]),
			0,
		)
		const invalidReport = readJSON(join(directory, 'missed-control-report.json'))
		assert.ok(isRecord(invalidReport) && invalidReport.valid === false)
		const alteredOracle = join(directory, 'private/altered-oracle.json')
		writeFileSync(
			alteredOracle,
			JSON.stringify({
				...readOracle(join(workload, 'private/evaluation.json')),
				id: 'foreign-oracle',
			}),
		)
		assert.notEqual(
			await runCommand('sustained-audit', [
				'blind',
				...auditArgs,
				'--oracle',
				alteredOracle,
				'--seed',
				'17',
				'--out',
				join(directory, 'blind/foreign.json'),
				'--keys',
				join(directory, 'private/foreign-keys.json'),
			]),
			0,
		)
		const original = readSustainedExecution(
			join(directory, 'evaluation/records/execution.json'),
		).execution
		const sameOracle = readOracle(join(workload, 'private/evaluation.json'))
		const changedOracle = join(directory, 'private/same-id-changed-oracle.json')
		writeFileSync(
			changedOracle,
			JSON.stringify({
				...sameOracle,
				facts: sameOracle.facts.map((fact, at) =>
					at === 0 ? { ...fact, value: `${fact.value} Changed fixture text.` } : fact,
				),
			}),
		)
		const parsedOracle = readOracle(changedOracle)
		assert.equal(parsedOracle.runtime, sameOracle.runtime)
		assert.deepEqual(inspectOracle(evaluation.runtime, parsedOracle), [])
		assert.notEqual(
			await runCommand(
				'sustained-audit',
				[
					'blind',
					...auditArgs,
					'--oracle',
					changedOracle,
					'--seed',
					'17',
					'--out',
					join(directory, 'blind/same-id.json'),
					'--keys',
					join(directory, 'private/same-id-keys.json'),
				],
				/oracle bytes differ from frozen workload resource/,
			),
			0,
		)
		const selected = readSustainedSelection(selection)
		const alteredSelection = join(directory, 'altered-selection.json')
		assert.ok(selected.limits !== undefined)
		writeFileSync(
			alteredSelection,
			JSON.stringify({
				...selected,
				limits: { ...selected.limits, calls: selected.limits.calls + 1 },
			}),
		)
		assert.throws(() => readSustainedSelection(alteredSelection), /limits differ/)
		writeFileSync(
			alteredSelection,
			JSON.stringify({
				...selected,
				candidates: selected.candidates.map((candidate) => ({
					...candidate,
					accepted: false,
					failures: ['invented exposure refusal'],
				})),
			}),
		)
		assert.throws(() => readSustainedSelection(alteredSelection), /lacks retained failed evidence/)
		const altered = join(directory, 'altered.json')
		writeFileSync(
			altered,
			JSON.stringify({ ...original, budget: { reserve: 1024, window: 3584, predict: 512 } }),
		)
		const before = peer.calls.length
		assert.throws(() => readSustainedExecution(altered), /resource budget/)
		assert.equal(peer.calls.length, before)
		peer.missingAt = 'shift-7-work-1'
		const partialPath = join(directory, 'partial')
		assert.notEqual(
			await runCommand('bench', [
				'--run',
				'--live',
				'--study',
				join(directory, 'evaluation/records/execution.json'),
				'--cache',
				join(directory, 'partial-cache'),
				'--out',
				partialPath,
				'--url',
				url,
			]),
			0,
		)
		const partial = readSustainedRun(partialPath)
		assert.deepEqual(partial.errors, [])
		assert.ok(partial.failures.some((failure) => failure.includes('usage')))
		assert.ok(partial.observations.some((one) => one.checkpoint && one.shift === 4))
		assert.ok(partial.rows.length < 32 && partial.rows.length > 16)
		peer.missingAt = undefined
		peer.lengthAt = 'shift-7-work-1'
		const truncatedPath = join(directory, 'truncated')
		assert.notEqual(
			await runCommand('bench', [
				'--run',
				'--live',
				'--study',
				join(directory, 'evaluation/records/execution.json'),
				'--cache',
				join(directory, 'truncated-cache'),
				'--out',
				truncatedPath,
				'--url',
				url,
			]),
			0,
		)
		const truncated = readSustainedRun(truncatedPath)
		assert.deepEqual(truncated.errors, [])
		assert.ok(truncated.failures.some((failure) => failure.includes('length')))
		assert.ok(truncated.observations.some((one) => one.checkpoint && one.shift === 4))
		peer.lengthAt = undefined
		const developmentExecution = readSustainedExecution(
			join(directory, 'development/records/execution.json'),
		).execution
		const limited = join(directory, 'limited-execution.json')
		writeFileSync(
			limited,
			JSON.stringify({
				...developmentExecution,
				limits: { ...developmentExecution.limits, calls: 1 },
			}),
		)
		const limitedPath = join(directory, 'limited')
		assert.notEqual(
			await runCommand('bench', [
				'--run',
				'--live',
				'--study',
				limited,
				'--cache',
				join(directory, 'limited-cache'),
				'--out',
				limitedPath,
				'--url',
				url,
			]),
			0,
		)
		const limitedRun = readSustainedRun(limitedPath)
		assert.ok(limitedRun.failures.length > 0)
		assert.deepEqual(limitedRun.errors, [])
		assert.equal(limitedRun.requests.filter((request) => request.sent).length, 1)
		const priorCalls = peer.calls.length
		assert.notEqual(
			await runCommand('bench', [
				'--run',
				'--live',
				'--study',
				join(directory, 'development/records/execution.json'),
				'--cache',
				join(directory, 'development/records/cache'),
				'--out',
				join(directory, 'foreign-cache'),
				'--url',
				url,
			]),
			0,
		)
		assert.equal(peer.calls.length, priorCalls)
		peer.filingFailure = true
		const refusedCandidates: string[] = []
		for (const key of ['q4', 'g4', 'q2', 'g2']) {
			const candidateRoot = join(directory, 'infeasible', key)
			const freeze = key === 'q4' ? frozenPath : join(candidateRoot, 'freeze/manifest.json')
			const resource = key === 'q4' ? resourcePath : join(candidateRoot, 'resource/manifest.json')
			if (key !== 'q4') {
				assert.equal(
					await runCommand('matrix', [
						'freeze',
						'--key',
						key,
						'--think',
						'false',
						'--seed',
						join(directory, 'seed.jsonl'),
						'--settings',
						join(HARNESS, 'bench5/settings.json'),
						'--out',
						join(candidateRoot, 'freeze'),
						'--live',
						'--url',
						matrixUrl,
					]),
					0,
				)
				assert.equal(
					await runCommand('matrix', [
						'resource',
						'--frozen',
						freeze,
						'--out',
						join(candidateRoot, 'resource'),
						'--live',
						'--url',
						matrixUrl,
					]),
					0,
				)
			}
			assert.equal(
				await runCommand('sustained', [
					'filing',
					'--frozen',
					freeze,
					'--resource',
					resource,
					'--runtime',
					runtime,
					'--out',
					join(candidateRoot, 'filing'),
					'--live',
					'--url',
					url,
				]),
				3,
			)
			const candidatePath = join(candidateRoot, 'candidate.json')
			assert.equal(
				await runCommand('sustained', [
					'candidate',
					'--frozen',
					freeze,
					'--resource',
					resource,
					'--runtime',
					runtime,
					'--preparation',
					join(candidateRoot, 'filing/classification.json'),
					'--out',
					candidatePath,
				]),
				3,
			)
			refusedCandidates.push('--candidate', candidatePath)
		}
		const inconclusive = join(directory, 'infeasible/selection.json')
		const borrowedResource = join(directory, 'borrowed-resource-execution.json')
		writeFileSync(
			borrowedResource,
			JSON.stringify({
				...original,
				resource: hashFile(join(directory, 'infeasible/g4/resource/manifest.json')),
			}),
		)
		const beforeBorrow = peer.calls.length
		assert.throws(() => readSustainedExecution(borrowedResource), /resource|frozen|configuration/)
		assert.equal(peer.calls.length, beforeBorrow)
		assert.equal(
			await runCommand('sustained', [
				'select',
				'--development',
				runtime,
				'--evaluation',
				join(workload, 'runtime/evaluation.json'),
				...refusedCandidates,
				'--seed',
				'7',
				'--out',
				inconclusive,
			]),
			3,
		)
		assert.equal(
			await runCommand('sustained-audit', [
				'report',
				'--selection',
				inconclusive,
				'--out',
				join(directory, 'infeasible/report.json'),
			]),
			0,
		)
		const infeasibleReport = readJSON(join(directory, 'infeasible/report.json'))
		assert.ok(
			isRecord(infeasibleReport) &&
				infeasibleReport.recommendation === 'inconclusive' &&
				Array.isArray(infeasibleReport.preparation) &&
				infeasibleReport.preparation.length >= 4,
		)
		const refusal = spawnSync(
			process.execPath,
			[
				join(BUILD, 'bench5/sustained.js'),
				'evaluate',
				'--selection',
				selection,
				'--classification',
				join(directory, 'evaluation-filing/classification.json'),
				'--out',
				join(directory, 'no-live'),
			],
			{ encoding: 'utf8' },
		)
		assert.notEqual(refusal.status, 0)
		assert.match(refusal.stderr, /requires --live/)
		writeFileSync(
			join(directory, 'proof.json'),
			JSON.stringify(
				{
					fixture: true,
					directory,
					selection,
					records: records.path,
					aggregate: aggregate.path,
					evaluation: join(directory, 'evaluation'),
					partial: partialPath,
					workload: readWorkload(hashFile(runtime)),
					packet: blind,
					keys,
					report: reportPath,
					labels: answerLabels,
					limitation:
						'Synthetic private truth and hand-authored inert labels prove protocol behavior only; these are not model-quality evidence.',
				},
				null,
				2,
			),
		)
		console.log(`SUSTAINED_FIXTURE ${directory}`)
	} finally {
		await peer.destroy()
		await matrixPeer.destroy()
	}
})
