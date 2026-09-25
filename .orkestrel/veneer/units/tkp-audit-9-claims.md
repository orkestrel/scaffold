# TOKEN-PROOFS audit round 9 — claims

Subject: TOKEN-PROOFS round 10 in `/home/user/veneer-tkp` (uncommitted over Veneer `2376710`, rounds 1 to 10), briefed
by `token-proofs-brief-10.md`, whose Items the Orchestrator ruled in `tkp-audit-8-verdict.md`. Written by `builder` on
Sonnet and reported in `token-proofs-report-10.md`. Evidence: `tkp-10.diff` (`git diff 2376710`), `tkp-10-status.txt`,
and `tkp-instruments/r10/` (this round's own diff `tkp-10-delta.diff`, the gate logs, and the Orchestrator's asserted
Chromium reading `tkp-10-reach-probe.mjs` with its log and its plant). All paths sit under `/home/user/scaffold/.orkestrel/veneer/units/`. Rule every
claim; for claim 1, compare words, not line wrapping.

1. **The Items.** The stripe case's comment and the `theme` clause read as Items 1 and 2 give them, the comment wraps at
   100 columns, the re-wrapped paragraph changes no other word, and `tkp-10-delta.diff` changes nothing else.
2. **The rewrites are true.** Each of the two rewritten passages is true of CSS custom properties and of the built
   cascade in the worktree (`dist/src/styles/index.css`), for an override on the root element or on an element below
   it, with or without `data-bs-theme` on that element, as an unlayered rule or an inline declaration, and with an
   override between the root and a nested scope.
3. **Gates.** `npm run check`, `npm run lint:check`, the oxfmt check (logged with its exit), the styles build, the
   tokens file, and `npm run test:guides` exit 0 in `tkp-instruments/r10/`.
