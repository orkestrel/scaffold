import type { TokenUsage } from '@orkestrel/budget'
// The vendored build is the one import of the agent in bench5; repoint this path when a later build is vendored.
import type {
	AgentInterface,
	ClassifierInterface,
	ConversationInterface,
	JudgeAnswer,
	JudgeEntry,
	JudgeInterface,
	JudgeQuestion,
	JudgeRequest,
	LedgerInterface,
	LedgerLine,
	LedgerLookupReading,
	LedgerProjection,
	LedgerProjectionInput,
	LedgerQuestion,
	LedgerThreshold,
	LedgerTopic,
	Message,
	MessageRole,
	ProviderInterface,
	Refusal,
} from '../vendor/agent-0.0.30/index.js'
import type { Aggregator } from './aggregates/Aggregator.ts'
import type { JudgeCache } from './JudgeCache.ts'

export type JudgeState = JudgeRequest['state']

export type CacheOrigin = 'corpus' | 'live'

export type CallRole = 'agent' | 'judge' | 'summarizer' | 'flush'

export type RunArm = 'control' | 'aggregate'

export type ReplyVia = 'none' | 'answered' | 'final'

export type AssignCategory = 'fact' | 'chatter'

/** Holds one judge answer under the content key of its model, state, and question. */
export interface CacheRow {
	readonly key: string
	readonly model: string
	readonly state: JudgeState
	readonly question: JudgeQuestion
	readonly answer?: JudgeAnswer
	readonly refusal?: Refusal
	readonly error?: string
	readonly usage?: TokenUsage
	readonly wall: number
	readonly origin: CacheOrigin
	readonly at: number
}

/** Configures a judge cache over one rows file. */
export interface JudgeCacheOptions {
	readonly judge: JudgeInterface
	readonly path: string
	readonly live: boolean
	/** Holds the number of repeats a live miss gets after a transient error. */
	readonly retry: number
	/** Receives the fault after the retries end, so the owner of the run can abort it. */
	readonly abort?: (fault: Error) => void
}

/** Counts a cache's questions by head, plus the transient judge errors it saw. */
export interface JudgeStats {
	readonly hits: Readonly<Record<string, number>>
	readonly misses: Readonly<Record<string, number>>
	readonly transient: number
}

export interface Settings {
	readonly allowance: number
	readonly retry: number
	readonly predict: number
}

export interface Fit {
	readonly change: number
	readonly agree: number
	readonly separated: boolean
}

export interface PlanEntry {
	readonly name: string
	readonly harness: string
	readonly estimate: number
	readonly args: readonly string[]
}

/** Holds one request that a run sent to the daemon, as one line of `calls.jsonl`. */
export interface CallRecord {
	/** Holds the request's position among the run's requests, which is also the number of its wire files. */
	readonly sequence: number
	readonly role: CallRole
	/** Holds the goal being served, or `undefined` for a calibration call and a seed-pass call. */
	readonly goal: string | undefined
	readonly started: number
	readonly wall: number
	/** Holds the HTTP status, or `undefined` when the request threw before a response. */
	readonly status: number | undefined
	readonly error?: string
}

/** Holds one message of a selection's tail as seed index, role, and content, because message ids differ between runs. */
export interface TailMessage {
	/** Holds the seed index, or `undefined` for a request, a reply, and a tool message the run added. */
	readonly index: number | undefined
	readonly role: string
	readonly content: string
}

/** Holds one `select` event of the agent, as one line of `selections.jsonl`. */
export interface SelectionRecord {
	readonly goal: string
	/** Holds the position of the event among the goal's events: 1 for the first pass, 2 for the answer pass. */
	readonly pass: number
	readonly sequence: number
	readonly briefing: string
	readonly digest: string
	readonly tail: readonly TailMessage[]
	/** Holds the content of each instruction the prompt carries, by name. */
	readonly instructions: Readonly<Record<string, string>>
	readonly scale: number | undefined
}

/** Holds the questions one goal asked of the judge for one head: the answers it asked fresh and the answers its rows held. */
export interface QuestionCount {
	readonly fresh: number
	readonly hits: number
}

