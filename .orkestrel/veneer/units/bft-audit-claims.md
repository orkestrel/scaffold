# B-FORMS-CLOSE-TABLES (`bft`) — audit claims

## Subject

The B-FORMS-CLOSE-TABLES writes in `/home/user/veneer-bft` (a worktree detached at `d02bd46`,
Veneer `main`), written by `opus` on Opus 5.5 from
`/home/user/veneer-bft/tmp/units/bft-brief.md` (retained as
`/home/user/scaffold/.orkestrel/veneer/units/b-forms-close-tables-brief.md`) under the close
verdict `/home/user/scaffold/.orkestrel/veneer/b-forms-close-design-verdict.md` (R4, R7, R9, R11,
R12) and D31: the `INPUT_GROUP_ROUNDING` fixture retired, `FORM_RANGE_CASES` reshaped to a
property-keyed `reads` map under `FormRangeCase`, one exported `collectDeclarationReads` helper
routing the text-control, input-group, and range Node cases, the retained literal-declaration probe
and its in-memory conformance case. One round so far: this one. **Review evidence.**
`/home/user/scaffold/.orkestrel/veneer/units/bft.diff` (the whole diff against `d02bd46`),
`bft-status.txt`, the brief `b-forms-close-tables-brief.md`, the report
`b-forms-close-tables-report.md`, the probe `bft-literal-probe.sh` and its log
`bft-literal-probe.log.txt`. The gate readings in the report are the writer's; the Orchestrator's
landing chain settles the gates, and a lane runs only the scoped command it can run.

## What the round decides

Whether B-FORMS-CLOSE-TABLES lands on the session branch as one commit after `e0c901a` (fold 34;
the worktree's base `d02bd46` differs from it only in `ROADMAP.md`), with the returned
§ Input group classes paragraph landed as the Orchestrator's integration edit, and the D31,
`FORM_RANGE_CASES`, and literal-declaration carrier rows closed at the fold.

## Already established — do not re-run

The close design verdict's rulings; the CONTROL rounds' rulings on the `FORM_CONTROL_CASES` shape
and remark voice; the sandbox for the objective lane is read-only with no browser and runs no
Vitest project (`npm run check` and `node -e` that write nothing are allowed); the Orchestrator's
landing chain settles the gates.

## Unknowns

- Whether the R9 exclusion (a compiled block under a condition the inventory records for no rule
  of the range key stays out of the written-key equality) is exercised by any block at `d02bd46`.
  The writer reports it is not, and rests it on a deleted runtime probe; the lanes rule on the
  code and name what would exercise it.
- Whether the browser range reading's shorthand `getPropertyValue` calls (`transition`,
  `border-radius`) hold on a Chromium that serializes a `var()` shorthand differently; the lanes
  rule on the reading's shape, not on another browser.

## The threshold

`CONFIRMED` requires naming the attack that failed; a claim about a proof names the mutation the
proof must distinguish and says whether its assertions distinguish it. Rule every claim
CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **The delta is the brief.** The diff against `d02bd46` touches only the owned files the brief
   names (`tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupServer.ts`,
   `tests/setupServer.test.ts`, `tests/conformance.test.ts`,
   `tests/src/styles/components/input-group.test.ts`,
   `tests/src/styles/components/form-range.test.ts`); the status lists those and nothing else;
   `src/**`, `guides/**`, `app/**`, `tests/setup.ts`, `tests/app/**`, and `tests/fixtures/**` are
   unchanged; a search for `INPUT_GROUP_ROUNDING` over `src`, `tests`, `guides`, and `app` returns
   nothing.
