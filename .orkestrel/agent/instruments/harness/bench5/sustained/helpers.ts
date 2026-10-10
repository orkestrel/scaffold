import type { EnduranceRuntime } from '../endurance/types.js'
import type { MatrixFreeze } from '../matrix/types.js'
import type { RefitFile } from '../refit/types.js'
import type {
	SustainedClassification,
	SustainedExecution,
	SustainedLimits,
	SustainedRun,
	SustainedSelection,
} from './types.js'
import { isDeepStrictEqual } from 'node:util'
import { dirname, join } from 'node:path'
import { isRecord } from '@orkestrel/contract'
import { readJSON, readRows, readWireReading } from '../helpers.js'
import { readRuntime } from '../endurance/helpers.js'
import { buildBudget, readFrozen, readResource, readAttempt } from '../matrix/helpers.js'
import { verifyFiles } from '../refit/helpers.js'
import { isMatrixAttempt, isMatrixRequest } from '../matrix/validators.js'
import { isRefitFile, isRefitGeneration } from '../refit/validators.js'
import { readSustainedRun } from './parsers.js'
import { listMatrixPairFailures } from '../matrix/helpers.js'
import {
	isSustainedClassification,
	isSustainedExecution,
	isSustainedSelection,
} from './validators.js'
import { readWorkload } from '../build/helpers.js'

/** Holds the accepted feasibility-only ranking. */
export const SUSTAINED_RANK = Object.freeze(['q4', 'g4', 'q2', 'g2'])

/** Derives the fixed evaluation limits from complete same-configuration development measurements.
 * @param runs - The complete paired development evidence
 * @param goals - The held-out fixed horizon
 * @returns The unchanged retry policy and development-derived finite limits
 */
export function buildEvaluationLimits(
	runs: readonly SustainedRun[],
	goals: number,
): SustainedLimits {
	const first = runs[0]
	if (first === undefined || runs.some((run) => run.failures.length > 0))
		throw new Error('complete development evidence required for limits')
	const scale = goals / Math.max(...runs.map((run) => run.runtime.goals.length))
	const calls = Math.max(...runs.map((run) => run.requests.filter((one) => one.sent).length))
	const tokens = Math.max(
		...runs.map((run) =>
			run.costs.wire.reduce((total, cost) => total + cost.prompt + cost.completion, 0),
		),
	)
	const wall = Math.max(
		...runs.map((run) => (typeof run.costs.elapsed === 'number' ? run.costs.elapsed : 0)),
	)
	return {
		calls: Math.max(1, Math.ceil(calls * scale * 2)),
		tokens: Math.max(1, Math.ceil(tokens * scale * 2)),
		wall: Math.max(1, Math.ceil(wall * scale * 2)),
		retries: first.frozen.configuration.retry,
		goals,
		derivation: `Twice the maximum complete same-configuration development expenditure, scaled by evaluation/development goals (${scale}); all roles included; no reserve/window/retry change. Wall is whole-run elapsed, never the sum of overlapping timers.`,
		evidence: runs.flatMap((run) => run.files),
	}
}

/** Verifies genuine failed development preparation without accepting arbitrary diagnoses or quality labels.
 * @param reference - Retained classification, generation, or unseparated fit
 * @param runtime - Exact development runtime
 * @param frozen - Exact candidate configuration
 */
