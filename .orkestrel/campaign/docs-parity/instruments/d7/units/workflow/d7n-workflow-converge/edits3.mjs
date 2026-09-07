// Rewrites the member descriptions the Methods cells now carry: the shouted emphasis
// lowered, the doc-style asides dropped, and the overload fact the guide cell held moved
// into the block that owns it.
import { readFileSync, writeFileSync } from 'node:fs'

const PATH = 'src/core/types.ts'
const EDITS = [
	[
		'\t * Applies a validated declarative patch to SELF (`name` / `description`).',
		'\t * Applies a validated declarative patch to this task itself (`name` / `description`).',
	],
	[
		'\t * Parks until this phase is not paused — **promise-parked**, never a timer or busy-loop\n\t * (mirrors {@link WorkflowInterface.wait}).',
		'\t * Parks until this phase is not paused — a promise-parked wait, never a timer or busy-loop.',
	],
	[
		"\t * (the entity structural API) — gated BEFORE delegating to {@link tasks}'\n\t * manager.",
		"\t * (the entity structural API) — gated before it delegates to the {@link tasks} manager.",
	],
	[
		'\t * Applies a validated declarative patch to SELF (`name` / `description` /\n\t * `concurrency` / `bail`).',
		'\t * Applies a validated declarative patch to this phase itself (`name` / `description` /\n\t * `concurrency` / `bail`).',
	],
	[
		'\t * Tears this workflow down — an atomic TERMINAL teardown: mark',
		'\t * Tears this workflow down — one atomic terminal teardown: mark',
	],
	[
		"\t * Parks until this workflow is not paused — **promise-parked**, never a timer or\n\t * busy-loop (mirrors {@link ControllerInterface.wait}'s doc style).",
		'\t * Parks until this workflow is not paused — a promise-parked wait, never a timer or\n\t * busy-loop.',
	],
	[
		"\t * into this workflow (the entity structural API) — gated BEFORE delegating\n\t * to {@link phases}' manager.",
		'\t * into this workflow (the entity structural API) — gated before it delegates to the\n\t * {@link phases} manager.',
	],
	[
		'\t * Inserts `task` at `index` (default the end) — the GATED mutation counterpart to',
		'\t * Inserts `task` at `index` (default the end) — the gated mutation counterpart to',
	],
	[
		'\t * Inserts `phase` at `index` (default the end) — the GATED mutation counterpart to',
		'\t * Inserts `phase` at `index` (default the end) — the gated mutation counterpart to',
	],
	[
		"\t * Executes a workflow definition to completion — BUILDS its live tree, runs the phases\n\t * sequentially with each phase's tasks concurrent — resolving its terminal\n\t * {@link WorkflowResult} (whose `workflow` is the freshly-built live tree).",
		"\t * Executes a workflow to completion — building the live tree from a definition, or driving\n\t * an already-built caller-owned tree — running the phases sequentially with each phase's\n\t * tasks concurrent, and resolving its terminal {@link WorkflowResult}.",
	],
	[
		"\t * registry in) and register it under `definition.id`.",
		"\t * registry in) and registers it under `definition.id`, overwriting an already-registered id.",
	],
	[
		"\t * Resolves a workflow by id — from the registry if present, else HYDRATED from the\n\t * optional {@link WorkflowStoreInterface} (`store`), RUNNABLE (this manager's `functions`\n\t * registry is threaded into the rehydration).",
		"\t * Resolves a workflow by id — from the registry when it holds one, otherwise hydrated from\n\t * the optional {@link WorkflowStoreInterface} (`store`) and runnable, because this manager's\n\t * `functions` registry is threaded into the rehydration.",
	],
	[
		"\t * Persists a REGISTERED workflow's {@link WorkflowInterface.snapshot} to the optional",
		"\t * Persists a registered workflow's {@link WorkflowInterface.snapshot} to the optional",
	],
	[
		"\t * Parks until this unit's `signal` aborts — **promise-parked**, never a timer.",
		"\t * Parks until this unit's `signal` aborts — a promise-parked wait, never a timer.",
	],
	[
		"\t * Injects one more unit into an IN-FLIGHT `execute` run — a LIVE counterpart to a\n\t * `Controller.spawn`, called from OUTSIDE any unit's handler (the seam a live\n\t * `running` {@link PhaseInterface}'s `add` event lets a subscribed run offer a newly\n\t * added task to the SAME execution substrate).",
		"\t * Injects one more unit into a run already in flight — the live counterpart to a\n\t * `Controller.spawn`, called from outside any unit's handler (the seam through which a\n\t * subscribed run offers a newly added task of a `running` {@link PhaseInterface} to the same\n\t * execution substrate).",
	],
	[
		'\t * Suspends dispatch (resumable): the backing queue holds the NEXT dispatch\n\t * while any in-flight unit finishes; idempotent.',
		'\t * Suspends dispatch (resumable): the backing queue holds the next dispatch\n\t * while any in-flight unit finishes; idempotent.',
	],
	[
		"\t * Ends the runner permanently — a GRACEFUL stop: no further unit is\n\t * dispatched, but every already-in-flight unit runs to completion and settles\n\t * normally. A never-dispatched (still-pending) unit is rejected by the backing queue\n\t * and is NOT recorded as a failure (it never trips fail-fast); a genuine in-flight\n\t * failure still is. `execute`'s promise RESOLVES (never rejects) after every unit has\n\t * settled, with whatever results actually completed. Idempotent.",
		"\t * Ends the runner permanently — a graceful stop: no further unit is\n\t * dispatched, but every already-in-flight unit runs to completion and settles\n\t * normally. A never-dispatched (still-pending) unit is rejected by the backing queue\n\t * and is not recorded as a failure, so it never trips fail-fast, while a genuine in-flight\n\t * failure still does. `execute`'s promise resolves rather than rejects after every unit has\n\t * settled, with whatever results completed. Idempotent.",
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
