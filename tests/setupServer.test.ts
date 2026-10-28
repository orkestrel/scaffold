import { execFileSync, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import {
	chmodSync,
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	renameSync,
	statSync,
} from 'node:fs'
import { createServer } from 'node:http'
import { basename, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { describe, expect, it } from 'vitest'
import { isObject, isString } from '@orkestrel/contract'
import { createTeardown, requireValue } from '@orkestrel/test'
import { createLoopback, createScratch, supportsMode } from '@orkestrel/test/server'
import {
	CONFIG_TEMPLATES,
	contentToHex,
	DISTRIBUTION_TEST_PATH,
	extractVersion,
	MINIMUM_NPM_VERSION,
	ScaffoldError,
	TARGET_SKILL_NAMES,
} from '@src/core'
import { execute, isFile, readVariable, resolveExecutable } from '@orkestrel/process/server'
import { computeDigest, pathToStorage, readHostFloor } from '@src/server'
import packageManifest from '../package.json' with { type: 'json' }
import {
	buildBlueprint,
	buildLazyCase,
	buildMissingCase,
	buildSnapshot,
	buildSparse,
	ENTRY_FILES,
	PLANNED_SETUP_SEED,
	readLazily,
	refuseObject,
} from './setup.js'
import {
	ALIGNED_MANIFEST_TEXT,
	appendSwapLedgerRow,
	AUDIT_EXIT_CASES,
	AUDIT_REPLIES,
	BENCH_SCRIPT,
	BRIEF_SCRIPT,
	buildAlignedManifest,
	buildBoundaryCases,
	buildBrowsersRoot,
	buildCheckoutManifest,
	buildCLIOptions,
	buildCompiledPlan,
	buildDeclaredEntry,
	buildDistributionProof,
	buildEntryWorkspace,
	buildEnvironment,
	buildFleetManifest,
	buildFloorEntry,
	buildFoundFile,
	buildHostManifest,
	buildLiveFiles,
	buildInstalledHostReplies,
	buildInventory,
	buildManifestEntry,
	buildMaterializerOptions,
	buildMissingFile,
	buildOptionArgv,
	buildOrganization,
	buildPackument,
	buildReleaseScenarios,
	buildServerGuardCases,
	buildStagedManifest,
	buildSwapEnvironment,
	buildSwapInvalidNames,
	buildSwapLocalSpecs,
	buildSwapPackument,
	buildSwapRefusals,
	buildSwapRemoteSpecs,
	buildSwapValidNames,
	buildTargetAudit,
	buildTargetManifest,
	buildUpstreamOptions,
	buildVendoredManifest,
	buildVendoredPlan,
	buildVendoredSnapshot,
	buildWhoamiEnvironment,
	buildWorktree,
	captureScaffoldCode,
	captureScaffoldMessage,
	captureScaffoldRejection,
	CASE_FOLDING,
	CATALOG_AGENT_ROWS_TEXT,
	CATALOG_AGENT_TEXT,
	CHECKOUT_GUIDE_PATHS,
	checkFormatting,
	checkTypes,
	CITE_SCRIPT,
	CLAIM_ABSENT,
	CLAIM_DRIVER,
	CLAIM_ELISION,
	CLAIM_EXAMPLE,
	CLAIM_KEYWORDS,
	CLAIM_LINE,
	CLAIM_OPENER,
	CLAIM_PREFIX,
	collectRuntimeClosure,
	COMMAND_CASES,
	commitFiles,
	COMPARE_SCRIPT,
	CORE_GENERATED,
	CORE_GENERATED_COUNT,
	countClaims,
	createCatalogFleet,
	createCheckout,
	createDistributionScratch,
	createFleet,
	createHostRoot,
	createOllamaServer,
	createRepository,
	createSink,
	createStagedHost,
	createSwapRegistry,
	createWaveRecording,
	createWaveSession,
	createSwapSession,
	createUpstreamServer,
	createWhoamiRegistry,
	DECLARATION_CASES,
	DIGEST_CASES,
	DISCOVERY_SCRIPT,
	driveModule,
	ensureTmpRoot,
	executeOllamaHook,
	executeOllamaSetup,
	writeDistributionHarness,
	writeDistributionFixture,
	buildDistributionObservation,
	FILESYSTEM_PATH_CASES,
	findRefusals,
	FLEET_ARTIFACT_COUNT,
	FLEET_BIRTH_COUNT,
	FLEET_BIRTH_PATHS,
	FLEET_MIRROR_REPLIES,
	FLEET_RELEASE_REPLIES,
	FLEET_UPSTREAM_PATHS,
	GIT_PATH_CASES,
	HOST_DIRECTORY_PATHS,
	HOSTILE_ARGUMENT,
	HOSTILE_BYTES,
	installSwapFixture,
	LAUNCH_SCRIPT,
	linkPackage,
	listExecutablePaths,
	locateClaimOpening,
	locatePackage,
	lockManifest,
	LOGIN_SCRIPT,
	MAP_SCRIPT,
	matchesBalance,
	normalizeBashPath,
	NPM_REGISTRY,
	OLLAMA_TOOLS,
	omitDependencies,
	parseClaimVerdict,
	parseOllamaOrigin,
	parseVitestReport,
	PINS_SCRIPT,
	probeManifestLock,
	PROTECTED_PATH_CASES,
	provisionNpm,
	readCheckoutManifest,
	readCheckoutName,
	readCheckoutRanges,
	readInstalledRecord,
	readManifestVersion,
	readNpmFloor,
	readNpmVersion,
	readSpecifiers,
	readStatements,
	readSwapEntry,
	REFUSED_MANIFEST_TEXT,
	RELEASE_MODE,
	renderLauncher,
	renderPackageManifest,
	resolveNpmEntry,
	resolveOllamaShell,
	resolveTool,
	RESULT_SCRIPT,
	RESULT_STREAM,
	runEntry,
	runSkillScript,
	SCRATCH_PREFIX,
	selectManifestEntry,
	selectSeededNames,
	SENSITIVE_PATH_CASES,
	serveFloorEntries,
	SKILL_CANON_FILES,
	spawnNpm,
	spawnSkillScript,
	STAGED_PATHS,
	stageResolver,
	stageRootConfig,
	STORAGE_PATH_CASES,
	supportsMappedLoopback,
	SWAP_RANGE,
	SWAP_SCRIPT,
	SWEEP_HOURS_AGO,
	SWEEP_MINUTES_AGO,
	SWEEP_SCRIPT,
	TARGET_DEV_DEPENDENCIES,
	TARGET_MANIFEST_TEXT,
	TestRegistry,
	trackFiles,
	unlockManifest,
	UPSTREAM_ENDPOINT_CASES,
	UPSTREAM_PATHS,
	USAGE_CASES,
	VENDORED_FILES,
	WAVE_SCRIPT,
	WAVE_STEPS,
	WINDOW_SCRIPT,
	WORKSPACE_ROOT,
	writeSwapFixture,
	writeSwapPackage,
	writeSwapSource,
} from './setupServer.js'

describe('createDistributionScratch', () => {
	it('isolates consumer imports from packages installed only in the checkout', async () => {
		// A fresh clone has no ignored `tmp/` until something writes it.
		mkdirSync(join(WORKSPACE_ROOT, 'tmp'), { recursive: true })
		const workspace = createDistributionScratch('distribution-boundary-')
		const control = createScratch({
			parent: join(WORKSPACE_ROOT, 'tmp'),
			prefix: 'distribution-control-',
		})
		try {
			workspace.write('consumer/check.ts', "import '@orkestrel/contract'\n")
			control.write('consumer/check.ts', "import '@orkestrel/contract'\n")
			const isolated = await execute(
				{ file: process.execPath, arguments: ['consumer/check.ts'] },
				{ workspace: workspace.path, strict: false },
			)
			const leaked = await execute(
				{ file: process.execPath, arguments: ['consumer/check.ts'] },
				{ workspace: control.path, strict: false },
			)
			expect(leaked).toMatchObject({ code: 0 })
			expect(isolated).toMatchObject({ code: 1 })
			expect(isolated.stderr).toContain('ERR_MODULE_NOT_FOUND')
			workspace.write('sample.ts', 'export {}\n')
			control.write('sample.ts', 'export {}\n')
			const selected = await execute(
				{ file: 'git', arguments: ['check-ignore', 'sample.ts'] },
				{ workspace: workspace.path, strict: false },
			)
			const ignored = await execute(
				{ file: 'git', arguments: ['check-ignore', 'sample.ts'] },
				{ workspace: control.path, strict: false },
			)
			expect(selected.code).toBe(1)
			expect(ignored.code).toBe(0)
		} finally {
			workspace.destroy()
			control.destroy()
		}
	})
})

// The subject is the Node-only test infrastructure `tests/setupServer.ts` exports.
// Every resource a case opens is released in the same case, and the mirrored suites
// under `tests/src` keep what the compiler, the materializer, the reader, and the
// executable themselves do. A case here fails when a fixture stopped supplying what
// it declares to the suites that consume it.

describe('the workspace anchors', () => {
	it('resolves the repository this suite is running out of, from the module rather than the process', () => {
		expect(existsSync(join(WORKSPACE_ROOT, 'package.json'))).toBe(true)
		expect(existsSync(join(WORKSPACE_ROOT, 'tests', 'setupServer.ts'))).toBe(true)
		const manifest: unknown = JSON.parse(readFileSync(join(WORKSPACE_ROOT, 'package.json'), 'utf8'))
		expect(manifest).toMatchObject({ name: '@orkestrel/scaffold' })
		// The anchor is the root rather than the directory this module sits in, which is
		// the difference a loader reading a repository-relative path depends on.
		expect(existsSync(join(WORKSPACE_ROOT, 'setupServer.ts'))).toBe(false)
	})

	it('allocates every scratch directory this suite owns under its own prefix', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(SCRATCH_PREFIX.includes('/')).toBe(false)
			expect(SCRATCH_PREFIX.includes('\\')).toBe(false)
			expect(basename(workspace.path).startsWith(SCRATCH_PREFIX)).toBe(true)
			expect(existsSync(workspace.path)).toBe(true)
		} finally {
			workspace.destroy()
		}
	})

	it('lists the tracked paths git records executable, and no path it records at another mode', () => {
		const paths = listExecutablePaths()
		expect(paths.length).toBeGreaterThan(0)
		expect([...paths].sort()).toStrictEqual([...paths])
		for (const path of paths) expect(existsSync(join(WORKSPACE_ROOT, path))).toBe(true)
		expect(paths).toContain('scripts/codex.sh')
		// The control: a tracked file git holds at 100644 is outside the answer, so the
		// reading is the mode rather than the tracked set.
		expect(paths).not.toContain('package.json')
	})

	it('reports whether the temporary directories this run allocates resolve a recased name', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write('sample.md', '# Sample\n')
			// Probed on the host the suite is running on rather than assumed from the
			// platform name, which is the whole reason the constant exists.
			expect(workspace.has('SAMPLE.md')).toBe(CASE_FOLDING)
		} finally {
			workspace.destroy()
		}
	})
})

describe('the manifest builders', () => {
	it('digests the destination text every host root writes for an entry', () => {
		const anchor = requireValue(DIGEST_CASES.find((digestCase) => digestCase.content === 'hi\n'))
		// The entry's storage file carries `${destination}\n`, so a published SHA-256 of
		// that exact text is what the default digest owes, measured against the
		// algorithm rather than against a second copy of it.
		expect(buildManifestEntry({ destination: 'hi' }).digest).toBe(anchor.digest)
		expect(buildManifestEntry()).toStrictEqual({
			storage: 'AGENTS.md',
			destination: 'AGENTS.md',
			executable: false,
			digest: buildManifestEntry({ destination: 'AGENTS.md' }).digest,
		})
		expect(buildManifestEntry({ digest: anchor.digest }).digest).toBe(anchor.digest)
		expect(buildManifestEntry({ executable: true }).executable).toBe(true)
	})

	it('builds the host rows and the floor entries a lazy reader is run over', () => {
		const manifest = buildStagedManifest()

		expect(buildFoundFile()).toStrictEqual({
			path: 'scripts/codex.sh',
			lookup: 'found',
			hex: contentToHex('live script\n'),
		})
		expect(buildFoundFile('AGENTS.md', 'text\n')).toStrictEqual({
			path: 'AGENTS.md',
			lookup: 'found',
			hex: contentToHex('text\n'),
		})
		expect(buildLiveFiles('one\n', 'two\n')).toStrictEqual([
			buildFoundFile('scripts/codex.sh', 'one\n'),
			buildFoundFile('scripts/codex.sh', 'two\n'),
		])
		expect(buildLiveFiles()).toStrictEqual([])
		expect(buildMissingFile()).toStrictEqual({
			path: 'scripts/codex.sh',
			lookup: 'missing',
			note: 'none',
		})
		expect(buildDeclaredEntry()).toStrictEqual(
			buildManifestEntry({ storage: 'scripts/codex.sh', destination: 'scripts/codex.sh' }),
		)
		expect(buildDeclaredEntry('guides/guide.md').storage).toBe('guides/guide.md')
		expect(selectManifestEntry(manifest, '.claude/rules/names.md').storage).toBe(
			'claude/rules/names.md',
		)
		expect(() => selectManifestEntry(manifest, 'absent.md')).toThrow('Value is required')
		expect(buildFloorEntry()).toStrictEqual(manifest.entries[0])
		expect(buildFloorEntry()).not.toBe(buildFloorEntry())
		// A floor that carries no bytes leaves the inventory as the only path the repository answers.
		expect(Object.keys(serveFloorEntries([buildFloorEntry()]))).toStrictEqual([
			UPSTREAM_PATHS.vendored.inventory,
		])
	})

	it('digests the membership of the guard and staged fixtures', () => {
		expect(buildHostManifest({ entries: [], roots: [] }).digest).not.toBe(
			buildHostManifest().digest,
		)
		expect(buildStagedManifest({ roots: [] }).digest).not.toBe(buildStagedManifest().digest)
		expect(buildStagedManifest()).toStrictEqual(buildStagedManifest())
		expect(buildStagedManifest().roots).toStrictEqual(['.claude', '.claude/rules'])
	})

	it('gives the vendored membership every shape a writer meets', () => {
		const manifest = buildVendoredManifest()
		const destinations = manifest.entries.map((entry) => entry.destination)
		expect(destinations).toContain('AGENTS.md')
		expect(destinations).toContain('.claude/rules/names.md')
		expect(destinations).toContain('guides/guide.md')
		expect(destinations).toContain('scripts/codex.sh')
		expect(new Set(destinations).size).toBe(destinations.length)
		// `.claude/skills` is the one declared root no entry sits beneath, which is the
		// empty-directory case a writer has to survive.
		expect(manifest.roots).toContain('.claude/skills')
		for (const root of manifest.roots) {
			expect(destinations.some((destination) => destination === `${root}/sample.md`)).toBe(false)
		}
		expect(
			manifest.entries.filter((entry) => entry.executable).map((entry) => entry.destination),
		).toStrictEqual(['scripts/codex.sh'])
		expect(buildVendoredManifest({ roots: [] }).digest).not.toBe(manifest.digest)
	})

	it('declares the script root and planned file membership in the fleet manifest', () => {
		const manifest = buildFleetManifest()
		expect(manifest.roots).toStrictEqual(['scripts', 'guides'])
		const destinations = manifest.entries.map((entry) => entry.destination)
		expect(new Set(destinations).size).toBe(destinations.length)
		for (const destination of destinations) {
			expect(
				STAGED_PATHS.includes(destination) ||
					HOST_DIRECTORY_PATHS.some((root) => destination.startsWith(`${root}/`)),
			).toBe(true)
		}
		// The catalog agent is the one canon destination a host declares, and a host
		// missing it refuses every verb the moment a plan is hydrated.
		expect(destinations).toContain('.claude/agents/orkestrel.md')
		expect(destinations).toContain('LICENSE')
		expect(destinations).toContain('guides/router.md')
		expect(destinations).toContain('guides/supervisor.md')
		// The skill canon a pointer set hydrates from is declared at the digest of the
		// text the host root stores, so a value host read from it verifies.
		for (const [destination, text] of Object.entries(SKILL_CANON_FILES)) {
			expect(manifest.entries.find((entry) => entry.destination === destination)?.digest).toBe(
				computeDigest(text),
			)
		}
	})

	it('holds the three skill canon files of every package-facing skill and no other', () => {
		expect(Object.keys(SKILL_CANON_FILES)).toHaveLength(TARGET_SKILL_NAMES.length * 3)
		expect(SKILL_CANON_FILES['.agents/skills/orkestrel-dispatch/SKILL.md']).toBeUndefined()
		for (const name of TARGET_SKILL_NAMES) {
			const canonical = requireValue(SKILL_CANON_FILES[`.agents/skills/${name}/SKILL.md`])
			const bridge = requireValue(SKILL_CANON_FILES[`.claude/skills/${name}/SKILL.md`])
			const sidecar = requireValue(SKILL_CANON_FILES[`.agents/skills/${name}/agents/openai.yaml`])
			expect(canonical.startsWith(`---\nname: ${name}\ndescription: `)).toBe(true)
			expect(canonical.split('\n').indexOf('---', 1)).toBe(3)
			expect(canonical).toMatch(/\. Use /u)
			expect(bridge.slice(0, bridge.indexOf('\n---\n'))).toBe(
				canonical.slice(0, canonical.indexOf('\n---\n')),
			)
			expect(bridge).toContain(`\`.agents/skills/${name}/SKILL.md\``)
			expect(sidecar.split('\n')).toStrictEqual([
				'interface:',
				`  display_name: '${name}'`,
				`  short_description: 'Runs the ${name} fixture workflow'`,
				`  default_prompt: 'Use $${name} to run the fixture workflow.'`,
				'',
			])
		}
	})

	// The directory also holds skills this checkout keeps for itself, which the registered list
	// does not name, so the listing is read for the registered names alone.
	it('finds a skill directory in the checkout for every registered skill name', () => {
		const listed = readdirSync(join(WORKSPACE_ROOT, '.agents', 'skills'))

		expect(listed.filter((name) => TARGET_SKILL_NAMES.includes(name)).toSorted()).toStrictEqual(
			TARGET_SKILL_NAMES.toSorted(),
		)
	})
})

