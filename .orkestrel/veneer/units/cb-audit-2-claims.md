# Audit claims — BARE-BUTTON (`cb`), round 2

Subject: round 2's record — `cb-2.diff` and `cb-2-status.txt` (the worktree `/home/user/veneer-cb`
against `a9dff19`), the revised shared patch `cb-shared-2.patch` (one unified diff against `a9dff19` that
supersedes `cb-shared.patch` whole), the report `b-cross-cb-report-2.md`, and the round-2 records under
`cb-instruments/` (`cb-mutations-2.log.txt`, `cb-mutate-2.sh`, `cb-mutation-2-token-run.log.txt`,
`cb-green-2.log.txt`, `cb-interdiff-2.diff`, `cb-shared-interdiff-2.diff`, `cb-guide-2.py`, and the
`cb-gate-2-*` and `cb-scratch-2-*` logs) — against the successor brief `b-cross-cb-brief-2.md` (C-a to
C-c), the round-1 verdict `cb-audit-verdict.md` and its lane verdicts, and round 1's record (`cb.diff`,
`cb-shared.patch`, `b-cross-cb-report.md`). The unit was written by `opus` on Opus 5.5. Each claim is
falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim
about a proof names the mutation that would make the proof fail and whether its assertions distinguish
that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-1
verdict's rulings stand, and every claim it confirmed stays confirmed unless round 2 changed its
subject; the Orchestrator's apply check (`cb-shared-2.patch` on a fresh `a9dff19` extract) settles the
apply clause; the scratch copy was deleted before the report, so a lane rules the gate and mutation
claims from the code's assertions and the retained logs, and names which it read.

1. **Scope and delta.** `cb-2-status.txt` lists round 1's owned paths and nothing else; against round 1,
   the owned files change only in `list-group.test.ts`, `button.test.ts`, and `nav.test.ts`, the partial
   and the shell stay byte-equal, and the shared patch changes only in `guides/veneer.md`.
2. **C-a: the list-group case.** The added case reads the disabled button action equal to the disabled
   anchor action on `font-family`, `font-size`, and `line-height`, and a keyboard-focused button action
   equal to a keyboard-focused anchor action on `outline-style` and `box-shadow`, with the anchor's
   shadow held to `none`; the retained runs with `font-size: inherit` dropped and with the focus-visible
   branch unscoped redden it, and its assertions distinguish each mutation; the state case's comment no
   longer credits a transition to the button host.
3. **C-a: the wrapper metrics.** The elements and nav cases use metrics no size token and no line token
   resolves to, their expected values match those metrics, and their comments read true; the retained
   run with the universal rule writing `var(--vn-size-5)` and `var(--vn-line-body)` reddens the elements
   case, whose assertions distinguish it from `inherit`.
4. **C-b: the guide.** The § Files row, the § Styles definition of the bare button and its reboot list,
   the split `data-bs-target` sentences, the Additions Reasons, and the § Tailwind and § Showcase
   paragraphs read true against the cascade, use one term for the bare button, and wrap at the guide's
   width.
5. **C-c: the coverage matrix.** The report separates the declarations each form no longer takes from
   the values that move through inheritance, and lists the close control's padding and the indicators'
   disabled `pointer-events` value, as the retained readings show.
6. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; the report states no temporal word and no tally, quotes each
   gate's result line from its log, and follows every code token with its noun; the lane lists every
   count the report states, for the record.
