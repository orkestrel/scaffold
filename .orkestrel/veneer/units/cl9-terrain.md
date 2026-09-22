# CL9 terrain — the table key, measured

The Orchestrator's own reading, taken while CL8b was live. The instrument is
`units/cl9-table-probe.mjs`, run against the pinned inventory at the CL8 landing. No scout was
dispatched: the probe answers what a scout would have been asked.

## The key

`table` carries 29 selector entries and 140 declarations — far denser per selector than the grid,
which carried a few declarations each across hundreds of selectors. Its properties object carries
fourteen custom properties, so `collectShippedComponents` requires a shipped variable row for each,
and the guide's compatibility table grows by that many rows.

Its families:

```text
  5  .table-responsive-{bp}
  1  .table                                      1  .table > :not(caption) > * > *
  1  .table > tbody                              1  .table > thead
  1  .table-group-divider                        1  .caption-top
  1  .table-{bp} > :not(caption) > * > *         1  .table-responsive
  1  .table-bordered > :not(caption) > *         1  .table-bordered > :not(caption) > * > *
  1  .table-borderless > :not(caption) > * > *   1  .table-borderless > :not(:first-child)
  1  .table-striped > tbody > tr:nth-of-type(odd) > *
  1  .table-striped-columns > :not(caption) > tr > :nth-child(even)
  1  .table-active                               1  .table-hover > tbody > tr:hover > *
  1  .table-primary  .table-secondary  .table-success  .table-info
  1  .table-warning  .table-danger  .table-light  .table-dark
```

**Nothing else rides under this prefix and no other key shares a selector with it**, unlike the
grid's keys. That is checked exhaustively rather than by prefix: `units/cl9-overlap-probe.mjs`
compares this key's selectors against **every** key in the record and finds no shared selector, and
finds `.caption-top` the only selector whose leading class is not a table name — with `caption-top`
not itself a key, so `table` is its only record and this unit ships it rather than deferring it. It
sets the caption side, which is table behaviour.

**The exhaustive form of that check is the point.** CL8's `row` key carried every `.row-gap-*`
selector while a separate `row-gap` key carried the same ones, and a prefix-limited check would not
have found it — the first version of this terrain record used exactly such a check and reached the
right answer for the wrong reason. A key whose selectors another key also carries cannot be added to
the emitted-vocabulary comparison's key tuple beside that other key, because the recorded side then
counts each selector twice against a cascade emitting it once. So the tuple question is settled here
in advance: `table` can join the tuple on its own account.

## The fact that decides the unit

**Every breakpoint-scoped selector this key carries is recorded under a MAXIMUM width**, not a
minimum:

```text
@media (max-width: 575.98px)  …  @media (max-width: 1399.98px)
```

That makes CL8's finding 9 live in this unit. The emitted-vocabulary collector's condition
normalizer equates only the minimum-width spelling with its range form, so a selector recorded under
a maximum width and emitted through the downward mixin compares unequal though the conditions agree.
Inert for the grid, because every grid condition is a minimum width and the partial emits only the
upward mixin.

**So CL9 is where that finding comes due**, and it comes due only if CL9 extends the
emitted-vocabulary proof to this key — which it should, because extending that proof per key as each
unit lands is the incremental path to the cross-cutting gate the value-accounting finding proposes.
CL9's brief therefore carries finding 9 as work rather than as a bound: teach the normalizer the
downward spelling, and prove it with a control under a maximum-width condition.

The unit must also use the downward breakpoint mixin rather than the upward one for these families.
That mixin exists and this is its first production use; the section after the open questions records
what reading it found.

## What the design row adds

`content-layout-design-verdict.md` gives CL9 `components/_table.scss` with the caption class, the
wrappers and the variants, a `--vn-state-stripe` token, the proofs, a table showcase section, and
the key's rows. It depends on CL0 and CL8, both landed.

## Open before briefing

- How the fourteen custom properties relate to each other — several are a state-layer pair
  (`-type`, `-state`) over a base pair, and the variant classes set the base. Read the record's
  declarations rather than assuming the layering.
- Whether the striped, active, and hover variants read Veneer tokens or the Bootstrap accent
  variables, and what `--vn-state-stripe` is for against the record's own striped background.
- Whether the responsive wrapper's overflow behaviour needs a browser reading that a real viewport
  resize can produce, given that its condition is a maximum width.

## The downward equivalence is arithmetic, not just spelling

Measured after the probe. The `breakpoint-down` mixin exists in `src/styles/_mixins.scss` — cited by
name rather than by line, because CL8b later added a mixin above it and a line citation here went
stale the moment that landed. It emits the range form:

```scss
@media (width < #{$width}) { @content }
```

so `breakpoint-down(sm)` emits `(width < 576px)` while the record carries
`@media (max-width: 575.98px)`. Bootstrap's downward boundary is the named boundary less 0.02px
throughout — 575.98 against 576, 767.98 against 768, and so on — so the two conditions select the
same viewports and differ in both spelling and number.

**The equivalence the normalizer must encode is therefore `max-width: (N - 0.02)px` against
`width<Npx`**, which is arithmetic rather than a string rewrite. The upward pair it already handles
is a string rewrite over the same number, so CL8's finding 9 is larger than the lane's description:
teaching the normalizer the downward direction means teaching it that boundary arithmetic.

**Veneer's mixin stays as it is.** The range form is the modern spelling, it selects the same
viewports, and the declaration-value ruling already accepts a Veneer form that differs from the
record where the effect matches. The equivalence belongs in the comparison, not in the emission.

**CL9 is `breakpoint-down`'s first production consumer.** Today it is exercised only by the mixin
fixture and the setup proof, never by a partial. Expect its first real use to surface something the
fixture did not.
