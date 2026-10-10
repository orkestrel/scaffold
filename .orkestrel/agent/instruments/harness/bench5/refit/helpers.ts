import type {
	RefitAttempt,
	RefitContext,
	RefitCorpus,
	RefitDiagnosis,
	RefitEvidence,
	RefitFile,
	RefitGeneration,
	RefitItem,
	RefitLabels,
	RefitReading,
	RefitRecall,
} from './types.js'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { isDeepStrictEqual } from 'node:util'
import { AGREE_QUESTION } from '../aggregates/constants.js'
import {
	buildAgreeState,
	buildSummaryPrompt,
	checkProse,
	collectStaleTokens,
	renderSource,
} from '../aggregates/helpers.js'
import { SAMPLER } from '../constants.js'
import { buildCacheKey, buildSummaryKey, computeDigest } from '../helpers.js'
import { REFIT_GRID, REFIT_LIMITATION } from './constants.js'

/** Reads a file's exact SHA-256 identity.
 * @param path - The file
 * @returns Its path and byte hash
 */
export function hashFile(path: string): RefitFile {
	return { path, hash: createHash('sha256').update(readFileSync(path)).digest('hex') }
}

/** Refuses any changed lineage file.
 * @param files - Frozen file identities
 */
export function verifyFiles(files: readonly RefitFile[]): void {
	for (const file of files)
		if (hashFile(file.path).hash !== file.hash) throw new Error(`custody mismatch: ${file.path}`)
}

/** Refuses missing, foreign, duplicated, or inconsistent retained cache observations.
 * @param attempts - Actual generation observations
 * @param evidence - Immutable exact cache rows
 * @param manifest - Generation configuration and cache lineage
 * @param model - Configuration-bound judge identity
 */
export function verifyEvidence(
	attempts: readonly RefitAttempt[],
	evidence: RefitEvidence,
	manifest: RefitGeneration,
	model: string,
): void {
	const summaries = new Set<string>()
	const judgments = new Set<string>()
	for (const attempt of attempts) {
		if (attempt.prose !== undefined || attempt.error === undefined) {
			const entry = evidence.summary.find((one) => one.row.key === attempt.key)
			if (entry === undefined) throw new Error('missing observed summary row')
			const row = entry.row
			if (
				row.model !== manifest.model ||
				!isDeepStrictEqual(row.sampler, SAMPLER) ||
				row.predict !== manifest.settings.predict ||
				row.key !== buildSummaryKey(row, attempt.prompt) ||
				row.prose !== attempt.prose ||
				row.raw !== attempt.raw ||
				row.wall !== attempt.duration ||
				!isDeepStrictEqual(row.usage, attempt.usage)
			)
				throw new Error('summary observation mismatch')
			summaries.add(row.key)
		}
		if (attempt.judge !== undefined) {
			const entry = evidence.judge.find((one) => one.row.key === attempt.judge?.key)
			if (entry === undefined) {
				if (attempt.error === undefined) throw new Error('missing observed judge row')
				continue
			}
			const row = entry.row
			if (
				row.model !== model ||
				row.state !== attempt.state ||
				!isDeepStrictEqual(row.question, AGREE_QUESTION) ||
				row.key !== buildCacheKey(model, row.state, AGREE_QUESTION) ||
				(attempt.error === undefined &&
					(row.error !== undefined || row.refusal !== undefined || row.answer?.form !== 'noul')) ||
				(row.answer?.form === 'noul' ? row.answer.noul : undefined) !== attempt.judge.score ||
				!isDeepStrictEqual(row.usage, attempt.judge.usage)
			)
				throw new Error('judge observation mismatch')
			judgments.add(row.key)
		}
	}
	if (summaries.size !== evidence.summary.length || judgments.size !== evidence.judge.length)
		throw new Error('cache observation membership mismatch')
	for (const entry of [...evidence.summary, ...evidence.judge])
		if (!manifest.lineage.after.some((file) => resolve(file.path) === resolve(entry.path)))
			throw new Error('missing observed cache lineage')
}

/** Refuses malformed source grouping, duplicated occurrences, or prompt/checker drift.
 * @param corpus - The frozen corpus
 */
export function verifyCorpus(corpus: RefitCorpus): void {
	if (corpus.contexts.length === 0 || corpus.points.length === 0) throw new Error('empty corpus')
	const ids = new Set<string>()
	for (const context of corpus.contexts) {
		if (ids.has(context.id)) throw new Error('duplicate context')
		ids.add(context.id)
		if (!corpus.points.some((point) => point.goal === context.goal))
			throw new Error('missing request point')
		if (context.sources.length === 0) throw new Error('empty source group')
		const groups = new Map<string, number>()
		for (const source of context.sources) {
			if (groups.has(source.id) && groups.get(source.id) !== source.seed)
				throw new Error('source grouping mismatch')
			groups.set(source.id, source.seed)
		}
		if (
			!isDeepStrictEqual(
				context.prompt,
				buildSummaryPrompt(context.topic.key, context.topic.title, context.date, context.sources),
			)
		)
			throw new Error('frozen prompt mismatch')
		if (
			!isDeepStrictEqual(
				context.stale,
				collectStaleTokens(
					[],
					context.listed,
					context.sources.map((source) => source.text),
				),
			)
		)
			throw new Error('frozen stale context mismatch')
	}
}

/** Builds one blinded item while retaining original message ids as opaque grouping keys.
 * @param attempt - The attempted draft
 * @param context - Its frozen source occurrence
 * @returns The score-free packet item
 */
