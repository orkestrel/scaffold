// The `#!/usr/bin/env node` shebang is re-emitted by the build's `output.banner`, not source.
import { existsSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, relative as relativeOf, resolve, sep } from 'node:path'
import * as tls from 'node:tls'
import { parseArgs } from 'node:util'
import type {
	Audit,
	Blueprint,
	CatalogEntry,
	Dependency,
	Finding,
	Group,
	Plan,
	SyncReport,
} from '@src/core'
import {
	blueprint,
	blueprintToPlan,
	catalogNames,
	catalogToBlock,
	createCompiler,
	dependency,
	DEPENDENCY_NAME_PATTERN,
	diffPlan,
	GROUPS,
	isScaffoldError,
	manifestToDependencies,
	NAME_PATTERN,
	planToSummary,
	ScaffoldError,
	SURFACES,
} from '@src/core'
import {
	catalogPackages,
	createMaterializer,
	createSync,
	deriveBlueprint,
	discoverPackages,
	hostRoot,
	hydratePlan,
	locateHostSource,
	pruneTargets,
	readHostManifest,
	readManifest,
	readTarget,
} from '@src/server'
import type { SpinnerInterface } from '@orkestrel/console'
import { createReporter, createSpinner } from '@orkestrel/console'
import { createServerSink } from '@orkestrel/console/server'
import { isTerminalError } from '@orkestrel/terminal'
import type { TerminalInterface } from '@orkestrel/terminal/server'
import { createTerminal } from '@orkestrel/terminal/server'
import type { Verb } from './render.js'
import {
	applyConfirmMessage,
	auditJson,
	auditLiveNote,
	auditTable,
	auditVerdict,
	CANCELLED_MESSAGE,
	catalogApplySuccess,
	catalogCounts,
	catalogJson,
	catalogShrinkWarning,
	catalogTable,
	catalogUnresolvedNote,
	catalogVerdict,
	chooseStyler,
	comparisonLine,
	didYouMean,
	errorEnvelope,
	fleetCiSkipped,
	fleetRepoLine,
	fleetTotals,
	foreignHint,
	fullHelp,
	generatedNote,
	invalidName,
	INVALID_ARGUMENTS_MESSAGE,
	KNOWN_VERBS,
	missingInput,
	nearest,
	newApplySuccess,
	newJson,
	NEW_DRY_RUN_NOTE,
	newPlanPreview,
	newPlanTable,
	orkestrelDepsPrompt,
	prunePreview,
	PRUNE_EMPTY,
	pruneConfirmMessage,
	pruneSkipped,
	pullCauseNotes,
	pullJson,
	pullSuccess,
	pullTable,
	pullVerdict,
	repairHandoff,
	repairJson,
	repairSuccess,
	repairVerdict,
	REPAIR_SCOPE,
	scanSkipped,
	scopeNote,
	shortUsage,
	shouldSpin,
	surfaceChoices,
	unknownOrkestrelToken,
	unresolvedVersion,
	verbHelp,
	fleetJson,
} from './render.js'

const sink = createServerSink()
const sinkIsTTY = process.stdout.isTTY === true
const noColor = process.env.NO_COLOR !== undefined
const styler = chooseStyler(sinkIsTTY, noColor)
const reporter = createReporter({ sink, width: sink.columns, styler })

/**
 * Widen Node's default trusted-issuer set to include the OS certificate
 * store, so `fetch` behind a corporate TLS-inspecting proxy behaves like npm
 * (`cafile`) and browsers (OS trust store) instead of failing with
 * `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` against Node's bundled CA list alone.
 * Feature-detected (`tls.getCACertificates` / `tls.setDefaultCACertificates`
 * ship on Node ≈22.16+/24.5+; this package's floor is `>=22`) and wrapped in
 * try/catch — any failure is a silent no-op, never a crash. This only ADDS
 * trusted issuers; it never touches `rejectUnauthorized` or
 * `NODE_TLS_REJECT_UNAUTHORIZED`, so certificate verification stays on.
 */
function trustSystemCertificates(): void {
	if (
		typeof tls.getCACertificates !== 'function' ||
		typeof tls.setDefaultCACertificates !== 'function'
	) {
		return
	}
	try {
		const merged = new Set([
			...tls.getCACertificates('default'),
			...tls.getCACertificates('system'),
		])
		tls.setDefaultCACertificates([...merged])
	} catch {
		// Trust-store quirks never crash the CLI — fetch failures still surface their own diagnosis.
	}
}

/**
 * The one sentinel that unwinds the whole command dispatch to a chosen exit
 * code (H4/Windows) — thrown instead of calling `process.exit`, so every
 * `finally` between the throw site and the top-level driver still runs
 * (entity teardown drains naturally instead of racing process teardown).
 * Caught exactly once, at the bottom of this file.
 */
class CliExit extends Error {
	readonly code: number

	constructor(code: number) {
		super(`cli-exit:${String(code)}`)
		this.code = code
	}
}

/** Halt command dispatch with `code` (H4) — never `process.exit`; unwinds through every `finally` first. */
function halt(code: number): never {
	throw new CliExit(code)
}

/** Render a caught error as a clean one-line message — a `ScaffoldError`'s code, or a bare message otherwise. */
function describe(error: unknown): string {
	if (isScaffoldError(error)) return `[${error.code}] ${error.message}`
	return error instanceof Error ? error.message : 'unknown error'
}

/** Write ONE machine-readable JSON value to stdout — the entire `--json` output contract. */
function writeJson(value: unknown): void {
	process.stdout.write(`${JSON.stringify(value)}\n`)
}

/**
 * Whether the current invocation carries `--json` — set once `parseArguments`
 * has run (`main`'s first act), so the OUTERMOST catch (bottom of this file)
 * can still honor `--json` for an error that escapes every verb runner's own
 * handling, emitting exactly one JSON error envelope instead of prose.
 */
let sessionJson = false

/** A general operation failure (H1: exit 1) — a prose status line, or the one JSON error envelope under `--json`. */
function fail(message: string, json: boolean): never {
	if (json) writeJson(errorEnvelope('ERROR', message))
	else reporter.status('error', message)
	halt(1)
}

/**
 * A general operation failure FROM A CAUGHT ERROR (H1: exit 1) — the real
 * `ScaffoldError` code when available ('ERROR' last resort), prose (via
 * `describe`, which still carries the bracketed code for a human reader) or
 * the one JSON error envelope under `--json` (code and message kept
 * SEPARATE — never double-encoding the code into the message text).
 */
