import type { Dependency } from '@src/core'
import type {
	MaterializerEventMap,
	MaterializerOptions,
	SyncBase,
	SyncBranch,
	SyncEventMap,
	SyncOptions,
	WritePrecondition,
} from './types.js'
import type { EmitterHooks } from '@orkestrel/emitter'
import { attempt, isFunction, isRecord } from '@orkestrel/contract'
import {
	contentByteLength,
	EXTRA_NAME_PATTERN,
	isDenseDataArray,
	isEmitterErrorHandler,
	MAX_ARTIFACT_BYTES,
	MAX_DEPENDENCY_NAME_LENGTH,
	ScaffoldError,
	validateDependencyArray,
} from '@src/core'
import {
	MAX_SYNC_BASE_LENGTH,
	MAX_SYNC_BRANCH_LENGTH,
	MAX_SYNC_ITEMS,
	SYNC_BRANCH_PATTERN,
} from './constants.js'
import { materializerOptionsContract, syncOptionsContract } from './contracts.js'
import {
	isDependencyData,
	isFilesystemPath,
	isMaterializerEventHooks,
	isPortablePath,
	isSyncEventHooks,
	isWritePrecondition,
} from './validators.js'

/**
 * Parse and semantically validate bare registry package names before Sync performs network I/O.
 *
 * @param value - Untrusted package-name collection.
 * @returns A frozen owned snapshot of valid unique npm package names.
 */
export function parseSyncNames(value: unknown): readonly string[] {
	const owned = attempt(() => {
		if (
			!isDenseDataArray(
				value,
				MAX_SYNC_ITEMS,
				(candidate): candidate is string => typeof candidate === 'string',
			)
		) {
			throw new Error('package names are malformed')
		}
		const length = Reflect.getOwnPropertyDescriptor(value, 'length')?.value
		if (
			typeof length !== 'number' ||
			!Number.isSafeInteger(length) ||
			length < 0 ||
			length > MAX_SYNC_ITEMS
		) {
			throw new Error('package name length is malformed')
		}
		const names: string[] = []
		for (let index = 0; index < length; index += 1) {
			const descriptor = Reflect.getOwnPropertyDescriptor(value, String(index))
			if (
				descriptor === undefined ||
				!Reflect.has(descriptor, 'value') ||
				typeof descriptor.value !== 'string'
			) {
				throw new Error('package name is malformed')
			}
			names.push(descriptor.value)
		}
		return Object.freeze(names)
	})
	if (!owned.success) {
		throw new ScaffoldError('INVALID', 'Sync package names are malformed', {
			error: owned.error,
		})
	}
	const snapshot = owned.value
	const seen = new Set<string>()
	for (const name of snapshot) {
		if (
			name.length === 0 ||
			name.length > MAX_DEPENDENCY_NAME_LENGTH ||
			!EXTRA_NAME_PATTERN.test(name) ||
			seen.has(name)
		) {
			throw new ScaffoldError('INVALID', 'Sync package names are invalid', { name })
		}
		seen.add(name)
	}
	return snapshot
}

/** Parse and semantically validate dependency data before Sync performs network I/O. */
export function parseSyncDependencies(value: unknown, external: boolean): readonly Dependency[] {
	const owned = attempt(() => {
		if (!isDenseDataArray(value, MAX_SYNC_ITEMS, isDependencyData)) {
			throw new Error('dependencies are malformed')
		}
		const length = Reflect.getOwnPropertyDescriptor(value, 'length')?.value
		if (
			typeof length !== 'number' ||
			!Number.isSafeInteger(length) ||
			length < 0 ||
			length > MAX_SYNC_ITEMS
		) {
			throw new Error('dependency length is malformed')
		}
		const dependencies: Dependency[] = []
		for (let index = 0; index < length; index += 1) {
			const descriptor = Reflect.getOwnPropertyDescriptor(value, String(index))
			if (
				descriptor === undefined ||
				!Reflect.has(descriptor, 'value') ||
				!isDependencyData(descriptor.value)
			) {
				throw new Error('dependency is malformed')
			}
			const name = Reflect.getOwnPropertyDescriptor(descriptor.value, 'name')?.value
			const range = Reflect.getOwnPropertyDescriptor(descriptor.value, 'range')?.value
			const optional = Reflect.getOwnPropertyDescriptor(descriptor.value, 'optional')?.value
			if (
				typeof name !== 'string' ||
				typeof range !== 'string' ||
				(optional !== undefined && typeof optional !== 'boolean')
			) {
				throw new Error('dependency is malformed')
			}
			dependencies.push(
				Object.freeze({
					name,
					range,
					...(optional === undefined ? {} : { optional }),
				}),
			)
		}
		return Object.freeze(dependencies)
	})
	if (!owned.success) {
		throw new ScaffoldError('INVALID', 'Sync dependencies are malformed', {
			error: owned.error,
		})
	}
	const snapshot = owned.value
	const validation = validateDependencyArray(external ? 'extras' : 'dependencies', snapshot)
	if (validation.questions.length > 0) {
		throw new ScaffoldError('INVALID', 'Sync dependencies are invalid', {
			questions: validation.questions,
		})
	}
	return snapshot
}

