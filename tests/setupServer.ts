import type {
	Host,
	HostManifest,
	ManifestEntry,
	MaterializerOptions,
	Worktree,
	UpstreamOptions,
} from '@src/server'
import type { Audit, Blueprint, Finding, Plan, ScaffoldErrorCode, Snapshot } from '@src/core'
import type { CLICommand, CLIOptions, Verb } from '../src/bin/types.js'
import type { TestGuardCase, TestPathCase } from './setup.js'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { ResolveHookSync } from 'node:module'
import type { ExecuteOptions, ExecuteResult } from '@orkestrel/process'
import type { ESTree } from 'vite'
import { execFileSync, spawn, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { once } from 'node:events'
import {
	chmodSync,
	existsSync,
	globSync,
	mkdirSync,
	readFileSync,
	realpathSync,
	renameSync,
	rmSync,
	symlinkSync,
	writeFileSync,
} from 'node:fs'
import { createServer } from 'node:http'
import { connect, createServer as createSocketServer, isIP } from 'node:net'
import {
	delimiter,
	dirname,
	join,
	relative as relativePath,
	resolve as resolvePath,
} from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { deserialize } from 'node:v8'
import { gzipSync } from 'node:zlib'
import { isArray, isRecord, isString, parseJSON } from '@orkestrel/contract'
import {
	buildExecuteResult,
	detach,
	execute,
	executeSync,
	isFile,
	mergeEnvironment,
	readVariable,
	resolveExecutable,
} from '@orkestrel/process/server'
import { parseSync } from 'vite'
import {
	BASE_DEV_DEPENDENCIES,
	blueprintToConfigArtifacts,
	blueprintToManifest,
	blueprintToTestArtifacts,
	BROWSE_DEV_DEPENDENCIES,
	CONFIG_TEMPLATES,
	DECLARATION_DEV_DEPENDENCIES,
	FRAMEWORK_MATRIX,
	SOURCE_BROWSER_DEV_DEPENDENCIES,
	CATALOG_AGENT_PATH,
	CATALOG_CLOSING_MARKER,
	CATALOG_OPENING_MARKER,
	blueprintToDevDependencies,
	contentToHex,
	blueprintToScripts,
	CANON_PATHS,
	Compiler,
	compareVersions,
	createBlueprint,
	DISTRIBUTION_SETUP_PATH,
	DISTRIBUTION_TEST_PATH,
	FLOOR_RANGE_PATTERN,
	HOST_PATHS,
	REFERENCE_PATHS,
	SEED_GUIDE_PATHS,
	blueprintToHostArtifacts,
	isDeferredPath,
	isScaffoldError,
	MAX_ARTIFACT_BYTES,
	MAX_COLLECTION_ITEMS,
	MAX_TOTAL_ARTIFACT_BYTES,
	TARGET_SKILL_NAMES,
} from '@src/core'
import {
	computeDigest,
	computeManifestDigest,
	isBranch,
	isCatalogEntries,
	isDependencies,
	isDependencyNames,
	isDigest,
	isEndpoint,
	isFilesystemPath,
	isHostManifest,
	isInventory,
	listAncestors,
	listFiles,
	isManifestEntry,
	isManifestRegionSet,
	isMaterializerHooks,
	isMaterializerOptions,
	isMirrors,
	isWorktree,
	isTimeout,
	isUpstreamHooks,
	isUpstreamOptions,
	MAX_BRANCH_LENGTH,
	MAX_ENDPOINT_LENGTH,
	MAX_INVENTORY_PATHS,
	matchesExecutablePath,
	MAX_PATH_DEPTH,
	MAX_PATH_SEGMENT_BYTES,
	MAX_UPSTREAM_CONCURRENCY,
	MAX_UPSTREAM_RETRIES,
	MAX_UPSTREAM_TIMEOUT,
	pathToStorage,
	readFileHex,
	readFileText,
	readHostFloor,
	stageHost,
	readSurfaceCollisions,
} from '@src/server'
import { optionToName } from '../src/bin/helpers.js'
import {
	captureError,
	createRecorder,
	requireValue,
	resolveRoot,
	waitForCondition,
} from '@orkestrel/test'
import {
	createLoopback,
	createScratch,
	type ScratchInterface,
	supportsCase,
} from '@orkestrel/test/server'
import {
	buildBlueprint,
	buildContentArtifact,
	buildFinding,
	buildHostArtifact,
	buildPlan,
	buildQuestion,
	BROWSER_PLUGIN_DECLARATIONS,
	DEPENDENCY_TABLES,
	ENTRY_OBSERVATION_PATH,
	ENTRY_PASSING_TEST,
	ENTRY_PATH,
	ENTRY_VITE,
} from './setup.js'

/** Defines the package-owned project overlay for generated configuration parity. */
export const TEMPLATE_PROJECT_CONFIG = `// The template proofs spawn compilers and Chromium, so they run apart from the core pool.
export function templates(override?: UserConfig): UserConfig {
	return mergeOverride(
		{
			resolve,
			test: {
				name: { label: 'templates', color: 'cyan' },
				include: ['tests/src/core/templates.test.ts'],
				setupFiles: ['./tests/setup.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		override,
	)
}

`

/**
 * Describes one command line beside the exact command it denotes.
 *
 * @remarks
 * `command` is written whole rather than as a patch over a default, so a test
 * comparing it exactly proves both what the reading produced and what it left
 * absent. An option the line did not carry has no key at all.
 */
export interface TestCommandCase {
	readonly label: string
	readonly argv: readonly string[]
	readonly command: CLICommand
}

/**
 * Describes one command line that denotes no command, beside what its refusal must name.
 *
 * @remarks
 * `mention` is the exact substring the message owes the reader — the word that
 * was wrong. Asserting on it rather than on the whole sentence is what keeps the
 * case a claim about diagnosis rather than about wording.
 */
export interface TestUsageCase {
	readonly label: string
	readonly argv: readonly string[]
	readonly mention: string
}

/**
 * Describes one audit beside whether the executable reads it as a clean run.
 *
 * @remarks
 * `clean` is a verdict rather than an exit code, so the table states the domain
 * fact and the test maps it onto the code constants. A table carrying the codes
 * would agree with them by construction and prove nothing about the mapping.
 */
export interface TestAuditCase {
	readonly label: string
	readonly audit: Audit
	readonly clean: boolean
}

/** Describes one boundary value a server guard decides, with the verdict it owes. */
export interface TestBoundaryCase {
	readonly label: string
	readonly guard: (value: unknown) => boolean
	readonly value: unknown
	readonly accepted: boolean
}

/** Describes one path a classifying predicate decides, with the verdict it owes. */
export interface TestMatchCase {
	readonly label: string
	readonly path: string
	readonly matched: boolean
}

/** Describes one target-relative path beside the vendored storage name it maps to. */
export interface TestStorageCase {
	readonly label: string
	readonly path: string
	readonly storage: string
}

/** Describes one text beside the digest a conforming SHA-256 owes it. */
export interface TestDigestCase {
	readonly label: string
	readonly content: string
	readonly digest: string
}

/** Describes one caller-supplied upstream endpoint, with the verdict the reader's law owes it. */
export interface TestEndpointCase {
	readonly label: string
	readonly base: string
	readonly accepted: boolean
}

/**
 * Describes one scripted HTTP reply the upstream fixture serves at one exact path.
 *
 * @remarks
 * Every field maps onto a real part of the response, so the fixture never
 * declares anything it does not send: the `content-length` it writes is the
 * wire body's actual byte count, `encoding` applies the named real content
 * encoding, and `chunked` omits the length header entirely. `held` accepts the
 * request and never answers it, which is how a timeout and an abort are put
 * under a test without touching a clock.
 */
export interface TestUpstreamReply {
	readonly status: number
	readonly body: string | Uint8Array
	readonly type?: string
	readonly location?: string
	readonly chunked?: boolean
	readonly encoding?: 'gzip'
	readonly held?: boolean
	readonly delay?: number
}

/**
 * Describes the declared range sets a published version carries in a packument.
 *
 * @remarks
 * Named for the manifest keys the registry serves rather than for what a reader
 * does with them, so a fixture can declare a development edge the reader is
 * required to ignore. Each map is name to range, exactly as the manifest
 * declares it.
 */
export interface TestPackumentEdges {
	readonly dependencies?: Readonly<Record<string, string>>
	readonly development?: Readonly<Record<string, string>>
	readonly peer?: Readonly<Record<string, string>>
}

/**
 * Describes one vendored file the repository fixture serves, beside the path it serves it at.
 *
 * @remarks
 * `path` is the target-relative destination, which the raw content host also
 * serves the file at, so one field addresses the request and the row alike. The
 * pair travels together because an inventory declares a digest over exactly
 * these bytes and a target's snapshot states the same bytes as hexadecimal, and
 * a test that let them drift would prove nothing about either.
 */
export interface TestVendoredFile {
	readonly path: string
	readonly content: string
}

/**
 * Describes one binding a parsed statement declares, with the shape a lift reads from it.
 *
 * @remarks
 * `parameters` and `returns` are the source slices the parser's own spans name,
 * so a declaration the formatter wrapped across lines reports the same values a
 * single-line one does. A binding whose value is not a function carries no
 * parameter and no return type.
 */
export interface TestDeclaration {
	readonly name: string
	readonly parameters: readonly string[]
	readonly returns: string | undefined
}

/**
 * Describes one statement of a parsed module, projected onto the fields a lift reads.
 *
 * @remarks
 * `syntax` names the declaration a named export wraps rather than the wrapper,
 * so an exported declaration and a bare one read alike and `exported` carries
 * the export kind on its own. A default export reports as
 * `ExportDefaultDeclaration`, because what it exports need not be a statement.
 * `declarations` covers the bindings a function declaration and a variable
 * declaration introduce; every other statement declares nothing a lift can name.
 * `specifier` is the module an import or a re-export names, which is what tells
 * a lift whether carrying the statement across into another module keeps
 * resolving. `text` is the statement's own source slice, which is what a lift
 * writes into the module it drives. `body` carries the statements a function
 * declaration's own body holds, projected the same way, and is empty for every
 * other statement.
 */
export interface TestStatement {
	readonly syntax: ESTree.Statement['type']
	readonly exported: 'value' | 'type' | undefined
	readonly specifier: string | undefined
	readonly declarations: readonly TestDeclaration[]
	readonly text: string
	readonly body: readonly TestStatement[]
}

/**
 * Describes a real HTTP server on loopback, scripted per path.
 *
 * @remarks
 * `paths` is every request line the server received, in arrival order, so a
 * test reads the exact URLs a reader built and how many times it built them.
 * `peak` is the most requests the server ever held open at once, which is the
 * only place a client's concurrency bound is directly observable. `arrival`
 * resolves when a scripted path is first requested, which is the happens-before
 * edge a cancellation test needs instead of a delay. `destroy` drops every
 * connection, including one the fixture is deliberately holding open, so a suite
 * never leaks a socket.
 */
export interface TestUpstreamInterface {
	readonly base: string
	readonly paths: readonly string[]
	readonly accepts: ReadonlyArray<string | undefined>
	readonly peak: number
	arrival(path: string): Promise<void>
	destroy(): Promise<void>
}

/** Describes the controllable protocol outcomes served by an Ollama fixture. */
export interface TestOllamaOptions {
	/** If `true`, `/api/show` reports the selected model; if `false`, it reports absence. */
	readonly present?: boolean
	/** If `true`, `/api/pull` reports completion; if `false`, it reports unfinished work. */
	readonly pull?: boolean
	/** If `true`, `/api/chat` reports completion; if `false`, it reports unfinished work. */
	readonly warm?: boolean
	/** Selects HTTP status responses independently from their protocol bodies. */
	readonly status?: TestOllamaStatus
}

/** Describes the HTTP status responses served by an Ollama fixture. */
export interface TestOllamaStatus {
	readonly version?: number
	readonly pull?: number
	readonly warm?: number
}

/** Describes one HTTP request received by the Ollama fixture. */
export interface TestOllamaRequest {
	readonly method: string | undefined
	readonly path: string | undefined
	readonly body: unknown
}

/** Describes a running protocol-faithful Ollama fixture. */
export interface TestOllamaInterface {
	readonly url: string
	readonly requests: readonly TestOllamaRequest[]
	destroy(): Promise<void>
}

/**
 * Describes the npm floor a proof needs, beside where a provisioned copy may land.
 *
 * @remarks
 * `floor` is the exact `major.minor.patch` version the declared range floors at rather
 * than the range itself, because it is both the comparison's right side and the version
 * a provisioning install asks the registry for. `prefix` is a directory the caller owns
 * and can remove; nothing lands there when the ambient npm already satisfies the
 * floor. `environment` is the record a provisioned `PATH` is prepended to, so a proof
 * that already pins npm settings keeps them.
 */
export interface TestNpmOptions {
	readonly floor: string
	readonly prefix: string
	readonly environment?: NodeJS.ProcessEnv
}

/**
 * Describes the npm a proof launches, beside the environment that resolves it.
 *
 * @remarks
 * `environment` is the whole record a spawn takes rather than a patch over one, because
 * a nested `npm run` inherits it and a manifest guard reads the version that inherited
 * `PATH` resolves. `version` is what the environment reported rather than what the
 * caller asked for, so an assertion can name the npm the proof actually ran under.
 */
export interface TestNpm {
	readonly version: string
	readonly environment: NodeJS.ProcessEnv
}

/** Carries the exit status of a session hook run and what it printed, trimmed. */
export interface TestHookResult {
	readonly status: number | null
	readonly output: string
}

/**
 * Describes how this host launches npm, as the spawn options a proof hands a child.
 *
 * @remarks
 * `command` is the executable name, and `shell` reports whether launching it needs one.
 * Neither is usable without the other, so they travel together: Windows installs npm as a
 * `.cmd` batch file, which Node refuses to launch directly after the batch-argument
 * hardening, and `spawnSync` returns `EINVAL` with a null status rather than an exit
 * code a caller can read. A registry probe that omits the shell is therefore false on
 * every Windows host, and the proofs behind it never run there.
 */
export interface TestNpmLauncher {
	readonly command: string
	readonly shell: boolean
}

/**
 * Describes the `@orkestrel/scaffold` pin a generated workspace carries after a re-pin.
 *
 * @remarks
 * `range` is what the compiler emitted, which names a published version; `version` is
 * what this checkout declares; `specifier` is the local archive reference written over
 * the range; and `resolved` is what the install recorded in the lockfile. Each is returned
 * rather than compared, because each pairing is a separate claim and a comparison belongs
 * to the case that makes it.
 */
export interface TestGeneratedPin {
	readonly range: string
	readonly version: string
	readonly specifier: string
	readonly resolved: string
}

/**
 * Describes a materialized generated workspace whose dependencies are installed.
 *
 * @remarks
 * `path` is where the workspace was materialized, so no caller repeats that directory's
 * name; `manifest` is the generated manifest as it was written back, so no caller
 * re-parses it; `environment` is the record every spawn against this workspace must
 * take, because a manifest floor refuses a nested `npm run` under any other; and `pin`
 * carries the re-pin's own readings.
 */
export interface TestGeneratedWorkspace {
	readonly path: string
	readonly manifest: Readonly<Record<string, unknown>>
	readonly environment: Readonly<NodeJS.ProcessEnv>
	readonly pin: TestGeneratedPin
}

/**
 * Describes one case a Vitest JSON report records under a test file.
 *
 * @remarks
 * `title` and `status` are the reporter's own values, carried unread, so a caller compares them
 * against the value it expects rather than this reader deciding which values exist.
 */
export interface TestReportCase {
	readonly title: unknown
	readonly status: unknown
}

/**
 * Describes one test file a Vitest JSON report records.
 *
 * @remarks
 * `name` is the absolute path the reporter wrote. `status` and `message` are the reporter's
 * file-level verdict and diagnostic, carried unread: a file that failed to collect carries its
 * error in `message` and no case at all. `cases` holds every case the file collected, in report
 * order.
 */
export interface TestReportFile {
	readonly name: string
	readonly status: unknown
	readonly message: unknown
	readonly cases: readonly TestReportCase[]
}

/**
 * Describes one run of a generated distribution proof, beside the workspace rewrite it takes.
 *
 * @remarks
 * `label` names the run and its report file. `arguments` follows the executable the release row
 * names. `timeout` bounds the run in milliseconds. `files` maps a workspace-relative path to the
 * text written there for this run alone; an empty map runs the workspace as generated.
 */
export interface TestReleaseScenario {
	readonly label: string
	readonly arguments: readonly string[]
	readonly timeout: number
	readonly files: Readonly<Record<string, string>>
}

/** Describes one finished run of a skill script: its exit, both streams, and its last JSON line. */
export interface TestSkillRun {
	readonly status: number | null
	readonly stdout: string
	readonly stderr: string
	readonly json: Record<string, unknown> | undefined
}

/** Names where a skill script runs and what its environment adds. */
export interface TestSkillRunOptions {
	readonly cwd?: string
	readonly env?: Readonly<Record<string, string>>
}

/**
 * Names the repository root, resolved from this file rather than from the process.
 *
 * @remarks
 * Anchoring here is what keeps a loader independent of the directory the runner
 * happened to start in. It is also a real absolute host path this platform
 * produced, so a test can measure the host-path law against it.
 */
export const WORKSPACE_ROOT = fileURLToPath(resolveRoot(import.meta))

export const SCRATCH_PREFIX = 'orkestrel-scaffold-'

/**
 * Names how this host launches npm, read once for every proof that spawns it.
 *
 * @remarks
 * Every argument the helpers in this module hand npm is a literal or a path they built,
 * so the shell the Windows branch selects has nothing to escape. Read
 * {@link TestNpmLauncher} for what each member decides.
 */
export const NPM_LAUNCHER: TestNpmLauncher = Object.freeze({
	command: process.platform === 'win32' ? 'npm.cmd' : 'npm',
	shell: process.platform === 'win32',
})

/**
 * Lists the tracked paths this repository records as executable.
 *
 * @returns The repository-relative paths git holds at mode `100755`, sorted.
 *
 * @remarks
 * Read from git's index rather than from the working tree, because the index
 * carries the bit on every host while the working tree does not: a Windows
 * checkout reports no executable bit at all. That is what lets one assertion
 * about the declared set hold wherever the suite runs.
 *
 * @example
 * ```ts
 * listExecutablePaths() // ['scripts/codex.sh', 'scripts/cursor.sh', …]
 * ```
 */
export function listExecutablePaths(): readonly string[] {
	const listing = execFileSync('git', ['ls-files', '--stage'], {
		cwd: WORKSPACE_ROOT,
		encoding: 'utf8',
		maxBuffer: 1024 * 1024 * 32,
	})
	return listing
		.split('\n')
		.filter((line) => line.startsWith('100755 ') && line.includes('\t'))
		.map((line) => line.slice(line.indexOf('\t') + 1))
		.sort()
}

/**
 * Reports whether this run's temporary directories resolve a recased name.
 *
 * @remarks
 * Derived from the shipped `supportsCase` probe, which writes two names differing
 * only by case into a temporary directory and reports whether the host kept them
 * apart. Folding is that answer negated, and the probe answers false on every
 * host refusal, so a host that refuses it reads as folding. The probe allocates
 * under the same temporary root a workspace lands in, so its answer binds the
 * directory a test actually writes to rather than the platform name: Windows
 * resolves case-insensitively by default but can mark a single directory
 * sensitive, and macOS ships either formatting. A suite proving a case verdict
 * asserts against this rather than assuming the host it was written on.
 */
export const CASE_FOLDING: boolean = !supportsCase()

/**
 * Checks whether this host reaches an IPv4-mapped IPv6 loopback address.
 *
 * @returns True if a connection to `::ffff:127.0.0.1` reaches a listener bound to
 * `127.0.0.1`; false otherwise.
 * @throws When the host refuses the listener the reading opens, which answers nothing
 * about the address family and must not read as a refused connection.
 *
 * @remarks
 * A host built without an IPv6 stack refuses an `AF_INET6` connect with
 * `EAFNOSUPPORT`, so a fixture address rewritten into the `::ffff:` form reaches
 * nothing there while reaching the same listener on a host that carries the stack. A
 * proof asserting on what such an address delivered runs where this reports true. The
 * reading opens a real listener on `127.0.0.1` and closes it and the client socket on
 * every path, and it reaches no address beyond loopback.
 */
export async function supportsMappedLoopback(): Promise<boolean> {
	const loopback = await createLoopback(createSocketServer())
	const socket = connect(loopback.port, '::ffff:127.0.0.1')
	try {
		await once(socket, 'connect')
		return true
	} catch {
		return false
	} finally {
		socket.destroy()
		await loopback.destroy()
	}
}

/**
 * Reads the npm floor a manifest declares.
 *
 * @param manifest - The parsed `package.json` value.
 * @returns The exact `major.minor.patch` version the declared
 * `devEngines.packageManager.version` range floors at.
 * @throws When the value carries no `devEngines.packageManager.version`, or carries one
 * that is not a `>=` floor over an exact version.
 *
 * @remarks
 * A proof that installs a generated workspace reads the floor from the artifact rather
 * than from a constant, so a raised floor reaches the proof through the manifest the
 * compiler emitted instead of through a second declaration that can drift from it.
 * Absence throws rather than licensing the host's own npm: the guard exists because an
 * npm beneath the floor refuses the install, so a proof that fell back silently would
 * report that refusal as the package's own defect.
 *
 * @example
 * ```ts
 * readNpmFloor({ devEngines: { packageManager: { version: '>=11.6.0' } } }) // '11.6.0'
 * ```
 */
export function readNpmFloor(manifest: unknown): string {
	if (!isRecord(manifest) || !isRecord(manifest.devEngines)) {
		throw new Error('The manifest declares no devEngines record')
	}
	const manager: unknown = manifest.devEngines.packageManager
	if (!isRecord(manager)) {
		throw new Error('The manifest declares no devEngines.packageManager record')
	}
	const version: unknown = manager.version
	if (!isString(version) || !FLOOR_RANGE_PATTERN.test(version)) {
		throw new Error(
			'The manifest declares no devEngines.packageManager.version floor of the >=major.minor.patch form',
		)
	}
	return version.slice(2)
}

/**
 * Reads the version of the npm an environment launches.
 *
 * @param environment - The environment overrides a spawn takes. Default: this process's own.
 * @returns The exact version the entry {@link resolveNpmEntry} selects reports for its own
 * `--version`.
 * @throws Thrown when the environment resolves no npm entry, or when the run fails, carrying
 * what it wrote to standard error.
 *
 * @remarks
 * The reading merges the overrides over this process's environment and runs the entry
 * {@link spawnNpm} launches, through Node and never through a shell, so a version admitted
 * here is the version every spawn under the same overrides runs. The version comes from the
 * entry rather than from a manifest beside it, because the running npm is what a
 * `devEngines` guard reads.
 */
export function readNpmVersion(environment: NodeJS.ProcessEnv = process.env): string {
	const merged = mergeEnvironment(false, environment)
	const read = executeSync(
		{
			file: process.execPath,
			arguments: [resolveNpmEntry(merged), '--version'],
			environment: merged,
		},
		{ workspace: WORKSPACE_ROOT, strict: false },
	)
	if (read.failed) {
		throw new Error(`The npm this environment resolves refused --version: ${read.stderr}`)
	}
	return read.stdout.trim()
}

/**
 * Spawns npm through Node with bounded output and a case-folded child environment.
 *
 * @param args - The arguments passed literally to npm's JavaScript entry.
 * @param options - The workspace, environment additions, cancellation, and capture bounds.
 * @returns The process outcome, including nonzero exits and output truncation.
 * @throws When this host supplies no npm JavaScript entry.
 * @remarks Defaults to a 300000 ms timeout and 8388608 bytes per output stream. The inherited
 * npm entry selects the npm running the proof; standalone runs resolve the entry beside Node
 * or the real file behind the npm executable. No shell interprets the arguments.
 */
export function spawnNpm(
	args: readonly string[],
	options?: ExecuteOptions,
): Promise<ExecuteResult> {
	const environment = mergeEnvironment(false, options?.environment)
	return execute(
		{ file: process.execPath, arguments: [resolveNpmEntry(environment), ...args] },
		{ timeout: 300_000, limit: 8 * 1024 * 1024, strict: false, ...options, environment },
	)
}

/**
 * Resolves the npm JavaScript entry an environment launches.
 *
 * @param environment - The environment a spawn takes. Default: this process's own.
 * @returns The `npm-cli.js` file `npm_execpath` names, else the one beside the running
 * Node, else the real file behind the `npm` that {@link resolveTool} reaches on `PATH`.
 * @throws Thrown when none of those candidates is an `npm-cli.js` file.
 *
 * @remarks
 * npm names its own entry in `npm_execpath` for every script it runs, so a proof launched
 * through `npm run` resolves the npm running it. {@link readNpmVersion} and
 * {@link spawnNpm} both read this one resolution, which keeps the npm a proof admits the
 * npm it launches.
 *
 * @example
 * ```ts
 * resolveNpmEntry({ ...process.env, npm_execpath: '/opt/npm/bin/npm-cli.js' })
 * // '/opt/npm/bin/npm-cli.js' when that file exists
 * ```
 */
export function resolveNpmEntry(environment: NodeJS.ProcessEnv = process.env): string {
	const tool = resolveTool('npm', environment)
	const entry = [
		readVariable(environment, 'npm_execpath'),
		join(dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js'),
		tool === undefined ? undefined : realpathSync(tool),
	].find(
		(candidate) => candidate !== undefined && candidate.endsWith('npm-cli.js') && isFile(candidate),
	)
	if (entry === undefined) throw new Error('The host supplies no npm-cli.js entry')
	return entry
}

/**
 * Provisions an npm at or above a declared floor, and the environment that launches it.
 *
 * @param options - The floor, the directory a provisioned copy may land in, and the
 * environment a provisioned `PATH` is prepended to.
 * @returns The version admitted, and the environment every spawn against the guarded
 * workspace must take.
 * @throws When provisioning fails, or when the provisioned copy still reports a version
 * beneath the floor.
 *
 * @remarks
 * A manifest declaring `devEngines.packageManager` refuses a host npm beneath its floor,
 * and it refuses every nested `npm run` under that install on the same reading, so a
 * proof driving such a workspace launches an admitted npm rather than the ambient one.
 * Prepending the provisioned `PATH` is what carries the selection down: a launcher form
 * that runs one version while the ambient copy stays on `PATH` leaves the guard reading
 * the ambient version and refusing. Naming the provisioned entry in `npm_execpath` is what
 * selects it for {@link spawnNpm}, which launches that entry before any `PATH` copy; a proof
 * run through an older `npm run` otherwise admits the provisioned npm and launches the
 * running one. The ambient npm is used unchanged when it satisfies the floor, so a
 * conforming host installs nothing and reaches no registry.
 */
export function provisionNpm(options: TestNpmOptions): TestNpm {
	const base = mergeEnvironment(false, options.environment)
	const ambient = readNpmVersion(base)
	if (compareVersions(ambient, options.floor) >= 0) {
		return { version: ambient, environment: base }
	}
	const bin = join(options.prefix, 'node_modules', '.bin')
	const provisioned = executeSync(
		{
			file: process.execPath,
			arguments: [
				resolveNpmEntry(base),
				'install',
				'--prefix',
				options.prefix,
				'--ignore-scripts',
				'--no-audit',
				'--no-fund',
				`npm@${options.floor}`,
			],
			environment: base,
		},
		{ workspace: WORKSPACE_ROOT, strict: false, timeout: 300_000 },
	)
	if (provisioned.failed) {
		throw new Error(
			`Provisioning npm@${options.floor} into ${options.prefix} failed: ${provisioned.stderr}`,
		)
	}
	const environment = mergeEnvironment(false, base, {
		PATH: `${bin}${delimiter}${readVariable(base, 'PATH') ?? ''}`,
		npm_execpath: join(options.prefix, 'node_modules', 'npm', 'bin', 'npm-cli.js'),
	})
	const version = readNpmVersion(environment)
	if (compareVersions(version, options.floor) < 0) {
		throw new Error(
			`The npm provisioned at ${bin} reports ${version}, beneath the ${options.floor} floor`,
		)
	}
	return { version, environment }
}

/**
 * Reads the version a package manifest declares, from that manifest's text.
 *
 * @param text - The manifest's decoded bytes.
 * @returns The exact version the text declares.
 * @throws When the text is not a record, or declares no string version.
 *
 * @remarks
 * The reading stays textual rather than importing the manifest, because a built artifact
 * inlines its own copy of the same field at build time and the two must stay free to
 * disagree. A proof comparing them is what reports a pack that shipped a stale pin.
 *
 * @example
 * ```ts
 * readManifestVersion('{"name":"router","version":"0.0.1"}') // '0.0.1'
 * ```
 */
export function readManifestVersion(text: string): string {
	const parsed: unknown = JSON.parse(text)
	if (!isRecord(parsed)) throw new Error('The manifest is not a record')
	const version: unknown = Object.getOwnPropertyDescriptor(parsed, 'version')?.value
	if (!isString(version)) throw new Error('The manifest declares no version')
	return version
}

/**
 * Packs this checkout the way the registry serves it, and installs the archive into a consumer.
 *
 * @param workspace - The scratch directory this run owns, which receives `packed` and `consumer`.
 * @param environment - The environment every npm call takes, carrying the cache and the peer pins.
 * @returns The path of the archive the pack wrote and the consumer installed.
 * @throws When the pack fails, when it writes other than one archive, or when the install fails.
 * A child's failure carries its exit status and its spawn error beside what npm wrote, because a
 * child that never ran reports a null status with an empty stream on each side.
 *
 * @remarks
 * Packing is what a distribution proof measures, so the consumer reaches this package through its
 * published exports alone and no caller resolves the checkout's source. The archive is installed
 * rather than linked, because a link skips the `files` list and the exports map, which is most of
 * what a distribution proof exists to read.
 */
export function installPackedScaffold(
	workspace: ScratchInterface,
	environment: NodeJS.ProcessEnv,
): string {
	const packed = workspace.ensure('packed')
	const consumer = workspace.ensure('consumer')
	const pack = spawnSync(
		NPM_LAUNCHER.command,
		['pack', '--json', '--ignore-scripts', '--pack-destination', packed],
		{
			cwd: WORKSPACE_ROOT,
			encoding: 'utf8',
			env: environment,
			windowsHide: true,
			shell: NPM_LAUNCHER.shell,
		},
	)
	if (pack.status !== 0) {
		throw new Error(
			`The pack into ${packed} failed with status ${String(pack.status)} and spawn error ${String(pack.error)}: ${pack.stdout}\n${pack.stderr}`,
		)
	}
	const archives = globSync('*.tgz', { cwd: packed })
	const [archive] = archives
	if (archive === undefined || archives.length !== 1) {
		throw new Error(`The pack did not write one archive into ${packed}: ${archives.join(', ')}`)
	}
	workspace.write(
		'consumer/package.json',
		'{"name":"scaffold-install-consumer","private":true,"type":"module"}\n',
	)
	const install = spawnSync(
		NPM_LAUNCHER.command,
		['install', '--ignore-scripts', '--no-audit', '--no-fund', join(packed, archive)],
		{
			cwd: consumer,
			encoding: 'utf8',
			env: environment,
			windowsHide: true,
			shell: NPM_LAUNCHER.shell,
		},
	)
	if (install.status !== 0) {
		throw new Error(
			`Installing ${archive} into ${consumer} failed with status ${String(install.status)} and spawn error ${String(install.error)}: ${install.stdout}\n${install.stderr}`,
		)
	}
	return join(packed, archive)
}

/**
 * Creates a distribution fixture in the system temporary directory with isolated dependency lookup.
 *
 * @param prefix - The scratch directory's name prefix.
 * @returns The owned fixture, removed by its destroy method.
 * @throws When allocation or Git initialization fails, or an ancestor contains node_modules.
 */
export function createDistributionScratch(prefix: string): ScratchInterface {
	const workspace = createScratch({ prefix })
	try {
		const inherited = listAncestors(workspace.path)
			.slice(1)
			.find((parent) => existsSync(join(parent, 'node_modules')))
		if (inherited !== undefined)
			throw new Error(`Distribution fixture inherits dependencies from ${inherited}`)
		createRepository(workspace.path)
		return workspace
	} catch (error) {
		workspace.destroy()
		throw error
	}
}

/**
 * Materializes one generated workspace from a blueprint expression and installs its dependencies.
 *
 * @param workspace - The scratch directory this run owns, already carrying the installed consumer.
 * @param archive - The packed archive {@link installPackedScaffold} returned.
 * @param blueprint - The blueprint expression the generating child evaluates, written as source.
 * @param environment - The environment the generating install takes, carrying the cache and pins.
 * @returns Where the workspace was materialized, the manifest it carries, the environment every
 * spawn against it must take, and the readings behind its scaffold pin.
 * @throws When the generating child fails, when the manifest or the lockfile carries none of the
 * records this reads, or when the dependency install fails. A child's failure carries its exit
 * status and its spawn error beside what the run wrote, because a child that never ran reports a
 * null status with an empty stream on each side.
 *
 * @remarks
 * The re-pin is what puts this checkout's own bytes under the workspace's gates: the emitted range
 * names a published version, and installing that would measure the previous release instead of this
 * one. The generated manifest declares a `devEngines.packageManager` floor, and npm refuses both the
 * install and every nested `npm run` beneath it rather than resolving the graph, so the floor is read
 * from the artifact that declares it and an admitted npm is provisioned against it. `provisionNpm`
 * throws when it cannot reach one, so nothing stands between it and the install; the install's own
 * message carries npm's output, which is where a refusal names itself.
 */
export function installGeneratedWorkspace(
	workspace: ScratchInterface,
	archive: string,
	blueprint: string,
	environment: NodeJS.ProcessEnv,
): TestGeneratedWorkspace {
	const consumer = workspace.ensure('consumer')
	const path = join(workspace.path, 'generated')
	const blocked = `The generated blueprint was blocked: ${blueprint}`
	workspace.write(
		'consumer/generate.mjs',
		[
			"import { Compiler, createBlueprint } from '@orkestrel/scaffold'",
			"import { Materializer } from '@orkestrel/scaffold/server'",
			`const blueprint = ${blueprint}`,
			'const compiler = new Compiler()',
			'const plan = compiler.compile(blueprint).plan',
			`if (plan === undefined) throw new Error(${JSON.stringify(blocked)})`,
			'compiler.destroy()',
			'const materializer = new Materializer()',
			`materializer.materialize(plan, ${JSON.stringify(path)})`,
			'materializer.destroy()',
		].join('\n'),
	)
	const generate = spawnSync(process.execPath, ['generate.mjs'], {
		cwd: consumer,
		encoding: 'utf8',
		windowsHide: true,
	})
	if (generate.status !== 0) {
		throw new Error(
			`Generating ${blueprint} into ${path} failed with status ${String(generate.status)} and spawn error ${String(generate.error)}: ${generate.stdout}\n${generate.stderr}`,
		)
	}
	const version = readManifestVersion(readFileSync(join(WORKSPACE_ROOT, 'package.json'), 'utf8'))
	const emitted = workspace.read('generated/package.json')
	if (emitted === undefined) throw new Error('The generated workspace carries no package manifest')
	const manifest: unknown = JSON.parse(emitted)
	if (!isRecord(manifest)) throw new Error('The generated manifest is not a record')
	const devDependencies: unknown = Object.getOwnPropertyDescriptor(
		manifest,
		'devDependencies',
	)?.value
	if (!isRecord(devDependencies)) {
		throw new Error('The generated manifest carries no development dependencies')
	}
	const range: unknown = Object.getOwnPropertyDescriptor(
		devDependencies,
		'@orkestrel/scaffold',
	)?.value
	if (!isString(range)) throw new Error('The generated manifest pins no scaffold range')
	const specifier = `file:${relativePath(path, archive).replaceAll('\\', '/')}`
	Object.defineProperty(devDependencies, '@orkestrel/scaffold', {
		value: specifier,
		writable: true,
		enumerable: true,
		configurable: true,
	})
	workspace.write('generated/package.json', `${JSON.stringify(manifest, undefined, '\t')}\n`)
	const floor = readNpmFloor(manifest)
	const admitted = provisionNpm({ floor, prefix: workspace.ensure('npm'), environment })
	const dependencies = spawnSync(
		NPM_LAUNCHER.command,
		['install', '--ignore-scripts', '--no-audit', '--no-fund'],
		{
			cwd: path,
			encoding: 'utf8',
			env: admitted.environment,
			windowsHide: true,
			shell: NPM_LAUNCHER.shell,
		},
	)
	if (dependencies.status !== 0) {
		throw new Error(
			`Installing the generated workspace at ${path} failed with status ${String(dependencies.status)} and spawn error ${String(dependencies.error)}: ${dependencies.stdout}\n${dependencies.stderr}`,
		)
	}
	const locked = workspace.read('generated/package-lock.json')
	if (locked === undefined) throw new Error('The generated install wrote no lockfile')
	const lock: unknown = JSON.parse(locked)
	if (!isRecord(lock)) throw new Error('The generated lockfile is not a record')
	const packages: unknown = Object.getOwnPropertyDescriptor(lock, 'packages')?.value
	if (!isRecord(packages)) throw new Error('The generated lockfile carries no packages')
	const scaffold: unknown = Object.getOwnPropertyDescriptor(
		packages,
		'node_modules/@orkestrel/scaffold',
	)?.value
	if (!isRecord(scaffold)) throw new Error('The generated lockfile carries no installed scaffold')
	const resolved: unknown = Object.getOwnPropertyDescriptor(scaffold, 'resolved')?.value
	if (!isString(resolved)) throw new Error('The installed scaffold records no resolved specifier')
	return {
		path,
		manifest,
		environment: admitted.environment,
		pin: { range, version, specifier, resolved },
	}
}

/**
 * Parses the test files a Vitest JSON report records.
 *
 * @param text - The report's text, as the `json` reporter wrote it to its output file.
 * @returns Every test file the report records, in report order, or undefined when the text is not
 * a report: it is not JSON, carries no `testResults` list, or holds a file entry with no string
 * `name` or no `assertionResults` list.
 *
 * @remarks
 * The whole report is refused rather than the malformed entry dropped, so a caller never receives
 * a partial file list as the run's. The parser narrows only the structure it walks; every verdict
 * field stays the reporter's value.
 *
 * @example
 * ```ts
 * parseVitestReport('{"testResults":[]}') // []
 * ```
 */
export function parseVitestReport(text: string): readonly TestReportFile[] | undefined {
	const report = parseJSON(text)
	if (!isRecord(report) || !isArray(report.testResults)) return undefined
	const files = report.testResults.map((result): TestReportFile | undefined => {
		if (!isRecord(result) || !isString(result.name) || !isArray(result.assertionResults)) {
			return undefined
		}
		return {
			name: result.name,
			status: result.status,
			message: result.message,
			cases: result.assertionResults.map((assertion) =>
				isRecord(assertion)
					? { title: assertion.title, status: assertion.status }
					: { title: undefined, status: undefined },
			),
		}
	})
	return files.every((file) => file !== undefined) ? files : undefined
}

/**
 * Builds the runs the release-mode proof drives against one generated workspace.
 *
 * @param release - The arguments of the release row, `--mode release` included.
 * @param ordinary - The same arguments without the mode.
 * @param configuration - The generated root configuration's text.
 * @param proof - The generated distribution proof's text.
 * @returns The release run and the ordinary run, then the rival runs: each fails a release run
 * without reaching the proof's registry gate.
 *
 * @remarks
 * The rivals are a configuration Vite cannot load, a proof that fails to collect on another
 * import, a proof whose own assertion fails, and a run its timeout ends. Each rewriting rival
 * writes its `files` for its own run alone, and the caller restores the generated text after it;
 * the `timeout` rival runs the workspace as generated and differs only in its timeout.
 */
export function buildReleaseScenarios(
	release: readonly string[],
	ordinary: readonly string[],
	configuration: string,
	proof: string,
): readonly TestReleaseScenario[] {
	return [
		{ label: 'release', arguments: release, timeout: 240_000, files: {} },
		{ label: 'ordinary', arguments: ordinary, timeout: 240_000, files: {} },
		{
			label: 'malformed',
			arguments: release,
			timeout: 240_000,
			files: { 'vite.config.ts': `${configuration}\nexport const =\n` },
		},
		{
			label: 'collection',
			arguments: release,
			timeout: 240_000,
			files: { [DISTRIBUTION_TEST_PATH]: `import './absent-module.js'\n${proof}` },
		},
		{
			label: 'assertion',
			arguments: release,
			timeout: 240_000,
			files: {
				[DISTRIBUTION_TEST_PATH]: [
					"import { expect, it } from 'vitest'",
					'',
					"it('asserts an unrelated value', () => {",
					'\texpect(1).toBe(2)',
					'})',
					'',
				].join('\n'),
			},
		},
		{ label: 'timeout', arguments: release, timeout: 1, files: {} },
	]
}

/** Defines the generated factory calls and expected labels for live instance proofs. */
export const GENERATED_INSTANCE_CASES = Object.freeze([
	Object.freeze({ label: 'src:browser', expression: 'srcBrowser()', prefix: '' }),
	Object.freeze({ label: 'src:vue', expression: 'srcVue()', prefix: '' }),
	Object.freeze({ label: 'app:browser', expression: 'appBrowser()', prefix: '' }),
	Object.freeze({ label: 'app:vue', expression: 'appVue()', prefix: '' }),
	Object.freeze({
		label: 'journey:desktop',
		expression: "appJourney({ name: 'desktop', width: 1280, height: 800 }, [])",
		prefix: '',
	}),
	Object.freeze({
		label: 'src:styles',
		expression:
			"sheetProject('src:styles', { test: { include: ['tests/src/styles/index.test.ts'] } })",
		prefix: '',
	}),
	Object.freeze({ label: 'setup:browser', expression: 'setupBrowser()', prefix: '' }),
	Object.freeze({ label: 'integration', expression: 'integration()', prefix: '' }),
	Object.freeze({
		label: 'widgets',
		expression: "srcBrowser({ test: { name: { label: 'widgets' } } })",
		prefix: '',
	}),
	Object.freeze({
		label: 'view',
		expression: "srcVue({ test: { name: { label: 'view' } } })",
		prefix: '',
	}),
	Object.freeze({
		label: 'application',
		expression: "appBrowser({ test: { name: { label: 'application' } } })",
		prefix: '',
	}),
	Object.freeze({
		label: 'component',
		expression: "appVue({ test: { name: { label: 'component' } } })",
		prefix: '',
	}),
	Object.freeze({
		label: 'sheet',
		expression:
			"sheetProject('src:styles', { test: { name: { label: 'sheet' }, include: ['tests/src/styles/index.test.ts'] } })",
		prefix: '',
	}),
	Object.freeze({
		label: 'setup',
		expression: "setupBrowser({ test: { name: { label: 'setup' } } })",
		prefix: '',
	}),
	Object.freeze({
		label: 'composition',
		expression: "integration({ test: { name: { label: 'composition' } } })",
		prefix: '',
	}),
	Object.freeze({
		label: 'added',
		expression:
			"mergeOverride(base, { test: { name: { label: 'added' }, browser: { instances: [{ browser: 'chromium', headless: true }] } } })",
		prefix:
			"const base = srcBrowser()\nfor (const instance of base.test?.browser?.instances ?? []) instance.name = 'retained'\n",
	}),
])

/** Defines the real Vue component and browser setup proof a generated consumer renders. */
export const GENERATED_VUE_SETUP_FILES: Readonly<Record<string, string>> = Object.freeze({
	'app/vue/SetupComponent.vue': [
		'<script setup lang="ts">',
		"const message = 'Generated Vue setup renders'",
		'</script>',
		'<template><p data-setup="vue">{{ message }}</p></template>',
		'',
	].join('\n'),
	'tests/setupBrowser.ts': [
		"import type { App } from 'vue'",
		"import { createApp } from 'vue'",
		"import SetupComponent from '../app/vue/SetupComponent.vue'",
		'',
		'export function renderSetupComponent(container: HTMLElement): App<Element> {',
		'\tconst app = createApp(SetupComponent)',
		'\tapp.mount(container)',
		'\treturn app',
		'}',
		'',
	].join('\n'),
	'tests/setupBrowser.test.ts': [
		"import { renderSetupComponent } from './setupBrowser.js'",
		"import { expect, it } from 'vitest'",
		'',
		"it('renders the Vue component through the browser setup helper', () => {",
		"\tconst container = document.createElement('div')",
		'\tdocument.body.append(container)',
		'\tconst app = renderSetupComponent(container)',
		'\ttry {',
		"\t\texpect(container.querySelector('p')?.dataset.setup).toBe('vue')",
		"\t\texpect(container.querySelector('p')?.textContent).toBe(",
		"\t\t\t'Generated Vue setup renders',",
		'\t\t)',
		'\t} finally {',
		'\t\tapp.unmount()',
		'\t\tcontainer.remove()',
		'\t}',
		'})',
		'',
	].join('\n'),
})

/**
 * Builds a valid inert vendored-host manifest entry, with focused field replacements.
 *
 * @param fields - The entry fields to replace on the returned value.
 * @returns An entry carrying the requested fields over minimal defaults.
 */
export function buildManifestEntry(fields?: Partial<ManifestEntry>): ManifestEntry {
	const entry = { storage: 'AGENTS.md', destination: 'AGENTS.md', executable: false, ...fields }
	return { ...entry, digest: fields?.digest ?? computeDigest(`${entry.destination}\n`) }
}

/**
 * Builds a valid inert vendored-host manifest, with focused field replacements.
 *
 * @param fields - The manifest fields to replace on the returned value.
 * @returns A manifest carrying the requested fields over minimal defaults.
 */
export function buildHostManifest(fields?: Partial<HostManifest>): HostManifest {
	const membership = {
		entries: [
			buildManifestEntry(),
			buildManifestEntry({
				storage: 'scripts/codex.sh',
				destination: 'scripts/codex.sh',
				executable: true,
			}),
		],
		roots: ['.claude/rules'],
		surface: [],
		...fields,
	}
	return {
		...membership,
		digest:
			fields?.digest ??
			computeManifestDigest(membership.entries, membership.roots, membership.surface),
	}
}

/**
 * Builds a valid inert git working-tree state, with focused field replacements.
 *
 * @param fields - The worktree fields to replace on the returned value.
 * @returns A worktree carrying the requested fields over minimal defaults.
 */
export function buildWorktree(fields?: Partial<Worktree>): Worktree {
	return { tracked: ['AGENTS.md', 'guides/router.md'], dirty: [], ...fields }
}

/**
 * Builds a valid inert materializer option bag, with focused field replacements.
 *
 * @param fields - The option fields to replace on the returned value.
 * @returns Options carrying the requested fields over minimal defaults.
 */
export function buildMaterializerOptions(
	fields?: Partial<MaterializerOptions>,
): MaterializerOptions {
	return {
		host: 'dist/host',
		on: { write: createRecorder<readonly [unknown]>().handler },
		...fields,
	}
}

/**
 * Builds a valid inert upstream option bag, with focused field replacements.
 *
 * @param fields - The option fields to replace on the returned value.
 * @returns Options carrying the requested fields over minimal defaults.
 */
export function buildUpstreamOptions(fields?: Partial<UpstreamOptions>): UpstreamOptions {
	return {
		repository: {
			base: 'https://raw.githubusercontent.com/orkestrel',
			branch: 'main',
			timeout: 10_000,
		},
		registry: { base: 'https://registry.npmjs.org', timeout: 10_000 },
		concurrency: 6,
		retries: 1,
		limit: 1_048_576,
		budget: 16_777_216,
		on: { release: createRecorder<readonly [unknown]>().handler },
		...fields,
	}
}

/**
 * Builds every guard the server face publishes, with what each must accept.
 *
 * @returns One case per guard, freshly built.
 *
 * @remarks
 * `admits` names the hostile labels a guard answers `true` for. The inventory
 * guard states a count law rather than an element law, so it admits the
 * hostile arrays whose counts are inside its ceiling; every other server guard
 * refuses every one.
 */
export function buildServerGuardCases(): readonly TestGuardCase[] {
	return [
		{
			name: 'isFilesystemPath',
			guard: isFilesystemPath,
			accepted: [WORKSPACE_ROOT, 'C:/Users/sample/project', '../sibling', '.'],
			admits: [],
		},
		{
			name: 'isDigest',
			guard: isDigest,
			accepted: [computeDigest(''), computeDigest('hi\n')],
			admits: [],
		},
		{
			name: 'isInventory',
			guard: isInventory,
			accepted: [[], ['AGENTS.md'], Array.from({ length: MAX_INVENTORY_PATHS }, () => 'AGENTS.md')],
			admits: ['sparse array', 'oversized array'],
		},
		{
			name: 'isEndpoint',
			guard: isEndpoint,
			accepted: ['https://registry.npmjs.org', 'a'.repeat(MAX_ENDPOINT_LENGTH)],
			admits: [],
		},
		{ name: 'isBranch', guard: isBranch, accepted: ['main', 'release/0.1.x'], admits: [] },
		{ name: 'isTimeout', guard: isTimeout, accepted: [1, MAX_UPSTREAM_TIMEOUT], admits: [] },
		{
			name: 'isDependencyNames',
			guard: isDependencyNames,
			accepted: [[], ['@orkestrel/router', '@orkestrel/emitter']],
			admits: [],
		},
		{
			name: 'isDependencies',
			guard: isDependencies,
			accepted: [[], [{ name: '@orkestrel/emitter', range: '^0.0.5' }]],
			admits: [],
		},
		{
			name: 'isManifestRegionSet',
			guard: isManifestRegionSet,
			accepted: [
				{ pins: { runtime: [], development: [] }, scripts: [] },
				{
					pins: {
						runtime: [{ name: '@orkestrel/emitter', range: '^0.0.5' }],
						development: [],
					},
					scripts: [{ name: 'test', command: 'vitest run', accepted: [] }],
				},
				{
					pins: { runtime: [], development: [] },
					scripts: [],
					additions: {
						runtime: [],
						development: [{ name: 'typescript', range: '^6.0.3' }],
					},
				},
			],
			admits: [],
		},
		{
			name: 'isMirrors',
			guard: isMirrors,
			accepted: [
				[],
				[
					{
						name: '@orkestrel/router',
						path: 'guides/router.md',
						lookup: 'found',
						content: '# Router\n',
					},
				],
			],
			admits: [],
		},
		{
			name: 'isCatalogEntries',
			guard: isCatalogEntries,
			accepted: [
				[],
				[
					{
						name: '@orkestrel/router',
						lookup: 'found',
						version: '0.0.8',
						dependencies: [],
						peers: [],
					},
				],
				[
					{
						name: '@orkestrel/agent',
						lookup: 'found',
						version: '0.0.15',
						dependencies: [{ name: '@orkestrel/tool', range: '^0.0.10' }],
						peers: [],
					},
				],
			],
			admits: [],
		},
		{
			name: 'isManifestEntry',
			guard: isManifestEntry,
			accepted: [buildManifestEntry(), buildManifestEntry({ executable: true })],
			admits: [],
		},
		{
			name: 'isHostManifest',
			guard: isHostManifest,
			accepted: [buildHostManifest(), buildHostManifest({ entries: [], roots: [] })],
			admits: [],
		},
		{
			name: 'isWorktree',
			guard: isWorktree,
			accepted: [buildWorktree(), buildWorktree({ dirty: ['AGENTS.md'] })],
			admits: [],
		},
		{
			name: 'isMaterializerHooks',
			guard: isMaterializerHooks,
			accepted: [{}, { write: createRecorder<readonly [unknown]>().handler }],
			admits: [],
		},
		{
			name: 'isMaterializerOptions',
			guard: isMaterializerOptions,
			accepted: [{}, buildMaterializerOptions()],
			admits: [],
		},
		{
			name: 'isUpstreamHooks',
			guard: isUpstreamHooks,
			accepted: [{}, { release: createRecorder<readonly [unknown]>().handler }],
			admits: [],
		},
		{
			name: 'isUpstreamOptions',
			guard: isUpstreamOptions,
			accepted: [{}, buildUpstreamOptions()],
			admits: [],
		},
	]
}

/**
 * Lists every candidate the host-path law decides, with the verdict it owes.
 *
 * @remarks
 * The multi-byte pair is what proves the segment ceiling counts bytes rather
 * than code units: eighty-five three-byte characters sit exactly on it and
 * eighty-six are past it, while both are far inside any character count.
 */
export const FILESYSTEM_PATH_CASES: readonly TestPathCase[] = [
	{ label: 'POSIX absolute path', path: '/home/sample/project', accepted: true },
	{ label: 'Windows drive path', path: 'C:\\Users\\sample\\project', accepted: true },
	{
		label: 'Windows drive path with forward slashes',
		path: 'C:/Users/sample/project',
		accepted: true,
	},
	{ label: 'UNC share path', path: '\\\\server\\share\\project', accepted: true },
	{ label: 'bare relative directory', path: 'project', accepted: true },
	{ label: 'parent-relative directory', path: '../sibling', accepted: true },
	{ label: 'the current directory', path: '.', accepted: true },
	{ label: 'dot segment inside a path', path: 'project/./src', accepted: true },
	{
		label: 'segment at the byte ceiling',
		path: 'a'.repeat(MAX_PATH_SEGMENT_BYTES),
		accepted: true,
	},
	{ label: 'multi-byte segment at the byte ceiling', path: '\u20ac'.repeat(85), accepted: true },
	{
		label: 'at the depth ceiling',
		path: Array.from({ length: MAX_PATH_DEPTH }, () => 'a').join('/'),
		accepted: true,
	},
	{ label: 'empty string', path: '', accepted: false },
	{ label: 'trailing separator', path: 'project/', accepted: true },
	{ label: 'doubled separator', path: 'project//src', accepted: false },
	{ label: 'filesystem root alone', path: '/', accepted: false },
	{ label: 'ASCII control character', path: 'project/\u0007src', accepted: false },
	{ label: 'wildcard character', path: 'project/*', accepted: false },
	{ label: 'redirection character', path: 'project/a>b', accepted: false },
	{ label: 'colon outside the drive prefix', path: 'project/a:b', accepted: false },
	{ label: 'drive prefix after the first segment', path: 'project/C:/src', accepted: false },
	{ label: 'segment ending in a dot', path: 'project/src.', accepted: false },
	{ label: 'segment ending in a space', path: 'project/src ', accepted: false },
	{ label: 'reserved device name', path: 'project/nul', accepted: false },
	{ label: 'reserved device name with an extension', path: 'project/NUL.txt', accepted: false },
	{
		label: 'segment one byte past the ceiling',
		path: 'a'.repeat(MAX_PATH_SEGMENT_BYTES + 1),
		accepted: false,
	},
	{ label: 'multi-byte segment past the byte ceiling', path: '\u20ac'.repeat(86), accepted: false },
	{
		label: 'one segment past the depth ceiling',
		path: Array.from({ length: MAX_PATH_DEPTH + 1 }, () => 'a').join('/'),
		accepted: false,
	},
]

/**
 * Builds every boundary value the server's option, manifest, and inventory laws decide.
 *
 * @returns One case per boundary, freshly built.
 *
 * @remarks
 * Each ceiling appears twice, once on it and once one step past it, which pins
 * the guard to the constant beside it: a guard admitting one more or one fewer
 * than its declared ceiling fails here. It does not pin the constant's own
 * value, because both sides of the pair are written from that constant. The
 * byte ceilings are the exception and are written from the core constants, so
 * those cases fail if the server guard and core ever disagree.
 */
export function buildBoundaryCases(): readonly TestBoundaryCase[] {
	return [
		{
			label: 'upstream concurrency at the ceiling',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ concurrency: MAX_UPSTREAM_CONCURRENCY }),
			accepted: true,
		},
		{
			label: 'upstream concurrency one past the ceiling',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ concurrency: MAX_UPSTREAM_CONCURRENCY + 1 }),
			accepted: false,
		},
		{
			label: 'upstream concurrency below one',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ concurrency: 0 }),
			accepted: false,
		},
		{
			label: 'upstream concurrency that is not a whole number',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ concurrency: 4.5 }),
			accepted: false,
		},
		{
			label: 'upstream retries at zero',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ retries: 0 }),
			accepted: true,
		},
		{
			label: 'upstream retries one past the ceiling',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ retries: MAX_UPSTREAM_RETRIES + 1 }),
			accepted: false,
		},
		{
			label: 'upstream limit at the artifact ceiling',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ limit: MAX_ARTIFACT_BYTES }),
			accepted: true,
		},
		{
			label: 'upstream limit one byte past the artifact ceiling',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ limit: MAX_ARTIFACT_BYTES + 1 }),
			accepted: false,
		},
		{
			label: 'upstream budget at the total artifact ceiling',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ budget: MAX_TOTAL_ARTIFACT_BYTES }),
			accepted: true,
		},
		{
			label: 'upstream budget one byte past the total artifact ceiling',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ budget: MAX_TOTAL_ARTIFACT_BYTES + 1 }),
			accepted: false,
		},
		{
			label: 'repository timeout at the ceiling',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ repository: { timeout: MAX_UPSTREAM_TIMEOUT } }),
			accepted: true,
		},
		{
			label: 'repository timeout one past the ceiling',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ repository: { timeout: MAX_UPSTREAM_TIMEOUT + 1 } }),
			accepted: false,
		},
		{
			label: 'repository branch at the length ceiling',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ repository: { branch: 'a'.repeat(MAX_BRANCH_LENGTH) } }),
			accepted: true,
		},
		{
			label: 'repository branch one past the length ceiling',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ repository: { branch: 'a'.repeat(MAX_BRANCH_LENGTH + 1) } }),
			accepted: false,
		},
		{
			label: 'repository branch carrying a traversal',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ repository: { branch: 'main/../etc' } }),
			accepted: false,
		},
		{
			label: 'repository branch opening with a separator',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ repository: { branch: '/main' } }),
			accepted: false,
		},
		{
			label: 'registry endpoint one past the length ceiling',
			guard: isUpstreamOptions,
			value: buildUpstreamOptions({ registry: { base: 'a'.repeat(MAX_ENDPOINT_LENGTH + 1) } }),
			accepted: false,
		},
		{
			label: 'a setting written under the wrong entity',
			guard: isUpstreamOptions,
			value: { repository: { concurrency: 4 } },
			accepted: false,
		},
		{
			label: 'materializer options carrying an unknown key',
			guard: isMaterializerOptions,
			value: { retries: 2 },
			accepted: false,
		},
		{
			label: 'materializer hooks carrying a misspelled event',
			guard: isMaterializerOptions,
			value: { on: { written: createRecorder<readonly [unknown]>().handler } },
			accepted: false,
		},
		{
			label: 'a host that is not a filesystem path',
			guard: isMaterializerOptions,
			value: { host: 'dist/host*' },
			accepted: false,
		},
		{
			label: 'a manifest digest in uppercase',
			guard: isHostManifest,
			value: buildHostManifest({ digest: computeDigest('scaffold').toUpperCase() }),
			accepted: false,
		},
		{
			label: 'a manifest digest one digit short',
			guard: isHostManifest,
			value: buildHostManifest({ digest: computeDigest('scaffold').slice(1) }),
			accepted: false,
		},
		{
			label: 'a manifest entry mapping outside the target',
			guard: isHostManifest,
			value: buildHostManifest({ entries: [buildManifestEntry({ destination: '../secrets' })] }),
			accepted: false,
		},
		{
			label: 'a manifest root outside the target',
			guard: isHostManifest,
			value: buildHostManifest({ roots: ['../secrets'] }),
			accepted: false,
		},
		{
			label: 'a manifest entry list past the collection ceiling',
			guard: isHostManifest,
			value: buildHostManifest({
				entries: Array.from({ length: MAX_COLLECTION_ITEMS + 1 }, () => buildManifestEntry()),
			}),
			accepted: false,
		},
		{
			label: 'an inventory at the ceiling',
			guard: isWorktree,
			value: buildWorktree({
				tracked: Array.from({ length: MAX_INVENTORY_PATHS }, () => 'AGENTS.md'),
			}),
			accepted: true,
		},
		{
			label: 'an inventory one path past the ceiling',
			guard: isWorktree,
			value: buildWorktree({
				tracked: Array.from({ length: MAX_INVENTORY_PATHS + 1 }, () => 'AGENTS.md'),
			}),
			accepted: false,
		},
		{
			label: 'an inventory carrying a traversal',
			guard: isWorktree,
			value: buildWorktree({ dirty: ['../secrets'] }),
			accepted: false,
		},
	]
}

