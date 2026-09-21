# Unit CL6 — brief 2

Succeeds `units/cl6-brief.md`, which stays in force for everything this brief does not name and
is left unedited. What changed and why: a `checker` scope read
(`units/cl6-scope-read-report.md`) checked brief 1 against the tree and returned four amendments,
one of which makes an acceptance criterion unsatisfiable as brief 1 scoped it. Read brief 1
first, then this delta.

## Correction 1 — the retune reaches the Button family, and that is correct

`src/styles/components/_button.scss:178-186` gives the link-styled button
`--bs-btn-color: var(--vn-link-base)` and `--bs-btn-hover-color: var(--vn-link-hover-base)`, and
`tests/src/styles/components/button.test.ts:232,238` asserts the resolved readings those produce
today: the unmixed primary and its twenty-percent black shade. **Binding the link tokens to the
calibration record necessarily moves those two assertions**, which brief 1's criterion 3 forbade
by scoping both files out.

**The ruling: the link-styled button follows the link colour, and the proof's two expectations
move with it.** The Orchestrator checked the foundation calibration record
(`research/calibration.md`): it carries no link rows and no reading of a link-styled button, so
those two values were never calibrated against an Elements specimen. They are derived from the
link tokens and pinned as literals in the proof. A button that styles itself as a link should
match links, so following the retune is the correct behaviour and updating the two literals is
bookkeeping, not a regression.

**The partial itself needs no edit.** It reads the tokens through `var()`, so its declarations
are already correct at any token value. Only the proof's two asserted readings change.

So: **this brief grants `tests/src/styles/components/button.test.ts` for those two assertions
alone.** Change nothing else in that file. `src/styles/components/_button.scss` stays off-limits,
and if you find yourself needing to edit it, stop and report, because that would mean the
coupling is not the one this correction describes.

## Correction 2 — what the key needs to be listed, read from the deciding function

`collectShippedComponents` (`tests/setupConformance.ts:713-733`) admits a component when its
selector rows are non-empty and all shipped, and when **either** its variable rows are non-empty
and all shipped **or** its variable rows are empty and the inventory's projected properties list
is empty. The projected list comes from the keys of the entry's properties object, and for this
key that is the two opacity properties, so the empty branch is unavailable.

**The key needs at least one variable row, shipped.** Beyond admission,
`scanCompatibilityPresence` requires every name in the projected properties list to be present in
the cascade once any variable row for that component ships, so both properties need coverage. One
row each is the shape to write, and each rests on a proof that reads the property's resolved
value rather than its presence in source.

## Correction 3 — the one ledger-derived case, named

Add the key to the `listed` array in `tests/conformance.test.ts:55-74`, in alphabetical order
between the two keys that bracket it. That array is the one ledger-derived case this key moves,
and it reads the whole compatibility table. The cases in `tests/setupConformance.test.ts` test
the deciding function against synthetic rows for other components and do not move.

## Correction 4 — the terrain map's line numbers are stale, its facts are not

CL5c landed mark tokens and a mark mixin ahead of the link block in both
`src/styles/_tokens.scss` and `src/styles/_mixins.scss`, so every later declaration shifted down
by roughly six lines. The scout report's citations into those two files now run early.
**Re-locate each declaration by its token name in the current tree rather than by the report's
line number.** Every fact the report states was re-confirmed against the tree by the scope read;
only the line numbers moved.

## What the scope read confirmed, so you need not re-derive it

- The terrain map's reading of the key is accurate, including that the role classes' hover and
  focus states carry literal channel triplets rather than a variable, and no selector family is
  missing from it.
- The anchor partial and its proof match the map verbatim, and the opacity variable is read with
  a fallback and declared nowhere under `src/styles/`.
- The link tokens, their Bootstrap aliases, and every consumer: the anchor partial, the
  link-styled button, the two Bootstrap variable tables in `tests/setupStyles.ts`, and the button
  proof. That is the blast-radius population; measuring each reading before and after is still
  yours.
- The showcase section base is `SpecimenSection`. A new section extends it and calls the base
  constructor with its own copy object and specimen table. The copy type carries a region name
  and a lead paragraph; the specimen type carries a name and markup.

## Scope, amended

Brief 1's owned set, plus `tests/src/styles/components/button.test.ts` for the two `.btn-link`
assertions the retune moves and no other declaration in it. Brief 1's off-limits list otherwise
stands, including `src/styles/components/_button.scss`.

## Acceptance criteria, amended

Brief 1's criteria stand, with criterion 3 replaced:

- The blast-radius table shows every consumer's before and after reading in both modes, including
  the link-styled button and its proof, and no consumer outside the owned set moved.

And one added:

- The link-styled button's two moved assertions are updated to the values the retune produces,
  with the reading that produced each in your report, and no other assertion in that file changes.