describe('the real host and checkout fixtures', () => {
	it('writes one storage file per entry and the manifest beside them', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const manifest = buildVendoredManifest()
			const root = createHostRoot(workspace, 'host', manifest)
			expect(root).toBe(join(workspace.path, 'host'))
			for (const entry of manifest.entries) {
				expect(workspace.read(`host/${entry.storage}`)).toBe(`${entry.destination}\n`)
			}
			const written: unknown = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8'))
			expect(written).toStrictEqual(manifest)
		} finally {
			workspace.destroy()
		}
	})

	it('writes the skill canon text in place of the destination at every skill storage path', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			createHostRoot(workspace, 'host', buildFleetManifest())
			for (const [destination, text] of Object.entries(SKILL_CANON_FILES)) {
				expect(workspace.read(`host/${pathToStorage(destination)}`)).toBe(text)
			}
			// The control: a destination outside the skill canon still carries its own path.
			expect(workspace.read('host/LICENSE')).toBe('LICENSE\n')
		} finally {
			workspace.destroy()
		}
	})

	it('stages the vendored bytes of this checkout into a scratch host', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const root = createStagedHost(workspace)
			expect(existsSync(join(root, 'manifest.json'))).toBe(true)
			// The bytes are this checkout's rather than a synthetic fixture's, which is
			// what makes the staged host answer a command-line regression.
			expect(readFileSync(join(root, 'AGENTS.md'), 'utf8')).toBe(
				readFileSync(join(WORKSPACE_ROOT, 'AGENTS.md'), 'utf8'),
			)
		} finally {
			workspace.destroy()
		}
	}, 10_000)

	it('writes every staged path into a checkout and declares exactly it in the manifest', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const root = createCheckout(workspace, 'checkout')
			expect(root).toBe(join(workspace.path, 'checkout'))
			for (const path of STAGED_PATHS) expect(workspace.has(`checkout/${path}`)).toBe(true)
			expect(workspace.read('checkout/AGENTS.md')).toBe('AGENTS.md\n')
			expect(workspace.read('checkout/.claude/rules/sample.md')).toBe('.claude/rules/sample.md\n')
			// The one root left genuinely empty, because a file inventory cannot see it and
			// the manifest is what declares it.
			expect(workspace.names('checkout/.claude/skills')).toStrictEqual([])
			const manifest = buildCheckoutManifest()
			expect(manifest.roots).toStrictEqual([...HOST_DIRECTORY_PATHS].sort())
			const storages = manifest.entries.map((entry) => entry.storage)
			expect([...storages].sort()).toStrictEqual([...storages])
			expect(new Set(storages).size).toBe(storages.length)
			for (const entry of manifest.entries) {
				expect(workspace.read(`checkout/${entry.destination}`)).toBe(
					entry.destination === '.claude/agents/orkestrel.md'
						? CATALOG_AGENT_ROWS_TEXT
						: `${entry.destination}\n`,
				)
			}
			for (const path of CHECKOUT_GUIDE_PATHS) expect(workspace.has(`checkout/${path}`)).toBe(true)
			expect(manifest.entries.some((entry) => entry.executable)).toBe(true)
			expect(
				manifest.entries.filter((entry) => entry.executable).map((entry) => entry.destination),
			).toStrictEqual(['scripts/codex.sh'])
		} finally {
			workspace.destroy()
		}
	})

	it('leaves the fleet target holding its manifest and its source axis and nothing else', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			expect(fleet.host).toBe(join(workspace.path, 'host'))
			expect(fleet.target).toBe(join(workspace.path, 'target'))
			expect(workspace.read('target/package.json')).toBe(TARGET_MANIFEST_TEXT)
			expect(workspace.names('target')).toStrictEqual(['package.json', 'src'])
			expect(workspace.names('target/src')).toStrictEqual(['core'])
			// Every vendored path is missing, so a first audit of the target has something
			// to find.
			expect(workspace.has('target/AGENTS.md')).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('gives the catalog target the marked region the writer replaces rather than invents', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			createCatalogFleet(workspace)
			expect(workspace.read('target/.claude/agents/orkestrel.md')).toBe(CATALOG_AGENT_TEXT)
			expect(workspace.read('target/package.json')).toBe(TARGET_MANIFEST_TEXT)
		} finally {
			workspace.destroy()
		}
	})

	it('initializes a real repository, stages its files, and commits them', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('repository')
			createRepository(target)
			expect(existsSync(join(target, '.git'))).toBe(true)
			workspace.write('repository/AGENTS.md', '# Agents\n')
			// Read back through git itself rather than through the fixture, so the answer
			// is git's own and a fabricated inventory could not produce it.
			expect(
				execFileSync('git', ['status', '--porcelain'], { cwd: target, encoding: 'utf8' }),
			).toContain('?? AGENTS.md')
			trackFiles(target)
			expect(
				execFileSync('git', ['status', '--porcelain'], { cwd: target, encoding: 'utf8' }),
			).toContain('A  AGENTS.md')
			commitFiles(target)
			expect(
				execFileSync('git', ['status', '--porcelain'], { cwd: target, encoding: 'utf8' }),
			).toBe('')
			expect(execFileSync('git', ['log', '--format=%s'], { cwd: target, encoding: 'utf8' })).toBe(
				'The state a run reads\n',
			)
		} finally {
			workspace.destroy()
		}
	})

	it('records the lines one run writes to each destination, and hands out copies of them', () => {
		const sink = createSink()
		expect(sink.output).toStrictEqual([])
		const write = requireValue(sink.options.output)
		const report = requireValue(sink.options.diagnostic)
		write('first')
		report('a refusal')
		write('second')
		expect(sink.output).toStrictEqual(['first', 'second'])
		expect(sink.diagnostic).toStrictEqual(['a refusal'])
		// A copy per read, so a caller holding an earlier list cannot rewrite what the
		// next assertion sees.
		expect(sink.output).not.toBe(sink.output)
	})
})

describe('the option builders', () => {
	it('replaces only the named fields on the worktree and materializer builders', () => {
		expect(buildWorktree()).toStrictEqual({
			tracked: ['AGENTS.md', 'guides/router.md'],
			dirty: [],
		})
		expect(buildWorktree({ dirty: ['AGENTS.md'] })).toStrictEqual({
			tracked: ['AGENTS.md', 'guides/router.md'],
			dirty: ['AGENTS.md'],
		})
		const options = buildMaterializerOptions()
		expect(options.host).toBe('dist/host')
		expect(typeof options.on?.write).toBe('function')
		expect(buildMaterializerOptions({ host: 'elsewhere' }).host).toBe('elsewhere')
	})

	it('replaces an upstream entity whole rather than merging it into the defaults', () => {
		const options = buildUpstreamOptions()
		expect(options.registry?.base).toBe('https://registry.npmjs.org')
		expect(options.repository?.branch).toBe('main')
		expect(options.concurrency).toBe(6)
		expect(typeof options.on?.release).toBe('function')
		// A boundary case replaces one entity to leave every other setting off it, so a
		// merging builder would quietly restore the field the case removed.
		const replaced = buildUpstreamOptions({ repository: { timeout: 1 } })
		expect(replaced.repository).toStrictEqual({ timeout: 1 })
		expect(replaced.registry).toStrictEqual(options.registry)
	})

	it('names every server guard case once, accepting only values that guard admits', () => {
		const cases = buildServerGuardCases()
		const names = cases.map((guardCase) => guardCase.name)
		expect(names.length).toBeGreaterThan(0)
		expect(new Set(names).size).toBe(names.length)
		for (const guardCase of cases) {
			expect(guardCase.accepted.length).toBeGreaterThan(0)
			for (const value of guardCase.accepted) expect(guardCase.guard(value)).toBe(true)
		}
		// The host-path law is measured against a real absolute path this platform
		// produced rather than against a literal written for one host.
		const filesystem = requireValue(
			cases.find((guardCase) => guardCase.name === 'isFilesystemPath'),
		)
		expect(filesystem.accepted).toContain(WORKSPACE_ROOT)
	})

	it('rebuilds every boundary case fresh, under labels no two cases share, in both verdicts', () => {
		const cases = buildBoundaryCases()
		const labels = cases.map((boundaryCase) => boundaryCase.label)
		expect(labels.length).toBeGreaterThan(0)
		expect(new Set(labels).size).toBe(labels.length)
		expect(cases.some((boundaryCase) => boundaryCase.accepted)).toBe(true)
		expect(cases.some((boundaryCase) => !boundaryCase.accepted)).toBe(true)
		const first = requireValue(buildBoundaryCases()[0])
		const second = requireValue(buildBoundaryCases()[0])
		expect(second.label).toBe(first.label)
		expect(second.value).not.toBe(first.value)
	})
})

describe('the refusal readers', () => {
	it('reports the code and the message of a scaffold refusal, and undefined for every other outcome', () => {
		expect(
			captureScaffoldCode(() => {
				throw new ScaffoldError('INVALID', 'A refused option bag')
			}),
		).toBe('INVALID')
		expect(
			captureScaffoldMessage(() => {
				throw new ScaffoldError('TARGET', 'A missing target')
			}),
		).toBe('A missing target')
		// Both non-refusals answer undefined, so a case naming a code fails on either
		// rather than passing because nothing was raised.
		expect(
			captureScaffoldCode(() => {
				throw new Error('plain')
			}),
		).toBe(undefined)
		expect(
			captureScaffoldMessage(() => {
				throw new Error('plain')
			}),
		).toBe(undefined)
		expect(captureScaffoldCode(() => 'a returned value')).toBe(undefined)
		expect(captureScaffoldMessage(() => 'a returned value')).toBe(undefined)
	})

	it('reports the code of an asynchronous scaffold refusal, and undefined for every other outcome', async () => {
		expect(
			await captureScaffoldRejection(() =>
				Promise.reject(new ScaffoldError('FETCH', 'A refused read')),
			),
		).toBe('FETCH')
		expect(await captureScaffoldRejection(() => Promise.reject(new Error('plain')))).toBe(undefined)
		expect(await captureScaffoldRejection(() => Promise.resolve('a resolved value'))).toBe(
			undefined,
		)
	})
})

