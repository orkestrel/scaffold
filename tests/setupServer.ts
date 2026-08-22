import type {
	HostManifest,
	ManifestEntry,
	MaterializerOptions,
	Repository,
	UpstreamOptions,
} from '@src/server'
import type { Audit, Blueprint, Finding, Plan, ScaffoldErrorCode, Snapshot } from '@src/core'
import type { CLICommand, CLIOptions, Verb } from '../src/bin/types.js'
import type { TestGuardCase, TestPathCase } from './setup.js'
import type { ServerResponse } from 'node:http'
import { execFileSync } from 'node:child_process'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'
import {
	CATALOG_AGENT_PATH,
	blueprintToDevDependencies,
	contentToHex,
	blueprintToScripts,
	Compiler,
	createBlueprint,
	HOST_PATHS,
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
	isManifestEntry,
	isMaterializerHooks,
	isMaterializerOptions,
	isMirrors,
	isRepository,
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
	stageHost,
} from '@src/server'
import { optionToName } from '../src/bin/helpers.js'
import { createRecorder, resolveRoot } from '@orkestrel/test'
import { createLoopback, type ScratchInterface, supportsCase } from '@orkestrel/test/server'
import {
	buildBlueprint,
	buildContentArtifact,
	buildFinding,
	buildHostArtifact,
	buildPlan,
	buildQuestion,
} from './setup.js'

/**
 * One command line beside the exact command it denotes.
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
 * One command line that denotes no command, beside what its refusal must name.
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
 * One audit beside whether the executable reads it as a clean run.
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

/** One boundary value a server guard decides, with the verdict it owes. */
export interface TestBoundaryCase {
	readonly label: string
	readonly guard: (value: unknown) => boolean
	readonly value: unknown
	readonly accepted: boolean
}

/** One path a classifying predicate decides, with the verdict it owes. */
export interface TestMatchCase {
	readonly label: string
	readonly path: string
	readonly matched: boolean
}

/** One target-relative path beside the vendored storage name it maps to. */
export interface TestStorageCase {
	readonly label: string
	readonly path: string
	readonly storage: string
}

/** One text beside the digest a conforming SHA-256 owes it. */
export interface TestDigestCase {
	readonly label: string
	readonly content: string
	readonly digest: string
}

/** One caller-supplied upstream endpoint, with the verdict the reader's law owes it. */
export interface TestEndpointCase {
	readonly label: string
	readonly base: string
	readonly accepted: boolean
}

/**
 * One scripted HTTP reply the upstream fixture serves at one exact path.
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
	readonly body: string
	readonly type?: string
	readonly location?: string
	readonly chunked?: boolean
	readonly encoding?: 'gzip'
	readonly held?: boolean
	readonly delay?: number
}

/**
 * The declared range sets a published version carries in a packument.
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
}

/**
 * One vendored file the repository fixture serves, beside the path it serves it at.
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
 * A real HTTP server on loopback, scripted per path.
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

/**
 * The repository root, resolved from this file rather than from the process.
 *
 * @remarks
 * Anchoring here is what keeps a loader independent of the directory the runner
 * happened to start in. It is also a real absolute host path this platform
 * produced, so a test can measure the host-path law against it.
 */
export const WORKSPACE_ROOT = fileURLToPath(resolveRoot(import.meta))

export const SCRATCH_PREFIX = 'orkestrel-scaffold-'

/**
 * List the tracked paths this repository records as executable.
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
 * Whether this run's temporary directories resolve a recased name.
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
 * Build a valid inert vendored-host manifest entry, with focused field replacements.
 *
 * @param fields - The entry fields to replace on the returned value.
 * @returns An entry carrying the requested fields over minimal defaults.
 */
export function buildManifestEntry(fields?: Partial<ManifestEntry>): ManifestEntry {
	const entry = { storage: 'AGENTS.md', destination: 'AGENTS.md', executable: false, ...fields }
	return { ...entry, digest: fields?.digest ?? computeDigest(`${entry.destination}\n`) }
}

/**
 * Build a valid inert vendored-host manifest, with focused field replacements.
 *
 * @param fields - The manifest fields to replace on the returned value.
 * @returns A manifest carrying the requested fields over minimal defaults.
 */
export function buildHostManifest(fields?: Partial<HostManifest>): HostManifest {
	return {
		entries: [
			buildManifestEntry(),
			buildManifestEntry({
				storage: 'scripts/codex.sh',
				destination: 'scripts/codex.sh',
				executable: true,
			}),
		],
		roots: ['.claude/rules'],
		digest: computeDigest('scaffold'),
		...fields,
	}
}

