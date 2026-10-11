import type {
	MatrixAttempt,
	MatrixBudget,
	MatrixCosts,
	MatrixExecution,
	MatrixFailure,
	MatrixFreeze,
	MatrixIdentity,
	MatrixOutcome,
	MatrixRequest,
	MatrixResource,
	MatrixRole,
	MatrixRun,
} from './types.js'
import type { RefitFile } from '../refit/types.js'
import type { CallRole, Copy } from '../types.js'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { isDeepStrictEqual } from 'node:util'
import { isRecord } from '@orkestrel/contract'
import { LEDGER_SCALE_DRIFT } from '../../vendor/agent-0.0.30-trimmed/index.js'
import { readCopy } from '../Driver.js'
import {
	COPIES_DIR,
	HARNESS,
	MICA_CALIBRATION,
	MICA_CONTEXT,
	MICA_MODEL,
	MODELS,
	SAMPLER,
} from '../constants.js'
import {
	matchesExposure,
	matchesSummaryBlock,
	readJSON,
	readScoreCarriers,
	readWireReading,
} from '../helpers.js'
import { INSTRUCTION_SUMMARIES, SUMMARIES_HEADING } from '../aggregates/constants.js'
import { collectSummaryBodies, countSoleTokens } from '../aggregates/helpers.js'
import { hashFile, verifyFiles } from '../refit/helpers.js'
import { MATRIX_ADMISSION, MATRIX_RESERVES } from './constants.js'
import {
	isMatrixAttempt,
	isMatrixExecution,
	isMatrixFreeze,
	isMatrixResource,
} from './validators.js'
import { parseMatrixRun } from './parsers.js'
import { BUILD, readBuild } from '../build/helpers.js'

/** Returns an unambiguous protocol, role-policy, arm, and copy result key.
 * @param cell - The explicit l6 identity
 * @returns The immutable run name
 */
export function nameMatrix(cell: MatrixIdentity): string {
	return `l6-${cell.key}-think${cell.think ? '1' : '0'}-${cell.arm}-v${cell.copy}`
}

/** Computes the protocol's exact invariant paired reservation.
 * @param reserve - A member of the fixed reserve ladder
 * @returns The physical window and ledger reservation
 */
export function buildBudget(reserve: number): MatrixBudget {
	if (!MATRIX_RESERVES.includes(reserve)) throw new Error('reserve is outside the fixed ladder')
	return { reserve, window: MATRIX_ADMISSION + reserve, predict: reserve - 512 }
}

/** Lists all executable bench5 sources recursively, excluding test and frozen data.
 * @param directory - The source root
 * @returns Sorted TypeScript source paths
 */
export function listMatrixSources(directory: string = join(HARNESS, 'bench5')): readonly string[] {
	return readdirSync(directory, { withFileTypes: true })
		.flatMap((entry) =>
			entry.isDirectory()
				? entry.name === 'tests'
					? []
					: listMatrixSources(join(directory, entry.name))
				: entry.name.endsWith('.ts')
					? [join(directory, entry.name)]
					: [],
		)
		.sort()
}

/** Hashes the complete source and frozen vendor population.
 * @returns Byte identities whose changes invalidate a matrix configuration
 */
export function readMatrixFiles(): readonly RefitFile[] {
	readBuild()
	return [
		join(BUILD, 'build-manifest.json'),
		...listMatrixSources(),
		join(HARNESS, 'tools', 'run-one.ts'),
		join(HARNESS, 'tools', 'series.ts'),
		join(HARNESS, 'vendor', 'agent-0.0.30-trimmed', 'index.js'),
		join(HARNESS, 'vendor', 'ollama', 'index.js'),
		join(HARNESS, 'bench', 'scenario-long.json'),
		...Array.from({ length: 8 }, (_entry, at) =>
			join(HARNESS, 'bench', 'variants', 'long', `v${at + 1}.json`),
		),
	].map(hashFile)
}

/** Reads an actual daemon model digest, refusing an absent or ambiguous tag.
 * @param tags - The retained api/tags response
 * @param model - The exact requested tag
 * @returns The daemon's digest
 */
export function readModelDigest(tags: unknown, model: string): string {
	if (!isRecord(tags) || !Array.isArray(tags.models))
		throw new Error('missing actual model inventory')
	const matches = tags.models.filter(
		(entry: unknown) => isRecord(entry) && (entry.name === model || entry.model === model),
	)
	const entry: unknown = matches[0]
	if (
		matches.length !== 1 ||
		!isRecord(entry) ||
		typeof entry.digest !== 'string' ||
		!/^(sha256:)?[a-f0-9]{64}$/.test(entry.digest)
	)
		throw new Error(`actual digest unavailable for ${model}`)
	return entry.digest
}

