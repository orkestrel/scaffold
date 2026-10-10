import type { Message } from '@orkestrel/agent'
import type { TokenUsage } from '@orkestrel/budget'
import type { SummarizerOptions, SummaryResult, SummaryRow } from './types.ts'
import { appendFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { computeDigest, readRows } from './helpers.ts'

// The key helper and the row guard stay beside the class until types.ts, constants.ts, and helpers.ts take them.
const SUMMARY_MISS = 'summary cache miss'

function buildSummaryKey(options: SummarizerOptions, messages: readonly Message[]): string {
	return computeDigest([
		options.model,
		options.sampler,
		options.predict,
		messages.map((message) => [message.role, message.content]),
	])
}

function isUsage(value: unknown): value is TokenUsage {
	return (
		typeof value === 'object' &&
		value !== null &&
		typeof Reflect.get(value, 'prompt') === 'number' &&
		typeof Reflect.get(value, 'completion') === 'number' &&
		typeof Reflect.get(value, 'total') === 'number'
	)
}

function isSummaryRow(value: unknown): value is SummaryRow {
	if (typeof value !== 'object' || value === null) return false
	const usage: unknown = Reflect.get(value, 'usage')
	const origin: unknown = Reflect.get(value, 'origin')
	return (
		typeof Reflect.get(value, 'key') === 'string' &&
		typeof Reflect.get(value, 'prose') === 'string' &&
		typeof Reflect.get(value, 'raw') === 'string' &&
		typeof Reflect.get(value, 'wall') === 'number' &&
		typeof Reflect.get(value, 'at') === 'number' &&
		(origin === 'corpus' || origin === 'live') &&
		(usage === undefined || isUsage(usage))
	)
}

/**
 * Generates aggregate prose from a message list through its own provider, and answers a repeated list from a rows file.
 *
 * @remarks
 * The provider must be built with the sampler and `num_predict` that the options carry, because the key records them and the provider sends them. The class never touches a ledger, so the ledger's emitter, gauge, and conversation never see a summarizer call.
 *
 * @example
 * ```ts
 * const summarizer = new Summarizer({ provider, model, sampler: SAMPLER, predict: 160, cache: 'tmp/cache/summary.jsonl', live: true })
 * const { prose } = await summarizer.summarize(messages, signal)
 * ```
 */
export class Summarizer {
	readonly #options: SummarizerOptions
	readonly #rows = new Map<string, SummaryRow>()

	/**
	 * Loads the rows file when it exists.
	 * @param options - The provider, model identity, sampler, generation cap, rows file, and live flag
	 */
	constructor(options: SummarizerOptions) {
		this.#options = options
		if (existsSync(options.cache)) {
			for (const row of readRows(options.cache)) {
				if (isSummaryRow(row)) this.#rows.set(row.key, row)
			}
		}
		if (options.live) mkdirSync(dirname(options.cache), { recursive: true })
	}

	/**
	 * Summarizes a message list from the cache, or from the provider on a live miss.
	 * @param messages - The system and user messages of the summary prompt
	 * @param signal - The caller's signal
	 * @returns The trimmed prose, the untrimmed output, the usage and wall time of the recorded call, and whether the cache answered
	 * @remarks Thrown on an offline miss, and when the provider fails; a failed or aborted call appends no row.
	 */
	async summarize(messages: readonly Message[], signal: AbortSignal): Promise<SummaryResult> {
		const key = buildSummaryKey(this.#options, messages)
		const row = this.#rows.get(key)
		if (row !== undefined) return { prose: row.prose, raw: row.raw, usage: row.usage, wall: row.wall, cached: true }
		if (!this.#options.live) throw new Error(SUMMARY_MISS)
		const started = performance.now()
		const result = await this.#options.provider.generate(messages, signal, undefined, { think: false })
		const wall = performance.now() - started
		const fresh: SummaryRow = {
			key,
			model: this.#options.model,
			sampler: this.#options.sampler,
			predict: this.#options.predict,
			prose: result.content.trim(),
			raw: result.content,
			...(result.usage === undefined ? {} : { usage: result.usage }),
			wall,
			origin: 'live',
			at: Date.now(),
		}
		appendFileSync(this.#options.cache, `${JSON.stringify(fresh)}\n`)
		this.#rows.set(key, fresh)
		return { prose: fresh.prose, raw: fresh.raw, usage: fresh.usage, wall, cached: false }
	}
}
