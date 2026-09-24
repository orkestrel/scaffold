# FRAME-HELPERS audit, round 2 — claims

Subject: the round-2 change in `/home/user/veneer-fh` (uncommitted over `5afa37b`), briefed by
`b-frame-helpers-brief-2.md` and reported in `b-frame-helpers-report-2.md`. The diff is `fh-2.diff`, the status
`fh-2-status.txt`, and the logs and instruments the `fh2-*` files under `fh-instruments/`. Round 1's reconciliation is
`fh-audit-verdict.md`. Each claim is falsifiable; rule every one.

1. **P1.** Every focus case whose element paints an outline requires a defined outline reading greater than 0: the
   list-group, menu item, skip link, focusable container, and each link specimen focus row. The mutation that stops the
   focus method reading any outline reddens all five cases, the container and link cases included, and the unmutated
   filter passes (`fh2-p1-red.log.txt`, `fh2-p1-green.log.txt`).
2. **F1.** One exported `createOutlineCapture` function in `tests/setupBrowser.ts` builds the painted and suppressed
   portfolios, the journey's `FRAMES` constant and the helper proofs build through it, no local outline factory is left,
   and its proof reddens when either portfolio is written under the wrong directory or left disabled.
3. **N1 and N2.** Every `FocusReading` is bound as `focusReading`, with no shadowing; `focused` names only a paint read
   under focus; `FocusOptions.ring` is `worn` at every site; every lift site names the lifted element `specimen`, except
   the detached copies, which keep `copied` because each case also holds the original specimen.
4. **C1.** The press case reads each screenshot through the `readImageRegion` function with no private decode, and gives
   the same centre readings as round 1; the page strip link, the underline link, and the accordion buttons are read
   through `readElement` with no inline `instanceof HTMLElement` check beside it.
5. **Gates.** The formatter check, lint, check, `test:setup` (313), `test:setup:browser` (81), `test:guides` (20), and the
   `CAPTURE=1` journeys at `dark-1280` and `light-390` (62 each) ran green after the final edit, each log ending with its
   exit line; `fh-shared.patch` still applies.
6. **W1.** Every changed TSDoc sentence, comment, and guide sentence states what ships, follows each code token with its
   noun, names no list item by position, and writes each changed `@throws` in the "Thrown when" form.
