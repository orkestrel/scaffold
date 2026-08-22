import type { Copy, Mirror, Release, Snapshot } from '@src/core'
import { gzipSync } from 'node:zlib'
import { contentToHex, MAX_ARTIFACT_BYTES, MAX_COLLECTION_ITEMS } from '@src/core'
import {
	computeDigest,
	computeManifestDigest,
	hexToDigest,
	pathToStorage,
	Upstream,
} from '@src/server'
import { describe, expect, it } from 'vitest'
import { isRecord } from '@orkestrel/contract'
import { createRecorder } from '@orkestrel/test'
import { buildDependency } from '../../setup.js'
import {
	buildInventory,
	buildManifestEntry,
	buildOrganization,
	buildPackument,
	buildVendoredSnapshot,
	createUpstreamServer,
	FLEET_UPSTREAM_PATHS,
	readErrorCode,
	readRejectionCode,
	UPSTREAM_ENDPOINT_CASES,
	UPSTREAM_PATHS,
	VENDORED_FILES,
} from '../../setupServer.js'

describe('Upstream construction', () => {
	it('refuses an option bag that is not the exact shape', () => {
		// The closed-record and ceiling refusals are the option guard's own law and
		// are measured against it in `validators.test.ts`; what is measured here is
		// that the constructor consults that guard at all.
		expect(readErrorCode(() => new Upstream({ concurrency: 0 }))).toBe('INVALID')
		expect(readErrorCode(() => new Upstream({ repository: { branch: 'main/../etc' } }))).toBe(
			'INVALID',
		)
		expect(readErrorCode(() => new Upstream({ retries: 1.5 }))).toBe('INVALID')
	})

	it('decides the scheme and host law the endpoint guard leaves to it', () => {
		for (const endpoint of UPSTREAM_ENDPOINT_CASES) {
			const repository = readErrorCode(() => new Upstream({ repository: { base: endpoint.base } }))
			const registry = readErrorCode(() => new Upstream({ registry: { base: endpoint.base } }))
			expect([endpoint.label, repository]).toStrictEqual([
				endpoint.label,
				endpoint.accepted ? undefined : 'INVALID',
			])
			expect([endpoint.label, registry]).toStrictEqual([
				endpoint.label,
				endpoint.accepted ? undefined : 'INVALID',
			])
		}
	})

	it('publishes teardown once and tears down idempotently', () => {
		const recorder = createRecorder<readonly []>()
		const upstream = new Upstream({ on: { destroy: recorder.handler } })
		expect(upstream.emitter.destroyed).toBe(false)
		upstream.destroy()
		upstream.destroy()
		expect(upstream.emitter.destroyed).toBe(true)
		expect(recorder.count).toBe(1)
	})

	it('refuses every call after teardown', async () => {
		const upstream = new Upstream()
		upstream.destroy()
		expect(await readRejectionCode(() => upstream.lookup([]))).toBe('DESTROYED')
		expect(await readRejectionCode(() => upstream.fetch([], {}))).toBe('DESTROYED')
		expect(await readRejectionCode(() => upstream.catalog())).toBe('DESTROYED')
	})
})

