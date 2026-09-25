# STATES audit round 2 — claims

Subject: STATES round 2 in `/home/user/veneer-sts` (branch `unit/sts`, uncommitted over Veneer `2376710`), briefed by
`states-brief-2.md` to carry claims 3, 5, and 7 and findings F1, F2, and F3 of `sts-audit-verdict.md`, and scoped by
D52 in `decisions-round-2.md`. Written by `opus` on Opus 5.5 and reported in `states-report-2.md`. Round 1's confirmed
claims are not re-ruled. Evidence: `sts-2.diff` (`git diff 2376710` after round 2), `sts-2-status.txt`, `sts.diff`
(round 1), and `sts-instruments/r2/`. All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. A unit report's
prose is not a claim subject. A mutation counts as a kill only when the failing case's message names an assertion
failure. Rule every claim.

1. **The declaration readings are back (claim 3).** The case `runs the thumb fill transition with motion allowed and
   lands each fill at once under reduced motion` in `tests/src/styles/components/form-range.test.ts` asserts
   `transition-property: none` and `transition-duration: 0s` on the gated thumb rule beside its rendered readings. The
   `twin-other` plant (`sts-instruments/r2/sts-2-plant-twin-other.log.txt`) keeps a reduced-motion transition on
   `box-shadow`, passes every rendered reading, and fails the case with an `AssertionError` at the
   `transition-property` reading.
2. **The moving frame is the frame asserted on (claim 5).** The case uses `retryUntil`, each try takes one screenshot
   and measures it, the predicate accepts only a frame that differs at every centre pixel from both the frame taken as
   the press began and the held fill, and the assertion reads the accepted frame's own measurements. No second
   screenshot is taken after the predicate accepts, so a transition that finishes between tries cannot make the
   asserted frame equal the held fill.
3. **No listed animation (F1).** While the hold lasts, after the moving frame, the case asserts
   `document.getAnimations()` equals `[]`, and the guide's statement about Chromium listing no animation for the thumb
   rests on that assertion.
4. **The gauge sentence is gone (F2).** § Form range classes in `guides/veneer.md` no longer carries the sentence about
   the gauge's rounding, and the Disabled bullet ends at "fills that gauge's thumb with `--bs-secondary-color`."
5. **One centre helper (F3 and claim 7).** `readCentre(subject, size, frame?)` in `tests/setupBrowser.ts` returns a
   square of `size` device pixels centred on the subject's box, in the frame's coordinates, and is built on
   `readRegion` with the same meaning of `frame`. Its proof in `tests/setupBrowser.test.ts` places a subject off the
   frame's centre and asserts the subject's square reads the subject's paint while a control square at the frame's
   centre does not, so a helper returning the frame's centre or the subject's origin fails it. The export-list case
   names `readCentre`. Every form-range site that read a box-centred region now calls it, and no copy of the
   calculation remains in `tests/src/styles/`.
6. **The integration read is a different calculation (D52).** The centre read in `tests/app/browser/integration.test.ts`
   reads the middle pixel of a decoded element screenshot on an unstaged pane, takes no box, and holds at the runner's
   fitting scale, per `sts-instruments/r2/sts-2-probe-unstaged-scale.log.txt`; `readCentre` cannot serve it without a
   staged pane, so leaving it inline repeats no calculation `readCentre` owns.
7. **The guide's transition bullet is true.** § Form range classes says the gated rule declares
   `transition-property: none`, a `0s` duration, and nothing else, and the built cascade's gated thumb rule declares
   exactly that.
8. **Gates.** `npm run check`, `npm run lint:check`, the scoped oxfmt check, the styles run over the form-range and
   button files, the `setup:browser` project, `npm run test:guides`, and `npm run test:policy` exit 0 in
   `sts-instruments/r2/`.
9. **Scope and law.** `sts-2-status.txt` names only `guides/veneer.md`, `tests/setupBrowser.ts`,
   `tests/setupBrowser.test.ts`, `tests/src/styles/components/button.test.ts`, and
   `tests/src/styles/components/form-range.test.ts`; `src/**` is unchanged. The round adds no `any`, prohibited
   assertion, non-null assertion, suppression, nested function declaration, hidden helper, mock, fake, or fake clock;
   `readCentre` carries TSDoc in the module's voice; each case title states what the case proves.