export function readPreparationFailure(
	reference: RefitFile,
	runtime: RefitFile,
	frozen: RefitFile,
): void {
	verifyFiles([reference, runtime, frozen])
	const value = readJSON(reference.path)
	if (isSustainedClassification(value)) {
		if (
			value.accepted ||
			value.failures.length === 0 ||
			value.runtime.hash !== runtime.hash ||
			value.frozen.hash !== frozen.hash
		)
			throw new Error('preparation is successful or foreign')
		verifyFiles([value.cache, ...value.files])
		const metadata = value.files.find((file) => file.path.endsWith('run.json'))
		const info = metadata === undefined ? undefined : readJSON(metadata.path)
		const requests =
			metadata === undefined ? [] : readRows(join(dirname(metadata.path), 'requests.jsonl'))
		if (
			!isRecord(info) ||
			info.status === 'complete' ||
			!isSustainedExecution(info.execution) ||
			info.execution.phase !== 'filing' ||
			info.execution.runtime.hash !== runtime.hash ||
			info.execution.frozen.hash !== frozen.hash ||
			!requests.every(isMatrixRequest) ||
			!requests.some(
				(request) =>
					request.sent &&
					(request.error !== undefined ||
						(request.status ?? 500) >= 400 ||
						!readWireReading({ body: request.request }, { text: request.response }).complete ||
						request.prompt === undefined ||
						request.completion === undefined ||
						request.failures.length > 0),
			)
		)
			throw new Error('failed filing lacks actual resource or integrity evidence')
		return
	}
	const configuration = readFrozen(frozen)
	if (isRefitGeneration(value)) {
		if (
			value.complete ||
			value.errors.length === 0 ||
			value.sustained?.runtime.hash !== runtime.hash ||
			!isDeepStrictEqual(value.matrix, configuration)
		)
			throw new Error('generation is successful or foreign')
		readClassification(value.sustained.classification, runtime, frozen)
		verifyFiles([value.evidence, ...value.files])
		return
	}
	if (
		!isRecord(value) ||
		value.separated !== false ||
		!isRecord(value.sustained) ||
		value.sustained.runtime !== runtime.hash ||
		!isRecord(value.matrix) ||
		!isDeepStrictEqual(value.matrix.files, configuration.files) ||
		!isDeepStrictEqual(value.matrix.summarizer, configuration.summarizer) ||
		!isDeepStrictEqual(value.matrix.judge, configuration.judge) ||
		value.matrix.settings !== configuration.settings.hash ||
		!isRecord(value.preparation) ||
		!isRefitFile(value.preparation.manifest) ||
		!isRefitFile(value.preparation.labels) ||
		!isRecord(value.custody)
	)
		throw new Error('unseparated development fit evidence required')
	verifyFiles([value.preparation.manifest, value.preparation.labels])
	const generated = readJSON(value.preparation.manifest.path)
	if (
		!isRefitGeneration(generated) ||
		!generated.complete ||
		generated.errors.length !== 0 ||
		generated.sustained?.runtime.hash !== runtime.hash ||
		generated.sustained.classification.hash !== value.sustained.classification ||
		!isDeepStrictEqual(generated.matrix, configuration) ||
		value.custody.manifest !== value.preparation.manifest.hash ||
		value.custody.labels !== value.preparation.labels.hash
	)
		throw new Error('unseparated fit custody differs')
	readClassification(generated.sustained.classification, runtime, frozen)
	verifyFiles([generated.evidence, ...generated.files])
}

/** Reads sealed classification evidence and refuses changed scenario or role ancestry.
 * @param reference - Exact manifest identity
 * @param runtime - Required runtime bytes
 * @param frozen - Required matrix configuration bytes
 * @returns Verified runtime-only classification ancestry
 */
export function readClassification(
	reference: RefitFile,
	runtime: RefitFile,
	frozen: RefitFile,
): SustainedClassification {
	verifyFiles([reference, runtime, frozen])
	const value = readJSON(reference.path)
	if (
		!isSustainedClassification(value) ||
		!value.accepted ||
		value.failures.length !== 0 ||
		value.runtime.hash !== runtime.hash ||
		value.frozen.hash !== frozen.hash
	)
		throw new Error('foreign, failed, or corrupt classification ancestry')
	verifyFiles([value.cache, ...value.files])
	const run = value.files.find((file) => file.path.endsWith('run.json'))
	const report = run === undefined ? undefined : readJSON(run.path)
	if (
		!isRecord(report) ||
		report.protocol !== 'e1' ||
		report.status !== 'complete' ||
		!isSustainedExecution(report.execution) ||
		report.execution.phase !== 'filing' ||
		report.execution.runtime.hash !== runtime.hash ||
		report.execution.frozen.hash !== frozen.hash
	)
		throw new Error('classification has no complete runtime-only filing evidence')
	const requests = run === undefined ? [] : readRows(join(dirname(run.path), 'requests.jsonl'))
	if (
		!requests.every(isMatrixRequest) ||
		requests.some((request) => {
			const reading = readWireReading({ body: request.request }, { text: request.response })
			return (
				!request.sent ||
				request.error !== undefined ||
				(request.status ?? 500) >= 400 ||
				request.role !== 'judge' ||
				!reading.complete ||
				reading.prompt === undefined ||
				reading.completion === undefined ||
				request.prompt !== reading.prompt ||
				request.completion !== reading.completion ||
				request.failures.length > 0
			)
		})
	)
		throw new Error('classification raw usage or completion is invalid')
	return value
}

/** Checks the accepted development fit and explicit transfer custody.
 * @param reference - Fitted thresholds
 * @param frozen - Required role and source identity
 * @param development - The runtime used to fit, distinct from held-out runtime
 */
