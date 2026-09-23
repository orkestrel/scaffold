# B-FORMS-CLOSE-FORCED (`bff`) — audit claims

## Subject

The B-FORMS-CLOSE-FORCED writes in `/home/user/veneer-bff` (a worktree detached at `ccb10a7`,
the session branch after B-FORMS-CLOSE-TABLES landed), written by `opus` on Opus 5.5 from
`/home/user/veneer-bff/tmp/units/bff-brief.md` (retained as
`/home/user/scaffold/.orkestrel/veneer/units/b-forms-close-forced-brief.md`) under the close
verdict `/home/user/scaffold/.orkestrel/veneer/b-forms-close-design-verdict.md` (R2, R3, R3a,
R3b, R8, R11, R12) and D37: a `forced-ring` mixin extracted from `focus-ring`'s forced branch and
included by the forms `:focus` rules with the button compile byte-identical, the validated colour
width bound to `--vn-space-24`, the forced-colours proofs under `stageMedia({ forced: true })`,
`mixins.test.ts` on the installed axis, and the guide's width cells, Additions rows, forms
sentences, `focus-ring` paragraph, plaintext limit, and § Compatibility sentence. One round so
far: this one. **Review evidence.** `/home/user/scaffold/.orkestrel/veneer/units/bff.diff` (the
whole diff against `ccb10a7`; the guide's § Additions table is realigned by the formatter, so read
that file's hunks by cell text), `bff-status.txt`, the brief `b-forms-close-forced-brief.md`, the
report `b-forms-close-forced-report.md` (its width readings, mutation table, and compile
comparison), the button compile log `bff-button-compile.log.txt`, and the retained probes
`bff-probe-*` (the compile comparisons, the delta, the mutation script and its log). The gate
readings in the report are the writer's; the Orchestrator's landing chain settles the gates.

## What the round decides

Whether B-FORMS-CLOSE-FORCED lands on the session branch as one commit after the
B-FORMS-CLOSE-SPECIMENS landing, with the D37, colour-width, and plaintext carrier rows closed at
the fold.

## Already established — do not re-run

The close design verdict's rulings (R3 fixes the forced branch, not the whole mixin; R3a excludes
plaintext on evidence; R2 fixes the binding and the literal icon room); the standing ruling that a
CSS token is its own noun; the objective lane's sandbox runs no Vitest project and no browser
(`npm run check`, `node -e`, and `npx --no-install sass` that write nothing are allowed; an
in-memory Sass compile of the worktree's `src/styles/index.scss` is the objective lane's own
compile comparison); the Orchestrator's landing chain settles the gates.

## Unknowns

