# E-ID-MOTION-FACTOR audit round 2 — claims

Subject: E-ID-MOTION-FACTOR round 2 in `/home/user/veneer-mfac` (branch `unit/mfac`, rounds 1 and 2 uncommitted over
Veneer `b613ae4`), briefed by `e-id-motion-factor-brief-2.md`, the successor the round-1 verdict
(`mfac-audit-verdict.md`) opened. Written by `opus` on Opus 5.5 and reported in `e-id-motion-factor-report-2.md`.
Evidence: `mfac-2.diff` (`git diff b613ae4`, rounds 1 and 2), `mfac-2-status.txt`, and `mfac-instruments/r2/` (the
drivers, the probes, the plant scripts, and every log), with `mfac-instruments/` for round 1. All paths sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a kill only when the failing case's message names
an assertion failure. Rule every claim.

1. **Every factor read stays in the tokens.** No partial under `src/styles/` except `_tokens.scss` reads
   `--vn-factor-motion`. The floating label writes `calc(var(--vn-motion-feedback) / 1.5)` and the progress bar
   `calc(var(--vn-motion-feedback) * 4)`, each on the release's easing, and each resolves at a factor of `1` to the
   release's duration within the rounding the report measures (`mfac-2-probe-calc.log.txt`).
2. **The subtree cases.** The form-floating and progress cases that set the factor to `2` on a wrapper alone read the
   running transition at the root's resting duration, compared with `toBe`; each read red on round 1's form
   (`mfac-2-red-final.log.txt`), and the `label` and `bar` plants fail each with an `AssertionError` and restore
   identically.
3. **The rounding tolerance.** The label's `closeTo` assertions at 6 digits distinguish a doubled or a zeroed duration
   and a duration off by a whole millisecond from the passing case, and they hide nothing the subtree case or the
   declared-duration assertion would otherwise catch.
4. **The sweep reader.** `sweepMotionFactor` in `tests/setupBrowser.ts` sets the factor inline on the document element
   to `1`, `2`, and `0`, runs the drive at each, restores the element's own value and priority (or removes the factor)
   and clears the scene after each drive, including one that throws, and returns the readings in that order. Its name
   and signature satisfy `.claude/rules/names.md`, and its proof in `tests/setupBrowser.test.ts` distinguishes a reader
   that skips the restore (`mfac-2-plant-restore.log.txt`).
5. **The routed cases.** Every motion-factor case round 1 added, and the `fade.test.ts` case the report names, runs
   through the reader, and no routed case's assertions changed except the label's rounding tolerance. The `fade.test.ts`
   case the report left unrouted would change what it asserts if routed.
6. **§ Factors.** The rewritten paragraph is true of every transition the built cascade at this tree writes: its
   exception list names exactly the timings that keep a release literal, and its equality and doubling statements hold
   for each scaled transition.
7. **F2 and the prose.** The accordion comment reads once, the nav and pagination sentences state the easing fact one
   way, and every sentence round 2 wrote in the partial comments and the guide is true of the built cascade and reads
   once.
8. **The ledger rows.** The form-floating and progress rows' Veneer cells equal what `npm run test:conformance` prints,
   and the `tokenized` member is true of each under the § Departures legend.
9. **Scope and gates.** The status names only owned files, the shared files carry only the reader, its import, its
   proof, and its export-list entry, and every gate in `mfac-instruments/r2/` exits 0.
