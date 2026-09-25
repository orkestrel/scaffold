# TOKEN-PROOFS audit round 7 — claims

Subject: TOKEN-PROOFS round 8 in `/home/user/veneer-tkp` (uncommitted over Veneer `2376710`, rounds 1 to 8), briefed by
`token-proofs-brief-8.md`, whose Items the Orchestrator ruled in `tkp-audit-6-verdict.md`. Written by `builder` on
Sonnet and reported in `token-proofs-report-8.md`. Evidence: `tkp-8.diff` (`git diff 2376710`), `tkp-8-status.txt`, and
`tkp-instruments/r8/` (this round's own diff `tkp-8-delta.diff` and the gate logs), with `tkp-instruments/r7/` for
the assertion round 7 added. All paths sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a kill only when the failing case's message names
an assertion failure. Rule every claim; for claim 1, compare words, not line wrapping.

1. **The Items.** The two test comments and the § Color modes sentences read as Items 1 to 3 give them, each comment
   wraps at 100 columns, and `tkp-8-delta.diff` changes nothing else.
2. **Every stop and every repeated declaration is stated truly.** Every sentence in `guides/veneer.md`, and every
   comment and case title in `tests/src/styles/tokens.test.ts`, that states where an override stops, what a mode scope
   reaches or repeats, or what an island inherits, is true of CSS custom properties and of the built cascade, for an
   override on any element, the root included, whether or not that element carries `data-bs-theme`, whether the
   override is an unlayered rule or an inline declaration, and with an override between the root and a nested scope.
3. **Gates.** `npm run check`, `npm run lint:check`, the oxfmt check (logged with its exit), the styles build, the
   tokens file (46 passed), and `npm run test:guides` exit 0 in `tkp-instruments/r8/`.
