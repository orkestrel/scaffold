# Audit claims — RAMP-DOWN (`rd`), round 2

Subject: round 2's record — `rd-2.diff` and `rd-2-status.txt` (the worktree `/home/user/veneer-rd`
against `42fd88e`), the unchanged shared patch `rd-shared.patch`, the report `b-modal-rd-report-2.md`,
and the round-2 records under `rd-instruments/` (`rd-mutation-2.patch`, `rd-mutation-2.log.txt`,
`rd-mutation-zero-2.patch`, `rd-mutation-zero-2.log.txt`, `rd-mixins-green-2.log.txt`,
`rd-guides-2.log.txt`, `rd-gates-2.sh`, `rd-gates-2.log.txt`, and the `rd-gate-*-2.log.txt` logs) —
against the successor brief `b-modal-rd-brief-2.md` (R-a to R-c), the round-1 verdict
`rd-audit-verdict.md` and its lane verdicts, and round 1's record (`rd.diff`, `rd-shared.patch`,
`b-modal-rd-report.md`). The unit was written by `opus` on Opus 5.5. Each claim is falsifiable; a lane
rules CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim about a proof names
the mutation that would make the proof fail and whether its assertions distinguish that mutation from
the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-1
verdict's rulings stand, and every claim it confirmed stays confirmed unless round 2 changed its
subject; the scratch copy R-c names was deleted before the report, so a lane rules the guide claim from
the retained log and names it.

1. **Scope and delta.** `rd-2-status.txt` lists round 1's owned paths and nothing else; against round 1,
   the owned files change only in `tests/src/styles/mixins.test.ts` (the ramp-down fixture case) and in
   comment lines of `src/styles/_mixins.scss` and `src/styles/components/_offcanvas.scss`; no Sass
   statement changes, and the built stylesheet stays byte-equal to `rd-base.css` (the `cmp` step in
   `rd-gates-2.sh` and its log).
2. **R-a: the direction.** The fixture case reads each named specimen's `padding-top` below, at, and
   above its boundary through the `visitBreakpoint` helper, and the unsuffixed specimen's at every
   reading; it expects the named specimen to apply below its boundary alone. The retained run with the
   `breakpoint-down` call replaced by `breakpoint-up` reddens it, and its assertions distinguish that
   mutation; the zero-branch mutation still reddens it; each boundary the case visits is a
   `BREAKPOINT_CASES` row whose width equals the entry's token.
3. **R-b: the comments.** The `breakpoint-each-down` mixin's comment limits the write-once sentence to a
   family whose unsuffixed class comes ahead of its narrowed siblings, and the offcanvas partial's
   comment gives the order reason (the release writes each responsive panel's below-boundary and
   at-and-above blocks together and the bare panel after all of them); each comment reads true against
   the compiled stylesheet and Bootstrap 5.3.8's `dist/css/bootstrap.css`.
4. **R-c: the guide gate.** `rd-guides-2.log.txt` records `npm run test:guides` exiting 0 in a copy
   with `rd-shared.patch` applied, and its header names how the copy was built.
5. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; the added async callback is passed directly as an argument; the
   report states no temporal word and no tally, quotes each gate's result line from its log, and follows
   every code token with its noun; the lane lists every count the report states, for the record.
