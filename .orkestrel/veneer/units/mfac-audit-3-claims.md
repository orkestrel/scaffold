# E-ID-MOTION-FACTOR audit round 3 — claims

Subject: E-ID-MOTION-FACTOR round 3 in `/home/user/veneer-mfac` (branch `unit/mfac`, rounds 1 to 3 uncommitted over
Veneer `b613ae4`), briefed by `e-id-motion-factor-brief-3.md`, whose Items the Orchestrator ruled in
`mfac-audit-2-verdict.md`. Written by `builder` on Sonnet and reported in `e-id-motion-factor-report-3.md`. Evidence:
`mfac-3.diff` (`git diff b613ae4`, rounds 1 to 3), `mfac-3-status.txt`, and `mfac-instruments/r3/` (this round's own
diff `mfac-3-delta.diff`, the plant log, and the gate logs). All paths sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a kill only when the failing case's message names
an assertion failure. Rule every claim; for claim 1, compare words, not line wrapping.

1. **The Items.** Each rewritten comment, § Factors sentence, and `@throws` text reads as Items 1 to 6 give it, each
   re-wrapped paragraph and comment changes no other word, the presence assertions sit where Item 7 places them and
   change nothing else in those cases, and `mfac-3-delta.diff` changes nothing else.
2. **The rewrites are true.** Each rewritten sentence is true of the built cascade (`dist/src/styles/index.css`) and the
   partials: the progress bar's transition reads four times the feedback token on `ease`; the label's reads the feedback
   token divided by `1.5`; no `--vn-ease-*` token resolves to `ease-in-out`; at a factor of `1` each scaled duration
   resolves to its token and ratio, which is the release's duration wherever Veneer keeps it; § Departures records each
   scaled duration that differs from the release's, and § Additions each transition the release does not write; a
   subtree that sets the factor alone keeps the root's durations; and the reader clears the scene after a drive that
   throws.
3. **The zeroed kill.** Setting the label's durations to `0s` fails the form-floating motion-factor case with an
   `AssertionError` at the presence assertion (`mfac-3-plant-zeroed.log.txt`), and the partial restores identically.
   The presence assertions in the progress, navbar, and fade cases distinguish a deleted resting transition the same
   way.
4. **Gates.** The oxfmt check, `npm run check`, `npm run lint:check`, the owned style files, the `setup:browser`
   reader proof, `npm run test:guides`, and `npm run test:policy` exit 0 in `mfac-instruments/r3/`.
