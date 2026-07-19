// The `#!/usr/bin/env node` shebang is re-emitted by the build's `output.banner`, not source.
import { existsSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, relative as relativeOf, resolve, sep } from 'node:path'
import * as tls from 'node:tls'
import { parseArgs } from 'node:util'
import type { Audit, Blueprint, CatalogEntry, Dependency, Group, Plan, SyncReport } from '@src/core'
import {
	auditToReview,
	blueprint,
	blueprintToPlan,
	catalogToBlock,
	createCompiler,
	dependency,
	DEPENDENCY_NAME_PATTERN,
	diffPlan,
	GROUPS,
	isScaffoldError,
	manifestToDependencies,
	planToReview,
	planToSummary,
	ScaffoldError,
	SURFACES,
	syncToReview,
} from '@src/core'
import {
	catalogPackages,
	createMaterializer,
	createSync,
	deriveBlueprint,
	discoverPackages,
	hostRoot,
	hydratePlan,
	readManifest,
	readTarget,
} from '@src/server'
import { createReporter, createSpinner } from '@orkestrel/console'
import { createServerSink } from '@orkestrel/console/server'
import { createTerminal } from '@orkestrel/terminal/server'

const USAGE = `Usage: scaffold <new|sync|audit|repair|mirror|catalog> [options]

Every verb is a DRY RUN by default — pass --apply to write.
\`new <name>\` writes the package into ./<name> under the cwd (--target overrides the exact destination).
Run any verb bare on a terminal and it prompts for what's missing.
Every WRITE destination resolves under the current directory — cd there first
(e.g. \`cd ../fleet-root && scaffold mirror --apply\`); --host may point anywhere (read-only).

  new <name> [--surfaces a,b] [--deps x,y] [--apply] [--target <path>] [--host <path>]
    Create a package. Prompts interactively for a missing name or surfaces on a TTY.
    e.g. scaffold new widget --surfaces core,server --apply

  sync [--target .] [--deps x,y] [--apply] [--strict]
    Refresh vendored dependency mirrors and report range drift.
    e.g. scaffold sync --deps @orkestrel/core --apply

  audit [--target .] [--live] [--host <path>] [--groups a,b]
    Structural conformance check; --live adds guide/version freshness; --host
    enables content-aware host diffing (default host falls back to
    presence-only silently; an EXPLICIT --host that fails to resolve is a
    coded TARGET failure). --groups restricts the plan to the listed groups
    (default: full plan) — e.g. --groups configs,docs,orchestration for CI.
    e.g. scaffold audit --groups configs,docs

  repair [--target .] [--apply] [--prune] [--host <path>]
    Apply drift-only fixes for one target, scoped to HOST-ORIGIN artifacts
    ONLY (including .github/workflows/ci.yml — single-target explicit intent
    keeps full host scope, unlike mirror) — never touches hand-written
    src/tests/guides/package.json; dry-run by default (reports drift).
    e.g. scaffold repair --apply

  mirror [--root .] [--apply] [--prune] [--host <path>]
    Fleet-wide host-origin audit/repair across every @orkestrel package
    beneath root; scans root's IMMEDIATE CHILDREN, never root itself — cd
    into the folder that CONTAINS your checkouts first (repair is the
    single-repo tool: run it from inside one repo instead).
    Excludes .github/workflows/ci.yml (repo-flavored — use repair --apply).
    e.g. cd ../fleet-root && scaffold mirror --apply

  catalog [--root <dir> ...] [--target <repo>] [--offline] [--apply]
    Regenerate the fleet package catalog table embedded in
    <target>/.claude/agents/orkestrel.md between its <!-- catalog:start -->
    / <!-- catalog:end --> markers. The npm registry is the AUTHORITATIVE
    package list (every \`@orkestrel/*\` published package, description from
    its guide's first blockquote, falling back to its registry description);
    each --root (repeatable; read-only, unrestricted) ADDS local-only
    discoveries the registry doesn't know about yet, and its guide
    description wins over the registry's for a package the root ALSO carries.
    --offline skips the registry/GitHub entirely and sources --root(s) only
    (default cwd) — the old, fully-local behavior, now opt-in. A shrink
    warning prints (on dry-run AND --apply) whenever the new table has fewer
    rows than the one currently embedded. Dry-run reports drift (nonzero on
    any); --apply writes.
    e.g. scaffold catalog --root .. --apply
    e.g. scaffold catalog --offline --root .. --apply

Flags: --help prints this text; a repeated flag keeps its LAST occurrence.
TLS trusts the system certificate store automatically (corporate proxies);
NODE_EXTRA_CA_CERTS adds custom PEMs.

Windows/PowerShell: invoke as \`node ./dist/bin/scaffold.js …\` from a checkout,
or \`npx scaffold …\` once installed — PowerShell mangles npm's \`--\` passthrough,
so avoid \`npm run scaffold -- …\` there.
`

