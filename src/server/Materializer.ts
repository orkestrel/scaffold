import type {
	HostManifest,
	MaterializeResult,
	MaterializerEventMap,
	MaterializerInterface,
	MaterializerOptions,
	WritePrecondition,
} from './types.js'
import type { Audit, ContentArtifact, HostArtifact, Plan } from '@src/core'
import type { EmitterInterface } from '@orkestrel/emitter'
import {
	chmodSync,
	constants as FS_CONSTANTS,
	copyFileSync,
	existsSync,
	lstatSync,
	mkdirSync,
	renameSync,
	writeFileSync,
} from 'node:fs'
import { dirname } from 'node:path'
import { attempt } from '@orkestrel/contract'
import { Emitter } from '@orkestrel/emitter'
import {
	diffPlan,
	findFileConflict,
	hasOnlyDataProperties,
	hasValidAuditBytes,
	hasValidSnapshotBytes,
	parsePlan,
	ScaffoldError,
	validatePlan,
} from '@src/core'
import {
	hostRoot,
	hydratePlan,
	isVacant,
	pruneTargets,
	readTarget,
	readHostManifest,
	remapArtifactPath,
	commitWriteTransaction,
	digestFile,
	digestHex,
	digestText,
	discardWriteTransaction,
	guideStub,
	resolvePhysicalPath,
	restoreFiles,
	validateWriteDirectories,
	validateWriteTarget,
} from './helpers.js'
import { WriteTransaction } from './WriteTransaction.js'
import { isFilesystemPath, isPortablePath, isReservedTargetPath } from './validators.js'
import { parseMaterializerOptions } from './parsers.js'

