# Design brief — the shared declaration-block sweep meets Bootstrap's own coincidences

## Role and lane

This brief reaches two blind lanes on the same text: `planner` on Opus (subjective: what the
styles rule intends, the shape a partial author meets, the mixins a reader would accept) and
`analyst` on GPT-6 Astra through `codex exec --sandbox read-only` rooted at `/home/user/veneer`
(objective: what the sweep measures, what predicate separates the cases, what the plant pins).
Say which lane you hold. Perform the design directly, spawn nothing, edit nothing. You are
read-only. Bound: rule within 15 minutes.

## Objective

Rule on how the gate `carries no shared written declaration block across style partials`
(`tests/setupStyles.test.ts` around line 365, over `scanStyleBlocks` in `tests/setupServer.ts`
around lines 568 to 654) must treat a declaration block two partials share by coincidence, now that
seven units each ship independently recorded Bootstrap components.

## Context

**The rule.** `/home/user/scaffold/.claude/rules/styles.md` lines 44 to 46: "Never repeat
per-color/per-variant blocks; drive shared structure with one `@each` over a shared list. If a
pattern appears in at least two partials, move it to `_mixins.scss`. A one-partial pattern stays
inline; do not create a mixin for one caller." `AGENTS.md` § Design laws: "No superfluous wrappers.
A wrapper must add a boundary, invariant, composition, translation, lifecycle, or materially
narrower contract."

**The sweep.** `scanStyleBlocks` reads every `_*.scss` partial's written blocks (includes not
expanded), and for every pair of blocks in two different partials reports an overlap when the
identical declarations they share number at least two (`if (declarations.length >= 2)`). The tree
at `aca0423` reports no overlap.

**The measurements.** Two returned units measured the sweep over their partials with the same walk:

- B-PASSIVE-E (`/home/user/scaffold/tmp/audit/be-report.md` § D3): four overlaps —
  `components/_button.scss:5 <-> components/_placeholder.scss:5 :: display: inline-block | vertical-align: middle`;
  `components/_button.scss:118 <-> components/_progress.scss:34 :: overflow: hidden | white-space: nowrap`;
  `components/_placeholder.scss:5 <-> components/_vr.scss:6 :: display: inline-block | min-height: 1em | background-color: currentcolor`;
  `components/_progress.scss:34 <-> elements/_figure.scss:4 :: display: flex | flex-direction: column`.
  Its measured remedy adds three mixins (`painted-block` with a `@content` slot, `column-flow`,
  `clip-line` with a slot) and reorders one caller's declarations to fit the slot. It also names the
  alternative: narrow the sweep to duplication that is a majority of at least one block.
- B-FORMS-RANGE (`/home/user/scaffold/tmp/audit/bfr-report.md` § D2): one overlap —
  `components/_form-range.scss:15 <-> elements/_fieldset.scss:9 :: width: 100%, padding: 0`; its
  measured remedy is a `flush-box` mixin carrying those two declarations.
- Every remaining B unit is expected to meet the sweep the same way (the E report: `badge` alone
  shares `display: inline-block` and `text-align: center` with `.btn`).

**Family constraint.** Every declaration is fixed by the recorded Bootstrap value (family ruling 1
in `/home/user/scaffold/.orkestrel/veneer/units/b-passive-family.md`); nothing can be dropped or
rewritten to dodge the sweep. `_mixins.scss` and every other partial are off-limits to a unit, so
each remedy is a serial patch.

**Existing mixins.** `src/styles/_mixins.scss` at `aca0423` (read it): `transition`,
`reduced-motion`, `border-reset`, and the others there, each owning a repeated pattern with a
reason.

## Questions the lanes answer

1. **What the rule intends.** Is a two-declaration coincidence between two independently recorded
   Bootstrap components "a pattern" in the sense of styles.md line 45? Argue from the rule's purpose
   and the no-superfluous-wrappers law. Rule whether `flush-box`, `painted-block`, `column-flow`,
   and `clip-line` are patterns or wrappers.
2. **The predicate.** If the sweep is recalibrated, state the exact predicate over
   (`shared`, `left.size`, `right.size`) that reports every copy-pasted block and none of the five
   measured coincidences, and show it against each measured pair. Candidates: `shared >= 3 &&
   shared * 2 > min(left, right)`; `shared >= 3 && shared * 2 > max(left, right)`; `shared >= 4`;
   others you find better. Name what each admits that the current `>= 2` catches.
3. **The plant.** State the plant `tests/setupStyles.test.ts` (or `tests/setupServer.test.ts`)
   must carry so the recalibrated sweep is proved to still see a copied block: a scratch tree under
   the system temporary directory with two partials sharing a block that meets the predicate, and
   one pair that shares a coincidence below it, with the reading each yields.
4. **The alternative.** If the sweep stays at `>= 2`, state what the family does with the five
   coincidences and the ones to come, and what the resulting `_mixins.scss` reads like after the
   family lands.
5. **Risk.** What a recalibration is likeliest to hide, and the criterion that catches it.

## Output

A proposal, not a decision: for each question the ruling you argue for and its evidence
(`file:line`), then one terminal line `PROPOSAL: <one sentence>`. No process diary.
