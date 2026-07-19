import type { SyncEventMap, SyncInterface, SyncOptions } from './types.js'
import type { Dependency, Freshness, GuideSync, SyncReport, VersionSync } from '@src/core'
import type { EmitterInterface } from '@orkestrel/emitter'
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { dirname, join, relative as relativeOf, resolve, sep } from 'node:path'
import { Emitter } from '@orkestrel/emitter'
import { manifestToDependencies, rangeToFreshness, ScaffoldError } from '@src/core'
import { readManifest } from './helpers.js'

/**
 * The upstream-synchronization entity (server) — the impure FETCH sibling of
 * `Materializer`, Promise-based and network-only.
 *
 * @remarks
 * Every method reads upstream over HTTPS with a 10-second per-request
 * `AbortSignal.timeout` and bounded `concurrency` (default 6, never an
 * unbounded `Promise.all`). The default COLLECT posture captures each
 * dependency's `freshness` (`404` → `missing`, transport / other non-2xx →
 * `failed`) into the result; `strict` mode instead throws
 * `ScaffoldError('FETCH', …)` naming the failing URL. `guides`'s optional
 * `current` parameter is a caller-supplied local-mirror content map keyed by
 * dependency NAME (the `diffPlan` caller-supplied-reference pattern): WITH the
 * map, a fetched guide byte-equal to its entry verdicts `current`, anything
 * differing or absent from the map verdicts `behind`; WITHOUT the map, every
 * successful fetch verdicts `behind` (no reference means it needs syncing).
 * `pull` builds that map itself from the TARGET's own `guides/src/<short>.md`
 * mirrors, so its verdicts are target-relative; `write` commits only the
 * `behind` guides (never `current`, `missing`, or `failed`, which carries no
 * trustworthy content) under the same realpath-anchored containment law
 * `Materializer` enforces. After `destroy()` every method throws `DESTROYED`;
 * teardown is idempotent, emitter last.
 *
 * @example
 * ```ts
 * import { createSync } from '@orkestrel/scaffold/server'
 *
 * const sync = createSync()
 * const report = await sync.pull('.')
 * if (report.failed === 0) await sync.write(report, '.')
 * sync.destroy()
 * ```
 */
export class Sync implements SyncInterface {
	static readonly #DEFAULT_TIMEOUT = 10_000
	static readonly #DEFAULT_CONCURRENCY = 6
	static readonly #DEFAULT_LIMIT = 5_242_880 // 5 MiB

	readonly #emitter: Emitter<SyncEventMap>
	readonly #guidesBase: string
	readonly #branch: string
	readonly #guidesTimeout: number
	readonly #registryBase: string
	readonly #registryTimeout: number
	readonly #concurrency: number
	readonly #retries: number
	readonly #strict: boolean
	readonly #limit: number
	#destroyed = false

	constructor(options?: SyncOptions) {
		this.#emitter = new Emitter<SyncEventMap>({ on: options?.on, error: options?.error })
		this.#guidesBase = options?.guides?.base ?? 'raw.githubusercontent.com'
		this.#branch = options?.guides?.branch ?? 'main'
		this.#guidesTimeout = options?.guides?.timeout ?? Sync.#DEFAULT_TIMEOUT
		this.#registryBase = options?.registry?.base ?? 'registry.npmjs.org'
		this.#registryTimeout = options?.registry?.timeout ?? Sync.#DEFAULT_TIMEOUT
		this.#concurrency = options?.concurrency ?? Sync.#DEFAULT_CONCURRENCY
		this.#retries = options?.retries ?? 0
		this.#strict = options?.strict ?? false
		this.#limit = options?.limit ?? Sync.#DEFAULT_LIMIT
	}

	get emitter(): EmitterInterface<SyncEventMap> {
		return this.#emitter
	}