/**
 * Build a valid inert git working-tree state, with focused field replacements.
 *
 * @param fields - The repository fields to replace on the returned value.
 * @returns A repository carrying the requested fields over minimal defaults.
 */
export function buildRepository(fields?: Partial<Repository>): Repository {
	return { tracked: ['AGENTS.md', 'guides/router.md'], dirty: [], ...fields }
}

/**
 * Build a valid inert materializer option bag, with focused field replacements.
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
 * Build a valid inert upstream option bag, with focused field replacements.
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
 * Build every guard the server face publishes, with what each must accept.
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
				[{ name: '@orkestrel/router', lookup: 'found', version: '0.0.8', dependencies: [] }],
				[
					{
						name: '@orkestrel/agent',
						lookup: 'found',
						version: '0.0.15',
						dependencies: [{ name: '@orkestrel/tool', range: '^0.0.10' }],
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
			name: 'isRepository',
			guard: isRepository,
			accepted: [buildRepository(), buildRepository({ dirty: ['AGENTS.md'] })],
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
 * Every candidate the host-path law decides, with the verdict it owes.
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
 * Build every boundary value the server's option, manifest, and inventory laws decide.
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
			guard: isRepository,
			value: buildRepository({
				tracked: Array.from({ length: MAX_INVENTORY_PATHS }, () => 'AGENTS.md'),
			}),
			accepted: true,
		},
		{
			label: 'an inventory one path past the ceiling',
			guard: isRepository,
			value: buildRepository({
				tracked: Array.from({ length: MAX_INVENTORY_PATHS + 1 }, () => 'AGENTS.md'),
			}),
			accepted: false,
		},
		{
			label: 'an inventory carrying a traversal',
			guard: isRepository,
			value: buildRepository({ dirty: ['../secrets'] }),
			accepted: false,
		},
	]
}

/**
 * Run a call and report the coded reason it refused.
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
export function readErrorCode(call: () => unknown): ScaffoldErrorCode | undefined {
	try {
		call()
		return undefined
	} catch (error) {
		return isScaffoldError(error) ? error.code : undefined
	}
}

/**
 * Read the message from one synchronous scaffold refusal.
 *
 * @param call - The operation expected to raise a scaffold error.
 * @returns The scaffold error's message, or `undefined` when the call returned
 * normally or raised something that is not a scaffold error.
 */
export function readErrorMessage(call: () => unknown): string | undefined {
	try {
		call()
		return undefined
	} catch (error) {
		return isScaffoldError(error) ? error.message : undefined
	}
}

/**
 * Build a vendored-host manifest that matches its own membership.
 *
 * @param fields - The membership to replace on the returned value.
 * @returns A manifest whose digest is computed from the membership it carries.
 *
 * @remarks
 * Distinct from {@link buildHostManifest}, which carries an arbitrary
 * syntactically valid digest because a guard reads syntax only. A reader
 * verifies the digest against the membership beside it, so it needs a manifest
 * that actually agrees with itself.
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
		...fields,
	}
	return { ...membership, digest: computeManifestDigest(membership.entries, membership.roots) }
}

/**
 * Write a real vendored host root a reader can be measured against.
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
 * Stage this checkout's real vendored host into a temporary workspace.
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
 * Every text whose SHA-256 is a published, externally checkable value.
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

/** Every path the repository-metadata rule decides, with the verdict it owes. */
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

/** Every path the deletion deny-list decides, with the verdict it owes. */
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

/** Every path the vendoring deny-list decides, with the verdict it owes. */
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
 * Build the vendored membership the writers are measured against.
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
		...fields,
	}
	return { ...membership, digest: computeManifestDigest(membership.entries, membership.roots) }
}

/**
 * One command-line word carrying every byte a refusal must not pass on.
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

/** Every byte {@link HOSTILE_ARGUMENT} carries that a written line must not. */
export const HOSTILE_BYTES: readonly string[] = ['\u001b', '\u0007', '\u007f', '\n']

/**
 * Initialize a real git repository at a path.
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
 * The destinations one executable run wrote to, and the options that wired them.
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
 * Create the recording destinations one executable run writes to.
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
 * The vendored paths that are directories rather than files.
 *
 * @remarks
 * `HOST_PATHS` mixes files and directories and says which is which nowhere, because the
 * vendored root's own manifest is what decides it. A fixture builds that
 * manifest, so the fixture declares the split. `.claude/skills` is the one
 * declared directory no entry sits beneath, which makes it the empty-directory
 * case every writer has to survive.
 */