/** Verifies frozen source, role configuration, and seed custody.
 * @param reference - The immutable freeze file
 * @returns The validated configuration
 */
export function readFrozen(reference: RefitFile): MatrixFreeze {
	verifyFiles([reference])
	const frozen = readJSON(reference.path)
	if (!isMatrixFreeze(frozen)) throw new Error('invalid l6 freeze manifest')
	verifyFiles([...frozen.files, frozen.settings, frozen.seed, frozen.census, frozen.tags])
	if (!isDeepStrictEqual(frozen.files, readMatrixFiles()))
		throw new Error('stale source or scenario population; re-freeze required')
	const model = Object.entries(MODELS).find(([key]) => key === frozen.key)?.[1]
	const settings = readJSON(frozen.settings.path)
	if (!isRecord(settings) || !isDeepStrictEqual(settings[frozen.key], frozen.configuration))
		throw new Error('settings/corpus configuration mismatch')
	const expected: readonly MatrixRole[] = [
		{ model: model ?? '', digest: frozen.decision.digest, think: frozen.think, sampler: SAMPLER },
		{
			model: model ?? '',
			digest: frozen.summarizer.digest,
			think: false,
			sampler: { ...SAMPLER, num_predict: frozen.configuration.predict },
		},
		{
			model: MICA_MODEL,
			digest: frozen.judge.digest,
			think: false,
			sampler: { num_ctx: MICA_CONTEXT, calibration: MICA_CALIBRATION },
		},
	]
	for (const [at, role] of [frozen.decision, frozen.summarizer, frozen.judge].entries()) {
		if (
			!isDeepStrictEqual(role, expected[at]) ||
			readModelDigest(readJSON(frozen.tags.path), role.model) !== role.digest
		)
			throw new Error('frozen role configuration differs from the accepted protocol')
	}
	return frozen
}

/** Reads a complete reserve decision and validates the fixed no-score ladder.
 * @param reference - The resource decision
 * @param frozen - The expected freeze identity
 * @returns The accepted or refused resource record
 */
export function readResource(reference: RefitFile, frozen: RefitFile): MatrixResource {
	verifyFiles([reference])
	const resource = readJSON(reference.path)
	if (
		!isMatrixResource(resource) ||
		!isDeepStrictEqual(resource.frozen, frozen) ||
		resource.attempts.length === 0
	)
		throw new Error('invalid resource custody')
	for (const [at, attempt] of resource.attempts.entries()) {
		const run = readAttempt(attempt)
		if (run === undefined) throw new Error('operational resource fault lacks raw evidence')
		verifyMatrixFeasibility(run)
		if (
			run !== undefined &&
			(run.execution.phase !== 'resource' ||
				run.execution.arm !== 'records' ||
				run.execution.copy !== 1 ||
				!isDeepStrictEqual(run.execution.frozen, frozen))
		)
			throw new Error('resource attempt configuration mismatch')
		if (!isDeepStrictEqual(attempt.budget, buildBudget(MATRIX_RESERVES[at] ?? 0)))
			throw new Error('resource ladder skipped a reserve')
		if (at < resource.attempts.length - 1 && (attempt.accepted || !attempt.resource))
			throw new Error('resource ladder advanced without explicit resource refusal')
	}
	const last = resource.attempts.at(-1)
	if (
		resource.accepted !== last?.accepted ||
		(resource.accepted && !isDeepStrictEqual(resource.budget, last?.budget))
	)
		throw new Error('resource decision differs from its terminal attempt')
	return resource
}

/** Recomputes admission from retained raw run evidence, never from scores.
 * @param attempt - The declared attempt
 * @returns Its exact decoded evidence when available
 */
export function readAttempt(attempt: MatrixAttempt): MatrixRun | undefined {
	verifyFiles([attempt.execution, ...attempt.files])
	const execution = readJSON(attempt.execution.path)
	if (!isMatrixExecution(execution) || !isDeepStrictEqual(execution.budget, attempt.budget))
		throw new Error('attempt execution differs')
	const run = attempt.files.length === 0 ? undefined : parseMatrixRun(attempt.run)
	if (
		run !== undefined &&
		(!isDeepStrictEqual(run.files, attempt.files) || !isDeepStrictEqual(run.execution, execution))
	)
		throw new Error('attempt evidence differs')
	if (
		attempt.accepted &&
		(run === undefined || run.failures.length !== 0 || attempt.failures.length !== 0)
	)
		throw new Error('accepted attempt lacks complete valid evidence')
	if (attempt.resource !== (run !== undefined && permitsReserve(run.requests)))
		throw new Error('reserve advancement differs from raw resource evidence')
	return run
}