describe('the parsed statement reader', () => {
	it('reads the export kind, the bindings, and the source slice of each top-level statement', () => {
		const source = [
			"import { join } from 'node:path'",
			'export type Mode = string',
			'const hidden = 1',
			'export const value: number = hidden',
			'export function build(input: string, count: number): Mode {',
			'\tconst inner = join(input, String(count))',
			'\treturn inner',
			'}',
			'export const factory = (): Mode => value',
			'export default value',
			'',
		].join('\n')

		const statements = readStatements(source, 'module.ts')

		expect(
			statements.map(({ syntax, exported, specifier, declarations }) => ({
				syntax,
				exported,
				specifier,
				declarations,
			})),
		).toStrictEqual([
			{
				syntax: 'ImportDeclaration',
				exported: undefined,
				specifier: 'node:path',
				declarations: [],
			},
			{
				syntax: 'TSTypeAliasDeclaration',
				exported: 'type',
				specifier: undefined,
				declarations: [],
			},
			{
				syntax: 'VariableDeclaration',
				exported: undefined,
				specifier: undefined,
				declarations: [{ name: 'hidden', parameters: [], returns: undefined }],
			},
			{
				syntax: 'VariableDeclaration',
				exported: 'value',
				specifier: undefined,
				declarations: [{ name: 'value', parameters: [], returns: undefined }],
			},
			{
				syntax: 'FunctionDeclaration',
				exported: 'value',
				specifier: undefined,
				declarations: [
					{ name: 'build', parameters: ['input: string', 'count: number'], returns: 'Mode' },
				],
			},
			{
				syntax: 'VariableDeclaration',
				exported: 'value',
				specifier: undefined,
				declarations: [{ name: 'factory', parameters: [], returns: 'Mode' }],
			},
			{
				syntax: 'ExportDefaultDeclaration',
				exported: 'value',
				specifier: undefined,
				declarations: [],
			},
		])
		// The slice is the statement's own extent, so a lift writing it into another
		// module carries the export keyword and the whole body across with it.
		const build = statements.find((statement) =>
			statement.declarations.some(({ name }) => name === 'build'),
		)
		expect(build?.text).toBe(
			'export function build(input: string, count: number): Mode {\n\tconst inner = join(input, String(count))\n\treturn inner\n}',
		)
		expect(build?.body.map(({ syntax, declarations }) => ({ syntax, declarations }))).toStrictEqual(
			[
				{
					syntax: 'VariableDeclaration',
					declarations: [{ name: 'inner', parameters: [], returns: undefined }],
				},
				{ syntax: 'ReturnStatement', declarations: [] },
			],
		)
		// Every statement carrying a body is the function declaration it was read
		// from, so a caller reading one is reading a function's own statements
		// rather than whatever the projection reached last.
		expect(
			statements.filter(({ body }) => body.length > 0).map(({ syntax }) => syntax),
		).toStrictEqual(['FunctionDeclaration'])
	})

	it('refuses a source the parser reports an error for', () => {
		expect(() => readStatements('export const = 1\n', 'broken.ts')).toThrow(
			'The parser refused broken.ts',
		)
		expect(readStatements('export const value = 1\n', 'broken.ts')).toHaveLength(1)
	})

	it('slices by code unit, so a non-ASCII character before the declaration moves nothing', () => {
		const source =
			'// an em dash — and a curly quote ’ before it\nexport const factory = (mode: Mode): UserConfig => value\n'
		// The fixture carries an em dash and a curly quote, each wider than one code
		// unit in UTF-8, so this assertion fails if either is later stripped and the
		// case would otherwise pass on an all-ASCII source that proves nothing.
		expect(new TextEncoder().encode(source).length).toBeGreaterThan(source.length)
		const [statement] = readStatements(source, 'proof.ts')
		expect(statement?.text).toBe('export const factory = (mode: Mode): UserConfig => value')
		expect(statement?.declarations).toStrictEqual([
			{ name: 'factory', parameters: ['mode: Mode'], returns: 'UserConfig' },
		])
	})

	it('reads a wrapped declaration an anchored signature pattern reports nothing for', () => {
		// The vendored formatter breaks a signature that passes the print width across
		// lines. A pattern written for the printed spelling goes blind on the wrapped
		// one and reports an empty finding, which reads exactly like a clean source.
		const signature = /^export function (?<name>\w+)\([^)\n]*\): (?<returns>\w+) \{$/mu
		const printed =
			'export function resolveWorkspacePath(relativePath: string): string {\n\treturn relativePath\n}\n'
		const wrapped =
			'export function resolveWorkspacePath(\n\trelativePath: string,\n\tbase: string,\n): string {\n\treturn relativePath\n}\n'

		expect(signature.exec(printed)?.groups?.name).toBe('resolveWorkspacePath')
		expect(signature.exec(printed)?.groups?.returns).toBe('string')
		expect(signature.exec(wrapped)).toBe(null)
		expect(readStatements(printed, 'vite.config.ts')[0]?.declarations).toStrictEqual([
			{ name: 'resolveWorkspacePath', parameters: ['relativePath: string'], returns: 'string' },
		])
		expect(readStatements(wrapped, 'vite.config.ts')[0]?.declarations).toStrictEqual([
			{
				name: 'resolveWorkspacePath',
				parameters: ['relativePath: string', 'base: string'],
				returns: 'string',
			},
		])
	})
})

describe('the parsed specifier reader', () => {
	it('reads the module every import form names, in source order, and nothing a declaration names', () => {
		const source = [
			"import type { Plugin } from 'vite'",
			"import { join } from 'node:path'",
			"export { findDrift } from '@orkestrel/guide'",
			"export * from './local.js'",
			'export const value = 1',
			'export { value as held }',
			"const loaded = await import('@orkestrel/console')",
			'const templated = await import(`@orkestrel/test/server`)',
			"const required = require('@orkestrel/process')",
			'void loaded',
			'void templated',
			'void required',
			'',
		].join('\n')

		// A type-only import, a named re-export, and a star re-export each name a
		// module that must resolve, so each reports. A local declaration and a local
		// export list name no module and report nothing.
		expect(readSpecifiers(source, 'module.ts')).toStrictEqual([
			'vite',
			'node:path',
			'@orkestrel/guide',
			'./local.js',
			'@orkestrel/console',
			'@orkestrel/test/server',
			'@orkestrel/process',
		])
	})

	it('reports nothing for a specifier a string literal or a comment carries', () => {
		// The rival reading this must exclude. A text pattern reports on text, so it
		// matches a specifier a fixture quotes and a comment names, and reports two
		// imports a module that imports nothing makes.
		const pattern = /\b(?:from|import|require)\s*\(?\s*(['"`])(@orkestrel\/[^'"`]+)\1/gu
		const source = [
			'const fixture = \'import { render } from "@orkestrel/console"\'',
			"// import { render } from '@orkestrel/console'",
			'void fixture',
			'',
		].join('\n')

		expect([...source.matchAll(pattern)].map((match) => match[2])).toStrictEqual([
			'@orkestrel/console',
			'@orkestrel/console',
		])
		expect(readSpecifiers(source, 'quoted.ts')).toStrictEqual([])
	})

	it('reports undefined for an import whose argument resolves to no literal string', () => {
		// An argument assembled at runtime names no module a caller can rule on, and
		// an entry is what tells a caller the import is there to rule on at all.
		expect(readSpecifiers('await import(`@orkestrel/${part}`)\n', 'expression.ts')).toStrictEqual([
			undefined,
		])
		expect(readSpecifiers('await import(held)\n', 'binding.ts')).toStrictEqual([undefined])
		expect(readSpecifiers('const held = require(name)\nvoid held\n', 'call.cts')).toStrictEqual([
			undefined,
		])
	})

	it('omits member-expression calls from the specifier reading', () => {
		expect(readSpecifiers("require.resolve('pkg')\n", 'member.cts')).toStrictEqual([])
		expect(readSpecifiers("import.meta.resolve('pkg')\n", 'member.mts')).toStrictEqual([])
		expect(readSpecifiers("require('pkg')\n", 'direct.cts')).toStrictEqual(['pkg'])
	})

	it('refuses a source the parser reports an error for', () => {
		expect(() => readSpecifiers('import { join } from\n', 'broken.ts')).toThrow(
			'The parser refused broken.ts',
		)
		expect(readSpecifiers("import { join } from 'node:path'\n", 'broken.ts')).toStrictEqual([
			'node:path',
		])
	})
})

describe('the target fixtures', () => {
	it('reads the bytes at each path and marks stale exactly the paths the caller names', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('target')
			workspace.write('target/AGENTS.md', '# Agents\n')
			workspace.write('target/LICENSE', 'MIT\n')
			const audit = buildTargetAudit(target, ['AGENTS.md', 'LICENSE', 'CLAUDE.md'], ['LICENSE'])
			expect(audit.questions).toStrictEqual([])
			const aligned = requireValue(audit.findings.find((finding) => finding.path === 'AGENTS.md'))
			expect(aligned.drift).toBe('aligned')
			// The observed bytes are a real read of the file the case wrote, so a snapshot
			// of the same text taken elsewhere agrees with them.
			expect(aligned).toMatchObject({ observed: requireValue(buildSnapshot()['AGENTS.md']) })
			const stale = requireValue(audit.findings.find((finding) => finding.path === 'LICENSE'))
			expect(stale.drift).toBe('stale')
			expect('observed' in stale).toBe(true)
			const missing = requireValue(audit.findings.find((finding) => finding.path === 'CLAUDE.md'))
			expect(missing.drift).toBe('missing')
			expect('observed' in missing).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a hole in the paths as a path off contract', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('target')
			workspace.write('target/AGENTS.md', '# Agents\n')
			const paths = buildSparse(2, new Map([[1, 'AGENTS.md']]))

			expect(captureScaffoldCode(() => buildTargetAudit(target, paths, []))).toBe('INVALID')
		} finally {
			workspace.destroy()
		}
	})

	it('replaces only the named sections of a target manifest', () => {
		expect(JSON.parse(buildTargetManifest())).toMatchObject({
			name: '@orkestrel/sample',
			description: 'A sample workspace.',
			dependencies: { '@orkestrel/emitter': '^0.0.5', vite: '~8.2.0' },
			devDependencies: TARGET_DEV_DEPENDENCIES,
		})
		expect(buildTargetManifest().endsWith('}\n')).toBe(true)
		expect(JSON.parse(buildTargetManifest(undefined, { vite: '~8.2.0' }))).toMatchObject({
			dependencies: { vite: '~8.2.0' },
			devDependencies: TARGET_DEV_DEPENDENCIES,
		})
	})

	it('copies a dependency section without the names the caller omits, and leaves the original alone', () => {
		const section = { '@orkestrel/emitter': '^0.0.5', vite: '~8.2.0' }
		expect(omitDependencies(section, ['vite'])).toStrictEqual({ '@orkestrel/emitter': '^0.0.5' })
		expect(omitDependencies(section, [])).toStrictEqual(section)
		expect(omitDependencies(section, [])).not.toBe(section)
		expect(section).toStrictEqual({ '@orkestrel/emitter': '^0.0.5', vite: '~8.2.0' })
	})

	it('declares the extra package a target carries and the one name the compile gate refuses', () => {
		expect(JSON.parse(TARGET_MANIFEST_TEXT)).toMatchObject({
			name: '@orkestrel/sample',
			dependencies: { '@orkestrel/emitter': '^0.0.5' },
			devDependencies: { '@orkestrel/guide': '^0.0.9' },
		})
		// A published package name is lowercase, and the capital is the whole defect.
		expect(JSON.parse(REFUSED_MANIFEST_TEXT)).toMatchObject({ name: '@orkestrel/Sample' })
	})

	it('surrounds the catalog region with the marker pair, empty in one fixture and filled in the other', () => {
		expect(CATALOG_AGENT_TEXT).toContain('<!-- orkestrel:catalog -->')
		expect(CATALOG_AGENT_TEXT).toContain('<!-- /orkestrel:catalog -->')
		expect(CATALOG_AGENT_TEXT).toContain('Prose a consumer wrote above the table.')
		expect(CATALOG_AGENT_TEXT).toContain('Prose a consumer wrote below the table.')
		expect(CATALOG_AGENT_TEXT).not.toContain('@orkestrel/contract')
		expect(CATALOG_AGENT_ROWS_TEXT).toContain('| @orkestrel/contract | 0.0.9 |')
		// The row naming something that is not a published package is what a reading of
		// every first cell reports and a reading of package names does not.
		expect(CATALOG_AGENT_ROWS_TEXT).toContain('| not a package | 0.0.1 |')
	})
})

describe('the upstream fixtures', () => {
	it('serves the abbreviated packument fields the registry serves, and omits an edge set it was not given', () => {
		expect(
			JSON.parse(
				buildPackument('0.0.8', {
					dependencies: { '@orkestrel/emitter': '^0.0.5' },
					development: { vite: '~8.2.0' },
				}),
			),
		).toStrictEqual({
			'dist-tags': { latest: '0.0.8' },
			name: '@orkestrel/sample',
			versions: {
				'0.0.8': {
					name: '@orkestrel/sample',
					version: '0.0.8',
					dependencies: { '@orkestrel/emitter': '^0.0.5' },
					devDependencies: { vite: '~8.2.0' },
				},
			},
		})
		expect(JSON.parse(buildPackument('0.0.8'))).toStrictEqual({
			'dist-tags': { latest: '0.0.8' },
			name: '@orkestrel/sample',
			versions: { '0.0.8': { name: '@orkestrel/sample', version: '0.0.8' } },
		})
	})

	it('refuses to publish an unnamed version', () => {
		expect(() => buildPackument('')).toThrow(
			'A packument publishes at least one version, and every version is named',
		)
	})

	it('lists every organization package under the access map the registry serves', () => {
		expect(
			JSON.parse(buildOrganization(['@orkestrel/router', '@orkestrel/emitter'])),
		).toStrictEqual({ '@orkestrel/router': 'read-write', '@orkestrel/emitter': 'read-write' })
		expect(JSON.parse(buildOrganization([]))).toStrictEqual({})
	})

	it('declares one inventory entry per vendored file, in the caller order its digest authenticates', () => {
		const files = [VENDORED_FILES.agents, VENDORED_FILES.orchestration]
		expect(JSON.parse(buildInventory(files))).toMatchObject({
			entries: [
				{ storage: 'AGENTS.md', destination: 'AGENTS.md', executable: false },
				{
					storage: 'agents/orchestration.md',
					destination: '.agents/orchestration.md',
					executable: false,
				},
			],
			roots: [],
		})
		// The order is the caller's rather than sorted, and the membership digest
		// authenticates it, so a reversed list is a different inventory.
		expect(buildInventory([...files].reverse())).not.toBe(buildInventory(files))
	})

	it('keys the vendored snapshot to the same paths, with the bytes each file carries', () => {
		expect(buildVendoredSnapshot([VENDORED_FILES.agents])).toStrictEqual(buildSnapshot())
		expect(
			Object.keys(buildVendoredSnapshot([VENDORED_FILES.license, VENDORED_FILES.mirror])),
		).toStrictEqual(['LICENSE', 'guides/guide.md'])
	})

	it('answers the supplied inventory and every host-owned path, and leaves a deferred path absent', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const replies = buildInstalledHostReplies(readHostFloor(createStagedHost(workspace)))
			const inventory = requireValue(replies[UPSTREAM_PATHS.vendored.inventory])
			expect(inventory.status).toBe(200)
			expect(typeof inventory.body).toBe('string')
			const agents = requireValue(replies[UPSTREAM_PATHS.vendored.agents])
			expect(agents.status).toBe(200)
			expect(agents.type).toBe('text/plain')
			for (const path of Object.keys(replies)) {
				expect(path.startsWith('/orkestrel/scaffold/refs/heads/main/')).toBe(true)
			}
			// The catalog and guide surfaces own their own bytes, so the repository serves
			// neither however the floor declares them.
			expect(replies['/orkestrel/scaffold/refs/heads/main/.claude/agents/orkestrel.md']).toBe(
				undefined,
			)
			expect(replies[UPSTREAM_PATHS.vendored.mirror]).toBe(undefined)
			// The floor is the parameter rather than a fixed read: a floor carrying no bytes
			// leaves the inventory as the only path the repository answers.
			expect(
				Object.keys(buildInstalledHostReplies({ manifest: buildStagedManifest(), bytes: {} })),
			).toStrictEqual([UPSTREAM_PATHS.vendored.inventory])
		} finally {
			workspace.destroy()
		}
	}, 10_000)

	// The manifest is serialized first, which reads each entry once, and the loop then reads each entry
	// once more, so a hole or a refusal fails the loop after the serialization has read the list.
	it('reads the floor entries as the serialization and the loop did, and refuses what they refuse', () => {
		const lazy = buildLazyCase('the entries a floor serves', (shape) =>
			readLazily(shape, buildFloorEntry, serveFloorEntries, refuseObject(buildFloorEntry)),
		)
		const missing = buildMissingCase(
			'the entries a floor serves',
			buildFloorEntry,
			serveFloorEntries,
			[0, 1],
		)

		expect(lazy.read('hole-before-entry')).toStrictEqual({ outcome: 'TypeError', reads: [1] })
		expect(lazy.read('hole-before-refusal')).toStrictEqual({ outcome: 'RangeError', reads: [1] })
		expect(lazy.read('refusal-before-entry')).toStrictEqual({ outcome: 'TypeError', reads: [0] })
		expect(lazy.read('dense-pair')).toStrictEqual({ outcome: 'return', reads: [0, 1, 0, 1] })
		expect(missing.read()).toStrictEqual({ outcome: 'TypeError', reads: [0, 1] })
	})

	it('refuses a list of paths without an iterator before it reads a path', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('target')
			workspace.write('target/AGENTS.md', '# Agents\n')
			const missing = buildMissingCase(
				'the paths an audit lists',
				() => 'AGENTS.md',
				(paths) => buildTargetAudit(target, paths, []),
			)

			expect(missing.read()).toStrictEqual({ outcome: 'TypeError', reads: [] })
		} finally {
			workspace.destroy()
		}
	})

	it('answers a listed path with its scripted status, body, headers, and declared length', async () => {
		const packument = buildPackument('0.0.8')
		const server = await createUpstreamServer({
			'/packument': { status: 200, body: packument },
			'/moved': { status: 302, body: '', location: '/packument', type: 'text/plain' },
		})
		try {
			const answered = await fetch(`${server.base}/packument`)
			expect(answered.status).toBe(200)
			expect(answered.headers.get('content-type')).toBe('application/json')
			expect(answered.headers.get('content-length')).toBe(
				String(Buffer.byteLength(packument, 'utf8')),
			)
			expect(await answered.text()).toBe(packument)
			const moved = await fetch(`${server.base}/moved`, { redirect: 'manual' })
			expect(moved.status).toBe(302)
			expect(moved.headers.get('location')).toBe('/packument')
			expect(moved.headers.get('content-type')).toBe('text/plain')
			expect(await moved.text()).toBe('')
			expect(server.paths).toStrictEqual(['/packument', '/moved'])
		} finally {
			await server.destroy()
		}
	})

	it('encodes a reply the script asks for and declares no length on a chunked one', async () => {
		const server = await createUpstreamServer({
			'/gzip': { status: 200, body: '# Agents\n', type: 'text/plain', encoding: 'gzip' },
			'/chunked': { status: 200, body: '# Agents\n', type: 'text/plain', chunked: true },
		})
		try {
			const compressed = await fetch(`${server.base}/gzip`)
			expect(compressed.headers.get('content-encoding')).toBe('gzip')
			// The declared length is the encoded wire body's, so the fixture never states a
			// length it did not send.
			expect(compressed.headers.get('content-length')).not.toBe(
				String(Buffer.byteLength('# Agents\n', 'utf8')),
			)
			expect(await compressed.text()).toBe('# Agents\n')
			const chunked = await fetch(`${server.base}/chunked`)
			expect(chunked.headers.get('content-length')).toBe(null)
			expect(chunked.headers.get('transfer-encoding')).toBe('chunked')
			expect(await chunked.text()).toBe('# Agents\n')
		} finally {
			await server.destroy()
		}
	})

	it('answers a path the script does not list with a refusal rather than a silent pass', async () => {
		const server = await createUpstreamServer({ '/listed': { status: 200, body: '{}' } })
		try {
			const response = await fetch(`${server.base}/unlisted`)
			expect(response.status).toBe(404)
			expect(await response.text()).toBe('{"error":"Not found"}')
			expect(server.paths).toStrictEqual(['/unlisted'])
			// A path the script does not carry has no arrival to wait for, so this
			// resolves rather than hanging the case that asks for it.
			await server.arrival('/unlisted')
		} finally {
			await server.destroy()
		}
	})

	it('records the accept header each request carried, in arrival order', async () => {
		const server = await createUpstreamServer({
			'/first': { status: 200, body: '{}' },
			'/second': { status: 200, body: '{}' },
		})
		try {
			const negotiated = await fetch(`${server.base}/first`, {
				headers: { accept: 'application/vnd.npm.install-v1+json' },
			})
			await negotiated.text()
			await (await fetch(`${server.base}/second`)).text()
			expect(server.paths).toStrictEqual(['/first', '/second'])
			expect(server.accepts).toStrictEqual(['application/vnd.npm.install-v1+json', '*/*'])
			// A copy per read, so a caller holding an earlier list cannot rewrite what the next read sees.
			expect(server.paths).not.toBe(server.paths)
			expect(server.accepts).not.toBe(server.accepts)
		} finally {
			await server.destroy()
		}
	})

	it('holds a listed path open until the caller abandons it, and reports its arrival', async () => {
		const server = await createUpstreamServer({ '/held': { status: 200, body: '{}', held: true } })
		const controller = new AbortController()
		try {
			const pending = fetch(`${server.base}/held`, { signal: controller.signal }).then(
				() => 'answered',
				() => 'refused',
			)
			// Deterministic without a clock: the fixture accepts the request and never
			// answers it, so the arrival is the happens-before edge a cancellation needs.
			await server.arrival('/held')
			expect(server.paths).toStrictEqual(['/held'])
			controller.abort()
			expect(await pending).toBe('refused')
		} finally {
			await server.destroy()
		}
	})

	it('reports the most requests it ever held open at once', async () => {
		const server = await createUpstreamServer({
			'/first': { status: 200, body: '{}', held: true },
			'/second': { status: 200, body: '{}', held: true },
		})
		const controller = new AbortController()
		try {
			const first = fetch(`${server.base}/first`, { signal: controller.signal }).then(
				() => 'answered',
				() => 'refused',
			)
			const second = fetch(`${server.base}/second`, { signal: controller.signal }).then(
				() => 'answered',
				() => 'refused',
			)
			await server.arrival('/first')
			await server.arrival('/second')
			expect(server.peak).toBe(2)
			controller.abort()
			expect(await first).toBe('refused')
			expect(await second).toBe('refused')
		} finally {
			await server.destroy()
		}
	})

	it('drops the connection it is holding open when the suite destroys it', async () => {
		const server = await createUpstreamServer({
			'/listed': { status: 200, body: '{}' },
			'/held': { status: 200, body: '{}', held: true },
		})
		try {
			const answered = await fetch(`${server.base}/listed`)
			expect(answered.status).toBe(200)
			await answered.text()
			const pending = fetch(`${server.base}/held`).then(
				() => 'answered',
				() => 'refused',
			)
			await server.arrival('/held')
			await server.destroy()
			// The held request is the one a suite would otherwise leak, so destroy is what
			// releases it rather than the caller abandoning it.
			expect(await pending).toBe('refused')
			expect(
				await fetch(`${server.base}/listed`).then(
					() => 'answered',
					() => 'refused',
				),
			).toBe('refused')
		} finally {
			await server.destroy()
		}
	})

	it('points both endpoints at one loopback base and keeps the writers a run reports through', () => {
		const sink = createSink()
		const options = buildCLIOptions(sink, 'http://127.0.0.1:8080')
		expect(options.output).toBe(sink.options.output)
		expect(options.diagnostic).toBe(sink.options.diagnostic)
		expect(options.upstream).toStrictEqual({
			registry: { base: 'http://127.0.0.1:8080' },
			repository: { base: 'http://127.0.0.1:8080' },
		})
	})

	it('builds the shortest command line that carries one option against one verb', () => {
		expect(buildOptionArgv('audit', '--json')).toStrictEqual(['audit', '--json'])
		expect(buildOptionArgv('audit', '--target <path>')).toStrictEqual([
			'audit',
			'--target',
			'sample',
		])
		// `new` is the one verb taking an argument, so its line carries the name the
		// reader would otherwise refuse the command for.
		expect(buildOptionArgv('new', '--target <path>')).toStrictEqual([
			'new',
			'widget',
			'--target',
			'sample',
		])
	})
})

