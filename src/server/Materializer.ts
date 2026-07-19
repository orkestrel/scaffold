import type {
	ManifestEntry,
	MaterializeResult,
	MaterializerEventMap,
	MaterializerInterface,
	MaterializerOptions,
} from './types.js'
import type { Artifact, Audit, Plan } from '@src/core'
import type { EmitterInterface } from '@orkestrel/emitter'
import {
	chmodSync,
	cpSync,
	existsSync,
	mkdirSync,
	realpathSync,
	unlinkSync,
	writeFileSync,
} from 'node:fs'
import { dirname, join, relative as relativeOf, resolve, sep } from 'node:path'
import { Emitter } from '@orkestrel/emitter'
import { ScaffoldError } from '@src/core'
import { hostRoot, isVacant, listFiles, readHostManifest } from './helpers.js'

/**
 * The materialization entity (server) — the only impure surface in the
 * package, writing a `Plan` to `node:fs` behind an explicit call.
 *
 * @remarks
 * `materialize` is green-field: it refuses any target `isVacant` rejects
 * (`ScaffoldError('TARGET', …)`), then byte-copies each `host` artifact from
 * the `host` root and writes each `template` / `computed` artifact's rendered
 * `content`, failing fast on any write error (`ScaffoldError('WRITE', …)`).
 * `repair` is into-existing: it skips the vacancy check and writes ONLY the
 * `missing` / `stale` artifacts an `Audit` names, leaving `aligned` ones
 * untouched. `prune` deletes stale files under `target/.claude/agents/` and
 * `target/scripts/` that the vendored `host` no longer names — the retired
 * `mirror.sh`/`scaffold.sh` cleanup step, now a method. After `destroy()`
 * every method throws `DESTROYED`; teardown is idempotent, emitter last.
 *
 * @remarks
 * `host`-origin copies are MANIFEST-AWARE: when the resolved `host` root
 * carries a `manifest.json` (this package's own vendored `dist/host`), each
 * artifact's `source` (a destination-relative path) is looked up in the
 * manifest to find its un-dotted STORAGE path plus an `executable` bit
 * (applied via `chmodSync` after the copy) — the vendored-package shape,
 * where storage names avoid leading dots npm would otherwise mangle. When
 * `host` carries no `manifest.json` (a caller-supplied raw repo root, e.g. a
 * sibling checkout or a test fixture), `source` maps to `host` 1:1, exactly
 * as before.
 *
 * @remarks
 * Defense in depth at the filesystem trust boundary: EVERY resolved
 * destination (`materialize` and `repair`, both origins) is asserted to stay
 * within `resolve(target)` before any write, and every `host`-origin copy
 * source is asserted to stay within `resolve(host)` before any read — a
 * traversal segment (`../`) in an artifact's `path` or `source` cannot escape
 * either root, even if a gate upstream (e.g. an ungated `Plan` built by hand)
 * let it through. A destination violation throws `ScaffoldError('WRITE', …)`;
 * a source violation throws `ScaffoldError('TARGET', …)`.
 *
 * @remarks
 * The containment check is REAL-PATH aware, not merely lexical: both the
 * root (`target` / `host`) and the candidate destination/source are resolved
 * through `realpathSync` on their DEEPEST EXISTING ancestor before the prefix
 * comparison, so a symlinked subdirectory planted inside an otherwise
 * legitimate root cannot smuggle a write (or read) outside it — `repair`,
 * which has no `isVacant` gate, is covered exactly like `materialize`. A path
 * segment that does not yet exist on disk (the still-to-be-created file/dir
 * a write is about to create) is rejoined onto the resolved existing
 * ancestor rather than realpath'd itself.
 *
 * @example
 * ```ts
 * import { blueprint, blueprintToPlan } from '@orkestrel/scaffold'
 * import { createMaterializer } from '@orkestrel/scaffold/server'
 *
 * const plan = blueprintToPlan(blueprint('budget', { surfaces: ['core'] }))
 * const materializer = createMaterializer()
 * materializer.materialize(plan, './packages/budget-new')
 * materializer.destroy()
 * ```
 */
export class Materializer implements MaterializerInterface {
	// The `prune`-owned directories — a hard allowlist; `prune` never touches
	// anything outside these two.
	static readonly #PRUNE_DIRECTORIES = ['.claude/agents', 'scripts'] as const

	readonly #emitter: Emitter<MaterializerEventMap>
	readonly #host: string
	#manifestLoaded = false
	#manifestEntries: readonly ManifestEntry[] | undefined
	#destroyed = false