export const HOST_DIRECTORY_PATHS: readonly string[] = [
	'.agents/skills',
	'.claude/agents',
	'.claude/rules',
	'.claude/skills',
	'.codex/agents',
	'.cursor/rules',
]

/**
 * Build the manifest a vendored root storing every planned path declares.
 *
 * @returns A manifest whose digest is computed from the membership it carries.
 *
 * @remarks
 * Wider than {@link buildVendoredManifest}, and for a different question: that
 * one gives a writer every shape a vendored entry has, while this one gives a
 * whole compiled plan somewhere to resolve. A plan claims every path in
 * `HOST_PATHS`, and a host that does not carry one of them refuses the write, so
 * a fixture driving the executable needs the complete set rather than a sample.
 * Each directory except the declared empty one is given one file, which is what
 * makes its expansion observable.
 */
export function buildFleetManifest(): HostManifest {
	const entries: ManifestEntry[] = []
	const roots: string[] = []
	for (const path of HOST_PATHS) {
		if (!HOST_DIRECTORY_PATHS.includes(path)) {
			entries.push(buildManifestEntry({ storage: pathToStorage(path), destination: path }))
			continue
		}
		roots.push(path)
		if (path === '.claude/skills') continue
		const destination = path === '.claude/agents' ? CATALOG_AGENT_PATH : `${path}/sample.md`
		entries.push(buildManifestEntry({ storage: pathToStorage(destination), destination }))
	}
	const membership = { entries, roots: [...roots].sort() }
	return { ...membership, digest: computeManifestDigest(membership.entries, membership.roots) }
}

/**
 * Write a real checkout carrying every vendored path, as the stager reads one.
 *
 * @param workspace - The temporary workspace the checkout is written into.
 * @param relative - The workspace-relative directory to write it at.
 * @returns The checkout's absolute path.
 *
 * @remarks
 * The stager reads `HOST_PATHS` out of core, which no test can vary, so the
 * checkout beneath it is the only seam a stager test has. Every file carries its
 * own path as its content, so a file staged under the wrong storage name is
 * visible in the assertion rather than in a count. Each vendored directory is
 * given one file except `.claude/skills`, which is left genuinely empty because
 * that is the root a file inventory cannot see and the one the manifest exists
 * to declare.
 */
export function createCheckout(workspace: ScratchInterface, relative: string): string {
	const root = workspace.ensure(relative)
	for (const path of HOST_PATHS) {
		if (!HOST_DIRECTORY_PATHS.includes(path)) {
			workspace.write(`${relative}/${path}`, `${path}\n`)
			continue
		}
		workspace.ensure(`${relative}/${path}`)
		if (path === '.claude/skills') continue
		workspace.write(`${relative}/${path}/sample.md`, `${path}/sample.md\n`)
	}
	return root
}

/**
 * Build the manifest a host staged from {@link createCheckout} must declare.
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
	for (const path of HOST_PATHS) {
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
		const destination = `${path}/sample.md`
		entries.push(
			buildManifestEntry({
				storage: pathToStorage(destination),
				destination,
				executable: matchesExecutablePath(destination),
				digest: computeDigest(`${destination}\n`),
			}),
		)
	}
	const membership = {
		entries: [...entries].sort((first, second) => (first.storage < second.storage ? -1 : 1)),
		roots: [...roots].sort(),
	}
	return { ...membership, digest: computeManifestDigest(membership.entries, membership.roots) }
}

/**
 * Write a vendored root carrying every planned path, and the target beside it.
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
 * Write a fleet beside a target that already carries a rewritable catalog file.
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
 * Put every file in a target under git's control, without committing.
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
 * How many artifacts the compiler itself supplies for a plan selecting `src/core` alone.
 *
 * @remarks
 * Every artifact no vendored entry answers for: the computed manifest plus each
 * template the blueprint's own axes select. Counted from a real compile rather
 * than summed from parts, because the generated set grows every time the emitter
 * gains a group and a hand-written sum goes stale on each one. Repeated
 * staleness rounds are what produced this shape.
 */
export const CORE_GENERATED = (
	new Compiler().compile(createBlueprint('sample', { src: ['core'] })).plan?.artifacts ?? []
).filter((artifact) => artifact.origin !== 'host')

