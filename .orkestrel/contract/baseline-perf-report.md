# Unit baseline-perf — report

Subject: `/home/user/contract` at 859d149 (0.0.14, equals origin/main), dist current from the
2026-09-01 prepublish build. All runs 2026-09-01, node v22.22.2, idle container except the R1
Grok research lane (network-bound) in the background; spreads are reported so load noise is
visible, and every deciding comparison later re-measures A/B inside one process.

## Compile path (heap-baseline.mjs, --expose-gc, 500 calls x 3 rounds, monotonic retention)

| shape | compiler-cold | guard-only | full contract |
| --- | --- | --- | --- |
| small | 648 B, 1.7 us | 1842 B, 72.2 us | 1943 B, 72.1 us |
| medium | 648 B, 0.2 us | 4915 B, 200.6 us | 11721 B, 224.3 us |
| deep | 648 B, 0.2 us | 16977 B, 487.6 us | 48476 B, 741.6 us |

CONTROL_ARRAY 8248 B/call against 8192 B payload expectation — discriminates. Continuity: matches
the prior campaign's post-M1/M2 readings (648 cold shell, 11677/48449 contract), so the archive
numbers and this tree agree.

## Hot path (ops-baseline.mjs, median of 7 adaptive rounds, ns/op)

| subject | medium | deep |
| --- | --- | --- |
| is(valid) | 2327 | 7611 |
| is(invalid-late) | 2498 | 7770 |
| parse(valid) | 2623 | 7677 |
| audit(valid) | 4874 | 21269 |
| explain(invalid) | 4302 | 14798 |
| generate() | 5481 | 18003 (patternless-zip variant) |

CONTROL_TIMER 9 ns/op vs cheapest subject 2327 ns/op — discriminates. Ordering control deep >
medium for every family — discriminates.

Reading: a compiled guard at 2.3 us for a flat object of a handful of leaves is far above the
walk cost of the data; per-call overhead (dispatch indirection, per-call allocation) dominates.
The diagnostic families cost 2-3x the guard. This is the campaign's largest measured surface.

## Behavioral finding (outside scope, recorded for its owner)

`generate` refuses a pattern-constrained string shape with `ContractError` code `generate`
("cannot be auto-generated"). Documented refusal; the instrument substituted a patternless zip
for the deep generate reading. No action this campaign unless the design round adopts it.

## Type level (types-baseline.sh, tsc 6.0.2 --extendedDiagnostics, 3 runs)

| project | files | types | instantiations | check time (median) | memory |
| --- | --- | --- | --- | --- | --- |
| tsconfig.json (root, with tests) | 383 | 69995 | 108922 | 8.43s | ~375 MB |
| configs/src/tsconfig.core.json | 105 | 10632 | 12189 | 1.24s | ~84 MB |

Control (root >> core on types and instantiations) — discriminates. Neither project is
pathological; the open type-level question is consumer-side `Infer` instantiation cost on large
shapes, which the baselines here do not measure.

## Coverage

Measured: compile-path heap and time, hot-path CPU per family, project check diagnostics.
Not measured: GC pause distribution, inline-cache states and deopts, startup/import cost,
consumer-side type instantiation cost, browser/other engines. Claims later in the campaign
inherit this coverage, not more.
