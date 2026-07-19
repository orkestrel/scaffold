import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

// ── Server-only test harness (AGENTS §16.1 / §17.6) ──────────────────────────
//
// Loaded after `setup.ts` for the `src:server` test project. Holds `node:*`
// helpers for the server face's real-filesystem tests (§16: no mocks).
// Environment-agnostic helpers stay in `setup.ts`.

/** The workspace root, anchored from this setup file's own location — every server test's `node:fs` loader is relative to this, never `process.cwd()`. */
export const WORKSPACE_ROOT = fileURLToPath(new URL('..', import.meta.url))

/** A real temp directory a materializer test can write into, with its own teardown. */
export interface TempDirectoryInterface {
	readonly path: string
	cleanup(): Promise<void>
}

/**
 * Create a fresh temp directory for a server-face test's real filesystem writes.
 *
 * @returns A {@link TempDirectoryInterface} with a `cleanup()` teardown every caller MUST invoke
 *
 * @example
 * ```ts
 * const directory = await buildTempDirectory()
 * try {
 * 	// ... drive the materializer against directory.path ...
 * } finally {
 * 	await directory.cleanup()
 * }
 * ```
 */
export async function buildTempDirectory(): Promise<TempDirectoryInterface> {
	const path = await mkdtemp(join(tmpdir(), 'scaffold-server-'))
	async function cleanup(): Promise<void> {
		await rm(path, { recursive: true, force: true })
	}
	return { path, cleanup }
}
