import type {
	SyncAllowance,
	SyncEventMap,
	SyncInterface,
	SyncOptions,
	WritePrecondition,
} from './types.js'
import type {
	CatalogEntry,
	Dependency,
	Freshness,
	GuideSync,
	SyncReport,
	VersionSync,
} from '@src/core'
import type { EmitterInterface } from '@orkestrel/emitter'
import { lstatSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { attempt, isRecord, parseJSON } from '@orkestrel/contract'
import { Emitter } from '@orkestrel/emitter'
import {
	isSyncReport,
	hasOnlyDataProperties,
	manifestToDependencies,
	manifestToName,
	ownDataValue,
	parseSyncReport,
	rangeToFreshness,
	ScaffoldError,
	DEPENDENCY_NAME_PATTERN,
	MAX_ARTIFACT_BYTES,
	SYNC_BASELINE_PATTERN,
	VERSION_PATTERN,
} from '@src/core'
import {
	commitWriteTransaction,
	digestFile,
	digestText,
	discardWriteTransaction,
	guideToDescription,
	packageShortName,
	readGuideReferences,
	readManifest,
	resolvePhysicalPath,
	resolveGuideWrites,
	syncReportOf,
	validateWriteDirectories,
} from './helpers.js'
import { parseSyncCurrent, parseSyncDependencies, parseSyncOptions } from './parsers.js'
import { isCatalogDescription, isFilesystemPath, isMissingPathError } from './validators.js'
import { WriteTransaction } from './WriteTransaction.js'
import {
	DEFAULT_SYNC_BUDGET,
	DEFAULT_SYNC_CONCURRENCY,
	DEFAULT_SYNC_ITEMS,
	DEFAULT_SYNC_LIMIT,
	DEFAULT_SYNC_TIMEOUT,
} from './constants.js'

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
	readonly #items: number
	readonly #budget: number
	readonly #controller = new AbortController()
	#destroyed = false

	constructor(options?: SyncOptions) {
		const parsed = parseSyncOptions(options)
		this.#emitter = new Emitter<SyncEventMap>({
			...(parsed.on === undefined ? {} : { on: parsed.on }),
			...(parsed.error === undefined ? {} : { error: parsed.error }),
		})
		this.#guidesBase = parsed.guides?.base ?? 'https://raw.githubusercontent.com'
		this.#branch = parsed.guides?.branch ?? 'main'
		this.#guidesTimeout = parsed.guides?.timeout ?? DEFAULT_SYNC_TIMEOUT
		this.#registryBase = parsed.registry?.base ?? 'https://registry.npmjs.org'
		this.#registryTimeout = parsed.registry?.timeout ?? DEFAULT_SYNC_TIMEOUT
		this.#concurrency = parsed.concurrency ?? DEFAULT_SYNC_CONCURRENCY
		this.#retries = parsed.retries ?? 0
		this.#strict = parsed.strict ?? false
		this.#limit = parsed.limit ?? DEFAULT_SYNC_LIMIT
		this.#items = parsed.items ?? DEFAULT_SYNC_ITEMS
		this.#budget = parsed.budget ?? DEFAULT_SYNC_BUDGET
	}

	get emitter(): EmitterInterface<SyncEventMap> {
		return this.#emitter
	}

	async guides(
		deps: readonly Dependency[],
		current?: Readonly<Record<string, string>>,
	): Promise<readonly GuideSync[]> {
		this.#ensureAlive()
		return this.#guides(deps, current, Float64Array.of(this.#budget))
	}

	async versions(deps: readonly Dependency[]): Promise<readonly VersionSync[]> {
		this.#ensureAlive()
		return this.#versions(deps, Float64Array.of(this.#budget))
	}

	#guides(
		deps: readonly Dependency[],
		current: Readonly<Record<string, string>> | undefined,
		allowance: SyncAllowance,
	): Promise<readonly GuideSync[]> {
		const parsed = parseSyncDependencies(deps, false)
		if (parsed.length > this.#items) {
			throw new ScaffoldError('INVALID', 'Sync dependency count exceeds its item limit', {
				items: parsed.length,
				limit: this.#items,
			})
		}
		const reference = parseSyncCurrent(
			current,
			parsed.map((dependency) => dependency.name),
			this.#budget,
		)
		return Sync.#runPool(parsed, this.#concurrency, async (dep) => {
			const short = packageShortName(dep.name)
			const url = this.#guideUrl(short)
			const outcome = await Sync.#fetchText(
				url,
				this.#guidesTimeout,
				this.#retries,
				this.#limit,
				allowance,
				this.#controller.signal,
			)
			const guide = Sync.#toGuideSync(dep.name, short, outcome, reference)
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

	#versions(
		deps: readonly Dependency[],
		allowance: SyncAllowance,
	): Promise<readonly VersionSync[]> {
		const parsed = parseSyncDependencies(deps, true)
		if (parsed.length > this.#items) {
			throw new ScaffoldError('INVALID', 'Sync dependency count exceeds its item limit', {
				items: parsed.length,
				limit: this.#items,
			})
		}
		return Sync.#runPool(parsed, this.#concurrency, async (dep) => {
			const url = this.#registryUrl(dep.name)
			const outcome = await Sync.#fetchText(
				url,
				this.#registryTimeout,
				this.#retries,
				this.#limit,
				allowance,
				this.#controller.signal,
			)
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
		const allowance: SyncAllowance = Float64Array.of(this.#budget)
		const orgOutcome = await Sync.#fetchText(
			orgUrl,
			this.#registryTimeout,
			this.#retries,
			this.#limit,
			allowance,
			this.#controller.signal,
		)
		const names = Sync.#toOrgPackages(orgOutcome, orgUrl)
		if (names.length > this.#items) {
			throw new ScaffoldError('FETCH', `Package list at ${orgUrl} exceeds the item limit`, {
				url: orgUrl,
				items: names.length,
				limit: this.#items,
			})
		}
		const entries = await Sync.#runPool(names, this.#concurrency, async (name) => {
			const packumentOutcome = await Sync.#fetchText(
				this.#registryUrl(name),
				this.#registryTimeout,
				this.#retries,
				this.#limit,
				allowance,
				this.#controller.signal,
			)
			const packument = Sync.#toPackument(packumentOutcome)
			const short = packageShortName(name)
			const guideOutcome = await Sync.#fetchText(
				this.#guideUrl(short),
				this.#guidesTimeout,
				this.#retries,
				this.#limit,
				allowance,
				this.#controller.signal,
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

	async pull(target: string, dependencies?: readonly Dependency[]): Promise<SyncReport> {
		this.#ensureAlive()
		const manifest = readManifest(target)
		const declared = manifestToDependencies(manifest)
		const deps = dependencies === undefined ? declared : parseSyncDependencies(dependencies, false)
		if (
			dependencies !== undefined &&
			deps.some(
				(dependency) =>
					!declared.some(
						(candidate) =>
							candidate.name === dependency.name && candidate.range === dependency.range,
					),
			)
		) {
			throw new ScaffoldError('INVALID', 'Sync pull selection is not declared by the target')
		}
		const name = manifestToName(manifest)
		const guideDependencies =
			name === undefined ? deps : deps.filter((dependency) => dependency.name !== name)
		const current = readGuideReferences(target, guideDependencies)
		const allowance: SyncAllowance = Float64Array.of(this.#budget)
		const guides = await this.#guides(guideDependencies, current, allowance)
		const versions = await this.#versions(deps, allowance)
		const report = syncReportOf(target, guides, versions)
		this.#emitter.emit('done', report)
		return report
	}

	async write(report: SyncReport, target: string): Promise<readonly string[]> {
		this.#ensureAlive()
		if (!isFilesystemPath(target)) {
			throw new ScaffoldError('WRITE', 'Sync write target is malformed or exceeds its bounds', {
				target,
			})
		}
		if (!hasOnlyDataProperties(report) || !isSyncReport(report)) {
			throw new ScaffoldError('WRITE', 'Sync report is malformed')
		}
		const snapshot = attempt(() => structuredClone(report))
		const parsed = snapshot.success ? parseSyncReport(snapshot.value) : undefined
		if (parsed === undefined) {
			throw new ScaffoldError('WRITE', 'Sync report is malformed', {
				...(snapshot.success ? {} : { error: snapshot.error }),
			})
		}
		const destinations = resolveGuideWrites(parsed.guides, target)
		const written = destinations.map(({ guide }) => guide.path)
		if (written.length === 0) return written
		const preconditions: WritePrecondition[] = []
		for (const { guide, destination } of destinations) {
			if (guide.baseline === undefined || !SYNC_BASELINE_PATTERN.test(guide.baseline)) {
				throw new ScaffoldError(
					'WRITE',
					`Guide baseline is missing or malformed at ${guide.path}`,
					{
						path: guide.path,
					},
				)
			}
			const status = attempt(() => lstatSync(destination))
			if (guide.baseline === 'absent') {
				if (status.success || !isMissingPathError(status.error)) {
					throw new ScaffoldError('WRITE', `Guide destination changed at ${guide.path}`, {
						path: guide.path,
						...(status.success ? {} : { error: status.error }),
					})
				}
				preconditions.push({ path: guide.path, shape: 'absent' })
			} else if (
				!status.success ||
				!status.value.isFile() ||
				status.value.isSymbolicLink() ||
				status.value.nlink !== 1 ||
				digestFile(destination) !== guide.baseline
			) {
				throw new ScaffoldError('WRITE', `Guide destination changed at ${guide.path}`, {
					path: guide.path,
					...(status.success ? {} : { error: status.error }),
				})
			} else {
				preconditions.push({
					path: guide.path,
					shape: 'file',
					digest: guide.baseline,
				})
			}
		}
		const transaction = WriteTransaction.create(target, written, preconditions)
		const staged = attempt(() => {
			for (const { guide } of destinations) {
				if (Buffer.byteLength(guide.content, 'utf8') > MAX_ARTIFACT_BYTES) {
					throw new ScaffoldError('WRITE', `Guide exceeds the artifact limit at ${guide.path}`, {
						path: guide.path,
						limit: MAX_ARTIFACT_BYTES,
					})
				}
				validateWriteDirectories(transaction)
				const candidate = resolvePhysicalPath(transaction.stage, guide.path, 'WRITE', 'staging')
				mkdirSync(dirname(candidate), { recursive: true })
				validateWriteDirectories(transaction)
				const destination = resolvePhysicalPath(transaction.stage, guide.path, 'WRITE', 'staging')
				writeFileSync(destination, guide.content, {
					encoding: 'utf8',
					flag: 'wx',
				})
				const status = lstatSync(destination)
				if (
					!status.isFile() ||
					status.isSymbolicLink() ||
					status.nlink !== 1 ||
					digestFile(destination) !== digestText(guide.content)
				) {
					throw new ScaffoldError('WRITE', `Staged guide changed at ${guide.path}`, {
						path: guide.path,
					})
				}
				validateWriteDirectories(transaction)
			}
		})
		if (!staged.success) {
			const cleanup = attempt(() => discardWriteTransaction(transaction))
			this.#emitter.emit('error', staged.error)
			throw new ScaffoldError('WRITE', 'Failed to stage guide synchronization', {
				target,
				error: staged.error,
				cleanup: cleanup.success ? undefined : cleanup.error,
			})
		}
		const committed = attempt(() => commitWriteTransaction(transaction, written))
		if (!committed.success) {
			this.#emitter.emit('error', committed.error)
			throw committed.error
		}
		for (const path of written) this.#emitter.emit('write', path)
		return written
	}

	destroy(): void {
		if (this.#destroyed) return
		this.#destroyed = true
		this.#controller.abort()
		this.#emitter.emit('destroy')
		this.#emitter.destroy()
	}

	// The canonical raw.githubusercontent.com form is
	// `/orkestrel/<short>/refs/heads/<branch>/…`. Requests use
	// `redirect: 'manual'`, so this direct URL never relaxes redirect policy.
	#guideUrl(short: string): string {
		const branch = this.#branch
			.split('/')
			.map((segment) => encodeURIComponent(segment))
			.join('/')
		const encoded = encodeURIComponent(short)
		return `${this.#guidesBase}/orkestrel/${encoded}/refs/heads/${branch}/guides/src/${encoded}.md`
	}

	// npm's canonical scoped-package registry path keeps the literal `@` and
	// encodes only the slash (`encodeURIComponent` would also escape the `@`
	// into `%40`, which registries accept but which diverges from the
	// canonical form). A valid npm package name — `@orkestrel/*` or any other
	// scoped/unscoped name (`extras` may now carry either, per
	// `EXTRA_NAME_PATTERN`) — has at most one `/` (the single scope
	// boundary), so this plain first-occurrence slash replace is exhaustive
	// for every name `versions()` is called with, not just `@orkestrel/*`.
	#registryUrl(name: string): string {
		return `${this.#registryBase}/${name.replace('/', '%2F')}`
	}

	// The registry's exact-membership org package list — a flat name→access
	// map, not a fuzzy relevance search — is `catalog()`'s authoritative
	// enumeration source (never `-/v1/search`, whose `scope:` qualifier does
	// not filter as its name implies).
	#orgUrl(): string {
		return `${this.#registryBase}/-/org/orkestrel/package`
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
			const item = pool.items[index]
			if (item === undefined) return
			try {
				pool.results[index] = await pool.worker(item)
			} catch (error) {
				if (pool.state.firstError === undefined) pool.state.firstError = { error }
				pool.state.stopped = true
				return
			}
		}
	}

	// One HTTPS GET with a per-request `AbortSignal.timeout` and up to
	// `retries` additional attempts on a TRANSPORT fault (a thrown/rejected
	// fetch, a non-2xx non-404 response, a manual 3xx redirect, or a body
	// exceeding `limit` bytes) — a `404` is a definitive upstream answer
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
		allowance: SyncAllowance,
		signal: AbortSignal,
	): Promise<
		| { readonly kind: 'ok'; readonly text: string }
		| { readonly kind: 'missing' }
		| { readonly kind: 'failed'; readonly error: unknown; readonly note: string }
	> {
		let lastError: unknown
		let lastNote = ''
		for (let retry = 0; retry <= retries; retry += 1) {
			if (signal.aborted) {
				throw new ScaffoldError('DESTROYED', 'Sync has been destroyed')
			}
			try {
				// `redirect: 'manual'` prevents a compromised or misconfigured endpoint
				// must not silently redirect cross-host; any 3xx (or the opaque
				// redirect response `redirect: 'manual'` itself resolves) is treated
				// as a distinct, named transport fault — never a bare status code.
				// Every fetch is unauthenticated (no headers) — every fleet repo is
				// public, so reachability alone is the signal.
				const response = await fetch(url, {
					signal: AbortSignal.any([signal, AbortSignal.timeout(timeout)]),
					redirect: 'manual',
				})
				if (response.status === 404) {
					await Sync.#cancel(response)
					return { kind: 'missing' }
				}
				if (
					response.type === 'opaqueredirect' ||
					(response.status >= 300 && response.status < 400)
				) {
					lastNote = 'redirected (redirect following is disabled)'
					lastError = new Error(`Redirect blocked for ${url}`)
					await Sync.#cancel(response)
					continue
				}
				if (!response.ok) {
					lastNote = `HTTP ${String(response.status)}`
					lastError = new Error(`Unexpected HTTP status ${response.status} for ${url}`)
					await Sync.#cancel(response)
					continue
				}
				const read = await Sync.#readBounded(response, url, limit, allowance)
				if (!read.ok) {
					lastError = read.error
					lastNote = read.note
					continue
				}
				return { kind: 'ok', text: read.text }
			} catch (error) {
				if (signal.aborted) {
					throw new ScaffoldError('DESTROYED', 'Sync has been destroyed', { error })
				}
				lastError = error
				lastNote = Sync.#transportNote(error)
			}
		}
		return { kind: 'failed', error: lastError, note: lastNote }
	}

	static async #cancel(response: Response): Promise<void> {
		await response.body?.cancel()
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
		allowance: SyncAllowance,
	): Promise<
		| { readonly ok: true; readonly text: string }
		| { readonly ok: false; readonly error: unknown; readonly note: string }
	> {
		const declared = response.headers.get('content-length')
		if (declared !== null) {
			const declaredBytes = Number(declared)
			if (
				Number.isFinite(declaredBytes) &&
				(declaredBytes > limit || declaredBytes > (allowance[0] ?? 0))
			) {
				await response.body?.cancel()
				const threshold = Math.min(limit, allowance[0] ?? 0)
				return {
					ok: false,
					error: new Error(
						`Response body for ${url} declares ${String(declaredBytes)} bytes, exceeding the ${String(threshold)}-byte allowance`,
					),
					note: `response exceeded allowance (${String(threshold)} bytes)`,
				}
			}
		}
		const body = response.body
		if (body === null) return { ok: true, text: '' }
		const reader = body.getReader()
		const decoder = new TextDecoder('utf-8', { fatal: true })
		const chunks: string[] = []
		let total = 0
		try {
			for (;;) {
				const { done, value } = await reader.read()
				if (done) break
				total += value.byteLength
				if (total > limit || value.byteLength > (allowance[0] ?? 0)) {
					await reader.cancel()
					const threshold = Math.min(limit, total + (allowance[0] ?? 0) - value.byteLength)
					allowance[0] = Math.max(0, (allowance[0] ?? 0) - value.byteLength)
					return {
						ok: false,
						error: new Error(
							`Response body for ${url} exceeded the ${String(threshold)}-byte allowance`,
						),
						note: `response exceeded allowance (${String(threshold)} bytes)`,
					}
				}
				allowance[0] = (allowance[0] ?? 0) - value.byteLength
				chunks.push(decoder.decode(value, { stream: true }))
			}
			chunks.push(decoder.decode())
		} catch (error) {
			await reader.cancel(error).catch(() => undefined)
			throw error
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
		const local = current?.[name]
		const baseline =
			current === undefined ? undefined : local === undefined ? 'absent' : digestText(local)
		if (outcome.kind === 'missing') {
			return {
				name,
				path,
				content: '',
				freshness: 'missing',
				note: 'HTTP 404',
				...(baseline === undefined ? {} : { baseline }),
			}
		}
		if (outcome.kind === 'failed') {
			return {
				name,
				path,
				content: '',
				freshness: 'failed',
				note: outcome.note,
				...(baseline === undefined ? {} : { baseline }),
			}
		}
		const freshness: Freshness =
			current !== undefined && local !== undefined && local === outcome.text ? 'current' : 'behind'
		return {
			name,
			path,
			content: outcome.text,
			freshness,
			...(baseline === undefined ? {} : { baseline }),
		}
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
		const parsed = parseJSON(outcome.text)
		if (!isRecord(parsed)) {
			throw new ScaffoldError('FETCH', `Malformed package list response at ${url}`, { url })
		}
		const names = Object.keys(parsed)
		if (names.length === 0 || names.some((name) => !DEPENDENCY_NAME_PATTERN.test(name))) {
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
		const parsed = parseJSON(outcome.text)
		if (parsed === undefined) {
			return {
				version: '',
				description: '',
				note: 'malformed registry response (invalid JSON)',
			}
		}
		if (!isRecord(parsed)) {
			return {
				version: '',
				description: '',
				note: 'malformed registry response (not an object)',
			}
		}
		const distTags = ownDataValue(parsed, 'dist-tags')
		const latest = ownDataValue(distTags, 'latest')
		const version =
			isRecord(distTags) && typeof latest === 'string' && VERSION_PATTERN.test(latest) ? latest : ''
		const rawDescription = ownDataValue(parsed, 'description')
		const description = isCatalogDescription(rawDescription) ? rawDescription : ''
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
		const description = guideToDescription(outcome.text)
		return description !== undefined
			? { description, note: '' }
			: { description: undefined, note: 'guide has no blockquote description' }
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
		const parsed = parseJSON(text)
		if (!isRecord(parsed)) return undefined
		const distTags = ownDataValue(parsed, 'dist-tags')
		if (!isRecord(distTags)) return undefined
		const latest = ownDataValue(distTags, 'latest')
		return typeof latest === 'string' && VERSION_PATTERN.test(latest) ? latest : undefined
	}

	#ensureAlive(): void {
		if (this.#destroyed) throw new ScaffoldError('DESTROYED', 'Sync has been destroyed')
	}
}
