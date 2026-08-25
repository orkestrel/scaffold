# Unit ARM-AUDIT — root-cause analysis of the project-deadline fixture's arm starvation

## Role and engine

GPT-5.6 Sol, inside the journaled codex CLI, read-only. Perform the analysis directly and spawn
nothing. Your sandbox cannot run the suites; answer from source.

## Objective

Explain, from source, why the `arm` event of the `Probe` fixture in
`tests/src/server/Probe.test.ts` (case
`expires caller-named project resolution and serves through the recycled type stage`, near line
798) fails to fire within 150 seconds ONLY when the three projects run in one vitest invocation,
and name the smallest correct fix.

## Measurements (host, 4-thread container, all with @orkestrel/mcp 0.0.23 installed)

- `Probe.test.ts` alone: green, roughly 112 s for 26 cases, arm within a 10 s guard.
- `--project src:server` alone (7 files, 163 tests): green, 165 s total.
- `--project src:server --project src:bin`: green, 303 s total.
- `--project src:core --project src:server --project src:bin` (the `test:src` script, 11 files,
  204 tests): the case fails at the arm guard at 10 s, at 60 s, and at 150 s, across five runs
  including one on an otherwise idle container. The invocation still completes (306 s total), so
  the machine is not wedged.
- The fixture writes 10,000 generated files plus a tsconfig with 1,200 include globs before
  constructing the `Probe`, then races an `arm` listener against the guard.

## Questions to answer, each with file:line evidence

1. What work does `Probe` boot perform between construction and emitting `arm`? Name each await
   point and each spawned child or pooled resource.
2. Which of those resources are shared beyond the test's own scratch directory — a process pool
   with a global cap, a port, a cache or temp directory keyed on something non-unique, a lock
   file, an fd or watcher budget — such that sibling test files or sibling projects in the same
   vitest invocation could block or serialize boot indefinitely rather than merely slow it?
3. Does any path in boot swallow or defer the `arm` emission on a recoverable error (a failed
   child, a rejected discovery) such that arming never happens rather than happening late?
4. Given the answers, name the smallest correct fix, with a preference order across: a change to
   the fixture (smaller tree, different arming point), a change to the case's scheduling, a
   change in `src/server` boot behavior (only if boot is genuinely defective), or a sized guard
   (only if the evidence says arming completes but late). State what each option costs.

## Context

- Source: `src/server/Probe.ts`, `src/server/stages/**`, whatever boot reaches (follow the
  imports), `tests/setupServer.ts` helpers the case uses, `vite.config.ts` project definitions.
- The failing case: `tests/src/server/Probe.test.ts:798-900` as the tree stands (guard at
  150_000, case timeout 240_000 — both raised during diagnosis).
- Law: the vendored `.claude/rules/tests.md`.

## Scope

Read-only. No edits, no git state changes, no writes outside `tmp/codex/`.

## Output

Numbered answers with evidence, then one line: `ROOT CAUSE: <one sentence>` and one line
`FIX: <the recommended smallest fix>`.