	constructor(options?: MaterializerOptions) {
		this.#emitter = new Emitter<MaterializerEventMap>({ on: options?.on, error: options?.error })
		// The host IS this package's own vendored data unless `options.host`
		// overrides it — see `hostRoot`'s doc-comment for the resolution law.
		this.#host = options?.host ?? hostRoot()
	}

	get emitter(): EmitterInterface<MaterializerEventMap> {
		return this.#emitter
	}

	materialize(plan: Plan, target: string): MaterializeResult {
		this.#ensureAlive()
		if (!isVacant(target)) {
			throw new ScaffoldError('TARGET', 'materialize requires a vacant target', { target })
		}
		const written: string[] = []
		const copied: string[] = []
		for (const artifact of plan.artifacts) {
			if (artifact.origin === 'host') {
				this.#copy(artifact, target)
				copied.push(artifact.path)
			} else {
				this.#write(artifact, target)
				written.push(artifact.path)
			}
		}
		const result: MaterializeResult = { target, written, copied, skipped: [], removed: [] }
		this.#emitter.emit('done', result)
		return result
	}

	repair(plan: Plan, audit: Audit, target: string): MaterializeResult {
		this.#ensureAlive()
		const drifted = new Map(audit.findings.map((finding) => [finding.path, finding.drift]))
		const written: string[] = []
		const copied: string[] = []
		const skipped: string[] = []
		for (const artifact of plan.artifacts) {
			const drift = drifted.get(artifact.path)
			if (drift !== 'missing' && drift !== 'stale') {
				skipped.push(artifact.path)
				continue
			}
			if (artifact.origin === 'host') {
				this.#copy(artifact, target)
				copied.push(artifact.path)
			} else {
				this.#write(artifact, target)
				written.push(artifact.path)
			}
		}
		const result: MaterializeResult = { target, written, copied, skipped, removed: [] }
		this.#emitter.emit('done', result)
		return result
	}

	// The vendored allowlist is derived from `host` alone — the directories
	// `prune` guards are host-vendored, not plan-selected.
	prune(target: string): MaterializeResult {
		this.#ensureAlive()
		const removed: string[] = []
		for (const directory of Materializer.#PRUNE_DIRECTORIES) {
			const allowed = this.#vendored(directory)
			const root = join(target, directory)
			if (!existsSync(root)) continue
			for (const relative of listFiles(root)) {
				const path = `${directory}/${relative}`
				if (allowed.has(path)) continue
				const full = Materializer.#assertContained(target, path, 'WRITE', path)
				unlinkSync(full)
				removed.push(path)
				this.#emitter.emit('remove', path)
			}
		}
		const result: MaterializeResult = { target, written: [], copied: [], skipped: [], removed }
		this.#emitter.emit('done', result)
		return result
	}

	destroy(): void {
		if (this.#destroyed) return
		this.#destroyed = true
		this.#emitter.emit('destroy')
		this.#emitter.destroy()
	}

	#copy(artifact: Artifact, target: string): void {
		const source = artifact.source ?? artifact.path
		const manifest = this.#manifest()
		if (manifest === undefined) {
			const from = Materializer.#assertContained(this.#host, source, 'TARGET', artifact.path)
			const to = Materializer.#assertContained(target, artifact.path, 'WRITE', artifact.path)
			try {
				mkdirSync(dirname(to), { recursive: true })
				cpSync(from, to, { recursive: true })
			} catch (error) {
				this.#emitter.emit('error', error)
				throw new ScaffoldError('WRITE', `Failed to copy host artifact at ${artifact.path}`, {
					path: artifact.path,
					error,
				})
			}
			this.#emitter.emit('copy', artifact.path)
			return
		}
		const entries = manifest.filter(
			(entry) => entry.destination === source || entry.destination.startsWith(`${source}/`),
		)
		if (entries.length === 0) {
			throw new ScaffoldError('TARGET', `No manifest entry for host artifact at ${artifact.path}`, {
				path: artifact.path,
				source,
			})
		}
		for (const entry of entries) {
			const from = Materializer.#assertContained(this.#host, entry.storage, 'TARGET', artifact.path)
			const to = Materializer.#assertContained(target, entry.destination, 'WRITE', artifact.path)
			try {
				mkdirSync(dirname(to), { recursive: true })
				cpSync(from, to)
				if (entry.executable) chmodSync(to, 0o755)
			} catch (error) {
				this.#emitter.emit('error', error)
				throw new ScaffoldError('WRITE', `Failed to copy host artifact at ${artifact.path}`, {
					path: artifact.path,
					error,
				})
			}
		}
		this.#emitter.emit('copy', artifact.path)
	}