function failError(error: unknown, json: boolean): never {
	if (json) {
		const code = isScaffoldError(error) ? error.code : 'ERROR'
		const message = isScaffoldError(error) ? error.message : describe(error)
		writeJson(errorEnvelope(code, message))
	} else {
		reporter.status('error', describe(error))
	}
	halt(1)
}

/** A usage error (bad flag value, unknown verb — exit 2) — stderr prose, or the one JSON error envelope under `--json`. */
function usageFail(message: string, json: boolean): never {
	if (json) writeJson(errorEnvelope('USAGE', message))
	else process.stderr.write(`${message}\n`)
	halt(2)
}

// Realpath-resolve the DEEPEST EXISTING ancestor of `path` (following any
// symlink it or its ancestors are), then rejoin the still-nonexistent
// remainder unchanged — mirrors the server `Materializer`'s `#resolveReal` so
// a not-yet-created destination is checked against where a symlinked segment
// actually points, without realpath'ing a leaf that does not exist yet.
function resolveReal(path: string): string {
	if (existsSync(path)) return realpathSync(path)
	const parent = dirname(path)
	if (parent === path) return path
	return join(resolveReal(parent), relativeOf(parent, path))
}

/**
 * Confine a WRITE destination to the current working directory (global-CLI
 * safety): `new`'s resolved target, `--target` on pull/audit/repair/catalog,
 * and `fleet`'s always-cwd root all pass through here before use. A
 * READ-ONLY source (`--from`) is exempt — sibling-repo sourcing from outside
 * the cwd is legitimate. Equal to the cwd or nested beneath it passes;
 * anything else is a coded `INVALID` failure (AGENTS §12), never a silent clamp.
 *
 * @returns The resolved (non-realpath'd) absolute path, for use as the
 * verb's destination.
 */
function containDestination(candidate: string): string {
	const resolvedCwd = resolveReal(resolve(process.cwd()))
	const resolvedCandidate = resolveReal(resolve(candidate))
	if (resolvedCandidate !== resolvedCwd && !resolvedCandidate.startsWith(resolvedCwd + sep)) {
		throw new ScaffoldError(
			'INVALID',
			`Target "${candidate}" escapes the working directory — run scaffold from the directory you want to write beneath.`,
			{ path: candidate },
		)
	}
	return resolve(candidate)
}

/** `containDestination`, halting (H1/`fail`) on a coded escape instead of throwing — the shared entry every runner's target resolution goes through. */
function containOrFail(candidate: string, json: boolean): string {
	try {
		return containDestination(candidate)
	} catch (error) {
		failError(error, json)
	}
}

/** Compile `spec` and unwrap its `plan`, halting (H1/`fail`) with the joined open-question text when compilation could not resolve one — the shared entry every runner's compile step goes through. */
function compileOrFail(spec: Blueprint, json: boolean): Plan {
	const compiler = createCompiler()
	try {
		const scaffolding = compiler.compile(spec)
		if (!scaffolding.plan) {
			const message = scaffolding.questions.map((question) => question.text).join('; ')
			fail(message, json)
		}
		return scaffolding.plan
	} finally {
		compiler.destroy()
	}
}

/** `node:util`'s strict `parseArgs`, isolated so its throw on an unknown/malformed flag is catchable (H3). */
function parseArguments() {
	// Strip a single leading literal '--' (npm passthrough residue that
	// PowerShell mangles, e.g. `npm run scaffold -- new x`) so it parses as `new x`.
	const args = process.argv.slice(2)
	if (args[0] === '--') args.shift()
	return parseArgs({
		args,
		allowPositionals: true,
		options: {
			surfaces: { type: 'string' },
			deps: { type: 'string' },
			groups: { type: 'string' },
			target: { type: 'string' },
			from: { type: 'string', multiple: true },
			apply: { type: 'boolean', default: false },
			yes: { type: 'boolean', default: false },
			json: { type: 'boolean', default: false },
			prune: { type: 'boolean', default: false },
			strict: { type: 'boolean', default: false },
			live: { type: 'boolean', default: false },
			offline: { type: 'boolean', default: false },
			help: { type: 'boolean', default: false, short: 'h' },
		},
	})
}

/** The parsed CLI flags — every verb runner reads the same bag (unused flags for a verb are simply ignored). */
type Values = ReturnType<typeof parseArguments>['values']

/** Narrow a positional command to the closed `Verb` vocabulary (render.ts's `KNOWN_VERBS`). */
function isVerb(value: string): value is Verb {
	return KNOWN_VERBS.some((verb) => verb === value)
}

/**
 * Best-effort `hydratePlan` — used by `audit` / `repair` / `fleet` so a
 * missing DEFAULT vendored-source root degrades to presence-only auditing
 * instead of failing the verb. An EXPLICITLY-passed `--from` that does not
 * resolve to a usable directory is NOT downgraded silently — that is a coded
 * `TARGET` failure (M1), since the caller named that source on purpose.
 */
function hydrateBestEffort(
	plan: Plan,
	host: string,
	explicit: boolean,
): { readonly plan: Plan; readonly aware: boolean } {
	if (!existsSync(host)) {
		if (explicit) {
			throw new ScaffoldError('TARGET', `--from does not resolve to a directory: ${host}`, {
				host,
			})
		}
		return { plan, aware: false }
	}
	try {
		return { plan: hydratePlan(plan, host), aware: true }
	} catch (error) {
		if (isScaffoldError(error) && error.code === 'TARGET') return { plan, aware: false }
		throw error
	}
}

/**
 * Merge a `pruneTargets` scan into `audit` as `foreign` findings — pure
 * object-spread composition in the BIN only (`src/core`'s `diffPlan` is never
 * modified/reimplemented). Every unexpected path becomes one
 * `'orchestration'`-group `foreign` finding (the `Group` every `PRUNE_DIRECTORIES`
 * entry — `.claude/agents`, `scripts` — belongs to); any scan hit makes the
 * merged audit unclean, so an "unexpected file" is honestly counted as drift
 * (exit 1) instead of the structurally-always-zero `diffPlan.foreign`.
 */
function withForeignScan(audit: Audit, target: string, host: string): Audit {
	const paths = pruneTargets(target, host)
	if (paths.length === 0) return audit
	const findings: Finding[] = paths.map((path) => ({
		path,
		group: 'orchestration',
		drift: 'foreign',
	}))
	return {
		...audit,
		clean: false,
		foreign: audit.foreign + paths.length,
		findings: [...audit.findings, ...findings],
	}
}