export function buildRefitItem(attempt: RefitAttempt, context: RefitContext): RefitItem {
	return {
		id: attempt.id,
		question: AGREE_QUESTION,
		state: buildAgreeState({ prose: attempt.prose ?? '' }, context.sources),
		sources: context.sources,
	}
}

/** Checks label custody and an exact item-to-label bijection.
 * @param packet - Blinded items
 * @param labels - Root's labels
 */
export function verifyLabels(packet: readonly RefitItem[], labels: RefitLabels): void {
	const ids = new Set(packet.map((item) => item.id))
	if (ids.size !== packet.length || labels.labels.length !== packet.length)
		throw new Error('incomplete label coverage')
	const seen = new Set<string>()
	for (const label of labels.labels) {
		const item = packet.find((candidate) => candidate.id === label.id)
		if (seen.has(label.id) || item === undefined || computeDigest(item) !== label.item)
			throw new Error('label bijection or item hash mismatch')
		seen.add(label.id)
		if (
			label.verdict === 'supported' &&
			label.propositions.some((proposition) => proposition.verdict !== 'supported')
		)
			throw new Error('unsupported proposition in positive label')
		for (const proposition of label.propositions)
			for (const quote of proposition.evidence) {
				if (quote.length === 0 || !item.sources.map(renderSource).join('\n').includes(quote))
					throw new Error('label quotation absent from item')
			}
	}
}

/** Computes conditional judge recall and end-to-end admission separately.
 * @param readings - Audited generated or control records
 * @param cutoff - Candidate cutoff
 * @returns Generated supported population readings, retaining lexical failures
 */
export function measureRecall(readings: readonly RefitReading[], cutoff: number): RefitRecall {
	const supported = readings.filter(
		(reading) => reading.generated && reading.verdict === 'supported',
	)
	const scored = supported.filter((reading) => reading.lexical && reading.score !== undefined)
	const admitted = scored.filter(
		(reading) => reading.score !== undefined && reading.score >= cutoff,
	).length
	return {
		supported: supported.length,
		scored: scored.length,
		admitted,
		conditional: scored.length === 0 ? 0 : admitted / scored.length,
		admission: supported.length === 0 ? 0 : admitted / supported.length,
	}
}

/** Selects the lowest retained cutoff rejecting all scored negatives and ambiguities.
 * @param readings - Audited semantic and operational records
 * @param errors - Custody or cost failures that independently refuse preparation
 * @returns A diagnosis; an accepted result alone permits writing a fit
 */
export function fitReadings(
	readings: readonly RefitReading[],
	errors: readonly string[] = [],
): RefitDiagnosis {
	const reasons = [...errors]
	const negatives = readings.filter(
		(reading) => reading.verdict !== 'supported' && reading.score !== undefined,
	)
	const cutoff = REFIT_GRID.find((candidate) =>
		negatives.every((reading) => reading.score !== undefined && reading.score < candidate),
	)
	if (cutoff === undefined) reasons.push('no cutoff rejects every scored negative and ambiguity')
	if (readings.some((reading) => reading.lexical && reading.score === undefined))
		reasons.push('missing required score')
	if (
		readings.some(
			(reading) =>
				reading.score !== undefined &&
				(!Number.isFinite(reading.score) || reading.score < 0 || reading.score > 1),
		)
	)
		reasons.push('invalid score')
	const occurrences = measureRecall(readings, cutoff ?? 1)
	const identities = new Map<string, RefitReading>()
	for (const reading of readings) {
		const previous = identities.get(reading.identity)
		if (
			previous !== undefined &&
			(previous.verdict !== reading.verdict ||
				previous.lexical !== reading.lexical ||
				previous.score !== reading.score)
		)
			reasons.push('inconsistent duplicate identity')
		else identities.set(reading.identity, reading)
	}
	const distinct = measureRecall([...identities.values()], cutoff ?? 1)
	if (occurrences.supported === 0) reasons.push('absent supported generated population')
	if (occurrences.admission < 0.5) reasons.push('end-to-end admission below 0.5')
	return {
		accepted: reasons.length === 0,
		cutoff,
		reasons: [...new Set(reasons)],
		occurrences,
		distinct,
		readings,
		change: 0.56,
		limitation: REFIT_LIMITATION,
	}
}

/** Rechecks lexical evidence and builds immutable readings from independently labeled attempts.
 * @param attempts - All attempted drafts
 * @param contexts - Every source occurrence
 * @param labels - Verified independent labels
 * @returns One reading for every attempt
 */
export function collectReadings(
	attempts: readonly RefitAttempt[],
	contexts: readonly RefitContext[],
	labels: RefitLabels,
): readonly RefitReading[] {
	return attempts.map((attempt) => {
		const context = contexts.find((one) => one.id === attempt.context)
		const label = labels.labels.find((one) => one.id === attempt.id)
		if (context === undefined || label === undefined)
			throw new Error('attempt lacks source or label')
		const failures = checkProse(
			attempt.prose ?? '',
			[...context.sources.map(renderSource), context.topic.title, context.date],
			context.owners,
			context.stale,
		)
		if (attempt.failures !== undefined && !isDeepStrictEqual(failures, attempt.failures))
			throw new Error('lexical evidence mismatch')
		return {
			id: attempt.id,
			identity: computeDigest([
				AGREE_QUESTION,
				buildAgreeState({ prose: attempt.prose ?? '' }, context.sources),
				context.sources.map(({ seed, sentence }) => [seed, sentence]),
			]),
			generated: true,
			verdict: label.verdict,
			lexical: failures.length === 0,
			score: attempt.judge?.score,
		}
	})
}
