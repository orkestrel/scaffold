import type {
	Audit,
	Blueprint,
	CatalogEntry,
	Dependency,
	Environment,
	Group,
	Mirror,
	Plan,
	Question,
	Release,
} from '@src/core'
import type {
	MaterializeResult,
	MaterializerInterface,
	Repository,
	UpstreamOptions,
} from '@src/server'
import type {
	AuditCommand,
	CatalogCommand,
	CatalogResult,
	CLICommand,
	CLIInterface,
	CLIOptions,
	NewCommand,
	OutputHandler,
	OverwriteCommand,
	OverwriteResult,
	RepairCommand,
	RepairResult,
} from './types.js'
import { execFileSync } from 'node:child_process'
import { renderTable, strip, stripControls } from '@orkestrel/console'
import { attempt, isRecord, isString, parseJSON } from '@orkestrel/contract'
import { createMarkdown, flattenText, isTableNode } from '@orkestrel/markdown'
import {
	CATALOG_AGENT_PATH,
	BIN_ENTRY_PATH,
	blueprintToRootVite,
	createBlueprint,
	createCompiler,
	DEPENDENCY_NAME_PATTERN,
	ENVIRONMENTS,
	GROUPS,
	GLOBAL_SETUP_PATH,
	GUIDES_TEST_PATH,
	INTEGRATION_TEST_PATH,
	manifestToDependencies,
	manifestToName,
	MAX_MANIFEST_BYTES,
	nameToGuide,
	ScaffoldError,
	SHOWCASE_CONFIG_PATH,
} from '@src/core'
import {
	createMaterializer,
	createUpstream,
	isExactCaseFile,
	isPhysicalDirectory,
	isRepository,
	readFileText,
	readSnapshot,
	resolveContainedPath,
} from '@src/server'
import { EXIT_CLEAN, EXIT_DRIFT, EXIT_USAGE } from './constants.js'
import { isUsageError, UsageError } from './errors.js'
import {
	argvToCommand,
	auditToExit,
	auditToSummary,
	errorToEnvelope,
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
 * executable can mean anything else. That is the seam that makes the three
 * verbs which read the network provable without one.
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
	// The two destinations a terminal caller means. They are the only process
	// streams this class names, and it names them once: a handler is what every
	// write goes through, so the default is a handler too rather than a branch at
	// each write site.
	static readonly #stdout: OutputHandler = (line) => void process.stdout.write(`${line}\n`)
	static readonly #stderr: OutputHandler = (line) => void process.stderr.write(`${line}\n`)
	readonly #output: OutputHandler
	readonly #diagnostic: OutputHandler
	// What every upstream reader this class builds is constructed from. It is held
	// once and read by each verb that reads the network, so the three of them
	// cannot disagree about which registry and which guide host a run addresses.
	readonly #upstream: UpstreamOptions | undefined

	/**
	 * Construct the executable over the two destinations it writes to.
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
		// A command line that never became a command carries no `--json`, so the
		// refusal is prose: there is no machine-readable value for it to pollute.
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
			dependencies: await this.#resolve(this.#packages(command.dependencies)),
		})
		const plan = this.#compile(blueprint)
		const materializer = createMaterializer(
			command.from === undefined ? undefined : { host: command.from },
		)
		try {
			const result = materializer.materialize(plan, target)
			if (command.json === true) this.#report(result)
			else {
				this.#say(`Scaffolded ${blueprint.name} into ${result.target}.`)
				this.#say(this.#tally(result))
			}
			return EXIT_CLEAN
		} finally {
			materializer.destroy()
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
	#inspect(command: AuditCommand): number {
		const target = command.target ?? '.'
		const blueprint = this.#derive(target)
		const question = this.#projectQuestion(target, blueprint)
		const materializer = createMaterializer(
			command.from === undefined ? undefined : { host: command.from },
		)
		try {
			const [measured] = this.#survey(materializer, blueprint, target, this.#groups(command.groups))
			const audit: Audit =
				question === undefined
					? measured
					: { ...measured, questions: [...measured.questions, question] }
			if (command.json === true) this.#report(audit)
			else this.#present(audit)
			return auditToExit(audit)
		} finally {
			materializer.destroy()
		}
	}

	// `repair` — write each planned path the target is missing or has let drift,
	// then re-audit, because the audit a repair reports is the one taken after it.
	// One materializer spans the whole verb: the audit that guides the write, the
	// write, and the audit that answers for it are three readings of one vendored
	// host, and a second instance could not promise they were.
	#restore(command: RepairCommand): number {
		const target = command.target ?? '.'
		const groups = this.#groups(command.groups)
		const blueprint = this.#derive(target)
		this.#assertProjects(target, blueprint)
		const materializer = createMaterializer(
			command.from === undefined ? undefined : { host: command.from },
		)
		try {
			const [audit, plan] = this.#survey(materializer, blueprint, target, groups)
			if (plan === undefined) {
				if (command.json === true) this.#report(audit)
				else this.#present(audit)
				return EXIT_DRIFT
			}
			const result = materializer.repair(plan, audit, target)
			const [terminal] = this.#survey(materializer, blueprint, target, groups)
			const outcome: RepairResult = { ...result, audit: terminal }
			if (command.json === true) this.#report(outcome)
			else {
				this.#present(terminal)
				this.#say(this.#tally(result))
			}
			return auditToExit(terminal)
		} finally {
			materializer.destroy()
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
		const materializer = createMaterializer(host === undefined ? undefined : { host })
		let result: MaterializeResult
		try {
			result = this.#publish(materializer, target, fetched.entries, fetched.mirrors)
		} finally {
			materializer.destroy()
		}
		const outcome: CatalogResult = {
			...result,
			entries: fetched.entries,
			mirrors: fetched.mirrors,
			dropped: previous.filter((name) => !fetched.entries.some((entry) => entry.name === name)),
		}
		if (command.json === true) this.#report(outcome)
		else this.#recount(outcome)
		return fetched.mirrors.some((mirror) => mirror.lookup === 'failed') ? EXIT_DRIFT : EXIT_CLEAN
	}

	// `overwrite` — everything repair and catalog do, plus the two steps only this
	// verb carries. The offline half runs first and persists whatever it did,
	// because it is the destructive one: a run that cannot reach upstream still
	// leaves the target repaired and says which step it could not complete.
	async #replace(command: OverwriteCommand): Promise<number> {
		const target = command.target ?? '.'
		const groups = this.#groups(command.groups)
		const blueprint = this.#derive(target)
		this.#assertProjects(target, blueprint)
		const repository = this.#repository(target)
		if (repository.dirty.length > 0 && command.dirty !== true) {
			throw new ScaffoldError(
				'TARGET',
				`The target at ${target} carries ${String(repository.dirty.length)} uncommitted change${repository.dirty.length === 1 ? '' : 's'}. Commit them, or pass --dirty to waive the refusal.`,
				{ target, dirty: repository.dirty.length },
			)
		}
		const materializer = createMaterializer(
			command.from === undefined ? undefined : { host: command.from },
		)
		try {
			const [audit, plan] = this.#survey(materializer, blueprint, target, groups)
			if (plan === undefined) {
				if (command.json === true) this.#report(audit)
				else this.#present(audit)
				return EXIT_DRIFT
			}
			const repaired = materializer.repair(plan, audit, target)
			// The candidate set is the audit's own foreign findings, so a path the
			// plan claims is never a deletion candidate whatever the tree holds, and
			// neither is a path outside the vendored directories this plan expands.
			// `--dirty` is expressed here and nowhere else: the waiver clears the
			// refusal the observed dirty set would otherwise trigger downstream, and
			// waives nothing about which paths are eligible.
			const removed = materializer.remove(
				audit,
				command.dirty === true ? { tracked: repository.tracked, dirty: [] } : repository,
				target,
			)
			const offline = this.#merge(repaired, removed)
			const online = await this.#reconcile(materializer, target, blueprint.dependencies)
			const [terminal] = this.#survey(materializer, blueprint, target, groups)
			const outcome: OverwriteResult = {
				...online,
				...this.#merge(offline, online),
				audit: terminal,
			}
			if (command.json === true) this.#report(outcome)
			else {
				this.#present(terminal)
				this.#recount(outcome)
				if (online.note !== undefined) this.#warn(online.note)
			}
			if (online.note !== undefined) return EXIT_DRIFT
			return auditToExit(terminal)
		} finally {
			materializer.destroy()
		}
	}

	// The network half of `overwrite`, collected rather than thrown: the offline
	// half has already written, so a step that cannot complete is reported as the
	// step it was instead of discarding what already landed. It writes through the
	// verb's own materializer rather than opening a second one, so every byte the
	// run lands comes from the host the caller named once.
	async #reconcile(
		materializer: MaterializerInterface,
		target: string,
		declared: readonly Dependency[],
	): Promise<Omit<OverwriteResult, 'audit'>> {
		const previous = this.#previous(target)
		try {
			const releases = await this.#lookup(declared)
			const fetched = await this.#fetch(target, false)
			const written = this.#merge(
				this.#publish(materializer, target, fetched.entries, fetched.mirrors),
				materializer.declare(this.#pin(releases), target),
			)
			return {
				...written,
				entries: fetched.entries,
				mirrors: fetched.mirrors,
				dropped: previous.filter((name) => !fetched.entries.some((entry) => entry.name === name)),
				releases,
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
				releases: [],
				note: `The catalog step did not complete: ${errorToEnvelope(error).error.message}`,
			}
		}
	}

	// Measure each declared range against the registry's latest release.
	async #lookup(declared: readonly Dependency[]): Promise<readonly Release[]> {
		const upstream = createUpstream(this.#upstream)
		try {
			return await upstream.lookup(declared)
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
		const declared = manifestToDependencies(manifest).map((dependency) => dependency.name)
		const upstream = createUpstream(this.#upstream)
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

	// The ranges a found release pins. A lookup that produced no answer names no
	// version, so it is left declared as it stands rather than rewritten to a
	// guess.
	#pin(releases: readonly Release[]): readonly Dependency[] {
		const pinned: Dependency[] = []
		for (const release of releases) {
			if (release.lookup === 'found')
				pinned.push({ name: release.name, range: `^${release.latest}` })
		}
		return pinned
	}

	// Compile a blueprint into the plan it describes, or refuse with the questions
	// the gate raised.
	//
	// `new` is the only caller, and it chooses the shape rather than reading one, so
	// it refuses every question the gate raises, advisory or not: an advisory names
	// a workspace this package can describe honestly and should not create, and this
	// is the last moment the caller can pick a different shape. `#survey` is the
	// reading counterpart, and it carries the same advisories through instead.
	#compile(blueprint: Blueprint, groups?: readonly Group[]): Plan {
		const compiler = createCompiler()
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

	// Compile a blueprint and compare its plan to what the target currently holds,
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
		const compiler = createCompiler()
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
	// packages, environment directories, and exact structural files. Services stay
	// unknown because their birth-owned script is not a declaration of its list.
	#derive(target: string): Blueprint {
		const manifest = this.#manifest(target)
		const declared = manifestToName(manifest)
		if (declared === undefined) {
			throw new ScaffoldError('TARGET', `The manifest at ${target} declares no package name.`, {
				target,
			})
		}
		const bin = resolveContainedPath(target, BIN_ENTRY_PATH)
		const integration = resolveContainedPath(target, INTEGRATION_TEST_PATH)
		const global = resolveContainedPath(target, GLOBAL_SETUP_PATH)
		const showcase = resolveContainedPath(target, SHOWCASE_CONFIG_PATH)
		return createBlueprint(declared.slice(declared.lastIndexOf('/') + 1), {
			src: this.#probe(target, 'src'),
			app: this.#probe(target, 'app'),
			dependencies: manifestToDependencies(manifest),
			bin: bin !== undefined && isExactCaseFile(bin),
			integration: integration !== undefined && isExactCaseFile(integration),
			global: global !== undefined && isExactCaseFile(global),
			showcase: showcase !== undefined && isExactCaseFile(showcase),
		})
	}

	// Read literal Vitest project values from one shell command. Quotes group a
	// token but do not hide the option, while shell expansions make its value
	// unresolved and therefore refuse the write that asked the question.
	#scriptProjects(script: string): readonly string[] | undefined {
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
		for (let index = 0; index < tokens.length; index += 1) {
			const token = tokens[index]
			if (token === undefined) return undefined
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
		return projects
	}

	// Report the manifest's Vitest calls that the planned root configuration
	// cannot register. Audit carries the advisory; writing verbs turn it into the
	// hard boundary that keeps a birth-owned script from pointing at a project
	// their content-owned configuration removed.
	#projectQuestion(target: string, blueprint: Blueprint, writing = false): Question | undefined {
		const manifest = this.#manifest(target)
		const guides = resolveContainedPath(target, GUIDES_TEST_PATH)
		const planned = blueprintToRootVite(blueprint)
		const parsed = parseJSON(manifest)
		const scripts = isRecord(parsed) && isRecord(parsed.scripts) ? parsed.scripts : undefined
		const absent = new Set<string>()
		let unresolved = false
		if (scripts !== undefined) {
			for (const script of Object.values(scripts)) {
				if (!isString(script) || !script.includes('vitest')) continue
				const projects = this.#scriptProjects(script)
				if (projects === undefined) {
					unresolved = true
					continue
				}
				for (const project of projects) {
					const guide = project === 'guides' && guides !== undefined && isExactCaseFile(guides)
					if (
						!planned.includes(`name: { label: '${project}',`) ||
						(project === 'guides' && !guide)
					) {
						absent.add(project)
					}
				}
			}
		}
		if (absent.size === 0 && !unresolved) return undefined
		const projects = [...absent].sort()
		if (unresolved) {
			return {
				field: 'projects',
				message: `The manifest at ${target} contains a Vitest project expression that cannot be resolved statically.${projects.length === 0 ? '' : ` It also names projects the planned configuration does not register: ${projects.join(', ')}.`} ${writing ? 'Replace it with a literal --project value or remove the script before using a scaffold writing verb.' : 'Replace it with a literal --project value before relying on the planned configuration.'}`,
				blocking: false,
			}
		}
		return {
			field: 'projects',
			message: writing
				? `The manifest at ${target} names ${projects.length === 1 ? 'a Vitest project' : 'Vitest projects'} the planned configuration does not register: ${projects.join(', ')}. To continue, remove the ${projects.length === 1 ? 'script that names it' : 'scripts that name them'} or do not use scaffold writing verbs on a workspace that needs ${projects.length === 1 ? 'a custom Vitest project' : 'custom Vitest projects'}.`
				: `The manifest at ${target} names ${projects.length === 1 ? 'a Vitest project' : 'Vitest projects'} the planned configuration does not register: ${projects.join(', ')}. Add ${projects.length === 1 ? 'the project' : 'each project'} to vite.config.ts or remove the ${projects.length === 1 ? 'script that names it' : 'scripts that name them'}.`,
			blocking: false,
		}
	}

	// Writing verbs refuse the advisory because their next step would replace the
	// configuration. Audit alone may report it without changing the target.
	#assertProjects(target: string, blueprint: Blueprint): void {
		const question = this.#projectQuestion(target, blueprint, true)
		if (question === undefined) return
		throw new ScaffoldError('TARGET', question.message, { target })
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
	#repository(target: string): Repository {
		const tracked = this.#inventory(target, ['ls-files', '-z'])
		const dirty = this.#inventory(target, [
			'status',
			'--porcelain=v1',
			'--untracked-files=all',
			'-z',
		]).map((record) => (record.length > 3 && record[2] === ' ' ? record.slice(3) : record))
		const state = { tracked, dirty }
		if (!isRepository(state)) {
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
	// answers and nothing else can give them.
	#inventory(target: string, args: readonly string[]): readonly string[] {
		const read = attempt(() =>
			execFileSync('git', [...args], {
				cwd: target,
				encoding: 'utf8',
				windowsHide: true,
				maxBuffer: MAX_MANIFEST_BYTES,
				// git writes its own refusal to its own stderr, and this class owns
				// what leaves it: a failure is reported through the diagnostic handler
				// the caller supplied, never straight onto a stream nobody chose.
				stdio: ['ignore', 'pipe', 'ignore'],
			}),
		)
		if (!read.success) {
			throw new ScaffoldError('TARGET', `The target at ${target} is not a git repository.`, {
				target,
			})
		}
		return read.value.split('\0').filter((record) => record.length > 0)
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

	// Pin each named package to the registry's latest release. A name upstream
	// cannot answer for is refused rather than pinned to an invented range: the
	// workspace would carry a dependency that does not resolve.
	async #resolve(names: readonly string[]): Promise<readonly Dependency[]> {
		if (names.length === 0) return []
		const upstream = createUpstream(this.#upstream)
		let releases: readonly Release[]
		try {
			releases = await upstream.lookup(names.map((name) => ({ name, range: '*' })))
		} finally {
			upstream.destroy()
		}
		const refused = releases.filter((release) => release.lookup !== 'found')
		if (refused.length > 0) {
			throw new ScaffoldError(
				'FETCH',
				`The registry named no release for ${refused.map((release) => release.name).join(', ')}.`,
				{ names: refused.length },
			)
		}
		return this.#pin(releases)
	}

	// Two results of one run, read as one. Written and skipped never overlap
	// across the calls a verb makes, because each call answers for its own paths.
	#merge(first: MaterializeResult, second: MaterializeResult): MaterializeResult {
		return {
			target: first.target,
			written: [...first.written, ...second.written],
			skipped: [...first.skipped, ...second.skipped],
			removed: [...first.removed, ...second.removed],
		}
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
