// Restructures the guide's Surface and Methods tables: renames every compared column
// header to `Summary`, gives each shape-carrying table its `Shape` and `Summary`
// columns, and rewrites every `Shape` cell into the fleet's one idiom.
import { readFileSync, writeFileSync } from 'node:fs'

const PATH = 'guides/workflow.md'

const SHAPES = new Map(
	Object.entries({
		TaskDefinition: '{ id, name, description?, behavior?, retries?, timeout? }',
		PhaseDefinition: '{ id, name, description?, tasks, concurrency?, bail? }',
		WorkflowDefinition: '{ id, name, description?, phases, bail? }',
		WorkflowContext: '{ id, name, description? }',
		PhaseContext: '{ id, name, description?, workflow }',
		TaskContext: '{ id, name, description?, phase }',
		WorkflowInput: 'Partial<WorkflowContext>',
		PhaseInput: 'Partial<PhaseContext>',
		TaskInput: '{ id?, name?, description?, phase?, metadata? }',
		TaskProgress: '{ progress, total?, message? }',
		TaskClaim: '{ id, name, started }',
		TaskOperation: '{ id, name, started }',
		TaskConstraint: '{ id, name, started }',
		TaskActivityInput: '{ note?, progress?, operations?, constraints? }',
		TaskActivity: '{ note?, progress?, operations, constraints, updated }',
		TaskUpdate: '{ name?, description? }',
		PhaseUpdate: '{ name?, description?, concurrency?, bail? }',
		WorkflowErrorCode: "'TRANSITION' \\| 'RESTORE' \\| 'MUTATION' \\| 'SCHEDULE' \\| 'INVARIANT'",
		LifecycleStatus:
			"'pending' \\| 'running' \\| 'completed' \\| 'failed' \\| 'skipped' \\| 'stopped'",
		PhaseDerivation: '{ status, bail }',
		TaskFailureOrigin: "'handler' \\| 'timeout' \\| 'recovery'",
		TaskFailure: '{ origin, message }',
		TaskResult: '{ task, phase, workflow, status, result?, timestamp }',
		TaskSnapshot:
			'{ id, name, description?, status, result?, metadata, attempts, behavior?, retries?, timeout?, activity? }',
		PhaseSnapshot: '{ id, name, description?, status, override?, bail, concurrency?, tasks }',
		WorkflowSnapshot:
			'{ id, name, description?, status, override?, bail, phases, created, updated }',
		WorkflowStoreInterface: '{} plus get, set, delete',
		WorkflowSnapshotRow: '{ id, snapshot }',
		WorkflowEventMap:
			'{ start, complete, fail, pause, resume, skip, stop, add, remove, move, update }',
		PhaseEventMap:
			'{ start, complete, fail, pause, resume, skip, stop, add, remove, move, update }',
		TaskEventMap: '{ start, complete, fail, pause, resume, skip, stop, report, pulse, silence }',
		TaskOptions: '{ on?, error?, metadata?, silence? }',
		PhaseOptions: '{ on?, error?, tasks? }',
		WorkflowOptions: '{ on?, bail?, error?, phases?, functions?, silence? }',
		WorkflowInterface:
			'{ emitter, id, name, description, context, bail, status, phases, paused, destroyed, signal } plus phase, results, skip, stop, complete, pause, resume, destroy, wait, add, remove, move, update, snapshot',
		PhaseInterface:
			'{ emitter, id, name, description, context, workflow, status, bail, concurrency, paused, tasks } plus task, results, skip, stop, pause, resume, wait, add, remove, move, update, patch, snapshot',
		TaskInterface:
			'{ emitter, id, name, description, context, phase, workflow, status, attempts, result, behavior, handler, retries, timeout, activity, silence, silent, paused, signal } plus start, complete, fail, skip, stop, report, pulse, pause, resume, wait, patch, snapshot',
		TaskManagerInterface: '{ count } plus append, add, remove, move, update, task, tasks',
		PhaseManagerInterface: '{ count } plus append, add, remove, move, update, phase, phases',
		CollectionEntry: '{ id, status } plus patch',
		CollectionInterface: '{ count } plus append, add, remove, move, update, entry, entries',
		WorkflowFunction: '(controller: TaskControllerInterface) => Promise<JSONValue> \\| JSONValue',
		WorkflowRegistry: 'Readonly<Record<string, WorkflowFunction>>',
		TaskControllerInterface:
			'{ signal, aborted, input, task, attempt, paused } plus report, pulse, wait, results',
		AttemptOutcome:
			'readonly [settled: true, value: JSONValue] \\| readonly [settled: false, value: undefined, genuine?: boolean]',
		RunHolderInterface: '{ runner } plus hold',
		WorkflowResult: '{ workflow, status, results, durable?, fault? }',
		WorkflowCheckpoint: "'initial' \\| 'attempt' \\| 'settlement' \\| 'final'",
		WorkflowFault: '{ checkpoint, message, task?, attempt? }',
		WorkflowPersistenceInterface: '{ fault } plus checkpoint, finalize, detach',
		WorkflowRunOptions: 'WorkflowOptions & { signal?, timeout?, budget?, store? }',
		WorkflowRunnerOptions: '{ scheduler? }',
		WorkflowRunnerInterface: '{} plus execute',
		WorkflowManagerOptions: '{ store?, functions? }',
		WorkflowManagerInterface: '{ count } plus workflow, workflows, add, open, save, remove, clear',
		SchedulerPriority: "'user' \\| 'normal' \\| 'background'",
		SchedulerOptions: '{ priority?, signal? }',
		SchedulerInterface: '{} plus yield, delay',
		ControllerInterface: '{ id, input, signal, aborted } plus wait, spawn, abort',
		RunnerHandler:
			'(controller: ControllerInterface<TInput, TResult>) => Promise<TResult> \\| TResult',
		RunnerOptions: '{ on?, error?, handler, concurrency?, retries?, timeout?, entries? }',
		RunnerEntryOptions: '{ retries?, timeout? }',
		RunnerInterface:
			'{ emitter, active, stopped, paused } plus execute, spawn, abort, pause, resume, stop, destroy',
		RunnerEventMap: '{ start, unit, spawn, settle, fail, finish, abort }',
		RunnerUnit: '{ id, input }',
		IdleInterface: '{ request, cancel }',
		DEFAULT_BAIL: 'false',
		LIFECYCLE_STATUSES: 'readonly LifecycleStatus[]',
		TERMINAL_STATUSES: 'readonly LifecycleStatus[]',
		TASK_TRANSITIONS: 'Readonly<Record<LifecycleStatus, readonly LifecycleStatus[]>>',
		DEFAULT_PHASE_CONCURRENCY: '1024',
		MAX_TIMER_MS: '2_147_483_647',
		PERSISTED_NODE_EVENTS: 'ReadonlyArray<keyof WorkflowEventMap & keyof PhaseEventMap>',
		PERSISTED_TASK_EVENTS: 'ReadonlyArray<keyof TaskEventMap>',
		POST_TASK_PRIORITY: 'Readonly<Record<SchedulerPriority, string>>',
	}),
)

