# Unit probe-mechanisms — magnitude of each candidate per-call mechanism, in isolation

## Role and engine

Orchestrator-owned probe unit (Opus 5, main session). Performed directly; spawns nothing.

## Objective

Measure, before the design round rules, the isolated cost ratio of each per-call mechanism the
attribution unit found against its candidate replacement, so the design reconciles measured
magnitudes rather than plausible stories. A mechanism whose replacement wins less than a clear
margin is dropped on evidence.

## Context

- Attribution findings (probe-attribution-report.md): per-call `attempt` closure + `Result`;
  per-call `Set` membership build; per-call defensive array snapshot with sort and numeric/text
  round-trip; `Reflect.apply` intrinsic dispatch on `WeakMap` reads; per-call `Object.freeze`
  of internal fresh arrays.
- These probes compare mechanism PATTERNS in isolation (pure V8, no contract import), so they
  measure the mechanism, not the library. The library-level effect of any adopted strategy is
  re-measured against the ops baseline at implementation time.
- Single-process A/B risks IC pollution across variants (R1 evidence 6). Each variant runs in
  its own function with its own call sites; the deciding re-measure at implementation time is
  per-process. Stated as instrument coverage.

## Measurements (each: warmup, 7 rounds, median ns/op, alternating variant order)

- M-A `attempt` closure + Result object per call vs bare try/catch around the same body
  (non-throwing path).
- M-B required-key presence through fresh `Set` per call (`collectMembers` pattern with
  `Reflect.apply` admits) vs direct `Object.prototype.hasOwnProperty.call` per required key vs
  plain `value[key] !== undefined` reads.
- M-C defensive array snapshot (own names, numeric/text round-trip, sort, fresh list, freeze)
  vs honest packed walk (`length` + indexed loop + one `i in value`-style hole check).
- M-D `Reflect.apply(WeakMap.prototype.get, memo, [key])` vs compile-time-bound
  `get = Reflect.apply(bind, WeakMap.prototype.get, [memo])` then `get(key)` vs plain
  `memo.get(key)` (the unsafe reference form, as the floor).
- M-E `Object.freeze(fresh array)` per call vs returning the fresh array unfrozen.

## Control

Per measurement, the KNOWN-different pair must discriminate: the unsafe floor variant must beat
the defensive variant by a visible margin somewhere, and two IDENTICAL variants (same body twice,
M-A run as its own control) must read within round-to-round spread of each other — an instrument
whose identical pair differs by more than its spread measured its own harness.

## Scope

Owned: scratchpad `instruments/`, `results/`. Off-limits: every repository file. No imports from
the contract package — mechanism isolation is the point.

## Output

`results/mechanisms.out` with command at head; per-measurement table of median ns/op and ratio.

## Acceptance criteria

- Identical-pair control within spread; every ratio carries both medians and the call count.
- A verdict line per mechanism: candidate wins by NxM margin, or no meaningful difference.
