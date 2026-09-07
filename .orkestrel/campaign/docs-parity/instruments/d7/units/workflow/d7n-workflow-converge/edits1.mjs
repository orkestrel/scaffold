import { readFileSync, writeFileSync } from 'node:fs'
const EDITS = [
	['src/core/helpers.ts',
		' * Tests whether a {@link LifecycleStatus} is TERMINAL — a node in this state will not\n * transition further.',
		' * Tests whether a {@link LifecycleStatus} is terminal — `completed`, `failed`, `skipped`, or\n * `stopped`, the states a node never transitions out of.'],
	['src/core/helpers.ts',
		' * Tests whether a driving run must stop giving a workflow more work.',
		' * Tests whether a driving run must stop giving a workflow — or one forced phase of it —\n * more work.'],
	['src/core/helpers.ts',
		' * Tests whether forcing a workflow `stopped` would still record something.',
		' * Tests whether forcing a workflow `stopped` would still record the cancellation.'],
	['src/core/helpers.ts',
		' * Derives a phase\'s status from its tasks\' statuses (tasks are concurrent, so this\n * is an order-insensitive reduction).',
		' * Derives a phase\'s status from its tasks\' statuses, the most severe terminal status winning\n * (tasks are concurrent, so this is an order-insensitive reduction).'],
	['src/core/helpers.ts',
		' * paired with the EFFECTIVE `bail` it ran under (`phase.bail ?? workflow.bail`) — so the\n * failure outcome is PER-PHASE-bail-aware (phases are sequential, but the derivation is an\n * order-insensitive reduction over the settled set).',
		' * paired with the effective `bail` it ran under (`phase.bail ?? workflow.bail`) — so the\n * failure outcome is aware of each phase\'s own policy, and `failed` is reachable only where\n * that policy is `true` (phases are sequential, but the derivation is an order-insensitive\n * reduction over the settled set).'],
	['src/core/helpers.ts',
		' * Derives the PENDING SUFFIX boundary of a positional list of {@link LifecycleStatus}es —\n * the index of the first entry in the contiguous trailing run of `pending` entries.',
		' * Derives the pending-suffix boundary of a positional list of {@link LifecycleStatus}es —\n * the index of the first entry in the contiguous trailing run of `pending` entries, or the\n * list\'s length where it has none.'],
	['src/core/helpers.ts',
		' * Resolves a task\'s runtime silence window against its workflow default.',
		' * Resolves a task\'s runtime silence window against its workflow default, to a host-safe\n * `1..MAX_TIMER_MS` window or to `undefined` where the task disables it.'],
	['src/core/helpers.ts',
		' * Converts a {@link WorkflowDefinition} into an INITIAL {@link WorkflowSnapshot} — every\n * node `pending`, no results, empty metadata — so the live W-b tree has ONE construction\n * path (snapshot-driven) for both a fresh build and a restore.',
		' * Converts a {@link WorkflowDefinition} into an initial {@link WorkflowSnapshot} — every\n * node `pending`, no results, empty metadata — so the live W-b tree has one construction\n * path, snapshot-driven, for a fresh build and for a restore alike.'],
	['src/core/helpers.ts',
		' * Parks until `signal` aborts — a promise-parked wait, never a timer or\n * busy-loop, that NEVER rejects.',
		' * Parks until `signal` aborts — a promise-parked wait, never a timer or\n * busy-loop, that resolves on the abort event and never rejects.'],
]
for (const [path, before, after] of EDITS) {
	const text = readFileSync(path, 'utf8')
	const hits = text.split(before).length - 1
	if (hits !== 1) throw new Error(`${path}: ${hits} hits for ${before.slice(0, 60)}`)
	writeFileSync(path, text.replace(before, after))
}
process.stdout.write(`applied ${EDITS.length}\n`)
