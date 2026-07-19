import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { mkdtemp, rm } from 'node:fs/promises'
import { createServer } from 'node:net'
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

// ── Capability probes (environment-graceful skips, never a false red) ───────
//
// These probe the CURRENT environment's actual capability rather than guessing
// from `process.platform` (the one exception is `hasModes`, where the platform
// IS the semantics — POSIX permission bits have no Windows equivalent to probe
// for). Every probe runs once at module load; a test guarded by one that comes
// back `false` uses `it.skipIf` at declaration, with an advisory naming exactly
// what was not verified — never a conditional `expect`.

/** Probe whether this process can create a filesystem symlink, via a real scratch symlink in a throwaway temp directory (cleaned up immediately after). */
function probeSymlink(): boolean {
	const scratch = mkdtempSync(join(tmpdir(), 'scaffold-probe-symlink-'))
	try {
		const target = join(scratch, 'target.txt')
		writeFileSync(target, '', 'utf8')
		symlinkSync(target, join(scratch, 'link'))
		return true
	} catch {
		return false
	} finally {
		rmSync(scratch, { recursive: true, force: true })
	}
}

/** Probe whether this process can bind a Unix domain socket, via a real throwaway `net.Server` listening on a scratch path (torn down immediately after). */
async function probeSocket(): Promise<boolean> {
	const scratch = await mkdtemp(join(tmpdir(), 'scaffold-probe-socket-'))
	const socketPath = join(scratch, 's')
	const server = createServer()
	try {
		await new Promise<void>((resolvePromise, reject) => {
			server.once('error', reject)
			server.listen(socketPath, () => resolvePromise())
		})
		return true
	} catch {
		return false
	} finally {
		await new Promise<void>((resolvePromise) => server.close(() => resolvePromise()))
		await rm(scratch, { recursive: true, force: true })
	}
}

/** Whether this environment can create filesystem symlinks (POSIX with permission, or Windows in developer mode/admin). Tests guarded by `it.skipIf(!canSymlink)` SKIP with an advisory naming the containment case as unverified; they pass unconditionally on capable POSIX CI. */
export const canSymlink = probeSymlink()

/** Whether this environment can bind Unix domain sockets (unavailable in most sandboxed Windows CI). Tests guarded by `it.skipIf(!canSocket)` SKIP with an advisory naming the unreadable-source case as unverified; they pass unconditionally on POSIX / socket-capable CI. */
export const canSocket = await probeSocket()

/** Whether this platform expresses POSIX permission mode bits at all — here the platform IS the semantics (Windows `stat` carries no meaningful execute bit to probe for). Tests guarded by `it.skipIf(!hasModes)` SKIP with an advisory naming the exec-bit assertion as unverified on this platform; they pass unconditionally on POSIX. */
export const hasModes = process.platform !== 'win32'