/** Holds what the briefing and tail of a goal's first select carry. */
export interface BriefingReading {
	/** Holds the briefing's estimate times the gauge scale. */
	readonly tokens: number
	/** Counts the goal's facts whose live text renders in the briefing or the tail. */
	readonly facts: number
	/** Counts the tokens of the goal's stale sentences that no fact carries, plus the forbidden phrases, that the briefing or the tail shows. */
	readonly stale: number
	readonly digest: string
}

/** Holds the recalls of a goal. */
export interface RecallCount {
	readonly calls: number
	readonly closed: number
	/** Holds the tokens of the first recall result, or `undefined` when no recall returned text. */
	readonly size: number | undefined
	/** Names why recall closed: the limit of recalls, or the room left in the window; `undefined` when it stayed open. */
	readonly cause: 'limit' | 'room' | undefined
}

/** Holds the lookups of a goal. */
export interface LookupCount {
	readonly calls: number
	readonly repeats: number
}

/** Holds one goal's outcome and measurements as one line of a run's `rows.jsonl`. */
export interface Row {
	readonly goal: string
	readonly copy: number
	readonly model: string
	readonly arm: RunArm
	readonly success: boolean
	readonly reply: string
	readonly via: ReplyVia
	readonly missing: readonly string[]
	readonly violations: readonly string[]
	readonly patterns: readonly string[]
	readonly passes: number
	readonly usage: TokenUsage | undefined
	readonly partial: boolean | undefined
	readonly error: string | undefined
	/** Counts the goal's agent requests that threw or answered with a status of 400 or more. */
	readonly faults: number
	/** Holds the agent's wall in milliseconds: the `respond` call less the aggregate stage and the flush. */
	readonly wall: number
	/** Holds the wall of the aggregate stage in milliseconds; 0 in the control arm. */
	readonly stage: number
	/** Holds the wall of the prefix flush in milliseconds. */
	readonly flush: number
	/** Holds the sequence of the goal's first request. */
	readonly first: number
	/** Holds the sequence of the goal's last request. */
	readonly last: number
	/** Holds the largest prompt token count among the goal's agent calls. */
	readonly prompt: number
	/** Holds the prompt token count of the goal's first agent call, or `undefined` when none reported it. */
	readonly entry: number | undefined
	/** Reports a prompt at or over the window, or a context error. */
	readonly overflow: boolean
	readonly recalls: RecallCount
	readonly lookups: LookupCount
	readonly questions: Readonly<Record<string, QuestionCount>>
	readonly briefing: BriefingReading
	/** Holds `ledger.gauge.scale` before the goal's `respond`. */
	readonly scale: number
	/** Holds the digest of the first select's tail as seed index, role, and content. */
	readonly tail: string
	/** Lists the topic keys the summaries block rendered. */
	readonly rendered: readonly string[]
	/** Lists the topic keys the allowance cut from the block. */
	readonly cut: readonly string[]
	/** Lists the topic keys a failed build withheld. */
	readonly withheld: readonly string[]
	/** Lists the topic keys whose prose the render filter emptied. */
	readonly emptied: readonly string[]
	/** Holds the tokens of the rendered summaries block. */
	readonly summary: number
	/** Counts the sentences the render filter dropped. */
	readonly filtered: number
	/** Counts the tokens that only the summaries block carried. */
	readonly sole: number
}

export interface ScenarioDay {
	readonly date: string
	readonly from: number
}

export interface ScenarioLookup {
	readonly tool: string
	readonly id: string
	readonly from: number
	readonly text: string
}

/** Holds the lookup tables a copy carries: the base text per tool and id, and the versions that start at a seed index. */
export interface ScenarioLookups {
	readonly tools: Readonly<Record<string, Readonly<Record<string, string>>>>
	readonly lookups: readonly ScenarioLookup[]
}

export interface ScenarioSystem {
	readonly ledger: { readonly system: string }
}

export interface SeedCall {
	readonly id: string
	readonly name: string
	readonly arguments: Readonly<Record<string, unknown>>
}

