# B-SWEEP — design verdict (the shared declaration-block sweep)

Reconciled 2026-09-22 by the Orchestrator from the blind design round on
`units/b-sweep-design-brief.md`: `planner` on Opus (`units/b-sweep-design-planner-proposal.md`) and
`analyst` on GPT-6 Astra (`units/b-sweep-design-analyst-proposal.md`, thread
`01a0cb30-754c-7850-8465-ea8ca99d11bf`), over the measurements B-PASSIVE-E, B-PASSIVE-B,
B-PASSIVE-D, and B-FORMS-RANGE returned.

## Rulings (D15)

1. **A block two partials share because each records an external value is a coincidence, not a
   pattern.** Both copies stay inline. The test is the planner's: a pattern is one decision several
   callers share, so divergence is a defect; a coincidence is two decisions that agree, so divergence
   is correct and the ledger records it. Family ruling 1 pins every recorded declaration, so the
   copies cannot co-vary. `flush-box`, `painted-block`, `column-flow`, `clip-line`, and `wrap-line`
   are refused as superfluous wrappers (the analyst kept `column-flow` as a composition; the planner's
   divergence test and the inline-idiom reading win). `list-reset` (`padding-left: 0; list-style:
   none`) is accepted: it is Bootstrap's own `list-unstyled` mixin, one decision the release applies
   to `.list-unstyled`, `.list-inline`, `.pagination`, and the navigation and breadcrumb lists to
   come, so B-PASSIVE-D's Patch B lands with D.
2. **The predicate lives beside the measurement, never inside it.** `scanStyleBlocks` keeps
   reporting every intersection of at least two identical declarations, so its tokenizer proofs and
   its documented contract stand. A new exported pure leaf `findDuplicates(shared)` in
   `tests/setupServer.ts` selects the offending subset (the `findDrift` precedent), and the styles
   gate asserts `findDuplicates(sweep.shared)` is empty under a title naming what it proves
   (`repeats no partial's written declaration block in another partial`).
3. **The predicate** over `shared`, `left`, and `right` (distinct written declarations, custom
   properties included, includes unexpanded):
   `(shared >= 2 && shared * 2 > Math.min(left, right)) || shared >= 6`. The first arm is the
   analyst's (a whole copy of a two-declaration rule is still reported, which the scanner's existing
   fixtures test); the second is the planner's absolute arm (an overlap too large for coincidence
   inside large blocks). Against the measured pairs: button/placeholder (2, 41, 6), check
   input/progress bar (2, 7, 8), placeholder/vr (3, 6, 6), progress bar/figure (2, 8, 4),
   range/legend (2, 5, 6), toolbar/row (2, 10, 3 or larger), pagination/list (2 of 3 and 2 — the
   list rule is the whole copy, reported, and it lands as `list-reset`): every coincidence is
   refused and the list pair is reported, which is the ruling in 1.
4. **The plant** is a `describe('findDuplicates')` block in `tests/setupServer.test.ts` over real
   scratch trees (`createScratch`, the scanner's own idiom): a copied two-declaration block (2, 2, 2)
   reported with both paths and lines; the tie (3, 6, 6) refused beside its positive twin (3, 5, 6)
   reported; (2, 5, 6) refused; (6, 14, 14) reported by the absolute arm; and the measurement unmoved
   (`scanStyleBlocks(scratch).shared` still lists every intersection). Each refusal carries its
   positive twin so a function returning nothing cannot pass.
5. **The rule lands in the rule file.** `.claude/rules/styles.md` gains one line beside "If a
   pattern appears in at least two partials": a block two partials share because each records an
   external value is a coincidence, and both copies stay inline. That edit is scaffold's (a vendored
   byte; the bump propagates with P1 SCAFFOLD-PROPAGATE).
6. **The record.** The `shared >= 6` arm's number rests on the measured maximum coincidence of 3 on
   2026-09-22; the function's `@remarks` names that reading and its date. The family's close
   (B-FORMS-CLOSE) re-runs the sweep and records the coincidence set.

## Units and routing

| Unit | Role and engine | Owned | Depends on |
| --- | --- | --- | --- |
| B-SWEEP | `opus` on Opus (served Opus 5), worktree `veneer-bsw` from `aca0423` | `tests/setupServer.ts` (`findDuplicates`, the `@example` and `@remarks`), `tests/setupServer.test.ts` (the plant, the inventory), `tests/setupStyles.test.ts` (the gate case) | none; lands before every family unit |
| B-FORMS-RANGE-3 | `builder` on Sonnet, worktree `veneer-bfr` | `src/styles/_mixins.scss`, `src/styles/elements/_fieldset.scss`, `src/styles/components/_form-range.scss` (the exact reverse of the fix round's D2) | none |

Audit: B-SWEEP by `analyst` on Astra and `reviewer` on Opus over a staged claims file.

## Amendment (2026-09-22, after B-PASSIVE-C returned)

C measured a further pair, `.card-img-overlay` and `.ratio > *` sharing `position: absolute`,
`top: 0`, `left: 0` (3 of 7 and 5 declarations), which the first arm above reports while the
divergence test rules it a coincidence. The predicate is amended to the planner's form:
`(shared >= 4 && shared * 2 > Math.min(left, right)) || shared >= 6`. Every measured pair across A,
B, C, D, E, and RANGE is refused by it; a whole copy of a two- or three-declaration rule is admitted
and recorded as such in the function's `@remarks`. `list-reset` is refused with the rest: under
family ruling 1 no author changes either copy, so the divergence test refuses it like every other
recorded pair, and the styles rule's coincidence line reads the same way. The plant's cases move
accordingly: a copied four-declaration block reported; the tie of three shared between six and six
refused beside a twin with four shared reported; a two-of-two whole copy refused as the recorded
boundary; a six-shared pair inside twelve and fourteen reported by the absolute arm beside a
five-shared twin refused; the measurement unmoved.

The exported name is `findDuplication`. `findDuplicates` collides with `@orkestrel/reason`'s hosted
surface under the policy gate (B-SWEEP deviation 1, 2026-09-22), and the Orchestrator accepted the
rename; every `findDuplicates` in this record reads as `findDuplication`.
