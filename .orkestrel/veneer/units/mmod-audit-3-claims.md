# E-ID-MOTION-MODAL audit round 3 — claims

Subject: E-ID-MOTION-MODAL round 3 in `/home/user/veneer-mmod` (branch `unit/mmod`, rounds 1 to 3 uncommitted over
Veneer `73326c7`), briefed by `e-id-motion-modal-brief-3.md`, whose Items the Orchestrator ruled in
`mmod-audit-2-verdict.md`. Written by `builder` on Sonnet and reported in `e-id-motion-modal-report-3.md`. Evidence:
`mmod-3.diff` (`git diff 73326c7`, rounds 1 to 3), `mmod-3-status.txt`, and `mmod-instruments/r3/` (this round's own
diff `mmod-3-delta.diff` and the gate logs). All paths sit under `/home/user/scaffold/.orkestrel/veneer/units/`. Rule
every claim; for claim 1, compare words, not line wrapping.

1. **The Items.** The guide sentence, the `.modal` comment, the modal backdrop's Reason cell, the entrance case's
   comment, and the mixin comment read as Items 1 to 5 give them, each re-wrapped paragraph or comment changes no other
   word, the table re-pad changes no other cell, and `mmod-3-delta.diff` changes nothing else.
2. **The rewrites are true.** Each rewritten sentence is true of the built cascade (`dist/src/styles/index.css`) and the
   partials: a modal without the `fade` class keeps its opacity as the `show` class joins and leaves, so the `.modal`
   rule's transition runs as an engine shows or hides no such modal; each backdrop fades over `--vn-motion-panel` on
   `--vn-ease-out`; the specimen resolves the panel duration and curve without reading the dialog's rule; and the
   backdrop's `.fade` compound outranks the shared `.fade` rule.
3. **Gates.** `npm run check`, `npm run lint:check`, the oxfmt check, the styles build, the modal, offcanvas, and mixins
   style files, `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0 in
   `mmod-instruments/r3/`.