- Whether the second-media-block mutation (the button's reset emitted in a second media block)
  needs a committed proof rather than the retained expanded-compile probe: the shipped bytes cannot
  distinguish it (the minifier merges the blocks); the lanes rule whether the probe suffices as
  acceptance evidence or a test is owed, and name its carrier.
- Whether the forced-reading sequence repeated inline in the five proof files is a near-duplicate
  helper under `tests.md` (its only shared home is `tests/setupStyles.ts`, report-only for this
  unit): the lanes rule and name a carrier.

## The threshold

`CONFIRMED` requires naming the attack that failed; a claim about a proof names the mutation and
says whether the assertions distinguish it. Rule every claim CONFIRMED, BROKEN, UNRESOLVED, or
NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **The delta is the brief.** The diff against `ccb10a7` touches only `src/styles/_mixins.scss`,
   the five forms partials, their five proofs, `tests/src/styles/mixins.test.ts`, and
   `guides/veneer.md`; the status lists those and nothing else; `tests/setupStyles.ts`,
   `tests/setupServer.ts`, `tests/conformance.test.ts`, `tests/setup.ts`, `app/**`, the passive
   partials, and `tests/fixtures/**` are unchanged.
2. **The mixin and the byte-identical button.** `_mixins.scss` declares
   `forced-ring($width: var(--vn-focus-width), $highlight: var(--vn-focus-highlight))` emitting
   `@include forced-colors { outline: $width solid $highlight; @content; }`, and `focus-ring`
   includes it with `box-shadow: $reset` as content; every `.btn*` and `button` block of the
   compiled cascade is byte-identical to the baseline (the objective lane compiles the worktree's
   source and an in-memory copy with the pre-change mixin and compares the button blocks; the
   report's shipped and expanded comparisons are the writer's). Mutation: the reset emitted in a
   second media block is caught by the expanded comparison and not by the shipped bytes.
3. **The forms rules.** `.form-control:focus`, `.form-select:focus`, `.form-check-input:focus`, and
   `.form-range:focus` keep the release's `outline: 0` and shadow and add `@include forced-ring;`;
   `.form-control-plaintext:focus` is unchanged; no shadow reset is authored on the forms rules;
   the whole compile delta against the baseline is the four forced-colours outline blocks and the
   two width rules.
4. **The width binding.** `_validation.scss` writes
   `width: calc(var(--vn-space-24) + calc(1.5em + 0.75rem))` for the four validated colour
   selectors; the proof reads the validated width minus the resting width equal at density 1, at
   density 2, and under a direct `--vn-space-24` override (the report: 36px in each), on the class
   and the scoped native-validity forms; the existing `81` expectations stay with comments naming
   the token. Mutation: the `3rem` literal reverts the density-2 difference (the report: −12
   against 36).
5. **The forced-colours proofs.** Each control proof has a case, named for what it proves, that
   drives keyboard focus, reads `outline-style` `none`, stages `stageMedia({ forced: true })`,
   reads `solid` and an `outline-width` equal to the resolved `--vn-focus-width`, releases, and
   reads `none` again; the range case reads the host; `validation.test.ts` reads the same on a
   focused `.form-control.is-invalid` (R3b). Mutations: removing one `@include forced-ring`
   reddens that control's case; hoisting the outline out of the media block reddens the resting
   reading; `outline: 0` on a validated `:focus` rule reddens the validated case. The lanes say
   whether each assertion distinguishes its mutation.
6. **`mixins.test.ts` on the installed axis.** Its forced case stages through
   `stageMedia({ forced: true })` and `releaseMedia()`, the "no forced-colors axis" explanation
   and the `sendProtocol` import are gone, and the case still reads the treatment only while the
   engine reports forced colours.
7. **The guide.** The four width cells read `calc(var(--vn-space-24) + 1.5em + 0.75rem)` with
   departure `tokenized`; the width bullet and the § Form control classes sentence state that the
   resting and validated widths retune together; the `focus-ring` paragraph names `forced-ring`
   and its four forms callers; each forms key's section carries a forced-colours sentence; § Additions
   carries four `declaration` rows under `@media (forced-colors: active)` (`form-control`,
   `form-select`, `form-check`, `form-range`, `outline`) in the `btn` rows' voice; the plaintext
   limit is stated (R3a); § Compatibility's forced-colours sentence states the installed axis, the
   forms proofs' reading, and the button's own reading as B-PASSIVE-CLOSE-B's; every changed
   sentence follows `writing.md` (no count, no banned term, a code token followed by a noun with a
   CSS token its own noun, one idea per sentence); the realigned § Additions rows keep their cell
   text.
8. **Law and scope.** Across the diff: no `any`, `as` (other than `as const`), `!`, or suppression;
   no nested function beyond a callback passed directly; no helper whose job an installed
   `@orkestrel/test` export does (`stageMedia`, `releaseMedia`, `readStyle`, `readPixels`,
   `driveTraversal` or `traverseAccessible` are used, not rewritten); the off-limits files
   untouched; the styles follow `styles.md` (the mixin's parameters, the layer, no repeated
   per-variant block). Run `npm run check` from the worktree and report its exit code as evidence
   here (the objective lane).