export interface SeedMessage {
	readonly role: MessageRole
	readonly content: string
	readonly calls?: readonly SeedCall[]
	readonly call?: string
}

export interface StateMessage {
	readonly role: string
	readonly content: string
}

export interface TopicSpec {
	readonly name: string
	readonly criterion: string
}

export interface QuestionSet {
	readonly category: {
		readonly instructions?: JudgeEntry
		readonly criteria: Readonly<Record<string, JudgeEntry | null>>
	}
	readonly topic: string
	readonly amends: JudgeQuestion
	readonly supersedes: JudgeQuestion
}

export interface LookupOwner {
	readonly id: string
	readonly names: readonly string[]
}

export interface LookupReading {
	readonly ids: readonly string[]
	readonly owners: readonly LookupOwner[]
}

export interface AssignMessage {
	readonly id: string
	readonly role: string
	readonly calls?: readonly unknown[]
}

export interface AssignResult {
	readonly success: boolean
}

/** Holds one row of `data/cal-categories.jsonl` as the importer reads it. */
export interface CorpusRow {
	readonly question: string
	readonly order?: string
	readonly index?: number
	readonly topic?: string
	readonly earlier?: number
	readonly later?: number
	readonly probabilities?: Readonly<Record<string, number>>
	readonly p?: number
	readonly refusal?: unknown
	readonly error?: string
	readonly asked?: string
	readonly ms?: number
}

/** Holds the state and question that a corpus row's judgment was asked under. */
export interface CorpusQuery {
	readonly state: string
	readonly question: JudgeQuestion
}

/** Configures a summarizer over one rows file. */
export interface SummarizerOptions {
	/** Holds the provider that generates the prose; it must send the sampler and `num_predict` that the options carry. */
	readonly provider: ProviderInterface
	readonly model: string
	readonly sampler: Readonly<Record<string, number>>
	/** Holds the generation cap in tokens, `num_predict`. */
	readonly predict: number
	/** Holds the path of the rows file. */
	readonly cache: string
	readonly live: boolean
}

/** Holds one summary under the content key of its model, sampler, cap, and messages. */
export interface SummaryRow {
	readonly key: string
	readonly model: string
	readonly sampler: Readonly<Record<string, number>>
	readonly predict: number
	readonly prose: string
	readonly raw: string
	readonly usage?: TokenUsage
	readonly wall: number
	readonly origin: CacheOrigin
	readonly at: number
}

/** Holds the outcome of one summary call. */
export interface SummaryResult {
	readonly prose: string
	readonly raw: string
	readonly usage: TokenUsage | undefined
	readonly wall: number
	readonly cached: boolean
}

/** Generates aggregate prose from a message list and answers a repeated list from a rows file. */
export interface SummarizerInterface {
	summarize(messages: readonly Message[], signal: AbortSignal): Promise<SummaryResult>
}

/** Reads the ids and owners that one lookup result names. */
export type MirrorRead = (args: Readonly<Record<string, unknown>>, text: string) => LookupReading | undefined

export type MirrorTopic = LedgerTopic

export type MirrorThresholds = LedgerThreshold

export type MirrorFiler = ClassifierInterface

export type MirrorInput = LedgerProjectionInput

export type MirrorProjection = LedgerProjection

export type MirrorLine = LedgerLine

export type MirrorReading = LedgerLookupReading

/** Holds the two members of a ledger that the mirror reads. */
export interface MirrorLedger {
	readonly agent: AgentInterface
	readonly conversation: ConversationInterface
}

/** Configures a mirror with the judge, wording, topics, cutoffs, system text, and lookup readers that the ledger runs with. */
export interface MirrorOptions {
	readonly judge: JudgeInterface
	readonly questions: LedgerQuestion
	readonly topics: readonly MirrorTopic[]
	readonly thresholds: MirrorThresholds
	readonly system: string
	readonly reads: ReadonlyMap<string, MirrorRead>
}

/** Rebuilds the projection input and the filing that the ledger's private projection and plan read. */
export interface MirrorInterface {
	note(request: Message): void
	assign(message: Message): AssignCategory | undefined
	readings(): readonly MirrorReading[]
	input(): MirrorInput
	projection(input?: MirrorInput): MirrorProjection
	lines(id: string, input?: MirrorInput, projection?: MirrorProjection): readonly MirrorLine[]
	near(request: Message): ReadonlySet<string>
	owners(request: Message): readonly string[]
}

