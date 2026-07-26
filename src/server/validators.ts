import type { EmitterHooks } from '@orkestrel/emitter'
import type { Dependency } from '@src/core'
import type {
	CatalogAllowance,
	HostManifest,
	ManifestEntry,
	MaterializerEventMap,
	SyncEventMap,
	WritePrecondition,
} from './types.js'
import { attempt, isError, isFunction, isRecord, isString } from '@orkestrel/contract'
import {
	CONTROL_CHARACTER_PATTERN,
	contentByteLength,
	hasOnlyDataProperties,
	INVALID_PATH_CHARACTER_PATTERN,
	isDenseDataArray,
	isDependency,
	MAX_PATH_LENGTH,
} from '@src/core'
import {
	MAX_CATALOG_DESCRIPTION_LENGTH,
	MAX_FILESYSTEM_DEPTH,
	MAX_HOST_ENTRIES,
	MAX_PATH_SEGMENT_BYTES,
	RESERVED_PATH_SEGMENT_PATTERN,
	RESERVED_TARGET_PATH_PATTERN,
	SENSITIVE_HOST_PATH_PATTERN,
	WRITE_DIGEST_PATTERN,
} from './constants.js'

/** Narrow one exact aggregate fleet traversal allowance. */
export function isCatalogAllowance(value: unknown): value is CatalogAllowance {
	const result = attempt(() => {
		const bufferGetter = Object.getOwnPropertyDescriptor(
			Object.getPrototypeOf(Float64Array.prototype),
			'buffer',
		)?.get
		if (
			bufferGetter === undefined ||
			!ArrayBuffer.isView(value) ||
			!(value instanceof Float64Array) ||
			!(Reflect.apply(bufferGetter, value, []) instanceof ArrayBuffer) ||
			value.length !== 1
		) {
			return false
		}
		const remaining = value[0]
		return (
			remaining !== undefined &&
			Number.isSafeInteger(remaining) &&
			remaining >= 0 &&
			remaining <= MAX_HOST_ENTRIES
		)
	})
	return result.success && result.value
}

/**
 * Determine whether a value is a non-empty portable relative POSIX path.
 *
 * @param value - The candidate path.
 * @returns `true` when every path segment is safe and portable.
 */
export function isPortablePath(value: unknown): value is string {
	if (!isString(value) || value.length === 0 || value.length > MAX_PATH_LENGTH) return false
	if (INVALID_PATH_CHARACTER_PATTERN.test(value) || CONTROL_CHARACTER_PATTERN.test(value)) {
		return false
	}
	const segments = value.split('/')
	return (
		segments.length <= MAX_FILESYSTEM_DEPTH &&
		!segments.some(
			(segment) =>
				segment === '' ||
				segment === '.' ||
				segment === '..' ||
				segment.endsWith('.') ||
				segment.endsWith(' ') ||
				contentByteLength(segment) > MAX_PATH_SEGMENT_BYTES ||
				RESERVED_PATH_SEGMENT_PATTERN.test(segment),
		)
	)
}

