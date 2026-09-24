# Audit claims — FOCUS-FRAME (`ff`), round 3

Subject: FOCUS-FRAME round 3 — `ff-3.diff` and `ff-3-status.txt` (the worktree `/home/user/veneer-ff` against `e4a6d7c`,
all rounds), the report `b-focus-frame-report-3.md`, and the round-3 records under `ff-instruments/`
(`ff-mutations-3.log.txt` and the `ff-3-gate-*` and `ff-case3-*` logs) — against `b-focus-frame-brief-3.md` and
`ff-audit-2-verdict.md`. `ff-shared-2.patch` stands unchanged. The unit was written by `opus` on Opus 5.5. A lane rules
CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim about a proof names the mutation that would
make it fail and whether its assertions distinguish that mutation from the passing case.

1. **The helper rows.** The added `RING_SHADOW_CASES` row (`rgb(0, 0, 0) -5px 2px 3px 1px`, reach 9) makes each
   mutation that drops the horizontal term fail, and each passed without the row; the `none` branch is gone and
   `npm run test:setup` passes; every branch left in `computeRingReach` has a row that decides it.
2. **The list-group control.** The list-group case at `dark-1280` fails at the suppressed assertion when the suppressed
   state paints the outline, and passes on the round-3 tree.
3. **The rename and the TSDoc.** The outline frames sit under `tmp/capture/outline/`, the local name is not "guard",
   and the `SHOWCASE_KEYS` TSDoc no longer says every focus frame uses a padded wrapper.
4. **Scope and law.** `ff-3-status.txt` lists only the three owned files; no changed line adds an `any`, an `as` beyond
   a const assertion, a `!`, a suppression, a nested function, or a mock.
