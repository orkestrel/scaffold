# E-ID-MOTION-FACTOR audit round 4 — claims

Subject: E-ID-MOTION-FACTOR round 4 in `/home/user/veneer-mfac` (rounds 1 to 4 uncommitted over Veneer `b613ae4`),
briefed by `e-id-motion-factor-brief-4.md`, whose Item the Orchestrator ruled in `mfac-audit-3-verdict.md`. Written by
`builder` on Sonnet and reported in `e-id-motion-factor-report-4.md`. Evidence: `mfac-4.diff`, `mfac-4-status.txt`, and
`mfac-instruments/r4/` (this round's own diff `mfac-4-delta.diff` and the gate logs). All paths sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. Rule every claim; compare words, not line wrapping.

1. **The Item.** `mfac-4-delta.diff` strikes exactly the clause ", and § Additions records each transition the release
   does not write" and re-wraps the § Factors paragraph at 100 columns, changing no other word, and the paragraph that
   remains is true of the built cascade (`dist/src/styles/index.css`) and the partials.
2. **Gates.** The oxfmt check, `npm run test:guides`, and `npm run test:policy` exit 0 in `mfac-instruments/r4/`.