/**
 * Runs a call and reports the coded reason it refused.
 *
 * @param call - The call under test.
 * @returns The raised error's code, or `undefined` when the call returned
 * normally or raised something that is not a {@link ScaffoldError}.
 *
 * @remarks
 * Asserting the code rather than the message is what keeps a refusal test bound
 * to the contract instead of to prose. Both non-refusals answer `undefined`, so
 * a test naming an expected code fails on either of them and no assertion can
 * pass because nothing was raised.
 */
export function captureScaffoldCode(call: () => unknown): ScaffoldErrorCode | undefined {
	const error = captureError(call)
	return isScaffoldError(error) ? error.code : undefined
}

/**
 * Runs a synchronous call and reports the message it refused with.
 *
 * @param call - The operation expected to raise a scaffold error.
 * @returns The scaffold error's message, or `undefined` when the call returned
 * normally or raised something that is not a scaffold error.
 */
export function captureScaffoldMessage(call: () => unknown): string | undefined {
	const error = captureError(call)
	return isScaffoldError(error) ? error.message : undefined
}

/**
 * Reads a module's statements off the parser Vite re-exports.
 *
 * @param source - The module text to parse.
 * @param name - The filename the parser reads the source language from.
 * @returns The program's top-level statements, in source order.
 *
 * @throws Thrown when the parser reports an error, naming the first one.
 *
 * @remarks
 * The subject is what a declaration carries, so a parser answers it and a
 * pattern does not: a pattern reports on one spelling of a declaration and goes
 * blind on the rest, and the vendored formatter wraps a declaration across as
 * many lines as its width needs. Every field is read from the parser's own
 * nodes and spans, so a reformatted source moves none of them.
 *
 * @example
 * ```ts
 * const [statement] = readStatements('export const value = 1\n', 'module.ts')
 * statement?.syntax // 'VariableDeclaration'
 * statement?.exported // 'value'
 * ```
 */
