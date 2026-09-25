# E-ID-BUTTON-CASCADE fix-round audit 3 — claims

Subject: E-ID-BUTTON-CASCADE round 5 in `/home/user/veneer-ebc` (branch `unit/ebc`, rounds 1 to 5 uncommitted over
Veneer `e07b3a6`), carrying the findings of `ebc-audit-2-verdict.md` (claim 2's coverage, claim 7's title clause, F1,
R1, and R2). Round 5 was briefed by `ebc-brief-5.md`, continued by `ebc-brief-6.md` and `ebc-brief-7.md` (each replaces
item 5's plant and states why), written by `builder` on Sonnet, and reported in `e-id-button-cascade-report-5.md`.
Evidence: `ebc-5-delta.diff` (round 5's change over round 4's tree, built by applying `ebc-4.diff` to `e07b3a6`),
`ebc-5.diff` (the whole change over `e07b3a6`), `ebc-5-status.txt`, `ebc-4-status.txt`, and the instruments and logs
under `ebc-instruments/r5/` (`probe/revert-5.mjs`; `logs/ebc-5-probe-revert.log.txt`,
`logs/ebc-5-probe-revert-control.log.txt`, `logs/ebc-5-mutations.log.txt`). Round 3's probe and mutation instruments
sit under `ebc-instruments/r3/`. All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. The live instruments
and per-mutation logs sit under `/home/user/veneer-ebc/tmp/units/`. The compiled cascade is
`/home/user/veneer-ebc/dist/src/styles/index.css`. A unit report's prose is not a claim subject. A mutation counts as a
kill only when the failing case's message names an assertion failure; read every other failure as no kill. Rule every
claim.

1. **Titles.** In `tests/src/styles/components/accordion.test.ts` and `tests/src/styles/components/carousel.test.ts`,
   the enumeration cases carry the titles `ebc-brief-5.md` items 1 and 2 give, verbatim, and each title is true of the
   case's assertions: each case admits the `:where()` button reset on the class's button form and rejects every other
   rule on the class.
2. **Comment.** The tag proof's holder comment in `tests/src/styles/elements/button.test.ts` is `ebc-brief-5.md` item
   3's text, wrapped by the formatter, and is true of the reading the `class` mutation produces (a button the surface
   misses reads the browser's own weight and shadow).
3. **Revert probe coverage.** `revert-5.mjs` reads every longhand `ebc-brief-5.md` item 4 lists, turns reduced motion
   on before its first reading, and otherwise reads as `revert-3.mjs` does; every difference in
   `logs/ebc-5-probe-revert.log.txt` is a value the class itself writes or one colour written in two notations, never a
   value the `button-reboot` mixin writes.
4. **Control.** The plant `ebc-brief-7.md` names (`transition: revert;` replaced by `transition: all 0s ease 1s;`)
   surfaces in `logs/ebc-5-probe-revert-control.log.txt` as a `transition-delay` difference, `1s` against the release's
   `0s`, on each class form whose partial writes no `transition` of its own, and on no form whose partial writes one;
   the restored `src/styles/_mixins.scss` equals the pre-plant file (SHA-256 `0eb94362…adc69e`), and the compiled
   `:where()` reset rules keep `transition:revert`.
5. **Kills.** In the per-mutation logs round 5 wrote and `logs/ebc-5-mutations.log.txt`, the `class`, `target`,
   `important`, `spacing`, `nav`, `state-spacing`, and `no-surface` mutations each kill at least one case with an
   `AssertionError` whose assertion distinguishes the mutation from the passing case; `important` and `spacing` each
   kill the `.btn` forms case under its shipped title; each restore is byte-identical to the live source.
6. **Scope and law.** Round 5 changes only the three test files items 1 to 3 name (`ebc-5-delta.diff`), and
   `ebc-5-status.txt` names the same paths as `ebc-4-status.txt`; the delta adds no `any`, prohibited assertion,
   non-null assertion, suppression, or nested function declaration.