/** How many artifacts the compiler supplies for a `src/core` plan. */
export const CORE_GENERATED_COUNT = CORE_GENERATED.length

/**
 * How many paths a fleet target's plan claims once the vendored host has hydrated it.
 *
 * @remarks
 * Each term names a real source. The vendored membership comes from
 * {@link buildFleetManifest} rather than `HOST_PATHS`, because hydration is what
 * decides the number: a vendored directory is one planned path that collapses
 * into the files the host stores beneath it, and the one declared empty
 * directory collapses into none. {@link CORE_GENERATED_COUNT} is everything the
 * compiler supplies on top of that membership.
 *
 * The suites using this assert that the executable writes every path its plan
 * claims. That the plan claims the right ones is proven separately, against the
 * compiler in `src:core`.
 */
export const FLEET_ARTIFACT_COUNT = buildFleetManifest().entries.length + CORE_GENERATED_COUNT

/**
 * Whether a declared host root holds no stored entry beneath it.
 *
 * @param root - The root-relative directory a manifest declares.
 * @returns True when the manifest stores nothing under it.
 *
 * @remarks
 * The half a file walk cannot see. A root that holds files is implied by those
 * files; a root that holds none exists only because the manifest declares it,
 * and it is still materialized because the workspace is meant to have the
 * directory.
 */
export function matchesVacantRoot(root: string): boolean {
	return !buildFleetManifest().entries.some((entry) => entry.destination.startsWith(`${root}/`))
}

/**
 * How many paths the executable writes into a vacant target.
 *
 * @remarks
 * One more than {@link FLEET_ARTIFACT_COUNT}, and the extra one is a directory
 * rather than a file. A declared root that holds no entry — `.claude/skills` in
 * this fixture — is materialized because the workspace is meant to have it, and
 * is reported among the written paths. It carries no bytes, so the manifest has
 * no entry for it and an audit raises no finding against it. Measured, not
 * derived: a probe compared the written list against the manifest membership.
 */
export const FLEET_WRITE_COUNT =
	FLEET_ARTIFACT_COUNT + buildFleetManifest().roots.filter(matchesVacantRoot).length

/**
 * How many planned paths a repair leaves alone because the workspace owns them.
 *
 * @remarks
 * A birth-owned artifact is written once, when the workspace is created, and is
 * the consumer's from then on. Repair restores drift and must not overwrite one,
 * so this is exactly what its `skipped` list carries. Counted from the plan so
 * it tracks the emitter: the set grew the moment generated source, test and
 * documentation artifacts existed.
 */
export const FLEET_BIRTH_PATHS = CORE_GENERATED.filter(
	(artifact) => artifact.ownership === 'birth',
).map((artifact) => artifact.path)

/** How many planned paths a repair skips because the workspace owns them. */
export const FLEET_BIRTH_COUNT = FLEET_BIRTH_PATHS.length

/**
 * Build the plan {@link buildVendoredManifest} answers for.
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
			buildHostArtifact({ path: 'scripts/codex.sh', group: 'orchestration' }),
		],
		...fields,
	})
}

/**
 * Compile the default blueprint through the real compiler with its default selection.
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
 * Build the audit a target is in, declaring which paths the caller made stale.
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
 * The catalog agent file as a target carries it, markers and surrounding prose included.
 *
 * @remarks
 * The marker pair is written literally here because the writer holds it as a
 * private class constant. Once the artifact that renders this file exists, both
 * belong to one shared constant and this fixture reads it instead.
 */
export const CATALOG_AGENT_TEXT = [
	'# Orkestrel',
	'',
	'Prose a consumer wrote above the table.',
	'',
	'<!-- orkestrel:catalog -->',
	'| Package | Version |',
	'| --- | --- |',
	'<!-- /orkestrel:catalog -->',
	'',
	'Prose a consumer wrote below the table.',
	'',
].join('\n')

/** The development dependencies planned for the fixture's published core environment. */
export const TARGET_DEV_DEPENDENCIES = blueprintToDevDependencies(
	createBlueprint('sample', { src: ['core'] }),
)

/**
 * Build a target manifest with focused dependency-section replacements.
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
 * Remove selected dependency names from an inert manifest section.
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

/** A target manifest declaring its planned scripts, tools, fleet packages, and an extra. */
export const TARGET_MANIFEST_TEXT = buildTargetManifest(
	undefined,
	{
		'@orkestrel/emitter': '^0.0.5',
		vite: '~8.2.0',
	},
	{ ...TARGET_DEV_DEPENDENCIES, '@orkestrel/guide': '^0.0.9' },
)