export function readStatements(source: string, name: string): readonly TestStatement[] {
	const parsed = parseSync(name, source)
	const [refusal] = parsed.errors
	if (refusal !== undefined) throw new Error(`The parser refused ${name}: ${refusal.message}`)
	const read: TestStatement[] = []
	const pending: Array<{
		readonly statements: readonly ESTree.Statement[]
		readonly into: TestStatement[]
	}> = [{ statements: parsed.program.body, into: read }]
	while (pending.length > 0) {
		const frame = pending.pop()
		if (frame === undefined) break
		for (const statement of frame.statements) {
			const wrapped =
				statement.type === 'ExportNamedDeclaration' ? statement.declaration : statement
			const declaration = wrapped === null ? undefined : wrapped
			const bindings: ReadonlyArray<{
				readonly name: string
				readonly shape: ESTree.Function | ESTree.ArrowFunctionExpression | undefined
			}> =
				declaration?.type === 'FunctionDeclaration'
					? declaration.id === null
						? []
						: [{ name: declaration.id.name, shape: declaration }]
					: declaration?.type === 'VariableDeclaration'
						? declaration.declarations.flatMap((declarator) => {
								if (declarator.id.type !== 'Identifier') return []
								const initializer = declarator.init
								const shape =
									initializer?.type === 'ArrowFunctionExpression' ||
									initializer?.type === 'FunctionExpression'
										? initializer
										: undefined
								return [{ name: declarator.id.name, shape }]
							})
						: []
			const body: TestStatement[] = []
			if (declaration?.type === 'FunctionDeclaration' && declaration.body !== null)
				pending.push({ statements: declaration.body.body, into: body })
			const declarations: readonly TestDeclaration[] = bindings.map((binding) => {
				const annotation = binding.shape?.returnType?.typeAnnotation
				return {
					name: binding.name,
					parameters: (binding.shape?.params ?? []).map((parameter) =>
						source.slice(parameter.start, parameter.end),
					),
					returns:
						annotation === undefined ? undefined : source.slice(annotation.start, annotation.end),
				}
			})
			frame.into.push({
				syntax: declaration?.type ?? statement.type,
				exported:
					statement.type === 'ExportNamedDeclaration' ||
					statement.type === 'ExportDefaultDeclaration' ||
					statement.type === 'ExportAllDeclaration'
						? (statement.exportKind ?? 'value')
						: undefined,
				specifier:
					statement.type === 'ImportDeclaration' ||
					statement.type === 'ExportNamedDeclaration' ||
					statement.type === 'ExportAllDeclaration'
						? statement.source?.value
						: undefined,
				declarations,
				text: source.slice(statement.start, statement.end),
				body,
			})
		}
	}
	return read
}

/**
 * Reads the module specifier of every import a parsed module writes, in source order.
 *
 * @param source - The module text to parse.
 * @param name - The filename the parser reads the source language from.
 * @returns One entry per import: the module it names, or `undefined` where the argument is not a
 * string the reading can resolve.
 *
 * @throws Thrown when the parser reports an error, naming the first one.
 *
 * @remarks
 * The subject is what a module imports, so a parser answers it and a pattern does
 * not: a pattern matches a specifier written inside a string literal or a comment
 * and reports a module the source never imports. The reading covers a static
 * import, a re-export carrying a source, a dynamic `import()`, and a `require`
 * call, which are the forms that name another module at runtime, and it reads a
 * type-only import as an import because that specifier must resolve too. It
 * resolves a string literal and a template literal with no expressions; every
 * other argument reports `undefined`, because an argument assembled at runtime
 * names no module a caller can rule on. The reading omits an `import()` in type
 * position (`TSImportType`), a load through a binding some other name holds, and
 * a member-expression call such as `require.resolve` or `import.meta.resolve`.
 *
 * @example
 * ```ts
 * readSpecifiers("export { join } from 'node:path'\n", 'module.ts') // ['node:path']
 * readSpecifiers('await import(held)\n', 'module.ts') // [undefined]
 * ```
 */
export function readSpecifiers(source: string, name: string): ReadonlyArray<string | undefined> {
	const parsed = parseSync(name, source)
	const [refusal] = parsed.errors
	if (refusal !== undefined) throw new Error(`The parser refused ${name}: ${refusal.message}`)
	// Each entry is the node naming the module, kept with its offset so the stack
	// walk's own order never reaches the caller.
	const read: Array<{ readonly start: number; readonly named: Record<string, unknown> }> = []
	const pending: unknown[] = [parsed.program]
	while (pending.length > 0) {
		const node = pending.pop()
		if (isArray(node)) {
			for (const child of node) pending.push(child)
			continue
		}
		if (!isRecord(node)) continue
		for (const child of Object.values(node)) pending.push(child)
		const start = node.start
		if (typeof start !== 'number') continue
		const origin = node.source
		if (
			node.type === 'ImportDeclaration' ||
			node.type === 'ExportAllDeclaration' ||
			node.type === 'ExportNamedDeclaration' ||
			node.type === 'ImportExpression'
		) {
			// A local export list carries no source, so it names no module at all. Every
			// other form here carries the node its own specifier is written in.
			if (isRecord(origin)) read.push({ start, named: origin })
			continue
		}
		if (node.type !== 'CallExpression') continue
		const callee = node.callee
		if (!isRecord(callee) || callee.type !== 'Identifier' || callee.name !== 'require') continue
		const [argument] = isArray(node.arguments) ? node.arguments : []
		if (isRecord(argument)) read.push({ start, named: argument })
	}
	return read
		.sort((first, second) => first.start - second.start)
		.map(({ named }) => {
			if (isString(named.value)) return named.value
			const expressions = named.expressions
			if (named.type !== 'TemplateLiteral' || !isArray(expressions) || expressions.length > 0)
				return undefined
			const [quasi] = isArray(named.quasis) ? named.quasis : []
			if (!isRecord(quasi)) return undefined
			const held = quasi.value
			return isRecord(held) && isString(held.cooked) ? held.cooked : undefined
		})
}

/**
 * Builds a vendored-host manifest that matches its own membership.
 *
 * @param fields - The membership to replace on the returned value.
 * @returns A manifest whose digest is computed from the membership it carries.
 *
 * @remarks
 * Declares staged storage paths and directory roots. Unlike {@link buildHostManifest},
 * this fixture accepts no digest override.
 */
export function buildStagedManifest(fields?: Partial<Omit<HostManifest, 'digest'>>): HostManifest {
	const membership = {
		entries: [
			buildManifestEntry(),
			buildManifestEntry({
				storage: 'claude/rules/names.md',
				destination: '.claude/rules/names.md',
			}),
		],
		roots: ['.claude', '.claude/rules'],
		surface: [],
		...fields,
	}
	return {
		...membership,
		digest: computeManifestDigest(membership.entries, membership.roots, membership.surface),
	}
}

/**
 * Writes a real vendored host root a reader can be measured against.
 *
 * @param workspace - The temporary workspace the root is written into.
 * @param relative - The workspace-relative directory to write it at.
 * @param manifest - The manifest to write, and the entries to write storage for.
 * @returns The host root's absolute path.
 *
 * @remarks
 * Each storage file carries the destination it answers for as its content, so
 * every file has bytes of its own and a read that returned the wrong one is
 * visible in the assertion rather than in a length. A destination
 * {@link SKILL_CANON_FILES} names carries that text instead, because hydration
 * derives a skill pointer from the canonical frontmatter.
 */
export function createHostRoot(
	workspace: ScratchInterface,
	relative: string,
	manifest: HostManifest,
): string {
	const root = workspace.ensure(relative)
	for (const entry of manifest.entries) {
		workspace.write(
			`${relative}/${entry.storage}`,
			SKILL_CANON_FILES[entry.destination] ?? `${entry.destination}\n`,
		)
	}
	workspace.write(`${relative}/manifest.json`, `${JSON.stringify(manifest, null, '\t')}\n`)
	return root
}

/**
 * Stages this checkout's real vendored host into a temporary workspace.
 *
 * @param workspace - The temporary workspace that receives the staged root.
 * @returns The staged host root's absolute path.
 *
 * @remarks
 * This fixture measures the files a published build vendors rather than a
 * synthetic manifest. Use it when the exact bytes in the checkout are the
 * subject of a command-line regression.
 */
export function createStagedHost(workspace: ScratchInterface): string {
	const root = workspace.ensure('host')
	stageHost(WORKSPACE_ROOT, root)
	return root
}

/**
 * Lists every text whose SHA-256 is a published, externally checkable value.
 *
 * @remarks
 * The digest law's anchor. Every case but the multi-byte one is a published
 * SHA-256 value, so the
 * assertion measures the helper against the algorithm rather than against
 * itself. The multi-byte case pins the encoding as well as the algorithm: the
 * same characters encoded as UTF-16 digest to something else entirely.
 */
export const DIGEST_CASES: readonly TestDigestCase[] = [
	{
		label: 'empty content',
		content: '',
		digest: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
	},
	{
		label: 'one short line',
		content: 'hi\n',
		digest: '98ea6e4f216f2fb4b69fff9b3a44842c38686ca685f3f55dc48c5d3fb1107be4',
	},
	{
		label: 'the classic quick-brown-fox sentence',
		content: 'The quick brown fox jumps over the lazy dog',
		digest: 'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592',
	},
	{
		label: 'multi-byte content',
		content: '€😀',
		digest: 'aa6ac38b88868c15ec32bf6cca0dda3ffa2595bdf3e1ae98c328b799f889b9ac',
	},
]

/** Lists every path the repository-metadata rule decides, with the verdict it owes. */
export const GIT_PATH_CASES: readonly TestMatchCase[] = [
	{ label: 'the metadata directory itself', path: '.git', matched: true },
	{ label: 'a file inside it', path: '.git/config', matched: true },
	{ label: 'a nested file inside it', path: '.git/refs/heads/main', matched: true },
	{ label: 'it nested under another directory', path: 'vendor/.git/config', matched: true },
	{ label: 'it spelled with backslashes', path: '.git\\config', matched: true },
	{ label: 'it spelled in uppercase', path: '.GIT/config', matched: true },
	{ label: 'the ignore file beside it', path: '.gitignore', matched: false },
	{ label: 'the attributes file beside it', path: '.gitattributes', matched: false },
	{ label: 'a name merely opening with it', path: '.github/workflows/ci.yml', matched: false },
	{ label: 'an unrelated dotted directory', path: '.claude/rules/names.md', matched: false },
]

/** Lists every path the deletion deny-list decides, with the verdict it owes. */
export const PROTECTED_PATH_CASES: readonly TestMatchCase[] = [
	{ label: 'a published source file', path: 'src/core/index.ts', matched: true },
	{ label: 'a private application file', path: 'app/server/main.ts', matched: true },
	{ label: 'the source root itself', path: 'src', matched: true },
	{ label: 'the application root itself', path: 'app', matched: true },
	{ label: 'repository metadata', path: '.git/config', matched: true },
	{ label: 'a source path spelled with backslashes', path: 'src\\core\\index.ts', matched: true },
	{ label: 'a foreign agent file', path: '.claude/agents/rogue.md', matched: false },
	{ label: 'a test mirroring source', path: 'tests/src/core/helpers.test.ts', matched: false },
	{ label: 'a name merely opening with the source root', path: 'srcery/index.ts', matched: false },
	{ label: 'a name merely opening with the app root', path: 'apple.md', matched: false },
	{
		label: 'a nested source directory of another package',
		path: 'vendor/src/index.ts',
		matched: false,
	},
]

/** Lists every path the vendoring deny-list decides, with the verdict it owes. */
export const SENSITIVE_PATH_CASES: readonly TestMatchCase[] = [
	{ label: 'a registry credential file', path: '.npmrc', matched: true },
	{ label: 'a nested registry credential file', path: 'packages/router/.npmrc', matched: true },
	{ label: 'a local harness override', path: '.claude/settings.local.json', matched: true },
	{ label: 'an environment file', path: '.env', matched: true },
	{ label: 'a suffixed environment file', path: '.env.production', matched: true },
	{ label: 'a key directory', path: '.ssh/id_rsa', matched: true },
	{ label: 'a cloud credential directory', path: '.aws/credentials', matched: true },
	{ label: 'a private key by extension', path: 'certs/server.pem', matched: true },
	{ label: 'a service-account key', path: 'ops/deploy-service-account.json', matched: true },
	{ label: 'repository metadata', path: '.git/config', matched: true },
	{
		label: 'the harness settings this package vendors',
		path: '.claude/settings.json',
		matched: false,
	},
	{ label: 'the root instruction document', path: 'AGENTS.md', matched: false },
	{ label: 'a rule file', path: '.claude/rules/names.md', matched: false },
	{ label: 'a name merely containing environment', path: 'docs/environment.md', matched: false },
	{ label: 'a shell script', path: 'scripts/codex.sh', matched: false },
]

/**
 * Builds the vendored membership the writers are measured against.
 *
 * @param fields - The membership to replace on the returned value.
 * @returns A manifest whose digest is computed from the membership it carries.
 *
 * @remarks
 * Wider than {@link buildStagedManifest} because a writer meets every shape the
 * vendored root has: a root file, files inside dotted directories, a guide
 * mirror and the catalog agent whose bytes another verb owns, an executable
 * script, and `.claude/skills`, the one declared root no entry sits beneath and
 * therefore the only declared empty directory.
 */
export function buildVendoredManifest(
	fields?: Partial<Omit<HostManifest, 'digest'>>,
): HostManifest {
	const membership = {
		entries: [
			buildManifestEntry(),
			buildManifestEntry({
				storage: 'claude/agents/orkestrel.md',
				destination: '.claude/agents/orkestrel.md',
			}),
			buildManifestEntry({
				storage: 'claude/rules/names.md',
				destination: '.claude/rules/names.md',
			}),
			buildManifestEntry({ storage: 'guides/guide.md', destination: 'guides/guide.md' }),
			buildManifestEntry({
				storage: 'scripts/codex.sh',
				destination: 'scripts/codex.sh',
				executable: true,
			}),
		],
		roots: ['.claude', '.claude/agents', '.claude/rules', '.claude/skills', 'guides', 'scripts'],
		surface: [],
		...fields,
	}
	return {
		...membership,
		digest: computeManifestDigest(membership.entries, membership.roots, membership.surface),
	}
}

/**
 * Holds one command-line word carrying every byte a refusal must not pass on.
 *
 * @remarks
 * Hostile classes in one token, because a refusal quotes the word that
 * caused it and each class escapes through a different door: an ANSI colour
 * sequence repaints the terminal, a bell rings it, a delete character corrupts
 * what a log file records, and a line break forges a second line inside a
 * handler that takes one. Held here rather than in a test file so the same token
 * measures every write path, and so the assertion and the control read the same
 * value.
 */
export const HOSTILE_ARGUMENT = '\u001b[31mpull\u0007\u007f\nforged'

/** Lists every byte {@link HOSTILE_ARGUMENT} carries that a written line must not. */
export const HOSTILE_BYTES: readonly string[] = ['\u001b', '\u0007', '\u007f', '\n']

/**
 * Initializes a real git repository at a path.
 *
 * @param path - The directory to make a repository.
 * @returns Nothing.
 *
 * @remarks
 * A real `git init`, because the tracked set and the dirty set are git's own
 * answers and a fixture that fabricated them would measure the fixture. This is
 * the one place these tests start a process, and it starts `git` rather than the
 * executable under test.
 */
export function createRepository(path: string): void {
	execFileSync('git', ['init', '--quiet'], { cwd: path, windowsHide: true, stdio: 'ignore' })
}

/**
 * Describes the destinations one executable run wrote to, and the options that wired them.
 *
 * @remarks
 * `output` and `diagnostic` are the lines each handler received, in the order it
 * received them. Reading them is what makes proving a command's report cost a
 * function call: the run is driven in this process and its lines are values, so
 * no assertion has to parse a child process's stream.
 */
export interface TestSinkInterface {
	readonly options: CLIOptions
	readonly output: readonly string[]
	readonly diagnostic: readonly string[]
}

/**
 * Creates the recording destinations one executable run writes to.
 *
 * @returns The sink, whose `options` drive the run and whose lists are read after it.
 *
 * @example
 * ```ts
 * const sink = createSink()
 * const code = await new CLI(sink.options).execute(['--help'])
 * sink.output.length // the usage block, one entry per line
 * ```
 */
export function createSink(): TestSinkInterface {
	const output = createRecorder<readonly [string]>()
	const diagnostic = createRecorder<readonly [string]>()
	return {
		options: { output: output.handler, diagnostic: diagnostic.handler },
		get output() {
			return output.calls.map(([line]) => line)
		},
		get diagnostic() {
			return diagnostic.calls.map(([line]) => line)
		},
	}
}

/**
 * Lists the staged paths that are directories rather than files.
 *
 * @remarks
 * `CANON_PATHS` mixes files and directories and says which is which nowhere,
 * because the vendored root's own manifest is what decides it. A fixture builds
 * that manifest, so the fixture declares the split. `.claude/skills` is the one
 * declared directory no entry sits beneath, which makes it the empty-directory
 * case every writer has to survive. `scripts` is the host directory a target owns.
 */
export const HOST_DIRECTORY_PATHS: readonly string[] = [
	'scripts',
	'guides',
	'.agents/skills',
	'.agents/templates',
	'.agents/transports',
	'.claude/agents',
	'.claude/rules',
	'.claude/skills',
	'.codex/agents',
	'.cursor/rules',
]

/**
 * Lists every path a release stages, including the canon and reference set.
 *
 * @remarks
 * The stager walks `HOST_PATHS`, `CANON_PATHS`, and `REFERENCE_PATHS` alike.
 * A checkout fixture must carry each list's membership. Target claims remain
 * the compiler's decision; staging a reference grants no target claim.
 */
export const STAGED_PATHS: readonly string[] = [...HOST_PATHS, ...CANON_PATHS, ...REFERENCE_PATHS]

/** Lists the guide files the checkout fixture supplies beside its catalog. */
export const CHECKOUT_GUIDE_PATHS: readonly string[] = Object.freeze([
	'guides/README.md',
	...SEED_GUIDE_PATHS,
	'guides/contract.md',
	'guides/emitter.md',
])

/**
 * Holds the fixture skill canon a pointer set reads, keyed by destination.
 *
 * @remarks
 * Each name in `TARGET_SKILL_NAMES` carries a canonical `SKILL.md` opening with
 * its `name` and a `description` holding a `Use ` sentence, the four-line
 * `agents/openai.yaml` sidecar, and a Claude bridge naming the canonical path.
 * {@link buildFleetManifest} declares these destinations with the digests of
 * this text and {@link createHostRoot} writes it, so hydration derives every
 * pointer from real frontmatter.
 */
export const SKILL_CANON_FILES: Readonly<Record<string, string>> = Object.freeze(
	Object.fromEntries(
		TARGET_SKILL_NAMES.flatMap((name): ReadonlyArray<readonly [string, string]> => {
			const frontmatter = `---\nname: ${name}\ndescription: Runs the ${name} fixture workflow. Use when a proof needs the ${name} skill.\n---\n`
			return [
				[
					`.agents/skills/${name}/SKILL.md`,
					`${frontmatter}\n# Run the ${name} fixture\n\nFollow the fixture steps in order.\n`,
				],
				[
					`.agents/skills/${name}/agents/openai.yaml`,
					`interface:\n  display_name: '${name}'\n  short_description: 'Runs the ${name} fixture workflow'\n  default_prompt: 'Use $${name} to run the fixture workflow.'\n`,
				],
				[
					`.claude/skills/${name}/SKILL.md`,
					`${frontmatter}\nRead \`.agents/skills/${name}/SKILL.md\` completely and follow it.\n`,
				],
			]
		}),
	),
)

/**
 * Builds the manifest a vendored root storing every planned path declares.
 *
 * @returns A manifest whose digest is computed from the membership it carries.
 *
 * @remarks
 * Wider than {@link buildVendoredManifest}, and for a different question: that
 * one gives a writer every shape a vendored entry has, while this one gives a
 * whole compiled plan somewhere to resolve. A plan claims every path in
 * `HOST_PATHS`, and a host that does not carry one of them refuses the write, so
 * a fixture driving the executable needs the complete set rather than a sample.
 *
 * The manifest includes {@link CATALOG_AGENT_PATH}, the reference guides, and
 * the {@link SKILL_CANON_FILES} skill canon the pointer set hydrates from.
 * The fixture reads the checkout's script and guide membership. Hydration must
 * select the claimed files while leaving unclaimed reference guides in the host.
 */
export function buildFleetManifest(): HostManifest {
	const planned = [...HOST_PATHS, CATALOG_AGENT_PATH, ...REFERENCE_PATHS]
	const entries = [
		...planned.flatMap((path) => {
			if (!HOST_DIRECTORY_PATHS.includes(path)) {
				return [buildManifestEntry({ storage: pathToStorage(path), destination: path })]
			}
			const directory = fileURLToPath(new URL(`../${path}/`, import.meta.url))
			return listFiles(directory).map((name) => {
				const destination = `${path}/${name}`
				return buildManifestEntry({
					storage: pathToStorage(destination),
					destination,
					executable: matchesExecutablePath(destination),
				})
			})
		}),
		...Object.entries(SKILL_CANON_FILES).map(([destination, text]) =>
			buildManifestEntry({
				storage: pathToStorage(destination),
				destination,
				digest: computeDigest(text),
			}),
		),
	]
	const roots = planned.filter((path) => HOST_DIRECTORY_PATHS.includes(path))
	const membership = { entries, roots, surface: [] }
	return {
		...membership,
		digest: computeManifestDigest(membership.entries, membership.roots, membership.surface),
	}
}

/**
 * Writes a real checkout carrying every staged path, as the stager reads one.
 *
 * @param workspace - The temporary workspace the checkout is written into.
 * @param relative - The workspace-relative directory to write it at.
 * @returns The checkout's absolute path.
 *
 * @remarks
 * The stager reads the lists {@link STAGED_PATHS} combines, so the checkout beneath it
 * is the only seam a stager test has. Every file
 * carries its own path as its content except the catalog, which carries package rows.
 * A file staged under the wrong storage
 * name is visible in the assertion rather than in a count. Each staged directory
 * receives a sample file except `guides`, which covers the catalog and seed mirrors,
 * and `.claude/skills`, which is left empty
 * because that is the root a file inventory cannot see and the one the manifest
 * exists to declare.
 * Records the fixture guides' collision baseline in `host.json` so ordinary staging
 * exercises the release path. Bootstrap controls remove that inventory explicitly.
 */
