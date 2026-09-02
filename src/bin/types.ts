import type {
	Audit,
	CatalogEntry,
	DependencyPinSet,
	Group,
	Mirror,
	Question,
	Release,
} from '@src/core'
import type { MaterializeResult, MaterializerInterface, UpstreamOptions } from '@src/server'

/**
 * Names the executable's closed command vocabulary.
 *
 * @remarks
 * Authority is carried by the verb. Every verb writes when it is typed, and
 * `audit` is the only verb that never writes.
 *
 * `new` scaffolds a workspace. `repair` writes each planned path according to
 * its artifact ownership. `catalog` regenerates the marker-bounded package
 * table and fetches every declared dependency's guide into its local mirror,
 * which is what makes it the owner of those presence-owned bytes. `overwrite`
 * does everything `repair` and `catalog` do, and is the destructive verb
 * because it alone deletes the files the plan does not own and rewrites the
 * `@orkestrel/*` range set in the manifest.
 */
export type Verb = 'new' | 'audit' | 'repair' | 'catalog' | 'overwrite'

/** Names the baseline one upstream-backed command surface used. */
export type Baseline = 'live' | 'floor'

/**
 * Reports the baselines one command used for the upstream-backed surfaces it read.
 *
 * @remarks
 * An absent property means the command did not read that surface. A local
 * `--from` host is therefore absent rather than described as live or floor.
 */
export interface Provenance {
	readonly versions?: Baseline
	readonly guides?: Baseline
	readonly host?: Baseline
}

/**
 * Represents the options every verb accepts.
 *
 * @remarks
 * `target` is the directory the verb operates on. `json` emits one
 * machine-readable value instead of a report. Neither authorizes a write, and
 * no option does: authority is the verb's.
 */
export interface CommandBase {
	readonly target?: string
	readonly json?: boolean
}

/**
 * Scaffolds a workspace.
 *
 * @remarks
 * `name` is the workspace name, and is the only positional argument any verb
 * takes. `src`, `app`, and `dependencies` are the comma-separated selections
 * behind `--src`, `--app`, and `--deps`. `bin` adds the executable environment.
 * `from` reads the data root from a local path instead of the bundled one.
 */
export interface NewCommand extends CommandBase {
	readonly verb: 'new'
	readonly name: string
	readonly src?: string
	readonly app?: string
	readonly bin?: boolean
	readonly dependencies?: string
	readonly offline?: boolean
	readonly from?: string
	readonly groups?: never
	readonly all?: never
	readonly dirty?: never
}

/**
 * Reports how a target compares to its plan, writing nothing.
 *
 * @remarks
 * `groups` scopes the comparison to artifact groups.
 */
export interface AuditCommand extends CommandBase {
	readonly verb: 'audit'
	readonly groups?: string
	readonly from?: string
	readonly offline?: boolean
	readonly name?: never
	readonly src?: never
	readonly app?: never
	readonly bin?: never
	readonly dependencies?: never
	readonly all?: never
	readonly dirty?: never
}

/** Writes each planned path the target is missing or has let drift. */
export interface RepairCommand extends CommandBase {
	readonly verb: 'repair'
	readonly groups?: string
	readonly from?: string
	readonly offline?: boolean
	readonly name?: never
	readonly src?: never
	readonly app?: never
	readonly bin?: never
	readonly dependencies?: never
	readonly all?: never
	readonly dirty?: never
}

/**
 * Regenerates the package table and refreshes the guide mirrors.
 *
 * @remarks
 * `all` widens the guides fetched from the target's declared dependencies to
 * every package published in the organization. `from` is repeatable here alone,
 * because a catalog may draw on more than one local source.
 */
export interface CatalogCommand extends CommandBase {
	readonly verb: 'catalog'
	readonly all?: boolean
	readonly from?: readonly string[]
	readonly name?: never
	readonly src?: never
	readonly app?: never
	readonly bin?: never
	readonly dependencies?: never
	readonly groups?: never
	readonly dirty?: never
	readonly offline?: never
}

/**
 * Does everything repair and catalog do, then deletes and re-declares.
 *
 * @remarks
 * `dirty` waives the refusal to delete from a tree carrying uncommitted
 * changes, and waives nothing else. It is not write authority; the verb
 * already carries that.
 */
export interface OverwriteCommand extends CommandBase {
	readonly verb: 'overwrite'
	readonly groups?: string
	readonly dirty?: boolean
	readonly from?: string
	readonly offline?: boolean
	readonly name?: never
	readonly src?: never
	readonly app?: never
	readonly bin?: never
	readonly dependencies?: never
	readonly all?: never
}

/**
 * Represents one resolved command line.
 *
 * @remarks
 * Each verb admits only the options that verb has, so a combination the domain
 * forbids cannot be constructed. Every branch names the options it does not
 * take and excludes them, because omitting a member only stops it appearing in
 * a fresh object literal: a value built up first and assigned afterwards, which
 * is what real code does, would otherwise carry another verb's options
 * unchallenged. A request for usage is not a command and does not appear here:
 * it replaces the run rather than modifying it.
 */
