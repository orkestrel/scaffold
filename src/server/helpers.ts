import type { Artifact, Blueprint, CatalogEntry, Dependency, Plan } from '@src/core'
import type { BlockquoteNode } from '@orkestrel/markdown'
import type { ManifestEntry } from './types.js'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
	flattenText,
	isBlockquoteNode,
	isParagraphNode,
	parseDocument,
	walkNodes,
} from '@orkestrel/markdown'
import { blueprint, DEFAULT_ENGINES, DEFAULT_VERSION, ScaffoldError } from '@src/core'

// ============================================================================
//  @orkestrel/scaffold/server — helpers.ts (AGENTS §5 source of truth). The
//  server-only helpers `blueprintToPlan`'s green-field target law, the
//  `diffPlan`-feeding target reader, `Sync`'s manifest reader, the
//  `Materializer`'s vendored-host manifest, the scaffold/mirror script
//  retirement primitives, and the `catalog` bin verb depend on: `isVacant`,
//  `readTarget`, `readManifest`, `isRecord`, `readHostManifest`, `listFiles`,
//  `hydratePlan`, `discoverPackages`, `hostRoot`, `deriveBlueprint`, and
//  `catalogPackages`. `selectOrkestrelEntries`, `isManifestEntry`, and
//  `locateHostSource` are exported module-scope helpers per AGENTS §5's
//  no-nested-functions law — single-call-site status is not an exemption.
// ============================================================================

/**
 * Locate this MODULE's own installed package root — the nearest ancestor of
 * `import.meta.url` holding a `package.json` — and return its vendored
 * `dist/host` data root. THE single source of truth for the default
 * `Materializer` / `scaffold` bin host: once installed, walking up from the
 * module's own file (not `process.cwd()`, which points at whichever project
 * happens to be running) resolves to `node_modules/@orkestrel/scaffold`, the
 * correct default host — the package ships its vendored data with itself.
 * `dist/host` may not exist yet when this resolves from SOURCE under a test
 * runner; that is fine — existence is checked at the point of use, not here.
 *
 * @returns The absolute vendored `dist/host` path.
 * @throws `ScaffoldError('TARGET', …)` when no ancestor of this module's own
 *   location holds a `package.json`.
 *
 * @example
 * ```ts
 * import { hostRoot } from '@orkestrel/scaffold/server'
 *
 * hostRoot() // '/…/node_modules/@orkestrel/scaffold/dist/host'
 * ```
 */
export function hostRoot(): string {
	let dir = dirname(fileURLToPath(import.meta.url))
	for (;;) {
		if (existsSync(join(dir, 'package.json'))) return join(dir, 'dist', 'host')
		const parent = dirname(dir)
		if (parent === dir) {
			throw new ScaffoldError('TARGET', 'No package root found above the module location', {
				module: import.meta.url,
			})
		}
		dir = parent
	}
}

/**
 * Filter a manifest record's entries down to `@orkestrel/`-prefixed keys with
 * string values — the shared `dependencies` / `peerDependencies` /
 * `devDependencies` reader `deriveBlueprint` uses for every dependency-shaped
 * field.
 *
 * @param value - The candidate manifest field value (e.g. `parsed.dependencies`).
 * @returns The `@orkestrel/`-prefixed `[name, range]` entries; `[]` when
 *   `value` is not a plain object (per `isRecord`).
 *
 * @example
 * ```ts
 * import { selectOrkestrelEntries } from '@orkestrel/scaffold/server'
 *
 * selectOrkestrelEntries({ '@orkestrel/core': '^1.0.0', lodash: '^4.0.0' })
 * // [['@orkestrel/core', '^1.0.0']]
 * ```
 */
export function selectOrkestrelEntries(value: unknown): readonly (readonly [string, string])[] {
	if (!isRecord(value)) return []
	return Object.entries(value).filter(
		(entry): entry is [string, string] =>
			typeof entry[1] === 'string' && entry[0].startsWith('@orkestrel/'),
	)
}

