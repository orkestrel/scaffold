# Unit P-fix — report capture note, 2026-08-21

The unit's returned report was not captured to disk before the session's context compaction,
and the compacted transcript no longer carries it. This note records the loss and the
surviving evidence instead of reconstructing prose the unit did not write.

Surviving evidence:

- The fixes themselves: the probe working tree at `C:/Users/mikes/WebstormProjects/probe`
  (predicate hardening in `src/server/helpers.ts`, the code-reading capability gate in
  `tests/setupServer.ts`, the split progress proofs in
  `tests/src/server/stages/RuntimeStage.test.ts`, the corrected TTY citation in
  `tests/src/bin/main.test.ts`, the dropped duplicate pin in
  `tests/src/server/ProbeServer.test.ts`, the two corrected guide rows in `guides/probe.md`).
- The Orchestrator's authoritative host run after the unit exited:
  `src:server` reported `143 passed | 2 skipped`, exit 0.
- The ruling record the unit implemented: `audit-probe-reconciliation.md`.
- The brief: `unit-pfix-brief.md`.

The unit reported failing-first pairs for fixes 1 and 2 per its brief's criterion 4; the raw
pair output is lost with the report. The fix-round audit lane re-derives discrimination by
probe where its ruling needs it.

Process correction, landed here: capture a native unit's returned report to disk in the same
action that accepts it, before anything else consumes the context.
