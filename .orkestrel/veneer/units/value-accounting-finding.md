# The cascade-to-record accounting is one-directional, measured

The Orchestrator's own reading, taken during CL8's audit round, with one half independently reached
by that round's objective lane. The instruments are `units/value-gap-probe.mjs` and
`units/cl8-value-audit.mjs`. They compile `src/styles/index.scss` unminified and compare each listed
key's recorded declarations against the emitted ones, applying the logical-property ruling.
Compiling unminified matters: the built artifact is minified, so a comparison against it would
assert the minifier's rounding rather than the code.

## What is already closed

**Every recorded name is accounted for.** Each listed key's selectors either ship at the condition
the record carries or hold a deferral row naming the unit that closes them, and
`scanCompatibilityPresence` refuses both a missing shipped selector and a deferred selector found in
the cascade. The keys whose selectors are absent from the compiled source are exactly the keys
carrying deferral rows, which is the mechanism working rather than a gap.

## The two gaps, which are the same gap in different dimensions

Both are the accounting running one way: from the record into the cascade, never back.

**Nothing rejects a name the cascade ships that the record does not carry.** CL8's objective lane
reached this independently and recorded it as a property of the harness reaching every component
key, not a defect of any one unit: the presence scan checks that required names are present and that
deferred names are absent, and stops there. CL8's own fix round closes it for the grid keys by
retaining the unit's emission instrument as a proof. Every other key is still open.

**Nothing compares declaration values at all.** Across the listed keys the differences concentrate
in the keys that tokenize most:

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

## What closing both would require

One unit, because the two halves share a mechanism: a full reconciliation of the compiled cascade
against the record, in both directions and over both names and values.

- A **departure table** beside the deferral table, keyed by selector and property, giving the
  recorded value, the emitted value, and the class of departure. The gate asserts every emitted
  declaration equals either its recorded value or its declared departure, and refuses a departure
  whose emitted value no longer matches.
- An **extra-name assertion** generalizing what CL8's fix round retains for the grid keys, so a
  selector the cascade ships that no key records reddens.

That turns "Veneer tokenizes this" and "Veneer ships only what Bootstrap records" from things a
reader infers into things a run checks.

## Why it is the user's call, not a re-baseline

The Content/layout family's exit criterion names per-key implementation, the captures, the guide,
and the portfolio verdict. A cross-cutting reconciliation unit is not work that criterion already
required, so adding it moves the criterion and is a rescope rather than a re-baseline.

The argument for it is the baseline framing. A Bootstrap major that changed a declaration's value
would pass every gate in the tree today, because the selector still ships and no run compares what
it carries. So would a stray selector Veneer emits that Bootstrap never had.

The argument against is cost and possible duplication. Veneer's values are calibrated from the
foundation record, so part of the value accounting may already live in the token layer, and the unit
would be comparable in size to a whole family's work.

Recommendation: schedule it after the Content/layout family closes, sized from this measurement,
rather than opening it mid-family. Each remaining family then inherits a gate that holds its keys
from the start, rather than needing its own retrofit.
