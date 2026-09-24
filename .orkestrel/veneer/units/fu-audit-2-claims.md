# Audit claims — UTIL-FRAMES (`fu`), round 2

Subject: UTIL-FRAMES round 2 — `fu-2.diff` and `fu-2-status.txt` (the worktree `/home/user/veneer-fu` against
`cf5e447`, both rounds), the shared patch `fu-shared-2.patch` (superseding `fu-shared.patch` whole), the report
`b-util-frames-report-2.md`, and the round-2 records under `fu-instruments/` — against the successor brief
`b-util-frames-brief-2.md` and the round-1 verdict `fu-audit-verdict.md`. The frames are under
`/home/user/veneer-fu/tmp/capture/states/`. The unit was written by `opus` on Opus 5.5. Each claim is falsifiable; a
lane rules CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim about a proof names the
mutation that would make the proof fail and whether its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-2 mutations wrote
the off-limits `src/styles/utilities/_link.scss` partial and restored it, and `fu-2-status.txt` does not list it;
the `test:setup` failures the report records are timeouts in a file the unit does not touch, taken at a load near 12.

1. **Scope.** `fu-2-status.txt` lists only files the briefs own plus `VISIBILITY_COPY`'s file; `_color-bg.scss`,
   `_link.scss`, and their proofs are byte-identical to `cf5e447`; `fu-shared-2.patch` touches `guides/veneer.md`
   alone and changes no ledger row.
2. **The link states.** The link-state case asserts that the `.link-body-emphasis` link's `color` moves from rest
   under hover and focus, and that no role link's `color` or `text-decoration-color` moves; the
   `emphasis-state-rule-deleted` and `role-link-hover-color` mutations each redden the assertion they target.
3. **The Tab drive.** Each focus row of the link-state case and the focusable-container link are reached by Tab from
   the padded wrapper after `releasePointer`, and the held check requires the link to hold `document.activeElement`;
   the re-shot dark frames (`role-links-focus--dark-390.png`, `focusable-container-focus--dark-390.png`) show the
   outline; `underline-offsets-hover` drives the largest step, and its frames show the lowered underline.
4. **The tables.** `LINK_STATE_TARGETS`, `LINK_STEP_PROPERTIES`, `LINK_PAINT_PROPERTIES`, and
   `FOCUS_INDICATOR_PROPERTIES` are frozen, exported, documented setup constants the case reads; the export-list case
   names each; the case asserts every link-state row has a target; the `link-tables-absent` mutation reddens the
   table and export cases.
5. **Prose and report.** F1 (no count in the three sentences), F2 (the Overflow region named in the viewport clause),
   and F3 (`VISIBILITY_COPY` names the container) read true; the report quotes each gate's command and result line
   from its log, and states no tally of a growable set, no ordinal naming, and no temporal word.
