// Prospective outer journal: tmp/units/aggregate-final-cell-driver-CELL-live.jsonl, cap 25920 seconds.
// Composes frozen emitted operators only; unlike the calibration driver, validates each measured stage before advancing.
import type { MatrixAttempt, MatrixResource, MatrixRun } from '../../.orkestrel/agent/instruments/harness/.build/bench5/matrix/types.js'
import type { RefitFile } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/types.js'
import { spawnSync } from 'node:child_process'
import { appendFileSync, existsSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { isDeepStrictEqual } from 'node:util'
import { isRecord } from '@orkestrel/contract'
import { readBuild } from '../../.orkestrel/agent/instruments/harness/.build/bench5/build/helpers.js'
import { describeError, readJSON } from '../../.orkestrel/agent/instruments/harness/.build/bench5/helpers.js'
import { hashFile } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js'
import { buildMatrixBound, listMatrixPairFailures, matchesMatrixExposure, readAttempt, readExecution, readFrozen, readResource, verifyMatrixFeasibility } from '../../.orkestrel/agent/instruments/harness/.build/bench5/matrix/helpers.js'
import { isMatrixAttempt, isMatrixResource } from '../../.orkestrel/agent/instruments/harness/.build/bench5/matrix/validators.js'

class CellDriver {
	#root = resolve(import.meta.dirname, '..', '..')

	execute(): void {
		const [cell, flag, ...extra] = process.argv.slice(2)
		if (cell === undefined || !['q4-think0', 'q4-think1', 'g2-think1', 'g4-think0', 'g4-think1', 'q2-think1'].includes(cell) || (flag !== undefined && flag !== '--live') || extra.length !== 0)
			throw new Error('usage: aggregate-final-cell-driver.ts q4-think0|q4-think1|g2-think1|g4-think0|g4-think1|q2-think1 [--live]')
		if (resolve(process.cwd()) !== this.#root)
			throw new Error(`explicit scaffold cwd required: ${this.#root}`)
		const results = join(this.#root, '.orkestrel', 'agent', 'instruments', 'results', 'l14')
		const directory = join(results, cell)
		const frozen = hashFile(join(directory, 'freeze', 'manifest.json'))
		const checked = readFrozen(frozen)
		if (`${checked.key}-think${checked.think ? 1 : 0}` !== cell)
			throw new Error('frozen cell identity differs from selected cell')
		const build = hashFile(join(this.#root, '.orkestrel', 'agent', 'instruments', 'harness', '.build', 'build-manifest.json'))
		readBuild()
		if (build.hash !== 'd361e9d8ec607ae7e21bcee966904effa2be9a0ccaa972eef8d25b540e977c54' || checked.deployment.hash !== 'c20472169bc4a0767cfa9882d7674825d84fa4be338b9bab1de386425c743eed')
			throw new Error('canonical build or deployment seal differs')
		const fit = checked.key === 'q4' || checked.key === 'g2' ? hashFile(join(results, 'calibration', checked.key, 'fit', 'fit.json')) : undefined
		if (fit !== undefined && fit.hash !== (checked.key === 'g2' ? '515ba2af23418808f425177a534d40c36c5f57943ee5697da6e1a3baf5f53d8f' : 'f694c01ffd924c8c59a17a3e190c4a2e90f4bcc89b4c82024a281f4954f1be56'))
			throw new Error('released strict fit seal differs')
		const sequence = join(this.#root, 'tmp', 'units', `aggregate-final-cell-driver-${cell}-sequence.jsonl`)
		const stages = ['resource', 'full', ...(fit === undefined ? [] : ['pilot'])].map((stage) => {
			const journal = join(results, 'logs', `${cell}-${stage}.jsonl`)
			const errors = join(results, 'logs', `${cell}-${stage}.err`)
			const out = join(directory, stage)
			const operator = [process.execPath, join(this.#root, '.orkestrel', 'agent', 'instruments', 'harness', '.build', 'bench5', 'matrix.js'), stage, '--frozen', frozen.path, ...(stage === 'resource' ? [] : ['--resource', join(directory, 'resource', 'manifest.json')]), ...(stage === 'pilot' && fit !== undefined ? ['--fit', fit.path] : []), '--out', out, '--live']
			return { stage, out, journal, errors, argv: [process.execPath, join(this.#root, '.agents', 'skills', 'orkestrel-dispatch', 'scripts', 'launch.ts'), '--journal', journal, '--errors', errors, '--cap', stage === 'pilot' ? '10800' : '7200', '--status', '--', ...operator] }
		})
		const paths = [sequence, ...stages.flatMap((stage) => [stage.out, stage.journal, stage.errors, `${stage.journal}.pid`, `${stage.journal}.status-before.txt`, `${stage.journal}.status-after.txt`])]
		if (new Set(paths).size !== paths.length) throw new Error('output, log, and sequence paths must differ')
		const plan = { cell, live: flag === '--live', frozen, build, deployment: checked.deployment, fit, admission: fit === undefined ? 'no pilot; exploratory development requires separate root admission' : 'released fit bytes; strict admission belongs to emitted operator', sequence, paths: paths.map((path) => ({ path, absent: !existsSync(path) })), commands: stages, outer: { cap: 25920, argv: [process.execPath, join(this.#root, '.agents', 'skills', 'orkestrel-dispatch', 'scripts', 'launch.ts'), '--journal', join(this.#root, 'tmp', 'units', `aggregate-final-cell-driver-${cell}-live.jsonl`), '--errors', join(this.#root, 'tmp', 'units', `aggregate-final-cell-driver-${cell}-live.err`), '--cap', '25920', '--status', '--', process.execPath, join(this.#root, 'tmp', 'units', 'aggregate-final-cell-driver.ts'), cell, '--live'] } }
		process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`)
		if (flag !== '--live') {
			if (!isDeepStrictEqual(readFrozen(frozen), checked)) throw new Error('frozen custody changed during dry preflight')
			return
		}
		for (const path of paths) if (existsSync(path)) throw new Error(`create-only path already exists: ${path}`)
		writeFileSync(sequence, `${JSON.stringify({ event: 'start', started: new Date().toISOString(), plan })}\n`, { flag: 'wx' })
		let refusal = false
		let original: number | undefined
		let resource: MatrixResource | undefined
		try {
			for (const stage of stages) {
				for (const path of [stage.out, stage.journal, stage.errors, `${stage.journal}.pid`, `${stage.journal}.status-before.txt`, `${stage.journal}.status-after.txt`])
					if (existsSync(path)) throw new Error(`create-only stage path already exists: ${path}`)
				if (!isDeepStrictEqual(readFrozen(frozen), checked)) throw new Error('frozen custody changed before stage')
				if (fit !== undefined && !isDeepStrictEqual(hashFile(fit.path), fit)) throw new Error('released fit custody changed before stage')
				const started = Date.now()
				appendFileSync(sequence, `${JSON.stringify({ event: 'command', stage: stage.stage, started: new Date(started).toISOString(), argv: stage.argv })}\n`)
				const result = spawnSync(process.execPath, stage.argv.slice(1), { cwd: this.#root, stdio: 'inherit', shell: false, windowsHide: true })
				original = result.status ?? 1
				appendFileSync(sequence, `${JSON.stringify({ event: 'result', stage: stage.stage, pid: result.pid, started: new Date(started).toISOString(), finished: new Date().toISOString(), exit: result.status, signal: result.signal, wall: Date.now() - started, error: result.error === undefined ? undefined : describeError(result.error) })}\n`)
				if (result.error !== undefined) throw result.error
				if (result.signal !== null || (result.status !== 0 && result.status !== 3)) throw new Error('operator ended with an operational exit or signal')
				const manifest = hashFile(join(stage.out, 'manifest.json'))
				let accepted: boolean
				if (stage.stage === 'resource') {
					resource = readResource(manifest, frozen)
					accepted = resource.accepted
				} else {
					if (resource === undefined || !resource.accepted) throw new Error('dependent stage lacks accepted resource')
					const records = resource.attempts.at(-1)
					if (records === undefined) throw new Error('resource lacks terminal attempt')
					const baseline = readAttempt(records)
					if (baseline === undefined) throw new Error('resource lacks decoded raw evidence')
					const value = readJSON(manifest.path)
					if (stage.stage === 'full') {
						if (!isRecord(value) || !isMatrixResource(value) || !isDeepStrictEqual(value.frozen, frozen) || value.attempts.length !== 1 || !isDeepStrictEqual(value.bound, buildMatrixBound(baseline)))
							throw new Error('full manifest or empirical bound differs')
						const attempt = value.attempts[0]
						if (attempt === undefined) throw new Error('full manifest lacks attempt')
						this.#readStage(attempt, 'full', frozen, hashFile(join(directory, 'resource', 'manifest.json')))
						if (value.accepted !== attempt.accepted || (value.accepted && !isDeepStrictEqual(value.budget, attempt.budget)) || (!value.accepted && value.budget !== undefined))
							throw new Error('full decision differs from measured attempt')
						accepted = value.accepted
					} else {
						if (!isRecord(value) || value.protocol !== 'l6' || !isDeepStrictEqual(value.frozen, frozen) || !isDeepStrictEqual(value.resource, hashFile(join(directory, 'resource', 'manifest.json'))) || !isDeepStrictEqual(value.fit, fit) || !isMatrixAttempt(value.attempt))
							throw new Error('pilot manifest custody differs')
						const run = this.#readStage(value.attempt, 'pilot', frozen, hashFile(join(directory, 'resource', 'manifest.json')))
						if (!isDeepStrictEqual(run.execution.fit, fit)) throw new Error('pilot released fit custody differs')
						const exposed = run.rows.filter((row) => matchesMatrixExposure(run, row.goal)).length
						const failures = [...value.attempt.failures, ...listMatrixPairFailures(baseline, run)]
						if (exposed <= run.rows.length / 2) failures.push('nonempty wire body exposure is not a majority of served development goals')
						if (value.served !== run.rows.length || value.exposed !== exposed || !isDeepStrictEqual(value.failures, failures) || value.accepted !== (failures.length === 0))
							throw new Error('pilot decision differs from emitted evidence helpers')
						accepted = failures.length === 0
					}
				}
				if (result.status !== (accepted ? 0 : 3)) throw new Error('operator exit differs from validated measured decision')
				appendFileSync(sequence, `${JSON.stringify({ event: 'validated', stage: stage.stage, manifest, accepted, finished: new Date().toISOString() })}\n`)
				refusal ||= !accepted
				if (stage.stage === 'resource' && !accepted) break
			}
			if (!isDeepStrictEqual(readFrozen(frozen), checked)) throw new Error('frozen custody changed at closure')
			if (fit !== undefined && !isDeepStrictEqual(hashFile(fit.path), fit)) throw new Error('released fit custody changed at closure')
			appendFileSync(sequence, `${JSON.stringify({ event: 'complete', finished: new Date().toISOString(), exit: refusal ? 3 : 0 })}\n`)
			process.exitCode = refusal ? 3 : 0
		} catch (error) {
			appendFileSync(sequence, `${JSON.stringify({ event: 'fault', finished: new Date().toISOString(), original, error: describeError(error) })}\n`)
			try {
				if (!isDeepStrictEqual(readFrozen(frozen), checked)) throw new Error('frozen custody changed at fault closure')
			} catch (closure) {
				appendFileSync(sequence, `${JSON.stringify({ event: 'custody', finished: new Date().toISOString(), error: describeError(closure) })}\n`)
			}
			process.stderr.write(`${describeError(error)}\n`)
			process.exitCode = original !== undefined && original !== 0 && original !== 3 ? original : 1
		}
	}

	#readStage(attempt: MatrixAttempt, phase: string, frozen: RefitFile, resource: RefitFile): MatrixRun {
		const run = readAttempt(attempt)
		verifyMatrixFeasibility(run)
		if (run === undefined || run.execution.phase !== phase || run.execution.arm !== (phase === 'full' ? 'full' : 'aggregate') || run.execution.copy !== 1 || !isDeepStrictEqual(run.execution.frozen, frozen) || !isDeepStrictEqual(run.execution.resource, resource))
			throw new Error('dependent attempt configuration differs')
		const admitted = readExecution(attempt.execution.path)
		if (!isDeepStrictEqual(admitted.execution, run.execution)) throw new Error('emitted execution admission differs from raw run')
		return run
	}
}

try {
	new CellDriver().execute()
} catch (error) {
	process.stderr.write(`${describeError(error)}\n`)
	process.exitCode = 1
}
