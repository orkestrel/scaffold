import { buildSupportRows } from '../support/helpers.js'
import type { MatrixDevelopment } from '../../matrix/types.js'
import { readFrozen, buildBudget } from '../../matrix/helpers.js'
import type { EvidenceCase, MembershipCase } from './types.js'
import type {
	RefitAttempt,
	RefitContext,
	RefitCorpus,
	RefitEvidence,
	RefitGeneration,
	RefitLabels,
	RefitOptions,
	RefitVerdict,
} from '../../refit/types.js'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { createOllamaJudge } from '../../../vendor/ollama/index.js'
import { AGREE_QUESTION } from '../../aggregates/constants.js'
import {
	COPIES_DIR,
	HARNESS,
	MODELS,
	SAMPLER,
	MICA_MODEL,
	MICA_SYSTEM,
	MICA_CALIBRATION,
	MICA_CONTEXT,
} from '../../constants.js'
import { buildSummaryKey, computeDigest, readJSON, readRows } from '../../helpers.js'
import { REFIT_CONTROLS } from '../../refit/constants.js'
import { buildRefitItem, hashFile, readRefitControls } from '../../refit/helpers.js'
import {
	isRefitAttempt,
	isRefitControl,
	isRefitCorpus,
	isRefitGeneration,
} from '../../refit/validators.js'

/** Writes inert predecessor artifacts while using the real successor freeze and policy validator. */
export function writeDevelopmentFixture(
	directory: string,
	frozenPath: string,
	withhold?: boolean,
): MatrixDevelopment {
	const frozen = readFrozen(hashFile(frozenPath))
	const previous = { ...frozen, census: frozen.seed }
	const predecessor = join(directory, 'predecessor.json')
	writeFileSync(predecessor, JSON.stringify(previous))
	const packet = join(directory, 'packet.jsonl')
	const labels = join(directory, 'labels.json')
	const generation = join(directory, 'generation.json')
	const diagnosis = join(directory, 'diagnosis.json')
	const resource = join(directory, 'resource.json')
	const full = join(directory, 'full.json')
	writeFileSync(packet, '')
	writeFileSync(labels, '{}')
	writeFileSync(generation, JSON.stringify({ matrix: previous }))
	writeFileSync(
		diagnosis,
		JSON.stringify({
			accepted: false,
			cutoff: 0.93,
			change: 0.56,
			preparation: {
				manifest: hashFile(generation),
				packet: hashFile(packet),
				labels: hashFile(labels),
				corpus: hashFile(packet),
				attempts: hashFile(packet),
			},
		}),
	)
	const expanded = { reserve: 512, window: 1068663, ceiling: 262144, predict: 0 }
	const resourceExecution = join(directory, 'resource-execution.json')
	const fullExecution = join(directory, 'full-execution.json')
	writeFileSync(
		resourceExecution,
		JSON.stringify({
			protocol: 'l6',
			key: 'q2',
			think: false,
			phase: 'resource',
			arm: 'records',
			copy: 1,
			frozen: hashFile(predecessor),
			budget: buildBudget(512),
		}),
	)
	writeFileSync(
		fullExecution,
		JSON.stringify({
			protocol: 'l6',
			key: 'q2',
			think: false,
			phase: 'full',
			arm: 'full',
			copy: 1,
			frozen: hashFile(predecessor),
			budget: expanded,
		}),
	)
	writeFileSync(
		resource,
		JSON.stringify({
			protocol: 'l6',
			frozen: hashFile(predecessor),
			accepted: true,
			budget: buildBudget(512),
			attempts: [
				{
					execution: hashFile(resourceExecution),
					run: directory,
					budget: buildBudget(512),
					accepted: true,
					failures: [],
					resource: false,
					files: [],
				},
			],
		}),
	)
	writeFileSync(
		full,
		JSON.stringify({
			protocol: 'l6',
			frozen: hashFile(predecessor),
			accepted: false,
			bound: { window: expanded.window },
			attempts: [
				{
					execution: hashFile(fullExecution),
					run: directory,
					budget: expanded,
					accepted: false,
					failures: ['transport'],
					resource: false,
					files: [],
				},
			],
		}),
	)
	return {
		phase: 'development',
		frozen: hashFile(frozenPath),
		predecessor: hashFile(predecessor),
		diagnosis: hashFile(diagnosis),
		labels: hashFile(labels),
		packet: hashFile(packet),
		generation: hashFile(generation),
		resource: hashFile(resource),
		full: hashFile(full),
		agree: 0.67,
		change: 0.56,
		selection: 'highest-grid-majority-occurrences-and-identities',
		continuation: 'failed-goal-after-xml-function-parameter-error',
		...(withhold === undefined ? {} : { withhold }),
		limitation: 'seed-candidates-do-not-certify-diverged-history',
		paired: buildBudget(512),
		expanded,
	}
}

