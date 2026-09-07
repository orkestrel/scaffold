// Rewrites the description paragraph of each type whose guide cell carried a fact the
// block lacked, and lowers every all-caps emphasis those paragraphs shouted.
import { readFileSync, writeFileSync } from 'node:fs'

const PATH = 'src/core/types.ts'
const EDITS = [
	[
		' * Represents the serializable definition of one task — its identity plus an optional reference to\n * the behavior it runs.',
		' * Represents the serializable definition of one task — its identity, an optional reference to\n * the behavior it runs, and its optional per-task `retries` and `timeout` overrides.',
	],
	[
		' * Represents the serializable definition of one phase — its identity, its ordered tasks, and\n * an optional resource throttle.',
		' * Represents the serializable definition of one phase — its identity, its ordered tasks, an\n * optional resource throttle, and an optional `bail` override of the workflow policy.',
	],
	[
		' * Represents the minimal data to create a task context — a partial {@link TaskContext} plus\n * any creation-only fields.',
		' * Represents the minimal data to create a task context — a partial {@link TaskContext} plus\n * the open `metadata` bag the task stores and snapshots without interpreting it.',
	],
	[
		' * Represents one identified thing a running task claims active, with the moment the claim began.',
		' * Represents one identified thing a running task claims active, with the moment the claim\n * began — the shape {@link TaskOperation} and {@link TaskConstraint} share.',
	],
	[
		" * Represents one complete replacement of a running task's observable activity.",
		" * Represents one complete replacement of a running task's observable activity, an omitted\n * collection meaning an empty one.",
	],
	[
		' * {@link LifecycleStatus} paired with the EFFECTIVE `bail` policy it ran under\n * (`phase.bail ?? workflow.bail`).',
		' * {@link LifecycleStatus} paired with the effective `bail` policy it ran under\n * (`phase.bail ?? workflow.bail`) — the input shape {@link deriveWorkflowStatus} reduces.',
	],
	[
		" * Represents a JSON-serializable snapshot of one phase's state — its identity, status, its forced\n * override (if any), and its nested task snapshots.",
		" * Represents a JSON-serializable snapshot of one phase's state — its identity, status, the\n * forced override a whole-phase `skip` or `stop` left, the effective `bail` and `concurrency`\n * it ran under, and its nested task snapshots.",
	],
	[
		' * persists — a workflow `id` plus its {@link WorkflowSnapshot} held as ONE OPAQUE JSON column.',
		' * persists — a workflow `id` plus its {@link WorkflowSnapshot} held as one opaque JSON column,\n * read back as `unknown` and narrowed on `get`.',
	],
	[
		' * observable phase whose {@link LifecycleStatus} is DERIVED from its tasks\n * (never set directly) and recomputed reactively as a task transitions (the cascade).',
		' * observable phase whose {@link LifecycleStatus} is derived from its tasks\n * (never set directly) and recomputed reactively as a task transitions (the cascade).',
	],
	[
		' * observable root whose {@link LifecycleStatus} is DERIVED from its phases\n * under the `bail` policy and recomputed reactively as the cascade propagates up.',
		' * observable root whose {@link LifecycleStatus} is derived from its phases\n * under the `bail` policy and recomputed reactively as the cascade propagates up.',
	],
	[
		' * {@link TaskDefinition} runs, resolved BY NAME through the {@link WorkflowRegistry}\n * registry — a function type the framework invokes.',
		' * {@link TaskDefinition} runs, resolved by name through the {@link WorkflowRegistry}\n * registry — a function type the framework invokes.',
	],
	[
		" * cancellation, its input, its lineage, and read-UP access to the result tree.",
		" * cancellation, its input, its lineage, and read access up the tree to the results already\n * settled.",
	],
	[
		' * Represents the structured outcome of a {@link WorkflowRunnerInterface.execute} run — the settled\n * live workflow, its final status, and the flattened result tree.',
		' * Represents the structured outcome of a {@link WorkflowRunnerInterface.execute} run — the settled\n * live workflow, its final status, the flattened result tree, and the persistence outcome a\n * supplied store produced.',
	],
	[
		" * CONSTRUCTION options ({@link WorkflowOptions}) PLUS the per-run RUN CONTROLS: the bounds\n * (an external abort, a deadline, and a cost ceiling), each folded into every task's\n * cancellation, and the optional durable `store`.",
		" * construction options ({@link WorkflowOptions}) beside the per-run controls: the bounds\n * (an external abort, a deadline, and a cost ceiling), each folded into every task's\n * cancellation, and the optional durable `store`.",
	],
	[
		' * Declares a thin orchestrator that EXECUTES a live {@link WorkflowInterface} tree by composing the\n * shipped substrate — phases sequential, tasks concurrent, each task dispatched through its\n * OWN resolved handler under the `bail` policy.',
		' * Declares a thin orchestrator that executes a live {@link WorkflowInterface} tree by composing the\n * shipped substrate — phases sequential, tasks concurrent, each task dispatched through its\n * own resolved handler under the `bail` policy.',
	],
	[
		' * order — the additive manager tier mirroring `ConversationManagerInterface` /\n * `WorkspaceManagerInterface` from the `@orkestrel/agent` line, adapted for the workflow\n * domain: `add` mints from a {@link WorkflowDefinition} (not an empty `Input`, because a\n * workflow only exists relative to a definition), and the optional `store` seam\'s `open`\n * threads the manager\'s {@link WorkflowRegistry} registry so a HYDRATED workflow is\n * immediately RUNNABLE, not merely a restored state mirror. NO `active` / `switch` pointer\n * — the workflow domain has no consumer that renders "the current workflow" the\n * way an agent context renders the active conversation/workspace.',
		' * order — the additive manager tier mirroring `ConversationManagerInterface` /\n * `WorkspaceManagerInterface` from the `@orkestrel/agent` line, adapted for the workflow\n * domain: `add` mints from a {@link WorkflowDefinition}, and the optional `store` seam\'s\n * `open` threads the manager\'s {@link WorkflowRegistry} registry, so a hydrated workflow is\n * immediately runnable rather than a restored state mirror.',
	],
	[
		' * - **Event-free.** A purely registry store — no `Emitter`, no events (each\n *   {@link WorkflowInterface} owns its own {@link WorkflowEventMap} emitter).',
		' * - **Event-free.** A purely registry store — no `Emitter`, no events (each\n *   {@link WorkflowInterface} owns its own {@link WorkflowEventMap} emitter).\n * - **No pointer.** There is no `active` / `switch` pointer: no consumer of this domain renders\n *   "the current workflow" the way an agent context renders the active conversation or\n *   workspace. `add` mints from a {@link WorkflowDefinition} rather than from an empty `Input`,\n *   because a workflow exists only relative to a definition.',
	],
	[
		' * Declares a cooperative host-yield primitive: a loop decides WHAT to do; the scheduler\n * decides WHEN the host regains control. Abort-aware — a pending yield/delay\n * rejects with the signal\'s reason when aborted.',
		' * Declares a cooperative host-yield primitive: a loop decides what to do; the scheduler\n * decides when the host regains control. It is abort-aware — a pending yield or delay\n * rejects with the signal\'s reason when aborted.',
	],
	[
		' * lifecycle a fire-and-forget observer (logging, metrics, tracing) subscribes to,\n * ALONGSIDE the eventual `execute` result.',
		' * lifecycle a fire-and-forget observer (logging, metrics, tracing) subscribes to, beside\n * the eventual `execute` result.',
	],
	[
		" * Declares the per-entry reliability OVERRIDES for one unit — its extra attempts on failure and its\n * per-attempt deadline, resolved from the unit's input through {@link RunnerOptions.entries}.",
		" * Declares the per-entry reliability overrides for one unit — its extra attempts on failure and its\n * per-attempt deadline, resolved from the unit's input through {@link RunnerOptions.entries}.",
	],
	[
		' * Declares the options for `createRunner`.',
		' * Declares the options for `createRunner` — the `handler` every unit runs, the queue bounds\n * `concurrency`, `retries`, and `timeout`, the per-entry `entries` resolver, and the emitter\n * `on` hooks and `error` handler.',
	],
]

const text = readFileSync(PATH, 'utf8')
let next = text
for (const [before, after] of EDITS) {
	const hits = next.split(before).length - 1
	if (hits !== 1) throw new Error(`${hits} hits for ${before.slice(0, 70)}`)
	next = next.replace(before, after)
}
writeFileSync(PATH, next)
process.stdout.write(`applied ${EDITS.length}\n`)