describe('Upstream lookup', () => {
	it('selects the newest published version the declared range admits', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: {
				status: 200,
				body: JSON.stringify({
					'dist-tags': { latest: '2.0.0' },
					versions: { '1.0.0': {}, '2.0.0': {}, '1.4.0': {} },
				}),
			},
		})
		const upstream = new Upstream({ registry: { base: server.base } })
		try {
			const [release] = await upstream.lookup([
				buildDependency({ name: '@orkestrel/router', range: '^1.0.0' }),
			])
			expect(release?.latest).toBe('1.4.0')
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('selects the newest published version for an unbounded range', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: {
				status: 200,
				body: JSON.stringify({
					'dist-tags': { latest: '1.4.0' },
					versions: { '1.0.0': {}, '2.0.0': {}, '1.4.0': {} },
				}),
			},
		})
		const upstream = new Upstream({ registry: { base: server.base } })
		try {
			const [release] = await upstream.lookup([
				buildDependency({ name: '@orkestrel/router', range: '*' }),
			])
			expect(release?.latest).toBe('2.0.0')
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('selects before applying the public collection bound', async () => {
		const versions = Object.fromEntries(
			Array.from({ length: MAX_COLLECTION_ITEMS + 1 }, (_, index) => [`1.0.${String(index)}`, {}]),
		)
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: {
				status: 200,
				body: JSON.stringify({
					'dist-tags': { latest: `1.0.${String(MAX_COLLECTION_ITEMS)}` },
					versions,
				}),
			},
		})
		const upstream = new Upstream({ registry: { base: server.base } })
		try {
			const [release] = await upstream.lookup([
				buildDependency({ name: '@orkestrel/router', range: '^1.0.0' }),
			])
			expect(release?.latest).toBe(`1.0.${String(MAX_COLLECTION_ITEMS)}`)
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('falls back to the latest tag when the version map is absent', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: {
				status: 200,
				body: JSON.stringify({ 'dist-tags': { latest: '1.4.0' } }),
			},
		})
		const upstream = new Upstream({ registry: { base: server.base } })
		try {
			const [release] = await upstream.lookup([
				buildDependency({ name: '@orkestrel/router', range: '^1.0.0' }),
			])
			expect(release?.latest).toBe('1.4.0')
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('never crosses the declared major when the version map is absent', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: {
				status: 200,
				body: JSON.stringify({ 'dist-tags': { latest: '2.0.0' } }),
			},
		})
		const upstream = new Upstream({ registry: { base: server.base } })
		try {
			const [release] = await upstream.lookup([
				buildDependency({ name: '@orkestrel/router', range: '^1.0.0' }),
			])
			expect(release?.lookup).toBe('failed')
			expect(release?.latest).toBe(undefined)
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('reports the registry latest for each declared dependency, publishing each verdict whole', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: { status: 200, body: buildPackument('0.0.8') },
			[UPSTREAM_PATHS.emitter]: { status: 200, body: buildPackument('0.0.5') },
		})
		const recorder = createRecorder<readonly [Release]>()
		const upstream = new Upstream({
			registry: { base: server.base },
			on: { release: recorder.handler },
		})
		try {
			const releases = await upstream.lookup([
				buildDependency({ name: '@orkestrel/router', range: '^0.0.8' }),
				buildDependency({ name: '@orkestrel/emitter', range: '^0.0.5' }),
			])
			expect(releases).toStrictEqual([
				{
					name: '@orkestrel/router',
					range: '^0.0.8',
					lookup: 'found',
					latest: '0.0.8',
					major: 0,
				},
				{
					name: '@orkestrel/emitter',
					range: '^0.0.5',
					lookup: 'found',
					latest: '0.0.5',
					major: 0,
				},
			])
			expect(recorder.calls.map(([release]) => release)).toStrictEqual([...releases])
			expect(server.paths).toStrictEqual([UPSTREAM_PATHS.router, UPSTREAM_PATHS.emitter])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('holds a definite absence apart from a transport fault and keeps the rest of the answer', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: { status: 200, body: buildPackument('0.0.8') },
			[UPSTREAM_PATHS.emitter]: { status: 404, body: '{"error":"Not found"}' },
			[UPSTREAM_PATHS.console]: { status: 500, body: '{"error":"Internal"}' },
		})
		const recorder = createRecorder<readonly [unknown]>()
		const upstream = new Upstream({
			registry: { base: server.base },
			concurrency: 1,
			on: { error: recorder.handler },
		})
		try {
			const releases = await upstream.lookup([
				buildDependency({ name: '@orkestrel/emitter', range: '^0.0.5' }),
				buildDependency({ name: '@orkestrel/console', range: '^0.0.4' }),
				buildDependency({ name: '@orkestrel/router', range: '^0.0.8' }),
			])
			expect(releases.map((release) => release.lookup)).toStrictEqual([
				'missing',
				'failed',
				'found',
			])
			expect(releases[0]?.note).toBe('HTTP 404')
			expect(releases[1]?.note).toBe('HTTP 500')
			expect(releases[2]?.latest).toBe('0.0.8')
			// The definite absence is an answer, so only the transport fault is
			// published as a fault.
			expect(recorder.count).toBe(1)
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('reports an answer that carries no readable latest version as a failed lookup', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: { status: 200, body: '{"name":"@orkestrel/router"}' },
			[UPSTREAM_PATHS.emitter]: { status: 200, body: 'not json at all' },
			[UPSTREAM_PATHS.console]: { status: 200, body: '{"dist-tags":{"latest":"0.0.4"}}' },
		})
		const upstream = new Upstream({ registry: { base: server.base } })
		try {
			const releases = await upstream.lookup([
				buildDependency({ name: '@orkestrel/router', range: '^0.0.8' }),
				buildDependency({ name: '@orkestrel/emitter', range: '^0.0.5' }),
				buildDependency({ name: '@orkestrel/console', range: '^0.0.4' }),
			])
			for (const release of releases) {
				expect(release.lookup).toBe('failed')
				expect(release.latest).toBe(undefined)
				expect(release.note).toBe('the answer carries no readable latest version')
			}
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('answers in input order however the reads interleaved', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.console]: { status: 200, body: buildPackument('0.0.4'), delay: 40 },
			[UPSTREAM_PATHS.emitter]: { status: 200, body: buildPackument('0.0.5') },
			[UPSTREAM_PATHS.router]: { status: 200, body: buildPackument('0.0.8') },
		})
		const recorder = createRecorder<readonly [Release]>()
		const upstream = new Upstream({
			registry: { base: server.base },
			concurrency: 3,
			on: { release: recorder.handler },
		})
		try {
			const releases = await upstream.lookup([
				buildDependency({ name: '@orkestrel/console', range: '^0.0.4' }),
				buildDependency({ name: '@orkestrel/emitter', range: '^0.0.5' }),
				buildDependency({ name: '@orkestrel/router', range: '^0.0.8' }),
			])
			expect(releases.map((release) => release.name)).toStrictEqual([
				'@orkestrel/console',
				'@orkestrel/emitter',
				'@orkestrel/router',
			])
			// The claim is falsifiable only because the reads genuinely overlapped:
			// the deliberately slow first name settles last on the channel while it
			// still leads the answer.
			expect(recorder.calls.at(-1)?.[0].name).toBe('@orkestrel/console')
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('refuses input that is not a bounded list of declared dependencies', async () => {
		const upstream = new Upstream()
		try {
			expect(await readRejectionCode(() => upstream.lookup([buildDependency({ name: '' })]))).toBe(
				'INVALID',
			)
			expect(
				await readRejectionCode(() =>
					upstream.lookup(
						Array.from({ length: MAX_COLLECTION_ITEMS + 1 }, () => buildDependency()),
					),
				),
			).toBe('INVALID')
		} finally {
			upstream.destroy()
		}
	})

	it('answers an empty selection without addressing anything', async () => {
		const server = await createUpstreamServer({})
		const upstream = new Upstream({
			registry: { base: server.base },
			repository: { base: server.base },
		})
		try {
			expect(await upstream.lookup([])).toStrictEqual([])
			expect(await upstream.fetch([], {})).toStrictEqual([])
			expect(server.paths).toStrictEqual([])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('reports an answer that carries no body at all as a failed lookup', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: { status: 204, body: '' },
		})
		const upstream = new Upstream({ registry: { base: server.base } })
		try {
			const [release] = await upstream.lookup([buildDependency({ name: '@orkestrel/router' })])
			expect(release?.lookup).toBe('failed')
			// The status rather than the unreadable-version note: a server that
			// declined to send a representation said something a caller can act on,
			// and reporting it as unreadable content would name the wrong cause.
			expect(release?.note).toBe('HTTP 204, and the answer carries no body')
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('addresses one package however the declared name is spelled', async () => {
		// A declared dependency name is bounded and non-empty and otherwise the
		// caller's text, so the escape it could express is measured directly. The
		// control is the address itself: an unencoded name would be normalized to
		// `/etc` before the request left, and the fixture records what arrived.
		const server = await createUpstreamServer({})
		const upstream = new Upstream({ registry: { base: server.base }, concurrency: 1 })
		try {
			await upstream.lookup([
				buildDependency({ name: '../../etc', range: '^1.0.0' }),
				buildDependency({ name: 'router?tag=beta', range: '^1.0.0' }),
			])
			expect(server.paths).toStrictEqual(['/..%2F..%2Fetc', '/router%3Ftag%3Dbeta'])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})
})

describe('Upstream fetch', () => {
	it('fetches the canonical raw guide path and carries the local bytes through', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.guide]: { status: 200, body: '# Router\n', type: 'text/plain' },
		})
		const recorder = createRecorder<readonly [Mirror]>()
		const upstream = new Upstream({
			repository: { base: server.base },
			on: { mirror: recorder.handler },
		})
		try {
			const observed = contentToHex('# Router (local)\n')
			const mirrors = await upstream.fetch(['@orkestrel/router'], { 'guides/router.md': observed })
			expect(mirrors).toStrictEqual([
				{
					name: '@orkestrel/router',
					path: 'guides/router.md',
					lookup: 'found',
					content: '# Router\n',
					observed,
				},
			])
			expect(server.paths).toStrictEqual([UPSTREAM_PATHS.guide])
			expect(recorder.count).toBe(1)
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('addresses the configured branch and carries observed bytes through a failed lookup', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.branched]: { status: 503, body: '{"error":"Unavailable"}' },
		})
		const upstream = new Upstream({ repository: { base: server.base, branch: 'release/0.1.x' } })
		try {
			const observed = contentToHex('# Router (local)\n')
			const mirrors = await upstream.fetch(['@orkestrel/router'], { 'guides/router.md': observed })
			expect(mirrors).toStrictEqual([
				{
					name: '@orkestrel/router',
					path: 'guides/router.md',
					lookup: 'failed',
					note: 'HTTP 503',
					observed,
				},
			])
			expect(server.paths).toStrictEqual([UPSTREAM_PATHS.branched])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('reports a status carrying no representation as a failed mirror, never an empty guide', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.guide]: { status: 204, body: '' },
			[FLEET_UPSTREAM_PATHS.mirrors.emitter]: { status: 205, body: '' },
		})
		const upstream = new Upstream({ repository: { base: server.base } })
		try {
			const observed = contentToHex('# Router (local)\n')
			const mirrors = await upstream.fetch(['@orkestrel/router', '@orkestrel/emitter'], {
				'guides/router.md': observed,
			})
			// `found` with no content is the reader asserting upstream's guide is a
			// zero-byte file, which is a different claim from the one these statuses
			// make. The local bytes still ride through, as they do for any failure.
			expect(mirrors).toStrictEqual([
				{
					name: '@orkestrel/router',
					path: 'guides/router.md',
					lookup: 'failed',
					note: 'HTTP 204, and the answer carries no body',
					observed,
				},
				{
					name: '@orkestrel/emitter',
					path: 'guides/emitter.md',
					lookup: 'failed',
					note: 'HTTP 205, and the answer carries no body',
				},
			])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('reports a genuinely empty guide as found, carrying no bytes', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.guide]: { status: 200, body: '', type: 'text/plain' },
		})
		const upstream = new Upstream({ repository: { base: server.base } })
		try {
			// The control the refusal above is measured against, drawn from the
			// population it must not reach: a real zero-byte file is an answer, and a
			// `200` carrying it still reads as one.
			expect(await upstream.fetch(['@orkestrel/router'], {})).toStrictEqual([
				{ name: '@orkestrel/router', path: 'guides/router.md', lookup: 'found', content: '' },
			])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('omits observed bytes for a mirror the target does not hold', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.guide]: { status: 404, body: '404: Not Found', type: 'text/plain' },
		})
		const upstream = new Upstream({ repository: { base: server.base } })
		try {
			const mirrors = await upstream.fetch(['@orkestrel/router'], {})
			expect(mirrors).toStrictEqual([
				{
					name: '@orkestrel/router',
					path: 'guides/router.md',
					lookup: 'missing',
					note: 'HTTP 404',
				},
			])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('refuses names and local bytes that are not the exact shape', async () => {
		const upstream = new Upstream()
		try {
			expect(await readRejectionCode(() => upstream.fetch(['router'], {}))).toBe('INVALID')
			expect(
				await readRejectionCode(() =>
					upstream.fetch(['@orkestrel/router'], { 'guides/router.md': 'not hex' }),
				),
			).toBe('INVALID')
			expect(
				await readRejectionCode(() =>
					upstream.fetch(['@orkestrel/router'], { '../secrets': contentToHex('x') }),
				),
			).toBe('INVALID')
		} finally {
			upstream.destroy()
		}
	})
})

