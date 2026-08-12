import type { Snapshot } from '@src/core'
import type {
	HostManifest,
	ManifestEntry,
	WriteAnchor,
	WriteExpectation,
	WritePrecondition,
} from './types.js'
import { createHash } from 'node:crypto'
import {
	chmodSync,
	closeSync,
	constants,
	copyFileSync,
	fstatSync,
	lstatSync,
	mkdirSync,
	opendirSync,
	openSync,
	readlinkSync,
	readdirSync,
	readSync,
	realpathSync,
	writeFileSync,
} from 'node:fs'
import { basename, dirname, join, parse, relative, resolve, sep } from 'node:path'
import { attempt, holds, isError, parseJSONAs } from '@orkestrel/contract'
import {
	bytesToHex,
	EXECUTABLE_PATHS,
	HOST_PATHS,
	isCollection,
	isPath,
	MAX_ARTIFACT_BYTES,
	MAX_COLLECTION_ITEMS,
	MAX_MANIFEST_BYTES,
	MAX_TOTAL_ARTIFACT_BYTES,
	ScaffoldError,
} from '@src/core'
import { isFilesystemPath, isHostManifest } from './validators.js'
import { MANIFEST_NAME, MAX_INVENTORY_PATHS, MAX_PATH_DEPTH } from './constants.js'

/**
 * Test whether a caught filesystem error reports an absent path.
 *
 * @param error - The caught value.
 * @returns `true` only for an `Error` whose `code` is exactly `ENOENT`.
 *
 * @remarks
 * The one place absence is told apart from failure. Every read here answers
 * `undefined` or an empty result for a path that is not there and reports a path
 * that is there but unreadable, so the two must never be read from the same
 * caught value by eye. Total for any caught value, including a hostile one.
 *
 * @example
 * ```ts
 * import { matchesMissingPath } from '@orkestrel/scaffold/server'
 *
 * matchesMissingPath(Object.assign(new Error('gone'), { code: 'ENOENT' })) // true
 * matchesMissingPath(new Error('gone')) // false
 * ```
 */
export function matchesMissingPath(error: unknown): boolean {
	return holds(() => isError(error) && Reflect.get(error, 'code') === 'ENOENT')
}

/**
 * Test whether a path addresses a target's own repository metadata.
 *
 * @param path - The path to classify; either separator is read.
 * @returns `true` for `.git` and for anything beneath it.
 *
 * @remarks
 * The one home of the `.git` membership rule, read from two directions. A target
 * holding nothing but this directory is still vacant, because a checkout of an
 * empty repository is where a fresh workspace legitimately starts. A path
 * beneath it is never removed and never vendored, because deleting a target's
 * history is not a repair.
 *
 * @example
 * ```ts
 * import { matchesGitPath } from '@orkestrel/scaffold/server'
 *
 * matchesGitPath('.git') // true
 * matchesGitPath('.git/config') // true
 * matchesGitPath('.gitignore') // false
 * ```
 */
export function matchesGitPath(path: string): boolean {
	return /(?:^|\/)\.git(?:\/|$)/i.test(path.replaceAll('\\', '/'))
}

/**
 * Test whether a target-relative path is one no verb may delete.
 *
 * @param path - The target-relative path to classify.
 * @returns `true` when the path must survive every verb this package runs.
 *
 * @remarks
 * The deletion deny-list, stated as a rule over paths rather than as a list of
 * directories. It is the inversion the contract asks for: the candidate set
 * comes from an audit's foreign findings narrowed by what git tracks, and this
 * is what that set is then measured against. Repository metadata is protected
 * because losing history is not a repair, and a target's own `src` and `app`
 * trees are protected because a workspace's source is the one thing scaffold
 * never plans and never owns, whatever an audit reports about it.
 *
 * @example
 * ```ts
 * import { matchesProtectedPath } from '@orkestrel/scaffold/server'
 *
 * matchesProtectedPath('src/core/index.ts') // true
 * matchesProtectedPath('.git/config') // true
 * matchesProtectedPath('.claude/agents/rogue.md') // false
 * ```
 */
export function matchesProtectedPath(path: string): boolean {
	const normalized = path.replaceAll('\\', '/')
	if (matchesGitPath(normalized)) return true
	if (normalized === 'src' || normalized === 'app') return true
	return normalized.startsWith('src/') || normalized.startsWith('app/')
}

/**
 * Test whether a path names local configuration or a credential.
 *
 * @param path - The path to classify; either separator is read.
 * @returns `true` when the path must never be copied into a vendored host.
 *
 * @remarks
 * The vendoring deny-list. A host root is staged from a real checkout, so the
 * refusal is stated over the path rather than over the file's content: a
 * credential is recognizable by where it sits and what it is called long before
 * anything reads it. Repository metadata is included through
 * {@link matchesGitPath}, so one call answers the whole question and no caller
 * has to remember to ask twice.
 *
 * @example
 * ```ts
 * import { matchesSensitivePath } from '@orkestrel/scaffold/server'
 *
 * matchesSensitivePath('.npmrc') // true
 * matchesSensitivePath('.claude/settings.local.json') // true
 * matchesSensitivePath('.claude/settings.json') // false
 * ```
 */
export function matchesSensitivePath(path: string): boolean {
	const normalized = path.replaceAll('\\', '/')
	if (matchesGitPath(normalized)) return true
	return /(?:^|\/)(?:(?:\.ssh|\.aws|\.azure|\.docker|\.kube|\.gnupg|\.env(?:\.[^/]*)?)(?:\/|$)|(?:\.npmrc|\.pypirc|\.netrc|\.git-credentials|settings\.local\.json|auth\.json|credentials(?:\.json)?|application_default_credentials\.json|id_rsa|id_ed25519|kubeconfig)$|\.config\/(?:gh|gcloud)(?:\/|$)|\.local\/share\/keyrings(?:\/|$)|[^/]*service-account[^/]*\.json$|[^/]*\.(?:jks|key|p12|pem|pfx|pkcs12)$)/i.test(
		normalized,
	)
}

/**
 * Test whether a vendored path is one a target receives executable.
 *
 * @param path - The target-relative path to classify; either separator is read.
 * @returns `true` when the path is declared in {@link EXECUTABLE_PATHS}.
 *
 * @remarks
 * The declaration is the whole answer, and deliberately so. Reading the staging
 * host's mode instead makes the manifest depend on where the package was built:
 * Windows carries no executable bit, so a host staged there declares every entry
 * non-executable and every target it later fills receives hooks at `0644`. One
 * checkout stages one manifest on every host because this predicate never
 * consults the filesystem.
 *
 * @example
 * ```ts
 * import { matchesExecutablePath } from '@orkestrel/scaffold/server'
 *
 * matchesExecutablePath('scripts/codex.sh') // true
 * matchesExecutablePath('scripts\\deps.sh') // true
 * matchesExecutablePath('AGENTS.md') // false
 * ```
 */
