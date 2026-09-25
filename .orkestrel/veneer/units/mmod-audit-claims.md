# E-ID-MOTION-MODAL audit — claims

Subject: E-ID-MOTION-MODAL in `/home/user/veneer-mmod` (branch `unit/mmod`, uncommitted over Veneer `73326c7`), briefed
by `e-id-motion-modal-brief.md`. Written by `opus` on Opus 5.5 and reported in `e-id-motion-modal-report.md`. Evidence:
`mmod.diff` (`git diff 73326c7`), `mmod-status.txt`, and `mmod-instruments/` (the proof, plant, and gate drivers and
every log). All paths sit under `/home/user/scaffold/.orkestrel/veneer/units/`. The design verdict that binds is
`/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` (its Modal dialog and Modal host fade rows,
§ Proof, and unit 4), and the engine decision is E32 in `/home/user/scaffold/.orkestrel/veneer/engine/decisions.md`. A
mutation counts as a kill only when the failing case's message names an assertion failure. Rule every claim.

1. **The dialog motion.** A dialog inside a modal carrying the `fade` class renders `scale(0.96)`, and the `show` class
   moves it to `none` over the resolved `--vn-motion-panel` token (`250ms` at a motion factor of `1`) on the
   `--vn-ease-panel` curve. The `modal-static` class scales a shown dialog to `1.02` on the same transition. Under the
   reduced-motion preference no transition runs on the dialog.
2. **The host fade.** The `.modal` rule's opacity transition wins over the `.fade` rule's on a modal carrying `fade`
   only because both sit in the `components` layer at one specificity and the styles barrel loads the modal partial
   after the fade partial. A modal without the `fade` class starts no transition. The host case would fail if that load
   order were reversed. The transition on `.modal` changes the motion of no element other than the modal host.
3. **The backdrop fade.** The `overlay-backdrop` mixin writes the panel-timed opacity transition on `&.fade`, so the
   built cascade carries it on both `.modal-backdrop.fade` and `.offcanvas-backdrop.fade`. Each compound outranks the
   `.fade` rule. A backdrop without the `fade` class takes no transition. Each backdrop moves from `0` to `0.5` and
   paints no `backdrop-filter`. The offcanvas panel's own transition is unchanged.
4. **The proofs.** Each case the report lists under Failing-first drives the class write an engine makes and reads the
   running transition through `sampleTransition`. Each failed on the base cascade (`mmod-red.log.txt`) and passes after
   (`mmod-green.log.txt`). Each factor case asserts the ratio of the doubled duration to the base duration, never a
   literal product. The `afterEach` hooks restore the motion factor. The `translate` and `backdrop-feedback` plants each
   fail with an `AssertionError` and restore the file identically. For each case, name the mutation that would make it
   fail, and say whether its assertions distinguish that mutation from the passing case.
5. **The ledger rows.** The two § Departures rows and the six § Additions rows equal what `npm run test:conformance`
   prints against the built cascade (`mmod-conformance-first.log.txt`, then `mmod-conformance.log.txt`). The § Additions
   preamble requires the host and backdrop transitions to be additions, because the release's selector writes no
   `transition` there. Rule whether each row's category cell is true of the value it records, and say which rows
   LEDGER-RETUNE's `retuned` member would reclassify.
6. **Engine and showcase.** No proof under `tests/src/browser` or `tests/app` pins a value this change moves (the
   report's Searches). The `Modal`, `Backdrop`, and `Offcanvas` engine proofs and `npm run test:app` pass on the changed
   cascade (`mmod-engine.log.txt`, `mmod-app.log.txt`), as E32 requires.
7. **The guide prose.** The § Modal classes dialog and backdrop paragraphs, its departure bullet, its additions
   sentence, its proof enumeration, and the § Offcanvas classes sentences state the rendered motion truly and read once.
   The offcanvas paragraph under `## Engine` (around line 2599 of the worktree's `guides/veneer.md`) is true after the
   change.
8. **The design verdict.** The change delivers the design verdict's Modal dialog and Modal host fade rows and unit 4: the
   scale, the timing, the easing, the backdrop's `0` to `0.5` fade with no blur, and one mixin for both backdrops.
9. **The § Factors patch.** The report's patch strikes exactly `modal dialog` from the exception list of the § Factors
   paragraph E-ID-MOTION-FACTOR adds, and after this change the modal dialog's duration reads the motion factor.
10. **Scope and gates.** The status names only owned files. The oxfmt check, `npm run check`, `npm run lint:check`,
    `npm run test:conformance`, `npm run test:guides`, `npm run test:policy`, `npm run build:src`, the engine proofs, and
    `npm run test:app` exit 0 in `mmod-instruments/`.
