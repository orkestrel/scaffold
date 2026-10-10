import type { AggregateFailure, MirrorRead } from '../types.ts'
import type {
	RefitAttempt,
	RefitContext,
	RefitCorpus,
	RefitEvidence,
	RefitFile,
	RefitGeneration,
	RefitOptions,
	RefitPoint,
	RefitReading,
} from './types.ts'
import { randomUUID } from 'node:crypto'
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { isDeepStrictEqual, parseArgs } from 'node:util'
import { arrayOf, isFiniteNumber, isRecord, isString } from '@orkestrel/contract'
import {
	Classifier,
	LEDGER_QUESTIONS,
	collectRegistry,
	createLedger,
	matchEntities,
} from '../../vendor/agent-0.0.30-trimmed/index.js'
import { createOllama, createOllamaJudge } from '../../vendor/ollama/index.js'
import { AGREE_QUESTION } from '../aggregates/constants.ts'
import {
	buildAgreeState,
	buildSummaryPrompt,
	checkProse,
	collectStaleTokens,
	collectTopicMembers,
	collectTopicSources,
	collectTopics,
	renderSource,
} from '../aggregates/helpers.ts'
import {
	COPIES_DIR,
	DAEMON,
	FIT,
	HARNESS,
	MICA_CALIBRATION,
	MICA_CONTEXT,
	MICA_MODEL,
	MICA_SYSTEM,
	MODELS,
	SAMPLER,
	TIMEOUT,
} from '../constants.ts'
import { appendSeed, readCopy, readSettings } from '../Driver.ts'
import {
	buildCacheKey,
	buildSummaryKey,
	buildSystem,
	computeDigest,
	describeError,
	findDay,
	isCacheRow,
	isSummaryRow,
	readJSON,
	readLookup,
	readRows,
} from '../helpers.ts'
import { JudgeCache } from '../JudgeCache.ts'
import { Mirror } from '../Mirror.ts'
import { readFrozen, readModelDigest } from '../matrix/helpers.ts'
import { Summarizer } from '../Summarizer.ts'
import {
	REFIT_CONTROLS,
	REFIT_CONTROL_HASHES,
	REFIT_IMPLEMENTATION,
	REFIT_LIMITATION,
} from './constants.ts'
import {
	buildRefitItem,
	collectReadings,
	fitReadings,
	hashFile,
	verifyCorpus,
	verifyEvidence,
	verifyFiles,
	verifyLabels,
} from './helpers.ts'
import {
	isRefitAttempt,
	isRefitCorpus,
	isRefitEvidence,
	isRefitGeneration,
	isRefitItem,
	isRefitLabels,
	isRefitUsage,
	isRefitVerdict,
} from './validators.ts'

/** Runs development freezing, score-independent generation, and independently adjudicated fitting. */
export class Refit {
	readonly #options: RefitOptions
	readonly #abort = new AbortController()
	#signal = this.#abort.signal

	/** Creates a command runner from the closed CLI options.
	 * @param options - Explicit phase, paths, model, and live permission
	 */
	constructor(options: RefitOptions) {
		this.#options = options
	}

