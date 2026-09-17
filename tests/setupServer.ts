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
import type { ServerResponse } from 'node:http'
import type { ResolveHookSync } from 'node:module'
import type { ExecuteResult } from '@orkestrel/process'
import type { ESTree } from 'vite'
import { execFileSync, spawnSync } from 'node:child_process'
import { once } from 'node:events'
import { chmodSync, globSync, readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { connect, createServer as createSocketServer, isIP } from 'node:net'
import { delimiter, join, relative as relativePath } from 'node:path'
import { fileURLToPath } from 'node:url'
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
import { parseSync, transformWithOxc } from 'vite'
import {
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
import { captureError, createRecorder, resolveRoot, waitForCondition } from '@orkestrel/test'
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
} from './setup.js'

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
	const paths: string[] = []
	for (const line of listing.split('\n')) {
		if (!line.startsWith('100755 ')) continue
		const tab = line.indexOf('\t')
		if (tab === -1) continue
		paths.push(line.slice(tab + 1))
	}
	return paths.sort()
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
 * Reads the npm version an environment resolves.
 *
 * @param environment - The environment overrides a spawn takes. Default: this process's own.
 * @returns The exact version the resolved npm reports for its own `--version`.
 * @throws When the run fails, carrying what it wrote to standard error.
 *
 * @remarks
 * Launched through `executeSync`, which resolves the executable itself and never uses a
 * shell, so this reading carries no platform branch of its own. The version comes from
 * the binary rather than from a manifest beside it, because `PATH` decides which npm a
 * nested `npm run` launches and only a run under that environment reports the answer.
 */
export function readNpmVersion(environment: NodeJS.ProcessEnv = process.env): string {
	const read = executeSync(
		{ file: 'npm', arguments: ['--version'], environment },
		{ workspace: WORKSPACE_ROOT, strict: false },
	)
	if (read.failed) {
		throw new Error(`The npm this environment resolves refused --version: ${read.stderr}`)
	}
	return read.stdout.trim()
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
 * the ambient version and refusing. The ambient npm is used unchanged when it satisfies
 * the floor, so a conforming host installs nothing and reaches no registry.
 */
export function provisionNpm(options: TestNpmOptions): TestNpm {
	const base = options.environment ?? process.env
	const ambient = readNpmVersion(base)
	if (compareVersions(ambient, options.floor) >= 0) {
		return { version: ambient, environment: mergeEnvironment(false, base) }
	}
	const bin = join(options.prefix, 'node_modules', '.bin')
	const provisioned = executeSync(
		{
			file: 'npm',
			arguments: [
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
 * Drives expressions against a transformed source module in a fresh real module graph.
 *
 * @param source - The TypeScript declarations to transform and export.
 * @param calls - The expressions to evaluate against the module's `classifier` binding.
 * @returns The values the drive exported.
 */
export async function driveClassifier(
	source: string,
	calls: readonly string[],
): Promise<readonly unknown[]> {
	const workspace = createScratch({ prefix: 'scaffold-classifier-' })
	try {
		const transformed = await transformWithOxc(source, 'classifier.ts', { target: 'esnext' })
		workspace.write('classifier.mjs', transformed.code)
		workspace.write(
			'drive.mjs',
			`import * as classifier from './classifier.mjs'\nexport const answers = [${calls.join(', ')}]\n`,
		)
		const load = createRequire(import.meta.url)
		const driven: unknown = load(join(workspace.path, 'drive.mjs'))
		if (!isRecord(driven) || !isArray(driven.answers)) {
			throw new Error('The emitted classifier drive exported no answer list')
		}
		return driven.answers
	} finally {
		workspace.destroy()
	}
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
			const bindings: Array<{
				readonly name: string
				readonly shape: ESTree.Function | ESTree.ArrowFunctionExpression | undefined
			}> = []
			const body: TestStatement[] = []
			if (declaration?.type === 'FunctionDeclaration') {
				if (declaration.id !== null)
					bindings.push({ name: declaration.id.name, shape: declaration })
				if (declaration.body !== null)
					pending.push({ statements: declaration.body.body, into: body })
			} else if (declaration?.type === 'VariableDeclaration') {
				for (const declarator of declaration.declarations) {
					if (declarator.id.type !== 'Identifier') continue
					const initializer = declarator.init
					const shape =
						initializer?.type === 'ArrowFunctionExpression' ||
						initializer?.type === 'FunctionExpression'
							? initializer
							: undefined
					bindings.push({ name: declarator.id.name, shape })
				}
			}
			const declarations: TestDeclaration[] = []
			for (const binding of bindings) {
				const annotation = binding.shape?.returnType?.typeAnnotation
				declarations.push({
					name: binding.name,
					parameters: (binding.shape?.params ?? []).map((parameter) =>
						source.slice(parameter.start, parameter.end),
					),
					returns:
						annotation === undefined ? undefined : source.slice(annotation.start, annotation.end),
				})
			}
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
 * a `require` reached through a member expression such as `require.resolve`.
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
 * visible in the assertion rather than in a length.
 */
export function createHostRoot(
	workspace: ScratchInterface,
	relative: string,
	manifest: HostManifest,
): string {
	const root = workspace.ensure(relative)
	for (const entry of manifest.entries) {
		workspace.write(`${relative}/${entry.storage}`, `${entry.destination}\n`)
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
	const output: string[] = []
	const diagnostic: string[] = []
	return {
		options: {
			output: (line: string) => void output.push(line),
			diagnostic: (line: string) => void diagnostic.push(line),
		},
		get output() {
			return [...output]
		},
		get diagnostic() {
			return [...diagnostic]
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
 * The manifest includes {@link CATALOG_AGENT_PATH} and the reference guides.
 * The fixture reads the checkout's script and guide membership. Hydration must
 * select the claimed files while leaving unclaimed reference guides in the host.
 */
export function buildFleetManifest(): HostManifest {
	const entries: ManifestEntry[] = []
	const roots: string[] = []
	for (const path of [...HOST_PATHS, CATALOG_AGENT_PATH, ...REFERENCE_PATHS]) {
		if (!HOST_DIRECTORY_PATHS.includes(path)) {
			entries.push(buildManifestEntry({ storage: pathToStorage(path), destination: path }))
			continue
		}
		roots.push(path)
		const directory = fileURLToPath(new URL(`../${path}/`, import.meta.url))
		for (const name of listFiles(directory)) {
			const destination = `${path}/${name}`
			entries.push(
				buildManifestEntry({
					storage: pathToStorage(destination),
					destination,
					executable: matchesExecutablePath(destination),
				}),
			)
		}
	}
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
	const entries: ManifestEntry[] = []
	const roots: string[] = []
	for (const path of STAGED_PATHS) {
		if (!HOST_DIRECTORY_PATHS.includes(path)) {
			entries.push(
				buildManifestEntry({
					storage: pathToStorage(path),
					destination: path,
					executable: matchesExecutablePath(path),
					digest: computeDigest(`${path}\n`),
				}),
			)
			continue
		}
		roots.push(path)
		if (path === '.claude/skills') continue
		if (path === 'guides') {
			for (const guide of CHECKOUT_GUIDE_PATHS)
				entries.push(
					buildManifestEntry({
						storage: guide,
						destination: guide,
						digest: computeDigest(`${guide}\n`),
					}),
				)
			continue
		}
		const destination = `${path}/${path === 'scripts' ? 'codex.sh' : 'sample.md'}`
		entries.push(
			buildManifestEntry({
				storage: pathToStorage(destination),
				destination,
				executable: matchesExecutablePath(destination),
				digest: computeDigest(`${destination}\n`),
			}),
		)
	}
	entries.push(
		buildManifestEntry({
			storage: pathToStorage(CATALOG_AGENT_PATH),
			destination: CATALOG_AGENT_PATH,
			digest: computeDigest(CATALOG_AGENT_ROWS_TEXT),
		}),
	)
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
	const findings: Finding[] = []
	for (const path of paths) {
		const observed = readFileHex(target, path)
		if (observed === undefined) {
			findings.push({ path, group: 'docs', ownership: 'content', drift: 'missing' })
			continue
		}
		findings.push({
			path,
			group: 'docs',
			ownership: 'content',
			drift: stale.includes(path) ? 'stale' : 'aligned',
			observed,
		})
	}
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
	const replies: Record<string, TestUpstreamReply> = {
		'/orkestrel/scaffold/refs/heads/main/host.json': {
			status: 200,
			body: JSON.stringify(floor.manifest),
		},
	}
	for (const entry of floor.manifest.entries) {
		if (isDeferredPath(entry.destination)) continue
		const hex = floor.bytes[entry.destination]
		if (hex === undefined) continue
		replies[`/orkestrel/scaffold/refs/heads/main/${entry.destination}`] = {
			status: 200,
			body: Buffer.from(hex, 'hex').toString('utf8'),
			type: 'text/plain',
		}
	}
	return replies
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
	const headers: Record<string, string> = { 'content-type': reply.type ?? 'application/json' }
	const body =
		reply.encoding === 'gzip'
			? gzipSync(reply.body)
			: typeof reply.body === 'string'
				? Buffer.from(reply.body, 'utf8')
				: Buffer.from(reply.body)
	if (reply.location !== undefined) headers.location = reply.location
	if (reply.encoding !== undefined) headers['content-encoding'] = reply.encoding
	if (reply.chunked !== true) {
		headers['content-length'] = String(body.byteLength)
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
	const served: string[] = []
	const negotiated: Array<string | undefined> = []
	const waiters = new Map<string, () => void>()
	const arrivals = new Map<string, Promise<void>>()
	const counts = { open: 0, peak: 0 }
	for (const path of Object.keys(replies)) {
		arrivals.set(path, new Promise<void>((settle) => waiters.set(path, settle)))
	}
	const server = createServer((request, response) => {
		const path = request.url ?? ''
		served.push(path)
		negotiated.push(request.headers.accept)
		counts.open += 1
		if (counts.open > counts.peak) counts.peak = counts.open
		response.on('close', () => {
			counts.open -= 1
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
	const loopback = await createLoopback(server)
	return {
		base: loopback.url,
		get paths() {
			return [...served]
		},
		get accepts() {
			return [...negotiated]
		},
		get peak() {
			return counts.peak
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
	let url: URL
	try {
		url = new URL(/^https?:\/\//iu.test(host) ? host : `http://${host}`)
		if (
			host.length === 0 ||
			(url.protocol !== 'http:' && url.protocol !== 'https:') ||
			url.username !== '' ||
			url.password !== '' ||
			url.pathname !== '/' ||
			url.search !== '' ||
			url.hash !== '' ||
			url.hostname === ''
		)
			throw new Error('Invalid origin')
	} catch {
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
	const requests: TestOllamaRequest[] = []
	const server = createServer(async (request, response) => {
		const chunks: Buffer[] = []
		for await (const chunk of request) chunks.push(Buffer.from(chunk))
		const text = Buffer.concat(chunks).toString('utf8')
		const method = request.method
		const path = request.url
		requests.push({ method, path, body: text === '' ? undefined : parseJSON(text) })
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
			return [...requests]
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