2. **The rounding retirement is complete and the corner proofs read the shipped radius.** The
   fixture, its doc block, its import, its exports-case entry, its freeze expectations, and its
   `scene.load` calls are gone; the freeze case's title drops "and the rounding rule"; each corner
   case in `input-group.test.ts` holds a kept corner to the radius the same element carries outside
   a group (the resolved `--bs-border-radius`, positive) and a squared corner to `0`; the "until the
   control family lands" sentence is gone. Mutation: removing `border-radius` from the
   `input-border` mixin makes a kept-corner assertion read `0` (the lanes say whether the
   assertions distinguish it, given the writer's finding that the fixture was inert).
3. **`FormRangeCase` and the per-property range comparison.** `tests/setupStyles.ts` declares
   `FormRangeCase` (`selector`, `engine`, `condition`, `reads` keyed by property, readonly) with
   TSDoc in the `FormControlCase` voice; `FORM_RANGE_CASES` is `readonly FormRangeCase[]`, frozen
   to every map and list, with each reduced-motion twin its own row under its condition; the Node
   case compares per property with `toEqual` on the map and keeps the exact equality of written
   keys against the inventory's keyed rules. Mutation: swapping the names between the thumb row's
   `width` and `margin-top` entries reddens the Node case (the old joined-string `includes` passed
   it).
4. **R9 is implemented as ruled.** A compiled block under a condition the inventory records for no
   rule of the range key is excluded from the written-key equality (conditions compared through
   the same normalization the additions reader applies), with a comment saying the additions
   ledger holds such a block; a block under a condition the inventory does record for the key
   stays in the equality. `form-range.test.ts` reads the map shape on resting rows.
5. **One extraction.** `tests/setupServer.ts` exports `collectDeclarationReads(blocks)` returning,
   keyed by selector and condition the way the Node cases key, each property's custom-property
   reads in written order, routed through the existing `collectValueNames`; its proof in
   `tests/setupServer.test.ts` covers a property reading several names in order, a property
   reading none (absent), a reduced-motion twin keyed apart, and a later literal replacing an
   earlier token; the text-control, input-group, and range Node cases route through it and no
   inline `matchAll(/var\(` extraction remains in those cases (the `FORM_FLOATING_CASES` case keeps
   its own by the brief). The helper is not a superfluous wrapper and duplicates no installed
   `@orkestrel/test` or `@orkestrel/contract` export.
6. **The literal-declaration reading is pinned.** `tests/conformance.test.ts` gains a case that
   appends one unrecorded literal on `.form-control` inside the components layer to an in-memory
   copy of the real expanded cascade, runs `collectLedger` and `scanLedgerDrift` with the real
   inventory, shipped keys, and guide additions, and asserts `unrecorded` equals exactly
   `['form-control | .form-control { letter-spacing } | — | declaration']` while the unmodified
   cascade reports `[]`; the reader is unchanged; the retained probe's log shows the same line red
   on disk with `test:setup` and the form-control browser proof green, and the hash restored.
   Mutation: a reader that stops reporting declaration additions reddens the case.
7. **The remark sentence.** The `FORM_CONTROL_CASES` remark gains one sentence stating that a
   declaration the row neither values nor reads falls outside both maps and that the conformance
   case `records every emitted name the official inventory lacks` reports it as a `declaration`
   addition; the range remark states the property-keyed claim in the `FORM_CONTROL_CASES` remark's
   words with its own clause for a table holding no values; every changed comment and TSDoc
   follows `writing.md` (no count, no banned term, a code token followed by a noun).
8. **The returned guide paragraph.** The § Input group classes paragraph the report returns
   (from "The text control and select classes each write…" through "…the floating rows render no
   label.") is true of the tree the unit finishes in (the mixin, the corner proof's assertions, the
   floating wrapper's rules in `_input-group.scss` and `_form-floating.scss`) and follows
   `writing.md`.
9. **Law and scope.** Across the diff: no `any`, `as` (other than `as const`), `!`, or suppression;
   no nested function beyond a callback passed directly; interface properties readonly; the
   off-limits files untouched. Run `npm run check` from the worktree and report its exit code as
   evidence here (the objective lane).
