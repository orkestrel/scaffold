## Intersession state

**Marker.** Read 2026-09-25 07:25 UTC: Veneer `origin/main` `MAIN_HEAD` (this session's E-ID-MOTION-REDUCED and
E-ID-BUTTON-CLASSES landing, merged over your J-ORACLE-RECORD `63eabbd`); scaffold `origin/main` at your `cc31dc5b`.
Your `engine/plan.md` and `engine/units/note-to-styles-0725.md` are read at `cc31dc5b` (E35, J-RELEASE-CORE, and
ENGINES-B round 5 touch no styles file).

**Note to the engine session (2026-09-25 07:25 UTC; read this first).** This session is the styles session; it never
touches `src/browser/**`, `src/core/**`, `tests/src/browser/**`, or `tests/src/core/**`, and in the guide's `## Engine`
sections it writes only the one hunk named under E-ID-MOTION-MODAL.

- **E-ID-MOTION-REDUCED and E-ID-BUTTON-CLASSES are on `main`** (`0879800`, `dd5d1b1`, integration `611f381`, fold
  `fd38ef1`, merged over your `63eabbd` as `MERGE_HEAD`). The landing chain read every gate green, `src:browser` with
  no red outside the `0865c67` baseline and both journeys at 252 passed
  (`units/eid-landing/logs/eid-chain-10-summary.log.txt`); the merged tree read the whole-tree checks, `test:setup`,
  `test:conformance`, `test:src:styles`, `setup:browser`, and `app:browser` green
  (`units/eid-landing/logs/merge-gates-10.log.txt`). **Your third standing row closes here:** the `.btn` form case of
  `button.test.ts` compares the Veneer map of button-versus-anchor differences with the release's map, read in the
  same browser (`readFormDifferences` in `tests/setupBrowser.ts`), so a default that moves both cascades cancels.
  Read it on your Chromium 153 host at your next landing.
- **J-ORACLE-RECORD merged cleanly** into this session's tree; your `build` renames in `tests/setupServer.ts` and
  `tests/setupServer.test.ts` are kept as you wrote them.
- **E-ID-MOTION-MODAL is in its round 2** (`mmod-audit-verdict.md`). Round 1 moved the dialog to `scale(0.96)` over
  `--vn-motion-panel` on `--vn-ease-panel`, and the host and both backdrops to `--vn-motion-panel` on `--vn-ease-out`
  through the one `overlay-backdrop` mixin; your `Modal`, `Backdrop`, and `Offcanvas` proofs and `npm run test:app`
  read green on it. **One hunk lands in your `## Engine` Offcanvas section:** the paragraph that says "the fade
  partial fades the backdrop through its `.fade` rule" becomes "the `overlay-backdrop` mixin fades the backdrop over
  the `--vn-motion-panel` token", because this unit makes the old sentence false; the panel's `0.3s` wording is
  unchanged, and both audit lanes read the new sentence true. Merge it by hunk. Round 2 touches only its wrap there.
- **LEDGER-RETUNE is writing** from `73326c7` in `tests/setupServer.ts`, `tests/setupServer.test.ts`, and
  `tests/conformance.test.ts`; it merges your J-ORACLE-RECORD hunks at its landing (D49).
- **TOKEN-PROOFS is in round 10** (`token-proofs-brief-10.md`): the last sentences about where an override reaches
  state their conditions, each read in Chromium 141 by an asserted probe (`tkp-instruments/r10/`). No engine file
  changes.
- **TAILWIND-RECIPE is accepted** and lands with TOKEN-PROOFS next. Your J-TAILWIND-PROBE can build on
  `tests/fixtures/tailwind/preflight.css` after it lands; the recipe keeps Tailwind's automatic source detection, and
  the layer order, control variables, and source lines its proofs read move to `tests/setupService.ts`.
- **E-ID-MOTION-FACTOR round 2 is under audit** (`mfac-audit-2-claims.md`). It adds `sweepMotionFactor` to
  `tests/setupBrowser.ts` (the reader, its `TOKEN_NAMES` import, its proof, and its export-list entry only); merge it
  by hunk beside your helpers. Every factor read now stays in `src/styles/_tokens.scss`. Its Tab finding is yours in
  J-MOTION-PROOFS-B, as your note records.
- **E-ID-ANCHOR dispatches from this landing** (`e-id-anchor-brief.md`): `position-visibility: anchors-visible` on the
  promoted dropdown menu, tooltip, and popover in the open popover state, from the Chromium 141 reading you asked for.
- **Standing answers.** Each E-ID-MOTION unit on a waiting engine (collapse, offcanvas, carousel, tooltip, popover,
  toast) holds its landing until your J-MOTION-PROOFS unit for that component lands (E32); MODAL's engines are covered
  by J-MOTION-PROOFS-A. TOKEN-RETIRE records the `src/core/constants.ts` hunk here for your unit when it runs; it has
  not run. This session runs the Chromium 141 readings you ask for.

**In flight (this session), 2026-09-25 07:25 UTC.** Implementation and its audit first, the user's instruction.
- **Writing:** TOKEN-PROOFS round 10 (`builder` on Sonnet), then its check on Astra.
- **Under audit:** E-ID-MOTION-FACTOR round 2 (`analyst` on Astra and `reviewer` on Opus 5.5).
- **Accepted, waiting to land:** TAILWIND-RECIPE (`twr-audit-3-verdict.md`), with TOKEN-PROOFS.
- **Writing:** E-ID-MOTION-MODAL round 2 and LEDGER-RETUNE, each `opus` on Opus 5.5.

**Next here, in order:** one landing for TOKEN-PROOFS and TAILWIND-RECIPE; E-ID-ANCHOR from this landing; the audits of
MODAL round 2, FACTOR round 2, and LEDGER-RETUNE, then their landings, whichever of MODAL and LEDGER-RETUNE lands second
regenerating the dialog's departure rows; E-ID-MOTION-OFFCANVAS after MODAL lands; RM-RELEASE with the user's
one-time code, then P1 SCAFFOLD-PROPAGATE and the ER-LINUX receipt; the remaining motion units as your J-MOTION-PROOFS-B
and C land; IMPORTANT-EMIT after the user rules.

**Waiting on the user:** the IMPORTANT-LAYER ruling, whether Chrome is installed and on which platform (ER-CHROME), and
the one-time code for the scaffold release.

