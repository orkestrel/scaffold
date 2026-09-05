import type { Guard } from '@orkestrel/contract'
import type { EmitterInterface } from '@orkestrel/emitter'
import type {
	CatalogEntry,
	Dependency,
	HostFile,
	Mirror,
	Release,
	ScaffoldErrorCode,
	Snapshot,
} from '@src/core'
import type {
	BytesReadResult,
	HostInventory,
	ReadAllowance,
	TextReadResult,
	UpstreamEventMap,
	UpstreamInterface,
	UpstreamOptions,
} from './types.js'
import {
	isError,
	isRecord,
	isString,
	parseJSON,
	parseJSONAs,
	parseStringField,
} from '@orkestrel/contract'
import { Emitter } from '@orkestrel/emitter'
import {
	cloneValue,
	compareVersions,
	CONTROL_CHARACTER_PATTERN,
	extractRangeMajor,
	extractVersion,
	HOST_INVENTORY_PATH,
	inferGroup,
	isCollection,
	isDependencyName,
	isSnapshot,
	MAX_COLLECTION_ITEMS,
	MAX_DEPENDENCY_NAME_LENGTH,
	MAX_REGISTRY_BYTES,
	MAX_RANGE_LENGTH,
	MAX_TOTAL_REGISTRY_BYTES,
	matchesRange,
	nameToGuide,
	ScaffoldError,
} from '@src/core'
import {
	DEFAULT_BRANCH,
	DEFAULT_REGISTRY_BASE,
	DEFAULT_REPOSITORY_BASE,
	DEFAULT_UPSTREAM_CONCURRENCY,
	DEFAULT_UPSTREAM_RETRIES,
	DEFAULT_UPSTREAM_TIMEOUT,
	ORKESTREL_SCOPE,
	PACKUMENT_MEDIA_TYPE,
	SCAFFOLD_REPOSITORY,
	UNREADABLE_VERSION_NOTE,
} from './constants.js'
import { computeManifestDigest, hexToDigest } from './helpers.js'
import {
	isDependencies,
	isDependencyNames,
	isHostManifest,
	isPaths,
	isUpstreamOptions,
} from './validators.js'

