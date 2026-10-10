import type { JudgeAnswer, JudgeInterface, JudgeQuestion, JudgeRequest, Refusal } from '@orkestrel/agent'
import type { TokenUsage } from '@orkestrel/budget'

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

export interface CallRecord {
	readonly sequence: number
	readonly role: CallRole
	readonly goal: string | undefined
	readonly started: number
	readonly wall: number
	readonly status: number | undefined
	readonly error?: string
}

export interface SelectionRecord {
	readonly goal: string
	readonly sequence: number
	readonly briefing: string
	readonly digest: string
	/** Holds the tail as seed index, role, and content, because message ids differ between runs. */
	readonly tail: readonly TailMessage[]
	readonly instructions: Readonly<Record<string, string>>
	readonly scale: number
}

export interface TailMessage {
	readonly index: number
	readonly role: string
	readonly content: string
}

export interface QuestionCount {
	readonly fresh: number
	readonly hits: number
}

export interface BriefingReading {
	readonly tokens: number
	readonly facts: number
	readonly stale: number
	readonly digest: string
}

/** Holds one goal's outcome and measurements in a run's `rows.jsonl`. */
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
	readonly faults: number
	readonly wall: number
	/** Holds the wall of the aggregate stage, apart from the agent's. */
	readonly stage: number
	readonly first: number
	readonly last: number
	readonly prompt: number
	readonly overflow: boolean
	readonly recalls: { readonly calls: number; readonly closed: number }
	readonly lookups: { readonly calls: number; readonly repeats: number }
	readonly questions: Readonly<Record<string, QuestionCount>>
	readonly briefing: BriefingReading
	/** Holds `ledger.gauge.scale` before the goal's `respond`. */
	readonly scale: number
	readonly tail: string
	readonly rendered: readonly string[]
	readonly cut: readonly string[]
	readonly withheld: readonly string[]
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
	readonly role: string
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
		readonly instructions?: string
		readonly criteria: Readonly<Record<string, string>>
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