describe('the release-mode fixtures', () => {
	it('parses every test file a Vitest report records, and refuses a text that is not a report', () => {
		const report = JSON.stringify({
			testResults: [
				{
					name: '/workspace/tests/distribution.test.ts',
					status: 'failed',
					message: 'The release gate requires a reachable npm registry',
					assertionResults: [],
				},
				{
					name: '/workspace/tests/setupBrowser.test.ts',
					status: 'passed',
					message: '',
					assertionResults: [
						{ title: 'renders the component', status: 'passed', duration: 12 },
						{ title: 'waits for a browser', status: 'skipped' },
						'not a case record',
					],
				},
			],
		})
		expect(parseVitestReport(report)).toStrictEqual([
			{
				name: '/workspace/tests/distribution.test.ts',
				status: 'failed',
				message: 'The release gate requires a reachable npm registry',
				cases: [],
			},
			{
				name: '/workspace/tests/setupBrowser.test.ts',
				status: 'passed',
				message: '',
				cases: [
					{ title: 'renders the component', status: 'passed' },
					{ title: 'waits for a browser', status: 'skipped' },
					{ title: undefined, status: undefined },
				],
			},
		])
		expect(parseVitestReport('{"testResults":[]}')).toStrictEqual([])
		// A report missing a structure the reader walks is refused whole, including one whose only
		// defect is a single malformed file entry beside a well-formed one.
		for (const text of [
			'not a report',
			'{}',
			'{"testResults":{}}',
			'{"testResults":[{"assertionResults":[]}]}',
			'{"testResults":[{"name":7,"assertionResults":[]}]}',
			'{"testResults":[{"name":"/workspace/a.test.ts"}]}',
			'{"testResults":[{"name":"/workspace/a.test.ts","assertionResults":[]},"entry"]}',
		]) {
			expect(parseVitestReport(text)).toBeUndefined()
		}
	})

	it('lists the release and ordinary runs, then every rival release run with its own rewrite', () => {
		const release = ['run', 'test:distribution', '--', '--mode', 'release']
		const ordinary = ['run', 'test:distribution', '--']
		expect(
			buildReleaseScenarios(
				release,
				ordinary,
				'export default {}\n',
				"it('proves the artifact', () => {})\n",
			),
		).toStrictEqual([
			{ label: 'release', arguments: release, timeout: 240_000, files: {} },
			{ label: 'ordinary', arguments: ordinary, timeout: 240_000, files: {} },
			{
				label: 'malformed',
				arguments: release,
				timeout: 240_000,
				files: { 'vite.config.ts': 'export default {}\n\nexport const =\n' },
			},
			{
				label: 'collection',
				arguments: release,
				timeout: 240_000,
				files: {
					[DISTRIBUTION_TEST_PATH]:
						"import './absent-module.js'\nit('proves the artifact', () => {})\n",
				},
			},
			{
				label: 'assertion',
				arguments: release,
				timeout: 240_000,
				files: {
					[DISTRIBUTION_TEST_PATH]:
						"import { expect, it } from 'vitest'\n\nit('asserts an unrelated value', () => {\n\texpect(1).toBe(2)\n})\n",
				},
			},
			{ label: 'timeout', arguments: release, timeout: 1, files: {} },
		])
	})
})

describe('the tables and the derived totals', () => {
	it('labels every row of every path table once, and maps each storage name once', () => {
		expect(new Set(FILESYSTEM_PATH_CASES.map((row) => row.label)).size).toBe(
			FILESYSTEM_PATH_CASES.length,
		)
		expect(new Set(GIT_PATH_CASES.map((row) => row.label)).size).toBe(GIT_PATH_CASES.length)
		expect(new Set(PROTECTED_PATH_CASES.map((row) => row.label)).size).toBe(
			PROTECTED_PATH_CASES.length,
		)
		expect(new Set(SENSITIVE_PATH_CASES.map((row) => row.label)).size).toBe(
			SENSITIVE_PATH_CASES.length,
		)
		expect(new Set(STORAGE_PATH_CASES.map((row) => row.label)).size).toBe(STORAGE_PATH_CASES.length)
		expect(new Set(STORAGE_PATH_CASES.map((row) => row.storage)).size).toBe(
			STORAGE_PATH_CASES.length,
		)
	})

	it('states both verdicts in every table that decides one', () => {
		expect(FILESYSTEM_PATH_CASES.some((row) => row.accepted)).toBe(true)
		expect(FILESYSTEM_PATH_CASES.some((row) => !row.accepted)).toBe(true)
		expect(GIT_PATH_CASES.some((row) => row.matched)).toBe(true)
		expect(GIT_PATH_CASES.some((row) => !row.matched)).toBe(true)
		expect(PROTECTED_PATH_CASES.some((row) => row.matched)).toBe(true)
		expect(PROTECTED_PATH_CASES.some((row) => !row.matched)).toBe(true)
		expect(SENSITIVE_PATH_CASES.some((row) => row.matched)).toBe(true)
		expect(SENSITIVE_PATH_CASES.some((row) => !row.matched)).toBe(true)
		expect(UPSTREAM_ENDPOINT_CASES.some((row) => row.accepted)).toBe(true)
		expect(UPSTREAM_ENDPOINT_CASES.some((row) => !row.accepted)).toBe(true)
		expect(AUDIT_EXIT_CASES.some((row) => row.clean)).toBe(true)
		expect(AUDIT_EXIT_CASES.some((row) => !row.clean)).toBe(true)
	})

	it('publishes an externally checkable digest for each anchor text, once', () => {
		expect(new Set(DIGEST_CASES.map((row) => row.label)).size).toBe(DIGEST_CASES.length)
		expect(new Set(DIGEST_CASES.map((row) => row.digest)).size).toBe(DIGEST_CASES.length)
		for (const row of DIGEST_CASES) expect(row.digest).toMatch(/^[0-9a-f]{64}$/u)
	})

	it('names every accepted command line and every refused one once, under its own verb', () => {
		expect(new Set(COMMAND_CASES.map((row) => row.label)).size).toBe(COMMAND_CASES.length)
		expect(new Set(COMMAND_CASES.map((row) => row.argv.join(' '))).size).toBe(COMMAND_CASES.length)
		expect(new Set(USAGE_CASES.map((row) => row.label)).size).toBe(USAGE_CASES.length)
		expect(new Set(USAGE_CASES.map((row) => row.argv.join(' '))).size).toBe(USAGE_CASES.length)
		for (const row of COMMAND_CASES) expect(row.argv[0]).toBe(row.command.verb)
	})

	it('addresses every canonical upstream path from a frozen table', () => {
		expect(Object.isFrozen(UPSTREAM_PATHS)).toBe(true)
		expect(Object.isFrozen(UPSTREAM_PATHS.vendored)).toBe(true)
		expect(Object.isFrozen(FLEET_UPSTREAM_PATHS)).toBe(true)
		expect(UPSTREAM_PATHS.router).toBe('/@orkestrel%2Frouter')
		expect(UPSTREAM_PATHS.guide).toBe('/orkestrel/router/refs/heads/main/guides/router.md')
		for (const path of Object.values(UPSTREAM_PATHS.vendored)) {
			expect(path.startsWith('/orkestrel/scaffold/refs/heads/')).toBe(true)
		}
		for (const path of Object.values(FLEET_UPSTREAM_PATHS.packages)) {
			expect(path.startsWith('/@orkestrel%2F')).toBe(true)
		}
		for (const path of Object.values(FLEET_UPSTREAM_PATHS.mirrors)) {
			expect(path.endsWith('.md')).toBe(true)
		}
	})

	it('carries every byte the hostile argument names', () => {
		expect(new Set(HOSTILE_BYTES).size).toBe(HOSTILE_BYTES.length)
		for (const byte of HOSTILE_BYTES) expect(HOSTILE_ARGUMENT).toContain(byte)
		expect(HOSTILE_ARGUMENT).toContain('pull')
	})

	it('derives every fleet total from the plan a real compiler produced', () => {
		expect(CORE_GENERATED.length).toBeGreaterThan(0)
		expect(CORE_GENERATED_COUNT).toBe(CORE_GENERATED.length)
		for (const artifact of CORE_GENERATED) expect(artifact.origin).not.toBe('host')
		expect(FLEET_ARTIFACT_COUNT).toBeLessThan(
			buildFleetManifest().entries.length + CORE_GENERATED_COUNT,
		)
		expect(new Set(FLEET_BIRTH_PATHS).size).toBe(FLEET_BIRTH_PATHS.length)
		expect(FLEET_BIRTH_COUNT).toBe(FLEET_BIRTH_PATHS.length)
		for (const path of FLEET_BIRTH_PATHS) {
			const artifact = requireValue(CORE_GENERATED.find((candidate) => candidate.path === path))
			expect(artifact.ownership).toBe('birth')
		}
		// A repair skips the paths the workspace owns and rewrites the rest, so the two
		// totals cannot silently converge.
		expect(FLEET_BIRTH_COUNT).toBeLessThan(CORE_GENERATED_COUNT)
	})

	it('compiles the default blueprint through a real compiler and plans every vendored shape', () => {
		const plan = buildCompiledPlan()
		expect(plan.blueprint.name).toBe('sample')
		expect(plan.artifacts.map((artifact) => artifact.path)).toContain('package.json')
		const vendored = buildVendoredPlan()
		const paths = vendored.artifacts.map((artifact) => artifact.path)
		expect(paths).toContain('.claude/skills')
		expect(paths).toContain('scripts')
		expect(vendored.groups).toStrictEqual(['manifest', 'docs', 'orchestration', 'guides'])
		expect(buildVendoredPlan({ groups: ['docs'] }).artifacts).toStrictEqual(vendored.artifacts)
	})
})

