# Unit baseline-perf — runtime and type-level baselines for contract 0.0.14

## Role and engine

Orchestrator-owned probe unit (Opus 5, main session). Performed directly; spawns nothing.

## Objective

Record the pre-change performance baselines the design round and every later claim measure
against: compile-path heap and time, hot-path per-operation CPU for every compiled family, and
type-level check diagnostics — each with a discriminating negative control.

## Context

- Subject: `/home/user/contract` at commit 859d149 (version 0.0.14, equals origin/main).
- `dist/` is current: the `prepublishOnly` chain rebuilt it at this exact commit on 2026-09-01
  and no source file changed after (git status clean).
- Instruments live in the session scratchpad (`instruments/`), never in the subject tree, per
  `.agents/orchestration.md` § Writing concurrency. Results land beside them under `results/`.
- The heap instrument is the archived `contract-baseline.mjs` from commit b6cfb3d, unchanged:
  monotonic SINK retention, medians of rounds, `CONTROL_ARRAY` control (expected near 8192 B
  payload for `new Array(1024).fill(0.5)`).
- The repository's own bench channel exists: `test:bench` runs `vitest bench` over the `probe`
  project (`vite.config.ts` benchmark include reaches `tests/**/*.test.ts`). Baselines here use
  standalone node instruments for per-process isolation; adopted instruments become durable
  benches at implementation time per `.claude/rules/quality.md` § Instruments.

## Measurements

1. Compile path (existing instrument `heap-baseline.mjs`, `node --expose-gc`): B/call and
   us/call for compiler-cold, guard-only, and full `createContract` over small, medium, and deep
   shapes.
2. Hot path (new instrument `ops-baseline.mjs`, plain node, separate process per run): median
   ns/op with spread over rounds for `is` (valid and invalid input), `parse` (valid), `audit`
   (valid), `explain` (invalid), and `generate`, over the same medium and deep shapes.
   Methodology: warmup iterations before timing; several timed rounds; median and min/max
   reported; result values fed into a sink read after timing so the loop body cannot be
   dead-code-eliminated.
3. Type level (`types-baseline.sh`): `tsc --noEmit --extendedDiagnostics` for the root
   `tsconfig.json` project and `configs/src/tsconfig.core.json`, capturing check time, types,
   instantiations, and memory used; runs repeated for a median reading.

## Controls (each must discriminate or the instrument measured nothing)

- Heap: `CONTROL_ARRAY` near its payload expectation (proven in the prior campaign).
- Ops: ordering control — for the same family, deep must cost more than medium; and a timer
  floor control — an empty-body loop must measure at least an order of magnitude below the
  cheapest subject reading, or the timer resolution swallowed the subject.
- Types: the diagnostics rows must move under load — the root project (which includes tests)
  must report more types and instantiations than the scoped core project; equal readings mean
  the wrong project was measured.

## Scope

Owned: scratchpad `instruments/` and `results/` only. Off-limits: every file in both
repositories. Read-only toward the subject.

## Output

`results/heap-baseline.out`, `results/ops-baseline.out`, `results/types-baseline.out`, each
carrying the exact command at its head, plus a distilled summary table in the unit report.

## Acceptance criteria

- Every control discriminated as specified.
- Every number carries its unit, shape, and rounds.
- Report names instrument coverage: what the baselines do not measure (GC pause distribution,
  IC states, startup cost) is stated rather than implied.
