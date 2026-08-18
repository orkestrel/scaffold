# Successor brief: setup-project unit, amendment 1

Amends `tmp/setup-project-unit.md`, which remains the unit's instruction in full. One change and one
clarification; nothing else moved.

## What changed and why

The unit stopped on a correct deviation: `tests/setup.ts:177` (`buildBlueprint`) constructs a
complete `Blueprint` record, so the `setup` field reaches it, and the original owned list granted
only `tests/src/**`.

**Grant added:** `tests/setup.ts` and `tests/setupServer.ts` are owned. Both reference `Blueprint`;
extend `buildBlueprint`'s defaults with `setup: false` and update its TSDoc example if the field
belongs there. These are scaffold's own setup files, not vendored ones — the vendored set
(`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`) stays off-limits.

## Clarification carried from your own discovery

You found the validator searches `blueprintToRootVite(blueprint)`'s generated text for project
labels rather than inspecting the compiled `Plan`. That satisfies the design's atomicity requirement
as long as the `setup` project label is emitted by `blueprintToRootVite` itself when
`blueprint.setup` is true — registration, script, and validation then all derive from the one
`Blueprint` fact. Proceed on that basis; no design change.

Your baseline is already taken (src:core 293 collected, 287 passed, 6 sandbox-blocked spawns).
Continue from the discovery you completed; do not redo it.
