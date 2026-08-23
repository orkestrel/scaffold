# Round 3 — the Orchestrator's own corroboration of a lane finding

The objective lane's C10 named a defect neither the brief nor the other lane raised, in code the
previous fix round itself added. The Orchestrator reproduced it independently, with a control.
Instrument: `scratchpad/audit/r3/arraytarget/run.sh`. Dated 2026-08-23.

A package publishing an exports array whose first member is not a valid package target:

```json
{ "exports": { ".": ["../outside.cjs", "./valid.cjs"] } }
```

Node's package-target rules reject a member that does not begin with `./` and fall through to the
next one. `resolveTarget`, added to the generated proof by FIX-G, returns the first member that
resolves anything at all and never validates it:

```text
=== what does NODE actually resolve for the array fallback? ===
{"from":"valid"}

=== what does the proof's resolveTarget pick? ===
  resolveTarget -> ../outside.cjs
  collectTargets -> ["../outside.cjs","./valid.cjs"]

=== CONTROL: a single valid target — do Node and resolveTarget agree? ===
  node -> {"from":"valid"}
```

The control is what makes the reading bind: with one valid member Node and `resolveTarget` agree, so
the disagreement is specifically the skipped invalid member rather than a difference in the walkers.

Two consequences, both in the emitted proof a target runs against its own tarball:

- The proof reads its declaration, its browser face, and its `module` flag from a target Node never
  loads.
- `collectTargets` inventories the invalid member, so the existence sweep demands a file inside the
  installed tree that a correctly published package has no reason to ship. That is a false red
  against a package Node handles correctly.

FIX-G closed a real hole by walking arrays at all. It walked them by a rule looser than Node's.
