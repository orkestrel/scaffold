import type { JudgeQuestion, Message, Selection } from '@orkestrel/agent'
import type {
	AggregateAsked,
	AggregateContext,
	AggregateDrop,
	AggregateEntry,
	AggregateFailure,
	AggregateRendering,
	AggregateRow,
	AggregateSource,
	AggregateTopic,
	AggregateTrigger,
	AggregateVersion,
	AggregatorOptions,
} from '../types.ts'
import { appendFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
// The vendored build is the one import of the agent in bench5; repoint this path when a later build is vendored.
import { LEDGER_OWNER_PREFIX } from '../../vendor/agent-0.0.30/index.js'
import { describeError, findDay } from '../helpers.ts'
import { AGREE_HEAD, AGREE_QUESTION, CHANGE_HEAD } from './constants.ts'
import {
	buildAgreeState,
	buildChangeQuestion,
	buildChangeState,
	buildRefs,
	buildSummaryPrompt,
	checkProse,
	collectIds,
	collectStaleTokens,
	collectTopicMembers,
	collectTopicSources,
	collectTopics,
	compareSources,
	countSoleTokens,
	filterProse,
	priceText,
	renderBody,
	renderSource,
	renderSummaries,
} from './helpers.ts'

/**
 * Keeps one summary per desk topic and per owner, rebuilds it when its sources change, and renders the summaries that the control arm's text already carries.
 *
 * @remarks
 * `maintain` runs after the ledger files the request and before the agent reads the prompt. A desk topic is maintained at every read point. An owner is maintained only when the request names it. The class never throws: it logs an error, withholds the topic for that read point, and drops the topic's version, so the next read point builds it again.
 *
 * @example
 * ```ts
 * const aggregator = new Aggregator({ mirror, summarizer, judge, fit, settings, days, seeds, path, log })
 * await aggregator.maintain(request, 'g01', 47, signal)
 * const { text } = aggregator.render(selection, request, system, 'Today is Thursday 2026-10-08.', scale)
 * ```
 */
export class Aggregator {
	readonly #options: AggregatorOptions
	readonly #versions = new Map<string, AggregateVersion>()
	readonly #counts = new Map<string, number>()
	readonly #gone = new Map<string, readonly string[]>()
	readonly #days = new Map<string, string>()
	readonly #withheld = new Set<string>()

	/**
	 * Creates the rows directory.
	 * @param options - The mirror, summarizer, judge, cutoffs, settings, days, seed indices, rows file, and logger
	 */
	constructor(options: AggregatorOptions) {
		this.#options = options
		mkdirSync(dirname(options.path), { recursive: true })
	}

	/**
	 * Builds or rebuilds the summaries that the request reads.
	 *
	 * @param request - The request message, which the mirror has noted
	 * @param goal - The goal id that the rows record
	 * @param lastSeed - The index of the last seed message added
	 * @param signal - The caller's signal; an abort ends the pass without a throw
	 * @remarks
	 * A first build, a removed source line, an arriving message that CHANGE reads as a change, and a failed code check each build the topic. A removed line rebuilds without asking. AGREE runs after a build only. A build that fails the code check or AGREE is marked stale and built again, up to `settings.retry` more times, and then the topic is withheld.
	 */
	async maintain(request: Message, goal: string, lastSeed: number, signal: AbortSignal): Promise<void> {
		this.#withheld.clear()
		try {
			const { mirror, days, seeds } = this.#options
			const input = mirror.input()
			const projection = mirror.projection(input)
			for (const message of input.messages) {
				if (!this.#days.has(message.id)) {
					this.#days.set(message.id, findDay(days, seeds.get(message.id) ?? lastSeed)?.date ?? '')
				}
			}
			const context: AggregateContext = {
				input,
				projection,
				goal,
				lastSeed,
				asOf: findDay(days, lastSeed)?.date ?? '',
				signal,
			}
			for (const topic of collectTopics(projection, input, mirror.owners(request))) {
				if (signal.aborted) return
				await this.#update(topic, context)
			}
		} catch (error) {
			this.#options.log(`aggregate maintain ${goal}: ${describeError(error)}`)
		}
	}

	/**
	 * Renders the summaries block for a prompt.
	 *
	 * @param selection - The ledger's selection; its briefing and messages are the text the control arm shows
	 * @param request - The request message
	 * @param systemText - The system text of the prompt
	 * @param dateText - The date line of the prompt
	 * @param scale - The tokens one estimate unit costs, from the ledger's gauge
	 * @returns The block text, the topics rendered, the topics cut by the allowance, the topics withheld, the topics left without prose, the sentences filtered, the count of tokens that only the block carries, and the block price
	 * @remarks
	 * The request's owners come first, then the desk topics it names. A sentence renders only when every id, number, and name candidate occurs in the shown text, and an entry renders only when its title does. Whole entries are cut from the end until the block fits `settings.allowance`.
	 */
	render(
		selection: Selection,
		request: Message,
		systemText: string,
		dateText: string,
		scale: number,
	): AggregateRendering {
		const { mirror, settings } = this.#options
		const shown = [selection.briefing ?? '', ...selection.messages.map((message) => message.content), systemText, dateText].join('\n')
		const order = [
			...new Set([...mirror.owners(request).map((id) => `${LEDGER_OWNER_PREFIX}${id}`), ...mirror.near(request)]),
		]
		const entries: AggregateEntry[] = []
		const emptied: string[] = []
		const filtered: AggregateDrop[] = []
		for (const key of order) {
			const version = this.#versions.get(key)
			if (version === undefined) continue
			if (countSoleTokens(version.title, shown) > 0) {
				emptied.push(key)
				continue
			}
			const kept = filterProse(version.prose, version.ids, shown)
			filtered.push(...kept.dropped.map((sentence): AggregateDrop => ({ topic: key, sentence })))
			if (kept.prose === '') emptied.push(key)
			else entries.push({ key, title: version.title, date: version.asOf, ids: kept.ids, prose: kept.prose })
		}
		const block = renderSummaries(entries, settings.allowance, (text) => priceText(text, scale))
		return {
			text: block.text,
			topics: block.kept.map((entry) => entry.key),
			cut: block.cut.map((entry) => entry.key),
			withheld: order.filter((key) => this.#withheld.has(key)),
			emptied,
			filtered,
			sole: countSoleTokens(block.kept.map(renderBody).join('\n'), shown),
			tokens: block.tokens,
		}
	}

	// Decides whether the topic keeps its version, rebuilds it, or builds it first; an error withholds the topic.
	async #update(topic: AggregateTopic, context: AggregateContext): Promise<void> {
		try {
			const sources = collectTopicSources(context.projection, context.input, topic, this.#days)
			const current = this.#versions.get(topic.key)
			if (sources.length === 0) {
				if (current !== undefined) this.#retire(topic.key, current.sources)
				return
			}
			if (current === undefined) {
				await this.#build(topic, sources, context, 'first')
				return
			}
			const { removed, arrived } = compareSources(current.sources, sources)
			if (removed.length > 0) {
				this.#forget(topic.key, removed)
				await this.#build(topic, sources, context, 'removed')
				return
			}
			if (arrived.length === 0) return
			for (const id of arrived) {
				const lines = sources.filter((source) => source.id === id)
				if (await this.#change(topic, current, lines, context)) {
					await this.#build(topic, sources, context, 'change')
					return
				}
			}
			if (this.#check(topic, current.prose, sources, context).length > 0) {
				await this.#build(topic, sources, context, 'check')
				return
			}
			this.#versions.set(topic.key, { ...current, sources })
		} catch (error) {
			this.#options.log(`aggregate ${topic.key} at ${context.goal}: ${describeError(error)}`)
			this.#versions.delete(topic.key)
			this.#withheld.add(topic.key)
		}
	}

	// Builds the topic until a version passes the code check and AGREE, or the retries end and the topic is withheld.
	async #build(
		topic: AggregateTopic,
		sources: readonly AggregateSource[],
		context: AggregateContext,
		first: AggregateTrigger,
	): Promise<void> {
		const attempts = Math.max(0, this.#options.settings.retry) + 1
		let failures: readonly AggregateFailure[] = []
		let trigger = first
		for (let attempt = 0; attempt < attempts; attempt += 1) {
			context.signal.throwIfAborted()
			const version = (this.#counts.get(topic.key) ?? 0) + 1
			this.#counts.set(topic.key, version)
			const started = performance.now()
			const prompt = buildSummaryPrompt(topic.key, topic.title, context.asOf, sources, failures)
			const result = await this.#options.summarizer.summarize(prompt, context.signal)
			const draft: AggregateVersion = {
				version,
				title: topic.title,
				asOf: context.asOf,
				prose: result.prose,
				raw: result.raw,
				ids: collectIds(sources),
				sources,
			}
			failures = this.#check(topic, result.prose, sources, context)
			let answers: Readonly<Record<string, number>> = {}
			if (failures.length === 0) {
				const asked = await this.#ask(
					AGREE_HEAD,
					[AGREE_HEAD, topic.key, version],
					buildAgreeState(draft, sources),
					AGREE_QUESTION,
					context.signal,
				)
				const { fit } = this.#options
				const agreed = !fit.separated || asked.noul >= fit.agree
				answers = { [AGREE_HEAD]: asked.noul }
				failures = agreed ? [] : [{ kind: 'agree', token: '' }]
				this.#append(
					this.#row(topic, context, {
						event: 'agree',
						version,
						status: agreed ? 'current' : 'stale',
						sources: buildRefs(sources, this.#options.seeds),
						answers,
						wall: asked.wall,
						cached: asked.cached,
					}),
				)
			}
			this.#append(
				this.#row(topic, context, {
					event: 'build',
					version,
					status: failures.length === 0 ? 'current' : 'stale',
					sources: buildRefs(sources, this.#options.seeds),
					ids: draft.ids.join(', '),
					prose: draft.prose,
					raw: draft.raw,
					trigger,
					answers,
					failures,
					wall: performance.now() - started,
					cached: result.cached,
				}),
			)
			if (failures.length === 0) {
				this.#versions.set(topic.key, draft)
				return
			}
			trigger = 'retry'
		}
		this.#versions.delete(topic.key)
		this.#withheld.add(topic.key)
		this.#append(
			this.#row(topic, context, {
				event: 'withhold',
				version: this.#counts.get(topic.key) ?? 0,
				status: 'withheld',
				failures,
			}),
		)
	}

	// Asks CHANGE about one arriving message; a noul that reaches the cutoff reads as a change.
	async #change(
		topic: AggregateTopic,
		current: AggregateVersion,
		lines: readonly AggregateSource[],
		context: AggregateContext,
	): Promise<boolean> {
		const asked = await this.#ask(
			CHANGE_HEAD,
			[CHANGE_HEAD, lines[0]?.id ?? '', topic.key, current.version],
			buildChangeState(current, lines),
			buildChangeQuestion(topic.title),
			context.signal,
		)
		this.#append(
			this.#row(topic, context, {
				event: 'change',
				version: current.version,
				status: 'current',
				sources: buildRefs(lines, this.#options.seeds),
				answers: { [CHANGE_HEAD]: asked.noul },
				wall: asked.wall,
				cached: asked.cached,
			}),
		)
		return asked.noul >= this.#options.fit.change
	}

	// Asks one noul question through the judge under the key JSON of the head, ids, and version.
	async #ask(
		head: string,
		key: ReadonlyArray<string | number>,
		state: string,
		question: JudgeQuestion,
		signal: AbortSignal,
	): Promise<AggregateAsked> {
		const { judge } = this.#options
		const id = JSON.stringify(key)
		const before = judge.stats().hits[head] ?? 0
		const started = performance.now()
		const result = await judge.ask({ state, questions: { [id]: question } }, signal)
		const answer = result.answers[id]
		if (answer === undefined || answer.form !== 'noul') throw new Error(`the judge returned no noul answer for ${id}`)
		return { noul: answer.noul, cached: (judge.stats().hits[head] ?? 0) > before, wall: performance.now() - started }
	}

	// Runs the code check against the topic's sources, the stale tokens of its messages, and the lines that left it.
	#check(
		topic: AggregateTopic,
		prose: string,
		sources: readonly AggregateSource[],
		context: AggregateContext,
	): readonly AggregateFailure[] {
		const { input, projection } = context
		const members = new Set(collectTopicMembers(projection, input, topic))
		const listed = projection.stale.filter((line) => members.has(line.source)).flatMap((line) => line.tokens)
		const stale = collectStaleTokens(
			this.#gone.get(topic.key) ?? [],
			listed,
			sources.map((source) => source.text),
		)
		return checkProse(
			prose,
			[...sources.map(renderSource), topic.title, context.asOf],
			[...input.owners.values()].flat(),
			stale,
		)
	}

	// Drops the version of a topic whose sources are all gone, and keeps the lines for the stale check.
	#retire(key: string, sources: readonly AggregateSource[]): void {
		this.#forget(key, sources)
		this.#versions.delete(key)
	}

	#forget(key: string, sources: readonly AggregateSource[]): void {
		this.#gone.set(key, [...(this.#gone.get(key) ?? []), ...sources.map((source) => source.text)])
	}

	// Fills the members that a question row or a withhold row leaves empty.
	#row(
		topic: AggregateTopic,
		context: AggregateContext,
		fields: Pick<AggregateRow, 'event' | 'version' | 'status'> & Partial<AggregateRow>,
	): AggregateRow {
		return {
			topic: topic.key,
			title: topic.title,
			goal: context.goal,
			lastSeed: context.lastSeed,
			sources: [],
			ids: undefined,
			prose: undefined,
			raw: undefined,
			trigger: undefined,
			answers: {},
			failures: [],
			wall: 0,
			cached: false,
			...fields,
		}
	}

	#append(row: AggregateRow): void {
		appendFileSync(this.#options.path, `${JSON.stringify(row)}\n`)
	}
}
