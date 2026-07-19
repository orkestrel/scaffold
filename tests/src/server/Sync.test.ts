import type { SyncReport } from '@src/core'
import type { AddressInfo } from 'node:net'
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { dependency, isScaffoldError } from '@src/core'
import { createSync } from '@src/server'
import { createRecorder } from '../../setup.js'
import { buildTempDirectory } from '../../setupServer.js'

// ── Real HTTP fixture (AGENTS §16: no mocks) ─────────────────────────────────
//
// A genuine `node:http` server on an ephemeral port. Each test wires its own
// route table keyed by the request URL and always tears down in `finally`.

type RouteHandler = (
	request: import('node:http').IncomingMessage,
	response: import('node:http').ServerResponse,
) => void

interface FixtureInterface {
	readonly base: string
	readonly hits: Map<string, number>
	route(path: string, handler: RouteHandler): void
	close(): Promise<void>
}

async function buildFixture(): Promise<FixtureInterface> {
	const routes = new Map<string, RouteHandler>()
	const hits = new Map<string, number>()
	const server = createServer((request, response) => {
		const url = request.url ?? ''
		hits.set(url, (hits.get(url) ?? 0) + 1)
		const handler = routes.get(url)
		if (handler === undefined) {
			response.writeHead(404)
			response.end()
			return
		}
		handler(request, response)
	})
	await new Promise<void>((resolvePromise) => server.listen(0, '127.0.0.1', () => resolvePromise()))
	const address = server.address() as AddressInfo
	const base = `http://127.0.0.1:${address.port}`
	return {
		base,
		hits,
		route(path, handler) {
			routes.set(path, handler)
		},
		async close() {
			await new Promise<void>((resolvePromise) => server.close(() => resolvePromise()))
		},
	}
}

function guidePath(short: string, branch = 'main'): string {
	return `/${short}/${branch}/guides/src/${short}.md`
}

// npm's canonical scoped-package path keeps the literal `@` and encodes only
// the slash (A2) — NOT `encodeURIComponent`, which would also escape `@`.
function registryPath(name: string): string {
	return `/${name.replace('/', '%2F')}`
}

function respondText(
	response: import('node:http').ServerResponse,
	status: number,
	body: string,
): void {
	response.writeHead(status, { 'content-type': 'text/plain' })
	response.end(body)
}

function respondJson(response: import('node:http').ServerResponse, latest: string): void {
	response.writeHead(200, { 'content-type': 'application/json' })
	response.end(JSON.stringify({ 'dist-tags': { latest } }))
}

function respondDestroy(response: import('node:http').ServerResponse): void {
	response.destroy()
}

// ── Sync.guides ───────────────────────────────────────────────────────────

