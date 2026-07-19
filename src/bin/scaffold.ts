import { parseArgs } from 'node:util'
import { blueprint, createCompiler, planToReview, planToSummary, SURFACES } from '@src/core'
import { createMaterializer } from '@src/server'
import { createReporter, createSpinner } from '@orkestrel/console'
import { createServerSink } from '@orkestrel/console/server'
import { createTerminal } from '@orkestrel/terminal/server'

const { values, positionals } = parseArgs({
	allowPositionals: true,
	options: {
		surfaces: { type: 'string' },
		target: { type: 'string' },
		apply: { type: 'boolean', default: false },
	},
})

const sink = createServerSink()
const reporter = createReporter({ sink, width: sink.columns })

// Interactive when an argument is absent (a real TTY); a piped run uses the flags verbatim.
const terminal = createTerminal()
const name =
	positionals[0] ??
	(await terminal.input({ message: 'Package name', validate: { pattern: '^[a-z][a-z0-9-]*$' } }))
const picked =
	values.surfaces?.split(',') ??
	(await terminal.checkbox({ message: 'Surfaces', choices: [...SURFACES], min: 1 }))
const surfaces = SURFACES.filter((surface) => picked.includes(surface)) // narrow to Surface[], no `as`

const compiler = createCompiler()
const scaffolding = compiler.compile(blueprint(name, { surfaces }))

if (!scaffolding.plan) {
	reporter.status('error', scaffolding.questions.map((question) => question.text).join('; '))
	compiler.destroy()
	process.exit(1)
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
	const result = materializer.materialize(scaffolding.plan, values.target ?? `./${name}`)
	materializer.destroy()
	spinner.success(`wrote ${result.written.length + result.copied.length} files`)
}
compiler.destroy()
