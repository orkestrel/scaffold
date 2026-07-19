// The `#!/usr/bin/env node` shebang is re-emitted by the build's `output.banner`, not source.
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
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
    Fleet-wide host-origin audit/repair across every @orkestrel package under
    root; excludes .github/workflows/ci.yml (repo-flavored — use repair --apply).
    e.g. scaffold mirror --root .. --apply

  catalog [--root <dir> ...] [--target <repo>] [--apply]
    Regenerate the fleet package catalog table embedded in
    <target>/.claude/agents/orkestrel.md between its <!-- catalog:start -->
    / <!-- catalog:end --> markers, sourced from every --root's discovered
    packages (repeatable; default: cwd) and each package's own guide's first
    blockquote. Dry-run reports drift (nonzero on any); --apply writes.
    e.g. scaffold catalog --root .. --apply

Flags: --help prints this text; a repeated flag keeps its LAST occurrence.

Windows/PowerShell: invoke as \`node ./dist/bin/scaffold.js …\` from a checkout,
or \`npx scaffold …\` once installed — PowerShell mangles npm's \`--\` passthrough,
so avoid \`npm run scaffold -- …\` there.
`

const sink = createServerSink()
const reporter = createReporter({ sink, width: sink.columns })

/** Print a one-line coded error (never a stack) and exit nonzero. */
function fail(message: string): never {
	reporter.status('error', message)
	process.exit(1)
}

/** Render a caught error as a clean one-line message — a `ScaffoldError`'s code, or a bare message otherwise. */
function describe(error: unknown): string {
	if (isScaffoldError(error)) return `[${error.code}] ${error.message}`
	return error instanceof Error ? error.message : 'unknown error'
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

let parsed: ReturnType<typeof parseArguments>
try {
	parsed = parseArguments()
} catch (error) {
	process.stderr.write(
		`${error instanceof Error ? error.message : 'invalid arguments'}\n\n${USAGE}`,
	)
	process.exit(1)
}

const { values, positionals } = parsed

if (values.help) {
	process.stdout.write(USAGE)
	process.exit(0)
}

const [command, argument] = positionals

if (command === undefined) {
	process.stderr.write(USAGE)
	process.exit(1)
} else if (command === 'sync') {
	const target = values.target ?? '.'
	const sync = createSync({ strict: values.strict })
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
		sync.destroy()
		fail(describe(error))
	}
	reporter.line(syncToReview(report))

	if (values.apply) {
		const spinner = createSpinner({ message: 'writing mirrors', sink })
		spinner.start()
		try {
			const written = await sync.write(report, target)
			spinner.success(`wrote ${written.length} guide${written.length === 1 ? '' : 's'}`)
		} catch (error) {
			spinner.failure(describe(error))
			sync.destroy()
			process.exit(1)
		}
	}
	sync.destroy()
	process.exit(values.strict && report.failed > 0 ? 1 : 0) // nonzero only under --strict with failures
} else if (command === 'audit') {
	const target = values.target ?? '.'
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
	let drifted = !diffPlan(
		plan,
		readTarget(
			target,
			plan.artifacts.map((artifact) => artifact.path),
		),
	).clean

	if (values.live) {
		const sync = createSync()
		try {
			const guides = await sync.guides(deps)
			const versions = await sync.versions(deps)
			drifted ||= [...guides, ...versions].some((entry) => entry.freshness !== 'current')
		} finally {
			sync.destroy()
		}
	}
	process.exit(drifted ? 1 : 0) // ANY drift fails — the CI gate
} else if (command === 'new') {
	if (values.target !== undefined && !values.apply) {
		process.stderr.write('note: --target is ignored on a dry run (pass --apply to write)\n')
	}

	const terminal = createTerminal()
	const name =
		argument ??
		(await terminal.input({ message: 'Package name', validate: { pattern: '^[a-z][a-z0-9-]*$' } }))

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
	const versions = await sync.versions(depNames.map((depName) => dependency(depName, '*')))
	sync.destroy()
	const deps = versions.map((version) => dependency(version.name, `^${version.latest}`))

	const compiler = createCompiler()
	const scaffolding = compiler.compile(blueprint(name, { surfaces, dependencies: deps }))
	if (!scaffolding.plan) {
		const message = scaffolding.questions.map((question) => question.text).join('; ')
		compiler.destroy()
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
		const spinner = createSpinner({ message: 'materializing', sink })
		spinner.start()
		const materializer = createMaterializer({ host: values.host })
		try {
			const result = materializer.materialize(scaffolding.plan, values.target ?? `./${name}`)
			spinner.success(`wrote ${result.written.length + result.copied.length} files`)
		} catch (error) {
			spinner.failure(describe(error))
			materializer.destroy()
			compiler.destroy()
			process.exit(1)
		}
		materializer.destroy()
	}
	compiler.destroy()
} else if (command === 'repair') {
	const target = values.target ?? '.'
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
	const scaffolding = compiler.compile(spec)
	if (!scaffolding.plan) {
		const message = scaffolding.questions.map((question) => question.text).join('; ')
		compiler.destroy()
		fail(message)
	}
	const compiled = scaffolding.plan
	compiler.destroy()

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
		process.exit(audit.clean ? 0 : 1)
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
		materializer.destroy()
		process.exit(1)
	}
	materializer.destroy()
	process.exit(0)
} else if (command === 'mirror') {
	const root = values.root?.[0] ?? '.'
	const packages = discoverPackages(root)
	if (packages.length === 0) {
		fail(`No @orkestrel packages found under "${root}"`)
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
				const scaffolding = compiler.compile(spec)
				if (!scaffolding.plan) {
					const message = scaffolding.questions.map((question) => question.text).join('; ')
					compiler.destroy()
					throw new ScaffoldError('INVALID', message)
				}
				// Fleet apply must never clobber a repo's intentionally
				// divergent CI (e.g. ollama, sea) — `.github/workflows/ci.yml`
				// is scoped out of `mirror`; single-target `repair` keeps full scope.
				const scoped: Plan = {
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
				compiler.destroy()

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
	process.exit(drifted > 0 || failed > 0 ? 1 : 0)
} else if (command === 'catalog') {
	// `scaffold catalog` — regenerate the fleet package catalog embedded in
	// <target>/.claude/agents/orkestrel.md between its marker comments.
	const roots = values.root ?? [process.cwd()]
	const catalogTarget = values.target ?? '.'

	let entries: readonly CatalogEntry[]
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

	const missingDescription = entries
		.filter((entry) => entry.description.length === 0)
		.map((entry) => entry.name)
	reporter.line(`${entries.length} package${entries.length === 1 ? '' : 's'}`)
	if (missingDescription.length > 0) {
		reporter.line(
			`${missingDescription.length} without guide description: ${missingDescription.join(', ')}`,
		)
	}

	if (updated === current) process.exit(0) // clean — already in sync

	if (!values.apply) process.exit(1) // dry-run: drift found, report only

	writeFileSync(agentPath, updated, 'utf8')
	reporter.status('success', `wrote ${agentPath}`)
	process.exit(0)
} else {
	process.stderr.write(`unrecognized command "${command}"\n\n${USAGE}`)
	process.exit(1)
}
