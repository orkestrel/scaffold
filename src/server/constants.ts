/**
 * The prune-owned directories. Files outside these roots are never candidates
 * for removal, including project-owned skills under `.agents/skills` and
 * `.claude/skills`.
 *
 * @example
 * ```ts
 * import { PRUNE_DIRECTORIES } from '@orkestrel/scaffold/server'
 *
 * PRUNE_DIRECTORIES // ['.claude/agents', '.codex/agents', 'scripts']
 * ```
 */
export const PRUNE_DIRECTORIES: readonly string[] = Object.freeze([
	'.claude/agents',
	'.codex/agents',
	'scripts',
])

/** Reserved metadata file written at the root of every staged host. */
export const HOST_MANIFEST_PATH = 'manifest.json'

/** Visible characters forbidden by portable Windows/POSIX paths. */
export const INVALID_PATH_CHARACTER_PATTERN = /[<>:"|?*\\]/

/** Windows device names that remain reserved even when followed by an extension. */
export const RESERVED_PATH_SEGMENT_PATTERN =
	/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9]|conin\$|conout\$)(?:\..*)?$/i
