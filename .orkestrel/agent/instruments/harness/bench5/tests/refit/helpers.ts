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
import { buildAgreeState } from '../../aggregates/helpers.js'
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
import { buildCacheKey, buildSummaryKey, computeDigest, readJSON, readRows } from '../../helpers.js'
import { REFIT_CONTROLS } from '../../refit/constants.js'
import { buildRefitItem, hashFile } from '../../refit/helpers.js'
import { isRefitAttempt, isRefitCorpus, isRefitGeneration } from '../../refit/validators.js'

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
	const state = buildAgreeState({ prose }, context.sources)
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
		JSON.stringify({
			key: buildCacheKey(model, state, AGREE_QUESTION),
			model,
			state,
			question: AGREE_QUESTION,
			answer: { form: 'noul', noul: 1 },
			usage: { prompt: 30, completion: 1, total: 31 },
			wall: 20,
			origin: 'live',
			at: 1,
		}) + '\n',
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