export function createCheckout(workspace: ScratchInterface, relative: string): string {
	const root = workspace.ensure(relative)
	for (const path of STAGED_PATHS) {
		if (!HOST_DIRECTORY_PATHS.includes(path)) {
			workspace.write(`${relative}/${path}`, `${path}\n`)
			continue
		}
		workspace.ensure(`${relative}/${path}`)
		if (path === '.claude/skills') continue
		if (path === 'guides') {
			for (const guide of CHECKOUT_GUIDE_PATHS)
				workspace.write(`${relative}/${guide}`, `${guide}\n`)
			continue
		}
		const destination = `${path}/${path === 'scripts' ? 'codex.sh' : 'sample.md'}`
		workspace.write(`${relative}/${destination}`, `${destination}\n`)
	}
	workspace.write(`${relative}/${CATALOG_AGENT_PATH}`, CATALOG_AGENT_ROWS_TEXT)
	workspace.write(
		`${relative}/host.json`,
		JSON.stringify(
			buildStagedManifest({
				surface: [...readSurfaceCollisions(join(root, 'guides'))].map(([name, owners]) => ({
					name,
					owners,
				})),
			}),
		),
	)
	return root
}

/**
 * Refuses Guide resolution while preserving the host resolver for every other module.
 *
 * @param specifier - The requested module name.
 * @param context - The host resolution context.
 * @param next - The real resolver for the remaining hook chain.
 * @returns The host's resolution for modules outside the controlled prerequisite.
 * @throws An error carrying `MODULE_NOT_FOUND` for `@orkestrel/guide`.
 */
export const refuseGuideResolution: ResolveHookSync = (specifier, context, next) => {
	if (specifier === '@orkestrel/guide') {
		throw Object.assign(new Error('Cannot find module @orkestrel/guide'), {
			code: 'MODULE_NOT_FOUND',
		})
	}
	return next(specifier, context)
}

/** Supplies Surface rows with repeated declarations and non-name references. */
export const STAGING_SURFACE_TEXT =
	'## Surface\n\n| Name | Kind | Summary |\n| --- | --- | --- |\n| `Shared` | interface | References `Mentioned`. |\n| `Shared` | interface | Repeats the same owner. |\n| `Another` | function | References `Mentioned`. |\n'

/** Supplies checkout guides for inventory staging comparisons. */
export const STAGING_SURFACE_FILES: Snapshot = Object.freeze({
	'checkout/guides/alpha.md': STAGING_SURFACE_TEXT,
	'checkout/guides/beta.md': STAGING_SURFACE_TEXT,
})

/**
 * Builds the manifest a host staged from {@link createCheckout} must declare.
 *
 * @returns A manifest whose digest is computed from the membership it carries.
 *
 * @remarks
 * Written from the checkout the fixture wrote rather than from anything the
 * stager returns, so a stager that vendored the wrong set, mapped a storage name
 * differently, or dropped the empty root is caught by an unequal membership. The
 * order is stated too, because the digest authenticates order: entries sort by
 * storage name and roots sort as paths.
 */
export function buildCheckoutManifest(): HostManifest {
	const entries = [
		...STAGED_PATHS.flatMap((path) => {
			if (!HOST_DIRECTORY_PATHS.includes(path)) {
				return [
					buildManifestEntry({
						storage: pathToStorage(path),
						destination: path,
						executable: matchesExecutablePath(path),
						digest: computeDigest(`${path}\n`),
					}),
				]
			}
			if (path === '.claude/skills') return []
			if (path === 'guides') {
				return CHECKOUT_GUIDE_PATHS.map((guide) =>
					buildManifestEntry({
						storage: guide,
						destination: guide,
						digest: computeDigest(`${guide}\n`),
					}),
				)
			}
			const destination = `${path}/${path === 'scripts' ? 'codex.sh' : 'sample.md'}`
			return [
				buildManifestEntry({
					storage: pathToStorage(destination),
					destination,
					executable: matchesExecutablePath(destination),
					digest: computeDigest(`${destination}\n`),
				}),
			]
		}),
		buildManifestEntry({
			storage: pathToStorage(CATALOG_AGENT_PATH),
			destination: CATALOG_AGENT_PATH,
			digest: computeDigest(CATALOG_AGENT_ROWS_TEXT),
		}),
	]
	const roots = STAGED_PATHS.filter((path) => HOST_DIRECTORY_PATHS.includes(path))
	const membership = {
		entries: [...entries].sort((first, second) => (first.storage < second.storage ? -1 : 1)),
		roots: [...roots].sort(),
		surface: [],
	}
	return {
		...membership,
		digest: computeManifestDigest(membership.entries, membership.roots, membership.surface),
	}
}

/**
 * Writes a vendored root carrying every planned path, and the target beside it.
 *
 * @param workspace - The temporary workspace both roots are written into.
 * @returns The host root's absolute path and the target directory's absolute path.
 *
 * @remarks
 * The target is a real directory carrying a real manifest and a real `src/core`,
 * which is what the executable reads its own blueprint out of: the name comes
 * from the manifest and the environment axes come from the directories that are
 * actually there. Nothing else is written, so every vendored path is missing and
 * a first audit of it has something to find.
 */
export function createFleet(workspace: ScratchInterface): {
	readonly host: string
	readonly target: string
} {
	const host = createHostRoot(workspace, 'host', buildFleetManifest())
	const target = workspace.ensure('target')
	workspace.write('target/package.json', TARGET_MANIFEST_TEXT)
	workspace.ensure('target/src/core')
	return { host, target }
}

/**
 * Writes a fleet beside a target that already carries a rewritable catalog file.
 *
 * @param workspace - The temporary workspace both roots are written into.
 * @returns The host root's absolute path and the target directory's absolute path.
 *
 * @remarks
 * {@link createFleet} leaves the target holding nothing but its manifest, which
 * is what an audit and a repair need. A catalog run needs one thing more: the
 * marked region it rewrites has to exist before it runs, because the writer
 * replaces the text between the markers rather than inventing a file. The
 * vendored copy of that file carries no markers, so the target is given the real
 * shape a consumer's own catalog file has, prose either side included.
 *
 * The file is presence-owned, so a repair that runs afterwards leaves these
 * bytes exactly as they are and the catalog verb remains the only writer of
 * them.
 */
export function createCatalogFleet(workspace: ScratchInterface): {
	readonly host: string
	readonly target: string
} {
	const fleet = createFleet(workspace)
	workspace.write(`target/${CATALOG_AGENT_PATH}`, CATALOG_AGENT_TEXT)
	return fleet
}

/**
 * Puts every file in a target under git's control, without committing.
 *
 * @param path - The repository to track the files of.
 * @returns Nothing.
 *
 * @remarks
 * Deletion draws only on what git tracks, so a candidate git has never seen is
 * skipped whatever the audit found. A real `git add` rather than a fabricated
 * inventory, for the same reason {@link createRepository} runs a real `git
 * init`: the tracked set is git's own answer. Nothing is committed, because a
 * commit needs an identity this suite has no business configuring — the tree is
 * left dirty and the run under test waives that refusal explicitly.
 */
export function trackFiles(path: string): void {
	execFileSync('git', ['add', '--all'], { cwd: path, windowsHide: true, stdio: 'ignore' })
}

/**
 * Commits everything {@link trackFiles} staged, so a run reads a clean tree.
 *
 * @param path - The repository to commit.
 * @returns Nothing.
 *
 * @remarks
 * The destructive verb refuses a tree carrying uncommitted work, and `--dirty`
 * waives that refusal for every path at once. A claim about which paths a clean
 * run treats as dirty therefore needs a real commit rather than the waiver: an
 * ignored file is outside the dirty set, and a waived run cannot tell that apart
 * from a file the waiver covered.
 *
 * The identity is passed per invocation with `-c`, so nothing is written to any
 * git configuration this suite does not own, and the commit is unsigned because
 * a signing key is not a fixture's to require.
 */
export function commitFiles(path: string): void {
	execFileSync(
		'git',
		[
			'-c',
			'user.name=Scaffold Fixture',
			'-c',
			'user.email=fixture@orkestrel.invalid',
			'commit',
			'--quiet',
			'--no-gpg-sign',
			'--message',
			'The state a run reads',
		],
		{ cwd: path, windowsHide: true, stdio: 'ignore' },
	)
}

/**
 * Lists the artifacts the compiler itself supplies for a plan selecting `src/core` alone.
 *
 * @remarks
 * Every artifact no vendored entry answers for: the computed manifest plus each
 * template the blueprint's own axes select. Read from a real compile rather
 * than assembled by hand, because the generated set grows every time the emitter
 * gains a group and a hand-written list goes stale on each one. Repeated
 * staleness rounds are what produced this shape.
 */
export const CORE_GENERATED = (
	new Compiler().compile(createBlueprint('sample', { src: ['core'] })).plan?.artifacts ?? []
).filter((artifact) => artifact.origin !== 'host')

/** Counts the artifacts the compiler supplies for a `src/core` plan. */
export const CORE_GENERATED_COUNT = CORE_GENERATED.length

/**
 * Counts the paths a fleet target's plan claims once the vendored host has hydrated it.
 *
 * @remarks
 * Match the fleet manifest's files against the compiler's host claims, including
 * directory expansion. Unclaimed reference guides contribute no target paths.
 * {@link CORE_GENERATED_COUNT} covers the compiler's template artifacts.
 *
 * A plan claims no vendored directory, so no run adds the extra written path a
 * declared empty root would carry. `Materializer` still materializes such a
 * root, and `src:server` proves it against a manifest that declares one.
 *
 * The suites using this assert that the executable writes every path its plan
 * claims. That the plan claims the right ones is proven separately, against the
 * compiler in `src:core`.
 */
export const FLEET_ARTIFACT_COUNT =
	buildFleetManifest().entries.filter(({ destination }) =>
		blueprintToHostArtifacts(createBlueprint('sample', { src: ['core'] })).some(
			({ path }) => destination === path || destination.startsWith(`${path}/`),
		),
	).length + CORE_GENERATED_COUNT

/**
 * Lists the planned paths a repair leaves alone because the workspace owns them.
 *
 * @remarks
 * A birth-owned artifact is written once, when the workspace is created, and is
 * the consumer's from then on. Repair restores drift and must not overwrite one,
 * so this is exactly what its `skipped` list carries. Read from the plan so
 * it tracks the emitter: the set grew the moment generated source, test and
 * documentation artifacts existed.
 */
export const FLEET_BIRTH_PATHS = CORE_GENERATED.filter(
	(artifact) => artifact.ownership === 'birth',
).map((artifact) => artifact.path)

/** Counts the planned paths a repair skips because the workspace owns them. */
export const FLEET_BIRTH_COUNT = FLEET_BIRTH_PATHS.length

/**
 * Builds the plan {@link buildVendoredManifest} answers for.
 *
 * @param fields - The plan fields to replace on the returned value.
 * @returns A plan carrying one computed artifact and every vendored shape.
 *
 * @remarks
 * `.claude/rules` and `.claude/agents` are directory-shaped host artifacts that
 * hydration expands, and `.claude/skills` is the one that expands into nothing
 * because the host declares it empty.
 */
export function buildVendoredPlan(fields?: Partial<Plan>): Plan {
	return buildPlan({
		groups: ['manifest', 'docs', 'orchestration', 'guides'],
		artifacts: [
			buildContentArtifact({
				path: 'package.json',
				group: 'manifest',
				ownership: 'birth',
				content: '{ "name": "@orkestrel/sample" }\n',
			}),
			buildHostArtifact({ path: 'AGENTS.md', group: 'docs' }),
			buildHostArtifact({ path: '.claude/agents', group: 'orchestration' }),
			buildHostArtifact({ path: '.claude/rules', group: 'orchestration' }),
			buildHostArtifact({ path: '.claude/skills', group: 'orchestration' }),
			buildHostArtifact({ path: 'guides/guide.md', group: 'guides' }),
			buildHostArtifact({ path: 'scripts', group: 'orchestration' }),
		],
		...fields,
	})
}

/**
 * Compiles the default blueprint through the real compiler with its default selection.
 *
 * @returns The complete plan produced by the compiler.
 */
export function buildCompiledPlan(): Plan {
	const compiler = new Compiler()
	try {
		const scaffolding = compiler.compile(buildBlueprint())
		if (scaffolding.plan === undefined) throw new Error('Expected the default blueprint to compile')
		return scaffolding.plan
	} finally {
		compiler.destroy()
	}
}

/**
 * Builds the audit a target is in, declaring which paths the caller made stale.
 *
 * @param target - The target directory to read.
 * @param paths - The plan-relative paths the audit covers.
 * @param stale - The paths the caller deliberately edited.
 * @returns One finding per path, carrying the bytes actually read at it.
 *
 * @remarks
 * The bytes come from a real read through the package's own reader, so no test
 * has to restate how a byte comparison is spelled. The verdict comes from the
 * caller, because the caller is what caused it: a path it deleted is missing, a
 * path it names here is stale, and everything else is aligned. That split is
 * what keeps this a statement of intent rather than a second implementation of
 * the drift rule.
 */
export function buildTargetAudit(
	target: string,
	paths: readonly string[],
	stale: readonly string[],
): Audit {
	// A hole in `paths` reads as an `undefined` path, which the byte read refuses.
	const findings = Iterator.from(paths)
		.map((path): Finding => {
			const observed = readFileHex(target, path)
			return observed === undefined
				? { path, group: 'docs', ownership: 'content', drift: 'missing' }
				: {
						path,
						group: 'docs',
						ownership: 'content',
						drift: stale.includes(path) ? 'stale' : 'aligned',
						observed,
					}
		})
		.toArray()
	return { findings, questions: [] }
}

/**
 * Holds the catalog agent file as a target carries it, markers and surrounding prose included.
 *
 * @remarks
 * The marker pair is read from the shared constants the writer reads, so the
 * fixture and the writer cannot drift apart.
 */
export const CATALOG_AGENT_TEXT = [
	'# Orkestrel',
	'',
	'Prose a consumer wrote above the table.',
	'',
	CATALOG_OPENING_MARKER,
	'| Package | Version |',
	'| --- | --- |',
	CATALOG_CLOSING_MARKER,
	'',
	'Prose a consumer wrote below the table.',
	'',
].join('\n')

/**
 * Holds the catalog agent file carrying a package table a reader can list names from.
 *
 * @remarks
 * The rows are what {@link CATALOG_AGENT_TEXT} deliberately lacks. The trailing
 * row names something that is not a published package, so a reading that matched
 * every first cell rather than every package name reports it.
 */
export const CATALOG_AGENT_ROWS_TEXT = [
	'# Orkestrel',
	'',
	CATALOG_OPENING_MARKER,
	'| Package | Version |',
	'| --- | --- |',
	'| @orkestrel/contract | 0.0.9 |',
	'| @orkestrel/emitter | 0.0.6 |',
	'| not a package | 0.0.1 |',
	CATALOG_CLOSING_MARKER,
	'',
].join('\n')

/** Lists the development dependencies planned for the fixture's published core environment. */
export const TARGET_DEV_DEPENDENCIES = blueprintToDevDependencies(
	createBlueprint('sample', { src: ['core'] }),
)

/**
 * Builds a target manifest with focused dependency-section replacements.
 *
 * @param blueprint - The workspace shape whose scripts and tools are planned.
 * @param dependencies - The value to place at `dependencies`.
 * @param development - The value to place at `devDependencies`.
 * @param scripts - The value to place at `scripts`.
 * @returns A sample target manifest carrying the fixture's planned scripts.
 */
export function buildTargetManifest(
	blueprint: Blueprint = createBlueprint('sample', { src: ['core'] }),
	dependencies: unknown = {
		'@orkestrel/emitter': '^0.0.5',
		vite: '~8.2.0',
	},
	development: unknown = blueprintToDevDependencies(blueprint),
	scripts: unknown = blueprintToScripts(blueprint),
): string {
	return `${JSON.stringify(
		{
			name: '@orkestrel/sample',
			description: 'A sample workspace.',
			scripts,
			dependencies,
			devDependencies: development,
		},
		undefined,
		'\t',
	)}\n`
}

/**
 * Removes selected dependency names from an inert manifest section.
 *
 * @param dependencies - The section to copy.
 * @param names - The names to omit.
 * @returns A copy without the selected names.
 */
export function omitDependencies(
	dependencies: Readonly<Record<string, string>>,
	names: readonly string[],
): Readonly<Record<string, string>> {
	return Object.fromEntries(Object.entries(dependencies).filter(([name]) => !names.includes(name)))
}

/** Holds a target manifest declaring its planned scripts, tools, fleet packages, and an extra. */
export const TARGET_MANIFEST_TEXT = buildTargetManifest(
	undefined,
	{
		'@orkestrel/emitter': '^0.0.5',
		vite: '~8.2.0',
	},
	{ ...TARGET_DEV_DEPENDENCIES, '@orkestrel/guide': '^0.0.9' },
)

/**
 * Holds a target manifest whose own name the compile gate refuses.
 *
 * @remarks
 * A target describes its own blueprint, so a name it cannot generate from is the
 * one way a reading verb meets a refused blueprint. The capital is the whole
 * defect: a published package name is lowercase.
 */
export const REFUSED_MANIFEST_TEXT = `${JSON.stringify(
	{
		name: '@orkestrel/Sample',
		scripts: blueprintToScripts(createBlueprint('Sample')),
		devDependencies: blueprintToDevDependencies(createBlueprint('Sample')),
	},
	undefined,
	'\t',
)}\n`

/**
 * Lists every caller-supplied endpoint the reader's scheme and host law decides.
 *
 * @remarks
 * `isEndpoint` bounds length and nothing else, so every case here is a string
 * that guard already admits: what is being measured is the entity's own law
 * sitting behind it. The loopback spellings are accepted because an
 * unencrypted request that never leaves the machine has no network between its
 * ends; the same scheme to any other host is refused, and so is every
 * scheme that is not HTTP at all.
 */
export const UPSTREAM_ENDPOINT_CASES: readonly TestEndpointCase[] = [
	{ label: 'the canonical registry', base: 'https://registry.npmjs.org', accepted: true },
	{ label: 'a guide host with a path prefix', base: 'https://example.test/raw', accepted: true },
	{ label: 'loopback by address', base: 'http://127.0.0.1:8080', accepted: true },
	{ label: 'loopback by name', base: 'http://localhost:8080', accepted: true },
	{ label: 'loopback over IPv6', base: 'http://[::1]:8080', accepted: true },
	{ label: 'loopback over HTTPS', base: 'https://127.0.0.1:8080', accepted: true },
	{ label: 'a local file', base: 'file:///etc/passwd', accepted: false },
	{ label: 'a local file on a Windows drive', base: 'file:///C:/secrets.txt', accepted: false },
	{ label: 'an inline data payload', base: 'data:text/plain,hi', accepted: false },
	{ label: 'a file transfer scheme', base: 'ftp://registry.npmjs.org', accepted: false },
	{ label: 'plain HTTP to a real host', base: 'http://registry.npmjs.org', accepted: false },
	{
		label: 'plain HTTP to a near-loopback name',
		base: 'http://localhost.attacker.test',
		accepted: false,
	},
	{ label: 'text that is not a URL at all', base: 'registry.npmjs.org', accepted: false },
	{ label: 'a scheme with no host', base: 'https://', accepted: false },
	{
		label: 'an endpoint carrying credentials',
		base: 'https://user:key@registry.npmjs.org',
		accepted: false,
	},
	{
		label: 'an endpoint carrying a query',
		base: 'https://registry.npmjs.org/?token=1',
		accepted: false,
	},
	{
		label: 'an endpoint carrying a fragment',
		base: 'https://registry.npmjs.org/#latest',
		accepted: false,
	},
]

/**
 * Builds the registry packument text a version lookup reads.
 *
 * @param version - The version to publish under `dist-tags.latest`.
 * @param edges - The declared ranges the published version carries; omitted for
 * a packument that declares none.
 * @returns The response body, as the abbreviated packument form the registry
 * serves for `application/vnd.npm.install-v1+json`.
 * @throws Error - When the version is empty; a packument names every version it publishes.
 *
 * @remarks
 * Written here as literal registry JSON rather than derived from anything the
 * reader owns, so the reader is measured against the upstream contract instead
 * of against itself. The abbreviated form carries `dist-tags` and a `versions`
 * map whose per-version record holds `dependencies`, `devDependencies`, and
 * `peerDependencies` alongside `dist`, `engines`, `name`, and `version` —
 * verified against `registry.npmjs.org` — so every edge kind is writable here
 * and a reader that reads the wrong one is caught.
 */
export function buildPackument(version: string, edges?: TestPackumentEdges): string {
	if (version.length === 0) {
		throw new Error('A packument publishes at least one version, and every version is named')
	}
	return JSON.stringify({
		'dist-tags': { latest: version },
		name: '@orkestrel/sample',
		versions: {
			[version]: {
				name: '@orkestrel/sample',
				version,
				...(edges?.dependencies === undefined ? {} : { dependencies: edges.dependencies }),
				...(edges?.development === undefined ? {} : { devDependencies: edges.development }),
				...(edges?.peer === undefined ? {} : { peerDependencies: edges.peer }),
			},
		},
	})
}

/**
 * Builds the registry organization package-list text a catalog reads.
 *
 * @param names - The published package names the organization lists.
 * @returns The response body, as the flat name-to-access map the registry serves.
 */
export function buildOrganization(names: readonly string[]): string {
	return JSON.stringify(Object.fromEntries(names.map((name) => [name, 'read-write'])))
}

/**
 * Lists the vendored files the repository fixture serves, keyed for a test to name one.
 *
 * @remarks
 * `orchestration` carries a leading-dot directory and `mirror` is a guide the
 * mirror verb owns, so the set covers the two paths whose handling differs from
 * a plain root file rather than only the case that needs no special handling.
 */
export const VENDORED_FILES = Object.freeze({
	agents: Object.freeze({ path: 'AGENTS.md', content: '# Agents\n' }),
	license: Object.freeze({ path: 'LICENSE', content: 'MIT\n' }),
	orchestration: Object.freeze({
		path: '.agents/orchestration.md',
		content: '# Orchestration\n',
	}),
	mirror: Object.freeze({ path: 'guides/guide.md', content: '# Guide\n' }),
})

/**
 * Builds the committed inventory text a vendored read is decided against.
 *
 * @param files - The vendored files the inventory declares, in declaration order.
 * @returns The manifest body, carrying a per-file digest and a membership digest over that exact order.
 *
 * @remarks
 * Every field is derived the way the real stage derives it, so an inventory this
 * builds is one the reader's own manifest guard admits. The list is taken in the
 * caller's order rather than sorted, which is what lets a test declare one
 * destination twice and measure what the reader does with an ambiguous row.
 */
export function buildInventory(files: readonly TestVendoredFile[]): string {
	const entries: readonly ManifestEntry[] = files.map((file) => ({
		storage: pathToStorage(file.path),
		destination: file.path,
		executable: matchesExecutablePath(file.path),
		digest: computeDigest(file.content),
	}))
	return JSON.stringify({
		entries,
		roots: [],
		surface: [],
		digest: computeManifestDigest(entries, [], []),
	})
}

/**
 * Builds the raw-repository replies for the installed vendored host.
 *
 * @param floor - The installed floor whose inventory and host-owned bytes the
 * repository serves.
 * @returns One canonical raw-content reply for the inventory and each
 * host-owned declared path.
 *
 * @remarks
 * Deferred paths stay absent because the catalog and guide surfaces own their
 * bytes. The raw-content paths are the repository's external URL contract, not
 * a projection through the reader under test.
 */
export function buildInstalledHostReplies(
	floor: Host = readHostFloor(),
): Readonly<Record<string, TestUpstreamReply>> {
	return Object.fromEntries([
		[
			'/orkestrel/scaffold/refs/heads/main/host.json',
			{ status: 200, body: JSON.stringify(floor.manifest) },
		],
		// The iterator consumes one entry at a time and reads a hole as an `undefined` entry, which the
		// destination read refuses before a later entry is read.
		...Iterator.from(floor.manifest.entries)
			.flatMap((entry): Array<[string, TestUpstreamReply]> => {
				if (isDeferredPath(entry.destination)) return []
				const hex = floor.bytes[entry.destination]
				return hex === undefined
					? []
					: [
							[
								`/orkestrel/scaffold/refs/heads/main/${entry.destination}`,
								{
									status: 200,
									body: Buffer.from(hex, 'hex').toString('utf8'),
									type: 'text/plain',
								},
							],
						]
			})
			.toArray(),
	])
}

/**
 * Builds the target snapshot a vendored read is held to.
 *
 * @param files - The files the target holds, with the exact bytes it holds.
 * @returns Those bytes as hexadecimal, keyed by the same paths.
 */
export function buildVendoredSnapshot(files: readonly TestVendoredFile[]): Snapshot {
	return Object.fromEntries(files.map((file) => [file.path, contentToHex(file.content)]))
}

/**
 * Writes one scripted reply onto a real HTTP response.
 *
 * @param response - The open server response to answer on.
 * @param reply - The scripted status, body, and transfer form.
 * @returns Nothing.
 *
 * @remarks
 * A chunked reply omits `content-length` so the runtime really does chunk it.
 * Every other reply declares the encoded wire body's true byte length.
 */
export function writeUpstreamReply(response: ServerResponse, reply: TestUpstreamReply): void {
	const body =
		reply.encoding === 'gzip'
			? gzipSync(reply.body)
			: typeof reply.body === 'string'
				? Buffer.from(reply.body, 'utf8')
				: Buffer.from(reply.body)
	const headers: Record<string, string> = {
		'content-type': reply.type ?? 'application/json',
		...(reply.location === undefined ? {} : { location: reply.location }),
		...(reply.encoding === undefined ? {} : { 'content-encoding': reply.encoding }),
		...(reply.chunked === true ? {} : { 'content-length': String(body.byteLength) }),
	}
	response.writeHead(reply.status, headers)
	response.end(body)
}

/**
 * Starts a real HTTP server on loopback, scripted per request path.
 *
 * @param replies - The reply to serve at each exact request path.
 * @returns The running fixture, which the caller destroys in a `finally`.
 *
 * @remarks
 * A real `node:http` server on a real socket, speaking real HTTP/1.1: the reader
 * under test drives it through the same `fetch` it drives npm and GitHub with,
 * so nothing the package owns is replaced or simulated. It scripts the peer's
 * answers and nothing else. A path the table does not name answers `404`, which
 * is what makes a reader that built the wrong URL visible as a missing verdict
 * rather than as a silent pass.
 *
 * @example
 * ```ts
 * const server = await createUpstreamServer({ '/x': { status: 200, body: '{}' } })
 * try {
 * 	await fetch(`${server.base}/x`)
 * } finally {
 * 	await server.destroy()
 * }
 * ```
 */
export async function createUpstreamServer(
	replies: Readonly<Record<string, TestUpstreamReply>>,
): Promise<TestUpstreamInterface> {
	const served = createRecorder<readonly [string]>()
	const negotiated = createRecorder<readonly [string | undefined]>()
	// Each connection event is +1 when a request opens and -1 when its response closes, in order.
	const connections = createRecorder<readonly [number]>()
	const pending = Object.keys(replies).map((path) => ({ path, ...Promise.withResolvers<void>() }))
	const arrivals = new Map(
		pending.map(({ path, promise }): [string, Promise<void>] => [path, promise]),
	)
	const waiters = new Map(pending.map(({ path, resolve }): [string, () => void] => [path, resolve]))
	const server = createServer((request, response) => {
		const path = request.url ?? ''
		served.handler(path)
		negotiated.handler(request.headers.accept)
		connections.handler(1)
		response.on('close', () => {
			connections.handler(-1)
		})
		waiters.get(path)?.()
		const reply = replies[path]
		if (reply === undefined) {
			writeUpstreamReply(response, { status: 404, body: '{"error":"Not found"}' })
			return
		}
		if (reply.held === true) return
		if (reply.delay === undefined) {
			writeUpstreamReply(response, reply)
			return
		}
		setTimeout(() => {
			if (!response.destroyed) writeUpstreamReply(response, reply)
		}, reply.delay).unref()
	})
	// The server and the fetch client share one event loop. After a long synchronous
	// stretch both idle timers are overdue and the server's can fire first, so the
	// client reuses a socket the server is closing and the read fails as a transport
	// fault. The client's own idle timeout retires a pooled socket instead.
	server.keepAliveTimeout = 0
	const loopback = await createLoopback(server)
	return {
		base: loopback.url,
		get paths() {
			return served.calls.map(([path]) => path)
		},
		get accepts() {
			return negotiated.calls.map(([accept]) => accept)
		},
		get peak() {
			return connections.calls.reduce(
				(state, [delta]) => ({
					open: state.open + delta,
					peak: Math.max(state.peak, state.open + delta),
				}),
				{ open: 0, peak: 0 },
			).peak
		},
		arrival(path: string) {
			return arrivals.get(path) ?? Promise.resolve()
		},
		destroy: loopback.destroy,
	}
}

