# Audit claims — RAMP-DOWN (`rd`), round 1

Subject: the unit's record — `rd.diff` and `rd-status.txt` (the worktree `/home/user/veneer-rd` against
`42fd88e`), the shared patch `rd-shared.patch`, the report `b-modal-rd-report.md`, and the records under
`rd-instruments/` (`rd-base.css`, `rd-gates.sh`, the `rd-gate-*` logs, `rd-mutation.patch`,
`rd-mutation.log.txt`, `rd-mixins-green.log.txt`, `rd-offcanvas-probe.patch`,
`rd-offcanvas-cascade.diff.txt`) — against the brief `b-modal-rd-brief.md` and the RAMP-DOWN row of
`ROADMAP.md` § Carriers. The unit was written by `opus` on Opus 5.5. Each claim is falsifiable; a lane
rules CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim about a proof names
the mutation that would make the proof fail and whether its assertions distinguish it.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the unit
stopped correctly at the offcanvas partial under its deviation contract, and the Orchestrator rules
that the offcanvas partial keeps its walk, because writing it through the twin reorders the built
stylesheet against Bootstrap 5.3.8's own order, which writes the bare panel after the responsive
panels, and both of the partial's emissions already derive from one pair of maps; the Orchestrator's
apply check (`rd-shared.patch` on a fresh `42fd88e` extract) settles the apply clause; the scratch
state was removed before the report, so a lane rules the gate and mutation claims from the code's
assertions and the retained logs, and names which it read.

1. **Scope.** `rd-status.txt` lists `src/styles/_mixins.scss`, `src/styles/components/_modal.scss`,
   `src/styles/components/_table.scss`, `tests/src/styles/fixtures/mixins.scss`, and
   `tests/src/styles/mixins.test.ts` and nothing else; `_offcanvas.scss` is unchanged; the shared patch
   touches `guides/veneer.md` alone.
2. **The twin.** The `breakpoint-each-down` mixin yields the `('', 0)` pair unwrapped for the zero
   boundary and `('-<name>', <boundary>)` inside the `breakpoint-down` mixin for each other name, in
   `breakpoints()` order; its name follows `.claude/rules/names.md` and the `breakpoint-` family; its
   comment states what it emits.
3. **Byte equality.** The modal and table partials each write their rule set once through the twin,
   and the stylesheet built after the change equals `rd-base.css`, the stylesheet built at `42fd88e`.
4. **The fixture case.** The added case reads each ramp entry's selector, its condition, and the
   boundary it carries back, against the published breakpoint tokens; the retained run with the
   zero branch dropped reddens it, and its assertions distinguish that mutation from the passing case.
5. **The offcanvas stop.** `rd-offcanvas-cascade.diff.txt` shows the probe moving the bare panel ahead
   of the responsive panels and grouping the at-and-above blocks after every below-boundary block,
   and Bootstrap 5.3.8's compiled stylesheet writes the bare panel after the responsive panels.
6. **The guide.** The shared patch's sentences about the twin read true against the mixin and the
   partials that call it, and no sentence claims the offcanvas partial uses it.
7. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; the report states no temporal word and no tally, quotes each
   gate's result line, and follows every code token with its noun; the lane lists every count the
   report states, for the record.
