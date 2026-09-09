import { isRecord, parseJSON } from '@orkestrel/contract'

/**
 * Parses a package manifest's bare package name.
 *
 * @param manifest - The package manifest JSON text
 * @returns The name after its final scope separator, or `undefined` when no name is declared
 */
export function parsePackageName(manifest: string): string | undefined {
	const parsed = parseJSON(manifest)
	if (!isRecord(parsed)) return undefined
	const name = parsed.name
	if (typeof name !== 'string' || name.length === 0) return undefined
	return name.slice(name.lastIndexOf('/') + 1)
}