export function matchesExecutablePath(path: string): boolean {
	return EXECUTABLE_PATHS.includes(path.replaceAll('\\', '/'))
}

/**
 * Project a target-relative path to the storage name a vendored host holds it under.
 *
 * @param path - The target-relative path the file is written to.
 * @returns The storage name beneath the host root.
 *
 * @remarks
 * A staged host is a plain directory that npm packs, and npm's own ignore rules
 * would drop a leading-dot entry from the tarball. So every dot that opens a
 * segment comes off, and a dotted file at the root moves under `dotfiles/` to
 * keep it from colliding with an undotted sibling of the same name. The mapping
 * is one direction only: a staged host's manifest records the destination each
 * storage name answers for, so the reader never re-derives this.
 *
 * @example
 * ```ts
 * import { pathToStorage } from '@orkestrel/scaffold/server'
 *
 * pathToStorage('.gitignore') // 'dotfiles/gitignore'
 * pathToStorage('.claude/rules/names.md') // 'claude/rules/names.md'
 * pathToStorage('AGENTS.md') // 'AGENTS.md'
 * ```
 */
export function pathToStorage(path: string): string {
	const segments = path.split('/')
	if (segments.length === 1) {
		return path.startsWith('.') ? `dotfiles/${path.slice(1)}` : path
	}
	return segments.map((segment) => (segment.startsWith('.') ? segment.slice(1) : segment)).join('/')
}

/**
 * Compute the SHA-256 digest of text.
 *
 * @param content - The text to digest.
 * @returns Sixty-four lowercase hexadecimal digits.
 *
 * @remarks
 * The identity the server face states, and the reason it differs from core's:
 * core settled on a folded 64-bit identity because compilation is synchronous by
 * contract and the only cryptographic digest a host-independent scope reaches is
 * asynchronous. A Node host reaches the real one synchronously, and
 * `HostManifest.digest` is documented as SHA-256, so this is what the server
 * uses everywhere a digest is claimed.
 *
 * @example
 * ```ts
 * import { computeDigest } from '@orkestrel/scaffold/server'
 *
 * computeDigest('hi\n') // '98ea6e4f216f2fb4b69fff9b3a44842c38686ca685f3f55dc48c5d3fb1107be4'
 * ```
 */
export function computeDigest(content: string): string {
	return createHash('sha256').update(content, 'utf8').digest('hex')
}

/**
 * Compute the digest of a vendored host's declared membership.
 *
 * @param entries - The ordered file membership declarations.
 * @param roots - The ordered directory membership declarations.
 * @returns The SHA-256 of that exact membership, in that exact order.
 *
 * @remarks
 * Independent of the manifest's own `digest` field, which is what lets a reader
 * detect a membership edit that did not update it. Order is part of the claim
 * rather than normalized away, because a staged manifest sorts its entries and
 * roots once and a reordered copy is a different file. Each entry is projected
 * to exactly the three declared fields, so a hand-added property cannot ride
 * into the digest and cannot change it either.
 *
 * @example
 * ```ts
 * import { computeManifestDigest } from '@orkestrel/scaffold/server'
 *
 * computeManifestDigest([], []) // the digest of the empty membership
 * ```
 */
export function computeManifestDigest(
	entries: readonly ManifestEntry[],
	roots: readonly string[],
): string {
	return computeDigest(
		JSON.stringify({
			entries: entries.map((entry) => ({
				storage: entry.storage,
				destination: entry.destination,
				executable: entry.executable,
			})),
			roots: [...roots],
		}),
	)
}

/**
 * Test whether a path is a physical file this package will read or replace.
 *
 * @param path - The resolved host path to inspect, without following links.
 * @returns `true` only for a regular file that is neither a link nor hard-linked
 * elsewhere.
 *
 * @remarks
 * The link tests are the point. A symbolic link is a path pointing somewhere
 * else, so writing through one writes outside the target; a hard link means a
 * second name shares the same bytes, so replacing them changes a file nobody
 * asked about. Both are refused rather than followed.
 *
 * @example
 * ```ts
 * import { isPhysicalFile } from '@orkestrel/scaffold/server'
 *
 * isPhysicalFile('/tmp/project/AGENTS.md') // true for a plain file
 * ```
 */
export function isPhysicalFile(path: string): boolean {
	const status = attempt(() => lstatSync(path))
	return (
		status.success &&
		status.value.isFile() &&
		!status.value.isSymbolicLink() &&
		status.value.nlink === 1
	)
}

/**
 * Test whether a path is a physical file with exact on-disk casing.
 *
 * @param path - The host path to inspect segment by segment.
 * @returns `true` only for a physical file whose requested segments exactly
 * match the names each parent directory stores.
 *
 * @remarks
 * A direct file lookup follows the host's case-folding rules on Windows and
 * common macOS filesystems. Reading each parent directory supplies the stored
 * names, so this predicate can enforce the package's exact-case structural
 * contract on every supported host.
 *
 * @example
 * ```ts
 * import { isExactCaseFile } from '@orkestrel/scaffold/server'
 *
 * isExactCaseFile('/tmp/project/src/bin/main.ts') // true only for that exact spelling
 * ```
 */
export function isExactCaseFile(path: string): boolean {
	const full = resolve(path)
	if (!isPhysicalFile(full)) return false
	const root = parse(full).root
	const segments = relative(root, full).split(sep)
	let parent = root
	for (const segment of segments) {
		const entries = attempt(() => readdirSync(parent))
		if (entries.success) {
			if (!entries.value.includes(segment)) return false
		} else {
			const actual = attempt(() => realpathSync.native(join(parent, segment)))
			if (!actual.success || basename(actual.value) !== segment) return false
		}
		parent = join(parent, segment)
	}
	return true
}

/**
 * Test whether a path is a physical directory this package will read or write into.
 *
 * @param path - The resolved host path to inspect, without following links.
 * @returns `true` only for a directory that is not a link.
 *
 * @remarks
 * A junction and a directory symbolic link both report as directories once
 * followed, so the inspection deliberately does not follow: a redirected
 * directory is refused here rather than silently accepted as the one the caller
 * named.
 *
 * @example
 * ```ts
 * import { isPhysicalDirectory } from '@orkestrel/scaffold/server'
 *
 * isPhysicalDirectory('/tmp/project') // true for a plain directory
 * ```
 */
export function isPhysicalDirectory(path: string): boolean {
	const status = attempt(() => lstatSync(path))
	return status.success && status.value.isDirectory() && !status.value.isSymbolicLink()
}