const sink = createServerSink()
const reporter = createReporter({ sink, width: sink.columns })

/**
 * Widen Node's default trusted-issuer set to include the OS certificate
 * store, so `fetch` behind a corporate TLS-inspecting proxy behaves like npm
 * (`cafile`) and browsers (OS trust store) instead of failing with
 * `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` against Node's bundled CA list alone.
 * Feature-detected (`tls.getCACertificates` / `tls.setDefaultCACertificates`
 * ship on Node ≈22.16+/24.5+; this package's floor is `>=22`) and wrapped in
 * try/catch — any failure is a silent no-op, never a crash. This only ADDS
 * trusted issuers; it never touches `rejectUnauthorized` or
 * `NODE_TLS_REJECT_UNAUTHORIZED`, so certificate verification stays on.
 */
function trustSystemCertificates(): void {
	if (
		typeof tls.getCACertificates !== 'function' ||
		typeof tls.setDefaultCACertificates !== 'function'
	) {
		return
	}
	try {
		const merged = new Set([
			...tls.getCACertificates('default'),
			...tls.getCACertificates('system'),
		])
		tls.setDefaultCACertificates([...merged])
	} catch {
		// Trust-store quirks never crash the CLI — fetch failures still surface their own diagnosis.
	}
}

/**
 * The one sentinel that unwinds the whole command dispatch to a chosen exit
 * code (H4/Windows) — thrown instead of calling `process.exit`, so every
 * `finally` between the throw site and the top-level driver still runs
 * (entity teardown drains naturally instead of racing process teardown).
 * Caught exactly once, at the bottom of this file.
 */
class CliExit extends Error {
	readonly code: number

	constructor(code: number) {
		super(`cli-exit:${String(code)}`)
		this.code = code
	}
}

/** Halt command dispatch with `code` (H4) — never `process.exit`; unwinds through every `finally` first. */
function halt(code: number): never {
	throw new CliExit(code)
}

/** Print a one-line coded error (never a stack) and halt nonzero. */
function fail(message: string): never {
	reporter.status('error', message)
	halt(1)
}

/** Render a caught error as a clean one-line message — a `ScaffoldError`'s code, or a bare message otherwise. */
function describe(error: unknown): string {
	if (isScaffoldError(error)) return `[${error.code}] ${error.message}`
	return error instanceof Error ? error.message : 'unknown error'
}

// Realpath-resolve the DEEPEST EXISTING ancestor of `path` (following any
// symlink it or its ancestors are), then rejoin the still-nonexistent
// remainder unchanged — mirrors the server `Materializer`'s `#resolveReal` so
// a not-yet-created destination is checked against where a symlinked segment
// actually points, without realpath'ing a leaf that does not exist yet.
function resolveReal(path: string): string {
	if (existsSync(path)) return realpathSync(path)
	const parent = dirname(path)
	if (parent === path) return path
	return join(resolveReal(parent), relativeOf(parent, path))
}