describe('the manifest version reading', () => {
	it('reads the version a manifest text declares, and refuses text declaring none', () => {
		// The reading is textual, so the shapes it must refuse rather than return are a text that
		// parses to something other than a record and one whose version field is not a string.
		expect(readManifestVersion('{"name":"router","version":"0.0.1"}')).toBe('0.0.1')
		expect(() => readManifestVersion('[]')).toThrow('The manifest is not a record')
		expect(() => readManifestVersion('{"name":"router"}')).toThrow(
			'The manifest declares no version',
		)
		expect(() => readManifestVersion('{"version":1}')).toThrow('The manifest declares no version')
	})
})

describe('the admitted npm', () => {
	it('spawns npm in the scratch workspace with environment overrides and reports a refused script', async () => {
		const teardown = createTeardown()
		const workspace = createScratch({ prefix: 'scaffold-npm-spawn-' })
		teardown.add(() => workspace.destroy())
		process.env.ORKESTREL_NPM_PROBE = 'inherited'
		try {
			workspace.write(
				'package.json',
				JSON.stringify({ private: true, scripts: { probe: 'node probe.ts' } }),
			)
			workspace.write(
				'probe.ts',
				'console.log(JSON.stringify({ path: process.cwd(), value: process.env.orkestrel_npm_probe }))\n',
			)
			const run = await spawnNpm(['run', '--silent', 'probe'], {
				workspace: workspace.path,
				environment: { orkestrel_npm_probe: 'overridden' },
			})
			expect(run.failed, `${run.stderr}`).toBe(false)
			expect(run.code).toBe(0)
			expect(JSON.parse(run.stdout)).toEqual({ path: workspace.path, value: 'overridden' })
			expect(run.truncated).toBe(false)
			const refused = await spawnNpm(['run', 'absent-script'], { workspace: workspace.path })
			expect(refused.code).toBe(1)
			expect(refused.failed).toBe(true)
			expect(refused.stderr).toContain('absent-script')
		} finally {
			delete process.env.ORKESTREL_NPM_PROBE
			await teardown.destroy()
		}
		expect(existsSync(workspace.path)).toBe(false)
	})

	it('reports output truncation when the npm version exceeds the supplied byte bound', async () => {
		const complete = await spawnNpm(['--version'])
		const bounded = await spawnNpm(['--version'], { limit: 1 })
		expect(complete.code).toBe(0)
		expect(complete.truncated).toBe(false)
		expect(extractVersion(complete.stdout.trim())).not.toBeUndefined()
		expect(bounded.code).toBe(0)
		expect(bounded.truncated).toBe(true)
		expect(Buffer.byteLength(bounded.stdout)).toBe(1)
		expect(bounded.stdout).toBe(complete.stdout.slice(0, 1))
	})

	it('reads the floor out of the manifest a real compiler emitted', () => {
		const artifact = requireValue(
			buildCompiledPlan().artifacts.find((candidate) => candidate.path === 'package.json'),
		)
		const manifest: unknown = JSON.parse(requireValue(artifact.content))
		// The floor comes out of the emitted artifact and is compared against the constant the
		// compiler derives the declared range from, so a reading that kept the `>=` offset,
		// dropped a component, or reached a neighbouring field disagrees with that declaration.
		expect(readNpmFloor(manifest)).toBe(MINIMUM_NPM_VERSION)
	})

	it('refuses a manifest carrying no packageManager version, naming the field it wanted', () => {
		expect(() => readNpmFloor(undefined)).toThrow(/devEngines/u)
		expect(() => readNpmFloor({})).toThrow(/devEngines/u)
		expect(() => readNpmFloor({ devEngines: {} })).toThrow(/devEngines\.packageManager/u)
		expect(() => readNpmFloor({ devEngines: { packageManager: {} } })).toThrow(
			/devEngines\.packageManager\.version/u,
		)
	})

	it('refuses a declared version that is not a floor over an exact version', () => {
		for (const version of ['11.6.0', '^11.6.0', '>=11.6', '>= 11.6.0', '>=11.6.0-rc.1', '>=']) {
			expect(() => readNpmFloor({ devEngines: { packageManager: { version } } })).toThrow(
				/devEngines\.packageManager\.version/u,
			)
		}
	})

	it('reads the ambient npm version as an exact version rather than as the text around one', () => {
		// A reading that kept the trailing newline, or the whole of a notice npm wrote beside
		// the version, is not a version this package can extract. The reading is taken inside
		// the case rather than at module scope, so a host carrying no npm fails the cases that
		// need one instead of collecting none of this file.
		expect(extractVersion(readNpmVersion())).not.toBe(undefined)
	})

	it('reads the version of the npm a spawn launches when the environment names its entry', async () => {
		// npm names its own entry in npm_execpath for every script it runs, and a spawn launches
		// that entry first, so a version read anywhere else admits one npm and launches another.
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const entry = workspace.write('npm/bin/npm-cli.js', "process.stdout.write('0.0.1\\n')\n")
			const environment = buildEnvironment({ npm_execpath: entry })
			expect(resolveNpmEntry(environment)).toBe(entry)
			expect(readNpmVersion(environment)).toBe('0.0.1')
			const launched = await spawnNpm(['--version'], { environment })
			expect(launched.stdout.trim()).toBe('0.0.1')
		} finally {
			workspace.destroy()
		}
	})

	it('reads the inherited npm entry when an override names only PATH, as a spawn does', async () => {
		// A spawn merges its overrides over this process's environment, so an override that leaves
		// npm_execpath out still launches the inherited entry, and the reading must follow it.
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const inherited = process.env
		try {
			process.env = buildEnvironment({
				npm_execpath: workspace.write('npm/bin/npm-cli.js', "process.stdout.write('0.0.2\\n')\n"),
			})
			const environment = { PATH: requireValue(readVariable(process.env, 'PATH')) }
			expect(readNpmVersion(environment)).toBe('0.0.2')
			const launched = await spawnNpm(['--version'], { environment })
			expect(launched.stdout.trim()).toBe('0.0.2')
		} finally {
			process.env = inherited
			workspace.destroy()
		}
	})

	it('passes over an npm_execpath that names no npm entry file', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const absent = join(workspace.path, 'absent', 'npm-cli.js')
			const resolved = resolveNpmEntry({ ...process.env, npm_execpath: absent })
			expect(resolved).not.toBe(absent)
			expect(basename(resolved)).toBe('npm-cli.js')
			expect(isFile(resolved)).toBe(true)
		} finally {
			workspace.destroy()
		}
	})

	it('launches the ambient npm unchanged when it already satisfies the floor', () => {
		const ambient = readNpmVersion()
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const prefix = workspace.ensure('npm')
			const admitted = provisionNpm({ floor: ambient, prefix })
			expect(admitted.version).toBe(ambient)
			// The independent reading: a provisioning install writes the prefix, and this
			// branch must not have run one.
			expect(existsSync(join(prefix, 'node_modules'))).toBe(false)
			expect(requireValue(readVariable(admitted.environment, 'PATH'))).toBe(
				requireValue(readVariable(process.env, 'PATH')),
			)
		} finally {
			workspace.destroy()
		}
	})
})

describe('the shadowed tool path', () => {
	it('renders an LF-framed launcher with a POSIX-quoted source and literal arguments', () => {
		expect(renderLauncher("/path with spaces/owner's/tool")).toBe(`#!/bin/sh
exec '/path with spaces/owner'"'"'s/tool' "$@"
`)
	})

	// The launcher executes POSIX shell source; Windows lacks the process-group
	// capability resolveOllamaShell requires for the Ollama script proofs.
	it.skipIf(resolveOllamaShell() === undefined)(
		'executes the original quoted source with literal arguments',
		async () => {
			// This case measures launcher quoting and argument forwarding. The Ollama setup
			// selection measures the helper's isolation from the ambient tool path.
			const workspace = createScratch({ prefix: SCRATCH_PREFIX })
			try {
				const tools = workspace.ensure("tools with an apostrophe ' and spaces")
				const source = workspace.write(
					"original path with spaces/owner's tool.sh",
					`#!/bin/sh
printf 'source=%s\\n' "$0"
printf 'first=%s\\n' "$1"
printf 'second=%s\\n' "$2"
command -v ollama >/dev/null 2>&1
printf 'ollama=%s\\n' "$?"
`,
				)
				const launcher = workspace.write(join(tools, 'fixture'), renderLauncher(source))
				const missing = workspace.write(
					join(tools, 'missing'),
					renderLauncher(join(workspace.path, "missing owner's tool.sh")),
				)
				chmodSync(source, 0o755)
				chmodSync(launcher, 0o755)
				chmodSync(missing, 0o755)

				const bash = requireValue(resolveOllamaShell())
				const result = await execute(
					{
						file: bash,
						arguments: [normalizeBashPath(launcher), 'spaced argument', 'literal$signal'],
						environment: { PATH: tools },
					},
					{ strict: false, timeout: 10_000 },
				)
				expect(result.failed).toBe(false)
				expect(result.stdout).toContain(`source=${normalizeBashPath(source)}\n`)
				expect(result.stdout).toContain('first=spaced argument\n')
				expect(result.stdout).toContain('second=literal$signal\n')
				const ollama = requireValue(
					result.stdout.split(/\r\n|\n/u).find((line) => line.startsWith('ollama=')),
				)
				expect(ollama).not.toBe('ollama=0')

				const control = await execute(
					{
						file: bash,
						arguments: [normalizeBashPath(missing)],
						environment: { PATH: tools },
					},
					{ strict: false, timeout: 10_000 },
				)
				expect(control.failed).toBe(true)
				expect(control.code).not.toBe(0)
			} finally {
				workspace.destroy()
			}
		},
	)

	// The source needs a POSIX shell and executable mode bits that the filesystem enforces.
	it.skipIf(resolveOllamaShell() === undefined || !supportsMode())(
		'refuses an original source without execute permission and executes it after chmod',
		async () => {
			const workspace = createScratch({ prefix: SCRATCH_PREFIX })
			try {
				const tools = workspace.ensure('permission tools')
				const source = workspace.write(
					'original source.sh',
					`#!/bin/sh
printf 'executed\\n'
`,
				)
				const launcher = workspace.write(join(tools, 'fixture'), renderLauncher(source))
				chmodSync(source, 0o644)
				chmodSync(launcher, 0o755)
				const bash = requireValue(resolveOllamaShell())
				const refused = await execute(
					{
						file: bash,
						arguments: [normalizeBashPath(launcher)],
						environment: { PATH: tools },
					},
					{ strict: false, timeout: 10_000 },
				)
				expect(refused.failed).toBe(true)
				expect(refused.code).not.toBe(0)
				expect(refused.stdout).not.toContain('executed')

				chmodSync(source, 0o755)
				const executed = await execute(
					{
						file: bash,
						arguments: [normalizeBashPath(launcher)],
						environment: { PATH: tools },
					},
					{ strict: false, timeout: 10_000 },
				)
				expect(executed.failed).toBe(false)
				expect(executed.stdout).toBe('executed\n')
			} finally {
				workspace.destroy()
			}
		},
	)

	it('resolves a command this host carries and answers undefined for one it carries nowhere', () => {
		// The reading the Ollama proofs build their own `PATH` from. A resolver that
		// answered a path no file sits at would leave the script without the programs it
		// runs, and one that answered a path for every name would put `ollama` back.
		const resolved = requireValue(resolveTool('node'))
		expect(isFile(resolved)).toBe(true)
		expect(basename(resolved).startsWith('node')).toBe(true)
		expect(resolveTool('orkestrel-scaffold-absent-command')).toBe(undefined)
		// An environment carrying no `PATH` entry reaches nothing, which is what makes the
		// directory the helper builds the script's whole search path rather than an
		// addition to this host's.
		expect(resolveTool('node', { PATH: '' })).toBe(undefined)
		// The absence the POSIX Ollama proofs build their shadowed PATH from: the bash
		// script's local-startup branch refuses when `command -v ollama` finds nothing.
		expect(OLLAMA_TOOLS).not.toContain('ollama')
		expect(resolveTool('ollama', { PATH: '' })).toBe(undefined)
	})
})

