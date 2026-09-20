# Unit U7a — successor brief 4: the physical-axis guard admits a symmetric shorthand

## What changed and why

This brief supersedes `u7a-brief-3.md`; that brief stands (with briefs 2 and 1 it
carries) except for the guard ruling and the scope grant below, and `u7a-report-3.md`
(the stop) is the baseline. The unit stopped because the styles build merges the Elements
partial's `border-block: 0; border-inline: 0` into `border: 0`, the CSSOM expands that shorthand
into `border-left-*` and `border-right-*` longhands, and the guard case
`tests/src/styles/index.test.ts:28` (`declares no physical inline-axis property anywhere in the
shipped cascade`) refuses every physical longhand it meets through `matchesDirectionSensitive`.
The guard over-reaches: a shorthand that sets both sides of the inline axis to one value carries
no direction, and no authored form of "no border" survives the optimizer without expanding to
those longhands. The brief's omission was the Orchestrator's; the guard's over-reach is a
finding of this unit, closed here.

Ruling: a physical inline-axis longhand is admitted when the same rule declares its opposite-side
twin (`left` ↔ `right` in the property name) with an identical value — the symmetric expansion of
a shorthand; an unpaired or unequal one stays refused. Write `border: 0` (and the `.btn` family's
`border: 1px solid …`) plainly in the partials; the built output is what ships, and the guard
reads it.

## Role, engine, law, context, host, controls, unknowns, output, deviation contract

As in `u7a-brief-3.md`, verbatim, with these additions.

**The tree.** `HEAD` is `2bc922d`. The working tree carries your own brief-3 work, uncommitted
and reviewed in `u7a-report-3.md`: `src/core/constants.ts`, `src/styles/_mixins.scss`,
`src/styles/_theme.scss`, `src/styles/_tokens.scss`, `src/styles/index.scss`, and the untracked
`src/styles/elements/_button.scss`. Continue from it; do not restore or reset anything.

**Forced colours.** The installed `MediaOptions` (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts:1621`)
stages `print` and `motion` only. Ship the `forced-colors` fallbacks through the mixin and record
the forced-colours reading as an open row in the report and in the guide's § Compatibility
sentence for Button (a Test-side bound: `MediaOptions` gains a forced-colours axis in a later
Test unit); no browser proof of forced colours is claimed.

**Control.** `PLANT-ASYMMETRIC`: declare `border-left-width: 1px` alone in a partial; the guard
case must red naming it; restore. The three inherited controls stand.

## Scope

As in brief 3, with these grants: `tests/setupStyles.ts` for one new exported helper beside
`matchesDirectionSensitive` (and its doc block) alone; `tests/setupStyles.test.ts` for that
helper's cases alone; `tests/src/styles/index.test.ts` for the physical-axis guard case alone.
Everything else in those files, and every other line of the previous Off-limits row, stands.

## Execution

As in brief 3, with this item first:

0. **The guard.** In `tests/setupStyles.ts`, add `filterAsymmetricDeclarations(declarations)`,
   which takes one rule's declarations as `readonly (readonly [string, string])[]` and returns
   the direction-sensitive members after dropping each physical longhand whose opposite-side
   twin appears in the same rule with an identical value (compare the values through
   `normalizeValueToken`); a longhand with no twin, or with a twin of a different value, stays.
   Case it in `tests/setupStyles.test.ts`: a symmetric `border` expansion admitted; a lone
   `margin-left` refused; a `padding-left`/`padding-right` pair with different values refused;
   the non-longhand families still delegated to `matchesDirectionSensitive`. Rewrite the guard
   case in `tests/src/styles/index.test.ts` to read each `CSSStyleRule`'s declarations through
   the helper and assert the flattened result empty. Run the guard case red on the current
   tree (it fails today on the Elements partial), then green after the helper lands.

Then items 1 to 9 of the previous brief as they stand, with `border: 0` written plainly.

## Acceptance criteria and review evidence

As in brief 3, with: the guard case passes over the shipped cascade with both partials loaded,
and `PLANT-ASYMMETRIC` reddened and is restored; the status reading admits the three granted
files. Write the report to `u7a-report-4.md`.