/**
 * Compute the SHA-256 digest of one file's exact bytes.
 *
 * @param path - The resolved host path to digest.
 * @returns The digest, or `undefined` when the path is not a physical file, is
 * past the artifact ceiling, or moved while it was being read.
 *
 * @remarks
 * Read in bounded chunks rather than loaded whole, so digesting a large file
 * costs one buffer instead of its size. The file's identity and size are
 * measured before and after the read and a mismatch answers `undefined`, so a
 * digest is either of one settled file or is not produced at all.
 *
 * @example
 * ```ts
 * import { computeFileDigest } from '@orkestrel/scaffold/server'
 *
 * computeFileDigest('/tmp/project/AGENTS.md') // the file's SHA-256
 * computeFileDigest('/tmp/project/absent.md') // undefined
 * ```
 */
export function computeFileDigest(path: string): string | undefined {
	if (!isPhysicalFile(path)) return undefined
	const opened = attempt(() => openSync(path, 'r'))
	if (!opened.success) return undefined
	const handle = opened.value
	const read = attempt(() => {
		const before = fstatSync(handle)
		if (!before.isFile() || before.nlink !== 1 || before.size > MAX_ARTIFACT_BYTES) return undefined
		const hash = createHash('sha256')
		const buffer = Buffer.alloc(65_536)
		let size = 0
		for (;;) {
			const length = readSync(handle, buffer, 0, buffer.byteLength, null)
			if (length === 0) break
			size += length
			if (size > MAX_ARTIFACT_BYTES) return undefined
			hash.update(buffer.subarray(0, length))
		}
		const after = fstatSync(handle)
		if (size !== before.size || after.size !== before.size || after.mtimeMs !== before.mtimeMs) {
			return undefined
		}
		return hash.digest('hex')
	})
	attempt(() => closeSync(handle))
	return read.success ? read.value : undefined
}

/**
 * Resolve a path through the real filesystem, keeping the part that does not exist yet.
 *
 * @param path - The absolute or relative host path to resolve.
 * @returns The lexical resolution of `path`, with its existing prefix then
 * resolved through every link, or `undefined` when the text is not a host path,
 * no bounded existing ancestor resolves, a link target cannot be read, a link
 * target carries a `..` segment, or an ancestor cannot be read.
 *
 * @remarks
 * A containment decision has to be made about a destination that does not exist
 * yet, and a lexical answer is not enough: a link anywhere in the existing
 * prefix moves the destination somewhere the text never named. So the deepest
 * existing ancestor is resolved and the remaining segments are re-joined onto
 * it. The climb is bounded by the path-depth ceiling, so an adversarial path
 * cannot make it walk indefinitely.
 *
 * The caller's own text is collapsed first, which is what `resolve` does with a
 * `..` the caller wrote: it cancels the segment before it as text, before any
 * link in that segment is read. So `<root>/hop/..` answers `<root>` even where
 * `hop` links elsewhere, rather than the directory holding what `hop` points at.
 * The collapse only ever shortens the caller's path, so nothing reaches outside
 * it by this; the answer is that lexical location resolved through links, not
 * the physical location the links lead to. {@link resolveContainedPath} passes
 * its `root` through here, so a root written with a parent segment is contained
 * against its collapsed spelling.
 *
 * `realpath` answers `ENOENT` both for a name that is not there and for a link
 * whose target is not there. The name is therefore inspected without following
 * it: a dangling link redirects the walk to its target, while a genuinely absent
 * name is retained as one segment of the unresolved suffix. A dangling link
 * target containing a `..` segment is refused. Resolving that target as one
 * lexical string could discard a preceding link before the filesystem gives
 * `..` its physical meaning.
 *
 * That target is split on both separators on every host, which is the reading
 * `isPath` already gives a planned path. A POSIX filename legally containing a
 * backslash is therefore refused with it: `weird\..\name` is one name to the
 * host and three segments here. The package keeps one separator law rather than
 * a host-dependent second one, and this is the conservative side of it.
 *
 * @example
 * ```ts
 * import { resolveRealPath } from '@orkestrel/scaffold/server'
 *
 * resolveRealPath('./packages/new/src') // the real path of `packages`, plus `new/src`
 * ```
 */
export function resolveRealPath(path: string): string | undefined {
	if (!isFilesystemPath(path)) return undefined
	let current = resolve(path)
	const pending: string[] = []
	for (let depth = 0; depth <= MAX_PATH_DEPTH; depth += 1) {
		const real = attempt(() => realpathSync(current))
		if (real.success) {
			let physical = real.value
			for (const segment of pending) physical = join(physical, segment)
			return physical
		}
		if (!matchesMissingPath(real.error)) return undefined
		const status = attempt(() => lstatSync(current))
		if (status.success) {
			if (!status.value.isSymbolicLink()) return undefined
			const target = attempt(() => readlinkSync(current))
			if (!target.success) return undefined
			if (target.value.split(/[\\/]/u).includes('..')) return undefined
			current = resolve(dirname(current), target.value)
			continue
		}
		if (!matchesMissingPath(status.error)) return undefined
		const parent = dirname(current)
		if (parent === current) return undefined
		pending.unshift(relative(parent, current))
		current = parent
	}
	return undefined
}

/**
 * Resolve a root-relative path and refuse one that leaves its root.
 *
 * @param root - The containing host directory.
 * @param path - The portable root-relative path.
 * @returns The destination as this package will address it, or `undefined` when
 * either argument is off contract or the destination lies outside `root`.
 *
 * @remarks
 * The containment law, and the one door every read in this module goes through.
 * Both sides are resolved through the real filesystem before they are compared.
 * A dangling link is followed only when its raw target contains no parent
 * traversal. The answer is then the lexical join of `root` and `path` — an
 * absolute path under `root`, not a root-relative one — so the caller operates
 * on the path it named rather than on a resolved form the target may not
 * recognize. A `root` written with a parent segment is collapsed by that
 * resolution before anything is read, so containment is measured against the
 * directory the caller's text names.
 *
 * Comparison is exact text, which fails closed on a case-insensitive
 * filesystem: a root and a path spelled with different case resolve to
 * different strings there and are refused, never wrongly admitted.
 *
 * The answer describes the namespace this call read. The contract excludes a
 * concurrent rename or link swap during the call or before the caller finishes
 * using the returned path. This helper returns a string, not a filesystem
 * handle, so it cannot bind its containment check to a later operation. A caller
 * that admits hostile concurrent namespace mutation needs a handle-bound
 * operation instead.
 *
 * @example
 * ```ts
 * import { resolveContainedPath } from '@orkestrel/scaffold/server'
 *
 * resolveContainedPath('/tmp/project', 'guides/router.md') // '/tmp/project/guides/router.md'
 * resolveContainedPath('/tmp/project', '../secrets') // undefined
 * ```
 */
