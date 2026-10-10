import type { JudgeAnswer, JudgeInterface, JudgeQuestion, Message, Selection } from '@orkestrel/agent'
import type { Fixture } from './fixture.ts'
import type { AggregateRow, AggregateSource, CacheRow, Fit, MirrorLine, ScenarioDay, SeedMessage } from '../types.ts'
import { after, before, describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { appendFileSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
	Classifier,
	LEDGER_CATEGORIES,
	LEDGER_QUESTIONS,
	collectRegistry,
	createLedger,
	matchEntities,
} from '../../vendor/agent-0.0.30/index.js'
import { createOllama } from '../../vendor/ollama/index.js'
import { Aggregator } from '../aggregates/Aggregator.ts'
import {
	AGREE_QUESTION,
	CHANGE_QUESTION,
	INSTRUCTION_DATE,
	INSTRUCTION_SUMMARIES,
	SUMMARIES_HEADING,
	SUMMARY_PREFIX,
	SUMMARY_SYSTEM,
} from '../aggregates/constants.ts'
import {
	buildAgreeState,
	buildChangeQuestion,
	buildChangeState,
	buildSource,
	buildSummaryPrompt,
	checkProse,
	collectStaleTokens,
	collectTopicSources,
	collectTopics,
	compareSources,
	countSoleTokens,
	fillSlots,
	filterProse,
	readTokens,
	renderSource,
	renderSummaries,
} from '../aggregates/helpers.ts'
import { CORPUS, FIT, HARNESS, MICA_MODEL, MODELS, SAMPLER, SCENARIO_LONG } from '../constants.ts'
import {
	buildCacheKey,
	buildCategoryQuestion,
	buildSystem,
	buildTopicQuestion,
	findDay,
	importCorpus,
	readJSON,
	readLookup,
	readRows,
	renderMessageState,
	renderPairState,
} from '../helpers.ts'
import { JudgeCache } from '../JudgeCache.ts'
import { Mirror } from '../Mirror.ts'
import { Summarizer } from '../Summarizer.ts'
import { startFixture } from './fixture.ts'

const COPY = join(HARNESS, 'bench', 'variants', 'ledger', 'v1.json')
const SEEDED = 48
const LAST = SEEDED - 1
const PREDICT = 160
const MARCUS = 29
const FITS: Fit = { change: 0.6, agree: 0.6, separated: true }
const AGREED = 0.95
const OWNER = 'owner:LH-44870'
const DESK = ['contacts', 'delivery', 'escalations', 'refunds', 'returns', 'warehouse']
const CORRECTION = 'Correction on the refund approval code: use MX-4490 from now on, not MX-4486.'
const NEWS = 'Update from Sigrid Halvorsen: her direct line moves to extension 4311 from tomorrow.'
const daemon: string[] = []
const original = globalThis.fetch
const directory = mkdtempSync(join(tmpdir(), 'bench5-aggregates-'))
let files = 0

const REFUNDS = [
	'Any refund over $200 needs a manager approval code; use MX-4486 from now on, because MX-4471 is dead.',
	'Opened-item returns get a full refund again after the director scrapped the 15 percent restocking fee.',
]
const RETURNS = [
	'Luis Ferreira on account LH-44870 wants to return an opened stand mixer from order LH-79215.',
	'Opened-item returns get a full refund again after the 15 percent restocking fee was scrapped.',
]
const OWNER_PROSE = [
	'Luis Ferreira on account LH-44870 wants to return an opened stand mixer from order LH-79215.',
	'The order totals $289.00 and the return window is open until 2026-10-21.',
]
const SUMMARIES: Readonly<Record<string, string>> = Object.freeze({
	refunds: REFUNDS.join(' '),
	returns: RETURNS.join(' '),
	escalations:
		'Priya Raman is copied on every escalation, and the Halvorsen Interiors ticket is ESC-2219, not ESC-2291. Grace needs Marcus to sign off first.',
	contacts:
		'Tomasz Brennan is off on Friday 2026-10-09, so release requests must reach him today. Sigrid Halvorsen takes calls after 2 pm on extension 4127.',
	delivery:
		"Tomasz Brennan in the warehouse issues the release for anything stuck at a carrier depot. Kenji Nakamura's replacement kettle on order LH-81660 needs a gift note that reads 'Happy 40th, Aiko'.",
	warehouse:
		'Tomasz Brennan in the warehouse issues the release for stuck shipments, and he is off on Friday 2026-10-09.',
	[OWNER]: OWNER_PROSE.join(' '),
})
const REFUNDS_AFTER =
	'Any refund over $200 needs a manager approval code, and MX-4490 is the code to use from now on, not MX-4486.'
const CONTACTS_AFTER =
	'Tomasz Brennan is off on Friday 2026-10-09. Sigrid Halvorsen takes calls on extension 4311 from tomorrow.'
const MISTYPED = 'Luis Ferreira wants to return the stand mixer from order LH-79251.'

// Blocks the model daemon and lets the fixture on its ephemeral port through.
function guardFetch(input: Parameters<typeof fetch>[0], init?: RequestInit): Promise<Response> {
	const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
	if (/:11434\b/.test(url)) {
		daemon.push(url)
		return Promise.reject(new Error(`blocked daemon request ${url}`))
	}
	return original(input, init)
}

function readField(value: unknown, key: string): unknown {
	return typeof value === 'object' && value !== null ? Reflect.get(value, key) : undefined
}

function readList(value: unknown, key: string): readonly unknown[] {
	const field = readField(value, key)
	return Array.isArray(field) ? field : []
}

function readText(value: unknown, key: string): string {
	const field = readField(value, key)
	assert.equal(typeof field, 'string', key)
	return String(field)
}

function readSeed(scenario: unknown): readonly SeedMessage[] {
	return readList(scenario, 'seed').map((message) => {
		const calls = readField(message, 'calls')
		const call = readField(message, 'call')
		return {
			role: readText(message, 'role'),
			content: readText(message, 'content'),
			...(Array.isArray(calls) ? { calls } : {}),
			...(typeof call === 'string' ? { call } : {}),
		}
	})
}

function readDays(scenario: unknown): readonly ScenarioDay[] {
	return readList(scenario, 'days').map((day) => ({
		date: readText(day, 'date'),
		from: Number(readField(day, 'from')),
	}))
}

function readTopics(): ReadonlyArray<{ readonly name: string; readonly criterion: string; readonly requested: boolean }> {
	const topics = readField(readField(readJSON(COPY), 'ledger'), 'topics')
	assert.ok(typeof topics === 'object' && topics !== null)
	return Object.entries(topics).map(([name, criterion]) => ({
		name,
		criterion: String(criterion),
		requested: name !== 'warehouse',
	}))
}

function isAggregateRow(value: unknown): value is AggregateRow {
	return (
		typeof readField(value, 'event') === 'string' &&
		typeof readField(value, 'topic') === 'string' &&
		typeof readField(value, 'version') === 'number' &&
		Array.isArray(readField(value, 'sources')) &&
		Array.isArray(readField(value, 'failures'))
	)
}

function readAggregates(path: string): readonly AggregateRow[] {
	return readRows(path).filter(isAggregateRow)
}

function buildRow(state: string, question: JudgeQuestion, answer: JudgeAnswer): CacheRow {
	return { key: buildCacheKey(MICA_MODEL, state, question), model: MICA_MODEL, state, question, answer, wall: 0, origin: 'corpus', at: 0 }
}

function buildNoul(probability: number): JudgeAnswer {
	return { form: 'noul', noul: probability }
}

function buildChoice(top: string): JudgeAnswer {
	return {
		form: 'choice',
		probabilities: Object.fromEntries(LEDGER_CATEGORIES.map((category: string) => [category, category === top ? 0.94 : 0.01])),
	}
}

// Rows for the messages that the tests add after the seed: the category and every topic question, with only the named topic reading as a match.
function buildMessageRows(content: string, category: string, topic: string): readonly CacheRow[] {
	const state = renderMessageState({ role: 'user', content })
	return [
		buildRow(state, buildCategoryQuestion(LEDGER_QUESTIONS), buildChoice(category)),
		...readTopics().map((one) => buildRow(state, buildTopicQuestion(one, LEDGER_QUESTIONS), buildNoul(one.name === topic ? 0.95 : 0.04))),
	]
}

function writeRows(path: string, rows: readonly CacheRow[]): void {
	writeFileSync(path, rows.map((row) => `${JSON.stringify(row)}\n`).join(''))
}

interface Rig {
	readonly ledger: ReturnType<typeof createLedger>
	readonly mirror: Mirror
	readonly request: Message
	readonly seeds: Map<string, number>
	readonly days: readonly ScenarioDay[]
	readonly system: string
	readonly asked: readonly unknown[]
	advance(content: string): Promise<Message>
}

// Builds a ledger and a mirror over a conversation of the first 48 seed messages and the first request, and files them from the classification rows.
async function createRig(classify: string): Promise<Rig> {
	const scenario = readJSON(SCENARIO_LONG)
	const seed = readSeed(scenario)
	const topics = readTopics()
	const system = buildSystem({ ledger: { system: readText(readField(readJSON(COPY), 'ledger'), 'system') } })
	const asked: unknown[] = []
	const inner: JudgeInterface = {
		id: 'inert',
		name: 'inert judge',
		model: MICA_MODEL,
		ask(request) {
			asked.push(request)
			return Promise.reject(new Error('the inert judge was asked'))
		},
	}
	const cache = new JudgeCache({ judge: inner, path: classify, live: false, retry: 0 })
	const provider = createOllama({ url: 'http://127.0.0.1:9', model: MODELS.q2, options: SAMPLER })
	const ledger = createLedger(provider, {
		judge: cache,
		system,
		topics,
		questions: LEDGER_QUESTIONS,
		thresholds: FIT,
		capacity: SAMPLER.num_ctx,
		predict: 0,
		think: false,
		gauge: { scale: 1.1, fixed: 100 },
	})
	const reads = new Map([
		['lookup_order', readLookup],
		['lookup_customer', readLookup],
	])
	const mirror = new Mirror(ledger, { judge: cache, questions: LEDGER_QUESTIONS, topics, thresholds: FIT, system, reads })
	const seeds = new Map<string, number>()
	for (const [index, message] of ledger.conversation.add(seed.slice(0, SEEDED).map((one) => ({ ...one }))).entries()) {
		seeds.set(message.id, index)
	}
	const request = ledger.conversation.add({ role: 'user', content: readText(readList(scenario, 'goals')[0], 'request') })
	mirror.note(request)
	const classifier = new Classifier({
		conversation: ledger.conversation,
		judge: cache,
		questions: LEDGER_QUESTIONS,
		topics,
		thresholds: FIT,
		assign: (message: Message) => mirror.assign(message),
		entities: (text: string, partial: boolean) => matchEntities(collectRegistry(mirror.readings()), text, partial),
	})
	const requests = new Set([request.id])
	await classifier.classify(requests, AbortSignal.timeout(60000))
	let count = SEEDED
	return {
		ledger,
		mirror,
		request,
		seeds,
		days: readDays(scenario),
		system,
		asked,
		async advance(content) {
			const message = ledger.conversation.add({ role: 'user', content })
			seeds.set(message.id, count)
			count += 1
			await classifier.classify(requests, AbortSignal.timeout(60000))
			return message
		},
	}
}

function mapDays(rig: Rig): ReadonlyMap<string, string> {
	return new Map(
		rig.mirror.input().messages.map((message) => [message.id, findDay(rig.days, rig.seeds.get(message.id) ?? LAST)?.date ?? '']),
	)
}

function readSources(rig: Rig, key: string): { readonly sources: readonly AggregateSource[]; readonly title: string } {
	const input = rig.mirror.input()
	const projection = rig.mirror.projection(input)
	const topic = collectTopics(projection, input, rig.mirror.owners(rig.request)).find((one) => one.key === key)
	assert.ok(topic !== undefined, key)
	return { sources: collectTopicSources(projection, input, topic, mapDays(rig)), title: topic.title }
}

function listKeys(rig: Rig): readonly string[] {
	const input = rig.mirror.input()
	return collectTopics(rig.mirror.projection(input), input, rig.mirror.owners(rig.request)).map((topic) => topic.key)
}

function buildAgreeRow(rig: Rig, key: string, prose: string, agree: number): CacheRow {
	return buildRow(buildAgreeState({ prose }, readSources(rig, key).sources), AGREE_QUESTION, buildNoul(agree))
}

function buildAgreeRows(rig: Rig, summaries: Readonly<Record<string, string>>, plan: Plan): readonly CacheRow[] {
	return listKeys(rig)
		.filter((key) => !(plan.skip ?? []).includes(key))
		.map((key) => buildAgreeRow(rig, key, summaries[key] ?? '', plan.agree ?? AGREED))
}

type Kind = 'first' | 'correct' | 'news'

interface Plan {
	readonly kind: Kind
	readonly summaries?: Readonly<Record<string, string>>
	readonly skip?: readonly string[]
	readonly change?: number
	readonly agree?: number
}

// Replays the plan on a scratch rig and returns the CHANGE and AGREE rows that the run asks, computed from the states the run reads.
async function computeRows(plan: Plan): Promise<readonly CacheRow[]> {
	const classify = join(directory, `classify-${(files += 1)}.jsonl`)
	writeRows(classify, classifyRows())
	const rig = await createRig(classify)
	const summaries = { ...SUMMARIES, ...plan.summaries }
	const rows = [...buildAgreeRows(rig, summaries, plan)]
	const contacts = readSources(rig, 'contacts')
	if (plan.kind === 'correct') {
		await rig.advance(CORRECTION)
		rows.push(buildAgreeRow(rig, 'refunds', REFUNDS_AFTER, plan.agree ?? AGREED))
	}
	if (plan.kind === 'news') {
		const news = await rig.advance(NEWS)
		const lines = readSources(rig, 'contacts').sources.filter((source) => source.id === news.id)
		const version = { title: contacts.title, asOf: findDay(rig.days, LAST)?.date ?? '', prose: summaries['contacts'] ?? '' }
		rows.push(buildRow(buildChangeState(version, lines), buildChangeQuestion(version.title), buildNoul(plan.change ?? 0)))
		if ((plan.change ?? 0) >= FITS.change) rows.push(buildAgreeRow(rig, 'contacts', CONTACTS_AFTER, plan.agree ?? AGREED))
	}
	return rows
}

// Holds the corpus rows, the first request's topic rows, and the rows of the messages that the tests add later.
function classifyRows(): readonly CacheRow[] {
	const scenario = readJSON(SCENARIO_LONG)
	const seed = readSeed(scenario)
	const request = readText(readList(scenario, 'goals')[0], 'request')
	const state = renderMessageState({ role: 'user', content: request })
	const marcus = seed[MARCUS]
	assert.ok(marcus !== undefined)
	const later = { role: 'user', content: CORRECTION }
	return [
		...importCorpus(readRows(CORPUS), seed, readTopics(), MICA_MODEL),
		...readTopics()
			.filter((topic) => topic.requested)
			.map((topic) => buildRow(state, buildTopicQuestion(topic, LEDGER_QUESTIONS), buildNoul(['refunds', 'returns'].includes(topic.name) ? 0.95 : 0.04))),
		...buildMessageRows(CORRECTION, 'correction', 'refunds'),
		buildRow(renderPairState(marcus, later), LEDGER_QUESTIONS.amends, buildNoul(0.95)),
		buildRow(renderPairState(marcus, later), LEDGER_QUESTIONS.supersedes, buildNoul(0.99)),
		...buildMessageRows(NEWS, 'fact', 'contacts'),
	]
}

interface Run {
	readonly rig: Rig
	readonly aggregator: Aggregator
	readonly judge: JudgeCache
	readonly fixture: Fixture
	readonly path: string
	readonly settings: { allowance: number; readonly retry: number; readonly predict: number }
	maintain(goal: string, lastSeed: number): Promise<void>
	rows(): readonly AggregateRow[]
	summarizing(): readonly unknown[]
}

// Starts the fixture with the plan's summaries, builds the rig, and writes the judge rows before the aggregator reads them.
async function createRun(plan: Plan, retry = 1, fit: Fit = FITS): Promise<Run> {
	const computed = await computeRows(plan)
	const summaries = { ...SUMMARIES, ...plan.summaries }
	const longest: Record<string, string> = {}
	for (const [key, prose] of Object.entries(summaries)) {
		longest[`about ${key === OWNER ? 'Luis Ferreira (account LH-44870)' : key} as of`] = prose
	}
	if (plan.kind === 'correct') longest[CORRECTION] = REFUNDS_AFTER
	if (plan.kind === 'news') longest[NEWS] = CONTACTS_AFTER
	const fixture = await startFixture({ prefix: SUMMARY_PREFIX, summaries: longest })
	files += 1
	const classify = join(directory, `classify-${files}.jsonl`)
	writeRows(classify, classifyRows())
	const judgePath = join(directory, `judge-${files}.jsonl`)
	writeRows(judgePath, classifyRows())
	appendFileSync(judgePath, computed.map((row) => `${JSON.stringify(row)}\n`).join(''))
	const rig = await createRig(classify)
	const inert: JudgeInterface = {
		id: 'inert',
		name: 'inert judge',
		model: MICA_MODEL,
		ask(request) {
			return Promise.reject(new Error(`the inert judge was asked: ${JSON.stringify(request.questions)}`))
		},
	}
	const judge = new JudgeCache({ judge: inert, path: judgePath, live: false, retry: 0 })
	const provider = createOllama({ url: fixture.url, model: MODELS.q2, options: { ...SAMPLER, num_predict: PREDICT } })
	const summarizer = new Summarizer({
		provider,
		model: MODELS.q2,
		sampler: SAMPLER,
		predict: PREDICT,
		cache: join(directory, `summary-${files}.jsonl`),
		live: true,
	})
	const settings = { allowance: 100000, retry, predict: PREDICT }
	const path = join(directory, `aggregates-${files}.jsonl`)
	const logged: string[] = []
	const aggregator = new Aggregator({
		mirror: rig.mirror,
		summarizer,
		judge,
		fit,
		settings,
		days: rig.days,
		seeds: rig.seeds,
		path,
		log: (line) => logged.push(line),
	})
	return {
		rig,
		aggregator,
		judge,
		fixture,
		path,
		settings,
		async maintain(goal, lastSeed) {
			await aggregator.maintain(rig.request, goal, lastSeed, AbortSignal.timeout(60000))
			assert.deepEqual(logged, [])
		},
		rows: () => readAggregates(path),
		summarizing: () =>
			fixture.requests.filter((body) => {
				const first = readList(body, 'messages')[0]
				return readField(first, 'role') === 'system' && readText(first, 'content').startsWith(SUMMARY_PREFIX)
			}),
	}
}

function pick(rows: readonly AggregateRow[], event: AggregateRow['event'], topic?: string): readonly AggregateRow[] {
	return rows.filter((row) => row.event === event && (topic === undefined || row.topic === topic))
}

function select(run: Run, shown: string): Selection {
	return {
		messages: [run.rig.request],
		judgments: [],
		briefing: shown,
	}
}

describe('aggregate helpers', () => {
	const first: AggregateSource = { id: 'a', sentence: 0, role: 'user', text: 'Refunds over $200 need approval code MX-4486.', day: '2026-10-08' }
	const second: AggregateSource = {
		id: 'b',
		sentence: 0,
		role: 'tool',
		text: 'lookup_order {"id":"LH-79215"}: Order LH-79215 for account LH-44870 (Luis Ferreira): total $289.00.',
		day: '2026-10-09',
	}
	const sources: readonly AggregateSource[] = [first, second]

	it('names the summarizer prefix and fills its slots in one pass', () => {
		assert.ok(SUMMARY_SYSTEM.startsWith(SUMMARY_PREFIX))
		assert.equal(SUMMARY_PREFIX, "You maintain a short summary of what a support desk's messages establish about ")
		assert.equal(
			fillSlots(SUMMARY_SYSTEM, 'a DATE and a TOPIC', '2026-10-08'),
			"You maintain a short summary of what a support desk's messages establish about a DATE and a TOPIC as of 2026-10-08. A later message replaces what an earlier message said. Copy every id, amount, date, and name exactly as the messages write it. Write only the summary, in at most three sentences.",
		)
	})

	it('words the questions and the instructions as the proposal does', () => {
		assert.deepEqual(CHANGE_QUESTION, {
			form: 'noul',
			instructions: 'Does the event change what the summary states about TOPIC?',
			criteria: {
				true: 'The event adds, replaces, or withdraws something the summary states or must state',
				false: 'The event repeats the summary or does not bear on it',
			},
		})
		assert.deepEqual(buildChangeQuestion('refunds'), {
			form: 'noul',
			instructions: 'Does the event change what the summary states about refunds?',
			criteria: CHANGE_QUESTION.criteria,
		})
		assert.deepEqual(AGREE_QUESTION, {
			form: 'noul',
			instructions: 'Does the summary agree with its source messages?',
			criteria: {
				true: 'Every statement in the summary matches the source messages, a later message replacing an earlier one',
				false: 'The summary states something the source messages contradict, replace, or do not state',
			},
		})
		assert.equal(SUMMARIES_HEADING, '### Topic summaries')
		assert.deepEqual([INSTRUCTION_DATE.name, INSTRUCTION_SUMMARIES.name], ['date', 'summaries'])
		assert.ok(INSTRUCTION_DATE.priority > INSTRUCTION_SUMMARIES.priority)
	})

	it('builds the summary prompt, the CHANGE state, and the AGREE state as the proposal words them', () => {
		const prompt = buildSummaryPrompt('refunds', 'refunds', '2026-10-09', sources)
		assert.deepEqual(
			prompt.map((message) => message.role),
			['system', 'user'],
		)
		assert.ok(prompt[0]?.content.includes('about refunds as of 2026-10-09.'))
		assert.equal(
			prompt[1]?.content,
			'(2026-10-08) user: Refunds over $200 need approval code MX-4486.\n(2026-10-09) tool: lookup_order {"id":"LH-79215"}: Order LH-79215 for account LH-44870 (Luis Ferreira): total $289.00.',
		)
		const version = { title: 'refunds', asOf: '2026-10-09', prose: 'Refunds need MX-4486.' }
		assert.equal(
			buildChangeState(version, sources.slice(0, 1)),
			'Summary of refunds as of 2026-10-09: Refunds need MX-4486.\nEvent: user: Refunds over $200 need approval code MX-4486.',
		)
		assert.equal(
			buildAgreeState(version, sources.slice(0, 1)),
			'Refunds need MX-4486.\nSource messages:\n(2026-10-08) user: Refunds over $200 need approval code MX-4486.',
		)
		assert.equal(renderSource(first), '(2026-10-08) user: Refunds over $200 need approval code MX-4486.')
	})

	it('adds a note that names the failed kinds to a retry prompt, so the prompt differs from the first', () => {
		const retry = buildSummaryPrompt('refunds', 'refunds', '2026-10-09', sources, [
			{ kind: 'id', token: 'LH-1' },
			{ kind: 'id', token: 'LH-2' },
			{ kind: 'number', token: '5' },
		])
		const plain = buildSummaryPrompt('refunds', 'refunds', '2026-10-09', sources)
		assert.notEqual(retry[1]?.content, plain[1]?.content)
		assert.ok(retry[1]?.content.startsWith(plain[1]?.content ?? ''))
		assert.ok(retry[1]?.content.includes('failed these checks: id, number.'))
		assert.equal(retry[0]?.content, plain[0]?.content)
	})

	it('reads a letter-and-digit run as an id and a capitalized word in any position as a name candidate', () => {
		const tokens = readTokens('WKND15 applies. Adeyemi signs off on LH-44870 for 2pm, $1,240.00.')
		assert.deepEqual([...tokens.ids].sort(), ['2PM', 'LH-44870', 'WKND15'])
		assert.deepEqual([...tokens.numbers].sort((left, right) => left - right), [2, 1240])
		assert.deepEqual([...tokens.names], ['adeyemi'])
		assert.ok(!tokens.names.has('lh'))
		assert.ok(tokens.words.has('signs'))
	})

	it('counts a scored code and a sentence-initial name that only the summary carries as sole tokens', () => {
		const shown = 'Dana asked about the weekend coupon. Use LH-44870 on the order.'
		assert.equal(countSoleTokens('WKND15 applies.', shown), 1)
		assert.equal(countSoleTokens('Adeyemi signs off today.', shown), 1)
		assert.equal(countSoleTokens('WKND15 applies. Adeyemi signs off today.', shown), 2)
		assert.equal(countSoleTokens('Dana asked about the weekend coupon for LH-44870.', shown), 0)
		assert.equal(countSoleTokens('The coupon is worth 15 dollars.', shown), 1)
		assert.equal(countSoleTokens('The coupon is worth 15 dollars.', `${shown} It saves 15 dollars.`), 0)
	})

	it('drops the sentences whose tokens the shown text lacks and keeps the ids it shows', () => {
		const shown = 'Marcus approved refund MX-4486 for $200. Dana asked.'
		const filtered = filterProse(
			'Marcus approved MX-4486 for $200. Adeyemi signs off today. Use WKND15 now.',
			['MX-4486', 'MX-4471'],
			shown,
		)
		assert.equal(filtered.prose, 'Marcus approved MX-4486 for $200.')
		assert.deepEqual(filtered.dropped, ['Adeyemi signs off today.', 'Use WKND15 now.'])
		assert.deepEqual(filtered.ids, ['MX-4486'])
		assert.deepEqual(filterProse('Nothing here.', [], 'Other words.').prose, '')
	})

	it('fails a summary by kind: empty, id, number, name, and stale', () => {
		const known = ['(2026-10-08) user: Refunds over $200 need approval code MX-4486 from Marcus Oyelaran.', 'refunds', '2026-10-09']
		const owners = ['Luis Ferreira']
		assert.deepEqual(checkProse('  ', known, owners, []), [{ kind: 'empty', token: '' }])
		assert.deepEqual(checkProse('Refunds over $200 need MX-4486 from Marcus Oyelaran and Luis Ferreira.', known, owners, []), [])
		assert.deepEqual(checkProse('Refunds need MX-4468.', known, owners, []), [{ kind: 'id', token: 'MX-4468' }])
		assert.deepEqual(checkProse('Refunds over $250 need approval.', known, owners, []), [{ kind: 'number', token: '250' }])
		assert.deepEqual(checkProse('Refunds are signed by Marcus Okafor today.', known, owners, []), [{ kind: 'name', token: 'okafor' }])
		assert.deepEqual(checkProse('Refunds over $200 need MX-4486 and $300.', known, owners, ['300', 'MX-4471']), [
			{ kind: 'number', token: '300' },
			{ kind: 'stale', token: '300' },
		])
		assert.deepEqual(checkProse('Refunds use WKND15 and the code 2pm.', known, owners, []), [
			{ kind: 'id', token: 'WKND15' },
			{ kind: 'id', token: '2PM' },
			{ kind: 'number', token: '2' },
		])
	})

	it('collects the stale tokens that no current source carries', () => {
		const stale = collectStaleTokens(
			['Use MX-4486 from now on; MX-4471 is dead and the fee was 245.65.'],
			['ESC-2291', 'MX-4486'],
			['Correction: use MX-4490, not MX-4486.', 'The fee is 15 dollars.'],
		)
		assert.deepEqual([...stale].sort(), ['245.65', 'ESC-2291', 'MX-4471'].sort())
	})

	it('compares built sources with current sources by message, sentence, and text', () => {
		const current: readonly AggregateSource[] = [
			first,
			{ id: 'c', sentence: 0, role: 'user', text: 'A new line.', day: '2026-10-09' },
			{ id: 'c', sentence: 1, role: 'user', text: 'Another new line.', day: '2026-10-09' },
		]
		const compared = compareSources(sources, current)
		assert.deepEqual(compared.removed.map((source) => source.id), ['b'])
		assert.deepEqual(compared.arrived, ['c'])
		const edited = compareSources(sources, [{ ...first, text: 'Changed.' }, second])
		assert.deepEqual(edited.removed.map((source) => source.id), ['a'])
		assert.deepEqual(edited.arrived, [])
	})

	it('puts the tool name and arguments before a tool line and nothing before another line', () => {
		const line: MirrorLine = { text: 'Order LH-79215 ships.', source: 'm1', sentence: 1, topics: [], role: 'tool' }
		const reading = { id: 'm1', name: 'lookup_order', arguments: { id: 'LH-79215' }, text: '', result: undefined }
		assert.equal(buildSource(line, [reading], '2026-10-08').text, 'lookup_order {"id":"LH-79215"}: Order LH-79215 ships.')
		assert.equal(buildSource({ ...line, role: 'user' }, [reading], '2026-10-08').text, 'Order LH-79215 ships.')
		assert.equal(buildSource(line, [], '2026-10-08').text, 'Order LH-79215 ships.')
	})

	it('cuts whole entries from the end until the block price fits the allowance', () => {
		const entries = ['alpha', 'bravo', 'charlie'].map((key) => ({ key, title: key, date: '2026-10-08', ids: ['AB-12'], prose: `${key} prose.` }))
		const price = (text: string): number => text.length
		const all = renderSummaries(entries, 10000, price)
		assert.deepEqual(all.kept.map((entry) => entry.key), ['alpha', 'bravo', 'charlie'])
		assert.deepEqual(all.cut, [])
		assert.ok(all.text.startsWith(`${SUMMARIES_HEADING}\n\n#### alpha, as of 2026-10-08\nIds: AB-12\nalpha prose.`))
		const fewer = renderSummaries(entries, all.tokens - 1, price)
		assert.deepEqual(fewer.kept.map((entry) => entry.key), ['alpha', 'bravo'])
		assert.deepEqual(fewer.cut.map((entry) => entry.key), ['charlie'])
		assert.ok(fewer.tokens <= all.tokens - 1)
		const none = renderSummaries(entries, 1, price)
		assert.deepEqual([none.text, none.kept, none.tokens], ['', [], 0])
		assert.deepEqual(none.cut.map((entry) => entry.key), ['alpha', 'bravo', 'charlie'])
		assert.ok(!renderSummaries([{ key: 'alpha', title: 'alpha', date: '2026-10-08', ids: [], prose: 'alpha prose.' }], 10000, price).text.includes('Ids:'))
	})
})

describe('Aggregator', () => {
	const fixtures: Fixture[] = []

	before(() => {
		globalThis.fetch = guardFetch
	})

	after(async () => {
		for (const fixture of fixtures) await fixture.close()
		globalThis.fetch = original
		rmSync(directory, { recursive: true, force: true })
		assert.deepEqual(daemon, [])
	})

	async function start(plan: Plan, retry = 1, fit: Fit = FITS): Promise<Run> {
		const run = await createRun(plan, retry, fit)
		fixtures.push(run.fixture)
		return run
	}

	describe('first build', () => {
		it('builds every desk topic and the request owner that have sources', async () => {
			const run = await start({ kind: 'first' })
			assert.deepEqual([...listKeys(run.rig)].sort(), [...DESK, OWNER].sort())
			await run.maintain('g01', LAST)
			const rows = run.rows()
			const builds = pick(rows, 'build')
			assert.deepEqual(builds.map((row) => row.topic).sort(), [...DESK, OWNER].sort())
			for (const row of builds) {
				assert.equal(row.status, 'current', row.topic)
				assert.equal(row.version, 1, row.topic)
				assert.equal(row.trigger, 'first', row.topic)
				assert.deepEqual(row.failures, [], row.topic)
				assert.equal(row.cached, false, row.topic)
				assert.equal(row.prose, SUMMARIES[row.topic], row.topic)
				assert.equal(row.goal, 'g01')
				assert.equal(row.lastSeed, LAST)
				assert.ok(row.sources.length > 0, row.topic)
				assert.ok(row.sources.every((source) => source.seed !== undefined && source.seed < SEEDED), row.topic)
			}
			assert.equal(builds.find((row) => row.topic === OWNER)?.title, 'Luis Ferreira (account LH-44870)')
			assert.match(builds.find((row) => row.topic === 'refunds')?.ids ?? '', /MX-4486/)
		})

		it('maintains only the owners that the request names, and asks AGREE once per build and CHANGE never', async () => {
			const run = await start({ kind: 'first' })
			await run.maintain('g01', LAST)
			assert.ok(run.rig.mirror.input().owners.size > 1)
			const rows = run.rows()
			assert.deepEqual(rows.filter((row) => row.topic.startsWith('owner:') && row.topic !== OWNER), [])
			const agrees = pick(rows, 'agree')
			assert.equal(agrees.length, DESK.length + 1)
			for (const row of agrees) {
				assert.equal(row.answers['agree'], AGREED)
				assert.equal(row.cached, true)
				assert.equal(row.status, 'current')
			}
			assert.deepEqual(pick(rows, 'change'), [])
			assert.deepEqual(run.judge.stats(), { hits: { agree: DESK.length + 1 }, misses: {}, transient: 0 })
			assert.deepEqual(run.rig.asked, [])
		})

		it('keeps every version when nothing changed, and asks nothing on a second read point', async () => {
			const run = await start({ kind: 'first' })
			await run.maintain('g01', LAST)
			const count = run.rows().length
			const requests = run.fixture.requests.length
			const stats = run.judge.stats()
			await run.maintain('g02', LAST)
			assert.equal(run.rows().length, count)
			assert.equal(run.fixture.requests.length, requests)
			assert.deepEqual(run.judge.stats(), stats)
		})

		it('keeps the request out of every summarizer prompt', async () => {
			const run = await start({ kind: 'first' })
			await run.maintain('g01', LAST)
			const prompts = run.summarizing()
			assert.equal(prompts.length, DESK.length + 1)
			for (const body of prompts) assert.ok(!JSON.stringify(body).includes(run.rig.request.content))
			assert.equal(run.fixture.requests.length, prompts.length)
		})
	})

	describe('rebuild on a removed source line', () => {
		it('rebuilds a topic whose source an amends and supersedes pair removed, and asks no CHANGE', async () => {
			const run = await start({ kind: 'correct' })
			await run.maintain('g01', LAST)
			const stats = run.judge.stats()
			const correction = await run.rig.advance(CORRECTION)
			const marcus = [...run.rig.seeds].find(([, index]) => index === MARCUS)?.[0]
			assert.ok(marcus !== undefined)
			assert.ok(run.rig.mirror.input().classification.superseded.get(marcus)?.includes(correction.id))
			await run.maintain('g02', SEEDED)
			assert.deepEqual(run.judge.stats().hits['change'] ?? 0, stats.hits['change'] ?? 0)
			assert.deepEqual(run.judge.stats().misses, {})
			const rows = run.rows()
			assert.deepEqual(pick(rows, 'change'), [])
			const rebuilt = pick(rows, 'build').filter((row) => row.version > 1)
			assert.deepEqual(rebuilt.map((row) => [row.topic, row.version, row.trigger, row.status]), [['refunds', 2, 'removed', 'current']])
			const [second] = rebuilt
			assert.equal(second?.prose, REFUNDS_AFTER)
			assert.ok(second?.sources.some((source) => source.seed === SEEDED))
			assert.ok(!second?.sources.some((source) => source.seed === MARCUS))
			assert.equal(pick(rows, 'agree', 'refunds').length, 2)
		})

		it('keeps the earlier version in the log beside the rebuilt one', async () => {
			const run = await start({ kind: 'correct' })
			await run.maintain('g01', LAST)
			await run.rig.advance(CORRECTION)
			await run.maintain('g02', SEEDED)
			const versions = pick(run.rows(), 'build', 'refunds')
			assert.deepEqual(versions.map((row) => row.version), [1, 2])
			assert.equal(versions[0]?.prose, SUMMARIES['refunds'])
			assert.match(versions[0]?.ids ?? '', /MX-4471/)
			assert.equal(versions[1]?.prose, REFUNDS_AFTER)
			assert.doesNotMatch(versions[1]?.prose ?? '', /MX-4471/)
		})
	})

	describe('CHANGE on an arriving message', () => {
		it('keeps the version when CHANGE reads no, asks no AGREE, and does not ask the message again', async () => {
			const run = await start({ kind: 'news', change: 0.1 })
			await run.maintain('g01', LAST)
			const requests = run.summarizing().length
			const agrees = run.judge.stats().hits['agree']
			await run.rig.advance(NEWS)
			await run.maintain('g02', SEEDED)
			const changes = pick(run.rows(), 'change')
			assert.deepEqual(changes.map((row) => [row.topic, row.version, row.answers['change'], row.cached]), [['contacts', 1, 0.1, true]])
			assert.deepEqual(changes[0]?.sources.map((source) => source.seed), [SEEDED])
			assert.equal(run.summarizing().length, requests)
			assert.equal(run.judge.stats().hits['agree'], agrees)
			assert.deepEqual(pick(run.rows(), 'build').filter((row) => row.version > 1), [])
			await run.maintain('g03', SEEDED)
			assert.equal(pick(run.rows(), 'change').length, 1)
			assert.equal(run.judge.stats().hits['change'], 1)
		})

		it('rebuilds the version when CHANGE reaches the cutoff, then checks the new build with AGREE', async () => {
			const run = await start({ kind: 'news', change: 0.9 })
			await run.maintain('g01', LAST)
			await run.rig.advance(NEWS)
			await run.maintain('g02', SEEDED)
			const rows = run.rows()
			assert.deepEqual(pick(rows, 'change').map((row) => [row.topic, row.answers['change']]), [['contacts', 0.9]])
			const rebuilt = pick(rows, 'build').filter((row) => row.version > 1)
			assert.deepEqual(rebuilt.map((row) => [row.topic, row.version, row.trigger, row.status]), [['contacts', 2, 'change', 'current']])
			assert.equal(rebuilt[0]?.prose, CONTACTS_AFTER)
			assert.deepEqual(pick(rows, 'agree', 'contacts').map((row) => row.version), [1, 2])
			assert.deepEqual(run.judge.stats().misses, {})
		})
	})

	describe('consistency failure', () => {
		it('marks a mistyped id stale, retries with a different prompt, and withholds the topic after the retry bound', async () => {
			const run = await start({ kind: 'first', summaries: { returns: MISTYPED }, skip: ['returns'] })
			await run.maintain('g01', LAST)
			const rows = run.rows()
			const builds = pick(rows, 'build', 'returns')
			assert.deepEqual(builds.map((row) => [row.version, row.status, row.trigger]), [[1, 'stale', 'first'], [2, 'stale', 'retry']])
			for (const row of builds) assert.deepEqual(row.failures, [{ kind: 'id', token: 'LH-79251' }])
			assert.deepEqual(pick(rows, 'agree', 'returns'), [])
			assert.deepEqual(pick(rows, 'withhold', 'returns').map((row) => [row.version, row.status]), [[2, 'withheld']])
			const prompts = run.summarizing().filter((body) => JSON.stringify(body).includes('about returns as of'))
			assert.equal(prompts.length, 2)
			assert.ok(JSON.stringify(prompts[1]).includes('failed these checks: id.'))
			assert.ok(!JSON.stringify(prompts[0]).includes('failed these checks'))
			assert.deepEqual(pick(rows, 'build').filter((row) => row.topic !== 'returns').map((row) => row.status), Array(DESK.length).fill('current'))
		})

		it('fails a build that AGREE reads below the cutoff when the cutoff separates, and withholds the topic', async () => {
			const run = await start({ kind: 'first', agree: 0.1 }, 0)
			await run.maintain('g01', LAST)
			const rows = run.rows()
			for (const row of pick(rows, 'build')) {
				assert.equal(row.status, 'stale', row.topic)
				assert.deepEqual(row.failures, [{ kind: 'agree', token: '' }], row.topic)
			}
			assert.equal(pick(rows, 'withhold').length, DESK.length + 1)
			assert.deepEqual(pick(rows, 'agree').map((row) => row.status), Array(DESK.length + 1).fill('stale'))
			const rendered = run.aggregator.render(select(run, 'Luis Ferreira LH-44870'), run.rig.request, run.rig.system, '', 1)
			assert.deepEqual(rendered.topics, [])
			assert.deepEqual(rendered.withheld, [OWNER, 'refunds', 'returns'])
		})

		it('only logs a low AGREE answer when the cutoff does not separate', async () => {
			const run = await start({ kind: 'first', agree: 0.1 }, 0, { ...FITS, separated: false })
			await run.maintain('g01', LAST)
			const rows = run.rows()
			for (const row of pick(rows, 'build')) {
				assert.equal(row.status, 'current', row.topic)
				assert.deepEqual(row.failures, [], row.topic)
				assert.equal(row.answers['agree'], 0.1, row.topic)
			}
			assert.deepEqual(pick(rows, 'withhold'), [])
		})

		it('withholds at once when the retry bound is zero, and builds the topic again at the next read point', async () => {
			const run = await start({ kind: 'first', summaries: { returns: MISTYPED }, skip: ['returns'] }, 0)
			await run.maintain('g01', LAST)
			assert.equal(pick(run.rows(), 'build', 'returns').length, 1)
			await run.maintain('g02', LAST)
			const builds = pick(run.rows(), 'build', 'returns')
			assert.deepEqual(builds.map((row) => [row.version, row.trigger]), [[1, 'first'], [2, 'first']])
		})
	})

	describe('render', () => {
		async function prepare(): Promise<{ run: Run; shown: string }> {
			const run = await start({ kind: 'first' })
			await run.maintain('g01', LAST)
			const lines = ['refunds', 'returns', OWNER].flatMap((key) => readSources(run.rig, key).sources)
			// The briefing shows the user lines of the topics and owner, and omits the lookup result with its amount.
			const shown = [...new Set(lines.filter((source) => source.role === 'user').map((source) => source.text))].join('\n')
			return { run, shown }
		}

		it('orders the request owners before its desk topics and renders the heading, ids, and prose', async () => {
			const { run, shown } = await prepare()
			const rendered = run.aggregator.render(select(run, shown), run.rig.request, run.rig.system, 'Today is Thursday 2026-10-08.', 1)
			assert.deepEqual(rendered.topics, [OWNER, 'refunds', 'returns'])
			assert.deepEqual([rendered.cut, rendered.withheld, rendered.emptied], [[], [], []])
			assert.ok(rendered.text.startsWith(`${SUMMARIES_HEADING}\n\n#### Luis Ferreira (account LH-44870), as of 2026-10-08\nIds: `))
			assert.ok(rendered.text.indexOf('#### Luis Ferreira') < rendered.text.indexOf('#### refunds, as of 2026-10-08'))
			assert.ok(rendered.text.indexOf('#### refunds') < rendered.text.indexOf('#### returns'))
			assert.ok(rendered.text.includes(REFUNDS.join(' ')))
			assert.ok(rendered.text.includes(RETURNS.join(' ')))
			assert.ok(rendered.tokens > 0)
		})

		it('drops a sentence whose amount the selection lacks, keeps the others, and reads no sole token', async () => {
			const { run, shown } = await prepare()
			const rendered = run.aggregator.render(select(run, shown), run.rig.request, run.rig.system, 'Today is Thursday 2026-10-08.', 1)
			assert.deepEqual(rendered.filtered, [{ topic: OWNER, sentence: OWNER_PROSE[1] }])
			assert.ok(rendered.text.includes(OWNER_PROSE[0] ?? ''))
			assert.ok(!rendered.text.includes('289'))
			assert.ok(!rendered.text.includes('2026-10-21'))
			assert.match(rendered.text, /Ids: LH-44870, LH-79215\n/)
			assert.equal(rendered.sole, 0)
			const withAmount = run.aggregator.render(select(run, `${shown}\nThe tool says $289.00 until 2026-10-21.`), run.rig.request, run.rig.system, 'Today is Thursday 2026-10-08.', 1)
			assert.deepEqual(withAmount.filtered, [])
			assert.ok(withAmount.text.includes(OWNER_PROSE.join(' ')))
			assert.equal(withAmount.sole, 0)
		})

		it('renders nothing for a topic whose title or prose the selection cannot carry', async () => {
			const { run } = await prepare()
			const bare = run.aggregator.render(select(run, ''), run.rig.request, '', '', 1)
			assert.equal(bare.text, '')
			assert.deepEqual(bare.topics, [])
			assert.ok(bare.emptied.includes(OWNER))
			assert.ok(bare.emptied.includes('refunds'))
			assert.equal(bare.sole, 0)
		})

		it('withholds the title with the prose, so a title never carries an id or a name that the selection lacks', async () => {
			const { run } = await prepare()
			const shown = OWNER_PROSE[1] ?? ''
			const rendered = run.aggregator.render(select(run, shown), run.rig.request, '', '', 1)
			assert.ok(rendered.emptied.includes(OWNER))
			assert.ok(!rendered.text.includes('LH-44870'))
			assert.ok(!rendered.text.includes('Luis Ferreira (account'))
			assert.equal(rendered.sole, 0)
		})

		it('cuts whole topics from the end to fit the allowance at the supplied scale', async () => {
			const { run, shown } = await prepare()
			const selection = select(run, shown)
			const full = run.aggregator.render(selection, run.rig.request, run.rig.system, '', 1)
			const doubled = run.aggregator.render(selection, run.rig.request, run.rig.system, '', 2)
			assert.ok(Math.abs(doubled.tokens - full.tokens * 2) < 1e-9)
			run.settings.allowance = full.tokens - 0.5
			const fewer = run.aggregator.render(selection, run.rig.request, run.rig.system, '', 1)
			assert.deepEqual(fewer.topics, [OWNER, 'refunds'])
			assert.deepEqual(fewer.cut, ['returns'])
			assert.ok(fewer.tokens <= full.tokens - 0.5)
			assert.ok(!fewer.text.includes('#### returns'))
			run.settings.allowance = 0
			const none = run.aggregator.render(selection, run.rig.request, run.rig.system, '', 1)
			assert.deepEqual([none.text, none.topics, none.cut], ['', [], [OWNER, 'refunds', 'returns']])
		})

		it('lists a withheld topic that the request names and renders its siblings', async () => {
			const run = await start({ kind: 'first', summaries: { returns: MISTYPED }, skip: ['returns'] })
			await run.maintain('g01', LAST)
			const rendered = run.aggregator.render(select(run, 'Luis Ferreira LH-44870 refunds'), run.rig.request, run.rig.system, '', 1)
			assert.deepEqual(rendered.withheld, ['returns'])
			assert.ok(!rendered.topics.includes('returns'))
		})
	})
})