/** Validates phase admission and immutable execution custody.
 * @param path - The explicit execution manifest
 * @returns The execution and frozen roles
 */
export function readExecution(path: string): {
	readonly execution: MatrixExecution
	readonly frozen: MatrixFreeze
} {
	const execution = readJSON(path)
	if (!isMatrixExecution(execution)) throw new Error('invalid l6 execution manifest')
	const frozen = readFrozen(execution.frozen)
	if (execution.key !== frozen.key || execution.think !== frozen.think)
		throw new Error('decision configuration mismatch')
	if (
		execution.arm !== 'full' &&
		!isDeepStrictEqual(execution.budget, buildBudget(execution.budget.reserve))
	)
		throw new Error('paired budget mapping differs')
	if (execution.phase !== 'evaluation' && execution.copy !== 1)
		throw new Error('development is copy 1 only')
	if (execution.phase === 'evaluation' && execution.copy === 1)
		throw new Error('copy 1 cannot be evaluated')
	if (execution.phase === 'resource' && execution.arm !== 'records')
		throw new Error('reserve preflight must use records')
	if (execution.phase === 'full' && execution.arm !== 'full')
		throw new Error('full preflight must use full')
	if (execution.phase === 'pilot' && execution.arm !== 'aggregate')
		throw new Error('pilot must use aggregate')
	if (execution.phase !== 'resource') {
		if (execution.resource === undefined) throw new Error('accepted resource manifest required')
		const resource = readResource(execution.resource, execution.frozen)
		if (!resource.accepted || resource.budget?.reserve !== execution.budget.reserve)
			throw new Error('resource configuration is infeasible')
	}
	if (execution.arm === 'aggregate') {
		if (execution.fit === undefined) throw new Error('accepted fit manifest required')
		verifyFiles([execution.fit])
		const fit = readJSON(execution.fit.path)
		if (
			!isRecord(fit) ||
			fit.separated !== true ||
			!isRecord(fit.matrix) ||
			!isDeepStrictEqual(fit.matrix.summarizer, frozen.summarizer) ||
			!isDeepStrictEqual(fit.matrix.judge, frozen.judge) ||
			!isDeepStrictEqual(fit.matrix.files, frozen.files) ||
			fit.matrix.settings !== frozen.settings.hash ||
			fit.matrix.seed !== frozen.seed.hash
		)
			throw new Error(
				'stale or unaccepted fit identity; re-freeze, generate, blind-audit, and fit required',
			)
		if (execution.phase === 'evaluation') {
			if (execution.pilot === undefined) throw new Error('accepted aggregate pilot required')
			verifyFiles([execution.pilot])
			const pilot = readJSON(execution.pilot.path)
			if (
				!isRecord(pilot) ||
				pilot.accepted !== true ||
				!isDeepStrictEqual(pilot.frozen, execution.frozen) ||
				!isDeepStrictEqual(pilot.resource, execution.resource) ||
				!isDeepStrictEqual(pilot.fit, execution.fit) ||
				typeof pilot.served !== 'number' ||
				typeof pilot.exposed !== 'number' ||
				pilot.served <= 0 ||
				pilot.exposed <= pilot.served / 2
			)
				throw new Error('aggregate pilot lacks invariant success and majority body exposure')
			if (!isMatrixAttempt(pilot.attempt) || !pilot.attempt.accepted)
				throw new Error('pilot lacks accepted attempt')
			const run = readAttempt(pilot.attempt)
			if (
				run !== undefined &&
				(!isDeepStrictEqual(run.execution.frozen, execution.frozen) ||
					!isDeepStrictEqual(run.execution.resource, execution.resource))
			)
				throw new Error('pilot configuration differs from evaluation')
			if (
				run === undefined ||
				run.execution.phase !== 'pilot' ||
				!isDeepStrictEqual(run.execution.budget, execution.budget) ||
				!isDeepStrictEqual(run.execution.fit, execution.fit) ||
				run.rows.length !== pilot.served ||
				run.rows.filter((row) => matchesMatrixExposure(run, row.goal)).length !== pilot.exposed
			)
				throw new Error('pilot exposure differs from actual body evidence')
		}
	}
	if (execution.arm === 'full' && execution.phase === 'evaluation') {
		if (execution.full === undefined) throw new Error('accepted full-view preflight required')
		verifyFiles([execution.full])
		const full = readJSON(execution.full.path)
		if (
			!isMatrixResource(full) ||
			full.accepted !== true ||
			!isDeepStrictEqual(full.frozen, execution.frozen) ||
			!isDeepStrictEqual(full.budget, execution.budget) ||
			full.attempts.length !== 1
		)
			throw new Error('full-view configuration is infeasible or changed')
		for (const attempt of full.attempts) {
			const run = readAttempt(attempt)
			if (
				!attempt.accepted ||
				run === undefined ||
				run.execution.phase !== 'full' ||
				!isDeepStrictEqual(run.execution.budget, execution.budget) ||
				!isDeepStrictEqual(run.execution.resource, execution.resource)
			)
				throw new Error('full-view preflight differs')
		}
	}
	return { execution, frozen }
}

