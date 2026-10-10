import type {
	JudgeInterface,
	LedgerGauge,
	LedgerInterface,
	LedgerResult,
	LedgerShare,
	Message,
	ProviderInterface,
	Selection,
} from '../vendor/agent-0.0.30/index.js'
import type { ToolCall, ToolResult } from '@orkestrel/tool'
import type {
	AggregateRendering,
	BriefingReading,
	CacheRow,
	CallRecord,
	CallRole,
	Check,
	Config,
	ConfigOutcome,
	Copy,
	CopyGoal,
	Coverage,
	Fit,
	JudgeStats,
	MirrorRead,
	Preparation,
	QuestionCount,
	RecallCount,
	Rig,
	Row,
	RunArm,
	Score,
	ScenarioDay,
	ScenarioLookups,
	SeedMessage,
	SelectionRecord,
	Settings,
	TailMessage,
} from './types.ts'
import { appendFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { isAbsolute, join, resolve } from 'node:path'
import { isDeepStrictEqual, parseArgs } from 'node:util'
import { createTool } from '@orkestrel/tool'
// The vendored build is the one import of the agent in bench5; repoint this path when a later build is vendored.
import {
	Classifier,
	DEFAULT_LEDGER_LIMIT,
	DEFAULT_LEDGER_SHARE,
	DEFAULT_RECALL_LIMIT,
	LEDGER_NOTES,
	LEDGER_QUESTIONS,
	collectRegistry,
	createLedger,
	createScope,
	estimateMessages,
	extractTokens,
	matchEntities,
} from '../vendor/agent-0.0.30/index.js'
import { createOllama, createOllamaJudge } from '../vendor/ollama/index.js'
import { clean, compileRules, scoreText } from '../bench/rescore.mjs'
import { INSTRUCTION_DATE, INSTRUCTION_SUMMARIES } from './aggregates/constants.ts'
import { Aggregator } from './aggregates/Aggregator.ts'
import {
	CORPUS,
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
	SCENARIO_LONG,
	TIMEOUT,
	VENDOR_AGENT,
} from './constants.ts'
import {
	buildSystem,
	computeDigest,
	describeError,
	extractHead,
	findDay,
	importCorpus,
	isMessageRole,
	readJSON,
	readLookup,
	readRows,
	renderDate,
	resolveLookup,
} from './helpers.ts'
import { JudgeCache } from './JudgeCache.ts'
import { Mirror } from './Mirror.ts'
import { Summarizer } from './Summarizer.ts'

const OPTIONS = {
	run: { type: 'boolean' },
	dry: { type: 'boolean' },
	seed: { type: 'boolean' },
	live: { type: 'boolean' },
	copy: { type: 'string' },
	model: { type: 'string' },
	arm: { type: 'string' },
	out: { type: 'string' },
	cache: { type: 'string' },
	url: { type: 'string' },
	goals: { type: 'string' },
	fit: { type: 'string' },
	settings: { type: 'string' },
	allowance: { type: 'string' },
	retry: { type: 'string' },
	predict: { type: 'string' },
} as const

const USAGE =
	'usage: node bench5/bench.ts (--run | --dry | --seed) --copy 1-8 [--live] [--model TAG] [--arm control|aggregate] [--out DIR] [--cache DIR] [--url URL] [--goals PREFIX,...] [--fit FILE] [--settings FILE] [--allowance N] [--retry N] [--predict N]'
const DAEMON_PORT = new URL(DAEMON).port
// The text of the prefix flush is fixed so that every flush sends the same bytes in both arms.
export const FLUSH_SYSTEM = 'Reply with one token.'
const FLUSH_ROLES: ReadonlySet<CallRole> = new Set(['agent', 'summarizer', 'flush'])
const NO_BODY: readonly number[] = [204, 205, 304]
const CONTEXT_ERROR = /context|too long|exceed/i
const GOAL_ROOT = ['seed', 'tools', 'lookups', 'days', 'ledger', 'system']
const LOOKUP_TOOLS = Object.freeze([
	Object.freeze({
		name: 'lookup_order',
		key: 'id',
		summary: 'The order id',
		description: 'Look up a Larkspur Home order by its order id, such as LH-12345.',
	}),
	Object.freeze({
		name: 'lookup_customer',
		key: 'account',
		summary: 'The account number',
		description: 'Look up a Larkspur Home customer account by its account number, such as LH-12345.',
	}),
])
const FILES = Object.freeze({
	rows: 'rows.jsonl',
	selections: 'selections.jsonl',
	messages: 'messages.jsonl',
	judgments: 'judgments.jsonl',
	calls: 'calls.jsonl',
	aggregates: 'aggregates.jsonl',
	run: 'run.json',
	judge: 'judge.jsonl',
	summary: 'summary.jsonl',
})

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isArm(value: string): value is RunArm {
	return value === 'control' || value === 'aggregate'
}

function readField(value: unknown, key: string): unknown {
	return isRecord(value) ? value[key] : undefined
}

function readText(value: unknown, key: string): string {
	const field = readField(value, key)
	if (typeof field !== 'string') throw new Error(`the scenario field ${key} is not text`)
	return field
}

function readNumber(value: unknown, key: string): number {
	const field = readField(value, key)
	if (typeof field !== 'number' || !Number.isFinite(field)) throw new Error(`the scenario field ${key} is not a number`)
	return field
}

function readList(value: unknown, key: string): readonly unknown[] {
	const field = readField(value, key)
	if (field === undefined) return []
	if (!Array.isArray(field)) throw new Error(`the scenario field ${key} is not a list`)
	return field
}

function readTexts(value: unknown, key: string): readonly string[] {
	return readList(value, key).map((entry) => {
		if (typeof entry !== 'string') throw new Error(`the scenario list ${key} holds a value that is not text`)
		return entry
	})
}

function readNumbers(value: unknown, key: string): readonly number[] {
	return readList(value, key).map((entry) => {
		if (typeof entry !== 'number') throw new Error(`the scenario list ${key} holds a value that is not a number`)
		return entry
	})
}

function readSeedMessage(value: unknown): SeedMessage {
	const role = readField(value, 'role')
	if (!isMessageRole(role)) throw new Error(`a seed message has the role ${String(role)}`)
	const calls = readList(value, 'calls').map((call) => {
		const args = readField(call, 'arguments')
		return { id: readText(call, 'id'), name: readText(call, 'name'), arguments: isRecord(args) ? { ...args } : {} }
	})
	const call = readField(value, 'call')
	return {
		role,
		content: readText(value, 'content'),
		...(calls.length === 0 ? {} : { calls }),
		...(typeof call === 'string' ? { call } : {}),
	}
}

function readGoal(value: unknown): CopyGoal {
	return {
		id: readText(value, 'id'),
		request: readText(value, 'request'),
		after: readNumber(value, 'after'),
		facts: readNumbers(value, 'facts'),
		stale: readNumbers(value, 'stale'),
		expected: readTexts(value, 'expected'),
		expectedAny: readTexts(value, 'expectedAny'),
		forbidden: readTexts(value, 'forbidden'),
		forbiddenPatterns: readTexts(value, 'forbiddenPatterns'),
	}
}

function readTables(value: unknown): ScenarioLookups {
	const tools: Record<string, Record<string, string>> = {}
	const raw = readField(value, 'tools')
	if (!isRecord(raw)) throw new Error('the scenario field tools is not a table')
	for (const [name, table] of Object.entries(raw)) {
		if (!isRecord(table)) throw new Error(`the scenario table ${name} is not a table`)
		tools[name] = Object.fromEntries(Object.entries(table).map(([id, text]) => [id, String(text)]))
	}
	const lookups = readList(value, 'lookups').map((entry) => ({
		tool: readText(entry, 'tool'),
		id: readText(entry, 'id'),
		from: readNumber(entry, 'from'),
		text: readText(entry, 'text'),
	}))
	return { tools, lookups }
}

function isSettings(value: unknown): value is Settings {
	const allowance = readField(value, 'allowance')
	const retry = readField(value, 'retry')
	const predict = readField(value, 'predict')
	return (
		typeof allowance === 'number' &&
		allowance > 0 &&
		typeof retry === 'number' &&
		Number.isInteger(retry) &&
		retry >= 0 &&
		typeof predict === 'number' &&
		Number.isInteger(predict) &&
		predict > 0
	)
}

function isFit(value: unknown): value is Fit {
	const change = readField(value, 'change')
	const agree = readField(value, 'agree')
	return (
		typeof change === 'number' &&
		change > 0.5 &&
		change <= 1 &&
		typeof agree === 'number' &&
		agree > 0.5 &&
		agree <= 1 &&
		typeof readField(value, 'separated') === 'boolean'
	)
}

function readCount(text: string | undefined, label: string, minimum: number, problems: string[]): number | undefined {
	if (text === undefined) return undefined
	const value = Number(text)
	if (!Number.isInteger(value) || value < minimum) problems.push(`--${label} must be an integer of at least ${minimum}`)
	return value
}

function resolveRoot(path: string): string {
	return isAbsolute(path) ? path : resolve(HARNESS, path)
}

function readArgs(argv: readonly string[]) {
	return parseArgs({ args: [...argv], options: OPTIONS, strict: true }).values
}

/**
 * Parses the flags of one driver invocation.
 *
 * @param argv - The arguments after the script path
 * @returns The configuration with `--cache`, `--fit`, and `--settings` resolved against the harness directory and `--out` against the working directory, or the reasons the flags are refused
 * @remarks
 * Exactly one of `--run`, `--dry`, and `--seed` is required. `--seed` needs `--live`, `--dry` takes neither `--live` nor `--out`, and `--run` and `--seed` need `--out`. A run without `--live` is refused when `--url` names the daemon's port.
 *
 * @example
 * ```ts
 * const outcome = parseFlags(['--dry', '--copy', '3'])
 * ```
 */
export function parseFlags(argv: readonly string[]): ConfigOutcome {
	let values: ReturnType<typeof readArgs>
	try {
		values = readArgs(argv)
	} catch (error) {
		return { success: false, error: `${describeError(error)}\n${USAGE}` }
	}
	const problems: string[] = []
	const modes = [values.run === true, values.dry === true, values.seed === true]
	const mode = values.run === true ? 'run' : values.dry === true ? 'dry' : 'seed'
	if (modes.filter(Boolean).length !== 1) problems.push('exactly one of --run, --dry, and --seed is required')
	const copy = /^[1-8]$/.test(values.copy ?? '') ? Number(values.copy) : 0
	if (copy === 0) problems.push('--copy must be an integer from 1 to 8')
	const model = values.model ?? MODELS.q2
	const key = Object.entries(MODELS).find(([, tag]) => tag === model)?.[0]
	if (key === undefined) problems.push(`--model must be one of ${Object.values(MODELS).join(', ')}`)
	const arm = values.arm ?? 'control'
	if (!isArm(arm)) problems.push('--arm must be control or aggregate')
	const live = values.live === true
	const url = values.url ?? DAEMON
	let port = ''
	try {
		port = new URL(url).port
	} catch {
		problems.push('--url must be a URL')
	}
	if (mode === 'dry' && (live || values.out !== undefined)) problems.push('--dry takes neither --live nor --out')
	if (mode !== 'dry' && values.out === undefined) problems.push(`--${mode} requires --out DIR`)
	if (mode === 'seed' && !live) problems.push('--seed requires --live')
	if (mode === 'run' && !live && port === DAEMON_PORT) problems.push('--run without --live refuses the daemon URL')
	const allowance = readCount(values.allowance, 'allowance', 1, problems)
	const retry = readCount(values.retry, 'retry', 0, problems)
	const predict = readCount(values.predict, 'predict', 1, problems)
	if (problems.length > 0 || key === undefined || !isArm(arm)) {
		return { success: false, error: `${problems.join('\n')}\n${USAGE}` }
	}
	return {
		success: true,
		value: {
			mode,
			live,
			copy,
			model,
			key,
			arm,
			out: values.out === undefined ? undefined : resolve(values.out),
			cache: resolveRoot(values.cache ?? join('tmp', 'l5', 'cache')),
			url,
			goals: (values.goals ?? '')
				.split(',')
				.map((prefix) => prefix.trim())
				.filter((prefix) => prefix !== ''),
			fit: resolveRoot(values.fit ?? join('bench5', 'fit.json')),
			settings: resolveRoot(values.settings ?? join('bench5', 'settings.json')),
			allowance,
			retry,
			predict,
		},
	}
}

/**
 * Reads the parts of a scenario file that a run uses.
 *
 * @param path - The scenario copy
 * @returns The system text, the desk topics with the warehouse topic unrequested, the days, the seed, the lookup tables, and the goals
 * @remarks Thrown when a field that the run reads is missing or has the wrong type.
 */
export function readCopy(path: string): Copy {
	const scenario = readJSON(path)
	const topics = readField(readField(scenario, 'ledger'), 'topics')
	if (!isRecord(topics)) throw new Error('the scenario field ledger.topics is not a table')
	return {
		system: readText(readField(scenario, 'ledger'), 'system'),
		topics: Object.entries(topics).map(([name, criterion]) => ({
			name,
			criterion: String(criterion),
			requested: name !== 'warehouse',
		})),
		days: readList(scenario, 'days').map((day): ScenarioDay => ({ date: readText(day, 'date'), from: readNumber(day, 'from') })),
		seed: readList(scenario, 'seed').map(readSeedMessage),
		tables: readTables(scenario),
		goals: readList(scenario, 'goals').map(readGoal),
	}
}

/**
 * Reads the settings of one model from the settings file.
 *
 * @param path - The settings file, an object keyed by model key
 * @param key - The model key, one of the `MODELS` keys
 * @returns The model's allowance, retry bound, and summarizer cap
 * @remarks Thrown when the file has no valid entry for the key.
 */
export function readSettings(path: string, key: string): Settings {
	const entry = readField(readJSON(path), key)
	if (!isSettings(entry)) throw new Error(`${path} holds no valid settings for ${key}`)
	return { allowance: entry.allowance, retry: entry.retry, predict: entry.predict }
}

/**
 * Reads the CHANGE and AGREE cutoffs from the fit file.
 *
 * @param path - The fit file
 * @returns The cutoffs and whether the calibration separated the questions
 * @remarks Thrown when a cutoff is not above 0.5 and at most 1, or when `separated` is not a boolean.
 */
export function readFit(path: string): Fit {
	const value = readJSON(path)
	if (!isFit(value)) throw new Error(`${path} holds no valid cutoffs`)
	return { change: value.change, agree: value.agree, separated: value.separated }
}

/**
 * Computes the prompt share of the aggregate arm.
 *
 * @param allowance - The summaries allowance in tokens
 * @param capacity - The context capacity in tokens
 * @param fixed - The tokens every request carries beyond its messages, from the calibrated gauge
 * @returns The default prompt share less the allowance as a share of the window the messages can use
 * @remarks Thrown when the allowance leaves no share for the prompt.
 *
 * @example
 * ```ts
 * resolveShare(300, 3072, 500) // 0.7 - 300 / 2572
 * ```
 */
export function resolveShare(allowance: number, capacity: number, fixed: number): number {
	const share = DEFAULT_LEDGER_SHARE.prompt - allowance / (capacity - fixed)
	if (!Number.isFinite(share) || share <= 0) {
		throw new Error(`an allowance of ${allowance} tokens leaves no prompt share at capacity ${capacity} and fixed cost ${fixed}`)
	}
	return share
}

/**
 * Selects the goals that match the prefixes.
 *
 * @param goals - The goals in scenario order
 * @param prefixes - The goal id prefixes; empty selects every goal
 * @returns The matching goals in scenario order
 */
export function selectGoals(goals: readonly CopyGoal[], prefixes: readonly string[]): readonly CopyGoal[] {
	return prefixes.length === 0 ? goals : goals.filter((goal) => prefixes.some((prefix) => goal.id.startsWith(prefix)))
}

/**
 * Adds seed messages to a conversation and maps their ids to their seed indices.
 *
 * @param conversation - The conversation that receives the messages
 * @param seed - The seed messages
 * @param from - The index of the first message to add
 * @param to - The index of the last message to add
 * @param seeds - The map from message id to seed index that receives the added entries
 */
export function appendSeed(
	conversation: LedgerInterface['conversation'],
	seed: readonly SeedMessage[],
	from: number,
	to: number,
	seeds: Map<string, number>,
): void {
	const added = conversation.add(seed.slice(from, to + 1).map((message) => ({ ...message })))
	for (const [offset, message] of added.entries()) seeds.set(message.id, from + offset)
}

/**
 * Builds the tail of a selection as seed index, role, and content.
 *
 * @param messages - The selection's messages
 * @param seeds - The map from message id to seed index
 * @returns One record per message; a message that is not a seed message has no index
 */
export function buildTail(messages: readonly Message[], seeds: ReadonlyMap<string, number>): readonly TailMessage[] {
	return messages.map((message) => ({ index: seeds.get(message.id), role: message.role, content: message.content }))
}

/**
 * Counts the questions that a span of a run asked, by head.
 *
 * @param before - The cache counters at the start of the span
 * @param after - The cache counters at its end
 * @returns For each head that asked, the questions the cache missed and the questions its rows answered
 */
export function buildQuestions(before: JudgeStats, after: JudgeStats): Readonly<Record<string, QuestionCount>> {
	const heads = new Set([...Object.keys(after.hits), ...Object.keys(after.misses)])
	const counts: Record<string, QuestionCount> = {}
	for (const head of heads) {
		const fresh = (after.misses[head] ?? 0) - (before.misses[head] ?? 0)
		const hits = (after.hits[head] ?? 0) - (before.hits[head] ?? 0)
		if (fresh > 0 || hits > 0) counts[head] = { fresh, hits }
	}
	return counts
}

/**
 * Shapes the body of a chat request for the wire.
 *
 * @param role - The role that sends the request
 * @param text - The request body as the provider built it
 * @param calibrating - If `true`, an agent request carries `num_predict` 1; if `false`, it keeps the provider's options
 * @returns The body with `truncate` false for a chat role, or the text unchanged for the judge and for text that is not a JSON object
 */
export function shapeBody(role: CallRole, text: string, calibrating: boolean): string {
	if (!FLUSH_ROLES.has(role)) return text
	let body: unknown
	try {
		body = JSON.parse(text)
	} catch {
		return text
	}
	if (!isRecord(body)) return text
	const options = isRecord(body['options']) ? body['options'] : {}
	return JSON.stringify({
		...body,
		truncate: false,
		...(calibrating && role === 'agent' ? { options: { ...options, num_predict: 1 } } : {}),
	})
}

/**
 * Sums the counts of a record.
 *
 * @param counts - The counts by head
 * @returns The total of the counts
 */
/**
 * Blanks the request of a goal so that two scenario files compare on everything else.
 *
 * @param goal - The goal as parsed
 * @returns A copy of the goal with an undefined request; a value that is not an object yields an object with only the request
 */
export function stripRequest(goal: unknown): unknown {
	return { ...(isRecord(goal) ? goal : {}), request: undefined }
}

export function sumCounts(counts: Readonly<Record<string, number>>): number {
	return Object.values(counts).reduce((sum, count) => sum + count, 0)
}

/**
 * Splits the questions that a cache missed into those about the seed alone and those that name a request.
 *
 * @param missed - The ids of the distinct questions that missed, each a JSON array of the head and its message ids
 * @param requests - The ids of the request messages
 * @returns The misses by head, the count of missed questions about the seed alone, and the count that name a request
 */
export function classifyMisses(missed: ReadonlySet<string>, requests: ReadonlySet<string>): Coverage {
	const misses: Record<string, number> = {}
	let named = 0
	for (const id of missed) {
		const head = extractHead(id)
		misses[head] = (misses[head] ?? 0) + 1
		const key: unknown = JSON.parse(id)
		if (Array.isArray(key) && key.some((part) => typeof part === 'string' && requests.has(part))) named += 1
	}
	return { misses, seed: missed.size - named, requests: named }
}

/**
 * Lists which version of each versioned lookup a read point serves.
 *
 * @param tables - The scenario's lookup tables
 * @param position - The index of the last seed message added
 * @returns One `ID@FROM` entry per versioned lookup, with `base` when no version has started
 */
export function describeLookups(tables: ScenarioLookups, position: number): string {
	const ids = [...new Set(tables.lookups.map((entry) => entry.id))]
	return ids
		.map((id) => {
			const started = tables.lookups.filter((entry) => entry.id === id && entry.from <= position).map((entry) => entry.from)
			return `${id}@${started.length === 0 ? 'base' : Math.max(...started)}`
		})
		.join(', ')
}

/**
 * Runs the long-scenario benchmark for one arm, one copy, and one model, or covers its judge questions without a model call.
 *
 * @remarks
 * A run calibrates the gauge on a ledger of its own, builds the arm's ledger with that gauge, adds the seed up to each goal's read point, writes the date instruction, serves the goal, scores the reply, and appends the row. Both arms send the prefix flush after the aggregate stage. The aggregate arm sets `share.prompt` to the default less the allowance over the window the messages can use.
 *
 * @example
 * ```ts
 * const outcome = parseFlags(['--dry', '--copy', '1'])
 * if (outcome.success) process.exitCode = await new Driver(outcome.value).execute()
 * ```
 */
export class Driver {
	readonly #config: Config
	readonly #started = Date.now()
	readonly #walls = new Map<CallRole, number>()
	readonly #requests = new Set<string>()
	readonly #tags = new Map<string, string>()
	#sequence = 0
	#calibrating = false
	#position = -1
	#current: CopyGoal | undefined
	#date = ''
	#path: string | undefined
	#cache: JudgeCache | undefined
	#gauge: LedgerGauge | undefined
	#share: LedgerShare | undefined
	#faults = 0
	#prompts: number[] = []
	#picks: SelectionRecord[] = []
	#lookups = 0
	#repeats = 0
	#recalls = 0
	#closed = 0
	#size: number | undefined
	#stage = 0
	#flushed = 0
	#rendering: AggregateRendering | undefined
	#shown: Selection | undefined

	/**
	 * Holds the validated configuration.
	 * @param config - The outcome of `parseFlags`
	 */
	constructor(config: Config) {
		this.#config = config
	}

	/**
	 * Runs the configured mode to completion.
	 *
	 * @returns The exit code: 0 on success, 1 when a dry run finds the settings differ from the scenario copy
	 * @remarks Thrown when a run or a seed pass fails, when its output directory exists, and when its settings differ; the judge cache's fault ends a run with a thrown harness fault after the output is written.
	 */
	async execute(): Promise<number> {
		const prepared = this.#prepare()
		const failed = prepared.checks.filter((check) => !check.equal)
		if (this.#config.mode === 'dry') return await this.#dry(prepared, failed)
		if (failed.length > 0) throw new Error(`settings differ: ${failed.map((check) => check.name).join(', ')}`)
		if (this.#config.mode === 'seed') return await this.#seed(prepared)
		return await this.#run(prepared)
	}

	#prepare(): Preparation {
		const { key, goals: prefixes, settings: settingsPath, fit: fitPath, arm } = this.#config
		const path = join(COPIES_DIR, `v${this.#config.copy}.json`)
		const copy = readCopy(path)
		const stored = readSettings(settingsPath, key)
		const settings: Settings = {
			allowance: this.#config.allowance ?? stored.allowance,
			retry: this.#config.retry ?? stored.retry,
			predict: this.#config.predict ?? stored.predict,
		}
		const goals = selectGoals(copy.goals, prefixes)
		if (goals.length === 0) throw new Error(`--goals ${prefixes.join(',')} matches no goal of ${path}`)
		const base = readJSON(SCENARIO_LONG)
		const raw = readJSON(path)
		const checks = GOAL_ROOT.map((name) => this.#compare(`copy.${name}`, readField(raw, name), readField(base, name)))
		checks.push(
			this.#compare('copy.goals', readList(raw, 'goals').map(stripRequest), readList(base, 'goals').map(stripRequest)),
			this.#compare('capacity', SAMPLER.num_ctx, 3072),
		)
		if (arm === 'aggregate') checks.push(this.#compare('share', resolveShare(settings.allowance, SAMPLER.num_ctx, 0) > 0, true))
		return { copy, settings, fit: readFit(fitPath), goals, checks }
	}

	#compare(name: string, actual: unknown, expected: unknown): Check {
		return { name, actual, expected, equal: isDeepStrictEqual(actual, expected) }
	}

	#record(call: CallRecord): void {
		this.#walls.set(call.role, (this.#walls.get(call.role) ?? 0) + call.wall)
		if (call.role === 'agent' && (call.error !== undefined || (call.status ?? 0) >= 400)) this.#faults += 1
		if (this.#path !== undefined) appendFileSync(this.#path, `${JSON.stringify(call)}\n`)
	}

	async #fetch(role: CallRole, input: Parameters<typeof fetch>[0], init?: RequestInit): Promise<Response> {
		this.#sequence += 1
		const sequence = this.#sequence
		const goal = this.#current?.id
		const started = Date.now()
		let status: number | undefined
		let error: string | undefined
		try {
			const request = new Request(input, init)
			const blocked = this.#config.mode === 'dry' || (!this.#config.live && new URL(request.url).port === DAEMON_PORT)
			if (blocked) throw new Error(`fetch guard: request ${sequence} (${role}) refused; --live is required`)
			const body = shapeBody(role, await request.text(), this.#calibrating)
			const response = await globalThis.fetch(request.url, {
				method: request.method,
				headers: request.headers,
				body,
				signal: request.signal,
			})
			status = response.status
			const bytes = new Uint8Array(await response.arrayBuffer())
			return new Response(NO_BODY.includes(status) ? null : bytes, {
				status,
				statusText: response.statusText,
				headers: response.headers,
			})
		} catch (cause) {
			error = describeError(cause)
			throw cause
		} finally {
			this.#record({
				sequence,
				role,
				goal,
				started,
				wall: Date.now() - started,
				status,
				...(error === undefined ? {} : { error }),
			})
		}
	}

	#createProvider(role: CallRole, options: Readonly<Record<string, number>>): ProviderInterface {
		return createOllama({
			url: this.#config.url,
			model: this.#config.model,
			think: false,
			keepAlive: '30m',
			timeout: TIMEOUT,
			options: { ...options },
			fetch: (input: Parameters<typeof fetch>[0], init?: RequestInit) => this.#fetch(role, input, init),
		})
	}

	#createJudge(): JudgeInterface {
		return createOllamaJudge({
			url: this.#config.url,
			model: MICA_MODEL,
			system: MICA_SYSTEM,
			calibration: { temperature: MICA_CALIBRATION },
			options: { num_ctx: MICA_CONTEXT },
			keepAlive: '5m',
			timeout: TIMEOUT,
			fetch: (input: Parameters<typeof fetch>[0], init?: RequestInit) => this.#fetch('judge', input, init),
		})
	}

	// Writes the corpus rows under the judge's identity the first time a cache directory is used; a dry run reads them from a scratch file instead.
	#prepareCache(model: string, copy: Copy): { readonly path: string; readonly scratch: string | undefined } {
		const path = join(this.#config.cache, FILES.judge)
		if (existsSync(path)) return { path, scratch: undefined }
		const rows: readonly CacheRow[] = importCorpus(readRows(CORPUS), copy.seed, copy.topics, model)
		const text = rows.map((row) => `${JSON.stringify(row)}\n`).join('')
		if (this.#config.mode === 'dry') {
			const scratch = mkdtempSync(join(tmpdir(), 'bench5-dry-'))
			writeFileSync(join(scratch, FILES.judge), text)
			return { path: join(scratch, FILES.judge), scratch }
		}
		mkdirSync(this.#config.cache, { recursive: true })
		writeFileSync(path, text)
		return { path, scratch: undefined }
	}

	#createCache(copy: Copy, settings: Settings, live: boolean, abort: AbortController): { readonly cache: JudgeCache; readonly scratch: string | undefined } {
		const judge = this.#createJudge()
		const { path, scratch } = this.#prepareCache(judge.model, copy)
		const cache = new JudgeCache({ judge, path, live, retry: settings.retry, abort: (fault) => abort.abort(fault) })
		this.#cache = cache
		return { cache, scratch }
	}

	#assemble(copy: Copy, system: string, cache: JudgeCache, share: LedgerShare, gauge: LedgerGauge | undefined): LedgerInterface {
		const lookups = LOOKUP_TOOLS.map((spec) => ({
			tool: createTool({
				name: spec.name,
				description: spec.description,
				parameters: {
					type: 'object',
					properties: { [spec.key]: { type: 'string', description: spec.summary } },
					required: [spec.key],
				},
				execute: (args) => resolveLookup(copy.tables, spec.name, String(args[spec.key] ?? ''), this.#position),
			}),
			read: readLookup,
		}))
		return createLedger(this.#createProvider('agent', SAMPLER), {
			judge: cache,
			system,
			topics: copy.topics,
			questions: LEDGER_QUESTIONS,
			thresholds: FIT,
			capacity: SAMPLER.num_ctx,
			predict: 0,
			think: false,
			share,
			recall: { limit: DEFAULT_RECALL_LIMIT },
			agent: { limit: DEFAULT_LEDGER_LIMIT, timeout: TIMEOUT },
			lookups,
			...(gauge === undefined ? {} : { gauge }),
		})
	}

	#createMirror(ledger: LedgerInterface, copy: Copy, system: string, cache: JudgeCache): Mirror {
		return new Mirror(ledger, {
			judge: cache,
			questions: LEDGER_QUESTIONS,
			topics: copy.topics,
			thresholds: FIT,
			system,
			reads: new Map<string, MirrorRead>(LOOKUP_TOOLS.map((spec) => [spec.name, readLookup])),
		})
	}

	// Prices a prompt on a ledger of its own, because the aggregate arm's share needs the fixed cost before its ledger exists.
	async #calibrate(copy: Copy, system: string, cache: JudgeCache, after: number, signal: AbortSignal): Promise<LedgerGauge> {
		const ledger = this.#assemble(copy, system, cache, { ...DEFAULT_LEDGER_SHARE }, undefined)
		appendSeed(ledger.conversation, copy.seed, 0, after, new Map())
		this.#calibrating = true
		try {
			return await ledger.calibrate(signal)
		} finally {
			this.#calibrating = false
		}
	}

	#advance(rig: Rig, to: number): void {
		if (to <= this.#position) return
		appendSeed(rig.ledger.conversation, rig.copy.seed, this.#position + 1, to, rig.seeds)
		this.#position = to
	}

	#build(prepared: Preparation, system: string, cache: JudgeCache, gauge: LedgerGauge, share: LedgerShare, abort: AbortController, out: string): Rig {
		const { copy, settings, fit } = prepared
		const ledger = this.#assemble(copy, system, cache, share, gauge)
		const mirror = this.#createMirror(ledger, copy, system, cache)
		const seeds = new Map<string, number>()
		const aggregator =
			this.#config.arm === 'aggregate'
				? new Aggregator({
						mirror,
						summarizer: new Summarizer({
							provider: this.#createProvider('summarizer', { ...SAMPLER, num_predict: settings.predict }),
							model: this.#config.model,
							sampler: SAMPLER,
							predict: settings.predict,
							cache: join(this.#config.cache, FILES.summary),
							live: this.#config.live,
						}),
						judge: cache,
						fit,
						settings,
						days: copy.days,
						seeds,
						path: join(out, FILES.aggregates),
						log: (line) => process.stderr.write(`${line}\n`),
					})
				: undefined
		const rig: Rig = {
			ledger,
			mirror,
			cache,
			aggregator,
			flusher: this.#createProvider('flush', { ...SAMPLER, num_predict: 1 }),
			copy,
			system,
			seeds,
			abort,
		}
		const { agent } = ledger
		agent.emitter.on('select', (selection) => this.#observe(rig, selection, out))
		agent.emitter.on('usage', (usage) => {
			this.#prompts.push(usage.prompt)
		})
		agent.emitter.on('tool', (call, result) => this.#count(rig, call, result))
		agent.context.apply(createScope({ name: 'aggregate', select: (_conversation, request, signal) => this.#intercept(rig, request, signal) }))
		return rig
	}

	async #run(prepared: Preparation): Promise<number> {
		const { copy, settings, goals } = prepared
		const { out, arm } = this.#config
		if (out === undefined) throw new Error('--run requires --out DIR')
		if (existsSync(out)) throw new Error(`run output already exists: ${out}`)
		mkdirSync(out, { recursive: true })
		this.#path = join(out, FILES.calls)
		const abort = new AbortController()
		const { cache, scratch } = this.#createCache(copy, settings, this.#config.live, abort)
		const system = buildSystem({ ledger: { system: copy.system } })
		let rig: Rig | undefined
		this.#report(out, prepared, 'started', undefined)
		try {
			const [first] = goals
			if (first === undefined) throw new Error('no goal to serve')
			const gauge = await this.#calibrate(copy, system, cache, first.after, abort.signal)
			this.#gauge = gauge
			this.#share =
				arm === 'aggregate'
					? { ...DEFAULT_LEDGER_SHARE, prompt: resolveShare(settings.allowance, SAMPLER.num_ctx, gauge.fixed) }
					: { ...DEFAULT_LEDGER_SHARE }
			this.#report(out, prepared, 'calibrated', undefined)
			rig = this.#build(prepared, system, cache, gauge, this.#share, abort, out)
			this.#advance(rig, first.after)
			for (const goal of goals) await this.#serve(rig, goal, prepared, out)
			this.#report(out, prepared, 'complete', undefined)
			return 0
		} catch (error) {
			this.#report(out, prepared, abort.signal.aborted ? 'fault' : 'failed', describeError(error))
			throw error
		} finally {
			if (rig !== undefined) this.#dump(rig, out)
			if (scratch !== undefined) rmSync(scratch, { recursive: true, force: true })
		}
	}

	#count(rig: Rig, call: ToolCall, result: ToolResult): void {
		if (call.name !== 'recall') {
			this.#lookups += 1
			if (!result.success && result.error === LEDGER_NOTES.repeat) this.#repeats += 1
			return
		}
		this.#recalls += 1
		if (!result.success && result.error === LEDGER_NOTES.closed) {
			this.#closed += 1
			return
		}
		if (this.#size === undefined && result.success) {
			const text = typeof result.value === 'string' ? result.value : JSON.stringify(result.value)
			this.#size = estimateMessages([{ id: 'recall', role: 'tool', content: text }]) * (rig.ledger.gauge?.scale ?? 1)
		}
	}

	#observe(rig: Rig, selection: Selection, out: string): void {
		const goal = this.#current?.id
		if (goal === undefined) return
		const briefing = selection.briefing ?? ''
		const record: SelectionRecord = {
			goal,
			pass: this.#picks.length + 1,
			sequence: this.#sequence,
			briefing,
			digest: computeDigest(briefing),
			tail: buildTail(selection.messages, rig.seeds),
			instructions: Object.fromEntries(rig.ledger.agent.context.instructions.instructions().map((one) => [one.name, one.content])),
			scale: rig.ledger.gauge?.scale,
		}
		this.#picks.push(record)
		appendFileSync(join(out, FILES.selections), `${JSON.stringify(record)}\n`)
	}

	// Wraps the ledger's selection: files the request, runs the aggregate stage, and sends the prefix flush before the agent builds its prompt.
	async #intercept(rig: Rig, request: Message, signal: AbortSignal): Promise<Selection> {
		const { context } = rig.ledger.agent
		const scope = context.scope
		rig.mirror.note(request)
		this.#requests.add(request.id)
		// The context reads the scope at call time, so clearing it routes the call to the ledger's own handler.
		context.apply(undefined)
		let selection: Selection | undefined
		try {
			selection = await context.select(request, signal)
		} finally {
			context.apply(scope)
		}
		if (selection === undefined) throw new Error('the ledger registered no selection handler')
		this.#shown = selection
		const staged = performance.now()
		await this.#summarize(rig, request, selection, signal)
		this.#stage = rig.aggregator === undefined ? 0 : performance.now() - staged
		if (!signal.aborted) await this.#flush(rig, signal)
		return selection
	}

	async #summarize(rig: Rig, request: Message, selection: Selection, signal: AbortSignal): Promise<void> {
		const { instructions } = rig.ledger.agent.context
		let text = ''
		this.#rendering = undefined
		if (rig.aggregator !== undefined) {
			try {
				await rig.aggregator.maintain(request, this.#current?.id ?? '', this.#position, signal)
				const rendering = rig.aggregator.render(selection, request, rig.system, this.#date, rig.ledger.gauge?.scale ?? 1)
				this.#rendering = rendering
				// A faulted selection drops the briefing, but the build renders instructions anyway, so the block must go too.
				text = selection.fault === undefined ? rendering.text : ''
			} catch (error) {
				process.stderr.write(`aggregate stage ${this.#current?.id ?? ''}: ${describeError(error)}\n`)
			}
		}
		if (text === '') instructions.remove(INSTRUCTION_SUMMARIES.name)
		else instructions.add({ name: INSTRUCTION_SUMMARIES.name, content: text, priority: INSTRUCTION_SUMMARIES.priority })
	}

	async #flush(rig: Rig, signal: AbortSignal): Promise<void> {
		const started = performance.now()
		try {
			await rig.flusher.generate(
				[
					{ id: 'flush-system', role: 'system', content: FLUSH_SYSTEM },
					{ id: 'flush-user', role: 'user', content: '' },
				],
				signal,
				undefined,
				{ think: false },
			)
		} catch (error) {
			process.stderr.write(`prefix flush ${this.#current?.id ?? ''}: ${describeError(error)}\n`)
		}
		this.#flushed = performance.now() - started
	}

	#begin(goal: CopyGoal): void {
		this.#current = goal
		this.#faults = 0
		this.#prompts = []
		this.#picks = []
		this.#lookups = 0
		this.#repeats = 0
		this.#recalls = 0
		this.#closed = 0
		this.#size = undefined
		this.#stage = 0
		this.#flushed = 0
		this.#rendering = undefined
		this.#shown = undefined
	}

	async #serve(rig: Rig, goal: CopyGoal, prepared: Preparation, out: string): Promise<void> {
		this.#begin(goal)
		this.#advance(rig, goal.after)
		this.#date = renderDate(findDay(rig.copy.days, goal.after)?.date ?? '')
		rig.ledger.agent.context.instructions.add({ name: INSTRUCTION_DATE.name, content: this.#date, priority: INSTRUCTION_DATE.priority })
		const before = rig.cache.stats()
		const scale = rig.ledger.gauge?.scale ?? 0
		const first = this.#sequence + 1
		const length = rig.ledger.conversation.messages().length
		const started = Date.now()
		let result: LedgerResult | undefined
		let error: string | undefined
		try {
			result = await rig.ledger.respond(goal.request, AbortSignal.any([AbortSignal.timeout(TIMEOUT), rig.abort.signal]))
		} catch (fault) {
			error = describeError(fault)
		}
		const total = Date.now() - started
		for (const message of rig.ledger.conversation.messages().slice(length)) this.#tags.set(message.id, goal.id)
		if (rig.cache.fault !== undefined) throw rig.cache.fault
		const reply = result === undefined || result.partial ? '' : result.content.trim()
		const score = this.#score(goal, reply)
		const prompt = Math.max(0, ...this.#prompts)
		const rendering = this.#rendering
		const row: Row = {
			goal: goal.id,
			copy: this.#config.copy,
			model: this.#config.model,
			arm: this.#config.arm,
			success: error === undefined && reply !== '' && score.clean,
			reply,
			via: reply === '' ? 'none' : (result?.passes.length ?? 0) > 1 ? 'answered' : 'final',
			missing: score.missing,
			violations: score.violations,
			patterns: score.patterns,
			passes: result?.passes.length ?? 0,
			usage: result?.usage,
			partial: result?.partial,
			error,
			faults: this.#faults,
			wall: Math.max(0, total - this.#stage - this.#flushed),
			stage: this.#stage,
			flush: this.#flushed,
			first,
			last: this.#sequence,
			prompt,
			entry: this.#prompts[0],
			overflow: prompt >= SAMPLER.num_ctx || CONTEXT_ERROR.test(error ?? ''),
			recalls: this.#recallCount(),
			lookups: { calls: this.#lookups, repeats: this.#repeats },
			questions: buildQuestions(before, rig.cache.stats()),
			briefing: this.#read(rig, goal, scale),
			scale,
			tail: computeDigest(this.#picks[0]?.tail ?? []),
			rendered: rendering?.topics ?? [],
			cut: rendering?.cut ?? [],
			withheld: rendering?.withheld ?? [],
			emptied: rendering?.emptied ?? [],
			summary: rendering?.tokens ?? 0,
			filtered: rendering?.filtered.length ?? 0,
			sole: rendering?.sole ?? 0,
		}
		appendFileSync(join(out, FILES.rows), `${JSON.stringify(row)}\n`)
		this.#report(out, prepared, 'running', undefined)
		console.log(`${goal.id}: ${row.success ? 'PASS' : 'FAIL'}; wall=${row.wall}ms stage=${Math.round(row.stage)}ms`)
	}

	#score(goal: CopyGoal, reply: string): Score {
		const rules: unknown = compileRules(goal)
		const scored: unknown = scoreText(rules, reply)
		return {
			clean: clean(scored) === true,
			missing: readTexts(scored, 'missing'),
			violations: readTexts(scored, 'violations'),
			patterns: readTexts(scored, 'patterns'),
		}
	}

	#recallCount(): RecallCount {
		const limited = this.#recalls - this.#closed >= DEFAULT_RECALL_LIMIT
		return {
			calls: this.#recalls,
			closed: this.#closed,
			size: this.#size,
			cause: this.#closed === 0 ? undefined : limited ? 'limit' : 'room',
		}
	}

	// Reads what the first select showed: the briefing's price, the goal's facts that render, and the stale tokens that do.
	#read(rig: Rig, goal: CopyGoal, scale: number): BriefingReading {
		const selection = this.#shown
		if (selection === undefined) return { tokens: 0, facts: 0, stale: 0, digest: computeDigest('') }
		const briefing = selection.briefing ?? ''
		const text = [briefing, ...selection.messages.map((message) => message.content)].join('\n')
		const tail = new Set(selection.messages.map((message) => message.id))
		const ids = new Map([...rig.seeds].map(([id, index]) => [index, id]))
		const input = rig.mirror.input()
		const projection = rig.mirror.projection(input)
		const facts = goal.facts.filter((index) => {
			const id = ids.get(index)
			return id !== undefined && (tail.has(id) || rig.mirror.lines(id, input, projection).some((line) => text.includes(line.text)))
		})
		const carried = new Set(goal.facts.flatMap((index) => this.#tokens(rig, index)))
		const stale = new Set(goal.stale.flatMap((index) => this.#tokens(rig, index)).filter((token) => !carried.has(token) && text.includes(token)))
		const lower = text.toLowerCase()
		const forbidden = goal.forbidden.filter((phrase) => lower.includes(phrase.toLowerCase()))
		return {
			tokens: estimateMessages([{ id: 'briefing', role: 'system', content: briefing }]) * scale,
			facts: facts.length,
			stale: stale.size + forbidden.length,
			digest: computeDigest(briefing),
		}
	}

	#tokens(rig: Rig, index: number): readonly string[] {
		const content = rig.copy.seed[index]?.content
		if (content === undefined) return []
		const { ids, numbers } = extractTokens(content)
		return [...ids, ...[...numbers].map(String)]
	}

	#dump(rig: Rig, out: string): void {
		writeFileSync(
			join(out, FILES.messages),
			rig.ledger.conversation
				.messages()
				.map(
					(message) =>
						`${JSON.stringify({
							id: message.id,
							index: rig.seeds.get(message.id),
							role: message.role,
							content: message.content,
							...(message.calls === undefined ? {} : { calls: message.calls }),
							...(message.call === undefined ? {} : { call: message.call }),
							goal: this.#tags.get(message.id),
							request: this.#requests.has(message.id),
						})}\n`,
				)
				.join(''),
		)
		this.#dumpJudgments(rig.ledger, out)
	}

	#dumpJudgments(ledger: LedgerInterface, out: string): void {
		writeFileSync(
			join(out, FILES.judgments),
			ledger.conversation.judgments
				.judgments()
				.map((judgment) => `${JSON.stringify(judgment)}\n`)
				.join(''),
		)
	}

	#report(out: string, prepared: Preparation, status: string, error: string | undefined): void {
		const config = this.#config
		writeFileSync(
			join(out, FILES.run),
			JSON.stringify(
				{
					status,
					error,
					mode: config.mode,
					copy: config.copy,
					model: config.model,
					arm: config.arm,
					live: config.live,
					url: config.url,
					goals: prepared.goals.map((goal) => goal.id),
					build: { entry: VENDOR_AGENT, sha256: computeDigest(readFileSync(VENDOR_AGENT, 'utf8')) },
					settings: prepared.settings,
					fit: prepared.fit,
					gauge: this.#gauge,
					share: this.#share,
					judge: this.#cache?.stats(),
					checks: prepared.checks.map(({ name, equal }) => ({ name, equal })),
					requests: this.#sequence,
					walls: Object.fromEntries(this.#walls),
					wall: Date.now() - this.#started,
				},
				null,
				2,
			),
		)
	}

	// Covers the judge questions of the seed and the copy's requests without a model call (a dry run) or with the judge (a seed pass).
	async #cover(prepared: Preparation, live: boolean, out: string | undefined): Promise<Coverage> {
		const { copy, settings, goals } = prepared
		const abort = new AbortController()
		const { cache, scratch } = this.#createCache(copy, settings, live, abort)
		try {
			const system = buildSystem({ ledger: { system: copy.system } })
			const ledger = this.#assemble(copy, system, cache, { ...DEFAULT_LEDGER_SHARE }, undefined)
			const mirror = this.#createMirror(ledger, copy, system, cache)
			const missed = new Set<string>()
			const classifier = new Classifier({
				conversation: ledger.conversation,
				judge: {
					id: cache.id,
					name: cache.name,
					model: cache.model,
					ask: async (request, signal) => {
						const before = sumCounts(cache.stats().misses)
						try {
							return await cache.ask(request, signal)
						} finally {
							if (sumCounts(cache.stats().misses) > before) for (const id of Object.keys(request.questions)) missed.add(id)
						}
					},
				},
				questions: LEDGER_QUESTIONS,
				topics: copy.topics,
				thresholds: FIT,
				assign: (message: Message) => mirror.assign(message),
				entities: (text: string, partial: boolean) => matchEntities(collectRegistry(mirror.readings()), text, partial),
			})
			const requests = new Set<string>()
			let position = -1
			for (const goal of goals) {
				if (goal.after > position) {
					appendSeed(ledger.conversation, copy.seed, position + 1, goal.after, new Map())
					position = goal.after
				}
				const request = ledger.conversation.add({ role: 'user', content: goal.request })
				mirror.note(request)
				requests.add(request.id)
				await classifier.classify(requests, abort.signal)
				if (cache.fault !== undefined) throw cache.fault
				console.log(
					live
						? `${goal.id} after=${goal.after} asked=${JSON.stringify(cache.stats().misses)}`
						: `${goal.id} after=${goal.after} date=${findDay(copy.days, goal.after)?.date ?? ''} lookups=${describeLookups(copy.tables, goal.after)}`,
				)
			}
			if (out !== undefined) this.#dumpJudgments(ledger, out)
			return classifyMisses(missed, requests)
		} finally {
			if (scratch !== undefined) rmSync(scratch, { recursive: true, force: true })
		}
	}

	async #dry(prepared: Preparation, failed: readonly Check[]): Promise<number> {
		for (const check of prepared.checks) {
			console.log(
				`${check.equal ? 'OK' : 'DIFF'} ${check.name}${check.equal ? '' : `: ${JSON.stringify(check.actual)} | expected ${JSON.stringify(check.expected)}`}`,
			)
		}
		const coverage = await this.#cover(prepared, false, undefined)
		console.log(
			`coverage: misses ${JSON.stringify(coverage.misses)}; seed-only ${coverage.seed}; request ${coverage.requests} (pair coverage is a lower bound)`,
		)
		console.log(`Dry v${this.#config.copy}: ${failed.length === 0 ? 'PASS' : 'FAIL'}; fetches ${this.#sequence}`)
		return failed.length === 0 ? 0 : 1
	}

	async #seed(prepared: Preparation): Promise<number> {
		const { out } = this.#config
		if (out === undefined) throw new Error('--seed requires --out DIR')
		if (existsSync(out)) throw new Error(`seed output already exists: ${out}`)
		mkdirSync(out, { recursive: true })
		this.#path = join(out, FILES.calls)
		this.#report(out, prepared, 'started', undefined)
		try {
			const coverage = await this.#cover(prepared, true, out)
			this.#report(out, prepared, 'complete', undefined)
			console.log(`seed pass: misses ${JSON.stringify(coverage.misses)}; requests ${this.#sequence}`)
			return 0
		} catch (error) {
			this.#report(out, prepared, 'failed', describeError(error))
			throw error
		}
	}
}