export function verifySustainedFit(
	reference: RefitFile,
	frozen: MatrixFreeze,
	development: RefitFile,
): void {
	verifyFiles([reference, development])
	const fit = readJSON(reference.path)
	if (
		!isRecord(fit) ||
		fit.separated !== true ||
		!isRecord(fit.sustained) ||
		fit.sustained.runtime !== development.hash ||
		!isRecord(fit.matrix) ||
		!isDeepStrictEqual(fit.matrix.summarizer, frozen.summarizer) ||
		!isDeepStrictEqual(fit.matrix.judge, frozen.judge) ||
		!isDeepStrictEqual(fit.matrix.files, frozen.files) ||
		fit.matrix.settings !== frozen.settings.hash
	)
		throw new Error('development fit transfer lacks accepted exact scenario and role custody')
	if (
		!isRecord(fit.preparation) ||
		!isRefitFile(fit.preparation.manifest) ||
		!isRefitFile(fit.preparation.attempts) ||
		!isRefitFile(fit.preparation.corpus) ||
		!isRefitFile(fit.preparation.labels) ||
		!isRecord(fit.custody)
	)
		throw new Error('development fit lacks independent calibration custody')
	verifyFiles([
		fit.preparation.manifest,
		fit.preparation.attempts,
		fit.preparation.corpus,
		fit.preparation.labels,
	])
	const generation = readJSON(fit.preparation.manifest.path)
	if (
		!isRefitGeneration(generation) ||
		!generation.complete ||
		generation.errors.length !== 0 ||
		generation.sustained?.runtime.hash !== development.hash ||
		generation.sustained.classification.hash !== fit.sustained.classification ||
		generation.attempts !== fit.preparation.attempts.hash ||
		generation.corpus !== fit.preparation.corpus.hash ||
		fit.custody.manifest !== fit.preparation.manifest.hash ||
		fit.custody.labels !== fit.preparation.labels.hash
	)
		throw new Error('development fit generation or adjudication differs')
	verifyFiles([generation.evidence, ...generation.files])
}

/** Reads the retained first-feasible choice, including a fully evidenced inconclusive result.
 * @param path - Selection manifest
 * @returns Verified frozen ranked selection
 */
export function readSustainedSelection(path: string): SustainedSelection {
	const value = readJSON(path)
	if (!isSustainedSelection(value)) throw new Error('invalid e1 selection')
	verifyFiles([value.development, value.evaluation])
	const development = readRuntime(value.development.path)
	const evaluation = readRuntime(value.evaluation.path)
	let expectedLimits: SustainedLimits | undefined
	if (
		!isDeepStrictEqual(
			value.order,
			value.seed % 2 === 0 ? ['records', 'aggregate'] : ['aggregate', 'records'],
		)
	)
		throw new Error('arm order differs from frozen seed')
	if (development.id === evaluation.id || value.development.hash === value.evaluation.hash)
		throw new Error('development and held-out identities must differ')
	for (const [at, candidate] of value.candidates.entries()) {
		if (candidate.key !== SUSTAINED_RANK[at])
			throw new Error('candidate ranking skipped a configuration')
		const frozen = readFrozen(candidate.frozen)
		if (frozen.key !== candidate.key || frozen.think)
			throw new Error('endurance requires ranked non-thinking configuration')
		const resource = readResource(candidate.resource, candidate.frozen)
		const pilot = candidate.pilot === undefined ? undefined : readJSON(candidate.pilot.path)
		if (candidate.pilot !== undefined) verifyFiles([candidate.pilot])
		const pilotRun =
			isRecord(pilot) && isMatrixAttempt(pilot.attempt) ? readAttempt(pilot.attempt) : undefined
		if (
			candidate.accepted &&
			(!resource.accepted ||
				!isRecord(pilot) ||
				pilot.accepted !== true ||
				pilotRun?.execution.phase !== 'pilot' ||
				pilotRun.execution.frozen.hash !== candidate.frozen.hash)
		)
			throw new Error('candidate matrix feasibility not established')
		const developmentRuns = candidate.attempts.map((attempt) => {
			verifyFiles([attempt.execution, ...attempt.files])
			const run = readSustainedRun(attempt.run)
			if (
				run.execution.phase !== 'development' ||
				run.execution.runtime.hash !== value.development.hash ||
				run.execution.frozen.hash !== candidate.frozen.hash ||
				run.execution.resource.hash !== candidate.resource.hash ||
				attempt.accepted !== (run.failures.length === 0) ||
				run.rows.length !== attempt.served ||
				run.observations.filter((one) => one.exposed).length !== attempt.exposed ||
				!isDeepStrictEqual(run.files, attempt.files)
			)
				throw new Error('development attempt contradicts raw evidence')
			return run
		})
		if (
			candidate.accepted &&
			(candidate.classification === undefined ||
				candidate.fit === undefined ||
				candidate.attempts.length !== 2 ||
				candidate.attempts.some((attempt) => !attempt.accepted || attempt.failures.length !== 0))
		)
			throw new Error('candidate lacks paired development feasibility')
		if (candidate.classification !== undefined)
			readClassification(candidate.classification, value.development, candidate.frozen)
		if (candidate.fit !== undefined) verifySustainedFit(candidate.fit, frozen, value.development)
		if (candidate.preparation !== undefined) {
			if (candidate.accepted) throw new Error('accepted candidate carries failed preparation')
			readPreparationFailure(candidate.preparation, value.development, candidate.frozen)
		}
		const records = developmentRuns.find((run) => run.execution.arm === 'records')
		const aggregate = developmentRuns.find((run) => run.execution.arm === 'aggregate')
		const pairedFailure =
			records !== undefined &&
			aggregate !== undefined &&
			(listMatrixPairFailures(records, aggregate).length !== 0 ||
				aggregate.observations.filter((one) => one.exposed).length <= aggregate.rows.length / 2)
		if (
			!candidate.accepted &&
			resource.accepted &&
			candidate.preparation === undefined &&
			!(
				isRecord(pilot) &&
				pilot.accepted === false &&
				isMatrixAttempt(pilot.attempt) &&
				!pilot.attempt.accepted &&
				pilot.attempt.failures.length > 0
			) &&
			!candidate.attempts.some((attempt) => !attempt.accepted && attempt.failures.length > 0) &&
			!pairedFailure
		)
			throw new Error('infeasible candidate lacks retained failed evidence')
		if (candidate.accepted) {
			if (
				records === undefined ||
				aggregate === undefined ||
				listMatrixPairFailures(records, aggregate).length !== 0 ||
				aggregate.observations.filter((one) => one.exposed).length <= aggregate.rows.length / 2
			)
				throw new Error('paired development or majority exposure is not established')
			expectedLimits = buildEvaluationLimits(developmentRuns, evaluation.goals.length)
		}
		if (at < value.candidates.length - 1 && candidate.accepted)
			throw new Error('ranking continued after feasible configuration')
	}
	const chosen = value.candidates.at(-1)
	if (
		value.accepted
			? chosen?.accepted !== true ||
				value.chosen !== chosen.key ||
				value.limits === undefined ||
				value.failures.length !== 0
			: value.chosen !== undefined ||
				value.limits !== undefined ||
				value.candidates.length !== SUSTAINED_RANK.length ||
				value.candidates.some((candidate) => candidate.accepted)
	)
		throw new Error('selection contradicts ranked feasibility evidence')
	if (!isDeepStrictEqual(value.limits, expectedLimits))
		throw new Error('evaluation limits differ from complete development derivation')
	if (value.limits !== undefined) verifyFiles(value.limits.evidence)
	return value
}