// The Windows hook evaluates its remote gate in process; POSIX executes the registered shell.
describe.skipIf(process.platform !== 'win32')('Ollama Windows setup', () => {
	it('leaves local hooks idle and runs a remote hook against the selected fixture', async () => {
		const server = await createOllamaServer()
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const environment = {
				PATH: workspace.path,
				OLLAMA_HOST: server.url,
				OLLAMA_MODEL: 'fixture-model',
			}
			expect((await executeOllamaHook(workspace.path, undefined, environment)).code).toBe(0)
			expect((await executeOllamaHook(workspace.path, 'false', environment)).code).toBe(0)
			expect(server.requests).toStrictEqual([])
			expect((await executeOllamaHook(workspace.path, 'true', environment)).code).toBe(0)
			expect(server.requests.map((request) => request.path)).toStrictEqual([
				'/api/version',
				'/api/show',
				'/api/chat',
			])
			expect(server.requests).not.toBe(server.requests)
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('returns 127 when the isolated executable lookup cannot start an unready endpoint', async () => {
		const server = await createOllamaServer({ status: { version: 503 } })
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const environment = {
				PATH: workspace.path,
				OLLAMA_HOST: server.url,
				OLLAMA_MODEL: 'fixture-model',
			}
			expect(resolveExecutable('ollama', { workspace: workspace.path, environment })).toBe(
				undefined,
			)
			const setup = await executeOllamaSetup(server.url, 'fixture-model')
			const hook = await executeOllamaHook(workspace.path, 'true', environment)
			for (const result of [setup, hook]) {
				expect(result.code).toBe(127)
				expect(result.expired).toBe(false)
				expect(result.stderr).toContain(
					'ollama is required to start an unreachable loopback endpoint',
				)
			}
			expect(server.requests.map((request) => request.path)).toStrictEqual([
				'/api/version',
				'/api/version',
			])
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	// The native launch requires an installed regular file; execution aliases are excluded
	// by resolveExecutable. The selected HTTP endpoint is the fixture, never the host daemon.
	it.skipIf(resolveExecutable('ollama') === undefined)(
		'launches the installed Ollama executable without a shell',
		async () => {
			const file = requireValue(resolveExecutable('ollama'))
			const server = await createOllamaServer()
			try {
				expect(isFile(file)).toBe(true)
				const result = await execute(
					{
						file,
						arguments: ['--version'],
						environment: { OLLAMA_HOST: server.url, PATH: '' },
					},
					{ strict: false, timeout: 10_000 },
				)
				expect(result.code).toBe(0)
				expect(result.command).toContain(file)
				expect(`${result.stdout}${result.stderr}`).toMatch(/version/iu)
				expect(server.requests.map((request) => request.path)).toContain('/api/version')
			} finally {
				await server.destroy()
			}
		},
	)
})

describe('the mapped loopback reading', () => {
	it('agrees with what an HTTP request to the rewritten address delivers, and with why it refused', async () => {
		const reachable = await supportsMappedLoopback()
		const loopback = await createLoopback(createServer((_request, response) => response.end('ok')))
		try {
			// The control: the plain address the fixture bound, which every host running
			// this suite reaches. It separates an address family the host refuses from a
			// listener that answered nothing at all.
			expect((await fetch(`http://127.0.0.1:${loopback.port}/`)).status).toBe(200)
			// The second mechanism: an HTTP client rather than a raw socket, driving the
			// same `::ffff:` rewrite the gated case performs against its own fixture. The
			// rejection is read for the code its cause carries rather than collapsed to a
			// boolean, because a `false` reading claims one specific refusal: the host
			// refused the address family. A request that failed for any other reason — a
			// port nothing listens on, a fixture that never bound — carries a different
			// code and disagrees with that claim, where a boolean agrees with it.
			const outcome = await fetch(`http://[::ffff:127.0.0.1]:${loopback.port}/`).then(
				(response) => ({ delivered: response.ok, refusal: undefined }),
				(error: unknown) => {
					// The client wraps the host's refusal, so the code sits on the cause rather
					// than on the rejection the call raised.
					const cause: unknown = error instanceof Error ? error.cause : undefined
					const code: unknown = isObject(cause)
						? Object.getOwnPropertyDescriptor(cause, 'code')?.value
						: undefined
					return { delivered: false, refusal: isString(code) ? code : undefined }
				},
			)
			expect(outcome).toStrictEqual(
				reachable
					? { delivered: true, refusal: undefined }
					: { delivered: false, refusal: 'EAFNOSUPPORT' },
			)
		} finally {
			await loopback.destroy()
		}
	})

	// The kernel publishes its IPv6 interface table at `/proc/net/if_inet6`, and a host
	// carrying no IPv6 stack publishes no such file. A host that mounts no `/proc/net`
	// directory publishes the table nowhere, so it offers no reading to compare against.
	it.skipIf(!existsSync('/proc/net'))(
		'agrees with the IPv6 interface table the kernel publishes',
		async () => {
			expect(await supportsMappedLoopback()).toBe(existsSync('/proc/net/if_inet6'))
		},
	)
})

describe('the skill script runner', () => {
	it('runs a checkout script as a child and reads its exit and last JSON line', () => {
		const scratch = createScratch({ prefix: 'orkestrel-setup-skill-' })
		try {
			const run = runSkillScript(
				'.agents/skills/orkestrel-dispatch/scripts/sweep.ts',
				['--report'],
				{
					cwd: scratch.path,
				},
			)
			expect(run.status).toBe(64)
			expect(run.stderr).toContain('run from the repository root')
			expect(run.json).toBeUndefined()
			scratch.ensure('.git')
			const report = runSkillScript(
				'.agents/skills/orkestrel-dispatch/scripts/result.ts',
				['--cursor', 'absent.jsonl'],
				{ cwd: scratch.path, env: { ORKESTREL_SKILL_PROBE: 'set' } },
			)
			expect(report.status).toBe(64)
			const brief = runSkillScript(
				'.agents/skills/orkestrel-dispatch/scripts/brief.ts',
				['--unit', 'runner', '--lane', 'units'],
				{ cwd: scratch.path },
			)
			expect(brief.status).toBe(0)
			expect(isObject(brief.json) && isString(brief.json.brief)).toBe(true)
		} finally {
			scratch.destroy()
		}
	})

	it('drops the inherited case variant of every variable a run adds', () => {
		process.env.ORKESTREL_CASE_PROBE = 'inherited'
		try {
			const merged = buildEnvironment({ orkestrel_case_probe: 'added', ORKESTREL_OTHER: 'kept' })
			expect(merged.orkestrel_case_probe).toBe('added')
			expect(Object.keys(merged)).not.toContain('ORKESTREL_CASE_PROBE')
			expect(merged.ORKESTREL_OTHER).toBe('kept')
			expect(merged.PATH ?? merged.Path).toBe(process.env.PATH ?? process.env.Path)
			expect(Object.keys(buildEnvironment(undefined))).toEqual(Object.keys(process.env))
		} finally {
			delete process.env.ORKESTREL_CASE_PROBE
		}
	})

	it('spawns a checkout script without blocking the event loop and reads the same run shape', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-setup-skill-spawn-' })
		try {
			const refused = await spawnSkillScript(
				'.agents/skills/orkestrel-dispatch/scripts/sweep.ts',
				['--report'],
				{ cwd: scratch.path },
			)
			expect(refused.status).toBe(64)
			expect(refused.stderr).toContain('run from the repository root')
			expect(refused.json).toBeUndefined()
			scratch.ensure('.git')
			const brief = await spawnSkillScript(
				'.agents/skills/orkestrel-dispatch/scripts/brief.ts',
				['--unit', 'runner', '--lane', 'units'],
				{ cwd: scratch.path },
			)
			expect(brief.status).toBe(0)
			expect(isObject(brief.json) && isString(brief.json.brief)).toBe(true)
		} finally {
			scratch.destroy()
		}
	})
})

describe('the endpoint reader', () => {
	it('parses an HTTP origin and refuses every endpoint carrying more than an origin', () => {
		expect(parseOllamaOrigin('127.0.0.1:11434')?.origin).toBe('http://127.0.0.1:11434')
		expect(parseOllamaOrigin('https://example.test')?.protocol).toBe('https:')
		expect(parseOllamaOrigin('http://[::1]:1')?.hostname).toBe('[::1]')
		const accepted = [
			'',
			'http://user:secret@host',
			'http://host/path',
			'http://host/?query=1',
			'http://host/#fragment',
			'ftp://host',
			'http://',
		].filter((endpoint) => parseOllamaOrigin(endpoint) !== undefined)
		expect(accepted).toStrictEqual([])
	})
})

describe('the host probes', () => {
	it('reads the registry once, whichever way the host answers, and shares the reading', () => {
		const first = new TestRegistry()
		expect(typeof first.reachable).toBe('boolean')
		expect(first.reachable).toBe(first.reachable)
		expect(Object.isFrozen(NPM_REGISTRY)).toBe(true)
		expect(NPM_REGISTRY.reachable).toBe(first.reachable)
		expect(RELEASE_MODE).toBe(import.meta.env.MODE === 'release')
	})
})

describe('the example claim instrument', () => {
	it('lists each shipped declaration once, each with controls that hold exactly one claim', () => {
		expect(new Set(DECLARATION_CASES.map(({ types }) => types)).size).toBe(DECLARATION_CASES.length)
		for (const declaration of DECLARATION_CASES) {
			expect(declaration.types).toMatch(/^dist\/src\/\w+\/index\.d\.ts$/u)
			expect(declaration.module).toBe(declaration.types.replace('.d.ts', '.js'))
			expect(declaration.controls.length).toBeGreaterThan(0)
			expect(countClaims(declaration.controls)).toBe(declaration.controls.length)
		}
		expect(Object.isFrozen(DECLARATION_CASES)).toBe(true)
	})

	it('reads a fenced example, its comment prefix, and a claim line', () => {
		const printed = [' * Example', ' * ```ts', ' * isBranch(1) // false', ' * ```', ' *'].map(
			(line) => line.replace(CLAIM_PREFIX, ''),
		)
		const bodies = [...printed.join('\n').matchAll(CLAIM_EXAMPLE)].map(
			(match) => match.groups?.body,
		)
		expect(bodies).toStrictEqual(['isBranch(1) // false\n'])
		expect(CLAIM_LINE.exec('isBranch(1) // false')?.groups).toMatchObject({
			expression: 'isBranch(1)',
			verdict: 'false',
		})
		expect(CLAIM_LINE.test('no verdict here')).toBe(false)
		expect(CLAIM_OPENER.test('isBranch(1)')).toBe(true)
		expect(CLAIM_OPENER.test('1 + 1')).toBe(false)
		expect(CLAIM_KEYWORDS).toContain('const')
		expect(Object.isFrozen(CLAIM_KEYWORDS)).toBe(true)
		expect(CLAIM_ELISION).toBe('…')
	})

	it('counts the claim-shaped lines across example bodies', () => {
		expect(countClaims(['a() // 1\nplain\nb() // 2', 'none', 'c() // 3'])).toBe(3)
		expect(countClaims([])).toBe(0)
	})

	it('parses a literal verdict to its canonical encoding and refuses prose', () => {
		expect(parseClaimVerdict('true')).toBe('true')
		expect(parseClaimVerdict('-1.5')).toBe('-1.5')
		expect(parseClaimVerdict("'text'")).toBe('"text"')
		expect(parseClaimVerdict("['a', 1]")).toBe('["a",1]')
		expect(parseClaimVerdict('undefined')).toBe(CLAIM_ABSENT)
		expect(parseClaimVerdict('the digest of the empty membership')).toBe(undefined)
		expect(parseClaimVerdict('{ path: 1 }')).toBe(undefined)
	})

	it('balances brackets and quotes and refuses every fragment that does not close', () => {
		const closed = ['(a)', '[{()}]', "'(' + (b)", "'it\\'s'", '`${a}`', '']
		const open = ['(a', 'a)', ')(', "'a(", '[{)}]', '{']
		expect(closed.filter((text) => !matchesBalance(text))).toStrictEqual([])
		expect(open.filter((text) => matchesBalance(text))).toStrictEqual([])
	})

	it('locates the first line of the statement a claim sits on, and refuses a statement', () => {
		expect(locateClaimOpening(['foo(', '  1,', ') // 3'], 2, ')')).toBe(0)
		expect(locateClaimOpening(['first()', 'second() // 4'], 1, 'second()')).toBe(1)
		expect(locateClaimOpening(['if (a) b // 5'], 0, 'if (a) b')).toBe(undefined)
		expect(locateClaimOpening(['1 + 1 // 2'], 0, '1 + 1')).toBe(undefined)
		expect(locateClaimOpening([') // 6'], 0, ')')).toBe(undefined)
	})

	it('answers each claim of a block in a child, and names the claims a block refused or threw past', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			scratch.write('answers.mjs', 'export const answer = 42\n')
			const driven = spawnSync(process.execPath, ['--input-type=module', '--eval', CLAIM_DRIVER], {
				encoding: 'utf8',
				input: JSON.stringify({
					module: pathToFileURL(join(scratch.path, 'answers.mjs')).href,
					blocks: [
						{ source: 'record(0, (answer))\nrecord(1, (undefined))', claims: [0, 1] },
						{ source: 'record(2, (', claims: [2] },
						{
							source: "record(3, (answer))\nthrow new Error('stop')\nrecord(4, (answer))",
							claims: [3, 4],
						},
					],
				}),
				timeout: 30_000,
				windowsHide: true,
			})
			expect(driven.status).toBe(0)
			expect(driven.stderr).toBe('')
			const outcomes: unknown = JSON.parse(driven.stdout)
			expect(outcomes).toMatchObject({
				0: { driven: true, encoded: '42' },
				1: { driven: true, encoded: CLAIM_ABSENT },
				2: { driven: false },
				3: { driven: true, encoded: '42' },
				4: { driven: false },
			})
		} finally {
			scratch.destroy()
		}
	})
})

describe('the entry workspace runner', () => {
	it('links an installed package into a scratch workspace without installing it', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			linkPackage(scratch, '@orkestrel/contract')
			expect(scratch.has('node_modules/@orkestrel/contract/package.json')).toBe(true)
			expect(
				JSON.parse(requireValue(scratch.read('node_modules/@orkestrel/contract/package.json'))),
			).toMatchObject({ name: '@orkestrel/contract' })
		} finally {
			scratch.destroy()
		}
	})

	it('writes the entry, its configuration, its project, and the linked packages', () => {
		const scratch = buildEntryWorkspace(ENTRY_FILES)
		try {
			for (const path of Object.keys(ENTRY_FILES)) {
				expect(scratch.read(path)).toBe(ENTRY_FILES[path])
			}
			expect(scratch.read('tests/guides.test.ts')).toBe(
				readFileSync(join(WORKSPACE_ROOT, 'tests/guides.test.ts'), 'utf8'),
			)
			expect(scratch.has('vite.config.ts')).toBe(true)
			expect(scratch.has('tests/fixture.test.ts')).toBe(true)
			const linked = [
				'@orkestrel/contract',
				'@orkestrel/guide',
				'@orkestrel/test',
				'vite',
				'vitest',
			]
			expect(
				linked.filter((name) => !scratch.has(`node_modules/${name}/package.json`)),
			).toStrictEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('reports the exit and the error stream of a run whose script is missing', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			scratch.write('package.json', '{"name":"entry-runner-control"}\n')
			const run = runEntry(scratch, ['--check'])
			expect(run.status).not.toBe(0)
			expect(run.lines).toStrictEqual([])
			expect(run.stderr).toContain('test:guides')
		} finally {
			scratch.destroy()
		}
	})
})