/** Classifies actual wire evidence without consulting an answer or score.
 * @param role - The request role
 * @param request - The exact sent JSON body
 * @param response - The retained raw response
 * @param budget - The role's frozen physical bounds
 * @param status - The actual HTTP status
 * @param error - A transport error, if present
 * @returns Explicit resource and operational refusal categories
 */
export function listResourceFailures(
	role: CallRole,
	request: unknown,
	response: string | undefined,
	budget: MatrixBudget,
	status?: number,
	error?: string,
): readonly MatrixFailure[] {
	if (role !== 'agent') return error !== undefined || (status ?? 0) >= 400 ? ['transport'] : []
	const failures = new Set<MatrixFailure>()
	if (error !== undefined || (status ?? 0) >= 400) return ['transport']
	if (
		!isRecord(request) ||
		request.truncate !== false ||
		!isRecord(request.options) ||
		request.options.num_ctx !== budget.window ||
		request.options.num_predict !== budget.reserve
	)
		failures.add('request')
	const reading = readWireReading({ body: request }, { text: response })
	if (
		!reading.complete ||
		reading.prompt === undefined ||
		reading.completion === undefined ||
		reading.reason === undefined
	)
		failures.add('usage')
	if (reading.reason === 'length') failures.add('length')
	if (reading.completion !== undefined && reading.completion > budget.reserve)
		failures.add('completion')
	if (
		reading.prompt !== undefined &&
		reading.completion !== undefined &&
		reading.prompt + reading.completion >= budget.window
	)
		failures.add('capacity')
	for (const line of (response ?? '').split(/\r\n|\n/)) {
		if (line.trim() === '') continue
		try {
			const value: unknown = JSON.parse(line)
			if (isRecord(value) && (value.truncated === true || value.truncation === true))
				failures.add('truncation')
		} catch {
			failures.add('usage')
		}
	}
	return [...failures]
}

/** Derives request validity from the retained HTTP boundary and completed response.
 * @param request - Actual request and response evidence
 * @param budget - Frozen decision bounds
 * @returns A completed request, measured resource refusal, or operational fault
 */
export function readRequestOutcome(request: MatrixRequest, budget: MatrixBudget): MatrixOutcome {
	if (
		!request.sent ||
		request.error !== undefined ||
		request.status === undefined ||
		request.status < 200 ||
		request.status >= 300 ||
		!isRecord(request.request)
	)
		return 'fault'
	let truncated = false
	try {
		for (const line of (request.response ?? '')
			.split(/\r\n|\n/)
			.filter((entry) => entry.trim() !== '')) {
			const value: unknown = JSON.parse(line)
			if (!isRecord(value)) return 'fault'
			truncated ||= value.truncated === true || value.truncation === true
		}
	} catch {
		return 'fault'
	}
	const reading = readWireReading({ body: request.request }, { text: request.response })
	if (!reading.complete) return 'fault'
	const failures =
		request.goal === undefined
			? []
			: listResourceFailures(
					request.role,
					request.request,
					request.response,
					budget,
					request.status,
				)
	if (failures.includes('request')) return 'fault'
	const options = request.request.options
	if (
		reading.prompt === undefined ||
		reading.completion === undefined ||
		reading.reason === 'length' ||
		truncated ||
		failures.length !== 0 ||
		(isRecord(options) &&
			((typeof options.num_predict === 'number' && reading.completion > options.num_predict) ||
				(typeof options.num_ctx === 'number' &&
					reading.prompt + reading.completion >= options.num_ctx)))
	)
		return 'refused'
	return 'complete'
}

