import type { SyncEventMap, SyncInterface, SyncOptions } from './types.js'
import type {
	CatalogEntry,
	Dependency,
	Freshness,
	GuideSync,
	SyncReport,
	VersionSync,
} from '@src/core'
import type { EmitterInterface } from '@orkestrel/emitter'
import type { BlockquoteNode } from '@orkestrel/markdown'
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { dirname, join, relative as relativeOf, resolve, sep } from 'node:path'
import { Emitter } from '@orkestrel/emitter'
import {
	flattenText,
	isBlockquoteNode,
	isParagraphNode,
	parseDocument,
	walkNodes,
} from '@orkestrel/markdown'
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

	/**
	 * The fleet package catalog, sourced from the npm registry — the
	 * AUTHORITATIVE enumeration (never a caller-supplied root).
	 *
	 * @returns One {@link CatalogEntry} per `@orkestrel/*` package the registry
	 * lists, code-unit sorted by `name`.
	 * @remarks
	 * Three fetches build each entry: (1) the org's exact package-list
	 * (`-/org/orkestrel/package`) enumerates every published name — an
	 * unreachable or malformed response throws a coded `ScaffoldError('FETCH')`
	 * UNCONDITIONALLY (never gated by `strict`), since without it there is no
	 * catalog to build; (2) each name's own registry packument supplies
	 * `version` (`dist-tags.latest`) and a registry-path `description`
	 * fallback — a failed/malformed packument keeps the entry (degraded:
	 * `version: ''`) rather than dropping it, since the org list already
	 * proved the package exists; (3) each name's own guide
	 * (`guides/src/<short>.md`, same canonical URL as `guides()`, fetched
	 * unauthenticated — every fleet repo is public) supplies the PREFERRED
	 * `description` — its first blockquote's first paragraph — falling back
	 * to the packument description when the guide 404s, faults, or carries no
	 * blockquote; a 404 STAYS LISTED (it is a reachability signal, not an
	 * absence) with a note reading `guide unreachable (HTTP 404 — repo
	 * private or guide missing?)`. Emits `package` once per entry with a
	 * combined human-readable `note` (empty when both fetches succeeded)
	 * alongside the existing `error` events for each degraded sub-fetch.
	 */
	async catalog(): Promise<readonly CatalogEntry[]> {
		this.#ensureAlive()
		const orgUrl = this.#orgUrl()
		const orgOutcome = await Sync.#fetchText(
			orgUrl,
			this.#registryTimeout,
			this.#retries,
			this.#limit,
		)
		const names = Sync.#toOrgPackages(orgOutcome, orgUrl)
		const entries = await Sync.#runPool(names, this.#concurrency, async (name) => {
			const packumentOutcome = await Sync.#fetchText(
				this.#registryUrl(name),
				this.#registryTimeout,
				this.#retries,
				this.#limit,
			)
			const packument = Sync.#toPackument(packumentOutcome)
			const short = Sync.#shortName(name)
			const guideOutcome = await Sync.#fetchText(
				this.#guideUrl(short),
				this.#guidesTimeout,
				this.#retries,
				this.#limit,
			)
			const guide = Sync.#toGuideDescription(guideOutcome)
			if (packumentOutcome.kind === 'failed') this.#emitter.emit('error', packumentOutcome.error)
			if (guideOutcome.kind === 'failed') this.#emitter.emit('error', guideOutcome.error)
			const description = guide.description ?? packument.description
			const note = Sync.#combineNote(guide.note, packument.note)
			this.#emitter.emit('package', name, note)
			return { name, version: packument.version, description }
		})
		return [...entries].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
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

	// The CANONICAL raw.githubusercontent.com form — `/orkestrel/<short>/refs/heads/<branch>/…`
	// — never the legacy `/orkestrel/<short>/<branch>/…` shorthand, which the
	// host now 301-redirects to this exact canonical form. `redirect: 'manual'`
	// (A1) is a deliberate, kept security posture, so building the canonical
	// URL directly (never following the redirect) is the fix — not a relaxed
	// redirect policy.
	#guideUrl(short: string): string {
		return `${Sync.#normalizeBase(this.#guidesBase)}/orkestrel/${short}/refs/heads/${this.#branch}/guides/src/${short}.md`
	}

	// npm's canonical scoped-package registry path keeps the literal `@` and
	// encodes only the slash (`encodeURIComponent` would also escape the `@`
	// into `%40`, which registries accept but which diverges from the
	// canonical form). `name` is already gated by `DEPENDENCY_NAME_PATTERN`
	// upstream, so a plain slash replace is exhaustive here.
	#registryUrl(name: string): string {
		return `${Sync.#normalizeBase(this.#registryBase)}/${name.replace('/', '%2F')}`
	}

	// The registry's exact-membership org package list — a flat name→access
	// map, not a fuzzy relevance search — is `catalog()`'s authoritative
	// enumeration source (never `-/v1/search`, whose `scope:` qualifier does
	// not filter as its name implies).
	#orgUrl(): string {
		return `${Sync.#normalizeBase(this.#registryBase)}/-/org/orkestrel/package`
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
		const state: {
			cursor: number
			stopped: boolean
			firstError: { readonly error: unknown } | undefined
		} = { cursor: 0, stopped: false, firstError: undefined }
		const workers = Array.from({ length: Math.min(concurrency, items.length) }, () =>
			Sync.#drain({ items, worker, results, state }),
		)
		await Promise.allSettled(workers)
		if (state.firstError !== undefined) throw state.firstError.error
		return results
	}

	// One worker's pull-and-run loop over the shared pool `state` — extracted
	// from `#runPool` so no function is declared inside another (§4). `state`
	// carries the mutable cursor/stopped/firstError coordination shared by
	// every concurrent worker; `items`, `worker`, and `results` are the pool's
	// immutable inputs and output sink.
	static async #drain<T, R>(pool: {
		readonly items: readonly T[]
		readonly worker: (item: T) => Promise<R>
		readonly results: R[]
		readonly state: {
			cursor: number
			stopped: boolean
			firstError: { readonly error: unknown } | undefined
		}
	}): Promise<void> {
		for (;;) {
			if (pool.state.stopped) return
			const index = pool.state.cursor
			pool.state.cursor += 1
			if (index >= pool.items.length) return
			try {
				pool.results[index] = await pool.worker(pool.items[index])
			} catch (error) {
				if (pool.state.firstError === undefined) pool.state.firstError = { error }
				pool.state.stopped = true
				return
			}
		}
	}

	// One HTTPS GET with a per-request `AbortSignal.timeout` and up to
	// `retries` additional attempts on a TRANSPORT fault (a thrown/rejected
	// fetch, a non-2xx non-404 response, a manual 3xx redirect (A1), or a body
	// exceeding `limit` bytes (R2)) — a `404` is a definitive upstream answer
	// and is never retried. Every `failed` outcome carries `note`, the LAST
	// attempt's human-readable cause — a transport error message (with an
	// `ECONNREFUSED`-style cause code appended when present), an `HTTP
	// <status>`, the fixed redirect-blocked string, or the oversized-body
	// message — so a caller can tell WHY, not just THAT, the fetch failed.
	static async #fetchText(
		url: string,
		timeout: number,
		retries: number,
		limit: number,
	): Promise<
		| { readonly kind: 'ok'; readonly text: string }
		| { readonly kind: 'missing' }
		| { readonly kind: 'failed'; readonly error: unknown; readonly note: string }
	> {
		let lastError: unknown
		let lastNote = ''
		for (let attempt = 0; attempt <= retries; attempt += 1) {
			try {
				// `redirect: 'manual'` (A1) — a compromised/misconfigured endpoint
				// must not silently redirect cross-host; any 3xx (or the opaque
				// redirect response `redirect: 'manual'` itself resolves) is treated
				// as a distinct, named transport fault — never a bare status code.
				// Every fetch is unauthenticated (no headers) — every fleet repo is
				// public, so reachability alone is the signal.
				const response = await fetch(url, {
					signal: AbortSignal.timeout(timeout),
					redirect: 'manual',
				})
				if (response.status === 404) return { kind: 'missing' }
				if (
					response.type === 'opaqueredirect' ||
					(response.status >= 300 && response.status < 400)
				) {
					lastNote = 'redirected (redirect following is disabled)'
					lastError = new Error(`Redirect blocked for ${url}`)
					continue
				}
				if (!response.ok) {
					lastNote = `HTTP ${String(response.status)}`
					lastError = new Error(`Unexpected HTTP status ${response.status} for ${url}`)
					continue
				}
				const read = await Sync.#readBounded(response, url, limit)
				if (!read.ok) {
					lastError = read.error
					lastNote = read.note
					continue
				}
				return { kind: 'ok', text: read.text }
			} catch (error) {
				lastError = error
				lastNote = Sync.#transportNote(error)
			}
		}
		return { kind: 'failed', error: lastError, note: lastNote }
	}

	// A thrown/rejected `fetch`'s message, with the underlying cause's `code`
	// (e.g. `ECONNREFUSED`, `ETIMEDOUT`) appended when the runtime attaches
	// one — Node's `fetch failed` wraps the real socket error in `.cause`.
	static #transportNote(error: unknown): string {
		if (!(error instanceof Error)) return String(error)
		const code = Sync.#causeCode(error)
		return code !== undefined ? `${error.message}: ${code}` : error.message
	}

	static #causeCode(error: Error): string | undefined {
		const cause = error.cause
		if (typeof cause !== 'object' || cause === null) return undefined
		if (!('code' in cause)) return undefined
		return typeof cause.code === 'string' ? cause.code : undefined
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
		| { readonly ok: true; readonly text: string }
		| { readonly ok: false; readonly error: unknown; readonly note: string }
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
					note: `response exceeded limit (${String(limit)} bytes)`,
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
						note: `response exceeded limit (${String(limit)} bytes)`,
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
			| { readonly kind: 'failed'; readonly error: unknown; readonly note: string },
		current?: Readonly<Record<string, string>>,
	): GuideSync {
		const path = `guides/src/${short}.md`
		if (outcome.kind === 'missing') {
			return { name, path, content: '', freshness: 'missing', note: 'HTTP 404' }
		}
		if (outcome.kind === 'failed') {
			return { name, path, content: '', freshness: 'failed', note: outcome.note }
		}
		const freshness: Freshness = current?.[name] === outcome.text ? 'current' : 'behind'
		return { name, path, content: outcome.text, freshness }
	}

	static #toVersionSync(
		dep: Dependency,
		outcome:
			| { readonly kind: 'ok'; readonly text: string }
			| { readonly kind: 'missing' }
			| { readonly kind: 'failed'; readonly error: unknown; readonly note: string },
	): VersionSync {
		if (outcome.kind === 'missing') {
			return {
				name: dep.name,
				range: dep.range,
				latest: '',
				freshness: 'missing',
				note: 'HTTP 404',
			}
		}
		if (outcome.kind === 'failed') {
			return {
				name: dep.name,
				range: dep.range,
				latest: '',
				freshness: 'failed',
				note: outcome.note,
			}
		}
		const latest = Sync.#parseLatest(outcome.text)
		if (latest === undefined) {
			return {
				name: dep.name,
				range: dep.range,
				latest: '',
				freshness: 'failed',
				note: 'malformed registry response (missing dist-tags.latest)',
			}
		}
		return {
			name: dep.name,
			range: dep.range,
			latest,
			freshness: rangeToFreshness(dep.range, latest),
		}
	}

	// The org package-list response is the WHOLE reason `catalog()` can claim
	// to be authoritative — an unreachable or malformed response means there
	// IS no catalog, so this throws unconditionally (never gated by
	// `strict`), unlike every other collect-mode FETCH outcome in this class.
	static #toOrgPackages(
		outcome:
			| { readonly kind: 'ok'; readonly text: string }
			| { readonly kind: 'missing' }
			| { readonly kind: 'failed'; readonly error: unknown; readonly note: string },
		url: string,
	): readonly string[] {
		if (outcome.kind === 'missing' || outcome.kind === 'failed') {
			const note = outcome.kind === 'missing' ? 'HTTP 404' : outcome.note
			throw new ScaffoldError('FETCH', `Failed to fetch the package list at ${url}`, { url, note })
		}
		let parsed: unknown
		try {
			parsed = JSON.parse(outcome.text)
		} catch {
			throw new ScaffoldError('FETCH', `Malformed package list response at ${url}`, { url })
		}
		if (!Sync.#isRecord(parsed)) {
			throw new ScaffoldError('FETCH', `Malformed package list response at ${url}`, { url })
		}
		const names = Object.keys(parsed).filter((name) => name.startsWith('@orkestrel/'))
		if (names.length === 0) {
			throw new ScaffoldError('FETCH', `Malformed package list response at ${url}`, { url })
		}
		return names
	}

	// A packument fetch that fails or comes back malformed keeps the entry
	// (the org list already proved the package exists) rather than dropping
	// it — degraded, never absent. The FULL packument (never the abbreviated
	// `Accept` form, which omits `description`) supplies both `dist-tags.latest`
	// and the top-level `description` — the registry-path fallback description.
	static #toPackument(
		outcome:
			| { readonly kind: 'ok'; readonly text: string }
			| { readonly kind: 'missing' }
			| { readonly kind: 'failed'; readonly error: unknown; readonly note: string },
	): { readonly version: string; readonly description: string; readonly note: string } {
		if (outcome.kind === 'missing') return { version: '', description: '', note: 'HTTP 404' }
		if (outcome.kind === 'failed') {
			return { version: '', description: '', note: outcome.note }
		}
		let parsed: unknown
		try {
			parsed = JSON.parse(outcome.text)
		} catch {
			return {
				version: '',
				description: '',
				note: 'malformed registry response (invalid JSON)',
			}
		}
		if (!Sync.#isRecord(parsed)) {
			return {
				version: '',
				description: '',
				note: 'malformed registry response (not an object)',
			}
		}
		const distTags = parsed['dist-tags']
		const version =
			Sync.#isRecord(distTags) && typeof distTags.latest === 'string' ? distTags.latest : ''
		const description = typeof parsed.description === 'string' ? parsed.description : ''
		const note = version === '' ? 'malformed registry response (missing dist-tags.latest)' : ''
		return { version, description, note }
	}

	// The guide-fetch counterpart of `#toPackument` — `description` is
	// `undefined` (never `''`) on ANY degradation (404, transport fault, no
	// blockquote) so `catalog()`'s caller can cleanly fall back to the
	// packument description with `??`. Every fleet repo is public, so a guide
	// 404 is a READINESS signal (repo private or guide not yet written), not
	// an absence — the entry STAYS LISTED with this exact note text.
	static #toGuideDescription(
		outcome:
			| { readonly kind: 'ok'; readonly text: string }
			| { readonly kind: 'missing' }
			| { readonly kind: 'failed'; readonly error: unknown; readonly note: string },
	): { readonly description: string | undefined; readonly note: string } {
		if (outcome.kind === 'missing') {
			return {
				description: undefined,
				note: 'guide unreachable (HTTP 404 — repo private or guide missing?)',
			}
		}
		if (outcome.kind === 'failed') return { description: undefined, note: outcome.note }
		const description = Sync.#firstBlockquoteParagraph(outcome.text)
		return description !== undefined
			? { description, note: '' }
			: { description: undefined, note: 'guide has no blockquote description' }
	}

	// The first top-level paragraph of the guide's first blockquote — the
	// same extraction `catalogPackages` (server/helpers.ts) performs against a
	// LOCAL file's content, applied here to FETCHED text.
	static #firstBlockquoteParagraph(text: string): string | undefined {
		let document: ReturnType<typeof parseDocument>
		try {
			document = parseDocument(text)
		} catch {
			return undefined
		}
		let quote: BlockquoteNode | undefined
		for (const node of walkNodes(document)) {
			if (isBlockquoteNode(node)) {
				quote = node
				break
			}
		}
		if (quote === undefined) return undefined
		const paragraph = quote.children.find((child) => isParagraphNode(child))
		if (paragraph === undefined) return undefined
		const flattened = flattenText(paragraph).replace(/\s+/g, ' ').trim()
		return flattened.length > 0 ? flattened : undefined
	}

	// Combines a degraded guide/packument note into one human-readable string
	// for `SyncEventMap['package']`'s `note` — empty when both succeeded.
	static #combineNote(guideNote: string, packumentNote: string): string {
		const parts: string[] = []
		if (packumentNote !== '') parts.push(`version unavailable — ${packumentNote}`)
		if (guideNote !== '') parts.push(`description from registry — ${guideNote}`)
		return parts.join('; ')
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
