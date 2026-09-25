# TOKEN-PROOFS audit round 8 — claims

Subject: TOKEN-PROOFS round 9 in `/home/user/veneer-tkp` (uncommitted over Veneer `2376710`, rounds 1 to 9), briefed by
`token-proofs-brief-9.md`, whose Items the Orchestrator ruled in `tkp-audit-7-verdict.md`. Written by `builder` on
Sonnet and reported in `token-proofs-report-9.md`. Evidence: `tkp-9.diff` (`git diff 2376710`), `tkp-9-status.txt`, and
`tkp-instruments/r9/` (this round's own diff `tkp-9-delta.diff`, the gate logs, and the Orchestrator's Chromium reading
`tkp-9-reach-probe.mjs` with its log). All paths sit under `/home/user/scaffold/.orkestrel/veneer/units/`. Rule every
claim; for claim 1, compare words, not line wrapping.

1. **The Items.** The stripe case's comment and the two guide sentences read as Items 1 to 3 give them, the comment
   wraps at 100 columns, each re-wrapped paragraph changes no other word, and `tkp-9-delta.diff` changes nothing else.
2. **The rewrites are true.** Each of the three rewritten sentences is true of CSS custom properties and of the built
   cascade in the worktree (`dist/src/styles/index.css`), for an override on the root element or on an element below
   it, with or without `data-bs-theme` on that element, as an unlayered rule or an inline declaration, and with an
   override between the root and a nested scope.
3. **Gates.** `npm run check`, `npm run lint:check`, the oxfmt check (logged with its exit), the styles build, the
   tokens file, and `npm run test:guides` exit 0 in `tkp-instruments/r9/`.