/** Parse a bounded dense array of host filesystem paths without invoking caller methods. */
export function parseFilesystemPaths(value: unknown, limit: number): readonly string[] | undefined {
	const parsed = attempt(() => {
		if (
			!Number.isSafeInteger(limit) ||
			limit < 0 ||
			!isDenseDataArray(value, limit, isFilesystemPath)
		) {
			return undefined
		}
		const length = Reflect.getOwnPropertyDescriptor(value, 'length')?.value
		if (
			typeof length !== 'number' ||
			!Number.isSafeInteger(length) ||
			length < 0 ||
			length > limit
		) {
			return undefined
		}
		const paths: string[] = []
		for (let index = 0; index < length; index += 1) {
			const descriptor = Reflect.getOwnPropertyDescriptor(value, String(index))
			if (
				descriptor === undefined ||
				!Reflect.has(descriptor, 'value') ||
				!isFilesystemPath(descriptor.value)
			) {
				return undefined
			}
			paths.push(descriptor.value)
		}
		return Object.freeze(paths)
	})
	return parsed.success ? parsed.value : undefined
}

/** Parse a bounded dense array of portable paths without invoking caller methods. */
export function parsePortablePaths(value: unknown, limit: number): readonly string[] | undefined {
	const parsed = attempt(() => {
		if (
			!Number.isSafeInteger(limit) ||
			limit < 0 ||
			!isDenseDataArray(value, limit, isPortablePath)
		) {
			return undefined
		}
		const length = Reflect.getOwnPropertyDescriptor(value, 'length')?.value
		if (
			typeof length !== 'number' ||
			!Number.isSafeInteger(length) ||
			length < 0 ||
			length > limit
		) {
			return undefined
		}
		const paths: string[] = []
		for (let index = 0; index < length; index += 1) {
			const descriptor = Reflect.getOwnPropertyDescriptor(value, String(index))
			if (
				descriptor === undefined ||
				!Reflect.has(descriptor, 'value') ||
				!isPortablePath(descriptor.value)
			) {
				return undefined
			}
			paths.push(descriptor.value)
		}
		return Object.freeze(paths)
	})
	return parsed.success ? parsed.value : undefined
}

/** Parse bounded exact transaction preconditions without invoking caller methods. */
export function parseWritePreconditions(
	value: unknown,
	limit: number,
): readonly WritePrecondition[] | undefined {
	const parsed = attempt(() => {
		if (
			!Number.isSafeInteger(limit) ||
			limit < 0 ||
			!isDenseDataArray(value, limit, isWritePrecondition)
		) {
			return undefined
		}
		const length = Reflect.getOwnPropertyDescriptor(value, 'length')?.value
		if (
			typeof length !== 'number' ||
			!Number.isSafeInteger(length) ||
			length < 0 ||
			length > limit
		) {
			return undefined
		}
		const preconditions: WritePrecondition[] = []
		for (let index = 0; index < length; index += 1) {
			const descriptor = Reflect.getOwnPropertyDescriptor(value, String(index))
			if (
				descriptor === undefined ||
				!Reflect.has(descriptor, 'value') ||
				!isWritePrecondition(descriptor.value)
			) {
				return undefined
			}
			const precondition = descriptor.value
			const path = Reflect.getOwnPropertyDescriptor(precondition, 'path')?.value
			const shape = Reflect.getOwnPropertyDescriptor(precondition, 'shape')?.value
			const digest = Reflect.getOwnPropertyDescriptor(precondition, 'digest')?.value
			if (typeof path !== 'string') return undefined
			if (shape === 'absent' && digest === undefined) {
				const copy: WritePrecondition = { path, shape }
				if (!isWritePrecondition(copy)) return undefined
				preconditions.push(Object.freeze(copy))
				continue
			}
			if (shape !== 'file' || typeof digest !== 'string') return undefined
			const copy: WritePrecondition = { path, shape, digest }
			if (!isWritePrecondition(copy)) return undefined
			preconditions.push(Object.freeze(copy))
		}
		return Object.freeze(preconditions)
	})
	return parsed.success ? parsed.value : undefined
}

