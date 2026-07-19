import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

// ============================================================================
//  @orkestrel/scaffold/server — helpers.ts (AGENTS §5 source of truth). The
//  two server-only helpers `blueprintToPlan`'s green-field target law and the
//  `diffPlan`-feeding target reader depend on: `isVacant` and `readTarget`.
// ============================================================================

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
 * Read a target's current content at a set of relative paths into a
 * `Record<string, string>` — the I/O that feeds the pure `diffPlan`.
 *
 * @param target - The target directory to read from.
 * @param paths - The plan-relative artifact paths to probe.
 * @returns A record keyed by path; a directory entry maps to `''` (presence
 *   only — a `host`-origin directory artifact is audited by presence, never
 *   content), an absent path is OMITTED entirely (never an empty-string
 *   placeholder for a missing file, so `diffPlan` reports it `missing`).
 *
 * @example
 * ```ts
 * import { readTarget } from '@orkestrel/scaffold/server'
 *
 * readTarget('./packages/router', ['package.json', 'src/core/index.ts'])
 * // { 'package.json': '{ "name": … }', 'src/core/index.ts': '…' }
 * ```
 */
export function readTarget(
	target: string,
	paths: readonly string[],
): Readonly<Record<string, string>> {
	const current: Record<string, string> = {}
	for (const path of paths) {
		const full = join(target, path)
		if (!existsSync(full)) continue
		current[path] = statSync(full).isDirectory() ? '' : readFileSync(full, 'utf8')
	}
	return current
}