export function resolveContainedPath(root: string, path: string): string | undefined {
	if (!isFilesystemPath(root) || !isPath(path)) return undefined
	const base = resolve(root)
	const destination = join(base, path)
	const physicalRoot = resolveRealPath(base)
	const physical = resolveRealPath(destination)
	if (physicalRoot === undefined || physical === undefined) return undefined
	if (physical !== physicalRoot && !physical.startsWith(physicalRoot + sep)) return undefined
	return destination
}

/**
 * Test whether a target is safe to write a fresh workspace into.
 *
 * @param target - The candidate target directory.
 * @returns `true` when the target is absent, empty, or holds nothing but its own
 * `.git` directory.
 *
 * @remarks
 * The green-field law. A checkout of an empty repository is where a new
 * workspace legitimately starts, so that one directory is admitted and nothing
 * else is; anything more means the caller is repairing a workspace rather than
 * creating one. Only the first two entries are read, so the answer costs the
 * same on an empty directory and on a full one.
 *
 * @example
 * ```ts
 * import { isVacant } from '@orkestrel/scaffold/server'
 *
 * isVacant('./packages/router-new') // true when absent, empty, or `.git` only
 * ```
 */
export function isVacant(target: string): boolean {
	if (!isFilesystemPath(target)) return false
	const status = attempt(() => lstatSync(target))
	if (!status.success) return matchesMissingPath(status.error)
	if (!status.value.isDirectory() || status.value.isSymbolicLink()) return false
	const opened = attempt(() => opendirSync(target))
	if (!opened.success) return false
	const handle = opened.value
	const read = attempt(() => {
		const first = handle.readSync()
		if (first === null) return true
		if (handle.readSync() !== null) return false
		return matchesGitPath(first.name) && first.isDirectory() && !first.isSymbolicLink()
	})
	attempt(() => handle.closeSync())
	return read.success && read.value
}

/**
 * List a directory's files as sorted root-relative paths.
 *
 * @param root - The directory to inventory.
 * @returns Every descendant file as a `/`-separated root-relative path, in
 * code-unit order, and `[]` when `root` is absent.
 * @throws `ScaffoldError('INVALID', …)` when `root` is not a host path.
 * @throws `ScaffoldError('TARGET', …)` when `root` is present but is not a
 * physical directory, cannot be read, holds a name this package could not plan,
 * or carries more entries or more nesting than one inventory may report.
 *
 * @remarks
 * A whole-tree answer throws where a single-path answer returns `undefined`, and
 * the reason is that a partial inventory reads exactly like a complete one. A
 * caller comparing a target against a plan would treat a truncated listing as
 * proof that the missing files are not there.
 *
 * Absence is the one exception: nothing to inventory is a complete answer, so it
 * is the empty list. Links are listed as files rather than followed, so no
 * traversal can leave the root and no cycle can form.
 *
 * @example
 * ```ts
 * import { listFiles } from '@orkestrel/scaffold/server'
 *
 * listFiles('./dist/host') // ['AGENTS.md', 'CLAUDE.md', 'LICENSE', …]
 * ```
 */
export function listFiles(root: string): readonly string[] {
	if (!isFilesystemPath(root)) {
		throw new ScaffoldError('INVALID', 'Listing root is not a host path', { root })
	}
	const status = attempt(() => lstatSync(root))
	if (!status.success) {
		if (matchesMissingPath(status.error)) return []
		throw new ScaffoldError('TARGET', `Listing root cannot be inspected at ${root}`, {
			root,
			error: status.error,
		})
	}
	if (!status.value.isDirectory() || status.value.isSymbolicLink()) {
		throw new ScaffoldError('TARGET', `Listing root is not a physical directory at ${root}`, {
			root,
		})
	}
	const files: string[] = []
	const pending = [{ full: root, path: '', depth: 0 }]
	let visited = 0
	while (pending.length > 0) {
		const current = pending.pop()
		if (current === undefined) break
		const opened = attempt(() => opendirSync(current.full))
		if (!opened.success) {
			throw new ScaffoldError('TARGET', `Listing directory cannot be read at ${current.full}`, {
				root,
				path: current.path,
				error: opened.error,
			})
		}
		const handle = opened.value
		const walked = attempt(() => {
			for (;;) {
				const entry = handle.readSync()
				if (entry === null) break
				visited += 1
				if (visited > MAX_INVENTORY_PATHS) {
					throw new ScaffoldError('TARGET', 'Listing exceeds the paths one inventory may report', {
						root,
						limit: MAX_INVENTORY_PATHS,
					})
				}
				const path = current.path === '' ? entry.name : `${current.path}/${entry.name}`
				if (!isPath(path)) {
					throw new ScaffoldError(
						'TARGET',
						`Listing found a path this package cannot plan at ${path}`,
						{
							root,
							path,
						},
					)
				}
				if (!entry.isDirectory() || entry.isSymbolicLink()) {
					files.push(path)
					continue
				}
				const depth = current.depth + 1
				if (depth >= MAX_PATH_DEPTH) {
					throw new ScaffoldError(
						'TARGET',
						`Listing exceeds the depth one path may carry at ${path}`,
						{
							root,
							path,
							limit: MAX_PATH_DEPTH,
						},
					)
				}
				pending.push({ full: join(current.full, entry.name), path, depth })
			}
		})
		attempt(() => handle.closeSync())
		if (!walked.success) throw walked.error
	}
	return files.sort()
}

/**
 * List a directory's descendant directories as sorted root-relative paths.
 *
 * @param root - The directory to inventory.
 * @returns Every descendant directory as a `/`-separated root-relative path, in
 * code-unit order, and `[]` when `root` is absent.
 * @throws `ScaffoldError('INVALID', …)` when `root` is not a host path.
 * @throws `ScaffoldError('TARGET', …)` when `root` is present but is not a
 * physical directory, cannot be read, holds a name this package could not plan,
 * or carries more entries or more nesting than one inventory may report.
 *
 * @remarks
 * The sibling of {@link listFiles}, under the same bounds and the same refusals,
 * and it exists because a directory holding no file is invisible to a file walk.
 * That is the half a vendored host's `roots` declares and the half a file
 * inventory cannot check, so a stager needs both walks to state a complete
 * membership.
 *
 * `root` itself is not listed, because the answer is root-relative and the root
 * has no root-relative name. A redirected directory is not listed and is not
 * walked into, so no traversal can leave the root and no cycle can form.
 *
 * @example
 * ```ts
 * import { listDirectories } from '@orkestrel/scaffold/server'
 *
 * listDirectories('./.claude') // ['agents', 'rules', 'skills', …]
 * ```
 */