	/** Parses the command line and executes one explicit phase.
	 * @param args - Arguments after the executable
	 * @returns Exit 0 for completed preparation or an accepted fit; exit 3 for refusal
	 */
	static async run(args: readonly string[]): Promise<number> {
		const { values, positionals } = parseArgs({
			args: [...args],
			allowPositionals: true,
			options: {
				copy: { type: 'string', default: '1' },
				frozen: { type: 'string' },
				settings: { type: 'string' },
				out: { type: 'string' },
				cache: { type: 'string' },
				corpus: { type: 'string' },
				attempts: { type: 'string' },
				labels: { type: 'string' },
				controls: { type: 'string', default: REFIT_CONTROLS },
				model: { type: 'string', default: MODELS.q2 },
				url: { type: 'string', default: DAEMON },
				live: { type: 'boolean', default: false },
			},
		})
		const phase = positionals[0]
		if (
			positionals.length !== 1 ||
			(phase !== 'freeze' && phase !== 'generate' && phase !== 'fit') ||
			values.out === undefined ||
			values.copy !== '1'
		)
			throw new Error(
				'usage: refit.ts freeze|generate|fit --out NEW_DIRECTORY [--copy 1] [--cache DIRECTORY] [--corpus DIRECTORY] [--attempts DIRECTORY --labels FILE] [--model TAG] [--live]',
			)
		if (values.live && phase !== 'generate')
			throw new Error('--live is permitted only for generate')
		if ((phase === 'freeze' || phase === 'generate') && values.cache === undefined)
			throw new Error('--cache is required')
		if (phase !== 'freeze' && values.corpus === undefined) throw new Error('--corpus is required')
		if (phase === 'fit' && (values.attempts === undefined || values.labels === undefined))
			throw new Error('--attempts and --labels are required')
		return await new Refit({
			phase,
			frozen: values.frozen,
			out: values.out,
			cache: values.cache ?? '',
			corpus: values.corpus ?? '',
			attempts: values.attempts ?? '',
			labels: values.labels ?? '',
			controls: values.controls,
			scenario: join(COPIES_DIR, 'v1.json'),
			settings:
				values.frozen === undefined
					? (values.settings ?? join(HARNESS, 'bench5', 'settings.json'))
					: readFrozen(hashFile(values.frozen)).settings.path,
			model: values.model,
			url: values.url,
			live: values.live,
		}).execute()
	}