/**
 * Normalizes a host path for a Bash argument.
 *
 * @param path - The host path to normalize.
 * @returns The path with slash separators Bash accepts on every supported host.
 */
export function normalizeBashPath(path: string): string {
	return process.platform === 'win32' ? path.replaceAll('\\', '/') : path
}

/**
 * Renders a POSIX shell launcher for an executable at its installed path.
 *
 * @param source - The executable path the launcher delegates to.
 * @returns The LF-framed shell source with literal argument forwarding.
 */
export function renderLauncher(source: string): string {
	return `#!/bin/sh\nexec '${normalizeBashPath(source).replaceAll("'", "'\"'\"'")}' "$@"\n`
}

/**
 * Reads the configured Ollama SessionStart command.
 *
 * @returns The command that addresses `scripts/ollama.sh`.
 * @throws When the settings file does not declare that command.
 */
export function readOllamaHookCommand(): string {
	const text = readFileText(WORKSPACE_ROOT, '.claude/settings.json')
	if (text === undefined) throw new Error('Claude settings are unreadable')
	const settings = parseJSON(text)
	if (!isRecord(settings) || !isRecord(settings.hooks) || !isArray(settings.hooks.SessionStart)) {
		throw new Error('Claude settings declare no SessionStart hooks')
	}
	for (const session of settings.hooks.SessionStart) {
		if (!isRecord(session) || !isArray(session.hooks)) continue
		for (const hook of session.hooks) {
			if (!isRecord(hook) || !isString(hook.command)) continue
			if (hook.command.includes('scripts/ollama.sh')) return hook.command
		}
	}
	throw new Error('Claude settings declare no Ollama SessionStart command')
}

/**
 * Resolves the POSIX shell that can run `scripts/ollama.sh`.
 *
 * @returns A PATH-resolved `bash` or `sh` regular file, or `undefined` on Windows.
 *
 * @remarks
 * Running `scripts/ollama.sh` requires a POSIX process group, `setsid`, and `command -v`.
 * Windows is not that host: a WindowsApps `bash.exe` alias is not a regular file, and Git Bash
 * cannot terminate a Windows `ollama.exe` tree. This function therefore returns `undefined` on
 * `win32` and never consults PATH for bash there. A POSIX host, including Claude Code Cloud,
 * resolves `bash` then `sh` through {@link resolveTool}, which accepts only a regular file.
 */
export function resolveOllamaShell(): string | undefined {
	if (process.platform === 'win32') return undefined
	return resolveTool('bash') ?? resolveTool('sh')
}

/**
 * Executes the configured Ollama SessionStart command against a project path.
 *
 * @param project - The project path exposed to the hook.
 * @param remote - The Claude Code remote marker, or `undefined` when absent.
 * @param environment - The Windows setup environment. Default: this process's environment.
 * @returns The bounded child-process outcome.
 * @throws When the host cannot run the POSIX script.
 *
 * @remarks
 * A POSIX host, including Claude Code Cloud, writes the registered bash command and runs it
 * through {@link resolveOllamaShell}. Windows evaluates the remote gate in process and uses the
 * native HTTP setup. Only local startup resolves and launches the installed Ollama executable.
 */
export async function executeOllamaHook(
	project: string,
	remote: string | undefined,
	environment: NodeJS.ProcessEnv = process.env,
): Promise<ExecuteResult> {
	if (process.platform === 'win32') {
		if (remote !== 'true') return buildOllamaResult(0, '')
		return executeWindowsOllama(
			readVariable(environment, 'OLLAMA_HOST') ?? 'http://127.0.0.1:11434',
			readVariable(environment, 'OLLAMA_MODEL') ?? 'qwen3.5:2b-q4_K_M',
			environment,
			project,
		)
	}
	const shell = resolveOllamaShell()
	if (shell === undefined) {
		throw new Error('Ollama hook tests require a POSIX shell and POSIX process groups')
	}
	const command = readOllamaHookCommand()
	const scratch = createScratch({ prefix: SCRATCH_PREFIX })
	try {
		const hook = scratch.write('hook.sh', `${command}\n`)
		return await execute(
			{
				file: shell,
				arguments: [normalizeBashPath(hook)],
				environment: {
					CLAUDE_CODE_REMOTE: remote,
					CLAUDE_PROJECT_DIR: normalizeBashPath(project),
				},
			},
			{ workspace: WORKSPACE_ROOT, timeout: 10_000, strict: false },
		)
	} finally {
		scratch.destroy()
	}
}

/**
 * Lists the executables `scripts/ollama.sh` launches, read from the script itself.
 *
 * @remarks
 * Every name the script passes to `command -v`, and every program it runs, in alphabetical
 * order: `curl` for its requests, `node` for its URL and JSON handling, `dirname` and `mkdir`
 * for the temporary directory it anchors, `mktemp`, `rm`, `sh`, and `timeout` for the automatic
 * installation, `setsid` and `sleep` for the daemon it starts and waits on, and `uname` for the
 * kernel readings that gate both. `kill`, `printf`, `command`, `cd`, and `pwd` are Bash builtins
 * and reach no `PATH` entry. The set is what a proof gives the script, and `ollama` is
 * deliberately absent from it. Hosts without the POSIX shell capability skip the script tests.
 */
export const OLLAMA_TOOLS: readonly string[] = Object.freeze([
	'curl',
	'dirname',
	'mkdir',
	'mktemp',
	'node',
	'rm',
	'setsid',
	'sh',
	'sleep',
	'timeout',
	'uname',
])

/**
 * Resolves a command name to the executable a `PATH` lookup reaches.
 *
 * @param tool - The command name to look up.
 * @param environment - The environment whose `PATH` is searched. Default: this process's own.
 * @returns The path of the first regular file the lookup reaches, or `undefined` when it reaches
 * none.
 *
 * @remarks
 * `resolveExecutable` answers `undefined` on a POSIX host, where the host runs its own lookup at
 * spawn time, so a caller that needs the path itself reads it here. Windows delegates to that
 * resolver for its PATH and PATHEXT lookup. POSIX joins the name onto each `PATH` entry in order.
 * Each host accepts only regular files; the POSIX reading checks no executable bit.
 */
export function resolveTool(
	tool: string,
	environment: NodeJS.ProcessEnv = process.env,
): string | undefined {
	if (process.platform === 'win32') {
		return resolveExecutable(tool, { workspace: WORKSPACE_ROOT, environment })
	}
	for (const entry of (readVariable(environment, 'PATH') ?? '').split(delimiter)) {
		if (entry === '') continue
		const candidate = join(entry, tool)
		if (isFile(candidate)) return candidate
	}
	return undefined
}

/**
 * Runs the repository's npm floor hook against a project path through bash.
 *
 * @param project - The project path the hook reads as `CLAUDE_PROJECT_DIR`.
 * @param remote - The `CLAUDE_CODE_REMOTE` marker, or `undefined` to run without one.
 * @returns The hook's exit status and its standard output and error, joined and trimmed.
 * @throws Thrown when {@link resolveTool} reaches no `bash` on this host.
 *
 * @remarks
 * The run inherits this process's environment, so the hook reads the ambient npm; a case
 * declares a floor that npm meets, or none, and the hook installs nothing.
 */
export function executeNpmHook(project: string, remote: string | undefined): TestHookResult {
	const bash = resolveTool('bash')
	if (bash === undefined) throw new Error('This host reaches no bash for scripts/npm.sh')
	const { CLAUDE_CODE_REMOTE: _remote, ...inherited } = process.env
	const result = spawnSync(bash, [join(WORKSPACE_ROOT, 'scripts', 'npm.sh')], {
		encoding: 'utf8',
		env:
			remote === undefined
				? { ...inherited, CLAUDE_PROJECT_DIR: project }
				: { ...inherited, CLAUDE_PROJECT_DIR: project, CLAUDE_CODE_REMOTE: remote },
		windowsHide: true,
	})
	return { status: result.status, output: `${result.stdout}${result.stderr}`.trim() }
}

/**
 * Executes the repository's Ollama setup script against a selected endpoint and model.
 *
 * @param host - The endpoint exposed through `OLLAMA_HOST`.
 * @param model - The model exposed through `OLLAMA_MODEL`.
 * @returns The bounded child-process outcome.
 * @throws When the host cannot run the POSIX script.
 *
 * @remarks
 * The POSIX script runs under a `PATH` naming one owned directory, which carries the
 * `OLLAMA_TOOLS` executables this host resolves and nothing else. A host with a real `ollama`
 * installed would otherwise hand it to the script's local-startup branch, and a fixture that
 * answers the readiness probe with anything but a `2xx` status reaches that branch — so a proof
 * would launch a daemon on the host running the suite. `command -v ollama` fails under this
 * `PATH`, and the branch refuses with exit `127` instead. Each launcher delegates to the
 * executable at its installed path, which retains the runtime dependencies resolved beside that
 * executable. The interpreter itself is resolved against this process's own `PATH` and launched
 * by path, because the spawn's own lookup reads the child's `PATH` and would find no `bash` in
 * that directory.
 *
 * Windows drives the HTTP protocol in process with an empty executable search directory.
 * Claude Code Cloud runs `scripts/ollama.sh` through its POSIX shell.
 * The tools directory is removed after the run.
 */
export async function executeOllamaSetup(host: string, model: string): Promise<ExecuteResult> {
	const tools = createScratch({ prefix: SCRATCH_PREFIX })
	try {
		if (process.platform === 'win32') {
			return await executeWindowsOllama(host, model, { PATH: tools.path }, tools.path)
		}
		const shell = resolveOllamaShell()
		if (shell === undefined) {
			throw new Error('Ollama setup tests require a POSIX shell and POSIX process groups')
		}
		for (const tool of OLLAMA_TOOLS) {
			const source = resolveTool(tool)
			if (source === undefined) continue
			const launcher = tools.write(tool, renderLauncher(source))
			chmodSync(launcher, 0o755)
		}
		return await execute(
			{
				file: shell,
				arguments: [normalizeBashPath(join(WORKSPACE_ROOT, 'scripts', 'ollama.sh'))],
				environment: {
					CI: undefined,
					CLAUDE_CODE_REMOTE: undefined,
					OLLAMA_HOST: host,
					OLLAMA_MODEL: model,
					PATH: tools.path,
				},
			},
			{ workspace: WORKSPACE_ROOT, timeout: 10_000, strict: false },
		)
	} finally {
		tools.destroy()
	}
}

/**
 * Translates an in-process Ollama setup outcome into the test execution contract.
 *
 * @param code - The setup exit code.
 * @param message - The diagnostic, or success message for exit zero.
 * @param expired - If `true`, the deadline elapsed; if `false`, it did not.
 * @returns The bounded execution outcome.
 */
export function buildOllamaResult(code: number, message: string, expired = false): ExecuteResult {
	return buildExecuteResult({
		command: 'Ollama HTTP setup',
		stdout: Buffer.from(code === 0 ? message : ''),
		stderr: Buffer.from(code === 0 ? '' : message),
		code,
		signal: null,
		expired,
		aborted: false,
		truncated: false,
		limit: 4096,
	})
}

/**
 * Sends a bounded Ollama HTTP request without following redirects.
 *
 * @param url - The endpoint URL.
 * @param signal - The setup deadline signal.
 * @param body - The JSON request body, or `undefined` for a GET request.
 * @returns The response whose body the caller consumes.
 */
export function requestOllama(
	url: string,
	signal: AbortSignal,
	body?: Readonly<Record<string, unknown>>,
): Promise<Response> {
	return fetch(url, {
		method: body === undefined ? 'GET' : 'POST',
		redirect: 'manual',
		signal,
		...(body === undefined
			? {}
			: { headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }),
	})
}

/**
 * Checks Ollama version readiness within the setup deadline.
 *
 * @param host - The normalized endpoint origin.
 * @param signal - The setup deadline signal.
 * @returns True if the response has a successful HTTP status; false otherwise.
 */
export async function probeOllama(host: string, signal: AbortSignal): Promise<boolean> {
	try {
		const response = await requestOllama(
			`${host}/api/version`,
			AbortSignal.any([signal, AbortSignal.timeout(2000)]),
		)
		await response.body?.cancel()
		return response.ok
	} catch {
		return false
	}
}

/**
 * Parses a configured Ollama endpoint into its HTTP origin.
 *
 * @param host - The HTTP origin, optionally without its scheme.
 * @returns The parsed URL, or `undefined` when the text is empty, is not an HTTP origin, or carries
 * credentials, a path, a query, or a fragment.
 */
