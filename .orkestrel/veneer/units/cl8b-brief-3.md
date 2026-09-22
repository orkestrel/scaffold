# Unit CL8b brief 3 — the fix round the audit forced

## What changed and why

Briefs 1 and 2 stand. This brief carries the findings round 1 forced and nothing else. The audit's
full reasoning is `.orkestrel/veneer/cl8b-audit-verdict.md`; each finding below names the lane that
found it.

**Round 1 accepted your implementation.** Three lanes reconciled the built cascade against the
record, the record against the installed distribution, and the emitted grouping against both, and
agreed. The `row` key closes, the tuple correction is right in both directions, the step scale is
density-free and resolves to the same length as the default it overrides at any factor, and the
gates are green on both engines under an independent verifier. Nothing in this brief reopens any of
that.

## Finding 1 — the density proof cannot fail (both lanes, forcing)

**What the subjective lane proved.** Your density case sets the density factor on the mounted
wrapper. The step scale is declared at `:root`, where its `var()` references resolve before
inheritance, so a factor set on a subtree cannot move a root-declared token's computed value. The
assertion therefore passes whether or not the scale carries the factor.

**The tree already proves that mechanism.** A case in `tests/src/styles/tokens.test.ts` is named for
exactly this distinction — a subtree that re-declares the scale beside the factor rescales, and one
that sets the factor alone holds — and it sets the factor on `document.documentElement` with a
restore afterwards. Read that case before writing.

**The objective lane found the same hole from the other end** and its remedy is the second half of
this fix: the case has no positive control that the retune took effect at all. Every reading in it
is gap-derived, so if the factor stopped reaching the specimen the independence would hold vacuously
and the case would still pass.

Fix both halves:

- Set the factor where a `:root`-declared token can see it, and restore it afterwards so the mutation
  cannot leak into another case.
- Add a positive control inside the same case: one reading of a **density-derived** length that
  changes when the factor changes. Without it the case proves nothing about the factor having
  arrived.
- Prove the corrected case can fail. Make the step scale depend on the density factor, record the
  case reddening, restore the exact bytes, and record it green, with a digest showing the file
  restored. **That control is the point of this finding**: the case as written would pass under that
  mutation, which is why it is being replaced.

**The shipped scale is correct and does not change.** Three lanes confirmed it carries no density
factor. What fails is the proof of that property.

## Finding 2 — the ramp preamble is now in two partials (objective lane)

`src/styles/utilities/_gap.scss` and `src/styles/components/_grid.scss` now open their loops with the
same five lines: the ramp traversal, the empty infix at the zero boundary, and the upward mixin. The
styles rule requires a pattern appearing in at least two partials to move to the mixins file; before
your unit it had one caller, so the companion rule kept it inline. Your unit is what crosses that
threshold.

**The grant this needs is given below**, because the repair reaches a partial brief 1 put off-limits.
The shared-block sweep cannot see this duplication — that instrument reads declaration blocks, not
Sass control flow — so nothing else will catch it.

Extract it to `src/styles/_mixins.scss` as a mixin that yields the infix to its content, and call it
from both partials. **The emitted cascade of both partials must not change**: build before and after
and compare the emitted rules for the grid keys and the gap keys, and report the comparison with the
method that produced it. If anything moves, stop and report rather than adjusting a partial to match.

## Finding 3 — the sweep's folder guard omits the folder you created (objective lane)

`tests/setupStyles.test.ts` guards that the sweep discovered an `elements` and a `components` leaf
before asserting it found nothing shared. That guard exists so the assertion cannot pass by
discovering nothing. Your unit created a `utilities` folder that the guard does not name. Add it.

## Finding 4 — the important priority has no assertion behind it (objective lane)

Nothing in the suite pins the important priority on your row-gap rules. The record stores no
importance, the presence scan compares names only, and your browser proof cannot see it because the
utilities layer already beats the components layer, so dropping the priority changes no reading you
take. It is the one obligation this unit shipped with no assertion behind it.

Failure scenario the lane named: the priority is removed in a later edit, every gate stays green, and
a consumer's own unlayered rule — which arrives after the whole cascade — silently beats the utility
where Bootstrap's does not.

Add a case that loads a competing unlayered rule against the utility and asserts the utility still
wins. Read `tests/setupBrowser.ts` for the mechanism that loads a sheet into a specimen, and follow
it rather than inventing one. Prove the case fails with the priority removed, and restore.

## Finding 5 — the showcase step list is bound to nothing (objective lane)

`app/browser/constants.ts` hard-codes the step list for the gutter-steps specimen, and its proof
repeats the same literal. The registry already carries the step set and is reachable from app code.
Derive both from the registry so a step added to the scale cannot leave the showcase demonstrating a
stale subset with nothing reddening.

## Unknowns

- **Whether the extracted ramp mixin can yield its infix** in the form both partials need, given how
  the tree's existing mixins pass content. Read them and follow what they do; if the mechanism the
  tree uses cannot carry the infix, stop and report rather than inventing a second mechanism.
- **Whether the competing-rule case for the priority can be written with the loader the browser setup
  already exposes.** If it cannot, report that rather than reaching for a new mechanism.

## Scope

Briefs 1 and 2's owned set, plus, for these findings and nothing else:

- **`src/styles/_mixins.scss`** — for the extracted ramp mixin.
- **`src/styles/components/_grid.scss`** — to call that mixin in place of its own copy of the
  preamble. Change nothing else in that partial and change nothing it emits.

Everything else in briefs 1 and 2's off-limits list stays off-limits, including
`tests/setupConformance.ts` and `tests/src/styles/components/container.test.ts`.

Do not touch the gap partial's rules, the step scale, the guide rows, the deferral deletions, the
conformance listing, or the tuple. Round 1 accepted them.

## Execution

You are the engine reading this brief inside your own CLI. Perform the assignment directly and spawn
nothing. The working tree carries your own authored CL8b work; it is your output, not drift. HEAD is
the CL8 landing `d2c5bb3`. Briefs 1 and 2's host facts still hold.

## Output

1. The corrected density case, quoted, with its positive control, and the red-then-green proof that
   it now catches a density-carrying scale.
2. The extracted mixin, its callers, and the before-and-after comparison of both partials' emitted
   rules with the method that produced it.
3. The folder-guard change, the priority case with its control, and the showcase derivation.
4. Both Unknowns, with what you found.
5. The full gate chain's exit codes and final result lines, on managed Chromium and on Edge.
6. `git diff --stat` and `git status --porcelain --untracked-files=all`, actual output.

No process diary.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle within your own scope: the mixin's name and
its content mechanism, where the new cases sit among their siblings, and how the showcase derives its
list. Stop and report if the extraction changes what either partial emits, if the priority case
cannot be written with the existing loader, or if a gate fails for a reason outside your owned files.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. `npm run build` exits 0, and both partials' emitted rules are unchanged by the extraction, shown
   by a before-and-after comparison rather than asserted.
4. The density case reddens when the step scale is made to carry the density factor, shown with its
   command and output, and its positive control reddens if the factor stops reaching the specimen.
5. The priority case reddens when the priority is removed.
6. `npm run test:setup` exits 0, including the widened folder guard.
7. `npm test` exits 0 whole.
8. The styles, browser-setup, and app-browser projects exit 0 on Edge.
9. The status lists only files the three briefs own.