/** Whether one host filesystem path is bounded, non-empty, and safe to render in a terminal. */
export function isFilesystemPath(value: unknown): value is string {
	if (
		!isString(value) ||
		value.length === 0 ||
		value.length > MAX_PATH_LENGTH ||
		CONTROL_CHARACTER_PATTERN.test(value)
	) {
		return false
	}
	const normalized = value.replaceAll('\\', '/')
	const withoutRoot = normalized.startsWith('//')
		? normalized.slice(2)
		: normalized.startsWith('/')
			? normalized.slice(1)
			: normalized
	if (withoutRoot.includes('//')) return false
	const segments = withoutRoot.split('/').filter((segment) => segment.length > 0)
	if (segments.length > MAX_FILESYSTEM_DEPTH) return false
	return !segments.some((segment, index) => {
		if (segment === '.' || segment === '..') return false
		if (index === 0 && /^[A-Za-z]:$/u.test(segment)) return false
		return (
			/[<>:"|?*]/u.test(segment) ||
			segment.endsWith('.') ||
			segment.endsWith(' ') ||
			contentByteLength(segment) > MAX_PATH_SEGMENT_BYTES ||
			RESERVED_PATH_SEGMENT_PATTERN.test(segment)
		)
	})
}

/** Whether one externally supplied string is safe to render in terminal or JSON diagnostics. */
export function isTerminalText(value: unknown): value is string {
	return isString(value) && !CONTROL_CHARACTER_PATTERN.test(value)
}

/** Whether one dependency is an exact data-property record safe to snapshot. */
export function isDependencyData(value: unknown): value is Dependency {
	return hasOnlyDataProperties(value) && isDependency(value)
}

/**
 * Determine whether a host-relative path resembles local configuration or credentials.
 *
 * @param value - The portable candidate path.
 * @returns `true` when the path must be excluded from vendored host output.
 */
export function isSensitiveHostPath(value: string): boolean {
	return SENSITIVE_HOST_PATH_PATTERN.test(value.replaceAll('\\', '/'))
}

/** Determine whether a target-relative path addresses preserved repository metadata. */
export function isReservedTargetPath(value: string): boolean {
	return RESERVED_TARGET_PATH_PATTERN.test(value.replaceAll('\\', '/'))
}

/** Whether a normalized catalog description is bounded and contains no controls. */
export function isCatalogDescription(value: unknown): value is string {
	return (
		isString(value) &&
		value.length <= MAX_CATALOG_DESCRIPTION_LENGTH &&
		!CONTROL_CHARACTER_PATTERN.test(value)
	)
}

/**
 * Determine whether a caught filesystem error reports an absent path.
 *
 * @param value - The caught value.
 * @returns `true` only for an `Error` whose `code` is exactly `ENOENT`.
 */
export function isMissingPathError(value: unknown): boolean {
	const result = attempt(() => isError(value) && Reflect.get(value, 'code') === 'ENOENT')
	return result.success && result.value
}

/** Narrow one exact transaction destination precondition. */
export function isWritePrecondition(value: unknown): value is WritePrecondition {
	const result = attempt(() => {
		if (!isRecord(value)) return false
		const keys = Reflect.ownKeys(value)
		if (
			keys.some((key) => key !== 'path' && key !== 'shape' && key !== 'digest') ||
			keys.length < 2 ||
			keys.length > 3
		) {
			return false
		}
		const path = Reflect.getOwnPropertyDescriptor(value, 'path')
		const shape = Reflect.getOwnPropertyDescriptor(value, 'shape')
		const digest = Reflect.getOwnPropertyDescriptor(value, 'digest')
		if (
			path === undefined ||
			!Reflect.has(path, 'value') ||
			shape === undefined ||
			!Reflect.has(shape, 'value') ||
			(digest !== undefined && !Reflect.has(digest, 'value')) ||
			!isPortablePath(path.value)
		) {
			return false
		}
		return shape.value === 'absent'
			? digest === undefined
			: shape.value === 'file' &&
					digest !== undefined &&
					typeof digest.value === 'string' &&
					WRITE_DIGEST_PATTERN.test(digest.value)
	})
	return result.success && result.value
}

/**
 * Narrow a value to one exact vendored-host manifest entry.
 *
 * @param value - The candidate raw manifest entry.
 * @returns `true` only for the exact safe entry shape.
 */
export function isManifestEntry(value: unknown): value is ManifestEntry {
	const result = attempt(() => {
		if (!isRecord(value)) return false
		const keys = Reflect.ownKeys(value)
		const storage = Reflect.getOwnPropertyDescriptor(value, 'storage')
		const destination = Reflect.getOwnPropertyDescriptor(value, 'destination')
		const executable = Reflect.getOwnPropertyDescriptor(value, 'executable')
		return (
			keys.length === 3 &&
			keys.every((key) => key === 'storage' || key === 'destination' || key === 'executable') &&
			storage !== undefined &&
			Reflect.has(storage, 'value') &&
			destination !== undefined &&
			Reflect.has(destination, 'value') &&
			executable !== undefined &&
			Reflect.has(executable, 'value') &&
			isPortablePath(storage.value) &&
			isPortablePath(destination.value) &&
			typeof executable.value === 'boolean'
		)
	})
	return result.success && result.value
}

/**
 * Narrow a value to one exact complete vendored-host manifest.
 *
 * @param value - The candidate manifest value.
 * @returns `true` only for an exact `{ entries, roots }` record with safe paths.
 */
export function isHostManifest(value: unknown): value is HostManifest {
	const result = attempt(() => {
		if (!isRecord(value)) return false
		const keys = Reflect.ownKeys(value)
		const entries = Reflect.getOwnPropertyDescriptor(value, 'entries')
		const roots = Reflect.getOwnPropertyDescriptor(value, 'roots')
		return (
			keys.length === 2 &&
			keys.every((key) => key === 'entries' || key === 'roots') &&
			entries !== undefined &&
			Reflect.has(entries, 'value') &&
			roots !== undefined &&
			Reflect.has(roots, 'value') &&
			isDenseDataArray(entries.value, MAX_HOST_ENTRIES, isManifestEntry) &&
			isDenseDataArray(roots.value, MAX_HOST_ENTRIES, isPortablePath)
		)
	})
	return result.success && result.value
}

/** Narrow an exact initial-listener record for `Sync`. */
export function isSyncEventHooks(value: unknown): value is EmitterHooks<SyncEventMap> {
	const result = attempt(() => {
		if (!isRecord(value)) return false
		const keys = Reflect.ownKeys(value)
		if (
			keys.some(
				(key) =>
					key !== 'guide' &&
					key !== 'version' &&
					key !== 'package' &&
					key !== 'write' &&
					key !== 'done' &&
					key !== 'error' &&
					key !== 'destroy',
			)
		) {
			return false
		}
		return keys.every((key) => {
			const descriptor = Reflect.getOwnPropertyDescriptor(value, key)
			return (
				descriptor !== undefined && Reflect.has(descriptor, 'value') && isFunction(descriptor.value)
			)
		})
	})
	return result.success && result.value
}

/** Narrow an exact initial-listener record for `Materializer`. */
export function isMaterializerEventHooks(
	value: unknown,
): value is EmitterHooks<MaterializerEventMap> {
	const result = attempt(() => {
		if (!isRecord(value)) return false
		const keys = Reflect.ownKeys(value)
		if (
			keys.some(
				(key) =>
					key !== 'copy' &&
					key !== 'write' &&
					key !== 'remove' &&
					key !== 'done' &&
					key !== 'error' &&
					key !== 'destroy',
			)
		) {
			return false
		}
		return keys.every((key) => {
			const descriptor = Reflect.getOwnPropertyDescriptor(value, key)
			return (
				descriptor !== undefined && Reflect.has(descriptor, 'value') && isFunction(descriptor.value)
			)
		})
	})
	return result.success && result.value
}