export function listDirectories(root: string): readonly string[] {
	if (!isFilesystemPath(root)) {
		throw new ScaffoldError('INVALID', 'Listing root is not a host path', { root })
	}
	const status = attempt(() => lstatSync(root))
	if (!status.success) {
		if (matchesMissingPath(status.error)) return []
		throw new ScaffoldError('TARGET', `Listing root cannot be inspected at ${root}`, {
			root,
			error: status.error,
		})
	}
	if (!status.value.isDirectory() || status.value.isSymbolicLink()) {
		throw new ScaffoldError('TARGET', `Listing root is not a physical directory at ${root}`, {
			root,
		})
	}
	const directories: string[] = []
	const pending = [{ full: root, path: '', depth: 0 }]
	let visited = 0
	while (pending.length > 0) {
		const current = pending.pop()
		if (current === undefined) break
		const opened = attempt(() => opendirSync(current.full))
		if (!opened.success) {
			throw new ScaffoldError('TARGET', `Listing directory cannot be read at ${current.full}`, {
				root,
				path: current.path,
				error: opened.error,
			})
		}
		const handle = opened.value
		const walked = attempt(() => {
			for (;;) {
				const entry = handle.readSync()
				if (entry === null) break
				visited += 1
				if (visited > MAX_INVENTORY_PATHS) {
					throw new ScaffoldError('TARGET', 'Listing exceeds the paths one inventory may report', {
						root,
						limit: MAX_INVENTORY_PATHS,
					})
				}
				const path = current.path === '' ? entry.name : `${current.path}/${entry.name}`
				if (!isPath(path)) {
					throw new ScaffoldError(
						'TARGET',
						`Listing found a path this package cannot plan at ${path}`,
						{
							root,
							path,
						},
					)
				}
				if (!entry.isDirectory() || entry.isSymbolicLink()) continue
				const depth = current.depth + 1
				if (depth >= MAX_PATH_DEPTH) {
					throw new ScaffoldError(
						'TARGET',
						`Listing exceeds the depth one path may carry at ${path}`,
						{
							root,
							path,
							limit: MAX_PATH_DEPTH,
						},
					)
				}
				directories.push(path)
				pending.push({ full: join(current.full, entry.name), path, depth })
			}
		})
		attempt(() => handle.closeSync())
		if (!walked.success) throw walked.error
	}
	return directories.sort()
}

/**
 * Read one contained file as its exact bytes in lowercase hexadecimal.
 *
 * @param root - The containing host directory.
 * @param path - The portable root-relative file path.
 * @param limit - The most bytes this read accepts; the artifact ceiling by default.
 * @returns The exact bytes as hexadecimal, or `undefined` when the file is
 * absent, is not a physical readable file, is past `limit`, or moved while it
 * was being read.
 * @throws `ScaffoldError('INVALID', …)` when the arguments are off contract or
 * `path` leaves `root`.
 *
 * @remarks
 * Hexadecimal rather than text, because this is what a byte comparison is stated
 * in everywhere in this package: a plan's artifact, an audit finding, and a
 * snapshot all compare as the same digits. The file's identity and size are
 * measured before and after the read, and one extra byte is requested past the
 * declared size, so a file that grew or was replaced mid-read answers
 * `undefined` rather than half of two files.
 *
 * @example
 * ```ts
 * import { readFileHex } from '@orkestrel/scaffold/server'
 *
 * readFileHex('/tmp/project', 'AGENTS.md') // '2320416765…'
 * ```
 */
export function readFileHex(
	root: string,
	path: string,
	limit: number = MAX_ARTIFACT_BYTES,
): string | undefined {
	if (!Number.isSafeInteger(limit) || limit < 0 || limit > MAX_ARTIFACT_BYTES) {
		throw new ScaffoldError('INVALID', `Byte limit is outside the artifact ceiling at ${path}`, {
			root,
			path,
			limit,
		})
	}
	const full = resolveContainedPath(root, path)
	if (full === undefined) {
		throw new ScaffoldError('INVALID', `Path is off contract or leaves its root at ${path}`, {
			root,
			path,
		})
	}
	if (!isPhysicalFile(full)) return undefined
	const opened = attempt(() => openSync(full, 'r'))
	if (!opened.success) return undefined
	const handle = opened.value
	const read = attempt(() => {
		const before = fstatSync(handle)
		if (!before.isFile() || before.nlink !== 1 || before.size > limit) return undefined
		const bytes = Buffer.alloc(before.size)
		let offset = 0
		while (offset < bytes.byteLength) {
			const length = readSync(handle, bytes, offset, bytes.byteLength - offset, offset)
			if (length === 0) break
			offset += length
		}
		const overflow = readSync(handle, Buffer.alloc(1), 0, 1, offset)
		const after = fstatSync(handle)
		if (
			offset !== bytes.byteLength ||
			overflow !== 0 ||
			after.size !== before.size ||
			after.mtimeMs !== before.mtimeMs
		) {
			return undefined
		}
		return bytesToHex(bytes)
	})
	attempt(() => closeSync(handle))
	return read.success ? read.value : undefined
}

/**
 * Read one contained file as bounded UTF-8 text.
 *
 * @param root - The containing host directory.
 * @param path - The portable root-relative file path.
 * @param limit - The most bytes this read accepts; the artifact ceiling by default.
 * @returns The decoded text, or `undefined` when {@link readFileHex} answers
 * nothing or the bytes are not valid UTF-8.
 * @throws `ScaffoldError('INVALID', …)` when the arguments are off contract or
 * `path` leaves `root`.
 *
 * @remarks
 * Decoding is strict, so a file carrying an invalid sequence answers `undefined`
 * rather than text carrying replacement characters. That matters because the
 * text is parsed next: a manifest silently repaired into valid JSON by lossy
 * decoding would be trusted.
 *
 * @example
 * ```ts
 * import { readFileText } from '@orkestrel/scaffold/server'
 *
 * readFileText('/tmp/project', 'package.json') // '{ "name": "@orkestrel/router", … }'
 * ```
 */
export function readFileText(
	root: string,
	path: string,
	limit: number = MAX_ARTIFACT_BYTES,
): string | undefined {
	const hex = readFileHex(root, path, limit)
	if (hex === undefined) return undefined
	const decoded = attempt(() =>
		new TextDecoder('utf-8', { fatal: true }).decode(Buffer.from(hex, 'hex')),
	)
	return decoded.success ? decoded.value : undefined
}