export type CLICommand =
	| NewCommand
	| AuditCommand
	| RepairCommand
	| CatalogCommand
	| OverwriteCommand

/** Writes one line to a destination the executable does not own. */
export type OutputHandler = (line: string) => void

/**
 * Represents the options for the executable.
 *
 * @remarks
 * `output` receives the report and `diagnostic` receives everything that must
 * stay off it, so a piped machine-readable value is never polluted by a
 * warning. Both default to the process streams. They are injectable so that
 * proving what a command prints costs a function call rather than a child
 * process.
 *
 * `upstream` configures the network reader every verb that reads the registry
 * or the repository host constructs, and it is the whole option bag that reader
 * accepts rather than a narrower copy of it: a caller pointing the executable
 * at a loopback endpoint needs the same bounds, branch, and listeners it would
 * set on the reader directly, and a second type would drift from the first.
 * Absent, every read addresses the published registry and the published
 * repository host, which is what a terminal caller means.
 *
 * The process entry maps `ORKESTREL_SCAFFOLD_REGISTRY` and
 * `ORKESTREL_SCAFFOLD_REPOSITORY` to the matching upstream endpoint groups.
 * This lets an installed executable address loopback or private endpoints
 * without changing a command's write authority.
 */
export interface CLIOptions {
	readonly output?: OutputHandler
	readonly diagnostic?: OutputHandler
	readonly upstream?: UpstreamOptions | undefined
}

/** Represents one resolved host baseline beside the materializer constructed over it. */
export interface HostResolution {
	readonly materializer: MaterializerInterface
	readonly baseline?: Baseline
	readonly forced: boolean
}

/** Represents one resolved version baseline beside its evidence and writable ranges. */
export interface VersionResolution {
	readonly releases: readonly Release[]
	readonly pins: DependencyPinSet
	readonly baseline?: Baseline
	readonly forced: boolean
	readonly complete: boolean
}

/**
 * Lists the literal Vitest projects and npm run scripts one shell command invokes.
 *
 * @remarks
 * Literal only: a token whose value a shell expansion decides is unresolved, so
 * the whole reading answers `undefined` rather than reporting a name it guessed.
 */
export interface ScriptInvocations {
	readonly projects: readonly string[]
	readonly scripts: readonly string[]
}

/** Represents one target question beside the artifact groups that make it relevant. */
export interface TargetQuestion extends Question {
	readonly groups: readonly Group[]
}

/** Describes the executable's boundary. */
export interface CLIInterface {
	/**
	 * Runs one command line to completion and reports through the configured output.
	 *
	 * @param argv - The arguments following the executable's own name.
	 * @returns The exit code: `0` clean, `1` drift or failure, `2` a usage error.
	 *
	 * @remarks
	 * The code is returned rather than set on the process, so the only module
	 * that touches process state is the entry point. A caller in the same
	 * process reads the outcome directly.
	 */
	execute(argv: readonly string[]): Promise<number>
}

/** Reports the machine-readable outcome of `new`. */
export interface NewResult extends MaterializeResult {
	readonly provenance: Provenance
}

/** Reports the machine-readable outcome of `audit`. */
export interface AuditResult extends Audit {
	readonly releases: readonly Release[]
	readonly provenance: Provenance
}

/**
 * Reports the machine-readable outcome of `repair`.
 *
 * @remarks
 * `audit` is the terminal audit taken after the write, so a path still listed
 * as drifted in it is one the repair was not permitted to replace.
 */
export interface RepairResult extends MaterializeResult {
	readonly audit: Audit
	readonly releases: readonly Release[]
	readonly provenance: Provenance
}

/**
 * Reports the machine-readable outcome of `catalog`.
 *
 * @remarks
 * `entries` is the table as it stands and `mirrors` is one verdict per
 * guide fetched. `dropped` names the packages the previous table carried that
 * upstream no longer lists, which is the signal that the fleet answer shrank
 * rather than that a package was genuinely retired.
 */
export interface CatalogResult extends MaterializeResult {
	readonly entries: readonly CatalogEntry[]
	readonly mirrors: readonly Mirror[]
	readonly dropped: readonly string[]
	readonly releases: readonly Release[]
	readonly provenance: Provenance
}

/**
 * Reports the machine-readable outcome of `overwrite`.
 *
 * @remarks
 * `overwrite` carries everything `repair` and `catalog` report, plus
 * `releases`, which states the manifest's `@orkestrel/*` ranges as they stood
 * against the registry before this run rewrote them. `removed` names the files
 * it deleted. `note` is present only on a partial run: the offline half is the
 * destructive one, so a run that cannot reach upstream still persists its file
 * work and then reports, through `note` and a non-zero exit, the step it could
 * not complete.
 */
export interface OverwriteResult extends CatalogResult {
	readonly audit: Audit
	readonly releases: readonly Release[]
	readonly note?: string
}

/** Represents the single machine-readable failure value every verb reports through. */
export interface ErrorEnvelope {
	readonly error: {
		readonly code: string
		readonly message: string
	}
}