/**
 * Reconstruct a `Blueprint` from an EXISTING repo at `target` — the faithful
 * inverse `audit` / `repair` / `mirror` need to diff a live package against
 * its own would-be scaffold, rather than a fresh, dependency-less stand-in.
 *
 * @param target - The existing package directory to derive a `Blueprint` from.
 * @remarks
 * `name` strips the `@orkestrel/` prefix off `manifest.name` — a non-`@orkestrel`
 * name is a coded `TARGET` failure, since this tool derives only `@orkestrel`
 * packages. `surfaces` is read off the LIVE line: every surface the package
 * carries has a `src/<surface>/` directory, so each of `'core' | 'browser' |
 * 'server'` is included iff that directory exists at `target`; a target with
 * NONE of the three is also a coded `TARGET` failure. `dependencies` /
 * `peers` are the `@orkestrel/`-prefixed entries of `manifest.dependencies` /
 * `manifest.peerDependencies` (a peer flagged `peerDependenciesMeta[name]
 * .optional === true` carries `optional: true`). `extras` is the
 * `@orkestrel/`-prefixed `manifest.devDependencies`, EXCLUDING
 * `@orkestrel/guide` and `@orkestrel/scaffold` — both part of the generated
 * uniform baseline every scaffolded package already carries, never a
 * package-specific extra. A devDependency ALSO present in
 * `manifest.peerDependencies` or `manifest.dependencies` (e.g. a peer
 * dev-installed for local testing) is likewise excluded from `extras` — it
 * already surfaces as a `peer`/`dependency` above, and double-counting it as
 * an `extra` would land it in `peers ∩ extras`, a blocking `validateBlueprint`
 * gate. `overrides` is always `[]` — derivation cannot know a caller's
 * template-override intent.
 * @returns The reconstructed `Blueprint`.
 * @throws `ScaffoldError('TARGET', …)` when `target`'s manifest is unreadable
 *   (via `readManifest`), is not valid JSON, its `name` is not `@orkestrel`-
 *   prefixed, or `target` carries none of the three surface directories.
 *
 * @example
 * ```ts
 * import { deriveBlueprint } from '@orkestrel/scaffold/server'
 *
 * deriveBlueprint('./packages/router') // { name: 'router', surfaces: ['core', 'server'], … }
 * ```
 */
export function deriveBlueprint(target: string): Blueprint {
	// Guides + the scaffold tool itself are part of the generated uniform
	// baseline (every scaffolded package's devDependencies), never a
	// package-specific `extras` entry — excluded from the `extras` derived below.
	const BASELINE_EXTRAS = new Set(['@orkestrel/guide', '@orkestrel/scaffold'])
	const text = readManifest(target)
	let parsed: unknown
	try {
		parsed = JSON.parse(text)
	} catch (error) {
		throw new ScaffoldError('TARGET', `Manifest at ${target} is not valid JSON`, { target, error })
	}
	if (!isRecord(parsed)) {
		throw new ScaffoldError('TARGET', `Manifest at ${target} is not a JSON object`, { target })
	}
	const rawName = parsed.name
	if (typeof rawName !== 'string' || !rawName.startsWith('@orkestrel/')) {
		throw new ScaffoldError(
			'TARGET',
			`Manifest name "${String(rawName)}" is not an @orkestrel package`,
			{ target, name: rawName },
		)
	}
	const name = rawName.slice('@orkestrel/'.length)

	const description = typeof parsed.description === 'string' ? parsed.description : undefined
	const keywords =
		Array.isArray(parsed.keywords) && parsed.keywords.every((word) => typeof word === 'string')
			? parsed.keywords
			: []
	const version = typeof parsed.version === 'string' ? parsed.version : DEFAULT_VERSION
	const engines =
		isRecord(parsed.engines) && typeof parsed.engines.node === 'string'
			? parsed.engines.node
			: DEFAULT_ENGINES

	const surfaces = (['core', 'browser', 'server'] as const).filter((surface) =>
		existsSync(join(target, 'src', surface)),
	)
	if (surfaces.length === 0) {
		throw new ScaffoldError('TARGET', `No surface directory found under ${target}/src`, { target })
	}

	const dependencies: Dependency[] = selectOrkestrelEntries(parsed.dependencies).map(
		([depName, range]) => ({ name: depName, range }),
	)

	const peersMeta = isRecord(parsed.peerDependenciesMeta) ? parsed.peerDependenciesMeta : undefined
	const peers: Dependency[] = selectOrkestrelEntries(parsed.peerDependencies).map(
		([depName, range]) => {
			const meta = peersMeta !== undefined ? peersMeta[depName] : undefined
			return isRecord(meta) && meta.optional === true
				? { name: depName, range, optional: true }
				: { name: depName, range }
		},
	)

	// A devDependency that ALSO appears in peerDependencies or dependencies is
	// excluded from extras — it already surfaces as a peer/dependency above,
	// and leaving it in extras would land it in `peers ∩ extras`, a blocking
	// `validateBlueprint` gate (H3: middleware-shaped packages dev-install a
	// peer for local testing).
	const peerAndDependencyNames = new Set([
		...selectOrkestrelEntries(parsed.peerDependencies).map(([depName]) => depName),
		...selectOrkestrelEntries(parsed.dependencies).map(([depName]) => depName),
	])
	const extras: Dependency[] = selectOrkestrelEntries(parsed.devDependencies)
		.filter(([depName]) => !BASELINE_EXTRAS.has(depName) && !peerAndDependencyNames.has(depName))
		.map(([depName, range]) => ({ name: depName, range }))

	return blueprint(name, {
		description,
		keywords,
		surfaces,
		dependencies,
		peers,
		extras,
		version,
		engines,
		overrides: [],
	})
}

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
 * @throws `ScaffoldError('TARGET', …)` when an EXISTING path fails to read
 *   (e.g. `EACCES` / `EPERM`) — carries the offending relative `path` (and
 *   the resolved `full` path) in `context`. An absent path is never an
 *   error — it is simply omitted, per the return contract above.
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
		try {
			current[path] = statSync(full).isDirectory() ? '' : readFileSync(full, 'utf8')
		} catch (error) {
			throw new ScaffoldError('TARGET', `Failed to read target file at ${path}`, {
				path,
				full,
				error,
			})
		}
	}
	return current
}