/**
 * Read a target's current bytes at the paths a plan claims.
 *
 * @param target - The target directory to read.
 * @param paths - The plan-relative paths to probe.
 * @returns One entry per path that is there: a file maps to its exact bytes as
 * hexadecimal and a directory maps to `''`, which records presence with no bytes
 * to compare. An absent path is omitted.
 * @throws `ScaffoldError('INVALID', …)` when `target` is not a host path or
 * `paths` is not a bounded list of plannable paths.
 * @throws `ScaffoldError('TARGET', …)` when a path that is there cannot be read,
 * or when the whole read would retain more bytes than one plan may.
 *
 * @remarks
 * The one door from a real directory into the vocabulary an audit compares in.
 * Absence is omission rather than an empty value, because core reads a missing
 * key as a missing destination and an empty string as a present directory; the
 * two are different verdicts. A path that is there but unreadable throws instead
 * of being omitted, because omission would report it as missing and a repair
 * would then overwrite whatever is actually sitting there.
 *
 * @example
 * ```ts
 * import { readSnapshot } from '@orkestrel/scaffold/server'
 *
 * readSnapshot('./packages/router', ['package.json', 'guides'])
 * // { 'package.json': '7b226e…', guides: '' }
 * ```
 */
export function readSnapshot(target: string, paths: readonly string[]): Snapshot {
	if (!isFilesystemPath(target)) {
		throw new ScaffoldError('INVALID', 'Snapshot target is not a host path', { target })
	}
	if (!isCollection(paths) || !paths.every((path) => isPath(path))) {
		throw new ScaffoldError('INVALID', 'Snapshot paths are not a bounded list of plannable paths', {
			target,
			limit: MAX_COLLECTION_ITEMS,
		})
	}
	let remaining = MAX_TOTAL_ARTIFACT_BYTES
	const snapshot: Record<string, string> = {}
	for (const path of paths) {
		const full = resolveContainedPath(target, path)
		if (full === undefined) {
			throw new ScaffoldError('INVALID', `Snapshot path leaves its target at ${path}`, {
				target,
				path,
			})
		}
		const status = attempt(() => lstatSync(full))
		if (!status.success) {
			if (matchesMissingPath(status.error)) continue
			throw new ScaffoldError('TARGET', `Snapshot path cannot be inspected at ${path}`, {
				target,
				path,
				error: status.error,
			})
		}
		if (isPhysicalDirectory(full)) {
			snapshot[path] = ''
			continue
		}
		const hex = readFileHex(target, path, Math.min(MAX_ARTIFACT_BYTES, remaining))
		if (hex === undefined) {
			throw new ScaffoldError('TARGET', `Snapshot path is not a readable file at ${path}`, {
				target,
				path,
				limit: MAX_TOTAL_ARTIFACT_BYTES,
			})
		}
		remaining -= hex.length / 2
		snapshot[path] = hex
	}
	return snapshot
}

/**
 * Read a vendored host's manifest, when it carries one.
 *
 * @param host - The vendored host root to read.
 * @returns The manifest, or `undefined` when the host carries none.
 * @throws `ScaffoldError('INVALID', …)` when `host` is not a host path.
 * @throws `ScaffoldError('TARGET', …)` when the manifest is there but cannot be
 * read, is not the declared shape, or does not match its own membership.
 *
 * @remarks
 * The two failures are held apart deliberately. A host with no manifest is a
 * raw checkout, and a caller reads it by mapping each path one to one. A host
 * with a manifest that does not verify is a staged host that has been edited,
 * and answering `undefined` there would degrade it to that same one-to-one
 * mapping — which is how an edited manifest would get a caller to read files it
 * never declared. So absence answers and corruption throws.
 *
 * Verification here is the manifest's own self-consistency: the digest against
 * the exact membership beside it. Whether that membership matches the files
 * actually stored is a separate question, and it belongs to the reader that
 * walks the host.
 *
 * @example
 * ```ts
 * import { readHostManifest } from '@orkestrel/scaffold/server'
 *
 * readHostManifest('./dist/host') // the manifest, or undefined for a raw root
 * ```
 */
export function readHostManifest(host: string): HostManifest | undefined {
	if (!isFilesystemPath(host)) {
		throw new ScaffoldError('INVALID', 'Host root is not a host path', { host })
	}
	// The reserved metadata name a staged host writes at its own root.
	const name = MANIFEST_NAME
	const full = resolveContainedPath(host, name)
	if (full === undefined) {
		throw new ScaffoldError('INVALID', `Host manifest leaves its root at ${host}`, { host })
	}
	const status = attempt(() => lstatSync(full))
	if (!status.success) {
		if (matchesMissingPath(status.error)) return undefined
		throw new ScaffoldError('TARGET', `Host manifest cannot be inspected at ${full}`, {
			host,
			error: status.error,
		})
	}
	const text = readFileText(host, name, MAX_MANIFEST_BYTES)
	if (text === undefined) {
		throw new ScaffoldError('TARGET', `Host manifest is not readable text at ${full}`, { host })
	}
	const manifest = parseJSONAs(text, isHostManifest)
	if (manifest === undefined) {
		throw new ScaffoldError('TARGET', `Host manifest is malformed at ${full}`, { host })
	}
	if (manifest.digest !== computeManifestDigest(manifest.entries, manifest.roots)) {
		throw new ScaffoldError('TARGET', `Host manifest membership is corrupted at ${full}`, { host })
	}
	return manifest
}

/**
 * Derive one vendored-host manifest entry from a file in a checkout.
 *
 * @param destination - The target-relative path the file is written to.
 * @param source - The resolved host path the bytes are read from.
 * @returns The entry, or `undefined` when `source` is not a physical file this
 * package will vendor or carries more bytes than one artifact may.
 *
 * @remarks
 * The one place the three declared fields are decided together, because they are
 * three readings of one path: {@link pathToStorage} decides where it is stored,
 * the destination is the path it answers for, and {@link matchesExecutablePath}
 * decides whether a target receives it executable.
 *
 * The bit is read from that declaration rather than from the source's mode, so
 * the entry does not depend on where the package was staged. A Windows host
 * reports no executable bit at all, and reading the mode there declared every
 * entry non-executable and shipped consumers hooks they could not run.
 *
 * @example
 * ```ts
 * import { readManifestEntry } from '@orkestrel/scaffold/server'
 *
 * readManifestEntry('.gitignore', '/tmp/checkout/.gitignore')
 * // { storage: 'dotfiles/gitignore', destination: '.gitignore', executable: false }
 * ```
 */
export function readManifestEntry(destination: string, source: string): ManifestEntry | undefined {
	if (!isPhysicalFile(source)) return undefined
	const status = attempt(() => lstatSync(source))
	if (!status.success || status.value.size > MAX_ARTIFACT_BYTES) return undefined
	return {
		storage: pathToStorage(destination),
		destination,
		executable: matchesExecutablePath(destination),
	}
}