describe('Upstream vendor', () => {
	it('reads the inventory once and answers an aligned target from its own bytes', async () => {
		const files = [VENDORED_FILES.agents, VENDORED_FILES.license, VENDORED_FILES.orchestration]
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.vendored.inventory]: { status: 200, body: buildInventory(files) },
			[UPSTREAM_PATHS.vendored.agents]: {
				status: 200,
				body: VENDORED_FILES.agents.content,
				type: 'text/plain',
			},
			[UPSTREAM_PATHS.vendored.license]: {
				status: 200,
				body: VENDORED_FILES.license.content,
				type: 'text/plain',
			},
			[UPSTREAM_PATHS.vendored.orchestration]: {
				status: 200,
				body: VENDORED_FILES.orchestration.content,
				type: 'text/plain',
			},
		})
		const recorder = createRecorder<readonly [Copy]>()
		const upstream = new Upstream({
			repository: { base: server.base },
			on: { copy: recorder.handler },
		})
		try {
			const current = buildVendoredSnapshot(files)
			const copies = await upstream.vendor(
				files.map((file) => file.path),
				current,
			)
			expect(copies).toStrictEqual(
				files.map((file) => ({
					path: file.path,
					lookup: 'found',
					content: file.content,
					observed: current[file.path],
				})),
			)
			// Every blob route is scripted, so a reader that requested one anyway
			// would be answered rather than refused. The fixture's arrival list is
			// what proves the aligned rows cost nothing: only the inventory arrived.
			expect(server.paths).toStrictEqual([UPSTREAM_PATHS.vendored.inventory])
			expect(recorder.count).toBe(files.length)
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('requests only the path whose bytes moved', async () => {
		const files = [VENDORED_FILES.agents, VENDORED_FILES.license]
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.vendored.inventory]: { status: 200, body: buildInventory(files) },
			[UPSTREAM_PATHS.vendored.agents]: {
				status: 200,
				body: VENDORED_FILES.agents.content,
				type: 'text/plain',
			},
			[UPSTREAM_PATHS.vendored.license]: {
				status: 200,
				body: VENDORED_FILES.license.content,
				type: 'text/plain',
			},
		})
		const upstream = new Upstream({ repository: { base: server.base }, concurrency: 1 })
		try {
			const current: Snapshot = {
				...buildVendoredSnapshot(files),
				[VENDORED_FILES.agents.path]: contentToHex('# Agents (local)\n'),
			}
			const copies = await upstream.vendor(
				files.map((file) => file.path),
				current,
			)
			expect(copies).toStrictEqual([
				{
					path: VENDORED_FILES.agents.path,
					lookup: 'found',
					content: VENDORED_FILES.agents.content,
					observed: current[VENDORED_FILES.agents.path],
				},
				{
					path: VENDORED_FILES.license.path,
					lookup: 'found',
					content: VENDORED_FILES.license.content,
					observed: current[VENDORED_FILES.license.path],
				},
			])
			expect(server.paths).toStrictEqual([
				UPSTREAM_PATHS.vendored.inventory,
				UPSTREAM_PATHS.vendored.agents,
			])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('fails every row and requests no file when the inventory produces no answer', async () => {
		const files = [VENDORED_FILES.agents, VENDORED_FILES.license]
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.vendored.inventory]: { status: 503, body: '{"error":"Unavailable"}' },
			[UPSTREAM_PATHS.vendored.agents]: { status: 200, body: VENDORED_FILES.agents.content },
			[UPSTREAM_PATHS.vendored.license]: { status: 200, body: VENDORED_FILES.license.content },
		})
		const upstream = new Upstream({ repository: { base: server.base }, concurrency: 1 })
		try {
			// The target is aligned on every path, so a reader deciding rows one at a
			// time would answer them all found without ever reading the inventory. A
			// whole failed answer is what leaves the caller one baseline to take.
			const copies = await upstream.vendor(
				files.map((file) => file.path),
				buildVendoredSnapshot(files),
			)
			expect(copies.map((copy) => copy.lookup)).toStrictEqual(['failed', 'failed'])
			for (const copy of copies) expect(copy.note).toContain('produced no answer: HTTP 503')
			expect(server.paths).toStrictEqual([UPSTREAM_PATHS.vendored.inventory])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('reports an unpublished inventory as a definite absence it never retries', async () => {
		const files = [VENDORED_FILES.agents, VENDORED_FILES.license]
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.vendored.agents]: { status: 200, body: VENDORED_FILES.agents.content },
		})
		const upstream = new Upstream({
			repository: { base: server.base },
			retries: 2,
			concurrency: 1,
		})
		try {
			const copies = await upstream.vendor(
				files.map((file) => file.path),
				{},
			)
			expect(copies.map((copy) => copy.lookup)).toStrictEqual(['missing', 'missing'])
			for (const copy of copies) expect(copy.note).toContain('is not published there')
			// The control is the retry count: a transport fault at this endpoint would
			// have arrived three times, so one arrival proves the reader read the
			// `404` as an answer rather than as a fault worth asking again.
			expect(server.paths).toStrictEqual([UPSTREAM_PATHS.vendored.inventory])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('fails every row when the inventory does not read back as a manifest', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.vendored.inventory]: { status: 200, body: '{"entries":' },
		})
		const upstream = new Upstream({ repository: { base: server.base } })
		try {
			const copies = await upstream.vendor([VENDORED_FILES.agents.path], {})
			expect(copies.map((copy) => copy.lookup)).toStrictEqual(['failed'])
			expect(copies[0]?.note).toContain('is not a readable manifest')
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('fails every row when the inventory does not match its own membership digest', async () => {
		const declared: unknown = JSON.parse(buildInventory([VENDORED_FILES.agents]))
		const tampered = JSON.stringify({
			...(isRecord(declared) ? declared : {}),
			entries: [
				buildManifestEntry({
					storage: pathToStorage(VENDORED_FILES.license.path),
					destination: VENDORED_FILES.license.path,
					digest: computeDigest(VENDORED_FILES.license.content),
				}),
			],
		})
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.vendored.inventory]: { status: 200, body: tampered },
			[UPSTREAM_PATHS.vendored.license]: { status: 200, body: VENDORED_FILES.license.content },
		})
		const upstream = new Upstream({ repository: { base: server.base } })
		try {
			// The membership moved and the manifest's own claim about it did not, so
			// the digest the reader recomputes disagrees with the one it was handed.
			// The control is the untampered body: the same builder produced a digest
			// this reader accepts in every other row here.
			const copies = await upstream.vendor([VENDORED_FILES.license.path], {})
			expect(copies.map((copy) => copy.lookup)).toStrictEqual(['failed'])
			expect(copies[0]?.note).toContain('does not match its own membership digest')
			expect(server.paths).toStrictEqual([UPSTREAM_PATHS.vendored.inventory])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('reports a path the inventory does not name as missing, without requesting it', async () => {
		const files = [VENDORED_FILES.agents]
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.vendored.inventory]: { status: 200, body: buildInventory(files) },
			[UPSTREAM_PATHS.vendored.license]: { status: 200, body: VENDORED_FILES.license.content },
		})
		const upstream = new Upstream({ repository: { base: server.base }, concurrency: 1 })
		try {
			const copies = await upstream.vendor(
				[VENDORED_FILES.agents.path, VENDORED_FILES.license.path],
				buildVendoredSnapshot(files),
			)
			expect(copies.map((copy) => copy.lookup)).toStrictEqual(['found', 'missing'])
			expect(copies[1]?.note).toContain(`does not name ${VENDORED_FILES.license.path}`)
			// The route is scripted and would have answered, so its absence from the
			// arrival list is the reader declining to ask rather than the fixture
			// refusing.
			expect(server.paths).toStrictEqual([UPSTREAM_PATHS.vendored.inventory])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('fails a row the inventory names twice, and answers the rest', async () => {
		const doubled = [
			VENDORED_FILES.agents,
			{ path: VENDORED_FILES.agents.path, content: '# Agents (other)\n' },
			VENDORED_FILES.license,
		]
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.vendored.inventory]: { status: 200, body: buildInventory(doubled) },
			[UPSTREAM_PATHS.vendored.agents]: { status: 200, body: VENDORED_FILES.agents.content },
			[UPSTREAM_PATHS.vendored.license]: { status: 200, body: VENDORED_FILES.license.content },
		})
		const upstream = new Upstream({ repository: { base: server.base }, concurrency: 1 })
		try {
			const copies = await upstream.vendor(
				[VENDORED_FILES.agents.path, VENDORED_FILES.license.path],
				{},
			)
			expect(copies.map((copy) => copy.lookup)).toStrictEqual(['failed', 'found'])
			expect(copies[0]?.note).toContain(`names ${VENDORED_FILES.agents.path} more than once`)
			expect(server.paths).toStrictEqual([
				UPSTREAM_PATHS.vendored.inventory,
				UPSTREAM_PATHS.vendored.license,
			])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('fails a row whose served bytes do not hash to the digest the inventory declares', async () => {
		const files = [VENDORED_FILES.agents]
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.vendored.inventory]: { status: 200, body: buildInventory(files) },
			[UPSTREAM_PATHS.vendored.agents]: { status: 200, body: '# Agents (substituted)\n' },
		})
		const upstream = new Upstream({ repository: { base: server.base } })
		try {
			const copies = await upstream.vendor([VENDORED_FILES.agents.path], {})
			expect(copies.map((copy) => copy.lookup)).toStrictEqual(['failed'])
			expect(copies[0]?.note).toContain('do not match the digest the inventory declares')
			expect(copies[0]?.content).toBeUndefined()
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('fails a row whose body passes the response limit', async () => {
		const oversized = {
			path: VENDORED_FILES.agents.path,
			content: `# Agents\n${'a'.repeat(2_000)}\n`,
		}
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.vendored.inventory]: { status: 200, body: buildInventory([oversized]) },
			[UPSTREAM_PATHS.vendored.agents]: { status: 200, body: oversized.content },
		})
		const upstream = new Upstream({ repository: { base: server.base }, limit: 1_000 })
		try {
			// The inventory is well under the limit and the file is well over it, so
			// the limit refuses the blob alone rather than the whole call.
			const copies = await upstream.vendor([oversized.path], {})
			expect(copies.map((copy) => copy.lookup)).toStrictEqual(['failed'])
			expect(copies[0]?.note).toContain('1000-byte response limit')
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('answers a guide mirror without requesting one from this repository', async () => {
		const files = [VENDORED_FILES.agents, VENDORED_FILES.mirror]
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.vendored.inventory]: { status: 200, body: buildInventory(files) },
			[UPSTREAM_PATHS.vendored.agents]: { status: 200, body: VENDORED_FILES.agents.content },
			[UPSTREAM_PATHS.vendored.mirror]: { status: 200, body: VENDORED_FILES.mirror.content },
		})
		const upstream = new Upstream({ repository: { base: server.base }, concurrency: 1 })
		try {
			// The mirror's bytes belong to the mirror verb, which refetches them from
			// each package's own repository, so this reader answers none of them. The
			// target is aligned on the mirror, which is the case a refusal made after
			// the byte comparison would answer found instead: the refusal is a
			// property of the path rather than of what the target happens to hold.
			const copies = await upstream.vendor(
				files.map((file) => file.path),
				buildVendoredSnapshot([VENDORED_FILES.mirror]),
			)
			expect(copies.map((copy) => copy.lookup)).toStrictEqual(['found', 'missing'])
			expect(copies[1]?.note).toContain('is a guide mirror the fleet serves')
			expect(server.paths).toStrictEqual([
				UPSTREAM_PATHS.vendored.inventory,
				UPSTREAM_PATHS.vendored.agents,
			])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('fails an aligned row whose local bytes are not UTF-8', async () => {
		const hex = 'ff'
		const entries = [
			buildManifestEntry({ storage: 'BINARY', destination: 'BINARY', digest: hexToDigest(hex) }),
		]
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.vendored.inventory]: {
				status: 200,
				body: JSON.stringify({ entries, roots: [], digest: computeManifestDigest(entries, []) }),
			},
		})
		const upstream = new Upstream({ repository: { base: server.base } })
		try {
			// The digest matches, so the target holds exactly the declared bytes. They
			// are still bytes no row can carry as content, and fetching them would
			// fail the same decode.
			const copies = await upstream.vendor(['BINARY'], { BINARY: hex })
			expect(copies).toStrictEqual([
				{
					path: 'BINARY',
					lookup: 'failed',
					note: 'the copy of BINARY at the target is not UTF-8',
					observed: hex,
				},
			])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('addresses the configured branch', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.vendored.branched]: {
				status: 200,
				body: buildInventory([VENDORED_FILES.agents]),
			},
		})
		const upstream = new Upstream({ repository: { base: server.base, branch: 'release/0.1.x' } })
		try {
			const copies = await upstream.vendor(
				[VENDORED_FILES.agents.path],
				buildVendoredSnapshot([VENDORED_FILES.agents]),
			)
			expect(copies.map((copy) => copy.lookup)).toStrictEqual(['found'])
			expect(server.paths).toStrictEqual([UPSTREAM_PATHS.vendored.branched])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('rejects an in-flight vendored read when the reader is torn down', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.vendored.inventory]: {
				status: 200,
				body: buildInventory([VENDORED_FILES.agents]),
				held: true,
			},
		})
		const upstream = new Upstream({ repository: { base: server.base } })
		try {
			const pending = readRejectionCode(() => upstream.vendor([VENDORED_FILES.agents.path], {}))
			// Deterministic without a clock: teardown happens strictly after the
			// fixture has the request open, so the abort always lands in flight.
			await server.arrival(UPSTREAM_PATHS.vendored.inventory)
			upstream.destroy()
			expect(await pending).toBe('DESTROYED')
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('refuses paths and local bytes that are not the exact shape', async () => {
		const upstream = new Upstream()
		try {
			expect(await readRejectionCode(() => upstream.vendor(['../secrets'], {}))).toBe('INVALID')
			expect(
				await readRejectionCode(() =>
					upstream.vendor(
						Array.from({ length: MAX_COLLECTION_ITEMS + 1 }, () => 'AGENTS.md'),
						{},
					),
				),
			).toBe('INVALID')
			expect(
				await readRejectionCode(() => upstream.vendor(['AGENTS.md'], { 'AGENTS.md': 'not hex' })),
			).toBe('INVALID')
		} finally {
			upstream.destroy()
		}
	})
})