/**
 * Read `target/package.json` text — the read that feeds `manifestToDependencies`.
 *
 * @param target - The target directory to read the manifest from.
 * @returns The manifest file's raw text.
 * @throws `ScaffoldError('TARGET', …)` when the manifest is absent or
 *   unreadable (e.g. `EACCES` / `EPERM`) — carries the resolved `full` path
 *   in `context`.
 *
 * @example
 * ```ts
 * import { readManifest } from '@orkestrel/scaffold/server'
 *
 * readManifest('./packages/router') // '{ "name": "@orkestrel/router", … }'
 * ```
 */
export function readManifest(target: string): string {
	const full = join(target, 'package.json')
	try {
		return readFileSync(full, 'utf8')
	} catch (error) {
		throw new ScaffoldError('TARGET', `Failed to read manifest at ${full}`, { target, full, error })
	}
}

/**
 * Whether `value` is a plain object (not `null`, not an array).
 *
 * @param value - The candidate value.
 * @returns `true` when `value` narrows to `Record<string, unknown>`.
 *
 * @example
 * ```ts
 * import { isRecord } from '@orkestrel/scaffold/server'
 *
 * isRecord({ a: 1 }) // true
 * isRecord(null) // false
 * ```
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Whether `value` is a well-formed `host/manifest.json` entry — a string
 * `storage`, a string `destination`, and a boolean `executable`.
 *
 * @param value - The candidate raw manifest entry.
 * @returns `true` when `value` narrows to `ManifestEntry`.
 *
 * @example
 * ```ts
 * import { isManifestEntry } from '@orkestrel/scaffold/server'
 *
 * isManifestEntry({ storage: 'a', destination: 'b', executable: false }) // true
 * isManifestEntry({ storage: 'a', destination: 'b' }) // false — missing `executable`
 * ```
 */
export function isManifestEntry(value: unknown): value is ManifestEntry {
	if (!isRecord(value)) return false
	return (
		typeof value.storage === 'string' &&
		typeof value.destination === 'string' &&
		typeof value.executable === 'boolean'
	)
}

/**
 * Read and validate a vendored host root's `manifest.json`, when present.
 *
 * @param host - The host root to probe.
 * @returns The parsed entries, or `undefined` when `host` has no
 *   `manifest.json` — the raw-repo-root fallback (`Materializer` then maps
 *   an artifact's `source` to `host` 1:1, no vendored staging indirection).
 * @throws `ScaffoldError('TARGET', …)` when `manifest.json` exists but is
 *   unreadable, is not valid JSON, or is not an array of `ManifestEntry`.
 *
 * @example
 * ```ts
 * import { readHostManifest } from '@orkestrel/scaffold/server'
 *
 * readHostManifest('./dist/host') // readonly ManifestEntry[] | undefined
 * ```
 */