/** Answers questions as a judge and counts the questions it answered from its rows. */
export interface JudgeCacheInterface extends JudgeInterface {
	stats(): JudgeStats
}

export type AggregateTrigger = 'first' | 'removed' | 'change' | 'check' | 'retry'

export type AggregateEvent = 'build' | 'agree' | 'change' | 'withhold'

export type AggregateStatus = 'current' | 'stale' | 'withheld'

export type AggregateCheck = 'empty' | 'id' | 'number' | 'name' | 'stale' | 'agree'

/** Holds one failed check of a summary and the token that failed it. */
export interface AggregateFailure {
	readonly kind: AggregateCheck
	readonly token: string
}

/** Holds the tokens of a text: the ids, numbers, name candidates, and words. */
export interface AggregateTokens {
	readonly ids: ReadonlySet<string>
	readonly numbers: ReadonlySet<number>
	readonly names: ReadonlySet<string>
	readonly words: ReadonlySet<string>
}

/** Holds the sentences of a summary that the shown text carries, with the ids that occur there and the sentences dropped. */
export interface AggregateFilter {
	readonly prose: string
	readonly ids: readonly string[]
	readonly dropped: readonly string[]
}

/** Holds one record line that a topic summarizes, with the date of its message. */
export interface AggregateSource {
	readonly id: string
	readonly sentence: number
	readonly role: MessageRole
	readonly text: string
	readonly day: string
}

/** Holds a source's message id, seed index, and sentence index. */
export interface AggregateRef {
	readonly id: string
	readonly seed: number | undefined
	readonly sentence: number
}

/** Holds one summary topic: a desk topic or an owner record. */
export interface AggregateTopic {
	readonly key: string
	readonly title: string
	readonly owner: boolean
}

/** Holds one built summary of a topic. */
export interface AggregateVersion {
	readonly version: number
	readonly title: string
	readonly asOf: string
	readonly prose: string
	readonly raw: string
	readonly ids: readonly string[]
	readonly sources: readonly AggregateSource[]
}

/** Holds one summary as the block renders it. */
export interface AggregateEntry {
	readonly key: string
	readonly title: string
	readonly date: string
	readonly ids: readonly string[]
	readonly prose: string
}

/** Holds the rendered block, the entries it kept and cut, and its price. */
export interface AggregateBlock {
	readonly text: string
	readonly kept: readonly AggregateEntry[]
	readonly cut: readonly AggregateEntry[]
	readonly tokens: number
}

/** Holds a sentence that the render filter dropped from a topic's prose. */
export interface AggregateDrop {
	readonly topic: string
	readonly sentence: string
}

/** Holds the summaries block of a prompt and what the render left out. */
export interface AggregateRendering {
	readonly text: string
	readonly topics: readonly string[]
	readonly cut: readonly string[]
	readonly withheld: readonly string[]
	readonly emptied: readonly string[]
	readonly filtered: readonly AggregateDrop[]
	readonly sole: number
	readonly tokens: number
}

/** Holds the answer, cache status, and wall time of one asked noul question. */
export interface AggregateAsked {
	readonly noul: number
	readonly cached: boolean
	readonly wall: number
}

/** Holds what one maintain pass reads for every topic. */
export interface AggregateContext {
	readonly input: MirrorInput
	readonly projection: MirrorProjection
	readonly goal: string
	readonly lastSeed: number
	readonly asOf: string
	readonly signal: AbortSignal
}

/** Holds one line of the aggregate rows file. */
export interface AggregateRow {
	readonly topic: string
	readonly title: string
	readonly goal: string
	readonly lastSeed: number
	readonly event: AggregateEvent
	readonly version: number
	readonly status: AggregateStatus
	readonly sources: readonly AggregateRef[]
	readonly ids: string | undefined
	readonly prose: string | undefined
	readonly raw: string | undefined
	readonly trigger: AggregateTrigger | undefined
	readonly answers: Readonly<Record<string, number>>
	readonly failures: readonly AggregateFailure[]
	readonly wall: number
	readonly cached: boolean
}