	/** Executes the phase into a create-only output directory.
	 * @param signal - Optional caller cancellation, combined with fatal judge cancellation
	 * @returns Exit 0 on complete preparation or accepted fit; exit 3 on refusal
	 */
	async execute(signal?: AbortSignal): Promise<number> {
		this.#signal =
			signal === undefined ? this.#abort.signal : AbortSignal.any([signal, this.#abort.signal])
		mkdirSync(dirname(this.#options.out), { recursive: true })
		mkdirSync(this.#options.out)
		try {
			if (this.#options.frozen !== undefined && this.#options.phase === 'generate') {
				const frozen = readFrozen(hashFile(this.#options.frozen))
				if (this.#options.live) {
					const response = await this.#fetch(new URL('/api/tags', this.#options.url))
					const tags: unknown = await response.json()
					for (const role of [frozen.summarizer, frozen.judge])
						if (readModelDigest(tags, role.model) !== role.digest)
							throw new Error('actual calibration model digest changed')
				}
			}
			if (this.#options.phase === 'freeze') return await this.#freeze()
			if (this.#options.phase === 'generate') return await this.#generate()
			return this.#fit()
		} catch (error) {
			writeFileSync(
				join(this.#options.out, 'diagnosis.json'),
				`${JSON.stringify({ accepted: false, reasons: [describeError(error)], limitation: REFIT_LIMITATION }, null, 2)}\n`,
				{ flag: 'wx' },
			)
			return 3
		}
	}

	#files(): readonly RefitFile[] {
		if (this.#options.frozen !== undefined) {
			const frozen = readFrozen(hashFile(this.#options.frozen))
			if (this.#options.model !== frozen.summarizer.model)
				throw new Error('summarizer model differs from frozen configuration')
			return [...frozen.files, frozen.settings]
		}
		return [
			...REFIT_IMPLEMENTATION.map((path) => join(HARNESS, path)),
			this.#options.scenario,
			this.#options.settings,
		].map(hashFile)
	}

	#fetch(input: Parameters<typeof fetch>[0], init?: RequestInit): Promise<Response> {
		if (this.#options.phase !== 'generate' || !this.#options.live)
			return Promise.reject(new Error('offline refit refuses network access'))
		return fetch(input, init)
	}

	#judge(path: string, live: boolean, retry: number): JudgeCache {
		return new JudgeCache({
			judge: createOllamaJudge({
				url: this.#options.url,
				model: MICA_MODEL,
				system: MICA_SYSTEM,
				calibration: { temperature: MICA_CALIBRATION },
				options: { num_ctx: MICA_CONTEXT },
				timeout: TIMEOUT,
				fetch: (input: Parameters<typeof fetch>[0], init?: RequestInit) => this.#fetch(input, init),
			}),
			path,
			live,
			retry,
			abort: (error) => this.#abort.abort(error),
		})
	}

	async #freeze(): Promise<number> {
		const files = [...this.#files(), hashFile(join(this.#options.cache, 'judge.jsonl'))]
		const copy = readCopy(this.#options.scenario)
		const judge = this.#judge(join(this.#options.cache, 'judge.jsonl'), false, 0)
		const provider = createOllama({
			model: this.#options.model,
			fetch: (input: Parameters<typeof fetch>[0], init?: RequestInit) => this.#fetch(input, init),
		})
		const system = buildSystem({ ledger: { system: copy.system } })
		const ledger = createLedger(provider, {
			judge,
			system,
			topics: copy.topics,
			questions: LEDGER_QUESTIONS,
			thresholds: FIT,
			capacity: SAMPLER.num_ctx,
			predict: 0,
		})
		const mirror = new Mirror(ledger, {
			judge,
			questions: LEDGER_QUESTIONS,
			topics: copy.topics,
			thresholds: FIT,
			system,
			reads: new Map<string, MirrorRead>([
				['lookup_order', readLookup],
				['lookup_customer', readLookup],
			]),
		})
		const classifier = new Classifier({
			conversation: ledger.conversation,
			judge,
			questions: LEDGER_QUESTIONS,
			topics: copy.topics,
			thresholds: FIT,
			assign: (message) => mirror.assign(message),
			entities: (text, partial) => matchEntities(collectRegistry(mirror.readings()), text, partial),
		})
		const requests = new Set<string>()
		const seeds = new Map<string, number>()
		const dates = new Map<string, string>()
		const contexts: RefitContext[] = []
		const points: RefitPoint[] = []
		let position = -1
		for (const goal of copy.goals) {
			this.#signal.throwIfAborted()
			if (goal.after > position) {
				appendSeed(ledger.conversation, copy.seed, position + 1, goal.after, seeds)
				position = goal.after
			}
			const request = ledger.conversation.add({ role: 'user', content: goal.request })
			mirror.note(request)
			requests.add(request.id)
			await classifier.classify(requests, this.#signal)
			this.#signal.throwIfAborted()
			if (Object.values(judge.stats().misses).some((count) => count > 0))
				throw new Error('freeze classification cache miss')
			const input = mirror.input()
			const projection = mirror.projection(input)
			for (const message of input.messages)
				if (!dates.has(message.id))
					dates.set(message.id, findDay(copy.days, seeds.get(message.id) ?? goal.after)?.date ?? '')
			points.push({
				goal: goal.id,
				request,
				input: {
					...input,
					owners: [...input.owners],
					entities: [...input.entities],
					classification: Object.fromEntries(
						Object.entries(input.classification).map(([key, value]) => [
							key,
							value instanceof Map ? [...value] : value,
						]),
					),
				},
				projection,
			})
			for (const topic of collectTopics(projection, input, mirror.owners(request))) {
				const sources = collectTopicSources(projection, input, topic, dates).map((source) => {
					const seed = seeds.get(source.id)
					if (seed === undefined) throw new Error('source lost seed identity')
					return { ...source, seed }
				})
				if (sources.length === 0) continue
				const members = collectTopicMembers(projection, input, topic)
				const listed = projection.stale
					.filter((line) => members.includes(line.source))
					.flatMap((line) => line.tokens)
				const date = findDay(copy.days, goal.after)?.date ?? ''
				contexts.push({
					id: randomUUID(),
					goal: goal.id,
					after: goal.after,
					topic,
					date,
					sources,
					owners: [...input.owners.values()].flat(),
					members,
					listed,
					stale: collectStaleTokens(
						[],
						listed,
						sources.map((source) => source.text),
					),
					prompt: buildSummaryPrompt(topic.key, topic.title, date, sources),
				})
			}
		}
		const corpus: RefitCorpus = {
			mode: 'cold-build seed-only development',
			files,
			points,
			contexts,
		}
		verifyCorpus(corpus)
		verifyFiles(files)
		writeFileSync(join(this.#options.out, 'corpus.json'), `${JSON.stringify(corpus, null, 2)}\n`, {
			flag: 'wx',
		})
		writeFileSync(
			join(this.#options.out, 'manifest.json'),
			`${JSON.stringify({ corpus: hashFile(join(this.#options.out, 'corpus.json')).hash, requests: points.length, occurrences: contexts.length, initial: new Set(contexts.map((context) => computeDigest(context.prompt))).size, stats: judge.stats(), limitation: REFIT_LIMITATION }, null, 2)}\n`,
			{ flag: 'wx' },
		)
		return 0
	}

	#corpus(): RefitCorpus {
		const path = join(this.#options.corpus, 'corpus.json')
		const corpus = readJSON(path)
		const manifest = readJSON(join(this.#options.corpus, 'manifest.json'))
		if (!isRefitCorpus(corpus) || !isRecord(manifest) || manifest.corpus !== hashFile(path).hash)
			throw new Error('invalid corpus custody')
		verifyCorpus(corpus)
		verifyFiles(corpus.files)
		if (this.#options.frozen !== undefined) {
			const frozen = readFrozen(hashFile(this.#options.frozen))
			if (
				!isDeepStrictEqual(corpus.files.slice(0, -1), this.#files()) ||
				corpus.files.at(-1)?.hash !== frozen.seed.hash
			)
				throw new Error('frozen corpus source/settings/seed population mismatch')
		}
		return corpus
	}

	#lineage(): readonly RefitFile[] {
		return ['judge.jsonl', 'summary.jsonl']
			.map((name) => join(this.#options.cache, name))
			.filter(existsSync)
			.map(hashFile)
	}

	async #generate(): Promise<number> {
		const corpus = this.#corpus()
		const files = this.#files()
		const model = this.#options.model
		const key = Object.entries(MODELS).find(([, tag]) => tag === model)?.[0]
		if (key === undefined) throw new Error('unknown model')
		const settings = readSettings(this.#options.settings, key)
		if (this.#options.frozen !== undefined) {
			const frozen = readFrozen(hashFile(this.#options.frozen))
			const custody = {
				summarizer: frozen.summarizer,
				judge: frozen.judge,
				source: frozen.files,
				seed: frozen.seed,
			}
			const lineage = join(this.#options.cache, 'lineage.json')
			const judgePath = join(this.#options.cache, 'judge.jsonl')
			if (existsSync(lineage)) {
				if (!isDeepStrictEqual(readJSON(lineage), custody))
					throw new Error('calibration cache configuration mismatch')
			} else {
				if (
					existsSync(join(this.#options.cache, 'summary.jsonl')) ||
					(existsSync(judgePath) && hashFile(judgePath).hash !== frozen.seed.hash)
				)
					throw new Error('calibration cache lacks fixed seed custody')
				mkdirSync(this.#options.cache, { recursive: true })
				writeFileSync(lineage, JSON.stringify(custody), { flag: 'wx' })
			}
			if (!existsSync(judgePath))
				writeFileSync(judgePath, readFileSync(frozen.seed.path), { flag: 'wx' })
		}
		const before = this.#lineage()
		// A failed judge call refuses preparation immediately; hidden retries cannot have unrecorded costs.
		const judge = this.#judge(join(this.#options.cache, 'judge.jsonl'), this.#options.live, 0)
		const summarizer = new Summarizer({
			provider: createOllama({
				url: this.#options.url,
				model,
				think: false,
				keepAlive: '30m',
				timeout: TIMEOUT,
				options: { ...SAMPLER, num_predict: settings.predict },
				fetch: (input: Parameters<typeof fetch>[0], init?: RequestInit) => this.#fetch(input, init),
			}),
			model,
			sampler: SAMPLER,
			predict: settings.predict,
			cache: join(this.#options.cache, 'summary.jsonl'),
			live: this.#options.live,
		})
		const attempts: RefitAttempt[] = []
		const summaries = new Map<string, RefitEvidence['summary'][number]>()
		const judgments = new Map<string, RefitEvidence['judge'][number]>()
		const errors: string[] = []
		writeFileSync(join(this.#options.out, 'attempts.jsonl'), '', { flag: 'wx' })
		for (const context of corpus.contexts) {
			let failures: readonly AggregateFailure[] = []
			for (let ordinal = 0; ordinal <= settings.retry; ordinal += 1) {
				const prompt = buildSummaryPrompt(
					context.topic.key,
					context.topic.title,
					context.date,
					context.sources,
					failures,
				)
				const started = performance.now()
				let judging: number | undefined
				const hits = judge.stats().hits.agree ?? 0
				let attempt: RefitAttempt = {
					id: randomUUID(),
					context: context.id,
					ordinal,
					prompt,
					key: buildSummaryKey({ model, sampler: SAMPLER, predict: settings.predict }, prompt),
					wall: 0,
				}
				try {
					this.#signal.throwIfAborted()
					const result = await summarizer.summarize(prompt, this.#signal)
					failures = checkProse(
						result.prose,
						[...context.sources.map(renderSource), context.topic.title, context.date],
						context.owners,
						context.stale,
					)
					attempt = {
						...attempt,
						...result,
						duration: isFiniteNumber(result.wall) ? result.wall : undefined,
						failures,
						state: buildAgreeState({ prose: result.prose }, context.sources),
					}
					const path = join(this.#options.cache, 'summary.jsonl')
					const row = readRows(path)
						.filter(isSummaryRow)
						.findLast((one) => one.key === attempt.key)
					if (row === undefined) throw new Error('missing observed summary row')
					summaries.set(row.key, { path, row })
					if (!isFiniteNumber(result.wall) || result.wall < 0)
						throw new Error('summary duration missing or invalid')
					if (!isRefitUsage(result.usage)) throw new Error('summary usage missing or invalid')
					if (failures.length === 0) {
						const state = buildAgreeState({ prose: result.prose }, context.sources)
						const id = JSON.stringify(['agree', context.topic.key, ordinal + 1])
						const asked = performance.now()
						judging = asked
						attempt = {
							...attempt,
							judge: {
								key: buildCacheKey(judge.model, state, AGREE_QUESTION),
								cached: false,
								wall: 0,
							},
						}
						const response = await judge.ask(
							{ state, questions: { [id]: AGREE_QUESTION } },
							this.#signal,
						)
						const answer = response.answers[id]
						const score = answer?.form === 'noul' ? answer.noul : undefined
						attempt = {
							...attempt,
							judge: {
								key: buildCacheKey(judge.model, state, AGREE_QUESTION),
								cached: (judge.stats().hits.agree ?? 0) > hits,
								wall: performance.now() - asked,
								usage: response.usage,
								score,
							},
						}
						if (score === undefined || !Number.isFinite(score) || score < 0 || score > 1)
							throw new Error('required AGREE score missing or invalid')
						if (!isRefitUsage(response.usage)) throw new Error('judge usage missing or invalid')
					}
				} catch (error) {
					attempt = {
						...attempt,
						error: describeError(error),
						...(judging === undefined || attempt.judge === undefined
							? {}
							: {
									judge: {
										...attempt.judge,
										cached: (judge.stats().hits.agree ?? 0) > hits,
										wall: performance.now() - judging,
									},
								}),
					}
					errors.push(`${attempt.id}: ${attempt.error}`)
				}
				attempt = { ...attempt, wall: performance.now() - started }
				if (attempt.judge !== undefined) {
					const path = join(this.#options.cache, 'judge.jsonl')
					const row = existsSync(path)
						? readRows(path)
								.filter(isCacheRow)
								.findLast((one) => one.key === attempt.judge?.key)
						: undefined
					if (row !== undefined) judgments.set(row.key, { path, row })
				}
				attempts.push(attempt)
				appendFileSync(join(this.#options.out, 'attempts.jsonl'), `${JSON.stringify(attempt)}\n`)
				if (attempt.error !== undefined || failures.length === 0) break
			}
			if (this.#signal.aborted) break
		}
		const packet = attempts
			.map((attempt) => {
				const context = corpus.contexts.find((one) => one.id === attempt.context)
				if (context === undefined) throw new Error('attempt context disappeared')
				return buildRefitItem(attempt, context)
			})
			.sort((left, right) => left.id.localeCompare(right.id))
		writeFileSync(
			join(this.#options.out, 'packet.jsonl'),
			packet.map((item) => JSON.stringify(item)).join('\n') + '\n',
			{ flag: 'wx' },
		)
		if (new Set(attempts.map((attempt) => attempt.context)).size !== corpus.contexts.length)
			errors.push('incomplete occurrence coverage')
		verifyFiles(files)
		const evidence: RefitEvidence = {
			summary: [...summaries.values()],
			judge: [...judgments.values()],
		}
		const retained = join(this.#options.out, 'evidence.json')
		writeFileSync(retained, `${JSON.stringify(evidence, null, 2)}\n`, { flag: 'wx' })
		const manifest: RefitGeneration = {
			...(this.#options.frozen === undefined
				? {}
				: { matrix: readFrozen(hashFile(this.#options.frozen)) }),
			corpus: hashFile(join(this.#options.corpus, 'corpus.json')).hash,
			attempts: hashFile(join(this.#options.out, 'attempts.jsonl')).hash,
			packet: hashFile(join(this.#options.out, 'packet.jsonl')).hash,
			evidence: hashFile(retained),
			files,
			model,
			settings,
			complete: errors.length === 0,
			errors,
			lineage: { before, after: this.#lineage() },
		}
		if (manifest.complete) verifyEvidence(attempts, evidence, manifest, judge.model)
		writeFileSync(
			join(this.#options.out, 'manifest.json'),
			`${JSON.stringify(manifest, null, 2)}\n`,
			{ flag: 'wx' },
		)
		return manifest.complete ? 0 : 3
	}

	#controls(): readonly RefitReading[] {
		const controls = this.#options.controls
		for (const [name, hash] of Object.entries(REFIT_CONTROL_HASHES))
			if (hashFile(join(controls, name)).hash !== hash)
				throw new Error(`archived control custody mismatch: ${name}`)
		const adjudication = readJSON(join(controls, 'adjudication.json'))
		const packet = readRows(join(controls, 'packet.jsonl'))
		const mapping = readRows(join(controls, 'mapping.jsonl'))
		if (
			!isRecord(adjudication) ||
			!Array.isArray(adjudication.rows) ||
			adjudication.rows.length !== 12 ||
			packet.length !== 12 ||
			mapping.length !== 12
		)
			throw new Error('incomplete archived controls')
		writeFileSync(
			join(this.#options.out, 'controls.json'),
			`${JSON.stringify({ adjudication, packet, mapping, hashes: REFIT_CONTROL_HASHES }, null, 2)}\n`,
			{ flag: 'wx' },
		)
		return adjudication.rows.map((row: unknown) => {
			if (!isRecord(row) || !isString(row.id)) throw new Error('invalid archived verdict')
			const verdict = row.verdict === 'genuinely ambiguous' ? 'ambiguous' : row.verdict
			if (!isRefitVerdict(verdict)) throw new Error('invalid archived verdict')
			const item = packet.find((candidate) => isRecord(candidate) && candidate.id === row.id)
			const mapped = mapping.find((candidate) => isRecord(candidate) && candidate.id === row.id)
			if (
				!isRecord(item) ||
				!isRecord(mapped) ||
				!isString(item.state) ||
				!Array.isArray(mapped.sources)
			)
				throw new Error('missing archived source mapping')
			const score = typeof row.score === 'number' ? row.score : undefined
			if (
				!isRecord(mapped.input) ||
				!Array.isArray(mapped.input.files) ||
				!isRecord(mapped.original) ||
				!Number.isInteger(mapped.original.index) ||
				typeof mapped.original.index !== 'number'
			)
				throw new Error('missing archived build custody')
			const file: unknown = mapped.input.files.find(
				(candidate: unknown) =>
					isRecord(candidate) &&
					isString(candidate.path) &&
					candidate.path.endsWith('/aggregates.jsonl'),
			)
			if (!isRecord(file) || !isString(file.path) || !isString(file.sha256))
				throw new Error('missing archived build path')
			const path = resolve(HARNESS, '../../../..', file.path)
			if (hashFile(path).hash !== file.sha256)
				throw new Error('archived build file custody mismatch')
			const build = readRows(path)[mapped.original.index]
			if (
				!isRecord(build) ||
				!Array.isArray(build.failures) ||
				computeDigest(build) !== mapped.input.row
			)
				throw new Error('archived build row custody mismatch')
			const lexical = build.failures.every(
				(failure: unknown) => isRecord(failure) && failure.kind === 'agree',
			)
			if (isRecord(mapped.original.score) && mapped.original.score.agree !== score)
				throw new Error('archived score mismatch')
			return {
				id: row.id,
				identity: computeDigest([item.question, item.state, mapped.sources]),
				generated: false,
				verdict,
				lexical,
				score,
			}
		})
	}

	#fit(): number {
		const corpus = this.#corpus()
		const directory = this.#options.attempts
		const manifest = readJSON(join(directory, 'manifest.json'))
		const attempts = readRows(join(directory, 'attempts.jsonl'))
		const packet = readRows(join(directory, 'packet.jsonl'))
		const labels = readJSON(this.#options.labels)
		if (
			!isRefitGeneration(manifest) ||
			!arrayOf(isRefitAttempt)(attempts) ||
			!arrayOf(isRefitItem)(packet) ||
			!isRefitLabels(labels)
		)
			throw new Error('invalid generation or root label contract')
		const corpusHash = hashFile(join(this.#options.corpus, 'corpus.json')).hash
		const attemptsHash = hashFile(join(directory, 'attempts.jsonl')).hash
		const packetHash = hashFile(join(directory, 'packet.jsonl')).hash
		const manifestHash = hashFile(join(directory, 'manifest.json')).hash
		if (
			labels.manifest !== manifestHash ||
			manifest.corpus !== corpusHash ||
			labels.corpus !== corpusHash ||
			manifest.attempts !== attemptsHash ||
			labels.attempts !== attemptsHash ||
			manifest.packet !== packetHash ||
			labels.packet !== packetHash
		)
			throw new Error('corpus/attempt/packet/manifest custody mismatch')
		if (!isDeepStrictEqual(manifest.files, this.#files()))
			throw new Error('implementation custody membership mismatch')
		if (
			this.#options.frozen !== undefined &&
			!isDeepStrictEqual(manifest.matrix, readFrozen(hashFile(this.#options.frozen)))
		)
			throw new Error('generation role configuration differs from freeze')
		verifyFiles(manifest.files)
		if (resolve(manifest.evidence.path) !== resolve(directory, 'evidence.json'))
			throw new Error('retained evidence path mismatch')
		verifyFiles([manifest.evidence])
		const evidence = readJSON(manifest.evidence.path)
		if (!isRefitEvidence(evidence)) throw new Error('invalid retained cache evidence')
		verifyEvidence(
			attempts,
			evidence,
			manifest,
			createOllamaJudge({
				model: MICA_MODEL,
				system: MICA_SYSTEM,
				calibration: { temperature: MICA_CALIBRATION },
				options: { num_ctx: MICA_CONTEXT },
			}).model,
		)
		verifyLabels(packet, labels)
		if (
			attempts.length !== packet.length ||
			new Set(attempts.map((attempt) => attempt.id)).size !== attempts.length
		)
			throw new Error('attempt-to-packet bijection mismatch')
		const errors = [...manifest.errors]
		if (!manifest.complete) errors.push('incomplete generation')
		for (const context of corpus.contexts) {
			const rows = attempts.filter((attempt) => attempt.context === context.id)
			if (rows.length === 0 || rows.length > manifest.settings.retry + 1)
				throw new Error('attempt coverage mismatch')
			let failures: readonly AggregateFailure[] = []
			for (const [ordinal, attempt] of rows.entries()) {
				if (ordinal > 0 && failures.length === 0)
					throw new Error('generation continued after lexical success')
				if (
					attempt.ordinal !== ordinal ||
					!isDeepStrictEqual(
						attempt.prompt,
						buildSummaryPrompt(
							context.topic.key,
							context.topic.title,
							context.date,
							context.sources,
							failures,
						),
					)
				)
					throw new Error('attempt prompt sequence mismatch')
				if (
					attempt.key !==
					buildSummaryKey(
						{ model: manifest.model, sampler: SAMPLER, predict: manifest.settings.predict },
						attempt.prompt,
					)
				)
					throw new Error('summary cache identity mismatch')
				const item = packet.find((one) => one.id === attempt.id)
				if (!isDeepStrictEqual(item, buildRefitItem(attempt, context)))
					throw new Error('attempt/source/packet mismatch')
				if (
					attempt.state !== undefined &&
					attempt.state !== buildAgreeState({ prose: attempt.prose ?? '' }, context.sources)
				)
					throw new Error('attempt state mismatch')
				if (attempt.error !== undefined || !isRefitUsage(attempt.usage))
					errors.push('failed call or missing summary costs')
				if (!isFiniteNumber(attempt.duration) || attempt.duration < 0)
					errors.push('summary duration missing or invalid')
				failures = attempt.failures ?? []
				if (
					failures.length === 0 &&
					(!isRefitUsage(attempt.judge?.usage) || attempt.judge?.score === undefined)
				)
					errors.push('missing judge costs or required score')
			}
			if (failures.length > 0 && rows.length !== manifest.settings.retry + 1)
				errors.push('incomplete lexical retry sequence')
		}
		if (
			attempts.some((attempt) => !corpus.contexts.some((context) => context.id === attempt.context))
		)
			throw new Error('foreign attempt context')
		const readings = [...collectReadings(attempts, corpus.contexts, labels), ...this.#controls()]
		const diagnosis = fitReadings(readings, errors)
		writeFileSync(
			join(this.#options.out, 'diagnosis.json'),
			`${JSON.stringify({ ...diagnosis, custody: { corpus: corpusHash, attempts: attemptsHash, packet: packetHash, manifest: manifestHash, labels: hashFile(this.#options.labels), controls: REFIT_CONTROL_HASHES } }, null, 2)}\n`,
			{ flag: 'wx' },
		)
		if (!diagnosis.accepted) return 3
		writeFileSync(
			join(this.#options.out, 'fit.json'),
			`${JSON.stringify({ agree: diagnosis.cutoff, change: 0.56, separated: true, ...(manifest.matrix === undefined ? {} : { matrix: { summarizer: manifest.matrix.summarizer, judge: manifest.matrix.judge, files: manifest.matrix.files, settings: manifest.matrix.settings.hash, seed: manifest.matrix.seed.hash }, preparation: { manifest: hashFile(join(directory, 'manifest.json')), attempts: hashFile(join(directory, 'attempts.jsonl')), corpus: hashFile(join(this.#options.corpus, 'corpus.json')), labels: hashFile(this.#options.labels) } }), custody: { corpus: corpusHash, attempts: attemptsHash, packet: packetHash, manifest: manifestHash, labels: hashFile(this.#options.labels).hash }, limitation: REFIT_LIMITATION }, null, 2)}\n`,
			{ flag: 'wx' },
		)
		return 0
	}
}
