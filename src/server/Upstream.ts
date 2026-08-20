import type { Guard } from '@orkestrel/contract'
import type { EmitterInterface } from '@orkestrel/emitter'
import type {
	CatalogEntry,
	Dependency,
	Lookup,
	Mirror,
	Release,
	ScaffoldErrorCode,
	Snapshot,
} from '@src/core'
import type { UpstreamEventMap, UpstreamInterface, UpstreamOptions } from './types.js'
import { isError, isRecord, isString, parseJSON, parseStringField } from '@orkestrel/contract'
import { Emitter } from '@orkestrel/emitter'
import {
	cloneValue,
	CONTROL_CHARACTER_PATTERN,
	isCollection,
	isDependencyName,
	isSnapshot,
	MAX_ARTIFACT_BYTES,
	MAX_COLLECTION_ITEMS,
	MAX_DEPENDENCY_NAME_LENGTH,
	MAX_RANGE_LENGTH,
	nameToGuide,
	ScaffoldError,
} from '@src/core'
import { isDependencies, isDependencyNames, isUpstreamOptions } from './validators.js'

/**
 * The reading spine: one bounded, unauthenticated, redirect-free request per answer.
 *
 * @remarks
 * This is the package's only network reader, and it never writes. Every call
 * opens one byte allowance and spends it across every read the call makes, so a
 * caller is bounded twice over: `limit` refuses one oversized answer and
 * `budget` refuses many small ones. They are separate exhaustion routes and
 * neither bound covers the other.
 *
 * A per-package failure never escapes as a throw. It is projected into the
 * verdict that package's row already carries — `missing` for an upstream `404`,
 * which is a definite answer, and `failed` for a transport fault, which is no
 * answer at all — so one unreachable package never costs the caller the rest of
 * the answer. The organization package list is the one exception: without it
 * there is no fleet to report, so an unreachable or malformed list is a coded
 * `FETCH` failure.
 *
 * Requests are unauthenticated because every fleet repository is public, and
 * they follow no redirect, so a misconfigured or hostile endpoint cannot move a
 * read to another host. Each one is bounded by its endpoint's timeout and by the
 * reader's own abort signal, so {@link Upstream.destroy} cancels what is in
 * flight instead of waiting for it.
 *
 * The allowance is threaded through the private reads as a mutable
 * `{ remaining: number }` carrier rather than held on the instance, because
 * concurrent calls each own their own budget and must not spend each other's.
 *
 * @example
 * ```ts
 * import { Upstream } from '@orkestrel/scaffold/server'
 *
 * const upstream = new Upstream({ registry: { timeout: 5_000 } })
 * const releases = await upstream.lookup([{ name: '@orkestrel/emitter', range: '^0.0.5' }])
 * upstream.destroy()
 * ```
 */
export class Upstream implements UpstreamInterface {
	// The defaults a request is built with, and the fixed strings the fleet's
	// own addresses are assembled from. They sit here rather than in
	// `constants.ts` because that file is frozen, and each is read by exactly one
	// line of this class: a default is the entity's law applied when it builds a
	// request, so it belongs beside the law rather than in shared data.
	static readonly #defaultGuide = 'https://raw.githubusercontent.com'
	static readonly #defaultRegistry = 'https://registry.npmjs.org'
	static readonly #defaultBranch = 'main'
	static readonly #defaultTimeout = 10_000
	static readonly #defaultConcurrency = 6
	static readonly #defaultRetries = 0
	static readonly #defaultBudget = 16_777_216
	static readonly #scope = 'orkestrel'
	static readonly #unreadable = 'the answer carries no readable latest version'
	// The media type that selects the registry's abbreviated packument. It sits
	// with the request defaults because it is part of how this class asks for a
	// version, and it is asked for at exactly the reads that want one.
	static readonly #packument = 'application/vnd.npm.install-v1+json'