describe('the emitted-template staging', () => {
	it('creates the persistent scratch parent in the checkout', () => {
		const directory = ensureTmpRoot()
		expect(directory).toBe(join(WORKSPACE_ROOT, 'tmp').replace(/[\\/]$/u, ''))
		expect(existsSync(directory)).toBe(true)
	})

	it('stages the emitted root configuration, the vendored helpers, and the plugin declarations', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			stageRootConfig(buildBlueprint({ app: ['browser'] }), scratch, 'selected')
			const staged = ['vite.config.ts', 'tsconfig.json', 'package.json', 'plugins.d.ts']
			expect(staged.filter((path) => !scratch.has(`selected/${path}`))).toStrictEqual([])
			expect(scratch.read('selected/configs/helpers.ts')).toBe(
				readFileSync(join(WORKSPACE_ROOT, 'configs/helpers.ts'), 'utf8'),
			)
			expect(scratch.has('selected/configs/browsers.ts')).toBe(true)
		} finally {
			scratch.destroy()
		}
	})

	it('reads a clean typecheck as empty text and a failing one as its diagnostics', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			scratch.write(
				'clean/tsconfig.json',
				'{"compilerOptions":{"strict":true,"noEmit":true},"files":["a.ts"]}',
			)
			scratch.write('clean/a.ts', 'export const a: number = 1\n')
			scratch.write(
				'broken/tsconfig.json',
				'{"compilerOptions":{"strict":true,"noEmit":true},"files":["a.ts"]}',
			)
			scratch.write('broken/a.ts', "export const a: number = 'one'\n")
			expect(checkTypes(join(scratch.path, 'clean'))).toBe('')
			expect(checkTypes(join(scratch.path, 'broken'))).toContain('error TS2322')
		} finally {
			scratch.destroy()
		}
	})

	it('writes the emitted browser resolver and loads it in a real process', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const file = stageResolver(scratch)
			expect(file).toBe(join(scratch.path, 'browsers.ts'))
			expect(scratch.read('browsers.ts')).toBe(CONFIG_TEMPLATES.browsers)
			scratch.write(
				'answers.ts',
				'export function answer(value: number): number {\n\treturn value * 2\n}\n',
			)
			expect(
				driveModule(join(scratch.path, 'answers.ts'), 'answers', [
					'answers.answer(2)',
					'answers.answer(21)',
				]),
			).toStrictEqual([4, 42])
			expect(() => driveModule(join(scratch.path, 'answers.ts'), 'answers', ['missing()'])).toThrow(
				'Command failed',
			)
		} finally {
			scratch.destroy()
		}
	})

	it('builds a browsers directory of real executable files', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const root = buildBrowsersRoot(scratch, ['chromium-1/chrome', 'chromium-2/chrome'])
			expect(root).toBe(join(scratch.path, 'browsers'))
			expect(scratch.names('browsers')).toStrictEqual(['chromium-1', 'chromium-2'])
			const executable = statSync(join(root, 'chromium-1', 'chrome')).mode & 0o111
			expect(supportsMode() ? executable !== 0 : true).toBe(true)
		} finally {
			scratch.destroy()
		}
	})

	it('writes each emitted harness beside its proof with a resolvable toolchain', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const file = writeDistributionHarness(workspace)
			expect(file).toBe(join(workspace.path, 'tests/setupDistribution.ts'))
			expect(workspace.read('tests/setupDistribution.ts')).toContain(
				'export function createDistributionSuite',
			)
			expect(workspace.has('node_modules/typescript')).toBe(true)
			expect(buildDistributionProof()).toContain("from './setupDistribution.js'")
			writeDistributionHarness(workspace, true)
			expect(workspace.read('tests/setupDistribution.ts')).toContain(
				'export async function checkDistributionBrowser',
			)
			expect(workspace.has('configs/browsers.ts')).toBe(true)
		} finally {
			workspace.destroy()
		}
	})

	it('writes exact installed fixture bytes and builds its case observation', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const installed = writeDistributionFixture(workspace, {
				'dist/src/server/index.js': 'export {}\n',
			})
			expect(installed).toBe(join(workspace.path, 'installed'))
			expect(workspace.read('src/core/index.ts')).toBe('export class Control {}\n')
			expect(workspace.read('installed/dist/src/server/index.js')).toBe('export {}\n')
			expect(workspace.read('installed/package.json')).toContain('distribution-control')
			const file = writeDistributionHarness(workspace)
			const expression = buildDistributionObservation(
				installed,
				workspace.path,
				'installed manifest fixed',
			)
			expect(driveModule(file, 'classifier', [expression])).toEqual([{ actual: [], expected: [] }])
		} finally {
			workspace.destroy()
		}
	})

	it('finds a project row whose parameters differ from the signature the sweep demands', () => {
		const content = [
			'export function good(override?: UserConfig): UserConfig {',
			'\treturn {}',
			'}',
			'export function bad(extra: string): UserConfig {',
			'\treturn {}',
			'}',
			'export function mergeOverride(base: UserConfig, override?: UserConfig): UserConfig {',
			'\treturn base',
			'}',
			'export function resolveWorkspacePath(path: string): string {',
			'\treturn path',
			'}',
		].join('\n')
		expect(findRefusals(content)).toStrictEqual(['bad(extra: string)'])
		expect(
			findRefusals('export function policy(override?: UserConfig): UserConfig {\n\treturn {}\n}\n'),
		).toStrictEqual([])
		expect(PLANNED_SETUP_SEED).toBe('')
	})
})

describe('the command fixtures served from a registry', () => {
	it('O1 uses the real built scaffold executable in a generated recording workspace', async () => {
		const fixture = await createWaveRecording('orkestrel-wave-real-cli-')
		try {
			expect(
				readFileSync(
					join(fixture.target, 'node_modules/@orkestrel/scaffold/dist/bin/main.js'),
				).equals(readFileSync(join(WORKSPACE_ROOT, 'dist/bin/main.js'))),
			).toBe(true)
			expect(fixture.scratch.has('src/core/index.ts')).toBe(true)
			expect(fixture.scratch.read('AGENTS.md')).toContain('@orkestrel/scaffold')
			fixture.scratch.write('package.json', '{"version":"1.0.0"}\n')
			const audit = spawnSync(
				process.execPath,
				[
					join(fixture.target, 'node_modules/@orkestrel/scaffold/dist/bin/main.js'),
					'audit',
					'--offline',
					'--json',
				],
				{ cwd: fixture.target, encoding: 'utf8' },
			)
			expect(audit.status).toBe(1)
			expect(JSON.parse(audit.stdout)).toMatchObject({
				error: { code: 'TARGET', message: expect.stringContaining('no package name') },
			})
		} finally {
			await fixture.destroy()
		}
	}, 30_000)
	it('seeds the committed overwrite target and isolates its npm cache under tmp', async () => {
		const fixture = await createWaveRecording('orkestrel-wave-recording-')
		try {
			expect(fixture.scratch.read('node_modules/@orkestrel/scaffold/package.json')).toContain(
				String(readInstalledRecord(WORKSPACE_ROOT).version),
			)
			expect(fixture.scratch.read('.editorconfig')).toBe('stale\n')
			expect(fixture.scratch.has('.claude/rules/removed.md')).toBe(true)
			expect(fixture.environment.npm_config_cache).toBe(join(fixture.target, 'tmp', 'npm-cache'))
			expect(
				spawnSync('git', ['status', '--porcelain'], { cwd: fixture.target, encoding: 'utf8' })
					.stdout,
			).toBe('')
		} finally {
			await fixture.destroy()
		}
	}, 30_000)
	it('serves the A0 exact-peer shape and reproduces ERESOLVE on a probe re-pin', async () => {
		const session = await createWaveSession('orkestrel-wave-precondition-')
		try {
			const packuments = await Promise.all(
				['vt', 'bp', 'br', 'pr'].map(async (name) =>
					(await fetch(`${session.registry.url}${name}`)).json(),
				),
			)
			expect(packuments).toMatchObject([
				{
					versions: {
						'1.0.0': {
							peerDependencies: { bp: '1.0.0' },
							peerDependenciesMeta: { bp: { optional: true } },
							dist: { integrity: expect.stringMatching(/^sha512-/u) },
						},
						'1.0.1': { peerDependencies: { bp: '1.0.1' } },
					},
				},
				{
					versions: {
						'1.0.0': { peerDependencies: { vt: '1.0.0' }, dependencies: { br: '1.0.0' } },
						'1.0.1': { peerDependencies: { vt: '1.0.1' }, dependencies: { br: '1.0.1' } },
					},
				},
				{
					versions: {
						'1.0.0': { peerDependencies: { vt: '1.0.0' } },
						'1.0.1': { peerDependencies: { vt: '1.0.1' } },
					},
				},
				{
					versions: {
						'1.0.0': {
							peerDependencies: { vt: '^1.0.0' },
							peerDependenciesMeta: { vt: { optional: true } },
						},
						'1.0.1': {
							peerDependencies: { vt: '^1.0.1' },
							peerDependenciesMeta: { vt: { optional: true } },
						},
					},
				},
			])
			const manifest = session.scratch.read('consumer/package.json')
			if (manifest === undefined) throw new Error('The wave manifest is absent')
			session.scratch.write(
				'consumer/package.json',
				manifest.replace('"pr": "^1.0.0"', '"pr": "^1.0.1"'),
			)
			const run = await spawnNpm(['install', '--ignore-scripts'], {
				workspace: session.target,
				environment: session.environment,
			})
			console.log(`Wave P1 exit=${run.code}\n${run.stdout}\n${run.stderr}`)
			expect(run.code).toBe(1)
			expect(run.stderr).toContain('code ERESOLVE')
			expect(run.stderr).toContain('Conflicting peer dependency: vt@1.0.1')
		} finally {
			await session.destroy()
		}
	}, 60_000)
	it('serves a packument for each fleet package and a guide for each fleet mirror', () => {
		for (const reply of Object.values(FLEET_RELEASE_REPLIES)) {
			expect(reply.status).toBe(200)
			expect(JSON.parse(String(reply.body))).toHaveProperty('dist-tags.latest')
		}
		for (const reply of Object.values(FLEET_MIRROR_REPLIES)) {
			expect(reply).toMatchObject({ status: 200, type: 'text/plain' })
			expect(String(reply.body)).toMatch(/^# \w+\n$/u)
		}
		expect(Object.isFrozen(FLEET_RELEASE_REPLIES)).toBe(true)
		expect(Object.isFrozen(FLEET_MIRROR_REPLIES)).toBe(true)
		expect(Object.keys(FLEET_RELEASE_REPLIES)).toContain('/vite')
	})

	it('aligns the target manifest to the registry and keeps every other section the base builds', () => {
		const aligned: unknown = JSON.parse(buildAlignedManifest())
		expect(aligned).toMatchObject({
			dependencies: { '@orkestrel/emitter': '^0.0.5', vite: '~8.3.5' },
			devDependencies: { '@orkestrel/guide': '^0.0.9' },
			scripts: expect.any(Object),
		})
		expect(ALIGNED_MANIFEST_TEXT).toContain('"vite": "~8.3.5"')
		expect(ALIGNED_MANIFEST_TEXT).not.toContain('~8.2.0')
		expect(buildAlignedManifest(undefined, { custom: '1.0.0' })).toContain('"custom": "1.0.0"')
		expect(buildAlignedManifest(undefined, undefined, 'not a record')).toContain(
			'"devDependencies": "not a record"',
		)
	})

	it('freezes the audit replies and serves them', async () => {
		expect(Object.isFrozen(AUDIT_REPLIES)).toBe(true)
		const server = await createUpstreamServer(AUDIT_REPLIES)
		try {
			expect((await fetch(`${server.base}/vite`)).status).toBe(200)
		} finally {
			await server.destroy()
		}
	})
})

describe('the checkout readers', () => {
	it('reads the manifest from disk and agrees with the compile-time import', () => {
		expect(readCheckoutManifest().name).toBe(packageManifest.name)
		expect(readCheckoutName()).toBe(packageManifest.name)
		const ranges = readCheckoutRanges()
		expect(ranges.vitest).toBe(packageManifest.devDependencies.vitest)
		for (const [name, range] of Object.entries(packageManifest.dependencies ?? {})) {
			expect([name, ranges[name]]).toStrictEqual([name, range])
		}
	})

	it('selects the table rows the manifest does not declare, sorted, and never the package itself', () => {
		const seeded = selectSeededNames()
		const declared = readCheckoutRanges()
		expect(seeded.toSorted()).toStrictEqual([...seeded])
		expect(seeded.every((name) => declared[name] === undefined)).toBe(true)
		expect(seeded).not.toContain(readCheckoutName())
	})

	it('locates the nearest installed copy and refuses a package nothing installs', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			scratch.write('node_modules/shared/package.json', '{"name":"shared","version":"1.0.0"}')
			scratch.write('a/node_modules/shared/package.json', '{"name":"shared","version":"2.0.0"}')
			scratch.ensure('a/b')
			expect(locatePackage(join(scratch.path, 'a', 'b'), 'shared')).toBe(
				join(scratch.path, 'a', 'node_modules', 'shared'),
			)
			expect(locatePackage(scratch.path, 'shared')).toBe(
				join(scratch.path, 'node_modules', 'shared'),
			)
			expect(() => locatePackage(scratch.path, 'absent-package')).toThrow(
				'No installed package resolves absent-package',
			)
			expect(readInstalledRecord(join(scratch.path, 'a', 'node_modules', 'shared'))).toMatchObject({
				version: '2.0.0',
			})
			scratch.write('broken/package.json', '[]')
			expect(() => readInstalledRecord(join(scratch.path, 'broken'))).toThrow('is not a record')
		} finally {
			scratch.destroy()
		}
	})

	it('collects the fleet packages an installed package reaches through runtime and peer edges', () => {
		const closure = collectRuntimeClosure('@orkestrel/browser')
		expect(closure.toSorted()).toStrictEqual([...closure])
		expect(new Set(closure).size).toBe(closure.length)
		expect(closure.every((name) => name.startsWith('@orkestrel/'))).toBe(true)
		const direct = readInstalledRecord(locatePackage(WORKSPACE_ROOT, '@orkestrel/browser'))
		for (const section of [direct.dependencies, direct.peerDependencies]) {
			for (const name of Object.keys(section ?? {}).filter((key) =>
				key.startsWith('@orkestrel/'),
			)) {
				expect(closure.includes(name)).toBe(true)
			}
		}
	})
})