/** Configures an aggregator with its mirror, summarizer, judge, cutoffs, settings, days, seed indices, rows file, and logger. */
export interface AggregatorOptions {
	readonly mirror: MirrorInterface
	readonly summarizer: SummarizerInterface
	readonly judge: JudgeCacheInterface
	readonly fit: Fit
	readonly settings: Settings
	readonly days: readonly ScenarioDay[]
	readonly seeds: ReadonlyMap<string, number>
	readonly path: string
	readonly log: (line: string) => void
}

export type DriverMode = 'run' | 'dry' | 'seed'

/** Holds the flags of one driver invocation after validation, with every path resolved. */
export interface Config {
	readonly mode: DriverMode
	readonly live: boolean
	readonly copy: number
	/** Holds the agent model tag, a `MODELS` value. */
	readonly model: string
	/** Holds the `MODELS` key of the tag, which names the model's entry in the settings file. */
	readonly key: string
	readonly arm: RunArm
	readonly out: string | undefined
	readonly cache: string
	readonly url: string
	/** Lists the goal id prefixes to serve; empty serves every goal. */
	readonly goals: readonly string[]
	readonly fit: string
	readonly settings: string
	readonly allowance: number | undefined
	readonly retry: number | undefined
	readonly predict: number | undefined
}

/** Holds the flags that parsed, or the reason that none did. */
export type ConfigOutcome =
	| { readonly success: true; readonly value: Config }
	| { readonly success: false; readonly error: string }

/** Holds the fields of a goal that the driver reads: the request, the read point, the facts, and the scoring rules. */
export interface CopyGoal {
	readonly id: string
	readonly request: string
	/** Holds the index of the last seed message the goal's request follows. */
	readonly after: number
	readonly facts: readonly number[]
	readonly stale: readonly number[]
	readonly expected: readonly string[]
	readonly expectedAny: readonly string[]
	readonly forbidden: readonly string[]
	readonly forbiddenPatterns: readonly string[]
}

/** Holds the parts of a scenario file that a run reads. */
export interface Copy {
	readonly system: string
	readonly topics: readonly MirrorTopic[]
	readonly days: readonly ScenarioDay[]
	readonly seed: readonly SeedMessage[]
	readonly tables: ScenarioLookups
	readonly goals: readonly CopyGoal[]
}

/** Holds one comparison between a value the driver built and the value it must equal. */
export interface Check {
	readonly name: string
	readonly actual: unknown
	readonly expected: unknown
	readonly equal: boolean
}

/** Holds the parts of one run that the selection wrapper and the goal loop share. */
export interface Rig {
	readonly ledger: LedgerInterface
	readonly mirror: MirrorInterface
	readonly cache: JudgeCache
	readonly aggregator: Aggregator | undefined
	/** Holds the provider that sends the prefix flush. */
	readonly flusher: ProviderInterface
	readonly copy: Copy
	readonly system: string
	/** Maps a message id to its seed index. */
	readonly seeds: Map<string, number>
	/** Aborts the run when the judge cache reports a fault. */
	readonly abort: AbortController
}

/** Counts the questions that no cached answer covered, by head, and splits them by what they ask about. */
export interface Coverage {
	readonly misses: Readonly<Record<string, number>>
	/** Counts the missed questions about seed messages only. */
	readonly seed: number
	/** Counts the missed questions that name a request. */
	readonly requests: number
}

/** Holds what a run reads before it starts: the scenario copy, the settings, the cutoffs, the goals to serve, and the checks between them. */
export interface Preparation {
	readonly copy: Copy
	readonly settings: Settings
	readonly fit: Fit
	readonly goals: readonly CopyGoal[]
	readonly checks: readonly Check[]
}

/** Holds the outcome of scoring one reply against a goal's rules. */
export interface Score {
	readonly clean: boolean
	readonly missing: readonly string[]
	readonly violations: readonly string[]
	readonly patterns: readonly string[]
}
