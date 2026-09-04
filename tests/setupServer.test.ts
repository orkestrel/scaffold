import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { requireValue } from '@orkestrel/test'
import { createScratch } from '@orkestrel/test/server'
import { ScaffoldError } from '@src/core'
import { buildSnapshot } from './setup.js'
import {
	AUDIT_EXIT_CASES,
	buildBoundaryCases,
	buildCheckoutManifest,
	buildCLIOptions,
	buildCompiledPlan,
	buildFleetManifest,
	buildHostManifest,
	buildInstalledHostReplies,
	buildInventory,
	buildManifestEntry,
	buildMaterializerOptions,
	buildOptionArgv,
	buildOrganization,
	buildPackument,
	buildServerGuardCases,
	buildStagedManifest,
	buildTargetAudit,
	buildTargetManifest,
	buildUpstreamOptions,
	buildVendoredManifest,
	buildVendoredPlan,
	buildVendoredSnapshot,
	buildWorktree,
	CASE_FOLDING,
	CATALOG_AGENT_ROWS_TEXT,
	CATALOG_AGENT_TEXT,
	COMMAND_CASES,
	commitFiles,
	CORE_GENERATED,
	CORE_GENERATED_COUNT,
	createCatalogFleet,
	createCheckout,
	createFleet,
	createHostRoot,
	createRepository,
	createSink,
	createStagedHost,
	createUpstreamServer,
	DIGEST_CASES,
	FILESYSTEM_PATH_CASES,
	FLEET_ARTIFACT_COUNT,
	FLEET_BIRTH_COUNT,
	FLEET_BIRTH_PATHS,
	FLEET_UPSTREAM_PATHS,
	GIT_PATH_CASES,
	HOST_DIRECTORY_PATHS,
	HOSTILE_ARGUMENT,
	HOSTILE_BYTES,
	listExecutablePaths,
	omitDependencies,
	PROTECTED_PATH_CASES,
	readErrorCode,
	readErrorMessage,
	readRejectionCode,
	REFUSED_MANIFEST_TEXT,
	SCRATCH_PREFIX,
	SENSITIVE_PATH_CASES,
	STAGED_PATHS,
	STORAGE_PATH_CASES,
	TARGET_DEV_DEPENDENCIES,
	TARGET_MANIFEST_TEXT,
	trackFiles,
	UPSTREAM_ENDPOINT_CASES,
	UPSTREAM_PATHS,
	USAGE_CASES,
	VENDORED_FILES,
	WORKSPACE_ROOT,
} from './setupServer.js'

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
			expect(workspace.path.includes(SCRATCH_PREFIX)).toBe(true)
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

	it('carries an arbitrary digest on the guard fixture and a membership digest on the staged one', () => {
		// A guard reads digest syntax alone, so the guard fixture's digest is fixed and
		// its membership is free; a reader verifies the digest against the membership
		// beside it, so the staged fixture's digest moves with what it declares.
		expect(buildHostManifest({ entries: [], roots: [] }).digest).toBe(buildHostManifest().digest)
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

	it('declares one file entry per planned path and no root at all in the fleet manifest', () => {
		const manifest = buildFleetManifest()
		expect(manifest.roots).toStrictEqual([])
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
	})

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
				expect(workspace.read(`checkout/${entry.destination}`)).toBe(`${entry.destination}\n`)
			}
			expect(manifest.entries.some((entry) => entry.executable)).toBe(true)
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
			readErrorCode(() => {
				throw new ScaffoldError('INVALID', 'A refused option bag')
			}),
		).toBe('INVALID')
		expect(
			readErrorMessage(() => {
				throw new ScaffoldError('TARGET', 'A missing target')
			}),
		).toBe('A missing target')
		// Both non-refusals answer undefined, so a case naming a code fails on either
		// rather than passing because nothing was raised.
		expect(
			readErrorCode(() => {
				throw new Error('plain')
			}),
		).toBe(undefined)
		expect(
			readErrorMessage(() => {
				throw new Error('plain')
			}),
		).toBe(undefined)
		expect(readErrorCode(() => 'a returned value')).toBe(undefined)
		expect(readErrorMessage(() => 'a returned value')).toBe(undefined)
	})

	it('reports the code of an asynchronous scaffold refusal, and undefined for every other outcome', async () => {
		expect(
			await readRejectionCode(() => Promise.reject(new ScaffoldError('FETCH', 'A refused read'))),
		).toBe('FETCH')
		expect(await readRejectionCode(() => Promise.reject(new Error('plain')))).toBe(undefined)
		expect(await readRejectionCode(() => Promise.resolve('a resolved value'))).toBe(undefined)
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

	it('answers the committed inventory and every host-owned path, and leaves a deferred path absent', () => {
		const replies = buildInstalledHostReplies()
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
		expect(FLEET_ARTIFACT_COUNT).toBe(buildFleetManifest().entries.length + CORE_GENERATED_COUNT)
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
		expect(paths).toContain('scripts/codex.sh')
		expect(vendored.groups).toStrictEqual(['manifest', 'docs', 'orchestration', 'guides'])
		expect(buildVendoredPlan({ groups: ['docs'] }).artifacts).toStrictEqual(vendored.artifacts)
	})
})
