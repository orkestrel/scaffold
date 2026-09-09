import type { ManifestEntry, ParityFinding } from '../core/types.js'
import type { GuideRunnerResult } from './types.js'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Formats one guides-parity finding for command output.
 *
 * @param finding - The finding to format
 * @returns The finding text with its spec prefix when the text does not already carry it
 */
export function formatGuideFinding(finding: ParityFinding): string {
	const spec = finding.spec
	const prefix = spec === undefined || finding.text.startsWith(spec) ? '' : `${spec} `
	return `${prefix}${finding.text}`
}

/**
 * Checks whether a guides-project result contains only passed modules and no unhandled errors.
 *
 * @param result - The external runner result to inspect
 * @returns True if a module is present, every module passed, and no unhandled error exists; false otherwise
 */
export function matchesGuideResult(result: GuideRunnerResult): boolean {
	if (result.testModules.length === 0 || result.unhandledErrors.length > 0) return false
	for (const module of result.testModules) {
		if (module.state() !== 'passed') return false
	}
	return true
}

/**
 * Resolves a Guide command root to a native absolute path.
 *
 * @param root - The workspace root as a file URL or native path
 * @returns The native absolute workspace path
 */
export function resolveGuideRoot(root: URL | string): string {
	return resolve(root instanceof URL ? fileURLToPath(root) : root)
}

/**
 * Selects the indexed guide matching a package's bare name.
 *
 * @param entries - The concept-index entries to search
 * @param name - The package's bare name, or `undefined` when none was parsed
 * @returns The indexed own-guide path, or `undefined` when the index carries none
 */
export function selectGuidePitch(
	entries: readonly ManifestEntry[],
	name: string | undefined,
): string | undefined {
	if (name === undefined) return undefined
	const spec = `guides/${name}.md`
	return entries.some((entry) => entry.spec === spec) ? spec : undefined
}
