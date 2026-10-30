import type {
	Audit,
	CatalogEntry,
	DependencyPinSet,
	Group,
	Mirror,
	Question,
	Release,
	SurfaceClaim,
	SurfaceConflict,
	SurfaceFinding,
} from '@src/core'
import type { MaterializeResult, MaterializerInterface, UpstreamOptions } from '@src/server'

/**
 * Names the executable's closed command vocabulary.
 *
 * @remarks
 * Authority is carried by the verb. `audit` and `surface` read without writing;
 * the other verbs write when typed.
 *
 * `new` scaffolds a workspace. `repair` writes each planned path according to
 * its artifact ownership. `catalog` regenerates the marker-bounded package
 * table and fetches every declared dependency's guide into its local mirror,
 * which is what makes it the owner of those presence-owned bytes. `overwrite`
 * does everything `repair` and `catalog` do, and is the destructive verb
 * because it alone deletes the files the plan does not own and rewrites the
 * `@orkestrel/*` range set in the manifest.
 */
export type Verb = 'new' | 'audit' | 'surface' | 'repair' | 'catalog' | 'overwrite'

/** Names the baseline one upstream-backed command surface used. */
export type Baseline = 'live' | 'floor'

/**
 * Reports the baselines one command used for the upstream-backed surfaces it read.
 *
 * @remarks
 * An absent property means the command did not read that surface. A local
 * `--from` host is therefore absent rather than described as live or floor.
 * `membership` names the package list and `record` the collision record the `surface`
 * verb compared against.
 */
export interface Provenance {
	readonly membership?: Baseline
	readonly versions?: Baseline
	readonly guides?: Baseline
	readonly host?: Baseline
	readonly record?: Baseline
}

/** Reports an owner's claim source, with no names when the owner is unread. */
export type SurfaceOwner =
	| (SurfaceClaim & { readonly source: 'candidate' | 'live' | 'floor' })
	| { readonly owner: string; readonly source: 'unread'; readonly names?: never }

/**
 * Reports each owner's claim source, the collision standings, the conflicts, and the baseline
 * provenance.
 *
 * @remarks
 * `conflicts` holds each name a candidate exports from two or more of its environments.
 */