describe('the skill script fixtures', () => {
	it('names an existing script of the checkout, with a mirrored proof, for each skill script', () => {
		const paths = [
			BENCH_SCRIPT,
			BRIEF_SCRIPT,
			CITE_SCRIPT,
			COMPARE_SCRIPT,
			DISCOVERY_SCRIPT,
			LAUNCH_SCRIPT,
			LOGIN_SCRIPT,
			MAP_SCRIPT,
			PINS_SCRIPT,
			RESULT_SCRIPT,
			SWAP_SCRIPT,
			SWEEP_SCRIPT,
			WAVE_SCRIPT,
			WINDOW_SCRIPT,
		]
		expect(new Set(paths).size).toBe(paths.length)
		for (const path of paths) {
			expect(path).toMatch(/^\.agents\/skills\/orkestrel-[a-z]+\/scripts\/[a-z]+\.ts$/u)
			expect([path, existsSync(join(WORKSPACE_ROOT, path))]).toStrictEqual([path, true])
			const proof = path.replace(/^\.agents\//u, 'tests/agents/').replace(/\.ts$/u, '.test.ts')
			expect([proof, existsSync(join(WORKSPACE_ROOT, proof))]).toStrictEqual([proof, true])
		}
	})

	it('lists the wave steps once each and reads the result stream as an init and a result event', () => {
		expect(Object.isFrozen(WAVE_STEPS)).toBe(true)
		expect(new Set(WAVE_STEPS).size).toBe(WAVE_STEPS.length)
		const events = RESULT_STREAM.trimEnd()
			.split('\n')
			.map((line): unknown => JSON.parse(line))
		expect(events).toMatchObject([
			{ type: 'system', subtype: 'init', session_id: 's1' },
			{ type: 'result', result: 'READY' },
		])
		expect(SWEEP_HOURS_AGO).toBeGreaterThan(SWEEP_MINUTES_AGO)
		expect(SWEEP_MINUTES_AGO).toBeGreaterThan(0)
	})
})

describe('the whoami registry', () => {
	it('answers whoami with the user it was given, refuses uploads, and records every request', async () => {
		const registry = await createWhoamiRegistry('fixture')
		try {
			const whoami = await fetch(`${registry.url}-/whoami`)
			expect(whoami.status).toBe(200)
			expect(await whoami.json()).toStrictEqual({ username: 'fixture' })
			expect((await fetch(`${registry.url}some-package`)).status).toBe(404)
			expect(
				(await fetch(`${registry.url}some-package`, { method: 'PUT', body: '{}' })).status,
			).toBe(401)
			expect(registry.requests).toStrictEqual([
				'GET /-/whoami',
				'GET /some-package',
				'PUT /some-package',
			])
			expect(registry.port).toBe(Number(new URL(registry.url).port))
			expect(registry.requests).not.toBe(registry.requests)
		} finally {
			await registry.destroy()
		}
		await expect(fetch(registry.url)).rejects.toThrow('fetch failed')
	})

	it('refuses whoami when it was given no user', async () => {
		const registry = await createWhoamiRegistry(undefined)
		try {
			expect((await fetch(`${registry.url}-/whoami`)).status).toBe(401)
		} finally {
			await registry.destroy()
		}
	})

	it('builds the environment that routes npm to the fixture with a scratch token', async () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		const registry = await createWhoamiRegistry('fixture')
		try {
			const environment = buildWhoamiEnvironment(scratch.path, registry)
			expect(environment.npm_config_registry).toBe(registry.url)
			expect(environment.npm_config_cache).toBe(join(scratch.path, 'npm-cache'))
			expect(readFileSync(requireValue(environment.npm_config_userconfig), 'utf8')).toContain(
				`//127.0.0.1:${String(registry.port)}/:_authToken=fixture-token`,
			)
		} finally {
			await registry.destroy()
			scratch.destroy()
		}
	})
})

describe('the swap fixtures', () => {
	it('writes three built sources and a consumer whose manifests are tab-indented and format-clean', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fixture = writeSwapFixture(scratch.path)
			expect(fixture.root).toBe(scratch.path)
			for (const directory of [fixture.alpha, fixture.beta, fixture.gamma, fixture.consumer]) {
				const manifest = join(directory, 'package.json')
				expect(readFileSync(manifest, 'utf8')).toBe(
					`${JSON.stringify(readInstalledRecord(directory), null, '\t')}\n`,
				)
				expect([directory, checkFormatting(manifest)]).toStrictEqual([directory, 0])
				expect(existsSync(join(directory, 'dist', 'index.js'))).toBe(true)
			}
			expect(readInstalledRecord(fixture.alpha)).toMatchObject({
				name: '@orkestrel/swapfix-alpha',
				version: '1.0.0',
				scripts: { build: 'node build.js' },
				dependencies: { '@orkestrel/swapfix-beta': SWAP_RANGE },
			})
			expect(readInstalledRecord(fixture.beta).dependencies).toBeUndefined()
			expect(readInstalledRecord(fixture.consumer)).toMatchObject({
				dependencies: { '@orkestrel/swapfix-alpha': SWAP_RANGE },
				devDependencies: { '@orkestrel/swapfix-gamma': SWAP_RANGE },
			})
			expect(readFileSync(join(fixture.gamma, 'src.js'), 'utf8')).toBe(
				"export const name = 'gamma'\n",
			)
			const source = writeSwapSource(scratch.path, 'delta')
			expect(readInstalledRecord(source).name).toBe('@orkestrel/swapfix-delta')
			const renamed = writeSwapSource(scratch.path, 'epsilon', {
				name: '@orkestrel/swapfix-delta',
				version: '2.0.0',
				devDependencies: { '@orkestrel/swapfix-beta': SWAP_RANGE },
			})
			expect(readInstalledRecord(renamed)).toMatchObject({
				name: '@orkestrel/swapfix-delta',
				version: '2.0.0',
				scripts: { build: 'node build.js' },
				devDependencies: { '@orkestrel/swapfix-beta': SWAP_RANGE },
			})
			expect(Object.keys(readInstalledRecord(renamed))).toStrictEqual([
				'name',
				'version',
				'files',
				'type',
				'scripts',
				'devDependencies',
			])
			const plain = writeSwapPackage(scratch.path, 'plain', { private: true })
			expect(readInstalledRecord(plain)).toMatchObject({ private: true, files: ['dist'] })
			expect(existsSync(join(plain, 'build.js'))).toBe(false)
			expect(renderPackageManifest({ name: 'x' })).toBe('{\n\t"name": "x"\n}\n')
		} finally {
			scratch.destroy()
		}
	})

	it('builds an offline scratch npm environment, a registry environment, and the refusal table', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const environment = buildSwapEnvironment(scratch.path)
			expect(environment).toMatchObject({
				npm_config_offline: 'true',
				npm_config_install_links: 'false',
				npm_config_cache: join(scratch.path, 'npm-cache'),
				npm_config_userconfig: join(scratch.path, 'npmrc'),
			})
			expect(environment.npm_config_registry).toBeUndefined()
			const served = buildSwapEnvironment(scratch.path, 'http://127.0.0.1:1/')
			expect(served).toMatchObject({
				npm_config_registry: 'http://127.0.0.1:1/',
				npm_config_cache: join(scratch.path, 'npm-cache'),
			})
			expect(served.npm_config_offline).toBeUndefined()
			const refusals = buildSwapRefusals(writeSwapFixture(scratch.path), scratch.ensure('empty'))
			const lines = refusals.map(([args]) => args.join(' '))
			expect(new Set(lines).size).toBe(lines.length)
			expect(lines).toContain('')
			expect(refusals.every(([, message]) => message.length > 0)).toBe(true)
		} finally {
			scratch.destroy()
		}
	})

	it('reads a ledger row and refuses an absent ledger or an unrecorded package', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(() => readSwapEntry(scratch.path, '@orkestrel/swapfix-alpha')).toThrow('ENOENT')
			scratch.write(
				'tmp/tarballs/pins.json',
				JSON.stringify({
					packages: { '@orkestrel/swapfix-alpha': { tarball: 'a.tgz' } },
					overrides: {},
				}),
			)
			expect(readSwapEntry(scratch.path, '@orkestrel/swapfix-alpha')).toStrictEqual({
				tarball: 'a.tgz',
			})
			expect(() => readSwapEntry(scratch.path, '@orkestrel/swapfix-beta')).toThrow(
				'records no row for @orkestrel/swapfix-beta',
			)
		} finally {
			scratch.destroy()
		}
	})

	it('reports a nonzero formatter exit for a manifest the formatter would rewrite', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const sorted = scratch.write(
				'sorted/package.json',
				renderPackageManifest({ name: 'x', version: '1.0.0' }),
			)
			const unsorted = scratch.write(
				'unsorted/package.json',
				renderPackageManifest({ version: '1.0.0', name: 'x' }),
			)
			expect(checkFormatting(sorted)).toBe(0)
			expect(checkFormatting(unsorted)).not.toBe(0)
		} finally {
			scratch.destroy()
		}
	})

	it('serves packuments and archives for the packages it publishes, and answers every other read 404', async () => {
		const session = await createSwapSession(SCRATCH_PREFIX, (root) => [
			writeSwapSource(root, 'beta2', { name: '@orkestrel/swapfix-beta', version: '2.0.0' }),
		])
		try {
			const base = session.registry.url
			expect(base.startsWith('http://127.0.0.1:')).toBe(true)
			const missing = await fetch(`${base}@orkestrel%2fswapfix-absent`)
			expect(missing.status).toBe(404)
			const response = await fetch(`${base}@orkestrel%2fswapfix-beta`)
			expect(response.status).toBe(200)
			const packument: unknown = await response.json()
			expect(packument).toMatchObject({
				name: '@orkestrel/swapfix-beta',
				'dist-tags': { latest: '2.0.0' },
				versions: {
					'1.0.0': { version: '1.0.0', dependencies: {} },
					'2.0.0': { version: '2.0.0' },
				},
			})
			const alpha: unknown = await (await fetch(`${base}@orkestrel%2fswapfix-alpha`)).json()
			const archiveUrl = `${base}@orkestrel/swapfix-alpha/-/swapfix-alpha-1.0.0.tgz`
			const archive = new Uint8Array(await (await fetch(archiveUrl)).arrayBuffer())
			expect(archive.byteLength).toBeGreaterThan(0)
			expect(alpha).toMatchObject({
				versions: {
					'1.0.0': {
						dependencies: { '@orkestrel/swapfix-beta': SWAP_RANGE },
						dist: {
							tarball: archiveUrl,
							shasum: createHash('sha1').update(archive).digest('hex'),
							integrity: `sha512-${createHash('sha512').update(archive).digest('base64')}`,
						},
					},
				},
			})
			expect(
				buildSwapPackument([], '@orkestrel/swapfix-alpha', 'http://127.0.0.1:1'),
			).toBeUndefined()
			expect(existsSync(join(session.scratch.path, 'registry'))).toBe(true)
		} finally {
			await session.destroy()
		}
		expect(existsSync(session.scratch.path)).toBe(false)
		const failing = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			await expect(
				createSwapRegistry(failing.path, [join(failing.path, 'absent')]),
			).rejects.toThrow('The swap fixture pack in')
		} finally {
			failing.destroy()
		}
	}, 60_000)

	it('lists the local dependency specs npm resolves on the host apart from the remote specs it fetches', () => {
		const local = buildSwapLocalSpecs()
		const remote = buildSwapRemoteSpecs()
		const localSpecs = local.map(([, spec]) => spec)
		const remoteSpecs = remote.map(([, spec]) => spec)
		expect(new Set(local.map(([field, spec]) => `${field} ${spec}`)).size).toBe(local.length)
		expect(new Set(remote.map(([field, spec]) => `${field} ${spec}`)).size).toBe(remote.length)
		expect(localSpecs.filter((spec) => remoteSpecs.includes(spec))).toStrictEqual([])
		expect(localSpecs).toEqual(
			expect.arrayContaining([
				'file:tmp/tarballs/missing.tgz',
				'tmp/tarballs/missing.tgz',
				'missing.tgz',
				'vendor/archives/pack.tar.gz',
				'archive.tar',
				'~/other',
				'.hidden',
				'D:other',
			]),
		)
		expect(remoteSpecs).toEqual(
			expect.arrayContaining([
				'orkestrel/other',
				'orkestrel/other.tgz',
				'github:orkestrel/other',
				'git+https://example.invalid/other.git',
				'npm:other@^1.0.0',
				'latest',
				'https://registry.invalid/other/-/other-1.0.0.tgz',
			]),
		)
		expect(local.map(([field]) => field)).toContain('overrides')
		expect(remote.map(([field]) => field)).toContain('peerDependencies')
	})

	it('lists ledger keys the restore must refuse as package names apart from keys it must accept', () => {
		const invalid = buildSwapInvalidNames('/scratch')
		const valid = buildSwapValidNames()
		expect(new Set(invalid).size).toBe(invalid.length)
		expect(new Set(valid).size).toBe(valid.length)
		expect(invalid.filter((name) => valid.includes(name))).toStrictEqual([])
		expect(invalid).toEqual(
			expect.arrayContaining([
				'../closure-sentinel',
				'..\\closure-sentinel',
				'/scratch/consumer/closure-sentinel',
				'C:/closure-sentinel',
				'@orkestrel/../../closure-sentinel',
				'',
			]),
		)
		expect(valid).toEqual(expect.arrayContaining(['left-pad', '@orkestrel/other.js']))
	})

	it('adds a row to one ledger block and refuses a text that holds no such block', () => {
		const text = `${JSON.stringify({ packages: { a: { tarball: 'a.tgz' } }, overrides: {} }, null, '\t')}\n`
		const added = appendSwapLedgerRow(text, 'overrides', '../x', { value: '*' })
		expect(added).toBe(
			`${JSON.stringify({ packages: { a: { tarball: 'a.tgz' } }, overrides: { '../x': { value: '*' } } }, null, '\t')}\n`,
		)
		expect(appendSwapLedgerRow(text, 'packages', 'b', { tarball: 'b.tgz' })).toContain('"b"')
		expect(() => appendSwapLedgerRow('{}', 'overrides', 'x', {})).toThrow(
			'The swap ledger holds no overrides block',
		)
		expect(() => appendSwapLedgerRow('[]', 'packages', 'x', {})).toThrow(
			'The swap ledger holds no packages block',
		)
	})

	it('locks a manifest against replacement, reports whether the host honors the lock, and unlocks it', () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const manifest = scratch.write('lock/package.json', '{}\n')
			const locked = lockManifest(manifest)
			expect(locked).toBe(probeManifestLock())
			unlockManifest(manifest)
			const temporary = scratch.write('lock/package.json.next', '{"name":"x"}\n')
			renameSync(temporary, manifest)
			expect(readFileSync(manifest, 'utf8')).toBe('{"name":"x"}\n')
			expect(existsSync(`${manifest}.lock.tmp`)).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('throws with the install error when a fixture install fails', async () => {
		const scratch = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const broken = writeSwapPackage(scratch.path, 'broken', {
				dependencies: {
					'@orkestrel/swapfix-absent': `file:${join(scratch.path, 'absent').split('\\').join('/')}.tgz`,
				},
			})
			await expect(installSwapFixture(broken, buildSwapEnvironment(scratch.path))).rejects.toThrow(
				`The swap fixture install in ${broken} failed`,
			)
		} finally {
			scratch.destroy()
		}
	}, 60_000)
})
