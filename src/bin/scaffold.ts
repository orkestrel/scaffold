// The `#!/usr/bin/env node` shebang is re-emitted by the build's `output.banner`, not source.
import { parseArgs } from 'node:util'
import type { Dependency, SyncReport } from '@src/core'
import {
	blueprint,
	blueprintToPlan,
	createCompiler,
	dependency,
	DEPENDENCY_NAME_PATTERN,
	diffPlan,
	isScaffoldError,
	manifestToDependencies,
	planToReview,
	planToSummary,
	ScaffoldError,
	SURFACES,
	syncToReview,
} from '@src/core'
import { createMaterializer, createSync, readManifest, readTarget } from '@src/server'
import { createReporter, createSpinner } from '@orkestrel/console'
import { createServerSink } from '@orkestrel/console/server'
import { createTerminal } from '@orkestrel/terminal/server'

const USAGE = `Usage: scaffold <new|sync|audit> [options]

  new <name> [--surfaces a,b] [--deps x,y] [--apply] [--target <path>]
    Create a package. Prompts interactively for a missing name or surfaces on a TTY.

  sync [--target .] [--deps x,y] [--apply] [--strict]
    Refresh vendored dependency mirrors and report range drift.

  audit [--target .] [--live]
    Structural conformance check; --live adds guide/version freshness.

Flags: --help prints this text; a repeated flag keeps its LAST occurrence.
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
	return parseArgs({
		allowPositionals: true,
		options: {
			surfaces: { type: 'string' },
			deps: { type: 'string' },
			target: { type: 'string' },
			apply: { type: 'boolean', default: false },
			strict: { type: 'boolean', default: false },
			live: { type: 'boolean', default: false },
			help: { type: 'boolean', default: false },
		},
	})
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
	let deps: readonly Dependency[]
	try {
		deps = manifestToDependencies(readManifest(target))
	} catch (error) {
		fail(describe(error))
	}
	const plan = blueprintToPlan(
		/* the blueprint reconstructed for this repo */ blueprint(argument ?? 'pkg'),
	)
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
		const materializer = createMaterializer()
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
} else {
	process.stderr.write(`unrecognized command "${command}"\n\n${USAGE}`)
	process.exit(1)
}