export interface SurfaceResult {
	readonly owners: readonly SurfaceOwner[]
	readonly collisions: readonly SurfaceFinding[]
	readonly conflicts: readonly SurfaceConflict[]
	readonly provenance: Provenance
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
 * `name` is the workspace name and this verb's positional argument.
 * `src`, `app`, and `dependencies` are the comma-separated selections
 * behind `--src`, `--app`, and `--deps`. `bin` adds the executable environment.
 * `styles` adds the styles surface. `themes` adds its themes target and requires
 * `styles`. `showcase` adds the showcase and requires a browser application.
 * `extensions` is the comma-separated `surface:name` selection behind `--extend`.
 * `from` reads the data root from a local path instead of the bundled one.
 */
export interface NewCommand extends CommandBase {
	readonly checkouts?: never
	readonly verb: 'new'
	readonly name: string
	readonly src?: string
	readonly app?: string
	readonly bin?: boolean
	readonly styles?: boolean
	readonly themes?: boolean
	readonly showcase?: boolean
	readonly extensions?: string
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
	readonly checkouts?: never
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

/**
 * Selects candidate checkouts for a read-only fleet name comparison.
 *
 * @remarks
 * `checkouts` holds the positional paths. `target` adds the working directory
 * by default when it carries package.json. `from` selects the published data root.
 * `offline` reads the bundled guides and record without making a request.
 */
export interface SurfaceCommand extends CommandBase {
	readonly verb: 'surface'
	readonly checkouts: readonly string[]
	readonly from?: string
	readonly name?: never
	readonly src?: never
	readonly app?: never
	readonly bin?: never
	readonly dependencies?: never
	readonly groups?: never
	readonly all?: never
	readonly dirty?: never
	readonly offline?: boolean
}

/** Writes each planned path the target is missing or has let drift. */
export interface RepairCommand extends CommandBase {
	readonly checkouts?: never
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
	readonly checkouts?: never
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
	readonly checkouts?: never
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
	| SurfaceCommand
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
 * Lists the literal Vitest projects, configuration paths, and npm run scripts a shell command names.
 *
 * @remarks
 * Literal only: a token whose value a shell expansion decides is unresolved, so
 * the whole reading answers `undefined` rather than reporting a name it guessed.
 * Configuration paths use `-c <path>`, `--config <path>`, or `--config=<path>`.
 */
export interface ScriptInvocations {
	readonly projects: readonly string[]
	/** Lists literal configuration values in command order, empty when none are named. */
	readonly configs: readonly string[]
	readonly scripts: readonly string[]
}

/**
 * Represents one word or operator a shell command splits into.
 *
 * @remarks
 * `value` is the text after quoting and escaping are removed. `resolved` is `false` when a shell
 * expansion (`$`, a backtick, or `%`) outside single quotes decides the value, so the word names
 * nothing literal.
 */
export interface ScriptToken {
	readonly value: string
	readonly resolved: boolean
}

/**
 * Lists what one gate reaches through `npm run`.
 *
 * @remarks
 * `visited` holds every script name the walk reached, declared or not. `projects` holds the Vitest
 * projects the readable scripts among them name, and `unreadable` holds the reached scripts whose
 * command cannot be read literally.
 */
export interface ScriptChain {
	readonly visited: ReadonlySet<string>
	readonly projects: ReadonlySet<string>
	readonly unreadable: ReadonlySet<string>
}

/**
 * Represents what one shell token contributed to a reading of its command.
 *
 * @remarks
 * `through` is the index of the last token this step consumed, which is its own unless an option
 * or an `npm run` took the tokens that follow it as arguments. `running` is whether the command
 * the token belongs to runs `vitest run`, which every later token of that command inherits. The
 * reading is the concatenation of every step's lists, so no step rewrites an earlier one.
 */
export interface ScriptStep extends ScriptInvocations {
	readonly through: number
	readonly running: boolean
}

/**
 * Represents the NUL-delimited git output of one decoded chunk.
 *
 * @remarks
 * `records` are the complete non-empty records and `pending` is the unfinished tail after the
 * last NUL, which the next chunk continues.
 */
export interface GitChunk {
	readonly records: readonly string[]
	readonly pending: string
}

/**
 * Describes one git query: the read that runs it and answers its NUL-delimited records.
 *
 * @remarks
 * A query is created for one run and reads once.
 */
export interface GitQueryInterface {
	/**
	 * Runs the query and reads its records.
	 *
	 * @returns The non-empty records git wrote, in git's own order.
	 * @throws `ScaffoldError('TARGET', …)` when the query fails, cannot start, or its output is
	 * incomplete or outside the working-tree inventory bounds, and `ScaffoldError('INVALID', …)`
	 * when the query already ran.
	 */
	read(): Promise<readonly string[]>
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
 * `membership` holds the completed catalog read: `entries` is the table as it
 * stands, `releases` measures declared ranges against that read, and `dropped`
 * names the packages the previous table carried that
 * upstream no longer lists, which is the signal that the fleet answer shrank
 * rather than that a package was genuinely retired.
 * `mirrors` holds the guide verdicts. A membership outage omits `membership`;
 * `note` explains the refusal, and provenance names no version read.
 */
export interface CatalogResult extends MaterializeResult {
	readonly membership?: {
		readonly entries: readonly CatalogEntry[]
		readonly dropped: readonly string[]
		readonly releases: readonly Release[]
	}
	readonly mirrors: readonly Mirror[]
	readonly provenance: Provenance
	readonly note?: string
}

/** Represents fetched guides beside the membership answer, when that read completed. */
export interface CatalogResolution {
	readonly entries?: readonly CatalogEntry[]
	readonly mirrors: readonly Mirror[]
	readonly note?: string
}

/** Reports a tool's declared range beside the range an overwrite wrote after lifting its major. */
export interface DependencyLift {
	readonly name: string
	readonly from: string
	readonly to: string
}

/**
 * Reports the machine-readable outcome of `overwrite`.
 *
 * @remarks
 * `overwrite` carries everything `repair` and `catalog` report. Its top-level
 * `releases` holds the separate version read for fleet packages and foreign
 * tools after selecting the planned major for a lift. `membership.releases` holds
 * the fleet range evidence from the catalog read. `removed` names the files
 * it deleted. `additions` names each planned dependency the manifest lacked
 * and this run declared, at its planned range, in the section its list names;
 * the lockfile does not carry it until the next install. `lifts` names each
 * development tool whose major this run lifted, with the declared range in
 * `from` and the range written in `to`; an unwritten lift is absent. `note` is present only
 * on a partial run: the offline half is the destructive one, so a run that
 * cannot reach upstream still persists its file work and then reports, through
 * `note` and a non-zero exit, the step it could not complete.
 */
export interface OverwriteResult extends CatalogResult {
	readonly audit: Audit
	readonly releases: readonly Release[]
	readonly additions: DependencyPinSet
	readonly lifts: readonly DependencyLift[]
	readonly note?: string
}

/** Represents the single machine-readable failure value every verb reports through. */
export interface ErrorEnvelope {
	readonly error: {
		readonly code: string
		readonly message: string
	}
}