/**
 * `withForeignScan`, degrading instead of crashing (F3): `pruneTargets` throws
 * a coded `TARGET` failure when a prune directory exists under `target` but
 * `host` cannot positively establish its allowlist (`vendoredPruneSet`'s
 * fail-closed contract) — an audit should report the un-scanned findings and
 * say scanning was skipped, never crash on this alone (`runFleet` already
 * shields its own per-repo audit the same way).
 */
function withForeignScanSafe(
	audit: Audit,
	target: string,
	host: string,
): { readonly audit: Audit; readonly skipped: boolean } {
	try {
		return { audit: withForeignScan(audit, target, host), skipped: false }
	} catch (error) {
		if (isScaffoldError(error) && error.code === 'TARGET') return { audit, skipped: true }
		throw error
	}
}

/**
 * `repair`'s own scope is host-only, but the caller compiles the FULL plan anyway — diff it too
 * (cheap, local, no network) so a clean host verdict can point at drift OUTSIDE repair's reach.
 * The count feeds render.ts's `scopeNote`.
 */
function repairOutsideCount(compiled: Plan, target: string): number {
	const full = diffPlan(
		compiled,
		readTarget(
			target,
			compiled.artifacts.map((artifact) => artifact.path),
		),
	)
	return full.drifted + full.missing + full.foreign
}

/** One `fleet --json` entry — `undefined` counts (a failed repo never got an audit) fall back to zero. */
function fleetEntry(
	name: string,
	counts:
		| { readonly drifted: number; readonly missing: number; readonly foreign: number }
		| undefined,
	failed: boolean,
): {
	readonly name: string
	readonly drifted: number
	readonly missing: number
	readonly foreign: number
	readonly failed: boolean
} {
	return {
		name,
		drifted: counts?.drifted ?? 0,
		missing: counts?.missing ?? 0,
		foreign: counts?.foreign ?? 0,
		failed,
	}
}

/** Reject a cancelled prompt (ctrl-c) with the shared `CANCELLED_MESSAGE` — exit 1, nothing written. */
async function guarded<T>(promise: Promise<T>): Promise<T> {
	try {
		return await promise
	} catch (error) {
		if (isTerminalError(error) && error.code === 'CANCEL') {
			reporter.line(CANCELLED_MESSAGE)
			halt(1)
		}
		throw error
	}
}

/**
 * The shared write-confirmation gate every verb calls before it touches disk.
 * `--apply` writes without asking; `--json` (without `--apply`) is a pure
 * dry-run and NEVER prompts; `--yes` auto-answers yes; otherwise a real
 * confirm with `default: false` (EOF on stdin resolves to the default).
 */
async function resolveApply(
	terminal: TerminalInterface,
	message: string,
	values: Values,
	json: boolean,
): Promise<boolean> {
	if (values.apply) return true
	if (json) return false
	if (values.yes) return true
	return guarded(terminal.confirm({ message, default: false }))
}

/**
 * The SECOND, separate confirm for `--prune`-eligible deletions — never
 * bundled into `resolveApply`'s question. `--yes` only auto-answers this
 * when `--prune` was also passed (it never enables pruning by itself).
 */
async function resolvePrune(
	terminal: TerminalInterface,
	message: string,
	values: Values,
	json: boolean,
): Promise<boolean> {
	if (!values.prune) return false
	if (values.apply) return true
	if (json) return false
	if (values.yes) return true
	// One-prompt-per-non-TTY-process ceiling (S3f): the write confirm
	// (`resolveApply`) already spent the ONE prompt a non-interactive stream
	// can reliably answer — a second `terminal.confirm` off the same drained
	// stdin hangs until the runtime's watchdog kills the process. Pruning is
	// therefore never asked on non-TTY; it resolves `false` and prints
	// `pruneSkipped()` instead.
	if (!sinkIsTTY) {
		reporter.line(pruneSkipped())
		return false
	}
	return guarded(terminal.confirm({ message, default: false }))
}

/** A spinner for a long-running write step — `undefined` under `--json` or off a TTY sink (render.ts's `shouldSpin`). */
function createSpinnerMaybe(message: string, json: boolean): SpinnerInterface | undefined {
	return json || !shouldSpin(sinkIsTTY) ? undefined : createSpinner({ message, sink, styler })
}

/** Announce a successful write — the spinner's own success line, or a plain `reporter.status` without one (never under `--json`). */
function announceApply(
	spinner: SpinnerInterface | undefined,
	json: boolean,
	message: string,
): void {
	if (spinner) spinner.success(message)
	else if (!json) reporter.status('success', message)
}

/** Announce a failed write and halt(1) — the spinner's own failure line (if any), then the shared `fail`. */
function announceFailure(
	spinner: SpinnerInterface | undefined,
	json: boolean,
	error: unknown,
): never {
	const message = describe(error)
	if (spinner) spinner.failure(message)
	fail(message, json)
}

/** Split a comma-separated token list, trimming and dropping empties — the parse `new`'s dependency prompt goes through. */
function splitTokens(raw: string): readonly string[] {
	return raw
		.split(',')
		.map((token) => token.trim())
		.filter((token) => token.length > 0)
}

/** Normalize a Q1 token to a full `@orkestrel/<name>` — an already-prefixed token passes through unchanged. */
function normalizeOrkestrelToken(token: string): string {
	return token.startsWith('@orkestrel/') ? token : `@orkestrel/${token}`
}

/**
 * Best-effort vendored `@orkestrel` catalog names, resolved via `host`
 * (`hostRoot()`, or the active `--from` override) through the host manifest
 * — `undefined` when the catalog cannot be established (a missing/unreadable
 * manifest, no `.claude/agents/orkestrel.md` entry, or any other failure),
 * degrading Q1 to shape-only validation instead of blocking on it.
 */
function resolveCatalogNames(host: string): readonly string[] | undefined {
	try {
		const manifest = readHostManifest(host)
		const full = locateHostSource(manifest, '.claude/agents/orkestrel.md', host)
		if (full === undefined || !existsSync(full)) return undefined
		return catalogNames(readFileSync(full, 'utf8'))
	} catch {
		return undefined
	}
}

