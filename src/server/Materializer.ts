import type {
	HostManifest,
	MaterializeResult,
	MaterializerEventMap,
	MaterializerInterface,
	MaterializerOptions,
} from './types.js'
import type { Audit, ContentArtifact, HostArtifact, Plan } from '@src/core'
import type { EmitterInterface } from '@orkestrel/emitter'
import {
	chmodSync,
	copyFileSync,
	cpSync,
	existsSync,
	mkdirSync,
	renameSync,
	rmSync,
	statSync,
	writeFileSync,
} from 'node:fs'
import { randomUUID } from 'node:crypto'
import { dirname, join } from 'node:path'
import { attempt } from '@orkestrel/contract'
import { Emitter } from '@orkestrel/emitter'
import { findFileConflict, isPlan, ScaffoldError } from '@src/core'
import {
	hostRoot,
	hydratePlan,
	isVacant,
	listFiles,
	pruneTargets,
	readHostManifest,
	remapArtifactPath,
	resolveContainedPath,
	restoreFiles,
} from './helpers.js'
import { isPortablePath } from './validators.js'

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
 * untouched. Hydrated directory-shaped host entries are expanded into
 * file-shaped artifacts, so canonical skills and agent configuration are
 * audited and repaired file by file. `prune` deletes stale files under `target/.claude/agents/`,
 * `target/.codex/agents/`, and `target/scripts/` that the vendored `host` no
 * longer names—the retired `mirror.sh`/`scaffold.sh` cleanup step, now a method. After `destroy()`
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
 * A manifest-present `source` with ZERO matching entries degrades to a stub
 * ONLY when that `source` is a dependency-guide pointer — one that starts
 * with `guides/src/` and ends with `.md` (the `guides/src/<dep>.md` pointer
 * `Compiler` emits for any dependency outside this package's vendored set).
 * That is the ONLY zero-match case that is legitimate: every `HOST_PATHS`
 * source is always staged by `stageHost`, so a non-guide zero-match means a
 * corrupted or truncated `manifest.json`, not an intentionally-unvendored
 * artifact. For a guide pointer, a short stub file is written at the
 * destination and reported exactly like a successful copy, mirroring the
 * READ path (`hydratePlan` leaves such artifacts `content`-undefined, so
 * `diffPlan` audits them by PRESENCE only). For every OTHER zero-match, the
 * fail-closed `ScaffoldError('TARGET', …)` is thrown — degrading an
 * unscoped zero-match would otherwise let a corrupted manifest silently stub
 * an unrecoverable artifact (e.g. `AGENTS.md` — `pull` only ever fetches
 * dependency guides) or write a FILE named `.claude` over what should be a
 * directory artifact. The raw-root fallback (`manifest === undefined`, a
 * caller-supplied `--from`) keeps its own throw regardless: an EXPLICITLY
 * named source failing to resolve is a different, caller-error failure
 * class, not a "not vendored" degrade.
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
	readonly #emitter: Emitter<MaterializerEventMap>
	readonly #host: string
	#manifestLoaded = false
	#manifestValue: HostManifest | undefined
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
		this.#prepare(plan, target)
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
		const drifted = new Set(
			audit.findings
				.filter((finding) => finding.drift === 'missing' || finding.drift === 'stale')
				.map((finding) => finding.path),
		)
		this.#prepare(
			{
				...plan,
				artifacts: plan.artifacts.filter((artifact) => drifted.has(artifact.path)),
			},
			target,
		)
		const written: string[] = []
		const copied: string[] = []
		const skipped: string[] = []
		for (const artifact of plan.artifacts) {
			if (!drifted.has(artifact.path)) {
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

	// The unexpected-file scan itself lives in `pruneTargets` (server/helpers.js)
	// — the single source of truth both this deletion and the bin's audit/preview
	// UX read from; `prune` only deletes exactly what it reports.
	prune(target: string): MaterializeResult {
		this.#ensureAlive()
		const paths = pruneTargets(target, this.#host)
		const files = paths.map((path) => ({
			path,
			full: resolveContainedPath(target, path, 'WRITE', 'target'),
		}))
		const quarantine = resolveContainedPath(
			target,
			`.scaffold-prune-${randomUUID()}`,
			'WRITE',
			'target',
		)
		const moved: typeof files = []
		const staged = attempt(() => {
			for (const file of files) {
				const destination = join(quarantine, file.path)
				mkdirSync(dirname(destination), { recursive: true })
				renameSync(file.full, destination)
				moved.push(file)
			}
		})
		if (!staged.success) {
			const recovery = attempt(() =>
				restoreFiles(
					quarantine,
					target,
					moved.map((file) => file.path),
				),
			)
			const cleanup = recovery.success
				? attempt(() => rmSync(quarantine, { recursive: true, force: true }))
				: undefined
			throw new ScaffoldError('WRITE', 'Failed to stage prune targets', {
				target,
				error: staged.error,
				quarantine,
				committed: false,
				recovery: recovery.success ? undefined : recovery.error,
				cleanup: cleanup?.success === false ? cleanup.error : undefined,
			})
		}
		const removed = files.map((file) => file.path)
		const cleared = attempt(() => rmSync(quarantine, { recursive: true, force: true }))
		if (!cleared.success) {
			throw new ScaffoldError('WRITE', 'Prune committed with cleanup residue', {
				target,
				error: cleared.error,
				quarantine,
				committed: true,
				removed,
			})
		}
		for (const path of removed) this.#emitter.emit('remove', path)
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

	#copy(artifact: HostArtifact, target: string): void {
		const source = artifact.source ?? artifact.path
		const manifest = this.#manifest()
		if (manifest === undefined) {
			const from = resolveContainedPath(this.#host, source, 'TARGET', 'host')
			const to = resolveContainedPath(target, artifact.path, 'WRITE', 'target')
			try {
				const status = statSync(from)
				if (status.isDirectory()) {
					const files = listFiles(from)
					if (files.length === 0) mkdirSync(to, { recursive: true })
					for (const path of files) {
						const nestedSource = resolveContainedPath(
							this.#host,
							`${source}/${path}`,
							'TARGET',
							'host',
						)
						const nestedTarget = resolveContainedPath(
							target,
							`${artifact.path}/${path}`,
							'WRITE',
							'target',
						)
						mkdirSync(dirname(nestedTarget), { recursive: true })
						copyFileSync(nestedSource, nestedTarget)
					}
				} else {
					mkdirSync(dirname(to), { recursive: true })
					copyFileSync(from, to)
				}
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
		const entries = manifest.entries.filter(
			(entry) => entry.destination === source || entry.destination.startsWith(`${source}/`),
		)
		if (entries.length === 0) {
			if (!source.startsWith('guides/src/') || !source.endsWith('.md')) {
				// Not a dependency-guide pointer — every HOST_PATHS source is
				// always staged by `stageHost`, so a non-guide zero-match means a
				// corrupted or truncated manifest, not a legitimate degrade (see
				// the class doc comment). Fail closed.
				throw new ScaffoldError(
					'TARGET',
					`Manifest entry for "${source}" is missing — the vendored manifest may be corrupted or truncated`,
					{ target, source },
				)
			}
			// A dependency-guide pointer — degrade to a stub instead of throwing,
			// mirroring the read path's presence-only treatment of a
			// never-hydrated host artifact (see the class doc comment).
			const to = resolveContainedPath(target, artifact.path, 'WRITE', 'target')
			try {
				mkdirSync(dirname(to), { recursive: true })
				writeFileSync(to, Materializer.#stub(source), 'utf8')
			} catch (error) {
				this.#emitter.emit('error', error)
				throw new ScaffoldError('WRITE', `Failed to write host artifact stub at ${artifact.path}`, {
					path: artifact.path,
					error,
				})
			}
			this.#emitter.emit('copy', artifact.path)
			return
		}
		for (const entry of entries) {
			const from = resolveContainedPath(this.#host, entry.storage, 'TARGET', 'host')
			const to = resolveContainedPath(
				target,
				remapArtifactPath(artifact, entry.destination),
				'WRITE',
				'target',
			)
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
	#prepare(plan: Plan, target: string): void {
		if (!isPlan(plan)) {
			throw new ScaffoldError('INVALID', 'Materializer requires a valid Plan')
		}
		for (const artifact of plan.artifacts) {
			if (!isPortablePath(artifact.path)) {
				throw new ScaffoldError('WRITE', `Invalid artifact path at ${artifact.path}`, {
					path: artifact.path,
				})
			}
			if (artifact.source !== undefined && !isPortablePath(artifact.source)) {
				throw new ScaffoldError('TARGET', `Invalid artifact source at ${artifact.source}`, {
					source: artifact.source,
				})
			}
		}
		const hosted = plan.artifacts.some((artifact) => artifact.origin === 'host')
		const prepared = hosted ? hydratePlan(plan, this.#host) : plan
		const conflict = findFileConflict(prepared.artifacts.map((artifact) => artifact.path))
		if (conflict !== undefined) {
			throw new ScaffoldError(
				'INVALID',
				`Plan artifact collision between "${conflict[0]}" and "${conflict[1]}"`,
				{ paths: conflict },
			)
		}
		const manifest = hosted ? this.#manifest() : undefined
		for (const artifact of prepared.artifacts) {
			const destination = resolveContainedPath(target, artifact.path, 'WRITE', 'target')
			let parent = dirname(destination)
			while (!existsSync(parent)) {
				const ancestor = dirname(parent)
				if (ancestor === parent) break
				parent = ancestor
			}
			const parentStatus = attempt(() => statSync(parent))
			if (!parentStatus.success || !parentStatus.value.isDirectory()) {
				throw new ScaffoldError(
					'TARGET',
					`Artifact parent is not a directory at ${artifact.path}`,
					{
						path: artifact.path,
						parent,
						error: parentStatus.success ? undefined : parentStatus.error,
					},
				)
			}
			if (!existsSync(destination)) continue
			const destinationStatus = attempt(() => statSync(destination))
			if (!destinationStatus.success) {
				throw new ScaffoldError('TARGET', `Failed to inspect artifact target at ${artifact.path}`, {
					path: artifact.path,
					error: destinationStatus.error,
				})
			}
			let directory = false
			if (artifact.origin === 'host' && manifest === undefined && artifact.hex === undefined) {
				const source = artifact.source ?? artifact.path
				const sourcePath = resolveContainedPath(this.#host, source, 'TARGET', 'host')
				const sourceStatus = attempt(() => statSync(sourcePath))
				if (!sourceStatus.success) {
					throw new ScaffoldError('TARGET', `Failed to inspect host artifact at ${source}`, {
						source,
						error: sourceStatus.error,
					})
				}
				directory = sourceStatus.value.isDirectory()
			}
			if (destinationStatus.value.isDirectory() !== directory) {
				throw new ScaffoldError(
					'TARGET',
					`Artifact target has an incompatible shape at ${artifact.path}`,
					{
						path: artifact.path,
						directory,
					},
				)
			}
		}
	}

	#manifest(): HostManifest | undefined {
		if (!this.#manifestLoaded) {
			this.#manifestValue = readHostManifest(this.#host)
			this.#manifestLoaded = true
		}
		return this.#manifestValue
	}

	#write(artifact: ContentArtifact, target: string): void {
		const to = resolveContainedPath(target, artifact.path, 'WRITE', 'target')
		try {
			mkdirSync(dirname(to), { recursive: true })
			writeFileSync(to, artifact.content, 'utf8')
		} catch (error) {
			this.#emitter.emit('error', error)
			throw new ScaffoldError('WRITE', `Failed to write artifact at ${artifact.path}`, {
				path: artifact.path,
				error,
			})
		}
		this.#emitter.emit('write', artifact.path)
	}

	// A short, friendly stand-in for a not-yet-fetched dependency guide — the
	// scaffolded package's own guides-parity test (`tests/guides/src/
	// parity.test.ts`) only walks `guides/README.md`'s manifest (this
	// package's OWN concept), never a dependency's `guides/src/<dep>.md`
	// mirror, so no structural content is required here; `pull` (`Sync.write`)
	// overwrites this stub with the real bytes once fetched. `source` is
	// always a `guides/src/<dep>.md` pointer at this call site — the sole
	// caller (`#copy`'s zero-match branch) already scoped the degrade to it.
	static #stub(source: string): string {
		const short = source.slice('guides/src/'.length, source.length - '.md'.length)
		return `> Vendored guide for @orkestrel/${short} — run \`scaffold pull\` to fetch it.\n`
	}

	#ensureAlive(): void {
		if (this.#destroyed) throw new ScaffoldError('DESTROYED', 'Materializer has been destroyed')
	}
}
