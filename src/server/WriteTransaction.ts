import type {
	WriteAnchor,
	WriteDirectoryResult,
	WriteExpectation,
	WritePrecondition,
} from './types.js'
import { randomUUID } from 'node:crypto'
import {
	chmodSync,
	constants,
	copyFileSync,
	linkSync,
	mkdirSync,
	renameSync,
	rmdirSync,
	rmSync,
	writeFileSync,
} from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { attempt } from '@orkestrel/contract'
import { isCollection, isPath, ScaffoldError } from '@src/core'
import {
	computeDigest,
	computeFileDigest,
	isPhysicalFile,
	matchesAnchor,
	matchesExpectation,
	matchesMissingPath,
	matchesPrecondition,
	readAnchor,
	readExpectation,
	resolveContainedPath,
} from './helpers.js'
import { isFilesystemPath } from './validators.js'
import { MAX_PATH_DEPTH } from './constants.js'

/**
 * One staged, reversible mutation of one target directory.
 *
 * @remarks
 * The transaction owns a private root beside the target — a sibling directory on
 * the same volume, so every promotion is a rename rather than a copy. Staging
 * writes go into that root and nothing else, so a call that fails while staging
 * has not touched the target at all. Commit is the only step that mutates the
 * target, and it is the only step that can need rolling back.
 *
 * Two bindings hold a destination still. A **precondition** is what the caller
 * observed earlier and is checked once, at construction, so a target that moved
 * between the caller's read and this transaction fails before anything is
 * created. An **expectation** is captured here, at construction, and re-checked
 * at commit, so a target that moves while the write is being staged fails before
 * anything is promoted.
 *
 * What this provides, exactly:
 *
 * - **Across destinations, staged-then-swapped with rollback on a caught
 *   failure.** A failure part way through commit restores every destination it
 *   already promoted, restores every file it already took, and removes every
 *   directory it created, then reports what recovery could not undo. This is
 *   measured: a promotion is driven to fail after an earlier one landed, and the
 *   earlier destination is read back.
 * - **No partly written destination.** Every file is written whole into the
 *   private root and digested there before commit, so a destination never
 *   receives bytes that were still being produced.
 * - **Containment, not continuity, of the directories it creates.** Every
 *   ancestor is re-read between `mkdir` calls and again before the first
 *   promotion, so an ancestor that became a file, a symlink, a directory
 *   elsewhere, or nothing is refused. An ancestor deleted and recreated under
 *   the same name can receive its old inode back and is indistinguishable here
 *   from one that never moved.
 * - **No crash atomicity across destinations.** A process killed between two
 *   promotions leaves the target holding some new files and some old ones, and
 *   leaves the private root behind. Nothing here is a journal, and the private
 *   root's name is the only record a later run could read.
 *
 * A destination is preserved by hard link and then replaced by a single
 * `rename`, rather than moved aside and replaced, so the path continues to name
 * the old file right up to the swap. That is a property of `rename` on the host,
 * not one this package's tests measure: telling it apart from move-then-replace
 * needs a reader observing the destination inside the swap, and no test here
 * does that. Read the claim as the mechanism it describes, not as a proven
 * guarantee about a concurrent reader.
 *
 * A path names a file this transaction writes, takes, or establishes as a
 * directory; every path is target-relative and is measured by the portable-path
 * law. An expectation and a precondition both name the resolved destination
 * instead, because that is the path each is re-read at.
 *
 * @example
 * ```ts
 * import { WriteTransaction } from '@orkestrel/scaffold/server'
 *
 * const transaction = new WriteTransaction('./packages/router', ['AGENTS.md'])
 * try {
 * 	transaction.write('AGENTS.md', '# Agents\n')
 * 	transaction.commit() // ['AGENTS.md']
 * } finally {
 * 	transaction.discard()
 * }
 * ```
 */