describe('Upstream catalog', () => {
	it('asks the registry for the abbreviated packument and negotiates nothing else', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(['@orkestrel/router']),
			},
			[UPSTREAM_PATHS.router]: { status: 200, body: buildPackument('0.0.8') },
			[UPSTREAM_PATHS.guide]: { status: 200, body: '# Router\n', type: 'text/plain' },
		})
		const upstream = new Upstream({
			registry: { base: server.base },
			repository: { base: server.base },
			concurrency: 1,
		})
		try {
			await upstream.catalog()
			await upstream.fetch(['@orkestrel/router'], {})
			// The abbreviated form carries `dist-tags` and nothing a verdict reads. The
			// organization list and the guide are each published in one form, so those
			// requests declare no type at all: the control is that the header is not
			// attached to every request the reader makes.
			expect(server.paths).toStrictEqual([
				UPSTREAM_PATHS.organization,
				UPSTREAM_PATHS.router,
				UPSTREAM_PATHS.guide,
			])
			expect(server.accepts).toStrictEqual(['*/*', 'application/vnd.npm.install-v1+json', '*/*'])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('catalogs the organization fleet, sorted by name', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(['@orkestrel/router', '@orkestrel/console', '@orkestrel/emitter']),
			},
			[UPSTREAM_PATHS.router]: { status: 200, body: buildPackument('0.0.8') },
			[UPSTREAM_PATHS.console]: { status: 200, body: buildPackument('0.0.4') },
			[UPSTREAM_PATHS.emitter]: { status: 200, body: buildPackument('0.0.5') },
		})
		const upstream = new Upstream({ registry: { base: server.base } })
		try {
			expect(await upstream.catalog()).toStrictEqual([
				{ name: '@orkestrel/console', lookup: 'found', version: '0.0.4', dependencies: [] },
				{ name: '@orkestrel/emitter', lookup: 'found', version: '0.0.5', dependencies: [] },
				{ name: '@orkestrel/router', lookup: 'found', version: '0.0.8', dependencies: [] },
			])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('reads the runtime edges and leaves the development edges where they are', async () => {
		// A development edge reaches no consumer, so it constrains nothing a publish
		// order decides. The fixture declares one of each under the same version, so
		// a reader that took `devDependencies` — or took both — is caught here rather
		// than after it has ordered a round wrongly. `zod` is the control on the other
		// axis: a runtime edge that leaves the fleet is still a runtime edge and is
		// reported, because deciding what to do with it belongs to the caller.
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(['@orkestrel/router']),
			},
			[UPSTREAM_PATHS.router]: {
				status: 200,
				body: buildPackument('0.0.8', {
					dependencies: { '@orkestrel/emitter': '^0.0.5', zod: '^3.0.0' },
					development: { '@orkestrel/scaffold': '^0.0.26', vitest: '^4.1.10' },
				}),
			},
		})
		const upstream = new Upstream({ registry: { base: server.base } })
		try {
			expect(await upstream.catalog()).toStrictEqual([
				{
					name: '@orkestrel/router',
					lookup: 'found',
					version: '0.0.8',
					dependencies: [
						{ name: '@orkestrel/emitter', range: '^0.0.5' },
						{ name: 'zod', range: '^3.0.0' },
					],
				},
			])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('answers no edge for a packument whose declared set it cannot read', async () => {
		// A version absent from the `versions` map, a range that is not text, an empty
		// range, and a name or range carrying a control character are each dropped
		// rather than failing the row: the version is what the row promises, and a
		// package with no dependencies and one whose edges could not be read both
		// publish first.
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(['@orkestrel/router', '@orkestrel/console']),
			},
			[UPSTREAM_PATHS.router]: {
				status: 200,
				body: JSON.stringify({
					'dist-tags': { latest: '0.0.8' },
					name: '@orkestrel/sample',
					versions: { '0.0.7': { dependencies: { '@orkestrel/emitter': '^0.0.5' } } },
				}),
			},
			[UPSTREAM_PATHS.console]: {
				status: 200,
				body: buildPackument('0.0.4', {
					dependencies: {
						'@orkestrel/emitter': '',
						'@orkestrel/queue': '^0.0.8\n',
						'@orkestrel/router': '^0.0.8',
					},
				}),
			},
		})
		const upstream = new Upstream({ registry: { base: server.base } })
		try {
			expect(await upstream.catalog()).toStrictEqual([
				{
					name: '@orkestrel/console',
					lookup: 'found',
					version: '0.0.4',
					dependencies: [{ name: '@orkestrel/router', range: '^0.0.8' }],
				},
				{ name: '@orkestrel/router', lookup: 'found', version: '0.0.8', dependencies: [] },
			])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('keeps a row whose own version lookup produced no answer, carrying the cause', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(['@orkestrel/router', '@orkestrel/console', '@orkestrel/emitter']),
			},
			[UPSTREAM_PATHS.router]: { status: 200, body: buildPackument('0.0.8') },
			[UPSTREAM_PATHS.console]: { status: 404, body: '{"error":"Not found"}' },
			[UPSTREAM_PATHS.emitter]: { status: 502, body: '{"error":"Bad gateway"}' },
		})
		const upstream = new Upstream({ registry: { base: server.base } })
		try {
			expect(await upstream.catalog()).toStrictEqual([
				{ name: '@orkestrel/console', lookup: 'missing', note: 'HTTP 404' },
				{ name: '@orkestrel/emitter', lookup: 'failed', note: 'HTTP 502' },
				{ name: '@orkestrel/router', lookup: 'found', version: '0.0.8', dependencies: [] },
			])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('fails the whole call when the organization list is not an answer it can use', async () => {
		const bodies: readonly string[] = [
			buildOrganization([]),
			'{"router":"read-write"}',
			'["@orkestrel/router"]',
			'not json at all',
		]
		for (const body of bodies) {
			const server = await createUpstreamServer({
				[UPSTREAM_PATHS.organization]: { status: 200, body },
			})
			const upstream = new Upstream({ registry: { base: server.base } })
			try {
				expect([body, await readRejectionCode(() => upstream.catalog())]).toStrictEqual([
					body,
					'FETCH',
				])
			} finally {
				upstream.destroy()
				await server.destroy()
			}
		}
	})

	it('fails the whole call when the organization list is unreachable', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.organization]: { status: 500, body: '{"error":"Internal"}' },
		})
		const upstream = new Upstream({ registry: { base: server.base } })
		try {
			expect(await readRejectionCode(() => upstream.catalog())).toBe('FETCH')
			// Nothing beyond the list was ever requested: without it there is no
			// fleet to look packages up for.
			expect(server.paths).toStrictEqual([UPSTREAM_PATHS.organization])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})
})

