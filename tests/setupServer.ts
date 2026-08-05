import type { Plan, Environment } from '@src/core'
import type { HostManifest, ManifestEntry } from '@src/server'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { existsSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { mkdtemp, rm } from 'node:fs/promises'
import { createServer as createHTTPServer } from 'node:http'
import { createServer as createNetServer } from 'node:net'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { blueprint } from '@src/core'

// ── Server-only test harness (AGENTS §16.1 / §17.6) ──────────────────────────
//
// Loaded after `setup.ts` for the `src:server` test project. Holds `node:*`
// helpers for the server face's real-filesystem tests (§16: no mocks).
// Environment-agnostic helpers stay in `setup.ts`.

/** The workspace root, anchored from this setup file's own location — every server test's `node:fs` loader is relative to this, never `process.cwd()`. */
export const WORKSPACE_ROOT = fileURLToPath(new URL('..', import.meta.url))

/** The registry's exact-membership organization package-list path. */
export const ORG_REGISTRY_PATH = '/-/org/orkestrel/package'

/** A real temp directory a materializer test can write into, with its own teardown. */
export interface TempDirectoryInterface {
	readonly path: string
	cleanup(): Promise<void>
}

/** Route callback used by the real ephemeral HTTP fixture. */
export type RouteHandler = (request: IncomingMessage, response: ServerResponse) => void

/** Real ephemeral HTTP server fixture with per-path routes and hit counts. */
export interface HTTPFixtureInterface {
	readonly base: string
	readonly hits: Map<string, number>
	route(path: string, handler: RouteHandler): void
	close(): Promise<void>
}

/** Focused package shape for filesystem-backed blueprint derivation tests. */
export interface BlueprintFixtureOptions {
	readonly name: string
	readonly src?: readonly Environment[]
	readonly app?: readonly Environment[]
	readonly private?: boolean
	readonly dependencies?: Record<string, string>
	readonly peerDependencies?: Record<string, string>
	readonly peerDependenciesMeta?: Record<string, { optional?: boolean }>
	readonly devDependencies?: Record<string, string>
	readonly bin?: boolean
	readonly integration?: boolean
	readonly service?: boolean
	readonly global?: boolean
	readonly showcase?: boolean
}

/** Focused package shape for filesystem-backed catalog tests. */
export interface CatalogPackageOptions {
	readonly name: string
	readonly version: string
	readonly guide?: string
}

/** Real temporary-directory fixture with deterministic asynchronous cleanup. */
export class TempDirectory implements TempDirectoryInterface {
	readonly path: string

	constructor(path: string) {
		this.path = path
	}

	async cleanup(): Promise<void> {
		await rm(this.path, { recursive: true, force: true })
	}
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
	return new TempDirectory(path)
}

/**
 * Create a temporary directory inside the workspace for containment-boundary tests.
 *
 * @returns A {@link TempDirectoryInterface} rooted under the workspace's
 * ignored `tmp` directory.
 */
export async function buildWorkspaceTempDirectory(): Promise<TempDirectoryInterface> {
	const root = join(WORKSPACE_ROOT, 'tmp')
	mkdirSync(root, { recursive: true })
	const path = await mkdtemp(join(root, 'scaffold-server-'))
	return new TempDirectory(path)
}

/** Build a package manifest plus the source directories blueprint derivation inspects. */
export function buildBlueprintFixture(root: string, options: BlueprintFixtureOptions): void {
	mkdirSync(root, { recursive: true })
	writeFileSync(
		join(root, 'package.json'),
		JSON.stringify({
			name: options.name,
			private: options.private,
			dependencies: options.dependencies ?? {},
			peerDependencies: options.peerDependencies ?? {},
			peerDependenciesMeta: options.peerDependenciesMeta ?? {},
			devDependencies: options.devDependencies ?? {},
		}),
		'utf8',
	)
	for (const environment of options.src ?? []) {
		mkdirSync(join(root, 'src', environment), { recursive: true })
	}
	for (const environment of options.app ?? []) {
		mkdirSync(join(root, 'app', environment), { recursive: true })
	}
	if (options.bin === true) mkdirSync(join(root, 'src', 'bin'), { recursive: true })
	if (options.integration === true) {
		mkdirSync(join(root, 'tests', 'integration'), { recursive: true })
	}
	if (options.service === true) {
		mkdirSync(join(root, 'tests', 'service'), { recursive: true })
		writeFileSync(join(root, 'tests', 'setupService.ts'), '', 'utf8')
		mkdirSync(join(root, 'scripts'), { recursive: true })
		writeFileSync(join(root, 'scripts', 'service.sh'), '', 'utf8')
	}
	if (options.global === true) {
		mkdirSync(join(root, 'tests'), { recursive: true })
		writeFileSync(join(root, 'tests', 'setupGlobal.ts'), '', 'utf8')
	}
	if (options.showcase === true) {
		mkdirSync(join(root, 'configs', 'app'), { recursive: true })
		writeFileSync(join(root, 'configs', 'app', 'vite.showcase.config.ts'), '', 'utf8')
	}
}

/** Write a minimal package manifest for a real filesystem fixture. */
export function writePackageManifest(directory: string, manifest: Record<string, unknown>): void {
	mkdirSync(directory, { recursive: true })
	writeFileSync(join(directory, 'package.json'), JSON.stringify(manifest), 'utf8')
}

/** Write a catalog package manifest and its optional Markdown guide. */
export function writeCatalogPackage(
	root: string,
	directory: string,
	options: CatalogPackageOptions,
): void {
	const path = join(root, directory)
	writePackageManifest(path, { name: options.name, version: options.version })
	if (options.guide === undefined) return
	const short = options.name.slice('@orkestrel/'.length)
	mkdirSync(join(path, 'guides', 'src'), { recursive: true })
	writeFileSync(join(path, 'guides', 'src', `${short}.md`), options.guide, 'utf8')
}

/** Build a real loopback HTTP fixture on an ephemeral port. */
export async function buildHTTPFixture(): Promise<HTTPFixtureInterface> {
	const routes = new Map<string, RouteHandler>()
	const hits = new Map<string, number>()
	const server = createHTTPServer((request, response) => {
		const url = request.url ?? ''
		hits.set(url, (hits.get(url) ?? 0) + 1)
		const handler = routes.get(url)
		if (handler === undefined) {
			response.writeHead(404)
			response.end()
			return
		}
		handler(request, response)
	})
	await new Promise<void>((resolvePromise) => server.listen(0, '127.0.0.1', () => resolvePromise()))
	const address = server.address()
	if (address === null || typeof address === 'string') {
		server.close()
		throw new Error('expected the HTTP fixture to bind an IP socket')
	}
	return {
		base: `http://127.0.0.1:${address.port}`,
		hits,
		route(path, handler) {
			routes.set(path, handler)
		},
		async close() {
			await new Promise<void>((resolvePromise) => server.close(() => resolvePromise()))
		},
	}
}

/** Build the canonical raw-GitHub path for one dependency guide. */
export function buildGuidePath(short: string, branch = 'main'): string {
	return `/orkestrel/${short}/refs/heads/${branch}/guides/src/${short}.md`
}

/** Build the canonical registry path for a package name. */
export function buildRegistryPath(name: string): string {
	return `/${name.replace('/', '%2F')}`
}

/** Send a text fixture response. */
export function respondText(response: ServerResponse, status: number, body: string): void {
	response.writeHead(status, { 'content-type': 'text/plain' })
	response.end(body)
}

/** Send a registry version fixture response. */
export function respondJSON(response: ServerResponse, latest: string): void {
	response.writeHead(200, { 'content-type': 'application/json' })
	response.end(JSON.stringify({ 'dist-tags': { latest } }))
}

/** Send a registry packument fixture response. */
export function respondPackument(
	response: ServerResponse,
	latest: string,
	description: string,
): void {
	response.writeHead(200, { 'content-type': 'application/json' })
	response.end(JSON.stringify({ 'dist-tags': { latest }, description }))
}

/** Abruptly destroy a fixture response to induce a real transport fault. */
export function respondDestroy(response: ServerResponse): void {
	response.destroy()
}

/** Build a raw host fixture with one canonical file in every prune-owned directory. */
export async function buildVendoredHost(): Promise<TempDirectoryInterface> {
	const host = await buildTempDirectory()
	mkdirSync(join(host.path, '.claude', 'agents'), { recursive: true })
	mkdirSync(join(host.path, '.codex', 'agents'), { recursive: true })
	mkdirSync(join(host.path, 'scripts'), { recursive: true })
	writeFileSync(join(host.path, '.claude', 'agents', 'scout.md'), 'vendored scout', 'utf8')
	writeFileSync(join(host.path, '.codex', 'agents', 'scout.toml'), 'vendored scout', 'utf8')
	writeFileSync(join(host.path, 'scripts', 'build.sh'), 'vendored build', 'utf8')
	return host
}

/** Build a complete staged-host manifest fixture from its constituent inventory. */
export function hostManifestOf(
	entries: readonly ManifestEntry[],
	roots: readonly string[],
): HostManifest {
	return { entries, roots }
}

/** Write a complete host manifest fixture under `host`. */
export function writeHostManifest(host: string, manifest: HostManifest): void {
	writeFileSync(join(host, 'manifest.json'), JSON.stringify(manifest), 'utf8')
}

/** Write placeholder bytes for every storage file declared by a manifest fixture. */
export function writeHostStorage(host: string, entries: readonly ManifestEntry[]): void {
	for (const entry of entries) {
		const full = join(host, entry.storage)
		mkdirSync(dirname(full), { recursive: true })
		writeFileSync(full, entry.destination, 'utf8')
	}
}

/** Build the staged host used by manifest-aware materializer tests. */
export async function buildManifestHost(): Promise<TempDirectoryInterface> {
	const host = await buildTempDirectory()
	const entries: readonly ManifestEntry[] = [
		{ storage: 'dotfiles/gitignore', destination: '.gitignore', executable: false },
		{ storage: 'claude/settings.json', destination: '.claude/settings.json', executable: false },
		{ storage: 'scripts/deps.sh', destination: 'scripts/deps.sh', executable: true },
	]
	mkdirSync(join(host.path, 'dotfiles'), { recursive: true })
	mkdirSync(join(host.path, 'claude'), { recursive: true })
	mkdirSync(join(host.path, 'scripts'), { recursive: true })
	writeFileSync(join(host.path, 'dotfiles', 'gitignore'), 'node_modules\n', 'utf8')
	writeFileSync(join(host.path, 'claude', 'settings.json'), '{"permissions":{}}', 'utf8')
	writeFileSync(join(host.path, 'scripts', 'deps.sh'), '#!/bin/sh\necho deps\n', 'utf8')
	writeHostManifest(host.path, hostManifestOf(entries, ['.claude', 'scripts']))
	return host
}

/** Build the canonical plan used by manifest-aware materializer tests. */
export function buildManifestPlan(): Plan {
	return {
		blueprint: blueprint('manifest-fixture', { src: ['core'] }),
		groups: ['configs', 'orchestration'],
		artifacts: [
			{ path: '.gitignore', group: 'configs', origin: 'host' },
			{ path: '.claude/settings.json', group: 'configs', origin: 'host' },
			{ path: 'scripts/deps.sh', group: 'orchestration', origin: 'host' },
		],
	}
}

/** Build the canonical three-artifact plan used by repair tests. */
export function buildRepairPlan(): Plan {
	return {
		blueprint: blueprint('repair-fixture', { src: ['core'] }),
		groups: ['docs'],
		artifacts: [
			{ path: 'a.txt', group: 'docs', origin: 'computed', content: 'A' },
			{ path: 'b.txt', group: 'docs', origin: 'computed', content: 'B-new' },
			{ path: 'c.txt', group: 'docs', origin: 'computed', content: 'C' },
		],
	}
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
export function probeSymlink(): boolean {
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
export async function probeSocket(): Promise<boolean> {
	const scratch = await mkdtemp(join(tmpdir(), 'scaffold-probe-socket-'))
	const socketPath = join(scratch, 's')
	const server = createNetServer()
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

/** Create a real directory link using the host platform's supported link form. */
export function createDirectoryLink(target: string, path: string): void {
	symlinkSync(target, path, process.platform === 'win32' ? 'junction' : 'dir')
}

/** Probe whether this process can create and traverse a real directory link. */
export function probeDirectoryLink(): boolean {
	const scratch = mkdtempSync(join(tmpdir(), 'scaffold-probe-directory-link-'))
	try {
		const target = join(scratch, 'target')
		mkdirSync(target)
		createDirectoryLink(target, join(scratch, 'link'))
		return true
	} catch {
		return false
	} finally {
		rmSync(scratch, { recursive: true, force: true })
	}
}

/** Probe whether this filesystem resolves path segments without regard to ASCII case. */
export function probeCaseInsensitiveFilesystem(): boolean {
	const scratch = mkdtempSync(join(tmpdir(), 'scaffold-probe-case-'))
	try {
		mkdirSync(join(scratch, 'MixedCase'))
		return existsSync(join(scratch, 'MIXEDCASE')) && existsSync(join(scratch, 'mixedcase'))
	} finally {
		rmSync(scratch, { recursive: true, force: true })
	}
}

/** Whether this environment can create filesystem symlinks (POSIX with permission, or Windows in developer mode/admin). Tests guarded by `it.skipIf(!canSymlink)` skip with an advisory naming the containment case as unverified; they pass unconditionally on capable POSIX hosts. */
export const canSymlink = probeSymlink()

/** Whether this environment can create a filesystem directory link/junction. */
export const canDirectoryLink = probeDirectoryLink()

/** Whether this environment's temporary filesystem is case-insensitive. */
export const canIgnoreFilesystemCase = probeCaseInsensitiveFilesystem()

/** Whether this environment can bind Unix domain sockets. Tests guarded by `it.skipIf(!canSocket)` skip with an advisory naming the unreadable-source case as unverified; they pass unconditionally on socket-capable hosts. */
export const canSocket = await probeSocket()

/** Whether this platform expresses POSIX permission mode bits at all — here the platform is the semantics (Windows `stat` carries no meaningful execute bit to probe for). Tests guarded by `it.skipIf(!hasModes)` skip with an advisory naming the exec-bit assertion as unverified on this platform. */
export const hasModes = process.platform !== 'win32'
