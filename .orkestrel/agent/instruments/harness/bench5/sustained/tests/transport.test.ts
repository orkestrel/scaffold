import { it } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { isRecord } from '@orkestrel/contract'
import { Peer } from './Peer.js'
import { MatrixPeer } from '../../tests/matrixFixture.js'
import { prepareRuntimeFixture, runCommand, verifyClassificationFixture } from './helpers.js'
import { readJSON } from '../../helpers.js'
import { hashFile } from '../../refit/helpers.js'
import { readFrozen, readRequestOutcome, readResource } from '../../matrix/helpers.js'
import { readSustainedRun, readSustainedPreparation } from '../parsers.js'
import { readPreparationFailure, readSustainedSelection, readPilotFeasibility } from '../helpers.js'
import { isSustainedAttempt } from '../validators.js'

it('retries transient judge transport within frozen bounds and refuses operational faults as ranked infeasibility', async () => {
	const parent = resolve('tmp/units/aggregate-transport-fixtures')
	mkdirSync(parent, { recursive: true })
	const directory = mkdtempSync(join(parent, 'proof-'))
	const peer = new Peer()
	const matrix = new MatrixPeer()
	matrix.support = true
	const url = await peer.start()
	const matrixUrl = await matrix.start()
	try {
		const fixture = await prepareRuntimeFixture(directory, url, matrixUrl)
		verifyClassificationFixture(join(directory, 'classification-controls'), fixture.classification)
		const frozen = readFrozen(hashFile(fixture.frozen))
		const retries = frozen.configuration.retry
		assert.ok(retries > 0)
		for (const faults of [1, retries + 1]) {
			peer.faults = faults
			const out = join(directory, `development-${faults}`)
			assert.equal(
				await runCommand(
					'sustained',
					[
						'development',
						'--frozen',
						fixture.frozen,
						'--resource',
						fixture.resource,
						'--pilot',
						join(directory, 'pilot/manifest.json'),
						'--runtime',
						fixture.runtime,
						'--classification',
						fixture.classification,
						'--fit',
						fixture.fit,
						'--out',
						out,
						'--live',
						'--url',
						url,
					],
					/operational trajectory fault/,
				),
				1,
			)
			assert.equal(existsSync(join(out, 'candidate.json')), false)
			const attempts = ['records', 'aggregate'].map((arm) =>
				readJSON(join(out, arm, 'attempt.json')),
			)
			assert.ok(attempts.every(isSustainedAttempt))
			const failed = attempts.find((attempt) => !attempt.accepted)
			assert.ok(failed)
			const run = readSustainedRun(failed.run)
			const requests = run.requests.filter((request) => request.role === 'judge')
			const fault = requests.find((request) => request.status === 500)
			assert.ok(fault)
			const same = requests.filter(
				(request) =>
					isRecord(request.request) &&
					isRecord(fault.request) &&
					request.request.prompt === fault.request.prompt,
			)
			assert.equal(same.length, faults === 1 ? 2 : retries + 1)
			assert.equal(same.filter((request) => request.sent).length, same.length)
			assert.equal(requests.filter((request) => request.status === 500).length, faults)
			assert.equal(run.status, faults === 1 ? 'complete' : 'fault')
			assert.ok(run.errors.length > 0)
			const cost = run.costs.wire.filter((entry) => entry.role === 'judge')
			assert.equal(
				cost.reduce((total, entry) => total + entry.requests, 0),
				requests.filter((request) => request.sent).length,
			)
			assert.equal(
				cost.reduce((total, entry) => total + entry.missing, 0),
				faults,
			)
			assert.equal(
				readRequestOutcome({ ...fault, failures: ['capacity'] }, run.execution.budget),
				'fault',
			)
			const candidate = {
				key: 'q4',
				frozen: hashFile(fixture.frozen),
				resource: hashFile(fixture.resource),
				pilot: hashFile(join(directory, 'pilot/manifest.json')),
				classification: hashFile(fixture.classification),
				fit: hashFile(fixture.fit),
				attempts,
				accepted: false,
				failures: ['stored infeasibility flag'],
			}
			const selection = join(out, 'historical-selection.json')
			writeFileSync(
				selection,
				JSON.stringify({
					protocol: 'e1',
					development: hashFile(fixture.runtime),
					evaluation: hashFile(join(fixture.workload, 'runtime/evaluation.json')),
					candidates: [candidate],
					seed: 7,
					order: ['aggregate', 'records'],
					accepted: false,
					failures: ['no feasible ranked configuration'],
				}),
			)
			assert.throws(() => readSustainedSelection(selection), /operational development fault/)
			const metadata = join(failed.run, 'run.json')
			const original = readFileSync(metadata)
			const info = readJSON(metadata)
			assert.ok(isRecord(info))
			try {
				writeFileSync(metadata, JSON.stringify({ ...info, tokens: -1, status: 'complete' }))
				assert.ok(
					readSustainedRun(failed.run).errors.some((error) => error.includes('counts differ')),
				)
			} finally {
				writeFileSync(metadata, original)
			}
		}
		peer.faults = 1
		const filing = join(directory, 'transport-filing')
		assert.equal(
			await runCommand(
				'sustained',
				[
					'filing',
					'--frozen',
					fixture.frozen,
					'--resource',
					fixture.resource,
					'--runtime',
					fixture.runtime,
					'--out',
					filing,
					'--live',
					'--url',
					url,
				],
				/operational filing fault/,
			),
			1,
		)
		assert.throws(
			() =>
				readPreparationFailure(
					hashFile(join(filing, 'classification.json')),
					hashFile(fixture.runtime),
					hashFile(fixture.frozen),
				),
			/operational filing fault/,
		)
		matrix.fault = true
		const resource = join(directory, 'transport-resource')
		assert.equal(
			await runCommand('matrix', [
				'resource',
				'--frozen',
				fixture.frozen,
				'--out',
				resource,
				'--live',
				'--url',
				matrixUrl,
			]),
			1,
		)
		assert.throws(
			() => readResource(hashFile(join(resource, 'manifest.json')), hashFile(fixture.frozen)),
			/operational matrix fault/,
		)
		const pilot = join(directory, 'transport-pilot')
		assert.equal(
			await runCommand('matrix', [
				'pilot',
				'--frozen',
				fixture.frozen,
				'--resource',
				fixture.resource,
				'--fit',
				join(directory, 'matrix-fixture-fit.json'),
				'--out',
				pilot,
				'--live',
				'--url',
				matrixUrl,
			]),
			1,
		)
		assert.throws(
			() =>
				readPilotFeasibility(
					hashFile(join(pilot, 'manifest.json')),
					hashFile(fixture.frozen),
					hashFile(fixture.resource),
				),
			/operational matrix fault/,
		)
		const full = join(directory, 'transport-full')
		assert.equal(
			await runCommand('matrix', [
				'full',
				'--frozen',
				fixture.frozen,
				'--resource',
				fixture.resource,
				'--out',
				full,
				'--live',
				'--url',
				matrixUrl,
			]),
			1,
		)
		for (const output of [resource, pilot, full]) {
			const manifest = join(output, 'manifest.json')
			const costs = readSustainedPreparation(manifest)
			assert.equal(costs.length, 1)
			assert.ok(costs[0]?.costs.wire.some((cost) => cost.requests > 0 && cost.missing > 0))
		}
		const refused = readJSON(join(resource, 'manifest.json'))
		assert.ok(isRecord(refused) && Array.isArray(refused.attempts))
		assert.equal(refused.attempts.length, 1)
		console.log(`TRANSPORT_FIXTURE ${directory}`)
	} finally {
		await peer.destroy()
		await matrix.destroy()
	}
})