	// Lazily load + cache `host`'s `manifest.json` (once per instance) —
	// `undefined` means `host` has no manifest and callers fall back to the
	// 1:1 raw-root mapping.
	#manifest(): readonly ManifestEntry[] | undefined {
		if (!this.#manifestLoaded) {
			this.#manifestEntries = readHostManifest(this.#host)
			this.#manifestLoaded = true
		}
		return this.#manifestEntries
	}

	// The vendored set of destination-relative paths under `directory`
	// (`.claude/agents` or `scripts`) that `prune` must NOT delete — read from
	// the manifest's `destination`s when `host` has one, else listed straight
	// off `host/<directory>`.
	//
	// FAIL CLOSED: before returning any allowlist (even an empty one), the
	// vendored source must be POSITIVELY established, or `prune` would treat
	// an unresolved host as "vendors nothing" and delete every file under
	// `target/<directory>`. A missing `host` root, or (no `manifest.json` AND
	// no `host/<directory>`), is a coded `TARGET` failure — the distinction
	// this guards is missing-host vs genuinely-empty-vendor: a `host` that
	// EXISTS and vendors zero files in `directory` (an existing empty dir, or
	// a manifest with zero entries for it) remains a valid empty allowlist.
	#vendored(directory: string): ReadonlySet<string> {
		if (!existsSync(this.#host)) {
			throw new ScaffoldError(
				'TARGET',
				`Cannot establish vendored source for prune: host root not found at ${this.#host}`,
				{ host: this.#host, directory },
			)
		}
		const manifest = this.#manifest()
		if (manifest !== undefined) {
			return new Set(
				manifest
					.filter((entry) => entry.destination.startsWith(`${directory}/`))
					.map((entry) => entry.destination),
			)
		}
		const hostDirectory = join(this.#host, directory)
		if (!existsSync(hostDirectory)) {
			throw new ScaffoldError(
				'TARGET',
				`Cannot establish vendored source for prune: no manifest.json and no host directory at ${hostDirectory}`,
				{ host: this.#host, directory },
			)
		}
		return new Set(listFiles(hostDirectory).map((relative) => `${directory}/${relative}`))
	}

	#write(artifact: Artifact, target: string): void {
		const to = Materializer.#assertContained(target, artifact.path, 'WRITE', artifact.path)
		try {
			mkdirSync(dirname(to), { recursive: true })
			writeFileSync(to, artifact.content ?? '', 'utf8')
		} catch (error) {
			this.#emitter.emit('error', error)
			throw new ScaffoldError('WRITE', `Failed to write artifact at ${artifact.path}`, {
				path: artifact.path,
				error,
			})
		}
		this.#emitter.emit('write', artifact.path)
	}

	// Resolve `join(root, relative)` and assert it stays within `resolve(root)`
	// — a prefix check against the REAL-PATH-resolved root PLUS a path
	// separator, never naive `startsWith` on the raw joined string. `code` is
	// `'WRITE'` for a destination escape (asserted against `target`) and
	// `'TARGET'` for a source escape (asserted against `host`), per the Errors
	// section's coded semantics.
	static #assertContained(
		root: string,
		relative: string,
		code: 'WRITE' | 'TARGET',
		path: string,
	): string {
		const resolvedRoot = Materializer.#resolveReal(resolve(root))
		const resolvedCandidate = Materializer.#resolveReal(resolve(root, relative))
		if (resolvedCandidate !== resolvedRoot && !resolvedCandidate.startsWith(resolvedRoot + sep)) {
			const boundary = code === 'WRITE' ? 'target' : 'host'
			throw new ScaffoldError(code, `Artifact path "${path}" escapes the ${boundary} root`, {
				path,
				root,
			})
		}
		return resolve(root, relative)
	}

	// Realpath-resolve the DEEPEST EXISTING ancestor of `path` (following any
	// symlink it or its ancestors are), then rejoin the still-nonexistent
	// remainder unchanged — so a containment check sees where a symlinked
	// segment ACTUALLY points, while a not-yet-created leaf (the file/dir a
	// write is about to create) is not itself realpath'd (it does not exist).
	static #resolveReal(path: string): string {
		if (existsSync(path)) return realpathSync(path)
		const parent = dirname(path)
		if (parent === path) return path
		return join(Materializer.#resolveReal(parent), relativeOf(parent, path))
	}

	#ensureAlive(): void {
		if (this.#destroyed) throw new ScaffoldError('DESTROYED', 'Materializer has been destroyed')
	}
}