/** Refuses operational matrix faults as evidence for eliminating a configuration.
 * @param run - Decoded retained matrix evidence
 */
export function verifyMatrixFeasibility(run: MatrixRun | undefined): void {
	if (run === undefined) throw new Error('operational matrix fault lacks raw evidence')
	const outcomes = run.requests.map((request) => readRequestOutcome(request, run.execution.budget))
	for (const request of run.requests) {
		const role =
			request.role === 'summarizer'
				? run.frozen.summarizer
				: request.role === 'judge'
					? run.frozen.judge
					: run.frozen.decision
		if (
			!isRecord(request.request) ||
			request.request.model !== role.model ||
			(request.role === 'summarizer' && !isDeepStrictEqual(request.request.options, role.sampler))
		)
			throw new Error('operational matrix fault has invalid role custody')
	}
	if (outcomes.includes('fault') || (run.status !== 'complete' && !outcomes.includes('refused')))
		throw new Error('operational matrix fault is not configuration infeasibility')
}

/** Determines whether a refused trajectory permits the next fixed reserve.
 * @param requests - Actual request observations
 * @returns Whether an explicit resource refusal occurred with no other cause
 */
export function permitsReserve(requests: readonly MatrixRequest[]): boolean {
	const failures = requests.flatMap((request) => request.failures)
	return (
		failures.length > 0 &&
		failures.every(
			(failure) =>
				failure === 'length' ||
				failure === 'capacity' ||
				failure === 'completion' ||
				failure === 'truncation',
		)
	)
}

/** Reads exact seed bytes for a configuration-scoped fresh cache.
 * @param frozen - The checked freeze
 * @returns The immutable cache prefix
 */
export function readSeedCache(frozen: MatrixFreeze): string {
	verifyFiles([frozen.seed])
	return readFileSync(frozen.seed.path, 'utf8')
}

/** Checks nonempty bound prose in the exact matching system block of an actual sent request.
 * @param run - The decoded run
 * @param goal - The served goal
 * @returns Whether that goal received the treatment body
 */
export function matchesMatrixExposure(
	run: Pick<MatrixRun, 'picks' | 'requests'> & { readonly execution: Pick<MatrixExecution, 'arm'> },
	goal: string,
): boolean {
	return matchesExposure(
		{
			info: { arm: run.execution.arm },
			picks: run.picks,
			calls: run.requests
				.filter((request) => request.sent)
				.map((request) => ({ sequence: request.sequence, role: request.role, goal: request.goal })),
			wire: new Map(
				run.requests
					.filter((request) => request.sent)
					.map((request) => [
						request.sequence,
						readWireReading({ body: request.request }, { text: request.response }),
					]),
			),
		},
		goal,
	)
}

/** Checks actual system-block custody, admission, and sole-token invariants without the archived fixed completion cap.
 * @param run - The exact request and selection evidence
 * @returns Invariant failures on actual sent requests
 */
export function listMatrixWireFailures(
	run: Pick<MatrixRun, 'execution' | 'picks' | 'requests' | 'gauge'>,
): readonly string[] {
	return listWireInvariantFailures(run, readCopy(join(COPIES_DIR, `v${run.execution.copy}.json`)))
}

/** Rechecks common wire invariants against an explicit safe scenario projection.
 * @param run - Actual selection and wire evidence
 * @param copy - The exact projected runtime
 * @returns Raw admission, support, and recovery failures
 */
