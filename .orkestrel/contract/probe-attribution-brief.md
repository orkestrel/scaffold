# Unit probe-attribution — attribute the hot-path nanoseconds by CPU profile

## Role and engine

Orchestrator-owned probe unit (Opus 5, main session). Performed directly; spawns nothing.

## Objective

Attribute the measured per-call cost (medium `is` 2327 ns/op, deep `audit` 21269 ns/op from the
baseline unit) to concrete frames by using V8's sampling profiler (`node --cpu-prof`), so the
design round works from measured attribution rather than from source-reading hypotheses. The
independent S1 scout lane maps the same ground from source; the two cross-check.

## Context

- Subject: `/home/user/contract/dist/src/core/index.js` at 859d149 (built, current).
- Instrument and results live in the session scratchpad. Read-only toward both repositories.
- `--cpu-prof` writes a `.cpuprofile` JSON (nodes with functionName/url, samples, timeDeltas);
  the instrument aggregates self time per function and prints the top frames. No extra packages.

## Measurements

Per subject (medium:is, deep:audit — the cheapest and the most expensive families): run the hot
loop for roughly 2 s under `--cpu-prof`, parse the profile, report top frames by self time with
percentage of total sampled time.

## Control

The harness loop frame (the instrument's own `timeRound`-equivalent) plus contract frames plus
GC/program frames must account for the large majority of samples; a profile whose top frames sit
outside both the instrument and the subject means the capture missed the workload — discard and
re-run. State the percentage captured.

## Scope

Owned: scratchpad `instruments/`, `results/`. Off-limits: every repository file.

## Output

`results/cpu-attribution.out` with the exact command at head; distilled top-frame table in the
unit report (folded into the design brief's evidence).

## Acceptance criteria

- Every frame row carries self-time percentage and source URL line.
- Capture control stated with its percentage.
