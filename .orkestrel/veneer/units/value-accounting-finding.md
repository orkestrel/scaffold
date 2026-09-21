# The value-accounting gap, measured

The Orchestrator's own reading, taken during CL8's audit round. The instrument is
`units/value-gap-probe.mjs`. It compiles `src/styles/index.scss` unminified and compares every
listed key's recorded declarations against the emitted ones, applying the logical-property ruling.
Compiling unminified matters: the built artifact is minified, so a comparison against it would
assert the minifier's rounding rather than the code.

## What is already closed

**Selector accounting is complete and gated.** Every listed key's selectors either ship at the
condition the record carries or hold a deferral row naming the unit that closes them, and
`scanCompatibilityPresence` refuses both a missing shipped selector and a deferred selector found in
the cascade. The keys reading selectors absent from the compiled source are the keys with deferral
rows, which is the mechanism working rather than a gap.

## What is not closed

**No gate compares declaration values.** Across the listed keys the probe finds differences
concentrated in the keys that tokenize most:

```text
key           compared  differing
btn                348        294
reboot             224        103
link               136         99
container           97         34
display             24         18
```

**The differences are systematic, not accidental.** They fall into recognizable classes:

- a recorded literal replaced by a Veneer token — `.display-1 font-size: calc(1.625rem + 4.5vw)`
  against `var(--vn-display-1)`;
- a recorded Bootstrap variable replaced by a Veneer one — `.link-primary color`'s
  `var(--bs-primary-rgb)` against `var(--vn-color-primary-rgb)`;
- an alias declared over a Veneer token — `.container --bs-gutter-x: 1.5rem` against
  `var(--vn-gutter-x)`;
- a fallback added — `body text-align`'s `var(--bs-body-text-align)` against
  `var(--bs-body-text-align, start)`;
- a vendor-prefixed or deprecated property the record carries and the cascade does not —
  `-webkit-text-size-adjust`, `.btn-check clip: rect(0, 0, 0, 0)`.

Each class is a deliberate decision. None is recorded anywhere a gate can read.

## What closing it would require

A departure table beside the deferral table, keyed by selector and property, giving the recorded
value, the emitted value, and the class of departure. The gate asserts every emitted declaration
equals either its recorded value or its declared departure, and refuses a departure whose emitted
value no longer matches. That turns "Veneer tokenizes this" from a thing a reader infers into a
thing a run checks.

## Why it is the user's call, not a re-baseline

The Content/layout family's exit criterion names per-key implementation, the captures, the guide,
and the portfolio verdict. A cross-cutting value-accounting unit is not work that criterion already
required, so adding it moves the criterion and is a rescope rather than a re-baseline.

The argument for it is the baseline framing: a Bootstrap major that changes a declaration's value
would pass every gate in the tree today, because the selector still ships and no run compares what
it carries. The argument against is cost and duplication — Veneer's values are calibrated from the
foundation record, so part of this accounting may already live in the token layer, and the unit
would be comparable in size to a whole family's work.

Recommendation: put it after the Content/layout family closes, sized from this measurement, rather
than opening it mid-family.