/** One Q1 token's issue against `catalog` (`undefined` = valid) — shape-only (`DEPENDENCY_NAME_PATTERN`) when `catalog` itself could not be resolved. */
function orkestrelTokenIssue(
	normalized: string,
	catalog: readonly string[] | undefined,
): string | undefined {
	if (catalog === undefined) {
		return DEPENDENCY_NAME_PATTERN.test(normalized)
			? undefined
			: unknownOrkestrelToken(normalized, undefined)
	}
	if (catalog.includes(normalized)) return undefined
	return unknownOrkestrelToken(normalized, nearest(normalized, catalog))
}

/** Q1 (TTY only) — `@orkestrel` short-name deps, re-asking on any unresolved token until the input is clean or empty. */
async function promptOrkestrelDeps(
	terminal: TerminalInterface,
	catalog: readonly string[] | undefined,
): Promise<readonly string[]> {
	for (;;) {
		const raw = await guarded(terminal.input({ message: orkestrelDepsPrompt(), default: '' }))
		const tokens = splitTokens(raw)
		if (tokens.length === 0) return []
		const normalized = tokens.map(normalizeOrkestrelToken)
		const issue = normalized
			.map((token) => orkestrelTokenIssue(token, catalog))
			.find((message) => message !== undefined)
		if (issue === undefined) return normalized
		reporter.line(issue)
	}
}

/** `scaffold new` — scaffold a package into `./<name>` (or `--target`). */
async function runNew(values: Values, argument: string | undefined, json: boolean): Promise<void> {
	const terminal = createTerminal()

	let name: string
	if (argument !== undefined) {
		name = argument
	} else if (json) {
		usageFail('a package name is required with --json', json)
	} else if (!sinkIsTTY) {
		usageFail(missingInput('a package name', 'new'), json)
	} else {
		name = await guarded(
			terminal.input({
				message: 'Package name',
				validate: { pattern: NAME_PATTERN.source },
			}),
		)
	}
	// F4: the positional (or interactively-collected) name is validated against
	// the SAME `NAME_PATTERN` (core's single source of truth) the interactive
	// prompt enforces — a positional name never bypassed this shape before.
	if (!NAME_PATTERN.test(name)) {
		usageFail(invalidName(name, NAME_PATTERN.source), json)
	}

	let surfaceInput: readonly string[]
	if (values.surfaces !== undefined) {
		surfaceInput = values.surfaces.split(',')
	} else if (json) {
		usageFail('--surfaces is required with --json', json)
	} else if (!sinkIsTTY) {
		usageFail(missingInput('--surfaces', 'new'), json)
	} else {
		surfaceInput = await guarded(
			terminal.checkbox({ message: 'Surfaces', choices: surfaceChoices(), min: 1 }),
		)
	}
	const unrecognizedSurface = surfaceInput.filter(
		(candidate) => !SURFACES.some((surface) => surface === candidate),
	)
	if (unrecognizedSurface.length > 0) {
		usageFail(`Surface "${unrecognizedSurface.join('", "')}" is not recognized`, json)
	}
	const surfaces = SURFACES.filter((surface) => surfaceInput.includes(surface))

	// S3g: containment happens ONCE, here, near the top — before any preview,
	// network call, or confirm — so a `--target` escape is caught up front
	// rather than after the user has already reviewed a plan for a
	// destination the write can never reach.
	const destination = containOrFail(values.target ?? `./${name}`, json)

	// `--deps` is OPTIONAL — a non-TTY session with neither `--json` nor
	// `--deps` defaults to no extra dependencies rather than failing (only a
	// REQUIRED input triggers `missingInput`'s usage error); the multi-prompt
	// guidance below stays TTY-only (S3f's one-prompt-per-process ceiling).
	// `--deps` keeps its EXACT prior mechanism verbatim — untrimmed split,
	// `DEPENDENCY_NAME_PATTERN`-gated BEFORE any network call (A3). The
	// interactive Q1 replaces only the FREE-TEXT prompt, with short-name
	// normalization + vendored-catalog validation (re-asking on an unknown
	// token, degrading to shape-only when the catalog cannot be resolved).
	let depNames: readonly string[]
	if (values.deps !== undefined) {
		depNames = values.deps.split(',').filter((depName) => depName.length > 0)
		const badDep = depNames.find((depName) => !DEPENDENCY_NAME_PATTERN.test(depName))
		if (badDep !== undefined) {
			usageFail(`Dependency name "${badDep}" must match ${DEPENDENCY_NAME_PATTERN.source}`, json)
		}
	} else if (json || !sinkIsTTY) {
		depNames = []
	} else {
		const catalogHost = values.from?.[0] ?? hostRoot()
		const catalog = resolveCatalogNames(catalogHost)
		if (catalog === undefined) reporter.line(catalogUnresolvedNote())
		depNames = await promptOrkestrelDeps(terminal, catalog)
	}

	// --deps/Q1 resolve latest from the registry → ranges pin ^latest; their
	// guides fetch into the plan.
	const sync = createSync()
	let versions
	try {
		versions = await sync.versions(depNames.map((depName) => dependency(depName, '*')))
	} finally {
		sync.destroy()
	}
	// `createSync()` is non-strict — it never throws — so a range-less
	// `--deps` name that the registry could not resolve (`freshness`
	// 'missing'/'failed', `latest` '') is a HARD failure here: writing `^` +
	// an empty `latest` would otherwise land an unwritable `"^"` range in
	// package.json with exit 0.
	const unresolved = versions
		.filter(
			(version) =>
				(version.freshness !== 'current' && version.freshness !== 'behind') ||
				version.latest === '',
		)
		.map((version) => version.name)
	if (unresolved.length > 0) fail(unresolvedVersion(unresolved), json)
	const deps = versions.map((version) => dependency(version.name, `^${version.latest}`))

	// Extra devDependencies are no longer collected here — hand-add them to
	// `package.json` after scaffolding; `deriveBlueprint`'s extras round-trip
	// (`@src/server`) recompiles them back into the plan, so `audit` stays
	// clean over a hand-added `devDependencies` entry (AGENTS §21 core stays
	// the single source of truth for that relaxation).
	const plan = compileOrFail(blueprint(name, { surfaces, dependencies: deps }), json)

	const summary = planToSummary(plan)

	if (!json) {
		reporter.section('Plan')
		reporter.table(newPlanTable(summary))
		reporter.line(newPlanPreview(name))
	}

	const proceed = await resolveApply(
		terminal,
		applyConfirmMessage(summary.host + summary.template + summary.computed),
		values,
		json,
	)

	if (!proceed) {
		if (json) writeJson(newJson(summary, false))
		else reporter.line(NEW_DRY_RUN_NOTE)
		process.exitCode = 0
		return
	}

	const spinner = createSpinnerMaybe('materializing', json)
	spinner?.start()
	const materializer = createMaterializer({ host: values.from?.[0] })
	try {
		const result = materializer.materialize(plan, destination)
		const count = result.written.length + result.copied.length
		if (json) writeJson(newJson(summary, true))
		else announceApply(spinner, json, newApplySuccess(count, name))
	} catch (error) {
		announceFailure(spinner, json, error)
	} finally {
		materializer.destroy()
	}
	process.exitCode = 0
}

