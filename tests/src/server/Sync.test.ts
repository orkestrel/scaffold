import type { Dependency, GuideSync } from '@src/core'
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { dependency, isScaffoldError } from '@src/core'
import {
	createSync,
	digestText,
	MAX_SYNC_BASE_LENGTH,
	MAX_SYNC_BRANCH_LENGTH,
	MAX_SYNC_ITEMS,
	MAX_SYNC_LIMIT,
	parseSyncBase,
	parseSyncBranch,
	parseSyncDependencies,
	parseSyncOptions,
} from '@src/server'
import { buildSyncReport, createRecorder } from '../../setup.js'
import {
	buildGuidePath,
	buildHTTPFixture,
	buildRegistryPath,
	buildTempDirectory,
	ORG_REGISTRY_PATH,
	respondDestroy,
	respondJSON,
	respondPackument,
	respondText,
} from '../../setupServer.js'

// ── Real HTTP fixture (AGENTS §16: no mocks) ─────────────────────────────────
//
// A genuine `node:http` server on an ephemeral port. Each test wires its own
// route table keyed by the request URL and always tears down in `finally`.

// `#guideUrl` builds the canonical raw.githubusercontent.com form directly,
// so `redirect: 'manual'` never needs to follow a redirect.
// npm's canonical scoped-package path keeps the literal `@` and encodes only
// the slash — not `encodeURIComponent`, which would also escape `@`.
// ── Sync.guides ───────────────────────────────────────────────────────────

describe('Sync options boundary', () => {
	it('owns listener hooks and contains stateful hook proxies', () => {
		const calls: string[] = []
		const hooks = {
			destroy: () => {
				calls.push('owned')
			},
		}
		const sync = createSync({ on: hooks })
		hooks.destroy = () => {
			calls.push('mutated')
		}
		sync.destroy()
		expect(calls).toEqual(['owned'])

		let reads = 0
		const statefulHooks = new Proxy(
			{ destroy: () => undefined },
			{
				getOwnPropertyDescriptor(target, key) {
					reads += 1
					if (reads > 1) throw new Error('stateful hook trap')
					return Reflect.getOwnPropertyDescriptor(target, key)
				},
			},
		)
		expect(() => createSync({ on: statefulHooks })).toThrowError(
			expect.objectContaining({ code: 'INVALID' }),
		)
	})

	it('contains revoked and stateful dependency-array proxies as coded failures', () => {
		const dependencies = [dependency('@orkestrel/contract', '^0.0.5')]
		const revoked = Proxy.revocable(dependencies, {})
		revoked.revoke()
		let reads = 0
		const stateful = new Proxy(dependencies, {
			getOwnPropertyDescriptor(target, key) {
				reads += 1
				if (reads > 1) throw new Error('stateful dependency trap')
				return Reflect.getOwnPropertyDescriptor(target, key)
			},
		})

		for (const value of [revoked.proxy, stateful]) {
			expect(() => Reflect.apply(parseSyncDependencies, undefined, [value, false])).toThrowError(
				expect.objectContaining({ code: 'INVALID' }),
			)
		}
	})

	it('accepts bounded values and returns a fresh parsed record', () => {
		expect(
			parseSyncOptions({
				guides: { base: 'https://example.test/', branch: 'feature/hardening', timeout: 1 },
				registry: { base: 'registry.npmjs.org', timeout: 300_000 },
				concurrency: 64,
				retries: 5,
				strict: true,
				limit: MAX_SYNC_LIMIT,
			}),
		).toEqual({
			guides: { base: 'https://example.test', branch: 'feature/hardening', timeout: 1 },
			registry: { base: 'https://registry.npmjs.org', timeout: 300_000 },
			concurrency: 64,
			retries: 5,
			strict: true,
			limit: MAX_SYNC_LIMIT,
		})
	})

	it.each([
		{ concurrency: 0 },
		{ concurrency: Number.NaN },
		{ concurrency: Number.POSITIVE_INFINITY },
		{ concurrency: 65 },
		{ retries: -1 },
		{ retries: 6 },
		{ limit: 0 },
		{ limit: Number.POSITIVE_INFINITY },
		{ guides: { timeout: 0 } },
		{ registry: { timeout: 300_001 } },
		{ guides: { branch: '../main' } },
		{ guides: { base: 'file:///tmp/data' } },
		{ registry: { base: 'https://user:secret@example.test' } },
		{ extra: true },
		Object.defineProperty({}, 'strict', { get: () => true }),
		Object.create({ concurrency: 1 }),
		Object.create({ base: 'https://example.test' }),
	])('rejects malformed, unbounded, inherited, and accessor options %#', (value) => {
		expect(() => Reflect.apply(createSync, undefined, [value])).toThrowError(
			expect.objectContaining({ code: 'INVALID' }),
		)
	})

	it('ignores polluted inherited nested keys and parses only explicit own data', () => {
		Reflect.defineProperty(Object.prototype, 'base', {
			configurable: true,
			value: 'https://attacker.invalid',
		})
		try {
			expect(parseSyncOptions({ guides: {} })).toEqual({ guides: {} })
		} finally {
			Reflect.deleteProperty(Object.prototype, 'base')
		}
	})

	it('requires HTTPS except for explicit loopback development endpoints', () => {
		expect(parseSyncBase('example.test')).toBe('https://example.test')
		expect(parseSyncBase('http://127.0.0.1:3000')).toBe('http://127.0.0.1:3000')
		expect(parseSyncBase('http://localhost:3000')).toBe('http://localhost:3000')
		expect(parseSyncBase('http://[::1]:3000')).toBe('http://[::1]:3000')
		for (const base of ['http://example.test', 'http://127.0.0.2', 'http://sub.localhost']) {
			expect(() => parseSyncBase(base)).toThrowError(expect.objectContaining({ code: 'INVALID' }))
		}
	})

	it('accepts exact endpoint and branch bounds and rejects one character beyond them', () => {
		const endpointPrefix = 'https://example.test/'
		const endpoint = endpointPrefix + 'a'.repeat(MAX_SYNC_BASE_LENGTH - endpointPrefix.length)
		const branch = 'a'.repeat(MAX_SYNC_BRANCH_LENGTH)

		expect(parseSyncBase(endpoint)).toBe(endpoint)
		expect(parseSyncBranch(branch)).toBe(branch)
		expect(() => parseSyncBase(`${endpoint}a`)).toThrowError(
			expect.objectContaining({ code: 'INVALID' }),
		)
		expect(() => parseSyncBranch(`${branch}a`)).toThrowError(
			expect.objectContaining({ code: 'INVALID' }),
		)
	})

	it('rejects branch paths outside the portable Git ref subset', () => {
		for (const branch of [
			'feature..x',
			'x/.hidden',
			'x/end.',
			'x/name.lock',
			'x/name.LOCK',
			'x//name',
			'../main',
			'-option',
		]) {
			expect(() => parseSyncBranch(branch)).toThrowError(
				expect.objectContaining({ code: 'INVALID' }),
			)
		}
	})

	it('returns coded failures for hostile direct endpoint and branch parser inputs', () => {
		const hostile = new Proxy(
			{},
			{
				get() {
					throw new Error('hostile get')
				},
			},
		)
		for (const value of [null, 42, hostile]) {
			expect(() => parseSyncBase(value)).toThrowError(expect.objectContaining({ code: 'INVALID' }))
			expect(() => parseSyncBranch(value)).toThrowError(
				expect.objectContaining({ code: 'INVALID' }),
			)
		}
	})
})