/**
 * Confine a WRITE destination to the current working directory (global-CLI
 * safety): `new`'s resolved target, `--target` on sync/audit/repair/catalog,
 * and `--root` on mirror all pass through here before use. A READ-ONLY
 * source (`--host`, and `--root` on catalog) is exempt — sibling-repo
 * sourcing from outside the cwd is legitimate. Equal to the cwd or nested
 * beneath it passes; anything else is a coded `INVALID` failure (AGENTS §12),
 * never a silent clamp.
 *
 * @returns The resolved (non-realpath'd) absolute path, for use as the
 * verb's destination.
 */
function containDestination(candidate: string): string {
	const resolvedCwd = resolveReal(resolve(process.cwd()))
	const resolvedCandidate = resolveReal(resolve(candidate))
	if (resolvedCandidate !== resolvedCwd && !resolvedCandidate.startsWith(resolvedCwd + sep)) {
		throw new ScaffoldError(
			'INVALID',
			`Target "${candidate}" escapes the working directory — run scaffold from the directory you want to write beneath.`,
			{ path: candidate },
		)
	}
	return resolve(candidate)
}

/** `node:util`'s strict `parseArgs`, isolated so its throw on an unknown/malformed flag is catchable (H3). */
function parseArguments() {
	// Strip a single leading literal '--' (npm passthrough residue that
	// PowerShell mangles, e.g. `npm run scaffold -- new x`) so it parses as `new x`.
	const args = process.argv.slice(2)
	if (args[0] === '--') args.shift()
	return parseArgs({
		args,
		allowPositionals: true,
		options: {
			surfaces: { type: 'string' },
			deps: { type: 'string' },
			groups: { type: 'string' },
			target: { type: 'string' },
			root: { type: 'string', multiple: true },
			host: { type: 'string' },
			apply: { type: 'boolean', default: false },
			prune: { type: 'boolean', default: false },
			strict: { type: 'boolean', default: false },
			live: { type: 'boolean', default: false },
			offline: { type: 'boolean', default: false },
			help: { type: 'boolean', default: false },
		},
	})
}

/**
 * Best-effort `hydratePlan` — used by `audit` / `repair` / `mirror` so a
 * missing DEFAULT `host` root degrades to presence-only auditing instead of
 * failing the verb. An EXPLICITLY-passed `--host` that does not resolve to a
 * usable directory is NOT downgraded silently — that is a coded `TARGET`
 * failure (M1), since the caller named that host on purpose.
 */
function hydrateBestEffort(
	plan: Plan,
	host: string,
	explicit: boolean,
): { readonly plan: Plan; readonly aware: boolean } {
	if (!existsSync(host)) {
		if (explicit) {
			throw new ScaffoldError('TARGET', `--host does not resolve to a directory: ${host}`, {
				host,
			})
		}
		return { plan, aware: false }
	}
	try {
		return { plan: hydratePlan(plan, host), aware: true }
	} catch (error) {
		if (isScaffoldError(error) && error.code === 'TARGET') return { plan, aware: false }
		throw error
	}
}

/**
 * The whole command dispatch — a single top-level driver (no nested function
 * declarations, AGENTS §4). Every verb sets `process.exitCode` (never
 * `process.exit`, H4) and returns, or `halt()`s through a `finally` that
 * tears its entities down first; the caller at the bottom of this file
 * catches exactly one sentinel (`CliExit`) and stops.
 */
