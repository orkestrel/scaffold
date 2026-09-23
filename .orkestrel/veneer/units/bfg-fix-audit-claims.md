# B-FORMS-GROUP, round 2 (the fix round) — audit claims

## Subject

The B-FORMS-GROUP fix round's uncommitted writes in `/home/user/veneer-bfg` (detached at `2c10329`),
written by `opus` from `/home/user/veneer-bfg/tmp/units/b-forms-group-brief-3.md` (the successor
carrying eight findings from the round-1 audit: claim 3's per-property token binding, claim 8's
`@each` and the inline matrices, D33's padding idiom, claim 6's tooltip sentence, D29's focus
scenario, D31's rounding TSDoc, and the report corrections) over the round-1 writes ruled in
`/home/user/scaffold/.orkestrel/veneer/units/bfg-audit-verdict.md`. Rounds so far: round 1 (analyst
FAIL 3, 4, 5, 6, 8, 10; reviewer FAIL 1, 6, 8, 10; checker nothing broken), this fix round. Review
evidence: `.orkestrel/veneer/units/bfg-3.diff` (the whole diff against `2c10329`, the new
owned files rendered through `git add -N`), `bfg-3-status.txt`, the round-1 diff
`.orkestrel/veneer/units/bfg-1.diff` for the delta this round added, the report
`.orkestrel/veneer/units/bfg-3-report.md`, and the frames under
`/home/user/veneer-bfg/tmp/capture/states/` (`input-group-button-focus--<variant>.png` and the
resting `input-group-button--<variant>.png`); the writer's plant, crop, and pixel scripts sit under
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfg/`.

## What the round decides

Whether the eight carried findings are closed so that B-FORMS-GROUP lands on Veneer `main` with the
Orchestrator's integration edits (the Set literal keys `input-group`, `invalid-feedback`,
`invalid-tooltip`, `valid-feedback`, `valid-tooltip`; the `validation.test.ts` `'5'` patch; the
`INPUT_GROUP_SPECIMENS` remarks patch in `app/browser/constants.ts`; the ROADMAP patch), and
whether the writer's four recorded decisions stand: `$sizes` as a list of tuples (the `$engines`
form) rather than a map; the sized-select padding rule kept as one grouped rule after the loop so
the release's rule order and the byte-identical compile hold; the tooltip "below the group"
wording; the journey's overlap reading using the button's own border width.

## Already established — do not re-run

Verified by the Orchestrator directly: the round-1 verdicts and their reconciliation; the partial
carries one `@each` (`grep -n '@each' src/styles/components/_input-group.scss` returns one line);
`space-24` no longer appears in the partial, the case table, or the guide; `tests/setup.ts`
registers `input-group-button-focus` over `Input group button`; `tmp/capture/states/` holds no
`input-group-plain-focus` file; the paint-order fact behind D29 (the addon is static, the grouped
button positioned at `z-index: 2`); the sandbox is read-only with no browser: rule a browser-only
reading by naming its settling command; `npm run check`, `npx sass`, and the Node readers are
allowed.

## Unknowns

- Whether the delta between `bfg-1.diff` and `bfg-3.diff` introduced a defect outside the carried
  findings: read the delta for claims 1 to 9 and the whole diff for claim 9's law sweep.
- Whether the N2 per-property restructuring still binds every token the round-1 table bound (no
  reference dropped in the move): compare the two tables' reference sets.
- Whether the D29 frame reading (the button's leading border column reads the button's border at
  rest and the ring under focus, at `light-1280`) holds at the other three variants: the writer
  viewed one; rule NOT-EVIDENCED for the three unviewed and name the reading.

## The threshold

A finding is worth more than a clean pass: this round lands the `input-group` baseline and the
four feedback keys. `CONFIRMED` requires naming the attack that failed; a claim about a proof is
ruled on the mutation named and whether the assertions distinguish it. Rule every claim CONFIRMED,
BROKEN, UNRESOLVED, or NOT-EVIDENCED with `file:line`.

## Claims

1. **Claim 3 is repaired.** `INPUT_GROUP_CASES` names, per property, the token references that
   property's declaration must carry, and the N2 case reads each property's declaration against
   its own references; under the plant `padding: 0; --audit-unused: var(--vn-space-3) var(--vn-space-6)`
   on the addon the N2 case reddens at its per-property check (and A1 and A2 in the browser), while
   the old selector-level reading stays green (the writer's reproduction); the count assertion
   stays green because the plant changes no rule count (the writer corrected the brief's
   expectation). Rule from the assertion and the table.
2. **D30 lands byte-identical.** The `-lg` and `-sm` blocks are one `@each` over `$sizes`, a list
   of tuples in the `_form-range.scss` `$engines` form, `lg` before `sm`; the sized-select
   `padding-right` rule stays one grouped rule after the loop; the writer's `cmp` before and after
   the `@each` change alone exits 0 and the `sm`-first control exits 1. Compile it yourself
   (reconstruct the round-1 partial from `bfg-1.diff`) and rule whether the tuple form and the
   grouped rule are the correct reading of D30's "one `@each` over a two-entry map" (the
   Orchestrator accepts the tuple form where a map's `@each` would bind only key and value).
3. **The inline matrices moved.** `INPUT_GROUP_SIZE_CASES` and `INPUT_GROUP_FLOATING_CASES` are
   frozen tables in `tests/setupStyles.ts` with their export-literal and freeze rows in the N3
   block of `tests/setupStyles.test.ts`, imported by `input-group.test.ts`, with every row the
   inline matrices carried.
4. **D33 lands.** The sized select's `padding-right` reads `calc(var(--vn-space-6) * 4)`; the two
   ledger rows read that value and stay `tokenized`; the N2 references follow.
5. **The tooltip sentence is true.** The guide sentence and the partial's comment at the overlap rule
   distinguish feedback elements wrapping onto their own line from a tooltip positioned absolutely
   below the group (`position: absolute; top: 100%`, the group being its positioned ancestor),
   taking no part in the wrap. Rule against `_validation.scss`'s tooltip rules.
6. **D29 lands.** `INPUT_GROUP_KEYS` carries `input-group-button-focus` over `Input group button`
   with remarks stating that the lift puts the focused control's ring over the grouped button at
   `z-index: 2` and that the static addon already sits under the control at rest; the journey case
   reaches that specimen's control through the keyboard, photographs the page frame, reads
   `z-index` `'5'` after the shot, and uses the button's own border width for the overlap reading
   (the writer's decision; rule whether the reading is what the app's geometry needs: the control's
   trailing border 2px, the button's pull-back 1px); the guide's focus sentence states the same
   claim; the `light-1280` frame's leading-border column of the button reads the button's border
   at rest and the ring under focus (the writer's pixel reading); the four `input-group-button-focus`
   frames exist and no `input-group-plain-focus` frame remains.
7. **D31's TSDoc.** The `INPUT_GROUP_ROUNDING` remarks are present tense and narrate no landing order.
8. **The report corrections and patches.** The successor report attributes the sibling exclusion
   selector to `input-group` with the `collectSelectorClasses` reason; the "reaches the feedback"
   plant row names the `:not(.invalid-tooltip)` plant; the later-partial observation names the
   `.btn-group > .btn:focus` override as the release's own; the ROADMAP patch names B-FORMS-CLOSE
   (the tooltip specimens as resting element frames over a wrapper keeping the overflow room),
   B-FORMS-CONTROL (retiring `INPUT_GROUP_ROUNDING` and the consumer-radius sentence), and a
   B-PASSIVE-CLOSE row for the size pairs in `_button.scss`, `_pagination.scss`, `_placeholder.scss`;
   the patches section carries the Set literal keys, the `validation.test.ts` `'5'` patch, and the
   `INPUT_GROUP_SPECIMENS` remarks patch. Rule each patch applies to its target text in the tree.
9. **The law holds and scope is honest.** Across the whole diff: no `any`, `as` (other than `as
   const`), `!`, or suppression; no nested function beyond a callback passed or returned directly;
   frozen tables; no helper whose job an installed `@orkestrel/test` export does; no literal colour
   outside `_tokens.scss`; the status is the round-1 file set (two new owned files untracked, two
   rendered through `git add -N`); `tmp/probe/` is absent; the off-limits files are untouched.
10. **Gates.** `npm run check`, `build:src`, `test:conformance` (17), the scoped browser run (19),
    `test:app` (55), `test:guides` (18), the four `CAPTURE=1` runs (33 each), and `test:journey`
    (132) exit 0; `test:setup` is red only on the Set literal; `test:src:styles` red only on the
    `validation.test.ts` case the `'5'` patch closes. UNRESOLVED until the Orchestrator's independent
    chain at the landing; run `npm run check` yourself.