/**
 * The materialization entity (server) — the only impure environment in the
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
 * audited and repaired file by file. `prune` deletes stale files under
 * `target/.claude/agents/`, `target/.codex/agents/`, and `target/scripts/`
 * that the vendored `host` does not name. After `destroy()`
 * every method throws `DESTROYED`; teardown is idempotent, emitter last.
 * Before the vacancy check or any write, `materialize` and `repair` require a
 * structural `isPlan` match and a valid `validatePlan` result. Contextual
 * overrides that are missing from the artifact set, host-owned, or target
 * `package.json` therefore fail closed instead of being silently ignored.
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
 * const plan = blueprintToPlan(blueprint('budget', { src: ['core'] }))
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
		const parsed = parseMaterializerOptions(options)
		this.#emitter = new Emitter<MaterializerEventMap>({
			...(parsed.on === undefined ? {} : { on: parsed.on }),
			...(parsed.error === undefined ? {} : { error: parsed.error }),
		})
		// The host IS this package's own vendored data unless `options.host`
		// overrides it — see `hostRoot`'s doc-comment for the resolution law.
		this.#host = parsed.host ?? hostRoot()
	}

	get emitter(): EmitterInterface<MaterializerEventMap> {
		return this.#emitter
	}

	materialize(plan: Plan, target: string): MaterializeResult {
		this.#ensureAlive()
		const prepared = this.#prepare(plan, target)
		if (!isVacant(target)) {
			throw new ScaffoldError('TARGET', 'materialize requires a vacant target', { target })
		}
		const { written, copied } = this.#apply(prepared, target)
		const result: MaterializeResult = { target, written, copied, skipped: [], removed: [] }
		this.#emitter.emit('done', result)
		return result
	}

	repair(plan: Plan, audit: Audit, target: string): MaterializeResult {
		this.#ensureAlive()
		const context = this.#prepare(plan, target, plan, false)
		if (!hasOnlyDataProperties(audit) || !hasValidAuditBytes(audit)) {
			throw new ScaffoldError('INVALID', 'repair requires a bounded audit snapshot')
		}
		const preview = attempt(() => structuredClone(audit))
		if (!preview.success || !Array.isArray(preview.value.findings)) {
			throw new ScaffoldError('INVALID', 'repair requires a structurally valid audit', {
				...(preview.success ? {} : { error: preview.error }),
			})
		}
		const drifted = new Set(
			preview.value.findings
				.filter((finding) => finding.drift === 'missing' || finding.drift === 'stale')
				.map((finding) => finding.path),
		)
		const selected = {
			...context,
			artifacts: context.artifacts.filter((artifact) => drifted.has(artifact.path)),
		}
		const prepared = this.#prepare(selected, target, context)
		const preparedByPath = new Map(prepared.artifacts.map((artifact) => [artifact.path, artifact]))
		const comparison = {
			...context,
			artifacts: context.artifacts.map((artifact) => preparedByPath.get(artifact.path) ?? artifact),
		}
		const current = diffPlan(
			comparison,
			readTarget(
				target,
				comparison.artifacts.map((artifact) => artifact.path),
			),
		)
		if (JSON.stringify(current.findings) !== JSON.stringify(preview.value.findings)) {
			throw new ScaffoldError('TARGET', 'Repair target changed after its audit preview', {
				target,
			})
		}
		const preconditions: WritePrecondition[] = prepared.artifacts.map((artifact) => {
			const finding = preview.value.findings.find((candidate) => candidate.path === artifact.path)
			if (finding?.drift === 'missing') return { path: artifact.path, shape: 'absent' }
			if (finding?.drift === 'stale' && finding.observed !== undefined) {
				return {
					path: artifact.path,
					shape: 'file',
					digest: digestHex(finding.observed),
				}
			}
			throw new ScaffoldError('INVALID', `Repair precondition is missing at ${artifact.path}`, {
				path: artifact.path,
			})
		})
		const skipped: string[] = []
		for (const artifact of context.artifacts) {
			if (!drifted.has(artifact.path)) {
				skipped.push(artifact.path)
			}
		}
		const { written, copied } = this.#apply(prepared, target, preconditions)
		const result: MaterializeResult = { target, written, copied, skipped, removed: [] }
		this.#emitter.emit('done', result)
		return result
	}

	// The unexpected-file scan itself lives in `pruneTargets` (server/helpers.js)
	// — the single source of truth both this deletion and the bin's audit/preview
	// UX read from; `prune` only deletes exactly what it reports.
	prune(target: string, expected: Readonly<Record<string, string>>): MaterializeResult {
		this.#ensureAlive()
		if (!isFilesystemPath(target)) {
			throw new ScaffoldError('TARGET', 'Prune target is malformed or exceeds its bounds', {
				target,
			})
		}
		const paths = pruneTargets(target, this.#host)
		if (!hasOnlyDataProperties(expected) || !hasValidSnapshotBytes(expected)) {
			throw new ScaffoldError('TARGET', 'Prune preview is malformed or unbounded', { target })
		}
		const preview = attempt(() => structuredClone(expected))
		const expectedPaths = preview.success ? Object.keys(preview.value).sort() : []
		if (
			!preview.success ||
			JSON.stringify(expectedPaths) !== JSON.stringify([...paths].sort()) ||
			JSON.stringify(readTarget(target, paths)) !== JSON.stringify(preview.value)
		) {
			throw new ScaffoldError('TARGET', 'Prune targets changed after their preview', {
				target,
				...(preview.success ? {} : { error: preview.error }),
			})
		}
		if (paths.length === 0) {
			const result: MaterializeResult = {
				target,
				written: [],
				copied: [],
				skipped: [],
				removed: [],
			}
			this.#emitter.emit('done', result)
			return result
		}
		const transaction = WriteTransaction.create(target, [])
		const files = paths.map((path) => {
			resolvePhysicalPath(target, path, 'WRITE', 'target')
			return { path }
		})
		const moved: typeof files = []
		const staged = attempt(() => {
			for (const file of files) {
				validateWriteTarget(transaction, undefined)
				const source = resolvePhysicalPath(target, file.path, 'WRITE', 'target')
				const sourceStatus = lstatSync(source)
				if (!sourceStatus.isFile() || sourceStatus.isSymbolicLink() || sourceStatus.nlink !== 1) {
					throw new ScaffoldError('WRITE', `Prune target is not a physical file at ${file.path}`, {
						path: file.path,
					})
				}
				const sourceDigest = digestFile(source)
				const expectedHex = preview.value[file.path]
				if (expectedHex === undefined || sourceDigest !== digestHex(expectedHex)) {
					throw new ScaffoldError('WRITE', `Prune target changed at ${file.path}`, {
						path: file.path,
					})
				}
				const destination = resolvePhysicalPath(
					transaction.backup,
					file.path,
					'WRITE',
					'quarantine',
				)
				mkdirSync(dirname(destination), { recursive: true })
				validateWriteTarget(transaction, undefined)
				const containedDestination = resolvePhysicalPath(
					transaction.backup,
					file.path,
					'WRITE',
					'quarantine',
				)
				renameSync(source, containedDestination)
				moved.push(file)
				const capturedStatus = lstatSync(containedDestination)
				const capturedDigest = digestFile(containedDestination)
				if (
					!capturedStatus.isFile() ||
					capturedStatus.isSymbolicLink() ||
					capturedStatus.nlink !== 1 ||
					capturedStatus.dev !== sourceStatus.dev ||
					capturedStatus.ino !== sourceStatus.ino ||
					capturedStatus.mtimeMs !== sourceStatus.mtimeMs ||
					capturedStatus.size !== sourceStatus.size ||
					capturedDigest !== sourceDigest
				) {
					throw new ScaffoldError('WRITE', `Prune target changed at ${file.path}`, {
						path: file.path,
					})
				}
			}
		})
		if (!staged.success) {
			const recovery = attempt(() =>
				restoreFiles(
					transaction,
					moved.map((file) => file.path),
				),
			)
			const cleanup = recovery.success
				? attempt(() => discardWriteTransaction(transaction))
				: undefined
			throw new ScaffoldError('WRITE', 'Failed to stage prune targets', {
				target,
				error: staged.error,
				quarantine: transaction.backup,
				committed: false,
				recovery: recovery.success ? undefined : recovery.error,
				cleanup: cleanup?.success === false ? cleanup.error : undefined,
			})
		}
		const removed = files.map((file) => file.path)
		const cleared = attempt(() => discardWriteTransaction(transaction))
		if (!cleared.success) {
			throw new ScaffoldError('WRITE', 'Prune committed with cleanup residue', {
				target,
				error: cleared.error,
				quarantine: transaction.backup,
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

	#apply(
		plan: Plan,
		target: string,
		preconditions?: readonly WritePrecondition[],
	): Pick<MaterializeResult, 'written' | 'copied'> {
		if (plan.artifacts.length === 0) return { written: [], copied: [] }
		const paths = plan.artifacts.map((artifact) => artifact.path)
		const transaction = WriteTransaction.create(target, paths, preconditions)
		const staged = attempt(() => {
			for (const artifact of plan.artifacts) {
				validateWriteDirectories(transaction)
				if (artifact.origin === 'host') this.#copy(artifact, transaction)
				else this.#write(artifact, transaction)
			}
		})
		if (!staged.success) {
			const cleanup = attempt(() => discardWriteTransaction(transaction))
			this.#emitter.emit('error', staged.error)
			throw new ScaffoldError('WRITE', 'Failed to stage materialization', {
				target,
				error: staged.error,
				cleanup: cleanup.success ? undefined : cleanup.error,
			})
		}
		const committed = attempt(() => commitWriteTransaction(transaction, paths))
		if (!committed.success) {
			this.#emitter.emit('error', committed.error)
			throw committed.error
		}
		const written = plan.artifacts
			.filter((artifact) => artifact.origin !== 'host')
			.map((artifact) => artifact.path)
		const copied = plan.artifacts
			.filter((artifact) => artifact.origin === 'host')
			.map((artifact) => artifact.path)
		for (const path of written) this.#emitter.emit('write', path)
		for (const path of copied) this.#emitter.emit('copy', path)
		return { written, copied }
	}

	#copy(artifact: HostArtifact, transaction: WriteTransaction): void {
		const source = artifact.source ?? artifact.path
		const manifest = this.#manifest()
		const entries =
			manifest?.entries.filter(
				(entry) => entry.destination === source || entry.destination.startsWith(`${source}/`),
			) ?? []
		if (manifest !== undefined && entries.length === 0) {
			if (!source.startsWith('guides/src/') || !source.endsWith('.md')) {
				// Not a dependency-guide pointer — every HOST_PATHS source is
				// always staged by `stageHost`, so a non-guide zero-match means a
				// corrupted or truncated manifest, not a legitimate degrade (see
				// the class doc comment). Fail closed.
				throw new ScaffoldError(
					'TARGET',
					`Manifest entry for "${source}" is missing — the vendored manifest may be corrupted or truncated`,
					{ target: transaction.stage, source },
				)
			}
			// A dependency-guide pointer — degrade to a stub instead of throwing,
			// mirroring the read path's presence-only treatment of a
			// never-hydrated host artifact (see the class doc comment).
			const to = resolvePhysicalPath(transaction.stage, artifact.path, 'WRITE', 'staging')
			try {
				mkdirSync(dirname(to), { recursive: true })
				validateWriteDirectories(transaction)
				const destination = resolvePhysicalPath(
					transaction.stage,
					artifact.path,
					'WRITE',
					'staging',
				)
				const content = guideStub(source)
				writeFileSync(destination, content, { encoding: 'utf8', flag: 'wx' })
				const status = lstatSync(destination)
				if (
					!status.isFile() ||
					status.isSymbolicLink() ||
					status.nlink !== 1 ||
					digestFile(destination) !== digestText(content)
				) {
					throw new Error(`staged guide pointer changed at ${artifact.path}`)
				}
				validateWriteDirectories(transaction)
			} catch (error) {
				throw new ScaffoldError('WRITE', `Failed to write host artifact stub at ${artifact.path}`, {
					path: artifact.path,
					error,
				})
			}
			return
		}
		if (manifest === undefined && artifact.hex === undefined) {
			const directory = resolvePhysicalPath(this.#host, source, 'TARGET', 'host')
			const status = lstatSync(directory)
			if (!status.isDirectory() || status.isSymbolicLink()) {
				throw new ScaffoldError(
					'TARGET',
					`Host artifact is not a physical directory at ${source}`,
					{
						source,
					},
				)
			}
			const destination = resolvePhysicalPath(transaction.stage, artifact.path, 'WRITE', 'staging')
			mkdirSync(destination, { recursive: true })
			validateWriteDirectories(transaction)
			const staged = lstatSync(destination)
			if (!staged.isDirectory() || staged.isSymbolicLink()) {
				throw new ScaffoldError('WRITE', `Staged host directory changed at ${artifact.path}`, {
					path: artifact.path,
				})
			}
			return
		}
		const entry = entries[0]
		const sourcePath = entry === undefined ? source : entry.storage
		const destinationPath =
			entry === undefined ? artifact.path : remapArtifactPath(artifact, entry.destination)
		const expected = artifact.hex
		if (expected === undefined) {
			throw new ScaffoldError('TARGET', `Host artifact has no byte snapshot at ${source}`, {
				source,
			})
		}
		const from = resolvePhysicalPath(this.#host, sourcePath, 'TARGET', 'host')
		const sourceStatus = lstatSync(from)
		if (
			!sourceStatus.isFile() ||
			sourceStatus.isSymbolicLink() ||
			sourceStatus.nlink !== 1 ||
			digestFile(from) !== digestHex(expected)
		) {
			throw new ScaffoldError('TARGET', `Host artifact changed at ${source}`, { source })
		}
		const to = resolvePhysicalPath(transaction.stage, destinationPath, 'WRITE', 'staging')
		try {
			mkdirSync(dirname(to), { recursive: true })
			validateWriteDirectories(transaction)
			const destination = resolvePhysicalPath(
				transaction.stage,
				destinationPath,
				'WRITE',
				'staging',
			)
			copyFileSync(from, destination, FS_CONSTANTS.COPYFILE_EXCL)
			if (entry?.executable === true) chmodSync(destination, 0o755)
			const copied = lstatSync(destination)
			if (
				!copied.isFile() ||
				copied.isSymbolicLink() ||
				copied.nlink !== 1 ||
				digestFile(destination) !== digestHex(expected)
			) {
				throw new Error(`staged host artifact changed at ${artifact.path}`)
			}
			validateWriteDirectories(transaction)
		} catch (error) {
			throw new ScaffoldError('WRITE', `Failed to copy host artifact at ${artifact.path}`, {
				path: artifact.path,
				error,
			})
		}
	}

	// Lazily load + cache `host`'s `manifest.json` (once per instance) —
	// `undefined` means `host` has no manifest and callers fall back to the
	// 1:1 raw-root mapping.
	#prepare(plan: Plan, target: string, context: Plan = plan, hydrate = true): Plan {
		if (!isFilesystemPath(target)) {
			throw new ScaffoldError('TARGET', 'Materializer target is malformed or exceeds its bounds', {
				target,
			})
		}
		if (!hasOnlyDataProperties(plan)) {
			throw new ScaffoldError('INVALID', 'Materializer requires a data-only Plan')
		}
		const snapshot = attempt(() => structuredClone(plan))
		const parsed = snapshot.success ? parsePlan(snapshot.value) : undefined
		if (parsed === undefined) {
			throw new ScaffoldError('INVALID', 'Materializer requires a valid Plan', {
				...(snapshot.success ? {} : { error: snapshot.error }),
			})
		}
		const contextSnapshot =
			context === plan
				? snapshot
				: hasOnlyDataProperties(context)
					? attempt(() => structuredClone(context))
					: undefined
		const parsedContext =
			context === plan
				? parsed
				: contextSnapshot?.success === true
					? parsePlan(contextSnapshot.value)
					: undefined
		if (parsedContext === undefined) {
			throw new ScaffoldError('INVALID', 'Materializer requires a valid contextual Plan', {
				...(contextSnapshot?.success === false ? { error: contextSnapshot.error } : {}),
			})
		}
		const validation = validatePlan(parsedContext)
		if (!validation.valid) {
			throw new ScaffoldError(
				'INVALID',
				'Materializer requires a semantically and contextually valid Plan',
				{ questions: validation.questions },
			)
		}
		for (const artifact of parsed.artifacts) {
			if (!isPortablePath(artifact.path)) {
				throw new ScaffoldError('WRITE', `Invalid artifact path at ${artifact.path}`, {
					path: artifact.path,
				})
			}
			if (isReservedTargetPath(artifact.path)) {
				throw new ScaffoldError(
					'WRITE',
					`Artifact path targets reserved repository metadata at ${artifact.path}`,
					{ path: artifact.path },
				)
			}
			if (artifact.source !== undefined && !isPortablePath(artifact.source)) {
				throw new ScaffoldError('TARGET', `Invalid artifact source at ${artifact.source}`, {
					source: artifact.source,
				})
			}
		}
		const hosted = parsed.artifacts.some((artifact) => artifact.origin === 'host')
		const prepared = hydrate && hosted ? hydratePlan(parsed, this.#host) : parsed
		const conflict = findFileConflict(prepared.artifacts.map((artifact) => artifact.path))
		if (conflict !== undefined) {
			throw new ScaffoldError(
				'INVALID',
				`Plan artifact collision between "${conflict[0]}" and "${conflict[1]}"`,
				{ paths: conflict },
			)
		}
		if (!hydrate) return prepared
		const manifest = hosted ? this.#manifest() : undefined
		for (const artifact of prepared.artifacts) {
			const destination = resolvePhysicalPath(target, artifact.path, 'WRITE', 'target')
			if (!existsSync(destination)) continue
			const destinationStatus = attempt(() => lstatSync(destination))
			if (!destinationStatus.success) {
				throw new ScaffoldError('TARGET', `Failed to inspect artifact target at ${artifact.path}`, {
					path: artifact.path,
					error: destinationStatus.error,
				})
			}
			if (
				destinationStatus.value.isSymbolicLink() ||
				(destinationStatus.value.isFile() && destinationStatus.value.nlink !== 1)
			) {
				throw new ScaffoldError('TARGET', `Artifact target is linked at ${artifact.path}`, {
					path: artifact.path,
				})
			}
			let directory = false
			if (artifact.origin === 'host' && manifest === undefined && artifact.hex === undefined) {
				const source = artifact.source ?? artifact.path
				const sourcePath = resolvePhysicalPath(this.#host, source, 'TARGET', 'host')
				const sourceStatus = attempt(() => lstatSync(sourcePath))
				if (!sourceStatus.success) {
					throw new ScaffoldError('TARGET', `Failed to inspect host artifact at ${source}`, {
						source,
						error: sourceStatus.error,
					})
				}
				directory = sourceStatus.value.isDirectory() && !sourceStatus.value.isSymbolicLink()
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
		return prepared
	}

	#manifest(): HostManifest | undefined {
		if (!this.#manifestLoaded) {
			this.#manifestValue = readHostManifest(this.#host)
			this.#manifestLoaded = true
		}
		return this.#manifestValue
	}

	#write(artifact: ContentArtifact, transaction: WriteTransaction): void {
		const to = resolvePhysicalPath(transaction.stage, artifact.path, 'WRITE', 'staging')
		try {
			mkdirSync(dirname(to), { recursive: true })
			validateWriteDirectories(transaction)
			const destination = resolvePhysicalPath(transaction.stage, artifact.path, 'WRITE', 'staging')
			writeFileSync(destination, artifact.content, { encoding: 'utf8', flag: 'wx' })
			const status = lstatSync(destination)
			if (
				!status.isFile() ||
				status.isSymbolicLink() ||
				status.nlink !== 1 ||
				digestFile(destination) !== digestText(artifact.content)
			) {
				throw new Error(`staged artifact changed at ${artifact.path}`)
			}
			validateWriteDirectories(transaction)
		} catch (error) {
			throw new ScaffoldError('WRITE', `Failed to write artifact at ${artifact.path}`, {
				path: artifact.path,
				error,
			})
		}
	}

	#ensureAlive(): void {
		if (this.#destroyed) throw new ScaffoldError('DESTROYED', 'Materializer has been destroyed')
	}
}