describe('Sync.guides', () => {
	it('without a reference map: a successful fetch verdicts behind, carrying the fetched content', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildGuidePath('contract'), (_request, response) =>
				respondText(response, 200, '# Contract Guide\n'),
			)
			const sync = createSync({ guides: { base: fixture.base } })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('behind')
			expect(result?.content).toBe('# Contract Guide\n')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('a 404 verdicts missing', async () => {
		const fixture = await buildHTTPFixture()
		try {
			// No route registered for the guide path — falls through to 404.
			const sync = createSync({ guides: { base: fixture.base } })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('missing')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('a transport fault (destroyed socket) verdicts failed', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildGuidePath('contract'), (_request, response) => respondDestroy(response))
			const sync = createSync({ guides: { base: fixture.base } })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('failed')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('WITH a reference map: byte-equal entry verdicts current', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildGuidePath('contract'), (_request, response) =>
				respondText(response, 200, 'same bytes'),
			)
			const sync = createSync({ guides: { base: fixture.base } })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')], {
				'@orkestrel/contract': 'same bytes',
			})
			expect(result?.freshness).toBe('current')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('WITH a reference map: a differing entry verdicts behind', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildGuidePath('contract'), (_request, response) =>
				respondText(response, 200, 'new bytes'),
			)
			const sync = createSync({ guides: { base: fixture.base } })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')], {
				'@orkestrel/contract': 'old bytes',
			})
			expect(result?.freshness).toBe('behind')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('WITH a reference map: an entry absent from the map verdicts behind', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildGuidePath('contract'), (_request, response) =>
				respondText(response, 200, 'fetched bytes'),
			)
			const sync = createSync({ guides: { base: fixture.base } })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')], {})
			expect(result?.freshness).toBe('behind')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})
})

// ── Sync.versions ─────────────────────────────────────────────────────────