	readonly #emitter: Emitter<UpstreamEventMap>
	readonly #guideBase: string
	readonly #guideBranch: string
	readonly #guideTimeout: number
	readonly #registryBase: string
	readonly #registryTimeout: number
	readonly #concurrency: number
	readonly #retries: number
	readonly #limit: number
	readonly #budget: number
	readonly #controller = new AbortController()
	#destroyed = false

	/**
	 * Construct a reader over one guide host and one registry.
	 *
	 * @param options - The endpoints, the request bounds, the initial
	 * listeners, and the listener-error handler.
	 * @throws {@link ScaffoldError} coded `INVALID` when `options` is present but
	 * is not an option bag this reader accepts, or when either endpoint names a
	 * scheme, host, or form this reader will not request.
	 *
	 * @remarks
	 * `isEndpoint` bounds an endpoint's length and nothing else, so the scheme and
	 * host law is settled here, where a refusal can say which endpoint was refused
	 * and why. An endpoint must be HTTPS, or HTTP to a loopback host — the one
	 * place an unencrypted request has no network between its ends. That
	 * refuses `file:`, `data:`, and plain HTTP to a real host, and it is what
	 * keeps a fixture reachable without weakening transport security anywhere a
	 * real request goes. An endpoint carrying credentials, a query, or a fragment
	 * is refused too: this reader authenticates nothing and appends its own path.
	 */
	constructor(options?: UpstreamOptions) {
		if (options !== undefined && !isUpstreamOptions(options)) {
			throw new ScaffoldError(
				'INVALID',
				'The options argument is not the exact shape this upstream reader accepts.',
				{ field: 'options' },
			)
		}
		this.#emitter = new Emitter<UpstreamEventMap>({
			...(options?.on === undefined ? {} : { on: options.on }),
			...(options?.error === undefined ? {} : { error: options.error }),
		})
		this.#guideBase = this.#endpoint(options?.guides?.base ?? Upstream.#defaultGuide, 'guides')
		this.#guideBranch = options?.guides?.branch ?? Upstream.#defaultBranch
		this.#guideTimeout = options?.guides?.timeout ?? Upstream.#defaultTimeout
		this.#registryBase = this.#endpoint(
			options?.registry?.base ?? Upstream.#defaultRegistry,
			'registry',
		)
		this.#registryTimeout = options?.registry?.timeout ?? Upstream.#defaultTimeout
		this.#concurrency = options?.concurrency ?? Upstream.#defaultConcurrency
		this.#retries = options?.retries ?? Upstream.#defaultRetries
		this.#limit = options?.limit ?? MAX_ARTIFACT_BYTES
		this.#budget = options?.budget ?? Upstream.#defaultBudget
	}

	/** The upstream reader's observation channel. */
	get emitter(): EmitterInterface<UpstreamEventMap> {
		return this.#emitter
	}

	/**
	 * Look up the registry's latest release for each declared dependency.
	 *
	 * @param dependencies - The declared dependencies to look up.
	 * @returns One release verdict per dependency, in input order.
	 * @throws {@link ScaffoldError} coded `INVALID` when `dependencies` is not a
	 * bounded list of declared dependencies, and `DESTROYED` when the reader is
	 * torn down before or during the call.
	 *
	 * @remarks
	 * Whether the declared range already admits the reported version is not
	 * decided here and is not stored on the verdict: it is a function of the
	 * `range` and `latest` sitting beside each other, and one centralized helper
	 * answers it for every caller.
	 *
	 * @example
	 * ```ts
	 * import { Upstream } from '@orkestrel/scaffold/server'
	 *
	 * const upstream = new Upstream()
	 * await upstream.lookup([{ name: '@orkestrel/router', range: '^0.0.8' }])
	 * upstream.destroy()
	 * ```
	 */
	async lookup(dependencies: readonly Dependency[]): Promise<readonly Release[]> {
		this.#assertAlive()
		const accepted = this.#accept(dependencies, isDependencies, 'dependencies')
		const allowance = { remaining: this.#budget }
		return this.#gather(accepted, (dependency) => this.#release(dependency, allowance))
	}

	/**
	 * Fetch each named package's guide, beside the local mirror it answers for.
	 *
	 * @param names - The packages to fetch: the target's declared set, or the whole organization.
	 * @param current - The target's local mirrors as exact bytes, keyed by mirror path.
	 * @returns One mirror verdict per name, in input order.
	 * @throws {@link ScaffoldError} coded `INVALID` when `names` is not a bounded
	 * list of fleet package names or `current` is not a snapshot, and `DESTROYED`
	 * when the reader is torn down before or during the call.
	 *
	 * @remarks
	 * The mirror path is derived from the package name by the same helper the plan
	 * derives it with, and the fetched URL ends in that exact path, so a verdict
	 * always answers for the file it names. `observed` is carried through from
	 * `current` whatever the lookup produced, because it is the precondition the
	 * later write is held to and a failed fetch does not change what the target
	 * currently holds.
	 *
	 * @example
	 * ```ts
	 * import { Upstream } from '@orkestrel/scaffold/server'
	 *
	 * const upstream = new Upstream()
	 * await upstream.fetch(['@orkestrel/router'], { 'guides/router.md': '2320526f75746572' })
	 * upstream.destroy()
	 * ```
	 */
	async fetch(names: readonly string[], current: Snapshot): Promise<readonly Mirror[]> {
		this.#assertAlive()
		const accepted = this.#accept(names, isDependencyNames, 'names')
		const observed = this.#accept(current, isSnapshot, 'current')
		const allowance = { remaining: this.#budget }
		return this.#gather(accepted, (name) => this.#mirror(name, observed, allowance))
	}

	/**
	 * Catalog the published fleet from the registry's organization package list.
	 *
	 * @returns One row per published package, sorted by name.
	 * @throws {@link ScaffoldError} coded `FETCH` when the organization package
	 * list is unreachable, malformed, empty, or larger than one bounded
	 * collection, and `DESTROYED` when the reader is torn down before or during
	 * the call.
	 *
	 * @remarks
	 * The organization list is the exact membership the registry publishes, not a
	 * relevance search, and it is the whole reason this answer can claim to be the
	 * fleet. So it fails hard where a per-package lookup fails soft: an empty or
	 * unreadable list would otherwise be written into a target's catalog table as
	 * a fleet with no packages in it. A package whose own version lookup then
	 * fails still keeps its row, carrying the cause instead of a version, because
	 * the list already proved the package is published.
	 *
	 * @example
	 * ```ts
	 * import { Upstream } from '@orkestrel/scaffold/server'
	 *
	 * const upstream = new Upstream()
	 * const entries = await upstream.catalog()
	 * upstream.destroy()
	 * ```
	 */
	async catalog(): Promise<readonly CatalogEntry[]> {
		this.#assertAlive()
		const allowance = { remaining: this.#budget }
		const names = await this.#packages(allowance)
		return this.#gather(names, (name) => this.#entry(name, allowance))
	}

	/**
	 * Tear the reader down, aborting every request in flight. Teardown is idempotent.
	 *
	 * @returns Nothing.
	 *
	 * @remarks
	 * A call still in flight rejects with a `DESTROYED` error rather than
	 * resolving to a partial answer, because half a fleet reads exactly like a
	 * whole one.
	 *
	 * @example
	 * ```ts
	 * import { Upstream } from '@orkestrel/scaffold/server'
	 *
	 * const upstream = new Upstream()
	 * upstream.destroy()
	 * upstream.emitter.destroyed // true
	 * ```
	 */
	destroy(): void {
		if (this.#destroyed) return
		this.#destroyed = true
		this.#controller.abort()
		this.#emitter.emit('destroy')
		this.#emitter.destroy()
	}

	// The scheme and host law `isEndpoint` deliberately leaves to this entity. A
	// guard has only `false` to say; this can name the endpoint and the reason.
	#endpoint(base: string, field: string): string {
		const parsed = URL.parse(base)
		if (parsed === null) {
			throw this.#error('INVALID', `The ${field} endpoint is not a URL.`, { field, base })
		}
		const loopback =
			parsed.hostname === '127.0.0.1' ||
			parsed.hostname === 'localhost' ||
			parsed.hostname === '[::1]'
		if (parsed.protocol !== 'https:' && !(parsed.protocol === 'http:' && loopback)) {
			throw this.#error(
				'INVALID',
				`The ${field} endpoint at ${base} is not HTTPS and is not a loopback host.`,
				{ field, base },
			)
		}
		if (
			parsed.username !== '' ||
			parsed.password !== '' ||
			parsed.search !== '' ||
			parsed.hash !== ''
		) {
			throw this.#error(
				'INVALID',
				`The ${field} endpoint at ${base} carries credentials, a query, or a fragment.`,
				{ field, base },
			)
		}
		return parsed.href.replace(/\/+$/u, '')
	}

	// One dependency, read and projected into the verdict its row carries. A
	// found answer that states no readable version is a failed lookup rather than
	// a found one carrying nothing, because an empty version is not an answer.
	async #release(dependency: Dependency, allowance: { remaining: number }): Promise<Release> {
		const outcome = await this.#read(
			this.#registryURL(dependency.name),
			this.#registryTimeout,
			allowance,
			Upstream.#packument,
		)
		const latest = outcome.lookup === 'found' ? this.#latest(outcome.content) : undefined
		const release: Release =
			latest === undefined
				? {
						name: dependency.name,
						range: dependency.range,
						lookup: outcome.lookup === 'missing' ? 'missing' : 'failed',
						note: outcome.lookup === 'found' ? Upstream.#unreadable : outcome.note,
					}
				: { name: dependency.name, range: dependency.range, lookup: 'found', latest }
		this.#emitter.emit('release', release)
		return release
	}

	// One guide, read and projected beside the local bytes it answers for.
	async #mirror(
		name: string,
		current: Snapshot,
		allowance: { remaining: number },
	): Promise<Mirror> {
		const path = nameToGuide(name)
		const outcome = await this.#read(this.#guideURL(name), this.#guideTimeout, allowance)
		const observed = current[path]
		const mirror: Mirror =
			outcome.lookup === 'found'
				? {
						name,
						path,
						lookup: 'found',
						content: outcome.content,
						...(observed === undefined ? {} : { observed }),
					}
				: {
						name,
						path,
						lookup: outcome.lookup,
						note: outcome.note,
						...(observed === undefined ? {} : { observed }),
					}
		this.#emitter.emit('mirror', mirror)
		return mirror
	}

	// One catalog row. It publishes nothing on the observation channel: the
	// channel carries the verdicts the writer binds to, and a catalog row is
	// not one of them, so the whole sorted list is the answer instead.
	async #entry(name: string, allowance: { remaining: number }): Promise<CatalogEntry> {
		const outcome = await this.#read(
			this.#registryURL(name),
			this.#registryTimeout,
			allowance,
			Upstream.#packument,
		)
		const version = outcome.lookup === 'found' ? this.#latest(outcome.content) : undefined
		if (version !== undefined) {
			return { name, lookup: 'found', version, dependencies: this.#edges(outcome.content, version) }
		}
		return {
			name,
			lookup: outcome.lookup === 'missing' ? 'missing' : 'failed',
			note: outcome.lookup === 'found' ? Upstream.#unreadable : outcome.note,
		}
	}

	// The runtime edges the published version declares, read from the same
	// abbreviated packument the version came from rather than from a second
	// request. Development edges are deliberately not read: they reach no
	// consumer, so they constrain nothing a publish order decides. A packument
	// that carries no readable edges answers none rather than failing the row,
	// because a package with no dependencies and a package whose manifest could
	// not be read both publish first, and the version is what the row promises.
	#edges(content: string, version: string): readonly Dependency[] {
		const parsed = parseJSON(content)
		if (!isRecord(parsed)) return []
		const versions = parsed.versions
		if (!isRecord(versions)) return []
		const manifest = versions[version]
		if (!isRecord(manifest)) return []
		const declared = manifest.dependencies
		if (!isRecord(declared)) return []
		const edges: Dependency[] = []
		for (const [name, range] of Object.entries(declared)) {
			if (edges.length >= MAX_COLLECTION_ITEMS) break
			if (typeof range !== 'string' || range.length === 0 || range.length > MAX_RANGE_LENGTH) {
				continue
			}
			if (CONTROL_CHARACTER_PATTERN.test(name) || CONTROL_CHARACTER_PATTERN.test(range)) continue
			if (name.length === 0 || name.length > MAX_DEPENDENCY_NAME_LENGTH) continue
			edges.push({ name, range })
		}
		return edges
	}

	// The registry's exact organization membership, which is a flat name-to-access
	// map rather than a search. Every refusal here is coded rather than collected,
	// because a caller that received an empty or partial fleet could not tell it
	// from a fleet that shrank.
	async #packages(allowance: { remaining: number }): Promise<readonly string[]> {
		const url = `${this.#registryBase}/-/org/${Upstream.#scope}/package`
		const outcome = await this.#read(url, this.#registryTimeout, allowance)
		if (outcome.lookup !== 'found') {
			throw this.#error('FETCH', `The organization package list at ${url} produced no answer.`, {
				url,
				note: outcome.note,
			})
		}
		const parsed = parseJSON(outcome.content)
		if (!isRecord(parsed)) {
			throw this.#error('FETCH', `The organization package list at ${url} is not a record.`, {
				url,
			})
		}
		const names = Object.keys(parsed)
		if (
			names.length === 0 ||
			!isCollection(names) ||
			!names.every((name) => isDependencyName(name))
		) {
			throw this.#error(
				'FETCH',
				`The organization package list at ${url} does not name a bounded fleet.`,
				{ url, count: names.length },
			)
		}
		return [...names].sort()
	}

	// The latest version the registry states, or nothing. The version is bounded
	// and control-free before it is admitted, so an upstream answer cannot smuggle
	// text into a verdict a caller prints.
	#latest(content: string): string | undefined {
		const parsed = parseJSON(content)
		if (!isRecord(parsed)) return undefined
		const latest = parseStringField(parsed, ['dist-tags', 'latest'])
		if (latest === undefined || latest.length === 0 || latest.length > MAX_RANGE_LENGTH) {
			return undefined
		}
		return CONTROL_CHARACTER_PATTERN.test(latest) ? undefined : latest
	}

	// The canonical scoped-package registry path keeps the literal `@` and encodes
	// the scope boundary, which is the exact form registries publish. Everything
	// is encoded first and only `@` is restored, so the encoding is total rather
	// than a list of characters someone remembered: a declared dependency name is
	// bounded and non-empty but is otherwise the caller's text, and a name
	// carrying a separator, a dot segment, a query, or a fragment must address one
	// package rather than walking out of the endpoint's own path.
	#registryURL(name: string): string {
		return `${this.#registryBase}/${encodeURIComponent(name).replaceAll('%40', '@')}`
	}

	// The canonical raw-content path is `/<scope>/<repository>/refs/heads/<branch>/<path>`.
	// The tail is the same mirror path the verdict carries, derived by the same
	// helper, so the file fetched and the file answered for cannot drift apart; it
	// is left unencoded because that helper's one separator is a real path
	// separator here. The branch and the repository are each a single segment and
	// each is encoded whole, because both reach the URL and only one of them is
	// closed by a guard.
	#guideURL(name: string): string {
		const branch = this.#guideBranch
			.split('/')
			.map((segment) => encodeURIComponent(segment))
			.join('/')
		const repository = encodeURIComponent(name.slice(name.lastIndexOf('/') + 1))
		return `${this.#guideBase}/${Upstream.#scope}/${repository}/refs/heads/${branch}/${nameToGuide(name)}`
	}

	// One read, plus the retries a transport fault is given. A `404` is a definite
	// answer and is never retried; an exhausted allowance short-circuits the next
	// attempt rather than spending a request to be refused again. The fault is
	// published here, at the one place that knows the cause, which is what lets
	// every projection downstream stay a plain value.
	//
	// `accept` is stated only where an endpoint publishes more than one form of
	// the same answer, which is the packument alone. Every other read takes what
	// the endpoint serves, so no request declares a media type it has no reason to.
	async #read(
		url: string,
		timeout: number,
		allowance: { remaining: number },
		accept?: string,
	): Promise<{ readonly lookup: Lookup; readonly content: string; readonly note: string }> {
		let note = ''
		for (let attempt = 0; attempt <= this.#retries; attempt += 1) {
			this.#assertAlive()
			const outcome = await this.#request(url, timeout, allowance, accept)
			if (outcome.lookup !== 'failed') return outcome
			note = outcome.note
		}
		this.#error('FETCH', `The upstream read at ${url} produced no answer.`, { url, note })
		return { lookup: 'failed', content: '', note }
	}

	// One request: unauthenticated, redirect-free, and bounded by both the
	// endpoint's timeout and this reader's own abort signal. Teardown is the only
	// outcome that escapes as a throw, because a cancelled call has no verdict.
	async #request(
		url: string,
		timeout: number,
		allowance: { remaining: number },
		accept?: string,
	): Promise<{ readonly lookup: Lookup; readonly content: string; readonly note: string }> {
		if (allowance.remaining <= 0) {
			return {
				lookup: 'failed',
				content: '',
				note: `the call spent its ${String(this.#budget)}-byte allowance`,
			}
		}
		try {
			const response = await fetch(url, {
				signal: AbortSignal.any([this.#controller.signal, AbortSignal.timeout(timeout)]),
				redirect: 'manual',
				...(accept === undefined ? {} : { headers: { accept } }),
			})
			if (response.status === 404) {
				await response.body?.cancel()
				return { lookup: 'missing', content: '', note: 'HTTP 404' }
			}
			if (response.status >= 300 && response.status < 400) {
				await response.body?.cancel()
				return {
					lookup: 'failed',
					content: '',
					note: `HTTP ${String(response.status)}, and a redirect is never followed`,
				}
			}
			if (!response.ok) {
				await response.body?.cancel()
				return { lookup: 'failed', content: '', note: `HTTP ${String(response.status)}` }
			}
			return await this.#body(response, allowance)
		} catch (error) {
			this.#assertAlive()
			return { lookup: 'failed', content: '', note: this.#note(error) }
		}
	}

	// The body, read against both bounds at once. The stream is counted chunk by
	// chunk against the response limit and against what the whole call has left,
	// so one oversized answer and many small ones are refused by different tests.
	// Every decoded byte is spent whatever the verdict, because bytes a failed
	// read consumed are bytes the caller no longer has. `content-length` cannot
	// refuse early: it counts wire octets, while both bounds count decoded bytes,
	// and content encoding may make either count larger than the other.
	//
	// A status carrying no representation reaches this method too, because `ok`
	// covers the whole 2xx range. It is a verdict rather than an empty answer: a
	// zero-byte file arrives as a `200` with an empty stream and still reads as
	// found.
	async #body(
		response: Response,
		allowance: { remaining: number },
	): Promise<{ readonly lookup: Lookup; readonly content: string; readonly note: string }> {
		const body = response.body
		if (body === null) {
			return {
				lookup: 'failed',
				content: '',
				note: `HTTP ${String(response.status)}, and the answer carries no body`,
			}
		}
		const reader = body.getReader()
		const decoder = new TextDecoder('utf-8', { fatal: true })
		const chunks: string[] = []
		let total = 0
		try {
			for (;;) {
				const chunk = await reader.read()
				if (chunk.done) break
				total += chunk.value.byteLength
				allowance.remaining -= chunk.value.byteLength
				if (total > this.#limit) {
					await reader.cancel()
					return {
						lookup: 'failed',
						content: '',
						note: `the response passed the ${String(this.#limit)}-byte response limit`,
					}
				}
				if (allowance.remaining < 0) {
					await reader.cancel()
					return {
						lookup: 'failed',
						content: '',
						note: `the call spent its ${String(this.#budget)}-byte allowance`,
					}
				}
				chunks.push(decoder.decode(chunk.value, { stream: true }))
			}
			chunks.push(decoder.decode())
		} catch (error) {
			await reader.cancel().catch(() => undefined)
			throw error
		} finally {
			reader.releaseLock()
		}
		return { lookup: 'found', content: chunks.join(''), note: '' }
	}

	// A caught transport fault, flattened into one line a caller can print. Node
	// wraps the real socket failure in `cause`, so its code is appended where the
	// runtime attached one — the difference between a refused connection and a
	// name that does not resolve is the part worth reading.
	#note(error: unknown): string {
		if (!isError(error)) return 'the request failed for an unreported reason'
		const cause = error.cause
		const code = isRecord(cause) && isString(cause.code) ? cause.code : undefined
		const message = `${error.name}: ${error.message}`
		return code === undefined ? message : `${message} (${code})`
	}

	// A bounded worker pool, never an unbounded parallel start. Results land at
	// their original index, so the answer is in input order however the reads
	// interleaved. Every worker is awaited whatever it did, so a sibling's later
	// rejection is observed rather than escaping as an unhandled one, and the
	// first failure is the one rethrown.
	async #gather<T, R>(items: readonly T[], run: (item: T) => Promise<R>): Promise<readonly R[]> {
		const results: R[] = []
		const state: { cursor: number; failure: { readonly error: unknown } | undefined } = {
			cursor: 0,
			failure: undefined,
		}
		const workers = Array.from({ length: Math.min(this.#concurrency, items.length) }, () =>
			this.#drain(items, run, results, state),
		)
		await Promise.allSettled(workers)
		if (state.failure !== undefined) throw state.failure.error
		return results
	}

	// One worker's pull-and-run loop over the shared cursor.
	async #drain<T, R>(
		items: readonly T[],
		run: (item: T) => Promise<R>,
		results: R[],
		state: { cursor: number; failure: { readonly error: unknown } | undefined },
	): Promise<void> {
		for (;;) {
			if (state.failure !== undefined) return
			const index = state.cursor
			state.cursor += 1
			if (index >= items.length) return
			const item = items[index]
			if (item === undefined) return
			try {
				results[index] = await run(item)
			} catch (error) {
				state.failure ??= { error }
				return
			}
		}
	}

	// Snapshot the caller's value, then guard the snapshot, so a property backed
	// by an accessor never reaches a decision this reader later depends on.
	#accept<T>(value: unknown, guard: Guard<T>, field: string): T {
		const snapshot = cloneValue(value)
		if (guard(snapshot)) return snapshot
		throw this.#error(
			'INVALID',
			`The ${field} argument is not the exact shape this upstream reader accepts.`,
			{ field },
		)
	}

	#assertAlive(): void {
		if (this.#destroyed) throw this.#error('DESTROYED', 'This upstream reader has been destroyed.')
	}

	// Publish the failure on the observation channel, then hand it back to be
	// thrown at the site that decided it, or discarded where the failure is
	// collected into a verdict instead.
	#error(code: ScaffoldErrorCode, message: string, context?: unknown): ScaffoldError {
		const error = new ScaffoldError(code, message, context)
		this.#emitter.emit('error', error)
		return error
	}
}
