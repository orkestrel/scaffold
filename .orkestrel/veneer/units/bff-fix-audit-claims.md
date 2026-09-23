# B-FORMS-FLOATING, round 2 (the fix round) — audit claims

## Subject

The B-FORMS-FLOATING fix round's uncommitted writes in `/home/user/veneer-bff` (detached at `2c10329`),
written by `opus` from `/home/user/veneer-bff/tmp/units/b-forms-floating-brief-2.md` (the successor
carrying eight findings from the round-1 audit: D35's barrel order with its order case and its
validated-padding case, D34's density-scaled height and floated inset, claim 6's `--bs-secondary-bg`
override, the bounded autofill sentence, the autofill comment and case, the section's prose, the
§ Compatibility row, and the ROADMAP patch) over the round-1 writes ruled in
`/home/user/scaffold/.orkestrel/veneer/units/bff-audit-verdict.md`, in the same worktree as the
B-FORMS-FLOOR writes (D32, confirmed in round 1 and unchanged since). Rounds so far: round 1
(analyst FAIL 2, 3, 6, 7, 10; reviewer FAIL 1, 2, 4, 6, 10 with F1 to F3 and R1 to R6; checker
nothing broken), this fix round. **Review evidence.**
`/home/user/scaffold/.orkestrel/veneer/units/bff-2.diff` (the whole diff against `2c10329`, the new
owned files rendered through `git add -N`), `bff-2-status.txt`, the report
`/home/user/scaffold/.orkestrel/veneer/units/b-forms-floating-report-2.md` (its § Carried findings
table names every site this round changed), the round-1 diff
`/home/user/scaffold/.orkestrel/veneer/units/bff.diff` with `bff-status.txt` (for the delta this round
added), the round-1 report `b-forms-floating-report.md`, the plant instrument
`bff-2-plant.py` with its driver `bff-2-run-plant.sh`, and the frames under
`/home/user/veneer-bff/tmp/capture/states/` (the `form-floating-*` files, rewritten by this round's
capture runs between 04:02 and 04:09 UTC on 2026-09-23, so no round-1 frame survives for a pixel
comparison).

## What the round decides

Whether the eight carried findings are closed so that B-FORMS-FLOATING (with FLOOR) lands on Veneer
`main` after GROUP with the Orchestrator's integration edits (the Set literal key `form-floating` in
`tests/setupServer.test.ts`; the `### Validation classes` patch; the barrel's forms block completed in
the release's order over the partials the session branch then holds, `form-check`, `form-range`,
`form-floating`, `input-group`, `validation`; the ROADMAP rows), and whether the writer's recorded
decisions stand: the order case reads the release's `scss/_forms.scss` import list and pins it to a
literal (mapping `floating-labels` to `form-floating` and leaving `labels` and `form-text`, which have
no `components/` partial, to the subsequence filter); the validated pair is mounted inline in the case
rather than added to `FORM_FLOATING_MARKUP`; the backdrop plant was the release's compiled value
`#e9ecef` in place of the binding; the § Compatibility row drops the clause listing the floated label,
the textarea backdrop, and the disabled and plaintext labels so the row fits the table's width, on
the ground that the § Files row and the section carry that list.

## Already established — do not re-run

Verified by the Orchestrator directly: the round-1 verdicts and their reconciliation; D32, D34, and
D35 as recorded in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`; the barrel at
`2c10329` loads `validation` before `form-range` and `form-floating`, and this tree's forms block
reads `form-range`, `form-floating`, `validation` (`grep -n "components/form\|components/validation"
src/styles/index.scss` returns lines 60 to 62 in that order); `npm run test:setup` is red only on the
shipped-key Set literal, which the integration adds `'form-floating'` to; `npm run test:conformance`
is red only on the standing presence reading (`.input-group > .form-floating`), which waits on the
GROUP landing the integration merges over; the sandbox is read-only with no browser: rule a
browser-only reading by naming its settling command; `npm run check`, `npx sass`, and the Node readers
are allowed.

## Unknowns

- Whether the delta between `bff.diff` and `bff-2.diff` introduced a defect outside the carried
  findings: read the delta for claims 1 to 8 and the whole diff for claim 9.
- Whether the resolved lengths at factor 1 are unchanged by D34: the proof reads 58px, 26px, and 16px,
  and no round-1 frame survives; rule from the resolved readings and name the pixel comparison the
  landing's regenerated portfolio settles.
- Whether the order case holds on the integrated barrel: the sibling partials are absent from this
  worktree, so rule NOT-EVIDENCED for the integrated order and name the reading (the case itself,
  run on the session branch after the merge).

## The threshold

A finding is worth more than a clean pass: this round lands the `form-floating` baseline and the
barrel order every later forms partial follows. `CONFIRMED` requires naming the attack that failed; a
claim about a proof is ruled on the mutation named and whether the assertions distinguish it. Rule
every claim CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **D35's barrel order and its order case.** `src/styles/index.scss` loads `validation` directly
   after `form-floating`; the case "loads the forms partials the barrel carries in the release
   order, validation last" in `tests/conformance.test.ts` reads the installed release's
   `scss/_forms.scss` import list, pins it to the release order, reads the barrel's `@use
   'components/…'` lines, and asserts the forms partials present load as a subsequence of that
   order; under the plant (the `validation` line moved back to directly after `vr`) the case
   reddens, and under the negative control (a non-forms partial moved after `validation`) it stays
   green. Rule from the assertions whether they distinguish the reversal, and rule the writer's
   decision to read the release list from `node_modules` and pin it to a literal.
2. **D35's validated-padding case.** "keeps the validation icon room at the end of a floating control
   marked valid or invalid" mounts a floating `.form-control.is-invalid` and its `.is-valid` twin and
   asserts `padding-right` resolves the validation icon's room (`calc(1.5em + 0.75rem)` at the
   control's font size) while the other insets stay the floating container's; under the barrel
   plant it reddens (the floating shorthand's end inset wins). Rule whether the resolved value the
   assertion expects is the one `_validation.scss` declares and whether the assertion distinguishes
   the shorthand's value from it.
3. **D34's partial and density case.** `height` and `min-height` read `calc(var(--vn-space-8) * 3.5 +
   calc(var(--bs-border-width) * 2))` and the floated `padding-top` reads `calc(var(--vn-space-8) *
   1.625)` on every rule that carries it (the focus and filled group, both autofill rules, the select
   rule); the density case reads the release's lengths at factor 1 and, at `--vn-factor-density: 2`,
   every inset doubled, the height and minimum height at the `3.5rem` term doubled plus two borders,
   and a content box at or above zero for the empty, filled, and select controls; under the height
   plant (`calc(3.5rem + calc(var(--bs-border-width) * 2))`) only the density case reddens. Rule
   whether the factor-2 assertions distinguish the literal height from the scaled one and whether
   the content-box assertion can fail at all.
4. **D34's ledger rows and case table.** The `#### form-floating` ledger in `guides/veneer.md`
   carries the rows the gate printed (the height and minimum height rows for `.form-control`,
   `.form-control-plaintext`, and `.form-select` as `tokenized`, replacing the `declared` rows; a
   `tokenized` `padding-top` row for each floated rule, each directly before its selector's
   `padding-bottom` row); `FORM_FLOATING_CASES` in `tests/setupStyles.ts` reads `--vn-space-8` on
   the select row, the focus and filled rows, and both autofill rows; the ledger cases are green.