export class WriteTransaction {
	readonly #target: string
	readonly #root: string
	readonly #stage: string
	readonly #backup: string
	readonly #expectations: ReadonlyMap<string, WriteExpectation>
	readonly #created: WriteAnchor[] = []
	readonly #staged: string[] = []
	readonly #established: string[] = []
	readonly #taken: string[] = []
	#open = true

	/**
	 * Open a transaction over one target directory.
	 *
	 * @param target - The directory every path is written beneath.
	 * @param paths - Every target-relative path this transaction may touch.
	 * @param preconditions - The caller-observed destination states the whole
	 * transaction is held to, each naming a resolved destination of `paths`.
	 * @throws {@link ScaffoldError} coded `INVALID` when an argument is off
	 * contract, `TARGET` when a destination is a shape this package will not write
	 * over or no longer matches its precondition, and `WRITE` when the private
	 * root cannot be established.
	 *
	 * @remarks
	 * Nothing is created until every destination has been inspected and every
	 * precondition has held, so a refused transaction leaves no residue at all.
	 * The private root is created last and carries a random name, so two
	 * transactions over one target never collide.
	 */
	constructor(
		target: string,
		paths: readonly string[],
		preconditions?: readonly WritePrecondition[],
	) {
		if (!isFilesystemPath(target)) {
			throw new ScaffoldError('INVALID', 'The write target is not a host path.', { target })
		}
		if (!isCollection(paths) || !paths.every((path) => isPath(path))) {
			throw new ScaffoldError(
				'INVALID',
				'The write paths are not a bounded list of plannable paths.',
				{
					target,
				},
			)
		}
		if (new Set(paths).size !== paths.length) {
			throw new ScaffoldError('INVALID', 'The write paths repeat a destination.', { target, paths })
		}
		this.#target = resolve(target)
		const expectations = new Map<string, WriteExpectation>()
		for (const path of paths) {
			const destination = this.#resolve(this.#target, path)
			const expectation = readExpectation(destination)
			if (expectation === undefined) {
				throw new ScaffoldError(
					'TARGET',
					`The destination at ${path} is a shape this package will not write over.`,
					{ target: this.#target, path },
				)
			}
			expectations.set(path, expectation)
		}
		this.#expectations = expectations
		const destinations = new Set([...expectations.values()].map((expectation) => expectation.path))
		for (const precondition of preconditions ?? []) {
			if (!destinations.has(precondition.path)) {
				throw new ScaffoldError(
					'INVALID',
					`The precondition at ${precondition.path} names no destination of this transaction.`,
					{ target: this.#target, path: precondition.path },
				)
			}
			if (!matchesPrecondition(precondition)) {
				throw new ScaffoldError(
					'TARGET',
					`The destination at ${precondition.path} no longer holds what the caller observed.`,
					{ target: this.#target, path: precondition.path },
				)
			}
		}
		const parent = dirname(this.#target)
		this.#root = join(parent, `.${basename(this.#target)}.write-${randomUUID()}`)
		this.#stage = join(this.#root, 'stage')
		this.#backup = join(this.#root, 'backup')
		const opened = attempt(() => {
			this.#created.push(...this.#establish(parent).created)
			for (const directory of [this.#root, this.#stage, this.#backup]) {
				mkdirSync(directory, { mode: 0o700 })
				if (readAnchor(directory) === undefined) {
					throw new ScaffoldError('WRITE', 'The private write root is not a physical directory.', {
						target: this.#target,
						root: this.#root,
					})
				}
			}
		})
		if (!opened.success) {
			this.#open = false
			this.#recover([], [])
			throw new ScaffoldError('WRITE', 'The private write root could not be established.', {
				target: this.#target,
				root: this.#root,
				error: opened.error,
			})
		}
	}

	/** The resolved directory every path is written beneath. */
	get target(): string {
		return this.#target
	}

	/** What each destination held when the transaction opened, in path order. */
	get expectations(): readonly WriteExpectation[] {
		return [...this.#expectations.values()]
	}

	/** Whether the transaction can still be committed or discarded. */
	get open(): boolean {
		return this.#open
	}

	/**
	 * Stage one text file.
	 *
	 * @param path - The target-relative path to write.
	 * @param content - The exact UTF-8 text the destination should hold.
	 * @returns Nothing.
	 * @throws {@link ScaffoldError} coded `INVALID` when the path is not one this
	 * transaction opened or is already staged, `TARGET` when the destination holds
	 * a directory, and `WRITE` when the staged file cannot be written or does not
	 * carry the bytes it was given.
	 *
	 * @remarks
	 * The staged file is read back and digested against the text it was given, so
	 * a partial or interrupted write is refused here rather than promoted later.
	 */
	write(path: string, content: string): void {
		const expectation = this.#claim(path)
		if (expectation.shape === 'directory') {
			throw new ScaffoldError('TARGET', `The destination at ${path} holds a directory.`, { path })
		}
		const staged = this.#stagePath(path)
		const written = attempt(() => {
			writeFileSync(staged, content, { encoding: 'utf8', flag: 'wx' })
		})
		if (!written.success) {
			throw new ScaffoldError('WRITE', `The staged file at ${path} could not be written.`, {
				path,
				error: written.error,
			})
		}
		if (computeFileDigest(staged) !== computeDigest(content)) {
			throw new ScaffoldError('WRITE', `The staged file at ${path} does not carry its content.`, {
				path,
			})
		}
		this.#staged.push(path)
	}

	/**
	 * Stage one byte-for-byte copy of a file that already exists on this host.
	 *
	 * @param path - The target-relative path to write.
	 * @param source - The resolved absolute path to copy the bytes from.
	 * @param executable - Whether the destination should carry the executable bit.
	 * @returns Nothing.
	 * @throws {@link ScaffoldError} coded `INVALID` when the path is not one this
	 * transaction opened or is already staged, `TARGET` when the destination holds
	 * a directory or the source is not a physical file, and `WRITE` when the copy
	 * cannot be made or does not digest to the source's bytes.
	 *
	 * @remarks
	 * The source is digested before the copy and the copy is digested after it, so
	 * a source that changed mid-copy is refused instead of staged.
	 */
	copy(path: string, source: string, executable: boolean): void {
		const expectation = this.#claim(path)
		if (expectation.shape === 'directory') {
			throw new ScaffoldError('TARGET', `The destination at ${path} holds a directory.`, { path })
		}
		const digest = isPhysicalFile(source) ? computeFileDigest(source) : undefined
		if (digest === undefined) {
			throw new ScaffoldError('TARGET', `The copy source for ${path} is not a readable file.`, {
				path,
				source,
			})
		}
		const staged = this.#stagePath(path)
		const copied = attempt(() => {
			copyFileSync(source, staged, constants.COPYFILE_EXCL)
			if (executable) chmodSync(staged, 0o755)
		})
		if (!copied.success) {
			throw new ScaffoldError('WRITE', `The staged copy at ${path} could not be made.`, {
				path,
				source,
				error: copied.error,
			})
		}
		if (computeFileDigest(staged) !== digest) {
			throw new ScaffoldError(
				'WRITE',
				`The staged copy at ${path} does not carry the source bytes.`,
				{
					path,
					source,
				},
			)
		}
		this.#staged.push(path)
	}

	/**
	 * Establish one directory inside the target, one segment at a time.
	 *
	 * @param path - The target-relative directory to establish.
	 * @returns The directory's identity and every segment this call created.
	 * @throws {@link ScaffoldError} coded `INVALID` when the path is not one this
	 * transaction opened, `TARGET` when the destination holds a file, and `WRITE`
	 * when a segment cannot be created or changed while it was being created.
	 *
	 * @remarks
	 * A directory is created immediately rather than staged, because creating one
	 * destroys nothing: rollback removes exactly the segments this call created,
	 * innermost first, and leaves every segment that was already there. Each
	 * created segment is captured by device and inode, so a segment swapped
	 * underneath the transaction is detected rather than written into.
	 */
	directory(path: string): WriteDirectoryResult {
		this.#assertOpen()
		const expectation = this.#expectation(path)
		if (expectation.shape === 'file') {
			throw new ScaffoldError('TARGET', `The destination at ${path} holds a file.`, { path })
		}
		const result = this.#establish(this.#resolve(this.#target, path))
		this.#created.push(...result.created)
		if (result.created.length > 0 && !this.#established.includes(path)) this.#established.push(path)
		return result
	}

	/**
	 * Mark one file for deletion at commit.
	 *
	 * @param path - The target-relative file to delete.
	 * @returns Nothing.
	 * @throws {@link ScaffoldError} coded `INVALID` when the path is not one this
	 * transaction opened or is already claimed, and `TARGET` when the destination
	 * does not hold a file.
	 *
	 * @remarks
	 * Nothing moves here. Commit renames the file into the private backup rather
	 * than unlinking it, so a later failure in the same commit puts it back.
	 */
	remove(path: string): void {
		const expectation = this.#claim(path)
		if (expectation.shape !== 'file') {
			throw new ScaffoldError('TARGET', `The destination at ${path} holds no file to remove.`, {
				path,
			})
		}
		this.#taken.push(path)
	}

	/**
	 * Promote every staged file and take every marked file, or roll the whole call back.
	 *
	 * @returns Every target-relative path whose destination changed: the files
	 * promoted, then the directories established, then the files taken.
	 * @throws {@link ScaffoldError} coded `WRITE` when the transaction is closed,
	 * when a destination moved since the transaction opened, or when the commit
	 * failed; a failure reports what rollback could not undo in its context.
	 *
	 * @remarks
	 * Every destination and every directory this transaction created is re-checked
	 * before anything moves, so the common failure moves nothing at all. That
	 * check runs inside the same rollback as the promotions, because a transaction
	 * that refuses before it starts still has a private root and created
	 * directories to clear. The transaction is closed either way: a committed one
	 * has nothing left to undo and a failed one has already been rolled back.
	 */
	commit(): readonly string[] {
		this.#assertOpen()
		const promoted: string[] = []
		const taken: string[] = []
		const applied = attempt(() => {
			this.#preflight()
			for (const path of this.#staged) {
				this.#promote(path)
				promoted.push(path)
			}
			for (const path of this.#taken) {
				this.#take(path)
				taken.push(path)
			}
		})
		this.#open = false
		if (!applied.success) {
			const residue = this.#recover(promoted, taken)
			throw new ScaffoldError('WRITE', 'The commit failed and was rolled back.', {
				target: this.#target,
				root: this.#root,
				error: applied.error,
				committed: false,
				residue,
			})
		}
		const cleared = attempt(() => rmSync(this.#root, { recursive: true, force: true }))
		if (!cleared.success) {
			throw new ScaffoldError('WRITE', 'The commit completed but left private residue.', {
				target: this.#target,
				root: this.#root,
				error: cleared.error,
				committed: true,
			})
		}
		return [...this.#staged, ...this.#established, ...this.#taken]
	}

	/**
	 * Abandon the transaction and remove everything it created.
	 *
	 * @returns Nothing.
	 * @throws {@link ScaffoldError} coded `WRITE` when residue could not be
	 * removed, naming the private root that still holds it.
	 *
	 * @remarks
	 * Idempotent, and a no-op on a transaction that already committed or already
	 * failed, so a caller can put it in a `finally` beside the work it guards.
	 */
	discard(): void {
		if (!this.#open) return
		this.#open = false
		const residue = this.#recover([], [])
		if (residue.length > 0) {
			throw new ScaffoldError('WRITE', 'The discarded transaction left residue.', {
				target: this.#target,
				root: this.#root,
				residue,
			})
		}
	}

	// Resolve a root-relative path and refuse one whose existing ancestors are not
	// all physical directories. Containment alone is a read-time law: a link
	// planted between the root and the destination stays inside the root, so it
	// passes containment while still moving the write somewhere the caller never
	// named.
	#resolve(root: string, path: string): string {
		const destination = resolveContainedPath(root, path)
		if (destination === undefined) {
			throw new ScaffoldError('INVALID', `The path ${path} is off contract or leaves its root.`, {
				root,
				path,
			})
		}
		const base = resolve(root)
		let ancestor = dirname(destination)
		for (let depth = 0; depth <= MAX_PATH_DEPTH; depth += 1) {
			const state = readExpectation(ancestor)
			if (state === undefined || state.shape === 'file') {
				throw new ScaffoldError('WRITE', `The path ${path} passes through a link or a file.`, {
					root,
					path,
					ancestor,
				})
			}
			if (ancestor === base) return destination
			const parent = dirname(ancestor)
			if (parent === ancestor) break
			ancestor = parent
		}
		throw new ScaffoldError('INVALID', `The path ${path} does not resolve beneath its root.`, {
			root,
			path,
		})
	}

	// Create one absolute directory path segment by segment, revalidating the
	// deepest established segment before and after each `mkdir`, so a segment
	// swapped between two steps is caught rather than written into.
	#establish(path: string): WriteDirectoryResult {
		const destination = resolve(path)
		const missing: string[] = []
		let current = destination
		let anchor = readAnchor(current)
		for (let depth = 0; anchor === undefined && depth <= MAX_PATH_DEPTH; depth += 1) {
			const state = readExpectation(current)
			if (state === undefined || state.shape !== 'absent') {
				throw new ScaffoldError(
					'WRITE',
					`The directory at ${current} is not a physical directory.`,
					{
						path: destination,
					},
				)
			}
			missing.push(current)
			const parent = dirname(current)
			if (parent === current) {
				throw new ScaffoldError(
					'WRITE',
					`The directory at ${destination} has no existing ancestor.`,
					{
						path: destination,
					},
				)
			}
			current = parent
			anchor = readAnchor(current)
		}
		if (anchor === undefined) {
			throw new ScaffoldError(
				'WRITE',
				`The directory at ${destination} is nested past the ceiling.`,
				{
					path: destination,
					limit: MAX_PATH_DEPTH,
				},
			)
		}
		const created: WriteAnchor[] = []
		for (const segment of [...missing].reverse()) {
			if (!matchesAnchor(anchor)) {
				throw new ScaffoldError('WRITE', `The directory at ${anchor.path} changed while writing.`, {
					path: destination,
					ancestor: anchor.path,
				})
			}
			mkdirSync(segment)
			const established = readAnchor(segment)
			if (established === undefined) {
				throw new ScaffoldError('WRITE', `The directory at ${segment} changed while writing.`, {
					path: destination,
				})
			}
			anchor = established
			created.push(established)
		}
		return { anchor, created }
	}

	// Every destination and every created directory, re-read once before the first
	// promotion. A failure here has moved nothing, so the caller still holds the
	// target exactly as it found it.
	#preflight(): void {
		for (const anchor of this.#created) {
			if (!matchesAnchor(anchor)) {
				throw new ScaffoldError('WRITE', `The directory at ${anchor.path} changed while writing.`, {
					target: this.#target,
					path: anchor.path,
				})
			}
		}
		for (const path of [...this.#staged, ...this.#taken]) {
			const expectation = this.#expectation(path)
			if (!matchesExpectation(expectation)) {
				throw new ScaffoldError('WRITE', `The destination at ${path} moved while writing.`, {
					target: this.#target,
					path,
				})
			}
		}
		for (const path of this.#staged) {
			if (!isPhysicalFile(this.#resolve(this.#stage, path))) {
				throw new ScaffoldError(
					'WRITE',
					`The staged file at ${path} is no longer a physical file.`,
					{
						target: this.#target,
						path,
					},
				)
			}
		}
	}

	// Preserve the destination's bytes under a second name, then replace the
	// directory entry in one rename. The destination names the whole old file
	// until that rename lands and the whole new file after it.
	#promote(path: string): void {
		const expectation = this.#expectation(path)
		if (!matchesExpectation(expectation)) {
			throw new ScaffoldError('WRITE', `The destination at ${path} moved while writing.`, { path })
		}
		const staged = this.#resolve(this.#stage, path)
		if (expectation.shape === 'absent') {
			this.#created.push(...this.#establish(dirname(expectation.path)).created)
		} else {
			const backup = this.#resolve(this.#backup, path)
			mkdirSync(dirname(backup), { recursive: true })
			linkSync(expectation.path, backup)
		}
		renameSync(staged, expectation.path)
	}

	// Move the file out of the target rather than unlinking it, so a later failure
	// in the same commit can put the exact bytes back.
	#take(path: string): void {
		const expectation = this.#expectation(path)
		if (!matchesExpectation(expectation)) {
			throw new ScaffoldError('WRITE', `The destination at ${path} moved while writing.`, { path })
		}
		const backup = this.#resolve(this.#backup, path)
		mkdirSync(dirname(backup), { recursive: true })
		renameSync(expectation.path, backup)
	}

	// Undo everything this transaction did, newest first, and report what it could
	// not undo instead of throwing over the failure that started the rollback.
	#recover(promoted: readonly string[], taken: readonly string[]): readonly unknown[] {
		const residue: unknown[] = []
		for (const path of [...taken].reverse()) {
			const restored = attempt(() =>
				renameSync(this.#resolve(this.#backup, path), this.#expectation(path).path),
			)
			if (!restored.success) residue.push(restored.error)
		}
		for (const path of [...promoted].reverse()) {
			const expectation = this.#expectation(path)
			const restored = attempt(() => {
				if (expectation.shape === 'absent') {
					rmSync(expectation.path, { force: true })
					return
				}
				renameSync(this.#resolve(this.#backup, path), expectation.path)
			})
			if (!restored.success) residue.push(restored.error)
		}
		// The private root holds every preserved copy, so it survives whenever a
		// restore failed: deleting it there would destroy the only remaining bytes.
		if (residue.length === 0) {
			const cleared = attempt(() => rmSync(this.#root, { recursive: true, force: true }))
			if (!cleared.success) residue.push(cleared.error)
		}
		for (const anchor of [...this.#created].reverse()) {
			const removed = attempt(() => rmdirSync(anchor.path))
			if (!removed.success && !matchesMissingPath(removed.error)) residue.push(removed.error)
		}
		return residue
	}

	// Establish the staged file's parents inside the private root and hand back the
	// path to write at. Nothing here reaches the target.
	#stagePath(path: string): string {
		const staged = this.#resolve(this.#stage, path)
		mkdirSync(dirname(staged), { recursive: true })
		return staged
	}

	// One path may be written, copied, or removed exactly once, and only while the
	// transaction is open.
	#claim(path: string): WriteExpectation {
		this.#assertOpen()
		const expectation = this.#expectation(path)
		if (this.#staged.includes(path) || this.#taken.includes(path)) {
			throw new ScaffoldError(
				'INVALID',
				`The path ${path} is already claimed by this transaction.`,
				{
					path,
				},
			)
		}
		return expectation
	}

	#expectation(path: string): WriteExpectation {
		const expectation = this.#expectations.get(path)
		if (expectation === undefined) {
			throw new ScaffoldError('INVALID', `The path ${path} is not one this transaction opened.`, {
				path,
			})
		}
		return expectation
	}

	#assertOpen(): void {
		if (!this.#open) {
			throw new ScaffoldError('WRITE', 'This write transaction is closed.', {
				target: this.#target,
			})
		}
	}
}