	async guides(
		deps: readonly Dependency[],
		current?: Readonly<Record<string, string>>,
	): Promise<readonly GuideSync[]> {
		this.#ensureAlive()
		return Sync.#runPool(deps, this.#concurrency, async (dep) => {
			const short = Sync.#shortName(dep.name)
			const url = this.#guideUrl(short)
			const outcome = await Sync.#fetchText(url, this.#guidesTimeout, this.#retries, this.#limit)
			const guide = Sync.#toGuideSync(dep.name, short, outcome, current)
			if (outcome.kind === 'failed') this.#emitter.emit('error', outcome.error)
			this.#emitter.emit('guide', dep.name)
			if (this.#strict && (guide.freshness === 'missing' || guide.freshness === 'failed')) {
				throw new ScaffoldError('FETCH', `Failed to fetch guide at ${url}`, {
					url,
					name: dep.name,
				})
			}
			return guide
		})
	}

	async versions(deps: readonly Dependency[]): Promise<readonly VersionSync[]> {
		this.#ensureAlive()
		return Sync.#runPool(deps, this.#concurrency, async (dep) => {
			const url = this.#registryUrl(dep.name)
			const outcome = await Sync.#fetchText(url, this.#registryTimeout, this.#retries, this.#limit)
			const version = Sync.#toVersionSync(dep, outcome)
			if (outcome.kind === 'failed') this.#emitter.emit('error', outcome.error)
			this.#emitter.emit('version', dep.name)
			if (this.#strict && (version.freshness === 'missing' || version.freshness === 'failed')) {
				throw new ScaffoldError('FETCH', `Failed to fetch registry version at ${url}`, {
					url,
					name: dep.name,
				})
			}
			return version
		})
	}

	async pull(target: string): Promise<SyncReport> {
		this.#ensureAlive()
		const deps = manifestToDependencies(readManifest(target))
		const current: Record<string, string> = {}
		for (const dep of deps) {
			const short = Sync.#shortName(dep.name)
			const full = join(target, 'guides', 'src', `${short}.md`)
			if (!existsSync(full)) continue
			try {
				current[dep.name] = readFileSync(full, 'utf8')
			} catch {
				// An unreadable local mirror is treated exactly like an absent one —
				// the caller-supplied map simply omits the entry.
			}
		}
		const guides = await this.guides(deps, current)
		const versions = await this.versions(deps)
		const failed = [...guides, ...versions].filter(
			(entry) => entry.freshness === 'missing' || entry.freshness === 'failed',
		).length
		const clean =
			failed === 0 &&
			guides.every((guide) => guide.freshness === 'current') &&
			versions.every((version) => version.freshness === 'current')
		const report: SyncReport = { target, guides, versions, clean, failed }
		this.#emitter.emit('done', report)
		return report
	}

	async write(report: SyncReport, target: string): Promise<readonly string[]> {
		this.#ensureAlive()
		const written: string[] = []
		for (const guide of report.guides) {
			if (guide.freshness !== 'behind') continue
			const to = Sync.#assertContained(target, guide.path)
			try {
				mkdirSync(dirname(to), { recursive: true })
				writeFileSync(to, guide.content, 'utf8')
			} catch (error) {
				this.#emitter.emit('error', error)
				throw new ScaffoldError('WRITE', `Failed to write guide at ${guide.path}`, {
					path: guide.path,
					error,
				})
			}
			written.push(guide.path)
			this.#emitter.emit('write', guide.path)
		}
		return written
	}

	destroy(): void {
		if (this.#destroyed) return
		this.#destroyed = true
		this.#emitter.emit('destroy')
		this.#emitter.destroy()
	}

	#guideUrl(short: string): string {
		return `${Sync.#normalizeBase(this.#guidesBase)}/${short}/${this.#branch}/guides/src/${short}.md`
	}

	// npm's canonical scoped-package registry path keeps the literal `@` and
	// encodes only the slash (`encodeURIComponent` would also escape the `@`
	// into `%40`, which registries accept but which diverges from the
	// canonical form). `name` is already gated by `DEPENDENCY_NAME_PATTERN`
	// upstream, so a plain slash replace is exhaustive here.
	#registryUrl(name: string): string {
		return `${Sync.#normalizeBase(this.#registryBase)}/${name.replace('/', '%2F')}`
	}

	static #normalizeBase(base: string): string {
		return /^https?:\/\//.test(base) ? base : `https://${base}`
	}

	static #shortName(name: string): string {
		const prefix = '@orkestrel/'
		return name.startsWith(prefix) ? name.slice(prefix.length) : name
	}

	static #isRecord(value: unknown): value is Record<string, unknown> {
		return typeof value === 'object' && value !== null && !Array.isArray(value)
	}

	// Bounded-concurrency worker pool — never an unbounded `Promise.all` (§12).
	// `concurrency` workers pull from a shared cursor over `items`, each
	// running `worker` to completion before pulling the next index; results
	// land back at their ORIGINAL index, so the returned array preserves
	// input order. Fail-fast-SAFELY: the first worker error stops the cursor
	// from issuing further items (a `stopped` flag, checked before each pull)
	// and every worker is awaited via `Promise.allSettled` — so a sibling's
	// later rejection is always observed, never an `unhandledRejection` — then
	// the FIRST error is rethrown.
	static async #runPool<T, R>(
		items: readonly T[],
		concurrency: number,
		worker: (item: T) => Promise<R>,
	): Promise<R[]> {
		const results: R[] = new Array(items.length)
		let cursor = 0
		let stopped = false
		let firstError: { readonly error: unknown } | undefined
		async function run(): Promise<void> {
			for (;;) {
				if (stopped) return
				const index = cursor
				cursor += 1
				if (index >= items.length) return
				try {
					results[index] = await worker(items[index])
				} catch (error) {
					if (firstError === undefined) firstError = { error }
					stopped = true
					return
				}
			}
		}
		const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => run())
		await Promise.allSettled(workers)
		if (firstError !== undefined) throw firstError.error
		return results
	}

	// One HTTPS GET with a per-request `AbortSignal.timeout` and up to
	// `retries` additional attempts on a TRANSPORT fault (a thrown/rejected
	// fetch, a non-2xx non-404 response, a manual 3xx redirect (A1), or a body
	// exceeding `limit` bytes (R2)) — a `404` is a definitive upstream answer
	// and is never retried.
	static async #fetchText(
		url: string,
		timeout: number,
		retries: number,
		limit: number,
	): Promise<
		| { readonly kind: 'ok'; readonly text: string }
		| { readonly kind: 'missing' }
		| { readonly kind: 'failed'; readonly error: unknown }
	> {
		let lastError: unknown
		for (let attempt = 0; attempt <= retries; attempt += 1) {
			try {
				// `redirect: 'manual'` (A1) — a compromised/misconfigured endpoint
				// must not silently redirect cross-host; any 3xx is treated as a
				// non-2xx transport fault, same as an unexpected status code.
				const response = await fetch(url, {
					signal: AbortSignal.timeout(timeout),
					redirect: 'manual',
				})
				if (response.status === 404) return { kind: 'missing' }
				if (!response.ok) {
					lastError = new Error(`Unexpected HTTP status ${response.status} for ${url}`)
					continue
				}
				const read = await Sync.#readBounded(response, url, limit)
				if (!read.ok) {
					lastError = read.error
					continue
				}
				return { kind: 'ok', text: read.text }
			} catch (error) {
				lastError = error
			}
		}
		return { kind: 'failed', error: lastError }
	}

	// Reads `response.body` incrementally, counting bytes, aborting past
	// `limit` (a declared oversized `Content-Length` short-circuits before any
	// read) — an overflow is reported as a transport fault, handled by the
	// caller exactly like any other (retry-eligible, then `failed` / strict
	// `FETCH`). `response.body` may be `null` (e.g. an empty reply); that
	// decodes to an empty string with no reader loop.
	static async #readBounded(
		response: Response,
		url: string,
		limit: number,
	): Promise<
		{ readonly ok: true; readonly text: string } | { readonly ok: false; readonly error: unknown }
	> {
		const declared = response.headers.get('content-length')
		if (declared !== null) {
			const declaredBytes = Number(declared)
			if (Number.isFinite(declaredBytes) && declaredBytes > limit) {
				return {
					ok: false,
					error: new Error(
						`Response body for ${url} declares ${String(declaredBytes)} bytes, exceeding the ${String(limit)}-byte limit`,
					),
				}
			}
		}
		const body = response.body
		if (body === null) return { ok: true, text: '' }
		const reader = body.getReader()
		const decoder = new TextDecoder()
		const chunks: string[] = []
		let total = 0
		try {
			for (;;) {
				const { done, value } = await reader.read()
				if (done) break
				total += value.byteLength
				if (total > limit) {
					return {
						ok: false,
						error: new Error(`Response body for ${url} exceeded the ${String(limit)}-byte limit`),
					}
				}
				chunks.push(decoder.decode(value, { stream: true }))
			}
			chunks.push(decoder.decode())
		} finally {
			reader.releaseLock()
		}
		return { ok: true, text: chunks.join('') }
	}

	static #toGuideSync(
		name: string,
		short: string,
		outcome:
			| { readonly kind: 'ok'; readonly text: string }
			| { readonly kind: 'missing' }
			| { readonly kind: 'failed'; readonly error: unknown },
		current?: Readonly<Record<string, string>>,
	): GuideSync {
		const path = `guides/src/${short}.md`
		if (outcome.kind === 'missing') return { name, path, content: '', freshness: 'missing' }
		if (outcome.kind === 'failed') return { name, path, content: '', freshness: 'failed' }
		const freshness: Freshness = current?.[name] === outcome.text ? 'current' : 'behind'
		return { name, path, content: outcome.text, freshness }
	}

	static #toVersionSync(
		dep: Dependency,
		outcome:
			| { readonly kind: 'ok'; readonly text: string }
			| { readonly kind: 'missing' }
			| { readonly kind: 'failed'; readonly error: unknown },
	): VersionSync {
		if (outcome.kind === 'missing') {
			return { name: dep.name, range: dep.range, latest: '', freshness: 'missing' }
		}
		if (outcome.kind === 'failed') {
			return { name: dep.name, range: dep.range, latest: '', freshness: 'failed' }
		}
		const latest = Sync.#parseLatest(outcome.text)
		if (latest === undefined) {
			return { name: dep.name, range: dep.range, latest: '', freshness: 'failed' }
		}
		return {
			name: dep.name,
			range: dep.range,
			latest,
			freshness: rangeToFreshness(dep.range, latest),
		}
	}

	static #parseLatest(text: string): string | undefined {
		let parsed: unknown
		try {
			parsed = JSON.parse(text)
		} catch {
			return undefined
		}
		if (!Sync.#isRecord(parsed)) return undefined
		const distTags = parsed['dist-tags']
		if (!Sync.#isRecord(distTags)) return undefined
		const latest = distTags.latest
		return typeof latest === 'string' ? latest : undefined
	}

	// Mirrors `Materializer.#assertContained` — a real-path-anchored prefix
	// check against `resolve(target)`, closing the traversal vector a
	// hand-built or off-pattern dependency name could open through the
	// derived write path.
	static #assertContained(target: string, relative: string): string {
		const resolvedRoot = Sync.#resolveReal(resolve(target))
		const resolvedCandidate = Sync.#resolveReal(resolve(target, relative))
		if (resolvedCandidate !== resolvedRoot && !resolvedCandidate.startsWith(resolvedRoot + sep)) {
			throw new ScaffoldError('WRITE', `Guide path "${relative}" escapes the target root`, {
				path: relative,
				target,
			})
		}
		return resolve(target, relative)
	}

	static #resolveReal(path: string): string {
		if (existsSync(path)) return realpathSync(path)
		const parent = dirname(path)
		if (parent === path) return path
		return join(Sync.#resolveReal(parent), relativeOf(parent, path))
	}

	#ensureAlive(): void {
		if (this.#destroyed) throw new ScaffoldError('DESTROYED', 'Sync has been destroyed')
	}
}