/**
 * Stage a vendored host root from a real checkout.
 *
 * @param checkout - The checkout the vendored paths are read from.
 * @param host - The vendored host root to fill; it must be absent or empty.
 * @returns One entry per staged file, sorted by storage name.
 * @throws `ScaffoldError('INVALID', …)` when either argument is not a host path
 * or a vendored path leaves the checkout or the host root.
 * @throws `ScaffoldError('TARGET', …)` when the checkout is not a directory, the
 * host root is not vacant, the checkout does not carry every vendored path, two
 * vendored files claim one storage name, a vendored file is not a plain file
 * within the artifact ceiling, or the staged manifest does not read back.
 * @throws `ScaffoldError('WRITE', …)` when a staged file or the manifest cannot
 * be written.
 *
 * @remarks
 * This is the producer half of the vendored host, and it is not the mutation
 * contract `MaterializerInterface` states. That contract owns **target**
 * writes: it materializes a compiled plan into a consumer's workspace, binds
 * every destination to what the caller observed, and rolls a failed commit back.
 * This reads this package's own checkout at build time and fills its own build
 * output. Different direction, different lifetime, no consumer target involved,
 * so the two do not overlap and neither one belongs inside the other.
 *
 * Staging is plain rather than transactional for the same reason. A
 * `WriteTransaction` exists to hold a directory that already holds work
 * still; a build output holds nothing, is deleted whole before every build, and
 * has no concurrent reader. What replaces it is refusing early and ordering the
 * writes: the whole membership is derived before anything is created, so a
 * checkout this refuses leaves no host root at all, and `manifest.json` is
 * written last, so a stage that failed part way through leaves a root every
 * reader treats as a raw checkout and fails loudly on.
 *
 * A missing vendored path is refused rather than staged around. A partial root
 * is not detectably partial: it fails later, in a consumer's terminal, on
 * whichever path the plan reached first. Refusing here fails the build that
 * produced it, where the maintainer can act, and it names every missing path at
 * once. A directory is the same case — declaring an absent directory as an empty
 * root would create an empty directory in every generated workspace.
 *
 * The vendoring deny-list applies to what the walk discovers beneath a vendored
 * directory, where a maintainer's local credential can legitimately sit, and
 * such a path is skipped. A path `HOST_PATHS` names itself is curated data
 * rather than discovery, so it is staged or the stage is refused.
 *
 * @example
 * ```ts
 * import { stageHost } from '@orkestrel/scaffold/server'
 *
 * stageHost(process.cwd(), 'dist/host').length // the files staged
 * ```
 */
export function stageHost(checkout: string, host: string): readonly ManifestEntry[] {
	if (!isFilesystemPath(checkout)) {
		throw new ScaffoldError('INVALID', 'Staging checkout is not a host path', { checkout })
	}
	if (!isFilesystemPath(host)) {
		throw new ScaffoldError('INVALID', 'Staging host root is not a host path', { host })
	}
	const source = resolve(checkout)
	if (!isPhysicalDirectory(source)) {
		throw new ScaffoldError('TARGET', `Staging checkout is not a physical directory at ${source}`, {
			checkout: source,
		})
	}
	if (!isVacant(host)) {
		throw new ScaffoldError('TARGET', `Staging host root is not vacant at ${host}`, { host })
	}
	const vendored: string[] = []
	const roots: string[] = []
	const missing: string[] = []
	for (const path of HOST_PATHS) {
		const full = resolveContainedPath(source, path)
		if (full === undefined) {
			throw new ScaffoldError('INVALID', `Vendored path leaves its checkout at ${path}`, {
				checkout: source,
				path,
			})
		}
		if (isPhysicalFile(full)) {
			vendored.push(path)
			continue
		}
		if (!isPhysicalDirectory(full)) {
			missing.push(path)
			continue
		}
		roots.push(path)
		for (const nested of listDirectories(full)) {
			const rooted = `${path}/${nested}`
			if (!matchesSensitivePath(rooted)) roots.push(rooted)
		}
		for (const name of listFiles(full)) {
			const destination = `${path}/${name}`
			if (!matchesSensitivePath(destination)) vendored.push(destination)
		}
	}
	if (missing.length > 0) {
		throw new ScaffoldError('TARGET', 'The checkout does not carry every vendored path', {
			checkout: source,
			missing,
		})
	}
	// Seeded with the reserved metadata name a staged host writes at its own root,
	// the same literal `readHostManifest` reads back, so a vendored file claiming it
	// is refused rather than silently replaced by the manifest.
	const stored = new Set<string>([MANIFEST_NAME])
	const entries: ManifestEntry[] = []
	for (const destination of vendored) {
		const full = resolveContainedPath(source, destination)
		if (full === undefined) {
			throw new ScaffoldError('INVALID', `Vendored path leaves its checkout at ${destination}`, {
				checkout: source,
				path: destination,
			})
		}
		const entry = readManifestEntry(destination, full)
		if (entry === undefined) {
			throw new ScaffoldError(
				'TARGET',
				`Vendored path is not a plain file within the artifact ceiling at ${destination}`,
				{ checkout: source, path: destination, limit: MAX_ARTIFACT_BYTES },
			)
		}
		if (stored.has(entry.storage)) {
			throw new ScaffoldError(
				'TARGET',
				`Two vendored paths claim the storage name ${entry.storage}`,
				{ checkout: source, path: destination, storage: entry.storage },
			)
		}
		stored.add(entry.storage)
		entries.push(entry)
	}
	entries.sort((first, second) => (first.storage < second.storage ? -1 : 1))
	roots.sort()
	const root = resolve(host)
	const established = attempt(() => mkdirSync(root, { recursive: true }))
	if (!established.success || !isPhysicalDirectory(root)) {
		throw new ScaffoldError('WRITE', `Staging host root could not be established at ${root}`, {
			host: root,
			...(established.success ? {} : { error: established.error }),
		})
	}
	for (const entry of entries) {
		const origin = resolveContainedPath(source, entry.destination)
		const destination = resolveContainedPath(root, entry.storage)
		if (origin === undefined || destination === undefined) {
			throw new ScaffoldError('INVALID', `Vendored path leaves its root at ${entry.destination}`, {
				checkout: source,
				host: root,
				path: entry.destination,
				storage: entry.storage,
			})
		}
		const copied = attempt(() => {
			mkdirSync(dirname(destination), { recursive: true })
			copyFileSync(origin, destination, constants.COPYFILE_EXCL)
			if (entry.executable) chmodSync(destination, 0o755)
		})
		if (!copied.success) {
			throw new ScaffoldError('WRITE', `Vendored file could not be staged at ${entry.storage}`, {
				host: root,
				storage: entry.storage,
				error: copied.error,
			})
		}
	}
	const manifest: HostManifest = {
		entries,
		roots,
		digest: computeManifestDigest(entries, roots),
	}
	const metadata = resolveContainedPath(root, MANIFEST_NAME)
	if (metadata === undefined) {
		throw new ScaffoldError('INVALID', `Host manifest leaves its root at ${root}`, { host: root })
	}
	const published = attempt(() =>
		writeFileSync(metadata, `${JSON.stringify(manifest, null, '\t')}\n`, {
			encoding: 'utf8',
			flag: 'wx',
		}),
	)
	if (!published.success) {
		throw new ScaffoldError('WRITE', `Host manifest could not be staged at ${metadata}`, {
			host: root,
			error: published.error,
		})
	}
	const verified = readHostManifest(root)
	if (verified === undefined || verified.digest !== manifest.digest) {
		throw new ScaffoldError('TARGET', `The staged host manifest does not read back at ${root}`, {
			host: root,
		})
	}
	return entries
}

