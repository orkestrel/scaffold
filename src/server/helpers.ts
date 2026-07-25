import type {
	Artifact,
	Blueprint,
	CatalogEntry,
	Dependency,
	HostArtifact,
	Plan,
	ScaffoldErrorCode,
	Snapshot,
} from '@src/core'
import type { BlockquoteNode } from '@orkestrel/markdown'
import type { HostManifest, ManifestEntry } from './types.js'
import { randomUUID } from 'node:crypto'
import {
	copyFileSync,
	existsSync,
	linkSync,
	lstatSync,
	mkdirSync,
	readFileSync,
	readdirSync,
	realpathSync,
	renameSync,
	rmSync,
	statSync,
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
	DEFAULT_ENGINES,
	DEFAULT_VERSION,
	devDependenciesFor,
	findFileConflict,
	findPathConflict,
	HOST_PATHS,
	ScaffoldError,
	SURFACES,
} from '@src/core'
import { HOST_MANIFEST_PATH, PRUNE_DIRECTORIES } from './constants.js'
import { isHostManifest, isMissingPathError, isPortablePath } from './validators.js'

// ============================================================================
//  @orkestrel/scaffold/server — helpers.ts (AGENTS §5 source of truth). The
//  server-only helpers `blueprintToPlan`'s green-field target law, the
//  `diffPlan`-feeding target reader, `Sync`'s manifest reader, the
//  `Materializer`'s vendored-host manifest, the vendored-host BUILD staging
//  primitive (`stageHost`, replacing the retired standalone build script), and the
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
	if (existsSync(path)) return realpathSync(path)
	const parent = dirname(path)
	if (parent === path) return path
	return join(resolveRealPath(parent), relativeOf(parent, path))
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
 * Restore quarantined files to their original target-relative paths.
 *
 * @param source - The quarantine root.
 * @param target - The original target root.
 * @param paths - The relative paths to restore, in their original move order.
 * @throws `ScaffoldError('WRITE', …)` after attempting every reverse-order
 *   restoration when one or more files could not be restored.
 */