/**
 * A target manifest whose own name the compile gate refuses.
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
 * Every caller-supplied endpoint the reader's scheme and host law decides.
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
 * Build the registry packument text a version lookup reads.
 *
 * @param version - The version to publish under `dist-tags.latest`.
 * @param edges - The declared ranges the published version carries; omitted for
 * a packument that declares none.
 * @returns The response body, as the abbreviated packument form the registry
 * serves for `application/vnd.npm.install-v1+json`.
 *
 * @remarks
 * Written here as literal registry JSON rather than derived from anything the
 * reader owns, so the reader is measured against the upstream contract instead
 * of against itself. The abbreviated form carries `dist-tags` and a `versions`
 * map whose per-version record holds `dependencies` and `devDependencies`
 * alongside `dist`, `engines`, `name`, and `version` — verified against
 * `registry.npmjs.org` — so both edge kinds are writable here and a reader that
 * reads the wrong one is caught.
 */
export function buildPackument(version: string, edges?: TestPackumentEdges): string {
	return JSON.stringify({
		'dist-tags': { latest: version },
		name: '@orkestrel/sample',
		versions: {
			[version]: {
				name: '@orkestrel/sample',
				version,
				...(edges?.dependencies === undefined ? {} : { dependencies: edges.dependencies }),
				...(edges?.development === undefined ? {} : { devDependencies: edges.development }),
			},
		},
	})
}

/**
 * Build the registry organization package-list text a catalog reads.
 *
 * @param names - The published package names the organization lists.
 * @returns The response body, as the flat name-to-access map the registry serves.
 */
export function buildOrganization(names: readonly string[]): string {
	return JSON.stringify(Object.fromEntries(names.map((name) => [name, 'read-write'])))
}

/**
 * The vendored files the repository fixture serves, keyed for a test to name one.
 *
 * @remarks
 * `orchestration` carries a leading-dot directory and `mirror` is a guide the
 * mirror verb owns, so the set covers the two paths whose handling differs from
 * a plain root file rather than only the easy case.
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
 * Build the committed inventory text a vendored read is decided against.
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
	return JSON.stringify({ entries, roots: [], digest: computeManifestDigest(entries, []) })
}

/**
 * Build the target snapshot a vendored read is held to.
 *
 * @param files - The files the target holds, with the exact bytes it holds.
 * @returns Those bytes as hexadecimal, keyed by the same paths.
 */
export function buildVendoredSnapshot(files: readonly TestVendoredFile[]): Snapshot {
	return Object.fromEntries(files.map((file) => [file.path, contentToHex(file.content)]))
}

/**
 * Write one scripted reply onto a real HTTP response.
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
	const body = reply.encoding === 'gzip' ? gzipSync(reply.body) : Buffer.from(reply.body, 'utf8')
	if (reply.location !== undefined) headers.location = reply.location
	if (reply.encoding !== undefined) headers['content-encoding'] = reply.encoding
	if (reply.chunked !== true) {
		headers['content-length'] = String(body.byteLength)
	}
	response.writeHead(reply.status, headers)
	response.end(body)
}

/**
 * Start a real HTTP server on loopback, scripted per request path.
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
 * The exact request paths the upstream contract puts a reader at.
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
 * The exact request paths a fleet target's own declared set puts the executable at.
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
 * Wire one executable run to a recording sink and one loopback fixture.
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
 * Run an asynchronous call and report the coded reason it refused.
 *
 * @param call - The call under test.
 * @returns The rejected error's code, or `undefined` when the call resolved or
 * rejected with something that is not a {@link ScaffoldError}.
 *
 * @remarks
 * The asynchronous counterpart to {@link readErrorCode}, and it holds the same
 * line: both non-refusals answer `undefined`, so a test naming an expected code
 * fails on either of them and no assertion can pass because nothing was raised.
 */
export async function readRejectionCode(
	call: () => Promise<unknown>,
): Promise<ScaffoldErrorCode | undefined> {
	try {
		await call()
		return undefined
	} catch (error) {
		return isScaffoldError(error) ? error.code : undefined
	}
}

/** Every target-relative path the storage mapping decides, beside what it maps to. */
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

/** Every command line the executable accepts, beside the exact command it denotes. */
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

/** Every command line that denotes no command, beside what its refusal must name. */
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

/** Every audit shape the exit-code rule decides, with the verdict it owes. */
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
 * Build the shortest command line that exercises one option against one verb.
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