/** Reads the separately retained whole-control observations. */
export function readControls(path: string) {
	return readRows(join(path, 'controls.jsonl')).map((value) => {
		if (!isRefitControl(value)) throw new Error('invalid test control')
		return value
	})
}

/** Seeds current component observations without reusing archived scalar scores. */
export function writeControlCache(path: string): void {
	mkdirSync(path)
	const model = createOllamaJudge({
		model: MICA_MODEL,
		system: MICA_SYSTEM,
		calibration: { temperature: MICA_CALIBRATION },
		options: { num_ctx: MICA_CONTEXT },
	}).model
	writeFileSync(
		join(path, 'judge.jsonl'),
		readRefitControls(REFIT_CONTROLS)
			.flatMap((control) =>
				control.lexical
					? buildSupportRows(
							model,
							control.candidate,
							control.sources,
							control.verdict === 'supported' ? 1 : 0.77,
						)
					: [],
			)
			.map((row) => JSON.stringify(row))
			.join('\n') + '\n',
	)
}

/** Builds explicit command options for isolated fixtures. */
export function buildOptions(out: string, overrides: Partial<RefitOptions> = {}): RefitOptions {
	return {
		phase: 'freeze',
		out,
		cache: join(HARNESS, '..', 'results', 'l5', 'pilot-resumption', 'cache'),
		corpus: '',
		attempts: '',
		labels: '',
		controls: REFIT_CONTROLS,
		scenario: join(COPIES_DIR, 'v1.json'),
		settings: join(HARNESS, 'bench5', 'settings.json'),
		model: MODELS.q2,
		url: 'http://127.0.0.1:9',
		live: false,
		...overrides,
	}
}

/** Reads a typed corpus after the command writes it. */
export function readCorpus(path: string): RefitCorpus {
	const value = readJSON(join(path, 'corpus.json'))
	if (!isRefitCorpus(value)) throw new Error('invalid test corpus')
	return value
}

/** Writes a single real projected context as an isolated fixture corpus. */
export function writeCorpus(path: string, corpus: RefitCorpus, context: RefitContext): void {
	mkdirSync(path)
	writeFileSync(
		join(path, 'corpus.json'),
		JSON.stringify({
			...corpus,
			contexts: [context],
			points: corpus.points.filter((point) => point.goal === context.goal),
		}),
	)
	writeFileSync(
		join(path, 'manifest.json'),
		JSON.stringify({ corpus: hashFile(join(path, 'corpus.json')).hash }),
	)
}

/** Reads all attempt rows and refuses a malformed test journal. */
export function readAttempts(path: string): readonly RefitAttempt[] {
	return readRows(join(path, 'attempts.jsonl')).map((value) => {
		if (!isRefitAttempt(value)) throw new Error('invalid test attempt')
		return value
	})
}

