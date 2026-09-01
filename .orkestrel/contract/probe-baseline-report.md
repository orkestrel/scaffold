# Unit probe-baseline — report

Instruments: `zod-pattern.mjs` and `contract-baseline.mjs`, retained beside this report in
`.orkestrel/contract/` with their captured outputs. Node v22.22.2, Linux, 2026-09-01.

## Instrument validity

The first run of each instrument failed its negative control and was not used. The
`Float64Array` control reported 264 B against a 1024 B expectation because a typed array's
backing store is off-heap and invisible to `heapUsed`, and small-variant rounds read near zero
because a released prior round's garbage collected inside the measurement window. The rewritten
instruments retain every allocation monotonically until process exit and use an on-heap
`Array(128)` control. Controls then passed: CONTROL_BUFFER delta 1080.5 B against a 1024 B
payload expectation; CONTROL_ARRAY 8248 B against 8192 B.

## Isolated pattern readings (24 methods per class, 30000 instances per round, medians of 3)

- Plain prototype methods: 72.0 B/instance.
- Prototype getters, untouched: 72.1 B/instance — the lazy-allocation claim holds: +0.1 B over
  plain prototype methods.
- Prototype getters, every method touched: 2584.0 B/instance — the saving vanishes when
  everything is materialized.
- Constructor-assigned bound closures: 2624.5 B/instance — 36.39x the untouched-getter cost.
  The Zod article's 9.8x for `z.string()` (40 methods beside 9 data properties) is directionally
  and mechanically confirmed; the multiplier depends on the data-property base.
- Frozen instance, then touched: the self-overwriting getter THREW
  `TypeError: Cannot define property parse, object is not extensible`. Zod's caching form —
  `Object.defineProperty` onto the instance — cannot serve a frozen object. A frozen bundle must
  cache behind the getter instead.

## Contract baseline readings (500 calls per round, medians of 3)

| Shape | `new ContractCompiler` cold | compiler + `guard` read | `createContract` |
| ----- | --------------------------- | ----------------------- | ---------------- |
| small (one string leaf) | 1152 B, 2.1 us | 2324 B, 58.3 us | 1951 B, 66.3 us |
| medium (object, leaf properties beside an array and a literal) | 1152 B, 0.3 us | 5634 B, 160.1 us | 12543 B, 223.3 us |
| deep (nested objects, array of objects, a union, a literal) | 1152 B, 0.3 us | 18878 B, 374.0 us | 52512 B, 597.1 us |

## What the readings decide

- The compiler shell costs 1152 B before any getter read: the constructor allocates the paired
  empty release siblings (arrays and WeakMap instances) per instance. A shared-sentinel design
  could remove most of that.
- `createContract` pays for every family eagerly: 2.2x the guard-only heap on the medium shape,
  2.8x on the deep shape, and more time in proportion. A consumer touching one artifact overpays
  by that factor.
- The counter-finding: on the small shape the full bundle (1951 B) is CHEAPER than guard-only
  (2324 B), because `#collect` releases the node index and plan arrays only after every family
  exists. A partial consumer retains the working set indefinitely. Any lazy-bundle design
  inherits this retention unless release becomes per-family-aware.
- Flagged claim: heap medians vary between rounds by under 5 percent; the small-shape
  guard-only/contract inversion was stable across rounds but rests on one shape — treat the
  inversion's magnitude, not its existence, as approximate.