export function readHostManifest(host: string): readonly ManifestEntry[] | undefined {
	const full = join(host, 'manifest.json')
	if (!existsSync(full)) return undefined
	let text: string
	try {
		text = readFileSync(full, 'utf8')
	} catch (error) {
		throw new ScaffoldError('TARGET', `Failed to read host manifest at ${full}`, {
			host,
			full,
			error,
		})
	}
	let parsed: unknown
	try {
		parsed = JSON.parse(text)
	} catch (error) {
		throw new ScaffoldError('TARGET', `Host manifest at ${full} is not valid JSON`, {
			host,
			full,
			error,
		})
	}
	if (!Array.isArray(parsed) || !parsed.every(isManifestEntry)) {
		throw new ScaffoldError(
			'TARGET',
			`Host manifest at ${full} is not an array of manifest entries`,
			{
				host,
				full,
			},
		)
	}
	return parsed
}

/**
 * Recursively list a directory's files as root-relative paths.
 *
 * @param root - The directory to list.
 * @returns Root-relative file paths (posix-style `/` separators), or `[]`
 *   when `root` is absent.
 *
 * @example
 * ```ts
 * import { listFiles } from '@orkestrel/scaffold/server'
 *
 * listFiles('./dist/host/.claude/agents') // ['scout.md', 'builder.md', …]
 * ```
 */
export function listFiles(root: string): readonly string[] {
	if (!existsSync(root)) return []
	const files: string[] = []
	for (const entry of readdirSync(root, { withFileTypes: true })) {
		const full = join(root, entry.name)
		if (entry.isDirectory()) {
			for (const nested of listFiles(full)) files.push(`${entry.name}/${nested}`)
		} else {
			files.push(entry.name)
		}
	}
	return files
}

/**
 * Resolve the absolute host-storage path for a host-origin artifact's
 * `source`, manifest-aware.
 *
 * @param manifest - The host's parsed `manifest.json` entries, or `undefined`
 *   when the host carries none (raw-repo-root fallback).
 * @param source - The artifact's `source` (or `path`) to resolve.
 * @param host - The resolved host root the path is joined against.
 * @returns `join(host, source)` when `manifest` is `undefined` (no vendored
 *   staging indirection); when `manifest` is present, `join(host,
 *   entries[0].storage)` for the SINGLE manifest entry whose `destination`
 *   equals `source`, or `undefined` when zero or more than one entry matches
 *   (`source` names a directory, or the manifest is ambiguous — no single
 *   storage file to point at).
 *
 * @example
 * ```ts
 * import { locateHostSource } from '@orkestrel/scaffold/server'
 *
 * locateHostSource(undefined, 'package.json', './dist/host') // './dist/host/package.json'
 * locateHostSource([{ storage: 'pkg.tmpl', destination: 'package.json', executable: false }], 'package.json', './dist/host')
 * // './dist/host/pkg.tmpl'
 * ```
 */
export function locateHostSource(
	manifest: readonly ManifestEntry[] | undefined,
	source: string,
	host: string,
): string | undefined {
	if (manifest === undefined) return join(host, source)
	const entries = manifest.filter((entry) => entry.destination === source)
	if (entries.length !== 1) return undefined
	return join(host, entries[0].storage)
}

/**
 * Rehydrate a `Plan`'s `host`-origin artifacts with their real byte content
 * read from `host` — manifest-aware, via `locateHostSource`.
 *
 * @param plan - The plan to hydrate.
 * @param host - The resolved host root to read from.
 * @returns A new `Plan` whose file-shaped `host` artifacts carry `content`;
 *   `template` / `computed` artifacts and directory-shaped `host` artifacts
 *   (no single storage file to read) pass through untouched.
 * @throws `ScaffoldError('TARGET', …)` when a resolved, existing host source
 *   file fails to read.
 *
 * @example
 * ```ts
 * import { hydratePlan } from '@orkestrel/scaffold/server'
 *
 * const hydrated = hydratePlan(plan, './dist/host')
 * ```
 */
export function hydratePlan(plan: Plan, host: string): Plan {
	const manifest = readHostManifest(host)
	const artifacts = plan.artifacts.map((artifact): Artifact => {
		if (artifact.origin !== 'host') return artifact
		const source = artifact.source ?? artifact.path
		const full = locateHostSource(manifest, source, host)
		if (full === undefined || !existsSync(full) || statSync(full).isDirectory()) return artifact
		try {
			return { ...artifact, content: readFileSync(full, 'utf8') }
		} catch (error) {
			throw new ScaffoldError('TARGET', `Failed to read host artifact at ${source}`, {
				source,
				full,
				error,
			})
		}
	})
	return { ...plan, artifacts }
}

