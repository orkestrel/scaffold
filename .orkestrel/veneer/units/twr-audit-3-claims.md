# TAILWIND-RECIPE audit round 3 — claims

Subject: TAILWIND-RECIPE round 3 in `/home/user/veneer-twr` (uncommitted over Veneer `21c821a`, rounds 1 to 3), briefed
by `tailwind-recipe-brief-3.md`, whose Items the Orchestrator ruled in `twr-audit-2-verdict.md`. Written by `builder` on
Sonnet and reported in `tailwind-recipe-report-3.md`. Evidence: `twr-3.diff` (`git diff 21c821a` plus the untracked
fixtures), `twr-3-status.txt`, the round-2 diff `twr-2.diff`, and `twr-instruments/r3/`. All paths sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a kill only when the failing case's message names
an assertion failure. Rule every claim; compare words, not line wrapping.

1. **The consumer's scan is stated truly.** Every sentence of `guides/veneer.md` § Tailwind that says what a consumer's
   build scans or generates is true of the installed `@tailwindcss/postcss` plugin compiling each recipe as shipped,
   with its default base; and every sentence that says what the workspace's compile scans is true of `compileProfile`.
   No sentence of the section says the `@source` rule alone bounds a consumer's scan.
2. **The Items read as ruled.** Items 1 to 6 read as the brief gives them, and the section differs from round 2 only at
   those sites.
3. **The renames and moves.** `consumer.test.ts` names the consumer's `preflight` recipe `consumerPreflightSource` and
   `consumerPreflightProfile` at every use; `LAYER_ORDER`, `CONTROL_VARIABLES`, `EXECUTED_SOURCE`, and `SHIPPED_SOURCE`
   are exported from `tests/setupService.ts`, frozen where they are arrays, carry TSDoc, and appear in the export-list
   case; no Tailwind test file declares them; and the § Files row for `tests/setupService.ts` names them.
4. **The helper's proof.** The case `reports every moved longhand of one reading, in the reading's property order` fails
   with an `AssertionError` when the helper stops after the first moved longhand of a reading
   (`twr-3-plant-first-only.log.txt`), and the restore is byte-identical.
5. **Scope and gates.** Between `twr-2.diff` and `twr-3.diff`, only the Items' sites change; the oxfmt check,
   `npm run check`, `npm run lint:check`, the setup files (151 passed), `npm run build:src`, `npm run test:service` (24
   passed), `npm run test:guides`, and `npm run test:policy` exit 0 in `twr-instruments/r3/`.