async function main(): Promise<void> {
	let parsed: ReturnType<typeof parseArguments>
	try {
		parsed = parseArguments()
	} catch (error) {
		process.stderr.write(
			`${error instanceof Error ? error.message : 'invalid arguments'}\n\n${USAGE}`,
		)
		process.exitCode = 1
		return
	}

	const { values, positionals } = parsed

	if (values.help) {
		process.stdout.write(USAGE)
		return
	}

	const [command, argument] = positionals

	if (command === undefined) {
		process.stderr.write(USAGE)
		process.exitCode = 1
		return
	} else if (command === 'sync') {
		let target: string
		try {
			target = containDestination(values.target ?? '.')
		} catch (error) {
			fail(describe(error))
		}
		const sync = createSync({ strict: values.strict })
		try {
			const wanted = values.deps?.split(',')

			let report: SyncReport
			try {
				const declared = manifestToDependencies(readManifest(target))
				const deps = wanted ? declared.filter((dep) => wanted.includes(dep.name)) : declared
				if (wanted) {
					const guides = await sync.guides(deps)
					const versions = await sync.versions(deps)
					const failed = [...guides, ...versions].filter(
						(entry) => entry.freshness === 'missing' || entry.freshness === 'failed',
					).length
					const clean =
						failed === 0 &&
						guides.every((guide) => guide.freshness === 'current') &&
						versions.every((version) => version.freshness === 'current')
					report = { target, guides, versions, clean, failed }
				} else {
					report = await sync.pull(target)
				}
			} catch (error) {
				fail(describe(error))
			}
			reporter.line(syncToReview(report))
			const failing = [...report.guides, ...report.versions].filter(
				(entry) => entry.note !== undefined,
			)
			for (const entry of failing)
				reporter.line(`  ${entry.name}: ${entry.freshness} — ${entry.note}`)

			if (values.apply) {
				const spinner = createSpinner({ message: 'writing mirrors', sink })
				spinner.start()
				try {
					const written = await sync.write(report, target)
					spinner.success(`wrote ${written.length} guide${written.length === 1 ? '' : 's'}`)
				} catch (error) {
					spinner.failure(describe(error))
					process.exitCode = 1
					return
				}
			}
			reporter.line(
				`sync: ${report.guides.length + report.versions.length} entries — ${report.failed} failed`,
			)
			process.exitCode = values.strict && report.failed > 0 ? 1 : 0 // nonzero only under --strict with failures
			return
		} finally {
			sync.destroy()
		}
	} else if (command === 'audit') {
		let target: string
		try {
			target = containDestination(values.target ?? '.')
		} catch (error) {
			fail(describe(error))
		}
		let spec: Blueprint
		try {
			spec = deriveBlueprint(target)
		} catch (error) {
			fail(describe(error))
		}
		const deps: readonly Dependency[] = [...spec.dependencies, ...spec.peers, ...spec.extras]

		const groupsInput = values.groups?.split(',')
		let groups: readonly Group[] | undefined
		if (groupsInput !== undefined) {
			const unrecognized = groupsInput.filter((name) => !GROUPS.some((group) => group === name))
			if (unrecognized.length > 0) {
				fail(
					describe(
						new ScaffoldError('INVALID', `Group "${unrecognized.join('", "')}" is not recognized`, {
							groups: unrecognized,
						}),
					),
				)
			}
			groups = GROUPS.filter((group) => groupsInput.includes(group))
		}

		const compiled = blueprintToPlan(spec, groups)
		const host = values.host ?? hostRoot()
		let hydrated: { readonly plan: Plan; readonly aware: boolean }
		try {
			hydrated = hydrateBestEffort(compiled, host, values.host !== undefined)
		} catch (error) {
			fail(describe(error))
		}
		const plan = hydrated.plan
		reporter.line(`host: ${hydrated.aware ? 'content-aware' : 'presence-only'}`)
		const audit = diffPlan(
			plan,
			readTarget(
				target,
				plan.artifacts.map((artifact) => artifact.path),
			),
		)
		let drifted = !audit.clean

		let liveNote = ''
		if (values.live) {
			const sync = createSync()
			try {
				const guides = await sync.guides(deps)
				const versions = await sync.versions(deps)
				const entries = [...guides, ...versions]
				drifted ||= entries.some((entry) => entry.freshness !== 'current')
				const current = entries.filter((entry) => entry.freshness === 'current').length
				const behind = entries.filter((entry) => entry.freshness === 'behind').length
				const other = entries.filter(
					(entry) => entry.freshness !== 'current' && entry.freshness !== 'behind',
				)
				liveNote = `live: ${current} current, ${behind} behind, ${other.length} failed/missing`
				for (const entry of other) {
					if (entry.note !== undefined) {
						reporter.line(`  ${entry.name}: ${entry.freshness} — ${entry.note}`)
					}
				}
			} finally {
				sync.destroy()
			}
		}

		reporter.line(
			drifted
				? `audit: ${audit.findings.length} artifacts — ${audit.drifted} drifted, ${audit.missing} missing, ${audit.foreign} foreign`
				: `audit: ${audit.findings.length} artifacts — clean`,
		)
		if (liveNote.length > 0) reporter.line(liveNote)
		process.exitCode = drifted ? 1 : 0 // ANY drift fails — the CI gate
		return
	} else if (command === 'new') {
		if (values.target !== undefined && !values.apply) {
			process.stderr.write('note: --target is ignored on a dry run (pass --apply to write)\n')
		}

		const terminal = createTerminal()
		const name =
			argument ??
			(await terminal.input({
				message: 'Package name',
				validate: { pattern: '^[a-z][a-z0-9-]*$' },
			}))

		const picked =
			values.surfaces?.split(',') ??
			(await terminal.checkbox({ message: 'Surfaces', choices: [...SURFACES], min: 1 }))
		const unrecognized = picked.filter(
			(candidate) => !SURFACES.some((surface) => surface === candidate),
		)
		if (unrecognized.length > 0) {
			fail(`Surface "${unrecognized.join('", "')}" is not recognized`)
		}
		const surfaces = SURFACES.filter((surface) => picked.includes(surface)) // narrow to Surface[], no `as`

		// --deps resolve latest from the registry → ranges pin ^latest; their guides fetch into the plan.
		// Every token is gated against `DEPENDENCY_NAME_PATTERN` BEFORE any network
		// call — a bad token (path traversal, off-pattern name, …) is a coded
		// INVALID failure through `fail`, never reaching `sync.versions` (A3).
		const depNames = values.deps?.split(',') ?? []
		const badDep = depNames.find((depName) => !DEPENDENCY_NAME_PATTERN.test(depName))
		if (badDep !== undefined) {
			fail(
				describe(
					new ScaffoldError(
						'INVALID',
						`Dependency name "${badDep}" must match ${DEPENDENCY_NAME_PATTERN.source}`,
						{
							name: badDep,
						},
					),
				),
			)
		}
		const sync = createSync()
		let versions
		try {
			versions = await sync.versions(depNames.map((depName) => dependency(depName, '*')))
		} finally {
			sync.destroy()
		}
		const deps = versions.map((version) => dependency(version.name, `^${version.latest}`))

		const compiler = createCompiler()
		try {
			const scaffolding = compiler.compile(blueprint(name, { surfaces, dependencies: deps }))
			if (!scaffolding.plan) {
				const message = scaffolding.questions.map((question) => question.text).join('; ')
				fail(message)
			}
			reporter.section('Plan')
			reporter.line(planToReview(scaffolding.plan)) // dry-run default: show the review
			const summary = planToSummary(scaffolding.plan)
			reporter.table({
				columns: [{ label: 'Origin' }, { label: 'Count', align: 'right' }],
				rows: [
					['host', String(summary.host)],
					['template', String(summary.template)],
					['computed', String(summary.computed)],
				],
			})

			if (values.apply) {
				let destination: string
				try {
					destination = containDestination(values.target ?? `./${name}`)
				} catch (error) {
					fail(describe(error))
				}
				const spinner = createSpinner({ message: 'materializing', sink })
				spinner.start()
				const materializer = createMaterializer({ host: values.host })
				try {
					const result = materializer.materialize(scaffolding.plan, destination)
					spinner.success(`wrote ${result.written.length + result.copied.length} files`)
				} catch (error) {
					spinner.failure(describe(error))
					process.exitCode = 1
					return
				} finally {
					materializer.destroy()
				}
			} else {
				reporter.line(`dry run — pass --apply to write ./${name}`)
			}
		} finally {
			compiler.destroy()
		}
	} else if (command === 'repair') {
		let target: string
		try {
			target = containDestination(values.target ?? '.')
		} catch (error) {
			fail(describe(error))
		}
		if (values.prune && !values.apply) {
			process.stderr.write('note: --prune is ignored on a dry run (pass --apply to write)\n')
		}
		let spec: Blueprint
		try {
			spec = deriveBlueprint(target)
		} catch (error) {
			fail(describe(error))
		}

		const compiler = createCompiler()
		let compiled: Plan
		try {
			const scaffolding = compiler.compile(spec)
			if (!scaffolding.plan) {
				const message = scaffolding.questions.map((question) => question.text).join('; ')
				fail(message)
			}
			compiled = scaffolding.plan
		} finally {
			compiler.destroy()
		}

		// H2: repair is the host-restoration tool ONLY — scope to host-origin
		// artifacts before hydrate/diff/apply so a mature repo's hand-written
		// src/tests/guides/package.json is never overwritten with a stub.
		// `.github/workflows/ci.yml` STAYS in scope here (unlike `mirror`'s
		// fleet-wide exclusion) — single-target `repair --apply` is explicit
		// per-repo intent.
		const scoped: Plan = {
			...compiled,
			artifacts: compiled.artifacts.filter((artifact) => artifact.origin === 'host'),
		}

		const host = values.host ?? hostRoot()
		let plan: Plan
		try {
			plan = hydrateBestEffort(scoped, host, values.host !== undefined).plan
		} catch (error) {
			fail(describe(error))
		}

		let audit: Audit
		try {
			audit = diffPlan(
				plan,
				readTarget(
					target,
					plan.artifacts.map((artifact) => artifact.path),
				),
			)
		} catch (error) {
			fail(describe(error))
		}
		reporter.section('Audit')
		reporter.line(auditToReview(audit))

		if (!values.apply) {
			reporter.line(
				audit.clean
					? 'repair: clean'
					: `repair: ${audit.drifted} drifted, ${audit.missing} missing, ${audit.foreign} foreign — pass --apply to write`,
			)
			process.exitCode = audit.clean ? 0 : 1
			return
		}

		const spinner = createSpinner({ message: 'repairing', sink })
		spinner.start()
		const materializer = createMaterializer({ host: values.host })
		try {
			const result = materializer.repair(plan, audit, target)
			const removed = values.prune ? materializer.prune(target).removed : []
			spinner.success(
				`wrote ${result.written.length}, copied ${result.copied.length}, skipped ${result.skipped.length}, removed ${removed.length}`,
			)
		} catch (error) {
			spinner.failure(describe(error))
			process.exitCode = 1
			return
		} finally {
			materializer.destroy()
		}
		process.exitCode = 0
		return
	} else if (command === 'mirror') {
		let root: string
		try {
			root = containDestination(values.root?.[0] ?? '.')
		} catch (error) {
			if (isScaffoldError(error)) {
				fail(
					describe(
						new ScaffoldError(
							error.code,
							`${error.message} — mirror writes into the repos beneath --root, so run scaffold FROM your workspace folder instead of pointing --root outside it.`,
							error.context,
						),
					),
				)
			}
			fail(describe(error))
		}
		const packages = discoverPackages(root)
		if (packages.length === 0) {
			fail(
				`no @orkestrel packages under "${root}" — mirror scans the immediate children of the current directory; stand in the folder that contains your checkouts (cd ..), or use 'repair' to true up just this repo.`,
			)
		}
		if (values.prune && !values.apply) {
			process.stderr.write('note: --prune is ignored on a dry run (pass --apply to write)\n')
		}

		const host = values.host ?? hostRoot()
		const materializer = values.apply ? createMaterializer({ host: values.host }) : undefined
		let drifted = 0
		let failed = 0
		let ciExcluded = false

		try {
			for (const directory of packages) {
				const name = basename(directory)
				try {
					const spec = deriveBlueprint(directory)
					const compiler = createCompiler()
					let scoped: Plan
					try {
						const scaffolding = compiler.compile(spec)
						if (!scaffolding.plan) {
							const message = scaffolding.questions.map((question) => question.text).join('; ')
							throw new ScaffoldError('INVALID', message)
						}
						// Fleet apply must never clobber a repo's intentionally
						// divergent CI (e.g. ollama, sea) — `.github/workflows/ci.yml`
						// is scoped out of `mirror`; single-target `repair` keeps full scope.
						scoped = {
							...scaffolding.plan,
							artifacts: scaffolding.plan.artifacts.filter(
								(artifact) =>
									artifact.origin === 'host' && artifact.path !== '.github/workflows/ci.yml',
							),
						}
						if (
							!ciExcluded &&
							scaffolding.plan.artifacts.some(
								(artifact) => artifact.path === '.github/workflows/ci.yml',
							)
						) {
							reporter.line('ci.yml: repo-flavored, skipped (use repair --apply per repo)')
							ciExcluded = true
						}
					} finally {
						compiler.destroy()
					}

					const plan = hydrateBestEffort(scoped, host, values.host !== undefined).plan
					const paths = plan.artifacts.map((artifact) => artifact.path)
					let audit = diffPlan(plan, readTarget(directory, paths))

					if (audit.clean) {
						reporter.line(`${name}: clean`)
						continue
					}

					if (materializer) {
						materializer.repair(plan, audit, directory)
						if (values.prune) materializer.prune(directory)
						audit = diffPlan(plan, readTarget(directory, paths))
					}

					if (!audit.clean) drifted += 1
					reporter.line(
						materializer
							? `${name}: repaired (${audit.drifted + audit.missing + audit.foreign} remaining)`
							: `${name}: drifted ${audit.drifted}, missing ${audit.missing}, foreign ${audit.foreign}`,
					)
				} catch (error) {
					failed += 1
					reporter.line(`${name}: ${describe(error)}`)
				}
			}
		} finally {
			materializer?.destroy()
		}

		reporter.line(`total: ${drifted} drifted, ${failed} failed`)
		process.exitCode = drifted > 0 || failed > 0 ? 1 : 0
		return
	} else if (command === 'catalog') {
		// `scaffold catalog` — regenerate the fleet package catalog embedded in
		// <target>/.claude/agents/orkestrel.md between its marker comments. The
		// npm REGISTRY is the authoritative package list by default (network);
		// `--offline` sources `--root`(s) only, unauthenticated in both modes —
		// every fleet repo is public. `--root` is a READ-ONLY source
		// (unrestricted, like `--host`); only the write destination `--target`
		// is confined to the cwd.
		let catalogTarget: string
		try {
			catalogTarget = containDestination(values.target ?? '.')
		} catch (error) {
			fail(describe(error))
		}

		const explicitRoots = values.root
		let entries: readonly CatalogEntry[]
		let published = 0
		let localOnly = 0
		const notes = new Map<string, string>()

		if (values.offline) {
			const roots = explicitRoots ?? [process.cwd()]
			try {
				entries = catalogPackages(roots)
			} catch (error) {
				if (isScaffoldError(error)) {
					fail(describe(error))
				} else {
					fail(
						describe(
							new ScaffoldError('TARGET', `Failed to read fleet root(s): ${roots.join(', ')}`, {
								roots,
								error,
							}),
						),
					)
				}
			}
		} else {
			const sync = createSync({
				on: {
					package: (name, note) => {
						if (note !== '') notes.set(name, note)
					},
				},
			})
			let registryEntries: readonly CatalogEntry[]
			try {
				registryEntries = await sync.catalog()
			} catch (error) {
				if (isScaffoldError(error)) {
					fail(describe(error))
				} else {
					fail(
						describe(new ScaffoldError('FETCH', 'Failed to fetch the package catalog', { error })),
					)
				}
			} finally {
				sync.destroy()
			}
			published = registryEntries.length

			let localEntries: readonly CatalogEntry[] = []
			if (explicitRoots !== undefined) {
				try {
					localEntries = catalogPackages(explicitRoots)
				} catch (error) {
					if (isScaffoldError(error)) {
						fail(describe(error))
					} else {
						fail(
							describe(
								new ScaffoldError(
									'TARGET',
									`Failed to read fleet root(s): ${explicitRoots.join(', ')}`,
									{ roots: explicitRoots, error },
								),
							),
						)
					}
				}
			}

			const merged = new Map<string, CatalogEntry>()
			for (const entry of registryEntries) merged.set(entry.name, entry)
			for (const local of localEntries) {
				const existing = merged.get(local.name)
				if (existing === undefined) {
					merged.set(local.name, local)
					localOnly += 1
				} else if (local.description.length > 0) {
					merged.set(local.name, { ...existing, description: local.description })
				}
			}
			entries = [...merged.values()].sort((a, b) =>
				a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
			)
		}

		const block = catalogToBlock(entries)
		const agentPath = join(catalogTarget, '.claude', 'agents', 'orkestrel.md')
		let current: string
		try {
			current = readFileSync(agentPath, 'utf8')
		} catch (error) {
			fail(
				describe(
					new ScaffoldError('TARGET', `Failed to read ${agentPath}`, { path: agentPath, error }),
				),
			)
		}

		const startMarker = '<!-- catalog:start -->'
		const endMarker = '<!-- catalog:end -->'
		const startIndex = current.indexOf(startMarker)
		const endIndex = current.indexOf(endMarker)
		if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
			fail(
				describe(
					new ScaffoldError(
						'TARGET',
						`Markers "${startMarker}" / "${endMarker}" not found in ${agentPath}`,
						{ path: agentPath },
					),
				),
			)
		}

		const before = current.slice(0, startIndex + startMarker.length)
		const after = current.slice(endIndex)
		const updated = `${before}\n\n${block}\n${after}`

		const oldBlock = current.slice(startIndex + startMarker.length, endIndex)
		const oldRows = (oldBlock.match(/^\|\s*@orkestrel\//gm) ?? []).length

		if (values.offline) {
			const missingDescription = entries
				.filter((entry) => entry.description.length === 0)
				.map((entry) => entry.name)
			reporter.line(`${entries.length} package${entries.length === 1 ? '' : 's'}`)
			if (missingDescription.length > 0) {
				reporter.line(
					`${missingDescription.length} without guide description: ${missingDescription.join(', ')}`,
				)
			}
		} else {
			reporter.line(
				`catalog: ${published} published package${published === 1 ? '' : 's'}, ${localOnly} local-only`,
			)
			for (const [name, note] of notes) reporter.line(`  ${name}: ${note}`)
		}
		if (entries.length < oldRows) {
			reporter.line(`warning: catalog shrinks from ${oldRows} to ${entries.length} rows`)
		}

		if (updated === current) {
			reporter.line('catalog: clean')
			process.exitCode = 0 // clean — already in sync
			return
		}

		if (!values.apply) {
			reporter.line('catalog: drifted — pass --apply to write')
			process.exitCode = 1 // dry-run: drift found, report only
			return
		}

		writeFileSync(agentPath, updated, 'utf8')
		reporter.status('success', `wrote ${agentPath}`)
		process.exitCode = 0
		return
	} else {
		process.stderr.write(`unrecognized command "${command}"\n\n${USAGE}`)
		process.exitCode = 1
		return
	}
}

trustSystemCertificates()

try {
	await main()
} catch (error) {
	if (error instanceof CliExit) {
		process.exitCode = error.code
	} else {
		reporter.status('error', describe(error))
		process.exitCode = 1
	}
}