/**
 * Capture one directory's physical identity.
 *
 * @param path - The resolved directory path to capture.
 * @returns The anchor, or `undefined` when the path is not a physical directory.
 *
 * @remarks
 * Device and inode rather than the path, because the path is the thing that can
 * be swapped underneath a write. An anchor captured before a mutation and
 * checked again after it proves the directory written into sits where the
 * inspected one sat, not that it is the one that was inspected.
 *
 * @example
 * ```ts
 * import { readAnchor } from '@orkestrel/scaffold/server'
 *
 * readAnchor('/tmp/project') // { path: '/tmp/project', device: 1, inode: 2 }
 * ```
 */
export function readAnchor(path: string): WriteAnchor | undefined {
	const status = attempt(() => lstatSync(path))
	if (!status.success || !status.value.isDirectory() || status.value.isSymbolicLink()) {
		return undefined
	}
	return { path, device: status.value.dev, inode: status.value.ino }
}

/**
 * Test whether a captured directory is still the same directory.
 *
 * @param anchor - The identity captured earlier.
 * @returns `true` when the path still holds a physical directory of that exact
 * device and inode.
 *
 * @remarks
 * This binds location rather than history. `true` means the path still resolves
 * to the same physical directory on the same device, so the next write lands
 * where the last one did. A path now holding nothing, a file, or a symlink
 * answers `false`; a directory swapped in by `rename` also answers `false`
 * because the replacement carries its own inode. A directory deleted and made
 * again under the same name can receive the old inode back and answers `true`,
 * which nothing here detects.
 *
 * @example
 * ```ts
 * import { matchesAnchor, readAnchor } from '@orkestrel/scaffold/server'
 *
 * const anchor = readAnchor('/tmp/project')
 * anchor !== undefined && matchesAnchor(anchor) // true while it is untouched
 * ```
 */
export function matchesAnchor(anchor: WriteAnchor): boolean {
	const current = readAnchor(anchor.path)
	return current !== undefined && current.device === anchor.device && current.inode === anchor.inode
}

/**
 * Capture what one destination holds before a write.
 *
 * @param path - The resolved destination path to capture.
 * @returns The expectation, or `undefined` when the destination is a link or a
 * shape this package will not write over.
 *
 * @remarks
 * Absence is a captured state rather than a failure, because most writes expect
 * exactly that. Each shape carries only the facts it supplies: a directory
 * carries its identity, a file carries its identity, size, and bytes, and an
 * absent destination carries nothing at all. A file past the artifact ceiling
 * carries no digest and is bound by its identity, size, and modification time
 * alone, which is the strongest honest claim about bytes nobody read.
 *
 * @example
 * ```ts
 * import { readExpectation } from '@orkestrel/scaffold/server'
 *
 * readExpectation('/tmp/project/absent.md') // { path: …, shape: 'absent' }
 * ```
 */
export function readExpectation(path: string): WriteExpectation | undefined {
	const status = attempt(() => lstatSync(path))
	if (!status.success) {
		return matchesMissingPath(status.error) ? { path, shape: 'absent' } : undefined
	}
	const stats = status.value
	if (stats.isSymbolicLink()) return undefined
	if (stats.isDirectory()) {
		return {
			path,
			shape: 'directory',
			device: stats.dev,
			inode: stats.ino,
			modified: stats.mtimeMs,
		}
	}
	if (!stats.isFile() || stats.nlink !== 1) return undefined
	const digest = computeFileDigest(path)
	return {
		path,
		shape: 'file',
		device: stats.dev,
		inode: stats.ino,
		modified: stats.mtimeMs,
		size: stats.size,
		...(digest === undefined ? {} : { digest }),
	}
}

/**
 * Test whether a destination still holds what was captured of it.
 *
 * @param expectation - The state captured earlier.
 * @returns `true` when re-reading the destination now produces that same state.
 *
 * @remarks
 * Compared field for field against a fresh {@link readExpectation}, so an
 * expectation recorded without a digest matches only a destination that still
 * has no digest to give. That is what keeps the comparison honest in both
 * directions: nothing is treated as satisfied because it was never measured.
 *
 * @example
 * ```ts
 * import { matchesExpectation, readExpectation } from '@orkestrel/scaffold/server'
 *
 * const expectation = readExpectation('/tmp/project/AGENTS.md')
 * expectation !== undefined && matchesExpectation(expectation) // true while untouched
 * ```
 */
export function matchesExpectation(expectation: WriteExpectation): boolean {
	const current = readExpectation(expectation.path)
	if (current === undefined) return false
	return (
		current.shape === expectation.shape &&
		current.device === expectation.device &&
		current.inode === expectation.inode &&
		current.modified === expectation.modified &&
		current.size === expectation.size &&
		current.digest === expectation.digest
	)
}

/**
 * Test whether a destination still matches the narrower state a caller observed.
 *
 * @param precondition - The caller-observed state the write is held to.
 * @returns `true` when the destination is absent as stated, or holds a physical
 * file whose bytes digest to the stated value.
 *
 * @remarks
 * Narrower than {@link matchesExpectation} on purpose. A caller observed bytes,
 * not inodes and timestamps, so binding a write to a device identity it never
 * saw would refuse writes that are perfectly safe — a file rewritten to
 * identical bytes by an editor is still the file the caller read. A precondition
 * that states no digest claims presence only.
 *
 * @example
 * ```ts
 * import { matchesPrecondition } from '@orkestrel/scaffold/server'
 *
 * matchesPrecondition({ path: '/tmp/project/new.md', shape: 'absent' }) // true while absent
 * ```
 */
export function matchesPrecondition(precondition: WritePrecondition): boolean {
	const status = attempt(() => lstatSync(precondition.path))
	if (!status.success) {
		return precondition.shape === 'absent' && matchesMissingPath(status.error)
	}
	if (precondition.shape !== 'file' || !isPhysicalFile(precondition.path)) return false
	if (precondition.digest === undefined) return true
	return computeFileDigest(precondition.path) === precondition.digest
}