/** Splits one table row into its cells, keeping an escaped pipe inside a cell. */
function splitRow(line) {
	return line
		.replace(/^\|\s?/, '')
		.replace(/\s?\|$/, '')
		.split(/(?<!\\)\|/)
		.map((cell) => cell.trim())
}

/** Renders cells back as one table row. */
function joinRow(cells) {
	return `| ${cells.join(' | ')} |`
}

/** Renders the alignment row for a table of the given width. */
function joinRule(width) {
	return `| ${Array.from({ length: width }, () => '---').join(' | ')} |`
}

/** Reads the declared name out of a row's first cell. */
function readName(cell) {
	const match = /^`([^`]+)`/.exec(cell)
	return match === null ? undefined : match[1]
}

const lines = readFileSync(PATH, 'utf8').split('\n')
const out = []
const report = []
for (let at = 0; at < lines.length; at += 1) {
	const line = lines[at]
	const rule = lines[at + 1] ?? ''
	if (!line.startsWith('| ') || !rule.startsWith('| --')) {
		out.push(line)
		continue
	}
	const header = splitRow(line)
	if (!['API', 'Type', 'Class', 'Constant', 'Method'].includes(header[0])) {
		out.push(line)
		continue
	}
	let end = at + 2
	while (end < lines.length && lines[end].startsWith('| ')) end += 1
	const rows = lines.slice(at + 2, end).map(splitRow)
	const names = rows.map((row) => readName(row[0]))
	const shaped = names.every((name) => name !== undefined && SHAPES.has(name))
	const columns = header.map((cell) =>
		cell === 'Behavior' || cell === 'Role' ? 'Summary' : cell,
	)
	let next = rows
	if (shaped && columns.includes('Shape')) {
		// A shape table already carries the column: rewrite each literal, and give the
		// clause after it a `Summary` cell of its own.
		const shapeAt = columns.indexOf('Shape')
		if (!columns.includes('Summary')) columns.push('Summary')
		next = rows.map((row, index) => {
			const cells = [...row]
			const carried = cells[shapeAt] ?? ''
			cells[shapeAt] = `\`${SHAPES.get(names[index])}\``
			cells[columns.indexOf('Summary')] = carried
			return cells
		})
	} else if (shaped && (header[0] === 'Constant' || names.every((name) => /^[A-Z_]+$/.test(name)))) {
		// A constants table takes the declared type in `Shape`, keeping its old cell as
		// the placeholder the seed writes over.
		const summaryAt = columns.indexOf('Summary')
		columns.splice(summaryAt, 0, 'Shape')
		next = rows.map((row, index) => {
			const cells = [...row]
			cells.splice(summaryAt, 0, `\`${SHAPES.get(names[index])}\``)
			return cells
		})
	}
	report.push(`${at + 1}: ${header.join(' | ')} -> ${columns.join(' | ')}`)
	out.push(joinRow(columns))
	out.push(joinRule(columns.length))
	for (const row of next) out.push(joinRow(row))
	at = end - 1
}
writeFileSync(PATH, out.join('\n'))
process.stdout.write(`${report.join('\n')}\n`)