/** Writes the review's exact cached summary and AGREE observations without a service request. */
export function writeCache(
	path: string,
	context: RefitContext,
	duration: number | undefined,
): void {
	mkdirSync(path)
	const prose = context.sources[0]?.text ?? ''
	const model = createOllamaJudge({
		model: MICA_MODEL,
		system: MICA_SYSTEM,
		calibration: { temperature: MICA_CALIBRATION },
		options: { num_ctx: MICA_CONTEXT },
	}).model
	writeFileSync(
		join(path, 'summary.jsonl'),
		JSON.stringify({
			key: buildSummaryKey({ model: MODELS.q2, sampler: SAMPLER, predict: 160 }, context.prompt),
			model: MODELS.q2,
			sampler: SAMPLER,
			predict: 160,
			prose,
			raw: prose,
			usage: { prompt: 20, completion: 10, total: 30 },
			wall: duration,
			origin: 'live',
			at: 1,
		}).replace('"wall":null', duration === Infinity ? '"wall":1e400' : '"wall":null') + '\n',
	)
	writeFileSync(
		join(path, 'judge.jsonl'),
		[
			...buildSupportRows(model, prose, context.sources, 1),
			...readRefitControls(REFIT_CONTROLS).flatMap((control) =>
				control.lexical
					? buildSupportRows(
							model,
							control.candidate,
							control.sources,
							control.verdict === 'supported' ? 1 : 0.77,
						)
					: [],
			),
		]
			.map((row) => JSON.stringify(row))
			.join('\n') + '\n',
	)
}

/** Writes inert root labels for deterministic fitting tests. */
export function writeLabels(
	path: string,
	attempts: string,
	context: RefitContext,
	verdict: RefitVerdict = 'supported',
): RefitLabels {
	const manifest = readJSON(join(attempts, 'manifest.json'))
	if (!isRefitGeneration(manifest)) throw new Error('invalid generation manifest')
	const labels: RefitLabels = {
		authority: 'root-adjudicated',
		corpus: manifest.corpus,
		attempts: manifest.attempts,
		packet: manifest.packet,
		manifest: hashFile(join(attempts, 'manifest.json')).hash,
		labels: readAttempts(attempts).map((attempt) => ({
			id: attempt.id,
			item: computeDigest(buildRefitItem(attempt, context)),
			verdict,
			propositions: [
				{
					text: attempt.prose ?? '',
					verdict,
					evidence: [context.sources[0]?.text ?? AGREE_QUESTION.instructions ?? ''],
				},
			],
		})),
	}
	writeFileSync(path, JSON.stringify(labels))
	return labels
}

/** Builds missing, altered, and duplicated cache observations. */
export function buildEvidenceCases(evidence: RefitEvidence): readonly EvidenceCase[] {
	return [
		['deleted-judge', { ...evidence, judge: [] }, false],
		[
			'changed-record-time',
			{
				...evidence,
				summary: evidence.summary.map((entry) => ({
					...entry,
					row: { ...entry.row, at: entry.row.at + 1 },
				})),
			},
			false,
		],
		[
			'changed-summary',
			{
				...evidence,
				summary: evidence.summary.map((entry) => ({
					...entry,
					row: { ...entry.row, raw: 'changed raw observation' },
				})),
			},
			false,
		],
		['missing-summary', { ...evidence, summary: [] }, true],
		['missing-judge', { ...evidence, judge: [] }, true],
		[
			'duplicated-summary',
			{ ...evidence, summary: [...evidence.summary, ...evidence.summary] },
			true,
		],
		[
			'wrong-summary',
			{
				...evidence,
				summary: evidence.summary.map((entry) => ({
					...entry,
					row: { ...entry.row, raw: 'changed raw observation' },
				})),
			},
			true,
		],
		[
			'wrong-judge',
			{
				...evidence,
				judge: evidence.judge.map((entry) => ({
					...entry,
					row: { ...entry.row, state: 'changed state' },
				})),
			},
			true,
		],
	]
}

/** Builds empty required source and cache memberships. */
export function buildMembershipCases(manifest: RefitGeneration): readonly MembershipCase[] {
	return [
		['files', [], manifest.lineage],
		['lineage', manifest.files, { before: [], after: [] }],
		[
			'judge-lineage',
			manifest.files,
			{
				...manifest.lineage,
				after: manifest.lineage.after.filter((file) => !file.path.endsWith('judge.jsonl')),
			},
		],
	]
}
