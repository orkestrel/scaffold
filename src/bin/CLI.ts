import type {
	Audit,
	Blueprint,
	CatalogEntry,
	Dependency,
	DependencyPinSet,
	Environment,
	Group,
	ManifestRegionSet,
	Mirror,
	Plan,
	Question,
	Release,
} from '@src/core'
import type {
	MaterializeResult,
	MaterializerInterface,
	Worktree,
	UpstreamOptions,
} from '@src/server'
import type {
	AuditCommand,
	AuditResult,
	Baseline,
	CatalogCommand,
	CatalogResult,
	CLICommand,
	CLIInterface,
	CLIOptions,
	HostResolution,
	NewCommand,
	NewResult,
	OutputHandler,
	OverwriteCommand,
	OverwriteResult,
	Provenance,
	RepairCommand,
	RepairResult,
	TargetQuestion,
	VersionResolution,
} from './types.js'
import { renderTable, strip, stripControls } from '@orkestrel/console'
import { attempt, isRecord, isString, parseJSON } from '@orkestrel/contract'
import { createMarkdown, flattenText, isTableNode } from '@orkestrel/markdown'
import { executeSync } from '@orkestrel/process/server'
import {
	CATALOG_AGENT_PATH,
	BIN_ENTRY_PATH,
	blueprintToDevDependencies,
	blueprintToRootVite,
	blueprintToScripts,
	blueprintToTestArtifacts,
	blueprintToWritableScripts,
	CONFORMANCE_TEST_PATH,
	createBlueprint,
	Compiler,
	DEPENDENCY_NAME_PATTERN,
	ENVIRONMENTS,
	extractRangeMajor,
	GROUPS,
	GLOBAL_SETUP_PATH,
	GUIDES_TEST_PATH,
	HOST_PATHS,
	INTEGRATION_TEST_PATH,
	isDeferredPath,
	manifestToDependencies,
	manifestToName,
	MAX_MANIFEST_BYTES,
	nameToGuide,
	replaceManifestScripts,
	replacePlanRanges,
	ScaffoldError,
	SERVICE_SETUP_PATH,
	SHOWCASE_CONFIG_PATH,
} from '@src/core'
import {
	Materializer,
	Upstream,
	filesToHost,
	isExactCaseFile,
	isPhysicalDirectory,
	isWorktree,
	listFiles,
	readFileText,
	readHostFloor,
	readSnapshot,
	resolveContainedPath,
} from '@src/server'
import { EXIT_CLEAN, EXIT_DRIFT, EXIT_USAGE } from './constants.js'
import { isUsageError, UsageError } from './errors.js'
import {
	argvToCommand,
	auditToExit,
	auditToSummary,
	dependenciesToFloors,
	dependenciesToFleet,
	errorToEnvelope,
	manifestToWritableDependencies,
	releasesToExit,
	releasesToQuestions,
	renderUsage,
} from './helpers.js'

/**
 * The executable: one command line in, one exit code out.
 *
 * @remarks
 * Every destination this class writes to is a handler it was given, and the run
 * ends by returning its code rather than by setting one, so the whole executable
 * is drivable from inside another process. That is what makes proving what a
 * command prints cost a function call: `src/bin/main.ts` is the only module
 * that reads `process.argv` or assigns `process.exitCode`.
 *
 * Every line leaving here is stripped of ANSI escapes and control characters
 * once, on the way out, because a refusal quotes the argument that caused it and
 * that argument came from an untrusted command line. The machine-readable path
 * needs no second pass: `JSON.stringify` escapes a control character into text
 * before it reaches the handler.
 *
 * The collaborators are constructed per run rather than received, because
 * `--from` decides the vendored root the materializer reads and an instance
 * handed in before the command line was parsed could not honour it. The
 * upstream reader is built the same way but from the options, because no
 * command line names an endpoint: a terminal caller means the published
 * registry and the published guide host, and only the process driving the
 * executable can mean anything else. That is the seam that makes the verbs
 * which read the network provable without one.
 *
 * @example
 * ```ts
 * import { CLI } from './CLI.js'
 *
 * const lines: string[] = []
 * const code = await new CLI({ output: (line) => lines.push(line) }).execute(['--help'])
 * code // 0
 * ```
 */
export class CLI implements CLIInterface {
	// The destinations a terminal caller means. They are the only process
	// streams this class names, and it names them once: a handler is what every
	// write goes through, so the default is a handler too rather than a branch at
	// each write site.
	static readonly #stdout: OutputHandler = (line) => void process.stdout.write(`${line}\n`)
	static readonly #stderr: OutputHandler = (line) => void process.stderr.write(`${line}\n`)
	readonly #output: OutputHandler
	readonly #diagnostic: OutputHandler
	// What every upstream reader this class builds is constructed from. It is held
	// once and read by each verb that reads the network, so they
	// cannot disagree about which registry and which guide host a run addresses.
	readonly #upstream: UpstreamOptions | undefined

	/**
	 * Construct the executable over the destinations it writes to.
	 *
	 * @param options - The report and diagnostic handlers and the upstream
	 * endpoints; the process streams and the published endpoints when absent.
	 */
	constructor(options?: CLIOptions) {
		this.#output = options?.output ?? CLI.#stdout
		this.#diagnostic = options?.diagnostic ?? CLI.#stderr
		this.#upstream = options?.upstream
	}

	/**
	 * Run one command line to completion and report through the configured output.
	 *
	 * @param argv - The arguments following the executable's own name.
	 * @returns The exit code: `0` clean, `1` drift or failure, `2` a usage error.
	 *
	 * @remarks
	 * A request for usage is answered before anything is parsed, because it
	 * replaces the run rather than modifying it, and because `--help` is not an
	 * option any verb takes. Everything after that is one command: read it,
	 * dispatch it, render what it produced, and answer with the code it earned.
	 *
	 * @example
	 * ```ts
	 * import { CLI } from './CLI.js'
	 *
	 * await new CLI().execute(['audit', '--json']) // 0 when the target matches its plan
	 * ```
	 */
	async execute(argv: readonly string[]): Promise<number> {
		if (argv.includes('--help')) {
			for (const line of renderUsage()) this.#say(line)
			return EXIT_CLEAN
		}
		const read = attempt(() => argvToCommand(argv))
		// A command line that never became a command is refused in prose even when
		// the line carries `--json`, because the flag is read from the command and
		// no command was read: there is no machine-readable value for it to pollute.
		if (!read.success) return this.#refuse(read.error, false)
		const command = read.value
		try {
			return await this.#dispatch(command)
		} catch (error) {
			return this.#refuse(error, command.json === true)
		}
	}