describe('Sync dependency boundary', () => {
	it('rejects hostile, accessor, sparse, and oversized arrays before any request', async () => {
		const fixture = await buildHTTPFixture()
		try {
			const sync = createSync({ guides: { base: fixture.base } })
			const hostile = [dependency('@orkestrel/contract', '^0.0.5')]
			let everyCalls = 0
			Object.defineProperty(hostile, 'every', {
				value: () => {
					everyCalls += 1
					throw new Error('hostile every')
				},
			})
			const accessor = [
				{
					get name(): string {
						throw new Error('hostile name getter')
					},
					range: '^0.0.5',
				},
			]

			await expect(sync.guides(hostile)).rejects.toMatchObject({ code: 'INVALID' })
			await expect(sync.guides(accessor)).rejects.toMatchObject({ code: 'INVALID' })
			await expect(sync.guides(Array<Dependency>(1))).rejects.toMatchObject({
				code: 'INVALID',
			})
			await expect(
				sync.guides(
					Array.from({ length: MAX_SYNC_ITEMS + 1 }, () =>
						dependency('@orkestrel/contract', '^0.0.5'),
					),
				),
			).rejects.toMatchObject({ code: 'INVALID' })
			expect(everyCalls).toBe(0)
			expect(fixture.hits.size).toBe(0)
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('preflights every guide dependency before starting any request', async () => {
		const fixture = await buildHTTPFixture()
		try {
			const sync = createSync({ guides: { base: fixture.base } })
			await expect(
				sync.guides([
					dependency('@orkestrel/contract', '^0.0.5'),
					dependency('@orkestrel/../evil?query', '^0.0.5'),
				]),
			).rejects.toMatchObject({ code: 'INVALID' })
			expect(fixture.hits.size).toBe(0)
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})
})

describe('Sync.versions', () => {
	it('current: the declared range is satisfied by latest', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildRegistryPath('@orkestrel/contract'), (_request, response) =>
				respondJSON(response, '0.0.5'),
			)
			const sync = createSync({ registry: { base: fixture.base } })
			const [result] = await sync.versions([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('current')
			expect(result?.latest).toBe('0.0.5')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('behind: a newer latest than the declared range is published', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildRegistryPath('@orkestrel/contract'), (_request, response) =>
				respondJSON(response, '0.0.9'),
			)
			const sync = createSync({ registry: { base: fixture.base } })
			const [result] = await sync.versions([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('behind')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('a 404 verdicts missing', async () => {
		const fixture = await buildHTTPFixture()
		try {
			const sync = createSync({ registry: { base: fixture.base } })
			const [result] = await sync.versions([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('missing')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('a transport fault verdicts failed', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildRegistryPath('@orkestrel/contract'), (_request, response) =>
				respondDestroy(response),
			)
			const sync = createSync({ registry: { base: fixture.base } })
			const [result] = await sync.versions([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('failed')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('keeps a scoped package name literal @ and encodes only its slash', async () => {
		const fixture = await buildHTTPFixture()
		try {
			const canonical = buildRegistryPath('@orkestrel/contract')
			expect(canonical).toBe('/@orkestrel%2Fcontract')
			fixture.route(canonical, (_request, response) => respondJSON(response, '0.0.5'))
			const sync = createSync({ registry: { base: fixture.base } })
			await sync.versions([dependency('@orkestrel/contract', '^0.0.5')])
			expect(fixture.hits.get(canonical)).toBe(1)
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('resolves an external (non-@orkestrel) unscoped package name, e.g. "zod"', async () => {
		const fixture = await buildHTTPFixture()
		try {
			const canonical = buildRegistryPath('zod')
			expect(canonical).toBe('/zod')
			fixture.route(canonical, (_request, response) => respondJSON(response, '3.23.0'))
			const sync = createSync({ registry: { base: fixture.base } })
			const [result] = await sync.versions([dependency('zod', '^3.23.0')])
			expect(result?.freshness).toBe('current')
			expect(result?.latest).toBe('3.23.0')
			expect(fixture.hits.get(canonical)).toBe(1)
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('resolves an external scoped package name, e.g. "@types/node"', async () => {
		const fixture = await buildHTTPFixture()
		try {
			const canonical = buildRegistryPath('@types/node')
			expect(canonical).toBe('/@types%2Fnode')
			fixture.route(canonical, (_request, response) => respondJSON(response, '26.1.1'))
			const sync = createSync({ registry: { base: fixture.base } })
			const [result] = await sync.versions([dependency('@types/node', '^26.1.1')])
			expect(result?.freshness).toBe('current')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})
})

// ── Sync.catalog ──────────────────────────────────────────────────────────

describe('Sync.catalog', () => {
	it('does not accept inherited packument tags or descriptions', async () => {
		const fixture = await buildHTTPFixture()
		Reflect.defineProperty(Object.prototype, 'dist-tags', {
			configurable: true,
			value: { latest: '9.9.9' },
			writable: true,
		})
		Reflect.defineProperty(Object.prototype, 'description', {
			configurable: true,
			value: 'inherited description',
			writable: true,
		})
		try {
			fixture.route(ORG_REGISTRY_PATH, (_request, response) =>
				respondText(response, 200, JSON.stringify({ '@orkestrel/contract': 'write' })),
			)
			fixture.route(buildRegistryPath('@orkestrel/contract'), (_request, response) =>
				respondText(response, 200, '{}'),
			)
			fixture.route(buildGuidePath('contract'), (_request, response) =>
				respondText(response, 200, '# Contract\n\n> Own guide description.\n'),
			)
			const sync = createSync({ registry: { base: fixture.base }, guides: { base: fixture.base } })

			expect(await sync.catalog()).toEqual([
				{
					name: '@orkestrel/contract',
					version: '',
					description: 'Own guide description.',
				},
			])
			sync.destroy()
		} finally {
			Reflect.deleteProperty(Object.prototype, 'dist-tags')
			Reflect.deleteProperty(Object.prototype, 'description')
			await fixture.close()
		}
	})

	it('registry-sourced entries prefer the guide blockquote description over the packument description', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(ORG_REGISTRY_PATH, (_request, response) =>
				respondText(response, 200, JSON.stringify({ '@orkestrel/contract': 'write' })),
			)
			fixture.route(buildRegistryPath('@orkestrel/contract'), (_request, response) =>
				respondPackument(response, '0.0.5', 'registry description'),
			)
			fixture.route(buildGuidePath('contract'), (_request, response) =>
				respondText(response, 200, '# Contract\n\n> Guide blockquote description.\n'),
			)
			const sync = createSync({ registry: { base: fixture.base }, guides: { base: fixture.base } })
			const entries = await sync.catalog()
			expect(entries).toEqual([
				{
					name: '@orkestrel/contract',
					version: '0.0.5',
					description: 'Guide blockquote description.',
				},
			])
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('a guide 404 keeps the package LISTED with the packument description and a reachability note (owner policy: public repos, no tokens)', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(ORG_REGISTRY_PATH, (_request, response) =>
				respondText(response, 200, JSON.stringify({ '@orkestrel/contract': 'write' })),
			)
			fixture.route(buildRegistryPath('@orkestrel/contract'), (_request, response) =>
				respondPackument(response, '0.0.5', 'registry description'),
			)
			// No guide route registered — falls through to 404.
			const noteRecorder = createRecorder<readonly [name: string, note: string]>()
			const sync = createSync({
				registry: { base: fixture.base },
				guides: { base: fixture.base },
				on: { package: noteRecorder.handler },
			})
			const [entry] = await sync.catalog()
			expect(entry).toEqual({
				name: '@orkestrel/contract',
				version: '0.0.5',
				description: 'registry description',
			})
			expect(noteRecorder.calls[0]?.[0]).toBe('@orkestrel/contract')
			expect(noteRecorder.calls[0]?.[1]).toContain(
				'guide unreachable (HTTP 404 — repo private or guide missing?)',
			)
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('a failed packument fetch keeps the entry listed, degraded (empty version) rather than dropped', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(ORG_REGISTRY_PATH, (_request, response) =>
				respondText(response, 200, JSON.stringify({ '@orkestrel/contract': 'write' })),
			)
			fixture.route(buildRegistryPath('@orkestrel/contract'), (_request, response) =>
				respondText(response, 500, 'server error'),
			)
			fixture.route(buildGuidePath('contract'), (_request, response) =>
				respondText(response, 200, '# Contract\n\n> Guide description.\n'),
			)
			const noteRecorder = createRecorder<readonly [name: string, note: string]>()
			const sync = createSync({
				registry: { base: fixture.base },
				guides: { base: fixture.base },
				on: { package: noteRecorder.handler },
			})
			const [entry] = await sync.catalog()
			expect(entry).toEqual({
				name: '@orkestrel/contract',
				version: '',
				description: 'Guide description.',
			})
			expect(noteRecorder.calls[0]?.[1]).toContain('version unavailable')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('an unreachable org package list throws a coded FETCH error', async () => {
		const fixture = await buildHTTPFixture()
		try {
			// No route registered for ORG_REGISTRY_PATH — falls through to 404.
			const sync = createSync({ registry: { base: fixture.base } })
			let caught: unknown
			try {
				await sync.catalog()
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('FETCH')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('a malformed org package list response throws a coded FETCH error', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(ORG_REGISTRY_PATH, (_request, response) =>
				respondText(response, 200, 'not json'),
			)
			const sync = createSync({ registry: { base: fixture.base } })
			let caught: unknown
			try {
				await sync.catalog()
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('FETCH')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('sorts entries code-unit by name regardless of org-list key order', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(ORG_REGISTRY_PATH, (_request, response) =>
				respondText(
					response,
					200,
					JSON.stringify({ '@orkestrel/relation': 'write', '@orkestrel/contract': 'write' }),
				),
			)
			fixture.route(buildRegistryPath('@orkestrel/relation'), (_request, response) =>
				respondPackument(response, '0.0.1', 'relation'),
			)
			fixture.route(buildRegistryPath('@orkestrel/contract'), (_request, response) =>
				respondPackument(response, '0.0.5', 'contract'),
			)
			const sync = createSync({ registry: { base: fixture.base }, guides: { base: fixture.base } })
			const entries = await sync.catalog()
			expect(entries.map((entry) => entry.name)).toEqual([
				'@orkestrel/contract',
				'@orkestrel/relation',
			])
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('every fetch is unauthenticated — no Authorization header reaches the guide host or the registry', async () => {
		const fixture = await buildHTTPFixture()
		try {
			let orgAuth: string | undefined
			let registryAuth: string | undefined
			let guideAuth: string | undefined
			fixture.route(ORG_REGISTRY_PATH, (request, response) => {
				orgAuth = request.headers.authorization
				respondText(response, 200, JSON.stringify({ '@orkestrel/contract': 'write' }))
			})
			fixture.route(buildRegistryPath('@orkestrel/contract'), (request, response) => {
				registryAuth = request.headers.authorization
				respondPackument(response, '0.0.5', 'registry description')
			})
			fixture.route(buildGuidePath('contract'), (request, response) => {
				guideAuth = request.headers.authorization
				respondText(response, 200, '# Contract\n\n> Guide description.\n')
			})
			const sync = createSync({ registry: { base: fixture.base }, guides: { base: fixture.base } })
			await sync.catalog()
			expect(orgAuth).toBeUndefined()
			expect(registryAuth).toBeUndefined()
			expect(guideAuth).toBeUndefined()
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})
})

// ── Sync.pull ─────────────────────────────────────────────────────────────

describe('Sync.pull', () => {
	it('excludes its own guide from pull writes while retaining self version freshness', async () => {
		const fixture = await buildHTTPFixture()
		const directory = await buildTempDirectory()
		let selfGuideRequests = 0
		try {
			writeFileSync(
				join(directory.path, 'package.json'),
				JSON.stringify({
					name: '@orkestrel/guide',
					dependencies: { '@orkestrel/contract': '^0.0.5' },
					devDependencies: { '@orkestrel/guide': '^0.0.5' },
				}),
				'utf8',
			)
			fixture.route(buildGuidePath('guide'), (_request, response) => {
				selfGuideRequests += 1
				respondText(response, 200, 'self guide replacement')
			})
			fixture.route(buildGuidePath('contract'), (_request, response) =>
				respondText(response, 200, 'contract guide'),
			)
			fixture.route(buildRegistryPath('@orkestrel/guide'), (_request, response) =>
				respondJSON(response, '0.0.5'),
			)
			fixture.route(buildRegistryPath('@orkestrel/contract'), (_request, response) =>
				respondJSON(response, '0.0.5'),
			)
			const sync = createSync({ guides: { base: fixture.base }, registry: { base: fixture.base } })
			try {
				const report = await sync.pull(directory.path)
				const written = await sync.write(report, directory.path)

				expect(selfGuideRequests).toBe(0)
				expect(report.guides.map((guide) => guide.name)).toEqual(['@orkestrel/contract'])
				expect(
					report.versions.find((version) => version.name === '@orkestrel/guide'),
				).toMatchObject({
					freshness: 'current',
				})
				expect(written).toEqual(['guides/src/contract.md'])
				expect(readFileSync(join(directory.path, 'guides', 'src', 'contract.md'), 'utf8')).toBe(
					'contract guide',
				)
				expect(existsSync(join(directory.path, 'guides', 'src', 'guide.md'))).toBe(false)
			} finally {
				sync.destroy()
			}
		} finally {
			await directory.cleanup()
			await fixture.close()
		}
	})

	it('reads declared deps from dependencies+devDependencies (deduplicated) and verdicts target-relative freshness', async () => {
		const fixture = await buildHTTPFixture()
		const directory = await buildTempDirectory()
		try {
			writeFileSync(
				join(directory.path, 'package.json'),
				JSON.stringify({
					name: 'x',
					dependencies: { '@orkestrel/contract': '^0.0.5' },
					devDependencies: {
						'@orkestrel/contract': '^0.0.5', // duplicate — must dedupe
						'@orkestrel/relation': '^0.0.5',
					},
				}),
				'utf8',
			)
			mkdirSync(join(directory.path, 'guides', 'src'), { recursive: true })
			writeFileSync(join(directory.path, 'guides', 'src', 'contract.md'), 'stale mirror', 'utf8')

			fixture.route(
				buildGuidePath('contract'),
				(_request, response) => respondText(response, 200, 'stale mirror'), // byte-equal to local mirror → current
			)
			fixture.route(
				buildGuidePath('relation'),
				(_request, response) => respondText(response, 200, 'relation guide'), // no local mirror → behind
			)
			fixture.route(buildRegistryPath('@orkestrel/contract'), (_request, response) =>
				respondJSON(response, '0.0.5'),
			)
			fixture.route(buildRegistryPath('@orkestrel/relation'), (_request, response) =>
				respondJSON(response, '0.0.5'),
			)

			const sync = createSync({ guides: { base: fixture.base }, registry: { base: fixture.base } })
			const report = await sync.pull(directory.path)

			expect(report.target).toBe(directory.path)
			expect(report.guides).toHaveLength(2) // deduplicated — one entry per unique name
			const contractGuide = report.guides.find((guide) => guide.name === '@orkestrel/contract')
			const relationGuide = report.guides.find((guide) => guide.name === '@orkestrel/relation')
			expect(contractGuide?.freshness).toBe('current')
			expect(relationGuide?.freshness).toBe('behind')
			expect(report.failed).toBe(0)
			expect(report.clean).toBe(false) // relation guide is behind
			sync.destroy()
		} finally {
			await directory.cleanup()
			await fixture.close()
		}
	})

	it('counts failed fetches and reports NOT clean', async () => {
		const fixture = await buildHTTPFixture()
		const directory = await buildTempDirectory()
		try {
			writeFileSync(
				join(directory.path, 'package.json'),
				JSON.stringify({ name: 'x', dependencies: { '@orkestrel/contract': '^0.0.5' } }),
				'utf8',
			)
			// No routes registered — guide fetch 404s (missing), registry fetch 404s (missing)
			const sync = createSync({ guides: { base: fixture.base }, registry: { base: fixture.base } })
			const report = await sync.pull(directory.path)
			expect(report.failed).toBe(2)
			expect(report.clean).toBe(false)
			sync.destroy()
		} finally {
			await directory.cleanup()
			await fixture.close()
		}
	})
})

// ── Sync.write ────────────────────────────────────────────────────────────

describe('Sync.write', () => {
	it('writes ONLY behind guides, creating guides/src when absent, returning written paths', async () => {
		const directory = await buildTempDirectory()
		try {
			const report = buildSyncReport(
				{
					guides: [
						{
							name: '@orkestrel/contract',
							path: 'guides/src/contract.md',
							content: 'fresh content',
							freshness: 'behind',
							baseline: 'absent',
						},
						{
							name: '@orkestrel/relation',
							path: 'guides/src/relation.md',
							content: '',
							freshness: 'current',
						},
						{
							name: '@orkestrel/database',
							path: 'guides/src/database.md',
							content: '',
							freshness: 'missing',
						},
						{
							name: '@orkestrel/tool',
							path: 'guides/src/tool.md',
							content: '',
							freshness: 'failed',
						},
					],
				},
				directory.path,
			)
			expect(existsSync(join(directory.path, 'guides', 'src'))).toBe(false)
			const sync = createSync()
			const written = await sync.write(report, directory.path)
			expect(written).toEqual(['guides/src/contract.md'])
			expect(readFileSync(join(directory.path, 'guides', 'src', 'contract.md'), 'utf8')).toBe(
				'fresh content',
			)
			expect(existsSync(join(directory.path, 'guides', 'src', 'relation.md'))).toBe(false)
			expect(existsSync(join(directory.path, 'guides', 'src', 'database.md'))).toBe(false)
			expect(existsSync(join(directory.path, 'guides', 'src', 'tool.md'))).toBe(false)
			sync.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('containment: a hostile hand-built path/name throws a coded error, writing nothing outside target', async () => {
		const directory = await buildTempDirectory()
		try {
			const report = buildSyncReport(
				{
					guides: [
						{
							name: '../../evil',
							path: '../../escaped.md',
							content: 'evil',
							freshness: 'behind',
						},
					],
				},
				directory.path,
			)
			const sync = createSync()
			let caught: unknown
			try {
				await sync.write(report, directory.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('WRITE')
			expect(existsSync(join(directory.path, '..', '..', 'escaped.md'))).toBe(false)
			sync.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('preflights every behind destination before preserving an earlier valid user-owned mirror', async () => {
		const directory = await buildTempDirectory()
		try {
			const valid = join(directory.path, 'guides', 'src', 'contract.md')
			mkdirSync(dirname(valid), { recursive: true })
			writeFileSync(valid, 'user-owned bytes', 'utf8')
			const report = buildSyncReport(
				{
					guides: [
						{
							name: '@orkestrel/contract',
							path: 'guides/src/contract.md',
							content: 'replacement bytes',
							freshness: 'behind',
							baseline: digestText('user-owned bytes'),
						},
						{
							name: '@orkestrel/evil',
							path: '../../escaped.md',
							content: 'evil',
							freshness: 'behind',
						},
					],
				},
				directory.path,
			)
			const sync = createSync()
			await expect(sync.write(report, directory.path)).rejects.toMatchObject({ code: 'WRITE' })
			expect(readFileSync(valid, 'utf8')).toBe('user-owned bytes')
			expect(existsSync(join(directory.path, '..', '..', 'escaped.md'))).toBe(false)
			sync.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('rejects non-canonical ownership, report tree collisions, and later directory shapes before mutation', async () => {
		const cases: readonly {
			readonly second: GuideSync
			readonly prepare: string | undefined
		}[] = [
			{
				second: {
					name: '@orkestrel/evil',
					path: 'package.json',
					content: 'attacker bytes',
					freshness: 'behind',
				},
				prepare: undefined,
			},
			{
				second: {
					name: '@orkestrel/foo',
					path: 'guides/src/foo.md/bar.md',
					content: 'nested bytes',
					freshness: 'behind',
				},
				prepare: undefined,
			},
			{
				second: {
					name: '@orkestrel/relation',
					path: 'guides/src/relation.md',
					content: 'replacement bytes',
					freshness: 'behind',
				},
				prepare: 'guides/src/relation.md',
			},
		]
		for (const testCase of cases) {
			const directory = await buildTempDirectory()
			try {
				const valid = join(directory.path, 'guides', 'src', 'contract.md')
				mkdirSync(dirname(valid), { recursive: true })
				writeFileSync(valid, 'user-owned bytes', 'utf8')
				if (testCase.prepare !== undefined) {
					mkdirSync(join(directory.path, testCase.prepare), { recursive: true })
				}
				const report = buildSyncReport(
					{
						guides: [
							{
								name: '@orkestrel/contract',
								path: 'guides/src/contract.md',
								content: 'replacement bytes',
								freshness: 'behind',
								baseline: digestText('user-owned bytes'),
							},
							testCase.second,
						],
					},
					directory.path,
				)
				const sync = createSync()
				await expect(sync.write(report, directory.path)).rejects.toMatchObject({ code: 'WRITE' })
				expect(readFileSync(valid, 'utf8')).toBe('user-owned bytes')
				sync.destroy()
			} finally {
				await directory.cleanup()
			}
		}
	})

	it('rejects accessors before they can redirect a validated write', async () => {
		const directory = await buildTempDirectory()
		try {
			const valid = join(directory.path, 'guides', 'src', 'contract.md')
			mkdirSync(dirname(valid), { recursive: true })
			writeFileSync(valid, 'user-owned bytes', 'utf8')
			const report = buildSyncReport(
				{
					guides: [
						{
							name: '@orkestrel/contract',
							path: 'guides/src/contract.md',
							content: 'replacement bytes',
							freshness: 'behind',
							baseline: digestText('user-owned bytes'),
						},
					],
				},
				directory.path,
			)
			const guide = report.guides[0]
			if (guide === undefined) throw new Error('expected one guide')
			let pathReads = 0
			Object.defineProperty(guide, 'path', {
				configurable: true,
				get: () => {
					pathReads += 1
					return pathReads === 1 ? 'guides/src/contract.md' : 'package.json'
				},
			})
			const sync = createSync()
			await expect(sync.write(report, directory.path)).rejects.toMatchObject({ code: 'WRITE' })
			expect(pathReads).toBe(0)
			expect(readFileSync(valid, 'utf8')).toBe('user-owned bytes')
			expect(existsSync(join(directory.path, 'package.json'))).toBe(false)
			sync.destroy()
		} finally {
			await directory.cleanup()
		}
	})
})

// ── Timeout ───────────────────────────────────────────────────────────────

describe('Sync — timeout', () => {
	it('a route that never responds verdicts failed promptly with a small configured timeout', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildGuidePath('contract'), () => {
				// Never call response.end() — the request must be aborted by the timeout.
			})
			const sync = createSync({ guides: { base: fixture.base, timeout: 50 } })
			const started = Date.now()
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('failed')
			expect(Date.now() - started).toBeLessThan(5_000)
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})
})

// ── strict mode ───────────────────────────────────────────────────────────

describe('Sync — strict mode', () => {
	it('throws a coded FETCH error naming the exact failing URL on the first failure', async () => {
		const fixture = await buildHTTPFixture()
		try {
			// No route registered — 404 → missing → strict throw.
			const sync = createSync({ guides: { base: fixture.base }, strict: true })
			let caught: unknown
			try {
				await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('FETCH')
			const expectedUrl = `${fixture.base}${buildGuidePath('contract')}`
			expect(String(caught.message)).toContain(expectedUrl)
			expect(caught.context).toMatchObject({ url: expectedUrl })
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})
})

// ── retries ───────────────────────────────────────────────────────────────

describe('Sync — retries', () => {
	it('with retries:1, a transport fault then success is retried into behind', async () => {
		const fixture = await buildHTTPFixture()
		try {
			let attempt = 0
			fixture.route(buildGuidePath('contract'), (_request, response) => {
				attempt += 1
				if (attempt === 1) {
					respondDestroy(response)
					return
				}
				respondText(response, 200, 'recovered content')
			})
			const sync = createSync({ guides: { base: fixture.base }, retries: 1 })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('behind')
			expect(result?.content).toBe('recovered content')
			expect(attempt).toBe(2)
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('a 404 is NOT retried — the fixture sees exactly one hit', async () => {
		const fixture = await buildHTTPFixture()
		try {
			// No route registered — 404.
			const sync = createSync({ guides: { base: fixture.base }, retries: 3 })
			await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(fixture.hits.get(buildGuidePath('contract'))).toBe(1)
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})
})

// ── concurrency bound ─────────────────────────────────────────────────────

describe('Sync — concurrency bound', () => {
	it('never exceeds the configured concurrency for N deps', async () => {
		const fixture = await buildHTTPFixture()
		try {
			const deps = Array.from({ length: 8 }, (_unused, index) =>
				dependency(`@orkestrel/dep${index}`, '^0.0.5'),
			)
			let inFlight = 0
			let maxInFlight = 0
			for (const dep of deps) {
				fixture.route(
					buildGuidePath(dep.name.slice('@orkestrel/'.length)),
					(_request, response) => {
						inFlight += 1
						maxInFlight = Math.max(maxInFlight, inFlight)
						setTimeout(() => {
							inFlight -= 1
							respondText(response, 200, 'content')
						}, 20)
					},
				)
			}
			const sync = createSync({ guides: { base: fixture.base }, concurrency: 3 })
			await sync.guides(deps)
			expect(maxInFlight).toBeLessThanOrEqual(3)
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})
})

// ── events ────────────────────────────────────────────────────────────────

describe('Sync — events', () => {
	it('emits guide/version/write/done in order with the expected payloads', async () => {
		const fixture = await buildHTTPFixture()
		const directory = await buildTempDirectory()
		try {
			writeFileSync(
				join(directory.path, 'package.json'),
				JSON.stringify({ name: 'x', dependencies: { '@orkestrel/contract': '^0.0.5' } }),
				'utf8',
			)
			fixture.route(buildGuidePath('contract'), (_request, response) =>
				respondText(response, 200, 'guide content'),
			)
			fixture.route(buildRegistryPath('@orkestrel/contract'), (_request, response) =>
				respondJSON(response, '0.0.5'),
			)
			const sequence: string[] = []
			const guideRecorder = createRecorder<readonly [name: string]>()
			const versionRecorder = createRecorder<readonly [name: string]>()
			const writeRecorder = createRecorder<readonly [path: string]>()
			const doneRecorder = createRecorder<readonly [report: unknown]>()
			const sync = createSync({
				guides: { base: fixture.base },
				registry: { base: fixture.base },
				on: {
					guide: (...args) => {
						sequence.push('guide')
						guideRecorder.handler(...args)
					},
					version: (...args) => {
						sequence.push('version')
						versionRecorder.handler(...args)
					},
					write: (...args) => {
						sequence.push('write')
						writeRecorder.handler(...args)
					},
					done: (...args) => {
						sequence.push('done')
						doneRecorder.handler(...args)
					},
				},
			})

			const report = await sync.pull(directory.path)
			expect(guideRecorder.count).toBe(1)
			expect(guideRecorder.calls[0]?.[0]).toBe('@orkestrel/contract')
			expect(versionRecorder.count).toBe(1)
			expect(versionRecorder.calls[0]?.[0]).toBe('@orkestrel/contract')
			expect(doneRecorder.count).toBe(1)
			expect(doneRecorder.calls[0]?.[0]).toEqual(report)
			// guide/version both precede done; done is last.
			expect(sequence.indexOf('done')).toBe(sequence.length - 1)
			expect(sequence.indexOf('guide')).toBeLessThan(sequence.indexOf('done'))
			expect(sequence.indexOf('version')).toBeLessThan(sequence.indexOf('done'))

			const written = await sync.write(report, directory.path)
			expect(writeRecorder.count).toBe(written.length)
			sync.destroy()
		} finally {
			await directory.cleanup()
			await fixture.close()
		}
	})

	it('routes a listener throw to the configured error handler', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildGuidePath('contract'), (_request, response) =>
				respondText(response, 200, 'content'),
			)
			const errorRecorder = createRecorder<readonly [error: unknown]>()
			const sync = createSync({
				guides: { base: fixture.base },
				on: {
					guide: () => {
						throw new Error('listener boom')
					},
				},
				error: errorRecorder.handler,
			})
			await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(errorRecorder.count).toBe(1)
			expect(errorRecorder.calls[0]?.[0]).toBeInstanceOf(Error)
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})
})

// ── destroy semantics ────────────────────────────────────────────────────────

describe('Sync.destroy', () => {
	it('is idempotent, emits destroy once (last), and every method throws DESTROYED afterward', async () => {
		const directory = await buildTempDirectory()
		try {
			const destroyRecorder = createRecorder<readonly []>()
			const sync = createSync({ on: { destroy: destroyRecorder.handler } })
			sync.destroy()
			sync.destroy() // idempotent — no second emit, no throw
			expect(destroyRecorder.count).toBe(1)

			const report = buildSyncReport(undefined, directory.path)
			for (const attempt of [
				() => sync.guides([dependency('@orkestrel/contract', '^0.0.5')]),
				() => sync.versions([dependency('@orkestrel/contract', '^0.0.5')]),
				() => sync.pull(directory.path),
				() => sync.write(report, directory.path),
			]) {
				let caught: unknown
				try {
					await attempt()
				} catch (error) {
					caught = error
				}
				if (!isScaffoldError(caught))
					throw new Error('expected a DESTROYED ScaffoldError to be thrown')
				expect(caught.code).toBe('DESTROYED')
			}
		} finally {
			await directory.cleanup()
		}
	})
})

// ── body size limit ──────────────────────────────────────────────────────

describe('Sync — body size limit', () => {
	it('cancels a malformed UTF-8 stream, reports failed, and releases the peer promptly', async () => {
		const fixture = await buildHTTPFixture()
		const peerClosed = Promise.withResolvers<void>()
		let interval: ReturnType<typeof setInterval> | undefined
		try {
			fixture.route(buildGuidePath('contract'), (request, response) => {
				response.writeHead(200, { 'content-type': 'text/markdown; charset=utf-8' })
				response.write(Buffer.from([0xff]))
				interval = setInterval(() => response.write('still-open'), 25)
				request.once('close', () => {
					peerClosed.resolve()
					if (interval !== undefined) clearInterval(interval)
				})
			})
			const sync = createSync({ guides: { base: fixture.base }, retries: 0 })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			await peerClosed.promise

			expect(result?.freshness).toBe('failed')
			sync.destroy()
		} finally {
			if (interval !== undefined) clearInterval(interval)
			await fixture.close()
		}
	})

	it('throws FETCH in strict mode for malformed UTF-8 without retaining the stream', async () => {
		const fixture = await buildHTTPFixture()
		const peerClosed = Promise.withResolvers<void>()
		let interval: ReturnType<typeof setInterval> | undefined
		try {
			fixture.route(buildGuidePath('contract'), (request, response) => {
				response.writeHead(200, { 'content-type': 'text/markdown; charset=utf-8' })
				response.write(Buffer.from([0xff]))
				interval = setInterval(() => response.write('still-open'), 25)
				request.once('close', () => {
					peerClosed.resolve()
					if (interval !== undefined) clearInterval(interval)
				})
			})
			const sync = createSync({
				guides: { base: fixture.base },
				retries: 0,
				strict: true,
			})

			await expect(
				sync.guides([dependency('@orkestrel/contract', '^0.0.5')]),
			).rejects.toMatchObject({ code: 'FETCH' })
			await peerClosed.promise
			sync.destroy()
		} finally {
			if (interval !== undefined) clearInterval(interval)
			await fixture.close()
		}
	})

	it('a body larger than a small configured limit verdicts failed, process stays healthy', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildGuidePath('contract'), (_request, response) => {
				response.writeHead(200, { 'content-type': 'text/plain' })
				response.end('x'.repeat(1000))
			})
			const sync = createSync({ guides: { base: fixture.base }, limit: 64 })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('failed')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('a body under the limit stays byte-identical', async () => {
		const fixture = await buildHTTPFixture()
		try {
			const body = 'y'.repeat(50)
			fixture.route(buildGuidePath('contract'), (_request, response) =>
				respondText(response, 200, body),
			)
			const sync = createSync({ guides: { base: fixture.base }, limit: 64 })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('behind')
			expect(result?.content).toBe(body)
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('an oversized declared Content-Length verdicts failed without reading the body', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildGuidePath('contract'), (_request, response) => {
				response.writeHead(200, { 'content-type': 'text/plain', 'content-length': '1000' })
				response.end('x'.repeat(1000))
			})
			const sync = createSync({ guides: { base: fixture.base }, limit: 64 })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('failed')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})
})

// ── pool fail-fast without unhandled rejections ──────────────────────────

describe('Sync — strict pool teardown', () => {
	it('a dead endpoint with several deps at concurrency ≥2 rejects once with no unhandledRejection', async () => {
		const fixture = await buildHTTPFixture()
		const port = fixture.base.match(/:(\d+)$/)?.[1] ?? '0'
		await fixture.close() // close immediately — connections to this port now refuse
		const deadBase = `http://127.0.0.1:${port}`

		const unhandledRecorder = createRecorder<readonly [reason: unknown]>()
		process.on('unhandledRejection', unhandledRecorder.handler)
		try {
			const deps = Array.from({ length: 4 }, (_unused, index) =>
				dependency(`@orkestrel/dep${index}`, '^0.0.5'),
			)
			const sync = createSync({
				guides: { base: deadBase, timeout: 500 },
				concurrency: 2,
				strict: true,
			})
			let caught: unknown
			try {
				await sync.guides(deps)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('FETCH')
			sync.destroy()
			// Let any straggling microtasks/macrotasks that would produce an
			// unhandled rejection run before asserting.
			await new Promise((resolvePromise) => setTimeout(resolvePromise, 50))
			expect(unhandledRecorder.count).toBe(0)
		} finally {
			process.off('unhandledRejection', unhandledRecorder.handler)
		}
	})
})

// ── manual redirect handling ──────────────────────────────────────────────

describe('Sync redirect handling', () => {
	it('a 302 verdicts failed and the redirect target is never requested', async () => {
		const fixture = await buildHTTPFixture()
		const target = await buildHTTPFixture()
		try {
			fixture.route(buildGuidePath('contract'), (_request, response) => {
				response.writeHead(302, { location: `${target.base}${buildGuidePath('contract')}` })
				response.end()
			})
			target.route(buildGuidePath('contract'), (_request, response) =>
				respondText(response, 200, 'should never be fetched'),
			)
			const sync = createSync({ guides: { base: fixture.base } })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('failed')
			expect(target.hits.size).toBe(0)
			sync.destroy()
		} finally {
			await fixture.close()
			await target.close()
		}
	})
})

// ── failure notes (the transport/HTTP/redirect/oversized CAUSE) ──────────

describe('Sync — failure notes', () => {
	it('connection-refused: note contains the connection-refused code', async () => {
		const fixture = await buildHTTPFixture()
		const port = fixture.base.match(/:(\d+)$/)?.[1] ?? '0'
		await fixture.close() // close immediately — connections to this port now refuse
		const deadBase = `http://127.0.0.1:${port}`
		const sync = createSync({ guides: { base: deadBase, timeout: 2000 } })
		const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
		expect(result?.freshness).toBe('failed')
		expect(result?.note).toContain('ECONNREFUSED')
		sync.destroy()
	})

	it('HTTP 500: note is exactly "HTTP 500"', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildGuidePath('contract'), (_request, response) =>
				respondText(response, 500, 'server error'),
			)
			const sync = createSync({ guides: { base: fixture.base } })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('failed')
			expect(result?.note).toBe('HTTP 500')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('302: note mentions the blocked redirect', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildGuidePath('contract'), (_request, response) => {
				response.writeHead(302, { location: `${fixture.base}${buildGuidePath('elsewhere')}` })
				response.end()
			})
			const sync = createSync({ guides: { base: fixture.base } })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('failed')
			expect(result?.note).toContain('redirect')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('oversized body: note mentions the byte limit', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildGuidePath('contract'), (_request, response) => {
				response.writeHead(200, { 'content-type': 'text/plain' })
				response.end('x'.repeat(1000))
			})
			const sync = createSync({ guides: { base: fixture.base }, limit: 64 })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('failed')
			expect(result?.note).toContain('allowance')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('a 404 verdicts missing with an "HTTP 404" note', async () => {
		const fixture = await buildHTTPFixture()
		try {
			const sync = createSync({ guides: { base: fixture.base } })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('missing')
			expect(result?.note).toBe('HTTP 404')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('behind and current carry no note', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildGuidePath('contract'), (_request, response) =>
				respondText(response, 200, 'fresh content'),
			)
			const sync = createSync({ guides: { base: fixture.base } })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('behind')
			expect(result?.note).toBeUndefined()
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})
})

// ── Canonical redirect-free guide URL ─────────────────────────────────────

describe('Sync.guides — canonical URL shape', () => {
	it('requests the canonical /orkestrel/<short>/refs/heads/<branch>/… path directly', async () => {
		const fixture = await buildHTTPFixture()
		try {
			fixture.route(buildGuidePath('contract'), (_request, response) =>
				respondText(response, 200, '# Contract Guide\n'),
			)
			const sync = createSync({ guides: { base: fixture.base } })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('behind')
			expect(fixture.hits.get('/orkestrel/contract/refs/heads/main/guides/src/contract.md')).toBe(1)
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})
})