export function parseOllamaOrigin(host: string): URL | undefined {
	try {
		const url = new URL(/^https?:\/\//iu.test(host) ? host : `http://${host}`)
		const refused =
			host.length === 0 ||
			(url.protocol !== 'http:' && url.protocol !== 'https:') ||
			url.username !== '' ||
			url.password !== '' ||
			url.pathname !== '/' ||
			url.search !== '' ||
			url.hash !== '' ||
			url.hostname === ''
		return refused ? undefined : url
	} catch {
		return undefined
	}
}

/**
 * Runs the Windows Ollama setup protocol against a selected endpoint.
 *
 * @param host - The HTTP origin, optionally without its scheme.
 * @param model - The model to inspect, pull if absent, and warm.
 * @param environment - The complete executable lookup and child environment.
 * @param workspace - The directory used for executable lookup and native startup.
 * @returns The setup outcome, including exit 127 when local startup has no executable.
 *
 * @remarks
 * Reuses reachable endpoints without spawning. Windows local startup launches a regular-file
 * executable through the process package's detached launcher. Fixture callers supply an empty
 * PATH directory and workspace, so they cannot start an installed host daemon.
 */
export async function executeWindowsOllama(
	host: string,
	model: string,
	environment: NodeJS.ProcessEnv,
	workspace: string,
): Promise<ExecuteResult> {
	if (model.length === 0) return buildOllamaResult(1, 'OLLAMA_MODEL must not be empty')
	const url = parseOllamaOrigin(host)
	if (url === undefined) {
		return buildOllamaResult(
			1,
			'OLLAMA_HOST must be an HTTP origin without credentials, path, query, or fragment',
		)
	}
	const signal = AbortSignal.timeout(10_000)
	try {
		if (!(await probeOllama(url.origin, signal))) {
			const hostname = url.hostname.replace(/^\[|\]$/gu, '')
			const loopback =
				hostname === 'localhost' ||
				hostname === '::1' ||
				(isIP(hostname) === 4 && hostname.startsWith('127.'))
			if (!loopback || url.protocol !== 'http:') {
				return buildOllamaResult(
					1,
					'the configured endpoint is unreachable; local startup is limited to HTTP loopback',
				)
			}
			const file = resolveExecutable('ollama', { workspace, environment })
			if (file === undefined) {
				return buildOllamaResult(
					127,
					'ollama is required to start an unreachable loopback endpoint',
				)
			}
			detach(
				{
					file,
					arguments: ['serve'],
					isolated: true,
					environment: mergeEnvironment(true, environment, { OLLAMA_HOST: url.origin }),
				},
				{ workspace },
			)
			await waitForCondition('Ollama version readiness', () => probeOllama(url.origin, signal), {
				budget: 10_000,
				interval: 100,
				signal,
			})
		}
		const show = await requestOllama(`${url.origin}/api/show`, signal, { model })
		await show.body?.cancel()
		if (show.status === 404) {
			const pull = await requestOllama(`${url.origin}/api/pull`, signal, { model, stream: false })
			const body = parseJSON(await pull.text())
			if (!pull.ok || !isRecord(body) || body.status !== 'success') {
				return buildOllamaResult(1, 'the model pull response did not report completion')
			}
		} else if (!show.ok) {
			return buildOllamaResult(1, 'the model inspection request failed without reporting absence')
		}
		const warm = await requestOllama(`${url.origin}/api/chat`, signal, {
			model,
			messages: [{ role: 'user', content: 'hi' }],
			stream: false,
			think: false,
			keep_alive: '30m',
			options: { num_predict: 1 },
		})
		const body = parseJSON(await warm.text())
		if (!warm.ok || !isRecord(body) || body.done !== true) {
			return buildOllamaResult(1, 'the model warm response did not report completion')
		}
		return buildOllamaResult(0, 'Ollama is ready\n')
	} catch {
		return buildOllamaResult(1, 'Ollama setup request failed', signal.aborted)
	}
}

/**
 * Starts a real loopback HTTP fixture implementing the Ollama setup endpoints.
 *
 * @param options - The model-presence and completion outcomes to serve.
 * @returns The running fixture with its recorded requests.
 */
export async function createOllamaServer(
	options: TestOllamaOptions = {},
): Promise<TestOllamaInterface> {
	const requests = createRecorder<readonly [TestOllamaRequest]>()
	const server = createServer(async (request, response) => {
		const chunks: Buffer[] = []
		for await (const chunk of request) chunks.push(Buffer.from(chunk))
		const text = Buffer.concat(chunks).toString('utf8')
		const method = request.method
		const path = request.url
		requests.handler({ method, path, body: text === '' ? undefined : parseJSON(text) })
		if (method === 'GET' && path === '/api/version') {
			const status = options.status?.version ?? 200
			writeUpstreamReply(
				response,
				status >= 300 && status < 400
					? { status, body: '{"version":"fixture"}', location: '/redirected' }
					: { status, body: '{"version":"fixture"}' },
			)
			return
		}
		if (method === 'POST' && path === '/api/show') {
			writeUpstreamReply(
				response,
				options.present === false
					? { status: 404, body: '{"error":"model not found"}' }
					: { status: 200, body: '{"model_info":{}}' },
			)
			return
		}
		if (method === 'POST' && path === '/api/pull') {
			const status = options.status?.pull ?? 200
			const body = options.pull === false ? '{"status":"pulling"}' : '{\n"status":"success"\n}'
			writeUpstreamReply(
				response,
				status >= 300 && status < 400
					? { status, body, location: '/redirected' }
					: { status, body },
			)
			return
		}
		if (method === 'POST' && path === '/api/chat') {
			const status = options.status?.warm ?? 200
			const body =
				options.warm === false
					? '{"done":false,"message":{"role":"assistant","content":""}}'
					: '{\n"done":true,\n"message":{"role":"assistant","content":""}\n}'
			writeUpstreamReply(
				response,
				status >= 300 && status < 400
					? { status, body, location: '/redirected' }
					: { status, body },
			)
			return
		}
		writeUpstreamReply(response, { status: 404, body: '{"error":"not found"}' })
	})
	const loopback = await createLoopback(server)
	return {
		url: loopback.url,
		get requests() {
			return requests.calls.map(([request]) => request)
		},
		destroy() {
			return loopback.destroy()
		},
	}
}

/**
 * Lists the exact request paths the upstream contract puts a reader at.
 *
 * @remarks
 * Written from the registry's and the raw-content host's own canonical forms
 * rather than derived from anything the reader builds, so a reader that assembles
 * a different URL is answered by the fixture's `404` branch instead of quietly
 * passing. The registry keeps the literal `@` and encodes only the scope
 * boundary; the raw-content host addresses a branch through `refs/heads`.
 *
 * `vendored` addresses this package's own repository on that same host: the
 * committed inventory at the repository root, and the vendored files the
 * inventory declares. Each is written at the checkout-relative path the
 * repository serves it at, which is also the target-relative path a row answers
 * for, so a reader that translated the path on its way to the request is
 * answered by the fixture's `404` branch.
 */
export const UPSTREAM_PATHS = Object.freeze({
	organization: '/-/org/orkestrel/package',
	router: '/@orkestrel%2Frouter',
	emitter: '/@orkestrel%2Femitter',
	console: '/@orkestrel%2Fconsole',
	terminal: '/@orkestrel%2Fterminal',
	guide: '/orkestrel/router/refs/heads/main/guides/router.md',
	branched: '/orkestrel/router/refs/heads/release/0.1.x/guides/router.md',
	vendored: Object.freeze({
		inventory: '/orkestrel/scaffold/refs/heads/main/host.json',
		agents: '/orkestrel/scaffold/refs/heads/main/AGENTS.md',
		license: '/orkestrel/scaffold/refs/heads/main/LICENSE',
		orchestration: '/orkestrel/scaffold/refs/heads/main/.agents/orchestration.md',
		mirror: '/orkestrel/scaffold/refs/heads/main/guides/guide.md',
		branched: '/orkestrel/scaffold/refs/heads/release/0.1.x/host.json',
	}),
})

/**
 * Lists the exact request paths a fleet target's own declared set puts the executable at.
 *
 * @remarks
 * {@link UPSTREAM_PATHS} states the canonical forms the reader is measured
 * against on its own; this states the addresses the fleet fixture's target
 * actually produces when a verb reads upstream for it. The tables answer
 * different questions and each is written from the registry's and the
 * raw-content host's own canonical forms rather than derived from anything the
 * reader builds, so a verb that assembled a different URL is answered by the
 * fixture's `404` branch instead of quietly passing.
 *
 * `packages` addresses a packument and `mirrors` addresses a guide on the
 * raw-content host. `sample` is the target's own package, which the fleet never
 * fetches a guide for because that file is the target's own product.
 */
export const FLEET_UPSTREAM_PATHS = Object.freeze({
	organization: '/-/org/orkestrel/package',
	packages: Object.freeze({
		emitter: '/@orkestrel%2Femitter',
		guide: '/@orkestrel%2Fguide',
		probe: '/@orkestrel%2Fprobe',
		router: '/@orkestrel%2Frouter',
		sample: '/@orkestrel%2Fsample',
		scaffold: '/@orkestrel%2Fscaffold',
		test: '/@orkestrel%2Ftest',
	}),
	mirrors: Object.freeze({
		emitter: '/orkestrel/emitter/refs/heads/main/guides/emitter.md',
		guide: '/orkestrel/guide/refs/heads/main/guides/guide.md',
		probe: '/orkestrel/probe/refs/heads/main/guides/probe.md',
		router: '/orkestrel/router/refs/heads/main/guides/router.md',
		scaffold: '/orkestrel/scaffold/refs/heads/main/guides/scaffold.md',
		test: '/orkestrel/test/refs/heads/main/guides/test.md',
	}),
})

/**
 * Wires one executable run to a recording sink and one loopback fixture.
 *
 * @param sink - The destinations the run writes to.
 * @param base - The fixture's base URL, which both upstream endpoints address.
 * @returns The options one run is constructed over.
 *
 * @remarks
 * Both endpoints are pointed at the one fixture because a fixture scripts paths
 * rather than hosts, and the registry's paths and the raw-content host's paths
 * never collide. Pointing them separately would need a second server to prove
 * nothing extra.
 */
export function buildCLIOptions(sink: TestSinkInterface, base: string): CLIOptions {
	return { ...sink.options, upstream: { registry: { base }, repository: { base } } }
}

/**
 * Runs an asynchronous call and reports the coded reason it refused.
 *
 * @param call - The call under test.
 * @returns The rejected error's code, or `undefined` when the call resolved or
 * rejected with something that is not a {@link ScaffoldError}.
 *
 * @remarks
 * The asynchronous counterpart to {@link captureScaffoldCode}, and it holds the same
 * line: both non-refusals answer `undefined`, so a test naming an expected code
 * fails on either of them and no assertion can pass because nothing was raised.
 */
export async function captureScaffoldRejection(
	call: () => Promise<unknown>,
): Promise<ScaffoldErrorCode | undefined> {
	try {
		await call()
		return undefined
	} catch (error) {
		return isScaffoldError(error) ? error.code : undefined
	}
}

/** Lists every target-relative path the storage mapping decides, beside what it maps to. */
export const STORAGE_PATH_CASES: readonly TestStorageCase[] = [
	{ label: 'a root dotfile', path: '.gitignore', storage: 'dotfiles/gitignore' },
	{
		label: 'a root dotted configuration file',
		path: '.oxlintrc.json',
		storage: 'dotfiles/oxlintrc.json',
	},
	{ label: 'an undotted root file', path: 'AGENTS.md', storage: 'AGENTS.md' },
	{ label: 'a dotted directory', path: '.claude/rules/names.md', storage: 'claude/rules/names.md' },
	{ label: 'a dotted directory holding a dotfile', path: '.cursor/.keep', storage: 'cursor/keep' },
	{ label: 'an undotted nested file', path: 'scripts/codex.sh', storage: 'scripts/codex.sh' },
	{
		label: 'a doubly dotted path',
		path: '.codex/.agents/grok.toml',
		storage: 'codex/agents/grok.toml',
	},
]

/** Lists every command line the executable accepts, beside the exact command it denotes. */
export const COMMAND_CASES: readonly TestCommandCase[] = [
	{
		label: 'new with only its name',
		argv: ['new', 'widget'],
		command: { verb: 'new', name: 'widget', json: false },
	},
	{
		label: 'new with every option it takes',
		argv: [
			'new',
			'widget',
			'--src',
			'core,server',
			'--app',
			'core',
			'--deps',
			'@orkestrel/emitter',
			'--from',
			'./data',
			'--target',
			'./out',
			'--json',
		],
		command: {
			verb: 'new',
			name: 'widget',
			json: true,
			target: './out',
			from: './data',
			src: 'core,server',
			app: 'core',
			dependencies: '@orkestrel/emitter',
		},
	},
	{
		label: 'a name shielded by the option terminator',
		argv: ['new', '--', '--widget'],
		command: { verb: 'new', name: '--widget', json: false },
	},
	{ label: 'bare audit', argv: ['audit'], command: { verb: 'audit', json: false } },
	{
		label: 'audit with every option it takes',
		argv: ['audit', '--groups', 'manifest,configs', '--from', './data', '--target', '.', '--json'],
		command: {
			verb: 'audit',
			json: true,
			target: '.',
			from: './data',
			groups: 'manifest,configs',
		},
	},
	{
		label: 'audit taking an inline option value',
		argv: ['audit', '--target=./elsewhere'],
		command: { verb: 'audit', json: false, target: './elsewhere' },
	},
	{
		label: 'repair scoped to one group',
		argv: ['repair', '--groups', 'source'],
		command: { verb: 'repair', json: false, groups: 'source' },
	},
	{
		label: 'bare catalog',
		argv: ['catalog'],
		command: { verb: 'catalog', json: false, all: false },
	},
	{
		label: 'catalog drawing on two local sources',
		argv: ['catalog', '--all', '--from', './one', '--from', './two', '--target', '.', '--json'],
		command: {
			verb: 'catalog',
			json: true,
			all: true,
			target: '.',
			from: ['./one', './two'],
		},
	},
	{
		label: 'bare overwrite',
		argv: ['overwrite'],
		command: { verb: 'overwrite', json: false, dirty: false },
	},
	{
		label: 'overwrite waiving the dirty-tree refusal',
		argv: ['overwrite', '--dirty', '--groups', 'tests'],
		command: { verb: 'overwrite', json: false, dirty: true, groups: 'tests' },
	},
]

/** Lists every command line that denotes no command, beside what its refusal must name. */
export const USAGE_CASES: readonly TestUsageCase[] = [
	{ label: 'no arguments at all', argv: [], mention: 'No command given' },
	{ label: 'a retired verb', argv: ['pull'], mention: "Unknown command 'pull'" },
	{
		label: 'an option no verb takes',
		argv: ['audit', '--surfaces', 'core'],
		mention: '--surfaces',
	},
	{ label: 'an option another verb takes', argv: ['audit', '--all'], mention: '--all' },
	{
		label: 'a destructive option offered to a creating verb',
		argv: ['new', '--dirty', 'widget'],
		mention: '--dirty',
	},
	{ label: 'new without its name', argv: ['new'], mention: '<name>' },
	{
		label: 'an argument to a verb that takes none',
		argv: ['audit', 'sample'],
		mention: "'sample'",
	},
	{
		label: 'two arguments to the one verb that takes one',
		argv: ['new', 'one', 'two'],
		mention: 'at most one argument',
	},
	{
		label: 'a repeated single-source option',
		argv: ['audit', '--from', './one', '--from', './two'],
		mention: '--from',
	},
	{ label: 'an option missing its value', argv: ['audit', '--target'], mention: '--target' },
	{ label: 'a flag given a value', argv: ['audit', '--json=yes'], mention: 'json' },
	{
		label: 'an option from another verb beside one this verb takes',
		argv: ['overwrite', '--dirty', '--all'],
		mention: '--all',
	},
]

/** Lists every audit shape the exit-code rule decides, with the verdict it owes. */
export const AUDIT_EXIT_CASES: readonly TestAuditCase[] = [
	{ label: 'an audit that found nothing', audit: { findings: [], questions: [] }, clean: true },
	{
		label: 'an aligned target carrying an advisory',
		audit: {
			findings: [{ path: 'AGENTS.md', group: 'docs', ownership: 'birth', drift: 'aligned' }],
			questions: [buildQuestion({ blocking: false })],
		},
		clean: true,
	},
	{
		label: 'a missing planned path',
		audit: { findings: [buildFinding()], questions: [] },
		clean: false,
	},
	{
		label: 'a drifted planned path',
		audit: {
			findings: [
				{
					path: 'AGENTS.md',
					group: 'docs',
					ownership: 'content',
					drift: 'stale',
					observed: '68690a',
				},
			],
			questions: [],
		},
		clean: false,
	},
	{
		label: 'a file the plan does not own',
		audit: {
			findings: [{ path: 'stray.txt', group: 'docs', drift: 'foreign', observed: '68690a' }],
			questions: [],
		},
		clean: false,
	},
	{
		label: 'a blueprint the gate refused',
		audit: { findings: [], questions: [buildQuestion()] },
		clean: false,
	},
]

/**
 * Builds the shortest command line that exercises one option against one verb.
 *
 * @param verb - The verb the line invokes.
 * @param option - The option token, as usage displays it.
 * @returns The command line, carrying the workspace name where the verb needs one.
 *
 * @remarks
 * The option name comes from the executable's own reader rather than from a
 * second copy of the token grammar, so a table that documented an option the
 * parser cannot accept is caught by the run instead of hidden by an agreeing
 * fixture. A token carrying a value placeholder is given an inert one.
 */
export function buildOptionArgv(verb: Verb, option: string): readonly string[] {
	const argument = verb === 'new' ? ['widget'] : []
	const value = option.includes(' ') ? ['sample'] : []
	return [verb, ...argument, `--${optionToName(option)}`, ...value]
}

/**
 * Runs a skill script from this checkout as a child of the current Node binary.
 *
 * @param script - The script path relative to the checkout root, such as
 * `.agents/skills/orkestrel-dispatch/scripts/cite.ts`.
 * @param args - The arguments after the script path.
 * @param options - `cwd` (Default: the checkout root) and `env` entries laid over the process
 * environment.
 * @returns The exit status, both streams as text, and the last non-empty stdout line parsed when it
 * is a JSON object.
 */
export function runSkillScript(
	script: string,
	args: readonly string[],
	options?: TestSkillRunOptions,
): TestSkillRun {
	const result = spawnSync(process.execPath, [join(WORKSPACE_ROOT, script), ...args], {
		cwd: options?.cwd ?? WORKSPACE_ROOT,
		encoding: 'utf8',
		env: buildEnvironment(options?.env),
		windowsHide: true,
		maxBuffer: 64 * 1024 * 1024,
	})
	return buildSkillRun(result.status, result.stdout, result.stderr)
}

/**
 * Builds a child environment from this process's environment and the names a run adds.
 *
 * @remarks
 * A Windows environment block folds variable names by case, so an inherited `NPM_CONFIG_CACHE`
 * would outrank an added `npm_config_cache` and the child would read the value npm launched this
 * suite with. Every inherited variable whose case-folded name an added variable claims is dropped
 * on every host, because npm reads its `npm_config_` variables case-insensitively everywhere.
 *
 * @param overrides - The variables the run adds, or undefined for none.
 * @returns The merged environment.
 */
export function buildEnvironment(
	overrides: Readonly<Record<string, string>> | undefined,
): Record<string, string | undefined> {
	const claimed = new Set(Object.keys(overrides ?? {}).map((key) => key.toLowerCase()))
	const inherited = Object.fromEntries(
		Object.entries(process.env).filter(([key]) => !claimed.has(key.toLowerCase())),
	)
	return { ...inherited, ...overrides }
}

/**
 * Runs a checkout skill script as a child without blocking the event loop, so a fixture server
 * in the same test answers the script's requests while it runs.
 *
 * @param script - The checkout-relative script path.
 * @param args - The script's arguments.
 * @param options - Where the script runs and what its environment adds.
 * @returns The finished run: its exit, both streams, and its last stdout line parsed as JSON.
 */
export function spawnSkillScript(
	script: string,
	args: readonly string[],
	options?: TestSkillRunOptions,
): Promise<TestSkillRun> {
	return new Promise((resolve, reject) => {
		const child = spawn(process.execPath, [join(WORKSPACE_ROOT, script), ...args], {
			cwd: options?.cwd ?? WORKSPACE_ROOT,
			env: buildEnvironment(options?.env),
			windowsHide: true,
			stdio: ['ignore', 'pipe', 'pipe'],
		})
		const stdout: string[] = []
		const stderr: string[] = []
		child.stdout.setEncoding('utf8')
		child.stderr.setEncoding('utf8')
		child.stdout.on('data', (chunk: string) => {
			stdout.push(chunk)
		})
		child.stderr.on('data', (chunk: string) => {
			stderr.push(chunk)
		})
		child.on('error', reject)
		child.on('close', (status) => {
			resolve(buildSkillRun(status, stdout.join(''), stderr.join('')))
		})
	})
}

/**
 * Reads whether the configured npm registry answers a ping, measuring it on the first read only.
 *
 * @remarks
 * The ping takes the launcher's shell, for the reason `TestNpmLauncher` states: without it the
 * probe is false on every Windows host, so the install case never runs there — in
 * `prepublishOnly` included — and the failure reads as "no registry" instead of "this proof
 * cannot launch npm". Every argument handed to npm is a literal, so the shell has nothing to
 * escape. A suite that never asks pays for no ping, because the first read is the measurement.
 */
export class TestRegistry {
	#reachable: boolean | undefined

	/** True if `npm ping` answered within the probe's budget; false otherwise. */
	get reachable(): boolean {
		this.#reachable ??=
			spawnSync(
				NPM_LAUNCHER.command,
				['ping', '--fetch-retries=0', '--fetch-timeout=1000', '--loglevel=silent'],
				{
					cwd: WORKSPACE_ROOT,
					stdio: 'ignore',
					timeout: 5_000,
					windowsHide: true,
					shell: NPM_LAUNCHER.shell,
				},
			).status === 0
		return this.#reachable
	}
}

/** Holds the registry reading every installing proof shares. */
export const NPM_REGISTRY = Object.freeze(new TestRegistry())

/** Holds whether the run is the release run the publish gate invokes with `--mode release`. */
export const RELEASE_MODE: boolean = import.meta.env.MODE === 'release'

/** Describes one shipped declaration whose printed examples the distribution proof drives. */
export interface TestDeclarationCase {
	readonly types: string
	readonly module: string
	readonly controls: readonly string[]
}

/**
 * Lists the declarations a consumer installs, each read because an example is shipped by whichever
 * declaration prints it and a reader hovers over either.
 *
 * @remarks
 * Each carries controls of its own, and none of them is in either built declaration, so every one
 * lies outside the population the instrument covers. One control per outcome the rule can reach,
 * because the instrument has one way to report and says nothing as undriven, glossed, or elided. A
 * false claim must be scored a mismatch, which is the proof the comparison can fail at all. A claim
 * the rule excludes must be named in the set that excluded it — undriven, glossed, or elided —
 * which is the proof the rule reports what it cannot reach instead of dropping it. The false
 * controls in the excluded spellings are the ones the previous instrument dropped silently: it
 * named the statement kind alone, so a corrected example rewritten with a gloss or an elision left
 * every list where it was.
 */
export const DECLARATION_CASES: readonly TestDeclarationCase[] = Object.freeze([
	{
		types: 'dist/src/core/index.d.ts',
		module: 'dist/src/core/index.js',
		controls: [
			// The claim this package shipped before the correction below it, with the
			// value its example only declared. It is false for every blueprint that
			// compiles, and it is the class the previous instrument could not reach.
			[
				"const blueprint = createBlueprint('router', { src: ['core'] })",
				"new Compiler().audit(blueprint, {}).findings.every(({ drift }) => drift === 'missing') // true",
			].join('\n'),
			// A statement rather than an expression, which the rule excludes.
			"if (isGroup('manifest')) inferGroup('AGENTS.md') // 'docs'",
		],
	},
	{
		types: 'dist/src/server/index.d.ts',
		module: 'dist/src/server/index.js',
		controls: [
			"isBranch('main') // false",
			"isBranch('main') // false — a branch name is not a branch",
			"listFiles('./dist/host') // ['definitely-not-a-file', …]",
		],
	},
])

/** Matches one fenced `ts` example block and captures its body. */
export const CLAIM_EXAMPLE = /```ts\n(?<body>[\s\S]*?)```/gu

/**
 * Matches a claim, a line inside a fenced example whose trailing comment states a verdict.
 *
 * @remarks
 * That is the population, and every line in it lands in exactly one of the driven, elided,
 * glossed, and undriven sets. It is driven when the verdict parses as a literal and the expression
 * the comment sits on closes its own brackets and is an expression rather than a statement.
 * Otherwise it is elided, glossed, or undriven, and each of those is asserted as the exact list of
 * lines it holds.
 */
export const CLAIM_LINE = /^(?<expression>\S.*?) \/\/ (?<verdict>.+)$/u

/** Matches the comment prefix a declaration file puts before each example line. */
export const CLAIM_PREFIX = /^\s*\*( |$)/u

/** Matches the first character an expression statement can begin with. */
export const CLAIM_OPENER = /^[A-Za-z_$([]/u

/** Lists the leading words that open a statement rather than an expression. */
export const CLAIM_KEYWORDS: readonly string[] = Object.freeze([
	'await',
	'case',
	'catch',
	'class',
	'const',
	'declare',
	'do',
	'else',
	'export',
	'finally',
	'for',
	'function',
	'if',
	'import',
	'let',
	'return',
	'switch',
	'throw',
	'try',
	'var',
	'while',
])

/**
 * Marks a verdict this instrument declines to read as a literal.
 *
 * @remarks
 * An elided value shows a prefix of a shape rather than the whole of one, so there is nothing to
 * compare a run against and the line is named rather than scored.
 */
export const CLAIM_ELISION = '…'

/** Encodes an `undefined` verdict, which JSON cannot carry, as text no other verdict encodes to. */
export const CLAIM_ABSENT = '\u0000undefined'

/**
 * Holds the child that answers for the claims.
 *
 * @remarks
 * It compiles each example block on its own, so a block this instrument mis-sliced reports its own
 * refusal instead of taking the run down, and it records each claim where the example puts it, so a
 * verdict that depends on the lines above it is read after they have run.
 */
export const CLAIM_DRIVER: string = [
	"import { readFileSync } from 'node:fs'",
	"const payload = JSON.parse(readFileSync(0, 'utf8'))",
	'const module = await import(payload.module)',
	'const names = Object.keys(module).filter((name) => /^[A-Za-z_$][\\w$]*$/u.test(name))',
	"const preamble = 'const { ' + names.join(', ') + ' } = module'",
	'const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor',
	'const recorded = []',
	'const refused = []',
	'const record = (id, value) => {',
	"	recorded.push([id, { driven: true, encoded: value === undefined ? '\\u0000undefined' : String(JSON.stringify(value)) }])",
	'}',
	'const compile = (block) => {',
	'	try {',
	"		return new AsyncFunction('module', 'record', preamble + '\\n' + block.source)",
	'	} catch (error) {',
	'		refused.push(block.claims.map((id) => [id, { driven: false, reason: String(error) }]))',
	'		return undefined',
	'	}',
	'}',
	'for (const block of payload.blocks) {',
	'	const run = compile(block)',
	'	if (run === undefined) continue',
	'	try {',
	'		await run(module, record)',
	'	} catch (error) {',
	'		refused.push(block.claims.map((id) => [id, { driven: false, reason: String(error) }]))',
	'	}',
	'}',
	'process.stdout.write(JSON.stringify(Object.fromEntries([...refused.flat(), ...recorded])))',
].join('\n')

/**
 * Counts the claim-shaped lines across a set of example bodies.
 *
 * @param bodies - The fenced example bodies to read.
 * @returns How many lines carry an expression followed by a `//` verdict.
 */
export function countClaims(bodies: readonly string[]): number {
	return bodies.flatMap((body) => body.split('\n')).filter((line) => CLAIM_LINE.test(line.trim()))
		.length
}

/**
 * Parses the verdict a claim comment states into the text the driver encodes its answer to.
 *
 * @param verdict - The comment text after the `//`.
 * @returns The canonical JSON text of the literal, or `undefined` when the verdict is prose.
 */
export function parseClaimVerdict(verdict: string): string | undefined {
	if (verdict === 'undefined') return CLAIM_ABSENT
	try {
		return JSON.stringify(
			JSON.parse(
				/^(true|false|-?\d+(\.\d+)?)$/u.test(verdict) ? verdict : verdict.replaceAll("'", '"'),
			),
		)
	} catch {
		return undefined
	}
}

/**
 * Checks whether a source fragment closes every bracket and quote it opens.
 *
 * @param text - The source fragment to read.
 * @returns True if the brackets never close beneath zero, end at zero, and no quote stays open;
 * false otherwise.
 */
export function matchesBalance(text: string): boolean {
	const end = [...text].reduce<{
		readonly depth: number
		readonly quote: string
		readonly escaped: boolean
		readonly balanced: boolean
	}>(
		(state, character) => {
			if (!state.balanced) return state
			if (state.escaped) return { ...state, escaped: false }
			if (character === '\\') return { ...state, escaped: true }
			if (state.quote !== '')
				return { ...state, quote: character === state.quote ? '' : state.quote }
			if (character === "'" || character === '"' || character === '`') {
				return { ...state, quote: character }
			}
			const depth =
				'(['.includes(character) || character === '{'
					? state.depth + 1
					: ')]'.includes(character) || character === '}'
						? state.depth - 1
						: state.depth
			return { ...state, depth, balanced: depth >= 0 }
		},
		{ depth: 0, quote: '', escaped: false, balanced: true },
	)
	return end.balanced && end.depth === 0 && end.quote === ''
}

/**
 * Locates the first line of the statement a claim comment sits on.
 *
 * @param lines - The example body's lines.
 * @param index - The index of the line carrying the claim's comment.
 * @param expression - The claim's expression, the comment removed.
 * @returns The index of the shortest run of lines ending at the claim that closes every bracket it
 * opens, or `undefined` when that run is a statement rather than an expression.
 *
 * @remarks
 * A claim printed across several lines is driven as the one expression it is.
 */
export function locateClaimOpening(
	lines: readonly string[],
	index: number,
	expression: string,
): number | undefined {
	const found = Array.from({ length: index + 1 }, (_, offset) => index - offset)
		.map((start) => ({
			start,
			joined: [...lines.slice(start, index), expression].join('\n').trim(),
		}))
		.find(({ joined }) => matchesBalance(joined))
	if (found === undefined || !CLAIM_OPENER.test(found.joined)) return undefined
	return CLAIM_KEYWORDS.includes(/^[A-Za-z_$][\w$]*/u.exec(found.joined)?.[0] ?? '')
		? undefined
		: found.start
}

/**
 * Links an installed package into the fixture workspace without installing.
 *
 * @param scratch - The fixture workspace to receive the package.
 * @param name - The installed package name to link.
 * @returns Nothing.
 */
export function linkPackage(scratch: ScratchInterface, name: string): void {
	const destination = join(scratch.path, 'node_modules', ...name.split('/'))
	mkdirSync(dirname(destination), { recursive: true })
	symlinkSync(resolvePath('node_modules', ...name.split('/')), destination, 'junction')
}

/**
 * Builds a workspace carrying the entry, its readers, and the planted disagreements.
 *
 * @param files - The workspace files to write, keyed root-relative.
 * @param test - The guides-project module to run.
 * @returns The allocated scratch workspace.
 */
export function buildEntryWorkspace(
	files: Readonly<Record<string, string>>,
	test = ENTRY_PASSING_TEST,
): ScratchInterface {
	const scratch = createScratch({ prefix: 'scaffold guides ' })
	for (const [path, text] of Object.entries(files)) scratch.write(path, text)
	scratch.write(ENTRY_PATH, readFileSync(resolvePath(ENTRY_PATH), 'utf8'))
	scratch.write('vite.config.ts', ENTRY_VITE)
	scratch.write(ENTRY_OBSERVATION_PATH, test)
	linkPackage(scratch, '@orkestrel/contract')
	linkPackage(scratch, '@orkestrel/guide')
	linkPackage(scratch, '@orkestrel/test')
	linkPackage(scratch, 'vite')
	linkPackage(scratch, 'vitest')
	return scratch
}

/**
 * Runs the entry through npm and reads what the process reported.
 *
 * @param scratch - The workspace to run in.
 * @param args - The arguments forwarded to `test:guides`.
 * @param vitest - The optional `VITEST` value supplied to the child process.
 * @returns The exit status, the lines the run printed without the trailing blank, and its error stream.
 */
export function runEntry(
	scratch: ScratchInterface,
	args: readonly string[],
	vitest?: string,
): { readonly status: number | null; readonly lines: readonly string[]; readonly stderr: string } {
	const adjacent = resolvePath(dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js')
	const npm = process.env.npm_execpath ?? (existsSync(adjacent) ? adjacent : undefined)
	if (npm === undefined) throw new Error('The npm CLI module is unavailable.')
	const forwarded = args.length === 0 ? [] : ['--', ...args]
	const { VITEST: _inherited, ...inherited } = process.env
	const env = vitest === undefined ? inherited : { ...inherited, VITEST: vitest }
	const run = spawnSync(
		process.execPath,
		[npm, '--loglevel=error', 'run', 'test:guides', ...forwarded],
		{
			cwd: scratch.path,
			encoding: 'utf8',
			env,
			windowsHide: true,
		},
	)
	return {
		status: run.status,
		lines: run.stdout
			.split(/\r\n|\n/)
			.filter(
				(line) =>
					line.startsWith('guides/') ||
					line.startsWith('wrote ') ||
					line.startsWith('next: ') ||
					line.startsWith('usage: '),
			),
		stderr: run.stderr,
	}
}

/**
 * Creates the persistent directory every scratch allocation lands inside.
 *
 * The persistent directory every scratch allocation below lands inside, created
 * once per test because `createScratch` throws when its `parent` is missing.
 *
 * @returns The directory path.
 */
export function ensureTmpRoot(): string {
	mkdirSync(resolvePath('tmp'), { recursive: true })
	return resolvePath('tmp')
}

/**
 * Writes the emitted root configuration and the files a typecheck of it must resolve.
 *
 * The emitted root configuration and the files a typecheck of it has to resolve:
 * the emitted browser resolver and commands seed a browser selection also writes, the vendored
 * boundary helpers, copied from this checkout because a generated workspace
 * receives those exact bytes, and the plugin declaration above. Everything else
 * the configuration names is installed here.
 *
 * @param blueprint - The selection to emit.
 * @param workspace - The scratch workspace to write into.
 * @param prefix - The directory inside the workspace that receives the files.
 */
export function stageRootConfig(
	blueprint: Blueprint,
	workspace: ScratchInterface,
	prefix: string,
): void {
	for (const artifact of blueprintToConfigArtifacts(blueprint)) {
		if (artifact.origin === 'host') continue
		if (
			artifact.path !== 'vite.config.ts' &&
			artifact.path !== 'tsconfig.json' &&
			artifact.path !== 'configs/app/vite.journey.config.ts' &&
			artifact.path !== 'configs/browsers.ts' &&
			artifact.path !== 'configs/commands.ts'
		) {
			continue
		}
		workspace.write(`${prefix}/${artifact.path}`, artifact.content)
	}
	workspace.write(
		`${prefix}/configs/helpers.ts`,
		readFileSync(resolvePath('configs/helpers.ts'), 'utf8'),
	)
	workspace.write(`${prefix}/package.json`, blueprintToManifest(blueprint))
	workspace.write(`${prefix}/plugins.d.ts`, BROWSER_PLUGIN_DECLARATIONS)
}

/**
 * Runs the `check` script a generated workspace vendors over one staged directory.
 *
 * The `check` script a generated workspace vendors, run over one staged
 * directory. `tsc` reports through its exit code, so its diagnostics are returned
 * either way and the caller reads the text rather than a thrown process error.
 *
 * @param root - The staged directory.
 * @returns The compiler diagnostics, empty when the typecheck is clean.
 */
export function checkTypes(root: string): string {
	try {
		execFileSync(
			process.execPath,
			[
				resolvePath('node_modules/typescript/bin/tsc'),
				'--noEmit',
				'--project',
				join(root, 'tsconfig.json'),
			],
			{ stdio: 'pipe', encoding: 'utf8' },
		)
		return ''
	} catch (error) {
		const output = error instanceof Error && 'stdout' in error ? error.stdout : undefined
		return isString(output) && output.length > 0 ? output : String(error)
	}
}

/**
 * Writes the emitted browser resolver where a real Node process can load it.
 *
 * The emitted browser resolver, written where a real Node process can load it.
 * The file sits inside this checkout so its own `playwright` import resolves
 * through the workspace's `node_modules`, which is what makes the loaded module
 * the real one rather than a re-derivation of it.
 *
 * @param workspace - The scratch workspace to write into.
 * @returns The path of the written resolver.
 */
export function stageResolver(workspace: ScratchInterface): string {
	workspace.write('browsers.ts', CONFIG_TEMPLATES.browsers)
	return join(workspace.path, 'browsers.ts')
}

/**
 * Evaluates expressions against an emitted module in a real Node process or Vitest proof run.
 * @param file - The emitted module to import.
 * @param binding - The namespace binding the expressions read.
 * @param calls - The expressions to evaluate, including awaited expressions.
 * @param proof - If true, imports through Vitest so proof registration and hooks execute; if false, imports through Node.
 * @returns Each answer in call order, preserving undefined members.
 */
export function driveModule(
	file: string,
	binding: string,
	calls: readonly string[],
	proof = false,
): readonly unknown[] {
	const workspace = createScratch({ parent: ensureTmpRoot(), prefix: 'scaffold-module-drive-' })
	try {
		const result = join(workspace.path, 'answers.bin')
		const script = [
			"import { writeFileSync } from 'node:fs'",
			"import { serialize } from 'node:v8'",
			proof ? "import { afterAll } from 'vitest'" : '',
			`import * as ${binding} from ${JSON.stringify(pathToFileURL(file).href)}`,
			proof
				? `afterAll(() => writeFileSync(${JSON.stringify(result)}, serialize([${calls.join(', ')}])))`
				: `writeFileSync(${JSON.stringify(result)}, serialize([${calls.join(', ')}]))`,
		].join('\n')
		workspace.write('drive.test.ts', script)
		workspace.write(
			'vite.config.ts',
			"export default { test: { include: ['drive.test.ts'], hookTimeout: 30000, testTimeout: 30000 } }\n",
		)
		execFileSync(
			process.execPath,
			proof
				? [
						resolvePath('node_modules/vitest/vitest.mjs'),
						'run',
						'--config',
						join(workspace.path, 'vite.config.ts'),
						'--root',
						workspace.path,
						'--reporter=dot',
					]
				: ['--experimental-strip-types', join(workspace.path, 'drive.test.ts')],
			{
				stdio: 'pipe',
				encoding: 'utf8',
				windowsHide: true,
				env: proof
					? buildEnvironment({
							npm_config_registry: 'http://127.0.0.1:1',
							npm_config_fetch_retries: '0',
						})
					: process.env,
			},
		)
		const answers: unknown = deserialize(readFileSync(result))
		if (!isArray(answers)) throw new Error('The module driver wrote no answer list')
		return answers
	} finally {
		workspace.destroy()
	}
}

/**
 * Builds the emitted distribution proof for a publishing Node workspace.
 *
 * @returns The proof text.
 */
export function buildDistributionProof(): string {
	const [proof] = blueprintToTestArtifacts(createBlueprint('sample', { src: ['core'] })).filter(
		({ path }) => path === 'tests/distribution.test.ts',
	)
	return requireValue(proof?.content)
}

/**
 * Writes the current emitted harness where real module imports resolve its toolchain.
 * @param workspace - The owned scratch workspace.
 * @param browser - If true, writes the browser variant and its resolver; if false, writes Node alone.
 * @returns The harness module's absolute path.
 */
export function writeDistributionHarness(workspace: ScratchInterface, browser = false): string {
	const blueprint = createBlueprint('sample', { src: browser ? ['browser'] : ['core'] })
	const harness = requireValue(
		blueprintToTestArtifacts(blueprint).find(({ path }) => path === DISTRIBUTION_SETUP_PATH),
	)
	workspace.write(DISTRIBUTION_SETUP_PATH, harness.content)
	if (!workspace.has('package.json')) workspace.write('package.json', '{"type":"module"}\n')
	if (!workspace.has('node_modules')) workspace.link('node_modules', resolvePath('node_modules'))
	if (browser) workspace.write('configs/browsers.ts', CONFIG_TEMPLATES.browsers)
	return join(workspace.path, DISTRIBUTION_SETUP_PATH)
}

/**
 * Writes an installed artifact fixture beneath the scratch workspace.
 * @param workspace - The owned scratch workspace.
 * @param files - The installed paths and their exact contents.
 * @returns The installed package root.
 */
export function writeDistributionFixture(
	workspace: ScratchInterface,
	files: Readonly<Record<string, string>>,
): string {
	workspace.write('src/core/index.ts', 'export class Control {}\n')
	workspace.write(
		'installed/package.json',
		JSON.stringify({
			name: 'distribution-control',
			version: '1.0.0',
			type: 'module',
			exports: { '.': './dist/src/core/index.d.ts' },
		}),
	)
	for (const [path, content] of Object.entries(files)) workspace.write(`installed/${path}`, content)
	return join(workspace.path, 'installed')
}

/**
 * Builds an expression driving a harness case against an installed fixture.
 * @param installed - The installed package root.
 * @param scratch - The suite scratch root.
 * @param label - The distinguishing text in the case label.
 * @returns The awaited observation expression for the classifier namespace.
 */
export function buildDistributionObservation(
	installed: string,
	scratch: string,
	label: string,
): string {
	return `await classifier.buildDistributionCases({
		scratch: ${JSON.stringify(scratch)}, start() {}, destroy() {},
		read() { return { installed: ${JSON.stringify(installed)} } },
	}).find(row => row.label.includes(${JSON.stringify(label)})).observe({
		skip(reason) { throw new Error(reason) },
	})`
}

/**
 * Builds one managed Playwright browsers directory from the entries named.
 *
 * One managed Playwright browsers directory, built from the entries named. Each
 * entry is a real executable file, because the resolver reads the filesystem and
 * a described layout would prove nothing about what it finds. `chmodSync` sets a
 * permission bit `ScratchInterface` does not expose, so it stays on `node:fs`.
 *
 * @param workspace - The scratch workspace to write into.
 * @param entries - The executable files to create.
 * @returns The path of the browsers directory.
 */
export function buildBrowsersRoot(workspace: ScratchInterface, entries: readonly string[]): string {
	for (const entry of entries) {
		const target = `browsers/${entry}`
		workspace.write(target, '')
		chmodSync(join(workspace.path, target), 0o755)
	}
	return workspace.ensure('browsers')
}

/**
 * Finds the project rows whose parameters differ from the factory or merge signature.
 *
 * Declarations whose parameters differ from the factory or merge signature, read off
 * the parser rather than off the text: the question is what a declaration carries,
 * and a pattern reports on one spelling of it. Membership is a value-exported
 * top-level declaration whose return type is `UserConfig`, which is what Vitest calls
 * as a project row. The emitted `resolveWorkspacePath` declares parameters under a
 * return type of `string`, so the same rule leaves it outside the population. The
 * merge's own signature is the one exemption, and it is asserted through this same
 * reader beside the sweep rather than taken on trust.
 *
 * @param content - The root configuration text.
 * @returns Each refused declaration with its parameters.
 */
export function findRefusals(content: string): readonly string[] {
	return readStatements(content, 'vite.config.ts')
		.filter((statement) => statement.exported === 'value')
		.flatMap((statement) =>
			statement.declarations.flatMap((declaration) => {
				if (declaration.returns !== 'UserConfig') return []
				const parameters = declaration.parameters.join(', ')
				const required =
					declaration.name === 'mergeOverride'
						? 'base: UserConfig, override?: UserConfig'
						: declaration.name === 'appShowcase'
							? 'mode: string, override?: UserConfig'
							: 'override?: UserConfig'
				return parameters === required ? [] : [`${declaration.name}(${parameters})`]
			}),
		)
}

/**
 * Maps each fleet package path to the packument the registry fixture serves for it.
 */
export const FLEET_RELEASE_REPLIES: Readonly<Record<string, TestUpstreamReply>> = Object.freeze({
	[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.5') },
	[FLEET_UPSTREAM_PATHS.packages.guide]: { status: 200, body: buildPackument('0.0.9') },
	[FLEET_UPSTREAM_PATHS.packages.probe]: {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@orkestrel/probe']?.slice(1) ?? ''),
	},
	[FLEET_UPSTREAM_PATHS.packages.scaffold]: {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@orkestrel/scaffold']?.slice(1) ?? ''),
	},
	[FLEET_UPSTREAM_PATHS.packages.test]: {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@orkestrel/test']?.slice(1) ?? ''),
	},
	'/@microsoft%2Fapi-extractor': {
		status: 200,
		body: buildPackument(DECLARATION_DEV_DEPENDENCIES['@microsoft/api-extractor']?.slice(1) ?? ''),
	},
	'/@types%2Fnode': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@types/node']?.slice(1) ?? ''),
	},
	'/oxfmt': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.oxfmt?.slice(1) ?? ''),
	},
	'/oxlint': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.oxlint?.slice(1) ?? ''),
	},
	'/typescript': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.typescript?.slice(1) ?? ''),
	},
	'/vite': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.vite?.slice(1) ?? ''),
	},
	'/vitest': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.vitest?.slice(1) ?? ''),
	},
})