export function listWireInvariantFailures(
	run: Pick<MatrixRun, 'picks' | 'requests' | 'gauge'>,
	copy: Copy,
): readonly string[] {
	const failures: string[] = []
	for (const request of run.requests.filter(
		(entry) => entry.sent && entry.role === 'agent' && entry.goal !== undefined,
	)) {
		const reading = readWireReading({ body: request.request }, { text: request.response })
		const pick = run.picks.findLast(
			(entry) => entry.goal === request.goal && entry.sequence < request.sequence,
		)
		const body = pick?.instructions[INSTRUCTION_SUMMARIES.name] ?? ''
		const system = reading.messages
			.filter((message) => message.role === 'system')
			.map((message) => message.content)
			.join('\n')
		const matched = matchesSummaryBlock(body, reading.messages)
		if (system.includes(SUMMARIES_HEADING) && !matched)
			failures.push(`request ${request.sequence}: unbound or stale summary block`)
		if (body !== '' && (!matched || (pick?.aggregates?.length ?? 0) === 0))
			failures.push(
				`request ${request.sequence}: recorded body is absent or lacks maintained binding`,
			)
		if (pick !== undefined && pick.pass > 1 && body !== '')
			failures.push(`request ${request.sequence}: summary on recovery`)
		if (matched) {
			const shown = reading.messages
				.map((message) =>
					message.role === 'system' ? message.content.replace(body, '') : message.content,
				)
				.join('\n')
			const goal = copy.goals.find((entry) => entry.id === request.goal)
			if (goal === undefined) throw new Error('wire goal absent from frozen scenario')
			const own = readScoreCarriers(goal, collectSummaryBodies(body).join('\n'))
			const seen = readScoreCarriers(goal, shown)
			if (own.expected.some((phrase) => !seen.expected.includes(phrase)))
				failures.push(`request ${request.sequence}: sole-carried scored phrase`)
			if (own.stale.some((phrase) => !seen.stale.includes(phrase)))
				failures.push(
					`request ${request.sequence} ${request.goal}: sole-carried stale phrase ${JSON.stringify(own.stale.filter((phrase) => !seen.stale.includes(phrase)))}`,
				)
			if (countSoleTokens(collectSummaryBodies(body).join('\n'), shown) > 0)
				failures.push(`request ${request.sequence}: sole-carried summary token`)
			const first = run.requests.find(
				(entry) => entry.goal === request.goal && entry.role === 'agent' && entry.sent,
			)
			if (
				first === request &&
				(request.estimate === undefined ||
					pick?.scale === undefined ||
					run.gauge === undefined ||
					request.estimate * pick.scale + run.gauge.overhead > MATRIX_ADMISSION)
			)
				failures.push(`request ${request.sequence}: first-request admission ceiling exceeded`)
		}
	}
	return failures
}

/** Retains the paired gauge and initial-plan invariants across every actual trajectory.
 * @param records - The resource-matched records run
 * @param aggregate - The maintained aggregate run
 * @returns Protocol invariant differences
 */
export function listMatrixPairFailures(
	records: Pick<MatrixRun, 'picks' | 'gauge' | 'rows'>,
	aggregate: Pick<MatrixRun, 'picks' | 'gauge' | 'rows'>,
): readonly string[] {
	const failures: string[] = []
	const left = records.picks[0]
	const right = aggregate.picks[0]
	if (
		left === undefined ||
		right === undefined ||
		left.digest !== right.digest ||
		!isDeepStrictEqual(left.tail, right.tail) ||
		left.scale !== right.scale ||
		!isDeepStrictEqual(records.gauge, aggregate.gauge)
	)
		failures.push('initial paired selection or calibrated gauge differs')
	for (const row of aggregate.rows) {
		const prior = records.rows.find((entry) => entry.goal === row.goal)
		if (
			prior !== undefined &&
			(prior.scale <= 0 || Math.abs(row.scale - prior.scale) / prior.scale > LEDGER_SCALE_DRIFT)
		)
			failures.push(`${row.goal}: paired gauge drift exceeds ledger bound`)
	}
	return failures
}

/** Separates calibration, actual fresh requests, cache reuse, and maintenance elapsed time.
 * @param run - The exact retained run
 * @returns Measured costs without charging cached token usage as fresh calls
 */
export function measureMatrixCosts(
	run: Pick<MatrixRun, 'path' | 'rows' | 'requests'>,
): MatrixCosts {
	const info = readJSON(join(run.path, 'run.json'))
	return {
		wire: ['agent', 'judge', 'summarizer', 'flush'].flatMap((role) =>
			(['calibration', 'trajectory'] as const).map((phase) => {
				const requests = run.requests.filter(
					(request) =>
						request.role === role &&
						request.sent &&
						(request.goal === undefined) === (phase === 'calibration'),
				)
				return {
					phase,
					role,
					requests: requests.length,
					wall: requests.reduce((total, request) => total + request.wall, 0),
					prompt: requests.reduce((total, request) => total + (request.prompt ?? 0), 0),
					completion: requests.reduce((total, request) => total + (request.completion ?? 0), 0),
					missing: requests.filter(
						(request) => request.prompt === undefined || request.completion === undefined,
					).length,
				}
			}),
		),
		judge: isRecord(info) ? info.judge : undefined,
		lineage: isRecord(info) ? info.lineage : undefined,
		elapsed: isRecord(info) ? info.wall : undefined,
		stage: run.rows.reduce((total, row) => total + row.stage, 0),
		flush: run.rows.reduce((total, row) => total + row.flush, 0),
	}
}