describe('Sync.guides', () => {
	it('without a reference map: a successful fetch verdicts behind, carrying the fetched content', async () => {
		const fixture = await buildFixture()
		try {
			fixture.route(guidePath('contract'), (_request, response) =>
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
		const fixture = await buildFixture()
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
		const fixture = await buildFixture()
		try {
			fixture.route(guidePath('contract'), (_request, response) => respondDestroy(response))
			const sync = createSync({ guides: { base: fixture.base } })
			const [result] = await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(result?.freshness).toBe('failed')
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})

	it('WITH a reference map: byte-equal entry verdicts current', async () => {
		const fixture = await buildFixture()
		try {
			fixture.route(guidePath('contract'), (_request, response) =>
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
		const fixture = await buildFixture()
		try {
			fixture.route(guidePath('contract'), (_request, response) =>
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
		const fixture = await buildFixture()
		try {
			fixture.route(guidePath('contract'), (_request, response) =>
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

describe('Sync.versions', () => {
	it('current: the declared range is satisfied by latest', async () => {
		const fixture = await buildFixture()
		try {
			fixture.route(registryPath('@orkestrel/contract'), (_request, response) =>
				respondJson(response, '0.0.5'),
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
		const fixture = await buildFixture()
		try {
			fixture.route(registryPath('@orkestrel/contract'), (_request, response) =>
				respondJson(response, '0.0.9'),
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
		const fixture = await buildFixture()
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
		const fixture = await buildFixture()
		try {
			fixture.route(registryPath('@orkestrel/contract'), (_request, response) =>
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

	it('A2: the scoped package name keeps a literal @ and encodes only the slash', async () => {
		const fixture = await buildFixture()
		try {
			const canonical = registryPath('@orkestrel/contract')
			expect(canonical).toBe('/@orkestrel%2Fcontract')
			fixture.route(canonical, (_request, response) => respondJson(response, '0.0.5'))
			const sync = createSync({ registry: { base: fixture.base } })
			await sync.versions([dependency('@orkestrel/contract', '^0.0.5')])
			expect(fixture.hits.get(canonical)).toBe(1)
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})
})

// ── Sync.pull ─────────────────────────────────────────────────────────────

describe('Sync.pull', () => {
	it('reads declared deps from dependencies+devDependencies (deduplicated) and verdicts target-relative freshness', async () => {
		const fixture = await buildFixture()
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
				guidePath('contract'),
				(_request, response) => respondText(response, 200, 'stale mirror'), // byte-equal to local mirror → current
			)
			fixture.route(
				guidePath('relation'),
				(_request, response) => respondText(response, 200, 'relation guide'), // no local mirror → behind
			)
			fixture.route(registryPath('@orkestrel/contract'), (_request, response) =>
				respondJson(response, '0.0.5'),
			)
			fixture.route(registryPath('@orkestrel/relation'), (_request, response) =>
				respondJson(response, '0.0.5'),
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
		const fixture = await buildFixture()
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
	function buildReport(target: string, overrides?: Partial<SyncReport>): SyncReport {
		return {
			target,
			guides: [],
			versions: [],
			clean: true,
			failed: 0,
			...overrides,
		}
	}

	it('writes ONLY behind guides, creating guides/src when absent, returning written paths', async () => {
		const directory = await buildTempDirectory()
		try {
			const report = buildReport(directory.path, {
				guides: [
					{
						name: '@orkestrel/contract',
						path: 'guides/src/contract.md',
						content: 'fresh content',
						freshness: 'behind',
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
			})
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
			const report = buildReport(directory.path, {
				guides: [
					{
						name: '../../evil',
						path: '../../escaped.md',
						content: 'evil',
						freshness: 'behind',
					},
				],
			})
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
})

// ── Timeout ───────────────────────────────────────────────────────────────

describe('Sync — timeout', () => {
	it('a route that never responds verdicts failed promptly with a small configured timeout', async () => {
		const fixture = await buildFixture()
		try {
			fixture.route(guidePath('contract'), () => {
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
		const fixture = await buildFixture()
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
			const expectedUrl = `${fixture.base}${guidePath('contract')}`
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
		const fixture = await buildFixture()
		try {
			let attempt = 0
			fixture.route(guidePath('contract'), (_request, response) => {
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
		const fixture = await buildFixture()
		try {
			// No route registered — 404.
			const sync = createSync({ guides: { base: fixture.base }, retries: 3 })
			await sync.guides([dependency('@orkestrel/contract', '^0.0.5')])
			expect(fixture.hits.get(guidePath('contract'))).toBe(1)
			sync.destroy()
		} finally {
			await fixture.close()
		}
	})
})

// ── concurrency bound ─────────────────────────────────────────────────────

describe('Sync — concurrency bound', () => {
	it('never exceeds the configured concurrency for N deps', async () => {
		const fixture = await buildFixture()
		try {
			const deps = Array.from({ length: 8 }, (_unused, index) =>
				dependency(`@orkestrel/dep${index}`, '^0.0.5'),
			)
			let inFlight = 0
			let maxInFlight = 0
			for (const dep of deps) {
				fixture.route(guidePath(dep.name.slice('@orkestrel/'.length)), (_request, response) => {
					inFlight += 1
					maxInFlight = Math.max(maxInFlight, inFlight)
					setTimeout(() => {
						inFlight -= 1
						respondText(response, 200, 'content')
					}, 20)
				})
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
		const fixture = await buildFixture()
		const directory = await buildTempDirectory()
		try {
			writeFileSync(
				join(directory.path, 'package.json'),
				JSON.stringify({ name: 'x', dependencies: { '@orkestrel/contract': '^0.0.5' } }),
				'utf8',
			)
			fixture.route(guidePath('contract'), (_request, response) =>
				respondText(response, 200, 'guide content'),
			)
			fixture.route(registryPath('@orkestrel/contract'), (_request, response) =>
				respondJson(response, '0.0.5'),
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
		const fixture = await buildFixture()
		try {
			fixture.route(guidePath('contract'), (_request, response) =>
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

			const report: SyncReport = {
				target: directory.path,
				guides: [],
				versions: [],
				clean: true,
				failed: 0,
			}
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

// ── R2: body size limit ──────────────────────────────────────────────────

describe('Sync — body size limit', () => {
	it('a body larger than a small configured limit verdicts failed, process stays healthy', async () => {
		const fixture = await buildFixture()
		try {
			fixture.route(guidePath('contract'), (_request, response) => {
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
		const fixture = await buildFixture()
		try {
			const body = 'y'.repeat(50)
			fixture.route(guidePath('contract'), (_request, response) => respondText(response, 200, body))
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
		const fixture = await buildFixture()
		try {
			fixture.route(guidePath('contract'), (_request, response) => {
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

// ── R3: pool fail-fast without unhandled rejections ──────────────────────

describe('Sync — strict pool teardown', () => {
	it('a dead endpoint with several deps at concurrency ≥2 rejects once with no unhandledRejection', async () => {
		const fixture = await buildFixture()
		const port = fixture.base.match(/:(\d+)$/)?.[1] ?? '0'
		await fixture.close() // close immediately — connections to this port now refuse
		const deadBase = `http://127.0.0.1:${port}`

		const unhandled: unknown[] = []
		const onUnhandled = (reason: unknown) => unhandled.push(reason)
		process.on('unhandledRejection', onUnhandled)
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
			// Let any straggling microtasks/macrotasks that would surface an
			// unhandled rejection run before asserting.
			await new Promise((resolvePromise) => setTimeout(resolvePromise, 50))
			expect(unhandled).toHaveLength(0)
		} finally {
			process.off('unhandledRejection', onUnhandled)
		}
	})
})

// ── A1: manual redirect handling ──────────────────────────────────────────

describe('Sync — redirect handling (A1)', () => {
	it('a 302 verdicts failed and the redirect target is never requested', async () => {
		const fixture = await buildFixture()
		const target = await buildFixture()
		try {
			fixture.route(guidePath('contract'), (_request, response) => {
				response.writeHead(302, { location: `${target.base}${guidePath('contract')}` })
				response.end()
			})
			target.route(guidePath('contract'), (_request, response) =>
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