/**
 * Maps each fleet mirror path to the guide text the repository fixture serves for it.
 */
export const FLEET_MIRROR_REPLIES: Readonly<Record<string, TestUpstreamReply>> = Object.freeze({
	[FLEET_UPSTREAM_PATHS.mirrors.emitter]: { status: 200, body: '# Emitter\n', type: 'text/plain' },
	[FLEET_UPSTREAM_PATHS.mirrors.guide]: { status: 200, body: '# Guide\n', type: 'text/plain' },
	[FLEET_UPSTREAM_PATHS.mirrors.probe]: { status: 200, body: '# Probe\n', type: 'text/plain' },
	[FLEET_UPSTREAM_PATHS.mirrors.scaffold]: {
		status: 200,
		body: '# Scaffold\n',
		type: 'text/plain',
	},
	[FLEET_UPSTREAM_PATHS.mirrors.test]: { status: 200, body: '# Test\n', type: 'text/plain' },
})

/**
 * Builds a target manifest whose fleet packages and toolchain already match the planned ranges.
 *
 * @param blueprint - The workspace shape whose scripts and tools are planned.
 * @param dependencies - The value to place at `dependencies`.
 * @param development - The value to place at `devDependencies`.
 * @param scripts - The value to place at `scripts`.
 * @returns The manifest text.
 */
export function buildAlignedManifest(
	blueprint = createBlueprint('sample', { src: ['core'] }),
	dependencies?: unknown,
	development?: unknown,
	scripts?: unknown,
): string {
	const dependenciesAligned =
		dependencies === undefined ? { '@orkestrel/emitter': '^0.0.5', vite: '~8.3.5' } : dependencies
	const declared = development === undefined ? blueprintToDevDependencies(blueprint) : development
	const aligned =
		typeof declared === 'object' && declared !== null && !Array.isArray(declared)
			? { ...declared, '@orkestrel/guide': '^0.0.9' }
			: declared
	return buildTargetManifest(blueprint, dependenciesAligned, aligned, scripts)
}

/** Holds the target manifest text with its toolchain range already aligned to the registry. */
export const ALIGNED_MANIFEST_TEXT = TARGET_MANIFEST_TEXT.replace('~8.2.0', '~8.3.5')

/**
 * Maps each registry path the audit fixture answers to the packument it serves.
 */
export const AUDIT_REPLIES: Readonly<Record<string, TestUpstreamReply>> = Object.freeze({
	'/@orkestrel%2Fbrowser': {
		status: 200,
		body: buildPackument(BROWSE_DEV_DEPENDENCIES['@orkestrel/browser']?.slice(1) ?? ''),
	},
	'/@orkestrel%2Fcontract': { status: 200, body: buildPackument('0.0.13') },
	'/@orkestrel%2Femitter': { status: 200, body: buildPackument('0.0.5') },
	'/@orkestrel%2Fguide': { status: 200, body: buildPackument('0.0.9') },
	'/@orkestrel%2Fhtml': { status: 200, body: buildPackument('0.0.4') },
	'/@orkestrel%2Fmiddleware': { status: 200, body: buildPackument('0.0.16') },
	'/@orkestrel%2Fprobe': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@orkestrel/probe']?.slice(1) ?? ''),
	},
	'/@orkestrel%2Frouter': { status: 200, body: buildPackument('0.0.10') },
	'/@orkestrel%2Fscaffold': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@orkestrel/scaffold']?.slice(1) ?? ''),
	},
	'/@orkestrel%2Fserver': { status: 200, body: buildPackument('0.0.14') },
	'/@orkestrel%2Ftest': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@orkestrel/test']?.slice(1) ?? ''),
	},
	'/@microsoft%2Fapi-extractor': {
		status: 200,
		body: buildPackument(DECLARATION_DEV_DEPENDENCIES['@microsoft/api-extractor']?.slice(1) ?? ''),
	},
	'/@types%2Fnode': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@types/node']?.slice(1) ?? ''),
	},
	'/@vitejs%2Fplugin-vue': {
		status: 200,
		body: buildPackument(FRAMEWORK_MATRIX.vue.dependencies['@vitejs/plugin-vue']?.slice(1) ?? ''),
	},
	'/@vitest%2Fbrowser-playwright': {
		status: 200,
		body: buildPackument(
			SOURCE_BROWSER_DEV_DEPENDENCIES['@vitest/browser-playwright']?.slice(1) ?? '',
		),
	},
	'/oxfmt': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.oxfmt?.slice(1) ?? ''),
	},
	'/oxlint': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.oxlint?.slice(1) ?? ''),
	},
	'/playwright': {
		status: 200,
		body: buildPackument(SOURCE_BROWSER_DEV_DEPENDENCIES.playwright?.slice(1) ?? ''),
	},
	'/typescript': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.typescript?.slice(1) ?? ''),
	},
	'/vite': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.vite?.slice(1) ?? ''),
	},
	'/vite-plugin-singlefile': {
		status: 200,
		body: buildPackument('2.3.3'),
	},
	'/vitest': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.vitest?.slice(1) ?? ''),
	},
	'/vue': {
		status: 200,
		body: buildPackument(FRAMEWORK_MATRIX.vue.dependencies.vue?.slice(1) ?? ''),
	},
	'/vue-tsc': {
		status: 200,
		body: buildPackument(FRAMEWORK_MATRIX.vue.dependencies['vue-tsc']?.slice(1) ?? ''),
	},
})

/**
 * Reads the checkout manifest as text from disk and parses it.
 *
 * The manifest is read from disk as text here. The tables derive from the same
 * file through a compile-time JSON import, so the two answers arrive by
 * different mechanisms and can disagree.
 *
 * @returns The manifest record; thrown when the manifest is not a record.
 */
export function readCheckoutManifest(): Readonly<Record<string, unknown>> {
	const parsed: unknown = JSON.parse(
		readFileSync(resolvePath(WORKSPACE_ROOT, 'package.json'), 'utf8'),
	)
	if (!isRecord(parsed)) throw new Error('The package manifest is not a record')
	return parsed
}

/**
 * Reads the name the checkout manifest declares.
 *
 * @returns The package name; thrown when the manifest declares none.
 */
export function readCheckoutName(): string {
	const name = readCheckoutManifest().name
	if (!isString(name)) throw new Error('The package manifest declares no name')
	return name
}

/**
 * Reads every range the checkout manifest declares in its dependency sections.
 *
 * Both sections, because a table row derives from whichever one declares it.
 *
 * @returns Each declared name mapped to its range.
 */
export function readCheckoutRanges(): Readonly<Record<string, string>> {
	const manifest = readCheckoutManifest()
	return Object.fromEntries(
		[manifest.dependencies, manifest.devDependencies].flatMap((section): Array<[string, string]> =>
			isRecord(section)
				? Object.entries(section).flatMap(([name, range]): Array<[string, string]> =>
						isString(range) ? [[name, range]] : [],
					)
				: [],
		),
	)
}

/**
 * Selects the table rows the manifest does not declare.
 *
 * The union of every table, with the self-pin removed: it derives from the
 * manifest's `version` field rather than from a declaration, so it is not a row
 * the manifest could declare.
 *
 * @returns Each seeded name, sorted.
 */
export function selectSeededNames(): readonly string[] {
	const declared = readCheckoutRanges()
	const own = readCheckoutName()
	const seeded = new Set(
		[...DEPENDENCY_TABLES].flatMap(([, table]) =>
			Object.keys(table).filter((name) => name !== own && declared[name] === undefined),
		),
	)
	return [...seeded].sort()
}

/**
 * Locates the installed directory Node resolves a package to from a directory.
 *
 * Node's lookup: the nearest `node_modules` holding the package, climbing from the
 * directory of the package that depends on it, so a nested install wins over a hoisted one.
 *
 * @param from - The directory of the package that depends on the package.
 * @param name - The package to locate.
 * @returns The installed package directory; thrown when none resolves.
 */
export function locatePackage(from: string, name: string): string {
	const located = listAncestors(from)
		.map((directory) => resolvePath(directory, 'node_modules', name))
		.find((candidate) => existsSync(resolvePath(candidate, 'package.json')))
	if (located === undefined) throw new Error(`No installed package resolves ${name} from ${from}`)
	return located
}

/**
 * Reads the manifest record of one installed package directory.
 *
 * @param directory - The installed package directory.
 * @returns The manifest record; thrown when it is not a record.
 */
export function readInstalledRecord(directory: string): Readonly<Record<string, unknown>> {
	const parsed: unknown = JSON.parse(readFileSync(resolvePath(directory, 'package.json'), 'utf8'))
	if (!isRecord(parsed)) throw new Error(`The manifest in ${directory} is not a record`)
	return parsed
}

/**
 * Collects the fleet names a package reaches through installed runtime and peer edges.
 *
 * The fleet names `name` reaches through installed runtime and peer edges, walked
 * through the installed manifests rather than through the constant under test.
 *
 * @param name - The package whose closure is read.
 * @returns Each reached fleet name, sorted.
 */
export function collectRuntimeClosure(name: string): readonly string[] {
	const visited = new Set<string>()
	// Each entry is a reached package and the directory it resolved to; the root has no name.
	const pending: Array<{ readonly reached: string | undefined; readonly directory: string }> = [
		{ reached: undefined, directory: locatePackage(WORKSPACE_ROOT, name) },
	]
	// The walk appends to the list it iterates, so each located directory is visited in turn.
	for (const { directory } of pending) {
		if (visited.has(directory)) continue
		visited.add(directory)
		const manifest = readInstalledRecord(directory)
		for (const section of [manifest.dependencies, manifest.peerDependencies]) {
			if (!isRecord(section)) continue
			for (const dependency of Object.keys(section)) {
				if (!dependency.startsWith('@orkestrel/')) continue
				pending.push({ reached: dependency, directory: locatePackage(directory, dependency) })
			}
		}
	}
	return [
		...new Set(pending.flatMap(({ reached }) => (reached === undefined ? [] : [reached]))),
	].sort()
}

/** Names the checkout-relative path of the dispatch skill's `bench` script. */
export const BENCH_SCRIPT = '.agents/skills/orkestrel-dispatch/scripts/bench.ts'

/** Names the checkout-relative path of the dispatch skill's `brief` script. */
export const BRIEF_SCRIPT = '.agents/skills/orkestrel-dispatch/scripts/brief.ts'

/** Names the checkout-relative path of the dispatch skill's `cite` script. */
export const CITE_SCRIPT = '.agents/skills/orkestrel-dispatch/scripts/cite.ts'

/** Names the checkout-relative path of the dispatch skill's `launch` script. */
export const LAUNCH_SCRIPT = '.agents/skills/orkestrel-dispatch/scripts/launch.ts'

/** Names the checkout-relative path of the dispatch skill's `login` script. */
export const LOGIN_SCRIPT = '.agents/skills/orkestrel-dispatch/scripts/login.ts'

/** Names the checkout-relative path of the dispatch skill's `result` script. */
export const RESULT_SCRIPT = '.agents/skills/orkestrel-dispatch/scripts/result.ts'

/** Names the checkout-relative path of the dispatch skill's `sweep` script. */
export const SWEEP_SCRIPT = '.agents/skills/orkestrel-dispatch/scripts/sweep.ts'

/** Names the checkout-relative path of the publish skill's `compare` script. */
export const COMPARE_SCRIPT = '.agents/skills/orkestrel-publish/scripts/compare.ts'

/** Names the checkout-relative path of the publish skill's `pins` script. */
export const PINS_SCRIPT = '.agents/skills/orkestrel-publish/scripts/pins.ts'

/** Names the checkout-relative path of the publish skill's `swap` script. */
export const SWAP_SCRIPT = '.agents/skills/orkestrel-publish/scripts/swap.ts'

/** Names the checkout-relative path of the publish skill's `wave` script. */
export const WAVE_SCRIPT = '.agents/skills/orkestrel-publish/scripts/wave.ts'

/** Names the checkout-relative path of the publish skill's `window` script. */
export const WINDOW_SCRIPT = '.agents/skills/orkestrel-publish/scripts/window.ts'

/** Names the checkout-relative path of the harden skill's `discovery` script. */
export const DISCOVERY_SCRIPT = '.agents/skills/orkestrel-harden/scripts/discovery.ts'

/** Names the checkout-relative path of the harden skill's `titles` script. */
export const TITLES_SCRIPT = '.agents/skills/orkestrel-harden/scripts/titles.ts'

/** Supplies each tables with nested calls and parentheses outside code tokens. */
export const TITLES_TABLES: readonly string[] = Object.freeze([
	"[[Number('1')]]",
	"[[Number(String(Number('1')))]]",
	`[[')', "(", Number('1')]]`,
	"[[`) ${Number('1')} (`, Number('1')]]",
	"[[/\\)/u, /[(]/u, Number('1')]]",
	"[[/* ) ( */ Number('1') // ) (\n]]",
])

/** Supplies each heads whose table arguments never close. */
export const TITLES_UNBALANCED: readonly string[] = Object.freeze([
	"it.each([[Number('1')]]",
	"test.concurrent.each(\n[[Number('1')]]",
	"describe.each([[Number('1')]]\n('groups', () => {})",
])

/** Supplies statement contexts whose closing braces permit regex literals. */
export const TITLES_STATEMENTS: readonly string[] = Object.freeze([
	'if (true) {}',
	'function read() {}',
	'; {}',
	'if (false) {} else {}',
	'try {} finally {}',
	'do {} while (false);',
	'{ {} }',
	'const read = () => { if (true) {}\n/other/.test("other") };',
])

/** Supplies expression contexts whose closing braces retain division. */
export const TITLES_EXPRESSIONS: readonly string[] = Object.freeze([
	'const amount = {} / 3 / 2',
	'const amount = ({}) / 3 / 2',
	'const amount = [{}][0] / 3 / 2',
	'const amount = `${{} / 3 / 2}`',
	'const amount = true ? {} / 3 / 2 : 0',
	'function read() { return {} / 3 / 2 }',
])

/** Supplies line terminator sequences for escaped and unescaped string boundaries. */
export const TITLES_TERMINATORS: readonly string[] = Object.freeze([
	'\r\n',
	'\n',
	'\r',
	'\u2028',
	'\u2029',
])

/** Supplies the quote forms whose line continuations the scanner reads. */
export const TITLES_QUOTES: readonly string[] = Object.freeze(["'", '"'])

/** Supplies detectable function-body slash ambiguities that must refuse classification. */
export const TITLES_AMBIGUITIES: readonly string[] = Object.freeze([
	'const amount = function read() {} / 3 / 2',
	'const amount = () => {} / 3 / 2',
	"const text = `${function read() {} / 'reads' / 2}`",
])

/** Names the checkout-relative path of the scout skill's `map` script. */
export const MAP_SCRIPT = '.agents/skills/orkestrel-scout/scripts/map.ts'

/** Holds the registry range every swap fixture declaration uses. */
export const SWAP_RANGE = '^1.0.0'

/**
 * Describes the swap fixture: three source checkouts and the consumer that declares two of them.
 *
 * `alpha` depends on `beta`, the consumer declares `alpha` under `dependencies` and `gamma` under
 * `devDependencies`, and every declaration is the registry range {@link SWAP_RANGE}, which the
 * fixture registry {@link createSwapRegistry} serves from the loopback interface.
 */
export interface TestSwapFixture {
	readonly root: string
	readonly alpha: string
	readonly beta: string
	readonly gamma: string
	readonly consumer: string
}

/**
 * Describes one package version the swap fixture registry serves.
 *
 * @remarks
 * The integrity and the shasum are those of the archive bytes, as a packument carries them.
 */
export interface TestSwapPublished {
	readonly name: string
	readonly version: string
	readonly dependencies: Readonly<Record<string, string>>
	readonly peers?: Readonly<Record<string, unknown>>
	readonly archive: Uint8Array
	readonly integrity: string
	readonly shasum: string
}

/** Describes the running swap fixture registry. */
export interface TestSwapRegistryInterface {
	readonly url: string
	destroy(): Promise<void>
}

/**
 * Renders a package manifest as every Orkestrel manifest is written.
 *
 * @param manifest - The manifest record.
 * @returns Tab-indented JSON with a trailing newline.
 */
export function renderPackageManifest(manifest: Readonly<Record<string, unknown>>): string {
	return `${JSON.stringify(manifest, null, '\t')}\n`
}

/**
 * Builds the npm environment that keeps every swap fixture install inside the scratch root.
 *
 * @param root - The scratch root that receives the cache and config paths.
 * @param registry - The loopback registry URL {@link createSwapRegistry} returned. Default: none,
 * which keeps npm offline.
 * @returns The `npm_config_*` variables: the registry or offline mode, a scratch cache, and scratch
 * user and global config paths, so no read reaches the public registry.
 */
export function buildSwapEnvironment(
	root: string,
	registry?: string,
): Readonly<Record<string, string>> {
	return {
		...(registry === undefined
			? { npm_config_offline: 'true' }
			: { npm_config_registry: registry }),
		npm_config_install_links: 'false',
		npm_config_cache: join(root, 'npm-cache'),
		npm_config_userconfig: join(root, 'npmrc'),
		npm_config_globalconfig: join(root, 'globalrc'),
		npm_config_update_notifier: 'false',
		npm_config_audit: 'false',
		npm_config_fund: 'false',
	}
}

/**
 * Writes one swap fixture package directory with a built `dist/index.js`.
 *
 * @param root - The scratch root.
 * @param directory - The package directory name, which also names the package
 * `@orkestrel/swapfix-<directory>`.
 * @param fields - The manifest fields that follow the name, version, `files` list, and module type,
 * in the order oxfmt sorts them.
 * @returns The package directory.
 */
export function writeSwapPackage(
	root: string,
	directory: string,
	fields: Readonly<Record<string, unknown>>,
): string {
	const path = join(root, directory)
	mkdirSync(join(path, 'dist'), { recursive: true })
	writeFileSync(
		join(path, 'package.json'),
		renderPackageManifest({
			name: `@orkestrel/swapfix-${directory}`,
			version: '1.0.0',
			files: ['dist'],
			type: 'module',
			...fields,
		}),
	)
	writeFileSync(join(path, 'dist', 'index.js'), `export const name = '${directory}'\n`)
	return path
}

/**
 * Writes one swap fixture source whose `build` script copies `src.js` to `dist/index.js`.
 *
 * @param root - The scratch root.
 * @param directory - The source directory name.
 * @param fields - The manifest fields that follow the `build` script, such as `dependencies`.
 * Default: none.
 * @returns The source directory.
 */
export function writeSwapSource(
	root: string,
	directory: string,
	fields: Readonly<Record<string, unknown>> = {},
): string {
	const path = writeSwapPackage(root, directory, {
		scripts: { build: 'node build.js' },
		...fields,
	})
	writeFileSync(
		join(path, 'build.js'),
		"import { copyFileSync, mkdirSync } from 'node:fs'\nmkdirSync('dist', { recursive: true })\ncopyFileSync('src.js', 'dist/index.js')\n",
	)
	writeFileSync(join(path, 'src.js'), `export const name = '${directory}'\n`)
	return path
}

/**
 * Writes the swap fixture under a scratch root.
 *
 * @param root - The scratch root.
 * @returns The fixture's directories.
 */
export function writeSwapFixture(root: string): TestSwapFixture {
	return {
		root,
		alpha: writeSwapSource(root, 'alpha', {
			dependencies: { '@orkestrel/swapfix-beta': SWAP_RANGE },
		}),
		beta: writeSwapSource(root, 'beta'),
		gamma: writeSwapSource(root, 'gamma'),
		consumer: writeSwapPackage(root, 'consumer', {
			dependencies: { '@orkestrel/swapfix-alpha': SWAP_RANGE },
			devDependencies: { '@orkestrel/swapfix-gamma': SWAP_RANGE },
			engines: { node: '>=24' },
		}),
	}
}

/**
 * Builds the packument the swap fixture registry serves for one package name.
 *
 * @param published - Every version the registry serves, of any package.
 * @param name - The package name the packument describes.
 * @param base - The origin the archive URLs address, such as `http://127.0.0.1:4873`.
 * @returns The packument record, or undefined when the registry serves no version of the name.
 */
export function buildSwapPackument(
	published: readonly TestSwapPublished[],
	name: string,
	base: string,
): Readonly<Record<string, unknown>> | undefined {
	const versions = published.filter((candidate) => candidate.name === name)
	const latest = versions.at(-1)
	if (latest === undefined) return undefined
	return {
		name,
		'dist-tags': { latest: latest.version },
		versions: Object.fromEntries(
			versions.map((version) => [
				version.version,
				{
					name,
					version: version.version,
					dependencies: version.dependencies,
					...version.peers,
					dist: {
						tarball: `${base}/${name}/-/${name.split('/').at(-1) ?? name}-${version.version}.tgz`,
						integrity: version.integrity,
						shasum: version.shasum,
					},
				},
			]),
		),
	}
}

/**
 * Answers one request the swap fixture registry receives.
 *
 * Serves each package's packument at its escaped name and each archive at the standard
 * `/<name>/-/<file>.tgz` path, and answers every other read 404.
 *
 * @param published - Every version the registry serves.
 * @param request - The request to answer.
 * @param response - The response to write.
 */
export function answerSwapRegistry(
	published: readonly TestSwapPublished[],
	request: IncomingMessage,
	response: ServerResponse,
): void {
	const path = decodeURIComponent(request.url ?? '').slice(1)
	const base = `http://${request.headers.host ?? '127.0.0.1'}`
	const archive = published.find(
		(candidate) =>
			path ===
			`${candidate.name}/-/${candidate.name.split('/').at(-1) ?? ''}-${candidate.version}.tgz`,
	)
	if (archive !== undefined) {
		response.writeHead(200, { 'content-type': 'application/octet-stream' })
		response.end(archive.archive)
		return
	}
	const packument = buildSwapPackument(published, path, base)
	response.writeHead(packument === undefined ? 404 : 200, { 'content-type': 'application/json' })
	response.end(JSON.stringify(packument ?? { error: 'Not found' }))
}

/**
 * Starts the swap fixture registry on an ephemeral loopback port.
 *
 * Packs each package directory with `npm pack` and serves the archives it wrote, so an install
 * resolves a registry range and fetches a registry archive without reaching beyond the loopback
 * interface.
 *
 * @param root - The scratch root that receives the archives and the npm cache.
 * @param directories - The package directories to publish, each at the name and version its
 * manifest declares.
 * @returns The running registry, which the caller destroys in a `finally`.
 * @throws Thrown when a pack exits nonzero or prints no archive name.
 */
export async function createSwapRegistry(
	root: string,
	directories: readonly string[],
): Promise<TestSwapRegistryInterface> {
	const archives = join(root, 'registry')
	mkdirSync(archives, { recursive: true })
	const published = await Promise.all(
		directories.map(async (directory): Promise<TestSwapPublished> => {
			const packed = await spawnNpm(
				['pack', '--ignore-scripts', '--json', '--pack-destination', archives],
				{ workspace: directory, environment: buildSwapEnvironment(root) },
			)
			const report: unknown = parseJSON(packed.stdout)
			// npm 11 prints an array and npm 12 an object keyed by package name.
			const entry: unknown = isArray(report)
				? report[0]
				: isRecord(report)
					? Object.values(report)[0]
					: undefined
			if (packed.code !== 0 || !isRecord(entry) || !isString(entry.filename)) {
				throw new Error(`The swap fixture pack in ${directory} failed: ${packed.stderr}`)
			}
			const archive = readFileSync(join(archives, entry.filename))
			const manifest = readInstalledRecord(directory)
			return {
				name: String(manifest.name),
				version: String(manifest.version),
				dependencies: isRecord(manifest.dependencies)
					? Object.fromEntries(
							Object.entries(manifest.dependencies).map(([name, range]) => [name, String(range)]),
						)
					: {},
				archive,
				peers: Object.fromEntries(
					['peerDependencies', 'peerDependenciesMeta'].flatMap((field) =>
						isRecord(manifest[field]) ? [[field, manifest[field]]] : [],
					),
				),
				integrity: `sha512-${createHash('sha512').update(archive).digest('base64')}`,
				shasum: createHash('sha1').update(archive).digest('hex'),
			}
		}),
	)
	const loopback = await createLoopback(
		createServer((request, response) => {
			request.resume()
			request.on('end', () => {
				answerSwapRegistry(published, request, response)
			})
		}),
	)
	return { url: `${loopback.url}/`, destroy: loopback.destroy }
}

/**
 * Lists each command line the swap script refuses as a usage error, with the message it names.
 *
 * @param fixture - The swap fixture the command lines name.
 * @param empty - A directory that holds no package manifest.
 * @returns Each command line and a fragment of its refusal, in the order the script checks them.
 */
export function buildSwapRefusals(
	fixture: TestSwapFixture,
	empty: string,
): ReadonlyArray<readonly [readonly string[], string]> {
	const consumer = ['--consumer', fixture.consumer]
	return [
		[[], 'Give one of --pin, --restore, and --status'],
		[['--pin', '--status', ...consumer], 'Give one mode, not --pin and --status'],
		[['--status', ...consumer, '--package', 'x'], '--status does not read --package, x'],
		[['--status', '--consumer'], '--consumer given with no value'],
		[['--status'], '--consumer DIR is required'],
		[['--pin', ...consumer], '--pin takes at least one --source DIR'],
		[
			['--pin', ...consumer, '--source', fixture.beta, '--no-build'],
			'@orkestrel/swapfix-beta is declared by no dependencies field and named by no --override',
		],
		[
			[
				'--pin',
				...consumer,
				'--source',
				fixture.alpha,
				'--override',
				'@orkestrel/swapfix-delta',
				'--no-build',
			],
			'override @orkestrel/swapfix-delta is declared by the consumer and built by no --source',
		],
		[
			['--pin', ...consumer, '--source', fixture.alpha, '--source', fixture.alpha, '--no-build'],
			'@orkestrel/swapfix-alpha is named by more than one --source',
		],
		[['--pin', ...consumer, '--source', empty, '--no-build'], 'No package name and version in'],
		[['--restore', ...consumer], 'The ledger records no pin to restore'],
		[
			['--restore', ...consumer, '--package', '@orkestrel/swapfix-alpha'],
			'The ledger records no pin for @orkestrel/swapfix-alpha',
		],
		[['--status', '--consumer', empty], 'has no readable package.json'],
	]
}