/** `scaffold pull` — refresh vendored dependency mirrors and report range drift. */
async function runPull(values: Values, json: boolean): Promise<void> {
	const target = containOrFail(values.target ?? '.', json)

	const sync = createSync({ strict: values.strict })
	try {
		const wanted = values.deps?.split(',')
		let report: SyncReport
		try {
			const declared = manifestToDependencies(readManifest(target))
			const deps = wanted ? declared.filter((dep) => wanted.includes(dep.name)) : declared
			if (wanted) {
				const guides = await sync.guides(deps)
				const versions = await sync.versions(deps)
				const failed = [...guides, ...versions].filter(
					(entry) => entry.freshness === 'missing' || entry.freshness === 'failed',
				).length
				const clean =
					failed === 0 &&
					guides.every((guide) => guide.freshness === 'current') &&
					versions.every((version) => version.freshness === 'current')
				report = { target, guides, versions, clean, failed }
			} else {
				report = await sync.pull(target)
			}
		} catch (error) {
			failError(error, json)
		}

		if (!json) {
			reporter.table(pullTable(report))
			for (const line of pullCauseNotes(report)) reporter.line(line)
			reporter.line(pullVerdict(report))
		}

		const toWrite = [...report.guides, ...report.versions].filter(
			(entry) => entry.freshness !== 'current',
		).length

		const terminal = createTerminal()
		const proceed =
			toWrite > 0 ? await resolveApply(terminal, applyConfirmMessage(toWrite), values, json) : false

		if (proceed) {
			const spinner = createSpinnerMaybe('writing mirrors', json)
			spinner?.start()
			try {
				const written = await sync.write(report, target)
				if (json) writeJson(pullJson(report))
				else announceApply(spinner, json, pullSuccess(written.length))
			} catch (error) {
				announceFailure(spinner, json, error)
			}
		} else if (json) {
			writeJson(pullJson(report))
		}

		process.exitCode = report.clean ? 0 : proceed ? 0 : 1
	} finally {
		sync.destroy()
	}
}

/** `scaffold audit` — whole-plan conformance report; offers a repair handoff on drift. */
async function runAudit(values: Values, json: boolean): Promise<void> {
	const target = containOrFail(values.target ?? '.', json)

	let spec: Blueprint
	try {
		spec = deriveBlueprint(target)
	} catch (error) {
		failError(error, json)
	}

	const deps: readonly Dependency[] = [...spec.dependencies, ...spec.peers, ...spec.extras]

	const groupsInput = values.groups?.split(',')
	let groups: readonly Group[] | undefined
	if (groupsInput !== undefined) {
		const unrecognized = groupsInput.filter((name) => !GROUPS.some((group) => group === name))
		if (unrecognized.length > 0) {
			usageFail(`Group "${unrecognized.join('", "')}" is not recognized`, json)
		}
		groups = GROUPS.filter((group) => groupsInput.includes(group))
	}

	const compiled = blueprintToPlan(spec, groups)
	const from = values.from?.[0]
	const host = from ?? hostRoot()
	let hydrated: { readonly plan: Plan; readonly aware: boolean }
	try {
		hydrated = hydrateBestEffort(compiled, host, from !== undefined)
	} catch (error) {
		failError(error, json)
	}
	const plan = hydrated.plan
	const artifactPaths = plan.artifacts.map((artifact) => artifact.path)

	// S3b (honest audit): merge the `pruneTargets` scan into the presented
	// audit — an "unexpected file" is real drift here, not the structurally-
	// always-zero `diffPlan.foreign`. Only attempted when the host is actually
	// established (`hydrated.aware`) — the same condition `hostRoot`/`--from`
	// already require to positively enumerate a vendored allowlist. F3: the
	// scan itself degrades (never crashes) when a prune dir exists under
	// `target` but `host` cannot establish its allowlist.
	const rawAudit = diffPlan(plan, readTarget(target, artifactPaths))
	const scanned = hydrated.aware
		? withForeignScanSafe(rawAudit, target, host)
		: { audit: rawAudit, skipped: false }
	const audit = scanned.audit
	let drifted = !audit.clean

	let live:
		| { readonly current: number; readonly behind: number; readonly failed: number }
		| undefined
	if (values.live) {
		const sync = createSync()
		try {
			const guides = await sync.guides(deps)
			const versions = await sync.versions(deps)
			const entries = [...guides, ...versions]
			drifted ||= entries.some((entry) => entry.freshness !== 'current')
			const current = entries.filter((entry) => entry.freshness === 'current').length
			const behind = entries.filter((entry) => entry.freshness === 'behind').length
			const failed = entries.length - current - behind
			live = { current, behind, failed }
		} finally {
			sync.destroy()
		}
	}

	if (json) {
		writeJson(live === undefined ? auditJson(audit) : { ...auditJson(audit), live })
		process.exitCode = drifted ? 1 : 0
		return
	}

	if (scanned.skipped) reporter.line(scanSkipped())
	reporter.line(comparisonLine(hydrated.aware))
	reporter.table(auditTable(audit, plan))
	reporter.line(auditVerdict(audit, plan))
	if (live !== undefined) reporter.line(auditLiveNote(live.current, live.behind, live.failed))

	if (!audit.clean) {
		const origins = new Map(plan.artifacts.map((artifact) => [artifact.path, artifact.origin]))
		const isOwned = (path: string): boolean =>
			origins.get(path) === 'host' || origins.get(path) === 'template'
		const ownedCount = audit.findings.filter(
			(finding) =>
				finding.drift !== 'aligned' && finding.drift !== 'foreign' && isOwned(finding.path),
		).length
		const computedCount = audit.findings.filter(
			(finding) =>
				finding.drift !== 'aligned' && finding.drift !== 'foreign' && !isOwned(finding.path),
		).length
		const pruneRequested = values.prune

		// F1 (audit never writes via flags): the handoff is an INTERACTIVE
		// convenience only, offered exclusively on a TTY session — `--apply` /
		// `--yes` NEVER count as handoff consent here (they gate the SEPARATE
		// `repair` run this branch may launch, never audit's own read-only
		// pass). F2 (foreign-only handoff dead-end): the handoff also covers
		// foreign files, but ONLY when `--prune` was passed — an inherited
		// repair without `--prune` cannot delete them, so offering the handoff
		// for foreign-only drift without `--prune` would be a dead end.
		const offerHandoff = sinkIsTTY && (ownedCount > 0 || (audit.foreign > 0 && pruneRequested))

		let handoffAccepted = false
		if (offerHandoff) {
			const terminal = createTerminal()
			const message = repairHandoff(ownedCount, audit.foreign, pruneRequested)
			handoffAccepted = await guarded(terminal.confirm({ message, default: false }))
			if (handoffAccepted) {
				await runRepair(values, false)
				// S3c (handoff exit truth): repair's own exit code reflects only
				// ITS scope — re-diff the FULL plan (host/template/computed AND
				// the foreign scan) so the audit's exit code stays truthful about
				// ANY drift still remaining, mirroring `runFleet`'s post-repair
				// `finalAudit` pattern.
				const rawFinal = diffPlan(plan, readTarget(target, artifactPaths))
				const finalScanned = hydrated.aware
					? withForeignScanSafe(rawFinal, target, host)
					: { audit: rawFinal, skipped: false }
				process.exitCode = finalScanned.audit.clean ? 0 : 1
				return
			}
		}

		if (!handoffAccepted) {
			// F2: when the handoff cannot help foreign files (no `--prune`, or no
			// handoff offered at all), point at the one command that can.
			if (audit.foreign > 0 && !pruneRequested) reporter.line(foreignHint())
			// computed-origin drift is regenerated, never hand-edited — `repair`
			// has nothing to offer for it; `generatedNote` says so instead.
			if (computedCount > 0) reporter.line(generatedNote(computedCount))
		}
	}

	process.exitCode = drifted ? 1 : 0
}

