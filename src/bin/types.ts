import type { Audit, CatalogEntry, Environment, Plan } from '@src/core'
import type { MaterializeResult } from '@src/server'

/** The command-line interface's closed command vocabulary. */
export type Verb = 'new' | 'pull' | 'audit' | 'repair' | 'fleet' | 'catalog'

/** The executable command-line boundary. */
export interface CLIInterface {
	run(argv: readonly string[]): Promise<void>
}

/** Parsed values shared by every command runner. */
export interface CLIValues {
	readonly src?: string
	readonly app?: string
	readonly deps?: string
	readonly groups?: string
	readonly target?: string
	readonly from?: readonly string[]
	readonly apply?: boolean
	readonly yes?: boolean
	readonly json?: boolean
	readonly prune?: boolean
	readonly computed?: boolean
	readonly strict?: boolean
	readonly live?: boolean
	readonly offline?: boolean
	readonly help?: boolean
}

/** Parsed command-line values and positional arguments. */
export interface CLIArguments {
	readonly values: CLIValues
	readonly positionals: readonly string[]
}

/** Audit drift tallies used by terminal and JSON projections. */
export interface AuditCounts {
	readonly drifted: number
	readonly missing: number
	readonly foreign: number
}

/** Audit tallies partitioned by repair ownership. */
export interface OriginPartition {
	readonly owned: AuditCounts
	readonly generated: AuditCounts
}

/** One rendered fleet outcome. */
export type FleetOutcome =
	| { readonly state: 'clean' }
	| ({ readonly state: 'drifted' } & AuditCounts)
	| { readonly state: 'repaired'; readonly remaining: number }
	| { readonly state: 'failed'; readonly message: string }

/** One fleet JSON result. */
export interface FleetEntry extends AuditCounts {
	readonly name: string
	readonly failed: boolean
}

/** One successfully inspected fleet repository. */
export interface FleetRepo {
	readonly name: string
	readonly directory: string
	readonly plan: Plan
	readonly audit: Audit
}

/** One fleet repository that could not be inspected. */
export interface FleetFailure {
	readonly name: string
	readonly message: string
}

/** Unexpected-file scan outcome. */
export interface ForeignScanResult {
	readonly audit: Audit
	readonly skipped: boolean
}

/** Live dependency freshness tallies. */
export interface LiveResult {
	readonly current: number
	readonly behind: number
	readonly failed: number
}

/** The single machine-readable failure envelope. */
export interface ErrorEnvelope {
	readonly error: {
		readonly code: string
		readonly message: string
	}
}

/** Machine-readable `new` outcome. */
export interface NewResult {
	readonly name: string
	readonly src: readonly Environment[]
	readonly app: readonly Environment[]
	readonly host: number
	readonly template: number
	readonly computed: number
	readonly applied: boolean
}

/** Machine-readable `repair --apply` outcome. */
export type RepairResult = Audit & { readonly result: MaterializeResult }

/** Machine-readable catalog outcome. */
export interface CatalogResult {
	readonly entries: readonly CatalogEntry[]
	readonly drift: boolean
	readonly shrink?: number
}