/**
 * Represents the reading spine: one bounded, unauthenticated, redirect-free request per answer.
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
 * The vendored-file inventory is the other read a whole call rests on, and it
 * fails the other way: it fails every row of its call rather than throwing, so
 * the caller receives one whole dead answer it can replace with one whole
 * baseline instead of a mixture it would have to reconcile.
 *
 * Requests are unauthenticated because every fleet repository is public, and
 * they follow no redirect, so a misconfigured or hostile endpoint cannot move a
 * read to another host. Each one is bounded by its endpoint's timeout and by the
 * reader's own abort signal, so {@link Upstream.destroy} cancels what is in
 * flight instead of waiting for it.
 *
 * The allowance is threaded through the private reads as a mutable
 * {@link ReadAllowance} carrier rather than held on the instance, because
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
	readonly #emitter: Emitter<UpstreamEventMap>
	readonly #repositoryBase: string
	readonly #repositoryBranch: string
	readonly #repositoryTimeout: number
	readonly #registryBase: string
	readonly #registryTimeout: number
	readonly #concurrency: number
	readonly #retries: number
	readonly #limit: number
	readonly #budget: number
	readonly #controller = new AbortController()
	#destroyed = false

	/**
	 * Constructs a reader over one raw content host and one registry.
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
		this.#repositoryBase = this.#endpoint(
			options?.repository?.base ?? DEFAULT_REPOSITORY_BASE,
			'repository',
		)
		this.#repositoryBranch = options?.repository?.branch ?? DEFAULT_BRANCH
		this.#repositoryTimeout = options?.repository?.timeout ?? DEFAULT_UPSTREAM_TIMEOUT
		this.#registryBase = this.#endpoint(
			options?.registry?.base ?? DEFAULT_REGISTRY_BASE,
			'registry',
		)
		this.#registryTimeout = options?.registry?.timeout ?? DEFAULT_UPSTREAM_TIMEOUT
		this.#concurrency = options?.concurrency ?? DEFAULT_UPSTREAM_CONCURRENCY
		this.#retries = options?.retries ?? DEFAULT_UPSTREAM_RETRIES
		this.#limit = options?.limit ?? MAX_REGISTRY_BYTES
		this.#budget = options?.budget ?? MAX_TOTAL_REGISTRY_BYTES
	}

	/** Exposes the upstream reader's observation channel. */
	get emitter(): EmitterInterface<UpstreamEventMap> {
		return this.#emitter
	}

	/**
	 * Looks up the newest release each declared range admits.
	 *
	 * @param dependencies - The declared dependencies to look up.
	 * @returns One release verdict per dependency, in input order.
	 * @throws {@link ScaffoldError} coded `INVALID` when `dependencies` is not a
	 * bounded list of declared dependencies, and `DESTROYED` when the reader is
	 * torn down before or during the call.
	 *
	 * @remarks
	 * The reader selects across the packument's stable version map before any
	 * collection bound can truncate it. It falls back to `dist-tags.latest` only
	 * when that version satisfies the declared range. `*` requests the newest
	 * stable version outright. The verdict's `major` field carries the stable
	 * major from the latest tag when that tag can be read.
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
	 * Fetches each named package's guide, beside the local mirror it answers for.
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
	 * holds.
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
	 * Reads each named vendored file from the repository, beside the target bytes it answers for.
	 *
	 * @param paths - The target-relative vendored paths to read.
	 * @param current - The target files as exact bytes, keyed by the same paths.
	 * @returns One file verdict per path, in input order.
	 * @throws {@link ScaffoldError} coded `INVALID` when `paths` is not a bounded
	 * list of target-relative paths or `current` is not a snapshot, and
	 * `DESTROYED` when the reader is torn down before or during the call.
	 *
	 * @remarks
	 * The committed inventory is read once per call and decides every row, so a
	 * path whose declared digest already matches the target's own bytes is `found`
	 * without a request and the call spends nothing on it. An inventory that
	 * produces no answer fails every row of the call rather than leaving some rows
	 * live and some dead, which is what leaves the caller one whole baseline to
	 * fall back to. A path the inventory does not name is `missing`.
	 *
	 * A fetched response's decoded content is verified against the digest the
	 * inventory declares for that path, before any character decoding. Transport
	 * encoding is transparent and does not enter the comparison, so content that
	 * does not hash to the inventory's claim fails its row rather than reaching a
	 * write. That is integrity against a single committed baseline, not
	 * authenticity: it detects truncated, substituted, or stale content, and it
	 * says nothing about who published the inventory.
	 *
	 * A guide mirror is never answered here whatever the caller asks for and
	 * whatever the target holds, because those bytes belong to `fetch` and to the
	 * mirror verb that writes them.
	 *
	 * @example
	 * ```ts
	 * import { Upstream } from '@orkestrel/scaffold/server'
	 *
	 * const upstream = new Upstream()
	 * await upstream.read(['AGENTS.md'], { 'AGENTS.md': '2320416745' })
	 * upstream.destroy()
	 * ```
	 */
	async read(paths: readonly string[], current: Snapshot): Promise<readonly HostFile[]> {
		this.#assertAlive()
		const accepted = this.#accept(paths, isPaths, 'paths')
		const observed = this.#accept(current, isSnapshot, 'current')
		if (accepted.length === 0) return []
		const allowance = { remaining: this.#budget }
		const inventory = await this.#inventory(allowance)
		return this.#gather(accepted, (path) => this.#file(path, inventory, observed, allowance))
	}

	/**
	 * Catalogs the published fleet from the registry's organization package list.
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
	 * Tears the reader down, aborting every request in flight. Teardown is idempotent.
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
	// found answer that states no admitted version is unmatched rather than a
	// found one carrying nothing, because an empty version is not an answer.
	async #release(dependency: Dependency, allowance: ReadAllowance): Promise<Release> {
		const outcome = await this.#readWithRetries(
			this.#registryURL(dependency.name),
			this.#registryTimeout,
			allowance,
			PACKUMENT_MEDIA_TYPE,
		)
		const latest =
			outcome.lookup === 'found'
				? this.#releaseVersion(outcome.content, dependency.range)
				: undefined
		const tagged = outcome.lookup === 'found' ? this.#latest(outcome.content) : undefined
		const major = tagged === undefined ? undefined : extractVersion(tagged)?.[0]
		const release: Release =
			latest === undefined
				? {
						name: dependency.name,
						range: dependency.range,
						lookup: outcome.lookup === 'found' ? 'unmatched' : outcome.lookup,
						note: outcome.lookup === 'found' ? UNREADABLE_VERSION_NOTE : outcome.note,
						...(major === undefined ? {} : { major }),
					}
				: {
						name: dependency.name,
						range: dependency.range,
						lookup: 'found',
						latest,
						...(major === undefined ? {} : { major }),
					}
		this.#emitter.emit('release', release)
		return release
	}

	// One guide, read and projected beside the local bytes it answers for.
	async #mirror(name: string, current: Snapshot, allowance: ReadAllowance): Promise<Mirror> {
		const path = nameToGuide(name)
		const outcome = await this.#readWithRetries(
			this.#guideURL(name),
			this.#repositoryTimeout,
			allowance,
		)
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

	// One vendored file, published on the observation channel beside the target's
	// own bytes. The verdict itself is decided next door, because it has
	// several exits and each one still has to be published exactly once.
	async #file(
		path: string,
		inventory: HostInventory,
		current: Snapshot,
		allowance: ReadAllowance,
	): Promise<HostFile> {
		const file = await this.#answer(path, inventory, current[path], allowance)
		this.#emitter.emit('file', file)
		return file
	}

	// One path's verdict, decided against the live inventory before anything is
	// requested. The order is what makes the call cheap and the answer honest: a
	// dead inventory fails every row alike, a guide mirror and a path the
	// inventory does not name are each answered without a request, and a path
	// whose declared digest already matches the target's own bytes is found from
	// those bytes. Only what is left is fetched, and what comes back has to hash
	// to the digest the inventory declared or it fails rather than reaching a
	// write.
	//
	// The guide mirror is refused ahead of the byte comparison rather than after
	// it, so the refusal is a property of the path and reads the same whatever
	// the target holds. Those bytes belong to the mirror verb, which refetches
	// them from each package's own repository, so answering one from this
	// repository would claim a comparison that verb is about to break.
	async #answer(
		path: string,
		inventory: HostInventory,
		observed: string | undefined,
		allowance: ReadAllowance,
	): Promise<HostFile> {
		const carried = observed === undefined ? {} : { observed }
		if (inventory.lookup !== 'found') {
			return { path, lookup: inventory.lookup, note: inventory.note, ...carried }
		}
		if (inferGroup(path) === 'guides') {
			return {
				path,
				lookup: 'missing',
				note: `${path} is a guide mirror the fleet serves`,
				...carried,
			}
		}
		if (inventory.duplicates.has(path)) {
			return {
				path,
				lookup: 'failed',
				note: `the inventory names ${path} more than once`,
				...carried,
			}
		}
		const digest = inventory.digests.get(path)
		if (digest === undefined) {
			return { path, lookup: 'missing', note: `the inventory does not name ${path}`, ...carried }
		}
		if (observed !== undefined && hexToDigest(observed) === digest) {
			return { path, lookup: 'found', hex: observed, ...carried }
		}
		const outcome = await this.#readWithRetries(
			this.#vendorURL(path),
			this.#repositoryTimeout,
			allowance,
			undefined,
			true,
		)
		if (outcome.lookup !== 'found') {
			return { path, lookup: outcome.lookup, note: outcome.note, ...carried }
		}
		if (hexToDigest(outcome.hex) !== digest) {
			return {
				path,
				lookup: 'failed',
				note: `the bytes served for ${path} do not match the digest the inventory declares`,
				...carried,
			}
		}
		return { path, lookup: 'found', hex: outcome.hex, ...carried }
	}

	// The committed inventory, read once per call and projected into the lookup
	// every row of that call is decided against. It fails softly rather than
	// throwing, because a caller holding one whole failed answer can fall back to
	// one whole baseline, where a mixture of live and dead rows leaves it nothing
	// to fall back to. The membership digest is recomputed rather than trusted, so
	// a membership edit that did not update the manifest's own claim is refused
	// here instead of authorizing bytes downstream.
	async #inventory(allowance: ReadAllowance): Promise<HostInventory> {
		const url = this.#vendorURL(HOST_INVENTORY_PATH)
		const empty = { digests: new Map<string, string>(), duplicates: new Set<string>() }
		const outcome = await this.#readWithRetries(url, this.#repositoryTimeout, allowance)
		if (outcome.lookup !== 'found') {
			return {
				...empty,
				lookup: outcome.lookup,
				note:
					outcome.lookup === 'missing'
						? `the vendored inventory at ${url} is not published there`
						: `the vendored inventory at ${url} produced no answer: ${outcome.note}`,
			}
		}
		const manifest = parseJSONAs(outcome.content, isHostManifest)
		if (manifest === undefined) {
			return {
				...empty,
				lookup: 'failed',
				note: `the vendored inventory at ${url} is not a readable manifest`,
			}
		}
		if (manifest.digest !== computeManifestDigest(manifest.entries, manifest.roots)) {
			return {
				...empty,
				lookup: 'failed',
				note: `the vendored inventory at ${url} does not match its own membership digest`,
			}
		}
		const digests = new Map<string, string>()
		const duplicates = new Set<string>()
		for (const entry of manifest.entries) {
			if (digests.has(entry.destination)) duplicates.add(entry.destination)
			digests.set(entry.destination, entry.digest)
		}
		return { lookup: 'found', digests, duplicates, note: '' }
	}

	// One catalog row. It publishes nothing on the observation channel: the
	// channel carries the verdicts the writer binds to, and a catalog row is
	// not one of them, so the whole sorted list is the answer instead.
	async #entry(name: string, allowance: ReadAllowance): Promise<CatalogEntry> {
		const outcome = await this.#readWithRetries(
			this.#registryURL(name),
			this.#registryTimeout,
			allowance,
			PACKUMENT_MEDIA_TYPE,
		)
		const version = outcome.lookup === 'found' ? this.#latest(outcome.content) : undefined
		if (version !== undefined) {
			return {
				name,
				lookup: 'found',
				version,
				dependencies: this.#edges(outcome.content, version, 'dependencies'),
				peers: this.#edges(outcome.content, version, 'peerDependencies'),
			}
		}
		return {
			name,
			lookup: outcome.lookup === 'found' ? 'unmatched' : outcome.lookup,
			note: outcome.lookup === 'found' ? UNREADABLE_VERSION_NOTE : outcome.note,
		}
	}

	// The runtime and peer edges the published version declares, read from the
	// same abbreviated packument the version came from rather than from a second
	// request. Development edges are deliberately not read: they reach no
	// consumer, so they constrain nothing a publish order decides. A packument
	// that carries no readable edges answers none rather than failing the row,
	// because a package with no dependencies and a package whose manifest could
	// not be read both publish first, and the version is what the row promises.
	#edges(
		content: string,
		version: string,
		section: 'dependencies' | 'peerDependencies',
	): readonly Dependency[] {
		const parsed = parseJSON(content)
		if (!isRecord(parsed)) return []
		const versions = parsed.versions
		if (!isRecord(versions)) return []
		const manifest = versions[version]
		if (!isRecord(manifest)) return []
		const declared = manifest[section]
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
	async #packages(allowance: ReadAllowance): Promise<readonly string[]> {
		const url = `${this.#registryBase}/-/org/${ORKESTREL_SCOPE}/package`
		const outcome = await this.#readWithRetries(url, this.#registryTimeout, allowance)
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

	// Select before any collection bound can truncate the registry's version map.
	// A missing or pruned map falls back to the latest tag only when that tag is
	// still admitted by the declaration.
	#releaseVersion(content: string, range: string): string | undefined {
		const parsed = parseJSON(content)
		if (!isRecord(parsed)) return undefined
		const versions = parsed.versions
		let selected: string | undefined
		if (isRecord(versions)) {
			for (const version of Object.keys(versions)) {
				if (!this.#admits(range, version)) continue
				if (selected === undefined || compareVersions(version, selected) > 0) selected = version
			}
		}
		if (selected !== undefined) return selected
		const latest = this.#latest(content)
		return latest !== undefined && this.#admits(range, latest) ? latest : undefined
	}

	// `matchesRange` owns full-version declarations. The registry reader adds the
	// unbounded request form and tolerates a bare major caret a consumer may declare.
	#admits(range: string, version: string): boolean {
		const extracted = extractVersion(version)
		if (extracted === undefined) return false
		if (range === '*') return true
		const major = extractRangeMajor(range)
		if (major !== undefined && range === `^${String(major)}`) return extracted[0] === major
		return matchesRange(range, version)
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
		const branch = this.#encode(this.#repositoryBranch)
		const repository = encodeURIComponent(name.slice(name.lastIndexOf('/') + 1))
		return `${this.#repositoryBase}/${ORKESTREL_SCOPE}/${repository}/refs/heads/${branch}/${nameToGuide(name)}`
	}

	// The same canonical raw-content path, over this package's own repository and
	// over a target-relative path the caller named. The path is encoded segment by
	// segment rather than left as written: `isPath` closes the traversal and
	// separator characters, and the characters it leaves — a fragment marker, a
	// percent sign — would otherwise reach the URL parser and address something
	// other than the file the row answers for.
	#vendorURL(path: string): string {
		const branch = this.#encode(this.#repositoryBranch)
		return `${this.#repositoryBase}/${ORKESTREL_SCOPE}/${SCAFFOLD_REPOSITORY}/refs/heads/${branch}/${this.#encode(path)}`
	}

	// One slash-joined path, encoded a segment at a time, so its separators stay
	// separators and everything between them is escaped whole.
	#encode(path: string): string {
		return path
			.split('/')
			.map((segment) => encodeURIComponent(segment))
			.join('/')
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
	async #readWithRetries(
		url: string,
		timeout: number,
		allowance: ReadAllowance,
		accept: string | undefined,
		binary: true,
	): Promise<BytesReadResult>
	async #readWithRetries(
		url: string,
		timeout: number,
		allowance: ReadAllowance,
		accept?: string,
		binary?: false,
	): Promise<TextReadResult>
	async #readWithRetries(
		url: string,
		timeout: number,
		allowance: ReadAllowance,
		accept?: string,
		binary = false,
	): Promise<TextReadResult | BytesReadResult> {
		let note = ''
		for (let round = 0; round <= this.#retries; round += 1) {
			this.#assertAlive()
			const outcome = binary
				? await this.#request(url, timeout, allowance, accept, true)
				: await this.#request(url, timeout, allowance, accept)
			if (outcome.lookup !== 'failed') return outcome
			note = outcome.note
		}
		this.#error('FETCH', `The upstream read at ${url} produced no answer.`, { url, note })
		return binary ? { lookup: 'failed', hex: '', note } : { lookup: 'failed', content: '', note }
	}

	// One request: unauthenticated, redirect-free, and bounded by both the
	// endpoint's timeout and this reader's own abort signal. Teardown is the only
	// outcome that escapes as a throw, because a cancelled call has no verdict.
	async #request(
		url: string,
		timeout: number,
		allowance: ReadAllowance,
		accept: string | undefined,
		binary: true,
	): Promise<BytesReadResult>
	async #request(
		url: string,
		timeout: number,
		allowance: ReadAllowance,
		accept?: string,
		binary?: false,
	): Promise<TextReadResult>
	async #request(
		url: string,
		timeout: number,
		allowance: ReadAllowance,
		accept?: string,
		binary = false,
	): Promise<TextReadResult | BytesReadResult> {
		if (allowance.remaining <= 0) {
			const note = `the call spent its ${String(this.#budget)}-byte allowance`
			return binary ? { lookup: 'failed', hex: '', note } : { lookup: 'failed', content: '', note }
		}
		try {
			const response = await fetch(url, {
				signal: AbortSignal.any([this.#controller.signal, AbortSignal.timeout(timeout)]),
				redirect: 'manual',
				...(accept === undefined ? {} : { headers: { accept } }),
			})
			if (response.status === 404) {
				await response.body?.cancel()
				return binary
					? { lookup: 'missing', hex: '', note: 'HTTP 404' }
					: { lookup: 'missing', content: '', note: 'HTTP 404' }
			}
			if (response.status >= 300 && response.status < 400) {
				await response.body?.cancel()
				const note = `HTTP ${String(response.status)}, and a redirect is never followed`
				return binary
					? { lookup: 'failed', hex: '', note }
					: { lookup: 'failed', content: '', note }
			}
			if (!response.ok) {
				await response.body?.cancel()
				const note = `HTTP ${String(response.status)}`
				return binary
					? { lookup: 'failed', hex: '', note }
					: { lookup: 'failed', content: '', note }
			}
			return binary
				? await this.#body(response, allowance, true)
				: await this.#body(response, allowance)
		} catch (error) {
			this.#assertAlive()
			const note = this.#note(error)
			return binary ? { lookup: 'failed', hex: '', note } : { lookup: 'failed', content: '', note }
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
	async #body(response: Response, allowance: ReadAllowance, binary: true): Promise<BytesReadResult>
	async #body(response: Response, allowance: ReadAllowance, binary?: false): Promise<TextReadResult>
	async #body(
		response: Response,
		allowance: ReadAllowance,
		binary = false,
	): Promise<TextReadResult | BytesReadResult> {
		const body = response.body
		if (body === null) {
			const note = `HTTP ${String(response.status)}, and the answer carries no body`
			return binary ? { lookup: 'failed', hex: '', note } : { lookup: 'failed', content: '', note }
		}
		const reader = body.getReader()
		const decoder = binary ? undefined : new TextDecoder('utf-8', { fatal: true })
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
					const note = `the response passed the ${String(this.#limit)}-byte response limit`
					return binary
						? { lookup: 'failed', hex: '', note }
						: { lookup: 'failed', content: '', note }
				}
				if (allowance.remaining < 0) {
					await reader.cancel()
					const note = `the call spent its ${String(this.#budget)}-byte allowance`
					return binary
						? { lookup: 'failed', hex: '', note }
						: { lookup: 'failed', content: '', note }
				}
				chunks.push(
					decoder === undefined
						? Buffer.from(chunk.value).toString('hex')
						: decoder.decode(chunk.value, { stream: true }),
				)
			}
			if (decoder !== undefined) chunks.push(decoder.decode())
		} catch (error) {
			await reader.cancel().catch(() => undefined)
			throw error
		} finally {
			reader.releaseLock()
		}
		return binary
			? { lookup: 'found', hex: chunks.join(''), note: '' }
			: { lookup: 'found', content: chunks.join(''), note: '' }
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
