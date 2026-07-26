import type { WriteAnchor, WriteExpectation, WritePrecondition } from './types.js'
import { randomUUID } from 'node:crypto'
import { lstatSync, mkdirSync, rmdirSync, rmSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { attempt } from '@orkestrel/contract'
import { findFileConflict, MAX_COLLECTION_ITEMS, ScaffoldError } from '@src/core'
import { WRITE_DIGEST_PATTERN } from './constants.js'
import { digestFile, resolvePhysicalPath } from './helpers.js'
import { parsePortablePaths, parseWritePreconditions } from './parsers.js'
import { isFilesystemPath, isMissingPathError, isPortablePath } from './validators.js'

/**
 * Nominal, same-volume write-transaction state. Construction derives every
 * filesystem path from a target and portable relative paths; callers cannot
 * supply a deletion root or mutate captured arrays.
 */
export class WriteTransaction {
	static readonly #token = Object.freeze({})

	readonly #target: string
	readonly #root: string
	readonly #stage: string
	readonly #backup: string
	readonly #expectations: readonly WriteExpectation[]
	readonly #parents: readonly WriteAnchor[]
	readonly #directories: readonly WriteAnchor[]
	readonly #anchor: WriteAnchor
	readonly #existing: WriteAnchor | undefined

	constructor(
		token: unknown,
		target: string,
		root: string,
		stage: string,
		backup: string,
		expectations: readonly WriteExpectation[],
		parents: readonly WriteAnchor[],
		directories: readonly WriteAnchor[],
		anchor: WriteAnchor,
		existing: WriteAnchor | undefined,
	) {
		if (token !== WriteTransaction.#token) {
			throw new ScaffoldError('WRITE', 'WriteTransaction must be created through create()')
		}
		this.#target = target
		this.#root = root
		this.#stage = stage
		this.#backup = backup
		this.#expectations = Object.freeze([...expectations])
		this.#parents = Object.freeze(parents.map((parent) => Object.freeze({ ...parent })))
		this.#directories = Object.freeze(
			directories.map((directory) => Object.freeze({ ...directory })),
		)
		this.#anchor = Object.freeze({ ...anchor })
		this.#existing = existing === undefined ? undefined : Object.freeze({ ...existing })
	}

	/** Create private staging state and snapshot every destination before mutation. */
	static create(
		target: string,
		paths: readonly string[],
		preconditions?: readonly WritePrecondition[],
	): WriteTransaction {
		if (!isFilesystemPath(target)) {
			throw new ScaffoldError('WRITE', 'Write transaction target is malformed', { target })
		}
		const resolvedTarget = resolve(target)
		const requested = parsePortablePaths(paths, MAX_COLLECTION_ITEMS)
		if (requested === undefined) {
			throw new ScaffoldError('WRITE', 'Write transaction paths are malformed', {
				target: resolvedTarget,
			})
		}
		const conditions =
			preconditions === undefined
				? undefined
				: parseWritePreconditions(preconditions, MAX_COLLECTION_ITEMS)
		if (preconditions !== undefined && conditions === undefined) {
			throw new ScaffoldError('WRITE', 'Write transaction preconditions are malformed', {
				target: resolvedTarget,
			})
		}
		const conflict = findFileConflict(requested)
		if (conflict !== undefined) {
			throw new ScaffoldError(
				'WRITE',
				`Write transaction collision between "${conflict[0]}" and "${conflict[1]}"`,
				{ paths: conflict, committed: false },
			)
		}
		if (
			conditions !== undefined &&
			(conditions.length !== requested.length ||
				requested.some((path) => !conditions.some((condition) => condition.path === path)) ||
				conditions.some(
					(condition) =>
						!isPortablePath(condition.path) ||
						(condition.shape === 'file' &&
							(condition.digest === undefined || !WRITE_DIGEST_PATTERN.test(condition.digest))) ||
						(condition.shape === 'absent' && condition.digest !== undefined),
				))
		) {
			throw new ScaffoldError('WRITE', 'Write transaction preconditions are malformed', {
				paths: requested,
			})
		}
		const parent = dirname(resolvedTarget)
		const missingParents: string[] = []
		let ancestor = parent
		let anchor: WriteAnchor | undefined
		while (anchor === undefined) {
			const status = attempt(() => lstatSync(ancestor))
			if (status.success) {
				if (!status.value.isDirectory() || status.value.isSymbolicLink()) {
					throw new ScaffoldError('WRITE', 'Write transaction parent is not a real directory', {
						target: resolvedTarget,
						parent: ancestor,
					})
				}
				anchor = Object.freeze({
					path: ancestor,
					device: status.value.dev,
					inode: status.value.ino,
				})
				break
			}
			if (!isMissingPathError(status.error)) {
				throw new ScaffoldError('WRITE', 'Failed to inspect write transaction parent', {
					target: resolvedTarget,
					parent: ancestor,
					error: status.error,
				})
			}
			missingParents.push(ancestor)
			const next = dirname(ancestor)
			if (next === ancestor) {
				throw new ScaffoldError('WRITE', 'Write transaction has no existing parent', {
					target: resolvedTarget,
				})
			}
			ancestor = next
		}
		const targetStatus = attempt(() => lstatSync(resolvedTarget))
		const existing =
			targetStatus.success &&
			targetStatus.value.isDirectory() &&
			!targetStatus.value.isSymbolicLink()
				? Object.freeze({
						path: resolvedTarget,
						device: targetStatus.value.dev,
						inode: targetStatus.value.ino,
					})
				: undefined
		if (!targetStatus.success && !isMissingPathError(targetStatus.error)) {
			throw new ScaffoldError('WRITE', 'Failed to inspect write transaction target', {
				target: resolvedTarget,
				error: targetStatus.error,
			})
		}
		if (targetStatus.success && existing === undefined) {
			throw new ScaffoldError('WRITE', 'Write transaction target is not a real directory', {
				target: resolvedTarget,
			})
		}
		const expectations: WriteExpectation[] = []
		for (const path of requested) {
			if (!isPortablePath(path)) {
				throw new ScaffoldError('WRITE', `Invalid transaction path at ${path}`, { path })
			}
			const precondition = conditions?.find((condition) => condition.path === path)
			const destination = resolvePhysicalPath(resolvedTarget, path, 'WRITE', 'target')
			const current = attempt(() => lstatSync(destination))
			if (!current.success) {
				if (!isMissingPathError(current.error)) {
					throw new ScaffoldError('WRITE', `Failed to inspect transaction destination at ${path}`, {
						path,
						error: current.error,
					})
				}
				if (precondition?.shape === 'file') {
					throw new ScaffoldError('WRITE', `Write precondition changed at ${path}`, {
						path,
					})
				}
				expectations.push(Object.freeze({ path, shape: 'absent' }))
				continue
			}
			if (
				current.value.isSymbolicLink() ||
				(current.value.isFile() && current.value.nlink !== 1) ||
				(!current.value.isFile() && !current.value.isDirectory())
			) {
				throw new ScaffoldError('WRITE', `Unsafe transaction destination at ${path}`, {
					path,
				})
			}
			if (current.value.isDirectory()) {
				if (precondition !== undefined) {
					throw new ScaffoldError('WRITE', `Write precondition changed at ${path}`, {
						path,
					})
				}
				expectations.push(
					Object.freeze({
						path,
						shape: 'directory',
						device: current.value.dev,
						inode: current.value.ino,
						modified: current.value.mtimeMs,
						size: current.value.size,
					}),
				)
				continue
			}
			const content = attempt(() => digestFile(destination))
			if (!content.success) {
				throw new ScaffoldError('WRITE', `Failed to snapshot transaction destination at ${path}`, {
					path,
					error: content.error,
				})
			}
			if (
				precondition?.shape === 'absent' ||
				(precondition?.shape === 'file' && precondition.digest !== content.value)
			) {
				throw new ScaffoldError('WRITE', `Write precondition changed at ${path}`, {
					path,
				})
			}
			expectations.push(
				Object.freeze({
					path,
					shape: 'file',
					device: current.value.dev,
					inode: current.value.ino,
					modified: current.value.mtimeMs,
					size: current.value.size,
					digest: content.value,
				}),
			)
		}
		const token = randomUUID()
		const root = join(parent, `.${basename(resolvedTarget)}.write-${token}`)
		const stage = join(root, 'stage')
		const backup = join(root, 'backup')
		const parents: WriteAnchor[] = []
		const directories: WriteAnchor[] = []
		const created = attempt(() => {
			const anchored = lstatSync(anchor.path)
			if (
				!anchored.isDirectory() ||
				anchored.isSymbolicLink() ||
				anchored.dev !== anchor.device ||
				anchored.ino !== anchor.inode
			) {
				throw new Error('write transaction anchor changed')
			}
			for (const directory of [...missingParents].reverse()) {
				mkdirSync(directory)
				const status = lstatSync(directory)
				if (!status.isDirectory() || status.isSymbolicLink()) {
					throw new Error(`write transaction parent changed at ${directory}`)
				}
				parents.push(Object.freeze({ path: directory, device: status.dev, inode: status.ino }))
			}
			mkdirSync(root, { mode: 0o700 })
			const rootStatus = lstatSync(root)
			if (!rootStatus.isDirectory() || rootStatus.isSymbolicLink()) {
				throw new Error('write transaction root is not a real directory')
			}
			directories.push(Object.freeze({ path: root, device: rootStatus.dev, inode: rootStatus.ino }))
			mkdirSync(stage, { mode: 0o700 })
			const stageStatus = lstatSync(stage)
			if (!stageStatus.isDirectory() || stageStatus.isSymbolicLink()) {
				throw new Error('write transaction stage is not a real directory')
			}
			directories.push(
				Object.freeze({ path: stage, device: stageStatus.dev, inode: stageStatus.ino }),
			)
			mkdirSync(backup, { mode: 0o700 })
			const backupStatus = lstatSync(backup)
			if (!backupStatus.isDirectory() || backupStatus.isSymbolicLink()) {
				throw new Error('write transaction backup is not a real directory')
			}
			directories.push(
				Object.freeze({ path: backup, device: backupStatus.dev, inode: backupStatus.ino }),
			)
			for (const directory of [...parents, ...directories]) {
				const status = lstatSync(directory.path)
				if (
					!status.isDirectory() ||
					status.isSymbolicLink() ||
					status.dev !== directory.device ||
					status.ino !== directory.inode
				) {
					throw new Error(`write transaction directory changed at ${directory.path}`)
				}
			}
		})
		if (!created.success) {
			const privateState = attempt(() => {
				for (const directory of directories) {
					const status = lstatSync(directory.path)
					if (
						!status.isDirectory() ||
						status.isSymbolicLink() ||
						status.dev !== directory.device ||
						status.ino !== directory.inode
					) {
						throw new Error(`write transaction directory changed at ${directory.path}`)
					}
				}
				if (directories.length > 0) rmSync(root, { recursive: true })
			})
			if (privateState.success) {
				for (const directory of [...parents].reverse()) {
					attempt(() => {
						const status = lstatSync(directory.path)
						if (
							!status.isDirectory() ||
							status.isSymbolicLink() ||
							status.dev !== directory.device ||
							status.ino !== directory.inode
						) {
							throw new Error(`write transaction parent changed at ${directory.path}`)
						}
						rmdirSync(directory.path)
					})
				}
			}
			throw new ScaffoldError('WRITE', 'Failed to create write transaction', {
				target: resolvedTarget,
				root,
				error: created.error,
			})
		}
		return new WriteTransaction(
			WriteTransaction.#token,
			resolvedTarget,
			root,
			stage,
			backup,
			expectations,
			parents,
			directories,
			anchor,
			existing,
		)
	}

	get target(): string {
		return this.#target
	}

	get root(): string {
		return this.#root
	}

	get stage(): string {
		return this.#stage
	}

	get backup(): string {
		return this.#backup
	}

	get expectations(): readonly WriteExpectation[] {
		return this.#expectations
	}

	get parents(): readonly WriteAnchor[] {
		return this.#parents
	}

	get directories(): readonly WriteAnchor[] {
		return this.#directories
	}

	get anchor(): WriteAnchor {
		return this.#anchor
	}

	get existing(): WriteAnchor | undefined {
		return this.#existing
	}
}