export function restoreFiles(source: string, target: string, paths: readonly string[]): void {
	const failed: string[] = []
	const errors: unknown[] = []
	for (const path of [...paths].reverse()) {
		const restored = attempt(() => {
			if (!isPortablePath(path)) {
				throw new ScaffoldError('WRITE', `Invalid quarantine path at ${path}`, { path })
			}
			// The entry was realpath-preflighted at its original target before
			// quarantine. Resolve the moved source lexically: following a valid
			// symlink from its new quarantine location would reinterpret its
			// target and can falsely report an escape. `linkSync` below hard-links
			// the symlink inode itself without replacing an existing destination.
			const from = resolve(source, path)
			const to = resolveContainedPath(target, path, 'WRITE', 'target')
			mkdirSync(dirname(to), { recursive: true })
			linkSync(from, to)
			rmSync(from)
		})
		if (!restored.success) {
			failed.push(path)
			errors.push(restored.error)
		}
	}
	if (failed.length > 0) {
		throw new ScaffoldError('WRITE', 'Failed to restore quarantined files', {
			source,
			target,
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
	if (existing) {
		const preserved = attempt(() => renameSync(resolvedTarget, resolvedBackup))
		if (!preserved.success) {
			throw new ScaffoldError('WRITE', `Failed to preserve prior directory at ${resolvedTarget}`, {
				staging: resolvedStaging,
				target: resolvedTarget,
				backup: resolvedBackup,
				committed: false,
				error: preserved.error,
			})
		}
	}
	const promoted = attempt(() => renameSync(resolvedStaging, resolvedTarget))
	if (!promoted.success) {
		const restored = existing
			? attempt(() => renameSync(resolvedBackup, resolvedTarget))
			: undefined
		throw new ScaffoldError('WRITE', `Failed to promote staged directory at ${resolvedTarget}`, {
			staging: resolvedStaging,
			target: resolvedTarget,
			backup: existing ? resolvedBackup : undefined,
			committed: false,
			error: promoted.error,
			restore: restored?.success === false ? restored.error : undefined,
		})
	}
	if (!existing) return
	const cleanup = attempt(() => rmSync(resolvedBackup, { recursive: true, force: true }))
	if (!cleanup.success) {
		throw new ScaffoldError(
			'WRITE',
			`Directory committed with backup residue at ${resolvedBackup}`,
			{
				staging: resolvedStaging,
				target: resolvedTarget,
				backup: resolvedBackup,
				committed: true,
				error: cleanup.error,
			},
		)
	}
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
	return Object.entries(value).filter(
		(entry): entry is [string, string] =>
			typeof entry[1] === 'string' && entry[0].startsWith('@orkestrel/'),
	)
}

/**
 * Reconstruct a `Blueprint` from an EXISTING repo at `target` — the faithful
 * inverse `audit` / `repair` / `mirror` need to diff a live package against
 * its own would-be scaffold, rather than a fresh, dependency-less stand-in.
 *
 * @param target - The existing package directory to derive a `Blueprint` from.
 * @remarks
 * `name` strips the `@orkestrel/` prefix off `manifest.name` — a non-`@orkestrel`
 * name is a coded `TARGET` failure, since this tool derives only `@orkestrel`
 * packages. `surfaces` is read off the LIVE line: every surface the package
 * carries has a `src/<surface>/` directory, so each of `'core' | 'browser' |
 * 'server'` is included iff that directory exists at `target`; a target with
 * NONE of the three is also a coded `TARGET` failure. `dependencies` /
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
 * already surfaces as a `peer`/`dependency` above, and double-counting it as
 * an `extra` would land it in `peers ∩ extras`, a blocking `validateBlueprint`
 * gate. `overrides` is always `[]` — derivation cannot know a caller's
 * template-override intent.
 * @returns The reconstructed `Blueprint`.
 * @throws `ScaffoldError('TARGET', …)` when `target`'s manifest is unreadable
 *   (via `readManifest`), is not valid JSON, its `name` is not `@orkestrel`-
 *   prefixed, or `target` carries none of the three surface directories.
 *
 * @example
 * ```ts
 * import { deriveBlueprint } from '@orkestrel/scaffold/server'
 *
 * deriveBlueprint('./packages/router') // { name: 'router', surfaces: ['core', 'server'], … }
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
	const BASELINE_EXTRAS = new Set([
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
	const rawName = parsed.name
	if (typeof rawName !== 'string' || !rawName.startsWith('@orkestrel/')) {
		throw new ScaffoldError(
			'TARGET',
			`Manifest name "${String(rawName)}" is not an @orkestrel package`,
			{ target, name: rawName },
		)
	}
	const name = rawName.slice('@orkestrel/'.length)

	const description = typeof parsed.description === 'string' ? parsed.description : undefined
	const keywords =
		Array.isArray(parsed.keywords) && parsed.keywords.every((word) => typeof word === 'string')
			? parsed.keywords
			: []
	const version = typeof parsed.version === 'string' ? parsed.version : DEFAULT_VERSION
	const engines =
		isRecord(parsed.engines) && typeof parsed.engines.node === 'string'
			? parsed.engines.node
			: DEFAULT_ENGINES

	const surfaces = SURFACES.filter((surface) => existsSync(join(target, 'src', surface)))
	if (surfaces.length === 0) {
		throw new ScaffoldError('TARGET', `No surface directory found under ${target}/src`, { target })
	}
	// Structural only: a repo carries the self-hosting tax (bin field, scaffold
	// script, check/test/build:src:bin scripts, build:host, the srcBin vite
	// project) iff it ships its own src/bin — never derived from `name`.
	const engine = existsSync(join(target, 'src', 'bin'))

	const dependencies: Dependency[] = selectOrkestrelEntries(parsed.dependencies).map(
		([depName, range]) => ({ name: depName, range }),
	)

	const peersMeta = isRecord(parsed.peerDependenciesMeta) ? parsed.peerDependenciesMeta : undefined
	const peers: Dependency[] = selectOrkestrelEntries(parsed.peerDependencies).map(
		([depName, range]) => {
			const meta = peersMeta !== undefined ? peersMeta[depName] : undefined
			return isRecord(meta) && meta.optional === true
				? { name: depName, range, optional: true }
				: { name: depName, range }
		},
	)

	// A devDependency that ALSO appears in peerDependencies or dependencies is
	// excluded from extras — it already surfaces as a peer/dependency above,
	// and leaving it in extras would land it in `peers ∩ extras`, a blocking
	// `validateBlueprint` gate (H3: middleware-shaped packages dev-install a
	// peer for local testing).
	const peerAndDependencyNames = new Set([
		...selectOrkestrelEntries(parsed.peerDependencies).map(([depName]) => depName),
		...selectOrkestrelEntries(parsed.dependencies).map(([depName]) => depName),
	])
	// EVERY devDependency, not only `@orkestrel/`-prefixed ones, is a candidate
	// `extras` entry — an external extra (e.g. `zod`) must round-trip through
	// derivation exactly like an `@orkestrel/`-scoped one, or a package with a
	// HAND-ADDED devDependency (recovered here from the manifest's
	// devDependencies minus the generated baseline) audits DRIFTED against
	// its own manifest.
	const devDependencies = isRecord(parsed.devDependencies) ? parsed.devDependencies : {}
	const extras: Dependency[] = Object.entries(devDependencies)
		.filter((entry): entry is [string, string] => typeof entry[1] === 'string')
		.filter(([depName]) => !BASELINE_EXTRAS.has(depName) && !peerAndDependencyNames.has(depName))
		.map(([depName, range]) => ({ name: depName, range }))

	return blueprint(name, {
		description,
		keywords,
		surfaces,
		dependencies,
		peers,
		extras,
		version,
		engines,
		overrides: [],
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
	if (!existsSync(target)) return true
	if (!statSync(target).isDirectory()) return false
	const entries = readdirSync(target)
	return entries.length === 0 || (entries.length === 1 && entries[0] === '.git')
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
	const entries: [path: string, hex: string][] = []
	for (const path of paths) {
		const full = resolveContainedPath(target, path, 'TARGET', 'target')
		if (!existsSync(full)) continue
		const status = attempt(() => statSync(full))
		if (!status.success) {
			throw new ScaffoldError('TARGET', `Failed to read target file at ${path}`, {
				path,
				full,
				error: status.error,
			})
		}
		entries.push([
			path,
			status.value.isDirectory() ? '' : readFileHex(target, path, 'TARGET', 'target'),
		])
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
	const full = join(target, 'package.json')
	const result = attempt(() => readFileSync(full, 'utf8'))
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
	const full = resolveContainedPath(host, HOST_MANIFEST_PATH, 'TARGET', 'host')
	if (!existsSync(full)) return undefined
	const text = attempt(() => readFileSync(full, 'utf8'))
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
		const storage = resolveContainedPath(host, entry.storage, 'TARGET', 'host')
		const status = attempt(() => statSync(storage))
		if (!status.success || !status.value.isFile()) {
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
): string {
	const full = resolveContainedPath(root, path, code, boundary)
	const result = attempt(() => readFileSync(full))
	if (!result.success) {
		throw new ScaffoldError(code, `Failed to read file at ${path}`, {
			path,
			full,
			error: result.error,
		})
	}
	return bytesToHex(result.value)
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
	if (!existsSync(root)) return []
	const files: string[] = []
	for (const entry of readdirSync(root, { withFileTypes: true })) {
		const full = join(root, entry.name)
		if (entry.isDirectory()) {
			for (const nested of listFiles(full)) files.push(`${entry.name}/${nested}`)
		} else {
			files.push(entry.name)
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
	if (!existsSync(root)) return []
	const directories: string[] = []
	for (const entry of readdirSync(root, { withFileTypes: true })) {
		if (!entry.isDirectory() || entry.isSymbolicLink()) continue
		const full = join(root, entry.name)
		directories.push(entry.name)
		for (const nested of listDirectories(full)) directories.push(`${entry.name}/${nested}`)
	}
	return directories.sort()
}

/**
 * Map a repo-relative path to its vendored-host STAGING path, per the
 * dotfile-mapping rule `stageHost` writes into `manifest.json`.
 *
 * @param path - The repo-relative source path (e.g. `.claude/agents/scout.md`).
 * @returns The mapped storage path: a leading-dot TOP-LEVEL FILE maps to
 *   `dotfiles/<name-without-dot>`; a leading-dot DIRECTORY segment loses its
 *   dot wherever it appears; an undotted path is unchanged.
 *
 * @example
 * ```ts
 * import { storagePath } from '@orkestrel/scaffold/server'
 *
 * storagePath('.gitignore') // 'dotfiles/gitignore'
 * storagePath('.claude/agents/scout.md') // 'claude/agents/scout.md'
 * storagePath('.github/workflows/ci.yml') // 'github/workflows/ci.yml'
 * storagePath('AGENTS.md') // 'AGENTS.md'
 * ```
 */
export function storagePath(path: string): string {
	const segments = path.split('/')
	if (segments.length === 1) {
		const name = segments[0]
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
	for (const path of paths) {
		if (!isPortablePath(path)) {
			throw new ScaffoldError('TARGET', `Invalid host source path at ${path}`, { path, root })
		}
		const absolute = resolveContainedPath(root, path, 'TARGET', 'host')
		if (!existsSync(absolute)) {
			throw new ScaffoldError('TARGET', `Missing host source at ${path}`, { path, root })
		}
		const status = attempt(() => statSync(absolute))
		if (!status.success) {
			throw new ScaffoldError('TARGET', `Failed to inspect host source at ${path}`, {
				path,
				root,
				error: status.error,
			})
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

	const entries: ManifestEntry[] = []
	for (const destination of destinations) {
		const source = resolveContainedPath(root, destination, 'TARGET', 'host')
		const status = attempt(() => statSync(source))
		if (!status.success || !status.value.isFile()) {
			throw new ScaffoldError('TARGET', `Host source is not a readable file at ${destination}`, {
				root,
				destination,
				error: status.success ? undefined : status.error,
			})
		}
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
	const staged = attempt(() => {
		mkdirSync(parent, { recursive: true })
		mkdirSync(staging, { recursive: false })
		for (const entry of entries) {
			const source = resolveContainedPath(root, entry.destination, 'TARGET', 'host')
			const destination = resolveContainedPath(staging, entry.storage, 'WRITE', 'staging')
			mkdirSync(dirname(destination), { recursive: true })
			copyFileSync(source, destination)
		}
		writeFileSync(join(staging, HOST_MANIFEST_PATH), `${JSON.stringify(manifest, null, '\t')}\n`)
		if (readHostManifest(staging) === undefined) {
			throw new ScaffoldError('WRITE', 'Staged host manifest could not be verified', {
				staging,
			})
		}
	})
	if (!staged.success) {
		const cleanup = attempt(() => rmSync(staging, { recursive: true, force: true }))
		throw new ScaffoldError('WRITE', `Failed to stage host output at ${out}`, {
			root,
			out,
			error: staged.error,
			cleanup: cleanup.success ? undefined : cleanup.error,
		})
	}
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
	return join(host, entries[0].storage)
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
	const status = attempt(() => statSync(host))
	if (!status.success || !status.value.isDirectory()) {
		throw new ScaffoldError('TARGET', `Host root is not a readable directory at ${host}`, {
			host,
			error: status.success ? undefined : status.error,
		})
	}
	const manifest = readHostManifest(host)
	const artifacts: Artifact[] = []
	for (const artifact of plan.artifacts) {
		if (artifact.origin !== 'host') {
			artifacts.push(artifact)
			continue
		}
		const source = artifact.source ?? artifact.path
		const full = locateHostSource(manifest, source, host)
		const relative = full === undefined ? undefined : relativeOf(host, full)
		if (relative !== undefined) {
			const contained = resolveContainedPath(host, relative, 'TARGET', 'host')
			if (existsSync(contained)) {
				const exact = attempt(() => statSync(contained))
				if (!exact.success) {
					throw new ScaffoldError('TARGET', `Failed to inspect host artifact source at ${source}`, {
						host,
						source,
						error: exact.error,
					})
				}
				if (exact.value.isFile()) {
					artifacts.push({
						...artifact,
						hex: readFileHex(host, relative, 'TARGET', 'host'),
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
				const nestedPath = entry.destination.slice(source.length + 1)
				artifacts.push({
					...artifact,
					path: `${artifact.path}/${nestedPath}`,
					source: entry.destination,
					hex: readFileHex(host, entry.storage, 'TARGET', 'host'),
				})
			}
			continue
		}

		const directory = resolveContainedPath(host, source, 'TARGET', 'host')
		if (!existsSync(directory)) {
			throw new ScaffoldError('TARGET', `Host artifact source is missing at ${source}`, {
				host,
				source,
			})
		}
		const directoryStatus = attempt(() => statSync(directory))
		if (!directoryStatus.success || !directoryStatus.value.isDirectory()) {
			throw new ScaffoldError('TARGET', `Host artifact source is not a directory at ${source}`, {
				host,
				source,
				error: directoryStatus.success ? undefined : directoryStatus.error,
			})
		}
		const relatives = listFiles(directory)
		if (relatives.length === 0) {
			artifacts.push(artifact)
			continue
		}
		for (const nestedPath of relatives) {
			const nestedSource = `${source}/${nestedPath}`
			artifacts.push({
				...artifact,
				path: `${artifact.path}/${nestedPath}`,
				source: nestedSource,
				hex: readFileHex(host, nestedSource, 'TARGET', 'host'),
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
	return { ...plan, artifacts }
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
 * vendoredPruneSet('./dist/host', '.claude/agents') // Set { '.claude/agents/scout.md', … }
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
	const hostDirectory = resolveContainedPath(host, directory, 'TARGET', 'host')
	if (!existsSync(hostDirectory)) {
		throw new ScaffoldError(
			'TARGET',
			`Cannot establish vendored source for prune: no manifest.json and no host directory at ${hostDirectory}`,
			{ host, directory },
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
	const paths: string[] = []
	for (const directory of PRUNE_DIRECTORIES) {
		const root = resolveContainedPath(target, directory, 'TARGET', 'target')
		if (!existsSync(root)) continue
		const allowed = vendoredPruneSet(host, directory)
		for (const relative of listFiles(root)) {
			const path = `${directory}/${relative}`
			if (!allowed.has(path)) paths.push(path)
		}
	}
	return paths
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
 *
 * @example
 * ```ts
 * import { discoverPackages } from '@orkestrel/scaffold/server'
 *
 * discoverPackages('./packages') // ['/abs/packages/router', '/abs/packages/budget']
 * ```
 */
export function discoverPackages(root: string): readonly string[] {
	const packages: string[] = []
	for (const entry of readdirSync(root, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue
		const directory = join(root, entry.name)
		const manifestPath = join(directory, 'package.json')
		if (!existsSync(manifestPath)) continue
		const text = attempt(() => readFileSync(manifestPath, 'utf8'))
		if (!text.success) continue
		const parsed = parseJSON(text.value)
		if (!isRecord(parsed)) continue
		const name = parsed.name
		if (typeof name === 'string' && name.startsWith('@orkestrel/')) packages.push(directory)
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
	return description.length > 0 ? description : undefined
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
export function catalogPackages(roots: readonly string[]): readonly CatalogEntry[] {
	const merged = new Map<string, CatalogEntry>()
	for (const root of roots) {
		for (const directory of discoverPackages(root)) {
			const text = attempt(() => readFileSync(join(directory, 'package.json'), 'utf8'))
			if (!text.success) continue
			const parsed = parseJSON(text.value)
			if (!isRecord(parsed)) continue
			const name = parsed.name
			if (typeof name !== 'string' || !name.startsWith('@orkestrel/')) continue
			const version = typeof parsed.version === 'string' ? parsed.version : DEFAULT_VERSION
			const short = name.slice('@orkestrel/'.length)
			const guidePath = join(directory, 'guides', 'src', `${short}.md`)
			let description = ''
			if (existsSync(guidePath)) {
				const guide = attempt(() => readFileSync(guidePath, 'utf8'))
				if (guide.success) description = guideToDescription(guide.value) ?? ''
			}
			merged.set(name, { name, version, description })
		}
	}
	return [...merged.values()].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
}
