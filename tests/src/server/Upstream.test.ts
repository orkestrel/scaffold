import type { Mirror, Release } from '@src/core'
import { gzipSync } from 'node:zlib'
import { contentToHex, MAX_COLLECTION_ITEMS } from '@src/core'
import { Upstream } from '@src/server'
import { describe, expect, it } from 'vitest'
import { buildDependency, createRecorder } from '../../setup.js'
import {
	buildOrganization,
	buildPackument,
	createUpstreamServer,
	FLEET_UPSTREAM_PATHS,
	readErrorCode,
	readRejectionCode,
	UPSTREAM_ENDPOINT_CASES,
	UPSTREAM_PATHS,
} from '../../setupServer.js'

describe('Upstream construction', () => {
	it('refuses an option bag that is not the exact shape', () => {
		// The closed-record and ceiling refusals are the option guard's own law and
		// are measured against it in `validators.test.ts`; what is measured here is
		// that the constructor consults that guard at all.
		expect(readErrorCode(() => new Upstream({ concurrency: 0 }))).toBe('INVALID')
		expect(readErrorCode(() => new Upstream({ guides: { branch: 'main/../etc' } }))).toBe('INVALID')
		expect(readErrorCode(() => new Upstream({ retries: 1.5 }))).toBe('INVALID')
	})

	it('decides the scheme and host law the endpoint guard leaves to it', () => {
		for (const endpoint of UPSTREAM_ENDPOINT_CASES) {
			const guides = readErrorCode(() => new Upstream({ guides: { base: endpoint.base } }))
			const registry = readErrorCode(() => new Upstream({ registry: { base: endpoint.base } }))
			expect([endpoint.label, guides]).toStrictEqual([
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
				{ name: '@orkestrel/router', range: '^0.0.8', lookup: 'found', latest: '0.0.8' },
				{ name: '@orkestrel/emitter', range: '^0.0.5', lookup: 'found', latest: '0.0.5' },
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
			guides: { base: server.base },
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
			guides: { base: server.base },
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
		const upstream = new Upstream({ guides: { base: server.base, branch: 'release/0.1.x' } })
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
		const upstream = new Upstream({ guides: { base: server.base } })
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
		const upstream = new Upstream({ guides: { base: server.base } })
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
		const upstream = new Upstream({ guides: { base: server.base } })
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
			guides: { base: server.base },
			concurrency: 1,
		})
		try {
			await upstream.catalog()
			await upstream.fetch(['@orkestrel/router'], {})
			// The abbreviated form carries `dist-tags` and nothing a verdict reads. The
			// organization list and the guide are each published in one form, so those
			// requests declare no type at all: the control is that the header is not
			// simply attached to every request the reader makes.
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
				{ name: '@orkestrel/console', lookup: 'found', version: '0.0.4' },
				{ name: '@orkestrel/emitter', lookup: 'found', version: '0.0.5' },
				{ name: '@orkestrel/router', lookup: 'found', version: '0.0.8' },
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
				{ name: '@orkestrel/router', lookup: 'found', version: '0.0.8' },
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
	it('admits a gzip body whose wire length exceeds its decoded limit', async () => {
		const body = buildPackument('0.0.8')
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: { status: 200, body, encoding: 'gzip' },
			[UPSTREAM_PATHS.emitter]: { status: 200, body },
		})
		const decoded = Buffer.byteLength(body, 'utf8')
		expect(gzipSync(body).byteLength).toBeGreaterThan(decoded)
		const upstream = new Upstream({ registry: { base: server.base }, limit: decoded })
		try {
			const releases = await upstream.lookup([
				buildDependency({ name: '@orkestrel/router' }),
				buildDependency({ name: '@orkestrel/emitter' }),
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
				buildDependency({ name: '@orkestrel/console' }),
				buildDependency({ name: '@orkestrel/emitter' }),
				buildDependency({ name: '@orkestrel/router' }),
			])
			// Each answer is well inside the per-response limit; it is the third
			// decoded stream against what the first two already spent that is refused.
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
				buildDependency({ name: '@orkestrel/console' }),
				buildDependency({ name: '@orkestrel/emitter' }),
				buildDependency({ name: '@orkestrel/router' }),
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
				buildDependency({ name: '@orkestrel/router' }),
				buildDependency({ name: '@orkestrel/emitter' }),
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
		const upstream = new Upstream({ guides: { base: server.base, timeout: 30 } })
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
				buildDependency({ name: '@orkestrel/router' }),
				buildDependency({ name: '@orkestrel/emitter' }),
			])
			// The control, drawn from outside the fixture's scripted population: a
			// name the table never named comes back missing, so the fixture is not
			// answering every address alike and the reader really did build the two
			// exact URLs the upstream contract puts it at.
			expect(releases.map((release) => release.lookup)).toStrictEqual(['found', 'missing'])
			expect(server.paths).toStrictEqual([UPSTREAM_PATHS.router, UPSTREAM_PATHS.emitter])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})
})