/**
 * Describes one swap session: the fixture, the registry that serves it, and the npm environment
 * that reads that registry.
 */
export interface TestSwapSession {
	readonly scratch: ScratchInterface
	readonly fixture: TestSwapFixture
	readonly registry: TestSwapRegistryInterface
	readonly environment: Readonly<Record<string, string>>
	destroy(): Promise<void>
}

/**
 * Writes the swap fixture under a new scratch directory and publishes it to a loopback registry.
 *
 * @param prefix - The scratch directory's name prefix.
 * @param extras - Writes further package directories under the scratch root and returns them, to
 * publish beside the fixture's `alpha`, `beta`, `gamma`, and `consumer`. Default: none.
 * @returns The session, which the caller destroys in a `finally`.
 * @remarks
 * The registry shares the caller's event loop, so a script that reads it runs through
 * `spawnSkillScript`: the synchronous runner blocks the loop and the install behind it never
 * receives an answer.
 */
export async function createSwapSession(
	prefix: string,
	extras?: (root: string) => readonly string[],
): Promise<TestSwapSession> {
	const scratch = createScratch({ prefix })
	try {
		const fixture = writeSwapFixture(scratch.path)
		const registry = await createSwapRegistry(scratch.path, [
			fixture.alpha,
			fixture.beta,
			fixture.gamma,
			fixture.consumer,
			...(extras?.(scratch.path) ?? []),
		])
		return {
			scratch,
			fixture,
			registry,
			environment: buildSwapEnvironment(scratch.path, registry.url),
			destroy: async () => {
				await registry.destroy()
				scratch.destroy()
			},
		}
	} catch (error) {
		scratch.destroy()
		throw error
	}
}

/**
 * Lists a dependency field and a local spec the swap script must refuse to pack, one pair per form.
 *
 * @returns Each manifest field and a spec that npm resolves on the packing host instead of from a
 * registry: a `file:` or `link:` prefix, a path start (`.`, `~/`, `/`, `\`, or a drive letter), or
 * an archive name ending in `.tgz`, `.tar.gz`, or `.tar` that carries no protocol and is not a
 * `user/repo` shorthand.
 */
export function buildSwapLocalSpecs(): ReadonlyArray<readonly [string, string]> {
	return [
		['dependencies', 'file:../other'],
		['dependencies', 'file:tmp/tarballs/missing.tgz'],
		['devDependencies', 'link:../other'],
		['peerDependencies', './other'],
		['optionalDependencies', '../other'],
		['dependencies', '/srv/other'],
		['devDependencies', 'C:/other'],
		['overrides', 'file:../other'],
		['dependencies', 'tmp/tarballs/missing.tgz'],
		['devDependencies', 'missing.tgz'],
		['optionalDependencies', 'vendor/archives/pack.tar.gz'],
		['peerDependencies', 'archive.tar'],
		['dependencies', 'Pack.TGZ'],
		['dependencies', '~/other'],
		['devDependencies', '\\srv\\other'],
		['optionalDependencies', '.hidden'],
		['dependencies', 'C:\\other'],
		['devDependencies', 'D:other'],
		['overrides', 'tmp/tarballs/missing.tgz'],
	]
}

/**
 * Lists a dependency spec the swap script must accept in a packed manifest, one pair per form.
 *
 * @returns Each manifest field and a spec that npm resolves from a registry, a hosted repository, or
 * a remote archive: a range, a version, a dist-tag, an `npm:` alias, a `user/repo` shorthand
 * (whatever it ends in), a `github:` or `git+` repository, or a URL.
 */
export function buildSwapRemoteSpecs(): ReadonlyArray<readonly [string, string]> {
	return [
		['dependencies', '^1.0.0'],
		['dependencies', '*'],
		['devDependencies', 'latest'],
		['peerDependencies', 'npm:other@^1.0.0'],
		['optionalDependencies', 'github:orkestrel/other'],
		['dependencies', 'https://registry.invalid/other/-/other-1.0.0.tgz'],
		['dependencies', '1.0.0'],
		['devDependencies', '>=1.0.0 <2.0.0'],
		['peerDependencies', '~1.2.3'],
		['optionalDependencies', '1.x'],
		['dependencies', 'next'],
		['dependencies', 'orkestrel/other'],
		['devDependencies', 'orkestrel/other.tgz'],
		['dependencies', 'orkestrel/other#semver:^1.0.0'],
		['optionalDependencies', 'git+https://example.invalid/other.git'],
		['peerDependencies', 'git+ssh://git@example.invalid/other.git#v1'],
		['overrides', 'npm:@orkestrel/other@^1.0.0'],
	]
}

/**
 * Lists a ledger key the swap script's restore must refuse as a package name.
 *
 * @param root - The directory that holds the consumer, whose `closure-sentinel` sibling an escaping
 * key would reach.
 * @returns Each key that climbs out of `node_modules`, or is an absolute or drive path, a bare
 * scope, an empty name, or otherwise not an optional `@scope/` and a name.
 */
export function buildSwapInvalidNames(root: string): readonly string[] {
	const sentinel = join(root, 'consumer', 'closure-sentinel').split('\\').join('/')
	return [
		'../closure-sentinel',
		'../../consumer/closure-sentinel',
		'@orkestrel/../../closure-sentinel',
		'..\\closure-sentinel',
		sentinel,
		'/closure-sentinel',
		'C:/closure-sentinel',
		'C:\\closure-sentinel',
		'..',
		'.hidden',
		'_private',
		'@orkestrel',
		'@orkestrel/',
		'a/b',
		'a//b',
		'Spaced Name',
		'',
	]
}

/**
 * Lists a ledger key the swap script's restore must accept as a package name.
 *
 * @returns Scoped and unscoped names with dashes, dots, digits, and capitals.
 */
export function buildSwapValidNames(): readonly string[] {
	return ['left-pad', '@orkestrel/other.js', 'Base64', '@scope-1/pkg_2', 'a.b']
}

/**
 * Adds one row to the packages or overrides block of a swap ledger's text.
 *
 * @param text - The ledger file's text.
 * @param block - The ledger block that receives the row.
 * @param name - The key of the added row.
 * @param row - The row the key names.
 * @returns The ledger text, tab-indented with a trailing newline, holding the row beside the others.
 * @throws Thrown when the text is not a ledger record or holds no such block.
 */
export function appendSwapLedgerRow(
	text: string,
	block: 'packages' | 'overrides',
	name: string,
	row: Readonly<Record<string, unknown>>,
): string {
	const ledger = parseJSON(text)
	const rows = isRecord(ledger) ? ledger[block] : undefined
	if (!isRecord(ledger) || !isRecord(rows))
		throw new Error(`The swap ledger holds no ${block} block`)
	return renderPackageManifest({ ...ledger, [block]: { ...rows, [name]: row } })
}

/**
 * Makes a manifest refuse the replacement the swap script writes, and reports whether it does.
 *
 * @param manifest - The manifest path.
 * @returns True if a temporary file renamed onto the manifest then fails; false otherwise.
 *
 * @remarks
 * The lock is platform-defined. A read-only target refuses a rename onto it on Windows
 * (`EPERM`), and a read-only directory refuses a temporary file beside the target on POSIX; a
 * privileged POSIX user passes both, so the report is probed rather than assumed.
 */
export function lockManifest(manifest: string): boolean {
	chmodSync(manifest, 0o444)
	chmodSync(dirname(manifest), 0o555)
	const temporary = `${manifest}.lock.tmp`
	try {
		writeFileSync(temporary, readFileSync(manifest))
		renameSync(temporary, manifest)
		return false
	} catch {
		return true
	}
}

/**
 * Restores the write access {@link lockManifest} removed, so a scratch directory can be removed.
 *
 * @param manifest - The manifest path.
 * @returns Nothing.
 */
export function unlockManifest(manifest: string): void {
	chmodSync(dirname(manifest), 0o755)
	chmodSync(manifest, 0o644)
	rmSync(`${manifest}.lock.tmp`, { force: true })
}

/**
 * Probes whether {@link lockManifest} refuses a replacement on this host.
 *
 * @returns True if a locked manifest refuses a replacement; false on a host that lets it through.
 */
export function probeManifestLock(): boolean {
	const scratch = createScratch({ prefix: 'orkestrel-swap-lock-' })
	try {
		const manifest = scratch.write('probe/package.json', '{}\n')
		const locked = lockManifest(manifest)
		unlockManifest(manifest)
		return locked
	} finally {
		scratch.destroy()
	}
}

/**
 * Installs one swap fixture package directory against the session registry, as its baseline before
 * a pin.
 *
 * @param directory - The package directory to install.
 * @param environment - The npm environment {@link buildSwapEnvironment} built.
 * @returns Nothing.
 * @throws Thrown when the install exits nonzero, with its standard error.
 */
export async function installSwapFixture(
	directory: string,
	environment: Readonly<Record<string, string>>,
): Promise<void> {
	const installed = await spawnNpm(['install', '--ignore-scripts', '--no-audit', '--no-fund'], {
		workspace: directory,
		environment,
	})
	if (installed.code !== 0) {
		throw new Error(`The swap fixture install in ${directory} failed: ${installed.stderr}`)
	}
}

/**
 * Reads one package row of a consumer's swap ledger.
 *
 * @param consumer - The consumer directory.
 * @param name - The package name.
 * @returns The ledger row.
 * @throws Thrown when the ledger is absent or malformed or records no row for the package.
 */
export function readSwapEntry(consumer: string, name: string): Readonly<Record<string, unknown>> {
	const ledger = parseJSON(readFileSync(join(consumer, 'tmp', 'tarballs', 'pins.json'), 'utf8'))
	const packages = isRecord(ledger) ? ledger.packages : undefined
	const entry = isRecord(packages) ? packages[name] : undefined
	if (!isRecord(entry)) throw new Error(`The swap ledger in ${consumer} records no row for ${name}`)
	return entry
}

/**
 * Checks one file with this checkout's formatter and configuration, writing nothing.
 *
 * @param path - The file to check.
 * @returns The formatter's exit code: 0 when the file is formatted, nonzero otherwise.
 */
export function checkFormatting(path: string): number | null {
	const directory = locatePackage(WORKSPACE_ROOT, 'oxfmt')
	const bin = readInstalledRecord(directory).bin
	const entry = isRecord(bin) ? bin.oxfmt : undefined
	if (!isString(entry)) throw new Error('The installed oxfmt declares no oxfmt bin entry')
	return spawnSync(
		process.execPath,
		[join(directory, entry), '--config', join(WORKSPACE_ROOT, '.oxfmtrc.json'), '--check', path],
		{ cwd: WORKSPACE_ROOT, encoding: 'utf8', windowsHide: true },
	).status
}

/** Describes an installed exact-peer wave fixture and its loopback registry. */
export interface TestWaveSession {
	readonly scratch: ScratchInterface
	readonly target: string
	readonly registry: TestSwapRegistryInterface
	readonly environment: Readonly<Record<string, string>>
	destroy(): Promise<void>
}

/** Holds the identity inherited by wave fixture commits. */
export const WAVE_IDENTITY: Readonly<Record<string, string>> = Object.freeze({
	GIT_AUTHOR_NAME: 'Wave Fixture',
	GIT_AUTHOR_EMAIL: 'wave@orkestrel.invalid',
	GIT_COMMITTER_NAME: 'Wave Fixture',
	GIT_COMMITTER_EMAIL: 'wave@orkestrel.invalid',
	GIT_CONFIG_COUNT: '1',
	GIT_CONFIG_KEY_0: 'commit.gpgsign',
	GIT_CONFIG_VALUE_0: 'false',
})

/**
 * Creates the locked peer cluster whose probe re-pin npm refuses with ERESOLVE.
 *
 * @param prefix - The owned scratch allocation prefix.
 * @returns The committed consumer and its registry lifetime.
 * @throws Thrown when the baseline install fails.
 */
export async function createWaveSession(prefix: string): Promise<TestWaveSession> {
	mkdirSync(join(WORKSPACE_ROOT, 'tmp', 'units'), { recursive: true })
	const scratch = createScratch({ parent: join(WORKSPACE_ROOT, 'tmp', 'units'), prefix })
	try {
		const directories = ['1.0.0', '1.0.1'].flatMap((version) =>
			['vt', 'bp', 'br', 'pr'].map((name) =>
				writeSwapPackage(scratch.path, `${name}-${version}`, {
					name,
					version,
					...(name === 'vt'
						? {
								peerDependencies: { bp: version },
								peerDependenciesMeta: { bp: { optional: true } },
							}
						: {}),
					...(name === 'bp'
						? { peerDependencies: { vt: version }, dependencies: { br: version } }
						: {}),
					...(name === 'br' ? { peerDependencies: { vt: version } } : {}),
					...(name === 'pr'
						? {
								peerDependencies: { vt: `^${version}` },
								peerDependenciesMeta: { vt: { optional: true } },
							}
						: {}),
				}),
			),
		)
		const registry = await createSwapRegistry(scratch.path, directories)
		try {
			const target = scratch.ensure('consumer')
			const environment = { ...buildSwapEnvironment(scratch.path, registry.url), ...WAVE_IDENTITY }
			scratch.write('consumer/.gitignore', 'tmp/\nnode_modules/\n')
			scratch.write(
				'consumer/package.json',
				renderPackageManifest({
					name: '@fixture/wave',
					version: '1.0.0',
					devDependencies: { vt: '1.0.0', bp: '1.0.0', pr: '1.0.0' },
				}),
			)
			const installed = await spawnNpm(['install', '--ignore-scripts'], {
				workspace: target,
				environment,
			})
			if (installed.code !== 0) throw new Error(`Wave baseline failed: ${installed.stderr}`)
			const manifest = {
				name: '@fixture/wave',
				version: '1.0.0',
				devDependencies: { vt: '^1.0.0', bp: '^1.0.0', pr: '^1.0.0' },
			}
			scratch.write('consumer/package.json', renderPackageManifest(manifest))
			const lock: unknown = parseJSON(scratch.read('consumer/package-lock.json') ?? '')
			if (!isRecord(lock) || !isRecord(lock.packages) || !isRecord(lock.packages['']))
				throw new Error('Wave lock root absent')
			scratch.write(
				'consumer/package-lock.json',
				renderPackageManifest({
					...lock,
					packages: {
						...lock.packages,
						'': { ...lock.packages[''], devDependencies: manifest.devDependencies },
					},
				}),
			)
			scratch.write(
				'consumer/dist/bin/main.js',
				[
					"const { appendFileSync } = require('node:fs')",
					"appendFileSync('tmp/calls.txt', process.argv.slice(2).join(' ') + '\\n')",
					`console.log(JSON.stringify({ releases: [{ name: 'pr', range: '^1.0.0', latest: '1.0.1' }] }))`,
				].join('\n'),
			)
			scratch.ensure('consumer/tmp')
			createRepository(target)
			trackFiles(target)
			commitFiles(target)
			return {
				scratch,
				target,
				registry,
				environment,
				destroy: async () => {
					await registry.destroy()
					scratch.destroy()
				},
			}
		} catch (error) {
			await registry.destroy()
			throw error
		}
	} catch (error) {
		scratch.destroy()
		throw error
	}
}

/** Describes a generated core workspace and its isolated child environment. */
export interface TestWaveRecording {
	readonly scratch: ScratchInterface
	readonly target: string
	readonly environment: Readonly<Record<string, string>>
}

/** Describes a generated overwrite target and the lifetime of its upstream protocol fixture. */
export interface TestWaveOverwrite extends TestWaveRecording {
	destroy(): Promise<void>
}

/**
 * Generates a core workspace with this checkout's built executable and commits its baseline.
 *
 * @param prefix - The owned scratch allocation prefix.
 * @returns The generated workspace with the actual scaffold checkout linked as its installed host.
 * @throws Thrown when generation fails.
 */
export function createWaveWorkspace(prefix: string): TestWaveRecording {
	const scratch = createScratch({ prefix })
	try {
		const environment = { ...buildSwapEnvironment(join(scratch.path, 'tmp')), ...WAVE_IDENTITY }
		const generated = runSkillScript(
			'dist/bin/main.js',
			['new', 'record', '--src', 'core', '--offline', '--target', scratch.path, '--json'],
			{ env: environment },
		)
		if (generated.status !== 0)
			throw new Error(`Wave generation failed: ${generated.stdout}${generated.stderr}`)
		scratch.ensure('node_modules/@orkestrel')
		scratch.link('node_modules/@orkestrel/scaffold', WORKSPACE_ROOT)
		createRepository(scratch.path)
		trackFiles(scratch.path)
		commitFiles(scratch.path)
		return { scratch, target: scratch.path, environment }
	} catch (error) {
		scratch.destroy()
		throw error
	}
}

/**
 * Creates a generated repository whose real scaffold overwrite repairs and removes tracked files.
 *
 * @param prefix - The scratch allocation prefix.
 * @returns The fixture with loopback registry and repository endpoints and an owned cleanup method.
 * @throws Thrown when generation or upstream fixture setup fails.
 */
export async function createWaveRecording(prefix: string): Promise<TestWaveOverwrite> {
	const fixture = createWaveWorkspace(prefix)
	try {
		const { scratch, target } = fixture
		const manifest = readInstalledRecord(target)
		const dependencies = ['dependencies', 'devDependencies'].flatMap((field) =>
			isRecord(manifest[field]) ? Object.entries(manifest[field]) : [],
		)
		const server = await createUpstreamServer({
			...buildInstalledHostReplies(readHostFloor(join(WORKSPACE_ROOT, 'dist', 'host'))),
			'/-/org/orkestrel/package': {
				status: 200,
				body: buildOrganization(
					dependencies.map(([name]) => name).filter((name) => name.startsWith('@orkestrel/')),
				),
			},
			...Object.fromEntries(
				dependencies.map(([name, range]) => {
					if (!isString(range)) throw new Error(`No registry range for ${name}`)
					return [
						`/${name.replace('/', '%2F')}`,
						{ status: 200, body: buildPackument(range.replace(/^\^/u, '')) },
					]
				}),
			),
			...Object.fromEntries(
				dependencies
					.filter(([name]) => name.startsWith('@orkestrel/'))
					.map(([name]) => {
						const short = name.slice('@orkestrel/'.length)
						return [
							`/orkestrel/${short}/refs/heads/main/guides/${short}.md`,
							{
								status: 200,
								body: readFileSync(join(WORKSPACE_ROOT, 'guides', `${short}.md`), 'utf8'),
								type: 'text/plain',
							},
						]
					}),
			),
		})
		try {
			const environment = {
				...fixture.environment,
				ORKESTREL_SCAFFOLD_REGISTRY: server.base,
				ORKESTREL_SCAFFOLD_REPOSITORY: server.base,
			}
			const catalog = await spawnSkillScript(
				'dist/bin/main.js',
				['catalog', '--target', target, '--json'],
				{ env: environment },
			)
			if (catalog.status !== 0)
				throw new Error(
					`Wave catalog failed: ${JSON.stringify({ status: catalog.status, error: catalog.json?.error, note: catalog.json?.note, membership: catalog.json?.membership })} ${catalog.stderr}`,
				)
			scratch.write('.editorconfig', 'stale\n')
			scratch.write('.claude/rules/removed.md', 'superseded instructions\n')
			trackFiles(target)
			commitFiles(target)
			return {
				...fixture,
				environment,
				destroy: async () => {
					await server.destroy()
					scratch.destroy()
				},
			}
		} catch (error) {
			await server.destroy()
			throw error
		}
	} catch (error) {
		fixture.scratch.destroy()
		throw error
	}
}

/** Lists the regeneration refusals and the reason each fixture must report. */
export const WAVE_REFUSALS: ReadonlyArray<readonly [string, string]> = Object.freeze([
	['link', 'node_modules is a link'],
	['untracked', 'package-lock.json is untracked'],
	['dirty', 'package-lock.json carries uncommitted changes'],
	['local', 'local dependency specs: overrides.unused'],
	['workspaces', 'the manifest declares workspaces'],
	['ignored', 'tmp/ is not git-ignored'],
	['nested', 'the target is not the root of its work tree'],
])

/** Lists whether a completion-journal collision follows restoration. */
export const WAVE_JOURNAL_FAILURES: readonly boolean[] = Object.freeze([false, true])

/** Lists the steps the publish wave runs for each package, in order. */
export const WAVE_STEPS: readonly string[] = Object.freeze([
	'pin',
	'commit',
	'overwrite',
	'verify',
	'install',
	'pins',
	'format',
	'record',
	'gates',
	'compare',
])

/** Holds a Claude stream journal of an init event and a result event answering READY. */
export const RESULT_STREAM =
	'{"type":"system","subtype":"init","session_id":"s1"}\n{"type":"result","result":"READY","duration_ms":42}\n'

/** Holds the age in seconds of a launch file old enough for the sweep to delete. */
export const SWEEP_HOURS_AGO = 3 * 60 * 60

/** Holds the age in seconds of a launch file too recent for the sweep to delete. */
export const SWEEP_MINUTES_AGO = 10 * 60

/**
 * Describes the fixture registry that answers `whoami` and records every request it receives.
 */
export interface TestWhoamiInterface {
	readonly url: string
	readonly port: number
	readonly requests: readonly string[]
	destroy(): Promise<void>
}

/**
 * Answers one request the fixture registry receives.
 *
 * Answers `whoami` with the user it was given, or 401 when it was given none, refuses every upload
 * with 401 (the shape npm reads as an authentication refusal), and answers every other read 404.
 *
 * @param user - The user `whoami` reports, or undefined for none.
 * @param request - The request to answer.
 * @param response - The response to write.
 */
export function answerWhoami(
	user: string | undefined,
	request: IncomingMessage,
	response: ServerResponse,
): void {
	const whoami = request.url === '/-/whoami'
	if (whoami && user !== undefined) {
		response.writeHead(200, { 'content-type': 'application/json' })
		response.end(JSON.stringify({ username: user }))
		return
	}
	const refused = whoami || request.method === 'PUT'
	response.writeHead(refused ? 401 : 404, { 'content-type': 'application/json' })
	response.end(JSON.stringify({ error: refused ? 'Unauthorized' : 'Not found' }))
}

/**
 * Starts the fixture registry on an ephemeral loopback port.
 *
 * @param user - The user `whoami` reports, or undefined for none.
 * @returns The running registry with its recorded requests, which the caller destroys in a `finally`.
 */
export async function createWhoamiRegistry(user: string | undefined): Promise<TestWhoamiInterface> {
	const requests = createRecorder<readonly [string]>()
	const loopback = await createLoopback(
		createServer((request, response) => {
			requests.handler(`${request.method ?? ''} ${request.url ?? ''}`)
			request.resume()
			request.on('end', () => {
				answerWhoami(user, request, response)
			})
		}),
	)
	return {
		url: `${loopback.url}/`,
		port: loopback.port,
		get requests() {
			return requests.calls.map(([request]) => request)
		},
		destroy: loopback.destroy,
	}
}

/**
 * Builds the npm environment that routes every read to the fixture registry.
 *
 * npm reads the fixture registry and a scratch cache from the environment, which outranks every
 * config file npm launched this suite with, and the fixture token from a scratch user config, so no
 * real credential reaches the fixture and no case reaches the public registry.
 *
 * @param root - The scratch root that receives the cache and config files.
 * @param registry - The fixture registry the environment names.
 * @returns The `npm_config_*` variables.
 */
export function buildWhoamiEnvironment(
	root: string,
	registry: TestWhoamiInterface,
): Readonly<Record<string, string>> {
	const userconfig = join(root, `npmrc-${String(registry.port)}`)
	writeFileSync(
		userconfig,
		`//127.0.0.1:${String(registry.port)}/:_authToken=fixture-token\nupdate-notifier=false\n`,
	)
	return {
		npm_config_registry: registry.url,
		npm_config_cache: join(root, 'npm-cache'),
		npm_config_userconfig: userconfig,
		npm_config_globalconfig: join(root, 'globalrc'),
	}
}

/**
 * Builds the run shape both skill runners return: the exit, both streams, and the last stdout
 * line parsed as JSON.
 *
 * @param status - The exit code, or null when a signal ended the child.
 * @param stdout - The standard output the child wrote.
 * @param stderr - The standard error the child wrote.
 * @returns The finished run.
 */
export function buildSkillRun(status: number | null, stdout: string, stderr: string): TestSkillRun {
	const line = stdout
		.split(/\r\n|\n/)
		.filter((candidate) => candidate.trim() !== '')
		.at(-1)
	const parsed = line === undefined ? undefined : parseJSON(line)
	return { status, stdout, stderr, json: isRecord(parsed) ? parsed : undefined }
}

/** Holds immutable released proof bytes; add a release key without editing an existing fixture. */
export const DISTRIBUTION_PROOF_TEXTS = Object.freeze({
	'0.0.104': Object.freeze({
		node: "import {\n\t// These exports remain available to proofs emitted by earlier scaffold releases.\n\tbuildDistributionCases,\n\tcreateDistributionSuite,\n} from './setupDistribution.js'\nimport { afterAll, beforeAll, describe, expect, it } from 'vitest'\n\nconst DISTRIBUTION_SUITE = createDistributionSuite()\n\nbeforeAll(() => DISTRIBUTION_SUITE.start())\n\nafterAll(() => DISTRIBUTION_SUITE.destroy())\n\ndescribe('installed package consumer', () => {\n\tfor (const row of buildDistributionCases(DISTRIBUTION_SUITE)) {\n\t\tit(`${row.label}`, async (context) => {\n\t\t\tconst observation = await row.observe(context)\n\t\t\texpect(observation.actual).toStrictEqual(observation.expected)\n\t\t})\n\t}\n\tit('publishes no browser face this proof cannot drive [requires the registry]', (context) => {\n\t\tconst faces = DISTRIBUTION_SUITE.read(context).entries.filter((entry) => entry.browsable)\n\t\texpect(faces.map((entry) => entry.subpath)).toStrictEqual([])\n\t})\n})\n",
		browser:
			"import {\n\t// These exports remain available to proofs emitted by earlier scaffold releases.\n\tbuildDistributionCases,\n\tcheckDistributionBrowser,\n\tcreateDistributionSuite,\n} from './setupDistribution.js'\nimport { afterAll, beforeAll, describe, expect, it } from 'vitest'\n\nconst DISTRIBUTION_SUITE = createDistributionSuite()\n\nbeforeAll(() => DISTRIBUTION_SUITE.start())\n\nafterAll(() => DISTRIBUTION_SUITE.destroy())\n\ndescribe('installed package consumer', () => {\n\tfor (const row of buildDistributionCases(DISTRIBUTION_SUITE)) {\n\t\tit(`${row.label}`, async (context) => {\n\t\t\tconst observation = await row.observe(context)\n\t\t\texpect(observation.actual).toStrictEqual(observation.expected)\n\t\t})\n\t}\n\tit('publishes what it declares to a real browser [requires a browser]', async (context) => {\n\t\texpect(await checkDistributionBrowser(DISTRIBUTION_SUITE.read(context), context)).toStrictEqual(\n\t\t\t[],\n\t\t)\n\t})\n})\n",
	}),
})

/** Drives the emitted suite's ownership with a real refusing registry and filesystem. */
export const DISTRIBUTION_LIFECYCLE_TEXT = `import { existsSync } from 'node:fs'
import { createDistributionSuite } from './setupDistribution.js'
import { describe, expect, it } from 'vitest'

describe('distribution suite lifecycle', () => {
	it('binds a run until destruction, refuses overlap, and permits a later run', () => {
		const suite = createDistributionSuite()
		try {
			expect(() => suite.scratch).toThrow('has not allocated')
			suite.start()
			const initial = suite.scratch
			expect(existsSync(initial)).toBe(true)
			expect(() => suite.start()).toThrow('already allocated')
			expect(suite.scratch).toBe(initial)
			suite.destroy()
			expect(existsSync(initial)).toBe(false)
			expect(() => suite.scratch).toThrow('has not allocated')
			suite.destroy()
			suite.start()
			const subsequent = suite.scratch
			expect(subsequent).not.toBe(initial)
			expect(existsSync(subsequent)).toBe(true)
			suite.destroy()
			expect(existsSync(subsequent)).toBe(false)
		} finally {
			suite.destroy()
		}
	})
})
`
