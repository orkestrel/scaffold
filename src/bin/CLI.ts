// The `#!/usr/bin/env node` shebang is re-emitted by the build's `output.banner`, not source.
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import * as tls from 'node:tls'
import type {
	Audit,
	Blueprint,
	CatalogEntry,
	Finding,
	Dependency,
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
import { createReporter, createSpinner, createStyler } from '@orkestrel/console'
import { createServerSink } from '@orkestrel/console/server'
import { attempt } from '@orkestrel/contract'
import { isTerminalError } from '@orkestrel/terminal'
import type { TerminalInterface } from '@orkestrel/terminal/server'
import { createTerminal } from '@orkestrel/terminal/server'
import {
	CANCELLED_MESSAGE,
	CATALOG_UNRESOLVED_NOTE,
	FLEET_CI_SKIPPED,
	FOREIGN_HINT,
	INVALID_ARGUMENTS_MESSAGE,
	NEW_DRY_RUN_NOTE,
	ORKESTREL_DEPS_PROMPT,
	PRUNE_EMPTY,
	PRUNE_SKIPPED,
	REPAIR_SCOPE,
	SCAN_SKIPPED,
	SURFACE_CHOICES,
} from './constants.js'
import { CLIExitError } from './errors.js'
import {
	applyConfirmMessage,
	auditLiveNote,
	auditTable,
	auditVerdict,
	catalogApplySuccess,
	catalogCounts,
	catalogShrinkWarning,
	catalogTable,
	catalogVerdict,
	comparisonLine,
	containDestination,
	describeError,
	didYouMean,
	fleetRepoLine,
	fleetTotals,
	fullHelp,
	generatedNote,
	invalidName,
	missingInput,
	newApplySuccess,
	newPlanPreview,
	newPlanTable,
	orkestrelTokenIssue,
	prunePreview,
	pruneConfirmMessage,
	pullCauseNotes,
	pullSuccess,
	pullTable,
	pullVerdict,
	repairHandoff,
	repairSuccess,
	repairVerdict,
	scopeNote,
	shortUsage,
	unresolvedVersion,
	verbHelp,
} from './helpers.js'
import { normalizeOrkestrelToken, parseArguments, splitTokens } from './parsers.js'
import {
	auditToRepairResult,
	catalogResultOf,
	errorEnvelopeOf,
	fleetEntryOf,
	partitionFindings,
	summaryToNewResult,
} from './shapers.js'
import type {
	CLIArguments,
	CLIInterface,
	CLIValues,
	FleetEntry,
	FleetFailure,
	FleetRepo,
	ForeignScanResult,
	HydrationResult,
	LiveResult,
} from './types.js'
import { isVerb } from './validators.js'

/** Stateful command-line orchestration and its process boundary. */
export class CLI implements CLIInterface {
	#sink = createServerSink()
	#tty = process.stdout.isTTY === true
	#styler = createStyler({ enabled: process.env.NO_COLOR === undefined && this.#tty })
	#reporter = createReporter({
		sink: this.#sink,
		width: this.#sink.columns,
		styler: this.#styler,
	})
	#json = false

	/** Execute one command-line argument vector. */
	async run(argv: readonly string[]): Promise<void> {
		this.#trust()
		try {
			await this.#dispatch(argv)
		} catch (error) {
			if (error instanceof CLIExitError) {
				process.exitCode = error.code
			} else if (this.#json) {
				const code = isScaffoldError(error) ? error.code : 'ERROR'
				const message = isScaffoldError(error) ? error.message : describeError(error)
				this.#write(errorEnvelopeOf(code, message))
				process.exitCode = 1
			} else {
				this.#reporter.status('error', describeError(error))
				process.exitCode = 1
			}
		}
	}

	/**
	 * Widen Node's default trusted-issuer set to include the OS certificate
	 * store, so `fetch` behind a corporate TLS-inspecting proxy behaves like npm
	 * (`cafile`) and browsers (OS trust store) instead of failing with
	 * `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` against Node's bundled CA list alone.
	 * Feature-detected (`tls.getCACertificates` / `tls.setDefaultCACertificates`
	 * ship on Node ≈22.16+/24.5+; this package's floor is `>=22`) and captured
	 * through `attempt` — any failure is a silent no-op, never a crash. This only ADDS
	 * trusted issuers; it never touches `rejectUnauthorized` or
	 * `NODE_TLS_REJECT_UNAUTHORIZED`, so certificate verification stays on.
	 */
	#trust(): void {
		if (
			typeof tls.getCACertificates !== 'function' ||
			typeof tls.setDefaultCACertificates !== 'function'
		) {
			return
		}
		attempt(() => {
			const merged = new Set([
				...tls.getCACertificates('default'),
				...tls.getCACertificates('system'),
			])
			tls.setDefaultCACertificates([...merged])
		})
	}

	/** Write ONE machine-readable JSON value to stdout — the entire `--json` output contract. */
	#write(value: unknown): void {
		process.stdout.write(`${JSON.stringify(value)}\n`)
	}

	/** A general operation failure (H1: exit 1) — a prose status line, or the one JSON error envelope under `--json`. */
	#fail(message: string, json: boolean): never {
		if (json) this.#write(errorEnvelopeOf('ERROR', message))
		else this.#reporter.status('error', message)
		throw new CLIExitError(1)
	}

	/**
	 * A general operation failure FROM A CAUGHT ERROR (H1: exit 1) — the real
	 * `ScaffoldError` code when available ('ERROR' last resort), prose (via
	 * `describe`, which still carries the bracketed code for a human reader) or
	 * the one JSON error envelope under `--json` (code and message kept
	 * SEPARATE — never double-encoding the code into the message text).
	 */
	#error(error: unknown, json: boolean): never {
		if (json) {
			const code = isScaffoldError(error) ? error.code : 'ERROR'
			const message = isScaffoldError(error) ? error.message : describeError(error)
			this.#write(errorEnvelopeOf(code, message))
		} else {
			this.#reporter.status('error', describeError(error))
		}
		throw new CLIExitError(1)
	}

	/** A usage error (bad flag value, unknown verb — exit 2) — stderr prose, or the one JSON error envelope under `--json`. */
	#usage(message: string, json: boolean): never {
		if (json) this.#write(errorEnvelopeOf('USAGE', message))
		else process.stderr.write(`${message}\n`)
		throw new CLIExitError(2)
	}

	/** `containDestination`, halting (H1/`fail`) on a coded escape instead of throwing — the shared entry every runner's target resolution goes through. */
	#contain(candidate: string, json: boolean): string {
		const contained = attempt(() => containDestination(process.cwd(), candidate))
		if (contained.success) return contained.value
		this.#error(contained.error, json)
	}

	/** Compile `spec` and unwrap its `plan`, halting (H1/`fail`) with the joined open-question text when compilation could not resolve one — the shared entry every runner's compile step goes through. */
	#compile(spec: Blueprint, json: boolean): Plan {
		const compiler = createCompiler()
		try {
			const scaffolding = compiler.compile(spec)
			if (!scaffolding.plan) {
				const message = scaffolding.questions.map((question) => question.text).join('; ')
				this.#fail(message, json)
			}
			return scaffolding.plan
		} finally {
			compiler.destroy()
		}
	}

	/**
	 * Best-effort `hydratePlan` — used by `audit` / `repair` / `fleet` so a
	 * missing DEFAULT vendored-source root degrades to presence-only auditing
	 * instead of failing the verb. An EXPLICITLY-passed `--from` that does not
	 * resolve to a usable directory is NOT downgraded silently — that is a coded
	 * `TARGET` failure (M1), since the caller named that source on purpose.
	 */
	#hydrate(plan: Plan, host: string, explicit: boolean): HydrationResult {
		if (!existsSync(host)) {
			if (explicit) {
				throw new ScaffoldError('TARGET', `--from does not resolve to a directory: ${host}`, {
					host,
				})
			}
			return { plan, aware: false }
		}
		return { plan: hydratePlan(plan, host), aware: true }
	}

	/**
	 * Merge a `pruneTargets` scan into `audit` as `foreign` findings — pure
	 * object-spread composition in the BIN only (`src/core`'s `diffPlan` is never
	 * modified/reimplemented). Every unexpected path becomes one
	 * `'orchestration'`-group `foreign` finding (the `Group` every `PRUNE_DIRECTORIES`
	 * entry—`.claude/agents`, `.codex/agents`, `scripts`—belongs to); any scan hit makes the
	 * merged audit unclean, so an "unexpected file" is honestly counted as drift
	 * (exit 1) instead of the structurally-always-zero `diffPlan.foreign`.
	 */
	#scan(audit: Audit, target: string, host: string): Audit {
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
	#scanSafe(audit: Audit, target: string, host: string): ForeignScanResult {
		const scanned = attempt(() => this.#scan(audit, target, host))
		if (scanned.success) return { audit: scanned.value, skipped: false }
		if (isScaffoldError(scanned.error) && scanned.error.code === 'TARGET') {
			return { audit, skipped: true }
		}
		throw scanned.error
	}

	/**
	 * `repair`'s own scope is host-only, but the caller compiles the FULL plan anyway — diff it too
	 * (cheap, local, no network) so a clean host verdict can point at drift OUTSIDE repair's reach.
	 * The count feeds the shared `scopeNote` renderer.
	 */
	#outside(compiled: Plan, target: string): number {
		const full = diffPlan(
			compiled,
			readTarget(
				target,
				compiled.artifacts.map((artifact) => artifact.path),
			),
		)
		return full.drifted + full.missing + full.foreign
	}

	/** Reject a cancelled prompt (ctrl-c) with the shared `CANCELLED_MESSAGE` — exit 1, nothing written. */
	async #guard<T>(promise: Promise<T>): Promise<T> {
		try {
			return await promise
		} catch (error) {
			if (isTerminalError(error) && error.code === 'CANCEL') {
				this.#reporter.line(CANCELLED_MESSAGE)
				throw new CLIExitError(1)
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
	async #apply(
		terminal: TerminalInterface,
		message: string,
		values: CLIValues,
		json: boolean,
	): Promise<boolean> {
		if (values.apply) return true
		if (json) return false
		if (values.yes) return true
		return this.#guard(terminal.confirm({ message, default: false }))
	}

	/**
	 * The SECOND, separate confirm for `--prune`-eligible deletions — never
	 * bundled into `resolveApply`'s question. `--yes` only auto-answers this
	 * when `--prune` was also passed (it never enables pruning by itself).
	 */
	async #prune(
		terminal: TerminalInterface,
		message: string,
		values: CLIValues,
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
		if (!this.#tty) {
			this.#reporter.line(PRUNE_SKIPPED)
			return false
		}
		return this.#guard(terminal.confirm({ message, default: false }))
	}

	/** A spinner for a long-running write step, absent under `--json` or off a TTY sink. */
	#spinner(message: string, json: boolean): SpinnerInterface | undefined {
		return json || !this.#tty
			? undefined
			: createSpinner({ message, sink: this.#sink, styler: this.#styler })
	}

	/** Announce a successful write — the spinner's own success line, or a plain `reporter.status` without one (never under `--json`). */
	#succeed(spinner: SpinnerInterface | undefined, json: boolean, message: string): void {
		if (spinner) spinner.success(message)
		else if (!json) this.#reporter.status('success', message)
	}

	/** Announce a failed write and halt(1) — the spinner's own failure line (if any), then the shared `fail`. */
	#reject(spinner: SpinnerInterface | undefined, json: boolean, error: unknown): never {
		const message = describeError(error)
		if (spinner) spinner.failure(message)
		this.#fail(message, json)
	}

	/**
	 * Best-effort vendored `@orkestrel` catalog names, resolved via `host`
	 * (`hostRoot()`, or the active `--from` override) through the host manifest
	 * — `undefined` when the catalog cannot be established (a missing/unreadable
	 * manifest, no `.claude/agents/orkestrel.md` entry, or any other failure),
	 * degrading Q1 to shape-only validation instead of blocking on it.
	 */
	#names(host: string): readonly string[] | undefined {
		const names = attempt(() => {
			const manifest = readHostManifest(host)
			const full = locateHostSource(manifest, '.claude/agents/orkestrel.md', host)
			if (full === undefined || !existsSync(full)) return undefined
			return catalogNames(readFileSync(full, 'utf8'))
		})
		return names.success ? names.value : undefined
	}

	/** Q1 (TTY only) — `@orkestrel` short-name deps, re-asking on any unresolved token until the input is clean or empty. */
	async #prompt(
		terminal: TerminalInterface,
		catalog: readonly string[] | undefined,
	): Promise<readonly string[]> {
		for (;;) {
			const raw = await this.#guard(terminal.input({ message: ORKESTREL_DEPS_PROMPT, default: '' }))
			const tokens = splitTokens(raw)
			if (tokens.length === 0) return []
			const normalized = tokens.map(normalizeOrkestrelToken)
			const issue = normalized
				.map((token) => orkestrelTokenIssue(token, catalog))
				.find((message) => message !== undefined)
			if (issue === undefined) return normalized
			this.#reporter.line(issue)
		}
	}

	/** `scaffold new` — scaffold a package into `./<name>` (or `--target`). */
	async #new(values: CLIValues, argument: string | undefined, json: boolean): Promise<void> {
		const terminal = createTerminal()

		let name: string
		if (argument !== undefined) {
			name = argument
		} else if (json) {
			this.#usage('a package name is required with --json', json)
		} else if (!this.#tty) {
			this.#usage(missingInput('a package name', 'new'), json)
		} else {
			name = await this.#guard(
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
			this.#usage(invalidName(name, NAME_PATTERN.source), json)
		}

		let surfaceInput: readonly string[]
		if (values.surfaces !== undefined) {
			surfaceInput = values.surfaces.split(',')
		} else if (json) {
			this.#usage('--surfaces is required with --json', json)
		} else if (!this.#tty) {
			this.#usage(missingInput('--surfaces', 'new'), json)
		} else {
			surfaceInput = await this.#guard(
				terminal.checkbox({ message: 'Surfaces', choices: SURFACE_CHOICES, min: 1 }),
			)
		}
		const unrecognizedSurface = surfaceInput.filter(
			(candidate) => !SURFACES.some((surface) => surface === candidate),
		)
		if (unrecognizedSurface.length > 0) {
			this.#usage(`Surface "${unrecognizedSurface.join('", "')}" is not recognized`, json)
		}
		const surfaces = SURFACES.filter((surface) => surfaceInput.includes(surface))

		// S3g: containment happens ONCE, here, near the top — before any preview,
		// network call, or confirm — so a `--target` escape is caught up front
		// rather than after the user has already reviewed a plan for a
		// destination the write can never reach.
		const destination = this.#contain(values.target ?? `./${name}`, json)

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
				this.#usage(
					`Dependency name "${badDep}" must match ${DEPENDENCY_NAME_PATTERN.source}`,
					json,
				)
			}
		} else if (json || !this.#tty) {
			depNames = []
		} else {
			const catalogHost = values.from?.[0] ?? hostRoot()
			const catalog = this.#names(catalogHost)
			if (catalog === undefined) this.#reporter.line(CATALOG_UNRESOLVED_NOTE)
			depNames = await this.#prompt(terminal, catalog)
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
		if (unresolved.length > 0) this.#fail(unresolvedVersion(unresolved), json)
		const deps = versions.map((version) => dependency(version.name, `^${version.latest}`))

		// Extra devDependencies are no longer collected here — hand-add them to
		// `package.json` after scaffolding; `deriveBlueprint`'s extras round-trip
		// (`@src/server`) recompiles them back into the plan, so `audit` stays
		// clean over a hand-added `devDependencies` entry (AGENTS §21 core stays
		// the single source of truth for that relaxation).
		const plan = this.#compile(blueprint(name, { surfaces, dependencies: deps }), json)

		const summary = planToSummary(plan)

		if (!json) {
			this.#reporter.section('Plan')
			this.#reporter.table(newPlanTable(summary))
			this.#reporter.line(newPlanPreview(name))
		}

		const proceed = await this.#apply(
			terminal,
			applyConfirmMessage(summary.host + summary.template + summary.computed),
			values,
			json,
		)

		if (!proceed) {
			if (json) this.#write(summaryToNewResult(summary, false))
			else this.#reporter.line(NEW_DRY_RUN_NOTE)
			process.exitCode = 0
			return
		}

		const spinner = this.#spinner('materializing', json)
		spinner?.start()
		const materializer = createMaterializer({ host: values.from?.[0] })
		try {
			const result = materializer.materialize(plan, destination)
			const count = result.written.length + result.copied.length
			if (json) this.#write(summaryToNewResult(summary, true))
			else this.#succeed(spinner, json, newApplySuccess(count, name))
		} catch (error) {
			this.#reject(spinner, json, error)
		} finally {
			materializer.destroy()
		}
		process.exitCode = 0
	}

	/** `scaffold pull` — refresh vendored dependency mirrors and report range drift. */
	async #pull(values: CLIValues, json: boolean): Promise<void> {
		const target = this.#contain(values.target ?? '.', json)

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
				this.#error(error, json)
			}

			if (!json) {
				this.#reporter.table(pullTable(report))
				for (const line of pullCauseNotes(report)) this.#reporter.line(line)
				this.#reporter.line(pullVerdict(report))
			}

			const toWrite = [...report.guides, ...report.versions].filter(
				(entry) => entry.freshness !== 'current',
			).length

			const terminal = createTerminal()
			const proceed =
				toWrite > 0
					? await this.#apply(terminal, applyConfirmMessage(toWrite), values, json)
					: false

			if (proceed) {
				const spinner = this.#spinner('writing mirrors', json)
				spinner?.start()
				try {
					const written = await sync.write(report, target)
					if (json) this.#write(report)
					else this.#succeed(spinner, json, pullSuccess(written.length))
				} catch (error) {
					this.#reject(spinner, json, error)
				}
			} else if (json) {
				this.#write(report)
			}

			process.exitCode = report.clean ? 0 : proceed ? 0 : 1
		} finally {
			sync.destroy()
		}
	}

	/** `scaffold audit` — whole-plan conformance report; offers a repair handoff on drift. */
	async #audit(values: CLIValues, json: boolean): Promise<void> {
		const target = this.#contain(values.target ?? '.', json)

		let spec: Blueprint
		try {
			spec = deriveBlueprint(target)
		} catch (error) {
			this.#error(error, json)
		}

		const deps: readonly Dependency[] = [...spec.dependencies, ...spec.peers, ...spec.extras]

		const groupsInput = values.groups?.split(',')
		let groups: readonly Group[] | undefined
		if (groupsInput !== undefined) {
			const unrecognized = groupsInput.filter((name) => !GROUPS.some((group) => group === name))
			if (unrecognized.length > 0) {
				this.#usage(`Group "${unrecognized.join('", "')}" is not recognized`, json)
			}
			groups = GROUPS.filter((group) => groupsInput.includes(group))
		}

		const compiled = blueprintToPlan(spec, groups)
		const from = values.from?.[0]
		const host = from ?? hostRoot()
		let hydrated: HydrationResult
		try {
			hydrated = this.#hydrate(compiled, host, from !== undefined)
		} catch (error) {
			this.#error(error, json)
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
			? this.#scanSafe(rawAudit, target, host)
			: { audit: rawAudit, skipped: false }
		const audit = scanned.audit
		let drifted = !audit.clean

		let live: LiveResult | undefined
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
			this.#write(live === undefined ? audit : { ...audit, live })
			process.exitCode = drifted ? 1 : 0
			return
		}

		if (scanned.skipped) this.#reporter.line(SCAN_SKIPPED)
		this.#reporter.line(comparisonLine(hydrated.aware))
		this.#reporter.table(auditTable(audit, plan))
		this.#reporter.line(auditVerdict(audit, plan))
		if (live !== undefined) {
			this.#reporter.line(auditLiveNote(live.current, live.behind, live.failed))
		}

		if (!audit.clean) {
			const split = partitionFindings(audit.findings, plan)
			const ownedCount = split.owned.drifted + split.owned.missing
			const computedCount = split.generated.drifted + split.generated.missing
			const pruneRequested = values.prune === true

			// F1 (audit never writes via flags): the handoff is an INTERACTIVE
			// convenience only, offered exclusively on a TTY session — `--apply` /
			// `--yes` NEVER count as handoff consent here (they gate the SEPARATE
			// `repair` run this branch may launch, never audit's own read-only
			// pass). F2 (foreign-only handoff dead-end): the handoff also covers
			// foreign files, but ONLY when `--prune` was passed — an inherited
			// repair without `--prune` cannot delete them, so offering the handoff
			// for foreign-only drift without `--prune` would be a dead end.
			const offerHandoff = this.#tty && (ownedCount > 0 || (audit.foreign > 0 && pruneRequested))

			let handoffAccepted = false
			if (offerHandoff) {
				const terminal = createTerminal()
				const message = repairHandoff(ownedCount, audit.foreign, pruneRequested)
				handoffAccepted = await this.#guard(terminal.confirm({ message, default: false }))
				if (handoffAccepted) {
					await this.#repair(values, false)
					// S3c (handoff exit truth): repair's own exit code reflects only
					// ITS scope — re-diff the FULL plan (host/template/computed AND
					// the foreign scan) so the audit's exit code stays truthful about
					// ANY drift still remaining, mirroring `runFleet`'s post-repair
					// `finalAudit` pattern.
					const rawFinal = diffPlan(plan, readTarget(target, artifactPaths))
					const finalScanned = hydrated.aware
						? this.#scanSafe(rawFinal, target, host)
						: { audit: rawFinal, skipped: false }
					process.exitCode = finalScanned.audit.clean ? 0 : 1
					return
				}
			}

			if (!handoffAccepted) {
				// F2: when the handoff cannot help foreign files (no `--prune`, or no
				// handoff offered at all), point at the one command that can.
				if (audit.foreign > 0 && !pruneRequested) this.#reporter.line(FOREIGN_HINT)
				// computed-origin drift is regenerated, never hand-edited — `repair`
				// has nothing to offer for it; `generatedNote` says so instead.
				if (computedCount > 0) this.#reporter.line(generatedNote(computedCount))
			}
		}

		process.exitCode = drifted ? 1 : 0
	}

	/** `scaffold repair` — restore the shared template-owned set for ONE target. */
	async #repair(values: CLIValues, json: boolean): Promise<void> {
		const target = this.#contain(values.target ?? '.', json)

		let spec: Blueprint
		try {
			spec = deriveBlueprint(target)
		} catch (error) {
			this.#error(error, json)
		}

		const compiled = this.#compile(spec, json)

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
			plan = this.#hydrate(scoped, host, from !== undefined).plan
		} catch (error) {
			this.#error(error, json)
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
			this.#error(error, json)
		}

		if (!json) {
			this.#reporter.line(REPAIR_SCOPE)
			this.#reporter.section('Audit')
			this.#reporter.table(auditTable(audit, plan))
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
				this.#write(audit)
			} else {
				this.#reporter.line(repairVerdict(audit))
				const note = scopeNote(this.#outside(compiled, target))
				if (note !== undefined) this.#reporter.line(note)
			}
			process.exitCode = 0
			return
		}

		if (!json) this.#reporter.line(repairVerdict(audit))

		const terminal = createTerminal()
		let proceed = true
		if (!audit.clean) {
			proceed = await this.#apply(
				terminal,
				applyConfirmMessage(audit.drifted + audit.missing + audit.foreign),
				values,
				json,
			)
		}

		if (!proceed) {
			if (json) this.#write(audit)
			process.exitCode = 1
			return
		}

		if (values.prune && !json) {
			if (prunePaths.length === 0) this.#reporter.line(PRUNE_EMPTY)
			else for (const line of prunePreview(prunePaths)) this.#reporter.line(line)
		}
		const doPrune =
			prunePaths.length > 0 &&
			(await this.#prune(terminal, pruneConfirmMessage(prunePaths.length), values, json))

		const spinner = this.#spinner('repairing', json)
		spinner?.start()
		const materializer = createMaterializer({ host: values.from?.[0] })
		try {
			const result = materializer.repair(plan, audit, target)
			const removed = doPrune ? materializer.prune(target).removed : []
			if (json) this.#write(auditToRepairResult(audit, { ...result, removed }))
			else this.#succeed(spinner, json, repairSuccess(result, removed))
		} catch (error) {
			this.#reject(spinner, json, error)
		} finally {
			materializer.destroy()
		}
		process.exitCode = 0
	}

	/** `scaffold fleet` — audit/repair every `@orkestrel` package beneath the current directory's immediate children. */
	async #fleet(values: CLIValues, json: boolean): Promise<void> {
		const root = this.#contain('.', json)

		const packages = discoverPackages(root)
		if (packages.length === 0) {
			this.#fail(
				`no @orkestrel packages under "${root}" — fleet scans the immediate children of the current directory; stand in the folder that contains your checkouts (cd ..), or use 'repair' to true up just this repo.`,
				json,
			)
		}

		const from = values.from?.[0]
		const host = from ?? hostRoot()
		const explicit = from !== undefined

		const repos: FleetRepo[] = []
		const failures: FleetFailure[] = []
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
						if (!json) this.#reporter.line(FLEET_CI_SKIPPED)
						ciExcluded = true
					}
				} finally {
					compiler.destroy()
				}

				const hydrated = this.#hydrate(scoped, host, explicit)
				const plan = hydrated.plan
				const paths = plan.artifacts.map((artifact) => artifact.path)
				const rawAudit = diffPlan(plan, readTarget(directory, paths))
				// S3b (honest audit): merge each repo's `pruneTargets` scan in, same
				// as `runAudit` — an unexpected file is real drift here too.
				const audit = hydrated.aware ? this.#scan(rawAudit, directory, host) : rawAudit
				repos.push({ name, directory, plan, audit, aware: hydrated.aware })
			} catch (error) {
				failures.push({ name, message: describeError(error) })
			}
		}

		if (!json) {
			for (const repo of repos) {
				this.#reporter.line(
					fleetRepoLine(
						repo.name,
						repo.audit.clean
							? { state: 'clean' }
							: {
									state: 'drifted',
									drifted: repo.audit.drifted,
									missing: repo.audit.missing,
									foreign: repo.audit.foreign,
								},
					),
				)
			}
			for (const failure of failures) {
				this.#reporter.line(
					fleetRepoLine(failure.name, { state: 'failed', message: failure.message }),
				)
			}
		}

		const dirty = repos.filter((repo) => !repo.audit.clean)

		if (dirty.length === 0) {
			if (json) {
				this.#write([
					...repos.map((repo) => fleetEntryOf(repo.name, repo.audit, false)),
					...failures.map((failure) => fleetEntryOf(failure.name, undefined, true)),
				])
			} else {
				this.#reporter.line(fleetTotals(0, failures.length))
			}
			process.exitCode = failures.length > 0 ? 1 : 0
			return
		}

		const fileCount = dirty.reduce(
			(total, repo) => total + repo.audit.drifted + repo.audit.missing + repo.audit.foreign,
			0,
		)

		const terminal = createTerminal()
		const proceed = await this.#apply(
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
			if (prunePaths.length === 0) this.#reporter.line(PRUNE_EMPTY)
			else for (const line of prunePreview(prunePaths)) this.#reporter.line(line)
		}
		const doPrune =
			proceed &&
			prunePaths.length > 0 &&
			(await this.#prune(terminal, pruneConfirmMessage(prunePaths.length), values, json))

		if (!proceed) {
			if (json) {
				this.#write([
					...repos.map((repo) => fleetEntryOf(repo.name, repo.audit, false)),
					...failures.map((failure) => fleetEntryOf(failure.name, undefined, true)),
				])
			} else {
				this.#reporter.line(fleetTotals(dirty.length, failures.length))
			}
			process.exitCode = 1
			return
		}

		const materializer = createMaterializer({ host })
		let drifted = 0
		let failedCount = failures.length
		const entries: FleetEntry[] = repos
			.filter((repo) => repo.audit.clean)
			.map((repo) => fleetEntryOf(repo.name, repo.audit, false))

		try {
			for (const repo of dirty) {
				try {
					materializer.repair(repo.plan, repo.audit, repo.directory)
					if (doPrune) materializer.prune(repo.directory)
					const paths = repo.plan.artifacts.map((artifact) => artifact.path)
					const rawFinal = diffPlan(repo.plan, readTarget(repo.directory, paths))
					const finalAudit = repo.aware ? this.#scan(rawFinal, repo.directory, host) : rawFinal
					if (!finalAudit.clean) drifted += 1
					entries.push(fleetEntryOf(repo.name, finalAudit, false))
					if (!json) {
						this.#reporter.line(
							fleetRepoLine(repo.name, {
								state: 'repaired',
								remaining: finalAudit.drifted + finalAudit.missing + finalAudit.foreign,
							}),
						)
					}
				} catch (error) {
					failedCount += 1
					entries.push(fleetEntryOf(repo.name, undefined, true))
					if (!json) {
						this.#reporter.line(
							fleetRepoLine(repo.name, {
								state: 'failed',
								message: describeError(error),
							}),
						)
					}
				}
			}
		} finally {
			materializer.destroy()
		}

		if (json) {
			this.#write([
				...entries,
				...failures.map((failure) => fleetEntryOf(failure.name, undefined, true)),
			])
		} else {
			this.#reporter.line(fleetTotals(drifted, failedCount))
		}
		process.exitCode = drifted > 0 || failedCount > 0 ? 1 : 0
	}

	/** `scaffold catalog` — regenerate the fleet package catalog table embedded in `.claude/agents/orkestrel.md`. */
	async #catalog(values: CLIValues, json: boolean): Promise<void> {
		const target = this.#contain(values.target ?? '.', json)

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
				this.#error(error, json)
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
				this.#error(error, json)
			} finally {
				sync.destroy()
			}
			published = registryEntries.length

			let localEntries: readonly CatalogEntry[] = []
			if (explicitRoots !== undefined) {
				try {
					localEntries = catalogPackages(explicitRoots)
				} catch (error) {
					this.#error(error, json)
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
			entries = [...merged.values()].sort((a, b) =>
				a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
			)
		}

		const block = catalogToBlock(entries)
		// S3g: the LEAF write path is re-confined (same mechanism as every other
		// verb's destination) — `target` itself passed containment, but a
		// symlinked segment nested BENEATH it (e.g. a symlinked `.claude`) could
		// still let this specific path escape the cwd.
		const agentPath = this.#contain(join(target, '.claude', 'agents', 'orkestrel.md'), json)
		let current: string
		try {
			current = readFileSync(agentPath, 'utf8')
		} catch (error) {
			this.#error(
				new ScaffoldError('TARGET', `Failed to read ${agentPath}`, { path: agentPath, error }),
				json,
			)
		}

		const startMarker = '<!-- catalog:start -->'
		const endMarker = '<!-- catalog:end -->'
		const startIndex = current.indexOf(startMarker)
		const endIndex = current.indexOf(endMarker)
		if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
			this.#error(
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
			if (json) this.#write(catalogResultOf(entries, false))
			else this.#reporter.line(catalogVerdict(true))
			process.exitCode = 0
			return
		}

		if (!json) {
			this.#reporter.table(catalogTable(entries))
			const warning = catalogShrinkWarning(oldRows, entries.length)
			if (warning !== undefined) this.#reporter.line(warning)
			if (values.offline) {
				const missingDescription = entries
					.filter((entry) => entry.description.length === 0)
					.map((entry) => entry.name)
				if (missingDescription.length > 0) {
					this.#reporter.line(
						`${missingDescription.length} without guide description: ${missingDescription.join(', ')}`,
					)
				}
			} else {
				this.#reporter.line(catalogCounts(published, localOnly))
				for (const [name, note] of notes) this.#reporter.line(`  ${name}: ${note}`)
			}
		}

		const terminal = createTerminal()
		const proceed = await this.#apply(terminal, applyConfirmMessage(1), values, json)

		if (!proceed) {
			if (json) this.#write(catalogResultOf(entries, true, shrink))
			else this.#reporter.line(catalogVerdict(false))
			process.exitCode = 1
			return
		}

		try {
			writeFileSync(agentPath, updated, 'utf8')
		} catch (error) {
			this.#error(
				new ScaffoldError('TARGET', `Failed to write ${agentPath}`, { path: agentPath, error }),
				json,
			)
		}
		if (json) this.#write(catalogResultOf(entries, true, shrink))
		else this.#reporter.status('success', catalogApplySuccess(agentPath))
		process.exitCode = 0
	}

	/**
	 * The whole command dispatch — a single top-level driver (no nested function
	 * declarations, AGENTS §4). Every verb sets `process.exitCode` (never
	 * `process.exit`, H4) and returns, or `halt()`s through a `finally` that
	 * tears its entities down first; the caller at the bottom of this file
	 * catches exactly one sentinel (`CliExit`) and stops.
	 */
	async #dispatch(argv: readonly string[]): Promise<void> {
		let parsed: CLIArguments
		try {
			parsed = parseArguments(argv)
		} catch (error) {
			process.stderr.write(
				`${error instanceof Error ? error.message : INVALID_ARGUMENTS_MESSAGE}\n`,
			)
			process.exitCode = 2
			return
		}

		const { values, positionals } = parsed
		const [command, argument] = positionals
		const json = values.json === true
		this.#json = json

		if (command === undefined) {
			process.stdout.write(`${values.help ? fullHelp() : shortUsage()}\n`)
			process.exitCode = 0
			return
		}

		if (!isVerb(command)) {
			this.#usage(didYouMean(command), json)
		}

		if (command !== 'catalog' && values.from !== undefined && values.from.length > 1) {
			this.#usage(`--from may be provided only once for '${command}'`, json)
		}

		if (values.help) {
			process.stdout.write(`${verbHelp(command)}\n`)
			process.exitCode = 0
			return
		}

		if (command === 'new') return this.#new(values, argument, json)
		if (command === 'pull') return this.#pull(values, json)
		if (command === 'audit') return this.#audit(values, json)
		if (command === 'repair') return this.#repair(values, json)
		if (command === 'fleet') return this.#fleet(values, json)
		return this.#catalog(values, json)
	}
}