describe('Upstream bounds', () => {
	it('reads an abbreviated packument larger than the artifact limit by default', async () => {
		const body = JSON.stringify({
			'dist-tags': { latest: '1.0.0' },
			versions: { '1.0.0': {} },
			padding: 'x'.repeat(MAX_ARTIFACT_BYTES),
		})
		expect(Buffer.byteLength(body)).toBeGreaterThan(MAX_ARTIFACT_BYTES)
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: { status: 200, body },
		})
		const upstream = new Upstream({ registry: { base: server.base } })
		try {
			const [release] = await upstream.lookup([
				buildDependency({ name: '@orkestrel/router', range: '*' }),
			])
			expect(release?.lookup).toBe('found')
			expect(release?.latest).toBe('1.0.0')
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('admits a gzip body whose wire length exceeds its decoded limit', async () => {
		// Written short and inline rather than through `buildPackument`, because the
		// property under test is that gzip made the body BIGGER, and only a body too
		// short to compress does that. The assertion below is the control: it fails if
		// the body ever grows past the point where gzip starts paying off, so this
		// test can never quietly stop measuring what it names.
		const body = '{"dist-tags":{"latest":"0.0.8"},"name":"@orkestrel/sample"}'
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: { status: 200, body, encoding: 'gzip' },
			[UPSTREAM_PATHS.emitter]: { status: 200, body },
		})
		const decoded = Buffer.byteLength(body, 'utf8')
		expect(gzipSync(body).byteLength).toBeGreaterThan(decoded)
		const upstream = new Upstream({ registry: { base: server.base }, limit: decoded })
		try {
			const releases = await upstream.lookup([
				buildDependency({ name: '@orkestrel/router', range: '*' }),
				buildDependency({ name: '@orkestrel/emitter', range: '*' }),
			])
			expect(releases.map((release) => release.lookup)).toStrictEqual(['found', 'found'])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('refuses a response whose streamed bytes pass the per-response limit', async () => {
		const server = await createUpstreamServer({
			// Chunked, so no declared length exists to refuse: the bytes are counted
			// while they arrive, which is the other door entirely.
			[UPSTREAM_PATHS.router]: { status: 200, body: buildPackument('0.0.8'), chunked: true },
		})
		const upstream = new Upstream({ registry: { base: server.base }, limit: 32 })
		try {
			const [release] = await upstream.lookup([buildDependency({ name: '@orkestrel/router' })])
			expect(release?.lookup).toBe('failed')
			expect(release?.note).toBe('the response passed the 32-byte response limit')
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('spends one allowance across every declared-length read in a call', async () => {
		const body = buildPackument('0.0.8')
		const budget = body.length * 2 + 10
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.console]: { status: 200, body },
			[UPSTREAM_PATHS.emitter]: { status: 200, body },
			[UPSTREAM_PATHS.router]: { status: 200, body },
		})
		const upstream = new Upstream({ registry: { base: server.base }, concurrency: 1, budget })
		try {
			const releases = await upstream.lookup([
				buildDependency({ name: '@orkestrel/console', range: '*' }),
				buildDependency({ name: '@orkestrel/emitter', range: '*' }),
				buildDependency({ name: '@orkestrel/router', range: '*' }),
			])
			// Each answer is well inside the per-response limit; it is the last
			// decoded stream, against what the earlier ones already spent, that is refused.
			expect(releases.map((release) => release.lookup)).toStrictEqual(['found', 'found', 'failed'])
			expect(releases[2]?.note).toBe(`the call spent its ${String(budget)}-byte allowance`)
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('spends the same allowance while streaming, where no length was declared', async () => {
		const body = buildPackument('0.0.8')
		const budget = body.length * 2 + 10
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.console]: { status: 200, body, chunked: true },
			[UPSTREAM_PATHS.emitter]: { status: 200, body, chunked: true },
			[UPSTREAM_PATHS.router]: { status: 200, body, chunked: true },
		})
		const upstream = new Upstream({ registry: { base: server.base }, concurrency: 1, budget })
		try {
			const releases = await upstream.lookup([
				buildDependency({ name: '@orkestrel/console', range: '*' }),
				buildDependency({ name: '@orkestrel/emitter', range: '*' }),
				buildDependency({ name: '@orkestrel/router', range: '*' }),
			])
			expect(releases.map((release) => release.lookup)).toStrictEqual(['found', 'found', 'failed'])
			expect(releases[2]?.note).toBe(`the call spent its ${String(budget)}-byte allowance`)
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('bounds the requests it holds in flight', async () => {
		const replies = {
			[UPSTREAM_PATHS.console]: { status: 200, body: buildPackument('0.0.4'), delay: 30 },
			[UPSTREAM_PATHS.emitter]: { status: 200, body: buildPackument('0.0.5'), delay: 30 },
			[UPSTREAM_PATHS.router]: { status: 200, body: buildPackument('0.0.8'), delay: 30 },
			[UPSTREAM_PATHS.terminal]: { status: 200, body: buildPackument('0.0.5'), delay: 30 },
		}
		const dependencies = [
			buildDependency({ name: '@orkestrel/console' }),
			buildDependency({ name: '@orkestrel/emitter' }),
			buildDependency({ name: '@orkestrel/router' }),
			buildDependency({ name: '@orkestrel/terminal' }),
		]
		const bounded = await createUpstreamServer(replies)
		const unbounded = await createUpstreamServer(replies)
		const two = new Upstream({ registry: { base: bounded.base }, concurrency: 2 })
		const four = new Upstream({ registry: { base: unbounded.base }, concurrency: 4 })
		try {
			await two.lookup(dependencies)
			await four.lookup(dependencies)
			expect(bounded.peak).toBe(2)
			// The control the bound is measured against: the same four reads with a
			// wider bound really do open four at once, so a peak of two is the
			// reader's law rather than the fixture's ceiling.
			expect(unbounded.peak).toBe(4)
		} finally {
			two.destroy()
			four.destroy()
			await bounded.destroy()
			await unbounded.destroy()
		}
	})
})

describe('Upstream transport', () => {
	it('never follows a redirect', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: {
				status: 302,
				body: '',
				location: UPSTREAM_PATHS.emitter,
			},
			[UPSTREAM_PATHS.emitter]: { status: 200, body: buildPackument('0.0.5') },
		})
		const upstream = new Upstream({ registry: { base: server.base } })
		try {
			const [release] = await upstream.lookup([buildDependency({ name: '@orkestrel/router' })])
			expect(release?.lookup).toBe('failed')
			expect(release?.note).toBe('HTTP 302, and a redirect is never followed')
			expect(server.paths).toStrictEqual([UPSTREAM_PATHS.router])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('retries a transport fault and never retries a definite absence', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: { status: 500, body: '{"error":"Internal"}' },
			[UPSTREAM_PATHS.emitter]: { status: 404, body: '{"error":"Not found"}' },
		})
		const upstream = new Upstream({ registry: { base: server.base }, retries: 2, concurrency: 1 })
		try {
			await upstream.lookup([
				buildDependency({ name: '@orkestrel/router', range: '*' }),
				buildDependency({ name: '@orkestrel/emitter', range: '*' }),
			])
			expect(server.paths.filter((path) => path === UPSTREAM_PATHS.router)).toHaveLength(3)
			expect(server.paths.filter((path) => path === UPSTREAM_PATHS.emitter)).toHaveLength(1)
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('reports a request the endpoint never answers as a timed-out verdict', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.guide]: { status: 200, body: '# Router\n', held: true },
		})
		const upstream = new Upstream({ repository: { base: server.base, timeout: 30 } })
		try {
			const [mirror] = await upstream.fetch(['@orkestrel/router'], {})
			expect(mirror?.lookup).toBe('failed')
			// Deterministic without a clock: the fixture accepts the request and
			// never answers it, so the only thing that can end the wait is the
			// timeout the endpoint was given.
			expect(mirror?.note).toContain('TimeoutError')
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('rejects an in-flight call when the reader is torn down', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: { status: 200, body: buildPackument('0.0.8'), held: true },
		})
		const upstream = new Upstream({ registry: { base: server.base } })
		try {
			const pending = readRejectionCode(() =>
				upstream.lookup([buildDependency({ name: '@orkestrel/router' })]),
			)
			// Deterministic without a clock: teardown happens strictly after the
			// fixture has the request open, so the abort always lands in flight.
			await server.arrival(UPSTREAM_PATHS.router)
			upstream.destroy()
			expect(await pending).toBe('DESTROYED')
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})
})

describe('Upstream instrument', () => {
	it('reads only what it addressed, and reports an unscripted address as missing', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: { status: 200, body: buildPackument('0.0.8') },
		})
		const upstream = new Upstream({ registry: { base: server.base }, concurrency: 1 })
		try {
			const releases = await upstream.lookup([
				buildDependency({ name: '@orkestrel/router', range: '^0.0.8' }),
				buildDependency({ name: '@orkestrel/emitter' }),
			])
			// The control, drawn from outside the fixture's scripted population: a
			// name the table never named comes back missing, so the fixture is not
			// answering every address alike and the reader really did build the
			// exact URLs the upstream contract puts it at.
			expect(releases.map((release) => release.lookup)).toStrictEqual(['found', 'missing'])
			expect(server.paths).toStrictEqual([UPSTREAM_PATHS.router, UPSTREAM_PATHS.emitter])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})
})