/** `scaffold repair` — restore the shared template-owned set for ONE target. */
async function runRepair(values: Values, json: boolean): Promise<void> {
	const target = containOrFail(values.target ?? '.', json)

	let spec: Blueprint
	try {
		spec = deriveBlueprint(target)
	} catch (error) {
		failError(error, json)
	}

	const compiled = compileOrFail(spec, json)

	// H2: repair is the host-restoration tool ONLY — scope to host-origin
	// artifacts before hydrate/diff/apply so a mature repo's hand-written
	// src/tests/guides/package.json is never overwritten with a stub.
	// `.github/workflows/ci.yml` STAYS in scope here (unlike `fleet`'s
	// exclusion) — single-target `repair --apply` is explicit per-repo intent.
	const scoped: Plan = {
		...compiled,
		artifacts: compiled.artifacts.filter((artifact) => artifact.origin === 'host'),
	}

	const from = values.from?.[0]
	const host = from ?? hostRoot()
	let plan: Plan
	try {
		plan = hydrateBestEffort(scoped, host, from !== undefined).plan
	} catch (error) {
		failError(error, json)
	}

	let audit: Audit
	try {
		audit = diffPlan(
			plan,
			readTarget(
				target,
				plan.artifacts.map((artifact) => artifact.path),
			),
		)
	} catch (error) {
		failError(error, json)
	}

	if (!json) {
		reporter.line(REPAIR_SCOPE)
		reporter.section('Audit')
		reporter.table(auditTable(audit, plan))
	}

	// S3a: the prune preview/confirm are driven by the REAL scan
	// (`pruneTargets`), never `audit.foreign` (which `diffPlan` can never
	// populate through this call path — it only ever reads the plan's own
	// paths). A zero-length scan skips the question entirely and is a no-op.
	// U11 F2: computed BEFORE the clean-audit check so `--prune` still reaches
	// this scan (and the deletion flow below) on a clean-host repo — a clean
	// audit alone no longer bypasses pruning, only a clean audit WITH nothing
	// to prune does.
	const prunePaths = values.prune && existsSync(host) ? pruneTargets(target, host) : []

	if (audit.clean && prunePaths.length === 0) {
		if (json) {
			writeJson(repairJson(audit))
		} else {
			reporter.line(repairVerdict(audit))
			const note = scopeNote(repairOutsideCount(compiled, target))
			if (note !== undefined) reporter.line(note)
		}
		process.exitCode = 0
		return
	}

	if (!json) reporter.line(repairVerdict(audit))

	const terminal = createTerminal()
	let proceed = true
	if (!audit.clean) {
		proceed = await resolveApply(
			terminal,
			applyConfirmMessage(audit.drifted + audit.missing + audit.foreign),
			values,
			json,
		)
	}

	if (!proceed) {
		if (json) writeJson(repairJson(audit))
		process.exitCode = 1
		return
	}

	if (values.prune && !json) {
		if (prunePaths.length === 0) reporter.line(PRUNE_EMPTY)
		else for (const line of prunePreview(prunePaths)) reporter.line(line)
	}
	const doPrune =
		prunePaths.length > 0 &&
		(await resolvePrune(terminal, pruneConfirmMessage(prunePaths.length), values, json))

	const spinner = createSpinnerMaybe('repairing', json)
	spinner?.start()
	const materializer = createMaterializer({ host: values.from?.[0] })
	try {
		const result = materializer.repair(plan, audit, target)
		const removed = doPrune ? materializer.prune(target).removed : []
		if (json) writeJson(repairJson(audit, { ...result, removed }))
		else announceApply(spinner, json, repairSuccess(result, removed))
	} catch (error) {
		announceFailure(spinner, json, error)
	} finally {
		materializer.destroy()
	}
	process.exitCode = 0
}