/** Reads a safe runtime-bound shared Driver execution.
 * @param path - Execution file
 * @returns Validated identity, role freeze, and safe runtime
 */
export function readSustainedExecution(path: string): {
	readonly execution: SustainedExecution
	readonly frozen: MatrixFreeze
	readonly runtime: EnduranceRuntime
} {
	const execution = readJSON(path)
	if (!isSustainedExecution(execution)) throw new Error('invalid e1 execution')
	verifyFiles([execution.runtime, ...execution.limits.evidence])
	const frozen = readFrozen(execution.frozen)
	const resource = readResource(execution.resource, execution.frozen)
	if (!resource.accepted || !isDeepStrictEqual(resource.budget, execution.budget))
		throw new Error('e1 resource budget differs from accepted matrix reserve')
	const runtime = readRuntime(execution.runtime.path)
	readWorkload(execution.runtime)
	if (
		frozen.key !== execution.key ||
		frozen.think ||
		!isDeepStrictEqual(execution.budget, buildBudget(execution.budget.reserve)) ||
		execution.limits.goals !== runtime.goals.length ||
		execution.limits.retries !== frozen.configuration.retry
	)
		throw new Error('e1 frozen configuration or complete horizon differs')
	if (execution.phase === 'filing') {
		if (
			execution.arm !== 'records' ||
			execution.classification !== undefined ||
			execution.fit !== undefined
		)
			throw new Error('filing must start from runtime-only empty ancestry')
	} else {
		if (execution.classification === undefined)
			throw new Error('sealed runtime classification required')
		readClassification(execution.classification, execution.runtime, execution.frozen)
		let development = execution.runtime
		if (execution.phase === 'evaluation') {
			if (execution.selection === undefined)
				throw new Error('held-out execution requires frozen selection')
			verifyFiles([execution.selection])
			const selection = readSustainedSelection(execution.selection.path)
			const candidate = selection.candidates.at(-1)
			if (
				!selection.accepted ||
				selection.chosen !== execution.key ||
				selection.evaluation.hash !== execution.runtime.hash ||
				candidate?.frozen.hash !== execution.frozen.hash ||
				!isDeepStrictEqual(selection.limits, execution.limits) ||
				execution.fit?.hash !== candidate.fit?.hash
			)
				throw new Error('held-out execution differs from frozen choice or transfer')
			development = selection.development
		}
		if (execution.arm === 'aggregate') {
			if (execution.fit === undefined)
				throw new Error('aggregate execution requires accepted development fit')
			verifySustainedFit(execution.fit, frozen, development)
		}
	}
	return { execution, frozen, runtime }
}
