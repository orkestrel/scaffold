import type {
	Artifact,
	Blueprint,
	CatalogEntry,
	Dependency,
	GuideSync,
	HostArtifact,
	Override,
	Plan,
	ScaffoldErrorCode,
	Snapshot,
	SyncReport,
	VersionSync,
} from '@src/core'
import type { BlockquoteNode } from '@orkestrel/markdown'
import type {
	CatalogAllowance,
	GuideWrite,
	HostManifest,
	ManifestEntry,
	WriteAnchor,
	WriteDirectoryResult,
	WriteExpectation,
} from './types.js'
import { createHash, randomUUID } from 'node:crypto'
import {
	closeSync,
	constants as FS_CONSTANTS,
	copyFileSync,
	existsSync,
	fstatSync,
	linkSync,
	lstatSync,
	mkdirSync,
	openSync,
	opendirSync,
	readSync,
	realpathSync,
	renameSync,
	rmdirSync,
	rmSync,
	writeFileSync,
} from 'node:fs'
import { basename, dirname, join, relative as relativeOf, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { attempt, isRecord, parseJSON, parseJSONAs } from '@orkestrel/contract'
import {
	flattenText,
	isBlockquoteNode,
	isParagraphNode,
	parseDocument,
	walkNodes,
} from '@orkestrel/markdown'
import {
	blueprint,
	bytesToHex,
	contentByteLength,
	DEFAULT_ENGINES,
	DEFAULT_VERSION,
	DEPENDENCY_NAME_PATTERN,
	devDependenciesFor,
	findFileConflict,
	findPathConflict,
	HOST_PATHS,
	HEX_PATTERN,
	isWorkspaceName,
	MAX_ARTIFACT_BYTES,
	MAX_ARTIFACT_HEX_LENGTH,
	MAX_COLLECTION_ITEMS,
	MAX_MANIFEST_BYTES,
	MAX_TOTAL_ARTIFACT_BYTES,
	isPlan,
	ownDataValue,
	override,
	ScaffoldError,
	snapshotPlan,
	ENVIRONMENTS,
	VERSION_PATTERN,
} from '@src/core'
import {
	HOST_MANIFEST_PATH,
	MAX_FILESYSTEM_DEPTH,
	MAX_GUIDE_BYTES,
	MAX_HOST_DEPTH,
	MAX_HOST_ENTRIES,
	PRUNE_DIRECTORIES,
} from './constants.js'
import {
	isHostManifest,
	isCatalogDescription,
	isCatalogAllowance,
	isFilesystemPath,
	isMissingPathError,
	isPortablePath,
	isSensitiveHostPath,
	isTerminalText,
} from './validators.js'
import { parseFilesystemPaths, parsePortablePaths } from './parsers.js'
import { WriteTransaction } from './WriteTransaction.js'

/**
 * Whether a path is an existing physical directory rather than a file or link.
 *
 * @param path - The filesystem path to inspect without following links.
 * @returns `true` only for a successful `lstat` reporting a directory.
 */
export function isRealDirectory(path: string): boolean {
	const status = attempt(() => lstatSync(path).isDirectory())
	return status.success && status.value
}

/**
 * Compute a bounded-memory SHA-256 digest for one file.
 *
 * @param path - The file to read.
 * @returns Its lowercase SHA-256 digest.
 */
export function digestFile(path: string): string {
	const initial = lstatSync(path)
	if (!initial.isFile() || initial.isSymbolicLink() || initial.nlink !== 1) {
		throw new Error(`Digest source is not a physical file at ${path}`)
	}
	if (initial.size > MAX_ARTIFACT_BYTES) {
		throw new Error(`Digest source exceeds ${MAX_ARTIFACT_BYTES} bytes at ${path}`)
	}
	const handle = openSync(path, 'r')
	const hash = createHash('sha256')
	const buffer = Buffer.allocUnsafe(65_536)
	const read = attempt(() => {
		const current = fstatSync(handle)
		if (
			!current.isFile() ||
			current.nlink !== 1 ||
			current.dev !== initial.dev ||
			current.ino !== initial.ino
		) {
			throw new Error(`Digest source changed before reading at ${path}`)
		}
		let size = 0
		for (;;) {
			const length = readSync(handle, buffer, 0, buffer.byteLength, null)
			if (length === 0) break
			size += length
			if (size > MAX_ARTIFACT_BYTES) {
				throw new Error(`Digest source exceeds ${MAX_ARTIFACT_BYTES} bytes at ${path}`)
			}
			hash.update(buffer.subarray(0, length))
		}
		const after = fstatSync(handle)
		const pathStatus = lstatSync(path)
		if (
			size !== current.size ||
			after.dev !== current.dev ||
			after.ino !== current.ino ||
			after.mtimeMs !== current.mtimeMs ||
			after.size !== current.size ||
			!pathStatus.isFile() ||
			pathStatus.isSymbolicLink() ||
			pathStatus.nlink !== 1 ||
			pathStatus.dev !== current.dev ||
			pathStatus.ino !== current.ino
		) {
			throw new Error(`Digest source changed while reading at ${path}`)
		}
		return hash.digest('hex')
	})
	const closed = attempt(() => closeSync(handle))
	if (!read.success) throw read.error
	if (!closed.success) throw closed.error
	return read.value
}

/**
 * Compute SHA-256 from exact lowercase hexadecimal bytes without decoding the whole value at once.
 *
 * @param hex - Exact hexadecimal bytes.
 * @returns Their lowercase SHA-256 digest.
 */
export function digestHex(hex: string): string {
	if (hex.length > MAX_ARTIFACT_HEX_LENGTH || !HEX_PATTERN.test(hex)) {
		throw new Error('Digest input is not bounded exact hexadecimal bytes')
	}
	const hash = createHash('sha256')
	for (let offset = 0; offset < hex.length; offset += 131_072) {
		hash.update(Buffer.from(hex.slice(offset, offset + 131_072), 'hex'))
	}
	return hash.digest('hex')
}

/**
 * Compute SHA-256 from UTF-8 text.
 *
 * @param value - The text to hash.
 * @returns Its lowercase SHA-256 digest.
 */
export function digestText(value: string): string {
	return createHash('sha256').update(value, 'utf8').digest('hex')
}

/**
 * Render the local pointer written when an upstream dependency guide is not vendored yet.
 *
 * @param source - The canonical `guides/src/<name>.md` source path.
 * @returns The deterministic pointer content.
 */
export function guideStub(source: string): string {
	const short = source.slice('guides/src/'.length, source.length - '.md'.length)
	return `> Vendored guide for @orkestrel/${short} — run \`scaffold pull\` to fetch it.\n`
}

/**
 * Remove the canonical Orkestrel scope from a dependency name.
 *
 * @param name - A dependency name.
 * @returns Its unscoped member when canonical, otherwise the original name.
 */
export function packageShortName(name: string): string {
	const prefix = '@orkestrel/'
	return name.startsWith(prefix) ? name.slice(prefix.length) : name
}

/**
 * Read bounded physical local guide mirrors for declared dependencies.
 *
 * @param target - The package root.
 * @param dependencies - The declared dependencies whose mirrors are eligible.
 * @returns Existing guide content keyed by dependency name.
 */
export function readGuideReferences(
	target: string,
	dependencies: readonly Dependency[],
): Readonly<Record<string, string>> {
	const current: Record<string, string> = {}
	for (const dependency of dependencies) {
		const path = `guides/src/${packageShortName(dependency.name)}.md`
		const full = resolvePhysicalPath(target, path, 'TARGET', 'target')
		const status = attempt(() => lstatSync(full))
		if (!status.success) {
			if (isMissingPathError(status.error)) continue
			throw new ScaffoldError('TARGET', `Failed to inspect local guide at ${path}`, {
				path,
				error: status.error,
			})
		}
		if (!status.value.isFile() || status.value.isSymbolicLink() || status.value.nlink !== 1) {
			throw new ScaffoldError('TARGET', `Local guide is not a physical file at ${path}`, {
				path,
			})
		}
		current[dependency.name] = readFileText(target, path, 'TARGET', 'target')
	}
	return Object.freeze(current)
}

/**
 * Assemble one synchronization report from already ordered guide and version outcomes.
 *
 * @param target - The target package root.
 * @param guides - Guide outcomes.
 * @param versions - Version outcomes.
 * @returns The derived whole report.
 */
export function syncReportOf(
	target: string,
	guides: readonly GuideSync[],
	versions: readonly VersionSync[],
): SyncReport {
	const failed = [...guides, ...versions].filter(
		(entry) => entry.freshness === 'missing' || entry.freshness === 'failed',
	).length
	const clean =
		failed === 0 &&
		guides.every((guide) => guide.freshness === 'current') &&
		versions.every((version) => version.freshness === 'current')
	return { target, guides, versions, clean, failed }
}

// ============================================================================
//  @orkestrel/scaffold/server — helpers.ts (AGENTS §5 source of truth). The
//  server-only helpers `blueprintToPlan`'s green-field target law, the
//  `diffPlan`-feeding target reader, `Sync`'s manifest reader, the
//  `Materializer`'s vendored-host manifest, the vendored-host BUILD staging
//  primitive (`stageHost`), and the
//  `catalog` bin verb depend on: `isVacant`, `readTarget`, `readManifest`,
//  `readHostManifest`, `readFileHex`, `listFiles`, `hydratePlan`,
//  `discoverPackages`, `hostRoot`, `deriveBlueprint`, and `catalogPackages`.
//  `selectOrkestrelEntries`, `locateHostSource`, and
//  `storagePath` are exported module-scope helpers per AGENTS §5's
//  no-nested-functions law — single-call-site status is not an exemption.
// ============================================================================

/**
 * Locate this MODULE's own installed package root — the nearest ancestor of
 * `import.meta.url` holding a `package.json` — and return its vendored
 * `dist/host` data root. THE single source of truth for the default
 * `Materializer` / `scaffold` bin host: once installed, walking up from the
 * module's own file (not `process.cwd()`, which points at whichever project
 * happens to be running) resolves to `node_modules/@orkestrel/scaffold`, the
 * correct default host — the package ships its vendored data with itself.
 * `dist/host` may not exist yet when this resolves from SOURCE under a test
 * runner; that is fine — existence is checked at the point of use, not here.
 *
 * @returns The absolute vendored `dist/host` path.
 * @throws `ScaffoldError('TARGET', …)` when no ancestor of this module's own
 *   location holds a `package.json`.
 *
 * @example
 * ```ts
 * import { hostRoot } from '@orkestrel/scaffold/server'
 *
 * hostRoot() // '/…/node_modules/@orkestrel/scaffold/dist/host'
 * ```
 */
export function hostRoot(): string {
	let dir = dirname(fileURLToPath(import.meta.url))
	for (;;) {
		if (existsSync(join(dir, 'package.json'))) return join(dir, 'dist', 'host')
		const parent = dirname(dir)
		if (parent === dir) {
			throw new ScaffoldError('TARGET', 'No package root found above the module location', {
				module: import.meta.url,
			})
		}
		dir = parent
	}
}

/**
 * Resolve the deepest existing ancestor of a path through the real filesystem.
 *
 * @param path - The absolute or relative path to resolve.
 * @returns A path whose existing prefix has been resolved through symlinks.
 */
export function resolveRealPath(path: string): string {
	if (!isFilesystemPath(path)) {
		throw new ScaffoldError('TARGET', 'Filesystem path is malformed or exceeds its bounds')
	}
	let current = resolve(path)
	const unresolved: string[] = []
	while (!existsSync(current)) {
		const parent = dirname(current)
		if (parent === current || unresolved.length >= MAX_FILESYSTEM_DEPTH) {
			throw new ScaffoldError('TARGET', 'Filesystem path has no bounded existing ancestor', {
				path,
				limit: MAX_FILESYSTEM_DEPTH,
			})
		}
		unresolved.unshift(relativeOf(parent, current))
		current = parent
	}
	let physical = realpathSync(current)
	for (const segment of unresolved) physical = join(physical, segment)
	return physical
}

/**
 * Resolve a path beneath a declared root and reject lexical or symlink escape.
 *
 * @param root - The containing filesystem root.
 * @param path - The candidate path, relative or absolute.
 * @param code - The coded error to raise on escape.
 * @param boundary - The boundary name used in diagnostics.
 * @returns The lexically resolved candidate after realpath-aware validation.
 */
export function resolveContainedPath(
	root: string,
	path: string,
	code: ScaffoldErrorCode,
	boundary: string,
): string {
	if (!isFilesystemPath(root) || !isFilesystemPath(path)) {
		throw new ScaffoldError(code, `${boundary} path is malformed or exceeds its bounds`, {
			path,
			root,
		})
	}
	const resolvedRoot = resolveRealPath(resolve(root))
	const resolvedCandidate = resolveRealPath(resolve(root, path))
	if (resolvedCandidate !== resolvedRoot && !resolvedCandidate.startsWith(resolvedRoot + sep)) {
		throw new ScaffoldError(code, `Path "${path}" escapes the ${boundary} root`, {
			path,
			root,
		})
	}
	return resolve(root, path)
}

/**
 * Resolve a contained path whose existing ancestor chain contains no links.
 *
 * @param root - The trusted lexical and physical root.
 * @param path - The portable root-relative path.
 * @param code - The coded error to raise on failure.
 * @param boundary - The boundary name used in diagnostics.
 * @returns The contained destination.
 * @throws `ScaffoldError` when containment fails or an ancestor is not a real directory.
 */
export function resolvePhysicalPath(
	root: string,
	path: string,
	code: ScaffoldErrorCode,
	boundary: string,
): string {
	const resolvedRoot = resolve(root)
	const destination = resolveContainedPath(resolvedRoot, path, code, boundary)
	if (destination === resolvedRoot) {
		const status = attempt(() => lstatSync(resolvedRoot))
		if (!status.success || !status.value.isDirectory() || status.value.isSymbolicLink()) {
			throw new ScaffoldError(code, `${boundary} root is not a real directory`, {
				path,
				root,
				...(status.success ? {} : { error: status.error }),
			})
		}
		return destination
	}
	let parent = dirname(destination)
	for (;;) {
		if (existsSync(parent)) {
			const status = attempt(() => lstatSync(parent))
			if (!status.success || !status.value.isDirectory() || status.value.isSymbolicLink()) {
				throw new ScaffoldError(code, `${boundary} parent is not a real directory`, {
					path,
					parent,
					...(status.success ? {} : { error: status.error }),
				})
			}
		}
		if (parent === resolvedRoot) break
		const next = dirname(parent)
		if (next === parent) {
			throw new ScaffoldError(code, `${boundary} parent escapes its root`, {
				path,
				root,
			})
		}
		parent = next
	}
	return destination
}

/**
 * Revalidate one captured physical-directory identity without following links.
 *
 * @param anchor - The captured path, device, and inode.
 * @param boundary - The boundary name used in diagnostics.
 * @throws `ScaffoldError('WRITE', ...)` when the directory is missing or changed.
 */
export function validateWriteAnchor(anchor: WriteAnchor, boundary: string): void {
	const status = attempt(() => lstatSync(anchor.path))
	if (
		!status.success ||
		!status.value.isDirectory() ||
		status.value.isSymbolicLink() ||
		status.value.dev !== anchor.device ||
		status.value.ino !== anchor.inode
	) {
		throw new ScaffoldError('WRITE', `Write transaction ${boundary} changed`, {
			path: anchor.path,
			...(status.success ? {} : { error: status.error }),
		})
	}
}

/**
 * Create a physical directory path one segment at a time behind captured identities.
 *
 * @param path - The absolute directory path to establish.
 * @param boundary - The boundary name used in diagnostics.
 * @returns The final directory anchor and the subset created by this call.
 */
export function createWriteDirectory(path: string, boundary: string): WriteDirectoryResult {
	const destination = resolve(path)
	const missing: string[] = []
	let current = destination
	let existing: WriteAnchor | undefined
	for (;;) {
		const status = attempt(() => lstatSync(current))
		if (status.success) {
			if (!status.value.isDirectory() || status.value.isSymbolicLink()) {
				throw new ScaffoldError('WRITE', `${boundary} is not a physical directory`, {
					path: current,
				})
			}
			existing = Object.freeze({
				path: current,
				device: status.value.dev,
				inode: status.value.ino,
			})
			break
		}
		if (!isMissingPathError(status.error)) {
			throw new ScaffoldError('WRITE', `Failed to inspect ${boundary}`, {
				path: current,
				error: status.error,
			})
		}
		missing.push(current)
		const parent = dirname(current)
		if (parent === current) {
			throw new ScaffoldError('WRITE', `Cannot establish ${boundary}`, { path: destination })
		}
		current = parent
	}
	const created: WriteAnchor[] = []
	let anchor = existing
	for (const directory of [...missing].reverse()) {
		validateWriteAnchor(anchor, boundary)
		mkdirSync(directory)
		validateWriteAnchor(anchor, boundary)
		const status = lstatSync(directory)
		if (!status.isDirectory() || status.isSymbolicLink()) {
			throw new ScaffoldError('WRITE', `${boundary} changed while creating it`, {
				path: directory,
			})
		}
		anchor = Object.freeze({
			path: directory,
			device: status.dev,
			inode: status.ino,
		})
		created.push(anchor)
	}
	return { anchor, created }
}

/**
 * Revalidate every private directory owned by a write transaction.
 *
 * @param transaction - The nominal transaction state.
 * @throws `ScaffoldError('WRITE', ...)` when any private directory changed.
 */
export function validateWriteDirectories(transaction: WriteTransaction): void {
	validateWriteAnchor(transaction.anchor, 'anchor')
	for (const parent of transaction.parents) validateWriteAnchor(parent, 'parent')
	for (const directory of transaction.directories) {
		validateWriteAnchor(directory, 'private directory')
	}
}

/**
 * Revalidate the transaction target against its original or transaction-owned identity.
 *
 * @param transaction - The nominal transaction state.
 * @param owned - A target directory created by the current commit.
 * @throws `ScaffoldError('WRITE', ...)` when the target identity changed.
 */
export function validateWriteTarget(
	transaction: WriteTransaction,
	owned: WriteAnchor | undefined,
): void {
	validateWriteDirectories(transaction)
	const expected = transaction.existing ?? owned
	const status = attempt(() => lstatSync(transaction.target))
	if (expected === undefined) {
		if (status.success || !isMissingPathError(status.error)) {
			throw new ScaffoldError('WRITE', 'Write transaction target changed', {
				target: transaction.target,
				...(status.success ? {} : { error: status.error }),
			})
		}
		return
	}
	if (
		!status.success ||
		!status.value.isDirectory() ||
		status.value.isSymbolicLink() ||
		status.value.dev !== expected.device ||
		status.value.ino !== expected.inode
	) {
		throw new ScaffoldError('WRITE', 'Write transaction target changed', {
			target: transaction.target,
			...(status.success ? {} : { error: status.error }),
		})
	}
}

/**
 * Remove an uncommitted or already-committed write transaction's private residue.
 *
 * @param transaction - The transaction to discard.
 * @throws `ScaffoldError('WRITE', ...)` when its private root cannot be removed.
 */
export function discardWriteTransaction(transaction: WriteTransaction): void {
	if (!(transaction instanceof WriteTransaction)) {
		throw new ScaffoldError('WRITE', 'Write transaction identity is invalid')
	}
	validateWriteDirectories(transaction)
	const discarded = attempt(() => rmSync(transaction.root, { recursive: true }))
	if (!discarded.success) {
		throw new ScaffoldError('WRITE', 'Failed to discard write transaction', {
			target: transaction.target,
			root: transaction.root,
			error: discarded.error,
		})
	}
	for (const parent of [...transaction.parents].reverse()) {
		const removed = attempt(() => {
			const status = lstatSync(parent.path)
			if (
				!status.isDirectory() ||
				status.isSymbolicLink() ||
				status.dev !== parent.device ||
				status.ino !== parent.inode
			) {
				throw new Error(`write transaction parent changed at ${parent.path}`)
			}
			rmdirSync(parent.path)
		})
		if (!removed.success && !isMissingPathError(removed.error)) {
			throw new ScaffoldError('WRITE', 'Failed to discard write transaction parent', {
				target: transaction.target,
				root: transaction.root,
				parent: parent.path,
				error: removed.error,
			})
		}
	}
}

/**
 * Promote a complete staged set and roll every earlier destination back when
 * any later promotion fails.
 *
 * @param transaction - Same-volume sibling staging state.
 * @param paths - Portable target-relative files to promote.
 * @throws `ScaffoldError('WRITE', ...)` with recovery details on failure.
 */
export function commitWriteTransaction(
	transaction: WriteTransaction,
	paths: readonly string[],
): void {
	if (!(transaction instanceof WriteTransaction)) {
		throw new ScaffoldError('WRITE', 'Write transaction identity is invalid')
	}
	const requested = parsePortablePaths(paths, MAX_COLLECTION_ITEMS)
	const conflict = requested === undefined ? undefined : findFileConflict(requested)
	if (
		requested === undefined ||
		conflict !== undefined ||
		requested.length !== transaction.expectations.length ||
		requested.some(
			(path) => !transaction.expectations.some((expectation) => expectation.path === path),
		) ||
		transaction.expectations.some(
			(expectation) => !requested.some((path) => path === expectation.path),
		)
	) {
		discardWriteTransaction(transaction)
		throw new ScaffoldError(
			'WRITE',
			requested !== undefined && conflict === undefined
				? 'Write transaction paths do not match its expectations'
				: requested !== undefined
					? `Write transaction collision between "${conflict?.[0]}" and "${conflict?.[1]}"`
					: 'Write transaction paths are malformed',
			{
				paths: conflict ?? requested ?? [],
				committed: false,
			},
		)
	}
	const preflight = attempt(() => {
		validateWriteTarget(transaction, undefined)
		validateWriteDirectories(transaction)
		for (const path of requested) {
			if (!isPortablePath(path)) {
				throw new ScaffoldError('WRITE', `Invalid transaction path at ${path}`, { path })
			}
			const expectation = transaction.expectations.find((candidate) => candidate.path === path)
			if (expectation === undefined) {
				throw new ScaffoldError('WRITE', `Missing transaction expectation at ${path}`, { path })
			}
			const staged = resolvePhysicalPath(transaction.stage, path, 'WRITE', 'staging')
			const stagedStatus = attempt(() => lstatSync(staged))
			if (
				!stagedStatus.success ||
				stagedStatus.value.isSymbolicLink() ||
				!stagedStatus.value.isFile() ||
				stagedStatus.value.nlink !== 1
			) {
				throw new ScaffoldError('WRITE', `Invalid staged transaction entry at ${path}`, {
					path,
					error: stagedStatus.success ? undefined : stagedStatus.error,
				})
			}
			const destination = resolvePhysicalPath(transaction.target, path, 'WRITE', 'target')
			const current = attempt(() => lstatSync(destination))
			if (expectation.shape === 'absent') {
				if (current.success || !isMissingPathError(current.error)) {
					throw new ScaffoldError('WRITE', `Transaction destination changed at ${path}`, {
						path,
						error: current.success ? undefined : current.error,
					})
				}
				continue
			}
			if (!current.success) {
				throw new ScaffoldError('WRITE', `Transaction destination changed at ${path}`, {
					path,
					error: current.error,
				})
			}
			const shape = current.value.isDirectory() ? 'directory' : 'file'
			const content = shape === 'file' ? attempt(() => digestFile(destination)) : undefined
			if (
				current.value.isSymbolicLink() ||
				(current.value.isFile() && current.value.nlink !== 1) ||
				current.value.isDirectory() !== stagedStatus.value.isDirectory() ||
				current.value.isDirectory() ||
				shape !== expectation.shape ||
				current.value.dev !== expectation.device ||
				current.value.ino !== expectation.inode ||
				current.value.mtimeMs !== expectation.modified ||
				current.value.size !== expectation.size ||
				(content !== undefined && (!content.success || content.value !== expectation.digest))
			) {
				throw new ScaffoldError('WRITE', `Transaction destination changed at ${path}`, {
					path,
					...(content?.success === false ? { error: content.error } : {}),
				})
			}
		}
	})
	if (!preflight.success) {
		const cleanup = attempt(() => discardWriteTransaction(transaction))
		throw new ScaffoldError('WRITE', 'Write transaction failed preflight', {
			target: transaction.target,
			error: preflight.error,
			committed: false,
			...(cleanup.success ? {} : { cleanup: cleanup.error }),
		})
	}
	const preserved: string[] = []
	const promoted: WriteExpectation[] = []
	const createdParents: WriteAnchor[] = []
	let ownedTarget: WriteAnchor | undefined
	const committed = attempt(() => {
		for (const path of requested) {
			validateWriteTarget(transaction, ownedTarget)
			validateWriteDirectories(transaction)
			if (!isPortablePath(path)) {
				throw new ScaffoldError('WRITE', `Invalid transaction path at ${path}`, { path })
			}
			const staged = resolvePhysicalPath(transaction.stage, path, 'WRITE', 'staging')
			const stagedStatus = attempt(() => lstatSync(staged))
			if (
				!stagedStatus.success ||
				stagedStatus.value.isSymbolicLink() ||
				!stagedStatus.value.isFile() ||
				stagedStatus.value.nlink !== 1
			) {
				throw new ScaffoldError('WRITE', `Invalid staged transaction entry at ${path}`, {
					path,
					error: stagedStatus.success ? undefined : stagedStatus.error,
				})
			}
			const destination = resolvePhysicalPath(transaction.target, path, 'WRITE', 'target')
			const backup = resolvePhysicalPath(transaction.backup, path, 'WRITE', 'backup')
			const expectation = transaction.expectations.find((candidate) => candidate.path === path)
			if (expectation === undefined) {
				throw new ScaffoldError('WRITE', `Missing transaction expectation at ${path}`, { path })
			}
			const current = attempt(() => lstatSync(destination))
			if (expectation.shape === 'absent') {
				if (current.success || !isMissingPathError(current.error)) {
					throw new ScaffoldError('WRITE', `Transaction destination changed at ${path}`, {
						path,
						error: current.success ? undefined : current.error,
					})
				}
			} else if (current.success) {
				const shape = current.value.isDirectory() ? 'directory' : 'file'
				const content = shape === 'file' ? attempt(() => digestFile(destination)) : undefined
				if (
					current.value.isSymbolicLink() ||
					(current.value.isFile() && current.value.nlink !== 1) ||
					current.value.isDirectory() !== stagedStatus.value.isDirectory() ||
					current.value.isDirectory() ||
					shape !== expectation.shape ||
					current.value.dev !== expectation.device ||
					current.value.ino !== expectation.inode ||
					current.value.mtimeMs !== expectation.modified ||
					current.value.size !== expectation.size ||
					(content !== undefined && (!content.success || content.value !== expectation.digest))
				) {
					throw new ScaffoldError('WRITE', `Transaction destination changed at ${path}`, {
						path,
						...(content?.success === false ? { error: content.error } : {}),
					})
				}
				mkdirSync(dirname(backup), { recursive: true })
				renameSync(destination, backup)
				preserved.push(path)
				const capturedStatus = lstatSync(backup)
				const capturedContent = digestFile(backup)
				if (
					!capturedStatus.isFile() ||
					capturedStatus.isSymbolicLink() ||
					capturedStatus.nlink !== 1 ||
					capturedStatus.dev !== expectation.device ||
					capturedStatus.ino !== expectation.inode ||
					capturedStatus.mtimeMs !== expectation.modified ||
					capturedStatus.size !== expectation.size ||
					capturedContent !== expectation.digest
				) {
					throw new ScaffoldError(
						'WRITE',
						`Transaction destination changed during preservation at ${path}`,
						{ path },
					)
				}
			} else {
				throw new ScaffoldError('WRITE', `Transaction destination changed at ${path}`, {
					path,
					error: current.error,
				})
			}
			const missingParents: string[] = []
			let parent = dirname(destination)
			while (parent !== dirname(transaction.target)) {
				const status = attempt(() => lstatSync(parent))
				if (status.success) {
					if (
						transaction.existing === undefined &&
						ownedTarget === undefined &&
						parent === transaction.target
					) {
						throw new ScaffoldError('WRITE', 'Write transaction target changed', {
							target: transaction.target,
						})
					}
					break
				}
				if (!isMissingPathError(status.error)) throw status.error
				missingParents.push(parent)
				parent = dirname(parent)
			}
			for (const createdParent of [...missingParents].reverse()) {
				mkdirSync(createdParent)
				const status = lstatSync(createdParent)
				if (!status.isDirectory() || status.isSymbolicLink()) {
					throw new ScaffoldError('WRITE', `Write transaction parent changed at ${createdParent}`, {
						target: transaction.target,
						parent: createdParent,
					})
				}
				if (!createdParents.some((candidate) => candidate.path === createdParent)) {
					const captured = Object.freeze({
						path: createdParent,
						device: status.dev,
						inode: status.ino,
					})
					createdParents.push(captured)
					if (createdParent === transaction.target) ownedTarget = captured
				}
			}
			if (transaction.existing === undefined && ownedTarget === undefined) {
				throw new ScaffoldError('WRITE', 'Write transaction target was not created safely', {
					target: transaction.target,
				})
			}
			linkSync(staged, destination)
			const linkedStatus = lstatSync(destination)
			const stagedAfterLink = lstatSync(staged)
			if (
				!linkedStatus.isFile() ||
				linkedStatus.isSymbolicLink() ||
				linkedStatus.dev !== stagedStatus.value.dev ||
				linkedStatus.ino !== stagedStatus.value.ino ||
				stagedAfterLink.dev !== linkedStatus.dev ||
				stagedAfterLink.ino !== linkedStatus.ino
			) {
				throw new ScaffoldError('WRITE', `Staged promotion changed at ${path}`, { path })
			}
			const unlinked = attempt(() => rmSync(staged))
			if (!unlinked.success) {
				const cleanup = attempt(() => {
					const destinationStatus = lstatSync(destination)
					if (
						destinationStatus.dev !== linkedStatus.dev ||
						destinationStatus.ino !== linkedStatus.ino
					) {
						throw new Error(`promoted file changed at ${path}`)
					}
					rmSync(destination)
				})
				throw new ScaffoldError('WRITE', `Failed to release staged link at ${path}`, {
					path,
					error: unlinked.error,
					cleanup: cleanup.success ? undefined : cleanup.error,
				})
			}
			const promotedStatus = lstatSync(destination)
			promoted.push(
				Object.freeze({
					path,
					shape: 'file',
					device: promotedStatus.dev,
					inode: promotedStatus.ino,
					modified: promotedStatus.mtimeMs,
					size: promotedStatus.size,
					digest: digestFile(destination),
				}),
			)
		}
	})
	if (!committed.success) {
		const recoveryErrors: unknown[] = []
		let preserveResidue = false
		for (const promotion of [...promoted].reverse()) {
			const removed = attempt(() => {
				validateWriteTarget(transaction, ownedTarget)
				const destination = resolvePhysicalPath(
					transaction.target,
					promotion.path,
					'WRITE',
					'target',
				)
				const status = lstatSync(destination)
				const shape = status.isDirectory() ? 'directory' : 'file'
				const digest = shape === 'file' ? attempt(() => digestFile(destination)) : undefined
				if (
					status.isSymbolicLink() ||
					shape !== promotion.shape ||
					status.dev !== promotion.device ||
					status.ino !== promotion.inode ||
					(digest !== undefined &&
						(!digest.success ||
							status.mtimeMs !== promotion.modified ||
							status.size !== promotion.size ||
							digest.value !== promotion.digest))
				) {
					throw new ScaffoldError(
						'WRITE',
						`Promoted transaction destination changed at ${promotion.path}`,
						{
							path: promotion.path,
							...(digest?.success === false ? { error: digest.error } : {}),
						},
					)
				}
				if (shape === 'directory') {
					const recovery = resolvePhysicalPath(
						transaction.stage,
						`.rollback/${promotion.path}`,
						'WRITE',
						'rollback',
					)
					mkdirSync(dirname(recovery), { recursive: true })
					validateWriteTarget(transaction, ownedTarget)
					renameSync(destination, recovery)
					preserveResidue = true
				} else {
					rmSync(destination)
				}
			})
			if (!removed.success) recoveryErrors.push(removed.error)
		}
		for (const path of [...preserved].reverse()) {
			const restored = attempt(() => {
				validateWriteTarget(transaction, ownedTarget)
				validateWriteDirectories(transaction)
				const destination = resolvePhysicalPath(transaction.target, path, 'WRITE', 'target')
				const backup = resolvePhysicalPath(transaction.backup, path, 'WRITE', 'backup')
				mkdirSync(dirname(destination), { recursive: true })
				linkSync(backup, destination)
				rmSync(backup)
			})
			if (!restored.success) recoveryErrors.push(restored.error)
		}
		for (const parent of [...createdParents].reverse()) {
			const removed = attempt(() => {
				validateWriteTarget(transaction, ownedTarget)
				validateWriteDirectories(transaction)
				validateWriteAnchor(parent, 'created parent')
				rmdirSync(parent.path)
			})
			if (!removed.success && !isMissingPathError(removed.error)) recoveryErrors.push(removed.error)
		}
		const cleanup =
			recoveryErrors.length === 0 && !preserveResidue
				? attempt(() => discardWriteTransaction(transaction))
				: undefined
		throw new ScaffoldError('WRITE', 'Write transaction failed before commit', {
			target: transaction.target,
			root: transaction.root,
			error: committed.error,
			committed: false,
			recovery: recoveryErrors,
			residue: preserveResidue ? transaction.root : undefined,
			cleanup: cleanup?.success === false ? cleanup.error : undefined,
		})
	}
	validateWriteDirectories(transaction)
	const cleanup = attempt(() => rmSync(transaction.root, { recursive: true }))
	if (!cleanup.success) {
		throw new ScaffoldError('WRITE', 'Write transaction committed with cleanup residue', {
			target: transaction.target,
			root: transaction.root,
			error: cleanup.error,
			committed: true,
		})
	}
}

/**
 * Resolve and completely preflight the canonical guide destinations a sync may write.
 *
 * @param guides - Structurally validated behind guide results.
 * @param target - The repository root that owns `guides/src`.
 * @returns Each guide paired with its contained destination.
 * @throws `ScaffoldError('WRITE', ...)` before mutation for ownership, collision,
 * containment, or existing filesystem-shape violations.
 */
export function resolveGuideWrites(
	guides: readonly GuideSync[],
	target: string,
): readonly GuideWrite[] {
	const copied = attempt(() =>
		guides.map((guide) => {
			const name = guide.name
			const path = guide.path
			const content = guide.content
			const freshness = guide.freshness
			const note = guide.note
			const baseline = guide.baseline
			return {
				name,
				path,
				content,
				freshness,
				...(note === undefined ? {} : { note }),
				...(baseline === undefined ? {} : { baseline }),
			}
		}),
	)
	if (!copied.success) {
		throw new ScaffoldError('WRITE', 'Sync guides could not be read safely', {
			error: copied.error,
		})
	}
	const behind = copied.value.filter((guide) => guide.freshness === 'behind')
	const paths: string[] = []
	for (const guide of behind) {
		if (!DEPENDENCY_NAME_PATTERN.test(guide.name)) {
			throw new ScaffoldError('WRITE', `Invalid guide dependency name at ${guide.name}`, {
				name: guide.name,
			})
		}
		const short = packageShortName(guide.name)
		const expected = `guides/src/${short}.md`
		if (guide.path !== expected) {
			throw new ScaffoldError(
				'WRITE',
				`Guide path "${guide.path}" does not match dependency ${guide.name}`,
				{ path: guide.path, expected },
			)
		}
		paths.push(guide.path)
	}
	const conflict = findFileConflict(paths)
	if (conflict !== undefined) {
		throw new ScaffoldError(
			'WRITE',
			`Guide destination collision between "${conflict[0]}" and "${conflict[1]}"`,
			{ paths: conflict },
		)
	}
	const resolvedTarget = resolve(target)
	const destinations = behind.map((guide) => ({
		guide,
		destination: resolvePhysicalPath(target, guide.path, 'WRITE', 'target'),
	}))
	for (const { guide, destination } of destinations) {
		if (existsSync(destination)) {
			const status = attempt(() => lstatSync(destination))
			if (
				!status.success ||
				!status.value.isFile() ||
				status.value.isSymbolicLink() ||
				status.value.nlink !== 1
			) {
				throw new ScaffoldError('WRITE', `Guide destination is not a file at ${guide.path}`, {
					path: guide.path,
					...(status.success ? {} : { error: status.error }),
				})
			}
		}
		if (!destination.startsWith(resolvedTarget + sep)) {
			throw new ScaffoldError('WRITE', `Guide destination escapes the target for ${guide.path}`, {
				path: guide.path,
				target,
			})
		}
	}
	return destinations
}

/**
 * Restore quarantined files to their original target-relative paths.
 *
 * @param transaction - The nominal transaction that owns the quarantine and target.
 * @param paths - The relative paths to restore, in their original move order.
 * @throws `ScaffoldError('WRITE', …)` after attempting every reverse-order
 *   restoration when one or more files could not be restored.
 */
export function restoreFiles(transaction: WriteTransaction, paths: readonly string[]): void {
	const requested = parsePortablePaths(paths, MAX_COLLECTION_ITEMS)
	if (requested === undefined) {
		throw new ScaffoldError('WRITE', 'Quarantine restore paths are malformed', {
			limit: MAX_COLLECTION_ITEMS,
		})
	}
	const failed: string[] = []
	const errors: unknown[] = []
	for (const path of [...requested].reverse()) {
		const restored = attempt(() => {
			validateWriteTarget(transaction, undefined)
			const from = resolvePhysicalPath(transaction.backup, path, 'WRITE', 'quarantine')
			const to = resolvePhysicalPath(transaction.target, path, 'WRITE', 'target')
			const sourceStatus = lstatSync(from)
			if (!sourceStatus.isFile() || sourceStatus.isSymbolicLink() || sourceStatus.nlink !== 1) {
				throw new ScaffoldError('WRITE', `Invalid quarantined file at ${path}`, { path })
			}
			mkdirSync(dirname(to), { recursive: true })
			validateWriteTarget(transaction, undefined)
			linkSync(from, to)
			validateWriteTarget(transaction, undefined)
			rmSync(from)
		})
		if (!restored.success) {
			failed.push(path)
			errors.push(restored.error)
		}
	}
	if (failed.length > 0) {
		throw new ScaffoldError('WRITE', 'Failed to restore quarantined files', {
			source: transaction.backup,
			target: transaction.target,
			paths: failed,
			errors,
		})
	}
}

/**
 * Atomically promote a staged sibling directory while preserving recoverable state.
 *
 * @param staging - The completed staging directory.
 * @param target - The destination directory to replace.
 * @param backup - The sibling path reserved for the prior target.
 * @throws `ScaffoldError('WRITE', …)` with explicit `committed` and recovery paths.
 */
export function replaceDirectory(staging: string, target: string, backup: string): void {
	const resolvedStaging = resolve(staging)
	const resolvedTarget = resolve(target)
	const resolvedBackup = resolve(backup)
	const parent = dirname(resolvedTarget)
	const paths = [resolvedStaging, resolvedTarget, resolvedBackup]
	if (dirname(resolvedStaging) !== parent || dirname(resolvedBackup) !== parent) {
		throw new ScaffoldError('WRITE', 'Directory replacement paths must share one parent', {
			staging: resolvedStaging,
			target: resolvedTarget,
			backup: resolvedBackup,
			committed: false,
		})
	}
	if (new Set(paths.map((path) => path.toLowerCase())).size !== paths.length) {
		throw new ScaffoldError('WRITE', 'Directory replacement paths must be distinct', {
			staging: resolvedStaging,
			target: resolvedTarget,
			backup: resolvedBackup,
			committed: false,
		})
	}
	const parentStatus = attempt(() => lstatSync(parent))
	if (
		!parentStatus.success ||
		!parentStatus.value.isDirectory() ||
		parentStatus.value.isSymbolicLink()
	) {
		throw new ScaffoldError('WRITE', 'Directory replacement parent must be a real directory', {
			staging: resolvedStaging,
			target: resolvedTarget,
			backup: resolvedBackup,
			committed: false,
			...(parentStatus.success ? {} : { error: parentStatus.error }),
		})
	}
	const parentAnchor: WriteAnchor = Object.freeze({
		path: parent,
		device: parentStatus.value.dev,
		inode: parentStatus.value.ino,
	})
	const reserved = attempt(() => lstatSync(resolvedBackup))
	if (reserved.success) {
		throw new ScaffoldError('WRITE', 'Directory replacement backup already exists', {
			staging: resolvedStaging,
			target: resolvedTarget,
			backup: resolvedBackup,
			committed: false,
		})
	}
	if (!isMissingPathError(reserved.error)) {
		throw new ScaffoldError('WRITE', 'Failed to inspect directory replacement backup', {
			staging: resolvedStaging,
			target: resolvedTarget,
			backup: resolvedBackup,
			committed: false,
			error: reserved.error,
		})
	}
	const staged = attempt(() => lstatSync(resolvedStaging))
	if (!staged.success || !staged.value.isDirectory() || staged.value.isSymbolicLink()) {
		throw new ScaffoldError('WRITE', 'Directory replacement staging must be a real directory', {
			staging: resolvedStaging,
			target: resolvedTarget,
			backup: resolvedBackup,
			committed: false,
			error: staged.success ? undefined : staged.error,
		})
	}
	const stagingAnchor: WriteAnchor = Object.freeze({
		path: resolvedStaging,
		device: staged.value.dev,
		inode: staged.value.ino,
	})
	const current = attempt(() => lstatSync(resolvedTarget))
	if (!current.success && !isMissingPathError(current.error)) {
		throw new ScaffoldError('WRITE', 'Failed to inspect directory replacement target', {
			staging: resolvedStaging,
			target: resolvedTarget,
			backup: resolvedBackup,
			committed: false,
			error: current.error,
		})
	}
	if (current.success && (!current.value.isDirectory() || current.value.isSymbolicLink())) {
		throw new ScaffoldError('WRITE', 'Directory replacement target must be a real directory', {
			staging: resolvedStaging,
			target: resolvedTarget,
			backup: resolvedBackup,
			committed: false,
		})
	}
	const existing = current.success
	const targetAnchor: WriteAnchor | undefined = current.success
		? Object.freeze({
				path: resolvedTarget,
				device: current.value.dev,
				inode: current.value.ino,
			})
		: undefined
	let preserved = false
	let promoted = false
	const replacement = attempt(() => {
		validateWriteAnchor(parentAnchor, 'directory replacement parent')
		validateWriteAnchor(stagingAnchor, 'directory replacement staging')
		if (existing) {
			if (targetAnchor === undefined) {
				throw new Error('directory replacement target identity is missing')
			}
			validateWriteAnchor(targetAnchor, 'directory replacement target')
			renameSync(resolvedTarget, resolvedBackup)
			preserved = true
			validateWriteAnchor(parentAnchor, 'directory replacement parent')
			validateWriteAnchor(
				Object.freeze({ ...targetAnchor, path: resolvedBackup }),
				'directory replacement backup',
			)
			const vacated = attempt(() => lstatSync(resolvedTarget))
			if (vacated.success || !isMissingPathError(vacated.error)) {
				throw new Error('directory replacement target was not vacated')
			}
		}
		validateWriteAnchor(parentAnchor, 'directory replacement parent')
		validateWriteAnchor(stagingAnchor, 'directory replacement staging')
		renameSync(resolvedStaging, resolvedTarget)
		promoted = true
		validateWriteAnchor(parentAnchor, 'directory replacement parent')
		validateWriteAnchor(
			Object.freeze({ ...stagingAnchor, path: resolvedTarget }),
			'directory replacement target',
		)
		if (existing) {
			if (targetAnchor === undefined) {
				throw new Error('directory replacement backup identity is missing')
			}
			validateWriteAnchor(
				Object.freeze({ ...targetAnchor, path: resolvedBackup }),
				'directory replacement backup',
			)
			rmSync(resolvedBackup, { recursive: true, force: true })
			preserved = false
		}
		validateWriteAnchor(parentAnchor, 'directory replacement parent')
		validateWriteAnchor(
			Object.freeze({ ...stagingAnchor, path: resolvedTarget }),
			'directory replacement target',
		)
	})
	if (replacement.success) return
	const restored =
		existing && preserved && !promoted
			? attempt(() => {
					if (targetAnchor === undefined) {
						throw new Error('directory replacement backup identity is missing')
					}
					validateWriteAnchor(parentAnchor, 'directory replacement parent')
					validateWriteAnchor(
						Object.freeze({ ...targetAnchor, path: resolvedBackup }),
						'directory replacement backup',
					)
					const destination = attempt(() => lstatSync(resolvedTarget))
					if (destination.success || !isMissingPathError(destination.error)) {
						throw new Error('directory replacement target is not vacant')
					}
					renameSync(resolvedBackup, resolvedTarget)
					validateWriteAnchor(targetAnchor, 'directory replacement target')
					preserved = false
				})
			: undefined
	throw new ScaffoldError('WRITE', 'Directory replacement failed', {
		staging: resolvedStaging,
		target: resolvedTarget,
		backup: preserved ? resolvedBackup : undefined,
		committed: promoted,
		error: replacement.error,
		restore: restored?.success === false ? restored.error : undefined,
	})
}

/**
 * Filter a manifest record's entries down to `@orkestrel/`-prefixed keys with
 * string values — the shared `dependencies` / `peerDependencies` /
 * `devDependencies` reader `deriveBlueprint` uses for every dependency-shaped
 * field.
 *
 * @param value - The candidate manifest field value (e.g. `parsed.dependencies`).
 * @returns The `@orkestrel/`-prefixed `[name, range]` entries; `[]` when
 *   `value` is not a plain object (per `isRecord`).
 *
 * @example
 * ```ts
 * import { selectOrkestrelEntries } from '@orkestrel/scaffold/server'
 *
 * selectOrkestrelEntries({ '@orkestrel/core': '^1.0.0', lodash: '^4.0.0' })
 * // [['@orkestrel/core', '^1.0.0']]
 * ```
 */
export function selectOrkestrelEntries(value: unknown): readonly (readonly [string, string])[] {
	if (!isRecord(value)) return []
	const selected = attempt(() => {
		const entries: [string, string][] = []
		for (const [name, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(value))) {
			if (!Reflect.has(descriptor, 'value')) return []
			if (typeof descriptor.value === 'string' && DEPENDENCY_NAME_PATTERN.test(name)) {
				entries.push([name, descriptor.value])
			}
		}
		return entries
	})
	return selected.success ? selected.value : []
}

/**
 * Reconstruct a `Blueprint` from an EXISTING repo at `target` — the faithful
 * inverse `audit` / `repair` / `mirror` need to diff a live package against
 * its own would-be scaffold, rather than a fresh, dependency-less stand-in.
 *
 * @param target - The existing package directory to derive a `Blueprint` from.
 * @remarks
 * A scoped package name is stripped to its bounded safe short name. An
 * unscoped name is accepted only when the target is app-only, `private: true`,
 * and the name satisfies `isWorkspaceName`; every other name is a coded
 * `TARGET` failure. `src` is derived from `src/<environment>/` and `app` from
 * `app/<environment>/`; a target with no environment on either axis is also a coded
 * `TARGET` failure. `dependencies` /
 * `peers` are the `@orkestrel/`-prefixed entries of `manifest.dependencies` /
 * `manifest.peerDependencies` (a peer flagged `peerDependenciesMeta[name]
 * .optional === true` carries `optional: true`). `extras` is EVERY entry of
 * `manifest.devDependencies` (not only `@orkestrel/`-prefixed ones — an
 * external extra like `zod` must round-trip too), EXCLUDING the generated
 * devDependency baseline (`devDependenciesFor([])`'s keys, which already
 * cover `@orkestrel/guide` and `@orkestrel/scaffold`) every scaffolded
 * package already carries, never a package-specific extra. A devDependency
 * ALSO present in
 * `manifest.peerDependencies` or `manifest.dependencies` (e.g. a peer
 * dev-installed for local testing) is likewise excluded from `extras` — it
 * already appears as a `peer`/`dependency` above, and double-counting it as
 * an `extra` would land it in `peers ∩ extras`, a blocking `validateBlueprint`
 * gate. `overrides` is reconstructed from the optional mirrored
 * `overrides/` directory, whose relative paths and UTF-8 bytes are the
 * declared canon.
 * @returns The reconstructed `Blueprint`.
 * @throws `ScaffoldError('TARGET', …)` when `target`'s manifest is unreadable
 *   (via `readManifest`), is not valid JSON, its name is unsafe for its
 *   publication mode, `target` carries no source or application environment,
 *   or its override mirror violates the physical-file, path, collection, or
 *   byte bounds.
 *
 * @example
 * ```ts
 * import { deriveBlueprint } from '@orkestrel/scaffold/server'
 *
 * deriveBlueprint('./packages/router') // { name: 'router', src: ['core', 'server'], … }
 * ```
 */
export function deriveBlueprint(target: string): Blueprint {
	// The generated uniform devDependency baseline (every scaffolded package
	// carries it) is never a package-specific `extras` entry — excluded from
	// the `extras` derived below. Read from the SAME source of truth the
	// compiler uses (`devDependenciesFor`, called with `[]` so only its
	// baseline keys come back) rather than a duplicated literal, plus
	// `@orkestrel/guide` / `@orkestrel/scaffold` per the existing rule (both
	// already part of that baseline, restated here for clarity).
	const baselineExtras = new Set([
		...Object.keys(devDependenciesFor([])),
		'@orkestrel/guide',
		'@orkestrel/scaffold',
	])
	const text = readManifest(target)
	const parsed = parseJSON(text)
	if (!isRecord(parsed)) {
		throw new ScaffoldError('TARGET', `Manifest at ${target} is not a valid JSON object`, {
			target,
		})
	}
	const src = ENVIRONMENTS.filter((environment) =>
		isRealDirectory(join(target, 'src', environment)),
	)
	const app = ENVIRONMENTS.filter((environment) =>
		isRealDirectory(join(target, 'app', environment)),
	)
	if (src.length === 0 && app.length === 0) {
		throw new ScaffoldError(
			'TARGET',
			`No source or application environment directory found under ${target}`,
			{ target },
		)
	}
	const rawName = ownDataValue(parsed, 'name')
	if (typeof rawName !== 'string') {
		throw new ScaffoldError('TARGET', 'Manifest name must be a string', {
			target,
			name: rawName,
		})
	}
	const scopedValue = rawName.startsWith('@orkestrel/')
		? rawName.slice('@orkestrel/'.length)
		: undefined
	const scopedName = isWorkspaceName(scopedValue)
	const privateAppName =
		src.length === 0 && ownDataValue(parsed, 'private') === true && isWorkspaceName(rawName)
	if (!scopedName && !privateAppName) {
		throw new ScaffoldError(
			'TARGET',
			`Manifest name "${String(rawName)}" is neither an @orkestrel package nor a private application`,
			{ target, name: rawName },
		)
	}
	const name = scopedName ? scopedValue : rawName

	const rawDescription = ownDataValue(parsed, 'description')
	const description = typeof rawDescription === 'string' ? rawDescription : undefined
	const rawKeywords = ownDataValue(parsed, 'keywords')
	const keywords =
		Array.isArray(rawKeywords) && rawKeywords.every((word) => typeof word === 'string')
			? rawKeywords
			: []
	const rawVersion = ownDataValue(parsed, 'version')
	const version = typeof rawVersion === 'string' ? rawVersion : DEFAULT_VERSION
	const rawEngines = ownDataValue(parsed, 'engines')
	const rawNode = ownDataValue(rawEngines, 'node')
	const engines = typeof rawNode === 'string' ? rawNode : DEFAULT_ENGINES

	// Structural only: a repo carries the self-hosting tax (bin field, scaffold
	// script, check/test/build:src:bin scripts, build:host, the srcBin vite
	// project) iff it ships its own src/bin — never derived from `name`.
	const engine = isRealDirectory(join(target, 'src', 'bin'))

	const rawDependencies = ownDataValue(parsed, 'dependencies')
	const rawPeerDependencies = ownDataValue(parsed, 'peerDependencies')
	const dependencies: Dependency[] = selectOrkestrelEntries(rawDependencies).map(
		([depName, range]) => ({ name: depName, range }),
	)

	const rawPeersMeta = ownDataValue(parsed, 'peerDependenciesMeta')
	const peersMeta = isRecord(rawPeersMeta) ? rawPeersMeta : undefined
	const peers: Dependency[] = selectOrkestrelEntries(rawPeerDependencies).map(
		([depName, range]) => {
			const meta = ownDataValue(peersMeta, depName)
			return isRecord(meta) && ownDataValue(meta, 'optional') === true
				? { name: depName, range, optional: true }
				: { name: depName, range }
		},
	)

	// A devDependency that ALSO appears in peerDependencies or dependencies is
	// excluded from extras — it already appears as a peer/dependency above,
	// and leaving it in extras would land it in `peers ∩ extras`, a blocking
	// `validateBlueprint` gate. Middleware-shaped packages dev-install a peer
	// for local testing.
	const peerAndDependencyNames = new Set([
		...selectOrkestrelEntries(rawPeerDependencies).map(([depName]) => depName),
		...selectOrkestrelEntries(rawDependencies).map(([depName]) => depName),
	])
	// EVERY devDependency, not only `@orkestrel/`-prefixed ones, is a candidate
	// `extras` entry — an external extra (e.g. `zod`) must round-trip through
	// derivation exactly like an `@orkestrel/`-scoped one, or a package with a
	// HAND-ADDED devDependency (recovered here from the manifest's
	// devDependencies minus the generated baseline) audits DRIFTED against
	// its own manifest.
	const rawDevDependencies = ownDataValue(parsed, 'devDependencies')
	const devDependencies = isRecord(rawDevDependencies) ? rawDevDependencies : {}
	const extras: Dependency[] = Object.entries(devDependencies)
		.filter((entry): entry is [string, string] => typeof entry[1] === 'string')
		.filter(([depName]) => !baselineExtras.has(depName) && !peerAndDependencyNames.has(depName))
		.map(([depName, range]) => ({ name: depName, range }))
	const overrides = readOverrides(target)

	return blueprint(name, {
		...(description === undefined ? {} : { description }),
		keywords,
		src,
		app,
		dependencies,
		peers,
		extras,
		version,
		engines,
		overrides,
		engine,
	})
}

/**
 * Whether a target path is absent, empty, or contains nothing but a `.git`
 * directory — the green-field target law `Materializer.materialize` enforces.
 *
 * @param target - The candidate target directory path.
 * @returns `true` when `target` is safe to materialize a fresh package into.
 *
 * @example
 * ```ts
 * import { isVacant } from '@orkestrel/scaffold/server'
 *
 * isVacant('./packages/router-new') // true — absent, empty, or only a .git dir
 * ```
 */
export function isVacant(target: string): boolean {
	if (!isFilesystemPath(target)) return false
	const status = attempt(() => lstatSync(target))
	if (!status.success) return isMissingPathError(status.error)
	if (!status.value.isDirectory() || status.value.isSymbolicLink()) return false
	const handle = opendirSync(target)
	let first: string | undefined
	let second = false
	try {
		first = handle.readSync()?.name
		second = first === undefined ? false : handle.readSync() !== null
	} finally {
		handle.closeSync()
	}
	if (first === undefined) return true
	if (second || first !== '.git') return false
	const metadata = lstatSync(join(target, '.git'))
	return metadata.isDirectory() && !metadata.isSymbolicLink()
}

/**
 * Read a target's current bytes at a set of relative paths into a
 * byte-exact hexadecimal {@link Snapshot} — the I/O that feeds `diffPlan`.
 *
 * @param target - The target directory to read from.
 * @param paths - The plan-relative artifact paths to probe.
 * @returns A snapshot keyed by path; each file maps to its exact lowercase
 *   hexadecimal bytes and a directly requested directory maps to `''`
 *   (presence only). An absent path is omitted entirely.
 * @throws `ScaffoldError('TARGET', …)` when an EXISTING path fails to read
 *   (e.g. `EACCES` / `EPERM`) — carries the offending relative `path` (and
 *   the resolved `full` path) in `context`. An absent path is never an
 *   error — it is simply omitted, per the return contract above.
 *
 * @example
 * ```ts
 * import { readTarget } from '@orkestrel/scaffold/server'
 *
 * readTarget('./packages/router', ['package.json', 'src/core/index.ts'])
 * // { 'package.json': '7b226e616d65223a…', 'src/core/index.ts': '6578706f7274…' }
 * ```
 */
export function readTarget(target: string, paths: readonly string[]): Snapshot {
	if (!isFilesystemPath(target)) {
		throw new ScaffoldError('TARGET', 'Target path is malformed or exceeds its bounds', { target })
	}
	const requested = parsePortablePaths(paths, MAX_COLLECTION_ITEMS)
	if (requested === undefined) {
		throw new ScaffoldError('TARGET', 'Target snapshot paths are malformed', {
			target,
			limit: MAX_COLLECTION_ITEMS,
		})
	}
	let remaining = MAX_TOTAL_ARTIFACT_BYTES
	const entries: [path: string, hex: string][] = []
	for (const path of requested) {
		const full = resolvePhysicalPath(target, path, 'TARGET', 'target')
		if (!existsSync(full)) continue
		const status = attempt(() => lstatSync(full))
		if (
			!status.success ||
			status.value.isSymbolicLink() ||
			(!status.value.isDirectory() &&
				(!status.value.isFile() || status.value.nlink !== 1 || status.value.size > remaining))
		) {
			throw new ScaffoldError('TARGET', `Failed to read target file at ${path}`, {
				path,
				full,
				limit: MAX_TOTAL_ARTIFACT_BYTES,
				...(status.success ? {} : { error: status.error }),
			})
		}
		if (status.value.isDirectory()) {
			entries.push([path, ''])
			continue
		}
		const hex = readFileHex(
			target,
			path,
			'TARGET',
			'target',
			Math.min(MAX_ARTIFACT_BYTES, remaining),
		)
		remaining -= hex.length / 2
		entries.push([path, hex])
	}
	return Object.fromEntries(entries)
}

/**
 * Read `target/package.json` text — the read that feeds `manifestToDependencies`.
 *
 * @param target - The target directory to read the manifest from.
 * @returns The manifest file's raw text.
 * @throws `ScaffoldError('TARGET', …)` when the manifest is absent or
 *   unreadable (e.g. `EACCES` / `EPERM`) — carries the resolved `full` path
 *   in `context`.
 *
 * @example
 * ```ts
 * import { readManifest } from '@orkestrel/scaffold/server'
 *
 * readManifest('./packages/router') // '{ "name": "@orkestrel/router", … }'
 * ```
 */
export function readManifest(target: string): string {
	if (!isFilesystemPath(target)) {
		throw new ScaffoldError('TARGET', 'Manifest target is malformed or exceeds its bounds', {
			target,
		})
	}
	const full = join(target, 'package.json')
	const result = attempt(() =>
		readFileText(target, 'package.json', 'TARGET', 'target', MAX_MANIFEST_BYTES),
	)
	if (!result.success) {
		throw new ScaffoldError('TARGET', `Failed to read manifest at ${full}`, {
			target,
			full,
			error: result.error,
		})
	}
	return result.value
}

/**
 * Read and validate a vendored host root's `manifest.json`, when present.
 *
 * @param host - The host root to probe.
 * @returns The parsed complete manifest, or `undefined` when `host` has no
 *   `manifest.json` — the raw-repo-root fallback (`Materializer` then maps
 *   an artifact's `source` to `host` 1:1, no vendored staging indirection).
 * @throws `ScaffoldError('TARGET', …)` when `manifest.json` exists but is
 *   unreadable, malformed, collision-prone, root-incomplete, or does not map
 *   bijectively and case-exactly onto real contained storage files.
 *
 * @example
 * ```ts
 * import { readHostManifest } from '@orkestrel/scaffold/server'
 *
 * readHostManifest('./dist/host') // HostManifest | undefined
 * ```
 */
export function readHostManifest(host: string): HostManifest | undefined {
	if (!isFilesystemPath(host)) {
		throw new ScaffoldError('TARGET', 'Host path is malformed or exceeds its bounds', { host })
	}
	const full = resolvePhysicalPath(host, HOST_MANIFEST_PATH, 'TARGET', 'host')
	if (!existsSync(full)) return undefined
	const text = attempt(() =>
		readFileText(host, HOST_MANIFEST_PATH, 'TARGET', 'host', MAX_MANIFEST_BYTES),
	)
	if (!text.success) {
		throw new ScaffoldError('TARGET', `Failed to read host manifest at ${full}`, {
			host,
			full,
			error: text.error,
		})
	}
	const manifest = parseJSONAs(text.value, isHostManifest)
	if (manifest === undefined) {
		throw new ScaffoldError('TARGET', `Host manifest at ${full} is malformed`, { host, full })
	}
	const destinationConflict = findFileConflict(manifest.entries.map((entry) => entry.destination))
	if (destinationConflict !== undefined) {
		throw new ScaffoldError(
			'TARGET',
			`Host manifest destination collision between "${destinationConflict[0]}" and "${destinationConflict[1]}"`,
			{ host, full, field: 'destination', paths: destinationConflict },
		)
	}
	const storageConflict = findFileConflict([
		HOST_MANIFEST_PATH,
		...manifest.entries.map((entry) => entry.storage),
	])
	if (storageConflict !== undefined) {
		throw new ScaffoldError(
			'TARGET',
			`Host manifest storage collision between "${storageConflict[0]}" and "${storageConflict[1]}"`,
			{ host, full, field: 'storage', paths: storageConflict },
		)
	}
	const rootConflict = findPathConflict(manifest.roots)
	if (rootConflict !== undefined) {
		throw new ScaffoldError(
			'TARGET',
			`Host manifest root collision between "${rootConflict[0]}" and "${rootConflict[1]}"`,
			{ host, full, field: 'root', paths: rootConflict },
		)
	}
	const declaredRoots = new Set(manifest.roots)
	for (const entry of manifest.entries) {
		const segments = entry.destination.split('/')
		for (let index = 1; index < segments.length; index += 1) {
			const root = segments.slice(0, index).join('/')
			if (!declaredRoots.has(root)) {
				throw new ScaffoldError(
					'TARGET',
					`Host manifest does not declare destination root "${root}"`,
					{ host, full, root, destination: entry.destination },
				)
			}
		}
	}
	for (const root of manifest.roots) {
		const foldedRoot = root.toLowerCase()
		const file = manifest.entries.find((entry) => {
			const destination = entry.destination.toLowerCase()
			return foldedRoot === destination || foldedRoot.startsWith(`${destination}/`)
		})
		if (file !== undefined) {
			throw new ScaffoldError(
				'TARGET',
				`Host manifest directory "${root}" conflicts with file "${file.destination}"`,
				{ host, full, root, destination: file.destination },
			)
		}
	}
	const listed = attempt(() => listFiles(host))
	if (!listed.success) {
		throw new ScaffoldError('TARGET', `Failed to inventory host storage at ${host}`, {
			host,
			full,
			error: listed.error,
		})
	}
	const stored = listed.value.filter((path) => path !== HOST_MANIFEST_PATH)
	const storedConflict = findPathConflict(stored)
	if (storedConflict !== undefined) {
		throw new ScaffoldError(
			'TARGET',
			`Host storage collision between "${storedConflict[0]}" and "${storedConflict[1]}"`,
			{ host, full, paths: storedConflict },
		)
	}
	const storedByPath = new Map(stored.map((path) => [path.toLowerCase(), path]))
	const declaredStorage = new Set(manifest.entries.map((entry) => entry.storage.toLowerCase()))
	for (const path of stored) {
		if (!declaredStorage.has(path.toLowerCase())) {
			throw new ScaffoldError('TARGET', `Host storage file "${path}" is not declared`, {
				host,
				full,
				path,
			})
		}
	}
	for (const entry of manifest.entries) {
		const storedPath = storedByPath.get(entry.storage.toLowerCase())
		if (storedPath === undefined || storedPath !== entry.storage) {
			throw new ScaffoldError(
				'TARGET',
				`Host storage file "${entry.storage}" is missing or case-mismatched`,
				{ host, full, storage: entry.storage, actual: storedPath },
			)
		}
		const storage = resolvePhysicalPath(host, entry.storage, 'TARGET', 'host')
		const status = attempt(() => lstatSync(storage))
		if (
			!status.success ||
			!status.value.isFile() ||
			status.value.isSymbolicLink() ||
			status.value.nlink !== 1
		) {
			throw new ScaffoldError('TARGET', `Host storage at "${entry.storage}" is not a file`, {
				host,
				full,
				storage: entry.storage,
				error: status.success ? undefined : status.error,
			})
		}
	}
	return manifest
}

/**
 * Read one contained file as exact lowercase hexadecimal bytes.
 *
 * @param root - The declared containing root.
 * @param path - The root-relative file path.
 * @param code - The coded failure for containment or reading.
 * @param boundary - The boundary name used in diagnostics.
 * @returns The exact file bytes encoded as lowercase hexadecimal.
 */
export function readFileHex(
	root: string,
	path: string,
	code: ScaffoldErrorCode,
	boundary: string,
	limit = MAX_ARTIFACT_BYTES,
): string {
	if (!Number.isSafeInteger(limit) || limit < 0 || limit > MAX_ARTIFACT_BYTES) {
		throw new ScaffoldError(code, `Invalid file byte limit at ${path}`, { path, root, limit })
	}
	if (!isPortablePath(path)) {
		throw new ScaffoldError(code, `Unsafe file path at ${path}`, { path, root })
	}
	const full = resolvePhysicalPath(root, path, code, boundary)
	const status = attempt(() => lstatSync(full))
	if (
		!status.success ||
		!status.value.isFile() ||
		status.value.isSymbolicLink() ||
		status.value.nlink !== 1
	) {
		throw new ScaffoldError(code, `File is not a physical readable file at ${path}`, {
			path,
			full,
			...(status.success ? {} : { error: status.error }),
		})
	}
	const opened = attempt(() => openSync(full, 'r'))
	if (!opened.success) {
		throw new ScaffoldError(code, `Failed to read file at ${path}`, {
			path,
			full,
			error: opened.error,
		})
	}
	const handle = opened.value
	const result = attempt(() => {
		const current = fstatSync(handle)
		if (
			!current.isFile() ||
			current.nlink !== 1 ||
			current.dev !== status.value.dev ||
			current.ino !== status.value.ino
		) {
			throw new ScaffoldError(code, `File changed before reading at ${path}`, { path, full })
		}
		if (current.size > limit) {
			throw new ScaffoldError(code, `File exceeds the artifact limit at ${path}`, {
				path,
				full,
				limit,
				size: current.size,
			})
		}
		const bytes = Buffer.alloc(current.size)
		let offset = 0
		while (offset < bytes.byteLength) {
			const length = readSync(handle, bytes, offset, bytes.byteLength - offset, offset)
			if (length === 0) break
			offset += length
		}
		const overflow = Buffer.alloc(1)
		const extra = readSync(handle, overflow, 0, overflow.byteLength, offset)
		const after = fstatSync(handle)
		const pathStatus = lstatSync(full)
		if (
			offset !== bytes.byteLength ||
			extra !== 0 ||
			after.dev !== current.dev ||
			after.ino !== current.ino ||
			after.mtimeMs !== current.mtimeMs ||
			after.size !== current.size ||
			!pathStatus.isFile() ||
			pathStatus.isSymbolicLink() ||
			pathStatus.nlink !== 1 ||
			pathStatus.dev !== current.dev ||
			pathStatus.ino !== current.ino
		) {
			throw new ScaffoldError(code, `File changed while reading at ${path}`, { path, full })
		}
		return bytesToHex(bytes)
	})
	const closed = attempt(() => closeSync(handle))
	if (!result.success) throw result.error
	if (!closed.success) {
		throw new ScaffoldError(code, `Failed to close file at ${path}`, {
			path,
			full,
			error: closed.error,
		})
	}
	return result.value
}

/**
 * Read one contained physical file as bounded UTF-8 text.
 *
 * @param root - The declared containing root.
 * @param path - The root-relative file path.
 * @param code - The coded failure for containment or reading.
 * @param boundary - The boundary name used in diagnostics.
 * @returns The exact file bytes decoded as UTF-8 text.
 */
export function readFileText(
	root: string,
	path: string,
	code: ScaffoldErrorCode,
	boundary: string,
	limit = MAX_ARTIFACT_BYTES,
): string {
	const decoded = attempt(() =>
		new TextDecoder('utf-8', { fatal: true }).decode(
			Buffer.from(readFileHex(root, path, code, boundary, limit), 'hex'),
		),
	)
	if (!decoded.success) {
		throw new ScaffoldError(code, `File is not valid UTF-8 at ${path}`, {
			path,
			root,
			error: decoded.error,
		})
	}
	return decoded.value
}

/**
 * Read a repository's persistent artifact overrides from its mirrored
 * `overrides/` directory.
 *
 * @param target - The repository root containing the optional mirror.
 * @returns Ordered overrides whose paths are relative to `overrides/`, or an
 *   empty array when the mirror is absent.
 * @throws `ScaffoldError('TARGET', …)` when the mirror exceeds collection or
 *   byte bounds, contains a path collision, or contains anything other than
 *   bounded physical UTF-8 files.
 *
 * @example
 * ```ts
 * import { readOverrides } from '@orkestrel/scaffold/server'
 *
 * readOverrides('./packages/router')
 * // [{ path: '.github/workflows/ci.yml', content: 'name: flavored\n' }]
 * ```
 */
export function readOverrides(target: string): readonly Override[] {
	const root = join(target, 'overrides')
	const paths = listFiles(root)
	const overflow = paths[MAX_COLLECTION_ITEMS]
	if (overflow !== undefined) {
		throw new ScaffoldError(
			'TARGET',
			`Override collection exceeds ${MAX_COLLECTION_ITEMS} entries at ${overflow}`,
			{ target, path: overflow, limit: MAX_COLLECTION_ITEMS },
		)
	}
	const conflict = findFileConflict(paths)
	if (conflict !== undefined) {
		throw new ScaffoldError(
			'TARGET',
			`Override path collision between "${conflict[0]}" and "${conflict[1]}"`,
			{ target, paths: conflict },
		)
	}
	let remaining = MAX_TOTAL_ARTIFACT_BYTES
	const overrides: Override[] = []
	for (const path of paths) {
		if (remaining <= 0) {
			throw new ScaffoldError(
				'TARGET',
				`Override content exceeds the aggregate byte limit at ${path}`,
				{ target, path, limit: MAX_TOTAL_ARTIFACT_BYTES },
			)
		}
		const content = readFileText(
			root,
			path,
			'TARGET',
			'override',
			Math.min(MAX_ARTIFACT_BYTES, remaining),
		)
		remaining -= contentByteLength(content)
		overrides.push(override(path, content))
	}
	return Object.freeze(overrides)
}

/**
 * Recursively list a directory's files as root-relative paths.
 *
 * @param root - The directory to list.
 * @returns Root-relative file paths (posix-style `/` separators), code-unit
 *   sorted, or `[]` when `root` is absent.
 *
 * @example
 * ```ts
 * import { listFiles } from '@orkestrel/scaffold/server'
 *
 * listFiles('./dist/host/.claude/agents') // ['scout.md', 'builder.md', …]
 * ```
 */
export function listFiles(root: string): readonly string[] {
	if (!isFilesystemPath(root)) {
		throw new ScaffoldError('TARGET', 'Listing root is malformed or exceeds its bounds', { root })
	}
	const rootStatus = attempt(() => lstatSync(root))
	if (!rootStatus.success) {
		if (isMissingPathError(rootStatus.error)) return []
		throw new ScaffoldError('TARGET', 'Failed to inspect listing root', {
			root,
			error: rootStatus.error,
		})
	}
	if (!rootStatus.value.isDirectory() || rootStatus.value.isSymbolicLink()) {
		throw new ScaffoldError('TARGET', 'Listing root is not a physical directory', { root })
	}
	const files: string[] = []
	const pending = [{ full: root, path: '', depth: 0 }]
	let visited = 0
	while (pending.length > 0) {
		const current = pending.pop()
		if (current === undefined) break
		const handle = opendirSync(current.full)
		try {
			for (;;) {
				const entry = handle.readSync()
				if (entry === null) break
				visited += 1
				if (visited > MAX_HOST_ENTRIES) {
					throw new ScaffoldError('TARGET', `Host traversal exceeds ${MAX_HOST_ENTRIES} entries`, {
						root,
						limit: MAX_HOST_ENTRIES,
					})
				}
				const path = current.path === '' ? entry.name : `${current.path}/${entry.name}`
				if (!isPortablePath(path)) {
					throw new ScaffoldError('TARGET', 'Filesystem traversal found a non-portable path')
				}
				if (entry.isDirectory() && !entry.isSymbolicLink()) {
					const depth = current.depth + 1
					if (depth > MAX_HOST_DEPTH) {
						throw new ScaffoldError('TARGET', `Host traversal exceeds depth ${MAX_HOST_DEPTH}`, {
							root,
							path,
							limit: MAX_HOST_DEPTH,
						})
					}
					pending.push({ full: join(current.full, entry.name), path, depth })
				} else {
					files.push(path)
				}
			}
		} finally {
			handle.closeSync()
		}
	}
	return files.sort()
}

/**
 * Recursively list a directory's descendant directories.
 *
 * @param root - The directory to list.
 * @returns Root-relative POSIX directory paths in code-unit order.
 */
export function listDirectories(root: string): readonly string[] {
	if (!isFilesystemPath(root)) {
		throw new ScaffoldError('TARGET', 'Listing root is malformed or exceeds its bounds', { root })
	}
	const rootStatus = attempt(() => lstatSync(root))
	if (!rootStatus.success) {
		if (isMissingPathError(rootStatus.error)) return []
		throw new ScaffoldError('TARGET', 'Failed to inspect listing root', {
			root,
			error: rootStatus.error,
		})
	}
	if (!rootStatus.value.isDirectory() || rootStatus.value.isSymbolicLink()) {
		throw new ScaffoldError('TARGET', 'Listing root is not a physical directory', { root })
	}
	const directories: string[] = []
	const pending = [{ full: root, path: '', depth: 0 }]
	let visited = 0
	while (pending.length > 0) {
		const current = pending.pop()
		if (current === undefined) break
		const handle = opendirSync(current.full)
		try {
			for (;;) {
				const entry = handle.readSync()
				if (entry === null) break
				visited += 1
				if (visited > MAX_HOST_ENTRIES) {
					throw new ScaffoldError('TARGET', `Host traversal exceeds ${MAX_HOST_ENTRIES} entries`, {
						root,
						limit: MAX_HOST_ENTRIES,
					})
				}
				if (!entry.isDirectory() || entry.isSymbolicLink()) continue
				const path = current.path === '' ? entry.name : `${current.path}/${entry.name}`
				if (!isPortablePath(path)) {
					throw new ScaffoldError('TARGET', 'Filesystem traversal found a non-portable path')
				}
				const depth = current.depth + 1
				if (depth > MAX_HOST_DEPTH) {
					throw new ScaffoldError('TARGET', `Host traversal exceeds depth ${MAX_HOST_DEPTH}`, {
						root,
						path,
						limit: MAX_HOST_DEPTH,
					})
				}
				directories.push(path)
				pending.push({ full: join(current.full, entry.name), path, depth })
			}
		} finally {
			handle.closeSync()
		}
	}
	return directories.sort()
}

/**
 * Map a repo-relative path to its vendored-host STAGING path, per the
 * dotfile-mapping rule `stageHost` writes into `manifest.json`.
 *
 * @param path - The repo-relative source path (e.g. `.claude/agents/reviewer.md`).
 * @returns The mapped storage path: a leading-dot TOP-LEVEL FILE maps to
 *   `dotfiles/<name-without-dot>`; a leading-dot DIRECTORY segment loses its
 *   dot wherever it appears; an undotted path is unchanged.
 *
 * @example
 * ```ts
 * import { storagePath } from '@orkestrel/scaffold/server'
 *
 * storagePath('.gitignore') // 'dotfiles/gitignore'
 * storagePath('.claude/agents/reviewer.md') // 'claude/agents/reviewer.md'
 * storagePath('.github/workflows/ci.yml') // 'github/workflows/ci.yml'
 * storagePath('AGENTS.md') // 'AGENTS.md'
 * ```
 */
export function storagePath(path: string): string {
	const segments = path.split('/')
	if (segments.length === 1) {
		const name = segments[0]
		if (name === undefined) return path
		return name.startsWith('.') ? `dotfiles/${name.slice(1)}` : name
	}
	return segments.map((segment) => (segment.startsWith('.') ? segment.slice(1) : segment)).join('/')
}

/**
 * Stage the vendored host set (byte-preserved copies + `manifest.json`) from
 * a repo root into an output directory — the BUILD-time primitive the
 * `build:host` npm script now calls directly (replacing a standalone build
 * script); `Materializer.materialize` is the RUNTIME reader of what this
 * writes (via `hostRoot` / `readHostManifest`).
 *
 * @param root - The repo root every `paths` entry resolves against.
 * @param out - The output directory to replace after staging completes.
 * @param paths - The repo-relative file/directory entries to stage; defaults
 *   to the package's own vendored set (`HOST_PATHS`) — a caller passes an
 *   explicit list only to stage an arbitrary/test set.
 * @remarks
 * Every source, path collision, and root/output relationship is preflighted
 * before output mutation. Files are copied into a temporary sibling; the
 * completed staging tree atomically replaces `out`, with rollback when the
 * swap fails. The manifest records both sorted file `entries` and the
 * complete sorted directory `roots` inventory so destructive consumers can
 * distinguish a declared-empty root from a truncated manifest.
 * @returns The written manifest's entries (`{ storage, destination, executable }`).
 * @throws `ScaffoldError('TARGET', …)` for an invalid/escaping source or path
 *   collision, and `ScaffoldError('WRITE', …)` for staging/swap failures.
 *
 * @example
 * ```ts
 * import { stageHost } from '@orkestrel/scaffold/server'
 *
 * const entries = stageHost(process.cwd(), 'dist/host')
 * entries.length // number of files staged
 * ```
 */
export function stageHost(
	root: string,
	out: string,
	paths: readonly string[] = HOST_PATHS,
): readonly ManifestEntry[] {
	if (!isFilesystemPath(root) || !isFilesystemPath(out)) {
		throw new ScaffoldError('TARGET', 'Host root or output is malformed or exceeds its bounds', {
			root,
			out,
		})
	}
	const copiedPaths = parsePortablePaths(paths, MAX_HOST_ENTRIES)
	if (copiedPaths === undefined) {
		throw new ScaffoldError('TARGET', 'Host source paths are malformed', {
			root,
			out,
			limit: MAX_HOST_ENTRIES,
		})
	}
	const destinations: string[] = []
	const roots: string[] = []
	const resolvedRoot = resolveRealPath(resolve(root))
	const resolvedOut = resolveRealPath(resolve(out))
	if (resolvedRoot === resolvedOut || resolvedRoot.startsWith(resolvedOut + sep)) {
		throw new ScaffoldError('TARGET', `Host output at ${out} contains the source root`, {
			root,
			out,
		})
	}
	for (const path of copiedPaths) {
		if (!isPortablePath(path) || isSensitiveHostPath(path)) {
			throw new ScaffoldError('TARGET', `Invalid host source path at ${path}`, { path, root })
		}
		const absolute = resolvePhysicalPath(root, path, 'TARGET', 'host')
		if (!existsSync(absolute)) {
			throw new ScaffoldError('TARGET', `Missing host source at ${path}`, { path, root })
		}
		const status = attempt(() => lstatSync(absolute))
		if (!status.success) {
			throw new ScaffoldError('TARGET', `Failed to inspect host source at ${path}`, {
				path,
				root,
				error: status.error,
			})
		}
		if (status.value.isSymbolicLink()) {
			throw new ScaffoldError('TARGET', `Host source is linked at ${path}`, { path, root })
		}
		if (status.value.isDirectory()) {
			const resolvedSource = resolveRealPath(absolute)
			if (resolvedOut === resolvedSource || resolvedOut.startsWith(resolvedSource + sep)) {
				throw new ScaffoldError('TARGET', `Host output at ${out} is inside source ${path}`, {
					root,
					out,
					path,
				})
			}
			roots.push(path)
			for (const nested of listDirectories(absolute)) roots.push(`${path}/${nested}`)
			for (const nested of listFiles(absolute)) destinations.push(`${path}/${nested}`)
		} else {
			destinations.push(path)
		}
	}
	if (destinations.length > MAX_HOST_ENTRIES || roots.length > MAX_HOST_ENTRIES) {
		throw new ScaffoldError('TARGET', 'Host source inventory exceeds the entry limit', {
			root,
			limit: MAX_HOST_ENTRIES,
		})
	}

	const entries: ManifestEntry[] = []
	const expectations: WriteExpectation[] = []
	let totalBytes = 0
	for (const destination of destinations) {
		if (isSensitiveHostPath(destination)) {
			throw new ScaffoldError(
				'TARGET',
				`Sensitive host source is not vendorable at ${destination}`,
				{
					root,
					destination,
				},
			)
		}
		const source = resolvePhysicalPath(root, destination, 'TARGET', 'host')
		const status = attempt(() => lstatSync(source))
		if (
			!status.success ||
			!status.value.isFile() ||
			status.value.isSymbolicLink() ||
			status.value.nlink !== 1
		) {
			throw new ScaffoldError('TARGET', `Host source is not a readable file at ${destination}`, {
				root,
				destination,
				error: status.success ? undefined : status.error,
			})
		}
		totalBytes += status.value.size
		if (totalBytes > MAX_TOTAL_ARTIFACT_BYTES) {
			throw new ScaffoldError('TARGET', 'Host source inventory exceeds the aggregate byte limit', {
				root,
				limit: MAX_TOTAL_ARTIFACT_BYTES,
			})
		}
		expectations.push(
			Object.freeze({
				path: destination,
				shape: 'file',
				device: status.value.dev,
				inode: status.value.ino,
				modified: status.value.mtimeMs,
				size: status.value.size,
				digest: digestFile(source),
			}),
		)
		const storage = storagePath(destination)
		const executable = destination.endsWith('.sh')
		entries.push({ storage, destination, executable })
		const segments = destination.split('/')
		for (let index = 1; index < segments.length; index += 1) {
			roots.push(segments.slice(0, index).join('/'))
		}
	}
	entries.sort((a, b) =>
		a.destination < b.destination ? -1 : a.destination > b.destination ? 1 : 0,
	)
	const destinationConflict = findFileConflict(entries.map((entry) => entry.destination))
	if (destinationConflict !== undefined) {
		throw new ScaffoldError(
			'TARGET',
			`Destination collision between "${destinationConflict[0]}" and "${destinationConflict[1]}"`,
			{ paths: destinationConflict },
		)
	}
	const storageConflict = findFileConflict(entries.map((entry) => entry.storage))
	if (storageConflict !== undefined) {
		const storageDestinations = entries
			.filter((entry) => entry.storage.toLowerCase() === storageConflict[0].toLowerCase())
			.map((entry) => entry.destination)
		throw new ScaffoldError(
			'TARGET',
			`Storage collision at "${storageConflict[0]}" between destinations "${storageDestinations[0] ?? ''}" and "${storageDestinations[1] ?? ''}"`,
			{ storage: storageConflict[0], destinations: storageDestinations },
		)
	}
	const manifestConflict = findFileConflict([
		HOST_MANIFEST_PATH,
		...entries.map((entry) => entry.storage),
	])
	if (manifestConflict !== undefined) {
		throw new ScaffoldError(
			'TARGET',
			`Storage path "${manifestConflict[1]}" collides with reserved manifest.json`,
			{ paths: manifestConflict },
		)
	}
	const uniqueRoots = [...new Set(roots)].sort()
	if (uniqueRoots.length > MAX_HOST_ENTRIES) {
		throw new ScaffoldError('TARGET', 'Host source inventory exceeds the entry limit', {
			root,
			limit: MAX_HOST_ENTRIES,
		})
	}
	const rootConflict = findPathConflict(uniqueRoots)
	if (rootConflict !== undefined) {
		throw new ScaffoldError(
			'TARGET',
			`Directory collision between "${rootConflict[0]}" and "${rootConflict[1]}"`,
			{ paths: rootConflict },
		)
	}
	const manifest: HostManifest = { entries, roots: uniqueRoots }
	const parent = dirname(resolve(out))
	const name = basename(resolve(out))
	const token = randomUUID()
	const staging = resolveContainedPath(parent, `.${name}.stage-${token}`, 'WRITE', 'output')
	const backup = resolveContainedPath(parent, `.${name}.backup-${token}`, 'WRITE', 'output')
	let stagingAnchor: WriteAnchor | undefined
	let parentDirectory: WriteDirectoryResult | undefined
	const staged = attempt(() => {
		parentDirectory = createWriteDirectory(parent, 'host output parent')
		validateWriteAnchor(parentDirectory.anchor, 'host output parent')
		mkdirSync(staging, { recursive: false })
		validateWriteAnchor(parentDirectory.anchor, 'host output parent')
		const stagingStatus = lstatSync(staging)
		if (!stagingStatus.isDirectory() || stagingStatus.isSymbolicLink()) {
			throw new ScaffoldError('WRITE', 'Host staging root is not a physical directory', {
				staging,
			})
		}
		stagingAnchor = Object.freeze({
			path: staging,
			device: stagingStatus.dev,
			inode: stagingStatus.ino,
		})
		for (const entry of entries) {
			validateWriteAnchor(parentDirectory.anchor, 'host output parent')
			validateWriteAnchor(stagingAnchor, 'host staging root')
			const source = resolvePhysicalPath(root, entry.destination, 'TARGET', 'host')
			const expectation = expectations.find((candidate) => candidate.path === entry.destination)
			const sourceStatus = lstatSync(source)
			const sourceDigest = digestFile(source)
			if (
				expectation === undefined ||
				!sourceStatus.isFile() ||
				sourceStatus.isSymbolicLink() ||
				sourceStatus.nlink !== 1 ||
				sourceStatus.dev !== expectation.device ||
				sourceStatus.ino !== expectation.inode ||
				sourceStatus.mtimeMs !== expectation.modified ||
				sourceStatus.size !== expectation.size ||
				sourceDigest !== expectation.digest
			) {
				throw new ScaffoldError('TARGET', `Host source changed at ${entry.destination}`, {
					root,
					destination: entry.destination,
				})
			}
			const destination = resolvePhysicalPath(staging, entry.storage, 'WRITE', 'staging')
			mkdirSync(dirname(destination), { recursive: true })
			validateWriteAnchor(stagingAnchor, 'host staging root')
			const containedDestination = resolvePhysicalPath(staging, entry.storage, 'WRITE', 'staging')
			copyFileSync(source, containedDestination, FS_CONSTANTS.COPYFILE_EXCL)
			const copiedStatus = lstatSync(containedDestination)
			if (
				!copiedStatus.isFile() ||
				copiedStatus.isSymbolicLink() ||
				copiedStatus.nlink !== 1 ||
				digestFile(containedDestination) !== expectation.digest
			) {
				throw new ScaffoldError('WRITE', `Host staging copy changed at ${entry.destination}`, {
					staging,
					destination: entry.destination,
				})
			}
		}
		writeFileSync(join(staging, HOST_MANIFEST_PATH), `${JSON.stringify(manifest, null, '\t')}\n`, {
			encoding: 'utf8',
			flag: 'wx',
		})
		validateWriteAnchor(parentDirectory.anchor, 'host output parent')
		if (readHostManifest(staging) === undefined) {
			throw new ScaffoldError('WRITE', 'Staged host manifest could not be verified', {
				staging,
			})
		}
	})
	if (!staged.success) {
		const identity = stagingAnchor
		const cleanup =
			identity === undefined
				? undefined
				: attempt(() => {
						validateWriteAnchor(identity, 'host staging root')
						rmSync(staging, { recursive: true })
					})
		const parentCleanup = attempt(() => {
			for (const created of [...(parentDirectory?.created ?? [])].reverse()) {
				validateWriteAnchor(created, 'host output parent')
				rmdirSync(created.path)
			}
		})
		throw new ScaffoldError('WRITE', `Failed to stage host output at ${out}`, {
			root,
			out,
			error: staged.error,
			cleanup: cleanup?.success === false ? cleanup.error : undefined,
			parentCleanup: parentCleanup.success ? undefined : parentCleanup.error,
		})
	}
	if (parentDirectory === undefined) {
		throw new ScaffoldError('WRITE', 'Host output parent was not established', { out })
	}
	validateWriteAnchor(parentDirectory.anchor, 'host output parent')
	replaceDirectory(staging, out, backup)

	return entries
}

/**
 * Resolve the absolute host-storage path for a host-origin artifact's
 * `source`, manifest-aware.
 *
 * @param manifest - The parsed complete host manifest, or `undefined`
 *   when the host carries none (raw-repo-root fallback).
 * @param source - The artifact's `source` (or `path`) to resolve.
 * @param host - The resolved host root the path is joined against.
 * @returns `join(host, source)` when `manifest` is `undefined` (no vendored
 *   staging indirection); when `manifest` is present, `join(host,
 *   entries[0].storage)` for the SINGLE manifest entry whose `destination`
 *   equals `source`, or `undefined` when zero or more than one entry matches
 *   (`source` names a directory, or the manifest is ambiguous — no single
 *   storage file to point at).
 *
 * @example
 * ```ts
 * import { locateHostSource } from '@orkestrel/scaffold/server'
 *
 * locateHostSource(undefined, 'package.json', './dist/host') // './dist/host/package.json'
 * locateHostSource(
 *   {
 *     entries: [{ storage: 'pkg.tmpl', destination: 'package.json', executable: false }],
 *     roots: [],
 *   },
 *   'package.json',
 *   './dist/host',
 * )
 * // './dist/host/pkg.tmpl'
 * ```
 */
export function locateHostSource(
	manifest: HostManifest | undefined,
	source: string,
	host: string,
): string | undefined {
	if (manifest === undefined) return join(host, source)
	const entries = manifest.entries.filter((entry) => entry.destination === source)
	if (entries.length !== 1) return undefined
	const [entry] = entries
	return entry === undefined ? undefined : join(host, entry.storage)
}

/**
 * Map a manifest destination from an artifact's source prefix to its target prefix.
 *
 * @param artifact - The host artifact carrying the target path and optional source.
 * @param destination - The matched manifest destination.
 * @returns The exact target-relative path for the matched manifest file.
 * @throws `ScaffoldError('INVALID', …)` when `destination` is outside the source prefix.
 */
export function remapArtifactPath(artifact: HostArtifact, destination: string): string {
	const source = artifact.source ?? artifact.path
	if (destination === source) return artifact.path
	if (!destination.startsWith(`${source}/`)) {
		throw new ScaffoldError('INVALID', `Manifest destination does not match ${source}`, {
			source,
			destination,
		})
	}
	return `${artifact.path}/${destination.slice(source.length + 1)}`
}

/**
 * Rehydrate a `Plan`'s `host`-origin artifacts with their exact byte hex read
 * from `host` — manifest-aware, via `locateHostSource`.
 *
 * @param plan - The plan to hydrate.
 * @param host - The resolved host root to read from.
 * @returns A new `Plan` whose file-shaped `host` artifacts carry exact `hex`.
 *   Directory-shaped host artifacts expand into one byte-aware artifact
 *   per file, preserving their group and mapping the artifact/source prefixes.
 *   `template` / `computed` artifacts pass through untouched.
 * @throws `ScaffoldError('TARGET', …)` when the host is not a readable
 *   directory, a present manifest is invalid/incomplete, or a required source
 *   is absent, escaping, not a file/directory as declared, or unreadable.
 *
 * @example
 * ```ts
 * import { hydratePlan } from '@orkestrel/scaffold/server'
 *
 * const hydrated = hydratePlan(plan, './dist/host')
 * ```
 */
export function hydratePlan(plan: Plan, host: string): Plan {
	if (!isFilesystemPath(host)) {
		throw new ScaffoldError('TARGET', 'Host path is malformed or exceeds its bounds', { host })
	}
	const owned = snapshotPlan(plan)
	const status = attempt(() => lstatSync(host))
	if (!status.success || !status.value.isDirectory() || status.value.isSymbolicLink()) {
		throw new ScaffoldError('TARGET', `Host root is not a readable directory at ${host}`, {
			host,
			error: status.success ? undefined : status.error,
		})
	}
	const manifest = readHostManifest(host)
	const artifacts: Artifact[] = []
	let remaining = MAX_TOTAL_ARTIFACT_BYTES
	for (const artifact of owned.artifacts) {
		if (artifact.origin !== 'host') remaining -= Buffer.byteLength(artifact.content, 'utf8')
	}
	for (const artifact of owned.artifacts) {
		if (artifact.origin !== 'host') {
			artifacts.push(artifact)
			continue
		}
		const source = artifact.source ?? artifact.path
		if (!isPortablePath(source) || isSensitiveHostPath(source)) {
			throw new ScaffoldError('TARGET', `Unsafe host artifact source at ${source}`, {
				host,
				source,
			})
		}
		const full = locateHostSource(manifest, source, host)
		const relative = full === undefined ? undefined : relativeOf(host, full).split(sep).join('/')
		if (relative !== undefined) {
			const contained = resolvePhysicalPath(host, relative, 'TARGET', 'host')
			if (existsSync(contained)) {
				const exact = attempt(() => lstatSync(contained))
				if (!exact.success) {
					throw new ScaffoldError('TARGET', `Failed to inspect host artifact source at ${source}`, {
						host,
						source,
						error: exact.error,
					})
				}
				if (exact.value.isFile() && !exact.value.isSymbolicLink() && exact.value.nlink === 1) {
					const hex = readFileHex(
						host,
						relative,
						'TARGET',
						'host',
						Math.min(MAX_ARTIFACT_BYTES, remaining),
					)
					remaining -= hex.length / 2
					artifacts.push({
						...artifact,
						hex,
					})
					continue
				}
				if (manifest !== undefined) {
					throw new ScaffoldError('TARGET', `Host artifact source is not a file at ${source}`, {
						host,
						source,
					})
				}
			}
			if (manifest !== undefined) {
				throw new ScaffoldError('TARGET', `Host artifact source is missing at ${source}`, {
					host,
					source,
				})
			}
		}

		if (manifest !== undefined) {
			const entries = manifest.entries.filter((entry) => entry.destination.startsWith(`${source}/`))
			if (artifacts.length + entries.length > MAX_COLLECTION_ITEMS) {
				throw new ScaffoldError('TARGET', 'Hydrated plan exceeds the artifact count limit', {
					host,
					limit: MAX_COLLECTION_ITEMS,
				})
			}
			if (entries.length === 0) {
				if (source.startsWith('guides/src/') && source.endsWith('.md')) {
					artifacts.push(artifact)
					continue
				}
				throw new ScaffoldError('TARGET', `Host manifest does not declare ${source}`, {
					host,
					source,
				})
			}
			for (const entry of entries) {
				if (isSensitiveHostPath(entry.destination)) {
					throw new ScaffoldError(
						'TARGET',
						`Sensitive host artifact source at ${entry.destination}`,
						{ host, source: entry.destination },
					)
				}
				const nestedPath = entry.destination.slice(source.length + 1)
				const hex = readFileHex(
					host,
					entry.storage,
					'TARGET',
					'host',
					Math.min(MAX_ARTIFACT_BYTES, remaining),
				)
				remaining -= hex.length / 2
				artifacts.push({
					...artifact,
					path: `${artifact.path}/${nestedPath}`,
					source: entry.destination,
					hex,
				})
			}
			continue
		}

		const directory = resolvePhysicalPath(host, source, 'TARGET', 'host')
		if (!existsSync(directory)) {
			throw new ScaffoldError('TARGET', `Host artifact source is missing at ${source}`, {
				host,
				source,
			})
		}
		const directoryStatus = attempt(() => lstatSync(directory))
		if (
			!directoryStatus.success ||
			!directoryStatus.value.isDirectory() ||
			directoryStatus.value.isSymbolicLink()
		) {
			throw new ScaffoldError('TARGET', `Host artifact source is not a directory at ${source}`, {
				host,
				source,
				error: directoryStatus.success ? undefined : directoryStatus.error,
			})
		}
		const relatives = listFiles(directory)
		if (artifacts.length + relatives.length > MAX_COLLECTION_ITEMS) {
			throw new ScaffoldError('TARGET', 'Hydrated plan exceeds the artifact count limit', {
				host,
				limit: MAX_COLLECTION_ITEMS,
			})
		}
		if (relatives.length === 0) {
			artifacts.push(artifact)
			continue
		}
		for (const nestedPath of relatives) {
			const nestedSource = `${source}/${nestedPath}`
			if (isSensitiveHostPath(nestedSource)) {
				throw new ScaffoldError('TARGET', `Sensitive host artifact source at ${nestedSource}`, {
					host,
					source: nestedSource,
				})
			}
			const hex = readFileHex(
				host,
				nestedSource,
				'TARGET',
				'host',
				Math.min(MAX_ARTIFACT_BYTES, remaining),
			)
			remaining -= hex.length / 2
			artifacts.push({
				...artifact,
				path: `${artifact.path}/${nestedPath}`,
				source: nestedSource,
				hex,
			})
		}
	}
	const conflict = findFileConflict(artifacts.map((artifact) => artifact.path))
	if (conflict !== undefined) {
		throw new ScaffoldError(
			'INVALID',
			`Hydrated artifact collision between "${conflict[0]}" and "${conflict[1]}"`,
			{ paths: conflict },
		)
	}
	const hydrated = { ...owned, artifacts }
	if (!isPlan(hydrated)) {
		throw new ScaffoldError('INVALID', 'Hydrated plan violates the bounded Plan contract')
	}
	return hydrated
}

/**
 * The vendored set of destination-relative paths under `directory` (one of
 * `PRUNE_DIRECTORIES`) that `pruneTargets` must NOT report — read from the
 * manifest's `destination`s when `host` has one, else listed straight off
 * `host/<directory>`.
 *
 * @param host - The vendored host root to establish the allowlist from.
 * @param directory - The prune directory (one of `PRUNE_DIRECTORIES`) to scope the allowlist to.
 * @remarks
 * FAIL CLOSED: before returning any allowlist (even an empty one), the
 * vendored source must be POSITIVELY established, or a caller would treat an
 * unresolved host as "vendors nothing" and report every file under
 * `target/<directory>` as unexpected. A missing `host` root, or (no
 * `manifest.json` AND no `host/<directory>`), is a coded `TARGET` failure —
 * the distinction this guards is missing-host vs genuinely-empty-vendor: a
 * `host` that EXISTS and vendors zero files in `directory` (an existing empty
 * dir, or a manifest with zero entries for it) remains a valid empty allowlist.
 * @returns The allowed destination-relative paths under `directory`.
 * @throws `ScaffoldError('TARGET', …)` when `host` does not exist, or when
 *   `host` has no `manifest.json` and no `host/<directory>` either.
 *
 * @example
 * ```ts
 * import { vendoredPruneSet } from '@orkestrel/scaffold/server'
 *
 * vendoredPruneSet('./dist/host', '.claude/agents') // Set { '.claude/agents/reviewer.md', … }
 * ```
 */
export function vendoredPruneSet(host: string, directory: string): ReadonlySet<string> {
	if (!existsSync(host)) {
		throw new ScaffoldError(
			'TARGET',
			`Cannot establish vendored source for prune: host root not found at ${host}`,
			{ host, directory },
		)
	}
	const manifest = readHostManifest(host)
	if (manifest !== undefined) {
		if (!manifest.roots.includes(directory)) {
			throw new ScaffoldError(
				'TARGET',
				`Cannot establish vendored source for prune: manifest does not declare ${directory}`,
				{ host, directory },
			)
		}
		return new Set(
			manifest.entries
				.filter((entry) => entry.destination.startsWith(`${directory}/`))
				.map((entry) => entry.destination),
		)
	}
	const hostDirectory = resolvePhysicalPath(host, directory, 'TARGET', 'host')
	if (!existsSync(hostDirectory)) {
		throw new ScaffoldError(
			'TARGET',
			`Cannot establish vendored source for prune: no manifest.json and no host directory at ${hostDirectory}`,
			{ host, directory },
		)
	}
	const hostStatus = attempt(() => lstatSync(hostDirectory))
	if (!hostStatus.success || !hostStatus.value.isDirectory() || hostStatus.value.isSymbolicLink()) {
		throw new ScaffoldError(
			'TARGET',
			`Cannot establish vendored source for prune: host directory is not physical at ${hostDirectory}`,
			{ host, directory, ...(hostStatus.success ? {} : { error: hostStatus.error }) },
		)
	}
	return new Set(listFiles(hostDirectory).map((relative) => `${directory}/${relative}`))
}

/**
 * List the repo-relative POSIX paths under `target`'s prune directories
 * (`.claude/agents`, `.codex/agents`, `scripts`) that the vendored `host`
 * allowlist does NOT declare — THE single source of truth for prune drift, consumed by both
 * `Materializer.prune` (which deletes exactly these paths) and the bin's
 * audit/preview UX (which now shows them honestly instead of a
 * structurally-always-zero `audit.foreign`).
 *
 * @param target - The target directory to scan for unexpected files.
 * @param host - The vendored host root the allowlist is derived from.
 * @returns The unexpected relative paths (e.g. `.claude/agents/rogue.md`); `[]`
 *   when a prune directory is absent under `target`, or when none of its
 *   files are unexpected. Pure read — never deletes anything.
 * @throws `ScaffoldError('TARGET', …)` when `host` cannot positively
 *   establish a vendored allowlist for a prune directory that DOES exist
 *   under `target` (see `vendoredPruneSet`'s fail-closed remarks).
 *
 * @example
 * ```ts
 * import { pruneTargets } from '@orkestrel/scaffold/server'
 *
 * pruneTargets('./packages/router', hostRoot()) // ['.claude/agents/rogue.md']
 * ```
 */
export function pruneTargets(target: string, host: string): readonly string[] {
	if (!isFilesystemPath(target) || !isFilesystemPath(host)) {
		throw new ScaffoldError('TARGET', 'Prune root is malformed or exceeds its bounds', {
			target,
			host,
		})
	}
	const paths: string[] = []
	for (const directory of PRUNE_DIRECTORIES) {
		const root = resolvePhysicalPath(target, directory, 'TARGET', 'target')
		if (!existsSync(root)) continue
		const status = attempt(() => lstatSync(root))
		if (!status.success || !status.value.isDirectory() || status.value.isSymbolicLink()) {
			throw new ScaffoldError('TARGET', `Prune root is not a physical directory at ${root}`, {
				target,
				directory,
				...(status.success ? {} : { error: status.error }),
			})
		}
		const allowed = vendoredPruneSet(host, directory)
		for (const relative of listFiles(root)) {
			const path = `${directory}/${relative}`
			if (!allowed.has(path)) paths.push(path)
		}
	}
	return paths
}

/** Consume one aggregate fleet-catalog traversal slot. */
export function consumeCatalogAllowance(allowance: CatalogAllowance, root: string): void {
	const consumed = attempt(() => {
		if (!isCatalogAllowance(allowance)) throw new Error('allowance must be one Float64 cell')
		const remaining = allowance[0]
		if (
			remaining === undefined ||
			!Number.isSafeInteger(remaining) ||
			remaining < 1 ||
			remaining > MAX_HOST_ENTRIES
		) {
			throw new Error('allowance is outside its bounds')
		}
		const next = remaining - 1
		allowance[0] = next
		if (allowance[0] !== next) throw new Error('allowance decrement was not retained')
	})
	if (!consumed.success) {
		throw new ScaffoldError('TARGET', 'Fleet catalog exceeds its aggregate entry limit', {
			root,
			limit: MAX_HOST_ENTRIES,
			error: consumed.error,
		})
	}
}

/**
 * List a fleet root's `@orkestrel/*` package directories.
 *
 * @param root - The fleet root directory to scan.
 * @returns Absolute, code-unit-sorted paths of `root`'s immediate child
 *   directories whose `package.json` parses and whose `name` starts with
 *   `@orkestrel/`. A child with an unreadable or unparsable `package.json`,
 *   or a non-`@orkestrel` name, is skipped silently — it simply is not a
 *   fleet member.
 * @throws `ScaffoldError('TARGET', …)` when a child directory name contains
 *   terminal controls and therefore cannot be safely inspected or reported.
 *
 * @example
 * ```ts
 * import { discoverPackages } from '@orkestrel/scaffold/server'
 *
 * discoverPackages('./packages') // ['/abs/packages/router', '/abs/packages/budget']
 * ```
 */
export function discoverPackages(
	root: string,
	allowance: CatalogAllowance = new Float64Array([MAX_HOST_ENTRIES]),
): readonly string[] {
	if (!isCatalogAllowance(allowance)) {
		throw new ScaffoldError('TARGET', 'Fleet catalog allowance is malformed', {
			root,
			limit: MAX_HOST_ENTRIES,
		})
	}
	if (!isFilesystemPath(root)) {
		throw new ScaffoldError('TARGET', 'Fleet root is malformed or exceeds its bounds', { root })
	}
	const rootStatus = attempt(() => lstatSync(root))
	if (!rootStatus.success || !rootStatus.value.isDirectory() || rootStatus.value.isSymbolicLink()) {
		throw new ScaffoldError('TARGET', `Fleet root is not a physical directory at ${root}`, {
			root,
			...(rootStatus.success ? {} : { error: rootStatus.error }),
		})
	}
	const packages: string[] = []
	const handle = opendirSync(root)
	try {
		for (;;) {
			const entry = handle.readSync()
			if (entry === null) break
			consumeCatalogAllowance(allowance, root)
			if (!entry.isDirectory()) continue
			if (!isTerminalText(entry.name)) {
				throw new ScaffoldError('TARGET', 'Fleet discovery found a non-portable directory')
			}
			const directory = join(root, entry.name)
			const text = attempt(() =>
				readFileText(directory, 'package.json', 'TARGET', 'package', MAX_MANIFEST_BYTES),
			)
			if (!text.success) continue
			const parsed = parseJSON(text.value)
			if (!isRecord(parsed)) continue
			const name = ownDataValue(parsed, 'name')
			if (typeof name !== 'string' || !DEPENDENCY_NAME_PATTERN.test(name)) continue
			if (!isPortablePath(entry.name)) {
				throw new ScaffoldError('TARGET', 'Fleet discovery found a non-portable directory')
			}
			packages.push(directory)
		}
	} finally {
		handle.closeSync()
	}
	return packages.sort()
}

/**
 * Extract the first paragraph from the first blockquote in a Markdown guide.
 *
 * @param text - The guide Markdown to traverse.
 * @returns A normalized one-line description, or `undefined` when parsing
 *   fails, no blockquote paragraph exists, or the paragraph is empty.
 *
 * @example
 * ```ts
 * import { guideToDescription } from '@orkestrel/scaffold/server'
 *
 * guideToDescription('> A concise package description.\n>\n> More detail.')
 * // 'A concise package description.'
 * ```
 */
export function guideToDescription(text: string): string | undefined {
	if (text.length > MAX_GUIDE_BYTES || contentByteLength(text) > MAX_GUIDE_BYTES) {
		return undefined
	}
	const parsed = attempt(() => parseDocument(text))
	if (!parsed.success) return undefined
	let quote: BlockquoteNode | undefined
	for (const node of walkNodes(parsed.value)) {
		if (isBlockquoteNode(node)) {
			quote = node
			break
		}
	}
	if (quote === undefined) return undefined
	const paragraph = quote.children.find((child) => isParagraphNode(child))
	if (paragraph === undefined) return undefined
	const description = flattenText(paragraph).replace(/\s+/g, ' ').trim()
	return description.length > 0 && isCatalogDescription(description) ? description : undefined
}

/**
 * Build the fleet package catalog — one `CatalogEntry` per `@orkestrel/*`
 * package discovered under each root, its description drawn from its own
 * guide's FIRST blockquote.
 *
 * @param roots - The fleet root directories to scan (each walked via `discoverPackages`).
 * @remarks
 * Per discovered package directory: `name` / `version` come from its own
 * `package.json`; `description` is the first paragraph of the guide's opening
 * blockquote — the flattened text of the FIRST `ParagraphNode` among the
 * FIRST `BlockquoteNode` found's (depth-first, pre-order, via `walkNodes`)
 * TOP-LEVEL children in its `guides/src/<short>.md` (`<short>` = `name` with
 * the `@orkestrel/` prefix stripped), parsed with `@orkestrel/markdown`'s
 * `parseDocument` — a multi-paragraph blockquote overview yields only its
 * FIRST paragraph, never the whole quote glued together; embedded newlines
 * collapse to single spaces, and surrounding whitespace trims. A
 * missing/unreadable guide, a guide carrying no blockquote, or a blockquote
 * with no top-level paragraph child, yields `description: ''`, never a
 * thrown error. Entries merge across `roots` (a later root's entry for a
 * repeated `name` wins), then code-unit sort by `name`. An unreadable ROOT
 * itself is NOT wrapped here — whatever `discoverPackages` throws for it
 * propagates as-is; the bin layer is responsible for coding that failure
 * `TARGET`.
 * @returns The merged, sorted `CatalogEntry[]`.
 *
 * @example
 * ```ts
 * import { catalogPackages } from '@orkestrel/scaffold/server'
 *
 * catalogPackages(['/repos']) // [{ name: '@orkestrel/contract', version: '0.0.5', description: '…' }, …]
 * ```
 */
export function catalogPackages(
	roots: readonly string[],
	limit = MAX_HOST_ENTRIES,
): readonly CatalogEntry[] {
	const requested = parseFilesystemPaths(roots, MAX_HOST_ENTRIES)
	if (
		requested === undefined ||
		!Number.isSafeInteger(limit) ||
		limit < 1 ||
		limit > MAX_HOST_ENTRIES
	) {
		throw new ScaffoldError('TARGET', 'Catalog roots are malformed', {
			limit: MAX_HOST_ENTRIES,
		})
	}
	const merged = new Map<string, CatalogEntry>()
	const allowance = new Float64Array([limit])
	for (const root of requested) {
		consumeCatalogAllowance(allowance, root)
		for (const directory of discoverPackages(root, allowance)) {
			const text = attempt(() =>
				readFileText(directory, 'package.json', 'TARGET', 'package', MAX_MANIFEST_BYTES),
			)
			if (!text.success) continue
			const parsed = parseJSON(text.value)
			if (!isRecord(parsed)) continue
			const name = ownDataValue(parsed, 'name')
			if (typeof name !== 'string' || !DEPENDENCY_NAME_PATTERN.test(name)) continue
			const version = ownDataValue(parsed, 'version')
			if (typeof version !== 'string' || !VERSION_PATTERN.test(version)) continue
			const short = packageShortName(name)
			let description = ''
			const guide = attempt(() =>
				readFileText(directory, `guides/src/${short}.md`, 'TARGET', 'package', MAX_GUIDE_BYTES),
			)
			if (guide.success) description = guideToDescription(guide.value) ?? ''
			merged.set(name, { name, version, description })
		}
	}
	return [...merged.values()].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
}
