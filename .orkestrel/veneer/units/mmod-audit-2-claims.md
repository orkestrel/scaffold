# E-ID-MOTION-MODAL audit round 2 — claims

Subject: E-ID-MOTION-MODAL round 2 in `/home/user/veneer-mmod` (branch `unit/mmod`, rounds 1 and 2 uncommitted over
Veneer `73326c7`), briefed by `e-id-motion-modal-brief-2.md`, the successor the round-1 verdict (`mmod-audit-verdict.md`)
opened. Written by `opus` on Opus 5.5 and reported in `e-id-motion-modal-report-2.md`. Evidence: `mmod-2.diff`
(`git diff 73326c7`, rounds 1 and 2), `mmod-2-status.txt`, and `mmod-instruments/r2/` (this round's own diff
`mmod-2-delta.diff`, the plant and gate drivers, and every log), with `mmod-instruments/` for round 1. All paths sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a kill only when the failing case's message names
an assertion failure. Rule every claim.

1. **The prose (claim 7 and R1).** Each rewritten sentence in § Modal classes, the offcanvas backdrop's Reason cell in
   § Additions, and the `overlay-backdrop` and `.modal` comments is true of the built cascade and reads once: the
   offcanvas backdrop takes the motion because it includes the mixin; no forward reference names the host before the
   host is introduced; "factor" keeps one sense; the specificity tie and the load order are stated as two facts; the
   no-`fade` sentence states the engine's case; and each timing is named by its tokens rather than by a caller.
2. **The wraps.** The re-wrapped paragraphs, including the offcanvas paragraph under `## Engine`, change no word, and
   the `## Engine` hunk against round 1 changes only its wrap.
3. **The offcanvas backdrop case (F2 and F3).** The title states what the case asserts, a reading with no transition
   carries `undefined` in the duration, easing, and midpoint slots, the settled opacity and the filters are asserted
   apart from the transition's values, and the case still fails on each mutation round 1's shape caught
   (the `backdrop-feedback` plant).
4. **The kills (R2 and R3).** Deleting the dialog's transition fails the entrance, bounce, and factor cases with an
   `AssertionError`, deleting the static-bounce rule fails the selector and bounce cases with an `AssertionError`, and
   the before rows show those deletions threw a plain `Error` against round 1's test file. The `translate` and
   `backdrop-feedback` plants ran on the final files and fail with an `AssertionError`. Every plant restores its file
   identically.
5. **Nothing else moved.** `mmod-2-delta.diff` changes no rule declaration, and every hunk in it carries an Item of the
   brief or an ancillary choice the report names.
6. **Scope and gates.** The status names only owned files, and the oxfmt check, `npm run lint:check`, `npm run check`,
   the owned style files, `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0 in
   `mmod-instruments/r2/`.
