# Audit claims — FADE (`cf`), round 1

Subject: FADE's record — `cf.diff` and `cf-status.txt` (the worktree `/home/user/veneer-cf` against
`42fd88e`), the shared patch `cf-shared.patch` and the off-limits patch
`cf-instruments/cf-offlimits.patch` (each a unified diff against `42fd88e`), the report
`b-cross-cf-report.md`, and the records under `cf-instruments/` (the mutation log `cf-mutations.log.txt`
and its scripts, the `cf-red-*`, `cf-nopartial-*`, `cf-base-*`, and `cf-green-*` logs, `cf-gates.sh` and
the `cf-gate-*` logs, the ladder probe `cf-ladder.test.ts.txt` and its log, and the `cf-guide*.py`
scripts) — against the brief `b-cross-cf-brief.md`, the Orchestrator's mid-campaign note on page frames
(`pf-design-verdict.md`), and the design verdict
`/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md` (rulings X1 and X5 and § Family
record). The unit was written by `opus` on Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or
BROKEN with `file:line` evidence, and before confirming a claim about a proof names the mutation that
would make the proof fail and whether its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the
Orchestrator's apply checks (`cf-shared.patch` and `cf-offlimits.patch` each on a fresh `git archive
42fd88e` extract, `git apply --check`, exit 0) settle the apply clauses; the unit's stop on
`tests/setupServer.test.ts` is a gap in the brief's shared list, and `cf-offlimits.patch` integrates at
landing as the exact returned patch; the scratch copy was deleted before the report, so a lane rules each
gate and mutation claim from the code's assertions and the retained logs, and names which it read.

1. **Scope.** `cf-status.txt` lists the owned paths alone (`src/styles/components/_fade.scss`,
   `tests/src/styles/components/fade.test.ts`, `app/browser/sections/FadeSection.ts`, and
   `tests/app/browser/sections/FadeSection.test.ts`); `cf-shared.patch` touches only files the brief's
   Shared list names; `cf-offlimits.patch` changes one line of the dash-filter case's set.
2. **The rules (X5).** The partial writes `.fade` with `transition: opacity var(--vn-motion-feedback)
   linear` through the `transition` mixin, its `prefers-reduced-motion: reduce` twin with
   `transition: none`, and `.fade:not(.show)` with `opacity: 0`, and the barrel loads it ahead of
   `collapse`; the built stylesheet carries exactly those rules, and the order case maps the
   `transitions` stem to `fade` then `collapse`.
3. **The proofs.** Each case in `fade.test.ts` reads computed values (D45); the mutations M1 to M4 the
   brief names, and M5 to M8, each redden the cases the log names, and the assertions distinguish each
   from the passing case; the failing-first runs without the partial are retained.
4. **The region.** The `Fade` region renders `Fade shown` and `Fade hidden`, each specimen carrying the
   `fade` class with the state its label names; the hidden body carries `aria-hidden="true"` and the
   guide and TSDoc say why; the section proof reddens on S1 to S3; the two `CASCADE_KEYS` rows name
   selectors and properties whose frames are shot as element frames over a lifted specimen, and no
   placement calls the `page` method.
5. **The ledger (X1).** The `#### transition` table records the `.fade` row as the ledger gate printed
   it, and the compound selectors count under their owning keys as the ladder probe read them.
6. **Guide.** `### Fade classes`, the § Compatibility row, the § Files row, § Showcase, § Tests, and each
   rewritten sentence read true against the cascade and the engine's classes; the search the report names
   covers the guide, and each hit left unchanged is still true.
7. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; the added tables are frozen, documented, and bound in the freeze
   case; the report quotes each gate's result line from its log, states no temporal word, and follows
   every code token with its noun; the lane lists every count the report states, for the record.