	// One verb per branch, each answering with its own exit code. The switch is
	// exhaustive over the command union, so a new verb fails to compile here.
	async #dispatch(command: CLICommand): Promise<number> {
		switch (command.verb) {
			case 'new':
				return this.#create(command)
			case 'audit':
				return this.#inspect(command)
			case 'repair':
				return this.#restore(command)
			case 'catalog':
				return this.#refresh(command)
			case 'overwrite':
				return this.#replace(command)
		}
	}

	// `new` — resolve the declared dependencies against the registry, compile the
	// blueprint the command line describes, and write it into a vacant target.
	async #create(command: NewCommand): Promise<number> {
		const target = command.target ?? command.name
		const blueprint = createBlueprint(command.name, {
			src: this.#environments(command.src, 'src'),
			app: this.#environments(command.app, 'app'),
			bin: command.bin === true,
			setup: false,
			dependencies: this.#packages(command.dependencies).map((name) => ({
				name,
				range: '^0.0.0',
			})),
		})
		const plan = this.#compile(blueprint)
		const manifest = plan.artifacts.find(
			(artifact) => artifact.path === 'package.json' && artifact.origin !== 'host',
		)
		if (manifest === undefined || manifest.origin === 'host') {
			throw new ScaffoldError('BLOCKED', 'The compiled plan carries no replaceable manifest.')
		}
		const declarations = manifestToDependencies(manifest.content)
		const versions = await this.#versions(
			{
				runtime: dependenciesToFleet(declarations.runtime),
				development: dependenciesToFleet(declarations.development),
			},
			command.offline === true,
		)
		this.#assertVersions(versions)
		const resolved = replacePlanRanges(plan, versions.pins)
		if (resolved === undefined) {
			throw new ScaffoldError('BLOCKED', 'The compiled plan ranges could not be replaced.')
		}
		const host = await this.#host(command.from, undefined, command.offline === true)
		try {
			const result = host.materializer.materialize(resolved, target)
			const outcome: NewResult = {
				...result,
				provenance: {
					...(versions.baseline === undefined ? {} : { versions: versions.baseline }),
					...(host.baseline === undefined ? {} : { host: host.baseline }),
				},
			}
			if (command.json === true) this.#report(outcome)
			else {
				this.#say(`Scaffolded ${blueprint.name} into ${result.target}.`)
				this.#say(this.#tally(result))
			}
			if (versions.forced || host.forced) this.#reportBaselines(outcome.provenance)
			return EXIT_CLEAN
		} finally {
			host.materializer.destroy()
		}
	}

	// `audit` — compare a target to the plan its own manifest and directories
	// describe, through the vendored host a repair would write from, and write
	// nothing whatever it finds.
	//
	// The host is load-bearing here where it once was not, so `--from` reaches the
	// comparison and a host that cannot be read refuses the run under its own
	// coded reason. Refusing is the honest answer: the comparison this verb
	// reports is the hydrated one, and a fallback to the pure compile would report
	// `aligned` for exactly the files whose bytes it failed to read.
	async #inspect(command: AuditCommand): Promise<number> {
		const target = command.target ?? '.'
		const manifest = this.#manifest(target)
		const blueprint = this.#derive(target)
		const groups = this.#groups(command.groups)
		const declared = manifestToWritableDependencies(manifest, blueprint)
		const versions = await this.#versions(declared, command.offline === true)
		const questions = [
			...this.#targetQuestions(target, blueprint, groups),
			...releasesToQuestions(versions.releases),
		]
		const host = await this.#host(command.from, target, command.offline === true)
		try {
			const [measured] = this.#survey(host.materializer, blueprint, target, groups)
			const audit: Audit =
				questions.length === 0
					? measured
					: { ...measured, questions: [...measured.questions, ...questions] }
			const outcome: AuditResult = {
				...audit,
				releases: versions.releases,
				provenance: {
					...(versions.baseline === undefined ? {} : { versions: versions.baseline }),
					...(host.baseline === undefined ? {} : { host: host.baseline }),
				},
			}
			if (command.json === true) this.#report(outcome)
			else {
				this.#present(audit)
				if (command.offline !== true) this.#reportReleases(versions.releases)
			}
			if (versions.forced || host.forced) this.#reportBaselines(outcome.provenance)
			if (command.offline === true) return auditToExit(audit)
			return Math.max(
				auditToExit(audit),
				releasesToExit(versions.releases),
				versions.forced || host.forced ? EXIT_DRIFT : EXIT_CLEAN,
			)
		} finally {
			host.materializer.destroy()
		}
	}

	// `repair` — write each planned path the target is missing or has let drift,
	// then re-audit, because the audit a repair reports is the one taken after it.
	// One materializer spans the whole verb: the audit that guides the write, the
	// write, and the audit that answers for it are readings of one vendored
	// host, and a second instance could not promise they were.
	async #restore(command: RepairCommand): Promise<number> {
		const target = command.target ?? '.'
		const groups = this.#groups(command.groups)
		const blueprint = this.#derive(target)
		this.#assertTarget(target, blueprint, groups)
		const host = await this.#host(command.from, target, command.offline === true)
		try {
			const [audit, plan] = this.#survey(host.materializer, blueprint, target, groups)
			if (plan === undefined) {
				if (command.json === true) {
					this.#report({
						...audit,
						provenance: {
							...(host.baseline === undefined ? {} : { host: host.baseline }),
						},
					})
				} else this.#present(audit)
				return EXIT_DRIFT
			}
			const versions = await this.#versions(
				manifestToWritableDependencies(this.#manifest(target), blueprint),
				command.offline === true,
			)
			this.#assertVersions(versions)
			const result = this.#merge(
				host.materializer.repair(plan, audit, target),
				host.materializer.declare(
					{ pins: versions.pins, scripts: blueprintToWritableScripts(blueprint) },
					target,
				),
			)
			const terminalBlueprint = this.#derive(target)
			const [measured] = this.#survey(host.materializer, terminalBlueprint, target, groups)
			const terminal = this.#appendQuestions(measured, target, terminalBlueprint, groups)
			const outcome: RepairResult = {
				...result,
				audit: terminal,
				releases: versions.releases,
				provenance: {
					...(versions.baseline === undefined ? {} : { versions: versions.baseline }),
					...(host.baseline === undefined ? {} : { host: host.baseline }),
				},
			}
			if (command.json === true) this.#report(outcome)
			else {
				this.#present(terminal)
				this.#reportReplacements(audit, terminal)
				this.#say(this.#tally(result))
			}
			if (versions.forced || host.forced) this.#reportBaselines(outcome.provenance)
			if (command.offline !== true && (versions.forced || host.forced)) return EXIT_DRIFT
			return auditToExit(terminal)
		} finally {
			host.materializer.destroy()
		}
	}

	// `catalog` — regenerate the package table from the organization's published
	// list and refresh the guide mirrors the target draws on.
	async #refresh(command: CatalogCommand): Promise<number> {
		const target = command.target ?? '.'
		const [host, ...extra] = command.from ?? []
		if (extra.length > 0) {
			this.#warn(
				`Read the data root from ${String(host)}. The other ${String(extra.length)} local root${extra.length === 1 ? '' : 's'} named by --from reach nothing this run does.`,
			)
		}
		const previous = this.#previous(target)
		const fetched = await this.#fetch(target, command.all === true)
		const declarations = manifestToDependencies(this.#manifest(target))
		const writable: DependencyPinSet = {
			runtime: dependenciesToFleet(declarations.runtime),
			development: dependenciesToFleet(declarations.development),
		}
		const releases = this.#catalogReleases(
			[...writable.runtime, ...writable.development],
			fetched.entries,
		)
		const pins = this.#pin(releases, writable)
		this.#assertFetched(fetched.entries, fetched.mirrors)
		const guides: Baseline | undefined =
			fetched.mirrors.length === 0
				? undefined
				: fetched.mirrors.some((mirror) => mirror.lookup === 'failed')
					? 'floor'
					: 'live'
		const materializer = new Materializer({ host: host ?? readHostFloor() })
		let result: MaterializeResult
		try {
			result = this.#merge(
				this.#publish(materializer, target, fetched.entries, fetched.mirrors),
				materializer.declare({ pins, scripts: [] }, target),
			)
		} finally {
			materializer.destroy()
		}
		const outcome: CatalogResult = {
			...result,
			entries: fetched.entries,
			mirrors: fetched.mirrors,
			dropped: previous.filter((name) => !fetched.entries.some((entry) => entry.name === name)),
			releases,
			provenance: {
				versions: 'live',
				...(guides === undefined ? {} : { guides }),
			},
		}
		if (command.json === true) this.#report(outcome)
		else this.#recount(outcome)
		return guides === 'floor' ? EXIT_DRIFT : EXIT_CLEAN
	}

	// `overwrite` — everything repair and catalog do, plus the steps only this
	// verb carries. The offline half runs first and persists whatever it did,
	// because it is the destructive one: a run that cannot reach upstream still
	// leaves the target repaired and says which step it could not complete.
	async #replace(command: OverwriteCommand): Promise<number> {
		const target = command.target ?? '.'
		const groups = this.#groups(command.groups)
		const blueprint = this.#derive(target)
		this.#assertTarget(target, blueprint, groups)
		const worktree = this.#worktree(target)
		if (worktree.dirty.length > 0 && command.dirty !== true) {
			throw new ScaffoldError(
				'TARGET',
				`The target at ${target} carries ${String(worktree.dirty.length)} uncommitted change${worktree.dirty.length === 1 ? '' : 's'}. Commit them, or pass --dirty to waive the refusal.`,
				{ target, dirty: worktree.dirty.length },
			)
		}
		const host = await this.#host(command.from, target, command.offline === true)
		try {
			const [audit, plan] = this.#survey(host.materializer, blueprint, target, groups)
			if (plan === undefined) {
				if (command.json === true) {
					this.#report({
						...audit,
						provenance: {
							...(host.baseline === undefined ? {} : { host: host.baseline }),
						},
					})
				} else this.#present(audit)
				return EXIT_DRIFT
			}
			const declared: ManifestRegionSet = {
				pins: manifestToWritableDependencies(this.#manifest(target), blueprint),
				scripts: blueprintToWritableScripts(blueprint),
			}
			const repaired = host.materializer.repair(plan, audit, target)
			// The candidate set is re-derived from the plan and target, then held to
			// the audit's foreign findings. A path the plan claims is never a deletion
			// candidate, and neither is a path outside the vendored directories this
			// plan expands.
			// `--dirty` is expressed here and nowhere else: the waiver clears the
			// refusal the observed dirty set would otherwise trigger downstream, and
			// waives nothing about which paths are eligible.
			const removed = host.materializer.remove(
				plan,
				audit,
				command.dirty === true ? { tracked: worktree.tracked, dirty: [] } : worktree,
				target,
			)
			const offline = this.#merge(repaired, removed)
			const online: Omit<OverwriteResult, 'audit'> =
				command.offline === true
					? await this.#offline(host.materializer, target, declared, host.baseline)
					: await this.#reconcile(host.materializer, target, declared, host.baseline, host.forced)
			const [measured] = this.#survey(host.materializer, blueprint, target, groups)
			const terminal = this.#appendQuestions(measured, target, blueprint, groups)
			const outcome: OverwriteResult = {
				...online,
				...this.#merge(offline, online),
				audit: terminal,
			}
			if (command.json === true) this.#report(outcome)
			else {
				this.#present(terminal)
				this.#reportReplacements(audit, terminal)
				this.#recount(outcome)
				if (online.note !== undefined) this.#warn(online.note)
			}
			if (online.note !== undefined) return EXIT_DRIFT
			return auditToExit(terminal)
		} finally {
			host.materializer.destroy()
		}
	}

	// The network half of `overwrite`, collected rather than thrown: the offline
	// half has already written, so a step that cannot complete is reported as the
	// step it was instead of discarding what already landed. It writes through the
	// verb's own materializer rather than opening a second one, so every byte the
	// run lands comes from the host the caller named once.
	async #offline(
		materializer: MaterializerInterface,
		target: string,
		declared: ManifestRegionSet,
		host: Baseline | undefined,
	): Promise<Omit<OverwriteResult, 'audit'>> {
		const versions = await this.#versions(declared.pins, true)
		this.#assertVersions(versions)
		const written = materializer.declare({ pins: versions.pins, scripts: declared.scripts }, target)
		return {
			...written,
			entries: [],
			mirrors: [],
			dropped: [],
			releases: versions.releases,
			provenance: {
				...(versions.baseline === undefined ? {} : { versions: versions.baseline }),
				...(host === undefined ? {} : { host }),
			},
			note: "The catalog step did not complete: USAGE: 'catalog' does not take --offline.",
		}
	}

	async #reconcile(
		materializer: MaterializerInterface,
		target: string,
		declared: ManifestRegionSet,
		host: Baseline | undefined,
		hostForced: boolean,
	): Promise<Omit<OverwriteResult, 'audit'>> {
		const previous = this.#previous(target)
		let releases: readonly Release[] = []
		let provenance: Provenance = { ...(host === undefined ? {} : { host }) }
		try {
			const versions = await this.#versions(declared.pins, false)
			releases = versions.releases
			provenance = {
				...(versions.baseline === undefined ? {} : { versions: versions.baseline }),
				...(host === undefined ? {} : { host }),
			}
			this.#assertVersions(versions)
			const fetched = await this.#fetch(target, false)
			this.#assertFetched(fetched.entries, fetched.mirrors)
			const guides: Baseline | undefined =
				fetched.mirrors.length === 0
					? undefined
					: fetched.mirrors.some((mirror) => mirror.lookup === 'failed')
						? 'floor'
						: 'live'
			provenance = {
				...(versions.baseline === undefined ? {} : { versions: versions.baseline }),
				...(guides === undefined ? {} : { guides }),
				...(host === undefined ? {} : { host }),
			}
			const written = this.#merge(
				this.#publish(materializer, target, fetched.entries, fetched.mirrors),
				materializer.declare({ pins: versions.pins, scripts: declared.scripts }, target),
			)
			const floors: string[] = []
			if (hostForced) floors.push('host')
			if (versions.forced) floors.push('versions')
			if (guides === 'floor') floors.push('guides')
			return {
				...written,
				entries: fetched.entries,
				mirrors: fetched.mirrors,
				dropped: previous.filter((name) => !fetched.entries.some((entry) => entry.name === name)),
				releases,
				provenance,
				...(floors.length === 0
					? {}
					: {
							note: `The ${floors.join(', ')} step used the distributed floor after its upstream read did not complete.`,
						}),
			}
		} catch (error) {
			return {
				target,
				written: [],
				skipped: [],
				removed: [],
				entries: [],
				mirrors: [],
				dropped: [],
				releases,
				provenance,
				note: `The catalog step did not complete: ${errorToEnvelope(error).error.message}`,
			}
		}
	}

	// Resolve the vendored host without letting a partial repository answer reach
	// the materializer.
	async #host(
		from: string | undefined,
		target: string | undefined,
		offline: boolean,
	): Promise<HostResolution> {
		if (from !== undefined) {
			return { materializer: new Materializer({ host: from }), forced: false }
		}
		const floor = readHostFloor()
		if (offline) {
			return {
				materializer: new Materializer({ host: floor }),
				baseline: 'floor',
				forced: false,
			}
		}
		const paths = floor.manifest.entries
			.filter((entry) => !isDeferredPath(entry.destination))
			.map((entry) => entry.destination)
		const current = target === undefined ? floor.bytes : readSnapshot(target, paths)
		const upstream = new Upstream(this.#upstream)
		try {
			const files = await upstream.read(paths, current)
			const live = filesToHost(files, floor)
			return {
				materializer: new Materializer({ host: live ?? floor }),
				baseline: live === undefined ? 'floor' : 'live',
				forced: live === undefined,
			}
		} finally {
			upstream.destroy()
		}
	}

	// Resolve one whole version surface. Authoritative absence refuses, while a
	// read that did not complete selects every declaration's distributed floor.
	async #versions(declared: DependencyPinSet, offline: boolean): Promise<VersionResolution> {
		const dependencies = [...declared.runtime, ...declared.development]
		if (dependencies.length === 0) {
			return {
				releases: [],
				pins: { runtime: [], development: [] },
				forced: false,
				complete: true,
			}
		}
		const floors = dependenciesToFloors(dependencies)
		const floorPins: DependencyPinSet | undefined =
			floors === undefined
				? undefined
				: {
						runtime: floors
							.slice(0, declared.runtime.length)
							.map((release) => ({ name: release.name, range: release.range })),
						development: floors
							.slice(declared.runtime.length)
							.map((release) => ({ name: release.name, range: release.range })),
					}
		if (offline) {
			if (floors === undefined || floorPins === undefined) {
				return {
					releases: [],
					pins: { runtime: [], development: [] },
					baseline: 'floor',
					forced: false,
					complete: false,
				}
			}
			return {
				releases: floors,
				pins: floorPins,
				baseline: 'floor',
				forced: false,
				complete: true,
			}
		}
		const releases = await this.#lookup(dependencies)
		const absent = releases.filter(
			(release) => release.lookup === 'missing' || release.lookup === 'unmatched',
		)
		if (absent.length > 0) {
			return {
				releases,
				pins: { runtime: [], development: [] },
				baseline: 'live',
				forced: false,
				complete: false,
			}
		}
		const failed = releases.some((release) => release.lookup === 'failed')
		if (failed) {
			if (floorPins === undefined) {
				return {
					releases,
					pins: { runtime: [], development: [] },
					baseline: 'floor',
					forced: true,
					complete: false,
				}
			}
			return {
				releases,
				pins: floorPins,
				baseline: 'floor',
				forced: true,
				complete: true,
			}
		}
		return {
			releases,
			pins: this.#pin(releases, declared),
			baseline: 'live',
			forced: false,
			complete: true,
		}
	}

	// Refuse an incomplete version resolution before a caller opens a write.
	#assertVersions(versions: VersionResolution): void {
		if (versions.complete) return
		const names = versions.releases
			.filter((release) => release.lookup !== 'found')
			.map((release) => release.name)
		throw new ScaffoldError(
			'FETCH',
			names.length === 0
				? 'A declared dependency names no concrete floor.'
				: `The registry named no release for ${names.join(', ')}.`,
			{ names: names.length },
		)
	}

	// Measure each fleet row against the registry's newest release and each
	// foreign row against the newest release its declared major admits.
	async #lookup(declared: readonly Dependency[]): Promise<readonly Release[]> {
		if (declared.length === 0) return []
		const upstream = new Upstream(this.#upstream)
		try {
			const releases = await upstream.lookup(
				declared.map((dependency) => {
					const major = extractRangeMajor(dependency.range)
					return {
						name: dependency.name,
						range: dependency.name.startsWith('@orkestrel/')
							? '*'
							: major === undefined
								? dependency.range
								: `^${String(major)}`,
					}
				}),
			)
			return releases.map((release, index): Release => {
				const dependency = declared[index]
				if (dependency === undefined) {
					return {
						name: release.name,
						range: release.range,
						lookup: 'failed',
						note: 'the release answer has no matching declaration',
					}
				}
				return { ...release, range: dependency.range }
			})
		} finally {
			upstream.destroy()
		}
	}

	// Read the organization's published list and the guides the target draws on.
	// The workspace never fetches its own guide: that file is its own product.
	async #fetch(
		target: string,
		all: boolean,
	): Promise<{ readonly entries: readonly CatalogEntry[]; readonly mirrors: readonly Mirror[] }> {
		const manifest = this.#manifest(target)
		const own = manifestToName(manifest)
		const dependencies = manifestToDependencies(manifest)
		const declared = [
			...new Set(
				[...dependencies.runtime, ...dependencies.development, ...dependencies.peer].map(
					(dependency) => dependency.name,
				),
			),
		]
		const upstream = new Upstream(this.#upstream)
		try {
			const entries = await upstream.catalog()
			const names = (all ? entries.map((entry) => entry.name) : declared).filter(
				(name) => name !== own,
			)
			const mirrors = await upstream.fetch(names, readSnapshot(target, names.map(nameToGuide)))
			return { entries, mirrors }
		} finally {
			upstream.destroy()
		}
	}

	// Write the fetched guides to their mirrors and the published list to the
	// marker-bounded table, as one result.
	#publish(
		materializer: MaterializerInterface,
		target: string,
		entries: readonly CatalogEntry[],
		mirrors: readonly Mirror[],
	): MaterializeResult {
		return this.#merge(materializer.mirror(mirrors, target), materializer.catalog(entries, target))
	}

	// Derive declared release evidence from the catalog packuments already read.
	#catalogReleases(
		declared: readonly Dependency[],
		entries: readonly CatalogEntry[],
	): readonly Release[] {
		return declared.map((dependency): Release => {
			const entry = entries.find((candidate) => candidate.name === dependency.name)
			if (entry?.lookup === 'found') {
				return { ...dependency, lookup: 'found', latest: entry.version }
			}
			return {
				...dependency,
				lookup: entry?.lookup ?? 'missing',
				note: entry?.note ?? 'the organization catalog does not list the declared package',
			}
		})
	}

	// A catalog transaction starts only after every packument and mirror answered.
	#assertFetched(entries: readonly CatalogEntry[], mirrors: readonly Mirror[]): void {
		const failed = [
			...entries.filter((entry) => entry.lookup !== 'found').map((entry) => entry.name),
			...mirrors
				.filter((mirror) => mirror.lookup !== 'found' && mirror.lookup !== 'failed')
				.map((mirror) => mirror.name),
		]
		if (failed.length === 0) return
		throw new ScaffoldError(
			'FETCH',
			`Upstream produced no complete catalog answer for ${failed.join(', ')}.`,
			{ names: failed.length },
		)
	}

	// Build the complete pin set or refuse before any caller writes a range.
	#pin(releases: readonly Release[], declared: DependencyPinSet): DependencyPinSet {
		const refused = releases.filter((release) => release.lookup !== 'found')
		if (refused.length > 0) {
			throw new ScaffoldError(
				'FETCH',
				`The registry named no release for ${refused.map((release) => release.name).join(', ')}.`,
				{ names: refused.length },
			)
		}
		const dependencies = [...declared.runtime, ...declared.development]
		const pins: Dependency[] = []
		for (let index = 0; index < releases.length; index += 1) {
			const release = releases[index]
			const dependency = dependencies[index]
			if (release === undefined || dependency === undefined) {
				throw new ScaffoldError('FETCH', 'The release answer has no matching declaration.')
			}
			if (release.lookup !== 'found') {
				throw new ScaffoldError('FETCH', `The registry named no release for ${release.name}.`)
			}
			pins.push({ name: dependency.name, range: `^${release.latest}` })
		}
		if (pins.length !== dependencies.length) {
			throw new ScaffoldError('FETCH', 'The release answer does not match the declaration set.')
		}
		return {
			runtime: pins.slice(0, declared.runtime.length),
			development: pins.slice(declared.runtime.length),
		}
	}

	// Compile a blueprint into the plan it describes, or refuse with the questions
	// the gate raised.
	//
	// `new` is the only caller, and it chooses the shape rather than reading one, so
	// it refuses every question the gate raises, advisory or not: an advisory names
	// a workspace this package can describe honestly but will not create, and this
	// is the last moment the caller can pick a different shape. `#survey` is the
	// reading counterpart, and it carries the same advisories through instead.
	//
	// The refusal is `BLOCKED` whichever kind of question earned it, because both
	// are the one fact that code names: this blueprint will not be built. The
	// questions the message quotes are what tells them apart, and a second code
	// would be a label for a fact they already carry.
	#compile(blueprint: Blueprint, groups?: readonly Group[]): Plan {
		const compiler = new Compiler()
		try {
			const scaffolding = compiler.compile(blueprint, groups)
			if (scaffolding.plan !== undefined && scaffolding.questions.length === 0) {
				return scaffolding.plan
			}
			throw new ScaffoldError(
				'BLOCKED',
				scaffolding.questions.map((question) => `${question.field}: ${question.message}`).join(' '),
				{ questions: scaffolding.questions.length },
			)
		} finally {
			compiler.destroy()
		}
	}

	// Compile a blueprint and compare its plan to what the target holds,
	// through the vendored host a write would draw on.
	//
	// The materializer owns the comparison because it is the only one that can
	// make it: the pure compile claims presence alone, so it reads a canon file a
	// consumer has edited as aligned and a vendored directory as one missing path
	// no write could ever satisfy. Hydrating first states the bytes and expands
	// the directory into the files the host actually stores, which is the same
	// derivation the repair that follows is held to.
	//
	// The compiler answers the refused case alone. A blueprint the gate closed
	// carries no plan, so there is nothing to hydrate and nothing to say about the
	// target; the audit carries the questions instead.
	#survey(
		materializer: MaterializerInterface,
		blueprint: Blueprint,
		target: string,
		groups?: readonly Group[],
	): readonly [audit: Audit, plan: Plan | undefined] {
		const compiler = new Compiler()
		try {
			const scaffolding = compiler.compile(blueprint, groups)
			if (scaffolding.plan === undefined) return [compiler.audit(blueprint, {}, groups), undefined]
			// The materializer answers for the target and the gate answers for the
			// blueprint, so an advisory the gate raised rides the comparison rather
			// than being dropped between them. It is non-blocking, so it changes no
			// exit code and never makes an aligned target drift.
			const measured = materializer.audit(scaffolding.plan, target)
			return [
				{ ...measured, questions: [...measured.questions, ...scaffolding.questions] },
				scaffolding.plan,
			]
		} finally {
			compiler.destroy()
		}
	}

	// The blueprint a target describes about itself: manifest identity and fleet
	// packages, environment directories, and exact structural files. Vendors stay
	// unknown because their birth-owned script is not a declaration of its list.
	// The live-service project does not wait on that list: it follows its own
	// readiness module, which the root configuration names by path.
	#derive(target: string): Blueprint {
		const manifest = this.#manifest(target)
		const declared = manifestToName(manifest)
		if (declared === undefined) {
			throw new ScaffoldError('TARGET', `The manifest at ${target} declares no package name.`, {
				target,
			})
		}
		const bin = resolveContainedPath(target, BIN_ENTRY_PATH)
		const tests = resolveContainedPath(target, 'tests')
		const guides = resolveContainedPath(target, GUIDES_TEST_PATH)
		const integration = resolveContainedPath(target, INTEGRATION_TEST_PATH)
		const conformance = resolveContainedPath(target, CONFORMANCE_TEST_PATH)
		const service = resolveContainedPath(target, SERVICE_SETUP_PATH)
		const global = resolveContainedPath(target, GLOBAL_SETUP_PATH)
		const showcase = resolveContainedPath(target, SHOWCASE_CONFIG_PATH)
		return createBlueprint(declared.slice(declared.lastIndexOf('/') + 1), {
			src: this.#probe(target, 'src'),
			app: this.#probe(target, 'app'),
			dependencies: manifestToDependencies(manifest).runtime,
			bin: bin !== undefined && isExactCaseFile(bin),
			setup:
				tests !== undefined &&
				listFiles(tests).some((path) => {
					if (path.includes('/') || !path.startsWith('setup') || !path.endsWith('.test.ts')) {
						return false
					}
					const proof = resolveContainedPath(tests, path)
					return proof !== undefined && isExactCaseFile(proof)
				}),
			guides: guides !== undefined && isExactCaseFile(guides),
			integration: integration !== undefined && isExactCaseFile(integration),
			conformance: conformance !== undefined && isExactCaseFile(conformance),
			service: service !== undefined && isExactCaseFile(service),
			global: global !== undefined && isExactCaseFile(global),
			showcase: showcase !== undefined && isExactCaseFile(showcase),
		})
	}

	// Read the literal Vitest projects and npm run scripts one shell command
	// invokes. Quotes group a token but do not hide the option, while shell
	// expansions make its value unresolved and therefore refuse the write that
	// asked the question.
	#invocations(
		script: string,
	): { readonly projects: readonly string[]; readonly scripts: readonly string[] } | undefined {
		const tokens: Array<{ value: string; resolved: boolean }> = []
		let value = ''
		let resolved = true
		let started = false
		let quote: string | undefined
		for (let index = 0; index < script.length; index += 1) {
			const character = script[index]
			if (character === undefined) return undefined
			if (quote === undefined) {
				if (/\s/.test(character)) {
					if (started) tokens.push({ value, resolved })
					value = ''
					resolved = true
					started = false
					continue
				}
				if (';&|()'.includes(character)) {
					if (started) tokens.push({ value, resolved })
					const paired = script[index + 1] === character && (character === '&' || character === '|')
					tokens.push({ value: paired ? `${character}${character}` : character, resolved: true })
					value = ''
					resolved = true
					started = false
					if (paired) index += 1
					continue
				}
				if (character === '"' || character === "'") {
					quote = character
					started = true
					continue
				}
				if (character === '\\') {
					const escaped = script[index + 1]
					if (escaped === undefined) return undefined
					value += escaped
					started = true
					index += 1
					continue
				}
				if (character === '$' || character === '`' || character === '%') resolved = false
				value += character
				started = true
				continue
			}
			if (character === quote) {
				quote = undefined
				continue
			}
			if (character === '\\' && quote === '"') {
				const escaped = script[index + 1]
				if (escaped === undefined) return undefined
				value += escaped
				index += 1
				continue
			}
			if (quote === '"' && (character === '$' || character === '`' || character === '%')) {
				resolved = false
			}
			value += character
			started = true
		}
		if (quote !== undefined) return undefined
		if (started) tokens.push({ value, resolved })

		const projects: string[] = []
		const scripts: string[] = []
		for (let index = 0; index < tokens.length; index += 1) {
			const token = tokens[index]
			if (token === undefined) return undefined
			if (token.value === 'npm' && tokens[index + 1]?.value === 'run') {
				const name = tokens[index + 2]
				if (
					name === undefined ||
					!name.resolved ||
					name.value.length === 0 ||
					['&&', '||', ';', '|', '&', '(', ')'].includes(name.value)
				)
					return undefined
				scripts.push(name.value)
				index += 2
				continue
			}
			if (token.value === '--project') {
				const project = tokens[index + 1]
				if (
					project === undefined ||
					!project.resolved ||
					project.value.length === 0 ||
					['&&', '||', ';', '|', '&', '(', ')'].includes(project.value)
				)
					return undefined
				projects.push(project.value)
				index += 1
				continue
			}
			if (token.value.startsWith('--project=')) {
				const project = token.value.slice('--project='.length)
				if (!token.resolved || project.length === 0) return undefined
				projects.push(project)
				continue
			}
			if (!token.resolved && token.value.includes('--project')) return undefined
		}
		return { projects, scripts }
	}

	// Report either side of the planned-project invariant. Audit carries the
	// advisory; writing verbs turn it into the hard boundary that keeps a
	// birth-owned manifest from disagreeing with content-owned configuration.
	//
	// The subject is the manifest a write would leave, not the one on disk: a
	// script region this package writes itself is not something to ask the
	// maintainer to paste. Where the region is refused the projection is the
	// disk text, so a customized chain still raises the advisory it always did.
	#projectQuestion(
		target: string,
		blueprint: Blueprint,
		writing = false,
	): TargetQuestion | undefined {
		const text = this.#manifest(target)
		const manifest = replaceManifestScripts(text, blueprintToWritableScripts(blueprint)) ?? text
		const planned = blueprintToRootVite(blueprint)
		const parsed = parseJSON(manifest)
		const scripts = isRecord(parsed) && isRecord(parsed.scripts) ? parsed.scripts : {}
		const publishes = !isRecord(parsed) || parsed.private !== true
		const gates = publishes ? ['test', 'prepublishOnly'] : ['test']
		const gateNames = gates.join(' or ')
		const absent = new Set<string>()
		let unresolved = false
		for (const script of Object.values(scripts)) {
			if (!isString(script) || !script.includes('vitest')) continue
			const invoked = this.#invocations(script)
			if (invoked === undefined) {
				unresolved = true
				continue
			}
			for (const project of invoked.projects) {
				if (!planned.includes(`name: { label: '${project}',`)) absent.add(project)
			}
		}
		const projects = [...absent].sort()
		if (unresolved) {
			return {
				field: 'projects',
				message: `The manifest at ${target} contains a Vitest project expression that cannot be resolved statically.${projects.length === 0 ? '' : ` It also names projects the planned vite.config.ts does not register: ${projects.join(', ')}.`} ${writing ? 'The configs group is blocked. Replace the expression with a literal --project value before selecting configs, or exclude configs from --groups.' : 'Replace it with a literal --project value before relying on the planned configuration.'}`,
				blocking: false,
				groups: ['configs'],
			}
		}
		if (projects.length > 0) {
			return {
				field: 'projects',
				message: writing
					? `The configs group is blocked because the manifest at ${target} names ${projects.length === 1 ? 'a Vitest project' : 'Vitest projects'} the planned vite.config.ts does not register: ${projects.join(', ')}. Remove the ${projects.length === 1 ? 'script that names it' : 'scripts that name them'} before selecting configs, or exclude configs from --groups.`
					: `The manifest at ${target} names ${projects.length === 1 ? 'a Vitest project' : 'Vitest projects'} the planned configuration does not register: ${projects.join(', ')}. Add ${projects.length === 1 ? 'the project' : 'each project'} to vite.config.ts or remove the ${projects.length === 1 ? 'script that names it' : 'scripts that name them'}.`,
				blocking: false,
				groups: ['configs'],
			}
		}
		const expected = blueprintToScripts(blueprint)
		const expectedLines = new Map<string, string>()
		for (const [name, script] of Object.entries(expected)) {
			if (!name.startsWith('test:')) continue
			const invoked = this.#invocations(script)
			if (invoked === undefined) continue
			for (const project of invoked.projects) {
				if (project === 'probe') continue
				const direct = `test:${project}`
				const command = expected[direct]
				if (command !== undefined) {
					expectedLines.set(project, `"${direct}": ${JSON.stringify(command)},`)
				}
			}
		}

		const reachable = new Set<string>()
		const visited = new Set<string>()
		const pending = [...gates]
		while (pending.length > 0) {
			const name = pending.shift()
			if (name === undefined || visited.has(name)) continue
			visited.add(name)
			const script = scripts[name]
			if (!isString(script)) continue
			const invoked = this.#invocations(script)
			if (invoked === undefined) {
				unresolved = true
				continue
			}
			for (const project of invoked.projects) reachable.add(project)
			for (const called of invoked.scripts) {
				if (!visited.has(called)) pending.push(called)
			}
		}
		if (unresolved) {
			return {
				field: 'projects',
				message: `The manifest at ${target} contains a ${gateNames} chain that cannot be resolved statically. ${writing ? 'The configs group is blocked. Replace it with literal npm run script names before selecting configs, or exclude configs from --groups.' : 'Replace it with literal npm run script names before relying on the planned configuration.'}`,
				blocking: false,
				groups: ['configs'],
			}
		}
		const missing = [...expectedLines]
			.filter(([project]) => !reachable.has(project))
			.sort(([left], [right]) => left.localeCompare(right))
		const ungated = missing.filter(([project]) => isString(scripts[`test:${project}`]))
		if (ungated.length === 0) return undefined
		const names = ungated.map(([project]) => project)
		const declared = ungated.map(([project]) => `test:${project}`)
		return {
			field: 'projects',
			message: `${writing ? 'The configs group is blocked because ' : ''}the manifest at ${target} does not reach ${names.length === 1 ? 'a Vitest project' : 'Vitest projects'} the planned configuration registers: ${names.join(', ')}. No chain from ${gateNames} invokes ${names.length === 1 ? 'it' : 'them'}. ${declared.join(', ')} ${declared.length === 1 ? 'is' : 'are'} already declared, so the gate is missing rather than the script: invoke ${declared.length === 1 ? 'it' : 'each of them'} by name from the ${gateNames} chain.${writing ? ' Exclude configs from --groups to write another group.' : ''}`,
			blocking: false,
			groups: ['configs'],
		}
	}

	// Report the writable scripts a target has not declared. Audit owns this
	// advisory. Writing verbs reach the manifest region writer, which appends
	// absent scripts and leaves a customized script region untouched.
	#scriptQuestion(target: string, blueprint: Blueprint): TargetQuestion | undefined {
		const text = this.#manifest(target)
		const writable = blueprintToWritableScripts(blueprint)
		const parsed = parseJSON(text)
		const scripts = isRecord(parsed) && isRecord(parsed.scripts) ? parsed.scripts : {}
		const missing = writable.filter((script) => !Object.hasOwn(scripts, script.name))
		if (missing.length === 0) return undefined
		const names = missing.map((script) => script.name)
		const lines = missing.map(
			(script) => `${JSON.stringify(script.name)}: ${JSON.stringify(script.command)},`,
		)
		return {
			field: 'scripts',
			message: `The manifest at ${target} does not declare ${names.length === 1 ? 'a planned script' : 'planned scripts'}: ${names.join(', ')}. Add ${lines.length === 1 ? 'this exact script line' : 'these exact script lines'} to package.json: ${lines.join(' ')}`,
			blocking: false,
			groups: ['manifest'],
		}
	}

	// Compare planned tooling membership here. Registry release evidence owns
	// fleet range equality and foreign supported-major drift, so this question
	// reports only rows the target omitted or malformed sections it cannot read.
	#dependencyQuestion(
		target: string,
		blueprint: Blueprint,
		writing = false,
	): TargetQuestion | undefined {
		const parsed = parseJSON(this.#manifest(target))
		if (!isRecord(parsed)) return undefined
		const malformed = ['dependencies', 'devDependencies'].filter(
			(section) => parsed[section] !== undefined && !isRecord(parsed[section]),
		)
		if (malformed.length > 0) {
			return {
				field: 'dependencies',
				message: `The manifest at ${target} declares ${malformed.join(' and ')} as ${malformed.length === 1 ? 'a value' : 'values'} that ${malformed.length === 1 ? 'is' : 'are'} not ${malformed.length === 1 ? 'an object' : 'objects'}. ${writing ? `The configs and tests groups are blocked. Replace ${malformed.length === 1 ? 'it' : 'them'} with ${malformed.length === 1 ? 'an object' : 'objects'} before selecting configs or tests, or exclude those groups from --groups.` : `Replace ${malformed.length === 1 ? 'it' : 'them'} with ${malformed.length === 1 ? 'an object' : 'objects'} before relying on the planned dependency set.`}`,
				blocking: false,
				groups: ['configs', 'tests'],
			}
		}
		const dependencies = isRecord(parsed.dependencies) ? parsed.dependencies : {}
		const development = isRecord(parsed.devDependencies) ? parsed.devDependencies : {}
		const missing = Object.entries(blueprintToDevDependencies(blueprint))
			.filter(([name]) => !Object.hasOwn(dependencies, name) && !Object.hasOwn(development, name))
			.sort(([left], [right]) => left.localeCompare(right))
		if (missing.length === 0) return undefined
		const names = missing.map(([name]) => name)
		const lines = missing.map(
			([name, range]) => `${JSON.stringify(name)}: ${JSON.stringify(range)},`,
		)
		return {
			field: 'dependencies',
			message: `The manifest at ${target} does not declare ${names.length === 1 ? 'a planned dependency' : 'planned dependencies'}: ${names.join(', ')}. ${writing ? 'The configs and tests groups are blocked. Add' : 'Add'} ${lines.length === 1 ? 'this exact dependency line' : 'these exact dependency lines'} to dependencies or devDependencies in package.json: ${lines.join(' ')}${writing ? ' Add the dependency before selecting configs or tests, or exclude those groups from --groups.' : ''}`,
			blocking: false,
			groups: ['configs', 'tests'],
		}
	}

	// Report a setup surface no proof covers. The reading is the target's own
	// tests directory rather than the plan, because scaffold writes no setup
	// proof: `.claude/rules/tests.md` fixes that proof's subject as the behavior
	// a workspace's own helpers export, and no generated file can assert that.
	//
	// A module counts as filled when its text differs from the seed this blueprint
	// plans at that same path, with both sides read trimmed. The seeds differ by
	// path: `tests/setup.ts` is seeded with the empty string, and
	// `tests/setupGlobal.ts` is seeded with a `setup` function body. So emptiness
	// alone would raise the question against a workspace scaffold had
	// materialized, and the planned seed is what the text is held to instead. It
	// stays a text comparison because `typescript` is a development dependency
	// here, so `src/` cannot parse a module to count what it exports, and scanning
	// the text for the keyword would be a second source-language analyzer that is
	// wrong about comments and strings.
	//
	// Coverage is read per module: `tests/<name>.ts` is covered by
	// `tests/<name>.test.ts` and by nothing else, which is the pairing the vendored
	// policy proof resolves through `stemToPolicyCandidates`. Keying the silence on
	// the presence of any setup proof instead would retire the question on the
	// first proof a maintainer writes and leave every other module uncovered with
	// no further signal.
	//
	// A vendored module is excluded because `repair` restores it in every target,
	// so a question naming one would fire everywhere and name nothing the
	// maintainer owns.
	//
	// Audit alone raises this. A writing verb refuses an advisory whose next step
	// would replace planned configuration, and this one names nothing scaffold
	// plans, so refusing a repair over it would block a write on a gap no write
	// could close.
	#setupQuestion(target: string, blueprint: Blueprint): TargetQuestion | undefined {
		const tests = resolveContainedPath(target, 'tests')
		if (tests === undefined) return undefined
		const entries = listFiles(tests).filter((path) => !path.includes('/'))
		const proofs = new Set(entries.filter((path) => path.endsWith('.test.ts')))
		const seeds = new Map(
			blueprintToTestArtifacts(blueprint).map(({ path, content }) => [path, content.trim()]),
		)
		const modules = entries
			.filter((path) => {
				if (!path.startsWith('setup') || !path.endsWith('.ts')) return false
				if (path.endsWith('.test.ts') || HOST_PATHS.includes(`tests/${path}`)) return false
				if (proofs.has(`${path.slice(0, -'.ts'.length)}.test.ts`)) return false
				if (resolveContainedPath(tests, path) === undefined) return false
				const content = (readFileText(tests, path) ?? '').trim()
				return content !== '' && content !== (seeds.get(`tests/${path}`) ?? '')
			})
			.sort()
		if (modules.length === 0) return undefined
		const single = modules.length === 1
		const named = modules.map((path) => `tests/${path}`).join(', ')
		const remedies = modules
			.map((path) => `tests/${path.slice(0, -'.ts'.length)}.test.ts`)
			.join(', ')
		// The remedy asks for coverage, which is the fact the preceding filter decides.
		// It does not say what the proof asserts: the reading is text against a
		// seed, so a module that exports nothing and only registers a hook reaches
		// here, and a remedy demanding a proof of exported behavior leaves that
		// maintainer a permanent advisory or a proof that measures nothing.
		const remedy = single
			? `Add ${remedies} to cover it.`
			: `Add ${remedies}, each covering the module of the same name.`
		return {
			field: 'setup',
			message: `The target at ${target} carries ${single ? 'a test setup module' : 'test setup modules'} that no proof covers: ${named}. ${remedy} The proof's subject is behavior only this workspace can assert, so scaffold does not write it.`,
			blocking: false,
			groups: ['tests'],
		}
	}

	// Collect the target questions in a fixed order so audit reports every
	// independent advisory and writing verbs refuse the ones a write would act on.
	#targetQuestions(
		target: string,
		blueprint: Blueprint,
		groups: readonly Group[] | undefined,
		writing = false,
	): readonly Question[] {
		const questions: TargetQuestion[] = []
		if (!writing) {
			const script = this.#scriptQuestion(target, blueprint)
			if (script !== undefined) questions.push(script)
		}
		const project = this.#projectQuestion(target, blueprint, writing)
		if (project !== undefined) questions.push(project)
		const dependency = this.#dependencyQuestion(target, blueprint, writing)
		if (dependency !== undefined) questions.push(dependency)
		if (!writing) {
			const setup = this.#setupQuestion(target, blueprint)
			if (setup !== undefined) questions.push(setup)
		}
		return questions
			.filter(
				(question) =>
					groups === undefined || question.groups.some((group) => groups.includes(group)),
			)
			.map(({ field, message, blocking, candidates }): Question => ({
				field,
				message,
				blocking,
				...(candidates === undefined ? {} : { candidates }),
			}))
	}

	// Append the audit-only target advisories to a measured filesystem audit.
	// Writing verbs use this after their manifest region attempt, so a refused
	// customized region reports the scripts it left absent.
	#appendQuestions(
		audit: Audit,
		target: string,
		blueprint: Blueprint,
		groups: readonly Group[] | undefined,
	): Audit {
		const questions = this.#targetQuestions(target, blueprint, groups)
		return questions.length === 0
			? audit
			: { ...audit, questions: [...audit.questions, ...questions] }
	}

	// Writing verbs refuse the project and dependency advisories because their
	// next step would replace planned configuration. The audit-only scripts
	// advisory does not enter this boundary; the manifest region writer owns it.
	#assertTarget(target: string, blueprint: Blueprint, groups: readonly Group[] | undefined): void {
		const questions = this.#targetQuestions(target, blueprint, groups, true)
		if (questions.length === 0) return
		throw new ScaffoldError('TARGET', questions.map((question) => question.message).join(' '), {
			target,
		})
	}

	// A target's manifest text, which every reading verb needs before it can say
	// anything about the target at all.
	#manifest(target: string): string {
		const manifest = readFileText(target, 'package.json', MAX_MANIFEST_BYTES)
		if (manifest === undefined) {
			throw new ScaffoldError('TARGET', `The target at ${target} carries no readable manifest.`, {
				target,
			})
		}
		return manifest
	}

	// The environments one axis physically ships, read as directories rather than
	// declared, because a directory is the fact and a declaration would be a
	// second copy of it free to disagree.
	#probe(target: string, axis: string): readonly Environment[] {
		return ENVIRONMENTS.filter((environment) => {
			const full = resolveContainedPath(target, `${axis}/${environment}`)
			return full !== undefined && isPhysicalDirectory(full)
		})
	}

	// The packages the target's catalog table listed before this run. Read through
	// the declared markdown parser rather than by pattern, so a row is a row
	// because the document says so.
	#previous(target: string): readonly string[] {
		const text = readFileText(target, CATALOG_AGENT_PATH)
		if (text === undefined) return []
		const names: string[] = []
		for (const table of createMarkdown(text).filter(isTableNode)) {
			for (const row of table.rows) {
				const [cell] = row
				if (cell === undefined) continue
				const name = cell.map(flattenText).join('').trim()
				if (DEPENDENCY_NAME_PATTERN.test(name)) names.push(name)
			}
		}
		return names
	}

	// What git reports about the target's working tree. Deletion draws only on
	// what git tracks and refuses a tree carrying uncommitted work, so a target
	// that is not a repository has no recovery mechanism and is refused here.
	#worktree(target: string): Worktree {
		const tracked = this.#inventory(target, ['ls-files', '-z'])
		const dirty = this.#inventory(target, [
			'status',
			'--porcelain=v1',
			'--untracked-files=all',
			'-z',
		]).map((record) => (record.length > 3 && record[2] === ' ' ? record.slice(3) : record))
		const state = { tracked, dirty }
		if (!isWorktree(state)) {
			throw new ScaffoldError('TARGET', `The git state at ${target} is not a readable inventory.`, {
				target,
				tracked: tracked.length,
				dirty: dirty.length,
			})
		}
		return state
	}

	// One git query, answered as its NUL-separated records. Git is asked rather
	// than reimplemented, because the tracked set and the dirty set are git's own
	// answers and nothing else can give them. `executeSync` resolves the bare `git`
	// name against `PATH` and `PATHEXT` on Windows, never through a shell, so the
	// query runs without an extension of its own.
	#inventory(target: string, args: readonly string[]): readonly string[] {
		// A failed run resolves instead of throwing, so this class stays the owner of
		// what leaves it: git's own refusal is buffered into the result rather than
		// written onto a stream nobody chose, and the failure is reported through the
		// diagnostic handler the caller supplied.
		const result = executeSync(
			{ file: 'git', arguments: [...args] },
			{ workspace: target, limit: MAX_MANIFEST_BYTES, strict: false },
		)
		if (result.failed) {
			throw new ScaffoldError('TARGET', `The target at ${target} is not a git repository.`, {
				target,
			})
		}
		return result.stdout.split('\0').filter((record) => record.length > 0)
	}

	// The environments a comma-separated selection names, refused by name when it
	// names something that is not one.
	#environments(selection: string | undefined, axis: string): readonly Environment[] {
		if (selection === undefined) return []
		const requested = selection.split(',')
		const refused = requested.filter(
			(name) => !ENVIRONMENTS.some((environment) => environment === name),
		)
		if (refused.length > 0) {
			throw new UsageError(
				`'--${axis}' does not take ${refused.join(', ')}. It takes ${ENVIRONMENTS.join(', ')}.`,
			)
		}
		return ENVIRONMENTS.filter((environment) => requested.includes(environment))
	}

	// The groups a comma-separated selection names; absence covers every group.
	#groups(selection: string | undefined): readonly Group[] | undefined {
		if (selection === undefined) return undefined
		const requested = selection.split(',')
		const refused = requested.filter((name) => !GROUPS.some((group) => group === name))
		if (refused.length > 0) {
			throw new UsageError(
				`'--groups' does not take ${refused.join(', ')}. It takes ${GROUPS.join(', ')}.`,
			)
		}
		return GROUPS.filter((group) => requested.includes(group))
	}

	// The fleet packages a comma-separated selection names.
	#packages(selection: string | undefined): readonly string[] {
		if (selection === undefined) return []
		const requested = selection.split(',')
		const refused = requested.filter((name) => !DEPENDENCY_NAME_PATTERN.test(name))
		if (refused.length > 0) {
			throw new UsageError(
				`'--deps' does not take ${refused.join(', ')}. Every name is a published @orkestrel package.`,
			)
		}
		return requested
	}

	// The results of one run, read as one. Written and skipped never overlap
	// across the calls a verb makes, because each call answers for its own paths.
	#merge(first: MaterializeResult, second: MaterializeResult): MaterializeResult {
		return {
			target: first.target,
			written: [...first.written, ...second.written],
			skipped: [...first.skipped, ...second.skipped],
			removed: [...first.removed, ...second.removed],
		}
	}

	// Name every surface baseline after a network read forced a floor.
	#reportBaselines(provenance: Provenance): void {
		const baselines: string[] = []
		if (provenance.versions !== undefined) {
			baselines.push(`versions=${provenance.versions}`)
		}
		if (provenance.guides !== undefined) baselines.push(`guides=${provenance.guides}`)
		if (provenance.host !== undefined) baselines.push(`host=${provenance.host}`)
		this.#warn(`Upstream fallback selected the distributed baseline: ${baselines.join(', ')}.`)
	}

	// The audit as a person reads it: every advisory first, then one row per path
	// that differs, then the summary. An aligned path is not listed, because a
	// report of everything that is fine is a report nobody reads.
	#present(audit: Audit): void {
		for (const question of audit.questions) this.#warn(`${question.field}: ${question.message}`)
		const rows = audit.findings
			.filter((finding) => finding.drift !== 'aligned')
			.map((finding) => [finding.path, finding.group, finding.drift])
		if (rows.length > 0) {
			const table = renderTable({
				columns: [{ label: 'path' }, { label: 'group' }, { label: 'drift' }],
				rows,
			})
			for (const line of table.split('\n')) this.#say(line)
		}
		this.#say(auditToSummary(audit))
	}

	// Report failed release reads and exact fleet drift beside the audit.
	#reportReleases(releases: readonly Release[]): void {
		for (const release of releases) {
			if (release.lookup !== 'found') {
				this.#warn(`${release.name}: ${release.note}`)
				continue
			}
			if (release.name.startsWith('@orkestrel/') && release.range !== `^${release.latest}`) {
				this.#warn(`${release.name}: ${release.range} differs from ^${release.latest}.`)
			}
		}
	}

	// Name each stale content path the verb replaced, beside the line-count
	// difference between the bytes it audited and the bytes its terminal audit
	// read back. Missing paths are creations and never enter this report.
	#reportReplacements(before: Audit, after: Audit): void {
		const terminal = new Map(after.findings.map((finding) => [finding.path, finding]))
		for (const finding of before.findings) {
			if (finding.drift !== 'stale') continue
			const current = terminal.get(finding.path)
			if (current?.drift !== 'aligned' || current.observed === undefined) continue
			const previousLines = Buffer.from(finding.observed, 'hex')
				.toString('utf8')
				.split(/\r\n|\r|\n/u).length
			const currentLines = Buffer.from(current.observed, 'hex')
				.toString('utf8')
				.split(/\r\n|\r|\n/u).length
			const delta = currentLines - previousLines
			if (delta === 0) {
				this.#say(`${finding.path} replaced (0-line delta).`)
				continue
			}
			const count = Math.abs(delta)
			this.#say(
				`${finding.path} replaced (${String(count)} line${count === 1 ? '' : 's'} ${delta > 0 ? 'added' : 'removed'}).`,
			)
		}
	}

	// The catalog outcome as a person reads it.
	#recount(result: CatalogResult): void {
		this.#say(this.#tally(result))
		this.#say(
			`${String(result.entries.length)} published, ${String(result.mirrors.filter((mirror) => mirror.lookup === 'found').length)} guide${result.mirrors.length === 1 ? '' : 's'} fetched, ${String(result.dropped.length)} no longer listed.`,
		)
		for (const mirror of result.mirrors) {
			if (mirror.lookup !== 'found') this.#warn(`${mirror.name}: ${mirror.note}`)
		}
	}

	// One line stating what a mutation did.
	#tally(result: MaterializeResult): string {
		return `${String(result.written.length)} written, ${String(result.skipped.length)} unchanged, ${String(result.removed.length)} removed in ${result.target}.`
	}

	// The one machine-readable value a `--json` run emits.
	#report(value: unknown): void {
		this.#say(JSON.stringify(value))
	}

	// Report a refusal under the code it carries and answer with the code it
	// earned: a command line that was not a command is a usage error, and
	// everything else is a failed run.
	#refuse(error: unknown, json: boolean): number {
		const envelope = errorToEnvelope(error)
		if (json) this.#report(envelope)
		else this.#warn(`${envelope.error.code}: ${envelope.error.message}`)
		return isUsageError(error) ? EXIT_USAGE : EXIT_DRIFT
	}

	#say(line: string): void {
		this.#output(this.#sanitize(line))
	}

	#warn(line: string): void {
		this.#diagnostic(this.#sanitize(line))
	}

	// The single write path, and the only place hostile bytes are answered for.
	// A refusal quotes the argument that caused it, so an escape sequence, a bell,
	// or a forged second line arrives here inside otherwise ordinary prose. ANSI
	// escapes go first because they are what repaints a terminal, control
	// characters next, and what remains is folded onto one line because a handler
	// takes one line and a caller writing a record per call must get one record.
	#sanitize(line: string): string {
		return stripControls(strip(line)).split(/\r?\n/).join(' ')
	}
}