/** Parse and normalize one upstream HTTP(S) endpoint base. */
export function parseSyncBase(value: unknown): SyncBase {
	if (
		typeof value !== 'string' ||
		value.length === 0 ||
		value.length > MAX_SYNC_BASE_LENGTH ||
		value !== value.trim() ||
		(/^[A-Za-z][A-Za-z0-9+.-]*:\/\//i.test(value) && !/^https?:\/\//i.test(value))
	) {
		throw new ScaffoldError('INVALID', 'Invalid Sync endpoint base', { value })
	}
	const normalized = /^https?:\/\//i.test(value) ? value : `https://${value}`
	const parsed = attempt(() => new URL(normalized))
	if (
		!parsed.success ||
		(parsed.value.protocol !== 'http:' && parsed.value.protocol !== 'https:') ||
		parsed.value.username.length > 0 ||
		parsed.value.password.length > 0 ||
		parsed.value.search.length > 0 ||
		parsed.value.hash.length > 0 ||
		(parsed.value.protocol === 'http:' &&
			!['127.0.0.1', '[::1]', 'localhost'].includes(parsed.value.hostname.toLowerCase()))
	) {
		throw new ScaffoldError('INVALID', 'Invalid Sync endpoint base', { value })
	}
	const base = parsed.value.href.replace(/\/+$/, '')
	if (base.length > MAX_SYNC_BASE_LENGTH) {
		throw new ScaffoldError('INVALID', 'Invalid Sync endpoint base', { value })
	}
	return base
}

/**
 * Snapshot only declared guide references while enforcing per-file and cumulative byte limits.
 *
 * @param value - The caller-supplied guide content map.
 * @param names - Exact dependency names eligible for selection.
 * @param budget - Maximum cumulative UTF-8 bytes.
 * @returns A frozen selected map, or `undefined` when no map was supplied.
 */
export function parseSyncCurrent(
	value: Readonly<Record<string, string>> | undefined,
	names: readonly string[],
	budget: number,
): Readonly<Record<string, string>> | undefined {
	if (value === undefined) return undefined
	const snapshot = attempt(() => {
		if (!isRecord(value)) throw new Error('current must be a plain record')
		const selected: Record<string, string> = {}
		let consumed = 0
		for (const name of names) {
			const descriptor = Reflect.getOwnPropertyDescriptor(value, name)
			if (descriptor === undefined) continue
			if (!Reflect.has(descriptor, 'value') || typeof descriptor.value !== 'string') {
				throw new Error('current values must be string data properties')
			}
			const bytes = contentByteLength(descriptor.value)
			consumed += bytes
			if (bytes > MAX_ARTIFACT_BYTES || consumed > budget) {
				throw new Error('current guide content exceeds its byte allowance')
			}
			selected[name] = descriptor.value
		}
		return Object.freeze(selected)
	})
	if (!snapshot.success) {
		throw new ScaffoldError('INVALID', 'Sync current guides are malformed', {
			error: snapshot.error,
		})
	}
	return snapshot.value
}

/** Parse a safe Git branch path for the canonical raw-guide URL. */
export function parseSyncBranch(value: unknown): SyncBranch {
	const segments = typeof value === 'string' ? value.split('/') : []
	if (
		typeof value !== 'string' ||
		value.length === 0 ||
		value.length > MAX_SYNC_BRANCH_LENGTH ||
		!SYNC_BRANCH_PATTERN.test(value) ||
		value.includes('..') ||
		value.includes('@{') ||
		value === '@' ||
		segments.some(
			(segment) =>
				segment === '' ||
				segment.startsWith('.') ||
				segment.endsWith('.') ||
				/\.lock$/iu.test(segment),
		)
	) {
		throw new ScaffoldError('INVALID', 'Invalid Sync guide branch', { value })
	}
	return value
}

/** Parse exact materializer options before allocating its emitter. */
export function parseMaterializerOptions(value: unknown): MaterializerOptions {
	if (value === undefined) return {}
	const read = attempt(() => {
		if (!isRecord(value)) throw new Error('options must be a plain record')
		const keys = Reflect.ownKeys(value)
		if (keys.some((key) => key !== 'host' && key !== 'on' && key !== 'error')) {
			throw new Error('options contain an unknown key')
		}
		const descriptors = keys.map((key) => Reflect.getOwnPropertyDescriptor(value, key))
		if (
			descriptors.some(
				(descriptor) => descriptor === undefined || !Reflect.has(descriptor, 'value'),
			)
		) {
			throw new Error('options must use data properties')
		}
		return {
			host: Reflect.getOwnPropertyDescriptor(value, 'host')?.value,
			on: Reflect.getOwnPropertyDescriptor(value, 'on')?.value,
			error: Reflect.getOwnPropertyDescriptor(value, 'error')?.value,
		}
	})
	if (!read.success) {
		throw new ScaffoldError('INVALID', 'Materializer options are malformed', {
			error: read.error,
		})
	}
	const parsed = materializerOptionsContract.parse({
		...(read.value.host === undefined ? {} : { host: read.value.host }),
	})
	if (parsed === undefined || (parsed.host !== undefined && !isFilesystemPath(parsed.host))) {
		throw new ScaffoldError('INVALID', 'Materializer host is malformed')
	}
	if (read.value.on !== undefined && !isMaterializerEventHooks(read.value.on)) {
		throw new ScaffoldError('INVALID', 'Materializer event hooks are malformed')
	}
	const ownedHooks = attempt(() => {
		const sourceHooks = read.value.on
		if (sourceHooks === undefined) return undefined
		if (typeof sourceHooks !== 'object' || sourceHooks === null) {
			throw new Error('event hooks are malformed')
		}
		const copy = Reflect.getOwnPropertyDescriptor(sourceHooks, 'copy')?.value
		const write = Reflect.getOwnPropertyDescriptor(sourceHooks, 'write')?.value
		const remove = Reflect.getOwnPropertyDescriptor(sourceHooks, 'remove')?.value
		const done = Reflect.getOwnPropertyDescriptor(sourceHooks, 'done')?.value
		const error = Reflect.getOwnPropertyDescriptor(sourceHooks, 'error')?.value
		const destroy = Reflect.getOwnPropertyDescriptor(sourceHooks, 'destroy')?.value
		if (
			(copy !== undefined && !isFunction(copy)) ||
			(write !== undefined && !isFunction(write)) ||
			(remove !== undefined && !isFunction(remove)) ||
			(done !== undefined && !isFunction(done)) ||
			(error !== undefined && !isFunction(error)) ||
			(destroy !== undefined && !isFunction(destroy))
		) {
			throw new Error('event hooks are malformed')
		}
		return Object.freeze({
			...(copy === undefined ? {} : { copy }),
			...(write === undefined ? {} : { write }),
			...(remove === undefined ? {} : { remove }),
			...(done === undefined ? {} : { done }),
			...(error === undefined ? {} : { error }),
			...(destroy === undefined ? {} : { destroy }),
		})
	})
	if (!ownedHooks.success) {
		throw new ScaffoldError('INVALID', 'Materializer event hooks are malformed', {
			error: ownedHooks.error,
		})
	}
	const on: EmitterHooks<MaterializerEventMap> | undefined = ownedHooks.value
	if (read.value.error !== undefined && !isEmitterErrorHandler(read.value.error)) {
		throw new ScaffoldError('INVALID', 'Materializer error handler is malformed')
	}
	return {
		...(parsed.host === undefined ? {} : { host: parsed.host }),
		...(on === undefined ? {} : { on }),
		...(read.value.error === undefined ? {} : { error: read.value.error }),
	}
}

/**
 * Parse the exact bounded `SyncOptions` boundary before allocating resources.
 *
 * @param value - Caller-supplied options.
 * @returns A fresh, validated options record.
 */
export function parseSyncOptions(value: unknown): SyncOptions {
	if (value === undefined) return {}
	const read = attempt(() => {
		if (!isRecord(value)) throw new Error('options must be a plain record')
		const keys = Reflect.ownKeys(value)
		if (
			keys.some(
				(key) =>
					key !== 'guides' &&
					key !== 'registry' &&
					key !== 'concurrency' &&
					key !== 'retries' &&
					key !== 'strict' &&
					key !== 'limit' &&
					key !== 'items' &&
					key !== 'budget' &&
					key !== 'on' &&
					key !== 'error',
			)
		) {
			throw new Error('options contain an unknown key')
		}
		const descriptors = keys.map((key) => Reflect.getOwnPropertyDescriptor(value, key))
		if (
			descriptors.some(
				(descriptor) => descriptor === undefined || !Reflect.has(descriptor, 'value'),
			)
		) {
			throw new Error('options must use data properties')
		}
		return {
			guides: Reflect.getOwnPropertyDescriptor(value, 'guides')?.value,
			registry: Reflect.getOwnPropertyDescriptor(value, 'registry')?.value,
			concurrency: Reflect.getOwnPropertyDescriptor(value, 'concurrency')?.value,
			retries: Reflect.getOwnPropertyDescriptor(value, 'retries')?.value,
			strict: Reflect.getOwnPropertyDescriptor(value, 'strict')?.value,
			limit: Reflect.getOwnPropertyDescriptor(value, 'limit')?.value,
			items: Reflect.getOwnPropertyDescriptor(value, 'items')?.value,
			budget: Reflect.getOwnPropertyDescriptor(value, 'budget')?.value,
			on: Reflect.getOwnPropertyDescriptor(value, 'on')?.value,
			error: Reflect.getOwnPropertyDescriptor(value, 'error')?.value,
		}
	})
	if (!read.success) {
		throw new ScaffoldError('INVALID', 'Sync options are malformed', { error: read.error })
	}
	const nested = attempt(() => {
		let guides: Record<string, unknown> | undefined
		if (read.value.guides !== undefined) {
			const source = read.value.guides
			if (!isRecord(source)) throw new Error('guides must be a plain record')
			const keys = Reflect.ownKeys(source)
			if (keys.some((key) => key !== 'base' && key !== 'branch' && key !== 'timeout')) {
				throw new Error('guides contain an unknown key')
			}
			const descriptors = keys.map((key) => Reflect.getOwnPropertyDescriptor(source, key))
			if (
				descriptors.some(
					(descriptor) => descriptor === undefined || !Reflect.has(descriptor, 'value'),
				)
			) {
				throw new Error('guides must use data properties')
			}
			guides = {
				base: Reflect.getOwnPropertyDescriptor(source, 'base')?.value,
				branch: Reflect.getOwnPropertyDescriptor(source, 'branch')?.value,
				timeout: Reflect.getOwnPropertyDescriptor(source, 'timeout')?.value,
			}
		}
		let registry: Record<string, unknown> | undefined
		if (read.value.registry !== undefined) {
			const source = read.value.registry
			if (!isRecord(source)) throw new Error('registry must be a plain record')
			const keys = Reflect.ownKeys(source)
			if (keys.some((key) => key !== 'base' && key !== 'timeout')) {
				throw new Error('registry contains an unknown key')
			}
			const descriptors = keys.map((key) => Reflect.getOwnPropertyDescriptor(source, key))
			if (
				descriptors.some(
					(descriptor) => descriptor === undefined || !Reflect.has(descriptor, 'value'),
				)
			) {
				throw new Error('registry must use data properties')
			}
			registry = {
				base: Reflect.getOwnPropertyDescriptor(source, 'base')?.value,
				timeout: Reflect.getOwnPropertyDescriptor(source, 'timeout')?.value,
			}
		}
		return { guides, registry }
	})
	if (!nested.success) {
		throw new ScaffoldError('INVALID', 'Sync endpoint options are malformed', {
			error: nested.error,
		})
	}
	const configuration = {
		...(nested.value.guides === undefined ? {} : { guides: nested.value.guides }),
		...(nested.value.registry === undefined ? {} : { registry: nested.value.registry }),
		...(read.value.concurrency === undefined ? {} : { concurrency: read.value.concurrency }),
		...(read.value.retries === undefined ? {} : { retries: read.value.retries }),
		...(read.value.strict === undefined ? {} : { strict: read.value.strict }),
		...(read.value.limit === undefined ? {} : { limit: read.value.limit }),
		...(read.value.items === undefined ? {} : { items: read.value.items }),
		...(read.value.budget === undefined ? {} : { budget: read.value.budget }),
	}
	const parsed = syncOptionsContract.parse(configuration)
	if (parsed === undefined) {
		throw new ScaffoldError('INVALID', 'Sync options are malformed')
	}
	if (read.value.on !== undefined && !isSyncEventHooks(read.value.on)) {
		throw new ScaffoldError('INVALID', 'Sync event hooks are malformed')
	}
	const ownedHooks = attempt(() => {
		const sourceHooks = read.value.on
		if (sourceHooks === undefined) return undefined
		if (typeof sourceHooks !== 'object' || sourceHooks === null) {
			throw new Error('event hooks are malformed')
		}
		const guide = Reflect.getOwnPropertyDescriptor(sourceHooks, 'guide')?.value
		const version = Reflect.getOwnPropertyDescriptor(sourceHooks, 'version')?.value
		const packageListener = Reflect.getOwnPropertyDescriptor(sourceHooks, 'package')?.value
		const write = Reflect.getOwnPropertyDescriptor(sourceHooks, 'write')?.value
		const done = Reflect.getOwnPropertyDescriptor(sourceHooks, 'done')?.value
		const error = Reflect.getOwnPropertyDescriptor(sourceHooks, 'error')?.value
		const destroy = Reflect.getOwnPropertyDescriptor(sourceHooks, 'destroy')?.value
		if (
			(guide !== undefined && !isFunction(guide)) ||
			(version !== undefined && !isFunction(version)) ||
			(packageListener !== undefined && !isFunction(packageListener)) ||
			(write !== undefined && !isFunction(write)) ||
			(done !== undefined && !isFunction(done)) ||
			(error !== undefined && !isFunction(error)) ||
			(destroy !== undefined && !isFunction(destroy))
		) {
			throw new Error('event hooks are malformed')
		}
		return Object.freeze({
			...(guide === undefined ? {} : { guide }),
			...(version === undefined ? {} : { version }),
			...(packageListener === undefined ? {} : { package: packageListener }),
			...(write === undefined ? {} : { write }),
			...(done === undefined ? {} : { done }),
			...(error === undefined ? {} : { error }),
			...(destroy === undefined ? {} : { destroy }),
		})
	})
	if (!ownedHooks.success) {
		throw new ScaffoldError('INVALID', 'Sync event hooks are malformed', {
			error: ownedHooks.error,
		})
	}
	const on: EmitterHooks<SyncEventMap> | undefined = ownedHooks.value
	if (read.value.error !== undefined && !isEmitterErrorHandler(read.value.error)) {
		throw new ScaffoldError('INVALID', 'Sync error handler is malformed')
	}
	const guides =
		parsed.guides === undefined
			? undefined
			: {
					...(parsed.guides.base === undefined ? {} : { base: parseSyncBase(parsed.guides.base) }),
					...(parsed.guides.branch === undefined
						? {}
						: { branch: parseSyncBranch(parsed.guides.branch) }),
					...(parsed.guides.timeout === undefined ? {} : { timeout: parsed.guides.timeout }),
				}
	const registry =
		parsed.registry === undefined
			? undefined
			: {
					...(parsed.registry.base === undefined
						? {}
						: { base: parseSyncBase(parsed.registry.base) }),
					...(parsed.registry.timeout === undefined ? {} : { timeout: parsed.registry.timeout }),
				}
	return {
		...(guides === undefined ? {} : { guides }),
		...(registry === undefined ? {} : { registry }),
		...(parsed.concurrency === undefined ? {} : { concurrency: parsed.concurrency }),
		...(parsed.retries === undefined ? {} : { retries: parsed.retries }),
		...(parsed.strict === undefined ? {} : { strict: parsed.strict }),
		...(parsed.limit === undefined ? {} : { limit: parsed.limit }),
		...(parsed.items === undefined ? {} : { items: parsed.items }),
		...(parsed.budget === undefined ? {} : { budget: parsed.budget }),
		...(on === undefined ? {} : { on }),
		...(read.value.error === undefined ? {} : { error: read.value.error }),
	}
}