/** `scaffold fleet` — audit/repair every `@orkestrel` package beneath the current directory's immediate children. */
async function runFleet(values: Values, json: boolean): Promise<void> {
	const root = containOrFail('.', json)

	const packages = discoverPackages(root)
	if (packages.length === 0) {
		fail(
			`no @orkestrel packages under "${root}" — fleet scans the immediate children of the current directory; stand in the folder that contains your checkouts (cd ..), or use 'repair' to true up just this repo.`,
			json,
		)
	}

	const from = values.from?.[0]
	const host = from ?? hostRoot()
	const explicit = from !== undefined

	const repos: {
		readonly name: string
		readonly directory: string
		readonly plan: Plan
		readonly audit: Audit
		readonly aware: boolean
	}[] = []
	const failures: { readonly name: string; readonly message: string }[] = []
	let ciExcluded = false

	for (const directory of packages) {
		const name = basename(directory)
		try {
			const compiler = createCompiler()
			let scoped: Plan
			try {
				const spec = deriveBlueprint(directory)
				const scaffolding = compiler.compile(spec)
				if (!scaffolding.plan) {
					const message = scaffolding.questions.map((question) => question.text).join('; ')
					throw new ScaffoldError('INVALID', message)
				}
				// Fleet apply must never clobber a repo's intentionally divergent
				// CI (e.g. ollama, sea) — `.github/workflows/ci.yml` is scoped out
				// of `fleet`; single-target `repair` keeps full scope.
				scoped = {
					...scaffolding.plan,
					artifacts: scaffolding.plan.artifacts.filter(
						(artifact) =>
							artifact.origin === 'host' && artifact.path !== '.github/workflows/ci.yml',
					),
				}
				if (
					!ciExcluded &&
					scaffolding.plan.artifacts.some(
						(artifact) => artifact.path === '.github/workflows/ci.yml',
					)
				) {
					if (!json) reporter.line(fleetCiSkipped())
					ciExcluded = true
				}
			} finally {
				compiler.destroy()
			}

			const hydrated = hydrateBestEffort(scoped, host, explicit)
			const plan = hydrated.plan
			const paths = plan.artifacts.map((artifact) => artifact.path)
			const rawAudit = diffPlan(plan, readTarget(directory, paths))
			// S3b (honest audit): merge each repo's `pruneTargets` scan in, same
			// as `runAudit` — an unexpected file is real drift here too.
			const audit = hydrated.aware ? withForeignScan(rawAudit, directory, host) : rawAudit
			repos.push({ name, directory, plan, audit, aware: hydrated.aware })
		} catch (error) {
			failures.push({ name, message: describe(error) })
		}
	}

	if (!json) {
		for (const repo of repos) {
			reporter.line(
				fleetRepoLine(
					repo.name,
					repo.audit.clean
						? { kind: 'clean' }
						: {
								kind: 'drifted',
								drifted: repo.audit.drifted,
								missing: repo.audit.missing,
								foreign: repo.audit.foreign,
							},
				),
			)
		}
		for (const failure of failures) {
			reporter.line(fleetRepoLine(failure.name, { kind: 'failed', message: failure.message }))
		}
	}

	const dirty = repos.filter((repo) => !repo.audit.clean)

	if (dirty.length === 0) {
		if (json) {
			writeJson(
				fleetJson([
					...repos.map((repo) => fleetEntry(repo.name, repo.audit, false)),
					...failures.map((failure) => fleetEntry(failure.name, undefined, true)),
				]),
			)
		} else {
			reporter.line(fleetTotals(0, failures.length))
		}
		process.exitCode = failures.length > 0 ? 1 : 0
		return
	}

	const fileCount = dirty.reduce(
		(total, repo) => total + repo.audit.drifted + repo.audit.missing + repo.audit.foreign,
		0,
	)

	const terminal = createTerminal()
	const proceed = await resolveApply(
		terminal,
		applyConfirmMessage(fileCount, dirty.length),
		values,
		json,
	)

	// S3a: fleet's prune preview/confirm are driven by the REAL per-repo scan
	// (`pruneTargets`), never `audit.foreign` — each unexpected path is shown
	// `<repo>/<path>`-prefixed so the fleet-wide preview stays legible. Scanned
	// only when `host` itself is establishable (`existsSync`) — same
	// precondition `hydrateBestEffort` already gates awareness on; an
	// unestablished host degrades to a no-op prune, never a thrown scan.
	const prunePaths =
		proceed && values.prune && existsSync(host)
			? dirty.flatMap((repo) =>
					pruneTargets(repo.directory, host).map((path) => `${repo.name}/${path}`),
				)
			: []
	if (proceed && values.prune && !json) {
		if (prunePaths.length === 0) reporter.line(PRUNE_EMPTY)
		else for (const line of prunePreview(prunePaths)) reporter.line(line)
	}
	const doPrune =
		proceed &&
		prunePaths.length > 0 &&
		(await resolvePrune(terminal, pruneConfirmMessage(prunePaths.length), values, json))

	if (!proceed) {
		if (json) {
			writeJson(
				fleetJson([
					...repos.map((repo) => fleetEntry(repo.name, repo.audit, false)),
					...failures.map((failure) => fleetEntry(failure.name, undefined, true)),
				]),
			)
		} else {
			reporter.line(fleetTotals(dirty.length, failures.length))
		}
		process.exitCode = 1
		return
	}

	const materializer = createMaterializer({ host })
	let drifted = 0
	let failedCount = failures.length
	const entries: ReturnType<typeof fleetEntry>[] = repos
		.filter((repo) => repo.audit.clean)
		.map((repo) => fleetEntry(repo.name, repo.audit, false))

	try {
		for (const repo of dirty) {
			try {
				materializer.repair(repo.plan, repo.audit, repo.directory)
				if (doPrune) materializer.prune(repo.directory)
				const paths = repo.plan.artifacts.map((artifact) => artifact.path)
				const rawFinal = diffPlan(repo.plan, readTarget(repo.directory, paths))
				const finalAudit = repo.aware ? withForeignScan(rawFinal, repo.directory, host) : rawFinal
				if (!finalAudit.clean) drifted += 1
				entries.push(fleetEntry(repo.name, finalAudit, false))
				if (!json) {
					reporter.line(
						fleetRepoLine(repo.name, {
							kind: 'repaired',
							remaining: finalAudit.drifted + finalAudit.missing + finalAudit.foreign,
						}),
					)
				}
			} catch (error) {
				failedCount += 1
				entries.push(fleetEntry(repo.name, undefined, true))
				if (!json) {
					reporter.line(fleetRepoLine(repo.name, { kind: 'failed', message: describe(error) }))
				}
			}
		}
	} finally {
		materializer.destroy()
	}

	if (json) {
		writeJson(
			fleetJson([
				...entries,
				...failures.map((failure) => fleetEntry(failure.name, undefined, true)),
			]),
		)
	} else {
		reporter.line(fleetTotals(drifted, failedCount))
	}
	process.exitCode = drifted > 0 || failedCount > 0 ? 1 : 0
}

