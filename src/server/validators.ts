import type { HostManifest, ManifestEntry } from './types.js'
import { attempt, isError, isRecord, isString } from '@orkestrel/contract'
import { INVALID_PATH_CHARACTER_PATTERN, RESERVED_PATH_SEGMENT_PATTERN } from './constants.js'

/**
 * Determine whether a value is a non-empty portable relative POSIX path.
 *
 * @param value - The candidate path.
 * @returns `true` when every path segment is safe and portable.
 */
export function isPortablePath(value: unknown): value is string {
	if (!isString(value) || value.length === 0) return false
	if (INVALID_PATH_CHARACTER_PATTERN.test(value)) return false
	for (const character of value) {
		const code = character.codePointAt(0)
		if (code !== undefined && (code <= 0x1f || (code >= 0x7f && code <= 0x9f))) return false
	}
	return !value
		.split('/')
		.some(
			(segment) =>
				segment === '' ||
				segment === '.' ||
				segment === '..' ||
				segment.endsWith('.') ||
				segment.endsWith(' ') ||
				RESERVED_PATH_SEGMENT_PATTERN.test(segment),
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

/**
 * Narrow a value to one exact vendored-host manifest entry.
 *
 * @param value - The candidate raw manifest entry.
 * @returns `true` only for the exact safe entry shape.
 */
export function isManifestEntry(value: unknown): value is ManifestEntry {
	const result = attempt(() => {
		if (!isRecord(value)) return false
		const keys = Object.keys(value)
		return (
			keys.length === 3 &&
			keys.every((key) => key === 'storage' || key === 'destination' || key === 'executable') &&
			isPortablePath(value.storage) &&
			isPortablePath(value.destination) &&
			typeof value.executable === 'boolean'
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
		const keys = Object.keys(value)
		return (
			keys.length === 2 &&
			keys.every((key) => key === 'entries' || key === 'roots') &&
			Array.isArray(value.entries) &&
			value.entries.every(isManifestEntry) &&
			Array.isArray(value.roots) &&
			value.roots.every(isPortablePath)
		)
	})
	return result.success && result.value
}
