# CL8b rulings — the step scale behind the gutter and gap utilities

Taken by the Orchestrator before CL8b is briefed, from measurements rather than from the scout's
assessment. The instrument is `units/cl8b-steps-probe.mjs`, run against the pinned inventory and
`src/styles/_tokens.scss` at the CL7 landing.

## What was measured

Every one of `g`, `gx`, `gy`, `row-gap`, `gap`, and `column-gap` sets the same step scale:

```text
0 = 0   1 = 0.25rem   2 = 0.5rem   3 = 1rem   4 = 1.5rem   5 = 3rem
```

The Veneer space tokens carry four of those values — at their second, fourth, eighth, twelfth, and
twenty-fourth members — but **every space token is `calc(<length> * var(--vn-factor-density))`**,
while `--vn-gutter-x: 1.5rem` and `--vn-gutter-y: 0` carry no factor.

## Ruling: the utilities take their own step scale, and it is not density-scaled

The scout's assessment was that the utilities need no new token because the space scale already
covers the steps. Reading the token file refutes it. Reading the space scale would make the
utilities density-scaled while the value they override is not, so **`.g-4` and the row's own
default would mean different lengths at any density but the identity**, even though both nominally
mean the gutter's default. A utility that silently disagrees with the default it overrides is a
correctness defect, not a matter of taste.

So CL8b declares its own step scale, with a registry leaf per step, carrying no density factor. The
naming is CL8b's to choose within the registry path law and the naming rules; the constraint is
that the scale is distinct from `--vn-gutter-x` and `--vn-gutter-y`, which are the axis's current
values rather than scale entries, and that a consumer can retune the scale without touching either.

**Whether spacing density should reach the grid gutter at all is a product question**, and this
ruling answers only the narrower one it forces. It is reported to the user at the family's
acceptance, with the alternative stated: make the gutter tokens and the step scale both
density-scaled, which keeps the utility and its default in agreement the other way.

## Ruling: `row-gap` ships here; `gap` and `column-gap` do not

The `row` key's vocabulary includes every `.row-gap-*` selector, so that key cannot read whole
until they ship, and CL8 defers them to this unit. `gap` and `column-gap` are the same mechanism
and the same scale, but no Content/layout key requires them, so pulling them forward would move
this family's exit criterion. They stay with the utilities family, which reuses this unit's step
scale rather than declaring a second one.

## Ruling: the gutter classes ship as Bootstrap groups them, two rules per step

The record carries every `.g-*` class twice, once per gutter property. That is not an artifact of
how the inventory flattens: Bootstrap's own distribution emits two grouped rules,

```css
.g-0, .gx-0 { --bs-gutter-x: 0; }
.g-0, .gy-0 { --bs-gutter-y: 0; }
```

so the horizontal rule groups the combined class with the horizontal-only class, and the vertical
rule groups it with the vertical-only class. Emit that shape. A single rule per step carrying both
declarations would resolve identically in a browser and would still be wrong here, because the
emitted-vocabulary proof CL8 retained compares a multiset: the record carries the combined
selector twice, so a cascade carrying it once reddens.

That comparison is therefore correct as CL8 built it, and this ruling is a consequence of it rather
than an exception to it. The instrument behind this reading is `units/cl8b-shape-probe.mjs`, with
the Bootstrap distribution read at `node_modules/bootstrap/dist/css/bootstrap.css`.

The `row-gap` key's classes carry one property each and no grouping with another key's classes, so
they ship as their own rules.