/** `scaffold catalog` — regenerate the fleet package catalog table embedded in `.claude/agents/orkestrel.md`. */
async function runCatalog(values: Values, json: boolean): Promise<void> {
	const target = containOrFail(values.target ?? '.', json)

	const explicitRoots = values.from
	let entries: readonly CatalogEntry[]
	let published = 0
	let localOnly = 0
	const notes = new Map<string, string>()

	if (values.offline) {
		const roots = explicitRoots ?? [process.cwd()]
		try {
			entries = catalogPackages(roots)
		} catch (error) {
			failError(error, json)
		}
	} else {
		const sync = createSync({
			on: {
				package: (name, note) => {
					if (note !== '') notes.set(name, note)
				},
			},
		})
		let registryEntries: readonly CatalogEntry[]
		try {
			registryEntries = await sync.catalog()
		} catch (error) {
			failError(error, json)
		} finally {
			sync.destroy()
		}
		published = registryEntries.length

		let localEntries: readonly CatalogEntry[] = []
		if (explicitRoots !== undefined) {
			try {
				localEntries = catalogPackages(explicitRoots)
			} catch (error) {
				failError(error, json)
			}
		}

		const merged = new Map<string, CatalogEntry>()
		for (const entry of registryEntries) merged.set(entry.name, entry)
		for (const local of localEntries) {
			const existing = merged.get(local.name)
			if (existing === undefined) {
				merged.set(local.name, local)
				localOnly += 1
			} else if (local.description.length > 0) {
				merged.set(local.name, { ...existing, description: local.description })
			}
		}
		entries = [...merged.values()].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
	}

	const block = catalogToBlock(entries)
	// S3g: the LEAF write path is re-confined (same mechanism as every other
	// verb's destination) — `target` itself passed containment, but a
	// symlinked segment nested BENEATH it (e.g. a symlinked `.claude`) could
	// still let this specific path escape the cwd.
	const agentPath = containOrFail(join(target, '.claude', 'agents', 'orkestrel.md'), json)
	let current: string
	try {
		current = readFileSync(agentPath, 'utf8')
	} catch (error) {
		failError(
			new ScaffoldError('TARGET', `Failed to read ${agentPath}`, { path: agentPath, error }),
			json,
		)
	}

	const startMarker = '<!-- catalog:start -->'
	const endMarker = '<!-- catalog:end -->'
	const startIndex = current.indexOf(startMarker)
	const endIndex = current.indexOf(endMarker)
	if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
		failError(
			new ScaffoldError(
				'TARGET',
				`Markers "${startMarker}" / "${endMarker}" not found in ${agentPath}`,
				{ path: agentPath },
			),
			json,
		)
	}

	const before = current.slice(0, startIndex + startMarker.length)
	const after = current.slice(endIndex)
	const updated = `${before}\n\n${block}\n${after}`

	const oldBlock = current.slice(startIndex + startMarker.length, endIndex)
	const oldRows = catalogNames(oldBlock).length
	const shrink = entries.length < oldRows ? oldRows - entries.length : undefined

	if (updated === current) {
		if (json) writeJson(catalogJson(entries, false))
		else reporter.line(catalogVerdict(true))
		process.exitCode = 0
		return
	}

	if (!json) {
		reporter.table(catalogTable(entries))
		const warning = catalogShrinkWarning(oldRows, entries.length)
		if (warning !== undefined) reporter.line(warning)
		if (values.offline) {
			const missingDescription = entries
				.filter((entry) => entry.description.length === 0)
				.map((entry) => entry.name)
			if (missingDescription.length > 0) {
				reporter.line(
					`${missingDescription.length} without guide description: ${missingDescription.join(', ')}`,
				)
			}
		} else {
			reporter.line(catalogCounts(published, localOnly))
			for (const [name, note] of notes) reporter.line(`  ${name}: ${note}`)
		}
	}

	const terminal = createTerminal()
	const proceed = await resolveApply(terminal, applyConfirmMessage(1), values, json)

	if (!proceed) {
		if (json) writeJson(catalogJson(entries, true, shrink))
		else reporter.line(catalogVerdict(false))
		process.exitCode = 1
		return
	}

	try {
		writeFileSync(agentPath, updated, 'utf8')
	} catch (error) {
		failError(
			new ScaffoldError('TARGET', `Failed to write ${agentPath}`, { path: agentPath, error }),
			json,
		)
	}
	if (json) writeJson(catalogJson(entries, true, shrink))
	else reporter.status('success', catalogApplySuccess(agentPath))
	process.exitCode = 0
}

/**
 * The whole command dispatch — a single top-level driver (no nested function
 * declarations, AGENTS §4). Every verb sets `process.exitCode` (never
 * `process.exit`, H4) and returns, or `halt()`s through a `finally` that
 * tears its entities down first; the caller at the bottom of this file
 * catches exactly one sentinel (`CliExit`) and stops.
 */
async function main(): Promise<void> {
	let parsed: ReturnType<typeof parseArguments>
	try {
		parsed = parseArguments()
	} catch (error) {
		process.stderr.write(`${error instanceof Error ? error.message : INVALID_ARGUMENTS_MESSAGE}\n`)
		process.exitCode = 2
		return
	}

	const { values, positionals } = parsed
	const [command, argument] = positionals
	const json = values.json === true
	sessionJson = json

	if (command === undefined) {
		process.stdout.write(`${values.help ? fullHelp() : shortUsage()}\n`)
		process.exitCode = 0
		return
	}

	if (!isVerb(command)) {
		usageFail(didYouMean(command), json)
	}

	if (values.help) {
		process.stdout.write(`${verbHelp(command)}\n`)
		process.exitCode = 0
		return
	}

	if (command === 'new') return runNew(values, argument, json)
	if (command === 'pull') return runPull(values, json)
	if (command === 'audit') return runAudit(values, json)
	if (command === 'repair') return runRepair(values, json)
	if (command === 'fleet') return runFleet(values, json)
	return runCatalog(values, json)
}

trustSystemCertificates()

try {
	await main()
} catch (error) {
	if (error instanceof CliExit) {
		process.exitCode = error.code
	} else if (sessionJson) {
		const code = isScaffoldError(error) ? error.code : 'ERROR'
		const message = isScaffoldError(error) ? error.message : describe(error)
		writeJson(errorEnvelope(code, message))
		process.exitCode = 1
	} else {
		reporter.status('error', describe(error))
		process.exitCode = 1
	}
}