5. **The `--bs-secondary-bg` override.** The Bootstrap-globals case's override table carries
   `--bs-secondary-bg`, and the case asserts the disabled textarea label's `::after` paints the
   override; under the plant (`var(--bs-secondary-bg)` → `#e9ecef` on that rule) the rendered case
   and the `reads` guard redden and the resting disabled case stays green. Rule whether the
   rendered assertion distinguishes the override from the release's compiled value.
6. **The autofill prose and case.** The guide sentence, the `FORM_FLOATING_CASES` TSDoc, and the
   proof comment each read "The installed browser exports offer no way to put a control into the
   autofilled state, so …"; the partial's autofill comment and the proof's comment state the
   measured rewrite once and identically (a grouped list naming `:-webkit-autofill` is rewritten by
   the build into `:-webkit-any(…)` and `:is(…:autofill)`, so each autofill selector keeps a rule of
   its own); the case is titled "holds each autofill rule to the release's declarations, one selector
   per rule" and expects `calc(var(--vn-space-8) * 1.625)`. Compile the partial and rule the comment
   against the emitted selectors.
7. **The section's prose and the § Compatibility row.** In § Form floating classes: "Veneer does not
   ship yet" replaces "this tree"; the opening sentence's nested serial list is split; "the
   browser's autofill" replaces "an autofill"; the limits sentence names
   `tests/src/styles/components/form-floating.test.ts`; the input-group sentence states that the
   input-group partial emits the input-group rules for a floating child and that the ledger
   attributes a selector naming both classes to this key; the barrel sentence states D35's order and
   its consequence; the § Compatibility `form-floating` row carries "resolved geometry, paint, and
   motion, and the autofill and class-qualified disabled declarations, are proved in
   `tests/src/styles/components/form-floating.test.ts`"; the report's `### Validation classes`
   patch applies to the tree's text. Rule the writer's width decision on the row, and rule every
   changed sentence under `writing.md` (a noun after each code token, no banned term, no count).
8. **The ROADMAP rows.** The report's § `ROADMAP.md` patch gives each row one carrier:
   B-FORMS-CONTROL for the recaptures of the empty, filled, textarea, disabled, plaintext, and
   empty-focus scenarios and the guide's bare-controls sentence; B-FORMS-SELECT for the
   `form-floating-select` recapture, the select line-height row's `toBe('normal')` assertion with
   its comment, and the guide sentence on the select line height; no floor row and no D34 row; a
   B-PASSIVE-CLOSE row for the `MOTION` literal repeated across the range, select, pagination,
   progress, icon-link, and spinner proofs. Rule the rows' content; the Orchestrator applies them to
   the session branch's `ROADMAP.md` at integration.
9. **The law holds and scope is honest.** Across the whole diff: no `any`, `as` (other than `as
   const`), `!`, or suppression; no nested function beyond a callback passed or returned directly;
   frozen tables; no helper whose job an installed `@orkestrel/test` export does; no literal colour
   outside `_tokens.scss` (every plant reverted, the backdrop rule reads `var(--bs-secondary-bg)`);
   no guide line past 100 columns; the status is the round-1 file set (FLOATING's writes and FLOOR's
   `tests/setupServer.ts` and `tests/setupServer.test.ts`) with the four new owned files rendered
   through `git add -N`; `tmp/probe/` is absent; the off-limits files are untouched.
10. **Gates.** `npm run check`, `build:src`, the scoped browser run, `test:guides`, `test:src:styles`,
    `test:policy`, the four `CAPTURE=1` runs, and `test:journey` exit 0; `test:setup` is red only on
    the Set literal; `test:conformance` is red only on the standing presence reading. UNRESOLVED
    until the Orchestrator's independent chain at the landing; run `npm run check` yourself.