/**
 * List a fleet root's `@orkestrel/*` package directories.
 *
 * @param root - The fleet root directory to scan.
 * @returns Absolute, code-unit-sorted paths of `root`'s immediate child
 *   directories whose `package.json` parses and whose `name` starts with
 *   `@orkestrel/`. A child with an unreadable or unparsable `package.json`,
 *   or a non-`@orkestrel` name, is skipped silently — it simply is not a
 *   fleet member.
 *
 * @example
 * ```ts
 * import { discoverPackages } from '@orkestrel/scaffold/server'
 *
 * discoverPackages('./packages') // ['/abs/packages/router', '/abs/packages/budget']
 * ```
 */
export function discoverPackages(root: string): readonly string[] {
	const packages: string[] = []
	for (const entry of readdirSync(root, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue
		const directory = join(root, entry.name)
		const manifestPath = join(directory, 'package.json')
		if (!existsSync(manifestPath)) continue
		let parsed: unknown
		try {
			parsed = JSON.parse(readFileSync(manifestPath, 'utf8'))
		} catch {
			continue
		}
		if (!isRecord(parsed)) continue
		const name = parsed.name
		if (typeof name === 'string' && name.startsWith('@orkestrel/')) packages.push(directory)
	}
	return packages.sort()
}

/**
 * Build the fleet package catalog — one `CatalogEntry` per `@orkestrel/*`
 * package discovered under each root, its description drawn from its own
 * guide's FIRST blockquote.
 *
 * @param roots - The fleet root directories to scan (each walked via `discoverPackages`).
 * @remarks
 * Per discovered package directory: `name` / `version` come from its own
 * `package.json`; `description` is the first paragraph of the guide's opening
 * blockquote — the flattened text of the FIRST `ParagraphNode` among the
 * FIRST `BlockquoteNode` found's (depth-first, pre-order, via `walkNodes`)
 * TOP-LEVEL children in its `guides/src/<short>.md` (`<short>` = `name` with
 * the `@orkestrel/` prefix stripped), parsed with `@orkestrel/markdown`'s
 * `parseDocument` — a multi-paragraph blockquote overview yields only its
 * FIRST paragraph, never the whole quote glued together; embedded newlines
 * collapse to single spaces, and surrounding whitespace trims. A
 * missing/unreadable guide, a guide carrying no blockquote, or a blockquote
 * with no top-level paragraph child, yields `description: ''`, never a
 * thrown error. Entries merge across `roots` (a later root's entry for a
 * repeated `name` wins), then code-unit sort by `name`. An unreadable ROOT
 * itself is NOT wrapped here — whatever `discoverPackages` throws for it
 * propagates as-is; the bin layer is responsible for coding that failure
 * `TARGET`.
 * @returns The merged, sorted `CatalogEntry[]`.
 *
 * @example
 * ```ts
 * import { catalogPackages } from '@orkestrel/scaffold/server'
 *
 * catalogPackages(['/repos']) // [{ name: '@orkestrel/contract', version: '0.0.5', description: '…' }, …]
 * ```
 */
export function catalogPackages(roots: readonly string[]): readonly CatalogEntry[] {
	const merged = new Map<string, CatalogEntry>()
	for (const root of roots) {
		for (const directory of discoverPackages(root)) {
			let parsed: unknown
			try {
				parsed = JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8'))
			} catch {
				continue
			}
			if (!isRecord(parsed)) continue
			const name = parsed.name
			if (typeof name !== 'string' || !name.startsWith('@orkestrel/')) continue
			const version = typeof parsed.version === 'string' ? parsed.version : DEFAULT_VERSION
			const short = name.slice('@orkestrel/'.length)
			const guidePath = join(directory, 'guides', 'src', `${short}.md`)
			let description = ''
			if (existsSync(guidePath)) {
				try {
					const document = parseDocument(readFileSync(guidePath, 'utf8'))
					let quote: BlockquoteNode | undefined
					for (const node of walkNodes(document)) {
						if (isBlockquoteNode(node)) {
							quote = node
							break
						}
					}
					if (quote !== undefined) {
						// Only the FIRST top-level paragraph child of the quote — a
						// multi-paragraph blockquote overview (an opening sentence
						// followed by elaboration) would otherwise flatten its ENTIRE
						// quote into one verbose row; taking just the first paragraph
						// keeps the catalog description concise, one line per package.
						const paragraph = quote.children.find((child) => isParagraphNode(child))
						if (paragraph !== undefined) {
							const text = flattenText(paragraph)
							description = text.replace(/\s+/g, ' ').trim()
						}
					}
				} catch {
					description = ''
				}
			}
			merged.set(name, { name, version, description })
		}
	}
	return [...merged.values()].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
}
